/**
 * Represents a mirror 3x3x3 puzzle.
 * @extends Puzzle
 */
class Mirror3x3x3 extends Puzzle {
    /**
     * Constructs a mirror 3x3x3 puzzle.
     */
    constructor() {
        const key = "mirror3x3x3";
        const orderStr = "3x3x3";
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

    solve() {
        console.log("Metod not implemented yet");
    }
}