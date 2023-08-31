import AxiosInstance from "./axios";

namespace Api {
  const header = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  export async function signup(token: string, mode: string) {
    let data = {
      token,
      mode,
    };
    return await AxiosInstance.post("/auth/signup", data, header);
  }
}

export default Api;
