import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import authController from "../controller/auth-controller.js";
const publicRouter = express.Router();

// auth
publicRouter.post("/api/auth/register", authController.register);
publicRouter.post("/api/auth/login", authController.login);
publicRouter.post("/api/auth/logout", authMiddleware, authController.logout);

export { publicRouter };
