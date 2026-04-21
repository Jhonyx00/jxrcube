class Cube4x4x2 extends Puzzle {
    /**
     * Constructs a cube 3x3x3 puzzle.
     */
    constructor() {
        const key = "cube4x4x2";
        const orderStr = "4x4x2";
        /** @type {PuzzleData}*/
        const puzzleData = {
            name: key,
            offset: { x: 0, y: 1, z: 0 },
            ...PUZZLE_BASE_DATA[orderStr]
        };
        super(
            puzzleData,
            PUZZLE_CONFIG[key],
        );
    }

    get moves() {
        return N_4_MOVES;
    }

    get slices() {
        return N_4_SLICES;
    }

    get movesMap() {
        return N_4_MOVES_MAP;
    }

    get specialCallbacks() {
        return SPECIAL_CALLBACKS;
    }

    #changeMove(move) {
        const mayus = move.toUpperCase();
        return move === mayus ? `${move}` : `${mayus}`;
    }

    getCubeletsCallback(move, translationComponent) {
        const externalSlice = translationComponent
            ? this.slices[this.#changeMove(move)]
            : undefined;

        if (externalSlice) {
            const filteredCubeletsSize = super.getFilteredCubeletsSize(externalSlice.callback);

            if (filteredCubeletsSize < 8)
                return this.specialCallbacks[move[0]];
            else
                return this.slices[move].callback;
        }
        else  // internal slice
            return this.slices[move].callback;
    }

    solve() {
        console.log("Metod not implemented yet");
    }
}