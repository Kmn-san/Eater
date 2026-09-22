import { Router } from "express";
import { createSession, refreshSession } from "../controller/sessionController.js";

const router = Router();

router.post("/:restaurant_code/:table_code", createSession)
router.post("/refresh", refreshSession)

export default router;