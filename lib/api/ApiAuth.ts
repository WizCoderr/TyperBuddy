import { AxiosResult } from "../DataType";
import AxiosInstance from "../axios";

namespace ApiAuth {
  const header = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  export async function signup<T>(token: string, mode: string) {
    let data = {
      token,
      mode,
    };
    return await AxiosInstance.post("/auth/signup", data, header) as any as AxiosResult<T>;
  }
}

export default ApiAuth;
