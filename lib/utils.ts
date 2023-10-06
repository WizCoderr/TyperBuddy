export function getUniqueCharacters(sentence: string) {
    const uniqueChars = new Set<string>();

    for (let i = 0; i < sentence.length; i++) {
        const char = sentence.charAt(i).toUpperCase();
        uniqueChars.add(char);
    }

    return Array.from(uniqueChars).sort();
}

export function getKeyColor(minValue: number, maxValue: number, currentValue: number) {

    // calculating color value
    const normalizedNumber = (currentValue - minValue) / (maxValue - minValue)
    const colorValue = Math.round(normalizedNumber * 255)

    if (currentValue < 0) {
        return `rgb(255, ${255 - colorValue}, ${255 - colorValue})`;
    } else if (currentValue > 0) {
        return `rgb(${255 - colorValue}, 255, ${255 - colorValue})`;
    } else {
        return "rgb(255, 255, 255)";
    }

}
export function timeToWord(seconds: number) {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const sec = Math.floor(seconds - hours * 3600 - minutes * 60)

    let word = ''
    if (hours != 0) {
        word += hours + 'hrs '
    }
    if (minutes != 0) {
        word += minutes + 'mins '
    }

    if (sec != 0) {
        word += sec + 'secs'
    }

    return word
}


export function countCorrectWords(testSentence: string, correctSentence: string){
    let count = 0
    let tempWord = ''
    let isWaiting = false
    for (let index = 0; index < correctSentence.length; index++) {
        const testChar = testSentence[index]
        const correctChar = correctSentence[index]

        // waiting for next whitespace if error text found
        if(isWaiting){
            if(' ' == testChar){
                tempWord = ''
                isWaiting = false
            }
            continue
        }

        // add count if we found success text with whitespace
        if(' ' == testChar && testChar == correctChar){
            if(tempWord != ''){
                count++
                tempWord = ''
            }

        }else if(testChar == correctChar){
            tempWord += testChar

        }else{
            // set isWaiting if we found error
            isWaiting = true
        }
    }

    // add count if anything present in temp
    if(!isWaiting && tempWord != ''){
        count++
    }

    return count
}



// delay
export function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}