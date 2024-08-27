export function LocaleNumberFormatter(number: number) {
    const data = new Number(number).toLocaleString()
    return data
}