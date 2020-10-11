# About

Constructing shapes from glyphs at runtime for three.js. 

## Examples 

- [Shapes](https://ycw.github.io/three-font-outliner/examples/shapes/)
- [Points](https://ycw.github.io/three-font-outliner/examples/points/)
  | [Lines](https://ycw.github.io/three-font-outliner/examples/lines/) 
  | [Tubes](https://ycw.github.io/three-font-outliner/examples/tubes/)
  | [Edges](https://ycw.github.io/three-font-outliner/examples/edges/)
  | [Along Path](https://ycw.github.io/three-font-outliner/examples/along-path/)
  | [Cannon](https://ycw.github.io/three-font-outliner/examples/cannon/)
- [Array Buffer](https://ycw.github.io/three-font-outliner/examples/array-buffer/)

## Installation

Via npm: ( `npm i ycw/three-font-outliner#v1.0.3` )

```js
import Outliner from "three-font-outliner"
```

Via cdn:

```js
import Outliner from "https://cdn.jsdelivr.net/gh/ycw/three-font-outliner@1.0.3/dist/lib.esm.js"
```

## Usage

```js
// Ex. Show text "Shapes" using font "aqua.ttf".
const outliner = await Outliner.fromUrl("./aqua.ttf", THREE.ShapePath);
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
// method1: from arraybuffer holding the font file.
const outliner = new Outliner(arrayBuffer, THREE.ShapePath);
// method2: from url-to-font. (async)
const outliner = await Outliner.fromUrl(url, THREE.ShapePath);
```
- Ex. [Array Buffer](https://ycw.github.io/three-font-outliner/examples/array-buffer/) - Select font from file system.

Outline glyph for text:

```js
const outliner = await Outliner.fromUrl(url, THREE.ShapePath);
const result = outliner.outline("hello");

result.shapes; // Array of `THREE.Shape`
result.h; // Line height
result.w; // Advance width
result.yMin; // Bottom (usually a negative value)
result.yMax; // Top
```

Method `.outline()` accepts optional options:

```js
outliner.outline("hello", {
  size: 100, // Font size. Default 100,
  isLTR: true, // Is left-to-right writing mode? Default true.
  isCCW: false, // Is solid shape using CCW winding? Default false.
});
```

Check if certain glyph exists:

```js
const codePoint = 65;
outliner.hasGlyph(codePoint); // true / false
```

## Credits

- [photopea/Typr.js](https://github.com/photopea/Typr.js)
- [mrdoob/three.js](https://github.com/mrdoob/three.js)

## License

[MIT](LICENSE)