// src/index.ts
import express, { Request, Response, NextFunction } from "express";
import asyncHandler from "./utils/catchAsync";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

// Middleware
app.use(express.json());

// Example route
app.get(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    console.log("Before");
    next(); // Ensure to call next() to proceed to the next handler
  },
  asyncHandler(async (req: Request, res: Response) => {
    // Async handler, safely wrapped with asyncHandler to catch errors
    res.send("Hello, TypeScript with Express!");
  })
);

io.on("connection", (socket) => {
  console.log("a user connected");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
