"use client";

import MessageComponent from "@/components/chat/MessageComponent";
import { useUserState } from "@/context/UserInfoContext";
import useMessages from "@/hooks/useMessages";
import { useParams } from "next/navigation";

export default function ChatPage() {
  const params = useParams();
  const channelId = params.channelId as string;

  const { messages, newMessage, setNewMessage, sendMessage } =
    useMessages(channelId);


  return (
    <div>
      <div className="w-full h-1/2 flex items-end justify-center">
        <ul className="p-4 w-full bg-gray-200 rounded-md shadow">
          {messages.map((message, index) => {
            const previousMessage = index > 0 ? messages[index - 1] : null;
            return (
                <MessageComponent
                key={message._id}
                  message={message}
                  shouldDisplayProfilePicture={
                    (previousMessage &&
                      previousMessage.sender.username !==
                        message.sender.username) ||
                    !previousMessage
                  }
                />
            );
          })}
        </ul>
      </div>
      <section className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <form onSubmit={sendMessage}>
          <input
            type="text"
            className="border"
            value={newMessage}
            onChange={(evt) => setNewMessage(evt.target.value)}
          />
        </form>
      </section>
    </div>
  );
}
