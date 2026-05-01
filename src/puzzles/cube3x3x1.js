/**
 * Represents a cube 4x4x2 puzzle.
 * @extends Puzzle
 */

class Cube3x3x1 extends Puzzle {
    /**
     * Constructs a cube 4x4x2 puzzle.
     */
    constructor() {
        const key = "cube3x3x1";
        const orderStr = "3x3x1";
        super(
            BASE_DATA[key],
            BUILD_DATA[orderStr],
        );
    }

    get moves() {
        return N_3_MOVES;
    }

    get slices() {
        return N_3_SLICES;
    }

    get movesMap() {
        return N_3_MOVES_MAP;
    }

    get specialCallbacks() {
        return SPECIAL_CALLBACKS;
    }

    #changeMove(move) {
        const mayus = move.toUpperCase();
        return move === mayus ? `${move}` : `${mayus}`;
    }

    getCubeletsCallback(move, translationComponent) {
        const initialCallback = this.slices[move].callback;
        const preFilteredCubelets = super.filterCubelets(initialCallback);
        const hasACenter = preFilteredCubelets.find(cubelet => cubelet.type === "edge");

        if (hasACenter && preFilteredCubelets.length <= 4) {
            return this.slices[move].callback;
        }
        else {
            return this.specialCallbacks["0"];
        }
    }

    solve() {
        console.log("Metod not implemented yet");
    }
}