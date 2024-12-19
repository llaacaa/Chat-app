import { Server } from "socket.io";
import http from "http";
import jsonWebToken from "../utils/jsonWebToken";
import { JwtPayload } from "jsonwebtoken";

type TServerInstance = http.Server;

let io: Server | null = null;

interface ConnectedUsers {
  [userId: string]: string;
}

const connectedUsers: ConnectedUsers = {};

export const getSocketIdFromUserId = (userId: string) => {
  return connectedUsers[userId];
};

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
      const cookies = socket.handshake.headers.cookie;
      const token = extractTokenFromCookies(cookies);

      if (token) {
        const userData = jsonWebToken.verifyToken(token) as JwtPayload; // Verify the token
        if (userData) {
          connectedUsers[userData.userId] = socket.id; // Map userId to socket.id
          console.log(
            `User ${userData.userId} connected with socket ID ${socket.id}`
          );
        } else {
          console.log("Invalid token");
          socket.disconnect(); // Optionally disconnect invalid clients
          return;
        }
      } else {
        console.log("No token provided");
        socket.disconnect(); // Optionally disconnect clients without a token
        return;
      }

      socket.on("message", (msg) => {
        console.log("Message received: " + msg);
        io?.emit("message", "What's up frontend?");
      });

      socket.on("disconnect", () => {
        const userId = Object.keys(connectedUsers).find(
          (key) => connectedUsers[key] === socket.id
        );
        if (userId) {
          delete connectedUsers[userId];
          console.log(`User ${userId} disconnected`);
        }
      });
    });
  }
  return io;
}

export default startSocket;

export function getSocketIO(): Server | null {
  return io;
}

function extractTokenFromCookies(cookies?: string): string | null {
  if (!cookies) return null;

  const [key, value] = cookies.split("=");
  return key === "token" ? value : null;
}
