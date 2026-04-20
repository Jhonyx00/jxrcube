/**
 * Represents a dialog on the screen, width dialog cards and close/open buttons.
 */
class Dialog {
    /**
     * The parent element.
     * @type {HTMLElement|null}
     */
    #element = null;

    /**
     * The close button.
     * @type {HTMLElement|null}
     */
    #closeBtn = null;

    /**
     * The open button.
     * @type {HTMLElement|null}
     */
    #openBtn = null;

    /**
     * The container where the content is rendered.
     * @type {HTMLElement|null}
     */
    #contentContainer = null;

    /**
     * Constructs a new dialog.
     * @param {DialogData} dialogData
     * @param {Object.<string, string[]>} dialogData.options - The dialog options.
     * @param {DialogCard[]} dialogData.content - The dialog content.
     * @param {HTMLElement} dialogData.parent - The parent element where the dialog will render.
     * @param {string[]} dialogData.openDialogBtnClassList - The open button class list.
     */
    constructor({ options, content, parent, openDialogBtnClassList }) {
        this.#element = document.createElement("div");
        this.#element.classList.add("dialog", "hidden");

        this.#contentContainer = document.createElement("div");
        this.#contentContainer.classList.add("content-container", "scroll");

        this.#closeBtn = document.createElement("button");
        this.#closeBtn.classList.add("btn", "close-dialog-btn");
        this.#closeBtn.addEventListener("click", this.#close.bind(this));

        this.#openBtn = document.createElement("button");
        this.#openBtn.id = "open-dialog-btn";

        this.#element.classList.add(...options.classList ?? []);

        this.#openBtn.classList.add("btn", "open-dialog-btn", "bg-btn", "rounded-btn", ...openDialogBtnClassList);
        this.#openBtn.addEventListener("click", this.#open.bind(this));

        content.forEach((item) => {
            const contentElement = document.createElement("div");
            contentElement.classList.add("content");

            const header = document.createElement("h2");
            header.classList.add("title");
            header.textContent = item.title;

            const description = document.createElement("p");
            description.innerHTML = item.description;

            contentElement.appendChild(header);
            contentElement.appendChild(description);

            this.#contentContainer.appendChild(contentElement);
        });

        this.#element.appendChild(this.#closeBtn);
        this.#element.appendChild(this.#contentContainer);

        parent.appendChild(this.#openBtn);
        parent.appendChild(this.#element);

        this.#element.addEventListener("wheel", this.#onDialogWheel.bind(this), { passive: false });
    }

    /**
     * Handles dialog element wheel event.
     * Prevents the wheel event from propagating beyond the dialog.
     * @param {WheelEvent} e - The wheel event object. 
     */
    #onDialogWheel(e) {
        e.stopPropagation();
        if (e.ctrlKey) { e.preventDefault(); }
    }

    /**
     * Opens the dialog by removing the className "hidden".
     */
    #open() {
        this.#element.classList.remove("hidden");
    }

    /**
     * Closes the dialog by adding the className "hidden".
     */
    #close() {
        this.#element.classList.add("hidden");
    }
}