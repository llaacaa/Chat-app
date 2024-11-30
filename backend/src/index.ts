import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/users";
import mongoConnect from "./utils/mongoConnect";
import cookieParser from 'cookie-parser';

dotenv.config();
mongoConnect();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.NEXT_SERVER_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

//Cors
const corsOptions = {
  origin: process.env.NEXT_SERVER_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, 
};

app.use(cors(corsOptions));
// To handle JSON data
app.use(express.json());

// To handle x-www-form-urlencoded data
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

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

app.use("/user", router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
