import { load as loadYaml } from "js-yaml";
import { injectFenceType } from "./inject-type";
import { knownPlotType } from "./mount";
import { normalizePlotSpec } from "./normalize";
import type { CalcKitSpec } from "./vendor/calc-kit.js";

export type ParsedPlot =
	| { ok: true; spec: CalcKitSpec }
	| { ok: false; error: string };

export function parsePlotSource(source: string, fenceType?: string): ParsedPlot {
	try {
		const loaded = loadYaml(injectFenceType(source, fenceType));
		if (loaded == null || typeof loaded !== "object" || Array.isArray(loaded)) {
			return { ok: false, error: "Plot fence body must be a YAML mapping." };
		}
		const spec = normalizePlotSpec(loaded as Record<string, unknown>);
		if (!knownPlotType(spec.type)) {
			return {
				ok: false,
				error: spec.type
					? `Unknown figure type "${spec.type}".`
					: "Plot fence is missing type.",
			};
		}
		return { ok: true, spec };
	} catch (err) {
		return {
			ok: false,
			error: err instanceof Error ? err.message : String(err),
		};
	}
}
