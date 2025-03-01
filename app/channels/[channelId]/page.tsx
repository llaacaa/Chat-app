"use client";

import useMessages from "@/hooks/useMessages";
import { Message } from "@/types/context";
import { sendRoomBackendRequest } from "@/utils/roomsManager";
import { getSocket } from "@/utils/socketManager";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function ChatPage() {
  const params = useParams();
  const channelId = params.channelId as string;

  const { messages, newMessage, setNewMessage, sendMessage } = useMessages(channelId);

  return (
    <div>
      <div className="w-full h-1/2 flex items-end justify-center">
        <ul className="p-4 bg-gray-200 rounded-md shadow">
          {messages.map((message) => (
            <li key={message._id}>{message.content}</li>
          ))}
        </ul>
      </div>
      <section className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <form onSubmit={sendMessage}>
          <input type="text" className="border" value={newMessage} onChange={(evt) => setNewMessage(evt.target.value)}/>
        </form>
      </section>
    </div>
  );
}
