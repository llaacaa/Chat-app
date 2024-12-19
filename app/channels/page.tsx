import FriendsNavBar from "@/components/FriendsNavBar";
import { getProfile } from "../api/serverActions";
import { cookies } from "next/headers";
import { User } from "@/types/context";
import { AxiosResponse } from "axios";

async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  async function getUserData() {
    "use server";
    const userData = (await getProfile(token!.value)) as AxiosResponse;
    const {
      username,
      email,
      friends,
      pendingFriendRequests,
      createdAt,
      lastOnline,
    } = userData.data.user;
    const user: User = {
      username,
      email,
      friends,
      pendingFriendRequests,
      createdAt,
      lastOnline,
    };
    return user;
  }

  return (
    // TOP requests, add friend
    // LEFT filter search, list of friends
    <div>
      <FriendsNavBar getUserData={getUserData} />
    </div>
  );
}

export default Page;
