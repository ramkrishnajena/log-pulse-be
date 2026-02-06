import type { Request, Response } from "express";
import { ingestLog } from "../services/logService.js";
import type { LogPayload } from "../common/interface/log.interface.js";

export function ingestLogController(req: Request, res: Response) {
  const log = req.body as LogPayload;

  ingestLog(log);

  return res.status(201).json({
    status: 201,
    message: "Log ingested successfully",
    data: null,
  });
}
