/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { AuthServices } from "./auth.servise";
import AppError from "../../errorHelpers/AppError";
import { setAuthCookies } from "../../utils/setCookies";

const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthServices.credentialsLogin(req.body);

    setAuthCookies(res, loginInfo);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Login Successfully",
      data: loginInfo,
    });
  }
);
const getNewAccessToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "No refresh token recieved from cookies"
      );
    }
    const tokenInfo = await AuthServices.getNewAccessToken(refreshToken);
    setAuthCookies(res, tokenInfo);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Create New Access Token Successfully",
      data: tokenInfo,
    });
  }
);
const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Logged Out Successfully",
      data: null,
    });
  }
);
const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user
    const newPassword = req.body.newPassword
    const oldPassword = req.body.oldPassword

    await AuthServices.resetPassword(oldPassword, newPassword,decodedToken)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Password Changed Successfully",
      data: null,
    });
  }
);

export const AuthController = {
  credentialsLogin,
  getNewAccessToken,
  logout,
  resetPassword
};
