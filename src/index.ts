import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());
app.get("/test", (req, res): void => {
  res.json({ test: "Hello, this is a test endpoint!" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${process.env.APP_PORT}`);
});
