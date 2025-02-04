import express from "express";
import asyncHandler from "../utils/catchAsync";
import { manageRequest, sendFriendRequest } from "../controller/friends";
import { checkForToken } from "../utils/jsonWebToken";

const friendsRouter = express.Router();


friendsRouter.post("/sendRequest", checkForToken, asyncHandler(sendFriendRequest));
friendsRouter.post("/manageRequest", checkForToken, asyncHandler(manageRequest));




export default friendsRouter;