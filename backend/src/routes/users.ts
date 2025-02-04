import express from "express";
import asyncHandler from "../utils/catchAsync";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
} from "../controller/user";
import { checkForToken } from "../utils/jsonWebToken";

const userRouter = express.Router();

userRouter.post("/register", asyncHandler(registerUser));

userRouter.post("/login", asyncHandler(loginUser));

userRouter.post("/logout", checkForToken, asyncHandler(logoutUser));

userRouter.post("/getProfile", checkForToken, asyncHandler(getUserProfile));

export default userRouter;
