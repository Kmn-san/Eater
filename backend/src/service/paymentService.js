import { pool } from "../utlis/db.js"

export const processPayment = async (orderId) => {

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const { rows: existOrder } = await client.query(`
        SELECT 
            id, total_cents, payment_status
        FROM orders
        WHERE id = $1
        FOR UPDATE
        `, [orderId])
        if (existOrder.length === 0) {
            throw {
                code: 'ORDER_NOT_FOUND',
                message: 'Order not found.'
            }
        }

        const order = existOrder[0]

        if (order.payment_status !== 'pending') {
            throw {
                code: "ORDER_CANNOT_BE_PAID",
                message: `Order cannot be paid. Current payment status: ${order.payment_status}`
            };
        }

        // Update order status
        await client.query(`
            UPDATE orders
            SET 
            payment_status = 'success', 
            updated_at = NOW()
            WHERE id = $1
            `, [orderId])

        // Insert into payment
        await client.query(`
            INSERT INTO payment
        (order_id,provider,provider_payment_id,amount_cents,status,paid_at)
        VALUES ($1,'mock', 'mock',$2 ,'success',NOW())
            `, [order.id, order.total_cents])

        await client.query('COMMIT');

        return {
            orderId: order.id,
            paymentStatus: 'paid',
            totalCents: order.total_cents
        }
    } catch (error) {
        try {
            await client.query("ROLLBACK");
        } catch (rollbackError) {
            console.error("Rollback failed:", rollbackError);
        }
        throw error;
    } finally {
        client.release();
    }

}