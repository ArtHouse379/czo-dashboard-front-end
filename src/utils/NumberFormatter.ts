export function LocaleNumberFormatter(number: number) {
	const data = new Number(number).toLocaleString('uk-UA')
	return data
}

export function PriceUAHFormatter(number: number) {
	const data = new Number(number).toLocaleString('uk-UA', {
		style: 'currency',
		currency: 'UAH'
	})
	return data
}
