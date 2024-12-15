import express from "express";
import asyncHandler from "../utils/catchAsync";
import { registerUser, loginUser, logoutUser, getUserProfile } from "../controller/user";
import { checkForToken } from "../utils/jsonWebToken"; 

const userRouter = express.Router();

userRouter.get("/test-check", asyncHandler(checkForToken));

userRouter.post("/register", asyncHandler(registerUser));

userRouter.post("/login", asyncHandler(loginUser));

userRouter.post("/logout", asyncHandler(logoutUser))

userRouter.post("/getProfile", asyncHandler(getUserProfile));

export default userRouter;