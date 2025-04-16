export function LocaleDateFormatter(date: string) {
	const data = new Date(date).toLocaleDateString().replaceAll('/', '.')
	return data
}

export function DateFullTimeFormatter(date: string) {
	const data = new Date(date).toLocaleString('uk-UA', { timeZone: 'UTC' })
	return data
}

export function StringToISODateString(data: string | undefined) {
	return data == undefined
		? new Date().toISOString()
		: new Date(data).toISOString()
}
