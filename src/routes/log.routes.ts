import { Router } from "express";
import { validateLog } from "../middleware/log.validator.js";
import { ingestLogController } from "../controller/log.controller.js";

const router = Router();

router.post("/logs", validateLog, ingestLogController);

export default router;
