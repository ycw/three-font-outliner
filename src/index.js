import Typr from "../lib/Typr/index.js"

export default class Outliner {

	static async fromUrl(fontUrl, ShapePath) {
		return new Outliner(await (await fetch(fontUrl)).arrayBuffer(), ShapePath);
	}

	constructor(buf, ShapePath) {
		this._font = Typr.parse(buf)[0];
		this._ShapePath = ShapePath;
	}

	outline(text, options = {}) {
		options = Object.assign({ size: 100, isLTR: true, isCCW: false }, options);

		const font = this._font;
		const shape = Typr.U.shape(font, text, options.isLTR);
		
		const { cmds, crds } = Typr.U.shapeToPath(font, shape);
		const shapePath = new this._ShapePath();
		const s = options.size / font.head.unitsPerEm;
		let i = 0;
		for (const cmd of cmds) {
			switch (cmd) {
				case "M":
					shapePath.moveTo(crds[i++] * s, crds[i++] * s);
					break;
				case "L":
					shapePath.lineTo(crds[i++] * s, crds[i++] * s);
					break;
				case "Q":
					shapePath.quadraticCurveTo(crds[i++] * s, crds[i++] * s, crds[i++] * s, crds[i++] * s);
					break;
				case "C":
					shapePath.bezierCurveTo(crds[i++] * s, crds[i++] * s, crds[i++] * s, crds[i++] * s, crds[i++] * s, crds[i++] * s);
					break;
			}
		}

		// Convert shapePath to shapes
		const shapes = shapePath.toShapes(options.isCCW);

		// Compute line height
		const h = (font.head.yMax - font.head.yMin) * s;

		// Compute total advance width 
		const w = shape.reduce((o, nu) => o + nu.ax, 0) * s;

		// Compute yMin and yMax
		const yMax = this._font.head.yMax * s;
		const yMin = this._font.head.yMin * s;

		return { shapes, h, w, yMin, yMax };
	}

	hasGlyph(codePoint) {
		return Typr.U.codeToGlyph(this._font, codePoint) > 0;
	}
}