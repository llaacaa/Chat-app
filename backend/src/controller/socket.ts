import { Server } from "socket.io"; 
import http from "http";

type TServerInstance = http.Server;

function startSocket(server: TServerInstance): void {
  const io = new Server(server, {
    cors: {
      origin: process.env.NEXT_SERVER_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
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
}

export default startSocket;
