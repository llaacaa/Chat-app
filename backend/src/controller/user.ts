import { Request, Response, NextFunction } from "express";
import jsonWebToken from "../utils/jsonWebToken";
import User from "../model/User";
import { Encrypt } from "../utils/bcryptEncription";
import { JwtPayload } from "jsonwebtoken";

//Takes params to register a user and returns JWT
export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const searchUser = await User.findOne({ username });
  if (searchUser) {
    return res.status(400).send({
      message: "User already registered",
    });
  }

  const usernameRegex = /^[a-zA-Z0-9_]+$/;

  //EDIT Quick user info validation maybe will upgrade it later
  if (!username || !email || !password) {
    return res.status(400).send({
      message: "Invalid data. Username, email, and password are required.",
    });
  } else if (
    !email.includes("@") ||
    !email.includes(".") ||
    email.length < 5 ||
    username.length < 4 ||
    !usernameRegex.test(username)
  ) {
    const message = "Invalid information.";
    return res.status(400).send({
      message,
    });
  }
  if (password.length < 6) {
    const message = "Password must be 6 characters or more.";
    return res.status(400).send({
      message,
    });
  }

  const hashedPassword = await Encrypt.cryptPassword(password);
  const user = new User({
    username,
    email,
    password: hashedPassword,
  });
  await user.save();

  const token = jsonWebToken.generateToken(user.id);

  res.cookie("token", token, {
    maxAge: 3600000,
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    domain: "localhost",
  });

  return res.status(201).json({
    message: "User registered successfully!",
  });
};

//Takes params to login a user and returns JWT
export const loginUser = async (req: Request, res: Response) => {
  const { usernameOrEmail, password } = req.body;
  const searchUser = await User.findOne({
    $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
  }); 
  if (!searchUser) {
    return res.status(400).json({
      message: "No user found with that email or username.",
    });
  }
  const isPasswordValid = await Encrypt.comparePassword(
    password,
    searchUser.password
  );
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid information.",
    });
  }

  const token = jsonWebToken.generateToken(searchUser.id);

  res.cookie("token", token, {
    maxAge: 3600000,
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    domain: "localhost",
  });

  return res.status(201).json({
    message: "User logged in successfully!",
  });
};

//Requires to already have JWT
export const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie("token", { path: "/" });
  res.status(200).send("Successfully logged out.");
};

export const getUserProfile = async (req: Request, res: Response) => {
  const token =
    req.cookies.token || req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  const userData = jsonWebToken.verifyToken(token);
  if (!userData) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
  const user = await User.findById((userData as JwtPayload).userId)
  .populate('friends')
  .populate('pendingFriendRequests');


  return res.status(200).json({
    user,
  });
};

//Requires to already have JWT
export const updateUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

//Requires to already have JWT
export const changeUserPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

//Requires to provide email or username
export const forgotUserPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

//Call this upon register, login and forgotUserPassword
export const emailVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
