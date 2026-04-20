/**
 * Represents 4x4 matrices,
 * @classdesc This class manages the 3d transformations including rotation and translation.
 * @example
 * const matrix = new Matrix();
 * matrix.translateSelf(10, 20, 30);
 * const data = matrix.toCSSString(); // return matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 10, 20, 30, 1)
 */
class Matrix3D {
    /**
     * @type {Float32Array<ArrayBuffer>}
     */
    #data;

    /**
     * @type {Float32Array<ArrayBuffer>}
     */
    #auxData;

    /**
     * Constructs a new Matrix3D.
     * @param {Float32Array|undefined|Matrix3D|number[]} matrix - The matrix data.
     */
    constructor(matrix) {
        if (matrix === undefined) {
            this.#fromIdentity();
        }

        else if (matrix instanceof Matrix3D) {
            this.#fromInstance(matrix);
        }

        else if (matrix instanceof Float32Array || matrix instanceof Array) {
            if (this.#isValid(matrix)) {
                this.#fromArray(matrix);
            }
            else {
                throw new Error("Invalid matrix data, the matrix data must be of 16 finite numbers");
            }
        }
        else if (matrix instanceof Object) {
            this.#fromArray(Object.values(matrix));
        }

        else {
            throw new Error("Invalid matrix data, must be an instance of type: Float32Array | Matrix3D | number[] | undefined.");
        }

        this.#auxData = new Float32Array(this.#data);
    }

