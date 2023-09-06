import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

// Function to get the bearer token from localStorage
function getBearerToken() {
  return localStorage.getItem("access_token");
}

// Adding token to every request
AxiosInstance.interceptors.request.use(
  function (config) {
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

export default AxiosInstance
