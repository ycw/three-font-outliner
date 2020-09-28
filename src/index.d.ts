import * as THREE from "three"

export default class Outliner {

    /**
     * Construct a `Outliner` from url asynchronously.
     * @param fontUrl - Url to font.
     * @param ShapePath - (DI) three.js's ShapePath.
     */
    static async fromUrl(fontUrl: string, ShapePath: THREE.ShapePath): Promise<Outliner>;

    /**
     * Construct a `Outliner` from `ArrayBuffer`.
     * @param buf - ArrayBuffer holding the font.
     * @param ShapePath - (DI) three.js's ShapePath.
     */
    constructor(buf: ArrayBuffer, ShapePath: THREE.ShapePath);

    /**
     * 
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
         * Bottom.
         */
        yMin: number,

        /**
         * Top.
         */
        yMax: number
    };
}