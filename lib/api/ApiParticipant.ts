import {
  AxiosResult,
  ParticipantData,
  TournamentData,
  TournamentFullData,
} from "../DataType";
import AxiosInstance from "../axios";

namespace ApiParticipant {
  const header = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  export async function getRegisteredPlayers(tournamentId: string) {
    const res = (await AxiosInstance.get(
      "/participants/registeredPlayers/tournament/" + tournamentId,
      header
    )) as any as AxiosResult<ParticipantRes[]>;

    let formattedData: ParticipantData[] | null = null;
    if (res.data) {
      formattedData = res.data.map((participant) => {
        return {
          id: participant.userId,
          name: participant.user.name,
          avatar: participant.user.profileImage,
        };
      });
    }

    return { ...res, data: formattedData };
  }

  export async function joinTournament(tournamentId: string) {
    return (await AxiosInstance.post(
      "/participants/join/tournament/" + tournamentId,
      {},
      header
    )) as any as AxiosResult<any>;
  }
}

interface ParticipantRes {
  userId: string;
  user: {
    name: string;
    profileImage: string;
  };
}

export default ApiParticipant;
