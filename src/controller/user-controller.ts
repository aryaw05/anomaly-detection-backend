import userServices from "../services/user-services.js";

import { Request, Response, NextFunction } from "express";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userServices.register(req.body);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userServices.login(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.user.id;
    await userServices.logout(token);
    res.status(200).json({
      data: "OK",
    });
  } catch (error) {
    next(error);
  }
};

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;
    const result = await userServices.getUser(userId);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;
    const result = await userServices.update(req.body, userId);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export default { register, login, logout, get, update };
