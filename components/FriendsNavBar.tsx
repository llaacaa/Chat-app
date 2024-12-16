"use client";

import { User } from "@/types/context";
import { sendFriendRequest } from "@/utils/friendsManger";
import { socketConnect, socketDisconnect } from "@/utils/socketManager";
import { FormEvent, useEffect, useState } from "react";

function FriendsNavBar({
  pendingFriendRequests,
}: {
  pendingFriendRequests: User[] | [] | undefined;
}) {

  useEffect(() => {
    const socket = socketConnect();

    socket.on('message', (msg) => {
      console.log('Message from server:', msg);
    });

    socket.on('friend-request', (msg) => {
      alert(msg.message);
    })

    return () => {
      socketDisconnect();
    };
  }, []);

  const [friendUsername, setFriendUsername] = useState("");

  const handleFormSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    const response =  await sendFriendRequest(friendUsername);
  }

  return (
    <div className="flex">
      <ul>
        {pendingFriendRequests?.map((fReq, index) => {
          return <li key={index}>{fReq.username}</li>;
        })}
      </ul>
      <form onSubmit={handleFormSubmit}>
        <input type="text" className=" border" value={friendUsername} onChange={(evt) => setFriendUsername(evt.target.value)}/>
        <button>Add Friend</button>
      </form>
    </div>
  );
}

export default FriendsNavBar;
