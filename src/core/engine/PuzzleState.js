/**
 * Represents a puzzle interaction state.
 * @classdesc This class stores the position value of the DOM events including mouse, pointer, or touch event. It also stores the state of the keyup and keydown events.
 */
class PuzzleState {
    /**
     * The coordinates where the pointer, mouse or touch began.
     * @type {object}
     */
    #dragStart;

    /**
     * The pointer, mouse or touch coordinates during movement.
     * @type {object}
     */
    #dragMove;

    /**
     * Whether a keyboard key is pressed to prevent rapid input.
     * @type {boolean}
     */
    #isKeyPressed;

    /**
     * Whether a the "Shift" key is pressed for modified inputs (e.g., inverse moves).
     * @type {boolean}
     */
    #isShiftPressed;

    /**
     * The interaction mode (e.g., sliceDrag).
     * @type {string}
     */
    #interactionType; // Stores the interaction mode.

    /**
     * Whether a keyboard key is pressed to prevent rapid input.
     * @type {Scene}
     */
    #scene = null;

    #dragDelta = { x: 0, y: 0 };

    #sliceDragPoint = { x: 0, y: 0 };

    /**
     * Constructs a puzzle state manager.
     * @param {Scene} element - The Scene instance to lock or unlock the puzzle. 
     */
    constructor(element) {
        this.#dragStart = { x: 0, y: 0 };
        this.#dragMove = { x: 0, y: 0 };
        this.#isKeyPressed = false;
        this.#isShiftPressed = false;
        this.#interactionType = "IDLE";
        this.#scene = element;
    }

    get dragStart() {
        return this.#dragStart;
    }

    get dragMove() {
        return this.#dragMove;
    }

    get isKeyPressed() {
        return this.#isKeyPressed;
    }

    get isShiftPressed() {
        return this.#isShiftPressed;
    }

    get interactionType() {
        return this.#interactionType;
    }

    get sliceDragPoint() {
        return this.#sliceDragPoint;
    }

    get dragDelta() {
        return this.#dragDelta;
    }

    set isKeyPressed(isKeyPressed) {
        this.#isKeyPressed = isKeyPressed;
    }

    set isShiftPressed(isShiftPressed) {
        this.#isShiftPressed = isShiftPressed;
    }

    set interactionType(interactionType) {
        this.#interactionType = interactionType;
    }

    /**
     * Locks the current puzzle by adding the class "locked".
     */
    lock() {
        this.#scene.classList.add("locked");
    }

    /**
     * Unlocks the current puzzle by removing the class "locked".
     */
    unlock() {
        this.#scene.classList.remove("locked");
    }

    /**
     * Inits the coordinate where the pointer, mouse or touch starts.
     */
    initDragState() {
        this.#dragStart.x = this.#sliceDragPoint.x;
        this.#dragStart.y = this.#sliceDragPoint.y;
        this.#dragMove.x = this.#sliceDragPoint.x;
        this.#dragMove.y = this.#sliceDragPoint.y;
    }

    /**
     * Updates the drag move to the slice drag point value.
     */
    updateDragMove() {
        this.#dragMove.x = this.#sliceDragPoint.x;
        this.#dragMove.y = this.#sliceDragPoint.y;
    }

    /**
     * Gets event position based on the mouse, pointer, or touch event.
     * @param {Event} e - The event.
     */
    setSliceDragPoint(e) {
        if (e.changedTouches) {
            this.#sliceDragPoint.x = e.changedTouches[0].clientX;
            this.#sliceDragPoint.y = e.changedTouches[0].clientY;
        }
        else if (e.touches) {
            this.#sliceDragPoint.x = e.touches[0].clientX;
            this.#sliceDragPoint.y = e.touches[0].clientY;
        }
        else {
            this.#sliceDragPoint.x = e.clientX;
            this.#sliceDragPoint.y = e.clientY;
        }
    }
}