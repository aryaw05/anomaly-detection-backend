import { prisma } from "../application/database.js";

import { Request, Response, NextFunction } from "express";
import { User } from "../types/user-types.js";
export const authMiddleware = async (
  req: Request<User>,
  res: Response,
  next: NextFunction
) => {
  const token = req.get("Authorization");
  if (!token) {
    res
      .status(401)
      .json({
        errors: "Unauthorized",
      })
      .end();
  } else {
    const user = await prisma.user.findFirst({
      where: {
        token: token,
      },
    });
    if (!user) {
      res
        .status(401)
        .json({
          errors: "Unauthorized",
        })
        .end();
    } else {
      req.user = user;
      next();
    }
  }
};
