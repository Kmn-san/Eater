import { Router } from "express";
import { createOrder, fetchLatestOrder } from "../controller/orderController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", protectRoute, createOrder)
router.get("/latest", protectRoute, fetchLatestOrder)

export default router;