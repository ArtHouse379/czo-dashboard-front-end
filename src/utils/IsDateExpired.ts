export function IsDateExpired(date: string): boolean {
	return new Date(date) > new Date()
}
