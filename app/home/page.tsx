"use client";

import { useEffect, useState } from "react";
import { getSocket, sendMessage } from "@/utils/SocketConnection";
import { CustomSocket } from "@/types/socket";


export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<CustomSocket>();
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    return () => {
      socket?.disconnect();
    }
  }, [socket]);

  function socketConnect() {
    if (!isConnected) {
      setSocket(getSocket());
      setIsConnected(true);
    }
    else {
      alert("Already Connected!");
    }
  }


  function socketDisconnect() {
    socket?.disconnect();
    setSocket(undefined);
    setIsConnected(false);
  }
   
  function handleSendMessage() {
    if (socket) {
      sendMessage(socket, inputText);
    } else {
      alert("Socket is not connected!");
    }
  }

  return (
    <div>
      <button onClick={socketConnect}>Connect</button>
      {isConnected && <div>
        {inputText.length > 0 && <button onClick={handleSendMessage}>Send Message</button>}
        <input type="text" className="text-fuchsia-800" value={inputText} onChange={(e) => setInputText(e.target.value)}/>
        <button onClick={socketDisconnect}>Disconnect</button>
      </div>}
    </div>
  );
}
