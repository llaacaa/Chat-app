import axios from "axios";
import { returnErrorMessage } from "./error";

export async function sendFriendBackendRequest(payload: object, path: string) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_FRIENDS_ROUTE}/${path}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error: unknown) {
    const errorMessage = returnErrorMessage(error);
    return { success: false, error: errorMessage };
  }
}
