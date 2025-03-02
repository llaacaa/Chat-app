import WithNavbarLayout from "@/components/WithNavbarLayout";
import { getProfile } from "../api/serverActions";
import { cookies } from "next/headers";
import { User } from "@/types/context";
import { AxiosResponse } from "axios";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return <p>Please log in</p>;
  }

  const userData = (await getProfile(token.value)) as AxiosResponse;
  const {
    _id,
    username,
    email,
    friends,
    pendingFriendRequests,
    createdAt,
    lastOnline,
  } = userData.data.user;

  const user: User = {
    _id,
    username,
    email,
    friends,
    pendingFriendRequests,
    createdAt,
    lastOnline,
  };

  return <WithNavbarLayout userData={user}>{children}</WithNavbarLayout>;
}
