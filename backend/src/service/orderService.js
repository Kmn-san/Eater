import { query, pool } from "../utlis/db.js"
import { generateOrderNumber } from "../utlis/orderNumber.js";

export const processOrderCreation = async ({ restaurant_id, session_id, table_id, items }) => {
    const serviceTaxRate = 6 / 100
    const serviceChargeRate = 10 / 100
    if (!Array.isArray(items) || items.length === 0) {
        throw {
            code: "INVALID_ORDER",
            message: "Order must has at least one item."
        }
    }

    for (const item of items) {
        if (item.quantity <= 0 || !Number.isInteger(item.quantity)) {
            throw {
                code: "INVALID_QUANTITY",
                message: "Item's quantity must be a positive integer."
            }
        }

        if (!item.item_id) {
            throw {
                code: "INVALID_ITEM",
                message: "Must have a item_id for an item."
            }
        }

        if (item.note !== undefined && typeof item.note !== "string" && item.note !== null) {
            throw {
                code: "INVALID_NOTE",
                message: "Item note must be a string."
            }
        }

        if (item.options !== undefined && !Array.isArray(item.options)) {
            throw {
                code: "INVALID_OPTION",
                message: "Item option must be an array."
            }
        }
    }

    // Get available option values
    const itemIds = items.map((item) => item.item_id)

    // Combine all duplicate value 
    const uniqueMenuItemIds = [...new Set(itemIds)]

    // Fetch items detail(id,name,price_cents)
    const { rows: dbMenuItems } = await query(`
        SELECT 
            i.id,
            i.name,
            i.price_cents
        FROM menu_items i
        JOIN menu_categories c
            ON c.id = i.category_id
        WHERE i.id = ANY($1) AND i.is_available = true AND c.restaurant_id = $2
        `, [uniqueMenuItemIds, restaurant_id])

    // Check if this item available or belong to this restaurant
    if (dbMenuItems.length !== uniqueMenuItemIds.length) {
        throw {
            code: "INVALID_MENU_ITEM",
            message: "One or more items are unavailable or not beling to this restaurant."
        }
    }

    // Turn into object with id 
    // So may find using id
    const menuItemsMap = dbMenuItems.reduce((acc, item) => {
        acc[item.id] = item;
        return acc
    }, {})

    // Fetch item's option and option value
    const { rows: dbMenuOptions } = await query(`
            SELECT
                o.id AS option_id,
                o.menu_item_id,
                o.name,
                o.min_select,
                o.max_select,

                v.id AS option_value_id,
                v.name AS option_value_name,
                v.price_delta_cents
            FROM menu_options o
            LEFT JOIN menu_option_values v
                ON o.id = v.option_id
                AND v.is_available = true
            WHERE o.menu_item_id = ANY($1) 
        `, [uniqueMenuItemIds])

    // GROUP the DB results by menu item id (without duplicate)
    const optionsByMenuItem = {};
    dbMenuOptions.forEach(row => {
        if (!optionsByMenuItem[row.menu_item_id]) {
            optionsByMenuItem[row.menu_item_id] = []
        }
        optionsByMenuItem[row.menu_item_id].push(row)
    })

    let subtotalCents = 0;
    let serviceTaxCents = 0;
    let serviceChargeCents = 0;
    let processedItem = [];
    for (const cartItem of items) {
        // For every single one in request (although is the same)
        const groupsForItem =
            optionsByMenuItem[cartItem.item_id] || [];

        const selectedOptions =
            cartItem.options || []


        let optionPriceDelta = 0;
        let snapshotOptions = [];
        // Is every selection valid
        for (const selected of selectedOptions) {

            // Is option_id and value_id given
            if (!selected.option_id ||
                !selected.option_value_id
            ) {
                throw {
                    code: "INVALID_OPTION",
                    message:
                        "Each selected option must contain option_id and option_value_id."
                }
            }

            // Find is this option and value belongs to this item
            const selectedValues = groupsForItem.find(
                row =>
                    row.option_id === selected.option_id &&
                    row.option_value_id === selected.option_value_id
            )

            if (!selectedValues) {
                throw {
                    code: "INVALID_OPTION_VALUE",
                    message:
                        "Selected option value does not belong to this menu item."
                };
            }

            // Count option price
            optionPriceDelta += selectedValues.price_delta_cents

            snapshotOptions.push({
                optionId: selectedValues.option_id,
                optionValueId: selectedValues.option_value_id,
                optionName: selectedValues.name,
                optionValueName: selectedValues.option_value_name,
                priceDeltaCents: selectedValues.price_delta_cents
            })

        }

        // Check duplicate option values
        const selectedValueIds =
            selectedOptions.map(
                option => option.option_value_id
            )

        if (new Set(selectedValueIds).size !== selectedValueIds.length) {
            throw {
                code: "DUPLICATE_OPTION_VALUE",
                message:
                    `Duplicate option value selected for ${menuItemsMap[cartItem.item_id].name}`
            };
        }

        const selectedByOption = {};

        // Count option value selected by user for each group
        for (const selected of selectedOptions) {
            selectedByOption[selected.option_id] = (selectedByOption[selected.option_id] || 0) + 1
        }

        const optionIds = [
            ...new Set(groupsForItem.map(row => row.option_id))
        ]

        for (const optionId of optionIds) {
            const group = groupsForItem.find(row => row.option_id === optionId)

            const count = selectedByOption[optionId] || 0;

            if (count < group.min_select) {
                throw {
                    code: "MIN_OPTION_SELECTION",
                    message:
                        `${group.name} requires at least ${group.min_select} selection(s).`
                }
            }

            if (count > group.max_select) {
                throw {
                    code: "MAX_OPTION_SELECTION",
                    message:
                        `${group.name} allows at most ${group.max_select} selection(s).`
                }
            }

        }

        const unitPriceCents = menuItemsMap[cartItem.item_id].price_cents + optionPriceDelta

        const itemSubtotalCents = unitPriceCents * cartItem.quantity

        subtotalCents += itemSubtotalCents

        processedItem.push({
            itemId: cartItem.item_id,
            item_name_snapshot: menuItemsMap[cartItem.item_id].name,
            unit_price_cents: unitPriceCents,
            quantity: cartItem.quantity,
            subtotal_cents: itemSubtotalCents,
            note: cartItem.note,
            options: snapshotOptions
        })
    }

    serviceChargeCents = Math.round(subtotalCents * serviceChargeRate)

    serviceTaxCents = Math.round(subtotalCents * serviceTaxRate)

    const totalCents = subtotalCents + serviceChargeCents + serviceTaxCents

    const client = await pool.connect()

    try {
        await client.query('BEGIN');

        const orderNumber = generateOrderNumber();

        const { rows: insertOrder } = await client.query(`
        INSERT INTO orders
            (restaurant_id,session_id,order_number,
            table_id,status,payment_status,
            subtotal_cents,service_tax_cents,service_charge_cents,total_cents)
        VALUES
            ($1, $2 ,$3 ,$4 ,
            'pending' ,'pending' ,$5 
            ,$6 ,$7 ,$8)
        RETURNING id, order_number, total_cents
    `,
            [restaurant_id, session_id, orderNumber, table_id, subtotalCents, serviceTaxCents, serviceChargeCents, totalCents])

        const newOrder = insertOrder[0]

        for (const item of processedItem) {
            const { rows: insertItem } = await client.query(`
                INSERT INTO order_item
                    (order_id,menu_item_id,item_name_snapshot,
                    unit_price_cents,quantity,subtotal_cents,note)
                VALUES
                    ($1, $2 ,$3 ,$4 ,$5 
                    ,$6 ,$7)
                RETURNING id
        `, [newOrder.id, item.itemId,
            item.item_name_snapshot, item.unit_price_cents, item.quantity, item.subtotal_cents, item.note
            ])

            const orderItemId = insertItem[0].id

            if (item.options.length > 0) {
                for (const opt of item.options) {
                    await client.query(`
                     INSERT INTO order_item_options
                        (order_item_id,option_id,
                        option_value_id,option_name_snapshot,
                        option_value_name_snapshot,
                        price_delta_cents)
                    VALUES
                        ($1, $2 ,$3 ,$4 ,$5 ,$6)

                    `, [orderItemId, opt.optionId, opt.optionValueId, opt.optionName, opt.optionValueName, opt.priceDeltaCents])
                }
            }
        }

        await client.query('COMMIT');

        return {
            orderId: newOrder.id,
            orderNumber: newOrder.order_number,
            totalCents: newOrder.total_cents
        }
    } catch (error) {
        try {
            await client.query("ROLLBACK")
        } catch (error) {
            console.error("Rollback failed: ", error);
        }
        throw error
    } finally {
        client.release();
    }

}

