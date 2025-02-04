import { Request, Response } from "express";
import { AuthenticatedRequest } from "../utils/jsonWebToken";
import User, { IUser } from "../model/User";
import { getSocketIdFromUserId, getSocketIO } from "./socket";
import { Types } from "mongoose";

export const sendFriendRequest = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const username = req.body.username;
  const userIDFROM = req.userData;

  const userTo: IUser | null | undefined = await User.findOne({ username });
  const userFrom: IUser | null | undefined = await User.findById(userIDFROM);

  if (userTo && userFrom) {
    userTo?.pendingFriendRequests.push(userFrom?._id as Types.ObjectId);
    await userTo!.save();
  }

  const io = getSocketIO();
  const userToSocketId = getSocketIdFromUserId(userTo?.id);
  console.log(userToSocketId);

  if (io) {
    io.to(userToSocketId).emit("friend-request", {
      from: userFrom,
      to: userTo,
      message: `${userFrom} has sent you a friend request.`,
    });
  }

  res.send({ userTo, userFrom });
};

export const manageRequest = async (req: Request, res: Response) => {
  console.log("THROUGH " + req.body.username);
};
