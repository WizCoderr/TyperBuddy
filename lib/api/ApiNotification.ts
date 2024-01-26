import {
  AxiosResult,
  TournamentData,
  TournamentFullData,
  TournamentRawData,
  TransactionHistory,
  WalletPageData,
  NotificationData,
} from "../DataType";
import AxiosInstance from "../axios";

namespace ApiNotification {
  const header = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  export async function getNotification(filter: "read" | "unread" | "all") {
    return (await AxiosInstance.get(
      "/notifications/all?filter=" + filter,
      header
    )) as any as AxiosResult<Array<NotificationData>>;
  }

  export async function markNotificationAsRead(notificationIds: Array<string>) {
    return (await AxiosInstance.patch(
      "/notifications/mark-as-read",
      {notificationIds},
      header
    )) as any as AxiosResult<{ count: number }>;
  }
}

export default ApiNotification;
