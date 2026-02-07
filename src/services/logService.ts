import type {
  LogPayload,
  LogSearchParams,
} from "../common/interface/log.interface.js";
import { elasticClient } from "../config/database.js";

export async function ingestLog(log: LogPayload) {
  const response = await elasticClient.index({
    index: "logs",
    document: log,
    refresh: true, // IMPORTANT: makes data searchable immediately
  });

  return response;
}

export async function searchLogs(params: LogSearchParams) {
  const {
    q,
    level,
    resourceId,
    traceId,
    spanId,
    commit,
    parentResourceId,
    startDate,
    endDate,
    page = 1,
    limit = 10,
  } = params;

  const must: any[] = [];
  const filter: any[] = [];

  // Full-text search
  if (q) {
    must.push({
      match: {
        message: q,
      },
    });
  }

  // Exact filters
  if (level) filter.push({ term: { level } });
  if (resourceId) filter.push({ term: { resourceId } });
  if (traceId) filter.push({ term: { traceId } });
  if (spanId) filter.push({ term: { spanId } });
  if (commit) filter.push({ term: { commit } });
  if (parentResourceId)
    filter.push({ term: { "metadata.parentResourceId": parentResourceId } });

  // Date range
  if (startDate || endDate) {
    filter.push({
      range: {
        timestamp: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
  }

  const from = (page - 1) * limit;

  const response = await elasticClient.search({
    index: "logs",
    from,
    size: limit,
    query: {
      bool: {
        must,
        filter,
      },
    },
    sort: [{ timestamp: { order: "desc" } }],
  });

  return {
    total: response.hits.total,
    logs: response.hits.hits.map((hit: any) => hit._source),
  };
}
