export interface TyperData {
  class: string;
  text: string;
}

export enum SocketMessageType {
  error = "error",
  kick = "kick",
  roomFull = "roomFull",
  forbidden = "forbidden",
  info = "info",
}

export interface CursorPos {
  row: number;
  col: number;
}

export interface KeyReport {
  key: string;
  errorCount: number;
  correctCount: number;
}

export interface TypingReport {
  timeTaken: number;
  totalWords: number;
  totalCharacter: number;
  totalError: number;
  keyReport: KeyReport[];
  averageWPM: number;
  highestWPM: number;
}

export interface MyChartData {
  chartLabel: String;
  labels: Array<String>;
  labelData: Array<Number>;
  borderColor: String;
  backgroundColor: String;
}
// export interface

export interface SettingData {
  isCapitalEnabled: boolean;
  isPunctuationEnabled: boolean;
  isBracketEnabled: boolean;
  isNumberEnabled: boolean;
  isStopCursorEnabled: boolean;
  isForgiveErrorEnabled: boolean;
  whitespaceType: string; // 'hidden' | 'bar' | 'bullet'
  cursorType: string; // 'block' | 'box' | 'underline'
  isSoundEnabled: boolean;
}

// server-side

export interface ProfileData {
  id: string;
  email: string;
  name: string;
  roomCode: string;
  profileImage: string;
  premiumEnd: string;
  isPremium: boolean;
  createdAt: string;
}

export interface AxiosResult<T> {
  isOk: boolean;
  data: T | null;
  error: null | {
    message: string;
    error: string;
    statusCode: number;
  };
}

export interface StatisticPageData {
  todayStat: Array<TypingReport>;
  allTimeStat: Array<TypingReport>;
}

// {
//     "id": "64f0a9d718e7876de4f252f0",
//     "email": "niteshdev547@gmail.com",
//     "name": "Nitesh kumar",
//     "roomCode": "7BG978",
//     "profileImage": "https://lh3.googleusercontent.com/a/AAcHTtcNpmzJRmwnGrp5Es7Iwfy0ztI02fGsU7IHmY8vavvW3A=s96-c",
//     "premiumEnd": "2023-08-31T14:55:19.069Z",
//     "createdAt": "2023-08-31T14:55:19.072Z"
// }

// {
//     "message": "test bad",
//     "error": "Bad Request",
//     "statusCode": 400
// }

export interface PlayerData {
  playerId: string;
  name: string;
  profileImage: string;
  isInMatch: boolean;
  score: {
    cursorPos: number;
    speed: number;
    errors: number;
    rank: number;
  };
  isAdmin: boolean;
}

export interface Leaderboard {
  userId: string;
  name: string;
  profileImage: string;
  highestWPM: number;
  averageWPM: number;
  oldWPM: number;
  rank: number;
  updatedAt: Date;
}

export interface TournamentMatchHistory {
  round: number;
}

interface Tournament {
  id: string;
  name: string;
  smallDesc: string;
  matchRoundCount: number;
  seats: number;
  entryFee: number;
  totalReward: number;
  totalWinners: number;
  visibility: Visibility;
  startDateTime: string;
  createdAt: string;
}

export interface TournamentRawData extends Tournament {
  updatedAt: string;
  description: string;
  roundBreakInv: number;
  rules: string;
  maxMatchWordsCount: number;
  tournamentStatus: TournamentStatus;
}

export enum Visibility {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
}

export enum TournamentStatus {
  IDEAL = "IDEAL",
  UPCOMING = "UPCOMING",
  RUNNING = "RUNNING",
  FINISHED = "FINISHED",
  DRAFT = "DRAFT",
  CANCELED = "CANCELED",
}

export interface TournamentFullData extends Tournament {
  updatedAt: string;
  description: string;
  roundBreakInv: number;
  rules: string;
  isJoined: boolean;
  joinedPlayers: number;
}

export interface TournamentData extends Tournament {
  isJoined: boolean;
  joinedPlayers: number;
}

export interface ParticipantData {
  id: string;
  name: string;
  avatar: string;
}



export interface Wallet {
  id: string;
  balance: number;
  withdrawal: number;
  updatedAt: string;
  userId: string;
}

export interface TransactionHistory {
  totalPage: number;
  transactionHistory: Array<{
    id: string;
    transactionId: string;
    amount: number;
    createdAt: string;
    walletId: string;
  }>;
}

export interface WalletPageData {
  wallet: Wallet;
  transactionHistory: TransactionHistory;
  notifications: Array<NotificationData>;
}

export interface NotificationData {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  userId: string;
}
