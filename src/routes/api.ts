import express from "express";
import {
  authMiddleware,
  adminMiddleware,
} from "../middleware/auth-middleware.js";
import authController from "../controller/auth-controller.js";
import userController from "../controller/user-controller.js";
import tasksController from "../controller/tasks/admin-tasks-controller.js";
import technicianTasksController from "../controller/tasks/technician-tasks-controller.js";
const protectedRouter = express.Router();

// auth protected routes
protectedRouter.use("/api/auth", authMiddleware);
protectedRouter.post("/api/auth/logout", authController.logout);

protectedRouter.use("/api/users", authMiddleware);
protectedRouter.get("/api/users/current", userController.getCurrentUser);
protectedRouter.patch("/api/users/current", userController.updateCurrentUser);

// admin protected routes
protectedRouter.use("/api/admin", adminMiddleware);
protectedRouter.get("/api/admin/users", userController.getAllUsers);
protectedRouter.get("/api/admin/users/:id", userController.getUserById);
protectedRouter.delete("/api/admin/users/:id", userController.deleteUser);

// admin tasks routes
protectedRouter.use("/api/admin/tasks", adminMiddleware);
protectedRouter.post("/api/admin/tasks/add", tasksController.add);
protectedRouter.delete("/api/admin/tasks/:id", tasksController.remove);
protectedRouter.get("/api/admin/tasks/:id", tasksController.getDataById);
protectedRouter.get("/api/admin/tasks", tasksController.getAllData);
protectedRouter.patch("/api/admin/tasks/:id", tasksController.update);

// technician tasks routes
protectedRouter.use("/api/technician/tasks", authMiddleware);
protectedRouter.patch(
  "/api/technician/tasks/:id",
  technicianTasksController.update
);
export { protectedRouter };
