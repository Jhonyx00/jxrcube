/**
 * Represents a sign face of a sign 3d. 
 */
class SignFace {
    /**
     * The element for the sign face.
     * @type {HTMLDivElement}
     */
    #element = null;

    /**
     * The rotation around the **X-axis**.
     */
    #rx = 0;
    /**
     * The rotation around the **Y-axis**.
     */
    #ry = 0;

    /**
     * Constructs a new sign face.
     * @param {number} rx - The rotation around the **X-axis** 
     * @param {number} ry - The rotation around the **Y-axis** 
     * @param {number} tz - The rotation around the **Z-axis** 
     */
    constructor(rx, ry, tz) {
        this.#element = document.createElement("div");
        this.#element.classList.add("sign-face");
        this.#rx = rx;
        this.#ry = ry;
        this.applyTransform(rx, ry, tz);
    }

    get element() {
        return this.#element;
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
     * Applies the 3d transformation of the **`element`**.
     * @param {number} rx - The rotation around the **X-axis** 
     * @param {number} ry - The rotation around the **Y-axis** 
     * @param {number} tz - The position in the **Z-axis**. 
     */
    applyTransform(rx, ry, tz) {
        this.#element.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(${tz}px)`;
    }

    /**
     * Sets the text content of the sign face.
     * @param {string} text - The text content 
     */
    setTextContent(text) {
        this.#element.textContent = text;
    }

    /**
     * Sets the distance of the face relative to its origin.
     * @param {number} tz - The position in the **Z-axis**. 
     */
    setTz(tz) {
        this.#element.style.transform = `rotateX(${this.#rx}deg) rotateY(${this.#ry}deg) translateZ(${tz}px)`;
    }
}