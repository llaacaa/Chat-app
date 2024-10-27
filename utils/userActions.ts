import axios from "axios";
import { error } from "console";

export const registerUser = async (data: object) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_USER_AUTH_ROUTE}/register`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("🚀 ~ registerUser ~ response:", response);
  } catch (error: unknown) {
    alert(error.response.data.message);
  }
};

export const loginUser = async (data: object) => {};

//Test
export const checkAuth = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_USER_AUTH_ROUTE}/test-check`,
      {
        withCredentials: true,
      }
    );
    console.log("Authenticated:", response.data);
    return true;
  } catch (error) {
    console.log(
      "Not authenticated:",
      error.response?.data?.message || error.message
    );
    return false;
  }
};
