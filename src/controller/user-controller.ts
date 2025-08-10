import userServices from "../services/user-services.js";
import { Request, Response, NextFunction } from "express";

const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        errors: "User not authenticated",
      });
    }

    const result = await userServices.getCurrentUser(userId);
    const { token, ...userWithoutToken } = result.user;

    res.status(200).json({
      data: {
        user: userWithoutToken,
      },
      message: "User profile retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

const updateCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        errors: "User not authenticated",
      });
    }

    const result = await userServices.updateCurrentUser(userId, req.body);
    const { token, ...userWithoutToken } = result.user;

    res.status(200).json({
      data: {
        user: userWithoutToken,
      },
      message: "Profile updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// admin section

const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userServices.getAllUsers();

    res.status(200).json({
      data: {
        users: users,
        total: users.length,
      },
      message: "Users retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userServices.getUserById(parseInt(req.params.id));

    res.status(200).json({
      data: { user },
      message: "User retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userServices.deleteUser(parseInt(req.params.id), req.user?.id);

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getCurrentUser,
  updateCurrentUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
