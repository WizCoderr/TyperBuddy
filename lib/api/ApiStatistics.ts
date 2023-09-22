
import { AxiosResult, TypingReport } from "../DataType";
import AxiosInstance from "../axios";

namespace ApiStatistics {
  const header = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  export async function getStatistics<T>(userId: string){
    return await AxiosInstance.get("/statistics/report/" + userId, header) as AxiosResult<T>;
  }

  export async function addStatistics<T>(report: TypingReport) {
    
    return await AxiosInstance.post("/statistics", report, header) as AxiosResult<T>;
  }
}

export default ApiStatistics;
