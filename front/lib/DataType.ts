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
    dateTime: number,
    totalWords: number,
    totalCharCount: number,
    errorCount: number,
    keysReport: KeyReport[],
    averageSpeed: number,
    topSpeed: number

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