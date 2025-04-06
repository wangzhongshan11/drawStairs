/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main/main.ts":
/*!**************************!*\
  !*** ./src/main/main.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deActivateDrawStairsTool: () => (/* binding */ deActivateDrawStairsTool)
/* harmony export */ });
/* harmony import */ var _tools_DrawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools/DrawStairsTool/index */ "./src/main/tools/DrawStairsTool/index.ts");
/* harmony import */ var _tools_DrawStairsTool_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tools/DrawStairsTool/utils */ "./src/main/tools/DrawStairsTool/utils.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "./src/main/types.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const pluginUI = app.getPluginUI();
pluginUI.resize(360, 720);
pluginUI.mount();
let activatedCustomTool;
function onUIMessage(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (data.type === _types__WEBPACK_IMPORTED_MODULE_2__.MessageType.DrawStairViewMounted) {
                onPluginStartUp();
            }
            else if (data.type === _types__WEBPACK_IMPORTED_MODULE_2__.MessageType.ActivateDrawStairsTool) {
                // if (data.type === 'activateStraightStairsTool' || data.type === 'activateCircularStairsTool') {
                if (activatedCustomTool !== _tools_DrawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool) {
                    app.activateCustomTool(_tools_DrawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool, true);
                    activatedCustomTool = _tools_DrawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool;
                }
                // drawStairsTool.changeComponentType(data.componentType);
            }
            else if (data.type === _types__WEBPACK_IMPORTED_MODULE_2__.MessageType.DeActivateDrawStairsTool) {
                // } else if (data.type === 'deActivateStraightStairsTool' || data.type === 'deActivateCircularStairsTool') {
                deActivateDrawStairsTool();
            }
            else if (data.type === _types__WEBPACK_IMPORTED_MODULE_2__.MessageType.StairParamChangedByInput) {
                // if (activatedCustomTool === drawStairsTool) {
                _tools_DrawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool.changeStairParam(data.stairParam, data.changeParams);
                // }
            }
            else if (data.type === _types__WEBPACK_IMPORTED_MODULE_2__.MessageType.ParamChangedByInput) {
                // if (activatedCustomTool === drawStairsTool) {
                _tools_DrawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool.changeComponentParam(data.componentParam, data.changeParams);
                // }
            }
            else if (data.type === _types__WEBPACK_IMPORTED_MODULE_2__.MessageType.FocusComponentIndex) {
                // if (activatedCustomTool === drawStairsTool) {
                _tools_DrawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool.focusComponent(data.componentIndex);
                // }
            }
            else if (data.type === _types__WEBPACK_IMPORTED_MODULE_2__.MessageType.RemoveComponent) {
                // if (activatedCustomTool === drawStairsTool) {
                _tools_DrawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool.removeComponent(data.componentIndex);
                // }
            }
            else if (data.type === _types__WEBPACK_IMPORTED_MODULE_2__.MessageType.MaterialReplaceClick) {
                // if (activatedCustomTool === drawStairsTool) {
                _tools_DrawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool.onMaterialReplaceClick(data.changeParam, data.index);
                // }
            }
        }
        catch (error) {
            console.error(error);
            closePlugin();
        }
    });
}
function deActivateDrawStairsTool() {
    activatedCustomTool = undefined;
    app.deactivateCustomTool(_tools_DrawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool, false);
}
pluginUI.onMessage(onUIMessage);
const selection = app.getSelection();
selection.addObserver({
    onSelectionChange: () => {
        const allEntities = selection.getAllEntities();
        if (allEntities.length === 1 && (0,_tools_DrawStairsTool_utils__WEBPACK_IMPORTED_MODULE_1__.isKGroupInstance)(allEntities[0])) {
            _tools_DrawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool.clearTempShapes();
            _tools_DrawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool.setModel(allEntities[0]);
        }
        else if (allEntities.length) {
            const editPath = app.getActiveDesign().getEditPath();
            const editModel = _tools_DrawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool.getEditModel();
            if (!editModel || (editPath.length && (0,_tools_DrawStairsTool_utils__WEBPACK_IMPORTED_MODULE_1__.isPartOfEditModel)(editModel, editPath[editPath.length - 1]))) {
                _tools_DrawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool.clearTempShapes();
                if (activatedCustomTool !== _tools_DrawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool) {
                    pluginUI.postMessage({ type: _types__WEBPACK_IMPORTED_MODULE_2__.MessageType.PropertiesVisible, propertiesVisible: false }, '*');
                }
            }
        }
    }
});
function onPluginStartUp() {
    const allEntities = selection.getAllEntities();
    if (allEntities.length === 1 && (0,_tools_DrawStairsTool_utils__WEBPACK_IMPORTED_MODULE_1__.isKGroupInstance)(allEntities[0])) {
        _tools_DrawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool.setModel(allEntities[0]);
    }
    app.addObserver({
        onPluginClosed: () => {
        },
        onModelChanged: _tools_DrawStairsTool_utils__WEBPACK_IMPORTED_MODULE_1__.onModelChanged,
    });
}


/***/ }),

/***/ "./src/main/tools/DrawStairsTool/consts.ts":
/*!*************************************************!*\
  !*** ./src/main/tools/DrawStairsTool/consts.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AngleTolerance: () => (/* binding */ AngleTolerance),
/* harmony export */   DirectionAngleTolerance: () => (/* binding */ DirectionAngleTolerance),
/* harmony export */   DirectionX: () => (/* binding */ DirectionX),
/* harmony export */   DirectionY: () => (/* binding */ DirectionY),
/* harmony export */   DirectionZ: () => (/* binding */ DirectionZ),
/* harmony export */   LengthTolerance: () => (/* binding */ LengthTolerance),
/* harmony export */   StepCountLimit: () => (/* binding */ StepCountLimit),
/* harmony export */   TempLineColors: () => (/* binding */ TempLineColors),
/* harmony export */   TempLinePatterns: () => (/* binding */ TempLinePatterns),
/* harmony export */   dummyMatrix4: () => (/* binding */ dummyMatrix4),
/* harmony export */   dummyPoint3d: () => (/* binding */ dummyPoint3d),
/* harmony export */   dummyVector3d: () => (/* binding */ dummyVector3d),
/* harmony export */   getNewComponentParam: () => (/* binding */ getNewComponentParam),
/* harmony export */   getNewSegment: () => (/* binding */ getNewSegment)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/main/tools/DrawStairsTool/types.ts");

const dummyMatrix4 = GeomLib.createIdentityMatrix4();
const dummyVector3d = GeomLib.createVector3d(0, 0, 1);
const dummyPoint3d = GeomLib.createPoint3d(0, 0, 0);
const DirectionX = GeomLib.createVector3d(1, 0, 0);
const DirectionY = GeomLib.createVector3d(0, 1, 0);
const DirectionZ = GeomLib.createVector3d(0, 0, 1);
// const HeightTolerance: number = 5;
const LengthTolerance = 2;
const DirectionAngleTolerance = Math.PI / 36;
const AngleTolerance = Math.PI / 180;
const StepCountLimit = 100;
// const DefaultBoardThickness = 50;
const TempLineColors = {
    Stair: { r: 0, g: 0, b: 255 },
    Mold: { r: 13, g: 71, b: 161 },
    Handrail: { r: 0, g: 0, b: 0 },
    Inference: { r: 0, g: 0, b: 0 },
    Focus: { r: 255, g: 0, b: 0 },
};
const TempLinePatterns = {
    Handrail: KLinePattern.Dash,
    StairAndMold: KLinePattern.Solid,
    Inference: KLinePattern.Dash,
};
function getNewComponentParam(type, baseSegment, upward) {
    let startWidth = _types__WEBPACK_IMPORTED_MODULE_0__.DefaultStairParam.startWidth * (type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform ? 4 : 1);
    let endWidth = _types__WEBPACK_IMPORTED_MODULE_0__.DefaultStairParam.endWidth * (type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform ? 4 : 1);
    if (baseSegment) {
        const { param: { endWidth: baseSegmentEndWidth, type: baseSegmentType } } = baseSegment;
        if (type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform) {
            if (baseSegmentType === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform) {
                startWidth = baseSegmentEndWidth;
                endWidth = baseSegmentEndWidth;
            }
            else {
                startWidth = 4 * baseSegmentEndWidth;
                endWidth = 4 * baseSegmentEndWidth;
            }
        }
        else {
            if (baseSegmentType !== _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform) {
                startWidth = baseSegmentEndWidth;
                endWidth = baseSegmentEndWidth;
            }
        }
    }
    return Object.assign(Object.assign({}, _types__WEBPACK_IMPORTED_MODULE_0__.DefaultComponentParam), { index: baseSegment ? baseSegment.param.index + 1 : 0, type,
        startWidth,
        endWidth, upward: upward === undefined ? _types__WEBPACK_IMPORTED_MODULE_0__.DefaultComponentParam.upward : upward, offsetWidth: 0, withOffset: false, platformLengthLocked: false });
}
function getNewSegment(type, baseSegment, upward) {
    const param = getNewComponentParam(type, baseSegment, upward);
    return {
        start: dummyPoint3d,
        end: dummyPoint3d,
        startLocked: false,
        endLocked: false,
        startHeight: 0,
        endHeight: 0,
        stairShape: {
            stepCount: 0,
            vertices: [],
            tempLines: [],
        },
        moldShape: {
            stepCount: 0,
            vertices: [],
            tempLines: [],
        },
        cornerShape: {
            stepCount: 0,
            vertices: [],
            tempLines: [],
        },
        cornerMoldShape: {
            stepCount: 0,
            vertices: [],
            tempLines: [],
        },
        nextComponents: Array.from({ length: 6 }, _ => new Set()),
        param,
        componentDirectionType: _types__WEBPACK_IMPORTED_MODULE_0__.ComponentDirectionType.Front,
    };
}


/***/ }),

/***/ "./src/main/tools/DrawStairsTool/index.ts":
/*!************************************************!*\
  !*** ./src/main/tools/DrawStairsTool/index.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DrawStairsTool: () => (/* binding */ DrawStairsTool),
/* harmony export */   drawStairsTool: () => (/* binding */ drawStairsTool)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/main/tools/DrawStairsTool/types.ts");
/* harmony import */ var _tempMeshUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tempMeshUtils */ "./src/main/tools/DrawStairsTool/tempMeshUtils.ts");
/* harmony import */ var _meshUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./meshUtils */ "./src/main/tools/DrawStairsTool/meshUtils.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./src/main/tools/DrawStairsTool/utils.ts");
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./consts */ "./src/main/tools/DrawStairsTool/consts.ts");
/* harmony import */ var _main_main__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../main/main */ "./src/main/main.ts");
/* harmony import */ var _main_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../main/types */ "./src/main/types.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







const design = app.getActiveDesign();
const selection = app.getSelection();
const pluginUI = app.getPluginUI();
const appView = app.getActiveView();
const toolHelper = app.getToolHelper();
const DefaultFocusedComponentIndex = -1;
class DrawStairsTool {
    constructor() {
        // private componentParam: ComponentParam = { ...DefaultComponentParam };
        this.drawing = false;
        this.focusedComponentIndex = DefaultFocusedComponentIndex;
        this.segments = [];
        this.stairParam = Object.assign({}, _types__WEBPACK_IMPORTED_MODULE_0__.DefaultStairParam);
        this.onMaterialReplaceItemClick = (changeParamType, index, isDelete) => {
            const that = this;
            return (materialId = '', bgid = '') => __awaiter(this, void 0, void 0, function* () {
                const loadMaterialRes = yield design.loadMaterial(materialId);
                if (!loadMaterialRes.isSuccess) {
                    return;
                }
                const instancePath = that.editModel ? design.getEditPathsToGroupInstance(that.editModel.parent.instance) : [];
                if (changeParamType === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.ComponentMaterial) {
                    const theSegment = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.getSegmentByIndex)(that.segments, index);
                    if (theSegment && index !== undefined) {
                        let stairParamChanged = false;
                        if (that.drawing) {
                            theSegment.param.material = { materialId, bgid };
                            if (theSegment.param.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform) {
                                const platformSegments = this.segments.filter(seg => seg.param.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform);
                                if (platformSegments.length === 1) {
                                    this.stairParam.platformMaterial = { materialId, bgid };
                                    stairParamChanged = true;
                                }
                            }
                            else {
                                const stairSegments = this.segments.filter(seg => seg.param.type !== _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform);
                                if (stairSegments.length === 1) {
                                    this.stairParam.stairMaterial = { materialId, bgid };
                                    stairParamChanged = true;
                                }
                            }
                            pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.ParamChangedByDraw, componentParam: Object.assign({}, theSegment.param), stairParam: stairParamChanged ? this.stairParam : undefined }, '*');
                        }
                        else if (that.editModel) {
                            const theInstance = that.editModel.stairs.get(index) || that.editModel.platforms.get(index);
                            if (theInstance && instancePath) {
                                (0,_utils__WEBPACK_IMPORTED_MODULE_3__.startOperation)();
                                let operationSuccess = true;
                                operationSuccess = operationSuccess && (yield design.activateEditPath([...instancePath[0], that.editModel.parent.instance])).isSuccess;
                                if (isDelete) {
                                    operationSuccess = operationSuccess && design.clearMaterial([theInstance.instance]);
                                }
                                else {
                                    operationSuccess = operationSuccess && design.assignMaterialForEntities([theInstance.instance], materialId, bgid);
                                }
                                operationSuccess = operationSuccess && (yield design.activateEditPath(instancePath[0])).isSuccess;
                                if (operationSuccess) {
                                    (0,_utils__WEBPACK_IMPORTED_MODULE_3__.commitOperation)();
                                    theSegment.param.material = { materialId, bgid };
                                    if (theSegment.param.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform) {
                                        const platformSegments = this.segments.filter(seg => seg.param.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform);
                                        if (platformSegments.length === 1) {
                                            this.stairParam.platformMaterial = isDelete ? undefined : { materialId, bgid };
                                            stairParamChanged = true;
                                        }
                                    }
                                    else {
                                        const stairSegments = this.segments.filter(seg => seg.param.type !== _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform);
                                        if (stairSegments.length === 1) {
                                            this.stairParam.stairMaterial = isDelete ? undefined : { materialId, bgid };
                                            stairParamChanged = true;
                                        }
                                    }
                                    pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.ParamChangedByDraw, componentParam: Object.assign({}, theSegment.param), stairParam: stairParamChanged ? this.stairParam : undefined }, '*');
                                }
                                else {
                                    (0,_utils__WEBPACK_IMPORTED_MODULE_3__.abortOperation)();
                                }
                            }
                        }
                    }
                }
                else if (changeParamType === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.StairMaterial || changeParamType === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.PlatformMaterial) {
                    if (!that.editModel) {
                        if (changeParamType === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.StairMaterial) {
                            that.stairParam.stairMaterial = { materialId, bgid };
                            for (const segment of this.segments) {
                                if (segment.param.type !== _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform) {
                                    segment.param.material = { materialId, bgid };
                                }
                            }
                        }
                        else {
                            that.stairParam.platformMaterial = { materialId, bgid };
                            for (const segment of this.segments) {
                                if (segment.param.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform) {
                                    segment.param.material = { materialId, bgid };
                                }
                            }
                        }
                        pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.StairParamChangedByDraw, stairParam: that.stairParam, componentParams: this.segments.map(seg => (Object.assign({}, seg.param))) }, '*');
                    }
                    else if (instancePath) {
                        (0,_utils__WEBPACK_IMPORTED_MODULE_3__.startOperation)();
                        let operationSuccess = true;
                        operationSuccess = operationSuccess && (yield design.activateEditPath([...instancePath[0], that.editModel.parent.instance])).isSuccess;
                        const components = changeParamType === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.StairMaterial ? that.editModel.stairs : that.editModel.platforms;
                        const componentInstances = [];
                        for (const [ind, instanceData] of components) {
                            const theSegment = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.getSegmentByIndex)(that.segments, ind);
                            if (theSegment) {
                                componentInstances.push(instanceData.instance);
                            }
                        }
                        if (isDelete) {
                            operationSuccess = operationSuccess && design.clearMaterial(componentInstances);
                        }
                        else {
                            operationSuccess = operationSuccess && design.assignMaterialForEntities(componentInstances, materialId, bgid);
                        }
                        operationSuccess = operationSuccess && (yield design.activateEditPath(instancePath[0])).isSuccess;
                        if (operationSuccess) {
                            (0,_utils__WEBPACK_IMPORTED_MODULE_3__.commitOperation)();
                            if (changeParamType === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.StairMaterial) {
                                that.stairParam.stairMaterial = { materialId, bgid };
                                for (const segment of this.segments) {
                                    if (segment.param.type !== _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform) {
                                        segment.param.material = { materialId, bgid };
                                    }
                                }
                            }
                            else {
                                that.stairParam.platformMaterial = { materialId, bgid };
                                for (const segment of this.segments) {
                                    if (segment.param.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform) {
                                        segment.param.material = { materialId, bgid };
                                    }
                                }
                            }
                            pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.StairParamChangedByDraw, stairParam: that.stairParam, componentParams: this.segments.map(seg => (Object.assign({}, seg.param))) }, '*');
                        }
                        else {
                            (0,_utils__WEBPACK_IMPORTED_MODULE_3__.abortOperation)();
                        }
                    }
                }
                else if (changeParamType === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.HandrailRailMaterial || changeParamType === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.HandrailColumnMaterial) {
                    if (!that.editModel) {
                        if (changeParamType === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.HandrailRailMaterial) {
                            that.stairParam.handrail.rail.material = { materialId, bgid };
                        }
                        else {
                            that.stairParam.handrail.column.material = { materialId, bgid };
                        }
                        pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.StairParamChangedByDraw, stairParam: that.stairParam }, '*');
                    }
                    else if (instancePath && that.editModel.handrail) {
                        (0,_utils__WEBPACK_IMPORTED_MODULE_3__.startOperation)();
                        let operationSuccess = true;
                        operationSuccess = operationSuccess && (yield design.activateEditPath([...instancePath[0], that.editModel.parent.instance, that.editModel.handrail.handrailInstance.instance])).isSuccess;
                        const components = changeParamType === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.HandrailRailMaterial ? that.editModel.handrail.railInstances : that.editModel.handrail.columnInstances;
                        if (isDelete) {
                            operationSuccess = operationSuccess && design.clearMaterial([...components.values()].map(c => c.instance));
                        }
                        else {
                            operationSuccess = operationSuccess && design.assignMaterialForEntities([...components.values()].map(c => c.instance), materialId, bgid);
                        }
                        operationSuccess = operationSuccess && (yield design.activateEditPath(instancePath[0])).isSuccess;
                        if (operationSuccess) {
                            (0,_utils__WEBPACK_IMPORTED_MODULE_3__.commitOperation)();
                            if (changeParamType === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.HandrailRailMaterial) {
                                that.stairParam.handrail.rail.material = { materialId, bgid };
                            }
                            else {
                                that.stairParam.handrail.column.material = { materialId, bgid };
                            }
                            pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.StairParamChangedByDraw, stairParam: that.stairParam }, '*');
                        }
                        else {
                            (0,_utils__WEBPACK_IMPORTED_MODULE_3__.abortOperation)();
                        }
                    }
                }
            });
        };
    }
    onToolActive() {
        (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.loadDefaultMaterials)();
        // console.log((window as any).origin);
        toolHelper.setExcludeInferenceTypes([
            KEntityType.Face, KEntityType.Edge, KEntityType.AuxiliaryBoundedCurve, KEntityType.AuxiliaryLine, KEntityType.AuxiliaryVertex,
            KEntityType.GroupInstance, KEntityType.Vertex, KArchFaceType.NonPlanar, KArchFaceType.Planar,
        ]);
        const firstSegment = (0,_consts__WEBPACK_IMPORTED_MODULE_4__.getNewSegment)(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.StraightStair, undefined, this.stairParam.upward);
        firstSegment.startLocked = false;
        // this.stairParam = DefaultStairParam;
        pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.DrawStairModelSettled, componentParams: [firstSegment.param], stairParam: this.stairParam, newStair: true, isDrawing: true }, '*');
        this.segments = [firstSegment];
        this.drawing = true;
        this.clearTempShapes();
        this.editModel = undefined;
        this.focusedComponentIndex = 0;
    }
    onToolDeactive() {
        toolHelper.setExcludeInferenceTypes([]);
        this.clear();
        if (this.editModel) {
            selection.add([this.editModel.parent.instance]);
        }
        else {
            pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.LeaveDrawStairsTool }, '*');
        }
        (0,_main_main__WEBPACK_IMPORTED_MODULE_5__.deActivateDrawStairsTool)();
    }
    onMouseMove(event, inferenceResult) {
        var _a, _b;
        // console.log('onMouseMove');
        if (inferenceResult) {
            // const { startWidth, endWidth, platformThickness } = this.componentParam;
            const position = inferenceResult.position;
            if (this.segments.length) {
                const lastSegment = this.segments[this.segments.length - 1];
                // console.log('lastSegment.startLocked', lastSegment.startLocked);
                lastSegment.param.modelEditing = false;
                if (lastSegment.startLocked) {
                    lastSegment.end = position;
                    this.drawTempComponent(lastSegment, false, true);
                }
                else {
                    if (this.segments.length > 1) {
                        const prevSegment = this.focusedComponentIndex === lastSegment.param.index ? this.segments[this.segments.length - 2] : (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.getSegmentByIndex)(this.segments, this.focusedComponentIndex);
                        // must be true
                        if ((prevSegment === null || prevSegment === void 0 ? void 0 : prevSegment.param.type) === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform) {
                            const { moldShape: { vertices, tempLines } } = prevSegment;
                            if (((_a = lastSegment.baseComponent) === null || _a === void 0 ? void 0 : _a.line3dIndex) !== undefined) {
                                prevSegment.nextComponents.forEach(inds => inds.delete(lastSegment.param.index));
                            }
                            let closestPoint;
                            let minDistance = 0;
                            tempLines.forEach((line, index) => {
                                const lineSeg3d = GeomLib.createLineSegment3d(vertices[line[0]], vertices[line[1]]);
                                const thePoint = lineSeg3d.getClosestPoint(position);
                                const curDistance = thePoint.distanceTo(position);
                                if (!closestPoint || curDistance < minDistance) {
                                    minDistance = curDistance;
                                    closestPoint = thePoint;
                                    lastSegment.start = closestPoint;
                                    // lastSegment.baseLineSeg3d = { start: vertices[line[0]], end: vertices[line[1]] };
                                    lastSegment.baseComponent = { componentIndex: prevSegment.param.index, line3dIndex: index, line3d: { start: vertices[line[0]], end: vertices[line[1]] } };
                                }
                            });
                            // const prevSegment = getSegmentByIndex(this.segments, lastSegment.baseComponent.componentIndex);
                            if (((_b = lastSegment.baseComponent) === null || _b === void 0 ? void 0 : _b.line3dIndex) !== undefined) {
                                prevSegment.nextComponents[lastSegment.baseComponent.line3dIndex].add(lastSegment.param.index);
                            }
                            this.drawPickStartTempShapes(position, lastSegment.start, lastSegment);
                        }
                    }
                    else {
                        lastSegment.start = position;
                    }
                }
                if (lastSegment.param.type == _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform && !lastSegment.param.platformLengthLocked) {
                    pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.ParamChangedByDraw, componentParam: Object.assign({}, lastSegment.param) }, '*');
                }
            }
        }
    }
    onLButtonUp(event, inferenceResult) {
        var _a;
        // console.log('onLButtonUp');
        if (inferenceResult) {
            // const position = inferenceResult.position;
            if (this.segments.length) {
                const lastSegment = this.segments[this.segments.length - 1];
                if (lastSegment.startLocked) {
                    console.log('push segment');
                    const { start, end, param: { type }, circleTangent } = lastSegment;
                    if (type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.CircularStair && !circleTangent) {
                        lastSegment.circleTangent = end.subtracted(start).normalized();
                        this.focusComponent(lastSegment.param.index);
                    }
                    else {
                        lastSegment.endLocked = true;
                        const lastParam = lastSegment.param;
                        if (lastParam.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.CircularStair && !lastSegment.circularSide) {
                            lastParam.type = _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.StraightStair;
                            lastSegment.circleTangent = undefined;
                        }
                        const nextType = lastParam.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform ? _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.StraightStair : _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform;
                        const nextSegment = Object.assign(Object.assign({}, (0,_consts__WEBPACK_IMPORTED_MODULE_4__.getNewSegment)(nextType, lastSegment, this.stairParam.upward)), { start: lastSegment.end, end: lastSegment.end, startLocked: lastParam.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform ? false : true, startHeight: lastSegment.endHeight, endHeight: lastSegment.endHeight });
                        const { moldShape: { vertices, tempLines } } = lastSegment;
                        if (!lastSegment.baseComponent) {
                            // lastSegment.baseLineSeg3d = { start: vertices[0], end: vertices[1] };
                            lastSegment.baseComponent = { line3d: { start: vertices[1], end: vertices[0] } };
                        }
                        else {
                            const baseSegment = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.getSegmentByIndex)(this.segments, lastSegment.baseComponent.componentIndex);
                            if (baseSegment && ((_a = lastSegment.baseComponent) === null || _a === void 0 ? void 0 : _a.line3dIndex) !== undefined) {
                                baseSegment.nextComponents[lastSegment.baseComponent.line3dIndex].add(lastParam.index);
                            }
                        }
                        // nextSegment.baseLineSeg3d = { start: vertices[vertices.length - 1], end: vertices[vertices.length - 2] };
                        if (nextSegment.startLocked) {
                            lastSegment.nextComponents[0].add(nextSegment.param.index);
                        }
                        nextSegment.baseComponent = {
                            componentIndex: lastParam.index,
                            line3dIndex: lastParam.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform ? tempLines.length - 1 : 0,
                            line3d: { start: vertices[vertices.length - 1], end: vertices[vertices.length - 2] }
                        };
                        lastParam.modelEditing = true;
                        pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.ParamChangedByDraw, componentParam: lastParam }, '*');
                        this.segments.push(nextSegment);
                        if (this.focusedComponentIndex !== lastParam.index) {
                            const focusedSegment = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.getSegmentByIndex)(this.segments, this.focusedComponentIndex);
                            if (focusedSegment) {
                                this.drawTempComponent(focusedSegment);
                            }
                        }
                        this.focusedComponentIndex = nextSegment.param.index;
                        pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.ComponentAdded, componentParam: Object.assign({}, nextSegment.param) }, '*');
                    }
                }
                else {
                    lastSegment.startLocked = true;
                    this.clearPickStartTempShapes(lastSegment);
                    this.drawTempComponent(lastSegment);
                    this.focusComponent(lastSegment.param.index);
                }
            }
        }
    }
    drawPickStartTempShapes(position, closestPoint, theSegment) {
        if (theSegment.pickStartTempShapeId) {
            appView.clearTemporaryShapesByIds([theSegment.pickStartTempShapeId]);
        }
        if (closestPoint) {
            const pickStartTempShapeId = appView.drawLines([position, closestPoint], { color: _consts__WEBPACK_IMPORTED_MODULE_4__.TempLineColors.Inference, depthTest: false, pattern: _consts__WEBPACK_IMPORTED_MODULE_4__.TempLinePatterns.Inference, gapSize: 50, dashSize: 50 });
            if (pickStartTempShapeId === null || pickStartTempShapeId === void 0 ? void 0 : pickStartTempShapeId.id) {
                theSegment.pickStartTempShapeId = pickStartTempShapeId.id;
            }
        }
    }
    clearPickStartTempShapes(theSegment) {
        if (theSegment.pickStartTempShapeId) {
            appView.clearTemporaryShapesByIds([theSegment.pickStartTempShapeId]);
        }
    }
    drawTempComponent(theSegment, focused = false, drawHandrail = false) {
        var _a, _b;
        if (theSegment.startLocked) {
            this.generateSegmentShape(theSegment, this.drawing);
            const { stairShape: { vertices: stairVertices, tempLines: stairTempLines }, moldShape: { vertices: moldVertices, tempLines: moldTempLines }, cornerShape: { vertices: cornerVertices, tempLines: cornerTempLines }, cornerMoldShape: { vertices: cornerMoldVertices, tempLines: cornerMoldTempLines }, } = theSegment;
            const tempLinePoints = [];
            const moldTempLinePoints = [];
            if (this.drawing) {
                for (const stairTempLine of stairTempLines) {
                    tempLinePoints.push([stairVertices[stairTempLine[0]], stairVertices[stairTempLine[1]]]);
                }
                for (const cornerTempLine of cornerTempLines) {
                    tempLinePoints.push([cornerVertices[cornerTempLine[0]], cornerVertices[cornerTempLine[1]]]);
                }
            }
            for (const moldTempLine of moldTempLines) {
                moldTempLinePoints.push([moldVertices[moldTempLine[0]], moldVertices[moldTempLine[1]]]);
            }
            for (const cornerMoldTempLine of cornerMoldTempLines) {
                moldTempLinePoints.push([cornerMoldVertices[cornerMoldTempLine[0]], cornerMoldVertices[cornerMoldTempLine[1]]]);
            }
            if ((_a = theSegment.tempShapeId) === null || _a === void 0 ? void 0 : _a.length) {
                appView.clearTemporaryShapesByIds(theSegment.tempShapeId);
                theSegment.tempShapeId = [];
            }
            if (tempLinePoints.length) {
                const stairColor = focused ? _consts__WEBPACK_IMPORTED_MODULE_4__.TempLineColors.Focus : _consts__WEBPACK_IMPORTED_MODULE_4__.TempLineColors.Stair;
                const tempShapeId = appView.drawPolylines(tempLinePoints, { color: stairColor, depthTest: false, pattern: _consts__WEBPACK_IMPORTED_MODULE_4__.TempLinePatterns.StairAndMold });
                if (tempShapeId === null || tempShapeId === void 0 ? void 0 : tempShapeId.ids) {
                    theSegment.tempShapeId = [...tempShapeId.ids];
                }
            }
            if (moldTempLinePoints.length) {
                const moldColor = focused ? _consts__WEBPACK_IMPORTED_MODULE_4__.TempLineColors.Focus : _consts__WEBPACK_IMPORTED_MODULE_4__.TempLineColors.Mold;
                const moldTempShapeId = appView.drawPolylines(moldTempLinePoints, { color: moldColor, depthTest: this.drawing, pattern: _consts__WEBPACK_IMPORTED_MODULE_4__.TempLinePatterns.StairAndMold });
                if (moldTempShapeId === null || moldTempShapeId === void 0 ? void 0 : moldTempShapeId.ids) {
                    if ((_b = theSegment.tempShapeId) === null || _b === void 0 ? void 0 : _b.length) {
                        theSegment.tempShapeId.push(...moldTempShapeId.ids);
                    }
                    else {
                        theSegment.tempShapeId = [...moldTempShapeId.ids];
                    }
                }
            }
            if (drawHandrail) {
                this.drawHandrails();
            }
        }
    }
    drawHandrails(stairParam = this.stairParam) {
        var _a, _b;
        const prevHandrailTempShapeIds = (_a = this.handrailCollection) === null || _a === void 0 ? void 0 : _a.tempShapeId;
        this.generateHandrailShape(stairParam);
        if (prevHandrailTempShapeIds === null || prevHandrailTempShapeIds === void 0 ? void 0 : prevHandrailTempShapeIds.length) {
            appView.clearTemporaryShapesByIds(prevHandrailTempShapeIds);
        }
        const handrails = (_b = this.handrailCollection) === null || _b === void 0 ? void 0 : _b.handrails;
        const tempLinePoints = [];
        if (this.handrailCollection && (handrails === null || handrails === void 0 ? void 0 : handrails.length)) {
            for (const { rail, columns } of handrails) {
                for (let i = 0; i < rail.length - 1; i++) {
                    const railPoint = rail[i];
                    const railNextPoint = rail[i + 1];
                    tempLinePoints.push([railPoint, railNextPoint]);
                }
                tempLinePoints.push(...columns);
            }
            const handrailTempShapeIds = appView.drawPolylines(tempLinePoints, { color: _consts__WEBPACK_IMPORTED_MODULE_4__.TempLineColors.Handrail, depthTest: false, pattern: _consts__WEBPACK_IMPORTED_MODULE_4__.TempLinePatterns.Handrail });
            if (handrailTempShapeIds === null || handrailTempShapeIds === void 0 ? void 0 : handrailTempShapeIds.ids) {
                this.handrailCollection.tempShapeId = handrailTempShapeIds.ids;
            }
        }
    }
    clearTempShapes(theSegment) {
        var _a;
        if (theSegment) {
            if ((_a = theSegment.tempShapeId) === null || _a === void 0 ? void 0 : _a.length) {
                appView.clearTemporaryShapesByIds(theSegment.tempShapeId);
                theSegment.tempShapeId = [];
            }
        }
        else {
            appView.clearTemporaryShapes();
        }
    }
    focusComponent(componentIndex) {
        var _a, _b, _c;
        if (componentIndex === this.focusedComponentIndex) {
            return;
        }
        if (this.segments.length) {
            const lastSegment = this.segments[this.segments.length - 1];
            const lastSegmentIndex = lastSegment.param.index;
            // if (componentIndex !== this.focusedComponentIndex) {
            const newFocusedSegment = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.getSegmentByIndex)(this.segments, componentIndex);
            const oldFocusedSegment = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.getSegmentByIndex)(this.segments, this.focusedComponentIndex);
            if (newFocusedSegment) {
                if (this.drawing && !lastSegment.endLocked && componentIndex !== lastSegmentIndex) {
                    const { param: { type: newFocusedType }, moldShape: { vertices: newFocusedVertices, tempLines: newFocusedTempLines } } = newFocusedSegment;
                    const { start } = lastSegment;
                    this.clearPickStartTempShapes(lastSegment);
                    if (newFocusedType === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform) {
                        this.clearTempShapes(lastSegment);
                        if (lastSegment.param.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform) {
                            const cachedIndex = lastSegment.param.index;
                            lastSegment.param = (0,_consts__WEBPACK_IMPORTED_MODULE_4__.getNewComponentParam)(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.StraightStair, newFocusedSegment, this.stairParam.upward);
                            lastSegment.param.index = cachedIndex;
                            pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.ParamChangedByDraw, componentParam: Object.assign({}, lastSegment.param) }, '*');
                        }
                        if (oldFocusedSegment && oldFocusedSegment !== newFocusedSegment) {
                            oldFocusedSegment.nextComponents.forEach(inds => inds.delete(lastSegment.param.index));
                        }
                        if (((_a = lastSegment.baseComponent) === null || _a === void 0 ? void 0 : _a.line3dIndex) !== undefined) {
                            // newFocusedSegment.nextComponents.forEach(inds => inds.delete(lastSegment.param.index));
                            const baseSegment = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.getSegmentByIndex)(this.segments, lastSegment.baseComponent.componentIndex);
                            if (baseSegment) {
                                baseSegment.nextComponents.forEach(inds => inds.delete(lastSegment.param.index));
                            }
                        }
                        let closestPoint;
                        let minDistance = 0;
                        newFocusedTempLines.forEach((line, index) => {
                            const lineSeg3d = GeomLib.createLineSegment3d(newFocusedVertices[line[0]], newFocusedVertices[line[1]]);
                            const thePoint = lineSeg3d.getClosestPoint(start);
                            const curDistance = thePoint.distanceTo(start);
                            if (!closestPoint || curDistance < minDistance) {
                                minDistance = curDistance;
                                closestPoint = thePoint;
                                lastSegment.start = closestPoint;
                                // lastSegment.baseLineSeg3d = { start: newFocusedVertices[line[0]], end: newFocusedVertices[line[1]] };
                                lastSegment.baseComponent = { componentIndex: newFocusedSegment.param.index, line3dIndex: index, line3d: { start: newFocusedVertices[line[0]], end: newFocusedVertices[line[1]] } };
                            }
                        });
                        if (((_b = lastSegment.baseComponent) === null || _b === void 0 ? void 0 : _b.line3dIndex) !== undefined) {
                            newFocusedSegment.nextComponents[lastSegment.baseComponent.line3dIndex].add(lastSegment.param.index);
                        }
                        lastSegment.startLocked = false;
                        lastSegment.circleTangent = undefined;
                        lastSegment.startHeight = newFocusedSegment.endHeight;
                        this.drawPickStartTempShapes(start, lastSegment.start, lastSegment);
                    }
                    else {
                        if (!newFocusedSegment.nextComponents[0].size) {
                            // this.clearTempShapes(lastSegment);
                            if (oldFocusedSegment && oldFocusedSegment !== newFocusedSegment) {
                                oldFocusedSegment.nextComponents.forEach(inds => inds.delete(lastSegment.param.index));
                            }
                            if (((_c = lastSegment.baseComponent) === null || _c === void 0 ? void 0 : _c.line3dIndex) !== undefined) {
                                // newFocusedSegment.nextComponents.forEach(inds => inds.delete(lastSegment.param.index));
                                const baseSegment = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.getSegmentByIndex)(this.segments, lastSegment.baseComponent.componentIndex);
                                if (baseSegment) {
                                    baseSegment.nextComponents.forEach(inds => inds.delete(lastSegment.param.index));
                                }
                            }
                            lastSegment.start = newFocusedSegment.end.clone();
                            lastSegment.startLocked = true;
                            lastSegment.startHeight = newFocusedSegment.endHeight;
                            // lastSegment.baseLineSeg3d = { start: newFocusedVertices[newFocusedVertices.length - 1], end: newFocusedVertices[newFocusedVertices.length - 2] };
                            lastSegment.baseComponent = { componentIndex: newFocusedSegment.param.index, line3dIndex: 0, line3d: { start: newFocusedVertices[newFocusedVertices.length - 1], end: newFocusedVertices[newFocusedVertices.length - 2] } };
                            newFocusedSegment.nextComponents[0].add(lastSegment.param.index);
                            lastSegment.circleTangent = undefined;
                            this.drawTempComponent(lastSegment);
                        }
                        // else {
                        //     lastSegment.startLocked = false;
                        //     lastSegment.circleTangent = undefined;
                        // }
                    }
                }
                if ((this.drawing && componentIndex !== lastSegmentIndex) || !this.drawing) {
                    this.drawTempComponent(newFocusedSegment, this.drawing, this.drawing);
                }
            }
            if (((this.drawing && this.focusedComponentIndex !== lastSegmentIndex) || (!this.drawing && this.focusedComponentIndex !== componentIndex)) && oldFocusedSegment) {
                if (this.drawing) {
                    this.drawTempComponent(oldFocusedSegment);
                }
                else {
                    this.clearTempShapes(oldFocusedSegment);
                }
            }
            // }
            this.focusedComponentIndex = componentIndex;
        }
    }
    removeComponent(componentIndex) {
        var _a;
        if (this.segments.length) {
            const theIndex = this.segments.findIndex(seg => seg.param.index === componentIndex);
            if (theIndex > -1) {
                const theSegment = this.segments[theIndex];
                if (this.drawing) {
                    if ((_a = theSegment.tempShapeId) === null || _a === void 0 ? void 0 : _a.length) {
                        appView.clearTemporaryShapesByIds(theSegment.tempShapeId);
                    }
                    this.drawHandrails();
                }
                else if (this.editModel) {
                    const theInstance = this.editModel.stairs.get(componentIndex) || this.editModel.platforms.get(componentIndex);
                    if (theInstance) {
                        this.editModel.stairs.delete(componentIndex);
                        this.editModel.platforms.delete(componentIndex);
                        design.removeGroupInstance(theInstance.instance);
                    }
                }
                this.segments.splice(theIndex, 1);
                // to clear relations
                const baseComponent = theSegment.baseComponent;
                const baseSegment = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.getSegmentByIndex)(this.segments, baseComponent === null || baseComponent === void 0 ? void 0 : baseComponent.componentIndex);
                if (baseSegment && (baseComponent === null || baseComponent === void 0 ? void 0 : baseComponent.line3dIndex) !== undefined) {
                    // const theInd = baseSegment.nextComponents[baseComponent.line3dIndex].findIndex(i => i === theSegment.param.index);
                    // if (theInd > -1) {
                    baseSegment.nextComponents[baseComponent.line3dIndex].delete(theSegment.param.index);
                    // }
                }
                const nextComponents = theSegment.nextComponents;
                for (const nextSegmentInds of nextComponents) {
                    if (nextSegmentInds.size) {
                        for (const nextSegInd of nextSegmentInds) {
                            const nextSegment = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.getSegmentByIndex)(this.segments, nextSegInd);
                            if (nextSegment && nextSegment.baseComponent) {
                                nextSegment.baseComponent.componentIndex = undefined;
                                nextSegment.baseComponent.line3dIndex = undefined;
                            }
                        }
                    }
                }
                if (this.segments.length) {
                    if (this.focusedComponentIndex === componentIndex) {
                        this.focusedComponentIndex = this.segments[this.segments.length - 1].param.index;
                    }
                }
                else {
                    this.editModel = undefined;
                    this.focusedComponentIndex = 0;
                }
            }
        }
    }
    onMaterialReplaceClick(changeParamType, index) {
        app.getApplicationUI().toggleMaterialReplacePanel(true, this.onMaterialReplaceItemClick(changeParamType, index));
    }
    changeStairParam(stairParam, changeParamTypes) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function* () {
            // this.stairParam = stairParam
            if (!this.segments.length) {
                return;
            }
            const instancePath = this.editModel ? design.getEditPathsToGroupInstance(this.editModel.parent.instance) : [];
            const lastSegment = this.segments[this.segments.length - 1];
            let stairPraamString = '';
            if (changeParamTypes.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.WidthProportional) > -1 || changeParamTypes.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.StepProportional) > -1 ||
                changeParamTypes.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.PlatformLengthLocked) > -1) {
                this.stairParam = stairParam;
            }
            else if (changeParamTypes.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.HorizontalStep) > -1 || changeParamTypes.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.VerticalStep) > -1 ||
                changeParamTypes.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.StartWidth) > -1 || changeParamTypes.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.EndWidth) > -1 ||
                changeParamTypes.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.Upward) > -1 ||
                changeParamTypes.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.PlatformThickness) > -1) {
                let reGenerateSegments = this.segments;
                if (changeParamTypes.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.Upward) > -1) {
                    reGenerateSegments = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.changeStairUpward)(reGenerateSegments[0], reGenerateSegments, stairParam.upward, true) || reGenerateSegments;
                }
                else if (changeParamTypes.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.HorizontalStep) > -1 || changeParamTypes.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.VerticalStep) > -1) {
                    reGenerateSegments = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.changeStairStep)(reGenerateSegments[0], this.segments, stairParam.horizontalStep, stairParam.verticalStep, true, false) || reGenerateSegments;
                }
                else {
                    reGenerateSegments = this.segments.filter(seg => changeParamTypes.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.PlatformThickness) > -1 ? seg.param.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform : seg.param.type !== _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform);
                }
                if (reGenerateSegments.length) {
                    for (const reGenerateSegment of reGenerateSegments) {
                        for (const changeParamType of changeParamTypes) {
                            reGenerateSegment.param[changeParamType] = stairParam[changeParamType];
                        }
                    }
                    const parentTransform = this.editModel ? this.editModel.parent.instance.getTransform() : undefined;
                    const oldStairParam = this.stairParam;
                    const oldComponentParams = new Map(this.segments.map(seg => ([seg.param.index, Object.assign({}, seg.param)])));
                    this.stairParam = stairParam;
                    let operationSuccess = true;
                    if (!this.drawing && this.editModel) {
                        (0,_utils__WEBPACK_IMPORTED_MODULE_3__.startOperation)();
                        stairPraamString = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.stringifyStairParam)(stairParam);
                        operationSuccess = operationSuccess && !!((_a = this.editModel.parent.instance.getGroupDefinition()) === null || _a === void 0 ? void 0 : _a.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.StairParamKey, stairPraamString).isSuccess);
                        if (instancePath.length) {
                            operationSuccess = operationSuccess && (yield design.activateEditPath([...instancePath[0], this.editModel.parent.instance])).isSuccess;
                        }
                    }
                    for (const reGenerateSegment of reGenerateSegments) {
                        if (changeParamTypes.length === 1 && changeParamTypes[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.PlatformThickness) {
                            reGenerateSegment.param.platformThickness = this.stairParam.platformThickness;
                        }
                        else {
                            for (const changeParamType of changeParamTypes) {
                                reGenerateSegment.param[changeParamType] = this.stairParam[changeParamType];
                            }
                        }
                        if (this.drawing) {
                            // this.stairParam = stairParam;
                            this.drawTempComponent(reGenerateSegment, reGenerateSegment.param.index === this.focusedComponentIndex && reGenerateSegment.param.index !== lastSegment.param.index);
                        }
                        else if (this.editModel) {
                            const { param: { index, type } } = reGenerateSegment;
                            const theInstance = this.editModel.stairs.get(index) || this.editModel.platforms.get(index);
                            if (theInstance) {
                                this.generateSegmentShape(reGenerateSegment);
                                const theMeshes = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.generateMeshes)([reGenerateSegment]);
                                if (theMeshes.length) {
                                    if (operationSuccess) {
                                        operationSuccess = operationSuccess && design.removeGroupInstance(theInstance.instance).isSuccess;
                                        if (operationSuccess) {
                                            const newInstance = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.buildComponentInstance)(reGenerateSegment, this.segments, parentTransform);
                                            operationSuccess = operationSuccess && !!newInstance;
                                            if (newInstance) {
                                                if (type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform) {
                                                    this.editModel.platforms.set(index, { instance: newInstance, definitionKey: ((_b = newInstance.getGroupDefinition()) === null || _b === void 0 ? void 0 : _b.getKey()) || '', instanceKey: newInstance.getKey() });
                                                }
                                                else {
                                                    this.editModel.stairs.set(index, { instance: newInstance, definitionKey: ((_c = newInstance.getGroupDefinition()) === null || _c === void 0 ? void 0 : _c.getKey()) || '', instanceKey: newInstance.getKey() });
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    if (this.drawing) {
                        this.drawHandrails();
                        pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.StairParamChangedByDraw, stairParam: this.stairParam, componentParams: this.segments.map(seg => (Object.assign({}, seg.param))) }, '*');
                    }
                    else if (!this.drawing && this.editModel) {
                        this.generateHandrailShape(stairParam);
                        if ((_d = this.handrailCollection) === null || _d === void 0 ? void 0 : _d.handrails.length) {
                            if (this.editModel.handrail) {
                                operationSuccess = operationSuccess && design.removeGroupInstance(this.editModel.handrail.handrailInstance.instance).isSuccess;
                                this.editModel.handrail = undefined;
                            }
                            const handrailInstancesData = yield (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.buildHandrailInstance)(stairParam, (_e = this.handrailCollection) === null || _e === void 0 ? void 0 : _e.handrails, this.editModel.parent.instance.getTransform());
                            operationSuccess = operationSuccess && handrailInstancesData !== undefined;
                            if (handrailInstancesData) {
                                this.editModel.handrail = handrailInstancesData;
                            }
                        }
                        if (instancePath.length) {
                            operationSuccess = operationSuccess && (yield design.activateEditPath(instancePath[0])).isSuccess;
                        }
                        const parentInstance = this.editModel.parent.instance;
                        if (operationSuccess) {
                            (0,_utils__WEBPACK_IMPORTED_MODULE_3__.commitOperation)();
                            // this.stairParam = stairParam;
                            pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.StairParamChangedByDraw, stairParam: this.stairParam, componentParams: this.segments.map(seg => (Object.assign({}, seg.param))) }, '*');
                        }
                        else {
                            (0,_utils__WEBPACK_IMPORTED_MODULE_3__.abortOperation)();
                            this.stairParam = oldStairParam;
                            for (const segment of this.segments) {
                                const oldSegmentParam = oldComponentParams.get(segment.param.index);
                                if (oldSegmentParam) {
                                    segment.param = oldSegmentParam;
                                }
                            }
                            pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.StairParamChangedByDraw, stairParam: this.stairParam }, '*');
                        }
                        selection.add([parentInstance]);
                    }
                }
            }
            else if (changeParamTypes.length === 1 && changeParamTypes[0].startsWith(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.Handrail)) {
                if (this.drawing) {
                    this.stairParam = stairParam;
                    this.drawHandrails();
                }
                else if (this.editModel) {
                    this.generateHandrailShape(stairParam);
                    let operationSuccess = true;
                    (0,_utils__WEBPACK_IMPORTED_MODULE_3__.startOperation)();
                    stairPraamString = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.stringifyStairParam)(stairParam);
                    operationSuccess = operationSuccess && !!((_f = this.editModel.parent.instance.getGroupDefinition()) === null || _f === void 0 ? void 0 : _f.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.StairParamKey, stairPraamString).isSuccess);
                    if (instancePath.length) {
                        operationSuccess = operationSuccess && (yield design.activateEditPath([...instancePath[0], this.editModel.parent.instance])).isSuccess;
                    }
                    if (this.editModel.handrail) {
                        operationSuccess = operationSuccess && design.removeGroupInstance(this.editModel.handrail.handrailInstance.instance).isSuccess;
                        this.editModel.handrail = undefined;
                    }
                    if ((_g = this.handrailCollection) === null || _g === void 0 ? void 0 : _g.handrails.length) {
                        const handrailInstancesData = yield (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.buildHandrailInstance)(stairParam, (_h = this.handrailCollection) === null || _h === void 0 ? void 0 : _h.handrails, this.editModel.parent.instance.getTransform());
                        operationSuccess = operationSuccess && handrailInstancesData !== undefined;
                        if (handrailInstancesData) {
                            this.editModel.handrail = handrailInstancesData;
                        }
                    }
                    if (instancePath.length) {
                        operationSuccess = operationSuccess && (yield design.activateEditPath([...instancePath[0]])).isSuccess;
                    }
                    const parentInstance = this.editModel.parent.instance;
                    if (operationSuccess) {
                        (0,_utils__WEBPACK_IMPORTED_MODULE_3__.commitOperation)();
                        this.stairParam = stairParam;
                        pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.StairParamChangedByDraw, stairParam: this.stairParam }, '*');
                    }
                    else {
                        (0,_utils__WEBPACK_IMPORTED_MODULE_3__.abortOperation)();
                        pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.StairParamChangedByDraw, stairParam: this.stairParam }, '*');
                    }
                    selection.add([parentInstance]);
                }
            }
            else if (!stairParam.stairMaterial && changeParamTypes.length === 0 && changeParamTypes[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.StairMaterial) {
                yield this.onMaterialReplaceItemClick(changeParamTypes[0], undefined, true)();
            }
            else if (!stairParam.platformMaterial && changeParamTypes.length === 0 && changeParamTypes[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.PlatformLength) {
                yield this.onMaterialReplaceItemClick(changeParamTypes[0], undefined, true)();
            }
            else if (!stairParam.handrail.rail.material && changeParamTypes.length === 0 && changeParamTypes[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.HandrailRailMaterial) {
                yield this.onMaterialReplaceItemClick(changeParamTypes[0], undefined, true)();
            }
            else if (!stairParam.handrail.column.material && changeParamTypes.length === 0 && changeParamTypes[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.HandrailColumnMaterial) {
                yield this.onMaterialReplaceItemClick(changeParamTypes[0], undefined, true)();
            }
        });
    }
    changeComponentParam(componentParam, changeParamTypes) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.segments.length)
                return;
            const theSegment = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.getSegmentByIndex)(this.segments, componentParam.index);
            const lastSegment = this.segments[this.segments.length - 1];
            if (theSegment) {
                componentParam.modelEditing = true;
                // theSegment.param = componentParam;
                if (!(0,_tempMeshUtils__WEBPACK_IMPORTED_MODULE_1__.isCircularStair)(theSegment)) {
                    theSegment.circleTangent = undefined;
                }
                if (changeParamTypes.length === 0 && changeParamTypes[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.ComponentMaterial && !componentParam.material) {
                    this.onMaterialReplaceItemClick(changeParamTypes[0], componentParam.index, true);
                }
                else if (changeParamTypes.length === 1 && (changeParamTypes[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.StepProportional ||
                    changeParamTypes[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.WidthProportional ||
                    changeParamTypes[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.PlatformLengthLocked)) {
                    theSegment.param = componentParam;
                }
                else {
                    const oldParam = theSegment.param;
                    theSegment.param = componentParam;
                    let reGenerateSegments = [theSegment];
                    if (changeParamTypes.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.Upward) > -1) {
                        reGenerateSegments = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.changeStairUpward)(theSegment, this.segments, theSegment.param.upward, false, true) || reGenerateSegments;
                    }
                    else if (changeParamTypes.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.HorizontalStep) > -1 || changeParamTypes.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.VerticalStep) > -1) {
                        reGenerateSegments = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.changeStairStep)(theSegment, this.segments, componentParam.horizontalStep, componentParam.verticalStep, false, true) || reGenerateSegments;
                    }
                    if (reGenerateSegments.length) {
                        let operationSuccess = true;
                        const instancePath = this.editModel ? design.getEditPathsToGroupInstance(this.editModel.parent.instance) : [];
                        if (!this.drawing && this.editModel) {
                            (0,_utils__WEBPACK_IMPORTED_MODULE_3__.startOperation)();
                            if (instancePath.length) {
                                operationSuccess = operationSuccess && (yield design.activateEditPath([...instancePath[0], this.editModel.parent.instance])).isSuccess;
                            }
                        }
                        const parentTransform = this.editModel ? this.editModel.parent.instance.getTransform() : undefined;
                        for (const reGenerateSegment of reGenerateSegments) {
                            if (this.drawing) {
                                this.drawTempComponent(reGenerateSegment, reGenerateSegment.param.index === this.focusedComponentIndex && reGenerateSegment.param.index !== lastSegment.param.index);
                            }
                            else if (this.editModel) {
                                const { param: { index, type } } = reGenerateSegment;
                                const theInstance = this.editModel.stairs.get(index) || this.editModel.platforms.get(index);
                                if (theInstance) {
                                    this.generateSegmentShape(reGenerateSegment);
                                    const theMeshes = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.generateMeshes)([reGenerateSegment]);
                                    if (theMeshes.length) {
                                        if (operationSuccess) {
                                            operationSuccess = operationSuccess && design.removeGroupInstance(theInstance.instance).isSuccess;
                                            if (operationSuccess) {
                                                const newInstance = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.buildComponentInstance)(reGenerateSegment, this.segments, parentTransform);
                                                operationSuccess = operationSuccess && !!newInstance;
                                                if (newInstance) {
                                                    if (type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform) {
                                                        this.editModel.platforms.set(index, { instance: newInstance, definitionKey: ((_a = newInstance.getGroupDefinition()) === null || _a === void 0 ? void 0 : _a.getKey()) || '', instanceKey: newInstance.getKey() });
                                                    }
                                                    else {
                                                        this.editModel.stairs.set(index, { instance: newInstance, definitionKey: ((_b = newInstance.getGroupDefinition()) === null || _b === void 0 ? void 0 : _b.getKey()) || '', instanceKey: newInstance.getKey() });
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                        let stairParamChanged = false;
                        if (this.drawing) {
                            this.drawHandrails();
                            if (changeParamTypes[0] !== _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.Type && changeParamTypes[0] !== _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.PlatformLength) {
                                const theSegments = this.segments.filter(seg => (seg.param.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform) === (changeParamTypes[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.PlatformThickness));
                                if (theSegments.length === 1) {
                                    for (const changeParamType of changeParamTypes) {
                                        this.stairParam[changeParamType] = theSegment.param[changeParamType];
                                    }
                                    stairParamChanged = true;
                                }
                            }
                            if (stairParamChanged) {
                                pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.ParamChangedByDraw, componentParam: Object.assign({}, theSegment.param), stairParam: stairParamChanged ? this.stairParam : undefined }, '*');
                            }
                        }
                        else if (this.editModel) {
                            this.generateHandrailShape();
                            if (this.stairParam.handrail.support) {
                                if (this.editModel.handrail) {
                                    operationSuccess = operationSuccess && design.removeGroupInstance(this.editModel.handrail.handrailInstance.instance).isSuccess;
                                }
                                if ((_c = this.handrailCollection) === null || _c === void 0 ? void 0 : _c.handrails.length) {
                                    const handrailInstancesData = yield (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.buildHandrailInstance)(this.stairParam, (_d = this.handrailCollection) === null || _d === void 0 ? void 0 : _d.handrails, parentTransform);
                                    operationSuccess = operationSuccess && handrailInstancesData !== undefined;
                                    if (handrailInstancesData) {
                                        this.editModel.handrail = handrailInstancesData;
                                    }
                                }
                            }
                            if (instancePath.length) {
                                operationSuccess = operationSuccess && (yield design.activateEditPath(instancePath[0])).isSuccess;
                            }
                            const parentInstance = this.editModel.parent.instance;
                            if (operationSuccess) {
                                (0,_utils__WEBPACK_IMPORTED_MODULE_3__.commitOperation)();
                                // theSegment.param = componentParam;
                                if (changeParamTypes[0] !== _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.Type && changeParamTypes[0] !== _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.PlatformLength) {
                                    const theSegments = this.segments.filter(seg => (seg.param.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform) === (changeParamTypes[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.PlatformThickness));
                                    if (theSegments.length === 1) {
                                        for (const changeParamType of changeParamTypes) {
                                            this.stairParam[changeParamType] = theSegment.param[changeParamType];
                                        }
                                        stairParamChanged = true;
                                    }
                                }
                                pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.ParamChangedByDraw, componentParam: Object.assign({}, theSegment.param), stairParam: stairParamChanged ? this.stairParam : undefined }, '*');
                            }
                            else {
                                (0,_utils__WEBPACK_IMPORTED_MODULE_3__.abortOperation)();
                                theSegment.param = oldParam;
                                pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.ParamChangedByDraw, componentParam: Object.assign({}, theSegment.param) }, '*');
                            }
                            selection.add([parentInstance]);
                        }
                    }
                }
            }
        });
    }
    tryCommit() {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            const meshes = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.generateMeshes)(this.segments);
            if (meshes.length) {
                (0,_utils__WEBPACK_IMPORTED_MODULE_3__.startOperation)();
                const newInstances = [];
                const stairsChild = new Map();
                const platformChild = new Map();
                const validSegments = [];
                let operationSuccess = true;
                for (const segment of this.segments) {
                    if (!segment.mesh)
                        continue;
                    if (!operationSuccess) {
                        (0,_utils__WEBPACK_IMPORTED_MODULE_3__.abortOperation)();
                        return;
                    }
                    const newInstance = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.buildComponentInstance)(segment, this.segments);
                    operationSuccess = operationSuccess && !!newInstance;
                    if (newInstance) {
                        newInstances.push(newInstance);
                        if (segment.param.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform) {
                            platformChild.set(segment.param.index, { instance: newInstance, definitionKey: ((_a = newInstance.getGroupDefinition()) === null || _a === void 0 ? void 0 : _a.getKey()) || '', instanceKey: newInstance.getKey() });
                        }
                        else {
                            stairsChild.set(segment.param.index, { instance: newInstance, definitionKey: ((_b = newInstance.getGroupDefinition()) === null || _b === void 0 ? void 0 : _b.getKey()) || '', instanceKey: newInstance.getKey() });
                        }
                        segment.param.platformLengthLocked = true;
                        segment.param.stepProportional = true;
                        segment.param.widthProportional = true;
                        segment.param.modelEditing = true;
                        validSegments.push(segment);
                    }
                }
                let handrailInstanceData;
                if ((_c = this.handrailCollection) === null || _c === void 0 ? void 0 : _c.handrails.length) {
                    const handrailInstancesDataRes = yield (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.buildHandrailInstance)(this.stairParam, (_d = this.handrailCollection) === null || _d === void 0 ? void 0 : _d.handrails);
                    operationSuccess = operationSuccess && handrailInstancesDataRes !== undefined;
                    if (handrailInstancesDataRes) {
                        newInstances.push(handrailInstancesDataRes.handrailInstance.instance);
                        handrailInstanceData = handrailInstancesDataRes;
                    }
                }
                if (newInstances.length && operationSuccess) {
                    const parentInstance = (_e = design.makeGroup([], newInstances, [])) === null || _e === void 0 ? void 0 : _e.addedInstance;
                    operationSuccess = operationSuccess && !!parentInstance;
                    const parentDef = parentInstance === null || parentInstance === void 0 ? void 0 : parentInstance.getGroupDefinition();
                    if (parentInstance && parentDef) {
                        operationSuccess = operationSuccess && parentDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.StairModelKey, _types__WEBPACK_IMPORTED_MODULE_0__.ModelValue).isSuccess;
                        const stairParamString = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.stringifyStairParam)(this.stairParam);
                        operationSuccess = operationSuccess && parentDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.StairParamKey, stairParamString).isSuccess;
                        if (this.stairParam.stairMaterial) {
                            const stairMaterialString = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.stringifyMaterial)(this.stairParam.stairMaterial);
                            operationSuccess = operationSuccess && parentDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.StairMaterialKey, stairMaterialString).isSuccess;
                        }
                        if (this.stairParam.platformMaterial) {
                            const platformMaterialString = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.stringifyMaterial)(this.stairParam.platformMaterial);
                            operationSuccess = operationSuccess && parentDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.PlatformMaterialKey, platformMaterialString).isSuccess;
                        }
                        if (this.stairParam.handrail.support && this.stairParam.handrail.rail.material) {
                            const railMaterialString = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.stringifyMaterial)(this.stairParam.handrail.rail.material);
                            operationSuccess = operationSuccess && parentDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.RailMaterialKey, railMaterialString).isSuccess;
                        }
                        if (this.stairParam.handrail.support && this.stairParam.handrail.column.material) {
                            const columnMaterialString = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.stringifyMaterial)(this.stairParam.handrail.column.material);
                            operationSuccess = operationSuccess && parentDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.ColumnMaterialKey, columnMaterialString).isSuccess;
                        }
                        if (operationSuccess) {
                            (0,_utils__WEBPACK_IMPORTED_MODULE_3__.commitOperation)();
                            this.editModel = {
                                parent: { instance: parentInstance, definitionKey: ((_f = parentInstance.getGroupDefinition()) === null || _f === void 0 ? void 0 : _f.getKey()) || '', instanceKey: parentInstance.getKey() },
                                stairs: stairsChild,
                                platforms: platformChild,
                                handrail: handrailInstanceData,
                            };
                            this.segments = validSegments;
                            this.drawing = false;
                            this.drawTempComponent(validSegments[0], true);
                            pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.DrawStairModelSettled, componentParams: this.segments.map(seg => (Object.assign({}, seg.param))), stairParam: this.stairParam, isDrawing: false }, '*');
                            return;
                        }
                    }
                }
                (0,_utils__WEBPACK_IMPORTED_MODULE_3__.abortOperation)();
            }
        });
    }
    getEditModel() {
        return this.editModel;
    }
    setModel(groupInstance) {
        var _a, _b, _c;
        if (this.editModel && (0,_utils__WEBPACK_IMPORTED_MODULE_3__.isPartOfEditModel)(this.editModel, groupInstance)) {
            pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.PropertiesVisible, propertiesVisible: true }, '*');
            if (this.segments.length) {
                this.focusComponent(this.focusedComponentIndex);
            }
            return;
        }
        this.editModel = undefined;
        const groupDef = groupInstance.getGroupDefinition();
        if (groupInstance && groupDef) {
            const stairModelProperty = groupDef.getCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.StairModelKey);
            const stairParamProperty = groupDef.getCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.StairParamKey);
            const stairParam = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.parseStairParam)(stairParamProperty);
            const stairMaterialProperty = groupDef.getCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.StairMaterialKey);
            const stairMaterial = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.parseMaterial)(stairMaterialProperty);
            if (stairMaterial) {
                stairParam.stairMaterial = stairMaterial;
            }
            const platformMaterialProperty = groupDef.getCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.PlatformMaterialKey);
            const platformMaterial = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.parseMaterial)(platformMaterialProperty);
            if (platformMaterial) {
                stairParam.platformMaterial = platformMaterial;
            }
            const railMaterialProperty = groupDef.getCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.RailMaterialKey);
            const railMaterial = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.parseMaterial)(railMaterialProperty);
            if (railMaterial) {
                stairParam.handrail.rail.material = railMaterial;
            }
            const columnMaterialProperty = groupDef.getCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.ColumnMaterialKey);
            const columnMaterial = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.parseMaterial)(columnMaterialProperty);
            if (columnMaterial) {
                stairParam.handrail.column.material = columnMaterial;
            }
            if (stairModelProperty === _types__WEBPACK_IMPORTED_MODULE_0__.ModelValue) {
                const segments = [];
                const subGroupInstances = groupDef.getSubGroupInstances();
                const editModel = {
                    parent: { instance: groupInstance, definitionKey: ((_a = groupInstance.getGroupDefinition()) === null || _a === void 0 ? void 0 : _a.getKey()) || '', instanceKey: groupInstance.getKey() },
                    stairs: new Map(),
                    platforms: new Map(),
                };
                for (const subInstance of subGroupInstances) {
                    const subDef = subInstance.getGroupDefinition();
                    if (subDef) {
                        const handrailProperty = subDef.getCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.HandrailModelKey);
                        if (handrailProperty === _types__WEBPACK_IMPORTED_MODULE_0__.ModelValue) {
                            const handrailInstancesData = {
                                handrailInstance: { instance: subInstance, instanceKey: subInstance.getKey(), definitionKey: subDef.getKey() },
                                railInstances: [],
                                columnInstances: [],
                            };
                            const handrailSubGroupInstances = subDef.getSubGroupInstances();
                            for (const handrailSubInstance of handrailSubGroupInstances) {
                                const handrailSubDef = handrailSubInstance.getGroupDefinition();
                                if (handrailSubDef) {
                                    const railProperty = handrailSubDef.getCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.RailModelKey);
                                    const columnProperty = handrailSubDef.getCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.ColumnModelKey);
                                    if (railProperty === _types__WEBPACK_IMPORTED_MODULE_0__.ModelValue) {
                                        handrailInstancesData.railInstances.push({ instance: handrailSubInstance, instanceKey: handrailSubInstance.getKey(), definitionKey: handrailSubDef.getKey() });
                                    }
                                    else if (columnProperty === _types__WEBPACK_IMPORTED_MODULE_0__.ModelValue) {
                                        handrailInstancesData.columnInstances.push({ instance: handrailSubInstance, instanceKey: handrailSubInstance.getKey(), definitionKey: handrailSubDef.getKey() });
                                    }
                                }
                            }
                            editModel.handrail = handrailInstancesData;
                        }
                        else {
                            // const componentIndexValue = parseInt(subDef.getCustomProperty(ComponentIndexKey));
                            // if (isFinite(componentIndexValue)) {
                            const param = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.parseComponentParam)(subDef.getCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamKey));
                            const startEnd = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.parseStartEnd)(subDef.getCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.StartEndKey));
                            const baseLineSeg3d = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.parseLineSeg3d)(subDef.getCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.BaseLineSeg3dKey));
                            const baseComponent = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.parseBaseComponent)(subDef.getCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.BaseComponentKey));
                            const circleTangent = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.parseVector3d)(subDef.getCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.CircleTangentKey));
                            if (param && startEnd && baseLineSeg3d) {
                                const segment = Object.assign(Object.assign({}, (0,_consts__WEBPACK_IMPORTED_MODULE_4__.getNewSegment)(param.type)), { start: startEnd.start, end: startEnd.end, startHeight: startEnd.startHeight, endHeight: startEnd.endHeight, baseComponent: { componentIndex: baseComponent === null || baseComponent === void 0 ? void 0 : baseComponent.componentIndex, line3dIndex: baseComponent === null || baseComponent === void 0 ? void 0 : baseComponent.line3dIndex, line3d: baseLineSeg3d }, circleTangent,
                                    param, startLocked: true, endLocked: true });
                                segments.push(segment);
                                if (param.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform) {
                                    editModel.platforms.set(param.index, { instance: subInstance, definitionKey: ((_b = subInstance.getGroupDefinition()) === null || _b === void 0 ? void 0 : _b.getKey()) || '', instanceKey: subInstance.getKey() });
                                }
                                else {
                                    editModel.stairs.set(param.index, { instance: subInstance, definitionKey: ((_c = subInstance.getGroupDefinition()) === null || _c === void 0 ? void 0 : _c.getKey()) || '', instanceKey: subInstance.getKey() });
                                }
                            }
                        }
                        // }
                    }
                }
                if (segments.length) {
                    segments.sort((a, b) => a.param.index - b.param.index);
                    segments.forEach(s => (0,_tempMeshUtils__WEBPACK_IMPORTED_MODULE_1__.generateShape)(s, false));
                    (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.buildSegmentRelations)(segments);
                    this.segments = segments;
                    this.editModel = editModel;
                    this.stairParam = stairParam;
                    // this.drawTempComponent(segments[0], true);
                    this.focusComponent(segments[0].param.index);
                    pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.DrawStairModelSettled, componentParams: this.segments.map(seg => (Object.assign({}, seg.param))), stairParam: this.stairParam, isDrawing: false }, '*');
                }
            }
        }
    }
    clearEditModel() {
        this.editModel = undefined;
        this.segments = [];
        this.handrailCollection = undefined;
        this.focusedComponentIndex = DefaultFocusedComponentIndex;
        appView.clearTemporaryShapes();
        pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.DrawStairModelSettled, isDrawing: false }, '*');
    }
    clear() {
        appView.clearTemporaryShapes();
        // this.componentParam = { ...DefaultComponentParam };
        // this.segments = [];
        this.drawing = false;
        this.focusedComponentIndex = DefaultFocusedComponentIndex;
        this.stairParam = Object.assign({}, _types__WEBPACK_IMPORTED_MODULE_0__.DefaultStairParam);
        // this.editModel = undefined;
    }
    onRButtonUp(event, inferenceResult) {
        if (this.segments.length) {
            const lastSegment = this.segments[this.segments.length - 1];
            if (lastSegment.startLocked) {
                const { param, circularSide, moldShape: { vertices } } = lastSegment;
                if (!lastSegment.baseComponent) {
                    // lastSegment.baseLineSeg3d = { start: vertices[0], end: vertices[1] };
                    lastSegment.baseComponent = { line3d: { start: vertices[1], end: vertices[0] } };
                }
                if (param.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.CircularStair && circularSide === undefined) {
                    param.type = _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.StraightStair;
                    lastSegment.circleTangent = undefined;
                }
                this.tryCommit().then(() => {
                    (0,_main_main__WEBPACK_IMPORTED_MODULE_5__.deActivateDrawStairsTool)();
                });
            }
        }
    }
    onLButtonDbClick(event, inferenceResult) {
        ;
    }
    allowUsingInference() {
        return true;
    }
    onKeyDown(event) {
        ;
    }
    onKeyUp(event) {
        ;
    }
    generateSegmentShape(segment, temp = true) {
        (0,_tempMeshUtils__WEBPACK_IMPORTED_MODULE_1__.generateShape)(segment, temp);
        // this.generateHandrailShape();
    }
    generateHandrailShape(stairParam = this.stairParam) {
        if (this.segments.length) {
            const handrails = (0,_tempMeshUtils__WEBPACK_IMPORTED_MODULE_1__.generateHandrailShape)(stairParam, this.segments);
            this.handrailCollection = { handrails: handrails || [] };
        }
    }
}
const drawStairsTool = new DrawStairsTool();


/***/ }),

/***/ "./src/main/tools/DrawStairsTool/meshUtils.ts":
/*!****************************************************!*\
  !*** ./src/main/tools/DrawStairsTool/meshUtils.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildComponentInstance: () => (/* binding */ buildComponentInstance),
/* harmony export */   buildHandrailInstance: () => (/* binding */ buildHandrailInstance),
/* harmony export */   buildSegmentRelations: () => (/* binding */ buildSegmentRelations),
/* harmony export */   changeStairStep: () => (/* binding */ changeStairStep),
/* harmony export */   changeStairUpward: () => (/* binding */ changeStairUpward),
/* harmony export */   drawCircle: () => (/* binding */ drawCircle),
/* harmony export */   drawRect: () => (/* binding */ drawRect),
/* harmony export */   generateMeshes: () => (/* binding */ generateMeshes),
/* harmony export */   getNextComponents: () => (/* binding */ getNextComponents),
/* harmony export */   getSegmentByIndex: () => (/* binding */ getSegmentByIndex),
/* harmony export */   loadDefaultMaterials: () => (/* binding */ loadDefaultMaterials)
/* harmony export */ });
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ "./src/main/tools/DrawStairsTool/consts.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./src/main/tools/DrawStairsTool/types.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/main/tools/DrawStairsTool/utils.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



function generateMeshes(segments) {
    const meshes = [];
    for (const segment of segments) {
        const { param: { type }, circleTangent } = segment;
        if (type === _types__WEBPACK_IMPORTED_MODULE_1__.ComponentType.StraightStair) {
            generateStraightStairMesh(segment);
        }
        else if (type === _types__WEBPACK_IMPORTED_MODULE_1__.ComponentType.CircularStair) {
            if (circleTangent) {
                generateCircularStairMesh(segment);
            }
            else {
                generateStraightStairMesh(segment);
            }
        }
        else {
            generatePlatformMesh(segment);
        }
        if (segment.mesh) {
            meshes.push(segment.mesh);
        }
    }
    return meshes;
}
function generateCircularStairMesh(segment) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    const { startLocked, circleTangent, stairShape: { vertices, stepCount }, cornerShape: { vertices: cornerVertices }, param: { upward } } = segment;
    if (stepCount < 1 || !startLocked || !circleTangent)
        return undefined;
    const stairMesh = {
        vertices: vertices.map(vertex => [vertex.x, vertex.y, vertex.z]),
        triangleIndices: [],
        softEdges: [],
    };
    // 最底部台阶后下位置
    // const leftIndex = vertices.length - ((!upward && stepCount > 1) ? 4 : 2);
    for (let i = 0; i < stepCount; i++) {
        stairMesh.triangleIndices.push(
        // stair faces
        [i * 4, i * 4 + 1, i * 4 + 2], [i * 4 + 1, i * 4 + 3, i * 4 + 2], [i * 4 + 2, i * 4 + 3, i * 4 + 4], [i * 4 + 3, i * 4 + 5, i * 4 + 4], 
        // side faces (up)
        [i * 4, i * 4 + 2, (i + 1) * 4], [i * 4 + 1, (i + 1) * 4 + 1, i * 4 + 3]);
        (_a = stairMesh.softEdges) === null || _a === void 0 ? void 0 : _a.push([i * 4 + 1, i * 4 + 2], [i * 4 + 3, i * 4 + 4], [i * 4, (i + 1) * 4], [(i + 1) * 4 + 1, i * 4 + 1]);
        if (upward) {
            const bottomFrontLeftIndex = 4 * stepCount + 2 + 2 * (stepCount - i - 1);
            stairMesh.triangleIndices.push(
            // side faces (middle)
            [i * 4, (i + 1) * 4, bottomFrontLeftIndex], [(i + 1) * 4 + 1, i * 4 + 1, bottomFrontLeftIndex + 1]);
            if (i < stepCount - 1) {
                (_b = stairMesh.softEdges) === null || _b === void 0 ? void 0 : _b.push([(i + 1) * 4, bottomFrontLeftIndex], [(i + 1) * 4 + 1, bottomFrontLeftIndex + 1]);
            }
            if (i > 0) {
                stairMesh.triangleIndices.push(
                // side faces (bottom)
                [i * 4, bottomFrontLeftIndex, bottomFrontLeftIndex + 2], [bottomFrontLeftIndex + 1, i * 4 + 1, bottomFrontLeftIndex + 3], 
                // bottom faces
                [bottomFrontLeftIndex + 2, bottomFrontLeftIndex, bottomFrontLeftIndex + 3], [bottomFrontLeftIndex + 3, bottomFrontLeftIndex, bottomFrontLeftIndex + 1]);
                (_c = stairMesh.softEdges) === null || _c === void 0 ? void 0 : _c.push([i * 4, bottomFrontLeftIndex], [i * 4 + 1, bottomFrontLeftIndex + 1], [bottomFrontLeftIndex + 3, bottomFrontLeftIndex]);
                if (i < stepCount - 1) {
                    (_d = stairMesh.softEdges) === null || _d === void 0 ? void 0 : _d.push([bottomFrontLeftIndex + 1, bottomFrontLeftIndex]);
                }
            }
            else {
                stairMesh.triangleIndices.push(
                // bottom faces
                [i * 4, bottomFrontLeftIndex, i * 4 + 1], [i * 4 + 1, bottomFrontLeftIndex, bottomFrontLeftIndex + 1]);
                (_e = stairMesh.softEdges) === null || _e === void 0 ? void 0 : _e.push([i * 4 + 1, bottomFrontLeftIndex]);
            }
        }
        else {
            const bottomBackLeftIndex = 4 * stepCount + 2 + 2 * (stepCount - i - 1);
            stairMesh.triangleIndices.push(
            // side faces (middle)
            [i * 4, (i + 1) * 4, bottomBackLeftIndex], [(i + 1) * 4 + 1, i * 4 + 1, bottomBackLeftIndex + 1], 
            // bottom faces
            [bottomBackLeftIndex, bottomBackLeftIndex - 2, bottomBackLeftIndex + 1], [bottomBackLeftIndex + 1, bottomBackLeftIndex - 2, bottomBackLeftIndex - 1]);
            (_f = stairMesh.softEdges) === null || _f === void 0 ? void 0 : _f.push([bottomBackLeftIndex + 1, bottomBackLeftIndex - 2]);
            if (i < stepCount - 1) {
                (_g = stairMesh.softEdges) === null || _g === void 0 ? void 0 : _g.push([(i + 1) * 4, bottomBackLeftIndex], [(i + 1) * 4 + 1, bottomBackLeftIndex + 1]);
                stairMesh.triangleIndices.push(
                // side faces (bottom)
                [(i + 1) * 4, bottomBackLeftIndex - 2, bottomBackLeftIndex], [bottomBackLeftIndex - 1, (i + 1) * 4 + 1, bottomBackLeftIndex + 1]);
                (_h = stairMesh.softEdges) === null || _h === void 0 ? void 0 : _h.push([(i + 1) * 4, bottomBackLeftIndex - 2], [(i + 1) * 4 + 1, bottomBackLeftIndex - 1], [bottomBackLeftIndex + 1, bottomBackLeftIndex - 2]);
                if (i > 0) {
                    (_j = stairMesh.softEdges) === null || _j === void 0 ? void 0 : _j.push([bottomBackLeftIndex + 1, bottomBackLeftIndex]);
                }
            }
        }
    }
    if (upward) {
        stairMesh.triangleIndices.push(
        // bottom faces
        // [vertices.length - 1, 1, 0],
        // [vertices.length - 1, 0, vertices.length - 2],
        // 前侧面
        [stepCount * 4, stepCount * 4 + 1, stepCount * 4 + 2], [stepCount * 4 + 1, stepCount * 4 + 3, stepCount * 4 + 2]);
        (_k = stairMesh.softEdges) === null || _k === void 0 ? void 0 : _k.push(
        // [vertices.length - 1, 0],
        [stepCount * 4 + 1, stepCount * 4 + 2]);
        // if (stepCount > 1) {
        //     stairMesh.triangleIndices.push(
        //         // side bottom faces
        //         [vertices.length - 2, vertices.length - 10, vertices.length - 4],
        //         [vertices.length - 1, vertices.length - 3, vertices.length - 9],
        //         // bottom faces
        //         [vertices.length - 5, vertices.length - 3, vertices.length - 4],
        //         [vertices.length - 5, vertices.length - 4, vertices.length - 6],
        //     );
        //     stairMesh.softEdges?.push(
        //         [vertices.length - 5, vertices.length - 4],
        //         [vertices.length - 2, vertices.length - 10],
        //         [vertices.length - 10, vertices.length - 4],
        //     );
        // }
    }
    else {
        stairMesh.triangleIndices.push(
        // 后侧面
        [vertices.length - 1, 1, 0], [vertices.length - 1, 0, vertices.length - 2]);
        (_l = stairMesh.softEdges) === null || _l === void 0 ? void 0 : _l.push([vertices.length - 1, 0]);
        // if (stepCount > 1) {
        //     stairMesh.triangleIndices.push(
        //         // side bottom faces
        //         [vertices.length - 2, 0, vertices.length - 4],
        //         [vertices.length - 1, vertices.length - 3, 1],
        //         // bottom faces
        //         [vertices.length - 5, vertices.length - 4, vertices.length - 3],
        //         [vertices.length - 5, vertices.length - 6, vertices.length - 4],
        //     );
        //     stairMesh.softEdges?.push(
        //         [vertices.length - 5, vertices.length - 4],
        //         [vertices.length - 3, 1],
        //         [0, vertices.length - 4],
        //     );
        // }
    }
    if (cornerVertices.length === 6) {
        generatePolygonMesh(cornerVertices, stairMesh);
    }
    segment.mesh = stairMesh;
}
function generateStraightStairMesh(segment) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const { startLocked, stairShape: { vertices, stepCount }, cornerShape: { vertices: cornerVertices }, param: { upward } } = segment;
    if (stepCount < 1 || !startLocked)
        return undefined;
    const stairMesh = {
        vertices: vertices.map(vertex => [vertex.x, vertex.y, vertex.z]),
        triangleIndices: [],
        softEdges: [],
    };
    const leftIndex = vertices.length - ((!upward && stepCount > 1) ? 4 : 2);
    for (let i = 0; i < stepCount; i++) {
        stairMesh.triangleIndices.push(
        // stair faces
        [i * 4, i * 4 + 1, i * 4 + 2], [i * 4 + 1, i * 4 + 3, i * 4 + 2], [i * 4 + 2, i * 4 + 3, i * 4 + 4], [i * 4 + 3, i * 4 + 5, i * 4 + 4], 
        // side faces
        [i * 4, i * 4 + 2, (i + 1) * 4], [i * 4 + 1, (i + 1) * 4 + 1, i * 4 + 3]);
        (_a = stairMesh.softEdges) === null || _a === void 0 ? void 0 : _a.push([i * 4 + 1, i * 4 + 2], [i * 4 + 3, i * 4 + 4], [i * 4, (i + 1) * 4], [(i + 1) * 4 + 1, i * 4 + 1]);
        if (i === stepCount - 1 && upward && stepCount > 1) {
            const bbLeftIndex = vertices.length - 4;
            stairMesh.triangleIndices.push(
            // tail side faces
            [bbLeftIndex, i * 4, (i + 1) * 4], [bbLeftIndex + 1, (i + 1) * 4 + 1, i * 4 + 1]);
            (_b = stairMesh.softEdges) === null || _b === void 0 ? void 0 : _b.push([bbLeftIndex, i * 4], 
            // [i * 4, (i + 1) * 4],
            [bbLeftIndex + 1, i * 4 + 1]);
        }
        else {
            stairMesh.triangleIndices.push(
            // side faces
            [leftIndex, i * 4, (i + 1) * 4], [leftIndex + 1, (i + 1) * 4 + 1, i * 4 + 1]);
            // stairMesh.softEdges?.push(
            //     [i * 4, (i + 1) * 4],
            //     [(i + 1) * 4 + 1, i * 4 + 1],
            // );
            if (upward) {
                if (i > 0) {
                    (_c = stairMesh.softEdges) === null || _c === void 0 ? void 0 : _c.push([leftIndex, i * 4], [leftIndex + 1, i * 4 + 1]);
                }
                if (stepCount > 1) {
                    (_d = stairMesh.softEdges) === null || _d === void 0 ? void 0 : _d.push([leftIndex, (i + 1) * 4], [leftIndex + 1, (i + 1) * 4 + 1]);
                }
            }
            else {
                if (stepCount > 1) {
                    (_e = stairMesh.softEdges) === null || _e === void 0 ? void 0 : _e.push([leftIndex, i * 4], [leftIndex + 1, i * 4 + 1]);
                }
                if (i < stepCount - 1) {
                    (_f = stairMesh.softEdges) === null || _f === void 0 ? void 0 : _f.push([leftIndex, (i + 1) * 4], [leftIndex + 1, (i + 1) * 4 + 1]);
                }
            }
        }
    }
    if (upward) {
        stairMesh.triangleIndices.push(
        // bottom faces
        [vertices.length - 1, 1, 0], [vertices.length - 1, 0, vertices.length - 2], [vertices.length - 3, vertices.length - 1, vertices.length - 2], [vertices.length - 3, vertices.length - 2, vertices.length - 4]);
        (_g = stairMesh.softEdges) === null || _g === void 0 ? void 0 : _g.push([vertices.length - 1, 0], [vertices.length - 3, vertices.length - 2]);
        if (stepCount > 1) {
            stairMesh.triangleIndices.push(
            // side bottom faces
            [vertices.length - 2, vertices.length - 10, vertices.length - 4], [vertices.length - 1, vertices.length - 3, vertices.length - 9], 
            // bottom faces
            [vertices.length - 5, vertices.length - 3, vertices.length - 4], [vertices.length - 5, vertices.length - 4, vertices.length - 6]);
            (_h = stairMesh.softEdges) === null || _h === void 0 ? void 0 : _h.push([vertices.length - 5, vertices.length - 4], [vertices.length - 2, vertices.length - 10], [vertices.length - 10, vertices.length - 4]);
        }
    }
    else {
        stairMesh.triangleIndices.push(
        // bottom faces
        [vertices.length - 1, 0, 1], [vertices.length - 1, vertices.length - 2, 0], [vertices.length - 3, vertices.length - 2, vertices.length - 1], [vertices.length - 3, vertices.length - 4, vertices.length - 2]);
        (_j = stairMesh.softEdges) === null || _j === void 0 ? void 0 : _j.push([vertices.length - 1, 0], [vertices.length - 3, vertices.length - 2]);
        if (stepCount > 1) {
            stairMesh.triangleIndices.push(
            // side bottom faces
            [vertices.length - 2, 0, vertices.length - 4], [vertices.length - 1, vertices.length - 3, 1], 
            // bottom faces
            [vertices.length - 5, vertices.length - 4, vertices.length - 3], [vertices.length - 5, vertices.length - 6, vertices.length - 4]);
            (_k = stairMesh.softEdges) === null || _k === void 0 ? void 0 : _k.push([vertices.length - 5, vertices.length - 4], [vertices.length - 3, 1], [0, vertices.length - 4]);
        }
    }
    if (cornerVertices.length === 6) {
        generatePolygonMesh(cornerVertices, stairMesh);
    }
    segment.mesh = stairMesh;
}
function generatePlatformMesh(segment) {
    const { stairShape: { vertices } } = segment;
    // if (endLocked) {
    const vertexLength = vertices.length / 2;
    if (vertexLength === 4 || vertexLength === 5) {
        const platformMesh = {
            vertices: [],
            triangleIndices: [],
            softEdges: [],
        };
        generatePolygonMesh(vertices, platformMesh);
        segment.mesh = platformMesh;
    }
    // }
    return undefined;
}
function generatePolygonMesh(vertices, mesh) {
    var _a, _b;
    const vertexLength = mesh.vertices.length;
    mesh.vertices.push(...vertices.map(vertex => [vertex.x, vertex.y, vertex.z]));
    const segCount = vertices.length / 2;
    for (let i = 0; i < segCount; i++) {
        const right = i === segCount - 1 ? 0 : i + 1;
        const bottomRight = i === segCount - 1 ? segCount : i + segCount + 1;
        mesh.triangleIndices.push([i + vertexLength, i + segCount + vertexLength, bottomRight + vertexLength], [i + vertexLength, bottomRight + vertexLength, right + vertexLength]);
        (_a = mesh.softEdges) === null || _a === void 0 ? void 0 : _a.push([i + vertexLength, bottomRight + vertexLength]);
        if (i > 0 && i < segCount - 1) {
            mesh.triangleIndices.push(
            // top and bottom
            [i + vertexLength, right + vertexLength, 0 + vertexLength], [bottomRight + vertexLength, i + segCount + vertexLength, segCount + vertexLength]);
            if (i > 1) {
                (_b = mesh.softEdges) === null || _b === void 0 ? void 0 : _b.push([i, 0 + vertexLength], [i + segCount + vertexLength, segCount + vertexLength]);
            }
        }
    }
}
function loadDefaultMaterials() {
    return __awaiter(this, void 0, void 0, function* () {
        const design = app.getActiveDesign();
        const res1 = yield design.loadMaterial(_types__WEBPACK_IMPORTED_MODULE_1__.PresetMaterials.Stair.materialId);
        if (!res1.isSuccess) {
            return false;
        }
        const res2 = yield design.loadMaterial(_types__WEBPACK_IMPORTED_MODULE_1__.PresetMaterials.Platform.materialId);
        if (!res2.isSuccess) {
            return false;
        }
        const res3 = yield design.loadMaterial(_types__WEBPACK_IMPORTED_MODULE_1__.PresetMaterials.Handrail.rail.materialId);
        if (!res3.isSuccess) {
            return false;
        }
        const res4 = yield design.loadMaterial(_types__WEBPACK_IMPORTED_MODULE_1__.PresetMaterials.Handrail.column.materialId);
        if (!res4.isSuccess) {
            return false;
        }
        return true;
    });
}
function buildComponentInstance(segment, segments, parentTransform) {
    var _a, _b;
    const { start, end, startHeight, endHeight, baseComponent, circleTangent, param, mesh } = segment;
    const design = app.getActiveDesign();
    let operationSuccess = true;
    if (mesh === null || mesh === void 0 ? void 0 : mesh.vertices.length) {
        const newShell = (_a = design.createShellFromMesh(mesh)) === null || _a === void 0 ? void 0 : _a.newShell;
        operationSuccess = operationSuccess && !!newShell;
        if (newShell) {
            // if (param.type !== ComponentType.CircularStair) {
            //     const softEdges = newShell.getEdges().filter(e => e.isSoft());
            //     operationSuccess = operationSuccess && design.removeEdges(softEdges).isSuccess;
            // }
            const newInstance = (_b = design.makeGroup(newShell.getFaces(), [], [])) === null || _b === void 0 ? void 0 : _b.addedInstance;
            operationSuccess = operationSuccess && !!newInstance;
            const groupDef = newInstance === null || newInstance === void 0 ? void 0 : newInstance.getGroupDefinition();
            if (newInstance && groupDef) {
                if (parentTransform) {
                    const transformRes = design.transformGroupInstances([newInstance], parentTransform.inversed());
                    operationSuccess = operationSuccess && transformRes.isSuccess;
                }
                const materialObject = param.type === _types__WEBPACK_IMPORTED_MODULE_1__.ComponentType.Platform ? _types__WEBPACK_IMPORTED_MODULE_1__.PresetMaterials.Platform : _types__WEBPACK_IMPORTED_MODULE_1__.PresetMaterials.Stair;
                operationSuccess = operationSuccess && design.assignMaterialForEntities([newInstance], materialObject.materialId, materialObject.bgId);
                // operationSuccess = operationSuccess && groupDef.setCustomProperty(ComponentIndexKey, `${newInstances.length}`).isSuccess;
                // newInstances.push(newInstance);
                const paramString = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.stringifyComponentParam)(param);
                const startEndString = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.stringifyStartEnd)(GeomLib.createPoint3d(start.x, start.y, startHeight), GeomLib.createPoint3d(end.x, end.y, endHeight));
                operationSuccess = operationSuccess && groupDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_1__.ComponentParamKey, paramString).isSuccess;
                operationSuccess = operationSuccess && groupDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_1__.StartEndKey, startEndString).isSuccess;
                // if (baseLineSeg3d) {
                // }
                if (baseComponent) {
                    const baseLineString = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.stringifyStartEnd)(baseComponent.line3d.start, baseComponent.line3d.end);
                    operationSuccess = operationSuccess && groupDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_1__.BaseLineSeg3dKey, baseLineString).isSuccess;
                    const baseSegment = getSegmentByIndex(segments, baseComponent.componentIndex);
                    if (baseSegment) {
                        const baseComponentString = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.stringifyBaseComponent)(baseSegment, baseComponent.line3dIndex);
                        operationSuccess = operationSuccess && groupDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_1__.BaseComponentKey, baseComponentString).isSuccess;
                    }
                }
                if (circleTangent) {
                    const tangentString = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.stringifyPoint3d)(circleTangent);
                    operationSuccess = operationSuccess && groupDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_1__.CircleTangentKey, tangentString).isSuccess;
                }
                return newInstance;
            }
        }
    }
    return undefined;
}
function buildHandrailInstance(stairParam, handrails, parentTransform) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const { handrail: { support, height, rail: { type: railType, param: railParam }, column: { type: columnType, param: columnParam } } } = stairParam;
        if (!support) {
            return 0;
        }
        let columnFace;
        if (columnType === _types__WEBPACK_IMPORTED_MODULE_1__.ColumnType.Circle) {
            columnFace = drawCircle(_consts__WEBPACK_IMPORTED_MODULE_0__.dummyPoint3d, _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ, columnParam.radius || _types__WEBPACK_IMPORTED_MODULE_1__.DefaultStairParam.horizontalStep / 10);
        }
        else if (columnType === _types__WEBPACK_IMPORTED_MODULE_1__.ColumnType.Rect) {
            columnFace = drawRect(_consts__WEBPACK_IMPORTED_MODULE_0__.dummyPoint3d, _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ, columnParam.width || _types__WEBPACK_IMPORTED_MODULE_1__.DefaultStairParam.horizontalStep / 10, columnParam.height || _types__WEBPACK_IMPORTED_MODULE_1__.DefaultStairParam.horizontalStep / 10, false);
        }
        else {
            return 0;
        }
        const columnLoop = columnFace === null || columnFace === void 0 ? void 0 : columnFace.getOuterLoop();
        if (!columnFace || !columnLoop) {
            return undefined;
        }
        const activeDesign = app.getActiveDesign();
        const handrailInstance = (_a = activeDesign.makeGroup([columnFace], [], [])) === null || _a === void 0 ? void 0 : _a.addedInstance;
        const handrailDefinition = handrailInstance === null || handrailInstance === void 0 ? void 0 : handrailInstance.getGroupDefinition();
        if (!handrailInstance || !handrailDefinition) {
            return undefined;
        }
        if (parentTransform) {
            const transformRes = activeDesign.transformGroupInstances([handrailInstance], parentTransform.inversed());
            if (!transformRes.isSuccess) {
                return undefined;
            }
        }
        const activateInstanceRes = yield activeDesign.activateGroupInstance(handrailInstance);
        if (!activateInstanceRes.isSuccess) {
            return undefined;
        }
        const columnAuxiliaryBoundedCurve = (_b = activeDesign.addAuxiliaryBoundedCurve(GeomLib.createLineSegment3d(GeomLib.createPoint3d(0, 0, height), _consts__WEBPACK_IMPORTED_MODULE_0__.dummyPoint3d))) === null || _b === void 0 ? void 0 : _b.addedCurve;
        if (!columnAuxiliaryBoundedCurve) {
            return undefined;
        }
        const sweepColumnRes = activeDesign.sweepFollowCurves(columnLoop, [columnAuxiliaryBoundedCurve]);
        if (!sweepColumnRes.isSuccess || !sweepColumnRes.addedShells.length) {
            return undefined;
        }
        const columnOriginFaces = [];
        for (const columnOriginShell of sweepColumnRes.addedShells) {
            const columnFaces = columnOriginShell.getFaces();
            columnOriginFaces.push(...columnFaces);
        }
        const columnOriginInstance = (_c = activeDesign.makeGroup(columnOriginFaces, [], [])) === null || _c === void 0 ? void 0 : _c.addedInstance;
        if (!columnOriginInstance) {
            return undefined;
        }
        const columnMatrixes = [];
        const railInstances = [];
        for (let j = 0; j < handrails.length; j++) {
            const { rail, columns } = handrails[j];
            // }
            // for (const { rail, columns } of handrails) {
            const railBoundedCurves = [];
            for (let i = 0; i < rail.length - 1; i++) {
                const railPoint = rail[i];
                const railNextPoint = rail[i + 1];
                railBoundedCurves.push();
                const addAuxRes = activeDesign.addAuxiliaryBoundedCurve(GeomLib.createLineSegment3d(railPoint, railNextPoint));
                if (addAuxRes === null || addAuxRes === void 0 ? void 0 : addAuxRes.addedCurve) {
                    railBoundedCurves.push(addAuxRes.addedCurve);
                }
                else {
                    return undefined;
                }
            }
            if (railBoundedCurves.length) {
                const railStartCurve = railBoundedCurves[0].getBoundedCurve();
                const railStartPoint = (railStartCurve === null || railStartCurve === void 0 ? void 0 : railStartCurve.startPoint) || _consts__WEBPACK_IMPORTED_MODULE_0__.dummyPoint3d;
                const railStartDir = (railStartCurve === null || railStartCurve === void 0 ? void 0 : railStartCurve.endPoint.subtracted(railStartPoint).normalized().reversed()) || _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ;
                let railFace;
                if (railType === _types__WEBPACK_IMPORTED_MODULE_1__.RailType.Circle) {
                    railFace = drawCircle(railStartPoint, railStartDir, railParam.radius || _types__WEBPACK_IMPORTED_MODULE_1__.DefaultStairParam.horizontalStep / 5);
                }
                else if (railType === _types__WEBPACK_IMPORTED_MODULE_1__.RailType.Rect) {
                    railFace = drawRect(railStartPoint, railStartDir, railParam.width || _types__WEBPACK_IMPORTED_MODULE_1__.DefaultStairParam.horizontalStep / 5, railParam.height || _types__WEBPACK_IMPORTED_MODULE_1__.DefaultStairParam.horizontalStep / 5);
                }
                else {
                    return 0;
                }
                const railLoop = railFace === null || railFace === void 0 ? void 0 : railFace.getOuterLoop();
                if (!railFace || !railLoop) {
                    return undefined;
                }
                const sweepRailRes = activeDesign.sweepFollowCurves(railLoop, railBoundedCurves);
                if (!sweepRailRes.isSuccess || !sweepRailRes.addedShells.length) {
                    return undefined;
                }
                const railFaces = [];
                for (const railShell of sweepRailRes.addedShells) {
                    const railShellFaces = railShell.getFaces();
                    railFaces.push(...railShellFaces);
                }
                const railMakeGroupRes = activeDesign.makeGroup(railFaces, [], railBoundedCurves);
                const railGroupDef = railMakeGroupRes === null || railMakeGroupRes === void 0 ? void 0 : railMakeGroupRes.addedInstance.getGroupDefinition();
                if (!(railMakeGroupRes === null || railMakeGroupRes === void 0 ? void 0 : railMakeGroupRes.addedInstance) || !railGroupDef) {
                    return undefined;
                }
                const railPropertyRes = railGroupDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_1__.RailModelKey, _types__WEBPACK_IMPORTED_MODULE_1__.ModelValue);
                if (!railPropertyRes.isSuccess) {
                    return undefined;
                }
                railInstances.push(railMakeGroupRes.addedInstance);
            }
            for (const column of columns) {
                const columnScaleMat = GeomLib.createScaleMatrix4(1, 1, (column[1].z - column[0].z) / height);
                const columnTranslateMat = GeomLib.createTranslationMatrix4(column[0].x, column[0].y, column[0].z);
                columnMatrixes.push(columnTranslateMat.multiplied(columnScaleMat));
            }
        }
        if (railInstances.length) {
            const assignRailMaterialRes = activeDesign.assignMaterialForEntities(railInstances, _types__WEBPACK_IMPORTED_MODULE_1__.PresetMaterials.Handrail.rail.materialId, _types__WEBPACK_IMPORTED_MODULE_1__.PresetMaterials.Handrail.rail.bgId);
            if (!assignRailMaterialRes) {
                return undefined;
            }
        }
        const columnInstances = [];
        if (columnMatrixes.length) {
            const columnCopyRes = activeDesign.bulkCopyGroupInstances([columnOriginInstance], [columnMatrixes]);
            if (!(columnCopyRes === null || columnCopyRes === void 0 ? void 0 : columnCopyRes.addedInstances.length)) {
                return undefined;
            }
            columnInstances.push(...columnCopyRes.addedInstances);
            for (const columnInstance of columnCopyRes.addedInstances) {
                const columnGroupDef = columnInstance.getGroupDefinition();
                if (!columnGroupDef) {
                    return undefined;
                }
                const columnPropertyRes = columnGroupDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_1__.ColumnModelKey, _types__WEBPACK_IMPORTED_MODULE_1__.ModelValue);
                if (!columnPropertyRes.isSuccess) {
                    return undefined;
                }
            }
            const assignColumnMaterialRes = activeDesign.assignMaterialForEntities(columnCopyRes.addedInstances, _types__WEBPACK_IMPORTED_MODULE_1__.PresetMaterials.Handrail.column.materialId, _types__WEBPACK_IMPORTED_MODULE_1__.PresetMaterials.Handrail.column.bgId);
            if (!assignColumnMaterialRes) {
                return undefined;
            }
        }
        const removeOriginColumnRes = activeDesign.removeGroupInstance(columnOriginInstance);
        if (!removeOriginColumnRes.isSuccess) {
            return undefined;
        }
        const removeOriginColumnAuxCurveRes = activeDesign.removeAuxiliaryCurve(columnAuxiliaryBoundedCurve);
        if (!removeOriginColumnAuxCurveRes.isSuccess) {
            return undefined;
        }
        // to remove all auxiliaryCurves
        const deactivateInstanceRes = yield activeDesign.deactivateGroupInstance();
        if (!deactivateInstanceRes.isSuccess) {
            return undefined;
        }
        const setPropertyRes = handrailDefinition.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_1__.HandrailModelKey, _types__WEBPACK_IMPORTED_MODULE_1__.ModelValue);
        if (!setPropertyRes.isSuccess) {
            return undefined;
        }
        return {
            handrailInstance: { instance: handrailInstance, instanceKey: handrailInstance.getKey(), definitionKey: handrailDefinition.getKey() },
            railInstances: railInstances.map(instance => { var _a; return ({ instance, instanceKey: instance.getKey(), definitionKey: ((_a = instance.getGroupDefinition()) === null || _a === void 0 ? void 0 : _a.getKey()) || '' }); }),
            columnInstances: columnInstances.map(instance => { var _a; return ({ instance, instanceKey: instance.getKey(), definitionKey: ((_a = instance.getGroupDefinition()) === null || _a === void 0 ? void 0 : _a.getKey()) || '' }); }),
        };
    });
}
function drawCircle(center, normal, radius) {
    const activeDesign = app.getActiveDesign();
    const res = activeDesign.addCircle(GeomLib.createCircle3dByCenterNormalRadius(center, normal, radius));
    if (res === null || res === void 0 ? void 0 : res.addedEdges.length) {
        const shell = res.addedEdges[0].getShell();
        const faces = shell === null || shell === void 0 ? void 0 : shell.getFaces();
        if ((faces === null || faces === void 0 ? void 0 : faces.length) === 1) {
            return faces[0];
        }
    }
    return undefined;
}
function drawRect(center, normal, width, height, withCorner = true) {
    const point1 = GeomLib.createPoint3d(-width / 2, 0, 0);
    const point2 = GeomLib.createPoint3d(width / 2, 0, 0);
    let points = [point1, point2];
    if (withCorner) {
        const p5 = GeomLib.createPoint3d(width / 2, height / 3 * 2, 0);
        const p6 = GeomLib.createPoint3d(width / 4, height, 0);
        const m1 = GeomLib.createPoint3d((p5.x + p6.x) / 2, (p5.y + p6.y) / 2, 0);
        const dir1 = p6.subtracted(p5).normalized();
        const toCenterDir1 = _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.cross(dir1);
        const d1 = p5.distanceTo(p6);
        // const r1 = d1 / 2 / Math.sin(Math.PI / 6);
        const h1 = d1 / 2 / Math.tan(Math.PI / 6);
        const center1 = m1.added(toCenterDir1.multiplied(h1));
        for (let i = 0; i < 11; i++) {
            const rotateMat = GeomLib.createRotateMatrix4(i * Math.PI / 30, _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ, center1);
            const discretePoint = p5.appliedMatrix4(rotateMat);
            points.push(discretePoint);
        }
        const p7 = GeomLib.createPoint3d(-width / 4, height, 0);
        const p8 = GeomLib.createPoint3d(-width / 2, height / 3 * 2, 0);
        const m2 = GeomLib.createPoint3d((p7.x + p8.x) / 2, (p7.y + p8.y) / 2, 0);
        const dir2 = p8.subtracted(p7).normalized();
        const toCenterDir2 = _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.cross(dir2);
        const d2 = p7.distanceTo(p8);
        // const r2 = d2 / 2 / Math.sin(Math.PI / 6);
        const h2 = d2 / 2 / Math.tan(Math.PI / 6);
        const center2 = m2.added(toCenterDir2.multiplied(h2));
        for (let i = 0; i < 11; i++) {
            const rotateMat = GeomLib.createRotateMatrix4(i * Math.PI / 30, _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ, center2);
            const discretePoint = p7.appliedMatrix4(rotateMat);
            points.push(discretePoint);
        }
    }
    else {
        const point3 = GeomLib.createPoint3d(width / 2, height, 0);
        const point4 = GeomLib.createPoint3d(-width / 2, height, 0);
        points.push(point3, point4);
    }
    const coordinate = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getCoordinate)(normal);
    const coordinateMat = GeomLib.createAlignCCSMatrix4(coordinate.dx, coordinate.dy, coordinate.dz, center);
    const translateMat1 = GeomLib.createTranslationMatrix4(0, -height / 2, 0);
    // const translateMat2 = GeomLib.createTranslationMatrix4(center.x, center.y, center.z);
    const transformMat = coordinateMat.multiplied(translateMat1);
    points = points.map(p => p.appliedMatrix4(transformMat));
    const activeDesign = app.getActiveDesign();
    const res = activeDesign.addEdges(points);
    if (res === null || res === void 0 ? void 0 : res.addedEdges.length) {
        const edgeVertices = new Set();
        for (const addedEdge of res.addedEdges) {
            const va = addedEdge.getVertexA();
            const vb = addedEdge.getVertexB();
            if (va) {
                edgeVertices.add(va);
            }
            if (vb) {
                edgeVertices.add(vb);
            }
        }
        const setSoftResult = activeDesign.setVerticesSoft([...edgeVertices], true);
        if (setSoftResult.isSuccess) {
            const shell = res.addedEdges[0].getShell();
            const faces = shell === null || shell === void 0 ? void 0 : shell.getFaces();
            if ((faces === null || faces === void 0 ? void 0 : faces.length) === 1) {
                return faces[0];
            }
        }
    }
    return undefined;
}
function getSegmentByIndex(segments, index) {
    if (index === undefined) {
        return undefined;
    }
    return segments.find(segment => segment.param.index === index);
}
function buildSegmentRelations(segments) {
    for (const segment of segments) {
        const baseComponent = segment.baseComponent;
        const baseSegment = getSegmentByIndex(segments, baseComponent === null || baseComponent === void 0 ? void 0 : baseComponent.componentIndex);
        if (baseSegment && (baseComponent === null || baseComponent === void 0 ? void 0 : baseComponent.line3dIndex) !== undefined) {
            baseSegment.nextComponents[baseComponent.line3dIndex].add(segment.param.index);
        }
    }
}
function getNextComponents(segment, segments) {
    const { nextComponents } = segment;
    const nextSegments = [];
    for (const nextComponentIndexes of nextComponents) {
        for (const nextComponentIndex of nextComponentIndexes) {
            const nextSegment = getSegmentByIndex(segments, nextComponentIndex);
            if (nextSegment) {
                nextSegments.push(nextSegment);
            }
        }
    }
    return nextSegments;
}
function changeStairUpward(startSegment, segments, upward, bulkChange, onlyStart = false) {
    if (segments.length) {
        let current = [{ segment: startSegment, verticalDelta: startSegment.startHeight }];
        const unVisited = new Set(segments);
        const changedSegments = new Set();
        while (current.length) {
            let next = [];
            for (const { segment, verticalDelta } of current) {
                const { startHeight, endHeight } = segment;
                const upwardFlag = onlyStart ? segment.param.upward : upward;
                const endDelta = segment.param.type === _types__WEBPACK_IMPORTED_MODULE_1__.ComponentType.Platform ? 0 : Math.abs(endHeight - startHeight) * (upwardFlag ? 1 : -1);
                segment.startHeight = verticalDelta;
                segment.endHeight = segment.startHeight + endDelta;
                if (!onlyStart) {
                    segment.param.upward = upward;
                }
                unVisited.delete(segment);
                const nextSegments = getNextComponents(segment, segments);
                if (nextSegments.length) {
                    next.push(...nextSegments.map(seg => ({ segment: seg, verticalDelta: segment.endHeight })));
                }
                changedSegments.add(segment);
            }
            current = next;
            if (!current.length) {
                if (bulkChange && unVisited.size) {
                    const theSegment = [...unVisited.values()][0];
                    current = [{ segment: theSegment, verticalDelta: theSegment.startHeight }];
                }
            }
        }
        return [...changedSegments];
    }
}
function changeStairStep(startSegment, segments, newHorizontalStep, newVerticalStep, bulkChange, onlyStart = false) {
    if (segments.length) {
        let current = [{ segment: startSegment, verticalDelta: startSegment.startHeight }];
        const unVisited = new Set(segments);
        const changedSegments = new Set();
        while (current.length) {
            let next = [];
            for (const { segment, verticalDelta } of current) {
                const { start, end, circleTangent, param: { type, horizontalStep, startWidth, endWidth, upward } } = segment;
                const stairLength = start.distanceTo(end);
                const startEndDir = end.subtracted(start).normalized();
                const startEndDistance = start.distanceTo(end);
                const maxWidth = Math.max(startWidth, endWidth);
                let newStepCount = 0;
                if (type === _types__WEBPACK_IMPORTED_MODULE_1__.ComponentType.StraightStair) {
                    newStepCount = stairLength / horizontalStep;
                    const lastStepLength = startEndDistance - (newStepCount - 1) * horizontalStep;
                    const validStepCount = (lastStepLength === 0 || lastStepLength > _consts__WEBPACK_IMPORTED_MODULE_0__.LengthTolerance) ? newStepCount : newStepCount - 1;
                    if (validStepCount < 1 || validStepCount >= _consts__WEBPACK_IMPORTED_MODULE_0__.StepCountLimit) {
                        return;
                    }
                }
                else if (type === _types__WEBPACK_IMPORTED_MODULE_1__.ComponentType.CircularStair && circleTangent) {
                    const tangentLeftDir = _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.cross(circleTangent).normalized();
                    const endAngle = startEndDir.angleTo(circleTangent, _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ);
                    const isLeftArc = endAngle > Math.PI;
                    if (isLeftArc) {
                        segment.circularSide = _types__WEBPACK_IMPORTED_MODULE_1__.CircularSide.Left;
                    }
                    else {
                        segment.circularSide = _types__WEBPACK_IMPORTED_MODULE_1__.CircularSide.Right;
                    }
                    const endComplementaryAngle = isLeftArc ? Math.abs(endAngle - Math.PI / 2 - Math.PI) : Math.abs(endAngle - Math.PI / 2);
                    const halfChord = startEndDistance / 2;
                    const radius = halfChord / Math.cos(endComplementaryAngle);
                    const innerRadius = radius - maxWidth / 2;
                    if (radius < maxWidth / 2 * 1.2 || innerRadius < horizontalStep / 2 / 0.8) {
                        return;
                    }
                    const horizontalStepAngle = Math.asin(horizontalStep / 2 / innerRadius) * 2;
                    const circleNormal = isLeftArc ? _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ : _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.reversed();
                    const circleCenter = start.added(tangentLeftDir.multiplied(isLeftArc ? radius : -radius));
                    // const circle = GeomLib.createCircle3dByCenterNormalRadius(circleCenter, circleNormal, radius);
                    const arc = GeomLib.createArc3dByCenterNormalRadius(circleCenter, circleNormal, radius, start, end);
                    const arcAngle = arc.arcAngle;
                    newStepCount = Math.ceil(arcAngle / horizontalStepAngle);
                    const lastHorizontalAngle = arcAngle - horizontalStepAngle * (newStepCount - 1);
                    const validStepCount = (lastHorizontalAngle === 0 || lastHorizontalAngle > _consts__WEBPACK_IMPORTED_MODULE_0__.AngleTolerance) ? newStepCount : newStepCount - 1;
                    if (horizontalStepAngle >= arcAngle || horizontalStepAngle >= Math.PI / 2 || validStepCount >= _consts__WEBPACK_IMPORTED_MODULE_0__.StepCountLimit || validStepCount < 1) {
                        return;
                    }
                }
                const newDeltaHeight = newStepCount * newVerticalStep * (upward ? 1 : -1);
                // const oldDeltaHeight = endHeight - startHeight;
                segment.startHeight = verticalDelta;
                if (type === _types__WEBPACK_IMPORTED_MODULE_1__.ComponentType.Platform) {
                    segment.endHeight = verticalDelta;
                }
                else {
                    segment.endHeight = segment.startHeight + newDeltaHeight;
                    if (!onlyStart) {
                        segment.param.horizontalStep = newHorizontalStep;
                        segment.param.verticalStep = newVerticalStep;
                    }
                }
                unVisited.delete(segment);
                const nextSegments = getNextComponents(segment, segments);
                if (nextSegments.length) {
                    next.push(...nextSegments.map(seg => ({ segment: seg, verticalDelta: segment.endHeight })));
                }
                changedSegments.add(segment);
            }
            current = next;
            if (!current.length) {
                if (bulkChange && unVisited.size) {
                    const theSegment = [...unVisited.values()][0];
                    current = [{ segment: theSegment, verticalDelta: theSegment.startHeight }];
                }
            }
        }
        return [...changedSegments];
    }
}


/***/ }),

/***/ "./src/main/tools/DrawStairsTool/tempMeshUtils.ts":
/*!********************************************************!*\
  !*** ./src/main/tools/DrawStairsTool/tempMeshUtils.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateHandrailShape: () => (/* binding */ generateHandrailShape),
/* harmony export */   generateShape: () => (/* binding */ generateShape),
/* harmony export */   isCircularStair: () => (/* binding */ isCircularStair),
/* harmony export */   isPlatform: () => (/* binding */ isPlatform),
/* harmony export */   isStraightStair: () => (/* binding */ isStraightStair)
/* harmony export */ });
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ "./src/main/tools/DrawStairsTool/consts.ts");
/* harmony import */ var _meshUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./meshUtils */ "./src/main/tools/DrawStairsTool/meshUtils.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "./src/main/tools/DrawStairsTool/types.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./src/main/tools/DrawStairsTool/utils.ts");




function generateShape(segment, temp = true) {
    const { param: { type }, circleTangent } = segment;
    if (type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.StraightStair) {
        generateStraightStairShape(segment, temp);
    }
    else if (type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.CircularStair) {
        if (circleTangent) {
            generateCircularStairShape(segment, temp);
        }
        else {
            generateStraightStairShape(segment, temp);
        }
    }
    else {
        generatePlatformShape(segment, temp);
    }
}
function generateCircularStairShape(segment, temp = true) {
    const { start, end, stairShape, moldShape, cornerShape, cornerMoldShape, startHeight, baseComponent, circleTangent, param } = segment;
    const { startWidth, endWidth, horizontalStep, verticalStep, upward, platformThickness } = param;
    if (circleTangent) {
        const tangentLeftDir = _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.cross(circleTangent).normalized();
        const startEndDir = end.subtracted(start).normalized();
        const startEndDistance = start.distanceTo(end);
        const maxWidth = Math.max(startWidth, endWidth);
        const endAngle = startEndDir.angleTo(circleTangent, _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ);
        if (endAngle < _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionAngleTolerance) {
            segment.circularSide = undefined;
            return generateStraightStairShape(segment, temp);
        }
        const isLeftArc = endAngle > Math.PI;
        if (isLeftArc) {
            segment.circularSide = _types__WEBPACK_IMPORTED_MODULE_2__.CircularSide.Left;
        }
        else {
            segment.circularSide = _types__WEBPACK_IMPORTED_MODULE_2__.CircularSide.Right;
        }
        const endComplementaryAngle = isLeftArc ? Math.abs(endAngle - Math.PI / 2 - Math.PI) : Math.abs(endAngle - Math.PI / 2);
        const halfChord = startEndDistance / 2;
        const radius = halfChord / Math.cos(endComplementaryAngle);
        const innerRadius = radius - maxWidth / 2;
        if (radius < maxWidth / 2 * 1.2 || innerRadius < horizontalStep / 2 / 0.8) {
            return;
        }
        const horizontalStepAngle = Math.asin(horizontalStep / 2 / innerRadius) * 2;
        const circleNormal = isLeftArc ? _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ : _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.reversed();
        const circleCenter = start.added(tangentLeftDir.multiplied(isLeftArc ? radius : -radius));
        // const circle = GeomLib.createCircle3dByCenterNormalRadius(circleCenter, circleNormal, radius);
        const arc = GeomLib.createArc3dByCenterNormalRadius(circleCenter, circleNormal, radius, start, end);
        const arcAngle = arc.arcAngle;
        const stepCount = Math.ceil(arcAngle / horizontalStepAngle);
        const lastHorizontalAngle = arcAngle - horizontalStepAngle * (stepCount - 1);
        const validStepCount = (lastHorizontalAngle === 0 || lastHorizontalAngle > _consts__WEBPACK_IMPORTED_MODULE_0__.AngleTolerance) ? stepCount : stepCount - 1;
        if (horizontalStepAngle >= arcAngle || horizontalStepAngle >= Math.PI / 2 || validStepCount >= _consts__WEBPACK_IMPORTED_MODULE_0__.StepCountLimit || validStepCount < 1) {
            return;
        }
        stairShape.vertices = [];
        stairShape.tempLines = [];
        moldShape.vertices = [];
        moldShape.tempLines = [];
        cornerShape.vertices = [];
        cornerShape.tempLines = [];
        cornerMoldShape.vertices = [];
        cornerMoldShape.tempLines = [];
        const { vertices, tempLines } = stairShape;
        const { vertices: moldVertices, tempLines: moldTempLines } = moldShape;
        // const centerHorizontalStep = horizontalStep / innerRadius * radius;
        const stepHeight = upward ? verticalStep : -verticalStep;
        segment.endHeight = segment.startHeight + validStepCount * stepHeight;
        stairShape.stepCount = validStepCount;
        moldShape.stepCount = validStepCount;
        // console.log('validStepCount:   ',validStepCount);
        const leftPt = start.added(tangentLeftDir.multiplied(startWidth / 2));
        const rightPt = start.added(tangentLeftDir.multiplied(-startWidth / 2));
        const startRadiusDir = isLeftArc ? tangentLeftDir.reversed() : tangentLeftDir;
        for (let i = 0; i < stepCount - 1; i++) {
            const curRotateMatrix = GeomLib.createRotateMatrix4(horizontalStepAngle * i, circleNormal, _consts__WEBPACK_IMPORTED_MODULE_0__.dummyPoint3d);
            const curRadiusDir = startRadiusDir.appliedMatrix4(curRotateMatrix);
            const curHalfWidth = (startWidth + (endWidth - startWidth) * (i * horizontalStepAngle) / arcAngle) / 2 * (isLeftArc ? -1 : 1);
            const curLeftMoldPt = circleCenter.added(curRadiusDir.multiplied(radius + curHalfWidth));
            const curRightMoldPt = circleCenter.added(curRadiusDir.multiplied(radius - curHalfWidth));
            const curLeftPt = curLeftMoldPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight + i * stepHeight));
            const curRightPt = curRightMoldPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight + i * stepHeight));
            moldVertices.push(curLeftMoldPt, curRightMoldPt);
            moldTempLines.push([2 * i, 1 + 2 * i], [2 * i, 2 + 2 * i], [1 + 2 * i, 3 + 2 * i]);
            vertices.push(curLeftPt, curRightPt);
            const nextRotateMatrix = GeomLib.createRotateMatrix4(horizontalStepAngle * (i + 1), circleNormal, _consts__WEBPACK_IMPORTED_MODULE_0__.dummyPoint3d);
            const nextRadiusDir = startRadiusDir.appliedMatrix4(nextRotateMatrix);
            const nextHalfWidth = (startWidth + (endWidth - startWidth) * ((i + 1) * horizontalStepAngle) / arcAngle) / 2 * (isLeftArc ? -1 : 1);
            const nextLeftMoldPt = circleCenter.added(nextRadiusDir.multiplied(radius + nextHalfWidth));
            const nextRightMoldPt = circleCenter.added(nextRadiusDir.multiplied(radius - nextHalfWidth));
            const nextLeftPt = nextLeftMoldPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight + i * stepHeight));
            const nextRightPt = nextRightMoldPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight + i * stepHeight));
            if (upward) {
                vertices.push(curLeftPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(stepHeight)), curRightPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(stepHeight)));
            }
            else {
                vertices.push(nextLeftPt, nextRightPt);
            }
            if (temp) {
                tempLines.push([4 * i, 1 + 4 * i], [4 * i, 2 + 4 * i], [1 + 4 * i, 3 + 4 * i], [2 + 4 * i, 3 + 4 * i], [2 + 4 * i, 4 + 4 * i], [3 + 4 * i, 5 + 4 * i]);
            }
            if (i === stepCount - 2) {
                moldVertices.push(nextLeftMoldPt, nextRightMoldPt);
                moldTempLines.push([2 * (stepCount - 1), 1 + 2 * (stepCount - 1)]);
            }
            if (i === stepCount - 2) {
                // if (upward) {
                // } else {
                // }
                vertices.push(nextLeftPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(stepHeight)), nextRightPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(stepHeight)));
                if (temp) {
                    tempLines.push([4 * (stepCount - 1), 1 + 4 * (stepCount - 1)]);
                }
            }
        }
        const lastRotateMatrix = GeomLib.createRotateMatrix4(arcAngle, circleNormal, _consts__WEBPACK_IMPORTED_MODULE_0__.dummyPoint3d);
        const lastRadiusDir = startRadiusDir.appliedMatrix4(lastRotateMatrix);
        const lastHalfWidth = isLeftArc ? -endWidth / 2 : endWidth / 2;
        const lastLeftMoldPt = circleCenter.added(lastRadiusDir.multiplied(radius + lastHalfWidth));
        const lastRightMoldPt = circleCenter.added(lastRadiusDir.multiplied(radius - lastHalfWidth));
        const lastLeftPt = lastLeftMoldPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight + stepCount * stepHeight));
        const lastRightPt = lastRightMoldPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight + stepCount * stepHeight));
        if (stepCount === 1) {
            moldVertices.push(leftPt, rightPt);
            moldTempLines.push([2 * (stepCount - 1), 1 + 2 * (stepCount - 1)]);
        }
        if (lastHorizontalAngle >= _consts__WEBPACK_IMPORTED_MODULE_0__.AngleTolerance || lastHorizontalAngle === 0) {
            moldVertices.push(lastLeftMoldPt, lastRightMoldPt);
            moldTempLines.push([2 * (stepCount - 1), 2 + 2 * (stepCount - 1)], [1 + 2 * (stepCount - 1), 3 + 2 * (stepCount - 1)], [2 * stepCount, 1 + 2 * stepCount]);
        }
        if (upward) {
            if (stepCount === 1) {
                vertices.push(leftPt, rightPt);
                if (temp) {
                    tempLines.push([4 * (stepCount - 1), 1 + 4 * (stepCount - 1)]);
                }
            }
            if (lastHorizontalAngle >= _consts__WEBPACK_IMPORTED_MODULE_0__.AngleTolerance || lastHorizontalAngle === 0) {
                vertices.push(vertices[vertices.length - 2].added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(verticalStep)), vertices[vertices.length - 1].added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(verticalStep)));
                vertices.push(lastLeftPt, lastRightPt);
                if (temp) {
                    tempLines.push([4 * (stepCount - 1), 2 + 4 * (stepCount - 1)], [1 + 4 * (stepCount - 1), 3 + 4 * (stepCount - 1)], [2 + 4 * (stepCount - 1), 3 + 4 * (stepCount - 1)], [2 + 4 * (stepCount - 1), 4 + 4 * (stepCount - 1)], [3 + 4 * (stepCount - 1), 5 + 4 * (stepCount - 1)], [4 * stepCount, 1 + 4 * stepCount]);
                }
            }
        }
        else {
            if (stepCount === 1) {
                vertices.push(leftPt, rightPt);
                if (temp) {
                    tempLines.push([4 * (stepCount - 1), 1 + 4 * (stepCount - 1)]);
                }
            }
            if (lastHorizontalAngle >= _consts__WEBPACK_IMPORTED_MODULE_0__.AngleTolerance || lastHorizontalAngle === 0) {
                vertices.push(lastLeftPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(-stepHeight)), lastRightPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(-stepHeight)));
                vertices.push(lastLeftPt, lastRightPt);
                if (temp) {
                    tempLines.push([4 * (stepCount - 1), 2 + 4 * (stepCount - 1)], [1 + 4 * (stepCount - 1), 3 + 4 * (stepCount - 1)], [2 + 4 * (stepCount - 1), 3 + 4 * (stepCount - 1)], [2 + 4 * (stepCount - 1), 4 + 4 * (stepCount - 1)], [3 + 4 * (stepCount - 1), 5 + 4 * (stepCount - 1)], [4 * stepCount, 1 + 4 * stepCount]);
                }
            }
        }
        if (stepCount > 1) {
            if (temp) {
                tempLines.push([vertices.length - 2, 2 + vertices.length - 2], [1 + vertices.length - 2, 3 + vertices.length - 2], [2 + vertices.length - 2, 3 + vertices.length - 2]);
            }
            const actualLastStepLength = lastHorizontalAngle < _consts__WEBPACK_IMPORTED_MODULE_0__.AngleTolerance ? horizontalStepAngle : lastHorizontalAngle;
            if (upward) {
                vertices.push(vertices[vertices.length - 2].added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(-stepHeight - (1 - actualLastStepLength / horizontalStepAngle) * stepHeight)), vertices[vertices.length - 1].added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(-stepHeight - (1 - actualLastStepLength / horizontalStepAngle) * stepHeight)));
                for (let j = stepCount - (lastHorizontalAngle >= _consts__WEBPACK_IMPORTED_MODULE_0__.AngleTolerance ? 1 : 2); j > 0; j--) {
                    const vInd = j * 4;
                    if (temp) {
                        tempLines.push([vertices.length - 2, 2 + vertices.length - 2], [1 + vertices.length - 2, 3 + vertices.length - 2]);
                        if (j === 1) {
                            tempLines.push([2 + vertices.length - 2, 0], [3 + vertices.length - 2, 1]);
                        }
                    }
                    vertices.push(vertices[vInd].added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(-stepHeight)), vertices[vInd + 1].added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(-stepHeight)));
                }
            }
            else {
                // vertices.push(
                //     vertices[vertices.length - 6].added(DirectionZ.multiplied(stepHeight)),
                //     vertices[vertices.length - 5].added(DirectionZ.multiplied(stepHeight)),
                // );
                for (let j = stepCount - (lastHorizontalAngle >= _consts__WEBPACK_IMPORTED_MODULE_0__.AngleTolerance ? 1 : 2); j >= 0; j--) {
                    const vInd = j * 4;
                    if (temp) {
                        tempLines.push([vertices.length - 2, 2 + vertices.length - 2], [1 + vertices.length - 2, 3 + vertices.length - 2]);
                        if (j === 0) {
                            tempLines.push([2 + vertices.length - 2, 0], [3 + vertices.length - 2, 1]);
                        }
                    }
                    vertices.push(vertices[vInd].added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(stepHeight)), vertices[vInd + 1].added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(stepHeight)));
                }
            }
        }
        else {
            if (temp) {
                tempLines.push([vertices.length - 2, 2 + vertices.length - 2], [1 + vertices.length - 2, 3 + vertices.length - 2], [2 + vertices.length - 2, 3 + vertices.length - 2], [2 + vertices.length - 2, 0], [3 + vertices.length - 2, 1]);
            }
            if (upward) {
                vertices.push(vertices[vertices.length - 2].added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(-stepHeight)), vertices[vertices.length - 1].added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(-stepHeight)));
            }
            else {
                vertices.push(vertices[0].added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(stepHeight)), vertices[1].added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(stepHeight)));
            }
        }
        if (baseComponent && baseComponent.line3dIndex !== undefined) {
            const baseLineSeg3d = baseComponent.line3d;
            const baseLineDir = baseLineSeg3d.end.subtracted(baseLineSeg3d.start).normalized();
            const angle = circleTangent.angle(baseLineDir);
            if (angle < Math.PI / 2) {
                const cornerConnectionPoint1 = start.added(baseLineDir.multiplied(-startWidth / 2 * Math.sign(angle)));
                cornerMoldShape.vertices = [start, start.added(tangentLeftDir.multiplied(-startWidth / 2)), cornerConnectionPoint1];
            }
            else {
                const cornerConnectionPoint2 = start.added(baseLineDir.multiplied(startWidth / 2 * Math.sign(angle)));
                cornerMoldShape.vertices = [start, cornerConnectionPoint2, start.added(tangentLeftDir.multiplied(startWidth / 2))];
            }
            cornerMoldShape.tempLines = [[0, 1], [1, 2], [2, 0]];
            cornerShape.vertices = [
                ...cornerMoldShape.vertices.map(v => v.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight))),
                ...cornerMoldShape.vertices.map(v => v.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight - platformThickness))),
            ];
            if (temp) {
                cornerShape.tempLines = [
                    [0, 1], [1, 2], [2, 0],
                    [3, 4], [4, 5], [5, 3],
                    [0, 3], [1, 4], [2, 5],
                ];
            }
        }
    }
}
function generateStraightStairShape(segment, temp = true) {
    const { start, end, stairShape, moldShape, cornerShape, cornerMoldShape, startHeight, baseComponent, param } = segment;
    const { startWidth, endWidth, horizontalStep, verticalStep, upward, platformThickness } = param;
    stairShape.vertices = [];
    stairShape.tempLines = [];
    moldShape.vertices = [];
    moldShape.tempLines = [];
    cornerShape.vertices = [];
    cornerShape.tempLines = [];
    cornerMoldShape.vertices = [];
    cornerMoldShape.tempLines = [];
    const { vertices, tempLines } = stairShape;
    const { vertices: moldVertices, tempLines: moldTempLines } = moldShape;
    let horizontalFrontDir = end.subtracted(start).normalized();
    let startEndDistance = start.distanceTo(end);
    let horizontalLeftDir = _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.cross(horizontalFrontDir);
    const stepFloatCount = startEndDistance / horizontalStep;
    const stepCount = Math.ceil(stepFloatCount);
    const lastStepLength = startEndDistance - (stepCount - 1) * horizontalStep;
    const validStepCount = (lastStepLength === 0 || lastStepLength > _consts__WEBPACK_IMPORTED_MODULE_0__.LengthTolerance) ? stepCount : stepCount - 1;
    if (validStepCount < 1 || validStepCount >= _consts__WEBPACK_IMPORTED_MODULE_0__.StepCountLimit) {
        return;
    }
    if (baseComponent) {
        const baseLineSeg3d = baseComponent.line3d;
        const baseLineDir = baseLineSeg3d.end.subtracted(baseLineSeg3d.start).normalized();
        const angle = horizontalFrontDir.angle(baseLineDir);
        const deltaAngle = Math.abs(angle - Math.PI / 2);
        if (deltaAngle <= _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionAngleTolerance) {
            segment.componentDirectionType = _types__WEBPACK_IMPORTED_MODULE_2__.ComponentDirectionType.Front;
            horizontalFrontDir = baseLineDir.cross(horizontalFrontDir.cross(baseLineDir)).normalized();
            startEndDistance = startEndDistance * Math.cos(deltaAngle);
            horizontalLeftDir = _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.cross(horizontalFrontDir);
        }
        else {
            if (angle < Math.PI / 2) {
                segment.componentDirectionType = _types__WEBPACK_IMPORTED_MODULE_2__.ComponentDirectionType.Left;
                const cornerConnectionPoint1 = start.added(baseLineDir.multiplied(-startWidth / 2 * Math.sign(angle)));
                cornerMoldShape.vertices = [start, start.added(horizontalLeftDir.multiplied(-startWidth / 2)), cornerConnectionPoint1];
            }
            else {
                segment.componentDirectionType = _types__WEBPACK_IMPORTED_MODULE_2__.ComponentDirectionType.Right;
                const cornerConnectionPoint2 = start.added(baseLineDir.multiplied(startWidth / 2 * Math.sign(angle)));
                cornerMoldShape.vertices = [start, cornerConnectionPoint2, start.added(horizontalLeftDir.multiplied(startWidth / 2))];
            }
            cornerMoldShape.tempLines = [[0, 1], [1, 2], [2, 0]];
            cornerShape.vertices = [
                ...cornerMoldShape.vertices.map(v => v.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight))),
                ...cornerMoldShape.vertices.map(v => v.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight - platformThickness))),
            ];
            if (temp) {
                cornerShape.tempLines = [
                    [0, 1], [1, 2], [2, 0],
                    [3, 4], [4, 5], [5, 3],
                    [0, 3], [1, 4], [2, 5],
                ];
            }
        }
    }
    const stepHeight = upward ? verticalStep : -verticalStep;
    segment.endHeight = segment.startHeight + validStepCount * stepHeight;
    stairShape.stepCount = validStepCount;
    moldShape.stepCount = validStepCount;
    const leftPt = start.added(horizontalLeftDir.multiplied(startWidth / 2));
    const rightPt = start.added(horizontalLeftDir.multiplied(-startWidth / 2));
    const widthDelta = (endWidth - startWidth) / 2 / (stepFloatCount);
    for (let i = 0; i < stepCount - 1; i++) {
        const curLeftMoldPt = leftPt.added(horizontalFrontDir.multiplied(i * horizontalStep)).added(horizontalLeftDir.multiplied(i * widthDelta));
        const curRightMoldPt = rightPt.added(horizontalFrontDir.multiplied(i * horizontalStep)).added(horizontalLeftDir.multiplied(-i * widthDelta));
        const curLeftPt = curLeftMoldPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight + i * stepHeight));
        const curRightPt = curRightMoldPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight + i * stepHeight));
        moldVertices.push(curLeftMoldPt, curRightMoldPt);
        moldTempLines.push([2 * i, 1 + 2 * i], [2 * i, 2 + 2 * i], [1 + 2 * i, 3 + 2 * i]);
        vertices.push(curLeftPt, curRightPt);
        if (upward) {
            vertices.push(curLeftPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(stepHeight)), curRightPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(stepHeight)));
        }
        else {
            vertices.push(curLeftPt.added(horizontalFrontDir.multiplied(horizontalStep)), curRightPt.added(horizontalFrontDir.multiplied(horizontalStep)));
        }
        if (temp) {
            tempLines.push([4 * i, 1 + 4 * i], [4 * i, 2 + 4 * i], [1 + 4 * i, 3 + 4 * i], [2 + 4 * i, 3 + 4 * i], [2 + 4 * i, 4 + 4 * i], [3 + 4 * i, 5 + 4 * i]);
        }
    }
    moldVertices.push(stepCount > 1 ? moldVertices[moldVertices.length - 2].added(horizontalFrontDir.multiplied(horizontalStep)) : leftPt, stepCount > 1 ? moldVertices[moldVertices.length - 1].added(horizontalFrontDir.multiplied(horizontalStep)) : rightPt);
    moldTempLines.push([2 * (stepCount - 1), 1 + 2 * (stepCount - 1)]);
    if (lastStepLength > _consts__WEBPACK_IMPORTED_MODULE_0__.LengthTolerance || lastStepLength === 0) {
        moldVertices.push(moldVertices[moldVertices.length - 2].added(horizontalLeftDir.multiplied(lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength)), moldVertices[moldVertices.length - 1].added(horizontalLeftDir.multiplied(-lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength)));
        moldTempLines.push([2 * (stepCount - 1), 2 + 2 * (stepCount - 1)], [1 + 2 * (stepCount - 1), 3 + 2 * (stepCount - 1)], [2 * stepCount, 1 + 2 * stepCount]);
    }
    if (upward) {
        vertices.push(stepCount > 1 ? vertices[vertices.length - 2].added(horizontalFrontDir.multiplied(horizontalStep)) : leftPt, stepCount > 1 ? vertices[vertices.length - 1].added(horizontalFrontDir.multiplied(horizontalStep)) : rightPt);
        if (temp) {
            tempLines.push([4 * (stepCount - 1), 1 + 4 * (stepCount - 1)]);
        }
        if (lastStepLength > _consts__WEBPACK_IMPORTED_MODULE_0__.LengthTolerance || lastStepLength === 0) {
            vertices.push(vertices[vertices.length - 2].added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(stepHeight)), vertices[vertices.length - 1].added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(stepHeight)));
            vertices.push(vertices[vertices.length - 2].added(horizontalLeftDir.multiplied(lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength)), vertices[vertices.length - 1].added(horizontalLeftDir.multiplied(-lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength)));
            if (temp) {
                tempLines.push(
                // [4 * stepCount, 1 + 4 * stepCount],
                [4 * (stepCount - 1), 2 + 4 * (stepCount - 1)], [1 + 4 * (stepCount - 1), 3 + 4 * (stepCount - 1)], [2 + 4 * (stepCount - 1), 3 + 4 * (stepCount - 1)], [2 + 4 * (stepCount - 1), 4 + 4 * (stepCount - 1)], [3 + 4 * (stepCount - 1), 5 + 4 * (stepCount - 1)], [4 * stepCount, 1 + 4 * stepCount]);
            }
        }
    }
    else {
        vertices.push(stepCount > 1 ? vertices[vertices.length - 2].added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(stepHeight)) : leftPt, stepCount > 1 ? vertices[vertices.length - 1].added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(stepHeight)) : rightPt);
        if (temp) {
            tempLines.push([4 * (stepCount - 1), 1 + 4 * (stepCount - 1)]);
        }
        if (lastStepLength > _consts__WEBPACK_IMPORTED_MODULE_0__.LengthTolerance || lastStepLength === 0) {
            vertices.push(vertices[vertices.length - 2].added(horizontalLeftDir.multiplied(lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength)), vertices[vertices.length - 1].added(horizontalLeftDir.multiplied(-lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength)));
            vertices.push(vertices[vertices.length - 2].added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(stepHeight)), vertices[vertices.length - 1].added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(stepHeight)));
            if (temp) {
                tempLines.push(
                // [4 * (stepCount - 1), 1 + 4 * (stepCount - 1)],
                [4 * (stepCount - 1), 2 + 4 * (stepCount - 1)], [1 + 4 * (stepCount - 1), 3 + 4 * (stepCount - 1)], [2 + 4 * (stepCount - 1), 3 + 4 * (stepCount - 1)], [2 + 4 * (stepCount - 1), 4 + 4 * (stepCount - 1)], [3 + 4 * (stepCount - 1), 5 + 4 * (stepCount - 1)], [4 * stepCount, 1 + 4 * stepCount]);
            }
        }
    }
    if (stepCount > 1) {
        if (temp) {
            tempLines.push([vertices.length - 2, 2 + vertices.length - 2], [1 + vertices.length - 2, 3 + vertices.length - 2], [2 + vertices.length - 2, 3 + vertices.length - 2], [2 + vertices.length - 2, 4 + vertices.length - 2], [3 + vertices.length - 2, 5 + vertices.length - 2], [vertices.length + 2, 1 + vertices.length + 2], [vertices.length + 2, 0], [1 + vertices.length + 2, 1]);
        }
        const actualLastStepLength = lastStepLength < _consts__WEBPACK_IMPORTED_MODULE_0__.LengthTolerance ? horizontalStep : lastStepLength;
        if (upward) {
            vertices.push(vertices[vertices.length - 2].added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(-stepHeight - (1 - actualLastStepLength / horizontalStep) * stepHeight)), vertices[vertices.length - 1].added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(-stepHeight - (1 - actualLastStepLength / horizontalStep) * stepHeight)));
            vertices.push(vertices[0].added(horizontalFrontDir.multiplied(horizontalStep)), vertices[1].added(horizontalFrontDir.multiplied(horizontalStep)));
        }
        else {
            vertices.push(vertices[vertices.length - 2].added(horizontalFrontDir.multiplied(-actualLastStepLength)), vertices[vertices.length - 1].added(horizontalFrontDir.multiplied(-actualLastStepLength)));
            vertices.push(vertices[0].added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(stepHeight)), vertices[1].added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(stepHeight)));
        }
    }
    else {
        if (temp) {
            tempLines.push([vertices.length - 2, 2 + vertices.length - 2], [1 + vertices.length - 2, 3 + vertices.length - 2], [2 + vertices.length - 2, 3 + vertices.length - 2], [2 + vertices.length - 2, 0], [3 + vertices.length - 2, 1]);
        }
        if (upward) {
            vertices.push(vertices[vertices.length - 2].added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(-stepHeight)), vertices[vertices.length - 1].added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(-stepHeight)));
        }
        else {
            vertices.push(vertices[0].added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(stepHeight)), vertices[1].added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(stepHeight)));
        }
    }
}
function generatePlatformShape(segment, temp = true) {
    const { start, startHeight, baseComponent, stairShape, moldShape, cornerShape, cornerMoldShape, param } = segment;
    const { startWidth, offsetWidth, withOffset, platformThickness, platformLength, platformLengthLocked, modelEditing } = param;
    const curDir = segment.end.subtracted(start);
    const curDirNormalized = segment.end.subtracted(start).normalized();
    const curLeftDir = _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.cross(curDir).normalized();
    stairShape.vertices = [];
    stairShape.tempLines = [];
    moldShape.vertices = [];
    moldShape.tempLines = [];
    cornerShape.vertices = [];
    cornerShape.tempLines = [];
    cornerMoldShape.vertices = [];
    cornerMoldShape.tempLines = [];
    segment.end = platformLengthLocked ? segment.start.added(curDirNormalized.multiplied(platformLength)) : segment.end;
    segment.endHeight = startHeight;
    if (!modelEditing) {
        param.withOffset = false;
    }
    if (baseComponent) {
        const baseLineSeg3d = baseComponent.line3d;
        const { start: baseLineStart, end: baseLineEnd } = baseLineSeg3d;
        const baseLineDir = baseLineEnd.subtracted(baseLineStart).normalized();
        const prevDirNormalized = baseLineDir.cross(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ).normalized();
        const prevLeftDir = _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.cross(prevDirNormalized).normalized();
        const angle = curDir.angleTo(prevDirNormalized, _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ);
        const frontLength = platformLengthLocked ? platformLength : Math.abs(curDir.dot(prevDirNormalized));
        const curEndLeftCorner = segment.end.added(curLeftDir.multiplied(startWidth / 2));
        const dir1 = curEndLeftCorner.subtracted(segment.start);
        const angle1 = dir1.angle(curDir);
        if ((angle >= Math.PI && angle <= (Math.PI * 3 / 2 + angle1)) || (modelEditing && withOffset && offsetWidth >= 0)) {
            segment.componentDirectionType = _types__WEBPACK_IMPORTED_MODULE_2__.ComponentDirectionType.Left;
            param.platformLength = frontLength;
            const frontEnd = segment.start.added(prevDirNormalized.multiplied(frontLength));
            segment.end = frontEnd;
            const leftLength = withOffset && modelEditing ? (offsetWidth + startWidth / 2) : curDir.dot(prevLeftDir);
            if (leftLength > startWidth / 2) {
                param.withOffset = true;
                param.offsetWidth = leftLength - startWidth / 2;
            }
            const validLeftLength = Math.max(startWidth / 2, leftLength);
            moldShape.vertices = [
                start.added(prevLeftDir.multiplied(validLeftLength)),
                start.added(prevLeftDir.multiplied(-startWidth / 2)),
                segment.end.added(prevLeftDir.multiplied(-startWidth / 2)),
                segment.end.added(prevLeftDir.multiplied(validLeftLength)),
            ];
            moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 0]];
            stairShape.vertices = [...moldShape.vertices.map(p => p.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight))),
                ...moldShape.vertices.map(p => p.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight - platformThickness))),
            ];
            if (temp) {
                stairShape.tempLines = [
                    ...moldShape.tempLines,
                    ...moldShape.tempLines.map(seg => [seg[0] + 4, seg[1] + 4]),
                    [0, 4], [1, 5], [2, 6], [3, 7],
                ];
            }
        }
        else if ((angle < Math.PI && angle >= (Math.PI / 2 - angle1)) || (modelEditing && withOffset && offsetWidth < 0)) {
            segment.componentDirectionType = _types__WEBPACK_IMPORTED_MODULE_2__.ComponentDirectionType.Right;
            param.platformLength = frontLength;
            const rightLength = withOffset && modelEditing ? (-offsetWidth + startWidth / 2) : -curDir.dot(prevLeftDir);
            const frontEnd1 = segment.start.added(prevDirNormalized.multiplied(frontLength));
            segment.end = frontEnd1;
            if (rightLength > startWidth / 2) {
                param.withOffset = true;
                param.offsetWidth = -(rightLength - startWidth / 2);
            }
            const validRightLength = Math.max(startWidth / 2, rightLength);
            moldShape.vertices = [
                start.added(prevLeftDir.multiplied(startWidth / 2)),
                start.added(prevLeftDir.multiplied(-validRightLength)),
                segment.end.added(prevLeftDir.multiplied(-validRightLength)),
                segment.end.added(prevLeftDir.multiplied(startWidth / 2)),
            ];
            moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 0]];
            stairShape.vertices = [...moldShape.vertices.map(p => p.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight))),
                ...moldShape.vertices.map(p => p.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight - platformThickness))),
            ];
            if (temp) {
                stairShape.tempLines = [
                    ...moldShape.tempLines,
                    ...moldShape.tempLines.map(seg => [seg[0] + 4, seg[1] + 4]),
                    [0, 4], [1, 5], [2, 6], [3, 7],
                ];
            }
        }
        else {
            param.offsetWidth = 0;
            if (angle <= _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionAngleTolerance || angle >= (Math.PI * 2 - _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionAngleTolerance)) {
                segment.componentDirectionType = _types__WEBPACK_IMPORTED_MODULE_2__.ComponentDirectionType.Front;
                segment.end = segment.start.added(prevDirNormalized.multiplied(frontLength));
                param.platformLength = frontLength;
                moldShape.vertices = [
                    start.added(prevLeftDir.multiplied(startWidth / 2)),
                    start.added(prevLeftDir.multiplied(-startWidth / 2 + offsetWidth)),
                    segment.end.added(prevLeftDir.multiplied(-startWidth / 2 + offsetWidth)),
                    segment.end.added(prevLeftDir.multiplied(startWidth / 2)),
                ];
                moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 0]];
                stairShape.vertices = [...moldShape.vertices.map(p => p.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight))),
                    ...moldShape.vertices.map(p => p.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight - platformThickness))),
                ];
                if (temp) {
                    stairShape.tempLines = [
                        ...moldShape.tempLines,
                        ...moldShape.tempLines.map(seg => [seg[0] + 4, seg[1] + 4]),
                        [0, 4], [1, 5], [2, 6], [3, 7],
                    ];
                }
            }
            else if (_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionAngleTolerance < angle && angle < (Math.PI / 2 - angle1)) {
                segment.componentDirectionType = _types__WEBPACK_IMPORTED_MODULE_2__.ComponentDirectionType.RightFront;
                param.platformLength = segment.end.distanceTo(segment.start);
                let leftConnectPoints = [start.added(curLeftDir.multiplied(startWidth / 2)), baseLineEnd];
                const baseLineEndDistance = start.distanceTo(baseLineEnd);
                const leftProjectDistance = startWidth / 2 * Math.cos(angle);
                if (leftProjectDistance < baseLineEndDistance) {
                    const l1 = startWidth / 2 / Math.cos(angle);
                    if (l1 > baseLineEndDistance) {
                        const a1 = l1 - baseLineEndDistance;
                        const c1 = a1 / Math.tan(angle);
                        leftConnectPoints = [start.added(prevLeftDir.multiplied(baseLineEndDistance)).added(prevDirNormalized.multiplied(c1)), start.added(prevLeftDir.multiplied(baseLineEndDistance))];
                    }
                    else {
                        leftConnectPoints = [start.added(prevLeftDir.multiplied(l1))];
                    }
                }
                moldShape.vertices = [
                    // start.added(curLeftDir.multiplied(startWidth / 2)),
                    ...leftConnectPoints,
                    start.added(prevLeftDir.multiplied(-startWidth / 2 / Math.cos(angle))),
                    segment.end.added(curLeftDir.multiplied(-startWidth / 2)),
                    segment.end.added(curLeftDir.multiplied(startWidth / 2)),
                ];
                const moldVertexCount = moldShape.vertices.length;
                moldShape.tempLines = generateTempLinesLoop(moldVertexCount);
                // if (moldVertexCount === 4) {
                // } else {
                //     moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]];
                // }
                stairShape.vertices = [...moldShape.vertices.map(p => p.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight))),
                    ...moldShape.vertices.map(p => p.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight - platformThickness))),
                ];
                if (temp) {
                    stairShape.tempLines = [
                        ...moldShape.tempLines,
                        ...moldShape.tempLines.map(seg => [seg[0] + moldVertexCount, seg[1] + moldVertexCount]),
                        ...moldShape.tempLines.map(seg => [seg[0], seg[0] + moldVertexCount]),
                        // [0, 5], [1, 6], [2, 7], [3, 8], [4, 9],
                    ];
                }
            }
            else if (angle > (Math.PI * 3 / 2 + angle1) && angle < (Math.PI * 2 - _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionAngleTolerance)) {
                segment.componentDirectionType = _types__WEBPACK_IMPORTED_MODULE_2__.ComponentDirectionType.LeftFront;
                param.platformLength = segment.end.distanceTo(segment.start);
                let rightConnectPoints = [baseLineStart, start.added(curLeftDir.multiplied(-startWidth / 2))];
                const baseLineStartDistance = start.distanceTo(baseLineStart);
                const rightProjectDistance = startWidth / 2 * Math.cos(angle);
                if (rightProjectDistance < baseLineStartDistance) {
                    // let rightConnectPoints = [baseLineStart, baseLineStart];
                    // if (startWidth <= prevParam.endWidth) {
                    const l2 = startWidth / 2 / Math.cos(angle);
                    if (l2 > baseLineStartDistance) {
                        const a2 = l2 - baseLineStartDistance;
                        const c2 = a2 / Math.tan(Math.PI * 2 - angle);
                        rightConnectPoints = [start.added(prevLeftDir.multiplied(-baseLineStartDistance)), start.added(prevLeftDir.multiplied(-baseLineStartDistance)).added(prevDirNormalized.multiplied(c2))];
                    }
                    else {
                        rightConnectPoints = [start.added(prevLeftDir.multiplied(-l2))];
                    }
                }
                moldShape.vertices = [
                    start.added(prevLeftDir.multiplied(startWidth / 2 / Math.cos(angle))),
                    ...rightConnectPoints,
                    // start.added(curLeftDir.multiplied(-startWidth / 2)),
                    segment.end.added(curLeftDir.multiplied(-startWidth / 2)),
                    segment.end.added(curLeftDir.multiplied(startWidth / 2)),
                ];
                const moldVertexCount = moldShape.vertices.length;
                moldShape.tempLines = generateTempLinesLoop(moldVertexCount);
                stairShape.vertices = [...moldShape.vertices.map(p => p.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight))),
                    ...moldShape.vertices.map(p => p.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight - platformThickness))),
                ];
                if (temp) {
                    stairShape.tempLines = [
                        ...moldShape.tempLines,
                        ...moldShape.tempLines.map(seg => [seg[0] + moldVertexCount, seg[1] + moldVertexCount]),
                        ...moldShape.tempLines.map(seg => [seg[0], seg[0] + moldVertexCount]),
                    ];
                }
            }
        }
        // }
    }
    else {
        param.platformLength = segment.end.distanceTo(segment.start);
        moldShape.vertices = [
            start.added(curLeftDir.multiplied(startWidth / 2)),
            start.added(curLeftDir.multiplied(-startWidth / 2)),
            segment.end.added(curLeftDir.multiplied(-startWidth / 2)),
            segment.end.added(curLeftDir.multiplied(startWidth / 2)),
        ];
        moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 0]];
        stairShape.vertices = [...moldShape.vertices,
            ...moldShape.vertices.map(p => p.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(-platformThickness))),
        ];
        if (temp) {
            stairShape.tempLines = [
                ...moldShape.tempLines,
                ...moldShape.tempLines.map(seg => [seg[0] + 4, seg[1] + 4]),
                [0, 4], [1, 5], [2, 6], [3, 7],
            ];
        }
    }
}
const ColumnStepTolerance = 1 / 5;
function generateHandrailShape(stairParam, segments) {
    const { handrail: { support, height, column: { step } } } = stairParam;
    if (segments.length && support) {
        const handrails = [];
        const unVisited = new Set(segments);
        const visited = new Map();
        for (const segment of segments) {
            if (!segment.moldShape.tempLines.length) {
                return undefined;
            }
            visited.set(segment.param.index, { left: false, right: false, line3dIndexes: new Set() });
        }
        let current = [{
                segment: segments[0],
                line3dInd: getSegmentStartAndBaseLine3d(segments[0], segments).startLine.line3dInd,
                left: false,
                start: true,
            }];
        let handrail = { rail: [], columns: [] };
        const stepTolerance = step * ColumnStepTolerance;
        while (current.length) {
            let next = [];
            for (const { segment: currentSegment, line3dInd, startPoint, left } of current) {
                const { param: { index, type, startWidth, endWidth, horizontalStep, verticalStep, upward }, start, end, startHeight, endHeight, moldShape: { vertices: moldVertices, tempLines: moldTempLines, stepCount }, nextComponents, baseComponent, circleTangent, startLocked, componentDirectionType, circularSide, } = currentSegment;
                unVisited.delete(currentSegment);
                if (!startLocked) {
                    continue;
                }
                const stepHeight = upward ? verticalStep : -verticalStep;
                const offsetLength = Math.min(_types__WEBPACK_IMPORTED_MODULE_2__.HandrailDefaultOffsetLength, horizontalStep / 4);
                const baseSegment = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_1__.getSegmentByIndex)(segments, baseComponent === null || baseComponent === void 0 ? void 0 : baseComponent.componentIndex);
                const { startLine: { line3dInd: startLine3dInd }, baseLine: { dir: baseLine3dDir, endWithOffset: baseLine3dEndWithOffset }, } = getSegmentStartAndBaseLine3d(currentSegment, segments, baseSegment, offsetLength);
                const startToEndDir = end.subtracted(start).normalized();
                let frontDir = circleTangent ? circleTangent : startToEndDir;
                const angle = frontDir.angle(baseLine3dDir);
                const deltaAngle = Math.abs(angle - Math.PI / 2);
                if (deltaAngle <= _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionAngleTolerance) {
                    frontDir = baseLine3dDir.cross(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ).normalized();
                }
                let leftDir = _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.cross(frontDir);
                let sp = start.added(leftDir.multiplied(startWidth / 2 * (left ? 1 : -1)));
                let ep = end.added(leftDir.multiplied(endWidth / 2 * (left ? 1 : -1)));
                let lastLength = sp.distanceTo(ep);
                let spToEpDir = ep.subtracted(sp).normalized();
                let nextStartPoint = left ? sp : ep;
                let pushEnd = true;
                const line3dDir = moldVertices[moldTempLines[line3dInd][1]].subtracted(moldVertices[moldTempLines[line3dInd][0]]).normalized();
                let offsetDir = _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.cross(line3dDir);
                const visitedRecord = visited.get(index);
                if (type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.Platform) {
                    const line3d = moldTempLines[line3dInd];
                    sp = startPoint || moldVertices[line3d[0]];
                    ep = moldVertices[line3d[1]];
                    lastLength = sp.distanceTo(ep);
                    spToEpDir = ep.subtracted(sp).normalized();
                    const nextLine3dInd = (line3dInd + 1) % moldTempLines.length;
                    const visitedLine3dIndexes = visitedRecord === null || visitedRecord === void 0 ? void 0 : visitedRecord.line3dIndexes;
                    const isEntrance = (visitedLine3dIndexes === null || visitedLine3dIndexes === void 0 ? void 0 : visitedLine3dIndexes.has(line3dInd)) && (visitedLine3dIndexes === null || visitedLine3dIndexes === void 0 ? void 0 : visitedLine3dIndexes.has(nextLine3dInd));
                    const hasEntranceSegment = line3dInd === startLine3dInd;
                    let nearestSegment;
                    for (const nextSegmentIndex of nextComponents[line3dInd]) {
                        const nextSegment = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_1__.getSegmentByIndex)(segments, nextSegmentIndex);
                        if (nextSegment) {
                            const { start } = nextSegment;
                            const ds = start.distanceTo(sp);
                            const de = start.distanceTo(ep);
                            const visitNextRecord = visited.get(nextSegment.param.index);
                            const nextComponentStartLine3dInd = getSegmentStartAndBaseLine3d(nextSegment, segments, undefined, offsetLength).startLine.line3dInd;
                            if ((0,_utils__WEBPACK_IMPORTED_MODULE_3__.isEqual)(ds + de, lastLength) && !(visitNextRecord === null || visitNextRecord === void 0 ? void 0 : visitNextRecord.right) && !(visitNextRecord === null || visitNextRecord === void 0 ? void 0 : visitNextRecord.line3dIndexes.has(nextComponentStartLine3dInd))) {
                                if (!nearestSegment || nearestSegment.distance > ds) {
                                    nearestSegment = { segment: nextSegment, distance: ds };
                                }
                            }
                        }
                    }
                    const firstBottomPt = sp.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight)).added(offsetDir.multiplied(offsetLength)).added(line3dDir.multiplied(startPoint ? 0 : offsetLength));
                    let lastDistance = Math.max(lastLength - offsetLength, 0);
                    if (nearestSegment) {
                        const { endOnBaseLineWithOffset } = getSegmentStartAndBaseLine3d(nearestSegment.segment, segments, undefined, offsetLength).startLine;
                        ep = endOnBaseLineWithOffset;
                        spToEpDir = ep.subtracted(sp).normalized();
                        if (spToEpDir.dot(line3dDir) <= 0) {
                            lastDistance = 0;
                            pushEnd = false;
                            nextStartPoint = sp.added(line3dDir.multiplied(offsetLength));
                        }
                        else {
                            lastDistance = sp.distanceTo(ep);
                            nextStartPoint = isPlatform(nearestSegment.segment) ? ep : undefined;
                        }
                    }
                    else if (isEntrance && hasEntranceSegment && baseSegment) {
                        //     // don't care because next is platform (next will deal the case) or stair (only have one nextComponent which is currentSegment)
                        // if (baseSegment.param.type === ComponentType.Platform && nextSiblingSegment) {
                        ep = baseLine3dEndWithOffset;
                        spToEpDir = ep.subtracted(sp).normalized();
                        if (spToEpDir.dot(baseLine3dDir) >= 0) {
                            lastDistance = 0;
                            pushEnd = false;
                            const nextCornerDistance = ep.distanceTo(sp);
                            if (nextCornerDistance > offsetLength) {
                                nextStartPoint = sp.added(line3dDir.multiplied(offsetLength));
                            }
                            else {
                                nextStartPoint = undefined;
                            }
                        }
                        else {
                            lastDistance = sp.distanceTo(ep);
                            nextStartPoint = isPlatform(baseSegment) ? ep : undefined;
                        }
                    }
                    else if (isEntrance) {
                        lastDistance = 0;
                        pushEnd = false;
                    }
                    else {
                        pushEnd = false;
                        // pushEnd = line3dInd === moldTempLines.length - 1;
                    }
                    if (lastDistance > 0 || (lastDistance === 0 && !startPoint)) {
                        // push rail
                        handrail.rail.push(firstBottomPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height)));
                    }
                    // push columns
                    if (lastDistance > 0) {
                        let tempDistance = offsetLength;
                        while (tempDistance <= lastDistance) {
                            const isEnd = tempDistance === lastDistance;
                            const bottomPoint = tempDistance > 0 ? sp.added(spToEpDir.multiplied(tempDistance)).added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight)).added(offsetDir.multiplied(offsetLength)) :
                                firstBottomPt;
                            handrail.columns.push([
                                bottomPoint,
                                bottomPoint.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height)),
                            ]);
                            if (isEnd) {
                                handrail.rail.push(bottomPoint.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height)));
                            }
                            const deltaDistance = (lastDistance - tempDistance);
                            tempDistance += (deltaDistance <= (step + stepTolerance) && deltaDistance >= stepTolerance) ? (pushEnd ? deltaDistance : Infinity) : step;
                        }
                    }
                    if (nearestSegment) {
                        next.push({
                            segment: nearestSegment.segment,
                            line3dInd: getSegmentStartAndBaseLine3d(nearestSegment.segment, segments, undefined, offsetLength).startLine.line3dInd,
                            left: false,
                            start: false,
                            startPoint: nextStartPoint,
                        });
                    }
                    else {
                        if (isEntrance) {
                            if (baseSegment && hasEntranceSegment) {
                                //     // never happen
                                // if (nextSiblingSegment && baseSegment.param.type !== ComponentType.Platform) {
                                next.push({
                                    segment: baseSegment,
                                    line3dInd: baseSegment.param.type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.Platform ? (baseComponent === null || baseComponent === void 0 ? void 0 : baseComponent.line3dIndex) || 0 : 0,
                                    left: true,
                                    start: false,
                                    startPoint: nextStartPoint,
                                });
                            }
                            else {
                                // end of this patch, the patch are start with platform
                                handrails.push(handrail);
                                handrail = { rail: [], columns: [] };
                            }
                        }
                        else {
                            // end of this line3d
                            next.push({
                                segment: currentSegment,
                                line3dInd: nextLine3dInd,
                                left: false,
                                start: false,
                            });
                        }
                        visitedLine3dIndexes === null || visitedLine3dIndexes === void 0 ? void 0 : visitedLine3dIndexes.add(line3dInd);
                    }
                }
                else {
                    let columnActualHeight = height + verticalStep / 2;
                    const isRightStair = componentDirectionType === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentDirectionType.Right;
                    const isLeftStair = componentDirectionType === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentDirectionType.Left;
                    const stairRail = [];
                    const stairColumns = [];
                    const cornerBaseDir = (!left && isRightStair) || (left && isLeftStair) ? leftDir : baseLine3dDir;
                    let cornerStartHeight = left ? endHeight : startHeight;
                    let cornerSideWidth = left ? endWidth : startWidth;
                    let sideCornerStart = left ? end : start;
                    let cornerEnd = sideCornerStart.added(cornerBaseDir.multiplied((cornerSideWidth / 2 + offsetLength) * (left ? 1 : -1)));
                    let cornerDistance = (startPoint || sp).distanceTo(cornerEnd);
                    // along cornerBaseDir
                    let cornerSpToEpDir = cornerEnd.subtracted(startPoint || sp).normalized();
                    let cornerOffsetDir = _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.cross(cornerSpToEpDir);
                    let cornerAdditionalHeight = !left && !isLeftStair && upward ? stepHeight : 0;
                    const headCornerRail = [];
                    const headCornerColumns = [];
                    if (startPoint) {
                        let tempHeadDistance = 0;
                        headCornerRail.push(startPoint.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(cornerStartHeight + cornerAdditionalHeight + height)).added(cornerOffsetDir.multiplied(offsetLength)));
                        while (tempHeadDistance < cornerDistance) {
                            const bottomPoint = startPoint.added(cornerSpToEpDir.multiplied(tempHeadDistance)).added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(cornerStartHeight + cornerAdditionalHeight)).added(cornerOffsetDir.multiplied(offsetLength));
                            headCornerColumns.push([
                                bottomPoint,
                                bottomPoint.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height)),
                            ]);
                            tempHeadDistance += step;
                        }
                        if (!left && isLeftStair) {
                            const lastBottomPoint = cornerEnd.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(cornerStartHeight + cornerAdditionalHeight)).added(cornerOffsetDir.multiplied(offsetLength));
                            // push rail
                            headCornerRail.push(lastBottomPoint.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height)));
                            if ((cornerDistance - tempHeadDistance + step) > stepTolerance) {
                                headCornerColumns.push([
                                    lastBottomPoint,
                                    lastBottomPoint.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height)),
                                ]);
                            }
                        }
                    }
                    nextStartPoint = left ? sp.added(line3dDir.multiplied(offsetLength)) : ep.added(line3dDir.multiplied(-offsetLength));
                    // next segment startWidth !== currentSegment endWidth
                    pushEnd = false;
                    const reasonableStepCount = Math.ceil(step / horizontalStep);
                    let tempStepCount = 0;
                    const arcChordAngle = circleTangent ? startToEndDir.angle(circleTangent) : 0;
                    const startFrontOffsetLength = Math.min(horizontalStep / 2, offsetLength);
                    const prevTotalStepLength = (stepCount - 1) * horizontalStep;
                    const prevTotalVerStepLength = (stepCount - 1) * stepHeight;
                    const totalLength = Math.abs(end.subtracted(start).dot(frontDir));
                    const lastStepLength = lastLength - prevTotalStepLength;
                    let lastFrontOffsetLength = Math.min(lastStepLength / 2, offsetLength);
                    if (type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.StraightStair || (type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.CircularStair && (arcChordAngle <= _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionAngleTolerance || !circleTangent))) {
                        lastLength = sp.distanceTo(ep);
                        // push rail
                        stairRail.push(sp.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight + height + (upward ? 1 : 0) * stepHeight)).added(leftDir.multiplied(left ? -offsetLength : offsetLength)).added(frontDir.multiplied(startFrontOffsetLength)));
                        if (!upward && stepCount > 1) {
                            stairRail.push(sp.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight + height)).added(frontDir.multiplied(horizontalStep)).added(leftDir.multiplied(left ? -offsetLength : offsetLength)));
                        }
                        // push columns
                        while (tempStepCount < stepCount - 1) {
                            const curHorStepDistance = (tempStepCount + 0.5) * horizontalStep;
                            const curVerStepDistance = (tempStepCount + (upward ? 1 : 0)) * stepHeight;
                            let curColumnActualHeight = columnActualHeight;
                            if (upward) {
                                curColumnActualHeight = (curHorStepDistance - lastFrontOffsetLength) / (prevTotalStepLength - lastFrontOffsetLength) * prevTotalVerStepLength - curVerStepDistance + stepHeight + height;
                            }
                            else {
                                curColumnActualHeight = (1 - (curHorStepDistance - horizontalStep) / (lastLength - horizontalStep - lastFrontOffsetLength)) * -prevTotalVerStepLength + (stepCount - 1 - tempStepCount) * stepHeight + height;
                            }
                            const bottomPoint = sp.added(frontDir.multiplied(curHorStepDistance)).added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight + curVerStepDistance)).added(leftDir.multiplied(left ? -offsetLength : offsetLength));
                            stairColumns.push([
                                bottomPoint,
                                bottomPoint.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(!upward && tempStepCount === 0 ? height : curColumnActualHeight)),
                            ]);
                            tempStepCount += reasonableStepCount;
                        }
                        if (stepCount > 1) {
                            if (upward) {
                                stairRail.push(sp.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight + height + (upward ? stepCount : (stepCount - (stepCount > 2 ? 2 : 1))) * stepHeight)).added(frontDir.multiplied((stepCount - 1) * horizontalStep)).added(leftDir.multiplied(left ? -offsetLength : offsetLength)));
                            }
                        }
                        stairRail.push(sp.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight + height + (upward ? stepCount : stepCount - 1) * stepHeight)).added(frontDir.multiplied(totalLength - lastFrontOffsetLength)).added(leftDir.multiplied(left ? -offsetLength : offsetLength)));
                        if (tempStepCount - reasonableStepCount <= stepCount - 1) {
                            const lastColumnActualHeight = (lastStepLength / 2 - lastFrontOffsetLength) / (lastLength - horizontalStep - lastFrontOffsetLength) * -prevTotalVerStepLength + height;
                            const lastBottomPoint = sp.added(frontDir.multiplied(prevTotalStepLength + lastStepLength / 2)).added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(endHeight + (upward ? 0 : -stepHeight))).added(leftDir.multiplied(left ? -offsetLength : offsetLength));
                            stairColumns.push([
                                lastBottomPoint,
                                lastBottomPoint.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(upward ? height : lastColumnActualHeight)),
                            ]);
                        }
                        // next segment startWidth !== currentSegment endWidth
                        // sp = left ? start.added(baseLine3dDir.multiplied(startWidth / 2)) : end.added(leftDir.multiplied(-startWidth / 2));
                        sp = left ? start.added(baseLine3dDir.multiplied(startWidth / 2 - offsetLength)) : end.added(leftDir.multiplied(-startWidth / 2 + offsetLength));
                    }
                    else if (circleTangent) {
                        const tangentLeftDir = _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.cross(circleTangent).normalized();
                        const startEndDistance = start.distanceTo(end);
                        const maxWidth = Math.max(startWidth, endWidth);
                        const endAngle = startToEndDir.angleTo(circleTangent, _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ);
                        const isLeftArc = circularSide === _types__WEBPACK_IMPORTED_MODULE_2__.CircularSide.Left;
                        const endComplementaryAngle = isLeftArc ? Math.abs(endAngle - Math.PI / 2 - Math.PI) : Math.abs(endAngle - Math.PI / 2);
                        const halfChord = startEndDistance / 2;
                        const radius = halfChord / Math.cos(endComplementaryAngle);
                        const innerRadius = radius - maxWidth / 2;
                        const horizontalStepAngle = Math.asin(horizontalStep / 2 / innerRadius) * 2;
                        const circleNormal = isLeftArc ? _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ : _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.reversed();
                        const circleCenter = start.added(tangentLeftDir.multiplied(isLeftArc ? radius : -radius));
                        const arc = GeomLib.createArc3dByCenterNormalRadius(circleCenter, circleNormal, radius, start, end);
                        const arcAngle = arc.arcAngle;
                        const lastHorizontalAngle = arcAngle - horizontalStepAngle * (stepCount - 1);
                        const startRadiusDir = isLeftArc ? tangentLeftDir.reversed() : tangentLeftDir;
                        // push columns
                        while (tempStepCount < stepCount) {
                            const curRotateAngle = horizontalStepAngle * tempStepCount;
                            const nextRotateAngle = horizontalStepAngle * tempStepCount + (tempStepCount === stepCount - 1 ? lastHorizontalAngle : horizontalStepAngle);
                            const curRotateMatrix = GeomLib.createRotateMatrix4(horizontalStepAngle * tempStepCount, circleNormal, _consts__WEBPACK_IMPORTED_MODULE_0__.dummyPoint3d);
                            const nextRotateMatrix = GeomLib.createRotateMatrix4(nextRotateAngle, circleNormal, _consts__WEBPACK_IMPORTED_MODULE_0__.dummyPoint3d);
                            const curRadiusDir = startRadiusDir.appliedMatrix4(curRotateMatrix);
                            const nextRadiusDir = startRadiusDir.appliedMatrix4(nextRotateMatrix);
                            const curHalfWidth = (startWidth + (endWidth - startWidth) * (curRotateAngle) / arcAngle) / 2 * (isLeftArc ? -1 : 1) - offsetLength;
                            const nextHalfWidth = (startWidth + (endWidth - startWidth) * (nextRotateAngle) / arcAngle) / 2 * (isLeftArc ? -1 : 1) - offsetLength;
                            const curLeftMoldPt = circleCenter.added(curRadiusDir.multiplied(radius + curHalfWidth));
                            const curRightMoldPt = circleCenter.added(curRadiusDir.multiplied(radius - curHalfWidth));
                            const nextLeftMoldPt = circleCenter.added(nextRadiusDir.multiplied(radius + nextHalfWidth));
                            const nextRightMoldPt = circleCenter.added(nextRadiusDir.multiplied(radius - nextHalfWidth));
                            const curStepLeftFrontDir = nextLeftMoldPt.subtracted(curLeftMoldPt).multiplied(0.5);
                            const curStepRightFrontDir = nextRightMoldPt.subtracted(curRightMoldPt).multiplied(0.5);
                            const curStepLeftDir = _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.cross(curStepLeftFrontDir).normalized();
                            // const curStepRightDir = DirectionZ.cross(curStepRightFrontDir).normalized();
                            const curLeftBottomPt = curLeftMoldPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight + (tempStepCount + (upward ? 1 : 0)) * stepHeight));
                            const curRightBottomPt = curRightMoldPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight + (tempStepCount + (upward ? 1 : 0)) * stepHeight));
                            const curLeftBottomMidPt = curLeftBottomPt.added(curStepLeftFrontDir);
                            const curRightBottomMidPt = curRightBottomPt.added(curStepRightFrontDir);
                            if (tempStepCount >= 0) {
                                // push rail
                                if (left) {
                                    stairRail.push(curLeftBottomPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height + (tempStepCount > 0 && !upward ? -stepHeight : 0))).added(curStepLeftFrontDir.normalized().multiplied(tempStepCount === 0 ? startFrontOffsetLength : 0)));
                                }
                                else {
                                    stairRail.push(curRightBottomPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height + (tempStepCount > 0 && !upward ? -stepHeight : 0))).added(curStepRightFrontDir.normalized().multiplied(tempStepCount === 0 ? startFrontOffsetLength : 0)));
                                }
                                if (tempStepCount === stepCount - 1) {
                                    const lastStepPercent = lastHorizontalAngle / horizontalStepAngle;
                                    const lastLeftHorStep = (radius + curHalfWidth) / radius * horizontalStep * lastStepPercent;
                                    const lastRightHorStep = (radius - curHalfWidth) / radius * horizontalStep * lastStepPercent;
                                    // const offsetAngle = offsetLength / horizontalStep;
                                    lastFrontOffsetLength = Math.min(offsetLength, lastStepPercent / 2 * horizontalStep);
                                    const lastSideHorStep = left ? lastLeftHorStep : lastRightHorStep;
                                    const lastColumnActualHeight = -stepHeight * Math.max((lastSideHorStep / 2 - lastFrontOffsetLength) / (lastSideHorStep - lastFrontOffsetLength), 0) + height;
                                    if (left) {
                                        stairRail.push(curLeftBottomMidPt.added(curStepLeftFrontDir).added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height)).added(curStepLeftFrontDir.normalized().multiplied(-lastFrontOffsetLength)));
                                    }
                                    else {
                                        stairRail.push(curRightBottomMidPt.added(curStepRightFrontDir).added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height)).added(curStepRightFrontDir.normalized().multiplied(-lastFrontOffsetLength)));
                                    }
                                    stairColumns.push([
                                        left ? curLeftBottomMidPt : curRightBottomMidPt,
                                        (left ? curLeftBottomMidPt : curRightBottomMidPt).added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(upward ? height : lastColumnActualHeight)),
                                    ]);
                                    // next segment startWidth !== currentSegment endWidth
                                    // sp = left ? start.added(baseLine3dDir.multiplied(startWidth / 2)) : nextRightMoldPt;
                                    sp = left ? start.added(baseLine3dDir.multiplied(startWidth / 2 - offsetLength)) : nextRightMoldPt;
                                    if (!left) {
                                        leftDir = curStepLeftDir;
                                    }
                                }
                            }
                            if (tempStepCount % reasonableStepCount === 0 && tempStepCount < stepCount - 1) {
                                let startColumnActualHeight = columnActualHeight;
                                if (tempStepCount === 0 && upward) {
                                    const startLeftHorStep = (radius + curHalfWidth) / radius * horizontalStep;
                                    const startRightHorStep = (radius - curHalfWidth) / radius * horizontalStep;
                                    const startSideHorStep = left ? startLeftHorStep : startRightHorStep;
                                    startColumnActualHeight = stepHeight * (startSideHorStep / 2 - startFrontOffsetLength) / (startSideHorStep - startFrontOffsetLength) + height;
                                }
                                stairColumns.push([
                                    left ? curLeftBottomMidPt : curRightBottomMidPt,
                                    (left ? curLeftBottomMidPt : curRightBottomMidPt).added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied((tempStepCount === 0 ? (upward ? startColumnActualHeight : height) : columnActualHeight))),
                                ]);
                            }
                            tempStepCount += 1;
                        }
                    }
                    handrail.rail.push(...headCornerRail);
                    handrail.columns.push(...headCornerColumns);
                    if (left) {
                        handrail.rail.push(...stairRail.reverse());
                        handrail.columns.push(...stairColumns.reverse());
                    }
                    else {
                        handrail.rail.push(...stairRail);
                        handrail.columns.push(...stairColumns);
                    }
                    let stairNextSegment;
                    for (const nextSegmentIndex of nextComponents[line3dInd]) {
                        const nextSegment = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_1__.getSegmentByIndex)(segments, nextSegmentIndex);
                        const nextSegmentVisitedRecord = visited.get((nextSegment === null || nextSegment === void 0 ? void 0 : nextSegment.param.index) || -1);
                        if (nextSegment && ((isPlatform(nextSegment) && !(nextSegmentVisitedRecord === null || nextSegmentVisitedRecord === void 0 ? void 0 : nextSegmentVisitedRecord.line3dIndexes.size)) || (!isPlatform(nextSegment) && !(nextSegmentVisitedRecord === null || nextSegmentVisitedRecord === void 0 ? void 0 : nextSegmentVisitedRecord.right)))) {
                            stairNextSegment = nextSegment;
                        }
                    }
                    if (left) {
                        if (baseSegment) {
                            //     // never happen
                            // if (nextSiblingSegment && baseSegment.param.type !== ComponentType.Platform) {
                            ep = baseLine3dEndWithOffset;
                            spToEpDir = ep.subtracted(sp).normalized();
                            if (spToEpDir.dot(baseLine3dDir) >= 0) {
                                nextStartPoint = sp;
                            }
                            else {
                                pushEnd = true;
                                nextStartPoint = isPlatform(baseSegment) ? ep : undefined;
                                ;
                            }
                            next.push({
                                segment: baseSegment,
                                line3dInd: baseSegment.param.type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.Platform ? (baseComponent === null || baseComponent === void 0 ? void 0 : baseComponent.line3dIndex) || 0 : 0,
                                left: true,
                                start: false,
                                startPoint: nextStartPoint,
                            });
                        }
                        else {
                            // end the patch which is start with currentSegment
                            handrails.push(handrail);
                            handrail = { rail: [], columns: [] };
                        }
                        if (visitedRecord) {
                            visitedRecord.left = true;
                        }
                    }
                    else {
                        if (stairNextSegment) {
                            const { line3dInd: stairNextLine3dInd, endOnBaseLineWithOffset } = getSegmentStartAndBaseLine3d(stairNextSegment, segments, currentSegment, offsetLength).startLine;
                            ep = endOnBaseLineWithOffset;
                            spToEpDir = ep.subtracted(sp).normalized();
                            if (spToEpDir.dot(line3dDir) >= 0) {
                                nextStartPoint = sp;
                            }
                            else {
                                pushEnd = true;
                                nextStartPoint = isPlatform(stairNextSegment) ? ep : undefined;
                            }
                            next.push({
                                segment: stairNextSegment,
                                line3dInd: stairNextLine3dInd,
                                left: false,
                                start: false,
                                startPoint: nextStartPoint,
                            });
                        }
                        else {
                            next.push({
                                segment: currentSegment,
                                line3dInd: 0,
                                left: true,
                                start: false,
                                // startPoint: nextStartPoint,
                            });
                            // end the patch which is end with stair component
                            handrails.push(handrail);
                            handrail = { rail: [], columns: [] };
                        }
                        if (visitedRecord) {
                            visitedRecord.right = true;
                        }
                    }
                    if (pushEnd) {
                        // let currentCornerSideWidth = left ? startWidth : endWidth;
                        // let currentSideCornerStart = left ? start : end;
                        // ep is reused when pushEnd
                        let tempTailDistance = step;
                        // let tempTailDistance = left ? 0 : step;
                        if (left && isLeftStair) {
                            sp = start.added(leftDir.multiplied(startWidth / 2 - offsetLength));
                        }
                        cornerStartHeight = left ? startHeight : endHeight;
                        cornerEnd = ep;
                        cornerDistance = sp.distanceTo(cornerEnd);
                        // along cornerBaseDir
                        cornerSpToEpDir = cornerEnd.subtracted(sp).normalized();
                        cornerOffsetDir = _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.cross(cornerSpToEpDir);
                        cornerAdditionalHeight = left && !isRightStair && upward ? stepHeight : (!left && !upward ? -stepHeight : 0);
                        // cornerSpToEpDir = cornerEnd.subtracted(sp).normalized();
                        // cornerOffsetDir = DirectionZ.cross(cornerSpToEpDir);
                        while (tempTailDistance < cornerDistance) {
                            const bottomPoint = sp.added(cornerSpToEpDir.multiplied(tempTailDistance)).added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(cornerStartHeight + cornerAdditionalHeight)).added(cornerOffsetDir.multiplied(offsetLength));
                            handrail.columns.push([
                                bottomPoint,
                                bottomPoint.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height)),
                            ]);
                            tempTailDistance += step;
                        }
                        const lastBottomPoint = ep.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(cornerStartHeight + cornerAdditionalHeight)).added(cornerOffsetDir.multiplied(offsetLength));
                        // const lastBottomPoint = ep.added(DirectionZ.multiplied(left ? endHeight : startHeight)).added(cornerOffsetDir.multiplied(offsetLength));
                        if (left && isRightStair) {
                            handrail.rail.push(sp.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(cornerStartHeight + height + cornerAdditionalHeight)));
                        }
                        // push rail
                        handrail.rail.push(lastBottomPoint.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height)));
                        if ((cornerDistance - tempTailDistance + step) > stepTolerance) {
                            handrail.columns.push([
                                lastBottomPoint,
                                lastBottomPoint.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height)),
                            ]);
                        }
                    }
                }
            }
            current = next;
            if (!current.length) {
                if (unVisited.size) {
                    const theSegment = [...unVisited.values()][0];
                    current = [{
                            segment: theSegment,
                            line3dInd: getSegmentStartAndBaseLine3d(theSegment, segments).startLine.line3dInd,
                            left: false,
                            start: true,
                        }];
                }
            }
        }
        return handrails;
    }
}
function generateTempLinesLoop(vertexCount) {
    return Array.from({ length: vertexCount }).map((_, i) => [i, i === vertexCount - 1 ? 0 : i + 1]);
}
function getSegmentStartAndBaseLine3d(segment, segments, baseSegment, offsetLength) {
    const { start, param: { type, startWidth }, componentDirectionType, moldShape: { tempLines, vertices }, baseComponent } = segment;
    if (offsetLength === undefined) {
        offsetLength = _types__WEBPACK_IMPORTED_MODULE_2__.HandrailDefaultOffsetLength;
    }
    let startLine3dInd = 0;
    // 5 edges
    if (type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.Platform && componentDirectionType === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentDirectionType.RightFront && tempLines.length > 4) {
        startLine3dInd = 1;
    }
    const startLine3d = tempLines[startLine3dInd];
    const startLine3dStart = vertices[startLine3d[0]];
    const startLine3dEnd = vertices[startLine3d[1]];
    const startLine3dDir = startLine3dEnd.subtracted(startLine3dStart).normalized();
    let baseLine3dInd = (baseComponent === null || baseComponent === void 0 ? void 0 : baseComponent.componentIndex) || 0;
    let baseLine3d = [...startLine3d].reverse();
    let baseLine3dStart = vertices[startLine3d[1]];
    let baseLine3dEnd = vertices[startLine3d[0]];
    let baseLine3dDir = startLine3dDir.reversed();
    ;
    if (!baseSegment && baseComponent) {
        baseSegment = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_1__.getSegmentByIndex)(segments, baseComponent.componentIndex);
    }
    if (baseSegment) {
        const { moldShape: { vertices: baseVertices, tempLines: baseTempLines } } = baseSegment;
        baseLine3d = baseSegment.param.type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.Platform ? baseTempLines[(baseComponent === null || baseComponent === void 0 ? void 0 : baseComponent.line3dIndex) || 0] : [...baseTempLines[baseTempLines.length - 1]].reverse();
        baseLine3dStart = baseVertices[baseLine3d[0]];
        baseLine3dEnd = baseVertices[baseLine3d[1]];
        baseLine3dDir = baseLine3dEnd.subtracted(baseLine3dStart).normalized();
    }
    let baseLine3dStartWithOffset = baseLine3dStart.added(baseLine3dDir.multiplied(offsetLength));
    let baseLine3dEndWithOffset = baseLine3dEnd.added(baseLine3dDir.multiplied(-offsetLength));
    let startOnBaseLine = startLine3dStart;
    let endOnBaseLine = startLine3dEnd;
    let startOnBaseLineWithOffset = startLine3dStart.added(startLine3dDir.multiplied(offsetLength));
    let endOnBaseLineWithOffset = startLine3dEnd.added(startLine3dDir.multiplied(-offsetLength));
    if (type !== _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.Platform) {
        startOnBaseLine = start.added(baseLine3dDir.multiplied(startWidth / 2));
        endOnBaseLine = start.added(baseLine3dDir.multiplied(-startWidth / 2));
        startOnBaseLineWithOffset = start.added(baseLine3dDir.multiplied(startWidth / 2 - offsetLength));
        endOnBaseLineWithOffset = start.added(baseLine3dDir.multiplied(-startWidth / 2 + offsetLength));
    }
    return {
        startLine: { line3dInd: startLine3dInd, line3d: startLine3d, dir: startLine3dDir, start: startLine3dStart, end: startLine3dEnd, startOnBaseLine, endOnBaseLine, startOnBaseLineWithOffset, endOnBaseLineWithOffset },
        baseLine: { line3dInd: baseLine3dInd, line3d: baseLine3d, dir: baseLine3dDir, start: baseLine3dStart, end: baseLine3dEnd, startWithOffset: baseLine3dStartWithOffset, endWithOffset: baseLine3dEndWithOffset },
    };
}
function isPlatform(segment) {
    return segment.param.type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.Platform;
}
function isCircularStair(segment) {
    return segment.param.type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.CircularStair;
}
function isStraightStair(segment) {
    return segment.param.type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.StraightStair;
}


/***/ }),

/***/ "./src/main/tools/DrawStairsTool/types.ts":
/*!************************************************!*\
  !*** ./src/main/tools/DrawStairsTool/types.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseComponentKey: () => (/* binding */ BaseComponentKey),
/* harmony export */   BaseLine3dDelimiter: () => (/* binding */ BaseLine3dDelimiter),
/* harmony export */   BaseLineSeg3dKey: () => (/* binding */ BaseLineSeg3dKey),
/* harmony export */   CircleTangentKey: () => (/* binding */ CircleTangentKey),
/* harmony export */   CircularSide: () => (/* binding */ CircularSide),
/* harmony export */   ColumnMaterialKey: () => (/* binding */ ColumnMaterialKey),
/* harmony export */   ColumnModelKey: () => (/* binding */ ColumnModelKey),
/* harmony export */   ColumnType: () => (/* binding */ ColumnType),
/* harmony export */   ComponentDirectionType: () => (/* binding */ ComponentDirectionType),
/* harmony export */   ComponentIndexKey: () => (/* binding */ ComponentIndexKey),
/* harmony export */   ComponentMaterialKey: () => (/* binding */ ComponentMaterialKey),
/* harmony export */   ComponentParamKey: () => (/* binding */ ComponentParamKey),
/* harmony export */   ComponentParamSettings: () => (/* binding */ ComponentParamSettings),
/* harmony export */   ComponentParamType: () => (/* binding */ ComponentParamType),
/* harmony export */   ComponentType: () => (/* binding */ ComponentType),
/* harmony export */   CoordDelimiter: () => (/* binding */ CoordDelimiter),
/* harmony export */   DefaultComponentParam: () => (/* binding */ DefaultComponentParam),
/* harmony export */   DefaultStairParam: () => (/* binding */ DefaultStairParam),
/* harmony export */   Delimiter: () => (/* binding */ Delimiter),
/* harmony export */   HandrailDefaultOffsetLength: () => (/* binding */ HandrailDefaultOffsetLength),
/* harmony export */   HandrailModelKey: () => (/* binding */ HandrailModelKey),
/* harmony export */   MaterialAssignType: () => (/* binding */ MaterialAssignType),
/* harmony export */   ModelValue: () => (/* binding */ ModelValue),
/* harmony export */   PlatformMaterialKey: () => (/* binding */ PlatformMaterialKey),
/* harmony export */   PresetMaterials: () => (/* binding */ PresetMaterials),
/* harmony export */   RailMaterialKey: () => (/* binding */ RailMaterialKey),
/* harmony export */   RailModelKey: () => (/* binding */ RailModelKey),
/* harmony export */   RailType: () => (/* binding */ RailType),
/* harmony export */   StairMaterialKey: () => (/* binding */ StairMaterialKey),
/* harmony export */   StairModelKey: () => (/* binding */ StairModelKey),
/* harmony export */   StairParamKey: () => (/* binding */ StairParamKey),
/* harmony export */   StartEndKey: () => (/* binding */ StartEndKey),
/* harmony export */   getComponentTitle: () => (/* binding */ getComponentTitle),
/* harmony export */   getDefaultStairParam: () => (/* binding */ getDefaultStairParam),
/* harmony export */   isAxisValid: () => (/* binding */ isAxisValid)
/* harmony export */ });
const StairModelKey = 'DSModel';
const ModelValue = '1';
const HandrailModelKey = 'Handrail';
const RailModelKey = 'Rail';
const ColumnModelKey = 'Column';
// export const StairKey = 'DSStair';
// export const PlatformKey = 'DSPlatform';
const StairParamKey = 'SParam';
const ComponentParamKey = 'CParam';
const StairMaterialKey = 'SMat';
const PlatformMaterialKey = 'PMat';
const RailMaterialKey = 'HRMat';
const ColumnMaterialKey = 'HCMat';
const ComponentMaterialKey = 'CMat';
// startHeight and endHeight cached in start and end
const ComponentIndexKey = 'Ind';
const StartEndKey = 'SToE';
const BaseLineSeg3dKey = 'BaseLine';
const BaseComponentKey = 'BaseComponent';
const CircleTangentKey = 'CircleTangent';
const Delimiter = '&';
const CoordDelimiter = ',';
const BaseLine3dDelimiter = '_';
const ProdMaterials = {
    Stair: { bgId: '3FO4LHERBPPY', materialId: '5972e993aa01f3585f51decb' },
    // Stair: { bgId: '3FO4ATKECLKI', materialId: '6168f454cdd25e00017d75d0' },
    Platform: { bgId: '3FO44T7MYFA5', materialId: '64562afd6fbc3b0001a3251c' },
    Handrail: {
        rail: { bgId: '3FO4LHERE7NP', materialId: '5972e8d7aa01f3585f51de97' },
        column: { bgId: '3FO4LHERE7NP', materialId: '5972e8d7aa01f3585f51de97' },
    },
};
const PresetMaterials = ProdMaterials;
// const DevMaterials = {
//     Stair: { bgId: '3FO4H2D73JFO', materialId: '58af961b4a4d2c4f8aa2b1da' },
//     // Stair: { bgId: '3FO4ATKECLKI', materialId: '6168f454cdd25e00017d75d0' },
//     Platform: { bgId: '3FO4H2D6CQMY', materialId: '5816fef985da566a1b28a944' },
//     Handrail: {
//         rail: { bgId: '3FO4H2D6H8SB', materialId: '58afb3ab5c26a073b389a95f' },
//         column: { bgId: '3FO4GDK5EXDC', materialId: '5e532fb42014020001cc4889' },
//     },
// }
// export const PresetMaterials = ((window as any).origin || '').includes('sit') ? DevMaterials : ProdMaterials;
var ComponentParamType;
(function (ComponentParamType) {
    ComponentParamType["HorizontalStep"] = "horizontalStep";
    ComponentParamType["VerticalStep"] = "verticalStep";
    ComponentParamType["StartWidth"] = "startWidth";
    ComponentParamType["EndWidth"] = "endWidth";
    ComponentParamType["Upward"] = "upward";
    ComponentParamType["PlatformThickness"] = "platformThickness";
    ComponentParamType["ComponentMaterial"] = "material";
    ComponentParamType["Type"] = "type";
    ComponentParamType["PlatformLength"] = "platformLength";
    ComponentParamType["StepProportional"] = "stepProportional";
    ComponentParamType["WidthProportional"] = "widthProportional";
    ComponentParamType["PlatformLengthLocked"] = "platformLengthLocked";
    ComponentParamType["StairMaterial"] = "stairMaterial";
    ComponentParamType["PlatformMaterial"] = "platformMaterial";
    ComponentParamType["Handrail"] = "handrail";
    ComponentParamType["HandrailHeight"] = "handrailHeight";
    ComponentParamType["HandrailRailType"] = "handrailRailType";
    ComponentParamType["HandrailRailRadius"] = "handrailRailRadius";
    ComponentParamType["HandrailRailWidth"] = "handrailRailWidth";
    ComponentParamType["HandrailRailHeight"] = "handrailRailHeight";
    ComponentParamType["HandrailRailMaterial"] = "RailMaterial";
    ComponentParamType["HandrailColumnType"] = "handrailColumnType";
    ComponentParamType["HandrailColumnStep"] = "handrailColumnStep";
    ComponentParamType["HandrailColumnRadius"] = "handrailColumnRadius";
    ComponentParamType["HandrailColumnWidth"] = "handrailColumnWidth";
    ComponentParamType["HandrailColumnHeight"] = "handrailColumnHeight";
    ComponentParamType["HandrailColumnMaterial"] = "ColumnMaterial";
})(ComponentParamType || (ComponentParamType = {}));
// interface ParamSettings {
//     min: number;
//     max: number;
//     step: number;
//     unit: string;
//     precision: number;
// }
var ComponentType;
(function (ComponentType) {
    ComponentType[ComponentType["StraightStair"] = 0] = "StraightStair";
    ComponentType[ComponentType["CircularStair"] = 1] = "CircularStair";
    ComponentType[ComponentType["Platform"] = 2] = "Platform";
})(ComponentType || (ComponentType = {}));
var RailType;
(function (RailType) {
    RailType[RailType["Circle"] = 0] = "Circle";
    RailType[RailType["Rect"] = 1] = "Rect";
    RailType[RailType["Custom"] = 99] = "Custom";
})(RailType || (RailType = {}));
var ColumnType;
(function (ColumnType) {
    ColumnType[ColumnType["Circle"] = 0] = "Circle";
    ColumnType[ColumnType["Rect"] = 1] = "Rect";
    ColumnType[ColumnType["Custom"] = 99] = "Custom";
})(ColumnType || (ColumnType = {}));
const ComponentParamSettings = {
    horizontalStep: { title: "步长", min: 1, max: 100000, step: 20, unit: '长', precision: 0, },
    verticalStep: { title: "步长", min: 1, max: 100000, step: 20, unit: '高', precision: 0, },
    startWidth: { title: "宽度", min: 1, max: 100000, step: 50, unit: '起', precision: 0, },
    endWidth: { title: "宽度", min: 1, max: 100000, step: 50, unit: '终', precision: 0, },
    platformLength: { title: "长度", min: 100, max: 100000, step: 50, unit: '', precision: 0, },
    type: {
        // radioValues: [ComponentType.StraightStair, ComponentType.CircularStair, ComponentType.Platform],
        // texts: ["直阶", "旋转阶梯", "平台"],
        title: "类型",
        radioOptions: [
            { value: ComponentType.StraightStair, text: "直阶" },
            { value: ComponentType.CircularStair, text: "旋转阶梯" },
            { value: ComponentType.Platform, text: "平台" },
        ]
    },
    upward: {
        // radioValues: [1, 0],
        // texts: ["向上", "向下"],
        title: "方向",
        radioOptions: [
            { value: true, text: "向上" },
            { value: false, text: "向下" },
        ]
    },
    platformThickness: { title: "厚度", min: 1, max: 100000, step: 10, unit: '', precision: 0, },
    material: { title: '材质' },
    stairMaterial: { title: '阶梯材质' },
    platformMaterial: { title: '平台材质' },
    handrail: {
        title: '启用栏杆',
        height: { title: "高度", min: 1, max: 100000, step: 10, unit: '', precision: 0, },
        rail: {
            type: {
                title: "样式",
                selectOptions: [
                    { value: RailType.Circle, label: "圆形" },
                    { value: RailType.Rect, label: "方形" },
                    // { value: RailType.Custom, label: "拾取" },
                ]
            },
        },
        column: {
            type: {
                title: "样式",
                selectOptions: [
                    { value: ColumnType.Circle, label: "圆形" },
                    { value: ColumnType.Rect, label: "方形" },
                    // { value: ColumnType.Custom, label: "拾取" },
                ]
            },
            step: { title: "间隔", min: 1, max: 100000, step: 10, unit: '', precision: 0, },
        },
        componentParam: {
            radius: { title: "半径", min: 1, max: 100000, step: 1, unit: '', precision: 0, },
            width: { title: "宽度", min: 1, max: 100000, step: 1, unit: '', precision: 0, },
            height: { title: "高度", min: 1, max: 100000, step: 1, unit: '', precision: 0, },
        }
    }
};
var MaterialAssignType;
(function (MaterialAssignType) {
    MaterialAssignType["StairOverall"] = "stairOverall";
    MaterialAssignType["PlatformOverall"] = "platformOverall";
    MaterialAssignType["Rail"] = "rail";
    MaterialAssignType["Column"] = "column";
})(MaterialAssignType || (MaterialAssignType = {}));
function getComponentTitle(componentType) {
    if (componentType === ComponentType.StraightStair) {
        return '阶';
    }
    else if (componentType === ComponentType.CircularStair) {
        return '阶';
    }
    else {
        return '台';
    }
}
const HandrailDefaultOffsetLength = 40;
const DefaultStairParam = {
    horizontalStep: 200,
    verticalStep: 200,
    startWidth: 1000,
    endWidth: 1000,
    upward: true,
    platformThickness: 100,
    stairMaterial: PresetMaterials.Stair,
    platformMaterial: PresetMaterials.Platform,
    handrail: {
        support: true,
        height: 400,
        rail: {
            type: RailType.Circle,
            param: { radius: 16, width: 40, height: 30, },
            material: PresetMaterials.Handrail.rail,
        },
        column: {
            type: ColumnType.Circle,
            step: 500,
            param: { radius: 8, width: 12, height: 12, },
            material: PresetMaterials.Handrail.column,
        },
    },
    stepProportional: true,
    widthProportional: true,
};
function getDefaultStairParam() {
    return {
        horizontalStep: 250,
        verticalStep: 250,
        startWidth: 1000,
        endWidth: 1000,
        upward: true,
        platformThickness: 200,
        stairMaterial: PresetMaterials.Stair,
        platformMaterial: PresetMaterials.Platform,
        handrail: {
            support: true,
            height: 500,
            rail: {
                type: RailType.Circle,
                param: { radius: 20, width: 60, height: 30, },
                material: PresetMaterials.Handrail.rail,
            },
            column: {
                type: ColumnType.Circle,
                step: 500,
                param: { radius: 8, width: 16, height: 16, },
                material: PresetMaterials.Handrail.column,
            },
        },
        stepProportional: true,
        widthProportional: true,
    };
}
const DefaultComponentParam = {
    index: 0,
    horizontalStep: DefaultStairParam.horizontalStep,
    verticalStep: DefaultStairParam.verticalStep,
    startWidth: DefaultStairParam.startWidth,
    endWidth: DefaultStairParam.endWidth,
    offsetWidth: 0,
    withOffset: false,
    platformLength: 2000,
    type: ComponentType.StraightStair,
    upward: DefaultStairParam.upward,
    platformThickness: DefaultStairParam.platformThickness,
    stepProportional: DefaultStairParam.stepProportional,
    widthProportional: true,
    platformLengthLocked: false,
    // stepType: StepType.Normal,
    // cornerType: CornerType.Rectangle,
};
var ComponentDirectionType;
(function (ComponentDirectionType) {
    ComponentDirectionType[ComponentDirectionType["Front"] = 0] = "Front";
    ComponentDirectionType[ComponentDirectionType["RightFront"] = 1] = "RightFront";
    ComponentDirectionType[ComponentDirectionType["Right"] = 2] = "Right";
    ComponentDirectionType[ComponentDirectionType["Left"] = 3] = "Left";
    ComponentDirectionType[ComponentDirectionType["LeftFront"] = 4] = "LeftFront";
})(ComponentDirectionType || (ComponentDirectionType = {}));
var CircularSide;
(function (CircularSide) {
    CircularSide[CircularSide["Left"] = 0] = "Left";
    CircularSide[CircularSide["Right"] = 1] = "Right";
})(CircularSide || (CircularSide = {}));
function isAxisValid(axis) {
    return axis === "X" /* Axis.X */ || axis === "-X" /* Axis.XMinus */ || axis === "Y" /* Axis.Y */ || axis === "-Y" /* Axis.YMinus */ || axis === "Z" /* Axis.Z */ || axis === "-Z" /* Axis.ZMinus */;
}


/***/ }),

/***/ "./src/main/tools/DrawStairsTool/utils.ts":
/*!************************************************!*\
  !*** ./src/main/tools/DrawStairsTool/utils.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   abortOperation: () => (/* binding */ abortOperation),
/* harmony export */   commitOperation: () => (/* binding */ commitOperation),
/* harmony export */   getCoordinate: () => (/* binding */ getCoordinate),
/* harmony export */   isEqual: () => (/* binding */ isEqual),
/* harmony export */   isKArc3d: () => (/* binding */ isKArc3d),
/* harmony export */   isKArchFace: () => (/* binding */ isKArchFace),
/* harmony export */   isKAuxiliaryBoundedCurve: () => (/* binding */ isKAuxiliaryBoundedCurve),
/* harmony export */   isKAuxiliaryLine: () => (/* binding */ isKAuxiliaryLine),
/* harmony export */   isKEdge: () => (/* binding */ isKEdge),
/* harmony export */   isKFace: () => (/* binding */ isKFace),
/* harmony export */   isKGroupInstance: () => (/* binding */ isKGroupInstance),
/* harmony export */   isKLineSegment3d: () => (/* binding */ isKLineSegment3d),
/* harmony export */   isKPlane: () => (/* binding */ isKPlane),
/* harmony export */   isKVertex: () => (/* binding */ isKVertex),
/* harmony export */   isPartOfEditModel: () => (/* binding */ isPartOfEditModel),
/* harmony export */   onModelChanged: () => (/* binding */ onModelChanged),
/* harmony export */   parseBaseComponent: () => (/* binding */ parseBaseComponent),
/* harmony export */   parseComponentParam: () => (/* binding */ parseComponentParam),
/* harmony export */   parseLineSeg3d: () => (/* binding */ parseLineSeg3d),
/* harmony export */   parseMaterial: () => (/* binding */ parseMaterial),
/* harmony export */   parseStairParam: () => (/* binding */ parseStairParam),
/* harmony export */   parseStartEnd: () => (/* binding */ parseStartEnd),
/* harmony export */   parseVector3d: () => (/* binding */ parseVector3d),
/* harmony export */   startOperation: () => (/* binding */ startOperation),
/* harmony export */   stringifyBaseComponent: () => (/* binding */ stringifyBaseComponent),
/* harmony export */   stringifyComponentParam: () => (/* binding */ stringifyComponentParam),
/* harmony export */   stringifyMaterial: () => (/* binding */ stringifyMaterial),
/* harmony export */   stringifyPoint3d: () => (/* binding */ stringifyPoint3d),
/* harmony export */   stringifyStairParam: () => (/* binding */ stringifyStairParam),
/* harmony export */   stringifyStartEnd: () => (/* binding */ stringifyStartEnd)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/main/tools/DrawStairsTool/index.ts");
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./consts */ "./src/main/tools/DrawStairsTool/consts.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "./src/main/tools/DrawStairsTool/types.ts");



function isKArchFace(entity) {
    return !!entity && (entity.getType() === KArchFaceType.NonPlanar || entity.getType() === KArchFaceType.Planar);
}
function isKGroupInstance(entity) {
    return !!entity && entity.getType() === KEntityType.GroupInstance;
}
function isKFace(entity) {
    return !!entity && entity.getType() === KEntityType.Face;
}
function isKEdge(entity) {
    return !!entity && entity.getType() === KEntityType.Edge;
}
function isKVertex(entity) {
    return !!entity && entity.getType() === KEntityType.Vertex;
}
function isKAuxiliaryBoundedCurve(entity) {
    return !!entity && entity.getType() === KEntityType.AuxiliaryBoundedCurve;
}
function isKAuxiliaryLine(entity) {
    return !!entity && entity.getType() === KEntityType.AuxiliaryLine;
}
function isKPlane(entity) {
    return !!entity && entity.getType() === KSurfaceType.Plane;
}
function isKLineSegment3d(entity) {
    return !!entity && !!entity.direction;
}
function isKArc3d(entity) {
    return !!entity && !!entity.circle;
}
function stringifyMaterial(material) {
    let value = '';
    if (material.materialId) {
        value += `mid=${material.materialId}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
    }
    if (material.bgid) {
        value += `bid=${material.bgid}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
    }
    if (material.imgUrl) {
        value += `img=${material.imgUrl}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
    }
    return value.slice(0, value.length - 1);
}
function parseMaterial(value) {
    const material = {};
    const items = value.split(_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter);
    for (const item of items) {
        const keyValue = item.split('=');
        if (keyValue.length === 2) {
            switch (keyValue[0]) {
                case 'mid':
                    material.materialId = keyValue[1];
                    break;
                case 'bid':
                    material.bgid = keyValue[1];
                    break;
                case 'img':
                    material.imgUrl = keyValue[1];
                    break;
            }
        }
    }
    if (items.length) {
        return material;
    }
}
function stringifyStairParam(param) {
    let value = '';
    value += `hs=${param.horizontalStep}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
    value += `vs=${param.verticalStep}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
    value += `sw=${param.startWidth}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
    value += `ew=${param.endWidth}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
    value += `up=${param.upward ? 1 : 0}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
    value += `ptk=${param.platformThickness}`;
    if (param.handrail.support) {
        const { handrail: { height, rail, column } } = param;
        value += `hh=${height}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
        value += `hrt=${rail.type}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
        if (rail.type === _types__WEBPACK_IMPORTED_MODULE_2__.RailType.Circle && rail.param.radius !== undefined) {
            value += `hrr=${rail.param.radius}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
        }
        else if (rail.type === _types__WEBPACK_IMPORTED_MODULE_2__.RailType.Rect) {
            if (rail.param.width !== undefined) {
                value += `hrw=${rail.param.width}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
            }
            if (rail.param.height !== undefined) {
                value += `hrh=${rail.param.height}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
            }
        }
        value += `hct=${column.type}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
        value += `hcs=${column.step}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
        if (column.type === _types__WEBPACK_IMPORTED_MODULE_2__.ColumnType.Circle && column.param.radius !== undefined) {
            value += `hcr=${column.param.radius}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
        }
        else if (column.type === _types__WEBPACK_IMPORTED_MODULE_2__.ColumnType.Rect) {
            if (column.param.width !== undefined) {
                value += `hcw=${column.param.width}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
            }
            if (column.param.height !== undefined) {
                value += `hch=${column.param.height}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
            }
        }
    }
    return value.slice(0, value.length - 1);
}
function parseStairParam(value) {
    const param = (0,_types__WEBPACK_IMPORTED_MODULE_2__.getDefaultStairParam)();
    const items = value.split(_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter);
    for (const item of items) {
        const keyValue = item.split('=');
        if (keyValue.length === 2) {
            switch (keyValue[0]) {
                case 'hs':
                    param.horizontalStep = parseInt(keyValue[1]);
                    break;
                case 'vs':
                    param.verticalStep = parseInt(keyValue[1]);
                    break;
                case 'sw':
                    param.startWidth = parseInt(keyValue[1]);
                    break;
                case 'ew':
                    param.endWidth = parseInt(keyValue[1]);
                    break;
                case 'up':
                    param.upward = keyValue[1] === '1' ? true : false;
                    break;
                case 'ptk':
                    param.platformThickness = parseInt(keyValue[1]);
                    break;
                case 'hh':
                    param.handrail.height = parseFloat(keyValue[1]);
                    break;
                case 'hrt':
                    param.handrail.rail.type = parseFloat(keyValue[1]);
                    break;
                case 'hrr':
                    param.handrail.rail.param.radius = parseInt(keyValue[1]);
                    break;
                case 'hrw':
                    param.handrail.rail.param.width = parseInt(keyValue[1]);
                    break;
                case 'hrh':
                    param.handrail.rail.param.height = parseInt(keyValue[1]);
                    break;
                case 'hct':
                    param.handrail.column.type = parseFloat(keyValue[1]);
                    break;
                case 'hcs':
                    param.handrail.column.step = parseFloat(keyValue[1]);
                    break;
                case 'hcr':
                    param.handrail.column.param.radius = parseInt(keyValue[1]);
                    break;
                case 'hcw':
                    param.handrail.column.param.width = parseInt(keyValue[1]);
                    break;
                case 'hch':
                    param.handrail.column.param.height = parseInt(keyValue[1]);
                    break;
            }
        }
    }
    param.stepProportional = true;
    param.widthProportional = true;
    return param;
}
function stringifyComponentParam(param) {
    let value = '';
    value += `ind=${param.index}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
    value += `hs=${param.horizontalStep}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
    value += `vs=${param.verticalStep}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
    value += `sw=${param.startWidth}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
    value += `ew=${param.endWidth}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
    value += `ow=${param.offsetWidth}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
    value += `pl=${param.platformLength}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
    value += `tp=${param.type}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
    value += `up=${param.upward ? 1 : 0}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
    value += `ptk=${param.platformThickness}`;
    return value;
}
function parseComponentParam(value) {
    const param = Object.assign({}, _types__WEBPACK_IMPORTED_MODULE_2__.DefaultComponentParam);
    const items = value.split(_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter);
    for (const item of items) {
        const keyValue = item.split('=');
        if (keyValue.length === 2) {
            switch (keyValue[0]) {
                case 'ind':
                    param.index = parseInt(keyValue[1]);
                    break;
                case 'hs':
                    param.horizontalStep = parseInt(keyValue[1]);
                    break;
                case 'vs':
                    param.verticalStep = parseInt(keyValue[1]);
                    break;
                case 'sw':
                    param.startWidth = parseInt(keyValue[1]);
                    break;
                case 'ew':
                    param.endWidth = parseInt(keyValue[1]);
                    break;
                case 'ow':
                    param.offsetWidth = parseFloat(keyValue[1]);
                    break;
                case 'pl':
                    param.platformLength = parseFloat(keyValue[1]);
                    break;
                case 'tp':
                    param.type = parseInt(keyValue[1]);
                    break;
                case 'up':
                    param.upward = keyValue[1] === '1' ? true : false;
                    break;
                case 'ptk':
                    param.platformThickness = parseInt(keyValue[1]);
                    break;
            }
        }
    }
    param.stepProportional = true;
    param.widthProportional = true;
    param.platformLengthLocked = true;
    param.modelEditing = true;
    return param;
}
function stringifyStartEnd(start, end) {
    let value = '';
    value += `${start.x}${_types__WEBPACK_IMPORTED_MODULE_2__.CoordDelimiter}`;
    value += `${start.y}${_types__WEBPACK_IMPORTED_MODULE_2__.CoordDelimiter}`;
    value += `${start.z}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
    value += `${end.x}${_types__WEBPACK_IMPORTED_MODULE_2__.CoordDelimiter}`;
    value += `${end.y}${_types__WEBPACK_IMPORTED_MODULE_2__.CoordDelimiter}`;
    value += `${end.z}`;
    return value;
}
function parseLineSeg3d(value) {
    const items = value.split(_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter);
    if (items.length === 2) {
        const startKeyValue = items[0].split(_types__WEBPACK_IMPORTED_MODULE_2__.CoordDelimiter);
        const endKeyValue = items[1].split(_types__WEBPACK_IMPORTED_MODULE_2__.CoordDelimiter);
        if (startKeyValue.length === 3 && endKeyValue.length === 3) {
            const start = GeomLib.createPoint3d(parseFloat(startKeyValue[0]), parseFloat(startKeyValue[1]), parseFloat(startKeyValue[2]));
            const end = GeomLib.createPoint3d(parseFloat(endKeyValue[0]), parseFloat(endKeyValue[1]), parseFloat(endKeyValue[2]));
            return { start, end };
        }
    }
}
function parseStartEnd(value) {
    const items = value.split(_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter);
    if (items.length === 2) {
        const startKeyValue = items[0].split(_types__WEBPACK_IMPORTED_MODULE_2__.CoordDelimiter);
        const endKeyValue = items[1].split(_types__WEBPACK_IMPORTED_MODULE_2__.CoordDelimiter);
        if (startKeyValue.length === 3 && endKeyValue.length === 3) {
            const start = GeomLib.createPoint3d(parseFloat(startKeyValue[0]), parseFloat(startKeyValue[1]), 0);
            const end = GeomLib.createPoint3d(parseFloat(endKeyValue[0]), parseFloat(endKeyValue[1]), 0);
            return { start, end, startHeight: parseFloat(startKeyValue[2]), endHeight: parseFloat(endKeyValue[2]) };
        }
    }
}
function stringifyPoint3d(point) {
    let value = '';
    value += `${point.x}${_types__WEBPACK_IMPORTED_MODULE_2__.CoordDelimiter}`;
    value += `${point.y}${_types__WEBPACK_IMPORTED_MODULE_2__.CoordDelimiter}`;
    value += `${point.z}`;
    return value;
}
function parseVector3d(value) {
    const items = value.split(_types__WEBPACK_IMPORTED_MODULE_2__.CoordDelimiter);
    if (items.length === 3) {
        const vector = GeomLib.createVector3d(parseFloat(items[0]), parseFloat(items[1]), parseFloat(items[2]));
        return vector;
    }
}
function stringifyBaseComponent(baseSegment, line3dIndex) {
    let value = '';
    value += `${baseSegment.param.index}`;
    if (line3dIndex !== undefined) {
        value += `${_types__WEBPACK_IMPORTED_MODULE_2__.CoordDelimiter}${line3dIndex}`;
    }
    return value;
}
function parseBaseComponent(value) {
    const items = value.split(_types__WEBPACK_IMPORTED_MODULE_2__.CoordDelimiter);
    if (value.length && items.length > 0) {
        const baseComponentIndex = parseInt(items[0]);
        let line3dIndex;
        if (items.length === 2) {
            line3dIndex = parseInt(items[1]);
        }
        return { componentIndex: baseComponentIndex, line3dIndex };
    }
}
function isEqual(a, b, tolerance = 1) {
    return Math.abs(a - b) <= tolerance;
}
function getCoordinate(normal) {
    let dx = _consts__WEBPACK_IMPORTED_MODULE_1__.DirectionX;
    let dy = _consts__WEBPACK_IMPORTED_MODULE_1__.DirectionZ;
    let dz = normal.normalized();
    if (_consts__WEBPACK_IMPORTED_MODULE_1__.DirectionZ.isParallel(dz)) {
        dx = _consts__WEBPACK_IMPORTED_MODULE_1__.DirectionY.cross(dz).normalized();
        dy = dz.cross(dx).normalized();
    }
    else {
        dx = dy.cross(dz).normalized();
        dy = dz.cross(dx).normalized();
    }
    return { dx, dy, dz };
}
let isInOperation = false;
function startOperation() {
    isInOperation = true;
    app.getActiveDesign().startOperation();
}
function commitOperation() {
    app.getActiveDesign().commitOperation();
    isInOperation = false;
}
function abortOperation() {
    app.getActiveDesign().abortOperation();
    isInOperation = false;
}
function onModelChanged(changes) {
    const deleted = changes.deleted;
    const added = changes.added;
    // const editModel = drawStairsTool.getEditModel();
    if (!isInOperation && ((deleted === null || deleted === void 0 ? void 0 : deleted.length) || (added === null || added === void 0 ? void 0 : added.length))) {
        // if (deleted.some(deleteGroup => editModel.parent.definitionKey === deleteGroup.getKey())) {
        _index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool.clearEditModel();
        // }
    }
}
function isPartOfEditModel(editModel, groupInstance) {
    var _a, _b, _c;
    const groupInstanceKey = groupInstance.getKey();
    return editModel.parent.instanceKey === groupInstanceKey ||
        [...editModel.stairs.values()].some(instanceData => instanceData.instanceKey === groupInstanceKey) ||
        [...editModel.platforms.values()].some(instanceData => instanceData.instanceKey === groupInstanceKey) ||
        ((_a = editModel.handrail) === null || _a === void 0 ? void 0 : _a.handrailInstance.instanceKey) === groupInstanceKey ||
        [...(((_b = editModel.handrail) === null || _b === void 0 ? void 0 : _b.railInstances) || []).values()].some(instanceData => instanceData.instanceKey === groupInstanceKey) ||
        [...(((_c = editModel.handrail) === null || _c === void 0 ? void 0 : _c.columnInstances) || []).values()].some(instanceData => instanceData.instanceKey === groupInstanceKey);
}


/***/ }),

/***/ "./src/main/types.ts":
/*!***************************!*\
  !*** ./src/main/types.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MessageType: () => (/* binding */ MessageType)
/* harmony export */ });
var MessageType;
(function (MessageType) {
    MessageType["DrawStairViewMounted"] = "drawStairViewMounted";
    MessageType["StairParamChangedByInput"] = "stairParamChangedByInput";
    MessageType["StairParamChangedByDraw"] = "stairParamChangedByDraw";
    MessageType["ParamChangedByInput"] = "paramChangedByInput";
    MessageType["ParamChangedByDraw"] = "paramChangedByDraw";
    MessageType["ComponentAdded"] = "componentAdded";
    MessageType["DrawStairModelSettled"] = "drawStairModelSettled";
    MessageType["PropertiesVisible"] = "propertiesVisible";
    MessageType["FocusComponentIndex"] = "focusComponentIndex";
    MessageType["RemoveComponent"] = "removeComponent";
    MessageType["MaterialReplaceClick"] = "materialReplaceClick";
    MessageType["ActivateDrawStairsTool"] = "activateDrawStairsTool";
    MessageType["DeActivateDrawStairsTool"] = "deActivateDrawStairsTool";
    MessageType["LeaveDrawStairsTool"] = "leaveDrawStairsTool";
})(MessageType || (MessageType = {}));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main/main.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RSxZQUFZO0FBQ2pEO0FBQ0E7QUFDQTtBQUNPO0FBQ1AsOEJBQThCLGtEQUFjO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ087QUFDUCxhQUFhLCtDQUFVO0FBQ3ZCLGFBQWEsK0NBQVU7QUFDdkI7QUFDQSxRQUFRLCtDQUFVO0FBQ2xCLGFBQWEsK0NBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLGtEQUFjO0FBQ3RCO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMxVk87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLGtDQUFrQzs7Ozs7OztVQ2hCbkM7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kcmF3LXN0YWlycy8uL3NyYy9tYWluL21haW4udHMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvLi9zcmMvbWFpbi90b29scy9EcmF3U3RhaXJzVG9vbC9jb25zdHMudHMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvLi9zcmMvbWFpbi90b29scy9EcmF3U3RhaXJzVG9vbC9pbmRleC50cyIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy8uL3NyYy9tYWluL3Rvb2xzL0RyYXdTdGFpcnNUb29sL21lc2hVdGlscy50cyIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy8uL3NyYy9tYWluL3Rvb2xzL0RyYXdTdGFpcnNUb29sL3RlbXBNZXNoVXRpbHMudHMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvLi9zcmMvbWFpbi90b29scy9EcmF3U3RhaXJzVG9vbC90eXBlcy50cyIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy8uL3NyYy9tYWluL3Rvb2xzL0RyYXdTdGFpcnNUb29sL3V0aWxzLnRzIiwid2VicGFjazovL2RyYXctc3RhaXJzLy4vc3JjL21haW4vdHlwZXMudHMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2RyYXctc3RhaXJzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2RyYXctc3RhaXJzL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBkcmF3U3RhaXJzVG9vbCB9IGZyb20gXCIuL3Rvb2xzL0RyYXdTdGFpcnNUb29sL2luZGV4XCI7XG5pbXBvcnQgeyBpc0tHcm91cEluc3RhbmNlLCBpc1BhcnRPZkVkaXRNb2RlbCwgb25Nb2RlbENoYW5nZWQgfSBmcm9tIFwiLi90b29scy9EcmF3U3RhaXJzVG9vbC91dGlsc1wiO1xuaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi90eXBlc1wiO1xuY29uc3QgcGx1Z2luVUkgPSBhcHAuZ2V0UGx1Z2luVUkoKTtcbnBsdWdpblVJLnJlc2l6ZSgzNjAsIDcyMCk7XG5wbHVnaW5VSS5tb3VudCgpO1xubGV0IGFjdGl2YXRlZEN1c3RvbVRvb2w7XG5mdW5jdGlvbiBvblVJTWVzc2FnZShkYXRhKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChkYXRhLnR5cGUgPT09IE1lc3NhZ2VUeXBlLkRyYXdTdGFpclZpZXdNb3VudGVkKSB7XG4gICAgICAgICAgICAgICAgb25QbHVnaW5TdGFydFVwKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09IE1lc3NhZ2VUeXBlLkFjdGl2YXRlRHJhd1N0YWlyc1Rvb2wpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiAoZGF0YS50eXBlID09PSAnYWN0aXZhdGVTdHJhaWdodFN0YWlyc1Rvb2wnIHx8IGRhdGEudHlwZSA9PT0gJ2FjdGl2YXRlQ2lyY3VsYXJTdGFpcnNUb29sJykge1xuICAgICAgICAgICAgICAgIGlmIChhY3RpdmF0ZWRDdXN0b21Ub29sICE9PSBkcmF3U3RhaXJzVG9vbCkge1xuICAgICAgICAgICAgICAgICAgICBhcHAuYWN0aXZhdGVDdXN0b21Ub29sKGRyYXdTdGFpcnNUb29sLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZhdGVkQ3VzdG9tVG9vbCA9IGRyYXdTdGFpcnNUb29sO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBkcmF3U3RhaXJzVG9vbC5jaGFuZ2VDb21wb25lbnRUeXBlKGRhdGEuY29tcG9uZW50VHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09IE1lc3NhZ2VUeXBlLkRlQWN0aXZhdGVEcmF3U3RhaXJzVG9vbCkge1xuICAgICAgICAgICAgICAgIC8vIH0gZWxzZSBpZiAoZGF0YS50eXBlID09PSAnZGVBY3RpdmF0ZVN0cmFpZ2h0U3RhaXJzVG9vbCcgfHwgZGF0YS50eXBlID09PSAnZGVBY3RpdmF0ZUNpcmN1bGFyU3RhaXJzVG9vbCcpIHtcbiAgICAgICAgICAgICAgICBkZUFjdGl2YXRlRHJhd1N0YWlyc1Rvb2woKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gTWVzc2FnZVR5cGUuU3RhaXJQYXJhbUNoYW5nZWRCeUlucHV0KSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgKGFjdGl2YXRlZEN1c3RvbVRvb2wgPT09IGRyYXdTdGFpcnNUb29sKSB7XG4gICAgICAgICAgICAgICAgZHJhd1N0YWlyc1Rvb2wuY2hhbmdlU3RhaXJQYXJhbShkYXRhLnN0YWlyUGFyYW0sIGRhdGEuY2hhbmdlUGFyYW1zKTtcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09IE1lc3NhZ2VUeXBlLlBhcmFtQ2hhbmdlZEJ5SW5wdXQpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiAoYWN0aXZhdGVkQ3VzdG9tVG9vbCA9PT0gZHJhd1N0YWlyc1Rvb2wpIHtcbiAgICAgICAgICAgICAgICBkcmF3U3RhaXJzVG9vbC5jaGFuZ2VDb21wb25lbnRQYXJhbShkYXRhLmNvbXBvbmVudFBhcmFtLCBkYXRhLmNoYW5nZVBhcmFtcyk7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSBNZXNzYWdlVHlwZS5Gb2N1c0NvbXBvbmVudEluZGV4KSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgKGFjdGl2YXRlZEN1c3RvbVRvb2wgPT09IGRyYXdTdGFpcnNUb29sKSB7XG4gICAgICAgICAgICAgICAgZHJhd1N0YWlyc1Rvb2wuZm9jdXNDb21wb25lbnQoZGF0YS5jb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSBNZXNzYWdlVHlwZS5SZW1vdmVDb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiAoYWN0aXZhdGVkQ3VzdG9tVG9vbCA9PT0gZHJhd1N0YWlyc1Rvb2wpIHtcbiAgICAgICAgICAgICAgICBkcmF3U3RhaXJzVG9vbC5yZW1vdmVDb21wb25lbnQoZGF0YS5jb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSBNZXNzYWdlVHlwZS5NYXRlcmlhbFJlcGxhY2VDbGljaykge1xuICAgICAgICAgICAgICAgIC8vIGlmIChhY3RpdmF0ZWRDdXN0b21Ub29sID09PSBkcmF3U3RhaXJzVG9vbCkge1xuICAgICAgICAgICAgICAgIGRyYXdTdGFpcnNUb29sLm9uTWF0ZXJpYWxSZXBsYWNlQ2xpY2soZGF0YS5jaGFuZ2VQYXJhbSwgZGF0YS5pbmRleCk7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICBjbG9zZVBsdWdpbigpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZGVBY3RpdmF0ZURyYXdTdGFpcnNUb29sKCkge1xuICAgIGFjdGl2YXRlZEN1c3RvbVRvb2wgPSB1bmRlZmluZWQ7XG4gICAgYXBwLmRlYWN0aXZhdGVDdXN0b21Ub29sKGRyYXdTdGFpcnNUb29sLCBmYWxzZSk7XG59XG5wbHVnaW5VSS5vbk1lc3NhZ2Uob25VSU1lc3NhZ2UpO1xuY29uc3Qgc2VsZWN0aW9uID0gYXBwLmdldFNlbGVjdGlvbigpO1xuc2VsZWN0aW9uLmFkZE9ic2VydmVyKHtcbiAgICBvblNlbGVjdGlvbkNoYW5nZTogKCkgPT4ge1xuICAgICAgICBjb25zdCBhbGxFbnRpdGllcyA9IHNlbGVjdGlvbi5nZXRBbGxFbnRpdGllcygpO1xuICAgICAgICBpZiAoYWxsRW50aXRpZXMubGVuZ3RoID09PSAxICYmIGlzS0dyb3VwSW5zdGFuY2UoYWxsRW50aXRpZXNbMF0pKSB7XG4gICAgICAgICAgICBkcmF3U3RhaXJzVG9vbC5jbGVhclRlbXBTaGFwZXMoKTtcbiAgICAgICAgICAgIGRyYXdTdGFpcnNUb29sLnNldE1vZGVsKGFsbEVudGl0aWVzWzBdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhbGxFbnRpdGllcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGVkaXRQYXRoID0gYXBwLmdldEFjdGl2ZURlc2lnbigpLmdldEVkaXRQYXRoKCk7XG4gICAgICAgICAgICBjb25zdCBlZGl0TW9kZWwgPSBkcmF3U3RhaXJzVG9vbC5nZXRFZGl0TW9kZWwoKTtcbiAgICAgICAgICAgIGlmICghZWRpdE1vZGVsIHx8IChlZGl0UGF0aC5sZW5ndGggJiYgaXNQYXJ0T2ZFZGl0TW9kZWwoZWRpdE1vZGVsLCBlZGl0UGF0aFtlZGl0UGF0aC5sZW5ndGggLSAxXSkpKSB7XG4gICAgICAgICAgICAgICAgZHJhd1N0YWlyc1Rvb2wuY2xlYXJUZW1wU2hhcGVzKCk7XG4gICAgICAgICAgICAgICAgaWYgKGFjdGl2YXRlZEN1c3RvbVRvb2wgIT09IGRyYXdTdGFpcnNUb29sKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuUHJvcGVydGllc1Zpc2libGUsIHByb3BlcnRpZXNWaXNpYmxlOiBmYWxzZSB9LCAnKicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0pO1xuZnVuY3Rpb24gb25QbHVnaW5TdGFydFVwKCkge1xuICAgIGNvbnN0IGFsbEVudGl0aWVzID0gc2VsZWN0aW9uLmdldEFsbEVudGl0aWVzKCk7XG4gICAgaWYgKGFsbEVudGl0aWVzLmxlbmd0aCA9PT0gMSAmJiBpc0tHcm91cEluc3RhbmNlKGFsbEVudGl0aWVzWzBdKSkge1xuICAgICAgICBkcmF3U3RhaXJzVG9vbC5zZXRNb2RlbChhbGxFbnRpdGllc1swXSk7XG4gICAgfVxuICAgIGFwcC5hZGRPYnNlcnZlcih7XG4gICAgICAgIG9uUGx1Z2luQ2xvc2VkOiAoKSA9PiB7XG4gICAgICAgIH0sXG4gICAgICAgIG9uTW9kZWxDaGFuZ2VkLFxuICAgIH0pO1xufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50RGlyZWN0aW9uVHlwZSwgQ29tcG9uZW50VHlwZSwgRGVmYXVsdENvbXBvbmVudFBhcmFtLCBEZWZhdWx0U3RhaXJQYXJhbSB9IGZyb20gXCIuL3R5cGVzXCI7XG5leHBvcnQgY29uc3QgZHVtbXlNYXRyaXg0ID0gR2VvbUxpYi5jcmVhdGVJZGVudGl0eU1hdHJpeDQoKTtcbmV4cG9ydCBjb25zdCBkdW1teVZlY3RvcjNkID0gR2VvbUxpYi5jcmVhdGVWZWN0b3IzZCgwLCAwLCAxKTtcbmV4cG9ydCBjb25zdCBkdW1teVBvaW50M2QgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QoMCwgMCwgMCk7XG5leHBvcnQgY29uc3QgRGlyZWN0aW9uWCA9IEdlb21MaWIuY3JlYXRlVmVjdG9yM2QoMSwgMCwgMCk7XG5leHBvcnQgY29uc3QgRGlyZWN0aW9uWSA9IEdlb21MaWIuY3JlYXRlVmVjdG9yM2QoMCwgMSwgMCk7XG5leHBvcnQgY29uc3QgRGlyZWN0aW9uWiA9IEdlb21MaWIuY3JlYXRlVmVjdG9yM2QoMCwgMCwgMSk7XG4vLyBjb25zdCBIZWlnaHRUb2xlcmFuY2U6IG51bWJlciA9IDU7XG5leHBvcnQgY29uc3QgTGVuZ3RoVG9sZXJhbmNlID0gMjtcbmV4cG9ydCBjb25zdCBEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSA9IE1hdGguUEkgLyAzNjtcbmV4cG9ydCBjb25zdCBBbmdsZVRvbGVyYW5jZSA9IE1hdGguUEkgLyAxODA7XG5leHBvcnQgY29uc3QgU3RlcENvdW50TGltaXQgPSAxMDA7XG4vLyBjb25zdCBEZWZhdWx0Qm9hcmRUaGlja25lc3MgPSA1MDtcbmV4cG9ydCBjb25zdCBUZW1wTGluZUNvbG9ycyA9IHtcbiAgICBTdGFpcjogeyByOiAwLCBnOiAwLCBiOiAyNTUgfSxcbiAgICBNb2xkOiB7IHI6IDEzLCBnOiA3MSwgYjogMTYxIH0sXG4gICAgSGFuZHJhaWw6IHsgcjogMCwgZzogMCwgYjogMCB9LFxuICAgIEluZmVyZW5jZTogeyByOiAwLCBnOiAwLCBiOiAwIH0sXG4gICAgRm9jdXM6IHsgcjogMjU1LCBnOiAwLCBiOiAwIH0sXG59O1xuZXhwb3J0IGNvbnN0IFRlbXBMaW5lUGF0dGVybnMgPSB7XG4gICAgSGFuZHJhaWw6IEtMaW5lUGF0dGVybi5EYXNoLFxuICAgIFN0YWlyQW5kTW9sZDogS0xpbmVQYXR0ZXJuLlNvbGlkLFxuICAgIEluZmVyZW5jZTogS0xpbmVQYXR0ZXJuLkRhc2gsXG59O1xuZXhwb3J0IGZ1bmN0aW9uIGdldE5ld0NvbXBvbmVudFBhcmFtKHR5cGUsIGJhc2VTZWdtZW50LCB1cHdhcmQpIHtcbiAgICBsZXQgc3RhcnRXaWR0aCA9IERlZmF1bHRTdGFpclBhcmFtLnN0YXJ0V2lkdGggKiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSA/IDQgOiAxKTtcbiAgICBsZXQgZW5kV2lkdGggPSBEZWZhdWx0U3RhaXJQYXJhbS5lbmRXaWR0aCAqICh0eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtID8gNCA6IDEpO1xuICAgIGlmIChiYXNlU2VnbWVudCkge1xuICAgICAgICBjb25zdCB7IHBhcmFtOiB7IGVuZFdpZHRoOiBiYXNlU2VnbWVudEVuZFdpZHRoLCB0eXBlOiBiYXNlU2VnbWVudFR5cGUgfSB9ID0gYmFzZVNlZ21lbnQ7XG4gICAgICAgIGlmICh0eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XG4gICAgICAgICAgICBpZiAoYmFzZVNlZ21lbnRUeXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XG4gICAgICAgICAgICAgICAgc3RhcnRXaWR0aCA9IGJhc2VTZWdtZW50RW5kV2lkdGg7XG4gICAgICAgICAgICAgICAgZW5kV2lkdGggPSBiYXNlU2VnbWVudEVuZFdpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RhcnRXaWR0aCA9IDQgKiBiYXNlU2VnbWVudEVuZFdpZHRoO1xuICAgICAgICAgICAgICAgIGVuZFdpZHRoID0gNCAqIGJhc2VTZWdtZW50RW5kV2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoYmFzZVNlZ21lbnRUeXBlICE9PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XG4gICAgICAgICAgICAgICAgc3RhcnRXaWR0aCA9IGJhc2VTZWdtZW50RW5kV2lkdGg7XG4gICAgICAgICAgICAgICAgZW5kV2lkdGggPSBiYXNlU2VnbWVudEVuZFdpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIERlZmF1bHRDb21wb25lbnRQYXJhbSksIHsgaW5kZXg6IGJhc2VTZWdtZW50ID8gYmFzZVNlZ21lbnQucGFyYW0uaW5kZXggKyAxIDogMCwgdHlwZSxcbiAgICAgICAgc3RhcnRXaWR0aCxcbiAgICAgICAgZW5kV2lkdGgsIHVwd2FyZDogdXB3YXJkID09PSB1bmRlZmluZWQgPyBEZWZhdWx0Q29tcG9uZW50UGFyYW0udXB3YXJkIDogdXB3YXJkLCBvZmZzZXRXaWR0aDogMCwgd2l0aE9mZnNldDogZmFsc2UsIHBsYXRmb3JtTGVuZ3RoTG9ja2VkOiBmYWxzZSB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXROZXdTZWdtZW50KHR5cGUsIGJhc2VTZWdtZW50LCB1cHdhcmQpIHtcbiAgICBjb25zdCBwYXJhbSA9IGdldE5ld0NvbXBvbmVudFBhcmFtKHR5cGUsIGJhc2VTZWdtZW50LCB1cHdhcmQpO1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXJ0OiBkdW1teVBvaW50M2QsXG4gICAgICAgIGVuZDogZHVtbXlQb2ludDNkLFxuICAgICAgICBzdGFydExvY2tlZDogZmFsc2UsXG4gICAgICAgIGVuZExvY2tlZDogZmFsc2UsXG4gICAgICAgIHN0YXJ0SGVpZ2h0OiAwLFxuICAgICAgICBlbmRIZWlnaHQ6IDAsXG4gICAgICAgIHN0YWlyU2hhcGU6IHtcbiAgICAgICAgICAgIHN0ZXBDb3VudDogMCxcbiAgICAgICAgICAgIHZlcnRpY2VzOiBbXSxcbiAgICAgICAgICAgIHRlbXBMaW5lczogW10sXG4gICAgICAgIH0sXG4gICAgICAgIG1vbGRTaGFwZToge1xuICAgICAgICAgICAgc3RlcENvdW50OiAwLFxuICAgICAgICAgICAgdmVydGljZXM6IFtdLFxuICAgICAgICAgICAgdGVtcExpbmVzOiBbXSxcbiAgICAgICAgfSxcbiAgICAgICAgY29ybmVyU2hhcGU6IHtcbiAgICAgICAgICAgIHN0ZXBDb3VudDogMCxcbiAgICAgICAgICAgIHZlcnRpY2VzOiBbXSxcbiAgICAgICAgICAgIHRlbXBMaW5lczogW10sXG4gICAgICAgIH0sXG4gICAgICAgIGNvcm5lck1vbGRTaGFwZToge1xuICAgICAgICAgICAgc3RlcENvdW50OiAwLFxuICAgICAgICAgICAgdmVydGljZXM6IFtdLFxuICAgICAgICAgICAgdGVtcExpbmVzOiBbXSxcbiAgICAgICAgfSxcbiAgICAgICAgbmV4dENvbXBvbmVudHM6IEFycmF5LmZyb20oeyBsZW5ndGg6IDYgfSwgXyA9PiBuZXcgU2V0KCkpLFxuICAgICAgICBwYXJhbSxcbiAgICAgICAgY29tcG9uZW50RGlyZWN0aW9uVHlwZTogQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5Gcm9udCxcbiAgICB9O1xufVxuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBDb21wb25lbnRUeXBlLCBDb21wb25lbnRQYXJhbUtleSwgU3RhcnRFbmRLZXksIEJhc2VMaW5lU2VnM2RLZXksIFN0YWlyTW9kZWxLZXksIENvbXBvbmVudFBhcmFtVHlwZSwgTW9kZWxWYWx1ZSwgQ2lyY2xlVGFuZ2VudEtleSwgRGVmYXVsdFN0YWlyUGFyYW0sIEJhc2VDb21wb25lbnRLZXksIEhhbmRyYWlsTW9kZWxLZXksIFJhaWxNb2RlbEtleSwgQ29sdW1uTW9kZWxLZXksIFN0YWlyUGFyYW1LZXksIFN0YWlyTWF0ZXJpYWxLZXksIENvbHVtbk1hdGVyaWFsS2V5LCBSYWlsTWF0ZXJpYWxLZXksIFBsYXRmb3JtTWF0ZXJpYWxLZXkgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgZ2VuZXJhdGVIYW5kcmFpbFNoYXBlLCBnZW5lcmF0ZVNoYXBlLCBpc0NpcmN1bGFyU3RhaXIgfSBmcm9tIFwiLi90ZW1wTWVzaFV0aWxzXCI7XG5pbXBvcnQgeyBidWlsZENvbXBvbmVudEluc3RhbmNlLCBidWlsZEhhbmRyYWlsSW5zdGFuY2UsIGJ1aWxkU2VnbWVudFJlbGF0aW9ucywgY2hhbmdlU3RhaXJTdGVwLCBjaGFuZ2VTdGFpclVwd2FyZCwgZ2VuZXJhdGVNZXNoZXMsIGdldFNlZ21lbnRCeUluZGV4LCBsb2FkRGVmYXVsdE1hdGVyaWFscyB9IGZyb20gXCIuL21lc2hVdGlsc1wiO1xuaW1wb3J0IHsgcGFyc2VCYXNlQ29tcG9uZW50LCBwYXJzZUxpbmVTZWczZCwgcGFyc2VDb21wb25lbnRQYXJhbSwgcGFyc2VTdGFydEVuZCwgcGFyc2VWZWN0b3IzZCwgc3RyaW5naWZ5U3RhaXJQYXJhbSwgc3RyaW5naWZ5TWF0ZXJpYWwsIHBhcnNlU3RhaXJQYXJhbSwgcGFyc2VNYXRlcmlhbCwgc3RhcnRPcGVyYXRpb24sIGFib3J0T3BlcmF0aW9uLCBjb21taXRPcGVyYXRpb24sIGlzUGFydE9mRWRpdE1vZGVsIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCB7IGdldE5ld0NvbXBvbmVudFBhcmFtLCBnZXROZXdTZWdtZW50LCBUZW1wTGluZUNvbG9ycywgVGVtcExpbmVQYXR0ZXJucyB9IGZyb20gXCIuL2NvbnN0c1wiO1xuaW1wb3J0IHsgZGVBY3RpdmF0ZURyYXdTdGFpcnNUb29sIH0gZnJvbSBcIi4uLy4uLy4uL21haW4vbWFpblwiO1xuaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vbWFpbi90eXBlc1wiO1xuY29uc3QgZGVzaWduID0gYXBwLmdldEFjdGl2ZURlc2lnbigpO1xuY29uc3Qgc2VsZWN0aW9uID0gYXBwLmdldFNlbGVjdGlvbigpO1xuY29uc3QgcGx1Z2luVUkgPSBhcHAuZ2V0UGx1Z2luVUkoKTtcbmNvbnN0IGFwcFZpZXcgPSBhcHAuZ2V0QWN0aXZlVmlldygpO1xuY29uc3QgdG9vbEhlbHBlciA9IGFwcC5nZXRUb29sSGVscGVyKCk7XG5jb25zdCBEZWZhdWx0Rm9jdXNlZENvbXBvbmVudEluZGV4ID0gLTE7XG5leHBvcnQgY2xhc3MgRHJhd1N0YWlyc1Rvb2wge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvLyBwcml2YXRlIGNvbXBvbmVudFBhcmFtOiBDb21wb25lbnRQYXJhbSA9IHsgLi4uRGVmYXVsdENvbXBvbmVudFBhcmFtIH07XG4gICAgICAgIHRoaXMuZHJhd2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCA9IERlZmF1bHRGb2N1c2VkQ29tcG9uZW50SW5kZXg7XG4gICAgICAgIHRoaXMuc2VnbWVudHMgPSBbXTtcbiAgICAgICAgdGhpcy5zdGFpclBhcmFtID0gT2JqZWN0LmFzc2lnbih7fSwgRGVmYXVsdFN0YWlyUGFyYW0pO1xuICAgICAgICB0aGlzLm9uTWF0ZXJpYWxSZXBsYWNlSXRlbUNsaWNrID0gKGNoYW5nZVBhcmFtVHlwZSwgaW5kZXgsIGlzRGVsZXRlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiAobWF0ZXJpYWxJZCA9ICcnLCBiZ2lkID0gJycpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsb2FkTWF0ZXJpYWxSZXMgPSB5aWVsZCBkZXNpZ24ubG9hZE1hdGVyaWFsKG1hdGVyaWFsSWQpO1xuICAgICAgICAgICAgICAgIGlmICghbG9hZE1hdGVyaWFsUmVzLmlzU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGluc3RhbmNlUGF0aCA9IHRoYXQuZWRpdE1vZGVsID8gZGVzaWduLmdldEVkaXRQYXRoc1RvR3JvdXBJbnN0YW5jZSh0aGF0LmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2UpIDogW107XG4gICAgICAgICAgICAgICAgaWYgKGNoYW5nZVBhcmFtVHlwZSA9PT0gQ29tcG9uZW50UGFyYW1UeXBlLkNvbXBvbmVudE1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoZVNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleCh0aGF0LnNlZ21lbnRzLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGVTZWdtZW50ICYmIGluZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdGFpclBhcmFtQ2hhbmdlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuZHJhd2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZVNlZ21lbnQucGFyYW0ubWF0ZXJpYWwgPSB7IG1hdGVyaWFsSWQsIGJnaWQgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhlU2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBsYXRmb3JtU2VnbWVudHMgPSB0aGlzLnNlZ21lbnRzLmZpbHRlcihzZWcgPT4gc2VnLnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGxhdGZvcm1TZWdtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhaXJQYXJhbS5wbGF0Zm9ybU1hdGVyaWFsID0geyBtYXRlcmlhbElkLCBiZ2lkIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpclBhcmFtQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YWlyU2VnbWVudHMgPSB0aGlzLnNlZ21lbnRzLmZpbHRlcihzZWcgPT4gc2VnLnBhcmFtLnR5cGUgIT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhaXJTZWdtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhaXJQYXJhbS5zdGFpck1hdGVyaWFsID0geyBtYXRlcmlhbElkLCBiZ2lkIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpclBhcmFtQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5QYXJhbUNoYW5nZWRCeURyYXcsIGNvbXBvbmVudFBhcmFtOiBPYmplY3QuYXNzaWduKHt9LCB0aGVTZWdtZW50LnBhcmFtKSwgc3RhaXJQYXJhbTogc3RhaXJQYXJhbUNoYW5nZWQgPyB0aGlzLnN0YWlyUGFyYW0gOiB1bmRlZmluZWQgfSwgJyonKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoYXQuZWRpdE1vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlSW5zdGFuY2UgPSB0aGF0LmVkaXRNb2RlbC5zdGFpcnMuZ2V0KGluZGV4KSB8fCB0aGF0LmVkaXRNb2RlbC5wbGF0Zm9ybXMuZ2V0KGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhlSW5zdGFuY2UgJiYgaW5zdGFuY2VQYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcGVyYXRpb25TdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKHlpZWxkIGRlc2lnbi5hY3RpdmF0ZUVkaXRQYXRoKFsuLi5pbnN0YW5jZVBhdGhbMF0sIHRoYXQuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZV0pKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0RlbGV0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZGVzaWduLmNsZWFyTWF0ZXJpYWwoW3RoZUluc3RhbmNlLmluc3RhbmNlXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBkZXNpZ24uYXNzaWduTWF0ZXJpYWxGb3JFbnRpdGllcyhbdGhlSW5zdGFuY2UuaW5zdGFuY2VdLCBtYXRlcmlhbElkLCBiZ2lkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAoeWllbGQgZGVzaWduLmFjdGl2YXRlRWRpdFBhdGgoaW5zdGFuY2VQYXRoWzBdKSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWl0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGVTZWdtZW50LnBhcmFtLm1hdGVyaWFsID0geyBtYXRlcmlhbElkLCBiZ2lkIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhlU2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGxhdGZvcm1TZWdtZW50cyA9IHRoaXMuc2VnbWVudHMuZmlsdGVyKHNlZyA9PiBzZWcucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXRmb3JtU2VnbWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhaXJQYXJhbS5wbGF0Zm9ybU1hdGVyaWFsID0gaXNEZWxldGUgPyB1bmRlZmluZWQgOiB7IG1hdGVyaWFsSWQsIGJnaWQgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJQYXJhbUNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YWlyU2VnbWVudHMgPSB0aGlzLnNlZ21lbnRzLmZpbHRlcihzZWcgPT4gc2VnLnBhcmFtLnR5cGUgIT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGFpclNlZ21lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWlyUGFyYW0uc3RhaXJNYXRlcmlhbCA9IGlzRGVsZXRlID8gdW5kZWZpbmVkIDogeyBtYXRlcmlhbElkLCBiZ2lkIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyUGFyYW1DaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlBhcmFtQ2hhbmdlZEJ5RHJhdywgY29tcG9uZW50UGFyYW06IE9iamVjdC5hc3NpZ24oe30sIHRoZVNlZ21lbnQucGFyYW0pLCBzdGFpclBhcmFtOiBzdGFpclBhcmFtQ2hhbmdlZCA/IHRoaXMuc3RhaXJQYXJhbSA6IHVuZGVmaW5lZCB9LCAnKicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWJvcnRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGFuZ2VQYXJhbVR5cGUgPT09IENvbXBvbmVudFBhcmFtVHlwZS5TdGFpck1hdGVyaWFsIHx8IGNoYW5nZVBhcmFtVHlwZSA9PT0gQ29tcG9uZW50UGFyYW1UeXBlLlBsYXRmb3JtTWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LmVkaXRNb2RlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZVBhcmFtVHlwZSA9PT0gQ29tcG9uZW50UGFyYW1UeXBlLlN0YWlyTWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnN0YWlyUGFyYW0uc3RhaXJNYXRlcmlhbCA9IHsgbWF0ZXJpYWxJZCwgYmdpZCB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgc2VnbWVudCBvZiB0aGlzLnNlZ21lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWdtZW50LnBhcmFtLnR5cGUgIT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQucGFyYW0ubWF0ZXJpYWwgPSB7IG1hdGVyaWFsSWQsIGJnaWQgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc3RhaXJQYXJhbS5wbGF0Zm9ybU1hdGVyaWFsID0geyBtYXRlcmlhbElkLCBiZ2lkIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBzZWdtZW50IG9mIHRoaXMuc2VnbWVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlZ21lbnQucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5wYXJhbS5tYXRlcmlhbCA9IHsgbWF0ZXJpYWxJZCwgYmdpZCB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5TdGFpclBhcmFtQ2hhbmdlZEJ5RHJhdywgc3RhaXJQYXJhbTogdGhhdC5zdGFpclBhcmFtLCBjb21wb25lbnRQYXJhbXM6IHRoaXMuc2VnbWVudHMubWFwKHNlZyA9PiAoT2JqZWN0LmFzc2lnbih7fSwgc2VnLnBhcmFtKSkpIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaW5zdGFuY2VQYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wZXJhdGlvblN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKHlpZWxkIGRlc2lnbi5hY3RpdmF0ZUVkaXRQYXRoKFsuLi5pbnN0YW5jZVBhdGhbMF0sIHRoYXQuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZV0pKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21wb25lbnRzID0gY2hhbmdlUGFyYW1UeXBlID09PSBDb21wb25lbnRQYXJhbVR5cGUuU3RhaXJNYXRlcmlhbCA/IHRoYXQuZWRpdE1vZGVsLnN0YWlycyA6IHRoYXQuZWRpdE1vZGVsLnBsYXRmb3JtcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudEluc3RhbmNlcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBbaW5kLCBpbnN0YW5jZURhdGFdIG9mIGNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgodGhhdC5zZWdtZW50cywgaW5kKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhlU2VnbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRJbnN0YW5jZXMucHVzaChpbnN0YW5jZURhdGEuaW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0RlbGV0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGRlc2lnbi5jbGVhck1hdGVyaWFsKGNvbXBvbmVudEluc3RhbmNlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBkZXNpZ24uYXNzaWduTWF0ZXJpYWxGb3JFbnRpdGllcyhjb21wb25lbnRJbnN0YW5jZXMsIG1hdGVyaWFsSWQsIGJnaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKHlpZWxkIGRlc2lnbi5hY3RpdmF0ZUVkaXRQYXRoKGluc3RhbmNlUGF0aFswXSkpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb25TdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWl0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZVBhcmFtVHlwZSA9PT0gQ29tcG9uZW50UGFyYW1UeXBlLlN0YWlyTWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zdGFpclBhcmFtLnN0YWlyTWF0ZXJpYWwgPSB7IG1hdGVyaWFsSWQsIGJnaWQgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBzZWdtZW50IG9mIHRoaXMuc2VnbWVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWdtZW50LnBhcmFtLnR5cGUgIT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50LnBhcmFtLm1hdGVyaWFsID0geyBtYXRlcmlhbElkLCBiZ2lkIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc3RhaXJQYXJhbS5wbGF0Zm9ybU1hdGVyaWFsID0geyBtYXRlcmlhbElkLCBiZ2lkIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgc2VnbWVudCBvZiB0aGlzLnNlZ21lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5wYXJhbS5tYXRlcmlhbCA9IHsgbWF0ZXJpYWxJZCwgYmdpZCB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuU3RhaXJQYXJhbUNoYW5nZWRCeURyYXcsIHN0YWlyUGFyYW06IHRoYXQuc3RhaXJQYXJhbSwgY29tcG9uZW50UGFyYW1zOiB0aGlzLnNlZ21lbnRzLm1hcChzZWcgPT4gKE9iamVjdC5hc3NpZ24oe30sIHNlZy5wYXJhbSkpKSB9LCAnKicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWJvcnRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGFuZ2VQYXJhbVR5cGUgPT09IENvbXBvbmVudFBhcmFtVHlwZS5IYW5kcmFpbFJhaWxNYXRlcmlhbCB8fCBjaGFuZ2VQYXJhbVR5cGUgPT09IENvbXBvbmVudFBhcmFtVHlwZS5IYW5kcmFpbENvbHVtbk1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC5lZGl0TW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VQYXJhbVR5cGUgPT09IENvbXBvbmVudFBhcmFtVHlwZS5IYW5kcmFpbFJhaWxNYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc3RhaXJQYXJhbS5oYW5kcmFpbC5yYWlsLm1hdGVyaWFsID0geyBtYXRlcmlhbElkLCBiZ2lkIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnN0YWlyUGFyYW0uaGFuZHJhaWwuY29sdW1uLm1hdGVyaWFsID0geyBtYXRlcmlhbElkLCBiZ2lkIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlN0YWlyUGFyYW1DaGFuZ2VkQnlEcmF3LCBzdGFpclBhcmFtOiB0aGF0LnN0YWlyUGFyYW0gfSwgJyonKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpbnN0YW5jZVBhdGggJiYgdGhhdC5lZGl0TW9kZWwuaGFuZHJhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3BlcmF0aW9uU3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAoeWllbGQgZGVzaWduLmFjdGl2YXRlRWRpdFBhdGgoWy4uLmluc3RhbmNlUGF0aFswXSwgdGhhdC5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlLCB0aGF0LmVkaXRNb2RlbC5oYW5kcmFpbC5oYW5kcmFpbEluc3RhbmNlLmluc3RhbmNlXSkpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudHMgPSBjaGFuZ2VQYXJhbVR5cGUgPT09IENvbXBvbmVudFBhcmFtVHlwZS5IYW5kcmFpbFJhaWxNYXRlcmlhbCA/IHRoYXQuZWRpdE1vZGVsLmhhbmRyYWlsLnJhaWxJbnN0YW5jZXMgOiB0aGF0LmVkaXRNb2RlbC5oYW5kcmFpbC5jb2x1bW5JbnN0YW5jZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNEZWxldGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBkZXNpZ24uY2xlYXJNYXRlcmlhbChbLi4uY29tcG9uZW50cy52YWx1ZXMoKV0ubWFwKGMgPT4gYy5pbnN0YW5jZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZGVzaWduLmFzc2lnbk1hdGVyaWFsRm9yRW50aXRpZXMoWy4uLmNvbXBvbmVudHMudmFsdWVzKCldLm1hcChjID0+IGMuaW5zdGFuY2UpLCBtYXRlcmlhbElkLCBiZ2lkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICh5aWVsZCBkZXNpZ24uYWN0aXZhdGVFZGl0UGF0aChpbnN0YW5jZVBhdGhbMF0pKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1pdE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VQYXJhbVR5cGUgPT09IENvbXBvbmVudFBhcmFtVHlwZS5IYW5kcmFpbFJhaWxNYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnN0YWlyUGFyYW0uaGFuZHJhaWwucmFpbC5tYXRlcmlhbCA9IHsgbWF0ZXJpYWxJZCwgYmdpZCB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zdGFpclBhcmFtLmhhbmRyYWlsLmNvbHVtbi5tYXRlcmlhbCA9IHsgbWF0ZXJpYWxJZCwgYmdpZCB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlN0YWlyUGFyYW1DaGFuZ2VkQnlEcmF3LCBzdGFpclBhcmFtOiB0aGF0LnN0YWlyUGFyYW0gfSwgJyonKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFib3J0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgb25Ub29sQWN0aXZlKCkge1xuICAgICAgICBsb2FkRGVmYXVsdE1hdGVyaWFscygpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygod2luZG93IGFzIGFueSkub3JpZ2luKTtcbiAgICAgICAgdG9vbEhlbHBlci5zZXRFeGNsdWRlSW5mZXJlbmNlVHlwZXMoW1xuICAgICAgICAgICAgS0VudGl0eVR5cGUuRmFjZSwgS0VudGl0eVR5cGUuRWRnZSwgS0VudGl0eVR5cGUuQXV4aWxpYXJ5Qm91bmRlZEN1cnZlLCBLRW50aXR5VHlwZS5BdXhpbGlhcnlMaW5lLCBLRW50aXR5VHlwZS5BdXhpbGlhcnlWZXJ0ZXgsXG4gICAgICAgICAgICBLRW50aXR5VHlwZS5Hcm91cEluc3RhbmNlLCBLRW50aXR5VHlwZS5WZXJ0ZXgsIEtBcmNoRmFjZVR5cGUuTm9uUGxhbmFyLCBLQXJjaEZhY2VUeXBlLlBsYW5hcixcbiAgICAgICAgXSk7XG4gICAgICAgIGNvbnN0IGZpcnN0U2VnbWVudCA9IGdldE5ld1NlZ21lbnQoQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyLCB1bmRlZmluZWQsIHRoaXMuc3RhaXJQYXJhbS51cHdhcmQpO1xuICAgICAgICBmaXJzdFNlZ21lbnQuc3RhcnRMb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgLy8gdGhpcy5zdGFpclBhcmFtID0gRGVmYXVsdFN0YWlyUGFyYW07XG4gICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuRHJhd1N0YWlyTW9kZWxTZXR0bGVkLCBjb21wb25lbnRQYXJhbXM6IFtmaXJzdFNlZ21lbnQucGFyYW1dLCBzdGFpclBhcmFtOiB0aGlzLnN0YWlyUGFyYW0sIG5ld1N0YWlyOiB0cnVlLCBpc0RyYXdpbmc6IHRydWUgfSwgJyonKTtcbiAgICAgICAgdGhpcy5zZWdtZW50cyA9IFtmaXJzdFNlZ21lbnRdO1xuICAgICAgICB0aGlzLmRyYXdpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmNsZWFyVGVtcFNoYXBlcygpO1xuICAgICAgICB0aGlzLmVkaXRNb2RlbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggPSAwO1xuICAgIH1cbiAgICBvblRvb2xEZWFjdGl2ZSgpIHtcbiAgICAgICAgdG9vbEhlbHBlci5zZXRFeGNsdWRlSW5mZXJlbmNlVHlwZXMoW10pO1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgIGlmICh0aGlzLmVkaXRNb2RlbCkge1xuICAgICAgICAgICAgc2VsZWN0aW9uLmFkZChbdGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLkxlYXZlRHJhd1N0YWlyc1Rvb2wgfSwgJyonKTtcbiAgICAgICAgfVxuICAgICAgICBkZUFjdGl2YXRlRHJhd1N0YWlyc1Rvb2woKTtcbiAgICB9XG4gICAgb25Nb3VzZU1vdmUoZXZlbnQsIGluZmVyZW5jZVJlc3VsdCkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnb25Nb3VzZU1vdmUnKTtcbiAgICAgICAgaWYgKGluZmVyZW5jZVJlc3VsdCkge1xuICAgICAgICAgICAgLy8gY29uc3QgeyBzdGFydFdpZHRoLCBlbmRXaWR0aCwgcGxhdGZvcm1UaGlja25lc3MgfSA9IHRoaXMuY29tcG9uZW50UGFyYW07XG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IGluZmVyZW5jZVJlc3VsdC5wb3NpdGlvbjtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RTZWdtZW50ID0gdGhpcy5zZWdtZW50c1t0aGlzLnNlZ21lbnRzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdsYXN0U2VnbWVudC5zdGFydExvY2tlZCcsIGxhc3RTZWdtZW50LnN0YXJ0TG9ja2VkKTtcbiAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5wYXJhbS5tb2RlbEVkaXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAobGFzdFNlZ21lbnQuc3RhcnRMb2NrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuZW5kID0gcG9zaXRpb247XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBDb21wb25lbnQobGFzdFNlZ21lbnQsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlZ21lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByZXZTZWdtZW50ID0gdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggPT09IGxhc3RTZWdtZW50LnBhcmFtLmluZGV4ID8gdGhpcy5zZWdtZW50c1t0aGlzLnNlZ21lbnRzLmxlbmd0aCAtIDJdIDogZ2V0U2VnbWVudEJ5SW5kZXgodGhpcy5zZWdtZW50cywgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbXVzdCBiZSB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHByZXZTZWdtZW50ID09PSBudWxsIHx8IHByZXZTZWdtZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwcmV2U2VnbWVudC5wYXJhbS50eXBlKSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgbW9sZFNoYXBlOiB7IHZlcnRpY2VzLCB0ZW1wTGluZXMgfSB9ID0gcHJldlNlZ21lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCgoX2EgPSBsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGluZTNkSW5kZXgpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldlNlZ21lbnQubmV4dENvbXBvbmVudHMuZm9yRWFjaChpbmRzID0+IGluZHMuZGVsZXRlKGxhc3RTZWdtZW50LnBhcmFtLmluZGV4KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjbG9zZXN0UG9pbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1pbkRpc3RhbmNlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZXMuZm9yRWFjaCgobGluZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGluZVNlZzNkID0gR2VvbUxpYi5jcmVhdGVMaW5lU2VnbWVudDNkKHZlcnRpY2VzW2xpbmVbMF1dLCB2ZXJ0aWNlc1tsaW5lWzFdXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoZVBvaW50ID0gbGluZVNlZzNkLmdldENsb3Nlc3RQb2ludChwb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1ckRpc3RhbmNlID0gdGhlUG9pbnQuZGlzdGFuY2VUbyhwb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY2xvc2VzdFBvaW50IHx8IGN1ckRpc3RhbmNlIDwgbWluRGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbkRpc3RhbmNlID0gY3VyRGlzdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0UG9pbnQgPSB0aGVQb2ludDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LnN0YXJ0ID0gY2xvc2VzdFBvaW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGFzdFNlZ21lbnQuYmFzZUxpbmVTZWczZCA9IHsgc3RhcnQ6IHZlcnRpY2VzW2xpbmVbMF1dLCBlbmQ6IHZlcnRpY2VzW2xpbmVbMV1dIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50ID0geyBjb21wb25lbnRJbmRleDogcHJldlNlZ21lbnQucGFyYW0uaW5kZXgsIGxpbmUzZEluZGV4OiBpbmRleCwgbGluZTNkOiB7IHN0YXJ0OiB2ZXJ0aWNlc1tsaW5lWzBdXSwgZW5kOiB2ZXJ0aWNlc1tsaW5lWzFdXSB9IH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBwcmV2U2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHRoaXMuc2VnbWVudHMsIGxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoKF9iID0gbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmxpbmUzZEluZGV4KSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTZWdtZW50Lm5leHRDb21wb25lbnRzW2xhc3RTZWdtZW50LmJhc2VDb21wb25lbnQubGluZTNkSW5kZXhdLmFkZChsYXN0U2VnbWVudC5wYXJhbS5pbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1BpY2tTdGFydFRlbXBTaGFwZXMocG9zaXRpb24sIGxhc3RTZWdtZW50LnN0YXJ0LCBsYXN0U2VnbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5zdGFydCA9IHBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChsYXN0U2VnbWVudC5wYXJhbS50eXBlID09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gJiYgIWxhc3RTZWdtZW50LnBhcmFtLnBsYXRmb3JtTGVuZ3RoTG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuUGFyYW1DaGFuZ2VkQnlEcmF3LCBjb21wb25lbnRQYXJhbTogT2JqZWN0LmFzc2lnbih7fSwgbGFzdFNlZ21lbnQucGFyYW0pIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIG9uTEJ1dHRvblVwKGV2ZW50LCBpbmZlcmVuY2VSZXN1bHQpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnb25MQnV0dG9uVXAnKTtcbiAgICAgICAgaWYgKGluZmVyZW5jZVJlc3VsdCkge1xuICAgICAgICAgICAgLy8gY29uc3QgcG9zaXRpb24gPSBpbmZlcmVuY2VSZXN1bHQucG9zaXRpb247XG4gICAgICAgICAgICBpZiAodGhpcy5zZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0U2VnbWVudCA9IHRoaXMuc2VnbWVudHNbdGhpcy5zZWdtZW50cy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICBpZiAobGFzdFNlZ21lbnQuc3RhcnRMb2NrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3B1c2ggc2VnbWVudCcpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHN0YXJ0LCBlbmQsIHBhcmFtOiB7IHR5cGUgfSwgY2lyY2xlVGFuZ2VudCB9ID0gbGFzdFNlZ21lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBDb21wb25lbnRUeXBlLkNpcmN1bGFyU3RhaXIgJiYgIWNpcmNsZVRhbmdlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LmNpcmNsZVRhbmdlbnQgPSBlbmQuc3VidHJhY3RlZChzdGFydCkubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c0NvbXBvbmVudChsYXN0U2VnbWVudC5wYXJhbS5pbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5lbmRMb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdFBhcmFtID0gbGFzdFNlZ21lbnQucGFyYW07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpciAmJiAhbGFzdFNlZ21lbnQuY2lyY3VsYXJTaWRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFBhcmFtLnR5cGUgPSBDb21wb25lbnRUeXBlLlN0cmFpZ2h0U3RhaXI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuY2lyY2xlVGFuZ2VudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRUeXBlID0gbGFzdFBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gPyBDb21wb25lbnRUeXBlLlN0cmFpZ2h0U3RhaXIgOiBDb21wb25lbnRUeXBlLlBsYXRmb3JtO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dFNlZ21lbnQgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGdldE5ld1NlZ21lbnQobmV4dFR5cGUsIGxhc3RTZWdtZW50LCB0aGlzLnN0YWlyUGFyYW0udXB3YXJkKSksIHsgc3RhcnQ6IGxhc3RTZWdtZW50LmVuZCwgZW5kOiBsYXN0U2VnbWVudC5lbmQsIHN0YXJ0TG9ja2VkOiBsYXN0UGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSA/IGZhbHNlIDogdHJ1ZSwgc3RhcnRIZWlnaHQ6IGxhc3RTZWdtZW50LmVuZEhlaWdodCwgZW5kSGVpZ2h0OiBsYXN0U2VnbWVudC5lbmRIZWlnaHQgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IG1vbGRTaGFwZTogeyB2ZXJ0aWNlcywgdGVtcExpbmVzIH0gfSA9IGxhc3RTZWdtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGFzdFNlZ21lbnQuYmFzZUxpbmVTZWczZCA9IHsgc3RhcnQ6IHZlcnRpY2VzWzBdLCBlbmQ6IHZlcnRpY2VzWzFdIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudCA9IHsgbGluZTNkOiB7IHN0YXJ0OiB2ZXJ0aWNlc1sxXSwgZW5kOiB2ZXJ0aWNlc1swXSB9IH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiYXNlU2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHRoaXMuc2VnbWVudHMsIGxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiYXNlU2VnbWVudCAmJiAoKF9hID0gbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxpbmUzZEluZGV4KSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhc2VTZWdtZW50Lm5leHRDb21wb25lbnRzW2xhc3RTZWdtZW50LmJhc2VDb21wb25lbnQubGluZTNkSW5kZXhdLmFkZChsYXN0UGFyYW0uaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5leHRTZWdtZW50LmJhc2VMaW5lU2VnM2QgPSB7IHN0YXJ0OiB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXSwgZW5kOiB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRTZWdtZW50LnN0YXJ0TG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQubmV4dENvbXBvbmVudHNbMF0uYWRkKG5leHRTZWdtZW50LnBhcmFtLmluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTZWdtZW50LmJhc2VDb21wb25lbnQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50SW5kZXg6IGxhc3RQYXJhbS5pbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lM2RJbmRleDogbGFzdFBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gPyB0ZW1wTGluZXMubGVuZ3RoIC0gMSA6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZTNkOiB7IHN0YXJ0OiB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXSwgZW5kOiB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXSB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFBhcmFtLm1vZGVsRWRpdGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlBhcmFtQ2hhbmdlZEJ5RHJhdywgY29tcG9uZW50UGFyYW06IGxhc3RQYXJhbSB9LCAnKicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWdtZW50cy5wdXNoKG5leHRTZWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCAhPT0gbGFzdFBhcmFtLmluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9jdXNlZFNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleCh0aGlzLnNlZ21lbnRzLCB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvY3VzZWRTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBDb21wb25lbnQoZm9jdXNlZFNlZ21lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4ID0gbmV4dFNlZ21lbnQucGFyYW0uaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLkNvbXBvbmVudEFkZGVkLCBjb21wb25lbnRQYXJhbTogT2JqZWN0LmFzc2lnbih7fSwgbmV4dFNlZ21lbnQucGFyYW0pIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LnN0YXJ0TG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhclBpY2tTdGFydFRlbXBTaGFwZXMobGFzdFNlZ21lbnQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdUZW1wQ29tcG9uZW50KGxhc3RTZWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c0NvbXBvbmVudChsYXN0U2VnbWVudC5wYXJhbS5pbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGRyYXdQaWNrU3RhcnRUZW1wU2hhcGVzKHBvc2l0aW9uLCBjbG9zZXN0UG9pbnQsIHRoZVNlZ21lbnQpIHtcbiAgICAgICAgaWYgKHRoZVNlZ21lbnQucGlja1N0YXJ0VGVtcFNoYXBlSWQpIHtcbiAgICAgICAgICAgIGFwcFZpZXcuY2xlYXJUZW1wb3JhcnlTaGFwZXNCeUlkcyhbdGhlU2VnbWVudC5waWNrU3RhcnRUZW1wU2hhcGVJZF0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjbG9zZXN0UG9pbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHBpY2tTdGFydFRlbXBTaGFwZUlkID0gYXBwVmlldy5kcmF3TGluZXMoW3Bvc2l0aW9uLCBjbG9zZXN0UG9pbnRdLCB7IGNvbG9yOiBUZW1wTGluZUNvbG9ycy5JbmZlcmVuY2UsIGRlcHRoVGVzdDogZmFsc2UsIHBhdHRlcm46IFRlbXBMaW5lUGF0dGVybnMuSW5mZXJlbmNlLCBnYXBTaXplOiA1MCwgZGFzaFNpemU6IDUwIH0pO1xuICAgICAgICAgICAgaWYgKHBpY2tTdGFydFRlbXBTaGFwZUlkID09PSBudWxsIHx8IHBpY2tTdGFydFRlbXBTaGFwZUlkID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwaWNrU3RhcnRUZW1wU2hhcGVJZC5pZCkge1xuICAgICAgICAgICAgICAgIHRoZVNlZ21lbnQucGlja1N0YXJ0VGVtcFNoYXBlSWQgPSBwaWNrU3RhcnRUZW1wU2hhcGVJZC5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjbGVhclBpY2tTdGFydFRlbXBTaGFwZXModGhlU2VnbWVudCkge1xuICAgICAgICBpZiAodGhlU2VnbWVudC5waWNrU3RhcnRUZW1wU2hhcGVJZCkge1xuICAgICAgICAgICAgYXBwVmlldy5jbGVhclRlbXBvcmFyeVNoYXBlc0J5SWRzKFt0aGVTZWdtZW50LnBpY2tTdGFydFRlbXBTaGFwZUlkXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZHJhd1RlbXBDb21wb25lbnQodGhlU2VnbWVudCwgZm9jdXNlZCA9IGZhbHNlLCBkcmF3SGFuZHJhaWwgPSBmYWxzZSkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBpZiAodGhlU2VnbWVudC5zdGFydExvY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZVNlZ21lbnRTaGFwZSh0aGVTZWdtZW50LCB0aGlzLmRyYXdpbmcpO1xuICAgICAgICAgICAgY29uc3QgeyBzdGFpclNoYXBlOiB7IHZlcnRpY2VzOiBzdGFpclZlcnRpY2VzLCB0ZW1wTGluZXM6IHN0YWlyVGVtcExpbmVzIH0sIG1vbGRTaGFwZTogeyB2ZXJ0aWNlczogbW9sZFZlcnRpY2VzLCB0ZW1wTGluZXM6IG1vbGRUZW1wTGluZXMgfSwgY29ybmVyU2hhcGU6IHsgdmVydGljZXM6IGNvcm5lclZlcnRpY2VzLCB0ZW1wTGluZXM6IGNvcm5lclRlbXBMaW5lcyB9LCBjb3JuZXJNb2xkU2hhcGU6IHsgdmVydGljZXM6IGNvcm5lck1vbGRWZXJ0aWNlcywgdGVtcExpbmVzOiBjb3JuZXJNb2xkVGVtcExpbmVzIH0sIH0gPSB0aGVTZWdtZW50O1xuICAgICAgICAgICAgY29uc3QgdGVtcExpbmVQb2ludHMgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IG1vbGRUZW1wTGluZVBvaW50cyA9IFtdO1xuICAgICAgICAgICAgaWYgKHRoaXMuZHJhd2luZykge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgc3RhaXJUZW1wTGluZSBvZiBzdGFpclRlbXBMaW5lcykge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZVBvaW50cy5wdXNoKFtzdGFpclZlcnRpY2VzW3N0YWlyVGVtcExpbmVbMF1dLCBzdGFpclZlcnRpY2VzW3N0YWlyVGVtcExpbmVbMV1dXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgY29ybmVyVGVtcExpbmUgb2YgY29ybmVyVGVtcExpbmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lUG9pbnRzLnB1c2goW2Nvcm5lclZlcnRpY2VzW2Nvcm5lclRlbXBMaW5lWzBdXSwgY29ybmVyVmVydGljZXNbY29ybmVyVGVtcExpbmVbMV1dXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCBtb2xkVGVtcExpbmUgb2YgbW9sZFRlbXBMaW5lcykge1xuICAgICAgICAgICAgICAgIG1vbGRUZW1wTGluZVBvaW50cy5wdXNoKFttb2xkVmVydGljZXNbbW9sZFRlbXBMaW5lWzBdXSwgbW9sZFZlcnRpY2VzW21vbGRUZW1wTGluZVsxXV1dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgY29ybmVyTW9sZFRlbXBMaW5lIG9mIGNvcm5lck1vbGRUZW1wTGluZXMpIHtcbiAgICAgICAgICAgICAgICBtb2xkVGVtcExpbmVQb2ludHMucHVzaChbY29ybmVyTW9sZFZlcnRpY2VzW2Nvcm5lck1vbGRUZW1wTGluZVswXV0sIGNvcm5lck1vbGRWZXJ0aWNlc1tjb3JuZXJNb2xkVGVtcExpbmVbMV1dXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKF9hID0gdGhlU2VnbWVudC50ZW1wU2hhcGVJZCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGFwcFZpZXcuY2xlYXJUZW1wb3JhcnlTaGFwZXNCeUlkcyh0aGVTZWdtZW50LnRlbXBTaGFwZUlkKTtcbiAgICAgICAgICAgICAgICB0aGVTZWdtZW50LnRlbXBTaGFwZUlkID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGVtcExpbmVQb2ludHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhaXJDb2xvciA9IGZvY3VzZWQgPyBUZW1wTGluZUNvbG9ycy5Gb2N1cyA6IFRlbXBMaW5lQ29sb3JzLlN0YWlyO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRlbXBTaGFwZUlkID0gYXBwVmlldy5kcmF3UG9seWxpbmVzKHRlbXBMaW5lUG9pbnRzLCB7IGNvbG9yOiBzdGFpckNvbG9yLCBkZXB0aFRlc3Q6IGZhbHNlLCBwYXR0ZXJuOiBUZW1wTGluZVBhdHRlcm5zLlN0YWlyQW5kTW9sZCB9KTtcbiAgICAgICAgICAgICAgICBpZiAodGVtcFNoYXBlSWQgPT09IG51bGwgfHwgdGVtcFNoYXBlSWQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHRlbXBTaGFwZUlkLmlkcykge1xuICAgICAgICAgICAgICAgICAgICB0aGVTZWdtZW50LnRlbXBTaGFwZUlkID0gWy4uLnRlbXBTaGFwZUlkLmlkc107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1vbGRUZW1wTGluZVBvaW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtb2xkQ29sb3IgPSBmb2N1c2VkID8gVGVtcExpbmVDb2xvcnMuRm9jdXMgOiBUZW1wTGluZUNvbG9ycy5Nb2xkO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vbGRUZW1wU2hhcGVJZCA9IGFwcFZpZXcuZHJhd1BvbHlsaW5lcyhtb2xkVGVtcExpbmVQb2ludHMsIHsgY29sb3I6IG1vbGRDb2xvciwgZGVwdGhUZXN0OiB0aGlzLmRyYXdpbmcsIHBhdHRlcm46IFRlbXBMaW5lUGF0dGVybnMuU3RhaXJBbmRNb2xkIH0pO1xuICAgICAgICAgICAgICAgIGlmIChtb2xkVGVtcFNoYXBlSWQgPT09IG51bGwgfHwgbW9sZFRlbXBTaGFwZUlkID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtb2xkVGVtcFNoYXBlSWQuaWRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoX2IgPSB0aGVTZWdtZW50LnRlbXBTaGFwZUlkKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGVTZWdtZW50LnRlbXBTaGFwZUlkLnB1c2goLi4ubW9sZFRlbXBTaGFwZUlkLmlkcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGVTZWdtZW50LnRlbXBTaGFwZUlkID0gWy4uLm1vbGRUZW1wU2hhcGVJZC5pZHNdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRyYXdIYW5kcmFpbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0hhbmRyYWlscygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGRyYXdIYW5kcmFpbHMoc3RhaXJQYXJhbSA9IHRoaXMuc3RhaXJQYXJhbSkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBjb25zdCBwcmV2SGFuZHJhaWxUZW1wU2hhcGVJZHMgPSAoX2EgPSB0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRlbXBTaGFwZUlkO1xuICAgICAgICB0aGlzLmdlbmVyYXRlSGFuZHJhaWxTaGFwZShzdGFpclBhcmFtKTtcbiAgICAgICAgaWYgKHByZXZIYW5kcmFpbFRlbXBTaGFwZUlkcyA9PT0gbnVsbCB8fCBwcmV2SGFuZHJhaWxUZW1wU2hhcGVJZHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHByZXZIYW5kcmFpbFRlbXBTaGFwZUlkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGFwcFZpZXcuY2xlYXJUZW1wb3JhcnlTaGFwZXNCeUlkcyhwcmV2SGFuZHJhaWxUZW1wU2hhcGVJZHMpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGhhbmRyYWlscyA9IChfYiA9IHRoaXMuaGFuZHJhaWxDb2xsZWN0aW9uKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuaGFuZHJhaWxzO1xuICAgICAgICBjb25zdCB0ZW1wTGluZVBvaW50cyA9IFtdO1xuICAgICAgICBpZiAodGhpcy5oYW5kcmFpbENvbGxlY3Rpb24gJiYgKGhhbmRyYWlscyA9PT0gbnVsbCB8fCBoYW5kcmFpbHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGhhbmRyYWlscy5sZW5ndGgpKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHsgcmFpbCwgY29sdW1ucyB9IG9mIGhhbmRyYWlscykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmFpbC5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmFpbFBvaW50ID0gcmFpbFtpXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmFpbE5leHRQb2ludCA9IHJhaWxbaSArIDFdO1xuICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZVBvaW50cy5wdXNoKFtyYWlsUG9pbnQsIHJhaWxOZXh0UG9pbnRdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGVtcExpbmVQb2ludHMucHVzaCguLi5jb2x1bW5zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGhhbmRyYWlsVGVtcFNoYXBlSWRzID0gYXBwVmlldy5kcmF3UG9seWxpbmVzKHRlbXBMaW5lUG9pbnRzLCB7IGNvbG9yOiBUZW1wTGluZUNvbG9ycy5IYW5kcmFpbCwgZGVwdGhUZXN0OiBmYWxzZSwgcGF0dGVybjogVGVtcExpbmVQYXR0ZXJucy5IYW5kcmFpbCB9KTtcbiAgICAgICAgICAgIGlmIChoYW5kcmFpbFRlbXBTaGFwZUlkcyA9PT0gbnVsbCB8fCBoYW5kcmFpbFRlbXBTaGFwZUlkcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogaGFuZHJhaWxUZW1wU2hhcGVJZHMuaWRzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kcmFpbENvbGxlY3Rpb24udGVtcFNoYXBlSWQgPSBoYW5kcmFpbFRlbXBTaGFwZUlkcy5pZHM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2xlYXJUZW1wU2hhcGVzKHRoZVNlZ21lbnQpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAodGhlU2VnbWVudCkge1xuICAgICAgICAgICAgaWYgKChfYSA9IHRoZVNlZ21lbnQudGVtcFNoYXBlSWQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBhcHBWaWV3LmNsZWFyVGVtcG9yYXJ5U2hhcGVzQnlJZHModGhlU2VnbWVudC50ZW1wU2hhcGVJZCk7XG4gICAgICAgICAgICAgICAgdGhlU2VnbWVudC50ZW1wU2hhcGVJZCA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYXBwVmlldy5jbGVhclRlbXBvcmFyeVNoYXBlcygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZvY3VzQ29tcG9uZW50KGNvbXBvbmVudEluZGV4KSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICBpZiAoY29tcG9uZW50SW5kZXggPT09IHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2VnbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBsYXN0U2VnbWVudCA9IHRoaXMuc2VnbWVudHNbdGhpcy5zZWdtZW50cy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RTZWdtZW50SW5kZXggPSBsYXN0U2VnbWVudC5wYXJhbS5pbmRleDtcbiAgICAgICAgICAgIC8vIGlmIChjb21wb25lbnRJbmRleCAhPT0gdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXgpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0ZvY3VzZWRTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgodGhpcy5zZWdtZW50cywgY29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgY29uc3Qgb2xkRm9jdXNlZFNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleCh0aGlzLnNlZ21lbnRzLCB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICBpZiAobmV3Rm9jdXNlZFNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kcmF3aW5nICYmICFsYXN0U2VnbWVudC5lbmRMb2NrZWQgJiYgY29tcG9uZW50SW5kZXggIT09IGxhc3RTZWdtZW50SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBwYXJhbTogeyB0eXBlOiBuZXdGb2N1c2VkVHlwZSB9LCBtb2xkU2hhcGU6IHsgdmVydGljZXM6IG5ld0ZvY3VzZWRWZXJ0aWNlcywgdGVtcExpbmVzOiBuZXdGb2N1c2VkVGVtcExpbmVzIH0gfSA9IG5ld0ZvY3VzZWRTZWdtZW50O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHN0YXJ0IH0gPSBsYXN0U2VnbWVudDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhclBpY2tTdGFydFRlbXBTaGFwZXMobGFzdFNlZ21lbnQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV3Rm9jdXNlZFR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJUZW1wU2hhcGVzKGxhc3RTZWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0U2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FjaGVkSW5kZXggPSBsYXN0U2VnbWVudC5wYXJhbS5pbmRleDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5wYXJhbSA9IGdldE5ld0NvbXBvbmVudFBhcmFtKENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpciwgbmV3Rm9jdXNlZFNlZ21lbnQsIHRoaXMuc3RhaXJQYXJhbS51cHdhcmQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LnBhcmFtLmluZGV4ID0gY2FjaGVkSW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5QYXJhbUNoYW5nZWRCeURyYXcsIGNvbXBvbmVudFBhcmFtOiBPYmplY3QuYXNzaWduKHt9LCBsYXN0U2VnbWVudC5wYXJhbSkgfSwgJyonKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbGRGb2N1c2VkU2VnbWVudCAmJiBvbGRGb2N1c2VkU2VnbWVudCAhPT0gbmV3Rm9jdXNlZFNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRGb2N1c2VkU2VnbWVudC5uZXh0Q29tcG9uZW50cy5mb3JFYWNoKGluZHMgPT4gaW5kcy5kZWxldGUobGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoKF9hID0gbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxpbmUzZEluZGV4KSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmV3Rm9jdXNlZFNlZ21lbnQubmV4dENvbXBvbmVudHMuZm9yRWFjaChpbmRzID0+IGluZHMuZGVsZXRlKGxhc3RTZWdtZW50LnBhcmFtLmluZGV4KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFzZVNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleCh0aGlzLnNlZ21lbnRzLCBsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmFzZVNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFzZVNlZ21lbnQubmV4dENvbXBvbmVudHMuZm9yRWFjaChpbmRzID0+IGluZHMuZGVsZXRlKGxhc3RTZWdtZW50LnBhcmFtLmluZGV4KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNsb3Nlc3RQb2ludDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtaW5EaXN0YW5jZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdGb2N1c2VkVGVtcExpbmVzLmZvckVhY2goKGxpbmUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGluZVNlZzNkID0gR2VvbUxpYi5jcmVhdGVMaW5lU2VnbWVudDNkKG5ld0ZvY3VzZWRWZXJ0aWNlc1tsaW5lWzBdXSwgbmV3Rm9jdXNlZFZlcnRpY2VzW2xpbmVbMV1dKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVQb2ludCA9IGxpbmVTZWczZC5nZXRDbG9zZXN0UG9pbnQoc3RhcnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1ckRpc3RhbmNlID0gdGhlUG9pbnQuZGlzdGFuY2VUbyhzdGFydCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjbG9zZXN0UG9pbnQgfHwgY3VyRGlzdGFuY2UgPCBtaW5EaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5EaXN0YW5jZSA9IGN1ckRpc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0UG9pbnQgPSB0aGVQb2ludDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuc3RhcnQgPSBjbG9zZXN0UG9pbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxhc3RTZWdtZW50LmJhc2VMaW5lU2VnM2QgPSB7IHN0YXJ0OiBuZXdGb2N1c2VkVmVydGljZXNbbGluZVswXV0sIGVuZDogbmV3Rm9jdXNlZFZlcnRpY2VzW2xpbmVbMV1dIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQgPSB7IGNvbXBvbmVudEluZGV4OiBuZXdGb2N1c2VkU2VnbWVudC5wYXJhbS5pbmRleCwgbGluZTNkSW5kZXg6IGluZGV4LCBsaW5lM2Q6IHsgc3RhcnQ6IG5ld0ZvY3VzZWRWZXJ0aWNlc1tsaW5lWzBdXSwgZW5kOiBuZXdGb2N1c2VkVmVydGljZXNbbGluZVsxXV0gfSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCgoX2IgPSBsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IubGluZTNkSW5kZXgpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdGb2N1c2VkU2VnbWVudC5uZXh0Q29tcG9uZW50c1tsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50LmxpbmUzZEluZGV4XS5hZGQobGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuc3RhcnRMb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LmNpcmNsZVRhbmdlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5zdGFydEhlaWdodCA9IG5ld0ZvY3VzZWRTZWdtZW50LmVuZEhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1BpY2tTdGFydFRlbXBTaGFwZXMoc3RhcnQsIGxhc3RTZWdtZW50LnN0YXJ0LCBsYXN0U2VnbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5ld0ZvY3VzZWRTZWdtZW50Lm5leHRDb21wb25lbnRzWzBdLnNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmNsZWFyVGVtcFNoYXBlcyhsYXN0U2VnbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9sZEZvY3VzZWRTZWdtZW50ICYmIG9sZEZvY3VzZWRTZWdtZW50ICE9PSBuZXdGb2N1c2VkU2VnbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRGb2N1c2VkU2VnbWVudC5uZXh0Q29tcG9uZW50cy5mb3JFYWNoKGluZHMgPT4gaW5kcy5kZWxldGUobGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCgoX2MgPSBsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50KSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MubGluZTNkSW5kZXgpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmV3Rm9jdXNlZFNlZ21lbnQubmV4dENvbXBvbmVudHMuZm9yRWFjaChpbmRzID0+IGluZHMuZGVsZXRlKGxhc3RTZWdtZW50LnBhcmFtLmluZGV4KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgodGhpcy5zZWdtZW50cywgbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiYXNlU2VnbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFzZVNlZ21lbnQubmV4dENvbXBvbmVudHMuZm9yRWFjaChpbmRzID0+IGluZHMuZGVsZXRlKGxhc3RTZWdtZW50LnBhcmFtLmluZGV4KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuc3RhcnQgPSBuZXdGb2N1c2VkU2VnbWVudC5lbmQuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5zdGFydExvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuc3RhcnRIZWlnaHQgPSBuZXdGb2N1c2VkU2VnbWVudC5lbmRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGFzdFNlZ21lbnQuYmFzZUxpbmVTZWczZCA9IHsgc3RhcnQ6IG5ld0ZvY3VzZWRWZXJ0aWNlc1tuZXdGb2N1c2VkVmVydGljZXMubGVuZ3RoIC0gMV0sIGVuZDogbmV3Rm9jdXNlZFZlcnRpY2VzW25ld0ZvY3VzZWRWZXJ0aWNlcy5sZW5ndGggLSAyXSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQgPSB7IGNvbXBvbmVudEluZGV4OiBuZXdGb2N1c2VkU2VnbWVudC5wYXJhbS5pbmRleCwgbGluZTNkSW5kZXg6IDAsIGxpbmUzZDogeyBzdGFydDogbmV3Rm9jdXNlZFZlcnRpY2VzW25ld0ZvY3VzZWRWZXJ0aWNlcy5sZW5ndGggLSAxXSwgZW5kOiBuZXdGb2N1c2VkVmVydGljZXNbbmV3Rm9jdXNlZFZlcnRpY2VzLmxlbmd0aCAtIDJdIH0gfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdGb2N1c2VkU2VnbWVudC5uZXh0Q29tcG9uZW50c1swXS5hZGQobGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LmNpcmNsZVRhbmdlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3VGVtcENvbXBvbmVudChsYXN0U2VnbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBsYXN0U2VnbWVudC5zdGFydExvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGxhc3RTZWdtZW50LmNpcmNsZVRhbmdlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCh0aGlzLmRyYXdpbmcgJiYgY29tcG9uZW50SW5kZXggIT09IGxhc3RTZWdtZW50SW5kZXgpIHx8ICF0aGlzLmRyYXdpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3VGVtcENvbXBvbmVudChuZXdGb2N1c2VkU2VnbWVudCwgdGhpcy5kcmF3aW5nLCB0aGlzLmRyYXdpbmcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgoKHRoaXMuZHJhd2luZyAmJiB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCAhPT0gbGFzdFNlZ21lbnRJbmRleCkgfHwgKCF0aGlzLmRyYXdpbmcgJiYgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggIT09IGNvbXBvbmVudEluZGV4KSkgJiYgb2xkRm9jdXNlZFNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kcmF3aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBDb21wb25lbnQob2xkRm9jdXNlZFNlZ21lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhclRlbXBTaGFwZXMob2xkRm9jdXNlZFNlZ21lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4ID0gY29tcG9uZW50SW5kZXg7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVtb3ZlQ29tcG9uZW50KGNvbXBvbmVudEluZGV4KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKHRoaXMuc2VnbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCB0aGVJbmRleCA9IHRoaXMuc2VnbWVudHMuZmluZEluZGV4KHNlZyA9PiBzZWcucGFyYW0uaW5kZXggPT09IGNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgIGlmICh0aGVJbmRleCA+IC0xKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGhlU2VnbWVudCA9IHRoaXMuc2VnbWVudHNbdGhlSW5kZXhdO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYXdpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChfYSA9IHRoZVNlZ21lbnQudGVtcFNoYXBlSWQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcFZpZXcuY2xlYXJUZW1wb3JhcnlTaGFwZXNCeUlkcyh0aGVTZWdtZW50LnRlbXBTaGFwZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdIYW5kcmFpbHMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5lZGl0TW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlSW5zdGFuY2UgPSB0aGlzLmVkaXRNb2RlbC5zdGFpcnMuZ2V0KGNvbXBvbmVudEluZGV4KSB8fCB0aGlzLmVkaXRNb2RlbC5wbGF0Zm9ybXMuZ2V0KGNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoZUluc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlbC5zdGFpcnMuZGVsZXRlKGNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsLnBsYXRmb3Jtcy5kZWxldGUoY29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVzaWduLnJlbW92ZUdyb3VwSW5zdGFuY2UodGhlSW5zdGFuY2UuaW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc2VnbWVudHMuc3BsaWNlKHRoZUluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAvLyB0byBjbGVhciByZWxhdGlvbnNcbiAgICAgICAgICAgICAgICBjb25zdCBiYXNlQ29tcG9uZW50ID0gdGhlU2VnbWVudC5iYXNlQ29tcG9uZW50O1xuICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgodGhpcy5zZWdtZW50cywgYmFzZUNvbXBvbmVudCA9PT0gbnVsbCB8fCBiYXNlQ29tcG9uZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBiYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICBpZiAoYmFzZVNlZ21lbnQgJiYgKGJhc2VDb21wb25lbnQgPT09IG51bGwgfHwgYmFzZUNvbXBvbmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleCkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCB0aGVJbmQgPSBiYXNlU2VnbWVudC5uZXh0Q29tcG9uZW50c1tiYXNlQ29tcG9uZW50LmxpbmUzZEluZGV4XS5maW5kSW5kZXgoaSA9PiBpID09PSB0aGVTZWdtZW50LnBhcmFtLmluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKHRoZUluZCA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGJhc2VTZWdtZW50Lm5leHRDb21wb25lbnRzW2Jhc2VDb21wb25lbnQubGluZTNkSW5kZXhdLmRlbGV0ZSh0aGVTZWdtZW50LnBhcmFtLmluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBuZXh0Q29tcG9uZW50cyA9IHRoZVNlZ21lbnQubmV4dENvbXBvbmVudHM7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBuZXh0U2VnbWVudEluZHMgb2YgbmV4dENvbXBvbmVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRTZWdtZW50SW5kcy5zaXplKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG5leHRTZWdJbmQgb2YgbmV4dFNlZ21lbnRJbmRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dFNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleCh0aGlzLnNlZ21lbnRzLCBuZXh0U2VnSW5kKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFNlZ21lbnQgJiYgbmV4dFNlZ21lbnQuYmFzZUNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U2VnbWVudC5iYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U2VnbWVudC5iYXNlQ29tcG9uZW50LmxpbmUzZEluZGV4ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4ID09PSBjb21wb25lbnRJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggPSB0aGlzLnNlZ21lbnRzW3RoaXMuc2VnbWVudHMubGVuZ3RoIC0gMV0ucGFyYW0uaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIG9uTWF0ZXJpYWxSZXBsYWNlQ2xpY2soY2hhbmdlUGFyYW1UeXBlLCBpbmRleCkge1xuICAgICAgICBhcHAuZ2V0QXBwbGljYXRpb25VSSgpLnRvZ2dsZU1hdGVyaWFsUmVwbGFjZVBhbmVsKHRydWUsIHRoaXMub25NYXRlcmlhbFJlcGxhY2VJdGVtQ2xpY2soY2hhbmdlUGFyYW1UeXBlLCBpbmRleCkpO1xuICAgIH1cbiAgICBjaGFuZ2VTdGFpclBhcmFtKHN0YWlyUGFyYW0sIGNoYW5nZVBhcmFtVHlwZXMpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2YsIF9nLCBfaDtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIC8vIHRoaXMuc3RhaXJQYXJhbSA9IHN0YWlyUGFyYW1cbiAgICAgICAgICAgIGlmICghdGhpcy5zZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBpbnN0YW5jZVBhdGggPSB0aGlzLmVkaXRNb2RlbCA/IGRlc2lnbi5nZXRFZGl0UGF0aHNUb0dyb3VwSW5zdGFuY2UodGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlKSA6IFtdO1xuICAgICAgICAgICAgY29uc3QgbGFzdFNlZ21lbnQgPSB0aGlzLnNlZ21lbnRzW3RoaXMuc2VnbWVudHMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBsZXQgc3RhaXJQcmFhbVN0cmluZyA9ICcnO1xuICAgICAgICAgICAgaWYgKGNoYW5nZVBhcmFtVHlwZXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuV2lkdGhQcm9wb3J0aW9uYWwpID4gLTEgfHwgY2hhbmdlUGFyYW1UeXBlcy5pbmRleE9mKENvbXBvbmVudFBhcmFtVHlwZS5TdGVwUHJvcG9ydGlvbmFsKSA+IC0xIHx8XG4gICAgICAgICAgICAgICAgY2hhbmdlUGFyYW1UeXBlcy5pbmRleE9mKENvbXBvbmVudFBhcmFtVHlwZS5QbGF0Zm9ybUxlbmd0aExvY2tlZCkgPiAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhaXJQYXJhbSA9IHN0YWlyUGFyYW07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaGFuZ2VQYXJhbVR5cGVzLmluZGV4T2YoQ29tcG9uZW50UGFyYW1UeXBlLkhvcml6b250YWxTdGVwKSA+IC0xIHx8IGNoYW5nZVBhcmFtVHlwZXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuVmVydGljYWxTdGVwKSA+IC0xIHx8XG4gICAgICAgICAgICAgICAgY2hhbmdlUGFyYW1UeXBlcy5pbmRleE9mKENvbXBvbmVudFBhcmFtVHlwZS5TdGFydFdpZHRoKSA+IC0xIHx8IGNoYW5nZVBhcmFtVHlwZXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuRW5kV2lkdGgpID4gLTEgfHxcbiAgICAgICAgICAgICAgICBjaGFuZ2VQYXJhbVR5cGVzLmluZGV4T2YoQ29tcG9uZW50UGFyYW1UeXBlLlVwd2FyZCkgPiAtMSB8fFxuICAgICAgICAgICAgICAgIGNoYW5nZVBhcmFtVHlwZXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuUGxhdGZvcm1UaGlja25lc3MpID4gLTEpIHtcbiAgICAgICAgICAgICAgICBsZXQgcmVHZW5lcmF0ZVNlZ21lbnRzID0gdGhpcy5zZWdtZW50cztcbiAgICAgICAgICAgICAgICBpZiAoY2hhbmdlUGFyYW1UeXBlcy5pbmRleE9mKENvbXBvbmVudFBhcmFtVHlwZS5VcHdhcmQpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVHZW5lcmF0ZVNlZ21lbnRzID0gY2hhbmdlU3RhaXJVcHdhcmQocmVHZW5lcmF0ZVNlZ21lbnRzWzBdLCByZUdlbmVyYXRlU2VnbWVudHMsIHN0YWlyUGFyYW0udXB3YXJkLCB0cnVlKSB8fCByZUdlbmVyYXRlU2VnbWVudHM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoYW5nZVBhcmFtVHlwZXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuSG9yaXpvbnRhbFN0ZXApID4gLTEgfHwgY2hhbmdlUGFyYW1UeXBlcy5pbmRleE9mKENvbXBvbmVudFBhcmFtVHlwZS5WZXJ0aWNhbFN0ZXApID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVHZW5lcmF0ZVNlZ21lbnRzID0gY2hhbmdlU3RhaXJTdGVwKHJlR2VuZXJhdGVTZWdtZW50c1swXSwgdGhpcy5zZWdtZW50cywgc3RhaXJQYXJhbS5ob3Jpem9udGFsU3RlcCwgc3RhaXJQYXJhbS52ZXJ0aWNhbFN0ZXAsIHRydWUsIGZhbHNlKSB8fCByZUdlbmVyYXRlU2VnbWVudHM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZUdlbmVyYXRlU2VnbWVudHMgPSB0aGlzLnNlZ21lbnRzLmZpbHRlcihzZWcgPT4gY2hhbmdlUGFyYW1UeXBlcy5pbmRleE9mKENvbXBvbmVudFBhcmFtVHlwZS5QbGF0Zm9ybVRoaWNrbmVzcykgPiAtMSA/IHNlZy5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtIDogc2VnLnBhcmFtLnR5cGUgIT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocmVHZW5lcmF0ZVNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHJlR2VuZXJhdGVTZWdtZW50IG9mIHJlR2VuZXJhdGVTZWdtZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBjaGFuZ2VQYXJhbVR5cGUgb2YgY2hhbmdlUGFyYW1UeXBlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlR2VuZXJhdGVTZWdtZW50LnBhcmFtW2NoYW5nZVBhcmFtVHlwZV0gPSBzdGFpclBhcmFtW2NoYW5nZVBhcmFtVHlwZV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyZW50VHJhbnNmb3JtID0gdGhpcy5lZGl0TW9kZWwgPyB0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2UuZ2V0VHJhbnNmb3JtKCkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9sZFN0YWlyUGFyYW0gPSB0aGlzLnN0YWlyUGFyYW07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9sZENvbXBvbmVudFBhcmFtcyA9IG5ldyBNYXAodGhpcy5zZWdtZW50cy5tYXAoc2VnID0+IChbc2VnLnBhcmFtLmluZGV4LCBPYmplY3QuYXNzaWduKHt9LCBzZWcucGFyYW0pXSkpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFpclBhcmFtID0gc3RhaXJQYXJhbTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9wZXJhdGlvblN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZHJhd2luZyAmJiB0aGlzLmVkaXRNb2RlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyUHJhYW1TdHJpbmcgPSBzdHJpbmdpZnlTdGFpclBhcmFtKHN0YWlyUGFyYW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgISEoKF9hID0gdGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2V0Q3VzdG9tUHJvcGVydHkoU3RhaXJQYXJhbUtleSwgc3RhaXJQcmFhbVN0cmluZykuaXNTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZVBhdGgubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKHlpZWxkIGRlc2lnbi5hY3RpdmF0ZUVkaXRQYXRoKFsuLi5pbnN0YW5jZVBhdGhbMF0sIHRoaXMuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZV0pKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCByZUdlbmVyYXRlU2VnbWVudCBvZiByZUdlbmVyYXRlU2VnbWVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VQYXJhbVR5cGVzLmxlbmd0aCA9PT0gMSAmJiBjaGFuZ2VQYXJhbVR5cGVzWzBdID09PSBDb21wb25lbnRQYXJhbVR5cGUuUGxhdGZvcm1UaGlja25lc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZUdlbmVyYXRlU2VnbWVudC5wYXJhbS5wbGF0Zm9ybVRoaWNrbmVzcyA9IHRoaXMuc3RhaXJQYXJhbS5wbGF0Zm9ybVRoaWNrbmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgY2hhbmdlUGFyYW1UeXBlIG9mIGNoYW5nZVBhcmFtVHlwZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVHZW5lcmF0ZVNlZ21lbnQucGFyYW1bY2hhbmdlUGFyYW1UeXBlXSA9IHRoaXMuc3RhaXJQYXJhbVtjaGFuZ2VQYXJhbVR5cGVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYXdpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnN0YWlyUGFyYW0gPSBzdGFpclBhcmFtO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBDb21wb25lbnQocmVHZW5lcmF0ZVNlZ21lbnQsIHJlR2VuZXJhdGVTZWdtZW50LnBhcmFtLmluZGV4ID09PSB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCAmJiByZUdlbmVyYXRlU2VnbWVudC5wYXJhbS5pbmRleCAhPT0gbGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5lZGl0TW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHBhcmFtOiB7IGluZGV4LCB0eXBlIH0gfSA9IHJlR2VuZXJhdGVTZWdtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoZUluc3RhbmNlID0gdGhpcy5lZGl0TW9kZWwuc3RhaXJzLmdldChpbmRleCkgfHwgdGhpcy5lZGl0TW9kZWwucGxhdGZvcm1zLmdldChpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoZUluc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVTZWdtZW50U2hhcGUocmVHZW5lcmF0ZVNlZ21lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVNZXNoZXMgPSBnZW5lcmF0ZU1lc2hlcyhbcmVHZW5lcmF0ZVNlZ21lbnRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoZU1lc2hlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb25TdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZGVzaWduLnJlbW92ZUdyb3VwSW5zdGFuY2UodGhlSW5zdGFuY2UuaW5zdGFuY2UpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdJbnN0YW5jZSA9IGJ1aWxkQ29tcG9uZW50SW5zdGFuY2UocmVHZW5lcmF0ZVNlZ21lbnQsIHRoaXMuc2VnbWVudHMsIHBhcmVudFRyYW5zZm9ybSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICEhbmV3SW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdJbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlbC5wbGF0Zm9ybXMuc2V0KGluZGV4LCB7IGluc3RhbmNlOiBuZXdJbnN0YW5jZSwgZGVmaW5pdGlvbktleTogKChfYiA9IG5ld0luc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuZ2V0S2V5KCkpIHx8ICcnLCBpbnN0YW5jZUtleTogbmV3SW5zdGFuY2UuZ2V0S2V5KCkgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlbC5zdGFpcnMuc2V0KGluZGV4LCB7IGluc3RhbmNlOiBuZXdJbnN0YW5jZSwgZGVmaW5pdGlvbktleTogKChfYyA9IG5ld0luc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuZ2V0S2V5KCkpIHx8ICcnLCBpbnN0YW5jZUtleTogbmV3SW5zdGFuY2UuZ2V0S2V5KCkgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kcmF3aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdIYW5kcmFpbHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuU3RhaXJQYXJhbUNoYW5nZWRCeURyYXcsIHN0YWlyUGFyYW06IHRoaXMuc3RhaXJQYXJhbSwgY29tcG9uZW50UGFyYW1zOiB0aGlzLnNlZ21lbnRzLm1hcChzZWcgPT4gKE9iamVjdC5hc3NpZ24oe30sIHNlZy5wYXJhbSkpKSB9LCAnKicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCF0aGlzLmRyYXdpbmcgJiYgdGhpcy5lZGl0TW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVIYW5kcmFpbFNoYXBlKHN0YWlyUGFyYW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChfZCA9IHRoaXMuaGFuZHJhaWxDb2xsZWN0aW9uKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QuaGFuZHJhaWxzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVkaXRNb2RlbC5oYW5kcmFpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBkZXNpZ24ucmVtb3ZlR3JvdXBJbnN0YW5jZSh0aGlzLmVkaXRNb2RlbC5oYW5kcmFpbC5oYW5kcmFpbEluc3RhbmNlLmluc3RhbmNlKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsLmhhbmRyYWlsID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYW5kcmFpbEluc3RhbmNlc0RhdGEgPSB5aWVsZCBidWlsZEhhbmRyYWlsSW5zdGFuY2Uoc3RhaXJQYXJhbSwgKF9lID0gdGhpcy5oYW5kcmFpbENvbGxlY3Rpb24pID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS5oYW5kcmFpbHMsIHRoaXMuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZS5nZXRUcmFuc2Zvcm0oKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgaGFuZHJhaWxJbnN0YW5jZXNEYXRhICE9PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhbmRyYWlsSW5zdGFuY2VzRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlbC5oYW5kcmFpbCA9IGhhbmRyYWlsSW5zdGFuY2VzRGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2VQYXRoLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICh5aWVsZCBkZXNpZ24uYWN0aXZhdGVFZGl0UGF0aChpbnN0YW5jZVBhdGhbMF0pKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnRJbnN0YW5jZSA9IHRoaXMuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb25TdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWl0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zdGFpclBhcmFtID0gc3RhaXJQYXJhbTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlN0YWlyUGFyYW1DaGFuZ2VkQnlEcmF3LCBzdGFpclBhcmFtOiB0aGlzLnN0YWlyUGFyYW0sIGNvbXBvbmVudFBhcmFtczogdGhpcy5zZWdtZW50cy5tYXAoc2VnID0+IChPYmplY3QuYXNzaWduKHt9LCBzZWcucGFyYW0pKSkgfSwgJyonKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFib3J0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFpclBhcmFtID0gb2xkU3RhaXJQYXJhbTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHNlZ21lbnQgb2YgdGhpcy5zZWdtZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvbGRTZWdtZW50UGFyYW0gPSBvbGRDb21wb25lbnRQYXJhbXMuZ2V0KHNlZ21lbnQucGFyYW0uaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2xkU2VnbWVudFBhcmFtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50LnBhcmFtID0gb2xkU2VnbWVudFBhcmFtO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuU3RhaXJQYXJhbUNoYW5nZWRCeURyYXcsIHN0YWlyUGFyYW06IHRoaXMuc3RhaXJQYXJhbSB9LCAnKicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uLmFkZChbcGFyZW50SW5zdGFuY2VdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoYW5nZVBhcmFtVHlwZXMubGVuZ3RoID09PSAxICYmIGNoYW5nZVBhcmFtVHlwZXNbMF0uc3RhcnRzV2l0aChDb21wb25lbnRQYXJhbVR5cGUuSGFuZHJhaWwpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZHJhd2luZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWlyUGFyYW0gPSBzdGFpclBhcmFtO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdIYW5kcmFpbHMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5lZGl0TW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUhhbmRyYWlsU2hhcGUoc3RhaXJQYXJhbSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBvcGVyYXRpb25TdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgc3RhaXJQcmFhbVN0cmluZyA9IHN0cmluZ2lmeVN0YWlyUGFyYW0oc3RhaXJQYXJhbSk7XG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICEhKChfZiA9IHRoaXMuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9mLnNldEN1c3RvbVByb3BlcnR5KFN0YWlyUGFyYW1LZXksIHN0YWlyUHJhYW1TdHJpbmcpLmlzU3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZVBhdGgubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAoeWllbGQgZGVzaWduLmFjdGl2YXRlRWRpdFBhdGgoWy4uLmluc3RhbmNlUGF0aFswXSwgdGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlXSkpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lZGl0TW9kZWwuaGFuZHJhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGRlc2lnbi5yZW1vdmVHcm91cEluc3RhbmNlKHRoaXMuZWRpdE1vZGVsLmhhbmRyYWlsLmhhbmRyYWlsSW5zdGFuY2UuaW5zdGFuY2UpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsLmhhbmRyYWlsID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICgoX2cgPSB0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbikgPT09IG51bGwgfHwgX2cgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9nLmhhbmRyYWlscy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRyYWlsSW5zdGFuY2VzRGF0YSA9IHlpZWxkIGJ1aWxkSGFuZHJhaWxJbnN0YW5jZShzdGFpclBhcmFtLCAoX2ggPSB0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbikgPT09IG51bGwgfHwgX2ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9oLmhhbmRyYWlscywgdGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlLmdldFRyYW5zZm9ybSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGhhbmRyYWlsSW5zdGFuY2VzRGF0YSAhPT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhbmRyYWlsSW5zdGFuY2VzRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsLmhhbmRyYWlsID0gaGFuZHJhaWxJbnN0YW5jZXNEYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZVBhdGgubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAoeWllbGQgZGVzaWduLmFjdGl2YXRlRWRpdFBhdGgoWy4uLmluc3RhbmNlUGF0aFswXV0pKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyZW50SW5zdGFuY2UgPSB0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb25TdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21taXRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhaXJQYXJhbSA9IHN0YWlyUGFyYW07XG4gICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlN0YWlyUGFyYW1DaGFuZ2VkQnlEcmF3LCBzdGFpclBhcmFtOiB0aGlzLnN0YWlyUGFyYW0gfSwgJyonKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFib3J0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlN0YWlyUGFyYW1DaGFuZ2VkQnlEcmF3LCBzdGFpclBhcmFtOiB0aGlzLnN0YWlyUGFyYW0gfSwgJyonKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb24uYWRkKFtwYXJlbnRJbnN0YW5jZV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCFzdGFpclBhcmFtLnN0YWlyTWF0ZXJpYWwgJiYgY2hhbmdlUGFyYW1UeXBlcy5sZW5ndGggPT09IDAgJiYgY2hhbmdlUGFyYW1UeXBlc1swXSA9PT0gQ29tcG9uZW50UGFyYW1UeXBlLlN0YWlyTWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLm9uTWF0ZXJpYWxSZXBsYWNlSXRlbUNsaWNrKGNoYW5nZVBhcmFtVHlwZXNbMF0sIHVuZGVmaW5lZCwgdHJ1ZSkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCFzdGFpclBhcmFtLnBsYXRmb3JtTWF0ZXJpYWwgJiYgY2hhbmdlUGFyYW1UeXBlcy5sZW5ndGggPT09IDAgJiYgY2hhbmdlUGFyYW1UeXBlc1swXSA9PT0gQ29tcG9uZW50UGFyYW1UeXBlLlBsYXRmb3JtTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgeWllbGQgdGhpcy5vbk1hdGVyaWFsUmVwbGFjZUl0ZW1DbGljayhjaGFuZ2VQYXJhbVR5cGVzWzBdLCB1bmRlZmluZWQsIHRydWUpKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghc3RhaXJQYXJhbS5oYW5kcmFpbC5yYWlsLm1hdGVyaWFsICYmIGNoYW5nZVBhcmFtVHlwZXMubGVuZ3RoID09PSAwICYmIGNoYW5nZVBhcmFtVHlwZXNbMF0gPT09IENvbXBvbmVudFBhcmFtVHlwZS5IYW5kcmFpbFJhaWxNYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMub25NYXRlcmlhbFJlcGxhY2VJdGVtQ2xpY2soY2hhbmdlUGFyYW1UeXBlc1swXSwgdW5kZWZpbmVkLCB0cnVlKSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXN0YWlyUGFyYW0uaGFuZHJhaWwuY29sdW1uLm1hdGVyaWFsICYmIGNoYW5nZVBhcmFtVHlwZXMubGVuZ3RoID09PSAwICYmIGNoYW5nZVBhcmFtVHlwZXNbMF0gPT09IENvbXBvbmVudFBhcmFtVHlwZS5IYW5kcmFpbENvbHVtbk1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgeWllbGQgdGhpcy5vbk1hdGVyaWFsUmVwbGFjZUl0ZW1DbGljayhjaGFuZ2VQYXJhbVR5cGVzWzBdLCB1bmRlZmluZWQsIHRydWUpKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjaGFuZ2VDb21wb25lbnRQYXJhbShjb21wb25lbnRQYXJhbSwgY2hhbmdlUGFyYW1UeXBlcykge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2Q7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc2VnbWVudHMubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNvbnN0IHRoZVNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleCh0aGlzLnNlZ21lbnRzLCBjb21wb25lbnRQYXJhbS5pbmRleCk7XG4gICAgICAgICAgICBjb25zdCBsYXN0U2VnbWVudCA9IHRoaXMuc2VnbWVudHNbdGhpcy5zZWdtZW50cy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGlmICh0aGVTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50UGFyYW0ubW9kZWxFZGl0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAvLyB0aGVTZWdtZW50LnBhcmFtID0gY29tcG9uZW50UGFyYW07XG4gICAgICAgICAgICAgICAgaWYgKCFpc0NpcmN1bGFyU3RhaXIodGhlU2VnbWVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhlU2VnbWVudC5jaXJjbGVUYW5nZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY2hhbmdlUGFyYW1UeXBlcy5sZW5ndGggPT09IDAgJiYgY2hhbmdlUGFyYW1UeXBlc1swXSA9PT0gQ29tcG9uZW50UGFyYW1UeXBlLkNvbXBvbmVudE1hdGVyaWFsICYmICFjb21wb25lbnRQYXJhbS5tYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTWF0ZXJpYWxSZXBsYWNlSXRlbUNsaWNrKGNoYW5nZVBhcmFtVHlwZXNbMF0sIGNvbXBvbmVudFBhcmFtLmluZGV4LCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hhbmdlUGFyYW1UeXBlcy5sZW5ndGggPT09IDEgJiYgKGNoYW5nZVBhcmFtVHlwZXNbMF0gPT09IENvbXBvbmVudFBhcmFtVHlwZS5TdGVwUHJvcG9ydGlvbmFsIHx8XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZVBhcmFtVHlwZXNbMF0gPT09IENvbXBvbmVudFBhcmFtVHlwZS5XaWR0aFByb3BvcnRpb25hbCB8fFxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VQYXJhbVR5cGVzWzBdID09PSBDb21wb25lbnRQYXJhbVR5cGUuUGxhdGZvcm1MZW5ndGhMb2NrZWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoZVNlZ21lbnQucGFyYW0gPSBjb21wb25lbnRQYXJhbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9sZFBhcmFtID0gdGhlU2VnbWVudC5wYXJhbTtcbiAgICAgICAgICAgICAgICAgICAgdGhlU2VnbWVudC5wYXJhbSA9IGNvbXBvbmVudFBhcmFtO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVHZW5lcmF0ZVNlZ21lbnRzID0gW3RoZVNlZ21lbnRdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlUGFyYW1UeXBlcy5pbmRleE9mKENvbXBvbmVudFBhcmFtVHlwZS5VcHdhcmQpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlR2VuZXJhdGVTZWdtZW50cyA9IGNoYW5nZVN0YWlyVXB3YXJkKHRoZVNlZ21lbnQsIHRoaXMuc2VnbWVudHMsIHRoZVNlZ21lbnQucGFyYW0udXB3YXJkLCBmYWxzZSwgdHJ1ZSkgfHwgcmVHZW5lcmF0ZVNlZ21lbnRzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoYW5nZVBhcmFtVHlwZXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuSG9yaXpvbnRhbFN0ZXApID4gLTEgfHwgY2hhbmdlUGFyYW1UeXBlcy5pbmRleE9mKENvbXBvbmVudFBhcmFtVHlwZS5WZXJ0aWNhbFN0ZXApID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlR2VuZXJhdGVTZWdtZW50cyA9IGNoYW5nZVN0YWlyU3RlcCh0aGVTZWdtZW50LCB0aGlzLnNlZ21lbnRzLCBjb21wb25lbnRQYXJhbS5ob3Jpem9udGFsU3RlcCwgY29tcG9uZW50UGFyYW0udmVydGljYWxTdGVwLCBmYWxzZSwgdHJ1ZSkgfHwgcmVHZW5lcmF0ZVNlZ21lbnRzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZUdlbmVyYXRlU2VnbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3BlcmF0aW9uU3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbnN0YW5jZVBhdGggPSB0aGlzLmVkaXRNb2RlbCA/IGRlc2lnbi5nZXRFZGl0UGF0aHNUb0dyb3VwSW5zdGFuY2UodGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlKSA6IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmRyYXdpbmcgJiYgdGhpcy5lZGl0TW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZVBhdGgubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICh5aWVsZCBkZXNpZ24uYWN0aXZhdGVFZGl0UGF0aChbLi4uaW5zdGFuY2VQYXRoWzBdLCB0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2VdKSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudFRyYW5zZm9ybSA9IHRoaXMuZWRpdE1vZGVsID8gdGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlLmdldFRyYW5zZm9ybSgpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCByZUdlbmVyYXRlU2VnbWVudCBvZiByZUdlbmVyYXRlU2VnbWVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kcmF3aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBDb21wb25lbnQocmVHZW5lcmF0ZVNlZ21lbnQsIHJlR2VuZXJhdGVTZWdtZW50LnBhcmFtLmluZGV4ID09PSB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCAmJiByZUdlbmVyYXRlU2VnbWVudC5wYXJhbS5pbmRleCAhPT0gbGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmVkaXRNb2RlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHBhcmFtOiB7IGluZGV4LCB0eXBlIH0gfSA9IHJlR2VuZXJhdGVTZWdtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVJbnN0YW5jZSA9IHRoaXMuZWRpdE1vZGVsLnN0YWlycy5nZXQoaW5kZXgpIHx8IHRoaXMuZWRpdE1vZGVsLnBsYXRmb3Jtcy5nZXQoaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhlSW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVTZWdtZW50U2hhcGUocmVHZW5lcmF0ZVNlZ21lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlTWVzaGVzID0gZ2VuZXJhdGVNZXNoZXMoW3JlR2VuZXJhdGVTZWdtZW50XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhlTWVzaGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb25TdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGRlc2lnbi5yZW1vdmVHcm91cEluc3RhbmNlKHRoZUluc3RhbmNlLmluc3RhbmNlKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb25TdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdJbnN0YW5jZSA9IGJ1aWxkQ29tcG9uZW50SW5zdGFuY2UocmVHZW5lcmF0ZVNlZ21lbnQsIHRoaXMuc2VnbWVudHMsIHBhcmVudFRyYW5zZm9ybSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAhIW5ld0luc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0luc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZWwucGxhdGZvcm1zLnNldChpbmRleCwgeyBpbnN0YW5jZTogbmV3SW5zdGFuY2UsIGRlZmluaXRpb25LZXk6ICgoX2EgPSBuZXdJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmdldEtleSgpKSB8fCAnJywgaW5zdGFuY2VLZXk6IG5ld0luc3RhbmNlLmdldEtleSgpIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZWwuc3RhaXJzLnNldChpbmRleCwgeyBpbnN0YW5jZTogbmV3SW5zdGFuY2UsIGRlZmluaXRpb25LZXk6ICgoX2IgPSBuZXdJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmdldEtleSgpKSB8fCAnJywgaW5zdGFuY2VLZXk6IG5ld0luc3RhbmNlLmdldEtleSgpIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0YWlyUGFyYW1DaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kcmF3aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3SGFuZHJhaWxzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZVBhcmFtVHlwZXNbMF0gIT09IENvbXBvbmVudFBhcmFtVHlwZS5UeXBlICYmIGNoYW5nZVBhcmFtVHlwZXNbMF0gIT09IENvbXBvbmVudFBhcmFtVHlwZS5QbGF0Zm9ybUxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVTZWdtZW50cyA9IHRoaXMuc2VnbWVudHMuZmlsdGVyKHNlZyA9PiAoc2VnLnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pID09PSAoY2hhbmdlUGFyYW1UeXBlc1swXSA9PT0gQ29tcG9uZW50UGFyYW1UeXBlLlBsYXRmb3JtVGhpY2tuZXNzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGVTZWdtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgY2hhbmdlUGFyYW1UeXBlIG9mIGNoYW5nZVBhcmFtVHlwZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWlyUGFyYW1bY2hhbmdlUGFyYW1UeXBlXSA9IHRoZVNlZ21lbnQucGFyYW1bY2hhbmdlUGFyYW1UeXBlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyUGFyYW1DaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhaXJQYXJhbUNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5QYXJhbUNoYW5nZWRCeURyYXcsIGNvbXBvbmVudFBhcmFtOiBPYmplY3QuYXNzaWduKHt9LCB0aGVTZWdtZW50LnBhcmFtKSwgc3RhaXJQYXJhbTogc3RhaXJQYXJhbUNoYW5nZWQgPyB0aGlzLnN0YWlyUGFyYW0gOiB1bmRlZmluZWQgfSwgJyonKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmVkaXRNb2RlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVIYW5kcmFpbFNoYXBlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhaXJQYXJhbS5oYW5kcmFpbC5zdXBwb3J0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVkaXRNb2RlbC5oYW5kcmFpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZGVzaWduLnJlbW92ZUdyb3VwSW5zdGFuY2UodGhpcy5lZGl0TW9kZWwuaGFuZHJhaWwuaGFuZHJhaWxJbnN0YW5jZS5pbnN0YW5jZSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoX2MgPSB0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbikgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmhhbmRyYWlscy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRyYWlsSW5zdGFuY2VzRGF0YSA9IHlpZWxkIGJ1aWxkSGFuZHJhaWxJbnN0YW5jZSh0aGlzLnN0YWlyUGFyYW0sIChfZCA9IHRoaXMuaGFuZHJhaWxDb2xsZWN0aW9uKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QuaGFuZHJhaWxzLCBwYXJlbnRUcmFuc2Zvcm0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgaGFuZHJhaWxJbnN0YW5jZXNEYXRhICE9PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGFuZHJhaWxJbnN0YW5jZXNEYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZWwuaGFuZHJhaWwgPSBoYW5kcmFpbEluc3RhbmNlc0RhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlUGF0aC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKHlpZWxkIGRlc2lnbi5hY3RpdmF0ZUVkaXRQYXRoKGluc3RhbmNlUGF0aFswXSkpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyZW50SW5zdGFuY2UgPSB0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWl0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZVNlZ21lbnQucGFyYW0gPSBjb21wb25lbnRQYXJhbTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZVBhcmFtVHlwZXNbMF0gIT09IENvbXBvbmVudFBhcmFtVHlwZS5UeXBlICYmIGNoYW5nZVBhcmFtVHlwZXNbMF0gIT09IENvbXBvbmVudFBhcmFtVHlwZS5QbGF0Zm9ybUxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlU2VnbWVudHMgPSB0aGlzLnNlZ21lbnRzLmZpbHRlcihzZWcgPT4gKHNlZy5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSA9PT0gKGNoYW5nZVBhcmFtVHlwZXNbMF0gPT09IENvbXBvbmVudFBhcmFtVHlwZS5QbGF0Zm9ybVRoaWNrbmVzcykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoZVNlZ21lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgY2hhbmdlUGFyYW1UeXBlIG9mIGNoYW5nZVBhcmFtVHlwZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFpclBhcmFtW2NoYW5nZVBhcmFtVHlwZV0gPSB0aGVTZWdtZW50LnBhcmFtW2NoYW5nZVBhcmFtVHlwZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyUGFyYW1DaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlBhcmFtQ2hhbmdlZEJ5RHJhdywgY29tcG9uZW50UGFyYW06IE9iamVjdC5hc3NpZ24oe30sIHRoZVNlZ21lbnQucGFyYW0pLCBzdGFpclBhcmFtOiBzdGFpclBhcmFtQ2hhbmdlZCA/IHRoaXMuc3RhaXJQYXJhbSA6IHVuZGVmaW5lZCB9LCAnKicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWJvcnRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlU2VnbWVudC5wYXJhbSA9IG9sZFBhcmFtO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlBhcmFtQ2hhbmdlZEJ5RHJhdywgY29tcG9uZW50UGFyYW06IE9iamVjdC5hc3NpZ24oe30sIHRoZVNlZ21lbnQucGFyYW0pIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbi5hZGQoW3BhcmVudEluc3RhbmNlXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB0cnlDb21taXQoKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mO1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgbWVzaGVzID0gZ2VuZXJhdGVNZXNoZXModGhpcy5zZWdtZW50cyk7XG4gICAgICAgICAgICBpZiAobWVzaGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHN0YXJ0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3SW5zdGFuY2VzID0gW107XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhaXJzQ2hpbGQgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcGxhdGZvcm1DaGlsZCA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZFNlZ21lbnRzID0gW107XG4gICAgICAgICAgICAgICAgbGV0IG9wZXJhdGlvblN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgc2VnbWVudCBvZiB0aGlzLnNlZ21lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghc2VnbWVudC5tZXNoKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIGlmICghb3BlcmF0aW9uU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWJvcnRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdJbnN0YW5jZSA9IGJ1aWxkQ29tcG9uZW50SW5zdGFuY2Uoc2VnbWVudCwgdGhpcy5zZWdtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICEhbmV3SW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdJbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3SW5zdGFuY2VzLnB1c2gobmV3SW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlZ21lbnQucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXRmb3JtQ2hpbGQuc2V0KHNlZ21lbnQucGFyYW0uaW5kZXgsIHsgaW5zdGFuY2U6IG5ld0luc3RhbmNlLCBkZWZpbml0aW9uS2V5OiAoKF9hID0gbmV3SW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5nZXRLZXkoKSkgfHwgJycsIGluc3RhbmNlS2V5OiBuZXdJbnN0YW5jZS5nZXRLZXkoKSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyc0NoaWxkLnNldChzZWdtZW50LnBhcmFtLmluZGV4LCB7IGluc3RhbmNlOiBuZXdJbnN0YW5jZSwgZGVmaW5pdGlvbktleTogKChfYiA9IG5ld0luc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuZ2V0S2V5KCkpIHx8ICcnLCBpbnN0YW5jZUtleTogbmV3SW5zdGFuY2UuZ2V0S2V5KCkgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50LnBhcmFtLnBsYXRmb3JtTGVuZ3RoTG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQucGFyYW0uc3RlcFByb3BvcnRpb25hbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50LnBhcmFtLndpZHRoUHJvcG9ydGlvbmFsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQucGFyYW0ubW9kZWxFZGl0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkU2VnbWVudHMucHVzaChzZWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgaGFuZHJhaWxJbnN0YW5jZURhdGE7XG4gICAgICAgICAgICAgICAgaWYgKChfYyA9IHRoaXMuaGFuZHJhaWxDb2xsZWN0aW9uKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuaGFuZHJhaWxzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBoYW5kcmFpbEluc3RhbmNlc0RhdGFSZXMgPSB5aWVsZCBidWlsZEhhbmRyYWlsSW5zdGFuY2UodGhpcy5zdGFpclBhcmFtLCAoX2QgPSB0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbikgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLmhhbmRyYWlscyk7XG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGhhbmRyYWlsSW5zdGFuY2VzRGF0YVJlcyAhPT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaGFuZHJhaWxJbnN0YW5jZXNEYXRhUmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdJbnN0YW5jZXMucHVzaChoYW5kcmFpbEluc3RhbmNlc0RhdGFSZXMuaGFuZHJhaWxJbnN0YW5jZS5pbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbEluc3RhbmNlRGF0YSA9IGhhbmRyYWlsSW5zdGFuY2VzRGF0YVJlcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobmV3SW5zdGFuY2VzLmxlbmd0aCAmJiBvcGVyYXRpb25TdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudEluc3RhbmNlID0gKF9lID0gZGVzaWduLm1ha2VHcm91cChbXSwgbmV3SW5zdGFuY2VzLCBbXSkpID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS5hZGRlZEluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAhIXBhcmVudEluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnREZWYgPSBwYXJlbnRJbnN0YW5jZSA9PT0gbnVsbCB8fCBwYXJlbnRJbnN0YW5jZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGFyZW50SW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnRJbnN0YW5jZSAmJiBwYXJlbnREZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIHBhcmVudERlZi5zZXRDdXN0b21Qcm9wZXJ0eShTdGFpck1vZGVsS2V5LCBNb2RlbFZhbHVlKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFpclBhcmFtU3RyaW5nID0gc3RyaW5naWZ5U3RhaXJQYXJhbSh0aGlzLnN0YWlyUGFyYW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgcGFyZW50RGVmLnNldEN1c3RvbVByb3BlcnR5KFN0YWlyUGFyYW1LZXksIHN0YWlyUGFyYW1TdHJpbmcpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YWlyUGFyYW0uc3RhaXJNYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YWlyTWF0ZXJpYWxTdHJpbmcgPSBzdHJpbmdpZnlNYXRlcmlhbCh0aGlzLnN0YWlyUGFyYW0uc3RhaXJNYXRlcmlhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgcGFyZW50RGVmLnNldEN1c3RvbVByb3BlcnR5KFN0YWlyTWF0ZXJpYWxLZXksIHN0YWlyTWF0ZXJpYWxTdHJpbmcpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YWlyUGFyYW0ucGxhdGZvcm1NYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBsYXRmb3JtTWF0ZXJpYWxTdHJpbmcgPSBzdHJpbmdpZnlNYXRlcmlhbCh0aGlzLnN0YWlyUGFyYW0ucGxhdGZvcm1NYXRlcmlhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgcGFyZW50RGVmLnNldEN1c3RvbVByb3BlcnR5KFBsYXRmb3JtTWF0ZXJpYWxLZXksIHBsYXRmb3JtTWF0ZXJpYWxTdHJpbmcpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YWlyUGFyYW0uaGFuZHJhaWwuc3VwcG9ydCAmJiB0aGlzLnN0YWlyUGFyYW0uaGFuZHJhaWwucmFpbC5tYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJhaWxNYXRlcmlhbFN0cmluZyA9IHN0cmluZ2lmeU1hdGVyaWFsKHRoaXMuc3RhaXJQYXJhbS5oYW5kcmFpbC5yYWlsLm1hdGVyaWFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBwYXJlbnREZWYuc2V0Q3VzdG9tUHJvcGVydHkoUmFpbE1hdGVyaWFsS2V5LCByYWlsTWF0ZXJpYWxTdHJpbmcpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YWlyUGFyYW0uaGFuZHJhaWwuc3VwcG9ydCAmJiB0aGlzLnN0YWlyUGFyYW0uaGFuZHJhaWwuY29sdW1uLm1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29sdW1uTWF0ZXJpYWxTdHJpbmcgPSBzdHJpbmdpZnlNYXRlcmlhbCh0aGlzLnN0YWlyUGFyYW0uaGFuZHJhaWwuY29sdW1uLm1hdGVyaWFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBwYXJlbnREZWYuc2V0Q3VzdG9tUHJvcGVydHkoQ29sdW1uTWF0ZXJpYWxLZXksIGNvbHVtbk1hdGVyaWFsU3RyaW5nKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1pdE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IHsgaW5zdGFuY2U6IHBhcmVudEluc3RhbmNlLCBkZWZpbml0aW9uS2V5OiAoKF9mID0gcGFyZW50SW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCkpID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZi5nZXRLZXkoKSkgfHwgJycsIGluc3RhbmNlS2V5OiBwYXJlbnRJbnN0YW5jZS5nZXRLZXkoKSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpcnM6IHN0YWlyc0NoaWxkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF0Zm9ybXM6IHBsYXRmb3JtQ2hpbGQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsOiBoYW5kcmFpbEluc3RhbmNlRGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VnbWVudHMgPSB2YWxpZFNlZ21lbnRzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBDb21wb25lbnQodmFsaWRTZWdtZW50c1swXSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5EcmF3U3RhaXJNb2RlbFNldHRsZWQsIGNvbXBvbmVudFBhcmFtczogdGhpcy5zZWdtZW50cy5tYXAoc2VnID0+IChPYmplY3QuYXNzaWduKHt9LCBzZWcucGFyYW0pKSksIHN0YWlyUGFyYW06IHRoaXMuc3RhaXJQYXJhbSwgaXNEcmF3aW5nOiBmYWxzZSB9LCAnKicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhYm9ydE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0RWRpdE1vZGVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lZGl0TW9kZWw7XG4gICAgfVxuICAgIHNldE1vZGVsKGdyb3VwSW5zdGFuY2UpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgIGlmICh0aGlzLmVkaXRNb2RlbCAmJiBpc1BhcnRPZkVkaXRNb2RlbCh0aGlzLmVkaXRNb2RlbCwgZ3JvdXBJbnN0YW5jZSkpIHtcbiAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuUHJvcGVydGllc1Zpc2libGUsIHByb3BlcnRpZXNWaXNpYmxlOiB0cnVlIH0sICcqJyk7XG4gICAgICAgICAgICBpZiAodGhpcy5zZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzQ29tcG9uZW50KHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVkaXRNb2RlbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3QgZ3JvdXBEZWYgPSBncm91cEluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpO1xuICAgICAgICBpZiAoZ3JvdXBJbnN0YW5jZSAmJiBncm91cERlZikge1xuICAgICAgICAgICAgY29uc3Qgc3RhaXJNb2RlbFByb3BlcnR5ID0gZ3JvdXBEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoU3RhaXJNb2RlbEtleSk7XG4gICAgICAgICAgICBjb25zdCBzdGFpclBhcmFtUHJvcGVydHkgPSBncm91cERlZi5nZXRDdXN0b21Qcm9wZXJ0eShTdGFpclBhcmFtS2V5KTtcbiAgICAgICAgICAgIGNvbnN0IHN0YWlyUGFyYW0gPSBwYXJzZVN0YWlyUGFyYW0oc3RhaXJQYXJhbVByb3BlcnR5KTtcbiAgICAgICAgICAgIGNvbnN0IHN0YWlyTWF0ZXJpYWxQcm9wZXJ0eSA9IGdyb3VwRGVmLmdldEN1c3RvbVByb3BlcnR5KFN0YWlyTWF0ZXJpYWxLZXkpO1xuICAgICAgICAgICAgY29uc3Qgc3RhaXJNYXRlcmlhbCA9IHBhcnNlTWF0ZXJpYWwoc3RhaXJNYXRlcmlhbFByb3BlcnR5KTtcbiAgICAgICAgICAgIGlmIChzdGFpck1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgc3RhaXJQYXJhbS5zdGFpck1hdGVyaWFsID0gc3RhaXJNYXRlcmlhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHBsYXRmb3JtTWF0ZXJpYWxQcm9wZXJ0eSA9IGdyb3VwRGVmLmdldEN1c3RvbVByb3BlcnR5KFBsYXRmb3JtTWF0ZXJpYWxLZXkpO1xuICAgICAgICAgICAgY29uc3QgcGxhdGZvcm1NYXRlcmlhbCA9IHBhcnNlTWF0ZXJpYWwocGxhdGZvcm1NYXRlcmlhbFByb3BlcnR5KTtcbiAgICAgICAgICAgIGlmIChwbGF0Zm9ybU1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgc3RhaXJQYXJhbS5wbGF0Zm9ybU1hdGVyaWFsID0gcGxhdGZvcm1NYXRlcmlhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHJhaWxNYXRlcmlhbFByb3BlcnR5ID0gZ3JvdXBEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoUmFpbE1hdGVyaWFsS2V5KTtcbiAgICAgICAgICAgIGNvbnN0IHJhaWxNYXRlcmlhbCA9IHBhcnNlTWF0ZXJpYWwocmFpbE1hdGVyaWFsUHJvcGVydHkpO1xuICAgICAgICAgICAgaWYgKHJhaWxNYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgIHN0YWlyUGFyYW0uaGFuZHJhaWwucmFpbC5tYXRlcmlhbCA9IHJhaWxNYXRlcmlhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbk1hdGVyaWFsUHJvcGVydHkgPSBncm91cERlZi5nZXRDdXN0b21Qcm9wZXJ0eShDb2x1bW5NYXRlcmlhbEtleSk7XG4gICAgICAgICAgICBjb25zdCBjb2x1bW5NYXRlcmlhbCA9IHBhcnNlTWF0ZXJpYWwoY29sdW1uTWF0ZXJpYWxQcm9wZXJ0eSk7XG4gICAgICAgICAgICBpZiAoY29sdW1uTWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICBzdGFpclBhcmFtLmhhbmRyYWlsLmNvbHVtbi5tYXRlcmlhbCA9IGNvbHVtbk1hdGVyaWFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0YWlyTW9kZWxQcm9wZXJ0eSA9PT0gTW9kZWxWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlZ21lbnRzID0gW107XG4gICAgICAgICAgICAgICAgY29uc3Qgc3ViR3JvdXBJbnN0YW5jZXMgPSBncm91cERlZi5nZXRTdWJHcm91cEluc3RhbmNlcygpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVkaXRNb2RlbCA9IHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50OiB7IGluc3RhbmNlOiBncm91cEluc3RhbmNlLCBkZWZpbml0aW9uS2V5OiAoKF9hID0gZ3JvdXBJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmdldEtleSgpKSB8fCAnJywgaW5zdGFuY2VLZXk6IGdyb3VwSW5zdGFuY2UuZ2V0S2V5KCkgfSxcbiAgICAgICAgICAgICAgICAgICAgc3RhaXJzOiBuZXcgTWFwKCksXG4gICAgICAgICAgICAgICAgICAgIHBsYXRmb3JtczogbmV3IE1hcCgpLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBzdWJJbnN0YW5jZSBvZiBzdWJHcm91cEluc3RhbmNlcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdWJEZWYgPSBzdWJJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1YkRlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFuZHJhaWxQcm9wZXJ0eSA9IHN1YkRlZi5nZXRDdXN0b21Qcm9wZXJ0eShIYW5kcmFpbE1vZGVsS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoYW5kcmFpbFByb3BlcnR5ID09PSBNb2RlbFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFuZHJhaWxJbnN0YW5jZXNEYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbEluc3RhbmNlOiB7IGluc3RhbmNlOiBzdWJJbnN0YW5jZSwgaW5zdGFuY2VLZXk6IHN1Ykluc3RhbmNlLmdldEtleSgpLCBkZWZpbml0aW9uS2V5OiBzdWJEZWYuZ2V0S2V5KCkgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFpbEluc3RhbmNlczogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbkluc3RhbmNlczogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYW5kcmFpbFN1Ykdyb3VwSW5zdGFuY2VzID0gc3ViRGVmLmdldFN1Ykdyb3VwSW5zdGFuY2VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBoYW5kcmFpbFN1Ykluc3RhbmNlIG9mIGhhbmRyYWlsU3ViR3JvdXBJbnN0YW5jZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFuZHJhaWxTdWJEZWYgPSBoYW5kcmFpbFN1Ykluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGFuZHJhaWxTdWJEZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJhaWxQcm9wZXJ0eSA9IGhhbmRyYWlsU3ViRGVmLmdldEN1c3RvbVByb3BlcnR5KFJhaWxNb2RlbEtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2x1bW5Qcm9wZXJ0eSA9IGhhbmRyYWlsU3ViRGVmLmdldEN1c3RvbVByb3BlcnR5KENvbHVtbk1vZGVsS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyYWlsUHJvcGVydHkgPT09IE1vZGVsVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbEluc3RhbmNlc0RhdGEucmFpbEluc3RhbmNlcy5wdXNoKHsgaW5zdGFuY2U6IGhhbmRyYWlsU3ViSW5zdGFuY2UsIGluc3RhbmNlS2V5OiBoYW5kcmFpbFN1Ykluc3RhbmNlLmdldEtleSgpLCBkZWZpbml0aW9uS2V5OiBoYW5kcmFpbFN1YkRlZi5nZXRLZXkoKSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNvbHVtblByb3BlcnR5ID09PSBNb2RlbFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWxJbnN0YW5jZXNEYXRhLmNvbHVtbkluc3RhbmNlcy5wdXNoKHsgaW5zdGFuY2U6IGhhbmRyYWlsU3ViSW5zdGFuY2UsIGluc3RhbmNlS2V5OiBoYW5kcmFpbFN1Ykluc3RhbmNlLmdldEtleSgpLCBkZWZpbml0aW9uS2V5OiBoYW5kcmFpbFN1YkRlZi5nZXRLZXkoKSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0TW9kZWwuaGFuZHJhaWwgPSBoYW5kcmFpbEluc3RhbmNlc0RhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBjb21wb25lbnRJbmRleFZhbHVlID0gcGFyc2VJbnQoc3ViRGVmLmdldEN1c3RvbVByb3BlcnR5KENvbXBvbmVudEluZGV4S2V5KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGlzRmluaXRlKGNvbXBvbmVudEluZGV4VmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyYW0gPSBwYXJzZUNvbXBvbmVudFBhcmFtKHN1YkRlZi5nZXRDdXN0b21Qcm9wZXJ0eShDb21wb25lbnRQYXJhbUtleSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0RW5kID0gcGFyc2VTdGFydEVuZChzdWJEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoU3RhcnRFbmRLZXkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiYXNlTGluZVNlZzNkID0gcGFyc2VMaW5lU2VnM2Qoc3ViRGVmLmdldEN1c3RvbVByb3BlcnR5KEJhc2VMaW5lU2VnM2RLZXkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiYXNlQ29tcG9uZW50ID0gcGFyc2VCYXNlQ29tcG9uZW50KHN1YkRlZi5nZXRDdXN0b21Qcm9wZXJ0eShCYXNlQ29tcG9uZW50S2V5KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2lyY2xlVGFuZ2VudCA9IHBhcnNlVmVjdG9yM2Qoc3ViRGVmLmdldEN1c3RvbVByb3BlcnR5KENpcmNsZVRhbmdlbnRLZXkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW0gJiYgc3RhcnRFbmQgJiYgYmFzZUxpbmVTZWczZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWdtZW50ID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBnZXROZXdTZWdtZW50KHBhcmFtLnR5cGUpKSwgeyBzdGFydDogc3RhcnRFbmQuc3RhcnQsIGVuZDogc3RhcnRFbmQuZW5kLCBzdGFydEhlaWdodDogc3RhcnRFbmQuc3RhcnRIZWlnaHQsIGVuZEhlaWdodDogc3RhcnRFbmQuZW5kSGVpZ2h0LCBiYXNlQ29tcG9uZW50OiB7IGNvbXBvbmVudEluZGV4OiBiYXNlQ29tcG9uZW50ID09PSBudWxsIHx8IGJhc2VDb21wb25lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJhc2VDb21wb25lbnQuY29tcG9uZW50SW5kZXgsIGxpbmUzZEluZGV4OiBiYXNlQ29tcG9uZW50ID09PSBudWxsIHx8IGJhc2VDb21wb25lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJhc2VDb21wb25lbnQubGluZTNkSW5kZXgsIGxpbmUzZDogYmFzZUxpbmVTZWczZCB9LCBjaXJjbGVUYW5nZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW0sIHN0YXJ0TG9ja2VkOiB0cnVlLCBlbmRMb2NrZWQ6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnRzLnB1c2goc2VnbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0TW9kZWwucGxhdGZvcm1zLnNldChwYXJhbS5pbmRleCwgeyBpbnN0YW5jZTogc3ViSW5zdGFuY2UsIGRlZmluaXRpb25LZXk6ICgoX2IgPSBzdWJJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmdldEtleSgpKSB8fCAnJywgaW5zdGFuY2VLZXk6IHN1Ykluc3RhbmNlLmdldEtleSgpIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdE1vZGVsLnN0YWlycy5zZXQocGFyYW0uaW5kZXgsIHsgaW5zdGFuY2U6IHN1Ykluc3RhbmNlLCBkZWZpbml0aW9uS2V5OiAoKF9jID0gc3ViSW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCkpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5nZXRLZXkoKSkgfHwgJycsIGluc3RhbmNlS2V5OiBzdWJJbnN0YW5jZS5nZXRLZXkoKSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2VnbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnRzLnNvcnQoKGEsIGIpID0+IGEucGFyYW0uaW5kZXggLSBiLnBhcmFtLmluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudHMuZm9yRWFjaChzID0+IGdlbmVyYXRlU2hhcGUocywgZmFsc2UpKTtcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRTZWdtZW50UmVsYXRpb25zKHNlZ21lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWdtZW50cyA9IHNlZ21lbnRzO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlbCA9IGVkaXRNb2RlbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFpclBhcmFtID0gc3RhaXJQYXJhbTtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5kcmF3VGVtcENvbXBvbmVudChzZWdtZW50c1swXSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNDb21wb25lbnQoc2VnbWVudHNbMF0ucGFyYW0uaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLkRyYXdTdGFpck1vZGVsU2V0dGxlZCwgY29tcG9uZW50UGFyYW1zOiB0aGlzLnNlZ21lbnRzLm1hcChzZWcgPT4gKE9iamVjdC5hc3NpZ24oe30sIHNlZy5wYXJhbSkpKSwgc3RhaXJQYXJhbTogdGhpcy5zdGFpclBhcmFtLCBpc0RyYXdpbmc6IGZhbHNlIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNsZWFyRWRpdE1vZGVsKCkge1xuICAgICAgICB0aGlzLmVkaXRNb2RlbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zZWdtZW50cyA9IFtdO1xuICAgICAgICB0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggPSBEZWZhdWx0Rm9jdXNlZENvbXBvbmVudEluZGV4O1xuICAgICAgICBhcHBWaWV3LmNsZWFyVGVtcG9yYXJ5U2hhcGVzKCk7XG4gICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuRHJhd1N0YWlyTW9kZWxTZXR0bGVkLCBpc0RyYXdpbmc6IGZhbHNlIH0sICcqJyk7XG4gICAgfVxuICAgIGNsZWFyKCkge1xuICAgICAgICBhcHBWaWV3LmNsZWFyVGVtcG9yYXJ5U2hhcGVzKCk7XG4gICAgICAgIC8vIHRoaXMuY29tcG9uZW50UGFyYW0gPSB7IC4uLkRlZmF1bHRDb21wb25lbnRQYXJhbSB9O1xuICAgICAgICAvLyB0aGlzLnNlZ21lbnRzID0gW107XG4gICAgICAgIHRoaXMuZHJhd2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCA9IERlZmF1bHRGb2N1c2VkQ29tcG9uZW50SW5kZXg7XG4gICAgICAgIHRoaXMuc3RhaXJQYXJhbSA9IE9iamVjdC5hc3NpZ24oe30sIERlZmF1bHRTdGFpclBhcmFtKTtcbiAgICAgICAgLy8gdGhpcy5lZGl0TW9kZWwgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIG9uUkJ1dHRvblVwKGV2ZW50LCBpbmZlcmVuY2VSZXN1bHQpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VnbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBsYXN0U2VnbWVudCA9IHRoaXMuc2VnbWVudHNbdGhpcy5zZWdtZW50cy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGlmIChsYXN0U2VnbWVudC5zdGFydExvY2tlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgcGFyYW0sIGNpcmN1bGFyU2lkZSwgbW9sZFNoYXBlOiB7IHZlcnRpY2VzIH0gfSA9IGxhc3RTZWdtZW50O1xuICAgICAgICAgICAgICAgIGlmICghbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBsYXN0U2VnbWVudC5iYXNlTGluZVNlZzNkID0geyBzdGFydDogdmVydGljZXNbMF0sIGVuZDogdmVydGljZXNbMV0gfTtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudCA9IHsgbGluZTNkOiB7IHN0YXJ0OiB2ZXJ0aWNlc1sxXSwgZW5kOiB2ZXJ0aWNlc1swXSB9IH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLkNpcmN1bGFyU3RhaXIgJiYgY2lyY3VsYXJTaWRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0udHlwZSA9IENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpcjtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuY2lyY2xlVGFuZ2VudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy50cnlDb21taXQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZGVBY3RpdmF0ZURyYXdTdGFpcnNUb29sKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25MQnV0dG9uRGJDbGljayhldmVudCwgaW5mZXJlbmNlUmVzdWx0KSB7XG4gICAgICAgIDtcbiAgICB9XG4gICAgYWxsb3dVc2luZ0luZmVyZW5jZSgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIG9uS2V5RG93bihldmVudCkge1xuICAgICAgICA7XG4gICAgfVxuICAgIG9uS2V5VXAoZXZlbnQpIHtcbiAgICAgICAgO1xuICAgIH1cbiAgICBnZW5lcmF0ZVNlZ21lbnRTaGFwZShzZWdtZW50LCB0ZW1wID0gdHJ1ZSkge1xuICAgICAgICBnZW5lcmF0ZVNoYXBlKHNlZ21lbnQsIHRlbXApO1xuICAgICAgICAvLyB0aGlzLmdlbmVyYXRlSGFuZHJhaWxTaGFwZSgpO1xuICAgIH1cbiAgICBnZW5lcmF0ZUhhbmRyYWlsU2hhcGUoc3RhaXJQYXJhbSA9IHRoaXMuc3RhaXJQYXJhbSkge1xuICAgICAgICBpZiAodGhpcy5zZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGhhbmRyYWlscyA9IGdlbmVyYXRlSGFuZHJhaWxTaGFwZShzdGFpclBhcmFtLCB0aGlzLnNlZ21lbnRzKTtcbiAgICAgICAgICAgIHRoaXMuaGFuZHJhaWxDb2xsZWN0aW9uID0geyBoYW5kcmFpbHM6IGhhbmRyYWlscyB8fCBbXSB9O1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGNvbnN0IGRyYXdTdGFpcnNUb29sID0gbmV3IERyYXdTdGFpcnNUb29sKCk7XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCB7IEFuZ2xlVG9sZXJhbmNlLCBEaXJlY3Rpb25aLCBkdW1teVBvaW50M2QsIExlbmd0aFRvbGVyYW5jZSwgU3RlcENvdW50TGltaXQgfSBmcm9tIFwiLi9jb25zdHNcIjtcbmltcG9ydCB7IEJhc2VDb21wb25lbnRLZXksIEJhc2VMaW5lU2VnM2RLZXksIENpcmNsZVRhbmdlbnRLZXksIENvbHVtblR5cGUsIENvbXBvbmVudFR5cGUsIERlZmF1bHRTdGFpclBhcmFtLCBIYW5kcmFpbE1vZGVsS2V5LCBSYWlsVHlwZSwgTW9kZWxWYWx1ZSwgU3RhcnRFbmRLZXksIFByZXNldE1hdGVyaWFscywgQ29sdW1uTW9kZWxLZXksIFJhaWxNb2RlbEtleSwgQ29tcG9uZW50UGFyYW1LZXksIENpcmN1bGFyU2lkZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBnZXRDb29yZGluYXRlLCBzdHJpbmdpZnlCYXNlQ29tcG9uZW50LCBzdHJpbmdpZnlDb21wb25lbnRQYXJhbSwgc3RyaW5naWZ5UG9pbnQzZCwgc3RyaW5naWZ5U3RhcnRFbmQgfSBmcm9tIFwiLi91dGlsc1wiO1xuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlTWVzaGVzKHNlZ21lbnRzKSB7XG4gICAgY29uc3QgbWVzaGVzID0gW107XG4gICAgZm9yIChjb25zdCBzZWdtZW50IG9mIHNlZ21lbnRzKSB7XG4gICAgICAgIGNvbnN0IHsgcGFyYW06IHsgdHlwZSB9LCBjaXJjbGVUYW5nZW50IH0gPSBzZWdtZW50O1xuICAgICAgICBpZiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyKSB7XG4gICAgICAgICAgICBnZW5lcmF0ZVN0cmFpZ2h0U3RhaXJNZXNoKHNlZ21lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpcikge1xuICAgICAgICAgICAgaWYgKGNpcmNsZVRhbmdlbnQpIHtcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZUNpcmN1bGFyU3RhaXJNZXNoKHNlZ21lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVTdHJhaWdodFN0YWlyTWVzaChzZWdtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGdlbmVyYXRlUGxhdGZvcm1NZXNoKHNlZ21lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWdtZW50Lm1lc2gpIHtcbiAgICAgICAgICAgIG1lc2hlcy5wdXNoKHNlZ21lbnQubWVzaCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1lc2hlcztcbn1cbmZ1bmN0aW9uIGdlbmVyYXRlQ2lyY3VsYXJTdGFpck1lc2goc2VnbWVudCkge1xuICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mLCBfZywgX2gsIF9qLCBfaywgX2w7XG4gICAgY29uc3QgeyBzdGFydExvY2tlZCwgY2lyY2xlVGFuZ2VudCwgc3RhaXJTaGFwZTogeyB2ZXJ0aWNlcywgc3RlcENvdW50IH0sIGNvcm5lclNoYXBlOiB7IHZlcnRpY2VzOiBjb3JuZXJWZXJ0aWNlcyB9LCBwYXJhbTogeyB1cHdhcmQgfSB9ID0gc2VnbWVudDtcbiAgICBpZiAoc3RlcENvdW50IDwgMSB8fCAhc3RhcnRMb2NrZWQgfHwgIWNpcmNsZVRhbmdlbnQpXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgY29uc3Qgc3RhaXJNZXNoID0ge1xuICAgICAgICB2ZXJ0aWNlczogdmVydGljZXMubWFwKHZlcnRleCA9PiBbdmVydGV4LngsIHZlcnRleC55LCB2ZXJ0ZXguel0pLFxuICAgICAgICB0cmlhbmdsZUluZGljZXM6IFtdLFxuICAgICAgICBzb2Z0RWRnZXM6IFtdLFxuICAgIH07XG4gICAgLy8g5pyA5bqV6YOo5Y+w6Zi25ZCO5LiL5L2N572uXG4gICAgLy8gY29uc3QgbGVmdEluZGV4ID0gdmVydGljZXMubGVuZ3RoIC0gKCghdXB3YXJkICYmIHN0ZXBDb3VudCA+IDEpID8gNCA6IDIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RlcENvdW50OyBpKyspIHtcbiAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAvLyBzdGFpciBmYWNlc1xuICAgICAgICBbaSAqIDQsIGkgKiA0ICsgMSwgaSAqIDQgKyAyXSwgW2kgKiA0ICsgMSwgaSAqIDQgKyAzLCBpICogNCArIDJdLCBbaSAqIDQgKyAyLCBpICogNCArIDMsIGkgKiA0ICsgNF0sIFtpICogNCArIDMsIGkgKiA0ICsgNSwgaSAqIDQgKyA0XSwgXG4gICAgICAgIC8vIHNpZGUgZmFjZXMgKHVwKVxuICAgICAgICBbaSAqIDQsIGkgKiA0ICsgMiwgKGkgKyAxKSAqIDRdLCBbaSAqIDQgKyAxLCAoaSArIDEpICogNCArIDEsIGkgKiA0ICsgM10pO1xuICAgICAgICAoX2EgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucHVzaChbaSAqIDQgKyAxLCBpICogNCArIDJdLCBbaSAqIDQgKyAzLCBpICogNCArIDRdLCBbaSAqIDQsIChpICsgMSkgKiA0XSwgWyhpICsgMSkgKiA0ICsgMSwgaSAqIDQgKyAxXSk7XG4gICAgICAgIGlmICh1cHdhcmQpIHtcbiAgICAgICAgICAgIGNvbnN0IGJvdHRvbUZyb250TGVmdEluZGV4ID0gNCAqIHN0ZXBDb3VudCArIDIgKyAyICogKHN0ZXBDb3VudCAtIGkgLSAxKTtcbiAgICAgICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgICAgIC8vIHNpZGUgZmFjZXMgKG1pZGRsZSlcbiAgICAgICAgICAgIFtpICogNCwgKGkgKyAxKSAqIDQsIGJvdHRvbUZyb250TGVmdEluZGV4XSwgWyhpICsgMSkgKiA0ICsgMSwgaSAqIDQgKyAxLCBib3R0b21Gcm9udExlZnRJbmRleCArIDFdKTtcbiAgICAgICAgICAgIGlmIChpIDwgc3RlcENvdW50IC0gMSkge1xuICAgICAgICAgICAgICAgIChfYiA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5wdXNoKFsoaSArIDEpICogNCwgYm90dG9tRnJvbnRMZWZ0SW5kZXhdLCBbKGkgKyAxKSAqIDQgKyAxLCBib3R0b21Gcm9udExlZnRJbmRleCArIDFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgICAgICAgICAvLyBzaWRlIGZhY2VzIChib3R0b20pXG4gICAgICAgICAgICAgICAgW2kgKiA0LCBib3R0b21Gcm9udExlZnRJbmRleCwgYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAyXSwgW2JvdHRvbUZyb250TGVmdEluZGV4ICsgMSwgaSAqIDQgKyAxLCBib3R0b21Gcm9udExlZnRJbmRleCArIDNdLCBcbiAgICAgICAgICAgICAgICAvLyBib3R0b20gZmFjZXNcbiAgICAgICAgICAgICAgICBbYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAyLCBib3R0b21Gcm9udExlZnRJbmRleCwgYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAzXSwgW2JvdHRvbUZyb250TGVmdEluZGV4ICsgMywgYm90dG9tRnJvbnRMZWZ0SW5kZXgsIGJvdHRvbUZyb250TGVmdEluZGV4ICsgMV0pO1xuICAgICAgICAgICAgICAgIChfYyA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5wdXNoKFtpICogNCwgYm90dG9tRnJvbnRMZWZ0SW5kZXhdLCBbaSAqIDQgKyAxLCBib3R0b21Gcm9udExlZnRJbmRleCArIDFdLCBbYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAzLCBib3R0b21Gcm9udExlZnRJbmRleF0pO1xuICAgICAgICAgICAgICAgIGlmIChpIDwgc3RlcENvdW50IC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAoX2QgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QucHVzaChbYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAxLCBib3R0b21Gcm9udExlZnRJbmRleF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgICAgICAgICAvLyBib3R0b20gZmFjZXNcbiAgICAgICAgICAgICAgICBbaSAqIDQsIGJvdHRvbUZyb250TGVmdEluZGV4LCBpICogNCArIDFdLCBbaSAqIDQgKyAxLCBib3R0b21Gcm9udExlZnRJbmRleCwgYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAxXSk7XG4gICAgICAgICAgICAgICAgKF9lID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lLnB1c2goW2kgKiA0ICsgMSwgYm90dG9tRnJvbnRMZWZ0SW5kZXhdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGJvdHRvbUJhY2tMZWZ0SW5kZXggPSA0ICogc3RlcENvdW50ICsgMiArIDIgKiAoc3RlcENvdW50IC0gaSAtIDEpO1xuICAgICAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAgICAgLy8gc2lkZSBmYWNlcyAobWlkZGxlKVxuICAgICAgICAgICAgW2kgKiA0LCAoaSArIDEpICogNCwgYm90dG9tQmFja0xlZnRJbmRleF0sIFsoaSArIDEpICogNCArIDEsIGkgKiA0ICsgMSwgYm90dG9tQmFja0xlZnRJbmRleCArIDFdLCBcbiAgICAgICAgICAgIC8vIGJvdHRvbSBmYWNlc1xuICAgICAgICAgICAgW2JvdHRvbUJhY2tMZWZ0SW5kZXgsIGJvdHRvbUJhY2tMZWZ0SW5kZXggLSAyLCBib3R0b21CYWNrTGVmdEluZGV4ICsgMV0sIFtib3R0b21CYWNrTGVmdEluZGV4ICsgMSwgYm90dG9tQmFja0xlZnRJbmRleCAtIDIsIGJvdHRvbUJhY2tMZWZ0SW5kZXggLSAxXSk7XG4gICAgICAgICAgICAoX2YgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2YucHVzaChbYm90dG9tQmFja0xlZnRJbmRleCArIDEsIGJvdHRvbUJhY2tMZWZ0SW5kZXggLSAyXSk7XG4gICAgICAgICAgICBpZiAoaSA8IHN0ZXBDb3VudCAtIDEpIHtcbiAgICAgICAgICAgICAgICAoX2cgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2cucHVzaChbKGkgKyAxKSAqIDQsIGJvdHRvbUJhY2tMZWZ0SW5kZXhdLCBbKGkgKyAxKSAqIDQgKyAxLCBib3R0b21CYWNrTGVmdEluZGV4ICsgMV0pO1xuICAgICAgICAgICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgICAgICAgICAvLyBzaWRlIGZhY2VzIChib3R0b20pXG4gICAgICAgICAgICAgICAgWyhpICsgMSkgKiA0LCBib3R0b21CYWNrTGVmdEluZGV4IC0gMiwgYm90dG9tQmFja0xlZnRJbmRleF0sIFtib3R0b21CYWNrTGVmdEluZGV4IC0gMSwgKGkgKyAxKSAqIDQgKyAxLCBib3R0b21CYWNrTGVmdEluZGV4ICsgMV0pO1xuICAgICAgICAgICAgICAgIChfaCA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9oID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfaC5wdXNoKFsoaSArIDEpICogNCwgYm90dG9tQmFja0xlZnRJbmRleCAtIDJdLCBbKGkgKyAxKSAqIDQgKyAxLCBib3R0b21CYWNrTGVmdEluZGV4IC0gMV0sIFtib3R0b21CYWNrTGVmdEluZGV4ICsgMSwgYm90dG9tQmFja0xlZnRJbmRleCAtIDJdKTtcbiAgICAgICAgICAgICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgKF9qID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2ogPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9qLnB1c2goW2JvdHRvbUJhY2tMZWZ0SW5kZXggKyAxLCBib3R0b21CYWNrTGVmdEluZGV4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlmICh1cHdhcmQpIHtcbiAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAvLyBib3R0b20gZmFjZXNcbiAgICAgICAgLy8gW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIDEsIDBdLFxuICAgICAgICAvLyBbdmVydGljZXMubGVuZ3RoIC0gMSwgMCwgdmVydGljZXMubGVuZ3RoIC0gMl0sXG4gICAgICAgIC8vIOWJjeS+p+mdolxuICAgICAgICBbc3RlcENvdW50ICogNCwgc3RlcENvdW50ICogNCArIDEsIHN0ZXBDb3VudCAqIDQgKyAyXSwgW3N0ZXBDb3VudCAqIDQgKyAxLCBzdGVwQ291bnQgKiA0ICsgMywgc3RlcENvdW50ICogNCArIDJdKTtcbiAgICAgICAgKF9rID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2sgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9rLnB1c2goXG4gICAgICAgIC8vIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCAwXSxcbiAgICAgICAgW3N0ZXBDb3VudCAqIDQgKyAxLCBzdGVwQ291bnQgKiA0ICsgMl0pO1xuICAgICAgICAvLyBpZiAoc3RlcENvdW50ID4gMSkge1xuICAgICAgICAvLyAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAvLyAgICAgICAgIC8vIHNpZGUgYm90dG9tIGZhY2VzXG4gICAgICAgIC8vICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIHZlcnRpY2VzLmxlbmd0aCAtIDEwLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSxcbiAgICAgICAgLy8gICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gMSwgdmVydGljZXMubGVuZ3RoIC0gMywgdmVydGljZXMubGVuZ3RoIC0gOV0sXG4gICAgICAgIC8vICAgICAgICAgLy8gYm90dG9tIGZhY2VzXG4gICAgICAgIC8vICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLFxuICAgICAgICAvLyAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSA1LCB2ZXJ0aWNlcy5sZW5ndGggLSA0LCB2ZXJ0aWNlcy5sZW5ndGggLSA2XSxcbiAgICAgICAgLy8gICAgICk7XG4gICAgICAgIC8vICAgICBzdGFpck1lc2guc29mdEVkZ2VzPy5wdXNoKFxuICAgICAgICAvLyAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSA1LCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSxcbiAgICAgICAgLy8gICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gMiwgdmVydGljZXMubGVuZ3RoIC0gMTBdLFxuICAgICAgICAvLyAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSAxMCwgdmVydGljZXMubGVuZ3RoIC0gNF0sXG4gICAgICAgIC8vICAgICApO1xuICAgICAgICAvLyB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXG4gICAgICAgIC8vIOWQjuS+p+mdolxuICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gMSwgMSwgMF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCAwLCB2ZXJ0aWNlcy5sZW5ndGggLSAyXSk7XG4gICAgICAgIChfbCA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9sID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfbC5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCAwXSk7XG4gICAgICAgIC8vIGlmIChzdGVwQ291bnQgPiAxKSB7XG4gICAgICAgIC8vICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXG4gICAgICAgIC8vICAgICAgICAgLy8gc2lkZSBib3R0b20gZmFjZXNcbiAgICAgICAgLy8gICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gMiwgMCwgdmVydGljZXMubGVuZ3RoIC0gNF0sXG4gICAgICAgIC8vICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIHZlcnRpY2VzLmxlbmd0aCAtIDMsIDFdLFxuICAgICAgICAvLyAgICAgICAgIC8vIGJvdHRvbSBmYWNlc1xuICAgICAgICAvLyAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSA1LCB2ZXJ0aWNlcy5sZW5ndGggLSA0LCB2ZXJ0aWNlcy5sZW5ndGggLSAzXSxcbiAgICAgICAgLy8gICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gNSwgdmVydGljZXMubGVuZ3RoIC0gNiwgdmVydGljZXMubGVuZ3RoIC0gNF0sXG4gICAgICAgIC8vICAgICApO1xuICAgICAgICAvLyAgICAgc3RhaXJNZXNoLnNvZnRFZGdlcz8ucHVzaChcbiAgICAgICAgLy8gICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gNSwgdmVydGljZXMubGVuZ3RoIC0gNF0sXG4gICAgICAgIC8vICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDMsIDFdLFxuICAgICAgICAvLyAgICAgICAgIFswLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSxcbiAgICAgICAgLy8gICAgICk7XG4gICAgICAgIC8vIH1cbiAgICB9XG4gICAgaWYgKGNvcm5lclZlcnRpY2VzLmxlbmd0aCA9PT0gNikge1xuICAgICAgICBnZW5lcmF0ZVBvbHlnb25NZXNoKGNvcm5lclZlcnRpY2VzLCBzdGFpck1lc2gpO1xuICAgIH1cbiAgICBzZWdtZW50Lm1lc2ggPSBzdGFpck1lc2g7XG59XG5mdW5jdGlvbiBnZW5lcmF0ZVN0cmFpZ2h0U3RhaXJNZXNoKHNlZ21lbnQpIHtcbiAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oLCBfaiwgX2s7XG4gICAgY29uc3QgeyBzdGFydExvY2tlZCwgc3RhaXJTaGFwZTogeyB2ZXJ0aWNlcywgc3RlcENvdW50IH0sIGNvcm5lclNoYXBlOiB7IHZlcnRpY2VzOiBjb3JuZXJWZXJ0aWNlcyB9LCBwYXJhbTogeyB1cHdhcmQgfSB9ID0gc2VnbWVudDtcbiAgICBpZiAoc3RlcENvdW50IDwgMSB8fCAhc3RhcnRMb2NrZWQpXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgY29uc3Qgc3RhaXJNZXNoID0ge1xuICAgICAgICB2ZXJ0aWNlczogdmVydGljZXMubWFwKHZlcnRleCA9PiBbdmVydGV4LngsIHZlcnRleC55LCB2ZXJ0ZXguel0pLFxuICAgICAgICB0cmlhbmdsZUluZGljZXM6IFtdLFxuICAgICAgICBzb2Z0RWRnZXM6IFtdLFxuICAgIH07XG4gICAgY29uc3QgbGVmdEluZGV4ID0gdmVydGljZXMubGVuZ3RoIC0gKCghdXB3YXJkICYmIHN0ZXBDb3VudCA+IDEpID8gNCA6IDIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RlcENvdW50OyBpKyspIHtcbiAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAvLyBzdGFpciBmYWNlc1xuICAgICAgICBbaSAqIDQsIGkgKiA0ICsgMSwgaSAqIDQgKyAyXSwgW2kgKiA0ICsgMSwgaSAqIDQgKyAzLCBpICogNCArIDJdLCBbaSAqIDQgKyAyLCBpICogNCArIDMsIGkgKiA0ICsgNF0sIFtpICogNCArIDMsIGkgKiA0ICsgNSwgaSAqIDQgKyA0XSwgXG4gICAgICAgIC8vIHNpZGUgZmFjZXNcbiAgICAgICAgW2kgKiA0LCBpICogNCArIDIsIChpICsgMSkgKiA0XSwgW2kgKiA0ICsgMSwgKGkgKyAxKSAqIDQgKyAxLCBpICogNCArIDNdKTtcbiAgICAgICAgKF9hID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnB1c2goW2kgKiA0ICsgMSwgaSAqIDQgKyAyXSwgW2kgKiA0ICsgMywgaSAqIDQgKyA0XSwgW2kgKiA0LCAoaSArIDEpICogNF0sIFsoaSArIDEpICogNCArIDEsIGkgKiA0ICsgMV0pO1xuICAgICAgICBpZiAoaSA9PT0gc3RlcENvdW50IC0gMSAmJiB1cHdhcmQgJiYgc3RlcENvdW50ID4gMSkge1xuICAgICAgICAgICAgY29uc3QgYmJMZWZ0SW5kZXggPSB2ZXJ0aWNlcy5sZW5ndGggLSA0O1xuICAgICAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAgICAgLy8gdGFpbCBzaWRlIGZhY2VzXG4gICAgICAgICAgICBbYmJMZWZ0SW5kZXgsIGkgKiA0LCAoaSArIDEpICogNF0sIFtiYkxlZnRJbmRleCArIDEsIChpICsgMSkgKiA0ICsgMSwgaSAqIDQgKyAxXSk7XG4gICAgICAgICAgICAoX2IgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IucHVzaChbYmJMZWZ0SW5kZXgsIGkgKiA0XSwgXG4gICAgICAgICAgICAvLyBbaSAqIDQsIChpICsgMSkgKiA0XSxcbiAgICAgICAgICAgIFtiYkxlZnRJbmRleCArIDEsIGkgKiA0ICsgMV0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAgICAgLy8gc2lkZSBmYWNlc1xuICAgICAgICAgICAgW2xlZnRJbmRleCwgaSAqIDQsIChpICsgMSkgKiA0XSwgW2xlZnRJbmRleCArIDEsIChpICsgMSkgKiA0ICsgMSwgaSAqIDQgKyAxXSk7XG4gICAgICAgICAgICAvLyBzdGFpck1lc2guc29mdEVkZ2VzPy5wdXNoKFxuICAgICAgICAgICAgLy8gICAgIFtpICogNCwgKGkgKyAxKSAqIDRdLFxuICAgICAgICAgICAgLy8gICAgIFsoaSArIDEpICogNCArIDEsIGkgKiA0ICsgMV0sXG4gICAgICAgICAgICAvLyApO1xuICAgICAgICAgICAgaWYgKHVwd2FyZCkge1xuICAgICAgICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAoX2MgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MucHVzaChbbGVmdEluZGV4LCBpICogNF0sIFtsZWZ0SW5kZXggKyAxLCBpICogNCArIDFdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN0ZXBDb3VudCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgKF9kID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLnB1c2goW2xlZnRJbmRleCwgKGkgKyAxKSAqIDRdLCBbbGVmdEluZGV4ICsgMSwgKGkgKyAxKSAqIDQgKyAxXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0ZXBDb3VudCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgKF9lID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lLnB1c2goW2xlZnRJbmRleCwgaSAqIDRdLCBbbGVmdEluZGV4ICsgMSwgaSAqIDQgKyAxXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpIDwgc3RlcENvdW50IC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAoX2YgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2YucHVzaChbbGVmdEluZGV4LCAoaSArIDEpICogNF0sIFtsZWZ0SW5kZXggKyAxLCAoaSArIDEpICogNCArIDFdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHVwd2FyZCkge1xuICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXG4gICAgICAgIC8vIGJvdHRvbSBmYWNlc1xuICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gMSwgMSwgMF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCAwLCB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDEsIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbdmVydGljZXMubGVuZ3RoIC0gMywgdmVydGljZXMubGVuZ3RoIC0gMiwgdmVydGljZXMubGVuZ3RoIC0gNF0pO1xuICAgICAgICAoX2cgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2cucHVzaChbdmVydGljZXMubGVuZ3RoIC0gMSwgMF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAzLCB2ZXJ0aWNlcy5sZW5ndGggLSAyXSk7XG4gICAgICAgIGlmIChzdGVwQ291bnQgPiAxKSB7XG4gICAgICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXG4gICAgICAgICAgICAvLyBzaWRlIGJvdHRvbSBmYWNlc1xuICAgICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIHZlcnRpY2VzLmxlbmd0aCAtIDEwLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIHZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDldLCBcbiAgICAgICAgICAgIC8vIGJvdHRvbSBmYWNlc1xuICAgICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLCBbdmVydGljZXMubGVuZ3RoIC0gNSwgdmVydGljZXMubGVuZ3RoIC0gNCwgdmVydGljZXMubGVuZ3RoIC0gNl0pO1xuICAgICAgICAgICAgKF9oID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9oLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLCBbdmVydGljZXMubGVuZ3RoIC0gMiwgdmVydGljZXMubGVuZ3RoIC0gMTBdLCBbdmVydGljZXMubGVuZ3RoIC0gMTAsIHZlcnRpY2VzLmxlbmd0aCAtIDRdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAvLyBib3R0b20gZmFjZXNcbiAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIDAsIDFdLCBbdmVydGljZXMubGVuZ3RoIC0gMSwgdmVydGljZXMubGVuZ3RoIC0gMiwgMF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAzLCB2ZXJ0aWNlcy5sZW5ndGggLSAyLCB2ZXJ0aWNlcy5sZW5ndGggLSAxXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDQsIHZlcnRpY2VzLmxlbmd0aCAtIDJdKTtcbiAgICAgICAgKF9qID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2ogPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9qLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIDBdLCBbdmVydGljZXMubGVuZ3RoIC0gMywgdmVydGljZXMubGVuZ3RoIC0gMl0pO1xuICAgICAgICBpZiAoc3RlcENvdW50ID4gMSkge1xuICAgICAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAgICAgLy8gc2lkZSBib3R0b20gZmFjZXNcbiAgICAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSAyLCAwLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIHZlcnRpY2VzLmxlbmd0aCAtIDMsIDFdLCBcbiAgICAgICAgICAgIC8vIGJvdHRvbSBmYWNlc1xuICAgICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDQsIHZlcnRpY2VzLmxlbmd0aCAtIDNdLCBbdmVydGljZXMubGVuZ3RoIC0gNSwgdmVydGljZXMubGVuZ3RoIC0gNiwgdmVydGljZXMubGVuZ3RoIC0gNF0pO1xuICAgICAgICAgICAgKF9rID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2sgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9rLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLCBbdmVydGljZXMubGVuZ3RoIC0gMywgMV0sIFswLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNvcm5lclZlcnRpY2VzLmxlbmd0aCA9PT0gNikge1xuICAgICAgICBnZW5lcmF0ZVBvbHlnb25NZXNoKGNvcm5lclZlcnRpY2VzLCBzdGFpck1lc2gpO1xuICAgIH1cbiAgICBzZWdtZW50Lm1lc2ggPSBzdGFpck1lc2g7XG59XG5mdW5jdGlvbiBnZW5lcmF0ZVBsYXRmb3JtTWVzaChzZWdtZW50KSB7XG4gICAgY29uc3QgeyBzdGFpclNoYXBlOiB7IHZlcnRpY2VzIH0gfSA9IHNlZ21lbnQ7XG4gICAgLy8gaWYgKGVuZExvY2tlZCkge1xuICAgIGNvbnN0IHZlcnRleExlbmd0aCA9IHZlcnRpY2VzLmxlbmd0aCAvIDI7XG4gICAgaWYgKHZlcnRleExlbmd0aCA9PT0gNCB8fCB2ZXJ0ZXhMZW5ndGggPT09IDUpIHtcbiAgICAgICAgY29uc3QgcGxhdGZvcm1NZXNoID0ge1xuICAgICAgICAgICAgdmVydGljZXM6IFtdLFxuICAgICAgICAgICAgdHJpYW5nbGVJbmRpY2VzOiBbXSxcbiAgICAgICAgICAgIHNvZnRFZGdlczogW10sXG4gICAgICAgIH07XG4gICAgICAgIGdlbmVyYXRlUG9seWdvbk1lc2godmVydGljZXMsIHBsYXRmb3JtTWVzaCk7XG4gICAgICAgIHNlZ21lbnQubWVzaCA9IHBsYXRmb3JtTWVzaDtcbiAgICB9XG4gICAgLy8gfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG5mdW5jdGlvbiBnZW5lcmF0ZVBvbHlnb25NZXNoKHZlcnRpY2VzLCBtZXNoKSB7XG4gICAgdmFyIF9hLCBfYjtcbiAgICBjb25zdCB2ZXJ0ZXhMZW5ndGggPSBtZXNoLnZlcnRpY2VzLmxlbmd0aDtcbiAgICBtZXNoLnZlcnRpY2VzLnB1c2goLi4udmVydGljZXMubWFwKHZlcnRleCA9PiBbdmVydGV4LngsIHZlcnRleC55LCB2ZXJ0ZXguel0pKTtcbiAgICBjb25zdCBzZWdDb3VudCA9IHZlcnRpY2VzLmxlbmd0aCAvIDI7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWdDb3VudDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHJpZ2h0ID0gaSA9PT0gc2VnQ291bnQgLSAxID8gMCA6IGkgKyAxO1xuICAgICAgICBjb25zdCBib3R0b21SaWdodCA9IGkgPT09IHNlZ0NvdW50IC0gMSA/IHNlZ0NvdW50IDogaSArIHNlZ0NvdW50ICsgMTtcbiAgICAgICAgbWVzaC50cmlhbmdsZUluZGljZXMucHVzaChbaSArIHZlcnRleExlbmd0aCwgaSArIHNlZ0NvdW50ICsgdmVydGV4TGVuZ3RoLCBib3R0b21SaWdodCArIHZlcnRleExlbmd0aF0sIFtpICsgdmVydGV4TGVuZ3RoLCBib3R0b21SaWdodCArIHZlcnRleExlbmd0aCwgcmlnaHQgKyB2ZXJ0ZXhMZW5ndGhdKTtcbiAgICAgICAgKF9hID0gbWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wdXNoKFtpICsgdmVydGV4TGVuZ3RoLCBib3R0b21SaWdodCArIHZlcnRleExlbmd0aF0pO1xuICAgICAgICBpZiAoaSA+IDAgJiYgaSA8IHNlZ0NvdW50IC0gMSkge1xuICAgICAgICAgICAgbWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgICAgIC8vIHRvcCBhbmQgYm90dG9tXG4gICAgICAgICAgICBbaSArIHZlcnRleExlbmd0aCwgcmlnaHQgKyB2ZXJ0ZXhMZW5ndGgsIDAgKyB2ZXJ0ZXhMZW5ndGhdLCBbYm90dG9tUmlnaHQgKyB2ZXJ0ZXhMZW5ndGgsIGkgKyBzZWdDb3VudCArIHZlcnRleExlbmd0aCwgc2VnQ291bnQgKyB2ZXJ0ZXhMZW5ndGhdKTtcbiAgICAgICAgICAgIGlmIChpID4gMSkge1xuICAgICAgICAgICAgICAgIChfYiA9IG1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IucHVzaChbaSwgMCArIHZlcnRleExlbmd0aF0sIFtpICsgc2VnQ291bnQgKyB2ZXJ0ZXhMZW5ndGgsIHNlZ0NvdW50ICsgdmVydGV4TGVuZ3RoXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gbG9hZERlZmF1bHRNYXRlcmlhbHMoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3QgZGVzaWduID0gYXBwLmdldEFjdGl2ZURlc2lnbigpO1xuICAgICAgICBjb25zdCByZXMxID0geWllbGQgZGVzaWduLmxvYWRNYXRlcmlhbChQcmVzZXRNYXRlcmlhbHMuU3RhaXIubWF0ZXJpYWxJZCk7XG4gICAgICAgIGlmICghcmVzMS5pc1N1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXMyID0geWllbGQgZGVzaWduLmxvYWRNYXRlcmlhbChQcmVzZXRNYXRlcmlhbHMuUGxhdGZvcm0ubWF0ZXJpYWxJZCk7XG4gICAgICAgIGlmICghcmVzMi5pc1N1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXMzID0geWllbGQgZGVzaWduLmxvYWRNYXRlcmlhbChQcmVzZXRNYXRlcmlhbHMuSGFuZHJhaWwucmFpbC5tYXRlcmlhbElkKTtcbiAgICAgICAgaWYgKCFyZXMzLmlzU3VjY2Vzcykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlczQgPSB5aWVsZCBkZXNpZ24ubG9hZE1hdGVyaWFsKFByZXNldE1hdGVyaWFscy5IYW5kcmFpbC5jb2x1bW4ubWF0ZXJpYWxJZCk7XG4gICAgICAgIGlmICghcmVzNC5pc1N1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBidWlsZENvbXBvbmVudEluc3RhbmNlKHNlZ21lbnQsIHNlZ21lbnRzLCBwYXJlbnRUcmFuc2Zvcm0pIHtcbiAgICB2YXIgX2EsIF9iO1xuICAgIGNvbnN0IHsgc3RhcnQsIGVuZCwgc3RhcnRIZWlnaHQsIGVuZEhlaWdodCwgYmFzZUNvbXBvbmVudCwgY2lyY2xlVGFuZ2VudCwgcGFyYW0sIG1lc2ggfSA9IHNlZ21lbnQ7XG4gICAgY29uc3QgZGVzaWduID0gYXBwLmdldEFjdGl2ZURlc2lnbigpO1xuICAgIGxldCBvcGVyYXRpb25TdWNjZXNzID0gdHJ1ZTtcbiAgICBpZiAobWVzaCA9PT0gbnVsbCB8fCBtZXNoID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtZXNoLnZlcnRpY2VzLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBuZXdTaGVsbCA9IChfYSA9IGRlc2lnbi5jcmVhdGVTaGVsbEZyb21NZXNoKG1lc2gpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubmV3U2hlbGw7XG4gICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICEhbmV3U2hlbGw7XG4gICAgICAgIGlmIChuZXdTaGVsbCkge1xuICAgICAgICAgICAgLy8gaWYgKHBhcmFtLnR5cGUgIT09IENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpcikge1xuICAgICAgICAgICAgLy8gICAgIGNvbnN0IHNvZnRFZGdlcyA9IG5ld1NoZWxsLmdldEVkZ2VzKCkuZmlsdGVyKGUgPT4gZS5pc1NvZnQoKSk7XG4gICAgICAgICAgICAvLyAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZGVzaWduLnJlbW92ZUVkZ2VzKHNvZnRFZGdlcykuaXNTdWNjZXNzO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgY29uc3QgbmV3SW5zdGFuY2UgPSAoX2IgPSBkZXNpZ24ubWFrZUdyb3VwKG5ld1NoZWxsLmdldEZhY2VzKCksIFtdLCBbXSkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5hZGRlZEluc3RhbmNlO1xuICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgISFuZXdJbnN0YW5jZTtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwRGVmID0gbmV3SW5zdGFuY2UgPT09IG51bGwgfHwgbmV3SW5zdGFuY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG5ld0luc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpO1xuICAgICAgICAgICAgaWYgKG5ld0luc3RhbmNlICYmIGdyb3VwRGVmKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudFRyYW5zZm9ybSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0cmFuc2Zvcm1SZXMgPSBkZXNpZ24udHJhbnNmb3JtR3JvdXBJbnN0YW5jZXMoW25ld0luc3RhbmNlXSwgcGFyZW50VHJhbnNmb3JtLmludmVyc2VkKCkpO1xuICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiB0cmFuc2Zvcm1SZXMuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBtYXRlcmlhbE9iamVjdCA9IHBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gPyBQcmVzZXRNYXRlcmlhbHMuUGxhdGZvcm0gOiBQcmVzZXRNYXRlcmlhbHMuU3RhaXI7XG4gICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZGVzaWduLmFzc2lnbk1hdGVyaWFsRm9yRW50aXRpZXMoW25ld0luc3RhbmNlXSwgbWF0ZXJpYWxPYmplY3QubWF0ZXJpYWxJZCwgbWF0ZXJpYWxPYmplY3QuYmdJZCk7XG4gICAgICAgICAgICAgICAgLy8gb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZ3JvdXBEZWYuc2V0Q3VzdG9tUHJvcGVydHkoQ29tcG9uZW50SW5kZXhLZXksIGAke25ld0luc3RhbmNlcy5sZW5ndGh9YCkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgIC8vIG5ld0luc3RhbmNlcy5wdXNoKG5ld0luc3RhbmNlKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJhbVN0cmluZyA9IHN0cmluZ2lmeUNvbXBvbmVudFBhcmFtKHBhcmFtKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydEVuZFN0cmluZyA9IHN0cmluZ2lmeVN0YXJ0RW5kKEdlb21MaWIuY3JlYXRlUG9pbnQzZChzdGFydC54LCBzdGFydC55LCBzdGFydEhlaWdodCksIEdlb21MaWIuY3JlYXRlUG9pbnQzZChlbmQueCwgZW5kLnksIGVuZEhlaWdodCkpO1xuICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGdyb3VwRGVmLnNldEN1c3RvbVByb3BlcnR5KENvbXBvbmVudFBhcmFtS2V5LCBwYXJhbVN0cmluZykuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGdyb3VwRGVmLnNldEN1c3RvbVByb3BlcnR5KFN0YXJ0RW5kS2V5LCBzdGFydEVuZFN0cmluZykuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgIC8vIGlmIChiYXNlTGluZVNlZzNkKSB7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIGlmIChiYXNlQ29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VMaW5lU3RyaW5nID0gc3RyaW5naWZ5U3RhcnRFbmQoYmFzZUNvbXBvbmVudC5saW5lM2Quc3RhcnQsIGJhc2VDb21wb25lbnQubGluZTNkLmVuZCk7XG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGdyb3VwRGVmLnNldEN1c3RvbVByb3BlcnR5KEJhc2VMaW5lU2VnM2RLZXksIGJhc2VMaW5lU3RyaW5nKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgoc2VnbWVudHMsIGJhc2VDb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYmFzZVNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VDb21wb25lbnRTdHJpbmcgPSBzdHJpbmdpZnlCYXNlQ29tcG9uZW50KGJhc2VTZWdtZW50LCBiYXNlQ29tcG9uZW50LmxpbmUzZEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGdyb3VwRGVmLnNldEN1c3RvbVByb3BlcnR5KEJhc2VDb21wb25lbnRLZXksIGJhc2VDb21wb25lbnRTdHJpbmcpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY2lyY2xlVGFuZ2VudCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YW5nZW50U3RyaW5nID0gc3RyaW5naWZ5UG9pbnQzZChjaXJjbGVUYW5nZW50KTtcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZ3JvdXBEZWYuc2V0Q3VzdG9tUHJvcGVydHkoQ2lyY2xlVGFuZ2VudEtleSwgdGFuZ2VudFN0cmluZykuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3SW5zdGFuY2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBidWlsZEhhbmRyYWlsSW5zdGFuY2Uoc3RhaXJQYXJhbSwgaGFuZHJhaWxzLCBwYXJlbnRUcmFuc2Zvcm0pIHtcbiAgICB2YXIgX2EsIF9iLCBfYztcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zdCB7IGhhbmRyYWlsOiB7IHN1cHBvcnQsIGhlaWdodCwgcmFpbDogeyB0eXBlOiByYWlsVHlwZSwgcGFyYW06IHJhaWxQYXJhbSB9LCBjb2x1bW46IHsgdHlwZTogY29sdW1uVHlwZSwgcGFyYW06IGNvbHVtblBhcmFtIH0gfSB9ID0gc3RhaXJQYXJhbTtcbiAgICAgICAgaWYgKCFzdXBwb3J0KSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY29sdW1uRmFjZTtcbiAgICAgICAgaWYgKGNvbHVtblR5cGUgPT09IENvbHVtblR5cGUuQ2lyY2xlKSB7XG4gICAgICAgICAgICBjb2x1bW5GYWNlID0gZHJhd0NpcmNsZShkdW1teVBvaW50M2QsIERpcmVjdGlvblosIGNvbHVtblBhcmFtLnJhZGl1cyB8fCBEZWZhdWx0U3RhaXJQYXJhbS5ob3Jpem9udGFsU3RlcCAvIDEwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb2x1bW5UeXBlID09PSBDb2x1bW5UeXBlLlJlY3QpIHtcbiAgICAgICAgICAgIGNvbHVtbkZhY2UgPSBkcmF3UmVjdChkdW1teVBvaW50M2QsIERpcmVjdGlvblosIGNvbHVtblBhcmFtLndpZHRoIHx8IERlZmF1bHRTdGFpclBhcmFtLmhvcml6b250YWxTdGVwIC8gMTAsIGNvbHVtblBhcmFtLmhlaWdodCB8fCBEZWZhdWx0U3RhaXJQYXJhbS5ob3Jpem9udGFsU3RlcCAvIDEwLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb2x1bW5Mb29wID0gY29sdW1uRmFjZSA9PT0gbnVsbCB8fCBjb2x1bW5GYWNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb2x1bW5GYWNlLmdldE91dGVyTG9vcCgpO1xuICAgICAgICBpZiAoIWNvbHVtbkZhY2UgfHwgIWNvbHVtbkxvb3ApIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYWN0aXZlRGVzaWduID0gYXBwLmdldEFjdGl2ZURlc2lnbigpO1xuICAgICAgICBjb25zdCBoYW5kcmFpbEluc3RhbmNlID0gKF9hID0gYWN0aXZlRGVzaWduLm1ha2VHcm91cChbY29sdW1uRmFjZV0sIFtdLCBbXSkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hZGRlZEluc3RhbmNlO1xuICAgICAgICBjb25zdCBoYW5kcmFpbERlZmluaXRpb24gPSBoYW5kcmFpbEluc3RhbmNlID09PSBudWxsIHx8IGhhbmRyYWlsSW5zdGFuY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGhhbmRyYWlsSW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCk7XG4gICAgICAgIGlmICghaGFuZHJhaWxJbnN0YW5jZSB8fCAhaGFuZHJhaWxEZWZpbml0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJlbnRUcmFuc2Zvcm0pIHtcbiAgICAgICAgICAgIGNvbnN0IHRyYW5zZm9ybVJlcyA9IGFjdGl2ZURlc2lnbi50cmFuc2Zvcm1Hcm91cEluc3RhbmNlcyhbaGFuZHJhaWxJbnN0YW5jZV0sIHBhcmVudFRyYW5zZm9ybS5pbnZlcnNlZCgpKTtcbiAgICAgICAgICAgIGlmICghdHJhbnNmb3JtUmVzLmlzU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYWN0aXZhdGVJbnN0YW5jZVJlcyA9IHlpZWxkIGFjdGl2ZURlc2lnbi5hY3RpdmF0ZUdyb3VwSW5zdGFuY2UoaGFuZHJhaWxJbnN0YW5jZSk7XG4gICAgICAgIGlmICghYWN0aXZhdGVJbnN0YW5jZVJlcy5pc1N1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29sdW1uQXV4aWxpYXJ5Qm91bmRlZEN1cnZlID0gKF9iID0gYWN0aXZlRGVzaWduLmFkZEF1eGlsaWFyeUJvdW5kZWRDdXJ2ZShHZW9tTGliLmNyZWF0ZUxpbmVTZWdtZW50M2QoR2VvbUxpYi5jcmVhdGVQb2ludDNkKDAsIDAsIGhlaWdodCksIGR1bW15UG9pbnQzZCkpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuYWRkZWRDdXJ2ZTtcbiAgICAgICAgaWYgKCFjb2x1bW5BdXhpbGlhcnlCb3VuZGVkQ3VydmUpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3dlZXBDb2x1bW5SZXMgPSBhY3RpdmVEZXNpZ24uc3dlZXBGb2xsb3dDdXJ2ZXMoY29sdW1uTG9vcCwgW2NvbHVtbkF1eGlsaWFyeUJvdW5kZWRDdXJ2ZV0pO1xuICAgICAgICBpZiAoIXN3ZWVwQ29sdW1uUmVzLmlzU3VjY2VzcyB8fCAhc3dlZXBDb2x1bW5SZXMuYWRkZWRTaGVsbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbHVtbk9yaWdpbkZhY2VzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgY29sdW1uT3JpZ2luU2hlbGwgb2Ygc3dlZXBDb2x1bW5SZXMuYWRkZWRTaGVsbHMpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbkZhY2VzID0gY29sdW1uT3JpZ2luU2hlbGwuZ2V0RmFjZXMoKTtcbiAgICAgICAgICAgIGNvbHVtbk9yaWdpbkZhY2VzLnB1c2goLi4uY29sdW1uRmFjZXMpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbHVtbk9yaWdpbkluc3RhbmNlID0gKF9jID0gYWN0aXZlRGVzaWduLm1ha2VHcm91cChjb2x1bW5PcmlnaW5GYWNlcywgW10sIFtdKSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmFkZGVkSW5zdGFuY2U7XG4gICAgICAgIGlmICghY29sdW1uT3JpZ2luSW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29sdW1uTWF0cml4ZXMgPSBbXTtcbiAgICAgICAgY29uc3QgcmFpbEluc3RhbmNlcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGhhbmRyYWlscy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgY29uc3QgeyByYWlsLCBjb2x1bW5zIH0gPSBoYW5kcmFpbHNbal07XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAvLyBmb3IgKGNvbnN0IHsgcmFpbCwgY29sdW1ucyB9IG9mIGhhbmRyYWlscykge1xuICAgICAgICAgICAgY29uc3QgcmFpbEJvdW5kZWRDdXJ2ZXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmFpbC5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCByYWlsUG9pbnQgPSByYWlsW2ldO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhaWxOZXh0UG9pbnQgPSByYWlsW2kgKyAxXTtcbiAgICAgICAgICAgICAgICByYWlsQm91bmRlZEN1cnZlcy5wdXNoKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgYWRkQXV4UmVzID0gYWN0aXZlRGVzaWduLmFkZEF1eGlsaWFyeUJvdW5kZWRDdXJ2ZShHZW9tTGliLmNyZWF0ZUxpbmVTZWdtZW50M2QocmFpbFBvaW50LCByYWlsTmV4dFBvaW50KSk7XG4gICAgICAgICAgICAgICAgaWYgKGFkZEF1eFJlcyA9PT0gbnVsbCB8fCBhZGRBdXhSZXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGFkZEF1eFJlcy5hZGRlZEN1cnZlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhaWxCb3VuZGVkQ3VydmVzLnB1c2goYWRkQXV4UmVzLmFkZGVkQ3VydmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmFpbEJvdW5kZWRDdXJ2ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmFpbFN0YXJ0Q3VydmUgPSByYWlsQm91bmRlZEN1cnZlc1swXS5nZXRCb3VuZGVkQ3VydmUoKTtcbiAgICAgICAgICAgICAgICBjb25zdCByYWlsU3RhcnRQb2ludCA9IChyYWlsU3RhcnRDdXJ2ZSA9PT0gbnVsbCB8fCByYWlsU3RhcnRDdXJ2ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmFpbFN0YXJ0Q3VydmUuc3RhcnRQb2ludCkgfHwgZHVtbXlQb2ludDNkO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhaWxTdGFydERpciA9IChyYWlsU3RhcnRDdXJ2ZSA9PT0gbnVsbCB8fCByYWlsU3RhcnRDdXJ2ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmFpbFN0YXJ0Q3VydmUuZW5kUG9pbnQuc3VidHJhY3RlZChyYWlsU3RhcnRQb2ludCkubm9ybWFsaXplZCgpLnJldmVyc2VkKCkpIHx8IERpcmVjdGlvblo7XG4gICAgICAgICAgICAgICAgbGV0IHJhaWxGYWNlO1xuICAgICAgICAgICAgICAgIGlmIChyYWlsVHlwZSA9PT0gUmFpbFR5cGUuQ2lyY2xlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhaWxGYWNlID0gZHJhd0NpcmNsZShyYWlsU3RhcnRQb2ludCwgcmFpbFN0YXJ0RGlyLCByYWlsUGFyYW0ucmFkaXVzIHx8IERlZmF1bHRTdGFpclBhcmFtLmhvcml6b250YWxTdGVwIC8gNSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJhaWxUeXBlID09PSBSYWlsVHlwZS5SZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJhaWxGYWNlID0gZHJhd1JlY3QocmFpbFN0YXJ0UG9pbnQsIHJhaWxTdGFydERpciwgcmFpbFBhcmFtLndpZHRoIHx8IERlZmF1bHRTdGFpclBhcmFtLmhvcml6b250YWxTdGVwIC8gNSwgcmFpbFBhcmFtLmhlaWdodCB8fCBEZWZhdWx0U3RhaXJQYXJhbS5ob3Jpem9udGFsU3RlcCAvIDUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHJhaWxMb29wID0gcmFpbEZhY2UgPT09IG51bGwgfHwgcmFpbEZhY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJhaWxGYWNlLmdldE91dGVyTG9vcCgpO1xuICAgICAgICAgICAgICAgIGlmICghcmFpbEZhY2UgfHwgIXJhaWxMb29wKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHN3ZWVwUmFpbFJlcyA9IGFjdGl2ZURlc2lnbi5zd2VlcEZvbGxvd0N1cnZlcyhyYWlsTG9vcCwgcmFpbEJvdW5kZWRDdXJ2ZXMpO1xuICAgICAgICAgICAgICAgIGlmICghc3dlZXBSYWlsUmVzLmlzU3VjY2VzcyB8fCAhc3dlZXBSYWlsUmVzLmFkZGVkU2hlbGxzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCByYWlsRmFjZXMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHJhaWxTaGVsbCBvZiBzd2VlcFJhaWxSZXMuYWRkZWRTaGVsbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmFpbFNoZWxsRmFjZXMgPSByYWlsU2hlbGwuZ2V0RmFjZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgcmFpbEZhY2VzLnB1c2goLi4ucmFpbFNoZWxsRmFjZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCByYWlsTWFrZUdyb3VwUmVzID0gYWN0aXZlRGVzaWduLm1ha2VHcm91cChyYWlsRmFjZXMsIFtdLCByYWlsQm91bmRlZEN1cnZlcyk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmFpbEdyb3VwRGVmID0gcmFpbE1ha2VHcm91cFJlcyA9PT0gbnVsbCB8fCByYWlsTWFrZUdyb3VwUmVzID09PSB2b2lkIDAgPyB2b2lkIDAgOiByYWlsTWFrZUdyb3VwUmVzLmFkZGVkSW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKCEocmFpbE1ha2VHcm91cFJlcyA9PT0gbnVsbCB8fCByYWlsTWFrZUdyb3VwUmVzID09PSB2b2lkIDAgPyB2b2lkIDAgOiByYWlsTWFrZUdyb3VwUmVzLmFkZGVkSW5zdGFuY2UpIHx8ICFyYWlsR3JvdXBEZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcmFpbFByb3BlcnR5UmVzID0gcmFpbEdyb3VwRGVmLnNldEN1c3RvbVByb3BlcnR5KFJhaWxNb2RlbEtleSwgTW9kZWxWYWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKCFyYWlsUHJvcGVydHlSZXMuaXNTdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJhaWxJbnN0YW5jZXMucHVzaChyYWlsTWFrZUdyb3VwUmVzLmFkZGVkSW5zdGFuY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCBjb2x1bW4gb2YgY29sdW1ucykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbHVtblNjYWxlTWF0ID0gR2VvbUxpYi5jcmVhdGVTY2FsZU1hdHJpeDQoMSwgMSwgKGNvbHVtblsxXS56IC0gY29sdW1uWzBdLnopIC8gaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2x1bW5UcmFuc2xhdGVNYXQgPSBHZW9tTGliLmNyZWF0ZVRyYW5zbGF0aW9uTWF0cml4NChjb2x1bW5bMF0ueCwgY29sdW1uWzBdLnksIGNvbHVtblswXS56KTtcbiAgICAgICAgICAgICAgICBjb2x1bW5NYXRyaXhlcy5wdXNoKGNvbHVtblRyYW5zbGF0ZU1hdC5tdWx0aXBsaWVkKGNvbHVtblNjYWxlTWF0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJhaWxJbnN0YW5jZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBhc3NpZ25SYWlsTWF0ZXJpYWxSZXMgPSBhY3RpdmVEZXNpZ24uYXNzaWduTWF0ZXJpYWxGb3JFbnRpdGllcyhyYWlsSW5zdGFuY2VzLCBQcmVzZXRNYXRlcmlhbHMuSGFuZHJhaWwucmFpbC5tYXRlcmlhbElkLCBQcmVzZXRNYXRlcmlhbHMuSGFuZHJhaWwucmFpbC5iZ0lkKTtcbiAgICAgICAgICAgIGlmICghYXNzaWduUmFpbE1hdGVyaWFsUmVzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb2x1bW5JbnN0YW5jZXMgPSBbXTtcbiAgICAgICAgaWYgKGNvbHVtbk1hdHJpeGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgY29sdW1uQ29weVJlcyA9IGFjdGl2ZURlc2lnbi5idWxrQ29weUdyb3VwSW5zdGFuY2VzKFtjb2x1bW5PcmlnaW5JbnN0YW5jZV0sIFtjb2x1bW5NYXRyaXhlc10pO1xuICAgICAgICAgICAgaWYgKCEoY29sdW1uQ29weVJlcyA9PT0gbnVsbCB8fCBjb2x1bW5Db3B5UmVzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb2x1bW5Db3B5UmVzLmFkZGVkSW5zdGFuY2VzLmxlbmd0aCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29sdW1uSW5zdGFuY2VzLnB1c2goLi4uY29sdW1uQ29weVJlcy5hZGRlZEluc3RhbmNlcyk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNvbHVtbkluc3RhbmNlIG9mIGNvbHVtbkNvcHlSZXMuYWRkZWRJbnN0YW5jZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2x1bW5Hcm91cERlZiA9IGNvbHVtbkluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmICghY29sdW1uR3JvdXBEZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgY29sdW1uUHJvcGVydHlSZXMgPSBjb2x1bW5Hcm91cERlZi5zZXRDdXN0b21Qcm9wZXJ0eShDb2x1bW5Nb2RlbEtleSwgTW9kZWxWYWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKCFjb2x1bW5Qcm9wZXJ0eVJlcy5pc1N1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBhc3NpZ25Db2x1bW5NYXRlcmlhbFJlcyA9IGFjdGl2ZURlc2lnbi5hc3NpZ25NYXRlcmlhbEZvckVudGl0aWVzKGNvbHVtbkNvcHlSZXMuYWRkZWRJbnN0YW5jZXMsIFByZXNldE1hdGVyaWFscy5IYW5kcmFpbC5jb2x1bW4ubWF0ZXJpYWxJZCwgUHJlc2V0TWF0ZXJpYWxzLkhhbmRyYWlsLmNvbHVtbi5iZ0lkKTtcbiAgICAgICAgICAgIGlmICghYXNzaWduQ29sdW1uTWF0ZXJpYWxSZXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlbW92ZU9yaWdpbkNvbHVtblJlcyA9IGFjdGl2ZURlc2lnbi5yZW1vdmVHcm91cEluc3RhbmNlKGNvbHVtbk9yaWdpbkluc3RhbmNlKTtcbiAgICAgICAgaWYgKCFyZW1vdmVPcmlnaW5Db2x1bW5SZXMuaXNTdWNjZXNzKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlbW92ZU9yaWdpbkNvbHVtbkF1eEN1cnZlUmVzID0gYWN0aXZlRGVzaWduLnJlbW92ZUF1eGlsaWFyeUN1cnZlKGNvbHVtbkF1eGlsaWFyeUJvdW5kZWRDdXJ2ZSk7XG4gICAgICAgIGlmICghcmVtb3ZlT3JpZ2luQ29sdW1uQXV4Q3VydmVSZXMuaXNTdWNjZXNzKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRvIHJlbW92ZSBhbGwgYXV4aWxpYXJ5Q3VydmVzXG4gICAgICAgIGNvbnN0IGRlYWN0aXZhdGVJbnN0YW5jZVJlcyA9IHlpZWxkIGFjdGl2ZURlc2lnbi5kZWFjdGl2YXRlR3JvdXBJbnN0YW5jZSgpO1xuICAgICAgICBpZiAoIWRlYWN0aXZhdGVJbnN0YW5jZVJlcy5pc1N1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2V0UHJvcGVydHlSZXMgPSBoYW5kcmFpbERlZmluaXRpb24uc2V0Q3VzdG9tUHJvcGVydHkoSGFuZHJhaWxNb2RlbEtleSwgTW9kZWxWYWx1ZSk7XG4gICAgICAgIGlmICghc2V0UHJvcGVydHlSZXMuaXNTdWNjZXNzKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBoYW5kcmFpbEluc3RhbmNlOiB7IGluc3RhbmNlOiBoYW5kcmFpbEluc3RhbmNlLCBpbnN0YW5jZUtleTogaGFuZHJhaWxJbnN0YW5jZS5nZXRLZXkoKSwgZGVmaW5pdGlvbktleTogaGFuZHJhaWxEZWZpbml0aW9uLmdldEtleSgpIH0sXG4gICAgICAgICAgICByYWlsSW5zdGFuY2VzOiByYWlsSW5zdGFuY2VzLm1hcChpbnN0YW5jZSA9PiB7IHZhciBfYTsgcmV0dXJuICh7IGluc3RhbmNlLCBpbnN0YW5jZUtleTogaW5zdGFuY2UuZ2V0S2V5KCksIGRlZmluaXRpb25LZXk6ICgoX2EgPSBpbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmdldEtleSgpKSB8fCAnJyB9KTsgfSksXG4gICAgICAgICAgICBjb2x1bW5JbnN0YW5jZXM6IGNvbHVtbkluc3RhbmNlcy5tYXAoaW5zdGFuY2UgPT4geyB2YXIgX2E7IHJldHVybiAoeyBpbnN0YW5jZSwgaW5zdGFuY2VLZXk6IGluc3RhbmNlLmdldEtleSgpLCBkZWZpbml0aW9uS2V5OiAoKF9hID0gaW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5nZXRLZXkoKSkgfHwgJycgfSk7IH0pLFxuICAgICAgICB9O1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdDaXJjbGUoY2VudGVyLCBub3JtYWwsIHJhZGl1cykge1xuICAgIGNvbnN0IGFjdGl2ZURlc2lnbiA9IGFwcC5nZXRBY3RpdmVEZXNpZ24oKTtcbiAgICBjb25zdCByZXMgPSBhY3RpdmVEZXNpZ24uYWRkQ2lyY2xlKEdlb21MaWIuY3JlYXRlQ2lyY2xlM2RCeUNlbnRlck5vcm1hbFJhZGl1cyhjZW50ZXIsIG5vcm1hbCwgcmFkaXVzKSk7XG4gICAgaWYgKHJlcyA9PT0gbnVsbCB8fCByZXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlcy5hZGRlZEVkZ2VzLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBzaGVsbCA9IHJlcy5hZGRlZEVkZ2VzWzBdLmdldFNoZWxsKCk7XG4gICAgICAgIGNvbnN0IGZhY2VzID0gc2hlbGwgPT09IG51bGwgfHwgc2hlbGwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNoZWxsLmdldEZhY2VzKCk7XG4gICAgICAgIGlmICgoZmFjZXMgPT09IG51bGwgfHwgZmFjZXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGZhY2VzLmxlbmd0aCkgPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWNlc1swXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdSZWN0KGNlbnRlciwgbm9ybWFsLCB3aWR0aCwgaGVpZ2h0LCB3aXRoQ29ybmVyID0gdHJ1ZSkge1xuICAgIGNvbnN0IHBvaW50MSA9IEdlb21MaWIuY3JlYXRlUG9pbnQzZCgtd2lkdGggLyAyLCAwLCAwKTtcbiAgICBjb25zdCBwb2ludDIgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2Qod2lkdGggLyAyLCAwLCAwKTtcbiAgICBsZXQgcG9pbnRzID0gW3BvaW50MSwgcG9pbnQyXTtcbiAgICBpZiAod2l0aENvcm5lcikge1xuICAgICAgICBjb25zdCBwNSA9IEdlb21MaWIuY3JlYXRlUG9pbnQzZCh3aWR0aCAvIDIsIGhlaWdodCAvIDMgKiAyLCAwKTtcbiAgICAgICAgY29uc3QgcDYgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2Qod2lkdGggLyA0LCBoZWlnaHQsIDApO1xuICAgICAgICBjb25zdCBtMSA9IEdlb21MaWIuY3JlYXRlUG9pbnQzZCgocDUueCArIHA2LngpIC8gMiwgKHA1LnkgKyBwNi55KSAvIDIsIDApO1xuICAgICAgICBjb25zdCBkaXIxID0gcDYuc3VidHJhY3RlZChwNSkubm9ybWFsaXplZCgpO1xuICAgICAgICBjb25zdCB0b0NlbnRlckRpcjEgPSBEaXJlY3Rpb25aLmNyb3NzKGRpcjEpO1xuICAgICAgICBjb25zdCBkMSA9IHA1LmRpc3RhbmNlVG8ocDYpO1xuICAgICAgICAvLyBjb25zdCByMSA9IGQxIC8gMiAvIE1hdGguc2luKE1hdGguUEkgLyA2KTtcbiAgICAgICAgY29uc3QgaDEgPSBkMSAvIDIgLyBNYXRoLnRhbihNYXRoLlBJIC8gNik7XG4gICAgICAgIGNvbnN0IGNlbnRlcjEgPSBtMS5hZGRlZCh0b0NlbnRlckRpcjEubXVsdGlwbGllZChoMSkpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDExOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHJvdGF0ZU1hdCA9IEdlb21MaWIuY3JlYXRlUm90YXRlTWF0cml4NChpICogTWF0aC5QSSAvIDMwLCBEaXJlY3Rpb25aLCBjZW50ZXIxKTtcbiAgICAgICAgICAgIGNvbnN0IGRpc2NyZXRlUG9pbnQgPSBwNS5hcHBsaWVkTWF0cml4NChyb3RhdGVNYXQpO1xuICAgICAgICAgICAgcG9pbnRzLnB1c2goZGlzY3JldGVQb2ludCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcDcgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QoLXdpZHRoIC8gNCwgaGVpZ2h0LCAwKTtcbiAgICAgICAgY29uc3QgcDggPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QoLXdpZHRoIC8gMiwgaGVpZ2h0IC8gMyAqIDIsIDApO1xuICAgICAgICBjb25zdCBtMiA9IEdlb21MaWIuY3JlYXRlUG9pbnQzZCgocDcueCArIHA4LngpIC8gMiwgKHA3LnkgKyBwOC55KSAvIDIsIDApO1xuICAgICAgICBjb25zdCBkaXIyID0gcDguc3VidHJhY3RlZChwNykubm9ybWFsaXplZCgpO1xuICAgICAgICBjb25zdCB0b0NlbnRlckRpcjIgPSBEaXJlY3Rpb25aLmNyb3NzKGRpcjIpO1xuICAgICAgICBjb25zdCBkMiA9IHA3LmRpc3RhbmNlVG8ocDgpO1xuICAgICAgICAvLyBjb25zdCByMiA9IGQyIC8gMiAvIE1hdGguc2luKE1hdGguUEkgLyA2KTtcbiAgICAgICAgY29uc3QgaDIgPSBkMiAvIDIgLyBNYXRoLnRhbihNYXRoLlBJIC8gNik7XG4gICAgICAgIGNvbnN0IGNlbnRlcjIgPSBtMi5hZGRlZCh0b0NlbnRlckRpcjIubXVsdGlwbGllZChoMikpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDExOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHJvdGF0ZU1hdCA9IEdlb21MaWIuY3JlYXRlUm90YXRlTWF0cml4NChpICogTWF0aC5QSSAvIDMwLCBEaXJlY3Rpb25aLCBjZW50ZXIyKTtcbiAgICAgICAgICAgIGNvbnN0IGRpc2NyZXRlUG9pbnQgPSBwNy5hcHBsaWVkTWF0cml4NChyb3RhdGVNYXQpO1xuICAgICAgICAgICAgcG9pbnRzLnB1c2goZGlzY3JldGVQb2ludCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IHBvaW50MyA9IEdlb21MaWIuY3JlYXRlUG9pbnQzZCh3aWR0aCAvIDIsIGhlaWdodCwgMCk7XG4gICAgICAgIGNvbnN0IHBvaW50NCA9IEdlb21MaWIuY3JlYXRlUG9pbnQzZCgtd2lkdGggLyAyLCBoZWlnaHQsIDApO1xuICAgICAgICBwb2ludHMucHVzaChwb2ludDMsIHBvaW50NCk7XG4gICAgfVxuICAgIGNvbnN0IGNvb3JkaW5hdGUgPSBnZXRDb29yZGluYXRlKG5vcm1hbCk7XG4gICAgY29uc3QgY29vcmRpbmF0ZU1hdCA9IEdlb21MaWIuY3JlYXRlQWxpZ25DQ1NNYXRyaXg0KGNvb3JkaW5hdGUuZHgsIGNvb3JkaW5hdGUuZHksIGNvb3JkaW5hdGUuZHosIGNlbnRlcik7XG4gICAgY29uc3QgdHJhbnNsYXRlTWF0MSA9IEdlb21MaWIuY3JlYXRlVHJhbnNsYXRpb25NYXRyaXg0KDAsIC1oZWlnaHQgLyAyLCAwKTtcbiAgICAvLyBjb25zdCB0cmFuc2xhdGVNYXQyID0gR2VvbUxpYi5jcmVhdGVUcmFuc2xhdGlvbk1hdHJpeDQoY2VudGVyLngsIGNlbnRlci55LCBjZW50ZXIueik7XG4gICAgY29uc3QgdHJhbnNmb3JtTWF0ID0gY29vcmRpbmF0ZU1hdC5tdWx0aXBsaWVkKHRyYW5zbGF0ZU1hdDEpO1xuICAgIHBvaW50cyA9IHBvaW50cy5tYXAocCA9PiBwLmFwcGxpZWRNYXRyaXg0KHRyYW5zZm9ybU1hdCkpO1xuICAgIGNvbnN0IGFjdGl2ZURlc2lnbiA9IGFwcC5nZXRBY3RpdmVEZXNpZ24oKTtcbiAgICBjb25zdCByZXMgPSBhY3RpdmVEZXNpZ24uYWRkRWRnZXMocG9pbnRzKTtcbiAgICBpZiAocmVzID09PSBudWxsIHx8IHJlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVzLmFkZGVkRWRnZXMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IGVkZ2VWZXJ0aWNlcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgZm9yIChjb25zdCBhZGRlZEVkZ2Ugb2YgcmVzLmFkZGVkRWRnZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhID0gYWRkZWRFZGdlLmdldFZlcnRleEEoKTtcbiAgICAgICAgICAgIGNvbnN0IHZiID0gYWRkZWRFZGdlLmdldFZlcnRleEIoKTtcbiAgICAgICAgICAgIGlmICh2YSkge1xuICAgICAgICAgICAgICAgIGVkZ2VWZXJ0aWNlcy5hZGQodmEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZiKSB7XG4gICAgICAgICAgICAgICAgZWRnZVZlcnRpY2VzLmFkZCh2Yik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2V0U29mdFJlc3VsdCA9IGFjdGl2ZURlc2lnbi5zZXRWZXJ0aWNlc1NvZnQoWy4uLmVkZ2VWZXJ0aWNlc10sIHRydWUpO1xuICAgICAgICBpZiAoc2V0U29mdFJlc3VsdC5pc1N1Y2Nlc3MpIHtcbiAgICAgICAgICAgIGNvbnN0IHNoZWxsID0gcmVzLmFkZGVkRWRnZXNbMF0uZ2V0U2hlbGwoKTtcbiAgICAgICAgICAgIGNvbnN0IGZhY2VzID0gc2hlbGwgPT09IG51bGwgfHwgc2hlbGwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNoZWxsLmdldEZhY2VzKCk7XG4gICAgICAgICAgICBpZiAoKGZhY2VzID09PSBudWxsIHx8IGZhY2VzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBmYWNlcy5sZW5ndGgpID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhY2VzWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0U2VnbWVudEJ5SW5kZXgoc2VnbWVudHMsIGluZGV4KSB7XG4gICAgaWYgKGluZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHNlZ21lbnRzLmZpbmQoc2VnbWVudCA9PiBzZWdtZW50LnBhcmFtLmluZGV4ID09PSBpbmRleCk7XG59XG5leHBvcnQgZnVuY3Rpb24gYnVpbGRTZWdtZW50UmVsYXRpb25zKHNlZ21lbnRzKSB7XG4gICAgZm9yIChjb25zdCBzZWdtZW50IG9mIHNlZ21lbnRzKSB7XG4gICAgICAgIGNvbnN0IGJhc2VDb21wb25lbnQgPSBzZWdtZW50LmJhc2VDb21wb25lbnQ7XG4gICAgICAgIGNvbnN0IGJhc2VTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgoc2VnbWVudHMsIGJhc2VDb21wb25lbnQgPT09IG51bGwgfHwgYmFzZUNvbXBvbmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmFzZUNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgIGlmIChiYXNlU2VnbWVudCAmJiAoYmFzZUNvbXBvbmVudCA9PT0gbnVsbCB8fCBiYXNlQ29tcG9uZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBiYXNlQ29tcG9uZW50LmxpbmUzZEluZGV4KSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBiYXNlU2VnbWVudC5uZXh0Q29tcG9uZW50c1tiYXNlQ29tcG9uZW50LmxpbmUzZEluZGV4XS5hZGQoc2VnbWVudC5wYXJhbS5pbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0TmV4dENvbXBvbmVudHMoc2VnbWVudCwgc2VnbWVudHMpIHtcbiAgICBjb25zdCB7IG5leHRDb21wb25lbnRzIH0gPSBzZWdtZW50O1xuICAgIGNvbnN0IG5leHRTZWdtZW50cyA9IFtdO1xuICAgIGZvciAoY29uc3QgbmV4dENvbXBvbmVudEluZGV4ZXMgb2YgbmV4dENvbXBvbmVudHMpIHtcbiAgICAgICAgZm9yIChjb25zdCBuZXh0Q29tcG9uZW50SW5kZXggb2YgbmV4dENvbXBvbmVudEluZGV4ZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHRTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgoc2VnbWVudHMsIG5leHRDb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICBpZiAobmV4dFNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICBuZXh0U2VnbWVudHMucHVzaChuZXh0U2VnbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5leHRTZWdtZW50cztcbn1cbmV4cG9ydCBmdW5jdGlvbiBjaGFuZ2VTdGFpclVwd2FyZChzdGFydFNlZ21lbnQsIHNlZ21lbnRzLCB1cHdhcmQsIGJ1bGtDaGFuZ2UsIG9ubHlTdGFydCA9IGZhbHNlKSB7XG4gICAgaWYgKHNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICBsZXQgY3VycmVudCA9IFt7IHNlZ21lbnQ6IHN0YXJ0U2VnbWVudCwgdmVydGljYWxEZWx0YTogc3RhcnRTZWdtZW50LnN0YXJ0SGVpZ2h0IH1dO1xuICAgICAgICBjb25zdCB1blZpc2l0ZWQgPSBuZXcgU2V0KHNlZ21lbnRzKTtcbiAgICAgICAgY29uc3QgY2hhbmdlZFNlZ21lbnRzID0gbmV3IFNldCgpO1xuICAgICAgICB3aGlsZSAoY3VycmVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBuZXh0ID0gW107XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHsgc2VnbWVudCwgdmVydGljYWxEZWx0YSB9IG9mIGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IHN0YXJ0SGVpZ2h0LCBlbmRIZWlnaHQgfSA9IHNlZ21lbnQ7XG4gICAgICAgICAgICAgICAgY29uc3QgdXB3YXJkRmxhZyA9IG9ubHlTdGFydCA/IHNlZ21lbnQucGFyYW0udXB3YXJkIDogdXB3YXJkO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVuZERlbHRhID0gc2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtID8gMCA6IE1hdGguYWJzKGVuZEhlaWdodCAtIHN0YXJ0SGVpZ2h0KSAqICh1cHdhcmRGbGFnID8gMSA6IC0xKTtcbiAgICAgICAgICAgICAgICBzZWdtZW50LnN0YXJ0SGVpZ2h0ID0gdmVydGljYWxEZWx0YTtcbiAgICAgICAgICAgICAgICBzZWdtZW50LmVuZEhlaWdodCA9IHNlZ21lbnQuc3RhcnRIZWlnaHQgKyBlbmREZWx0YTtcbiAgICAgICAgICAgICAgICBpZiAoIW9ubHlTdGFydCkge1xuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LnBhcmFtLnVwd2FyZCA9IHVwd2FyZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdW5WaXNpdGVkLmRlbGV0ZShzZWdtZW50KTtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXh0U2VnbWVudHMgPSBnZXROZXh0Q29tcG9uZW50cyhzZWdtZW50LCBzZWdtZW50cyk7XG4gICAgICAgICAgICAgICAgaWYgKG5leHRTZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dC5wdXNoKC4uLm5leHRTZWdtZW50cy5tYXAoc2VnID0+ICh7IHNlZ21lbnQ6IHNlZywgdmVydGljYWxEZWx0YTogc2VnbWVudC5lbmRIZWlnaHQgfSkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2hhbmdlZFNlZ21lbnRzLmFkZChzZWdtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJlbnQgPSBuZXh0O1xuICAgICAgICAgICAgaWYgKCFjdXJyZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGlmIChidWxrQ2hhbmdlICYmIHVuVmlzaXRlZC5zaXplKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoZVNlZ21lbnQgPSBbLi4udW5WaXNpdGVkLnZhbHVlcygpXVswXTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IFt7IHNlZ21lbnQ6IHRoZVNlZ21lbnQsIHZlcnRpY2FsRGVsdGE6IHRoZVNlZ21lbnQuc3RhcnRIZWlnaHQgfV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbLi4uY2hhbmdlZFNlZ21lbnRzXTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gY2hhbmdlU3RhaXJTdGVwKHN0YXJ0U2VnbWVudCwgc2VnbWVudHMsIG5ld0hvcml6b250YWxTdGVwLCBuZXdWZXJ0aWNhbFN0ZXAsIGJ1bGtDaGFuZ2UsIG9ubHlTdGFydCA9IGZhbHNlKSB7XG4gICAgaWYgKHNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICBsZXQgY3VycmVudCA9IFt7IHNlZ21lbnQ6IHN0YXJ0U2VnbWVudCwgdmVydGljYWxEZWx0YTogc3RhcnRTZWdtZW50LnN0YXJ0SGVpZ2h0IH1dO1xuICAgICAgICBjb25zdCB1blZpc2l0ZWQgPSBuZXcgU2V0KHNlZ21lbnRzKTtcbiAgICAgICAgY29uc3QgY2hhbmdlZFNlZ21lbnRzID0gbmV3IFNldCgpO1xuICAgICAgICB3aGlsZSAoY3VycmVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBuZXh0ID0gW107XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHsgc2VnbWVudCwgdmVydGljYWxEZWx0YSB9IG9mIGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IHN0YXJ0LCBlbmQsIGNpcmNsZVRhbmdlbnQsIHBhcmFtOiB7IHR5cGUsIGhvcml6b250YWxTdGVwLCBzdGFydFdpZHRoLCBlbmRXaWR0aCwgdXB3YXJkIH0gfSA9IHNlZ21lbnQ7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhaXJMZW5ndGggPSBzdGFydC5kaXN0YW5jZVRvKGVuZCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRFbmREaXIgPSBlbmQuc3VidHJhY3RlZChzdGFydCkubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0RW5kRGlzdGFuY2UgPSBzdGFydC5kaXN0YW5jZVRvKGVuZCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbWF4V2lkdGggPSBNYXRoLm1heChzdGFydFdpZHRoLCBlbmRXaWR0aCk7XG4gICAgICAgICAgICAgICAgbGV0IG5ld1N0ZXBDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpcikge1xuICAgICAgICAgICAgICAgICAgICBuZXdTdGVwQ291bnQgPSBzdGFpckxlbmd0aCAvIGhvcml6b250YWxTdGVwO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0U3RlcExlbmd0aCA9IHN0YXJ0RW5kRGlzdGFuY2UgLSAobmV3U3RlcENvdW50IC0gMSkgKiBob3Jpem9udGFsU3RlcDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsaWRTdGVwQ291bnQgPSAobGFzdFN0ZXBMZW5ndGggPT09IDAgfHwgbGFzdFN0ZXBMZW5ndGggPiBMZW5ndGhUb2xlcmFuY2UpID8gbmV3U3RlcENvdW50IDogbmV3U3RlcENvdW50IC0gMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbGlkU3RlcENvdW50IDwgMSB8fCB2YWxpZFN0ZXBDb3VudCA+PSBTdGVwQ291bnRMaW1pdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpciAmJiBjaXJjbGVUYW5nZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhbmdlbnRMZWZ0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhjaXJjbGVUYW5nZW50KS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVuZEFuZ2xlID0gc3RhcnRFbmREaXIuYW5nbGVUbyhjaXJjbGVUYW5nZW50LCBEaXJlY3Rpb25aKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNMZWZ0QXJjID0gZW5kQW5nbGUgPiBNYXRoLlBJO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNMZWZ0QXJjKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50LmNpcmN1bGFyU2lkZSA9IENpcmN1bGFyU2lkZS5MZWZ0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5jaXJjdWxhclNpZGUgPSBDaXJjdWxhclNpZGUuUmlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZW5kQ29tcGxlbWVudGFyeUFuZ2xlID0gaXNMZWZ0QXJjID8gTWF0aC5hYnMoZW5kQW5nbGUgLSBNYXRoLlBJIC8gMiAtIE1hdGguUEkpIDogTWF0aC5hYnMoZW5kQW5nbGUgLSBNYXRoLlBJIC8gMik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhbGZDaG9yZCA9IHN0YXJ0RW5kRGlzdGFuY2UgLyAyO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByYWRpdXMgPSBoYWxmQ2hvcmQgLyBNYXRoLmNvcyhlbmRDb21wbGVtZW50YXJ5QW5nbGUpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbm5lclJhZGl1cyA9IHJhZGl1cyAtIG1heFdpZHRoIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJhZGl1cyA8IG1heFdpZHRoIC8gMiAqIDEuMiB8fCBpbm5lclJhZGl1cyA8IGhvcml6b250YWxTdGVwIC8gMiAvIDAuOCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhvcml6b250YWxTdGVwQW5nbGUgPSBNYXRoLmFzaW4oaG9yaXpvbnRhbFN0ZXAgLyAyIC8gaW5uZXJSYWRpdXMpICogMjtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2lyY2xlTm9ybWFsID0gaXNMZWZ0QXJjID8gRGlyZWN0aW9uWiA6IERpcmVjdGlvbloucmV2ZXJzZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2lyY2xlQ2VudGVyID0gc3RhcnQuYWRkZWQodGFuZ2VudExlZnREaXIubXVsdGlwbGllZChpc0xlZnRBcmMgPyByYWRpdXMgOiAtcmFkaXVzKSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IGNpcmNsZSA9IEdlb21MaWIuY3JlYXRlQ2lyY2xlM2RCeUNlbnRlck5vcm1hbFJhZGl1cyhjaXJjbGVDZW50ZXIsIGNpcmNsZU5vcm1hbCwgcmFkaXVzKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJjID0gR2VvbUxpYi5jcmVhdGVBcmMzZEJ5Q2VudGVyTm9ybWFsUmFkaXVzKGNpcmNsZUNlbnRlciwgY2lyY2xlTm9ybWFsLCByYWRpdXMsIHN0YXJ0LCBlbmQpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhcmNBbmdsZSA9IGFyYy5hcmNBbmdsZTtcbiAgICAgICAgICAgICAgICAgICAgbmV3U3RlcENvdW50ID0gTWF0aC5jZWlsKGFyY0FuZ2xlIC8gaG9yaXpvbnRhbFN0ZXBBbmdsZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RIb3Jpem9udGFsQW5nbGUgPSBhcmNBbmdsZSAtIGhvcml6b250YWxTdGVwQW5nbGUgKiAobmV3U3RlcENvdW50IC0gMSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkU3RlcENvdW50ID0gKGxhc3RIb3Jpem9udGFsQW5nbGUgPT09IDAgfHwgbGFzdEhvcml6b250YWxBbmdsZSA+IEFuZ2xlVG9sZXJhbmNlKSA/IG5ld1N0ZXBDb3VudCA6IG5ld1N0ZXBDb3VudCAtIDE7XG4gICAgICAgICAgICAgICAgICAgIGlmIChob3Jpem9udGFsU3RlcEFuZ2xlID49IGFyY0FuZ2xlIHx8IGhvcml6b250YWxTdGVwQW5nbGUgPj0gTWF0aC5QSSAvIDIgfHwgdmFsaWRTdGVwQ291bnQgPj0gU3RlcENvdW50TGltaXQgfHwgdmFsaWRTdGVwQ291bnQgPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3RGVsdGFIZWlnaHQgPSBuZXdTdGVwQ291bnQgKiBuZXdWZXJ0aWNhbFN0ZXAgKiAodXB3YXJkID8gMSA6IC0xKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zdCBvbGREZWx0YUhlaWdodCA9IGVuZEhlaWdodCAtIHN0YXJ0SGVpZ2h0O1xuICAgICAgICAgICAgICAgIHNlZ21lbnQuc3RhcnRIZWlnaHQgPSB2ZXJ0aWNhbERlbHRhO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kSGVpZ2h0ID0gdmVydGljYWxEZWx0YTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kSGVpZ2h0ID0gc2VnbWVudC5zdGFydEhlaWdodCArIG5ld0RlbHRhSGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBpZiAoIW9ubHlTdGFydCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5wYXJhbS5ob3Jpem9udGFsU3RlcCA9IG5ld0hvcml6b250YWxTdGVwO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5wYXJhbS52ZXJ0aWNhbFN0ZXAgPSBuZXdWZXJ0aWNhbFN0ZXA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdW5WaXNpdGVkLmRlbGV0ZShzZWdtZW50KTtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXh0U2VnbWVudHMgPSBnZXROZXh0Q29tcG9uZW50cyhzZWdtZW50LCBzZWdtZW50cyk7XG4gICAgICAgICAgICAgICAgaWYgKG5leHRTZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dC5wdXNoKC4uLm5leHRTZWdtZW50cy5tYXAoc2VnID0+ICh7IHNlZ21lbnQ6IHNlZywgdmVydGljYWxEZWx0YTogc2VnbWVudC5lbmRIZWlnaHQgfSkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2hhbmdlZFNlZ21lbnRzLmFkZChzZWdtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJlbnQgPSBuZXh0O1xuICAgICAgICAgICAgaWYgKCFjdXJyZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGlmIChidWxrQ2hhbmdlICYmIHVuVmlzaXRlZC5zaXplKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoZVNlZ21lbnQgPSBbLi4udW5WaXNpdGVkLnZhbHVlcygpXVswXTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IFt7IHNlZ21lbnQ6IHRoZVNlZ21lbnQsIHZlcnRpY2FsRGVsdGE6IHRoZVNlZ21lbnQuc3RhcnRIZWlnaHQgfV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbLi4uY2hhbmdlZFNlZ21lbnRzXTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBBbmdsZVRvbGVyYW5jZSwgRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UsIERpcmVjdGlvblosIGR1bW15UG9pbnQzZCwgTGVuZ3RoVG9sZXJhbmNlLCBTdGVwQ291bnRMaW1pdCB9IGZyb20gXCIuL2NvbnN0c1wiO1xuaW1wb3J0IHsgZ2V0U2VnbWVudEJ5SW5kZXggfSBmcm9tIFwiLi9tZXNoVXRpbHNcIjtcbmltcG9ydCB7IENvbXBvbmVudFR5cGUsIENvbXBvbmVudERpcmVjdGlvblR5cGUsIENpcmN1bGFyU2lkZSwgSGFuZHJhaWxEZWZhdWx0T2Zmc2V0TGVuZ3RoIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IGlzRXF1YWwgfSBmcm9tIFwiLi91dGlsc1wiO1xuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlU2hhcGUoc2VnbWVudCwgdGVtcCA9IHRydWUpIHtcbiAgICBjb25zdCB7IHBhcmFtOiB7IHR5cGUgfSwgY2lyY2xlVGFuZ2VudCB9ID0gc2VnbWVudDtcbiAgICBpZiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyKSB7XG4gICAgICAgIGdlbmVyYXRlU3RyYWlnaHRTdGFpclNoYXBlKHNlZ21lbnQsIHRlbXApO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlID09PSBDb21wb25lbnRUeXBlLkNpcmN1bGFyU3RhaXIpIHtcbiAgICAgICAgaWYgKGNpcmNsZVRhbmdlbnQpIHtcbiAgICAgICAgICAgIGdlbmVyYXRlQ2lyY3VsYXJTdGFpclNoYXBlKHNlZ21lbnQsIHRlbXApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZ2VuZXJhdGVTdHJhaWdodFN0YWlyU2hhcGUoc2VnbWVudCwgdGVtcCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGdlbmVyYXRlUGxhdGZvcm1TaGFwZShzZWdtZW50LCB0ZW1wKTtcbiAgICB9XG59XG5mdW5jdGlvbiBnZW5lcmF0ZUNpcmN1bGFyU3RhaXJTaGFwZShzZWdtZW50LCB0ZW1wID0gdHJ1ZSkge1xuICAgIGNvbnN0IHsgc3RhcnQsIGVuZCwgc3RhaXJTaGFwZSwgbW9sZFNoYXBlLCBjb3JuZXJTaGFwZSwgY29ybmVyTW9sZFNoYXBlLCBzdGFydEhlaWdodCwgYmFzZUNvbXBvbmVudCwgY2lyY2xlVGFuZ2VudCwgcGFyYW0gfSA9IHNlZ21lbnQ7XG4gICAgY29uc3QgeyBzdGFydFdpZHRoLCBlbmRXaWR0aCwgaG9yaXpvbnRhbFN0ZXAsIHZlcnRpY2FsU3RlcCwgdXB3YXJkLCBwbGF0Zm9ybVRoaWNrbmVzcyB9ID0gcGFyYW07XG4gICAgaWYgKGNpcmNsZVRhbmdlbnQpIHtcbiAgICAgICAgY29uc3QgdGFuZ2VudExlZnREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKGNpcmNsZVRhbmdlbnQpLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgY29uc3Qgc3RhcnRFbmREaXIgPSBlbmQuc3VidHJhY3RlZChzdGFydCkubm9ybWFsaXplZCgpO1xuICAgICAgICBjb25zdCBzdGFydEVuZERpc3RhbmNlID0gc3RhcnQuZGlzdGFuY2VUbyhlbmQpO1xuICAgICAgICBjb25zdCBtYXhXaWR0aCA9IE1hdGgubWF4KHN0YXJ0V2lkdGgsIGVuZFdpZHRoKTtcbiAgICAgICAgY29uc3QgZW5kQW5nbGUgPSBzdGFydEVuZERpci5hbmdsZVRvKGNpcmNsZVRhbmdlbnQsIERpcmVjdGlvblopO1xuICAgICAgICBpZiAoZW5kQW5nbGUgPCBEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSkge1xuICAgICAgICAgICAgc2VnbWVudC5jaXJjdWxhclNpZGUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICByZXR1cm4gZ2VuZXJhdGVTdHJhaWdodFN0YWlyU2hhcGUoc2VnbWVudCwgdGVtcCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXNMZWZ0QXJjID0gZW5kQW5nbGUgPiBNYXRoLlBJO1xuICAgICAgICBpZiAoaXNMZWZ0QXJjKSB7XG4gICAgICAgICAgICBzZWdtZW50LmNpcmN1bGFyU2lkZSA9IENpcmN1bGFyU2lkZS5MZWZ0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2VnbWVudC5jaXJjdWxhclNpZGUgPSBDaXJjdWxhclNpZGUuUmlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZW5kQ29tcGxlbWVudGFyeUFuZ2xlID0gaXNMZWZ0QXJjID8gTWF0aC5hYnMoZW5kQW5nbGUgLSBNYXRoLlBJIC8gMiAtIE1hdGguUEkpIDogTWF0aC5hYnMoZW5kQW5nbGUgLSBNYXRoLlBJIC8gMik7XG4gICAgICAgIGNvbnN0IGhhbGZDaG9yZCA9IHN0YXJ0RW5kRGlzdGFuY2UgLyAyO1xuICAgICAgICBjb25zdCByYWRpdXMgPSBoYWxmQ2hvcmQgLyBNYXRoLmNvcyhlbmRDb21wbGVtZW50YXJ5QW5nbGUpO1xuICAgICAgICBjb25zdCBpbm5lclJhZGl1cyA9IHJhZGl1cyAtIG1heFdpZHRoIC8gMjtcbiAgICAgICAgaWYgKHJhZGl1cyA8IG1heFdpZHRoIC8gMiAqIDEuMiB8fCBpbm5lclJhZGl1cyA8IGhvcml6b250YWxTdGVwIC8gMiAvIDAuOCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGhvcml6b250YWxTdGVwQW5nbGUgPSBNYXRoLmFzaW4oaG9yaXpvbnRhbFN0ZXAgLyAyIC8gaW5uZXJSYWRpdXMpICogMjtcbiAgICAgICAgY29uc3QgY2lyY2xlTm9ybWFsID0gaXNMZWZ0QXJjID8gRGlyZWN0aW9uWiA6IERpcmVjdGlvbloucmV2ZXJzZWQoKTtcbiAgICAgICAgY29uc3QgY2lyY2xlQ2VudGVyID0gc3RhcnQuYWRkZWQodGFuZ2VudExlZnREaXIubXVsdGlwbGllZChpc0xlZnRBcmMgPyByYWRpdXMgOiAtcmFkaXVzKSk7XG4gICAgICAgIC8vIGNvbnN0IGNpcmNsZSA9IEdlb21MaWIuY3JlYXRlQ2lyY2xlM2RCeUNlbnRlck5vcm1hbFJhZGl1cyhjaXJjbGVDZW50ZXIsIGNpcmNsZU5vcm1hbCwgcmFkaXVzKTtcbiAgICAgICAgY29uc3QgYXJjID0gR2VvbUxpYi5jcmVhdGVBcmMzZEJ5Q2VudGVyTm9ybWFsUmFkaXVzKGNpcmNsZUNlbnRlciwgY2lyY2xlTm9ybWFsLCByYWRpdXMsIHN0YXJ0LCBlbmQpO1xuICAgICAgICBjb25zdCBhcmNBbmdsZSA9IGFyYy5hcmNBbmdsZTtcbiAgICAgICAgY29uc3Qgc3RlcENvdW50ID0gTWF0aC5jZWlsKGFyY0FuZ2xlIC8gaG9yaXpvbnRhbFN0ZXBBbmdsZSk7XG4gICAgICAgIGNvbnN0IGxhc3RIb3Jpem9udGFsQW5nbGUgPSBhcmNBbmdsZSAtIGhvcml6b250YWxTdGVwQW5nbGUgKiAoc3RlcENvdW50IC0gMSk7XG4gICAgICAgIGNvbnN0IHZhbGlkU3RlcENvdW50ID0gKGxhc3RIb3Jpem9udGFsQW5nbGUgPT09IDAgfHwgbGFzdEhvcml6b250YWxBbmdsZSA+IEFuZ2xlVG9sZXJhbmNlKSA/IHN0ZXBDb3VudCA6IHN0ZXBDb3VudCAtIDE7XG4gICAgICAgIGlmIChob3Jpem9udGFsU3RlcEFuZ2xlID49IGFyY0FuZ2xlIHx8IGhvcml6b250YWxTdGVwQW5nbGUgPj0gTWF0aC5QSSAvIDIgfHwgdmFsaWRTdGVwQ291bnQgPj0gU3RlcENvdW50TGltaXQgfHwgdmFsaWRTdGVwQ291bnQgPCAxKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFtdO1xuICAgICAgICBzdGFpclNoYXBlLnRlbXBMaW5lcyA9IFtdO1xuICAgICAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXTtcbiAgICAgICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtdO1xuICAgICAgICBjb3JuZXJTaGFwZS52ZXJ0aWNlcyA9IFtdO1xuICAgICAgICBjb3JuZXJTaGFwZS50ZW1wTGluZXMgPSBbXTtcbiAgICAgICAgY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzID0gW107XG4gICAgICAgIGNvcm5lck1vbGRTaGFwZS50ZW1wTGluZXMgPSBbXTtcbiAgICAgICAgY29uc3QgeyB2ZXJ0aWNlcywgdGVtcExpbmVzIH0gPSBzdGFpclNoYXBlO1xuICAgICAgICBjb25zdCB7IHZlcnRpY2VzOiBtb2xkVmVydGljZXMsIHRlbXBMaW5lczogbW9sZFRlbXBMaW5lcyB9ID0gbW9sZFNoYXBlO1xuICAgICAgICAvLyBjb25zdCBjZW50ZXJIb3Jpem9udGFsU3RlcCA9IGhvcml6b250YWxTdGVwIC8gaW5uZXJSYWRpdXMgKiByYWRpdXM7XG4gICAgICAgIGNvbnN0IHN0ZXBIZWlnaHQgPSB1cHdhcmQgPyB2ZXJ0aWNhbFN0ZXAgOiAtdmVydGljYWxTdGVwO1xuICAgICAgICBzZWdtZW50LmVuZEhlaWdodCA9IHNlZ21lbnQuc3RhcnRIZWlnaHQgKyB2YWxpZFN0ZXBDb3VudCAqIHN0ZXBIZWlnaHQ7XG4gICAgICAgIHN0YWlyU2hhcGUuc3RlcENvdW50ID0gdmFsaWRTdGVwQ291bnQ7XG4gICAgICAgIG1vbGRTaGFwZS5zdGVwQ291bnQgPSB2YWxpZFN0ZXBDb3VudDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3ZhbGlkU3RlcENvdW50OiAgICcsdmFsaWRTdGVwQ291bnQpO1xuICAgICAgICBjb25zdCBsZWZ0UHQgPSBzdGFydC5hZGRlZCh0YW5nZW50TGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSk7XG4gICAgICAgIGNvbnN0IHJpZ2h0UHQgPSBzdGFydC5hZGRlZCh0YW5nZW50TGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpO1xuICAgICAgICBjb25zdCBzdGFydFJhZGl1c0RpciA9IGlzTGVmdEFyYyA/IHRhbmdlbnRMZWZ0RGlyLnJldmVyc2VkKCkgOiB0YW5nZW50TGVmdERpcjtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGVwQ291bnQgLSAxOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGN1clJvdGF0ZU1hdHJpeCA9IEdlb21MaWIuY3JlYXRlUm90YXRlTWF0cml4NChob3Jpem9udGFsU3RlcEFuZ2xlICogaSwgY2lyY2xlTm9ybWFsLCBkdW1teVBvaW50M2QpO1xuICAgICAgICAgICAgY29uc3QgY3VyUmFkaXVzRGlyID0gc3RhcnRSYWRpdXNEaXIuYXBwbGllZE1hdHJpeDQoY3VyUm90YXRlTWF0cml4KTtcbiAgICAgICAgICAgIGNvbnN0IGN1ckhhbGZXaWR0aCA9IChzdGFydFdpZHRoICsgKGVuZFdpZHRoIC0gc3RhcnRXaWR0aCkgKiAoaSAqIGhvcml6b250YWxTdGVwQW5nbGUpIC8gYXJjQW5nbGUpIC8gMiAqIChpc0xlZnRBcmMgPyAtMSA6IDEpO1xuICAgICAgICAgICAgY29uc3QgY3VyTGVmdE1vbGRQdCA9IGNpcmNsZUNlbnRlci5hZGRlZChjdXJSYWRpdXNEaXIubXVsdGlwbGllZChyYWRpdXMgKyBjdXJIYWxmV2lkdGgpKTtcbiAgICAgICAgICAgIGNvbnN0IGN1clJpZ2h0TW9sZFB0ID0gY2lyY2xlQ2VudGVyLmFkZGVkKGN1clJhZGl1c0Rpci5tdWx0aXBsaWVkKHJhZGl1cyAtIGN1ckhhbGZXaWR0aCkpO1xuICAgICAgICAgICAgY29uc3QgY3VyTGVmdFB0ID0gY3VyTGVmdE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBpICogc3RlcEhlaWdodCkpO1xuICAgICAgICAgICAgY29uc3QgY3VyUmlnaHRQdCA9IGN1clJpZ2h0TW9sZFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIGkgKiBzdGVwSGVpZ2h0KSk7XG4gICAgICAgICAgICBtb2xkVmVydGljZXMucHVzaChjdXJMZWZ0TW9sZFB0LCBjdXJSaWdodE1vbGRQdCk7XG4gICAgICAgICAgICBtb2xkVGVtcExpbmVzLnB1c2goWzIgKiBpLCAxICsgMiAqIGldLCBbMiAqIGksIDIgKyAyICogaV0sIFsxICsgMiAqIGksIDMgKyAyICogaV0pO1xuICAgICAgICAgICAgdmVydGljZXMucHVzaChjdXJMZWZ0UHQsIGN1clJpZ2h0UHQpO1xuICAgICAgICAgICAgY29uc3QgbmV4dFJvdGF0ZU1hdHJpeCA9IEdlb21MaWIuY3JlYXRlUm90YXRlTWF0cml4NChob3Jpem9udGFsU3RlcEFuZ2xlICogKGkgKyAxKSwgY2lyY2xlTm9ybWFsLCBkdW1teVBvaW50M2QpO1xuICAgICAgICAgICAgY29uc3QgbmV4dFJhZGl1c0RpciA9IHN0YXJ0UmFkaXVzRGlyLmFwcGxpZWRNYXRyaXg0KG5leHRSb3RhdGVNYXRyaXgpO1xuICAgICAgICAgICAgY29uc3QgbmV4dEhhbGZXaWR0aCA9IChzdGFydFdpZHRoICsgKGVuZFdpZHRoIC0gc3RhcnRXaWR0aCkgKiAoKGkgKyAxKSAqIGhvcml6b250YWxTdGVwQW5nbGUpIC8gYXJjQW5nbGUpIC8gMiAqIChpc0xlZnRBcmMgPyAtMSA6IDEpO1xuICAgICAgICAgICAgY29uc3QgbmV4dExlZnRNb2xkUHQgPSBjaXJjbGVDZW50ZXIuYWRkZWQobmV4dFJhZGl1c0Rpci5tdWx0aXBsaWVkKHJhZGl1cyArIG5leHRIYWxmV2lkdGgpKTtcbiAgICAgICAgICAgIGNvbnN0IG5leHRSaWdodE1vbGRQdCA9IGNpcmNsZUNlbnRlci5hZGRlZChuZXh0UmFkaXVzRGlyLm11bHRpcGxpZWQocmFkaXVzIC0gbmV4dEhhbGZXaWR0aCkpO1xuICAgICAgICAgICAgY29uc3QgbmV4dExlZnRQdCA9IG5leHRMZWZ0TW9sZFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIGkgKiBzdGVwSGVpZ2h0KSk7XG4gICAgICAgICAgICBjb25zdCBuZXh0UmlnaHRQdCA9IG5leHRSaWdodE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBpICogc3RlcEhlaWdodCkpO1xuICAgICAgICAgICAgaWYgKHVwd2FyZCkge1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2goY3VyTGVmdFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksIGN1clJpZ2h0UHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKG5leHRMZWZ0UHQsIG5leHRSaWdodFB0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzQgKiBpLCAxICsgNCAqIGldLCBbNCAqIGksIDIgKyA0ICogaV0sIFsxICsgNCAqIGksIDMgKyA0ICogaV0sIFsyICsgNCAqIGksIDMgKyA0ICogaV0sIFsyICsgNCAqIGksIDQgKyA0ICogaV0sIFszICsgNCAqIGksIDUgKyA0ICogaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGkgPT09IHN0ZXBDb3VudCAtIDIpIHtcbiAgICAgICAgICAgICAgICBtb2xkVmVydGljZXMucHVzaChuZXh0TGVmdE1vbGRQdCwgbmV4dFJpZ2h0TW9sZFB0KTtcbiAgICAgICAgICAgICAgICBtb2xkVGVtcExpbmVzLnB1c2goWzIgKiAoc3RlcENvdW50IC0gMSksIDEgKyAyICogKHN0ZXBDb3VudCAtIDEpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaSA9PT0gc3RlcENvdW50IC0gMikge1xuICAgICAgICAgICAgICAgIC8vIGlmICh1cHdhcmQpIHtcbiAgICAgICAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKG5leHRMZWZ0UHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSwgbmV4dFJpZ2h0UHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSk7XG4gICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzQgKiAoc3RlcENvdW50IC0gMSksIDEgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxhc3RSb3RhdGVNYXRyaXggPSBHZW9tTGliLmNyZWF0ZVJvdGF0ZU1hdHJpeDQoYXJjQW5nbGUsIGNpcmNsZU5vcm1hbCwgZHVtbXlQb2ludDNkKTtcbiAgICAgICAgY29uc3QgbGFzdFJhZGl1c0RpciA9IHN0YXJ0UmFkaXVzRGlyLmFwcGxpZWRNYXRyaXg0KGxhc3RSb3RhdGVNYXRyaXgpO1xuICAgICAgICBjb25zdCBsYXN0SGFsZldpZHRoID0gaXNMZWZ0QXJjID8gLWVuZFdpZHRoIC8gMiA6IGVuZFdpZHRoIC8gMjtcbiAgICAgICAgY29uc3QgbGFzdExlZnRNb2xkUHQgPSBjaXJjbGVDZW50ZXIuYWRkZWQobGFzdFJhZGl1c0Rpci5tdWx0aXBsaWVkKHJhZGl1cyArIGxhc3RIYWxmV2lkdGgpKTtcbiAgICAgICAgY29uc3QgbGFzdFJpZ2h0TW9sZFB0ID0gY2lyY2xlQ2VudGVyLmFkZGVkKGxhc3RSYWRpdXNEaXIubXVsdGlwbGllZChyYWRpdXMgLSBsYXN0SGFsZldpZHRoKSk7XG4gICAgICAgIGNvbnN0IGxhc3RMZWZ0UHQgPSBsYXN0TGVmdE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBzdGVwQ291bnQgKiBzdGVwSGVpZ2h0KSk7XG4gICAgICAgIGNvbnN0IGxhc3RSaWdodFB0ID0gbGFzdFJpZ2h0TW9sZFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIHN0ZXBDb3VudCAqIHN0ZXBIZWlnaHQpKTtcbiAgICAgICAgaWYgKHN0ZXBDb3VudCA9PT0gMSkge1xuICAgICAgICAgICAgbW9sZFZlcnRpY2VzLnB1c2gobGVmdFB0LCByaWdodFB0KTtcbiAgICAgICAgICAgIG1vbGRUZW1wTGluZXMucHVzaChbMiAqIChzdGVwQ291bnQgLSAxKSwgMSArIDIgKiAoc3RlcENvdW50IC0gMSldKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGFzdEhvcml6b250YWxBbmdsZSA+PSBBbmdsZVRvbGVyYW5jZSB8fCBsYXN0SG9yaXpvbnRhbEFuZ2xlID09PSAwKSB7XG4gICAgICAgICAgICBtb2xkVmVydGljZXMucHVzaChsYXN0TGVmdE1vbGRQdCwgbGFzdFJpZ2h0TW9sZFB0KTtcbiAgICAgICAgICAgIG1vbGRUZW1wTGluZXMucHVzaChbMiAqIChzdGVwQ291bnQgLSAxKSwgMiArIDIgKiAoc3RlcENvdW50IC0gMSldLCBbMSArIDIgKiAoc3RlcENvdW50IC0gMSksIDMgKyAyICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKiBzdGVwQ291bnQsIDEgKyAyICogc3RlcENvdW50XSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVwd2FyZCkge1xuICAgICAgICAgICAgaWYgKHN0ZXBDb3VudCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2gobGVmdFB0LCByaWdodFB0KTtcbiAgICAgICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbNCAqIChzdGVwQ291bnQgLSAxKSwgMSArIDQgKiAoc3RlcENvdW50IC0gMSldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGFzdEhvcml6b250YWxBbmdsZSA+PSBBbmdsZVRvbGVyYW5jZSB8fCBsYXN0SG9yaXpvbnRhbEFuZ2xlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQodmVydGljYWxTdGVwKSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCh2ZXJ0aWNhbFN0ZXApKSk7XG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaChsYXN0TGVmdFB0LCBsYXN0UmlnaHRQdCk7XG4gICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzQgKiAoc3RlcENvdW50IC0gMSksIDIgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzEgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCAzICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsyICsgNCAqIChzdGVwQ291bnQgLSAxKSwgMyArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMiArIDQgKiAoc3RlcENvdW50IC0gMSksIDQgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzMgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCA1ICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFs0ICogc3RlcENvdW50LCAxICsgNCAqIHN0ZXBDb3VudF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChzdGVwQ291bnQgPT09IDEpIHtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKGxlZnRQdCwgcmlnaHRQdCk7XG4gICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzQgKiAoc3RlcENvdW50IC0gMSksIDEgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxhc3RIb3Jpem9udGFsQW5nbGUgPj0gQW5nbGVUb2xlcmFuY2UgfHwgbGFzdEhvcml6b250YWxBbmdsZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2gobGFzdExlZnRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQpKSwgbGFzdFJpZ2h0UHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0KSkpO1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2gobGFzdExlZnRQdCwgbGFzdFJpZ2h0UHQpO1xuICAgICAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFs0ICogKHN0ZXBDb3VudCAtIDEpLCAyICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsxICsgNCAqIChzdGVwQ291bnQgLSAxKSwgMyArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMiArIDQgKiAoc3RlcENvdW50IC0gMSksIDMgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCA0ICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFszICsgNCAqIChzdGVwQ291bnQgLSAxKSwgNSArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbNCAqIHN0ZXBDb3VudCwgMSArIDQgKiBzdGVwQ291bnRdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0ZXBDb3VudCA+IDEpIHtcbiAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIDIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGFjdHVhbExhc3RTdGVwTGVuZ3RoID0gbGFzdEhvcml6b250YWxBbmdsZSA8IEFuZ2xlVG9sZXJhbmNlID8gaG9yaXpvbnRhbFN0ZXBBbmdsZSA6IGxhc3RIb3Jpem9udGFsQW5nbGU7XG4gICAgICAgICAgICBpZiAodXB3YXJkKSB7XG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQgLSAoMSAtIGFjdHVhbExhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXBBbmdsZSkgKiBzdGVwSGVpZ2h0KSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCgtc3RlcEhlaWdodCAtICgxIC0gYWN0dWFsTGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcEFuZ2xlKSAqIHN0ZXBIZWlnaHQpKSk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IHN0ZXBDb3VudCAtIChsYXN0SG9yaXpvbnRhbEFuZ2xlID49IEFuZ2xlVG9sZXJhbmNlID8gMSA6IDIpOyBqID4gMDsgai0tKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZJbmQgPSBqICogNDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSAyLCAyICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsxICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAwXSwgWzMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAxXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2SW5kXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQpKSwgdmVydGljZXNbdkluZCArIDFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCgtc3RlcEhlaWdodCkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyB2ZXJ0aWNlcy5wdXNoKFxuICAgICAgICAgICAgICAgIC8vICAgICB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSA2XS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLFxuICAgICAgICAgICAgICAgIC8vICAgICB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSA1XS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLFxuICAgICAgICAgICAgICAgIC8vICk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IHN0ZXBDb3VudCAtIChsYXN0SG9yaXpvbnRhbEFuZ2xlID49IEFuZ2xlVG9sZXJhbmNlID8gMSA6IDIpOyBqID49IDA7IGotLSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2SW5kID0gaiAqIDQ7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbdmVydGljZXMubGVuZ3RoIC0gMiwgMiArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMSArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaiA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMF0sIFszICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdkluZF0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSwgdmVydGljZXNbdkluZCArIDFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIDIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMiArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDBdLCBbMyArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh1cHdhcmQpIHtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCgtc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzWzBdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksIHZlcnRpY2VzWzFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChiYXNlQ29tcG9uZW50ICYmIGJhc2VDb21wb25lbnQubGluZTNkSW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3QgYmFzZUxpbmVTZWczZCA9IGJhc2VDb21wb25lbnQubGluZTNkO1xuICAgICAgICAgICAgY29uc3QgYmFzZUxpbmVEaXIgPSBiYXNlTGluZVNlZzNkLmVuZC5zdWJ0cmFjdGVkKGJhc2VMaW5lU2VnM2Quc3RhcnQpLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgIGNvbnN0IGFuZ2xlID0gY2lyY2xlVGFuZ2VudC5hbmdsZShiYXNlTGluZURpcik7XG4gICAgICAgICAgICBpZiAoYW5nbGUgPCBNYXRoLlBJIC8gMikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvcm5lckNvbm5lY3Rpb25Qb2ludDEgPSBzdGFydC5hZGRlZChiYXNlTGluZURpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMiAqIE1hdGguc2lnbihhbmdsZSkpKTtcbiAgICAgICAgICAgICAgICBjb3JuZXJNb2xkU2hhcGUudmVydGljZXMgPSBbc3RhcnQsIHN0YXJ0LmFkZGVkKHRhbmdlbnRMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSksIGNvcm5lckNvbm5lY3Rpb25Qb2ludDFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29ybmVyQ29ubmVjdGlvblBvaW50MiA9IHN0YXJ0LmFkZGVkKGJhc2VMaW5lRGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIgKiBNYXRoLnNpZ24oYW5nbGUpKSk7XG4gICAgICAgICAgICAgICAgY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzID0gW3N0YXJ0LCBjb3JuZXJDb25uZWN0aW9uUG9pbnQyLCBzdGFydC5hZGRlZCh0YW5nZW50TGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29ybmVyTW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtbMCwgMV0sIFsxLCAyXSwgWzIsIDBdXTtcbiAgICAgICAgICAgIGNvcm5lclNoYXBlLnZlcnRpY2VzID0gW1xuICAgICAgICAgICAgICAgIC4uLmNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAodiA9PiB2LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCkpKSxcbiAgICAgICAgICAgICAgICAuLi5jb3JuZXJNb2xkU2hhcGUudmVydGljZXMubWFwKHYgPT4gdi5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgLSBwbGF0Zm9ybVRoaWNrbmVzcykpKSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgIGNvcm5lclNoYXBlLnRlbXBMaW5lcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgWzAsIDFdLCBbMSwgMl0sIFsyLCAwXSxcbiAgICAgICAgICAgICAgICAgICAgWzMsIDRdLCBbNCwgNV0sIFs1LCAzXSxcbiAgICAgICAgICAgICAgICAgICAgWzAsIDNdLCBbMSwgNF0sIFsyLCA1XSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gZ2VuZXJhdGVTdHJhaWdodFN0YWlyU2hhcGUoc2VnbWVudCwgdGVtcCA9IHRydWUpIHtcbiAgICBjb25zdCB7IHN0YXJ0LCBlbmQsIHN0YWlyU2hhcGUsIG1vbGRTaGFwZSwgY29ybmVyU2hhcGUsIGNvcm5lck1vbGRTaGFwZSwgc3RhcnRIZWlnaHQsIGJhc2VDb21wb25lbnQsIHBhcmFtIH0gPSBzZWdtZW50O1xuICAgIGNvbnN0IHsgc3RhcnRXaWR0aCwgZW5kV2lkdGgsIGhvcml6b250YWxTdGVwLCB2ZXJ0aWNhbFN0ZXAsIHVwd2FyZCwgcGxhdGZvcm1UaGlja25lc3MgfSA9IHBhcmFtO1xuICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbXTtcbiAgICBzdGFpclNoYXBlLnRlbXBMaW5lcyA9IFtdO1xuICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtdO1xuICAgIG1vbGRTaGFwZS50ZW1wTGluZXMgPSBbXTtcbiAgICBjb3JuZXJTaGFwZS52ZXJ0aWNlcyA9IFtdO1xuICAgIGNvcm5lclNoYXBlLnRlbXBMaW5lcyA9IFtdO1xuICAgIGNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtdO1xuICAgIGNvcm5lck1vbGRTaGFwZS50ZW1wTGluZXMgPSBbXTtcbiAgICBjb25zdCB7IHZlcnRpY2VzLCB0ZW1wTGluZXMgfSA9IHN0YWlyU2hhcGU7XG4gICAgY29uc3QgeyB2ZXJ0aWNlczogbW9sZFZlcnRpY2VzLCB0ZW1wTGluZXM6IG1vbGRUZW1wTGluZXMgfSA9IG1vbGRTaGFwZTtcbiAgICBsZXQgaG9yaXpvbnRhbEZyb250RGlyID0gZW5kLnN1YnRyYWN0ZWQoc3RhcnQpLm5vcm1hbGl6ZWQoKTtcbiAgICBsZXQgc3RhcnRFbmREaXN0YW5jZSA9IHN0YXJ0LmRpc3RhbmNlVG8oZW5kKTtcbiAgICBsZXQgaG9yaXpvbnRhbExlZnREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKGhvcml6b250YWxGcm9udERpcik7XG4gICAgY29uc3Qgc3RlcEZsb2F0Q291bnQgPSBzdGFydEVuZERpc3RhbmNlIC8gaG9yaXpvbnRhbFN0ZXA7XG4gICAgY29uc3Qgc3RlcENvdW50ID0gTWF0aC5jZWlsKHN0ZXBGbG9hdENvdW50KTtcbiAgICBjb25zdCBsYXN0U3RlcExlbmd0aCA9IHN0YXJ0RW5kRGlzdGFuY2UgLSAoc3RlcENvdW50IC0gMSkgKiBob3Jpem9udGFsU3RlcDtcbiAgICBjb25zdCB2YWxpZFN0ZXBDb3VudCA9IChsYXN0U3RlcExlbmd0aCA9PT0gMCB8fCBsYXN0U3RlcExlbmd0aCA+IExlbmd0aFRvbGVyYW5jZSkgPyBzdGVwQ291bnQgOiBzdGVwQ291bnQgLSAxO1xuICAgIGlmICh2YWxpZFN0ZXBDb3VudCA8IDEgfHwgdmFsaWRTdGVwQ291bnQgPj0gU3RlcENvdW50TGltaXQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoYmFzZUNvbXBvbmVudCkge1xuICAgICAgICBjb25zdCBiYXNlTGluZVNlZzNkID0gYmFzZUNvbXBvbmVudC5saW5lM2Q7XG4gICAgICAgIGNvbnN0IGJhc2VMaW5lRGlyID0gYmFzZUxpbmVTZWczZC5lbmQuc3VidHJhY3RlZChiYXNlTGluZVNlZzNkLnN0YXJ0KS5ub3JtYWxpemVkKCk7XG4gICAgICAgIGNvbnN0IGFuZ2xlID0gaG9yaXpvbnRhbEZyb250RGlyLmFuZ2xlKGJhc2VMaW5lRGlyKTtcbiAgICAgICAgY29uc3QgZGVsdGFBbmdsZSA9IE1hdGguYWJzKGFuZ2xlIC0gTWF0aC5QSSAvIDIpO1xuICAgICAgICBpZiAoZGVsdGFBbmdsZSA8PSBEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSkge1xuICAgICAgICAgICAgc2VnbWVudC5jb21wb25lbnREaXJlY3Rpb25UeXBlID0gQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5Gcm9udDtcbiAgICAgICAgICAgIGhvcml6b250YWxGcm9udERpciA9IGJhc2VMaW5lRGlyLmNyb3NzKGhvcml6b250YWxGcm9udERpci5jcm9zcyhiYXNlTGluZURpcikpLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgIHN0YXJ0RW5kRGlzdGFuY2UgPSBzdGFydEVuZERpc3RhbmNlICogTWF0aC5jb3MoZGVsdGFBbmdsZSk7XG4gICAgICAgICAgICBob3Jpem9udGFsTGVmdERpciA9IERpcmVjdGlvblouY3Jvc3MoaG9yaXpvbnRhbEZyb250RGlyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChhbmdsZSA8IE1hdGguUEkgLyAyKSB7XG4gICAgICAgICAgICAgICAgc2VnbWVudC5jb21wb25lbnREaXJlY3Rpb25UeXBlID0gQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5MZWZ0O1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvcm5lckNvbm5lY3Rpb25Qb2ludDEgPSBzdGFydC5hZGRlZChiYXNlTGluZURpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMiAqIE1hdGguc2lnbihhbmdsZSkpKTtcbiAgICAgICAgICAgICAgICBjb3JuZXJNb2xkU2hhcGUudmVydGljZXMgPSBbc3RhcnQsIHN0YXJ0LmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSksIGNvcm5lckNvbm5lY3Rpb25Qb2ludDFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VnbWVudC5jb21wb25lbnREaXJlY3Rpb25UeXBlID0gQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5SaWdodDtcbiAgICAgICAgICAgICAgICBjb25zdCBjb3JuZXJDb25uZWN0aW9uUG9pbnQyID0gc3RhcnQuYWRkZWQoYmFzZUxpbmVEaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMiAqIE1hdGguc2lnbihhbmdsZSkpKTtcbiAgICAgICAgICAgICAgICBjb3JuZXJNb2xkU2hhcGUudmVydGljZXMgPSBbc3RhcnQsIGNvcm5lckNvbm5lY3Rpb25Qb2ludDIsIHN0YXJ0LmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb3JuZXJNb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgMF1dO1xuICAgICAgICAgICAgY29ybmVyU2hhcGUudmVydGljZXMgPSBbXG4gICAgICAgICAgICAgICAgLi4uY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzLm1hcCh2ID0+IHYuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkpLFxuICAgICAgICAgICAgICAgIC4uLmNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAodiA9PiB2LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCAtIHBsYXRmb3JtVGhpY2tuZXNzKSkpLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgY29ybmVyU2hhcGUudGVtcExpbmVzID0gW1xuICAgICAgICAgICAgICAgICAgICBbMCwgMV0sIFsxLCAyXSwgWzIsIDBdLFxuICAgICAgICAgICAgICAgICAgICBbMywgNF0sIFs0LCA1XSwgWzUsIDNdLFxuICAgICAgICAgICAgICAgICAgICBbMCwgM10sIFsxLCA0XSwgWzIsIDVdLFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgc3RlcEhlaWdodCA9IHVwd2FyZCA/IHZlcnRpY2FsU3RlcCA6IC12ZXJ0aWNhbFN0ZXA7XG4gICAgc2VnbWVudC5lbmRIZWlnaHQgPSBzZWdtZW50LnN0YXJ0SGVpZ2h0ICsgdmFsaWRTdGVwQ291bnQgKiBzdGVwSGVpZ2h0O1xuICAgIHN0YWlyU2hhcGUuc3RlcENvdW50ID0gdmFsaWRTdGVwQ291bnQ7XG4gICAgbW9sZFNoYXBlLnN0ZXBDb3VudCA9IHZhbGlkU3RlcENvdW50O1xuICAgIGNvbnN0IGxlZnRQdCA9IHN0YXJ0LmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKTtcbiAgICBjb25zdCByaWdodFB0ID0gc3RhcnQuYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKTtcbiAgICBjb25zdCB3aWR0aERlbHRhID0gKGVuZFdpZHRoIC0gc3RhcnRXaWR0aCkgLyAyIC8gKHN0ZXBGbG9hdENvdW50KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ZXBDb3VudCAtIDE7IGkrKykge1xuICAgICAgICBjb25zdCBjdXJMZWZ0TW9sZFB0ID0gbGVmdFB0LmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGkgKiBob3Jpem9udGFsU3RlcCkpLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoaSAqIHdpZHRoRGVsdGEpKTtcbiAgICAgICAgY29uc3QgY3VyUmlnaHRNb2xkUHQgPSByaWdodFB0LmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGkgKiBob3Jpem9udGFsU3RlcCkpLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoLWkgKiB3aWR0aERlbHRhKSk7XG4gICAgICAgIGNvbnN0IGN1ckxlZnRQdCA9IGN1ckxlZnRNb2xkUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0ICsgaSAqIHN0ZXBIZWlnaHQpKTtcbiAgICAgICAgY29uc3QgY3VyUmlnaHRQdCA9IGN1clJpZ2h0TW9sZFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIGkgKiBzdGVwSGVpZ2h0KSk7XG4gICAgICAgIG1vbGRWZXJ0aWNlcy5wdXNoKGN1ckxlZnRNb2xkUHQsIGN1clJpZ2h0TW9sZFB0KTtcbiAgICAgICAgbW9sZFRlbXBMaW5lcy5wdXNoKFsyICogaSwgMSArIDIgKiBpXSwgWzIgKiBpLCAyICsgMiAqIGldLCBbMSArIDIgKiBpLCAzICsgMiAqIGldKTtcbiAgICAgICAgdmVydGljZXMucHVzaChjdXJMZWZ0UHQsIGN1clJpZ2h0UHQpO1xuICAgICAgICBpZiAodXB3YXJkKSB7XG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKGN1ckxlZnRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLCBjdXJSaWdodFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmVydGljZXMucHVzaChjdXJMZWZ0UHQuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaG9yaXpvbnRhbFN0ZXApKSwgY3VyUmlnaHRQdC5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzQgKiBpLCAxICsgNCAqIGldLCBbNCAqIGksIDIgKyA0ICogaV0sIFsxICsgNCAqIGksIDMgKyA0ICogaV0sIFsyICsgNCAqIGksIDMgKyA0ICogaV0sIFsyICsgNCAqIGksIDQgKyA0ICogaV0sIFszICsgNCAqIGksIDUgKyA0ICogaV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIG1vbGRWZXJ0aWNlcy5wdXNoKHN0ZXBDb3VudCA+IDEgPyBtb2xkVmVydGljZXNbbW9sZFZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSkgOiBsZWZ0UHQsIHN0ZXBDb3VudCA+IDEgPyBtb2xkVmVydGljZXNbbW9sZFZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSkgOiByaWdodFB0KTtcbiAgICBtb2xkVGVtcExpbmVzLnB1c2goWzIgKiAoc3RlcENvdW50IC0gMSksIDEgKyAyICogKHN0ZXBDb3VudCAtIDEpXSk7XG4gICAgaWYgKGxhc3RTdGVwTGVuZ3RoID4gTGVuZ3RoVG9sZXJhbmNlIHx8IGxhc3RTdGVwTGVuZ3RoID09PSAwKSB7XG4gICAgICAgIG1vbGRWZXJ0aWNlcy5wdXNoKG1vbGRWZXJ0aWNlc1ttb2xkVmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwICogd2lkdGhEZWx0YSkpLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoKSksIG1vbGRWZXJ0aWNlc1ttb2xkVmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZCgtbGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcCAqIHdpZHRoRGVsdGEpKS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCkpKTtcbiAgICAgICAgbW9sZFRlbXBMaW5lcy5wdXNoKFsyICogKHN0ZXBDb3VudCAtIDEpLCAyICsgMiAqIChzdGVwQ291bnQgLSAxKV0sIFsxICsgMiAqIChzdGVwQ291bnQgLSAxKSwgMyArIDIgKiAoc3RlcENvdW50IC0gMSldLCBbMiAqIHN0ZXBDb3VudCwgMSArIDIgKiBzdGVwQ291bnRdKTtcbiAgICB9XG4gICAgaWYgKHVwd2FyZCkge1xuICAgICAgICB2ZXJ0aWNlcy5wdXNoKHN0ZXBDb3VudCA+IDEgPyB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpIDogbGVmdFB0LCBzdGVwQ291bnQgPiAxID8gdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaG9yaXpvbnRhbFN0ZXApKSA6IHJpZ2h0UHQpO1xuICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzQgKiAoc3RlcENvdW50IC0gMSksIDEgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxhc3RTdGVwTGVuZ3RoID4gTGVuZ3RoVG9sZXJhbmNlIHx8IGxhc3RTdGVwTGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXAgKiB3aWR0aERlbHRhKSkuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGgpKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZCgtbGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcCAqIHdpZHRoRGVsdGEpKS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCkpKTtcbiAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goXG4gICAgICAgICAgICAgICAgLy8gWzQgKiBzdGVwQ291bnQsIDEgKyA0ICogc3RlcENvdW50XSxcbiAgICAgICAgICAgICAgICBbNCAqIChzdGVwQ291bnQgLSAxKSwgMiArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMSArIDQgKiAoc3RlcENvdW50IC0gMSksIDMgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCAzICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsyICsgNCAqIChzdGVwQ291bnQgLSAxKSwgNCArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMyArIDQgKiAoc3RlcENvdW50IC0gMSksIDUgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzQgKiBzdGVwQ291bnQsIDEgKyA0ICogc3RlcENvdW50XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZlcnRpY2VzLnB1c2goc3RlcENvdW50ID4gMSA/IHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkgOiBsZWZ0UHQsIHN0ZXBDb3VudCA+IDEgPyB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpIDogcmlnaHRQdCk7XG4gICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbNCAqIChzdGVwQ291bnQgLSAxKSwgMSArIDQgKiAoc3RlcENvdW50IC0gMSldKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGFzdFN0ZXBMZW5ndGggPiBMZW5ndGhUb2xlcmFuY2UgfHwgbGFzdFN0ZXBMZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwICogd2lkdGhEZWx0YSkpLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoKSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoLWxhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXAgKiB3aWR0aERlbHRhKSkuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGgpKSk7XG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xuICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChcbiAgICAgICAgICAgICAgICAvLyBbNCAqIChzdGVwQ291bnQgLSAxKSwgMSArIDQgKiAoc3RlcENvdW50IC0gMSldLFxuICAgICAgICAgICAgICAgIFs0ICogKHN0ZXBDb3VudCAtIDEpLCAyICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsxICsgNCAqIChzdGVwQ291bnQgLSAxKSwgMyArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMiArIDQgKiAoc3RlcENvdW50IC0gMSksIDMgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCA0ICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFszICsgNCAqIChzdGVwQ291bnQgLSAxKSwgNSArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbNCAqIHN0ZXBDb3VudCwgMSArIDQgKiBzdGVwQ291bnRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoc3RlcENvdW50ID4gMSkge1xuICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIDIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMiArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDQgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCA1ICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFt2ZXJ0aWNlcy5sZW5ndGggKyAyLCAxICsgdmVydGljZXMubGVuZ3RoICsgMl0sIFt2ZXJ0aWNlcy5sZW5ndGggKyAyLCAwXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggKyAyLCAxXSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYWN0dWFsTGFzdFN0ZXBMZW5ndGggPSBsYXN0U3RlcExlbmd0aCA8IExlbmd0aFRvbGVyYW5jZSA/IGhvcml6b250YWxTdGVwIDogbGFzdFN0ZXBMZW5ndGg7XG4gICAgICAgIGlmICh1cHdhcmQpIHtcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0IC0gKDEgLSBhY3R1YWxMYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwKSAqIHN0ZXBIZWlnaHQpKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0IC0gKDEgLSBhY3R1YWxMYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwKSAqIHN0ZXBIZWlnaHQpKSk7XG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzWzBdLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSksIHZlcnRpY2VzWzFdLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZCgtYWN0dWFsTGFzdFN0ZXBMZW5ndGgpKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoLWFjdHVhbExhc3RTdGVwTGVuZ3RoKSkpO1xuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1swXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1sxXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSAyLCAyICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsxICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMiArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAwXSwgWzMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAxXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVwd2FyZCkge1xuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQpKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0KSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1swXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1sxXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGdlbmVyYXRlUGxhdGZvcm1TaGFwZShzZWdtZW50LCB0ZW1wID0gdHJ1ZSkge1xuICAgIGNvbnN0IHsgc3RhcnQsIHN0YXJ0SGVpZ2h0LCBiYXNlQ29tcG9uZW50LCBzdGFpclNoYXBlLCBtb2xkU2hhcGUsIGNvcm5lclNoYXBlLCBjb3JuZXJNb2xkU2hhcGUsIHBhcmFtIH0gPSBzZWdtZW50O1xuICAgIGNvbnN0IHsgc3RhcnRXaWR0aCwgb2Zmc2V0V2lkdGgsIHdpdGhPZmZzZXQsIHBsYXRmb3JtVGhpY2tuZXNzLCBwbGF0Zm9ybUxlbmd0aCwgcGxhdGZvcm1MZW5ndGhMb2NrZWQsIG1vZGVsRWRpdGluZyB9ID0gcGFyYW07XG4gICAgY29uc3QgY3VyRGlyID0gc2VnbWVudC5lbmQuc3VidHJhY3RlZChzdGFydCk7XG4gICAgY29uc3QgY3VyRGlyTm9ybWFsaXplZCA9IHNlZ21lbnQuZW5kLnN1YnRyYWN0ZWQoc3RhcnQpLm5vcm1hbGl6ZWQoKTtcbiAgICBjb25zdCBjdXJMZWZ0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhjdXJEaXIpLm5vcm1hbGl6ZWQoKTtcbiAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gW107XG4gICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXTtcbiAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXTtcbiAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW107XG4gICAgY29ybmVyU2hhcGUudmVydGljZXMgPSBbXTtcbiAgICBjb3JuZXJTaGFwZS50ZW1wTGluZXMgPSBbXTtcbiAgICBjb3JuZXJNb2xkU2hhcGUudmVydGljZXMgPSBbXTtcbiAgICBjb3JuZXJNb2xkU2hhcGUudGVtcExpbmVzID0gW107XG4gICAgc2VnbWVudC5lbmQgPSBwbGF0Zm9ybUxlbmd0aExvY2tlZCA/IHNlZ21lbnQuc3RhcnQuYWRkZWQoY3VyRGlyTm9ybWFsaXplZC5tdWx0aXBsaWVkKHBsYXRmb3JtTGVuZ3RoKSkgOiBzZWdtZW50LmVuZDtcbiAgICBzZWdtZW50LmVuZEhlaWdodCA9IHN0YXJ0SGVpZ2h0O1xuICAgIGlmICghbW9kZWxFZGl0aW5nKSB7XG4gICAgICAgIHBhcmFtLndpdGhPZmZzZXQgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGJhc2VDb21wb25lbnQpIHtcbiAgICAgICAgY29uc3QgYmFzZUxpbmVTZWczZCA9IGJhc2VDb21wb25lbnQubGluZTNkO1xuICAgICAgICBjb25zdCB7IHN0YXJ0OiBiYXNlTGluZVN0YXJ0LCBlbmQ6IGJhc2VMaW5lRW5kIH0gPSBiYXNlTGluZVNlZzNkO1xuICAgICAgICBjb25zdCBiYXNlTGluZURpciA9IGJhc2VMaW5lRW5kLnN1YnRyYWN0ZWQoYmFzZUxpbmVTdGFydCkubm9ybWFsaXplZCgpO1xuICAgICAgICBjb25zdCBwcmV2RGlyTm9ybWFsaXplZCA9IGJhc2VMaW5lRGlyLmNyb3NzKERpcmVjdGlvblopLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgY29uc3QgcHJldkxlZnREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKHByZXZEaXJOb3JtYWxpemVkKS5ub3JtYWxpemVkKCk7XG4gICAgICAgIGNvbnN0IGFuZ2xlID0gY3VyRGlyLmFuZ2xlVG8ocHJldkRpck5vcm1hbGl6ZWQsIERpcmVjdGlvblopO1xuICAgICAgICBjb25zdCBmcm9udExlbmd0aCA9IHBsYXRmb3JtTGVuZ3RoTG9ja2VkID8gcGxhdGZvcm1MZW5ndGggOiBNYXRoLmFicyhjdXJEaXIuZG90KHByZXZEaXJOb3JtYWxpemVkKSk7XG4gICAgICAgIGNvbnN0IGN1ckVuZExlZnRDb3JuZXIgPSBzZWdtZW50LmVuZC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKTtcbiAgICAgICAgY29uc3QgZGlyMSA9IGN1ckVuZExlZnRDb3JuZXIuc3VidHJhY3RlZChzZWdtZW50LnN0YXJ0KTtcbiAgICAgICAgY29uc3QgYW5nbGUxID0gZGlyMS5hbmdsZShjdXJEaXIpO1xuICAgICAgICBpZiAoKGFuZ2xlID49IE1hdGguUEkgJiYgYW5nbGUgPD0gKE1hdGguUEkgKiAzIC8gMiArIGFuZ2xlMSkpIHx8IChtb2RlbEVkaXRpbmcgJiYgd2l0aE9mZnNldCAmJiBvZmZzZXRXaWR0aCA+PSAwKSkge1xuICAgICAgICAgICAgc2VnbWVudC5jb21wb25lbnREaXJlY3Rpb25UeXBlID0gQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5MZWZ0O1xuICAgICAgICAgICAgcGFyYW0ucGxhdGZvcm1MZW5ndGggPSBmcm9udExlbmd0aDtcbiAgICAgICAgICAgIGNvbnN0IGZyb250RW5kID0gc2VnbWVudC5zdGFydC5hZGRlZChwcmV2RGlyTm9ybWFsaXplZC5tdWx0aXBsaWVkKGZyb250TGVuZ3RoKSk7XG4gICAgICAgICAgICBzZWdtZW50LmVuZCA9IGZyb250RW5kO1xuICAgICAgICAgICAgY29uc3QgbGVmdExlbmd0aCA9IHdpdGhPZmZzZXQgJiYgbW9kZWxFZGl0aW5nID8gKG9mZnNldFdpZHRoICsgc3RhcnRXaWR0aCAvIDIpIDogY3VyRGlyLmRvdChwcmV2TGVmdERpcik7XG4gICAgICAgICAgICBpZiAobGVmdExlbmd0aCA+IHN0YXJ0V2lkdGggLyAyKSB7XG4gICAgICAgICAgICAgICAgcGFyYW0ud2l0aE9mZnNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcGFyYW0ub2Zmc2V0V2lkdGggPSBsZWZ0TGVuZ3RoIC0gc3RhcnRXaWR0aCAvIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB2YWxpZExlZnRMZW5ndGggPSBNYXRoLm1heChzdGFydFdpZHRoIC8gMiwgbGVmdExlbmd0aCk7XG4gICAgICAgICAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXG4gICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCh2YWxpZExlZnRMZW5ndGgpKSxcbiAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSksXG4gICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCh2YWxpZExlZnRMZW5ndGgpKSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgM10sIFszLCAwXV07XG4gICAgICAgICAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gWy4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCkpKSxcbiAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgLSBwbGF0Zm9ybVRoaWNrbmVzcykpKSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW1xuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLFxuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLm1hcChzZWcgPT4gW3NlZ1swXSArIDQsIHNlZ1sxXSArIDRdKSxcbiAgICAgICAgICAgICAgICAgICAgWzAsIDRdLCBbMSwgNV0sIFsyLCA2XSwgWzMsIDddLFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoKGFuZ2xlIDwgTWF0aC5QSSAmJiBhbmdsZSA+PSAoTWF0aC5QSSAvIDIgLSBhbmdsZTEpKSB8fCAobW9kZWxFZGl0aW5nICYmIHdpdGhPZmZzZXQgJiYgb2Zmc2V0V2lkdGggPCAwKSkge1xuICAgICAgICAgICAgc2VnbWVudC5jb21wb25lbnREaXJlY3Rpb25UeXBlID0gQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5SaWdodDtcbiAgICAgICAgICAgIHBhcmFtLnBsYXRmb3JtTGVuZ3RoID0gZnJvbnRMZW5ndGg7XG4gICAgICAgICAgICBjb25zdCByaWdodExlbmd0aCA9IHdpdGhPZmZzZXQgJiYgbW9kZWxFZGl0aW5nID8gKC1vZmZzZXRXaWR0aCArIHN0YXJ0V2lkdGggLyAyKSA6IC1jdXJEaXIuZG90KHByZXZMZWZ0RGlyKTtcbiAgICAgICAgICAgIGNvbnN0IGZyb250RW5kMSA9IHNlZ21lbnQuc3RhcnQuYWRkZWQocHJldkRpck5vcm1hbGl6ZWQubXVsdGlwbGllZChmcm9udExlbmd0aCkpO1xuICAgICAgICAgICAgc2VnbWVudC5lbmQgPSBmcm9udEVuZDE7XG4gICAgICAgICAgICBpZiAocmlnaHRMZW5ndGggPiBzdGFydFdpZHRoIC8gMikge1xuICAgICAgICAgICAgICAgIHBhcmFtLndpdGhPZmZzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHBhcmFtLm9mZnNldFdpZHRoID0gLShyaWdodExlbmd0aCAtIHN0YXJ0V2lkdGggLyAyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHZhbGlkUmlnaHRMZW5ndGggPSBNYXRoLm1heChzdGFydFdpZHRoIC8gMiwgcmlnaHRMZW5ndGgpO1xuICAgICAgICAgICAgbW9sZFNoYXBlLnZlcnRpY2VzID0gW1xuICAgICAgICAgICAgICAgIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC12YWxpZFJpZ2h0TGVuZ3RoKSksXG4gICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtdmFsaWRSaWdodExlbmd0aCkpLFxuICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgM10sIFszLCAwXV07XG4gICAgICAgICAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gWy4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCkpKSxcbiAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgLSBwbGF0Zm9ybVRoaWNrbmVzcykpKSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW1xuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLFxuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLm1hcChzZWcgPT4gW3NlZ1swXSArIDQsIHNlZ1sxXSArIDRdKSxcbiAgICAgICAgICAgICAgICAgICAgWzAsIDRdLCBbMSwgNV0sIFsyLCA2XSwgWzMsIDddLFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwYXJhbS5vZmZzZXRXaWR0aCA9IDA7XG4gICAgICAgICAgICBpZiAoYW5nbGUgPD0gRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UgfHwgYW5nbGUgPj0gKE1hdGguUEkgKiAyIC0gRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UpKSB7XG4gICAgICAgICAgICAgICAgc2VnbWVudC5jb21wb25lbnREaXJlY3Rpb25UeXBlID0gQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5Gcm9udDtcbiAgICAgICAgICAgICAgICBzZWdtZW50LmVuZCA9IHNlZ21lbnQuc3RhcnQuYWRkZWQocHJldkRpck5vcm1hbGl6ZWQubXVsdGlwbGllZChmcm9udExlbmd0aCkpO1xuICAgICAgICAgICAgICAgIHBhcmFtLnBsYXRmb3JtTGVuZ3RoID0gZnJvbnRMZW5ndGg7XG4gICAgICAgICAgICAgICAgbW9sZFNoYXBlLnZlcnRpY2VzID0gW1xuICAgICAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSksXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyICsgb2Zmc2V0V2lkdGgpKSxcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIgKyBvZmZzZXRXaWR0aCkpLFxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSksXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgM10sIFszLCAwXV07XG4gICAgICAgICAgICAgICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFsuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKSksXG4gICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCAtIHBsYXRmb3JtVGhpY2tuZXNzKSkpLFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcy5tYXAoc2VnID0+IFtzZWdbMF0gKyA0LCBzZWdbMV0gKyA0XSksXG4gICAgICAgICAgICAgICAgICAgICAgICBbMCwgNF0sIFsxLCA1XSwgWzIsIDZdLCBbMywgN10sXG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UgPCBhbmdsZSAmJiBhbmdsZSA8IChNYXRoLlBJIC8gMiAtIGFuZ2xlMSkpIHtcbiAgICAgICAgICAgICAgICBzZWdtZW50LmNvbXBvbmVudERpcmVjdGlvblR5cGUgPSBDb21wb25lbnREaXJlY3Rpb25UeXBlLlJpZ2h0RnJvbnQ7XG4gICAgICAgICAgICAgICAgcGFyYW0ucGxhdGZvcm1MZW5ndGggPSBzZWdtZW50LmVuZC5kaXN0YW5jZVRvKHNlZ21lbnQuc3RhcnQpO1xuICAgICAgICAgICAgICAgIGxldCBsZWZ0Q29ubmVjdFBvaW50cyA9IFtzdGFydC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSwgYmFzZUxpbmVFbmRdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VMaW5lRW5kRGlzdGFuY2UgPSBzdGFydC5kaXN0YW5jZVRvKGJhc2VMaW5lRW5kKTtcbiAgICAgICAgICAgICAgICBjb25zdCBsZWZ0UHJvamVjdERpc3RhbmNlID0gc3RhcnRXaWR0aCAvIDIgKiBNYXRoLmNvcyhhbmdsZSk7XG4gICAgICAgICAgICAgICAgaWYgKGxlZnRQcm9qZWN0RGlzdGFuY2UgPCBiYXNlTGluZUVuZERpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGwxID0gc3RhcnRXaWR0aCAvIDIgLyBNYXRoLmNvcyhhbmdsZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsMSA+IGJhc2VMaW5lRW5kRGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGExID0gbDEgLSBiYXNlTGluZUVuZERpc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYzEgPSBhMSAvIE1hdGgudGFuKGFuZ2xlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRDb25uZWN0UG9pbnRzID0gW3N0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoYmFzZUxpbmVFbmREaXN0YW5jZSkpLmFkZGVkKHByZXZEaXJOb3JtYWxpemVkLm11bHRpcGxpZWQoYzEpKSwgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChiYXNlTGluZUVuZERpc3RhbmNlKSldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdENvbm5lY3RQb2ludHMgPSBbc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChsMSkpXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgIC8vIHN0YXJ0LmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgICAgICAgICAuLi5sZWZ0Q29ubmVjdFBvaW50cyxcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIgLyBNYXRoLmNvcyhhbmdsZSkpKSxcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vbGRWZXJ0ZXhDb3VudCA9IG1vbGRTaGFwZS52ZXJ0aWNlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IGdlbmVyYXRlVGVtcExpbmVzTG9vcChtb2xkVmVydGV4Q291bnQpO1xuICAgICAgICAgICAgICAgIC8vIGlmIChtb2xkVmVydGV4Q291bnQgPT09IDQpIHtcbiAgICAgICAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgM10sIFszLCA0XSwgWzQsIDBdXTtcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFsuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKSksXG4gICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCAtIHBsYXRmb3JtVGhpY2tuZXNzKSkpLFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcy5tYXAoc2VnID0+IFtzZWdbMF0gKyBtb2xkVmVydGV4Q291bnQsIHNlZ1sxXSArIG1vbGRWZXJ0ZXhDb3VudF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcy5tYXAoc2VnID0+IFtzZWdbMF0sIHNlZ1swXSArIG1vbGRWZXJ0ZXhDb3VudF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gWzAsIDVdLCBbMSwgNl0sIFsyLCA3XSwgWzMsIDhdLCBbNCwgOV0sXG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYW5nbGUgPiAoTWF0aC5QSSAqIDMgLyAyICsgYW5nbGUxKSAmJiBhbmdsZSA8IChNYXRoLlBJICogMiAtIERpcmVjdGlvbkFuZ2xlVG9sZXJhbmNlKSkge1xuICAgICAgICAgICAgICAgIHNlZ21lbnQuY29tcG9uZW50RGlyZWN0aW9uVHlwZSA9IENvbXBvbmVudERpcmVjdGlvblR5cGUuTGVmdEZyb250O1xuICAgICAgICAgICAgICAgIHBhcmFtLnBsYXRmb3JtTGVuZ3RoID0gc2VnbWVudC5lbmQuZGlzdGFuY2VUbyhzZWdtZW50LnN0YXJ0KTtcbiAgICAgICAgICAgICAgICBsZXQgcmlnaHRDb25uZWN0UG9pbnRzID0gW2Jhc2VMaW5lU3RhcnQsIHN0YXJ0LmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKV07XG4gICAgICAgICAgICAgICAgY29uc3QgYmFzZUxpbmVTdGFydERpc3RhbmNlID0gc3RhcnQuZGlzdGFuY2VUbyhiYXNlTGluZVN0YXJ0KTtcbiAgICAgICAgICAgICAgICBjb25zdCByaWdodFByb2plY3REaXN0YW5jZSA9IHN0YXJ0V2lkdGggLyAyICogTWF0aC5jb3MoYW5nbGUpO1xuICAgICAgICAgICAgICAgIGlmIChyaWdodFByb2plY3REaXN0YW5jZSA8IGJhc2VMaW5lU3RhcnREaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgcmlnaHRDb25uZWN0UG9pbnRzID0gW2Jhc2VMaW5lU3RhcnQsIGJhc2VMaW5lU3RhcnRdO1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiAoc3RhcnRXaWR0aCA8PSBwcmV2UGFyYW0uZW5kV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbDIgPSBzdGFydFdpZHRoIC8gMiAvIE1hdGguY29zKGFuZ2xlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGwyID4gYmFzZUxpbmVTdGFydERpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhMiA9IGwyIC0gYmFzZUxpbmVTdGFydERpc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYzIgPSBhMiAvIE1hdGgudGFuKE1hdGguUEkgKiAyIC0gYW5nbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHRDb25uZWN0UG9pbnRzID0gW3N0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLWJhc2VMaW5lU3RhcnREaXN0YW5jZSkpLCBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC1iYXNlTGluZVN0YXJ0RGlzdGFuY2UpKS5hZGRlZChwcmV2RGlyTm9ybWFsaXplZC5tdWx0aXBsaWVkKGMyKSldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHRDb25uZWN0UG9pbnRzID0gW3N0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLWwyKSldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMiAvIE1hdGguY29zKGFuZ2xlKSkpLFxuICAgICAgICAgICAgICAgICAgICAuLi5yaWdodENvbm5lY3RQb2ludHMsXG4gICAgICAgICAgICAgICAgICAgIC8vIHN0YXJ0LmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vbGRWZXJ0ZXhDb3VudCA9IG1vbGRTaGFwZS52ZXJ0aWNlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IGdlbmVyYXRlVGVtcExpbmVzTG9vcChtb2xkVmVydGV4Q291bnQpO1xuICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkpLFxuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgLSBwbGF0Zm9ybVRoaWNrbmVzcykpKSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMubWFwKHNlZyA9PiBbc2VnWzBdICsgbW9sZFZlcnRleENvdW50LCBzZWdbMV0gKyBtb2xkVmVydGV4Q291bnRdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMubWFwKHNlZyA9PiBbc2VnWzBdLCBzZWdbMF0gKyBtb2xkVmVydGV4Q291bnRdKSxcbiAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcGFyYW0ucGxhdGZvcm1MZW5ndGggPSBzZWdtZW50LmVuZC5kaXN0YW5jZVRvKHNlZ21lbnQuc3RhcnQpO1xuICAgICAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXG4gICAgICAgICAgICBzdGFydC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgIHN0YXJ0LmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpLFxuICAgICAgICBdO1xuICAgICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgM10sIFszLCAwXV07XG4gICAgICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbLi4ubW9sZFNoYXBlLnZlcnRpY2VzLFxuICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1wbGF0Zm9ybVRoaWNrbmVzcykpKSxcbiAgICAgICAgXTtcbiAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW1xuICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMsXG4gICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcy5tYXAoc2VnID0+IFtzZWdbMF0gKyA0LCBzZWdbMV0gKyA0XSksXG4gICAgICAgICAgICAgICAgWzAsIDRdLCBbMSwgNV0sIFsyLCA2XSwgWzMsIDddLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmNvbnN0IENvbHVtblN0ZXBUb2xlcmFuY2UgPSAxIC8gNTtcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUhhbmRyYWlsU2hhcGUoc3RhaXJQYXJhbSwgc2VnbWVudHMpIHtcbiAgICBjb25zdCB7IGhhbmRyYWlsOiB7IHN1cHBvcnQsIGhlaWdodCwgY29sdW1uOiB7IHN0ZXAgfSB9IH0gPSBzdGFpclBhcmFtO1xuICAgIGlmIChzZWdtZW50cy5sZW5ndGggJiYgc3VwcG9ydCkge1xuICAgICAgICBjb25zdCBoYW5kcmFpbHMgPSBbXTtcbiAgICAgICAgY29uc3QgdW5WaXNpdGVkID0gbmV3IFNldChzZWdtZW50cyk7XG4gICAgICAgIGNvbnN0IHZpc2l0ZWQgPSBuZXcgTWFwKCk7XG4gICAgICAgIGZvciAoY29uc3Qgc2VnbWVudCBvZiBzZWdtZW50cykge1xuICAgICAgICAgICAgaWYgKCFzZWdtZW50Lm1vbGRTaGFwZS50ZW1wTGluZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZpc2l0ZWQuc2V0KHNlZ21lbnQucGFyYW0uaW5kZXgsIHsgbGVmdDogZmFsc2UsIHJpZ2h0OiBmYWxzZSwgbGluZTNkSW5kZXhlczogbmV3IFNldCgpIH0pO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjdXJyZW50ID0gW3tcbiAgICAgICAgICAgICAgICBzZWdtZW50OiBzZWdtZW50c1swXSxcbiAgICAgICAgICAgICAgICBsaW5lM2RJbmQ6IGdldFNlZ21lbnRTdGFydEFuZEJhc2VMaW5lM2Qoc2VnbWVudHNbMF0sIHNlZ21lbnRzKS5zdGFydExpbmUubGluZTNkSW5kLFxuICAgICAgICAgICAgICAgIGxlZnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN0YXJ0OiB0cnVlLFxuICAgICAgICAgICAgfV07XG4gICAgICAgIGxldCBoYW5kcmFpbCA9IHsgcmFpbDogW10sIGNvbHVtbnM6IFtdIH07XG4gICAgICAgIGNvbnN0IHN0ZXBUb2xlcmFuY2UgPSBzdGVwICogQ29sdW1uU3RlcFRvbGVyYW5jZTtcbiAgICAgICAgd2hpbGUgKGN1cnJlbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgbmV4dCA9IFtdO1xuICAgICAgICAgICAgZm9yIChjb25zdCB7IHNlZ21lbnQ6IGN1cnJlbnRTZWdtZW50LCBsaW5lM2RJbmQsIHN0YXJ0UG9pbnQsIGxlZnQgfSBvZiBjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBwYXJhbTogeyBpbmRleCwgdHlwZSwgc3RhcnRXaWR0aCwgZW5kV2lkdGgsIGhvcml6b250YWxTdGVwLCB2ZXJ0aWNhbFN0ZXAsIHVwd2FyZCB9LCBzdGFydCwgZW5kLCBzdGFydEhlaWdodCwgZW5kSGVpZ2h0LCBtb2xkU2hhcGU6IHsgdmVydGljZXM6IG1vbGRWZXJ0aWNlcywgdGVtcExpbmVzOiBtb2xkVGVtcExpbmVzLCBzdGVwQ291bnQgfSwgbmV4dENvbXBvbmVudHMsIGJhc2VDb21wb25lbnQsIGNpcmNsZVRhbmdlbnQsIHN0YXJ0TG9ja2VkLCBjb21wb25lbnREaXJlY3Rpb25UeXBlLCBjaXJjdWxhclNpZGUsIH0gPSBjdXJyZW50U2VnbWVudDtcbiAgICAgICAgICAgICAgICB1blZpc2l0ZWQuZGVsZXRlKGN1cnJlbnRTZWdtZW50KTtcbiAgICAgICAgICAgICAgICBpZiAoIXN0YXJ0TG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBzdGVwSGVpZ2h0ID0gdXB3YXJkID8gdmVydGljYWxTdGVwIDogLXZlcnRpY2FsU3RlcDtcbiAgICAgICAgICAgICAgICBjb25zdCBvZmZzZXRMZW5ndGggPSBNYXRoLm1pbihIYW5kcmFpbERlZmF1bHRPZmZzZXRMZW5ndGgsIGhvcml6b250YWxTdGVwIC8gNCk7XG4gICAgICAgICAgICAgICAgY29uc3QgYmFzZVNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleChzZWdtZW50cywgYmFzZUNvbXBvbmVudCA9PT0gbnVsbCB8fCBiYXNlQ29tcG9uZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBiYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICBjb25zdCB7IHN0YXJ0TGluZTogeyBsaW5lM2RJbmQ6IHN0YXJ0TGluZTNkSW5kIH0sIGJhc2VMaW5lOiB7IGRpcjogYmFzZUxpbmUzZERpciwgZW5kV2l0aE9mZnNldDogYmFzZUxpbmUzZEVuZFdpdGhPZmZzZXQgfSwgfSA9IGdldFNlZ21lbnRTdGFydEFuZEJhc2VMaW5lM2QoY3VycmVudFNlZ21lbnQsIHNlZ21lbnRzLCBiYXNlU2VnbWVudCwgb2Zmc2V0TGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydFRvRW5kRGlyID0gZW5kLnN1YnRyYWN0ZWQoc3RhcnQpLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICBsZXQgZnJvbnREaXIgPSBjaXJjbGVUYW5nZW50ID8gY2lyY2xlVGFuZ2VudCA6IHN0YXJ0VG9FbmREaXI7XG4gICAgICAgICAgICAgICAgY29uc3QgYW5nbGUgPSBmcm9udERpci5hbmdsZShiYXNlTGluZTNkRGlyKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkZWx0YUFuZ2xlID0gTWF0aC5hYnMoYW5nbGUgLSBNYXRoLlBJIC8gMik7XG4gICAgICAgICAgICAgICAgaWYgKGRlbHRhQW5nbGUgPD0gRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgZnJvbnREaXIgPSBiYXNlTGluZTNkRGlyLmNyb3NzKERpcmVjdGlvblopLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGxlZnREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKGZyb250RGlyKTtcbiAgICAgICAgICAgICAgICBsZXQgc3AgPSBzdGFydC5hZGRlZChsZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIgKiAobGVmdCA/IDEgOiAtMSkpKTtcbiAgICAgICAgICAgICAgICBsZXQgZXAgPSBlbmQuYWRkZWQobGVmdERpci5tdWx0aXBsaWVkKGVuZFdpZHRoIC8gMiAqIChsZWZ0ID8gMSA6IC0xKSkpO1xuICAgICAgICAgICAgICAgIGxldCBsYXN0TGVuZ3RoID0gc3AuZGlzdGFuY2VUbyhlcCk7XG4gICAgICAgICAgICAgICAgbGV0IHNwVG9FcERpciA9IGVwLnN1YnRyYWN0ZWQoc3ApLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICBsZXQgbmV4dFN0YXJ0UG9pbnQgPSBsZWZ0ID8gc3AgOiBlcDtcbiAgICAgICAgICAgICAgICBsZXQgcHVzaEVuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgY29uc3QgbGluZTNkRGlyID0gbW9sZFZlcnRpY2VzW21vbGRUZW1wTGluZXNbbGluZTNkSW5kXVsxXV0uc3VidHJhY3RlZChtb2xkVmVydGljZXNbbW9sZFRlbXBMaW5lc1tsaW5lM2RJbmRdWzBdXSkubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgIGxldCBvZmZzZXREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKGxpbmUzZERpcik7XG4gICAgICAgICAgICAgICAgY29uc3QgdmlzaXRlZFJlY29yZCA9IHZpc2l0ZWQuZ2V0KGluZGV4KTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsaW5lM2QgPSBtb2xkVGVtcExpbmVzW2xpbmUzZEluZF07XG4gICAgICAgICAgICAgICAgICAgIHNwID0gc3RhcnRQb2ludCB8fCBtb2xkVmVydGljZXNbbGluZTNkWzBdXTtcbiAgICAgICAgICAgICAgICAgICAgZXAgPSBtb2xkVmVydGljZXNbbGluZTNkWzFdXTtcbiAgICAgICAgICAgICAgICAgICAgbGFzdExlbmd0aCA9IHNwLmRpc3RhbmNlVG8oZXApO1xuICAgICAgICAgICAgICAgICAgICBzcFRvRXBEaXIgPSBlcC5zdWJ0cmFjdGVkKHNwKS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRMaW5lM2RJbmQgPSAobGluZTNkSW5kICsgMSkgJSBtb2xkVGVtcExpbmVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmlzaXRlZExpbmUzZEluZGV4ZXMgPSB2aXNpdGVkUmVjb3JkID09PSBudWxsIHx8IHZpc2l0ZWRSZWNvcmQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZpc2l0ZWRSZWNvcmQubGluZTNkSW5kZXhlcztcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNFbnRyYW5jZSA9ICh2aXNpdGVkTGluZTNkSW5kZXhlcyA9PT0gbnVsbCB8fCB2aXNpdGVkTGluZTNkSW5kZXhlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmlzaXRlZExpbmUzZEluZGV4ZXMuaGFzKGxpbmUzZEluZCkpICYmICh2aXNpdGVkTGluZTNkSW5kZXhlcyA9PT0gbnVsbCB8fCB2aXNpdGVkTGluZTNkSW5kZXhlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmlzaXRlZExpbmUzZEluZGV4ZXMuaGFzKG5leHRMaW5lM2RJbmQpKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzRW50cmFuY2VTZWdtZW50ID0gbGluZTNkSW5kID09PSBzdGFydExpbmUzZEluZDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5lYXJlc3RTZWdtZW50O1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG5leHRTZWdtZW50SW5kZXggb2YgbmV4dENvbXBvbmVudHNbbGluZTNkSW5kXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dFNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleChzZWdtZW50cywgbmV4dFNlZ21lbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHN0YXJ0IH0gPSBuZXh0U2VnbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkcyA9IHN0YXJ0LmRpc3RhbmNlVG8oc3ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlID0gc3RhcnQuZGlzdGFuY2VUbyhlcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmlzaXROZXh0UmVjb3JkID0gdmlzaXRlZC5nZXQobmV4dFNlZ21lbnQucGFyYW0uaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRDb21wb25lbnRTdGFydExpbmUzZEluZCA9IGdldFNlZ21lbnRTdGFydEFuZEJhc2VMaW5lM2QobmV4dFNlZ21lbnQsIHNlZ21lbnRzLCB1bmRlZmluZWQsIG9mZnNldExlbmd0aCkuc3RhcnRMaW5lLmxpbmUzZEluZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNFcXVhbChkcyArIGRlLCBsYXN0TGVuZ3RoKSAmJiAhKHZpc2l0TmV4dFJlY29yZCA9PT0gbnVsbCB8fCB2aXNpdE5leHRSZWNvcmQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZpc2l0TmV4dFJlY29yZC5yaWdodCkgJiYgISh2aXNpdE5leHRSZWNvcmQgPT09IG51bGwgfHwgdmlzaXROZXh0UmVjb3JkID09PSB2b2lkIDAgPyB2b2lkIDAgOiB2aXNpdE5leHRSZWNvcmQubGluZTNkSW5kZXhlcy5oYXMobmV4dENvbXBvbmVudFN0YXJ0TGluZTNkSW5kKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFuZWFyZXN0U2VnbWVudCB8fCBuZWFyZXN0U2VnbWVudC5kaXN0YW5jZSA+IGRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWFyZXN0U2VnbWVudCA9IHsgc2VnbWVudDogbmV4dFNlZ21lbnQsIGRpc3RhbmNlOiBkcyB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0Qm90dG9tUHQgPSBzcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKS5hZGRlZChvZmZzZXREaXIubXVsdGlwbGllZChvZmZzZXRMZW5ndGgpKS5hZGRlZChsaW5lM2REaXIubXVsdGlwbGllZChzdGFydFBvaW50ID8gMCA6IG9mZnNldExlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbGFzdERpc3RhbmNlID0gTWF0aC5tYXgobGFzdExlbmd0aCAtIG9mZnNldExlbmd0aCwgMCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZWFyZXN0U2VnbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBlbmRPbkJhc2VMaW5lV2l0aE9mZnNldCB9ID0gZ2V0U2VnbWVudFN0YXJ0QW5kQmFzZUxpbmUzZChuZWFyZXN0U2VnbWVudC5zZWdtZW50LCBzZWdtZW50cywgdW5kZWZpbmVkLCBvZmZzZXRMZW5ndGgpLnN0YXJ0TGluZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVwID0gZW5kT25CYXNlTGluZVdpdGhPZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcFRvRXBEaXIgPSBlcC5zdWJ0cmFjdGVkKHNwKS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BUb0VwRGlyLmRvdChsaW5lM2REaXIpIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0RGlzdGFuY2UgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hFbmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U3RhcnRQb2ludCA9IHNwLmFkZGVkKGxpbmUzZERpci5tdWx0aXBsaWVkKG9mZnNldExlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdERpc3RhbmNlID0gc3AuZGlzdGFuY2VUbyhlcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFN0YXJ0UG9pbnQgPSBpc1BsYXRmb3JtKG5lYXJlc3RTZWdtZW50LnNlZ21lbnQpID8gZXAgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNFbnRyYW5jZSAmJiBoYXNFbnRyYW5jZVNlZ21lbnQgJiYgYmFzZVNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAvLyBkb24ndCBjYXJlIGJlY2F1c2UgbmV4dCBpcyBwbGF0Zm9ybSAobmV4dCB3aWxsIGRlYWwgdGhlIGNhc2UpIG9yIHN0YWlyIChvbmx5IGhhdmUgb25lIG5leHRDb21wb25lbnQgd2hpY2ggaXMgY3VycmVudFNlZ21lbnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAoYmFzZVNlZ21lbnQucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSAmJiBuZXh0U2libGluZ1NlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVwID0gYmFzZUxpbmUzZEVuZFdpdGhPZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcFRvRXBEaXIgPSBlcC5zdWJ0cmFjdGVkKHNwKS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BUb0VwRGlyLmRvdChiYXNlTGluZTNkRGlyKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdERpc3RhbmNlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoRW5kID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dENvcm5lckRpc3RhbmNlID0gZXAuZGlzdGFuY2VUbyhzcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRDb3JuZXJEaXN0YW5jZSA+IG9mZnNldExlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U3RhcnRQb2ludCA9IHNwLmFkZGVkKGxpbmUzZERpci5tdWx0aXBsaWVkKG9mZnNldExlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFN0YXJ0UG9pbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdERpc3RhbmNlID0gc3AuZGlzdGFuY2VUbyhlcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFN0YXJ0UG9pbnQgPSBpc1BsYXRmb3JtKGJhc2VTZWdtZW50KSA/IGVwIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzRW50cmFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3REaXN0YW5jZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBwdXNoRW5kID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwdXNoRW5kID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwdXNoRW5kID0gbGluZTNkSW5kID09PSBtb2xkVGVtcExpbmVzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3REaXN0YW5jZSA+IDAgfHwgKGxhc3REaXN0YW5jZSA9PT0gMCAmJiAhc3RhcnRQb2ludCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHB1c2ggcmFpbFxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWwucmFpbC5wdXNoKGZpcnN0Qm90dG9tUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCkpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBwdXNoIGNvbHVtbnNcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3REaXN0YW5jZSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRGlzdGFuY2UgPSBvZmZzZXRMZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAodGVtcERpc3RhbmNlIDw9IGxhc3REaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzRW5kID0gdGVtcERpc3RhbmNlID09PSBsYXN0RGlzdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYm90dG9tUG9pbnQgPSB0ZW1wRGlzdGFuY2UgPiAwID8gc3AuYWRkZWQoc3BUb0VwRGlyLm11bHRpcGxpZWQodGVtcERpc3RhbmNlKSkuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkuYWRkZWQob2Zmc2V0RGlyLm11bHRpcGxpZWQob2Zmc2V0TGVuZ3RoKSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdEJvdHRvbVB0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsLmNvbHVtbnMucHVzaChbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbVBvaW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b21Qb2ludC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsLnJhaWwucHVzaChib3R0b21Qb2ludC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWx0YURpc3RhbmNlID0gKGxhc3REaXN0YW5jZSAtIHRlbXBEaXN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcERpc3RhbmNlICs9IChkZWx0YURpc3RhbmNlIDw9IChzdGVwICsgc3RlcFRvbGVyYW5jZSkgJiYgZGVsdGFEaXN0YW5jZSA+PSBzdGVwVG9sZXJhbmNlKSA/IChwdXNoRW5kID8gZGVsdGFEaXN0YW5jZSA6IEluZmluaXR5KSA6IHN0ZXA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG5lYXJlc3RTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQ6IG5lYXJlc3RTZWdtZW50LnNlZ21lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZTNkSW5kOiBnZXRTZWdtZW50U3RhcnRBbmRCYXNlTGluZTNkKG5lYXJlc3RTZWdtZW50LnNlZ21lbnQsIHNlZ21lbnRzLCB1bmRlZmluZWQsIG9mZnNldExlbmd0aCkuc3RhcnRMaW5lLmxpbmUzZEluZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRQb2ludDogbmV4dFN0YXJ0UG9pbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0VudHJhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhc2VTZWdtZW50ICYmIGhhc0VudHJhbmNlU2VnbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgLy8gbmV2ZXIgaGFwcGVuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIChuZXh0U2libGluZ1NlZ21lbnQgJiYgYmFzZVNlZ21lbnQucGFyYW0udHlwZSAhPT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudDogYmFzZVNlZ21lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lM2RJbmQ6IGJhc2VTZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gPyAoYmFzZUNvbXBvbmVudCA9PT0gbnVsbCB8fCBiYXNlQ29tcG9uZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBiYXNlQ29tcG9uZW50LmxpbmUzZEluZGV4KSB8fCAwIDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFBvaW50OiBuZXh0U3RhcnRQb2ludCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBlbmQgb2YgdGhpcyBwYXRjaCwgdGhlIHBhdGNoIGFyZSBzdGFydCB3aXRoIHBsYXRmb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlscy5wdXNoKGhhbmRyYWlsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWwgPSB7IHJhaWw6IFtdLCBjb2x1bW5zOiBbXSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVuZCBvZiB0aGlzIGxpbmUzZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQ6IGN1cnJlbnRTZWdtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lM2RJbmQ6IG5leHRMaW5lM2RJbmQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB2aXNpdGVkTGluZTNkSW5kZXhlcyA9PT0gbnVsbCB8fCB2aXNpdGVkTGluZTNkSW5kZXhlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmlzaXRlZExpbmUzZEluZGV4ZXMuYWRkKGxpbmUzZEluZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2x1bW5BY3R1YWxIZWlnaHQgPSBoZWlnaHQgKyB2ZXJ0aWNhbFN0ZXAgLyAyO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpc1JpZ2h0U3RhaXIgPSBjb21wb25lbnREaXJlY3Rpb25UeXBlID09PSBDb21wb25lbnREaXJlY3Rpb25UeXBlLlJpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpc0xlZnRTdGFpciA9IGNvbXBvbmVudERpcmVjdGlvblR5cGUgPT09IENvbXBvbmVudERpcmVjdGlvblR5cGUuTGVmdDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhaXJSYWlsID0gW107XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YWlyQ29sdW1ucyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb3JuZXJCYXNlRGlyID0gKCFsZWZ0ICYmIGlzUmlnaHRTdGFpcikgfHwgKGxlZnQgJiYgaXNMZWZ0U3RhaXIpID8gbGVmdERpciA6IGJhc2VMaW5lM2REaXI7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb3JuZXJTdGFydEhlaWdodCA9IGxlZnQgPyBlbmRIZWlnaHQgOiBzdGFydEhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvcm5lclNpZGVXaWR0aCA9IGxlZnQgPyBlbmRXaWR0aCA6IHN0YXJ0V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzaWRlQ29ybmVyU3RhcnQgPSBsZWZ0ID8gZW5kIDogc3RhcnQ7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb3JuZXJFbmQgPSBzaWRlQ29ybmVyU3RhcnQuYWRkZWQoY29ybmVyQmFzZURpci5tdWx0aXBsaWVkKChjb3JuZXJTaWRlV2lkdGggLyAyICsgb2Zmc2V0TGVuZ3RoKSAqIChsZWZ0ID8gMSA6IC0xKSkpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29ybmVyRGlzdGFuY2UgPSAoc3RhcnRQb2ludCB8fCBzcCkuZGlzdGFuY2VUbyhjb3JuZXJFbmQpO1xuICAgICAgICAgICAgICAgICAgICAvLyBhbG9uZyBjb3JuZXJCYXNlRGlyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb3JuZXJTcFRvRXBEaXIgPSBjb3JuZXJFbmQuc3VidHJhY3RlZChzdGFydFBvaW50IHx8IHNwKS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb3JuZXJPZmZzZXREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKGNvcm5lclNwVG9FcERpcik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb3JuZXJBZGRpdGlvbmFsSGVpZ2h0ID0gIWxlZnQgJiYgIWlzTGVmdFN0YWlyICYmIHVwd2FyZCA/IHN0ZXBIZWlnaHQgOiAwO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkQ29ybmVyUmFpbCA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkQ29ybmVyQ29sdW1ucyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhcnRQb2ludCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBIZWFkRGlzdGFuY2UgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZENvcm5lclJhaWwucHVzaChzdGFydFBvaW50LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChjb3JuZXJTdGFydEhlaWdodCArIGNvcm5lckFkZGl0aW9uYWxIZWlnaHQgKyBoZWlnaHQpKS5hZGRlZChjb3JuZXJPZmZzZXREaXIubXVsdGlwbGllZChvZmZzZXRMZW5ndGgpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAodGVtcEhlYWREaXN0YW5jZSA8IGNvcm5lckRpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYm90dG9tUG9pbnQgPSBzdGFydFBvaW50LmFkZGVkKGNvcm5lclNwVG9FcERpci5tdWx0aXBsaWVkKHRlbXBIZWFkRGlzdGFuY2UpKS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoY29ybmVyU3RhcnRIZWlnaHQgKyBjb3JuZXJBZGRpdGlvbmFsSGVpZ2h0KSkuYWRkZWQoY29ybmVyT2Zmc2V0RGlyLm11bHRpcGxpZWQob2Zmc2V0TGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZENvcm5lckNvbHVtbnMucHVzaChbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbVBvaW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b21Qb2ludC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEhlYWREaXN0YW5jZSArPSBzdGVwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFsZWZ0ICYmIGlzTGVmdFN0YWlyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdEJvdHRvbVBvaW50ID0gY29ybmVyRW5kLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChjb3JuZXJTdGFydEhlaWdodCArIGNvcm5lckFkZGl0aW9uYWxIZWlnaHQpKS5hZGRlZChjb3JuZXJPZmZzZXREaXIubXVsdGlwbGllZChvZmZzZXRMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwdXNoIHJhaWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkQ29ybmVyUmFpbC5wdXNoKGxhc3RCb3R0b21Qb2ludC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoY29ybmVyRGlzdGFuY2UgLSB0ZW1wSGVhZERpc3RhbmNlICsgc3RlcCkgPiBzdGVwVG9sZXJhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRDb3JuZXJDb2x1bW5zLnB1c2goW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdEJvdHRvbVBvaW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdEJvdHRvbVBvaW50LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG5leHRTdGFydFBvaW50ID0gbGVmdCA/IHNwLmFkZGVkKGxpbmUzZERpci5tdWx0aXBsaWVkKG9mZnNldExlbmd0aCkpIDogZXAuYWRkZWQobGluZTNkRGlyLm11bHRpcGxpZWQoLW9mZnNldExlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICAvLyBuZXh0IHNlZ21lbnQgc3RhcnRXaWR0aCAhPT0gY3VycmVudFNlZ21lbnQgZW5kV2lkdGhcbiAgICAgICAgICAgICAgICAgICAgcHVzaEVuZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWFzb25hYmxlU3RlcENvdW50ID0gTWF0aC5jZWlsKHN0ZXAgLyBob3Jpem9udGFsU3RlcCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wU3RlcENvdW50ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJjQ2hvcmRBbmdsZSA9IGNpcmNsZVRhbmdlbnQgPyBzdGFydFRvRW5kRGlyLmFuZ2xlKGNpcmNsZVRhbmdlbnQpIDogMDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRGcm9udE9mZnNldExlbmd0aCA9IE1hdGgubWluKGhvcml6b250YWxTdGVwIC8gMiwgb2Zmc2V0TGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJldlRvdGFsU3RlcExlbmd0aCA9IChzdGVwQ291bnQgLSAxKSAqIGhvcml6b250YWxTdGVwO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcmV2VG90YWxWZXJTdGVwTGVuZ3RoID0gKHN0ZXBDb3VudCAtIDEpICogc3RlcEhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdG90YWxMZW5ndGggPSBNYXRoLmFicyhlbmQuc3VidHJhY3RlZChzdGFydCkuZG90KGZyb250RGlyKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RTdGVwTGVuZ3RoID0gbGFzdExlbmd0aCAtIHByZXZUb3RhbFN0ZXBMZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGxldCBsYXN0RnJvbnRPZmZzZXRMZW5ndGggPSBNYXRoLm1pbihsYXN0U3RlcExlbmd0aCAvIDIsIG9mZnNldExlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBDb21wb25lbnRUeXBlLlN0cmFpZ2h0U3RhaXIgfHwgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpciAmJiAoYXJjQ2hvcmRBbmdsZSA8PSBEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSB8fCAhY2lyY2xlVGFuZ2VudCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0TGVuZ3RoID0gc3AuZGlzdGFuY2VUbyhlcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwdXNoIHJhaWxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyUmFpbC5wdXNoKHNwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIGhlaWdodCArICh1cHdhcmQgPyAxIDogMCkgKiBzdGVwSGVpZ2h0KSkuYWRkZWQobGVmdERpci5tdWx0aXBsaWVkKGxlZnQgPyAtb2Zmc2V0TGVuZ3RoIDogb2Zmc2V0TGVuZ3RoKSkuYWRkZWQoZnJvbnREaXIubXVsdGlwbGllZChzdGFydEZyb250T2Zmc2V0TGVuZ3RoKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF1cHdhcmQgJiYgc3RlcENvdW50ID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyUmFpbC5wdXNoKHNwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIGhlaWdodCkpLmFkZGVkKGZyb250RGlyLm11bHRpcGxpZWQoaG9yaXpvbnRhbFN0ZXApKS5hZGRlZChsZWZ0RGlyLm11bHRpcGxpZWQobGVmdCA/IC1vZmZzZXRMZW5ndGggOiBvZmZzZXRMZW5ndGgpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwdXNoIGNvbHVtbnNcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0ZW1wU3RlcENvdW50IDwgc3RlcENvdW50IC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1ckhvclN0ZXBEaXN0YW5jZSA9ICh0ZW1wU3RlcENvdW50ICsgMC41KSAqIGhvcml6b250YWxTdGVwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1clZlclN0ZXBEaXN0YW5jZSA9ICh0ZW1wU3RlcENvdW50ICsgKHVwd2FyZCA/IDEgOiAwKSkgKiBzdGVwSGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjdXJDb2x1bW5BY3R1YWxIZWlnaHQgPSBjb2x1bW5BY3R1YWxIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVwd2FyZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJDb2x1bW5BY3R1YWxIZWlnaHQgPSAoY3VySG9yU3RlcERpc3RhbmNlIC0gbGFzdEZyb250T2Zmc2V0TGVuZ3RoKSAvIChwcmV2VG90YWxTdGVwTGVuZ3RoIC0gbGFzdEZyb250T2Zmc2V0TGVuZ3RoKSAqIHByZXZUb3RhbFZlclN0ZXBMZW5ndGggLSBjdXJWZXJTdGVwRGlzdGFuY2UgKyBzdGVwSGVpZ2h0ICsgaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VyQ29sdW1uQWN0dWFsSGVpZ2h0ID0gKDEgLSAoY3VySG9yU3RlcERpc3RhbmNlIC0gaG9yaXpvbnRhbFN0ZXApIC8gKGxhc3RMZW5ndGggLSBob3Jpem9udGFsU3RlcCAtIGxhc3RGcm9udE9mZnNldExlbmd0aCkpICogLXByZXZUb3RhbFZlclN0ZXBMZW5ndGggKyAoc3RlcENvdW50IC0gMSAtIHRlbXBTdGVwQ291bnQpICogc3RlcEhlaWdodCArIGhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYm90dG9tUG9pbnQgPSBzcC5hZGRlZChmcm9udERpci5tdWx0aXBsaWVkKGN1ckhvclN0ZXBEaXN0YW5jZSkpLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIGN1clZlclN0ZXBEaXN0YW5jZSkpLmFkZGVkKGxlZnREaXIubXVsdGlwbGllZChsZWZ0ID8gLW9mZnNldExlbmd0aCA6IG9mZnNldExlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyQ29sdW1ucy5wdXNoKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tUG9pbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbVBvaW50LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCghdXB3YXJkICYmIHRlbXBTdGVwQ291bnQgPT09IDAgPyBoZWlnaHQgOiBjdXJDb2x1bW5BY3R1YWxIZWlnaHQpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wU3RlcENvdW50ICs9IHJlYXNvbmFibGVTdGVwQ291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RlcENvdW50ID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1cHdhcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJSYWlsLnB1c2goc3AuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0ICsgaGVpZ2h0ICsgKHVwd2FyZCA/IHN0ZXBDb3VudCA6IChzdGVwQ291bnQgLSAoc3RlcENvdW50ID4gMiA/IDIgOiAxKSkpICogc3RlcEhlaWdodCkpLmFkZGVkKGZyb250RGlyLm11bHRpcGxpZWQoKHN0ZXBDb3VudCAtIDEpICogaG9yaXpvbnRhbFN0ZXApKS5hZGRlZChsZWZ0RGlyLm11bHRpcGxpZWQobGVmdCA/IC1vZmZzZXRMZW5ndGggOiBvZmZzZXRMZW5ndGgpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJSYWlsLnB1c2goc3AuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0ICsgaGVpZ2h0ICsgKHVwd2FyZCA/IHN0ZXBDb3VudCA6IHN0ZXBDb3VudCAtIDEpICogc3RlcEhlaWdodCkpLmFkZGVkKGZyb250RGlyLm11bHRpcGxpZWQodG90YWxMZW5ndGggLSBsYXN0RnJvbnRPZmZzZXRMZW5ndGgpKS5hZGRlZChsZWZ0RGlyLm11bHRpcGxpZWQobGVmdCA/IC1vZmZzZXRMZW5ndGggOiBvZmZzZXRMZW5ndGgpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGVtcFN0ZXBDb3VudCAtIHJlYXNvbmFibGVTdGVwQ291bnQgPD0gc3RlcENvdW50IC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RDb2x1bW5BY3R1YWxIZWlnaHQgPSAobGFzdFN0ZXBMZW5ndGggLyAyIC0gbGFzdEZyb250T2Zmc2V0TGVuZ3RoKSAvIChsYXN0TGVuZ3RoIC0gaG9yaXpvbnRhbFN0ZXAgLSBsYXN0RnJvbnRPZmZzZXRMZW5ndGgpICogLXByZXZUb3RhbFZlclN0ZXBMZW5ndGggKyBoZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdEJvdHRvbVBvaW50ID0gc3AuYWRkZWQoZnJvbnREaXIubXVsdGlwbGllZChwcmV2VG90YWxTdGVwTGVuZ3RoICsgbGFzdFN0ZXBMZW5ndGggLyAyKSkuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGVuZEhlaWdodCArICh1cHdhcmQgPyAwIDogLXN0ZXBIZWlnaHQpKSkuYWRkZWQobGVmdERpci5tdWx0aXBsaWVkKGxlZnQgPyAtb2Zmc2V0TGVuZ3RoIDogb2Zmc2V0TGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJDb2x1bW5zLnB1c2goW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0Qm90dG9tUG9pbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RCb3R0b21Qb2ludC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQodXB3YXJkID8gaGVpZ2h0IDogbGFzdENvbHVtbkFjdHVhbEhlaWdodCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBzZWdtZW50IHN0YXJ0V2lkdGggIT09IGN1cnJlbnRTZWdtZW50IGVuZFdpZHRoXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzcCA9IGxlZnQgPyBzdGFydC5hZGRlZChiYXNlTGluZTNkRGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSA6IGVuZC5hZGRlZChsZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcCA9IGxlZnQgPyBzdGFydC5hZGRlZChiYXNlTGluZTNkRGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIgLSBvZmZzZXRMZW5ndGgpKSA6IGVuZC5hZGRlZChsZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyICsgb2Zmc2V0TGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY2lyY2xlVGFuZ2VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFuZ2VudExlZnREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKGNpcmNsZVRhbmdlbnQpLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0RW5kRGlzdGFuY2UgPSBzdGFydC5kaXN0YW5jZVRvKGVuZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXhXaWR0aCA9IE1hdGgubWF4KHN0YXJ0V2lkdGgsIGVuZFdpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVuZEFuZ2xlID0gc3RhcnRUb0VuZERpci5hbmdsZVRvKGNpcmNsZVRhbmdlbnQsIERpcmVjdGlvblopO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNMZWZ0QXJjID0gY2lyY3VsYXJTaWRlID09PSBDaXJjdWxhclNpZGUuTGVmdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVuZENvbXBsZW1lbnRhcnlBbmdsZSA9IGlzTGVmdEFyYyA/IE1hdGguYWJzKGVuZEFuZ2xlIC0gTWF0aC5QSSAvIDIgLSBNYXRoLlBJKSA6IE1hdGguYWJzKGVuZEFuZ2xlIC0gTWF0aC5QSSAvIDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFsZkNob3JkID0gc3RhcnRFbmREaXN0YW5jZSAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByYWRpdXMgPSBoYWxmQ2hvcmQgLyBNYXRoLmNvcyhlbmRDb21wbGVtZW50YXJ5QW5nbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5uZXJSYWRpdXMgPSByYWRpdXMgLSBtYXhXaWR0aCAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBob3Jpem9udGFsU3RlcEFuZ2xlID0gTWF0aC5hc2luKGhvcml6b250YWxTdGVwIC8gMiAvIGlubmVyUmFkaXVzKSAqIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjaXJjbGVOb3JtYWwgPSBpc0xlZnRBcmMgPyBEaXJlY3Rpb25aIDogRGlyZWN0aW9uWi5yZXZlcnNlZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2lyY2xlQ2VudGVyID0gc3RhcnQuYWRkZWQodGFuZ2VudExlZnREaXIubXVsdGlwbGllZChpc0xlZnRBcmMgPyByYWRpdXMgOiAtcmFkaXVzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhcmMgPSBHZW9tTGliLmNyZWF0ZUFyYzNkQnlDZW50ZXJOb3JtYWxSYWRpdXMoY2lyY2xlQ2VudGVyLCBjaXJjbGVOb3JtYWwsIHJhZGl1cywgc3RhcnQsIGVuZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhcmNBbmdsZSA9IGFyYy5hcmNBbmdsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RIb3Jpem9udGFsQW5nbGUgPSBhcmNBbmdsZSAtIGhvcml6b250YWxTdGVwQW5nbGUgKiAoc3RlcENvdW50IC0gMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFydFJhZGl1c0RpciA9IGlzTGVmdEFyYyA/IHRhbmdlbnRMZWZ0RGlyLnJldmVyc2VkKCkgOiB0YW5nZW50TGVmdERpcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHB1c2ggY29sdW1uc1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHRlbXBTdGVwQ291bnQgPCBzdGVwQ291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJSb3RhdGVBbmdsZSA9IGhvcml6b250YWxTdGVwQW5nbGUgKiB0ZW1wU3RlcENvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRSb3RhdGVBbmdsZSA9IGhvcml6b250YWxTdGVwQW5nbGUgKiB0ZW1wU3RlcENvdW50ICsgKHRlbXBTdGVwQ291bnQgPT09IHN0ZXBDb3VudCAtIDEgPyBsYXN0SG9yaXpvbnRhbEFuZ2xlIDogaG9yaXpvbnRhbFN0ZXBBbmdsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyUm90YXRlTWF0cml4ID0gR2VvbUxpYi5jcmVhdGVSb3RhdGVNYXRyaXg0KGhvcml6b250YWxTdGVwQW5nbGUgKiB0ZW1wU3RlcENvdW50LCBjaXJjbGVOb3JtYWwsIGR1bW15UG9pbnQzZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dFJvdGF0ZU1hdHJpeCA9IEdlb21MaWIuY3JlYXRlUm90YXRlTWF0cml4NChuZXh0Um90YXRlQW5nbGUsIGNpcmNsZU5vcm1hbCwgZHVtbXlQb2ludDNkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJSYWRpdXNEaXIgPSBzdGFydFJhZGl1c0Rpci5hcHBsaWVkTWF0cml4NChjdXJSb3RhdGVNYXRyaXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRSYWRpdXNEaXIgPSBzdGFydFJhZGl1c0Rpci5hcHBsaWVkTWF0cml4NChuZXh0Um90YXRlTWF0cml4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJIYWxmV2lkdGggPSAoc3RhcnRXaWR0aCArIChlbmRXaWR0aCAtIHN0YXJ0V2lkdGgpICogKGN1clJvdGF0ZUFuZ2xlKSAvIGFyY0FuZ2xlKSAvIDIgKiAoaXNMZWZ0QXJjID8gLTEgOiAxKSAtIG9mZnNldExlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0SGFsZldpZHRoID0gKHN0YXJ0V2lkdGggKyAoZW5kV2lkdGggLSBzdGFydFdpZHRoKSAqIChuZXh0Um90YXRlQW5nbGUpIC8gYXJjQW5nbGUpIC8gMiAqIChpc0xlZnRBcmMgPyAtMSA6IDEpIC0gb2Zmc2V0TGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1ckxlZnRNb2xkUHQgPSBjaXJjbGVDZW50ZXIuYWRkZWQoY3VyUmFkaXVzRGlyLm11bHRpcGxpZWQocmFkaXVzICsgY3VySGFsZldpZHRoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyUmlnaHRNb2xkUHQgPSBjaXJjbGVDZW50ZXIuYWRkZWQoY3VyUmFkaXVzRGlyLm11bHRpcGxpZWQocmFkaXVzIC0gY3VySGFsZldpZHRoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dExlZnRNb2xkUHQgPSBjaXJjbGVDZW50ZXIuYWRkZWQobmV4dFJhZGl1c0Rpci5tdWx0aXBsaWVkKHJhZGl1cyArIG5leHRIYWxmV2lkdGgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0UmlnaHRNb2xkUHQgPSBjaXJjbGVDZW50ZXIuYWRkZWQobmV4dFJhZGl1c0Rpci5tdWx0aXBsaWVkKHJhZGl1cyAtIG5leHRIYWxmV2lkdGgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJTdGVwTGVmdEZyb250RGlyID0gbmV4dExlZnRNb2xkUHQuc3VidHJhY3RlZChjdXJMZWZ0TW9sZFB0KS5tdWx0aXBsaWVkKDAuNSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyU3RlcFJpZ2h0RnJvbnREaXIgPSBuZXh0UmlnaHRNb2xkUHQuc3VidHJhY3RlZChjdXJSaWdodE1vbGRQdCkubXVsdGlwbGllZCgwLjUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1clN0ZXBMZWZ0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhjdXJTdGVwTGVmdEZyb250RGlyKS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgY3VyU3RlcFJpZ2h0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhjdXJTdGVwUmlnaHRGcm9udERpcikubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1ckxlZnRCb3R0b21QdCA9IGN1ckxlZnRNb2xkUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0ICsgKHRlbXBTdGVwQ291bnQgKyAodXB3YXJkID8gMSA6IDApKSAqIHN0ZXBIZWlnaHQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJSaWdodEJvdHRvbVB0ID0gY3VyUmlnaHRNb2xkUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0ICsgKHRlbXBTdGVwQ291bnQgKyAodXB3YXJkID8gMSA6IDApKSAqIHN0ZXBIZWlnaHQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJMZWZ0Qm90dG9tTWlkUHQgPSBjdXJMZWZ0Qm90dG9tUHQuYWRkZWQoY3VyU3RlcExlZnRGcm9udERpcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyUmlnaHRCb3R0b21NaWRQdCA9IGN1clJpZ2h0Qm90dG9tUHQuYWRkZWQoY3VyU3RlcFJpZ2h0RnJvbnREaXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZW1wU3RlcENvdW50ID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHVzaCByYWlsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZWZ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpclJhaWwucHVzaChjdXJMZWZ0Qm90dG9tUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCArICh0ZW1wU3RlcENvdW50ID4gMCAmJiAhdXB3YXJkID8gLXN0ZXBIZWlnaHQgOiAwKSkpLmFkZGVkKGN1clN0ZXBMZWZ0RnJvbnREaXIubm9ybWFsaXplZCgpLm11bHRpcGxpZWQodGVtcFN0ZXBDb3VudCA9PT0gMCA/IHN0YXJ0RnJvbnRPZmZzZXRMZW5ndGggOiAwKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJSYWlsLnB1c2goY3VyUmlnaHRCb3R0b21QdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0ICsgKHRlbXBTdGVwQ291bnQgPiAwICYmICF1cHdhcmQgPyAtc3RlcEhlaWdodCA6IDApKSkuYWRkZWQoY3VyU3RlcFJpZ2h0RnJvbnREaXIubm9ybWFsaXplZCgpLm11bHRpcGxpZWQodGVtcFN0ZXBDb3VudCA9PT0gMCA/IHN0YXJ0RnJvbnRPZmZzZXRMZW5ndGggOiAwKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZW1wU3RlcENvdW50ID09PSBzdGVwQ291bnQgLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0U3RlcFBlcmNlbnQgPSBsYXN0SG9yaXpvbnRhbEFuZ2xlIC8gaG9yaXpvbnRhbFN0ZXBBbmdsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RMZWZ0SG9yU3RlcCA9IChyYWRpdXMgKyBjdXJIYWxmV2lkdGgpIC8gcmFkaXVzICogaG9yaXpvbnRhbFN0ZXAgKiBsYXN0U3RlcFBlcmNlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0UmlnaHRIb3JTdGVwID0gKHJhZGl1cyAtIGN1ckhhbGZXaWR0aCkgLyByYWRpdXMgKiBob3Jpem9udGFsU3RlcCAqIGxhc3RTdGVwUGVyY2VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IG9mZnNldEFuZ2xlID0gb2Zmc2V0TGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0RnJvbnRPZmZzZXRMZW5ndGggPSBNYXRoLm1pbihvZmZzZXRMZW5ndGgsIGxhc3RTdGVwUGVyY2VudCAvIDIgKiBob3Jpem9udGFsU3RlcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0U2lkZUhvclN0ZXAgPSBsZWZ0ID8gbGFzdExlZnRIb3JTdGVwIDogbGFzdFJpZ2h0SG9yU3RlcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RDb2x1bW5BY3R1YWxIZWlnaHQgPSAtc3RlcEhlaWdodCAqIE1hdGgubWF4KChsYXN0U2lkZUhvclN0ZXAgLyAyIC0gbGFzdEZyb250T2Zmc2V0TGVuZ3RoKSAvIChsYXN0U2lkZUhvclN0ZXAgLSBsYXN0RnJvbnRPZmZzZXRMZW5ndGgpLCAwKSArIGhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZWZ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJSYWlsLnB1c2goY3VyTGVmdEJvdHRvbU1pZFB0LmFkZGVkKGN1clN0ZXBMZWZ0RnJvbnREaXIpLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKS5hZGRlZChjdXJTdGVwTGVmdEZyb250RGlyLm5vcm1hbGl6ZWQoKS5tdWx0aXBsaWVkKC1sYXN0RnJvbnRPZmZzZXRMZW5ndGgpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpclJhaWwucHVzaChjdXJSaWdodEJvdHRvbU1pZFB0LmFkZGVkKGN1clN0ZXBSaWdodEZyb250RGlyKS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSkuYWRkZWQoY3VyU3RlcFJpZ2h0RnJvbnREaXIubm9ybWFsaXplZCgpLm11bHRpcGxpZWQoLWxhc3RGcm9udE9mZnNldExlbmd0aCkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyQ29sdW1ucy5wdXNoKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0ID8gY3VyTGVmdEJvdHRvbU1pZFB0IDogY3VyUmlnaHRCb3R0b21NaWRQdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobGVmdCA/IGN1ckxlZnRCb3R0b21NaWRQdCA6IGN1clJpZ2h0Qm90dG9tTWlkUHQpLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCh1cHdhcmQgPyBoZWlnaHQgOiBsYXN0Q29sdW1uQWN0dWFsSGVpZ2h0KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5leHQgc2VnbWVudCBzdGFydFdpZHRoICE9PSBjdXJyZW50U2VnbWVudCBlbmRXaWR0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3AgPSBsZWZ0ID8gc3RhcnQuYWRkZWQoYmFzZUxpbmUzZERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSkgOiBuZXh0UmlnaHRNb2xkUHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcCA9IGxlZnQgPyBzdGFydC5hZGRlZChiYXNlTGluZTNkRGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIgLSBvZmZzZXRMZW5ndGgpKSA6IG5leHRSaWdodE1vbGRQdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbGVmdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnREaXIgPSBjdXJTdGVwTGVmdERpcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGVtcFN0ZXBDb3VudCAlIHJlYXNvbmFibGVTdGVwQ291bnQgPT09IDAgJiYgdGVtcFN0ZXBDb3VudCA8IHN0ZXBDb3VudCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0Q29sdW1uQWN0dWFsSGVpZ2h0ID0gY29sdW1uQWN0dWFsSGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGVtcFN0ZXBDb3VudCA9PT0gMCAmJiB1cHdhcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0TGVmdEhvclN0ZXAgPSAocmFkaXVzICsgY3VySGFsZldpZHRoKSAvIHJhZGl1cyAqIGhvcml6b250YWxTdGVwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRSaWdodEhvclN0ZXAgPSAocmFkaXVzIC0gY3VySGFsZldpZHRoKSAvIHJhZGl1cyAqIGhvcml6b250YWxTdGVwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRTaWRlSG9yU3RlcCA9IGxlZnQgPyBzdGFydExlZnRIb3JTdGVwIDogc3RhcnRSaWdodEhvclN0ZXA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydENvbHVtbkFjdHVhbEhlaWdodCA9IHN0ZXBIZWlnaHQgKiAoc3RhcnRTaWRlSG9yU3RlcCAvIDIgLSBzdGFydEZyb250T2Zmc2V0TGVuZ3RoKSAvIChzdGFydFNpZGVIb3JTdGVwIC0gc3RhcnRGcm9udE9mZnNldExlbmd0aCkgKyBoZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJDb2x1bW5zLnB1c2goW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdCA/IGN1ckxlZnRCb3R0b21NaWRQdCA6IGN1clJpZ2h0Qm90dG9tTWlkUHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobGVmdCA/IGN1ckxlZnRCb3R0b21NaWRQdCA6IGN1clJpZ2h0Qm90dG9tTWlkUHQpLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCgodGVtcFN0ZXBDb3VudCA9PT0gMCA/ICh1cHdhcmQgPyBzdGFydENvbHVtbkFjdHVhbEhlaWdodCA6IGhlaWdodCkgOiBjb2x1bW5BY3R1YWxIZWlnaHQpKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wU3RlcENvdW50ICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWwucmFpbC5wdXNoKC4uLmhlYWRDb3JuZXJSYWlsKTtcbiAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWwuY29sdW1ucy5wdXNoKC4uLmhlYWRDb3JuZXJDb2x1bW5zKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxlZnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsLnJhaWwucHVzaCguLi5zdGFpclJhaWwucmV2ZXJzZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsLmNvbHVtbnMucHVzaCguLi5zdGFpckNvbHVtbnMucmV2ZXJzZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsLnJhaWwucHVzaCguLi5zdGFpclJhaWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWwuY29sdW1ucy5wdXNoKC4uLnN0YWlyQ29sdW1ucyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YWlyTmV4dFNlZ21lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbmV4dFNlZ21lbnRJbmRleCBvZiBuZXh0Q29tcG9uZW50c1tsaW5lM2RJbmRdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0U2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHNlZ21lbnRzLCBuZXh0U2VnbWVudEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRTZWdtZW50VmlzaXRlZFJlY29yZCA9IHZpc2l0ZWQuZ2V0KChuZXh0U2VnbWVudCA9PT0gbnVsbCB8fCBuZXh0U2VnbWVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogbmV4dFNlZ21lbnQucGFyYW0uaW5kZXgpIHx8IC0xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0U2VnbWVudCAmJiAoKGlzUGxhdGZvcm0obmV4dFNlZ21lbnQpICYmICEobmV4dFNlZ21lbnRWaXNpdGVkUmVjb3JkID09PSBudWxsIHx8IG5leHRTZWdtZW50VmlzaXRlZFJlY29yZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogbmV4dFNlZ21lbnRWaXNpdGVkUmVjb3JkLmxpbmUzZEluZGV4ZXMuc2l6ZSkpIHx8ICghaXNQbGF0Zm9ybShuZXh0U2VnbWVudCkgJiYgIShuZXh0U2VnbWVudFZpc2l0ZWRSZWNvcmQgPT09IG51bGwgfHwgbmV4dFNlZ21lbnRWaXNpdGVkUmVjb3JkID09PSB2b2lkIDAgPyB2b2lkIDAgOiBuZXh0U2VnbWVudFZpc2l0ZWRSZWNvcmQucmlnaHQpKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpck5leHRTZWdtZW50ID0gbmV4dFNlZ21lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxlZnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiYXNlU2VnbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAvLyBuZXZlciBoYXBwZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAobmV4dFNpYmxpbmdTZWdtZW50ICYmIGJhc2VTZWdtZW50LnBhcmFtLnR5cGUgIT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcCA9IGJhc2VMaW5lM2RFbmRXaXRoT2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwVG9FcERpciA9IGVwLnN1YnRyYWN0ZWQoc3ApLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BUb0VwRGlyLmRvdChiYXNlTGluZTNkRGlyKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTdGFydFBvaW50ID0gc3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoRW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFN0YXJ0UG9pbnQgPSBpc1BsYXRmb3JtKGJhc2VTZWdtZW50KSA/IGVwIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQ6IGJhc2VTZWdtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lM2RJbmQ6IGJhc2VTZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gPyAoYmFzZUNvbXBvbmVudCA9PT0gbnVsbCB8fCBiYXNlQ29tcG9uZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBiYXNlQ29tcG9uZW50LmxpbmUzZEluZGV4KSB8fCAwIDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFBvaW50OiBuZXh0U3RhcnRQb2ludCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVuZCB0aGUgcGF0Y2ggd2hpY2ggaXMgc3RhcnQgd2l0aCBjdXJyZW50U2VnbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlscy5wdXNoKGhhbmRyYWlsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbCA9IHsgcmFpbDogW10sIGNvbHVtbnM6IFtdIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmlzaXRlZFJlY29yZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2l0ZWRSZWNvcmQubGVmdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhaXJOZXh0U2VnbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgbGluZTNkSW5kOiBzdGFpck5leHRMaW5lM2RJbmQsIGVuZE9uQmFzZUxpbmVXaXRoT2Zmc2V0IH0gPSBnZXRTZWdtZW50U3RhcnRBbmRCYXNlTGluZTNkKHN0YWlyTmV4dFNlZ21lbnQsIHNlZ21lbnRzLCBjdXJyZW50U2VnbWVudCwgb2Zmc2V0TGVuZ3RoKS5zdGFydExpbmU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXAgPSBlbmRPbkJhc2VMaW5lV2l0aE9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcFRvRXBEaXIgPSBlcC5zdWJ0cmFjdGVkKHNwKS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwVG9FcERpci5kb3QobGluZTNkRGlyKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTdGFydFBvaW50ID0gc3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoRW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFN0YXJ0UG9pbnQgPSBpc1BsYXRmb3JtKHN0YWlyTmV4dFNlZ21lbnQpID8gZXAgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQ6IHN0YWlyTmV4dFNlZ21lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUzZEluZDogc3RhaXJOZXh0TGluZTNkSW5kLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFBvaW50OiBuZXh0U3RhcnRQb2ludCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQ6IGN1cnJlbnRTZWdtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lM2RJbmQ6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3RhcnRQb2ludDogbmV4dFN0YXJ0UG9pbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZW5kIHRoZSBwYXRjaCB3aGljaCBpcyBlbmQgd2l0aCBzdGFpciBjb21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbHMucHVzaChoYW5kcmFpbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWwgPSB7IHJhaWw6IFtdLCBjb2x1bW5zOiBbXSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZpc2l0ZWRSZWNvcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNpdGVkUmVjb3JkLnJpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocHVzaEVuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGN1cnJlbnRDb3JuZXJTaWRlV2lkdGggPSBsZWZ0ID8gc3RhcnRXaWR0aCA6IGVuZFdpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGN1cnJlbnRTaWRlQ29ybmVyU3RhcnQgPSBsZWZ0ID8gc3RhcnQgOiBlbmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlcCBpcyByZXVzZWQgd2hlbiBwdXNoRW5kXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcFRhaWxEaXN0YW5jZSA9IHN0ZXA7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBsZXQgdGVtcFRhaWxEaXN0YW5jZSA9IGxlZnQgPyAwIDogc3RlcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZWZ0ICYmIGlzTGVmdFN0YWlyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3AgPSBzdGFydC5hZGRlZChsZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIgLSBvZmZzZXRMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcm5lclN0YXJ0SGVpZ2h0ID0gbGVmdCA/IHN0YXJ0SGVpZ2h0IDogZW5kSGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29ybmVyRW5kID0gZXA7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3JuZXJEaXN0YW5jZSA9IHNwLmRpc3RhbmNlVG8oY29ybmVyRW5kKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFsb25nIGNvcm5lckJhc2VEaXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcm5lclNwVG9FcERpciA9IGNvcm5lckVuZC5zdWJ0cmFjdGVkKHNwKS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3JuZXJPZmZzZXREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKGNvcm5lclNwVG9FcERpcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3JuZXJBZGRpdGlvbmFsSGVpZ2h0ID0gbGVmdCAmJiAhaXNSaWdodFN0YWlyICYmIHVwd2FyZCA/IHN0ZXBIZWlnaHQgOiAoIWxlZnQgJiYgIXVwd2FyZCA/IC1zdGVwSGVpZ2h0IDogMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb3JuZXJTcFRvRXBEaXIgPSBjb3JuZXJFbmQuc3VidHJhY3RlZChzcCkubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29ybmVyT2Zmc2V0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhjb3JuZXJTcFRvRXBEaXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHRlbXBUYWlsRGlzdGFuY2UgPCBjb3JuZXJEaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvdHRvbVBvaW50ID0gc3AuYWRkZWQoY29ybmVyU3BUb0VwRGlyLm11bHRpcGxpZWQodGVtcFRhaWxEaXN0YW5jZSkpLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChjb3JuZXJTdGFydEhlaWdodCArIGNvcm5lckFkZGl0aW9uYWxIZWlnaHQpKS5hZGRlZChjb3JuZXJPZmZzZXREaXIubXVsdGlwbGllZChvZmZzZXRMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5jb2x1bW5zLnB1c2goW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b21Qb2ludCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tUG9pbnQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBUYWlsRGlzdGFuY2UgKz0gc3RlcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RCb3R0b21Qb2ludCA9IGVwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChjb3JuZXJTdGFydEhlaWdodCArIGNvcm5lckFkZGl0aW9uYWxIZWlnaHQpKS5hZGRlZChjb3JuZXJPZmZzZXREaXIubXVsdGlwbGllZChvZmZzZXRMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IGxhc3RCb3R0b21Qb2ludCA9IGVwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChsZWZ0ID8gZW5kSGVpZ2h0IDogc3RhcnRIZWlnaHQpKS5hZGRlZChjb3JuZXJPZmZzZXREaXIubXVsdGlwbGllZChvZmZzZXRMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZWZ0ICYmIGlzUmlnaHRTdGFpcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsLnJhaWwucHVzaChzcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoY29ybmVyU3RhcnRIZWlnaHQgKyBoZWlnaHQgKyBjb3JuZXJBZGRpdGlvbmFsSGVpZ2h0KSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHVzaCByYWlsXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5yYWlsLnB1c2gobGFzdEJvdHRvbVBvaW50LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGNvcm5lckRpc3RhbmNlIC0gdGVtcFRhaWxEaXN0YW5jZSArIHN0ZXApID4gc3RlcFRvbGVyYW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsLmNvbHVtbnMucHVzaChbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RCb3R0b21Qb2ludCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdEJvdHRvbVBvaW50LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJlbnQgPSBuZXh0O1xuICAgICAgICAgICAgaWYgKCFjdXJyZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGlmICh1blZpc2l0ZWQuc2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVTZWdtZW50ID0gWy4uLnVuVmlzaXRlZC52YWx1ZXMoKV1bMF07XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQ6IHRoZVNlZ21lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZTNkSW5kOiBnZXRTZWdtZW50U3RhcnRBbmRCYXNlTGluZTNkKHRoZVNlZ21lbnQsIHNlZ21lbnRzKS5zdGFydExpbmUubGluZTNkSW5kLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoYW5kcmFpbHM7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2VuZXJhdGVUZW1wTGluZXNMb29wKHZlcnRleENvdW50KSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IHZlcnRleENvdW50IH0pLm1hcCgoXywgaSkgPT4gW2ksIGkgPT09IHZlcnRleENvdW50IC0gMSA/IDAgOiBpICsgMV0pO1xufVxuZnVuY3Rpb24gZ2V0U2VnbWVudFN0YXJ0QW5kQmFzZUxpbmUzZChzZWdtZW50LCBzZWdtZW50cywgYmFzZVNlZ21lbnQsIG9mZnNldExlbmd0aCkge1xuICAgIGNvbnN0IHsgc3RhcnQsIHBhcmFtOiB7IHR5cGUsIHN0YXJ0V2lkdGggfSwgY29tcG9uZW50RGlyZWN0aW9uVHlwZSwgbW9sZFNoYXBlOiB7IHRlbXBMaW5lcywgdmVydGljZXMgfSwgYmFzZUNvbXBvbmVudCB9ID0gc2VnbWVudDtcbiAgICBpZiAob2Zmc2V0TGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgb2Zmc2V0TGVuZ3RoID0gSGFuZHJhaWxEZWZhdWx0T2Zmc2V0TGVuZ3RoO1xuICAgIH1cbiAgICBsZXQgc3RhcnRMaW5lM2RJbmQgPSAwO1xuICAgIC8vIDUgZWRnZXNcbiAgICBpZiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSAmJiBjb21wb25lbnREaXJlY3Rpb25UeXBlID09PSBDb21wb25lbnREaXJlY3Rpb25UeXBlLlJpZ2h0RnJvbnQgJiYgdGVtcExpbmVzLmxlbmd0aCA+IDQpIHtcbiAgICAgICAgc3RhcnRMaW5lM2RJbmQgPSAxO1xuICAgIH1cbiAgICBjb25zdCBzdGFydExpbmUzZCA9IHRlbXBMaW5lc1tzdGFydExpbmUzZEluZF07XG4gICAgY29uc3Qgc3RhcnRMaW5lM2RTdGFydCA9IHZlcnRpY2VzW3N0YXJ0TGluZTNkWzBdXTtcbiAgICBjb25zdCBzdGFydExpbmUzZEVuZCA9IHZlcnRpY2VzW3N0YXJ0TGluZTNkWzFdXTtcbiAgICBjb25zdCBzdGFydExpbmUzZERpciA9IHN0YXJ0TGluZTNkRW5kLnN1YnRyYWN0ZWQoc3RhcnRMaW5lM2RTdGFydCkubm9ybWFsaXplZCgpO1xuICAgIGxldCBiYXNlTGluZTNkSW5kID0gKGJhc2VDb21wb25lbnQgPT09IG51bGwgfHwgYmFzZUNvbXBvbmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmFzZUNvbXBvbmVudC5jb21wb25lbnRJbmRleCkgfHwgMDtcbiAgICBsZXQgYmFzZUxpbmUzZCA9IFsuLi5zdGFydExpbmUzZF0ucmV2ZXJzZSgpO1xuICAgIGxldCBiYXNlTGluZTNkU3RhcnQgPSB2ZXJ0aWNlc1tzdGFydExpbmUzZFsxXV07XG4gICAgbGV0IGJhc2VMaW5lM2RFbmQgPSB2ZXJ0aWNlc1tzdGFydExpbmUzZFswXV07XG4gICAgbGV0IGJhc2VMaW5lM2REaXIgPSBzdGFydExpbmUzZERpci5yZXZlcnNlZCgpO1xuICAgIDtcbiAgICBpZiAoIWJhc2VTZWdtZW50ICYmIGJhc2VDb21wb25lbnQpIHtcbiAgICAgICAgYmFzZVNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleChzZWdtZW50cywgYmFzZUNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgfVxuICAgIGlmIChiYXNlU2VnbWVudCkge1xuICAgICAgICBjb25zdCB7IG1vbGRTaGFwZTogeyB2ZXJ0aWNlczogYmFzZVZlcnRpY2VzLCB0ZW1wTGluZXM6IGJhc2VUZW1wTGluZXMgfSB9ID0gYmFzZVNlZ21lbnQ7XG4gICAgICAgIGJhc2VMaW5lM2QgPSBiYXNlU2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtID8gYmFzZVRlbXBMaW5lc1soYmFzZUNvbXBvbmVudCA9PT0gbnVsbCB8fCBiYXNlQ29tcG9uZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBiYXNlQ29tcG9uZW50LmxpbmUzZEluZGV4KSB8fCAwXSA6IFsuLi5iYXNlVGVtcExpbmVzW2Jhc2VUZW1wTGluZXMubGVuZ3RoIC0gMV1dLnJldmVyc2UoKTtcbiAgICAgICAgYmFzZUxpbmUzZFN0YXJ0ID0gYmFzZVZlcnRpY2VzW2Jhc2VMaW5lM2RbMF1dO1xuICAgICAgICBiYXNlTGluZTNkRW5kID0gYmFzZVZlcnRpY2VzW2Jhc2VMaW5lM2RbMV1dO1xuICAgICAgICBiYXNlTGluZTNkRGlyID0gYmFzZUxpbmUzZEVuZC5zdWJ0cmFjdGVkKGJhc2VMaW5lM2RTdGFydCkubm9ybWFsaXplZCgpO1xuICAgIH1cbiAgICBsZXQgYmFzZUxpbmUzZFN0YXJ0V2l0aE9mZnNldCA9IGJhc2VMaW5lM2RTdGFydC5hZGRlZChiYXNlTGluZTNkRGlyLm11bHRpcGxpZWQob2Zmc2V0TGVuZ3RoKSk7XG4gICAgbGV0IGJhc2VMaW5lM2RFbmRXaXRoT2Zmc2V0ID0gYmFzZUxpbmUzZEVuZC5hZGRlZChiYXNlTGluZTNkRGlyLm11bHRpcGxpZWQoLW9mZnNldExlbmd0aCkpO1xuICAgIGxldCBzdGFydE9uQmFzZUxpbmUgPSBzdGFydExpbmUzZFN0YXJ0O1xuICAgIGxldCBlbmRPbkJhc2VMaW5lID0gc3RhcnRMaW5lM2RFbmQ7XG4gICAgbGV0IHN0YXJ0T25CYXNlTGluZVdpdGhPZmZzZXQgPSBzdGFydExpbmUzZFN0YXJ0LmFkZGVkKHN0YXJ0TGluZTNkRGlyLm11bHRpcGxpZWQob2Zmc2V0TGVuZ3RoKSk7XG4gICAgbGV0IGVuZE9uQmFzZUxpbmVXaXRoT2Zmc2V0ID0gc3RhcnRMaW5lM2RFbmQuYWRkZWQoc3RhcnRMaW5lM2REaXIubXVsdGlwbGllZCgtb2Zmc2V0TGVuZ3RoKSk7XG4gICAgaWYgKHR5cGUgIT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcbiAgICAgICAgc3RhcnRPbkJhc2VMaW5lID0gc3RhcnQuYWRkZWQoYmFzZUxpbmUzZERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSk7XG4gICAgICAgIGVuZE9uQmFzZUxpbmUgPSBzdGFydC5hZGRlZChiYXNlTGluZTNkRGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSk7XG4gICAgICAgIHN0YXJ0T25CYXNlTGluZVdpdGhPZmZzZXQgPSBzdGFydC5hZGRlZChiYXNlTGluZTNkRGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIgLSBvZmZzZXRMZW5ndGgpKTtcbiAgICAgICAgZW5kT25CYXNlTGluZVdpdGhPZmZzZXQgPSBzdGFydC5hZGRlZChiYXNlTGluZTNkRGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyICsgb2Zmc2V0TGVuZ3RoKSk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXJ0TGluZTogeyBsaW5lM2RJbmQ6IHN0YXJ0TGluZTNkSW5kLCBsaW5lM2Q6IHN0YXJ0TGluZTNkLCBkaXI6IHN0YXJ0TGluZTNkRGlyLCBzdGFydDogc3RhcnRMaW5lM2RTdGFydCwgZW5kOiBzdGFydExpbmUzZEVuZCwgc3RhcnRPbkJhc2VMaW5lLCBlbmRPbkJhc2VMaW5lLCBzdGFydE9uQmFzZUxpbmVXaXRoT2Zmc2V0LCBlbmRPbkJhc2VMaW5lV2l0aE9mZnNldCB9LFxuICAgICAgICBiYXNlTGluZTogeyBsaW5lM2RJbmQ6IGJhc2VMaW5lM2RJbmQsIGxpbmUzZDogYmFzZUxpbmUzZCwgZGlyOiBiYXNlTGluZTNkRGlyLCBzdGFydDogYmFzZUxpbmUzZFN0YXJ0LCBlbmQ6IGJhc2VMaW5lM2RFbmQsIHN0YXJ0V2l0aE9mZnNldDogYmFzZUxpbmUzZFN0YXJ0V2l0aE9mZnNldCwgZW5kV2l0aE9mZnNldDogYmFzZUxpbmUzZEVuZFdpdGhPZmZzZXQgfSxcbiAgICB9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzUGxhdGZvcm0oc2VnbWVudCkge1xuICAgIHJldHVybiBzZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm07XG59XG5leHBvcnQgZnVuY3Rpb24gaXNDaXJjdWxhclN0YWlyKHNlZ21lbnQpIHtcbiAgICByZXR1cm4gc2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLkNpcmN1bGFyU3RhaXI7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNTdHJhaWdodFN0YWlyKHNlZ21lbnQpIHtcbiAgICByZXR1cm4gc2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlN0cmFpZ2h0U3RhaXI7XG59XG4iLCJleHBvcnQgY29uc3QgU3RhaXJNb2RlbEtleSA9ICdEU01vZGVsJztcbmV4cG9ydCBjb25zdCBNb2RlbFZhbHVlID0gJzEnO1xuZXhwb3J0IGNvbnN0IEhhbmRyYWlsTW9kZWxLZXkgPSAnSGFuZHJhaWwnO1xuZXhwb3J0IGNvbnN0IFJhaWxNb2RlbEtleSA9ICdSYWlsJztcbmV4cG9ydCBjb25zdCBDb2x1bW5Nb2RlbEtleSA9ICdDb2x1bW4nO1xuLy8gZXhwb3J0IGNvbnN0IFN0YWlyS2V5ID0gJ0RTU3RhaXInO1xuLy8gZXhwb3J0IGNvbnN0IFBsYXRmb3JtS2V5ID0gJ0RTUGxhdGZvcm0nO1xuZXhwb3J0IGNvbnN0IFN0YWlyUGFyYW1LZXkgPSAnU1BhcmFtJztcbmV4cG9ydCBjb25zdCBDb21wb25lbnRQYXJhbUtleSA9ICdDUGFyYW0nO1xuZXhwb3J0IGNvbnN0IFN0YWlyTWF0ZXJpYWxLZXkgPSAnU01hdCc7XG5leHBvcnQgY29uc3QgUGxhdGZvcm1NYXRlcmlhbEtleSA9ICdQTWF0JztcbmV4cG9ydCBjb25zdCBSYWlsTWF0ZXJpYWxLZXkgPSAnSFJNYXQnO1xuZXhwb3J0IGNvbnN0IENvbHVtbk1hdGVyaWFsS2V5ID0gJ0hDTWF0JztcbmV4cG9ydCBjb25zdCBDb21wb25lbnRNYXRlcmlhbEtleSA9ICdDTWF0Jztcbi8vIHN0YXJ0SGVpZ2h0IGFuZCBlbmRIZWlnaHQgY2FjaGVkIGluIHN0YXJ0IGFuZCBlbmRcbmV4cG9ydCBjb25zdCBDb21wb25lbnRJbmRleEtleSA9ICdJbmQnO1xuZXhwb3J0IGNvbnN0IFN0YXJ0RW5kS2V5ID0gJ1NUb0UnO1xuZXhwb3J0IGNvbnN0IEJhc2VMaW5lU2VnM2RLZXkgPSAnQmFzZUxpbmUnO1xuZXhwb3J0IGNvbnN0IEJhc2VDb21wb25lbnRLZXkgPSAnQmFzZUNvbXBvbmVudCc7XG5leHBvcnQgY29uc3QgQ2lyY2xlVGFuZ2VudEtleSA9ICdDaXJjbGVUYW5nZW50JztcbmV4cG9ydCBjb25zdCBEZWxpbWl0ZXIgPSAnJic7XG5leHBvcnQgY29uc3QgQ29vcmREZWxpbWl0ZXIgPSAnLCc7XG5leHBvcnQgY29uc3QgQmFzZUxpbmUzZERlbGltaXRlciA9ICdfJztcbmNvbnN0IFByb2RNYXRlcmlhbHMgPSB7XG4gICAgU3RhaXI6IHsgYmdJZDogJzNGTzRMSEVSQlBQWScsIG1hdGVyaWFsSWQ6ICc1OTcyZTk5M2FhMDFmMzU4NWY1MWRlY2InIH0sXG4gICAgLy8gU3RhaXI6IHsgYmdJZDogJzNGTzRBVEtFQ0xLSScsIG1hdGVyaWFsSWQ6ICc2MTY4ZjQ1NGNkZDI1ZTAwMDE3ZDc1ZDAnIH0sXG4gICAgUGxhdGZvcm06IHsgYmdJZDogJzNGTzQ0VDdNWUZBNScsIG1hdGVyaWFsSWQ6ICc2NDU2MmFmZDZmYmMzYjAwMDFhMzI1MWMnIH0sXG4gICAgSGFuZHJhaWw6IHtcbiAgICAgICAgcmFpbDogeyBiZ0lkOiAnM0ZPNExIRVJFN05QJywgbWF0ZXJpYWxJZDogJzU5NzJlOGQ3YWEwMWYzNTg1ZjUxZGU5NycgfSxcbiAgICAgICAgY29sdW1uOiB7IGJnSWQ6ICczRk80TEhFUkU3TlAnLCBtYXRlcmlhbElkOiAnNTk3MmU4ZDdhYTAxZjM1ODVmNTFkZTk3JyB9LFxuICAgIH0sXG59O1xuZXhwb3J0IGNvbnN0IFByZXNldE1hdGVyaWFscyA9IFByb2RNYXRlcmlhbHM7XG4vLyBjb25zdCBEZXZNYXRlcmlhbHMgPSB7XG4vLyAgICAgU3RhaXI6IHsgYmdJZDogJzNGTzRIMkQ3M0pGTycsIG1hdGVyaWFsSWQ6ICc1OGFmOTYxYjRhNGQyYzRmOGFhMmIxZGEnIH0sXG4vLyAgICAgLy8gU3RhaXI6IHsgYmdJZDogJzNGTzRBVEtFQ0xLSScsIG1hdGVyaWFsSWQ6ICc2MTY4ZjQ1NGNkZDI1ZTAwMDE3ZDc1ZDAnIH0sXG4vLyAgICAgUGxhdGZvcm06IHsgYmdJZDogJzNGTzRIMkQ2Q1FNWScsIG1hdGVyaWFsSWQ6ICc1ODE2ZmVmOTg1ZGE1NjZhMWIyOGE5NDQnIH0sXG4vLyAgICAgSGFuZHJhaWw6IHtcbi8vICAgICAgICAgcmFpbDogeyBiZ0lkOiAnM0ZPNEgyRDZIOFNCJywgbWF0ZXJpYWxJZDogJzU4YWZiM2FiNWMyNmEwNzNiMzg5YTk1ZicgfSxcbi8vICAgICAgICAgY29sdW1uOiB7IGJnSWQ6ICczRk80R0RLNUVYREMnLCBtYXRlcmlhbElkOiAnNWU1MzJmYjQyMDE0MDIwMDAxY2M0ODg5JyB9LFxuLy8gICAgIH0sXG4vLyB9XG4vLyBleHBvcnQgY29uc3QgUHJlc2V0TWF0ZXJpYWxzID0gKCh3aW5kb3cgYXMgYW55KS5vcmlnaW4gfHwgJycpLmluY2x1ZGVzKCdzaXQnKSA/IERldk1hdGVyaWFscyA6IFByb2RNYXRlcmlhbHM7XG5leHBvcnQgdmFyIENvbXBvbmVudFBhcmFtVHlwZTtcbihmdW5jdGlvbiAoQ29tcG9uZW50UGFyYW1UeXBlKSB7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSG9yaXpvbnRhbFN0ZXBcIl0gPSBcImhvcml6b250YWxTdGVwXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiVmVydGljYWxTdGVwXCJdID0gXCJ2ZXJ0aWNhbFN0ZXBcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJTdGFydFdpZHRoXCJdID0gXCJzdGFydFdpZHRoXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiRW5kV2lkdGhcIl0gPSBcImVuZFdpZHRoXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiVXB3YXJkXCJdID0gXCJ1cHdhcmRcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJQbGF0Zm9ybVRoaWNrbmVzc1wiXSA9IFwicGxhdGZvcm1UaGlja25lc3NcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJDb21wb25lbnRNYXRlcmlhbFwiXSA9IFwibWF0ZXJpYWxcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJUeXBlXCJdID0gXCJ0eXBlXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiUGxhdGZvcm1MZW5ndGhcIl0gPSBcInBsYXRmb3JtTGVuZ3RoXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiU3RlcFByb3BvcnRpb25hbFwiXSA9IFwic3RlcFByb3BvcnRpb25hbFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIldpZHRoUHJvcG9ydGlvbmFsXCJdID0gXCJ3aWR0aFByb3BvcnRpb25hbFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIlBsYXRmb3JtTGVuZ3RoTG9ja2VkXCJdID0gXCJwbGF0Zm9ybUxlbmd0aExvY2tlZFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIlN0YWlyTWF0ZXJpYWxcIl0gPSBcInN0YWlyTWF0ZXJpYWxcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJQbGF0Zm9ybU1hdGVyaWFsXCJdID0gXCJwbGF0Zm9ybU1hdGVyaWFsXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSGFuZHJhaWxcIl0gPSBcImhhbmRyYWlsXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSGFuZHJhaWxIZWlnaHRcIl0gPSBcImhhbmRyYWlsSGVpZ2h0XCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSGFuZHJhaWxSYWlsVHlwZVwiXSA9IFwiaGFuZHJhaWxSYWlsVHlwZVwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsUmFpbFJhZGl1c1wiXSA9IFwiaGFuZHJhaWxSYWlsUmFkaXVzXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSGFuZHJhaWxSYWlsV2lkdGhcIl0gPSBcImhhbmRyYWlsUmFpbFdpZHRoXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSGFuZHJhaWxSYWlsSGVpZ2h0XCJdID0gXCJoYW5kcmFpbFJhaWxIZWlnaHRcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIYW5kcmFpbFJhaWxNYXRlcmlhbFwiXSA9IFwiUmFpbE1hdGVyaWFsXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSGFuZHJhaWxDb2x1bW5UeXBlXCJdID0gXCJoYW5kcmFpbENvbHVtblR5cGVcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIYW5kcmFpbENvbHVtblN0ZXBcIl0gPSBcImhhbmRyYWlsQ29sdW1uU3RlcFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsQ29sdW1uUmFkaXVzXCJdID0gXCJoYW5kcmFpbENvbHVtblJhZGl1c1wiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsQ29sdW1uV2lkdGhcIl0gPSBcImhhbmRyYWlsQ29sdW1uV2lkdGhcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIYW5kcmFpbENvbHVtbkhlaWdodFwiXSA9IFwiaGFuZHJhaWxDb2x1bW5IZWlnaHRcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIYW5kcmFpbENvbHVtbk1hdGVyaWFsXCJdID0gXCJDb2x1bW5NYXRlcmlhbFwiO1xufSkoQ29tcG9uZW50UGFyYW1UeXBlIHx8IChDb21wb25lbnRQYXJhbVR5cGUgPSB7fSkpO1xuLy8gaW50ZXJmYWNlIFBhcmFtU2V0dGluZ3Mge1xuLy8gICAgIG1pbjogbnVtYmVyO1xuLy8gICAgIG1heDogbnVtYmVyO1xuLy8gICAgIHN0ZXA6IG51bWJlcjtcbi8vICAgICB1bml0OiBzdHJpbmc7XG4vLyAgICAgcHJlY2lzaW9uOiBudW1iZXI7XG4vLyB9XG5leHBvcnQgdmFyIENvbXBvbmVudFR5cGU7XG4oZnVuY3Rpb24gKENvbXBvbmVudFR5cGUpIHtcbiAgICBDb21wb25lbnRUeXBlW0NvbXBvbmVudFR5cGVbXCJTdHJhaWdodFN0YWlyXCJdID0gMF0gPSBcIlN0cmFpZ2h0U3RhaXJcIjtcbiAgICBDb21wb25lbnRUeXBlW0NvbXBvbmVudFR5cGVbXCJDaXJjdWxhclN0YWlyXCJdID0gMV0gPSBcIkNpcmN1bGFyU3RhaXJcIjtcbiAgICBDb21wb25lbnRUeXBlW0NvbXBvbmVudFR5cGVbXCJQbGF0Zm9ybVwiXSA9IDJdID0gXCJQbGF0Zm9ybVwiO1xufSkoQ29tcG9uZW50VHlwZSB8fCAoQ29tcG9uZW50VHlwZSA9IHt9KSk7XG5leHBvcnQgdmFyIFJhaWxUeXBlO1xuKGZ1bmN0aW9uIChSYWlsVHlwZSkge1xuICAgIFJhaWxUeXBlW1JhaWxUeXBlW1wiQ2lyY2xlXCJdID0gMF0gPSBcIkNpcmNsZVwiO1xuICAgIFJhaWxUeXBlW1JhaWxUeXBlW1wiUmVjdFwiXSA9IDFdID0gXCJSZWN0XCI7XG4gICAgUmFpbFR5cGVbUmFpbFR5cGVbXCJDdXN0b21cIl0gPSA5OV0gPSBcIkN1c3RvbVwiO1xufSkoUmFpbFR5cGUgfHwgKFJhaWxUeXBlID0ge30pKTtcbmV4cG9ydCB2YXIgQ29sdW1uVHlwZTtcbihmdW5jdGlvbiAoQ29sdW1uVHlwZSkge1xuICAgIENvbHVtblR5cGVbQ29sdW1uVHlwZVtcIkNpcmNsZVwiXSA9IDBdID0gXCJDaXJjbGVcIjtcbiAgICBDb2x1bW5UeXBlW0NvbHVtblR5cGVbXCJSZWN0XCJdID0gMV0gPSBcIlJlY3RcIjtcbiAgICBDb2x1bW5UeXBlW0NvbHVtblR5cGVbXCJDdXN0b21cIl0gPSA5OV0gPSBcIkN1c3RvbVwiO1xufSkoQ29sdW1uVHlwZSB8fCAoQ29sdW1uVHlwZSA9IHt9KSk7XG5leHBvcnQgY29uc3QgQ29tcG9uZW50UGFyYW1TZXR0aW5ncyA9IHtcbiAgICBob3Jpem9udGFsU3RlcDogeyB0aXRsZTogXCLmraXplb9cIiwgbWluOiAxLCBtYXg6IDEwMDAwMCwgc3RlcDogMjAsIHVuaXQ6ICfplb8nLCBwcmVjaXNpb246IDAsIH0sXG4gICAgdmVydGljYWxTdGVwOiB7IHRpdGxlOiBcIuatpemVv1wiLCBtaW46IDEsIG1heDogMTAwMDAwLCBzdGVwOiAyMCwgdW5pdDogJ+mrmCcsIHByZWNpc2lvbjogMCwgfSxcbiAgICBzdGFydFdpZHRoOiB7IHRpdGxlOiBcIuWuveW6plwiLCBtaW46IDEsIG1heDogMTAwMDAwLCBzdGVwOiA1MCwgdW5pdDogJ+i1tycsIHByZWNpc2lvbjogMCwgfSxcbiAgICBlbmRXaWR0aDogeyB0aXRsZTogXCLlrr3luqZcIiwgbWluOiAxLCBtYXg6IDEwMDAwMCwgc3RlcDogNTAsIHVuaXQ6ICfnu4gnLCBwcmVjaXNpb246IDAsIH0sXG4gICAgcGxhdGZvcm1MZW5ndGg6IHsgdGl0bGU6IFwi6ZW/5bqmXCIsIG1pbjogMTAwLCBtYXg6IDEwMDAwMCwgc3RlcDogNTAsIHVuaXQ6ICcnLCBwcmVjaXNpb246IDAsIH0sXG4gICAgdHlwZToge1xuICAgICAgICAvLyByYWRpb1ZhbHVlczogW0NvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpciwgQ29tcG9uZW50VHlwZS5DaXJjdWxhclN0YWlyLCBDb21wb25lbnRUeXBlLlBsYXRmb3JtXSxcbiAgICAgICAgLy8gdGV4dHM6IFtcIuebtOmYtlwiLCBcIuaXi+i9rOmYtuair1wiLCBcIuW5s+WPsFwiXSxcbiAgICAgICAgdGl0bGU6IFwi57G75Z6LXCIsXG4gICAgICAgIHJhZGlvT3B0aW9uczogW1xuICAgICAgICAgICAgeyB2YWx1ZTogQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyLCB0ZXh0OiBcIuebtOmYtlwiIH0sXG4gICAgICAgICAgICB7IHZhbHVlOiBDb21wb25lbnRUeXBlLkNpcmN1bGFyU3RhaXIsIHRleHQ6IFwi5peL6L2s6Zi25qKvXCIgfSxcbiAgICAgICAgICAgIHsgdmFsdWU6IENvbXBvbmVudFR5cGUuUGxhdGZvcm0sIHRleHQ6IFwi5bmz5Y+wXCIgfSxcbiAgICAgICAgXVxuICAgIH0sXG4gICAgdXB3YXJkOiB7XG4gICAgICAgIC8vIHJhZGlvVmFsdWVzOiBbMSwgMF0sXG4gICAgICAgIC8vIHRleHRzOiBbXCLlkJHkuIpcIiwgXCLlkJHkuItcIl0sXG4gICAgICAgIHRpdGxlOiBcIuaWueWQkVwiLFxuICAgICAgICByYWRpb09wdGlvbnM6IFtcbiAgICAgICAgICAgIHsgdmFsdWU6IHRydWUsIHRleHQ6IFwi5ZCR5LiKXCIgfSxcbiAgICAgICAgICAgIHsgdmFsdWU6IGZhbHNlLCB0ZXh0OiBcIuWQkeS4i1wiIH0sXG4gICAgICAgIF1cbiAgICB9LFxuICAgIHBsYXRmb3JtVGhpY2tuZXNzOiB7IHRpdGxlOiBcIuWOmuW6plwiLCBtaW46IDEsIG1heDogMTAwMDAwLCBzdGVwOiAxMCwgdW5pdDogJycsIHByZWNpc2lvbjogMCwgfSxcbiAgICBtYXRlcmlhbDogeyB0aXRsZTogJ+adkOi0qCcgfSxcbiAgICBzdGFpck1hdGVyaWFsOiB7IHRpdGxlOiAn6Zi25qKv5p2Q6LSoJyB9LFxuICAgIHBsYXRmb3JtTWF0ZXJpYWw6IHsgdGl0bGU6ICflubPlj7DmnZDotKgnIH0sXG4gICAgaGFuZHJhaWw6IHtcbiAgICAgICAgdGl0bGU6ICflkK/nlKjmoI/mnYYnLFxuICAgICAgICBoZWlnaHQ6IHsgdGl0bGU6IFwi6auY5bqmXCIsIG1pbjogMSwgbWF4OiAxMDAwMDAsIHN0ZXA6IDEwLCB1bml0OiAnJywgcHJlY2lzaW9uOiAwLCB9LFxuICAgICAgICByYWlsOiB7XG4gICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi5qC35byPXCIsXG4gICAgICAgICAgICAgICAgc2VsZWN0T3B0aW9uczogW1xuICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBSYWlsVHlwZS5DaXJjbGUsIGxhYmVsOiBcIuWchuW9olwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IFJhaWxUeXBlLlJlY3QsIGxhYmVsOiBcIuaWueW9olwiIH0sXG4gICAgICAgICAgICAgICAgICAgIC8vIHsgdmFsdWU6IFJhaWxUeXBlLkN1c3RvbSwgbGFiZWw6IFwi5ou+5Y+WXCIgfSxcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBjb2x1bW46IHtcbiAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogXCLmoLflvI9cIixcbiAgICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IENvbHVtblR5cGUuQ2lyY2xlLCBsYWJlbDogXCLlnIblvaJcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBDb2x1bW5UeXBlLlJlY3QsIGxhYmVsOiBcIuaWueW9olwiIH0sXG4gICAgICAgICAgICAgICAgICAgIC8vIHsgdmFsdWU6IENvbHVtblR5cGUuQ3VzdG9tLCBsYWJlbDogXCLmi77lj5ZcIiB9LFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdGVwOiB7IHRpdGxlOiBcIumXtOmalFwiLCBtaW46IDEsIG1heDogMTAwMDAwLCBzdGVwOiAxMCwgdW5pdDogJycsIHByZWNpc2lvbjogMCwgfSxcbiAgICAgICAgfSxcbiAgICAgICAgY29tcG9uZW50UGFyYW06IHtcbiAgICAgICAgICAgIHJhZGl1czogeyB0aXRsZTogXCLljYrlvoRcIiwgbWluOiAxLCBtYXg6IDEwMDAwMCwgc3RlcDogMSwgdW5pdDogJycsIHByZWNpc2lvbjogMCwgfSxcbiAgICAgICAgICAgIHdpZHRoOiB7IHRpdGxlOiBcIuWuveW6plwiLCBtaW46IDEsIG1heDogMTAwMDAwLCBzdGVwOiAxLCB1bml0OiAnJywgcHJlY2lzaW9uOiAwLCB9LFxuICAgICAgICAgICAgaGVpZ2h0OiB7IHRpdGxlOiBcIumrmOW6plwiLCBtaW46IDEsIG1heDogMTAwMDAwLCBzdGVwOiAxLCB1bml0OiAnJywgcHJlY2lzaW9uOiAwLCB9LFxuICAgICAgICB9XG4gICAgfVxufTtcbmV4cG9ydCB2YXIgTWF0ZXJpYWxBc3NpZ25UeXBlO1xuKGZ1bmN0aW9uIChNYXRlcmlhbEFzc2lnblR5cGUpIHtcbiAgICBNYXRlcmlhbEFzc2lnblR5cGVbXCJTdGFpck92ZXJhbGxcIl0gPSBcInN0YWlyT3ZlcmFsbFwiO1xuICAgIE1hdGVyaWFsQXNzaWduVHlwZVtcIlBsYXRmb3JtT3ZlcmFsbFwiXSA9IFwicGxhdGZvcm1PdmVyYWxsXCI7XG4gICAgTWF0ZXJpYWxBc3NpZ25UeXBlW1wiUmFpbFwiXSA9IFwicmFpbFwiO1xuICAgIE1hdGVyaWFsQXNzaWduVHlwZVtcIkNvbHVtblwiXSA9IFwiY29sdW1uXCI7XG59KShNYXRlcmlhbEFzc2lnblR5cGUgfHwgKE1hdGVyaWFsQXNzaWduVHlwZSA9IHt9KSk7XG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29tcG9uZW50VGl0bGUoY29tcG9uZW50VHlwZSkge1xuICAgIGlmIChjb21wb25lbnRUeXBlID09PSBDb21wb25lbnRUeXBlLlN0cmFpZ2h0U3RhaXIpIHtcbiAgICAgICAgcmV0dXJuICfpmLYnO1xuICAgIH1cbiAgICBlbHNlIGlmIChjb21wb25lbnRUeXBlID09PSBDb21wb25lbnRUeXBlLkNpcmN1bGFyU3RhaXIpIHtcbiAgICAgICAgcmV0dXJuICfpmLYnO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuICflj7AnO1xuICAgIH1cbn1cbmV4cG9ydCBjb25zdCBIYW5kcmFpbERlZmF1bHRPZmZzZXRMZW5ndGggPSA0MDtcbmV4cG9ydCBjb25zdCBEZWZhdWx0U3RhaXJQYXJhbSA9IHtcbiAgICBob3Jpem9udGFsU3RlcDogMjAwLFxuICAgIHZlcnRpY2FsU3RlcDogMjAwLFxuICAgIHN0YXJ0V2lkdGg6IDEwMDAsXG4gICAgZW5kV2lkdGg6IDEwMDAsXG4gICAgdXB3YXJkOiB0cnVlLFxuICAgIHBsYXRmb3JtVGhpY2tuZXNzOiAxMDAsXG4gICAgc3RhaXJNYXRlcmlhbDogUHJlc2V0TWF0ZXJpYWxzLlN0YWlyLFxuICAgIHBsYXRmb3JtTWF0ZXJpYWw6IFByZXNldE1hdGVyaWFscy5QbGF0Zm9ybSxcbiAgICBoYW5kcmFpbDoge1xuICAgICAgICBzdXBwb3J0OiB0cnVlLFxuICAgICAgICBoZWlnaHQ6IDQwMCxcbiAgICAgICAgcmFpbDoge1xuICAgICAgICAgICAgdHlwZTogUmFpbFR5cGUuQ2lyY2xlLFxuICAgICAgICAgICAgcGFyYW06IHsgcmFkaXVzOiAxNiwgd2lkdGg6IDQwLCBoZWlnaHQ6IDMwLCB9LFxuICAgICAgICAgICAgbWF0ZXJpYWw6IFByZXNldE1hdGVyaWFscy5IYW5kcmFpbC5yYWlsLFxuICAgICAgICB9LFxuICAgICAgICBjb2x1bW46IHtcbiAgICAgICAgICAgIHR5cGU6IENvbHVtblR5cGUuQ2lyY2xlLFxuICAgICAgICAgICAgc3RlcDogNTAwLFxuICAgICAgICAgICAgcGFyYW06IHsgcmFkaXVzOiA4LCB3aWR0aDogMTIsIGhlaWdodDogMTIsIH0sXG4gICAgICAgICAgICBtYXRlcmlhbDogUHJlc2V0TWF0ZXJpYWxzLkhhbmRyYWlsLmNvbHVtbixcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHN0ZXBQcm9wb3J0aW9uYWw6IHRydWUsXG4gICAgd2lkdGhQcm9wb3J0aW9uYWw6IHRydWUsXG59O1xuZXhwb3J0IGZ1bmN0aW9uIGdldERlZmF1bHRTdGFpclBhcmFtKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGhvcml6b250YWxTdGVwOiAyNTAsXG4gICAgICAgIHZlcnRpY2FsU3RlcDogMjUwLFxuICAgICAgICBzdGFydFdpZHRoOiAxMDAwLFxuICAgICAgICBlbmRXaWR0aDogMTAwMCxcbiAgICAgICAgdXB3YXJkOiB0cnVlLFxuICAgICAgICBwbGF0Zm9ybVRoaWNrbmVzczogMjAwLFxuICAgICAgICBzdGFpck1hdGVyaWFsOiBQcmVzZXRNYXRlcmlhbHMuU3RhaXIsXG4gICAgICAgIHBsYXRmb3JtTWF0ZXJpYWw6IFByZXNldE1hdGVyaWFscy5QbGF0Zm9ybSxcbiAgICAgICAgaGFuZHJhaWw6IHtcbiAgICAgICAgICAgIHN1cHBvcnQ6IHRydWUsXG4gICAgICAgICAgICBoZWlnaHQ6IDUwMCxcbiAgICAgICAgICAgIHJhaWw6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBSYWlsVHlwZS5DaXJjbGUsXG4gICAgICAgICAgICAgICAgcGFyYW06IHsgcmFkaXVzOiAyMCwgd2lkdGg6IDYwLCBoZWlnaHQ6IDMwLCB9LFxuICAgICAgICAgICAgICAgIG1hdGVyaWFsOiBQcmVzZXRNYXRlcmlhbHMuSGFuZHJhaWwucmFpbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb2x1bW46IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBDb2x1bW5UeXBlLkNpcmNsZSxcbiAgICAgICAgICAgICAgICBzdGVwOiA1MDAsXG4gICAgICAgICAgICAgICAgcGFyYW06IHsgcmFkaXVzOiA4LCB3aWR0aDogMTYsIGhlaWdodDogMTYsIH0sXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWw6IFByZXNldE1hdGVyaWFscy5IYW5kcmFpbC5jb2x1bW4sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBzdGVwUHJvcG9ydGlvbmFsOiB0cnVlLFxuICAgICAgICB3aWR0aFByb3BvcnRpb25hbDogdHJ1ZSxcbiAgICB9O1xufVxuZXhwb3J0IGNvbnN0IERlZmF1bHRDb21wb25lbnRQYXJhbSA9IHtcbiAgICBpbmRleDogMCxcbiAgICBob3Jpem9udGFsU3RlcDogRGVmYXVsdFN0YWlyUGFyYW0uaG9yaXpvbnRhbFN0ZXAsXG4gICAgdmVydGljYWxTdGVwOiBEZWZhdWx0U3RhaXJQYXJhbS52ZXJ0aWNhbFN0ZXAsXG4gICAgc3RhcnRXaWR0aDogRGVmYXVsdFN0YWlyUGFyYW0uc3RhcnRXaWR0aCxcbiAgICBlbmRXaWR0aDogRGVmYXVsdFN0YWlyUGFyYW0uZW5kV2lkdGgsXG4gICAgb2Zmc2V0V2lkdGg6IDAsXG4gICAgd2l0aE9mZnNldDogZmFsc2UsXG4gICAgcGxhdGZvcm1MZW5ndGg6IDIwMDAsXG4gICAgdHlwZTogQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyLFxuICAgIHVwd2FyZDogRGVmYXVsdFN0YWlyUGFyYW0udXB3YXJkLFxuICAgIHBsYXRmb3JtVGhpY2tuZXNzOiBEZWZhdWx0U3RhaXJQYXJhbS5wbGF0Zm9ybVRoaWNrbmVzcyxcbiAgICBzdGVwUHJvcG9ydGlvbmFsOiBEZWZhdWx0U3RhaXJQYXJhbS5zdGVwUHJvcG9ydGlvbmFsLFxuICAgIHdpZHRoUHJvcG9ydGlvbmFsOiB0cnVlLFxuICAgIHBsYXRmb3JtTGVuZ3RoTG9ja2VkOiBmYWxzZSxcbiAgICAvLyBzdGVwVHlwZTogU3RlcFR5cGUuTm9ybWFsLFxuICAgIC8vIGNvcm5lclR5cGU6IENvcm5lclR5cGUuUmVjdGFuZ2xlLFxufTtcbmV4cG9ydCB2YXIgQ29tcG9uZW50RGlyZWN0aW9uVHlwZTtcbihmdW5jdGlvbiAoQ29tcG9uZW50RGlyZWN0aW9uVHlwZSkge1xuICAgIENvbXBvbmVudERpcmVjdGlvblR5cGVbQ29tcG9uZW50RGlyZWN0aW9uVHlwZVtcIkZyb250XCJdID0gMF0gPSBcIkZyb250XCI7XG4gICAgQ29tcG9uZW50RGlyZWN0aW9uVHlwZVtDb21wb25lbnREaXJlY3Rpb25UeXBlW1wiUmlnaHRGcm9udFwiXSA9IDFdID0gXCJSaWdodEZyb250XCI7XG4gICAgQ29tcG9uZW50RGlyZWN0aW9uVHlwZVtDb21wb25lbnREaXJlY3Rpb25UeXBlW1wiUmlnaHRcIl0gPSAyXSA9IFwiUmlnaHRcIjtcbiAgICBDb21wb25lbnREaXJlY3Rpb25UeXBlW0NvbXBvbmVudERpcmVjdGlvblR5cGVbXCJMZWZ0XCJdID0gM10gPSBcIkxlZnRcIjtcbiAgICBDb21wb25lbnREaXJlY3Rpb25UeXBlW0NvbXBvbmVudERpcmVjdGlvblR5cGVbXCJMZWZ0RnJvbnRcIl0gPSA0XSA9IFwiTGVmdEZyb250XCI7XG59KShDb21wb25lbnREaXJlY3Rpb25UeXBlIHx8IChDb21wb25lbnREaXJlY3Rpb25UeXBlID0ge30pKTtcbmV4cG9ydCB2YXIgQ2lyY3VsYXJTaWRlO1xuKGZ1bmN0aW9uIChDaXJjdWxhclNpZGUpIHtcbiAgICBDaXJjdWxhclNpZGVbQ2lyY3VsYXJTaWRlW1wiTGVmdFwiXSA9IDBdID0gXCJMZWZ0XCI7XG4gICAgQ2lyY3VsYXJTaWRlW0NpcmN1bGFyU2lkZVtcIlJpZ2h0XCJdID0gMV0gPSBcIlJpZ2h0XCI7XG59KShDaXJjdWxhclNpZGUgfHwgKENpcmN1bGFyU2lkZSA9IHt9KSk7XG5leHBvcnQgZnVuY3Rpb24gaXNBeGlzVmFsaWQoYXhpcykge1xuICAgIHJldHVybiBheGlzID09PSBcIlhcIiAvKiBBeGlzLlggKi8gfHwgYXhpcyA9PT0gXCItWFwiIC8qIEF4aXMuWE1pbnVzICovIHx8IGF4aXMgPT09IFwiWVwiIC8qIEF4aXMuWSAqLyB8fCBheGlzID09PSBcIi1ZXCIgLyogQXhpcy5ZTWludXMgKi8gfHwgYXhpcyA9PT0gXCJaXCIgLyogQXhpcy5aICovIHx8IGF4aXMgPT09IFwiLVpcIiAvKiBBeGlzLlpNaW51cyAqLztcbn1cbiIsImltcG9ydCB7IGRyYXdTdGFpcnNUb29sIH0gZnJvbSBcIi4vaW5kZXhcIjtcbmltcG9ydCB7IERpcmVjdGlvblgsIERpcmVjdGlvblksIERpcmVjdGlvblogfSBmcm9tIFwiLi9jb25zdHNcIjtcbmltcG9ydCB7IENvbHVtblR5cGUsIENvb3JkRGVsaW1pdGVyLCBEZWZhdWx0Q29tcG9uZW50UGFyYW0sIERlbGltaXRlciwgZ2V0RGVmYXVsdFN0YWlyUGFyYW0sIFJhaWxUeXBlIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmV4cG9ydCBmdW5jdGlvbiBpc0tBcmNoRmFjZShlbnRpdHkpIHtcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgKGVudGl0eS5nZXRUeXBlKCkgPT09IEtBcmNoRmFjZVR5cGUuTm9uUGxhbmFyIHx8IGVudGl0eS5nZXRUeXBlKCkgPT09IEtBcmNoRmFjZVR5cGUuUGxhbmFyKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0tHcm91cEluc3RhbmNlKGVudGl0eSkge1xuICAgIHJldHVybiAhIWVudGl0eSAmJiBlbnRpdHkuZ2V0VHlwZSgpID09PSBLRW50aXR5VHlwZS5Hcm91cEluc3RhbmNlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzS0ZhY2UoZW50aXR5KSB7XG4gICAgcmV0dXJuICEhZW50aXR5ICYmIGVudGl0eS5nZXRUeXBlKCkgPT09IEtFbnRpdHlUeXBlLkZhY2U7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNLRWRnZShlbnRpdHkpIHtcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS0VudGl0eVR5cGUuRWRnZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0tWZXJ0ZXgoZW50aXR5KSB7XG4gICAgcmV0dXJuICEhZW50aXR5ICYmIGVudGl0eS5nZXRUeXBlKCkgPT09IEtFbnRpdHlUeXBlLlZlcnRleDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0tBdXhpbGlhcnlCb3VuZGVkQ3VydmUoZW50aXR5KSB7XG4gICAgcmV0dXJuICEhZW50aXR5ICYmIGVudGl0eS5nZXRUeXBlKCkgPT09IEtFbnRpdHlUeXBlLkF1eGlsaWFyeUJvdW5kZWRDdXJ2ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0tBdXhpbGlhcnlMaW5lKGVudGl0eSkge1xuICAgIHJldHVybiAhIWVudGl0eSAmJiBlbnRpdHkuZ2V0VHlwZSgpID09PSBLRW50aXR5VHlwZS5BdXhpbGlhcnlMaW5lO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzS1BsYW5lKGVudGl0eSkge1xuICAgIHJldHVybiAhIWVudGl0eSAmJiBlbnRpdHkuZ2V0VHlwZSgpID09PSBLU3VyZmFjZVR5cGUuUGxhbmU7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNLTGluZVNlZ21lbnQzZChlbnRpdHkpIHtcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgISFlbnRpdHkuZGlyZWN0aW9uO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzS0FyYzNkKGVudGl0eSkge1xuICAgIHJldHVybiAhIWVudGl0eSAmJiAhIWVudGl0eS5jaXJjbGU7XG59XG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5TWF0ZXJpYWwobWF0ZXJpYWwpIHtcbiAgICBsZXQgdmFsdWUgPSAnJztcbiAgICBpZiAobWF0ZXJpYWwubWF0ZXJpYWxJZCkge1xuICAgICAgICB2YWx1ZSArPSBgbWlkPSR7bWF0ZXJpYWwubWF0ZXJpYWxJZH0ke0RlbGltaXRlcn1gO1xuICAgIH1cbiAgICBpZiAobWF0ZXJpYWwuYmdpZCkge1xuICAgICAgICB2YWx1ZSArPSBgYmlkPSR7bWF0ZXJpYWwuYmdpZH0ke0RlbGltaXRlcn1gO1xuICAgIH1cbiAgICBpZiAobWF0ZXJpYWwuaW1nVXJsKSB7XG4gICAgICAgIHZhbHVlICs9IGBpbWc9JHttYXRlcmlhbC5pbWdVcmx9JHtEZWxpbWl0ZXJ9YDtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlLnNsaWNlKDAsIHZhbHVlLmxlbmd0aCAtIDEpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTWF0ZXJpYWwodmFsdWUpIHtcbiAgICBjb25zdCBtYXRlcmlhbCA9IHt9O1xuICAgIGNvbnN0IGl0ZW1zID0gdmFsdWUuc3BsaXQoRGVsaW1pdGVyKTtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgICAgY29uc3Qga2V5VmFsdWUgPSBpdGVtLnNwbGl0KCc9Jyk7XG4gICAgICAgIGlmIChrZXlWYWx1ZS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoa2V5VmFsdWVbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlICdtaWQnOlxuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbC5tYXRlcmlhbElkID0ga2V5VmFsdWVbMV07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2JpZCc6XG4gICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsLmJnaWQgPSBrZXlWYWx1ZVsxXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnaW1nJzpcbiAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWwuaW1nVXJsID0ga2V5VmFsdWVbMV07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChpdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIG1hdGVyaWFsO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnlTdGFpclBhcmFtKHBhcmFtKSB7XG4gICAgbGV0IHZhbHVlID0gJyc7XG4gICAgdmFsdWUgKz0gYGhzPSR7cGFyYW0uaG9yaXpvbnRhbFN0ZXB9JHtEZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgdnM9JHtwYXJhbS52ZXJ0aWNhbFN0ZXB9JHtEZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgc3c9JHtwYXJhbS5zdGFydFdpZHRofSR7RGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYGV3PSR7cGFyYW0uZW5kV2lkdGh9JHtEZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgdXA9JHtwYXJhbS51cHdhcmQgPyAxIDogMH0ke0RlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGBwdGs9JHtwYXJhbS5wbGF0Zm9ybVRoaWNrbmVzc31gO1xuICAgIGlmIChwYXJhbS5oYW5kcmFpbC5zdXBwb3J0KSB7XG4gICAgICAgIGNvbnN0IHsgaGFuZHJhaWw6IHsgaGVpZ2h0LCByYWlsLCBjb2x1bW4gfSB9ID0gcGFyYW07XG4gICAgICAgIHZhbHVlICs9IGBoaD0ke2hlaWdodH0ke0RlbGltaXRlcn1gO1xuICAgICAgICB2YWx1ZSArPSBgaHJ0PSR7cmFpbC50eXBlfSR7RGVsaW1pdGVyfWA7XG4gICAgICAgIGlmIChyYWlsLnR5cGUgPT09IFJhaWxUeXBlLkNpcmNsZSAmJiByYWlsLnBhcmFtLnJhZGl1cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YWx1ZSArPSBgaHJyPSR7cmFpbC5wYXJhbS5yYWRpdXN9JHtEZWxpbWl0ZXJ9YDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyYWlsLnR5cGUgPT09IFJhaWxUeXBlLlJlY3QpIHtcbiAgICAgICAgICAgIGlmIChyYWlsLnBhcmFtLndpZHRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSArPSBgaHJ3PSR7cmFpbC5wYXJhbS53aWR0aH0ke0RlbGltaXRlcn1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJhaWwucGFyYW0uaGVpZ2h0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSArPSBgaHJoPSR7cmFpbC5wYXJhbS5oZWlnaHR9JHtEZWxpbWl0ZXJ9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YWx1ZSArPSBgaGN0PSR7Y29sdW1uLnR5cGV9JHtEZWxpbWl0ZXJ9YDtcbiAgICAgICAgdmFsdWUgKz0gYGhjcz0ke2NvbHVtbi5zdGVwfSR7RGVsaW1pdGVyfWA7XG4gICAgICAgIGlmIChjb2x1bW4udHlwZSA9PT0gQ29sdW1uVHlwZS5DaXJjbGUgJiYgY29sdW1uLnBhcmFtLnJhZGl1cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YWx1ZSArPSBgaGNyPSR7Y29sdW1uLnBhcmFtLnJhZGl1c30ke0RlbGltaXRlcn1gO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvbHVtbi50eXBlID09PSBDb2x1bW5UeXBlLlJlY3QpIHtcbiAgICAgICAgICAgIGlmIChjb2x1bW4ucGFyYW0ud2lkdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHZhbHVlICs9IGBoY3c9JHtjb2x1bW4ucGFyYW0ud2lkdGh9JHtEZWxpbWl0ZXJ9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb2x1bW4ucGFyYW0uaGVpZ2h0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSArPSBgaGNoPSR7Y29sdW1uLnBhcmFtLmhlaWdodH0ke0RlbGltaXRlcn1gO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZS5zbGljZSgwLCB2YWx1ZS5sZW5ndGggLSAxKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVN0YWlyUGFyYW0odmFsdWUpIHtcbiAgICBjb25zdCBwYXJhbSA9IGdldERlZmF1bHRTdGFpclBhcmFtKCk7XG4gICAgY29uc3QgaXRlbXMgPSB2YWx1ZS5zcGxpdChEZWxpbWl0ZXIpO1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgICBjb25zdCBrZXlWYWx1ZSA9IGl0ZW0uc3BsaXQoJz0nKTtcbiAgICAgICAgaWYgKGtleVZhbHVlLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgc3dpdGNoIChrZXlWYWx1ZVswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hzJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uaG9yaXpvbnRhbFN0ZXAgPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3ZzJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0udmVydGljYWxTdGVwID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdzdyc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnN0YXJ0V2lkdGggPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2V3JzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uZW5kV2lkdGggPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3VwJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0udXB3YXJkID0ga2V5VmFsdWVbMV0gPT09ICcxJyA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncHRrJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0ucGxhdGZvcm1UaGlja25lc3MgPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hoJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uaGFuZHJhaWwuaGVpZ2h0ID0gcGFyc2VGbG9hdChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hydCc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmhhbmRyYWlsLnJhaWwudHlwZSA9IHBhcnNlRmxvYXQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdocnInOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5oYW5kcmFpbC5yYWlsLnBhcmFtLnJhZGl1cyA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnaHJ3JzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uaGFuZHJhaWwucmFpbC5wYXJhbS53aWR0aCA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnaHJoJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uaGFuZHJhaWwucmFpbC5wYXJhbS5oZWlnaHQgPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hjdCc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmhhbmRyYWlsLmNvbHVtbi50eXBlID0gcGFyc2VGbG9hdChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hjcyc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmhhbmRyYWlsLmNvbHVtbi5zdGVwID0gcGFyc2VGbG9hdChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hjcic6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmhhbmRyYWlsLmNvbHVtbi5wYXJhbS5yYWRpdXMgPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hjdyc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmhhbmRyYWlsLmNvbHVtbi5wYXJhbS53aWR0aCA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnaGNoJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uaGFuZHJhaWwuY29sdW1uLnBhcmFtLmhlaWdodCA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcGFyYW0uc3RlcFByb3BvcnRpb25hbCA9IHRydWU7XG4gICAgcGFyYW0ud2lkdGhQcm9wb3J0aW9uYWwgPSB0cnVlO1xuICAgIHJldHVybiBwYXJhbTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnlDb21wb25lbnRQYXJhbShwYXJhbSkge1xuICAgIGxldCB2YWx1ZSA9ICcnO1xuICAgIHZhbHVlICs9IGBpbmQ9JHtwYXJhbS5pbmRleH0ke0RlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGBocz0ke3BhcmFtLmhvcml6b250YWxTdGVwfSR7RGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYHZzPSR7cGFyYW0udmVydGljYWxTdGVwfSR7RGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYHN3PSR7cGFyYW0uc3RhcnRXaWR0aH0ke0RlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGBldz0ke3BhcmFtLmVuZFdpZHRofSR7RGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYG93PSR7cGFyYW0ub2Zmc2V0V2lkdGh9JHtEZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgcGw9JHtwYXJhbS5wbGF0Zm9ybUxlbmd0aH0ke0RlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGB0cD0ke3BhcmFtLnR5cGV9JHtEZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgdXA9JHtwYXJhbS51cHdhcmQgPyAxIDogMH0ke0RlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGBwdGs9JHtwYXJhbS5wbGF0Zm9ybVRoaWNrbmVzc31gO1xuICAgIHJldHVybiB2YWx1ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUNvbXBvbmVudFBhcmFtKHZhbHVlKSB7XG4gICAgY29uc3QgcGFyYW0gPSBPYmplY3QuYXNzaWduKHt9LCBEZWZhdWx0Q29tcG9uZW50UGFyYW0pO1xuICAgIGNvbnN0IGl0ZW1zID0gdmFsdWUuc3BsaXQoRGVsaW1pdGVyKTtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgICAgY29uc3Qga2V5VmFsdWUgPSBpdGVtLnNwbGl0KCc9Jyk7XG4gICAgICAgIGlmIChrZXlWYWx1ZS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoa2V5VmFsdWVbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlICdpbmQnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5pbmRleCA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnaHMnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5ob3Jpem9udGFsU3RlcCA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAndnMnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS52ZXJ0aWNhbFN0ZXAgPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3N3JzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uc3RhcnRXaWR0aCA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZXcnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5lbmRXaWR0aCA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnb3cnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5vZmZzZXRXaWR0aCA9IHBhcnNlRmxvYXQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdwbCc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnBsYXRmb3JtTGVuZ3RoID0gcGFyc2VGbG9hdChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3RwJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0udHlwZSA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAndXAnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS51cHdhcmQgPSBrZXlWYWx1ZVsxXSA9PT0gJzEnID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdwdGsnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5wbGF0Zm9ybVRoaWNrbmVzcyA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcGFyYW0uc3RlcFByb3BvcnRpb25hbCA9IHRydWU7XG4gICAgcGFyYW0ud2lkdGhQcm9wb3J0aW9uYWwgPSB0cnVlO1xuICAgIHBhcmFtLnBsYXRmb3JtTGVuZ3RoTG9ja2VkID0gdHJ1ZTtcbiAgICBwYXJhbS5tb2RlbEVkaXRpbmcgPSB0cnVlO1xuICAgIHJldHVybiBwYXJhbTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnlTdGFydEVuZChzdGFydCwgZW5kKSB7XG4gICAgbGV0IHZhbHVlID0gJyc7XG4gICAgdmFsdWUgKz0gYCR7c3RhcnQueH0ke0Nvb3JkRGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYCR7c3RhcnQueX0ke0Nvb3JkRGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYCR7c3RhcnQuen0ke0RlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGAke2VuZC54fSR7Q29vcmREZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgJHtlbmQueX0ke0Nvb3JkRGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYCR7ZW5kLnp9YDtcbiAgICByZXR1cm4gdmFsdWU7XG59XG5leHBvcnQgZnVuY3Rpb24gcGFyc2VMaW5lU2VnM2QodmFsdWUpIHtcbiAgICBjb25zdCBpdGVtcyA9IHZhbHVlLnNwbGl0KERlbGltaXRlcik7XG4gICAgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gMikge1xuICAgICAgICBjb25zdCBzdGFydEtleVZhbHVlID0gaXRlbXNbMF0uc3BsaXQoQ29vcmREZWxpbWl0ZXIpO1xuICAgICAgICBjb25zdCBlbmRLZXlWYWx1ZSA9IGl0ZW1zWzFdLnNwbGl0KENvb3JkRGVsaW1pdGVyKTtcbiAgICAgICAgaWYgKHN0YXJ0S2V5VmFsdWUubGVuZ3RoID09PSAzICYmIGVuZEtleVZhbHVlLmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QocGFyc2VGbG9hdChzdGFydEtleVZhbHVlWzBdKSwgcGFyc2VGbG9hdChzdGFydEtleVZhbHVlWzFdKSwgcGFyc2VGbG9hdChzdGFydEtleVZhbHVlWzJdKSk7XG4gICAgICAgICAgICBjb25zdCBlbmQgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QocGFyc2VGbG9hdChlbmRLZXlWYWx1ZVswXSksIHBhcnNlRmxvYXQoZW5kS2V5VmFsdWVbMV0pLCBwYXJzZUZsb2F0KGVuZEtleVZhbHVlWzJdKSk7XG4gICAgICAgICAgICByZXR1cm4geyBzdGFydCwgZW5kIH07XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gcGFyc2VTdGFydEVuZCh2YWx1ZSkge1xuICAgIGNvbnN0IGl0ZW1zID0gdmFsdWUuc3BsaXQoRGVsaW1pdGVyKTtcbiAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0S2V5VmFsdWUgPSBpdGVtc1swXS5zcGxpdChDb29yZERlbGltaXRlcik7XG4gICAgICAgIGNvbnN0IGVuZEtleVZhbHVlID0gaXRlbXNbMV0uc3BsaXQoQ29vcmREZWxpbWl0ZXIpO1xuICAgICAgICBpZiAoc3RhcnRLZXlWYWx1ZS5sZW5ndGggPT09IDMgJiYgZW5kS2V5VmFsdWUubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IEdlb21MaWIuY3JlYXRlUG9pbnQzZChwYXJzZUZsb2F0KHN0YXJ0S2V5VmFsdWVbMF0pLCBwYXJzZUZsb2F0KHN0YXJ0S2V5VmFsdWVbMV0pLCAwKTtcbiAgICAgICAgICAgIGNvbnN0IGVuZCA9IEdlb21MaWIuY3JlYXRlUG9pbnQzZChwYXJzZUZsb2F0KGVuZEtleVZhbHVlWzBdKSwgcGFyc2VGbG9hdChlbmRLZXlWYWx1ZVsxXSksIDApO1xuICAgICAgICAgICAgcmV0dXJuIHsgc3RhcnQsIGVuZCwgc3RhcnRIZWlnaHQ6IHBhcnNlRmxvYXQoc3RhcnRLZXlWYWx1ZVsyXSksIGVuZEhlaWdodDogcGFyc2VGbG9hdChlbmRLZXlWYWx1ZVsyXSkgfTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnlQb2ludDNkKHBvaW50KSB7XG4gICAgbGV0IHZhbHVlID0gJyc7XG4gICAgdmFsdWUgKz0gYCR7cG9pbnQueH0ke0Nvb3JkRGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYCR7cG9pbnQueX0ke0Nvb3JkRGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYCR7cG9pbnQuen1gO1xuICAgIHJldHVybiB2YWx1ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVZlY3RvcjNkKHZhbHVlKSB7XG4gICAgY29uc3QgaXRlbXMgPSB2YWx1ZS5zcGxpdChDb29yZERlbGltaXRlcik7XG4gICAgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gMykge1xuICAgICAgICBjb25zdCB2ZWN0b3IgPSBHZW9tTGliLmNyZWF0ZVZlY3RvcjNkKHBhcnNlRmxvYXQoaXRlbXNbMF0pLCBwYXJzZUZsb2F0KGl0ZW1zWzFdKSwgcGFyc2VGbG9hdChpdGVtc1syXSkpO1xuICAgICAgICByZXR1cm4gdmVjdG9yO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnlCYXNlQ29tcG9uZW50KGJhc2VTZWdtZW50LCBsaW5lM2RJbmRleCkge1xuICAgIGxldCB2YWx1ZSA9ICcnO1xuICAgIHZhbHVlICs9IGAke2Jhc2VTZWdtZW50LnBhcmFtLmluZGV4fWA7XG4gICAgaWYgKGxpbmUzZEluZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgKz0gYCR7Q29vcmREZWxpbWl0ZXJ9JHtsaW5lM2RJbmRleH1gO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG59XG5leHBvcnQgZnVuY3Rpb24gcGFyc2VCYXNlQ29tcG9uZW50KHZhbHVlKSB7XG4gICAgY29uc3QgaXRlbXMgPSB2YWx1ZS5zcGxpdChDb29yZERlbGltaXRlcik7XG4gICAgaWYgKHZhbHVlLmxlbmd0aCAmJiBpdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IGJhc2VDb21wb25lbnRJbmRleCA9IHBhcnNlSW50KGl0ZW1zWzBdKTtcbiAgICAgICAgbGV0IGxpbmUzZEluZGV4O1xuICAgICAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICBsaW5lM2RJbmRleCA9IHBhcnNlSW50KGl0ZW1zWzFdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBjb21wb25lbnRJbmRleDogYmFzZUNvbXBvbmVudEluZGV4LCBsaW5lM2RJbmRleCB9O1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0VxdWFsKGEsIGIsIHRvbGVyYW5jZSA9IDEpIHtcbiAgICByZXR1cm4gTWF0aC5hYnMoYSAtIGIpIDw9IHRvbGVyYW5jZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb29yZGluYXRlKG5vcm1hbCkge1xuICAgIGxldCBkeCA9IERpcmVjdGlvblg7XG4gICAgbGV0IGR5ID0gRGlyZWN0aW9uWjtcbiAgICBsZXQgZHogPSBub3JtYWwubm9ybWFsaXplZCgpO1xuICAgIGlmIChEaXJlY3Rpb25aLmlzUGFyYWxsZWwoZHopKSB7XG4gICAgICAgIGR4ID0gRGlyZWN0aW9uWS5jcm9zcyhkeikubm9ybWFsaXplZCgpO1xuICAgICAgICBkeSA9IGR6LmNyb3NzKGR4KS5ub3JtYWxpemVkKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBkeCA9IGR5LmNyb3NzKGR6KS5ub3JtYWxpemVkKCk7XG4gICAgICAgIGR5ID0gZHouY3Jvc3MoZHgpLm5vcm1hbGl6ZWQoKTtcbiAgICB9XG4gICAgcmV0dXJuIHsgZHgsIGR5LCBkeiB9O1xufVxubGV0IGlzSW5PcGVyYXRpb24gPSBmYWxzZTtcbmV4cG9ydCBmdW5jdGlvbiBzdGFydE9wZXJhdGlvbigpIHtcbiAgICBpc0luT3BlcmF0aW9uID0gdHJ1ZTtcbiAgICBhcHAuZ2V0QWN0aXZlRGVzaWduKCkuc3RhcnRPcGVyYXRpb24oKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb21taXRPcGVyYXRpb24oKSB7XG4gICAgYXBwLmdldEFjdGl2ZURlc2lnbigpLmNvbW1pdE9wZXJhdGlvbigpO1xuICAgIGlzSW5PcGVyYXRpb24gPSBmYWxzZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBhYm9ydE9wZXJhdGlvbigpIHtcbiAgICBhcHAuZ2V0QWN0aXZlRGVzaWduKCkuYWJvcnRPcGVyYXRpb24oKTtcbiAgICBpc0luT3BlcmF0aW9uID0gZmFsc2U7XG59XG5leHBvcnQgZnVuY3Rpb24gb25Nb2RlbENoYW5nZWQoY2hhbmdlcykge1xuICAgIGNvbnN0IGRlbGV0ZWQgPSBjaGFuZ2VzLmRlbGV0ZWQ7XG4gICAgY29uc3QgYWRkZWQgPSBjaGFuZ2VzLmFkZGVkO1xuICAgIC8vIGNvbnN0IGVkaXRNb2RlbCA9IGRyYXdTdGFpcnNUb29sLmdldEVkaXRNb2RlbCgpO1xuICAgIGlmICghaXNJbk9wZXJhdGlvbiAmJiAoKGRlbGV0ZWQgPT09IG51bGwgfHwgZGVsZXRlZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGVsZXRlZC5sZW5ndGgpIHx8IChhZGRlZCA9PT0gbnVsbCB8fCBhZGRlZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYWRkZWQubGVuZ3RoKSkpIHtcbiAgICAgICAgLy8gaWYgKGRlbGV0ZWQuc29tZShkZWxldGVHcm91cCA9PiBlZGl0TW9kZWwucGFyZW50LmRlZmluaXRpb25LZXkgPT09IGRlbGV0ZUdyb3VwLmdldEtleSgpKSkge1xuICAgICAgICBkcmF3U3RhaXJzVG9vbC5jbGVhckVkaXRNb2RlbCgpO1xuICAgICAgICAvLyB9XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGlzUGFydE9mRWRpdE1vZGVsKGVkaXRNb2RlbCwgZ3JvdXBJbnN0YW5jZSkge1xuICAgIHZhciBfYSwgX2IsIF9jO1xuICAgIGNvbnN0IGdyb3VwSW5zdGFuY2VLZXkgPSBncm91cEluc3RhbmNlLmdldEtleSgpO1xuICAgIHJldHVybiBlZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlS2V5ID09PSBncm91cEluc3RhbmNlS2V5IHx8XG4gICAgICAgIFsuLi5lZGl0TW9kZWwuc3RhaXJzLnZhbHVlcygpXS5zb21lKGluc3RhbmNlRGF0YSA9PiBpbnN0YW5jZURhdGEuaW5zdGFuY2VLZXkgPT09IGdyb3VwSW5zdGFuY2VLZXkpIHx8XG4gICAgICAgIFsuLi5lZGl0TW9kZWwucGxhdGZvcm1zLnZhbHVlcygpXS5zb21lKGluc3RhbmNlRGF0YSA9PiBpbnN0YW5jZURhdGEuaW5zdGFuY2VLZXkgPT09IGdyb3VwSW5zdGFuY2VLZXkpIHx8XG4gICAgICAgICgoX2EgPSBlZGl0TW9kZWwuaGFuZHJhaWwpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5oYW5kcmFpbEluc3RhbmNlLmluc3RhbmNlS2V5KSA9PT0gZ3JvdXBJbnN0YW5jZUtleSB8fFxuICAgICAgICBbLi4uKCgoX2IgPSBlZGl0TW9kZWwuaGFuZHJhaWwpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5yYWlsSW5zdGFuY2VzKSB8fCBbXSkudmFsdWVzKCldLnNvbWUoaW5zdGFuY2VEYXRhID0+IGluc3RhbmNlRGF0YS5pbnN0YW5jZUtleSA9PT0gZ3JvdXBJbnN0YW5jZUtleSkgfHxcbiAgICAgICAgWy4uLigoKF9jID0gZWRpdE1vZGVsLmhhbmRyYWlsKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuY29sdW1uSW5zdGFuY2VzKSB8fCBbXSkudmFsdWVzKCldLnNvbWUoaW5zdGFuY2VEYXRhID0+IGluc3RhbmNlRGF0YS5pbnN0YW5jZUtleSA9PT0gZ3JvdXBJbnN0YW5jZUtleSk7XG59XG4iLCJleHBvcnQgdmFyIE1lc3NhZ2VUeXBlO1xuKGZ1bmN0aW9uIChNZXNzYWdlVHlwZSkge1xuICAgIE1lc3NhZ2VUeXBlW1wiRHJhd1N0YWlyVmlld01vdW50ZWRcIl0gPSBcImRyYXdTdGFpclZpZXdNb3VudGVkXCI7XG4gICAgTWVzc2FnZVR5cGVbXCJTdGFpclBhcmFtQ2hhbmdlZEJ5SW5wdXRcIl0gPSBcInN0YWlyUGFyYW1DaGFuZ2VkQnlJbnB1dFwiO1xuICAgIE1lc3NhZ2VUeXBlW1wiU3RhaXJQYXJhbUNoYW5nZWRCeURyYXdcIl0gPSBcInN0YWlyUGFyYW1DaGFuZ2VkQnlEcmF3XCI7XG4gICAgTWVzc2FnZVR5cGVbXCJQYXJhbUNoYW5nZWRCeUlucHV0XCJdID0gXCJwYXJhbUNoYW5nZWRCeUlucHV0XCI7XG4gICAgTWVzc2FnZVR5cGVbXCJQYXJhbUNoYW5nZWRCeURyYXdcIl0gPSBcInBhcmFtQ2hhbmdlZEJ5RHJhd1wiO1xuICAgIE1lc3NhZ2VUeXBlW1wiQ29tcG9uZW50QWRkZWRcIl0gPSBcImNvbXBvbmVudEFkZGVkXCI7XG4gICAgTWVzc2FnZVR5cGVbXCJEcmF3U3RhaXJNb2RlbFNldHRsZWRcIl0gPSBcImRyYXdTdGFpck1vZGVsU2V0dGxlZFwiO1xuICAgIE1lc3NhZ2VUeXBlW1wiUHJvcGVydGllc1Zpc2libGVcIl0gPSBcInByb3BlcnRpZXNWaXNpYmxlXCI7XG4gICAgTWVzc2FnZVR5cGVbXCJGb2N1c0NvbXBvbmVudEluZGV4XCJdID0gXCJmb2N1c0NvbXBvbmVudEluZGV4XCI7XG4gICAgTWVzc2FnZVR5cGVbXCJSZW1vdmVDb21wb25lbnRcIl0gPSBcInJlbW92ZUNvbXBvbmVudFwiO1xuICAgIE1lc3NhZ2VUeXBlW1wiTWF0ZXJpYWxSZXBsYWNlQ2xpY2tcIl0gPSBcIm1hdGVyaWFsUmVwbGFjZUNsaWNrXCI7XG4gICAgTWVzc2FnZVR5cGVbXCJBY3RpdmF0ZURyYXdTdGFpcnNUb29sXCJdID0gXCJhY3RpdmF0ZURyYXdTdGFpcnNUb29sXCI7XG4gICAgTWVzc2FnZVR5cGVbXCJEZUFjdGl2YXRlRHJhd1N0YWlyc1Rvb2xcIl0gPSBcImRlQWN0aXZhdGVEcmF3U3RhaXJzVG9vbFwiO1xuICAgIE1lc3NhZ2VUeXBlW1wiTGVhdmVEcmF3U3RhaXJzVG9vbFwiXSA9IFwibGVhdmVEcmF3U3RhaXJzVG9vbFwiO1xufSkoTWVzc2FnZVR5cGUgfHwgKE1lc3NhZ2VUeXBlID0ge30pKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvbWFpbi9tYWluLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9