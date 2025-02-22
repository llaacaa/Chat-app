"use client";

import { User } from "@/types/context";
import { manageFriendRequest, sendFriendRequest } from "@/utils/friendsManger";
import { socketConnect, socketDisconnect } from "@/utils/socketManager";
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
        {friendsList?.map((friend) => {
          return <li key={friend.username}>{friend.username}</li>;
        })}
      </ul>
      <ul>
        {friendRequestList?.map((friendReq) => {
          return (
            <li className="flex" key={friendReq.username}>
              <section>{friendReq.username}</section>
              <button className="p-2 rounded bg-gray-200 hover:bg-gray-300" onClick={() => manageFriendRequest(true, friendReq.username)}>
                <svg
                  className="w-6 h-6"
                  fill="black"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 24A12 12 0 1 1 12 0a12 12 0 0 1 0 24Zm0-22a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm-.08 14.333a0.819 0.819 0 0 1-.22.391 0.892 0.892 0 0 1-.72.259 0.913 0.913 0 0 1-.94-.655l-2.82-2.818a0.9 0.9 0 0 1 1.27-1.271l2.18 2.184 4.46-7.907a1 1 0 0 1 1.38-.385 1.051 1.051 0 0 1 .36 1.417Z"
                  />
                </svg>
              </button>

              <button className="p-2 rounded bg-gray-200 hover:bg-gray-300" onClick={() => manageFriendRequest(false, friendReq.username)}>
                <svg
                  className="w-6 h-6"
                  fill="black"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 24A12 12 0 1 1 12 0a12 12 0 0 1 0 24Zm0-22a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm4.706 14.706a0.951 0.951 0 0 1-1.345 0l-3.376-3.376-3.376 3.376a0.949 0.949 0 1 1-1.341-1.342l3.376-3.376-3.376-3.376a0.949 0.949 0 1 1 1.341-1.342l3.376 3.376 3.376-3.376a0.949 0.949 0 1 1 1.342 1.342l-3.376 3.376 3.376 3.376a0.95 0.95 0 0 1 0 1.342Z"
                  />
                </svg>
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
