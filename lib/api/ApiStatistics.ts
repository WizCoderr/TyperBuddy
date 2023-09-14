import AxiosInstance from "../axios";

namespace ApiStatistics {
  const header = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  export async function addStatistics() {
    return await AxiosInstance.post("/statistics", header);
  }
}

export default ApiStatistics;
