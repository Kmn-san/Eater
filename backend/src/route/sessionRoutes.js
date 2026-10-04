import { Router } from "express";
import { createSession } from "../controller/sessionController.js";

const router = Router();

router.post("/:restaurant_code/:table_code", createSession)

export default router;