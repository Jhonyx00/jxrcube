/**
 * @type {Object.<string, BaseData>}
 */
const PUZZLE_BASE_DATA = {
    "2x2x2": {
        order: {
            w: 2,
            h: 2,
            d: 2,
        },
        indexToAxis: { 0: -0.5, 1: 0.5 },
        cubeletOptions: {
            "all": "all",
            "slice": "slice",
            "ladder": "ladder",
            "top-right": "top-right"
        },
    },
    "4x4x2": {
        order: {
            w: 2,
            h: 4,
            d: 4,
        },
        indexToAxis: { 0: -1.5, 1: -0.5, 2: 0.5, 3: 1.5 },
        cubeletOptions: {
            "all": "all",
            "void": "void",
            "corners": "corners",
            "edges": "edges",
            "slice": "slice",
            "centers": "centers",
        },
    },
    "3x3x1": {
        order: {
            w: 3,
            h: 3,
            d: 1,
        },
        indexToAxis: { 0: -1, 1: 0, 2: 1 },
        cubeletOptions: {
            "all": "all",
            "void": "void",
            "corners": "corners",
            "cross": "cross",
            "edges": "edges",
            "centers": "centers",
        },
    },
    "3x3x3": {
        order: {
            w: 3,
            h: 3,
            d: 3,
        },
        indexToAxis: { 0: -1, 1: 0, 2: 1 },
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
    },
    "4x4x4": {
        order: {
            w: 4,
            h: 4,
            d: 4,
        },
        indexToAxis: { 0: -1.5, 1: -0.5, 2: 0.5, 3: 1.5 },
        cubeletOptions: {
            "all": "all",
            "void": "void",
            "two-slices": "two-slices",
            "corners": "corners",
            "edges": "edges",
            "slice": "slice",
            "centers": "centers",
        },
    },
    "3x3x4": {
        order: {
            w: 4,
            h: 3,
            d: 3,
        },
        indexToAxis: { 0: -1, 1: 0, 2: 1, 3: 2, 4: 3 },
        cubeletOptions: {
            "all": "all",
            "void": "void",
            "corners": "corners",
            "edges": "edges",
            "slice": "slice",
            "centers": "centers",
        }
    },
    "3x3x5": {
        order: {
            w: 5,
            h: 3,
            d: 3,
        },
        indexToAxis: { 0: -1, 1: 0, 2: 1, 3: 2, 4: 3 },
        cubeletOptions: {
            "all": "all",
            "void": "void",
            "corners": "corners",
            "edges": "edges",
            "slice": "slice",
            "centers": "centers",
        }
    }
}