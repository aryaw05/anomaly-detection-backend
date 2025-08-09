import authServices from "../services/auth-services.js";
import { Request, Response, NextFunction } from "express";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authServices.register(req.body);

    res.status(201).json({
      data: {
        user: {
          id: result.user.id,
          username: result.user.username,
          email: result.user.email,
          name: result.user.name,
          role: result.user.role,
        },
      },
      message: "User registered successfully. Please login to continue.",
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authServices.login(req.body);

    // set http only cookie
    if (result.user.token) {
      res.cookie("authToken", result.user.token, {
        httpOnly: true,
        secure: false, // ubah ke true kalau https
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
        path: "/",
      });

      // hapus token dari response
      const { token, ...userWithoutToken } = result.user;

      res.status(200).json({
        data: {
          user: userWithoutToken,
        },
        message: "Login successful",
      });
    } else {
      res.status(500).json({
        error: "Failed to generate authentication token",
      });
    }
  } catch (error) {
    next(error);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        error: "User not authenticated",
      });
    }

    await authServices.logout(userId);

    // hapus cookie
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
};

export default { register, login, logout };
