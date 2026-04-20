/**
 * The 4x4x4 cube order slices.
 * @type {Object.<string, Slice>}
 */
const N_4_SLICES = {
    "U": {
        axis: "y",
        direction: -1,
        callback: cubelet => cubelet.matrix.getGridPositionY(cubelet.size) === -1.5,
    },
    "U'": {
        axis: "y",
        direction: 1,
        callback: cubelet => cubelet.matrix.getGridPositionY(cubelet.size) === -1.5,
    },

    "u": {
        axis: "y",
        direction: -1,
        callback: cubelet => cubelet.matrix.getGridPositionY(cubelet.size) === -0.5,
    },

    "u'": {
        axis: "y",
        direction: 1,
        callback: cubelet => cubelet.matrix.getGridPositionY(cubelet.size) === -0.5,
    },
    "D": {
        axis: "y",
        direction: 1,
        callback: cubelet => cubelet.matrix.getGridPositionY(cubelet.size) === 1.5,
    },

    "D'": {
        axis: "y",
        direction: -1,
        callback: cubelet => cubelet.matrix.getGridPositionY(cubelet.size) === 1.5,
    },
    "d": {
        axis: "y",
        direction: 1,
        callback: cubelet => cubelet.matrix.getGridPositionY(cubelet.size) === 0.5,
    },

    "d'": {
        axis: "y",
        direction: -1,
        callback: cubelet => cubelet.matrix.getGridPositionY(cubelet.size) === 0.5,
    },
    "R": {
        axis: "x",
        direction: 1,
        callback: cubelet => cubelet.matrix.getGridPositionX(cubelet.size) === 1.5,
    },

    "R'": {
        axis: "x",
        direction: -1,
        callback: cubelet => cubelet.matrix.getGridPositionX(cubelet.size) === 1.5,
    },
    "r": {
        axis: "x",
        direction: 1,
        callback: cubelet => cubelet.matrix.getGridPositionX(cubelet.size) === 0.5,
    },
    "r'": {
        axis: "x",
        direction: -1,
        callback: cubelet => cubelet.matrix.getGridPositionX(cubelet.size) === 0.5,
    },
    "L'": {
        axis: "x",
        direction: 1,
        callback: cubelet => cubelet.matrix.getGridPositionX(cubelet.size) === -1.5,
    },
    "L": {
        axis: "x",
        direction: -1,
        callback: cubelet => cubelet.matrix.getGridPositionX(cubelet.size) === -1.5,
    },
    "l'": {
        axis: "x",
        direction: 1,
        callback: cubelet => cubelet.matrix.getGridPositionX(cubelet.size) === -0.5,
    },
    "l": {
        axis: "x",
        direction: -1,
        callback: cubelet => cubelet.matrix.getGridPositionX(cubelet.size) === -0.5,
    },
    "B": {
        axis: "z",
        direction: -1,
        callback: cubelet => cubelet.matrix.getGridPositionZ(cubelet.size) === -1.5,
    },
    "B'": {
        axis: "z",
        direction: 1,
        callback: cubelet => cubelet.matrix.getGridPositionZ(cubelet.size) === -1.5,
    },
    "b": {
        axis: "z",
        direction: -1,
        callback: cubelet => cubelet.matrix.getGridPositionZ(cubelet.size) === -0.5,
    },
    "b'": {
        axis: "z",
        direction: 1,
        callback: cubelet => cubelet.matrix.getGridPositionZ(cubelet.size) === -0.5,
    },
    "F": {
        axis: "z",
        direction: 1,
        callback: cubelet => cubelet.matrix.getGridPositionZ(cubelet.size) === 1.5,
    },
    "F'": {
        axis: "z",
        direction: -1,
        callback: cubelet => cubelet.matrix.getGridPositionZ(cubelet.size) === 1.5,
    },
    "f": {
        axis: "z",
        direction: 1,
        callback: cubelet => cubelet.matrix.getGridPositionZ(cubelet.size) === 0.5,
    },
    "f'": {
        axis: "z",
        direction: -1,
        callback: cubelet => cubelet.matrix.getGridPositionZ(cubelet.size) === 0.5,
    },
}
