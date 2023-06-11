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
// export interface 