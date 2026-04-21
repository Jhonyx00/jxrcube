/**
 * Controlls all the mouse, touch or pointer interactions to control the puzzle.
 */
class PuzzleController {

    /**
     * The puzzle interaction state.
     * @type {PuzzleState|null}
     */
    #puzzleState = null;

    /**
     * The puzzle manager.
     * @type {PuzzleManager|null}
     */
    #puzzleManager = null;

    /**
     * A callback that excecutes once the document content is loaded. 
     * @type {function():void|null}
     */
    #onDOMContentLoadedCallback = null;

    /**
     * Constructs a new puzzle controller.
     * @param {PuzzleState} puzzleState - A puzzleSate instance.
     * @param {PuzzleManager} puzzleManager - A puzzleManager instance.
     * @param {function():void} onDOMContentLoadedCallback - A callback to execute once the app is up.
     */
    constructor(puzzleState, puzzleManager, onDOMContentLoadedCallback) {
        this.#onDOMContentLoadedCallback = onDOMContentLoadedCallback;
        this.#puzzleState = puzzleState;
        this.#puzzleManager = puzzleManager;
        this.#initListeners();
    }

    #onDOMContentLoaded() {
        this.#puzzleManager.init();
        this.#onDOMContentLoadedCallback();
        this.initAnimation();
    }

    async initAnimation() {
        this.#puzzleState.lock();
        await this.#puzzleManager.initIntroAnimation();
        this.#puzzleState.unlock();
    }

    /**
     * Handles the global wheel event.
     * Prevents the default browser behavior for mouse wheel scroll.
     * @param {WheelEvent} e - The wheel event object. 
     */
    #onDocumentWheel(e) {
        e.preventDefault();
        if (this.#puzzleState.interactionType === "sliceDrag") return;
        const wheelDelta = e.deltaY < 0 ? -100 : 100;
        if (e.ctrlKey) {
            this.#puzzleManager.updateMatrixFromDelta(wheelDelta, 0);
        }
        else {
            this.#puzzleManager.updateMatrixFromDelta(0, wheelDelta);
        }
        this.#puzzleManager.setGlobalMatrix();
    }

    /**
     * Process puzzle moves based on specific notation keys pressed by the user.
     * It checks for the Shift key to apply inverse moves and then performs the corresponding action.
     * @param {string} moveCode - The upercase string representation of pressed key (e.g., "R", "U"). 
     */
    #handleMoveKey(moveCode) {
        if (!DEFAULT_MOVES[moveCode]) return;
        const move = this.#puzzleState.isShiftPressed === true ? `${moveCode}'` : moveCode;
        this.#puzzleManager.turnSliceByCommand(move);
        this.#puzzleState.isKeyPressed = true;
    }

    /**
     * Handles the keydown event for puzzle controls.
     * Prevents default browser behavior for key press, manage the Shift key state.
     * Process arrow key, notation inputs.
     * @param {KeyboardEvent} e - The keyboard event object. 
     */
    #onDocumentKeydown(e) {
        if (this.#puzzleState.isKeyPressed) return;
        const movekey = e.key.toUpperCase();
        if (e.shiftKey) {
            this.#puzzleState.isShiftPressed = true;
        }
        this.#handleMoveKey(movekey);
    }

    /**
     * Handles the keyup event to manage key press states.
     * It detects when Shift key is released and resets the general key pressed flag.
     * @param {KeyboardEvent} e - The keyboard event object. 
     */
    #onDocumentKeyUp(e) {
        if (e.shiftKey) { this.#puzzleState.isShiftPressed = false; }
        this.#puzzleState.isKeyPressed = false;
    }

    /**
     * Handles the context menu event.
     * @param {PointerEvent} e - The pointer event object.
     */
    #onDocumentContextMenu(e) {
        e.preventDefault();
    }

    /**
     * Handles the document pointer or touch event, which initiates interactions such as menu operations and preparing for puzzle dragging|rotation.
     * It identifies the selected element and performs asociated menu actions.
     * @param {PointerEvent|TouchEvent} e - The pointer or touch event object. 
     */
    #onDocumentDragStart(e) {
        const element = e.target;
        this.#puzzleState.initDragState();
        this.#puzzleState.setSliceDragPoint(e);

        if (element.classList.contains("face")) {
            this.#puzzleState.interactionType = "sliceDrag";
            this.#puzzleManager.selectCubelet(element);
        }
        else if (element.classList.contains("scene") || element.classList.contains("body")) {
            this.#puzzleState.interactionType = "globalDrag";
        }
    }

    /**
     * Handles document pointer or touch move event, primarily for rotating the puzzle viewer.
     * It updates the global state with the current pointer position and if dragging, calculates the pointer delta to perform a visual rotation. 
     * @param {PointerEvent|TouchEvent} e - The pointer or touch event object. 
     */
    #onDocumentDragMove(e) {
        this.#puzzleState.setSliceDragPoint(e);
        const sliceDragPoint = this.#puzzleState.sliceDragPoint;

        if (this.#puzzleState.interactionType === "sliceDrag") {
            const dragStart = this.#puzzleState.dragStart;
            const dx = sliceDragPoint.x - dragStart.x;
            const dy = sliceDragPoint.y - dragStart.y;
            this.#puzzleManager.dragSlice(dx, dy);
        }
        else if (this.#puzzleState.interactionType === "globalDrag") {
            const dragMove = this.#puzzleState.dragMove;
            const dx = sliceDragPoint.x - dragMove.x;
            const dy = sliceDragPoint.y - dragMove.y;
            this.#puzzleManager.updateMatrixFromDelta(dx, dy);
        }

        this.#puzzleState.updateDragMove();
    }

    /**
     * Handles the end of a drag interaction on the document.
     * Dispatches the final action based on whether a slice or the entire active puzzle was being rotated. 
     */
    #onDocumentDragEnd() {
        if (this.#puzzleState.interactionType === "sliceDrag") {
            this.#puzzleManager.onSliceDrop();
        }
        else if (this.#puzzleState.interactionType === "globalDrag") {
            this.#puzzleManager.setGlobalMatrix();
        }
        this.#puzzleState.interactionType = "IDLE";
    }

    /**
     * Init the document event listeners needed by the puzzle to work.
     */
    #initListeners() {
        document.addEventListener("DOMContentLoaded", this.#onDOMContentLoaded.bind(this));
        document.addEventListener("keyup", this.#onDocumentKeyUp.bind(this));
        document.addEventListener("keydown", this.#onDocumentKeydown.bind(this));
        document.addEventListener("touchend", this.#onDocumentDragEnd.bind(this));
        document.addEventListener("pointerup", this.#onDocumentDragEnd.bind(this));
        document.addEventListener("touchmove", this.#onDocumentDragMove.bind(this));
        document.addEventListener("touchstart", this.#onDocumentDragStart.bind(this));
        document.addEventListener("pointermove", this.#onDocumentDragMove.bind(this));
        document.addEventListener("pointerdown", this.#onDocumentDragStart.bind(this));
        document.addEventListener("contextmenu", this.#onDocumentContextMenu.bind(this));
        document.addEventListener("wheel", this.#onDocumentWheel.bind(this), { passive: false });
    }
}