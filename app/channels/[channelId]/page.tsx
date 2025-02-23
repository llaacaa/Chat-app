"use client";

import { sendRoomBackendRequest } from "@/utils/roomsManager";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChatPage() {
  const params = useParams();
  const channelId = params.channelId as string;

  const [chat, setChat] = useState();

  useEffect(() => {
    const fetchData = async () => {
      // const data = await sendRoomBackendRequest("getRoomByFriendId", {friendId: channelId});
    }
    fetchData();
  }, []);

  return (
    <div className="w-full h-1/2 flex items-end justify-center">
      <div className="p-4 bg-gray-200 rounded-md shadow">
        ChatPage id: {channelId}
      </div>
    </div>
  );
}
