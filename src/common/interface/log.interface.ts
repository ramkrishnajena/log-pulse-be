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

export interface LogSearchParams {
  q?: string;
  level?: string;
  resourceId?: string;
  traceId?: string;
  spanId?: string;
  commit?: string;
  parentResourceId?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}
