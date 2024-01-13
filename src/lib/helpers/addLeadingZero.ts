export function addLeadingZero(number: number | string, length = 2): string {
	return number.toString().padStart(length, '0');
}
