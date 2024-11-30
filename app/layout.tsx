import type { Metadata } from "next";
import "./globals.css";
import { cookies } from "next/headers";
import { getLoginInfo } from "./api/serverActions";
import NavBar from "@/components/NavBar";
import { LoginInfo } from "@/types/context";

export const metadata: Metadata = {
  title: "Laca's chat app",
  description: "Chat with people",
};

export const getLoginData = async () => {
  const cookieStore = await cookies();
  const loginInfo: LoginInfo = await getLoginInfo(cookieStore);
  return loginInfo;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const loginData = await getLoginData()

  return (
    <html lang="en">
      <body>
          <NavBar isLoggedIn={loginData.isLoggedIn} />
          {children}
      </body>
    </html>
  );
}
