import { Router } from "express";
import { createSession } from "../controller/sessionController.js";

const router = Router();

router.post("/", createSession)

export default router;