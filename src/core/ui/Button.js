/**
 * Represents a button on the UI.
 */
class Button {
    /**
     * The name of the button.
     */
    #name = "";

    /**
     * The button HTML element.
     * @type {HTMLButtonElement|null}
     */
    #element = null;

    /**
     * The callback that executes once the button is pressed.
     */
    #callback = null;

    /**
     * Wheter the button is selected or not.
     */
    #isSelected = false;

    /**
     * Wheter the button has radio button behavior.
     */
    #singleSelection = false;

    /**
     * Constructs a new button.
     * @param {Object} buttonData - The button data
     * @param {boolean} buttonData.singleSelection - Whether the button has radio behavior or not. 
     * @param {ButtonData} buttonData.data - The button raw data.
     * @param {string} buttonData.title - The title attribute.
     * @param {string[]} buttonData.classList - The button class list.
     */
    constructor({ singleSelection = false, data, title, classList }) {
        this.#element = document.createElement("button");

        if (classList) {
            this.addClassList(classList);
        }

        this.addClass("btn");

        this.#name = data.name;

        this.#element.setAttribute(`data-name`, `${data.name}`);

        this.#callback = data.callback;
        this.#singleSelection = singleSelection;

        if (title) { this.#element.title = data.name; }

        if (data.icon) {
            this.addClass("icon-btn");
            this.#element.style.backgroundImage = `url(${data.icon})`;
        }
        else {
            this.addClass("text-btn");
            this.#element.textContent = `${this.#capitalize(data.name)}`;
        }

        this.#isSelected = false;

        this.#element.addEventListener("click", this.#onClick.bind(this));

        Object.seal(this);
    }

    get name() {
        return this.#name;
    }

    get element() {
        return this.#element;
    }

    /**
     * Selects the button by adding "active" class name.
     */
    toggleSelect() {
        !this.#isSelected ? this.addClass("active") : this.removeClass("active");
        this.#toggleIsSelected();
    }

    /**
     * Deselects the button bt removing the "active" class name.
     */
    deselect() {
        this.removeClass("active");
        this.#isSelected = false;
    }

    /**
     * Appends the box group main HTML element to a specified parent DOM element.
     * @param {HTMLElement} parent - The DOM element to which the element will be appended. 
     */
    insertTo(parent) {
        parent.appendChild(this.#element);
    }

    /**
     * Adds a class name to the HTMLButtonElement.
     * @param {string} className - The element class name. 
     */
    addClass(className) {
        this.#element.classList.add(className);
    }

    /**
     * Adds a list of class names to the HTMLButtonElement.
     * @param {string[]} classList - The element class list.
     */
    addClassList(classList) {
        this.#element.classList.add(...classList);
    }

    /**
     * Removes a class name.
     * @param {string} className - The class name. 
     */
    removeClass(className) {
        this.#element.classList.remove(className);
    }

    /**
     * Transforms the first letter of the text in uppercase.
     * @param {string} text - The text to transform. 
     * @returns {string} The transformed text.
     */
    #capitalize(text) {
        return `${text.charAt(0).toUpperCase()}${text.slice(1).toLowerCase()}`;
    }

    /**
     * Handles the button click selection.
     */
    #onClick() {
        if (!this.#singleSelection === true) { this.toggleSelect(); }
        if (this.#callback) { this.#callback(); }
    }

    /**
     * Toggles the "isSelected" bollean flag.
     */
    #toggleIsSelected() {
        this.#isSelected = !this.#isSelected;
    }
}