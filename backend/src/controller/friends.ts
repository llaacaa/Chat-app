import { Request, Response } from "express";
import jsonWebToken from "../utils/jsonWebToken";
import User from "../model/User";
import { JwtPayload } from "jsonwebtoken";

export const sendFriendRequest = async (
  req: Request,
  res: Response
) => {
  // checkForToken(req, res, next);

  const token =
    req.cookies.token || req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const userData = jsonWebToken.verifyToken(token);
  if (!userData) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }

  const username = req.body.username;
  const userIDFROM = (jsonWebToken.verifyToken(req.cookies.token) as JwtPayload)
    .userId;

  const userTo = await User.findOne({ username });
  const userFrom = await User.findById(userIDFROM);
  res.send({ userTo, userFrom });
};

export const manageRequest = async (req: Request, res: Response) => {
  console.log("THROUGH " + req.body.username);
};
