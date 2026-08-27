import { MarkdownRenderChild, MarkdownRenderer, type Plugin } from "obsidian";
import { fenceTypeFromOpeningLine } from "./inject-type";
import { buildFigureElement, mountPlotFigure } from "./mount";
import { parsePlotSource } from "./parse";

export class PlotFenceChild extends MarkdownRenderChild {
	private destroy: (() => void) | undefined;

	constructor(
		containerEl: HTMLElement,
		private readonly plugin: Plugin,
		private readonly source: string,
		private readonly sourcePath: string,
		private readonly fenceType?: string,
	) {
		super(containerEl);
	}

	async onload(): Promise<void> {
		const parsed = parsePlotSource(this.source, this.fenceType);
		this.containerEl.empty();
		this.containerEl.addClass("plot-fence-host");

		if (!parsed.ok) {
			this.containerEl.createDiv({ cls: "plot-fence-error", text: parsed.error });
			return;
		}

		const figure = buildFigureElement(parsed.spec);
		this.containerEl.appendChild(figure);

		const titleEl = figure.querySelector<HTMLElement>(".ck-figure-title");
		if (titleEl && parsed.spec.title) {
			await this.renderFragment(titleEl, parsed.spec.title);
		}
		const captionEl = figure.querySelector<HTMLElement>(".ck-figure-caption");
		if (captionEl && parsed.spec.caption) {
			await this.renderFragment(captionEl, parsed.spec.caption);
		}

		try {
			this.destroy = mountPlotFigure(figure, parsed.spec);
		} catch (err) {
			figure.remove();
			const message = err instanceof Error ? err.message : String(err);
			this.containerEl.createDiv({ cls: "plot-fence-error", text: message });
		}
	}

	onunload(): void {
		this.destroy?.();
		this.destroy = undefined;
	}

	private async renderFragment(el: HTMLElement, markdown: string): Promise<void> {
		el.empty();
		await MarkdownRenderer.render(
			this.plugin.app,
			markdown,
			el,
			this.sourcePath,
			this,
		);
	}
}

export function fenceTypeFromProcessorEl(
	el: HTMLElement,
	ctx: { getSectionInfo: (el: HTMLElement) => { text: string; lineStart: number } | null },
): string | undefined {
	const info = ctx.getSectionInfo(el);
	if (!info) {
		return undefined;
	}
	const lines = info.text.split("\n");
	return fenceTypeFromOpeningLine(lines[info.lineStart]);
}
