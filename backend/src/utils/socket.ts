import { Server } from "socket.io";
import http from "http";
import jsonWebToken from "./jsonWebToken";
import { JwtPayload } from "jsonwebtoken";
import Message from "../model/Message";
import Room from "../model/Room";

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
          socket.data.userData = {
            userId: userData.userId,
            username: userData.username,
          };
          console.log(
            `User ${userData.userId}(${userData.username}) connected with socket ID ${socket.id}`
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

      socket.on("send-message", async (message, roomId) => {
        console.log(
          `Message: ${message}, roomId: ${roomId}, sender: ${socket.data.userData.username}`
        );
      
        const messageData = new Message({
          sender: socket.data.userData.userId,
          content: message,
          room: roomId,
          timestamp: Date.now(),
        });
      
        try {
          const savedMessage = await messageData.save();
      
          const populatedMessage = await savedMessage.populate("sender");
      
          io!.to(roomId).emit("receive-message", populatedMessage);
      
          await Room.findByIdAndUpdate(roomId, {
            $push: { messages: savedMessage._id },
          });
        } catch (error) {
          console.error("Error saving message or updating room:", error);
        }
      });
      

      socket.on("join-room", (roomId) => {
        socket.join(roomId);

        io?.to(roomId).emit("user-joined", {
          id: socket.id,
          message: `New user has joined the room ${roomId}`,
        });
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
