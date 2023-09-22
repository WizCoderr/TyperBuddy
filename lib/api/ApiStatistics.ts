
import { AxiosResult, TypingReport } from "../DataType";
import AxiosInstance from "../axios";

namespace ApiStatistics {
  const header = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  export async function addStatistics(report: TypingReport) {
    
    return await AxiosInstance.post("/statistics", report, header) as AxiosResult<any>;
  }
}

export default ApiStatistics;
