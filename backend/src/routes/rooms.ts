import express from "express";
import asyncHandler from "../utils/catchAsync";
import { checkForToken } from "../utils/jsonWebToken";
import { getAllRooms, getRoomInfo } from "../controller/rooms";

const roomsRouter = express.Router();

roomsRouter.post("/getAllRooms", checkForToken, asyncHandler(getAllRooms));
roomsRouter.post("/getRoomInfo", checkForToken, asyncHandler(getRoomInfo));


export default roomsRouter;