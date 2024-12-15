import express from "express";
import asyncHandler from "../utils/catchAsync";
import { manageRequest, sendFriendRequest } from "../controller/friends";

const friendsRouter = express.Router();


friendsRouter.post("/sendRequest", asyncHandler(sendFriendRequest));
friendsRouter.post("/manageRequest", asyncHandler(manageRequest));




export default friendsRouter;