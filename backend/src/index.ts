import express from "express";
import { createServer } from "http";

import dotenv from "dotenv";
import cors from "cors";
import mongoConnect from "./utils/mongoConnect";
import cookieParser from "cookie-parser";
import startSocket from "./utils/socket";
import userRouter from "./routes/users";
import friendsRouter from "./routes/friends";
import roomsRouter from "./routes/rooms";

dotenv.config();
mongoConnect();

const app = express();
const server = createServer(app);

startSocket(server);

//Cors
const corsOptions = {
  origin: process.env.NEXT_SERVER_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
// To handle JSON data
app.use(express.json());

// To handle x-www-form-urlencoded data
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/user", userRouter);
app.use("/friends", friendsRouter);
app.use("/rooms", roomsRouter);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
