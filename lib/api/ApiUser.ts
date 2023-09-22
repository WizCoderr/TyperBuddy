import { AxiosResult } from "../DataType";
import AxiosInstance from "../axios";

namespace ApiUser {
  const header = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  export async function getProfile<T>() {
    return await AxiosInstance.get("/user/me", header) as any as AxiosResult<T>;
  }
}

export default ApiUser;
