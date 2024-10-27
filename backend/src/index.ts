import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import router from "./routes/users";
import mongoConnect from "./utils/mongoConnect";


const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.NEXT_SERVER_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

dotenv.config();
mongoConnect();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', `${process.env.NEXT_SERVER_URL}`); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');  
  next();
});



// To handle JSON data
app.use(express.json());

// To handle x-www-form-urlencoded data
app.use(express.urlencoded({ extended: true }));


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

app.use("/users", router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
