"use client";

import { sendFriendBackendRequest } from "@/utils/friendsManger";
import { useRouter } from "next/navigation";
import AcceptIcon from "./ui/accept";
import DeclineIcon from "./ui/decline";
import useFriends from "@/hooks/useFriends";
import { useUserState } from "@/context/UserInfoContext";
import {useState} from "react";
import CreateGroupDialog from "@/components/CreateGroupDialog";

function FriendsNavBar() {
  const { userState, setUserState } = useUserState();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const router = useRouter();
  const {
    rooms,
    acceptOptions,
    handleFormSubmit,
    friendUsername,
    setFriendUsername,
  } = useFriends(userState);

    const handleCreateGroup = (groupName: string) => {
        console.log(`Group created: ${groupName}`);
    };

  return (
    <div className="">
        <CreateGroupDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            onCreateGroup={handleCreateGroup}
            friends={userState?.friends}
        />
      <ul>
        {rooms?.map((room) => {
          const regex = new RegExp(`-?${userState?.username}-?`, "g");
          const roomName = room.isGroupChat
            ? room.name
            : room.name.replace(regex, "-").replace(/^-|-$/g, "");
          return (
            <li
              key={room._id}
              onClick={() => router.push(`/channels/${room._id}`)}
              className="cursor-pointer"
            >
              {roomName}
            </li>
          );
        })}
      </ul>
      <button onClick={() => setIsDialogOpen(true)}>Create Group</button>
      <ul>
        {userState?.pendingFriendRequests?.map((friendReq) => {
          return (
            <li className="flex" key={friendReq.username}>
              <section>{friendReq.username}</section>
              {acceptOptions.map((option) => {
                return (
                  <button
                    className="p-2 rounded bg-gray-200 hover:bg-gray-300"
                    onClick={() =>
                      sendFriendBackendRequest(
                        {
                          isAccept: option,
                          requestFromUsername: friendReq.username,
                        },
                        "manageRequest"
                      )
                    }
                  >
                    {option && <AcceptIcon />}
                    {!option && <DeclineIcon />}
                  </button>
                );
              })}
            </li>
          );
        })}
      </ul>
      <form onSubmit={handleFormSubmit} className=" right-0 absolute">
        <input
          type="text"
          className=" border"
          value={friendUsername}
          onChange={(evt) => setFriendUsername(evt.target.value)}
        />
        <button>Add Friend</button>
      </form>
    </div>
  );
}

export default FriendsNavBar;
