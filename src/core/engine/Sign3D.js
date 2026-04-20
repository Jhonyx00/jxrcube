/**
 * Represents a sign 3d in the 3d space.
 */
class Sign3D {
    /**
     * The sign faces of the sign 3d.
     * @type {SignFace[]}
     */
    #faces = {};

    /**
     * The element of the sign 3d.
     */
    #element = document.createElement("div");

    /**
     * The data for each sign face.
     * @type {Object.<string, string>}
     */
    #data = {};

    /**
     * Constructs a new sign 3d.
     * @param {Sign3DConfig} config - The sign 3d config.
     * @param {Object.<string, string>} config.data - The data for each sign face.
     * @param {HTMLDivElement} config.parent - The parent element where the sign will be appended.
     * @param {number} config.tz - The distance of the face relative to its origin.
     */
    constructor({ data, parent, tz }) {
        this.#element.classList.add("sign-3d");
        this.isVisible = false;

        const facesProps = {
            0: { rx: 0, ry: 0 },
            1: { rx: 90, ry: 0 },
            2: { rx: 0, ry: 90 },
            3: { rx: 0, ry: 180 },
            4: { rx: 0, ry: -90 },
            5: { rx: -90, ry: 0 },
        };

        for (let i = 0; i < 6; i++) {
            const faceProp = facesProps[i];
            const signFace = new SignFace(faceProp.rx, faceProp.ry, 0);
            signFace.setDataAttr("face", i);
            signFace.setTz(tz)
            this.#faces[i] = signFace;
            this.#element.appendChild(signFace.element);
        }

        this.#data = data;
        parent.appendChild(this.#element);
    }

    /**
     * Adds the given class to the element's calssList.
     * @param {string} className - The class to add.
     */
    addClass(className) {
        this.#element.classList.add(className);
    }

    /**
     * Removes the given class from the element's calssList.
     * @param {string} className - The class to remove. 
     */
    removeClass(className) {
        this.#element.classList.remove(className);
    }

    /**
     * Adds the text content for each sign face.
     */
    addLabels() {
        Object.values(this.#faces).forEach((face, index) => face.setTextContent(this.#data[index]));
    }

    /**
     * Removes the text content of each sign face.
     */
    removeLabels() {
        Object.values(this.#faces).forEach(face => face.setTextContent(""));
    }
}