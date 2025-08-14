import { Request, Response, NextFunction } from "express";
import tasksServices from "../../services/tasks/admin-tasks-services";

const add = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        errors: "User not authenticated",
      });
    }
    const data = {
      ...req.body,
      id_user: userId,
    };

    const result = await tasksServices.add(data);
    res.status(201).json({
      data: {
        task: result,
      },
      message: "Task added successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getDataById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        errors: "User not authenticated",
      });
    }
    const taskId = parseInt(req.params.id, 10);
    const data = {
      id: taskId,
      id_user: userId,
    };
    const result = await tasksServices.getDataById(data);
    res.status(200).json({
      data: {
        task: result,
      },
      message: "Task retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};
const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        errors: "User not authenticated",
      });
    }
    const taskId = parseInt(req.params.id, 10);
    const data = {
      id: taskId,
      id_user: userId,
    };
    await tasksServices.remove(data);
    res.status(200).json({
      data: "OK",
    });
  } catch (error) {
    next(error);
  }
};
export default {
  add,
  remove,
  getDataById,
};
