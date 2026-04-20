/**
 * Represents a rectangular prism by using HTML elements and css transforms.
 * @classdesc This class creates six faces (front, back, top, right, left, bottom) and each face is absolutely positioned and transformed in 3D space to form a rectangular prism.
 */
class Box3D {
    /**
     * The id of the box.
     * @type {number|null}
     */
    #id = null;

    /**
     * A 4x4 matrix that will be used for 3d operations of the box. 
     */
    #matrix = new Matrix3D();

    /**
     * The HTML div element that contains six faces of the box.
     * @type {HTMLElement|null}
     */
    #element = null;

    /**
     * This object will contain the BoxFace objects of the box, for logical purposes.
     * @type {Object.<string, BoxFace>}
     */
    #faces = {};

    /**
     * The box size representing the element in the 3d space.
     */
    #size = 0;

    /**
     * The box type (e.g., corner).
     */
    #type = "";

    /**
     * The object containing the index for each face.
     * @type {Object.<string, number>}
     */
    #faceIds = {};

    /**
     * The object containing the index of the visible faces of the box.
     * @type {Object.<string, number>}
     */
    #extrovertedIds = {};

    /**
     * Constructs a rectangular prism.
     * @param {Dimension|number|string} dimension - An object, string or number specifying the dimensions of the box.
     */
    constructor(dimension) {
        this.#element = document.createElement("div");
        this.#element.classList.add("box");

        /**
         * @type {Dimension}
         */
        const finalDimension = {};

        const dimensionType = typeof dimension;
        if (dimensionType === "object") {
            finalDimension["width"] = dimension.width;
            finalDimension["height"] = dimension.height;
            finalDimension["depth"] = dimension.depth;
        }
        else if (dimensionType === "number") {
            finalDimension["width"] = dimension;
            finalDimension["height"] = dimension;
            finalDimension["depth"] = dimension;
            this.#size = dimension;
        }
        else if (dimensionType === "string") {
            const intDimension = dimension.replace(/[^0-9]/g, "");
            finalDimension["width"] = intDimension;
            finalDimension["height"] = intDimension;
            finalDimension["depth"] = intDimension;
            this.#size = intDimension;
        }

        /**
         * Defines the default properties for each of the six faces of the 3D box.
         * The keys correspond to specific faces:
         * 0 - front
         * 1 - top
         * 2 - right
         * 3 - back
         * 4 - left
         * 5 - bottom
         * @type {PrismData[]}
         */
        const data = [
            {
                dimension: { width: finalDimension.width, height: finalDimension.height, },
                position: { x: 0, y: 0, z: finalDimension.depth * 0.5 },
                rotation: { x: 0, y: 0, z: 0 },
            },
            {
                dimension: { width: finalDimension.width, height: finalDimension.depth },
                position: { x: 0, y: 0, z: finalDimension.depth * 0.5 },
                rotation: { x: 90, y: 0, z: 0 },
            },
            {
                dimension: { width: finalDimension.depth, height: finalDimension.height, },
                position: { x: 0, y: 0, z: finalDimension.width - finalDimension.depth * 0.5 },
                rotation: { x: 0, y: 90, z: 0 },
            },
            {
                dimension: { width: finalDimension.width, height: finalDimension.height, },
                position: { x: 0, y: 0, z: finalDimension.depth * 0.5 },
                rotation: { x: 0, y: 180, z: 0 },
            },
            {
                dimension: { width: finalDimension.depth, height: finalDimension.height, },
                position: { x: 0, y: 0, z: finalDimension.depth * 0.5 },
                rotation: { x: 0, y: -90, z: 0 },
            },
            {
                dimension: { width: finalDimension.width, height: finalDimension.depth },
                position: { x: 0, y: 0, z: finalDimension.height - finalDimension.depth * 0.5 },
                rotation: { x: -90, y: 0, z: 0 },
            },
        ];

        if (dimensionType === "string") {
            this.addClass(dimension);
        }
        else {
            this.#setElementStyle({
                width: `${this.#size ? this.#size : finalDimension.width}px`,
                height: `${this.#size ? this.#size : finalDimension.height}px`
            });
        }

        this.#buildFromData(data);
        Object.seal(this);
    }

    set extrovertedIds(extrovertedIds) {
        this.#extrovertedIds = extrovertedIds;
    }

    /**
     * Gets the unique identifier of the box.
     * @returns {number} The box id.
     */
    get id() {
        return this.#id;
    }

    get matrix() {
        return this.#matrix;
    }

    get size() {
        return this.#size;
    }

    set matrix(matrix) {
        this.#matrix = matrix;
    }

    get type() {
        return this.#type;
    }

    get faces() {
        return this.#faces;
    }

    get element() {
        return this.#element;
    }

    get faceIds() {
        return this.#faceIds;
    }

    set faceIds(faceIds) {
        this.#faceIds = faceIds;
    }

    get extrovertedIds() {
        return this.#extrovertedIds;
    }

    /**
     * Defines a box type for logical purposes.
     * This could be used for animations, logic or styling the element.
     * @param {string} type - A string that will be added as a className.  
     */
    setType(type) {
        this.#type = type;
        this.addClass(type);
    }

    /**
     * Sets the unique identifier for the box and updates its corresponding data attribute on the DOM element.
     * @param {number} id - The unique ID to assign to this box. 
     */
    setDataId(id, name) {
        this.#id = id;
        this.#element.setAttribute(`data-${name}`, `${id}`);
    }

    setMatrix(matrix) {
        this.#matrix = matrix;
        this.#applyElementTransform();
    }

    /**
     * Returns the string representation of the DOMMatrix.
     * @returns {Float32Array<ArrayBuffer>} A string representating the DOMMatrix of the box.
     */
    getMatrixData() {
        return this.#matrix.data;
    }

    /**
     * Defines the visible faces of the box. Extroverted ids could be used for styling or applying some logic. 
     * Ads a class named "extroverted" on each extroverted face.
     * @param {Object.<string, number>} extrovertedIds - The extroveted ids for each face of the box. 
     */
    setExtrovertedIds(extrovertedIds) {
        this.#extrovertedIds = extrovertedIds;
        extrovertedIds.forEach(extrovertedId => this.#faces[extrovertedId]?.addClass("extroverted"));
    }

    /**
     * Rotates the box to the specified axis and turns.
     * @param {string} axis - The axis.
     * @param {number} turns - The turns.
     */
    rotateDiscrete(axis, turns) {
        this.#matrix.rotateDiscrete(axis, turns);
        this.#applyElementTransform();
    }

    /**
     * Synchronizes the visual DOM element with the given matrix data. 
     * @param {Float32Array<ArrayBuffer>} data - The matrix data
     */
    applyTransformFromMatrix(data) {
        this.#element.style.transform = `matrix3d(${data})`;
    }

    /**
     * Translates the box matrix around each of its axes by the specified number of degrees and applies the transformation to the container element.
     * 
     * Translates the box to the specified position.
     * @param {number} x - The position in the **X-axis**.
     * @param {number} y - The position in the **Y-axis**.
     * @param {number} z - The position in the **Z-axis**.
     */
    translateSelf(x, y, z) {
        if (this.#size) {
            this.#matrix.translateSelf(x * this.#size, y * this.#size, z * this.#size);
        }
        else {
            this.#matrix.translateSelf(x, y, z);
        }
        this.#applyElementTransform();
    }

    /**
     * An animation that starts in the expanded position and ends at the original box position. 
     * @param {number} maxTime - Total time.
     * @param {Matrix3D} expansionMatrix - The expansion matrix. 
     * @param {number} expansionFactor - The expansion factor.
     */
    magneticAttraction(maxTime, expansionMatrix, expansionFactor = 1) {
        expansionMatrix.translateSelf(
            this.#matrix.x * expansionFactor,
            this.#matrix.y * expansionFactor,
            this.#matrix.z * expansionFactor
        );
        this.#element.animate(
            [
                { transform: expansionMatrix.toCSSString() },
                { transform: this.#matrix.toCSSString() }
            ],
            { duration: maxTime }
        );
    }

    /**
     * Fades in the face elements while gradually restoring its contrast. 
     * @param {number} duration - The total duration of the animation.
     */
    backToLife(duration) {
        Object.values(this.#faces).forEach(face => {
            face.element.animate([
                { opacity: 0, filter: "hue-rotate(3.1416rad) contrast(0%)" },
                { opacity: 1, filter: "hue-rotate(0) contrast(100%)" }
            ],
                {
                    duration: duration,
                    easing: "ease"
                }
            );
        });
    }

    /**
     * Removes whatever the six faces of the cube contains.
     */
    removeTextContent() {
        Object.values(this.#faces).forEach((face) => face.setTextContent(""));
    }

    /**
     * Adds a string for the six faces of the cube.
     * @param {string} content - An string containig what all faces will show. 
     */
    setTextContent(content) {
        Object.values(this.#faces).forEach((face) => face.setTextContent(content));
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

    hide() {
        this.#element.classList.add("hidden");
    }

    show() {
        this.#element.classList.remove("hidden");
    }

    /**
     * Exchanges the face ids specified by the object.
     * This allows the spatial orientation of the box faces to remain the same.
     * For example, the face that in front of the camera represents a front with id 0, 
     * If the box is rotated by a 90 degrees angle, a new face will replace the "Front" orientation, this way the "front" will be always the same local orientation.
     * Sets a data-* attibute containing the new face id.
     * @param {Object.<string, number>} faceIds - An object containig the face ids to exchange.
     */
    setFaceIds(faceIds) {
        /**
        * @type {Object.<string, BoxFace>}
        */
        const targetFaces = {};
        Object.entries(faceIds).forEach(([currentId, targetId]) => {
            this.#faces[currentId].setDataId(targetId, "face");
            const face = this.#faces[currentId];
            targetFaces[targetId] = face;
            this.#faceIds[face.id] = face.dataId;
        });
        this.#faces = targetFaces;
    }

    /**
     * Sets the face ids to the base form: {0:0, 1:1, 2:2, 3:3, 4:4, 5:5} and reorder the "faces" property to its ascending order.
     */
    resetFaceIds() {
        /** @type {Object.<string, BoxFace>}*/
        const targetFaces = {};
        for (let i = 0; i < 6; i++) {
            const face = this.#faces[i];
            face.setDataId(face.id, "face");
            this.#faceIds[i] = face.id;
            targetFaces[face.id] = face;
        }
        this.#faces = targetFaces;
    }

    /**
     * Appends the 3D box main HTML element to a specified parent DOM element.
     * @param {HTMLElement} parent - The DOM element to which the element will be appended. 
     */
    insertTo(parent) {
        parent.appendChild(this.#element);
    }

    /**
    * Creates an HTML div element for each face and places it into its parent element.
    * @param {PrismRawData[]} prismData - An object containing the properties for each face of the 3D box.
    */
    #buildFromData(prismData) {
        prismData.forEach((data, index) => {
            const face = new BoxFace(index);
            face.setDataId(index, "face");
            face.addClass(`face-${index}`);

            const rotation = data.rotation;
            const position = data.position;
            const dimension = data.dimension;

            const rotateXStr = rotation.x ? `rotateX(${rotation.x}deg)` : ``;
            const rotateYStr = rotation.y ? `rotateY(${rotation.y}deg)` : ``;
            const rotateZStr = rotation.z ? `rotateZ(${rotation.z}deg)` : ``;

            const translateZStr = `translateZ(${position.z}px)`;

            if (this.#size === 0) {
                face.setElementStyle({
                    width: `${dimension.width}px`,
                    height: `${dimension.height}px`,
                });
            }

            face.setElementStyle({
                transform: `${rotateXStr} ${rotateYStr} ${rotateZStr} ${translateZStr}`
            });

            this.#faces[index] = face;
            face.insertTo(this.#element);
        });
    }

    /**
     * Applies the box transformation of the **`Matrix3D`**.
     */
    #applyElementTransform() {
        this.#element.style.transform = `${this.#matrix.toCSSString()}`;
    }

    /**
     * Sets CSS styles on a given HTML element.
     * It merges the provided "styles" object into the element's style property.
     * @param {object} styles - An object where keys are CSS properties (camelCase) and values are their corresponding values.
     */
    #setElementStyle(styles) {
        Object.assign(this.#element.style, styles);
    }
}