import { Router } from "express";
import { validateLog } from "../middleware/log.validator.js";
import {
  ingestLogController,
  searchLogsController,
} from "../controller/log.controller.js";

const router = Router();

router.post("/logs", validateLog, ingestLogController);
router.get("/logs/search", searchLogsController);

export default router;
