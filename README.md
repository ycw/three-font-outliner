# About

Constructing shapes from glyphs at runtime for three.js. 

## Examples 

- [Shapes](https://ycw.github.io/three-font-outliner/examples/shapes/) - Load font from url.
- [Array Buffer](https://ycw.github.io/three-font-outliner/examples/array-buffer/) - Select font from file system.
- [Points](https://ycw.github.io/three-font-outliner/examples/points/)
  | [Lines](https://ycw.github.io/three-font-outliner/examples/lines/) 
  | [Tubes](https://ycw.github.io/three-font-outliner/examples/tubes/)
  | [Edges](https://ycw.github.io/three-font-outliner/examples/edges/)
  | [Along Path](https://ycw.github.io/three-font-outliner/examples/along-path/)
  | [Cannon](https://ycw.github.io/three-font-outliner/examples/cannon/)

## Installation

Via npm: ( `npm i ycw/three-font-outliner#v2.0.0` )

```js
import { FontOutliner } from "three-font-outliner"
```

Via cdn:

```js
import { FontOutliner } from "https://cdn.jsdelivr.net/gh/ycw/three-font-outliner@2.0.0/dist/lib.esm.js"
```

## Usage

```js
// Ex. Show text "Shapes" using font "aqua.ttf".
const outliner = await FontOutliner.fromUrl(THREE, "./aqua.ttf");
const { shapes } = outliner.outline("Shapes");
scene.add(new THREE.Mesh(
    new THREE.ShapeBufferGeometry(shapes, 16).center(),
    new THREE.MeshBasicMaterial({ color: "blue", side: THREE.DoubleSide })
));
```

Live result: [Shapes](https://ycw.github.io/three-font-outliner/examples/shapes/)

## Docs

Make a font outliner:

```js
// Method 1: Load from `Arraybuffer` holding the font file.
const outliner = new FontOutliner(THREE, arrayBuffer);

// Method 2: Load from url. (async)
const outliner = await FontOutliner.fromUrl(THREE, fontUrl);
```
- Ex. [Array Buffer](https://ycw.github.io/three-font-outliner/examples/array-buffer/) - Select font from file system.
- Ex. [Shapes](https://ycw.github.io/three-font-outliner/examples/shapes/) - Load font from url.

Then, outline glyph:

```js
const result = outliner.outline("hello");

result.shapes; // Array of `THREE.Shape`
result.h; // Line height
result.w; // Advance width
result.yMin; // Bottom (usually a negative value)
result.yMax; // Top
```

`.outline()` accepts optional options:

```js
const result = outliner.outline("hello", {
  size: 100, // Font size. Default 100,
  isLTR: true, // Is left-to-right writing mode? Default true.
  isCCW: false, // Is solid shape using CCW winding? Default false.
});
```

Check if certain glyph exists by unicode code point:

```js
const codePoint = 65;
outliner.hasGlyph(codePoint); // return true / false
```

## Credits

- [photopea/Typr.js](https://github.com/photopea/Typr.js)
- [mrdoob/three.js](https://github.com/mrdoob/three.js)

## License

[MIT](LICENSE)