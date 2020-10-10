# About

Constructing shapes from glyphs at runtime for three.js. 

## Examples 

- [Edges](https://ycw.github.io/three-font-outliner/examples/edges/)
- [Along Path](https://ycw.github.io/three-font-outliner/examples/along-path/)
- [Points](https://ycw.github.io/three-font-outliner/examples/points/)
- [Lines](https://ycw.github.io/three-font-outliner/examples/lines/)
- [Tubes](https://ycw.github.io/three-font-outliner/examples/tubes/)
- [Cannon](https://ycw.github.io/three-font-outliner/examples/cannon/)
- [Shapes](https://ycw.github.io/three-font-outliner/examples/shapes/)

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
// Ex. Show "hello". 
const outliner = await Outliner.fromUrl("./roboto.ttf", THREE.ShapePath);
const { shapes } = outliner.outline("hello");
scene.add(new THREE.Mesh(
    new THREE.ShapeBufferGeometry(shapes, 16).center(),
    new THREE.MeshBasicMaterial({ color: "blue", side: THREE.DoubleSide })
));
```

Live result: [Shapes](https://ycw.github.io/three-font-outliner/examples/shapes/)

## Docs

### Construct an `Outliner` for a font. 

`new Outliner(arrayBuffer, ShapePath)`
- Construct an `Outliner` from an `arraybuffer` holding the font file.
- `ShapePath` is the `THREE.ShapePath` constructor.

`Outliner.fromUrl(url, ShapePath)`
- Construct an `Outliner` from an `url` to the font file asynchronously.
- `ShapePath` is the `THREE.ShapePath` constructor.
- This function returns a `Promsie`.

```js
// Ex. Construct an `Outliner` from url-to-font. 
const outliner = await Outliner.fromUrl("./roboto.ttf", THREE.ShapePath);
```

### Outline glyph into `THREE.Shape`s.

`.outline(text, options)`
- Outline `text` with `options`.
  - `options.size` - Font size. Default `100`.
  - `optinos.isLTR` - Is `text` written in left-toright? Default `true`.
  - `options.isCCW` - Is solid shape using CCW winding? Default `false`.
- This method returns an *object* which contains the following properties.
  - `.shapes` - Array of `THREE.Shape`.
  - `.h` - Line height.
  - `.w` - Advance width.
  - `.yMin` - Bottom (usually a negative value).
  - `.yMax` - Top.

## Credits

- [photopea/Typr.js](https://github.com/photopea/Typr.js)
- [mrdoob/three.js](https://github.com/mrdoob/three.js)

## License

[MIT](LICENSE)