import { Router } from "express";
import { createOrder, fetchAOrder, fetchLatestOrder } from "../controller/orderController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", protectRoute, createOrder)
router.get("/:orderId", protectRoute, fetchAOrder)
router.get("/latest", protectRoute, fetchLatestOrder)

export default router;