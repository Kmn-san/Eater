import { query } from "../utlis/db.js"

export const fetchMenu = async (restaurant_code) => {
    const { rows } = await query(
        `SELECT 
            r.name as restaurant_name,
            r.image_url as restaurant_image,
            c.name as category_name,
            i.name as item_name,
            i.price_cents as item_price_cents,
            i.is_available,
            i.image_url,
            i.id, 
            EXISTS (
                SELECT 1
                FROM menu_options o
                WHERE o.menu_item_id = i.id
                AND o.min_select > 0
            ) AS requires_options

        FROM menu_items i
        JOIN menu_categories c
            ON c.id = i.category_id
        JOIN restaurant r
            ON r.id = c.restaurant_id
        WHERE r.restaurant_code = $1
        ORDER BY c.sort_order,i.sort_order
        `, [restaurant_code]
    );
    const result = {
        restaurant_name: rows[0]?.restaurant_name,
        restaurant_image: rows[0]?.restaurant_image,
        categories: []
    }
    rows.forEach(row => {
        let category = result.categories.find(
            c => c.category_name === row.category_name
        )
        if (!category) {
            category = {
                name: row.category_name,
                items: []
            };
            result.categories.push(category)
        }
        category.items.push({
            id: row.id,
            name: row.item_name,
            image: row.image_url,
            price_cents: row.item_price_cents,
            is_available: row.is_available,
            requires_options: row.requires_options
        })
    })
    return result;
}

export const fetchItemDetail = async (restaurant_code, item_id) => {
    const { rows } = await query(`
        SELECT 
            i.id AS item_id,
            i.name,
            i.image_url,
            i.description,
            i.price_cents,
            i.is_available,

            o.id AS option_id,
            o.min_select,
            o.max_select,
            o.name AS option,

            v.id AS option_value_id,
            v.name AS option_value_name,
            v.price_delta_cents

        FROM menu_items i

        LEFT JOIN menu_options o
            ON i.id = o.menu_item_id

        LEFT JOIN menu_option_values v
            ON o.id = v.option_id

        JOIN menu_categories c
            ON c.id = i.category_id

        JOIN restaurant r
            ON r.id = c.restaurant_id

        WHERE i.id = $1 
            AND r.restaurant_code = $2 
            AND i.is_available = true
            
        ORDER BY o.sort_order,v.sort_order
        `, [item_id, restaurant_code])

    const result = {
        item_name: rows[0]?.name,
        is_available: rows[0]?.item_is_available,
        image_url: rows[0]?.image_url,
        description: rows[0]?.description,
        price_cents: rows[0]?.price_cents,
        is_available: rows[0]?.is_available,
        options: []
    }
    rows.forEach(row => {
        if (!row.option) {
            return;
        }
        let option = result.options.find(
            o => o.id === row.option_id
        )

        if (!option) {
            option = {
                id: row.option_id,
                name: row.option,
                min_select: row.min_select,
                max_select: row.max_select,
                option_value: []
            }
            result.options.push(option)

        }
        if (row.option_value_id) {
            option.option_value.push({
                id: row.option_value_id,
                name: row.option_value_name,
                price_delta_cents: row.price_delta_cents
            })
        }
    })
    return result
}