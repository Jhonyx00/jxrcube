/**
 * Represents the brain of the puzzle. 
 */
// Made by:
// @author: Jhonatan Reyes

class Puzzle {
    /**
     * The curent state. 
     * @type {Object.<string, CubeletState>}
    */
    #state = {};

    #movingAngle = 0;

    #initialDirection = 0;

    // Boolean flags
    #isTurning = false;
    #isMoveValid = false;
    #isScrambling = false;
    #canRotateSlice = true;
    #isFreeRotating = false;
    #areFaceLabelsActive = false;
    #areNumericalLabelsActive = false;
    #areDirectionalLabelsActive = false;

    /**
     * The callback that executes after a turn is made.
     * @type {function():void|null}
     */
    #onSliceTurnCompleteCallback = null;

    /**
     * An array containg all the cubelets.
     * @type {Box3D[]}
    */
    #cubelets = [];

    // Moves
    #initialMove = "";

    #currentAxis = "";

    #currentMove = "";

    #invertedMove = "";

    /**
     * A list of possible moves of the puzzle.
     * @type {Object.<string, stringnull}
     */
    #moveKeys = null;

    /**
     * A container 3d instance where the puzzle pieces will be rendered.
     * @type {Container3D|null}
     */
    #container = null;

    /**
     * The sign 3d where the face labels are displayed.
     * @type {Sign3D|null}
     */
    #sign3D = null;

    /**
     * The selected cubelet face element.
     * @type {HTMLDivElement|null}
     */
    #selectedCubeletFace = null;

    /**
     * An array containing all the puzzle piece raw data.
     * @type {CubeletRawData[]|null}
     */
    #cubeletsData = null;

    /**
     * A Box3D array containing the current slice pieces.
     * @type {Box3D[]|null}
     */
    #sliceCubelets = null;

    /**
     * The HTML div element representing a selected cubelet. 
     * @type {Box3D|null}
     */
    #selectedCubelet = null;

    /**
     * An object containing the pointer projection point (x, y).
     * @type {Coordinate}
     */
    #projectionPoint = { x: 0, y: 0 };

    /**
     * A matrix that represents dynamic transormations.
     * @type {Matrix3D}
     */
    #projectionMatrix = new Matrix3D();

    /**
     * Represents dynamic data for dynamic transormations.
     * @type {Float32Array<number>}
     */
    #dynamicMatrixData = new Float32Array(16);

    /**
     * Constructs a new puzzle brain.
     * @param {PuzzleData} data - The puzzle data.
     * @param {PuzzleConfig} config - The puzzle config.
     */
    constructor(data, config) {
        // base
        this.name = data.name;
        this.order = data.order;
        this.offset = data.offset;
        this.indexToAxis = data.indexToAxis;
        this.positionMap = data.positionMap;
        this.cubeletOptions = data.cubeletOptions;

        // config
        this.coreData = config.coreData;
        this.cubeletSize = config.cubeletSize;
        this.appearanceNames = config.appearanceNames;
        this.maxPositionFactor = config.maxPositionFactor;
        this.signExpansionFactor = config.signExpansionFactor;

        this.displayedCubelets = "all";
        this.#moveKeys = Object.keys(this.moves);
    }

    /**
     * The minimum number of pixels to consider a slice drag.
     */
    static #THRESHOLD = 5;

    /**
     * The minimum angle to consider a slice drag.
     */
    static #TURN_ANGLE = 90;

    /**
     * The maximum number of legal turns.
     */
    static #MAXIMUM_TURN_COUNT = 4;

    /**
     * The possible axes.
     * @type {Object.<string, string>}
     */
    static #AXES = { x: "x", y: "y" };

