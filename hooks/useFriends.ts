import { Room, User } from "@/types/context";
import { sendFriendBackendRequest } from "@/utils/friendsManger";
import { sendRoomBackendRequest } from "@/utils/roomsManager";
import { getSocket, socketDisconnect } from "@/utils/socketManager";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

export default function useFriends(getUserData: () => Promise<User>) {
  const [friendsList, setFriendsList] = useState<User[] | [] | undefined>([]);
  const [friendRequestList, setFriendRequestList] = useState<
    User[] | [] | undefined
  >([]);

  const [revalidateTrigger, setRevalidateTrigger] = useState(0);

  const [friendUsername, setFriendUsername] = useState("");
  const [rooms, setRooms] = useState<Room[] | [] | undefined>([]);

  const acceptOptions = [true, false];

  useEffect(() => {
    const socket = getSocket();

    socket.on("friend-request", (msg) => {
      setRevalidateTrigger((prev) => prev + 1);
    });

    socket.on("user-joined", (data) => {
      console.log(data.message + " with id: " + data.id);
    });

    const fetchData = async () => {
      try {
        const userData = await getUserData();
        setFriendsList(userData.friends);
        setFriendRequestList(userData.pendingFriendRequests);
        const rooms = await sendRoomBackendRequest("getAllRooms");
        (rooms as Room[]).forEach((room) => {
          socket.emit("join-room", room._id);
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
      socket.off("friend-request");
      socket.off("user-joined");
    };
  }, [getUserData, revalidateTrigger]);

  const handleFormSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    const response = await sendFriendBackendRequest(
      { username: friendUsername },
      "sendRequest"
    );
  };

  return {
    friendRequestList,
    rooms,
    acceptOptions,
    handleFormSubmit,
    friendUsername,
    setFriendUsername,
  };
}
