import { NextFunction, Response, Request } from "express";
import { CustomError } from "../utils";

export function notFound(req: Request, res: Response, next: NextFunction) {
  const err = new CustomError("Not found");
  err.status = 404;
  next(err);
}

export function catchAsync(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err) => next(err));
  };
}

export function catchErrors(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message,
  });
}
