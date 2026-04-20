/**
 * The 5x5x5 cube order slices.
 * @type {Object.<string, Slice>}
 */
const N_5_SLICES = {
    "u": {
        axis: "y",
        direction: -1,
        callback: cubelet => cubelet.matrix.getGridPositionY(cubelet.size) === -1
    },
    "u'": {
        axis: "y",
        direction: 1,
        callback: cubelet => cubelet.matrix.getGridPositionY(cubelet.size) === -1
    },
    "U": {
        axis: "y",
        direction: -1,
        callback: cubelet => cubelet.matrix.getGridPositionY(cubelet.size) === -2
    },
    "U'": {
        axis: "y",
        direction: 1,
        callback: cubelet => cubelet.matrix.getGridPositionY(cubelet.size) === -2
    },
    "d": {
        axis: "y",
        direction: 1,
        callback: cubelet => cubelet.matrix.getGridPositionY(cubelet.size) === 1
    },
    "d'": {
        axis: "y",
        direction: -1,
        callback: cubelet => cubelet.matrix.getGridPositionY(cubelet.size) === 1
    },
    "D": {
        axis: "y",
        direction: 1,
        callback: cubelet => cubelet.matrix.getGridPositionY(cubelet.size) === 2
    },
    "D'": {
        axis: "y",
        direction: -1,
        callback: cubelet => cubelet.matrix.getGridPositionY(cubelet.size) === 2
    },
    "E": {
        axis: "y",
        direction: 1,
        callback: cubelet => cubelet.matrix.getGridPositionY(cubelet.size) === 0
    },
    "E'": {
        axis: "y",
        direction: -1,
        callback: cubelet => cubelet.matrix.getGridPositionY(cubelet.size) === 0
    },
    "r": {
        axis: "x",
        direction: 1,
        callback: cubelet => cubelet.matrix.getGridPositionX(cubelet.size) === 1
    },
    "r'": {
        axis: "x",
        direction: -1,
        callback: cubelet => cubelet.matrix.getGridPositionX(cubelet.size) === 1
    },
    "R": {
        axis: "x",
        direction: 1,
        callback: cubelet => cubelet.matrix.getGridPositionX(cubelet.size) === 2
    },
    "R'": {
        axis: "x",
        direction: -1,
        callback: cubelet => cubelet.matrix.getGridPositionX(cubelet.size) === 2
    },
    "l'": {
        axis: "x",
        direction: 1,
        callback: cubelet => cubelet.matrix.getGridPositionX(cubelet.size) === -1
    },
    "l": {
        axis: "x",
        direction: -1,
        callback: cubelet => cubelet.matrix.getGridPositionX(cubelet.size) === -1
    },
    "L'": {
        axis: "x",
        direction: 1,
        callback: cubelet => cubelet.matrix.getGridPositionX(cubelet.size) === -2
    },
    "L": {
        axis: "x",
        direction: -1,
        callback: cubelet => cubelet.matrix.getGridPositionX(cubelet.size) === -2
    },
    "M": {
        axis: "x",
        direction: -1,
        callback: cubelet => cubelet.matrix.getGridPositionX(cubelet.size) === 0
    },
    "M'": {
        axis: "x",
        direction: 1,
        callback: cubelet => cubelet.matrix.getGridPositionX(cubelet.size) === 0
    },
    "b": {
        axis: "z",
        direction: -1,
        callback: cubelet => cubelet.matrix.getGridPositionZ(cubelet.size) === -1
    },
    "b'": {
        axis: "z",
        direction: 1,
        callback: cubelet => cubelet.matrix.getGridPositionZ(cubelet.size) === -1
    },
    "B": {
        axis: "z",
        direction: -1,
        callback: cubelet => cubelet.matrix.getGridPositionZ(cubelet.size) === -2
    },
    "B'": {
        axis: "z",
        direction: 1,
        callback: cubelet => cubelet.matrix.getGridPositionZ(cubelet.size) === -2
    },
    "f": {
        axis: "z",
        direction: 1,
        callback: cubelet => cubelet.matrix.getGridPositionZ(cubelet.size) === 1
    },
    "f'": {
        axis: "z",
        direction: -1,
        callback: cubelet => cubelet.matrix.getGridPositionZ(cubelet.size) === 1
    },
    "F": {
        axis: "z",
        direction: 1,
        callback: cubelet => cubelet.matrix.getGridPositionZ(cubelet.size) === 2
    },
    "F'": {
        axis: "z",
        direction: -1,
        callback: cubelet => cubelet.matrix.getGridPositionZ(cubelet.size) === 2
    },
    "S": {
        axis: "z",
        direction: 1,
        callback: cubelet => cubelet.matrix.getGridPositionZ(cubelet.size) === 0
    },
    "S'": {
        axis: "z",
        direction: -1,
        callback: cubelet => cubelet.matrix.getGridPositionZ(cubelet.size) === 0
    },
}