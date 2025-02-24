"use client";

import { Message } from "@/types/context";
import { sendRoomBackendRequest } from "@/utils/roomsManager";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChatPage() {
  const params = useParams();
  const channelId = params.channelId as string;

  const [messages, setMessages] = useState<Message[] | []>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await sendRoomBackendRequest("loadChatMessages", {roomId: channelId});
      setMessages(response.messages);
    }
    fetchData();
  }, []);

  return (
    <div className="w-full h-1/2 flex items-end justify-center">
      <ul className="p-4 bg-gray-200 rounded-md shadow">
        {messages.map(message => {
         return <li key={message._id}>{message.content}</li>
        })}
      </ul>
    </div>
  );
}
