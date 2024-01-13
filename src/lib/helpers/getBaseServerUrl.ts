export function getBaseServerUrl(str?: string) {
	return str?.split('/').slice(0, 3).join('/');
}
