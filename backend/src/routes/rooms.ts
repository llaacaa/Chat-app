import express from "express";
import asyncHandler from "../utils/catchAsync";
import { checkForToken } from "../utils/jsonWebToken";
import { getAllRooms } from "../controller/rooms";

const roomsRouter = express.Router();

roomsRouter.post("/getAllRooms", checkForToken, asyncHandler(getAllRooms));

export default roomsRouter;