export function enumStrings(e: Record<string, unknown>): string[] {
	return Object.keys(e).filter((key) => typeof e[key] === "number");
}

export function enumValues(e: Record<string, unknown>): number[] {
	return Object.keys(e)
		.filter((key) => typeof e[key] !== "number")
		.map((x) => parseInt(x, 10));
}
