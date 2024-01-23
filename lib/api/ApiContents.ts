import { AxiosResult } from "../DataType";
import AxiosInstance from "../axios";

namespace ApiContent {
  const header = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  export async function getTypingContent(wordCount: number) {
    return await AxiosInstance.get("/contents/get-content/" + wordCount, header) as any as AxiosResult<string>;
  }
}

export default ApiContent;
