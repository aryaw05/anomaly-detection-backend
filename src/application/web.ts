import express from "express";
import cors from "cors";
import { publicRouter } from "../routes/public-api";
import { errorMiddleware } from "../middleware/error-middleware";
export const web = express();

web.use(express.json());
web.use(cors());
web.use(publicRouter);
web.use(errorMiddleware);
