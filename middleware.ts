import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getLoginData } from "./app/layout";

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const loginData = await getLoginData();

  if (pathname == "/user/auth" && loginData.isLoggedIn) {
    return NextResponse.redirect(new URL("/channels", req.url));
  }

  if (pathname !== "/user/auth" && !loginData.isLoggedIn) {
    return NextResponse.redirect(new URL("/user/auth", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/channels", "/user/auth", "/channels/:channelId*"],
};
