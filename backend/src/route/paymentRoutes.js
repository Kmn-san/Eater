import { Router } from "express";
import { createCheckoutSession } from "../controller/paymentController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/create-payment-intent/:orderId", protectRoute, createCheckoutSession)

export default router;