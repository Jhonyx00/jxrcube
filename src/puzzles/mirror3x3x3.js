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
        /** @type {PuzzleData}*/
        const puzzleData = {
            name: key,
            ...PUZZLE_BASE_DATA[orderStr]
        };
        super(
            puzzleData,
            PUZZLE_CONFIG[key],
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