export function LocaleNumberFormatter(number: number) {
	const data = new Number(number).toLocaleString('ru-RU')
	return data
}

export function PriceUAHFormatter(number: number) {
	const data = new Number(number).toLocaleString('ru-RU', {
		style: 'currency',
		currency: 'UAH'
	})
	return data
}
