import { Response } from "express";
import { AuthenticatedRequest } from "../utils/jsonWebToken";
import Room from "../model/Room";

export const getAllRooms = async (req: AuthenticatedRequest, res: Response) => {
  const userIDFROM = req.userData;

  const rooms = await Room.find({
    members: userIDFROM,
  });

  res.status(200).json(rooms);
};
