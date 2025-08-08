import { ResponseError } from "../error/response-error";

import { Request, Response, NextFunction } from "express";
const errorMiddleware = async (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!error) {
    next();
    return;
  }

  if (error instanceof ResponseError) {
    res.status(error.status).json({ errors: error.message });
  } else {
    res.status(500).json({ message: error.message }).end();
  }
};

export { errorMiddleware };
