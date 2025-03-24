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
            if (!editModel || (editPath.every(instance => {
                var _a, _b, _c;
                return instance.getKey() !== editModel.parent.instanceKey &&
                    [...editModel.stairs.values()].every(comp => comp.instanceKey !== instance.getKey()) &&
                    [...editModel.platforms.values()].every(comp => comp.instanceKey !== instance.getKey()) &&
                    ((_a = editModel.handrail) === null || _a === void 0 ? void 0 : _a.handrailInstance.instanceKey) !== instance.getKey() &&
                    ((_b = editModel.handrail) === null || _b === void 0 ? void 0 : _b.railInstances.every(comp => comp.instanceKey !== instance.getKey())) &&
                    ((_c = editModel.handrail) === null || _c === void 0 ? void 0 : _c.columnInstances.every(comp => comp.instanceKey !== instance.getKey()));
            }))) {
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
const LengthTolerance = 10;
const DirectionAngleTolerance = Math.PI / 36;
const AngleTolerance = Math.PI / 180;
const StepCountLimit = 80;
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
    let startWidth = _types__WEBPACK_IMPORTED_MODULE_0__.DefaultStairParam.startWidth;
    let endWidth = _types__WEBPACK_IMPORTED_MODULE_0__.DefaultStairParam.endWidth;
    if (baseSegment) {
        const { param: { endWidth: baseSegmentEndWidth, type: baseSegmentType } } = baseSegment;
        if (type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform) {
            if (baseSegmentType === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform) {
                startWidth = baseSegmentEndWidth;
                endWidth = baseSegmentEndWidth;
            }
            else {
                startWidth = 2 * baseSegmentEndWidth;
                endWidth = 2 * baseSegmentEndWidth;
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
        this.stairParam = _types__WEBPACK_IMPORTED_MODULE_0__.DefaultStairParam;
        this.onMaterialReplaceItemClick = (changeParam, index, isDelete) => {
            return (materialId = '', bgid = '') => __awaiter(this, void 0, void 0, function* () {
                const instancePath = this.editModel ? design.getEditPathsToGroupInstance(this.editModel.parent.instance) : [];
                if (changeParam === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.ComponentMaterial) {
                    const segment = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.getSegmentByIndex)(this.segments, index);
                    if (segment && index !== undefined) {
                        if (this.drawing) {
                            segment.param.material = { materialId, bgid };
                            pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.ParamChangedByDraw, componentParam: Object.assign({}, segment.param) }, '*');
                        }
                        else if (this.editModel) {
                            const theInstance = this.editModel.stairs.get(index) || this.editModel.platforms.get(index);
                            if (theInstance && instancePath) {
                                (0,_utils__WEBPACK_IMPORTED_MODULE_3__.startOperation)();
                                let operationSuccess = true;
                                operationSuccess = operationSuccess && (yield design.activateEditPath([...instancePath[0], this.editModel.parent.instance])).isSuccess;
                                if (isDelete) {
                                    operationSuccess = operationSuccess && design.clearMaterial([theInstance.instance]);
                                }
                                else {
                                    operationSuccess = operationSuccess && design.assignMaterialForEntities([theInstance.instance], materialId, bgid);
                                }
                                operationSuccess = operationSuccess && (yield design.activateEditPath(instancePath[0])).isSuccess;
                                if (operationSuccess) {
                                    (0,_utils__WEBPACK_IMPORTED_MODULE_3__.commitOperation)();
                                    segment.param.material = { materialId, bgid };
                                    pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.ParamChangedByDraw, componentParam: Object.assign({}, segment.param) }, '*');
                                }
                                else {
                                    (0,_utils__WEBPACK_IMPORTED_MODULE_3__.abortOperation)();
                                }
                            }
                        }
                    }
                }
                else if (changeParam === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.StairMaterial || changeParam === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.PlatformMaterial) {
                    if (!this.editModel) {
                        if (changeParam === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.StairMaterial) {
                            this.stairParam.stairMaterial = { materialId, bgid };
                        }
                        else {
                            this.stairParam.platformMaterial = { materialId, bgid };
                        }
                        pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.StairParamChangedByDraw, stairParam: this.stairParam }, '*');
                    }
                    else if (instancePath) {
                        (0,_utils__WEBPACK_IMPORTED_MODULE_3__.startOperation)();
                        let operationSuccess = true;
                        operationSuccess = operationSuccess && (yield design.activateEditPath([...instancePath[0], this.editModel.parent.instance])).isSuccess;
                        const components = changeParam === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.StairMaterial ? this.editModel.stairs : this.editModel.platforms;
                        if (isDelete) {
                            operationSuccess = operationSuccess && design.clearMaterial([...components.values()].map(c => c.instance));
                        }
                        else {
                            operationSuccess = operationSuccess && design.assignMaterialForEntities([...components.values()].map(c => c.instance), materialId, bgid);
                        }
                        operationSuccess = operationSuccess && (yield design.activateEditPath(instancePath[0])).isSuccess;
                        if (operationSuccess) {
                            (0,_utils__WEBPACK_IMPORTED_MODULE_3__.commitOperation)();
                            if (changeParam === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.StairMaterial) {
                                this.stairParam.stairMaterial = { materialId, bgid };
                            }
                            else {
                                this.stairParam.platformMaterial = { materialId, bgid };
                            }
                            pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.StairParamChangedByDraw, stairParam: this.stairParam }, '*');
                        }
                        else {
                            (0,_utils__WEBPACK_IMPORTED_MODULE_3__.abortOperation)();
                        }
                    }
                }
                else if (changeParam === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.HandrailRailMaterial || changeParam === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.HandrailColumnMaterial) {
                    if (!this.editModel) {
                        if (changeParam === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.HandrailRailMaterial) {
                            this.stairParam.handrail.rail.material = { materialId, bgid };
                        }
                        else {
                            this.stairParam.handrail.column.material = { materialId, bgid };
                        }
                        pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.StairParamChangedByDraw, stairParam: this.stairParam }, '*');
                    }
                    else if (instancePath && this.editModel.handrail) {
                        (0,_utils__WEBPACK_IMPORTED_MODULE_3__.startOperation)();
                        let operationSuccess = true;
                        operationSuccess = operationSuccess && (yield design.activateEditPath([...instancePath[0], this.editModel.parent.instance, this.editModel.handrail.handrailInstance.instance])).isSuccess;
                        const components = changeParam === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.HandrailRailMaterial ? this.editModel.handrail.railInstances : this.editModel.handrail.columnInstances;
                        if (isDelete) {
                            operationSuccess = operationSuccess && design.clearMaterial([...components.values()].map(c => c.instance));
                        }
                        else {
                            operationSuccess = operationSuccess && design.assignMaterialForEntities([...components.values()].map(c => c.instance), materialId, bgid);
                        }
                        operationSuccess = operationSuccess && (yield design.activateEditPath(instancePath[0])).isSuccess;
                        if (operationSuccess) {
                            (0,_utils__WEBPACK_IMPORTED_MODULE_3__.commitOperation)();
                            if (changeParam === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.HandrailRailMaterial) {
                                this.stairParam.handrail.rail.material = { materialId, bgid };
                            }
                            else {
                                this.stairParam.handrail.column.material = { materialId, bgid };
                            }
                            pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.StairParamChangedByDraw, stairParam: this.stairParam }, '*');
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
        console.log(window.origin);
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
    drawHandrails() {
        var _a, _b;
        const prevHandrailTempShapeIds = (_a = this.handrailCollection) === null || _a === void 0 ? void 0 : _a.tempShapeId;
        this.generateHandrailShape();
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
    onMaterialReplaceClick(changeParam, index) {
        app.getApplicationUI().toggleMaterialReplacePanel(true, this.onMaterialReplaceItemClick(changeParam, index));
    }
    changeStairParam(stairParam, changeParams) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return __awaiter(this, void 0, void 0, function* () {
            this.stairParam = stairParam;
            if (!this.segments.length) {
                return;
            }
            const instancePath = this.editModel ? design.getEditPathsToGroupInstance(this.editModel.parent.instance) : [];
            const lastSegment = this.segments[this.segments.length - 1];
            let stairPraamString = '';
            if (changeParams.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.HorizontalStep) > -1 || changeParams.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.VerticalStep) > -1 ||
                changeParams.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.StartWidth) > -1 || changeParams.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.EndWidth) > -1 ||
                changeParams.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.Upward) > -1 ||
                changeParams.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.PlatformThickness) > -1) {
                let reGenerateSegments = this.segments;
                if (changeParams.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.Upward) > -1) {
                    (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.changeStairUpward)(reGenerateSegments[0], reGenerateSegments, stairParam.upward, true);
                }
                else {
                    reGenerateSegments = this.segments.filter(seg => changeParams.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.PlatformThickness) > -1 ? seg.param.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform : seg.param.type !== _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform);
                }
                if (reGenerateSegments.length) {
                    for (const reGenerateSegment of reGenerateSegments) {
                        for (const changeParam of changeParams) {
                            reGenerateSegment.param[changeParam] = stairParam[changeParam];
                        }
                    }
                    let operationSuccess = true;
                    if (!this.drawing && this.editModel) {
                        (0,_utils__WEBPACK_IMPORTED_MODULE_3__.startOperation)();
                        if (changeParams[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.StairMaterial) {
                            if (instancePath.length) {
                                operationSuccess = operationSuccess && (yield design.activateEditPath([...instancePath[0], this.editModel.parent.instance])).isSuccess;
                            }
                            if (this.stairParam.stairMaterial && this.stairParam.stairMaterial.materialId) {
                                const stairMaterialString = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.stringifyMaterial)(this.stairParam.stairMaterial);
                                operationSuccess = operationSuccess && !!((_a = this.editModel.parent.instance.getGroupDefinition()) === null || _a === void 0 ? void 0 : _a.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.StairMaterialKey, stairMaterialString).isSuccess);
                                operationSuccess = operationSuccess && design.assignMaterialForEntities([...this.editModel.stairs.values()].map(instanceData => instanceData.instance), this.stairParam.stairMaterial.materialId, this.stairParam.stairMaterial.bgid);
                            }
                        }
                        else if (changeParams[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.PlatformMaterial) {
                            if (instancePath.length) {
                                operationSuccess = operationSuccess && (yield design.activateEditPath([...instancePath[0], this.editModel.parent.instance])).isSuccess;
                            }
                            if (this.stairParam.platformMaterial && this.stairParam.platformMaterial.materialId) {
                                const platformMaterialString = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.stringifyMaterial)(this.stairParam.platformMaterial);
                                operationSuccess = operationSuccess && !!((_b = this.editModel.parent.instance.getGroupDefinition()) === null || _b === void 0 ? void 0 : _b.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.PlatformMaterialKey, platformMaterialString).isSuccess);
                                operationSuccess = operationSuccess && design.assignMaterialForEntities([...this.editModel.platforms.values()].map(instanceData => instanceData.instance), this.stairParam.platformMaterial.materialId, this.stairParam.platformMaterial.bgid);
                            }
                        }
                        else {
                            stairPraamString = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.stringifyStairParam)(this.stairParam);
                            operationSuccess = operationSuccess && !!((_c = this.editModel.parent.instance.getGroupDefinition()) === null || _c === void 0 ? void 0 : _c.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.StairParamKey, stairPraamString).isSuccess);
                            if (instancePath.length) {
                                operationSuccess = operationSuccess && (yield design.activateEditPath([...instancePath[0], this.editModel.parent.instance])).isSuccess;
                            }
                        }
                    }
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
                                            const newInstance = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.buildComponentInstance)(reGenerateSegment, this.segments);
                                            operationSuccess = operationSuccess && !!newInstance;
                                            if (newInstance) {
                                                if (type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform) {
                                                    this.editModel.platforms.set(index, { instance: newInstance, definitionKey: ((_d = newInstance.getGroupDefinition()) === null || _d === void 0 ? void 0 : _d.getKey()) || '', instanceKey: newInstance.getKey() });
                                                }
                                                else {
                                                    this.editModel.stairs.set(index, { instance: newInstance, definitionKey: ((_e = newInstance.getGroupDefinition()) === null || _e === void 0 ? void 0 : _e.getKey()) || '', instanceKey: newInstance.getKey() });
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
                    if (!this.drawing && this.editModel) {
                        if ((_f = this.handrailCollection) === null || _f === void 0 ? void 0 : _f.handrails.length) {
                            const handrailInstancesData = yield (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.buildHandrailInstance)(this.stairParam, (_g = this.handrailCollection) === null || _g === void 0 ? void 0 : _g.handrails);
                            operationSuccess = operationSuccess && handrailInstancesData !== undefined;
                            if (handrailInstancesData) {
                                this.editModel.handrail = handrailInstancesData;
                            }
                        }
                        if (instancePath.length) {
                            operationSuccess = operationSuccess && (yield design.activateEditPath(instancePath[0])).isSuccess;
                        }
                        if (operationSuccess) {
                            (0,_utils__WEBPACK_IMPORTED_MODULE_3__.commitOperation)();
                        }
                        else {
                            (0,_utils__WEBPACK_IMPORTED_MODULE_3__.abortOperation)();
                        }
                        selection.add([this.editModel.parent.instance]);
                    }
                    else if (this.drawing) {
                        this.drawHandrails();
                    }
                }
            }
            else if (changeParams.length === 1 && changeParams[0].startsWith(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.Handrail)) {
                if (this.drawing) {
                    this.drawHandrails();
                }
                else if (this.editModel) {
                    if ((_h = this.handrailCollection) === null || _h === void 0 ? void 0 : _h.handrails.length) {
                        let operationSuccess = true;
                        (0,_utils__WEBPACK_IMPORTED_MODULE_3__.startOperation)();
                        // const handrailParams = this.stairParam.handrail;
                        // if (changeParams[0] === ComponentParamType.HandrailRailMaterial) {
                        //     if (this.editModel.handrail) {
                        //         if (instancePath.length) {
                        //             operationSuccess = operationSuccess && (await design.activateEditPath([...instancePath[0], this.editModel.parent.instance, this.editModel.handrail.handrailInstance.instance])).isSuccess;
                        //         }
                        //         if (this.editModel.handrail?.railInstances.length && handrailParams.rail.material && handrailParams.rail.material.materialId) {
                        //             const railMaterialString = stringifyMaterial(handrailParams.rail.material)
                        //             operationSuccess = operationSuccess && !!this.editModel.parent.instance.getGroupDefinition()?.setCustomProperty(RailMaterialKey, railMaterialString).isSuccess;
                        //             operationSuccess = operationSuccess && design.assignMaterialForEntities(this.editModel.handrail?.railInstances.map(instanceData => instanceData.instance), handrailParams.rail.material.materialId, handrailParams.rail.material.bgid);
                        //         }
                        //     }
                        // } else if (changeParams[0] === ComponentParamType.HandrailColumnMaterial) {
                        //     if (this.editModel.handrail) {
                        //         if (instancePath.length) {
                        //             operationSuccess = operationSuccess && (await design.activateEditPath([...instancePath[0], this.editModel.parent.instance, this.editModel.handrail.handrailInstance.instance])).isSuccess;
                        //         }
                        //         if (this.editModel.handrail?.columnInstances.length && handrailParams.column.material && handrailParams.column.material.materialId) {
                        //             const columnMaterialString = stringifyMaterial(handrailParams.column.material)
                        //             operationSuccess = operationSuccess && !!this.editModel.parent.instance.getGroupDefinition()?.setCustomProperty(ColumnMaterialKey, columnMaterialString).isSuccess;
                        //             operationSuccess = operationSuccess && design.assignMaterialForEntities(this.editModel.handrail?.columnInstances.map(instanceData => instanceData.instance), handrailParams.column.material.materialId, handrailParams.column.material.bgid);
                        //         }
                        //     }
                        // } else {
                        if (this.stairParam.handrail.support) {
                            stairPraamString = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.stringifyStairParam)(this.stairParam);
                            operationSuccess = operationSuccess && !!((_j = this.editModel.parent.instance.getGroupDefinition()) === null || _j === void 0 ? void 0 : _j.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.StairParamKey, stairPraamString).isSuccess);
                            if (instancePath.length) {
                                operationSuccess = operationSuccess && (yield design.activateEditPath([...instancePath[0], this.editModel.parent.instance])).isSuccess;
                            }
                            const handrailInstancesData = yield (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.buildHandrailInstance)(this.stairParam, (_k = this.handrailCollection) === null || _k === void 0 ? void 0 : _k.handrails);
                            operationSuccess = operationSuccess && handrailInstancesData !== undefined;
                            if (handrailInstancesData) {
                                this.editModel.handrail = handrailInstancesData;
                            }
                        }
                        else if (this.editModel.handrail) {
                            if (instancePath.length) {
                                operationSuccess = operationSuccess && (yield design.activateEditPath([...instancePath[0], this.editModel.parent.instance])).isSuccess;
                            }
                            design.removeGroupInstance(this.editModel.handrail.handrailInstance.instance);
                            this.editModel.handrail = undefined;
                        }
                        // }
                        if (instancePath.length) {
                            operationSuccess = operationSuccess && (yield design.activateEditPath([...instancePath[0]])).isSuccess;
                        }
                        if (operationSuccess) {
                            (0,_utils__WEBPACK_IMPORTED_MODULE_3__.commitOperation)();
                        }
                        else {
                            (0,_utils__WEBPACK_IMPORTED_MODULE_3__.abortOperation)();
                        }
                        selection.add([this.editModel.parent.instance]);
                    }
                }
            }
            else if (!stairParam.stairMaterial && changeParams.length === 0 && changeParams[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.StairMaterial) {
                this.onMaterialReplaceItemClick(changeParams[0], undefined, true)();
            }
            else if (!stairParam.platformMaterial && changeParams.length === 0 && changeParams[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.PlatformLength) {
                this.onMaterialReplaceItemClick(changeParams[0], undefined, true)();
            }
            else if (!stairParam.handrail.rail.material && changeParams.length === 0 && changeParams[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.HandrailRailMaterial) {
                this.onMaterialReplaceItemClick(changeParams[0], undefined, true)();
            }
            else if (!stairParam.handrail.column.material && changeParams.length === 0 && changeParams[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.HandrailColumnMaterial) {
                this.onMaterialReplaceItemClick(changeParams[0], undefined, true)();
            }
        });
    }
    changeComponentParam(componentParam, changeParams) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.segments.length)
                return;
            const theSegment = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.getSegmentByIndex)(this.segments, componentParam.index);
            const lastSegment = this.segments[this.segments.length - 1];
            if (theSegment) {
                const { param: { index, type } } = theSegment;
                componentParam.modelEditing = true;
                theSegment.param = componentParam;
                if (!(0,_tempMeshUtils__WEBPACK_IMPORTED_MODULE_1__.isCircularStair)(theSegment)) {
                    theSegment.circleTangent = undefined;
                }
                if (changeParams.length === 0 && changeParams[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.ComponentMaterial && !componentParam.material) {
                    this.onMaterialReplaceItemClick(changeParams[0], componentParam.index, true);
                }
                else {
                    if (this.drawing) {
                        this.drawTempComponent(theSegment, theSegment.param.index !== lastSegment.param.index, true);
                    }
                    else if (this.editModel) {
                        // selection.clear();
                        const theInstance = this.editModel.stairs.get(index) || this.editModel.platforms.get(index);
                        if (theInstance) {
                            this.generateSegmentShape(theSegment);
                            const theMeshes = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.generateMeshes)([theSegment]);
                            if (theMeshes.length) {
                                (0,_utils__WEBPACK_IMPORTED_MODULE_3__.startOperation)();
                                let operationSuccess = true;
                                const instancePath = design.getEditPathsToGroupInstance(this.editModel.parent.instance);
                                if (instancePath.length) {
                                    operationSuccess = operationSuccess && (yield design.activateEditPath([...instancePath[0], this.editModel.parent.instance])).isSuccess;
                                }
                                if (operationSuccess) {
                                    operationSuccess = operationSuccess && design.removeGroupInstance(theInstance.instance).isSuccess;
                                    if (operationSuccess) {
                                        const newInstance = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.buildComponentInstance)(theSegment, this.segments);
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
                                if ((_c = this.handrailCollection) === null || _c === void 0 ? void 0 : _c.handrails.length) {
                                    const handrailInstancesData = yield (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.buildHandrailInstance)(this.stairParam, (_d = this.handrailCollection) === null || _d === void 0 ? void 0 : _d.handrails);
                                    operationSuccess = operationSuccess && handrailInstancesData !== undefined;
                                    if (handrailInstancesData) {
                                        this.editModel.handrail = handrailInstancesData;
                                    }
                                }
                                if (instancePath.length) {
                                    operationSuccess = operationSuccess && (yield design.activateEditPath(instancePath[0])).isSuccess;
                                }
                                if (operationSuccess) {
                                    (0,_utils__WEBPACK_IMPORTED_MODULE_3__.commitOperation)();
                                }
                                else {
                                    (0,_utils__WEBPACK_IMPORTED_MODULE_3__.abortOperation)();
                                }
                                selection.add([this.editModel.parent.instance]);
                            }
                        }
                    }
                }
            }
        });
    }
    // changeComponentType(componentType: ComponentType) {
    //     this.componentParam.type = componentType;
    //     pluginUI.postMessage({ type: 'componentParamChanged', componentParam: { ...this.componentParam } }, '*');
    //     this.changeComponentParam(this.componentParam, [ComponentParamType.Type]);
    // }
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
        var _a, _b, _c, _d;
        if (((_a = this.editModel) === null || _a === void 0 ? void 0 : _a.parent.instanceKey) === groupInstance.getKey()) {
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
                    parent: { instance: groupInstance, definitionKey: ((_b = groupInstance.getGroupDefinition()) === null || _b === void 0 ? void 0 : _b.getKey()) || '', instanceKey: groupInstance.getKey() },
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
                                    editModel.platforms.set(param.index, { instance: subInstance, definitionKey: ((_c = subInstance.getGroupDefinition()) === null || _c === void 0 ? void 0 : _c.getKey()) || '', instanceKey: subInstance.getKey() });
                                }
                                else {
                                    editModel.stairs.set(param.index, { instance: subInstance, definitionKey: ((_d = subInstance.getGroupDefinition()) === null || _d === void 0 ? void 0 : _d.getKey()) || '', instanceKey: subInstance.getKey() });
                                }
                            }
                        }
                        // }
                    }
                }
                if (segments.length) {
                    segments.sort((a, b) => a.param.index - b.param.index);
                    (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.buildSegmentRelations)(segments);
                    this.segments = segments;
                    this.editModel = editModel;
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
        this.stairParam = _types__WEBPACK_IMPORTED_MODULE_0__.DefaultStairParam;
        // this.editModel = undefined;
    }
    onRButtonUp(event, inferenceResult) {
        this.tryCommit().then(() => {
            (0,_main_main__WEBPACK_IMPORTED_MODULE_5__.deActivateDrawStairsTool)();
        });
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
    generateHandrailShape() {
        if (this.segments.length) {
            const handrails = (0,_tempMeshUtils__WEBPACK_IMPORTED_MODULE_1__.generateHandrailShape)(this.stairParam, this.segments);
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
/* harmony export */   changeStairUpward: () => (/* binding */ changeStairUpward),
/* harmony export */   drawCircle: () => (/* binding */ drawCircle),
/* harmony export */   drawRect: () => (/* binding */ drawRect),
/* harmony export */   generateMeshes: () => (/* binding */ generateMeshes),
/* harmony export */   getNextComponents: () => (/* binding */ getNextComponents),
/* harmony export */   getSegmentByIndex: () => (/* binding */ getSegmentByIndex)
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
function buildComponentInstance(segment, segments) {
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
                    const BaseLineString = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.stringifyStartEnd)(baseComponent.line3d.start, baseComponent.line3d.end);
                    operationSuccess = operationSuccess && groupDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_1__.BaseLineSeg3dKey, BaseLineString).isSuccess;
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
function buildHandrailInstance(stairParam, handrails) {
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
            columnFace = drawRect(_consts__WEBPACK_IMPORTED_MODULE_0__.dummyPoint3d, _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ, columnParam.width || _types__WEBPACK_IMPORTED_MODULE_1__.DefaultStairParam.horizontalStep / 10, columnParam.height || _types__WEBPACK_IMPORTED_MODULE_1__.DefaultStairParam.horizontalStep / 10);
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
                const railStartDir = (railStartCurve === null || railStartCurve === void 0 ? void 0 : railStartCurve.endPoint.subtracted(railStartPoint)) || _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ;
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
function drawRect(center, normal, width, height, z = 0, withCorner = true) {
    const point1 = GeomLib.createPoint3d(0, 0, z);
    const point2 = GeomLib.createPoint3d(width, 0, z);
    let points = [point1, point2];
    if (withCorner) {
        const p5 = GeomLib.createPoint3d(width, height / 3 * 2, z);
        const p6 = GeomLib.createPoint3d(width / 4 * 3, height, z);
        const m1 = GeomLib.createPoint3d((p5.x + p6.x) / 2, (p5.y + p6.y) / 2, z);
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
        const p7 = GeomLib.createPoint3d(width / 4, height, z);
        const p8 = GeomLib.createPoint3d(0, height / 3 * 2, z);
        const m2 = GeomLib.createPoint3d((p5.x + p6.x) / 2, (p5.y + p6.y) / 2, z);
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
        const point3 = GeomLib.createPoint3d(width, height, z);
        const point4 = GeomLib.createPoint3d(0, height, z);
        points.push(point3, point4);
    }
    const coordinate = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getCoordinate)(normal);
    const coordinateMat = GeomLib.createAlignCCSMatrix4(coordinate.dx, coordinate.dy, coordinate.dz, center);
    const translateMat1 = GeomLib.createTranslationMatrix4(-width / 2, -height / 2, 0);
    // const translateMat2 = GeomLib.createTranslationMatrix4(center.x, center.y, center.z);
    const transformMat = coordinateMat.multiplied(translateMat1);
    points = points.map(p => p.appliedMatrix4(transformMat));
    const activeDesign = app.getActiveDesign();
    const res = activeDesign.addEdges(points);
    if (res === null || res === void 0 ? void 0 : res.addedEdges.length) {
        const setSoftResult = activeDesign.setEdgesSoft(res.addedEdges, true);
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
function changeStairUpward(startSegment, segments, upward, bulkChange) {
    if (segments.length) {
        let current = [{ segment: startSegment, verticalDelta: 0 }];
        const unVisited = new Set(segments);
        while (current.length) {
            let next = [];
            for (const { segment, verticalDelta } of current) {
                const { startHeight, endHeight } = segment;
                const endDelta = segment.param.type === _types__WEBPACK_IMPORTED_MODULE_1__.ComponentType.Platform ? 0 : Math.abs(endHeight - startHeight) * (upward ? 1 : -1);
                segment.startHeight = verticalDelta;
                segment.endHeight = segment.startHeight + endDelta;
                segment.param.upward = upward;
                unVisited.delete(segment);
                const nextSegments = getNextComponents(segment, segments);
                if (nextSegments.length) {
                    next.push(...nextSegments.map(seg => ({ segment: seg, verticalDelta: segment.endHeight })));
                }
            }
            current = next;
            if (!current.length) {
                if (bulkChange && unVisited.size) {
                    const theSegment = [...unVisited.values()][0];
                    current = [{ segment: theSegment, verticalDelta: theSegment.startHeight > 0 === upward ? 0 : (theSegment.startHeight * -2) }];
                }
            }
        }
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
        if (baseComponent) {
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
    let horizontalDistance = start.distanceTo(end);
    let horizontalLeftDir = _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.cross(horizontalFrontDir);
    const stepFloatCount = horizontalDistance / horizontalStep;
    const stepCount = Math.ceil(stepFloatCount);
    const lastStepLength = horizontalDistance - (stepCount - 1) * horizontalStep;
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
            horizontalDistance = horizontalDistance * Math.cos(deltaAngle);
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
const ColumnStepTolerance = 1 / 10;
function generateHandrailShape(stairParam, segments) {
    const { handrail: { support, height, column: { step, param: columnParam } } } = stairParam;
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
                    // if ((!startLocked && type !== ComponentType.CircularStair) || (!circleTangent && type === ComponentType.CircularStair)) {
                    continue;
                }
                const stepHeight = upward ? verticalStep : -verticalStep;
                const offsetLength = Math.max(columnParam.height || 0, columnParam.width || 0, columnParam.radius || 0) * 3;
                const baseSegment = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_1__.getSegmentByIndex)(segments, baseComponent === null || baseComponent === void 0 ? void 0 : baseComponent.componentIndex);
                const { startLine: { line3dInd: startLine3dInd }, baseLine: { dir: baseLine3dDir, end: baseLine3dEnd }, } = getSegmentStartAndBaseLine3d(currentSegment, segments, baseSegment);
                // let baseLine3dDir: KVector3d | undefined = baseComponent?.line3d ? baseComponent.line3d.end.subtracted(baseComponent.line3d.start).normalized() : DirectionX;
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
                // let siblingSegmentInds = baseSegment?.nextComponents[baseComponent?.line3dIndex || 0];
                // let nextSiblingSegment = getSegmentByIndex(segments, [...siblingSegmentInds || []]?.find(ind => {
                //     const visitedSibling = visited.get(ind);
                //     return !visitedSibling;
                // }));
                // const visitedBaseSegment = baseSegment ? visited.get(baseSegment.param.index) : undefined;
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
                    // const currentStartLine3dIndex = getSegmentStartAndBaseLine3d(currentSegment, segments).startLine.line3dInd;
                    const hasEntranceSegment = line3dInd === startLine3dInd;
                    // const nextSegmentIndexes = nextComponents[line3dInd];
                    let nearestSegment;
                    for (const nextSegmentIndex of nextComponents[line3dInd]) {
                        const nextSegment = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_1__.getSegmentByIndex)(segments, nextSegmentIndex);
                        if (nextSegment) {
                            const { start } = nextSegment;
                            const ds = start.distanceTo(sp);
                            const de = start.distanceTo(ep);
                            const visitNextRecord = visited.get(nextSegment.param.index);
                            const nextComponentStartLine3dInd = getSegmentStartAndBaseLine3d(nextSegment, segments).startLine.line3dInd;
                            if ((0,_utils__WEBPACK_IMPORTED_MODULE_3__.isEqual)(ds + de, lastLength) && !(visitNextRecord === null || visitNextRecord === void 0 ? void 0 : visitNextRecord.right) && !(visitNextRecord === null || visitNextRecord === void 0 ? void 0 : visitNextRecord.line3dIndexes.has(nextComponentStartLine3dInd))) {
                                if (!nearestSegment || nearestSegment.distance > ds) {
                                    nearestSegment = { segment: nextSegment, distance: ds };
                                }
                            }
                        }
                    }
                    let lastDistance = lastLength;
                    if (nearestSegment) {
                        // const { moldShape: { vertices: nearestVertices, tempLines: nearestTempLines } } = nearestSegment.segment;
                        const { endOnBaseLine } = getSegmentStartAndBaseLine3d(nearestSegment.segment, segments).startLine;
                        // const nearestLine3d = nearestSegment.segment.param.type === ComponentType.Platform ? nearestTempLines[nearestLine3dInd] : nearestTempLines[0];
                        // const nearestLine3dDir = nearestVertices[nearestLine3d[1]].subtracted(nearestVertices[nearestLine3d[0]]).normalized();
                        ep = endOnBaseLine;
                        // ep = nearestVertices[nearestLine3d[1]];
                        spToEpDir = ep.subtracted(sp).normalized();
                        if (spToEpDir.dot(line3dDir) < 0) {
                            lastDistance = 0;
                            pushEnd = false;
                            nextStartPoint = sp;
                        }
                        else {
                            lastDistance = sp.distanceTo(ep);
                            nextStartPoint = isPlatform(nearestSegment.segment) ? ep : undefined;
                        }
                        // lastLength = sp.distanceTo(ep);
                    }
                    else if (isEntrance && hasEntranceSegment && baseSegment) {
                        // const { line3d: baseLine3d, dir: baseLine3dDir } = getSegmentStartAndBaseLine3d(currentSegment, segments, baseSegment).baseLine;
                        // const { moldShape: { vertices: baseVertices, tempLines: baseTempLines } } = baseSegment;
                        // const baseLine3d = baseSegment.param.type === ComponentType.Platform ? baseTempLines[baseComponent?.line3dIndex || 0] : baseTempLines[baseTempLines.length - 1];
                        // baseLine3dDir = baseVertices[baseLine3d[1]].subtracted(baseVertices[baseLine3d[0]]).normalized();
                        // if (baseSegment.param.type === ComponentType.Platform && nextSiblingSegment) {
                        //     // don't care because next is platform (next will deal the case) or stair (only have one nextComponent which is currentSegment)
                        //     const { start: nextSiblingSegmentStartLineStart } = getSegmentStartAndBaseLine3d(nextSiblingSegment, segments, baseSegment).startLine;
                        //     ep = nextSiblingSegmentStartLineStart;
                        //     // if (nextSiblingSegment.param.type === ComponentType.Platform) {
                        //     //     const nextSiblingSegStartLine3d = nextSiblingSegment.moldShape.tempLines[getSegmentStartAndBaseLine3d(nextSiblingSegment, segments).startLine.line3dInd];
                        //     //     ep = nextSiblingSegment.moldShape.vertices[nextSiblingSegStartLine3d[1]];
                        //     // } else {
                        //     //     ep = nextSiblingSegment.start.added(baseLine3dDir.multiplied(-nextSiblingSegment.param.startWidth / 2));
                        //     // }
                        // } else {
                        ep = baseLine3dEnd;
                        // }
                        spToEpDir = ep.subtracted(sp).normalized();
                        if (spToEpDir.dot(baseLine3dDir) > 0) {
                            lastDistance = 0;
                            pushEnd = false;
                            const nextCornerDistance = ep.distanceTo(sp);
                            if (nextCornerDistance > offsetLength) {
                                nextStartPoint = sp;
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
                    }
                    // spToEpDir = ep.subtracted(sp).normalized();
                    const firstBottomPt = sp.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight)).added(offsetDir.multiplied(offsetLength)).added(spToEpDir.multiplied(startPoint ? 0 : offsetLength));
                    if (lastDistance > 0 || (lastDistance === 0 && !startPoint)) {
                        // push rail
                        handrail.rail.push(firstBottomPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height)));
                    }
                    // push columns
                    if (lastDistance > 0) {
                        let tempDistance = 0;
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
                    // if (pushEnd && (nearestSegment || (isEntrance && lastDistance > 0))) {
                    //     // push rail
                    //     handrail.rail.push(ep.added(DirectionZ.multiplied(startHeight + height)).added(offsetDir.multiplied(offsetLength)));
                    //     if (tempDistance - step < lastDistance) {
                    //         const lastBottomPoint = sp.added(spToEpDir.multiplied(lastDistance)).added(DirectionZ.multiplied(startHeight)).added(offsetDir.multiplied(offsetLength));
                    //         handrail.columns.push([
                    //             lastBottomPoint,
                    //             lastBottomPoint.added(DirectionZ.multiplied(height)),
                    //         ]);
                    //     }
                    // }
                    if (nearestSegment) {
                        next.push({
                            segment: nearestSegment.segment,
                            line3dInd: getSegmentStartAndBaseLine3d(nearestSegment.segment, segments).startLine.line3dInd,
                            left: false,
                            start: false,
                            startPoint: nextStartPoint,
                        });
                    }
                    else {
                        if (isEntrance) {
                            if (baseSegment && hasEntranceSegment) {
                                // siblingSegmentInds = baseSegment.nextComponents[baseComponent.line3dIndex];
                                // if (nextSiblingSegment && baseSegment.param.type !== ComponentType.Platform) {
                                //     // never happen
                                //     next.push({
                                //         segment: nextSiblingSegment,
                                //         line3dInd: getSegmentStartAndBaseLine3d(nextSiblingSegment, segments).startLine.line3dInd,
                                //         left: false,
                                //         start: false,
                                //         startPoint: nextStartPoint,
                                //     });
                                // } else {
                                // if ((visitedBaseSegment?.right && !visitedBaseSegment.left)) {
                                next.push({
                                    segment: baseSegment,
                                    line3dInd: baseSegment.param.type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.Platform ? (baseComponent === null || baseComponent === void 0 ? void 0 : baseComponent.line3dIndex) || 0 : 0,
                                    left: true,
                                    start: false,
                                    startPoint: nextStartPoint,
                                });
                                // }
                                // }
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
                    const columnActualHeight = height + verticalStep / 2;
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
                        let tempHeadDistance = step;
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
                                // const lastBottomPoint = ep.added(DirectionZ.multiplied(left ? endHeight : startHeight)).added(cornerOffsetDir.multiplied(offsetLength));
                                // handrail.rail.push(lastBottomPoint.added(DirectionZ.multiplied(height)));
                                headCornerColumns.push([
                                    lastBottomPoint,
                                    lastBottomPoint.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height)),
                                ]);
                            }
                        }
                    }
                    nextStartPoint = left ? sp : ep;
                    // next segment startWidth !== currentSegment endWidth
                    pushEnd = false;
                    // const reasonableStep = Math.ceil(step / horizontalStep) * horizontalStep;
                    const reasonableStepCount = Math.ceil(step / horizontalStep);
                    let tempStepCount = 0;
                    const arcChordAngle = circleTangent ? startToEndDir.angle(circleTangent) : 0;
                    if (type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.StraightStair || (type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.CircularStair && (arcChordAngle <= _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionAngleTolerance || !circleTangent))) {
                        lastLength = sp.distanceTo(ep);
                        // push rail
                        // if (deltaAngle > DirectionAngleTolerance) {
                        //     const cornerBottomPt = sp.added(DirectionZ.multiplied(startHeight)).added(baseLine3dDir.multiplied((startWidth / 2 - offsetLength) * (left ? 1 : -1)));
                        //     stairRail.push(cornerBottomPt.added(DirectionZ.multiplied(height)));
                        //     stairColumns.push([
                        //         cornerBottomPt,
                        //         cornerBottomPt.added(DirectionZ.multiplied(height)),
                        //     ]);
                        // }
                        stairRail.push(sp.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight + height + (upward ? 1 : 0) * stepHeight)).added(leftDir.multiplied(left ? -offsetLength : offsetLength)));
                        if (!upward && stepCount > 1) {
                            stairRail.push(sp.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight + height)).added(frontDir.multiplied(horizontalStep)).added(leftDir.multiplied(left ? -offsetLength : offsetLength)));
                        }
                        // push columns
                        // let tempDistance = horizontalStep / 2;
                        while (tempStepCount < stepCount - 1) {
                            const curHorStepDistance = (tempStepCount + 0.5) * horizontalStep;
                            const curVerStepDistance = (tempStepCount + (upward ? 1 : 0)) * stepHeight;
                            const bottomPoint = sp.added(frontDir.multiplied(curHorStepDistance)).added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight + curVerStepDistance)).added(leftDir.multiplied(left ? -offsetLength : offsetLength));
                            stairColumns.push([
                                bottomPoint,
                                bottomPoint.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(!upward && tempStepCount === 0 ? height : columnActualHeight)),
                            ]);
                            // const tempStepCount = Math.floor(tempDistance / horizontalStep);
                            // tempDistance += reasonableStep;
                            tempStepCount += reasonableStepCount;
                        }
                        if (stepCount > 1) {
                            if (upward) {
                                stairRail.push(sp.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight + height + (upward ? stepCount : (stepCount - (stepCount > 2 ? 2 : 1))) * stepHeight)).added(frontDir.multiplied((stepCount - 1) * horizontalStep)).added(leftDir.multiplied(left ? -offsetLength : offsetLength)));
                            }
                        }
                        const totalLength = Math.abs(end.subtracted(start).dot(frontDir));
                        const prevTotalStepLength = (stepCount - 1) * horizontalStep;
                        const lastStepLength = lastLength - prevTotalStepLength;
                        stairRail.push(sp.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight + height + (upward ? stepCount : (Math.max(0, totalLength - horizontalStep) / horizontalStep)) * stepHeight)).added(frontDir.multiplied(totalLength)).added(leftDir.multiplied(left ? -offsetLength : offsetLength)));
                        if (tempStepCount - reasonableStepCount <= stepCount - 1) {
                            const lastBottomPoint = sp.added(frontDir.multiplied(prevTotalStepLength + lastStepLength / 2)).added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(endHeight + (upward ? 0 : -stepHeight))).added(leftDir.multiplied(left ? -offsetLength : offsetLength));
                            stairColumns.push([
                                lastBottomPoint,
                                lastBottomPoint.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height + (upward ? 0 : (verticalStep * (1 - lastStepLength / horizontalStep / 2))))),
                            ]);
                        }
                        // next segment startWidth !== currentSegment endWidth
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
                        // if (radius < maxWidth / 2 * 1.2 || innerRadius < horizontalStep / 2 / 0.8) {
                        //     return;
                        // }
                        const horizontalStepAngle = Math.asin(horizontalStep / 2 / innerRadius) * 2;
                        const circleNormal = isLeftArc ? _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ : _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.reversed();
                        const circleCenter = start.added(tangentLeftDir.multiplied(isLeftArc ? radius : -radius));
                        // const circle = GeomLib.createCircle3dByCenterNormalRadius(circleCenter, circleNormal, radius);
                        const arc = GeomLib.createArc3dByCenterNormalRadius(circleCenter, circleNormal, radius, start, end);
                        const arcAngle = arc.arcAngle;
                        // const stepCount = Math.ceil(arcAngle / horizontalStepAngle);
                        const lastHorizontalAngle = arcAngle - horizontalStepAngle * (stepCount - 1);
                        // const validStepCount = (lastHorizontalAngle === 0 || lastHorizontalAngle > AngleTolerance) ? stepCount : stepCount - 1;
                        // if (horizontalStepAngle >= arcAngle || horizontalStepAngle >= Math.PI / 2 || validStepCount >= StepCountLimit || validStepCount < 1) {
                        //     return;
                        // }
                        const startRadiusDir = isLeftArc ? tangentLeftDir.reversed() : tangentLeftDir;
                        // if (deltaAngle > DirectionAngleTolerance) {
                        //     const cornerBottomPt = sp.added(DirectionZ.multiplied(startHeight)).added(baseLine3dDir.multiplied((startWidth / 2 - offsetLength) * (left ? 1 : -1)));
                        //     stairRail.push(cornerBottomPt.added(DirectionZ.multiplied(height)));
                        //     stairColumns.push([
                        //         cornerBottomPt,
                        //         cornerBottomPt.added(DirectionZ.multiplied(height)),
                        //     ]);
                        // }
                        // push columns
                        while (tempStepCount < stepCount) {
                            const curRotateAngle = horizontalStepAngle * tempStepCount;
                            const nextRotateAngle = horizontalStepAngle * tempStepCount + (tempStepCount === stepCount - 1 ? lastHorizontalAngle : horizontalStepAngle);
                            const curRotateMatrix = GeomLib.createRotateMatrix4(horizontalStepAngle * tempStepCount, circleNormal, _consts__WEBPACK_IMPORTED_MODULE_0__.dummyPoint3d);
                            const nextRotateMatrix = GeomLib.createRotateMatrix4(nextRotateAngle, circleNormal, _consts__WEBPACK_IMPORTED_MODULE_0__.dummyPoint3d);
                            const curRadiusDir = startRadiusDir.appliedMatrix4(curRotateMatrix);
                            const nextRadiusDir = startRadiusDir.appliedMatrix4(nextRotateMatrix);
                            const curHalfWidth = (startWidth + (endWidth - startWidth) * (curRotateAngle) / arcAngle) / 2 * (isLeftArc ? -1 : 1);
                            const nextHalfWidth = (startWidth + (endWidth - startWidth) * (nextRotateAngle) / arcAngle) / 2 * (isLeftArc ? -1 : 1);
                            const curLeftMoldPt = circleCenter.added(curRadiusDir.multiplied(radius + curHalfWidth));
                            const curRightMoldPt = circleCenter.added(curRadiusDir.multiplied(radius - curHalfWidth));
                            const nextLeftMoldPt = circleCenter.added(nextRadiusDir.multiplied(radius + nextHalfWidth));
                            const nextRightMoldPt = circleCenter.added(nextRadiusDir.multiplied(radius - nextHalfWidth));
                            const curStepLeftFrontDir = nextLeftMoldPt.subtracted(curLeftMoldPt).multiplied(0.5);
                            const curStepRightFrontDir = nextRightMoldPt.subtracted(curRightMoldPt).multiplied(0.5);
                            const curStepLeftDir = _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.cross(curStepLeftFrontDir).normalized();
                            const curStepRightDir = _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.cross(curStepRightFrontDir).normalized();
                            const curLeftBottomPt = curLeftMoldPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight + (tempStepCount + (upward ? 1 : 0)) * stepHeight)).added(curStepLeftDir.multiplied(-offsetLength));
                            const curRightBottomPt = curRightMoldPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight + (tempStepCount + (upward ? 1 : 0)) * stepHeight)).added(curStepRightDir.multiplied(offsetLength));
                            const curLeftBottomMidPt = curLeftBottomPt.added(curStepLeftFrontDir);
                            const curRightBottomMidPt = curRightBottomPt.added(curStepRightFrontDir);
                            // const bottomPoint = sp.added(frontDir.multiplied(tempDistance)).added(DirectionZ.multiplied(startHeight));
                            if (tempStepCount >= 0) {
                                // push rail
                                // stairRail.push(sp.added(DirectionZ.multiplied(startHeight + height + (upward ? 1 : 0) * stepHeight)).added(leftDir.multiplied(offsetLength)));
                                if (left) {
                                    stairRail.push(curLeftBottomPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height + (tempStepCount > 0 && !upward ? -stepHeight : 0))));
                                    // if (!upward && tempStepCount === 0) {
                                    //     const nextLeftBottomPt = nextLeftMoldPt.added(DirectionZ.multiplied(startHeight + (tempStepCount + (upward ? 1 : 0)) * stepHeight)).added(curStepLeftDir.multiplied(-offsetLength));
                                    //     stairRail.push(nextLeftBottomPt.added(DirectionZ.multiplied(height)));
                                    // }
                                }
                                else {
                                    stairRail.push(curRightBottomPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height + (tempStepCount > 0 && !upward ? -stepHeight : 0))));
                                    // if (!upward && tempStepCount === 0) {
                                    //     const nextRightBottomPt = nextRightMoldPt.added(DirectionZ.multiplied(startHeight + (tempStepCount + (upward ? 1 : 0)) * stepHeight)).added(curStepRightDir.multiplied(offsetLength));
                                    //     stairRail.push(nextRightBottomPt.added(DirectionZ.multiplied(height)));
                                    // }
                                }
                                if (tempStepCount === stepCount - 1) {
                                    const lastStepPercent = lastHorizontalAngle / horizontalStepAngle;
                                    if (left) {
                                        // stairRail.push(curLeftBottomMidPt.added(curStepLeftFrontDir.reversed()).added(DirectionZ.multiplied(height)));
                                        stairRail.push(curLeftBottomMidPt.added(curStepLeftFrontDir).added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height + (upward ? 0 : -stepHeight * (1 - lastStepPercent)))));
                                    }
                                    else {
                                        // stairRail.push(curRightBottomMidPt.added(curStepRightFrontDir.reversed()).added(DirectionZ.multiplied(height)));
                                        stairRail.push(curRightBottomMidPt.added(curStepRightFrontDir).added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height + (upward ? 0 : -stepHeight * (1 - lastStepPercent)))));
                                        // nextStartPoint = curRightMoldPt;
                                    }
                                    // if (tempStepCount % reasonableStepCount !== 0) {
                                    stairColumns.push([
                                        left ? curLeftBottomMidPt : curRightBottomMidPt,
                                        (left ? curLeftBottomMidPt : curRightBottomMidPt).added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height + (upward ? 0 : (verticalStep * (1 - lastStepPercent / 2))))),
                                    ]);
                                    // }
                                    // next segment startWidth !== currentSegment endWidth
                                    sp = left ? start.added(baseLine3dDir.multiplied(startWidth / 2 - offsetLength)) : curRightMoldPt;
                                    if (!left) {
                                        leftDir = curStepLeftDir;
                                    }
                                }
                            }
                            if (tempStepCount % reasonableStepCount === 0 && tempStepCount < stepCount - 1) {
                                stairColumns.push([
                                    left ? curLeftBottomMidPt : curRightBottomMidPt,
                                    (left ? curLeftBottomMidPt : curRightBottomMidPt).added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(!upward && tempStepCount === 0 ? height : columnActualHeight)),
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
                            // if (nextSiblingSegment && baseSegment.param.type !== ComponentType.Platform) {
                            //     // never happen
                            //     next.push({
                            //         segment: nextSiblingSegment,
                            //         line3dInd: getSegmentStartAndBaseLine3d(nextSiblingSegment, segments).startLine.line3dInd,
                            //         left: false,
                            //         start: false,
                            //         startPoint: nextStartPoint,
                            //     });
                            // } else {
                            // const { moldShape: { vertices: baseVertices, tempLines: baseTempLines } } = baseSegment;
                            // const baseLine3d = baseSegment.param.type === ComponentType.Platform ? baseTempLines[baseComponent?.line3dIndex || 0] : baseTempLines[baseTempLines.length - 1];
                            // const baseLine3dDir = baseVertices[baseLine3d[1]].subtracted(baseVertices[baseLine3d[0]]).normalized();
                            ep = baseLine3dEnd;
                            spToEpDir = ep.subtracted(sp).normalized();
                            if (spToEpDir.dot(baseLine3dDir) > 0) {
                                nextStartPoint = sp;
                            }
                            else {
                                pushEnd = true;
                                nextStartPoint = isPlatform(baseSegment) ? ep : undefined;
                                ;
                            }
                            // if (baseSegment && (visitedBaseSegment?.right && !visitedBaseSegment.left)) {
                            next.push({
                                segment: baseSegment,
                                line3dInd: baseSegment.param.type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.Platform ? (baseComponent === null || baseComponent === void 0 ? void 0 : baseComponent.line3dIndex) || 0 : 0,
                                left: true,
                                start: false,
                                startPoint: nextStartPoint,
                            });
                            // }
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
                            // const { moldShape: { vertices: stairNextVertices, tempLines: stairNextTempLines } } = stairNextSegment;
                            const { line3dInd: stairNextLine3dInd, endOnBaseLine } = getSegmentStartAndBaseLine3d(stairNextSegment, segments, currentSegment).startLine;
                            // const stairNextLine3d = stairNextSegment.param.type === ComponentType.Platform ? stairNextTempLines[stairNextLine3dInd] : stairNextTempLines[0];
                            // const stairNextLine3dDir = stairNextVertices[stairNextLine3d[1]].subtracted(stairNextVertices[stairNextLine3d[0]]).normalized();
                            ep = endOnBaseLine;
                            spToEpDir = ep.subtracted(sp).normalized();
                            if (spToEpDir.dot(line3dDir) > 0) {
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
                        let tempTailDistance = left ? 0 : step;
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
function getSegmentStartAndBaseLine3d(segment, segments, baseSegment) {
    const { start, param: { type, startWidth }, componentDirectionType, moldShape: { tempLines, vertices }, baseComponent } = segment;
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
    let startOnBaseLine = startLine3dStart;
    let endOnBaseLine = startLine3dEnd;
    if (type !== _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.Platform) {
        startOnBaseLine = start.added(baseLine3dDir.multiplied(startWidth / 2));
        endOnBaseLine = start.added(baseLine3dDir.multiplied(-startWidth / 2));
    }
    return {
        startLine: { line3dInd: startLine3dInd, line3d: startLine3d, dir: startLine3dDir, start: startLine3dStart, end: startLine3dEnd, startOnBaseLine, endOnBaseLine },
        baseLine: { line3dInd: baseLine3dInd, line3d: baseLine3d, dir: baseLine3dDir, start: baseLine3dStart, end: baseLine3dEnd },
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
/* harmony export */   HandrailModelKey: () => (/* binding */ HandrailModelKey),
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
const DevMaterials = {
    Stair: { bgId: '3FO4H2D73JFO', materialId: '58af961b4a4d2c4f8aa2b1da' },
    // Stair: { bgId: '3FO4ATKECLKI', materialId: '6168f454cdd25e00017d75d0' },
    Platform: { bgId: '3FO4H2D6CQMY', materialId: '5816fef985da566a1b28a944' },
    Handrail: {
        rail: { bgId: '3FO4H2D6H8SB', materialId: '58afb3ab5c26a073b389a95f' },
        column: { bgId: '3FO4GDK5EXDC', materialId: '5e532fb42014020001cc4889' },
    },
};
const PresetMaterials = (window.origin || '').includes('sit') ? DevMaterials : ProdMaterials;
var ComponentParamType;
(function (ComponentParamType) {
    ComponentParamType["HorizontalStep"] = "horizontalStep";
    ComponentParamType["VerticalStep"] = "verticalStep";
    ComponentParamType["StartWidth"] = "startWidth";
    ComponentParamType["EndWidth"] = "endWidth";
    ComponentParamType["StepProportional"] = "stepProportional";
    ComponentParamType["WidthProportional"] = "widthProportional";
    ComponentParamType["PlatformLength"] = "platformLength";
    ComponentParamType["PlatformLengthLocked"] = "platformLengthLocked";
    ComponentParamType["Type"] = "type";
    ComponentParamType["Upward"] = "upward";
    ComponentParamType["PlatformThickness"] = "platformThickness";
    ComponentParamType["ComponentMaterial"] = "componentMaterial";
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
    horizontalStep: { title: "步长", min: 1, max: 100000, step: 10, unit: '长', precision: 0, },
    verticalStep: { title: "步长", min: 1, max: 100000, step: 10, unit: '高', precision: 0, },
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
            radius: { title: "半径", min: 1, max: 100000, step: 10, unit: '', precision: 0, },
            width: { title: "宽度", min: 1, max: 100000, step: 10, unit: '', precision: 0, },
            height: { title: "高度", min: 1, max: 100000, step: 10, unit: '', precision: 0, },
        }
    }
};
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
const DefaultStairParam = {
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
            param: { radius: 20, width: 20, height: 20, },
            material: PresetMaterials.Handrail.rail,
        },
        column: {
            type: ColumnType.Circle,
            step: 500,
            param: { radius: 8, width: 8, height: 8, },
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
                param: { radius: 20, width: 20, height: 20, },
                material: PresetMaterials.Handrail.rail,
            },
            column: {
                type: ColumnType.Circle,
                step: 500,
                param: { radius: 8, width: 8, height: 8, },
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
    const items = value.split(_types__WEBPACK_IMPORTED_MODULE_2__.BaseLine3dDelimiter);
    if (items.length > 0) {
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
    let dy = _consts__WEBPACK_IMPORTED_MODULE_1__.DirectionY;
    let dz = normal.normalized();
    if (_consts__WEBPACK_IMPORTED_MODULE_1__.DirectionX.isParallel(dz)) {
        dx = _consts__WEBPACK_IMPORTED_MODULE_1__.DirectionY.cross(dz).normalized();
        dy = dz.cross(dy);
    }
    else {
        dy = dz.cross(dx);
        dx = dy.cross(dz);
    }
    return { dx, dy, dz };
}
let isInOperation = false;
function startOperation() {
    isInOperation = true;
    app.getActiveDesign().startOperation();
}
function commitOperation() {
    isInOperation = false;
    app.getActiveDesign().commitOperation();
}
function abortOperation() {
    isInOperation = false;
    app.getActiveDesign().abortOperation();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLGtEQUFjO0FBQ3RCO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDaFZPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxrQ0FBa0M7Ozs7Ozs7VUNoQm5DO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvLi9zcmMvbWFpbi9tYWluLnRzIiwid2VicGFjazovL2RyYXctc3RhaXJzLy4vc3JjL21haW4vdG9vbHMvRHJhd1N0YWlyc1Rvb2wvY29uc3RzLnRzIiwid2VicGFjazovL2RyYXctc3RhaXJzLy4vc3JjL21haW4vdG9vbHMvRHJhd1N0YWlyc1Rvb2wvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvLi9zcmMvbWFpbi90b29scy9EcmF3U3RhaXJzVG9vbC9tZXNoVXRpbHMudHMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvLi9zcmMvbWFpbi90b29scy9EcmF3U3RhaXJzVG9vbC90ZW1wTWVzaFV0aWxzLnRzIiwid2VicGFjazovL2RyYXctc3RhaXJzLy4vc3JjL21haW4vdG9vbHMvRHJhd1N0YWlyc1Rvb2wvdHlwZXMudHMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvLi9zcmMvbWFpbi90b29scy9EcmF3U3RhaXJzVG9vbC91dGlscy50cyIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy8uL3NyYy9tYWluL3R5cGVzLnRzIiwid2VicGFjazovL2RyYXctc3RhaXJzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2RyYXctc3RhaXJzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2RyYXctc3RhaXJzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgZHJhd1N0YWlyc1Rvb2wgfSBmcm9tIFwiLi90b29scy9EcmF3U3RhaXJzVG9vbC9pbmRleFwiO1xuaW1wb3J0IHsgaXNLR3JvdXBJbnN0YW5jZSwgb25Nb2RlbENoYW5nZWQgfSBmcm9tIFwiLi90b29scy9EcmF3U3RhaXJzVG9vbC91dGlsc1wiO1xuaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi90eXBlc1wiO1xuY29uc3QgcGx1Z2luVUkgPSBhcHAuZ2V0UGx1Z2luVUkoKTtcbnBsdWdpblVJLnJlc2l6ZSgzNjAsIDcyMCk7XG5wbHVnaW5VSS5tb3VudCgpO1xubGV0IGFjdGl2YXRlZEN1c3RvbVRvb2w7XG5mdW5jdGlvbiBvblVJTWVzc2FnZShkYXRhKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChkYXRhLnR5cGUgPT09IE1lc3NhZ2VUeXBlLkRyYXdTdGFpclZpZXdNb3VudGVkKSB7XG4gICAgICAgICAgICAgICAgb25QbHVnaW5TdGFydFVwKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09IE1lc3NhZ2VUeXBlLkFjdGl2YXRlRHJhd1N0YWlyc1Rvb2wpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiAoZGF0YS50eXBlID09PSAnYWN0aXZhdGVTdHJhaWdodFN0YWlyc1Rvb2wnIHx8IGRhdGEudHlwZSA9PT0gJ2FjdGl2YXRlQ2lyY3VsYXJTdGFpcnNUb29sJykge1xuICAgICAgICAgICAgICAgIGlmIChhY3RpdmF0ZWRDdXN0b21Ub29sICE9PSBkcmF3U3RhaXJzVG9vbCkge1xuICAgICAgICAgICAgICAgICAgICBhcHAuYWN0aXZhdGVDdXN0b21Ub29sKGRyYXdTdGFpcnNUb29sLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZhdGVkQ3VzdG9tVG9vbCA9IGRyYXdTdGFpcnNUb29sO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBkcmF3U3RhaXJzVG9vbC5jaGFuZ2VDb21wb25lbnRUeXBlKGRhdGEuY29tcG9uZW50VHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09IE1lc3NhZ2VUeXBlLkRlQWN0aXZhdGVEcmF3U3RhaXJzVG9vbCkge1xuICAgICAgICAgICAgICAgIC8vIH0gZWxzZSBpZiAoZGF0YS50eXBlID09PSAnZGVBY3RpdmF0ZVN0cmFpZ2h0U3RhaXJzVG9vbCcgfHwgZGF0YS50eXBlID09PSAnZGVBY3RpdmF0ZUNpcmN1bGFyU3RhaXJzVG9vbCcpIHtcbiAgICAgICAgICAgICAgICBkZUFjdGl2YXRlRHJhd1N0YWlyc1Rvb2woKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gTWVzc2FnZVR5cGUuU3RhaXJQYXJhbUNoYW5nZWRCeUlucHV0KSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgKGFjdGl2YXRlZEN1c3RvbVRvb2wgPT09IGRyYXdTdGFpcnNUb29sKSB7XG4gICAgICAgICAgICAgICAgZHJhd1N0YWlyc1Rvb2wuY2hhbmdlU3RhaXJQYXJhbShkYXRhLnN0YWlyUGFyYW0sIGRhdGEuY2hhbmdlUGFyYW1zKTtcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09IE1lc3NhZ2VUeXBlLlBhcmFtQ2hhbmdlZEJ5SW5wdXQpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiAoYWN0aXZhdGVkQ3VzdG9tVG9vbCA9PT0gZHJhd1N0YWlyc1Rvb2wpIHtcbiAgICAgICAgICAgICAgICBkcmF3U3RhaXJzVG9vbC5jaGFuZ2VDb21wb25lbnRQYXJhbShkYXRhLmNvbXBvbmVudFBhcmFtLCBkYXRhLmNoYW5nZVBhcmFtcyk7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSBNZXNzYWdlVHlwZS5Gb2N1c0NvbXBvbmVudEluZGV4KSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgKGFjdGl2YXRlZEN1c3RvbVRvb2wgPT09IGRyYXdTdGFpcnNUb29sKSB7XG4gICAgICAgICAgICAgICAgZHJhd1N0YWlyc1Rvb2wuZm9jdXNDb21wb25lbnQoZGF0YS5jb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSBNZXNzYWdlVHlwZS5SZW1vdmVDb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiAoYWN0aXZhdGVkQ3VzdG9tVG9vbCA9PT0gZHJhd1N0YWlyc1Rvb2wpIHtcbiAgICAgICAgICAgICAgICBkcmF3U3RhaXJzVG9vbC5yZW1vdmVDb21wb25lbnQoZGF0YS5jb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSBNZXNzYWdlVHlwZS5NYXRlcmlhbFJlcGxhY2VDbGljaykge1xuICAgICAgICAgICAgICAgIC8vIGlmIChhY3RpdmF0ZWRDdXN0b21Ub29sID09PSBkcmF3U3RhaXJzVG9vbCkge1xuICAgICAgICAgICAgICAgIGRyYXdTdGFpcnNUb29sLm9uTWF0ZXJpYWxSZXBsYWNlQ2xpY2soZGF0YS5jaGFuZ2VQYXJhbSwgZGF0YS5pbmRleCk7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICBjbG9zZVBsdWdpbigpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZGVBY3RpdmF0ZURyYXdTdGFpcnNUb29sKCkge1xuICAgIGFjdGl2YXRlZEN1c3RvbVRvb2wgPSB1bmRlZmluZWQ7XG4gICAgYXBwLmRlYWN0aXZhdGVDdXN0b21Ub29sKGRyYXdTdGFpcnNUb29sLCBmYWxzZSk7XG59XG5wbHVnaW5VSS5vbk1lc3NhZ2Uob25VSU1lc3NhZ2UpO1xuY29uc3Qgc2VsZWN0aW9uID0gYXBwLmdldFNlbGVjdGlvbigpO1xuc2VsZWN0aW9uLmFkZE9ic2VydmVyKHtcbiAgICBvblNlbGVjdGlvbkNoYW5nZTogKCkgPT4ge1xuICAgICAgICBjb25zdCBhbGxFbnRpdGllcyA9IHNlbGVjdGlvbi5nZXRBbGxFbnRpdGllcygpO1xuICAgICAgICBpZiAoYWxsRW50aXRpZXMubGVuZ3RoID09PSAxICYmIGlzS0dyb3VwSW5zdGFuY2UoYWxsRW50aXRpZXNbMF0pKSB7XG4gICAgICAgICAgICBkcmF3U3RhaXJzVG9vbC5jbGVhclRlbXBTaGFwZXMoKTtcbiAgICAgICAgICAgIGRyYXdTdGFpcnNUb29sLnNldE1vZGVsKGFsbEVudGl0aWVzWzBdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhbGxFbnRpdGllcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGVkaXRQYXRoID0gYXBwLmdldEFjdGl2ZURlc2lnbigpLmdldEVkaXRQYXRoKCk7XG4gICAgICAgICAgICBjb25zdCBlZGl0TW9kZWwgPSBkcmF3U3RhaXJzVG9vbC5nZXRFZGl0TW9kZWwoKTtcbiAgICAgICAgICAgIGlmICghZWRpdE1vZGVsIHx8IChlZGl0UGF0aC5ldmVyeShpbnN0YW5jZSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlLmdldEtleSgpICE9PSBlZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlS2V5ICYmXG4gICAgICAgICAgICAgICAgICAgIFsuLi5lZGl0TW9kZWwuc3RhaXJzLnZhbHVlcygpXS5ldmVyeShjb21wID0+IGNvbXAuaW5zdGFuY2VLZXkgIT09IGluc3RhbmNlLmdldEtleSgpKSAmJlxuICAgICAgICAgICAgICAgICAgICBbLi4uZWRpdE1vZGVsLnBsYXRmb3Jtcy52YWx1ZXMoKV0uZXZlcnkoY29tcCA9PiBjb21wLmluc3RhbmNlS2V5ICE9PSBpbnN0YW5jZS5nZXRLZXkoKSkgJiZcbiAgICAgICAgICAgICAgICAgICAgKChfYSA9IGVkaXRNb2RlbC5oYW5kcmFpbCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmhhbmRyYWlsSW5zdGFuY2UuaW5zdGFuY2VLZXkpICE9PSBpbnN0YW5jZS5nZXRLZXkoKSAmJlxuICAgICAgICAgICAgICAgICAgICAoKF9iID0gZWRpdE1vZGVsLmhhbmRyYWlsKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IucmFpbEluc3RhbmNlcy5ldmVyeShjb21wID0+IGNvbXAuaW5zdGFuY2VLZXkgIT09IGluc3RhbmNlLmdldEtleSgpKSkgJiZcbiAgICAgICAgICAgICAgICAgICAgKChfYyA9IGVkaXRNb2RlbC5oYW5kcmFpbCkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmNvbHVtbkluc3RhbmNlcy5ldmVyeShjb21wID0+IGNvbXAuaW5zdGFuY2VLZXkgIT09IGluc3RhbmNlLmdldEtleSgpKSk7XG4gICAgICAgICAgICB9KSkpIHtcbiAgICAgICAgICAgICAgICBkcmF3U3RhaXJzVG9vbC5jbGVhclRlbXBTaGFwZXMoKTtcbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZhdGVkQ3VzdG9tVG9vbCAhPT0gZHJhd1N0YWlyc1Rvb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5Qcm9wZXJ0aWVzVmlzaWJsZSwgcHJvcGVydGllc1Zpc2libGU6IGZhbHNlIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7XG5mdW5jdGlvbiBvblBsdWdpblN0YXJ0VXAoKSB7XG4gICAgY29uc3QgYWxsRW50aXRpZXMgPSBzZWxlY3Rpb24uZ2V0QWxsRW50aXRpZXMoKTtcbiAgICBpZiAoYWxsRW50aXRpZXMubGVuZ3RoID09PSAxICYmIGlzS0dyb3VwSW5zdGFuY2UoYWxsRW50aXRpZXNbMF0pKSB7XG4gICAgICAgIGRyYXdTdGFpcnNUb29sLnNldE1vZGVsKGFsbEVudGl0aWVzWzBdKTtcbiAgICB9XG4gICAgYXBwLmFkZE9ic2VydmVyKHtcbiAgICAgICAgb25QbHVnaW5DbG9zZWQ6ICgpID0+IHtcbiAgICAgICAgfSxcbiAgICAgICAgb25Nb2RlbENoYW5nZWQsXG4gICAgfSk7XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnREaXJlY3Rpb25UeXBlLCBDb21wb25lbnRUeXBlLCBEZWZhdWx0Q29tcG9uZW50UGFyYW0sIERlZmF1bHRTdGFpclBhcmFtIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmV4cG9ydCBjb25zdCBkdW1teU1hdHJpeDQgPSBHZW9tTGliLmNyZWF0ZUlkZW50aXR5TWF0cml4NCgpO1xuZXhwb3J0IGNvbnN0IGR1bW15VmVjdG9yM2QgPSBHZW9tTGliLmNyZWF0ZVZlY3RvcjNkKDAsIDAsIDEpO1xuZXhwb3J0IGNvbnN0IGR1bW15UG9pbnQzZCA9IEdlb21MaWIuY3JlYXRlUG9pbnQzZCgwLCAwLCAwKTtcbmV4cG9ydCBjb25zdCBEaXJlY3Rpb25YID0gR2VvbUxpYi5jcmVhdGVWZWN0b3IzZCgxLCAwLCAwKTtcbmV4cG9ydCBjb25zdCBEaXJlY3Rpb25ZID0gR2VvbUxpYi5jcmVhdGVWZWN0b3IzZCgwLCAxLCAwKTtcbmV4cG9ydCBjb25zdCBEaXJlY3Rpb25aID0gR2VvbUxpYi5jcmVhdGVWZWN0b3IzZCgwLCAwLCAxKTtcbi8vIGNvbnN0IEhlaWdodFRvbGVyYW5jZTogbnVtYmVyID0gNTtcbmV4cG9ydCBjb25zdCBMZW5ndGhUb2xlcmFuY2UgPSAxMDtcbmV4cG9ydCBjb25zdCBEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSA9IE1hdGguUEkgLyAzNjtcbmV4cG9ydCBjb25zdCBBbmdsZVRvbGVyYW5jZSA9IE1hdGguUEkgLyAxODA7XG5leHBvcnQgY29uc3QgU3RlcENvdW50TGltaXQgPSA4MDtcbi8vIGNvbnN0IERlZmF1bHRCb2FyZFRoaWNrbmVzcyA9IDUwO1xuZXhwb3J0IGNvbnN0IFRlbXBMaW5lQ29sb3JzID0ge1xuICAgIFN0YWlyOiB7IHI6IDAsIGc6IDAsIGI6IDI1NSB9LFxuICAgIE1vbGQ6IHsgcjogMTMsIGc6IDcxLCBiOiAxNjEgfSxcbiAgICBIYW5kcmFpbDogeyByOiAwLCBnOiAwLCBiOiAwIH0sXG4gICAgSW5mZXJlbmNlOiB7IHI6IDAsIGc6IDAsIGI6IDAgfSxcbiAgICBGb2N1czogeyByOiAyNTUsIGc6IDAsIGI6IDAgfSxcbn07XG5leHBvcnQgY29uc3QgVGVtcExpbmVQYXR0ZXJucyA9IHtcbiAgICBIYW5kcmFpbDogS0xpbmVQYXR0ZXJuLkRhc2gsXG4gICAgU3RhaXJBbmRNb2xkOiBLTGluZVBhdHRlcm4uU29saWQsXG4gICAgSW5mZXJlbmNlOiBLTGluZVBhdHRlcm4uRGFzaCxcbn07XG5leHBvcnQgZnVuY3Rpb24gZ2V0TmV3Q29tcG9uZW50UGFyYW0odHlwZSwgYmFzZVNlZ21lbnQsIHVwd2FyZCkge1xuICAgIGxldCBzdGFydFdpZHRoID0gRGVmYXVsdFN0YWlyUGFyYW0uc3RhcnRXaWR0aDtcbiAgICBsZXQgZW5kV2lkdGggPSBEZWZhdWx0U3RhaXJQYXJhbS5lbmRXaWR0aDtcbiAgICBpZiAoYmFzZVNlZ21lbnQpIHtcbiAgICAgICAgY29uc3QgeyBwYXJhbTogeyBlbmRXaWR0aDogYmFzZVNlZ21lbnRFbmRXaWR0aCwgdHlwZTogYmFzZVNlZ21lbnRUeXBlIH0gfSA9IGJhc2VTZWdtZW50O1xuICAgICAgICBpZiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgaWYgKGJhc2VTZWdtZW50VHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgICAgIHN0YXJ0V2lkdGggPSBiYXNlU2VnbWVudEVuZFdpZHRoO1xuICAgICAgICAgICAgICAgIGVuZFdpZHRoID0gYmFzZVNlZ21lbnRFbmRXaWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0YXJ0V2lkdGggPSAyICogYmFzZVNlZ21lbnRFbmRXaWR0aDtcbiAgICAgICAgICAgICAgICBlbmRXaWR0aCA9IDIgKiBiYXNlU2VnbWVudEVuZFdpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGJhc2VTZWdtZW50VHlwZSAhPT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgICAgIHN0YXJ0V2lkdGggPSBiYXNlU2VnbWVudEVuZFdpZHRoO1xuICAgICAgICAgICAgICAgIGVuZFdpZHRoID0gYmFzZVNlZ21lbnRFbmRXaWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBEZWZhdWx0Q29tcG9uZW50UGFyYW0pLCB7IGluZGV4OiBiYXNlU2VnbWVudCA/IGJhc2VTZWdtZW50LnBhcmFtLmluZGV4ICsgMSA6IDAsIHR5cGUsXG4gICAgICAgIHN0YXJ0V2lkdGgsXG4gICAgICAgIGVuZFdpZHRoLCB1cHdhcmQ6IHVwd2FyZCA9PT0gdW5kZWZpbmVkID8gRGVmYXVsdENvbXBvbmVudFBhcmFtLnVwd2FyZCA6IHVwd2FyZCwgb2Zmc2V0V2lkdGg6IDAsIHdpdGhPZmZzZXQ6IGZhbHNlLCBwbGF0Zm9ybUxlbmd0aExvY2tlZDogZmFsc2UgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0TmV3U2VnbWVudCh0eXBlLCBiYXNlU2VnbWVudCwgdXB3YXJkKSB7XG4gICAgY29uc3QgcGFyYW0gPSBnZXROZXdDb21wb25lbnRQYXJhbSh0eXBlLCBiYXNlU2VnbWVudCwgdXB3YXJkKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGFydDogZHVtbXlQb2ludDNkLFxuICAgICAgICBlbmQ6IGR1bW15UG9pbnQzZCxcbiAgICAgICAgc3RhcnRMb2NrZWQ6IGZhbHNlLFxuICAgICAgICBlbmRMb2NrZWQ6IGZhbHNlLFxuICAgICAgICBzdGFydEhlaWdodDogMCxcbiAgICAgICAgZW5kSGVpZ2h0OiAwLFxuICAgICAgICBzdGFpclNoYXBlOiB7XG4gICAgICAgICAgICBzdGVwQ291bnQ6IDAsXG4gICAgICAgICAgICB2ZXJ0aWNlczogW10sXG4gICAgICAgICAgICB0ZW1wTGluZXM6IFtdLFxuICAgICAgICB9LFxuICAgICAgICBtb2xkU2hhcGU6IHtcbiAgICAgICAgICAgIHN0ZXBDb3VudDogMCxcbiAgICAgICAgICAgIHZlcnRpY2VzOiBbXSxcbiAgICAgICAgICAgIHRlbXBMaW5lczogW10sXG4gICAgICAgIH0sXG4gICAgICAgIGNvcm5lclNoYXBlOiB7XG4gICAgICAgICAgICBzdGVwQ291bnQ6IDAsXG4gICAgICAgICAgICB2ZXJ0aWNlczogW10sXG4gICAgICAgICAgICB0ZW1wTGluZXM6IFtdLFxuICAgICAgICB9LFxuICAgICAgICBjb3JuZXJNb2xkU2hhcGU6IHtcbiAgICAgICAgICAgIHN0ZXBDb3VudDogMCxcbiAgICAgICAgICAgIHZlcnRpY2VzOiBbXSxcbiAgICAgICAgICAgIHRlbXBMaW5lczogW10sXG4gICAgICAgIH0sXG4gICAgICAgIG5leHRDb21wb25lbnRzOiBBcnJheS5mcm9tKHsgbGVuZ3RoOiA2IH0sIF8gPT4gbmV3IFNldCgpKSxcbiAgICAgICAgcGFyYW0sXG4gICAgICAgIGNvbXBvbmVudERpcmVjdGlvblR5cGU6IENvbXBvbmVudERpcmVjdGlvblR5cGUuRnJvbnQsXG4gICAgfTtcbn1cbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgQ29tcG9uZW50VHlwZSwgQ29tcG9uZW50UGFyYW1LZXksIFN0YXJ0RW5kS2V5LCBCYXNlTGluZVNlZzNkS2V5LCBTdGFpck1vZGVsS2V5LCBDb21wb25lbnRQYXJhbVR5cGUsIE1vZGVsVmFsdWUsIENpcmNsZVRhbmdlbnRLZXksIERlZmF1bHRTdGFpclBhcmFtLCBCYXNlQ29tcG9uZW50S2V5LCBIYW5kcmFpbE1vZGVsS2V5LCBSYWlsTW9kZWxLZXksIENvbHVtbk1vZGVsS2V5LCBTdGFpclBhcmFtS2V5LCBTdGFpck1hdGVyaWFsS2V5LCBDb2x1bW5NYXRlcmlhbEtleSwgUmFpbE1hdGVyaWFsS2V5LCBQbGF0Zm9ybU1hdGVyaWFsS2V5IH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IGdlbmVyYXRlSGFuZHJhaWxTaGFwZSwgZ2VuZXJhdGVTaGFwZSwgaXNDaXJjdWxhclN0YWlyIH0gZnJvbSBcIi4vdGVtcE1lc2hVdGlsc1wiO1xuaW1wb3J0IHsgYnVpbGRDb21wb25lbnRJbnN0YW5jZSwgYnVpbGRIYW5kcmFpbEluc3RhbmNlLCBidWlsZFNlZ21lbnRSZWxhdGlvbnMsIGNoYW5nZVN0YWlyVXB3YXJkLCBnZW5lcmF0ZU1lc2hlcywgZ2V0U2VnbWVudEJ5SW5kZXggfSBmcm9tIFwiLi9tZXNoVXRpbHNcIjtcbmltcG9ydCB7IHBhcnNlQmFzZUNvbXBvbmVudCwgcGFyc2VMaW5lU2VnM2QsIHBhcnNlQ29tcG9uZW50UGFyYW0sIHBhcnNlU3RhcnRFbmQsIHBhcnNlVmVjdG9yM2QsIHN0cmluZ2lmeVN0YWlyUGFyYW0sIHN0cmluZ2lmeU1hdGVyaWFsLCBwYXJzZVN0YWlyUGFyYW0sIHBhcnNlTWF0ZXJpYWwsIHN0YXJ0T3BlcmF0aW9uLCBhYm9ydE9wZXJhdGlvbiwgY29tbWl0T3BlcmF0aW9uIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCB7IGdldE5ld0NvbXBvbmVudFBhcmFtLCBnZXROZXdTZWdtZW50LCBUZW1wTGluZUNvbG9ycywgVGVtcExpbmVQYXR0ZXJucyB9IGZyb20gXCIuL2NvbnN0c1wiO1xuaW1wb3J0IHsgZGVBY3RpdmF0ZURyYXdTdGFpcnNUb29sIH0gZnJvbSBcIi4uLy4uLy4uL21haW4vbWFpblwiO1xuaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vbWFpbi90eXBlc1wiO1xuY29uc3QgZGVzaWduID0gYXBwLmdldEFjdGl2ZURlc2lnbigpO1xuY29uc3Qgc2VsZWN0aW9uID0gYXBwLmdldFNlbGVjdGlvbigpO1xuY29uc3QgcGx1Z2luVUkgPSBhcHAuZ2V0UGx1Z2luVUkoKTtcbmNvbnN0IGFwcFZpZXcgPSBhcHAuZ2V0QWN0aXZlVmlldygpO1xuY29uc3QgdG9vbEhlbHBlciA9IGFwcC5nZXRUb29sSGVscGVyKCk7XG5jb25zdCBEZWZhdWx0Rm9jdXNlZENvbXBvbmVudEluZGV4ID0gLTE7XG5leHBvcnQgY2xhc3MgRHJhd1N0YWlyc1Rvb2wge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvLyBwcml2YXRlIGNvbXBvbmVudFBhcmFtOiBDb21wb25lbnRQYXJhbSA9IHsgLi4uRGVmYXVsdENvbXBvbmVudFBhcmFtIH07XG4gICAgICAgIHRoaXMuZHJhd2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCA9IERlZmF1bHRGb2N1c2VkQ29tcG9uZW50SW5kZXg7XG4gICAgICAgIHRoaXMuc2VnbWVudHMgPSBbXTtcbiAgICAgICAgdGhpcy5zdGFpclBhcmFtID0gRGVmYXVsdFN0YWlyUGFyYW07XG4gICAgICAgIHRoaXMub25NYXRlcmlhbFJlcGxhY2VJdGVtQ2xpY2sgPSAoY2hhbmdlUGFyYW0sIGluZGV4LCBpc0RlbGV0ZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChtYXRlcmlhbElkID0gJycsIGJnaWQgPSAnJykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluc3RhbmNlUGF0aCA9IHRoaXMuZWRpdE1vZGVsID8gZGVzaWduLmdldEVkaXRQYXRoc1RvR3JvdXBJbnN0YW5jZSh0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2UpIDogW107XG4gICAgICAgICAgICAgICAgaWYgKGNoYW5nZVBhcmFtID09PSBDb21wb25lbnRQYXJhbVR5cGUuQ29tcG9uZW50TWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHRoaXMuc2VnbWVudHMsIGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlZ21lbnQgJiYgaW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZHJhd2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQucGFyYW0ubWF0ZXJpYWwgPSB7IG1hdGVyaWFsSWQsIGJnaWQgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlBhcmFtQ2hhbmdlZEJ5RHJhdywgY29tcG9uZW50UGFyYW06IE9iamVjdC5hc3NpZ24oe30sIHNlZ21lbnQucGFyYW0pIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmVkaXRNb2RlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoZUluc3RhbmNlID0gdGhpcy5lZGl0TW9kZWwuc3RhaXJzLmdldChpbmRleCkgfHwgdGhpcy5lZGl0TW9kZWwucGxhdGZvcm1zLmdldChpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoZUluc3RhbmNlICYmIGluc3RhbmNlUGF0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3BlcmF0aW9uU3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICh5aWVsZCBkZXNpZ24uYWN0aXZhdGVFZGl0UGF0aChbLi4uaW5zdGFuY2VQYXRoWzBdLCB0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2VdKSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNEZWxldGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGRlc2lnbi5jbGVhck1hdGVyaWFsKFt0aGVJbnN0YW5jZS5pbnN0YW5jZV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZGVzaWduLmFzc2lnbk1hdGVyaWFsRm9yRW50aXRpZXMoW3RoZUluc3RhbmNlLmluc3RhbmNlXSwgbWF0ZXJpYWxJZCwgYmdpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKHlpZWxkIGRlc2lnbi5hY3RpdmF0ZUVkaXRQYXRoKGluc3RhbmNlUGF0aFswXSkpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1pdE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5wYXJhbS5tYXRlcmlhbCA9IHsgbWF0ZXJpYWxJZCwgYmdpZCB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5QYXJhbUNoYW5nZWRCeURyYXcsIGNvbXBvbmVudFBhcmFtOiBPYmplY3QuYXNzaWduKHt9LCBzZWdtZW50LnBhcmFtKSB9LCAnKicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWJvcnRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGFuZ2VQYXJhbSA9PT0gQ29tcG9uZW50UGFyYW1UeXBlLlN0YWlyTWF0ZXJpYWwgfHwgY2hhbmdlUGFyYW0gPT09IENvbXBvbmVudFBhcmFtVHlwZS5QbGF0Zm9ybU1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5lZGl0TW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VQYXJhbSA9PT0gQ29tcG9uZW50UGFyYW1UeXBlLlN0YWlyTWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWlyUGFyYW0uc3RhaXJNYXRlcmlhbCA9IHsgbWF0ZXJpYWxJZCwgYmdpZCB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFpclBhcmFtLnBsYXRmb3JtTWF0ZXJpYWwgPSB7IG1hdGVyaWFsSWQsIGJnaWQgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuU3RhaXJQYXJhbUNoYW5nZWRCeURyYXcsIHN0YWlyUGFyYW06IHRoaXMuc3RhaXJQYXJhbSB9LCAnKicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGluc3RhbmNlUGF0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcGVyYXRpb25TdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICh5aWVsZCBkZXNpZ24uYWN0aXZhdGVFZGl0UGF0aChbLi4uaW5zdGFuY2VQYXRoWzBdLCB0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2VdKSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29tcG9uZW50cyA9IGNoYW5nZVBhcmFtID09PSBDb21wb25lbnRQYXJhbVR5cGUuU3RhaXJNYXRlcmlhbCA/IHRoaXMuZWRpdE1vZGVsLnN0YWlycyA6IHRoaXMuZWRpdE1vZGVsLnBsYXRmb3JtcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0RlbGV0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGRlc2lnbi5jbGVhck1hdGVyaWFsKFsuLi5jb21wb25lbnRzLnZhbHVlcygpXS5tYXAoYyA9PiBjLmluc3RhbmNlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBkZXNpZ24uYXNzaWduTWF0ZXJpYWxGb3JFbnRpdGllcyhbLi4uY29tcG9uZW50cy52YWx1ZXMoKV0ubWFwKGMgPT4gYy5pbnN0YW5jZSksIG1hdGVyaWFsSWQsIGJnaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKHlpZWxkIGRlc2lnbi5hY3RpdmF0ZUVkaXRQYXRoKGluc3RhbmNlUGF0aFswXSkpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb25TdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWl0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZVBhcmFtID09PSBDb21wb25lbnRQYXJhbVR5cGUuU3RhaXJNYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWlyUGFyYW0uc3RhaXJNYXRlcmlhbCA9IHsgbWF0ZXJpYWxJZCwgYmdpZCB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFpclBhcmFtLnBsYXRmb3JtTWF0ZXJpYWwgPSB7IG1hdGVyaWFsSWQsIGJnaWQgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5TdGFpclBhcmFtQ2hhbmdlZEJ5RHJhdywgc3RhaXJQYXJhbTogdGhpcy5zdGFpclBhcmFtIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYm9ydE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoYW5nZVBhcmFtID09PSBDb21wb25lbnRQYXJhbVR5cGUuSGFuZHJhaWxSYWlsTWF0ZXJpYWwgfHwgY2hhbmdlUGFyYW0gPT09IENvbXBvbmVudFBhcmFtVHlwZS5IYW5kcmFpbENvbHVtbk1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5lZGl0TW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VQYXJhbSA9PT0gQ29tcG9uZW50UGFyYW1UeXBlLkhhbmRyYWlsUmFpbE1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFpclBhcmFtLmhhbmRyYWlsLnJhaWwubWF0ZXJpYWwgPSB7IG1hdGVyaWFsSWQsIGJnaWQgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhaXJQYXJhbS5oYW5kcmFpbC5jb2x1bW4ubWF0ZXJpYWwgPSB7IG1hdGVyaWFsSWQsIGJnaWQgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuU3RhaXJQYXJhbUNoYW5nZWRCeURyYXcsIHN0YWlyUGFyYW06IHRoaXMuc3RhaXJQYXJhbSB9LCAnKicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGluc3RhbmNlUGF0aCAmJiB0aGlzLmVkaXRNb2RlbC5oYW5kcmFpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcGVyYXRpb25TdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICh5aWVsZCBkZXNpZ24uYWN0aXZhdGVFZGl0UGF0aChbLi4uaW5zdGFuY2VQYXRoWzBdLCB0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2UsIHRoaXMuZWRpdE1vZGVsLmhhbmRyYWlsLmhhbmRyYWlsSW5zdGFuY2UuaW5zdGFuY2VdKSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29tcG9uZW50cyA9IGNoYW5nZVBhcmFtID09PSBDb21wb25lbnRQYXJhbVR5cGUuSGFuZHJhaWxSYWlsTWF0ZXJpYWwgPyB0aGlzLmVkaXRNb2RlbC5oYW5kcmFpbC5yYWlsSW5zdGFuY2VzIDogdGhpcy5lZGl0TW9kZWwuaGFuZHJhaWwuY29sdW1uSW5zdGFuY2VzO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRGVsZXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZGVzaWduLmNsZWFyTWF0ZXJpYWwoWy4uLmNvbXBvbmVudHMudmFsdWVzKCldLm1hcChjID0+IGMuaW5zdGFuY2UpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGRlc2lnbi5hc3NpZ25NYXRlcmlhbEZvckVudGl0aWVzKFsuLi5jb21wb25lbnRzLnZhbHVlcygpXS5tYXAoYyA9PiBjLmluc3RhbmNlKSwgbWF0ZXJpYWxJZCwgYmdpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAoeWllbGQgZGVzaWduLmFjdGl2YXRlRWRpdFBhdGgoaW5zdGFuY2VQYXRoWzBdKSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21taXRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlUGFyYW0gPT09IENvbXBvbmVudFBhcmFtVHlwZS5IYW5kcmFpbFJhaWxNYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWlyUGFyYW0uaGFuZHJhaWwucmFpbC5tYXRlcmlhbCA9IHsgbWF0ZXJpYWxJZCwgYmdpZCB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFpclBhcmFtLmhhbmRyYWlsLmNvbHVtbi5tYXRlcmlhbCA9IHsgbWF0ZXJpYWxJZCwgYmdpZCB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlN0YWlyUGFyYW1DaGFuZ2VkQnlEcmF3LCBzdGFpclBhcmFtOiB0aGlzLnN0YWlyUGFyYW0gfSwgJyonKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFib3J0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgb25Ub29sQWN0aXZlKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh3aW5kb3cub3JpZ2luKTtcbiAgICAgICAgdG9vbEhlbHBlci5zZXRFeGNsdWRlSW5mZXJlbmNlVHlwZXMoW1xuICAgICAgICAgICAgS0VudGl0eVR5cGUuRmFjZSwgS0VudGl0eVR5cGUuRWRnZSwgS0VudGl0eVR5cGUuQXV4aWxpYXJ5Qm91bmRlZEN1cnZlLCBLRW50aXR5VHlwZS5BdXhpbGlhcnlMaW5lLCBLRW50aXR5VHlwZS5BdXhpbGlhcnlWZXJ0ZXgsXG4gICAgICAgICAgICBLRW50aXR5VHlwZS5Hcm91cEluc3RhbmNlLCBLRW50aXR5VHlwZS5WZXJ0ZXgsIEtBcmNoRmFjZVR5cGUuTm9uUGxhbmFyLCBLQXJjaEZhY2VUeXBlLlBsYW5hcixcbiAgICAgICAgXSk7XG4gICAgICAgIGNvbnN0IGZpcnN0U2VnbWVudCA9IGdldE5ld1NlZ21lbnQoQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyLCB1bmRlZmluZWQsIHRoaXMuc3RhaXJQYXJhbS51cHdhcmQpO1xuICAgICAgICBmaXJzdFNlZ21lbnQuc3RhcnRMb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgLy8gdGhpcy5zdGFpclBhcmFtID0gRGVmYXVsdFN0YWlyUGFyYW07XG4gICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuRHJhd1N0YWlyTW9kZWxTZXR0bGVkLCBjb21wb25lbnRQYXJhbXM6IFtmaXJzdFNlZ21lbnQucGFyYW1dLCBzdGFpclBhcmFtOiB0aGlzLnN0YWlyUGFyYW0sIG5ld1N0YWlyOiB0cnVlLCBpc0RyYXdpbmc6IHRydWUgfSwgJyonKTtcbiAgICAgICAgdGhpcy5zZWdtZW50cyA9IFtmaXJzdFNlZ21lbnRdO1xuICAgICAgICB0aGlzLmRyYXdpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmNsZWFyVGVtcFNoYXBlcygpO1xuICAgICAgICB0aGlzLmVkaXRNb2RlbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggPSAwO1xuICAgIH1cbiAgICBvblRvb2xEZWFjdGl2ZSgpIHtcbiAgICAgICAgdG9vbEhlbHBlci5zZXRFeGNsdWRlSW5mZXJlbmNlVHlwZXMoW10pO1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgIGlmICh0aGlzLmVkaXRNb2RlbCkge1xuICAgICAgICAgICAgc2VsZWN0aW9uLmFkZChbdGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLkxlYXZlRHJhd1N0YWlyc1Rvb2wgfSwgJyonKTtcbiAgICAgICAgfVxuICAgICAgICBkZUFjdGl2YXRlRHJhd1N0YWlyc1Rvb2woKTtcbiAgICB9XG4gICAgb25Nb3VzZU1vdmUoZXZlbnQsIGluZmVyZW5jZVJlc3VsdCkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnb25Nb3VzZU1vdmUnKTtcbiAgICAgICAgaWYgKGluZmVyZW5jZVJlc3VsdCkge1xuICAgICAgICAgICAgLy8gY29uc3QgeyBzdGFydFdpZHRoLCBlbmRXaWR0aCwgcGxhdGZvcm1UaGlja25lc3MgfSA9IHRoaXMuY29tcG9uZW50UGFyYW07XG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IGluZmVyZW5jZVJlc3VsdC5wb3NpdGlvbjtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RTZWdtZW50ID0gdGhpcy5zZWdtZW50c1t0aGlzLnNlZ21lbnRzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdsYXN0U2VnbWVudC5zdGFydExvY2tlZCcsIGxhc3RTZWdtZW50LnN0YXJ0TG9ja2VkKTtcbiAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5wYXJhbS5tb2RlbEVkaXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAobGFzdFNlZ21lbnQuc3RhcnRMb2NrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuZW5kID0gcG9zaXRpb247XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBDb21wb25lbnQobGFzdFNlZ21lbnQsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlZ21lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByZXZTZWdtZW50ID0gdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggPT09IGxhc3RTZWdtZW50LnBhcmFtLmluZGV4ID8gdGhpcy5zZWdtZW50c1t0aGlzLnNlZ21lbnRzLmxlbmd0aCAtIDJdIDogZ2V0U2VnbWVudEJ5SW5kZXgodGhpcy5zZWdtZW50cywgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbXVzdCBiZSB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHByZXZTZWdtZW50ID09PSBudWxsIHx8IHByZXZTZWdtZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwcmV2U2VnbWVudC5wYXJhbS50eXBlKSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgbW9sZFNoYXBlOiB7IHZlcnRpY2VzLCB0ZW1wTGluZXMgfSB9ID0gcHJldlNlZ21lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCgoX2EgPSBsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGluZTNkSW5kZXgpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldlNlZ21lbnQubmV4dENvbXBvbmVudHMuZm9yRWFjaChpbmRzID0+IGluZHMuZGVsZXRlKGxhc3RTZWdtZW50LnBhcmFtLmluZGV4KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjbG9zZXN0UG9pbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1pbkRpc3RhbmNlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZXMuZm9yRWFjaCgobGluZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGluZVNlZzNkID0gR2VvbUxpYi5jcmVhdGVMaW5lU2VnbWVudDNkKHZlcnRpY2VzW2xpbmVbMF1dLCB2ZXJ0aWNlc1tsaW5lWzFdXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoZVBvaW50ID0gbGluZVNlZzNkLmdldENsb3Nlc3RQb2ludChwb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1ckRpc3RhbmNlID0gdGhlUG9pbnQuZGlzdGFuY2VUbyhwb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY2xvc2VzdFBvaW50IHx8IGN1ckRpc3RhbmNlIDwgbWluRGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbkRpc3RhbmNlID0gY3VyRGlzdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0UG9pbnQgPSB0aGVQb2ludDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LnN0YXJ0ID0gY2xvc2VzdFBvaW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGFzdFNlZ21lbnQuYmFzZUxpbmVTZWczZCA9IHsgc3RhcnQ6IHZlcnRpY2VzW2xpbmVbMF1dLCBlbmQ6IHZlcnRpY2VzW2xpbmVbMV1dIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50ID0geyBjb21wb25lbnRJbmRleDogcHJldlNlZ21lbnQucGFyYW0uaW5kZXgsIGxpbmUzZEluZGV4OiBpbmRleCwgbGluZTNkOiB7IHN0YXJ0OiB2ZXJ0aWNlc1tsaW5lWzBdXSwgZW5kOiB2ZXJ0aWNlc1tsaW5lWzFdXSB9IH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBwcmV2U2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHRoaXMuc2VnbWVudHMsIGxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoKF9iID0gbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmxpbmUzZEluZGV4KSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTZWdtZW50Lm5leHRDb21wb25lbnRzW2xhc3RTZWdtZW50LmJhc2VDb21wb25lbnQubGluZTNkSW5kZXhdLmFkZChsYXN0U2VnbWVudC5wYXJhbS5pbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1BpY2tTdGFydFRlbXBTaGFwZXMocG9zaXRpb24sIGxhc3RTZWdtZW50LnN0YXJ0LCBsYXN0U2VnbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5zdGFydCA9IHBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChsYXN0U2VnbWVudC5wYXJhbS50eXBlID09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gJiYgIWxhc3RTZWdtZW50LnBhcmFtLnBsYXRmb3JtTGVuZ3RoTG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuUGFyYW1DaGFuZ2VkQnlEcmF3LCBjb21wb25lbnRQYXJhbTogT2JqZWN0LmFzc2lnbih7fSwgbGFzdFNlZ21lbnQucGFyYW0pIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIG9uTEJ1dHRvblVwKGV2ZW50LCBpbmZlcmVuY2VSZXN1bHQpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnb25MQnV0dG9uVXAnKTtcbiAgICAgICAgaWYgKGluZmVyZW5jZVJlc3VsdCkge1xuICAgICAgICAgICAgLy8gY29uc3QgcG9zaXRpb24gPSBpbmZlcmVuY2VSZXN1bHQucG9zaXRpb247XG4gICAgICAgICAgICBpZiAodGhpcy5zZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0U2VnbWVudCA9IHRoaXMuc2VnbWVudHNbdGhpcy5zZWdtZW50cy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICBpZiAobGFzdFNlZ21lbnQuc3RhcnRMb2NrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3B1c2ggc2VnbWVudCcpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHN0YXJ0LCBlbmQsIHBhcmFtOiB7IHR5cGUgfSwgY2lyY2xlVGFuZ2VudCB9ID0gbGFzdFNlZ21lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBDb21wb25lbnRUeXBlLkNpcmN1bGFyU3RhaXIgJiYgIWNpcmNsZVRhbmdlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LmNpcmNsZVRhbmdlbnQgPSBlbmQuc3VidHJhY3RlZChzdGFydCkubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c0NvbXBvbmVudChsYXN0U2VnbWVudC5wYXJhbS5pbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5lbmRMb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdFBhcmFtID0gbGFzdFNlZ21lbnQucGFyYW07XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0VHlwZSA9IGxhc3RQYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtID8gQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyIDogQ29tcG9uZW50VHlwZS5QbGF0Zm9ybTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRTZWdtZW50ID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBnZXROZXdTZWdtZW50KG5leHRUeXBlLCBsYXN0U2VnbWVudCwgdGhpcy5zdGFpclBhcmFtLnVwd2FyZCkpLCB7IHN0YXJ0OiBsYXN0U2VnbWVudC5lbmQsIGVuZDogbGFzdFNlZ21lbnQuZW5kLCBzdGFydExvY2tlZDogbGFzdFBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gPyBmYWxzZSA6IHRydWUsIHN0YXJ0SGVpZ2h0OiBsYXN0U2VnbWVudC5lbmRIZWlnaHQsIGVuZEhlaWdodDogbGFzdFNlZ21lbnQuZW5kSGVpZ2h0IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBtb2xkU2hhcGU6IHsgdmVydGljZXMsIHRlbXBMaW5lcyB9IH0gPSBsYXN0U2VnbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxhc3RTZWdtZW50LmJhc2VMaW5lU2VnM2QgPSB7IHN0YXJ0OiB2ZXJ0aWNlc1swXSwgZW5kOiB2ZXJ0aWNlc1sxXSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQgPSB7IGxpbmUzZDogeyBzdGFydDogdmVydGljZXNbMV0sIGVuZDogdmVydGljZXNbMF0gfSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFzZVNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleCh0aGlzLnNlZ21lbnRzLCBsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmFzZVNlZ21lbnQgJiYgKChfYSA9IGxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5saW5lM2RJbmRleCkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXNlU2VnbWVudC5uZXh0Q29tcG9uZW50c1tsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50LmxpbmUzZEluZGV4XS5hZGQobGFzdFBhcmFtLmluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXh0U2VnbWVudC5iYXNlTGluZVNlZzNkID0geyBzdGFydDogdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0sIGVuZDogdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0gfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0U2VnbWVudC5zdGFydExvY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50Lm5leHRDb21wb25lbnRzWzBdLmFkZChuZXh0U2VnbWVudC5wYXJhbS5pbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0U2VnbWVudC5iYXNlQ29tcG9uZW50ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudEluZGV4OiBsYXN0UGFyYW0uaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZTNkSW5kZXg6IGxhc3RQYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtID8gdGVtcExpbmVzLmxlbmd0aCAtIDEgOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUzZDogeyBzdGFydDogdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0sIGVuZDogdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0gfVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RQYXJhbS5tb2RlbEVkaXRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5QYXJhbUNoYW5nZWRCeURyYXcsIGNvbXBvbmVudFBhcmFtOiBsYXN0UGFyYW0gfSwgJyonKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VnbWVudHMucHVzaChuZXh0U2VnbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggIT09IGxhc3RQYXJhbS5pbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvY3VzZWRTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgodGhpcy5zZWdtZW50cywgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb2N1c2VkU2VnbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdUZW1wQ29tcG9uZW50KGZvY3VzZWRTZWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCA9IG5leHRTZWdtZW50LnBhcmFtLmluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5Db21wb25lbnRBZGRlZCwgY29tcG9uZW50UGFyYW06IE9iamVjdC5hc3NpZ24oe30sIG5leHRTZWdtZW50LnBhcmFtKSB9LCAnKicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5zdGFydExvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJQaWNrU3RhcnRUZW1wU2hhcGVzKGxhc3RTZWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3VGVtcENvbXBvbmVudChsYXN0U2VnbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNDb21wb25lbnQobGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBkcmF3UGlja1N0YXJ0VGVtcFNoYXBlcyhwb3NpdGlvbiwgY2xvc2VzdFBvaW50LCB0aGVTZWdtZW50KSB7XG4gICAgICAgIGlmICh0aGVTZWdtZW50LnBpY2tTdGFydFRlbXBTaGFwZUlkKSB7XG4gICAgICAgICAgICBhcHBWaWV3LmNsZWFyVGVtcG9yYXJ5U2hhcGVzQnlJZHMoW3RoZVNlZ21lbnQucGlja1N0YXJ0VGVtcFNoYXBlSWRdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2xvc2VzdFBvaW50KSB7XG4gICAgICAgICAgICBjb25zdCBwaWNrU3RhcnRUZW1wU2hhcGVJZCA9IGFwcFZpZXcuZHJhd0xpbmVzKFtwb3NpdGlvbiwgY2xvc2VzdFBvaW50XSwgeyBjb2xvcjogVGVtcExpbmVDb2xvcnMuSW5mZXJlbmNlLCBkZXB0aFRlc3Q6IGZhbHNlLCBwYXR0ZXJuOiBUZW1wTGluZVBhdHRlcm5zLkluZmVyZW5jZSwgZ2FwU2l6ZTogNTAsIGRhc2hTaXplOiA1MCB9KTtcbiAgICAgICAgICAgIGlmIChwaWNrU3RhcnRUZW1wU2hhcGVJZCA9PT0gbnVsbCB8fCBwaWNrU3RhcnRUZW1wU2hhcGVJZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGlja1N0YXJ0VGVtcFNoYXBlSWQuaWQpIHtcbiAgICAgICAgICAgICAgICB0aGVTZWdtZW50LnBpY2tTdGFydFRlbXBTaGFwZUlkID0gcGlja1N0YXJ0VGVtcFNoYXBlSWQuaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2xlYXJQaWNrU3RhcnRUZW1wU2hhcGVzKHRoZVNlZ21lbnQpIHtcbiAgICAgICAgaWYgKHRoZVNlZ21lbnQucGlja1N0YXJ0VGVtcFNoYXBlSWQpIHtcbiAgICAgICAgICAgIGFwcFZpZXcuY2xlYXJUZW1wb3JhcnlTaGFwZXNCeUlkcyhbdGhlU2VnbWVudC5waWNrU3RhcnRUZW1wU2hhcGVJZF0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRyYXdUZW1wQ29tcG9uZW50KHRoZVNlZ21lbnQsIGZvY3VzZWQgPSBmYWxzZSwgZHJhd0hhbmRyYWlsID0gZmFsc2UpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgaWYgKHRoZVNlZ21lbnQuc3RhcnRMb2NrZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVTZWdtZW50U2hhcGUodGhlU2VnbWVudCwgdGhpcy5kcmF3aW5nKTtcbiAgICAgICAgICAgIGNvbnN0IHsgc3RhaXJTaGFwZTogeyB2ZXJ0aWNlczogc3RhaXJWZXJ0aWNlcywgdGVtcExpbmVzOiBzdGFpclRlbXBMaW5lcyB9LCBtb2xkU2hhcGU6IHsgdmVydGljZXM6IG1vbGRWZXJ0aWNlcywgdGVtcExpbmVzOiBtb2xkVGVtcExpbmVzIH0sIGNvcm5lclNoYXBlOiB7IHZlcnRpY2VzOiBjb3JuZXJWZXJ0aWNlcywgdGVtcExpbmVzOiBjb3JuZXJUZW1wTGluZXMgfSwgY29ybmVyTW9sZFNoYXBlOiB7IHZlcnRpY2VzOiBjb3JuZXJNb2xkVmVydGljZXMsIHRlbXBMaW5lczogY29ybmVyTW9sZFRlbXBMaW5lcyB9LCB9ID0gdGhlU2VnbWVudDtcbiAgICAgICAgICAgIGNvbnN0IHRlbXBMaW5lUG9pbnRzID0gW107XG4gICAgICAgICAgICBjb25zdCBtb2xkVGVtcExpbmVQb2ludHMgPSBbXTtcbiAgICAgICAgICAgIGlmICh0aGlzLmRyYXdpbmcpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHN0YWlyVGVtcExpbmUgb2Ygc3RhaXJUZW1wTGluZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVQb2ludHMucHVzaChbc3RhaXJWZXJ0aWNlc1tzdGFpclRlbXBMaW5lWzBdXSwgc3RhaXJWZXJ0aWNlc1tzdGFpclRlbXBMaW5lWzFdXV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGNvcm5lclRlbXBMaW5lIG9mIGNvcm5lclRlbXBMaW5lcykge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZVBvaW50cy5wdXNoKFtjb3JuZXJWZXJ0aWNlc1tjb3JuZXJUZW1wTGluZVswXV0sIGNvcm5lclZlcnRpY2VzW2Nvcm5lclRlbXBMaW5lWzFdXV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgbW9sZFRlbXBMaW5lIG9mIG1vbGRUZW1wTGluZXMpIHtcbiAgICAgICAgICAgICAgICBtb2xkVGVtcExpbmVQb2ludHMucHVzaChbbW9sZFZlcnRpY2VzW21vbGRUZW1wTGluZVswXV0sIG1vbGRWZXJ0aWNlc1ttb2xkVGVtcExpbmVbMV1dXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNvcm5lck1vbGRUZW1wTGluZSBvZiBjb3JuZXJNb2xkVGVtcExpbmVzKSB7XG4gICAgICAgICAgICAgICAgbW9sZFRlbXBMaW5lUG9pbnRzLnB1c2goW2Nvcm5lck1vbGRWZXJ0aWNlc1tjb3JuZXJNb2xkVGVtcExpbmVbMF1dLCBjb3JuZXJNb2xkVmVydGljZXNbY29ybmVyTW9sZFRlbXBMaW5lWzFdXV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChfYSA9IHRoZVNlZ21lbnQudGVtcFNoYXBlSWQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBhcHBWaWV3LmNsZWFyVGVtcG9yYXJ5U2hhcGVzQnlJZHModGhlU2VnbWVudC50ZW1wU2hhcGVJZCk7XG4gICAgICAgICAgICAgICAgdGhlU2VnbWVudC50ZW1wU2hhcGVJZCA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRlbXBMaW5lUG9pbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YWlyQ29sb3IgPSBmb2N1c2VkID8gVGVtcExpbmVDb2xvcnMuRm9jdXMgOiBUZW1wTGluZUNvbG9ycy5TdGFpcjtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZW1wU2hhcGVJZCA9IGFwcFZpZXcuZHJhd1BvbHlsaW5lcyh0ZW1wTGluZVBvaW50cywgeyBjb2xvcjogc3RhaXJDb2xvciwgZGVwdGhUZXN0OiBmYWxzZSwgcGF0dGVybjogVGVtcExpbmVQYXR0ZXJucy5TdGFpckFuZE1vbGQgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHRlbXBTaGFwZUlkID09PSBudWxsIHx8IHRlbXBTaGFwZUlkID09PSB2b2lkIDAgPyB2b2lkIDAgOiB0ZW1wU2hhcGVJZC5pZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhlU2VnbWVudC50ZW1wU2hhcGVJZCA9IFsuLi50ZW1wU2hhcGVJZC5pZHNdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtb2xkVGVtcExpbmVQb2ludHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbW9sZENvbG9yID0gZm9jdXNlZCA/IFRlbXBMaW5lQ29sb3JzLkZvY3VzIDogVGVtcExpbmVDb2xvcnMuTW9sZDtcbiAgICAgICAgICAgICAgICBjb25zdCBtb2xkVGVtcFNoYXBlSWQgPSBhcHBWaWV3LmRyYXdQb2x5bGluZXMobW9sZFRlbXBMaW5lUG9pbnRzLCB7IGNvbG9yOiBtb2xkQ29sb3IsIGRlcHRoVGVzdDogdGhpcy5kcmF3aW5nLCBwYXR0ZXJuOiBUZW1wTGluZVBhdHRlcm5zLlN0YWlyQW5kTW9sZCB9KTtcbiAgICAgICAgICAgICAgICBpZiAobW9sZFRlbXBTaGFwZUlkID09PSBudWxsIHx8IG1vbGRUZW1wU2hhcGVJZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogbW9sZFRlbXBTaGFwZUlkLmlkcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKF9iID0gdGhlU2VnbWVudC50ZW1wU2hhcGVJZCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhlU2VnbWVudC50ZW1wU2hhcGVJZC5wdXNoKC4uLm1vbGRUZW1wU2hhcGVJZC5pZHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhlU2VnbWVudC50ZW1wU2hhcGVJZCA9IFsuLi5tb2xkVGVtcFNoYXBlSWQuaWRzXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkcmF3SGFuZHJhaWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdIYW5kcmFpbHMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBkcmF3SGFuZHJhaWxzKCkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBjb25zdCBwcmV2SGFuZHJhaWxUZW1wU2hhcGVJZHMgPSAoX2EgPSB0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRlbXBTaGFwZUlkO1xuICAgICAgICB0aGlzLmdlbmVyYXRlSGFuZHJhaWxTaGFwZSgpO1xuICAgICAgICBpZiAocHJldkhhbmRyYWlsVGVtcFNoYXBlSWRzID09PSBudWxsIHx8IHByZXZIYW5kcmFpbFRlbXBTaGFwZUlkcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcHJldkhhbmRyYWlsVGVtcFNoYXBlSWRzLmxlbmd0aCkge1xuICAgICAgICAgICAgYXBwVmlldy5jbGVhclRlbXBvcmFyeVNoYXBlc0J5SWRzKHByZXZIYW5kcmFpbFRlbXBTaGFwZUlkcyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaGFuZHJhaWxzID0gKF9iID0gdGhpcy5oYW5kcmFpbENvbGxlY3Rpb24pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5oYW5kcmFpbHM7XG4gICAgICAgIGNvbnN0IHRlbXBMaW5lUG9pbnRzID0gW107XG4gICAgICAgIGlmICh0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbiAmJiAoaGFuZHJhaWxzID09PSBudWxsIHx8IGhhbmRyYWlscyA9PT0gdm9pZCAwID8gdm9pZCAwIDogaGFuZHJhaWxzLmxlbmd0aCkpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgeyByYWlsLCBjb2x1bW5zIH0gb2YgaGFuZHJhaWxzKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByYWlsLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByYWlsUG9pbnQgPSByYWlsW2ldO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByYWlsTmV4dFBvaW50ID0gcmFpbFtpICsgMV07XG4gICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lUG9pbnRzLnB1c2goW3JhaWxQb2ludCwgcmFpbE5leHRQb2ludF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0ZW1wTGluZVBvaW50cy5wdXNoKC4uLmNvbHVtbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaGFuZHJhaWxUZW1wU2hhcGVJZHMgPSBhcHBWaWV3LmRyYXdQb2x5bGluZXModGVtcExpbmVQb2ludHMsIHsgY29sb3I6IFRlbXBMaW5lQ29sb3JzLkhhbmRyYWlsLCBkZXB0aFRlc3Q6IGZhbHNlLCBwYXR0ZXJuOiBUZW1wTGluZVBhdHRlcm5zLkhhbmRyYWlsIH0pO1xuICAgICAgICAgICAgaWYgKGhhbmRyYWlsVGVtcFNoYXBlSWRzID09PSBudWxsIHx8IGhhbmRyYWlsVGVtcFNoYXBlSWRzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBoYW5kcmFpbFRlbXBTaGFwZUlkcy5pZHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbi50ZW1wU2hhcGVJZCA9IGhhbmRyYWlsVGVtcFNoYXBlSWRzLmlkcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjbGVhclRlbXBTaGFwZXModGhlU2VnbWVudCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICh0aGVTZWdtZW50KSB7XG4gICAgICAgICAgICBpZiAoKF9hID0gdGhlU2VnbWVudC50ZW1wU2hhcGVJZCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGFwcFZpZXcuY2xlYXJUZW1wb3JhcnlTaGFwZXNCeUlkcyh0aGVTZWdtZW50LnRlbXBTaGFwZUlkKTtcbiAgICAgICAgICAgICAgICB0aGVTZWdtZW50LnRlbXBTaGFwZUlkID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhcHBWaWV3LmNsZWFyVGVtcG9yYXJ5U2hhcGVzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9jdXNDb21wb25lbnQoY29tcG9uZW50SW5kZXgpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgIGlmIChjb21wb25lbnRJbmRleCA9PT0gdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RTZWdtZW50ID0gdGhpcy5zZWdtZW50c1t0aGlzLnNlZ21lbnRzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgY29uc3QgbGFzdFNlZ21lbnRJbmRleCA9IGxhc3RTZWdtZW50LnBhcmFtLmluZGV4O1xuICAgICAgICAgICAgLy8gaWYgKGNvbXBvbmVudEluZGV4ICE9PSB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCkge1xuICAgICAgICAgICAgY29uc3QgbmV3Rm9jdXNlZFNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleCh0aGlzLnNlZ21lbnRzLCBjb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICBjb25zdCBvbGRGb2N1c2VkU2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHRoaXMuc2VnbWVudHMsIHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgIGlmIChuZXdGb2N1c2VkU2VnbWVudCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYXdpbmcgJiYgIWxhc3RTZWdtZW50LmVuZExvY2tlZCAmJiBjb21wb25lbnRJbmRleCAhPT0gbGFzdFNlZ21lbnRJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHBhcmFtOiB7IHR5cGU6IG5ld0ZvY3VzZWRUeXBlIH0sIG1vbGRTaGFwZTogeyB2ZXJ0aWNlczogbmV3Rm9jdXNlZFZlcnRpY2VzLCB0ZW1wTGluZXM6IG5ld0ZvY3VzZWRUZW1wTGluZXMgfSB9ID0gbmV3Rm9jdXNlZFNlZ21lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgc3RhcnQgfSA9IGxhc3RTZWdtZW50O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyUGlja1N0YXJ0VGVtcFNoYXBlcyhsYXN0U2VnbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdGb2N1c2VkVHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhclRlbXBTaGFwZXMobGFzdFNlZ21lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RTZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjYWNoZWRJbmRleCA9IGxhc3RTZWdtZW50LnBhcmFtLmluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LnBhcmFtID0gZ2V0TmV3Q29tcG9uZW50UGFyYW0oQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyLCBuZXdGb2N1c2VkU2VnbWVudCwgdGhpcy5zdGFpclBhcmFtLnVwd2FyZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQucGFyYW0uaW5kZXggPSBjYWNoZWRJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlBhcmFtQ2hhbmdlZEJ5RHJhdywgY29tcG9uZW50UGFyYW06IE9iamVjdC5hc3NpZ24oe30sIGxhc3RTZWdtZW50LnBhcmFtKSB9LCAnKicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9sZEZvY3VzZWRTZWdtZW50ICYmIG9sZEZvY3VzZWRTZWdtZW50ICE9PSBuZXdGb2N1c2VkU2VnbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9sZEZvY3VzZWRTZWdtZW50Lm5leHRDb21wb25lbnRzLmZvckVhY2goaW5kcyA9PiBpbmRzLmRlbGV0ZShsYXN0U2VnbWVudC5wYXJhbS5pbmRleCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCgoX2EgPSBsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGluZTNkSW5kZXgpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXdGb2N1c2VkU2VnbWVudC5uZXh0Q29tcG9uZW50cy5mb3JFYWNoKGluZHMgPT4gaW5kcy5kZWxldGUobGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiYXNlU2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHRoaXMuc2VnbWVudHMsIGxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiYXNlU2VnbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXNlU2VnbWVudC5uZXh0Q29tcG9uZW50cy5mb3JFYWNoKGluZHMgPT4gaW5kcy5kZWxldGUobGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2xvc2VzdFBvaW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1pbkRpc3RhbmNlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0ZvY3VzZWRUZW1wTGluZXMuZm9yRWFjaCgobGluZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsaW5lU2VnM2QgPSBHZW9tTGliLmNyZWF0ZUxpbmVTZWdtZW50M2QobmV3Rm9jdXNlZFZlcnRpY2VzW2xpbmVbMF1dLCBuZXdGb2N1c2VkVmVydGljZXNbbGluZVsxXV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoZVBvaW50ID0gbGluZVNlZzNkLmdldENsb3Nlc3RQb2ludChzdGFydCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyRGlzdGFuY2UgPSB0aGVQb2ludC5kaXN0YW5jZVRvKHN0YXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNsb3Nlc3RQb2ludCB8fCBjdXJEaXN0YW5jZSA8IG1pbkRpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbkRpc3RhbmNlID0gY3VyRGlzdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RQb2ludCA9IHRoZVBvaW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5zdGFydCA9IGNsb3Nlc3RQb2ludDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGFzdFNlZ21lbnQuYmFzZUxpbmVTZWczZCA9IHsgc3RhcnQ6IG5ld0ZvY3VzZWRWZXJ0aWNlc1tsaW5lWzBdXSwgZW5kOiBuZXdGb2N1c2VkVmVydGljZXNbbGluZVsxXV0gfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudCA9IHsgY29tcG9uZW50SW5kZXg6IG5ld0ZvY3VzZWRTZWdtZW50LnBhcmFtLmluZGV4LCBsaW5lM2RJbmRleDogaW5kZXgsIGxpbmUzZDogeyBzdGFydDogbmV3Rm9jdXNlZFZlcnRpY2VzW2xpbmVbMF1dLCBlbmQ6IG5ld0ZvY3VzZWRWZXJ0aWNlc1tsaW5lWzFdXSB9IH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKChfYiA9IGxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5saW5lM2RJbmRleCkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0ZvY3VzZWRTZWdtZW50Lm5leHRDb21wb25lbnRzW2xhc3RTZWdtZW50LmJhc2VDb21wb25lbnQubGluZTNkSW5kZXhdLmFkZChsYXN0U2VnbWVudC5wYXJhbS5pbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5zdGFydExvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuY2lyY2xlVGFuZ2VudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LnN0YXJ0SGVpZ2h0ID0gbmV3Rm9jdXNlZFNlZ21lbnQuZW5kSGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3UGlja1N0YXJ0VGVtcFNoYXBlcyhzdGFydCwgbGFzdFNlZ21lbnQuc3RhcnQsIGxhc3RTZWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbmV3Rm9jdXNlZFNlZ21lbnQubmV4dENvbXBvbmVudHNbMF0uc2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuY2xlYXJUZW1wU2hhcGVzKGxhc3RTZWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2xkRm9jdXNlZFNlZ21lbnQgJiYgb2xkRm9jdXNlZFNlZ21lbnQgIT09IG5ld0ZvY3VzZWRTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9sZEZvY3VzZWRTZWdtZW50Lm5leHRDb21wb25lbnRzLmZvckVhY2goaW5kcyA9PiBpbmRzLmRlbGV0ZShsYXN0U2VnbWVudC5wYXJhbS5pbmRleCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKChfYyA9IGxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5saW5lM2RJbmRleCkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXdGb2N1c2VkU2VnbWVudC5uZXh0Q29tcG9uZW50cy5mb3JFYWNoKGluZHMgPT4gaW5kcy5kZWxldGUobGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFzZVNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleCh0aGlzLnNlZ21lbnRzLCBsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhc2VTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXNlU2VnbWVudC5uZXh0Q29tcG9uZW50cy5mb3JFYWNoKGluZHMgPT4gaW5kcy5kZWxldGUobGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5zdGFydCA9IG5ld0ZvY3VzZWRTZWdtZW50LmVuZC5jbG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LnN0YXJ0TG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5zdGFydEhlaWdodCA9IG5ld0ZvY3VzZWRTZWdtZW50LmVuZEhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsYXN0U2VnbWVudC5iYXNlTGluZVNlZzNkID0geyBzdGFydDogbmV3Rm9jdXNlZFZlcnRpY2VzW25ld0ZvY3VzZWRWZXJ0aWNlcy5sZW5ndGggLSAxXSwgZW5kOiBuZXdGb2N1c2VkVmVydGljZXNbbmV3Rm9jdXNlZFZlcnRpY2VzLmxlbmd0aCAtIDJdIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudCA9IHsgY29tcG9uZW50SW5kZXg6IG5ld0ZvY3VzZWRTZWdtZW50LnBhcmFtLmluZGV4LCBsaW5lM2RJbmRleDogMCwgbGluZTNkOiB7IHN0YXJ0OiBuZXdGb2N1c2VkVmVydGljZXNbbmV3Rm9jdXNlZFZlcnRpY2VzLmxlbmd0aCAtIDFdLCBlbmQ6IG5ld0ZvY3VzZWRWZXJ0aWNlc1tuZXdGb2N1c2VkVmVydGljZXMubGVuZ3RoIC0gMl0gfSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0ZvY3VzZWRTZWdtZW50Lm5leHRDb21wb25lbnRzWzBdLmFkZChsYXN0U2VnbWVudC5wYXJhbS5pbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuY2lyY2xlVGFuZ2VudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdUZW1wQ29tcG9uZW50KGxhc3RTZWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGxhc3RTZWdtZW50LnN0YXJ0TG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgbGFzdFNlZ21lbnQuY2lyY2xlVGFuZ2VudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoKHRoaXMuZHJhd2luZyAmJiBjb21wb25lbnRJbmRleCAhPT0gbGFzdFNlZ21lbnRJbmRleCkgfHwgIXRoaXMuZHJhd2luZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdUZW1wQ29tcG9uZW50KG5ld0ZvY3VzZWRTZWdtZW50LCB0aGlzLmRyYXdpbmcsIHRoaXMuZHJhd2luZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCgodGhpcy5kcmF3aW5nICYmIHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4ICE9PSBsYXN0U2VnbWVudEluZGV4KSB8fCAoIXRoaXMuZHJhd2luZyAmJiB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCAhPT0gY29tcG9uZW50SW5kZXgpKSAmJiBvbGRGb2N1c2VkU2VnbWVudCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYXdpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3VGVtcENvbXBvbmVudChvbGRGb2N1c2VkU2VnbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyVGVtcFNoYXBlcyhvbGRGb2N1c2VkU2VnbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggPSBjb21wb25lbnRJbmRleDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW1vdmVDb21wb25lbnQoY29tcG9uZW50SW5kZXgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAodGhpcy5zZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IHRoZUluZGV4ID0gdGhpcy5zZWdtZW50cy5maW5kSW5kZXgoc2VnID0+IHNlZy5wYXJhbS5pbmRleCA9PT0gY29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgaWYgKHRoZUluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0aGVTZWdtZW50ID0gdGhpcy5zZWdtZW50c1t0aGVJbmRleF07XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZHJhd2luZykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKF9hID0gdGhlU2VnbWVudC50ZW1wU2hhcGVJZCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBwVmlldy5jbGVhclRlbXBvcmFyeVNoYXBlc0J5SWRzKHRoZVNlZ21lbnQudGVtcFNoYXBlSWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd0hhbmRyYWlscygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmVkaXRNb2RlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVJbnN0YW5jZSA9IHRoaXMuZWRpdE1vZGVsLnN0YWlycy5nZXQoY29tcG9uZW50SW5kZXgpIHx8IHRoaXMuZWRpdE1vZGVsLnBsYXRmb3Jtcy5nZXQoY29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhlSW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsLnN0YWlycy5kZWxldGUoY29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZWwucGxhdGZvcm1zLmRlbGV0ZShjb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNpZ24ucmVtb3ZlR3JvdXBJbnN0YW5jZSh0aGVJbnN0YW5jZS5pbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zZWdtZW50cy5zcGxpY2UodGhlSW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIC8vIHRvIGNsZWFyIHJlbGF0aW9uc1xuICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VDb21wb25lbnQgPSB0aGVTZWdtZW50LmJhc2VDb21wb25lbnQ7XG4gICAgICAgICAgICAgICAgY29uc3QgYmFzZVNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleCh0aGlzLnNlZ21lbnRzLCBiYXNlQ29tcG9uZW50ID09PSBudWxsIHx8IGJhc2VDb21wb25lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJhc2VDb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgIGlmIChiYXNlU2VnbWVudCAmJiAoYmFzZUNvbXBvbmVudCA9PT0gbnVsbCB8fCBiYXNlQ29tcG9uZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBiYXNlQ29tcG9uZW50LmxpbmUzZEluZGV4KSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHRoZUluZCA9IGJhc2VTZWdtZW50Lm5leHRDb21wb25lbnRzW2Jhc2VDb21wb25lbnQubGluZTNkSW5kZXhdLmZpbmRJbmRleChpID0+IGkgPT09IHRoZVNlZ21lbnQucGFyYW0uaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiAodGhlSW5kID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgYmFzZVNlZ21lbnQubmV4dENvbXBvbmVudHNbYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleF0uZGVsZXRlKHRoZVNlZ21lbnQucGFyYW0uaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IG5leHRDb21wb25lbnRzID0gdGhlU2VnbWVudC5uZXh0Q29tcG9uZW50cztcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG5leHRTZWdtZW50SW5kcyBvZiBuZXh0Q29tcG9uZW50cykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFNlZ21lbnRJbmRzLnNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbmV4dFNlZ0luZCBvZiBuZXh0U2VnbWVudEluZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0U2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHRoaXMuc2VnbWVudHMsIG5leHRTZWdJbmQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0U2VnbWVudCAmJiBuZXh0U2VnbWVudC5iYXNlQ29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTZWdtZW50LmJhc2VDb21wb25lbnQuY29tcG9uZW50SW5kZXggPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTZWdtZW50LmJhc2VDb21wb25lbnQubGluZTNkSW5kZXggPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggPT09IGNvbXBvbmVudEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCA9IHRoaXMuc2VnbWVudHNbdGhpcy5zZWdtZW50cy5sZW5ndGggLSAxXS5wYXJhbS5pbmRleDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZWwgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25NYXRlcmlhbFJlcGxhY2VDbGljayhjaGFuZ2VQYXJhbSwgaW5kZXgpIHtcbiAgICAgICAgYXBwLmdldEFwcGxpY2F0aW9uVUkoKS50b2dnbGVNYXRlcmlhbFJlcGxhY2VQYW5lbCh0cnVlLCB0aGlzLm9uTWF0ZXJpYWxSZXBsYWNlSXRlbUNsaWNrKGNoYW5nZVBhcmFtLCBpbmRleCkpO1xuICAgIH1cbiAgICBjaGFuZ2VTdGFpclBhcmFtKHN0YWlyUGFyYW0sIGNoYW5nZVBhcmFtcykge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oLCBfaiwgX2s7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0aGlzLnN0YWlyUGFyYW0gPSBzdGFpclBhcmFtO1xuICAgICAgICAgICAgaWYgKCF0aGlzLnNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGluc3RhbmNlUGF0aCA9IHRoaXMuZWRpdE1vZGVsID8gZGVzaWduLmdldEVkaXRQYXRoc1RvR3JvdXBJbnN0YW5jZSh0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2UpIDogW107XG4gICAgICAgICAgICBjb25zdCBsYXN0U2VnbWVudCA9IHRoaXMuc2VnbWVudHNbdGhpcy5zZWdtZW50cy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGxldCBzdGFpclByYWFtU3RyaW5nID0gJyc7XG4gICAgICAgICAgICBpZiAoY2hhbmdlUGFyYW1zLmluZGV4T2YoQ29tcG9uZW50UGFyYW1UeXBlLkhvcml6b250YWxTdGVwKSA+IC0xIHx8IGNoYW5nZVBhcmFtcy5pbmRleE9mKENvbXBvbmVudFBhcmFtVHlwZS5WZXJ0aWNhbFN0ZXApID4gLTEgfHxcbiAgICAgICAgICAgICAgICBjaGFuZ2VQYXJhbXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuU3RhcnRXaWR0aCkgPiAtMSB8fCBjaGFuZ2VQYXJhbXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuRW5kV2lkdGgpID4gLTEgfHxcbiAgICAgICAgICAgICAgICBjaGFuZ2VQYXJhbXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuVXB3YXJkKSA+IC0xIHx8XG4gICAgICAgICAgICAgICAgY2hhbmdlUGFyYW1zLmluZGV4T2YoQ29tcG9uZW50UGFyYW1UeXBlLlBsYXRmb3JtVGhpY2tuZXNzKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlR2VuZXJhdGVTZWdtZW50cyA9IHRoaXMuc2VnbWVudHM7XG4gICAgICAgICAgICAgICAgaWYgKGNoYW5nZVBhcmFtcy5pbmRleE9mKENvbXBvbmVudFBhcmFtVHlwZS5VcHdhcmQpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlU3RhaXJVcHdhcmQocmVHZW5lcmF0ZVNlZ21lbnRzWzBdLCByZUdlbmVyYXRlU2VnbWVudHMsIHN0YWlyUGFyYW0udXB3YXJkLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlR2VuZXJhdGVTZWdtZW50cyA9IHRoaXMuc2VnbWVudHMuZmlsdGVyKHNlZyA9PiBjaGFuZ2VQYXJhbXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuUGxhdGZvcm1UaGlja25lc3MpID4gLTEgPyBzZWcucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSA6IHNlZy5wYXJhbS50eXBlICE9PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHJlR2VuZXJhdGVTZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCByZUdlbmVyYXRlU2VnbWVudCBvZiByZUdlbmVyYXRlU2VnbWVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgY2hhbmdlUGFyYW0gb2YgY2hhbmdlUGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVHZW5lcmF0ZVNlZ21lbnQucGFyYW1bY2hhbmdlUGFyYW1dID0gc3RhaXJQYXJhbVtjaGFuZ2VQYXJhbV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IG9wZXJhdGlvblN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZHJhd2luZyAmJiB0aGlzLmVkaXRNb2RlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VQYXJhbXNbMF0gPT09IENvbXBvbmVudFBhcmFtVHlwZS5TdGFpck1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlUGF0aC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKHlpZWxkIGRlc2lnbi5hY3RpdmF0ZUVkaXRQYXRoKFsuLi5pbnN0YW5jZVBhdGhbMF0sIHRoaXMuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZV0pKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YWlyUGFyYW0uc3RhaXJNYXRlcmlhbCAmJiB0aGlzLnN0YWlyUGFyYW0uc3RhaXJNYXRlcmlhbC5tYXRlcmlhbElkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YWlyTWF0ZXJpYWxTdHJpbmcgPSBzdHJpbmdpZnlNYXRlcmlhbCh0aGlzLnN0YWlyUGFyYW0uc3RhaXJNYXRlcmlhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICEhKChfYSA9IHRoaXMuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnNldEN1c3RvbVByb3BlcnR5KFN0YWlyTWF0ZXJpYWxLZXksIHN0YWlyTWF0ZXJpYWxTdHJpbmcpLmlzU3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGRlc2lnbi5hc3NpZ25NYXRlcmlhbEZvckVudGl0aWVzKFsuLi50aGlzLmVkaXRNb2RlbC5zdGFpcnMudmFsdWVzKCldLm1hcChpbnN0YW5jZURhdGEgPT4gaW5zdGFuY2VEYXRhLmluc3RhbmNlKSwgdGhpcy5zdGFpclBhcmFtLnN0YWlyTWF0ZXJpYWwubWF0ZXJpYWxJZCwgdGhpcy5zdGFpclBhcmFtLnN0YWlyTWF0ZXJpYWwuYmdpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hhbmdlUGFyYW1zWzBdID09PSBDb21wb25lbnRQYXJhbVR5cGUuUGxhdGZvcm1NYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZVBhdGgubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICh5aWVsZCBkZXNpZ24uYWN0aXZhdGVFZGl0UGF0aChbLi4uaW5zdGFuY2VQYXRoWzBdLCB0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2VdKSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGFpclBhcmFtLnBsYXRmb3JtTWF0ZXJpYWwgJiYgdGhpcy5zdGFpclBhcmFtLnBsYXRmb3JtTWF0ZXJpYWwubWF0ZXJpYWxJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwbGF0Zm9ybU1hdGVyaWFsU3RyaW5nID0gc3RyaW5naWZ5TWF0ZXJpYWwodGhpcy5zdGFpclBhcmFtLnBsYXRmb3JtTWF0ZXJpYWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAhISgoX2IgPSB0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5zZXRDdXN0b21Qcm9wZXJ0eShQbGF0Zm9ybU1hdGVyaWFsS2V5LCBwbGF0Zm9ybU1hdGVyaWFsU3RyaW5nKS5pc1N1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBkZXNpZ24uYXNzaWduTWF0ZXJpYWxGb3JFbnRpdGllcyhbLi4udGhpcy5lZGl0TW9kZWwucGxhdGZvcm1zLnZhbHVlcygpXS5tYXAoaW5zdGFuY2VEYXRhID0+IGluc3RhbmNlRGF0YS5pbnN0YW5jZSksIHRoaXMuc3RhaXJQYXJhbS5wbGF0Zm9ybU1hdGVyaWFsLm1hdGVyaWFsSWQsIHRoaXMuc3RhaXJQYXJhbS5wbGF0Zm9ybU1hdGVyaWFsLmJnaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyUHJhYW1TdHJpbmcgPSBzdHJpbmdpZnlTdGFpclBhcmFtKHRoaXMuc3RhaXJQYXJhbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgISEoKF9jID0gdGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Muc2V0Q3VzdG9tUHJvcGVydHkoU3RhaXJQYXJhbUtleSwgc3RhaXJQcmFhbVN0cmluZykuaXNTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2VQYXRoLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAoeWllbGQgZGVzaWduLmFjdGl2YXRlRWRpdFBhdGgoWy4uLmluc3RhbmNlUGF0aFswXSwgdGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlXSkpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCByZUdlbmVyYXRlU2VnbWVudCBvZiByZUdlbmVyYXRlU2VnbWVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYXdpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdUZW1wQ29tcG9uZW50KHJlR2VuZXJhdGVTZWdtZW50LCByZUdlbmVyYXRlU2VnbWVudC5wYXJhbS5pbmRleCA9PT0gdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggJiYgcmVHZW5lcmF0ZVNlZ21lbnQucGFyYW0uaW5kZXggIT09IGxhc3RTZWdtZW50LnBhcmFtLmluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZWRpdE1vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBwYXJhbTogeyBpbmRleCwgdHlwZSB9IH0gPSByZUdlbmVyYXRlU2VnbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVJbnN0YW5jZSA9IHRoaXMuZWRpdE1vZGVsLnN0YWlycy5nZXQoaW5kZXgpIHx8IHRoaXMuZWRpdE1vZGVsLnBsYXRmb3Jtcy5nZXQoaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGVJbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlU2VnbWVudFNoYXBlKHJlR2VuZXJhdGVTZWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlTWVzaGVzID0gZ2VuZXJhdGVNZXNoZXMoW3JlR2VuZXJhdGVTZWdtZW50XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGVNZXNoZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGRlc2lnbi5yZW1vdmVHcm91cEluc3RhbmNlKHRoZUluc3RhbmNlLmluc3RhbmNlKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3SW5zdGFuY2UgPSBidWlsZENvbXBvbmVudEluc3RhbmNlKHJlR2VuZXJhdGVTZWdtZW50LCB0aGlzLnNlZ21lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgISFuZXdJbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0luc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsLnBsYXRmb3Jtcy5zZXQoaW5kZXgsIHsgaW5zdGFuY2U6IG5ld0luc3RhbmNlLCBkZWZpbml0aW9uS2V5OiAoKF9kID0gbmV3SW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCkpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5nZXRLZXkoKSkgfHwgJycsIGluc3RhbmNlS2V5OiBuZXdJbnN0YW5jZS5nZXRLZXkoKSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsLnN0YWlycy5zZXQoaW5kZXgsIHsgaW5zdGFuY2U6IG5ld0luc3RhbmNlLCBkZWZpbml0aW9uS2V5OiAoKF9lID0gbmV3SW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCkpID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS5nZXRLZXkoKSkgfHwgJycsIGluc3RhbmNlS2V5OiBuZXdJbnN0YW5jZS5nZXRLZXkoKSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5kcmF3aW5nICYmIHRoaXMuZWRpdE1vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKF9mID0gdGhpcy5oYW5kcmFpbENvbGxlY3Rpb24pID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZi5oYW5kcmFpbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFuZHJhaWxJbnN0YW5jZXNEYXRhID0geWllbGQgYnVpbGRIYW5kcmFpbEluc3RhbmNlKHRoaXMuc3RhaXJQYXJhbSwgKF9nID0gdGhpcy5oYW5kcmFpbENvbGxlY3Rpb24pID09PSBudWxsIHx8IF9nID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZy5oYW5kcmFpbHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGhhbmRyYWlsSW5zdGFuY2VzRGF0YSAhPT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoYW5kcmFpbEluc3RhbmNlc0RhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZWwuaGFuZHJhaWwgPSBoYW5kcmFpbEluc3RhbmNlc0RhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlUGF0aC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAoeWllbGQgZGVzaWduLmFjdGl2YXRlRWRpdFBhdGgoaW5zdGFuY2VQYXRoWzBdKSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21taXRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFib3J0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb24uYWRkKFt0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2VdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmRyYXdpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd0hhbmRyYWlscygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2hhbmdlUGFyYW1zLmxlbmd0aCA9PT0gMSAmJiBjaGFuZ2VQYXJhbXNbMF0uc3RhcnRzV2l0aChDb21wb25lbnRQYXJhbVR5cGUuSGFuZHJhaWwpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZHJhd2luZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdIYW5kcmFpbHMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5lZGl0TW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChfaCA9IHRoaXMuaGFuZHJhaWxDb2xsZWN0aW9uKSA9PT0gbnVsbCB8fCBfaCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2guaGFuZHJhaWxzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wZXJhdGlvblN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IGhhbmRyYWlsUGFyYW1zID0gdGhpcy5zdGFpclBhcmFtLmhhbmRyYWlsO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGNoYW5nZVBhcmFtc1swXSA9PT0gQ29tcG9uZW50UGFyYW1UeXBlLkhhbmRyYWlsUmFpbE1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgaWYgKHRoaXMuZWRpdE1vZGVsLmhhbmRyYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGlmIChpbnN0YW5jZVBhdGgubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAoYXdhaXQgZGVzaWduLmFjdGl2YXRlRWRpdFBhdGgoWy4uLmluc3RhbmNlUGF0aFswXSwgdGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlLCB0aGlzLmVkaXRNb2RlbC5oYW5kcmFpbC5oYW5kcmFpbEluc3RhbmNlLmluc3RhbmNlXSkpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBpZiAodGhpcy5lZGl0TW9kZWwuaGFuZHJhaWw/LnJhaWxJbnN0YW5jZXMubGVuZ3RoICYmIGhhbmRyYWlsUGFyYW1zLnJhaWwubWF0ZXJpYWwgJiYgaGFuZHJhaWxQYXJhbXMucmFpbC5tYXRlcmlhbC5tYXRlcmlhbElkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBjb25zdCByYWlsTWF0ZXJpYWxTdHJpbmcgPSBzdHJpbmdpZnlNYXRlcmlhbChoYW5kcmFpbFBhcmFtcy5yYWlsLm1hdGVyaWFsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgISF0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCk/LnNldEN1c3RvbVByb3BlcnR5KFJhaWxNYXRlcmlhbEtleSwgcmFpbE1hdGVyaWFsU3RyaW5nKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBkZXNpZ24uYXNzaWduTWF0ZXJpYWxGb3JFbnRpdGllcyh0aGlzLmVkaXRNb2RlbC5oYW5kcmFpbD8ucmFpbEluc3RhbmNlcy5tYXAoaW5zdGFuY2VEYXRhID0+IGluc3RhbmNlRGF0YS5pbnN0YW5jZSksIGhhbmRyYWlsUGFyYW1zLnJhaWwubWF0ZXJpYWwubWF0ZXJpYWxJZCwgaGFuZHJhaWxQYXJhbXMucmFpbC5tYXRlcmlhbC5iZ2lkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH0gZWxzZSBpZiAoY2hhbmdlUGFyYW1zWzBdID09PSBDb21wb25lbnRQYXJhbVR5cGUuSGFuZHJhaWxDb2x1bW5NYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGlmICh0aGlzLmVkaXRNb2RlbC5oYW5kcmFpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBpZiAoaW5zdGFuY2VQYXRoLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKGF3YWl0IGRlc2lnbi5hY3RpdmF0ZUVkaXRQYXRoKFsuLi5pbnN0YW5jZVBhdGhbMF0sIHRoaXMuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZSwgdGhpcy5lZGl0TW9kZWwuaGFuZHJhaWwuaGFuZHJhaWxJbnN0YW5jZS5pbnN0YW5jZV0pKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgaWYgKHRoaXMuZWRpdE1vZGVsLmhhbmRyYWlsPy5jb2x1bW5JbnN0YW5jZXMubGVuZ3RoICYmIGhhbmRyYWlsUGFyYW1zLmNvbHVtbi5tYXRlcmlhbCAmJiBoYW5kcmFpbFBhcmFtcy5jb2x1bW4ubWF0ZXJpYWwubWF0ZXJpYWxJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgY29uc3QgY29sdW1uTWF0ZXJpYWxTdHJpbmcgPSBzdHJpbmdpZnlNYXRlcmlhbChoYW5kcmFpbFBhcmFtcy5jb2x1bW4ubWF0ZXJpYWwpXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAhIXRoaXMuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKT8uc2V0Q3VzdG9tUHJvcGVydHkoQ29sdW1uTWF0ZXJpYWxLZXksIGNvbHVtbk1hdGVyaWFsU3RyaW5nKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBkZXNpZ24uYXNzaWduTWF0ZXJpYWxGb3JFbnRpdGllcyh0aGlzLmVkaXRNb2RlbC5oYW5kcmFpbD8uY29sdW1uSW5zdGFuY2VzLm1hcChpbnN0YW5jZURhdGEgPT4gaW5zdGFuY2VEYXRhLmluc3RhbmNlKSwgaGFuZHJhaWxQYXJhbXMuY29sdW1uLm1hdGVyaWFsLm1hdGVyaWFsSWQsIGhhbmRyYWlsUGFyYW1zLmNvbHVtbi5tYXRlcmlhbC5iZ2lkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGFpclBhcmFtLmhhbmRyYWlsLnN1cHBvcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpclByYWFtU3RyaW5nID0gc3RyaW5naWZ5U3RhaXJQYXJhbSh0aGlzLnN0YWlyUGFyYW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICEhKChfaiA9IHRoaXMuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2ogPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9qLnNldEN1c3RvbVByb3BlcnR5KFN0YWlyUGFyYW1LZXksIHN0YWlyUHJhYW1TdHJpbmcpLmlzU3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlUGF0aC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKHlpZWxkIGRlc2lnbi5hY3RpdmF0ZUVkaXRQYXRoKFsuLi5pbnN0YW5jZVBhdGhbMF0sIHRoaXMuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZV0pKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRyYWlsSW5zdGFuY2VzRGF0YSA9IHlpZWxkIGJ1aWxkSGFuZHJhaWxJbnN0YW5jZSh0aGlzLnN0YWlyUGFyYW0sIChfayA9IHRoaXMuaGFuZHJhaWxDb2xsZWN0aW9uKSA9PT0gbnVsbCB8fCBfayA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2suaGFuZHJhaWxzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBoYW5kcmFpbEluc3RhbmNlc0RhdGEgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGFuZHJhaWxJbnN0YW5jZXNEYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsLmhhbmRyYWlsID0gaGFuZHJhaWxJbnN0YW5jZXNEYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZWRpdE1vZGVsLmhhbmRyYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlUGF0aC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKHlpZWxkIGRlc2lnbi5hY3RpdmF0ZUVkaXRQYXRoKFsuLi5pbnN0YW5jZVBhdGhbMF0sIHRoaXMuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZV0pKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2lnbi5yZW1vdmVHcm91cEluc3RhbmNlKHRoaXMuZWRpdE1vZGVsLmhhbmRyYWlsLmhhbmRyYWlsSW5zdGFuY2UuaW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsLmhhbmRyYWlsID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlUGF0aC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAoeWllbGQgZGVzaWduLmFjdGl2YXRlRWRpdFBhdGgoWy4uLmluc3RhbmNlUGF0aFswXV0pKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1pdE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWJvcnRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbi5hZGQoW3RoaXMuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXN0YWlyUGFyYW0uc3RhaXJNYXRlcmlhbCAmJiBjaGFuZ2VQYXJhbXMubGVuZ3RoID09PSAwICYmIGNoYW5nZVBhcmFtc1swXSA9PT0gQ29tcG9uZW50UGFyYW1UeXBlLlN0YWlyTWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uTWF0ZXJpYWxSZXBsYWNlSXRlbUNsaWNrKGNoYW5nZVBhcmFtc1swXSwgdW5kZWZpbmVkLCB0cnVlKSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXN0YWlyUGFyYW0ucGxhdGZvcm1NYXRlcmlhbCAmJiBjaGFuZ2VQYXJhbXMubGVuZ3RoID09PSAwICYmIGNoYW5nZVBhcmFtc1swXSA9PT0gQ29tcG9uZW50UGFyYW1UeXBlLlBsYXRmb3JtTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbk1hdGVyaWFsUmVwbGFjZUl0ZW1DbGljayhjaGFuZ2VQYXJhbXNbMF0sIHVuZGVmaW5lZCwgdHJ1ZSkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCFzdGFpclBhcmFtLmhhbmRyYWlsLnJhaWwubWF0ZXJpYWwgJiYgY2hhbmdlUGFyYW1zLmxlbmd0aCA9PT0gMCAmJiBjaGFuZ2VQYXJhbXNbMF0gPT09IENvbXBvbmVudFBhcmFtVHlwZS5IYW5kcmFpbFJhaWxNYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMub25NYXRlcmlhbFJlcGxhY2VJdGVtQ2xpY2soY2hhbmdlUGFyYW1zWzBdLCB1bmRlZmluZWQsIHRydWUpKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghc3RhaXJQYXJhbS5oYW5kcmFpbC5jb2x1bW4ubWF0ZXJpYWwgJiYgY2hhbmdlUGFyYW1zLmxlbmd0aCA9PT0gMCAmJiBjaGFuZ2VQYXJhbXNbMF0gPT09IENvbXBvbmVudFBhcmFtVHlwZS5IYW5kcmFpbENvbHVtbk1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbk1hdGVyaWFsUmVwbGFjZUl0ZW1DbGljayhjaGFuZ2VQYXJhbXNbMF0sIHVuZGVmaW5lZCwgdHJ1ZSkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNoYW5nZUNvbXBvbmVudFBhcmFtKGNvbXBvbmVudFBhcmFtLCBjaGFuZ2VQYXJhbXMpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kO1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnNlZ21lbnRzLmxlbmd0aClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjb25zdCB0aGVTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgodGhpcy5zZWdtZW50cywgY29tcG9uZW50UGFyYW0uaW5kZXgpO1xuICAgICAgICAgICAgY29uc3QgbGFzdFNlZ21lbnQgPSB0aGlzLnNlZ21lbnRzW3RoaXMuc2VnbWVudHMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBpZiAodGhlU2VnbWVudCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgcGFyYW06IHsgaW5kZXgsIHR5cGUgfSB9ID0gdGhlU2VnbWVudDtcbiAgICAgICAgICAgICAgICBjb21wb25lbnRQYXJhbS5tb2RlbEVkaXRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoZVNlZ21lbnQucGFyYW0gPSBjb21wb25lbnRQYXJhbTtcbiAgICAgICAgICAgICAgICBpZiAoIWlzQ2lyY3VsYXJTdGFpcih0aGVTZWdtZW50KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGVTZWdtZW50LmNpcmNsZVRhbmdlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VQYXJhbXMubGVuZ3RoID09PSAwICYmIGNoYW5nZVBhcmFtc1swXSA9PT0gQ29tcG9uZW50UGFyYW1UeXBlLkNvbXBvbmVudE1hdGVyaWFsICYmICFjb21wb25lbnRQYXJhbS5tYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTWF0ZXJpYWxSZXBsYWNlSXRlbUNsaWNrKGNoYW5nZVBhcmFtc1swXSwgY29tcG9uZW50UGFyYW0uaW5kZXgsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZHJhd2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3VGVtcENvbXBvbmVudCh0aGVTZWdtZW50LCB0aGVTZWdtZW50LnBhcmFtLmluZGV4ICE9PSBsYXN0U2VnbWVudC5wYXJhbS5pbmRleCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5lZGl0TW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlbGVjdGlvbi5jbGVhcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlSW5zdGFuY2UgPSB0aGlzLmVkaXRNb2RlbC5zdGFpcnMuZ2V0KGluZGV4KSB8fCB0aGlzLmVkaXRNb2RlbC5wbGF0Zm9ybXMuZ2V0KGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGVJbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVTZWdtZW50U2hhcGUodGhlU2VnbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlTWVzaGVzID0gZ2VuZXJhdGVNZXNoZXMoW3RoZVNlZ21lbnRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhlTWVzaGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3BlcmF0aW9uU3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGluc3RhbmNlUGF0aCA9IGRlc2lnbi5nZXRFZGl0UGF0aHNUb0dyb3VwSW5zdGFuY2UodGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlUGF0aC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICh5aWVsZCBkZXNpZ24uYWN0aXZhdGVFZGl0UGF0aChbLi4uaW5zdGFuY2VQYXRoWzBdLCB0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2VdKSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb25TdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBkZXNpZ24ucmVtb3ZlR3JvdXBJbnN0YW5jZSh0aGVJbnN0YW5jZS5pbnN0YW5jZSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdJbnN0YW5jZSA9IGJ1aWxkQ29tcG9uZW50SW5zdGFuY2UodGhlU2VnbWVudCwgdGhpcy5zZWdtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgISFuZXdJbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3SW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsLnBsYXRmb3Jtcy5zZXQoaW5kZXgsIHsgaW5zdGFuY2U6IG5ld0luc3RhbmNlLCBkZWZpbml0aW9uS2V5OiAoKF9hID0gbmV3SW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5nZXRLZXkoKSkgfHwgJycsIGluc3RhbmNlS2V5OiBuZXdJbnN0YW5jZS5nZXRLZXkoKSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsLnN0YWlycy5zZXQoaW5kZXgsIHsgaW5zdGFuY2U6IG5ld0luc3RhbmNlLCBkZWZpbml0aW9uS2V5OiAoKF9iID0gbmV3SW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5nZXRLZXkoKSkgfHwgJycsIGluc3RhbmNlS2V5OiBuZXdJbnN0YW5jZS5nZXRLZXkoKSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKF9jID0gdGhpcy5oYW5kcmFpbENvbGxlY3Rpb24pID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5oYW5kcmFpbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYW5kcmFpbEluc3RhbmNlc0RhdGEgPSB5aWVsZCBidWlsZEhhbmRyYWlsSW5zdGFuY2UodGhpcy5zdGFpclBhcmFtLCAoX2QgPSB0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbikgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLmhhbmRyYWlscyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBoYW5kcmFpbEluc3RhbmNlc0RhdGEgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoYW5kcmFpbEluc3RhbmNlc0RhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlbC5oYW5kcmFpbCA9IGhhbmRyYWlsSW5zdGFuY2VzRGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2VQYXRoLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKHlpZWxkIGRlc2lnbi5hY3RpdmF0ZUVkaXRQYXRoKGluc3RhbmNlUGF0aFswXSkpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWl0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYm9ydE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbi5hZGQoW3RoaXMuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIGNoYW5nZUNvbXBvbmVudFR5cGUoY29tcG9uZW50VHlwZTogQ29tcG9uZW50VHlwZSkge1xuICAgIC8vICAgICB0aGlzLmNvbXBvbmVudFBhcmFtLnR5cGUgPSBjb21wb25lbnRUeXBlO1xuICAgIC8vICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6ICdjb21wb25lbnRQYXJhbUNoYW5nZWQnLCBjb21wb25lbnRQYXJhbTogeyAuLi50aGlzLmNvbXBvbmVudFBhcmFtIH0gfSwgJyonKTtcbiAgICAvLyAgICAgdGhpcy5jaGFuZ2VDb21wb25lbnRQYXJhbSh0aGlzLmNvbXBvbmVudFBhcmFtLCBbQ29tcG9uZW50UGFyYW1UeXBlLlR5cGVdKTtcbiAgICAvLyB9XG4gICAgdHJ5Q29tbWl0KCkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZjtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IG1lc2hlcyA9IGdlbmVyYXRlTWVzaGVzKHRoaXMuc2VnbWVudHMpO1xuICAgICAgICAgICAgaWYgKG1lc2hlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBzdGFydE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0luc3RhbmNlcyA9IFtdO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YWlyc0NoaWxkID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHBsYXRmb3JtQ2hpbGQgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsaWRTZWdtZW50cyA9IFtdO1xuICAgICAgICAgICAgICAgIGxldCBvcGVyYXRpb25TdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHNlZ21lbnQgb2YgdGhpcy5zZWdtZW50cykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXNlZ21lbnQubWVzaClcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIW9wZXJhdGlvblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFib3J0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3SW5zdGFuY2UgPSBidWlsZENvbXBvbmVudEluc3RhbmNlKHNlZ21lbnQsIHRoaXMuc2VnbWVudHMpO1xuICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAhIW5ld0luc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV3SW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0luc3RhbmNlcy5wdXNoKG5ld0luc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF0Zm9ybUNoaWxkLnNldChzZWdtZW50LnBhcmFtLmluZGV4LCB7IGluc3RhbmNlOiBuZXdJbnN0YW5jZSwgZGVmaW5pdGlvbktleTogKChfYSA9IG5ld0luc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZ2V0S2V5KCkpIHx8ICcnLCBpbnN0YW5jZUtleTogbmV3SW5zdGFuY2UuZ2V0S2V5KCkgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpcnNDaGlsZC5zZXQoc2VnbWVudC5wYXJhbS5pbmRleCwgeyBpbnN0YW5jZTogbmV3SW5zdGFuY2UsIGRlZmluaXRpb25LZXk6ICgoX2IgPSBuZXdJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmdldEtleSgpKSB8fCAnJywgaW5zdGFuY2VLZXk6IG5ld0luc3RhbmNlLmdldEtleSgpIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5wYXJhbS5wbGF0Zm9ybUxlbmd0aExvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50LnBhcmFtLnN0ZXBQcm9wb3J0aW9uYWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5wYXJhbS53aWR0aFByb3BvcnRpb25hbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50LnBhcmFtLm1vZGVsRWRpdGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZFNlZ21lbnRzLnB1c2goc2VnbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGhhbmRyYWlsSW5zdGFuY2VEYXRhO1xuICAgICAgICAgICAgICAgIGlmICgoX2MgPSB0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbikgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmhhbmRyYWlscy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFuZHJhaWxJbnN0YW5jZXNEYXRhUmVzID0geWllbGQgYnVpbGRIYW5kcmFpbEluc3RhbmNlKHRoaXMuc3RhaXJQYXJhbSwgKF9kID0gdGhpcy5oYW5kcmFpbENvbGxlY3Rpb24pID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5oYW5kcmFpbHMpO1xuICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBoYW5kcmFpbEluc3RhbmNlc0RhdGFSZXMgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhhbmRyYWlsSW5zdGFuY2VzRGF0YVJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3SW5zdGFuY2VzLnB1c2goaGFuZHJhaWxJbnN0YW5jZXNEYXRhUmVzLmhhbmRyYWlsSW5zdGFuY2UuaW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWxJbnN0YW5jZURhdGEgPSBoYW5kcmFpbEluc3RhbmNlc0RhdGFSZXM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG5ld0luc3RhbmNlcy5sZW5ndGggJiYgb3BlcmF0aW9uU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnRJbnN0YW5jZSA9IChfZSA9IGRlc2lnbi5tYWtlR3JvdXAoW10sIG5ld0luc3RhbmNlcywgW10pKSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2UuYWRkZWRJbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgISFwYXJlbnRJbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyZW50RGVmID0gcGFyZW50SW5zdGFuY2UgPT09IG51bGwgfHwgcGFyZW50SW5zdGFuY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBhcmVudEluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50SW5zdGFuY2UgJiYgcGFyZW50RGVmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBwYXJlbnREZWYuc2V0Q3VzdG9tUHJvcGVydHkoU3RhaXJNb2RlbEtleSwgTW9kZWxWYWx1ZSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhaXJQYXJhbVN0cmluZyA9IHN0cmluZ2lmeVN0YWlyUGFyYW0odGhpcy5zdGFpclBhcmFtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIHBhcmVudERlZi5zZXRDdXN0b21Qcm9wZXJ0eShTdGFpclBhcmFtS2V5LCBzdGFpclBhcmFtU3RyaW5nKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGFpclBhcmFtLnN0YWlyTWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFpck1hdGVyaWFsU3RyaW5nID0gc3RyaW5naWZ5TWF0ZXJpYWwodGhpcy5zdGFpclBhcmFtLnN0YWlyTWF0ZXJpYWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIHBhcmVudERlZi5zZXRDdXN0b21Qcm9wZXJ0eShTdGFpck1hdGVyaWFsS2V5LCBzdGFpck1hdGVyaWFsU3RyaW5nKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGFpclBhcmFtLnBsYXRmb3JtTWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwbGF0Zm9ybU1hdGVyaWFsU3RyaW5nID0gc3RyaW5naWZ5TWF0ZXJpYWwodGhpcy5zdGFpclBhcmFtLnBsYXRmb3JtTWF0ZXJpYWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIHBhcmVudERlZi5zZXRDdXN0b21Qcm9wZXJ0eShQbGF0Zm9ybU1hdGVyaWFsS2V5LCBwbGF0Zm9ybU1hdGVyaWFsU3RyaW5nKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGFpclBhcmFtLmhhbmRyYWlsLnN1cHBvcnQgJiYgdGhpcy5zdGFpclBhcmFtLmhhbmRyYWlsLnJhaWwubWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByYWlsTWF0ZXJpYWxTdHJpbmcgPSBzdHJpbmdpZnlNYXRlcmlhbCh0aGlzLnN0YWlyUGFyYW0uaGFuZHJhaWwucmFpbC5tYXRlcmlhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgcGFyZW50RGVmLnNldEN1c3RvbVByb3BlcnR5KFJhaWxNYXRlcmlhbEtleSwgcmFpbE1hdGVyaWFsU3RyaW5nKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGFpclBhcmFtLmhhbmRyYWlsLnN1cHBvcnQgJiYgdGhpcy5zdGFpclBhcmFtLmhhbmRyYWlsLmNvbHVtbi5tYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbHVtbk1hdGVyaWFsU3RyaW5nID0gc3RyaW5naWZ5TWF0ZXJpYWwodGhpcy5zdGFpclBhcmFtLmhhbmRyYWlsLmNvbHVtbi5tYXRlcmlhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgcGFyZW50RGVmLnNldEN1c3RvbVByb3BlcnR5KENvbHVtbk1hdGVyaWFsS2V5LCBjb2x1bW5NYXRlcmlhbFN0cmluZykuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21taXRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlbCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50OiB7IGluc3RhbmNlOiBwYXJlbnRJbnN0YW5jZSwgZGVmaW5pdGlvbktleTogKChfZiA9IHBhcmVudEluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpKSA9PT0gbnVsbCB8fCBfZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2YuZ2V0S2V5KCkpIHx8ICcnLCBpbnN0YW5jZUtleTogcGFyZW50SW5zdGFuY2UuZ2V0S2V5KCkgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJzOiBzdGFpcnNDaGlsZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhdGZvcm1zOiBwbGF0Zm9ybUNoaWxkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbDogaGFuZHJhaWxJbnN0YW5jZURhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlZ21lbnRzID0gdmFsaWRTZWdtZW50cztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdUZW1wQ29tcG9uZW50KHZhbGlkU2VnbWVudHNbMF0sIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuRHJhd1N0YWlyTW9kZWxTZXR0bGVkLCBjb21wb25lbnRQYXJhbXM6IHRoaXMuc2VnbWVudHMubWFwKHNlZyA9PiAoT2JqZWN0LmFzc2lnbih7fSwgc2VnLnBhcmFtKSkpLCBzdGFpclBhcmFtOiB0aGlzLnN0YWlyUGFyYW0sIGlzRHJhd2luZzogZmFsc2UgfSwgJyonKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYWJvcnRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldEVkaXRNb2RlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdE1vZGVsO1xuICAgIH1cbiAgICBzZXRNb2RlbChncm91cEluc3RhbmNlKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZDtcbiAgICAgICAgaWYgKCgoX2EgPSB0aGlzLmVkaXRNb2RlbCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnBhcmVudC5pbnN0YW5jZUtleSkgPT09IGdyb3VwSW5zdGFuY2UuZ2V0S2V5KCkpIHtcbiAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuUHJvcGVydGllc1Zpc2libGUsIHByb3BlcnRpZXNWaXNpYmxlOiB0cnVlIH0sICcqJyk7XG4gICAgICAgICAgICBpZiAodGhpcy5zZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzQ29tcG9uZW50KHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVkaXRNb2RlbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3QgZ3JvdXBEZWYgPSBncm91cEluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpO1xuICAgICAgICBpZiAoZ3JvdXBJbnN0YW5jZSAmJiBncm91cERlZikge1xuICAgICAgICAgICAgY29uc3Qgc3RhaXJNb2RlbFByb3BlcnR5ID0gZ3JvdXBEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoU3RhaXJNb2RlbEtleSk7XG4gICAgICAgICAgICBjb25zdCBzdGFpclBhcmFtUHJvcGVydHkgPSBncm91cERlZi5nZXRDdXN0b21Qcm9wZXJ0eShTdGFpclBhcmFtS2V5KTtcbiAgICAgICAgICAgIGNvbnN0IHN0YWlyUGFyYW0gPSBwYXJzZVN0YWlyUGFyYW0oc3RhaXJQYXJhbVByb3BlcnR5KTtcbiAgICAgICAgICAgIGNvbnN0IHN0YWlyTWF0ZXJpYWxQcm9wZXJ0eSA9IGdyb3VwRGVmLmdldEN1c3RvbVByb3BlcnR5KFN0YWlyTWF0ZXJpYWxLZXkpO1xuICAgICAgICAgICAgY29uc3Qgc3RhaXJNYXRlcmlhbCA9IHBhcnNlTWF0ZXJpYWwoc3RhaXJNYXRlcmlhbFByb3BlcnR5KTtcbiAgICAgICAgICAgIGlmIChzdGFpck1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgc3RhaXJQYXJhbS5zdGFpck1hdGVyaWFsID0gc3RhaXJNYXRlcmlhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHBsYXRmb3JtTWF0ZXJpYWxQcm9wZXJ0eSA9IGdyb3VwRGVmLmdldEN1c3RvbVByb3BlcnR5KFBsYXRmb3JtTWF0ZXJpYWxLZXkpO1xuICAgICAgICAgICAgY29uc3QgcGxhdGZvcm1NYXRlcmlhbCA9IHBhcnNlTWF0ZXJpYWwocGxhdGZvcm1NYXRlcmlhbFByb3BlcnR5KTtcbiAgICAgICAgICAgIGlmIChwbGF0Zm9ybU1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgc3RhaXJQYXJhbS5wbGF0Zm9ybU1hdGVyaWFsID0gcGxhdGZvcm1NYXRlcmlhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHJhaWxNYXRlcmlhbFByb3BlcnR5ID0gZ3JvdXBEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoUmFpbE1hdGVyaWFsS2V5KTtcbiAgICAgICAgICAgIGNvbnN0IHJhaWxNYXRlcmlhbCA9IHBhcnNlTWF0ZXJpYWwocmFpbE1hdGVyaWFsUHJvcGVydHkpO1xuICAgICAgICAgICAgaWYgKHJhaWxNYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgIHN0YWlyUGFyYW0uaGFuZHJhaWwucmFpbC5tYXRlcmlhbCA9IHJhaWxNYXRlcmlhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbk1hdGVyaWFsUHJvcGVydHkgPSBncm91cERlZi5nZXRDdXN0b21Qcm9wZXJ0eShDb2x1bW5NYXRlcmlhbEtleSk7XG4gICAgICAgICAgICBjb25zdCBjb2x1bW5NYXRlcmlhbCA9IHBhcnNlTWF0ZXJpYWwoY29sdW1uTWF0ZXJpYWxQcm9wZXJ0eSk7XG4gICAgICAgICAgICBpZiAoY29sdW1uTWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICBzdGFpclBhcmFtLmhhbmRyYWlsLmNvbHVtbi5tYXRlcmlhbCA9IGNvbHVtbk1hdGVyaWFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0YWlyTW9kZWxQcm9wZXJ0eSA9PT0gTW9kZWxWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlZ21lbnRzID0gW107XG4gICAgICAgICAgICAgICAgY29uc3Qgc3ViR3JvdXBJbnN0YW5jZXMgPSBncm91cERlZi5nZXRTdWJHcm91cEluc3RhbmNlcygpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVkaXRNb2RlbCA9IHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50OiB7IGluc3RhbmNlOiBncm91cEluc3RhbmNlLCBkZWZpbml0aW9uS2V5OiAoKF9iID0gZ3JvdXBJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmdldEtleSgpKSB8fCAnJywgaW5zdGFuY2VLZXk6IGdyb3VwSW5zdGFuY2UuZ2V0S2V5KCkgfSxcbiAgICAgICAgICAgICAgICAgICAgc3RhaXJzOiBuZXcgTWFwKCksXG4gICAgICAgICAgICAgICAgICAgIHBsYXRmb3JtczogbmV3IE1hcCgpLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBzdWJJbnN0YW5jZSBvZiBzdWJHcm91cEluc3RhbmNlcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdWJEZWYgPSBzdWJJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1YkRlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFuZHJhaWxQcm9wZXJ0eSA9IHN1YkRlZi5nZXRDdXN0b21Qcm9wZXJ0eShIYW5kcmFpbE1vZGVsS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoYW5kcmFpbFByb3BlcnR5ID09PSBNb2RlbFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFuZHJhaWxJbnN0YW5jZXNEYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbEluc3RhbmNlOiB7IGluc3RhbmNlOiBzdWJJbnN0YW5jZSwgaW5zdGFuY2VLZXk6IHN1Ykluc3RhbmNlLmdldEtleSgpLCBkZWZpbml0aW9uS2V5OiBzdWJEZWYuZ2V0S2V5KCkgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFpbEluc3RhbmNlczogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbkluc3RhbmNlczogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYW5kcmFpbFN1Ykdyb3VwSW5zdGFuY2VzID0gc3ViRGVmLmdldFN1Ykdyb3VwSW5zdGFuY2VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBoYW5kcmFpbFN1Ykluc3RhbmNlIG9mIGhhbmRyYWlsU3ViR3JvdXBJbnN0YW5jZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFuZHJhaWxTdWJEZWYgPSBoYW5kcmFpbFN1Ykluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGFuZHJhaWxTdWJEZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJhaWxQcm9wZXJ0eSA9IGhhbmRyYWlsU3ViRGVmLmdldEN1c3RvbVByb3BlcnR5KFJhaWxNb2RlbEtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2x1bW5Qcm9wZXJ0eSA9IGhhbmRyYWlsU3ViRGVmLmdldEN1c3RvbVByb3BlcnR5KENvbHVtbk1vZGVsS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyYWlsUHJvcGVydHkgPT09IE1vZGVsVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbEluc3RhbmNlc0RhdGEucmFpbEluc3RhbmNlcy5wdXNoKHsgaW5zdGFuY2U6IGhhbmRyYWlsU3ViSW5zdGFuY2UsIGluc3RhbmNlS2V5OiBoYW5kcmFpbFN1Ykluc3RhbmNlLmdldEtleSgpLCBkZWZpbml0aW9uS2V5OiBoYW5kcmFpbFN1YkRlZi5nZXRLZXkoKSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNvbHVtblByb3BlcnR5ID09PSBNb2RlbFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWxJbnN0YW5jZXNEYXRhLmNvbHVtbkluc3RhbmNlcy5wdXNoKHsgaW5zdGFuY2U6IGhhbmRyYWlsU3ViSW5zdGFuY2UsIGluc3RhbmNlS2V5OiBoYW5kcmFpbFN1Ykluc3RhbmNlLmdldEtleSgpLCBkZWZpbml0aW9uS2V5OiBoYW5kcmFpbFN1YkRlZi5nZXRLZXkoKSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0TW9kZWwuaGFuZHJhaWwgPSBoYW5kcmFpbEluc3RhbmNlc0RhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBjb21wb25lbnRJbmRleFZhbHVlID0gcGFyc2VJbnQoc3ViRGVmLmdldEN1c3RvbVByb3BlcnR5KENvbXBvbmVudEluZGV4S2V5KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGlzRmluaXRlKGNvbXBvbmVudEluZGV4VmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyYW0gPSBwYXJzZUNvbXBvbmVudFBhcmFtKHN1YkRlZi5nZXRDdXN0b21Qcm9wZXJ0eShDb21wb25lbnRQYXJhbUtleSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0RW5kID0gcGFyc2VTdGFydEVuZChzdWJEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoU3RhcnRFbmRLZXkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiYXNlTGluZVNlZzNkID0gcGFyc2VMaW5lU2VnM2Qoc3ViRGVmLmdldEN1c3RvbVByb3BlcnR5KEJhc2VMaW5lU2VnM2RLZXkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiYXNlQ29tcG9uZW50ID0gcGFyc2VCYXNlQ29tcG9uZW50KHN1YkRlZi5nZXRDdXN0b21Qcm9wZXJ0eShCYXNlQ29tcG9uZW50S2V5KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2lyY2xlVGFuZ2VudCA9IHBhcnNlVmVjdG9yM2Qoc3ViRGVmLmdldEN1c3RvbVByb3BlcnR5KENpcmNsZVRhbmdlbnRLZXkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW0gJiYgc3RhcnRFbmQgJiYgYmFzZUxpbmVTZWczZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWdtZW50ID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBnZXROZXdTZWdtZW50KHBhcmFtLnR5cGUpKSwgeyBzdGFydDogc3RhcnRFbmQuc3RhcnQsIGVuZDogc3RhcnRFbmQuZW5kLCBzdGFydEhlaWdodDogc3RhcnRFbmQuc3RhcnRIZWlnaHQsIGVuZEhlaWdodDogc3RhcnRFbmQuZW5kSGVpZ2h0LCBiYXNlQ29tcG9uZW50OiB7IGNvbXBvbmVudEluZGV4OiBiYXNlQ29tcG9uZW50ID09PSBudWxsIHx8IGJhc2VDb21wb25lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJhc2VDb21wb25lbnQuY29tcG9uZW50SW5kZXgsIGxpbmUzZEluZGV4OiBiYXNlQ29tcG9uZW50ID09PSBudWxsIHx8IGJhc2VDb21wb25lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJhc2VDb21wb25lbnQubGluZTNkSW5kZXgsIGxpbmUzZDogYmFzZUxpbmVTZWczZCB9LCBjaXJjbGVUYW5nZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW0sIHN0YXJ0TG9ja2VkOiB0cnVlLCBlbmRMb2NrZWQ6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnRzLnB1c2goc2VnbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0TW9kZWwucGxhdGZvcm1zLnNldChwYXJhbS5pbmRleCwgeyBpbnN0YW5jZTogc3ViSW5zdGFuY2UsIGRlZmluaXRpb25LZXk6ICgoX2MgPSBzdWJJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmdldEtleSgpKSB8fCAnJywgaW5zdGFuY2VLZXk6IHN1Ykluc3RhbmNlLmdldEtleSgpIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdE1vZGVsLnN0YWlycy5zZXQocGFyYW0uaW5kZXgsIHsgaW5zdGFuY2U6IHN1Ykluc3RhbmNlLCBkZWZpbml0aW9uS2V5OiAoKF9kID0gc3ViSW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCkpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5nZXRLZXkoKSkgfHwgJycsIGluc3RhbmNlS2V5OiBzdWJJbnN0YW5jZS5nZXRLZXkoKSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2VnbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnRzLnNvcnQoKGEsIGIpID0+IGEucGFyYW0uaW5kZXggLSBiLnBhcmFtLmluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRTZWdtZW50UmVsYXRpb25zKHNlZ21lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWdtZW50cyA9IHNlZ21lbnRzO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlbCA9IGVkaXRNb2RlbDtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5kcmF3VGVtcENvbXBvbmVudChzZWdtZW50c1swXSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNDb21wb25lbnQoc2VnbWVudHNbMF0ucGFyYW0uaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLkRyYXdTdGFpck1vZGVsU2V0dGxlZCwgY29tcG9uZW50UGFyYW1zOiB0aGlzLnNlZ21lbnRzLm1hcChzZWcgPT4gKE9iamVjdC5hc3NpZ24oe30sIHNlZy5wYXJhbSkpKSwgc3RhaXJQYXJhbTogdGhpcy5zdGFpclBhcmFtLCBpc0RyYXdpbmc6IGZhbHNlIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNsZWFyRWRpdE1vZGVsKCkge1xuICAgICAgICB0aGlzLmVkaXRNb2RlbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zZWdtZW50cyA9IFtdO1xuICAgICAgICB0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggPSBEZWZhdWx0Rm9jdXNlZENvbXBvbmVudEluZGV4O1xuICAgICAgICBhcHBWaWV3LmNsZWFyVGVtcG9yYXJ5U2hhcGVzKCk7XG4gICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuRHJhd1N0YWlyTW9kZWxTZXR0bGVkLCBpc0RyYXdpbmc6IGZhbHNlIH0sICcqJyk7XG4gICAgfVxuICAgIGNsZWFyKCkge1xuICAgICAgICBhcHBWaWV3LmNsZWFyVGVtcG9yYXJ5U2hhcGVzKCk7XG4gICAgICAgIC8vIHRoaXMuY29tcG9uZW50UGFyYW0gPSB7IC4uLkRlZmF1bHRDb21wb25lbnRQYXJhbSB9O1xuICAgICAgICAvLyB0aGlzLnNlZ21lbnRzID0gW107XG4gICAgICAgIHRoaXMuZHJhd2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCA9IERlZmF1bHRGb2N1c2VkQ29tcG9uZW50SW5kZXg7XG4gICAgICAgIHRoaXMuc3RhaXJQYXJhbSA9IERlZmF1bHRTdGFpclBhcmFtO1xuICAgICAgICAvLyB0aGlzLmVkaXRNb2RlbCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgb25SQnV0dG9uVXAoZXZlbnQsIGluZmVyZW5jZVJlc3VsdCkge1xuICAgICAgICB0aGlzLnRyeUNvbW1pdCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgZGVBY3RpdmF0ZURyYXdTdGFpcnNUb29sKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvbkxCdXR0b25EYkNsaWNrKGV2ZW50LCBpbmZlcmVuY2VSZXN1bHQpIHtcbiAgICAgICAgO1xuICAgIH1cbiAgICBhbGxvd1VzaW5nSW5mZXJlbmNlKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgb25LZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIDtcbiAgICB9XG4gICAgb25LZXlVcChldmVudCkge1xuICAgICAgICA7XG4gICAgfVxuICAgIGdlbmVyYXRlU2VnbWVudFNoYXBlKHNlZ21lbnQsIHRlbXAgPSB0cnVlKSB7XG4gICAgICAgIGdlbmVyYXRlU2hhcGUoc2VnbWVudCwgdGVtcCk7XG4gICAgICAgIC8vIHRoaXMuZ2VuZXJhdGVIYW5kcmFpbFNoYXBlKCk7XG4gICAgfVxuICAgIGdlbmVyYXRlSGFuZHJhaWxTaGFwZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VnbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBoYW5kcmFpbHMgPSBnZW5lcmF0ZUhhbmRyYWlsU2hhcGUodGhpcy5zdGFpclBhcmFtLCB0aGlzLnNlZ21lbnRzKTtcbiAgICAgICAgICAgIHRoaXMuaGFuZHJhaWxDb2xsZWN0aW9uID0geyBoYW5kcmFpbHM6IGhhbmRyYWlscyB8fCBbXSB9O1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGNvbnN0IGRyYXdTdGFpcnNUb29sID0gbmV3IERyYXdTdGFpcnNUb29sKCk7XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCB7IERpcmVjdGlvblosIGR1bW15UG9pbnQzZCB9IGZyb20gXCIuL2NvbnN0c1wiO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudEtleSwgQmFzZUxpbmVTZWczZEtleSwgQ2lyY2xlVGFuZ2VudEtleSwgQ29sdW1uVHlwZSwgQ29tcG9uZW50VHlwZSwgRGVmYXVsdFN0YWlyUGFyYW0sIEhhbmRyYWlsTW9kZWxLZXksIFJhaWxUeXBlLCBNb2RlbFZhbHVlLCBTdGFydEVuZEtleSwgUHJlc2V0TWF0ZXJpYWxzLCBDb2x1bW5Nb2RlbEtleSwgUmFpbE1vZGVsS2V5LCBDb21wb25lbnRQYXJhbUtleSB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBnZXRDb29yZGluYXRlLCBzdHJpbmdpZnlCYXNlQ29tcG9uZW50LCBzdHJpbmdpZnlDb21wb25lbnRQYXJhbSwgc3RyaW5naWZ5UG9pbnQzZCwgc3RyaW5naWZ5U3RhcnRFbmQgfSBmcm9tIFwiLi91dGlsc1wiO1xuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlTWVzaGVzKHNlZ21lbnRzKSB7XG4gICAgY29uc3QgbWVzaGVzID0gW107XG4gICAgZm9yIChjb25zdCBzZWdtZW50IG9mIHNlZ21lbnRzKSB7XG4gICAgICAgIGNvbnN0IHsgcGFyYW06IHsgdHlwZSB9LCBjaXJjbGVUYW5nZW50IH0gPSBzZWdtZW50O1xuICAgICAgICBpZiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyKSB7XG4gICAgICAgICAgICBnZW5lcmF0ZVN0cmFpZ2h0U3RhaXJNZXNoKHNlZ21lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpcikge1xuICAgICAgICAgICAgaWYgKGNpcmNsZVRhbmdlbnQpIHtcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZUNpcmN1bGFyU3RhaXJNZXNoKHNlZ21lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVTdHJhaWdodFN0YWlyTWVzaChzZWdtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGdlbmVyYXRlUGxhdGZvcm1NZXNoKHNlZ21lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWdtZW50Lm1lc2gpIHtcbiAgICAgICAgICAgIG1lc2hlcy5wdXNoKHNlZ21lbnQubWVzaCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1lc2hlcztcbn1cbmZ1bmN0aW9uIGdlbmVyYXRlQ2lyY3VsYXJTdGFpck1lc2goc2VnbWVudCkge1xuICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mLCBfZywgX2gsIF9qLCBfaywgX2w7XG4gICAgY29uc3QgeyBzdGFydExvY2tlZCwgY2lyY2xlVGFuZ2VudCwgc3RhaXJTaGFwZTogeyB2ZXJ0aWNlcywgc3RlcENvdW50IH0sIGNvcm5lclNoYXBlOiB7IHZlcnRpY2VzOiBjb3JuZXJWZXJ0aWNlcyB9LCBwYXJhbTogeyB1cHdhcmQgfSB9ID0gc2VnbWVudDtcbiAgICBpZiAoc3RlcENvdW50IDwgMSB8fCAhc3RhcnRMb2NrZWQgfHwgIWNpcmNsZVRhbmdlbnQpXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgY29uc3Qgc3RhaXJNZXNoID0ge1xuICAgICAgICB2ZXJ0aWNlczogdmVydGljZXMubWFwKHZlcnRleCA9PiBbdmVydGV4LngsIHZlcnRleC55LCB2ZXJ0ZXguel0pLFxuICAgICAgICB0cmlhbmdsZUluZGljZXM6IFtdLFxuICAgICAgICBzb2Z0RWRnZXM6IFtdLFxuICAgIH07XG4gICAgLy8g5pyA5bqV6YOo5Y+w6Zi25ZCO5LiL5L2N572uXG4gICAgLy8gY29uc3QgbGVmdEluZGV4ID0gdmVydGljZXMubGVuZ3RoIC0gKCghdXB3YXJkICYmIHN0ZXBDb3VudCA+IDEpID8gNCA6IDIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RlcENvdW50OyBpKyspIHtcbiAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAvLyBzdGFpciBmYWNlc1xuICAgICAgICBbaSAqIDQsIGkgKiA0ICsgMSwgaSAqIDQgKyAyXSwgW2kgKiA0ICsgMSwgaSAqIDQgKyAzLCBpICogNCArIDJdLCBbaSAqIDQgKyAyLCBpICogNCArIDMsIGkgKiA0ICsgNF0sIFtpICogNCArIDMsIGkgKiA0ICsgNSwgaSAqIDQgKyA0XSwgXG4gICAgICAgIC8vIHNpZGUgZmFjZXMgKHVwKVxuICAgICAgICBbaSAqIDQsIGkgKiA0ICsgMiwgKGkgKyAxKSAqIDRdLCBbaSAqIDQgKyAxLCAoaSArIDEpICogNCArIDEsIGkgKiA0ICsgM10pO1xuICAgICAgICAoX2EgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucHVzaChbaSAqIDQgKyAxLCBpICogNCArIDJdLCBbaSAqIDQgKyAzLCBpICogNCArIDRdLCBbaSAqIDQsIChpICsgMSkgKiA0XSwgWyhpICsgMSkgKiA0ICsgMSwgaSAqIDQgKyAxXSk7XG4gICAgICAgIGlmICh1cHdhcmQpIHtcbiAgICAgICAgICAgIGNvbnN0IGJvdHRvbUZyb250TGVmdEluZGV4ID0gNCAqIHN0ZXBDb3VudCArIDIgKyAyICogKHN0ZXBDb3VudCAtIGkgLSAxKTtcbiAgICAgICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgICAgIC8vIHNpZGUgZmFjZXMgKG1pZGRsZSlcbiAgICAgICAgICAgIFtpICogNCwgKGkgKyAxKSAqIDQsIGJvdHRvbUZyb250TGVmdEluZGV4XSwgWyhpICsgMSkgKiA0ICsgMSwgaSAqIDQgKyAxLCBib3R0b21Gcm9udExlZnRJbmRleCArIDFdKTtcbiAgICAgICAgICAgIGlmIChpIDwgc3RlcENvdW50IC0gMSkge1xuICAgICAgICAgICAgICAgIChfYiA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5wdXNoKFsoaSArIDEpICogNCwgYm90dG9tRnJvbnRMZWZ0SW5kZXhdLCBbKGkgKyAxKSAqIDQgKyAxLCBib3R0b21Gcm9udExlZnRJbmRleCArIDFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgICAgICAgICAvLyBzaWRlIGZhY2VzIChib3R0b20pXG4gICAgICAgICAgICAgICAgW2kgKiA0LCBib3R0b21Gcm9udExlZnRJbmRleCwgYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAyXSwgW2JvdHRvbUZyb250TGVmdEluZGV4ICsgMSwgaSAqIDQgKyAxLCBib3R0b21Gcm9udExlZnRJbmRleCArIDNdLCBcbiAgICAgICAgICAgICAgICAvLyBib3R0b20gZmFjZXNcbiAgICAgICAgICAgICAgICBbYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAyLCBib3R0b21Gcm9udExlZnRJbmRleCwgYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAzXSwgW2JvdHRvbUZyb250TGVmdEluZGV4ICsgMywgYm90dG9tRnJvbnRMZWZ0SW5kZXgsIGJvdHRvbUZyb250TGVmdEluZGV4ICsgMV0pO1xuICAgICAgICAgICAgICAgIChfYyA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5wdXNoKFtpICogNCwgYm90dG9tRnJvbnRMZWZ0SW5kZXhdLCBbaSAqIDQgKyAxLCBib3R0b21Gcm9udExlZnRJbmRleCArIDFdLCBbYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAzLCBib3R0b21Gcm9udExlZnRJbmRleF0pO1xuICAgICAgICAgICAgICAgIGlmIChpIDwgc3RlcENvdW50IC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAoX2QgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QucHVzaChbYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAxLCBib3R0b21Gcm9udExlZnRJbmRleF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgICAgICAgICAvLyBib3R0b20gZmFjZXNcbiAgICAgICAgICAgICAgICBbaSAqIDQsIGJvdHRvbUZyb250TGVmdEluZGV4LCBpICogNCArIDFdLCBbaSAqIDQgKyAxLCBib3R0b21Gcm9udExlZnRJbmRleCwgYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAxXSk7XG4gICAgICAgICAgICAgICAgKF9lID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lLnB1c2goW2kgKiA0ICsgMSwgYm90dG9tRnJvbnRMZWZ0SW5kZXhdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGJvdHRvbUJhY2tMZWZ0SW5kZXggPSA0ICogc3RlcENvdW50ICsgMiArIDIgKiAoc3RlcENvdW50IC0gaSAtIDEpO1xuICAgICAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAgICAgLy8gc2lkZSBmYWNlcyAobWlkZGxlKVxuICAgICAgICAgICAgW2kgKiA0LCAoaSArIDEpICogNCwgYm90dG9tQmFja0xlZnRJbmRleF0sIFsoaSArIDEpICogNCArIDEsIGkgKiA0ICsgMSwgYm90dG9tQmFja0xlZnRJbmRleCArIDFdLCBcbiAgICAgICAgICAgIC8vIGJvdHRvbSBmYWNlc1xuICAgICAgICAgICAgW2JvdHRvbUJhY2tMZWZ0SW5kZXgsIGJvdHRvbUJhY2tMZWZ0SW5kZXggLSAyLCBib3R0b21CYWNrTGVmdEluZGV4ICsgMV0sIFtib3R0b21CYWNrTGVmdEluZGV4ICsgMSwgYm90dG9tQmFja0xlZnRJbmRleCAtIDIsIGJvdHRvbUJhY2tMZWZ0SW5kZXggLSAxXSk7XG4gICAgICAgICAgICAoX2YgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2YucHVzaChbYm90dG9tQmFja0xlZnRJbmRleCArIDEsIGJvdHRvbUJhY2tMZWZ0SW5kZXggLSAyXSk7XG4gICAgICAgICAgICBpZiAoaSA8IHN0ZXBDb3VudCAtIDEpIHtcbiAgICAgICAgICAgICAgICAoX2cgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2cucHVzaChbKGkgKyAxKSAqIDQsIGJvdHRvbUJhY2tMZWZ0SW5kZXhdLCBbKGkgKyAxKSAqIDQgKyAxLCBib3R0b21CYWNrTGVmdEluZGV4ICsgMV0pO1xuICAgICAgICAgICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgICAgICAgICAvLyBzaWRlIGZhY2VzIChib3R0b20pXG4gICAgICAgICAgICAgICAgWyhpICsgMSkgKiA0LCBib3R0b21CYWNrTGVmdEluZGV4IC0gMiwgYm90dG9tQmFja0xlZnRJbmRleF0sIFtib3R0b21CYWNrTGVmdEluZGV4IC0gMSwgKGkgKyAxKSAqIDQgKyAxLCBib3R0b21CYWNrTGVmdEluZGV4ICsgMV0pO1xuICAgICAgICAgICAgICAgIChfaCA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9oID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfaC5wdXNoKFsoaSArIDEpICogNCwgYm90dG9tQmFja0xlZnRJbmRleCAtIDJdLCBbKGkgKyAxKSAqIDQgKyAxLCBib3R0b21CYWNrTGVmdEluZGV4IC0gMV0sIFtib3R0b21CYWNrTGVmdEluZGV4ICsgMSwgYm90dG9tQmFja0xlZnRJbmRleCAtIDJdKTtcbiAgICAgICAgICAgICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgKF9qID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2ogPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9qLnB1c2goW2JvdHRvbUJhY2tMZWZ0SW5kZXggKyAxLCBib3R0b21CYWNrTGVmdEluZGV4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlmICh1cHdhcmQpIHtcbiAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAvLyBib3R0b20gZmFjZXNcbiAgICAgICAgLy8gW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIDEsIDBdLFxuICAgICAgICAvLyBbdmVydGljZXMubGVuZ3RoIC0gMSwgMCwgdmVydGljZXMubGVuZ3RoIC0gMl0sXG4gICAgICAgIC8vIOWJjeS+p+mdolxuICAgICAgICBbc3RlcENvdW50ICogNCwgc3RlcENvdW50ICogNCArIDEsIHN0ZXBDb3VudCAqIDQgKyAyXSwgW3N0ZXBDb3VudCAqIDQgKyAxLCBzdGVwQ291bnQgKiA0ICsgMywgc3RlcENvdW50ICogNCArIDJdKTtcbiAgICAgICAgKF9rID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2sgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9rLnB1c2goXG4gICAgICAgIC8vIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCAwXSxcbiAgICAgICAgW3N0ZXBDb3VudCAqIDQgKyAxLCBzdGVwQ291bnQgKiA0ICsgMl0pO1xuICAgICAgICAvLyBpZiAoc3RlcENvdW50ID4gMSkge1xuICAgICAgICAvLyAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAvLyAgICAgICAgIC8vIHNpZGUgYm90dG9tIGZhY2VzXG4gICAgICAgIC8vICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIHZlcnRpY2VzLmxlbmd0aCAtIDEwLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSxcbiAgICAgICAgLy8gICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gMSwgdmVydGljZXMubGVuZ3RoIC0gMywgdmVydGljZXMubGVuZ3RoIC0gOV0sXG4gICAgICAgIC8vICAgICAgICAgLy8gYm90dG9tIGZhY2VzXG4gICAgICAgIC8vICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLFxuICAgICAgICAvLyAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSA1LCB2ZXJ0aWNlcy5sZW5ndGggLSA0LCB2ZXJ0aWNlcy5sZW5ndGggLSA2XSxcbiAgICAgICAgLy8gICAgICk7XG4gICAgICAgIC8vICAgICBzdGFpck1lc2guc29mdEVkZ2VzPy5wdXNoKFxuICAgICAgICAvLyAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSA1LCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSxcbiAgICAgICAgLy8gICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gMiwgdmVydGljZXMubGVuZ3RoIC0gMTBdLFxuICAgICAgICAvLyAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSAxMCwgdmVydGljZXMubGVuZ3RoIC0gNF0sXG4gICAgICAgIC8vICAgICApO1xuICAgICAgICAvLyB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXG4gICAgICAgIC8vIOWQjuS+p+mdolxuICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gMSwgMSwgMF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCAwLCB2ZXJ0aWNlcy5sZW5ndGggLSAyXSk7XG4gICAgICAgIChfbCA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9sID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfbC5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCAwXSk7XG4gICAgICAgIC8vIGlmIChzdGVwQ291bnQgPiAxKSB7XG4gICAgICAgIC8vICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXG4gICAgICAgIC8vICAgICAgICAgLy8gc2lkZSBib3R0b20gZmFjZXNcbiAgICAgICAgLy8gICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gMiwgMCwgdmVydGljZXMubGVuZ3RoIC0gNF0sXG4gICAgICAgIC8vICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIHZlcnRpY2VzLmxlbmd0aCAtIDMsIDFdLFxuICAgICAgICAvLyAgICAgICAgIC8vIGJvdHRvbSBmYWNlc1xuICAgICAgICAvLyAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSA1LCB2ZXJ0aWNlcy5sZW5ndGggLSA0LCB2ZXJ0aWNlcy5sZW5ndGggLSAzXSxcbiAgICAgICAgLy8gICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gNSwgdmVydGljZXMubGVuZ3RoIC0gNiwgdmVydGljZXMubGVuZ3RoIC0gNF0sXG4gICAgICAgIC8vICAgICApO1xuICAgICAgICAvLyAgICAgc3RhaXJNZXNoLnNvZnRFZGdlcz8ucHVzaChcbiAgICAgICAgLy8gICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gNSwgdmVydGljZXMubGVuZ3RoIC0gNF0sXG4gICAgICAgIC8vICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDMsIDFdLFxuICAgICAgICAvLyAgICAgICAgIFswLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSxcbiAgICAgICAgLy8gICAgICk7XG4gICAgICAgIC8vIH1cbiAgICB9XG4gICAgaWYgKGNvcm5lclZlcnRpY2VzLmxlbmd0aCA9PT0gNikge1xuICAgICAgICBnZW5lcmF0ZVBvbHlnb25NZXNoKGNvcm5lclZlcnRpY2VzLCBzdGFpck1lc2gpO1xuICAgIH1cbiAgICBzZWdtZW50Lm1lc2ggPSBzdGFpck1lc2g7XG59XG5mdW5jdGlvbiBnZW5lcmF0ZVN0cmFpZ2h0U3RhaXJNZXNoKHNlZ21lbnQpIHtcbiAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oLCBfaiwgX2s7XG4gICAgY29uc3QgeyBzdGFydExvY2tlZCwgc3RhaXJTaGFwZTogeyB2ZXJ0aWNlcywgc3RlcENvdW50IH0sIGNvcm5lclNoYXBlOiB7IHZlcnRpY2VzOiBjb3JuZXJWZXJ0aWNlcyB9LCBwYXJhbTogeyB1cHdhcmQgfSB9ID0gc2VnbWVudDtcbiAgICBpZiAoc3RlcENvdW50IDwgMSB8fCAhc3RhcnRMb2NrZWQpXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgY29uc3Qgc3RhaXJNZXNoID0ge1xuICAgICAgICB2ZXJ0aWNlczogdmVydGljZXMubWFwKHZlcnRleCA9PiBbdmVydGV4LngsIHZlcnRleC55LCB2ZXJ0ZXguel0pLFxuICAgICAgICB0cmlhbmdsZUluZGljZXM6IFtdLFxuICAgICAgICBzb2Z0RWRnZXM6IFtdLFxuICAgIH07XG4gICAgY29uc3QgbGVmdEluZGV4ID0gdmVydGljZXMubGVuZ3RoIC0gKCghdXB3YXJkICYmIHN0ZXBDb3VudCA+IDEpID8gNCA6IDIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RlcENvdW50OyBpKyspIHtcbiAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAvLyBzdGFpciBmYWNlc1xuICAgICAgICBbaSAqIDQsIGkgKiA0ICsgMSwgaSAqIDQgKyAyXSwgW2kgKiA0ICsgMSwgaSAqIDQgKyAzLCBpICogNCArIDJdLCBbaSAqIDQgKyAyLCBpICogNCArIDMsIGkgKiA0ICsgNF0sIFtpICogNCArIDMsIGkgKiA0ICsgNSwgaSAqIDQgKyA0XSwgXG4gICAgICAgIC8vIHNpZGUgZmFjZXNcbiAgICAgICAgW2kgKiA0LCBpICogNCArIDIsIChpICsgMSkgKiA0XSwgW2kgKiA0ICsgMSwgKGkgKyAxKSAqIDQgKyAxLCBpICogNCArIDNdKTtcbiAgICAgICAgKF9hID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnB1c2goW2kgKiA0ICsgMSwgaSAqIDQgKyAyXSwgW2kgKiA0ICsgMywgaSAqIDQgKyA0XSwgW2kgKiA0LCAoaSArIDEpICogNF0sIFsoaSArIDEpICogNCArIDEsIGkgKiA0ICsgMV0pO1xuICAgICAgICBpZiAoaSA9PT0gc3RlcENvdW50IC0gMSAmJiB1cHdhcmQgJiYgc3RlcENvdW50ID4gMSkge1xuICAgICAgICAgICAgY29uc3QgYmJMZWZ0SW5kZXggPSB2ZXJ0aWNlcy5sZW5ndGggLSA0O1xuICAgICAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAgICAgLy8gdGFpbCBzaWRlIGZhY2VzXG4gICAgICAgICAgICBbYmJMZWZ0SW5kZXgsIGkgKiA0LCAoaSArIDEpICogNF0sIFtiYkxlZnRJbmRleCArIDEsIChpICsgMSkgKiA0ICsgMSwgaSAqIDQgKyAxXSk7XG4gICAgICAgICAgICAoX2IgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IucHVzaChbYmJMZWZ0SW5kZXgsIGkgKiA0XSwgXG4gICAgICAgICAgICAvLyBbaSAqIDQsIChpICsgMSkgKiA0XSxcbiAgICAgICAgICAgIFtiYkxlZnRJbmRleCArIDEsIGkgKiA0ICsgMV0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAgICAgLy8gc2lkZSBmYWNlc1xuICAgICAgICAgICAgW2xlZnRJbmRleCwgaSAqIDQsIChpICsgMSkgKiA0XSwgW2xlZnRJbmRleCArIDEsIChpICsgMSkgKiA0ICsgMSwgaSAqIDQgKyAxXSk7XG4gICAgICAgICAgICAvLyBzdGFpck1lc2guc29mdEVkZ2VzPy5wdXNoKFxuICAgICAgICAgICAgLy8gICAgIFtpICogNCwgKGkgKyAxKSAqIDRdLFxuICAgICAgICAgICAgLy8gICAgIFsoaSArIDEpICogNCArIDEsIGkgKiA0ICsgMV0sXG4gICAgICAgICAgICAvLyApO1xuICAgICAgICAgICAgaWYgKHVwd2FyZCkge1xuICAgICAgICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAoX2MgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MucHVzaChbbGVmdEluZGV4LCBpICogNF0sIFtsZWZ0SW5kZXggKyAxLCBpICogNCArIDFdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN0ZXBDb3VudCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgKF9kID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLnB1c2goW2xlZnRJbmRleCwgKGkgKyAxKSAqIDRdLCBbbGVmdEluZGV4ICsgMSwgKGkgKyAxKSAqIDQgKyAxXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0ZXBDb3VudCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgKF9lID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lLnB1c2goW2xlZnRJbmRleCwgaSAqIDRdLCBbbGVmdEluZGV4ICsgMSwgaSAqIDQgKyAxXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpIDwgc3RlcENvdW50IC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAoX2YgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2YucHVzaChbbGVmdEluZGV4LCAoaSArIDEpICogNF0sIFtsZWZ0SW5kZXggKyAxLCAoaSArIDEpICogNCArIDFdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHVwd2FyZCkge1xuICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXG4gICAgICAgIC8vIGJvdHRvbSBmYWNlc1xuICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gMSwgMSwgMF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCAwLCB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDEsIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbdmVydGljZXMubGVuZ3RoIC0gMywgdmVydGljZXMubGVuZ3RoIC0gMiwgdmVydGljZXMubGVuZ3RoIC0gNF0pO1xuICAgICAgICAoX2cgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2cucHVzaChbdmVydGljZXMubGVuZ3RoIC0gMSwgMF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAzLCB2ZXJ0aWNlcy5sZW5ndGggLSAyXSk7XG4gICAgICAgIGlmIChzdGVwQ291bnQgPiAxKSB7XG4gICAgICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXG4gICAgICAgICAgICAvLyBzaWRlIGJvdHRvbSBmYWNlc1xuICAgICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIHZlcnRpY2VzLmxlbmd0aCAtIDEwLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIHZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDldLCBcbiAgICAgICAgICAgIC8vIGJvdHRvbSBmYWNlc1xuICAgICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLCBbdmVydGljZXMubGVuZ3RoIC0gNSwgdmVydGljZXMubGVuZ3RoIC0gNCwgdmVydGljZXMubGVuZ3RoIC0gNl0pO1xuICAgICAgICAgICAgKF9oID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9oLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLCBbdmVydGljZXMubGVuZ3RoIC0gMiwgdmVydGljZXMubGVuZ3RoIC0gMTBdLCBbdmVydGljZXMubGVuZ3RoIC0gMTAsIHZlcnRpY2VzLmxlbmd0aCAtIDRdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAvLyBib3R0b20gZmFjZXNcbiAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIDAsIDFdLCBbdmVydGljZXMubGVuZ3RoIC0gMSwgdmVydGljZXMubGVuZ3RoIC0gMiwgMF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAzLCB2ZXJ0aWNlcy5sZW5ndGggLSAyLCB2ZXJ0aWNlcy5sZW5ndGggLSAxXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDQsIHZlcnRpY2VzLmxlbmd0aCAtIDJdKTtcbiAgICAgICAgKF9qID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2ogPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9qLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIDBdLCBbdmVydGljZXMubGVuZ3RoIC0gMywgdmVydGljZXMubGVuZ3RoIC0gMl0pO1xuICAgICAgICBpZiAoc3RlcENvdW50ID4gMSkge1xuICAgICAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAgICAgLy8gc2lkZSBib3R0b20gZmFjZXNcbiAgICAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSAyLCAwLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIHZlcnRpY2VzLmxlbmd0aCAtIDMsIDFdLCBcbiAgICAgICAgICAgIC8vIGJvdHRvbSBmYWNlc1xuICAgICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDQsIHZlcnRpY2VzLmxlbmd0aCAtIDNdLCBbdmVydGljZXMubGVuZ3RoIC0gNSwgdmVydGljZXMubGVuZ3RoIC0gNiwgdmVydGljZXMubGVuZ3RoIC0gNF0pO1xuICAgICAgICAgICAgKF9rID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2sgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9rLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLCBbdmVydGljZXMubGVuZ3RoIC0gMywgMV0sIFswLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNvcm5lclZlcnRpY2VzLmxlbmd0aCA9PT0gNikge1xuICAgICAgICBnZW5lcmF0ZVBvbHlnb25NZXNoKGNvcm5lclZlcnRpY2VzLCBzdGFpck1lc2gpO1xuICAgIH1cbiAgICBzZWdtZW50Lm1lc2ggPSBzdGFpck1lc2g7XG59XG5mdW5jdGlvbiBnZW5lcmF0ZVBsYXRmb3JtTWVzaChzZWdtZW50KSB7XG4gICAgY29uc3QgeyBzdGFpclNoYXBlOiB7IHZlcnRpY2VzIH0gfSA9IHNlZ21lbnQ7XG4gICAgLy8gaWYgKGVuZExvY2tlZCkge1xuICAgIGNvbnN0IHZlcnRleExlbmd0aCA9IHZlcnRpY2VzLmxlbmd0aCAvIDI7XG4gICAgaWYgKHZlcnRleExlbmd0aCA9PT0gNCB8fCB2ZXJ0ZXhMZW5ndGggPT09IDUpIHtcbiAgICAgICAgY29uc3QgcGxhdGZvcm1NZXNoID0ge1xuICAgICAgICAgICAgdmVydGljZXM6IFtdLFxuICAgICAgICAgICAgdHJpYW5nbGVJbmRpY2VzOiBbXSxcbiAgICAgICAgICAgIHNvZnRFZGdlczogW10sXG4gICAgICAgIH07XG4gICAgICAgIGdlbmVyYXRlUG9seWdvbk1lc2godmVydGljZXMsIHBsYXRmb3JtTWVzaCk7XG4gICAgICAgIHNlZ21lbnQubWVzaCA9IHBsYXRmb3JtTWVzaDtcbiAgICB9XG4gICAgLy8gfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG5mdW5jdGlvbiBnZW5lcmF0ZVBvbHlnb25NZXNoKHZlcnRpY2VzLCBtZXNoKSB7XG4gICAgdmFyIF9hLCBfYjtcbiAgICBjb25zdCB2ZXJ0ZXhMZW5ndGggPSBtZXNoLnZlcnRpY2VzLmxlbmd0aDtcbiAgICBtZXNoLnZlcnRpY2VzLnB1c2goLi4udmVydGljZXMubWFwKHZlcnRleCA9PiBbdmVydGV4LngsIHZlcnRleC55LCB2ZXJ0ZXguel0pKTtcbiAgICBjb25zdCBzZWdDb3VudCA9IHZlcnRpY2VzLmxlbmd0aCAvIDI7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWdDb3VudDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHJpZ2h0ID0gaSA9PT0gc2VnQ291bnQgLSAxID8gMCA6IGkgKyAxO1xuICAgICAgICBjb25zdCBib3R0b21SaWdodCA9IGkgPT09IHNlZ0NvdW50IC0gMSA/IHNlZ0NvdW50IDogaSArIHNlZ0NvdW50ICsgMTtcbiAgICAgICAgbWVzaC50cmlhbmdsZUluZGljZXMucHVzaChbaSArIHZlcnRleExlbmd0aCwgaSArIHNlZ0NvdW50ICsgdmVydGV4TGVuZ3RoLCBib3R0b21SaWdodCArIHZlcnRleExlbmd0aF0sIFtpICsgdmVydGV4TGVuZ3RoLCBib3R0b21SaWdodCArIHZlcnRleExlbmd0aCwgcmlnaHQgKyB2ZXJ0ZXhMZW5ndGhdKTtcbiAgICAgICAgKF9hID0gbWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wdXNoKFtpICsgdmVydGV4TGVuZ3RoLCBib3R0b21SaWdodCArIHZlcnRleExlbmd0aF0pO1xuICAgICAgICBpZiAoaSA+IDAgJiYgaSA8IHNlZ0NvdW50IC0gMSkge1xuICAgICAgICAgICAgbWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgICAgIC8vIHRvcCBhbmQgYm90dG9tXG4gICAgICAgICAgICBbaSArIHZlcnRleExlbmd0aCwgcmlnaHQgKyB2ZXJ0ZXhMZW5ndGgsIDAgKyB2ZXJ0ZXhMZW5ndGhdLCBbYm90dG9tUmlnaHQgKyB2ZXJ0ZXhMZW5ndGgsIGkgKyBzZWdDb3VudCArIHZlcnRleExlbmd0aCwgc2VnQ291bnQgKyB2ZXJ0ZXhMZW5ndGhdKTtcbiAgICAgICAgICAgIGlmIChpID4gMSkge1xuICAgICAgICAgICAgICAgIChfYiA9IG1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IucHVzaChbaSwgMCArIHZlcnRleExlbmd0aF0sIFtpICsgc2VnQ291bnQgKyB2ZXJ0ZXhMZW5ndGgsIHNlZ0NvdW50ICsgdmVydGV4TGVuZ3RoXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gYnVpbGRDb21wb25lbnRJbnN0YW5jZShzZWdtZW50LCBzZWdtZW50cykge1xuICAgIHZhciBfYSwgX2I7XG4gICAgY29uc3QgeyBzdGFydCwgZW5kLCBzdGFydEhlaWdodCwgZW5kSGVpZ2h0LCBiYXNlQ29tcG9uZW50LCBjaXJjbGVUYW5nZW50LCBwYXJhbSwgbWVzaCB9ID0gc2VnbWVudDtcbiAgICBjb25zdCBkZXNpZ24gPSBhcHAuZ2V0QWN0aXZlRGVzaWduKCk7XG4gICAgbGV0IG9wZXJhdGlvblN1Y2Nlc3MgPSB0cnVlO1xuICAgIGlmIChtZXNoID09PSBudWxsIHx8IG1lc2ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1lc2gudmVydGljZXMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IG5ld1NoZWxsID0gKF9hID0gZGVzaWduLmNyZWF0ZVNoZWxsRnJvbU1lc2gobWVzaCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5uZXdTaGVsbDtcbiAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgISFuZXdTaGVsbDtcbiAgICAgICAgaWYgKG5ld1NoZWxsKSB7XG4gICAgICAgICAgICAvLyBpZiAocGFyYW0udHlwZSAhPT0gQ29tcG9uZW50VHlwZS5DaXJjdWxhclN0YWlyKSB7XG4gICAgICAgICAgICAvLyAgICAgY29uc3Qgc29mdEVkZ2VzID0gbmV3U2hlbGwuZ2V0RWRnZXMoKS5maWx0ZXIoZSA9PiBlLmlzU29mdCgpKTtcbiAgICAgICAgICAgIC8vICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBkZXNpZ24ucmVtb3ZlRWRnZXMoc29mdEVkZ2VzKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICBjb25zdCBuZXdJbnN0YW5jZSA9IChfYiA9IGRlc2lnbi5tYWtlR3JvdXAobmV3U2hlbGwuZ2V0RmFjZXMoKSwgW10sIFtdKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmFkZGVkSW5zdGFuY2U7XG4gICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAhIW5ld0luc3RhbmNlO1xuICAgICAgICAgICAgY29uc3QgZ3JvdXBEZWYgPSBuZXdJbnN0YW5jZSA9PT0gbnVsbCB8fCBuZXdJbnN0YW5jZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogbmV3SW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCk7XG4gICAgICAgICAgICBpZiAobmV3SW5zdGFuY2UgJiYgZ3JvdXBEZWYpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXRlcmlhbE9iamVjdCA9IHBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gPyBQcmVzZXRNYXRlcmlhbHMuUGxhdGZvcm0gOiBQcmVzZXRNYXRlcmlhbHMuU3RhaXI7XG4gICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZGVzaWduLmFzc2lnbk1hdGVyaWFsRm9yRW50aXRpZXMoW25ld0luc3RhbmNlXSwgbWF0ZXJpYWxPYmplY3QubWF0ZXJpYWxJZCwgbWF0ZXJpYWxPYmplY3QuYmdJZCk7XG4gICAgICAgICAgICAgICAgLy8gb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZ3JvdXBEZWYuc2V0Q3VzdG9tUHJvcGVydHkoQ29tcG9uZW50SW5kZXhLZXksIGAke25ld0luc3RhbmNlcy5sZW5ndGh9YCkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgIC8vIG5ld0luc3RhbmNlcy5wdXNoKG5ld0luc3RhbmNlKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJhbVN0cmluZyA9IHN0cmluZ2lmeUNvbXBvbmVudFBhcmFtKHBhcmFtKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydEVuZFN0cmluZyA9IHN0cmluZ2lmeVN0YXJ0RW5kKEdlb21MaWIuY3JlYXRlUG9pbnQzZChzdGFydC54LCBzdGFydC55LCBzdGFydEhlaWdodCksIEdlb21MaWIuY3JlYXRlUG9pbnQzZChlbmQueCwgZW5kLnksIGVuZEhlaWdodCkpO1xuICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGdyb3VwRGVmLnNldEN1c3RvbVByb3BlcnR5KENvbXBvbmVudFBhcmFtS2V5LCBwYXJhbVN0cmluZykuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGdyb3VwRGVmLnNldEN1c3RvbVByb3BlcnR5KFN0YXJ0RW5kS2V5LCBzdGFydEVuZFN0cmluZykuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgIC8vIGlmIChiYXNlTGluZVNlZzNkKSB7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIGlmIChiYXNlQ29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IEJhc2VMaW5lU3RyaW5nID0gc3RyaW5naWZ5U3RhcnRFbmQoYmFzZUNvbXBvbmVudC5saW5lM2Quc3RhcnQsIGJhc2VDb21wb25lbnQubGluZTNkLmVuZCk7XG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGdyb3VwRGVmLnNldEN1c3RvbVByb3BlcnR5KEJhc2VMaW5lU2VnM2RLZXksIEJhc2VMaW5lU3RyaW5nKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgoc2VnbWVudHMsIGJhc2VDb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYmFzZVNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VDb21wb25lbnRTdHJpbmcgPSBzdHJpbmdpZnlCYXNlQ29tcG9uZW50KGJhc2VTZWdtZW50LCBiYXNlQ29tcG9uZW50LmxpbmUzZEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGdyb3VwRGVmLnNldEN1c3RvbVByb3BlcnR5KEJhc2VDb21wb25lbnRLZXksIGJhc2VDb21wb25lbnRTdHJpbmcpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY2lyY2xlVGFuZ2VudCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YW5nZW50U3RyaW5nID0gc3RyaW5naWZ5UG9pbnQzZChjaXJjbGVUYW5nZW50KTtcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZ3JvdXBEZWYuc2V0Q3VzdG9tUHJvcGVydHkoQ2lyY2xlVGFuZ2VudEtleSwgdGFuZ2VudFN0cmluZykuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3SW5zdGFuY2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBidWlsZEhhbmRyYWlsSW5zdGFuY2Uoc3RhaXJQYXJhbSwgaGFuZHJhaWxzKSB7XG4gICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3QgeyBoYW5kcmFpbDogeyBzdXBwb3J0LCBoZWlnaHQsIHJhaWw6IHsgdHlwZTogcmFpbFR5cGUsIHBhcmFtOiByYWlsUGFyYW0gfSwgY29sdW1uOiB7IHR5cGU6IGNvbHVtblR5cGUsIHBhcmFtOiBjb2x1bW5QYXJhbSB9IH0gfSA9IHN0YWlyUGFyYW07XG4gICAgICAgIGlmICghc3VwcG9ydCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNvbHVtbkZhY2U7XG4gICAgICAgIGlmIChjb2x1bW5UeXBlID09PSBDb2x1bW5UeXBlLkNpcmNsZSkge1xuICAgICAgICAgICAgY29sdW1uRmFjZSA9IGRyYXdDaXJjbGUoZHVtbXlQb2ludDNkLCBEaXJlY3Rpb25aLCBjb2x1bW5QYXJhbS5yYWRpdXMgfHwgRGVmYXVsdFN0YWlyUGFyYW0uaG9yaXpvbnRhbFN0ZXAgLyAxMCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29sdW1uVHlwZSA9PT0gQ29sdW1uVHlwZS5SZWN0KSB7XG4gICAgICAgICAgICBjb2x1bW5GYWNlID0gZHJhd1JlY3QoZHVtbXlQb2ludDNkLCBEaXJlY3Rpb25aLCBjb2x1bW5QYXJhbS53aWR0aCB8fCBEZWZhdWx0U3RhaXJQYXJhbS5ob3Jpem9udGFsU3RlcCAvIDEwLCBjb2x1bW5QYXJhbS5oZWlnaHQgfHwgRGVmYXVsdFN0YWlyUGFyYW0uaG9yaXpvbnRhbFN0ZXAgLyAxMCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb2x1bW5Mb29wID0gY29sdW1uRmFjZSA9PT0gbnVsbCB8fCBjb2x1bW5GYWNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb2x1bW5GYWNlLmdldE91dGVyTG9vcCgpO1xuICAgICAgICBpZiAoIWNvbHVtbkZhY2UgfHwgIWNvbHVtbkxvb3ApIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYWN0aXZlRGVzaWduID0gYXBwLmdldEFjdGl2ZURlc2lnbigpO1xuICAgICAgICBjb25zdCBoYW5kcmFpbEluc3RhbmNlID0gKF9hID0gYWN0aXZlRGVzaWduLm1ha2VHcm91cChbY29sdW1uRmFjZV0sIFtdLCBbXSkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hZGRlZEluc3RhbmNlO1xuICAgICAgICBjb25zdCBoYW5kcmFpbERlZmluaXRpb24gPSBoYW5kcmFpbEluc3RhbmNlID09PSBudWxsIHx8IGhhbmRyYWlsSW5zdGFuY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGhhbmRyYWlsSW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCk7XG4gICAgICAgIGlmICghaGFuZHJhaWxJbnN0YW5jZSB8fCAhaGFuZHJhaWxEZWZpbml0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFjdGl2YXRlSW5zdGFuY2VSZXMgPSB5aWVsZCBhY3RpdmVEZXNpZ24uYWN0aXZhdGVHcm91cEluc3RhbmNlKGhhbmRyYWlsSW5zdGFuY2UpO1xuICAgICAgICBpZiAoIWFjdGl2YXRlSW5zdGFuY2VSZXMuaXNTdWNjZXNzKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbHVtbkF1eGlsaWFyeUJvdW5kZWRDdXJ2ZSA9IChfYiA9IGFjdGl2ZURlc2lnbi5hZGRBdXhpbGlhcnlCb3VuZGVkQ3VydmUoR2VvbUxpYi5jcmVhdGVMaW5lU2VnbWVudDNkKEdlb21MaWIuY3JlYXRlUG9pbnQzZCgwLCAwLCBoZWlnaHQpLCBkdW1teVBvaW50M2QpKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmFkZGVkQ3VydmU7XG4gICAgICAgIGlmICghY29sdW1uQXV4aWxpYXJ5Qm91bmRlZEN1cnZlKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN3ZWVwQ29sdW1uUmVzID0gYWN0aXZlRGVzaWduLnN3ZWVwRm9sbG93Q3VydmVzKGNvbHVtbkxvb3AsIFtjb2x1bW5BdXhpbGlhcnlCb3VuZGVkQ3VydmVdKTtcbiAgICAgICAgaWYgKCFzd2VlcENvbHVtblJlcy5pc1N1Y2Nlc3MgfHwgIXN3ZWVwQ29sdW1uUmVzLmFkZGVkU2hlbGxzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb2x1bW5PcmlnaW5GYWNlcyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGNvbHVtbk9yaWdpblNoZWxsIG9mIHN3ZWVwQ29sdW1uUmVzLmFkZGVkU2hlbGxzKSB7XG4gICAgICAgICAgICBjb25zdCBjb2x1bW5GYWNlcyA9IGNvbHVtbk9yaWdpblNoZWxsLmdldEZhY2VzKCk7XG4gICAgICAgICAgICBjb2x1bW5PcmlnaW5GYWNlcy5wdXNoKC4uLmNvbHVtbkZhY2VzKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb2x1bW5PcmlnaW5JbnN0YW5jZSA9IChfYyA9IGFjdGl2ZURlc2lnbi5tYWtlR3JvdXAoY29sdW1uT3JpZ2luRmFjZXMsIFtdLCBbXSkpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5hZGRlZEluc3RhbmNlO1xuICAgICAgICBpZiAoIWNvbHVtbk9yaWdpbkluc3RhbmNlKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbHVtbk1hdHJpeGVzID0gW107XG4gICAgICAgIGNvbnN0IHJhaWxJbnN0YW5jZXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBoYW5kcmFpbHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHsgcmFpbCwgY29sdW1ucyB9ID0gaGFuZHJhaWxzW2pdO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgLy8gZm9yIChjb25zdCB7IHJhaWwsIGNvbHVtbnMgfSBvZiBoYW5kcmFpbHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJhaWxCb3VuZGVkQ3VydmVzID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhaWwubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmFpbFBvaW50ID0gcmFpbFtpXTtcbiAgICAgICAgICAgICAgICBjb25zdCByYWlsTmV4dFBvaW50ID0gcmFpbFtpICsgMV07XG4gICAgICAgICAgICAgICAgcmFpbEJvdW5kZWRDdXJ2ZXMucHVzaCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFkZEF1eFJlcyA9IGFjdGl2ZURlc2lnbi5hZGRBdXhpbGlhcnlCb3VuZGVkQ3VydmUoR2VvbUxpYi5jcmVhdGVMaW5lU2VnbWVudDNkKHJhaWxQb2ludCwgcmFpbE5leHRQb2ludCkpO1xuICAgICAgICAgICAgICAgIGlmIChhZGRBdXhSZXMgPT09IG51bGwgfHwgYWRkQXV4UmVzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBhZGRBdXhSZXMuYWRkZWRDdXJ2ZSkge1xuICAgICAgICAgICAgICAgICAgICByYWlsQm91bmRlZEN1cnZlcy5wdXNoKGFkZEF1eFJlcy5hZGRlZEN1cnZlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJhaWxCb3VuZGVkQ3VydmVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhaWxTdGFydEN1cnZlID0gcmFpbEJvdW5kZWRDdXJ2ZXNbMF0uZ2V0Qm91bmRlZEN1cnZlKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmFpbFN0YXJ0UG9pbnQgPSAocmFpbFN0YXJ0Q3VydmUgPT09IG51bGwgfHwgcmFpbFN0YXJ0Q3VydmUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJhaWxTdGFydEN1cnZlLnN0YXJ0UG9pbnQpIHx8IGR1bW15UG9pbnQzZDtcbiAgICAgICAgICAgICAgICBjb25zdCByYWlsU3RhcnREaXIgPSAocmFpbFN0YXJ0Q3VydmUgPT09IG51bGwgfHwgcmFpbFN0YXJ0Q3VydmUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJhaWxTdGFydEN1cnZlLmVuZFBvaW50LnN1YnRyYWN0ZWQocmFpbFN0YXJ0UG9pbnQpKSB8fCBEaXJlY3Rpb25aO1xuICAgICAgICAgICAgICAgIGxldCByYWlsRmFjZTtcbiAgICAgICAgICAgICAgICBpZiAocmFpbFR5cGUgPT09IFJhaWxUeXBlLkNpcmNsZSkge1xuICAgICAgICAgICAgICAgICAgICByYWlsRmFjZSA9IGRyYXdDaXJjbGUocmFpbFN0YXJ0UG9pbnQsIHJhaWxTdGFydERpciwgcmFpbFBhcmFtLnJhZGl1cyB8fCBEZWZhdWx0U3RhaXJQYXJhbS5ob3Jpem9udGFsU3RlcCAvIDUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChyYWlsVHlwZSA9PT0gUmFpbFR5cGUuUmVjdCkge1xuICAgICAgICAgICAgICAgICAgICByYWlsRmFjZSA9IGRyYXdSZWN0KHJhaWxTdGFydFBvaW50LCByYWlsU3RhcnREaXIsIHJhaWxQYXJhbS53aWR0aCB8fCBEZWZhdWx0U3RhaXJQYXJhbS5ob3Jpem9udGFsU3RlcCAvIDUsIHJhaWxQYXJhbS5oZWlnaHQgfHwgRGVmYXVsdFN0YWlyUGFyYW0uaG9yaXpvbnRhbFN0ZXAgLyA1KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCByYWlsTG9vcCA9IHJhaWxGYWNlID09PSBudWxsIHx8IHJhaWxGYWNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiByYWlsRmFjZS5nZXRPdXRlckxvb3AoKTtcbiAgICAgICAgICAgICAgICBpZiAoIXJhaWxGYWNlIHx8ICFyYWlsTG9vcCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBzd2VlcFJhaWxSZXMgPSBhY3RpdmVEZXNpZ24uc3dlZXBGb2xsb3dDdXJ2ZXMocmFpbExvb3AsIHJhaWxCb3VuZGVkQ3VydmVzKTtcbiAgICAgICAgICAgICAgICBpZiAoIXN3ZWVwUmFpbFJlcy5pc1N1Y2Nlc3MgfHwgIXN3ZWVwUmFpbFJlcy5hZGRlZFNoZWxscy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcmFpbEZhY2VzID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCByYWlsU2hlbGwgb2Ygc3dlZXBSYWlsUmVzLmFkZGVkU2hlbGxzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJhaWxTaGVsbEZhY2VzID0gcmFpbFNoZWxsLmdldEZhY2VzKCk7XG4gICAgICAgICAgICAgICAgICAgIHJhaWxGYWNlcy5wdXNoKC4uLnJhaWxTaGVsbEZhY2VzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcmFpbE1ha2VHcm91cFJlcyA9IGFjdGl2ZURlc2lnbi5tYWtlR3JvdXAocmFpbEZhY2VzLCBbXSwgcmFpbEJvdW5kZWRDdXJ2ZXMpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhaWxHcm91cERlZiA9IHJhaWxNYWtlR3JvdXBSZXMgPT09IG51bGwgfHwgcmFpbE1ha2VHcm91cFJlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmFpbE1ha2VHcm91cFJlcy5hZGRlZEluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmICghKHJhaWxNYWtlR3JvdXBSZXMgPT09IG51bGwgfHwgcmFpbE1ha2VHcm91cFJlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmFpbE1ha2VHcm91cFJlcy5hZGRlZEluc3RhbmNlKSB8fCAhcmFpbEdyb3VwRGVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHJhaWxQcm9wZXJ0eVJlcyA9IHJhaWxHcm91cERlZi5zZXRDdXN0b21Qcm9wZXJ0eShSYWlsTW9kZWxLZXksIE1vZGVsVmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmICghcmFpbFByb3BlcnR5UmVzLmlzU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByYWlsSW5zdGFuY2VzLnB1c2gocmFpbE1ha2VHcm91cFJlcy5hZGRlZEluc3RhbmNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgY29sdW1uIG9mIGNvbHVtbnMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2x1bW5TY2FsZU1hdCA9IEdlb21MaWIuY3JlYXRlU2NhbGVNYXRyaXg0KDEsIDEsIChjb2x1bW5bMV0ueiAtIGNvbHVtblswXS56KSAvIGhlaWdodCk7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sdW1uVHJhbnNsYXRlTWF0ID0gR2VvbUxpYi5jcmVhdGVUcmFuc2xhdGlvbk1hdHJpeDQoY29sdW1uWzBdLngsIGNvbHVtblswXS55LCBjb2x1bW5bMF0ueik7XG4gICAgICAgICAgICAgICAgY29sdW1uTWF0cml4ZXMucHVzaChjb2x1bW5UcmFuc2xhdGVNYXQubXVsdGlwbGllZChjb2x1bW5TY2FsZU1hdCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChyYWlsSW5zdGFuY2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgYXNzaWduUmFpbE1hdGVyaWFsUmVzID0gYWN0aXZlRGVzaWduLmFzc2lnbk1hdGVyaWFsRm9yRW50aXRpZXMocmFpbEluc3RhbmNlcywgUHJlc2V0TWF0ZXJpYWxzLkhhbmRyYWlsLnJhaWwubWF0ZXJpYWxJZCwgUHJlc2V0TWF0ZXJpYWxzLkhhbmRyYWlsLnJhaWwuYmdJZCk7XG4gICAgICAgICAgICBpZiAoIWFzc2lnblJhaWxNYXRlcmlhbFJlcykge1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29sdW1uSW5zdGFuY2VzID0gW107XG4gICAgICAgIGlmIChjb2x1bW5NYXRyaXhlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbkNvcHlSZXMgPSBhY3RpdmVEZXNpZ24uYnVsa0NvcHlHcm91cEluc3RhbmNlcyhbY29sdW1uT3JpZ2luSW5zdGFuY2VdLCBbY29sdW1uTWF0cml4ZXNdKTtcbiAgICAgICAgICAgIGlmICghKGNvbHVtbkNvcHlSZXMgPT09IG51bGwgfHwgY29sdW1uQ29weVJlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29sdW1uQ29weVJlcy5hZGRlZEluc3RhbmNlcy5sZW5ndGgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbHVtbkluc3RhbmNlcy5wdXNoKC4uLmNvbHVtbkNvcHlSZXMuYWRkZWRJbnN0YW5jZXMpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBjb2x1bW5JbnN0YW5jZSBvZiBjb2x1bW5Db3B5UmVzLmFkZGVkSW5zdGFuY2VzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sdW1uR3JvdXBEZWYgPSBjb2x1bW5JbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAoIWNvbHVtbkdyb3VwRGVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbHVtblByb3BlcnR5UmVzID0gY29sdW1uR3JvdXBEZWYuc2V0Q3VzdG9tUHJvcGVydHkoQ29sdW1uTW9kZWxLZXksIE1vZGVsVmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmICghY29sdW1uUHJvcGVydHlSZXMuaXNTdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgYXNzaWduQ29sdW1uTWF0ZXJpYWxSZXMgPSBhY3RpdmVEZXNpZ24uYXNzaWduTWF0ZXJpYWxGb3JFbnRpdGllcyhjb2x1bW5Db3B5UmVzLmFkZGVkSW5zdGFuY2VzLCBQcmVzZXRNYXRlcmlhbHMuSGFuZHJhaWwuY29sdW1uLm1hdGVyaWFsSWQsIFByZXNldE1hdGVyaWFscy5IYW5kcmFpbC5jb2x1bW4uYmdJZCk7XG4gICAgICAgICAgICBpZiAoIWFzc2lnbkNvbHVtbk1hdGVyaWFsUmVzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZW1vdmVPcmlnaW5Db2x1bW5SZXMgPSBhY3RpdmVEZXNpZ24ucmVtb3ZlR3JvdXBJbnN0YW5jZShjb2x1bW5PcmlnaW5JbnN0YW5jZSk7XG4gICAgICAgIGlmICghcmVtb3ZlT3JpZ2luQ29sdW1uUmVzLmlzU3VjY2Vzcykge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZW1vdmVPcmlnaW5Db2x1bW5BdXhDdXJ2ZVJlcyA9IGFjdGl2ZURlc2lnbi5yZW1vdmVBdXhpbGlhcnlDdXJ2ZShjb2x1bW5BdXhpbGlhcnlCb3VuZGVkQ3VydmUpO1xuICAgICAgICBpZiAoIXJlbW92ZU9yaWdpbkNvbHVtbkF1eEN1cnZlUmVzLmlzU3VjY2Vzcykge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICAvLyB0byByZW1vdmUgYWxsIGF1eGlsaWFyeUN1cnZlc1xuICAgICAgICBjb25zdCBkZWFjdGl2YXRlSW5zdGFuY2VSZXMgPSB5aWVsZCBhY3RpdmVEZXNpZ24uZGVhY3RpdmF0ZUdyb3VwSW5zdGFuY2UoKTtcbiAgICAgICAgaWYgKCFkZWFjdGl2YXRlSW5zdGFuY2VSZXMuaXNTdWNjZXNzKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNldFByb3BlcnR5UmVzID0gaGFuZHJhaWxEZWZpbml0aW9uLnNldEN1c3RvbVByb3BlcnR5KEhhbmRyYWlsTW9kZWxLZXksIE1vZGVsVmFsdWUpO1xuICAgICAgICBpZiAoIXNldFByb3BlcnR5UmVzLmlzU3VjY2Vzcykge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaGFuZHJhaWxJbnN0YW5jZTogeyBpbnN0YW5jZTogaGFuZHJhaWxJbnN0YW5jZSwgaW5zdGFuY2VLZXk6IGhhbmRyYWlsSW5zdGFuY2UuZ2V0S2V5KCksIGRlZmluaXRpb25LZXk6IGhhbmRyYWlsRGVmaW5pdGlvbi5nZXRLZXkoKSB9LFxuICAgICAgICAgICAgcmFpbEluc3RhbmNlczogcmFpbEluc3RhbmNlcy5tYXAoaW5zdGFuY2UgPT4geyB2YXIgX2E7IHJldHVybiAoeyBpbnN0YW5jZSwgaW5zdGFuY2VLZXk6IGluc3RhbmNlLmdldEtleSgpLCBkZWZpbml0aW9uS2V5OiAoKF9hID0gaW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5nZXRLZXkoKSkgfHwgJycgfSk7IH0pLFxuICAgICAgICAgICAgY29sdW1uSW5zdGFuY2VzOiBjb2x1bW5JbnN0YW5jZXMubWFwKGluc3RhbmNlID0+IHsgdmFyIF9hOyByZXR1cm4gKHsgaW5zdGFuY2UsIGluc3RhbmNlS2V5OiBpbnN0YW5jZS5nZXRLZXkoKSwgZGVmaW5pdGlvbktleTogKChfYSA9IGluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZ2V0S2V5KCkpIHx8ICcnIH0pOyB9KSxcbiAgICAgICAgfTtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkcmF3Q2lyY2xlKGNlbnRlciwgbm9ybWFsLCByYWRpdXMpIHtcbiAgICBjb25zdCBhY3RpdmVEZXNpZ24gPSBhcHAuZ2V0QWN0aXZlRGVzaWduKCk7XG4gICAgY29uc3QgcmVzID0gYWN0aXZlRGVzaWduLmFkZENpcmNsZShHZW9tTGliLmNyZWF0ZUNpcmNsZTNkQnlDZW50ZXJOb3JtYWxSYWRpdXMoY2VudGVyLCBub3JtYWwsIHJhZGl1cykpO1xuICAgIGlmIChyZXMgPT09IG51bGwgfHwgcmVzID09PSB2b2lkIDAgPyB2b2lkIDAgOiByZXMuYWRkZWRFZGdlcy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3Qgc2hlbGwgPSByZXMuYWRkZWRFZGdlc1swXS5nZXRTaGVsbCgpO1xuICAgICAgICBjb25zdCBmYWNlcyA9IHNoZWxsID09PSBudWxsIHx8IHNoZWxsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzaGVsbC5nZXRGYWNlcygpO1xuICAgICAgICBpZiAoKGZhY2VzID09PSBudWxsIHx8IGZhY2VzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBmYWNlcy5sZW5ndGgpID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFjZXNbMF07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkcmF3UmVjdChjZW50ZXIsIG5vcm1hbCwgd2lkdGgsIGhlaWdodCwgeiA9IDAsIHdpdGhDb3JuZXIgPSB0cnVlKSB7XG4gICAgY29uc3QgcG9pbnQxID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKDAsIDAsIHopO1xuICAgIGNvbnN0IHBvaW50MiA9IEdlb21MaWIuY3JlYXRlUG9pbnQzZCh3aWR0aCwgMCwgeik7XG4gICAgbGV0IHBvaW50cyA9IFtwb2ludDEsIHBvaW50Ml07XG4gICAgaWYgKHdpdGhDb3JuZXIpIHtcbiAgICAgICAgY29uc3QgcDUgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2Qod2lkdGgsIGhlaWdodCAvIDMgKiAyLCB6KTtcbiAgICAgICAgY29uc3QgcDYgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2Qod2lkdGggLyA0ICogMywgaGVpZ2h0LCB6KTtcbiAgICAgICAgY29uc3QgbTEgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QoKHA1LnggKyBwNi54KSAvIDIsIChwNS55ICsgcDYueSkgLyAyLCB6KTtcbiAgICAgICAgY29uc3QgZGlyMSA9IHA2LnN1YnRyYWN0ZWQocDUpLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgY29uc3QgdG9DZW50ZXJEaXIxID0gRGlyZWN0aW9uWi5jcm9zcyhkaXIxKTtcbiAgICAgICAgY29uc3QgZDEgPSBwNS5kaXN0YW5jZVRvKHA2KTtcbiAgICAgICAgLy8gY29uc3QgcjEgPSBkMSAvIDIgLyBNYXRoLnNpbihNYXRoLlBJIC8gNik7XG4gICAgICAgIGNvbnN0IGgxID0gZDEgLyAyIC8gTWF0aC50YW4oTWF0aC5QSSAvIDYpO1xuICAgICAgICBjb25zdCBjZW50ZXIxID0gbTEuYWRkZWQodG9DZW50ZXJEaXIxLm11bHRpcGxpZWQoaDEpKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCByb3RhdGVNYXQgPSBHZW9tTGliLmNyZWF0ZVJvdGF0ZU1hdHJpeDQoaSAqIE1hdGguUEkgLyAzMCwgRGlyZWN0aW9uWiwgY2VudGVyMSk7XG4gICAgICAgICAgICBjb25zdCBkaXNjcmV0ZVBvaW50ID0gcDUuYXBwbGllZE1hdHJpeDQocm90YXRlTWF0KTtcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKGRpc2NyZXRlUG9pbnQpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHA3ID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKHdpZHRoIC8gNCwgaGVpZ2h0LCB6KTtcbiAgICAgICAgY29uc3QgcDggPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QoMCwgaGVpZ2h0IC8gMyAqIDIsIHopO1xuICAgICAgICBjb25zdCBtMiA9IEdlb21MaWIuY3JlYXRlUG9pbnQzZCgocDUueCArIHA2LngpIC8gMiwgKHA1LnkgKyBwNi55KSAvIDIsIHopO1xuICAgICAgICBjb25zdCBkaXIyID0gcDguc3VidHJhY3RlZChwNykubm9ybWFsaXplZCgpO1xuICAgICAgICBjb25zdCB0b0NlbnRlckRpcjIgPSBEaXJlY3Rpb25aLmNyb3NzKGRpcjIpO1xuICAgICAgICBjb25zdCBkMiA9IHA3LmRpc3RhbmNlVG8ocDgpO1xuICAgICAgICAvLyBjb25zdCByMiA9IGQyIC8gMiAvIE1hdGguc2luKE1hdGguUEkgLyA2KTtcbiAgICAgICAgY29uc3QgaDIgPSBkMiAvIDIgLyBNYXRoLnRhbihNYXRoLlBJIC8gNik7XG4gICAgICAgIGNvbnN0IGNlbnRlcjIgPSBtMi5hZGRlZCh0b0NlbnRlckRpcjIubXVsdGlwbGllZChoMikpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDExOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHJvdGF0ZU1hdCA9IEdlb21MaWIuY3JlYXRlUm90YXRlTWF0cml4NChpICogTWF0aC5QSSAvIDMwLCBEaXJlY3Rpb25aLCBjZW50ZXIyKTtcbiAgICAgICAgICAgIGNvbnN0IGRpc2NyZXRlUG9pbnQgPSBwNy5hcHBsaWVkTWF0cml4NChyb3RhdGVNYXQpO1xuICAgICAgICAgICAgcG9pbnRzLnB1c2goZGlzY3JldGVQb2ludCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IHBvaW50MyA9IEdlb21MaWIuY3JlYXRlUG9pbnQzZCh3aWR0aCwgaGVpZ2h0LCB6KTtcbiAgICAgICAgY29uc3QgcG9pbnQ0ID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKDAsIGhlaWdodCwgeik7XG4gICAgICAgIHBvaW50cy5wdXNoKHBvaW50MywgcG9pbnQ0KTtcbiAgICB9XG4gICAgY29uc3QgY29vcmRpbmF0ZSA9IGdldENvb3JkaW5hdGUobm9ybWFsKTtcbiAgICBjb25zdCBjb29yZGluYXRlTWF0ID0gR2VvbUxpYi5jcmVhdGVBbGlnbkNDU01hdHJpeDQoY29vcmRpbmF0ZS5keCwgY29vcmRpbmF0ZS5keSwgY29vcmRpbmF0ZS5keiwgY2VudGVyKTtcbiAgICBjb25zdCB0cmFuc2xhdGVNYXQxID0gR2VvbUxpYi5jcmVhdGVUcmFuc2xhdGlvbk1hdHJpeDQoLXdpZHRoIC8gMiwgLWhlaWdodCAvIDIsIDApO1xuICAgIC8vIGNvbnN0IHRyYW5zbGF0ZU1hdDIgPSBHZW9tTGliLmNyZWF0ZVRyYW5zbGF0aW9uTWF0cml4NChjZW50ZXIueCwgY2VudGVyLnksIGNlbnRlci56KTtcbiAgICBjb25zdCB0cmFuc2Zvcm1NYXQgPSBjb29yZGluYXRlTWF0Lm11bHRpcGxpZWQodHJhbnNsYXRlTWF0MSk7XG4gICAgcG9pbnRzID0gcG9pbnRzLm1hcChwID0+IHAuYXBwbGllZE1hdHJpeDQodHJhbnNmb3JtTWF0KSk7XG4gICAgY29uc3QgYWN0aXZlRGVzaWduID0gYXBwLmdldEFjdGl2ZURlc2lnbigpO1xuICAgIGNvbnN0IHJlcyA9IGFjdGl2ZURlc2lnbi5hZGRFZGdlcyhwb2ludHMpO1xuICAgIGlmIChyZXMgPT09IG51bGwgfHwgcmVzID09PSB2b2lkIDAgPyB2b2lkIDAgOiByZXMuYWRkZWRFZGdlcy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3Qgc2V0U29mdFJlc3VsdCA9IGFjdGl2ZURlc2lnbi5zZXRFZGdlc1NvZnQocmVzLmFkZGVkRWRnZXMsIHRydWUpO1xuICAgICAgICBpZiAoc2V0U29mdFJlc3VsdC5pc1N1Y2Nlc3MpIHtcbiAgICAgICAgICAgIGNvbnN0IHNoZWxsID0gcmVzLmFkZGVkRWRnZXNbMF0uZ2V0U2hlbGwoKTtcbiAgICAgICAgICAgIGNvbnN0IGZhY2VzID0gc2hlbGwgPT09IG51bGwgfHwgc2hlbGwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNoZWxsLmdldEZhY2VzKCk7XG4gICAgICAgICAgICBpZiAoKGZhY2VzID09PSBudWxsIHx8IGZhY2VzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBmYWNlcy5sZW5ndGgpID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhY2VzWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0U2VnbWVudEJ5SW5kZXgoc2VnbWVudHMsIGluZGV4KSB7XG4gICAgaWYgKGluZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHNlZ21lbnRzLmZpbmQoc2VnbWVudCA9PiBzZWdtZW50LnBhcmFtLmluZGV4ID09PSBpbmRleCk7XG59XG5leHBvcnQgZnVuY3Rpb24gYnVpbGRTZWdtZW50UmVsYXRpb25zKHNlZ21lbnRzKSB7XG4gICAgZm9yIChjb25zdCBzZWdtZW50IG9mIHNlZ21lbnRzKSB7XG4gICAgICAgIGNvbnN0IGJhc2VDb21wb25lbnQgPSBzZWdtZW50LmJhc2VDb21wb25lbnQ7XG4gICAgICAgIGNvbnN0IGJhc2VTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgoc2VnbWVudHMsIGJhc2VDb21wb25lbnQgPT09IG51bGwgfHwgYmFzZUNvbXBvbmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmFzZUNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgIGlmIChiYXNlU2VnbWVudCAmJiAoYmFzZUNvbXBvbmVudCA9PT0gbnVsbCB8fCBiYXNlQ29tcG9uZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBiYXNlQ29tcG9uZW50LmxpbmUzZEluZGV4KSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBiYXNlU2VnbWVudC5uZXh0Q29tcG9uZW50c1tiYXNlQ29tcG9uZW50LmxpbmUzZEluZGV4XS5hZGQoc2VnbWVudC5wYXJhbS5pbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0TmV4dENvbXBvbmVudHMoc2VnbWVudCwgc2VnbWVudHMpIHtcbiAgICBjb25zdCB7IG5leHRDb21wb25lbnRzIH0gPSBzZWdtZW50O1xuICAgIGNvbnN0IG5leHRTZWdtZW50cyA9IFtdO1xuICAgIGZvciAoY29uc3QgbmV4dENvbXBvbmVudEluZGV4ZXMgb2YgbmV4dENvbXBvbmVudHMpIHtcbiAgICAgICAgZm9yIChjb25zdCBuZXh0Q29tcG9uZW50SW5kZXggb2YgbmV4dENvbXBvbmVudEluZGV4ZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHRTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgoc2VnbWVudHMsIG5leHRDb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICBpZiAobmV4dFNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICBuZXh0U2VnbWVudHMucHVzaChuZXh0U2VnbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5leHRTZWdtZW50cztcbn1cbmV4cG9ydCBmdW5jdGlvbiBjaGFuZ2VTdGFpclVwd2FyZChzdGFydFNlZ21lbnQsIHNlZ21lbnRzLCB1cHdhcmQsIGJ1bGtDaGFuZ2UpIHtcbiAgICBpZiAoc2VnbWVudHMubGVuZ3RoKSB7XG4gICAgICAgIGxldCBjdXJyZW50ID0gW3sgc2VnbWVudDogc3RhcnRTZWdtZW50LCB2ZXJ0aWNhbERlbHRhOiAwIH1dO1xuICAgICAgICBjb25zdCB1blZpc2l0ZWQgPSBuZXcgU2V0KHNlZ21lbnRzKTtcbiAgICAgICAgd2hpbGUgKGN1cnJlbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgbmV4dCA9IFtdO1xuICAgICAgICAgICAgZm9yIChjb25zdCB7IHNlZ21lbnQsIHZlcnRpY2FsRGVsdGEgfSBvZiBjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBzdGFydEhlaWdodCwgZW5kSGVpZ2h0IH0gPSBzZWdtZW50O1xuICAgICAgICAgICAgICAgIGNvbnN0IGVuZERlbHRhID0gc2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtID8gMCA6IE1hdGguYWJzKGVuZEhlaWdodCAtIHN0YXJ0SGVpZ2h0KSAqICh1cHdhcmQgPyAxIDogLTEpO1xuICAgICAgICAgICAgICAgIHNlZ21lbnQuc3RhcnRIZWlnaHQgPSB2ZXJ0aWNhbERlbHRhO1xuICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kSGVpZ2h0ID0gc2VnbWVudC5zdGFydEhlaWdodCArIGVuZERlbHRhO1xuICAgICAgICAgICAgICAgIHNlZ21lbnQucGFyYW0udXB3YXJkID0gdXB3YXJkO1xuICAgICAgICAgICAgICAgIHVuVmlzaXRlZC5kZWxldGUoc2VnbWVudCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV4dFNlZ21lbnRzID0gZ2V0TmV4dENvbXBvbmVudHMoc2VnbWVudCwgc2VnbWVudHMpO1xuICAgICAgICAgICAgICAgIGlmIChuZXh0U2VnbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQucHVzaCguLi5uZXh0U2VnbWVudHMubWFwKHNlZyA9PiAoeyBzZWdtZW50OiBzZWcsIHZlcnRpY2FsRGVsdGE6IHNlZ21lbnQuZW5kSGVpZ2h0IH0pKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3VycmVudCA9IG5leHQ7XG4gICAgICAgICAgICBpZiAoIWN1cnJlbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGJ1bGtDaGFuZ2UgJiYgdW5WaXNpdGVkLnNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlU2VnbWVudCA9IFsuLi51blZpc2l0ZWQudmFsdWVzKCldWzBdO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gW3sgc2VnbWVudDogdGhlU2VnbWVudCwgdmVydGljYWxEZWx0YTogdGhlU2VnbWVudC5zdGFydEhlaWdodCA+IDAgPT09IHVwd2FyZCA/IDAgOiAodGhlU2VnbWVudC5zdGFydEhlaWdodCAqIC0yKSB9XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBBbmdsZVRvbGVyYW5jZSwgRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UsIERpcmVjdGlvblosIGR1bW15UG9pbnQzZCwgTGVuZ3RoVG9sZXJhbmNlLCBTdGVwQ291bnRMaW1pdCB9IGZyb20gXCIuL2NvbnN0c1wiO1xuaW1wb3J0IHsgZ2V0U2VnbWVudEJ5SW5kZXggfSBmcm9tIFwiLi9tZXNoVXRpbHNcIjtcbmltcG9ydCB7IENvbXBvbmVudFR5cGUsIENvbXBvbmVudERpcmVjdGlvblR5cGUsIENpcmN1bGFyU2lkZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBpc0VxdWFsIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVNoYXBlKHNlZ21lbnQsIHRlbXAgPSB0cnVlKSB7XG4gICAgY29uc3QgeyBwYXJhbTogeyB0eXBlIH0sIGNpcmNsZVRhbmdlbnQgfSA9IHNlZ21lbnQ7XG4gICAgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpcikge1xuICAgICAgICBnZW5lcmF0ZVN0cmFpZ2h0U3RhaXJTaGFwZShzZWdtZW50LCB0ZW1wKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5DaXJjdWxhclN0YWlyKSB7XG4gICAgICAgIGlmIChjaXJjbGVUYW5nZW50KSB7XG4gICAgICAgICAgICBnZW5lcmF0ZUNpcmN1bGFyU3RhaXJTaGFwZShzZWdtZW50LCB0ZW1wKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGdlbmVyYXRlU3RyYWlnaHRTdGFpclNoYXBlKHNlZ21lbnQsIHRlbXApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBnZW5lcmF0ZVBsYXRmb3JtU2hhcGUoc2VnbWVudCwgdGVtcCk7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2VuZXJhdGVDaXJjdWxhclN0YWlyU2hhcGUoc2VnbWVudCwgdGVtcCA9IHRydWUpIHtcbiAgICBjb25zdCB7IHN0YXJ0LCBlbmQsIHN0YWlyU2hhcGUsIG1vbGRTaGFwZSwgY29ybmVyU2hhcGUsIGNvcm5lck1vbGRTaGFwZSwgc3RhcnRIZWlnaHQsIGJhc2VDb21wb25lbnQsIGNpcmNsZVRhbmdlbnQsIHBhcmFtIH0gPSBzZWdtZW50O1xuICAgIGNvbnN0IHsgc3RhcnRXaWR0aCwgZW5kV2lkdGgsIGhvcml6b250YWxTdGVwLCB2ZXJ0aWNhbFN0ZXAsIHVwd2FyZCwgcGxhdGZvcm1UaGlja25lc3MgfSA9IHBhcmFtO1xuICAgIGlmIChjaXJjbGVUYW5nZW50KSB7XG4gICAgICAgIGNvbnN0IHRhbmdlbnRMZWZ0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhjaXJjbGVUYW5nZW50KS5ub3JtYWxpemVkKCk7XG4gICAgICAgIGNvbnN0IHN0YXJ0RW5kRGlyID0gZW5kLnN1YnRyYWN0ZWQoc3RhcnQpLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgY29uc3Qgc3RhcnRFbmREaXN0YW5jZSA9IHN0YXJ0LmRpc3RhbmNlVG8oZW5kKTtcbiAgICAgICAgY29uc3QgbWF4V2lkdGggPSBNYXRoLm1heChzdGFydFdpZHRoLCBlbmRXaWR0aCk7XG4gICAgICAgIGNvbnN0IGVuZEFuZ2xlID0gc3RhcnRFbmREaXIuYW5nbGVUbyhjaXJjbGVUYW5nZW50LCBEaXJlY3Rpb25aKTtcbiAgICAgICAgaWYgKGVuZEFuZ2xlIDwgRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UpIHtcbiAgICAgICAgICAgIHJldHVybiBnZW5lcmF0ZVN0cmFpZ2h0U3RhaXJTaGFwZShzZWdtZW50LCB0ZW1wKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpc0xlZnRBcmMgPSBlbmRBbmdsZSA+IE1hdGguUEk7XG4gICAgICAgIGlmIChpc0xlZnRBcmMpIHtcbiAgICAgICAgICAgIHNlZ21lbnQuY2lyY3VsYXJTaWRlID0gQ2lyY3VsYXJTaWRlLkxlZnQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZWdtZW50LmNpcmN1bGFyU2lkZSA9IENpcmN1bGFyU2lkZS5SaWdodDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBlbmRDb21wbGVtZW50YXJ5QW5nbGUgPSBpc0xlZnRBcmMgPyBNYXRoLmFicyhlbmRBbmdsZSAtIE1hdGguUEkgLyAyIC0gTWF0aC5QSSkgOiBNYXRoLmFicyhlbmRBbmdsZSAtIE1hdGguUEkgLyAyKTtcbiAgICAgICAgY29uc3QgaGFsZkNob3JkID0gc3RhcnRFbmREaXN0YW5jZSAvIDI7XG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IGhhbGZDaG9yZCAvIE1hdGguY29zKGVuZENvbXBsZW1lbnRhcnlBbmdsZSk7XG4gICAgICAgIGNvbnN0IGlubmVyUmFkaXVzID0gcmFkaXVzIC0gbWF4V2lkdGggLyAyO1xuICAgICAgICBpZiAocmFkaXVzIDwgbWF4V2lkdGggLyAyICogMS4yIHx8IGlubmVyUmFkaXVzIDwgaG9yaXpvbnRhbFN0ZXAgLyAyIC8gMC44KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaG9yaXpvbnRhbFN0ZXBBbmdsZSA9IE1hdGguYXNpbihob3Jpem9udGFsU3RlcCAvIDIgLyBpbm5lclJhZGl1cykgKiAyO1xuICAgICAgICBjb25zdCBjaXJjbGVOb3JtYWwgPSBpc0xlZnRBcmMgPyBEaXJlY3Rpb25aIDogRGlyZWN0aW9uWi5yZXZlcnNlZCgpO1xuICAgICAgICBjb25zdCBjaXJjbGVDZW50ZXIgPSBzdGFydC5hZGRlZCh0YW5nZW50TGVmdERpci5tdWx0aXBsaWVkKGlzTGVmdEFyYyA/IHJhZGl1cyA6IC1yYWRpdXMpKTtcbiAgICAgICAgLy8gY29uc3QgY2lyY2xlID0gR2VvbUxpYi5jcmVhdGVDaXJjbGUzZEJ5Q2VudGVyTm9ybWFsUmFkaXVzKGNpcmNsZUNlbnRlciwgY2lyY2xlTm9ybWFsLCByYWRpdXMpO1xuICAgICAgICBjb25zdCBhcmMgPSBHZW9tTGliLmNyZWF0ZUFyYzNkQnlDZW50ZXJOb3JtYWxSYWRpdXMoY2lyY2xlQ2VudGVyLCBjaXJjbGVOb3JtYWwsIHJhZGl1cywgc3RhcnQsIGVuZCk7XG4gICAgICAgIGNvbnN0IGFyY0FuZ2xlID0gYXJjLmFyY0FuZ2xlO1xuICAgICAgICBjb25zdCBzdGVwQ291bnQgPSBNYXRoLmNlaWwoYXJjQW5nbGUgLyBob3Jpem9udGFsU3RlcEFuZ2xlKTtcbiAgICAgICAgY29uc3QgbGFzdEhvcml6b250YWxBbmdsZSA9IGFyY0FuZ2xlIC0gaG9yaXpvbnRhbFN0ZXBBbmdsZSAqIChzdGVwQ291bnQgLSAxKTtcbiAgICAgICAgY29uc3QgdmFsaWRTdGVwQ291bnQgPSAobGFzdEhvcml6b250YWxBbmdsZSA9PT0gMCB8fCBsYXN0SG9yaXpvbnRhbEFuZ2xlID4gQW5nbGVUb2xlcmFuY2UpID8gc3RlcENvdW50IDogc3RlcENvdW50IC0gMTtcbiAgICAgICAgaWYgKGhvcml6b250YWxTdGVwQW5nbGUgPj0gYXJjQW5nbGUgfHwgaG9yaXpvbnRhbFN0ZXBBbmdsZSA+PSBNYXRoLlBJIC8gMiB8fCB2YWxpZFN0ZXBDb3VudCA+PSBTdGVwQ291bnRMaW1pdCB8fCB2YWxpZFN0ZXBDb3VudCA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gW107XG4gICAgICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW107XG4gICAgICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtdO1xuICAgICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW107XG4gICAgICAgIGNvcm5lclNoYXBlLnZlcnRpY2VzID0gW107XG4gICAgICAgIGNvcm5lclNoYXBlLnRlbXBMaW5lcyA9IFtdO1xuICAgICAgICBjb3JuZXJNb2xkU2hhcGUudmVydGljZXMgPSBbXTtcbiAgICAgICAgY29ybmVyTW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtdO1xuICAgICAgICBjb25zdCB7IHZlcnRpY2VzLCB0ZW1wTGluZXMgfSA9IHN0YWlyU2hhcGU7XG4gICAgICAgIGNvbnN0IHsgdmVydGljZXM6IG1vbGRWZXJ0aWNlcywgdGVtcExpbmVzOiBtb2xkVGVtcExpbmVzIH0gPSBtb2xkU2hhcGU7XG4gICAgICAgIC8vIGNvbnN0IGNlbnRlckhvcml6b250YWxTdGVwID0gaG9yaXpvbnRhbFN0ZXAgLyBpbm5lclJhZGl1cyAqIHJhZGl1cztcbiAgICAgICAgY29uc3Qgc3RlcEhlaWdodCA9IHVwd2FyZCA/IHZlcnRpY2FsU3RlcCA6IC12ZXJ0aWNhbFN0ZXA7XG4gICAgICAgIHNlZ21lbnQuZW5kSGVpZ2h0ID0gc2VnbWVudC5zdGFydEhlaWdodCArIHZhbGlkU3RlcENvdW50ICogc3RlcEhlaWdodDtcbiAgICAgICAgc3RhaXJTaGFwZS5zdGVwQ291bnQgPSB2YWxpZFN0ZXBDb3VudDtcbiAgICAgICAgbW9sZFNoYXBlLnN0ZXBDb3VudCA9IHZhbGlkU3RlcENvdW50O1xuICAgICAgICAvLyBjb25zb2xlLmxvZygndmFsaWRTdGVwQ291bnQ6ICAgJyx2YWxpZFN0ZXBDb3VudCk7XG4gICAgICAgIGNvbnN0IGxlZnRQdCA9IHN0YXJ0LmFkZGVkKHRhbmdlbnRMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKTtcbiAgICAgICAgY29uc3QgcmlnaHRQdCA9IHN0YXJ0LmFkZGVkKHRhbmdlbnRMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSk7XG4gICAgICAgIGNvbnN0IHN0YXJ0UmFkaXVzRGlyID0gaXNMZWZ0QXJjID8gdGFuZ2VudExlZnREaXIucmV2ZXJzZWQoKSA6IHRhbmdlbnRMZWZ0RGlyO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ZXBDb3VudCAtIDE7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY3VyUm90YXRlTWF0cml4ID0gR2VvbUxpYi5jcmVhdGVSb3RhdGVNYXRyaXg0KGhvcml6b250YWxTdGVwQW5nbGUgKiBpLCBjaXJjbGVOb3JtYWwsIGR1bW15UG9pbnQzZCk7XG4gICAgICAgICAgICBjb25zdCBjdXJSYWRpdXNEaXIgPSBzdGFydFJhZGl1c0Rpci5hcHBsaWVkTWF0cml4NChjdXJSb3RhdGVNYXRyaXgpO1xuICAgICAgICAgICAgY29uc3QgY3VySGFsZldpZHRoID0gKHN0YXJ0V2lkdGggKyAoZW5kV2lkdGggLSBzdGFydFdpZHRoKSAqIChpICogaG9yaXpvbnRhbFN0ZXBBbmdsZSkgLyBhcmNBbmdsZSkgLyAyICogKGlzTGVmdEFyYyA/IC0xIDogMSk7XG4gICAgICAgICAgICBjb25zdCBjdXJMZWZ0TW9sZFB0ID0gY2lyY2xlQ2VudGVyLmFkZGVkKGN1clJhZGl1c0Rpci5tdWx0aXBsaWVkKHJhZGl1cyArIGN1ckhhbGZXaWR0aCkpO1xuICAgICAgICAgICAgY29uc3QgY3VyUmlnaHRNb2xkUHQgPSBjaXJjbGVDZW50ZXIuYWRkZWQoY3VyUmFkaXVzRGlyLm11bHRpcGxpZWQocmFkaXVzIC0gY3VySGFsZldpZHRoKSk7XG4gICAgICAgICAgICBjb25zdCBjdXJMZWZ0UHQgPSBjdXJMZWZ0TW9sZFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIGkgKiBzdGVwSGVpZ2h0KSk7XG4gICAgICAgICAgICBjb25zdCBjdXJSaWdodFB0ID0gY3VyUmlnaHRNb2xkUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0ICsgaSAqIHN0ZXBIZWlnaHQpKTtcbiAgICAgICAgICAgIG1vbGRWZXJ0aWNlcy5wdXNoKGN1ckxlZnRNb2xkUHQsIGN1clJpZ2h0TW9sZFB0KTtcbiAgICAgICAgICAgIG1vbGRUZW1wTGluZXMucHVzaChbMiAqIGksIDEgKyAyICogaV0sIFsyICogaSwgMiArIDIgKiBpXSwgWzEgKyAyICogaSwgMyArIDIgKiBpXSk7XG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKGN1ckxlZnRQdCwgY3VyUmlnaHRQdCk7XG4gICAgICAgICAgICBjb25zdCBuZXh0Um90YXRlTWF0cml4ID0gR2VvbUxpYi5jcmVhdGVSb3RhdGVNYXRyaXg0KGhvcml6b250YWxTdGVwQW5nbGUgKiAoaSArIDEpLCBjaXJjbGVOb3JtYWwsIGR1bW15UG9pbnQzZCk7XG4gICAgICAgICAgICBjb25zdCBuZXh0UmFkaXVzRGlyID0gc3RhcnRSYWRpdXNEaXIuYXBwbGllZE1hdHJpeDQobmV4dFJvdGF0ZU1hdHJpeCk7XG4gICAgICAgICAgICBjb25zdCBuZXh0SGFsZldpZHRoID0gKHN0YXJ0V2lkdGggKyAoZW5kV2lkdGggLSBzdGFydFdpZHRoKSAqICgoaSArIDEpICogaG9yaXpvbnRhbFN0ZXBBbmdsZSkgLyBhcmNBbmdsZSkgLyAyICogKGlzTGVmdEFyYyA/IC0xIDogMSk7XG4gICAgICAgICAgICBjb25zdCBuZXh0TGVmdE1vbGRQdCA9IGNpcmNsZUNlbnRlci5hZGRlZChuZXh0UmFkaXVzRGlyLm11bHRpcGxpZWQocmFkaXVzICsgbmV4dEhhbGZXaWR0aCkpO1xuICAgICAgICAgICAgY29uc3QgbmV4dFJpZ2h0TW9sZFB0ID0gY2lyY2xlQ2VudGVyLmFkZGVkKG5leHRSYWRpdXNEaXIubXVsdGlwbGllZChyYWRpdXMgLSBuZXh0SGFsZldpZHRoKSk7XG4gICAgICAgICAgICBjb25zdCBuZXh0TGVmdFB0ID0gbmV4dExlZnRNb2xkUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0ICsgaSAqIHN0ZXBIZWlnaHQpKTtcbiAgICAgICAgICAgIGNvbnN0IG5leHRSaWdodFB0ID0gbmV4dFJpZ2h0TW9sZFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIGkgKiBzdGVwSGVpZ2h0KSk7XG4gICAgICAgICAgICBpZiAodXB3YXJkKSB7XG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaChjdXJMZWZ0UHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSwgY3VyUmlnaHRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2gobmV4dExlZnRQdCwgbmV4dFJpZ2h0UHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbNCAqIGksIDEgKyA0ICogaV0sIFs0ICogaSwgMiArIDQgKiBpXSwgWzEgKyA0ICogaSwgMyArIDQgKiBpXSwgWzIgKyA0ICogaSwgMyArIDQgKiBpXSwgWzIgKyA0ICogaSwgNCArIDQgKiBpXSwgWzMgKyA0ICogaSwgNSArIDQgKiBpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaSA9PT0gc3RlcENvdW50IC0gMikge1xuICAgICAgICAgICAgICAgIG1vbGRWZXJ0aWNlcy5wdXNoKG5leHRMZWZ0TW9sZFB0LCBuZXh0UmlnaHRNb2xkUHQpO1xuICAgICAgICAgICAgICAgIG1vbGRUZW1wTGluZXMucHVzaChbMiAqIChzdGVwQ291bnQgLSAxKSwgMSArIDIgKiAoc3RlcENvdW50IC0gMSldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpID09PSBzdGVwQ291bnQgLSAyKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgKHVwd2FyZCkge1xuICAgICAgICAgICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2gobmV4dExlZnRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLCBuZXh0UmlnaHRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpKTtcbiAgICAgICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbNCAqIChzdGVwQ291bnQgLSAxKSwgMSArIDQgKiAoc3RlcENvdW50IC0gMSldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbGFzdFJvdGF0ZU1hdHJpeCA9IEdlb21MaWIuY3JlYXRlUm90YXRlTWF0cml4NChhcmNBbmdsZSwgY2lyY2xlTm9ybWFsLCBkdW1teVBvaW50M2QpO1xuICAgICAgICBjb25zdCBsYXN0UmFkaXVzRGlyID0gc3RhcnRSYWRpdXNEaXIuYXBwbGllZE1hdHJpeDQobGFzdFJvdGF0ZU1hdHJpeCk7XG4gICAgICAgIGNvbnN0IGxhc3RIYWxmV2lkdGggPSBpc0xlZnRBcmMgPyAtZW5kV2lkdGggLyAyIDogZW5kV2lkdGggLyAyO1xuICAgICAgICBjb25zdCBsYXN0TGVmdE1vbGRQdCA9IGNpcmNsZUNlbnRlci5hZGRlZChsYXN0UmFkaXVzRGlyLm11bHRpcGxpZWQocmFkaXVzICsgbGFzdEhhbGZXaWR0aCkpO1xuICAgICAgICBjb25zdCBsYXN0UmlnaHRNb2xkUHQgPSBjaXJjbGVDZW50ZXIuYWRkZWQobGFzdFJhZGl1c0Rpci5tdWx0aXBsaWVkKHJhZGl1cyAtIGxhc3RIYWxmV2lkdGgpKTtcbiAgICAgICAgY29uc3QgbGFzdExlZnRQdCA9IGxhc3RMZWZ0TW9sZFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIHN0ZXBDb3VudCAqIHN0ZXBIZWlnaHQpKTtcbiAgICAgICAgY29uc3QgbGFzdFJpZ2h0UHQgPSBsYXN0UmlnaHRNb2xkUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0ICsgc3RlcENvdW50ICogc3RlcEhlaWdodCkpO1xuICAgICAgICBpZiAoc3RlcENvdW50ID09PSAxKSB7XG4gICAgICAgICAgICBtb2xkVmVydGljZXMucHVzaChsZWZ0UHQsIHJpZ2h0UHQpO1xuICAgICAgICAgICAgbW9sZFRlbXBMaW5lcy5wdXNoKFsyICogKHN0ZXBDb3VudCAtIDEpLCAxICsgMiAqIChzdGVwQ291bnQgLSAxKV0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsYXN0SG9yaXpvbnRhbEFuZ2xlID49IEFuZ2xlVG9sZXJhbmNlIHx8IGxhc3RIb3Jpem9udGFsQW5nbGUgPT09IDApIHtcbiAgICAgICAgICAgIG1vbGRWZXJ0aWNlcy5wdXNoKGxhc3RMZWZ0TW9sZFB0LCBsYXN0UmlnaHRNb2xkUHQpO1xuICAgICAgICAgICAgbW9sZFRlbXBMaW5lcy5wdXNoKFsyICogKHN0ZXBDb3VudCAtIDEpLCAyICsgMiAqIChzdGVwQ291bnQgLSAxKV0sIFsxICsgMiAqIChzdGVwQ291bnQgLSAxKSwgMyArIDIgKiAoc3RlcENvdW50IC0gMSldLCBbMiAqIHN0ZXBDb3VudCwgMSArIDIgKiBzdGVwQ291bnRdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXB3YXJkKSB7XG4gICAgICAgICAgICBpZiAoc3RlcENvdW50ID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaChsZWZ0UHQsIHJpZ2h0UHQpO1xuICAgICAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFs0ICogKHN0ZXBDb3VudCAtIDEpLCAxICsgNCAqIChzdGVwQ291bnQgLSAxKV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsYXN0SG9yaXpvbnRhbEFuZ2xlID49IEFuZ2xlVG9sZXJhbmNlIHx8IGxhc3RIb3Jpem9udGFsQW5nbGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCh2ZXJ0aWNhbFN0ZXApKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHZlcnRpY2FsU3RlcCkpKTtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKGxhc3RMZWZ0UHQsIGxhc3RSaWdodFB0KTtcbiAgICAgICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbNCAqIChzdGVwQ291bnQgLSAxKSwgMiArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMSArIDQgKiAoc3RlcENvdW50IC0gMSksIDMgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCAzICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsyICsgNCAqIChzdGVwQ291bnQgLSAxKSwgNCArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMyArIDQgKiAoc3RlcENvdW50IC0gMSksIDUgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzQgKiBzdGVwQ291bnQsIDEgKyA0ICogc3RlcENvdW50XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHN0ZXBDb3VudCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2gobGVmdFB0LCByaWdodFB0KTtcbiAgICAgICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbNCAqIChzdGVwQ291bnQgLSAxKSwgMSArIDQgKiAoc3RlcENvdW50IC0gMSldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGFzdEhvcml6b250YWxBbmdsZSA+PSBBbmdsZVRvbGVyYW5jZSB8fCBsYXN0SG9yaXpvbnRhbEFuZ2xlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaChsYXN0TGVmdFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCgtc3RlcEhlaWdodCkpLCBsYXN0UmlnaHRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQpKSk7XG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaChsYXN0TGVmdFB0LCBsYXN0UmlnaHRQdCk7XG4gICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzQgKiAoc3RlcENvdW50IC0gMSksIDIgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzEgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCAzICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsyICsgNCAqIChzdGVwQ291bnQgLSAxKSwgMyArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMiArIDQgKiAoc3RlcENvdW50IC0gMSksIDQgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzMgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCA1ICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFs0ICogc3RlcENvdW50LCAxICsgNCAqIHN0ZXBDb3VudF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RlcENvdW50ID4gMSkge1xuICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbdmVydGljZXMubGVuZ3RoIC0gMiwgMiArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMSArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgYWN0dWFsTGFzdFN0ZXBMZW5ndGggPSBsYXN0SG9yaXpvbnRhbEFuZ2xlIDwgQW5nbGVUb2xlcmFuY2UgPyBob3Jpem9udGFsU3RlcEFuZ2xlIDogbGFzdEhvcml6b250YWxBbmdsZTtcbiAgICAgICAgICAgIGlmICh1cHdhcmQpIHtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCgtc3RlcEhlaWdodCAtICgxIC0gYWN0dWFsTGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcEFuZ2xlKSAqIHN0ZXBIZWlnaHQpKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0IC0gKDEgLSBhY3R1YWxMYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwQW5nbGUpICogc3RlcEhlaWdodCkpKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gc3RlcENvdW50IC0gKGxhc3RIb3Jpem9udGFsQW5nbGUgPj0gQW5nbGVUb2xlcmFuY2UgPyAxIDogMik7IGogPiAwOyBqLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdkluZCA9IGogKiA0O1xuICAgICAgICAgICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIDIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGogPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbMiArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDBdLCBbMyArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDFdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZJbmRdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCgtc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1t2SW5kICsgMV0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0KSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIHZlcnRpY2VzLnB1c2goXG4gICAgICAgICAgICAgICAgLy8gICAgIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDZdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksXG4gICAgICAgICAgICAgICAgLy8gICAgIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDVdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksXG4gICAgICAgICAgICAgICAgLy8gKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gc3RlcENvdW50IC0gKGxhc3RIb3Jpem9udGFsQW5nbGUgPj0gQW5nbGVUb2xlcmFuY2UgPyAxIDogMik7IGogPj0gMDsgai0tKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZJbmQgPSBqICogNDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSAyLCAyICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsxICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAwXSwgWzMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAxXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2SW5kXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1t2SW5kICsgMV0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbdmVydGljZXMubGVuZ3RoIC0gMiwgMiArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMSArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMF0sIFszICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHVwd2FyZCkge1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0KSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCgtc3RlcEhlaWdodCkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbMF0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSwgdmVydGljZXNbMV0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJhc2VDb21wb25lbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGJhc2VMaW5lU2VnM2QgPSBiYXNlQ29tcG9uZW50LmxpbmUzZDtcbiAgICAgICAgICAgIGNvbnN0IGJhc2VMaW5lRGlyID0gYmFzZUxpbmVTZWczZC5lbmQuc3VidHJhY3RlZChiYXNlTGluZVNlZzNkLnN0YXJ0KS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICBjb25zdCBhbmdsZSA9IGNpcmNsZVRhbmdlbnQuYW5nbGUoYmFzZUxpbmVEaXIpO1xuICAgICAgICAgICAgaWYgKGFuZ2xlIDwgTWF0aC5QSSAvIDIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb3JuZXJDb25uZWN0aW9uUG9pbnQxID0gc3RhcnQuYWRkZWQoYmFzZUxpbmVEaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIgKiBNYXRoLnNpZ24oYW5nbGUpKSk7XG4gICAgICAgICAgICAgICAgY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzID0gW3N0YXJ0LCBzdGFydC5hZGRlZCh0YW5nZW50TGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpLCBjb3JuZXJDb25uZWN0aW9uUG9pbnQxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvcm5lckNvbm5lY3Rpb25Qb2ludDIgPSBzdGFydC5hZGRlZChiYXNlTGluZURpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyICogTWF0aC5zaWduKGFuZ2xlKSkpO1xuICAgICAgICAgICAgICAgIGNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtzdGFydCwgY29ybmVyQ29ubmVjdGlvblBvaW50Miwgc3RhcnQuYWRkZWQodGFuZ2VudExlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvcm5lck1vbGRTaGFwZS50ZW1wTGluZXMgPSBbWzAsIDFdLCBbMSwgMl0sIFsyLCAwXV07XG4gICAgICAgICAgICBjb3JuZXJTaGFwZS52ZXJ0aWNlcyA9IFtcbiAgICAgICAgICAgICAgICAuLi5jb3JuZXJNb2xkU2hhcGUudmVydGljZXMubWFwKHYgPT4gdi5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKSksXG4gICAgICAgICAgICAgICAgLi4uY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzLm1hcCh2ID0+IHYuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0IC0gcGxhdGZvcm1UaGlja25lc3MpKSksXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICBjb3JuZXJTaGFwZS50ZW1wTGluZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgIFswLCAxXSwgWzEsIDJdLCBbMiwgMF0sXG4gICAgICAgICAgICAgICAgICAgIFszLCA0XSwgWzQsIDVdLCBbNSwgM10sXG4gICAgICAgICAgICAgICAgICAgIFswLCAzXSwgWzEsIDRdLCBbMiwgNV0sXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGdlbmVyYXRlU3RyYWlnaHRTdGFpclNoYXBlKHNlZ21lbnQsIHRlbXAgPSB0cnVlKSB7XG4gICAgY29uc3QgeyBzdGFydCwgZW5kLCBzdGFpclNoYXBlLCBtb2xkU2hhcGUsIGNvcm5lclNoYXBlLCBjb3JuZXJNb2xkU2hhcGUsIHN0YXJ0SGVpZ2h0LCBiYXNlQ29tcG9uZW50LCBwYXJhbSB9ID0gc2VnbWVudDtcbiAgICBjb25zdCB7IHN0YXJ0V2lkdGgsIGVuZFdpZHRoLCBob3Jpem9udGFsU3RlcCwgdmVydGljYWxTdGVwLCB1cHdhcmQsIHBsYXRmb3JtVGhpY2tuZXNzIH0gPSBwYXJhbTtcbiAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gW107XG4gICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXTtcbiAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXTtcbiAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW107XG4gICAgY29ybmVyU2hhcGUudmVydGljZXMgPSBbXTtcbiAgICBjb3JuZXJTaGFwZS50ZW1wTGluZXMgPSBbXTtcbiAgICBjb3JuZXJNb2xkU2hhcGUudmVydGljZXMgPSBbXTtcbiAgICBjb3JuZXJNb2xkU2hhcGUudGVtcExpbmVzID0gW107XG4gICAgY29uc3QgeyB2ZXJ0aWNlcywgdGVtcExpbmVzIH0gPSBzdGFpclNoYXBlO1xuICAgIGNvbnN0IHsgdmVydGljZXM6IG1vbGRWZXJ0aWNlcywgdGVtcExpbmVzOiBtb2xkVGVtcExpbmVzIH0gPSBtb2xkU2hhcGU7XG4gICAgbGV0IGhvcml6b250YWxGcm9udERpciA9IGVuZC5zdWJ0cmFjdGVkKHN0YXJ0KS5ub3JtYWxpemVkKCk7XG4gICAgbGV0IGhvcml6b250YWxEaXN0YW5jZSA9IHN0YXJ0LmRpc3RhbmNlVG8oZW5kKTtcbiAgICBsZXQgaG9yaXpvbnRhbExlZnREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKGhvcml6b250YWxGcm9udERpcik7XG4gICAgY29uc3Qgc3RlcEZsb2F0Q291bnQgPSBob3Jpem9udGFsRGlzdGFuY2UgLyBob3Jpem9udGFsU3RlcDtcbiAgICBjb25zdCBzdGVwQ291bnQgPSBNYXRoLmNlaWwoc3RlcEZsb2F0Q291bnQpO1xuICAgIGNvbnN0IGxhc3RTdGVwTGVuZ3RoID0gaG9yaXpvbnRhbERpc3RhbmNlIC0gKHN0ZXBDb3VudCAtIDEpICogaG9yaXpvbnRhbFN0ZXA7XG4gICAgY29uc3QgdmFsaWRTdGVwQ291bnQgPSAobGFzdFN0ZXBMZW5ndGggPT09IDAgfHwgbGFzdFN0ZXBMZW5ndGggPiBMZW5ndGhUb2xlcmFuY2UpID8gc3RlcENvdW50IDogc3RlcENvdW50IC0gMTtcbiAgICBpZiAodmFsaWRTdGVwQ291bnQgPCAxIHx8IHZhbGlkU3RlcENvdW50ID49IFN0ZXBDb3VudExpbWl0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGJhc2VDb21wb25lbnQpIHtcbiAgICAgICAgY29uc3QgYmFzZUxpbmVTZWczZCA9IGJhc2VDb21wb25lbnQubGluZTNkO1xuICAgICAgICBjb25zdCBiYXNlTGluZURpciA9IGJhc2VMaW5lU2VnM2QuZW5kLnN1YnRyYWN0ZWQoYmFzZUxpbmVTZWczZC5zdGFydCkubm9ybWFsaXplZCgpO1xuICAgICAgICBjb25zdCBhbmdsZSA9IGhvcml6b250YWxGcm9udERpci5hbmdsZShiYXNlTGluZURpcik7XG4gICAgICAgIGNvbnN0IGRlbHRhQW5nbGUgPSBNYXRoLmFicyhhbmdsZSAtIE1hdGguUEkgLyAyKTtcbiAgICAgICAgaWYgKGRlbHRhQW5nbGUgPD0gRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UpIHtcbiAgICAgICAgICAgIHNlZ21lbnQuY29tcG9uZW50RGlyZWN0aW9uVHlwZSA9IENvbXBvbmVudERpcmVjdGlvblR5cGUuRnJvbnQ7XG4gICAgICAgICAgICBob3Jpem9udGFsRnJvbnREaXIgPSBiYXNlTGluZURpci5jcm9zcyhob3Jpem9udGFsRnJvbnREaXIuY3Jvc3MoYmFzZUxpbmVEaXIpKS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICBob3Jpem9udGFsRGlzdGFuY2UgPSBob3Jpem9udGFsRGlzdGFuY2UgKiBNYXRoLmNvcyhkZWx0YUFuZ2xlKTtcbiAgICAgICAgICAgIGhvcml6b250YWxMZWZ0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhob3Jpem9udGFsRnJvbnREaXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGFuZ2xlIDwgTWF0aC5QSSAvIDIpIHtcbiAgICAgICAgICAgICAgICBzZWdtZW50LmNvbXBvbmVudERpcmVjdGlvblR5cGUgPSBDb21wb25lbnREaXJlY3Rpb25UeXBlLkxlZnQ7XG4gICAgICAgICAgICAgICAgY29uc3QgY29ybmVyQ29ubmVjdGlvblBvaW50MSA9IHN0YXJ0LmFkZGVkKGJhc2VMaW5lRGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyICogTWF0aC5zaWduKGFuZ2xlKSkpO1xuICAgICAgICAgICAgICAgIGNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtzdGFydCwgc3RhcnQuYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSwgY29ybmVyQ29ubmVjdGlvblBvaW50MV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWdtZW50LmNvbXBvbmVudERpcmVjdGlvblR5cGUgPSBDb21wb25lbnREaXJlY3Rpb25UeXBlLlJpZ2h0O1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvcm5lckNvbm5lY3Rpb25Qb2ludDIgPSBzdGFydC5hZGRlZChiYXNlTGluZURpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyICogTWF0aC5zaWduKGFuZ2xlKSkpO1xuICAgICAgICAgICAgICAgIGNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtzdGFydCwgY29ybmVyQ29ubmVjdGlvblBvaW50Miwgc3RhcnQuYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvcm5lck1vbGRTaGFwZS50ZW1wTGluZXMgPSBbWzAsIDFdLCBbMSwgMl0sIFsyLCAwXV07XG4gICAgICAgICAgICBjb3JuZXJTaGFwZS52ZXJ0aWNlcyA9IFtcbiAgICAgICAgICAgICAgICAuLi5jb3JuZXJNb2xkU2hhcGUudmVydGljZXMubWFwKHYgPT4gdi5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKSksXG4gICAgICAgICAgICAgICAgLi4uY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzLm1hcCh2ID0+IHYuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0IC0gcGxhdGZvcm1UaGlja25lc3MpKSksXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICBjb3JuZXJTaGFwZS50ZW1wTGluZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgIFswLCAxXSwgWzEsIDJdLCBbMiwgMF0sXG4gICAgICAgICAgICAgICAgICAgIFszLCA0XSwgWzQsIDVdLCBbNSwgM10sXG4gICAgICAgICAgICAgICAgICAgIFswLCAzXSwgWzEsIDRdLCBbMiwgNV0sXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBzdGVwSGVpZ2h0ID0gdXB3YXJkID8gdmVydGljYWxTdGVwIDogLXZlcnRpY2FsU3RlcDtcbiAgICBzZWdtZW50LmVuZEhlaWdodCA9IHNlZ21lbnQuc3RhcnRIZWlnaHQgKyB2YWxpZFN0ZXBDb3VudCAqIHN0ZXBIZWlnaHQ7XG4gICAgc3RhaXJTaGFwZS5zdGVwQ291bnQgPSB2YWxpZFN0ZXBDb3VudDtcbiAgICBtb2xkU2hhcGUuc3RlcENvdW50ID0gdmFsaWRTdGVwQ291bnQ7XG4gICAgY29uc3QgbGVmdFB0ID0gc3RhcnQuYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpO1xuICAgIGNvbnN0IHJpZ2h0UHQgPSBzdGFydC5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpO1xuICAgIGNvbnN0IHdpZHRoRGVsdGEgPSAoZW5kV2lkdGggLSBzdGFydFdpZHRoKSAvIDIgLyAoc3RlcEZsb2F0Q291bnQpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RlcENvdW50IC0gMTsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGN1ckxlZnRNb2xkUHQgPSBsZWZ0UHQuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaSAqIGhvcml6b250YWxTdGVwKSkuYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZChpICogd2lkdGhEZWx0YSkpO1xuICAgICAgICBjb25zdCBjdXJSaWdodE1vbGRQdCA9IHJpZ2h0UHQuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaSAqIGhvcml6b250YWxTdGVwKSkuYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZCgtaSAqIHdpZHRoRGVsdGEpKTtcbiAgICAgICAgY29uc3QgY3VyTGVmdFB0ID0gY3VyTGVmdE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBpICogc3RlcEhlaWdodCkpO1xuICAgICAgICBjb25zdCBjdXJSaWdodFB0ID0gY3VyUmlnaHRNb2xkUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0ICsgaSAqIHN0ZXBIZWlnaHQpKTtcbiAgICAgICAgbW9sZFZlcnRpY2VzLnB1c2goY3VyTGVmdE1vbGRQdCwgY3VyUmlnaHRNb2xkUHQpO1xuICAgICAgICBtb2xkVGVtcExpbmVzLnB1c2goWzIgKiBpLCAxICsgMiAqIGldLCBbMiAqIGksIDIgKyAyICogaV0sIFsxICsgMiAqIGksIDMgKyAyICogaV0pO1xuICAgICAgICB2ZXJ0aWNlcy5wdXNoKGN1ckxlZnRQdCwgY3VyUmlnaHRQdCk7XG4gICAgICAgIGlmICh1cHdhcmQpIHtcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2goY3VyTGVmdFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksIGN1clJpZ2h0UHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKGN1ckxlZnRQdC5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpLCBjdXJSaWdodFB0LmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbNCAqIGksIDEgKyA0ICogaV0sIFs0ICogaSwgMiArIDQgKiBpXSwgWzEgKyA0ICogaSwgMyArIDQgKiBpXSwgWzIgKyA0ICogaSwgMyArIDQgKiBpXSwgWzIgKyA0ICogaSwgNCArIDQgKiBpXSwgWzMgKyA0ICogaSwgNSArIDQgKiBpXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbW9sZFZlcnRpY2VzLnB1c2goc3RlcENvdW50ID4gMSA/IG1vbGRWZXJ0aWNlc1ttb2xkVmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaG9yaXpvbnRhbFN0ZXApKSA6IGxlZnRQdCwgc3RlcENvdW50ID4gMSA/IG1vbGRWZXJ0aWNlc1ttb2xkVmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaG9yaXpvbnRhbFN0ZXApKSA6IHJpZ2h0UHQpO1xuICAgIG1vbGRUZW1wTGluZXMucHVzaChbMiAqIChzdGVwQ291bnQgLSAxKSwgMSArIDIgKiAoc3RlcENvdW50IC0gMSldKTtcbiAgICBpZiAobGFzdFN0ZXBMZW5ndGggPiBMZW5ndGhUb2xlcmFuY2UgfHwgbGFzdFN0ZXBMZW5ndGggPT09IDApIHtcbiAgICAgICAgbW9sZFZlcnRpY2VzLnB1c2gobW9sZFZlcnRpY2VzW21vbGRWZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXAgKiB3aWR0aERlbHRhKSkuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGgpKSwgbW9sZFZlcnRpY2VzW21vbGRWZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKC1sYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwICogd2lkdGhEZWx0YSkpLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoKSkpO1xuICAgICAgICBtb2xkVGVtcExpbmVzLnB1c2goWzIgKiAoc3RlcENvdW50IC0gMSksIDIgKyAyICogKHN0ZXBDb3VudCAtIDEpXSwgWzEgKyAyICogKHN0ZXBDb3VudCAtIDEpLCAzICsgMiAqIChzdGVwQ291bnQgLSAxKV0sIFsyICogc3RlcENvdW50LCAxICsgMiAqIHN0ZXBDb3VudF0pO1xuICAgIH1cbiAgICBpZiAodXB3YXJkKSB7XG4gICAgICAgIHZlcnRpY2VzLnB1c2goc3RlcENvdW50ID4gMSA/IHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSkgOiBsZWZ0UHQsIHN0ZXBDb3VudCA+IDEgPyB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpIDogcmlnaHRQdCk7XG4gICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbNCAqIChzdGVwQ291bnQgLSAxKSwgMSArIDQgKiAoc3RlcENvdW50IC0gMSldKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGFzdFN0ZXBMZW5ndGggPiBMZW5ndGhUb2xlcmFuY2UgfHwgbGFzdFN0ZXBMZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSk7XG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcCAqIHdpZHRoRGVsdGEpKS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCkpLCB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKC1sYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwICogd2lkdGhEZWx0YSkpLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoKSkpO1xuICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChcbiAgICAgICAgICAgICAgICAvLyBbNCAqIHN0ZXBDb3VudCwgMSArIDQgKiBzdGVwQ291bnRdLFxuICAgICAgICAgICAgICAgIFs0ICogKHN0ZXBDb3VudCAtIDEpLCAyICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsxICsgNCAqIChzdGVwQ291bnQgLSAxKSwgMyArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMiArIDQgKiAoc3RlcENvdW50IC0gMSksIDMgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCA0ICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFszICsgNCAqIChzdGVwQ291bnQgLSAxKSwgNSArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbNCAqIHN0ZXBDb3VudCwgMSArIDQgKiBzdGVwQ291bnRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmVydGljZXMucHVzaChzdGVwQ291bnQgPiAxID8gdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSA6IGxlZnRQdCwgc3RlcENvdW50ID4gMSA/IHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkgOiByaWdodFB0KTtcbiAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFs0ICogKHN0ZXBDb3VudCAtIDEpLCAxICsgNCAqIChzdGVwQ291bnQgLSAxKV0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsYXN0U3RlcExlbmd0aCA+IExlbmd0aFRvbGVyYW5jZSB8fCBsYXN0U3RlcExlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXAgKiB3aWR0aERlbHRhKSkuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGgpKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZCgtbGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcCAqIHdpZHRoRGVsdGEpKS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCkpKTtcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSk7XG4gICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFxuICAgICAgICAgICAgICAgIC8vIFs0ICogKHN0ZXBDb3VudCAtIDEpLCAxICsgNCAqIChzdGVwQ291bnQgLSAxKV0sXG4gICAgICAgICAgICAgICAgWzQgKiAoc3RlcENvdW50IC0gMSksIDIgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzEgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCAzICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsyICsgNCAqIChzdGVwQ291bnQgLSAxKSwgMyArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMiArIDQgKiAoc3RlcENvdW50IC0gMSksIDQgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzMgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCA1ICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFs0ICogc3RlcENvdW50LCAxICsgNCAqIHN0ZXBDb3VudF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChzdGVwQ291bnQgPiAxKSB7XG4gICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbdmVydGljZXMubGVuZ3RoIC0gMiwgMiArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMSArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgNCArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMyArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDUgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgW3ZlcnRpY2VzLmxlbmd0aCArIDIsIDEgKyB2ZXJ0aWNlcy5sZW5ndGggKyAyXSwgW3ZlcnRpY2VzLmxlbmd0aCArIDIsIDBdLCBbMSArIHZlcnRpY2VzLmxlbmd0aCArIDIsIDFdKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhY3R1YWxMYXN0U3RlcExlbmd0aCA9IGxhc3RTdGVwTGVuZ3RoIDwgTGVuZ3RoVG9sZXJhbmNlID8gaG9yaXpvbnRhbFN0ZXAgOiBsYXN0U3RlcExlbmd0aDtcbiAgICAgICAgaWYgKHVwd2FyZCkge1xuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQgLSAoMSAtIGFjdHVhbExhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXApICogc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQgLSAoMSAtIGFjdHVhbExhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXApICogc3RlcEhlaWdodCkpKTtcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbMF0uYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaG9yaXpvbnRhbFN0ZXApKSwgdmVydGljZXNbMV0uYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaG9yaXpvbnRhbFN0ZXApKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKC1hY3R1YWxMYXN0U3RlcExlbmd0aCkpLCB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZCgtYWN0dWFsTGFzdFN0ZXBMZW5ndGgpKSk7XG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzWzBdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksIHZlcnRpY2VzWzFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIDIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMiArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDBdLCBbMyArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDFdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXB3YXJkKSB7XG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCgtc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQpKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzWzBdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksIHZlcnRpY2VzWzFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gZ2VuZXJhdGVQbGF0Zm9ybVNoYXBlKHNlZ21lbnQsIHRlbXAgPSB0cnVlKSB7XG4gICAgY29uc3QgeyBzdGFydCwgc3RhcnRIZWlnaHQsIGJhc2VDb21wb25lbnQsIHN0YWlyU2hhcGUsIG1vbGRTaGFwZSwgY29ybmVyU2hhcGUsIGNvcm5lck1vbGRTaGFwZSwgcGFyYW0gfSA9IHNlZ21lbnQ7XG4gICAgY29uc3QgeyBzdGFydFdpZHRoLCBvZmZzZXRXaWR0aCwgd2l0aE9mZnNldCwgcGxhdGZvcm1UaGlja25lc3MsIHBsYXRmb3JtTGVuZ3RoLCBwbGF0Zm9ybUxlbmd0aExvY2tlZCwgbW9kZWxFZGl0aW5nIH0gPSBwYXJhbTtcbiAgICBjb25zdCBjdXJEaXIgPSBzZWdtZW50LmVuZC5zdWJ0cmFjdGVkKHN0YXJ0KTtcbiAgICBjb25zdCBjdXJEaXJOb3JtYWxpemVkID0gc2VnbWVudC5lbmQuc3VidHJhY3RlZChzdGFydCkubm9ybWFsaXplZCgpO1xuICAgIGNvbnN0IGN1ckxlZnREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKGN1ckRpcikubm9ybWFsaXplZCgpO1xuICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbXTtcbiAgICBzdGFpclNoYXBlLnRlbXBMaW5lcyA9IFtdO1xuICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtdO1xuICAgIG1vbGRTaGFwZS50ZW1wTGluZXMgPSBbXTtcbiAgICBjb3JuZXJTaGFwZS52ZXJ0aWNlcyA9IFtdO1xuICAgIGNvcm5lclNoYXBlLnRlbXBMaW5lcyA9IFtdO1xuICAgIGNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtdO1xuICAgIGNvcm5lck1vbGRTaGFwZS50ZW1wTGluZXMgPSBbXTtcbiAgICBzZWdtZW50LmVuZCA9IHBsYXRmb3JtTGVuZ3RoTG9ja2VkID8gc2VnbWVudC5zdGFydC5hZGRlZChjdXJEaXJOb3JtYWxpemVkLm11bHRpcGxpZWQocGxhdGZvcm1MZW5ndGgpKSA6IHNlZ21lbnQuZW5kO1xuICAgIHNlZ21lbnQuZW5kSGVpZ2h0ID0gc3RhcnRIZWlnaHQ7XG4gICAgaWYgKCFtb2RlbEVkaXRpbmcpIHtcbiAgICAgICAgcGFyYW0ud2l0aE9mZnNldCA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAoYmFzZUNvbXBvbmVudCkge1xuICAgICAgICBjb25zdCBiYXNlTGluZVNlZzNkID0gYmFzZUNvbXBvbmVudC5saW5lM2Q7XG4gICAgICAgIGNvbnN0IHsgc3RhcnQ6IGJhc2VMaW5lU3RhcnQsIGVuZDogYmFzZUxpbmVFbmQgfSA9IGJhc2VMaW5lU2VnM2Q7XG4gICAgICAgIGNvbnN0IGJhc2VMaW5lRGlyID0gYmFzZUxpbmVFbmQuc3VidHJhY3RlZChiYXNlTGluZVN0YXJ0KS5ub3JtYWxpemVkKCk7XG4gICAgICAgIGNvbnN0IHByZXZEaXJOb3JtYWxpemVkID0gYmFzZUxpbmVEaXIuY3Jvc3MoRGlyZWN0aW9uWikubm9ybWFsaXplZCgpO1xuICAgICAgICBjb25zdCBwcmV2TGVmdERpciA9IERpcmVjdGlvblouY3Jvc3MocHJldkRpck5vcm1hbGl6ZWQpLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgY29uc3QgYW5nbGUgPSBjdXJEaXIuYW5nbGVUbyhwcmV2RGlyTm9ybWFsaXplZCwgRGlyZWN0aW9uWik7XG4gICAgICAgIGNvbnN0IGZyb250TGVuZ3RoID0gcGxhdGZvcm1MZW5ndGhMb2NrZWQgPyBwbGF0Zm9ybUxlbmd0aCA6IE1hdGguYWJzKGN1ckRpci5kb3QocHJldkRpck5vcm1hbGl6ZWQpKTtcbiAgICAgICAgY29uc3QgY3VyRW5kTGVmdENvcm5lciA9IHNlZ21lbnQuZW5kLmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpO1xuICAgICAgICBjb25zdCBkaXIxID0gY3VyRW5kTGVmdENvcm5lci5zdWJ0cmFjdGVkKHNlZ21lbnQuc3RhcnQpO1xuICAgICAgICBjb25zdCBhbmdsZTEgPSBkaXIxLmFuZ2xlKGN1ckRpcik7XG4gICAgICAgIGlmICgoYW5nbGUgPj0gTWF0aC5QSSAmJiBhbmdsZSA8PSAoTWF0aC5QSSAqIDMgLyAyICsgYW5nbGUxKSkgfHwgKG1vZGVsRWRpdGluZyAmJiB3aXRoT2Zmc2V0ICYmIG9mZnNldFdpZHRoID49IDApKSB7XG4gICAgICAgICAgICBzZWdtZW50LmNvbXBvbmVudERpcmVjdGlvblR5cGUgPSBDb21wb25lbnREaXJlY3Rpb25UeXBlLkxlZnQ7XG4gICAgICAgICAgICBwYXJhbS5wbGF0Zm9ybUxlbmd0aCA9IGZyb250TGVuZ3RoO1xuICAgICAgICAgICAgY29uc3QgZnJvbnRFbmQgPSBzZWdtZW50LnN0YXJ0LmFkZGVkKHByZXZEaXJOb3JtYWxpemVkLm11bHRpcGxpZWQoZnJvbnRMZW5ndGgpKTtcbiAgICAgICAgICAgIHNlZ21lbnQuZW5kID0gZnJvbnRFbmQ7XG4gICAgICAgICAgICBjb25zdCBsZWZ0TGVuZ3RoID0gd2l0aE9mZnNldCAmJiBtb2RlbEVkaXRpbmcgPyAob2Zmc2V0V2lkdGggKyBzdGFydFdpZHRoIC8gMikgOiBjdXJEaXIuZG90KHByZXZMZWZ0RGlyKTtcbiAgICAgICAgICAgIGlmIChsZWZ0TGVuZ3RoID4gc3RhcnRXaWR0aCAvIDIpIHtcbiAgICAgICAgICAgICAgICBwYXJhbS53aXRoT2Zmc2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBwYXJhbS5vZmZzZXRXaWR0aCA9IGxlZnRMZW5ndGggLSBzdGFydFdpZHRoIC8gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHZhbGlkTGVmdExlbmd0aCA9IE1hdGgubWF4KHN0YXJ0V2lkdGggLyAyLCBsZWZ0TGVuZ3RoKTtcbiAgICAgICAgICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtcbiAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKHZhbGlkTGVmdExlbmd0aCkpLFxuICAgICAgICAgICAgICAgIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSksXG4gICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKHZhbGlkTGVmdExlbmd0aCkpLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIG1vbGRTaGFwZS50ZW1wTGluZXMgPSBbWzAsIDFdLCBbMSwgMl0sIFsyLCAzXSwgWzMsIDBdXTtcbiAgICAgICAgICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkpLFxuICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCAtIHBsYXRmb3JtVGhpY2tuZXNzKSkpLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMsXG4gICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMubWFwKHNlZyA9PiBbc2VnWzBdICsgNCwgc2VnWzFdICsgNF0pLFxuICAgICAgICAgICAgICAgICAgICBbMCwgNF0sIFsxLCA1XSwgWzIsIDZdLCBbMywgN10sXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgoYW5nbGUgPCBNYXRoLlBJICYmIGFuZ2xlID49IChNYXRoLlBJIC8gMiAtIGFuZ2xlMSkpIHx8IChtb2RlbEVkaXRpbmcgJiYgd2l0aE9mZnNldCAmJiBvZmZzZXRXaWR0aCA8IDApKSB7XG4gICAgICAgICAgICBzZWdtZW50LmNvbXBvbmVudERpcmVjdGlvblR5cGUgPSBDb21wb25lbnREaXJlY3Rpb25UeXBlLlJpZ2h0O1xuICAgICAgICAgICAgcGFyYW0ucGxhdGZvcm1MZW5ndGggPSBmcm9udExlbmd0aDtcbiAgICAgICAgICAgIGNvbnN0IHJpZ2h0TGVuZ3RoID0gd2l0aE9mZnNldCAmJiBtb2RlbEVkaXRpbmcgPyAoLW9mZnNldFdpZHRoICsgc3RhcnRXaWR0aCAvIDIpIDogLWN1ckRpci5kb3QocHJldkxlZnREaXIpO1xuICAgICAgICAgICAgY29uc3QgZnJvbnRFbmQxID0gc2VnbWVudC5zdGFydC5hZGRlZChwcmV2RGlyTm9ybWFsaXplZC5tdWx0aXBsaWVkKGZyb250TGVuZ3RoKSk7XG4gICAgICAgICAgICBzZWdtZW50LmVuZCA9IGZyb250RW5kMTtcbiAgICAgICAgICAgIGlmIChyaWdodExlbmd0aCA+IHN0YXJ0V2lkdGggLyAyKSB7XG4gICAgICAgICAgICAgICAgcGFyYW0ud2l0aE9mZnNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcGFyYW0ub2Zmc2V0V2lkdGggPSAtKHJpZ2h0TGVuZ3RoIC0gc3RhcnRXaWR0aCAvIDIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdmFsaWRSaWdodExlbmd0aCA9IE1hdGgubWF4KHN0YXJ0V2lkdGggLyAyLCByaWdodExlbmd0aCk7XG4gICAgICAgICAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXG4gICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgICAgIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLXZhbGlkUmlnaHRMZW5ndGgpKSxcbiAgICAgICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC12YWxpZFJpZ2h0TGVuZ3RoKSksXG4gICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIG1vbGRTaGFwZS50ZW1wTGluZXMgPSBbWzAsIDFdLCBbMSwgMl0sIFsyLCAzXSwgWzMsIDBdXTtcbiAgICAgICAgICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkpLFxuICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCAtIHBsYXRmb3JtVGhpY2tuZXNzKSkpLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMsXG4gICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMubWFwKHNlZyA9PiBbc2VnWzBdICsgNCwgc2VnWzFdICsgNF0pLFxuICAgICAgICAgICAgICAgICAgICBbMCwgNF0sIFsxLCA1XSwgWzIsIDZdLCBbMywgN10sXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBhcmFtLm9mZnNldFdpZHRoID0gMDtcbiAgICAgICAgICAgIGlmIChhbmdsZSA8PSBEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSB8fCBhbmdsZSA+PSAoTWF0aC5QSSAqIDIgLSBEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSkpIHtcbiAgICAgICAgICAgICAgICBzZWdtZW50LmNvbXBvbmVudERpcmVjdGlvblR5cGUgPSBDb21wb25lbnREaXJlY3Rpb25UeXBlLkZyb250O1xuICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kID0gc2VnbWVudC5zdGFydC5hZGRlZChwcmV2RGlyTm9ybWFsaXplZC5tdWx0aXBsaWVkKGZyb250TGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgcGFyYW0ucGxhdGZvcm1MZW5ndGggPSBmcm9udExlbmd0aDtcbiAgICAgICAgICAgICAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIgKyBvZmZzZXRXaWR0aCkpLFxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMiArIG9mZnNldFdpZHRoKSksXG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIG1vbGRTaGFwZS50ZW1wTGluZXMgPSBbWzAsIDFdLCBbMSwgMl0sIFsyLCAzXSwgWzMsIDBdXTtcbiAgICAgICAgICAgICAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gWy4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCkpKSxcbiAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0IC0gcGxhdGZvcm1UaGlja25lc3MpKSksXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgICAgICBzdGFpclNoYXBlLnRlbXBMaW5lcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLm1hcChzZWcgPT4gW3NlZ1swXSArIDQsIHNlZ1sxXSArIDRdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFswLCA0XSwgWzEsIDVdLCBbMiwgNl0sIFszLCA3XSxcbiAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSA8IGFuZ2xlICYmIGFuZ2xlIDwgKE1hdGguUEkgLyAyIC0gYW5nbGUxKSkge1xuICAgICAgICAgICAgICAgIHNlZ21lbnQuY29tcG9uZW50RGlyZWN0aW9uVHlwZSA9IENvbXBvbmVudERpcmVjdGlvblR5cGUuUmlnaHRGcm9udDtcbiAgICAgICAgICAgICAgICBwYXJhbS5wbGF0Zm9ybUxlbmd0aCA9IHNlZ21lbnQuZW5kLmRpc3RhbmNlVG8oc2VnbWVudC5zdGFydCk7XG4gICAgICAgICAgICAgICAgbGV0IGxlZnRDb25uZWN0UG9pbnRzID0gW3N0YXJ0LmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpLCBiYXNlTGluZUVuZF07XG4gICAgICAgICAgICAgICAgY29uc3QgYmFzZUxpbmVFbmREaXN0YW5jZSA9IHN0YXJ0LmRpc3RhbmNlVG8oYmFzZUxpbmVFbmQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxlZnRQcm9qZWN0RGlzdGFuY2UgPSBzdGFydFdpZHRoIC8gMiAqIE1hdGguY29zKGFuZ2xlKTtcbiAgICAgICAgICAgICAgICBpZiAobGVmdFByb2plY3REaXN0YW5jZSA8IGJhc2VMaW5lRW5kRGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbDEgPSBzdGFydFdpZHRoIC8gMiAvIE1hdGguY29zKGFuZ2xlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGwxID4gYmFzZUxpbmVFbmREaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYTEgPSBsMSAtIGJhc2VMaW5lRW5kRGlzdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjMSA9IGExIC8gTWF0aC50YW4oYW5nbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdENvbm5lY3RQb2ludHMgPSBbc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChiYXNlTGluZUVuZERpc3RhbmNlKSkuYWRkZWQocHJldkRpck5vcm1hbGl6ZWQubXVsdGlwbGllZChjMSkpLCBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKGJhc2VMaW5lRW5kRGlzdGFuY2UpKV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0Q29ubmVjdFBvaW50cyA9IFtzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKGwxKSldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgLy8gc3RhcnQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSksXG4gICAgICAgICAgICAgICAgICAgIC4uLmxlZnRDb25uZWN0UG9pbnRzLFxuICAgICAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMiAvIE1hdGguY29zKGFuZ2xlKSkpLFxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSksXG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgY29uc3QgbW9sZFZlcnRleENvdW50ID0gbW9sZFNoYXBlLnZlcnRpY2VzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gZ2VuZXJhdGVUZW1wTGluZXNMb29wKG1vbGRWZXJ0ZXhDb3VudCk7XG4gICAgICAgICAgICAgICAgLy8gaWYgKG1vbGRWZXJ0ZXhDb3VudCA9PT0gNCkge1xuICAgICAgICAgICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIG1vbGRTaGFwZS50ZW1wTGluZXMgPSBbWzAsIDFdLCBbMSwgMl0sIFsyLCAzXSwgWzMsIDRdLCBbNCwgMF1dO1xuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gWy4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCkpKSxcbiAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0IC0gcGxhdGZvcm1UaGlja25lc3MpKSksXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgICAgICBzdGFpclNoYXBlLnRlbXBMaW5lcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLm1hcChzZWcgPT4gW3NlZ1swXSArIG1vbGRWZXJ0ZXhDb3VudCwgc2VnWzFdICsgbW9sZFZlcnRleENvdW50XSksXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLm1hcChzZWcgPT4gW3NlZ1swXSwgc2VnWzBdICsgbW9sZFZlcnRleENvdW50XSksXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBbMCwgNV0sIFsxLCA2XSwgWzIsIDddLCBbMywgOF0sIFs0LCA5XSxcbiAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhbmdsZSA+IChNYXRoLlBJICogMyAvIDIgKyBhbmdsZTEpICYmIGFuZ2xlIDwgKE1hdGguUEkgKiAyIC0gRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UpKSB7XG4gICAgICAgICAgICAgICAgc2VnbWVudC5jb21wb25lbnREaXJlY3Rpb25UeXBlID0gQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5MZWZ0RnJvbnQ7XG4gICAgICAgICAgICAgICAgcGFyYW0ucGxhdGZvcm1MZW5ndGggPSBzZWdtZW50LmVuZC5kaXN0YW5jZVRvKHNlZ21lbnQuc3RhcnQpO1xuICAgICAgICAgICAgICAgIGxldCByaWdodENvbm5lY3RQb2ludHMgPSBbYmFzZUxpbmVTdGFydCwgc3RhcnQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpXTtcbiAgICAgICAgICAgICAgICBjb25zdCBiYXNlTGluZVN0YXJ0RGlzdGFuY2UgPSBzdGFydC5kaXN0YW5jZVRvKGJhc2VMaW5lU3RhcnQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJpZ2h0UHJvamVjdERpc3RhbmNlID0gc3RhcnRXaWR0aCAvIDIgKiBNYXRoLmNvcyhhbmdsZSk7XG4gICAgICAgICAgICAgICAgaWYgKHJpZ2h0UHJvamVjdERpc3RhbmNlIDwgYmFzZUxpbmVTdGFydERpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCByaWdodENvbm5lY3RQb2ludHMgPSBbYmFzZUxpbmVTdGFydCwgYmFzZUxpbmVTdGFydF07XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIChzdGFydFdpZHRoIDw9IHByZXZQYXJhbS5lbmRXaWR0aCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsMiA9IHN0YXJ0V2lkdGggLyAyIC8gTWF0aC5jb3MoYW5nbGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobDIgPiBiYXNlTGluZVN0YXJ0RGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGEyID0gbDIgLSBiYXNlTGluZVN0YXJ0RGlzdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjMiA9IGEyIC8gTWF0aC50YW4oTWF0aC5QSSAqIDIgLSBhbmdsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodENvbm5lY3RQb2ludHMgPSBbc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtYmFzZUxpbmVTdGFydERpc3RhbmNlKSksIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLWJhc2VMaW5lU3RhcnREaXN0YW5jZSkpLmFkZGVkKHByZXZEaXJOb3JtYWxpemVkLm11bHRpcGxpZWQoYzIpKV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodENvbm5lY3RQb2ludHMgPSBbc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtbDIpKV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbW9sZFNoYXBlLnZlcnRpY2VzID0gW1xuICAgICAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyIC8gTWF0aC5jb3MoYW5nbGUpKSksXG4gICAgICAgICAgICAgICAgICAgIC4uLnJpZ2h0Q29ubmVjdFBvaW50cyxcbiAgICAgICAgICAgICAgICAgICAgLy8gc3RhcnQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSksXG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgY29uc3QgbW9sZFZlcnRleENvdW50ID0gbW9sZFNoYXBlLnZlcnRpY2VzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gZ2VuZXJhdGVUZW1wTGluZXNMb29wKG1vbGRWZXJ0ZXhDb3VudCk7XG4gICAgICAgICAgICAgICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFsuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKSksXG4gICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCAtIHBsYXRmb3JtVGhpY2tuZXNzKSkpLFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcy5tYXAoc2VnID0+IFtzZWdbMF0gKyBtb2xkVmVydGV4Q291bnQsIHNlZ1sxXSArIG1vbGRWZXJ0ZXhDb3VudF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcy5tYXAoc2VnID0+IFtzZWdbMF0sIHNlZ1swXSArIG1vbGRWZXJ0ZXhDb3VudF0pLFxuICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBwYXJhbS5wbGF0Zm9ybUxlbmd0aCA9IHNlZ21lbnQuZW5kLmRpc3RhbmNlVG8oc2VnbWVudC5zdGFydCk7XG4gICAgICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtcbiAgICAgICAgICAgIHN0YXJ0LmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgc3RhcnQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSksXG4gICAgICAgIF07XG4gICAgICAgIG1vbGRTaGFwZS50ZW1wTGluZXMgPSBbWzAsIDFdLCBbMSwgMl0sIFsyLCAzXSwgWzMsIDBdXTtcbiAgICAgICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFsuLi5tb2xkU2hhcGUudmVydGljZXMsXG4gICAgICAgICAgICAuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoLXBsYXRmb3JtVGhpY2tuZXNzKSkpLFxuICAgICAgICBdO1xuICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXG4gICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcyxcbiAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLm1hcChzZWcgPT4gW3NlZ1swXSArIDQsIHNlZ1sxXSArIDRdKSxcbiAgICAgICAgICAgICAgICBbMCwgNF0sIFsxLCA1XSwgWzIsIDZdLCBbMywgN10sXG4gICAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgfVxufVxuY29uc3QgQ29sdW1uU3RlcFRvbGVyYW5jZSA9IDEgLyAxMDtcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUhhbmRyYWlsU2hhcGUoc3RhaXJQYXJhbSwgc2VnbWVudHMpIHtcbiAgICBjb25zdCB7IGhhbmRyYWlsOiB7IHN1cHBvcnQsIGhlaWdodCwgY29sdW1uOiB7IHN0ZXAsIHBhcmFtOiBjb2x1bW5QYXJhbSB9IH0gfSA9IHN0YWlyUGFyYW07XG4gICAgaWYgKHNlZ21lbnRzLmxlbmd0aCAmJiBzdXBwb3J0KSB7XG4gICAgICAgIGNvbnN0IGhhbmRyYWlscyA9IFtdO1xuICAgICAgICBjb25zdCB1blZpc2l0ZWQgPSBuZXcgU2V0KHNlZ21lbnRzKTtcbiAgICAgICAgY29uc3QgdmlzaXRlZCA9IG5ldyBNYXAoKTtcbiAgICAgICAgZm9yIChjb25zdCBzZWdtZW50IG9mIHNlZ21lbnRzKSB7XG4gICAgICAgICAgICBpZiAoIXNlZ21lbnQubW9sZFNoYXBlLnRlbXBMaW5lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmlzaXRlZC5zZXQoc2VnbWVudC5wYXJhbS5pbmRleCwgeyBsZWZ0OiBmYWxzZSwgcmlnaHQ6IGZhbHNlLCBsaW5lM2RJbmRleGVzOiBuZXcgU2V0KCkgfSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGN1cnJlbnQgPSBbe1xuICAgICAgICAgICAgICAgIHNlZ21lbnQ6IHNlZ21lbnRzWzBdLFxuICAgICAgICAgICAgICAgIGxpbmUzZEluZDogZ2V0U2VnbWVudFN0YXJ0QW5kQmFzZUxpbmUzZChzZWdtZW50c1swXSwgc2VnbWVudHMpLnN0YXJ0TGluZS5saW5lM2RJbmQsXG4gICAgICAgICAgICAgICAgbGVmdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgc3RhcnQ6IHRydWUsXG4gICAgICAgICAgICB9XTtcbiAgICAgICAgbGV0IGhhbmRyYWlsID0geyByYWlsOiBbXSwgY29sdW1uczogW10gfTtcbiAgICAgICAgY29uc3Qgc3RlcFRvbGVyYW5jZSA9IHN0ZXAgKiBDb2x1bW5TdGVwVG9sZXJhbmNlO1xuICAgICAgICB3aGlsZSAoY3VycmVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBuZXh0ID0gW107XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHsgc2VnbWVudDogY3VycmVudFNlZ21lbnQsIGxpbmUzZEluZCwgc3RhcnRQb2ludCwgbGVmdCB9IG9mIGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IHBhcmFtOiB7IGluZGV4LCB0eXBlLCBzdGFydFdpZHRoLCBlbmRXaWR0aCwgaG9yaXpvbnRhbFN0ZXAsIHZlcnRpY2FsU3RlcCwgdXB3YXJkIH0sIHN0YXJ0LCBlbmQsIHN0YXJ0SGVpZ2h0LCBlbmRIZWlnaHQsIG1vbGRTaGFwZTogeyB2ZXJ0aWNlczogbW9sZFZlcnRpY2VzLCB0ZW1wTGluZXM6IG1vbGRUZW1wTGluZXMsIHN0ZXBDb3VudCB9LCBuZXh0Q29tcG9uZW50cywgYmFzZUNvbXBvbmVudCwgY2lyY2xlVGFuZ2VudCwgc3RhcnRMb2NrZWQsIGNvbXBvbmVudERpcmVjdGlvblR5cGUsIGNpcmN1bGFyU2lkZSwgfSA9IGN1cnJlbnRTZWdtZW50O1xuICAgICAgICAgICAgICAgIHVuVmlzaXRlZC5kZWxldGUoY3VycmVudFNlZ21lbnQpO1xuICAgICAgICAgICAgICAgIGlmICghc3RhcnRMb2NrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKCghc3RhcnRMb2NrZWQgJiYgdHlwZSAhPT0gQ29tcG9uZW50VHlwZS5DaXJjdWxhclN0YWlyKSB8fCAoIWNpcmNsZVRhbmdlbnQgJiYgdHlwZSA9PT0gQ29tcG9uZW50VHlwZS5DaXJjdWxhclN0YWlyKSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RlcEhlaWdodCA9IHVwd2FyZCA/IHZlcnRpY2FsU3RlcCA6IC12ZXJ0aWNhbFN0ZXA7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2Zmc2V0TGVuZ3RoID0gTWF0aC5tYXgoY29sdW1uUGFyYW0uaGVpZ2h0IHx8IDAsIGNvbHVtblBhcmFtLndpZHRoIHx8IDAsIGNvbHVtblBhcmFtLnJhZGl1cyB8fCAwKSAqIDM7XG4gICAgICAgICAgICAgICAgY29uc3QgYmFzZVNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleChzZWdtZW50cywgYmFzZUNvbXBvbmVudCA9PT0gbnVsbCB8fCBiYXNlQ29tcG9uZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBiYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICBjb25zdCB7IHN0YXJ0TGluZTogeyBsaW5lM2RJbmQ6IHN0YXJ0TGluZTNkSW5kIH0sIGJhc2VMaW5lOiB7IGRpcjogYmFzZUxpbmUzZERpciwgZW5kOiBiYXNlTGluZTNkRW5kIH0sIH0gPSBnZXRTZWdtZW50U3RhcnRBbmRCYXNlTGluZTNkKGN1cnJlbnRTZWdtZW50LCBzZWdtZW50cywgYmFzZVNlZ21lbnQpO1xuICAgICAgICAgICAgICAgIC8vIGxldCBiYXNlTGluZTNkRGlyOiBLVmVjdG9yM2QgfCB1bmRlZmluZWQgPSBiYXNlQ29tcG9uZW50Py5saW5lM2QgPyBiYXNlQ29tcG9uZW50LmxpbmUzZC5lbmQuc3VidHJhY3RlZChiYXNlQ29tcG9uZW50LmxpbmUzZC5zdGFydCkubm9ybWFsaXplZCgpIDogRGlyZWN0aW9uWDtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydFRvRW5kRGlyID0gZW5kLnN1YnRyYWN0ZWQoc3RhcnQpLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICBsZXQgZnJvbnREaXIgPSBjaXJjbGVUYW5nZW50ID8gY2lyY2xlVGFuZ2VudCA6IHN0YXJ0VG9FbmREaXI7XG4gICAgICAgICAgICAgICAgY29uc3QgYW5nbGUgPSBmcm9udERpci5hbmdsZShiYXNlTGluZTNkRGlyKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkZWx0YUFuZ2xlID0gTWF0aC5hYnMoYW5nbGUgLSBNYXRoLlBJIC8gMik7XG4gICAgICAgICAgICAgICAgaWYgKGRlbHRhQW5nbGUgPD0gRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgZnJvbnREaXIgPSBiYXNlTGluZTNkRGlyLmNyb3NzKERpcmVjdGlvblopLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGxlZnREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKGZyb250RGlyKTtcbiAgICAgICAgICAgICAgICBsZXQgc3AgPSBzdGFydC5hZGRlZChsZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIgKiAobGVmdCA/IDEgOiAtMSkpKTtcbiAgICAgICAgICAgICAgICBsZXQgZXAgPSBlbmQuYWRkZWQobGVmdERpci5tdWx0aXBsaWVkKGVuZFdpZHRoIC8gMiAqIChsZWZ0ID8gMSA6IC0xKSkpO1xuICAgICAgICAgICAgICAgIGxldCBsYXN0TGVuZ3RoID0gc3AuZGlzdGFuY2VUbyhlcCk7XG4gICAgICAgICAgICAgICAgbGV0IHNwVG9FcERpciA9IGVwLnN1YnRyYWN0ZWQoc3ApLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICBsZXQgbmV4dFN0YXJ0UG9pbnQgPSBsZWZ0ID8gc3AgOiBlcDtcbiAgICAgICAgICAgICAgICBsZXQgcHVzaEVuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy8gbGV0IHNpYmxpbmdTZWdtZW50SW5kcyA9IGJhc2VTZWdtZW50Py5uZXh0Q29tcG9uZW50c1tiYXNlQ29tcG9uZW50Py5saW5lM2RJbmRleCB8fCAwXTtcbiAgICAgICAgICAgICAgICAvLyBsZXQgbmV4dFNpYmxpbmdTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgoc2VnbWVudHMsIFsuLi5zaWJsaW5nU2VnbWVudEluZHMgfHwgW11dPy5maW5kKGluZCA9PiB7XG4gICAgICAgICAgICAgICAgLy8gICAgIGNvbnN0IHZpc2l0ZWRTaWJsaW5nID0gdmlzaXRlZC5nZXQoaW5kKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgcmV0dXJuICF2aXNpdGVkU2libGluZztcbiAgICAgICAgICAgICAgICAvLyB9KSk7XG4gICAgICAgICAgICAgICAgLy8gY29uc3QgdmlzaXRlZEJhc2VTZWdtZW50ID0gYmFzZVNlZ21lbnQgPyB2aXNpdGVkLmdldChiYXNlU2VnbWVudC5wYXJhbS5pbmRleCkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgY29uc3QgbGluZTNkRGlyID0gbW9sZFZlcnRpY2VzW21vbGRUZW1wTGluZXNbbGluZTNkSW5kXVsxXV0uc3VidHJhY3RlZChtb2xkVmVydGljZXNbbW9sZFRlbXBMaW5lc1tsaW5lM2RJbmRdWzBdXSkubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgIGxldCBvZmZzZXREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKGxpbmUzZERpcik7XG4gICAgICAgICAgICAgICAgY29uc3QgdmlzaXRlZFJlY29yZCA9IHZpc2l0ZWQuZ2V0KGluZGV4KTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsaW5lM2QgPSBtb2xkVGVtcExpbmVzW2xpbmUzZEluZF07XG4gICAgICAgICAgICAgICAgICAgIHNwID0gc3RhcnRQb2ludCB8fCBtb2xkVmVydGljZXNbbGluZTNkWzBdXTtcbiAgICAgICAgICAgICAgICAgICAgZXAgPSBtb2xkVmVydGljZXNbbGluZTNkWzFdXTtcbiAgICAgICAgICAgICAgICAgICAgbGFzdExlbmd0aCA9IHNwLmRpc3RhbmNlVG8oZXApO1xuICAgICAgICAgICAgICAgICAgICBzcFRvRXBEaXIgPSBlcC5zdWJ0cmFjdGVkKHNwKS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRMaW5lM2RJbmQgPSAobGluZTNkSW5kICsgMSkgJSBtb2xkVGVtcExpbmVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmlzaXRlZExpbmUzZEluZGV4ZXMgPSB2aXNpdGVkUmVjb3JkID09PSBudWxsIHx8IHZpc2l0ZWRSZWNvcmQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZpc2l0ZWRSZWNvcmQubGluZTNkSW5kZXhlcztcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNFbnRyYW5jZSA9ICh2aXNpdGVkTGluZTNkSW5kZXhlcyA9PT0gbnVsbCB8fCB2aXNpdGVkTGluZTNkSW5kZXhlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmlzaXRlZExpbmUzZEluZGV4ZXMuaGFzKGxpbmUzZEluZCkpICYmICh2aXNpdGVkTGluZTNkSW5kZXhlcyA9PT0gbnVsbCB8fCB2aXNpdGVkTGluZTNkSW5kZXhlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmlzaXRlZExpbmUzZEluZGV4ZXMuaGFzKG5leHRMaW5lM2RJbmQpKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgY3VycmVudFN0YXJ0TGluZTNkSW5kZXggPSBnZXRTZWdtZW50U3RhcnRBbmRCYXNlTGluZTNkKGN1cnJlbnRTZWdtZW50LCBzZWdtZW50cykuc3RhcnRMaW5lLmxpbmUzZEluZDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzRW50cmFuY2VTZWdtZW50ID0gbGluZTNkSW5kID09PSBzdGFydExpbmUzZEluZDtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgbmV4dFNlZ21lbnRJbmRleGVzID0gbmV4dENvbXBvbmVudHNbbGluZTNkSW5kXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5lYXJlc3RTZWdtZW50O1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG5leHRTZWdtZW50SW5kZXggb2YgbmV4dENvbXBvbmVudHNbbGluZTNkSW5kXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dFNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleChzZWdtZW50cywgbmV4dFNlZ21lbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHN0YXJ0IH0gPSBuZXh0U2VnbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkcyA9IHN0YXJ0LmRpc3RhbmNlVG8oc3ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlID0gc3RhcnQuZGlzdGFuY2VUbyhlcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmlzaXROZXh0UmVjb3JkID0gdmlzaXRlZC5nZXQobmV4dFNlZ21lbnQucGFyYW0uaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRDb21wb25lbnRTdGFydExpbmUzZEluZCA9IGdldFNlZ21lbnRTdGFydEFuZEJhc2VMaW5lM2QobmV4dFNlZ21lbnQsIHNlZ21lbnRzKS5zdGFydExpbmUubGluZTNkSW5kO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0VxdWFsKGRzICsgZGUsIGxhc3RMZW5ndGgpICYmICEodmlzaXROZXh0UmVjb3JkID09PSBudWxsIHx8IHZpc2l0TmV4dFJlY29yZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmlzaXROZXh0UmVjb3JkLnJpZ2h0KSAmJiAhKHZpc2l0TmV4dFJlY29yZCA9PT0gbnVsbCB8fCB2aXNpdE5leHRSZWNvcmQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZpc2l0TmV4dFJlY29yZC5saW5lM2RJbmRleGVzLmhhcyhuZXh0Q29tcG9uZW50U3RhcnRMaW5lM2RJbmQpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5lYXJlc3RTZWdtZW50IHx8IG5lYXJlc3RTZWdtZW50LmRpc3RhbmNlID4gZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lYXJlc3RTZWdtZW50ID0geyBzZWdtZW50OiBuZXh0U2VnbWVudCwgZGlzdGFuY2U6IGRzIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IGxhc3REaXN0YW5jZSA9IGxhc3RMZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZWFyZXN0U2VnbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgeyBtb2xkU2hhcGU6IHsgdmVydGljZXM6IG5lYXJlc3RWZXJ0aWNlcywgdGVtcExpbmVzOiBuZWFyZXN0VGVtcExpbmVzIH0gfSA9IG5lYXJlc3RTZWdtZW50LnNlZ21lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGVuZE9uQmFzZUxpbmUgfSA9IGdldFNlZ21lbnRTdGFydEFuZEJhc2VMaW5lM2QobmVhcmVzdFNlZ21lbnQuc2VnbWVudCwgc2VnbWVudHMpLnN0YXJ0TGluZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IG5lYXJlc3RMaW5lM2QgPSBuZWFyZXN0U2VnbWVudC5zZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gPyBuZWFyZXN0VGVtcExpbmVzW25lYXJlc3RMaW5lM2RJbmRdIDogbmVhcmVzdFRlbXBMaW5lc1swXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IG5lYXJlc3RMaW5lM2REaXIgPSBuZWFyZXN0VmVydGljZXNbbmVhcmVzdExpbmUzZFsxXV0uc3VidHJhY3RlZChuZWFyZXN0VmVydGljZXNbbmVhcmVzdExpbmUzZFswXV0pLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVwID0gZW5kT25CYXNlTGluZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVwID0gbmVhcmVzdFZlcnRpY2VzW25lYXJlc3RMaW5lM2RbMV1dO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3BUb0VwRGlyID0gZXAuc3VidHJhY3RlZChzcCkubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwVG9FcERpci5kb3QobGluZTNkRGlyKSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0RGlzdGFuY2UgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hFbmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U3RhcnRQb2ludCA9IHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdERpc3RhbmNlID0gc3AuZGlzdGFuY2VUbyhlcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFN0YXJ0UG9pbnQgPSBpc1BsYXRmb3JtKG5lYXJlc3RTZWdtZW50LnNlZ21lbnQpID8gZXAgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBsYXN0TGVuZ3RoID0gc3AuZGlzdGFuY2VUbyhlcCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNFbnRyYW5jZSAmJiBoYXNFbnRyYW5jZVNlZ21lbnQgJiYgYmFzZVNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHsgbGluZTNkOiBiYXNlTGluZTNkLCBkaXI6IGJhc2VMaW5lM2REaXIgfSA9IGdldFNlZ21lbnRTdGFydEFuZEJhc2VMaW5lM2QoY3VycmVudFNlZ21lbnQsIHNlZ21lbnRzLCBiYXNlU2VnbWVudCkuYmFzZUxpbmU7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCB7IG1vbGRTaGFwZTogeyB2ZXJ0aWNlczogYmFzZVZlcnRpY2VzLCB0ZW1wTGluZXM6IGJhc2VUZW1wTGluZXMgfSB9ID0gYmFzZVNlZ21lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBiYXNlTGluZTNkID0gYmFzZVNlZ21lbnQucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSA/IGJhc2VUZW1wTGluZXNbYmFzZUNvbXBvbmVudD8ubGluZTNkSW5kZXggfHwgMF0gOiBiYXNlVGVtcExpbmVzW2Jhc2VUZW1wTGluZXMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBiYXNlTGluZTNkRGlyID0gYmFzZVZlcnRpY2VzW2Jhc2VMaW5lM2RbMV1dLnN1YnRyYWN0ZWQoYmFzZVZlcnRpY2VzW2Jhc2VMaW5lM2RbMF1dKS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAoYmFzZVNlZ21lbnQucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSAmJiBuZXh0U2libGluZ1NlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAvLyBkb24ndCBjYXJlIGJlY2F1c2UgbmV4dCBpcyBwbGF0Zm9ybSAobmV4dCB3aWxsIGRlYWwgdGhlIGNhc2UpIG9yIHN0YWlyIChvbmx5IGhhdmUgb25lIG5leHRDb21wb25lbnQgd2hpY2ggaXMgY3VycmVudFNlZ21lbnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgY29uc3QgeyBzdGFydDogbmV4dFNpYmxpbmdTZWdtZW50U3RhcnRMaW5lU3RhcnQgfSA9IGdldFNlZ21lbnRTdGFydEFuZEJhc2VMaW5lM2QobmV4dFNpYmxpbmdTZWdtZW50LCBzZWdtZW50cywgYmFzZVNlZ21lbnQpLnN0YXJ0TGluZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBlcCA9IG5leHRTaWJsaW5nU2VnbWVudFN0YXJ0TGluZVN0YXJ0O1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIC8vIGlmIChuZXh0U2libGluZ1NlZ21lbnQucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIC8vICAgICBjb25zdCBuZXh0U2libGluZ1NlZ1N0YXJ0TGluZTNkID0gbmV4dFNpYmxpbmdTZWdtZW50Lm1vbGRTaGFwZS50ZW1wTGluZXNbZ2V0U2VnbWVudFN0YXJ0QW5kQmFzZUxpbmUzZChuZXh0U2libGluZ1NlZ21lbnQsIHNlZ21lbnRzKS5zdGFydExpbmUubGluZTNkSW5kXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAvLyAgICAgZXAgPSBuZXh0U2libGluZ1NlZ21lbnQubW9sZFNoYXBlLnZlcnRpY2VzW25leHRTaWJsaW5nU2VnU3RhcnRMaW5lM2RbMV1dO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIC8vIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgLy8gICAgIGVwID0gbmV4dFNpYmxpbmdTZWdtZW50LnN0YXJ0LmFkZGVkKGJhc2VMaW5lM2REaXIubXVsdGlwbGllZCgtbmV4dFNpYmxpbmdTZWdtZW50LnBhcmFtLnN0YXJ0V2lkdGggLyAyKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVwID0gYmFzZUxpbmUzZEVuZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNwVG9FcERpciA9IGVwLnN1YnRyYWN0ZWQoc3ApLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcFRvRXBEaXIuZG90KGJhc2VMaW5lM2REaXIpID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3REaXN0YW5jZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaEVuZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRDb3JuZXJEaXN0YW5jZSA9IGVwLmRpc3RhbmNlVG8oc3ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0Q29ybmVyRGlzdGFuY2UgPiBvZmZzZXRMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFN0YXJ0UG9pbnQgPSBzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTdGFydFBvaW50ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3REaXN0YW5jZSA9IHNwLmRpc3RhbmNlVG8oZXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTdGFydFBvaW50ID0gaXNQbGF0Zm9ybShiYXNlU2VnbWVudCkgPyBlcCA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpc0VudHJhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0RGlzdGFuY2UgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHVzaEVuZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHVzaEVuZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIHNwVG9FcERpciA9IGVwLnN1YnRyYWN0ZWQoc3ApLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlyc3RCb3R0b21QdCA9IHNwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCkpLmFkZGVkKG9mZnNldERpci5tdWx0aXBsaWVkKG9mZnNldExlbmd0aCkpLmFkZGVkKHNwVG9FcERpci5tdWx0aXBsaWVkKHN0YXJ0UG9pbnQgPyAwIDogb2Zmc2V0TGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXN0RGlzdGFuY2UgPiAwIHx8IChsYXN0RGlzdGFuY2UgPT09IDAgJiYgIXN0YXJ0UG9pbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwdXNoIHJhaWxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsLnJhaWwucHVzaChmaXJzdEJvdHRvbVB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gcHVzaCBjb2x1bW5zXG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXN0RGlzdGFuY2UgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcERpc3RhbmNlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0ZW1wRGlzdGFuY2UgPD0gbGFzdERpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNFbmQgPSB0ZW1wRGlzdGFuY2UgPT09IGxhc3REaXN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBib3R0b21Qb2ludCA9IHRlbXBEaXN0YW5jZSA+IDAgPyBzcC5hZGRlZChzcFRvRXBEaXIubXVsdGlwbGllZCh0ZW1wRGlzdGFuY2UpKS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKS5hZGRlZChvZmZzZXREaXIubXVsdGlwbGllZChvZmZzZXRMZW5ndGgpKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0Qm90dG9tUHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWwuY29sdW1ucy5wdXNoKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tUG9pbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbVBvaW50LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNFbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWwucmFpbC5wdXNoKGJvdHRvbVBvaW50LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlbHRhRGlzdGFuY2UgPSAobGFzdERpc3RhbmNlIC0gdGVtcERpc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRGlzdGFuY2UgKz0gKGRlbHRhRGlzdGFuY2UgPD0gKHN0ZXAgKyBzdGVwVG9sZXJhbmNlKSAmJiBkZWx0YURpc3RhbmNlID49IHN0ZXBUb2xlcmFuY2UpID8gKHB1c2hFbmQgPyBkZWx0YURpc3RhbmNlIDogSW5maW5pdHkpIDogc3RlcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBpZiAocHVzaEVuZCAmJiAobmVhcmVzdFNlZ21lbnQgfHwgKGlzRW50cmFuY2UgJiYgbGFzdERpc3RhbmNlID4gMCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAvLyBwdXNoIHJhaWxcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGhhbmRyYWlsLnJhaWwucHVzaChlcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBoZWlnaHQpKS5hZGRlZChvZmZzZXREaXIubXVsdGlwbGllZChvZmZzZXRMZW5ndGgpKSk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBpZiAodGVtcERpc3RhbmNlIC0gc3RlcCA8IGxhc3REaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNvbnN0IGxhc3RCb3R0b21Qb2ludCA9IHNwLmFkZGVkKHNwVG9FcERpci5tdWx0aXBsaWVkKGxhc3REaXN0YW5jZSkpLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCkpLmFkZGVkKG9mZnNldERpci5tdWx0aXBsaWVkKG9mZnNldExlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGhhbmRyYWlsLmNvbHVtbnMucHVzaChbXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGxhc3RCb3R0b21Qb2ludCxcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgbGFzdEJvdHRvbVBvaW50LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSxcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICBpZiAobmVhcmVzdFNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudDogbmVhcmVzdFNlZ21lbnQuc2VnbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lM2RJbmQ6IGdldFNlZ21lbnRTdGFydEFuZEJhc2VMaW5lM2QobmVhcmVzdFNlZ21lbnQuc2VnbWVudCwgc2VnbWVudHMpLnN0YXJ0TGluZS5saW5lM2RJbmQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0UG9pbnQ6IG5leHRTdGFydFBvaW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNFbnRyYW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiYXNlU2VnbWVudCAmJiBoYXNFbnRyYW5jZVNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2libGluZ1NlZ21lbnRJbmRzID0gYmFzZVNlZ21lbnQubmV4dENvbXBvbmVudHNbYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIChuZXh0U2libGluZ1NlZ21lbnQgJiYgYmFzZVNlZ21lbnQucGFyYW0udHlwZSAhPT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgLy8gbmV2ZXIgaGFwcGVuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBuZXh0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIHNlZ21lbnQ6IG5leHRTaWJsaW5nU2VnbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBsaW5lM2RJbmQ6IGdldFNlZ21lbnRTdGFydEFuZEJhc2VMaW5lM2QobmV4dFNpYmxpbmdTZWdtZW50LCBzZWdtZW50cykuc3RhcnRMaW5lLmxpbmUzZEluZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBsZWZ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBzdGFydDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgc3RhcnRQb2ludDogbmV4dFN0YXJ0UG9pbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKCh2aXNpdGVkQmFzZVNlZ21lbnQ/LnJpZ2h0ICYmICF2aXNpdGVkQmFzZVNlZ21lbnQubGVmdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQ6IGJhc2VTZWdtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZTNkSW5kOiBiYXNlU2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtID8gKGJhc2VDb21wb25lbnQgPT09IG51bGwgfHwgYmFzZUNvbXBvbmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleCkgfHwgMCA6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRQb2ludDogbmV4dFN0YXJ0UG9pbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVuZCBvZiB0aGlzIHBhdGNoLCB0aGUgcGF0Y2ggYXJlIHN0YXJ0IHdpdGggcGxhdGZvcm1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWxzLnB1c2goaGFuZHJhaWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbCA9IHsgcmFpbDogW10sIGNvbHVtbnM6IFtdIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZW5kIG9mIHRoaXMgbGluZTNkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudDogY3VycmVudFNlZ21lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUzZEluZDogbmV4dExpbmUzZEluZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZpc2l0ZWRMaW5lM2RJbmRleGVzID09PSBudWxsIHx8IHZpc2l0ZWRMaW5lM2RJbmRleGVzID09PSB2b2lkIDAgPyB2b2lkIDAgOiB2aXNpdGVkTGluZTNkSW5kZXhlcy5hZGQobGluZTNkSW5kKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29sdW1uQWN0dWFsSGVpZ2h0ID0gaGVpZ2h0ICsgdmVydGljYWxTdGVwIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNSaWdodFN0YWlyID0gY29tcG9uZW50RGlyZWN0aW9uVHlwZSA9PT0gQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5SaWdodDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNMZWZ0U3RhaXIgPSBjb21wb25lbnREaXJlY3Rpb25UeXBlID09PSBDb21wb25lbnREaXJlY3Rpb25UeXBlLkxlZnQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YWlyUmFpbCA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFpckNvbHVtbnMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29ybmVyQmFzZURpciA9ICghbGVmdCAmJiBpc1JpZ2h0U3RhaXIpIHx8IChsZWZ0ICYmIGlzTGVmdFN0YWlyKSA/IGxlZnREaXIgOiBiYXNlTGluZTNkRGlyO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29ybmVyU3RhcnRIZWlnaHQgPSBsZWZ0ID8gZW5kSGVpZ2h0IDogc3RhcnRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb3JuZXJTaWRlV2lkdGggPSBsZWZ0ID8gZW5kV2lkdGggOiBzdGFydFdpZHRoO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2lkZUNvcm5lclN0YXJ0ID0gbGVmdCA/IGVuZCA6IHN0YXJ0O1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29ybmVyRW5kID0gc2lkZUNvcm5lclN0YXJ0LmFkZGVkKGNvcm5lckJhc2VEaXIubXVsdGlwbGllZCgoY29ybmVyU2lkZVdpZHRoIC8gMiArIG9mZnNldExlbmd0aCkgKiAobGVmdCA/IDEgOiAtMSkpKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvcm5lckRpc3RhbmNlID0gKHN0YXJ0UG9pbnQgfHwgc3ApLmRpc3RhbmNlVG8oY29ybmVyRW5kKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gYWxvbmcgY29ybmVyQmFzZURpclxuICAgICAgICAgICAgICAgICAgICBsZXQgY29ybmVyU3BUb0VwRGlyID0gY29ybmVyRW5kLnN1YnRyYWN0ZWQoc3RhcnRQb2ludCB8fCBzcCkubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29ybmVyT2Zmc2V0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhjb3JuZXJTcFRvRXBEaXIpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29ybmVyQWRkaXRpb25hbEhlaWdodCA9ICFsZWZ0ICYmICFpc0xlZnRTdGFpciAmJiB1cHdhcmQgPyBzdGVwSGVpZ2h0IDogMDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVhZENvcm5lclJhaWwgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVhZENvcm5lckNvbHVtbnMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXJ0UG9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wSGVhZERpc3RhbmNlID0gc3RlcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRDb3JuZXJSYWlsLnB1c2goc3RhcnRQb2ludC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoY29ybmVyU3RhcnRIZWlnaHQgKyBjb3JuZXJBZGRpdGlvbmFsSGVpZ2h0ICsgaGVpZ2h0KSkuYWRkZWQoY29ybmVyT2Zmc2V0RGlyLm11bHRpcGxpZWQob2Zmc2V0TGVuZ3RoKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHRlbXBIZWFkRGlzdGFuY2UgPCBjb3JuZXJEaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvdHRvbVBvaW50ID0gc3RhcnRQb2ludC5hZGRlZChjb3JuZXJTcFRvRXBEaXIubXVsdGlwbGllZCh0ZW1wSGVhZERpc3RhbmNlKSkuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGNvcm5lclN0YXJ0SGVpZ2h0ICsgY29ybmVyQWRkaXRpb25hbEhlaWdodCkpLmFkZGVkKGNvcm5lck9mZnNldERpci5tdWx0aXBsaWVkKG9mZnNldExlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRDb3JuZXJDb2x1bW5zLnB1c2goW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b21Qb2ludCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tUG9pbnQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBIZWFkRGlzdGFuY2UgKz0gc3RlcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbGVmdCAmJiBpc0xlZnRTdGFpcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RCb3R0b21Qb2ludCA9IGNvcm5lckVuZC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoY29ybmVyU3RhcnRIZWlnaHQgKyBjb3JuZXJBZGRpdGlvbmFsSGVpZ2h0KSkuYWRkZWQoY29ybmVyT2Zmc2V0RGlyLm11bHRpcGxpZWQob2Zmc2V0TGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHVzaCByYWlsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZENvcm5lclJhaWwucHVzaChsYXN0Qm90dG9tUG9pbnQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGNvcm5lckRpc3RhbmNlIC0gdGVtcEhlYWREaXN0YW5jZSArIHN0ZXApID4gc3RlcFRvbGVyYW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBsYXN0Qm90dG9tUG9pbnQgPSBlcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQobGVmdCA/IGVuZEhlaWdodCA6IHN0YXJ0SGVpZ2h0KSkuYWRkZWQoY29ybmVyT2Zmc2V0RGlyLm11bHRpcGxpZWQob2Zmc2V0TGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGhhbmRyYWlsLnJhaWwucHVzaChsYXN0Qm90dG9tUG9pbnQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZENvcm5lckNvbHVtbnMucHVzaChbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0Qm90dG9tUG9pbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0Qm90dG9tUG9pbnQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbmV4dFN0YXJ0UG9pbnQgPSBsZWZ0ID8gc3AgOiBlcDtcbiAgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBzZWdtZW50IHN0YXJ0V2lkdGggIT09IGN1cnJlbnRTZWdtZW50IGVuZFdpZHRoXG4gICAgICAgICAgICAgICAgICAgIHB1c2hFbmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgcmVhc29uYWJsZVN0ZXAgPSBNYXRoLmNlaWwoc3RlcCAvIGhvcml6b250YWxTdGVwKSAqIGhvcml6b250YWxTdGVwO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWFzb25hYmxlU3RlcENvdW50ID0gTWF0aC5jZWlsKHN0ZXAgLyBob3Jpem9udGFsU3RlcCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wU3RlcENvdW50ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJjQ2hvcmRBbmdsZSA9IGNpcmNsZVRhbmdlbnQgPyBzdGFydFRvRW5kRGlyLmFuZ2xlKGNpcmNsZVRhbmdlbnQpIDogMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpciB8fCAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5DaXJjdWxhclN0YWlyICYmIChhcmNDaG9yZEFuZ2xlIDw9IERpcmVjdGlvbkFuZ2xlVG9sZXJhbmNlIHx8ICFjaXJjbGVUYW5nZW50KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RMZW5ndGggPSBzcC5kaXN0YW5jZVRvKGVwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHB1c2ggcmFpbFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGRlbHRhQW5nbGUgPiBEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGNvbnN0IGNvcm5lckJvdHRvbVB0ID0gc3AuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkuYWRkZWQoYmFzZUxpbmUzZERpci5tdWx0aXBsaWVkKChzdGFydFdpZHRoIC8gMiAtIG9mZnNldExlbmd0aCkgKiAobGVmdCA/IDEgOiAtMSkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBzdGFpclJhaWwucHVzaChjb3JuZXJCb3R0b21QdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHN0YWlyQ29sdW1ucy5wdXNoKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgY29ybmVyQm90dG9tUHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNvcm5lckJvdHRvbVB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyUmFpbC5wdXNoKHNwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIGhlaWdodCArICh1cHdhcmQgPyAxIDogMCkgKiBzdGVwSGVpZ2h0KSkuYWRkZWQobGVmdERpci5tdWx0aXBsaWVkKGxlZnQgPyAtb2Zmc2V0TGVuZ3RoIDogb2Zmc2V0TGVuZ3RoKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF1cHdhcmQgJiYgc3RlcENvdW50ID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyUmFpbC5wdXNoKHNwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIGhlaWdodCkpLmFkZGVkKGZyb250RGlyLm11bHRpcGxpZWQoaG9yaXpvbnRhbFN0ZXApKS5hZGRlZChsZWZ0RGlyLm11bHRpcGxpZWQobGVmdCA/IC1vZmZzZXRMZW5ndGggOiBvZmZzZXRMZW5ndGgpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwdXNoIGNvbHVtbnNcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxldCB0ZW1wRGlzdGFuY2UgPSBob3Jpem9udGFsU3RlcCAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAodGVtcFN0ZXBDb3VudCA8IHN0ZXBDb3VudCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJIb3JTdGVwRGlzdGFuY2UgPSAodGVtcFN0ZXBDb3VudCArIDAuNSkgKiBob3Jpem9udGFsU3RlcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJWZXJTdGVwRGlzdGFuY2UgPSAodGVtcFN0ZXBDb3VudCArICh1cHdhcmQgPyAxIDogMCkpICogc3RlcEhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBib3R0b21Qb2ludCA9IHNwLmFkZGVkKGZyb250RGlyLm11bHRpcGxpZWQoY3VySG9yU3RlcERpc3RhbmNlKSkuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0ICsgY3VyVmVyU3RlcERpc3RhbmNlKSkuYWRkZWQobGVmdERpci5tdWx0aXBsaWVkKGxlZnQgPyAtb2Zmc2V0TGVuZ3RoIDogb2Zmc2V0TGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJDb2x1bW5zLnB1c2goW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b21Qb2ludCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tUG9pbnQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKCF1cHdhcmQgJiYgdGVtcFN0ZXBDb3VudCA9PT0gMCA/IGhlaWdodCA6IGNvbHVtbkFjdHVhbEhlaWdodCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHRlbXBTdGVwQ291bnQgPSBNYXRoLmZsb29yKHRlbXBEaXN0YW5jZSAvIGhvcml6b250YWxTdGVwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0ZW1wRGlzdGFuY2UgKz0gcmVhc29uYWJsZVN0ZXA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcFN0ZXBDb3VudCArPSByZWFzb25hYmxlU3RlcENvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0ZXBDb3VudCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodXB3YXJkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyUmFpbC5wdXNoKHNwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIGhlaWdodCArICh1cHdhcmQgPyBzdGVwQ291bnQgOiAoc3RlcENvdW50IC0gKHN0ZXBDb3VudCA+IDIgPyAyIDogMSkpKSAqIHN0ZXBIZWlnaHQpKS5hZGRlZChmcm9udERpci5tdWx0aXBsaWVkKChzdGVwQ291bnQgLSAxKSAqIGhvcml6b250YWxTdGVwKSkuYWRkZWQobGVmdERpci5tdWx0aXBsaWVkKGxlZnQgPyAtb2Zmc2V0TGVuZ3RoIDogb2Zmc2V0TGVuZ3RoKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRvdGFsTGVuZ3RoID0gTWF0aC5hYnMoZW5kLnN1YnRyYWN0ZWQoc3RhcnQpLmRvdChmcm9udERpcikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJldlRvdGFsU3RlcExlbmd0aCA9IChzdGVwQ291bnQgLSAxKSAqIGhvcml6b250YWxTdGVwO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdFN0ZXBMZW5ndGggPSBsYXN0TGVuZ3RoIC0gcHJldlRvdGFsU3RlcExlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyUmFpbC5wdXNoKHNwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIGhlaWdodCArICh1cHdhcmQgPyBzdGVwQ291bnQgOiAoTWF0aC5tYXgoMCwgdG90YWxMZW5ndGggLSBob3Jpem9udGFsU3RlcCkgLyBob3Jpem9udGFsU3RlcCkpICogc3RlcEhlaWdodCkpLmFkZGVkKGZyb250RGlyLm11bHRpcGxpZWQodG90YWxMZW5ndGgpKS5hZGRlZChsZWZ0RGlyLm11bHRpcGxpZWQobGVmdCA/IC1vZmZzZXRMZW5ndGggOiBvZmZzZXRMZW5ndGgpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGVtcFN0ZXBDb3VudCAtIHJlYXNvbmFibGVTdGVwQ291bnQgPD0gc3RlcENvdW50IC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RCb3R0b21Qb2ludCA9IHNwLmFkZGVkKGZyb250RGlyLm11bHRpcGxpZWQocHJldlRvdGFsU3RlcExlbmd0aCArIGxhc3RTdGVwTGVuZ3RoIC8gMikpLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChlbmRIZWlnaHQgKyAodXB3YXJkID8gMCA6IC1zdGVwSGVpZ2h0KSkpLmFkZGVkKGxlZnREaXIubXVsdGlwbGllZChsZWZ0ID8gLW9mZnNldExlbmd0aCA6IG9mZnNldExlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyQ29sdW1ucy5wdXNoKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdEJvdHRvbVBvaW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0Qm90dG9tUG9pbnQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCArICh1cHdhcmQgPyAwIDogKHZlcnRpY2FsU3RlcCAqICgxIC0gbGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcCAvIDIpKSkpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5leHQgc2VnbWVudCBzdGFydFdpZHRoICE9PSBjdXJyZW50U2VnbWVudCBlbmRXaWR0aFxuICAgICAgICAgICAgICAgICAgICAgICAgc3AgPSBsZWZ0ID8gc3RhcnQuYWRkZWQoYmFzZUxpbmUzZERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyIC0gb2Zmc2V0TGVuZ3RoKSkgOiBlbmQuYWRkZWQobGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMiArIG9mZnNldExlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNpcmNsZVRhbmdlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhbmdlbnRMZWZ0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhjaXJjbGVUYW5nZW50KS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFydEVuZERpc3RhbmNlID0gc3RhcnQuZGlzdGFuY2VUbyhlbmQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF4V2lkdGggPSBNYXRoLm1heChzdGFydFdpZHRoLCBlbmRXaWR0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbmRBbmdsZSA9IHN0YXJ0VG9FbmREaXIuYW5nbGVUbyhjaXJjbGVUYW5nZW50LCBEaXJlY3Rpb25aKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzTGVmdEFyYyA9IGNpcmN1bGFyU2lkZSA9PT0gQ2lyY3VsYXJTaWRlLkxlZnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbmRDb21wbGVtZW50YXJ5QW5nbGUgPSBpc0xlZnRBcmMgPyBNYXRoLmFicyhlbmRBbmdsZSAtIE1hdGguUEkgLyAyIC0gTWF0aC5QSSkgOiBNYXRoLmFicyhlbmRBbmdsZSAtIE1hdGguUEkgLyAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhbGZDaG9yZCA9IHN0YXJ0RW5kRGlzdGFuY2UgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmFkaXVzID0gaGFsZkNob3JkIC8gTWF0aC5jb3MoZW5kQ29tcGxlbWVudGFyeUFuZ2xlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlubmVyUmFkaXVzID0gcmFkaXVzIC0gbWF4V2lkdGggLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKHJhZGl1cyA8IG1heFdpZHRoIC8gMiAqIDEuMiB8fCBpbm5lclJhZGl1cyA8IGhvcml6b250YWxTdGVwIC8gMiAvIDAuOCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhvcml6b250YWxTdGVwQW5nbGUgPSBNYXRoLmFzaW4oaG9yaXpvbnRhbFN0ZXAgLyAyIC8gaW5uZXJSYWRpdXMpICogMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNpcmNsZU5vcm1hbCA9IGlzTGVmdEFyYyA/IERpcmVjdGlvblogOiBEaXJlY3Rpb25aLnJldmVyc2VkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjaXJjbGVDZW50ZXIgPSBzdGFydC5hZGRlZCh0YW5nZW50TGVmdERpci5tdWx0aXBsaWVkKGlzTGVmdEFyYyA/IHJhZGl1cyA6IC1yYWRpdXMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IGNpcmNsZSA9IEdlb21MaWIuY3JlYXRlQ2lyY2xlM2RCeUNlbnRlck5vcm1hbFJhZGl1cyhjaXJjbGVDZW50ZXIsIGNpcmNsZU5vcm1hbCwgcmFkaXVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFyYyA9IEdlb21MaWIuY3JlYXRlQXJjM2RCeUNlbnRlck5vcm1hbFJhZGl1cyhjaXJjbGVDZW50ZXIsIGNpcmNsZU5vcm1hbCwgcmFkaXVzLCBzdGFydCwgZW5kKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFyY0FuZ2xlID0gYXJjLmFyY0FuZ2xlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3Qgc3RlcENvdW50ID0gTWF0aC5jZWlsKGFyY0FuZ2xlIC8gaG9yaXpvbnRhbFN0ZXBBbmdsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0SG9yaXpvbnRhbEFuZ2xlID0gYXJjQW5nbGUgLSBob3Jpem9udGFsU3RlcEFuZ2xlICogKHN0ZXBDb3VudCAtIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgdmFsaWRTdGVwQ291bnQgPSAobGFzdEhvcml6b250YWxBbmdsZSA9PT0gMCB8fCBsYXN0SG9yaXpvbnRhbEFuZ2xlID4gQW5nbGVUb2xlcmFuY2UpID8gc3RlcENvdW50IDogc3RlcENvdW50IC0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIChob3Jpem9udGFsU3RlcEFuZ2xlID49IGFyY0FuZ2xlIHx8IGhvcml6b250YWxTdGVwQW5nbGUgPj0gTWF0aC5QSSAvIDIgfHwgdmFsaWRTdGVwQ291bnQgPj0gU3RlcENvdW50TGltaXQgfHwgdmFsaWRTdGVwQ291bnQgPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRSYWRpdXNEaXIgPSBpc0xlZnRBcmMgPyB0YW5nZW50TGVmdERpci5yZXZlcnNlZCgpIDogdGFuZ2VudExlZnREaXI7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAoZGVsdGFBbmdsZSA+IERpcmVjdGlvbkFuZ2xlVG9sZXJhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgY29uc3QgY29ybmVyQm90dG9tUHQgPSBzcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKS5hZGRlZChiYXNlTGluZTNkRGlyLm11bHRpcGxpZWQoKHN0YXJ0V2lkdGggLyAyIC0gb2Zmc2V0TGVuZ3RoKSAqIChsZWZ0ID8gMSA6IC0xKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHN0YWlyUmFpbC5wdXNoKGNvcm5lckJvdHRvbVB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgc3RhaXJDb2x1bW5zLnB1c2goW1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBjb3JuZXJCb3R0b21QdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgY29ybmVyQm90dG9tUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHVzaCBjb2x1bW5zXG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAodGVtcFN0ZXBDb3VudCA8IHN0ZXBDb3VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1clJvdGF0ZUFuZ2xlID0gaG9yaXpvbnRhbFN0ZXBBbmdsZSAqIHRlbXBTdGVwQ291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dFJvdGF0ZUFuZ2xlID0gaG9yaXpvbnRhbFN0ZXBBbmdsZSAqIHRlbXBTdGVwQ291bnQgKyAodGVtcFN0ZXBDb3VudCA9PT0gc3RlcENvdW50IC0gMSA/IGxhc3RIb3Jpem9udGFsQW5nbGUgOiBob3Jpem9udGFsU3RlcEFuZ2xlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJSb3RhdGVNYXRyaXggPSBHZW9tTGliLmNyZWF0ZVJvdGF0ZU1hdHJpeDQoaG9yaXpvbnRhbFN0ZXBBbmdsZSAqIHRlbXBTdGVwQ291bnQsIGNpcmNsZU5vcm1hbCwgZHVtbXlQb2ludDNkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0Um90YXRlTWF0cml4ID0gR2VvbUxpYi5jcmVhdGVSb3RhdGVNYXRyaXg0KG5leHRSb3RhdGVBbmdsZSwgY2lyY2xlTm9ybWFsLCBkdW1teVBvaW50M2QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1clJhZGl1c0RpciA9IHN0YXJ0UmFkaXVzRGlyLmFwcGxpZWRNYXRyaXg0KGN1clJvdGF0ZU1hdHJpeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dFJhZGl1c0RpciA9IHN0YXJ0UmFkaXVzRGlyLmFwcGxpZWRNYXRyaXg0KG5leHRSb3RhdGVNYXRyaXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1ckhhbGZXaWR0aCA9IChzdGFydFdpZHRoICsgKGVuZFdpZHRoIC0gc3RhcnRXaWR0aCkgKiAoY3VyUm90YXRlQW5nbGUpIC8gYXJjQW5nbGUpIC8gMiAqIChpc0xlZnRBcmMgPyAtMSA6IDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRIYWxmV2lkdGggPSAoc3RhcnRXaWR0aCArIChlbmRXaWR0aCAtIHN0YXJ0V2lkdGgpICogKG5leHRSb3RhdGVBbmdsZSkgLyBhcmNBbmdsZSkgLyAyICogKGlzTGVmdEFyYyA/IC0xIDogMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyTGVmdE1vbGRQdCA9IGNpcmNsZUNlbnRlci5hZGRlZChjdXJSYWRpdXNEaXIubXVsdGlwbGllZChyYWRpdXMgKyBjdXJIYWxmV2lkdGgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJSaWdodE1vbGRQdCA9IGNpcmNsZUNlbnRlci5hZGRlZChjdXJSYWRpdXNEaXIubXVsdGlwbGllZChyYWRpdXMgLSBjdXJIYWxmV2lkdGgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0TGVmdE1vbGRQdCA9IGNpcmNsZUNlbnRlci5hZGRlZChuZXh0UmFkaXVzRGlyLm11bHRpcGxpZWQocmFkaXVzICsgbmV4dEhhbGZXaWR0aCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRSaWdodE1vbGRQdCA9IGNpcmNsZUNlbnRlci5hZGRlZChuZXh0UmFkaXVzRGlyLm11bHRpcGxpZWQocmFkaXVzIC0gbmV4dEhhbGZXaWR0aCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1clN0ZXBMZWZ0RnJvbnREaXIgPSBuZXh0TGVmdE1vbGRQdC5zdWJ0cmFjdGVkKGN1ckxlZnRNb2xkUHQpLm11bHRpcGxpZWQoMC41KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJTdGVwUmlnaHRGcm9udERpciA9IG5leHRSaWdodE1vbGRQdC5zdWJ0cmFjdGVkKGN1clJpZ2h0TW9sZFB0KS5tdWx0aXBsaWVkKDAuNSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyU3RlcExlZnREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKGN1clN0ZXBMZWZ0RnJvbnREaXIpLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJTdGVwUmlnaHREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKGN1clN0ZXBSaWdodEZyb250RGlyKS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyTGVmdEJvdHRvbVB0ID0gY3VyTGVmdE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyAodGVtcFN0ZXBDb3VudCArICh1cHdhcmQgPyAxIDogMCkpICogc3RlcEhlaWdodCkpLmFkZGVkKGN1clN0ZXBMZWZ0RGlyLm11bHRpcGxpZWQoLW9mZnNldExlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1clJpZ2h0Qm90dG9tUHQgPSBjdXJSaWdodE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyAodGVtcFN0ZXBDb3VudCArICh1cHdhcmQgPyAxIDogMCkpICogc3RlcEhlaWdodCkpLmFkZGVkKGN1clN0ZXBSaWdodERpci5tdWx0aXBsaWVkKG9mZnNldExlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1ckxlZnRCb3R0b21NaWRQdCA9IGN1ckxlZnRCb3R0b21QdC5hZGRlZChjdXJTdGVwTGVmdEZyb250RGlyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJSaWdodEJvdHRvbU1pZFB0ID0gY3VyUmlnaHRCb3R0b21QdC5hZGRlZChjdXJTdGVwUmlnaHRGcm9udERpcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgYm90dG9tUG9pbnQgPSBzcC5hZGRlZChmcm9udERpci5tdWx0aXBsaWVkKHRlbXBEaXN0YW5jZSkpLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZW1wU3RlcENvdW50ID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHVzaCByYWlsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN0YWlyUmFpbC5wdXNoKHNwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIGhlaWdodCArICh1cHdhcmQgPyAxIDogMCkgKiBzdGVwSGVpZ2h0KSkuYWRkZWQobGVmdERpci5tdWx0aXBsaWVkKG9mZnNldExlbmd0aCkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxlZnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyUmFpbC5wdXNoKGN1ckxlZnRCb3R0b21QdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0ICsgKHRlbXBTdGVwQ291bnQgPiAwICYmICF1cHdhcmQgPyAtc3RlcEhlaWdodCA6IDApKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKCF1cHdhcmQgJiYgdGVtcFN0ZXBDb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGNvbnN0IG5leHRMZWZ0Qm90dG9tUHQgPSBuZXh0TGVmdE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyAodGVtcFN0ZXBDb3VudCArICh1cHdhcmQgPyAxIDogMCkpICogc3RlcEhlaWdodCkpLmFkZGVkKGN1clN0ZXBMZWZ0RGlyLm11bHRpcGxpZWQoLW9mZnNldExlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHN0YWlyUmFpbC5wdXNoKG5leHRMZWZ0Qm90dG9tUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyUmFpbC5wdXNoKGN1clJpZ2h0Qm90dG9tUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCArICh0ZW1wU3RlcENvdW50ID4gMCAmJiAhdXB3YXJkID8gLXN0ZXBIZWlnaHQgOiAwKSkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmICghdXB3YXJkICYmIHRlbXBTdGVwQ291bnQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBjb25zdCBuZXh0UmlnaHRCb3R0b21QdCA9IG5leHRSaWdodE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyAodGVtcFN0ZXBDb3VudCArICh1cHdhcmQgPyAxIDogMCkpICogc3RlcEhlaWdodCkpLmFkZGVkKGN1clN0ZXBSaWdodERpci5tdWx0aXBsaWVkKG9mZnNldExlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHN0YWlyUmFpbC5wdXNoKG5leHRSaWdodEJvdHRvbVB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRlbXBTdGVwQ291bnQgPT09IHN0ZXBDb3VudCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RTdGVwUGVyY2VudCA9IGxhc3RIb3Jpem9udGFsQW5nbGUgLyBob3Jpem9udGFsU3RlcEFuZ2xlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxlZnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzdGFpclJhaWwucHVzaChjdXJMZWZ0Qm90dG9tTWlkUHQuYWRkZWQoY3VyU3RlcExlZnRGcm9udERpci5yZXZlcnNlZCgpKS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyUmFpbC5wdXNoKGN1ckxlZnRCb3R0b21NaWRQdC5hZGRlZChjdXJTdGVwTGVmdEZyb250RGlyKS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0ICsgKHVwd2FyZCA/IDAgOiAtc3RlcEhlaWdodCAqICgxIC0gbGFzdFN0ZXBQZXJjZW50KSkpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzdGFpclJhaWwucHVzaChjdXJSaWdodEJvdHRvbU1pZFB0LmFkZGVkKGN1clN0ZXBSaWdodEZyb250RGlyLnJldmVyc2VkKCkpLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJSYWlsLnB1c2goY3VyUmlnaHRCb3R0b21NaWRQdC5hZGRlZChjdXJTdGVwUmlnaHRGcm9udERpcikuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCArICh1cHdhcmQgPyAwIDogLXN0ZXBIZWlnaHQgKiAoMSAtIGxhc3RTdGVwUGVyY2VudCkpKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5leHRTdGFydFBvaW50ID0gY3VyUmlnaHRNb2xkUHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAodGVtcFN0ZXBDb3VudCAlIHJlYXNvbmFibGVTdGVwQ291bnQgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyQ29sdW1ucy5wdXNoKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0ID8gY3VyTGVmdEJvdHRvbU1pZFB0IDogY3VyUmlnaHRCb3R0b21NaWRQdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobGVmdCA/IGN1ckxlZnRCb3R0b21NaWRQdCA6IGN1clJpZ2h0Qm90dG9tTWlkUHQpLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQgKyAodXB3YXJkID8gMCA6ICh2ZXJ0aWNhbFN0ZXAgKiAoMSAtIGxhc3RTdGVwUGVyY2VudCAvIDIpKSkpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBzZWdtZW50IHN0YXJ0V2lkdGggIT09IGN1cnJlbnRTZWdtZW50IGVuZFdpZHRoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcCA9IGxlZnQgPyBzdGFydC5hZGRlZChiYXNlTGluZTNkRGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIgLSBvZmZzZXRMZW5ndGgpKSA6IGN1clJpZ2h0TW9sZFB0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFsZWZ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdERpciA9IGN1clN0ZXBMZWZ0RGlyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZW1wU3RlcENvdW50ICUgcmVhc29uYWJsZVN0ZXBDb3VudCA9PT0gMCAmJiB0ZW1wU3RlcENvdW50IDwgc3RlcENvdW50IC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpckNvbHVtbnMucHVzaChbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0ID8gY3VyTGVmdEJvdHRvbU1pZFB0IDogY3VyUmlnaHRCb3R0b21NaWRQdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChsZWZ0ID8gY3VyTGVmdEJvdHRvbU1pZFB0IDogY3VyUmlnaHRCb3R0b21NaWRQdCkuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKCF1cHdhcmQgJiYgdGVtcFN0ZXBDb3VudCA9PT0gMCA/IGhlaWdodCA6IGNvbHVtbkFjdHVhbEhlaWdodCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcFN0ZXBDb3VudCArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsLnJhaWwucHVzaCguLi5oZWFkQ29ybmVyUmFpbCk7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsLmNvbHVtbnMucHVzaCguLi5oZWFkQ29ybmVyQ29sdW1ucyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsZWZ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5yYWlsLnB1c2goLi4uc3RhaXJSYWlsLnJldmVyc2UoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5jb2x1bW5zLnB1c2goLi4uc3RhaXJDb2x1bW5zLnJldmVyc2UoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5yYWlsLnB1c2goLi4uc3RhaXJSYWlsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsLmNvbHVtbnMucHVzaCguLi5zdGFpckNvbHVtbnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxldCBzdGFpck5leHRTZWdtZW50O1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG5leHRTZWdtZW50SW5kZXggb2YgbmV4dENvbXBvbmVudHNbbGluZTNkSW5kXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dFNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleChzZWdtZW50cywgbmV4dFNlZ21lbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0U2VnbWVudFZpc2l0ZWRSZWNvcmQgPSB2aXNpdGVkLmdldCgobmV4dFNlZ21lbnQgPT09IG51bGwgfHwgbmV4dFNlZ21lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG5leHRTZWdtZW50LnBhcmFtLmluZGV4KSB8fCAtMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFNlZ21lbnQgJiYgKChpc1BsYXRmb3JtKG5leHRTZWdtZW50KSAmJiAhKG5leHRTZWdtZW50VmlzaXRlZFJlY29yZCA9PT0gbnVsbCB8fCBuZXh0U2VnbWVudFZpc2l0ZWRSZWNvcmQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG5leHRTZWdtZW50VmlzaXRlZFJlY29yZC5saW5lM2RJbmRleGVzLnNpemUpKSB8fCAoIWlzUGxhdGZvcm0obmV4dFNlZ21lbnQpICYmICEobmV4dFNlZ21lbnRWaXNpdGVkUmVjb3JkID09PSBudWxsIHx8IG5leHRTZWdtZW50VmlzaXRlZFJlY29yZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogbmV4dFNlZ21lbnRWaXNpdGVkUmVjb3JkLnJpZ2h0KSkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJOZXh0U2VnbWVudCA9IG5leHRTZWdtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChsZWZ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmFzZVNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAobmV4dFNpYmxpbmdTZWdtZW50ICYmIGJhc2VTZWdtZW50LnBhcmFtLnR5cGUgIT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgLy8gbmV2ZXIgaGFwcGVuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIG5leHQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBzZWdtZW50OiBuZXh0U2libGluZ1NlZ21lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBsaW5lM2RJbmQ6IGdldFNlZ21lbnRTdGFydEFuZEJhc2VMaW5lM2QobmV4dFNpYmxpbmdTZWdtZW50LCBzZWdtZW50cykuc3RhcnRMaW5lLmxpbmUzZEluZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGxlZnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgc3RhcnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgc3RhcnRQb2ludDogbmV4dFN0YXJ0UG9pbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgeyBtb2xkU2hhcGU6IHsgdmVydGljZXM6IGJhc2VWZXJ0aWNlcywgdGVtcExpbmVzOiBiYXNlVGVtcExpbmVzIH0gfSA9IGJhc2VTZWdtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IGJhc2VMaW5lM2QgPSBiYXNlU2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtID8gYmFzZVRlbXBMaW5lc1tiYXNlQ29tcG9uZW50Py5saW5lM2RJbmRleCB8fCAwXSA6IGJhc2VUZW1wTGluZXNbYmFzZVRlbXBMaW5lcy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBiYXNlTGluZTNkRGlyID0gYmFzZVZlcnRpY2VzW2Jhc2VMaW5lM2RbMV1dLnN1YnRyYWN0ZWQoYmFzZVZlcnRpY2VzW2Jhc2VMaW5lM2RbMF1dKS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXAgPSBiYXNlTGluZTNkRW5kO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwVG9FcERpciA9IGVwLnN1YnRyYWN0ZWQoc3ApLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BUb0VwRGlyLmRvdChiYXNlTGluZTNkRGlyKSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFN0YXJ0UG9pbnQgPSBzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hFbmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U3RhcnRQb2ludCA9IGlzUGxhdGZvcm0oYmFzZVNlZ21lbnQpID8gZXAgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGJhc2VTZWdtZW50ICYmICh2aXNpdGVkQmFzZVNlZ21lbnQ/LnJpZ2h0ICYmICF2aXNpdGVkQmFzZVNlZ21lbnQubGVmdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50OiBiYXNlU2VnbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZTNkSW5kOiBiYXNlU2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtID8gKGJhc2VDb21wb25lbnQgPT09IG51bGwgfHwgYmFzZUNvbXBvbmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleCkgfHwgMCA6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRQb2ludDogbmV4dFN0YXJ0UG9pbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZW5kIHRoZSBwYXRjaCB3aGljaCBpcyBzdGFydCB3aXRoIGN1cnJlbnRTZWdtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWxzLnB1c2goaGFuZHJhaWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsID0geyByYWlsOiBbXSwgY29sdW1uczogW10gfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2aXNpdGVkUmVjb3JkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlzaXRlZFJlY29yZC5sZWZ0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGFpck5leHRTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgeyBtb2xkU2hhcGU6IHsgdmVydGljZXM6IHN0YWlyTmV4dFZlcnRpY2VzLCB0ZW1wTGluZXM6IHN0YWlyTmV4dFRlbXBMaW5lcyB9IH0gPSBzdGFpck5leHRTZWdtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgbGluZTNkSW5kOiBzdGFpck5leHRMaW5lM2RJbmQsIGVuZE9uQmFzZUxpbmUgfSA9IGdldFNlZ21lbnRTdGFydEFuZEJhc2VMaW5lM2Qoc3RhaXJOZXh0U2VnbWVudCwgc2VnbWVudHMsIGN1cnJlbnRTZWdtZW50KS5zdGFydExpbmU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3Qgc3RhaXJOZXh0TGluZTNkID0gc3RhaXJOZXh0U2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtID8gc3RhaXJOZXh0VGVtcExpbmVzW3N0YWlyTmV4dExpbmUzZEluZF0gOiBzdGFpck5leHRUZW1wTGluZXNbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3Qgc3RhaXJOZXh0TGluZTNkRGlyID0gc3RhaXJOZXh0VmVydGljZXNbc3RhaXJOZXh0TGluZTNkWzFdXS5zdWJ0cmFjdGVkKHN0YWlyTmV4dFZlcnRpY2VzW3N0YWlyTmV4dExpbmUzZFswXV0pLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcCA9IGVuZE9uQmFzZUxpbmU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BUb0VwRGlyID0gZXAuc3VidHJhY3RlZChzcCkubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcFRvRXBEaXIuZG90KGxpbmUzZERpcikgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTdGFydFBvaW50ID0gc3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoRW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFN0YXJ0UG9pbnQgPSBpc1BsYXRmb3JtKHN0YWlyTmV4dFNlZ21lbnQpID8gZXAgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQ6IHN0YWlyTmV4dFNlZ21lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUzZEluZDogc3RhaXJOZXh0TGluZTNkSW5kLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFBvaW50OiBuZXh0U3RhcnRQb2ludCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQ6IGN1cnJlbnRTZWdtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lM2RJbmQ6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3RhcnRQb2ludDogbmV4dFN0YXJ0UG9pbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZW5kIHRoZSBwYXRjaCB3aGljaCBpcyBlbmQgd2l0aCBzdGFpciBjb21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbHMucHVzaChoYW5kcmFpbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWwgPSB7IHJhaWw6IFtdLCBjb2x1bW5zOiBbXSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZpc2l0ZWRSZWNvcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNpdGVkUmVjb3JkLnJpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocHVzaEVuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGN1cnJlbnRDb3JuZXJTaWRlV2lkdGggPSBsZWZ0ID8gc3RhcnRXaWR0aCA6IGVuZFdpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGN1cnJlbnRTaWRlQ29ybmVyU3RhcnQgPSBsZWZ0ID8gc3RhcnQgOiBlbmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlcCBpcyByZXVzZWQgd2hlbiBwdXNoRW5kXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcFRhaWxEaXN0YW5jZSA9IGxlZnQgPyAwIDogc3RlcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZWZ0ICYmIGlzTGVmdFN0YWlyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3AgPSBzdGFydC5hZGRlZChsZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIgLSBvZmZzZXRMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcm5lclN0YXJ0SGVpZ2h0ID0gbGVmdCA/IHN0YXJ0SGVpZ2h0IDogZW5kSGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29ybmVyRW5kID0gZXA7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3JuZXJEaXN0YW5jZSA9IHNwLmRpc3RhbmNlVG8oY29ybmVyRW5kKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFsb25nIGNvcm5lckJhc2VEaXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcm5lclNwVG9FcERpciA9IGNvcm5lckVuZC5zdWJ0cmFjdGVkKHNwKS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3JuZXJPZmZzZXREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKGNvcm5lclNwVG9FcERpcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3JuZXJBZGRpdGlvbmFsSGVpZ2h0ID0gbGVmdCAmJiAhaXNSaWdodFN0YWlyICYmIHVwd2FyZCA/IHN0ZXBIZWlnaHQgOiAoIWxlZnQgJiYgIXVwd2FyZCA/IC1zdGVwSGVpZ2h0IDogMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb3JuZXJTcFRvRXBEaXIgPSBjb3JuZXJFbmQuc3VidHJhY3RlZChzcCkubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29ybmVyT2Zmc2V0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhjb3JuZXJTcFRvRXBEaXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHRlbXBUYWlsRGlzdGFuY2UgPCBjb3JuZXJEaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvdHRvbVBvaW50ID0gc3AuYWRkZWQoY29ybmVyU3BUb0VwRGlyLm11bHRpcGxpZWQodGVtcFRhaWxEaXN0YW5jZSkpLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChjb3JuZXJTdGFydEhlaWdodCArIGNvcm5lckFkZGl0aW9uYWxIZWlnaHQpKS5hZGRlZChjb3JuZXJPZmZzZXREaXIubXVsdGlwbGllZChvZmZzZXRMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5jb2x1bW5zLnB1c2goW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b21Qb2ludCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tUG9pbnQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBUYWlsRGlzdGFuY2UgKz0gc3RlcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RCb3R0b21Qb2ludCA9IGVwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChjb3JuZXJTdGFydEhlaWdodCArIGNvcm5lckFkZGl0aW9uYWxIZWlnaHQpKS5hZGRlZChjb3JuZXJPZmZzZXREaXIubXVsdGlwbGllZChvZmZzZXRMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IGxhc3RCb3R0b21Qb2ludCA9IGVwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChsZWZ0ID8gZW5kSGVpZ2h0IDogc3RhcnRIZWlnaHQpKS5hZGRlZChjb3JuZXJPZmZzZXREaXIubXVsdGlwbGllZChvZmZzZXRMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZWZ0ICYmIGlzUmlnaHRTdGFpcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsLnJhaWwucHVzaChzcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoY29ybmVyU3RhcnRIZWlnaHQgKyBoZWlnaHQgKyBjb3JuZXJBZGRpdGlvbmFsSGVpZ2h0KSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHVzaCByYWlsXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5yYWlsLnB1c2gobGFzdEJvdHRvbVBvaW50LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGNvcm5lckRpc3RhbmNlIC0gdGVtcFRhaWxEaXN0YW5jZSArIHN0ZXApID4gc3RlcFRvbGVyYW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsLmNvbHVtbnMucHVzaChbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RCb3R0b21Qb2ludCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdEJvdHRvbVBvaW50LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJlbnQgPSBuZXh0O1xuICAgICAgICAgICAgaWYgKCFjdXJyZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGlmICh1blZpc2l0ZWQuc2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVTZWdtZW50ID0gWy4uLnVuVmlzaXRlZC52YWx1ZXMoKV1bMF07XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQ6IHRoZVNlZ21lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZTNkSW5kOiBnZXRTZWdtZW50U3RhcnRBbmRCYXNlTGluZTNkKHRoZVNlZ21lbnQsIHNlZ21lbnRzKS5zdGFydExpbmUubGluZTNkSW5kLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoYW5kcmFpbHM7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2VuZXJhdGVUZW1wTGluZXNMb29wKHZlcnRleENvdW50KSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IHZlcnRleENvdW50IH0pLm1hcCgoXywgaSkgPT4gW2ksIGkgPT09IHZlcnRleENvdW50IC0gMSA/IDAgOiBpICsgMV0pO1xufVxuZnVuY3Rpb24gZ2V0U2VnbWVudFN0YXJ0QW5kQmFzZUxpbmUzZChzZWdtZW50LCBzZWdtZW50cywgYmFzZVNlZ21lbnQpIHtcbiAgICBjb25zdCB7IHN0YXJ0LCBwYXJhbTogeyB0eXBlLCBzdGFydFdpZHRoIH0sIGNvbXBvbmVudERpcmVjdGlvblR5cGUsIG1vbGRTaGFwZTogeyB0ZW1wTGluZXMsIHZlcnRpY2VzIH0sIGJhc2VDb21wb25lbnQgfSA9IHNlZ21lbnQ7XG4gICAgbGV0IHN0YXJ0TGluZTNkSW5kID0gMDtcbiAgICAvLyA1IGVkZ2VzXG4gICAgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gJiYgY29tcG9uZW50RGlyZWN0aW9uVHlwZSA9PT0gQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5SaWdodEZyb250ICYmIHRlbXBMaW5lcy5sZW5ndGggPiA0KSB7XG4gICAgICAgIHN0YXJ0TGluZTNkSW5kID0gMTtcbiAgICB9XG4gICAgY29uc3Qgc3RhcnRMaW5lM2QgPSB0ZW1wTGluZXNbc3RhcnRMaW5lM2RJbmRdO1xuICAgIGNvbnN0IHN0YXJ0TGluZTNkU3RhcnQgPSB2ZXJ0aWNlc1tzdGFydExpbmUzZFswXV07XG4gICAgY29uc3Qgc3RhcnRMaW5lM2RFbmQgPSB2ZXJ0aWNlc1tzdGFydExpbmUzZFsxXV07XG4gICAgY29uc3Qgc3RhcnRMaW5lM2REaXIgPSBzdGFydExpbmUzZEVuZC5zdWJ0cmFjdGVkKHN0YXJ0TGluZTNkU3RhcnQpLm5vcm1hbGl6ZWQoKTtcbiAgICBsZXQgYmFzZUxpbmUzZEluZCA9IChiYXNlQ29tcG9uZW50ID09PSBudWxsIHx8IGJhc2VDb21wb25lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJhc2VDb21wb25lbnQuY29tcG9uZW50SW5kZXgpIHx8IDA7XG4gICAgbGV0IGJhc2VMaW5lM2QgPSBbLi4uc3RhcnRMaW5lM2RdLnJldmVyc2UoKTtcbiAgICBsZXQgYmFzZUxpbmUzZFN0YXJ0ID0gdmVydGljZXNbc3RhcnRMaW5lM2RbMV1dO1xuICAgIGxldCBiYXNlTGluZTNkRW5kID0gdmVydGljZXNbc3RhcnRMaW5lM2RbMF1dO1xuICAgIGxldCBiYXNlTGluZTNkRGlyID0gc3RhcnRMaW5lM2REaXIucmV2ZXJzZWQoKTtcbiAgICA7XG4gICAgaWYgKCFiYXNlU2VnbWVudCAmJiBiYXNlQ29tcG9uZW50KSB7XG4gICAgICAgIGJhc2VTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgoc2VnbWVudHMsIGJhc2VDb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xuICAgIH1cbiAgICBpZiAoYmFzZVNlZ21lbnQpIHtcbiAgICAgICAgY29uc3QgeyBtb2xkU2hhcGU6IHsgdmVydGljZXM6IGJhc2VWZXJ0aWNlcywgdGVtcExpbmVzOiBiYXNlVGVtcExpbmVzIH0gfSA9IGJhc2VTZWdtZW50O1xuICAgICAgICBiYXNlTGluZTNkID0gYmFzZVNlZ21lbnQucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSA/IGJhc2VUZW1wTGluZXNbKGJhc2VDb21wb25lbnQgPT09IG51bGwgfHwgYmFzZUNvbXBvbmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleCkgfHwgMF0gOiBbLi4uYmFzZVRlbXBMaW5lc1tiYXNlVGVtcExpbmVzLmxlbmd0aCAtIDFdXS5yZXZlcnNlKCk7XG4gICAgICAgIGJhc2VMaW5lM2RTdGFydCA9IGJhc2VWZXJ0aWNlc1tiYXNlTGluZTNkWzBdXTtcbiAgICAgICAgYmFzZUxpbmUzZEVuZCA9IGJhc2VWZXJ0aWNlc1tiYXNlTGluZTNkWzFdXTtcbiAgICAgICAgYmFzZUxpbmUzZERpciA9IGJhc2VMaW5lM2RFbmQuc3VidHJhY3RlZChiYXNlTGluZTNkU3RhcnQpLm5vcm1hbGl6ZWQoKTtcbiAgICB9XG4gICAgbGV0IHN0YXJ0T25CYXNlTGluZSA9IHN0YXJ0TGluZTNkU3RhcnQ7XG4gICAgbGV0IGVuZE9uQmFzZUxpbmUgPSBzdGFydExpbmUzZEVuZDtcbiAgICBpZiAodHlwZSAhPT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICBzdGFydE9uQmFzZUxpbmUgPSBzdGFydC5hZGRlZChiYXNlTGluZTNkRGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKTtcbiAgICAgICAgZW5kT25CYXNlTGluZSA9IHN0YXJ0LmFkZGVkKGJhc2VMaW5lM2REaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhcnRMaW5lOiB7IGxpbmUzZEluZDogc3RhcnRMaW5lM2RJbmQsIGxpbmUzZDogc3RhcnRMaW5lM2QsIGRpcjogc3RhcnRMaW5lM2REaXIsIHN0YXJ0OiBzdGFydExpbmUzZFN0YXJ0LCBlbmQ6IHN0YXJ0TGluZTNkRW5kLCBzdGFydE9uQmFzZUxpbmUsIGVuZE9uQmFzZUxpbmUgfSxcbiAgICAgICAgYmFzZUxpbmU6IHsgbGluZTNkSW5kOiBiYXNlTGluZTNkSW5kLCBsaW5lM2Q6IGJhc2VMaW5lM2QsIGRpcjogYmFzZUxpbmUzZERpciwgc3RhcnQ6IGJhc2VMaW5lM2RTdGFydCwgZW5kOiBiYXNlTGluZTNkRW5kIH0sXG4gICAgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc1BsYXRmb3JtKHNlZ21lbnQpIHtcbiAgICByZXR1cm4gc2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2lyY3VsYXJTdGFpcihzZWdtZW50KSB7XG4gICAgcmV0dXJuIHNlZ21lbnQucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5DaXJjdWxhclN0YWlyO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyYWlnaHRTdGFpcihzZWdtZW50KSB7XG4gICAgcmV0dXJuIHNlZ21lbnQucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyO1xufVxuIiwiZXhwb3J0IGNvbnN0IFN0YWlyTW9kZWxLZXkgPSAnRFNNb2RlbCc7XG5leHBvcnQgY29uc3QgTW9kZWxWYWx1ZSA9ICcxJztcbmV4cG9ydCBjb25zdCBIYW5kcmFpbE1vZGVsS2V5ID0gJ0hhbmRyYWlsJztcbmV4cG9ydCBjb25zdCBSYWlsTW9kZWxLZXkgPSAnUmFpbCc7XG5leHBvcnQgY29uc3QgQ29sdW1uTW9kZWxLZXkgPSAnQ29sdW1uJztcbi8vIGV4cG9ydCBjb25zdCBTdGFpcktleSA9ICdEU1N0YWlyJztcbi8vIGV4cG9ydCBjb25zdCBQbGF0Zm9ybUtleSA9ICdEU1BsYXRmb3JtJztcbmV4cG9ydCBjb25zdCBTdGFpclBhcmFtS2V5ID0gJ1NQYXJhbSc7XG5leHBvcnQgY29uc3QgQ29tcG9uZW50UGFyYW1LZXkgPSAnQ1BhcmFtJztcbmV4cG9ydCBjb25zdCBTdGFpck1hdGVyaWFsS2V5ID0gJ1NNYXQnO1xuZXhwb3J0IGNvbnN0IFBsYXRmb3JtTWF0ZXJpYWxLZXkgPSAnUE1hdCc7XG5leHBvcnQgY29uc3QgUmFpbE1hdGVyaWFsS2V5ID0gJ0hSTWF0JztcbmV4cG9ydCBjb25zdCBDb2x1bW5NYXRlcmlhbEtleSA9ICdIQ01hdCc7XG5leHBvcnQgY29uc3QgQ29tcG9uZW50TWF0ZXJpYWxLZXkgPSAnQ01hdCc7XG4vLyBzdGFydEhlaWdodCBhbmQgZW5kSGVpZ2h0IGNhY2hlZCBpbiBzdGFydCBhbmQgZW5kXG5leHBvcnQgY29uc3QgQ29tcG9uZW50SW5kZXhLZXkgPSAnSW5kJztcbmV4cG9ydCBjb25zdCBTdGFydEVuZEtleSA9ICdTVG9FJztcbmV4cG9ydCBjb25zdCBCYXNlTGluZVNlZzNkS2V5ID0gJ0Jhc2VMaW5lJztcbmV4cG9ydCBjb25zdCBCYXNlQ29tcG9uZW50S2V5ID0gJ0Jhc2VDb21wb25lbnQnO1xuZXhwb3J0IGNvbnN0IENpcmNsZVRhbmdlbnRLZXkgPSAnQ2lyY2xlVGFuZ2VudCc7XG5leHBvcnQgY29uc3QgRGVsaW1pdGVyID0gJyYnO1xuZXhwb3J0IGNvbnN0IENvb3JkRGVsaW1pdGVyID0gJywnO1xuZXhwb3J0IGNvbnN0IEJhc2VMaW5lM2REZWxpbWl0ZXIgPSAnXyc7XG5jb25zdCBQcm9kTWF0ZXJpYWxzID0ge1xuICAgIFN0YWlyOiB7IGJnSWQ6ICczRk80TEhFUkJQUFknLCBtYXRlcmlhbElkOiAnNTk3MmU5OTNhYTAxZjM1ODVmNTFkZWNiJyB9LFxuICAgIC8vIFN0YWlyOiB7IGJnSWQ6ICczRk80QVRLRUNMS0knLCBtYXRlcmlhbElkOiAnNjE2OGY0NTRjZGQyNWUwMDAxN2Q3NWQwJyB9LFxuICAgIFBsYXRmb3JtOiB7IGJnSWQ6ICczRk80NFQ3TVlGQTUnLCBtYXRlcmlhbElkOiAnNjQ1NjJhZmQ2ZmJjM2IwMDAxYTMyNTFjJyB9LFxuICAgIEhhbmRyYWlsOiB7XG4gICAgICAgIHJhaWw6IHsgYmdJZDogJzNGTzRMSEVSRTdOUCcsIG1hdGVyaWFsSWQ6ICc1OTcyZThkN2FhMDFmMzU4NWY1MWRlOTcnIH0sXG4gICAgICAgIGNvbHVtbjogeyBiZ0lkOiAnM0ZPNExIRVJFN05QJywgbWF0ZXJpYWxJZDogJzU5NzJlOGQ3YWEwMWYzNTg1ZjUxZGU5NycgfSxcbiAgICB9LFxufTtcbmNvbnN0IERldk1hdGVyaWFscyA9IHtcbiAgICBTdGFpcjogeyBiZ0lkOiAnM0ZPNEgyRDczSkZPJywgbWF0ZXJpYWxJZDogJzU4YWY5NjFiNGE0ZDJjNGY4YWEyYjFkYScgfSxcbiAgICAvLyBTdGFpcjogeyBiZ0lkOiAnM0ZPNEFUS0VDTEtJJywgbWF0ZXJpYWxJZDogJzYxNjhmNDU0Y2RkMjVlMDAwMTdkNzVkMCcgfSxcbiAgICBQbGF0Zm9ybTogeyBiZ0lkOiAnM0ZPNEgyRDZDUU1ZJywgbWF0ZXJpYWxJZDogJzU4MTZmZWY5ODVkYTU2NmExYjI4YTk0NCcgfSxcbiAgICBIYW5kcmFpbDoge1xuICAgICAgICByYWlsOiB7IGJnSWQ6ICczRk80SDJENkg4U0InLCBtYXRlcmlhbElkOiAnNThhZmIzYWI1YzI2YTA3M2IzODlhOTVmJyB9LFxuICAgICAgICBjb2x1bW46IHsgYmdJZDogJzNGTzRHREs1RVhEQycsIG1hdGVyaWFsSWQ6ICc1ZTUzMmZiNDIwMTQwMjAwMDFjYzQ4ODknIH0sXG4gICAgfSxcbn07XG5leHBvcnQgY29uc3QgUHJlc2V0TWF0ZXJpYWxzID0gKHdpbmRvdy5vcmlnaW4gfHwgJycpLmluY2x1ZGVzKCdzaXQnKSA/IERldk1hdGVyaWFscyA6IFByb2RNYXRlcmlhbHM7XG5leHBvcnQgdmFyIENvbXBvbmVudFBhcmFtVHlwZTtcbihmdW5jdGlvbiAoQ29tcG9uZW50UGFyYW1UeXBlKSB7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSG9yaXpvbnRhbFN0ZXBcIl0gPSBcImhvcml6b250YWxTdGVwXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiVmVydGljYWxTdGVwXCJdID0gXCJ2ZXJ0aWNhbFN0ZXBcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJTdGFydFdpZHRoXCJdID0gXCJzdGFydFdpZHRoXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiRW5kV2lkdGhcIl0gPSBcImVuZFdpZHRoXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiU3RlcFByb3BvcnRpb25hbFwiXSA9IFwic3RlcFByb3BvcnRpb25hbFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIldpZHRoUHJvcG9ydGlvbmFsXCJdID0gXCJ3aWR0aFByb3BvcnRpb25hbFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIlBsYXRmb3JtTGVuZ3RoXCJdID0gXCJwbGF0Zm9ybUxlbmd0aFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIlBsYXRmb3JtTGVuZ3RoTG9ja2VkXCJdID0gXCJwbGF0Zm9ybUxlbmd0aExvY2tlZFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIlR5cGVcIl0gPSBcInR5cGVcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJVcHdhcmRcIl0gPSBcInVwd2FyZFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIlBsYXRmb3JtVGhpY2tuZXNzXCJdID0gXCJwbGF0Zm9ybVRoaWNrbmVzc1wiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkNvbXBvbmVudE1hdGVyaWFsXCJdID0gXCJjb21wb25lbnRNYXRlcmlhbFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIlN0YWlyTWF0ZXJpYWxcIl0gPSBcInN0YWlyTWF0ZXJpYWxcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJQbGF0Zm9ybU1hdGVyaWFsXCJdID0gXCJwbGF0Zm9ybU1hdGVyaWFsXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSGFuZHJhaWxcIl0gPSBcImhhbmRyYWlsXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSGFuZHJhaWxIZWlnaHRcIl0gPSBcImhhbmRyYWlsSGVpZ2h0XCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSGFuZHJhaWxSYWlsVHlwZVwiXSA9IFwiaGFuZHJhaWxSYWlsVHlwZVwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsUmFpbFJhZGl1c1wiXSA9IFwiaGFuZHJhaWxSYWlsUmFkaXVzXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSGFuZHJhaWxSYWlsV2lkdGhcIl0gPSBcImhhbmRyYWlsUmFpbFdpZHRoXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSGFuZHJhaWxSYWlsSGVpZ2h0XCJdID0gXCJoYW5kcmFpbFJhaWxIZWlnaHRcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIYW5kcmFpbFJhaWxNYXRlcmlhbFwiXSA9IFwiUmFpbE1hdGVyaWFsXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSGFuZHJhaWxDb2x1bW5UeXBlXCJdID0gXCJoYW5kcmFpbENvbHVtblR5cGVcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIYW5kcmFpbENvbHVtblN0ZXBcIl0gPSBcImhhbmRyYWlsQ29sdW1uU3RlcFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsQ29sdW1uUmFkaXVzXCJdID0gXCJoYW5kcmFpbENvbHVtblJhZGl1c1wiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsQ29sdW1uV2lkdGhcIl0gPSBcImhhbmRyYWlsQ29sdW1uV2lkdGhcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIYW5kcmFpbENvbHVtbkhlaWdodFwiXSA9IFwiaGFuZHJhaWxDb2x1bW5IZWlnaHRcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIYW5kcmFpbENvbHVtbk1hdGVyaWFsXCJdID0gXCJDb2x1bW5NYXRlcmlhbFwiO1xufSkoQ29tcG9uZW50UGFyYW1UeXBlIHx8IChDb21wb25lbnRQYXJhbVR5cGUgPSB7fSkpO1xuLy8gaW50ZXJmYWNlIFBhcmFtU2V0dGluZ3Mge1xuLy8gICAgIG1pbjogbnVtYmVyO1xuLy8gICAgIG1heDogbnVtYmVyO1xuLy8gICAgIHN0ZXA6IG51bWJlcjtcbi8vICAgICB1bml0OiBzdHJpbmc7XG4vLyAgICAgcHJlY2lzaW9uOiBudW1iZXI7XG4vLyB9XG5leHBvcnQgdmFyIENvbXBvbmVudFR5cGU7XG4oZnVuY3Rpb24gKENvbXBvbmVudFR5cGUpIHtcbiAgICBDb21wb25lbnRUeXBlW0NvbXBvbmVudFR5cGVbXCJTdHJhaWdodFN0YWlyXCJdID0gMF0gPSBcIlN0cmFpZ2h0U3RhaXJcIjtcbiAgICBDb21wb25lbnRUeXBlW0NvbXBvbmVudFR5cGVbXCJDaXJjdWxhclN0YWlyXCJdID0gMV0gPSBcIkNpcmN1bGFyU3RhaXJcIjtcbiAgICBDb21wb25lbnRUeXBlW0NvbXBvbmVudFR5cGVbXCJQbGF0Zm9ybVwiXSA9IDJdID0gXCJQbGF0Zm9ybVwiO1xufSkoQ29tcG9uZW50VHlwZSB8fCAoQ29tcG9uZW50VHlwZSA9IHt9KSk7XG5leHBvcnQgdmFyIFJhaWxUeXBlO1xuKGZ1bmN0aW9uIChSYWlsVHlwZSkge1xuICAgIFJhaWxUeXBlW1JhaWxUeXBlW1wiQ2lyY2xlXCJdID0gMF0gPSBcIkNpcmNsZVwiO1xuICAgIFJhaWxUeXBlW1JhaWxUeXBlW1wiUmVjdFwiXSA9IDFdID0gXCJSZWN0XCI7XG4gICAgUmFpbFR5cGVbUmFpbFR5cGVbXCJDdXN0b21cIl0gPSA5OV0gPSBcIkN1c3RvbVwiO1xufSkoUmFpbFR5cGUgfHwgKFJhaWxUeXBlID0ge30pKTtcbmV4cG9ydCB2YXIgQ29sdW1uVHlwZTtcbihmdW5jdGlvbiAoQ29sdW1uVHlwZSkge1xuICAgIENvbHVtblR5cGVbQ29sdW1uVHlwZVtcIkNpcmNsZVwiXSA9IDBdID0gXCJDaXJjbGVcIjtcbiAgICBDb2x1bW5UeXBlW0NvbHVtblR5cGVbXCJSZWN0XCJdID0gMV0gPSBcIlJlY3RcIjtcbiAgICBDb2x1bW5UeXBlW0NvbHVtblR5cGVbXCJDdXN0b21cIl0gPSA5OV0gPSBcIkN1c3RvbVwiO1xufSkoQ29sdW1uVHlwZSB8fCAoQ29sdW1uVHlwZSA9IHt9KSk7XG5leHBvcnQgY29uc3QgQ29tcG9uZW50UGFyYW1TZXR0aW5ncyA9IHtcbiAgICBob3Jpem9udGFsU3RlcDogeyB0aXRsZTogXCLmraXplb9cIiwgbWluOiAxLCBtYXg6IDEwMDAwMCwgc3RlcDogMTAsIHVuaXQ6ICfplb8nLCBwcmVjaXNpb246IDAsIH0sXG4gICAgdmVydGljYWxTdGVwOiB7IHRpdGxlOiBcIuatpemVv1wiLCBtaW46IDEsIG1heDogMTAwMDAwLCBzdGVwOiAxMCwgdW5pdDogJ+mrmCcsIHByZWNpc2lvbjogMCwgfSxcbiAgICBzdGFydFdpZHRoOiB7IHRpdGxlOiBcIuWuveW6plwiLCBtaW46IDEsIG1heDogMTAwMDAwLCBzdGVwOiA1MCwgdW5pdDogJ+i1tycsIHByZWNpc2lvbjogMCwgfSxcbiAgICBlbmRXaWR0aDogeyB0aXRsZTogXCLlrr3luqZcIiwgbWluOiAxLCBtYXg6IDEwMDAwMCwgc3RlcDogNTAsIHVuaXQ6ICfnu4gnLCBwcmVjaXNpb246IDAsIH0sXG4gICAgcGxhdGZvcm1MZW5ndGg6IHsgdGl0bGU6IFwi6ZW/5bqmXCIsIG1pbjogMTAwLCBtYXg6IDEwMDAwMCwgc3RlcDogNTAsIHVuaXQ6ICcnLCBwcmVjaXNpb246IDAsIH0sXG4gICAgdHlwZToge1xuICAgICAgICAvLyByYWRpb1ZhbHVlczogW0NvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpciwgQ29tcG9uZW50VHlwZS5DaXJjdWxhclN0YWlyLCBDb21wb25lbnRUeXBlLlBsYXRmb3JtXSxcbiAgICAgICAgLy8gdGV4dHM6IFtcIuebtOmYtlwiLCBcIuaXi+i9rOmYtuair1wiLCBcIuW5s+WPsFwiXSxcbiAgICAgICAgdGl0bGU6IFwi57G75Z6LXCIsXG4gICAgICAgIHJhZGlvT3B0aW9uczogW1xuICAgICAgICAgICAgeyB2YWx1ZTogQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyLCB0ZXh0OiBcIuebtOmYtlwiIH0sXG4gICAgICAgICAgICB7IHZhbHVlOiBDb21wb25lbnRUeXBlLkNpcmN1bGFyU3RhaXIsIHRleHQ6IFwi5peL6L2s6Zi25qKvXCIgfSxcbiAgICAgICAgICAgIHsgdmFsdWU6IENvbXBvbmVudFR5cGUuUGxhdGZvcm0sIHRleHQ6IFwi5bmz5Y+wXCIgfSxcbiAgICAgICAgXVxuICAgIH0sXG4gICAgdXB3YXJkOiB7XG4gICAgICAgIC8vIHJhZGlvVmFsdWVzOiBbMSwgMF0sXG4gICAgICAgIC8vIHRleHRzOiBbXCLlkJHkuIpcIiwgXCLlkJHkuItcIl0sXG4gICAgICAgIHRpdGxlOiBcIuaWueWQkVwiLFxuICAgICAgICByYWRpb09wdGlvbnM6IFtcbiAgICAgICAgICAgIHsgdmFsdWU6IHRydWUsIHRleHQ6IFwi5ZCR5LiKXCIgfSxcbiAgICAgICAgICAgIHsgdmFsdWU6IGZhbHNlLCB0ZXh0OiBcIuWQkeS4i1wiIH0sXG4gICAgICAgIF1cbiAgICB9LFxuICAgIHBsYXRmb3JtVGhpY2tuZXNzOiB7IHRpdGxlOiBcIuWOmuW6plwiLCBtaW46IDEsIG1heDogMTAwMDAwLCBzdGVwOiAxMCwgdW5pdDogJycsIHByZWNpc2lvbjogMCwgfSxcbiAgICBtYXRlcmlhbDogeyB0aXRsZTogJ+adkOi0qCcgfSxcbiAgICBzdGFpck1hdGVyaWFsOiB7IHRpdGxlOiAn6Zi25qKv5p2Q6LSoJyB9LFxuICAgIHBsYXRmb3JtTWF0ZXJpYWw6IHsgdGl0bGU6ICflubPlj7DmnZDotKgnIH0sXG4gICAgaGFuZHJhaWw6IHtcbiAgICAgICAgdGl0bGU6ICflkK/nlKjmoI/mnYYnLFxuICAgICAgICBoZWlnaHQ6IHsgdGl0bGU6IFwi6auY5bqmXCIsIG1pbjogMSwgbWF4OiAxMDAwMDAsIHN0ZXA6IDEwLCB1bml0OiAnJywgcHJlY2lzaW9uOiAwLCB9LFxuICAgICAgICByYWlsOiB7XG4gICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi5qC35byPXCIsXG4gICAgICAgICAgICAgICAgc2VsZWN0T3B0aW9uczogW1xuICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBSYWlsVHlwZS5DaXJjbGUsIGxhYmVsOiBcIuWchuW9olwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IFJhaWxUeXBlLlJlY3QsIGxhYmVsOiBcIuaWueW9olwiIH0sXG4gICAgICAgICAgICAgICAgICAgIC8vIHsgdmFsdWU6IFJhaWxUeXBlLkN1c3RvbSwgbGFiZWw6IFwi5ou+5Y+WXCIgfSxcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBjb2x1bW46IHtcbiAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogXCLmoLflvI9cIixcbiAgICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IENvbHVtblR5cGUuQ2lyY2xlLCBsYWJlbDogXCLlnIblvaJcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBDb2x1bW5UeXBlLlJlY3QsIGxhYmVsOiBcIuaWueW9olwiIH0sXG4gICAgICAgICAgICAgICAgICAgIC8vIHsgdmFsdWU6IENvbHVtblR5cGUuQ3VzdG9tLCBsYWJlbDogXCLmi77lj5ZcIiB9LFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdGVwOiB7IHRpdGxlOiBcIumXtOmalFwiLCBtaW46IDEsIG1heDogMTAwMDAwLCBzdGVwOiAxMCwgdW5pdDogJycsIHByZWNpc2lvbjogMCwgfSxcbiAgICAgICAgfSxcbiAgICAgICAgY29tcG9uZW50UGFyYW06IHtcbiAgICAgICAgICAgIHJhZGl1czogeyB0aXRsZTogXCLljYrlvoRcIiwgbWluOiAxLCBtYXg6IDEwMDAwMCwgc3RlcDogMTAsIHVuaXQ6ICcnLCBwcmVjaXNpb246IDAsIH0sXG4gICAgICAgICAgICB3aWR0aDogeyB0aXRsZTogXCLlrr3luqZcIiwgbWluOiAxLCBtYXg6IDEwMDAwMCwgc3RlcDogMTAsIHVuaXQ6ICcnLCBwcmVjaXNpb246IDAsIH0sXG4gICAgICAgICAgICBoZWlnaHQ6IHsgdGl0bGU6IFwi6auY5bqmXCIsIG1pbjogMSwgbWF4OiAxMDAwMDAsIHN0ZXA6IDEwLCB1bml0OiAnJywgcHJlY2lzaW9uOiAwLCB9LFxuICAgICAgICB9XG4gICAgfVxufTtcbmV4cG9ydCBmdW5jdGlvbiBnZXRDb21wb25lbnRUaXRsZShjb21wb25lbnRUeXBlKSB7XG4gICAgaWYgKGNvbXBvbmVudFR5cGUgPT09IENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpcikge1xuICAgICAgICByZXR1cm4gJ+mYtic7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNvbXBvbmVudFR5cGUgPT09IENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpcikge1xuICAgICAgICByZXR1cm4gJ+mYtic7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gJ+WPsCc7XG4gICAgfVxufVxuZXhwb3J0IGNvbnN0IERlZmF1bHRTdGFpclBhcmFtID0ge1xuICAgIGhvcml6b250YWxTdGVwOiAyNTAsXG4gICAgdmVydGljYWxTdGVwOiAyNTAsXG4gICAgc3RhcnRXaWR0aDogMTAwMCxcbiAgICBlbmRXaWR0aDogMTAwMCxcbiAgICB1cHdhcmQ6IHRydWUsXG4gICAgcGxhdGZvcm1UaGlja25lc3M6IDIwMCxcbiAgICBzdGFpck1hdGVyaWFsOiBQcmVzZXRNYXRlcmlhbHMuU3RhaXIsXG4gICAgcGxhdGZvcm1NYXRlcmlhbDogUHJlc2V0TWF0ZXJpYWxzLlBsYXRmb3JtLFxuICAgIGhhbmRyYWlsOiB7XG4gICAgICAgIHN1cHBvcnQ6IHRydWUsXG4gICAgICAgIGhlaWdodDogNTAwLFxuICAgICAgICByYWlsOiB7XG4gICAgICAgICAgICB0eXBlOiBSYWlsVHlwZS5DaXJjbGUsXG4gICAgICAgICAgICBwYXJhbTogeyByYWRpdXM6IDIwLCB3aWR0aDogMjAsIGhlaWdodDogMjAsIH0sXG4gICAgICAgICAgICBtYXRlcmlhbDogUHJlc2V0TWF0ZXJpYWxzLkhhbmRyYWlsLnJhaWwsXG4gICAgICAgIH0sXG4gICAgICAgIGNvbHVtbjoge1xuICAgICAgICAgICAgdHlwZTogQ29sdW1uVHlwZS5DaXJjbGUsXG4gICAgICAgICAgICBzdGVwOiA1MDAsXG4gICAgICAgICAgICBwYXJhbTogeyByYWRpdXM6IDgsIHdpZHRoOiA4LCBoZWlnaHQ6IDgsIH0sXG4gICAgICAgICAgICBtYXRlcmlhbDogUHJlc2V0TWF0ZXJpYWxzLkhhbmRyYWlsLmNvbHVtbixcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHN0ZXBQcm9wb3J0aW9uYWw6IHRydWUsXG4gICAgd2lkdGhQcm9wb3J0aW9uYWw6IHRydWUsXG59O1xuZXhwb3J0IGZ1bmN0aW9uIGdldERlZmF1bHRTdGFpclBhcmFtKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGhvcml6b250YWxTdGVwOiAyNTAsXG4gICAgICAgIHZlcnRpY2FsU3RlcDogMjUwLFxuICAgICAgICBzdGFydFdpZHRoOiAxMDAwLFxuICAgICAgICBlbmRXaWR0aDogMTAwMCxcbiAgICAgICAgdXB3YXJkOiB0cnVlLFxuICAgICAgICBwbGF0Zm9ybVRoaWNrbmVzczogMjAwLFxuICAgICAgICBzdGFpck1hdGVyaWFsOiBQcmVzZXRNYXRlcmlhbHMuU3RhaXIsXG4gICAgICAgIHBsYXRmb3JtTWF0ZXJpYWw6IFByZXNldE1hdGVyaWFscy5QbGF0Zm9ybSxcbiAgICAgICAgaGFuZHJhaWw6IHtcbiAgICAgICAgICAgIHN1cHBvcnQ6IHRydWUsXG4gICAgICAgICAgICBoZWlnaHQ6IDUwMCxcbiAgICAgICAgICAgIHJhaWw6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBSYWlsVHlwZS5DaXJjbGUsXG4gICAgICAgICAgICAgICAgcGFyYW06IHsgcmFkaXVzOiAyMCwgd2lkdGg6IDIwLCBoZWlnaHQ6IDIwLCB9LFxuICAgICAgICAgICAgICAgIG1hdGVyaWFsOiBQcmVzZXRNYXRlcmlhbHMuSGFuZHJhaWwucmFpbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb2x1bW46IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBDb2x1bW5UeXBlLkNpcmNsZSxcbiAgICAgICAgICAgICAgICBzdGVwOiA1MDAsXG4gICAgICAgICAgICAgICAgcGFyYW06IHsgcmFkaXVzOiA4LCB3aWR0aDogOCwgaGVpZ2h0OiA4LCB9LFxuICAgICAgICAgICAgICAgIG1hdGVyaWFsOiBQcmVzZXRNYXRlcmlhbHMuSGFuZHJhaWwuY29sdW1uLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgc3RlcFByb3BvcnRpb25hbDogdHJ1ZSxcbiAgICAgICAgd2lkdGhQcm9wb3J0aW9uYWw6IHRydWUsXG4gICAgfTtcbn1cbmV4cG9ydCBjb25zdCBEZWZhdWx0Q29tcG9uZW50UGFyYW0gPSB7XG4gICAgaW5kZXg6IDAsXG4gICAgaG9yaXpvbnRhbFN0ZXA6IERlZmF1bHRTdGFpclBhcmFtLmhvcml6b250YWxTdGVwLFxuICAgIHZlcnRpY2FsU3RlcDogRGVmYXVsdFN0YWlyUGFyYW0udmVydGljYWxTdGVwLFxuICAgIHN0YXJ0V2lkdGg6IERlZmF1bHRTdGFpclBhcmFtLnN0YXJ0V2lkdGgsXG4gICAgZW5kV2lkdGg6IERlZmF1bHRTdGFpclBhcmFtLmVuZFdpZHRoLFxuICAgIG9mZnNldFdpZHRoOiAwLFxuICAgIHdpdGhPZmZzZXQ6IGZhbHNlLFxuICAgIHBsYXRmb3JtTGVuZ3RoOiAyMDAwLFxuICAgIHR5cGU6IENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpcixcbiAgICB1cHdhcmQ6IERlZmF1bHRTdGFpclBhcmFtLnVwd2FyZCxcbiAgICBwbGF0Zm9ybVRoaWNrbmVzczogRGVmYXVsdFN0YWlyUGFyYW0ucGxhdGZvcm1UaGlja25lc3MsXG4gICAgc3RlcFByb3BvcnRpb25hbDogRGVmYXVsdFN0YWlyUGFyYW0uc3RlcFByb3BvcnRpb25hbCxcbiAgICB3aWR0aFByb3BvcnRpb25hbDogdHJ1ZSxcbiAgICBwbGF0Zm9ybUxlbmd0aExvY2tlZDogZmFsc2UsXG4gICAgLy8gc3RlcFR5cGU6IFN0ZXBUeXBlLk5vcm1hbCxcbiAgICAvLyBjb3JuZXJUeXBlOiBDb3JuZXJUeXBlLlJlY3RhbmdsZSxcbn07XG5leHBvcnQgdmFyIENvbXBvbmVudERpcmVjdGlvblR5cGU7XG4oZnVuY3Rpb24gKENvbXBvbmVudERpcmVjdGlvblR5cGUpIHtcbiAgICBDb21wb25lbnREaXJlY3Rpb25UeXBlW0NvbXBvbmVudERpcmVjdGlvblR5cGVbXCJGcm9udFwiXSA9IDBdID0gXCJGcm9udFwiO1xuICAgIENvbXBvbmVudERpcmVjdGlvblR5cGVbQ29tcG9uZW50RGlyZWN0aW9uVHlwZVtcIlJpZ2h0RnJvbnRcIl0gPSAxXSA9IFwiUmlnaHRGcm9udFwiO1xuICAgIENvbXBvbmVudERpcmVjdGlvblR5cGVbQ29tcG9uZW50RGlyZWN0aW9uVHlwZVtcIlJpZ2h0XCJdID0gMl0gPSBcIlJpZ2h0XCI7XG4gICAgQ29tcG9uZW50RGlyZWN0aW9uVHlwZVtDb21wb25lbnREaXJlY3Rpb25UeXBlW1wiTGVmdFwiXSA9IDNdID0gXCJMZWZ0XCI7XG4gICAgQ29tcG9uZW50RGlyZWN0aW9uVHlwZVtDb21wb25lbnREaXJlY3Rpb25UeXBlW1wiTGVmdEZyb250XCJdID0gNF0gPSBcIkxlZnRGcm9udFwiO1xufSkoQ29tcG9uZW50RGlyZWN0aW9uVHlwZSB8fCAoQ29tcG9uZW50RGlyZWN0aW9uVHlwZSA9IHt9KSk7XG5leHBvcnQgdmFyIENpcmN1bGFyU2lkZTtcbihmdW5jdGlvbiAoQ2lyY3VsYXJTaWRlKSB7XG4gICAgQ2lyY3VsYXJTaWRlW0NpcmN1bGFyU2lkZVtcIkxlZnRcIl0gPSAwXSA9IFwiTGVmdFwiO1xuICAgIENpcmN1bGFyU2lkZVtDaXJjdWxhclNpZGVbXCJSaWdodFwiXSA9IDFdID0gXCJSaWdodFwiO1xufSkoQ2lyY3VsYXJTaWRlIHx8IChDaXJjdWxhclNpZGUgPSB7fSkpO1xuZXhwb3J0IGZ1bmN0aW9uIGlzQXhpc1ZhbGlkKGF4aXMpIHtcbiAgICByZXR1cm4gYXhpcyA9PT0gXCJYXCIgLyogQXhpcy5YICovIHx8IGF4aXMgPT09IFwiLVhcIiAvKiBBeGlzLlhNaW51cyAqLyB8fCBheGlzID09PSBcIllcIiAvKiBBeGlzLlkgKi8gfHwgYXhpcyA9PT0gXCItWVwiIC8qIEF4aXMuWU1pbnVzICovIHx8IGF4aXMgPT09IFwiWlwiIC8qIEF4aXMuWiAqLyB8fCBheGlzID09PSBcIi1aXCIgLyogQXhpcy5aTWludXMgKi87XG59XG4iLCJpbXBvcnQgeyBkcmF3U3RhaXJzVG9vbCB9IGZyb20gXCIuL2luZGV4XCI7XG5pbXBvcnQgeyBEaXJlY3Rpb25YLCBEaXJlY3Rpb25ZIH0gZnJvbSBcIi4vY29uc3RzXCI7XG5pbXBvcnQgeyBCYXNlTGluZTNkRGVsaW1pdGVyLCBDb2x1bW5UeXBlLCBDb29yZERlbGltaXRlciwgRGVmYXVsdENvbXBvbmVudFBhcmFtLCBEZWxpbWl0ZXIsIGdldERlZmF1bHRTdGFpclBhcmFtLCBSYWlsVHlwZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5leHBvcnQgZnVuY3Rpb24gaXNLQXJjaEZhY2UoZW50aXR5KSB7XG4gICAgcmV0dXJuICEhZW50aXR5ICYmIChlbnRpdHkuZ2V0VHlwZSgpID09PSBLQXJjaEZhY2VUeXBlLk5vblBsYW5hciB8fCBlbnRpdHkuZ2V0VHlwZSgpID09PSBLQXJjaEZhY2VUeXBlLlBsYW5hcik7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNLR3JvdXBJbnN0YW5jZShlbnRpdHkpIHtcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS0VudGl0eVR5cGUuR3JvdXBJbnN0YW5jZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0tGYWNlKGVudGl0eSkge1xuICAgIHJldHVybiAhIWVudGl0eSAmJiBlbnRpdHkuZ2V0VHlwZSgpID09PSBLRW50aXR5VHlwZS5GYWNlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzS0VkZ2UoZW50aXR5KSB7XG4gICAgcmV0dXJuICEhZW50aXR5ICYmIGVudGl0eS5nZXRUeXBlKCkgPT09IEtFbnRpdHlUeXBlLkVkZ2U7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNLVmVydGV4KGVudGl0eSkge1xuICAgIHJldHVybiAhIWVudGl0eSAmJiBlbnRpdHkuZ2V0VHlwZSgpID09PSBLRW50aXR5VHlwZS5WZXJ0ZXg7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNLQXV4aWxpYXJ5Qm91bmRlZEN1cnZlKGVudGl0eSkge1xuICAgIHJldHVybiAhIWVudGl0eSAmJiBlbnRpdHkuZ2V0VHlwZSgpID09PSBLRW50aXR5VHlwZS5BdXhpbGlhcnlCb3VuZGVkQ3VydmU7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNLQXV4aWxpYXJ5TGluZShlbnRpdHkpIHtcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS0VudGl0eVR5cGUuQXV4aWxpYXJ5TGluZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0tQbGFuZShlbnRpdHkpIHtcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS1N1cmZhY2VUeXBlLlBsYW5lO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzS0xpbmVTZWdtZW50M2QoZW50aXR5KSB7XG4gICAgcmV0dXJuICEhZW50aXR5ICYmICEhZW50aXR5LmRpcmVjdGlvbjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0tBcmMzZChlbnRpdHkpIHtcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgISFlbnRpdHkuY2lyY2xlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeU1hdGVyaWFsKG1hdGVyaWFsKSB7XG4gICAgbGV0IHZhbHVlID0gJyc7XG4gICAgaWYgKG1hdGVyaWFsLm1hdGVyaWFsSWQpIHtcbiAgICAgICAgdmFsdWUgKz0gYG1pZD0ke21hdGVyaWFsLm1hdGVyaWFsSWR9JHtEZWxpbWl0ZXJ9YDtcbiAgICB9XG4gICAgaWYgKG1hdGVyaWFsLmJnaWQpIHtcbiAgICAgICAgdmFsdWUgKz0gYGJpZD0ke21hdGVyaWFsLmJnaWR9JHtEZWxpbWl0ZXJ9YDtcbiAgICB9XG4gICAgaWYgKG1hdGVyaWFsLmltZ1VybCkge1xuICAgICAgICB2YWx1ZSArPSBgaW1nPSR7bWF0ZXJpYWwuaW1nVXJsfSR7RGVsaW1pdGVyfWA7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZS5zbGljZSgwLCB2YWx1ZS5sZW5ndGggLSAxKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZU1hdGVyaWFsKHZhbHVlKSB7XG4gICAgY29uc3QgbWF0ZXJpYWwgPSB7fTtcbiAgICBjb25zdCBpdGVtcyA9IHZhbHVlLnNwbGl0KERlbGltaXRlcik7XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgIGNvbnN0IGtleVZhbHVlID0gaXRlbS5zcGxpdCgnPScpO1xuICAgICAgICBpZiAoa2V5VmFsdWUubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGtleVZhbHVlWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWlkJzpcbiAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWwubWF0ZXJpYWxJZCA9IGtleVZhbHVlWzFdO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdiaWQnOlxuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbC5iZ2lkID0ga2V5VmFsdWVbMV07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2ltZyc6XG4gICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsLmltZ1VybCA9IGtleVZhbHVlWzFdO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBtYXRlcmlhbDtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5U3RhaXJQYXJhbShwYXJhbSkge1xuICAgIGxldCB2YWx1ZSA9ICcnO1xuICAgIHZhbHVlICs9IGBocz0ke3BhcmFtLmhvcml6b250YWxTdGVwfSR7RGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYHZzPSR7cGFyYW0udmVydGljYWxTdGVwfSR7RGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYHN3PSR7cGFyYW0uc3RhcnRXaWR0aH0ke0RlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGBldz0ke3BhcmFtLmVuZFdpZHRofSR7RGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYHVwPSR7cGFyYW0udXB3YXJkID8gMSA6IDB9JHtEZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgcHRrPSR7cGFyYW0ucGxhdGZvcm1UaGlja25lc3N9YDtcbiAgICBpZiAocGFyYW0uaGFuZHJhaWwuc3VwcG9ydCkge1xuICAgICAgICBjb25zdCB7IGhhbmRyYWlsOiB7IGhlaWdodCwgcmFpbCwgY29sdW1uIH0gfSA9IHBhcmFtO1xuICAgICAgICB2YWx1ZSArPSBgaGg9JHtoZWlnaHR9JHtEZWxpbWl0ZXJ9YDtcbiAgICAgICAgdmFsdWUgKz0gYGhydD0ke3JhaWwudHlwZX0ke0RlbGltaXRlcn1gO1xuICAgICAgICBpZiAocmFpbC50eXBlID09PSBSYWlsVHlwZS5DaXJjbGUgJiYgcmFpbC5wYXJhbS5yYWRpdXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFsdWUgKz0gYGhycj0ke3JhaWwucGFyYW0ucmFkaXVzfSR7RGVsaW1pdGVyfWA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocmFpbC50eXBlID09PSBSYWlsVHlwZS5SZWN0KSB7XG4gICAgICAgICAgICBpZiAocmFpbC5wYXJhbS53aWR0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgKz0gYGhydz0ke3JhaWwucGFyYW0ud2lkdGh9JHtEZWxpbWl0ZXJ9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyYWlsLnBhcmFtLmhlaWdodCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgKz0gYGhyaD0ke3JhaWwucGFyYW0uaGVpZ2h0fSR7RGVsaW1pdGVyfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFsdWUgKz0gYGhjdD0ke2NvbHVtbi50eXBlfSR7RGVsaW1pdGVyfWA7XG4gICAgICAgIHZhbHVlICs9IGBoY3M9JHtjb2x1bW4uc3RlcH0ke0RlbGltaXRlcn1gO1xuICAgICAgICBpZiAoY29sdW1uLnR5cGUgPT09IENvbHVtblR5cGUuQ2lyY2xlICYmIGNvbHVtbi5wYXJhbS5yYWRpdXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFsdWUgKz0gYGhjcj0ke2NvbHVtbi5wYXJhbS5yYWRpdXN9JHtEZWxpbWl0ZXJ9YDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb2x1bW4udHlwZSA9PT0gQ29sdW1uVHlwZS5SZWN0KSB7XG4gICAgICAgICAgICBpZiAoY29sdW1uLnBhcmFtLndpZHRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSArPSBgaGN3PSR7Y29sdW1uLnBhcmFtLndpZHRofSR7RGVsaW1pdGVyfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY29sdW1uLnBhcmFtLmhlaWdodCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgKz0gYGhjaD0ke2NvbHVtbi5wYXJhbS5oZWlnaHR9JHtEZWxpbWl0ZXJ9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWUuc2xpY2UoMCwgdmFsdWUubGVuZ3RoIC0gMSk7XG59XG5leHBvcnQgZnVuY3Rpb24gcGFyc2VTdGFpclBhcmFtKHZhbHVlKSB7XG4gICAgY29uc3QgcGFyYW0gPSBnZXREZWZhdWx0U3RhaXJQYXJhbSgpO1xuICAgIGNvbnN0IGl0ZW1zID0gdmFsdWUuc3BsaXQoRGVsaW1pdGVyKTtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgICAgY29uc3Qga2V5VmFsdWUgPSBpdGVtLnNwbGl0KCc9Jyk7XG4gICAgICAgIGlmIChrZXlWYWx1ZS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoa2V5VmFsdWVbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlICdocyc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmhvcml6b250YWxTdGVwID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd2cyc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnZlcnRpY2FsU3RlcCA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3cnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5zdGFydFdpZHRoID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdldyc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmVuZFdpZHRoID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd1cCc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnVwd2FyZCA9IGtleVZhbHVlWzFdID09PSAnMScgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3B0ayc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnBsYXRmb3JtVGhpY2tuZXNzID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdoaCc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmhhbmRyYWlsLmhlaWdodCA9IHBhcnNlRmxvYXQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdocnQnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5oYW5kcmFpbC5yYWlsLnR5cGUgPSBwYXJzZUZsb2F0KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnaHJyJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uaGFuZHJhaWwucmFpbC5wYXJhbS5yYWRpdXMgPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hydyc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmhhbmRyYWlsLnJhaWwucGFyYW0ud2lkdGggPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hyaCc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmhhbmRyYWlsLnJhaWwucGFyYW0uaGVpZ2h0ID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdoY3QnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5oYW5kcmFpbC5jb2x1bW4udHlwZSA9IHBhcnNlRmxvYXQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdoY3MnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5oYW5kcmFpbC5jb2x1bW4uc3RlcCA9IHBhcnNlRmxvYXQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdoY3InOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5oYW5kcmFpbC5jb2x1bW4ucGFyYW0ucmFkaXVzID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdoY3cnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5oYW5kcmFpbC5jb2x1bW4ucGFyYW0ud2lkdGggPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hjaCc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmhhbmRyYWlsLmNvbHVtbi5wYXJhbS5oZWlnaHQgPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHBhcmFtLnN0ZXBQcm9wb3J0aW9uYWwgPSB0cnVlO1xuICAgIHBhcmFtLndpZHRoUHJvcG9ydGlvbmFsID0gdHJ1ZTtcbiAgICByZXR1cm4gcGFyYW07XG59XG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5Q29tcG9uZW50UGFyYW0ocGFyYW0pIHtcbiAgICBsZXQgdmFsdWUgPSAnJztcbiAgICB2YWx1ZSArPSBgaW5kPSR7cGFyYW0uaW5kZXh9JHtEZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgaHM9JHtwYXJhbS5ob3Jpem9udGFsU3RlcH0ke0RlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGB2cz0ke3BhcmFtLnZlcnRpY2FsU3RlcH0ke0RlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGBzdz0ke3BhcmFtLnN0YXJ0V2lkdGh9JHtEZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgZXc9JHtwYXJhbS5lbmRXaWR0aH0ke0RlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGBvdz0ke3BhcmFtLm9mZnNldFdpZHRofSR7RGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYHBsPSR7cGFyYW0ucGxhdGZvcm1MZW5ndGh9JHtEZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgdHA9JHtwYXJhbS50eXBlfSR7RGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYHVwPSR7cGFyYW0udXB3YXJkID8gMSA6IDB9JHtEZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgcHRrPSR7cGFyYW0ucGxhdGZvcm1UaGlja25lc3N9YDtcbiAgICByZXR1cm4gdmFsdWU7XG59XG5leHBvcnQgZnVuY3Rpb24gcGFyc2VDb21wb25lbnRQYXJhbSh2YWx1ZSkge1xuICAgIGNvbnN0IHBhcmFtID0gT2JqZWN0LmFzc2lnbih7fSwgRGVmYXVsdENvbXBvbmVudFBhcmFtKTtcbiAgICBjb25zdCBpdGVtcyA9IHZhbHVlLnNwbGl0KERlbGltaXRlcik7XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgIGNvbnN0IGtleVZhbHVlID0gaXRlbS5zcGxpdCgnPScpO1xuICAgICAgICBpZiAoa2V5VmFsdWUubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGtleVZhbHVlWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnaW5kJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uaW5kZXggPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hzJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uaG9yaXpvbnRhbFN0ZXAgPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3ZzJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0udmVydGljYWxTdGVwID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdzdyc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnN0YXJ0V2lkdGggPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2V3JzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uZW5kV2lkdGggPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ293JzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0ub2Zmc2V0V2lkdGggPSBwYXJzZUZsb2F0KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncGwnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5wbGF0Zm9ybUxlbmd0aCA9IHBhcnNlRmxvYXQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd0cCc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnR5cGUgPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3VwJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0udXB3YXJkID0ga2V5VmFsdWVbMV0gPT09ICcxJyA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncHRrJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0ucGxhdGZvcm1UaGlja25lc3MgPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHBhcmFtLnN0ZXBQcm9wb3J0aW9uYWwgPSB0cnVlO1xuICAgIHBhcmFtLndpZHRoUHJvcG9ydGlvbmFsID0gdHJ1ZTtcbiAgICBwYXJhbS5wbGF0Zm9ybUxlbmd0aExvY2tlZCA9IHRydWU7XG4gICAgcGFyYW0ubW9kZWxFZGl0aW5nID0gdHJ1ZTtcbiAgICByZXR1cm4gcGFyYW07XG59XG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5U3RhcnRFbmQoc3RhcnQsIGVuZCkge1xuICAgIGxldCB2YWx1ZSA9ICcnO1xuICAgIHZhbHVlICs9IGAke3N0YXJ0Lnh9JHtDb29yZERlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGAke3N0YXJ0Lnl9JHtDb29yZERlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGAke3N0YXJ0Lnp9JHtEZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgJHtlbmQueH0ke0Nvb3JkRGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYCR7ZW5kLnl9JHtDb29yZERlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGAke2VuZC56fWA7XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTGluZVNlZzNkKHZhbHVlKSB7XG4gICAgY29uc3QgaXRlbXMgPSB2YWx1ZS5zcGxpdChEZWxpbWl0ZXIpO1xuICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgY29uc3Qgc3RhcnRLZXlWYWx1ZSA9IGl0ZW1zWzBdLnNwbGl0KENvb3JkRGVsaW1pdGVyKTtcbiAgICAgICAgY29uc3QgZW5kS2V5VmFsdWUgPSBpdGVtc1sxXS5zcGxpdChDb29yZERlbGltaXRlcik7XG4gICAgICAgIGlmIChzdGFydEtleVZhbHVlLmxlbmd0aCA9PT0gMyAmJiBlbmRLZXlWYWx1ZS5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKHBhcnNlRmxvYXQoc3RhcnRLZXlWYWx1ZVswXSksIHBhcnNlRmxvYXQoc3RhcnRLZXlWYWx1ZVsxXSksIHBhcnNlRmxvYXQoc3RhcnRLZXlWYWx1ZVsyXSkpO1xuICAgICAgICAgICAgY29uc3QgZW5kID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKHBhcnNlRmxvYXQoZW5kS2V5VmFsdWVbMF0pLCBwYXJzZUZsb2F0KGVuZEtleVZhbHVlWzFdKSwgcGFyc2VGbG9hdChlbmRLZXlWYWx1ZVsyXSkpO1xuICAgICAgICAgICAgcmV0dXJuIHsgc3RhcnQsIGVuZCB9O1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlU3RhcnRFbmQodmFsdWUpIHtcbiAgICBjb25zdCBpdGVtcyA9IHZhbHVlLnNwbGl0KERlbGltaXRlcik7XG4gICAgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gMikge1xuICAgICAgICBjb25zdCBzdGFydEtleVZhbHVlID0gaXRlbXNbMF0uc3BsaXQoQ29vcmREZWxpbWl0ZXIpO1xuICAgICAgICBjb25zdCBlbmRLZXlWYWx1ZSA9IGl0ZW1zWzFdLnNwbGl0KENvb3JkRGVsaW1pdGVyKTtcbiAgICAgICAgaWYgKHN0YXJ0S2V5VmFsdWUubGVuZ3RoID09PSAzICYmIGVuZEtleVZhbHVlLmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QocGFyc2VGbG9hdChzdGFydEtleVZhbHVlWzBdKSwgcGFyc2VGbG9hdChzdGFydEtleVZhbHVlWzFdKSwgMCk7XG4gICAgICAgICAgICBjb25zdCBlbmQgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QocGFyc2VGbG9hdChlbmRLZXlWYWx1ZVswXSksIHBhcnNlRmxvYXQoZW5kS2V5VmFsdWVbMV0pLCAwKTtcbiAgICAgICAgICAgIHJldHVybiB7IHN0YXJ0LCBlbmQsIHN0YXJ0SGVpZ2h0OiBwYXJzZUZsb2F0KHN0YXJ0S2V5VmFsdWVbMl0pLCBlbmRIZWlnaHQ6IHBhcnNlRmxvYXQoZW5kS2V5VmFsdWVbMl0pIH07XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5UG9pbnQzZChwb2ludCkge1xuICAgIGxldCB2YWx1ZSA9ICcnO1xuICAgIHZhbHVlICs9IGAke3BvaW50Lnh9JHtDb29yZERlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGAke3BvaW50Lnl9JHtDb29yZERlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGAke3BvaW50Lnp9YDtcbiAgICByZXR1cm4gdmFsdWU7XG59XG5leHBvcnQgZnVuY3Rpb24gcGFyc2VWZWN0b3IzZCh2YWx1ZSkge1xuICAgIGNvbnN0IGl0ZW1zID0gdmFsdWUuc3BsaXQoQ29vcmREZWxpbWl0ZXIpO1xuICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgY29uc3QgdmVjdG9yID0gR2VvbUxpYi5jcmVhdGVWZWN0b3IzZChwYXJzZUZsb2F0KGl0ZW1zWzBdKSwgcGFyc2VGbG9hdChpdGVtc1sxXSksIHBhcnNlRmxvYXQoaXRlbXNbMl0pKTtcbiAgICAgICAgcmV0dXJuIHZlY3RvcjtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5QmFzZUNvbXBvbmVudChiYXNlU2VnbWVudCwgbGluZTNkSW5kZXgpIHtcbiAgICBsZXQgdmFsdWUgPSAnJztcbiAgICB2YWx1ZSArPSBgJHtiYXNlU2VnbWVudC5wYXJhbS5pbmRleH1gO1xuICAgIGlmIChsaW5lM2RJbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlICs9IGAke0Nvb3JkRGVsaW1pdGVyfSR7bGluZTNkSW5kZXh9YDtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQmFzZUNvbXBvbmVudCh2YWx1ZSkge1xuICAgIGNvbnN0IGl0ZW1zID0gdmFsdWUuc3BsaXQoQmFzZUxpbmUzZERlbGltaXRlcik7XG4gICAgaWYgKGl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgYmFzZUNvbXBvbmVudEluZGV4ID0gcGFyc2VJbnQoaXRlbXNbMF0pO1xuICAgICAgICBsZXQgbGluZTNkSW5kZXg7XG4gICAgICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIGxpbmUzZEluZGV4ID0gcGFyc2VJbnQoaXRlbXNbMV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGNvbXBvbmVudEluZGV4OiBiYXNlQ29tcG9uZW50SW5kZXgsIGxpbmUzZEluZGV4IH07XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGlzRXF1YWwoYSwgYiwgdG9sZXJhbmNlID0gMSkge1xuICAgIHJldHVybiBNYXRoLmFicyhhIC0gYikgPD0gdG9sZXJhbmNlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldENvb3JkaW5hdGUobm9ybWFsKSB7XG4gICAgbGV0IGR4ID0gRGlyZWN0aW9uWDtcbiAgICBsZXQgZHkgPSBEaXJlY3Rpb25ZO1xuICAgIGxldCBkeiA9IG5vcm1hbC5ub3JtYWxpemVkKCk7XG4gICAgaWYgKERpcmVjdGlvblguaXNQYXJhbGxlbChkeikpIHtcbiAgICAgICAgZHggPSBEaXJlY3Rpb25ZLmNyb3NzKGR6KS5ub3JtYWxpemVkKCk7XG4gICAgICAgIGR5ID0gZHouY3Jvc3MoZHkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZHkgPSBkei5jcm9zcyhkeCk7XG4gICAgICAgIGR4ID0gZHkuY3Jvc3MoZHopO1xuICAgIH1cbiAgICByZXR1cm4geyBkeCwgZHksIGR6IH07XG59XG5sZXQgaXNJbk9wZXJhdGlvbiA9IGZhbHNlO1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0T3BlcmF0aW9uKCkge1xuICAgIGlzSW5PcGVyYXRpb24gPSB0cnVlO1xuICAgIGFwcC5nZXRBY3RpdmVEZXNpZ24oKS5zdGFydE9wZXJhdGlvbigpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNvbW1pdE9wZXJhdGlvbigpIHtcbiAgICBpc0luT3BlcmF0aW9uID0gZmFsc2U7XG4gICAgYXBwLmdldEFjdGl2ZURlc2lnbigpLmNvbW1pdE9wZXJhdGlvbigpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGFib3J0T3BlcmF0aW9uKCkge1xuICAgIGlzSW5PcGVyYXRpb24gPSBmYWxzZTtcbiAgICBhcHAuZ2V0QWN0aXZlRGVzaWduKCkuYWJvcnRPcGVyYXRpb24oKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBvbk1vZGVsQ2hhbmdlZChjaGFuZ2VzKSB7XG4gICAgY29uc3QgZGVsZXRlZCA9IGNoYW5nZXMuZGVsZXRlZDtcbiAgICBjb25zdCBhZGRlZCA9IGNoYW5nZXMuYWRkZWQ7XG4gICAgLy8gY29uc3QgZWRpdE1vZGVsID0gZHJhd1N0YWlyc1Rvb2wuZ2V0RWRpdE1vZGVsKCk7XG4gICAgaWYgKCFpc0luT3BlcmF0aW9uICYmICgoZGVsZXRlZCA9PT0gbnVsbCB8fCBkZWxldGVkID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkZWxldGVkLmxlbmd0aCkgfHwgKGFkZGVkID09PSBudWxsIHx8IGFkZGVkID09PSB2b2lkIDAgPyB2b2lkIDAgOiBhZGRlZC5sZW5ndGgpKSkge1xuICAgICAgICAvLyBpZiAoZGVsZXRlZC5zb21lKGRlbGV0ZUdyb3VwID0+IGVkaXRNb2RlbC5wYXJlbnQuZGVmaW5pdGlvbktleSA9PT0gZGVsZXRlR3JvdXAuZ2V0S2V5KCkpKSB7XG4gICAgICAgIGRyYXdTdGFpcnNUb29sLmNsZWFyRWRpdE1vZGVsKCk7XG4gICAgICAgIC8vIH1cbiAgICB9XG59XG4iLCJleHBvcnQgdmFyIE1lc3NhZ2VUeXBlO1xuKGZ1bmN0aW9uIChNZXNzYWdlVHlwZSkge1xuICAgIE1lc3NhZ2VUeXBlW1wiRHJhd1N0YWlyVmlld01vdW50ZWRcIl0gPSBcImRyYXdTdGFpclZpZXdNb3VudGVkXCI7XG4gICAgTWVzc2FnZVR5cGVbXCJTdGFpclBhcmFtQ2hhbmdlZEJ5SW5wdXRcIl0gPSBcInN0YWlyUGFyYW1DaGFuZ2VkQnlJbnB1dFwiO1xuICAgIE1lc3NhZ2VUeXBlW1wiU3RhaXJQYXJhbUNoYW5nZWRCeURyYXdcIl0gPSBcInN0YWlyUGFyYW1DaGFuZ2VkQnlEcmF3XCI7XG4gICAgTWVzc2FnZVR5cGVbXCJQYXJhbUNoYW5nZWRCeUlucHV0XCJdID0gXCJwYXJhbUNoYW5nZWRCeUlucHV0XCI7XG4gICAgTWVzc2FnZVR5cGVbXCJQYXJhbUNoYW5nZWRCeURyYXdcIl0gPSBcInBhcmFtQ2hhbmdlZEJ5RHJhd1wiO1xuICAgIE1lc3NhZ2VUeXBlW1wiQ29tcG9uZW50QWRkZWRcIl0gPSBcImNvbXBvbmVudEFkZGVkXCI7XG4gICAgTWVzc2FnZVR5cGVbXCJEcmF3U3RhaXJNb2RlbFNldHRsZWRcIl0gPSBcImRyYXdTdGFpck1vZGVsU2V0dGxlZFwiO1xuICAgIE1lc3NhZ2VUeXBlW1wiUHJvcGVydGllc1Zpc2libGVcIl0gPSBcInByb3BlcnRpZXNWaXNpYmxlXCI7XG4gICAgTWVzc2FnZVR5cGVbXCJGb2N1c0NvbXBvbmVudEluZGV4XCJdID0gXCJmb2N1c0NvbXBvbmVudEluZGV4XCI7XG4gICAgTWVzc2FnZVR5cGVbXCJSZW1vdmVDb21wb25lbnRcIl0gPSBcInJlbW92ZUNvbXBvbmVudFwiO1xuICAgIE1lc3NhZ2VUeXBlW1wiTWF0ZXJpYWxSZXBsYWNlQ2xpY2tcIl0gPSBcIm1hdGVyaWFsUmVwbGFjZUNsaWNrXCI7XG4gICAgTWVzc2FnZVR5cGVbXCJBY3RpdmF0ZURyYXdTdGFpcnNUb29sXCJdID0gXCJhY3RpdmF0ZURyYXdTdGFpcnNUb29sXCI7XG4gICAgTWVzc2FnZVR5cGVbXCJEZUFjdGl2YXRlRHJhd1N0YWlyc1Rvb2xcIl0gPSBcImRlQWN0aXZhdGVEcmF3U3RhaXJzVG9vbFwiO1xuICAgIE1lc3NhZ2VUeXBlW1wiTGVhdmVEcmF3U3RhaXJzVG9vbFwiXSA9IFwibGVhdmVEcmF3U3RhaXJzVG9vbFwiO1xufSkoTWVzc2FnZVR5cGUgfHwgKE1lc3NhZ2VUeXBlID0ge30pKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvbWFpbi9tYWluLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9