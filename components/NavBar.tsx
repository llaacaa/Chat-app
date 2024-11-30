"use client";

import { logoutUser } from "@/app/api/userActions";
import { redirect, useRouter } from "next/navigation";

function NavBar({isLoggedIn}: {isLoggedIn: boolean}) {
  const router = useRouter();
  return (
    <div className="w-full bg-gray-500">
      {isLoggedIn && <button onClick={() => logoutUser(router)}>Logout</button>}
      {!isLoggedIn && <button onClick={() => redirect("/user/auth")}>Authorize</button>}
    </div>
  );
}

export default NavBar;
