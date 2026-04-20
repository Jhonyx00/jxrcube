/**
 * A **`Point`** object represents a 3D point in the coordinate system, it includes values for the coordinates in three dimensions as well as an optional perspective value.
 */
class Vector3D {
    /**
     * The auxiliar values for point calculations.
     */
    #auxX = 0;
    #auxY = 0;
    #auxZ = 0;
    #auxW = 1;

    /**
     * The values for the coordinates.
     */
    #x = 0;
    #y = 0;
    #z = 0;
    #w = 1;

    /**
     * Constructs a new point in the coordinate system.
     * @param {number} x - The point's horizontal coordinate.
     * @param {number} y - Vertical coordinate.
     * @param {number} z - Depth coordinate.
     * @param {number} w - The point's perspective value.
     */
    constructor(x, y, z, w = 1) {
        this.#x = x;
        this.#y = y;
        this.#z = z;
        this.#w = w;

        this.#auxX = x;
        this.#auxY = y;
        this.#auxZ = z;
        this.#auxW = w;

        this.normX = 0;
        this.normY = 0;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    get z() {
        return this.#z;
    }

    get w() {
        return this.#w;
    }

    /**
     * Unit vector pointing towards the positive Y-axis.
     * @type {Vector3D}
     */
    static UP = new Vector3D(0, 1, 0);

    /**
     * Unit vector pointing towards the positive X-axis.
     * @type {Vector3D}
     */
    static RIGHT = new Vector3D(1, 0, 0);

    /**
     * Unit vector pointing towards the positive Z-axis.
     * @type {Vector3D}
     */
    static FRONT = new Vector3D(0, 0, 1);
    /**
     * Unit vector pointing towards the negative Z-axis.
     * @type {Vector3D}
     */
    static BACK = new Vector3D(0, 0, -1);

    /**
     * Unit vector pointing towards the negative X-axis.
     * @type {Vector3D}
     */
    static LEFT = new Vector3D(-1, 0, 0);

    /**
     * Unit vector pointing towards the negative Y-axis.
     * @type {Vector3D}
     */
    static DOWN = new Vector3D(0, -1, 0);

    /**
     * 
     * @param {Float32Array<ArrayBuffer>} matrix - A string containing the 16 components of the matrix. 
     */
    matrixTransform(matrix) {
        const x = this.#auxX;
        const y = this.#auxY;
        const z = this.#auxZ;
        const w = this.#auxW;

        this.#x = matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12] * w;
        this.#y = matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13] * w;
        this.#z = matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14] * w;
        this.#w = matrix[3] * x + matrix[7] * y + matrix[11] * z + matrix[15] * w;

        return this;
    }

    /**
     * Normalices the **`x`** and **`y`** coordinates.
     * Sets the value of **`normX`** and **`normY`**.
     * Does not affect the original value of the vector.
     */
    normalize2D() {
        const x = this.#x;
        const y = this.#y;
        const invMag = 1 / Math.hypot(x, y);
        this.normX = x * invMag;
        this.normY = y * invMag;
    }

    /**
     * Calculates the dot product between this vector's normalized direction (unit vector) and the receiving data (x, y).
     * @param {number} x - The **X** coordinate.
     * @param {number} y - The **Y** coordinate.
     * @returns {number} The scalar product of the operation.
     * @see {@link Vector3D#normalize2D}
     */
    dotNormalized2D(x, y) {
        return x * this.normX + y * this.normY;
    }
}