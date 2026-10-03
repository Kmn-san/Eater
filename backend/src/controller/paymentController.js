import * as paymentService from "../service/paymentService.js"
import * as orderService from "../service/orderService.js"
import { stripe } from "../utlis/stripe.js";
import { ENV } from "../config/env.js";

export const createCheckoutSession = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { sessionId } = req.customer;

        const orderData = await orderService.fetchOrder({ sessionId, orderId })
        if (!orderData) {
            res.status(404).json({ success: false, message: "Order not found." })
        }

        const result = await paymentService.processPayment(orderData, sessionId)

        return res.status(200).json({
            success: true,
            result
        })

    } catch (error) {
        if (error.code) {
            return res.status(400).json({
                code: error.code,
                error: error.message
            });
        }
        console.error("Error in createCheckoutSession controller: ", error.message);
        return res.status(500).json({
            code: "INTERNAL_SERVER_ERROR",
            error: error.message
        });
    }
}

export const handleStripeWebhook = async (req, res) => {
    console.log("🔥 Stripe webhook received");
    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, ENV.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error("Webhook signature verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log("Stripe event:", event.type);
    console.log("Event ID:", event.id);

    res.json({ received: true });

}