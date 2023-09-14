
import { AxiosResult, ResponseTypingReport, TypingReport } from "../DataType";
import AxiosInstance from "../axios";

namespace ApiStatistics {
  const header = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  export async function addStatistics(report: TypingReport) {
    const data: ResponseTypingReport = {
      timeTaken: report.timeTaken,
      totalWords: report.totalWords,
      totalCharacter: report.totalCharacter,
      totalError: report.totalError,
      keyReport: JSON.stringify(report.keyReport),
      averageWPM: report.averageWPM,
      highestWPM: report.highestWPM,
    };

    return await AxiosInstance.post("/statistics", data, header) as AxiosResult<any>;
  }
}

export default ApiStatistics;
