import * as THREE from "three"

export class FontOutliner {

    /**
     * Construct a `FontOutliner` from url-to-font asynchronously.
     * @param THREE - The three.js library.
     * @param fontUrl - The Url to font file.
     */
    static fromUrl(THREE: THREE, fontUrl: string): Promise<FontOutliner>;

    /**
     * Construct a `FontOutliner` using an `ArrayBuffer` holding the font file.
     * @param THREE - The three.js library.
     * @param buf - An `ArrayBuffer` holding the font file.
     */
    constructor(THREE: THREE, buf: ArrayBuffer);

    /**
     * A Typr font object holding tables e.g. "head".
     * @internal
     */
    _font: object;

    /**
     * The `THREE.ShapePath` object.
     * @internal
     */
    _ShapePath: THREE.ShapePath;

    /**
     * Outline text.
     * @param text - Single-line text.
     * @param options - Configure shapes. 
     */
    outline(text: string, options?: {

        /**
         * Font size.
         * @defaultValue `100`
         */
        size?: number,

        /**
         * Is text written in left-to-right?
         * @defaultValue `true`
         */
        isLTR?: boolean,

        /**
         * Is solid shape using counter-clockwise winding?
         * @defaultValue `false`
         */
        isCCW?: boolean

    }): {

        /**
         * Array of shapes.
         */
        shapes: THREE.Shape[],

        /**
         * Line height.
         */
        h: number,

        /**
         * Advance width.
         */
        w: number,

        /**
         * Bottom (negative number).
         */
        yMin: number,

        /**
         * Top.
         */
        yMax: number

    };

    /**
     * Check if font has certain glyph.
     * @param codePoint - The unicode code point.
     */
    hasGlyph(codePoint: number): Boolean;
}