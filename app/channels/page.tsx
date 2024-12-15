import FriendsNavBar from "@/components/FriendsNavBar";
import { getProfile } from "../api/serverActions";
import { cookies } from "next/headers";
import { User } from "@/types/context";
import { AxiosResponse } from "axios";

async function Page() {

  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const userData = (await getProfile(token!.value) as AxiosResponse);
  const { username, email, friends, createdAt, lastOnline } =
    userData.data.user;
  const user: User = { username, email, friends, createdAt, lastOnline };

  return (
    // TOP requests, add friend
    // LEFT filter search, list of friends
    <div>
      <FriendsNavBar
        pendingFriendRequests={user.friends}
      />
    </div>
  );
}

export default Page;
