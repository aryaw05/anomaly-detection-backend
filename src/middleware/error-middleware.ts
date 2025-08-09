import { ResponseError } from "../error/response-error";
import { Request, Response, NextFunction } from "express";

const errorMiddleware = async (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!error) {
    next();
    return;
  }

  if (error instanceof ResponseError) {
    res.status(error.status).json({ errors: error.message });
  } else if (error instanceof Error) {
    res.status(500).json({ message: error.message });
  } else {
    res.status(500).json({ message: "Unknown error occurred" });
  }
};

export { errorMiddleware };
