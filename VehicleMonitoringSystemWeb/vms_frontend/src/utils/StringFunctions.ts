export function padStart (value: string, maxLength: number, fillString: string=' ') {
    const str = value;
    if (str.length >= maxLength) {
        return str;
    }

    fillString = String(fillString);
    if (fillString.length === 0) {
        fillString = ' ';
    }

    const fillLen = maxLength - str.length;
    const timesToRepeat = Math.ceil(fillLen / fillString.length);
    const truncatedStringFiller = fillString
        .repeat(timesToRepeat)
        .slice(0, fillLen);
    return truncatedStringFiller + str;
}