    static #DISCRETE_MATRIX_ROTATIONS = {
        x: {
            [-1]: new Int8Array([1, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1]),
            1: new Int8Array([1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1]),

            [-2]: new Int8Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
            2: new Int8Array([1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1]),

            [-3]: new Int8Array([1, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1]),
            [3]: new Int8Array([1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1]),
        },
        y: {
            [-1]: new Int8Array([0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1]),
            1: new Int8Array([0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 1]),

            [-2]: new Int8Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
            2: new Int8Array([-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1]),

            [-3]: new Int8Array([0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1]),
            [3]: new Int8Array([0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 1]),
        },
        z: {
            [-1]: new Int8Array([0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
            1: new Int8Array([0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),

            [-2]: new Int8Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
            2: new Int8Array([-1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),

            [-3]: new Int8Array([0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
            [3]: new Int8Array([0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
        }
    }

    /**
     * Multiplies two matrices.
     * @param {Float32Array<ArrayBuffer>} out - the receiving matrix.
     * @param {Float32Array<ArrayBuffer>} a - - The first operand.
     * @param {Float32Array<ArrayBuffer>} b - The second operand. 
     */
    static multiply(out, a, b) {
        const m0 = a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12];
        const m1 = a[0] * b[1] + a[1] * b[5] + a[2] * b[9] + a[3] * b[13];
        const m2 = a[0] * b[2] + a[1] * b[6] + a[2] * b[10] + a[3] * b[14];
        const m3 = a[0] * b[3] + a[1] * b[7] + a[2] * b[11] + a[3] * b[15];

        const m4 = a[4] * b[0] + a[5] * b[4] + a[6] * b[8] + a[7] * b[12];
        const m5 = a[4] * b[1] + a[5] * b[5] + a[6] * b[9] + a[7] * b[13];
        const m6 = a[4] * b[2] + a[5] * b[6] + a[6] * b[10] + a[7] * b[14];
        const m7 = a[4] * b[3] + a[5] * b[7] + a[6] * b[11] + a[7] * b[15];

        const m8 = a[8] * b[0] + a[9] * b[4] + a[10] * b[8] + a[11] * b[12];
        const m9 = a[8] * b[1] + a[9] * b[5] + a[10] * b[9] + a[11] * b[13];
        const m10 = a[8] * b[2] + a[9] * b[6] + a[10] * b[10] + a[11] * b[14];
        const m11 = a[8] * b[3] + a[9] * b[7] + a[10] * b[11] + a[11] * b[15];

        const m12 = a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + a[15] * b[12];
        const m13 = a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + a[15] * b[13];
        const m14 = a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14];
        const m15 = a[12] * b[3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15];

        // assign the new matrix components.
        out[0] = m0;
        out[1] = m1;
        out[2] = m2;
        out[3] = m3;
        out[4] = m4;
        out[5] = m5;
        out[6] = m6;
        out[7] = m7;
        out[8] = m8;
        out[9] = m9;
        out[10] = m10;
        out[11] = m11;
        out[12] = m12;
        out[13] = m13;
        out[14] = m14;
        out[15] = m15;

        return out;
    }

    get data() {
        return this.#data;
    }

    get auxData() {
        return this.#auxData;
    }

    set data(data) {
        this.#data.set(data);
    }

    get x() {
        return this.#data[12];
    }

    get y() {
        return this.#data[13];
    }

    get z() {
        return this.#data[14];
    }

    get gridUnitX() {
        return Math.sign(this.#data[12]);
    }

    get gridUnitY() {
        return Math.sign(this.#data[13]);
    }

    get gridUnitZ() {
        return Math.sign(this.#data[14]);
    }

    /**
     * Gets the X-axis position of the matrix in virtual grid units (e.g., -1.5, -0.5, 0.5, 1.5).
     * @returns {number} The X-axis position in grid units.
     */
    getGridPositionX(cellSize) {
        return this.#data[12] / cellSize;
    }

    /**
     * Gets the Y-axis position of the matrix in virtual grid units (e.g., -1.5, -0.5, 0.5, 1.5).
     * @returns {number} The Y-axis position in grid units.
     */
    getGridPositionY(cellSize) {
        return this.#data[13] / cellSize;
    }

    /**
     * Gets the Z-axis position of the matrix in virtual grid units (e.g., -1.5, -0.5, 0.5, 1.5).
     * @returns {number} The Z-axis position in grid units.
     */
    getGridPositionZ(cellSize) {
        return this.#data[14] / cellSize;
    }

    /**
     * Returns the rotation around the **X-axis**.
     * @returns {number} The angle in degrees.
     */
    getRx() {
        return Math.atan2(-this.#data[6], this.#data[10]) * 180 / Math.PI;
    }

    /**
     * Returns the rotation around the **Y-axis**.
     * @returns {number} The angle in degrees.
     */
    getRy() {
        return Math.asin(this.#data[2]) * 180 / Math.PI;
    }

    /**
     * Returns the rotation around the **Z-axis**.
     * @returns {number} The angle in degrees.
     */
    getRz() {
        return Math.atan2(-this.#data[1], this.#data[0]) * 180 / Math.PI;
    }

    /**
     * Sets the data of the matrix.
     * @param {number[]|Matrix3D|object} data - The matrix data. 
     */
    setData(data) {
        if (data.data) { // Matrix3D
            this.#data = data.data;
        }
        else if (data.length) { // array
            this.#data = new Float32Array(data);
        }
        else { // object
            const rawData = new Float32Array(Object.values(data));
            this.#data = rawData;
        }
    }

    /**
     * Sets the matrix to identity.
     */
    toIdentity() {
        this.#data[0] = 1;
        this.#data[1] = 0;
        this.#data[2] = 0;
        this.#data[3] = 0;
        this.#data[4] = 0;
        this.#data[5] = 1;
        this.#data[6] = 0;
        this.#data[7] = 0;
        this.#data[8] = 0;
        this.#data[9] = 0;
        this.#data[10] = 1;
        this.#data[11] = 0;
        this.#data[12] = 0;
        this.#data[13] = 0;
        this.#data[14] = 0;
        this.#data[15] = 1;
    }

    /**
     * Inits the matrix from an identity matrix.
     */
    #fromIdentity() {
        this.#data = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }

    /**
     * Init the matrix from an existing matrix.
     * @param {Matrix3D} matrix - A matrix 4x4.
     */
    #fromInstance(matrix) {
        this.#data = new Float32Array(matrix.data);
    }

    #fromArray(array) {
        this.#data = new Float32Array(array);
    }

    /**
     * Checks if the data is a valid matriz data.
     * @param {Float32Array | Array} data 
     */
    #isValid(data) {
        if (data.length !== 16) return false;
        for (let i = 0; i < data.length; i++) { if (!Number.isFinite(data[i])) return false; }
        return true;
    }

    /**
     * Rotates the matrix data or matrix aux data.
     * @param {string} axis - The **X**, **Y** or **Z** axis.
     * @param {number} angle - The angle in degrees.
     * @param {boolean} updateOriginalData - Whether updates the original matrix data or not.
     */
    #setRotation(axis, angle, updateOriginalData = false) {
        const rad = (angle * Math.PI) / 180;
        const s = Math.sin(rad);
        const c = Math.cos(rad);
        const auxData = this.#auxData;

        if (axis === "x") {
            auxData[0] = 1; auxData[1] = 0; auxData[2] = 0; auxData[3] = 0;
            auxData[4] = 0; auxData[5] = c; auxData[6] = s; auxData[7] = 0;
            auxData[8] = 0; auxData[9] = -s; auxData[10] = c; auxData[11] = 0;
            auxData[12] = 0; auxData[13] = 0; auxData[14] = 0; auxData[15] = 1;
        }
        else if (axis === "y") {
            auxData[0] = c; auxData[1] = 0; auxData[2] = -s; auxData[3] = 0;
            auxData[4] = 0; auxData[5] = 1; auxData[6] = 0; auxData[7] = 0;
            auxData[8] = s; auxData[9] = 0; auxData[10] = c; auxData[11] = 0;
            auxData[12] = 0; auxData[13] = 0; auxData[14] = 0; auxData[15] = 1;
        }
        else if (axis === "z") {
            auxData[0] = c; auxData[1] = s; auxData[2] = 0; auxData[3] = 0;
            auxData[4] = -s; auxData[5] = c; auxData[6] = 0; auxData[7] = 0;
            auxData[8] = 0; auxData[9] = 0; auxData[10] = 1; auxData[11] = 0;
            auxData[12] = 0; auxData[13] = 0; auxData[14] = 0; auxData[15] = 1;
        }

        if (updateOriginalData) {
            this.#data.set(auxData);
        }
        else {
            this.#auxData.set(auxData);
        }
    }

    /**
     * Projects a temporary rotation without modifying the matrix.
     * @param {Float32Array<ArrayBuffer>} out - The receiving matrix. 
     * @param {Matrix3D} m - The operand.
     * @param {string} axis - The **X**, **Y** or **Z** axis.
     * @param {number} angle - The angle in degrees.
     * @returns {Float32Array<ArrayBuffer>} The resulting matrix data.
     */
    projectRotation(out, m, axis, angle) {
        this.#setRotation(axis, angle, true); // find the rotation matrix first, then apply M ● R: 
        return Matrix3D.multiply(out, m, this.#data); //m = operand1, this.#data = Rotation matrix.
    }

    /**
     * Rotates the matrix in the specified axis and angle.
     * @param {number} axis - The **X**, **Y** or **Z** axis.
     * @param {number} angle - The angle in degrees.
     */
    rotateAxisAngleSelf(axis, angle) {
        const auxData = this.#auxData;
        this.#setRotation(axis, angle);
        this.multiplySelf(auxData);
        return this;
    }

    /**
     * Rotates the matrix around each of its axes by the specified number of degrees. The matrix is altered.
     * @param {number|undefined} x - The angle around the **X-axis**.
     * @param {number|undefined} y - The angle around the **Y-axis**.
     * @param {number|undefined} z - The angle around the **Z-axis**.
     */
    rotateSelf(x, y, z) {
        const auxData = this.#auxData;
        if (x) {
            this.#setRotation("x", x);
            this.multiplySelf(auxData);
        }
        if (y) {
            this.#setRotation("y", y);
            this.multiplySelf(auxData);
        }
        if (z) {
            this.#setRotation("z", z);
            this.multiplySelf(auxData);
        }
        return this;
    }

    /**
     * Updates the translation components of the matrix by the specified values. The matrix is altered.
     * The default vector is [0, 0, 0].
     * @param {number} x - The translation along the **X-axis**.
     * @param {number} y - The translation along the **Y-axis**.
     * @param {number} z - The translation along the **Z-axis**.
     */
    translateSelf(x, y, z) {
        this.#data[12] = x;
        this.#data[13] = y;
        this.#data[14] = z;
        return this;
    }

    /**
     * Multiplies the current matrix by other matrix. The matrix is altered.
     * @param {Float32Array<ArrayBuffer>} b - A matrix. 
     */
    multiplySelf(b) {
        const a = this.#data;
        // Calculate the new components of the global matrix given a rotation matrix.
        const m0 = a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12];
        const m1 = a[0] * b[1] + a[1] * b[5] + a[2] * b[9] + a[3] * b[13];
        const m2 = a[0] * b[2] + a[1] * b[6] + a[2] * b[10] + a[3] * b[14];
        const m3 = a[0] * b[3] + a[1] * b[7] + a[2] * b[11] + a[3] * b[15];

        const m4 = a[4] * b[0] + a[5] * b[4] + a[6] * b[8] + a[7] * b[12];
        const m5 = a[4] * b[1] + a[5] * b[5] + a[6] * b[9] + a[7] * b[13];
        const m6 = a[4] * b[2] + a[5] * b[6] + a[6] * b[10] + a[7] * b[14];
        const m7 = a[4] * b[3] + a[5] * b[7] + a[6] * b[11] + a[7] * b[15];

        const m8 = a[8] * b[0] + a[9] * b[4] + a[10] * b[8] + a[11] * b[12];
        const m9 = a[8] * b[1] + a[9] * b[5] + a[10] * b[9] + a[11] * b[13];
        const m10 = a[8] * b[2] + a[9] * b[6] + a[10] * b[10] + a[11] * b[14];
        const m11 = a[8] * b[3] + a[9] * b[7] + a[10] * b[11] + a[11] * b[15];

        const m12 = a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + a[15] * b[12];
        const m13 = a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + a[15] * b[13];
        const m14 = a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14];
        const m15 = a[12] * b[3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15];

        // assign the new matrix components.
        this.#data[0] = m0;
        this.#data[1] = m1;
        this.#data[2] = m2;
        this.#data[3] = m3;

        this.#data[4] = m4;
        this.#data[5] = m5;
        this.#data[6] = m6;
        this.#data[7] = m7;

        this.#data[8] = m8;
        this.#data[9] = m9;
        this.#data[10] = m10;
        this.#data[11] = m11;

        this.#data[12] = m12;
        this.#data[13] = m13;
        this.#data[14] = m14;
        this.#data[15] = m15;
    }

    /**
     * Rotates the matrix by quadrantal angles specified by a number of turns preserving the whole numbers if all the transformations started from the **identity matrix** or a **discrete matrix rotation**.
     * 
     * Equivalency:
     * -1 -> -90,
     * 1  -> 90, 
     * 2  -> 180, 
     * -3 -> -270, 
     * 3  -> 270, 
     * @param {string} axis - The **X**, **Y** or **Z** axis.
     * @param {number} turns - The total number of turns and its direction (sign). 
     */
    rotateDiscrete(axis, turns) {
        const R = Matrix3D.#DISCRETE_MATRIX_ROTATIONS[axis][turns]; // rotation matrix
        this.multiplySelf(R);
    }

    /**
     * Transform the floatArray matrix to a string for CSS transform property.
     * @returns {string} The CSS string matrix.
     */
    toCSSString() {
        return `matrix3d(${this.#data.toString()})`;
    }

    /* This class is incomplete, it is missing methods like "add", "inverse", or "skew", i will add those methods and some more in the near future... */
}