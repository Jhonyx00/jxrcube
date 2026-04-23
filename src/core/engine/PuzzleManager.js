/**
 * Manages the methods and inputs of the selected puzzle by using the Facade Pattern.
 */
class PuzzleManager {
    /**
     * The scene instance where each puzzle is rendered.
     * @type {Scene|null}
     */
    #scene = null;

    /**
     * The puzzles data.
     * @type {Object.<string, PuzzleDynamicState>}
     */
    #puzzlesData = {}

    /**
     * An array containing the name of each puzzle.
     * @type {string[]}
     */
    #puzzleNames = [];

    /**
     * The current puzzle name.
     */
    #currentKey = "";

    /**
     * The current puzzle instance.
     * @type {Puzzle|null}
     */
    #currentPuzzle = null;

    /**
     * Constructs a single point of control that manages the actions of the current puzzle.
     * @param {Object.<string, PuzzleDynamicState>} puzzlesData - The puzzles data object.
     * @param {Scene} scene - The container where the puzzles will be rendered.
     */
    constructor(scene, puzzlesData) {
        this.#puzzlesData = puzzlesData;
        this.#scene = scene;
        this.#puzzleNames = Object.keys(this.#puzzlesData);
        this.#currentKey = localStorage.getItem("selected") || this.puzzleNames[1]; // Default puzzle (3x3 cube).
        this.#currentPuzzle = this.#puzzlesData[this.#currentKey].ref;
    }

    get puzzleNames() {
        return this.#puzzleNames;
    }

    get cubeletOptions() {
        return this.#currentPuzzle.cubeletOptions;
    }

    get appearanceNames() {
        return this.#currentPuzzle.appearanceNames;
    }

    /**
     * @returns {string} The appearance of the current puzzle.
     */
    get currentAppearance() {
        return this.#puzzlesData[this.#currentKey].config.appearance;
    }

    /**
    * @returns {string} The current puzzle name.
    */
    get currentKey() {
        return this.#currentKey;
    }

