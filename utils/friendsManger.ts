import axios from "axios";


export async function sendFriendRequest(username: string) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_FRIENDS_ROUTE}/sendRequest`,
      { username },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data; 
  } catch (error: unknown) {
    let errorMessage = "An unexpected error occurred";

    if (axios.isAxiosError(error)) {
      if (error.response) {
        errorMessage = error.response.data?.message || `Request failed with status ${error.response.status}`;
      } else if (error.request) {
        errorMessage = "No response received from the server";
      } else {
        errorMessage = `Request setup error: ${error.message}`;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return { success: false, error: errorMessage }; 
  }
}


export async function manageFriendRequest(
  isAccept: boolean,
  requestFromUsername: string
) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_FRIENDS_ROUTE}/manageRequest`,
      { requestFromUsername, isAccept },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error("Status:", error.response.status);
      } else if (error.request) {
        console.error("No response received from server:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    } else {
      // Non-Axios error
      console.error("An unknown error occurred:", error);
    }
  }
}
