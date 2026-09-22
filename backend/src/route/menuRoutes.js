import { Router } from "express";
import { getItemDetail, getMenu } from "../controller/menuController.js";

const router = Router()
router.get("/:restaurant_code", getMenu)
router.get("/:restaurant_code/:item_id", getItemDetail)

export default router;