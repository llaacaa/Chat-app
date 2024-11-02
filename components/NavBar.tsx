"use client";

import { logoutUser } from "@/app/api/userActions";
import { useRouter } from "next/navigation";

function NavBar() {
  const router = useRouter();
  return (
    <div className="w-full bg-gray-500">
      <button onClick={() => logoutUser(router)}>Logout</button>
    </div>
  );
}

export default NavBar;
