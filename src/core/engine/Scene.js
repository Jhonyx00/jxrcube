/**
 * Represents an element where 3d elements will render.
 */
class Scene {
    /**
     * The scene THMLDivElement.
     * @type {HTMLElement}
     */
    #element = null;

    /**
     * Constructs a new scene.
     * @param {HTMLElement} parent - The HTML element where 3d elements will render. 
     */
    constructor(parent) {
        this.#element = document.createElement("div");
        this.#element.id = "scene";
        this.#element.classList.add("scene");
        parent.appendChild(this.#element);
    }

    get element() {
        return this.#element;
    }
}