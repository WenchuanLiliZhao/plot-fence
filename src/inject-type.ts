/**
 * Obsidian keeps only the first info-string token as the language (`plot`).
 * calc-kit YAML often has no `type` field — Desktop / pm set it from the fence.
 */
export function fenceTypeFromOpeningLine(line: string | undefined): string | undefined {
	if (!line) {
		return undefined;
	}
	const open = /^```plot(?:[ \t]+(\S+))?[ \t]*$/.exec(line.trimEnd());
	return open?.[1];
}

export function injectFenceType(body: string, fenceType: string | undefined): string {
	if (!fenceType) {
		return body;
	}
	const lines = body.split("\n");
	const stripped = lines.filter((line) => !/^[ \t]*type[ \t]*:/.test(line));
	return [`type: ${fenceType}`, ...stripped].join("\n");
}
