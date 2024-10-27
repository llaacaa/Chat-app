import express from "express";
import asyncHandler from "../utils/catchAsync";
import { registerUser, loginUser, logoutUser } from "../controller/user";
import { checkForToken } from "../utils/jsonWebToken"; 

const router = express.Router();

router.get("/test-check", asyncHandler(checkForToken));

router.post("/register", asyncHandler(registerUser));

router.post("/login", asyncHandler(loginUser));

router.post("/logout", asyncHandler(logoutUser))


export default router;