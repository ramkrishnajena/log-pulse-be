import type { Request, Response } from "express";
import { ingestLog, searchLogs } from "../services/logService.js";
import type { LogPayload } from "../common/interface/log.interface.js";

export async function ingestLogController(req: Request, res: Response) {
  const log = req.body as LogPayload;

  await ingestLog(log);

  return res.status(201).json({
    status: 201,
    message: "Log ingested into Elasticsearch",
    data: null,
  });
}

export async function searchLogsController(req: any, res: any) {
  const page = req.query.page ? Number(req.query.page) : 1;
  const limit = req.query.limit ? Number(req.query.limit) : 10;
  const result = await searchLogs({
    q: req.query.q,
    level: req.query.level,
    resourceId: req.query.resourceId,
    traceId: req.query.traceId,
    spanId: req.query.spanId,
    commit: req.query.commit,
    parentResourceId: req.query.parentResourceId,
    startDate: req.query.startDate,
    endDate: req.query.endDate,
    page,
    limit,
  });

  res.status(200).json({
    status: 200,
    message: "Logs fetched successfully",
    data: result,
  });
}
