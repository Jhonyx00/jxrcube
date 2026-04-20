/**
 * Represents a cube 2x2x2 puzzle.
 * @extends Puzzle
 */
class Cube2x2x2 extends Puzzle {
    /**
     * Constructs a cube 2x2x2 puzzle.
     */
    constructor() {
        const key = "cube2x2x2";
        const orderStr = "2x2x2";
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
        return DEFAULT_MOVES;
    }

    get slices() {
        return N_2_SLICES;
    }

    get movesMap() {
        return N_2_MOVES_MAP;
    }

    solve() {
        console.log("Metod not implemented yet");
    }
}