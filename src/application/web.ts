import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { publicRouter } from "../routes/public-api";
import { protectedRouter } from "../routes/api";
import { errorMiddleware } from "../middleware/error-middleware";

export const web = express();

web.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
web.use(express.json());
web.use(cookieParser());
web.use(publicRouter);
web.use(protectedRouter);
web.use(errorMiddleware);
