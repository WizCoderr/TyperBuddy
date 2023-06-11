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