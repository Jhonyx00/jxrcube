/**
 * Represents a button group on the UI.
 */
class ButtonGroup {
    /**
     * The title content for each button title attribute.
     */
    #title = "";

    /**
     * The button instances.
     * @type {Object.<string, Button>}
     */
    #buttons = {};

    /**
     * Whether the button group has mouseover and mouseout events or not.
     */
    #hover = true;

    /**
     * The lement representing the entire button group.
     * @type {HTMLDivElement}
     */
    #element = null;

    /**
     * The button group div element.
     * @type {HTMLDivElement}
     */
    #buttonGroup = null;

    /**
     * The last selected button.
     * @type {Button|null}
     */
    #lastSelected = null;

    /**
     * The title span element.
     * @type {HTMLSpanElement|null}
     */
    #titleElement = null;

    /**
     * The subgroup name.
     */
    #name = "";

    /**
     * Constructs a new button group.
     * @param {ButtonGroupData} data - The button group data.
     */
    constructor(data) {
        const classList = data.classList ?? [];
        const subMenuClassList = data.btnGroupClassList ?? [];

        this.classList = data.classList ?? [];
        this.#hover = data.hover ?? true;

        this.#element = document.createElement("div");
        this.#element.classList.add("sub-menu", ...this.classList, ...classList);

        this.singleSelection = data.singleSelection;

        this.#name = data.name ?? "Button-group";

        this.labelName = this.#capitalize(this.#name);

        this.#title = data.title ?? false;

        this.#buttons = data.buttons ?? {}; // if the receiving objet is a list of buttons.

        this.#buttonGroup = document.createElement("div");

        this.#buttonGroup.classList.add("btn-group", ...subMenuClassList);

        this.#titleElement = document.createElement("span");
        this.#titleElement.classList.add("option-title");

        this.#titleElement.textContent = `${this.#capitalize(data.name)}`;

        this.#element.appendChild(this.#titleElement);
        this.#element.appendChild(this.#buttonGroup);

        this.selectdBtn = null;
        this.isSelected = true;

        if (this.#hover) {
            this.#element.addEventListener("mouseover", this.#handleMouseOver.bind(this));
            this.#element.addEventListener("mouseout", this.#handleMouseOut.bind(this));
        }
    }

    get name() {
        return this.#name;
    }

    get element() {
        return this.#element;
    }

    get buttons() {
        return this.#buttons;
    }

    get titleElement() {
        return this.#titleElement;
    }


    renderButtons(key) {
        this.#buttons[key].forEach(button => {
            this.#buttonGroup.appendChild(button.element);
        });
    }

    renderAll() {
        Object.values(this.#buttons).forEach(button => {
            this.#buttonGroup.appendChild(button.element);
        })
    }

    renderA() {
        Object.values(this.#buttons).forEach(button => {
            this.#buttonGroup.appendChild(button.element);
        })
    }


    replaceButtons(buttons) {
        this.#buttonGroup.replaceChildren();
        buttons.forEach(button => {
            this.#buttonGroup.appendChild(button.element);
        });
    }

    /**
     * Appends the box group main HTML element to a specified parent DOM element.
     * @param {HTMLElement} parent - The DOM element to which the element will be appended. 
     */
    insertTo(parent) {
        parent.appendChild(this.#element);
    }

    selectButton(key) {
        if (this.singleSelection) {
            const selectedBtn = this.#buttons.find(button => button.name === key);
            this.toogleClass("active", selectedBtn, key);
        }
    }

    selectButtonFromSubMenu(key, subMenuKey) {
        if (this.singleSelection) {
            const selectedBtn = this.#buttons[key][subMenuKey];
            this.toogleClass("active", selectedBtn);
        }
    }

    selectFromButtons(groupKey, subMenuKey) {
        if (this.singleSelection) {
            const selectedBtn = this.#buttons[groupKey].find(button => button.name === subMenuKey);
            this.toogleClass("active", selectedBtn);
        }
    }

    toogleClass(className, button) {
        if (!button) return;
        if (this.#lastSelected) {
            this.#lastSelected.element.classList.remove(className);
        }
        button.element.classList.add(className);
        this.#lastSelected = button;
    }

    removeClass(className, button) {
        if (!button) return;
        for (const button of this.#buttons.values()) {
            if (button.element.classList.contains(className)) {
                button.element.classList.remove(className);
            }
        }
    }

    /**
     * Creates a list of buttons and replace the current buttons.
     * @param {ButtonData[]} rawData - The array of button raw data. 
     */
    buildButtons(rawData) {
        /**
         * @type {Button[]}
         */
        const buttons = [];

        rawData.forEach(btn => {
            /** @type {ButtonData} */
            const buttonData = {
                name: btn.name,
                icon: btn.icon,
                callback: btn.callback,
            }

            const button = new Button({
                singleSelection: btn.toggle === false ? true : this.singleSelection,
                data: buttonData,
                title: this.#title,
                classList: btn.classList,
            });
            buttons.push(button);
        });
        this.#buttons = buttons;
    }

    /**
     * Creates a list of buttons and adds it to a sub menu.
     * @param {string} groupKey - A group key.
     * @param {Object.<string, string>} buttonList - A list of button raw data.
     * @param {Object.<string, string>} icons - An object containing the icon URLs.
     * @param {function():void} callback - The callback.
     */
    buildSubButtons(groupKey, buttonList, icons, callback) {
        /**
         * @type {Button[]}
         */
        const buttons = [];
        Object.keys(buttonList).forEach(key => {
            /** @type {ButtonData} */
            const buttonData = {
                name: key,
                icon: icons ? icons[key] : "",
                callback: () => {
                    callback(key);
                    this.selectFromButtons(groupKey, key, this.#name);
                },
            }
            const button = new Button({
                singleSelection: true,
                data: buttonData,
                title: false,
            });
            buttons.push(button);
        });
        this.#buttons[groupKey] = buttons;
    }

    #handleMouseOver(e) {
        this.#titleElement.textContent = `${this.labelName} - ${e.target.dataset.name}`;
        this.#titleElement.classList.add("active");
    }

    #handleMouseOut() {
        this.#titleElement.textContent = `${this.labelName}`;
        this.#titleElement.classList.remove("active");
    }

    #capitalize(text) {
        return `${text.charAt(0).toUpperCase()}${text.slice(1).toLowerCase()}`;
    }
}