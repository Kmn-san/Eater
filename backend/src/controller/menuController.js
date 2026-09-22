import * as menuService from "../service/menuService.js"

export const getMenu = async (req, res) => {
    try {
        const { restaurant_code } = req.params;
        const result = await menuService.fetchMenu(restaurant_code);

        res.status(200).json({ success: true, result })
    } catch (error) {
        console.error("Error in getMenu controller: ", error.message);
        return res.status(500).json({
            code: "INTERNAL_SERVER_ERROR",
            error: error.message
        });
    }
}

export const getItemDetail = async (req, res) => {
    try {
        const { restaurant_code, item_id } = req.params;
        
        const result = await menuService.fetchItemDetail(restaurant_code, item_id);

        res.status(200).json({ success: true, result })
    } catch (error) {
        console.error("Error in getItemDetail controller: ", error.message);
        return res.status(500).json({
            code: "INTERNAL_SERVER_ERROR",
            error: error.message
        });
    }
}