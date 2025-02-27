import { Response } from "express";
import { AuthenticatedRequest } from "../utils/jsonWebToken";
import User, { IUser } from "../model/User";
import { getSocketIdFromUserId, getSocketIO } from "../utils/socket";
import Room from "../model/Room";

export const sendFriendRequest = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const username = req.body.username;
  const userIDFROM = req.userData;

  const userTo: IUser | null | undefined = await User.findOne({ username });
  const userFrom: IUser | null | undefined = await User.findById(userIDFROM);

  if (userTo && userFrom) {
    await User.updateOne(
      { _id: userTo?._id },
      {
        $addToSet: { pendingFriendRequests: userFrom?._id },
      }
    );
  }

  const io = getSocketIO();
  const userToSocketId = getSocketIdFromUserId(userTo?.id);

  if (io) {
    io.to(userToSocketId).emit("friend-request", {
      from: userFrom,
      to: userTo,
      message: `${userFrom} has sent you a friend request.`,
    });
  }

  res.status(200).send({ userTo, userFrom });
};

export const manageRequest = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const requestFromUsername = req.body.requestFromUsername;
  const requestToUserID = req.userData;

  const isAccept = req.body.isAccept;

  const userFrom: IUser | null | undefined = await User.findOne({
    username: requestFromUsername,
  }).populate("pendingFriendRequests");

  const userTo: IUser | null | undefined = await User.findById(requestToUserID);

  if (isAccept == null) {
    res.status(400).send({
      message: "Invalid data",
    });
  }

  if (isAccept) {
    const room = new Room({
      name: userFrom?.username + "-" + userTo?.username,
      members: [userFrom?._id, userTo?._id],
      isGroupChat: false,
    });

    await room.save();

    await User.updateOne(
      { _id: userTo?._id },
      {
        $addToSet: { friends: userFrom?._id, rooms: room._id },
        $pull: { pendingFriendRequests: userFrom?._id },
      }
    );

    await User.updateOne(
      { _id: userFrom?._id },
      {
        $addToSet: { friends: userTo?._id, rooms: room._id },
        $pull: { pendingFriendRequests: userTo?._id },
      }
    );

    const io = getSocketIO();

    const userFromSocketId = getSocketIdFromUserId(userFrom?.id);
    const userToSocketId = getSocketIdFromUserId(userTo?.id);

    if (io) {
      io.to(userToSocketId).emit("friend-request", {
        from: userFrom,
        to: userTo,
        message: `${userFrom} added as a friend..`,
      });

      io.to(userFromSocketId).emit("friend-request", {
        from: userTo,
        to: userFrom,
        message: `${userTo} added as a friend..`,
      });
    }
  } else {
    await User.updateOne(
      { _id: userTo?._id },
      { $pull: { pendingFriendRequests: userFrom?._id } }
    );

    const io = getSocketIO();
    const userToSocketId = getSocketIdFromUserId(userTo?.id);

    if (io) {
      io.to(userToSocketId).emit("friend-request", {
        from: userFrom,
        to: userTo,
        message: `${userFrom} added as a friend..`,
      });
    }
  }

  res.status(200);
};
