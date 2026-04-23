/**
 * Represents the raw data of a puzzle.
 */
class PuzzleBuilder {
    constructor() {
        throw new Error("This is a static class and cannot be instantiated");
    }

    /**
     * Creates a puzzle raw data structure for all cubelets.
     * Each cubelet is represented as an object with id, position, dimension, type, expansionFactor and the extrovertedIds.
     * Each cubelet raw data is a **cube**.
     * @param {BuildData} buildData - The puzzle build data.
     * @returns {CubeletData[]} An object containing all the cubelets.
     */
    static generateMultipleLayerCubeletsData = ({ order, offset = { x: 0, y: 0, z: 0 }, cubeletSize, indexToAxis, maxPositionFactor }) => {
        /** @type {CubeletData} */
        const cubeletsData = [];
        let id = 0;
        const indexDiff = order.d - order.h;
        for (let y = 0; y < order.d; y++) {
            for (let z = 0; z < order.h; z++) {
                for (let x = 0; x < order.w; x++) {
                    /** @type {number[]}*/
                    const extrovertedIds = [];

                    const posX = indexToAxis[x];
                    const posY = indexToAxis[y];
                    const posZ = indexToAxis[z];

                    const position = { x: posX + offset.x, y: posY + offset.y, z: posZ + offset.z };

                    if (indexToAxis[z] === maxPositionFactor) { extrovertedIds.push(0); }
                    if (indexToAxis[y] === -maxPositionFactor) { extrovertedIds.push(1); }
                    if (indexToAxis[x] === maxPositionFactor) { extrovertedIds.push(2); }
                    if (indexToAxis[z] === -maxPositionFactor) { extrovertedIds.push(3); }
                    if (indexToAxis[x] === -maxPositionFactor) { extrovertedIds.push(4); }
                    if (indexToAxis[y] === maxPositionFactor + indexDiff) { extrovertedIds.push(5); }

                    const idLength = extrovertedIds.length;
                    const type = idLength === 3 ? "corner" : idLength === 2 ? "edge" : idLength === 1 ? "center" : "core";

                    cubeletsData.push({
                        id: id++,
                        type: type,
                        position: position,
                        dimension: `size-${cubeletSize}`,
                        extrovertedIds: extrovertedIds,
                    });
                }
            }
        }
        return cubeletsData;
    }

    /**
     * Creates a puzzle raw data structure for all cubelets.
     * Each cubelet is represented as an object with id, position, dimension, type, expansionFactor and the extrovertedIds.
     * Each cubelet raw data is a **cube**.
     * @param {BuildData} buildData - The puzzle build data.
     * @returns {CubeletData[]} An object containing all the cubelets.
     */
    static generateSingleLayerCubeletsData = ({ order, offset = { x: 0, y: 0, z: 0 }, cubeletSize, indexToAxis, maxPositionFactor }) => {
        /** @type {CubeletData} */
        const cubeletsData = [];
        let id = 0;
        for (let z = 0; z < order.h; z++) {
            for (let x = 0; x < order.w; x++) {
                /** @type {number[]}*/
                const extrovertedIds = [];

                const posX = indexToAxis[x];
                const posY = -1;
                const posZ = indexToAxis[z];

                const position = { x: posX + offset.x, y: posY + offset.y, z: posZ + offset.z };

                // every cubelet has color on up and down faces (1, 5).
                extrovertedIds.push(1);
                extrovertedIds.push(5);
                if (indexToAxis[z] === maxPositionFactor) { extrovertedIds.push(0); }
                if (indexToAxis[x] === maxPositionFactor) { extrovertedIds.push(2); }
                if (indexToAxis[z] === -maxPositionFactor) { extrovertedIds.push(3); }
                if (indexToAxis[x] === -maxPositionFactor) { extrovertedIds.push(4); }

                const idLength = extrovertedIds.length;

                // the corners now have 4 colors instead of 3, the edges now have 3 colors instead of 2, and centers now have 2 colors instead of 1.
                const type = idLength === 4 ? "corner" : idLength === 3 ? "edge" : idLength === 2 ? "center" : idLength === 1 ? "core" : "none";

                cubeletsData.push({
                    id: id++,
                    type: type,
                    position: position,
                    dimension: `size-${cubeletSize}`,
                    extrovertedIds: extrovertedIds,
                });
            }
        }
        return cubeletsData;
    }

    /**
     * Creates a puzzle raw data structure containing all cubelets.
     * Each cubelet is represented as an object with id, position, dimension, type, expansionFactor and the extrovertedIds.
     * The value of each dimension could be different.
     * Each cubelet raw data is a **cuboid**.
     * @param {BuildData} buildData - The puzzle build data.
     * @returns {CubeletData[]} An object containing all the cubelets.
     */
    static generateIrregularCubeletsData = ({ order, offset = { x: 0, y: 0, z: 0 }, cubeletSize, indexToAxis, maxPositionFactor }) => {
        /** @type {CubeletData} */
        const cubeletsData = [];
        let id = 0;
        for (let y = 0; y < order.w; y++) {
            for (let z = 0; z < order.h; z++) {
                for (let x = 0; x < order.d; x++) {
                    /**
                     * @type {number[]}
                     */
                    const extrovertedIds = [];

                    const posX = indexToAxis[x];
                    const posY = indexToAxis[y];
                    const posZ = indexToAxis[z];

                    const posFactor = {
                        x: posX * -(cubeletSize / 3),
                        y: posY * (cubeletSize / 2),
                        z: posZ * (cubeletSize / 6)
                    }

                    const dimension = {
                        width: cubeletSize - posFactor.x,
                        height: cubeletSize - posFactor.y,
                        depth: cubeletSize - posFactor.z
                    };

                    const position = {
                        x: (cubeletSize - posFactor.x * 0.5) * posX,
                        y: (cubeletSize - posFactor.y * 0.5) * posY,
                        z: (cubeletSize - posFactor.z * 0.5) * posZ,
                    }

                    if (indexToAxis[z] === maxPositionFactor) { extrovertedIds.push(0); }
                    if (indexToAxis[y] === -maxPositionFactor) { extrovertedIds.push(1); }
                    if (indexToAxis[x] === maxPositionFactor) { extrovertedIds.push(2); }
                    if (indexToAxis[z] === -maxPositionFactor) { extrovertedIds.push(3); }
                    if (indexToAxis[x] === -maxPositionFactor) { extrovertedIds.push(4); }
                    if (indexToAxis[y] === maxPositionFactor) { extrovertedIds.push(5); }

                    const idLength = extrovertedIds.length;
                    const type = idLength === 3 ? "corner" : idLength === 2 ? "edge" : idLength === 1 ? "center" : "core";

                    cubeletsData.push({
                        id: id++,
                        type: type,
                        position: position,
                        dimension: dimension,
                        extrovertedIds: extrovertedIds,
                    });
                }
            }
        }
        return cubeletsData;
    }
}