/**
 * All puzzles have these moves, and keyboard input only allows these moves.
 * @type {Object.<String, string>}
 */
const DEFAULT_MOVES = {
    "U": "U", "U'": "U'",
    "D": "D", "D'": "D'",
    "F": "F", "F'": "F'",
    "B": "B", "B'": "B'",
    "R": "R", "R'": "R'",
    "L": "L", "L'": "L'",
}

/**
 * Order 3x3x3 moves
 * @type {Object.<string, String>}
 */
const N_3_MOVES = {
    ...DEFAULT_MOVES,
    "M": "M", "M'": "M'",
    "E": "E", "E'": "E'",
    "S": "S", "S'": "S'",
}

/**
 * Order 4x4x4 moves
 * @type {Object.<string, String>}
 */
const N_4_MOVES = {
    ...DEFAULT_MOVES,
    "f": "f", "f'": "f'",
    "r": "r", "r'": "r'",
    "l": "l", "l'": "l'",
    "b": "b", "b'": "b'",
    "d": "d", "d'": "d'",
    "u": "u", "u'": "u'",
}