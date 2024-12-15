"use client";

import { User } from "@/types/context";
import { sendFriendRequest } from "@/utils/friendsManger";
import { FormEvent, useState } from "react";

function FriendsNavBar({
  pendingFriendRequests,
}: {
  pendingFriendRequests: User[] | [] | undefined;
}) {
  const [friendUsername, setFriendUsername] = useState("");

  const handleFormSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    const response =  await sendFriendRequest(friendUsername);
    debugger
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
