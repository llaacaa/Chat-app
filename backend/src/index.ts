import express, { Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./model/User";
import { Encrypt } from "./utils/bcryptEncription";
import asyncHandler from "./utils/catchAsync";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.NEXT_SERVER_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

mongoose
  .connect(process.env.MONGODB_URL || "")
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("message", (msg) => {
    console.log("Message received: " + msg);
    io.emit("message", "Whats up frontend?");
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const password = "lacanajjaci123";
    const newPassword = await Encrypt.cryptPassword(password);
    const user = new User({
      username: "Laca",
      email: "lazarkojic@gmail.com",
      password: newPassword,
      friends: [],
    });

    await user.save();

    res.send("<h1>Good</h1>");
    next();
  })
);






const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
