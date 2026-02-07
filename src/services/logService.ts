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

export async function bulkIngestLogs(logs: any[]) {
  const body = logs.flatMap((log) => [{ index: { _index: "logs" } }, log]);

  await elasticClient.bulk({
    refresh: false,
    body,
  });
}

export async function searchLogs(params: LogSearchParams) {
  const {
    q,
    regex = false,

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

  // ---- SAFETY GUARDS (VERY IMPORTANT) ----
  const safePage = Number.isFinite(page) && page > 0 ? page : 1;
  const safeLimit =
    Number.isFinite(limit) && limit > 0 && limit <= 100 ? limit : 10;

  const from = (safePage - 1) * safeLimit;

  // ---- ELASTICSEARCH QUERY PARTS ----
  const must: any[] = [];
  const filter: any[] = [];

  // ---- FULL TEXT / REGEX SEARCH ----
  if (q) {
    if (regex === true) {
      must.push({
        regexp: {
          message: {
            value: q,
            flags: "ALL",
          },
        },
      });
    } else {
      must.push({
        match: {
          message: {
            query: q,
            operator: "and",
          },
        },
      });
    }
  }

  // ---- EXACT MATCH FILTERS (KEYWORD FIELDS) ----
  if (level) filter.push({ term: { level } });
  if (resourceId) filter.push({ term: { resourceId } });
  if (traceId) filter.push({ term: { traceId } });
  if (spanId) filter.push({ term: { spanId } });
  if (commit) filter.push({ term: { commit } });
  if (parentResourceId) {
    filter.push({
      term: { "metadata.parentResourceId": parentResourceId },
    });
  }

  // ---- DATE RANGE FILTER ----
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

  // ---- EXECUTE SEARCH ----
  const response = await elasticClient.search({
    index: "logs",
    from,
    size: safeLimit,
    query: {
      bool: {
        must,
        filter,
      },
    },
    sort: [
      {
        timestamp: { order: "desc" },
      },
    ],
  });

  // ---- RESPONSE NORMALIZATION ----
  const hits = response.hits.hits.map((hit: any) => hit._source);

  const total =
    typeof response.hits.total === "number"
      ? response.hits.total
      : (response.hits.total?.value ?? 0);

  return {
    page: safePage,
    limit: safeLimit,
    total,
    logs: hits,
  };
}
