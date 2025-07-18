/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorSource: any = [];
  let statusCode = 500;
  let message = `Something Went Wrong!! ${err.message}`;
  if (err.code === 11000) {
    const matchedArray = err.message.match(/"([^"]*)"/);
    statusCode = 400;
    message = `${matchedArray[1]} Already Exist`;
  } else if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid MongoDB ObjectID. Please provide a valid id";
  }
   else if (err.name === "ValidationError") {
    statusCode = 400;
    const error = Object.values(err.errors);

    error.forEach((errorObject: any) =>
      errorSource.push({
        path: errorObject.path,
        message: errorObject.message,
      })
    );
    message = "Validation Error";
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    err,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
};
