import { Plugin } from "obsidian";
import { fenceTypeFromProcessorEl, PlotFenceChild } from "./render-child";

export default class PlotFencePlugin extends Plugin {
	onload(): void {
		this.registerMarkdownCodeBlockProcessor("plot", (source, el, ctx) => {
			const fenceType = fenceTypeFromProcessorEl(el, ctx);
			ctx.addChild(
				new PlotFenceChild(el, this, source, ctx.sourcePath, fenceType),
			);
		});
	}
}
