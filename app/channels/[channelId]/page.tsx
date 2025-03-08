"use client";

import MessageComponent from "@/components/chat/MessageComponent";
import CreateGroupDialog from "@/components/CreateGroupDialog";
import { Button } from "@/components/ui/button";
import { useUserState } from "@/context/UserInfoContext";
import useMessages from "@/hooks/useMessages";
import { User } from "@/types/context";
import { sendRoomBackendRequest } from "@/utils/roomsManager";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ChatPage() {
  const params = useParams();
  const channelId = params.channelId as string;

  const { userState } = useUserState();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { members, messages, newMessage, setNewMessage, sendMessage } =
    useMessages(channelId);

  const handleCreateGroup = async (users: User[], groupName: string) => {
    console.log(`Group created: ${groupName}`);

    const conditionalGroupChatNamePayload =
      groupName.trim().length > 0 ? { groupName } : {};

    const usersId = [...users.map((user) => user._id), ...members];

    const response = await sendRoomBackendRequest("createRoom", {
      usersId,
      ...conditionalGroupChatNamePayload,
    });
    toast.success(response.message);
  };

  return (
    <div>
      <Button onClick={() => setIsDialogOpen(true)}>Add to Group Chat</Button>
      <div className="w-full h-1/2 flex items-end justify-center">
        <CreateGroupDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onCreateGroup={handleCreateGroup}
          friends={userState?.friends}
          membersToFilter={members}
        />
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
