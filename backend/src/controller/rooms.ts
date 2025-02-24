import { Response } from "express";
import { AuthenticatedRequest } from "../utils/jsonWebToken";
import Room from "../model/Room";
import Message from "../model/Message";

export const getAllRooms = async (req: AuthenticatedRequest, res: Response) => {
  const loggedInUser = req.userData;

  const rooms = await Room.find({
    members: loggedInUser,
  });

  res.status(200).json(rooms);
};

export const loadChatMessages = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const loggedInUser = req.userData;

  const roomId = req.body.roomId;

  if (!roomId) {
    res.status(401).json({ message: "No roomId provided." });
  }

  const room = await Room.findById(roomId, { members: loggedInUser })

  if (!room) {
    res.status(404).json({ message: "Room not found or not member of it." });
  }

  res.status(200).json({ messages: room?.messages || [] });
};
