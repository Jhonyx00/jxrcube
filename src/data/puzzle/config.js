/**
 * The appearances that applies to all puzzles.
 * @type {Object.<string, String>}
 */
const DEFAULT_APPEARANCES = {
    "classic": "classic",
    "acrylic": "acrylic",
    "outline": "outline",
    "grid": "grid",
}

/**
 * The recular puzzle appearances.
 * @type {Object.<string, String>}
 */
const REGULAR_PUZZLE_APPEARANCES = {
    "pastel": "pastel",
    "candy": "candy",
    "glass": "glass",
    "transparent": "transparent",
    "inverted": "inverted",
    "ice": "ice",
}

/**
 * The config for each puzzle.
 * @type {Object.<string, PuzzleConfig>}
 */
const PUZZLE_CONFIG = {
    "cube2x2x2": {
        cubeletSize: 80,
        maxPositionFactor: 0.5,
        signExpansionFactor: 120,
        appearanceNames: {
            ...DEFAULT_APPEARANCES,
            ...REGULAR_PUZZLE_APPEARANCES,
            "hollow": "hollow",
            "picture": "picture",
        },
        coreData: {
            list: {},
            label: "\u2764" //heart
        },
    },
    "cube4x4x2": {
        cubeletSize: 54,
        maxPositionFactor: 1.5,
        signExpansionFactor: 160,
        appearanceNames: {
            ...DEFAULT_APPEARANCES,
            ...REGULAR_PUZZLE_APPEARANCES,
            monochromatic: "monochromatic",
        },
        coreData: {
            list: {},
            label: "\u2764" //heart
        }
    },
    "cube3x3x3": {
        cubeletSize: 60,
        maxPositionFactor: 1,
        signExpansionFactor: 150,
        appearanceNames: {
            ...DEFAULT_APPEARANCES,
            ...REGULAR_PUZZLE_APPEARANCES,
            hollow: "hollow",
            picture: "picture",
            monochromatic: "monochromatic",
        },
        coreData: {
            list: { 13: 13 },
            label: "\u2764" //heart
        }
    },
    "mirror3x3x3": {
        cubeletSize: 60,
        maxPositionFactor: 1,
        signExpansionFactor: 175,
        appearanceNames: {
            ...DEFAULT_APPEARANCES,
            "white": "white",
            "colored": "colored",
            "neon blue": "neon blue",
            "translucent green": "translucent green",
            "cosmic noise": "cosmic noise"
        },
        coreData: {
            list: { 13: 13 },
            label: "\u2764" //heart
        }
    },
    "cube4x4x4": {
        cubeletSize: 48,
        maxPositionFactor: 1.5,
        signExpansionFactor: 145,
        appearanceNames: {
            ...DEFAULT_APPEARANCES,
            ...REGULAR_PUZZLE_APPEARANCES,
            "8-color": "8-color",
        },
        coreData: {
            list: { 21: 21, 22: 22, 25: 25, 26: 26, 37: 37, 38: 38, 41: 41, 42: 42 },
            label: "\u2764" //heart
        }
    },
    "cube3x3x5": {
        cubeletSize: 52,
        maxPositionFactor: 1,
        signExpansionFactor: 160,
        appearanceNames: {
            ...DEFAULT_APPEARANCES,
            ...REGULAR_PUZZLE_APPEARANCES
        },
        coreData: {
            list: { 13: 13, 22: 22, 31: 31 },
            label: "\u2764" //heart
        }
    },
    "cube3x3x4": {
        cubeletSize: 52,
        maxPositionFactor: 1,
        signExpansionFactor: 160,
        appearanceNames: {
            ...DEFAULT_APPEARANCES,
            ...REGULAR_PUZZLE_APPEARANCES
        },
        coreData: {
            list: { 13: 13, 22: 22 },
            label: "\u2764" //heart
        }
    }
}