"use client";

import { useParams } from "next/navigation";

export default function ChatPage() {
  const params = useParams();
  const channelId = params.channelId as string; // Ensure it's a string

  return (
    <div className="w-full h-1/2 flex items-end justify-center">
      <div className="p-4 bg-gray-200 rounded-md shadow">
        ChatPage id: {channelId}
      </div>
    </div>
  );
}
