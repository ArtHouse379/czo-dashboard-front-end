export function LocaleDateFormatter(date: string) {
    const data = new Date(date).toLocaleDateString()
    return data
}