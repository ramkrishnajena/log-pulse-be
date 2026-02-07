import type { LogPayload } from "../common/interface/log.interface.js";
import { elasticClient } from "../config/database.js";

export async function ingestLog(log: LogPayload) {
  const response = await elasticClient.index({
    index: "logs",
    document: log,
    refresh: true, // IMPORTANT: makes data searchable immediately
  });

  return response;
}
