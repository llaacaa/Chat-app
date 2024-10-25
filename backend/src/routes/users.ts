import express from "express";
import asyncHandler from "../utils/catchAsync";
import { registerUser, loginUser, logoutUser } from "../controller/user";

const router = express.Router();

router.post("/register", asyncHandler(registerUser));

router.post("/login", )

router.post("/logout", )

//dev branch


export default router;