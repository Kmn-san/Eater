import { pool } from "../utlis/db.js"
import { stripe } from "../utlis/stripe.js";

export const processPayment = async (orderId, sessionId) => {

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const { rows: existOrder } = await client.query(`
        SELECT 
            id, total_cents, payment_status,order_number
        FROM orders
        WHERE id = $1 AND session_id = $2
        `, [orderId, sessionId])
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

        const createSession = await stripe.checkout.sessions.create({
            mode: 'payment',

            line_items: [
                {
                    price_data: {
                        currency: "myr",
                        product_data: {
                            name: `Eater Order ${order.order_number}`
                        },
                        unit_amount: order.total_cents
                    },
                    quantity: 1
                }
            ],
            success_url: `${process.env.FRONTEND_URL}/payment/success`,
            cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,

            metadata: {
                order_id: order.id,
            },
        })


        await client.query('COMMIT');

        return {
            checkoutUrl: createSession.url,
        };
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