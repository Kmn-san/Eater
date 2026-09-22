import * as restaurantService from "../service/restaurantService.js"
import * as sessionService from "../service/sessionService.js"

export const createSession = async (req, res) => {
    try {
        const { restaurant_code, table_code } = req.params;
        const existRestaurant = await restaurantService.verifyRestaurantAndTable(restaurant_code, table_code)
        if (!existRestaurant) {
            return res.status(404).json({ success: false, message: "No such restaurant or table." })
        }
        const guestSession = await sessionService.createGuestSession(existRestaurant.table_id)

        res.status(200).json({ success: true, token: guestSession.token })
    } catch (error) {
        console.error("Error in createSession controller: ", error.message);
        return res.status(500).json({
            code: "INTERNAL_SERVER_ERROR",
            error: error.message
        });
    }
}

export const refreshSession = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided"
            })
        }

        const token = authHeader.split(' ')[1]
        if (!token) {
            return res.status(404).json({ success: false, message: "Token not provided.", code: "NO_TOKEN" })
        }
        const existToken = await sessionService.findSession(token)

        if (!existToken) {
            return res.status(401).json({
                success: false, code: "INVALID_TOKEN", message: "Invalid token."
            })
        }
        const refreshedSession = await sessionService.createGuestSession(existToken.table_id)

        res.status(200).json({ success: true, token: refreshedSession.token })
    } catch (error) {
        console.error("Error in refreshSession controller: ", error.message);
        return res.status(500).json({
            code: "INTERNAL_SERVER_ERROR",
            error: error.message
        });
    }


}