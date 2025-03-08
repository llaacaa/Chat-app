import express from "express";
import asyncHandler from "../utils/catchAsync";
import { checkForToken } from "../utils/jsonWebToken";
import { createRoom, getAllRooms, getRoomInfo } from "../controller/rooms";

const roomsRouter = express.Router();

roomsRouter.post("/getAllRooms", checkForToken, asyncHandler(getAllRooms));
roomsRouter.post("/getRoomInfo", checkForToken, asyncHandler(getRoomInfo));
roomsRouter.post("/createRoom", checkForToken, asyncHandler(createRoom));


export default roomsRouter;