    /**
     * The transition durations for each action in the puzzle.
     * @type {Object.<string, number>}
     */
    static #TRANSITION_DURATIONS = {
        TURN: 400,
        SCRAMBLE: 600,
        AUTO_ALIGN: 150,
    }

    /**
     * Maps the selected face and active drag axis to the corresponding translation index (X: 12, Y: 13, Z: 14) in the 4x4 matrix.
     * @type {Object.<string, Coordinate>} 
     */
    static #FACE_TO_TRANSLATION_INDICES = {
        0: { x: 12, y: 13 },
        1: { x: 14, y: 12 },
        2: { x: 14, y: 13 },
        3: { x: 12, y: 13 },
        4: { x: 14, y: 13 },
        5: { x: 14, y: 12 },
    }

    /**
     * The normal vectors for each face of the puzzle.
     * @type {Object.<string, CoordVector>}
     */
    static #FACE_NORMAL_VECTORS = Object.freeze({
        0: { x: Vector3D.UP, y: Vector3D.RIGHT },
        1: { x: Vector3D.RIGHT, y: Vector3D.FRONT },
        2: { x: Vector3D.UP, y: Vector3D.BACK },
        3: { x: Vector3D.UP, y: Vector3D.RIGHT },
        4: { x: Vector3D.UP, y: Vector3D.FRONT },
        5: { x: Vector3D.RIGHT, y: Vector3D.FRONT },
    });

    /**
     * The face id exchange map for each move of the puzzle.
     * @type {Object.<string, Object.<string, number>>}
     */
    static #FACE_ID_EXCHANGE_MAP = {
        // CW External layers
        "U": { 2: 0, 3: 2, 0: 4, 4: 3, 5: 5, 1: 1 },
        "F": { 1: 2, 2: 5, 5: 4, 4: 1, 0: 0, 3: 3 },
        "B": { 1: 4, 4: 5, 5: 2, 2: 1, 0: 0, 3: 3 },
        "R": { 5: 0, 0: 1, 1: 3, 3: 5, 2: 2, 4: 4 },
        "L": { 0: 5, 1: 0, 3: 1, 5: 3, 2: 2, 4: 4 },
        "D": { 0: 2, 2: 3, 3: 4, 4: 0, 1: 1, 5: 5 },
        "M": { 0: 5, 5: 3, 3: 1, 1: 0, 2: 2, 4: 4 },
        "E": { 0: 2, 2: 3, 3: 4, 4: 0, 1: 1, 5: 5 },
        "S": { 1: 2, 2: 5, 5: 4, 4: 1, 0: 0, 3: 3 },

        // CW Internal layers
        "u": { 2: 0, 3: 2, 0: 4, 4: 3, 5: 5, 1: 1 },
        "f": { 1: 2, 2: 5, 5: 4, 4: 1, 0: 0, 3: 3 },
        "b": { 1: 4, 4: 5, 5: 2, 2: 1, 0: 0, 3: 3 },
        "r": { 5: 0, 0: 1, 1: 3, 3: 5, 2: 2, 4: 4 },
        "l": { 0: 5, 1: 0, 3: 1, 5: 3, 2: 2, 4: 4 },
        "d": { 0: 2, 2: 3, 3: 4, 4: 0, 1: 1, 5: 5 },

        // CCW External layers
        "U'": { 0: 2, 2: 3, 3: 4, 4: 0, 1: 1, 5: 5 },
        "F'": { 1: 4, 4: 5, 5: 2, 2: 1, 0: 0, 3: 3 },
        "B'": { 1: 2, 2: 5, 5: 4, 4: 1, 0: 0, 3: 3 },
        "R'": { 0: 5, 5: 3, 3: 1, 1: 0, 2: 2, 4: 4 },
        "L'": { 0: 1, 1: 3, 3: 5, 5: 0, 2: 2, 4: 4 },
        "D'": { 2: 0, 3: 2, 0: 4, 4: 3, 5: 5, 1: 1 },
        "M'": { 5: 0, 0: 1, 1: 3, 3: 5, 2: 2, 4: 4 },
        "E'": { 2: 0, 3: 2, 0: 4, 4: 3, 5: 5, 1: 1 },
        "S'": { 1: 4, 4: 5, 5: 2, 2: 1, 0: 0, 3: 3 },

        // CCW Internal layers
        "u'": { 0: 2, 2: 3, 3: 4, 4: 0, 1: 1, 5: 5 },
        "f'": { 1: 4, 4: 5, 5: 2, 2: 1, 0: 0, 3: 3 },
        "b'": { 1: 2, 2: 5, 5: 4, 4: 1, 0: 0, 3: 3 },
        "r'": { 0: 5, 5: 3, 3: 1, 1: 0, 2: 2, 4: 4 },
        "l'": { 0: 1, 1: 3, 3: 5, 5: 0, 2: 2, 4: 4 },
        "d'": { 2: 0, 3: 2, 0: 4, 4: 3, 5: 5, 1: 1 },

        // External doubles
        "U2": { 0: 3, 1: 1, 2: 4, 3: 0, 4: 2, 5: 5 },
        "F2": { 1: 5, 2: 4, 4: 2, 5: 1, 0: 0, 3: 3 },
        "B2": { 1: 5, 2: 4, 4: 2, 5: 1, 0: 0, 3: 3 },
        "R2": { 0: 3, 1: 5, 3: 0, 5: 1, 2: 2, 4: 4 },
        "L2": { 0: 3, 1: 5, 3: 0, 5: 1, 2: 2, 4: 4 },
        "D2": { 0: 3, 2: 4, 3: 0, 4: 2, 1: 1, 5: 5 },
        "M2": { 0: 3, 1: 5, 3: 0, 5: 1, 2: 2, 4: 4 },
        "E2": { 0: 3, 2: 4, 3: 0, 4: 2, 1: 1, 5: 5 },
        "S2": { 1: 5, 2: 4, 4: 2, 5: 1, 0: 0, 3: 3 },

        // Internal doubles.
        "u2": { 0: 3, 1: 1, 2: 4, 3: 0, 4: 2, 5: 5 },
        "f2": { 1: 5, 2: 4, 4: 2, 5: 1, 0: 0, 3: 3 },
        "b2": { 1: 5, 2: 4, 4: 2, 5: 1, 0: 0, 3: 3 },
        "r2": { 0: 3, 1: 5, 3: 0, 5: 1, 2: 2, 4: 4 },
        "l2": { 0: 3, 1: 5, 3: 0, 5: 1, 2: 2, 4: 4 },
        "d2": { 0: 3, 2: 4, 3: 0, 4: 2, 1: 1, 5: 5 },
    }

    /**
     * Sets the current state.
     */
    set state(state) {
        this.#state = state;
    }

    set cubeletsData(cubeletsData) {
        this.#cubeletsData = cubeletsData;
    }

    /**
     * Set the cubelets data.
     * @param {Box3D[]} cubelets - The cubelets data.
     */
    set cubelets(cubelets) {
        this.#cubelets = cubelets;
    }

    get selectedCubelet() {
        return this.#selectedCubelet;
    }

    get state() { return this.#state };

    get container() { return this.#container; }

    get isScrambling() { return this.#isScrambling; }

    get isFreeRotating() { return this.#isFreeRotating; }

    get areFaceLabelsActive() { return this.#areFaceLabelsActive; }

    get areNumericalLabelsActive() { return this.#areNumericalLabelsActive; }

    get areDirectionalLabelsActive() { return this.#areDirectionalLabelsActive; }

    /**
     * The slices data of the puzzle.
     * @abstract
     */
    slices() {
        throw new Error(`Getter 'slices()' must be implemented by ${this.constructor.name} subclass.`);
    }

    /**
     * The moves map of the puzzle.
     * @abstract
     */
    movesMap() {
        throw new Error(`Getter 'movesMap()' must be implemented by ${this.constructor.name} subclass.`);
    }

    /**
     * The moves of the puzzle (e.g., F).
     * @abstract
     */
    moves() {
        throw new Error(`Getter 'moves()' must be implemented by ${this.constructor.name} subclass.`);
    }

    /**
     * Solves the puzzle by the begginers method.
     * @abstract
     */
    solve() {
        throw new Error(`Method 'solve()' must be implemented by ${this.constructor.name} subclass.`);
    }

    /**
     * Appends the 3D piece main HTML element to a specified parent DOM element.
     * @param {HTMLElement} parent - The DOM element to which the element will be appended. 
     */
    render(parent) {
        this.#container.render(parent);
    }

    /**
     * Sets the container 3d of the instanced puzzle.
     * @param {Container3D} container - A Container3D instance. 
     */
    setContainer(container) {
        if (this.#container) {
            throw new Error("This puzzle already has a container");
        }
        this.#container = container;
    }

    /**
     * Sets the sign 3d of the instanced puzzle.
     * @param {Sign3D} sign3d - A Sign3D instance. 
     */
    setSign3d(sign3d) {
        if (this.#sign3D) {
            throw new Error("This puzzle already has a container");
        }
        this.#sign3D = sign3d;
    }

    /**
     * Gets the filtered cubelets array size.
     * @param {Function} callback - Filter callback.
     * @returns {number} The array length.
     */
    getFilteredCubeletsSize(callback) {
        const array = this.#cubelets.filter(callback);
        return array.length;
    }

    /**
     * Get the cubelets filter callback specified by the move.
     * @param {string} move - The move. 
     * @param {number} translationComponent - The matrix component value of the seleted cubelet.
     * @returns {Function} The filter callback.
     * @override
     */
    getCubeletsCallback(move, translationComponent) {
        return this.slices[move].callback;
    }

    /**
     * Drags a slice given te mouse delta x and mouse delta y.
     * @param {number} deltaX - Mouse delta x.
     * @param {number} deltaY - Mouse delta y.
     */
    dragSlice(deltaX, deltaY) {
        if (!this.#canRotateSlice) return;
        if (!this.#selectedCubelet) return;
        if (this.#isTurning) return;

        const gestureLength = Math.hypot(deltaX, deltaY);

        if (gestureLength < Puzzle.#THRESHOLD) return;

        this.#getProjectionPoint(deltaX, deltaY, gestureLength);

        const direction = this.#currentAxis === Puzzle.#AXES.x ? Math.sign(this.#projectionPoint.x) : Math.sign(this.#projectionPoint.y);

        // The "axis" is selected by the live turn, this allows to lock the axis and therefore the slice (no slice changing while dragging).
        if (!this.#isMoveValid) { // exactly once.
            const currentAxis = Math.abs(this.#projectionPoint.x) > Math.abs(this.#projectionPoint.y) ? Puzzle.#AXES.x : Puzzle.#AXES.y;
            const translationIndex = Puzzle.#FACE_TO_TRANSLATION_INDICES[this.#selectedCubeletFace][currentAxis];
            const translationComponent = this.#selectedCubelet.matrix.data[translationIndex];
            const gridPosition = this.#selectedCubelet.size ? translationComponent / this.cubeletSize : Math.sign(translationComponent);

            this.#initialMove = this.movesMap[this.#selectedCubeletFace][currentAxis][gridPosition][direction];
            const cubeletsCallback = this.getCubeletsCallback(this.#initialMove, translationComponent);

            this.#sliceCubelets = this.#cubelets.filter(cubeletsCallback);
            this.#invertedMove = this.#invertMove(this.#initialMove);

            this.#currentAxis = currentAxis;
            this.#initialDirection = direction;
            this.#isMoveValid = true;
        }

        // mousemove //

        /**
         * Determines the current move based on whether the drag direction matches the initial gesture.
         */
        const currentMove = this.#initialDirection === direction ? this.#initialMove : this.#invertedMove;

        /**
         * Calculates the real-time rotation angle based on the dominant axis and gesture magnitude. 
         */
        const movingAngle = this.#currentAxis === Puzzle.#AXES.x
            ? this.#projectionPoint.x * gestureLength * direction * 0.5
            : this.#projectionPoint.y * gestureLength * direction * 0.5;

        const slice = this.slices[currentMove];
        const projectionMatrix = this.#projectionMatrix;

        this.#sliceCubelets.forEach(cubelet => {
            const matrixCubeletData = cubelet.matrix.data;
            projectionMatrix.projectRotation(this.#dynamicMatrixData, matrixCubeletData, slice.axis, slice.direction * movingAngle);
            cubelet.applyTransformFromMatrix(this.#dynamicMatrixData);
        });

        this.#movingAngle = movingAngle;
        this.#currentMove = currentMove;
    }

    /**
     * Performs an interplation on the slice cubelets.
     */
    onSliceDrop() {
        if (this.#isScrambling) return;
        if (!this.#isMoveValid) return;
        if (!this.#canRotateSlice) return;
        if (!this.#selectedCubeletFace) return;
        this.#interpolateSliceCubeletsMatrix(Puzzle.#TRANSITION_DURATIONS.AUTO_ALIGN);
        this.#canRotateSlice = false;
    }

    /**
     * Turns a slice specified by the keyboard key.
     * @param {string} move - A command from the keyboard to perform a move. 
     */
    turnSliceByCommand(move) {
        if (this.#isScrambling) return;
        if (this.#isMoveValid) return;
        if (this.#isTurning) return;
        this.#performSliceTurn(move, Puzzle.#TRANSITION_DURATIONS.TURN);
    }

    /**
     * Displays the face labels of the puzzle like "Front", "Right", etc.
     */
    displayFaceLabels() {
        if (!this.#areFaceLabelsActive) { this.#sign3D.addLabels(); }
        else { this.#sign3D.removeLabels(); }
        this.#toggleAreFaceLabelsActive();
    }

    /**
     * Creates a random puzzle state from random moves.
     */
    scramble() {
        const sliceTurningDuration = Puzzle.#TRANSITION_DURATIONS.SCRAMBLE;
        const actionFrame = () => {
            if (!this.#isScrambling) return;
            if (this.#isTurning) return;

            const randomNumber = Math.floor(Math.random() * this.#moveKeys.length);
            const randomMove = this.#moveKeys[randomNumber];

            this.#performSliceTurn(randomMove, sliceTurningDuration); // another interpolation.

            let start = null;
            const transitionFrame = (timestamp) => {
                if (start === null) start = timestamp;

                const t = ((timestamp - start) / sliceTurningDuration);
                // delay, 2 is equivalent to 1s of delay.
                if (t < 1.5) { requestAnimationFrame(transitionFrame); }
                else { requestAnimationFrame(actionFrame); }
            }
            requestAnimationFrame(transitionFrame);
        }

        requestAnimationFrame(actionFrame); // init scramble.
        this.#toggleScramble();
    }

    /**
     * Freely rotates the puzzle. 
     */
    rotate() {
        const animationFrame = () => {
            if (!this.#isFreeRotating) return;
            this.#container.rotateSelf(0.1, 0.1);
            requestAnimationFrame(animationFrame);
        }
        requestAnimationFrame(animationFrame);
        this.#toggleIsFreeRotating();
    }

    /**
     * Removes the numerical labels.
     */
    removeLabels() {
        this.#container.setDataAttr("labels", "none");
        this.#cubelets.forEach(cubelet => {
            cubelet.removeTextContent();
        });
    }

    /**
     * Sets the numerical labels state.
     */
    addLabels() {
        this.#container.setDataAttr("labels", "numbers");
        if (this.#areNumericalLabelsActive === false) {
            this.#addNumbers();
        }
        else {
            this.removeLabels();
            this.#toggleAreNumericalLabelsActive();
        }
    }

    /**
     * Sets the directional labels state.
     */
    direction() {
        if (this.#areDirectionalLabelsActive === false) {
            this.#sign3D.addClass("direction");
        }
        else {
            this.#sign3D.removeClass("direction");
        }
        this.#toggleAreDirectionalLabelsActive();
    }

    /**
     * Resets the puzzle state to its default state (solved).
     */
    reset() {
        this.#state = {};
        this.#cubeletsData.forEach(cubelet => {
            const id = cubelet.id;
            const position = cubelet.position;
            const targetCubelet = this.#cubelets[id];
            targetCubelet.matrix.toIdentity();
            targetCubelet.translateSelf(position.x, position.y, position.z);
            targetCubelet.resetFaceIds();
        });
    }

    /**
     * Displays only the specified cubelet type.
     * @param {string} cubeletType - The cubelet type (e.g., corner). 
     */
    displayCubeletType(cubeletType) {
        this.displayedCubelets = cubeletType;
        this.#container.setDataAttr("visible-cubelets", cubeletType);
    }

    /**
     * Sets the selected cubelet and selected cubelet face.
     * @param {HTMLDivElement} element - The clicked element. 
     */
    selectCubelet(element) {
        if (!element) return;
        if (this.#isScrambling) return; // A cubelet can not be selected to start a drag if the cube is scrambling.
        if (this.#isMoveValid) return; // A CUBELET CAN NOT BE SELECTED WHILE TURNING A SLICE (multitouch screens). 
        this.#selectedCubelet = this.#cubelets[element.parentElement?.dataset.boxId];
        this.#selectedCubeletFace = element.dataset?.face;
    }

    /**
     * Register a callback function that will excecute when a slice turn is complete.
     * @param {Function} callback - The callback function.
     */
    onTurnComplete(callback) {
        this.#onSliceTurnCompleteCallback = callback;
    }

    /**
     * Locks the puzzle.
     * 
     * When the puzzle is locked, no slice can be rotated.
     */
    lock() {
        this.#isTurning = true;
        this.#canRotateSlice = false;
    }

    /**
     * Unlocks te puzzle.
     * 
     * When the puzzle is unlocked, any slice can be rotated.
     */
    unlock() {
        this.#isTurning = false;
        this.#canRotateSlice = true;
    }

    /**
     * Starts the initial animation of the puzzle. 
     */
    initIntroAnimation() {
        const cores = this.#cubelets.filter(cubelet => cubelet.type === "core");
        const centers = this.#cubelets.filter(cubelet => cubelet.type === "center");
        const edges = this.#cubelets.filter(cubelet => cubelet.type === "edge");
        const corners = this.#cubelets.filter(cubelet => cubelet.type === "corner");

        return new Promise((resolve) => {
            // global matrix.
            this.#container.animateRotate(
                1000,
                this.#projectionMatrix,
                1,
                this.#container.matrix,
                () => { resolve(); }
            );

            cores.forEach(cubelet => {
                cubelet.backToLife(250);
            });

            centers.forEach(cubelet => {
                cubelet.backToLife(500);
            });

            edges.forEach(cubelet => {
                cubelet.backToLife(750);
            });

            corners.forEach(cubelet => {
                cubelet.backToLife(1000);
            });
        });
    }

    #toggleScramble() {
        this.#isScrambling = !this.#isScrambling;
    }

    #toggleIsFreeRotating() {
        this.#isFreeRotating = !this.#isFreeRotating;
    }

    #toggleAreDirectionalLabelsActive() {
        this.#areDirectionalLabelsActive = !this.#areDirectionalLabelsActive;
    }

    #toggleAreFaceLabelsActive() {
        this.#areFaceLabelsActive = !this.#areFaceLabelsActive;
    }

    #toggleAreNumericalLabelsActive() {
        this.#areNumericalLabelsActive = !this.#areNumericalLabelsActive;
    }

    /**
     * Inverts a move, if it is a clockwise move changes into a counter-clockwise move, like R to R'.
     * @param {string} move - A string move. 
     * @returns {string} The inverted move.
     */
    #invertMove(move) {
        return move.endsWith("'") ? `${move.replace("'", "")}` : `${move}'`;
    }

    /**
     * Doubles a move.
     * @param {string} move - The slice move. 
     * @returns {string} The new move with a "2".
     */
    #doubleMove(move) {
        return move.endsWith("'") ? `${move.replace("'", "")}2` : `${move}2`;
    }

    /**
     * Adds a number label on each face of the cubelet.
     */
    #addNumbers() {
        const coreData = this.coreData;
        const coreList = coreData.list;
        const coreLabel = coreData.label;
        this.#cubelets.forEach(cubelet => {
            if (cubelet.id === coreList[cubelet.id]) { cubelet.setTextContent(coreLabel); }
            else { cubelet.setTextContent(cubelet.id); }
        });
        this.#toggleAreNumericalLabelsActive()
    }

    /**
     * Resets the interaction state.
     */
    #resetInteractionState() {
        this.#movingAngle = 0;
        this.#isMoveValid = false;
        this.#canRotateSlice = true;
        this.#selectedCubelet = null;
        this.#selectedCubeletFace = null;
    }

    /**
     * Calculates and returns a projection point given a mouse delta along the x and y axes.
     * 
     * First, it obtains the local vectors of the selected face (cubelet face), then
     * applies a matrix transformation **V × M** (Vector times Matrix) and normalices it obtaining a new vector. 
     * 
     * From this new vector, it calculates the noramlized dot product to get the projected drag (2d) on the selected face.
     * @param {number} dx - The mouse delta X. 
     * @param {number} dy - The mouse delta Y.
     * @param {number} gestureLength - The value of the gesture.
     */
    #getProjectionPoint(dx, dy, gestureLength) {
        const gestureDirX = dx / gestureLength;
        const gestureDirY = dy / gestureLength;

        const faceNormal = Puzzle.#FACE_NORMAL_VECTORS[this.#selectedCubeletFace];
        const matrixData = this.#container.matrix.data;

        // these vectors needs to be normalized to avoid losing "strength" in the drag.
        faceNormal.x.matrixTransform(matrixData).normalize2D();
        faceNormal.y.matrixTransform(matrixData).normalize2D();

        this.#projectionPoint.x = faceNormal.x.dotNormalized2D(gestureDirX, gestureDirY);
        this.#projectionPoint.y = faceNormal.y.dotNormalized2D(gestureDirX, gestureDirY);
    }

    /**
     * Turns a slice of the puzzle.
     * @param {string} axis - The axis: "x" || "y" || "z".
     * @param {number} directionalTurnCount - The number of turns and direction.
     * @param {Object.<string, number>} faceIdRotationMap - The face rotation map of each face of the cubelet.
     */
    #turnSlice(axis, directionalTurnCount, faceIdRotationMap) {
        this.#sliceCubelets.forEach(cubelet => {
            cubelet.setFaceIds(faceIdRotationMap);
            cubelet.rotateDiscrete(axis, directionalTurnCount);
            this.#state[cubelet.id] = { faceIds: cubelet.faceIds, matrix: cubelet.getMatrixData() };
        });
    }

    /**
     * Applies a new css transform to each slice cubelet for each frame with a different angle.
     * 
     * LERP (Linear Interpolation).
     * 
     * L(t) = A + (B - A) * t
     * @param {number} transitionDuration - The transition duration.
     */
    #interpolateSliceCubeletsMatrix(transitionDuration) {
        const turnCount = Math.round(((this.#movingAngle / Puzzle.#TURN_ANGLE) % Puzzle.#TURN_ANGLE)) % Puzzle.#MAXIMUM_TURN_COUNT;

        const slice = this.slices[this.#currentMove];
        const axis = slice.axis;
        const direction = -slice.direction;
        const autoAlignmentAngle = turnCount * Puzzle.#TURN_ANGLE; // result: 0, 90, 180, 270

        const move = this.#currentMove;
        const turn = turnCount * direction;

        const movingAngle = this.#movingAngle;
        const sliceAngle = movingAngle > 315 ? (movingAngle - 360) : movingAngle;
        const deltaAngle = autoAlignmentAngle - sliceAngle; // (B - A).

        let start = null;
        const animationFrame = (timestamp) => {
            if (start === null) start = timestamp;
            let t = (timestamp - start) / transitionDuration;
            if (t > 1) t = 1;
            // const angle = sliceAngle + angleDiff * t;
            const tInverse = 1 - t;
            const angle = sliceAngle + deltaAngle * (1 - (tInverse * tInverse)); // A + (B - A) * t.
            this.#autoAlignSlice(axis, direction, angle);
            if (t < 1) {
                requestAnimationFrame(animationFrame);
            }
            else {
                this.#commitSliceTurn(axis, turn, move, turnCount);
                this.#onSliceTurnCompleteCallback();
                this.#resetInteractionState();
            }
        };
        requestAnimationFrame(animationFrame); // init.
    }

    /**
     * Auto aligns a slice after drop.
     * @param {string} axis - The axis: "x" || "y" || "z".
     * @param {number} direction - The slice direction.
     * @param {number} angle - The slice angle.
     */
    #autoAlignSlice(axis, direction, angle) {
        this.#sliceCubelets.forEach(cubelet => {
            const cubeletMatrixData = cubelet.matrix.data;
            this.#projectionMatrix.projectRotation(this.#dynamicMatrixData, cubeletMatrixData, axis, -direction * angle);
            cubelet.applyTransformFromMatrix(this.#dynamicMatrixData);
        });
    }

    /**
     * Commits a slice turn given an axis, turn, move and turnCount.
     * @param {string} axis - The axis: "x" || "y" || "z".
     * @param {number} turn - The current turn.
     * @param {string} move - The string move.
     * @param {number} turnCount - The turn count.
     */
    #commitSliceTurn(axis, turn, move, turnCount) {
        switch (turnCount) {
            case 1:
                this.#turnSlice(axis, turn, Puzzle.#FACE_ID_EXCHANGE_MAP[move]);
                break;
            case 2:
                this.#turnSlice(axis, Math.abs(turn), Puzzle.#FACE_ID_EXCHANGE_MAP[this.#doubleMove(move)]);
                break;
            case 3:
                this.#turnSlice(axis, -turn, Puzzle.#FACE_ID_EXCHANGE_MAP[this.#invertMove(move)]);
                break;
            default: break;
        }
    }

    /**
     * Performs a slice turn given the move and transition duration.
     * @param {string} move - The move.
     * @param {number} transitionDuration - The transition duration.
    */
    #performSliceTurn(move, transitionDuration) {
        const slice = this.slices[move];
        const callback = this.getCubeletsCallback(move, 1);
        const axis = slice.axis;
        const direction = -slice.direction;

        this.#sliceCubelets = this.#cubelets.filter(callback);

        const movingAngle = this.#movingAngle;
        const sliceAngle = movingAngle > 315 ? (movingAngle - 360) : movingAngle;
        const angleDiff = (90 - sliceAngle); // (B - A)

        let start = null;
        const frame = (timestamp) => {
            if (start === null) start = timestamp;

            let t = (timestamp - start) / transitionDuration;

            if (t > 1) t = 1;

            const tInverse = 1 - t;
            const angle = sliceAngle + angleDiff * (1 - (tInverse * tInverse));
            this.#autoAlignSlice(axis, direction, angle);

            if (t < 1) {
                requestAnimationFrame(frame);
            }
            else {
                this.#turnSlice(axis, direction, Puzzle.#FACE_ID_EXCHANGE_MAP[move]);
                this.#onSliceTurnCompleteCallback();
                this.#isTurning = false;
            }
        };
        this.#isTurning = true;
        requestAnimationFrame(frame);
    }
}