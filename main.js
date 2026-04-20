/** 
 |********************|
 |* Composition Root *|
 |********************|
 */

/**
 * The object containg the dynamic state for each puzzle. 
 * @type {Object.<string, PuzzleDynamicState>}
 */
const puzzlesDynamicState = {
    "cube2x2x2": {
        ref: new Cube2x2x2(),
        actions: {},
        cubeletOption: "",
        config: {
            appearance: "",
            matrix: {}
        }
    },
    "cube3x3x3": {
        ref: new Cube3x3x3(),
        actions: {},
        cubeletOption: "",
        config: {
            appearance: "",
            matrix: {}
        }
    },
    "mirror3x3x3": {
        ref: new Mirror3x3x3(),
        actions: {},
        cubeletOption: "",
        config: {
            appearance: "",
            matrix: {}
        }
    },
    "cube4x4x4": {
        ref: new Cube4x4x4(),
        actions: {},
        cubeletOption: "",
        config: {
            appearance: "",
            matrix: {}
        }
    },
    "cube3x3x5": {
        ref: new Cube3x3x5(),
        actions: {},
        cubeletOption: "",
        config: {
            appearance: "",
            matrix: {}
        }
    },
    "cube3x3x4": {
        ref: new Cube3x3x4(),
        actions: {},
        cubeletOption: "",
        config: {
            appearance: "",
            matrix: {}
        }
    },
}

/**
 * Scene ref where the puzzle is 3d rendered.
 */
const scene = new Scene(document.body);
const puzzleManager = new PuzzleManager(scene, puzzlesDynamicState);

/**
 * @type {ButtonGroupData}
 */
const puzzleButtonOptions = {
    name: "puzzles",
    title: "true",
    singleSelection: true,
    classList: ["fixed-position", "row-container"],
    btnGroupClassList: ["fixed-size", "scroll", "opaque-btns"],
    hover: false,
}

/**
 * @type {ButtonGroupData}
 */
const actionButtonOptions = {
    name: "actions",
    singleSelection: false,
    hover: true,
    title: false,
    classList: ["column-container"],
    btnGroupClassList: ["rounded-btns", "bg-btns", "opaque-btns"],
}

/**
 * @type {ButtonGroupData}
 */
const appearanceButtonOptions = {
    name: "appearances",
    singleSelection: true,
    hover: false,
    classList: ["column-container"],
    btnGroupClassList: ["rounded-btns", "bg-btns", "opaque-btns"],
}

/**
 * @type {ButtonGroupData}
 */
const cubeletButtonOptions = {
    name: "cubelets",
    singleSelection: true,
    classList: ["column-container", "opaque-btns"],
}

// button data.
const puzzleButtonData = {
    name: "puzzles",
    rawData:
        Object.keys(puzzlesDynamicState).map((key) => {
            return {
                name: key,
                icon: `./public/icons/puzzles/${key}.svg`,
                callback: () => {
                    puzzleManager.setCurrent(key);

                    menu.selectButton(key, "puzzles");
                    menu.selectButtonFromSubMenu(key, "appearances");

                    menu.replaceButtons("appearances", key);
                    menu.replaceButtons("cubelets", key);

                    menu.selectFromButtons(key, "appearances", puzzleManager.currentAppearance);
                    menu.selectFromButtons(key, "cubelets", puzzleManager.getSubMenuState("cubeletOption"));

                    menu.resetSubMenuSelection("actions");
                    menu.setSubMenuMultipleSelection("actions", puzzleManager.getSubMenuState("actions"));

                    document.title = ` ${puzzleManager.currentKey} | JxRCube`;
                },
            }
        })
}

const actionButtonData = {
    name: "actions",
    rawData: [
        {
            name: "numbers",
            callback: () => puzzleManager.addLabels(),
            icon: `./public/icons/actions/numbers.svg`
        },
        {
            name: "faces",
            callback: () => puzzleManager.displayFaceLabels(),
            icon: `./public/icons/actions/faces.svg`
        },
        {
            name: "direction",
            callback: () => puzzleManager.direction(),
            icon: `./public/icons/actions/direction.svg`
        },
        {
            name: "scramble",
            callback: () => puzzleManager.scramble(),
            icon: `./public/icons/actions/scramble.svg`
        },
        {
            name: "rotate",
            callback: () => puzzleManager.rotate(),
            icon: `./public/icons/actions/rotate.svg`
        },
        {
            name: "reset",
            callback: () => puzzleManager.reset(),
            icon: `./public/icons/actions/reset.svg`,
            toggle: false
        },
    ]
};

/**
 * The menu instance.
 */
const menu = new Menu({
    config: {
        className: "menu",
        closeBtnClassList: ["bg-btn", "rounded-btn", "opaque-btn"],
    },
    buttonGroupOptions: [
        puzzleButtonOptions,
        appearanceButtonOptions,
        actionButtonOptions,
        cubeletButtonOptions
    ],
    parent: document.body
});

/**
 * appearance and cubelets are unique for each puzzle.
 */
Object.entries(puzzlesDynamicState).forEach(([key, data]) => {
    menu.buildSubButtons({
        key: key,
        subMenuKey: "appearances",
        list: data.ref.appearanceNames,
        // icons: appearanceIcons[key],
        callback: (key) => puzzleManager.changeAppearance(key)
    });

    menu.buildSubButtons({
        key: key,
        subMenuKey: "cubelets",
        list: data.ref.cubeletOptions,
        icons: cubeletIcons[key],
        callback: (key) => puzzleManager.displayCubeletType(key)
    });
});

/**
 * Builds and stores the buttons into the menu instance.
 */
menu.buildButtons(puzzleButtonData);
menu.buildButtons(actionButtonData);

const puzzleState = new PuzzleState(document.body);

const puzzleController = new PuzzleController(
    puzzleState,
    puzzleManager,
    () => {
        // ui render.
        menu.renderGlobalButtons("puzzles");
        menu.renderGlobalButtons("actions");
        menu.renderSelectedButtons(puzzleManager.currentKey, "cubelets");
        menu.renderSelectedButtons(puzzleManager.currentKey, "appearances");
        // initial visual selection.
        menu.selectButton(puzzleManager.currentKey, "puzzles");
        menu.selectFromButtons(puzzleManager.currentKey, "cubelets", "all");
        menu.selectFromButtons(puzzleManager.currentKey, "appearances", puzzleManager.currentAppearance);
        // menu animation.
        menu.fadeIn({ delay: 700, duration: 300 });
        // document title.
        document.title = `${puzzleManager.currentKey} | JxRCube`;
    }
);

/**
 * A Dialog instance.
 */
new Dialog({
    options: { classList: ["rounded-btns", "bg-btns", "opaque-btns"] },
    content: dialogCards,
    openDialogBtnClassList: ["opaque-btn"],
    parent: document.body
});