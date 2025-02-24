import express from "express";
import asyncHandler from "../utils/catchAsync";
import { checkForToken } from "../utils/jsonWebToken";
import { getAllRooms, loadChatMessages } from "../controller/rooms";

const roomsRouter = express.Router();

roomsRouter.post("/getAllRooms", checkForToken, asyncHandler(getAllRooms));
roomsRouter.post("/loadChatMessages", checkForToken, asyncHandler(loadChatMessages));


export default roomsRouter;