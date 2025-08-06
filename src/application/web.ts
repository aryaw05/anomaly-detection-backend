import express from "express";
import cors from "cors";
export const web = express();

web.use(express.json());
web.use(cors());
