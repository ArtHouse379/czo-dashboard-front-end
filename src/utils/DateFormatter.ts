export function LocaleDateFormatter(date: string) {
	const data = new Date(date).toLocaleDateString().replaceAll('/', '.') // * replace / with .
	return data
}

export function StringToISODateString(data: string | undefined) {
	return data == undefined
		? new Date().toISOString()
		: new Date(data).toISOString()
}
