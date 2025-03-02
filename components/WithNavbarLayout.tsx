"use client";

import FriendsNavBar from "@/components/FriendsNavBar";
import { GlobalProvider } from "@/context/UserInfoContext";
import { User } from "@/types/context";

export default function WithNavbarLayout({ userData, children }: { userData: User, children: React.ReactNode }) {
  return (
    <GlobalProvider userData={userData}>
      <FriendsNavBar />
      {children}
    </GlobalProvider>
  );
}
