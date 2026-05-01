/**
 * The appearances that applies to all puzzles.
 * @type {Object.<string, string>}
 */
const DEFAULT_APPEARANCES = {
    "classic": "classic",
    "acrylic": "acrylic",
    "outline": "outline",
    "grid": "grid",
}

/**
 * The recular puzzle appearances.
 * @type {Object.<string, string>}
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
 * @type {Object.<string, BaseData>}
 */
const BASE_DATA = {
    "cube2x2x2": {
        name: "cube2x2x2",
        coreData: {
            list: {},
            label: "\u2764" //heart
        },
        appearanceNames: {
            ...DEFAULT_APPEARANCES,
            ...REGULAR_PUZZLE_APPEARANCES,
            "hollow": "hollow",
            "picture": "picture",
        },
        cubeletOptions: {
            "all": "all",
            "slice": "slice",
            "ladder": "ladder",
            "top-right": "top-right"
        },
        signExpansionFactor: 120,
    },
    "cube3x3x1": {
        name: "cube3x3x1",
        coreData: {
            list: {},
            label: "\u2764" //heart
        },
        cubeletOptions: {
            "all": "all",
            "void": "void",
            "corners": "corners",
            "cross": "cross",
            "edges": "edges",
            "centers": "centers",
        },
        appearanceNames: {
            ...DEFAULT_APPEARANCES,
            ...REGULAR_PUZZLE_APPEARANCES,
            "dotted": "dotted",
            "monochromatic": "monochromatic"
        },
        signExpansionFactor: 150,
    },
    "cube4x4x2": {
        name: "cube4x4x2",
        coreData: {
            list: {},
            label: "\u2764" //heart
        },
        appearanceNames: {
            ...DEFAULT_APPEARANCES,
            ...REGULAR_PUZZLE_APPEARANCES,
            monochromatic: "monochromatic",
        },
        cubeletOptions: {
            "all": "all",
            "void": "void",
            "corners": "corners",
            "edges": "edges",
            "slice": "slice",
            "centers": "centers",
        },
        signExpansionFactor: 160,
    },
    "cube3x3x3": {
        name: "cube3x3x3",
        coreData: {
            list: { 13: 13 },
            label: "\u2764" //heart
        },
        appearanceNames: {
            ...DEFAULT_APPEARANCES,
            ...REGULAR_PUZZLE_APPEARANCES,
            hollow: "hollow",
            picture: "picture",
            monochromatic: "monochromatic",
        },
        cubeletOptions: {
            "all": "all",
            "void": "void",
            "two-slices": "two-slices",
            "corners": "corners",
            "cross": "cross",
            "edges": "edges",
            "slice": "slice",
            "centers": "centers",
        },
        signExpansionFactor: 150,
    },
    "mirror3x3x3": {
        name: "mirror3x3x3",
        coreData: {
            list: { 13: 13 },
            label: "\u2764" //heart
        },
        appearanceNames: {
            ...DEFAULT_APPEARANCES,
            "white": "white",
            "colored": "colored",
            "neon blue": "neon blue",
            "translucent green": "translucent green",
            "cosmic noise": "cosmic noise"
        },
        cubeletOptions: {
            "all": "all",
            "void": "void",
            "two-slices": "two-slices",
            "corners": "corners",
            "cross": "cross",
            "edges": "edges",
            "slice": "slice",
            "centers": "centers",
        },
        signExpansionFactor: 175,
    },
    "cube4x4x4": {
        name: "cube4x4x4",
        coreData: {
            list: { 21: 21, 22: 22, 25: 25, 26: 26, 37: 37, 38: 38, 41: 41, 42: 42 },
            label: "\u2764" //heart
        },
        appearanceNames: {
            ...DEFAULT_APPEARANCES,
            ...REGULAR_PUZZLE_APPEARANCES,
            "8-color": "8-color",
        },
        cubeletOptions: {
            "all": "all",
            "void": "void",
            "two-slices": "two-slices",
            "corners": "corners",
            "edges": "edges",
            "slice": "slice",
            "centers": "centers",
        },
        signExpansionFactor: 145,
    },
    "cube3x3x5": {
        name: "cube3x3x5",
        coreData: {
            list: { 13: 13, 22: 22, 31: 31 },
            label: "\u2764" //heart
        },
        appearanceNames: {
            ...DEFAULT_APPEARANCES,
            ...REGULAR_PUZZLE_APPEARANCES
        },
        cubeletOptions: {
            "all": "all",
            "void": "void",
            "corners": "corners",
            "edges": "edges",
            "slice": "slice",
            "centers": "centers",
        },
        signExpansionFactor: 160,
    },
    "cube3x3x4": {
        name: "cube3x3x4",
        coreData: {
            list: { 13: 13, 22: 22 },
            label: "\u2764" //heart
        },
        appearanceNames: {
            ...DEFAULT_APPEARANCES,
            ...REGULAR_PUZZLE_APPEARANCES
        },
        cubeletOptions: {
            "all": "all",
            "void": "void",
            "corners": "corners",
            "edges": "edges",
            "slice": "slice",
            "centers": "centers",
        },
        signExpansionFactor: 160,
    }
}