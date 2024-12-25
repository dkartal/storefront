import express from "express";
import router from "./routes";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
    optionsSuccessStatus: 200
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api", router);
export default app;
