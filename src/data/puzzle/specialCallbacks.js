/**
 * Filters all pieces to handle multi-layer rotations in shape-shifting puzzles. 
 * @type {Object.<string, function():void>}
 */
const SPECIAL_CALLBACKS = {
    "U": cubelet => cubelet.matrix.getGridPositionY(cubelet.size) < 0,
    "u": cubelet => cubelet.matrix.getGridPositionY(cubelet.size) < 0,

    "R": cubelet => cubelet.matrix.getGridPositionX(cubelet.size) > 0,
    "r": cubelet => cubelet.matrix.getGridPositionX(cubelet.size) > 0,

    "D": cubelet => cubelet.matrix.getGridPositionY(cubelet.size) > 0,
    "d": cubelet => cubelet.matrix.getGridPositionY(cubelet.size) > 0,

    "L": cubelet => cubelet.matrix.getGridPositionX(cubelet.size) < 0,
    "l": cubelet => cubelet.matrix.getGridPositionX(cubelet.size) < 0,

    "F": cubelet => cubelet.matrix.getGridPositionZ(cubelet.size) > 0,
    "f": cubelet => cubelet.matrix.getGridPositionZ(cubelet.size) > 0,

    "B": cubelet => cubelet.matrix.getGridPositionZ(cubelet.size) < 0,
    "b": cubelet => cubelet.matrix.getGridPositionZ(cubelet.size) < 0,

    "0": cubelet => false,
}