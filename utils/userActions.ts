
import axios from "axios";

export const registerUser = async (data: object) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_USER_AUTH_ROUTE}/register`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("🚀 ~ registerUser ~ response:", response);
  } catch (error: unknown) {
    alert(error.response.data.message);
  }
};

export const loginUser = async (data: object) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_USER_AUTH_ROUTE}/login`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("🚀 ~ registerUser ~ response:", response);
  } catch (error: unknown) {
    alert(error.response.data.message);
  }
};


export const getProfile = async (token: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_USER_AUTH_ROUTE}/getProfile`,
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
};


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
