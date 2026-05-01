/**
 * Represents a cube 4x4x2 puzzle.
 * @extends Puzzle
 */

class Cube4x4x2 extends Puzzle {
    /**
     * Constructs a cube 4x4x2 puzzle.
     */
    constructor() {
        const key = "cube4x4x2";
        const orderStr = "4x4x2";
        super(
            BASE_DATA[key],
            BUILD_DATA[orderStr],
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