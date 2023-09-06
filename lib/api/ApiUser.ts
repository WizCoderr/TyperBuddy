import AxiosInstance from "../axios";

namespace ApiUser {
  const header = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  export async function getProfile() {
    return await AxiosInstance.get("/user/me", header);
  }
}

export default ApiUser;
