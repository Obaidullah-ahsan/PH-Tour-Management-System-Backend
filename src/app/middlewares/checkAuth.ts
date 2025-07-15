import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../utils/jwt";
import AppError from "../errorHelpers/AppError";
import { envVars } from "../config/env";

export const checkAuth =
  (...authRole: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        throw new AppError(403, "No Token Recieved");
      }
      const verifiedToken = verifyToken(accessToken,envVars.JWT_ACCESS_SECRET) as JwtPayload;
      if (!authRole.includes(verifiedToken.role)) {
        throw new AppError(403, "You are not permitted to view this route!!");
      }
      req.user = verifiedToken
      next();
    } catch (error) {
      next(error);
    }
  };
