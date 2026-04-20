/**
 * Represents a menu.
 */
class Menu {
    /**
     * Whether the menu is open or not.
     */
    #isOpen = true;

    /**
     * The bottom part of the menu. 
     * @type {HTMLElement|null}
     */
    #menuSection = null;

    /**
     * The menu itself.
     * @type {HTMLElement|null}
     */
    #element = null;

    /**
     * The close btn.
     * @type {HTMLButtonElement}
     */
    #closeBtn = null;

    /**
     * An object containing the menu sections and its corresponding ButtonGroup instance.
     * @type {Object.<string, ButtonGroup>}
     */
    #buttonGroup = {};

    /**
     * constructs a new menu.
     * @param {Object} data - The menu data.
     * @param {ButtonGroupData} data.buttonGroupOptions - The button groups.
     * @param {Object} data.config - The menu config.
     * @param {Object} data.parent- The parent element where the menu will appear.
     */
    constructor({ config, buttonGroupOptions, parent }) {
        const className = config.className || "menu";
        const closeBtnConfigClassList = config.closeBtnClassList;

        this.#element = document.createElement("nav");
        this.#element.classList.add(className);

        this.#menuSection = document.createElement("div");
        this.#menuSection.classList.add("menu-section", "scroll");

        this.#closeBtn = document.createElement("button");
        this.#closeBtn.classList.add("icon-btn", "btn", "close-menu-icon", ...closeBtnConfigClassList);

        this.#element.appendChild(this.#closeBtn);

        if (buttonGroupOptions) {
            this.setButtonGroupsData(buttonGroupOptions);
        }

        this.#element.appendChild(this.#menuSection);
        this.#closeBtn.addEventListener("click", this.#handleBtnClick.bind(this));

        parent.appendChild(this.#element);
    }

    /**
     * Sets the button group data.
     * @param {ButtonGroupData} buttonDataGroup - The button group data.
     */
    setButtonGroupsData(buttonDataGroup) {
        buttonDataGroup.forEach(buttonGroupData => {
            const buttonGroup = new ButtonGroup(buttonGroupData);
            this.#menuSection.appendChild(buttonGroup.element);
            this.#buttonGroup[buttonGroup.name] = buttonGroup;
        });
    }

    /**
     * Selects the current sub menu buttons that were previuosly selected. 
     * @param {string} submenuName - The sub menu name. 
     * @param {Object.<string, boolean>} options - The sub menu options.
     */
    setSubMenuMultipleSelection(submenuName, options) {
        const subMenu = this.#buttonGroup[submenuName];
        Object.entries(options).forEach(([key, item]) => {
            if (item) {
                const selectedButton = subMenu.buttons.find(c => c.name === key);
                selectedButton.toggleSelect();
            }
        });
    }

    /**
     * Builds a sub menu.
     * @param {SubMenuOptions} subMenuOptions - The sub menu options. 
     * @param {string} subMenuOptions.key - The primary key.
     * @param {string} subMenuOptions.subMenuKey - The sub menu key.
     * @param {Object.<string, string>} subMenuOptions.list - The items list.
     * @param {Object.<string, string>} subMenuOptions.icons - The icons list.
     * @param {function(string):void} csubMenuOptions.allback - The callback.
     */
    buildSubButtons({ key, subMenuKey, list, icons, callback }) {
        this.#buttonGroup[subMenuKey].buildSubButtons(key, list, icons, callback);
    }

    /**
     * Creates a button group.
     * @param {Object} data - An object containing the button group data.
     * @param {string} data.name - The name of the button group.
     * @param {Object[]} data.rawData - The array containing the buttons raw data. 
     *  
     */
    buildButtons({ name, rawData }) {
        this.#buttonGroup[name].buildButtons(rawData);
    }

    selectButton(groupName, name) {
        this.#buttonGroup[name].selectButton(groupName);
    }

    selectButtonFromSubMenu(groupName, name) {
        this.#buttonGroup[name].selectButtonFromSubMenu(groupName);
    }

    selectFromButtons(groupName, subMenuKey, key) {
        this.#buttonGroup[subMenuKey].selectFromButtons(groupName, key);
    }

    /**
     * Resets the sub menu selection.
     * @param {string} subMenuKey - The sub menu key. 
     */
    resetSubMenuSelection(subMenuKey) {
        const submenu = this.#buttonGroup[subMenuKey];
        Object.values(submenu.buttons).forEach(button => {
            button.deselect();
        });
    }

    /**
     * Applies an "fade-in" animation to the current element.
     * @param {object} options - An object containing the delay and duration of the animation.
     * @property {number} options.delay - The animation delay.
     * @property {number} dimension.duration - The animation duration.
     */
    fadeIn(options) {
        this.#element.style.opacity = 0;
        this.#element.classList.add("hidden");

        const delay = options.delay;
        const duration = options.duration;

        let start = null;
        const animationFrame = (timestamp) => {
            if (start === null) start = timestamp;
            let t = (timestamp - start) / delay;
            if (t < 1) {
                requestAnimationFrame(animationFrame);
            }
            else {
                let transitionStart = null;
                this.#element.classList.remove("hidden");
                const transitionFrame = (timestamp) => {
                    if (transitionStart === null) transitionStart = timestamp;
                    let t2 = ((timestamp - transitionStart) / duration);
                    if (t2 > 1) t2 = 1;
                    this.#element.style.opacity = t2;
                    if (t2 < 1) {
                        requestAnimationFrame(transitionFrame);
                    }
                    else {
                        this.#element.removeAttribute("style");
                    }
                }
                requestAnimationFrame(transitionFrame);
            }
        }
        requestAnimationFrame(animationFrame);
    }

    /**
     * Replaces the current buttons with the new buttons from the selected button group.
     * @param {String} subMenuKey -  The sub menu key. 
     * @param {string} key - The primary key.
     */
    replaceButtons(subMenuKey, key) {
        const buttons = this.#buttonGroup[subMenuKey].buttons[key];
        this.#buttonGroup[subMenuKey].replaceButtons(buttons);
    }

    addClass(className) {
        this.#element.classList.add(className);
    }

    removeClass(className) {
        this.#element.classList.remove(className);
    }

    renderGlobalButtons(key) {
        this.#buttonGroup[key].renderAll();
    }

    /**
     * Renders the selected buttons.
     * @param {string} subMenuKey - The sub menu key.
     * @param {string} key - The primary key.
     */
    renderSelectedButtons(subMenuKey, key) {
        this.#buttonGroup[key].renderButtons(subMenuKey);
    }

    #handleBtnClick() {
        if (!this.#isOpen) {
            this.#closeBtn.classList.add("close-menu-icon");
            this.#closeBtn.classList.remove("open-menu-icon");
            this.#menuSection.classList.remove("hidden");
            this.#closeBtn.classList.remove("bottom")
        }
        else {
            this.#closeBtn.classList.remove("close-menu-icon");
            this.#closeBtn.classList.add("open-menu-icon");
            this.#menuSection.classList.add("hidden");
            this.#closeBtn.classList.add("bottom")
        }
        this.#isOpen = !this.#isOpen;
    }
}