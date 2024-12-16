import { Server } from "socket.io";
import http from "http";

type TServerInstance = http.Server;

let io: Server | null = null;

function startSocket(server: TServerInstance): Server {
  if (!io) {
    io = new Server(server, {
      cors: {
        origin: process.env.NEXT_SERVER_URL,
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    io.on("connection", (socket) => {
      console.log("A user connected");

      socket.on("message", (msg) => {
        console.log("Message received: " + msg);
        io?.emit("message", "What's up frontend?");
      });

      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
  }
  return io;
}

export default startSocket;


export function getSocketIO(): Server | null {
  return io;
}
