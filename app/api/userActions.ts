import { socketConnect, socketDisconnect } from "@/utils/socketManager";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const registerUser = async (data: object, router: AppRouterInstance) => {
  handleUserAction(router, "register", data);
};

export const loginUser = async (data: object, router: AppRouterInstance) => {
  handleUserAction(router, "login", data);
};

export const logoutUser = async (router: AppRouterInstance) => {
  handleUserAction(router, "logout");
};

const handleUserAction = async (router: AppRouterInstance, path: string, data?: object) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_USER_AUTH_ROUTE}/${path}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (response.status == 201) {
      //Login and register
      socketConnect();
      router.refresh();
    } else if (response.status == 200) {
      // Logout
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
