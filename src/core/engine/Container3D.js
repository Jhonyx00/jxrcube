/**
 * Manages a group of **Box3D** objects.
 */
class Container3D {
    /**
     * The transformation matrix for the element used to manage 3D transformations.
     * @type {Matrix3D}
     */
    #matrix = new Matrix3D();

    /**
     * The main HTML div element that acts as the element for all the child elements.
     * @type {HTMLElement|null}
     */
    #element = null;

    /**
     * The rotation sensitivity.
     */
    static #ROTATION_SENSITIVITY = devicePixelRatio / 6;

    /**
     * Constructs a new container 3d.
     */
    constructor() {
        this.#element = document.createElement("div");
        this.addClass("container-3d");
    }

    get element() {
        return this.#element;
    }

    get matrix() {
        return this.#matrix;
    }

    /**
     * Adds an array of Box3D objects to the group, clearing any existing children.
     * It efficiently appends all the elements using a DocumentFragment to minimize Dom reflows.
     * @param {Box3D[]} boxes - An array od Box3D instances to add to this group. 
     */
    addBoxes(boxes) {
        const fragment = document.createDocumentFragment();
        boxes.forEach(item => { fragment.appendChild(item.element); });
        this.#element.appendChild(fragment);
    }

    /**
     * Appends the box group main HTML element to a specified parent DOM element.
     * @param {HTMLElement} parent - The DOM element to which the element will be appended. 
     */
    render(parent) {
        parent.appendChild(this.#element);
    }

    /**
     * Rotates the container matrix around each of its axes by the specified number of degrees and applies the transformation to the container element.
     * @param {number} x - Rotation around the **X-angle**.
     * @param {number} y - Rotation around the **Y-angle**.
     * @param {number} z - Rotation around the **Z-angle**.
     */
    rotateSelf(x, y, z) {
        this.#matrix.rotateSelf(x, y, z);
        this.#applyElementTransform();
    }

    /**
     * Animates the rotation of the container using linear interpolation.
     * @param {number} maxTime - The time that the animation lasts.
     * @param {Matrix3D} expansionMatrix - An aux matrix to do the matrix operations
     * @param {number} travel - The travel of the animation.
     * @param {Matrix3D} targetMatrixData - The Matrix3d thaht indicates the final state of the animation.
     * @param {function():void} onFinish - The callback to execute after the animation ends.
     */
    animateRotate(maxTime, expansionMatrix, travel, targetMatrixData, onFinish) {
        const targetMatrix = new Matrix3D(targetMatrixData);

        const targetX = -targetMatrix.getRx();
        const targetY = -targetMatrix.getRy();
        const targetZ = -targetMatrix.getRz();

        let start = null;
        const frame = (timestamp) => {
            if (start === null) start = timestamp;

            let t = (timestamp - start) / maxTime;

            if (t > 1) t = 1;

            const matrix = this.#matrix;
            const expansion = travel + (1 - travel) * t;

            expansionMatrix.data = matrix.auxData;
            expansionMatrix.rotateSelf(targetX * expansion, targetY * expansion, targetZ * expansion);

            this.#element.style.transform = `${expansionMatrix.toCSSString()}`;

            if (t < 1) {
                requestAnimationFrame(frame);
            }
            else {
                onFinish();
            }
        };
        requestAnimationFrame(frame);
    }

    /**
     * Updates the matrix data from the provided coordinates.
     * @param {number} dx - Input delta X.
     * @param {number} dy - Input delta Y.
     */
    updateMatrixFromDelta(dx, dy) {
        this.#matrix.rotateSelf(-dy * Container3D.#ROTATION_SENSITIVITY, dx * Container3D.#ROTATION_SENSITIVITY, 0);
        this.#applyElementTransform();
    }

    /**
     * Sets the matrix data from an existing matrix data.
     * @param {Float32Array[]|Object} data - The matrix data.
     */
    setMatrixFromData(data) {
        this.#matrix.setData(data);
        this.#applyElementTransform();
    }

    /**
     * Adds the given class to the **`element`**.
     * @param {string} className - The class to add. 
     */
    addClass(className) {
        this.#element.classList.add(className);
    }

    /**
     * Removes the given class from the **`element`**.
     * @param {string} className - The class to remove. 
     */
    removeClass(className) {
        this.#element.classList.remove(className);
    }

    /**
     * Sets the **data-*** attribute fot the element.
     * @param {string} dataName - The **data-*** attribute name.
     * @param {string|number} value - The **data-*** attribute value.
     */
    setDataAttr(dataName, value) {
        this.#element.setAttribute(`data-${dataName}`, `${value}`);
    }

    /**
     * Applies the box transformation of the **`Matrix3D`**.
     */
    #applyElementTransform() {
        this.#element.style.transform = `${this.#matrix.toCSSString()}`;
    }
}