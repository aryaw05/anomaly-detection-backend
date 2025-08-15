import express from "express";
import authController from "../controller/auth-controller.js";
import publicInfrastructureController from "../controller/public-infrastructure-controller.js";

const publicRouter = express.Router();

// auth
publicRouter.post("/api/auth/register", authController.register);
publicRouter.post("/api/auth/login", authController.login);

// public infrastructure
publicRouter.get(
  "/api/public/infrastructure",
  publicInfrastructureController.getAllData
);
publicRouter.get(
  "/api/public/infrastructure/:id",
  publicInfrastructureController.getDataById
);
export { publicRouter };
