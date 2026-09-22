import * as orderService from "../service/orderService.js"

export const createOrder = async (req, res) => {
    try {
        const { sessionId, restaurantId, table_id } = req.customer;
        const { items } = req.body;
        if (!items) {
            return res.status(400).json({ success: false, code: "NO_ORDER_ITEMS", message: "At least order an item." })
        }
        const result = await orderService.processOrderCreation({
            restaurant_id: restaurantId,
            session_id: sessionId,
            table_id,
            items
        })

        res.status(200).json({ success: true, result, message: "Order created successfully!" })

    } catch (error) {
        console.error("Error in createOrder controller: ", error.message);
        if (error.code) {
            return res.status(400).json({
                code: error.code,
                error: error.message
            });
        }
        return res.status(500).json({
            code: "INTERNAL_SERVER_ERROR",
            error: error.message
        });
    }
}

export const fetchLatestOrder = async (req, res) => {
    try {
        const { sessionId } = req.customer;
        const result = await orderService.fetchOrder(sessionId)
        if (!result) {
            res.status(404).json({ success: true, message: "No order yet." })
        }
        res.status(200).json({ success: true, result })
    } catch (error) {
        console.error("Error in fetchLatestOrder controller: ", error.message);
        return res.status(500).json({
            code: "INTERNAL_SERVER_ERROR",
            error: error.message
        });
    }
}