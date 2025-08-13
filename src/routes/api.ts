import express from "express";
import {
  authMiddleware,
  adminMiddleware,
} from "../middleware/auth-middleware.js";
import authController from "../controller/auth-controller.js";
import userController from "../controller/user-controller.js";
import tasksController from "../controller/tasks/tasks-controller.js";
const protectedRouter = express.Router();

// auth protected routes
protectedRouter.use("/api/auth", authMiddleware);
protectedRouter.post("/logout", authController.logout);

protectedRouter.use("/api/users", authMiddleware);
protectedRouter.get("/api/users/current", userController.getCurrentUser);
protectedRouter.patch("/api/users/current", userController.updateCurrentUser);

// admin protected routes
protectedRouter.use("/api/admin", adminMiddleware);
protectedRouter.get("/api/admin/users", userController.getAllUsers);
protectedRouter.get("/api/admin/users/:id", userController.getUserById);
protectedRouter.delete("/api/admin/users/:id", userController.deleteUser);

// admin tasks protected routes
protectedRouter.use("/api/tasks", adminMiddleware);
protectedRouter.post("/api/tasks/add", tasksController.add);
protectedRouter.delete("/api/tasks/:id", tasksController.remove);
protectedRouter.get("/api/tasks/:id", tasksController.getDataById);

export { protectedRouter };
