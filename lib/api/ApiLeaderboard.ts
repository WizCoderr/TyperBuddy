
import { AxiosResult, Leaderboard, TypingReport } from "../DataType";
import AxiosInstance from "../axios";

namespace ApiLeaderboard {
  const header = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  export async function getTopLeaderboard(){
    return await AxiosInstance.get("/leaderboard/top", header) as AxiosResult<Array<Leaderboard>>;
  }

  export async function getLeaderboard() {
    return await AxiosInstance.get("/leaderboard", header) as AxiosResult<Array<Leaderboard>>;
  }
}

export default ApiLeaderboard;
