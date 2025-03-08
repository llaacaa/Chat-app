import { Message, User } from "@/types/context";
import { sendRoomBackendRequest } from "@/utils/roomsManager";
import { getSocket } from "@/utils/socketManager";
import { set } from "mongoose";
import { FormEvent, useEffect, useState } from "react";

export default function useMessages(channelId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [members, setMembers] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await sendRoomBackendRequest("getRoomInfo", {
        roomId: channelId,
      });
      setMessages(response.messages);
      setMembers(response.members);
    };
    fetchData();
  }, [channelId]);

  useEffect(() => {
    const socket = getSocket();

    const messageHandler = (data: Message) => {
      console.log("🚀 ~ socket.on ~ data:", data);
      setMessages((prev) => [...prev, data]);
    };

    socket.off("receive-message");
    socket.on("receive-message", messageHandler);

    return () => {
      socket.off("receive-message", messageHandler);
    };
  }, [channelId]);

  async function sendMessage(evt: FormEvent) {
    evt.preventDefault();
    if (!newMessage.trim()) return;

    getSocket().emit("send-message", newMessage, channelId);
    setNewMessage("");
  }

  return { members, messages, newMessage, setNewMessage, sendMessage };
}
