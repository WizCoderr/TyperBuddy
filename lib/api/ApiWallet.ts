import {
  AxiosResult,
  TournamentData,
  TournamentFullData,
  TournamentRawData,
  TransactionHistory,
  WalletPageData,
} from "../DataType";
import AxiosInstance from "../axios";

namespace ApiWallet {
  const header = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  export async function getWalletPageData() {
    return (await AxiosInstance.get(
      "/wallets/page-data",
      header
    )) as any as AxiosResult<WalletPageData>;
  }

  export async function getTransactionHistory(page: number) {
    return (await AxiosInstance.get(
      "/transaction-history/all/page/" + page,
      header
    )) as any as AxiosResult<TransactionHistory>;
  }
}

export default ApiWallet;
