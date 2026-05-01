/**
 * Represents a cuboid 3x3x5 puzzle.
 * @extends Puzzle
 */
class Cube3x3x5 extends Puzzle {
    /**
     * Constructs a cuboid 3x3x5 puzzle.
     */
    constructor() {
        const key = "cube3x3x5";
        const orderStr = "3x3x5";
        super(
            BASE_DATA[key],
            BUILD_DATA[orderStr],
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