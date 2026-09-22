import * as paymentService from "../service/paymentService.js"

export const payment = async (req, res) => {
    try {
        const { orderId } = req.params;

        const result = await paymentService.processPayment(orderId)

        return res.status(200).json({
            success: true,
            code: "PAYMENT_SUCCESSFULLY",
            data: result
        })
    } catch (error) {
        console.error("Error in processPayment controller: ", error.message);
        return res.status(500).json({
            code: "INTERNAL_SERVER_ERROR",
            error: error.message
        });
    }
}