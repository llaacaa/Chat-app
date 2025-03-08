"use client";

import { useUserState } from "@/context/UserInfoContext";
import { Message } from "@/types/context";

function MessageComponent({
  message,
  shouldDisplayProfilePicture,
}: {
  message: Message;
  shouldDisplayProfilePicture: boolean;
}) {

  const { userState } = useUserState();

//   const additionalClasses = shouldDisplayProfilePicture ? ""
const classes = userState?.username == message.sender.username ? "justify-self-end" : "justify-self-start"

  return <section className={classes}>{message.content}</section>;
}

export default MessageComponent;
