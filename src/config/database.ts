import { Client } from "@elastic/elasticsearch";

const ELASTICSEARCH_URL =
  process.env.ELASTICSEARCH_URL || "http://localhost:9200";

export const elasticClient = new Client({
  node: ELASTICSEARCH_URL,
});

export async function checkElasticConnection() {
  try {
    await elasticClient.ping();
    console.log("✅ Connected to Elasticsearch");
  } catch (error) {
    console.error("❌ Elasticsearch connection failed");
    process.exit(1);
  }
}
