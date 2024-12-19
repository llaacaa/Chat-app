"use client";

import { User } from "@/types/context";
import { sendFriendRequest } from "@/utils/friendsManger";
import { socketConnect, socketDisconnect } from "@/utils/socketManager";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

function FriendsNavBar({ getUserData }: { getUserData: () => Promise<User> }) {
  const [friendsList, setFriendsList] = useState<User[] | [] | undefined>([]);
  const [friendRequestList, setFriendRequestList] = useState<
    User[] | [] | undefined
  >([]);

  const [revalidateTrigger, setRevalidateTrigger] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserData();
        setFriendsList(userData.friends);
        setFriendRequestList(userData.pendingFriendRequests);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchData();

    const socket = socketConnect();

    socket.on("message", (msg) => {
      console.log("Message from server:", msg);
    });

    socket.on("friend-request", (msg) => {
      setRevalidateTrigger((prev) => prev + 1);
    });

    return () => {
      socketDisconnect();
    };
  }, [getUserData, revalidateTrigger]);

  const [friendUsername, setFriendUsername] = useState("");

  const handleFormSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    const response = await sendFriendRequest(friendUsername);
  };

  return (
    <div className="flex">
      <ul>
        {friendsList?.map((friend, index) => {
          return <li key={index}>{friend.username}</li>;
        })}
      </ul>
      <ul>
        {friendRequestList?.map((friendReq, index) => {
          return (
            <li className="flex" key={index}>
              <section>{friendReq.username}</section>
              <button>
                <Image
                  src={
                    "https://cdn-icons-png.flaticon.com/512/4315/4315445.png"
                  }
                  width={50}
                  height={50}
                  alt="Accept"
                />
              </button>
              <button>
                <Image
                  src={
                    "https://cdn-icons-png.flaticon.com/512/10621/10621089.png"
                  }
                  width={50}
                  height={50}
                  alt="Accept"
                />
              </button>
            </li>
          );
        })}
      </ul>
      <form onSubmit={handleFormSubmit}>
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
