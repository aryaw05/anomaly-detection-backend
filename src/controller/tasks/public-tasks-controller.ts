import { NextFunction, Request, Response } from "express";
import publicTasks from "../../services/tasks/public-tasks-services";

const getDataById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskId = parseInt(req.params.id, 10);
    const result = await publicTasks.getDataById(taskId);
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
export default {
  getDataById,
};
