import { Router } from "express";
import { payment } from "../controller/paymentController.js";

const router = Router();

router.post("/:orderId/pay", payment)

export default router;