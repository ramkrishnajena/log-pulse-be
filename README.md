# 🚀 LogPulse – Log Ingestion & Search System (Node.js + Elasticsearch)

LogPulse is a scalable log ingestion and querying system built with **Node.js, TypeScript, Express, and Elasticsearch**.  
It supports **high-volume log ingestion**, **full-text search**, **structured filtering**, and **advanced querying**.

This project is designed as a **production-ready backend service** and fulfills the requirements of the given take-home assignment.

---

## 🧱 Tech Stack

- Node.js
- TypeScript
- Express
- Elasticsearch
- Docker (for Elasticsearch)
- CORS enabled for frontend integration

---

## 📁 Project Structure

```
LogPulse/
├── src/
│ ├── config/ # Elasticsearch configuration
│ ├── controllers/ # HTTP request handlers
│ ├── middleware/ # Validation, auth, error handling
│ ├── routes/ # API routes
│ ├── services/ # Business logic
│ ├── common/ # Common files
│ └── index.ts # App entry point
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Prerequisites

Create a `.env` file using `.env.example`:

Make sure you have the following installed:

- Node.js (v16 or later)
- Docker
- npm

---

## 🐳 Step 1: Run Elasticsearch (Local)

Elasticsearch is required for log storage and search functionality.

### Option 1: Run Elasticsearch Locally (Recommended for Development)

If you are running the project locally, start Elasticsearch using Docker:

```bash
docker run -d \
  --name logpulse-es \
  -p 9200:9200 \
  -e "discovery.type=single-node" \
  -e "xpack.security.enabled=false" \
  elasticsearch:8.11.1
```

### Option 2: Use a Production / Hosted Elasticsearch

If you already have access to a hosted or production Elasticsearch cluster (for example, Elastic Cloud or a company-managed cluster), you can use its URL instead.

Update the Elasticsearch configuration in your .env file:

ELASTICSEARCH_URL=https://your-elasticsearch-url

Make sure the cluster is reachable from your application and authentication (if enabled) is properly configured.

## 🗂️ Step 2: Install Dependencies

Install all required Node.js dependencies:

```bash
npm install
```

## 🗂️ Step 3: Create Elasticsearch Index

Before ingesting logs, you must create the Elasticsearch index with proper mappings.

Run the following command **once**:

```bash
npx ts-node src/config/createIndex.ts

```

## ▶️ Step 4: Run the Application

Start the Node.js server in development mode:

```bash
npm run dev
```

If everything is set up correctly, you should see:

```bash
Server is running on http://localhost:3000
```