export const fetchOrder = async (
    session_id
) => {
    const { rows: dbOrder } = await query(`
        SELECT
            o.id AS order_id, 
            o.order_number,
            o.status, 
            o.payment_status, 
            o.subtotal_cents,
            o.service_tax_cents, 
            o.service_charge_cents, 
            o.discount_cents,
            o.total_cents,

            i.id AS item_id,
            i.item_name_snapshot AS item_name,
            i.quantity,
            i.unit_price_cents,
            i.note,

            v.option_name_snapshot AS option_name,
            v.option_value_name_snapshot AS option_value_name,
            v.price_delta_cents

        FROM orders o

        JOIN order_item i
            ON o.id = i.order_id

        LEFT JOIN order_item_options v
            ON i.id = v.order_item_id

        WHERE session_id = $1
        ORDER BY o.created_at ASC, i.menu_item_id ASC
        `, [session_id])

    const result = {
        orders: []
    }

    dbOrder.forEach(row => {
        let order = result.orders.find(
            o => o.id === row.order_id
        )

        if (!order) {
            order = {
                id: row.order_id,
                orderNumber: row.order_number,
                status: row.status,
                paymentStatus: row.payment_status,
                subtotalCents: row.subtotal_cents,
                serviceTaxCents: row.service_tax_cents,
                serviceChargeCents: row.service_charge_cents,
                totalCents: row.total_cents,
                items: []
            }
            result.orders.push(order)
        }
        let item = order.items.find(
            i => i.id === row.item_id
        )

        if (!item) {
            const subtotalCents = row.quantity * row.unit_price_cents

            item = {
                id: row.item_id,
                name: row.item_name,
                quantity: row.quantity,
                unitPriceCents: row.unit_price_cents,
                subtotalCents: subtotalCents,
                note: row.note,
                options: []
            }
            order.items.push(item)
        }
        if (row.option_name) {
            item.options.push({
                name: row.option_name,
                value: row.option_value_name,
                priceDeltaCents: row.price_delta_cents
            })
        }
    }
    )
    return result
}