import type { Request, Response, NextFunction } from "express";
import type { LogPayload } from "../common/interface/log.interface.js";

export function validateLog(req: Request, res: Response, next: NextFunction) {
  const body = req.body as LogPayload;

  if (
    !body.level ||
    !body.message ||
    !body.resourceId ||
    !body.timestamp ||
    !body.traceId ||
    !body.spanId ||
    !body.commit
  ) {
    return res.status(400).json({
      status: 400,
      message: "Invalid log payload",
      data: null,
    });
  }

  next();
}
