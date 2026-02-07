import { elasticClient } from "./database.js";

async function createIndex() {
  const exists = await elasticClient.indices.exists({ index: "logs" });

  if (!exists) {
    await elasticClient.indices.create({
      index: "logs",
      mappings: {
        properties: {
          level: { type: "keyword" },
          message: { type: "text" },
          resourceId: { type: "keyword" },
          timestamp: { type: "date" },
          traceId: { type: "keyword" },
          spanId: { type: "keyword" },
          commit: { type: "keyword" },
          metadata: {
            properties: {
              parentResourceId: { type: "keyword" },
            },
          },
        },
      },
    });

    console.log("✅ Elasticsearch index created");
  } else {
    console.log("ℹ️ Elasticsearch index already exists");
  }
}

createIndex().catch(console.error);
