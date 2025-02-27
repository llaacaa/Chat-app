"use client";

import { Message } from "@/types/context";
import { sendRoomBackendRequest } from "@/utils/roomsManager";
import { socketConnect } from "@/utils/socketManager";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function ChatPage() {
  const params = useParams();
  const channelId = params.channelId as string;

  const [messages, setMessages] = useState<Message[] | []>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await sendRoomBackendRequest("loadChatMessages", {
        roomId: channelId,
      });
      setMessages(response.messages);
    };
    fetchData();
  }, []);

  const socket = socketConnect();

  socket.on("receive-message", (data) => {
    console.log("🚀 ~ socket.on ~ data:", data)
  })

  async function httpMessageUpload(evt: FormEvent) {
    evt.preventDefault();
    // const respone = await sendRoomBackendRequest('', {message: newMessage})

    socket.emit("send-message", newMessage, channelId);
    setNewMessage("");
  }

  return (
    <div>
      <div className="w-full h-1/2 flex items-end justify-center">
        <ul className="p-4 bg-gray-200 rounded-md shadow">
          {messages.map((message) => {
            return <li key={message._id}>{message.content}</li>;
          })}
        </ul>
      </div>
      <section className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <form onSubmit={httpMessageUpload}>
          <input type="text" className="border" value={newMessage} onChange={(evt) => setNewMessage(evt.target.value)}/>
        </form>
      </section>
    </div>
  );
}
