import axios from "axios";

export function returnErrorMessage(error: unknown) {
  let errorMessage = "An unexpected error occurred";

  if (axios.isAxiosError(error)) {
    if (error.response) {
      errorMessage =
        error.response.data?.message ||
        `Request failed with status ${error.response.status}`;
    } else if (error.request) {
      errorMessage = "No response received from the server";
    } else {
      errorMessage = `Request setup error: ${error.message}`;
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }
  return errorMessage;
}
