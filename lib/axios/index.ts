import axios from "axios";
import { AxiosResult } from "../DataType";
import { delay } from "../utils";

const AxiosInstance = axios.create({
  //@ts-ignore
  baseURL: import.meta.env.VITE_SERVER_URL,
});

// Function to get the bearer token from localStorage
function getBearerToken() {
  return localStorage.getItem("access_token");
}

// Adding token to every request
AxiosInstance.interceptors.request.use(
  async function (config) {
    // await delay(2000) // temp for testing purpose
    
    const token = getBearerToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// error handling to every request

AxiosInstance.interceptors.response.use(
  (response) => {
    // Return the response data on success
    const res: AxiosResult<any> = {
      isOk: true,
      data: response.data,
      error: null,
    };
    return res as any;
  },
  (error) => {

    console.log(error)

    let res: AxiosResult<any> = {
      isOk: false,
      data: null,
      error: null,
    };

    if (error.response) {
      // The request was made, and the server responded with an error status

      const errorResponse = {
        message: error.message,
        error: error.response.data.error || "Unknown Error",
        statusCode: error.response.status,
      };

      res.error = errorResponse

    } else if (error.request) {
      // The request was made, but no response was received from the server
      const errorMessage = "No response received from the server";

      const errorResponse = {
        message: errorMessage,
        error: "Request Timeout",
        statusCode: 408, // Example status code for request timeout
      };

      res.error = errorResponse
    } else {
      // Something else happened while setting up the request that triggered an error

      const errorResponse = {
        message: error.message,
        error: "Internal server error",
        statusCode: 500,
      };

      res.error = errorResponse
    }

    return res
  }
);

export default AxiosInstance;
