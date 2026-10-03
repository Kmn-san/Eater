import { Router } from "express";
import { createOrder, fetchAOrder, fetchLatestOrder } from "../controller/orderController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", protectRoute, createOrder)
router.get("/latest", protectRoute, fetchLatestOrder)
router.get("/:orderId", protectRoute, fetchAOrder)

export default router;