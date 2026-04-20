/**
 * Represents a factory for constructing {@link Box3D} instances to represent a puzzle initial state.
 */
class PuzzleFactory {
    constructor() {
        throw new Error("This is a static class and cannot be instantiated");
    }

    /**
     * Creates an array of Box3D instances.
     * @param {CubeletData[]} cubeletsData - The objects representig the raw data of each Box3D.
     * @param {Object.<string, CubeletState>} state - The persistance state of each Box3D.
     * @returns {Box3D[]} The Box3D array.
     */
    static createBasicBoxes(cubeletsData, state) {
        const cubelets = [];
        cubeletsData.forEach(piece => {
            const id = piece.id;
            const type = piece.type;
            const position = piece.position;
            const dimension = piece.dimension;
            const extrovertedIds = piece.extrovertedIds;

            const cubelet = new Box3D(dimension);
            cubelet.setType(type);
            cubelet.setDataId(id, "box-id");
            cubelet.setExtrovertedIds(extrovertedIds); // face colors

            if (state[id]) { // If there is a move stored in localStorage
                const restoredMatrix = state[id].matrix;
                const matrix = new Matrix3D(restoredMatrix);
                cubelet.setMatrix(matrix);
                cubelet.setFaceIds(state[id].faceIds);
            }
            else { // From local object.
                cubelet.translateSelf(position.x, position.y, position.z);
            }
            cubelets.push(cubelet);
        });
        return cubelets;
    }
}