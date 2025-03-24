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
        pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.DrawStairModelSettled, componentParams: [firstSegment.param], stairParam: this.stairParam, newStair: true }, '*');
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
                            pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.DrawStairModelSettled, componentParams: this.segments.map(seg => (Object.assign({}, seg.param))), stairParam: this.stairParam }, '*');
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
                    pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.DrawStairModelSettled, componentParams: this.segments.map(seg => (Object.assign({}, seg.param))), stairParam: this.stairParam }, '*');
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
        pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.DrawStairModelSettled }, '*');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLGtEQUFjO0FBQ3RCO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDaFZPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxrQ0FBa0M7Ozs7Ozs7VUNoQm5DO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvLi9zcmMvbWFpbi9tYWluLnRzIiwid2VicGFjazovL2RyYXctc3RhaXJzLy4vc3JjL21haW4vdG9vbHMvRHJhd1N0YWlyc1Rvb2wvY29uc3RzLnRzIiwid2VicGFjazovL2RyYXctc3RhaXJzLy4vc3JjL21haW4vdG9vbHMvRHJhd1N0YWlyc1Rvb2wvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvLi9zcmMvbWFpbi90b29scy9EcmF3U3RhaXJzVG9vbC9tZXNoVXRpbHMudHMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvLi9zcmMvbWFpbi90b29scy9EcmF3U3RhaXJzVG9vbC90ZW1wTWVzaFV0aWxzLnRzIiwid2VicGFjazovL2RyYXctc3RhaXJzLy4vc3JjL21haW4vdG9vbHMvRHJhd1N0YWlyc1Rvb2wvdHlwZXMudHMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvLi9zcmMvbWFpbi90b29scy9EcmF3U3RhaXJzVG9vbC91dGlscy50cyIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy8uL3NyYy9tYWluL3R5cGVzLnRzIiwid2VicGFjazovL2RyYXctc3RhaXJzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2RyYXctc3RhaXJzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2RyYXctc3RhaXJzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgZHJhd1N0YWlyc1Rvb2wgfSBmcm9tIFwiLi90b29scy9EcmF3U3RhaXJzVG9vbC9pbmRleFwiO1xuaW1wb3J0IHsgaXNLR3JvdXBJbnN0YW5jZSwgb25Nb2RlbENoYW5nZWQgfSBmcm9tIFwiLi90b29scy9EcmF3U3RhaXJzVG9vbC91dGlsc1wiO1xuaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi90eXBlc1wiO1xuY29uc3QgcGx1Z2luVUkgPSBhcHAuZ2V0UGx1Z2luVUkoKTtcbnBsdWdpblVJLnJlc2l6ZSgzNjAsIDcyMCk7XG5wbHVnaW5VSS5tb3VudCgpO1xubGV0IGFjdGl2YXRlZEN1c3RvbVRvb2w7XG5mdW5jdGlvbiBvblVJTWVzc2FnZShkYXRhKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChkYXRhLnR5cGUgPT09IE1lc3NhZ2VUeXBlLkRyYXdTdGFpclZpZXdNb3VudGVkKSB7XG4gICAgICAgICAgICAgICAgb25QbHVnaW5TdGFydFVwKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09IE1lc3NhZ2VUeXBlLkFjdGl2YXRlRHJhd1N0YWlyc1Rvb2wpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiAoZGF0YS50eXBlID09PSAnYWN0aXZhdGVTdHJhaWdodFN0YWlyc1Rvb2wnIHx8IGRhdGEudHlwZSA9PT0gJ2FjdGl2YXRlQ2lyY3VsYXJTdGFpcnNUb29sJykge1xuICAgICAgICAgICAgICAgIGlmIChhY3RpdmF0ZWRDdXN0b21Ub29sICE9PSBkcmF3U3RhaXJzVG9vbCkge1xuICAgICAgICAgICAgICAgICAgICBhcHAuYWN0aXZhdGVDdXN0b21Ub29sKGRyYXdTdGFpcnNUb29sLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZhdGVkQ3VzdG9tVG9vbCA9IGRyYXdTdGFpcnNUb29sO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBkcmF3U3RhaXJzVG9vbC5jaGFuZ2VDb21wb25lbnRUeXBlKGRhdGEuY29tcG9uZW50VHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09IE1lc3NhZ2VUeXBlLkRlQWN0aXZhdGVEcmF3U3RhaXJzVG9vbCkge1xuICAgICAgICAgICAgICAgIC8vIH0gZWxzZSBpZiAoZGF0YS50eXBlID09PSAnZGVBY3RpdmF0ZVN0cmFpZ2h0U3RhaXJzVG9vbCcgfHwgZGF0YS50eXBlID09PSAnZGVBY3RpdmF0ZUNpcmN1bGFyU3RhaXJzVG9vbCcpIHtcbiAgICAgICAgICAgICAgICBkZUFjdGl2YXRlRHJhd1N0YWlyc1Rvb2woKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gTWVzc2FnZVR5cGUuU3RhaXJQYXJhbUNoYW5nZWRCeUlucHV0KSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgKGFjdGl2YXRlZEN1c3RvbVRvb2wgPT09IGRyYXdTdGFpcnNUb29sKSB7XG4gICAgICAgICAgICAgICAgZHJhd1N0YWlyc1Rvb2wuY2hhbmdlU3RhaXJQYXJhbShkYXRhLnN0YWlyUGFyYW0sIGRhdGEuY2hhbmdlUGFyYW1zKTtcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09IE1lc3NhZ2VUeXBlLlBhcmFtQ2hhbmdlZEJ5SW5wdXQpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiAoYWN0aXZhdGVkQ3VzdG9tVG9vbCA9PT0gZHJhd1N0YWlyc1Rvb2wpIHtcbiAgICAgICAgICAgICAgICBkcmF3U3RhaXJzVG9vbC5jaGFuZ2VDb21wb25lbnRQYXJhbShkYXRhLmNvbXBvbmVudFBhcmFtLCBkYXRhLmNoYW5nZVBhcmFtcyk7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSBNZXNzYWdlVHlwZS5Gb2N1c0NvbXBvbmVudEluZGV4KSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgKGFjdGl2YXRlZEN1c3RvbVRvb2wgPT09IGRyYXdTdGFpcnNUb29sKSB7XG4gICAgICAgICAgICAgICAgZHJhd1N0YWlyc1Rvb2wuZm9jdXNDb21wb25lbnQoZGF0YS5jb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSBNZXNzYWdlVHlwZS5SZW1vdmVDb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiAoYWN0aXZhdGVkQ3VzdG9tVG9vbCA9PT0gZHJhd1N0YWlyc1Rvb2wpIHtcbiAgICAgICAgICAgICAgICBkcmF3U3RhaXJzVG9vbC5yZW1vdmVDb21wb25lbnQoZGF0YS5jb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSBNZXNzYWdlVHlwZS5NYXRlcmlhbFJlcGxhY2VDbGljaykge1xuICAgICAgICAgICAgICAgIC8vIGlmIChhY3RpdmF0ZWRDdXN0b21Ub29sID09PSBkcmF3U3RhaXJzVG9vbCkge1xuICAgICAgICAgICAgICAgIGRyYXdTdGFpcnNUb29sLm9uTWF0ZXJpYWxSZXBsYWNlQ2xpY2soZGF0YS5jaGFuZ2VQYXJhbSwgZGF0YS5pbmRleCk7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICBjbG9zZVBsdWdpbigpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZGVBY3RpdmF0ZURyYXdTdGFpcnNUb29sKCkge1xuICAgIGFjdGl2YXRlZEN1c3RvbVRvb2wgPSB1bmRlZmluZWQ7XG4gICAgYXBwLmRlYWN0aXZhdGVDdXN0b21Ub29sKGRyYXdTdGFpcnNUb29sLCBmYWxzZSk7XG59XG5wbHVnaW5VSS5vbk1lc3NhZ2Uob25VSU1lc3NhZ2UpO1xuY29uc3Qgc2VsZWN0aW9uID0gYXBwLmdldFNlbGVjdGlvbigpO1xuc2VsZWN0aW9uLmFkZE9ic2VydmVyKHtcbiAgICBvblNlbGVjdGlvbkNoYW5nZTogKCkgPT4ge1xuICAgICAgICBjb25zdCBhbGxFbnRpdGllcyA9IHNlbGVjdGlvbi5nZXRBbGxFbnRpdGllcygpO1xuICAgICAgICBpZiAoYWxsRW50aXRpZXMubGVuZ3RoID09PSAxICYmIGlzS0dyb3VwSW5zdGFuY2UoYWxsRW50aXRpZXNbMF0pKSB7XG4gICAgICAgICAgICBkcmF3U3RhaXJzVG9vbC5jbGVhclRlbXBTaGFwZXMoKTtcbiAgICAgICAgICAgIGRyYXdTdGFpcnNUb29sLnNldE1vZGVsKGFsbEVudGl0aWVzWzBdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhbGxFbnRpdGllcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGVkaXRQYXRoID0gYXBwLmdldEFjdGl2ZURlc2lnbigpLmdldEVkaXRQYXRoKCk7XG4gICAgICAgICAgICBjb25zdCBlZGl0TW9kZWwgPSBkcmF3U3RhaXJzVG9vbC5nZXRFZGl0TW9kZWwoKTtcbiAgICAgICAgICAgIGlmICghZWRpdE1vZGVsIHx8IChlZGl0UGF0aC5ldmVyeShpbnN0YW5jZSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlLmdldEtleSgpICE9PSBlZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlS2V5ICYmXG4gICAgICAgICAgICAgICAgICAgIFsuLi5lZGl0TW9kZWwuc3RhaXJzLnZhbHVlcygpXS5ldmVyeShjb21wID0+IGNvbXAuaW5zdGFuY2VLZXkgIT09IGluc3RhbmNlLmdldEtleSgpKSAmJlxuICAgICAgICAgICAgICAgICAgICBbLi4uZWRpdE1vZGVsLnBsYXRmb3Jtcy52YWx1ZXMoKV0uZXZlcnkoY29tcCA9PiBjb21wLmluc3RhbmNlS2V5ICE9PSBpbnN0YW5jZS5nZXRLZXkoKSkgJiZcbiAgICAgICAgICAgICAgICAgICAgKChfYSA9IGVkaXRNb2RlbC5oYW5kcmFpbCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmhhbmRyYWlsSW5zdGFuY2UuaW5zdGFuY2VLZXkpICE9PSBpbnN0YW5jZS5nZXRLZXkoKSAmJlxuICAgICAgICAgICAgICAgICAgICAoKF9iID0gZWRpdE1vZGVsLmhhbmRyYWlsKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IucmFpbEluc3RhbmNlcy5ldmVyeShjb21wID0+IGNvbXAuaW5zdGFuY2VLZXkgIT09IGluc3RhbmNlLmdldEtleSgpKSkgJiZcbiAgICAgICAgICAgICAgICAgICAgKChfYyA9IGVkaXRNb2RlbC5oYW5kcmFpbCkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmNvbHVtbkluc3RhbmNlcy5ldmVyeShjb21wID0+IGNvbXAuaW5zdGFuY2VLZXkgIT09IGluc3RhbmNlLmdldEtleSgpKSk7XG4gICAgICAgICAgICB9KSkpIHtcbiAgICAgICAgICAgICAgICBkcmF3U3RhaXJzVG9vbC5jbGVhclRlbXBTaGFwZXMoKTtcbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZhdGVkQ3VzdG9tVG9vbCAhPT0gZHJhd1N0YWlyc1Rvb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5Qcm9wZXJ0aWVzVmlzaWJsZSwgcHJvcGVydGllc1Zpc2libGU6IGZhbHNlIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7XG5mdW5jdGlvbiBvblBsdWdpblN0YXJ0VXAoKSB7XG4gICAgY29uc3QgYWxsRW50aXRpZXMgPSBzZWxlY3Rpb24uZ2V0QWxsRW50aXRpZXMoKTtcbiAgICBpZiAoYWxsRW50aXRpZXMubGVuZ3RoID09PSAxICYmIGlzS0dyb3VwSW5zdGFuY2UoYWxsRW50aXRpZXNbMF0pKSB7XG4gICAgICAgIGRyYXdTdGFpcnNUb29sLnNldE1vZGVsKGFsbEVudGl0aWVzWzBdKTtcbiAgICB9XG4gICAgYXBwLmFkZE9ic2VydmVyKHtcbiAgICAgICAgb25QbHVnaW5DbG9zZWQ6ICgpID0+IHtcbiAgICAgICAgfSxcbiAgICAgICAgb25Nb2RlbENoYW5nZWQsXG4gICAgfSk7XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnREaXJlY3Rpb25UeXBlLCBDb21wb25lbnRUeXBlLCBEZWZhdWx0Q29tcG9uZW50UGFyYW0sIERlZmF1bHRTdGFpclBhcmFtIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmV4cG9ydCBjb25zdCBkdW1teU1hdHJpeDQgPSBHZW9tTGliLmNyZWF0ZUlkZW50aXR5TWF0cml4NCgpO1xuZXhwb3J0IGNvbnN0IGR1bW15VmVjdG9yM2QgPSBHZW9tTGliLmNyZWF0ZVZlY3RvcjNkKDAsIDAsIDEpO1xuZXhwb3J0IGNvbnN0IGR1bW15UG9pbnQzZCA9IEdlb21MaWIuY3JlYXRlUG9pbnQzZCgwLCAwLCAwKTtcbmV4cG9ydCBjb25zdCBEaXJlY3Rpb25YID0gR2VvbUxpYi5jcmVhdGVWZWN0b3IzZCgxLCAwLCAwKTtcbmV4cG9ydCBjb25zdCBEaXJlY3Rpb25ZID0gR2VvbUxpYi5jcmVhdGVWZWN0b3IzZCgwLCAxLCAwKTtcbmV4cG9ydCBjb25zdCBEaXJlY3Rpb25aID0gR2VvbUxpYi5jcmVhdGVWZWN0b3IzZCgwLCAwLCAxKTtcbi8vIGNvbnN0IEhlaWdodFRvbGVyYW5jZTogbnVtYmVyID0gNTtcbmV4cG9ydCBjb25zdCBMZW5ndGhUb2xlcmFuY2UgPSAxMDtcbmV4cG9ydCBjb25zdCBEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSA9IE1hdGguUEkgLyAzNjtcbmV4cG9ydCBjb25zdCBBbmdsZVRvbGVyYW5jZSA9IE1hdGguUEkgLyAxODA7XG5leHBvcnQgY29uc3QgU3RlcENvdW50TGltaXQgPSA4MDtcbi8vIGNvbnN0IERlZmF1bHRCb2FyZFRoaWNrbmVzcyA9IDUwO1xuZXhwb3J0IGNvbnN0IFRlbXBMaW5lQ29sb3JzID0ge1xuICAgIFN0YWlyOiB7IHI6IDAsIGc6IDAsIGI6IDI1NSB9LFxuICAgIE1vbGQ6IHsgcjogMTMsIGc6IDcxLCBiOiAxNjEgfSxcbiAgICBIYW5kcmFpbDogeyByOiAwLCBnOiAwLCBiOiAwIH0sXG4gICAgSW5mZXJlbmNlOiB7IHI6IDAsIGc6IDAsIGI6IDAgfSxcbiAgICBGb2N1czogeyByOiAyNTUsIGc6IDAsIGI6IDAgfSxcbn07XG5leHBvcnQgY29uc3QgVGVtcExpbmVQYXR0ZXJucyA9IHtcbiAgICBIYW5kcmFpbDogS0xpbmVQYXR0ZXJuLkRhc2gsXG4gICAgU3RhaXJBbmRNb2xkOiBLTGluZVBhdHRlcm4uU29saWQsXG4gICAgSW5mZXJlbmNlOiBLTGluZVBhdHRlcm4uRGFzaCxcbn07XG5leHBvcnQgZnVuY3Rpb24gZ2V0TmV3Q29tcG9uZW50UGFyYW0odHlwZSwgYmFzZVNlZ21lbnQsIHVwd2FyZCkge1xuICAgIGxldCBzdGFydFdpZHRoID0gRGVmYXVsdFN0YWlyUGFyYW0uc3RhcnRXaWR0aDtcbiAgICBsZXQgZW5kV2lkdGggPSBEZWZhdWx0U3RhaXJQYXJhbS5lbmRXaWR0aDtcbiAgICBpZiAoYmFzZVNlZ21lbnQpIHtcbiAgICAgICAgY29uc3QgeyBwYXJhbTogeyBlbmRXaWR0aDogYmFzZVNlZ21lbnRFbmRXaWR0aCwgdHlwZTogYmFzZVNlZ21lbnRUeXBlIH0gfSA9IGJhc2VTZWdtZW50O1xuICAgICAgICBpZiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgaWYgKGJhc2VTZWdtZW50VHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgICAgIHN0YXJ0V2lkdGggPSBiYXNlU2VnbWVudEVuZFdpZHRoO1xuICAgICAgICAgICAgICAgIGVuZFdpZHRoID0gYmFzZVNlZ21lbnRFbmRXaWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0YXJ0V2lkdGggPSAyICogYmFzZVNlZ21lbnRFbmRXaWR0aDtcbiAgICAgICAgICAgICAgICBlbmRXaWR0aCA9IDIgKiBiYXNlU2VnbWVudEVuZFdpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGJhc2VTZWdtZW50VHlwZSAhPT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgICAgIHN0YXJ0V2lkdGggPSBiYXNlU2VnbWVudEVuZFdpZHRoO1xuICAgICAgICAgICAgICAgIGVuZFdpZHRoID0gYmFzZVNlZ21lbnRFbmRXaWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBEZWZhdWx0Q29tcG9uZW50UGFyYW0pLCB7IGluZGV4OiBiYXNlU2VnbWVudCA/IGJhc2VTZWdtZW50LnBhcmFtLmluZGV4ICsgMSA6IDAsIHR5cGUsXG4gICAgICAgIHN0YXJ0V2lkdGgsXG4gICAgICAgIGVuZFdpZHRoLCB1cHdhcmQ6IHVwd2FyZCA9PT0gdW5kZWZpbmVkID8gRGVmYXVsdENvbXBvbmVudFBhcmFtLnVwd2FyZCA6IHVwd2FyZCwgb2Zmc2V0V2lkdGg6IDAsIHdpdGhPZmZzZXQ6IGZhbHNlLCBwbGF0Zm9ybUxlbmd0aExvY2tlZDogZmFsc2UgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0TmV3U2VnbWVudCh0eXBlLCBiYXNlU2VnbWVudCwgdXB3YXJkKSB7XG4gICAgY29uc3QgcGFyYW0gPSBnZXROZXdDb21wb25lbnRQYXJhbSh0eXBlLCBiYXNlU2VnbWVudCwgdXB3YXJkKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGFydDogZHVtbXlQb2ludDNkLFxuICAgICAgICBlbmQ6IGR1bW15UG9pbnQzZCxcbiAgICAgICAgc3RhcnRMb2NrZWQ6IGZhbHNlLFxuICAgICAgICBlbmRMb2NrZWQ6IGZhbHNlLFxuICAgICAgICBzdGFydEhlaWdodDogMCxcbiAgICAgICAgZW5kSGVpZ2h0OiAwLFxuICAgICAgICBzdGFpclNoYXBlOiB7XG4gICAgICAgICAgICBzdGVwQ291bnQ6IDAsXG4gICAgICAgICAgICB2ZXJ0aWNlczogW10sXG4gICAgICAgICAgICB0ZW1wTGluZXM6IFtdLFxuICAgICAgICB9LFxuICAgICAgICBtb2xkU2hhcGU6IHtcbiAgICAgICAgICAgIHN0ZXBDb3VudDogMCxcbiAgICAgICAgICAgIHZlcnRpY2VzOiBbXSxcbiAgICAgICAgICAgIHRlbXBMaW5lczogW10sXG4gICAgICAgIH0sXG4gICAgICAgIGNvcm5lclNoYXBlOiB7XG4gICAgICAgICAgICBzdGVwQ291bnQ6IDAsXG4gICAgICAgICAgICB2ZXJ0aWNlczogW10sXG4gICAgICAgICAgICB0ZW1wTGluZXM6IFtdLFxuICAgICAgICB9LFxuICAgICAgICBjb3JuZXJNb2xkU2hhcGU6IHtcbiAgICAgICAgICAgIHN0ZXBDb3VudDogMCxcbiAgICAgICAgICAgIHZlcnRpY2VzOiBbXSxcbiAgICAgICAgICAgIHRlbXBMaW5lczogW10sXG4gICAgICAgIH0sXG4gICAgICAgIG5leHRDb21wb25lbnRzOiBBcnJheS5mcm9tKHsgbGVuZ3RoOiA2IH0sIF8gPT4gbmV3IFNldCgpKSxcbiAgICAgICAgcGFyYW0sXG4gICAgICAgIGNvbXBvbmVudERpcmVjdGlvblR5cGU6IENvbXBvbmVudERpcmVjdGlvblR5cGUuRnJvbnQsXG4gICAgfTtcbn1cbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgQ29tcG9uZW50VHlwZSwgQ29tcG9uZW50UGFyYW1LZXksIFN0YXJ0RW5kS2V5LCBCYXNlTGluZVNlZzNkS2V5LCBTdGFpck1vZGVsS2V5LCBDb21wb25lbnRQYXJhbVR5cGUsIE1vZGVsVmFsdWUsIENpcmNsZVRhbmdlbnRLZXksIERlZmF1bHRTdGFpclBhcmFtLCBCYXNlQ29tcG9uZW50S2V5LCBIYW5kcmFpbE1vZGVsS2V5LCBSYWlsTW9kZWxLZXksIENvbHVtbk1vZGVsS2V5LCBTdGFpclBhcmFtS2V5LCBTdGFpck1hdGVyaWFsS2V5LCBDb2x1bW5NYXRlcmlhbEtleSwgUmFpbE1hdGVyaWFsS2V5LCBQbGF0Zm9ybU1hdGVyaWFsS2V5IH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IGdlbmVyYXRlSGFuZHJhaWxTaGFwZSwgZ2VuZXJhdGVTaGFwZSwgaXNDaXJjdWxhclN0YWlyIH0gZnJvbSBcIi4vdGVtcE1lc2hVdGlsc1wiO1xuaW1wb3J0IHsgYnVpbGRDb21wb25lbnRJbnN0YW5jZSwgYnVpbGRIYW5kcmFpbEluc3RhbmNlLCBidWlsZFNlZ21lbnRSZWxhdGlvbnMsIGNoYW5nZVN0YWlyVXB3YXJkLCBnZW5lcmF0ZU1lc2hlcywgZ2V0U2VnbWVudEJ5SW5kZXggfSBmcm9tIFwiLi9tZXNoVXRpbHNcIjtcbmltcG9ydCB7IHBhcnNlQmFzZUNvbXBvbmVudCwgcGFyc2VMaW5lU2VnM2QsIHBhcnNlQ29tcG9uZW50UGFyYW0sIHBhcnNlU3RhcnRFbmQsIHBhcnNlVmVjdG9yM2QsIHN0cmluZ2lmeVN0YWlyUGFyYW0sIHN0cmluZ2lmeU1hdGVyaWFsLCBwYXJzZVN0YWlyUGFyYW0sIHBhcnNlTWF0ZXJpYWwsIHN0YXJ0T3BlcmF0aW9uLCBhYm9ydE9wZXJhdGlvbiwgY29tbWl0T3BlcmF0aW9uIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCB7IGdldE5ld0NvbXBvbmVudFBhcmFtLCBnZXROZXdTZWdtZW50LCBUZW1wTGluZUNvbG9ycywgVGVtcExpbmVQYXR0ZXJucyB9IGZyb20gXCIuL2NvbnN0c1wiO1xuaW1wb3J0IHsgZGVBY3RpdmF0ZURyYXdTdGFpcnNUb29sIH0gZnJvbSBcIi4uLy4uLy4uL21haW4vbWFpblwiO1xuaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vbWFpbi90eXBlc1wiO1xuY29uc3QgZGVzaWduID0gYXBwLmdldEFjdGl2ZURlc2lnbigpO1xuY29uc3Qgc2VsZWN0aW9uID0gYXBwLmdldFNlbGVjdGlvbigpO1xuY29uc3QgcGx1Z2luVUkgPSBhcHAuZ2V0UGx1Z2luVUkoKTtcbmNvbnN0IGFwcFZpZXcgPSBhcHAuZ2V0QWN0aXZlVmlldygpO1xuY29uc3QgdG9vbEhlbHBlciA9IGFwcC5nZXRUb29sSGVscGVyKCk7XG5jb25zdCBEZWZhdWx0Rm9jdXNlZENvbXBvbmVudEluZGV4ID0gLTE7XG5leHBvcnQgY2xhc3MgRHJhd1N0YWlyc1Rvb2wge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvLyBwcml2YXRlIGNvbXBvbmVudFBhcmFtOiBDb21wb25lbnRQYXJhbSA9IHsgLi4uRGVmYXVsdENvbXBvbmVudFBhcmFtIH07XG4gICAgICAgIHRoaXMuZHJhd2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCA9IERlZmF1bHRGb2N1c2VkQ29tcG9uZW50SW5kZXg7XG4gICAgICAgIHRoaXMuc2VnbWVudHMgPSBbXTtcbiAgICAgICAgdGhpcy5zdGFpclBhcmFtID0gRGVmYXVsdFN0YWlyUGFyYW07XG4gICAgICAgIHRoaXMub25NYXRlcmlhbFJlcGxhY2VJdGVtQ2xpY2sgPSAoY2hhbmdlUGFyYW0sIGluZGV4LCBpc0RlbGV0ZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChtYXRlcmlhbElkID0gJycsIGJnaWQgPSAnJykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluc3RhbmNlUGF0aCA9IHRoaXMuZWRpdE1vZGVsID8gZGVzaWduLmdldEVkaXRQYXRoc1RvR3JvdXBJbnN0YW5jZSh0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2UpIDogW107XG4gICAgICAgICAgICAgICAgaWYgKGNoYW5nZVBhcmFtID09PSBDb21wb25lbnRQYXJhbVR5cGUuQ29tcG9uZW50TWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHRoaXMuc2VnbWVudHMsIGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlZ21lbnQgJiYgaW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZHJhd2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQucGFyYW0ubWF0ZXJpYWwgPSB7IG1hdGVyaWFsSWQsIGJnaWQgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlBhcmFtQ2hhbmdlZEJ5RHJhdywgY29tcG9uZW50UGFyYW06IE9iamVjdC5hc3NpZ24oe30sIHNlZ21lbnQucGFyYW0pIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmVkaXRNb2RlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoZUluc3RhbmNlID0gdGhpcy5lZGl0TW9kZWwuc3RhaXJzLmdldChpbmRleCkgfHwgdGhpcy5lZGl0TW9kZWwucGxhdGZvcm1zLmdldChpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoZUluc3RhbmNlICYmIGluc3RhbmNlUGF0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3BlcmF0aW9uU3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICh5aWVsZCBkZXNpZ24uYWN0aXZhdGVFZGl0UGF0aChbLi4uaW5zdGFuY2VQYXRoWzBdLCB0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2VdKSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNEZWxldGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGRlc2lnbi5jbGVhck1hdGVyaWFsKFt0aGVJbnN0YW5jZS5pbnN0YW5jZV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZGVzaWduLmFzc2lnbk1hdGVyaWFsRm9yRW50aXRpZXMoW3RoZUluc3RhbmNlLmluc3RhbmNlXSwgbWF0ZXJpYWxJZCwgYmdpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKHlpZWxkIGRlc2lnbi5hY3RpdmF0ZUVkaXRQYXRoKGluc3RhbmNlUGF0aFswXSkpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1pdE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5wYXJhbS5tYXRlcmlhbCA9IHsgbWF0ZXJpYWxJZCwgYmdpZCB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5QYXJhbUNoYW5nZWRCeURyYXcsIGNvbXBvbmVudFBhcmFtOiBPYmplY3QuYXNzaWduKHt9LCBzZWdtZW50LnBhcmFtKSB9LCAnKicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWJvcnRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGFuZ2VQYXJhbSA9PT0gQ29tcG9uZW50UGFyYW1UeXBlLlN0YWlyTWF0ZXJpYWwgfHwgY2hhbmdlUGFyYW0gPT09IENvbXBvbmVudFBhcmFtVHlwZS5QbGF0Zm9ybU1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5lZGl0TW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VQYXJhbSA9PT0gQ29tcG9uZW50UGFyYW1UeXBlLlN0YWlyTWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWlyUGFyYW0uc3RhaXJNYXRlcmlhbCA9IHsgbWF0ZXJpYWxJZCwgYmdpZCB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFpclBhcmFtLnBsYXRmb3JtTWF0ZXJpYWwgPSB7IG1hdGVyaWFsSWQsIGJnaWQgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuU3RhaXJQYXJhbUNoYW5nZWRCeURyYXcsIHN0YWlyUGFyYW06IHRoaXMuc3RhaXJQYXJhbSB9LCAnKicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGluc3RhbmNlUGF0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcGVyYXRpb25TdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICh5aWVsZCBkZXNpZ24uYWN0aXZhdGVFZGl0UGF0aChbLi4uaW5zdGFuY2VQYXRoWzBdLCB0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2VdKSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29tcG9uZW50cyA9IGNoYW5nZVBhcmFtID09PSBDb21wb25lbnRQYXJhbVR5cGUuU3RhaXJNYXRlcmlhbCA/IHRoaXMuZWRpdE1vZGVsLnN0YWlycyA6IHRoaXMuZWRpdE1vZGVsLnBsYXRmb3JtcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0RlbGV0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGRlc2lnbi5jbGVhck1hdGVyaWFsKFsuLi5jb21wb25lbnRzLnZhbHVlcygpXS5tYXAoYyA9PiBjLmluc3RhbmNlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBkZXNpZ24uYXNzaWduTWF0ZXJpYWxGb3JFbnRpdGllcyhbLi4uY29tcG9uZW50cy52YWx1ZXMoKV0ubWFwKGMgPT4gYy5pbnN0YW5jZSksIG1hdGVyaWFsSWQsIGJnaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKHlpZWxkIGRlc2lnbi5hY3RpdmF0ZUVkaXRQYXRoKGluc3RhbmNlUGF0aFswXSkpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb25TdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWl0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZVBhcmFtID09PSBDb21wb25lbnRQYXJhbVR5cGUuU3RhaXJNYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWlyUGFyYW0uc3RhaXJNYXRlcmlhbCA9IHsgbWF0ZXJpYWxJZCwgYmdpZCB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFpclBhcmFtLnBsYXRmb3JtTWF0ZXJpYWwgPSB7IG1hdGVyaWFsSWQsIGJnaWQgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5TdGFpclBhcmFtQ2hhbmdlZEJ5RHJhdywgc3RhaXJQYXJhbTogdGhpcy5zdGFpclBhcmFtIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYm9ydE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoYW5nZVBhcmFtID09PSBDb21wb25lbnRQYXJhbVR5cGUuSGFuZHJhaWxSYWlsTWF0ZXJpYWwgfHwgY2hhbmdlUGFyYW0gPT09IENvbXBvbmVudFBhcmFtVHlwZS5IYW5kcmFpbENvbHVtbk1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5lZGl0TW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VQYXJhbSA9PT0gQ29tcG9uZW50UGFyYW1UeXBlLkhhbmRyYWlsUmFpbE1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFpclBhcmFtLmhhbmRyYWlsLnJhaWwubWF0ZXJpYWwgPSB7IG1hdGVyaWFsSWQsIGJnaWQgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhaXJQYXJhbS5oYW5kcmFpbC5jb2x1bW4ubWF0ZXJpYWwgPSB7IG1hdGVyaWFsSWQsIGJnaWQgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuU3RhaXJQYXJhbUNoYW5nZWRCeURyYXcsIHN0YWlyUGFyYW06IHRoaXMuc3RhaXJQYXJhbSB9LCAnKicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGluc3RhbmNlUGF0aCAmJiB0aGlzLmVkaXRNb2RlbC5oYW5kcmFpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcGVyYXRpb25TdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICh5aWVsZCBkZXNpZ24uYWN0aXZhdGVFZGl0UGF0aChbLi4uaW5zdGFuY2VQYXRoWzBdLCB0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2UsIHRoaXMuZWRpdE1vZGVsLmhhbmRyYWlsLmhhbmRyYWlsSW5zdGFuY2UuaW5zdGFuY2VdKSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29tcG9uZW50cyA9IGNoYW5nZVBhcmFtID09PSBDb21wb25lbnRQYXJhbVR5cGUuSGFuZHJhaWxSYWlsTWF0ZXJpYWwgPyB0aGlzLmVkaXRNb2RlbC5oYW5kcmFpbC5yYWlsSW5zdGFuY2VzIDogdGhpcy5lZGl0TW9kZWwuaGFuZHJhaWwuY29sdW1uSW5zdGFuY2VzO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRGVsZXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZGVzaWduLmNsZWFyTWF0ZXJpYWwoWy4uLmNvbXBvbmVudHMudmFsdWVzKCldLm1hcChjID0+IGMuaW5zdGFuY2UpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGRlc2lnbi5hc3NpZ25NYXRlcmlhbEZvckVudGl0aWVzKFsuLi5jb21wb25lbnRzLnZhbHVlcygpXS5tYXAoYyA9PiBjLmluc3RhbmNlKSwgbWF0ZXJpYWxJZCwgYmdpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAoeWllbGQgZGVzaWduLmFjdGl2YXRlRWRpdFBhdGgoaW5zdGFuY2VQYXRoWzBdKSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21taXRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlUGFyYW0gPT09IENvbXBvbmVudFBhcmFtVHlwZS5IYW5kcmFpbFJhaWxNYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWlyUGFyYW0uaGFuZHJhaWwucmFpbC5tYXRlcmlhbCA9IHsgbWF0ZXJpYWxJZCwgYmdpZCB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFpclBhcmFtLmhhbmRyYWlsLmNvbHVtbi5tYXRlcmlhbCA9IHsgbWF0ZXJpYWxJZCwgYmdpZCB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlN0YWlyUGFyYW1DaGFuZ2VkQnlEcmF3LCBzdGFpclBhcmFtOiB0aGlzLnN0YWlyUGFyYW0gfSwgJyonKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFib3J0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgb25Ub29sQWN0aXZlKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh3aW5kb3cub3JpZ2luKTtcbiAgICAgICAgdG9vbEhlbHBlci5zZXRFeGNsdWRlSW5mZXJlbmNlVHlwZXMoW1xuICAgICAgICAgICAgS0VudGl0eVR5cGUuRmFjZSwgS0VudGl0eVR5cGUuRWRnZSwgS0VudGl0eVR5cGUuQXV4aWxpYXJ5Qm91bmRlZEN1cnZlLCBLRW50aXR5VHlwZS5BdXhpbGlhcnlMaW5lLCBLRW50aXR5VHlwZS5BdXhpbGlhcnlWZXJ0ZXgsXG4gICAgICAgICAgICBLRW50aXR5VHlwZS5Hcm91cEluc3RhbmNlLCBLRW50aXR5VHlwZS5WZXJ0ZXgsIEtBcmNoRmFjZVR5cGUuTm9uUGxhbmFyLCBLQXJjaEZhY2VUeXBlLlBsYW5hcixcbiAgICAgICAgXSk7XG4gICAgICAgIGNvbnN0IGZpcnN0U2VnbWVudCA9IGdldE5ld1NlZ21lbnQoQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyLCB1bmRlZmluZWQsIHRoaXMuc3RhaXJQYXJhbS51cHdhcmQpO1xuICAgICAgICBmaXJzdFNlZ21lbnQuc3RhcnRMb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgLy8gdGhpcy5zdGFpclBhcmFtID0gRGVmYXVsdFN0YWlyUGFyYW07XG4gICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuRHJhd1N0YWlyTW9kZWxTZXR0bGVkLCBjb21wb25lbnRQYXJhbXM6IFtmaXJzdFNlZ21lbnQucGFyYW1dLCBzdGFpclBhcmFtOiB0aGlzLnN0YWlyUGFyYW0sIG5ld1N0YWlyOiB0cnVlIH0sICcqJyk7XG4gICAgICAgIHRoaXMuc2VnbWVudHMgPSBbZmlyc3RTZWdtZW50XTtcbiAgICAgICAgdGhpcy5kcmF3aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jbGVhclRlbXBTaGFwZXMoKTtcbiAgICAgICAgdGhpcy5lZGl0TW9kZWwgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4ID0gMDtcbiAgICB9XG4gICAgb25Ub29sRGVhY3RpdmUoKSB7XG4gICAgICAgIHRvb2xIZWxwZXIuc2V0RXhjbHVkZUluZmVyZW5jZVR5cGVzKFtdKTtcbiAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICBpZiAodGhpcy5lZGl0TW9kZWwpIHtcbiAgICAgICAgICAgIHNlbGVjdGlvbi5hZGQoW3RoaXMuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZV0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5MZWF2ZURyYXdTdGFpcnNUb29sIH0sICcqJyk7XG4gICAgICAgIH1cbiAgICAgICAgZGVBY3RpdmF0ZURyYXdTdGFpcnNUb29sKCk7XG4gICAgfVxuICAgIG9uTW91c2VNb3ZlKGV2ZW50LCBpbmZlcmVuY2VSZXN1bHQpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ29uTW91c2VNb3ZlJyk7XG4gICAgICAgIGlmIChpbmZlcmVuY2VSZXN1bHQpIHtcbiAgICAgICAgICAgIC8vIGNvbnN0IHsgc3RhcnRXaWR0aCwgZW5kV2lkdGgsIHBsYXRmb3JtVGhpY2tuZXNzIH0gPSB0aGlzLmNvbXBvbmVudFBhcmFtO1xuICAgICAgICAgICAgY29uc3QgcG9zaXRpb24gPSBpbmZlcmVuY2VSZXN1bHQucG9zaXRpb247XG4gICAgICAgICAgICBpZiAodGhpcy5zZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0U2VnbWVudCA9IHRoaXMuc2VnbWVudHNbdGhpcy5zZWdtZW50cy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnbGFzdFNlZ21lbnQuc3RhcnRMb2NrZWQnLCBsYXN0U2VnbWVudC5zdGFydExvY2tlZCk7XG4gICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQucGFyYW0ubW9kZWxFZGl0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKGxhc3RTZWdtZW50LnN0YXJ0TG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LmVuZCA9IHBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdUZW1wQ29tcG9uZW50KGxhc3RTZWdtZW50LCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWdtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcmV2U2VnbWVudCA9IHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4ID09PSBsYXN0U2VnbWVudC5wYXJhbS5pbmRleCA/IHRoaXMuc2VnbWVudHNbdGhpcy5zZWdtZW50cy5sZW5ndGggLSAyXSA6IGdldFNlZ21lbnRCeUluZGV4KHRoaXMuc2VnbWVudHMsIHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG11c3QgYmUgdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChwcmV2U2VnbWVudCA9PT0gbnVsbCB8fCBwcmV2U2VnbWVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogcHJldlNlZ21lbnQucGFyYW0udHlwZSkgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IG1vbGRTaGFwZTogeyB2ZXJ0aWNlcywgdGVtcExpbmVzIH0gfSA9IHByZXZTZWdtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoKF9hID0gbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxpbmUzZEluZGV4KSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTZWdtZW50Lm5leHRDb21wb25lbnRzLmZvckVhY2goaW5kcyA9PiBpbmRzLmRlbGV0ZShsYXN0U2VnbWVudC5wYXJhbS5pbmRleCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2xvc2VzdFBvaW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtaW5EaXN0YW5jZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVzLmZvckVhY2goKGxpbmUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVTZWczZCA9IEdlb21MaWIuY3JlYXRlTGluZVNlZ21lbnQzZCh2ZXJ0aWNlc1tsaW5lWzBdXSwgdmVydGljZXNbbGluZVsxXV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVQb2ludCA9IGxpbmVTZWczZC5nZXRDbG9zZXN0UG9pbnQocG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJEaXN0YW5jZSA9IHRoZVBvaW50LmRpc3RhbmNlVG8ocG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNsb3Nlc3RQb2ludCB8fCBjdXJEaXN0YW5jZSA8IG1pbkRpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5EaXN0YW5jZSA9IGN1ckRpc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFBvaW50ID0gdGhlUG9pbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5zdGFydCA9IGNsb3Nlc3RQb2ludDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxhc3RTZWdtZW50LmJhc2VMaW5lU2VnM2QgPSB7IHN0YXJ0OiB2ZXJ0aWNlc1tsaW5lWzBdXSwgZW5kOiB2ZXJ0aWNlc1tsaW5lWzFdXSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudCA9IHsgY29tcG9uZW50SW5kZXg6IHByZXZTZWdtZW50LnBhcmFtLmluZGV4LCBsaW5lM2RJbmRleDogaW5kZXgsIGxpbmUzZDogeyBzdGFydDogdmVydGljZXNbbGluZVswXV0sIGVuZDogdmVydGljZXNbbGluZVsxXV0gfSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgcHJldlNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleCh0aGlzLnNlZ21lbnRzLCBsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKChfYiA9IGxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5saW5lM2RJbmRleCkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2U2VnbWVudC5uZXh0Q29tcG9uZW50c1tsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50LmxpbmUzZEluZGV4XS5hZGQobGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdQaWNrU3RhcnRUZW1wU2hhcGVzKHBvc2l0aW9uLCBsYXN0U2VnbWVudC5zdGFydCwgbGFzdFNlZ21lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuc3RhcnQgPSBwb3NpdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobGFzdFNlZ21lbnQucGFyYW0udHlwZSA9PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtICYmICFsYXN0U2VnbWVudC5wYXJhbS5wbGF0Zm9ybUxlbmd0aExvY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlBhcmFtQ2hhbmdlZEJ5RHJhdywgY29tcG9uZW50UGFyYW06IE9iamVjdC5hc3NpZ24oe30sIGxhc3RTZWdtZW50LnBhcmFtKSB9LCAnKicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBvbkxCdXR0b25VcChldmVudCwgaW5mZXJlbmNlUmVzdWx0KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ29uTEJ1dHRvblVwJyk7XG4gICAgICAgIGlmIChpbmZlcmVuY2VSZXN1bHQpIHtcbiAgICAgICAgICAgIC8vIGNvbnN0IHBvc2l0aW9uID0gaW5mZXJlbmNlUmVzdWx0LnBvc2l0aW9uO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VnbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdFNlZ21lbnQgPSB0aGlzLnNlZ21lbnRzW3RoaXMuc2VnbWVudHMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgaWYgKGxhc3RTZWdtZW50LnN0YXJ0TG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwdXNoIHNlZ21lbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBzdGFydCwgZW5kLCBwYXJhbTogeyB0eXBlIH0sIGNpcmNsZVRhbmdlbnQgfSA9IGxhc3RTZWdtZW50O1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5DaXJjdWxhclN0YWlyICYmICFjaXJjbGVUYW5nZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5jaXJjbGVUYW5nZW50ID0gZW5kLnN1YnRyYWN0ZWQoc3RhcnQpLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNDb21wb25lbnQobGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuZW5kTG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RQYXJhbSA9IGxhc3RTZWdtZW50LnBhcmFtO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dFR5cGUgPSBsYXN0UGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSA/IENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpciA6IENvbXBvbmVudFR5cGUuUGxhdGZvcm07XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0U2VnbWVudCA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgZ2V0TmV3U2VnbWVudChuZXh0VHlwZSwgbGFzdFNlZ21lbnQsIHRoaXMuc3RhaXJQYXJhbS51cHdhcmQpKSwgeyBzdGFydDogbGFzdFNlZ21lbnQuZW5kLCBlbmQ6IGxhc3RTZWdtZW50LmVuZCwgc3RhcnRMb2NrZWQ6IGxhc3RQYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtID8gZmFsc2UgOiB0cnVlLCBzdGFydEhlaWdodDogbGFzdFNlZ21lbnQuZW5kSGVpZ2h0LCBlbmRIZWlnaHQ6IGxhc3RTZWdtZW50LmVuZEhlaWdodCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgbW9sZFNoYXBlOiB7IHZlcnRpY2VzLCB0ZW1wTGluZXMgfSB9ID0gbGFzdFNlZ21lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsYXN0U2VnbWVudC5iYXNlTGluZVNlZzNkID0geyBzdGFydDogdmVydGljZXNbMF0sIGVuZDogdmVydGljZXNbMV0gfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50ID0geyBsaW5lM2Q6IHsgc3RhcnQ6IHZlcnRpY2VzWzFdLCBlbmQ6IHZlcnRpY2VzWzBdIH0gfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgodGhpcy5zZWdtZW50cywgbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhc2VTZWdtZW50ICYmICgoX2EgPSBsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGluZTNkSW5kZXgpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFzZVNlZ21lbnQubmV4dENvbXBvbmVudHNbbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleF0uYWRkKGxhc3RQYXJhbS5pbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmV4dFNlZ21lbnQuYmFzZUxpbmVTZWczZCA9IHsgc3RhcnQ6IHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLCBlbmQ6IHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFNlZ21lbnQuc3RhcnRMb2NrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5uZXh0Q29tcG9uZW50c1swXS5hZGQobmV4dFNlZ21lbnQucGFyYW0uaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFNlZ21lbnQuYmFzZUNvbXBvbmVudCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRJbmRleDogbGFzdFBhcmFtLmluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUzZEluZGV4OiBsYXN0UGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSA/IHRlbXBMaW5lcy5sZW5ndGggLSAxIDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lM2Q6IHsgc3RhcnQ6IHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLCBlbmQ6IHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0UGFyYW0ubW9kZWxFZGl0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuUGFyYW1DaGFuZ2VkQnlEcmF3LCBjb21wb25lbnRQYXJhbTogbGFzdFBhcmFtIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlZ21lbnRzLnB1c2gobmV4dFNlZ21lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4ICE9PSBsYXN0UGFyYW0uaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmb2N1c2VkU2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHRoaXMuc2VnbWVudHMsIHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9jdXNlZFNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3VGVtcENvbXBvbmVudChmb2N1c2VkU2VnbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggPSBuZXh0U2VnbWVudC5wYXJhbS5pbmRleDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuQ29tcG9uZW50QWRkZWQsIGNvbXBvbmVudFBhcmFtOiBPYmplY3QuYXNzaWduKHt9LCBuZXh0U2VnbWVudC5wYXJhbSkgfSwgJyonKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuc3RhcnRMb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyUGlja1N0YXJ0VGVtcFNoYXBlcyhsYXN0U2VnbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBDb21wb25lbnQobGFzdFNlZ21lbnQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzQ29tcG9uZW50KGxhc3RTZWdtZW50LnBhcmFtLmluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZHJhd1BpY2tTdGFydFRlbXBTaGFwZXMocG9zaXRpb24sIGNsb3Nlc3RQb2ludCwgdGhlU2VnbWVudCkge1xuICAgICAgICBpZiAodGhlU2VnbWVudC5waWNrU3RhcnRUZW1wU2hhcGVJZCkge1xuICAgICAgICAgICAgYXBwVmlldy5jbGVhclRlbXBvcmFyeVNoYXBlc0J5SWRzKFt0aGVTZWdtZW50LnBpY2tTdGFydFRlbXBTaGFwZUlkXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNsb3Nlc3RQb2ludCkge1xuICAgICAgICAgICAgY29uc3QgcGlja1N0YXJ0VGVtcFNoYXBlSWQgPSBhcHBWaWV3LmRyYXdMaW5lcyhbcG9zaXRpb24sIGNsb3Nlc3RQb2ludF0sIHsgY29sb3I6IFRlbXBMaW5lQ29sb3JzLkluZmVyZW5jZSwgZGVwdGhUZXN0OiBmYWxzZSwgcGF0dGVybjogVGVtcExpbmVQYXR0ZXJucy5JbmZlcmVuY2UsIGdhcFNpemU6IDUwLCBkYXNoU2l6ZTogNTAgfSk7XG4gICAgICAgICAgICBpZiAocGlja1N0YXJ0VGVtcFNoYXBlSWQgPT09IG51bGwgfHwgcGlja1N0YXJ0VGVtcFNoYXBlSWQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBpY2tTdGFydFRlbXBTaGFwZUlkLmlkKSB7XG4gICAgICAgICAgICAgICAgdGhlU2VnbWVudC5waWNrU3RhcnRUZW1wU2hhcGVJZCA9IHBpY2tTdGFydFRlbXBTaGFwZUlkLmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNsZWFyUGlja1N0YXJ0VGVtcFNoYXBlcyh0aGVTZWdtZW50KSB7XG4gICAgICAgIGlmICh0aGVTZWdtZW50LnBpY2tTdGFydFRlbXBTaGFwZUlkKSB7XG4gICAgICAgICAgICBhcHBWaWV3LmNsZWFyVGVtcG9yYXJ5U2hhcGVzQnlJZHMoW3RoZVNlZ21lbnQucGlja1N0YXJ0VGVtcFNoYXBlSWRdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkcmF3VGVtcENvbXBvbmVudCh0aGVTZWdtZW50LCBmb2N1c2VkID0gZmFsc2UsIGRyYXdIYW5kcmFpbCA9IGZhbHNlKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGlmICh0aGVTZWdtZW50LnN0YXJ0TG9ja2VkKSB7XG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlU2VnbWVudFNoYXBlKHRoZVNlZ21lbnQsIHRoaXMuZHJhd2luZyk7XG4gICAgICAgICAgICBjb25zdCB7IHN0YWlyU2hhcGU6IHsgdmVydGljZXM6IHN0YWlyVmVydGljZXMsIHRlbXBMaW5lczogc3RhaXJUZW1wTGluZXMgfSwgbW9sZFNoYXBlOiB7IHZlcnRpY2VzOiBtb2xkVmVydGljZXMsIHRlbXBMaW5lczogbW9sZFRlbXBMaW5lcyB9LCBjb3JuZXJTaGFwZTogeyB2ZXJ0aWNlczogY29ybmVyVmVydGljZXMsIHRlbXBMaW5lczogY29ybmVyVGVtcExpbmVzIH0sIGNvcm5lck1vbGRTaGFwZTogeyB2ZXJ0aWNlczogY29ybmVyTW9sZFZlcnRpY2VzLCB0ZW1wTGluZXM6IGNvcm5lck1vbGRUZW1wTGluZXMgfSwgfSA9IHRoZVNlZ21lbnQ7XG4gICAgICAgICAgICBjb25zdCB0ZW1wTGluZVBvaW50cyA9IFtdO1xuICAgICAgICAgICAgY29uc3QgbW9sZFRlbXBMaW5lUG9pbnRzID0gW107XG4gICAgICAgICAgICBpZiAodGhpcy5kcmF3aW5nKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBzdGFpclRlbXBMaW5lIG9mIHN0YWlyVGVtcExpbmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lUG9pbnRzLnB1c2goW3N0YWlyVmVydGljZXNbc3RhaXJUZW1wTGluZVswXV0sIHN0YWlyVmVydGljZXNbc3RhaXJUZW1wTGluZVsxXV1dKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBjb3JuZXJUZW1wTGluZSBvZiBjb3JuZXJUZW1wTGluZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVQb2ludHMucHVzaChbY29ybmVyVmVydGljZXNbY29ybmVyVGVtcExpbmVbMF1dLCBjb3JuZXJWZXJ0aWNlc1tjb3JuZXJUZW1wTGluZVsxXV1dKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG1vbGRUZW1wTGluZSBvZiBtb2xkVGVtcExpbmVzKSB7XG4gICAgICAgICAgICAgICAgbW9sZFRlbXBMaW5lUG9pbnRzLnB1c2goW21vbGRWZXJ0aWNlc1ttb2xkVGVtcExpbmVbMF1dLCBtb2xkVmVydGljZXNbbW9sZFRlbXBMaW5lWzFdXV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCBjb3JuZXJNb2xkVGVtcExpbmUgb2YgY29ybmVyTW9sZFRlbXBMaW5lcykge1xuICAgICAgICAgICAgICAgIG1vbGRUZW1wTGluZVBvaW50cy5wdXNoKFtjb3JuZXJNb2xkVmVydGljZXNbY29ybmVyTW9sZFRlbXBMaW5lWzBdXSwgY29ybmVyTW9sZFZlcnRpY2VzW2Nvcm5lck1vbGRUZW1wTGluZVsxXV1dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgoX2EgPSB0aGVTZWdtZW50LnRlbXBTaGFwZUlkKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgYXBwVmlldy5jbGVhclRlbXBvcmFyeVNoYXBlc0J5SWRzKHRoZVNlZ21lbnQudGVtcFNoYXBlSWQpO1xuICAgICAgICAgICAgICAgIHRoZVNlZ21lbnQudGVtcFNoYXBlSWQgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0ZW1wTGluZVBvaW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFpckNvbG9yID0gZm9jdXNlZCA/IFRlbXBMaW5lQ29sb3JzLkZvY3VzIDogVGVtcExpbmVDb2xvcnMuU3RhaXI7XG4gICAgICAgICAgICAgICAgY29uc3QgdGVtcFNoYXBlSWQgPSBhcHBWaWV3LmRyYXdQb2x5bGluZXModGVtcExpbmVQb2ludHMsIHsgY29sb3I6IHN0YWlyQ29sb3IsIGRlcHRoVGVzdDogZmFsc2UsIHBhdHRlcm46IFRlbXBMaW5lUGF0dGVybnMuU3RhaXJBbmRNb2xkIH0pO1xuICAgICAgICAgICAgICAgIGlmICh0ZW1wU2hhcGVJZCA9PT0gbnVsbCB8fCB0ZW1wU2hhcGVJZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogdGVtcFNoYXBlSWQuaWRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoZVNlZ21lbnQudGVtcFNoYXBlSWQgPSBbLi4udGVtcFNoYXBlSWQuaWRzXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobW9sZFRlbXBMaW5lUG9pbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vbGRDb2xvciA9IGZvY3VzZWQgPyBUZW1wTGluZUNvbG9ycy5Gb2N1cyA6IFRlbXBMaW5lQ29sb3JzLk1vbGQ7XG4gICAgICAgICAgICAgICAgY29uc3QgbW9sZFRlbXBTaGFwZUlkID0gYXBwVmlldy5kcmF3UG9seWxpbmVzKG1vbGRUZW1wTGluZVBvaW50cywgeyBjb2xvcjogbW9sZENvbG9yLCBkZXB0aFRlc3Q6IHRoaXMuZHJhd2luZywgcGF0dGVybjogVGVtcExpbmVQYXR0ZXJucy5TdGFpckFuZE1vbGQgfSk7XG4gICAgICAgICAgICAgICAgaWYgKG1vbGRUZW1wU2hhcGVJZCA9PT0gbnVsbCB8fCBtb2xkVGVtcFNoYXBlSWQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1vbGRUZW1wU2hhcGVJZC5pZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChfYiA9IHRoZVNlZ21lbnQudGVtcFNoYXBlSWQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoZVNlZ21lbnQudGVtcFNoYXBlSWQucHVzaCguLi5tb2xkVGVtcFNoYXBlSWQuaWRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoZVNlZ21lbnQudGVtcFNoYXBlSWQgPSBbLi4ubW9sZFRlbXBTaGFwZUlkLmlkc107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZHJhd0hhbmRyYWlsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3SGFuZHJhaWxzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZHJhd0hhbmRyYWlscygpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgY29uc3QgcHJldkhhbmRyYWlsVGVtcFNoYXBlSWRzID0gKF9hID0gdGhpcy5oYW5kcmFpbENvbGxlY3Rpb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50ZW1wU2hhcGVJZDtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZUhhbmRyYWlsU2hhcGUoKTtcbiAgICAgICAgaWYgKHByZXZIYW5kcmFpbFRlbXBTaGFwZUlkcyA9PT0gbnVsbCB8fCBwcmV2SGFuZHJhaWxUZW1wU2hhcGVJZHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHByZXZIYW5kcmFpbFRlbXBTaGFwZUlkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGFwcFZpZXcuY2xlYXJUZW1wb3JhcnlTaGFwZXNCeUlkcyhwcmV2SGFuZHJhaWxUZW1wU2hhcGVJZHMpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGhhbmRyYWlscyA9IChfYiA9IHRoaXMuaGFuZHJhaWxDb2xsZWN0aW9uKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuaGFuZHJhaWxzO1xuICAgICAgICBjb25zdCB0ZW1wTGluZVBvaW50cyA9IFtdO1xuICAgICAgICBpZiAodGhpcy5oYW5kcmFpbENvbGxlY3Rpb24gJiYgKGhhbmRyYWlscyA9PT0gbnVsbCB8fCBoYW5kcmFpbHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGhhbmRyYWlscy5sZW5ndGgpKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHsgcmFpbCwgY29sdW1ucyB9IG9mIGhhbmRyYWlscykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmFpbC5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmFpbFBvaW50ID0gcmFpbFtpXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmFpbE5leHRQb2ludCA9IHJhaWxbaSArIDFdO1xuICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZVBvaW50cy5wdXNoKFtyYWlsUG9pbnQsIHJhaWxOZXh0UG9pbnRdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGVtcExpbmVQb2ludHMucHVzaCguLi5jb2x1bW5zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGhhbmRyYWlsVGVtcFNoYXBlSWRzID0gYXBwVmlldy5kcmF3UG9seWxpbmVzKHRlbXBMaW5lUG9pbnRzLCB7IGNvbG9yOiBUZW1wTGluZUNvbG9ycy5IYW5kcmFpbCwgZGVwdGhUZXN0OiBmYWxzZSwgcGF0dGVybjogVGVtcExpbmVQYXR0ZXJucy5IYW5kcmFpbCB9KTtcbiAgICAgICAgICAgIGlmIChoYW5kcmFpbFRlbXBTaGFwZUlkcyA9PT0gbnVsbCB8fCBoYW5kcmFpbFRlbXBTaGFwZUlkcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogaGFuZHJhaWxUZW1wU2hhcGVJZHMuaWRzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kcmFpbENvbGxlY3Rpb24udGVtcFNoYXBlSWQgPSBoYW5kcmFpbFRlbXBTaGFwZUlkcy5pZHM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2xlYXJUZW1wU2hhcGVzKHRoZVNlZ21lbnQpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAodGhlU2VnbWVudCkge1xuICAgICAgICAgICAgaWYgKChfYSA9IHRoZVNlZ21lbnQudGVtcFNoYXBlSWQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBhcHBWaWV3LmNsZWFyVGVtcG9yYXJ5U2hhcGVzQnlJZHModGhlU2VnbWVudC50ZW1wU2hhcGVJZCk7XG4gICAgICAgICAgICAgICAgdGhlU2VnbWVudC50ZW1wU2hhcGVJZCA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYXBwVmlldy5jbGVhclRlbXBvcmFyeVNoYXBlcygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZvY3VzQ29tcG9uZW50KGNvbXBvbmVudEluZGV4KSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICBpZiAoY29tcG9uZW50SW5kZXggPT09IHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2VnbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBsYXN0U2VnbWVudCA9IHRoaXMuc2VnbWVudHNbdGhpcy5zZWdtZW50cy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RTZWdtZW50SW5kZXggPSBsYXN0U2VnbWVudC5wYXJhbS5pbmRleDtcbiAgICAgICAgICAgIC8vIGlmIChjb21wb25lbnRJbmRleCAhPT0gdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXgpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0ZvY3VzZWRTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgodGhpcy5zZWdtZW50cywgY29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgY29uc3Qgb2xkRm9jdXNlZFNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleCh0aGlzLnNlZ21lbnRzLCB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICBpZiAobmV3Rm9jdXNlZFNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kcmF3aW5nICYmICFsYXN0U2VnbWVudC5lbmRMb2NrZWQgJiYgY29tcG9uZW50SW5kZXggIT09IGxhc3RTZWdtZW50SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBwYXJhbTogeyB0eXBlOiBuZXdGb2N1c2VkVHlwZSB9LCBtb2xkU2hhcGU6IHsgdmVydGljZXM6IG5ld0ZvY3VzZWRWZXJ0aWNlcywgdGVtcExpbmVzOiBuZXdGb2N1c2VkVGVtcExpbmVzIH0gfSA9IG5ld0ZvY3VzZWRTZWdtZW50O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHN0YXJ0IH0gPSBsYXN0U2VnbWVudDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhclBpY2tTdGFydFRlbXBTaGFwZXMobGFzdFNlZ21lbnQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV3Rm9jdXNlZFR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJUZW1wU2hhcGVzKGxhc3RTZWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0U2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FjaGVkSW5kZXggPSBsYXN0U2VnbWVudC5wYXJhbS5pbmRleDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5wYXJhbSA9IGdldE5ld0NvbXBvbmVudFBhcmFtKENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpciwgbmV3Rm9jdXNlZFNlZ21lbnQsIHRoaXMuc3RhaXJQYXJhbS51cHdhcmQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LnBhcmFtLmluZGV4ID0gY2FjaGVkSW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5QYXJhbUNoYW5nZWRCeURyYXcsIGNvbXBvbmVudFBhcmFtOiBPYmplY3QuYXNzaWduKHt9LCBsYXN0U2VnbWVudC5wYXJhbSkgfSwgJyonKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbGRGb2N1c2VkU2VnbWVudCAmJiBvbGRGb2N1c2VkU2VnbWVudCAhPT0gbmV3Rm9jdXNlZFNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRGb2N1c2VkU2VnbWVudC5uZXh0Q29tcG9uZW50cy5mb3JFYWNoKGluZHMgPT4gaW5kcy5kZWxldGUobGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoKF9hID0gbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxpbmUzZEluZGV4KSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmV3Rm9jdXNlZFNlZ21lbnQubmV4dENvbXBvbmVudHMuZm9yRWFjaChpbmRzID0+IGluZHMuZGVsZXRlKGxhc3RTZWdtZW50LnBhcmFtLmluZGV4KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFzZVNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleCh0aGlzLnNlZ21lbnRzLCBsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmFzZVNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFzZVNlZ21lbnQubmV4dENvbXBvbmVudHMuZm9yRWFjaChpbmRzID0+IGluZHMuZGVsZXRlKGxhc3RTZWdtZW50LnBhcmFtLmluZGV4KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNsb3Nlc3RQb2ludDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtaW5EaXN0YW5jZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdGb2N1c2VkVGVtcExpbmVzLmZvckVhY2goKGxpbmUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGluZVNlZzNkID0gR2VvbUxpYi5jcmVhdGVMaW5lU2VnbWVudDNkKG5ld0ZvY3VzZWRWZXJ0aWNlc1tsaW5lWzBdXSwgbmV3Rm9jdXNlZFZlcnRpY2VzW2xpbmVbMV1dKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVQb2ludCA9IGxpbmVTZWczZC5nZXRDbG9zZXN0UG9pbnQoc3RhcnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1ckRpc3RhbmNlID0gdGhlUG9pbnQuZGlzdGFuY2VUbyhzdGFydCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjbG9zZXN0UG9pbnQgfHwgY3VyRGlzdGFuY2UgPCBtaW5EaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5EaXN0YW5jZSA9IGN1ckRpc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0UG9pbnQgPSB0aGVQb2ludDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuc3RhcnQgPSBjbG9zZXN0UG9pbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxhc3RTZWdtZW50LmJhc2VMaW5lU2VnM2QgPSB7IHN0YXJ0OiBuZXdGb2N1c2VkVmVydGljZXNbbGluZVswXV0sIGVuZDogbmV3Rm9jdXNlZFZlcnRpY2VzW2xpbmVbMV1dIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQgPSB7IGNvbXBvbmVudEluZGV4OiBuZXdGb2N1c2VkU2VnbWVudC5wYXJhbS5pbmRleCwgbGluZTNkSW5kZXg6IGluZGV4LCBsaW5lM2Q6IHsgc3RhcnQ6IG5ld0ZvY3VzZWRWZXJ0aWNlc1tsaW5lWzBdXSwgZW5kOiBuZXdGb2N1c2VkVmVydGljZXNbbGluZVsxXV0gfSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCgoX2IgPSBsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IubGluZTNkSW5kZXgpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdGb2N1c2VkU2VnbWVudC5uZXh0Q29tcG9uZW50c1tsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50LmxpbmUzZEluZGV4XS5hZGQobGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuc3RhcnRMb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LmNpcmNsZVRhbmdlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5zdGFydEhlaWdodCA9IG5ld0ZvY3VzZWRTZWdtZW50LmVuZEhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1BpY2tTdGFydFRlbXBTaGFwZXMoc3RhcnQsIGxhc3RTZWdtZW50LnN0YXJ0LCBsYXN0U2VnbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5ld0ZvY3VzZWRTZWdtZW50Lm5leHRDb21wb25lbnRzWzBdLnNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmNsZWFyVGVtcFNoYXBlcyhsYXN0U2VnbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9sZEZvY3VzZWRTZWdtZW50ICYmIG9sZEZvY3VzZWRTZWdtZW50ICE9PSBuZXdGb2N1c2VkU2VnbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRGb2N1c2VkU2VnbWVudC5uZXh0Q29tcG9uZW50cy5mb3JFYWNoKGluZHMgPT4gaW5kcy5kZWxldGUobGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCgoX2MgPSBsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50KSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MubGluZTNkSW5kZXgpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmV3Rm9jdXNlZFNlZ21lbnQubmV4dENvbXBvbmVudHMuZm9yRWFjaChpbmRzID0+IGluZHMuZGVsZXRlKGxhc3RTZWdtZW50LnBhcmFtLmluZGV4KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgodGhpcy5zZWdtZW50cywgbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiYXNlU2VnbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFzZVNlZ21lbnQubmV4dENvbXBvbmVudHMuZm9yRWFjaChpbmRzID0+IGluZHMuZGVsZXRlKGxhc3RTZWdtZW50LnBhcmFtLmluZGV4KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuc3RhcnQgPSBuZXdGb2N1c2VkU2VnbWVudC5lbmQuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5zdGFydExvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuc3RhcnRIZWlnaHQgPSBuZXdGb2N1c2VkU2VnbWVudC5lbmRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGFzdFNlZ21lbnQuYmFzZUxpbmVTZWczZCA9IHsgc3RhcnQ6IG5ld0ZvY3VzZWRWZXJ0aWNlc1tuZXdGb2N1c2VkVmVydGljZXMubGVuZ3RoIC0gMV0sIGVuZDogbmV3Rm9jdXNlZFZlcnRpY2VzW25ld0ZvY3VzZWRWZXJ0aWNlcy5sZW5ndGggLSAyXSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQgPSB7IGNvbXBvbmVudEluZGV4OiBuZXdGb2N1c2VkU2VnbWVudC5wYXJhbS5pbmRleCwgbGluZTNkSW5kZXg6IDAsIGxpbmUzZDogeyBzdGFydDogbmV3Rm9jdXNlZFZlcnRpY2VzW25ld0ZvY3VzZWRWZXJ0aWNlcy5sZW5ndGggLSAxXSwgZW5kOiBuZXdGb2N1c2VkVmVydGljZXNbbmV3Rm9jdXNlZFZlcnRpY2VzLmxlbmd0aCAtIDJdIH0gfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdGb2N1c2VkU2VnbWVudC5uZXh0Q29tcG9uZW50c1swXS5hZGQobGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LmNpcmNsZVRhbmdlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3VGVtcENvbXBvbmVudChsYXN0U2VnbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBsYXN0U2VnbWVudC5zdGFydExvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGxhc3RTZWdtZW50LmNpcmNsZVRhbmdlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCh0aGlzLmRyYXdpbmcgJiYgY29tcG9uZW50SW5kZXggIT09IGxhc3RTZWdtZW50SW5kZXgpIHx8ICF0aGlzLmRyYXdpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3VGVtcENvbXBvbmVudChuZXdGb2N1c2VkU2VnbWVudCwgdGhpcy5kcmF3aW5nLCB0aGlzLmRyYXdpbmcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgoKHRoaXMuZHJhd2luZyAmJiB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCAhPT0gbGFzdFNlZ21lbnRJbmRleCkgfHwgKCF0aGlzLmRyYXdpbmcgJiYgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggIT09IGNvbXBvbmVudEluZGV4KSkgJiYgb2xkRm9jdXNlZFNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kcmF3aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBDb21wb25lbnQob2xkRm9jdXNlZFNlZ21lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhclRlbXBTaGFwZXMob2xkRm9jdXNlZFNlZ21lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4ID0gY29tcG9uZW50SW5kZXg7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVtb3ZlQ29tcG9uZW50KGNvbXBvbmVudEluZGV4KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKHRoaXMuc2VnbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCB0aGVJbmRleCA9IHRoaXMuc2VnbWVudHMuZmluZEluZGV4KHNlZyA9PiBzZWcucGFyYW0uaW5kZXggPT09IGNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgIGlmICh0aGVJbmRleCA+IC0xKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGhlU2VnbWVudCA9IHRoaXMuc2VnbWVudHNbdGhlSW5kZXhdO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYXdpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChfYSA9IHRoZVNlZ21lbnQudGVtcFNoYXBlSWQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcFZpZXcuY2xlYXJUZW1wb3JhcnlTaGFwZXNCeUlkcyh0aGVTZWdtZW50LnRlbXBTaGFwZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdIYW5kcmFpbHMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5lZGl0TW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlSW5zdGFuY2UgPSB0aGlzLmVkaXRNb2RlbC5zdGFpcnMuZ2V0KGNvbXBvbmVudEluZGV4KSB8fCB0aGlzLmVkaXRNb2RlbC5wbGF0Zm9ybXMuZ2V0KGNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoZUluc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlbC5zdGFpcnMuZGVsZXRlKGNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsLnBsYXRmb3Jtcy5kZWxldGUoY29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVzaWduLnJlbW92ZUdyb3VwSW5zdGFuY2UodGhlSW5zdGFuY2UuaW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc2VnbWVudHMuc3BsaWNlKHRoZUluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAvLyB0byBjbGVhciByZWxhdGlvbnNcbiAgICAgICAgICAgICAgICBjb25zdCBiYXNlQ29tcG9uZW50ID0gdGhlU2VnbWVudC5iYXNlQ29tcG9uZW50O1xuICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgodGhpcy5zZWdtZW50cywgYmFzZUNvbXBvbmVudCA9PT0gbnVsbCB8fCBiYXNlQ29tcG9uZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBiYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICBpZiAoYmFzZVNlZ21lbnQgJiYgKGJhc2VDb21wb25lbnQgPT09IG51bGwgfHwgYmFzZUNvbXBvbmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleCkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCB0aGVJbmQgPSBiYXNlU2VnbWVudC5uZXh0Q29tcG9uZW50c1tiYXNlQ29tcG9uZW50LmxpbmUzZEluZGV4XS5maW5kSW5kZXgoaSA9PiBpID09PSB0aGVTZWdtZW50LnBhcmFtLmluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKHRoZUluZCA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGJhc2VTZWdtZW50Lm5leHRDb21wb25lbnRzW2Jhc2VDb21wb25lbnQubGluZTNkSW5kZXhdLmRlbGV0ZSh0aGVTZWdtZW50LnBhcmFtLmluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBuZXh0Q29tcG9uZW50cyA9IHRoZVNlZ21lbnQubmV4dENvbXBvbmVudHM7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBuZXh0U2VnbWVudEluZHMgb2YgbmV4dENvbXBvbmVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRTZWdtZW50SW5kcy5zaXplKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG5leHRTZWdJbmQgb2YgbmV4dFNlZ21lbnRJbmRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dFNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleCh0aGlzLnNlZ21lbnRzLCBuZXh0U2VnSW5kKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFNlZ21lbnQgJiYgbmV4dFNlZ21lbnQuYmFzZUNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U2VnbWVudC5iYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U2VnbWVudC5iYXNlQ29tcG9uZW50LmxpbmUzZEluZGV4ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4ID09PSBjb21wb25lbnRJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggPSB0aGlzLnNlZ21lbnRzW3RoaXMuc2VnbWVudHMubGVuZ3RoIC0gMV0ucGFyYW0uaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIG9uTWF0ZXJpYWxSZXBsYWNlQ2xpY2soY2hhbmdlUGFyYW0sIGluZGV4KSB7XG4gICAgICAgIGFwcC5nZXRBcHBsaWNhdGlvblVJKCkudG9nZ2xlTWF0ZXJpYWxSZXBsYWNlUGFuZWwodHJ1ZSwgdGhpcy5vbk1hdGVyaWFsUmVwbGFjZUl0ZW1DbGljayhjaGFuZ2VQYXJhbSwgaW5kZXgpKTtcbiAgICB9XG4gICAgY2hhbmdlU3RhaXJQYXJhbShzdGFpclBhcmFtLCBjaGFuZ2VQYXJhbXMpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2YsIF9nLCBfaCwgX2osIF9rO1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdGhpcy5zdGFpclBhcmFtID0gc3RhaXJQYXJhbTtcbiAgICAgICAgICAgIGlmICghdGhpcy5zZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBpbnN0YW5jZVBhdGggPSB0aGlzLmVkaXRNb2RlbCA/IGRlc2lnbi5nZXRFZGl0UGF0aHNUb0dyb3VwSW5zdGFuY2UodGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlKSA6IFtdO1xuICAgICAgICAgICAgY29uc3QgbGFzdFNlZ21lbnQgPSB0aGlzLnNlZ21lbnRzW3RoaXMuc2VnbWVudHMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBsZXQgc3RhaXJQcmFhbVN0cmluZyA9ICcnO1xuICAgICAgICAgICAgaWYgKGNoYW5nZVBhcmFtcy5pbmRleE9mKENvbXBvbmVudFBhcmFtVHlwZS5Ib3Jpem9udGFsU3RlcCkgPiAtMSB8fCBjaGFuZ2VQYXJhbXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuVmVydGljYWxTdGVwKSA+IC0xIHx8XG4gICAgICAgICAgICAgICAgY2hhbmdlUGFyYW1zLmluZGV4T2YoQ29tcG9uZW50UGFyYW1UeXBlLlN0YXJ0V2lkdGgpID4gLTEgfHwgY2hhbmdlUGFyYW1zLmluZGV4T2YoQ29tcG9uZW50UGFyYW1UeXBlLkVuZFdpZHRoKSA+IC0xIHx8XG4gICAgICAgICAgICAgICAgY2hhbmdlUGFyYW1zLmluZGV4T2YoQ29tcG9uZW50UGFyYW1UeXBlLlVwd2FyZCkgPiAtMSB8fFxuICAgICAgICAgICAgICAgIGNoYW5nZVBhcmFtcy5pbmRleE9mKENvbXBvbmVudFBhcmFtVHlwZS5QbGF0Zm9ybVRoaWNrbmVzcykgPiAtMSkge1xuICAgICAgICAgICAgICAgIGxldCByZUdlbmVyYXRlU2VnbWVudHMgPSB0aGlzLnNlZ21lbnRzO1xuICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VQYXJhbXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuVXB3YXJkKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZVN0YWlyVXB3YXJkKHJlR2VuZXJhdGVTZWdtZW50c1swXSwgcmVHZW5lcmF0ZVNlZ21lbnRzLCBzdGFpclBhcmFtLnVwd2FyZCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZUdlbmVyYXRlU2VnbWVudHMgPSB0aGlzLnNlZ21lbnRzLmZpbHRlcihzZWcgPT4gY2hhbmdlUGFyYW1zLmluZGV4T2YoQ29tcG9uZW50UGFyYW1UeXBlLlBsYXRmb3JtVGhpY2tuZXNzKSA+IC0xID8gc2VnLnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gOiBzZWcucGFyYW0udHlwZSAhPT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChyZUdlbmVyYXRlU2VnbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcmVHZW5lcmF0ZVNlZ21lbnQgb2YgcmVHZW5lcmF0ZVNlZ21lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGNoYW5nZVBhcmFtIG9mIGNoYW5nZVBhcmFtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlR2VuZXJhdGVTZWdtZW50LnBhcmFtW2NoYW5nZVBhcmFtXSA9IHN0YWlyUGFyYW1bY2hhbmdlUGFyYW1dO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxldCBvcGVyYXRpb25TdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmRyYXdpbmcgJiYgdGhpcy5lZGl0TW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlUGFyYW1zWzBdID09PSBDb21wb25lbnRQYXJhbVR5cGUuU3RhaXJNYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZVBhdGgubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICh5aWVsZCBkZXNpZ24uYWN0aXZhdGVFZGl0UGF0aChbLi4uaW5zdGFuY2VQYXRoWzBdLCB0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2VdKSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGFpclBhcmFtLnN0YWlyTWF0ZXJpYWwgJiYgdGhpcy5zdGFpclBhcmFtLnN0YWlyTWF0ZXJpYWwubWF0ZXJpYWxJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFpck1hdGVyaWFsU3RyaW5nID0gc3RyaW5naWZ5TWF0ZXJpYWwodGhpcy5zdGFpclBhcmFtLnN0YWlyTWF0ZXJpYWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAhISgoX2EgPSB0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zZXRDdXN0b21Qcm9wZXJ0eShTdGFpck1hdGVyaWFsS2V5LCBzdGFpck1hdGVyaWFsU3RyaW5nKS5pc1N1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBkZXNpZ24uYXNzaWduTWF0ZXJpYWxGb3JFbnRpdGllcyhbLi4udGhpcy5lZGl0TW9kZWwuc3RhaXJzLnZhbHVlcygpXS5tYXAoaW5zdGFuY2VEYXRhID0+IGluc3RhbmNlRGF0YS5pbnN0YW5jZSksIHRoaXMuc3RhaXJQYXJhbS5zdGFpck1hdGVyaWFsLm1hdGVyaWFsSWQsIHRoaXMuc3RhaXJQYXJhbS5zdGFpck1hdGVyaWFsLmJnaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoYW5nZVBhcmFtc1swXSA9PT0gQ29tcG9uZW50UGFyYW1UeXBlLlBsYXRmb3JtTWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2VQYXRoLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAoeWllbGQgZGVzaWduLmFjdGl2YXRlRWRpdFBhdGgoWy4uLmluc3RhbmNlUGF0aFswXSwgdGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlXSkpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhaXJQYXJhbS5wbGF0Zm9ybU1hdGVyaWFsICYmIHRoaXMuc3RhaXJQYXJhbS5wbGF0Zm9ybU1hdGVyaWFsLm1hdGVyaWFsSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGxhdGZvcm1NYXRlcmlhbFN0cmluZyA9IHN0cmluZ2lmeU1hdGVyaWFsKHRoaXMuc3RhaXJQYXJhbS5wbGF0Zm9ybU1hdGVyaWFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgISEoKF9iID0gdGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Iuc2V0Q3VzdG9tUHJvcGVydHkoUGxhdGZvcm1NYXRlcmlhbEtleSwgcGxhdGZvcm1NYXRlcmlhbFN0cmluZykuaXNTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZGVzaWduLmFzc2lnbk1hdGVyaWFsRm9yRW50aXRpZXMoWy4uLnRoaXMuZWRpdE1vZGVsLnBsYXRmb3Jtcy52YWx1ZXMoKV0ubWFwKGluc3RhbmNlRGF0YSA9PiBpbnN0YW5jZURhdGEuaW5zdGFuY2UpLCB0aGlzLnN0YWlyUGFyYW0ucGxhdGZvcm1NYXRlcmlhbC5tYXRlcmlhbElkLCB0aGlzLnN0YWlyUGFyYW0ucGxhdGZvcm1NYXRlcmlhbC5iZ2lkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpclByYWFtU3RyaW5nID0gc3RyaW5naWZ5U3RhaXJQYXJhbSh0aGlzLnN0YWlyUGFyYW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICEhKChfYyA9IHRoaXMuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnNldEN1c3RvbVByb3BlcnR5KFN0YWlyUGFyYW1LZXksIHN0YWlyUHJhYW1TdHJpbmcpLmlzU3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlUGF0aC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKHlpZWxkIGRlc2lnbi5hY3RpdmF0ZUVkaXRQYXRoKFsuLi5pbnN0YW5jZVBhdGhbMF0sIHRoaXMuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZV0pKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcmVHZW5lcmF0ZVNlZ21lbnQgb2YgcmVHZW5lcmF0ZVNlZ21lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kcmF3aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3VGVtcENvbXBvbmVudChyZUdlbmVyYXRlU2VnbWVudCwgcmVHZW5lcmF0ZVNlZ21lbnQucGFyYW0uaW5kZXggPT09IHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4ICYmIHJlR2VuZXJhdGVTZWdtZW50LnBhcmFtLmluZGV4ICE9PSBsYXN0U2VnbWVudC5wYXJhbS5pbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmVkaXRNb2RlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgcGFyYW06IHsgaW5kZXgsIHR5cGUgfSB9ID0gcmVHZW5lcmF0ZVNlZ21lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlSW5zdGFuY2UgPSB0aGlzLmVkaXRNb2RlbC5zdGFpcnMuZ2V0KGluZGV4KSB8fCB0aGlzLmVkaXRNb2RlbC5wbGF0Zm9ybXMuZ2V0KGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhlSW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZVNlZ21lbnRTaGFwZShyZUdlbmVyYXRlU2VnbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoZU1lc2hlcyA9IGdlbmVyYXRlTWVzaGVzKFtyZUdlbmVyYXRlU2VnbWVudF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhlTWVzaGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBkZXNpZ24ucmVtb3ZlR3JvdXBJbnN0YW5jZSh0aGVJbnN0YW5jZS5pbnN0YW5jZSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb25TdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0luc3RhbmNlID0gYnVpbGRDb21wb25lbnRJbnN0YW5jZShyZUdlbmVyYXRlU2VnbWVudCwgdGhpcy5zZWdtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICEhbmV3SW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdJbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlbC5wbGF0Zm9ybXMuc2V0KGluZGV4LCB7IGluc3RhbmNlOiBuZXdJbnN0YW5jZSwgZGVmaW5pdGlvbktleTogKChfZCA9IG5ld0luc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QuZ2V0S2V5KCkpIHx8ICcnLCBpbnN0YW5jZUtleTogbmV3SW5zdGFuY2UuZ2V0S2V5KCkgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlbC5zdGFpcnMuc2V0KGluZGV4LCB7IGluc3RhbmNlOiBuZXdJbnN0YW5jZSwgZGVmaW5pdGlvbktleTogKChfZSA9IG5ld0luc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpKSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2UuZ2V0S2V5KCkpIHx8ICcnLCBpbnN0YW5jZUtleTogbmV3SW5zdGFuY2UuZ2V0S2V5KCkgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZHJhd2luZyAmJiB0aGlzLmVkaXRNb2RlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChfZiA9IHRoaXMuaGFuZHJhaWxDb2xsZWN0aW9uKSA9PT0gbnVsbCB8fCBfZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2YuaGFuZHJhaWxzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRyYWlsSW5zdGFuY2VzRGF0YSA9IHlpZWxkIGJ1aWxkSGFuZHJhaWxJbnN0YW5jZSh0aGlzLnN0YWlyUGFyYW0sIChfZyA9IHRoaXMuaGFuZHJhaWxDb2xsZWN0aW9uKSA9PT0gbnVsbCB8fCBfZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2cuaGFuZHJhaWxzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBoYW5kcmFpbEluc3RhbmNlc0RhdGEgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGFuZHJhaWxJbnN0YW5jZXNEYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsLmhhbmRyYWlsID0gaGFuZHJhaWxJbnN0YW5jZXNEYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZVBhdGgubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKHlpZWxkIGRlc2lnbi5hY3RpdmF0ZUVkaXRQYXRoKGluc3RhbmNlUGF0aFswXSkpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb25TdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWl0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYm9ydE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uLmFkZChbdGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5kcmF3aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdIYW5kcmFpbHMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoYW5nZVBhcmFtcy5sZW5ndGggPT09IDEgJiYgY2hhbmdlUGFyYW1zWzBdLnN0YXJ0c1dpdGgoQ29tcG9uZW50UGFyYW1UeXBlLkhhbmRyYWlsKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYXdpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3SGFuZHJhaWxzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZWRpdE1vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoX2ggPSB0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbikgPT09IG51bGwgfHwgX2ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9oLmhhbmRyYWlscy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcGVyYXRpb25TdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBoYW5kcmFpbFBhcmFtcyA9IHRoaXMuc3RhaXJQYXJhbS5oYW5kcmFpbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIChjaGFuZ2VQYXJhbXNbMF0gPT09IENvbXBvbmVudFBhcmFtVHlwZS5IYW5kcmFpbFJhaWxNYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGlmICh0aGlzLmVkaXRNb2RlbC5oYW5kcmFpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBpZiAoaW5zdGFuY2VQYXRoLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKGF3YWl0IGRlc2lnbi5hY3RpdmF0ZUVkaXRQYXRoKFsuLi5pbnN0YW5jZVBhdGhbMF0sIHRoaXMuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZSwgdGhpcy5lZGl0TW9kZWwuaGFuZHJhaWwuaGFuZHJhaWxJbnN0YW5jZS5pbnN0YW5jZV0pKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgaWYgKHRoaXMuZWRpdE1vZGVsLmhhbmRyYWlsPy5yYWlsSW5zdGFuY2VzLmxlbmd0aCAmJiBoYW5kcmFpbFBhcmFtcy5yYWlsLm1hdGVyaWFsICYmIGhhbmRyYWlsUGFyYW1zLnJhaWwubWF0ZXJpYWwubWF0ZXJpYWxJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgY29uc3QgcmFpbE1hdGVyaWFsU3RyaW5nID0gc3RyaW5naWZ5TWF0ZXJpYWwoaGFuZHJhaWxQYXJhbXMucmFpbC5tYXRlcmlhbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICEhdGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpPy5zZXRDdXN0b21Qcm9wZXJ0eShSYWlsTWF0ZXJpYWxLZXksIHJhaWxNYXRlcmlhbFN0cmluZykuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZGVzaWduLmFzc2lnbk1hdGVyaWFsRm9yRW50aXRpZXModGhpcy5lZGl0TW9kZWwuaGFuZHJhaWw/LnJhaWxJbnN0YW5jZXMubWFwKGluc3RhbmNlRGF0YSA9PiBpbnN0YW5jZURhdGEuaW5zdGFuY2UpLCBoYW5kcmFpbFBhcmFtcy5yYWlsLm1hdGVyaWFsLm1hdGVyaWFsSWQsIGhhbmRyYWlsUGFyYW1zLnJhaWwubWF0ZXJpYWwuYmdpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9IGVsc2UgaWYgKGNoYW5nZVBhcmFtc1swXSA9PT0gQ29tcG9uZW50UGFyYW1UeXBlLkhhbmRyYWlsQ29sdW1uTWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBpZiAodGhpcy5lZGl0TW9kZWwuaGFuZHJhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgaWYgKGluc3RhbmNlUGF0aC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIChhd2FpdCBkZXNpZ24uYWN0aXZhdGVFZGl0UGF0aChbLi4uaW5zdGFuY2VQYXRoWzBdLCB0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2UsIHRoaXMuZWRpdE1vZGVsLmhhbmRyYWlsLmhhbmRyYWlsSW5zdGFuY2UuaW5zdGFuY2VdKSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGlmICh0aGlzLmVkaXRNb2RlbC5oYW5kcmFpbD8uY29sdW1uSW5zdGFuY2VzLmxlbmd0aCAmJiBoYW5kcmFpbFBhcmFtcy5jb2x1bW4ubWF0ZXJpYWwgJiYgaGFuZHJhaWxQYXJhbXMuY29sdW1uLm1hdGVyaWFsLm1hdGVyaWFsSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGNvbnN0IGNvbHVtbk1hdGVyaWFsU3RyaW5nID0gc3RyaW5naWZ5TWF0ZXJpYWwoaGFuZHJhaWxQYXJhbXMuY29sdW1uLm1hdGVyaWFsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgISF0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCk/LnNldEN1c3RvbVByb3BlcnR5KENvbHVtbk1hdGVyaWFsS2V5LCBjb2x1bW5NYXRlcmlhbFN0cmluZykuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZGVzaWduLmFzc2lnbk1hdGVyaWFsRm9yRW50aXRpZXModGhpcy5lZGl0TW9kZWwuaGFuZHJhaWw/LmNvbHVtbkluc3RhbmNlcy5tYXAoaW5zdGFuY2VEYXRhID0+IGluc3RhbmNlRGF0YS5pbnN0YW5jZSksIGhhbmRyYWlsUGFyYW1zLmNvbHVtbi5tYXRlcmlhbC5tYXRlcmlhbElkLCBoYW5kcmFpbFBhcmFtcy5jb2x1bW4ubWF0ZXJpYWwuYmdpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhaXJQYXJhbS5oYW5kcmFpbC5zdXBwb3J0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJQcmFhbVN0cmluZyA9IHN0cmluZ2lmeVN0YWlyUGFyYW0odGhpcy5zdGFpclBhcmFtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAhISgoX2ogPSB0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCkpID09PSBudWxsIHx8IF9qID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfai5zZXRDdXN0b21Qcm9wZXJ0eShTdGFpclBhcmFtS2V5LCBzdGFpclByYWFtU3RyaW5nKS5pc1N1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZVBhdGgubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICh5aWVsZCBkZXNpZ24uYWN0aXZhdGVFZGl0UGF0aChbLi4uaW5zdGFuY2VQYXRoWzBdLCB0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2VdKSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYW5kcmFpbEluc3RhbmNlc0RhdGEgPSB5aWVsZCBidWlsZEhhbmRyYWlsSW5zdGFuY2UodGhpcy5zdGFpclBhcmFtLCAoX2sgPSB0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbikgPT09IG51bGwgfHwgX2sgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9rLmhhbmRyYWlscyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgaGFuZHJhaWxJbnN0YW5jZXNEYXRhICE9PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhbmRyYWlsSW5zdGFuY2VzRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlbC5oYW5kcmFpbCA9IGhhbmRyYWlsSW5zdGFuY2VzRGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmVkaXRNb2RlbC5oYW5kcmFpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZVBhdGgubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICh5aWVsZCBkZXNpZ24uYWN0aXZhdGVFZGl0UGF0aChbLi4uaW5zdGFuY2VQYXRoWzBdLCB0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2VdKSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNpZ24ucmVtb3ZlR3JvdXBJbnN0YW5jZSh0aGlzLmVkaXRNb2RlbC5oYW5kcmFpbC5oYW5kcmFpbEluc3RhbmNlLmluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlbC5oYW5kcmFpbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZVBhdGgubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKHlpZWxkIGRlc2lnbi5hY3RpdmF0ZUVkaXRQYXRoKFsuLi5pbnN0YW5jZVBhdGhbMF1dKSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21taXRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFib3J0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb24uYWRkKFt0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2VdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCFzdGFpclBhcmFtLnN0YWlyTWF0ZXJpYWwgJiYgY2hhbmdlUGFyYW1zLmxlbmd0aCA9PT0gMCAmJiBjaGFuZ2VQYXJhbXNbMF0gPT09IENvbXBvbmVudFBhcmFtVHlwZS5TdGFpck1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbk1hdGVyaWFsUmVwbGFjZUl0ZW1DbGljayhjaGFuZ2VQYXJhbXNbMF0sIHVuZGVmaW5lZCwgdHJ1ZSkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCFzdGFpclBhcmFtLnBsYXRmb3JtTWF0ZXJpYWwgJiYgY2hhbmdlUGFyYW1zLmxlbmd0aCA9PT0gMCAmJiBjaGFuZ2VQYXJhbXNbMF0gPT09IENvbXBvbmVudFBhcmFtVHlwZS5QbGF0Zm9ybUxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMub25NYXRlcmlhbFJlcGxhY2VJdGVtQ2xpY2soY2hhbmdlUGFyYW1zWzBdLCB1bmRlZmluZWQsIHRydWUpKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghc3RhaXJQYXJhbS5oYW5kcmFpbC5yYWlsLm1hdGVyaWFsICYmIGNoYW5nZVBhcmFtcy5sZW5ndGggPT09IDAgJiYgY2hhbmdlUGFyYW1zWzBdID09PSBDb21wb25lbnRQYXJhbVR5cGUuSGFuZHJhaWxSYWlsTWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uTWF0ZXJpYWxSZXBsYWNlSXRlbUNsaWNrKGNoYW5nZVBhcmFtc1swXSwgdW5kZWZpbmVkLCB0cnVlKSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXN0YWlyUGFyYW0uaGFuZHJhaWwuY29sdW1uLm1hdGVyaWFsICYmIGNoYW5nZVBhcmFtcy5sZW5ndGggPT09IDAgJiYgY2hhbmdlUGFyYW1zWzBdID09PSBDb21wb25lbnRQYXJhbVR5cGUuSGFuZHJhaWxDb2x1bW5NYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMub25NYXRlcmlhbFJlcGxhY2VJdGVtQ2xpY2soY2hhbmdlUGFyYW1zWzBdLCB1bmRlZmluZWQsIHRydWUpKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjaGFuZ2VDb21wb25lbnRQYXJhbShjb21wb25lbnRQYXJhbSwgY2hhbmdlUGFyYW1zKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZDtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zZWdtZW50cy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgdGhlU2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHRoaXMuc2VnbWVudHMsIGNvbXBvbmVudFBhcmFtLmluZGV4KTtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RTZWdtZW50ID0gdGhpcy5zZWdtZW50c1t0aGlzLnNlZ21lbnRzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgaWYgKHRoZVNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IHBhcmFtOiB7IGluZGV4LCB0eXBlIH0gfSA9IHRoZVNlZ21lbnQ7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50UGFyYW0ubW9kZWxFZGl0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGVTZWdtZW50LnBhcmFtID0gY29tcG9uZW50UGFyYW07XG4gICAgICAgICAgICAgICAgaWYgKCFpc0NpcmN1bGFyU3RhaXIodGhlU2VnbWVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhlU2VnbWVudC5jaXJjbGVUYW5nZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY2hhbmdlUGFyYW1zLmxlbmd0aCA9PT0gMCAmJiBjaGFuZ2VQYXJhbXNbMF0gPT09IENvbXBvbmVudFBhcmFtVHlwZS5Db21wb25lbnRNYXRlcmlhbCAmJiAhY29tcG9uZW50UGFyYW0ubWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk1hdGVyaWFsUmVwbGFjZUl0ZW1DbGljayhjaGFuZ2VQYXJhbXNbMF0sIGNvbXBvbmVudFBhcmFtLmluZGV4LCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYXdpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBDb21wb25lbnQodGhlU2VnbWVudCwgdGhlU2VnbWVudC5wYXJhbS5pbmRleCAhPT0gbGFzdFNlZ21lbnQucGFyYW0uaW5kZXgsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZWRpdE1vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzZWxlY3Rpb24uY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoZUluc3RhbmNlID0gdGhpcy5lZGl0TW9kZWwuc3RhaXJzLmdldChpbmRleCkgfHwgdGhpcy5lZGl0TW9kZWwucGxhdGZvcm1zLmdldChpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhlSW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlU2VnbWVudFNoYXBlKHRoZVNlZ21lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoZU1lc2hlcyA9IGdlbmVyYXRlTWVzaGVzKFt0aGVTZWdtZW50XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoZU1lc2hlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wZXJhdGlvblN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbnN0YW5jZVBhdGggPSBkZXNpZ24uZ2V0RWRpdFBhdGhzVG9Hcm91cEluc3RhbmNlKHRoaXMuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZVBhdGgubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAoeWllbGQgZGVzaWduLmFjdGl2YXRlRWRpdFBhdGgoWy4uLmluc3RhbmNlUGF0aFswXSwgdGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlXSkpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZGVzaWduLnJlbW92ZUdyb3VwSW5zdGFuY2UodGhlSW5zdGFuY2UuaW5zdGFuY2UpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb25TdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3SW5zdGFuY2UgPSBidWlsZENvbXBvbmVudEluc3RhbmNlKHRoZVNlZ21lbnQsIHRoaXMuc2VnbWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICEhbmV3SW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0luc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlbC5wbGF0Zm9ybXMuc2V0KGluZGV4LCB7IGluc3RhbmNlOiBuZXdJbnN0YW5jZSwgZGVmaW5pdGlvbktleTogKChfYSA9IG5ld0luc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZ2V0S2V5KCkpIHx8ICcnLCBpbnN0YW5jZUtleTogbmV3SW5zdGFuY2UuZ2V0S2V5KCkgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlbC5zdGFpcnMuc2V0KGluZGV4LCB7IGluc3RhbmNlOiBuZXdJbnN0YW5jZSwgZGVmaW5pdGlvbktleTogKChfYiA9IG5ld0luc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuZ2V0S2V5KCkpIHx8ICcnLCBpbnN0YW5jZUtleTogbmV3SW5zdGFuY2UuZ2V0S2V5KCkgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChfYyA9IHRoaXMuaGFuZHJhaWxDb2xsZWN0aW9uKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuaGFuZHJhaWxzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFuZHJhaWxJbnN0YW5jZXNEYXRhID0geWllbGQgYnVpbGRIYW5kcmFpbEluc3RhbmNlKHRoaXMuc3RhaXJQYXJhbSwgKF9kID0gdGhpcy5oYW5kcmFpbENvbGxlY3Rpb24pID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5oYW5kcmFpbHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgaGFuZHJhaWxJbnN0YW5jZXNEYXRhICE9PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGFuZHJhaWxJbnN0YW5jZXNEYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZWwuaGFuZHJhaWwgPSBoYW5kcmFpbEluc3RhbmNlc0RhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlUGF0aC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICh5aWVsZCBkZXNpZ24uYWN0aXZhdGVFZGl0UGF0aChpbnN0YW5jZVBhdGhbMF0pKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1pdE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWJvcnRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb24uYWRkKFt0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2VdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBjaGFuZ2VDb21wb25lbnRUeXBlKGNvbXBvbmVudFR5cGU6IENvbXBvbmVudFR5cGUpIHtcbiAgICAvLyAgICAgdGhpcy5jb21wb25lbnRQYXJhbS50eXBlID0gY29tcG9uZW50VHlwZTtcbiAgICAvLyAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiAnY29tcG9uZW50UGFyYW1DaGFuZ2VkJywgY29tcG9uZW50UGFyYW06IHsgLi4udGhpcy5jb21wb25lbnRQYXJhbSB9IH0sICcqJyk7XG4gICAgLy8gICAgIHRoaXMuY2hhbmdlQ29tcG9uZW50UGFyYW0odGhpcy5jb21wb25lbnRQYXJhbSwgW0NvbXBvbmVudFBhcmFtVHlwZS5UeXBlXSk7XG4gICAgLy8gfVxuICAgIHRyeUNvbW1pdCgpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2Y7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCBtZXNoZXMgPSBnZW5lcmF0ZU1lc2hlcyh0aGlzLnNlZ21lbnRzKTtcbiAgICAgICAgICAgIGlmIChtZXNoZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgc3RhcnRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdJbnN0YW5jZXMgPSBbXTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFpcnNDaGlsZCA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwbGF0Zm9ybUNoaWxkID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkU2VnbWVudHMgPSBbXTtcbiAgICAgICAgICAgICAgICBsZXQgb3BlcmF0aW9uU3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBzZWdtZW50IG9mIHRoaXMuc2VnbWVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzZWdtZW50Lm1lc2gpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvcGVyYXRpb25TdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhYm9ydE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0luc3RhbmNlID0gYnVpbGRDb21wb25lbnRJbnN0YW5jZShzZWdtZW50LCB0aGlzLnNlZ21lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgISFuZXdJbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0luc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdJbnN0YW5jZXMucHVzaChuZXdJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhdGZvcm1DaGlsZC5zZXQoc2VnbWVudC5wYXJhbS5pbmRleCwgeyBpbnN0YW5jZTogbmV3SW5zdGFuY2UsIGRlZmluaXRpb25LZXk6ICgoX2EgPSBuZXdJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmdldEtleSgpKSB8fCAnJywgaW5zdGFuY2VLZXk6IG5ld0luc3RhbmNlLmdldEtleSgpIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJzQ2hpbGQuc2V0KHNlZ21lbnQucGFyYW0uaW5kZXgsIHsgaW5zdGFuY2U6IG5ld0luc3RhbmNlLCBkZWZpbml0aW9uS2V5OiAoKF9iID0gbmV3SW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5nZXRLZXkoKSkgfHwgJycsIGluc3RhbmNlS2V5OiBuZXdJbnN0YW5jZS5nZXRLZXkoKSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQucGFyYW0ucGxhdGZvcm1MZW5ndGhMb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5wYXJhbS5zdGVwUHJvcG9ydGlvbmFsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQucGFyYW0ud2lkdGhQcm9wb3J0aW9uYWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5wYXJhbS5tb2RlbEVkaXRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRTZWdtZW50cy5wdXNoKHNlZ21lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBoYW5kcmFpbEluc3RhbmNlRGF0YTtcbiAgICAgICAgICAgICAgICBpZiAoKF9jID0gdGhpcy5oYW5kcmFpbENvbGxlY3Rpb24pID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5oYW5kcmFpbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRyYWlsSW5zdGFuY2VzRGF0YVJlcyA9IHlpZWxkIGJ1aWxkSGFuZHJhaWxJbnN0YW5jZSh0aGlzLnN0YWlyUGFyYW0sIChfZCA9IHRoaXMuaGFuZHJhaWxDb2xsZWN0aW9uKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QuaGFuZHJhaWxzKTtcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgaGFuZHJhaWxJbnN0YW5jZXNEYXRhUmVzICE9PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChoYW5kcmFpbEluc3RhbmNlc0RhdGFSZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0luc3RhbmNlcy5wdXNoKGhhbmRyYWlsSW5zdGFuY2VzRGF0YVJlcy5oYW5kcmFpbEluc3RhbmNlLmluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsSW5zdGFuY2VEYXRhID0gaGFuZHJhaWxJbnN0YW5jZXNEYXRhUmVzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChuZXdJbnN0YW5jZXMubGVuZ3RoICYmIG9wZXJhdGlvblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyZW50SW5zdGFuY2UgPSAoX2UgPSBkZXNpZ24ubWFrZUdyb3VwKFtdLCBuZXdJbnN0YW5jZXMsIFtdKSkgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lLmFkZGVkSW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICEhcGFyZW50SW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudERlZiA9IHBhcmVudEluc3RhbmNlID09PSBudWxsIHx8IHBhcmVudEluc3RhbmNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwYXJlbnRJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmVudEluc3RhbmNlICYmIHBhcmVudERlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgcGFyZW50RGVmLnNldEN1c3RvbVByb3BlcnR5KFN0YWlyTW9kZWxLZXksIE1vZGVsVmFsdWUpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YWlyUGFyYW1TdHJpbmcgPSBzdHJpbmdpZnlTdGFpclBhcmFtKHRoaXMuc3RhaXJQYXJhbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBwYXJlbnREZWYuc2V0Q3VzdG9tUHJvcGVydHkoU3RhaXJQYXJhbUtleSwgc3RhaXJQYXJhbVN0cmluZykuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhaXJQYXJhbS5zdGFpck1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhaXJNYXRlcmlhbFN0cmluZyA9IHN0cmluZ2lmeU1hdGVyaWFsKHRoaXMuc3RhaXJQYXJhbS5zdGFpck1hdGVyaWFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBwYXJlbnREZWYuc2V0Q3VzdG9tUHJvcGVydHkoU3RhaXJNYXRlcmlhbEtleSwgc3RhaXJNYXRlcmlhbFN0cmluZykuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhaXJQYXJhbS5wbGF0Zm9ybU1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGxhdGZvcm1NYXRlcmlhbFN0cmluZyA9IHN0cmluZ2lmeU1hdGVyaWFsKHRoaXMuc3RhaXJQYXJhbS5wbGF0Zm9ybU1hdGVyaWFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBwYXJlbnREZWYuc2V0Q3VzdG9tUHJvcGVydHkoUGxhdGZvcm1NYXRlcmlhbEtleSwgcGxhdGZvcm1NYXRlcmlhbFN0cmluZykuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhaXJQYXJhbS5oYW5kcmFpbC5zdXBwb3J0ICYmIHRoaXMuc3RhaXJQYXJhbS5oYW5kcmFpbC5yYWlsLm1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmFpbE1hdGVyaWFsU3RyaW5nID0gc3RyaW5naWZ5TWF0ZXJpYWwodGhpcy5zdGFpclBhcmFtLmhhbmRyYWlsLnJhaWwubWF0ZXJpYWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIHBhcmVudERlZi5zZXRDdXN0b21Qcm9wZXJ0eShSYWlsTWF0ZXJpYWxLZXksIHJhaWxNYXRlcmlhbFN0cmluZykuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhaXJQYXJhbS5oYW5kcmFpbC5zdXBwb3J0ICYmIHRoaXMuc3RhaXJQYXJhbS5oYW5kcmFpbC5jb2x1bW4ubWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2x1bW5NYXRlcmlhbFN0cmluZyA9IHN0cmluZ2lmeU1hdGVyaWFsKHRoaXMuc3RhaXJQYXJhbS5oYW5kcmFpbC5jb2x1bW4ubWF0ZXJpYWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIHBhcmVudERlZi5zZXRDdXN0b21Qcm9wZXJ0eShDb2x1bW5NYXRlcmlhbEtleSwgY29sdW1uTWF0ZXJpYWxTdHJpbmcpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb25TdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWl0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZWwgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudDogeyBpbnN0YW5jZTogcGFyZW50SW5zdGFuY2UsIGRlZmluaXRpb25LZXk6ICgoX2YgPSBwYXJlbnRJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9mLmdldEtleSgpKSB8fCAnJywgaW5zdGFuY2VLZXk6IHBhcmVudEluc3RhbmNlLmdldEtleSgpIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyczogc3RhaXJzQ2hpbGQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXRmb3JtczogcGxhdGZvcm1DaGlsZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWw6IGhhbmRyYWlsSW5zdGFuY2VEYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWdtZW50cyA9IHZhbGlkU2VnbWVudHM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3VGVtcENvbXBvbmVudCh2YWxpZFNlZ21lbnRzWzBdLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLkRyYXdTdGFpck1vZGVsU2V0dGxlZCwgY29tcG9uZW50UGFyYW1zOiB0aGlzLnNlZ21lbnRzLm1hcChzZWcgPT4gKE9iamVjdC5hc3NpZ24oe30sIHNlZy5wYXJhbSkpKSwgc3RhaXJQYXJhbTogdGhpcy5zdGFpclBhcmFtIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFib3J0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXRFZGl0TW9kZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVkaXRNb2RlbDtcbiAgICB9XG4gICAgc2V0TW9kZWwoZ3JvdXBJbnN0YW5jZSkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2Q7XG4gICAgICAgIGlmICgoKF9hID0gdGhpcy5lZGl0TW9kZWwpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wYXJlbnQuaW5zdGFuY2VLZXkpID09PSBncm91cEluc3RhbmNlLmdldEtleSgpKSB7XG4gICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlByb3BlcnRpZXNWaXNpYmxlLCBwcm9wZXJ0aWVzVmlzaWJsZTogdHJ1ZSB9LCAnKicpO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VnbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1c0NvbXBvbmVudCh0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lZGl0TW9kZWwgPSB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IGdyb3VwRGVmID0gZ3JvdXBJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKTtcbiAgICAgICAgaWYgKGdyb3VwSW5zdGFuY2UgJiYgZ3JvdXBEZWYpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YWlyTW9kZWxQcm9wZXJ0eSA9IGdyb3VwRGVmLmdldEN1c3RvbVByb3BlcnR5KFN0YWlyTW9kZWxLZXkpO1xuICAgICAgICAgICAgY29uc3Qgc3RhaXJQYXJhbVByb3BlcnR5ID0gZ3JvdXBEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoU3RhaXJQYXJhbUtleSk7XG4gICAgICAgICAgICBjb25zdCBzdGFpclBhcmFtID0gcGFyc2VTdGFpclBhcmFtKHN0YWlyUGFyYW1Qcm9wZXJ0eSk7XG4gICAgICAgICAgICBjb25zdCBzdGFpck1hdGVyaWFsUHJvcGVydHkgPSBncm91cERlZi5nZXRDdXN0b21Qcm9wZXJ0eShTdGFpck1hdGVyaWFsS2V5KTtcbiAgICAgICAgICAgIGNvbnN0IHN0YWlyTWF0ZXJpYWwgPSBwYXJzZU1hdGVyaWFsKHN0YWlyTWF0ZXJpYWxQcm9wZXJ0eSk7XG4gICAgICAgICAgICBpZiAoc3RhaXJNYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgIHN0YWlyUGFyYW0uc3RhaXJNYXRlcmlhbCA9IHN0YWlyTWF0ZXJpYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwbGF0Zm9ybU1hdGVyaWFsUHJvcGVydHkgPSBncm91cERlZi5nZXRDdXN0b21Qcm9wZXJ0eShQbGF0Zm9ybU1hdGVyaWFsS2V5KTtcbiAgICAgICAgICAgIGNvbnN0IHBsYXRmb3JtTWF0ZXJpYWwgPSBwYXJzZU1hdGVyaWFsKHBsYXRmb3JtTWF0ZXJpYWxQcm9wZXJ0eSk7XG4gICAgICAgICAgICBpZiAocGxhdGZvcm1NYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgIHN0YWlyUGFyYW0ucGxhdGZvcm1NYXRlcmlhbCA9IHBsYXRmb3JtTWF0ZXJpYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCByYWlsTWF0ZXJpYWxQcm9wZXJ0eSA9IGdyb3VwRGVmLmdldEN1c3RvbVByb3BlcnR5KFJhaWxNYXRlcmlhbEtleSk7XG4gICAgICAgICAgICBjb25zdCByYWlsTWF0ZXJpYWwgPSBwYXJzZU1hdGVyaWFsKHJhaWxNYXRlcmlhbFByb3BlcnR5KTtcbiAgICAgICAgICAgIGlmIChyYWlsTWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICBzdGFpclBhcmFtLmhhbmRyYWlsLnJhaWwubWF0ZXJpYWwgPSByYWlsTWF0ZXJpYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjb2x1bW5NYXRlcmlhbFByb3BlcnR5ID0gZ3JvdXBEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoQ29sdW1uTWF0ZXJpYWxLZXkpO1xuICAgICAgICAgICAgY29uc3QgY29sdW1uTWF0ZXJpYWwgPSBwYXJzZU1hdGVyaWFsKGNvbHVtbk1hdGVyaWFsUHJvcGVydHkpO1xuICAgICAgICAgICAgaWYgKGNvbHVtbk1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgc3RhaXJQYXJhbS5oYW5kcmFpbC5jb2x1bW4ubWF0ZXJpYWwgPSBjb2x1bW5NYXRlcmlhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdGFpck1vZGVsUHJvcGVydHkgPT09IE1vZGVsVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWdtZW50cyA9IFtdO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN1Ykdyb3VwSW5zdGFuY2VzID0gZ3JvdXBEZWYuZ2V0U3ViR3JvdXBJbnN0YW5jZXMoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBlZGl0TW9kZWwgPSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudDogeyBpbnN0YW5jZTogZ3JvdXBJbnN0YW5jZSwgZGVmaW5pdGlvbktleTogKChfYiA9IGdyb3VwSW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5nZXRLZXkoKSkgfHwgJycsIGluc3RhbmNlS2V5OiBncm91cEluc3RhbmNlLmdldEtleSgpIH0sXG4gICAgICAgICAgICAgICAgICAgIHN0YWlyczogbmV3IE1hcCgpLFxuICAgICAgICAgICAgICAgICAgICBwbGF0Zm9ybXM6IG5ldyBNYXAoKSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgc3ViSW5zdGFuY2Ugb2Ygc3ViR3JvdXBJbnN0YW5jZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3ViRGVmID0gc3ViSW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdWJEZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRyYWlsUHJvcGVydHkgPSBzdWJEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoSGFuZHJhaWxNb2RlbEtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGFuZHJhaWxQcm9wZXJ0eSA9PT0gTW9kZWxWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRyYWlsSW5zdGFuY2VzRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWxJbnN0YW5jZTogeyBpbnN0YW5jZTogc3ViSW5zdGFuY2UsIGluc3RhbmNlS2V5OiBzdWJJbnN0YW5jZS5nZXRLZXkoKSwgZGVmaW5pdGlvbktleTogc3ViRGVmLmdldEtleSgpIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhaWxJbnN0YW5jZXM6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5JbnN0YW5jZXM6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFuZHJhaWxTdWJHcm91cEluc3RhbmNlcyA9IHN1YkRlZi5nZXRTdWJHcm91cEluc3RhbmNlcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaGFuZHJhaWxTdWJJbnN0YW5jZSBvZiBoYW5kcmFpbFN1Ykdyb3VwSW5zdGFuY2VzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRyYWlsU3ViRGVmID0gaGFuZHJhaWxTdWJJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhbmRyYWlsU3ViRGVmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByYWlsUHJvcGVydHkgPSBoYW5kcmFpbFN1YkRlZi5nZXRDdXN0b21Qcm9wZXJ0eShSYWlsTW9kZWxLZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29sdW1uUHJvcGVydHkgPSBoYW5kcmFpbFN1YkRlZi5nZXRDdXN0b21Qcm9wZXJ0eShDb2x1bW5Nb2RlbEtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmFpbFByb3BlcnR5ID09PSBNb2RlbFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWxJbnN0YW5jZXNEYXRhLnJhaWxJbnN0YW5jZXMucHVzaCh7IGluc3RhbmNlOiBoYW5kcmFpbFN1Ykluc3RhbmNlLCBpbnN0YW5jZUtleTogaGFuZHJhaWxTdWJJbnN0YW5jZS5nZXRLZXkoKSwgZGVmaW5pdGlvbktleTogaGFuZHJhaWxTdWJEZWYuZ2V0S2V5KCkgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChjb2x1bW5Qcm9wZXJ0eSA9PT0gTW9kZWxWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsSW5zdGFuY2VzRGF0YS5jb2x1bW5JbnN0YW5jZXMucHVzaCh7IGluc3RhbmNlOiBoYW5kcmFpbFN1Ykluc3RhbmNlLCBpbnN0YW5jZUtleTogaGFuZHJhaWxTdWJJbnN0YW5jZS5nZXRLZXkoKSwgZGVmaW5pdGlvbktleTogaGFuZHJhaWxTdWJEZWYuZ2V0S2V5KCkgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdE1vZGVsLmhhbmRyYWlsID0gaGFuZHJhaWxJbnN0YW5jZXNEYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgY29tcG9uZW50SW5kZXhWYWx1ZSA9IHBhcnNlSW50KHN1YkRlZi5nZXRDdXN0b21Qcm9wZXJ0eShDb21wb25lbnRJbmRleEtleSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIChpc0Zpbml0ZShjb21wb25lbnRJbmRleFZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmFtID0gcGFyc2VDb21wb25lbnRQYXJhbShzdWJEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoQ29tcG9uZW50UGFyYW1LZXkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFydEVuZCA9IHBhcnNlU3RhcnRFbmQoc3ViRGVmLmdldEN1c3RvbVByb3BlcnR5KFN0YXJ0RW5kS2V5KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFzZUxpbmVTZWczZCA9IHBhcnNlTGluZVNlZzNkKHN1YkRlZi5nZXRDdXN0b21Qcm9wZXJ0eShCYXNlTGluZVNlZzNkS2V5KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFzZUNvbXBvbmVudCA9IHBhcnNlQmFzZUNvbXBvbmVudChzdWJEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoQmFzZUNvbXBvbmVudEtleSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNpcmNsZVRhbmdlbnQgPSBwYXJzZVZlY3RvcjNkKHN1YkRlZi5nZXRDdXN0b21Qcm9wZXJ0eShDaXJjbGVUYW5nZW50S2V5KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtICYmIHN0YXJ0RW5kICYmIGJhc2VMaW5lU2VnM2QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VnbWVudCA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgZ2V0TmV3U2VnbWVudChwYXJhbS50eXBlKSksIHsgc3RhcnQ6IHN0YXJ0RW5kLnN0YXJ0LCBlbmQ6IHN0YXJ0RW5kLmVuZCwgc3RhcnRIZWlnaHQ6IHN0YXJ0RW5kLnN0YXJ0SGVpZ2h0LCBlbmRIZWlnaHQ6IHN0YXJ0RW5kLmVuZEhlaWdodCwgYmFzZUNvbXBvbmVudDogeyBjb21wb25lbnRJbmRleDogYmFzZUNvbXBvbmVudCA9PT0gbnVsbCB8fCBiYXNlQ29tcG9uZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBiYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4LCBsaW5lM2RJbmRleDogYmFzZUNvbXBvbmVudCA9PT0gbnVsbCB8fCBiYXNlQ29tcG9uZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBiYXNlQ29tcG9uZW50LmxpbmUzZEluZGV4LCBsaW5lM2Q6IGJhc2VMaW5lU2VnM2QgfSwgY2lyY2xlVGFuZ2VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtLCBzdGFydExvY2tlZDogdHJ1ZSwgZW5kTG9ja2VkOiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50cy5wdXNoKHNlZ21lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdE1vZGVsLnBsYXRmb3Jtcy5zZXQocGFyYW0uaW5kZXgsIHsgaW5zdGFuY2U6IHN1Ykluc3RhbmNlLCBkZWZpbml0aW9uS2V5OiAoKF9jID0gc3ViSW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCkpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5nZXRLZXkoKSkgfHwgJycsIGluc3RhbmNlS2V5OiBzdWJJbnN0YW5jZS5nZXRLZXkoKSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRNb2RlbC5zdGFpcnMuc2V0KHBhcmFtLmluZGV4LCB7IGluc3RhbmNlOiBzdWJJbnN0YW5jZSwgZGVmaW5pdGlvbktleTogKChfZCA9IHN1Ykluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QuZ2V0S2V5KCkpIHx8ICcnLCBpbnN0YW5jZUtleTogc3ViSW5zdGFuY2UuZ2V0S2V5KCkgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBzZWdtZW50cy5zb3J0KChhLCBiKSA9PiBhLnBhcmFtLmluZGV4IC0gYi5wYXJhbS5pbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkU2VnbWVudFJlbGF0aW9ucyhzZWdtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VnbWVudHMgPSBzZWdtZW50cztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZWwgPSBlZGl0TW9kZWw7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuZHJhd1RlbXBDb21wb25lbnQoc2VnbWVudHNbMF0sIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzQ29tcG9uZW50KHNlZ21lbnRzWzBdLnBhcmFtLmluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5EcmF3U3RhaXJNb2RlbFNldHRsZWQsIGNvbXBvbmVudFBhcmFtczogdGhpcy5zZWdtZW50cy5tYXAoc2VnID0+IChPYmplY3QuYXNzaWduKHt9LCBzZWcucGFyYW0pKSksIHN0YWlyUGFyYW06IHRoaXMuc3RhaXJQYXJhbSB9LCAnKicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjbGVhckVkaXRNb2RlbCgpIHtcbiAgICAgICAgdGhpcy5lZGl0TW9kZWwgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuc2VnbWVudHMgPSBbXTtcbiAgICAgICAgdGhpcy5oYW5kcmFpbENvbGxlY3Rpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4ID0gRGVmYXVsdEZvY3VzZWRDb21wb25lbnRJbmRleDtcbiAgICAgICAgYXBwVmlldy5jbGVhclRlbXBvcmFyeVNoYXBlcygpO1xuICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLkRyYXdTdGFpck1vZGVsU2V0dGxlZCB9LCAnKicpO1xuICAgIH1cbiAgICBjbGVhcigpIHtcbiAgICAgICAgYXBwVmlldy5jbGVhclRlbXBvcmFyeVNoYXBlcygpO1xuICAgICAgICAvLyB0aGlzLmNvbXBvbmVudFBhcmFtID0geyAuLi5EZWZhdWx0Q29tcG9uZW50UGFyYW0gfTtcbiAgICAgICAgLy8gdGhpcy5zZWdtZW50cyA9IFtdO1xuICAgICAgICB0aGlzLmRyYXdpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggPSBEZWZhdWx0Rm9jdXNlZENvbXBvbmVudEluZGV4O1xuICAgICAgICB0aGlzLnN0YWlyUGFyYW0gPSBEZWZhdWx0U3RhaXJQYXJhbTtcbiAgICAgICAgLy8gdGhpcy5lZGl0TW9kZWwgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIG9uUkJ1dHRvblVwKGV2ZW50LCBpbmZlcmVuY2VSZXN1bHQpIHtcbiAgICAgICAgdGhpcy50cnlDb21taXQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGRlQWN0aXZhdGVEcmF3U3RhaXJzVG9vbCgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgb25MQnV0dG9uRGJDbGljayhldmVudCwgaW5mZXJlbmNlUmVzdWx0KSB7XG4gICAgICAgIDtcbiAgICB9XG4gICAgYWxsb3dVc2luZ0luZmVyZW5jZSgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIG9uS2V5RG93bihldmVudCkge1xuICAgICAgICA7XG4gICAgfVxuICAgIG9uS2V5VXAoZXZlbnQpIHtcbiAgICAgICAgO1xuICAgIH1cbiAgICBnZW5lcmF0ZVNlZ21lbnRTaGFwZShzZWdtZW50LCB0ZW1wID0gdHJ1ZSkge1xuICAgICAgICBnZW5lcmF0ZVNoYXBlKHNlZ21lbnQsIHRlbXApO1xuICAgICAgICAvLyB0aGlzLmdlbmVyYXRlSGFuZHJhaWxTaGFwZSgpO1xuICAgIH1cbiAgICBnZW5lcmF0ZUhhbmRyYWlsU2hhcGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgaGFuZHJhaWxzID0gZ2VuZXJhdGVIYW5kcmFpbFNoYXBlKHRoaXMuc3RhaXJQYXJhbSwgdGhpcy5zZWdtZW50cyk7XG4gICAgICAgICAgICB0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbiA9IHsgaGFuZHJhaWxzOiBoYW5kcmFpbHMgfHwgW10gfTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBjb25zdCBkcmF3U3RhaXJzVG9vbCA9IG5ldyBEcmF3U3RhaXJzVG9vbCgpO1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBEaXJlY3Rpb25aLCBkdW1teVBvaW50M2QgfSBmcm9tIFwiLi9jb25zdHNcIjtcbmltcG9ydCB7IEJhc2VDb21wb25lbnRLZXksIEJhc2VMaW5lU2VnM2RLZXksIENpcmNsZVRhbmdlbnRLZXksIENvbHVtblR5cGUsIENvbXBvbmVudFR5cGUsIERlZmF1bHRTdGFpclBhcmFtLCBIYW5kcmFpbE1vZGVsS2V5LCBSYWlsVHlwZSwgTW9kZWxWYWx1ZSwgU3RhcnRFbmRLZXksIFByZXNldE1hdGVyaWFscywgQ29sdW1uTW9kZWxLZXksIFJhaWxNb2RlbEtleSwgQ29tcG9uZW50UGFyYW1LZXkgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgZ2V0Q29vcmRpbmF0ZSwgc3RyaW5naWZ5QmFzZUNvbXBvbmVudCwgc3RyaW5naWZ5Q29tcG9uZW50UGFyYW0sIHN0cmluZ2lmeVBvaW50M2QsIHN0cmluZ2lmeVN0YXJ0RW5kIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZU1lc2hlcyhzZWdtZW50cykge1xuICAgIGNvbnN0IG1lc2hlcyA9IFtdO1xuICAgIGZvciAoY29uc3Qgc2VnbWVudCBvZiBzZWdtZW50cykge1xuICAgICAgICBjb25zdCB7IHBhcmFtOiB7IHR5cGUgfSwgY2lyY2xlVGFuZ2VudCB9ID0gc2VnbWVudDtcbiAgICAgICAgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpcikge1xuICAgICAgICAgICAgZ2VuZXJhdGVTdHJhaWdodFN0YWlyTWVzaChzZWdtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09PSBDb21wb25lbnRUeXBlLkNpcmN1bGFyU3RhaXIpIHtcbiAgICAgICAgICAgIGlmIChjaXJjbGVUYW5nZW50KSB7XG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVDaXJjdWxhclN0YWlyTWVzaChzZWdtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGdlbmVyYXRlU3RyYWlnaHRTdGFpck1lc2goc2VnbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBnZW5lcmF0ZVBsYXRmb3JtTWVzaChzZWdtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VnbWVudC5tZXNoKSB7XG4gICAgICAgICAgICBtZXNoZXMucHVzaChzZWdtZW50Lm1lc2gpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtZXNoZXM7XG59XG5mdW5jdGlvbiBnZW5lcmF0ZUNpcmN1bGFyU3RhaXJNZXNoKHNlZ21lbnQpIHtcbiAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oLCBfaiwgX2ssIF9sO1xuICAgIGNvbnN0IHsgc3RhcnRMb2NrZWQsIGNpcmNsZVRhbmdlbnQsIHN0YWlyU2hhcGU6IHsgdmVydGljZXMsIHN0ZXBDb3VudCB9LCBjb3JuZXJTaGFwZTogeyB2ZXJ0aWNlczogY29ybmVyVmVydGljZXMgfSwgcGFyYW06IHsgdXB3YXJkIH0gfSA9IHNlZ21lbnQ7XG4gICAgaWYgKHN0ZXBDb3VudCA8IDEgfHwgIXN0YXJ0TG9ja2VkIHx8ICFjaXJjbGVUYW5nZW50KVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGNvbnN0IHN0YWlyTWVzaCA9IHtcbiAgICAgICAgdmVydGljZXM6IHZlcnRpY2VzLm1hcCh2ZXJ0ZXggPT4gW3ZlcnRleC54LCB2ZXJ0ZXgueSwgdmVydGV4LnpdKSxcbiAgICAgICAgdHJpYW5nbGVJbmRpY2VzOiBbXSxcbiAgICAgICAgc29mdEVkZ2VzOiBbXSxcbiAgICB9O1xuICAgIC8vIOacgOW6lemDqOWPsOmYtuWQjuS4i+S9jee9rlxuICAgIC8vIGNvbnN0IGxlZnRJbmRleCA9IHZlcnRpY2VzLmxlbmd0aCAtICgoIXVwd2FyZCAmJiBzdGVwQ291bnQgPiAxKSA/IDQgOiAyKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ZXBDb3VudDsgaSsrKSB7XG4gICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgLy8gc3RhaXIgZmFjZXNcbiAgICAgICAgW2kgKiA0LCBpICogNCArIDEsIGkgKiA0ICsgMl0sIFtpICogNCArIDEsIGkgKiA0ICsgMywgaSAqIDQgKyAyXSwgW2kgKiA0ICsgMiwgaSAqIDQgKyAzLCBpICogNCArIDRdLCBbaSAqIDQgKyAzLCBpICogNCArIDUsIGkgKiA0ICsgNF0sIFxuICAgICAgICAvLyBzaWRlIGZhY2VzICh1cClcbiAgICAgICAgW2kgKiA0LCBpICogNCArIDIsIChpICsgMSkgKiA0XSwgW2kgKiA0ICsgMSwgKGkgKyAxKSAqIDQgKyAxLCBpICogNCArIDNdKTtcbiAgICAgICAgKF9hID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnB1c2goW2kgKiA0ICsgMSwgaSAqIDQgKyAyXSwgW2kgKiA0ICsgMywgaSAqIDQgKyA0XSwgW2kgKiA0LCAoaSArIDEpICogNF0sIFsoaSArIDEpICogNCArIDEsIGkgKiA0ICsgMV0pO1xuICAgICAgICBpZiAodXB3YXJkKSB7XG4gICAgICAgICAgICBjb25zdCBib3R0b21Gcm9udExlZnRJbmRleCA9IDQgKiBzdGVwQ291bnQgKyAyICsgMiAqIChzdGVwQ291bnQgLSBpIC0gMSk7XG4gICAgICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXG4gICAgICAgICAgICAvLyBzaWRlIGZhY2VzIChtaWRkbGUpXG4gICAgICAgICAgICBbaSAqIDQsIChpICsgMSkgKiA0LCBib3R0b21Gcm9udExlZnRJbmRleF0sIFsoaSArIDEpICogNCArIDEsIGkgKiA0ICsgMSwgYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAxXSk7XG4gICAgICAgICAgICBpZiAoaSA8IHN0ZXBDb3VudCAtIDEpIHtcbiAgICAgICAgICAgICAgICAoX2IgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IucHVzaChbKGkgKyAxKSAqIDQsIGJvdHRvbUZyb250TGVmdEluZGV4XSwgWyhpICsgMSkgKiA0ICsgMSwgYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXG4gICAgICAgICAgICAgICAgLy8gc2lkZSBmYWNlcyAoYm90dG9tKVxuICAgICAgICAgICAgICAgIFtpICogNCwgYm90dG9tRnJvbnRMZWZ0SW5kZXgsIGJvdHRvbUZyb250TGVmdEluZGV4ICsgMl0sIFtib3R0b21Gcm9udExlZnRJbmRleCArIDEsIGkgKiA0ICsgMSwgYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAzXSwgXG4gICAgICAgICAgICAgICAgLy8gYm90dG9tIGZhY2VzXG4gICAgICAgICAgICAgICAgW2JvdHRvbUZyb250TGVmdEluZGV4ICsgMiwgYm90dG9tRnJvbnRMZWZ0SW5kZXgsIGJvdHRvbUZyb250TGVmdEluZGV4ICsgM10sIFtib3R0b21Gcm9udExlZnRJbmRleCArIDMsIGJvdHRvbUZyb250TGVmdEluZGV4LCBib3R0b21Gcm9udExlZnRJbmRleCArIDFdKTtcbiAgICAgICAgICAgICAgICAoX2MgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MucHVzaChbaSAqIDQsIGJvdHRvbUZyb250TGVmdEluZGV4XSwgW2kgKiA0ICsgMSwgYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAxXSwgW2JvdHRvbUZyb250TGVmdEluZGV4ICsgMywgYm90dG9tRnJvbnRMZWZ0SW5kZXhdKTtcbiAgICAgICAgICAgICAgICBpZiAoaSA8IHN0ZXBDb3VudCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgKF9kID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLnB1c2goW2JvdHRvbUZyb250TGVmdEluZGV4ICsgMSwgYm90dG9tRnJvbnRMZWZ0SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXG4gICAgICAgICAgICAgICAgLy8gYm90dG9tIGZhY2VzXG4gICAgICAgICAgICAgICAgW2kgKiA0LCBib3R0b21Gcm9udExlZnRJbmRleCwgaSAqIDQgKyAxXSwgW2kgKiA0ICsgMSwgYm90dG9tRnJvbnRMZWZ0SW5kZXgsIGJvdHRvbUZyb250TGVmdEluZGV4ICsgMV0pO1xuICAgICAgICAgICAgICAgIChfZSA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS5wdXNoKFtpICogNCArIDEsIGJvdHRvbUZyb250TGVmdEluZGV4XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBib3R0b21CYWNrTGVmdEluZGV4ID0gNCAqIHN0ZXBDb3VudCArIDIgKyAyICogKHN0ZXBDb3VudCAtIGkgLSAxKTtcbiAgICAgICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgICAgIC8vIHNpZGUgZmFjZXMgKG1pZGRsZSlcbiAgICAgICAgICAgIFtpICogNCwgKGkgKyAxKSAqIDQsIGJvdHRvbUJhY2tMZWZ0SW5kZXhdLCBbKGkgKyAxKSAqIDQgKyAxLCBpICogNCArIDEsIGJvdHRvbUJhY2tMZWZ0SW5kZXggKyAxXSwgXG4gICAgICAgICAgICAvLyBib3R0b20gZmFjZXNcbiAgICAgICAgICAgIFtib3R0b21CYWNrTGVmdEluZGV4LCBib3R0b21CYWNrTGVmdEluZGV4IC0gMiwgYm90dG9tQmFja0xlZnRJbmRleCArIDFdLCBbYm90dG9tQmFja0xlZnRJbmRleCArIDEsIGJvdHRvbUJhY2tMZWZ0SW5kZXggLSAyLCBib3R0b21CYWNrTGVmdEluZGV4IC0gMV0pO1xuICAgICAgICAgICAgKF9mID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9mLnB1c2goW2JvdHRvbUJhY2tMZWZ0SW5kZXggKyAxLCBib3R0b21CYWNrTGVmdEluZGV4IC0gMl0pO1xuICAgICAgICAgICAgaWYgKGkgPCBzdGVwQ291bnQgLSAxKSB7XG4gICAgICAgICAgICAgICAgKF9nID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2cgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9nLnB1c2goWyhpICsgMSkgKiA0LCBib3R0b21CYWNrTGVmdEluZGV4XSwgWyhpICsgMSkgKiA0ICsgMSwgYm90dG9tQmFja0xlZnRJbmRleCArIDFdKTtcbiAgICAgICAgICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXG4gICAgICAgICAgICAgICAgLy8gc2lkZSBmYWNlcyAoYm90dG9tKVxuICAgICAgICAgICAgICAgIFsoaSArIDEpICogNCwgYm90dG9tQmFja0xlZnRJbmRleCAtIDIsIGJvdHRvbUJhY2tMZWZ0SW5kZXhdLCBbYm90dG9tQmFja0xlZnRJbmRleCAtIDEsIChpICsgMSkgKiA0ICsgMSwgYm90dG9tQmFja0xlZnRJbmRleCArIDFdKTtcbiAgICAgICAgICAgICAgICAoX2ggPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfaCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2gucHVzaChbKGkgKyAxKSAqIDQsIGJvdHRvbUJhY2tMZWZ0SW5kZXggLSAyXSwgWyhpICsgMSkgKiA0ICsgMSwgYm90dG9tQmFja0xlZnRJbmRleCAtIDFdLCBbYm90dG9tQmFja0xlZnRJbmRleCArIDEsIGJvdHRvbUJhY2tMZWZ0SW5kZXggLSAyXSk7XG4gICAgICAgICAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIChfaiA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9qID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfai5wdXNoKFtib3R0b21CYWNrTGVmdEluZGV4ICsgMSwgYm90dG9tQmFja0xlZnRJbmRleF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAodXB3YXJkKSB7XG4gICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgLy8gYm90dG9tIGZhY2VzXG4gICAgICAgIC8vIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCAxLCAwXSxcbiAgICAgICAgLy8gW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIDAsIHZlcnRpY2VzLmxlbmd0aCAtIDJdLFxuICAgICAgICAvLyDliY3kvqfpnaJcbiAgICAgICAgW3N0ZXBDb3VudCAqIDQsIHN0ZXBDb3VudCAqIDQgKyAxLCBzdGVwQ291bnQgKiA0ICsgMl0sIFtzdGVwQ291bnQgKiA0ICsgMSwgc3RlcENvdW50ICogNCArIDMsIHN0ZXBDb3VudCAqIDQgKyAyXSk7XG4gICAgICAgIChfayA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9rID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfay5wdXNoKFxuICAgICAgICAvLyBbdmVydGljZXMubGVuZ3RoIC0gMSwgMF0sXG4gICAgICAgIFtzdGVwQ291bnQgKiA0ICsgMSwgc3RlcENvdW50ICogNCArIDJdKTtcbiAgICAgICAgLy8gaWYgKHN0ZXBDb3VudCA+IDEpIHtcbiAgICAgICAgLy8gICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgLy8gICAgICAgICAvLyBzaWRlIGJvdHRvbSBmYWNlc1xuICAgICAgICAvLyAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSAyLCB2ZXJ0aWNlcy5sZW5ndGggLSAxMCwgdmVydGljZXMubGVuZ3RoIC0gNF0sXG4gICAgICAgIC8vICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIHZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDldLFxuICAgICAgICAvLyAgICAgICAgIC8vIGJvdHRvbSBmYWNlc1xuICAgICAgICAvLyAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSA1LCB2ZXJ0aWNlcy5sZW5ndGggLSAzLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSxcbiAgICAgICAgLy8gICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gNSwgdmVydGljZXMubGVuZ3RoIC0gNCwgdmVydGljZXMubGVuZ3RoIC0gNl0sXG4gICAgICAgIC8vICAgICApO1xuICAgICAgICAvLyAgICAgc3RhaXJNZXNoLnNvZnRFZGdlcz8ucHVzaChcbiAgICAgICAgLy8gICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gNSwgdmVydGljZXMubGVuZ3RoIC0gNF0sXG4gICAgICAgIC8vICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIHZlcnRpY2VzLmxlbmd0aCAtIDEwXSxcbiAgICAgICAgLy8gICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gMTAsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLFxuICAgICAgICAvLyAgICAgKTtcbiAgICAgICAgLy8gfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAvLyDlkI7kvqfpnaJcbiAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIDEsIDBdLCBbdmVydGljZXMubGVuZ3RoIC0gMSwgMCwgdmVydGljZXMubGVuZ3RoIC0gMl0pO1xuICAgICAgICAoX2wgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2wucHVzaChbdmVydGljZXMubGVuZ3RoIC0gMSwgMF0pO1xuICAgICAgICAvLyBpZiAoc3RlcENvdW50ID4gMSkge1xuICAgICAgICAvLyAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAvLyAgICAgICAgIC8vIHNpZGUgYm90dG9tIGZhY2VzXG4gICAgICAgIC8vICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIDAsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLFxuICAgICAgICAvLyAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCB2ZXJ0aWNlcy5sZW5ndGggLSAzLCAxXSxcbiAgICAgICAgLy8gICAgICAgICAvLyBib3R0b20gZmFjZXNcbiAgICAgICAgLy8gICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gNSwgdmVydGljZXMubGVuZ3RoIC0gNCwgdmVydGljZXMubGVuZ3RoIC0gM10sXG4gICAgICAgIC8vICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDYsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLFxuICAgICAgICAvLyAgICAgKTtcbiAgICAgICAgLy8gICAgIHN0YWlyTWVzaC5zb2Z0RWRnZXM/LnB1c2goXG4gICAgICAgIC8vICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLFxuICAgICAgICAvLyAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSAzLCAxXSxcbiAgICAgICAgLy8gICAgICAgICBbMCwgdmVydGljZXMubGVuZ3RoIC0gNF0sXG4gICAgICAgIC8vICAgICApO1xuICAgICAgICAvLyB9XG4gICAgfVxuICAgIGlmIChjb3JuZXJWZXJ0aWNlcy5sZW5ndGggPT09IDYpIHtcbiAgICAgICAgZ2VuZXJhdGVQb2x5Z29uTWVzaChjb3JuZXJWZXJ0aWNlcywgc3RhaXJNZXNoKTtcbiAgICB9XG4gICAgc2VnbWVudC5tZXNoID0gc3RhaXJNZXNoO1xufVxuZnVuY3Rpb24gZ2VuZXJhdGVTdHJhaWdodFN0YWlyTWVzaChzZWdtZW50KSB7XG4gICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2YsIF9nLCBfaCwgX2osIF9rO1xuICAgIGNvbnN0IHsgc3RhcnRMb2NrZWQsIHN0YWlyU2hhcGU6IHsgdmVydGljZXMsIHN0ZXBDb3VudCB9LCBjb3JuZXJTaGFwZTogeyB2ZXJ0aWNlczogY29ybmVyVmVydGljZXMgfSwgcGFyYW06IHsgdXB3YXJkIH0gfSA9IHNlZ21lbnQ7XG4gICAgaWYgKHN0ZXBDb3VudCA8IDEgfHwgIXN0YXJ0TG9ja2VkKVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGNvbnN0IHN0YWlyTWVzaCA9IHtcbiAgICAgICAgdmVydGljZXM6IHZlcnRpY2VzLm1hcCh2ZXJ0ZXggPT4gW3ZlcnRleC54LCB2ZXJ0ZXgueSwgdmVydGV4LnpdKSxcbiAgICAgICAgdHJpYW5nbGVJbmRpY2VzOiBbXSxcbiAgICAgICAgc29mdEVkZ2VzOiBbXSxcbiAgICB9O1xuICAgIGNvbnN0IGxlZnRJbmRleCA9IHZlcnRpY2VzLmxlbmd0aCAtICgoIXVwd2FyZCAmJiBzdGVwQ291bnQgPiAxKSA/IDQgOiAyKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ZXBDb3VudDsgaSsrKSB7XG4gICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgLy8gc3RhaXIgZmFjZXNcbiAgICAgICAgW2kgKiA0LCBpICogNCArIDEsIGkgKiA0ICsgMl0sIFtpICogNCArIDEsIGkgKiA0ICsgMywgaSAqIDQgKyAyXSwgW2kgKiA0ICsgMiwgaSAqIDQgKyAzLCBpICogNCArIDRdLCBbaSAqIDQgKyAzLCBpICogNCArIDUsIGkgKiA0ICsgNF0sIFxuICAgICAgICAvLyBzaWRlIGZhY2VzXG4gICAgICAgIFtpICogNCwgaSAqIDQgKyAyLCAoaSArIDEpICogNF0sIFtpICogNCArIDEsIChpICsgMSkgKiA0ICsgMSwgaSAqIDQgKyAzXSk7XG4gICAgICAgIChfYSA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wdXNoKFtpICogNCArIDEsIGkgKiA0ICsgMl0sIFtpICogNCArIDMsIGkgKiA0ICsgNF0sIFtpICogNCwgKGkgKyAxKSAqIDRdLCBbKGkgKyAxKSAqIDQgKyAxLCBpICogNCArIDFdKTtcbiAgICAgICAgaWYgKGkgPT09IHN0ZXBDb3VudCAtIDEgJiYgdXB3YXJkICYmIHN0ZXBDb3VudCA+IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGJiTGVmdEluZGV4ID0gdmVydGljZXMubGVuZ3RoIC0gNDtcbiAgICAgICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgICAgIC8vIHRhaWwgc2lkZSBmYWNlc1xuICAgICAgICAgICAgW2JiTGVmdEluZGV4LCBpICogNCwgKGkgKyAxKSAqIDRdLCBbYmJMZWZ0SW5kZXggKyAxLCAoaSArIDEpICogNCArIDEsIGkgKiA0ICsgMV0pO1xuICAgICAgICAgICAgKF9iID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnB1c2goW2JiTGVmdEluZGV4LCBpICogNF0sIFxuICAgICAgICAgICAgLy8gW2kgKiA0LCAoaSArIDEpICogNF0sXG4gICAgICAgICAgICBbYmJMZWZ0SW5kZXggKyAxLCBpICogNCArIDFdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgICAgIC8vIHNpZGUgZmFjZXNcbiAgICAgICAgICAgIFtsZWZ0SW5kZXgsIGkgKiA0LCAoaSArIDEpICogNF0sIFtsZWZ0SW5kZXggKyAxLCAoaSArIDEpICogNCArIDEsIGkgKiA0ICsgMV0pO1xuICAgICAgICAgICAgLy8gc3RhaXJNZXNoLnNvZnRFZGdlcz8ucHVzaChcbiAgICAgICAgICAgIC8vICAgICBbaSAqIDQsIChpICsgMSkgKiA0XSxcbiAgICAgICAgICAgIC8vICAgICBbKGkgKyAxKSAqIDQgKyAxLCBpICogNCArIDFdLFxuICAgICAgICAgICAgLy8gKTtcbiAgICAgICAgICAgIGlmICh1cHdhcmQpIHtcbiAgICAgICAgICAgICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgKF9jID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnB1c2goW2xlZnRJbmRleCwgaSAqIDRdLCBbbGVmdEluZGV4ICsgMSwgaSAqIDQgKyAxXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzdGVwQ291bnQgPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIChfZCA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5wdXNoKFtsZWZ0SW5kZXgsIChpICsgMSkgKiA0XSwgW2xlZnRJbmRleCArIDEsIChpICsgMSkgKiA0ICsgMV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChzdGVwQ291bnQgPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIChfZSA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS5wdXNoKFtsZWZ0SW5kZXgsIGkgKiA0XSwgW2xlZnRJbmRleCArIDEsIGkgKiA0ICsgMV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaSA8IHN0ZXBDb3VudCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgKF9mID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9mLnB1c2goW2xlZnRJbmRleCwgKGkgKyAxKSAqIDRdLCBbbGVmdEluZGV4ICsgMSwgKGkgKyAxKSAqIDQgKyAxXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlmICh1cHdhcmQpIHtcbiAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAvLyBib3R0b20gZmFjZXNcbiAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIDEsIDBdLCBbdmVydGljZXMubGVuZ3RoIC0gMSwgMCwgdmVydGljZXMubGVuZ3RoIC0gMl0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAzLCB2ZXJ0aWNlcy5sZW5ndGggLSAxLCB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDIsIHZlcnRpY2VzLmxlbmd0aCAtIDRdKTtcbiAgICAgICAgKF9nID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2cgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9nLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIDBdLCBbdmVydGljZXMubGVuZ3RoIC0gMywgdmVydGljZXMubGVuZ3RoIC0gMl0pO1xuICAgICAgICBpZiAoc3RlcENvdW50ID4gMSkge1xuICAgICAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAgICAgLy8gc2lkZSBib3R0b20gZmFjZXNcbiAgICAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSAyLCB2ZXJ0aWNlcy5sZW5ndGggLSAxMCwgdmVydGljZXMubGVuZ3RoIC0gNF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCB2ZXJ0aWNlcy5sZW5ndGggLSAzLCB2ZXJ0aWNlcy5sZW5ndGggLSA5XSwgXG4gICAgICAgICAgICAvLyBib3R0b20gZmFjZXNcbiAgICAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSA1LCB2ZXJ0aWNlcy5sZW5ndGggLSAzLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDQsIHZlcnRpY2VzLmxlbmd0aCAtIDZdKTtcbiAgICAgICAgICAgIChfaCA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9oID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfaC5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSA1LCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIHZlcnRpY2VzLmxlbmd0aCAtIDEwXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDEwLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgLy8gYm90dG9tIGZhY2VzXG4gICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCAwLCAxXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDBdLCBbdmVydGljZXMubGVuZ3RoIC0gMywgdmVydGljZXMubGVuZ3RoIC0gMiwgdmVydGljZXMubGVuZ3RoIC0gMV0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAzLCB2ZXJ0aWNlcy5sZW5ndGggLSA0LCB2ZXJ0aWNlcy5sZW5ndGggLSAyXSk7XG4gICAgICAgIChfaiA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9qID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfai5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCAwXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDJdKTtcbiAgICAgICAgaWYgKHN0ZXBDb3VudCA+IDEpIHtcbiAgICAgICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgICAgIC8vIHNpZGUgYm90dG9tIGZhY2VzXG4gICAgICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gMiwgMCwgdmVydGljZXMubGVuZ3RoIC0gNF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCB2ZXJ0aWNlcy5sZW5ndGggLSAzLCAxXSwgXG4gICAgICAgICAgICAvLyBib3R0b20gZmFjZXNcbiAgICAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSA1LCB2ZXJ0aWNlcy5sZW5ndGggLSA0LCB2ZXJ0aWNlcy5sZW5ndGggLSAzXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDYsIHZlcnRpY2VzLmxlbmd0aCAtIDRdKTtcbiAgICAgICAgICAgIChfayA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9rID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfay5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSA1LCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDMsIDFdLCBbMCwgdmVydGljZXMubGVuZ3RoIC0gNF0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChjb3JuZXJWZXJ0aWNlcy5sZW5ndGggPT09IDYpIHtcbiAgICAgICAgZ2VuZXJhdGVQb2x5Z29uTWVzaChjb3JuZXJWZXJ0aWNlcywgc3RhaXJNZXNoKTtcbiAgICB9XG4gICAgc2VnbWVudC5tZXNoID0gc3RhaXJNZXNoO1xufVxuZnVuY3Rpb24gZ2VuZXJhdGVQbGF0Zm9ybU1lc2goc2VnbWVudCkge1xuICAgIGNvbnN0IHsgc3RhaXJTaGFwZTogeyB2ZXJ0aWNlcyB9IH0gPSBzZWdtZW50O1xuICAgIC8vIGlmIChlbmRMb2NrZWQpIHtcbiAgICBjb25zdCB2ZXJ0ZXhMZW5ndGggPSB2ZXJ0aWNlcy5sZW5ndGggLyAyO1xuICAgIGlmICh2ZXJ0ZXhMZW5ndGggPT09IDQgfHwgdmVydGV4TGVuZ3RoID09PSA1KSB7XG4gICAgICAgIGNvbnN0IHBsYXRmb3JtTWVzaCA9IHtcbiAgICAgICAgICAgIHZlcnRpY2VzOiBbXSxcbiAgICAgICAgICAgIHRyaWFuZ2xlSW5kaWNlczogW10sXG4gICAgICAgICAgICBzb2Z0RWRnZXM6IFtdLFxuICAgICAgICB9O1xuICAgICAgICBnZW5lcmF0ZVBvbHlnb25NZXNoKHZlcnRpY2VzLCBwbGF0Zm9ybU1lc2gpO1xuICAgICAgICBzZWdtZW50Lm1lc2ggPSBwbGF0Zm9ybU1lc2g7XG4gICAgfVxuICAgIC8vIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuZnVuY3Rpb24gZ2VuZXJhdGVQb2x5Z29uTWVzaCh2ZXJ0aWNlcywgbWVzaCkge1xuICAgIHZhciBfYSwgX2I7XG4gICAgY29uc3QgdmVydGV4TGVuZ3RoID0gbWVzaC52ZXJ0aWNlcy5sZW5ndGg7XG4gICAgbWVzaC52ZXJ0aWNlcy5wdXNoKC4uLnZlcnRpY2VzLm1hcCh2ZXJ0ZXggPT4gW3ZlcnRleC54LCB2ZXJ0ZXgueSwgdmVydGV4LnpdKSk7XG4gICAgY29uc3Qgc2VnQ291bnQgPSB2ZXJ0aWNlcy5sZW5ndGggLyAyO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VnQ291bnQ7IGkrKykge1xuICAgICAgICBjb25zdCByaWdodCA9IGkgPT09IHNlZ0NvdW50IC0gMSA/IDAgOiBpICsgMTtcbiAgICAgICAgY29uc3QgYm90dG9tUmlnaHQgPSBpID09PSBzZWdDb3VudCAtIDEgPyBzZWdDb3VudCA6IGkgKyBzZWdDb3VudCArIDE7XG4gICAgICAgIG1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goW2kgKyB2ZXJ0ZXhMZW5ndGgsIGkgKyBzZWdDb3VudCArIHZlcnRleExlbmd0aCwgYm90dG9tUmlnaHQgKyB2ZXJ0ZXhMZW5ndGhdLCBbaSArIHZlcnRleExlbmd0aCwgYm90dG9tUmlnaHQgKyB2ZXJ0ZXhMZW5ndGgsIHJpZ2h0ICsgdmVydGV4TGVuZ3RoXSk7XG4gICAgICAgIChfYSA9IG1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucHVzaChbaSArIHZlcnRleExlbmd0aCwgYm90dG9tUmlnaHQgKyB2ZXJ0ZXhMZW5ndGhdKTtcbiAgICAgICAgaWYgKGkgPiAwICYmIGkgPCBzZWdDb3VudCAtIDEpIHtcbiAgICAgICAgICAgIG1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXG4gICAgICAgICAgICAvLyB0b3AgYW5kIGJvdHRvbVxuICAgICAgICAgICAgW2kgKyB2ZXJ0ZXhMZW5ndGgsIHJpZ2h0ICsgdmVydGV4TGVuZ3RoLCAwICsgdmVydGV4TGVuZ3RoXSwgW2JvdHRvbVJpZ2h0ICsgdmVydGV4TGVuZ3RoLCBpICsgc2VnQ291bnQgKyB2ZXJ0ZXhMZW5ndGgsIHNlZ0NvdW50ICsgdmVydGV4TGVuZ3RoXSk7XG4gICAgICAgICAgICBpZiAoaSA+IDEpIHtcbiAgICAgICAgICAgICAgICAoX2IgPSBtZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnB1c2goW2ksIDAgKyB2ZXJ0ZXhMZW5ndGhdLCBbaSArIHNlZ0NvdW50ICsgdmVydGV4TGVuZ3RoLCBzZWdDb3VudCArIHZlcnRleExlbmd0aF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkQ29tcG9uZW50SW5zdGFuY2Uoc2VnbWVudCwgc2VnbWVudHMpIHtcbiAgICB2YXIgX2EsIF9iO1xuICAgIGNvbnN0IHsgc3RhcnQsIGVuZCwgc3RhcnRIZWlnaHQsIGVuZEhlaWdodCwgYmFzZUNvbXBvbmVudCwgY2lyY2xlVGFuZ2VudCwgcGFyYW0sIG1lc2ggfSA9IHNlZ21lbnQ7XG4gICAgY29uc3QgZGVzaWduID0gYXBwLmdldEFjdGl2ZURlc2lnbigpO1xuICAgIGxldCBvcGVyYXRpb25TdWNjZXNzID0gdHJ1ZTtcbiAgICBpZiAobWVzaCA9PT0gbnVsbCB8fCBtZXNoID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtZXNoLnZlcnRpY2VzLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBuZXdTaGVsbCA9IChfYSA9IGRlc2lnbi5jcmVhdGVTaGVsbEZyb21NZXNoKG1lc2gpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubmV3U2hlbGw7XG4gICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICEhbmV3U2hlbGw7XG4gICAgICAgIGlmIChuZXdTaGVsbCkge1xuICAgICAgICAgICAgLy8gaWYgKHBhcmFtLnR5cGUgIT09IENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpcikge1xuICAgICAgICAgICAgLy8gICAgIGNvbnN0IHNvZnRFZGdlcyA9IG5ld1NoZWxsLmdldEVkZ2VzKCkuZmlsdGVyKGUgPT4gZS5pc1NvZnQoKSk7XG4gICAgICAgICAgICAvLyAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZGVzaWduLnJlbW92ZUVkZ2VzKHNvZnRFZGdlcykuaXNTdWNjZXNzO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgY29uc3QgbmV3SW5zdGFuY2UgPSAoX2IgPSBkZXNpZ24ubWFrZUdyb3VwKG5ld1NoZWxsLmdldEZhY2VzKCksIFtdLCBbXSkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5hZGRlZEluc3RhbmNlO1xuICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgISFuZXdJbnN0YW5jZTtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwRGVmID0gbmV3SW5zdGFuY2UgPT09IG51bGwgfHwgbmV3SW5zdGFuY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG5ld0luc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpO1xuICAgICAgICAgICAgaWYgKG5ld0luc3RhbmNlICYmIGdyb3VwRGVmKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWxPYmplY3QgPSBwYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtID8gUHJlc2V0TWF0ZXJpYWxzLlBsYXRmb3JtIDogUHJlc2V0TWF0ZXJpYWxzLlN0YWlyO1xuICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGRlc2lnbi5hc3NpZ25NYXRlcmlhbEZvckVudGl0aWVzKFtuZXdJbnN0YW5jZV0sIG1hdGVyaWFsT2JqZWN0Lm1hdGVyaWFsSWQsIG1hdGVyaWFsT2JqZWN0LmJnSWQpO1xuICAgICAgICAgICAgICAgIC8vIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGdyb3VwRGVmLnNldEN1c3RvbVByb3BlcnR5KENvbXBvbmVudEluZGV4S2V5LCBgJHtuZXdJbnN0YW5jZXMubGVuZ3RofWApLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAvLyBuZXdJbnN0YW5jZXMucHVzaChuZXdJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFyYW1TdHJpbmcgPSBzdHJpbmdpZnlDb21wb25lbnRQYXJhbShwYXJhbSk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRFbmRTdHJpbmcgPSBzdHJpbmdpZnlTdGFydEVuZChHZW9tTGliLmNyZWF0ZVBvaW50M2Qoc3RhcnQueCwgc3RhcnQueSwgc3RhcnRIZWlnaHQpLCBHZW9tTGliLmNyZWF0ZVBvaW50M2QoZW5kLngsIGVuZC55LCBlbmRIZWlnaHQpKTtcbiAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBncm91cERlZi5zZXRDdXN0b21Qcm9wZXJ0eShDb21wb25lbnRQYXJhbUtleSwgcGFyYW1TdHJpbmcpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBncm91cERlZi5zZXRDdXN0b21Qcm9wZXJ0eShTdGFydEVuZEtleSwgc3RhcnRFbmRTdHJpbmcpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAvLyBpZiAoYmFzZUxpbmVTZWczZCkge1xuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICBpZiAoYmFzZUNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBCYXNlTGluZVN0cmluZyA9IHN0cmluZ2lmeVN0YXJ0RW5kKGJhc2VDb21wb25lbnQubGluZTNkLnN0YXJ0LCBiYXNlQ29tcG9uZW50LmxpbmUzZC5lbmQpO1xuICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBncm91cERlZi5zZXRDdXN0b21Qcm9wZXJ0eShCYXNlTGluZVNlZzNkS2V5LCBCYXNlTGluZVN0cmluZykuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBiYXNlU2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHNlZ21lbnRzLCBiYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJhc2VTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiYXNlQ29tcG9uZW50U3RyaW5nID0gc3RyaW5naWZ5QmFzZUNvbXBvbmVudChiYXNlU2VnbWVudCwgYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBncm91cERlZi5zZXRDdXN0b21Qcm9wZXJ0eShCYXNlQ29tcG9uZW50S2V5LCBiYXNlQ29tcG9uZW50U3RyaW5nKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNpcmNsZVRhbmdlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFuZ2VudFN0cmluZyA9IHN0cmluZ2lmeVBvaW50M2QoY2lyY2xlVGFuZ2VudCk7XG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGdyb3VwRGVmLnNldEN1c3RvbVByb3BlcnR5KENpcmNsZVRhbmdlbnRLZXksIHRhbmdlbnRTdHJpbmcpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld0luc3RhbmNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG5leHBvcnQgZnVuY3Rpb24gYnVpbGRIYW5kcmFpbEluc3RhbmNlKHN0YWlyUGFyYW0sIGhhbmRyYWlscykge1xuICAgIHZhciBfYSwgX2IsIF9jO1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IHsgaGFuZHJhaWw6IHsgc3VwcG9ydCwgaGVpZ2h0LCByYWlsOiB7IHR5cGU6IHJhaWxUeXBlLCBwYXJhbTogcmFpbFBhcmFtIH0sIGNvbHVtbjogeyB0eXBlOiBjb2x1bW5UeXBlLCBwYXJhbTogY29sdW1uUGFyYW0gfSB9IH0gPSBzdGFpclBhcmFtO1xuICAgICAgICBpZiAoIXN1cHBvcnQpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjb2x1bW5GYWNlO1xuICAgICAgICBpZiAoY29sdW1uVHlwZSA9PT0gQ29sdW1uVHlwZS5DaXJjbGUpIHtcbiAgICAgICAgICAgIGNvbHVtbkZhY2UgPSBkcmF3Q2lyY2xlKGR1bW15UG9pbnQzZCwgRGlyZWN0aW9uWiwgY29sdW1uUGFyYW0ucmFkaXVzIHx8IERlZmF1bHRTdGFpclBhcmFtLmhvcml6b250YWxTdGVwIC8gMTApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvbHVtblR5cGUgPT09IENvbHVtblR5cGUuUmVjdCkge1xuICAgICAgICAgICAgY29sdW1uRmFjZSA9IGRyYXdSZWN0KGR1bW15UG9pbnQzZCwgRGlyZWN0aW9uWiwgY29sdW1uUGFyYW0ud2lkdGggfHwgRGVmYXVsdFN0YWlyUGFyYW0uaG9yaXpvbnRhbFN0ZXAgLyAxMCwgY29sdW1uUGFyYW0uaGVpZ2h0IHx8IERlZmF1bHRTdGFpclBhcmFtLmhvcml6b250YWxTdGVwIC8gMTApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29sdW1uTG9vcCA9IGNvbHVtbkZhY2UgPT09IG51bGwgfHwgY29sdW1uRmFjZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29sdW1uRmFjZS5nZXRPdXRlckxvb3AoKTtcbiAgICAgICAgaWYgKCFjb2x1bW5GYWNlIHx8ICFjb2x1bW5Mb29wKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFjdGl2ZURlc2lnbiA9IGFwcC5nZXRBY3RpdmVEZXNpZ24oKTtcbiAgICAgICAgY29uc3QgaGFuZHJhaWxJbnN0YW5jZSA9IChfYSA9IGFjdGl2ZURlc2lnbi5tYWtlR3JvdXAoW2NvbHVtbkZhY2VdLCBbXSwgW10pKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYWRkZWRJbnN0YW5jZTtcbiAgICAgICAgY29uc3QgaGFuZHJhaWxEZWZpbml0aW9uID0gaGFuZHJhaWxJbnN0YW5jZSA9PT0gbnVsbCB8fCBoYW5kcmFpbEluc3RhbmNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBoYW5kcmFpbEluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpO1xuICAgICAgICBpZiAoIWhhbmRyYWlsSW5zdGFuY2UgfHwgIWhhbmRyYWlsRGVmaW5pdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhY3RpdmF0ZUluc3RhbmNlUmVzID0geWllbGQgYWN0aXZlRGVzaWduLmFjdGl2YXRlR3JvdXBJbnN0YW5jZShoYW5kcmFpbEluc3RhbmNlKTtcbiAgICAgICAgaWYgKCFhY3RpdmF0ZUluc3RhbmNlUmVzLmlzU3VjY2Vzcykge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb2x1bW5BdXhpbGlhcnlCb3VuZGVkQ3VydmUgPSAoX2IgPSBhY3RpdmVEZXNpZ24uYWRkQXV4aWxpYXJ5Qm91bmRlZEN1cnZlKEdlb21MaWIuY3JlYXRlTGluZVNlZ21lbnQzZChHZW9tTGliLmNyZWF0ZVBvaW50M2QoMCwgMCwgaGVpZ2h0KSwgZHVtbXlQb2ludDNkKSkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5hZGRlZEN1cnZlO1xuICAgICAgICBpZiAoIWNvbHVtbkF1eGlsaWFyeUJvdW5kZWRDdXJ2ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzd2VlcENvbHVtblJlcyA9IGFjdGl2ZURlc2lnbi5zd2VlcEZvbGxvd0N1cnZlcyhjb2x1bW5Mb29wLCBbY29sdW1uQXV4aWxpYXJ5Qm91bmRlZEN1cnZlXSk7XG4gICAgICAgIGlmICghc3dlZXBDb2x1bW5SZXMuaXNTdWNjZXNzIHx8ICFzd2VlcENvbHVtblJlcy5hZGRlZFNoZWxscy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29sdW1uT3JpZ2luRmFjZXMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBjb2x1bW5PcmlnaW5TaGVsbCBvZiBzd2VlcENvbHVtblJlcy5hZGRlZFNoZWxscykge1xuICAgICAgICAgICAgY29uc3QgY29sdW1uRmFjZXMgPSBjb2x1bW5PcmlnaW5TaGVsbC5nZXRGYWNlcygpO1xuICAgICAgICAgICAgY29sdW1uT3JpZ2luRmFjZXMucHVzaCguLi5jb2x1bW5GYWNlcyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29sdW1uT3JpZ2luSW5zdGFuY2UgPSAoX2MgPSBhY3RpdmVEZXNpZ24ubWFrZUdyb3VwKGNvbHVtbk9yaWdpbkZhY2VzLCBbXSwgW10pKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuYWRkZWRJbnN0YW5jZTtcbiAgICAgICAgaWYgKCFjb2x1bW5PcmlnaW5JbnN0YW5jZSkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb2x1bW5NYXRyaXhlcyA9IFtdO1xuICAgICAgICBjb25zdCByYWlsSW5zdGFuY2VzID0gW107XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgaGFuZHJhaWxzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCB7IHJhaWwsIGNvbHVtbnMgfSA9IGhhbmRyYWlsc1tqXTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIC8vIGZvciAoY29uc3QgeyByYWlsLCBjb2x1bW5zIH0gb2YgaGFuZHJhaWxzKSB7XG4gICAgICAgICAgICBjb25zdCByYWlsQm91bmRlZEN1cnZlcyA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByYWlsLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhaWxQb2ludCA9IHJhaWxbaV07XG4gICAgICAgICAgICAgICAgY29uc3QgcmFpbE5leHRQb2ludCA9IHJhaWxbaSArIDFdO1xuICAgICAgICAgICAgICAgIHJhaWxCb3VuZGVkQ3VydmVzLnB1c2goKTtcbiAgICAgICAgICAgICAgICBjb25zdCBhZGRBdXhSZXMgPSBhY3RpdmVEZXNpZ24uYWRkQXV4aWxpYXJ5Qm91bmRlZEN1cnZlKEdlb21MaWIuY3JlYXRlTGluZVNlZ21lbnQzZChyYWlsUG9pbnQsIHJhaWxOZXh0UG9pbnQpKTtcbiAgICAgICAgICAgICAgICBpZiAoYWRkQXV4UmVzID09PSBudWxsIHx8IGFkZEF1eFJlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogYWRkQXV4UmVzLmFkZGVkQ3VydmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmFpbEJvdW5kZWRDdXJ2ZXMucHVzaChhZGRBdXhSZXMuYWRkZWRDdXJ2ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyYWlsQm91bmRlZEN1cnZlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByYWlsU3RhcnRDdXJ2ZSA9IHJhaWxCb3VuZGVkQ3VydmVzWzBdLmdldEJvdW5kZWRDdXJ2ZSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhaWxTdGFydFBvaW50ID0gKHJhaWxTdGFydEN1cnZlID09PSBudWxsIHx8IHJhaWxTdGFydEN1cnZlID09PSB2b2lkIDAgPyB2b2lkIDAgOiByYWlsU3RhcnRDdXJ2ZS5zdGFydFBvaW50KSB8fCBkdW1teVBvaW50M2Q7XG4gICAgICAgICAgICAgICAgY29uc3QgcmFpbFN0YXJ0RGlyID0gKHJhaWxTdGFydEN1cnZlID09PSBudWxsIHx8IHJhaWxTdGFydEN1cnZlID09PSB2b2lkIDAgPyB2b2lkIDAgOiByYWlsU3RhcnRDdXJ2ZS5lbmRQb2ludC5zdWJ0cmFjdGVkKHJhaWxTdGFydFBvaW50KSkgfHwgRGlyZWN0aW9uWjtcbiAgICAgICAgICAgICAgICBsZXQgcmFpbEZhY2U7XG4gICAgICAgICAgICAgICAgaWYgKHJhaWxUeXBlID09PSBSYWlsVHlwZS5DaXJjbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmFpbEZhY2UgPSBkcmF3Q2lyY2xlKHJhaWxTdGFydFBvaW50LCByYWlsU3RhcnREaXIsIHJhaWxQYXJhbS5yYWRpdXMgfHwgRGVmYXVsdFN0YWlyUGFyYW0uaG9yaXpvbnRhbFN0ZXAgLyA1KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocmFpbFR5cGUgPT09IFJhaWxUeXBlLlJlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgcmFpbEZhY2UgPSBkcmF3UmVjdChyYWlsU3RhcnRQb2ludCwgcmFpbFN0YXJ0RGlyLCByYWlsUGFyYW0ud2lkdGggfHwgRGVmYXVsdFN0YWlyUGFyYW0uaG9yaXpvbnRhbFN0ZXAgLyA1LCByYWlsUGFyYW0uaGVpZ2h0IHx8IERlZmF1bHRTdGFpclBhcmFtLmhvcml6b250YWxTdGVwIC8gNSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcmFpbExvb3AgPSByYWlsRmFjZSA9PT0gbnVsbCB8fCByYWlsRmFjZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmFpbEZhY2UuZ2V0T3V0ZXJMb29wKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFyYWlsRmFjZSB8fCAhcmFpbExvb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3Qgc3dlZXBSYWlsUmVzID0gYWN0aXZlRGVzaWduLnN3ZWVwRm9sbG93Q3VydmVzKHJhaWxMb29wLCByYWlsQm91bmRlZEN1cnZlcyk7XG4gICAgICAgICAgICAgICAgaWYgKCFzd2VlcFJhaWxSZXMuaXNTdWNjZXNzIHx8ICFzd2VlcFJhaWxSZXMuYWRkZWRTaGVsbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHJhaWxGYWNlcyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcmFpbFNoZWxsIG9mIHN3ZWVwUmFpbFJlcy5hZGRlZFNoZWxscykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByYWlsU2hlbGxGYWNlcyA9IHJhaWxTaGVsbC5nZXRGYWNlcygpO1xuICAgICAgICAgICAgICAgICAgICByYWlsRmFjZXMucHVzaCguLi5yYWlsU2hlbGxGYWNlcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHJhaWxNYWtlR3JvdXBSZXMgPSBhY3RpdmVEZXNpZ24ubWFrZUdyb3VwKHJhaWxGYWNlcywgW10sIHJhaWxCb3VuZGVkQ3VydmVzKTtcbiAgICAgICAgICAgICAgICBjb25zdCByYWlsR3JvdXBEZWYgPSByYWlsTWFrZUdyb3VwUmVzID09PSBudWxsIHx8IHJhaWxNYWtlR3JvdXBSZXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJhaWxNYWtlR3JvdXBSZXMuYWRkZWRJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAoIShyYWlsTWFrZUdyb3VwUmVzID09PSBudWxsIHx8IHJhaWxNYWtlR3JvdXBSZXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJhaWxNYWtlR3JvdXBSZXMuYWRkZWRJbnN0YW5jZSkgfHwgIXJhaWxHcm91cERlZikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCByYWlsUHJvcGVydHlSZXMgPSByYWlsR3JvdXBEZWYuc2V0Q3VzdG9tUHJvcGVydHkoUmFpbE1vZGVsS2V5LCBNb2RlbFZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAoIXJhaWxQcm9wZXJ0eVJlcy5pc1N1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmFpbEluc3RhbmNlcy5wdXNoKHJhaWxNYWtlR3JvdXBSZXMuYWRkZWRJbnN0YW5jZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNvbHVtbiBvZiBjb2x1bW5zKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sdW1uU2NhbGVNYXQgPSBHZW9tTGliLmNyZWF0ZVNjYWxlTWF0cml4NCgxLCAxLCAoY29sdW1uWzFdLnogLSBjb2x1bW5bMF0ueikgLyBoZWlnaHQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbHVtblRyYW5zbGF0ZU1hdCA9IEdlb21MaWIuY3JlYXRlVHJhbnNsYXRpb25NYXRyaXg0KGNvbHVtblswXS54LCBjb2x1bW5bMF0ueSwgY29sdW1uWzBdLnopO1xuICAgICAgICAgICAgICAgIGNvbHVtbk1hdHJpeGVzLnB1c2goY29sdW1uVHJhbnNsYXRlTWF0Lm11bHRpcGxpZWQoY29sdW1uU2NhbGVNYXQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocmFpbEluc3RhbmNlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGFzc2lnblJhaWxNYXRlcmlhbFJlcyA9IGFjdGl2ZURlc2lnbi5hc3NpZ25NYXRlcmlhbEZvckVudGl0aWVzKHJhaWxJbnN0YW5jZXMsIFByZXNldE1hdGVyaWFscy5IYW5kcmFpbC5yYWlsLm1hdGVyaWFsSWQsIFByZXNldE1hdGVyaWFscy5IYW5kcmFpbC5yYWlsLmJnSWQpO1xuICAgICAgICAgICAgaWYgKCFhc3NpZ25SYWlsTWF0ZXJpYWxSZXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbHVtbkluc3RhbmNlcyA9IFtdO1xuICAgICAgICBpZiAoY29sdW1uTWF0cml4ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBjb2x1bW5Db3B5UmVzID0gYWN0aXZlRGVzaWduLmJ1bGtDb3B5R3JvdXBJbnN0YW5jZXMoW2NvbHVtbk9yaWdpbkluc3RhbmNlXSwgW2NvbHVtbk1hdHJpeGVzXSk7XG4gICAgICAgICAgICBpZiAoIShjb2x1bW5Db3B5UmVzID09PSBudWxsIHx8IGNvbHVtbkNvcHlSZXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbHVtbkNvcHlSZXMuYWRkZWRJbnN0YW5jZXMubGVuZ3RoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb2x1bW5JbnN0YW5jZXMucHVzaCguLi5jb2x1bW5Db3B5UmVzLmFkZGVkSW5zdGFuY2VzKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgY29sdW1uSW5zdGFuY2Ugb2YgY29sdW1uQ29weVJlcy5hZGRlZEluc3RhbmNlcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbHVtbkdyb3VwRGVmID0gY29sdW1uSW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFjb2x1bW5Hcm91cERlZikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBjb2x1bW5Qcm9wZXJ0eVJlcyA9IGNvbHVtbkdyb3VwRGVmLnNldEN1c3RvbVByb3BlcnR5KENvbHVtbk1vZGVsS2V5LCBNb2RlbFZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAoIWNvbHVtblByb3BlcnR5UmVzLmlzU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGFzc2lnbkNvbHVtbk1hdGVyaWFsUmVzID0gYWN0aXZlRGVzaWduLmFzc2lnbk1hdGVyaWFsRm9yRW50aXRpZXMoY29sdW1uQ29weVJlcy5hZGRlZEluc3RhbmNlcywgUHJlc2V0TWF0ZXJpYWxzLkhhbmRyYWlsLmNvbHVtbi5tYXRlcmlhbElkLCBQcmVzZXRNYXRlcmlhbHMuSGFuZHJhaWwuY29sdW1uLmJnSWQpO1xuICAgICAgICAgICAgaWYgKCFhc3NpZ25Db2x1bW5NYXRlcmlhbFJlcykge1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVtb3ZlT3JpZ2luQ29sdW1uUmVzID0gYWN0aXZlRGVzaWduLnJlbW92ZUdyb3VwSW5zdGFuY2UoY29sdW1uT3JpZ2luSW5zdGFuY2UpO1xuICAgICAgICBpZiAoIXJlbW92ZU9yaWdpbkNvbHVtblJlcy5pc1N1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVtb3ZlT3JpZ2luQ29sdW1uQXV4Q3VydmVSZXMgPSBhY3RpdmVEZXNpZ24ucmVtb3ZlQXV4aWxpYXJ5Q3VydmUoY29sdW1uQXV4aWxpYXJ5Qm91bmRlZEN1cnZlKTtcbiAgICAgICAgaWYgKCFyZW1vdmVPcmlnaW5Db2x1bW5BdXhDdXJ2ZVJlcy5pc1N1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdG8gcmVtb3ZlIGFsbCBhdXhpbGlhcnlDdXJ2ZXNcbiAgICAgICAgY29uc3QgZGVhY3RpdmF0ZUluc3RhbmNlUmVzID0geWllbGQgYWN0aXZlRGVzaWduLmRlYWN0aXZhdGVHcm91cEluc3RhbmNlKCk7XG4gICAgICAgIGlmICghZGVhY3RpdmF0ZUluc3RhbmNlUmVzLmlzU3VjY2Vzcykge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZXRQcm9wZXJ0eVJlcyA9IGhhbmRyYWlsRGVmaW5pdGlvbi5zZXRDdXN0b21Qcm9wZXJ0eShIYW5kcmFpbE1vZGVsS2V5LCBNb2RlbFZhbHVlKTtcbiAgICAgICAgaWYgKCFzZXRQcm9wZXJ0eVJlcy5pc1N1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhhbmRyYWlsSW5zdGFuY2U6IHsgaW5zdGFuY2U6IGhhbmRyYWlsSW5zdGFuY2UsIGluc3RhbmNlS2V5OiBoYW5kcmFpbEluc3RhbmNlLmdldEtleSgpLCBkZWZpbml0aW9uS2V5OiBoYW5kcmFpbERlZmluaXRpb24uZ2V0S2V5KCkgfSxcbiAgICAgICAgICAgIHJhaWxJbnN0YW5jZXM6IHJhaWxJbnN0YW5jZXMubWFwKGluc3RhbmNlID0+IHsgdmFyIF9hOyByZXR1cm4gKHsgaW5zdGFuY2UsIGluc3RhbmNlS2V5OiBpbnN0YW5jZS5nZXRLZXkoKSwgZGVmaW5pdGlvbktleTogKChfYSA9IGluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZ2V0S2V5KCkpIHx8ICcnIH0pOyB9KSxcbiAgICAgICAgICAgIGNvbHVtbkluc3RhbmNlczogY29sdW1uSW5zdGFuY2VzLm1hcChpbnN0YW5jZSA9PiB7IHZhciBfYTsgcmV0dXJuICh7IGluc3RhbmNlLCBpbnN0YW5jZUtleTogaW5zdGFuY2UuZ2V0S2V5KCksIGRlZmluaXRpb25LZXk6ICgoX2EgPSBpbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmdldEtleSgpKSB8fCAnJyB9KTsgfSksXG4gICAgICAgIH07XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZHJhd0NpcmNsZShjZW50ZXIsIG5vcm1hbCwgcmFkaXVzKSB7XG4gICAgY29uc3QgYWN0aXZlRGVzaWduID0gYXBwLmdldEFjdGl2ZURlc2lnbigpO1xuICAgIGNvbnN0IHJlcyA9IGFjdGl2ZURlc2lnbi5hZGRDaXJjbGUoR2VvbUxpYi5jcmVhdGVDaXJjbGUzZEJ5Q2VudGVyTm9ybWFsUmFkaXVzKGNlbnRlciwgbm9ybWFsLCByYWRpdXMpKTtcbiAgICBpZiAocmVzID09PSBudWxsIHx8IHJlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVzLmFkZGVkRWRnZXMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IHNoZWxsID0gcmVzLmFkZGVkRWRnZXNbMF0uZ2V0U2hlbGwoKTtcbiAgICAgICAgY29uc3QgZmFjZXMgPSBzaGVsbCA9PT0gbnVsbCB8fCBzaGVsbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2hlbGwuZ2V0RmFjZXMoKTtcbiAgICAgICAgaWYgKChmYWNlcyA9PT0gbnVsbCB8fCBmYWNlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogZmFjZXMubGVuZ3RoKSA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhY2VzWzBdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG5leHBvcnQgZnVuY3Rpb24gZHJhd1JlY3QoY2VudGVyLCBub3JtYWwsIHdpZHRoLCBoZWlnaHQsIHogPSAwLCB3aXRoQ29ybmVyID0gdHJ1ZSkge1xuICAgIGNvbnN0IHBvaW50MSA9IEdlb21MaWIuY3JlYXRlUG9pbnQzZCgwLCAwLCB6KTtcbiAgICBjb25zdCBwb2ludDIgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2Qod2lkdGgsIDAsIHopO1xuICAgIGxldCBwb2ludHMgPSBbcG9pbnQxLCBwb2ludDJdO1xuICAgIGlmICh3aXRoQ29ybmVyKSB7XG4gICAgICAgIGNvbnN0IHA1ID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKHdpZHRoLCBoZWlnaHQgLyAzICogMiwgeik7XG4gICAgICAgIGNvbnN0IHA2ID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKHdpZHRoIC8gNCAqIDMsIGhlaWdodCwgeik7XG4gICAgICAgIGNvbnN0IG0xID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKChwNS54ICsgcDYueCkgLyAyLCAocDUueSArIHA2LnkpIC8gMiwgeik7XG4gICAgICAgIGNvbnN0IGRpcjEgPSBwNi5zdWJ0cmFjdGVkKHA1KS5ub3JtYWxpemVkKCk7XG4gICAgICAgIGNvbnN0IHRvQ2VudGVyRGlyMSA9IERpcmVjdGlvblouY3Jvc3MoZGlyMSk7XG4gICAgICAgIGNvbnN0IGQxID0gcDUuZGlzdGFuY2VUbyhwNik7XG4gICAgICAgIC8vIGNvbnN0IHIxID0gZDEgLyAyIC8gTWF0aC5zaW4oTWF0aC5QSSAvIDYpO1xuICAgICAgICBjb25zdCBoMSA9IGQxIC8gMiAvIE1hdGgudGFuKE1hdGguUEkgLyA2KTtcbiAgICAgICAgY29uc3QgY2VudGVyMSA9IG0xLmFkZGVkKHRvQ2VudGVyRGlyMS5tdWx0aXBsaWVkKGgxKSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTE7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgcm90YXRlTWF0ID0gR2VvbUxpYi5jcmVhdGVSb3RhdGVNYXRyaXg0KGkgKiBNYXRoLlBJIC8gMzAsIERpcmVjdGlvblosIGNlbnRlcjEpO1xuICAgICAgICAgICAgY29uc3QgZGlzY3JldGVQb2ludCA9IHA1LmFwcGxpZWRNYXRyaXg0KHJvdGF0ZU1hdCk7XG4gICAgICAgICAgICBwb2ludHMucHVzaChkaXNjcmV0ZVBvaW50KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwNyA9IEdlb21MaWIuY3JlYXRlUG9pbnQzZCh3aWR0aCAvIDQsIGhlaWdodCwgeik7XG4gICAgICAgIGNvbnN0IHA4ID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKDAsIGhlaWdodCAvIDMgKiAyLCB6KTtcbiAgICAgICAgY29uc3QgbTIgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QoKHA1LnggKyBwNi54KSAvIDIsIChwNS55ICsgcDYueSkgLyAyLCB6KTtcbiAgICAgICAgY29uc3QgZGlyMiA9IHA4LnN1YnRyYWN0ZWQocDcpLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgY29uc3QgdG9DZW50ZXJEaXIyID0gRGlyZWN0aW9uWi5jcm9zcyhkaXIyKTtcbiAgICAgICAgY29uc3QgZDIgPSBwNy5kaXN0YW5jZVRvKHA4KTtcbiAgICAgICAgLy8gY29uc3QgcjIgPSBkMiAvIDIgLyBNYXRoLnNpbihNYXRoLlBJIC8gNik7XG4gICAgICAgIGNvbnN0IGgyID0gZDIgLyAyIC8gTWF0aC50YW4oTWF0aC5QSSAvIDYpO1xuICAgICAgICBjb25zdCBjZW50ZXIyID0gbTIuYWRkZWQodG9DZW50ZXJEaXIyLm11bHRpcGxpZWQoaDIpKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCByb3RhdGVNYXQgPSBHZW9tTGliLmNyZWF0ZVJvdGF0ZU1hdHJpeDQoaSAqIE1hdGguUEkgLyAzMCwgRGlyZWN0aW9uWiwgY2VudGVyMik7XG4gICAgICAgICAgICBjb25zdCBkaXNjcmV0ZVBvaW50ID0gcDcuYXBwbGllZE1hdHJpeDQocm90YXRlTWF0KTtcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKGRpc2NyZXRlUG9pbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBwb2ludDMgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2Qod2lkdGgsIGhlaWdodCwgeik7XG4gICAgICAgIGNvbnN0IHBvaW50NCA9IEdlb21MaWIuY3JlYXRlUG9pbnQzZCgwLCBoZWlnaHQsIHopO1xuICAgICAgICBwb2ludHMucHVzaChwb2ludDMsIHBvaW50NCk7XG4gICAgfVxuICAgIGNvbnN0IGNvb3JkaW5hdGUgPSBnZXRDb29yZGluYXRlKG5vcm1hbCk7XG4gICAgY29uc3QgY29vcmRpbmF0ZU1hdCA9IEdlb21MaWIuY3JlYXRlQWxpZ25DQ1NNYXRyaXg0KGNvb3JkaW5hdGUuZHgsIGNvb3JkaW5hdGUuZHksIGNvb3JkaW5hdGUuZHosIGNlbnRlcik7XG4gICAgY29uc3QgdHJhbnNsYXRlTWF0MSA9IEdlb21MaWIuY3JlYXRlVHJhbnNsYXRpb25NYXRyaXg0KC13aWR0aCAvIDIsIC1oZWlnaHQgLyAyLCAwKTtcbiAgICAvLyBjb25zdCB0cmFuc2xhdGVNYXQyID0gR2VvbUxpYi5jcmVhdGVUcmFuc2xhdGlvbk1hdHJpeDQoY2VudGVyLngsIGNlbnRlci55LCBjZW50ZXIueik7XG4gICAgY29uc3QgdHJhbnNmb3JtTWF0ID0gY29vcmRpbmF0ZU1hdC5tdWx0aXBsaWVkKHRyYW5zbGF0ZU1hdDEpO1xuICAgIHBvaW50cyA9IHBvaW50cy5tYXAocCA9PiBwLmFwcGxpZWRNYXRyaXg0KHRyYW5zZm9ybU1hdCkpO1xuICAgIGNvbnN0IGFjdGl2ZURlc2lnbiA9IGFwcC5nZXRBY3RpdmVEZXNpZ24oKTtcbiAgICBjb25zdCByZXMgPSBhY3RpdmVEZXNpZ24uYWRkRWRnZXMocG9pbnRzKTtcbiAgICBpZiAocmVzID09PSBudWxsIHx8IHJlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVzLmFkZGVkRWRnZXMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IHNldFNvZnRSZXN1bHQgPSBhY3RpdmVEZXNpZ24uc2V0RWRnZXNTb2Z0KHJlcy5hZGRlZEVkZ2VzLCB0cnVlKTtcbiAgICAgICAgaWYgKHNldFNvZnRSZXN1bHQuaXNTdWNjZXNzKSB7XG4gICAgICAgICAgICBjb25zdCBzaGVsbCA9IHJlcy5hZGRlZEVkZ2VzWzBdLmdldFNoZWxsKCk7XG4gICAgICAgICAgICBjb25zdCBmYWNlcyA9IHNoZWxsID09PSBudWxsIHx8IHNoZWxsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzaGVsbC5nZXRGYWNlcygpO1xuICAgICAgICAgICAgaWYgKChmYWNlcyA9PT0gbnVsbCB8fCBmYWNlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogZmFjZXMubGVuZ3RoKSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWNlc1swXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldFNlZ21lbnRCeUluZGV4KHNlZ21lbnRzLCBpbmRleCkge1xuICAgIGlmIChpbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiBzZWdtZW50cy5maW5kKHNlZ21lbnQgPT4gc2VnbWVudC5wYXJhbS5pbmRleCA9PT0gaW5kZXgpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkU2VnbWVudFJlbGF0aW9ucyhzZWdtZW50cykge1xuICAgIGZvciAoY29uc3Qgc2VnbWVudCBvZiBzZWdtZW50cykge1xuICAgICAgICBjb25zdCBiYXNlQ29tcG9uZW50ID0gc2VnbWVudC5iYXNlQ29tcG9uZW50O1xuICAgICAgICBjb25zdCBiYXNlU2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHNlZ21lbnRzLCBiYXNlQ29tcG9uZW50ID09PSBudWxsIHx8IGJhc2VDb21wb25lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJhc2VDb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xuICAgICAgICBpZiAoYmFzZVNlZ21lbnQgJiYgKGJhc2VDb21wb25lbnQgPT09IG51bGwgfHwgYmFzZUNvbXBvbmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleCkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgYmFzZVNlZ21lbnQubmV4dENvbXBvbmVudHNbYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleF0uYWRkKHNlZ21lbnQucGFyYW0uaW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGdldE5leHRDb21wb25lbnRzKHNlZ21lbnQsIHNlZ21lbnRzKSB7XG4gICAgY29uc3QgeyBuZXh0Q29tcG9uZW50cyB9ID0gc2VnbWVudDtcbiAgICBjb25zdCBuZXh0U2VnbWVudHMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IG5leHRDb21wb25lbnRJbmRleGVzIG9mIG5leHRDb21wb25lbnRzKSB7XG4gICAgICAgIGZvciAoY29uc3QgbmV4dENvbXBvbmVudEluZGV4IG9mIG5leHRDb21wb25lbnRJbmRleGVzKSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0U2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHNlZ21lbnRzLCBuZXh0Q29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgaWYgKG5leHRTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgbmV4dFNlZ21lbnRzLnB1c2gobmV4dFNlZ21lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXh0U2VnbWVudHM7XG59XG5leHBvcnQgZnVuY3Rpb24gY2hhbmdlU3RhaXJVcHdhcmQoc3RhcnRTZWdtZW50LCBzZWdtZW50cywgdXB3YXJkLCBidWxrQ2hhbmdlKSB7XG4gICAgaWYgKHNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICBsZXQgY3VycmVudCA9IFt7IHNlZ21lbnQ6IHN0YXJ0U2VnbWVudCwgdmVydGljYWxEZWx0YTogMCB9XTtcbiAgICAgICAgY29uc3QgdW5WaXNpdGVkID0gbmV3IFNldChzZWdtZW50cyk7XG4gICAgICAgIHdoaWxlIChjdXJyZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IG5leHQgPSBbXTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgeyBzZWdtZW50LCB2ZXJ0aWNhbERlbHRhIH0gb2YgY3VycmVudCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgc3RhcnRIZWlnaHQsIGVuZEhlaWdodCB9ID0gc2VnbWVudDtcbiAgICAgICAgICAgICAgICBjb25zdCBlbmREZWx0YSA9IHNlZ21lbnQucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSA/IDAgOiBNYXRoLmFicyhlbmRIZWlnaHQgLSBzdGFydEhlaWdodCkgKiAodXB3YXJkID8gMSA6IC0xKTtcbiAgICAgICAgICAgICAgICBzZWdtZW50LnN0YXJ0SGVpZ2h0ID0gdmVydGljYWxEZWx0YTtcbiAgICAgICAgICAgICAgICBzZWdtZW50LmVuZEhlaWdodCA9IHNlZ21lbnQuc3RhcnRIZWlnaHQgKyBlbmREZWx0YTtcbiAgICAgICAgICAgICAgICBzZWdtZW50LnBhcmFtLnVwd2FyZCA9IHVwd2FyZDtcbiAgICAgICAgICAgICAgICB1blZpc2l0ZWQuZGVsZXRlKHNlZ21lbnQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5leHRTZWdtZW50cyA9IGdldE5leHRDb21wb25lbnRzKHNlZ21lbnQsIHNlZ21lbnRzKTtcbiAgICAgICAgICAgICAgICBpZiAobmV4dFNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0LnB1c2goLi4ubmV4dFNlZ21lbnRzLm1hcChzZWcgPT4gKHsgc2VnbWVudDogc2VnLCB2ZXJ0aWNhbERlbHRhOiBzZWdtZW50LmVuZEhlaWdodCB9KSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJlbnQgPSBuZXh0O1xuICAgICAgICAgICAgaWYgKCFjdXJyZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGlmIChidWxrQ2hhbmdlICYmIHVuVmlzaXRlZC5zaXplKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoZVNlZ21lbnQgPSBbLi4udW5WaXNpdGVkLnZhbHVlcygpXVswXTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IFt7IHNlZ21lbnQ6IHRoZVNlZ21lbnQsIHZlcnRpY2FsRGVsdGE6IHRoZVNlZ21lbnQuc3RhcnRIZWlnaHQgPiAwID09PSB1cHdhcmQgPyAwIDogKHRoZVNlZ21lbnQuc3RhcnRIZWlnaHQgKiAtMikgfV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQW5nbGVUb2xlcmFuY2UsIERpcmVjdGlvbkFuZ2xlVG9sZXJhbmNlLCBEaXJlY3Rpb25aLCBkdW1teVBvaW50M2QsIExlbmd0aFRvbGVyYW5jZSwgU3RlcENvdW50TGltaXQgfSBmcm9tIFwiLi9jb25zdHNcIjtcbmltcG9ydCB7IGdldFNlZ21lbnRCeUluZGV4IH0gZnJvbSBcIi4vbWVzaFV0aWxzXCI7XG5pbXBvcnQgeyBDb21wb25lbnRUeXBlLCBDb21wb25lbnREaXJlY3Rpb25UeXBlLCBDaXJjdWxhclNpZGUgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgaXNFcXVhbCB9IGZyb20gXCIuL3V0aWxzXCI7XG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVTaGFwZShzZWdtZW50LCB0ZW1wID0gdHJ1ZSkge1xuICAgIGNvbnN0IHsgcGFyYW06IHsgdHlwZSB9LCBjaXJjbGVUYW5nZW50IH0gPSBzZWdtZW50O1xuICAgIGlmICh0eXBlID09PSBDb21wb25lbnRUeXBlLlN0cmFpZ2h0U3RhaXIpIHtcbiAgICAgICAgZ2VuZXJhdGVTdHJhaWdodFN0YWlyU2hhcGUoc2VnbWVudCwgdGVtcCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpcikge1xuICAgICAgICBpZiAoY2lyY2xlVGFuZ2VudCkge1xuICAgICAgICAgICAgZ2VuZXJhdGVDaXJjdWxhclN0YWlyU2hhcGUoc2VnbWVudCwgdGVtcCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBnZW5lcmF0ZVN0cmFpZ2h0U3RhaXJTaGFwZShzZWdtZW50LCB0ZW1wKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZ2VuZXJhdGVQbGF0Zm9ybVNoYXBlKHNlZ21lbnQsIHRlbXApO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdlbmVyYXRlQ2lyY3VsYXJTdGFpclNoYXBlKHNlZ21lbnQsIHRlbXAgPSB0cnVlKSB7XG4gICAgY29uc3QgeyBzdGFydCwgZW5kLCBzdGFpclNoYXBlLCBtb2xkU2hhcGUsIGNvcm5lclNoYXBlLCBjb3JuZXJNb2xkU2hhcGUsIHN0YXJ0SGVpZ2h0LCBiYXNlQ29tcG9uZW50LCBjaXJjbGVUYW5nZW50LCBwYXJhbSB9ID0gc2VnbWVudDtcbiAgICBjb25zdCB7IHN0YXJ0V2lkdGgsIGVuZFdpZHRoLCBob3Jpem9udGFsU3RlcCwgdmVydGljYWxTdGVwLCB1cHdhcmQsIHBsYXRmb3JtVGhpY2tuZXNzIH0gPSBwYXJhbTtcbiAgICBpZiAoY2lyY2xlVGFuZ2VudCkge1xuICAgICAgICBjb25zdCB0YW5nZW50TGVmdERpciA9IERpcmVjdGlvblouY3Jvc3MoY2lyY2xlVGFuZ2VudCkubm9ybWFsaXplZCgpO1xuICAgICAgICBjb25zdCBzdGFydEVuZERpciA9IGVuZC5zdWJ0cmFjdGVkKHN0YXJ0KS5ub3JtYWxpemVkKCk7XG4gICAgICAgIGNvbnN0IHN0YXJ0RW5kRGlzdGFuY2UgPSBzdGFydC5kaXN0YW5jZVRvKGVuZCk7XG4gICAgICAgIGNvbnN0IG1heFdpZHRoID0gTWF0aC5tYXgoc3RhcnRXaWR0aCwgZW5kV2lkdGgpO1xuICAgICAgICBjb25zdCBlbmRBbmdsZSA9IHN0YXJ0RW5kRGlyLmFuZ2xlVG8oY2lyY2xlVGFuZ2VudCwgRGlyZWN0aW9uWik7XG4gICAgICAgIGlmIChlbmRBbmdsZSA8IERpcmVjdGlvbkFuZ2xlVG9sZXJhbmNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2VuZXJhdGVTdHJhaWdodFN0YWlyU2hhcGUoc2VnbWVudCwgdGVtcCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXNMZWZ0QXJjID0gZW5kQW5nbGUgPiBNYXRoLlBJO1xuICAgICAgICBpZiAoaXNMZWZ0QXJjKSB7XG4gICAgICAgICAgICBzZWdtZW50LmNpcmN1bGFyU2lkZSA9IENpcmN1bGFyU2lkZS5MZWZ0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2VnbWVudC5jaXJjdWxhclNpZGUgPSBDaXJjdWxhclNpZGUuUmlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZW5kQ29tcGxlbWVudGFyeUFuZ2xlID0gaXNMZWZ0QXJjID8gTWF0aC5hYnMoZW5kQW5nbGUgLSBNYXRoLlBJIC8gMiAtIE1hdGguUEkpIDogTWF0aC5hYnMoZW5kQW5nbGUgLSBNYXRoLlBJIC8gMik7XG4gICAgICAgIGNvbnN0IGhhbGZDaG9yZCA9IHN0YXJ0RW5kRGlzdGFuY2UgLyAyO1xuICAgICAgICBjb25zdCByYWRpdXMgPSBoYWxmQ2hvcmQgLyBNYXRoLmNvcyhlbmRDb21wbGVtZW50YXJ5QW5nbGUpO1xuICAgICAgICBjb25zdCBpbm5lclJhZGl1cyA9IHJhZGl1cyAtIG1heFdpZHRoIC8gMjtcbiAgICAgICAgaWYgKHJhZGl1cyA8IG1heFdpZHRoIC8gMiAqIDEuMiB8fCBpbm5lclJhZGl1cyA8IGhvcml6b250YWxTdGVwIC8gMiAvIDAuOCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGhvcml6b250YWxTdGVwQW5nbGUgPSBNYXRoLmFzaW4oaG9yaXpvbnRhbFN0ZXAgLyAyIC8gaW5uZXJSYWRpdXMpICogMjtcbiAgICAgICAgY29uc3QgY2lyY2xlTm9ybWFsID0gaXNMZWZ0QXJjID8gRGlyZWN0aW9uWiA6IERpcmVjdGlvbloucmV2ZXJzZWQoKTtcbiAgICAgICAgY29uc3QgY2lyY2xlQ2VudGVyID0gc3RhcnQuYWRkZWQodGFuZ2VudExlZnREaXIubXVsdGlwbGllZChpc0xlZnRBcmMgPyByYWRpdXMgOiAtcmFkaXVzKSk7XG4gICAgICAgIC8vIGNvbnN0IGNpcmNsZSA9IEdlb21MaWIuY3JlYXRlQ2lyY2xlM2RCeUNlbnRlck5vcm1hbFJhZGl1cyhjaXJjbGVDZW50ZXIsIGNpcmNsZU5vcm1hbCwgcmFkaXVzKTtcbiAgICAgICAgY29uc3QgYXJjID0gR2VvbUxpYi5jcmVhdGVBcmMzZEJ5Q2VudGVyTm9ybWFsUmFkaXVzKGNpcmNsZUNlbnRlciwgY2lyY2xlTm9ybWFsLCByYWRpdXMsIHN0YXJ0LCBlbmQpO1xuICAgICAgICBjb25zdCBhcmNBbmdsZSA9IGFyYy5hcmNBbmdsZTtcbiAgICAgICAgY29uc3Qgc3RlcENvdW50ID0gTWF0aC5jZWlsKGFyY0FuZ2xlIC8gaG9yaXpvbnRhbFN0ZXBBbmdsZSk7XG4gICAgICAgIGNvbnN0IGxhc3RIb3Jpem9udGFsQW5nbGUgPSBhcmNBbmdsZSAtIGhvcml6b250YWxTdGVwQW5nbGUgKiAoc3RlcENvdW50IC0gMSk7XG4gICAgICAgIGNvbnN0IHZhbGlkU3RlcENvdW50ID0gKGxhc3RIb3Jpem9udGFsQW5nbGUgPT09IDAgfHwgbGFzdEhvcml6b250YWxBbmdsZSA+IEFuZ2xlVG9sZXJhbmNlKSA/IHN0ZXBDb3VudCA6IHN0ZXBDb3VudCAtIDE7XG4gICAgICAgIGlmIChob3Jpem9udGFsU3RlcEFuZ2xlID49IGFyY0FuZ2xlIHx8IGhvcml6b250YWxTdGVwQW5nbGUgPj0gTWF0aC5QSSAvIDIgfHwgdmFsaWRTdGVwQ291bnQgPj0gU3RlcENvdW50TGltaXQgfHwgdmFsaWRTdGVwQ291bnQgPCAxKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFtdO1xuICAgICAgICBzdGFpclNoYXBlLnRlbXBMaW5lcyA9IFtdO1xuICAgICAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXTtcbiAgICAgICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtdO1xuICAgICAgICBjb3JuZXJTaGFwZS52ZXJ0aWNlcyA9IFtdO1xuICAgICAgICBjb3JuZXJTaGFwZS50ZW1wTGluZXMgPSBbXTtcbiAgICAgICAgY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzID0gW107XG4gICAgICAgIGNvcm5lck1vbGRTaGFwZS50ZW1wTGluZXMgPSBbXTtcbiAgICAgICAgY29uc3QgeyB2ZXJ0aWNlcywgdGVtcExpbmVzIH0gPSBzdGFpclNoYXBlO1xuICAgICAgICBjb25zdCB7IHZlcnRpY2VzOiBtb2xkVmVydGljZXMsIHRlbXBMaW5lczogbW9sZFRlbXBMaW5lcyB9ID0gbW9sZFNoYXBlO1xuICAgICAgICAvLyBjb25zdCBjZW50ZXJIb3Jpem9udGFsU3RlcCA9IGhvcml6b250YWxTdGVwIC8gaW5uZXJSYWRpdXMgKiByYWRpdXM7XG4gICAgICAgIGNvbnN0IHN0ZXBIZWlnaHQgPSB1cHdhcmQgPyB2ZXJ0aWNhbFN0ZXAgOiAtdmVydGljYWxTdGVwO1xuICAgICAgICBzZWdtZW50LmVuZEhlaWdodCA9IHNlZ21lbnQuc3RhcnRIZWlnaHQgKyB2YWxpZFN0ZXBDb3VudCAqIHN0ZXBIZWlnaHQ7XG4gICAgICAgIHN0YWlyU2hhcGUuc3RlcENvdW50ID0gdmFsaWRTdGVwQ291bnQ7XG4gICAgICAgIG1vbGRTaGFwZS5zdGVwQ291bnQgPSB2YWxpZFN0ZXBDb3VudDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3ZhbGlkU3RlcENvdW50OiAgICcsdmFsaWRTdGVwQ291bnQpO1xuICAgICAgICBjb25zdCBsZWZ0UHQgPSBzdGFydC5hZGRlZCh0YW5nZW50TGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSk7XG4gICAgICAgIGNvbnN0IHJpZ2h0UHQgPSBzdGFydC5hZGRlZCh0YW5nZW50TGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpO1xuICAgICAgICBjb25zdCBzdGFydFJhZGl1c0RpciA9IGlzTGVmdEFyYyA/IHRhbmdlbnRMZWZ0RGlyLnJldmVyc2VkKCkgOiB0YW5nZW50TGVmdERpcjtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGVwQ291bnQgLSAxOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGN1clJvdGF0ZU1hdHJpeCA9IEdlb21MaWIuY3JlYXRlUm90YXRlTWF0cml4NChob3Jpem9udGFsU3RlcEFuZ2xlICogaSwgY2lyY2xlTm9ybWFsLCBkdW1teVBvaW50M2QpO1xuICAgICAgICAgICAgY29uc3QgY3VyUmFkaXVzRGlyID0gc3RhcnRSYWRpdXNEaXIuYXBwbGllZE1hdHJpeDQoY3VyUm90YXRlTWF0cml4KTtcbiAgICAgICAgICAgIGNvbnN0IGN1ckhhbGZXaWR0aCA9IChzdGFydFdpZHRoICsgKGVuZFdpZHRoIC0gc3RhcnRXaWR0aCkgKiAoaSAqIGhvcml6b250YWxTdGVwQW5nbGUpIC8gYXJjQW5nbGUpIC8gMiAqIChpc0xlZnRBcmMgPyAtMSA6IDEpO1xuICAgICAgICAgICAgY29uc3QgY3VyTGVmdE1vbGRQdCA9IGNpcmNsZUNlbnRlci5hZGRlZChjdXJSYWRpdXNEaXIubXVsdGlwbGllZChyYWRpdXMgKyBjdXJIYWxmV2lkdGgpKTtcbiAgICAgICAgICAgIGNvbnN0IGN1clJpZ2h0TW9sZFB0ID0gY2lyY2xlQ2VudGVyLmFkZGVkKGN1clJhZGl1c0Rpci5tdWx0aXBsaWVkKHJhZGl1cyAtIGN1ckhhbGZXaWR0aCkpO1xuICAgICAgICAgICAgY29uc3QgY3VyTGVmdFB0ID0gY3VyTGVmdE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBpICogc3RlcEhlaWdodCkpO1xuICAgICAgICAgICAgY29uc3QgY3VyUmlnaHRQdCA9IGN1clJpZ2h0TW9sZFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIGkgKiBzdGVwSGVpZ2h0KSk7XG4gICAgICAgICAgICBtb2xkVmVydGljZXMucHVzaChjdXJMZWZ0TW9sZFB0LCBjdXJSaWdodE1vbGRQdCk7XG4gICAgICAgICAgICBtb2xkVGVtcExpbmVzLnB1c2goWzIgKiBpLCAxICsgMiAqIGldLCBbMiAqIGksIDIgKyAyICogaV0sIFsxICsgMiAqIGksIDMgKyAyICogaV0pO1xuICAgICAgICAgICAgdmVydGljZXMucHVzaChjdXJMZWZ0UHQsIGN1clJpZ2h0UHQpO1xuICAgICAgICAgICAgY29uc3QgbmV4dFJvdGF0ZU1hdHJpeCA9IEdlb21MaWIuY3JlYXRlUm90YXRlTWF0cml4NChob3Jpem9udGFsU3RlcEFuZ2xlICogKGkgKyAxKSwgY2lyY2xlTm9ybWFsLCBkdW1teVBvaW50M2QpO1xuICAgICAgICAgICAgY29uc3QgbmV4dFJhZGl1c0RpciA9IHN0YXJ0UmFkaXVzRGlyLmFwcGxpZWRNYXRyaXg0KG5leHRSb3RhdGVNYXRyaXgpO1xuICAgICAgICAgICAgY29uc3QgbmV4dEhhbGZXaWR0aCA9IChzdGFydFdpZHRoICsgKGVuZFdpZHRoIC0gc3RhcnRXaWR0aCkgKiAoKGkgKyAxKSAqIGhvcml6b250YWxTdGVwQW5nbGUpIC8gYXJjQW5nbGUpIC8gMiAqIChpc0xlZnRBcmMgPyAtMSA6IDEpO1xuICAgICAgICAgICAgY29uc3QgbmV4dExlZnRNb2xkUHQgPSBjaXJjbGVDZW50ZXIuYWRkZWQobmV4dFJhZGl1c0Rpci5tdWx0aXBsaWVkKHJhZGl1cyArIG5leHRIYWxmV2lkdGgpKTtcbiAgICAgICAgICAgIGNvbnN0IG5leHRSaWdodE1vbGRQdCA9IGNpcmNsZUNlbnRlci5hZGRlZChuZXh0UmFkaXVzRGlyLm11bHRpcGxpZWQocmFkaXVzIC0gbmV4dEhhbGZXaWR0aCkpO1xuICAgICAgICAgICAgY29uc3QgbmV4dExlZnRQdCA9IG5leHRMZWZ0TW9sZFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIGkgKiBzdGVwSGVpZ2h0KSk7XG4gICAgICAgICAgICBjb25zdCBuZXh0UmlnaHRQdCA9IG5leHRSaWdodE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBpICogc3RlcEhlaWdodCkpO1xuICAgICAgICAgICAgaWYgKHVwd2FyZCkge1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2goY3VyTGVmdFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksIGN1clJpZ2h0UHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKG5leHRMZWZ0UHQsIG5leHRSaWdodFB0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzQgKiBpLCAxICsgNCAqIGldLCBbNCAqIGksIDIgKyA0ICogaV0sIFsxICsgNCAqIGksIDMgKyA0ICogaV0sIFsyICsgNCAqIGksIDMgKyA0ICogaV0sIFsyICsgNCAqIGksIDQgKyA0ICogaV0sIFszICsgNCAqIGksIDUgKyA0ICogaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGkgPT09IHN0ZXBDb3VudCAtIDIpIHtcbiAgICAgICAgICAgICAgICBtb2xkVmVydGljZXMucHVzaChuZXh0TGVmdE1vbGRQdCwgbmV4dFJpZ2h0TW9sZFB0KTtcbiAgICAgICAgICAgICAgICBtb2xkVGVtcExpbmVzLnB1c2goWzIgKiAoc3RlcENvdW50IC0gMSksIDEgKyAyICogKHN0ZXBDb3VudCAtIDEpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaSA9PT0gc3RlcENvdW50IC0gMikge1xuICAgICAgICAgICAgICAgIC8vIGlmICh1cHdhcmQpIHtcbiAgICAgICAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKG5leHRMZWZ0UHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSwgbmV4dFJpZ2h0UHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSk7XG4gICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzQgKiAoc3RlcENvdW50IC0gMSksIDEgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxhc3RSb3RhdGVNYXRyaXggPSBHZW9tTGliLmNyZWF0ZVJvdGF0ZU1hdHJpeDQoYXJjQW5nbGUsIGNpcmNsZU5vcm1hbCwgZHVtbXlQb2ludDNkKTtcbiAgICAgICAgY29uc3QgbGFzdFJhZGl1c0RpciA9IHN0YXJ0UmFkaXVzRGlyLmFwcGxpZWRNYXRyaXg0KGxhc3RSb3RhdGVNYXRyaXgpO1xuICAgICAgICBjb25zdCBsYXN0SGFsZldpZHRoID0gaXNMZWZ0QXJjID8gLWVuZFdpZHRoIC8gMiA6IGVuZFdpZHRoIC8gMjtcbiAgICAgICAgY29uc3QgbGFzdExlZnRNb2xkUHQgPSBjaXJjbGVDZW50ZXIuYWRkZWQobGFzdFJhZGl1c0Rpci5tdWx0aXBsaWVkKHJhZGl1cyArIGxhc3RIYWxmV2lkdGgpKTtcbiAgICAgICAgY29uc3QgbGFzdFJpZ2h0TW9sZFB0ID0gY2lyY2xlQ2VudGVyLmFkZGVkKGxhc3RSYWRpdXNEaXIubXVsdGlwbGllZChyYWRpdXMgLSBsYXN0SGFsZldpZHRoKSk7XG4gICAgICAgIGNvbnN0IGxhc3RMZWZ0UHQgPSBsYXN0TGVmdE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBzdGVwQ291bnQgKiBzdGVwSGVpZ2h0KSk7XG4gICAgICAgIGNvbnN0IGxhc3RSaWdodFB0ID0gbGFzdFJpZ2h0TW9sZFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIHN0ZXBDb3VudCAqIHN0ZXBIZWlnaHQpKTtcbiAgICAgICAgaWYgKHN0ZXBDb3VudCA9PT0gMSkge1xuICAgICAgICAgICAgbW9sZFZlcnRpY2VzLnB1c2gobGVmdFB0LCByaWdodFB0KTtcbiAgICAgICAgICAgIG1vbGRUZW1wTGluZXMucHVzaChbMiAqIChzdGVwQ291bnQgLSAxKSwgMSArIDIgKiAoc3RlcENvdW50IC0gMSldKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGFzdEhvcml6b250YWxBbmdsZSA+PSBBbmdsZVRvbGVyYW5jZSB8fCBsYXN0SG9yaXpvbnRhbEFuZ2xlID09PSAwKSB7XG4gICAgICAgICAgICBtb2xkVmVydGljZXMucHVzaChsYXN0TGVmdE1vbGRQdCwgbGFzdFJpZ2h0TW9sZFB0KTtcbiAgICAgICAgICAgIG1vbGRUZW1wTGluZXMucHVzaChbMiAqIChzdGVwQ291bnQgLSAxKSwgMiArIDIgKiAoc3RlcENvdW50IC0gMSldLCBbMSArIDIgKiAoc3RlcENvdW50IC0gMSksIDMgKyAyICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKiBzdGVwQ291bnQsIDEgKyAyICogc3RlcENvdW50XSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVwd2FyZCkge1xuICAgICAgICAgICAgaWYgKHN0ZXBDb3VudCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2gobGVmdFB0LCByaWdodFB0KTtcbiAgICAgICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbNCAqIChzdGVwQ291bnQgLSAxKSwgMSArIDQgKiAoc3RlcENvdW50IC0gMSldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGFzdEhvcml6b250YWxBbmdsZSA+PSBBbmdsZVRvbGVyYW5jZSB8fCBsYXN0SG9yaXpvbnRhbEFuZ2xlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQodmVydGljYWxTdGVwKSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCh2ZXJ0aWNhbFN0ZXApKSk7XG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaChsYXN0TGVmdFB0LCBsYXN0UmlnaHRQdCk7XG4gICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzQgKiAoc3RlcENvdW50IC0gMSksIDIgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzEgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCAzICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsyICsgNCAqIChzdGVwQ291bnQgLSAxKSwgMyArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMiArIDQgKiAoc3RlcENvdW50IC0gMSksIDQgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzMgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCA1ICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFs0ICogc3RlcENvdW50LCAxICsgNCAqIHN0ZXBDb3VudF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChzdGVwQ291bnQgPT09IDEpIHtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKGxlZnRQdCwgcmlnaHRQdCk7XG4gICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzQgKiAoc3RlcENvdW50IC0gMSksIDEgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxhc3RIb3Jpem9udGFsQW5nbGUgPj0gQW5nbGVUb2xlcmFuY2UgfHwgbGFzdEhvcml6b250YWxBbmdsZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2gobGFzdExlZnRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQpKSwgbGFzdFJpZ2h0UHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0KSkpO1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2gobGFzdExlZnRQdCwgbGFzdFJpZ2h0UHQpO1xuICAgICAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFs0ICogKHN0ZXBDb3VudCAtIDEpLCAyICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsxICsgNCAqIChzdGVwQ291bnQgLSAxKSwgMyArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMiArIDQgKiAoc3RlcENvdW50IC0gMSksIDMgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCA0ICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFszICsgNCAqIChzdGVwQ291bnQgLSAxKSwgNSArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbNCAqIHN0ZXBDb3VudCwgMSArIDQgKiBzdGVwQ291bnRdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0ZXBDb3VudCA+IDEpIHtcbiAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIDIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGFjdHVhbExhc3RTdGVwTGVuZ3RoID0gbGFzdEhvcml6b250YWxBbmdsZSA8IEFuZ2xlVG9sZXJhbmNlID8gaG9yaXpvbnRhbFN0ZXBBbmdsZSA6IGxhc3RIb3Jpem9udGFsQW5nbGU7XG4gICAgICAgICAgICBpZiAodXB3YXJkKSB7XG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQgLSAoMSAtIGFjdHVhbExhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXBBbmdsZSkgKiBzdGVwSGVpZ2h0KSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCgtc3RlcEhlaWdodCAtICgxIC0gYWN0dWFsTGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcEFuZ2xlKSAqIHN0ZXBIZWlnaHQpKSk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IHN0ZXBDb3VudCAtIChsYXN0SG9yaXpvbnRhbEFuZ2xlID49IEFuZ2xlVG9sZXJhbmNlID8gMSA6IDIpOyBqID4gMDsgai0tKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZJbmQgPSBqICogNDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSAyLCAyICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsxICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAwXSwgWzMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAxXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2SW5kXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQpKSwgdmVydGljZXNbdkluZCArIDFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCgtc3RlcEhlaWdodCkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyB2ZXJ0aWNlcy5wdXNoKFxuICAgICAgICAgICAgICAgIC8vICAgICB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSA2XS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLFxuICAgICAgICAgICAgICAgIC8vICAgICB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSA1XS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLFxuICAgICAgICAgICAgICAgIC8vICk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IHN0ZXBDb3VudCAtIChsYXN0SG9yaXpvbnRhbEFuZ2xlID49IEFuZ2xlVG9sZXJhbmNlID8gMSA6IDIpOyBqID49IDA7IGotLSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2SW5kID0gaiAqIDQ7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbdmVydGljZXMubGVuZ3RoIC0gMiwgMiArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMSArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaiA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMF0sIFszICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdkluZF0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSwgdmVydGljZXNbdkluZCArIDFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIDIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMiArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDBdLCBbMyArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh1cHdhcmQpIHtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCgtc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzWzBdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksIHZlcnRpY2VzWzFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChiYXNlQ29tcG9uZW50KSB7XG4gICAgICAgICAgICBjb25zdCBiYXNlTGluZVNlZzNkID0gYmFzZUNvbXBvbmVudC5saW5lM2Q7XG4gICAgICAgICAgICBjb25zdCBiYXNlTGluZURpciA9IGJhc2VMaW5lU2VnM2QuZW5kLnN1YnRyYWN0ZWQoYmFzZUxpbmVTZWczZC5zdGFydCkubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgY29uc3QgYW5nbGUgPSBjaXJjbGVUYW5nZW50LmFuZ2xlKGJhc2VMaW5lRGlyKTtcbiAgICAgICAgICAgIGlmIChhbmdsZSA8IE1hdGguUEkgLyAyKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29ybmVyQ29ubmVjdGlvblBvaW50MSA9IHN0YXJ0LmFkZGVkKGJhc2VMaW5lRGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyICogTWF0aC5zaWduKGFuZ2xlKSkpO1xuICAgICAgICAgICAgICAgIGNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtzdGFydCwgc3RhcnQuYWRkZWQodGFuZ2VudExlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSwgY29ybmVyQ29ubmVjdGlvblBvaW50MV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb3JuZXJDb25uZWN0aW9uUG9pbnQyID0gc3RhcnQuYWRkZWQoYmFzZUxpbmVEaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMiAqIE1hdGguc2lnbihhbmdsZSkpKTtcbiAgICAgICAgICAgICAgICBjb3JuZXJNb2xkU2hhcGUudmVydGljZXMgPSBbc3RhcnQsIGNvcm5lckNvbm5lY3Rpb25Qb2ludDIsIHN0YXJ0LmFkZGVkKHRhbmdlbnRMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb3JuZXJNb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgMF1dO1xuICAgICAgICAgICAgY29ybmVyU2hhcGUudmVydGljZXMgPSBbXG4gICAgICAgICAgICAgICAgLi4uY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzLm1hcCh2ID0+IHYuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkpLFxuICAgICAgICAgICAgICAgIC4uLmNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAodiA9PiB2LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCAtIHBsYXRmb3JtVGhpY2tuZXNzKSkpLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgY29ybmVyU2hhcGUudGVtcExpbmVzID0gW1xuICAgICAgICAgICAgICAgICAgICBbMCwgMV0sIFsxLCAyXSwgWzIsIDBdLFxuICAgICAgICAgICAgICAgICAgICBbMywgNF0sIFs0LCA1XSwgWzUsIDNdLFxuICAgICAgICAgICAgICAgICAgICBbMCwgM10sIFsxLCA0XSwgWzIsIDVdLFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBnZW5lcmF0ZVN0cmFpZ2h0U3RhaXJTaGFwZShzZWdtZW50LCB0ZW1wID0gdHJ1ZSkge1xuICAgIGNvbnN0IHsgc3RhcnQsIGVuZCwgc3RhaXJTaGFwZSwgbW9sZFNoYXBlLCBjb3JuZXJTaGFwZSwgY29ybmVyTW9sZFNoYXBlLCBzdGFydEhlaWdodCwgYmFzZUNvbXBvbmVudCwgcGFyYW0gfSA9IHNlZ21lbnQ7XG4gICAgY29uc3QgeyBzdGFydFdpZHRoLCBlbmRXaWR0aCwgaG9yaXpvbnRhbFN0ZXAsIHZlcnRpY2FsU3RlcCwgdXB3YXJkLCBwbGF0Zm9ybVRoaWNrbmVzcyB9ID0gcGFyYW07XG4gICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFtdO1xuICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW107XG4gICAgbW9sZFNoYXBlLnZlcnRpY2VzID0gW107XG4gICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtdO1xuICAgIGNvcm5lclNoYXBlLnZlcnRpY2VzID0gW107XG4gICAgY29ybmVyU2hhcGUudGVtcExpbmVzID0gW107XG4gICAgY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzID0gW107XG4gICAgY29ybmVyTW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtdO1xuICAgIGNvbnN0IHsgdmVydGljZXMsIHRlbXBMaW5lcyB9ID0gc3RhaXJTaGFwZTtcbiAgICBjb25zdCB7IHZlcnRpY2VzOiBtb2xkVmVydGljZXMsIHRlbXBMaW5lczogbW9sZFRlbXBMaW5lcyB9ID0gbW9sZFNoYXBlO1xuICAgIGxldCBob3Jpem9udGFsRnJvbnREaXIgPSBlbmQuc3VidHJhY3RlZChzdGFydCkubm9ybWFsaXplZCgpO1xuICAgIGxldCBob3Jpem9udGFsRGlzdGFuY2UgPSBzdGFydC5kaXN0YW5jZVRvKGVuZCk7XG4gICAgbGV0IGhvcml6b250YWxMZWZ0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhob3Jpem9udGFsRnJvbnREaXIpO1xuICAgIGNvbnN0IHN0ZXBGbG9hdENvdW50ID0gaG9yaXpvbnRhbERpc3RhbmNlIC8gaG9yaXpvbnRhbFN0ZXA7XG4gICAgY29uc3Qgc3RlcENvdW50ID0gTWF0aC5jZWlsKHN0ZXBGbG9hdENvdW50KTtcbiAgICBjb25zdCBsYXN0U3RlcExlbmd0aCA9IGhvcml6b250YWxEaXN0YW5jZSAtIChzdGVwQ291bnQgLSAxKSAqIGhvcml6b250YWxTdGVwO1xuICAgIGNvbnN0IHZhbGlkU3RlcENvdW50ID0gKGxhc3RTdGVwTGVuZ3RoID09PSAwIHx8IGxhc3RTdGVwTGVuZ3RoID4gTGVuZ3RoVG9sZXJhbmNlKSA/IHN0ZXBDb3VudCA6IHN0ZXBDb3VudCAtIDE7XG4gICAgaWYgKHZhbGlkU3RlcENvdW50IDwgMSB8fCB2YWxpZFN0ZXBDb3VudCA+PSBTdGVwQ291bnRMaW1pdCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChiYXNlQ29tcG9uZW50KSB7XG4gICAgICAgIGNvbnN0IGJhc2VMaW5lU2VnM2QgPSBiYXNlQ29tcG9uZW50LmxpbmUzZDtcbiAgICAgICAgY29uc3QgYmFzZUxpbmVEaXIgPSBiYXNlTGluZVNlZzNkLmVuZC5zdWJ0cmFjdGVkKGJhc2VMaW5lU2VnM2Quc3RhcnQpLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgY29uc3QgYW5nbGUgPSBob3Jpem9udGFsRnJvbnREaXIuYW5nbGUoYmFzZUxpbmVEaXIpO1xuICAgICAgICBjb25zdCBkZWx0YUFuZ2xlID0gTWF0aC5hYnMoYW5nbGUgLSBNYXRoLlBJIC8gMik7XG4gICAgICAgIGlmIChkZWx0YUFuZ2xlIDw9IERpcmVjdGlvbkFuZ2xlVG9sZXJhbmNlKSB7XG4gICAgICAgICAgICBzZWdtZW50LmNvbXBvbmVudERpcmVjdGlvblR5cGUgPSBDb21wb25lbnREaXJlY3Rpb25UeXBlLkZyb250O1xuICAgICAgICAgICAgaG9yaXpvbnRhbEZyb250RGlyID0gYmFzZUxpbmVEaXIuY3Jvc3MoaG9yaXpvbnRhbEZyb250RGlyLmNyb3NzKGJhc2VMaW5lRGlyKSkubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgaG9yaXpvbnRhbERpc3RhbmNlID0gaG9yaXpvbnRhbERpc3RhbmNlICogTWF0aC5jb3MoZGVsdGFBbmdsZSk7XG4gICAgICAgICAgICBob3Jpem9udGFsTGVmdERpciA9IERpcmVjdGlvblouY3Jvc3MoaG9yaXpvbnRhbEZyb250RGlyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChhbmdsZSA8IE1hdGguUEkgLyAyKSB7XG4gICAgICAgICAgICAgICAgc2VnbWVudC5jb21wb25lbnREaXJlY3Rpb25UeXBlID0gQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5MZWZ0O1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvcm5lckNvbm5lY3Rpb25Qb2ludDEgPSBzdGFydC5hZGRlZChiYXNlTGluZURpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMiAqIE1hdGguc2lnbihhbmdsZSkpKTtcbiAgICAgICAgICAgICAgICBjb3JuZXJNb2xkU2hhcGUudmVydGljZXMgPSBbc3RhcnQsIHN0YXJ0LmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSksIGNvcm5lckNvbm5lY3Rpb25Qb2ludDFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VnbWVudC5jb21wb25lbnREaXJlY3Rpb25UeXBlID0gQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5SaWdodDtcbiAgICAgICAgICAgICAgICBjb25zdCBjb3JuZXJDb25uZWN0aW9uUG9pbnQyID0gc3RhcnQuYWRkZWQoYmFzZUxpbmVEaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMiAqIE1hdGguc2lnbihhbmdsZSkpKTtcbiAgICAgICAgICAgICAgICBjb3JuZXJNb2xkU2hhcGUudmVydGljZXMgPSBbc3RhcnQsIGNvcm5lckNvbm5lY3Rpb25Qb2ludDIsIHN0YXJ0LmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb3JuZXJNb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgMF1dO1xuICAgICAgICAgICAgY29ybmVyU2hhcGUudmVydGljZXMgPSBbXG4gICAgICAgICAgICAgICAgLi4uY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzLm1hcCh2ID0+IHYuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkpLFxuICAgICAgICAgICAgICAgIC4uLmNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAodiA9PiB2LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCAtIHBsYXRmb3JtVGhpY2tuZXNzKSkpLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgY29ybmVyU2hhcGUudGVtcExpbmVzID0gW1xuICAgICAgICAgICAgICAgICAgICBbMCwgMV0sIFsxLCAyXSwgWzIsIDBdLFxuICAgICAgICAgICAgICAgICAgICBbMywgNF0sIFs0LCA1XSwgWzUsIDNdLFxuICAgICAgICAgICAgICAgICAgICBbMCwgM10sIFsxLCA0XSwgWzIsIDVdLFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgc3RlcEhlaWdodCA9IHVwd2FyZCA/IHZlcnRpY2FsU3RlcCA6IC12ZXJ0aWNhbFN0ZXA7XG4gICAgc2VnbWVudC5lbmRIZWlnaHQgPSBzZWdtZW50LnN0YXJ0SGVpZ2h0ICsgdmFsaWRTdGVwQ291bnQgKiBzdGVwSGVpZ2h0O1xuICAgIHN0YWlyU2hhcGUuc3RlcENvdW50ID0gdmFsaWRTdGVwQ291bnQ7XG4gICAgbW9sZFNoYXBlLnN0ZXBDb3VudCA9IHZhbGlkU3RlcENvdW50O1xuICAgIGNvbnN0IGxlZnRQdCA9IHN0YXJ0LmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKTtcbiAgICBjb25zdCByaWdodFB0ID0gc3RhcnQuYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKTtcbiAgICBjb25zdCB3aWR0aERlbHRhID0gKGVuZFdpZHRoIC0gc3RhcnRXaWR0aCkgLyAyIC8gKHN0ZXBGbG9hdENvdW50KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ZXBDb3VudCAtIDE7IGkrKykge1xuICAgICAgICBjb25zdCBjdXJMZWZ0TW9sZFB0ID0gbGVmdFB0LmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGkgKiBob3Jpem9udGFsU3RlcCkpLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoaSAqIHdpZHRoRGVsdGEpKTtcbiAgICAgICAgY29uc3QgY3VyUmlnaHRNb2xkUHQgPSByaWdodFB0LmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGkgKiBob3Jpem9udGFsU3RlcCkpLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoLWkgKiB3aWR0aERlbHRhKSk7XG4gICAgICAgIGNvbnN0IGN1ckxlZnRQdCA9IGN1ckxlZnRNb2xkUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0ICsgaSAqIHN0ZXBIZWlnaHQpKTtcbiAgICAgICAgY29uc3QgY3VyUmlnaHRQdCA9IGN1clJpZ2h0TW9sZFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIGkgKiBzdGVwSGVpZ2h0KSk7XG4gICAgICAgIG1vbGRWZXJ0aWNlcy5wdXNoKGN1ckxlZnRNb2xkUHQsIGN1clJpZ2h0TW9sZFB0KTtcbiAgICAgICAgbW9sZFRlbXBMaW5lcy5wdXNoKFsyICogaSwgMSArIDIgKiBpXSwgWzIgKiBpLCAyICsgMiAqIGldLCBbMSArIDIgKiBpLCAzICsgMiAqIGldKTtcbiAgICAgICAgdmVydGljZXMucHVzaChjdXJMZWZ0UHQsIGN1clJpZ2h0UHQpO1xuICAgICAgICBpZiAodXB3YXJkKSB7XG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKGN1ckxlZnRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLCBjdXJSaWdodFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmVydGljZXMucHVzaChjdXJMZWZ0UHQuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaG9yaXpvbnRhbFN0ZXApKSwgY3VyUmlnaHRQdC5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzQgKiBpLCAxICsgNCAqIGldLCBbNCAqIGksIDIgKyA0ICogaV0sIFsxICsgNCAqIGksIDMgKyA0ICogaV0sIFsyICsgNCAqIGksIDMgKyA0ICogaV0sIFsyICsgNCAqIGksIDQgKyA0ICogaV0sIFszICsgNCAqIGksIDUgKyA0ICogaV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIG1vbGRWZXJ0aWNlcy5wdXNoKHN0ZXBDb3VudCA+IDEgPyBtb2xkVmVydGljZXNbbW9sZFZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSkgOiBsZWZ0UHQsIHN0ZXBDb3VudCA+IDEgPyBtb2xkVmVydGljZXNbbW9sZFZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSkgOiByaWdodFB0KTtcbiAgICBtb2xkVGVtcExpbmVzLnB1c2goWzIgKiAoc3RlcENvdW50IC0gMSksIDEgKyAyICogKHN0ZXBDb3VudCAtIDEpXSk7XG4gICAgaWYgKGxhc3RTdGVwTGVuZ3RoID4gTGVuZ3RoVG9sZXJhbmNlIHx8IGxhc3RTdGVwTGVuZ3RoID09PSAwKSB7XG4gICAgICAgIG1vbGRWZXJ0aWNlcy5wdXNoKG1vbGRWZXJ0aWNlc1ttb2xkVmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwICogd2lkdGhEZWx0YSkpLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoKSksIG1vbGRWZXJ0aWNlc1ttb2xkVmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZCgtbGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcCAqIHdpZHRoRGVsdGEpKS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCkpKTtcbiAgICAgICAgbW9sZFRlbXBMaW5lcy5wdXNoKFsyICogKHN0ZXBDb3VudCAtIDEpLCAyICsgMiAqIChzdGVwQ291bnQgLSAxKV0sIFsxICsgMiAqIChzdGVwQ291bnQgLSAxKSwgMyArIDIgKiAoc3RlcENvdW50IC0gMSldLCBbMiAqIHN0ZXBDb3VudCwgMSArIDIgKiBzdGVwQ291bnRdKTtcbiAgICB9XG4gICAgaWYgKHVwd2FyZCkge1xuICAgICAgICB2ZXJ0aWNlcy5wdXNoKHN0ZXBDb3VudCA+IDEgPyB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpIDogbGVmdFB0LCBzdGVwQ291bnQgPiAxID8gdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaG9yaXpvbnRhbFN0ZXApKSA6IHJpZ2h0UHQpO1xuICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzQgKiAoc3RlcENvdW50IC0gMSksIDEgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxhc3RTdGVwTGVuZ3RoID4gTGVuZ3RoVG9sZXJhbmNlIHx8IGxhc3RTdGVwTGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXAgKiB3aWR0aERlbHRhKSkuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGgpKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZCgtbGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcCAqIHdpZHRoRGVsdGEpKS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCkpKTtcbiAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goXG4gICAgICAgICAgICAgICAgLy8gWzQgKiBzdGVwQ291bnQsIDEgKyA0ICogc3RlcENvdW50XSxcbiAgICAgICAgICAgICAgICBbNCAqIChzdGVwQ291bnQgLSAxKSwgMiArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMSArIDQgKiAoc3RlcENvdW50IC0gMSksIDMgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCAzICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsyICsgNCAqIChzdGVwQ291bnQgLSAxKSwgNCArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMyArIDQgKiAoc3RlcENvdW50IC0gMSksIDUgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzQgKiBzdGVwQ291bnQsIDEgKyA0ICogc3RlcENvdW50XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZlcnRpY2VzLnB1c2goc3RlcENvdW50ID4gMSA/IHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkgOiBsZWZ0UHQsIHN0ZXBDb3VudCA+IDEgPyB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpIDogcmlnaHRQdCk7XG4gICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbNCAqIChzdGVwQ291bnQgLSAxKSwgMSArIDQgKiAoc3RlcENvdW50IC0gMSldKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGFzdFN0ZXBMZW5ndGggPiBMZW5ndGhUb2xlcmFuY2UgfHwgbGFzdFN0ZXBMZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwICogd2lkdGhEZWx0YSkpLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoKSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoLWxhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXAgKiB3aWR0aERlbHRhKSkuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGgpKSk7XG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xuICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChcbiAgICAgICAgICAgICAgICAvLyBbNCAqIChzdGVwQ291bnQgLSAxKSwgMSArIDQgKiAoc3RlcENvdW50IC0gMSldLFxuICAgICAgICAgICAgICAgIFs0ICogKHN0ZXBDb3VudCAtIDEpLCAyICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsxICsgNCAqIChzdGVwQ291bnQgLSAxKSwgMyArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMiArIDQgKiAoc3RlcENvdW50IC0gMSksIDMgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCA0ICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFszICsgNCAqIChzdGVwQ291bnQgLSAxKSwgNSArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbNCAqIHN0ZXBDb3VudCwgMSArIDQgKiBzdGVwQ291bnRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoc3RlcENvdW50ID4gMSkge1xuICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIDIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMiArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDQgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCA1ICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFt2ZXJ0aWNlcy5sZW5ndGggKyAyLCAxICsgdmVydGljZXMubGVuZ3RoICsgMl0sIFt2ZXJ0aWNlcy5sZW5ndGggKyAyLCAwXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggKyAyLCAxXSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYWN0dWFsTGFzdFN0ZXBMZW5ndGggPSBsYXN0U3RlcExlbmd0aCA8IExlbmd0aFRvbGVyYW5jZSA/IGhvcml6b250YWxTdGVwIDogbGFzdFN0ZXBMZW5ndGg7XG4gICAgICAgIGlmICh1cHdhcmQpIHtcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0IC0gKDEgLSBhY3R1YWxMYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwKSAqIHN0ZXBIZWlnaHQpKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0IC0gKDEgLSBhY3R1YWxMYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwKSAqIHN0ZXBIZWlnaHQpKSk7XG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzWzBdLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSksIHZlcnRpY2VzWzFdLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZCgtYWN0dWFsTGFzdFN0ZXBMZW5ndGgpKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoLWFjdHVhbExhc3RTdGVwTGVuZ3RoKSkpO1xuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1swXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1sxXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSAyLCAyICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsxICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMiArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAwXSwgWzMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAxXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVwd2FyZCkge1xuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQpKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0KSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1swXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1sxXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGdlbmVyYXRlUGxhdGZvcm1TaGFwZShzZWdtZW50LCB0ZW1wID0gdHJ1ZSkge1xuICAgIGNvbnN0IHsgc3RhcnQsIHN0YXJ0SGVpZ2h0LCBiYXNlQ29tcG9uZW50LCBzdGFpclNoYXBlLCBtb2xkU2hhcGUsIGNvcm5lclNoYXBlLCBjb3JuZXJNb2xkU2hhcGUsIHBhcmFtIH0gPSBzZWdtZW50O1xuICAgIGNvbnN0IHsgc3RhcnRXaWR0aCwgb2Zmc2V0V2lkdGgsIHdpdGhPZmZzZXQsIHBsYXRmb3JtVGhpY2tuZXNzLCBwbGF0Zm9ybUxlbmd0aCwgcGxhdGZvcm1MZW5ndGhMb2NrZWQsIG1vZGVsRWRpdGluZyB9ID0gcGFyYW07XG4gICAgY29uc3QgY3VyRGlyID0gc2VnbWVudC5lbmQuc3VidHJhY3RlZChzdGFydCk7XG4gICAgY29uc3QgY3VyRGlyTm9ybWFsaXplZCA9IHNlZ21lbnQuZW5kLnN1YnRyYWN0ZWQoc3RhcnQpLm5vcm1hbGl6ZWQoKTtcbiAgICBjb25zdCBjdXJMZWZ0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhjdXJEaXIpLm5vcm1hbGl6ZWQoKTtcbiAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gW107XG4gICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXTtcbiAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXTtcbiAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW107XG4gICAgY29ybmVyU2hhcGUudmVydGljZXMgPSBbXTtcbiAgICBjb3JuZXJTaGFwZS50ZW1wTGluZXMgPSBbXTtcbiAgICBjb3JuZXJNb2xkU2hhcGUudmVydGljZXMgPSBbXTtcbiAgICBjb3JuZXJNb2xkU2hhcGUudGVtcExpbmVzID0gW107XG4gICAgc2VnbWVudC5lbmQgPSBwbGF0Zm9ybUxlbmd0aExvY2tlZCA/IHNlZ21lbnQuc3RhcnQuYWRkZWQoY3VyRGlyTm9ybWFsaXplZC5tdWx0aXBsaWVkKHBsYXRmb3JtTGVuZ3RoKSkgOiBzZWdtZW50LmVuZDtcbiAgICBzZWdtZW50LmVuZEhlaWdodCA9IHN0YXJ0SGVpZ2h0O1xuICAgIGlmICghbW9kZWxFZGl0aW5nKSB7XG4gICAgICAgIHBhcmFtLndpdGhPZmZzZXQgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGJhc2VDb21wb25lbnQpIHtcbiAgICAgICAgY29uc3QgYmFzZUxpbmVTZWczZCA9IGJhc2VDb21wb25lbnQubGluZTNkO1xuICAgICAgICBjb25zdCB7IHN0YXJ0OiBiYXNlTGluZVN0YXJ0LCBlbmQ6IGJhc2VMaW5lRW5kIH0gPSBiYXNlTGluZVNlZzNkO1xuICAgICAgICBjb25zdCBiYXNlTGluZURpciA9IGJhc2VMaW5lRW5kLnN1YnRyYWN0ZWQoYmFzZUxpbmVTdGFydCkubm9ybWFsaXplZCgpO1xuICAgICAgICBjb25zdCBwcmV2RGlyTm9ybWFsaXplZCA9IGJhc2VMaW5lRGlyLmNyb3NzKERpcmVjdGlvblopLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgY29uc3QgcHJldkxlZnREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKHByZXZEaXJOb3JtYWxpemVkKS5ub3JtYWxpemVkKCk7XG4gICAgICAgIGNvbnN0IGFuZ2xlID0gY3VyRGlyLmFuZ2xlVG8ocHJldkRpck5vcm1hbGl6ZWQsIERpcmVjdGlvblopO1xuICAgICAgICBjb25zdCBmcm9udExlbmd0aCA9IHBsYXRmb3JtTGVuZ3RoTG9ja2VkID8gcGxhdGZvcm1MZW5ndGggOiBNYXRoLmFicyhjdXJEaXIuZG90KHByZXZEaXJOb3JtYWxpemVkKSk7XG4gICAgICAgIGNvbnN0IGN1ckVuZExlZnRDb3JuZXIgPSBzZWdtZW50LmVuZC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKTtcbiAgICAgICAgY29uc3QgZGlyMSA9IGN1ckVuZExlZnRDb3JuZXIuc3VidHJhY3RlZChzZWdtZW50LnN0YXJ0KTtcbiAgICAgICAgY29uc3QgYW5nbGUxID0gZGlyMS5hbmdsZShjdXJEaXIpO1xuICAgICAgICBpZiAoKGFuZ2xlID49IE1hdGguUEkgJiYgYW5nbGUgPD0gKE1hdGguUEkgKiAzIC8gMiArIGFuZ2xlMSkpIHx8IChtb2RlbEVkaXRpbmcgJiYgd2l0aE9mZnNldCAmJiBvZmZzZXRXaWR0aCA+PSAwKSkge1xuICAgICAgICAgICAgc2VnbWVudC5jb21wb25lbnREaXJlY3Rpb25UeXBlID0gQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5MZWZ0O1xuICAgICAgICAgICAgcGFyYW0ucGxhdGZvcm1MZW5ndGggPSBmcm9udExlbmd0aDtcbiAgICAgICAgICAgIGNvbnN0IGZyb250RW5kID0gc2VnbWVudC5zdGFydC5hZGRlZChwcmV2RGlyTm9ybWFsaXplZC5tdWx0aXBsaWVkKGZyb250TGVuZ3RoKSk7XG4gICAgICAgICAgICBzZWdtZW50LmVuZCA9IGZyb250RW5kO1xuICAgICAgICAgICAgY29uc3QgbGVmdExlbmd0aCA9IHdpdGhPZmZzZXQgJiYgbW9kZWxFZGl0aW5nID8gKG9mZnNldFdpZHRoICsgc3RhcnRXaWR0aCAvIDIpIDogY3VyRGlyLmRvdChwcmV2TGVmdERpcik7XG4gICAgICAgICAgICBpZiAobGVmdExlbmd0aCA+IHN0YXJ0V2lkdGggLyAyKSB7XG4gICAgICAgICAgICAgICAgcGFyYW0ud2l0aE9mZnNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcGFyYW0ub2Zmc2V0V2lkdGggPSBsZWZ0TGVuZ3RoIC0gc3RhcnRXaWR0aCAvIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB2YWxpZExlZnRMZW5ndGggPSBNYXRoLm1heChzdGFydFdpZHRoIC8gMiwgbGVmdExlbmd0aCk7XG4gICAgICAgICAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXG4gICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCh2YWxpZExlZnRMZW5ndGgpKSxcbiAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSksXG4gICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCh2YWxpZExlZnRMZW5ndGgpKSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgM10sIFszLCAwXV07XG4gICAgICAgICAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gWy4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCkpKSxcbiAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgLSBwbGF0Zm9ybVRoaWNrbmVzcykpKSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW1xuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLFxuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLm1hcChzZWcgPT4gW3NlZ1swXSArIDQsIHNlZ1sxXSArIDRdKSxcbiAgICAgICAgICAgICAgICAgICAgWzAsIDRdLCBbMSwgNV0sIFsyLCA2XSwgWzMsIDddLFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoKGFuZ2xlIDwgTWF0aC5QSSAmJiBhbmdsZSA+PSAoTWF0aC5QSSAvIDIgLSBhbmdsZTEpKSB8fCAobW9kZWxFZGl0aW5nICYmIHdpdGhPZmZzZXQgJiYgb2Zmc2V0V2lkdGggPCAwKSkge1xuICAgICAgICAgICAgc2VnbWVudC5jb21wb25lbnREaXJlY3Rpb25UeXBlID0gQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5SaWdodDtcbiAgICAgICAgICAgIHBhcmFtLnBsYXRmb3JtTGVuZ3RoID0gZnJvbnRMZW5ndGg7XG4gICAgICAgICAgICBjb25zdCByaWdodExlbmd0aCA9IHdpdGhPZmZzZXQgJiYgbW9kZWxFZGl0aW5nID8gKC1vZmZzZXRXaWR0aCArIHN0YXJ0V2lkdGggLyAyKSA6IC1jdXJEaXIuZG90KHByZXZMZWZ0RGlyKTtcbiAgICAgICAgICAgIGNvbnN0IGZyb250RW5kMSA9IHNlZ21lbnQuc3RhcnQuYWRkZWQocHJldkRpck5vcm1hbGl6ZWQubXVsdGlwbGllZChmcm9udExlbmd0aCkpO1xuICAgICAgICAgICAgc2VnbWVudC5lbmQgPSBmcm9udEVuZDE7XG4gICAgICAgICAgICBpZiAocmlnaHRMZW5ndGggPiBzdGFydFdpZHRoIC8gMikge1xuICAgICAgICAgICAgICAgIHBhcmFtLndpdGhPZmZzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHBhcmFtLm9mZnNldFdpZHRoID0gLShyaWdodExlbmd0aCAtIHN0YXJ0V2lkdGggLyAyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHZhbGlkUmlnaHRMZW5ndGggPSBNYXRoLm1heChzdGFydFdpZHRoIC8gMiwgcmlnaHRMZW5ndGgpO1xuICAgICAgICAgICAgbW9sZFNoYXBlLnZlcnRpY2VzID0gW1xuICAgICAgICAgICAgICAgIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC12YWxpZFJpZ2h0TGVuZ3RoKSksXG4gICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtdmFsaWRSaWdodExlbmd0aCkpLFxuICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgM10sIFszLCAwXV07XG4gICAgICAgICAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gWy4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCkpKSxcbiAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgLSBwbGF0Zm9ybVRoaWNrbmVzcykpKSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW1xuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLFxuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLm1hcChzZWcgPT4gW3NlZ1swXSArIDQsIHNlZ1sxXSArIDRdKSxcbiAgICAgICAgICAgICAgICAgICAgWzAsIDRdLCBbMSwgNV0sIFsyLCA2XSwgWzMsIDddLFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwYXJhbS5vZmZzZXRXaWR0aCA9IDA7XG4gICAgICAgICAgICBpZiAoYW5nbGUgPD0gRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UgfHwgYW5nbGUgPj0gKE1hdGguUEkgKiAyIC0gRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UpKSB7XG4gICAgICAgICAgICAgICAgc2VnbWVudC5jb21wb25lbnREaXJlY3Rpb25UeXBlID0gQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5Gcm9udDtcbiAgICAgICAgICAgICAgICBzZWdtZW50LmVuZCA9IHNlZ21lbnQuc3RhcnQuYWRkZWQocHJldkRpck5vcm1hbGl6ZWQubXVsdGlwbGllZChmcm9udExlbmd0aCkpO1xuICAgICAgICAgICAgICAgIHBhcmFtLnBsYXRmb3JtTGVuZ3RoID0gZnJvbnRMZW5ndGg7XG4gICAgICAgICAgICAgICAgbW9sZFNoYXBlLnZlcnRpY2VzID0gW1xuICAgICAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSksXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyICsgb2Zmc2V0V2lkdGgpKSxcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIgKyBvZmZzZXRXaWR0aCkpLFxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSksXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgM10sIFszLCAwXV07XG4gICAgICAgICAgICAgICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFsuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKSksXG4gICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCAtIHBsYXRmb3JtVGhpY2tuZXNzKSkpLFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcy5tYXAoc2VnID0+IFtzZWdbMF0gKyA0LCBzZWdbMV0gKyA0XSksXG4gICAgICAgICAgICAgICAgICAgICAgICBbMCwgNF0sIFsxLCA1XSwgWzIsIDZdLCBbMywgN10sXG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UgPCBhbmdsZSAmJiBhbmdsZSA8IChNYXRoLlBJIC8gMiAtIGFuZ2xlMSkpIHtcbiAgICAgICAgICAgICAgICBzZWdtZW50LmNvbXBvbmVudERpcmVjdGlvblR5cGUgPSBDb21wb25lbnREaXJlY3Rpb25UeXBlLlJpZ2h0RnJvbnQ7XG4gICAgICAgICAgICAgICAgcGFyYW0ucGxhdGZvcm1MZW5ndGggPSBzZWdtZW50LmVuZC5kaXN0YW5jZVRvKHNlZ21lbnQuc3RhcnQpO1xuICAgICAgICAgICAgICAgIGxldCBsZWZ0Q29ubmVjdFBvaW50cyA9IFtzdGFydC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSwgYmFzZUxpbmVFbmRdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VMaW5lRW5kRGlzdGFuY2UgPSBzdGFydC5kaXN0YW5jZVRvKGJhc2VMaW5lRW5kKTtcbiAgICAgICAgICAgICAgICBjb25zdCBsZWZ0UHJvamVjdERpc3RhbmNlID0gc3RhcnRXaWR0aCAvIDIgKiBNYXRoLmNvcyhhbmdsZSk7XG4gICAgICAgICAgICAgICAgaWYgKGxlZnRQcm9qZWN0RGlzdGFuY2UgPCBiYXNlTGluZUVuZERpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGwxID0gc3RhcnRXaWR0aCAvIDIgLyBNYXRoLmNvcyhhbmdsZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsMSA+IGJhc2VMaW5lRW5kRGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGExID0gbDEgLSBiYXNlTGluZUVuZERpc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYzEgPSBhMSAvIE1hdGgudGFuKGFuZ2xlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRDb25uZWN0UG9pbnRzID0gW3N0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoYmFzZUxpbmVFbmREaXN0YW5jZSkpLmFkZGVkKHByZXZEaXJOb3JtYWxpemVkLm11bHRpcGxpZWQoYzEpKSwgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChiYXNlTGluZUVuZERpc3RhbmNlKSldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdENvbm5lY3RQb2ludHMgPSBbc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChsMSkpXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgIC8vIHN0YXJ0LmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgICAgICAgICAuLi5sZWZ0Q29ubmVjdFBvaW50cyxcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIgLyBNYXRoLmNvcyhhbmdsZSkpKSxcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vbGRWZXJ0ZXhDb3VudCA9IG1vbGRTaGFwZS52ZXJ0aWNlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IGdlbmVyYXRlVGVtcExpbmVzTG9vcChtb2xkVmVydGV4Q291bnQpO1xuICAgICAgICAgICAgICAgIC8vIGlmIChtb2xkVmVydGV4Q291bnQgPT09IDQpIHtcbiAgICAgICAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgM10sIFszLCA0XSwgWzQsIDBdXTtcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFsuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKSksXG4gICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCAtIHBsYXRmb3JtVGhpY2tuZXNzKSkpLFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcy5tYXAoc2VnID0+IFtzZWdbMF0gKyBtb2xkVmVydGV4Q291bnQsIHNlZ1sxXSArIG1vbGRWZXJ0ZXhDb3VudF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcy5tYXAoc2VnID0+IFtzZWdbMF0sIHNlZ1swXSArIG1vbGRWZXJ0ZXhDb3VudF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gWzAsIDVdLCBbMSwgNl0sIFsyLCA3XSwgWzMsIDhdLCBbNCwgOV0sXG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYW5nbGUgPiAoTWF0aC5QSSAqIDMgLyAyICsgYW5nbGUxKSAmJiBhbmdsZSA8IChNYXRoLlBJICogMiAtIERpcmVjdGlvbkFuZ2xlVG9sZXJhbmNlKSkge1xuICAgICAgICAgICAgICAgIHNlZ21lbnQuY29tcG9uZW50RGlyZWN0aW9uVHlwZSA9IENvbXBvbmVudERpcmVjdGlvblR5cGUuTGVmdEZyb250O1xuICAgICAgICAgICAgICAgIHBhcmFtLnBsYXRmb3JtTGVuZ3RoID0gc2VnbWVudC5lbmQuZGlzdGFuY2VUbyhzZWdtZW50LnN0YXJ0KTtcbiAgICAgICAgICAgICAgICBsZXQgcmlnaHRDb25uZWN0UG9pbnRzID0gW2Jhc2VMaW5lU3RhcnQsIHN0YXJ0LmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKV07XG4gICAgICAgICAgICAgICAgY29uc3QgYmFzZUxpbmVTdGFydERpc3RhbmNlID0gc3RhcnQuZGlzdGFuY2VUbyhiYXNlTGluZVN0YXJ0KTtcbiAgICAgICAgICAgICAgICBjb25zdCByaWdodFByb2plY3REaXN0YW5jZSA9IHN0YXJ0V2lkdGggLyAyICogTWF0aC5jb3MoYW5nbGUpO1xuICAgICAgICAgICAgICAgIGlmIChyaWdodFByb2plY3REaXN0YW5jZSA8IGJhc2VMaW5lU3RhcnREaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgcmlnaHRDb25uZWN0UG9pbnRzID0gW2Jhc2VMaW5lU3RhcnQsIGJhc2VMaW5lU3RhcnRdO1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiAoc3RhcnRXaWR0aCA8PSBwcmV2UGFyYW0uZW5kV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbDIgPSBzdGFydFdpZHRoIC8gMiAvIE1hdGguY29zKGFuZ2xlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGwyID4gYmFzZUxpbmVTdGFydERpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhMiA9IGwyIC0gYmFzZUxpbmVTdGFydERpc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYzIgPSBhMiAvIE1hdGgudGFuKE1hdGguUEkgKiAyIC0gYW5nbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHRDb25uZWN0UG9pbnRzID0gW3N0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLWJhc2VMaW5lU3RhcnREaXN0YW5jZSkpLCBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC1iYXNlTGluZVN0YXJ0RGlzdGFuY2UpKS5hZGRlZChwcmV2RGlyTm9ybWFsaXplZC5tdWx0aXBsaWVkKGMyKSldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHRDb25uZWN0UG9pbnRzID0gW3N0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLWwyKSldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMiAvIE1hdGguY29zKGFuZ2xlKSkpLFxuICAgICAgICAgICAgICAgICAgICAuLi5yaWdodENvbm5lY3RQb2ludHMsXG4gICAgICAgICAgICAgICAgICAgIC8vIHN0YXJ0LmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vbGRWZXJ0ZXhDb3VudCA9IG1vbGRTaGFwZS52ZXJ0aWNlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IGdlbmVyYXRlVGVtcExpbmVzTG9vcChtb2xkVmVydGV4Q291bnQpO1xuICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkpLFxuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgLSBwbGF0Zm9ybVRoaWNrbmVzcykpKSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMubWFwKHNlZyA9PiBbc2VnWzBdICsgbW9sZFZlcnRleENvdW50LCBzZWdbMV0gKyBtb2xkVmVydGV4Q291bnRdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMubWFwKHNlZyA9PiBbc2VnWzBdLCBzZWdbMF0gKyBtb2xkVmVydGV4Q291bnRdKSxcbiAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcGFyYW0ucGxhdGZvcm1MZW5ndGggPSBzZWdtZW50LmVuZC5kaXN0YW5jZVRvKHNlZ21lbnQuc3RhcnQpO1xuICAgICAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXG4gICAgICAgICAgICBzdGFydC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgIHN0YXJ0LmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpLFxuICAgICAgICBdO1xuICAgICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgM10sIFszLCAwXV07XG4gICAgICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbLi4ubW9sZFNoYXBlLnZlcnRpY2VzLFxuICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1wbGF0Zm9ybVRoaWNrbmVzcykpKSxcbiAgICAgICAgXTtcbiAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW1xuICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMsXG4gICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcy5tYXAoc2VnID0+IFtzZWdbMF0gKyA0LCBzZWdbMV0gKyA0XSksXG4gICAgICAgICAgICAgICAgWzAsIDRdLCBbMSwgNV0sIFsyLCA2XSwgWzMsIDddLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmNvbnN0IENvbHVtblN0ZXBUb2xlcmFuY2UgPSAxIC8gMTA7XG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVIYW5kcmFpbFNoYXBlKHN0YWlyUGFyYW0sIHNlZ21lbnRzKSB7XG4gICAgY29uc3QgeyBoYW5kcmFpbDogeyBzdXBwb3J0LCBoZWlnaHQsIGNvbHVtbjogeyBzdGVwLCBwYXJhbTogY29sdW1uUGFyYW0gfSB9IH0gPSBzdGFpclBhcmFtO1xuICAgIGlmIChzZWdtZW50cy5sZW5ndGggJiYgc3VwcG9ydCkge1xuICAgICAgICBjb25zdCBoYW5kcmFpbHMgPSBbXTtcbiAgICAgICAgY29uc3QgdW5WaXNpdGVkID0gbmV3IFNldChzZWdtZW50cyk7XG4gICAgICAgIGNvbnN0IHZpc2l0ZWQgPSBuZXcgTWFwKCk7XG4gICAgICAgIGZvciAoY29uc3Qgc2VnbWVudCBvZiBzZWdtZW50cykge1xuICAgICAgICAgICAgaWYgKCFzZWdtZW50Lm1vbGRTaGFwZS50ZW1wTGluZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZpc2l0ZWQuc2V0KHNlZ21lbnQucGFyYW0uaW5kZXgsIHsgbGVmdDogZmFsc2UsIHJpZ2h0OiBmYWxzZSwgbGluZTNkSW5kZXhlczogbmV3IFNldCgpIH0pO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjdXJyZW50ID0gW3tcbiAgICAgICAgICAgICAgICBzZWdtZW50OiBzZWdtZW50c1swXSxcbiAgICAgICAgICAgICAgICBsaW5lM2RJbmQ6IGdldFNlZ21lbnRTdGFydEFuZEJhc2VMaW5lM2Qoc2VnbWVudHNbMF0sIHNlZ21lbnRzKS5zdGFydExpbmUubGluZTNkSW5kLFxuICAgICAgICAgICAgICAgIGxlZnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN0YXJ0OiB0cnVlLFxuICAgICAgICAgICAgfV07XG4gICAgICAgIGxldCBoYW5kcmFpbCA9IHsgcmFpbDogW10sIGNvbHVtbnM6IFtdIH07XG4gICAgICAgIGNvbnN0IHN0ZXBUb2xlcmFuY2UgPSBzdGVwICogQ29sdW1uU3RlcFRvbGVyYW5jZTtcbiAgICAgICAgd2hpbGUgKGN1cnJlbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgbmV4dCA9IFtdO1xuICAgICAgICAgICAgZm9yIChjb25zdCB7IHNlZ21lbnQ6IGN1cnJlbnRTZWdtZW50LCBsaW5lM2RJbmQsIHN0YXJ0UG9pbnQsIGxlZnQgfSBvZiBjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBwYXJhbTogeyBpbmRleCwgdHlwZSwgc3RhcnRXaWR0aCwgZW5kV2lkdGgsIGhvcml6b250YWxTdGVwLCB2ZXJ0aWNhbFN0ZXAsIHVwd2FyZCB9LCBzdGFydCwgZW5kLCBzdGFydEhlaWdodCwgZW5kSGVpZ2h0LCBtb2xkU2hhcGU6IHsgdmVydGljZXM6IG1vbGRWZXJ0aWNlcywgdGVtcExpbmVzOiBtb2xkVGVtcExpbmVzLCBzdGVwQ291bnQgfSwgbmV4dENvbXBvbmVudHMsIGJhc2VDb21wb25lbnQsIGNpcmNsZVRhbmdlbnQsIHN0YXJ0TG9ja2VkLCBjb21wb25lbnREaXJlY3Rpb25UeXBlLCBjaXJjdWxhclNpZGUsIH0gPSBjdXJyZW50U2VnbWVudDtcbiAgICAgICAgICAgICAgICB1blZpc2l0ZWQuZGVsZXRlKGN1cnJlbnRTZWdtZW50KTtcbiAgICAgICAgICAgICAgICBpZiAoIXN0YXJ0TG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmICgoIXN0YXJ0TG9ja2VkICYmIHR5cGUgIT09IENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpcikgfHwgKCFjaXJjbGVUYW5nZW50ICYmIHR5cGUgPT09IENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpcikpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHN0ZXBIZWlnaHQgPSB1cHdhcmQgPyB2ZXJ0aWNhbFN0ZXAgOiAtdmVydGljYWxTdGVwO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9mZnNldExlbmd0aCA9IE1hdGgubWF4KGNvbHVtblBhcmFtLmhlaWdodCB8fCAwLCBjb2x1bW5QYXJhbS53aWR0aCB8fCAwLCBjb2x1bW5QYXJhbS5yYWRpdXMgfHwgMCkgKiAzO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgoc2VnbWVudHMsIGJhc2VDb21wb25lbnQgPT09IG51bGwgfHwgYmFzZUNvbXBvbmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmFzZUNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBzdGFydExpbmU6IHsgbGluZTNkSW5kOiBzdGFydExpbmUzZEluZCB9LCBiYXNlTGluZTogeyBkaXI6IGJhc2VMaW5lM2REaXIsIGVuZDogYmFzZUxpbmUzZEVuZCB9LCB9ID0gZ2V0U2VnbWVudFN0YXJ0QW5kQmFzZUxpbmUzZChjdXJyZW50U2VnbWVudCwgc2VnbWVudHMsIGJhc2VTZWdtZW50KTtcbiAgICAgICAgICAgICAgICAvLyBsZXQgYmFzZUxpbmUzZERpcjogS1ZlY3RvcjNkIHwgdW5kZWZpbmVkID0gYmFzZUNvbXBvbmVudD8ubGluZTNkID8gYmFzZUNvbXBvbmVudC5saW5lM2QuZW5kLnN1YnRyYWN0ZWQoYmFzZUNvbXBvbmVudC5saW5lM2Quc3RhcnQpLm5vcm1hbGl6ZWQoKSA6IERpcmVjdGlvblg7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRUb0VuZERpciA9IGVuZC5zdWJ0cmFjdGVkKHN0YXJ0KS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgbGV0IGZyb250RGlyID0gY2lyY2xlVGFuZ2VudCA/IGNpcmNsZVRhbmdlbnQgOiBzdGFydFRvRW5kRGlyO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFuZ2xlID0gZnJvbnREaXIuYW5nbGUoYmFzZUxpbmUzZERpcik7XG4gICAgICAgICAgICAgICAgY29uc3QgZGVsdGFBbmdsZSA9IE1hdGguYWJzKGFuZ2xlIC0gTWF0aC5QSSAvIDIpO1xuICAgICAgICAgICAgICAgIGlmIChkZWx0YUFuZ2xlIDw9IERpcmVjdGlvbkFuZ2xlVG9sZXJhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZyb250RGlyID0gYmFzZUxpbmUzZERpci5jcm9zcyhEaXJlY3Rpb25aKS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBsZWZ0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhmcm9udERpcik7XG4gICAgICAgICAgICAgICAgbGV0IHNwID0gc3RhcnQuYWRkZWQobGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyICogKGxlZnQgPyAxIDogLTEpKSk7XG4gICAgICAgICAgICAgICAgbGV0IGVwID0gZW5kLmFkZGVkKGxlZnREaXIubXVsdGlwbGllZChlbmRXaWR0aCAvIDIgKiAobGVmdCA/IDEgOiAtMSkpKTtcbiAgICAgICAgICAgICAgICBsZXQgbGFzdExlbmd0aCA9IHNwLmRpc3RhbmNlVG8oZXApO1xuICAgICAgICAgICAgICAgIGxldCBzcFRvRXBEaXIgPSBlcC5zdWJ0cmFjdGVkKHNwKS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgbGV0IG5leHRTdGFydFBvaW50ID0gbGVmdCA/IHNwIDogZXA7XG4gICAgICAgICAgICAgICAgbGV0IHB1c2hFbmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIC8vIGxldCBzaWJsaW5nU2VnbWVudEluZHMgPSBiYXNlU2VnbWVudD8ubmV4dENvbXBvbmVudHNbYmFzZUNvbXBvbmVudD8ubGluZTNkSW5kZXggfHwgMF07XG4gICAgICAgICAgICAgICAgLy8gbGV0IG5leHRTaWJsaW5nU2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHNlZ21lbnRzLCBbLi4uc2libGluZ1NlZ21lbnRJbmRzIHx8IFtdXT8uZmluZChpbmQgPT4ge1xuICAgICAgICAgICAgICAgIC8vICAgICBjb25zdCB2aXNpdGVkU2libGluZyA9IHZpc2l0ZWQuZ2V0KGluZCk7XG4gICAgICAgICAgICAgICAgLy8gICAgIHJldHVybiAhdmlzaXRlZFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgLy8gfSkpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnN0IHZpc2l0ZWRCYXNlU2VnbWVudCA9IGJhc2VTZWdtZW50ID8gdmlzaXRlZC5nZXQoYmFzZVNlZ21lbnQucGFyYW0uaW5kZXgpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmUzZERpciA9IG1vbGRWZXJ0aWNlc1ttb2xkVGVtcExpbmVzW2xpbmUzZEluZF1bMV1dLnN1YnRyYWN0ZWQobW9sZFZlcnRpY2VzW21vbGRUZW1wTGluZXNbbGluZTNkSW5kXVswXV0pLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhsaW5lM2REaXIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZpc2l0ZWRSZWNvcmQgPSB2aXNpdGVkLmdldChpbmRleCk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGluZTNkID0gbW9sZFRlbXBMaW5lc1tsaW5lM2RJbmRdO1xuICAgICAgICAgICAgICAgICAgICBzcCA9IHN0YXJ0UG9pbnQgfHwgbW9sZFZlcnRpY2VzW2xpbmUzZFswXV07XG4gICAgICAgICAgICAgICAgICAgIGVwID0gbW9sZFZlcnRpY2VzW2xpbmUzZFsxXV07XG4gICAgICAgICAgICAgICAgICAgIGxhc3RMZW5ndGggPSBzcC5kaXN0YW5jZVRvKGVwKTtcbiAgICAgICAgICAgICAgICAgICAgc3BUb0VwRGlyID0gZXAuc3VidHJhY3RlZChzcCkubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0TGluZTNkSW5kID0gKGxpbmUzZEluZCArIDEpICUgbW9sZFRlbXBMaW5lcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZpc2l0ZWRMaW5lM2RJbmRleGVzID0gdmlzaXRlZFJlY29yZCA9PT0gbnVsbCB8fCB2aXNpdGVkUmVjb3JkID09PSB2b2lkIDAgPyB2b2lkIDAgOiB2aXNpdGVkUmVjb3JkLmxpbmUzZEluZGV4ZXM7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzRW50cmFuY2UgPSAodmlzaXRlZExpbmUzZEluZGV4ZXMgPT09IG51bGwgfHwgdmlzaXRlZExpbmUzZEluZGV4ZXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZpc2l0ZWRMaW5lM2RJbmRleGVzLmhhcyhsaW5lM2RJbmQpKSAmJiAodmlzaXRlZExpbmUzZEluZGV4ZXMgPT09IG51bGwgfHwgdmlzaXRlZExpbmUzZEluZGV4ZXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZpc2l0ZWRMaW5lM2RJbmRleGVzLmhhcyhuZXh0TGluZTNkSW5kKSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IGN1cnJlbnRTdGFydExpbmUzZEluZGV4ID0gZ2V0U2VnbWVudFN0YXJ0QW5kQmFzZUxpbmUzZChjdXJyZW50U2VnbWVudCwgc2VnbWVudHMpLnN0YXJ0TGluZS5saW5lM2RJbmQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc0VudHJhbmNlU2VnbWVudCA9IGxpbmUzZEluZCA9PT0gc3RhcnRMaW5lM2RJbmQ7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IG5leHRTZWdtZW50SW5kZXhlcyA9IG5leHRDb21wb25lbnRzW2xpbmUzZEluZF07XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZWFyZXN0U2VnbWVudDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBuZXh0U2VnbWVudEluZGV4IG9mIG5leHRDb21wb25lbnRzW2xpbmUzZEluZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgoc2VnbWVudHMsIG5leHRTZWdtZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBzdGFydCB9ID0gbmV4dFNlZ21lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZHMgPSBzdGFydC5kaXN0YW5jZVRvKHNwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZSA9IHN0YXJ0LmRpc3RhbmNlVG8oZXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZpc2l0TmV4dFJlY29yZCA9IHZpc2l0ZWQuZ2V0KG5leHRTZWdtZW50LnBhcmFtLmluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0Q29tcG9uZW50U3RhcnRMaW5lM2RJbmQgPSBnZXRTZWdtZW50U3RhcnRBbmRCYXNlTGluZTNkKG5leHRTZWdtZW50LCBzZWdtZW50cykuc3RhcnRMaW5lLmxpbmUzZEluZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNFcXVhbChkcyArIGRlLCBsYXN0TGVuZ3RoKSAmJiAhKHZpc2l0TmV4dFJlY29yZCA9PT0gbnVsbCB8fCB2aXNpdE5leHRSZWNvcmQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZpc2l0TmV4dFJlY29yZC5yaWdodCkgJiYgISh2aXNpdE5leHRSZWNvcmQgPT09IG51bGwgfHwgdmlzaXROZXh0UmVjb3JkID09PSB2b2lkIDAgPyB2b2lkIDAgOiB2aXNpdE5leHRSZWNvcmQubGluZTNkSW5kZXhlcy5oYXMobmV4dENvbXBvbmVudFN0YXJ0TGluZTNkSW5kKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFuZWFyZXN0U2VnbWVudCB8fCBuZWFyZXN0U2VnbWVudC5kaXN0YW5jZSA+IGRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWFyZXN0U2VnbWVudCA9IHsgc2VnbWVudDogbmV4dFNlZ21lbnQsIGRpc3RhbmNlOiBkcyB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxldCBsYXN0RGlzdGFuY2UgPSBsYXN0TGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmVhcmVzdFNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHsgbW9sZFNoYXBlOiB7IHZlcnRpY2VzOiBuZWFyZXN0VmVydGljZXMsIHRlbXBMaW5lczogbmVhcmVzdFRlbXBMaW5lcyB9IH0gPSBuZWFyZXN0U2VnbWVudC5zZWdtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBlbmRPbkJhc2VMaW5lIH0gPSBnZXRTZWdtZW50U3RhcnRBbmRCYXNlTGluZTNkKG5lYXJlc3RTZWdtZW50LnNlZ21lbnQsIHNlZ21lbnRzKS5zdGFydExpbmU7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBuZWFyZXN0TGluZTNkID0gbmVhcmVzdFNlZ21lbnQuc2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtID8gbmVhcmVzdFRlbXBMaW5lc1tuZWFyZXN0TGluZTNkSW5kXSA6IG5lYXJlc3RUZW1wTGluZXNbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBuZWFyZXN0TGluZTNkRGlyID0gbmVhcmVzdFZlcnRpY2VzW25lYXJlc3RMaW5lM2RbMV1dLnN1YnRyYWN0ZWQobmVhcmVzdFZlcnRpY2VzW25lYXJlc3RMaW5lM2RbMF1dKS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcCA9IGVuZE9uQmFzZUxpbmU7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlcCA9IG5lYXJlc3RWZXJ0aWNlc1tuZWFyZXN0TGluZTNkWzFdXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwVG9FcERpciA9IGVwLnN1YnRyYWN0ZWQoc3ApLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcFRvRXBEaXIuZG90KGxpbmUzZERpcikgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdERpc3RhbmNlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoRW5kID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFN0YXJ0UG9pbnQgPSBzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3REaXN0YW5jZSA9IHNwLmRpc3RhbmNlVG8oZXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTdGFydFBvaW50ID0gaXNQbGF0Zm9ybShuZWFyZXN0U2VnbWVudC5zZWdtZW50KSA/IGVwIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGFzdExlbmd0aCA9IHNwLmRpc3RhbmNlVG8oZXApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzRW50cmFuY2UgJiYgaGFzRW50cmFuY2VTZWdtZW50ICYmIGJhc2VTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCB7IGxpbmUzZDogYmFzZUxpbmUzZCwgZGlyOiBiYXNlTGluZTNkRGlyIH0gPSBnZXRTZWdtZW50U3RhcnRBbmRCYXNlTGluZTNkKGN1cnJlbnRTZWdtZW50LCBzZWdtZW50cywgYmFzZVNlZ21lbnQpLmJhc2VMaW5lO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgeyBtb2xkU2hhcGU6IHsgdmVydGljZXM6IGJhc2VWZXJ0aWNlcywgdGVtcExpbmVzOiBiYXNlVGVtcExpbmVzIH0gfSA9IGJhc2VTZWdtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgYmFzZUxpbmUzZCA9IGJhc2VTZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gPyBiYXNlVGVtcExpbmVzW2Jhc2VDb21wb25lbnQ/LmxpbmUzZEluZGV4IHx8IDBdIDogYmFzZVRlbXBMaW5lc1tiYXNlVGVtcExpbmVzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYmFzZUxpbmUzZERpciA9IGJhc2VWZXJ0aWNlc1tiYXNlTGluZTNkWzFdXS5zdWJ0cmFjdGVkKGJhc2VWZXJ0aWNlc1tiYXNlTGluZTNkWzBdXSkubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGJhc2VTZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gJiYgbmV4dFNpYmxpbmdTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgLy8gZG9uJ3QgY2FyZSBiZWNhdXNlIG5leHQgaXMgcGxhdGZvcm0gKG5leHQgd2lsbCBkZWFsIHRoZSBjYXNlKSBvciBzdGFpciAob25seSBoYXZlIG9uZSBuZXh0Q29tcG9uZW50IHdoaWNoIGlzIGN1cnJlbnRTZWdtZW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGNvbnN0IHsgc3RhcnQ6IG5leHRTaWJsaW5nU2VnbWVudFN0YXJ0TGluZVN0YXJ0IH0gPSBnZXRTZWdtZW50U3RhcnRBbmRCYXNlTGluZTNkKG5leHRTaWJsaW5nU2VnbWVudCwgc2VnbWVudHMsIGJhc2VTZWdtZW50KS5zdGFydExpbmU7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgZXAgPSBuZXh0U2libGluZ1NlZ21lbnRTdGFydExpbmVTdGFydDtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAvLyBpZiAobmV4dFNpYmxpbmdTZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAvLyAgICAgY29uc3QgbmV4dFNpYmxpbmdTZWdTdGFydExpbmUzZCA9IG5leHRTaWJsaW5nU2VnbWVudC5tb2xkU2hhcGUudGVtcExpbmVzW2dldFNlZ21lbnRTdGFydEFuZEJhc2VMaW5lM2QobmV4dFNpYmxpbmdTZWdtZW50LCBzZWdtZW50cykuc3RhcnRMaW5lLmxpbmUzZEluZF07XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgLy8gICAgIGVwID0gbmV4dFNpYmxpbmdTZWdtZW50Lm1vbGRTaGFwZS52ZXJ0aWNlc1tuZXh0U2libGluZ1NlZ1N0YXJ0TGluZTNkWzFdXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIC8vICAgICBlcCA9IG5leHRTaWJsaW5nU2VnbWVudC5zdGFydC5hZGRlZChiYXNlTGluZTNkRGlyLm11bHRpcGxpZWQoLW5leHRTaWJsaW5nU2VnbWVudC5wYXJhbS5zdGFydFdpZHRoIC8gMikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcCA9IGJhc2VMaW5lM2RFbmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzcFRvRXBEaXIgPSBlcC5zdWJ0cmFjdGVkKHNwKS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BUb0VwRGlyLmRvdChiYXNlTGluZTNkRGlyKSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0RGlzdGFuY2UgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hFbmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0Q29ybmVyRGlzdGFuY2UgPSBlcC5kaXN0YW5jZVRvKHNwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dENvcm5lckRpc3RhbmNlID4gb2Zmc2V0TGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTdGFydFBvaW50ID0gc3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U3RhcnRQb2ludCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0RGlzdGFuY2UgPSBzcC5kaXN0YW5jZVRvKGVwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U3RhcnRQb2ludCA9IGlzUGxhdGZvcm0oYmFzZVNlZ21lbnQpID8gZXAgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNFbnRyYW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdERpc3RhbmNlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hFbmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hFbmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBzcFRvRXBEaXIgPSBlcC5zdWJ0cmFjdGVkKHNwKS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0Qm90dG9tUHQgPSBzcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKS5hZGRlZChvZmZzZXREaXIubXVsdGlwbGllZChvZmZzZXRMZW5ndGgpKS5hZGRlZChzcFRvRXBEaXIubXVsdGlwbGllZChzdGFydFBvaW50ID8gMCA6IG9mZnNldExlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobGFzdERpc3RhbmNlID4gMCB8fCAobGFzdERpc3RhbmNlID09PSAwICYmICFzdGFydFBvaW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHVzaCByYWlsXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5yYWlsLnB1c2goZmlyc3RCb3R0b21QdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIHB1c2ggY29sdW1uc1xuICAgICAgICAgICAgICAgICAgICBpZiAobGFzdERpc3RhbmNlID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBEaXN0YW5jZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAodGVtcERpc3RhbmNlIDw9IGxhc3REaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzRW5kID0gdGVtcERpc3RhbmNlID09PSBsYXN0RGlzdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYm90dG9tUG9pbnQgPSB0ZW1wRGlzdGFuY2UgPiAwID8gc3AuYWRkZWQoc3BUb0VwRGlyLm11bHRpcGxpZWQodGVtcERpc3RhbmNlKSkuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkuYWRkZWQob2Zmc2V0RGlyLm11bHRpcGxpZWQob2Zmc2V0TGVuZ3RoKSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdEJvdHRvbVB0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsLmNvbHVtbnMucHVzaChbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbVBvaW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b21Qb2ludC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsLnJhaWwucHVzaChib3R0b21Qb2ludC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWx0YURpc3RhbmNlID0gKGxhc3REaXN0YW5jZSAtIHRlbXBEaXN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcERpc3RhbmNlICs9IChkZWx0YURpc3RhbmNlIDw9IChzdGVwICsgc3RlcFRvbGVyYW5jZSkgJiYgZGVsdGFEaXN0YW5jZSA+PSBzdGVwVG9sZXJhbmNlKSA/IChwdXNoRW5kID8gZGVsdGFEaXN0YW5jZSA6IEluZmluaXR5KSA6IHN0ZXA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKHB1c2hFbmQgJiYgKG5lYXJlc3RTZWdtZW50IHx8IChpc0VudHJhbmNlICYmIGxhc3REaXN0YW5jZSA+IDApKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgLy8gcHVzaCByYWlsXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBoYW5kcmFpbC5yYWlsLnB1c2goZXAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0ICsgaGVpZ2h0KSkuYWRkZWQob2Zmc2V0RGlyLm11bHRpcGxpZWQob2Zmc2V0TGVuZ3RoKSkpO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgaWYgKHRlbXBEaXN0YW5jZSAtIHN0ZXAgPCBsYXN0RGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBjb25zdCBsYXN0Qm90dG9tUG9pbnQgPSBzcC5hZGRlZChzcFRvRXBEaXIubXVsdGlwbGllZChsYXN0RGlzdGFuY2UpKS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKS5hZGRlZChvZmZzZXREaXIubXVsdGlwbGllZChvZmZzZXRMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBoYW5kcmFpbC5jb2x1bW5zLnB1c2goW1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBsYXN0Qm90dG9tUG9pbnQsXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGxhc3RCb3R0b21Qb2ludC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSksXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG5lYXJlc3RTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQ6IG5lYXJlc3RTZWdtZW50LnNlZ21lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZTNkSW5kOiBnZXRTZWdtZW50U3RhcnRBbmRCYXNlTGluZTNkKG5lYXJlc3RTZWdtZW50LnNlZ21lbnQsIHNlZ21lbnRzKS5zdGFydExpbmUubGluZTNkSW5kLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFBvaW50OiBuZXh0U3RhcnRQb2ludCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRW50cmFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmFzZVNlZ21lbnQgJiYgaGFzRW50cmFuY2VTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNpYmxpbmdTZWdtZW50SW5kcyA9IGJhc2VTZWdtZW50Lm5leHRDb21wb25lbnRzW2Jhc2VDb21wb25lbnQubGluZTNkSW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAobmV4dFNpYmxpbmdTZWdtZW50ICYmIGJhc2VTZWdtZW50LnBhcmFtLnR5cGUgIT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIC8vIG5ldmVyIGhhcHBlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgbmV4dC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBzZWdtZW50OiBuZXh0U2libGluZ1NlZ21lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgbGluZTNkSW5kOiBnZXRTZWdtZW50U3RhcnRBbmRCYXNlTGluZTNkKG5leHRTaWJsaW5nU2VnbWVudCwgc2VnbWVudHMpLnN0YXJ0TGluZS5saW5lM2RJbmQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgbGVmdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgc3RhcnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIHN0YXJ0UG9pbnQ6IG5leHRTdGFydFBvaW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmICgodmlzaXRlZEJhc2VTZWdtZW50Py5yaWdodCAmJiAhdmlzaXRlZEJhc2VTZWdtZW50LmxlZnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50OiBiYXNlU2VnbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUzZEluZDogYmFzZVNlZ21lbnQucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSA/IChiYXNlQ29tcG9uZW50ID09PSBudWxsIHx8IGJhc2VDb21wb25lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJhc2VDb21wb25lbnQubGluZTNkSW5kZXgpIHx8IDAgOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0UG9pbnQ6IG5leHRTdGFydFBvaW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBlbmQgb2YgdGhpcyBwYXRjaCwgdGhlIHBhdGNoIGFyZSBzdGFydCB3aXRoIHBsYXRmb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlscy5wdXNoKGhhbmRyYWlsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWwgPSB7IHJhaWw6IFtdLCBjb2x1bW5zOiBbXSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVuZCBvZiB0aGlzIGxpbmUzZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQ6IGN1cnJlbnRTZWdtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lM2RJbmQ6IG5leHRMaW5lM2RJbmQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB2aXNpdGVkTGluZTNkSW5kZXhlcyA9PT0gbnVsbCB8fCB2aXNpdGVkTGluZTNkSW5kZXhlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmlzaXRlZExpbmUzZEluZGV4ZXMuYWRkKGxpbmUzZEluZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbHVtbkFjdHVhbEhlaWdodCA9IGhlaWdodCArIHZlcnRpY2FsU3RlcCAvIDI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzUmlnaHRTdGFpciA9IGNvbXBvbmVudERpcmVjdGlvblR5cGUgPT09IENvbXBvbmVudERpcmVjdGlvblR5cGUuUmlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzTGVmdFN0YWlyID0gY29tcG9uZW50RGlyZWN0aW9uVHlwZSA9PT0gQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5MZWZ0O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFpclJhaWwgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhaXJDb2x1bW5zID0gW107XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvcm5lckJhc2VEaXIgPSAoIWxlZnQgJiYgaXNSaWdodFN0YWlyKSB8fCAobGVmdCAmJiBpc0xlZnRTdGFpcikgPyBsZWZ0RGlyIDogYmFzZUxpbmUzZERpcjtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvcm5lclN0YXJ0SGVpZ2h0ID0gbGVmdCA/IGVuZEhlaWdodCA6IHN0YXJ0SGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29ybmVyU2lkZVdpZHRoID0gbGVmdCA/IGVuZFdpZHRoIDogc3RhcnRXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNpZGVDb3JuZXJTdGFydCA9IGxlZnQgPyBlbmQgOiBzdGFydDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvcm5lckVuZCA9IHNpZGVDb3JuZXJTdGFydC5hZGRlZChjb3JuZXJCYXNlRGlyLm11bHRpcGxpZWQoKGNvcm5lclNpZGVXaWR0aCAvIDIgKyBvZmZzZXRMZW5ndGgpICogKGxlZnQgPyAxIDogLTEpKSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb3JuZXJEaXN0YW5jZSA9IChzdGFydFBvaW50IHx8IHNwKS5kaXN0YW5jZVRvKGNvcm5lckVuZCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGFsb25nIGNvcm5lckJhc2VEaXJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvcm5lclNwVG9FcERpciA9IGNvcm5lckVuZC5zdWJ0cmFjdGVkKHN0YXJ0UG9pbnQgfHwgc3ApLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvcm5lck9mZnNldERpciA9IERpcmVjdGlvblouY3Jvc3MoY29ybmVyU3BUb0VwRGlyKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvcm5lckFkZGl0aW9uYWxIZWlnaHQgPSAhbGVmdCAmJiAhaXNMZWZ0U3RhaXIgJiYgdXB3YXJkID8gc3RlcEhlaWdodCA6IDA7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRDb3JuZXJSYWlsID0gW107XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRDb3JuZXJDb2x1bW5zID0gW107XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGFydFBvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEhlYWREaXN0YW5jZSA9IHN0ZXA7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkQ29ybmVyUmFpbC5wdXNoKHN0YXJ0UG9pbnQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGNvcm5lclN0YXJ0SGVpZ2h0ICsgY29ybmVyQWRkaXRpb25hbEhlaWdodCArIGhlaWdodCkpLmFkZGVkKGNvcm5lck9mZnNldERpci5tdWx0aXBsaWVkKG9mZnNldExlbmd0aCkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0ZW1wSGVhZERpc3RhbmNlIDwgY29ybmVyRGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBib3R0b21Qb2ludCA9IHN0YXJ0UG9pbnQuYWRkZWQoY29ybmVyU3BUb0VwRGlyLm11bHRpcGxpZWQodGVtcEhlYWREaXN0YW5jZSkpLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChjb3JuZXJTdGFydEhlaWdodCArIGNvcm5lckFkZGl0aW9uYWxIZWlnaHQpKS5hZGRlZChjb3JuZXJPZmZzZXREaXIubXVsdGlwbGllZChvZmZzZXRMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkQ29ybmVyQ29sdW1ucy5wdXNoKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tUG9pbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbVBvaW50LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wSGVhZERpc3RhbmNlICs9IHN0ZXA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWxlZnQgJiYgaXNMZWZ0U3RhaXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0Qm90dG9tUG9pbnQgPSBjb3JuZXJFbmQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGNvcm5lclN0YXJ0SGVpZ2h0ICsgY29ybmVyQWRkaXRpb25hbEhlaWdodCkpLmFkZGVkKGNvcm5lck9mZnNldERpci5tdWx0aXBsaWVkKG9mZnNldExlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHB1c2ggcmFpbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRDb3JuZXJSYWlsLnB1c2gobGFzdEJvdHRvbVBvaW50LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChjb3JuZXJEaXN0YW5jZSAtIHRlbXBIZWFkRGlzdGFuY2UgKyBzdGVwKSA+IHN0ZXBUb2xlcmFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgbGFzdEJvdHRvbVBvaW50ID0gZXAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGxlZnQgPyBlbmRIZWlnaHQgOiBzdGFydEhlaWdodCkpLmFkZGVkKGNvcm5lck9mZnNldERpci5tdWx0aXBsaWVkKG9mZnNldExlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBoYW5kcmFpbC5yYWlsLnB1c2gobGFzdEJvdHRvbVBvaW50LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRDb3JuZXJDb2x1bW5zLnB1c2goW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdEJvdHRvbVBvaW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdEJvdHRvbVBvaW50LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG5leHRTdGFydFBvaW50ID0gbGVmdCA/IHNwIDogZXA7XG4gICAgICAgICAgICAgICAgICAgIC8vIG5leHQgc2VnbWVudCBzdGFydFdpZHRoICE9PSBjdXJyZW50U2VnbWVudCBlbmRXaWR0aFxuICAgICAgICAgICAgICAgICAgICBwdXNoRW5kID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHJlYXNvbmFibGVTdGVwID0gTWF0aC5jZWlsKHN0ZXAgLyBob3Jpem9udGFsU3RlcCkgKiBob3Jpem9udGFsU3RlcDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVhc29uYWJsZVN0ZXBDb3VudCA9IE1hdGguY2VpbChzdGVwIC8gaG9yaXpvbnRhbFN0ZXApO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcFN0ZXBDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFyY0Nob3JkQW5nbGUgPSBjaXJjbGVUYW5nZW50ID8gc3RhcnRUb0VuZERpci5hbmdsZShjaXJjbGVUYW5nZW50KSA6IDA7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBDb21wb25lbnRUeXBlLlN0cmFpZ2h0U3RhaXIgfHwgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpciAmJiAoYXJjQ2hvcmRBbmdsZSA8PSBEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSB8fCAhY2lyY2xlVGFuZ2VudCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0TGVuZ3RoID0gc3AuZGlzdGFuY2VUbyhlcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwdXNoIHJhaWxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIChkZWx0YUFuZ2xlID4gRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBjb25zdCBjb3JuZXJCb3R0b21QdCA9IHNwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCkpLmFkZGVkKGJhc2VMaW5lM2REaXIubXVsdGlwbGllZCgoc3RhcnRXaWR0aCAvIDIgLSBvZmZzZXRMZW5ndGgpICogKGxlZnQgPyAxIDogLTEpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgc3RhaXJSYWlsLnB1c2goY29ybmVyQm90dG9tUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBzdGFpckNvbHVtbnMucHVzaChbXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNvcm5lckJvdHRvbVB0LFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBjb3JuZXJCb3R0b21QdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFpclJhaWwucHVzaChzcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBoZWlnaHQgKyAodXB3YXJkID8gMSA6IDApICogc3RlcEhlaWdodCkpLmFkZGVkKGxlZnREaXIubXVsdGlwbGllZChsZWZ0ID8gLW9mZnNldExlbmd0aCA6IG9mZnNldExlbmd0aCkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdXB3YXJkICYmIHN0ZXBDb3VudCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpclJhaWwucHVzaChzcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBoZWlnaHQpKS5hZGRlZChmcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSkuYWRkZWQobGVmdERpci5tdWx0aXBsaWVkKGxlZnQgPyAtb2Zmc2V0TGVuZ3RoIDogb2Zmc2V0TGVuZ3RoKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHVzaCBjb2x1bW5zXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBsZXQgdGVtcERpc3RhbmNlID0gaG9yaXpvbnRhbFN0ZXAgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHRlbXBTdGVwQ291bnQgPCBzdGVwQ291bnQgLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VySG9yU3RlcERpc3RhbmNlID0gKHRlbXBTdGVwQ291bnQgKyAwLjUpICogaG9yaXpvbnRhbFN0ZXA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyVmVyU3RlcERpc3RhbmNlID0gKHRlbXBTdGVwQ291bnQgKyAodXB3YXJkID8gMSA6IDApKSAqIHN0ZXBIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYm90dG9tUG9pbnQgPSBzcC5hZGRlZChmcm9udERpci5tdWx0aXBsaWVkKGN1ckhvclN0ZXBEaXN0YW5jZSkpLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIGN1clZlclN0ZXBEaXN0YW5jZSkpLmFkZGVkKGxlZnREaXIubXVsdGlwbGllZChsZWZ0ID8gLW9mZnNldExlbmd0aCA6IG9mZnNldExlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyQ29sdW1ucy5wdXNoKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tUG9pbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbVBvaW50LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCghdXB3YXJkICYmIHRlbXBTdGVwQ291bnQgPT09IDAgPyBoZWlnaHQgOiBjb2x1bW5BY3R1YWxIZWlnaHQpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCB0ZW1wU3RlcENvdW50ID0gTWF0aC5mbG9vcih0ZW1wRGlzdGFuY2UgLyBob3Jpem9udGFsU3RlcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGVtcERpc3RhbmNlICs9IHJlYXNvbmFibGVTdGVwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBTdGVwQ291bnQgKz0gcmVhc29uYWJsZVN0ZXBDb3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGVwQ291bnQgPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVwd2FyZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpclJhaWwucHVzaChzcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBoZWlnaHQgKyAodXB3YXJkID8gc3RlcENvdW50IDogKHN0ZXBDb3VudCAtIChzdGVwQ291bnQgPiAyID8gMiA6IDEpKSkgKiBzdGVwSGVpZ2h0KSkuYWRkZWQoZnJvbnREaXIubXVsdGlwbGllZCgoc3RlcENvdW50IC0gMSkgKiBob3Jpem9udGFsU3RlcCkpLmFkZGVkKGxlZnREaXIubXVsdGlwbGllZChsZWZ0ID8gLW9mZnNldExlbmd0aCA6IG9mZnNldExlbmd0aCkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0b3RhbExlbmd0aCA9IE1hdGguYWJzKGVuZC5zdWJ0cmFjdGVkKHN0YXJ0KS5kb3QoZnJvbnREaXIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByZXZUb3RhbFN0ZXBMZW5ndGggPSAoc3RlcENvdW50IC0gMSkgKiBob3Jpem9udGFsU3RlcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RTdGVwTGVuZ3RoID0gbGFzdExlbmd0aCAtIHByZXZUb3RhbFN0ZXBMZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFpclJhaWwucHVzaChzcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBoZWlnaHQgKyAodXB3YXJkID8gc3RlcENvdW50IDogKE1hdGgubWF4KDAsIHRvdGFsTGVuZ3RoIC0gaG9yaXpvbnRhbFN0ZXApIC8gaG9yaXpvbnRhbFN0ZXApKSAqIHN0ZXBIZWlnaHQpKS5hZGRlZChmcm9udERpci5tdWx0aXBsaWVkKHRvdGFsTGVuZ3RoKSkuYWRkZWQobGVmdERpci5tdWx0aXBsaWVkKGxlZnQgPyAtb2Zmc2V0TGVuZ3RoIDogb2Zmc2V0TGVuZ3RoKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRlbXBTdGVwQ291bnQgLSByZWFzb25hYmxlU3RlcENvdW50IDw9IHN0ZXBDb3VudCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0Qm90dG9tUG9pbnQgPSBzcC5hZGRlZChmcm9udERpci5tdWx0aXBsaWVkKHByZXZUb3RhbFN0ZXBMZW5ndGggKyBsYXN0U3RlcExlbmd0aCAvIDIpKS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoZW5kSGVpZ2h0ICsgKHVwd2FyZCA/IDAgOiAtc3RlcEhlaWdodCkpKS5hZGRlZChsZWZ0RGlyLm11bHRpcGxpZWQobGVmdCA/IC1vZmZzZXRMZW5ndGggOiBvZmZzZXRMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpckNvbHVtbnMucHVzaChbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RCb3R0b21Qb2ludCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdEJvdHRvbVBvaW50LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQgKyAodXB3YXJkID8gMCA6ICh2ZXJ0aWNhbFN0ZXAgKiAoMSAtIGxhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXAgLyAyKSkpKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXh0IHNlZ21lbnQgc3RhcnRXaWR0aCAhPT0gY3VycmVudFNlZ21lbnQgZW5kV2lkdGhcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwID0gbGVmdCA/IHN0YXJ0LmFkZGVkKGJhc2VMaW5lM2REaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMiAtIG9mZnNldExlbmd0aCkpIDogZW5kLmFkZGVkKGxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIgKyBvZmZzZXRMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChjaXJjbGVUYW5nZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0YW5nZW50TGVmdERpciA9IERpcmVjdGlvblouY3Jvc3MoY2lyY2xlVGFuZ2VudCkubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRFbmREaXN0YW5jZSA9IHN0YXJ0LmRpc3RhbmNlVG8oZW5kKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1heFdpZHRoID0gTWF0aC5tYXgoc3RhcnRXaWR0aCwgZW5kV2lkdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZW5kQW5nbGUgPSBzdGFydFRvRW5kRGlyLmFuZ2xlVG8oY2lyY2xlVGFuZ2VudCwgRGlyZWN0aW9uWik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpc0xlZnRBcmMgPSBjaXJjdWxhclNpZGUgPT09IENpcmN1bGFyU2lkZS5MZWZ0O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZW5kQ29tcGxlbWVudGFyeUFuZ2xlID0gaXNMZWZ0QXJjID8gTWF0aC5hYnMoZW5kQW5nbGUgLSBNYXRoLlBJIC8gMiAtIE1hdGguUEkpIDogTWF0aC5hYnMoZW5kQW5nbGUgLSBNYXRoLlBJIC8gMik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYWxmQ2hvcmQgPSBzdGFydEVuZERpc3RhbmNlIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJhZGl1cyA9IGhhbGZDaG9yZCAvIE1hdGguY29zKGVuZENvbXBsZW1lbnRhcnlBbmdsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbm5lclJhZGl1cyA9IHJhZGl1cyAtIG1heFdpZHRoIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIChyYWRpdXMgPCBtYXhXaWR0aCAvIDIgKiAxLjIgfHwgaW5uZXJSYWRpdXMgPCBob3Jpem9udGFsU3RlcCAvIDIgLyAwLjgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBob3Jpem9udGFsU3RlcEFuZ2xlID0gTWF0aC5hc2luKGhvcml6b250YWxTdGVwIC8gMiAvIGlubmVyUmFkaXVzKSAqIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjaXJjbGVOb3JtYWwgPSBpc0xlZnRBcmMgPyBEaXJlY3Rpb25aIDogRGlyZWN0aW9uWi5yZXZlcnNlZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2lyY2xlQ2VudGVyID0gc3RhcnQuYWRkZWQodGFuZ2VudExlZnREaXIubXVsdGlwbGllZChpc0xlZnRBcmMgPyByYWRpdXMgOiAtcmFkaXVzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBjaXJjbGUgPSBHZW9tTGliLmNyZWF0ZUNpcmNsZTNkQnlDZW50ZXJOb3JtYWxSYWRpdXMoY2lyY2xlQ2VudGVyLCBjaXJjbGVOb3JtYWwsIHJhZGl1cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhcmMgPSBHZW9tTGliLmNyZWF0ZUFyYzNkQnlDZW50ZXJOb3JtYWxSYWRpdXMoY2lyY2xlQ2VudGVyLCBjaXJjbGVOb3JtYWwsIHJhZGl1cywgc3RhcnQsIGVuZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhcmNBbmdsZSA9IGFyYy5hcmNBbmdsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHN0ZXBDb3VudCA9IE1hdGguY2VpbChhcmNBbmdsZSAvIGhvcml6b250YWxTdGVwQW5nbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdEhvcml6b250YWxBbmdsZSA9IGFyY0FuZ2xlIC0gaG9yaXpvbnRhbFN0ZXBBbmdsZSAqIChzdGVwQ291bnQgLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHZhbGlkU3RlcENvdW50ID0gKGxhc3RIb3Jpem9udGFsQW5nbGUgPT09IDAgfHwgbGFzdEhvcml6b250YWxBbmdsZSA+IEFuZ2xlVG9sZXJhbmNlKSA/IHN0ZXBDb3VudCA6IHN0ZXBDb3VudCAtIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAoaG9yaXpvbnRhbFN0ZXBBbmdsZSA+PSBhcmNBbmdsZSB8fCBob3Jpem9udGFsU3RlcEFuZ2xlID49IE1hdGguUEkgLyAyIHx8IHZhbGlkU3RlcENvdW50ID49IFN0ZXBDb3VudExpbWl0IHx8IHZhbGlkU3RlcENvdW50IDwgMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0UmFkaXVzRGlyID0gaXNMZWZ0QXJjID8gdGFuZ2VudExlZnREaXIucmV2ZXJzZWQoKSA6IHRhbmdlbnRMZWZ0RGlyO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGRlbHRhQW5nbGUgPiBEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGNvbnN0IGNvcm5lckJvdHRvbVB0ID0gc3AuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkuYWRkZWQoYmFzZUxpbmUzZERpci5tdWx0aXBsaWVkKChzdGFydFdpZHRoIC8gMiAtIG9mZnNldExlbmd0aCkgKiAobGVmdCA/IDEgOiAtMSkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBzdGFpclJhaWwucHVzaChjb3JuZXJCb3R0b21QdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHN0YWlyQ29sdW1ucy5wdXNoKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgY29ybmVyQm90dG9tUHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNvcm5lckJvdHRvbVB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHB1c2ggY29sdW1uc1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHRlbXBTdGVwQ291bnQgPCBzdGVwQ291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJSb3RhdGVBbmdsZSA9IGhvcml6b250YWxTdGVwQW5nbGUgKiB0ZW1wU3RlcENvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRSb3RhdGVBbmdsZSA9IGhvcml6b250YWxTdGVwQW5nbGUgKiB0ZW1wU3RlcENvdW50ICsgKHRlbXBTdGVwQ291bnQgPT09IHN0ZXBDb3VudCAtIDEgPyBsYXN0SG9yaXpvbnRhbEFuZ2xlIDogaG9yaXpvbnRhbFN0ZXBBbmdsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyUm90YXRlTWF0cml4ID0gR2VvbUxpYi5jcmVhdGVSb3RhdGVNYXRyaXg0KGhvcml6b250YWxTdGVwQW5nbGUgKiB0ZW1wU3RlcENvdW50LCBjaXJjbGVOb3JtYWwsIGR1bW15UG9pbnQzZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dFJvdGF0ZU1hdHJpeCA9IEdlb21MaWIuY3JlYXRlUm90YXRlTWF0cml4NChuZXh0Um90YXRlQW5nbGUsIGNpcmNsZU5vcm1hbCwgZHVtbXlQb2ludDNkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJSYWRpdXNEaXIgPSBzdGFydFJhZGl1c0Rpci5hcHBsaWVkTWF0cml4NChjdXJSb3RhdGVNYXRyaXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRSYWRpdXNEaXIgPSBzdGFydFJhZGl1c0Rpci5hcHBsaWVkTWF0cml4NChuZXh0Um90YXRlTWF0cml4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJIYWxmV2lkdGggPSAoc3RhcnRXaWR0aCArIChlbmRXaWR0aCAtIHN0YXJ0V2lkdGgpICogKGN1clJvdGF0ZUFuZ2xlKSAvIGFyY0FuZ2xlKSAvIDIgKiAoaXNMZWZ0QXJjID8gLTEgOiAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0SGFsZldpZHRoID0gKHN0YXJ0V2lkdGggKyAoZW5kV2lkdGggLSBzdGFydFdpZHRoKSAqIChuZXh0Um90YXRlQW5nbGUpIC8gYXJjQW5nbGUpIC8gMiAqIChpc0xlZnRBcmMgPyAtMSA6IDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1ckxlZnRNb2xkUHQgPSBjaXJjbGVDZW50ZXIuYWRkZWQoY3VyUmFkaXVzRGlyLm11bHRpcGxpZWQocmFkaXVzICsgY3VySGFsZldpZHRoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyUmlnaHRNb2xkUHQgPSBjaXJjbGVDZW50ZXIuYWRkZWQoY3VyUmFkaXVzRGlyLm11bHRpcGxpZWQocmFkaXVzIC0gY3VySGFsZldpZHRoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dExlZnRNb2xkUHQgPSBjaXJjbGVDZW50ZXIuYWRkZWQobmV4dFJhZGl1c0Rpci5tdWx0aXBsaWVkKHJhZGl1cyArIG5leHRIYWxmV2lkdGgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0UmlnaHRNb2xkUHQgPSBjaXJjbGVDZW50ZXIuYWRkZWQobmV4dFJhZGl1c0Rpci5tdWx0aXBsaWVkKHJhZGl1cyAtIG5leHRIYWxmV2lkdGgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJTdGVwTGVmdEZyb250RGlyID0gbmV4dExlZnRNb2xkUHQuc3VidHJhY3RlZChjdXJMZWZ0TW9sZFB0KS5tdWx0aXBsaWVkKDAuNSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyU3RlcFJpZ2h0RnJvbnREaXIgPSBuZXh0UmlnaHRNb2xkUHQuc3VidHJhY3RlZChjdXJSaWdodE1vbGRQdCkubXVsdGlwbGllZCgwLjUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1clN0ZXBMZWZ0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhjdXJTdGVwTGVmdEZyb250RGlyKS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyU3RlcFJpZ2h0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhjdXJTdGVwUmlnaHRGcm9udERpcikubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1ckxlZnRCb3R0b21QdCA9IGN1ckxlZnRNb2xkUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0ICsgKHRlbXBTdGVwQ291bnQgKyAodXB3YXJkID8gMSA6IDApKSAqIHN0ZXBIZWlnaHQpKS5hZGRlZChjdXJTdGVwTGVmdERpci5tdWx0aXBsaWVkKC1vZmZzZXRMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJSaWdodEJvdHRvbVB0ID0gY3VyUmlnaHRNb2xkUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0ICsgKHRlbXBTdGVwQ291bnQgKyAodXB3YXJkID8gMSA6IDApKSAqIHN0ZXBIZWlnaHQpKS5hZGRlZChjdXJTdGVwUmlnaHREaXIubXVsdGlwbGllZChvZmZzZXRMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJMZWZ0Qm90dG9tTWlkUHQgPSBjdXJMZWZ0Qm90dG9tUHQuYWRkZWQoY3VyU3RlcExlZnRGcm9udERpcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyUmlnaHRCb3R0b21NaWRQdCA9IGN1clJpZ2h0Qm90dG9tUHQuYWRkZWQoY3VyU3RlcFJpZ2h0RnJvbnREaXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IGJvdHRvbVBvaW50ID0gc3AuYWRkZWQoZnJvbnREaXIubXVsdGlwbGllZCh0ZW1wRGlzdGFuY2UpKS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGVtcFN0ZXBDb3VudCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHB1c2ggcmFpbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzdGFpclJhaWwucHVzaChzcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBoZWlnaHQgKyAodXB3YXJkID8gMSA6IDApICogc3RlcEhlaWdodCkpLmFkZGVkKGxlZnREaXIubXVsdGlwbGllZChvZmZzZXRMZW5ndGgpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZWZ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpclJhaWwucHVzaChjdXJMZWZ0Qm90dG9tUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCArICh0ZW1wU3RlcENvdW50ID4gMCAmJiAhdXB3YXJkID8gLXN0ZXBIZWlnaHQgOiAwKSkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmICghdXB3YXJkICYmIHRlbXBTdGVwQ291bnQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBjb25zdCBuZXh0TGVmdEJvdHRvbVB0ID0gbmV4dExlZnRNb2xkUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0ICsgKHRlbXBTdGVwQ291bnQgKyAodXB3YXJkID8gMSA6IDApKSAqIHN0ZXBIZWlnaHQpKS5hZGRlZChjdXJTdGVwTGVmdERpci5tdWx0aXBsaWVkKC1vZmZzZXRMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBzdGFpclJhaWwucHVzaChuZXh0TGVmdEJvdHRvbVB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpclJhaWwucHVzaChjdXJSaWdodEJvdHRvbVB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQgKyAodGVtcFN0ZXBDb3VudCA+IDAgJiYgIXVwd2FyZCA/IC1zdGVwSGVpZ2h0IDogMCkpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAoIXVwd2FyZCAmJiB0ZW1wU3RlcENvdW50ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgY29uc3QgbmV4dFJpZ2h0Qm90dG9tUHQgPSBuZXh0UmlnaHRNb2xkUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0ICsgKHRlbXBTdGVwQ291bnQgKyAodXB3YXJkID8gMSA6IDApKSAqIHN0ZXBIZWlnaHQpKS5hZGRlZChjdXJTdGVwUmlnaHREaXIubXVsdGlwbGllZChvZmZzZXRMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBzdGFpclJhaWwucHVzaChuZXh0UmlnaHRCb3R0b21QdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZW1wU3RlcENvdW50ID09PSBzdGVwQ291bnQgLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0U3RlcFBlcmNlbnQgPSBsYXN0SG9yaXpvbnRhbEFuZ2xlIC8gaG9yaXpvbnRhbFN0ZXBBbmdsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZWZ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3RhaXJSYWlsLnB1c2goY3VyTGVmdEJvdHRvbU1pZFB0LmFkZGVkKGN1clN0ZXBMZWZ0RnJvbnREaXIucmV2ZXJzZWQoKSkuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpclJhaWwucHVzaChjdXJMZWZ0Qm90dG9tTWlkUHQuYWRkZWQoY3VyU3RlcExlZnRGcm9udERpcikuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCArICh1cHdhcmQgPyAwIDogLXN0ZXBIZWlnaHQgKiAoMSAtIGxhc3RTdGVwUGVyY2VudCkpKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3RhaXJSYWlsLnB1c2goY3VyUmlnaHRCb3R0b21NaWRQdC5hZGRlZChjdXJTdGVwUmlnaHRGcm9udERpci5yZXZlcnNlZCgpKS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyUmFpbC5wdXNoKGN1clJpZ2h0Qm90dG9tTWlkUHQuYWRkZWQoY3VyU3RlcFJpZ2h0RnJvbnREaXIpLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQgKyAodXB3YXJkID8gMCA6IC1zdGVwSGVpZ2h0ICogKDEgLSBsYXN0U3RlcFBlcmNlbnQpKSkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXh0U3RhcnRQb2ludCA9IGN1clJpZ2h0TW9sZFB0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKHRlbXBTdGVwQ291bnQgJSByZWFzb25hYmxlU3RlcENvdW50ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpckNvbHVtbnMucHVzaChbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdCA/IGN1ckxlZnRCb3R0b21NaWRQdCA6IGN1clJpZ2h0Qm90dG9tTWlkUHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGxlZnQgPyBjdXJMZWZ0Qm90dG9tTWlkUHQgOiBjdXJSaWdodEJvdHRvbU1pZFB0KS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0ICsgKHVwd2FyZCA/IDAgOiAodmVydGljYWxTdGVwICogKDEgLSBsYXN0U3RlcFBlcmNlbnQgLyAyKSkpKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5leHQgc2VnbWVudCBzdGFydFdpZHRoICE9PSBjdXJyZW50U2VnbWVudCBlbmRXaWR0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3AgPSBsZWZ0ID8gc3RhcnQuYWRkZWQoYmFzZUxpbmUzZERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyIC0gb2Zmc2V0TGVuZ3RoKSkgOiBjdXJSaWdodE1vbGRQdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbGVmdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnREaXIgPSBjdXJTdGVwTGVmdERpcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGVtcFN0ZXBDb3VudCAlIHJlYXNvbmFibGVTdGVwQ291bnQgPT09IDAgJiYgdGVtcFN0ZXBDb3VudCA8IHN0ZXBDb3VudCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJDb2x1bW5zLnB1c2goW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdCA/IGN1ckxlZnRCb3R0b21NaWRQdCA6IGN1clJpZ2h0Qm90dG9tTWlkUHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobGVmdCA/IGN1ckxlZnRCb3R0b21NaWRQdCA6IGN1clJpZ2h0Qm90dG9tTWlkUHQpLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCghdXB3YXJkICYmIHRlbXBTdGVwQ291bnQgPT09IDAgPyBoZWlnaHQgOiBjb2x1bW5BY3R1YWxIZWlnaHQpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBTdGVwQ291bnQgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5yYWlsLnB1c2goLi4uaGVhZENvcm5lclJhaWwpO1xuICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5jb2x1bW5zLnB1c2goLi4uaGVhZENvcm5lckNvbHVtbnMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobGVmdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWwucmFpbC5wdXNoKC4uLnN0YWlyUmFpbC5yZXZlcnNlKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWwuY29sdW1ucy5wdXNoKC4uLnN0YWlyQ29sdW1ucy5yZXZlcnNlKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWwucmFpbC5wdXNoKC4uLnN0YWlyUmFpbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5jb2x1bW5zLnB1c2goLi4uc3RhaXJDb2x1bW5zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhaXJOZXh0U2VnbWVudDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBuZXh0U2VnbWVudEluZGV4IG9mIG5leHRDb21wb25lbnRzW2xpbmUzZEluZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgoc2VnbWVudHMsIG5leHRTZWdtZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dFNlZ21lbnRWaXNpdGVkUmVjb3JkID0gdmlzaXRlZC5nZXQoKG5leHRTZWdtZW50ID09PSBudWxsIHx8IG5leHRTZWdtZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBuZXh0U2VnbWVudC5wYXJhbS5pbmRleCkgfHwgLTEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRTZWdtZW50ICYmICgoaXNQbGF0Zm9ybShuZXh0U2VnbWVudCkgJiYgIShuZXh0U2VnbWVudFZpc2l0ZWRSZWNvcmQgPT09IG51bGwgfHwgbmV4dFNlZ21lbnRWaXNpdGVkUmVjb3JkID09PSB2b2lkIDAgPyB2b2lkIDAgOiBuZXh0U2VnbWVudFZpc2l0ZWRSZWNvcmQubGluZTNkSW5kZXhlcy5zaXplKSkgfHwgKCFpc1BsYXRmb3JtKG5leHRTZWdtZW50KSAmJiAhKG5leHRTZWdtZW50VmlzaXRlZFJlY29yZCA9PT0gbnVsbCB8fCBuZXh0U2VnbWVudFZpc2l0ZWRSZWNvcmQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG5leHRTZWdtZW50VmlzaXRlZFJlY29yZC5yaWdodCkpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyTmV4dFNlZ21lbnQgPSBuZXh0U2VnbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAobGVmdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhc2VTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKG5leHRTaWJsaW5nU2VnbWVudCAmJiBiYXNlU2VnbWVudC5wYXJhbS50eXBlICE9PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIC8vIG5ldmVyIGhhcHBlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBuZXh0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgc2VnbWVudDogbmV4dFNpYmxpbmdTZWdtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgbGluZTNkSW5kOiBnZXRTZWdtZW50U3RhcnRBbmRCYXNlTGluZTNkKG5leHRTaWJsaW5nU2VnbWVudCwgc2VnbWVudHMpLnN0YXJ0TGluZS5saW5lM2RJbmQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBsZWZ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIHN0YXJ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIHN0YXJ0UG9pbnQ6IG5leHRTdGFydFBvaW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHsgbW9sZFNoYXBlOiB7IHZlcnRpY2VzOiBiYXNlVmVydGljZXMsIHRlbXBMaW5lczogYmFzZVRlbXBMaW5lcyB9IH0gPSBiYXNlU2VnbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBiYXNlTGluZTNkID0gYmFzZVNlZ21lbnQucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSA/IGJhc2VUZW1wTGluZXNbYmFzZUNvbXBvbmVudD8ubGluZTNkSW5kZXggfHwgMF0gOiBiYXNlVGVtcExpbmVzW2Jhc2VUZW1wTGluZXMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgYmFzZUxpbmUzZERpciA9IGJhc2VWZXJ0aWNlc1tiYXNlTGluZTNkWzFdXS5zdWJ0cmFjdGVkKGJhc2VWZXJ0aWNlc1tiYXNlTGluZTNkWzBdXSkubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVwID0gYmFzZUxpbmUzZEVuZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcFRvRXBEaXIgPSBlcC5zdWJ0cmFjdGVkKHNwKS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwVG9FcERpci5kb3QoYmFzZUxpbmUzZERpcikgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTdGFydFBvaW50ID0gc3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoRW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFN0YXJ0UG9pbnQgPSBpc1BsYXRmb3JtKGJhc2VTZWdtZW50KSA/IGVwIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIChiYXNlU2VnbWVudCAmJiAodmlzaXRlZEJhc2VTZWdtZW50Py5yaWdodCAmJiAhdmlzaXRlZEJhc2VTZWdtZW50LmxlZnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudDogYmFzZVNlZ21lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUzZEluZDogYmFzZVNlZ21lbnQucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSA/IChiYXNlQ29tcG9uZW50ID09PSBudWxsIHx8IGJhc2VDb21wb25lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJhc2VDb21wb25lbnQubGluZTNkSW5kZXgpIHx8IDAgOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0UG9pbnQ6IG5leHRTdGFydFBvaW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVuZCB0aGUgcGF0Y2ggd2hpY2ggaXMgc3RhcnQgd2l0aCBjdXJyZW50U2VnbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlscy5wdXNoKGhhbmRyYWlsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbCA9IHsgcmFpbDogW10sIGNvbHVtbnM6IFtdIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmlzaXRlZFJlY29yZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2l0ZWRSZWNvcmQubGVmdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhaXJOZXh0U2VnbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHsgbW9sZFNoYXBlOiB7IHZlcnRpY2VzOiBzdGFpck5leHRWZXJ0aWNlcywgdGVtcExpbmVzOiBzdGFpck5leHRUZW1wTGluZXMgfSB9ID0gc3RhaXJOZXh0U2VnbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGxpbmUzZEluZDogc3RhaXJOZXh0TGluZTNkSW5kLCBlbmRPbkJhc2VMaW5lIH0gPSBnZXRTZWdtZW50U3RhcnRBbmRCYXNlTGluZTNkKHN0YWlyTmV4dFNlZ21lbnQsIHNlZ21lbnRzLCBjdXJyZW50U2VnbWVudCkuc3RhcnRMaW5lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHN0YWlyTmV4dExpbmUzZCA9IHN0YWlyTmV4dFNlZ21lbnQucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSA/IHN0YWlyTmV4dFRlbXBMaW5lc1tzdGFpck5leHRMaW5lM2RJbmRdIDogc3RhaXJOZXh0VGVtcExpbmVzWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHN0YWlyTmV4dExpbmUzZERpciA9IHN0YWlyTmV4dFZlcnRpY2VzW3N0YWlyTmV4dExpbmUzZFsxXV0uc3VidHJhY3RlZChzdGFpck5leHRWZXJ0aWNlc1tzdGFpck5leHRMaW5lM2RbMF1dKS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXAgPSBlbmRPbkJhc2VMaW5lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwVG9FcERpciA9IGVwLnN1YnRyYWN0ZWQoc3ApLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BUb0VwRGlyLmRvdChsaW5lM2REaXIpID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U3RhcnRQb2ludCA9IHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaEVuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTdGFydFBvaW50ID0gaXNQbGF0Zm9ybShzdGFpck5leHRTZWdtZW50KSA/IGVwIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50OiBzdGFpck5leHRTZWdtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lM2RJbmQ6IHN0YWlyTmV4dExpbmUzZEluZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRQb2ludDogbmV4dFN0YXJ0UG9pbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50OiBjdXJyZW50U2VnbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZTNkSW5kOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN0YXJ0UG9pbnQ6IG5leHRTdGFydFBvaW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVuZCB0aGUgcGF0Y2ggd2hpY2ggaXMgZW5kIHdpdGggc3RhaXIgY29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWxzLnB1c2goaGFuZHJhaWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsID0geyByYWlsOiBbXSwgY29sdW1uczogW10gfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2aXNpdGVkUmVjb3JkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlzaXRlZFJlY29yZC5yaWdodCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHB1c2hFbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxldCBjdXJyZW50Q29ybmVyU2lkZVdpZHRoID0gbGVmdCA/IHN0YXJ0V2lkdGggOiBlbmRXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxldCBjdXJyZW50U2lkZUNvcm5lclN0YXJ0ID0gbGVmdCA/IHN0YXJ0IDogZW5kO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXAgaXMgcmV1c2VkIHdoZW4gcHVzaEVuZFxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBUYWlsRGlzdGFuY2UgPSBsZWZ0ID8gMCA6IHN0ZXA7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGVmdCAmJiBpc0xlZnRTdGFpcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwID0gc3RhcnQuYWRkZWQobGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyIC0gb2Zmc2V0TGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3JuZXJTdGFydEhlaWdodCA9IGxlZnQgPyBzdGFydEhlaWdodCA6IGVuZEhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcm5lckVuZCA9IGVwO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29ybmVyRGlzdGFuY2UgPSBzcC5kaXN0YW5jZVRvKGNvcm5lckVuZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhbG9uZyBjb3JuZXJCYXNlRGlyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3JuZXJTcFRvRXBEaXIgPSBjb3JuZXJFbmQuc3VidHJhY3RlZChzcCkubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29ybmVyT2Zmc2V0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhjb3JuZXJTcFRvRXBEaXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29ybmVyQWRkaXRpb25hbEhlaWdodCA9IGxlZnQgJiYgIWlzUmlnaHRTdGFpciAmJiB1cHdhcmQgPyBzdGVwSGVpZ2h0IDogKCFsZWZ0ICYmICF1cHdhcmQgPyAtc3RlcEhlaWdodCA6IDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29ybmVyU3BUb0VwRGlyID0gY29ybmVyRW5kLnN1YnRyYWN0ZWQoc3ApLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvcm5lck9mZnNldERpciA9IERpcmVjdGlvblouY3Jvc3MoY29ybmVyU3BUb0VwRGlyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0ZW1wVGFpbERpc3RhbmNlIDwgY29ybmVyRGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBib3R0b21Qb2ludCA9IHNwLmFkZGVkKGNvcm5lclNwVG9FcERpci5tdWx0aXBsaWVkKHRlbXBUYWlsRGlzdGFuY2UpKS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoY29ybmVyU3RhcnRIZWlnaHQgKyBjb3JuZXJBZGRpdGlvbmFsSGVpZ2h0KSkuYWRkZWQoY29ybmVyT2Zmc2V0RGlyLm11bHRpcGxpZWQob2Zmc2V0TGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWwuY29sdW1ucy5wdXNoKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tUG9pbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbVBvaW50LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wVGFpbERpc3RhbmNlICs9IHN0ZXA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0Qm90dG9tUG9pbnQgPSBlcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoY29ybmVyU3RhcnRIZWlnaHQgKyBjb3JuZXJBZGRpdGlvbmFsSGVpZ2h0KSkuYWRkZWQoY29ybmVyT2Zmc2V0RGlyLm11bHRpcGxpZWQob2Zmc2V0TGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBsYXN0Qm90dG9tUG9pbnQgPSBlcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQobGVmdCA/IGVuZEhlaWdodCA6IHN0YXJ0SGVpZ2h0KSkuYWRkZWQoY29ybmVyT2Zmc2V0RGlyLm11bHRpcGxpZWQob2Zmc2V0TGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGVmdCAmJiBpc1JpZ2h0U3RhaXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5yYWlsLnB1c2goc3AuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGNvcm5lclN0YXJ0SGVpZ2h0ICsgaGVpZ2h0ICsgY29ybmVyQWRkaXRpb25hbEhlaWdodCkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHB1c2ggcmFpbFxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWwucmFpbC5wdXNoKGxhc3RCb3R0b21Qb2ludC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChjb3JuZXJEaXN0YW5jZSAtIHRlbXBUYWlsRGlzdGFuY2UgKyBzdGVwKSA+IHN0ZXBUb2xlcmFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5jb2x1bW5zLnB1c2goW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0Qm90dG9tUG9pbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RCb3R0b21Qb2ludC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50ID0gbmV4dDtcbiAgICAgICAgICAgIGlmICghY3VycmVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAodW5WaXNpdGVkLnNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlU2VnbWVudCA9IFsuLi51blZpc2l0ZWQudmFsdWVzKCldWzBdO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50OiB0aGVTZWdtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUzZEluZDogZ2V0U2VnbWVudFN0YXJ0QW5kQmFzZUxpbmUzZCh0aGVTZWdtZW50LCBzZWdtZW50cykuc3RhcnRMaW5lLmxpbmUzZEluZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaGFuZHJhaWxzO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdlbmVyYXRlVGVtcExpbmVzTG9vcCh2ZXJ0ZXhDb3VudCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiB2ZXJ0ZXhDb3VudCB9KS5tYXAoKF8sIGkpID0+IFtpLCBpID09PSB2ZXJ0ZXhDb3VudCAtIDEgPyAwIDogaSArIDFdKTtcbn1cbmZ1bmN0aW9uIGdldFNlZ21lbnRTdGFydEFuZEJhc2VMaW5lM2Qoc2VnbWVudCwgc2VnbWVudHMsIGJhc2VTZWdtZW50KSB7XG4gICAgY29uc3QgeyBzdGFydCwgcGFyYW06IHsgdHlwZSwgc3RhcnRXaWR0aCB9LCBjb21wb25lbnREaXJlY3Rpb25UeXBlLCBtb2xkU2hhcGU6IHsgdGVtcExpbmVzLCB2ZXJ0aWNlcyB9LCBiYXNlQ29tcG9uZW50IH0gPSBzZWdtZW50O1xuICAgIGxldCBzdGFydExpbmUzZEluZCA9IDA7XG4gICAgLy8gNSBlZGdlc1xuICAgIGlmICh0eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtICYmIGNvbXBvbmVudERpcmVjdGlvblR5cGUgPT09IENvbXBvbmVudERpcmVjdGlvblR5cGUuUmlnaHRGcm9udCAmJiB0ZW1wTGluZXMubGVuZ3RoID4gNCkge1xuICAgICAgICBzdGFydExpbmUzZEluZCA9IDE7XG4gICAgfVxuICAgIGNvbnN0IHN0YXJ0TGluZTNkID0gdGVtcExpbmVzW3N0YXJ0TGluZTNkSW5kXTtcbiAgICBjb25zdCBzdGFydExpbmUzZFN0YXJ0ID0gdmVydGljZXNbc3RhcnRMaW5lM2RbMF1dO1xuICAgIGNvbnN0IHN0YXJ0TGluZTNkRW5kID0gdmVydGljZXNbc3RhcnRMaW5lM2RbMV1dO1xuICAgIGNvbnN0IHN0YXJ0TGluZTNkRGlyID0gc3RhcnRMaW5lM2RFbmQuc3VidHJhY3RlZChzdGFydExpbmUzZFN0YXJ0KS5ub3JtYWxpemVkKCk7XG4gICAgbGV0IGJhc2VMaW5lM2RJbmQgPSAoYmFzZUNvbXBvbmVudCA9PT0gbnVsbCB8fCBiYXNlQ29tcG9uZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBiYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4KSB8fCAwO1xuICAgIGxldCBiYXNlTGluZTNkID0gWy4uLnN0YXJ0TGluZTNkXS5yZXZlcnNlKCk7XG4gICAgbGV0IGJhc2VMaW5lM2RTdGFydCA9IHZlcnRpY2VzW3N0YXJ0TGluZTNkWzFdXTtcbiAgICBsZXQgYmFzZUxpbmUzZEVuZCA9IHZlcnRpY2VzW3N0YXJ0TGluZTNkWzBdXTtcbiAgICBsZXQgYmFzZUxpbmUzZERpciA9IHN0YXJ0TGluZTNkRGlyLnJldmVyc2VkKCk7XG4gICAgO1xuICAgIGlmICghYmFzZVNlZ21lbnQgJiYgYmFzZUNvbXBvbmVudCkge1xuICAgICAgICBiYXNlU2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHNlZ21lbnRzLCBiYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcbiAgICB9XG4gICAgaWYgKGJhc2VTZWdtZW50KSB7XG4gICAgICAgIGNvbnN0IHsgbW9sZFNoYXBlOiB7IHZlcnRpY2VzOiBiYXNlVmVydGljZXMsIHRlbXBMaW5lczogYmFzZVRlbXBMaW5lcyB9IH0gPSBiYXNlU2VnbWVudDtcbiAgICAgICAgYmFzZUxpbmUzZCA9IGJhc2VTZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gPyBiYXNlVGVtcExpbmVzWyhiYXNlQ29tcG9uZW50ID09PSBudWxsIHx8IGJhc2VDb21wb25lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJhc2VDb21wb25lbnQubGluZTNkSW5kZXgpIHx8IDBdIDogWy4uLmJhc2VUZW1wTGluZXNbYmFzZVRlbXBMaW5lcy5sZW5ndGggLSAxXV0ucmV2ZXJzZSgpO1xuICAgICAgICBiYXNlTGluZTNkU3RhcnQgPSBiYXNlVmVydGljZXNbYmFzZUxpbmUzZFswXV07XG4gICAgICAgIGJhc2VMaW5lM2RFbmQgPSBiYXNlVmVydGljZXNbYmFzZUxpbmUzZFsxXV07XG4gICAgICAgIGJhc2VMaW5lM2REaXIgPSBiYXNlTGluZTNkRW5kLnN1YnRyYWN0ZWQoYmFzZUxpbmUzZFN0YXJ0KS5ub3JtYWxpemVkKCk7XG4gICAgfVxuICAgIGxldCBzdGFydE9uQmFzZUxpbmUgPSBzdGFydExpbmUzZFN0YXJ0O1xuICAgIGxldCBlbmRPbkJhc2VMaW5lID0gc3RhcnRMaW5lM2RFbmQ7XG4gICAgaWYgKHR5cGUgIT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcbiAgICAgICAgc3RhcnRPbkJhc2VMaW5lID0gc3RhcnQuYWRkZWQoYmFzZUxpbmUzZERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSk7XG4gICAgICAgIGVuZE9uQmFzZUxpbmUgPSBzdGFydC5hZGRlZChiYXNlTGluZTNkRGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXJ0TGluZTogeyBsaW5lM2RJbmQ6IHN0YXJ0TGluZTNkSW5kLCBsaW5lM2Q6IHN0YXJ0TGluZTNkLCBkaXI6IHN0YXJ0TGluZTNkRGlyLCBzdGFydDogc3RhcnRMaW5lM2RTdGFydCwgZW5kOiBzdGFydExpbmUzZEVuZCwgc3RhcnRPbkJhc2VMaW5lLCBlbmRPbkJhc2VMaW5lIH0sXG4gICAgICAgIGJhc2VMaW5lOiB7IGxpbmUzZEluZDogYmFzZUxpbmUzZEluZCwgbGluZTNkOiBiYXNlTGluZTNkLCBkaXI6IGJhc2VMaW5lM2REaXIsIHN0YXJ0OiBiYXNlTGluZTNkU3RhcnQsIGVuZDogYmFzZUxpbmUzZEVuZCB9LFxuICAgIH07XG59XG5leHBvcnQgZnVuY3Rpb24gaXNQbGF0Zm9ybShzZWdtZW50KSB7XG4gICAgcmV0dXJuIHNlZ21lbnQucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0NpcmN1bGFyU3RhaXIoc2VnbWVudCkge1xuICAgIHJldHVybiBzZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpcjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmFpZ2h0U3RhaXIoc2VnbWVudCkge1xuICAgIHJldHVybiBzZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpcjtcbn1cbiIsImV4cG9ydCBjb25zdCBTdGFpck1vZGVsS2V5ID0gJ0RTTW9kZWwnO1xuZXhwb3J0IGNvbnN0IE1vZGVsVmFsdWUgPSAnMSc7XG5leHBvcnQgY29uc3QgSGFuZHJhaWxNb2RlbEtleSA9ICdIYW5kcmFpbCc7XG5leHBvcnQgY29uc3QgUmFpbE1vZGVsS2V5ID0gJ1JhaWwnO1xuZXhwb3J0IGNvbnN0IENvbHVtbk1vZGVsS2V5ID0gJ0NvbHVtbic7XG4vLyBleHBvcnQgY29uc3QgU3RhaXJLZXkgPSAnRFNTdGFpcic7XG4vLyBleHBvcnQgY29uc3QgUGxhdGZvcm1LZXkgPSAnRFNQbGF0Zm9ybSc7XG5leHBvcnQgY29uc3QgU3RhaXJQYXJhbUtleSA9ICdTUGFyYW0nO1xuZXhwb3J0IGNvbnN0IENvbXBvbmVudFBhcmFtS2V5ID0gJ0NQYXJhbSc7XG5leHBvcnQgY29uc3QgU3RhaXJNYXRlcmlhbEtleSA9ICdTTWF0JztcbmV4cG9ydCBjb25zdCBQbGF0Zm9ybU1hdGVyaWFsS2V5ID0gJ1BNYXQnO1xuZXhwb3J0IGNvbnN0IFJhaWxNYXRlcmlhbEtleSA9ICdIUk1hdCc7XG5leHBvcnQgY29uc3QgQ29sdW1uTWF0ZXJpYWxLZXkgPSAnSENNYXQnO1xuZXhwb3J0IGNvbnN0IENvbXBvbmVudE1hdGVyaWFsS2V5ID0gJ0NNYXQnO1xuLy8gc3RhcnRIZWlnaHQgYW5kIGVuZEhlaWdodCBjYWNoZWQgaW4gc3RhcnQgYW5kIGVuZFxuZXhwb3J0IGNvbnN0IENvbXBvbmVudEluZGV4S2V5ID0gJ0luZCc7XG5leHBvcnQgY29uc3QgU3RhcnRFbmRLZXkgPSAnU1RvRSc7XG5leHBvcnQgY29uc3QgQmFzZUxpbmVTZWczZEtleSA9ICdCYXNlTGluZSc7XG5leHBvcnQgY29uc3QgQmFzZUNvbXBvbmVudEtleSA9ICdCYXNlQ29tcG9uZW50JztcbmV4cG9ydCBjb25zdCBDaXJjbGVUYW5nZW50S2V5ID0gJ0NpcmNsZVRhbmdlbnQnO1xuZXhwb3J0IGNvbnN0IERlbGltaXRlciA9ICcmJztcbmV4cG9ydCBjb25zdCBDb29yZERlbGltaXRlciA9ICcsJztcbmV4cG9ydCBjb25zdCBCYXNlTGluZTNkRGVsaW1pdGVyID0gJ18nO1xuY29uc3QgUHJvZE1hdGVyaWFscyA9IHtcbiAgICBTdGFpcjogeyBiZ0lkOiAnM0ZPNExIRVJCUFBZJywgbWF0ZXJpYWxJZDogJzU5NzJlOTkzYWEwMWYzNTg1ZjUxZGVjYicgfSxcbiAgICAvLyBTdGFpcjogeyBiZ0lkOiAnM0ZPNEFUS0VDTEtJJywgbWF0ZXJpYWxJZDogJzYxNjhmNDU0Y2RkMjVlMDAwMTdkNzVkMCcgfSxcbiAgICBQbGF0Zm9ybTogeyBiZ0lkOiAnM0ZPNDRUN01ZRkE1JywgbWF0ZXJpYWxJZDogJzY0NTYyYWZkNmZiYzNiMDAwMWEzMjUxYycgfSxcbiAgICBIYW5kcmFpbDoge1xuICAgICAgICByYWlsOiB7IGJnSWQ6ICczRk80TEhFUkU3TlAnLCBtYXRlcmlhbElkOiAnNTk3MmU4ZDdhYTAxZjM1ODVmNTFkZTk3JyB9LFxuICAgICAgICBjb2x1bW46IHsgYmdJZDogJzNGTzRMSEVSRTdOUCcsIG1hdGVyaWFsSWQ6ICc1OTcyZThkN2FhMDFmMzU4NWY1MWRlOTcnIH0sXG4gICAgfSxcbn07XG5jb25zdCBEZXZNYXRlcmlhbHMgPSB7XG4gICAgU3RhaXI6IHsgYmdJZDogJzNGTzRIMkQ3M0pGTycsIG1hdGVyaWFsSWQ6ICc1OGFmOTYxYjRhNGQyYzRmOGFhMmIxZGEnIH0sXG4gICAgLy8gU3RhaXI6IHsgYmdJZDogJzNGTzRBVEtFQ0xLSScsIG1hdGVyaWFsSWQ6ICc2MTY4ZjQ1NGNkZDI1ZTAwMDE3ZDc1ZDAnIH0sXG4gICAgUGxhdGZvcm06IHsgYmdJZDogJzNGTzRIMkQ2Q1FNWScsIG1hdGVyaWFsSWQ6ICc1ODE2ZmVmOTg1ZGE1NjZhMWIyOGE5NDQnIH0sXG4gICAgSGFuZHJhaWw6IHtcbiAgICAgICAgcmFpbDogeyBiZ0lkOiAnM0ZPNEgyRDZIOFNCJywgbWF0ZXJpYWxJZDogJzU4YWZiM2FiNWMyNmEwNzNiMzg5YTk1ZicgfSxcbiAgICAgICAgY29sdW1uOiB7IGJnSWQ6ICczRk80R0RLNUVYREMnLCBtYXRlcmlhbElkOiAnNWU1MzJmYjQyMDE0MDIwMDAxY2M0ODg5JyB9LFxuICAgIH0sXG59O1xuZXhwb3J0IGNvbnN0IFByZXNldE1hdGVyaWFscyA9ICh3aW5kb3cub3JpZ2luIHx8ICcnKS5pbmNsdWRlcygnc2l0JykgPyBEZXZNYXRlcmlhbHMgOiBQcm9kTWF0ZXJpYWxzO1xuZXhwb3J0IHZhciBDb21wb25lbnRQYXJhbVR5cGU7XG4oZnVuY3Rpb24gKENvbXBvbmVudFBhcmFtVHlwZSkge1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhvcml6b250YWxTdGVwXCJdID0gXCJob3Jpem9udGFsU3RlcFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIlZlcnRpY2FsU3RlcFwiXSA9IFwidmVydGljYWxTdGVwXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiU3RhcnRXaWR0aFwiXSA9IFwic3RhcnRXaWR0aFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkVuZFdpZHRoXCJdID0gXCJlbmRXaWR0aFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIlN0ZXBQcm9wb3J0aW9uYWxcIl0gPSBcInN0ZXBQcm9wb3J0aW9uYWxcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJXaWR0aFByb3BvcnRpb25hbFwiXSA9IFwid2lkdGhQcm9wb3J0aW9uYWxcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJQbGF0Zm9ybUxlbmd0aFwiXSA9IFwicGxhdGZvcm1MZW5ndGhcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJQbGF0Zm9ybUxlbmd0aExvY2tlZFwiXSA9IFwicGxhdGZvcm1MZW5ndGhMb2NrZWRcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJUeXBlXCJdID0gXCJ0eXBlXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiVXB3YXJkXCJdID0gXCJ1cHdhcmRcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJQbGF0Zm9ybVRoaWNrbmVzc1wiXSA9IFwicGxhdGZvcm1UaGlja25lc3NcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJDb21wb25lbnRNYXRlcmlhbFwiXSA9IFwiY29tcG9uZW50TWF0ZXJpYWxcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJTdGFpck1hdGVyaWFsXCJdID0gXCJzdGFpck1hdGVyaWFsXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiUGxhdGZvcm1NYXRlcmlhbFwiXSA9IFwicGxhdGZvcm1NYXRlcmlhbFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsXCJdID0gXCJoYW5kcmFpbFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsSGVpZ2h0XCJdID0gXCJoYW5kcmFpbEhlaWdodFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsUmFpbFR5cGVcIl0gPSBcImhhbmRyYWlsUmFpbFR5cGVcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIYW5kcmFpbFJhaWxSYWRpdXNcIl0gPSBcImhhbmRyYWlsUmFpbFJhZGl1c1wiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsUmFpbFdpZHRoXCJdID0gXCJoYW5kcmFpbFJhaWxXaWR0aFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsUmFpbEhlaWdodFwiXSA9IFwiaGFuZHJhaWxSYWlsSGVpZ2h0XCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSGFuZHJhaWxSYWlsTWF0ZXJpYWxcIl0gPSBcIlJhaWxNYXRlcmlhbFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsQ29sdW1uVHlwZVwiXSA9IFwiaGFuZHJhaWxDb2x1bW5UeXBlXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSGFuZHJhaWxDb2x1bW5TdGVwXCJdID0gXCJoYW5kcmFpbENvbHVtblN0ZXBcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIYW5kcmFpbENvbHVtblJhZGl1c1wiXSA9IFwiaGFuZHJhaWxDb2x1bW5SYWRpdXNcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIYW5kcmFpbENvbHVtbldpZHRoXCJdID0gXCJoYW5kcmFpbENvbHVtbldpZHRoXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSGFuZHJhaWxDb2x1bW5IZWlnaHRcIl0gPSBcImhhbmRyYWlsQ29sdW1uSGVpZ2h0XCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSGFuZHJhaWxDb2x1bW5NYXRlcmlhbFwiXSA9IFwiQ29sdW1uTWF0ZXJpYWxcIjtcbn0pKENvbXBvbmVudFBhcmFtVHlwZSB8fCAoQ29tcG9uZW50UGFyYW1UeXBlID0ge30pKTtcbi8vIGludGVyZmFjZSBQYXJhbVNldHRpbmdzIHtcbi8vICAgICBtaW46IG51bWJlcjtcbi8vICAgICBtYXg6IG51bWJlcjtcbi8vICAgICBzdGVwOiBudW1iZXI7XG4vLyAgICAgdW5pdDogc3RyaW5nO1xuLy8gICAgIHByZWNpc2lvbjogbnVtYmVyO1xuLy8gfVxuZXhwb3J0IHZhciBDb21wb25lbnRUeXBlO1xuKGZ1bmN0aW9uIChDb21wb25lbnRUeXBlKSB7XG4gICAgQ29tcG9uZW50VHlwZVtDb21wb25lbnRUeXBlW1wiU3RyYWlnaHRTdGFpclwiXSA9IDBdID0gXCJTdHJhaWdodFN0YWlyXCI7XG4gICAgQ29tcG9uZW50VHlwZVtDb21wb25lbnRUeXBlW1wiQ2lyY3VsYXJTdGFpclwiXSA9IDFdID0gXCJDaXJjdWxhclN0YWlyXCI7XG4gICAgQ29tcG9uZW50VHlwZVtDb21wb25lbnRUeXBlW1wiUGxhdGZvcm1cIl0gPSAyXSA9IFwiUGxhdGZvcm1cIjtcbn0pKENvbXBvbmVudFR5cGUgfHwgKENvbXBvbmVudFR5cGUgPSB7fSkpO1xuZXhwb3J0IHZhciBSYWlsVHlwZTtcbihmdW5jdGlvbiAoUmFpbFR5cGUpIHtcbiAgICBSYWlsVHlwZVtSYWlsVHlwZVtcIkNpcmNsZVwiXSA9IDBdID0gXCJDaXJjbGVcIjtcbiAgICBSYWlsVHlwZVtSYWlsVHlwZVtcIlJlY3RcIl0gPSAxXSA9IFwiUmVjdFwiO1xuICAgIFJhaWxUeXBlW1JhaWxUeXBlW1wiQ3VzdG9tXCJdID0gOTldID0gXCJDdXN0b21cIjtcbn0pKFJhaWxUeXBlIHx8IChSYWlsVHlwZSA9IHt9KSk7XG5leHBvcnQgdmFyIENvbHVtblR5cGU7XG4oZnVuY3Rpb24gKENvbHVtblR5cGUpIHtcbiAgICBDb2x1bW5UeXBlW0NvbHVtblR5cGVbXCJDaXJjbGVcIl0gPSAwXSA9IFwiQ2lyY2xlXCI7XG4gICAgQ29sdW1uVHlwZVtDb2x1bW5UeXBlW1wiUmVjdFwiXSA9IDFdID0gXCJSZWN0XCI7XG4gICAgQ29sdW1uVHlwZVtDb2x1bW5UeXBlW1wiQ3VzdG9tXCJdID0gOTldID0gXCJDdXN0b21cIjtcbn0pKENvbHVtblR5cGUgfHwgKENvbHVtblR5cGUgPSB7fSkpO1xuZXhwb3J0IGNvbnN0IENvbXBvbmVudFBhcmFtU2V0dGluZ3MgPSB7XG4gICAgaG9yaXpvbnRhbFN0ZXA6IHsgdGl0bGU6IFwi5q2l6ZW/XCIsIG1pbjogMSwgbWF4OiAxMDAwMDAsIHN0ZXA6IDEwLCB1bml0OiAn6ZW/JywgcHJlY2lzaW9uOiAwLCB9LFxuICAgIHZlcnRpY2FsU3RlcDogeyB0aXRsZTogXCLmraXplb9cIiwgbWluOiAxLCBtYXg6IDEwMDAwMCwgc3RlcDogMTAsIHVuaXQ6ICfpq5gnLCBwcmVjaXNpb246IDAsIH0sXG4gICAgc3RhcnRXaWR0aDogeyB0aXRsZTogXCLlrr3luqZcIiwgbWluOiAxLCBtYXg6IDEwMDAwMCwgc3RlcDogNTAsIHVuaXQ6ICfotbcnLCBwcmVjaXNpb246IDAsIH0sXG4gICAgZW5kV2lkdGg6IHsgdGl0bGU6IFwi5a695bqmXCIsIG1pbjogMSwgbWF4OiAxMDAwMDAsIHN0ZXA6IDUwLCB1bml0OiAn57uIJywgcHJlY2lzaW9uOiAwLCB9LFxuICAgIHBsYXRmb3JtTGVuZ3RoOiB7IHRpdGxlOiBcIumVv+W6plwiLCBtaW46IDEwMCwgbWF4OiAxMDAwMDAsIHN0ZXA6IDUwLCB1bml0OiAnJywgcHJlY2lzaW9uOiAwLCB9LFxuICAgIHR5cGU6IHtcbiAgICAgICAgLy8gcmFkaW9WYWx1ZXM6IFtDb21wb25lbnRUeXBlLlN0cmFpZ2h0U3RhaXIsIENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpciwgQ29tcG9uZW50VHlwZS5QbGF0Zm9ybV0sXG4gICAgICAgIC8vIHRleHRzOiBbXCLnm7TpmLZcIiwgXCLml4vovazpmLbmoq9cIiwgXCLlubPlj7BcIl0sXG4gICAgICAgIHRpdGxlOiBcIuexu+Wei1wiLFxuICAgICAgICByYWRpb09wdGlvbnM6IFtcbiAgICAgICAgICAgIHsgdmFsdWU6IENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpciwgdGV4dDogXCLnm7TpmLZcIiB9LFxuICAgICAgICAgICAgeyB2YWx1ZTogQ29tcG9uZW50VHlwZS5DaXJjdWxhclN0YWlyLCB0ZXh0OiBcIuaXi+i9rOmYtuair1wiIH0sXG4gICAgICAgICAgICB7IHZhbHVlOiBDb21wb25lbnRUeXBlLlBsYXRmb3JtLCB0ZXh0OiBcIuW5s+WPsFwiIH0sXG4gICAgICAgIF1cbiAgICB9LFxuICAgIHVwd2FyZDoge1xuICAgICAgICAvLyByYWRpb1ZhbHVlczogWzEsIDBdLFxuICAgICAgICAvLyB0ZXh0czogW1wi5ZCR5LiKXCIsIFwi5ZCR5LiLXCJdLFxuICAgICAgICB0aXRsZTogXCLmlrnlkJFcIixcbiAgICAgICAgcmFkaW9PcHRpb25zOiBbXG4gICAgICAgICAgICB7IHZhbHVlOiB0cnVlLCB0ZXh0OiBcIuWQkeS4ilwiIH0sXG4gICAgICAgICAgICB7IHZhbHVlOiBmYWxzZSwgdGV4dDogXCLlkJHkuItcIiB9LFxuICAgICAgICBdXG4gICAgfSxcbiAgICBwbGF0Zm9ybVRoaWNrbmVzczogeyB0aXRsZTogXCLljprluqZcIiwgbWluOiAxLCBtYXg6IDEwMDAwMCwgc3RlcDogMTAsIHVuaXQ6ICcnLCBwcmVjaXNpb246IDAsIH0sXG4gICAgbWF0ZXJpYWw6IHsgdGl0bGU6ICfmnZDotKgnIH0sXG4gICAgc3RhaXJNYXRlcmlhbDogeyB0aXRsZTogJ+mYtuair+adkOi0qCcgfSxcbiAgICBwbGF0Zm9ybU1hdGVyaWFsOiB7IHRpdGxlOiAn5bmz5Y+w5p2Q6LSoJyB9LFxuICAgIGhhbmRyYWlsOiB7XG4gICAgICAgIHRpdGxlOiAn5ZCv55So5qCP5p2GJyxcbiAgICAgICAgaGVpZ2h0OiB7IHRpdGxlOiBcIumrmOW6plwiLCBtaW46IDEsIG1heDogMTAwMDAwLCBzdGVwOiAxMCwgdW5pdDogJycsIHByZWNpc2lvbjogMCwgfSxcbiAgICAgICAgcmFpbDoge1xuICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIuagt+W8j1wiLFxuICAgICAgICAgICAgICAgIHNlbGVjdE9wdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogUmFpbFR5cGUuQ2lyY2xlLCBsYWJlbDogXCLlnIblvaJcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBSYWlsVHlwZS5SZWN0LCBsYWJlbDogXCLmlrnlvaJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAvLyB7IHZhbHVlOiBSYWlsVHlwZS5DdXN0b20sIGxhYmVsOiBcIuaLvuWPllwiIH0sXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgY29sdW1uOiB7XG4gICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi5qC35byPXCIsXG4gICAgICAgICAgICAgICAgc2VsZWN0T3B0aW9uczogW1xuICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBDb2x1bW5UeXBlLkNpcmNsZSwgbGFiZWw6IFwi5ZyG5b2iXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogQ29sdW1uVHlwZS5SZWN0LCBsYWJlbDogXCLmlrnlvaJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAvLyB7IHZhbHVlOiBDb2x1bW5UeXBlLkN1c3RvbSwgbGFiZWw6IFwi5ou+5Y+WXCIgfSxcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3RlcDogeyB0aXRsZTogXCLpl7TpmpRcIiwgbWluOiAxLCBtYXg6IDEwMDAwMCwgc3RlcDogMTAsIHVuaXQ6ICcnLCBwcmVjaXNpb246IDAsIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBvbmVudFBhcmFtOiB7XG4gICAgICAgICAgICByYWRpdXM6IHsgdGl0bGU6IFwi5Y2K5b6EXCIsIG1pbjogMSwgbWF4OiAxMDAwMDAsIHN0ZXA6IDEwLCB1bml0OiAnJywgcHJlY2lzaW9uOiAwLCB9LFxuICAgICAgICAgICAgd2lkdGg6IHsgdGl0bGU6IFwi5a695bqmXCIsIG1pbjogMSwgbWF4OiAxMDAwMDAsIHN0ZXA6IDEwLCB1bml0OiAnJywgcHJlY2lzaW9uOiAwLCB9LFxuICAgICAgICAgICAgaGVpZ2h0OiB7IHRpdGxlOiBcIumrmOW6plwiLCBtaW46IDEsIG1heDogMTAwMDAwLCBzdGVwOiAxMCwgdW5pdDogJycsIHByZWNpc2lvbjogMCwgfSxcbiAgICAgICAgfVxuICAgIH1cbn07XG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29tcG9uZW50VGl0bGUoY29tcG9uZW50VHlwZSkge1xuICAgIGlmIChjb21wb25lbnRUeXBlID09PSBDb21wb25lbnRUeXBlLlN0cmFpZ2h0U3RhaXIpIHtcbiAgICAgICAgcmV0dXJuICfpmLYnO1xuICAgIH1cbiAgICBlbHNlIGlmIChjb21wb25lbnRUeXBlID09PSBDb21wb25lbnRUeXBlLkNpcmN1bGFyU3RhaXIpIHtcbiAgICAgICAgcmV0dXJuICfpmLYnO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuICflj7AnO1xuICAgIH1cbn1cbmV4cG9ydCBjb25zdCBEZWZhdWx0U3RhaXJQYXJhbSA9IHtcbiAgICBob3Jpem9udGFsU3RlcDogMjUwLFxuICAgIHZlcnRpY2FsU3RlcDogMjUwLFxuICAgIHN0YXJ0V2lkdGg6IDEwMDAsXG4gICAgZW5kV2lkdGg6IDEwMDAsXG4gICAgdXB3YXJkOiB0cnVlLFxuICAgIHBsYXRmb3JtVGhpY2tuZXNzOiAyMDAsXG4gICAgc3RhaXJNYXRlcmlhbDogUHJlc2V0TWF0ZXJpYWxzLlN0YWlyLFxuICAgIHBsYXRmb3JtTWF0ZXJpYWw6IFByZXNldE1hdGVyaWFscy5QbGF0Zm9ybSxcbiAgICBoYW5kcmFpbDoge1xuICAgICAgICBzdXBwb3J0OiB0cnVlLFxuICAgICAgICBoZWlnaHQ6IDUwMCxcbiAgICAgICAgcmFpbDoge1xuICAgICAgICAgICAgdHlwZTogUmFpbFR5cGUuQ2lyY2xlLFxuICAgICAgICAgICAgcGFyYW06IHsgcmFkaXVzOiAyMCwgd2lkdGg6IDIwLCBoZWlnaHQ6IDIwLCB9LFxuICAgICAgICAgICAgbWF0ZXJpYWw6IFByZXNldE1hdGVyaWFscy5IYW5kcmFpbC5yYWlsLFxuICAgICAgICB9LFxuICAgICAgICBjb2x1bW46IHtcbiAgICAgICAgICAgIHR5cGU6IENvbHVtblR5cGUuQ2lyY2xlLFxuICAgICAgICAgICAgc3RlcDogNTAwLFxuICAgICAgICAgICAgcGFyYW06IHsgcmFkaXVzOiA4LCB3aWR0aDogOCwgaGVpZ2h0OiA4LCB9LFxuICAgICAgICAgICAgbWF0ZXJpYWw6IFByZXNldE1hdGVyaWFscy5IYW5kcmFpbC5jb2x1bW4sXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBzdGVwUHJvcG9ydGlvbmFsOiB0cnVlLFxuICAgIHdpZHRoUHJvcG9ydGlvbmFsOiB0cnVlLFxufTtcbmV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0U3RhaXJQYXJhbSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBob3Jpem9udGFsU3RlcDogMjUwLFxuICAgICAgICB2ZXJ0aWNhbFN0ZXA6IDI1MCxcbiAgICAgICAgc3RhcnRXaWR0aDogMTAwMCxcbiAgICAgICAgZW5kV2lkdGg6IDEwMDAsXG4gICAgICAgIHVwd2FyZDogdHJ1ZSxcbiAgICAgICAgcGxhdGZvcm1UaGlja25lc3M6IDIwMCxcbiAgICAgICAgc3RhaXJNYXRlcmlhbDogUHJlc2V0TWF0ZXJpYWxzLlN0YWlyLFxuICAgICAgICBwbGF0Zm9ybU1hdGVyaWFsOiBQcmVzZXRNYXRlcmlhbHMuUGxhdGZvcm0sXG4gICAgICAgIGhhbmRyYWlsOiB7XG4gICAgICAgICAgICBzdXBwb3J0OiB0cnVlLFxuICAgICAgICAgICAgaGVpZ2h0OiA1MDAsXG4gICAgICAgICAgICByYWlsOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogUmFpbFR5cGUuQ2lyY2xlLFxuICAgICAgICAgICAgICAgIHBhcmFtOiB7IHJhZGl1czogMjAsIHdpZHRoOiAyMCwgaGVpZ2h0OiAyMCwgfSxcbiAgICAgICAgICAgICAgICBtYXRlcmlhbDogUHJlc2V0TWF0ZXJpYWxzLkhhbmRyYWlsLnJhaWwsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29sdW1uOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogQ29sdW1uVHlwZS5DaXJjbGUsXG4gICAgICAgICAgICAgICAgc3RlcDogNTAwLFxuICAgICAgICAgICAgICAgIHBhcmFtOiB7IHJhZGl1czogOCwgd2lkdGg6IDgsIGhlaWdodDogOCwgfSxcbiAgICAgICAgICAgICAgICBtYXRlcmlhbDogUHJlc2V0TWF0ZXJpYWxzLkhhbmRyYWlsLmNvbHVtbixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHN0ZXBQcm9wb3J0aW9uYWw6IHRydWUsXG4gICAgICAgIHdpZHRoUHJvcG9ydGlvbmFsOiB0cnVlLFxuICAgIH07XG59XG5leHBvcnQgY29uc3QgRGVmYXVsdENvbXBvbmVudFBhcmFtID0ge1xuICAgIGluZGV4OiAwLFxuICAgIGhvcml6b250YWxTdGVwOiBEZWZhdWx0U3RhaXJQYXJhbS5ob3Jpem9udGFsU3RlcCxcbiAgICB2ZXJ0aWNhbFN0ZXA6IERlZmF1bHRTdGFpclBhcmFtLnZlcnRpY2FsU3RlcCxcbiAgICBzdGFydFdpZHRoOiBEZWZhdWx0U3RhaXJQYXJhbS5zdGFydFdpZHRoLFxuICAgIGVuZFdpZHRoOiBEZWZhdWx0U3RhaXJQYXJhbS5lbmRXaWR0aCxcbiAgICBvZmZzZXRXaWR0aDogMCxcbiAgICB3aXRoT2Zmc2V0OiBmYWxzZSxcbiAgICBwbGF0Zm9ybUxlbmd0aDogMjAwMCxcbiAgICB0eXBlOiBDb21wb25lbnRUeXBlLlN0cmFpZ2h0U3RhaXIsXG4gICAgdXB3YXJkOiBEZWZhdWx0U3RhaXJQYXJhbS51cHdhcmQsXG4gICAgcGxhdGZvcm1UaGlja25lc3M6IERlZmF1bHRTdGFpclBhcmFtLnBsYXRmb3JtVGhpY2tuZXNzLFxuICAgIHN0ZXBQcm9wb3J0aW9uYWw6IERlZmF1bHRTdGFpclBhcmFtLnN0ZXBQcm9wb3J0aW9uYWwsXG4gICAgd2lkdGhQcm9wb3J0aW9uYWw6IHRydWUsXG4gICAgcGxhdGZvcm1MZW5ndGhMb2NrZWQ6IGZhbHNlLFxuICAgIC8vIHN0ZXBUeXBlOiBTdGVwVHlwZS5Ob3JtYWwsXG4gICAgLy8gY29ybmVyVHlwZTogQ29ybmVyVHlwZS5SZWN0YW5nbGUsXG59O1xuZXhwb3J0IHZhciBDb21wb25lbnREaXJlY3Rpb25UeXBlO1xuKGZ1bmN0aW9uIChDb21wb25lbnREaXJlY3Rpb25UeXBlKSB7XG4gICAgQ29tcG9uZW50RGlyZWN0aW9uVHlwZVtDb21wb25lbnREaXJlY3Rpb25UeXBlW1wiRnJvbnRcIl0gPSAwXSA9IFwiRnJvbnRcIjtcbiAgICBDb21wb25lbnREaXJlY3Rpb25UeXBlW0NvbXBvbmVudERpcmVjdGlvblR5cGVbXCJSaWdodEZyb250XCJdID0gMV0gPSBcIlJpZ2h0RnJvbnRcIjtcbiAgICBDb21wb25lbnREaXJlY3Rpb25UeXBlW0NvbXBvbmVudERpcmVjdGlvblR5cGVbXCJSaWdodFwiXSA9IDJdID0gXCJSaWdodFwiO1xuICAgIENvbXBvbmVudERpcmVjdGlvblR5cGVbQ29tcG9uZW50RGlyZWN0aW9uVHlwZVtcIkxlZnRcIl0gPSAzXSA9IFwiTGVmdFwiO1xuICAgIENvbXBvbmVudERpcmVjdGlvblR5cGVbQ29tcG9uZW50RGlyZWN0aW9uVHlwZVtcIkxlZnRGcm9udFwiXSA9IDRdID0gXCJMZWZ0RnJvbnRcIjtcbn0pKENvbXBvbmVudERpcmVjdGlvblR5cGUgfHwgKENvbXBvbmVudERpcmVjdGlvblR5cGUgPSB7fSkpO1xuZXhwb3J0IHZhciBDaXJjdWxhclNpZGU7XG4oZnVuY3Rpb24gKENpcmN1bGFyU2lkZSkge1xuICAgIENpcmN1bGFyU2lkZVtDaXJjdWxhclNpZGVbXCJMZWZ0XCJdID0gMF0gPSBcIkxlZnRcIjtcbiAgICBDaXJjdWxhclNpZGVbQ2lyY3VsYXJTaWRlW1wiUmlnaHRcIl0gPSAxXSA9IFwiUmlnaHRcIjtcbn0pKENpcmN1bGFyU2lkZSB8fCAoQ2lyY3VsYXJTaWRlID0ge30pKTtcbmV4cG9ydCBmdW5jdGlvbiBpc0F4aXNWYWxpZChheGlzKSB7XG4gICAgcmV0dXJuIGF4aXMgPT09IFwiWFwiIC8qIEF4aXMuWCAqLyB8fCBheGlzID09PSBcIi1YXCIgLyogQXhpcy5YTWludXMgKi8gfHwgYXhpcyA9PT0gXCJZXCIgLyogQXhpcy5ZICovIHx8IGF4aXMgPT09IFwiLVlcIiAvKiBBeGlzLllNaW51cyAqLyB8fCBheGlzID09PSBcIlpcIiAvKiBBeGlzLlogKi8gfHwgYXhpcyA9PT0gXCItWlwiIC8qIEF4aXMuWk1pbnVzICovO1xufVxuIiwiaW1wb3J0IHsgZHJhd1N0YWlyc1Rvb2wgfSBmcm9tIFwiLi9pbmRleFwiO1xuaW1wb3J0IHsgRGlyZWN0aW9uWCwgRGlyZWN0aW9uWSB9IGZyb20gXCIuL2NvbnN0c1wiO1xuaW1wb3J0IHsgQmFzZUxpbmUzZERlbGltaXRlciwgQ29sdW1uVHlwZSwgQ29vcmREZWxpbWl0ZXIsIERlZmF1bHRDb21wb25lbnRQYXJhbSwgRGVsaW1pdGVyLCBnZXREZWZhdWx0U3RhaXJQYXJhbSwgUmFpbFR5cGUgfSBmcm9tIFwiLi90eXBlc1wiO1xuZXhwb3J0IGZ1bmN0aW9uIGlzS0FyY2hGYWNlKGVudGl0eSkge1xuICAgIHJldHVybiAhIWVudGl0eSAmJiAoZW50aXR5LmdldFR5cGUoKSA9PT0gS0FyY2hGYWNlVHlwZS5Ob25QbGFuYXIgfHwgZW50aXR5LmdldFR5cGUoKSA9PT0gS0FyY2hGYWNlVHlwZS5QbGFuYXIpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzS0dyb3VwSW5zdGFuY2UoZW50aXR5KSB7XG4gICAgcmV0dXJuICEhZW50aXR5ICYmIGVudGl0eS5nZXRUeXBlKCkgPT09IEtFbnRpdHlUeXBlLkdyb3VwSW5zdGFuY2U7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNLRmFjZShlbnRpdHkpIHtcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS0VudGl0eVR5cGUuRmFjZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0tFZGdlKGVudGl0eSkge1xuICAgIHJldHVybiAhIWVudGl0eSAmJiBlbnRpdHkuZ2V0VHlwZSgpID09PSBLRW50aXR5VHlwZS5FZGdlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzS1ZlcnRleChlbnRpdHkpIHtcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS0VudGl0eVR5cGUuVmVydGV4O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzS0F1eGlsaWFyeUJvdW5kZWRDdXJ2ZShlbnRpdHkpIHtcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS0VudGl0eVR5cGUuQXV4aWxpYXJ5Qm91bmRlZEN1cnZlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzS0F1eGlsaWFyeUxpbmUoZW50aXR5KSB7XG4gICAgcmV0dXJuICEhZW50aXR5ICYmIGVudGl0eS5nZXRUeXBlKCkgPT09IEtFbnRpdHlUeXBlLkF1eGlsaWFyeUxpbmU7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNLUGxhbmUoZW50aXR5KSB7XG4gICAgcmV0dXJuICEhZW50aXR5ICYmIGVudGl0eS5nZXRUeXBlKCkgPT09IEtTdXJmYWNlVHlwZS5QbGFuZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0tMaW5lU2VnbWVudDNkKGVudGl0eSkge1xuICAgIHJldHVybiAhIWVudGl0eSAmJiAhIWVudGl0eS5kaXJlY3Rpb247XG59XG5leHBvcnQgZnVuY3Rpb24gaXNLQXJjM2QoZW50aXR5KSB7XG4gICAgcmV0dXJuICEhZW50aXR5ICYmICEhZW50aXR5LmNpcmNsZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnlNYXRlcmlhbChtYXRlcmlhbCkge1xuICAgIGxldCB2YWx1ZSA9ICcnO1xuICAgIGlmIChtYXRlcmlhbC5tYXRlcmlhbElkKSB7XG4gICAgICAgIHZhbHVlICs9IGBtaWQ9JHttYXRlcmlhbC5tYXRlcmlhbElkfSR7RGVsaW1pdGVyfWA7XG4gICAgfVxuICAgIGlmIChtYXRlcmlhbC5iZ2lkKSB7XG4gICAgICAgIHZhbHVlICs9IGBiaWQ9JHttYXRlcmlhbC5iZ2lkfSR7RGVsaW1pdGVyfWA7XG4gICAgfVxuICAgIGlmIChtYXRlcmlhbC5pbWdVcmwpIHtcbiAgICAgICAgdmFsdWUgKz0gYGltZz0ke21hdGVyaWFsLmltZ1VybH0ke0RlbGltaXRlcn1gO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWUuc2xpY2UoMCwgdmFsdWUubGVuZ3RoIC0gMSk7XG59XG5leHBvcnQgZnVuY3Rpb24gcGFyc2VNYXRlcmlhbCh2YWx1ZSkge1xuICAgIGNvbnN0IG1hdGVyaWFsID0ge307XG4gICAgY29uc3QgaXRlbXMgPSB2YWx1ZS5zcGxpdChEZWxpbWl0ZXIpO1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgICBjb25zdCBrZXlWYWx1ZSA9IGl0ZW0uc3BsaXQoJz0nKTtcbiAgICAgICAgaWYgKGtleVZhbHVlLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgc3dpdGNoIChrZXlWYWx1ZVswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ21pZCc6XG4gICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsLm1hdGVyaWFsSWQgPSBrZXlWYWx1ZVsxXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnYmlkJzpcbiAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWwuYmdpZCA9IGtleVZhbHVlWzFdO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdpbWcnOlxuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbC5pbWdVcmwgPSBrZXlWYWx1ZVsxXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGl0ZW1zLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gbWF0ZXJpYWw7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeVN0YWlyUGFyYW0ocGFyYW0pIHtcbiAgICBsZXQgdmFsdWUgPSAnJztcbiAgICB2YWx1ZSArPSBgaHM9JHtwYXJhbS5ob3Jpem9udGFsU3RlcH0ke0RlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGB2cz0ke3BhcmFtLnZlcnRpY2FsU3RlcH0ke0RlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGBzdz0ke3BhcmFtLnN0YXJ0V2lkdGh9JHtEZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgZXc9JHtwYXJhbS5lbmRXaWR0aH0ke0RlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGB1cD0ke3BhcmFtLnVwd2FyZCA/IDEgOiAwfSR7RGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYHB0az0ke3BhcmFtLnBsYXRmb3JtVGhpY2tuZXNzfWA7XG4gICAgaWYgKHBhcmFtLmhhbmRyYWlsLnN1cHBvcnQpIHtcbiAgICAgICAgY29uc3QgeyBoYW5kcmFpbDogeyBoZWlnaHQsIHJhaWwsIGNvbHVtbiB9IH0gPSBwYXJhbTtcbiAgICAgICAgdmFsdWUgKz0gYGhoPSR7aGVpZ2h0fSR7RGVsaW1pdGVyfWA7XG4gICAgICAgIHZhbHVlICs9IGBocnQ9JHtyYWlsLnR5cGV9JHtEZWxpbWl0ZXJ9YDtcbiAgICAgICAgaWYgKHJhaWwudHlwZSA9PT0gUmFpbFR5cGUuQ2lyY2xlICYmIHJhaWwucGFyYW0ucmFkaXVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHZhbHVlICs9IGBocnI9JHtyYWlsLnBhcmFtLnJhZGl1c30ke0RlbGltaXRlcn1gO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHJhaWwudHlwZSA9PT0gUmFpbFR5cGUuUmVjdCkge1xuICAgICAgICAgICAgaWYgKHJhaWwucGFyYW0ud2lkdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHZhbHVlICs9IGBocnc9JHtyYWlsLnBhcmFtLndpZHRofSR7RGVsaW1pdGVyfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmFpbC5wYXJhbS5oZWlnaHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHZhbHVlICs9IGBocmg9JHtyYWlsLnBhcmFtLmhlaWdodH0ke0RlbGltaXRlcn1gO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhbHVlICs9IGBoY3Q9JHtjb2x1bW4udHlwZX0ke0RlbGltaXRlcn1gO1xuICAgICAgICB2YWx1ZSArPSBgaGNzPSR7Y29sdW1uLnN0ZXB9JHtEZWxpbWl0ZXJ9YDtcbiAgICAgICAgaWYgKGNvbHVtbi50eXBlID09PSBDb2x1bW5UeXBlLkNpcmNsZSAmJiBjb2x1bW4ucGFyYW0ucmFkaXVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHZhbHVlICs9IGBoY3I9JHtjb2x1bW4ucGFyYW0ucmFkaXVzfSR7RGVsaW1pdGVyfWA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29sdW1uLnR5cGUgPT09IENvbHVtblR5cGUuUmVjdCkge1xuICAgICAgICAgICAgaWYgKGNvbHVtbi5wYXJhbS53aWR0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgKz0gYGhjdz0ke2NvbHVtbi5wYXJhbS53aWR0aH0ke0RlbGltaXRlcn1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbHVtbi5wYXJhbS5oZWlnaHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHZhbHVlICs9IGBoY2g9JHtjb2x1bW4ucGFyYW0uaGVpZ2h0fSR7RGVsaW1pdGVyfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlLnNsaWNlKDAsIHZhbHVlLmxlbmd0aCAtIDEpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlU3RhaXJQYXJhbSh2YWx1ZSkge1xuICAgIGNvbnN0IHBhcmFtID0gZ2V0RGVmYXVsdFN0YWlyUGFyYW0oKTtcbiAgICBjb25zdCBpdGVtcyA9IHZhbHVlLnNwbGl0KERlbGltaXRlcik7XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgIGNvbnN0IGtleVZhbHVlID0gaXRlbS5zcGxpdCgnPScpO1xuICAgICAgICBpZiAoa2V5VmFsdWUubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGtleVZhbHVlWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnaHMnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5ob3Jpem9udGFsU3RlcCA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAndnMnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS52ZXJ0aWNhbFN0ZXAgPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3N3JzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uc3RhcnRXaWR0aCA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZXcnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5lbmRXaWR0aCA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAndXAnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS51cHdhcmQgPSBrZXlWYWx1ZVsxXSA9PT0gJzEnID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdwdGsnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5wbGF0Zm9ybVRoaWNrbmVzcyA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnaGgnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5oYW5kcmFpbC5oZWlnaHQgPSBwYXJzZUZsb2F0KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnaHJ0JzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uaGFuZHJhaWwucmFpbC50eXBlID0gcGFyc2VGbG9hdChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hycic6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmhhbmRyYWlsLnJhaWwucGFyYW0ucmFkaXVzID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdocncnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5oYW5kcmFpbC5yYWlsLnBhcmFtLndpZHRoID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdocmgnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5oYW5kcmFpbC5yYWlsLnBhcmFtLmhlaWdodCA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnaGN0JzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uaGFuZHJhaWwuY29sdW1uLnR5cGUgPSBwYXJzZUZsb2F0KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnaGNzJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uaGFuZHJhaWwuY29sdW1uLnN0ZXAgPSBwYXJzZUZsb2F0KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnaGNyJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uaGFuZHJhaWwuY29sdW1uLnBhcmFtLnJhZGl1cyA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnaGN3JzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uaGFuZHJhaWwuY29sdW1uLnBhcmFtLndpZHRoID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdoY2gnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5oYW5kcmFpbC5jb2x1bW4ucGFyYW0uaGVpZ2h0ID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBwYXJhbS5zdGVwUHJvcG9ydGlvbmFsID0gdHJ1ZTtcbiAgICBwYXJhbS53aWR0aFByb3BvcnRpb25hbCA9IHRydWU7XG4gICAgcmV0dXJuIHBhcmFtO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeUNvbXBvbmVudFBhcmFtKHBhcmFtKSB7XG4gICAgbGV0IHZhbHVlID0gJyc7XG4gICAgdmFsdWUgKz0gYGluZD0ke3BhcmFtLmluZGV4fSR7RGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYGhzPSR7cGFyYW0uaG9yaXpvbnRhbFN0ZXB9JHtEZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgdnM9JHtwYXJhbS52ZXJ0aWNhbFN0ZXB9JHtEZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgc3c9JHtwYXJhbS5zdGFydFdpZHRofSR7RGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYGV3PSR7cGFyYW0uZW5kV2lkdGh9JHtEZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgb3c9JHtwYXJhbS5vZmZzZXRXaWR0aH0ke0RlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGBwbD0ke3BhcmFtLnBsYXRmb3JtTGVuZ3RofSR7RGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYHRwPSR7cGFyYW0udHlwZX0ke0RlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGB1cD0ke3BhcmFtLnVwd2FyZCA/IDEgOiAwfSR7RGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYHB0az0ke3BhcmFtLnBsYXRmb3JtVGhpY2tuZXNzfWA7XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQ29tcG9uZW50UGFyYW0odmFsdWUpIHtcbiAgICBjb25zdCBwYXJhbSA9IE9iamVjdC5hc3NpZ24oe30sIERlZmF1bHRDb21wb25lbnRQYXJhbSk7XG4gICAgY29uc3QgaXRlbXMgPSB2YWx1ZS5zcGxpdChEZWxpbWl0ZXIpO1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgICBjb25zdCBrZXlWYWx1ZSA9IGl0ZW0uc3BsaXQoJz0nKTtcbiAgICAgICAgaWYgKGtleVZhbHVlLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgc3dpdGNoIChrZXlWYWx1ZVswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2luZCc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmluZGV4ID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdocyc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmhvcml6b250YWxTdGVwID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd2cyc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnZlcnRpY2FsU3RlcCA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3cnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5zdGFydFdpZHRoID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdldyc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmVuZFdpZHRoID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdvdyc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLm9mZnNldFdpZHRoID0gcGFyc2VGbG9hdChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3BsJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0ucGxhdGZvcm1MZW5ndGggPSBwYXJzZUZsb2F0KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAndHAnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS50eXBlID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd1cCc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnVwd2FyZCA9IGtleVZhbHVlWzFdID09PSAnMScgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3B0ayc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnBsYXRmb3JtVGhpY2tuZXNzID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBwYXJhbS5zdGVwUHJvcG9ydGlvbmFsID0gdHJ1ZTtcbiAgICBwYXJhbS53aWR0aFByb3BvcnRpb25hbCA9IHRydWU7XG4gICAgcGFyYW0ucGxhdGZvcm1MZW5ndGhMb2NrZWQgPSB0cnVlO1xuICAgIHBhcmFtLm1vZGVsRWRpdGluZyA9IHRydWU7XG4gICAgcmV0dXJuIHBhcmFtO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeVN0YXJ0RW5kKHN0YXJ0LCBlbmQpIHtcbiAgICBsZXQgdmFsdWUgPSAnJztcbiAgICB2YWx1ZSArPSBgJHtzdGFydC54fSR7Q29vcmREZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgJHtzdGFydC55fSR7Q29vcmREZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgJHtzdGFydC56fSR7RGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYCR7ZW5kLnh9JHtDb29yZERlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGAke2VuZC55fSR7Q29vcmREZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgJHtlbmQuen1gO1xuICAgIHJldHVybiB2YWx1ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUxpbmVTZWczZCh2YWx1ZSkge1xuICAgIGNvbnN0IGl0ZW1zID0gdmFsdWUuc3BsaXQoRGVsaW1pdGVyKTtcbiAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0S2V5VmFsdWUgPSBpdGVtc1swXS5zcGxpdChDb29yZERlbGltaXRlcik7XG4gICAgICAgIGNvbnN0IGVuZEtleVZhbHVlID0gaXRlbXNbMV0uc3BsaXQoQ29vcmREZWxpbWl0ZXIpO1xuICAgICAgICBpZiAoc3RhcnRLZXlWYWx1ZS5sZW5ndGggPT09IDMgJiYgZW5kS2V5VmFsdWUubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IEdlb21MaWIuY3JlYXRlUG9pbnQzZChwYXJzZUZsb2F0KHN0YXJ0S2V5VmFsdWVbMF0pLCBwYXJzZUZsb2F0KHN0YXJ0S2V5VmFsdWVbMV0pLCBwYXJzZUZsb2F0KHN0YXJ0S2V5VmFsdWVbMl0pKTtcbiAgICAgICAgICAgIGNvbnN0IGVuZCA9IEdlb21MaWIuY3JlYXRlUG9pbnQzZChwYXJzZUZsb2F0KGVuZEtleVZhbHVlWzBdKSwgcGFyc2VGbG9hdChlbmRLZXlWYWx1ZVsxXSksIHBhcnNlRmxvYXQoZW5kS2V5VmFsdWVbMl0pKTtcbiAgICAgICAgICAgIHJldHVybiB7IHN0YXJ0LCBlbmQgfTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVN0YXJ0RW5kKHZhbHVlKSB7XG4gICAgY29uc3QgaXRlbXMgPSB2YWx1ZS5zcGxpdChEZWxpbWl0ZXIpO1xuICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgY29uc3Qgc3RhcnRLZXlWYWx1ZSA9IGl0ZW1zWzBdLnNwbGl0KENvb3JkRGVsaW1pdGVyKTtcbiAgICAgICAgY29uc3QgZW5kS2V5VmFsdWUgPSBpdGVtc1sxXS5zcGxpdChDb29yZERlbGltaXRlcik7XG4gICAgICAgIGlmIChzdGFydEtleVZhbHVlLmxlbmd0aCA9PT0gMyAmJiBlbmRLZXlWYWx1ZS5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKHBhcnNlRmxvYXQoc3RhcnRLZXlWYWx1ZVswXSksIHBhcnNlRmxvYXQoc3RhcnRLZXlWYWx1ZVsxXSksIDApO1xuICAgICAgICAgICAgY29uc3QgZW5kID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKHBhcnNlRmxvYXQoZW5kS2V5VmFsdWVbMF0pLCBwYXJzZUZsb2F0KGVuZEtleVZhbHVlWzFdKSwgMCk7XG4gICAgICAgICAgICByZXR1cm4geyBzdGFydCwgZW5kLCBzdGFydEhlaWdodDogcGFyc2VGbG9hdChzdGFydEtleVZhbHVlWzJdKSwgZW5kSGVpZ2h0OiBwYXJzZUZsb2F0KGVuZEtleVZhbHVlWzJdKSB9O1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeVBvaW50M2QocG9pbnQpIHtcbiAgICBsZXQgdmFsdWUgPSAnJztcbiAgICB2YWx1ZSArPSBgJHtwb2ludC54fSR7Q29vcmREZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgJHtwb2ludC55fSR7Q29vcmREZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgJHtwb2ludC56fWA7XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVmVjdG9yM2QodmFsdWUpIHtcbiAgICBjb25zdCBpdGVtcyA9IHZhbHVlLnNwbGl0KENvb3JkRGVsaW1pdGVyKTtcbiAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAzKSB7XG4gICAgICAgIGNvbnN0IHZlY3RvciA9IEdlb21MaWIuY3JlYXRlVmVjdG9yM2QocGFyc2VGbG9hdChpdGVtc1swXSksIHBhcnNlRmxvYXQoaXRlbXNbMV0pLCBwYXJzZUZsb2F0KGl0ZW1zWzJdKSk7XG4gICAgICAgIHJldHVybiB2ZWN0b3I7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeUJhc2VDb21wb25lbnQoYmFzZVNlZ21lbnQsIGxpbmUzZEluZGV4KSB7XG4gICAgbGV0IHZhbHVlID0gJyc7XG4gICAgdmFsdWUgKz0gYCR7YmFzZVNlZ21lbnQucGFyYW0uaW5kZXh9YDtcbiAgICBpZiAobGluZTNkSW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSArPSBgJHtDb29yZERlbGltaXRlcn0ke2xpbmUzZEluZGV4fWA7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUJhc2VDb21wb25lbnQodmFsdWUpIHtcbiAgICBjb25zdCBpdGVtcyA9IHZhbHVlLnNwbGl0KEJhc2VMaW5lM2REZWxpbWl0ZXIpO1xuICAgIGlmIChpdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IGJhc2VDb21wb25lbnRJbmRleCA9IHBhcnNlSW50KGl0ZW1zWzBdKTtcbiAgICAgICAgbGV0IGxpbmUzZEluZGV4O1xuICAgICAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICBsaW5lM2RJbmRleCA9IHBhcnNlSW50KGl0ZW1zWzFdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBjb21wb25lbnRJbmRleDogYmFzZUNvbXBvbmVudEluZGV4LCBsaW5lM2RJbmRleCB9O1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0VxdWFsKGEsIGIsIHRvbGVyYW5jZSA9IDEpIHtcbiAgICByZXR1cm4gTWF0aC5hYnMoYSAtIGIpIDw9IHRvbGVyYW5jZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb29yZGluYXRlKG5vcm1hbCkge1xuICAgIGxldCBkeCA9IERpcmVjdGlvblg7XG4gICAgbGV0IGR5ID0gRGlyZWN0aW9uWTtcbiAgICBsZXQgZHogPSBub3JtYWwubm9ybWFsaXplZCgpO1xuICAgIGlmIChEaXJlY3Rpb25YLmlzUGFyYWxsZWwoZHopKSB7XG4gICAgICAgIGR4ID0gRGlyZWN0aW9uWS5jcm9zcyhkeikubm9ybWFsaXplZCgpO1xuICAgICAgICBkeSA9IGR6LmNyb3NzKGR5KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGR5ID0gZHouY3Jvc3MoZHgpO1xuICAgICAgICBkeCA9IGR5LmNyb3NzKGR6KTtcbiAgICB9XG4gICAgcmV0dXJuIHsgZHgsIGR5LCBkeiB9O1xufVxubGV0IGlzSW5PcGVyYXRpb24gPSBmYWxzZTtcbmV4cG9ydCBmdW5jdGlvbiBzdGFydE9wZXJhdGlvbigpIHtcbiAgICBpc0luT3BlcmF0aW9uID0gdHJ1ZTtcbiAgICBhcHAuZ2V0QWN0aXZlRGVzaWduKCkuc3RhcnRPcGVyYXRpb24oKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb21taXRPcGVyYXRpb24oKSB7XG4gICAgaXNJbk9wZXJhdGlvbiA9IGZhbHNlO1xuICAgIGFwcC5nZXRBY3RpdmVEZXNpZ24oKS5jb21taXRPcGVyYXRpb24oKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBhYm9ydE9wZXJhdGlvbigpIHtcbiAgICBpc0luT3BlcmF0aW9uID0gZmFsc2U7XG4gICAgYXBwLmdldEFjdGl2ZURlc2lnbigpLmFib3J0T3BlcmF0aW9uKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gb25Nb2RlbENoYW5nZWQoY2hhbmdlcykge1xuICAgIGNvbnN0IGRlbGV0ZWQgPSBjaGFuZ2VzLmRlbGV0ZWQ7XG4gICAgY29uc3QgYWRkZWQgPSBjaGFuZ2VzLmFkZGVkO1xuICAgIC8vIGNvbnN0IGVkaXRNb2RlbCA9IGRyYXdTdGFpcnNUb29sLmdldEVkaXRNb2RlbCgpO1xuICAgIGlmICghaXNJbk9wZXJhdGlvbiAmJiAoKGRlbGV0ZWQgPT09IG51bGwgfHwgZGVsZXRlZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGVsZXRlZC5sZW5ndGgpIHx8IChhZGRlZCA9PT0gbnVsbCB8fCBhZGRlZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYWRkZWQubGVuZ3RoKSkpIHtcbiAgICAgICAgLy8gaWYgKGRlbGV0ZWQuc29tZShkZWxldGVHcm91cCA9PiBlZGl0TW9kZWwucGFyZW50LmRlZmluaXRpb25LZXkgPT09IGRlbGV0ZUdyb3VwLmdldEtleSgpKSkge1xuICAgICAgICBkcmF3U3RhaXJzVG9vbC5jbGVhckVkaXRNb2RlbCgpO1xuICAgICAgICAvLyB9XG4gICAgfVxufVxuIiwiZXhwb3J0IHZhciBNZXNzYWdlVHlwZTtcbihmdW5jdGlvbiAoTWVzc2FnZVR5cGUpIHtcbiAgICBNZXNzYWdlVHlwZVtcIkRyYXdTdGFpclZpZXdNb3VudGVkXCJdID0gXCJkcmF3U3RhaXJWaWV3TW91bnRlZFwiO1xuICAgIE1lc3NhZ2VUeXBlW1wiU3RhaXJQYXJhbUNoYW5nZWRCeUlucHV0XCJdID0gXCJzdGFpclBhcmFtQ2hhbmdlZEJ5SW5wdXRcIjtcbiAgICBNZXNzYWdlVHlwZVtcIlN0YWlyUGFyYW1DaGFuZ2VkQnlEcmF3XCJdID0gXCJzdGFpclBhcmFtQ2hhbmdlZEJ5RHJhd1wiO1xuICAgIE1lc3NhZ2VUeXBlW1wiUGFyYW1DaGFuZ2VkQnlJbnB1dFwiXSA9IFwicGFyYW1DaGFuZ2VkQnlJbnB1dFwiO1xuICAgIE1lc3NhZ2VUeXBlW1wiUGFyYW1DaGFuZ2VkQnlEcmF3XCJdID0gXCJwYXJhbUNoYW5nZWRCeURyYXdcIjtcbiAgICBNZXNzYWdlVHlwZVtcIkNvbXBvbmVudEFkZGVkXCJdID0gXCJjb21wb25lbnRBZGRlZFwiO1xuICAgIE1lc3NhZ2VUeXBlW1wiRHJhd1N0YWlyTW9kZWxTZXR0bGVkXCJdID0gXCJkcmF3U3RhaXJNb2RlbFNldHRsZWRcIjtcbiAgICBNZXNzYWdlVHlwZVtcIlByb3BlcnRpZXNWaXNpYmxlXCJdID0gXCJwcm9wZXJ0aWVzVmlzaWJsZVwiO1xuICAgIE1lc3NhZ2VUeXBlW1wiRm9jdXNDb21wb25lbnRJbmRleFwiXSA9IFwiZm9jdXNDb21wb25lbnRJbmRleFwiO1xuICAgIE1lc3NhZ2VUeXBlW1wiUmVtb3ZlQ29tcG9uZW50XCJdID0gXCJyZW1vdmVDb21wb25lbnRcIjtcbiAgICBNZXNzYWdlVHlwZVtcIk1hdGVyaWFsUmVwbGFjZUNsaWNrXCJdID0gXCJtYXRlcmlhbFJlcGxhY2VDbGlja1wiO1xuICAgIE1lc3NhZ2VUeXBlW1wiQWN0aXZhdGVEcmF3U3RhaXJzVG9vbFwiXSA9IFwiYWN0aXZhdGVEcmF3U3RhaXJzVG9vbFwiO1xuICAgIE1lc3NhZ2VUeXBlW1wiRGVBY3RpdmF0ZURyYXdTdGFpcnNUb29sXCJdID0gXCJkZUFjdGl2YXRlRHJhd1N0YWlyc1Rvb2xcIjtcbiAgICBNZXNzYWdlVHlwZVtcIkxlYXZlRHJhd1N0YWlyc1Rvb2xcIl0gPSBcImxlYXZlRHJhd1N0YWlyc1Rvb2xcIjtcbn0pKE1lc3NhZ2VUeXBlIHx8IChNZXNzYWdlVHlwZSA9IHt9KSk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL21haW4vbWFpbi50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==