import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import userController from "../controller/user-controller.js";
const publicRouter = express.Router();

// auth
publicRouter.post("/api/auth/register", userController.register);
publicRouter.post("/api/auth/login", userController.login);
publicRouter.post("/api/auth/logout", authMiddleware, userController.logout);

export { publicRouter };
