/**
 * Represents a single face of a rectangular prism.
 */
class BoxFace {
    /**
     * The main HTML div element of the box face.
     * @type {HTMLElement|null}
     */
    #element = null;

    /**
     * @type {number|null}
     * The id.
     */
    #id = null;

    /**
     * The ``**data-***`` attribute. 
     */
    #dataId = "";

    /**
     * Constructs a new box facce.
     * @param {number} id - The face id. 
     */
    constructor(id) {
        this.#element = document.createElement("div");
        this.#element.classList.add("face");
        this.#id = id;
        Object.seal(this);
    }

    set id(id) {
        this.#id = id;
    }

    get id() {
        return this.#id;
    }

    get element() {
        return this.#element;
    }

    get dataId() {
        return this.#dataId;
    }

    /**
     * Appends the face HTML element to the specified parent DOM element.
     * @param {HTMLElement} parent - The DOM element to which the element will be appended. 
     */
    insertTo(parent) {
        parent.appendChild(this.#element);
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
     * Sets the data-* id of the face element.
     * @param {number} id - The face id.
     * @param {string} name - The data-* name. 
     */
    setDataId(id, name) {
        this.#dataId = id;
        this.#element.setAttribute(`data-${name}`, `${id}`);
    }

    /**
     * Resets the **`data-face`** attribute of the **`element`**.
     */
    reset() {
        this.#dataId = this.#id;
        this.#element.setAttribute(`data-face`, `${this.#id}`);
    }

    /**
     * Sets CSS styles on a given HTML element.
     * It merges the provided "styles" object into the element's style property.
     * @param {object} styles - An object where keys are CSS properties (camelCase) and values are their corresponding values.
     */
    setElementStyle(styles) {
        Object.assign(this.#element.style, styles);
    }

    /**
     * Sets the content of the **`element`**
     * @param {string} text - The content to add.
     */
    setTextContent(text) {
        this.#element.textContent = text;
    }
}