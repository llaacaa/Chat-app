//In app/api to ensure its hidden from the client

import axios, { AxiosResponse } from "axios";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const sendServerRequest = async (path:string, token:string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_USER_AUTH_ROUTE}/${path}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.log(error.response.data.message);
      return error.response;
    } else {
      console.log("An unknown error occurred:", error);
      return error;
    }
  }
} 


export const getProfile = async (token: string) => {
  const response = await sendServerRequest("getProfile", token);
  return response;
};

export const getLoginInfo = async (cookieStore: ReadonlyRequestCookies) => {
  const token = cookieStore.get("token");
  if (token) {
    const res = (await getProfile(token?.value)) as AxiosResponse;
    const user = res?.data.user;
    const status = res?.status;
    if (status == 200) {
      return { message: undefined, isLoggedIn: true, user };
    } else {
      return {
        message: "Invalid authorization",
        isLoggedIn: false,
        user: undefined,
      };
    }
  } else {
    return { message: "Unauthorized", isLoggedIn: false, user: undefined };
  }
};
