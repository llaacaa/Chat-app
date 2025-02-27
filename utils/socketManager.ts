import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const socketConnect = () => {
  if (!socket || !socket.connected) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER!, {
      withCredentials: true,
    });

    socket.on('connect', () => {
      console.log('Socket connected:', socket?.id);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    // Example: listen for a message
    socket.on('message', (msg: string) => {
      console.log('Message from server:', msg);
    });
  }
  return socket;
};

export const socketDisconnect = () => {
  if (socket) {
    socket.disconnect();
    socket = null; // Clean up the socket instance
    console.log('Socket connection closed');
  }
};

export const getSocket = (): Socket | null => {
  return socket;
};
