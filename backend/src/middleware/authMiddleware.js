import * as sessionService from "../service/sessionService.js"

export const protectRoute = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: "Access denied. No token provided"
        })
    }

    const token = authHeader.split(' ')[1]

    const existToken = await sessionService.findSession(token)
    
    if (!existToken) {
        return res.status(401).json({
            success: false, message: "Invalid or expired token."
        })
    }

    req.customer = {
        sessionId: existToken.session_id,
        restaurantId: existToken.restaurant_id,
        table_id: existToken.table_id
    }

    next();
}