    /**
     * Inits the application from the current data (local or localStorage).
     */
    init() {
        this.puzzleNames.forEach(name => {
            const puzzle = this.#puzzlesData[name];

            const puzzleRef = puzzle.ref;
            puzzleRef.onTurnComplete(() => this.#saveState());

            const state = JSON.parse(localStorage.getItem(`jxrcube:${name}:state`)) ?? {};
            const config = JSON.parse(localStorage.getItem(`jxrcube:${name}:config`)) ?? {
                appearance: "classic",
                matrix: new Matrix3D().rotateSelf(-35, -40, 22.5).data
            };

            const buildData = {
                order: puzzleRef.order,
                offset: puzzleRef.offset,
                indexToAxis: puzzleRef.indexToAxis,
                cubeletSize: puzzleRef.cubeletSize,
                maxPositionFactor: puzzleRef.maxPositionFactor,
            }

            let cubeletsData;
            if (name === "mirror3x3x3") {
                cubeletsData = PuzzleBuilder.generateIrregularCubeletsData(buildData);
            }
            else if (name === "cube3x3x1") {
                cubeletsData = PuzzleBuilder.generateSingleLayerCubeletsData(buildData);
            }
            else {
                cubeletsData = PuzzleBuilder.generateMultipleLayerCubeletsData(buildData);
            }

            const cubelets = PuzzleFactory.createBasicBoxes(cubeletsData, state); // The array that contains the Box3D instanes.

            puzzleRef.state = state;
            puzzleRef.cubelets = cubelets;
            puzzleRef.cubeletsData = cubeletsData;

            const container = new Container3D();

            const sign3d = new Sign3D({
                data: { 0: "Front", 1: "Up", 2: "Right", 3: "Back", 4: "Left", 5: "Down" },
                parent: container.element,
                tz: puzzleRef.signExpansionFactor
            });

            puzzleRef.setSign3d(sign3d);
            puzzleRef.setContainer(container);

            puzzle.config.appearance = config.appearance;
            puzzle.config.matrix = config.matrix; // necesary to update the object that goes into the localStorage.

            puzzleRef.container.setMatrixFromData(config.matrix);
            puzzleRef.container.setDataAttr("appearance", config.appearance);

            puzzleRef.container.addBoxes(cubelets); // HTML rendering.
            puzzleRef.container.setDataAttr("name", name); // Puzzle name.
            puzzleRef.container.setDataAttr("labels", "none");
        });

        this.#renderSelected();

        /**
         * @type {{numbers:function():void, faces:function():void, direction:function():void, scramble:function():void, rotate:function():void}}
         */
        this.actions = {
            "numbers": () => this.#currentPuzzle.addLabels(),
            "faces": () => this.#currentPuzzle.displayFaceLabels(),
            "direction": () => this.#currentPuzzle.direction(),
            "scramble": () => this.#currentPuzzle.scramble(),
            "rotate": () => this.#currentPuzzle.rotate(),
            "reset": () => this.#currentPuzzle.reset(),
        }
    }

    /**
     * Sets the new selected puzzle given a puzzle name and html parent element.
     * @param {string} puzzleName - The puzzle's name.
     */
    setCurrent(puzzleName) {
        this.#currentKey = puzzleName;
        this.#currentPuzzle = this.#puzzlesData[puzzleName].ref;
        this.#renderSelected();
        this.#setCurrentOptions();
        localStorage.setItem("selected", puzzleName);
    }

    /**
     * Get the current puzzle sub menu state.
     * @param {string} subMenuName - The sub menu name. 
     * @returns {Object.<string, boolean>} The object containing the menu state.
     */
    getSubMenuState(subMenuName) {
        return this.#puzzlesData[this.#currentKey][subMenuName];
    }

    setGlobalMatrix() {
        this.#updatePuzzleData({ matrix: this.#currentPuzzle.container.matrix.data });
    }

    updateMatrixFromDelta(dx, dy) {
        if (!this.#currentPuzzle.isMoveValid) this.#currentPuzzle.container.updateMatrixFromDelta(dx, dy);
    }

    dragSlice(dx, dy) {
        this.#currentPuzzle.dragSlice(dx, dy);
    }

    turnSliceByCommand(notation) {
        this.#currentPuzzle.turnSliceByCommand(notation);
    }

    onSliceDrop() {
        this.#currentPuzzle.onSliceDrop();
    }

    changeAppearance(appearanceName) {
        this.#updatePuzzleData({ appearance: appearanceName });
        this.#currentPuzzle.container.setDataAttr("appearance", appearanceName);
    }

    selectCubelet(cubelet) {
        this.#currentPuzzle.selectCubelet(cubelet);
    }

    addLabels() {
        this.#currentPuzzle.addLabels(this.#currentPuzzle);
    }

    displayFaceLabels() {
        this.#currentPuzzle.displayFaceLabels();
    }

    scramble() {
        this.#currentPuzzle.scramble();
    }

    rotate() {
        this.#currentPuzzle.rotate();
    }

    /**
     * Resets the current puzzle state.
     */
    reset() {
        this.#currentPuzzle.reset();
        localStorage.removeItem(`jxrcube:${this.#currentKey}:state`);
    }

    direction() {
        this.#currentPuzzle.direction();
    }

    solve() {
        this.#currentPuzzle.solve();
    }

    /**
     * Show only the cubelets especified, the rest will be in frame mode.
     * @param {string} cubeletType - The cubelet type. 
     */
    displayCubeletType(cubeletType) {
        this.#currentPuzzle.displayCubeletType(cubeletType);
    }

    /**
     * Starts the initial animation of the **current puzzle**.
     */
    async initIntroAnimation() {
        this.#currentPuzzle.lock();
        await this.#currentPuzzle.initIntroAnimation();
        this.#currentPuzzle.unlock();
    }

    /**
     * Sets the menu options of the current puzzle.
     */
    #setCurrentOptions() {
        const puzzle = this.#puzzlesData[this.#currentKey];
        // actions.
        puzzle.actions.rotate = this.#currentPuzzle.isFreeRotating;
        puzzle.actions.scramble = this.#currentPuzzle.isScrambling;
        puzzle.actions.faces = this.#currentPuzzle.areFaceLabelsActive;
        puzzle.actions.numbers = this.#currentPuzzle.areNumericalLabelsActive;
        puzzle.actions.direction = this.#currentPuzzle.areDirectionalLabelsActive;
        // cubelets
        puzzle.cubeletOption = this.#currentPuzzle.displayedCubelets;
    }

    #renderSelected() {
        this.#scene.element.replaceChildren();
        this.#currentPuzzle.render(this.#scene.element);
    }

    /**
     * Saves the state of the current puzzle to localStorage.
     */
    #saveState() {
        localStorage.setItem(`jxrcube:${this.#currentKey}:state`, JSON.stringify(this.#currentPuzzle.state));
    }

    /**
   * Updates the current puzzle data to localStorage.
   * @param {PersistentState} newValues - Object conaining the new values to update.
   */
    #updatePuzzleData(newValues) {
        const prev = this.#puzzlesData[this.#currentKey].config;
        const newConfig = { ...prev, ...newValues };
        this.#puzzlesData[this.#currentKey].config = newConfig;
        localStorage.setItem(`jxrcube:${this.#currentKey}:config`, JSON.stringify(newConfig));
    }
}