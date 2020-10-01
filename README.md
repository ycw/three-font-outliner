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

Via npm: ( `npm i ycw/three-font-outliner#v1.0.2` )

```js
import Outliner from "three-font-outliner"
```

Via cdn:

```js
import Outliner from "https://cdn.jsdelivr.net/gh/ycw/three-font-outliner@1.0.2/src/index.js"
```

## Usage

Create an outliner.

```js
// From arraybuffer holding the font file.
new Outliner(buffer, THREE.ShapePath);

// From font url. (async)
await Outliner.fromUrl("./roboto.ttf", THREE.ShapePath);
```

Outline text.

```js
// Outline text with optional options.
outliner.outline("hello", {
    size: 100,    // Font size. Default 100.
    isLTR: true,  // Is text written in left-to-right? Default true.
    isCCW: false, // Is solid shape using CCW winding? Default false.
});
```

Consume outline result.

```js
const {
    shapes, // Array of THREE.Shape.
    h,      // Line height.
    w,      // Advance width.
    yMin,   // Bottom (negative number).
    yMax,   // Top.
} = outliner.outline("hello");
```

## Credits

- [photopea/Typr.js](https://github.com/photopea/Typr.js)
- [mrdoob/three.js](https://github.com/mrdoob/three.js)

## License

[MIT](LICENSE)