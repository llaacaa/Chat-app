// components/SocketComponent.js

import { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000/'); // Replace with your server URL

const SocketComponent = () => {
  useEffect(() => {
    // Listen for messages from the server
    socket.on('message', (msg) => {
      console.log('Message from server:', msg);
    });

    // Clean up on component unmount
    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    socket.emit('message', 'Hello from Next.js!');
  };

  return (
    <div>
      <h1>Socket.IO in Next.js</h1>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default SocketComponent;
