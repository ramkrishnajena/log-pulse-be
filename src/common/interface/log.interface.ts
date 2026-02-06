export type LogLevel = "info" | "warn" | "error";

export interface LogMetadata {
  parentResourceId?: string;
}

export interface LogPayload {
  level: LogLevel;
  message: string;
  resourceId: string;
  timestamp: string;
  traceId: string;
  spanId: string;
  commit: string;
  metadata?: LogMetadata;
}
