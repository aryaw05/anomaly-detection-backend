import express from "express";
import cors from "cors";
export const web = express();

web.use(express.json());
web.use(express.static("public"));
web.use(cors());
