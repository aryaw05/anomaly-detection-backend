import { prisma } from "../application/database.js";
import { Request, Response, NextFunction } from "express";
import type { UserData } from "../types/user-types.js";

// extend express request interface
declare global {
  namespace Express {
    interface Request {
      user?: UserData;
    }
  }
}

// user auth middleware
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // ambil token dari http only cookie
    const token = req.cookies?.authToken;

    if (!token) {
      res.status(401).json({
        errors: "Unauthorized - No token provided",
      });
      return;
    }

    // cari user dengan token valid
    const user = await prisma.user.findFirst({
      where: {
        token: token,
        tokenExpiresAt: {
          gt: new Date(),
        },
      },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      // hapus invalid cookie
      res.clearCookie("authToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      res.status(401).json({
        errors: "Unauthorized - Invalid or expired token",
      });
      return;
    }

    // attach user
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({
      errors: "Internal server error during authentication",
    });
    return;
  }
};

// admin only middleware
export const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // auth check
  await authMiddleware(req, res, () => {
    // admin check
    if (req.user?.role !== "ADMIN") {
      res.status(403).json({
        errors: "Forbidden - Admin access required",
      });
      return;
    }
    next();
  });
};
