/**
 * @type {Object.<string, BaseData>}
 */
const BUILD_DATA = {
    "2x2x2": {
        cubeletSize: 80,
        maxPositionFactor: 0.5,
        order: { w: 2, h: 2, d: 2, },
        indexToAxis: { 0: -0.5, 1: 0.5 },
    },
    "4x4x2": {
        cubeletSize: 54,
        maxPositionFactor: 1.5,
        order: { w: 4, h: 4, d: 2, },
        offset: { x: 0, y: 1, z: 0 },
        indexToAxis: { 0: -1.5, 1: -0.5, 2: 0.5, 3: 1.5 },
    },
    "3x3x1": {
        cubeletSize: 66,
        maxPositionFactor: 1,
        order: { w: 3, h: 3, d: 1, },
        offset: { x: 0, y: 1, z: 0 },
        indexToAxis: { 0: -1, 1: 0, 2: 1 },
    },
    "3x3x3": {
        cubeletSize: 60,
        maxPositionFactor: 1,
        order: { w: 3, h: 3, d: 3, },
        indexToAxis: { 0: -1, 1: 0, 2: 1 },
    },
    "4x4x4": {
        cubeletSize: 48,
        maxPositionFactor: 1.5,
        order: { w: 4, h: 4, d: 4, },
        indexToAxis: { 0: -1.5, 1: -0.5, 2: 0.5, 3: 1.5 },
    },
    "3x3x4": {
        cubeletSize: 52,
        maxPositionFactor: 1,
        order: { w: 3, h: 3, d: 4, },
        offset: { x: 0, y: -1, z: 0 },
        indexToAxis: { 0: -1, 1: 0, 2: 1, 3: 2, 4: 3 },
    },
    "3x3x5": {
        cubeletSize: 52,
        maxPositionFactor: 1,
        order: { w: 3, h: 3, d: 5, },
        offset: { x: 0, y: -1, z: 0 },
        indexToAxis: { 0: -1, 1: 0, 2: 1, 3: 2, 4: 3 },
    }
}