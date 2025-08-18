import { Request, Response, NextFunction } from "express";
import technicianTasksServices from "../../services/tasks/technician-tasks-services";

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        errors: "User not authenticated",
      });
    }
    const id = parseInt(req.params.id, 10);
    const { status, note } = req.body;
    const task = { id, status, note };
    const result = await technicianTasksServices.update(task, userId);
    res.status(200).json({
      data: {
        task: result,
      },
      message: "Task updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default { update };
