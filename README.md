# About

Constructing shapes from glyphs at runtime for three.js.

## Installation
(TODO)

## Usage

Create an outliner.

```js
// (sync) from an arraybuffer holding font file.
new Outliner(buffer, THREE.ShapePath);

// (async) from font url.
await Outliner.fromUrl("./roboto.ttf", THREE.ShapePath);
```

Outline text.

```js
// outline text with optional options.
outliner.outline("hello", {
    // Font size. 
    // Default 100.
    size: 100,
    // Is text written in left-to-right? 
    // Default true.
    isLTR: true,
    // Is solid shape using counter-clockwise winding? 
    // Default false.  
    isCCW: false, 
});
```

Consume outline result.

```js
const {
    shapes, // Array of THREE.Shape 
    h,      // Line height
    w,      // Advance width
    yMin,   // Bottom (negative number)
    yMax,   // Top
} = outliner.outline("hello");
```


## Credits

- [photopea/Typr.js](https://github.com/photopea/Typr.js)
- [mrdoob/three.js](https://github.com/mrdoob/three.js)

## License

[MIT](LICENSE)