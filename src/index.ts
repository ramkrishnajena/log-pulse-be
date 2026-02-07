import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import logRoutes from "./routes/log.routes.js";
import { checkElasticConnection } from "./config/database.js";
dotenv.config();
const app = express();
const port = process.env.APP_PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173", // React dev server
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use("/api/v1", logRoutes);

app.get("/test", (req, res): void => {
  res.json({ test: "Hello, this is a test endpoint!" });
});

app.listen(port, async () => {
  await checkElasticConnection();
  console.log(`Server is running on http://localhost:${process.env.APP_PORT}`);
});
