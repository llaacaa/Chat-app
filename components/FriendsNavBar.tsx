"use client";

import { Room, User } from "@/types/context";
import { sendFriendBackendRequest } from "@/utils/friendsManger";
import { socketConnect, socketDisconnect } from "@/utils/socketManager";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import AcceptIcon from "./ui/accept";
import DeclineIcon from "./ui/decline";
import { sendRoomBackendRequest } from "@/utils/roomsManager";

function FriendsNavBar({ getUserData }: { getUserData: () => Promise<User> }) {
  const [friendsList, setFriendsList] = useState<User[] | [] | undefined>([]);
  const [friendRequestList, setFriendRequestList] = useState<
    User[] | [] | undefined
  >([]);

  const [revalidateTrigger, setRevalidateTrigger] = useState(0);

  const [friendUsername, setFriendUsername] = useState("");
  const [rooms, setRooms] = useState<Room[] | [] | undefined>([]);

  const router = useRouter();

  const acceptOptions = [true, false];

  useEffect(() => {
    const socket = socketConnect();

    socket.on("message", (msg) => {
      console.log("Message from server:", msg);
    });

    socket.on("friend-request", (msg) => {
      setRevalidateTrigger((prev) => prev + 1);
    });

    socket.on('user-joined', (data) => {
      console.log(data.message  + " with id: " + data.id);
    });
    

    const fetchData = async () => {
      try {
        const userData = await getUserData();
        setFriendsList(userData.friends);
        setFriendRequestList(userData.pendingFriendRequests);
        const rooms = await sendRoomBackendRequest("getAllRooms");
        (rooms as Room[]).forEach(room => {
          socket.emit('join-room', room._id);
          console.log(`Joining room with id ${room._id} and name ${room.name}`); 
        });
        setRooms(rooms);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchData();

    return () => {
      socketDisconnect();
    };
  }, [getUserData, revalidateTrigger]);

  const handleFormSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    const response = await sendFriendBackendRequest(
      { username: friendUsername },
      "sendRequest"
    );
  };

  return (
    <div className="flex">
      <ul>
        {rooms?.map((room) => {
          return (
            <li
              key={room._id}
              onClick={() => router.push(`/channels/${room._id}`)}
              className="cursor-pointer"
            >
              {room.name}
            </li>
          );
        })}
      </ul>
      <ul>
        {friendRequestList?.map((friendReq) => {
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
