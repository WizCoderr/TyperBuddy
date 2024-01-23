import {
  AxiosResult,
  TournamentData,
  TournamentFullData,
  TournamentRawData,
} from "../DataType";
import AxiosInstance from "../axios";

namespace ApiTournament {
  const header = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  export async function getTournaments(playerId: string) {
    return (await AxiosInstance.get(
      "/tournaments/player/" + playerId,
      header
    )) as any as AxiosResult<TournamentData[]>;
  }

  ///tournaments/tournament/659fabb85bf0d2adb2c75f8a

  export async function getTournamentPageData(
    tournamentId: string,
    playerId: string
  ) {
    return (await AxiosInstance.get(
      "/tournaments/tournament/" + tournamentId + "/player/" + playerId,
      header
    )) as any as AxiosResult<TournamentFullData>;
  }

  export async function getUserCreatedTournaments() {
    return (await AxiosInstance.get(
      "/tournaments/user",
      header
    )) as any as AxiosResult<Array<TournamentRawData>>;
  }

  export async function createTournament(data: any) {
    return (await AxiosInstance.post(
      "/tournaments/create",
      data,
      header
    )) as any as AxiosResult<TournamentRawData>;
  }
}

export default ApiTournament;
