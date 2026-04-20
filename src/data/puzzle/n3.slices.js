/**
 * The 3x3x3 cube order slices.
 * @type {Object.<string, Slice>}
 */
const N_3_SLICES = {
    "U": {
        axis: "y",
        direction: -1,
        callback: cubelet => cubelet.matrix.gridUnitY === -1
    },
    "U'": {
        axis: "y",
        direction: 1,
        callback: cubelet => cubelet.matrix.gridUnitY === -1
    },
    "D": {
        axis: "y",
        direction: 1,
        callback: cubelet => cubelet.matrix.gridUnitY === 1
    },
    "D'": {
        axis: "y",
        direction: -1,
        callback: cubelet => cubelet.matrix.gridUnitY === 1
    },
    "E": {
        axis: "y",
        direction: 1,
        callback: cubelet => cubelet.matrix.gridUnitY === 0
    },
    "E'": {
        axis: "y",
        direction: -1,
        callback: cubelet => cubelet.matrix.gridUnitY === 0
    },
    "R": {
        axis: "x",
        direction: 1,
        callback: cubelet => cubelet.matrix.gridUnitX === 1
    },
    "R'": {
        axis: "x",
        direction: -1,
        callback: cubelet => cubelet.matrix.gridUnitX === 1
    },
    "L'": {
        axis: "x",
        direction: 1,
        callback: cubelet => cubelet.matrix.gridUnitX === -1
    },
    "L": {
        axis: "x",
        direction: -1,
        callback: cubelet => cubelet.matrix.gridUnitX === -1
    },
    "M": {
        axis: "x",
        direction: -1,
        callback: cubelet => cubelet.matrix.gridUnitX === 0
    },
    "M'": {
        axis: "x",
        direction: 1,
        callback: cubelet => cubelet.matrix.gridUnitX === 0
    },
    "B": {
        axis: "z",
        direction: -1,
        callback: cubelet => cubelet.matrix.gridUnitZ === -1
    },
    "B'": {
        axis: "z",
        direction: 1,
        callback: cubelet => cubelet.matrix.gridUnitZ === -1
    },
    "F": {
        axis: "z",
        direction: 1,
        callback: cubelet => cubelet.matrix.gridUnitZ === 1
    },
    "F'": {
        axis: "z",
        direction: -1,
        callback: cubelet => cubelet.matrix.gridUnitZ === 1
    },
    "S": {
        axis: "z",
        direction: 1,
        callback: cubelet => cubelet.matrix.gridUnitZ === 0
    },
    "S'": {
        axis: "z",
        direction: -1,
        callback: cubelet => cubelet.matrix.gridUnitZ === 0
    },
}