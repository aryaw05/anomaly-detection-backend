import { Request, Response, NextFunction } from "express";
import publicInfrastructureServices from "../services/public-infrastructure-services";
const getAllData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await publicInfrastructureServices.getAllData();
    res.status(200).json({
      data: {
        infrascturcture: result,
      },
      message: "Task retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getDataById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskId = parseInt(req.params.id, 10);
    const result = await publicInfrastructureServices.getDataById(taskId);
    res.status(200).json({
      data: {
        infrastructure: result,
      },
      message: "Task retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};
export default {
  getAllData,
  getDataById,
};
