import { CustomSocket } from '@/types/socket';
import { io } from 'socket.io-client';

 
export function getSocket() {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER);
    socket.on('message', (msg: string) => {
      console.log('Message from server:', msg);
    });
    return socket;
}    

export function sendMessage(socket: CustomSocket, message: string) {
    socket.emit('message', message);
}








  