import axios from "axios";
import { returnErrorMessage } from "./error";

export async function sendRoomBackendRequest( path: string, payload?: object) {
    try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_ROOMS_ROUTE}/${path}`,
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