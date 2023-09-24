

export interface TyperData {
    class: string,
    text: string
}

export interface CursorPos {
    row: number,
    col: number
}

export interface KeyReport {
    key: string,
    errorCount: number,
    correctCount: number
}

export interface TypingReport {
    timeTaken: number,
    totalWords: number,
    totalCharacter: number,
    totalError: number,
    keyReport: KeyReport[],
    averageWPM: number,
    highestWPM: number
}


export interface MyChartData{
    chartLabel: String,
    labels: Array<String>,
    labelData: Array<Number>,
    borderColor: String,
    backgroundColor: String,
}
// export interface 


export interface SettingData{
    isCapitalEnabled: boolean,
    isPunctuationEnabled: boolean,
    isBracketEnabled: boolean,
    isNumberEnabled: boolean,
    isStopCursorEnabled: boolean,
    isForgiveErrorEnabled: boolean,
    whitespaceType: string,                 // 'hidden' | 'bar' | 'bullet'
    cursorType: string,                     // 'block' | 'box' | 'underline'
    isSoundEnabled: boolean
}






// server-side

export interface ProfileData{
    id: string,
    email: string,
    name: string,
    roomCode: string,
    profileImage: string,
    premiumEnd: string,
    createdAt: string
}

export interface AxiosResult<T>{
    isOk: boolean,
    data: T | null,
    error: null | {
        message: string,
        error: string,
        statusCode: number
    }

}



export interface StatisticPageData{
    todayStat: Array<TypingReport>,
    allTimeStat: Array<TypingReport>
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