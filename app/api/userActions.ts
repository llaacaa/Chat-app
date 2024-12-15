import { socketConnect, socketDisconnect } from "@/utils/socketManager";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const registerUser = async (data: object, router: AppRouterInstance) => {
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
    if (response.status == 201) {
      socketConnect();
      router.refresh();
    }
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

export const loginUser = async (data: object, router: AppRouterInstance) => {
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
    if (response.status == 201) {
      socketConnect();
      router.refresh();
    }
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

export const logoutUser = async (router: AppRouterInstance) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_USER_AUTH_ROUTE}/logout`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (response.status == 200) {
      // Logged out 
      // The socket disconnect should be here
      socketDisconnect();
      router.refresh();
    }
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
// export const checkAuth = async () => {
//   try {
//     const response = await axios.get(
//       `${process.env.NEXT_PUBLIC_USER_AUTH_ROUTE}/test-check`,
//       {
//         withCredentials: true,
//       }
//     );
//     console.log("Authenticated:", response.data);
//     return true;
//   } catch (error) {
//     console.log(
//       "Not authenticated:",
//       error.response?.data?.message || error.message
//     );
//     return false;
//   }
// };
