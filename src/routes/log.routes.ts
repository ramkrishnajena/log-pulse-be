import { Router } from "express";
import { validateLog } from "../middleware/log-validator.middleware.js";
import {
  bulkIngestController,
  ingestLogController,
  searchLogsController,
} from "../controller/log.controller.js";

const router = Router();

router.post("/logs", validateLog, ingestLogController);
router.get("/logs/search", searchLogsController);
router.post("/logs/bulk", bulkIngestController);

export default router;
