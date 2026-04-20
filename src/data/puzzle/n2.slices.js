/**
 * The 2x2x2 cube order slices.
 * @type {Object.<string, Slice>}
 */
const N_2_SLICES = {
    "U": {
        axis: "y",
        direction: -1,
        callback: cubelet => cubelet.matrix.getGridPositionY(cubelet.size) === -0.5,
    },
    "U'": {
        axis: "y",
        direction: 1,
        callback: cubelet => cubelet.matrix.getGridPositionY(cubelet.size) === -0.5,
    },
    "D": {
        axis: "y",
        direction: 1,
        callback: cubelet => cubelet.matrix.getGridPositionY(cubelet.size) === 0.5,
    },
    "D'": {
        axis: "y",
        direction: -1,
        callback: cubelet => cubelet.matrix.getGridPositionY(cubelet.size) === 0.5,
    },
    "R": {
        axis: "x",
        direction: 1,
        callback: cubelet => cubelet.matrix.getGridPositionX(cubelet.size) === 0.5,
    },
    "R'": {
        axis: "x",
        direction: -1,
        callback: cubelet => cubelet.matrix.getGridPositionX(cubelet.size) === 0.5,
    },
    "L'": {
        axis: "x",
        direction: 1,
        callback: cubelet => cubelet.matrix.getGridPositionX(cubelet.size) === -0.5,
    },
    "L": {
        axis: "x",
        direction: -1,
        callback: cubelet => cubelet.matrix.getGridPositionX(cubelet.size) === -0.5,
    },
    "B": {
        axis: "z",
        direction: -1,
        callback: cubelet => cubelet.matrix.getGridPositionZ(cubelet.size) === -0.5,
    },
    "B'": {
        axis: "z",
        direction: 1,
        callback: cubelet => cubelet.matrix.getGridPositionZ(cubelet.size) === -0.5,
    },
    "F": {
        axis: "z",
        direction: 1,
        callback: cubelet => cubelet.matrix.getGridPositionZ(cubelet.size) === 0.5,
    },
    "F'": {
        axis: "z",
        direction: -1,
        callback: cubelet => cubelet.matrix.getGridPositionZ(cubelet.size) === 0.5,
    },
}