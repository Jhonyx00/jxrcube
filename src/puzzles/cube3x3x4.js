/**
 * Represents a cuboid 3x3x4 puzzle.
 * @extends Puzzle
 */
class Cube3x3x4 extends Puzzle {
    /**
     * Constructs a cuboid 3x3x4 puzzle.
     */
    constructor() {
        const key = "cube3x3x4";
        const orderStr = "3x3x4";
        /** @type {PuzzleData}*/
        const puzzleData = {
            name: key,
            offset: { x: 0, y: -1, z: 0 },
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
        return N_5_SLICES;
    }

    get movesMap() {
        return N_5_MOVES_MAP;
    }

    /**
     * Provides specialized filtering logic for cuboid layer conconstraints.
     */
    get specialCallbacks() {
        return SPECIAL_CALLBACKS;
    }

    getCubeletsCallback(move, translationComponent) {
        const externalSlice = translationComponent
            ? this.slices[this.#changeMove(move)]
            : undefined;

        if (externalSlice) {
            const filteredCubeletsSize = super.getFilteredCubeletsSize(externalSlice.callback);

            if (filteredCubeletsSize < 9)
                return this.specialCallbacks[move[0]];
            else
                return this.slices[move].callback;
        }
        else  // internal slice
            return this.slices[move].callback;
    }

    #changeMove(move) {
        const mayus = move.toUpperCase();
        return move === mayus ? `${move}` : `${mayus}`;
    }

    solve() {
        console.log("Metod not implemented yet");
    }
}