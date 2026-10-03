import { ENV } from "../config/env.js";
import { pool } from "../utlis/db.js"
import { stripe } from "../utlis/stripe.js";

export const processPayment = async (orderData, sessionId) => {

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const order = orderData

        if (order.paymentStatus !== 'pending') {
            throw {
                code: "ORDER_CANNOT_BE_PAID",
                message: `Order cannot be paid. Current payment status: ${order.paymentStatus}`
            };
        }

        const checkoutSession = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "myr",
                        product_data: {
                            name: `Order #${order.orderNumber}`,
                        },
                        unit_amount: order.totalCents,
                    },
                    quantity: 1,
                },
            ],

            success_url:
                `${ENV.FRONTEND_URL}/payment/success?order_id=${order.id}&restaurant_code=${order.restaurantCode}&session_id={CHECKOUT_SESSION_ID}`,

            cancel_url:
                `${ENV.FRONTEND_URL}/payment/cancel`,
            metadata: {
                sessionId: sessionId,
                orderId: order.id,
            },
            payment_intent_data: {
                metadata: {
                    sessionId: sessionId,
                    orderId: order.id,
                },
            },
        });

        await pool.query(`
            INSERT INTO payment
                (order_id,provider,amount_cents,status,provider_checkout_id)
                VALUES($1,$2,$3,$4,$5)
                RETURNING *
            `, [order.id, "stripe", order.totalCents, "pending", checkoutSession.id])


        await client.query('COMMIT');

        return {
            checkoutUrl: checkoutSession.url
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

export const updatePayment = async () => {

}