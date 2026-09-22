import * as restaurantService from "../service/restaurantService.js"
import * as sessionService from "../service/sessionService.js"

export const createSession = async (req, res) => {
    try {
        const { restaurant_code, table_code } = req.body;
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