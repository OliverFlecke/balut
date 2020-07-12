// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function enumStrings(e: any): string[] {
	return Object.keys(e).filter((key) => typeof e[key] === 'number');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function enumValues(e: any): number[] {
	return Object.keys(e)
		.filter((key) => typeof e[key] !== 'number')
		.map((x) => parseInt(x));
}
