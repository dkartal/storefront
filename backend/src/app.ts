import express from "express";
import router from "./routes";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200
  })
);

app.use(express.json());
app.use("/api", router);
export default app;
