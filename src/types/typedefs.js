/**
 * Defines a core data.
 * @typedef {Object} CoreData
 * @property {Object.<string, number>} list - The list of cores.
 * @property {string} label - The label.
 */

/**
 * Defines a 2d coordinates.
 * @typedef {Object} Coordinate
 * @property {number} x - The X coordinate.
 * @property {number} y - The Y coordinate.
 */

/**
 * Defines a cubelet state.
 * @typedef {Object} CubeletState
 * @property {Object.<string, number>} faceIds - The cubelet faceIds.
 * @property {Float32Array<ArrayBuffer>} matrix - The cubelet matrix.
*/

/**
 * Defines a puzzle data.
 * @typedef {Object} PuzzleData
 * @property {string} name - The name.
 * @property {Position} [offset] - The pieces offset.
 * @property {BaseData} BaseData - The base data.
 */

/**
 * Defines a rectangular prism zone.
 * @typedef {Object} Dimension
 * @property {number} width - The width in pixels.
 * @property {number} height - The height in pixels.
 * @property {number} depth - The depth in pixels.
 */

/**
 * Defines a 3D coordinates.
 * @typedef {Object} Position
 * @property {number} x - The X coordinate.
 * @property {number} y - The Y coordinate.
 * @property {number} z - The Z coordinate.
 */

/**
 * Defines the rotation angles.
 * @typedef {Object} Rotation
 * @property {number} x - Rotation around the X-axis.
 * @property {number} y - Rotation around the Y-axis.
 * @property {number} z - Rotation around the Z-axis.
 */

/**
 * Defines a prism raw data.
 * @typedef {Object} PrismData
 * @property {Dimension} dimension - The spatial dimensions.
 * @property {Position} position - The 3D coordinates.
 * @property {Rotation} rotation - The rotation angles.
 */

/**
 * Defines a button raw data.
 * @typedef {Object} ButtonData
 * @property {string} name - The name.
 * @property {string} icon - The icon url.
 * @property {boolean} toggle - Whether the button alternates visual state or not.
 * @property {function():void} callback - The callback.
 * @property {string[]|undefined} classList - A class list.
 */

/**
 * Defines a grid index.
 * @typedef {Object} Order
 * @property {number} w - The W index.
 * @property {number} h - The H index.
 * @property {number} d - The D index.
 */

/**
 * Defines an object containing the puzzle build data.
 * @typedef {Object} BuildData
 * @property {number} cubeletSize - The puzzle order.
 * @property {number} maxPositionFactor - The puzzle order.
 * @property {Order} order - The puzzle order.
 * @property {Position} offset - The cubelet type, (e.g., corner).
 * @property {Object.<string, number>} indexToAxis - The puzzle order.
 */

/**
 * Defines a puzzle base base data.
 * @typedef {Object} BaseData
 * @property {string} name - The name.
 * @property {CoreData} coreData - The core data.
 * @property {Object.<string, string>} appearanceNames - The appearance names.
 * @property {Object.<string, string>} cubeletOptions - The cubelet options.
 * @property {number} signExpansionFactor - The sign expansion factor for the sign 3d.
 */

/**
 * Defines the cubelet raw data.
 * @typedef {Object} CubeletData
 * @property {number} id - The cubelet id.
 * @property {string} type - The cubelet type, (e.g., corner).
 * @property {Position} position - The cubelet position.
 * @property {Dimension|string|number} dimension - The cubelet dimension.
 * @property {Object.<string, number>} extrovertedIds - The cubelet esxtroverted ids
 */

/**
 * Defines a coord vector.
 * @typedef {Object} CoordVector
 * @property {Vector3D} x - Vector in X-axis.
 * @property {Vector3D} y - Vector in Y-axis.
 */

/**
 * Defines a puzzle slice.
 * @typedef {Object} Slice
 * @property {string} axis - The axis.
 * @property {number} direction - The direction.
 * @property {function():void} callback - The filter callback.
 */

/**
 * Defines a moves map.
 * @typedef {Object} DirectionalMove
 * @property {string} cw - Clockwise direction
 * @property {string} ccw - Counterclockwise direction.  
 */

/**
 * Defines a face coord.
 * @typedef {Object} FaceCoord
 * @property {Object.<string, DirectionalMove>} x - Clockwise direction
 * @property {Object.<string, DirectionalMove>} y - Counterclockwise direction.  
 */

/**
 * Defines a puzzle persistant state.
 * @typedef {Object} PersistentState
 * @property {string} appearance - The width in pixels.
 * @property {Float32Array<ArrayBuffer>|Object.<string, number>} matrix - The puzzle matrix.
 */

/**
 * Defines a puzzle dynamic state.
 * @typedef {Object} PuzzleDynamicState
 * @property {Puzzle} ref - The puzzle ref.
 * @property {Object.<string, boolean>} controls - The controls state. 
 * @property {string} cubeletOption - The selected cubelet option.
 * @property {PersistentState} config - The confif of the selected puzzle.
 */

/**
 * Defines a sub menu options.
 * @typedef {Object} SubMenuOptions
 * @property {string} key - The puzzle key.
 * @property {string} subMenuKey - The sub menu key.
 * @property {Object.<string, string>} list - The items list.
 * @property {Object.<string, string>} icons - The icons list.
 * @property {function(string):void} callback - The callback.
 */

/**
 * Defines a button group options.
 * @typedef {Object} ButtonGroupData
 * @property {string} name - The width in pixels.
 * @property {string} [title] - The width in pixels.
 * @property {boolean} singleSelection - Whether the buttons can only be selected once at a time or not.
 * @property {string[]} classList - The class list.
 * @property {string[]} [btnGroupClassList] - The button group class list.
 * @property {boolean} [hover] - Whether the elements respond to hover events or not.
 */

/**
 * Defines a dialog data object.
 * @typedef {Object} DialogData
 * @property {Object.<string, string[]>} options - The dialog options.
 * @property {DialogCard[]} content - The dialog content.
 * @property {HTMLElement} parent - The parent element.
 * @property {string[]} openDialogBtnClassList - The open button class list.
 */

/**
 * Defines a dialog data object.
 * @typedef {Object} DialogCard
 * @property {string} title - The card title.
 * @property {string} description - The card description.
 */

/**
 * Definaes a sign 3d config.
 * @typedef {Object} Sign3DConfig
 * @property {Object.<string, string>} data - The data for each sign face.
 * @property {HTMLDivElement} parent - The parent element where the sign will be appended.
 * @property {number} tz - The distance of the face relative to its origin.
 */