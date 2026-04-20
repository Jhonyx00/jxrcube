/**
 * Represents a cube 4x4x4 puzzle
 * @extends Puzzle
 */
class Cube4x4x4 extends Puzzle {
    /**
     * Constructs a cube 4x4x4 puzzle.
     */
    constructor() {
        const key = "cube4x4x4";
        const orderStr = "4x4x4";
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
        return N_4_MOVES;
    }

    get slices() {
        return N_4_SLICES;
    }

    get movesMap() {
        return N_4_MOVES_MAP;
    }

    solve() {
        console.log("Metod not implemented yet");
    }
}