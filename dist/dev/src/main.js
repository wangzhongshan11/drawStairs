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
        this.stairParam = _types__WEBPACK_IMPORTED_MODULE_0__.DefaultStairParam;
        this.onMaterialReplaceItemClick = (changeParam, index, isDelete) => {
            const that = this;
            return (materialId = '', bgid = '') => __awaiter(this, void 0, void 0, function* () {
                const loadMaterialRes = yield design.loadMaterial(materialId);
                if (!loadMaterialRes.isSuccess) {
                    return;
                }
                const instancePath = that.editModel ? design.getEditPathsToGroupInstance(that.editModel.parent.instance) : [];
                if (changeParam === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.ComponentMaterial) {
                    const segment = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.getSegmentByIndex)(that.segments, index);
                    if (segment && index !== undefined) {
                        if (that.drawing) {
                            segment.param.material = { materialId, bgid };
                            pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.ParamChangedByDraw, componentParam: Object.assign({}, segment.param) }, '*');
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
                    if (!that.editModel) {
                        if (changeParam === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.StairMaterial) {
                            that.stairParam.stairMaterial = { materialId, bgid };
                        }
                        else {
                            that.stairParam.platformMaterial = { materialId, bgid };
                        }
                        pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.StairParamChangedByDraw, stairParam: that.stairParam }, '*');
                    }
                    else if (instancePath) {
                        (0,_utils__WEBPACK_IMPORTED_MODULE_3__.startOperation)();
                        let operationSuccess = true;
                        operationSuccess = operationSuccess && (yield design.activateEditPath([...instancePath[0], that.editModel.parent.instance])).isSuccess;
                        const components = changeParam === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.StairMaterial ? that.editModel.stairs : that.editModel.platforms;
                        const componentInstances = [];
                        for (const [ind, instanceData] of components) {
                            const theSegment = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.getSegmentByIndex)(that.segments, ind);
                            if (theSegment && !theSegment.param.material) {
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
                            if (changeParam === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.StairMaterial) {
                                that.stairParam.stairMaterial = { materialId, bgid };
                            }
                            else {
                                that.stairParam.platformMaterial = { materialId, bgid };
                            }
                            pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.StairParamChangedByDraw, stairParam: that.stairParam }, '*');
                        }
                        else {
                            (0,_utils__WEBPACK_IMPORTED_MODULE_3__.abortOperation)();
                        }
                    }
                }
                else if (changeParam === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.HandrailRailMaterial || changeParam === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.HandrailColumnMaterial) {
                    if (!that.editModel) {
                        if (changeParam === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.HandrailRailMaterial) {
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
                        const components = changeParam === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.HandrailRailMaterial ? that.editModel.handrail.railInstances : that.editModel.handrail.columnInstances;
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
    onMaterialReplaceClick(changeParam, index) {
        app.getApplicationUI().toggleMaterialReplacePanel(true, this.onMaterialReplaceItemClick(changeParam, index));
    }
    changeStairParam(stairParam, changeParams) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function* () {
            // this.stairParam = stairParam
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
                    }
                    const parentTransform = this.editModel ? this.editModel.parent.instance.getTransform() : undefined;
                    for (const reGenerateSegment of reGenerateSegments) {
                        if (this.drawing) {
                            this.stairParam = stairParam;
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
                    if (!this.drawing && this.editModel) {
                        this.generateHandrailShape(stairParam);
                        if ((_c = this.handrailCollection) === null || _c === void 0 ? void 0 : _c.handrails.length) {
                            if (this.editModel.handrail) {
                                operationSuccess = operationSuccess && design.removeGroupInstance(this.editModel.handrail.handrailInstance.instance).isSuccess;
                                this.editModel.handrail = undefined;
                            }
                            const handrailInstancesData = yield (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.buildHandrailInstance)(stairParam, (_d = this.handrailCollection) === null || _d === void 0 ? void 0 : _d.handrails, this.editModel.parent.instance.getTransform());
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
                            this.stairParam = stairParam;
                            pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.StairParamChangedByDraw, stairParam: this.stairParam }, '*');
                        }
                        else {
                            (0,_utils__WEBPACK_IMPORTED_MODULE_3__.abortOperation)();
                            pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.StairParamChangedByDraw, stairParam: this.stairParam }, '*');
                        }
                        selection.add([parentInstance]);
                    }
                    else if (this.drawing) {
                        this.drawHandrails();
                    }
                }
            }
            else if (changeParams.length === 1 && changeParams[0].startsWith(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.Handrail)) {
                if (this.drawing) {
                    this.stairParam = stairParam;
                    this.drawHandrails();
                }
                else if (this.editModel) {
                    this.generateHandrailShape(stairParam);
                    let operationSuccess = true;
                    (0,_utils__WEBPACK_IMPORTED_MODULE_3__.startOperation)();
                    stairPraamString = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.stringifyStairParam)(stairParam);
                    operationSuccess = operationSuccess && !!((_e = this.editModel.parent.instance.getGroupDefinition()) === null || _e === void 0 ? void 0 : _e.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.StairParamKey, stairPraamString).isSuccess);
                    if (instancePath.length) {
                        operationSuccess = operationSuccess && (yield design.activateEditPath([...instancePath[0], this.editModel.parent.instance])).isSuccess;
                    }
                    if (this.editModel.handrail) {
                        operationSuccess = operationSuccess && design.removeGroupInstance(this.editModel.handrail.handrailInstance.instance).isSuccess;
                        this.editModel.handrail = undefined;
                    }
                    if ((_f = this.handrailCollection) === null || _f === void 0 ? void 0 : _f.handrails.length) {
                        const handrailInstancesData = yield (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.buildHandrailInstance)(stairParam, (_g = this.handrailCollection) === null || _g === void 0 ? void 0 : _g.handrails, this.editModel.parent.instance.getTransform());
                        operationSuccess = operationSuccess && handrailInstancesData !== undefined;
                        if (handrailInstancesData) {
                            this.editModel.handrail = handrailInstancesData;
                        }
                        // }
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
            else if (!stairParam.stairMaterial && changeParams.length === 0 && changeParams[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.StairMaterial) {
                yield this.onMaterialReplaceItemClick(changeParams[0], undefined, true)();
            }
            else if (!stairParam.platformMaterial && changeParams.length === 0 && changeParams[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.PlatformLength) {
                yield this.onMaterialReplaceItemClick(changeParams[0], undefined, true)();
            }
            else if (!stairParam.handrail.rail.material && changeParams.length === 0 && changeParams[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.HandrailRailMaterial) {
                yield this.onMaterialReplaceItemClick(changeParams[0], undefined, true)();
            }
            else if (!stairParam.handrail.column.material && changeParams.length === 0 && changeParams[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.HandrailColumnMaterial) {
                yield this.onMaterialReplaceItemClick(changeParams[0], undefined, true)();
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
                componentParam.modelEditing = true;
                // theSegment.param = componentParam;
                if (!(0,_tempMeshUtils__WEBPACK_IMPORTED_MODULE_1__.isCircularStair)(theSegment)) {
                    theSegment.circleTangent = undefined;
                }
                if (changeParams.length === 0 && changeParams[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.ComponentMaterial && !componentParam.material) {
                    this.onMaterialReplaceItemClick(changeParams[0], componentParam.index, true);
                }
                else {
                    let reGenerateSegments = [theSegment];
                    if (changeParams.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.Upward) > -1) {
                        reGenerateSegments = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.changeStairUpward)(theSegment, this.segments, theSegment.param.upward, false, true) || reGenerateSegments;
                    }
                    if (reGenerateSegments.length) {
                        let operationSuccess = true;
                        const instancePath = this.editModel ? design.getEditPathsToGroupInstance(this.editModel.parent.instance) : [];
                        if (this.drawing) {
                            theSegment.param = componentParam;
                        }
                        else if (this.editModel) {
                            design.startOperation();
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
                        if (this.drawing) {
                            this.drawHandrails();
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
                                theSegment.param = componentParam;
                                pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.ParamChangedByDraw, componentParam: Object.assign({}, theSegment.param) }, '*');
                            }
                            else {
                                (0,_utils__WEBPACK_IMPORTED_MODULE_3__.abortOperation)();
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
        let current = [{ segment: startSegment, verticalDelta: 0 }];
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
                    current = [{ segment: theSegment, verticalDelta: theSegment.startHeight > 0 === upward ? 0 : (theSegment.startHeight * -2) }];
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
                const offsetLength = _types__WEBPACK_IMPORTED_MODULE_2__.HandrailDefaultOffsetLength;
                const baseSegment = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_1__.getSegmentByIndex)(segments, baseComponent === null || baseComponent === void 0 ? void 0 : baseComponent.componentIndex);
                const { startLine: { line3dInd: startLine3dInd }, baseLine: { dir: baseLine3dDir, end: baseLine3dEnd }, } = getSegmentStartAndBaseLine3d(currentSegment, segments, baseSegment);
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
                        const { endOnBaseLine } = getSegmentStartAndBaseLine3d(nearestSegment.segment, segments).startLine;
                        ep = endOnBaseLine;
                        spToEpDir = ep.subtracted(sp).normalized();
                        if (spToEpDir.dot(line3dDir) <= 0) {
                            lastDistance = 0;
                            pushEnd = false;
                            nextStartPoint = sp;
                        }
                        else {
                            lastDistance = sp.distanceTo(ep);
                            nextStartPoint = isPlatform(nearestSegment.segment) ? ep : undefined;
                        }
                    }
                    else if (isEntrance && hasEntranceSegment && baseSegment) {
                        //     // don't care because next is platform (next will deal the case) or stair (only have one nextComponent which is currentSegment)
                        // if (baseSegment.param.type === ComponentType.Platform && nextSiblingSegment) {
                        ep = baseLine3dEnd;
                        spToEpDir = ep.subtracted(sp).normalized();
                        if (spToEpDir.dot(baseLine3dDir) >= 0) {
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
                    const reasonableStepCount = Math.ceil(step / horizontalStep);
                    let tempStepCount = 0;
                    const arcChordAngle = circleTangent ? startToEndDir.angle(circleTangent) : 0;
                    if (type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.StraightStair || (type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.CircularStair && (arcChordAngle <= _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionAngleTolerance || !circleTangent))) {
                        lastLength = sp.distanceTo(ep);
                        // push rail
                        stairRail.push(sp.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight + height + (upward ? 1 : 0) * stepHeight)).added(leftDir.multiplied(left ? -offsetLength : offsetLength)));
                        if (!upward && stepCount > 1) {
                            stairRail.push(sp.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight + height)).added(frontDir.multiplied(horizontalStep)).added(leftDir.multiplied(left ? -offsetLength : offsetLength)));
                        }
                        // push columns
                        while (tempStepCount < stepCount - 1) {
                            const curHorStepDistance = (tempStepCount + 0.5) * horizontalStep;
                            const curVerStepDistance = (tempStepCount + (upward ? 1 : 0)) * stepHeight;
                            const bottomPoint = sp.added(frontDir.multiplied(curHorStepDistance)).added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight + curVerStepDistance)).added(leftDir.multiplied(left ? -offsetLength : offsetLength));
                            stairColumns.push([
                                bottomPoint,
                                bottomPoint.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(!upward && tempStepCount === 0 ? height : columnActualHeight)),
                            ]);
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
                        sp = left ? start.added(baseLine3dDir.multiplied(startWidth / 2)) : end.added(leftDir.multiplied(-startWidth / 2));
                        // sp = left ? start.added(baseLine3dDir.multiplied(startWidth / 2 - offsetLength)) : end.added(leftDir.multiplied(-startWidth / 2 + offsetLength));
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
                            if (tempStepCount >= 0) {
                                // push rail
                                if (left) {
                                    stairRail.push(curLeftBottomPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height + (tempStepCount > 0 && !upward ? -stepHeight : 0))));
                                }
                                else {
                                    stairRail.push(curRightBottomPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height + (tempStepCount > 0 && !upward ? -stepHeight : 0))));
                                }
                                if (tempStepCount === stepCount - 1) {
                                    const lastStepPercent = lastHorizontalAngle / horizontalStepAngle;
                                    if (left) {
                                        stairRail.push(curLeftBottomMidPt.added(curStepLeftFrontDir).added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height + (upward ? 0 : -stepHeight * (1 - lastStepPercent)))));
                                    }
                                    else {
                                        stairRail.push(curRightBottomMidPt.added(curStepRightFrontDir).added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height + (upward ? 0 : -stepHeight * (1 - lastStepPercent)))));
                                    }
                                    stairColumns.push([
                                        left ? curLeftBottomMidPt : curRightBottomMidPt,
                                        (left ? curLeftBottomMidPt : curRightBottomMidPt).added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height + (upward ? 0 : (verticalStep * (1 - lastStepPercent / 2))))),
                                    ]);
                                    // next segment startWidth !== currentSegment endWidth
                                    sp = left ? start.added(baseLine3dDir.multiplied(startWidth / 2)) : curRightMoldPt;
                                    // sp = left ? start.added(baseLine3dDir.multiplied(startWidth / 2 - offsetLength)) : curRightMoldPt;
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
                            //     // never happen
                            // if (nextSiblingSegment && baseSegment.param.type !== ComponentType.Platform) {
                            ep = baseLine3dEnd;
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
                            const { line3dInd: stairNextLine3dInd, endOnBaseLine } = getSegmentStartAndBaseLine3d(stairNextSegment, segments, currentSegment).startLine;
                            ep = endOnBaseLine;
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
/* harmony export */   HandrailDefaultOffsetLength: () => (/* binding */ HandrailDefaultOffsetLength),
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
            param: { radius: 12, width: 40, height: 30, },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQSxDQUFDLGtDQUFrQzs7Ozs7OztVQ2hCbkM7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kcmF3LXN0YWlycy8uL3NyYy9tYWluL21haW4udHMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvLi9zcmMvbWFpbi90b29scy9EcmF3U3RhaXJzVG9vbC9jb25zdHMudHMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvLi9zcmMvbWFpbi90b29scy9EcmF3U3RhaXJzVG9vbC9pbmRleC50cyIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy8uL3NyYy9tYWluL3Rvb2xzL0RyYXdTdGFpcnNUb29sL21lc2hVdGlscy50cyIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy8uL3NyYy9tYWluL3Rvb2xzL0RyYXdTdGFpcnNUb29sL3RlbXBNZXNoVXRpbHMudHMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvLi9zcmMvbWFpbi90b29scy9EcmF3U3RhaXJzVG9vbC90eXBlcy50cyIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy8uL3NyYy9tYWluL3Rvb2xzL0RyYXdTdGFpcnNUb29sL3V0aWxzLnRzIiwid2VicGFjazovL2RyYXctc3RhaXJzLy4vc3JjL21haW4vdHlwZXMudHMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2RyYXctc3RhaXJzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2RyYXctc3RhaXJzL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBkcmF3U3RhaXJzVG9vbCB9IGZyb20gXCIuL3Rvb2xzL0RyYXdTdGFpcnNUb29sL2luZGV4XCI7XG5pbXBvcnQgeyBpc0tHcm91cEluc3RhbmNlLCBpc1BhcnRPZkVkaXRNb2RlbCwgb25Nb2RlbENoYW5nZWQgfSBmcm9tIFwiLi90b29scy9EcmF3U3RhaXJzVG9vbC91dGlsc1wiO1xuaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi90eXBlc1wiO1xuY29uc3QgcGx1Z2luVUkgPSBhcHAuZ2V0UGx1Z2luVUkoKTtcbnBsdWdpblVJLnJlc2l6ZSgzNjAsIDcyMCk7XG5wbHVnaW5VSS5tb3VudCgpO1xubGV0IGFjdGl2YXRlZEN1c3RvbVRvb2w7XG5mdW5jdGlvbiBvblVJTWVzc2FnZShkYXRhKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChkYXRhLnR5cGUgPT09IE1lc3NhZ2VUeXBlLkRyYXdTdGFpclZpZXdNb3VudGVkKSB7XG4gICAgICAgICAgICAgICAgb25QbHVnaW5TdGFydFVwKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09IE1lc3NhZ2VUeXBlLkFjdGl2YXRlRHJhd1N0YWlyc1Rvb2wpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiAoZGF0YS50eXBlID09PSAnYWN0aXZhdGVTdHJhaWdodFN0YWlyc1Rvb2wnIHx8IGRhdGEudHlwZSA9PT0gJ2FjdGl2YXRlQ2lyY3VsYXJTdGFpcnNUb29sJykge1xuICAgICAgICAgICAgICAgIGlmIChhY3RpdmF0ZWRDdXN0b21Ub29sICE9PSBkcmF3U3RhaXJzVG9vbCkge1xuICAgICAgICAgICAgICAgICAgICBhcHAuYWN0aXZhdGVDdXN0b21Ub29sKGRyYXdTdGFpcnNUb29sLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZhdGVkQ3VzdG9tVG9vbCA9IGRyYXdTdGFpcnNUb29sO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBkcmF3U3RhaXJzVG9vbC5jaGFuZ2VDb21wb25lbnRUeXBlKGRhdGEuY29tcG9uZW50VHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09IE1lc3NhZ2VUeXBlLkRlQWN0aXZhdGVEcmF3U3RhaXJzVG9vbCkge1xuICAgICAgICAgICAgICAgIC8vIH0gZWxzZSBpZiAoZGF0YS50eXBlID09PSAnZGVBY3RpdmF0ZVN0cmFpZ2h0U3RhaXJzVG9vbCcgfHwgZGF0YS50eXBlID09PSAnZGVBY3RpdmF0ZUNpcmN1bGFyU3RhaXJzVG9vbCcpIHtcbiAgICAgICAgICAgICAgICBkZUFjdGl2YXRlRHJhd1N0YWlyc1Rvb2woKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gTWVzc2FnZVR5cGUuU3RhaXJQYXJhbUNoYW5nZWRCeUlucHV0KSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgKGFjdGl2YXRlZEN1c3RvbVRvb2wgPT09IGRyYXdTdGFpcnNUb29sKSB7XG4gICAgICAgICAgICAgICAgZHJhd1N0YWlyc1Rvb2wuY2hhbmdlU3RhaXJQYXJhbShkYXRhLnN0YWlyUGFyYW0sIGRhdGEuY2hhbmdlUGFyYW1zKTtcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09IE1lc3NhZ2VUeXBlLlBhcmFtQ2hhbmdlZEJ5SW5wdXQpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiAoYWN0aXZhdGVkQ3VzdG9tVG9vbCA9PT0gZHJhd1N0YWlyc1Rvb2wpIHtcbiAgICAgICAgICAgICAgICBkcmF3U3RhaXJzVG9vbC5jaGFuZ2VDb21wb25lbnRQYXJhbShkYXRhLmNvbXBvbmVudFBhcmFtLCBkYXRhLmNoYW5nZVBhcmFtcyk7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSBNZXNzYWdlVHlwZS5Gb2N1c0NvbXBvbmVudEluZGV4KSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgKGFjdGl2YXRlZEN1c3RvbVRvb2wgPT09IGRyYXdTdGFpcnNUb29sKSB7XG4gICAgICAgICAgICAgICAgZHJhd1N0YWlyc1Rvb2wuZm9jdXNDb21wb25lbnQoZGF0YS5jb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSBNZXNzYWdlVHlwZS5SZW1vdmVDb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiAoYWN0aXZhdGVkQ3VzdG9tVG9vbCA9PT0gZHJhd1N0YWlyc1Rvb2wpIHtcbiAgICAgICAgICAgICAgICBkcmF3U3RhaXJzVG9vbC5yZW1vdmVDb21wb25lbnQoZGF0YS5jb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSBNZXNzYWdlVHlwZS5NYXRlcmlhbFJlcGxhY2VDbGljaykge1xuICAgICAgICAgICAgICAgIC8vIGlmIChhY3RpdmF0ZWRDdXN0b21Ub29sID09PSBkcmF3U3RhaXJzVG9vbCkge1xuICAgICAgICAgICAgICAgIGRyYXdTdGFpcnNUb29sLm9uTWF0ZXJpYWxSZXBsYWNlQ2xpY2soZGF0YS5jaGFuZ2VQYXJhbSwgZGF0YS5pbmRleCk7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICBjbG9zZVBsdWdpbigpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZGVBY3RpdmF0ZURyYXdTdGFpcnNUb29sKCkge1xuICAgIGFjdGl2YXRlZEN1c3RvbVRvb2wgPSB1bmRlZmluZWQ7XG4gICAgYXBwLmRlYWN0aXZhdGVDdXN0b21Ub29sKGRyYXdTdGFpcnNUb29sLCBmYWxzZSk7XG59XG5wbHVnaW5VSS5vbk1lc3NhZ2Uob25VSU1lc3NhZ2UpO1xuY29uc3Qgc2VsZWN0aW9uID0gYXBwLmdldFNlbGVjdGlvbigpO1xuc2VsZWN0aW9uLmFkZE9ic2VydmVyKHtcbiAgICBvblNlbGVjdGlvbkNoYW5nZTogKCkgPT4ge1xuICAgICAgICBjb25zdCBhbGxFbnRpdGllcyA9IHNlbGVjdGlvbi5nZXRBbGxFbnRpdGllcygpO1xuICAgICAgICBpZiAoYWxsRW50aXRpZXMubGVuZ3RoID09PSAxICYmIGlzS0dyb3VwSW5zdGFuY2UoYWxsRW50aXRpZXNbMF0pKSB7XG4gICAgICAgICAgICBkcmF3U3RhaXJzVG9vbC5jbGVhclRlbXBTaGFwZXMoKTtcbiAgICAgICAgICAgIGRyYXdTdGFpcnNUb29sLnNldE1vZGVsKGFsbEVudGl0aWVzWzBdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhbGxFbnRpdGllcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGVkaXRQYXRoID0gYXBwLmdldEFjdGl2ZURlc2lnbigpLmdldEVkaXRQYXRoKCk7XG4gICAgICAgICAgICBjb25zdCBlZGl0TW9kZWwgPSBkcmF3U3RhaXJzVG9vbC5nZXRFZGl0TW9kZWwoKTtcbiAgICAgICAgICAgIGlmICghZWRpdE1vZGVsIHx8IChlZGl0UGF0aC5sZW5ndGggJiYgaXNQYXJ0T2ZFZGl0TW9kZWwoZWRpdE1vZGVsLCBlZGl0UGF0aFtlZGl0UGF0aC5sZW5ndGggLSAxXSkpKSB7XG4gICAgICAgICAgICAgICAgZHJhd1N0YWlyc1Rvb2wuY2xlYXJUZW1wU2hhcGVzKCk7XG4gICAgICAgICAgICAgICAgaWYgKGFjdGl2YXRlZEN1c3RvbVRvb2wgIT09IGRyYXdTdGFpcnNUb29sKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuUHJvcGVydGllc1Zpc2libGUsIHByb3BlcnRpZXNWaXNpYmxlOiBmYWxzZSB9LCAnKicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0pO1xuZnVuY3Rpb24gb25QbHVnaW5TdGFydFVwKCkge1xuICAgIGNvbnN0IGFsbEVudGl0aWVzID0gc2VsZWN0aW9uLmdldEFsbEVudGl0aWVzKCk7XG4gICAgaWYgKGFsbEVudGl0aWVzLmxlbmd0aCA9PT0gMSAmJiBpc0tHcm91cEluc3RhbmNlKGFsbEVudGl0aWVzWzBdKSkge1xuICAgICAgICBkcmF3U3RhaXJzVG9vbC5zZXRNb2RlbChhbGxFbnRpdGllc1swXSk7XG4gICAgfVxuICAgIGFwcC5hZGRPYnNlcnZlcih7XG4gICAgICAgIG9uUGx1Z2luQ2xvc2VkOiAoKSA9PiB7XG4gICAgICAgIH0sXG4gICAgICAgIG9uTW9kZWxDaGFuZ2VkLFxuICAgIH0pO1xufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50RGlyZWN0aW9uVHlwZSwgQ29tcG9uZW50VHlwZSwgRGVmYXVsdENvbXBvbmVudFBhcmFtLCBEZWZhdWx0U3RhaXJQYXJhbSB9IGZyb20gXCIuL3R5cGVzXCI7XG5leHBvcnQgY29uc3QgZHVtbXlNYXRyaXg0ID0gR2VvbUxpYi5jcmVhdGVJZGVudGl0eU1hdHJpeDQoKTtcbmV4cG9ydCBjb25zdCBkdW1teVZlY3RvcjNkID0gR2VvbUxpYi5jcmVhdGVWZWN0b3IzZCgwLCAwLCAxKTtcbmV4cG9ydCBjb25zdCBkdW1teVBvaW50M2QgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QoMCwgMCwgMCk7XG5leHBvcnQgY29uc3QgRGlyZWN0aW9uWCA9IEdlb21MaWIuY3JlYXRlVmVjdG9yM2QoMSwgMCwgMCk7XG5leHBvcnQgY29uc3QgRGlyZWN0aW9uWSA9IEdlb21MaWIuY3JlYXRlVmVjdG9yM2QoMCwgMSwgMCk7XG5leHBvcnQgY29uc3QgRGlyZWN0aW9uWiA9IEdlb21MaWIuY3JlYXRlVmVjdG9yM2QoMCwgMCwgMSk7XG4vLyBjb25zdCBIZWlnaHRUb2xlcmFuY2U6IG51bWJlciA9IDU7XG5leHBvcnQgY29uc3QgTGVuZ3RoVG9sZXJhbmNlID0gMTA7XG5leHBvcnQgY29uc3QgRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UgPSBNYXRoLlBJIC8gMzY7XG5leHBvcnQgY29uc3QgQW5nbGVUb2xlcmFuY2UgPSBNYXRoLlBJIC8gMTgwO1xuZXhwb3J0IGNvbnN0IFN0ZXBDb3VudExpbWl0ID0gODA7XG4vLyBjb25zdCBEZWZhdWx0Qm9hcmRUaGlja25lc3MgPSA1MDtcbmV4cG9ydCBjb25zdCBUZW1wTGluZUNvbG9ycyA9IHtcbiAgICBTdGFpcjogeyByOiAwLCBnOiAwLCBiOiAyNTUgfSxcbiAgICBNb2xkOiB7IHI6IDEzLCBnOiA3MSwgYjogMTYxIH0sXG4gICAgSGFuZHJhaWw6IHsgcjogMCwgZzogMCwgYjogMCB9LFxuICAgIEluZmVyZW5jZTogeyByOiAwLCBnOiAwLCBiOiAwIH0sXG4gICAgRm9jdXM6IHsgcjogMjU1LCBnOiAwLCBiOiAwIH0sXG59O1xuZXhwb3J0IGNvbnN0IFRlbXBMaW5lUGF0dGVybnMgPSB7XG4gICAgSGFuZHJhaWw6IEtMaW5lUGF0dGVybi5EYXNoLFxuICAgIFN0YWlyQW5kTW9sZDogS0xpbmVQYXR0ZXJuLlNvbGlkLFxuICAgIEluZmVyZW5jZTogS0xpbmVQYXR0ZXJuLkRhc2gsXG59O1xuZXhwb3J0IGZ1bmN0aW9uIGdldE5ld0NvbXBvbmVudFBhcmFtKHR5cGUsIGJhc2VTZWdtZW50LCB1cHdhcmQpIHtcbiAgICBsZXQgc3RhcnRXaWR0aCA9IERlZmF1bHRTdGFpclBhcmFtLnN0YXJ0V2lkdGggKiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSA/IDQgOiAxKTtcbiAgICBsZXQgZW5kV2lkdGggPSBEZWZhdWx0U3RhaXJQYXJhbS5lbmRXaWR0aCAqICh0eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtID8gNCA6IDEpO1xuICAgIGlmIChiYXNlU2VnbWVudCkge1xuICAgICAgICBjb25zdCB7IHBhcmFtOiB7IGVuZFdpZHRoOiBiYXNlU2VnbWVudEVuZFdpZHRoLCB0eXBlOiBiYXNlU2VnbWVudFR5cGUgfSB9ID0gYmFzZVNlZ21lbnQ7XG4gICAgICAgIGlmICh0eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XG4gICAgICAgICAgICBpZiAoYmFzZVNlZ21lbnRUeXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XG4gICAgICAgICAgICAgICAgc3RhcnRXaWR0aCA9IGJhc2VTZWdtZW50RW5kV2lkdGg7XG4gICAgICAgICAgICAgICAgZW5kV2lkdGggPSBiYXNlU2VnbWVudEVuZFdpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RhcnRXaWR0aCA9IDQgKiBiYXNlU2VnbWVudEVuZFdpZHRoO1xuICAgICAgICAgICAgICAgIGVuZFdpZHRoID0gNCAqIGJhc2VTZWdtZW50RW5kV2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoYmFzZVNlZ21lbnRUeXBlICE9PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XG4gICAgICAgICAgICAgICAgc3RhcnRXaWR0aCA9IGJhc2VTZWdtZW50RW5kV2lkdGg7XG4gICAgICAgICAgICAgICAgZW5kV2lkdGggPSBiYXNlU2VnbWVudEVuZFdpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIERlZmF1bHRDb21wb25lbnRQYXJhbSksIHsgaW5kZXg6IGJhc2VTZWdtZW50ID8gYmFzZVNlZ21lbnQucGFyYW0uaW5kZXggKyAxIDogMCwgdHlwZSxcbiAgICAgICAgc3RhcnRXaWR0aCxcbiAgICAgICAgZW5kV2lkdGgsIHVwd2FyZDogdXB3YXJkID09PSB1bmRlZmluZWQgPyBEZWZhdWx0Q29tcG9uZW50UGFyYW0udXB3YXJkIDogdXB3YXJkLCBvZmZzZXRXaWR0aDogMCwgd2l0aE9mZnNldDogZmFsc2UsIHBsYXRmb3JtTGVuZ3RoTG9ja2VkOiBmYWxzZSB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXROZXdTZWdtZW50KHR5cGUsIGJhc2VTZWdtZW50LCB1cHdhcmQpIHtcbiAgICBjb25zdCBwYXJhbSA9IGdldE5ld0NvbXBvbmVudFBhcmFtKHR5cGUsIGJhc2VTZWdtZW50LCB1cHdhcmQpO1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXJ0OiBkdW1teVBvaW50M2QsXG4gICAgICAgIGVuZDogZHVtbXlQb2ludDNkLFxuICAgICAgICBzdGFydExvY2tlZDogZmFsc2UsXG4gICAgICAgIGVuZExvY2tlZDogZmFsc2UsXG4gICAgICAgIHN0YXJ0SGVpZ2h0OiAwLFxuICAgICAgICBlbmRIZWlnaHQ6IDAsXG4gICAgICAgIHN0YWlyU2hhcGU6IHtcbiAgICAgICAgICAgIHN0ZXBDb3VudDogMCxcbiAgICAgICAgICAgIHZlcnRpY2VzOiBbXSxcbiAgICAgICAgICAgIHRlbXBMaW5lczogW10sXG4gICAgICAgIH0sXG4gICAgICAgIG1vbGRTaGFwZToge1xuICAgICAgICAgICAgc3RlcENvdW50OiAwLFxuICAgICAgICAgICAgdmVydGljZXM6IFtdLFxuICAgICAgICAgICAgdGVtcExpbmVzOiBbXSxcbiAgICAgICAgfSxcbiAgICAgICAgY29ybmVyU2hhcGU6IHtcbiAgICAgICAgICAgIHN0ZXBDb3VudDogMCxcbiAgICAgICAgICAgIHZlcnRpY2VzOiBbXSxcbiAgICAgICAgICAgIHRlbXBMaW5lczogW10sXG4gICAgICAgIH0sXG4gICAgICAgIGNvcm5lck1vbGRTaGFwZToge1xuICAgICAgICAgICAgc3RlcENvdW50OiAwLFxuICAgICAgICAgICAgdmVydGljZXM6IFtdLFxuICAgICAgICAgICAgdGVtcExpbmVzOiBbXSxcbiAgICAgICAgfSxcbiAgICAgICAgbmV4dENvbXBvbmVudHM6IEFycmF5LmZyb20oeyBsZW5ndGg6IDYgfSwgXyA9PiBuZXcgU2V0KCkpLFxuICAgICAgICBwYXJhbSxcbiAgICAgICAgY29tcG9uZW50RGlyZWN0aW9uVHlwZTogQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5Gcm9udCxcbiAgICB9O1xufVxuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBDb21wb25lbnRUeXBlLCBDb21wb25lbnRQYXJhbUtleSwgU3RhcnRFbmRLZXksIEJhc2VMaW5lU2VnM2RLZXksIFN0YWlyTW9kZWxLZXksIENvbXBvbmVudFBhcmFtVHlwZSwgTW9kZWxWYWx1ZSwgQ2lyY2xlVGFuZ2VudEtleSwgRGVmYXVsdFN0YWlyUGFyYW0sIEJhc2VDb21wb25lbnRLZXksIEhhbmRyYWlsTW9kZWxLZXksIFJhaWxNb2RlbEtleSwgQ29sdW1uTW9kZWxLZXksIFN0YWlyUGFyYW1LZXksIFN0YWlyTWF0ZXJpYWxLZXksIENvbHVtbk1hdGVyaWFsS2V5LCBSYWlsTWF0ZXJpYWxLZXksIFBsYXRmb3JtTWF0ZXJpYWxLZXkgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgZ2VuZXJhdGVIYW5kcmFpbFNoYXBlLCBnZW5lcmF0ZVNoYXBlLCBpc0NpcmN1bGFyU3RhaXIgfSBmcm9tIFwiLi90ZW1wTWVzaFV0aWxzXCI7XG5pbXBvcnQgeyBidWlsZENvbXBvbmVudEluc3RhbmNlLCBidWlsZEhhbmRyYWlsSW5zdGFuY2UsIGJ1aWxkU2VnbWVudFJlbGF0aW9ucywgY2hhbmdlU3RhaXJVcHdhcmQsIGdlbmVyYXRlTWVzaGVzLCBnZXRTZWdtZW50QnlJbmRleCwgbG9hZERlZmF1bHRNYXRlcmlhbHMgfSBmcm9tIFwiLi9tZXNoVXRpbHNcIjtcbmltcG9ydCB7IHBhcnNlQmFzZUNvbXBvbmVudCwgcGFyc2VMaW5lU2VnM2QsIHBhcnNlQ29tcG9uZW50UGFyYW0sIHBhcnNlU3RhcnRFbmQsIHBhcnNlVmVjdG9yM2QsIHN0cmluZ2lmeVN0YWlyUGFyYW0sIHN0cmluZ2lmeU1hdGVyaWFsLCBwYXJzZVN0YWlyUGFyYW0sIHBhcnNlTWF0ZXJpYWwsIHN0YXJ0T3BlcmF0aW9uLCBhYm9ydE9wZXJhdGlvbiwgY29tbWl0T3BlcmF0aW9uLCBpc1BhcnRPZkVkaXRNb2RlbCB9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQgeyBnZXROZXdDb21wb25lbnRQYXJhbSwgZ2V0TmV3U2VnbWVudCwgVGVtcExpbmVDb2xvcnMsIFRlbXBMaW5lUGF0dGVybnMgfSBmcm9tIFwiLi9jb25zdHNcIjtcbmltcG9ydCB7IGRlQWN0aXZhdGVEcmF3U3RhaXJzVG9vbCB9IGZyb20gXCIuLi8uLi8uLi9tYWluL21haW5cIjtcbmltcG9ydCB7IE1lc3NhZ2VUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL21haW4vdHlwZXNcIjtcbmNvbnN0IGRlc2lnbiA9IGFwcC5nZXRBY3RpdmVEZXNpZ24oKTtcbmNvbnN0IHNlbGVjdGlvbiA9IGFwcC5nZXRTZWxlY3Rpb24oKTtcbmNvbnN0IHBsdWdpblVJID0gYXBwLmdldFBsdWdpblVJKCk7XG5jb25zdCBhcHBWaWV3ID0gYXBwLmdldEFjdGl2ZVZpZXcoKTtcbmNvbnN0IHRvb2xIZWxwZXIgPSBhcHAuZ2V0VG9vbEhlbHBlcigpO1xuY29uc3QgRGVmYXVsdEZvY3VzZWRDb21wb25lbnRJbmRleCA9IC0xO1xuZXhwb3J0IGNsYXNzIERyYXdTdGFpcnNUb29sIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy8gcHJpdmF0ZSBjb21wb25lbnRQYXJhbTogQ29tcG9uZW50UGFyYW0gPSB7IC4uLkRlZmF1bHRDb21wb25lbnRQYXJhbSB9O1xuICAgICAgICB0aGlzLmRyYXdpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggPSBEZWZhdWx0Rm9jdXNlZENvbXBvbmVudEluZGV4O1xuICAgICAgICB0aGlzLnNlZ21lbnRzID0gW107XG4gICAgICAgIHRoaXMuc3RhaXJQYXJhbSA9IERlZmF1bHRTdGFpclBhcmFtO1xuICAgICAgICB0aGlzLm9uTWF0ZXJpYWxSZXBsYWNlSXRlbUNsaWNrID0gKGNoYW5nZVBhcmFtLCBpbmRleCwgaXNEZWxldGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIChtYXRlcmlhbElkID0gJycsIGJnaWQgPSAnJykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxvYWRNYXRlcmlhbFJlcyA9IHlpZWxkIGRlc2lnbi5sb2FkTWF0ZXJpYWwobWF0ZXJpYWxJZCk7XG4gICAgICAgICAgICAgICAgaWYgKCFsb2FkTWF0ZXJpYWxSZXMuaXNTdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgaW5zdGFuY2VQYXRoID0gdGhhdC5lZGl0TW9kZWwgPyBkZXNpZ24uZ2V0RWRpdFBhdGhzVG9Hcm91cEluc3RhbmNlKHRoYXQuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZSkgOiBbXTtcbiAgICAgICAgICAgICAgICBpZiAoY2hhbmdlUGFyYW0gPT09IENvbXBvbmVudFBhcmFtVHlwZS5Db21wb25lbnRNYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgodGhhdC5zZWdtZW50cywgaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VnbWVudCAmJiBpbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5kcmF3aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5wYXJhbS5tYXRlcmlhbCA9IHsgbWF0ZXJpYWxJZCwgYmdpZCB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuUGFyYW1DaGFuZ2VkQnlEcmF3LCBjb21wb25lbnRQYXJhbTogT2JqZWN0LmFzc2lnbih7fSwgc2VnbWVudC5wYXJhbSkgfSwgJyonKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoYXQuZWRpdE1vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlSW5zdGFuY2UgPSB0aGF0LmVkaXRNb2RlbC5zdGFpcnMuZ2V0KGluZGV4KSB8fCB0aGF0LmVkaXRNb2RlbC5wbGF0Zm9ybXMuZ2V0KGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhlSW5zdGFuY2UgJiYgaW5zdGFuY2VQYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcGVyYXRpb25TdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKHlpZWxkIGRlc2lnbi5hY3RpdmF0ZUVkaXRQYXRoKFsuLi5pbnN0YW5jZVBhdGhbMF0sIHRoYXQuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZV0pKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0RlbGV0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZGVzaWduLmNsZWFyTWF0ZXJpYWwoW3RoZUluc3RhbmNlLmluc3RhbmNlXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBkZXNpZ24uYXNzaWduTWF0ZXJpYWxGb3JFbnRpdGllcyhbdGhlSW5zdGFuY2UuaW5zdGFuY2VdLCBtYXRlcmlhbElkLCBiZ2lkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAoeWllbGQgZGVzaWduLmFjdGl2YXRlRWRpdFBhdGgoaW5zdGFuY2VQYXRoWzBdKSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWl0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50LnBhcmFtLm1hdGVyaWFsID0geyBtYXRlcmlhbElkLCBiZ2lkIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlBhcmFtQ2hhbmdlZEJ5RHJhdywgY29tcG9uZW50UGFyYW06IE9iamVjdC5hc3NpZ24oe30sIHNlZ21lbnQucGFyYW0pIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYm9ydE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoYW5nZVBhcmFtID09PSBDb21wb25lbnRQYXJhbVR5cGUuU3RhaXJNYXRlcmlhbCB8fCBjaGFuZ2VQYXJhbSA9PT0gQ29tcG9uZW50UGFyYW1UeXBlLlBsYXRmb3JtTWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LmVkaXRNb2RlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZVBhcmFtID09PSBDb21wb25lbnRQYXJhbVR5cGUuU3RhaXJNYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc3RhaXJQYXJhbS5zdGFpck1hdGVyaWFsID0geyBtYXRlcmlhbElkLCBiZ2lkIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnN0YWlyUGFyYW0ucGxhdGZvcm1NYXRlcmlhbCA9IHsgbWF0ZXJpYWxJZCwgYmdpZCB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5TdGFpclBhcmFtQ2hhbmdlZEJ5RHJhdywgc3RhaXJQYXJhbTogdGhhdC5zdGFpclBhcmFtIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaW5zdGFuY2VQYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wZXJhdGlvblN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKHlpZWxkIGRlc2lnbi5hY3RpdmF0ZUVkaXRQYXRoKFsuLi5pbnN0YW5jZVBhdGhbMF0sIHRoYXQuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZV0pKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21wb25lbnRzID0gY2hhbmdlUGFyYW0gPT09IENvbXBvbmVudFBhcmFtVHlwZS5TdGFpck1hdGVyaWFsID8gdGhhdC5lZGl0TW9kZWwuc3RhaXJzIDogdGhhdC5lZGl0TW9kZWwucGxhdGZvcm1zO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29tcG9uZW50SW5zdGFuY2VzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IFtpbmQsIGluc3RhbmNlRGF0YV0gb2YgY29tcG9uZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoZVNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleCh0aGF0LnNlZ21lbnRzLCBpbmQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGVTZWdtZW50ICYmICF0aGVTZWdtZW50LnBhcmFtLm1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudEluc3RhbmNlcy5wdXNoKGluc3RhbmNlRGF0YS5pbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRGVsZXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZGVzaWduLmNsZWFyTWF0ZXJpYWwoY29tcG9uZW50SW5zdGFuY2VzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGRlc2lnbi5hc3NpZ25NYXRlcmlhbEZvckVudGl0aWVzKGNvbXBvbmVudEluc3RhbmNlcywgbWF0ZXJpYWxJZCwgYmdpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAoeWllbGQgZGVzaWduLmFjdGl2YXRlRWRpdFBhdGgoaW5zdGFuY2VQYXRoWzBdKSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21taXRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlUGFyYW0gPT09IENvbXBvbmVudFBhcmFtVHlwZS5TdGFpck1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc3RhaXJQYXJhbS5zdGFpck1hdGVyaWFsID0geyBtYXRlcmlhbElkLCBiZ2lkIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnN0YWlyUGFyYW0ucGxhdGZvcm1NYXRlcmlhbCA9IHsgbWF0ZXJpYWxJZCwgYmdpZCB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlN0YWlyUGFyYW1DaGFuZ2VkQnlEcmF3LCBzdGFpclBhcmFtOiB0aGF0LnN0YWlyUGFyYW0gfSwgJyonKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFib3J0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hhbmdlUGFyYW0gPT09IENvbXBvbmVudFBhcmFtVHlwZS5IYW5kcmFpbFJhaWxNYXRlcmlhbCB8fCBjaGFuZ2VQYXJhbSA9PT0gQ29tcG9uZW50UGFyYW1UeXBlLkhhbmRyYWlsQ29sdW1uTWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LmVkaXRNb2RlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZVBhcmFtID09PSBDb21wb25lbnRQYXJhbVR5cGUuSGFuZHJhaWxSYWlsTWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnN0YWlyUGFyYW0uaGFuZHJhaWwucmFpbC5tYXRlcmlhbCA9IHsgbWF0ZXJpYWxJZCwgYmdpZCB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zdGFpclBhcmFtLmhhbmRyYWlsLmNvbHVtbi5tYXRlcmlhbCA9IHsgbWF0ZXJpYWxJZCwgYmdpZCB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5TdGFpclBhcmFtQ2hhbmdlZEJ5RHJhdywgc3RhaXJQYXJhbTogdGhhdC5zdGFpclBhcmFtIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaW5zdGFuY2VQYXRoICYmIHRoYXQuZWRpdE1vZGVsLmhhbmRyYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wZXJhdGlvblN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKHlpZWxkIGRlc2lnbi5hY3RpdmF0ZUVkaXRQYXRoKFsuLi5pbnN0YW5jZVBhdGhbMF0sIHRoYXQuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZSwgdGhhdC5lZGl0TW9kZWwuaGFuZHJhaWwuaGFuZHJhaWxJbnN0YW5jZS5pbnN0YW5jZV0pKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21wb25lbnRzID0gY2hhbmdlUGFyYW0gPT09IENvbXBvbmVudFBhcmFtVHlwZS5IYW5kcmFpbFJhaWxNYXRlcmlhbCA/IHRoYXQuZWRpdE1vZGVsLmhhbmRyYWlsLnJhaWxJbnN0YW5jZXMgOiB0aGF0LmVkaXRNb2RlbC5oYW5kcmFpbC5jb2x1bW5JbnN0YW5jZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNEZWxldGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBkZXNpZ24uY2xlYXJNYXRlcmlhbChbLi4uY29tcG9uZW50cy52YWx1ZXMoKV0ubWFwKGMgPT4gYy5pbnN0YW5jZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZGVzaWduLmFzc2lnbk1hdGVyaWFsRm9yRW50aXRpZXMoWy4uLmNvbXBvbmVudHMudmFsdWVzKCldLm1hcChjID0+IGMuaW5zdGFuY2UpLCBtYXRlcmlhbElkLCBiZ2lkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICh5aWVsZCBkZXNpZ24uYWN0aXZhdGVFZGl0UGF0aChpbnN0YW5jZVBhdGhbMF0pKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1pdE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VQYXJhbSA9PT0gQ29tcG9uZW50UGFyYW1UeXBlLkhhbmRyYWlsUmFpbE1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc3RhaXJQYXJhbS5oYW5kcmFpbC5yYWlsLm1hdGVyaWFsID0geyBtYXRlcmlhbElkLCBiZ2lkIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnN0YWlyUGFyYW0uaGFuZHJhaWwuY29sdW1uLm1hdGVyaWFsID0geyBtYXRlcmlhbElkLCBiZ2lkIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuU3RhaXJQYXJhbUNoYW5nZWRCeURyYXcsIHN0YWlyUGFyYW06IHRoYXQuc3RhaXJQYXJhbSB9LCAnKicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWJvcnRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBvblRvb2xBY3RpdmUoKSB7XG4gICAgICAgIGxvYWREZWZhdWx0TWF0ZXJpYWxzKCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCh3aW5kb3cgYXMgYW55KS5vcmlnaW4pO1xuICAgICAgICB0b29sSGVscGVyLnNldEV4Y2x1ZGVJbmZlcmVuY2VUeXBlcyhbXG4gICAgICAgICAgICBLRW50aXR5VHlwZS5GYWNlLCBLRW50aXR5VHlwZS5FZGdlLCBLRW50aXR5VHlwZS5BdXhpbGlhcnlCb3VuZGVkQ3VydmUsIEtFbnRpdHlUeXBlLkF1eGlsaWFyeUxpbmUsIEtFbnRpdHlUeXBlLkF1eGlsaWFyeVZlcnRleCxcbiAgICAgICAgICAgIEtFbnRpdHlUeXBlLkdyb3VwSW5zdGFuY2UsIEtFbnRpdHlUeXBlLlZlcnRleCwgS0FyY2hGYWNlVHlwZS5Ob25QbGFuYXIsIEtBcmNoRmFjZVR5cGUuUGxhbmFyLFxuICAgICAgICBdKTtcbiAgICAgICAgY29uc3QgZmlyc3RTZWdtZW50ID0gZ2V0TmV3U2VnbWVudChDb21wb25lbnRUeXBlLlN0cmFpZ2h0U3RhaXIsIHVuZGVmaW5lZCwgdGhpcy5zdGFpclBhcmFtLnVwd2FyZCk7XG4gICAgICAgIGZpcnN0U2VnbWVudC5zdGFydExvY2tlZCA9IGZhbHNlO1xuICAgICAgICAvLyB0aGlzLnN0YWlyUGFyYW0gPSBEZWZhdWx0U3RhaXJQYXJhbTtcbiAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5EcmF3U3RhaXJNb2RlbFNldHRsZWQsIGNvbXBvbmVudFBhcmFtczogW2ZpcnN0U2VnbWVudC5wYXJhbV0sIHN0YWlyUGFyYW06IHRoaXMuc3RhaXJQYXJhbSwgbmV3U3RhaXI6IHRydWUsIGlzRHJhd2luZzogdHJ1ZSB9LCAnKicpO1xuICAgICAgICB0aGlzLnNlZ21lbnRzID0gW2ZpcnN0U2VnbWVudF07XG4gICAgICAgIHRoaXMuZHJhd2luZyA9IHRydWU7XG4gICAgICAgIHRoaXMuY2xlYXJUZW1wU2hhcGVzKCk7XG4gICAgICAgIHRoaXMuZWRpdE1vZGVsID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCA9IDA7XG4gICAgfVxuICAgIG9uVG9vbERlYWN0aXZlKCkge1xuICAgICAgICB0b29sSGVscGVyLnNldEV4Y2x1ZGVJbmZlcmVuY2VUeXBlcyhbXSk7XG4gICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgaWYgKHRoaXMuZWRpdE1vZGVsKSB7XG4gICAgICAgICAgICBzZWxlY3Rpb24uYWRkKFt0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2VdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuTGVhdmVEcmF3U3RhaXJzVG9vbCB9LCAnKicpO1xuICAgICAgICB9XG4gICAgICAgIGRlQWN0aXZhdGVEcmF3U3RhaXJzVG9vbCgpO1xuICAgIH1cbiAgICBvbk1vdXNlTW92ZShldmVudCwgaW5mZXJlbmNlUmVzdWx0KSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdvbk1vdXNlTW92ZScpO1xuICAgICAgICBpZiAoaW5mZXJlbmNlUmVzdWx0KSB7XG4gICAgICAgICAgICAvLyBjb25zdCB7IHN0YXJ0V2lkdGgsIGVuZFdpZHRoLCBwbGF0Zm9ybVRoaWNrbmVzcyB9ID0gdGhpcy5jb21wb25lbnRQYXJhbTtcbiAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uID0gaW5mZXJlbmNlUmVzdWx0LnBvc2l0aW9uO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VnbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdFNlZ21lbnQgPSB0aGlzLnNlZ21lbnRzW3RoaXMuc2VnbWVudHMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2xhc3RTZWdtZW50LnN0YXJ0TG9ja2VkJywgbGFzdFNlZ21lbnQuc3RhcnRMb2NrZWQpO1xuICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LnBhcmFtLm1vZGVsRWRpdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChsYXN0U2VnbWVudC5zdGFydExvY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5lbmQgPSBwb3NpdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3VGVtcENvbXBvbmVudChsYXN0U2VnbWVudCwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VnbWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJldlNlZ21lbnQgPSB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCA9PT0gbGFzdFNlZ21lbnQucGFyYW0uaW5kZXggPyB0aGlzLnNlZ21lbnRzW3RoaXMuc2VnbWVudHMubGVuZ3RoIC0gMl0gOiBnZXRTZWdtZW50QnlJbmRleCh0aGlzLnNlZ21lbnRzLCB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBtdXN0IGJlIHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgocHJldlNlZ21lbnQgPT09IG51bGwgfHwgcHJldlNlZ21lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHByZXZTZWdtZW50LnBhcmFtLnR5cGUpID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBtb2xkU2hhcGU6IHsgdmVydGljZXMsIHRlbXBMaW5lcyB9IH0gPSBwcmV2U2VnbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKChfYSA9IGxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5saW5lM2RJbmRleCkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2U2VnbWVudC5uZXh0Q29tcG9uZW50cy5mb3JFYWNoKGluZHMgPT4gaW5kcy5kZWxldGUobGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNsb3Nlc3RQb2ludDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWluRGlzdGFuY2UgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5mb3JFYWNoKChsaW5lLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsaW5lU2VnM2QgPSBHZW9tTGliLmNyZWF0ZUxpbmVTZWdtZW50M2QodmVydGljZXNbbGluZVswXV0sIHZlcnRpY2VzW2xpbmVbMV1dKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlUG9pbnQgPSBsaW5lU2VnM2QuZ2V0Q2xvc2VzdFBvaW50KHBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyRGlzdGFuY2UgPSB0aGVQb2ludC5kaXN0YW5jZVRvKHBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjbG9zZXN0UG9pbnQgfHwgY3VyRGlzdGFuY2UgPCBtaW5EaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluRGlzdGFuY2UgPSBjdXJEaXN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RQb2ludCA9IHRoZVBvaW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuc3RhcnQgPSBjbG9zZXN0UG9pbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsYXN0U2VnbWVudC5iYXNlTGluZVNlZzNkID0geyBzdGFydDogdmVydGljZXNbbGluZVswXV0sIGVuZDogdmVydGljZXNbbGluZVsxXV0gfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQgPSB7IGNvbXBvbmVudEluZGV4OiBwcmV2U2VnbWVudC5wYXJhbS5pbmRleCwgbGluZTNkSW5kZXg6IGluZGV4LCBsaW5lM2Q6IHsgc3RhcnQ6IHZlcnRpY2VzW2xpbmVbMF1dLCBlbmQ6IHZlcnRpY2VzW2xpbmVbMV1dIH0gfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHByZXZTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgodGhpcy5zZWdtZW50cywgbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCgoX2IgPSBsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IubGluZTNkSW5kZXgpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldlNlZ21lbnQubmV4dENvbXBvbmVudHNbbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleF0uYWRkKGxhc3RTZWdtZW50LnBhcmFtLmluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3UGlja1N0YXJ0VGVtcFNoYXBlcyhwb3NpdGlvbiwgbGFzdFNlZ21lbnQuc3RhcnQsIGxhc3RTZWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LnN0YXJ0ID0gcG9zaXRpb247XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGxhc3RTZWdtZW50LnBhcmFtLnR5cGUgPT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSAmJiAhbGFzdFNlZ21lbnQucGFyYW0ucGxhdGZvcm1MZW5ndGhMb2NrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5QYXJhbUNoYW5nZWRCeURyYXcsIGNvbXBvbmVudFBhcmFtOiBPYmplY3QuYXNzaWduKHt9LCBsYXN0U2VnbWVudC5wYXJhbSkgfSwgJyonKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25MQnV0dG9uVXAoZXZlbnQsIGluZmVyZW5jZVJlc3VsdCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdvbkxCdXR0b25VcCcpO1xuICAgICAgICBpZiAoaW5mZXJlbmNlUmVzdWx0KSB7XG4gICAgICAgICAgICAvLyBjb25zdCBwb3NpdGlvbiA9IGluZmVyZW5jZVJlc3VsdC5wb3NpdGlvbjtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RTZWdtZW50ID0gdGhpcy5zZWdtZW50c1t0aGlzLnNlZ21lbnRzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgIGlmIChsYXN0U2VnbWVudC5zdGFydExvY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncHVzaCBzZWdtZW50Jyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgc3RhcnQsIGVuZCwgcGFyYW06IHsgdHlwZSB9LCBjaXJjbGVUYW5nZW50IH0gPSBsYXN0U2VnbWVudDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpciAmJiAhY2lyY2xlVGFuZ2VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuY2lyY2xlVGFuZ2VudCA9IGVuZC5zdWJ0cmFjdGVkKHN0YXJ0KS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzQ29tcG9uZW50KGxhc3RTZWdtZW50LnBhcmFtLmluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LmVuZExvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0UGFyYW0gPSBsYXN0U2VnbWVudC5wYXJhbTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRUeXBlID0gbGFzdFBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gPyBDb21wb25lbnRUeXBlLlN0cmFpZ2h0U3RhaXIgOiBDb21wb25lbnRUeXBlLlBsYXRmb3JtO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dFNlZ21lbnQgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGdldE5ld1NlZ21lbnQobmV4dFR5cGUsIGxhc3RTZWdtZW50LCB0aGlzLnN0YWlyUGFyYW0udXB3YXJkKSksIHsgc3RhcnQ6IGxhc3RTZWdtZW50LmVuZCwgZW5kOiBsYXN0U2VnbWVudC5lbmQsIHN0YXJ0TG9ja2VkOiBsYXN0UGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSA/IGZhbHNlIDogdHJ1ZSwgc3RhcnRIZWlnaHQ6IGxhc3RTZWdtZW50LmVuZEhlaWdodCwgZW5kSGVpZ2h0OiBsYXN0U2VnbWVudC5lbmRIZWlnaHQgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IG1vbGRTaGFwZTogeyB2ZXJ0aWNlcywgdGVtcExpbmVzIH0gfSA9IGxhc3RTZWdtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGFzdFNlZ21lbnQuYmFzZUxpbmVTZWczZCA9IHsgc3RhcnQ6IHZlcnRpY2VzWzBdLCBlbmQ6IHZlcnRpY2VzWzFdIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudCA9IHsgbGluZTNkOiB7IHN0YXJ0OiB2ZXJ0aWNlc1sxXSwgZW5kOiB2ZXJ0aWNlc1swXSB9IH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiYXNlU2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHRoaXMuc2VnbWVudHMsIGxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiYXNlU2VnbWVudCAmJiAoKF9hID0gbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxpbmUzZEluZGV4KSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhc2VTZWdtZW50Lm5leHRDb21wb25lbnRzW2xhc3RTZWdtZW50LmJhc2VDb21wb25lbnQubGluZTNkSW5kZXhdLmFkZChsYXN0UGFyYW0uaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5leHRTZWdtZW50LmJhc2VMaW5lU2VnM2QgPSB7IHN0YXJ0OiB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXSwgZW5kOiB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRTZWdtZW50LnN0YXJ0TG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQubmV4dENvbXBvbmVudHNbMF0uYWRkKG5leHRTZWdtZW50LnBhcmFtLmluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTZWdtZW50LmJhc2VDb21wb25lbnQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50SW5kZXg6IGxhc3RQYXJhbS5pbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lM2RJbmRleDogbGFzdFBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gPyB0ZW1wTGluZXMubGVuZ3RoIC0gMSA6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZTNkOiB7IHN0YXJ0OiB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXSwgZW5kOiB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXSB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFBhcmFtLm1vZGVsRWRpdGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlBhcmFtQ2hhbmdlZEJ5RHJhdywgY29tcG9uZW50UGFyYW06IGxhc3RQYXJhbSB9LCAnKicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWdtZW50cy5wdXNoKG5leHRTZWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCAhPT0gbGFzdFBhcmFtLmluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9jdXNlZFNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleCh0aGlzLnNlZ21lbnRzLCB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvY3VzZWRTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBDb21wb25lbnQoZm9jdXNlZFNlZ21lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4ID0gbmV4dFNlZ21lbnQucGFyYW0uaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLkNvbXBvbmVudEFkZGVkLCBjb21wb25lbnRQYXJhbTogT2JqZWN0LmFzc2lnbih7fSwgbmV4dFNlZ21lbnQucGFyYW0pIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LnN0YXJ0TG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhclBpY2tTdGFydFRlbXBTaGFwZXMobGFzdFNlZ21lbnQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdUZW1wQ29tcG9uZW50KGxhc3RTZWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c0NvbXBvbmVudChsYXN0U2VnbWVudC5wYXJhbS5pbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGRyYXdQaWNrU3RhcnRUZW1wU2hhcGVzKHBvc2l0aW9uLCBjbG9zZXN0UG9pbnQsIHRoZVNlZ21lbnQpIHtcbiAgICAgICAgaWYgKHRoZVNlZ21lbnQucGlja1N0YXJ0VGVtcFNoYXBlSWQpIHtcbiAgICAgICAgICAgIGFwcFZpZXcuY2xlYXJUZW1wb3JhcnlTaGFwZXNCeUlkcyhbdGhlU2VnbWVudC5waWNrU3RhcnRUZW1wU2hhcGVJZF0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjbG9zZXN0UG9pbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHBpY2tTdGFydFRlbXBTaGFwZUlkID0gYXBwVmlldy5kcmF3TGluZXMoW3Bvc2l0aW9uLCBjbG9zZXN0UG9pbnRdLCB7IGNvbG9yOiBUZW1wTGluZUNvbG9ycy5JbmZlcmVuY2UsIGRlcHRoVGVzdDogZmFsc2UsIHBhdHRlcm46IFRlbXBMaW5lUGF0dGVybnMuSW5mZXJlbmNlLCBnYXBTaXplOiA1MCwgZGFzaFNpemU6IDUwIH0pO1xuICAgICAgICAgICAgaWYgKHBpY2tTdGFydFRlbXBTaGFwZUlkID09PSBudWxsIHx8IHBpY2tTdGFydFRlbXBTaGFwZUlkID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwaWNrU3RhcnRUZW1wU2hhcGVJZC5pZCkge1xuICAgICAgICAgICAgICAgIHRoZVNlZ21lbnQucGlja1N0YXJ0VGVtcFNoYXBlSWQgPSBwaWNrU3RhcnRUZW1wU2hhcGVJZC5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjbGVhclBpY2tTdGFydFRlbXBTaGFwZXModGhlU2VnbWVudCkge1xuICAgICAgICBpZiAodGhlU2VnbWVudC5waWNrU3RhcnRUZW1wU2hhcGVJZCkge1xuICAgICAgICAgICAgYXBwVmlldy5jbGVhclRlbXBvcmFyeVNoYXBlc0J5SWRzKFt0aGVTZWdtZW50LnBpY2tTdGFydFRlbXBTaGFwZUlkXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZHJhd1RlbXBDb21wb25lbnQodGhlU2VnbWVudCwgZm9jdXNlZCA9IGZhbHNlLCBkcmF3SGFuZHJhaWwgPSBmYWxzZSkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBpZiAodGhlU2VnbWVudC5zdGFydExvY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZVNlZ21lbnRTaGFwZSh0aGVTZWdtZW50LCB0aGlzLmRyYXdpbmcpO1xuICAgICAgICAgICAgY29uc3QgeyBzdGFpclNoYXBlOiB7IHZlcnRpY2VzOiBzdGFpclZlcnRpY2VzLCB0ZW1wTGluZXM6IHN0YWlyVGVtcExpbmVzIH0sIG1vbGRTaGFwZTogeyB2ZXJ0aWNlczogbW9sZFZlcnRpY2VzLCB0ZW1wTGluZXM6IG1vbGRUZW1wTGluZXMgfSwgY29ybmVyU2hhcGU6IHsgdmVydGljZXM6IGNvcm5lclZlcnRpY2VzLCB0ZW1wTGluZXM6IGNvcm5lclRlbXBMaW5lcyB9LCBjb3JuZXJNb2xkU2hhcGU6IHsgdmVydGljZXM6IGNvcm5lck1vbGRWZXJ0aWNlcywgdGVtcExpbmVzOiBjb3JuZXJNb2xkVGVtcExpbmVzIH0sIH0gPSB0aGVTZWdtZW50O1xuICAgICAgICAgICAgY29uc3QgdGVtcExpbmVQb2ludHMgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IG1vbGRUZW1wTGluZVBvaW50cyA9IFtdO1xuICAgICAgICAgICAgaWYgKHRoaXMuZHJhd2luZykge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgc3RhaXJUZW1wTGluZSBvZiBzdGFpclRlbXBMaW5lcykge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZVBvaW50cy5wdXNoKFtzdGFpclZlcnRpY2VzW3N0YWlyVGVtcExpbmVbMF1dLCBzdGFpclZlcnRpY2VzW3N0YWlyVGVtcExpbmVbMV1dXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgY29ybmVyVGVtcExpbmUgb2YgY29ybmVyVGVtcExpbmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lUG9pbnRzLnB1c2goW2Nvcm5lclZlcnRpY2VzW2Nvcm5lclRlbXBMaW5lWzBdXSwgY29ybmVyVmVydGljZXNbY29ybmVyVGVtcExpbmVbMV1dXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCBtb2xkVGVtcExpbmUgb2YgbW9sZFRlbXBMaW5lcykge1xuICAgICAgICAgICAgICAgIG1vbGRUZW1wTGluZVBvaW50cy5wdXNoKFttb2xkVmVydGljZXNbbW9sZFRlbXBMaW5lWzBdXSwgbW9sZFZlcnRpY2VzW21vbGRUZW1wTGluZVsxXV1dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgY29ybmVyTW9sZFRlbXBMaW5lIG9mIGNvcm5lck1vbGRUZW1wTGluZXMpIHtcbiAgICAgICAgICAgICAgICBtb2xkVGVtcExpbmVQb2ludHMucHVzaChbY29ybmVyTW9sZFZlcnRpY2VzW2Nvcm5lck1vbGRUZW1wTGluZVswXV0sIGNvcm5lck1vbGRWZXJ0aWNlc1tjb3JuZXJNb2xkVGVtcExpbmVbMV1dXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKF9hID0gdGhlU2VnbWVudC50ZW1wU2hhcGVJZCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGFwcFZpZXcuY2xlYXJUZW1wb3JhcnlTaGFwZXNCeUlkcyh0aGVTZWdtZW50LnRlbXBTaGFwZUlkKTtcbiAgICAgICAgICAgICAgICB0aGVTZWdtZW50LnRlbXBTaGFwZUlkID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGVtcExpbmVQb2ludHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhaXJDb2xvciA9IGZvY3VzZWQgPyBUZW1wTGluZUNvbG9ycy5Gb2N1cyA6IFRlbXBMaW5lQ29sb3JzLlN0YWlyO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRlbXBTaGFwZUlkID0gYXBwVmlldy5kcmF3UG9seWxpbmVzKHRlbXBMaW5lUG9pbnRzLCB7IGNvbG9yOiBzdGFpckNvbG9yLCBkZXB0aFRlc3Q6IGZhbHNlLCBwYXR0ZXJuOiBUZW1wTGluZVBhdHRlcm5zLlN0YWlyQW5kTW9sZCB9KTtcbiAgICAgICAgICAgICAgICBpZiAodGVtcFNoYXBlSWQgPT09IG51bGwgfHwgdGVtcFNoYXBlSWQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHRlbXBTaGFwZUlkLmlkcykge1xuICAgICAgICAgICAgICAgICAgICB0aGVTZWdtZW50LnRlbXBTaGFwZUlkID0gWy4uLnRlbXBTaGFwZUlkLmlkc107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1vbGRUZW1wTGluZVBvaW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtb2xkQ29sb3IgPSBmb2N1c2VkID8gVGVtcExpbmVDb2xvcnMuRm9jdXMgOiBUZW1wTGluZUNvbG9ycy5Nb2xkO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vbGRUZW1wU2hhcGVJZCA9IGFwcFZpZXcuZHJhd1BvbHlsaW5lcyhtb2xkVGVtcExpbmVQb2ludHMsIHsgY29sb3I6IG1vbGRDb2xvciwgZGVwdGhUZXN0OiB0aGlzLmRyYXdpbmcsIHBhdHRlcm46IFRlbXBMaW5lUGF0dGVybnMuU3RhaXJBbmRNb2xkIH0pO1xuICAgICAgICAgICAgICAgIGlmIChtb2xkVGVtcFNoYXBlSWQgPT09IG51bGwgfHwgbW9sZFRlbXBTaGFwZUlkID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtb2xkVGVtcFNoYXBlSWQuaWRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoX2IgPSB0aGVTZWdtZW50LnRlbXBTaGFwZUlkKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGVTZWdtZW50LnRlbXBTaGFwZUlkLnB1c2goLi4ubW9sZFRlbXBTaGFwZUlkLmlkcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGVTZWdtZW50LnRlbXBTaGFwZUlkID0gWy4uLm1vbGRUZW1wU2hhcGVJZC5pZHNdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRyYXdIYW5kcmFpbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0hhbmRyYWlscygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGRyYXdIYW5kcmFpbHMoc3RhaXJQYXJhbSA9IHRoaXMuc3RhaXJQYXJhbSkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBjb25zdCBwcmV2SGFuZHJhaWxUZW1wU2hhcGVJZHMgPSAoX2EgPSB0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRlbXBTaGFwZUlkO1xuICAgICAgICB0aGlzLmdlbmVyYXRlSGFuZHJhaWxTaGFwZShzdGFpclBhcmFtKTtcbiAgICAgICAgaWYgKHByZXZIYW5kcmFpbFRlbXBTaGFwZUlkcyA9PT0gbnVsbCB8fCBwcmV2SGFuZHJhaWxUZW1wU2hhcGVJZHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHByZXZIYW5kcmFpbFRlbXBTaGFwZUlkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGFwcFZpZXcuY2xlYXJUZW1wb3JhcnlTaGFwZXNCeUlkcyhwcmV2SGFuZHJhaWxUZW1wU2hhcGVJZHMpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGhhbmRyYWlscyA9IChfYiA9IHRoaXMuaGFuZHJhaWxDb2xsZWN0aW9uKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuaGFuZHJhaWxzO1xuICAgICAgICBjb25zdCB0ZW1wTGluZVBvaW50cyA9IFtdO1xuICAgICAgICBpZiAodGhpcy5oYW5kcmFpbENvbGxlY3Rpb24gJiYgKGhhbmRyYWlscyA9PT0gbnVsbCB8fCBoYW5kcmFpbHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGhhbmRyYWlscy5sZW5ndGgpKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHsgcmFpbCwgY29sdW1ucyB9IG9mIGhhbmRyYWlscykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmFpbC5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmFpbFBvaW50ID0gcmFpbFtpXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmFpbE5leHRQb2ludCA9IHJhaWxbaSArIDFdO1xuICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZVBvaW50cy5wdXNoKFtyYWlsUG9pbnQsIHJhaWxOZXh0UG9pbnRdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGVtcExpbmVQb2ludHMucHVzaCguLi5jb2x1bW5zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGhhbmRyYWlsVGVtcFNoYXBlSWRzID0gYXBwVmlldy5kcmF3UG9seWxpbmVzKHRlbXBMaW5lUG9pbnRzLCB7IGNvbG9yOiBUZW1wTGluZUNvbG9ycy5IYW5kcmFpbCwgZGVwdGhUZXN0OiBmYWxzZSwgcGF0dGVybjogVGVtcExpbmVQYXR0ZXJucy5IYW5kcmFpbCB9KTtcbiAgICAgICAgICAgIGlmIChoYW5kcmFpbFRlbXBTaGFwZUlkcyA9PT0gbnVsbCB8fCBoYW5kcmFpbFRlbXBTaGFwZUlkcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogaGFuZHJhaWxUZW1wU2hhcGVJZHMuaWRzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kcmFpbENvbGxlY3Rpb24udGVtcFNoYXBlSWQgPSBoYW5kcmFpbFRlbXBTaGFwZUlkcy5pZHM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2xlYXJUZW1wU2hhcGVzKHRoZVNlZ21lbnQpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAodGhlU2VnbWVudCkge1xuICAgICAgICAgICAgaWYgKChfYSA9IHRoZVNlZ21lbnQudGVtcFNoYXBlSWQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBhcHBWaWV3LmNsZWFyVGVtcG9yYXJ5U2hhcGVzQnlJZHModGhlU2VnbWVudC50ZW1wU2hhcGVJZCk7XG4gICAgICAgICAgICAgICAgdGhlU2VnbWVudC50ZW1wU2hhcGVJZCA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYXBwVmlldy5jbGVhclRlbXBvcmFyeVNoYXBlcygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZvY3VzQ29tcG9uZW50KGNvbXBvbmVudEluZGV4KSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICBpZiAoY29tcG9uZW50SW5kZXggPT09IHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2VnbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBsYXN0U2VnbWVudCA9IHRoaXMuc2VnbWVudHNbdGhpcy5zZWdtZW50cy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RTZWdtZW50SW5kZXggPSBsYXN0U2VnbWVudC5wYXJhbS5pbmRleDtcbiAgICAgICAgICAgIC8vIGlmIChjb21wb25lbnRJbmRleCAhPT0gdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXgpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0ZvY3VzZWRTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgodGhpcy5zZWdtZW50cywgY29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgY29uc3Qgb2xkRm9jdXNlZFNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleCh0aGlzLnNlZ21lbnRzLCB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICBpZiAobmV3Rm9jdXNlZFNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kcmF3aW5nICYmICFsYXN0U2VnbWVudC5lbmRMb2NrZWQgJiYgY29tcG9uZW50SW5kZXggIT09IGxhc3RTZWdtZW50SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBwYXJhbTogeyB0eXBlOiBuZXdGb2N1c2VkVHlwZSB9LCBtb2xkU2hhcGU6IHsgdmVydGljZXM6IG5ld0ZvY3VzZWRWZXJ0aWNlcywgdGVtcExpbmVzOiBuZXdGb2N1c2VkVGVtcExpbmVzIH0gfSA9IG5ld0ZvY3VzZWRTZWdtZW50O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHN0YXJ0IH0gPSBsYXN0U2VnbWVudDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhclBpY2tTdGFydFRlbXBTaGFwZXMobGFzdFNlZ21lbnQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV3Rm9jdXNlZFR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJUZW1wU2hhcGVzKGxhc3RTZWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0U2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FjaGVkSW5kZXggPSBsYXN0U2VnbWVudC5wYXJhbS5pbmRleDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5wYXJhbSA9IGdldE5ld0NvbXBvbmVudFBhcmFtKENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpciwgbmV3Rm9jdXNlZFNlZ21lbnQsIHRoaXMuc3RhaXJQYXJhbS51cHdhcmQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LnBhcmFtLmluZGV4ID0gY2FjaGVkSW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5QYXJhbUNoYW5nZWRCeURyYXcsIGNvbXBvbmVudFBhcmFtOiBPYmplY3QuYXNzaWduKHt9LCBsYXN0U2VnbWVudC5wYXJhbSkgfSwgJyonKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbGRGb2N1c2VkU2VnbWVudCAmJiBvbGRGb2N1c2VkU2VnbWVudCAhPT0gbmV3Rm9jdXNlZFNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRGb2N1c2VkU2VnbWVudC5uZXh0Q29tcG9uZW50cy5mb3JFYWNoKGluZHMgPT4gaW5kcy5kZWxldGUobGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoKF9hID0gbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxpbmUzZEluZGV4KSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmV3Rm9jdXNlZFNlZ21lbnQubmV4dENvbXBvbmVudHMuZm9yRWFjaChpbmRzID0+IGluZHMuZGVsZXRlKGxhc3RTZWdtZW50LnBhcmFtLmluZGV4KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFzZVNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleCh0aGlzLnNlZ21lbnRzLCBsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmFzZVNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFzZVNlZ21lbnQubmV4dENvbXBvbmVudHMuZm9yRWFjaChpbmRzID0+IGluZHMuZGVsZXRlKGxhc3RTZWdtZW50LnBhcmFtLmluZGV4KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNsb3Nlc3RQb2ludDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtaW5EaXN0YW5jZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdGb2N1c2VkVGVtcExpbmVzLmZvckVhY2goKGxpbmUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGluZVNlZzNkID0gR2VvbUxpYi5jcmVhdGVMaW5lU2VnbWVudDNkKG5ld0ZvY3VzZWRWZXJ0aWNlc1tsaW5lWzBdXSwgbmV3Rm9jdXNlZFZlcnRpY2VzW2xpbmVbMV1dKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVQb2ludCA9IGxpbmVTZWczZC5nZXRDbG9zZXN0UG9pbnQoc3RhcnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1ckRpc3RhbmNlID0gdGhlUG9pbnQuZGlzdGFuY2VUbyhzdGFydCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjbG9zZXN0UG9pbnQgfHwgY3VyRGlzdGFuY2UgPCBtaW5EaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5EaXN0YW5jZSA9IGN1ckRpc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0UG9pbnQgPSB0aGVQb2ludDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuc3RhcnQgPSBjbG9zZXN0UG9pbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxhc3RTZWdtZW50LmJhc2VMaW5lU2VnM2QgPSB7IHN0YXJ0OiBuZXdGb2N1c2VkVmVydGljZXNbbGluZVswXV0sIGVuZDogbmV3Rm9jdXNlZFZlcnRpY2VzW2xpbmVbMV1dIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQgPSB7IGNvbXBvbmVudEluZGV4OiBuZXdGb2N1c2VkU2VnbWVudC5wYXJhbS5pbmRleCwgbGluZTNkSW5kZXg6IGluZGV4LCBsaW5lM2Q6IHsgc3RhcnQ6IG5ld0ZvY3VzZWRWZXJ0aWNlc1tsaW5lWzBdXSwgZW5kOiBuZXdGb2N1c2VkVmVydGljZXNbbGluZVsxXV0gfSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCgoX2IgPSBsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IubGluZTNkSW5kZXgpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdGb2N1c2VkU2VnbWVudC5uZXh0Q29tcG9uZW50c1tsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50LmxpbmUzZEluZGV4XS5hZGQobGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuc3RhcnRMb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LmNpcmNsZVRhbmdlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5zdGFydEhlaWdodCA9IG5ld0ZvY3VzZWRTZWdtZW50LmVuZEhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1BpY2tTdGFydFRlbXBTaGFwZXMoc3RhcnQsIGxhc3RTZWdtZW50LnN0YXJ0LCBsYXN0U2VnbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5ld0ZvY3VzZWRTZWdtZW50Lm5leHRDb21wb25lbnRzWzBdLnNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmNsZWFyVGVtcFNoYXBlcyhsYXN0U2VnbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9sZEZvY3VzZWRTZWdtZW50ICYmIG9sZEZvY3VzZWRTZWdtZW50ICE9PSBuZXdGb2N1c2VkU2VnbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRGb2N1c2VkU2VnbWVudC5uZXh0Q29tcG9uZW50cy5mb3JFYWNoKGluZHMgPT4gaW5kcy5kZWxldGUobGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCgoX2MgPSBsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50KSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MubGluZTNkSW5kZXgpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmV3Rm9jdXNlZFNlZ21lbnQubmV4dENvbXBvbmVudHMuZm9yRWFjaChpbmRzID0+IGluZHMuZGVsZXRlKGxhc3RTZWdtZW50LnBhcmFtLmluZGV4KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgodGhpcy5zZWdtZW50cywgbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiYXNlU2VnbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFzZVNlZ21lbnQubmV4dENvbXBvbmVudHMuZm9yRWFjaChpbmRzID0+IGluZHMuZGVsZXRlKGxhc3RTZWdtZW50LnBhcmFtLmluZGV4KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuc3RhcnQgPSBuZXdGb2N1c2VkU2VnbWVudC5lbmQuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5zdGFydExvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuc3RhcnRIZWlnaHQgPSBuZXdGb2N1c2VkU2VnbWVudC5lbmRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGFzdFNlZ21lbnQuYmFzZUxpbmVTZWczZCA9IHsgc3RhcnQ6IG5ld0ZvY3VzZWRWZXJ0aWNlc1tuZXdGb2N1c2VkVmVydGljZXMubGVuZ3RoIC0gMV0sIGVuZDogbmV3Rm9jdXNlZFZlcnRpY2VzW25ld0ZvY3VzZWRWZXJ0aWNlcy5sZW5ndGggLSAyXSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQgPSB7IGNvbXBvbmVudEluZGV4OiBuZXdGb2N1c2VkU2VnbWVudC5wYXJhbS5pbmRleCwgbGluZTNkSW5kZXg6IDAsIGxpbmUzZDogeyBzdGFydDogbmV3Rm9jdXNlZFZlcnRpY2VzW25ld0ZvY3VzZWRWZXJ0aWNlcy5sZW5ndGggLSAxXSwgZW5kOiBuZXdGb2N1c2VkVmVydGljZXNbbmV3Rm9jdXNlZFZlcnRpY2VzLmxlbmd0aCAtIDJdIH0gfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdGb2N1c2VkU2VnbWVudC5uZXh0Q29tcG9uZW50c1swXS5hZGQobGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LmNpcmNsZVRhbmdlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3VGVtcENvbXBvbmVudChsYXN0U2VnbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBsYXN0U2VnbWVudC5zdGFydExvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGxhc3RTZWdtZW50LmNpcmNsZVRhbmdlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCh0aGlzLmRyYXdpbmcgJiYgY29tcG9uZW50SW5kZXggIT09IGxhc3RTZWdtZW50SW5kZXgpIHx8ICF0aGlzLmRyYXdpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3VGVtcENvbXBvbmVudChuZXdGb2N1c2VkU2VnbWVudCwgdGhpcy5kcmF3aW5nLCB0aGlzLmRyYXdpbmcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgoKHRoaXMuZHJhd2luZyAmJiB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCAhPT0gbGFzdFNlZ21lbnRJbmRleCkgfHwgKCF0aGlzLmRyYXdpbmcgJiYgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggIT09IGNvbXBvbmVudEluZGV4KSkgJiYgb2xkRm9jdXNlZFNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kcmF3aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBDb21wb25lbnQob2xkRm9jdXNlZFNlZ21lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhclRlbXBTaGFwZXMob2xkRm9jdXNlZFNlZ21lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4ID0gY29tcG9uZW50SW5kZXg7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVtb3ZlQ29tcG9uZW50KGNvbXBvbmVudEluZGV4KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKHRoaXMuc2VnbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCB0aGVJbmRleCA9IHRoaXMuc2VnbWVudHMuZmluZEluZGV4KHNlZyA9PiBzZWcucGFyYW0uaW5kZXggPT09IGNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgIGlmICh0aGVJbmRleCA+IC0xKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGhlU2VnbWVudCA9IHRoaXMuc2VnbWVudHNbdGhlSW5kZXhdO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYXdpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChfYSA9IHRoZVNlZ21lbnQudGVtcFNoYXBlSWQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcFZpZXcuY2xlYXJUZW1wb3JhcnlTaGFwZXNCeUlkcyh0aGVTZWdtZW50LnRlbXBTaGFwZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdIYW5kcmFpbHMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5lZGl0TW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlSW5zdGFuY2UgPSB0aGlzLmVkaXRNb2RlbC5zdGFpcnMuZ2V0KGNvbXBvbmVudEluZGV4KSB8fCB0aGlzLmVkaXRNb2RlbC5wbGF0Zm9ybXMuZ2V0KGNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoZUluc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlbC5zdGFpcnMuZGVsZXRlKGNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsLnBsYXRmb3Jtcy5kZWxldGUoY29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVzaWduLnJlbW92ZUdyb3VwSW5zdGFuY2UodGhlSW5zdGFuY2UuaW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc2VnbWVudHMuc3BsaWNlKHRoZUluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAvLyB0byBjbGVhciByZWxhdGlvbnNcbiAgICAgICAgICAgICAgICBjb25zdCBiYXNlQ29tcG9uZW50ID0gdGhlU2VnbWVudC5iYXNlQ29tcG9uZW50O1xuICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgodGhpcy5zZWdtZW50cywgYmFzZUNvbXBvbmVudCA9PT0gbnVsbCB8fCBiYXNlQ29tcG9uZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBiYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICBpZiAoYmFzZVNlZ21lbnQgJiYgKGJhc2VDb21wb25lbnQgPT09IG51bGwgfHwgYmFzZUNvbXBvbmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleCkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCB0aGVJbmQgPSBiYXNlU2VnbWVudC5uZXh0Q29tcG9uZW50c1tiYXNlQ29tcG9uZW50LmxpbmUzZEluZGV4XS5maW5kSW5kZXgoaSA9PiBpID09PSB0aGVTZWdtZW50LnBhcmFtLmluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKHRoZUluZCA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGJhc2VTZWdtZW50Lm5leHRDb21wb25lbnRzW2Jhc2VDb21wb25lbnQubGluZTNkSW5kZXhdLmRlbGV0ZSh0aGVTZWdtZW50LnBhcmFtLmluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBuZXh0Q29tcG9uZW50cyA9IHRoZVNlZ21lbnQubmV4dENvbXBvbmVudHM7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBuZXh0U2VnbWVudEluZHMgb2YgbmV4dENvbXBvbmVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRTZWdtZW50SW5kcy5zaXplKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG5leHRTZWdJbmQgb2YgbmV4dFNlZ21lbnRJbmRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dFNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleCh0aGlzLnNlZ21lbnRzLCBuZXh0U2VnSW5kKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFNlZ21lbnQgJiYgbmV4dFNlZ21lbnQuYmFzZUNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U2VnbWVudC5iYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U2VnbWVudC5iYXNlQ29tcG9uZW50LmxpbmUzZEluZGV4ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4ID09PSBjb21wb25lbnRJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggPSB0aGlzLnNlZ21lbnRzW3RoaXMuc2VnbWVudHMubGVuZ3RoIC0gMV0ucGFyYW0uaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIG9uTWF0ZXJpYWxSZXBsYWNlQ2xpY2soY2hhbmdlUGFyYW0sIGluZGV4KSB7XG4gICAgICAgIGFwcC5nZXRBcHBsaWNhdGlvblVJKCkudG9nZ2xlTWF0ZXJpYWxSZXBsYWNlUGFuZWwodHJ1ZSwgdGhpcy5vbk1hdGVyaWFsUmVwbGFjZUl0ZW1DbGljayhjaGFuZ2VQYXJhbSwgaW5kZXgpKTtcbiAgICB9XG4gICAgY2hhbmdlU3RhaXJQYXJhbShzdGFpclBhcmFtLCBjaGFuZ2VQYXJhbXMpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2YsIF9nO1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgLy8gdGhpcy5zdGFpclBhcmFtID0gc3RhaXJQYXJhbVxuICAgICAgICAgICAgaWYgKCF0aGlzLnNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGluc3RhbmNlUGF0aCA9IHRoaXMuZWRpdE1vZGVsID8gZGVzaWduLmdldEVkaXRQYXRoc1RvR3JvdXBJbnN0YW5jZSh0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2UpIDogW107XG4gICAgICAgICAgICBjb25zdCBsYXN0U2VnbWVudCA9IHRoaXMuc2VnbWVudHNbdGhpcy5zZWdtZW50cy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGxldCBzdGFpclByYWFtU3RyaW5nID0gJyc7XG4gICAgICAgICAgICBpZiAoY2hhbmdlUGFyYW1zLmluZGV4T2YoQ29tcG9uZW50UGFyYW1UeXBlLkhvcml6b250YWxTdGVwKSA+IC0xIHx8IGNoYW5nZVBhcmFtcy5pbmRleE9mKENvbXBvbmVudFBhcmFtVHlwZS5WZXJ0aWNhbFN0ZXApID4gLTEgfHxcbiAgICAgICAgICAgICAgICBjaGFuZ2VQYXJhbXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuU3RhcnRXaWR0aCkgPiAtMSB8fCBjaGFuZ2VQYXJhbXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuRW5kV2lkdGgpID4gLTEgfHxcbiAgICAgICAgICAgICAgICBjaGFuZ2VQYXJhbXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuVXB3YXJkKSA+IC0xIHx8XG4gICAgICAgICAgICAgICAgY2hhbmdlUGFyYW1zLmluZGV4T2YoQ29tcG9uZW50UGFyYW1UeXBlLlBsYXRmb3JtVGhpY2tuZXNzKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlR2VuZXJhdGVTZWdtZW50cyA9IHRoaXMuc2VnbWVudHM7XG4gICAgICAgICAgICAgICAgaWYgKGNoYW5nZVBhcmFtcy5pbmRleE9mKENvbXBvbmVudFBhcmFtVHlwZS5VcHdhcmQpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlU3RhaXJVcHdhcmQocmVHZW5lcmF0ZVNlZ21lbnRzWzBdLCByZUdlbmVyYXRlU2VnbWVudHMsIHN0YWlyUGFyYW0udXB3YXJkLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlR2VuZXJhdGVTZWdtZW50cyA9IHRoaXMuc2VnbWVudHMuZmlsdGVyKHNlZyA9PiBjaGFuZ2VQYXJhbXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuUGxhdGZvcm1UaGlja25lc3MpID4gLTEgPyBzZWcucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSA6IHNlZy5wYXJhbS50eXBlICE9PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHJlR2VuZXJhdGVTZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCByZUdlbmVyYXRlU2VnbWVudCBvZiByZUdlbmVyYXRlU2VnbWVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgY2hhbmdlUGFyYW0gb2YgY2hhbmdlUGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVHZW5lcmF0ZVNlZ21lbnQucGFyYW1bY2hhbmdlUGFyYW1dID0gc3RhaXJQYXJhbVtjaGFuZ2VQYXJhbV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IG9wZXJhdGlvblN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZHJhd2luZyAmJiB0aGlzLmVkaXRNb2RlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnRUcmFuc2Zvcm0gPSB0aGlzLmVkaXRNb2RlbCA/IHRoaXMuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZS5nZXRUcmFuc2Zvcm0oKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCByZUdlbmVyYXRlU2VnbWVudCBvZiByZUdlbmVyYXRlU2VnbWVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYXdpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWlyUGFyYW0gPSBzdGFpclBhcmFtO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBDb21wb25lbnQocmVHZW5lcmF0ZVNlZ21lbnQsIHJlR2VuZXJhdGVTZWdtZW50LnBhcmFtLmluZGV4ID09PSB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCAmJiByZUdlbmVyYXRlU2VnbWVudC5wYXJhbS5pbmRleCAhPT0gbGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5lZGl0TW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHBhcmFtOiB7IGluZGV4LCB0eXBlIH0gfSA9IHJlR2VuZXJhdGVTZWdtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoZUluc3RhbmNlID0gdGhpcy5lZGl0TW9kZWwuc3RhaXJzLmdldChpbmRleCkgfHwgdGhpcy5lZGl0TW9kZWwucGxhdGZvcm1zLmdldChpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoZUluc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVTZWdtZW50U2hhcGUocmVHZW5lcmF0ZVNlZ21lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVNZXNoZXMgPSBnZW5lcmF0ZU1lc2hlcyhbcmVHZW5lcmF0ZVNlZ21lbnRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoZU1lc2hlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb25TdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZGVzaWduLnJlbW92ZUdyb3VwSW5zdGFuY2UodGhlSW5zdGFuY2UuaW5zdGFuY2UpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdJbnN0YW5jZSA9IGJ1aWxkQ29tcG9uZW50SW5zdGFuY2UocmVHZW5lcmF0ZVNlZ21lbnQsIHRoaXMuc2VnbWVudHMsIHBhcmVudFRyYW5zZm9ybSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICEhbmV3SW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdJbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlbC5wbGF0Zm9ybXMuc2V0KGluZGV4LCB7IGluc3RhbmNlOiBuZXdJbnN0YW5jZSwgZGVmaW5pdGlvbktleTogKChfYSA9IG5ld0luc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZ2V0S2V5KCkpIHx8ICcnLCBpbnN0YW5jZUtleTogbmV3SW5zdGFuY2UuZ2V0S2V5KCkgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlbC5zdGFpcnMuc2V0KGluZGV4LCB7IGluc3RhbmNlOiBuZXdJbnN0YW5jZSwgZGVmaW5pdGlvbktleTogKChfYiA9IG5ld0luc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuZ2V0S2V5KCkpIHx8ICcnLCBpbnN0YW5jZUtleTogbmV3SW5zdGFuY2UuZ2V0S2V5KCkgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZHJhd2luZyAmJiB0aGlzLmVkaXRNb2RlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUhhbmRyYWlsU2hhcGUoc3RhaXJQYXJhbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKF9jID0gdGhpcy5oYW5kcmFpbENvbGxlY3Rpb24pID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5oYW5kcmFpbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZWRpdE1vZGVsLmhhbmRyYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGRlc2lnbi5yZW1vdmVHcm91cEluc3RhbmNlKHRoaXMuZWRpdE1vZGVsLmhhbmRyYWlsLmhhbmRyYWlsSW5zdGFuY2UuaW5zdGFuY2UpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZWwuaGFuZHJhaWwgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRyYWlsSW5zdGFuY2VzRGF0YSA9IHlpZWxkIGJ1aWxkSGFuZHJhaWxJbnN0YW5jZShzdGFpclBhcmFtLCAoX2QgPSB0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbikgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLmhhbmRyYWlscywgdGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlLmdldFRyYW5zZm9ybSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBoYW5kcmFpbEluc3RhbmNlc0RhdGEgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGFuZHJhaWxJbnN0YW5jZXNEYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsLmhhbmRyYWlsID0gaGFuZHJhaWxJbnN0YW5jZXNEYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZVBhdGgubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKHlpZWxkIGRlc2lnbi5hY3RpdmF0ZUVkaXRQYXRoKGluc3RhbmNlUGF0aFswXSkpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudEluc3RhbmNlID0gdGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21taXRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWlyUGFyYW0gPSBzdGFpclBhcmFtO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuU3RhaXJQYXJhbUNoYW5nZWRCeURyYXcsIHN0YWlyUGFyYW06IHRoaXMuc3RhaXJQYXJhbSB9LCAnKicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWJvcnRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlN0YWlyUGFyYW1DaGFuZ2VkQnlEcmF3LCBzdGFpclBhcmFtOiB0aGlzLnN0YWlyUGFyYW0gfSwgJyonKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbi5hZGQoW3BhcmVudEluc3RhbmNlXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5kcmF3aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdIYW5kcmFpbHMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoYW5nZVBhcmFtcy5sZW5ndGggPT09IDEgJiYgY2hhbmdlUGFyYW1zWzBdLnN0YXJ0c1dpdGgoQ29tcG9uZW50UGFyYW1UeXBlLkhhbmRyYWlsKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYXdpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFpclBhcmFtID0gc3RhaXJQYXJhbTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3SGFuZHJhaWxzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZWRpdE1vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVIYW5kcmFpbFNoYXBlKHN0YWlyUGFyYW0pO1xuICAgICAgICAgICAgICAgICAgICBsZXQgb3BlcmF0aW9uU3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIHN0YWlyUHJhYW1TdHJpbmcgPSBzdHJpbmdpZnlTdGFpclBhcmFtKHN0YWlyUGFyYW0pO1xuICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAhISgoX2UgPSB0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCkpID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS5zZXRDdXN0b21Qcm9wZXJ0eShTdGFpclBhcmFtS2V5LCBzdGFpclByYWFtU3RyaW5nKS5pc1N1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2VQYXRoLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKHlpZWxkIGRlc2lnbi5hY3RpdmF0ZUVkaXRQYXRoKFsuLi5pbnN0YW5jZVBhdGhbMF0sIHRoaXMuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZV0pKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZWRpdE1vZGVsLmhhbmRyYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBkZXNpZ24ucmVtb3ZlR3JvdXBJbnN0YW5jZSh0aGlzLmVkaXRNb2RlbC5oYW5kcmFpbC5oYW5kcmFpbEluc3RhbmNlLmluc3RhbmNlKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlbC5oYW5kcmFpbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoKF9mID0gdGhpcy5oYW5kcmFpbENvbGxlY3Rpb24pID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZi5oYW5kcmFpbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYW5kcmFpbEluc3RhbmNlc0RhdGEgPSB5aWVsZCBidWlsZEhhbmRyYWlsSW5zdGFuY2Uoc3RhaXJQYXJhbSwgKF9nID0gdGhpcy5oYW5kcmFpbENvbGxlY3Rpb24pID09PSBudWxsIHx8IF9nID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZy5oYW5kcmFpbHMsIHRoaXMuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZS5nZXRUcmFuc2Zvcm0oKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBoYW5kcmFpbEluc3RhbmNlc0RhdGEgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoYW5kcmFpbEluc3RhbmNlc0RhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlbC5oYW5kcmFpbCA9IGhhbmRyYWlsSW5zdGFuY2VzRGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2VQYXRoLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKHlpZWxkIGRlc2lnbi5hY3RpdmF0ZUVkaXRQYXRoKFsuLi5pbnN0YW5jZVBhdGhbMF1dKSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudEluc3RhbmNlID0gdGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWl0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWlyUGFyYW0gPSBzdGFpclBhcmFtO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5TdGFpclBhcmFtQ2hhbmdlZEJ5RHJhdywgc3RhaXJQYXJhbTogdGhpcy5zdGFpclBhcmFtIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhYm9ydE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5TdGFpclBhcmFtQ2hhbmdlZEJ5RHJhdywgc3RhaXJQYXJhbTogdGhpcy5zdGFpclBhcmFtIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uLmFkZChbcGFyZW50SW5zdGFuY2VdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghc3RhaXJQYXJhbS5zdGFpck1hdGVyaWFsICYmIGNoYW5nZVBhcmFtcy5sZW5ndGggPT09IDAgJiYgY2hhbmdlUGFyYW1zWzBdID09PSBDb21wb25lbnRQYXJhbVR5cGUuU3RhaXJNYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMub25NYXRlcmlhbFJlcGxhY2VJdGVtQ2xpY2soY2hhbmdlUGFyYW1zWzBdLCB1bmRlZmluZWQsIHRydWUpKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghc3RhaXJQYXJhbS5wbGF0Zm9ybU1hdGVyaWFsICYmIGNoYW5nZVBhcmFtcy5sZW5ndGggPT09IDAgJiYgY2hhbmdlUGFyYW1zWzBdID09PSBDb21wb25lbnRQYXJhbVR5cGUuUGxhdGZvcm1MZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLm9uTWF0ZXJpYWxSZXBsYWNlSXRlbUNsaWNrKGNoYW5nZVBhcmFtc1swXSwgdW5kZWZpbmVkLCB0cnVlKSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXN0YWlyUGFyYW0uaGFuZHJhaWwucmFpbC5tYXRlcmlhbCAmJiBjaGFuZ2VQYXJhbXMubGVuZ3RoID09PSAwICYmIGNoYW5nZVBhcmFtc1swXSA9PT0gQ29tcG9uZW50UGFyYW1UeXBlLkhhbmRyYWlsUmFpbE1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgeWllbGQgdGhpcy5vbk1hdGVyaWFsUmVwbGFjZUl0ZW1DbGljayhjaGFuZ2VQYXJhbXNbMF0sIHVuZGVmaW5lZCwgdHJ1ZSkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCFzdGFpclBhcmFtLmhhbmRyYWlsLmNvbHVtbi5tYXRlcmlhbCAmJiBjaGFuZ2VQYXJhbXMubGVuZ3RoID09PSAwICYmIGNoYW5nZVBhcmFtc1swXSA9PT0gQ29tcG9uZW50UGFyYW1UeXBlLkhhbmRyYWlsQ29sdW1uTWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLm9uTWF0ZXJpYWxSZXBsYWNlSXRlbUNsaWNrKGNoYW5nZVBhcmFtc1swXSwgdW5kZWZpbmVkLCB0cnVlKSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY2hhbmdlQ29tcG9uZW50UGFyYW0oY29tcG9uZW50UGFyYW0sIGNoYW5nZVBhcmFtcykge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2Q7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc2VnbWVudHMubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNvbnN0IHRoZVNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleCh0aGlzLnNlZ21lbnRzLCBjb21wb25lbnRQYXJhbS5pbmRleCk7XG4gICAgICAgICAgICBjb25zdCBsYXN0U2VnbWVudCA9IHRoaXMuc2VnbWVudHNbdGhpcy5zZWdtZW50cy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGlmICh0aGVTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50UGFyYW0ubW9kZWxFZGl0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAvLyB0aGVTZWdtZW50LnBhcmFtID0gY29tcG9uZW50UGFyYW07XG4gICAgICAgICAgICAgICAgaWYgKCFpc0NpcmN1bGFyU3RhaXIodGhlU2VnbWVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhlU2VnbWVudC5jaXJjbGVUYW5nZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY2hhbmdlUGFyYW1zLmxlbmd0aCA9PT0gMCAmJiBjaGFuZ2VQYXJhbXNbMF0gPT09IENvbXBvbmVudFBhcmFtVHlwZS5Db21wb25lbnRNYXRlcmlhbCAmJiAhY29tcG9uZW50UGFyYW0ubWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk1hdGVyaWFsUmVwbGFjZUl0ZW1DbGljayhjaGFuZ2VQYXJhbXNbMF0sIGNvbXBvbmVudFBhcmFtLmluZGV4LCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZUdlbmVyYXRlU2VnbWVudHMgPSBbdGhlU2VnbWVudF07XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VQYXJhbXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuVXB3YXJkKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZUdlbmVyYXRlU2VnbWVudHMgPSBjaGFuZ2VTdGFpclVwd2FyZCh0aGVTZWdtZW50LCB0aGlzLnNlZ21lbnRzLCB0aGVTZWdtZW50LnBhcmFtLnVwd2FyZCwgZmFsc2UsIHRydWUpIHx8IHJlR2VuZXJhdGVTZWdtZW50cztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocmVHZW5lcmF0ZVNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wZXJhdGlvblN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5zdGFuY2VQYXRoID0gdGhpcy5lZGl0TW9kZWwgPyBkZXNpZ24uZ2V0RWRpdFBhdGhzVG9Hcm91cEluc3RhbmNlKHRoaXMuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZSkgOiBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYXdpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGVTZWdtZW50LnBhcmFtID0gY29tcG9uZW50UGFyYW07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmVkaXRNb2RlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2lnbi5zdGFydE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZVBhdGgubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICh5aWVsZCBkZXNpZ24uYWN0aXZhdGVFZGl0UGF0aChbLi4uaW5zdGFuY2VQYXRoWzBdLCB0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2VdKSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudFRyYW5zZm9ybSA9IHRoaXMuZWRpdE1vZGVsID8gdGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlLmdldFRyYW5zZm9ybSgpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCByZUdlbmVyYXRlU2VnbWVudCBvZiByZUdlbmVyYXRlU2VnbWVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kcmF3aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBDb21wb25lbnQocmVHZW5lcmF0ZVNlZ21lbnQsIHJlR2VuZXJhdGVTZWdtZW50LnBhcmFtLmluZGV4ID09PSB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCAmJiByZUdlbmVyYXRlU2VnbWVudC5wYXJhbS5pbmRleCAhPT0gbGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmVkaXRNb2RlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHBhcmFtOiB7IGluZGV4LCB0eXBlIH0gfSA9IHJlR2VuZXJhdGVTZWdtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVJbnN0YW5jZSA9IHRoaXMuZWRpdE1vZGVsLnN0YWlycy5nZXQoaW5kZXgpIHx8IHRoaXMuZWRpdE1vZGVsLnBsYXRmb3Jtcy5nZXQoaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhlSW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVTZWdtZW50U2hhcGUocmVHZW5lcmF0ZVNlZ21lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlTWVzaGVzID0gZ2VuZXJhdGVNZXNoZXMoW3JlR2VuZXJhdGVTZWdtZW50XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhlTWVzaGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb25TdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGRlc2lnbi5yZW1vdmVHcm91cEluc3RhbmNlKHRoZUluc3RhbmNlLmluc3RhbmNlKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb25TdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdJbnN0YW5jZSA9IGJ1aWxkQ29tcG9uZW50SW5zdGFuY2UocmVHZW5lcmF0ZVNlZ21lbnQsIHRoaXMuc2VnbWVudHMsIHBhcmVudFRyYW5zZm9ybSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAhIW5ld0luc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0luc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZWwucGxhdGZvcm1zLnNldChpbmRleCwgeyBpbnN0YW5jZTogbmV3SW5zdGFuY2UsIGRlZmluaXRpb25LZXk6ICgoX2EgPSBuZXdJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmdldEtleSgpKSB8fCAnJywgaW5zdGFuY2VLZXk6IG5ld0luc3RhbmNlLmdldEtleSgpIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZWwuc3RhaXJzLnNldChpbmRleCwgeyBpbnN0YW5jZTogbmV3SW5zdGFuY2UsIGRlZmluaXRpb25LZXk6ICgoX2IgPSBuZXdJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmdldEtleSgpKSB8fCAnJywgaW5zdGFuY2VLZXk6IG5ld0luc3RhbmNlLmdldEtleSgpIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZHJhd2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd0hhbmRyYWlscygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5lZGl0TW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlSGFuZHJhaWxTaGFwZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YWlyUGFyYW0uaGFuZHJhaWwuc3VwcG9ydCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lZGl0TW9kZWwuaGFuZHJhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGRlc2lnbi5yZW1vdmVHcm91cEluc3RhbmNlKHRoaXMuZWRpdE1vZGVsLmhhbmRyYWlsLmhhbmRyYWlsSW5zdGFuY2UuaW5zdGFuY2UpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKF9jID0gdGhpcy5oYW5kcmFpbENvbGxlY3Rpb24pID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5oYW5kcmFpbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYW5kcmFpbEluc3RhbmNlc0RhdGEgPSB5aWVsZCBidWlsZEhhbmRyYWlsSW5zdGFuY2UodGhpcy5zdGFpclBhcmFtLCAoX2QgPSB0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbikgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLmhhbmRyYWlscywgcGFyZW50VHJhbnNmb3JtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGhhbmRyYWlsSW5zdGFuY2VzRGF0YSAhPT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhbmRyYWlsSW5zdGFuY2VzRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsLmhhbmRyYWlsID0gaGFuZHJhaWxJbnN0YW5jZXNEYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZVBhdGgubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICh5aWVsZCBkZXNpZ24uYWN0aXZhdGVFZGl0UGF0aChpbnN0YW5jZVBhdGhbMF0pKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudEluc3RhbmNlID0gdGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb25TdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1pdE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGVTZWdtZW50LnBhcmFtID0gY29tcG9uZW50UGFyYW07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuUGFyYW1DaGFuZ2VkQnlEcmF3LCBjb21wb25lbnRQYXJhbTogT2JqZWN0LmFzc2lnbih7fSwgdGhlU2VnbWVudC5wYXJhbSkgfSwgJyonKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFib3J0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuUGFyYW1DaGFuZ2VkQnlEcmF3LCBjb21wb25lbnRQYXJhbTogT2JqZWN0LmFzc2lnbih7fSwgdGhlU2VnbWVudC5wYXJhbSkgfSwgJyonKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uLmFkZChbcGFyZW50SW5zdGFuY2VdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHRyeUNvbW1pdCgpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2Y7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCBtZXNoZXMgPSBnZW5lcmF0ZU1lc2hlcyh0aGlzLnNlZ21lbnRzKTtcbiAgICAgICAgICAgIGlmIChtZXNoZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgc3RhcnRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdJbnN0YW5jZXMgPSBbXTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFpcnNDaGlsZCA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwbGF0Zm9ybUNoaWxkID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkU2VnbWVudHMgPSBbXTtcbiAgICAgICAgICAgICAgICBsZXQgb3BlcmF0aW9uU3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBzZWdtZW50IG9mIHRoaXMuc2VnbWVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzZWdtZW50Lm1lc2gpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvcGVyYXRpb25TdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhYm9ydE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0luc3RhbmNlID0gYnVpbGRDb21wb25lbnRJbnN0YW5jZShzZWdtZW50LCB0aGlzLnNlZ21lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgISFuZXdJbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0luc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdJbnN0YW5jZXMucHVzaChuZXdJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhdGZvcm1DaGlsZC5zZXQoc2VnbWVudC5wYXJhbS5pbmRleCwgeyBpbnN0YW5jZTogbmV3SW5zdGFuY2UsIGRlZmluaXRpb25LZXk6ICgoX2EgPSBuZXdJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmdldEtleSgpKSB8fCAnJywgaW5zdGFuY2VLZXk6IG5ld0luc3RhbmNlLmdldEtleSgpIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJzQ2hpbGQuc2V0KHNlZ21lbnQucGFyYW0uaW5kZXgsIHsgaW5zdGFuY2U6IG5ld0luc3RhbmNlLCBkZWZpbml0aW9uS2V5OiAoKF9iID0gbmV3SW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5nZXRLZXkoKSkgfHwgJycsIGluc3RhbmNlS2V5OiBuZXdJbnN0YW5jZS5nZXRLZXkoKSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQucGFyYW0ucGxhdGZvcm1MZW5ndGhMb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5wYXJhbS5zdGVwUHJvcG9ydGlvbmFsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQucGFyYW0ud2lkdGhQcm9wb3J0aW9uYWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5wYXJhbS5tb2RlbEVkaXRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRTZWdtZW50cy5wdXNoKHNlZ21lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBoYW5kcmFpbEluc3RhbmNlRGF0YTtcbiAgICAgICAgICAgICAgICBpZiAoKF9jID0gdGhpcy5oYW5kcmFpbENvbGxlY3Rpb24pID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5oYW5kcmFpbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRyYWlsSW5zdGFuY2VzRGF0YVJlcyA9IHlpZWxkIGJ1aWxkSGFuZHJhaWxJbnN0YW5jZSh0aGlzLnN0YWlyUGFyYW0sIChfZCA9IHRoaXMuaGFuZHJhaWxDb2xsZWN0aW9uKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QuaGFuZHJhaWxzKTtcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgaGFuZHJhaWxJbnN0YW5jZXNEYXRhUmVzICE9PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChoYW5kcmFpbEluc3RhbmNlc0RhdGFSZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0luc3RhbmNlcy5wdXNoKGhhbmRyYWlsSW5zdGFuY2VzRGF0YVJlcy5oYW5kcmFpbEluc3RhbmNlLmluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsSW5zdGFuY2VEYXRhID0gaGFuZHJhaWxJbnN0YW5jZXNEYXRhUmVzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChuZXdJbnN0YW5jZXMubGVuZ3RoICYmIG9wZXJhdGlvblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyZW50SW5zdGFuY2UgPSAoX2UgPSBkZXNpZ24ubWFrZUdyb3VwKFtdLCBuZXdJbnN0YW5jZXMsIFtdKSkgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lLmFkZGVkSW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICEhcGFyZW50SW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudERlZiA9IHBhcmVudEluc3RhbmNlID09PSBudWxsIHx8IHBhcmVudEluc3RhbmNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwYXJlbnRJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmVudEluc3RhbmNlICYmIHBhcmVudERlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgcGFyZW50RGVmLnNldEN1c3RvbVByb3BlcnR5KFN0YWlyTW9kZWxLZXksIE1vZGVsVmFsdWUpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YWlyUGFyYW1TdHJpbmcgPSBzdHJpbmdpZnlTdGFpclBhcmFtKHRoaXMuc3RhaXJQYXJhbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBwYXJlbnREZWYuc2V0Q3VzdG9tUHJvcGVydHkoU3RhaXJQYXJhbUtleSwgc3RhaXJQYXJhbVN0cmluZykuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhaXJQYXJhbS5zdGFpck1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhaXJNYXRlcmlhbFN0cmluZyA9IHN0cmluZ2lmeU1hdGVyaWFsKHRoaXMuc3RhaXJQYXJhbS5zdGFpck1hdGVyaWFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBwYXJlbnREZWYuc2V0Q3VzdG9tUHJvcGVydHkoU3RhaXJNYXRlcmlhbEtleSwgc3RhaXJNYXRlcmlhbFN0cmluZykuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhaXJQYXJhbS5wbGF0Zm9ybU1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGxhdGZvcm1NYXRlcmlhbFN0cmluZyA9IHN0cmluZ2lmeU1hdGVyaWFsKHRoaXMuc3RhaXJQYXJhbS5wbGF0Zm9ybU1hdGVyaWFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBwYXJlbnREZWYuc2V0Q3VzdG9tUHJvcGVydHkoUGxhdGZvcm1NYXRlcmlhbEtleSwgcGxhdGZvcm1NYXRlcmlhbFN0cmluZykuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhaXJQYXJhbS5oYW5kcmFpbC5zdXBwb3J0ICYmIHRoaXMuc3RhaXJQYXJhbS5oYW5kcmFpbC5yYWlsLm1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmFpbE1hdGVyaWFsU3RyaW5nID0gc3RyaW5naWZ5TWF0ZXJpYWwodGhpcy5zdGFpclBhcmFtLmhhbmRyYWlsLnJhaWwubWF0ZXJpYWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIHBhcmVudERlZi5zZXRDdXN0b21Qcm9wZXJ0eShSYWlsTWF0ZXJpYWxLZXksIHJhaWxNYXRlcmlhbFN0cmluZykuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhaXJQYXJhbS5oYW5kcmFpbC5zdXBwb3J0ICYmIHRoaXMuc3RhaXJQYXJhbS5oYW5kcmFpbC5jb2x1bW4ubWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2x1bW5NYXRlcmlhbFN0cmluZyA9IHN0cmluZ2lmeU1hdGVyaWFsKHRoaXMuc3RhaXJQYXJhbS5oYW5kcmFpbC5jb2x1bW4ubWF0ZXJpYWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIHBhcmVudERlZi5zZXRDdXN0b21Qcm9wZXJ0eShDb2x1bW5NYXRlcmlhbEtleSwgY29sdW1uTWF0ZXJpYWxTdHJpbmcpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb25TdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWl0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZWwgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudDogeyBpbnN0YW5jZTogcGFyZW50SW5zdGFuY2UsIGRlZmluaXRpb25LZXk6ICgoX2YgPSBwYXJlbnRJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9mLmdldEtleSgpKSB8fCAnJywgaW5zdGFuY2VLZXk6IHBhcmVudEluc3RhbmNlLmdldEtleSgpIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyczogc3RhaXJzQ2hpbGQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXRmb3JtczogcGxhdGZvcm1DaGlsZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWw6IGhhbmRyYWlsSW5zdGFuY2VEYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWdtZW50cyA9IHZhbGlkU2VnbWVudHM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3VGVtcENvbXBvbmVudCh2YWxpZFNlZ21lbnRzWzBdLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLkRyYXdTdGFpck1vZGVsU2V0dGxlZCwgY29tcG9uZW50UGFyYW1zOiB0aGlzLnNlZ21lbnRzLm1hcChzZWcgPT4gKE9iamVjdC5hc3NpZ24oe30sIHNlZy5wYXJhbSkpKSwgc3RhaXJQYXJhbTogdGhpcy5zdGFpclBhcmFtLCBpc0RyYXdpbmc6IGZhbHNlIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFib3J0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXRFZGl0TW9kZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVkaXRNb2RlbDtcbiAgICB9XG4gICAgc2V0TW9kZWwoZ3JvdXBJbnN0YW5jZSkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgaWYgKHRoaXMuZWRpdE1vZGVsICYmIGlzUGFydE9mRWRpdE1vZGVsKHRoaXMuZWRpdE1vZGVsLCBncm91cEluc3RhbmNlKSkge1xuICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5Qcm9wZXJ0aWVzVmlzaWJsZSwgcHJvcGVydGllc1Zpc2libGU6IHRydWUgfSwgJyonKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNDb21wb25lbnQodGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZWRpdE1vZGVsID0gdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBncm91cERlZiA9IGdyb3VwSW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCk7XG4gICAgICAgIGlmIChncm91cEluc3RhbmNlICYmIGdyb3VwRGVmKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFpck1vZGVsUHJvcGVydHkgPSBncm91cERlZi5nZXRDdXN0b21Qcm9wZXJ0eShTdGFpck1vZGVsS2V5KTtcbiAgICAgICAgICAgIGNvbnN0IHN0YWlyUGFyYW1Qcm9wZXJ0eSA9IGdyb3VwRGVmLmdldEN1c3RvbVByb3BlcnR5KFN0YWlyUGFyYW1LZXkpO1xuICAgICAgICAgICAgY29uc3Qgc3RhaXJQYXJhbSA9IHBhcnNlU3RhaXJQYXJhbShzdGFpclBhcmFtUHJvcGVydHkpO1xuICAgICAgICAgICAgY29uc3Qgc3RhaXJNYXRlcmlhbFByb3BlcnR5ID0gZ3JvdXBEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoU3RhaXJNYXRlcmlhbEtleSk7XG4gICAgICAgICAgICBjb25zdCBzdGFpck1hdGVyaWFsID0gcGFyc2VNYXRlcmlhbChzdGFpck1hdGVyaWFsUHJvcGVydHkpO1xuICAgICAgICAgICAgaWYgKHN0YWlyTWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICBzdGFpclBhcmFtLnN0YWlyTWF0ZXJpYWwgPSBzdGFpck1hdGVyaWFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcGxhdGZvcm1NYXRlcmlhbFByb3BlcnR5ID0gZ3JvdXBEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoUGxhdGZvcm1NYXRlcmlhbEtleSk7XG4gICAgICAgICAgICBjb25zdCBwbGF0Zm9ybU1hdGVyaWFsID0gcGFyc2VNYXRlcmlhbChwbGF0Zm9ybU1hdGVyaWFsUHJvcGVydHkpO1xuICAgICAgICAgICAgaWYgKHBsYXRmb3JtTWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICBzdGFpclBhcmFtLnBsYXRmb3JtTWF0ZXJpYWwgPSBwbGF0Zm9ybU1hdGVyaWFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcmFpbE1hdGVyaWFsUHJvcGVydHkgPSBncm91cERlZi5nZXRDdXN0b21Qcm9wZXJ0eShSYWlsTWF0ZXJpYWxLZXkpO1xuICAgICAgICAgICAgY29uc3QgcmFpbE1hdGVyaWFsID0gcGFyc2VNYXRlcmlhbChyYWlsTWF0ZXJpYWxQcm9wZXJ0eSk7XG4gICAgICAgICAgICBpZiAocmFpbE1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgc3RhaXJQYXJhbS5oYW5kcmFpbC5yYWlsLm1hdGVyaWFsID0gcmFpbE1hdGVyaWFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY29sdW1uTWF0ZXJpYWxQcm9wZXJ0eSA9IGdyb3VwRGVmLmdldEN1c3RvbVByb3BlcnR5KENvbHVtbk1hdGVyaWFsS2V5KTtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbk1hdGVyaWFsID0gcGFyc2VNYXRlcmlhbChjb2x1bW5NYXRlcmlhbFByb3BlcnR5KTtcbiAgICAgICAgICAgIGlmIChjb2x1bW5NYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgIHN0YWlyUGFyYW0uaGFuZHJhaWwuY29sdW1uLm1hdGVyaWFsID0gY29sdW1uTWF0ZXJpYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3RhaXJNb2RlbFByb3BlcnR5ID09PSBNb2RlbFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VnbWVudHMgPSBbXTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJHcm91cEluc3RhbmNlcyA9IGdyb3VwRGVmLmdldFN1Ykdyb3VwSW5zdGFuY2VzKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgZWRpdE1vZGVsID0ge1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IHsgaW5zdGFuY2U6IGdyb3VwSW5zdGFuY2UsIGRlZmluaXRpb25LZXk6ICgoX2EgPSBncm91cEluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZ2V0S2V5KCkpIHx8ICcnLCBpbnN0YW5jZUtleTogZ3JvdXBJbnN0YW5jZS5nZXRLZXkoKSB9LFxuICAgICAgICAgICAgICAgICAgICBzdGFpcnM6IG5ldyBNYXAoKSxcbiAgICAgICAgICAgICAgICAgICAgcGxhdGZvcm1zOiBuZXcgTWFwKCksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHN1Ykluc3RhbmNlIG9mIHN1Ykdyb3VwSW5zdGFuY2VzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1YkRlZiA9IHN1Ykluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3ViRGVmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYW5kcmFpbFByb3BlcnR5ID0gc3ViRGVmLmdldEN1c3RvbVByb3BlcnR5KEhhbmRyYWlsTW9kZWxLZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhbmRyYWlsUHJvcGVydHkgPT09IE1vZGVsVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYW5kcmFpbEluc3RhbmNlc0RhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsSW5zdGFuY2U6IHsgaW5zdGFuY2U6IHN1Ykluc3RhbmNlLCBpbnN0YW5jZUtleTogc3ViSW5zdGFuY2UuZ2V0S2V5KCksIGRlZmluaXRpb25LZXk6IHN1YkRlZi5nZXRLZXkoKSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWlsSW5zdGFuY2VzOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uSW5zdGFuY2VzOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRyYWlsU3ViR3JvdXBJbnN0YW5jZXMgPSBzdWJEZWYuZ2V0U3ViR3JvdXBJbnN0YW5jZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGhhbmRyYWlsU3ViSW5zdGFuY2Ugb2YgaGFuZHJhaWxTdWJHcm91cEluc3RhbmNlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYW5kcmFpbFN1YkRlZiA9IGhhbmRyYWlsU3ViSW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoYW5kcmFpbFN1YkRlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmFpbFByb3BlcnR5ID0gaGFuZHJhaWxTdWJEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoUmFpbE1vZGVsS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbHVtblByb3BlcnR5ID0gaGFuZHJhaWxTdWJEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoQ29sdW1uTW9kZWxLZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhaWxQcm9wZXJ0eSA9PT0gTW9kZWxWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsSW5zdGFuY2VzRGF0YS5yYWlsSW5zdGFuY2VzLnB1c2goeyBpbnN0YW5jZTogaGFuZHJhaWxTdWJJbnN0YW5jZSwgaW5zdGFuY2VLZXk6IGhhbmRyYWlsU3ViSW5zdGFuY2UuZ2V0S2V5KCksIGRlZmluaXRpb25LZXk6IGhhbmRyYWlsU3ViRGVmLmdldEtleSgpIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY29sdW1uUHJvcGVydHkgPT09IE1vZGVsVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbEluc3RhbmNlc0RhdGEuY29sdW1uSW5zdGFuY2VzLnB1c2goeyBpbnN0YW5jZTogaGFuZHJhaWxTdWJJbnN0YW5jZSwgaW5zdGFuY2VLZXk6IGhhbmRyYWlsU3ViSW5zdGFuY2UuZ2V0S2V5KCksIGRlZmluaXRpb25LZXk6IGhhbmRyYWlsU3ViRGVmLmdldEtleSgpIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRNb2RlbC5oYW5kcmFpbCA9IGhhbmRyYWlsSW5zdGFuY2VzRGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IGNvbXBvbmVudEluZGV4VmFsdWUgPSBwYXJzZUludChzdWJEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoQ29tcG9uZW50SW5kZXhLZXkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAoaXNGaW5pdGUoY29tcG9uZW50SW5kZXhWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJhbSA9IHBhcnNlQ29tcG9uZW50UGFyYW0oc3ViRGVmLmdldEN1c3RvbVByb3BlcnR5KENvbXBvbmVudFBhcmFtS2V5KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRFbmQgPSBwYXJzZVN0YXJ0RW5kKHN1YkRlZi5nZXRDdXN0b21Qcm9wZXJ0eShTdGFydEVuZEtleSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VMaW5lU2VnM2QgPSBwYXJzZUxpbmVTZWczZChzdWJEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoQmFzZUxpbmVTZWczZEtleSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VDb21wb25lbnQgPSBwYXJzZUJhc2VDb21wb25lbnQoc3ViRGVmLmdldEN1c3RvbVByb3BlcnR5KEJhc2VDb21wb25lbnRLZXkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjaXJjbGVUYW5nZW50ID0gcGFyc2VWZWN0b3IzZChzdWJEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoQ2lyY2xlVGFuZ2VudEtleSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbSAmJiBzdGFydEVuZCAmJiBiYXNlTGluZVNlZzNkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlZ21lbnQgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGdldE5ld1NlZ21lbnQocGFyYW0udHlwZSkpLCB7IHN0YXJ0OiBzdGFydEVuZC5zdGFydCwgZW5kOiBzdGFydEVuZC5lbmQsIHN0YXJ0SGVpZ2h0OiBzdGFydEVuZC5zdGFydEhlaWdodCwgZW5kSGVpZ2h0OiBzdGFydEVuZC5lbmRIZWlnaHQsIGJhc2VDb21wb25lbnQ6IHsgY29tcG9uZW50SW5kZXg6IGJhc2VDb21wb25lbnQgPT09IG51bGwgfHwgYmFzZUNvbXBvbmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmFzZUNvbXBvbmVudC5jb21wb25lbnRJbmRleCwgbGluZTNkSW5kZXg6IGJhc2VDb21wb25lbnQgPT09IG51bGwgfHwgYmFzZUNvbXBvbmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleCwgbGluZTNkOiBiYXNlTGluZVNlZzNkIH0sIGNpcmNsZVRhbmdlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbSwgc3RhcnRMb2NrZWQ6IHRydWUsIGVuZExvY2tlZDogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudHMucHVzaChzZWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRNb2RlbC5wbGF0Zm9ybXMuc2V0KHBhcmFtLmluZGV4LCB7IGluc3RhbmNlOiBzdWJJbnN0YW5jZSwgZGVmaW5pdGlvbktleTogKChfYiA9IHN1Ykluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuZ2V0S2V5KCkpIHx8ICcnLCBpbnN0YW5jZUtleTogc3ViSW5zdGFuY2UuZ2V0S2V5KCkgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0TW9kZWwuc3RhaXJzLnNldChwYXJhbS5pbmRleCwgeyBpbnN0YW5jZTogc3ViSW5zdGFuY2UsIGRlZmluaXRpb25LZXk6ICgoX2MgPSBzdWJJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmdldEtleSgpKSB8fCAnJywgaW5zdGFuY2VLZXk6IHN1Ykluc3RhbmNlLmdldEtleSgpIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudHMuc29ydCgoYSwgYikgPT4gYS5wYXJhbS5pbmRleCAtIGIucGFyYW0uaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBzZWdtZW50cy5mb3JFYWNoKHMgPT4gZ2VuZXJhdGVTaGFwZShzLCBmYWxzZSkpO1xuICAgICAgICAgICAgICAgICAgICBidWlsZFNlZ21lbnRSZWxhdGlvbnMoc2VnbWVudHMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlZ21lbnRzID0gc2VnbWVudHM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsID0gZWRpdE1vZGVsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWlyUGFyYW0gPSBzdGFpclBhcmFtO1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmRyYXdUZW1wQ29tcG9uZW50KHNlZ21lbnRzWzBdLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c0NvbXBvbmVudChzZWdtZW50c1swXS5wYXJhbS5pbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuRHJhd1N0YWlyTW9kZWxTZXR0bGVkLCBjb21wb25lbnRQYXJhbXM6IHRoaXMuc2VnbWVudHMubWFwKHNlZyA9PiAoT2JqZWN0LmFzc2lnbih7fSwgc2VnLnBhcmFtKSkpLCBzdGFpclBhcmFtOiB0aGlzLnN0YWlyUGFyYW0sIGlzRHJhd2luZzogZmFsc2UgfSwgJyonKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2xlYXJFZGl0TW9kZWwoKSB7XG4gICAgICAgIHRoaXMuZWRpdE1vZGVsID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnNlZ21lbnRzID0gW107XG4gICAgICAgIHRoaXMuaGFuZHJhaWxDb2xsZWN0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCA9IERlZmF1bHRGb2N1c2VkQ29tcG9uZW50SW5kZXg7XG4gICAgICAgIGFwcFZpZXcuY2xlYXJUZW1wb3JhcnlTaGFwZXMoKTtcbiAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5EcmF3U3RhaXJNb2RlbFNldHRsZWQsIGlzRHJhd2luZzogZmFsc2UgfSwgJyonKTtcbiAgICB9XG4gICAgY2xlYXIoKSB7XG4gICAgICAgIGFwcFZpZXcuY2xlYXJUZW1wb3JhcnlTaGFwZXMoKTtcbiAgICAgICAgLy8gdGhpcy5jb21wb25lbnRQYXJhbSA9IHsgLi4uRGVmYXVsdENvbXBvbmVudFBhcmFtIH07XG4gICAgICAgIC8vIHRoaXMuc2VnbWVudHMgPSBbXTtcbiAgICAgICAgdGhpcy5kcmF3aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4ID0gRGVmYXVsdEZvY3VzZWRDb21wb25lbnRJbmRleDtcbiAgICAgICAgdGhpcy5zdGFpclBhcmFtID0gRGVmYXVsdFN0YWlyUGFyYW07XG4gICAgICAgIC8vIHRoaXMuZWRpdE1vZGVsID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBvblJCdXR0b25VcChldmVudCwgaW5mZXJlbmNlUmVzdWx0KSB7XG4gICAgICAgIHRoaXMudHJ5Q29tbWl0KCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBkZUFjdGl2YXRlRHJhd1N0YWlyc1Rvb2woKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uTEJ1dHRvbkRiQ2xpY2soZXZlbnQsIGluZmVyZW5jZVJlc3VsdCkge1xuICAgICAgICA7XG4gICAgfVxuICAgIGFsbG93VXNpbmdJbmZlcmVuY2UoKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBvbktleURvd24oZXZlbnQpIHtcbiAgICAgICAgO1xuICAgIH1cbiAgICBvbktleVVwKGV2ZW50KSB7XG4gICAgICAgIDtcbiAgICB9XG4gICAgZ2VuZXJhdGVTZWdtZW50U2hhcGUoc2VnbWVudCwgdGVtcCA9IHRydWUpIHtcbiAgICAgICAgZ2VuZXJhdGVTaGFwZShzZWdtZW50LCB0ZW1wKTtcbiAgICAgICAgLy8gdGhpcy5nZW5lcmF0ZUhhbmRyYWlsU2hhcGUoKTtcbiAgICB9XG4gICAgZ2VuZXJhdGVIYW5kcmFpbFNoYXBlKHN0YWlyUGFyYW0gPSB0aGlzLnN0YWlyUGFyYW0pIHtcbiAgICAgICAgaWYgKHRoaXMuc2VnbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBoYW5kcmFpbHMgPSBnZW5lcmF0ZUhhbmRyYWlsU2hhcGUoc3RhaXJQYXJhbSwgdGhpcy5zZWdtZW50cyk7XG4gICAgICAgICAgICB0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbiA9IHsgaGFuZHJhaWxzOiBoYW5kcmFpbHMgfHwgW10gfTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBjb25zdCBkcmF3U3RhaXJzVG9vbCA9IG5ldyBEcmF3U3RhaXJzVG9vbCgpO1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBEaXJlY3Rpb25aLCBkdW1teVBvaW50M2QgfSBmcm9tIFwiLi9jb25zdHNcIjtcbmltcG9ydCB7IEJhc2VDb21wb25lbnRLZXksIEJhc2VMaW5lU2VnM2RLZXksIENpcmNsZVRhbmdlbnRLZXksIENvbHVtblR5cGUsIENvbXBvbmVudFR5cGUsIERlZmF1bHRTdGFpclBhcmFtLCBIYW5kcmFpbE1vZGVsS2V5LCBSYWlsVHlwZSwgTW9kZWxWYWx1ZSwgU3RhcnRFbmRLZXksIFByZXNldE1hdGVyaWFscywgQ29sdW1uTW9kZWxLZXksIFJhaWxNb2RlbEtleSwgQ29tcG9uZW50UGFyYW1LZXkgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgZ2V0Q29vcmRpbmF0ZSwgc3RyaW5naWZ5QmFzZUNvbXBvbmVudCwgc3RyaW5naWZ5Q29tcG9uZW50UGFyYW0sIHN0cmluZ2lmeVBvaW50M2QsIHN0cmluZ2lmeVN0YXJ0RW5kIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZU1lc2hlcyhzZWdtZW50cykge1xuICAgIGNvbnN0IG1lc2hlcyA9IFtdO1xuICAgIGZvciAoY29uc3Qgc2VnbWVudCBvZiBzZWdtZW50cykge1xuICAgICAgICBjb25zdCB7IHBhcmFtOiB7IHR5cGUgfSwgY2lyY2xlVGFuZ2VudCB9ID0gc2VnbWVudDtcbiAgICAgICAgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpcikge1xuICAgICAgICAgICAgZ2VuZXJhdGVTdHJhaWdodFN0YWlyTWVzaChzZWdtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09PSBDb21wb25lbnRUeXBlLkNpcmN1bGFyU3RhaXIpIHtcbiAgICAgICAgICAgIGlmIChjaXJjbGVUYW5nZW50KSB7XG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVDaXJjdWxhclN0YWlyTWVzaChzZWdtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGdlbmVyYXRlU3RyYWlnaHRTdGFpck1lc2goc2VnbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBnZW5lcmF0ZVBsYXRmb3JtTWVzaChzZWdtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VnbWVudC5tZXNoKSB7XG4gICAgICAgICAgICBtZXNoZXMucHVzaChzZWdtZW50Lm1lc2gpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtZXNoZXM7XG59XG5mdW5jdGlvbiBnZW5lcmF0ZUNpcmN1bGFyU3RhaXJNZXNoKHNlZ21lbnQpIHtcbiAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oLCBfaiwgX2ssIF9sO1xuICAgIGNvbnN0IHsgc3RhcnRMb2NrZWQsIGNpcmNsZVRhbmdlbnQsIHN0YWlyU2hhcGU6IHsgdmVydGljZXMsIHN0ZXBDb3VudCB9LCBjb3JuZXJTaGFwZTogeyB2ZXJ0aWNlczogY29ybmVyVmVydGljZXMgfSwgcGFyYW06IHsgdXB3YXJkIH0gfSA9IHNlZ21lbnQ7XG4gICAgaWYgKHN0ZXBDb3VudCA8IDEgfHwgIXN0YXJ0TG9ja2VkIHx8ICFjaXJjbGVUYW5nZW50KVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGNvbnN0IHN0YWlyTWVzaCA9IHtcbiAgICAgICAgdmVydGljZXM6IHZlcnRpY2VzLm1hcCh2ZXJ0ZXggPT4gW3ZlcnRleC54LCB2ZXJ0ZXgueSwgdmVydGV4LnpdKSxcbiAgICAgICAgdHJpYW5nbGVJbmRpY2VzOiBbXSxcbiAgICAgICAgc29mdEVkZ2VzOiBbXSxcbiAgICB9O1xuICAgIC8vIOacgOW6lemDqOWPsOmYtuWQjuS4i+S9jee9rlxuICAgIC8vIGNvbnN0IGxlZnRJbmRleCA9IHZlcnRpY2VzLmxlbmd0aCAtICgoIXVwd2FyZCAmJiBzdGVwQ291bnQgPiAxKSA/IDQgOiAyKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ZXBDb3VudDsgaSsrKSB7XG4gICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgLy8gc3RhaXIgZmFjZXNcbiAgICAgICAgW2kgKiA0LCBpICogNCArIDEsIGkgKiA0ICsgMl0sIFtpICogNCArIDEsIGkgKiA0ICsgMywgaSAqIDQgKyAyXSwgW2kgKiA0ICsgMiwgaSAqIDQgKyAzLCBpICogNCArIDRdLCBbaSAqIDQgKyAzLCBpICogNCArIDUsIGkgKiA0ICsgNF0sIFxuICAgICAgICAvLyBzaWRlIGZhY2VzICh1cClcbiAgICAgICAgW2kgKiA0LCBpICogNCArIDIsIChpICsgMSkgKiA0XSwgW2kgKiA0ICsgMSwgKGkgKyAxKSAqIDQgKyAxLCBpICogNCArIDNdKTtcbiAgICAgICAgKF9hID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnB1c2goW2kgKiA0ICsgMSwgaSAqIDQgKyAyXSwgW2kgKiA0ICsgMywgaSAqIDQgKyA0XSwgW2kgKiA0LCAoaSArIDEpICogNF0sIFsoaSArIDEpICogNCArIDEsIGkgKiA0ICsgMV0pO1xuICAgICAgICBpZiAodXB3YXJkKSB7XG4gICAgICAgICAgICBjb25zdCBib3R0b21Gcm9udExlZnRJbmRleCA9IDQgKiBzdGVwQ291bnQgKyAyICsgMiAqIChzdGVwQ291bnQgLSBpIC0gMSk7XG4gICAgICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXG4gICAgICAgICAgICAvLyBzaWRlIGZhY2VzIChtaWRkbGUpXG4gICAgICAgICAgICBbaSAqIDQsIChpICsgMSkgKiA0LCBib3R0b21Gcm9udExlZnRJbmRleF0sIFsoaSArIDEpICogNCArIDEsIGkgKiA0ICsgMSwgYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAxXSk7XG4gICAgICAgICAgICBpZiAoaSA8IHN0ZXBDb3VudCAtIDEpIHtcbiAgICAgICAgICAgICAgICAoX2IgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IucHVzaChbKGkgKyAxKSAqIDQsIGJvdHRvbUZyb250TGVmdEluZGV4XSwgWyhpICsgMSkgKiA0ICsgMSwgYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXG4gICAgICAgICAgICAgICAgLy8gc2lkZSBmYWNlcyAoYm90dG9tKVxuICAgICAgICAgICAgICAgIFtpICogNCwgYm90dG9tRnJvbnRMZWZ0SW5kZXgsIGJvdHRvbUZyb250TGVmdEluZGV4ICsgMl0sIFtib3R0b21Gcm9udExlZnRJbmRleCArIDEsIGkgKiA0ICsgMSwgYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAzXSwgXG4gICAgICAgICAgICAgICAgLy8gYm90dG9tIGZhY2VzXG4gICAgICAgICAgICAgICAgW2JvdHRvbUZyb250TGVmdEluZGV4ICsgMiwgYm90dG9tRnJvbnRMZWZ0SW5kZXgsIGJvdHRvbUZyb250TGVmdEluZGV4ICsgM10sIFtib3R0b21Gcm9udExlZnRJbmRleCArIDMsIGJvdHRvbUZyb250TGVmdEluZGV4LCBib3R0b21Gcm9udExlZnRJbmRleCArIDFdKTtcbiAgICAgICAgICAgICAgICAoX2MgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MucHVzaChbaSAqIDQsIGJvdHRvbUZyb250TGVmdEluZGV4XSwgW2kgKiA0ICsgMSwgYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAxXSwgW2JvdHRvbUZyb250TGVmdEluZGV4ICsgMywgYm90dG9tRnJvbnRMZWZ0SW5kZXhdKTtcbiAgICAgICAgICAgICAgICBpZiAoaSA8IHN0ZXBDb3VudCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgKF9kID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLnB1c2goW2JvdHRvbUZyb250TGVmdEluZGV4ICsgMSwgYm90dG9tRnJvbnRMZWZ0SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXG4gICAgICAgICAgICAgICAgLy8gYm90dG9tIGZhY2VzXG4gICAgICAgICAgICAgICAgW2kgKiA0LCBib3R0b21Gcm9udExlZnRJbmRleCwgaSAqIDQgKyAxXSwgW2kgKiA0ICsgMSwgYm90dG9tRnJvbnRMZWZ0SW5kZXgsIGJvdHRvbUZyb250TGVmdEluZGV4ICsgMV0pO1xuICAgICAgICAgICAgICAgIChfZSA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS5wdXNoKFtpICogNCArIDEsIGJvdHRvbUZyb250TGVmdEluZGV4XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBib3R0b21CYWNrTGVmdEluZGV4ID0gNCAqIHN0ZXBDb3VudCArIDIgKyAyICogKHN0ZXBDb3VudCAtIGkgLSAxKTtcbiAgICAgICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgICAgIC8vIHNpZGUgZmFjZXMgKG1pZGRsZSlcbiAgICAgICAgICAgIFtpICogNCwgKGkgKyAxKSAqIDQsIGJvdHRvbUJhY2tMZWZ0SW5kZXhdLCBbKGkgKyAxKSAqIDQgKyAxLCBpICogNCArIDEsIGJvdHRvbUJhY2tMZWZ0SW5kZXggKyAxXSwgXG4gICAgICAgICAgICAvLyBib3R0b20gZmFjZXNcbiAgICAgICAgICAgIFtib3R0b21CYWNrTGVmdEluZGV4LCBib3R0b21CYWNrTGVmdEluZGV4IC0gMiwgYm90dG9tQmFja0xlZnRJbmRleCArIDFdLCBbYm90dG9tQmFja0xlZnRJbmRleCArIDEsIGJvdHRvbUJhY2tMZWZ0SW5kZXggLSAyLCBib3R0b21CYWNrTGVmdEluZGV4IC0gMV0pO1xuICAgICAgICAgICAgKF9mID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9mLnB1c2goW2JvdHRvbUJhY2tMZWZ0SW5kZXggKyAxLCBib3R0b21CYWNrTGVmdEluZGV4IC0gMl0pO1xuICAgICAgICAgICAgaWYgKGkgPCBzdGVwQ291bnQgLSAxKSB7XG4gICAgICAgICAgICAgICAgKF9nID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2cgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9nLnB1c2goWyhpICsgMSkgKiA0LCBib3R0b21CYWNrTGVmdEluZGV4XSwgWyhpICsgMSkgKiA0ICsgMSwgYm90dG9tQmFja0xlZnRJbmRleCArIDFdKTtcbiAgICAgICAgICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXG4gICAgICAgICAgICAgICAgLy8gc2lkZSBmYWNlcyAoYm90dG9tKVxuICAgICAgICAgICAgICAgIFsoaSArIDEpICogNCwgYm90dG9tQmFja0xlZnRJbmRleCAtIDIsIGJvdHRvbUJhY2tMZWZ0SW5kZXhdLCBbYm90dG9tQmFja0xlZnRJbmRleCAtIDEsIChpICsgMSkgKiA0ICsgMSwgYm90dG9tQmFja0xlZnRJbmRleCArIDFdKTtcbiAgICAgICAgICAgICAgICAoX2ggPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfaCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2gucHVzaChbKGkgKyAxKSAqIDQsIGJvdHRvbUJhY2tMZWZ0SW5kZXggLSAyXSwgWyhpICsgMSkgKiA0ICsgMSwgYm90dG9tQmFja0xlZnRJbmRleCAtIDFdLCBbYm90dG9tQmFja0xlZnRJbmRleCArIDEsIGJvdHRvbUJhY2tMZWZ0SW5kZXggLSAyXSk7XG4gICAgICAgICAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIChfaiA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9qID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfai5wdXNoKFtib3R0b21CYWNrTGVmdEluZGV4ICsgMSwgYm90dG9tQmFja0xlZnRJbmRleF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAodXB3YXJkKSB7XG4gICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgLy8gYm90dG9tIGZhY2VzXG4gICAgICAgIC8vIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCAxLCAwXSxcbiAgICAgICAgLy8gW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIDAsIHZlcnRpY2VzLmxlbmd0aCAtIDJdLFxuICAgICAgICAvLyDliY3kvqfpnaJcbiAgICAgICAgW3N0ZXBDb3VudCAqIDQsIHN0ZXBDb3VudCAqIDQgKyAxLCBzdGVwQ291bnQgKiA0ICsgMl0sIFtzdGVwQ291bnQgKiA0ICsgMSwgc3RlcENvdW50ICogNCArIDMsIHN0ZXBDb3VudCAqIDQgKyAyXSk7XG4gICAgICAgIChfayA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9rID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfay5wdXNoKFxuICAgICAgICAvLyBbdmVydGljZXMubGVuZ3RoIC0gMSwgMF0sXG4gICAgICAgIFtzdGVwQ291bnQgKiA0ICsgMSwgc3RlcENvdW50ICogNCArIDJdKTtcbiAgICAgICAgLy8gaWYgKHN0ZXBDb3VudCA+IDEpIHtcbiAgICAgICAgLy8gICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgLy8gICAgICAgICAvLyBzaWRlIGJvdHRvbSBmYWNlc1xuICAgICAgICAvLyAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSAyLCB2ZXJ0aWNlcy5sZW5ndGggLSAxMCwgdmVydGljZXMubGVuZ3RoIC0gNF0sXG4gICAgICAgIC8vICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIHZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDldLFxuICAgICAgICAvLyAgICAgICAgIC8vIGJvdHRvbSBmYWNlc1xuICAgICAgICAvLyAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSA1LCB2ZXJ0aWNlcy5sZW5ndGggLSAzLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSxcbiAgICAgICAgLy8gICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gNSwgdmVydGljZXMubGVuZ3RoIC0gNCwgdmVydGljZXMubGVuZ3RoIC0gNl0sXG4gICAgICAgIC8vICAgICApO1xuICAgICAgICAvLyAgICAgc3RhaXJNZXNoLnNvZnRFZGdlcz8ucHVzaChcbiAgICAgICAgLy8gICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gNSwgdmVydGljZXMubGVuZ3RoIC0gNF0sXG4gICAgICAgIC8vICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIHZlcnRpY2VzLmxlbmd0aCAtIDEwXSxcbiAgICAgICAgLy8gICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gMTAsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLFxuICAgICAgICAvLyAgICAgKTtcbiAgICAgICAgLy8gfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAvLyDlkI7kvqfpnaJcbiAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIDEsIDBdLCBbdmVydGljZXMubGVuZ3RoIC0gMSwgMCwgdmVydGljZXMubGVuZ3RoIC0gMl0pO1xuICAgICAgICAoX2wgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2wucHVzaChbdmVydGljZXMubGVuZ3RoIC0gMSwgMF0pO1xuICAgICAgICAvLyBpZiAoc3RlcENvdW50ID4gMSkge1xuICAgICAgICAvLyAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAvLyAgICAgICAgIC8vIHNpZGUgYm90dG9tIGZhY2VzXG4gICAgICAgIC8vICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIDAsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLFxuICAgICAgICAvLyAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCB2ZXJ0aWNlcy5sZW5ndGggLSAzLCAxXSxcbiAgICAgICAgLy8gICAgICAgICAvLyBib3R0b20gZmFjZXNcbiAgICAgICAgLy8gICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gNSwgdmVydGljZXMubGVuZ3RoIC0gNCwgdmVydGljZXMubGVuZ3RoIC0gM10sXG4gICAgICAgIC8vICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDYsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLFxuICAgICAgICAvLyAgICAgKTtcbiAgICAgICAgLy8gICAgIHN0YWlyTWVzaC5zb2Z0RWRnZXM/LnB1c2goXG4gICAgICAgIC8vICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLFxuICAgICAgICAvLyAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSAzLCAxXSxcbiAgICAgICAgLy8gICAgICAgICBbMCwgdmVydGljZXMubGVuZ3RoIC0gNF0sXG4gICAgICAgIC8vICAgICApO1xuICAgICAgICAvLyB9XG4gICAgfVxuICAgIGlmIChjb3JuZXJWZXJ0aWNlcy5sZW5ndGggPT09IDYpIHtcbiAgICAgICAgZ2VuZXJhdGVQb2x5Z29uTWVzaChjb3JuZXJWZXJ0aWNlcywgc3RhaXJNZXNoKTtcbiAgICB9XG4gICAgc2VnbWVudC5tZXNoID0gc3RhaXJNZXNoO1xufVxuZnVuY3Rpb24gZ2VuZXJhdGVTdHJhaWdodFN0YWlyTWVzaChzZWdtZW50KSB7XG4gICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2YsIF9nLCBfaCwgX2osIF9rO1xuICAgIGNvbnN0IHsgc3RhcnRMb2NrZWQsIHN0YWlyU2hhcGU6IHsgdmVydGljZXMsIHN0ZXBDb3VudCB9LCBjb3JuZXJTaGFwZTogeyB2ZXJ0aWNlczogY29ybmVyVmVydGljZXMgfSwgcGFyYW06IHsgdXB3YXJkIH0gfSA9IHNlZ21lbnQ7XG4gICAgaWYgKHN0ZXBDb3VudCA8IDEgfHwgIXN0YXJ0TG9ja2VkKVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGNvbnN0IHN0YWlyTWVzaCA9IHtcbiAgICAgICAgdmVydGljZXM6IHZlcnRpY2VzLm1hcCh2ZXJ0ZXggPT4gW3ZlcnRleC54LCB2ZXJ0ZXgueSwgdmVydGV4LnpdKSxcbiAgICAgICAgdHJpYW5nbGVJbmRpY2VzOiBbXSxcbiAgICAgICAgc29mdEVkZ2VzOiBbXSxcbiAgICB9O1xuICAgIGNvbnN0IGxlZnRJbmRleCA9IHZlcnRpY2VzLmxlbmd0aCAtICgoIXVwd2FyZCAmJiBzdGVwQ291bnQgPiAxKSA/IDQgOiAyKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ZXBDb3VudDsgaSsrKSB7XG4gICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgLy8gc3RhaXIgZmFjZXNcbiAgICAgICAgW2kgKiA0LCBpICogNCArIDEsIGkgKiA0ICsgMl0sIFtpICogNCArIDEsIGkgKiA0ICsgMywgaSAqIDQgKyAyXSwgW2kgKiA0ICsgMiwgaSAqIDQgKyAzLCBpICogNCArIDRdLCBbaSAqIDQgKyAzLCBpICogNCArIDUsIGkgKiA0ICsgNF0sIFxuICAgICAgICAvLyBzaWRlIGZhY2VzXG4gICAgICAgIFtpICogNCwgaSAqIDQgKyAyLCAoaSArIDEpICogNF0sIFtpICogNCArIDEsIChpICsgMSkgKiA0ICsgMSwgaSAqIDQgKyAzXSk7XG4gICAgICAgIChfYSA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wdXNoKFtpICogNCArIDEsIGkgKiA0ICsgMl0sIFtpICogNCArIDMsIGkgKiA0ICsgNF0sIFtpICogNCwgKGkgKyAxKSAqIDRdLCBbKGkgKyAxKSAqIDQgKyAxLCBpICogNCArIDFdKTtcbiAgICAgICAgaWYgKGkgPT09IHN0ZXBDb3VudCAtIDEgJiYgdXB3YXJkICYmIHN0ZXBDb3VudCA+IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGJiTGVmdEluZGV4ID0gdmVydGljZXMubGVuZ3RoIC0gNDtcbiAgICAgICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgICAgIC8vIHRhaWwgc2lkZSBmYWNlc1xuICAgICAgICAgICAgW2JiTGVmdEluZGV4LCBpICogNCwgKGkgKyAxKSAqIDRdLCBbYmJMZWZ0SW5kZXggKyAxLCAoaSArIDEpICogNCArIDEsIGkgKiA0ICsgMV0pO1xuICAgICAgICAgICAgKF9iID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnB1c2goW2JiTGVmdEluZGV4LCBpICogNF0sIFxuICAgICAgICAgICAgLy8gW2kgKiA0LCAoaSArIDEpICogNF0sXG4gICAgICAgICAgICBbYmJMZWZ0SW5kZXggKyAxLCBpICogNCArIDFdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgICAgIC8vIHNpZGUgZmFjZXNcbiAgICAgICAgICAgIFtsZWZ0SW5kZXgsIGkgKiA0LCAoaSArIDEpICogNF0sIFtsZWZ0SW5kZXggKyAxLCAoaSArIDEpICogNCArIDEsIGkgKiA0ICsgMV0pO1xuICAgICAgICAgICAgLy8gc3RhaXJNZXNoLnNvZnRFZGdlcz8ucHVzaChcbiAgICAgICAgICAgIC8vICAgICBbaSAqIDQsIChpICsgMSkgKiA0XSxcbiAgICAgICAgICAgIC8vICAgICBbKGkgKyAxKSAqIDQgKyAxLCBpICogNCArIDFdLFxuICAgICAgICAgICAgLy8gKTtcbiAgICAgICAgICAgIGlmICh1cHdhcmQpIHtcbiAgICAgICAgICAgICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgKF9jID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnB1c2goW2xlZnRJbmRleCwgaSAqIDRdLCBbbGVmdEluZGV4ICsgMSwgaSAqIDQgKyAxXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzdGVwQ291bnQgPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIChfZCA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5wdXNoKFtsZWZ0SW5kZXgsIChpICsgMSkgKiA0XSwgW2xlZnRJbmRleCArIDEsIChpICsgMSkgKiA0ICsgMV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChzdGVwQ291bnQgPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIChfZSA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS5wdXNoKFtsZWZ0SW5kZXgsIGkgKiA0XSwgW2xlZnRJbmRleCArIDEsIGkgKiA0ICsgMV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaSA8IHN0ZXBDb3VudCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgKF9mID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9mLnB1c2goW2xlZnRJbmRleCwgKGkgKyAxKSAqIDRdLCBbbGVmdEluZGV4ICsgMSwgKGkgKyAxKSAqIDQgKyAxXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlmICh1cHdhcmQpIHtcbiAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAvLyBib3R0b20gZmFjZXNcbiAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIDEsIDBdLCBbdmVydGljZXMubGVuZ3RoIC0gMSwgMCwgdmVydGljZXMubGVuZ3RoIC0gMl0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAzLCB2ZXJ0aWNlcy5sZW5ndGggLSAxLCB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDIsIHZlcnRpY2VzLmxlbmd0aCAtIDRdKTtcbiAgICAgICAgKF9nID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2cgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9nLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIDBdLCBbdmVydGljZXMubGVuZ3RoIC0gMywgdmVydGljZXMubGVuZ3RoIC0gMl0pO1xuICAgICAgICBpZiAoc3RlcENvdW50ID4gMSkge1xuICAgICAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAgICAgLy8gc2lkZSBib3R0b20gZmFjZXNcbiAgICAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSAyLCB2ZXJ0aWNlcy5sZW5ndGggLSAxMCwgdmVydGljZXMubGVuZ3RoIC0gNF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCB2ZXJ0aWNlcy5sZW5ndGggLSAzLCB2ZXJ0aWNlcy5sZW5ndGggLSA5XSwgXG4gICAgICAgICAgICAvLyBib3R0b20gZmFjZXNcbiAgICAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSA1LCB2ZXJ0aWNlcy5sZW5ndGggLSAzLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDQsIHZlcnRpY2VzLmxlbmd0aCAtIDZdKTtcbiAgICAgICAgICAgIChfaCA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9oID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfaC5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSA1LCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIHZlcnRpY2VzLmxlbmd0aCAtIDEwXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDEwLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgLy8gYm90dG9tIGZhY2VzXG4gICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCAwLCAxXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDBdLCBbdmVydGljZXMubGVuZ3RoIC0gMywgdmVydGljZXMubGVuZ3RoIC0gMiwgdmVydGljZXMubGVuZ3RoIC0gMV0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAzLCB2ZXJ0aWNlcy5sZW5ndGggLSA0LCB2ZXJ0aWNlcy5sZW5ndGggLSAyXSk7XG4gICAgICAgIChfaiA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9qID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfai5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCAwXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDJdKTtcbiAgICAgICAgaWYgKHN0ZXBDb3VudCA+IDEpIHtcbiAgICAgICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgICAgIC8vIHNpZGUgYm90dG9tIGZhY2VzXG4gICAgICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gMiwgMCwgdmVydGljZXMubGVuZ3RoIC0gNF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCB2ZXJ0aWNlcy5sZW5ndGggLSAzLCAxXSwgXG4gICAgICAgICAgICAvLyBib3R0b20gZmFjZXNcbiAgICAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSA1LCB2ZXJ0aWNlcy5sZW5ndGggLSA0LCB2ZXJ0aWNlcy5sZW5ndGggLSAzXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDYsIHZlcnRpY2VzLmxlbmd0aCAtIDRdKTtcbiAgICAgICAgICAgIChfayA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9rID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfay5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSA1LCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDMsIDFdLCBbMCwgdmVydGljZXMubGVuZ3RoIC0gNF0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChjb3JuZXJWZXJ0aWNlcy5sZW5ndGggPT09IDYpIHtcbiAgICAgICAgZ2VuZXJhdGVQb2x5Z29uTWVzaChjb3JuZXJWZXJ0aWNlcywgc3RhaXJNZXNoKTtcbiAgICB9XG4gICAgc2VnbWVudC5tZXNoID0gc3RhaXJNZXNoO1xufVxuZnVuY3Rpb24gZ2VuZXJhdGVQbGF0Zm9ybU1lc2goc2VnbWVudCkge1xuICAgIGNvbnN0IHsgc3RhaXJTaGFwZTogeyB2ZXJ0aWNlcyB9IH0gPSBzZWdtZW50O1xuICAgIC8vIGlmIChlbmRMb2NrZWQpIHtcbiAgICBjb25zdCB2ZXJ0ZXhMZW5ndGggPSB2ZXJ0aWNlcy5sZW5ndGggLyAyO1xuICAgIGlmICh2ZXJ0ZXhMZW5ndGggPT09IDQgfHwgdmVydGV4TGVuZ3RoID09PSA1KSB7XG4gICAgICAgIGNvbnN0IHBsYXRmb3JtTWVzaCA9IHtcbiAgICAgICAgICAgIHZlcnRpY2VzOiBbXSxcbiAgICAgICAgICAgIHRyaWFuZ2xlSW5kaWNlczogW10sXG4gICAgICAgICAgICBzb2Z0RWRnZXM6IFtdLFxuICAgICAgICB9O1xuICAgICAgICBnZW5lcmF0ZVBvbHlnb25NZXNoKHZlcnRpY2VzLCBwbGF0Zm9ybU1lc2gpO1xuICAgICAgICBzZWdtZW50Lm1lc2ggPSBwbGF0Zm9ybU1lc2g7XG4gICAgfVxuICAgIC8vIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuZnVuY3Rpb24gZ2VuZXJhdGVQb2x5Z29uTWVzaCh2ZXJ0aWNlcywgbWVzaCkge1xuICAgIHZhciBfYSwgX2I7XG4gICAgY29uc3QgdmVydGV4TGVuZ3RoID0gbWVzaC52ZXJ0aWNlcy5sZW5ndGg7XG4gICAgbWVzaC52ZXJ0aWNlcy5wdXNoKC4uLnZlcnRpY2VzLm1hcCh2ZXJ0ZXggPT4gW3ZlcnRleC54LCB2ZXJ0ZXgueSwgdmVydGV4LnpdKSk7XG4gICAgY29uc3Qgc2VnQ291bnQgPSB2ZXJ0aWNlcy5sZW5ndGggLyAyO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VnQ291bnQ7IGkrKykge1xuICAgICAgICBjb25zdCByaWdodCA9IGkgPT09IHNlZ0NvdW50IC0gMSA/IDAgOiBpICsgMTtcbiAgICAgICAgY29uc3QgYm90dG9tUmlnaHQgPSBpID09PSBzZWdDb3VudCAtIDEgPyBzZWdDb3VudCA6IGkgKyBzZWdDb3VudCArIDE7XG4gICAgICAgIG1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goW2kgKyB2ZXJ0ZXhMZW5ndGgsIGkgKyBzZWdDb3VudCArIHZlcnRleExlbmd0aCwgYm90dG9tUmlnaHQgKyB2ZXJ0ZXhMZW5ndGhdLCBbaSArIHZlcnRleExlbmd0aCwgYm90dG9tUmlnaHQgKyB2ZXJ0ZXhMZW5ndGgsIHJpZ2h0ICsgdmVydGV4TGVuZ3RoXSk7XG4gICAgICAgIChfYSA9IG1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucHVzaChbaSArIHZlcnRleExlbmd0aCwgYm90dG9tUmlnaHQgKyB2ZXJ0ZXhMZW5ndGhdKTtcbiAgICAgICAgaWYgKGkgPiAwICYmIGkgPCBzZWdDb3VudCAtIDEpIHtcbiAgICAgICAgICAgIG1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXG4gICAgICAgICAgICAvLyB0b3AgYW5kIGJvdHRvbVxuICAgICAgICAgICAgW2kgKyB2ZXJ0ZXhMZW5ndGgsIHJpZ2h0ICsgdmVydGV4TGVuZ3RoLCAwICsgdmVydGV4TGVuZ3RoXSwgW2JvdHRvbVJpZ2h0ICsgdmVydGV4TGVuZ3RoLCBpICsgc2VnQ291bnQgKyB2ZXJ0ZXhMZW5ndGgsIHNlZ0NvdW50ICsgdmVydGV4TGVuZ3RoXSk7XG4gICAgICAgICAgICBpZiAoaSA+IDEpIHtcbiAgICAgICAgICAgICAgICAoX2IgPSBtZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnB1c2goW2ksIDAgKyB2ZXJ0ZXhMZW5ndGhdLCBbaSArIHNlZ0NvdW50ICsgdmVydGV4TGVuZ3RoLCBzZWdDb3VudCArIHZlcnRleExlbmd0aF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGxvYWREZWZhdWx0TWF0ZXJpYWxzKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IGRlc2lnbiA9IGFwcC5nZXRBY3RpdmVEZXNpZ24oKTtcbiAgICAgICAgY29uc3QgcmVzMSA9IHlpZWxkIGRlc2lnbi5sb2FkTWF0ZXJpYWwoUHJlc2V0TWF0ZXJpYWxzLlN0YWlyLm1hdGVyaWFsSWQpO1xuICAgICAgICBpZiAoIXJlczEuaXNTdWNjZXNzKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzMiA9IHlpZWxkIGRlc2lnbi5sb2FkTWF0ZXJpYWwoUHJlc2V0TWF0ZXJpYWxzLlBsYXRmb3JtLm1hdGVyaWFsSWQpO1xuICAgICAgICBpZiAoIXJlczIuaXNTdWNjZXNzKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzMyA9IHlpZWxkIGRlc2lnbi5sb2FkTWF0ZXJpYWwoUHJlc2V0TWF0ZXJpYWxzLkhhbmRyYWlsLnJhaWwubWF0ZXJpYWxJZCk7XG4gICAgICAgIGlmICghcmVzMy5pc1N1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXM0ID0geWllbGQgZGVzaWduLmxvYWRNYXRlcmlhbChQcmVzZXRNYXRlcmlhbHMuSGFuZHJhaWwuY29sdW1uLm1hdGVyaWFsSWQpO1xuICAgICAgICBpZiAoIXJlczQuaXNTdWNjZXNzKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gYnVpbGRDb21wb25lbnRJbnN0YW5jZShzZWdtZW50LCBzZWdtZW50cywgcGFyZW50VHJhbnNmb3JtKSB7XG4gICAgdmFyIF9hLCBfYjtcbiAgICBjb25zdCB7IHN0YXJ0LCBlbmQsIHN0YXJ0SGVpZ2h0LCBlbmRIZWlnaHQsIGJhc2VDb21wb25lbnQsIGNpcmNsZVRhbmdlbnQsIHBhcmFtLCBtZXNoIH0gPSBzZWdtZW50O1xuICAgIGNvbnN0IGRlc2lnbiA9IGFwcC5nZXRBY3RpdmVEZXNpZ24oKTtcbiAgICBsZXQgb3BlcmF0aW9uU3VjY2VzcyA9IHRydWU7XG4gICAgaWYgKG1lc2ggPT09IG51bGwgfHwgbWVzaCA9PT0gdm9pZCAwID8gdm9pZCAwIDogbWVzaC52ZXJ0aWNlcy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgbmV3U2hlbGwgPSAoX2EgPSBkZXNpZ24uY3JlYXRlU2hlbGxGcm9tTWVzaChtZXNoKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm5ld1NoZWxsO1xuICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAhIW5ld1NoZWxsO1xuICAgICAgICBpZiAobmV3U2hlbGwpIHtcbiAgICAgICAgICAgIC8vIGlmIChwYXJhbS50eXBlICE9PSBDb21wb25lbnRUeXBlLkNpcmN1bGFyU3RhaXIpIHtcbiAgICAgICAgICAgIC8vICAgICBjb25zdCBzb2Z0RWRnZXMgPSBuZXdTaGVsbC5nZXRFZGdlcygpLmZpbHRlcihlID0+IGUuaXNTb2Z0KCkpO1xuICAgICAgICAgICAgLy8gICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGRlc2lnbi5yZW1vdmVFZGdlcyhzb2Z0RWRnZXMpLmlzU3VjY2VzcztcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIGNvbnN0IG5ld0luc3RhbmNlID0gKF9iID0gZGVzaWduLm1ha2VHcm91cChuZXdTaGVsbC5nZXRGYWNlcygpLCBbXSwgW10pKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuYWRkZWRJbnN0YW5jZTtcbiAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICEhbmV3SW5zdGFuY2U7XG4gICAgICAgICAgICBjb25zdCBncm91cERlZiA9IG5ld0luc3RhbmNlID09PSBudWxsIHx8IG5ld0luc3RhbmNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBuZXdJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKTtcbiAgICAgICAgICAgIGlmIChuZXdJbnN0YW5jZSAmJiBncm91cERlZikge1xuICAgICAgICAgICAgICAgIGlmIChwYXJlbnRUcmFuc2Zvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdHJhbnNmb3JtUmVzID0gZGVzaWduLnRyYW5zZm9ybUdyb3VwSW5zdGFuY2VzKFtuZXdJbnN0YW5jZV0sIHBhcmVudFRyYW5zZm9ybS5pbnZlcnNlZCgpKTtcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgdHJhbnNmb3JtUmVzLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWxPYmplY3QgPSBwYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtID8gUHJlc2V0TWF0ZXJpYWxzLlBsYXRmb3JtIDogUHJlc2V0TWF0ZXJpYWxzLlN0YWlyO1xuICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGRlc2lnbi5hc3NpZ25NYXRlcmlhbEZvckVudGl0aWVzKFtuZXdJbnN0YW5jZV0sIG1hdGVyaWFsT2JqZWN0Lm1hdGVyaWFsSWQsIG1hdGVyaWFsT2JqZWN0LmJnSWQpO1xuICAgICAgICAgICAgICAgIC8vIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGdyb3VwRGVmLnNldEN1c3RvbVByb3BlcnR5KENvbXBvbmVudEluZGV4S2V5LCBgJHtuZXdJbnN0YW5jZXMubGVuZ3RofWApLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAvLyBuZXdJbnN0YW5jZXMucHVzaChuZXdJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFyYW1TdHJpbmcgPSBzdHJpbmdpZnlDb21wb25lbnRQYXJhbShwYXJhbSk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRFbmRTdHJpbmcgPSBzdHJpbmdpZnlTdGFydEVuZChHZW9tTGliLmNyZWF0ZVBvaW50M2Qoc3RhcnQueCwgc3RhcnQueSwgc3RhcnRIZWlnaHQpLCBHZW9tTGliLmNyZWF0ZVBvaW50M2QoZW5kLngsIGVuZC55LCBlbmRIZWlnaHQpKTtcbiAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBncm91cERlZi5zZXRDdXN0b21Qcm9wZXJ0eShDb21wb25lbnRQYXJhbUtleSwgcGFyYW1TdHJpbmcpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBncm91cERlZi5zZXRDdXN0b21Qcm9wZXJ0eShTdGFydEVuZEtleSwgc3RhcnRFbmRTdHJpbmcpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAvLyBpZiAoYmFzZUxpbmVTZWczZCkge1xuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICBpZiAoYmFzZUNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBCYXNlTGluZVN0cmluZyA9IHN0cmluZ2lmeVN0YXJ0RW5kKGJhc2VDb21wb25lbnQubGluZTNkLnN0YXJ0LCBiYXNlQ29tcG9uZW50LmxpbmUzZC5lbmQpO1xuICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBncm91cERlZi5zZXRDdXN0b21Qcm9wZXJ0eShCYXNlTGluZVNlZzNkS2V5LCBCYXNlTGluZVN0cmluZykuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBiYXNlU2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHNlZ21lbnRzLCBiYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJhc2VTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiYXNlQ29tcG9uZW50U3RyaW5nID0gc3RyaW5naWZ5QmFzZUNvbXBvbmVudChiYXNlU2VnbWVudCwgYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBncm91cERlZi5zZXRDdXN0b21Qcm9wZXJ0eShCYXNlQ29tcG9uZW50S2V5LCBiYXNlQ29tcG9uZW50U3RyaW5nKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNpcmNsZVRhbmdlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFuZ2VudFN0cmluZyA9IHN0cmluZ2lmeVBvaW50M2QoY2lyY2xlVGFuZ2VudCk7XG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGdyb3VwRGVmLnNldEN1c3RvbVByb3BlcnR5KENpcmNsZVRhbmdlbnRLZXksIHRhbmdlbnRTdHJpbmcpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld0luc3RhbmNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG5leHBvcnQgZnVuY3Rpb24gYnVpbGRIYW5kcmFpbEluc3RhbmNlKHN0YWlyUGFyYW0sIGhhbmRyYWlscywgcGFyZW50VHJhbnNmb3JtKSB7XG4gICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3QgeyBoYW5kcmFpbDogeyBzdXBwb3J0LCBoZWlnaHQsIHJhaWw6IHsgdHlwZTogcmFpbFR5cGUsIHBhcmFtOiByYWlsUGFyYW0gfSwgY29sdW1uOiB7IHR5cGU6IGNvbHVtblR5cGUsIHBhcmFtOiBjb2x1bW5QYXJhbSB9IH0gfSA9IHN0YWlyUGFyYW07XG4gICAgICAgIGlmICghc3VwcG9ydCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNvbHVtbkZhY2U7XG4gICAgICAgIGlmIChjb2x1bW5UeXBlID09PSBDb2x1bW5UeXBlLkNpcmNsZSkge1xuICAgICAgICAgICAgY29sdW1uRmFjZSA9IGRyYXdDaXJjbGUoZHVtbXlQb2ludDNkLCBEaXJlY3Rpb25aLCBjb2x1bW5QYXJhbS5yYWRpdXMgfHwgRGVmYXVsdFN0YWlyUGFyYW0uaG9yaXpvbnRhbFN0ZXAgLyAxMCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29sdW1uVHlwZSA9PT0gQ29sdW1uVHlwZS5SZWN0KSB7XG4gICAgICAgICAgICBjb2x1bW5GYWNlID0gZHJhd1JlY3QoZHVtbXlQb2ludDNkLCBEaXJlY3Rpb25aLCBjb2x1bW5QYXJhbS53aWR0aCB8fCBEZWZhdWx0U3RhaXJQYXJhbS5ob3Jpem9udGFsU3RlcCAvIDEwLCBjb2x1bW5QYXJhbS5oZWlnaHQgfHwgRGVmYXVsdFN0YWlyUGFyYW0uaG9yaXpvbnRhbFN0ZXAgLyAxMCwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29sdW1uTG9vcCA9IGNvbHVtbkZhY2UgPT09IG51bGwgfHwgY29sdW1uRmFjZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29sdW1uRmFjZS5nZXRPdXRlckxvb3AoKTtcbiAgICAgICAgaWYgKCFjb2x1bW5GYWNlIHx8ICFjb2x1bW5Mb29wKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFjdGl2ZURlc2lnbiA9IGFwcC5nZXRBY3RpdmVEZXNpZ24oKTtcbiAgICAgICAgY29uc3QgaGFuZHJhaWxJbnN0YW5jZSA9IChfYSA9IGFjdGl2ZURlc2lnbi5tYWtlR3JvdXAoW2NvbHVtbkZhY2VdLCBbXSwgW10pKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYWRkZWRJbnN0YW5jZTtcbiAgICAgICAgY29uc3QgaGFuZHJhaWxEZWZpbml0aW9uID0gaGFuZHJhaWxJbnN0YW5jZSA9PT0gbnVsbCB8fCBoYW5kcmFpbEluc3RhbmNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBoYW5kcmFpbEluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpO1xuICAgICAgICBpZiAoIWhhbmRyYWlsSW5zdGFuY2UgfHwgIWhhbmRyYWlsRGVmaW5pdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGFyZW50VHJhbnNmb3JtKSB7XG4gICAgICAgICAgICBjb25zdCB0cmFuc2Zvcm1SZXMgPSBhY3RpdmVEZXNpZ24udHJhbnNmb3JtR3JvdXBJbnN0YW5jZXMoW2hhbmRyYWlsSW5zdGFuY2VdLCBwYXJlbnRUcmFuc2Zvcm0uaW52ZXJzZWQoKSk7XG4gICAgICAgICAgICBpZiAoIXRyYW5zZm9ybVJlcy5pc1N1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFjdGl2YXRlSW5zdGFuY2VSZXMgPSB5aWVsZCBhY3RpdmVEZXNpZ24uYWN0aXZhdGVHcm91cEluc3RhbmNlKGhhbmRyYWlsSW5zdGFuY2UpO1xuICAgICAgICBpZiAoIWFjdGl2YXRlSW5zdGFuY2VSZXMuaXNTdWNjZXNzKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbHVtbkF1eGlsaWFyeUJvdW5kZWRDdXJ2ZSA9IChfYiA9IGFjdGl2ZURlc2lnbi5hZGRBdXhpbGlhcnlCb3VuZGVkQ3VydmUoR2VvbUxpYi5jcmVhdGVMaW5lU2VnbWVudDNkKEdlb21MaWIuY3JlYXRlUG9pbnQzZCgwLCAwLCBoZWlnaHQpLCBkdW1teVBvaW50M2QpKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmFkZGVkQ3VydmU7XG4gICAgICAgIGlmICghY29sdW1uQXV4aWxpYXJ5Qm91bmRlZEN1cnZlKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN3ZWVwQ29sdW1uUmVzID0gYWN0aXZlRGVzaWduLnN3ZWVwRm9sbG93Q3VydmVzKGNvbHVtbkxvb3AsIFtjb2x1bW5BdXhpbGlhcnlCb3VuZGVkQ3VydmVdKTtcbiAgICAgICAgaWYgKCFzd2VlcENvbHVtblJlcy5pc1N1Y2Nlc3MgfHwgIXN3ZWVwQ29sdW1uUmVzLmFkZGVkU2hlbGxzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb2x1bW5PcmlnaW5GYWNlcyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGNvbHVtbk9yaWdpblNoZWxsIG9mIHN3ZWVwQ29sdW1uUmVzLmFkZGVkU2hlbGxzKSB7XG4gICAgICAgICAgICBjb25zdCBjb2x1bW5GYWNlcyA9IGNvbHVtbk9yaWdpblNoZWxsLmdldEZhY2VzKCk7XG4gICAgICAgICAgICBjb2x1bW5PcmlnaW5GYWNlcy5wdXNoKC4uLmNvbHVtbkZhY2VzKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb2x1bW5PcmlnaW5JbnN0YW5jZSA9IChfYyA9IGFjdGl2ZURlc2lnbi5tYWtlR3JvdXAoY29sdW1uT3JpZ2luRmFjZXMsIFtdLCBbXSkpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5hZGRlZEluc3RhbmNlO1xuICAgICAgICBpZiAoIWNvbHVtbk9yaWdpbkluc3RhbmNlKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbHVtbk1hdHJpeGVzID0gW107XG4gICAgICAgIGNvbnN0IHJhaWxJbnN0YW5jZXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBoYW5kcmFpbHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHsgcmFpbCwgY29sdW1ucyB9ID0gaGFuZHJhaWxzW2pdO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgLy8gZm9yIChjb25zdCB7IHJhaWwsIGNvbHVtbnMgfSBvZiBoYW5kcmFpbHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJhaWxCb3VuZGVkQ3VydmVzID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhaWwubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmFpbFBvaW50ID0gcmFpbFtpXTtcbiAgICAgICAgICAgICAgICBjb25zdCByYWlsTmV4dFBvaW50ID0gcmFpbFtpICsgMV07XG4gICAgICAgICAgICAgICAgcmFpbEJvdW5kZWRDdXJ2ZXMucHVzaCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFkZEF1eFJlcyA9IGFjdGl2ZURlc2lnbi5hZGRBdXhpbGlhcnlCb3VuZGVkQ3VydmUoR2VvbUxpYi5jcmVhdGVMaW5lU2VnbWVudDNkKHJhaWxQb2ludCwgcmFpbE5leHRQb2ludCkpO1xuICAgICAgICAgICAgICAgIGlmIChhZGRBdXhSZXMgPT09IG51bGwgfHwgYWRkQXV4UmVzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBhZGRBdXhSZXMuYWRkZWRDdXJ2ZSkge1xuICAgICAgICAgICAgICAgICAgICByYWlsQm91bmRlZEN1cnZlcy5wdXNoKGFkZEF1eFJlcy5hZGRlZEN1cnZlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJhaWxCb3VuZGVkQ3VydmVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhaWxTdGFydEN1cnZlID0gcmFpbEJvdW5kZWRDdXJ2ZXNbMF0uZ2V0Qm91bmRlZEN1cnZlKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmFpbFN0YXJ0UG9pbnQgPSAocmFpbFN0YXJ0Q3VydmUgPT09IG51bGwgfHwgcmFpbFN0YXJ0Q3VydmUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJhaWxTdGFydEN1cnZlLnN0YXJ0UG9pbnQpIHx8IGR1bW15UG9pbnQzZDtcbiAgICAgICAgICAgICAgICBjb25zdCByYWlsU3RhcnREaXIgPSAocmFpbFN0YXJ0Q3VydmUgPT09IG51bGwgfHwgcmFpbFN0YXJ0Q3VydmUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJhaWxTdGFydEN1cnZlLmVuZFBvaW50LnN1YnRyYWN0ZWQocmFpbFN0YXJ0UG9pbnQpLm5vcm1hbGl6ZWQoKS5yZXZlcnNlZCgpKSB8fCBEaXJlY3Rpb25aO1xuICAgICAgICAgICAgICAgIGxldCByYWlsRmFjZTtcbiAgICAgICAgICAgICAgICBpZiAocmFpbFR5cGUgPT09IFJhaWxUeXBlLkNpcmNsZSkge1xuICAgICAgICAgICAgICAgICAgICByYWlsRmFjZSA9IGRyYXdDaXJjbGUocmFpbFN0YXJ0UG9pbnQsIHJhaWxTdGFydERpciwgcmFpbFBhcmFtLnJhZGl1cyB8fCBEZWZhdWx0U3RhaXJQYXJhbS5ob3Jpem9udGFsU3RlcCAvIDUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChyYWlsVHlwZSA9PT0gUmFpbFR5cGUuUmVjdCkge1xuICAgICAgICAgICAgICAgICAgICByYWlsRmFjZSA9IGRyYXdSZWN0KHJhaWxTdGFydFBvaW50LCByYWlsU3RhcnREaXIsIHJhaWxQYXJhbS53aWR0aCB8fCBEZWZhdWx0U3RhaXJQYXJhbS5ob3Jpem9udGFsU3RlcCAvIDUsIHJhaWxQYXJhbS5oZWlnaHQgfHwgRGVmYXVsdFN0YWlyUGFyYW0uaG9yaXpvbnRhbFN0ZXAgLyA1KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCByYWlsTG9vcCA9IHJhaWxGYWNlID09PSBudWxsIHx8IHJhaWxGYWNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiByYWlsRmFjZS5nZXRPdXRlckxvb3AoKTtcbiAgICAgICAgICAgICAgICBpZiAoIXJhaWxGYWNlIHx8ICFyYWlsTG9vcCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBzd2VlcFJhaWxSZXMgPSBhY3RpdmVEZXNpZ24uc3dlZXBGb2xsb3dDdXJ2ZXMocmFpbExvb3AsIHJhaWxCb3VuZGVkQ3VydmVzKTtcbiAgICAgICAgICAgICAgICBpZiAoIXN3ZWVwUmFpbFJlcy5pc1N1Y2Nlc3MgfHwgIXN3ZWVwUmFpbFJlcy5hZGRlZFNoZWxscy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcmFpbEZhY2VzID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCByYWlsU2hlbGwgb2Ygc3dlZXBSYWlsUmVzLmFkZGVkU2hlbGxzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJhaWxTaGVsbEZhY2VzID0gcmFpbFNoZWxsLmdldEZhY2VzKCk7XG4gICAgICAgICAgICAgICAgICAgIHJhaWxGYWNlcy5wdXNoKC4uLnJhaWxTaGVsbEZhY2VzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcmFpbE1ha2VHcm91cFJlcyA9IGFjdGl2ZURlc2lnbi5tYWtlR3JvdXAocmFpbEZhY2VzLCBbXSwgcmFpbEJvdW5kZWRDdXJ2ZXMpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhaWxHcm91cERlZiA9IHJhaWxNYWtlR3JvdXBSZXMgPT09IG51bGwgfHwgcmFpbE1ha2VHcm91cFJlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmFpbE1ha2VHcm91cFJlcy5hZGRlZEluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmICghKHJhaWxNYWtlR3JvdXBSZXMgPT09IG51bGwgfHwgcmFpbE1ha2VHcm91cFJlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmFpbE1ha2VHcm91cFJlcy5hZGRlZEluc3RhbmNlKSB8fCAhcmFpbEdyb3VwRGVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHJhaWxQcm9wZXJ0eVJlcyA9IHJhaWxHcm91cERlZi5zZXRDdXN0b21Qcm9wZXJ0eShSYWlsTW9kZWxLZXksIE1vZGVsVmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmICghcmFpbFByb3BlcnR5UmVzLmlzU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByYWlsSW5zdGFuY2VzLnB1c2gocmFpbE1ha2VHcm91cFJlcy5hZGRlZEluc3RhbmNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgY29sdW1uIG9mIGNvbHVtbnMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2x1bW5TY2FsZU1hdCA9IEdlb21MaWIuY3JlYXRlU2NhbGVNYXRyaXg0KDEsIDEsIChjb2x1bW5bMV0ueiAtIGNvbHVtblswXS56KSAvIGhlaWdodCk7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sdW1uVHJhbnNsYXRlTWF0ID0gR2VvbUxpYi5jcmVhdGVUcmFuc2xhdGlvbk1hdHJpeDQoY29sdW1uWzBdLngsIGNvbHVtblswXS55LCBjb2x1bW5bMF0ueik7XG4gICAgICAgICAgICAgICAgY29sdW1uTWF0cml4ZXMucHVzaChjb2x1bW5UcmFuc2xhdGVNYXQubXVsdGlwbGllZChjb2x1bW5TY2FsZU1hdCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChyYWlsSW5zdGFuY2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgYXNzaWduUmFpbE1hdGVyaWFsUmVzID0gYWN0aXZlRGVzaWduLmFzc2lnbk1hdGVyaWFsRm9yRW50aXRpZXMocmFpbEluc3RhbmNlcywgUHJlc2V0TWF0ZXJpYWxzLkhhbmRyYWlsLnJhaWwubWF0ZXJpYWxJZCwgUHJlc2V0TWF0ZXJpYWxzLkhhbmRyYWlsLnJhaWwuYmdJZCk7XG4gICAgICAgICAgICBpZiAoIWFzc2lnblJhaWxNYXRlcmlhbFJlcykge1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29sdW1uSW5zdGFuY2VzID0gW107XG4gICAgICAgIGlmIChjb2x1bW5NYXRyaXhlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbkNvcHlSZXMgPSBhY3RpdmVEZXNpZ24uYnVsa0NvcHlHcm91cEluc3RhbmNlcyhbY29sdW1uT3JpZ2luSW5zdGFuY2VdLCBbY29sdW1uTWF0cml4ZXNdKTtcbiAgICAgICAgICAgIGlmICghKGNvbHVtbkNvcHlSZXMgPT09IG51bGwgfHwgY29sdW1uQ29weVJlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29sdW1uQ29weVJlcy5hZGRlZEluc3RhbmNlcy5sZW5ndGgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbHVtbkluc3RhbmNlcy5wdXNoKC4uLmNvbHVtbkNvcHlSZXMuYWRkZWRJbnN0YW5jZXMpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBjb2x1bW5JbnN0YW5jZSBvZiBjb2x1bW5Db3B5UmVzLmFkZGVkSW5zdGFuY2VzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sdW1uR3JvdXBEZWYgPSBjb2x1bW5JbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAoIWNvbHVtbkdyb3VwRGVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbHVtblByb3BlcnR5UmVzID0gY29sdW1uR3JvdXBEZWYuc2V0Q3VzdG9tUHJvcGVydHkoQ29sdW1uTW9kZWxLZXksIE1vZGVsVmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmICghY29sdW1uUHJvcGVydHlSZXMuaXNTdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgYXNzaWduQ29sdW1uTWF0ZXJpYWxSZXMgPSBhY3RpdmVEZXNpZ24uYXNzaWduTWF0ZXJpYWxGb3JFbnRpdGllcyhjb2x1bW5Db3B5UmVzLmFkZGVkSW5zdGFuY2VzLCBQcmVzZXRNYXRlcmlhbHMuSGFuZHJhaWwuY29sdW1uLm1hdGVyaWFsSWQsIFByZXNldE1hdGVyaWFscy5IYW5kcmFpbC5jb2x1bW4uYmdJZCk7XG4gICAgICAgICAgICBpZiAoIWFzc2lnbkNvbHVtbk1hdGVyaWFsUmVzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZW1vdmVPcmlnaW5Db2x1bW5SZXMgPSBhY3RpdmVEZXNpZ24ucmVtb3ZlR3JvdXBJbnN0YW5jZShjb2x1bW5PcmlnaW5JbnN0YW5jZSk7XG4gICAgICAgIGlmICghcmVtb3ZlT3JpZ2luQ29sdW1uUmVzLmlzU3VjY2Vzcykge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZW1vdmVPcmlnaW5Db2x1bW5BdXhDdXJ2ZVJlcyA9IGFjdGl2ZURlc2lnbi5yZW1vdmVBdXhpbGlhcnlDdXJ2ZShjb2x1bW5BdXhpbGlhcnlCb3VuZGVkQ3VydmUpO1xuICAgICAgICBpZiAoIXJlbW92ZU9yaWdpbkNvbHVtbkF1eEN1cnZlUmVzLmlzU3VjY2Vzcykge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICAvLyB0byByZW1vdmUgYWxsIGF1eGlsaWFyeUN1cnZlc1xuICAgICAgICBjb25zdCBkZWFjdGl2YXRlSW5zdGFuY2VSZXMgPSB5aWVsZCBhY3RpdmVEZXNpZ24uZGVhY3RpdmF0ZUdyb3VwSW5zdGFuY2UoKTtcbiAgICAgICAgaWYgKCFkZWFjdGl2YXRlSW5zdGFuY2VSZXMuaXNTdWNjZXNzKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNldFByb3BlcnR5UmVzID0gaGFuZHJhaWxEZWZpbml0aW9uLnNldEN1c3RvbVByb3BlcnR5KEhhbmRyYWlsTW9kZWxLZXksIE1vZGVsVmFsdWUpO1xuICAgICAgICBpZiAoIXNldFByb3BlcnR5UmVzLmlzU3VjY2Vzcykge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaGFuZHJhaWxJbnN0YW5jZTogeyBpbnN0YW5jZTogaGFuZHJhaWxJbnN0YW5jZSwgaW5zdGFuY2VLZXk6IGhhbmRyYWlsSW5zdGFuY2UuZ2V0S2V5KCksIGRlZmluaXRpb25LZXk6IGhhbmRyYWlsRGVmaW5pdGlvbi5nZXRLZXkoKSB9LFxuICAgICAgICAgICAgcmFpbEluc3RhbmNlczogcmFpbEluc3RhbmNlcy5tYXAoaW5zdGFuY2UgPT4geyB2YXIgX2E7IHJldHVybiAoeyBpbnN0YW5jZSwgaW5zdGFuY2VLZXk6IGluc3RhbmNlLmdldEtleSgpLCBkZWZpbml0aW9uS2V5OiAoKF9hID0gaW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5nZXRLZXkoKSkgfHwgJycgfSk7IH0pLFxuICAgICAgICAgICAgY29sdW1uSW5zdGFuY2VzOiBjb2x1bW5JbnN0YW5jZXMubWFwKGluc3RhbmNlID0+IHsgdmFyIF9hOyByZXR1cm4gKHsgaW5zdGFuY2UsIGluc3RhbmNlS2V5OiBpbnN0YW5jZS5nZXRLZXkoKSwgZGVmaW5pdGlvbktleTogKChfYSA9IGluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZ2V0S2V5KCkpIHx8ICcnIH0pOyB9KSxcbiAgICAgICAgfTtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkcmF3Q2lyY2xlKGNlbnRlciwgbm9ybWFsLCByYWRpdXMpIHtcbiAgICBjb25zdCBhY3RpdmVEZXNpZ24gPSBhcHAuZ2V0QWN0aXZlRGVzaWduKCk7XG4gICAgY29uc3QgcmVzID0gYWN0aXZlRGVzaWduLmFkZENpcmNsZShHZW9tTGliLmNyZWF0ZUNpcmNsZTNkQnlDZW50ZXJOb3JtYWxSYWRpdXMoY2VudGVyLCBub3JtYWwsIHJhZGl1cykpO1xuICAgIGlmIChyZXMgPT09IG51bGwgfHwgcmVzID09PSB2b2lkIDAgPyB2b2lkIDAgOiByZXMuYWRkZWRFZGdlcy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3Qgc2hlbGwgPSByZXMuYWRkZWRFZGdlc1swXS5nZXRTaGVsbCgpO1xuICAgICAgICBjb25zdCBmYWNlcyA9IHNoZWxsID09PSBudWxsIHx8IHNoZWxsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzaGVsbC5nZXRGYWNlcygpO1xuICAgICAgICBpZiAoKGZhY2VzID09PSBudWxsIHx8IGZhY2VzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBmYWNlcy5sZW5ndGgpID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFjZXNbMF07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkcmF3UmVjdChjZW50ZXIsIG5vcm1hbCwgd2lkdGgsIGhlaWdodCwgd2l0aENvcm5lciA9IHRydWUpIHtcbiAgICBjb25zdCBwb2ludDEgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QoLXdpZHRoIC8gMiwgMCwgMCk7XG4gICAgY29uc3QgcG9pbnQyID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKHdpZHRoIC8gMiwgMCwgMCk7XG4gICAgbGV0IHBvaW50cyA9IFtwb2ludDEsIHBvaW50Ml07XG4gICAgaWYgKHdpdGhDb3JuZXIpIHtcbiAgICAgICAgY29uc3QgcDUgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2Qod2lkdGggLyAyLCBoZWlnaHQgLyAzICogMiwgMCk7XG4gICAgICAgIGNvbnN0IHA2ID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKHdpZHRoIC8gNCwgaGVpZ2h0LCAwKTtcbiAgICAgICAgY29uc3QgbTEgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QoKHA1LnggKyBwNi54KSAvIDIsIChwNS55ICsgcDYueSkgLyAyLCAwKTtcbiAgICAgICAgY29uc3QgZGlyMSA9IHA2LnN1YnRyYWN0ZWQocDUpLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgY29uc3QgdG9DZW50ZXJEaXIxID0gRGlyZWN0aW9uWi5jcm9zcyhkaXIxKTtcbiAgICAgICAgY29uc3QgZDEgPSBwNS5kaXN0YW5jZVRvKHA2KTtcbiAgICAgICAgLy8gY29uc3QgcjEgPSBkMSAvIDIgLyBNYXRoLnNpbihNYXRoLlBJIC8gNik7XG4gICAgICAgIGNvbnN0IGgxID0gZDEgLyAyIC8gTWF0aC50YW4oTWF0aC5QSSAvIDYpO1xuICAgICAgICBjb25zdCBjZW50ZXIxID0gbTEuYWRkZWQodG9DZW50ZXJEaXIxLm11bHRpcGxpZWQoaDEpKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCByb3RhdGVNYXQgPSBHZW9tTGliLmNyZWF0ZVJvdGF0ZU1hdHJpeDQoaSAqIE1hdGguUEkgLyAzMCwgRGlyZWN0aW9uWiwgY2VudGVyMSk7XG4gICAgICAgICAgICBjb25zdCBkaXNjcmV0ZVBvaW50ID0gcDUuYXBwbGllZE1hdHJpeDQocm90YXRlTWF0KTtcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKGRpc2NyZXRlUG9pbnQpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHA3ID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKC13aWR0aCAvIDQsIGhlaWdodCwgMCk7XG4gICAgICAgIGNvbnN0IHA4ID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKC13aWR0aCAvIDIsIGhlaWdodCAvIDMgKiAyLCAwKTtcbiAgICAgICAgY29uc3QgbTIgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QoKHA3LnggKyBwOC54KSAvIDIsIChwNy55ICsgcDgueSkgLyAyLCAwKTtcbiAgICAgICAgY29uc3QgZGlyMiA9IHA4LnN1YnRyYWN0ZWQocDcpLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgY29uc3QgdG9DZW50ZXJEaXIyID0gRGlyZWN0aW9uWi5jcm9zcyhkaXIyKTtcbiAgICAgICAgY29uc3QgZDIgPSBwNy5kaXN0YW5jZVRvKHA4KTtcbiAgICAgICAgLy8gY29uc3QgcjIgPSBkMiAvIDIgLyBNYXRoLnNpbihNYXRoLlBJIC8gNik7XG4gICAgICAgIGNvbnN0IGgyID0gZDIgLyAyIC8gTWF0aC50YW4oTWF0aC5QSSAvIDYpO1xuICAgICAgICBjb25zdCBjZW50ZXIyID0gbTIuYWRkZWQodG9DZW50ZXJEaXIyLm11bHRpcGxpZWQoaDIpKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCByb3RhdGVNYXQgPSBHZW9tTGliLmNyZWF0ZVJvdGF0ZU1hdHJpeDQoaSAqIE1hdGguUEkgLyAzMCwgRGlyZWN0aW9uWiwgY2VudGVyMik7XG4gICAgICAgICAgICBjb25zdCBkaXNjcmV0ZVBvaW50ID0gcDcuYXBwbGllZE1hdHJpeDQocm90YXRlTWF0KTtcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKGRpc2NyZXRlUG9pbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBwb2ludDMgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2Qod2lkdGggLyAyLCBoZWlnaHQsIDApO1xuICAgICAgICBjb25zdCBwb2ludDQgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QoLXdpZHRoIC8gMiwgaGVpZ2h0LCAwKTtcbiAgICAgICAgcG9pbnRzLnB1c2gocG9pbnQzLCBwb2ludDQpO1xuICAgIH1cbiAgICBjb25zdCBjb29yZGluYXRlID0gZ2V0Q29vcmRpbmF0ZShub3JtYWwpO1xuICAgIGNvbnN0IGNvb3JkaW5hdGVNYXQgPSBHZW9tTGliLmNyZWF0ZUFsaWduQ0NTTWF0cml4NChjb29yZGluYXRlLmR4LCBjb29yZGluYXRlLmR5LCBjb29yZGluYXRlLmR6LCBjZW50ZXIpO1xuICAgIGNvbnN0IHRyYW5zbGF0ZU1hdDEgPSBHZW9tTGliLmNyZWF0ZVRyYW5zbGF0aW9uTWF0cml4NCgwLCAtaGVpZ2h0IC8gMiwgMCk7XG4gICAgLy8gY29uc3QgdHJhbnNsYXRlTWF0MiA9IEdlb21MaWIuY3JlYXRlVHJhbnNsYXRpb25NYXRyaXg0KGNlbnRlci54LCBjZW50ZXIueSwgY2VudGVyLnopO1xuICAgIGNvbnN0IHRyYW5zZm9ybU1hdCA9IGNvb3JkaW5hdGVNYXQubXVsdGlwbGllZCh0cmFuc2xhdGVNYXQxKTtcbiAgICBwb2ludHMgPSBwb2ludHMubWFwKHAgPT4gcC5hcHBsaWVkTWF0cml4NCh0cmFuc2Zvcm1NYXQpKTtcbiAgICBjb25zdCBhY3RpdmVEZXNpZ24gPSBhcHAuZ2V0QWN0aXZlRGVzaWduKCk7XG4gICAgY29uc3QgcmVzID0gYWN0aXZlRGVzaWduLmFkZEVkZ2VzKHBvaW50cyk7XG4gICAgaWYgKHJlcyA9PT0gbnVsbCB8fCByZXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlcy5hZGRlZEVkZ2VzLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBlZGdlVmVydGljZXMgPSBuZXcgU2V0KCk7XG4gICAgICAgIGZvciAoY29uc3QgYWRkZWRFZGdlIG9mIHJlcy5hZGRlZEVkZ2VzKSB7XG4gICAgICAgICAgICBjb25zdCB2YSA9IGFkZGVkRWRnZS5nZXRWZXJ0ZXhBKCk7XG4gICAgICAgICAgICBjb25zdCB2YiA9IGFkZGVkRWRnZS5nZXRWZXJ0ZXhCKCk7XG4gICAgICAgICAgICBpZiAodmEpIHtcbiAgICAgICAgICAgICAgICBlZGdlVmVydGljZXMuYWRkKHZhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2Yikge1xuICAgICAgICAgICAgICAgIGVkZ2VWZXJ0aWNlcy5hZGQodmIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNldFNvZnRSZXN1bHQgPSBhY3RpdmVEZXNpZ24uc2V0VmVydGljZXNTb2Z0KFsuLi5lZGdlVmVydGljZXNdLCB0cnVlKTtcbiAgICAgICAgaWYgKHNldFNvZnRSZXN1bHQuaXNTdWNjZXNzKSB7XG4gICAgICAgICAgICBjb25zdCBzaGVsbCA9IHJlcy5hZGRlZEVkZ2VzWzBdLmdldFNoZWxsKCk7XG4gICAgICAgICAgICBjb25zdCBmYWNlcyA9IHNoZWxsID09PSBudWxsIHx8IHNoZWxsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzaGVsbC5nZXRGYWNlcygpO1xuICAgICAgICAgICAgaWYgKChmYWNlcyA9PT0gbnVsbCB8fCBmYWNlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogZmFjZXMubGVuZ3RoKSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWNlc1swXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldFNlZ21lbnRCeUluZGV4KHNlZ21lbnRzLCBpbmRleCkge1xuICAgIGlmIChpbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiBzZWdtZW50cy5maW5kKHNlZ21lbnQgPT4gc2VnbWVudC5wYXJhbS5pbmRleCA9PT0gaW5kZXgpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkU2VnbWVudFJlbGF0aW9ucyhzZWdtZW50cykge1xuICAgIGZvciAoY29uc3Qgc2VnbWVudCBvZiBzZWdtZW50cykge1xuICAgICAgICBjb25zdCBiYXNlQ29tcG9uZW50ID0gc2VnbWVudC5iYXNlQ29tcG9uZW50O1xuICAgICAgICBjb25zdCBiYXNlU2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHNlZ21lbnRzLCBiYXNlQ29tcG9uZW50ID09PSBudWxsIHx8IGJhc2VDb21wb25lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJhc2VDb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xuICAgICAgICBpZiAoYmFzZVNlZ21lbnQgJiYgKGJhc2VDb21wb25lbnQgPT09IG51bGwgfHwgYmFzZUNvbXBvbmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleCkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgYmFzZVNlZ21lbnQubmV4dENvbXBvbmVudHNbYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleF0uYWRkKHNlZ21lbnQucGFyYW0uaW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGdldE5leHRDb21wb25lbnRzKHNlZ21lbnQsIHNlZ21lbnRzKSB7XG4gICAgY29uc3QgeyBuZXh0Q29tcG9uZW50cyB9ID0gc2VnbWVudDtcbiAgICBjb25zdCBuZXh0U2VnbWVudHMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IG5leHRDb21wb25lbnRJbmRleGVzIG9mIG5leHRDb21wb25lbnRzKSB7XG4gICAgICAgIGZvciAoY29uc3QgbmV4dENvbXBvbmVudEluZGV4IG9mIG5leHRDb21wb25lbnRJbmRleGVzKSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0U2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHNlZ21lbnRzLCBuZXh0Q29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgaWYgKG5leHRTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgbmV4dFNlZ21lbnRzLnB1c2gobmV4dFNlZ21lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXh0U2VnbWVudHM7XG59XG5leHBvcnQgZnVuY3Rpb24gY2hhbmdlU3RhaXJVcHdhcmQoc3RhcnRTZWdtZW50LCBzZWdtZW50cywgdXB3YXJkLCBidWxrQ2hhbmdlLCBvbmx5U3RhcnQgPSBmYWxzZSkge1xuICAgIGlmIChzZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgbGV0IGN1cnJlbnQgPSBbeyBzZWdtZW50OiBzdGFydFNlZ21lbnQsIHZlcnRpY2FsRGVsdGE6IDAgfV07XG4gICAgICAgIGNvbnN0IHVuVmlzaXRlZCA9IG5ldyBTZXQoc2VnbWVudHMpO1xuICAgICAgICBjb25zdCBjaGFuZ2VkU2VnbWVudHMgPSBuZXcgU2V0KCk7XG4gICAgICAgIHdoaWxlIChjdXJyZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IG5leHQgPSBbXTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgeyBzZWdtZW50LCB2ZXJ0aWNhbERlbHRhIH0gb2YgY3VycmVudCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgc3RhcnRIZWlnaHQsIGVuZEhlaWdodCB9ID0gc2VnbWVudDtcbiAgICAgICAgICAgICAgICBjb25zdCB1cHdhcmRGbGFnID0gb25seVN0YXJ0ID8gc2VnbWVudC5wYXJhbS51cHdhcmQgOiB1cHdhcmQ7XG4gICAgICAgICAgICAgICAgY29uc3QgZW5kRGVsdGEgPSBzZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gPyAwIDogTWF0aC5hYnMoZW5kSGVpZ2h0IC0gc3RhcnRIZWlnaHQpICogKHVwd2FyZEZsYWcgPyAxIDogLTEpO1xuICAgICAgICAgICAgICAgIHNlZ21lbnQuc3RhcnRIZWlnaHQgPSB2ZXJ0aWNhbERlbHRhO1xuICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kSGVpZ2h0ID0gc2VnbWVudC5zdGFydEhlaWdodCArIGVuZERlbHRhO1xuICAgICAgICAgICAgICAgIGlmICghb25seVN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnQucGFyYW0udXB3YXJkID0gdXB3YXJkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB1blZpc2l0ZWQuZGVsZXRlKHNlZ21lbnQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5leHRTZWdtZW50cyA9IGdldE5leHRDb21wb25lbnRzKHNlZ21lbnQsIHNlZ21lbnRzKTtcbiAgICAgICAgICAgICAgICBpZiAobmV4dFNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0LnB1c2goLi4ubmV4dFNlZ21lbnRzLm1hcChzZWcgPT4gKHsgc2VnbWVudDogc2VnLCB2ZXJ0aWNhbERlbHRhOiBzZWdtZW50LmVuZEhlaWdodCB9KSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjaGFuZ2VkU2VnbWVudHMuYWRkKHNlZ21lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3VycmVudCA9IG5leHQ7XG4gICAgICAgICAgICBpZiAoIWN1cnJlbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGJ1bGtDaGFuZ2UgJiYgdW5WaXNpdGVkLnNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlU2VnbWVudCA9IFsuLi51blZpc2l0ZWQudmFsdWVzKCldWzBdO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gW3sgc2VnbWVudDogdGhlU2VnbWVudCwgdmVydGljYWxEZWx0YTogdGhlU2VnbWVudC5zdGFydEhlaWdodCA+IDAgPT09IHVwd2FyZCA/IDAgOiAodGhlU2VnbWVudC5zdGFydEhlaWdodCAqIC0yKSB9XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFsuLi5jaGFuZ2VkU2VnbWVudHNdO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEFuZ2xlVG9sZXJhbmNlLCBEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSwgRGlyZWN0aW9uWiwgZHVtbXlQb2ludDNkLCBMZW5ndGhUb2xlcmFuY2UsIFN0ZXBDb3VudExpbWl0IH0gZnJvbSBcIi4vY29uc3RzXCI7XG5pbXBvcnQgeyBnZXRTZWdtZW50QnlJbmRleCB9IGZyb20gXCIuL21lc2hVdGlsc1wiO1xuaW1wb3J0IHsgQ29tcG9uZW50VHlwZSwgQ29tcG9uZW50RGlyZWN0aW9uVHlwZSwgQ2lyY3VsYXJTaWRlLCBIYW5kcmFpbERlZmF1bHRPZmZzZXRMZW5ndGggfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgaXNFcXVhbCB9IGZyb20gXCIuL3V0aWxzXCI7XG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVTaGFwZShzZWdtZW50LCB0ZW1wID0gdHJ1ZSkge1xuICAgIGNvbnN0IHsgcGFyYW06IHsgdHlwZSB9LCBjaXJjbGVUYW5nZW50IH0gPSBzZWdtZW50O1xuICAgIGlmICh0eXBlID09PSBDb21wb25lbnRUeXBlLlN0cmFpZ2h0U3RhaXIpIHtcbiAgICAgICAgZ2VuZXJhdGVTdHJhaWdodFN0YWlyU2hhcGUoc2VnbWVudCwgdGVtcCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpcikge1xuICAgICAgICBpZiAoY2lyY2xlVGFuZ2VudCkge1xuICAgICAgICAgICAgZ2VuZXJhdGVDaXJjdWxhclN0YWlyU2hhcGUoc2VnbWVudCwgdGVtcCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBnZW5lcmF0ZVN0cmFpZ2h0U3RhaXJTaGFwZShzZWdtZW50LCB0ZW1wKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZ2VuZXJhdGVQbGF0Zm9ybVNoYXBlKHNlZ21lbnQsIHRlbXApO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdlbmVyYXRlQ2lyY3VsYXJTdGFpclNoYXBlKHNlZ21lbnQsIHRlbXAgPSB0cnVlKSB7XG4gICAgY29uc3QgeyBzdGFydCwgZW5kLCBzdGFpclNoYXBlLCBtb2xkU2hhcGUsIGNvcm5lclNoYXBlLCBjb3JuZXJNb2xkU2hhcGUsIHN0YXJ0SGVpZ2h0LCBiYXNlQ29tcG9uZW50LCBjaXJjbGVUYW5nZW50LCBwYXJhbSB9ID0gc2VnbWVudDtcbiAgICBjb25zdCB7IHN0YXJ0V2lkdGgsIGVuZFdpZHRoLCBob3Jpem9udGFsU3RlcCwgdmVydGljYWxTdGVwLCB1cHdhcmQsIHBsYXRmb3JtVGhpY2tuZXNzIH0gPSBwYXJhbTtcbiAgICBpZiAoY2lyY2xlVGFuZ2VudCkge1xuICAgICAgICBjb25zdCB0YW5nZW50TGVmdERpciA9IERpcmVjdGlvblouY3Jvc3MoY2lyY2xlVGFuZ2VudCkubm9ybWFsaXplZCgpO1xuICAgICAgICBjb25zdCBzdGFydEVuZERpciA9IGVuZC5zdWJ0cmFjdGVkKHN0YXJ0KS5ub3JtYWxpemVkKCk7XG4gICAgICAgIGNvbnN0IHN0YXJ0RW5kRGlzdGFuY2UgPSBzdGFydC5kaXN0YW5jZVRvKGVuZCk7XG4gICAgICAgIGNvbnN0IG1heFdpZHRoID0gTWF0aC5tYXgoc3RhcnRXaWR0aCwgZW5kV2lkdGgpO1xuICAgICAgICBjb25zdCBlbmRBbmdsZSA9IHN0YXJ0RW5kRGlyLmFuZ2xlVG8oY2lyY2xlVGFuZ2VudCwgRGlyZWN0aW9uWik7XG4gICAgICAgIGlmIChlbmRBbmdsZSA8IERpcmVjdGlvbkFuZ2xlVG9sZXJhbmNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2VuZXJhdGVTdHJhaWdodFN0YWlyU2hhcGUoc2VnbWVudCwgdGVtcCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXNMZWZ0QXJjID0gZW5kQW5nbGUgPiBNYXRoLlBJO1xuICAgICAgICBpZiAoaXNMZWZ0QXJjKSB7XG4gICAgICAgICAgICBzZWdtZW50LmNpcmN1bGFyU2lkZSA9IENpcmN1bGFyU2lkZS5MZWZ0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2VnbWVudC5jaXJjdWxhclNpZGUgPSBDaXJjdWxhclNpZGUuUmlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZW5kQ29tcGxlbWVudGFyeUFuZ2xlID0gaXNMZWZ0QXJjID8gTWF0aC5hYnMoZW5kQW5nbGUgLSBNYXRoLlBJIC8gMiAtIE1hdGguUEkpIDogTWF0aC5hYnMoZW5kQW5nbGUgLSBNYXRoLlBJIC8gMik7XG4gICAgICAgIGNvbnN0IGhhbGZDaG9yZCA9IHN0YXJ0RW5kRGlzdGFuY2UgLyAyO1xuICAgICAgICBjb25zdCByYWRpdXMgPSBoYWxmQ2hvcmQgLyBNYXRoLmNvcyhlbmRDb21wbGVtZW50YXJ5QW5nbGUpO1xuICAgICAgICBjb25zdCBpbm5lclJhZGl1cyA9IHJhZGl1cyAtIG1heFdpZHRoIC8gMjtcbiAgICAgICAgaWYgKHJhZGl1cyA8IG1heFdpZHRoIC8gMiAqIDEuMiB8fCBpbm5lclJhZGl1cyA8IGhvcml6b250YWxTdGVwIC8gMiAvIDAuOCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGhvcml6b250YWxTdGVwQW5nbGUgPSBNYXRoLmFzaW4oaG9yaXpvbnRhbFN0ZXAgLyAyIC8gaW5uZXJSYWRpdXMpICogMjtcbiAgICAgICAgY29uc3QgY2lyY2xlTm9ybWFsID0gaXNMZWZ0QXJjID8gRGlyZWN0aW9uWiA6IERpcmVjdGlvbloucmV2ZXJzZWQoKTtcbiAgICAgICAgY29uc3QgY2lyY2xlQ2VudGVyID0gc3RhcnQuYWRkZWQodGFuZ2VudExlZnREaXIubXVsdGlwbGllZChpc0xlZnRBcmMgPyByYWRpdXMgOiAtcmFkaXVzKSk7XG4gICAgICAgIC8vIGNvbnN0IGNpcmNsZSA9IEdlb21MaWIuY3JlYXRlQ2lyY2xlM2RCeUNlbnRlck5vcm1hbFJhZGl1cyhjaXJjbGVDZW50ZXIsIGNpcmNsZU5vcm1hbCwgcmFkaXVzKTtcbiAgICAgICAgY29uc3QgYXJjID0gR2VvbUxpYi5jcmVhdGVBcmMzZEJ5Q2VudGVyTm9ybWFsUmFkaXVzKGNpcmNsZUNlbnRlciwgY2lyY2xlTm9ybWFsLCByYWRpdXMsIHN0YXJ0LCBlbmQpO1xuICAgICAgICBjb25zdCBhcmNBbmdsZSA9IGFyYy5hcmNBbmdsZTtcbiAgICAgICAgY29uc3Qgc3RlcENvdW50ID0gTWF0aC5jZWlsKGFyY0FuZ2xlIC8gaG9yaXpvbnRhbFN0ZXBBbmdsZSk7XG4gICAgICAgIGNvbnN0IGxhc3RIb3Jpem9udGFsQW5nbGUgPSBhcmNBbmdsZSAtIGhvcml6b250YWxTdGVwQW5nbGUgKiAoc3RlcENvdW50IC0gMSk7XG4gICAgICAgIGNvbnN0IHZhbGlkU3RlcENvdW50ID0gKGxhc3RIb3Jpem9udGFsQW5nbGUgPT09IDAgfHwgbGFzdEhvcml6b250YWxBbmdsZSA+IEFuZ2xlVG9sZXJhbmNlKSA/IHN0ZXBDb3VudCA6IHN0ZXBDb3VudCAtIDE7XG4gICAgICAgIGlmIChob3Jpem9udGFsU3RlcEFuZ2xlID49IGFyY0FuZ2xlIHx8IGhvcml6b250YWxTdGVwQW5nbGUgPj0gTWF0aC5QSSAvIDIgfHwgdmFsaWRTdGVwQ291bnQgPj0gU3RlcENvdW50TGltaXQgfHwgdmFsaWRTdGVwQ291bnQgPCAxKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFtdO1xuICAgICAgICBzdGFpclNoYXBlLnRlbXBMaW5lcyA9IFtdO1xuICAgICAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXTtcbiAgICAgICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtdO1xuICAgICAgICBjb3JuZXJTaGFwZS52ZXJ0aWNlcyA9IFtdO1xuICAgICAgICBjb3JuZXJTaGFwZS50ZW1wTGluZXMgPSBbXTtcbiAgICAgICAgY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzID0gW107XG4gICAgICAgIGNvcm5lck1vbGRTaGFwZS50ZW1wTGluZXMgPSBbXTtcbiAgICAgICAgY29uc3QgeyB2ZXJ0aWNlcywgdGVtcExpbmVzIH0gPSBzdGFpclNoYXBlO1xuICAgICAgICBjb25zdCB7IHZlcnRpY2VzOiBtb2xkVmVydGljZXMsIHRlbXBMaW5lczogbW9sZFRlbXBMaW5lcyB9ID0gbW9sZFNoYXBlO1xuICAgICAgICAvLyBjb25zdCBjZW50ZXJIb3Jpem9udGFsU3RlcCA9IGhvcml6b250YWxTdGVwIC8gaW5uZXJSYWRpdXMgKiByYWRpdXM7XG4gICAgICAgIGNvbnN0IHN0ZXBIZWlnaHQgPSB1cHdhcmQgPyB2ZXJ0aWNhbFN0ZXAgOiAtdmVydGljYWxTdGVwO1xuICAgICAgICBzZWdtZW50LmVuZEhlaWdodCA9IHNlZ21lbnQuc3RhcnRIZWlnaHQgKyB2YWxpZFN0ZXBDb3VudCAqIHN0ZXBIZWlnaHQ7XG4gICAgICAgIHN0YWlyU2hhcGUuc3RlcENvdW50ID0gdmFsaWRTdGVwQ291bnQ7XG4gICAgICAgIG1vbGRTaGFwZS5zdGVwQ291bnQgPSB2YWxpZFN0ZXBDb3VudDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3ZhbGlkU3RlcENvdW50OiAgICcsdmFsaWRTdGVwQ291bnQpO1xuICAgICAgICBjb25zdCBsZWZ0UHQgPSBzdGFydC5hZGRlZCh0YW5nZW50TGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSk7XG4gICAgICAgIGNvbnN0IHJpZ2h0UHQgPSBzdGFydC5hZGRlZCh0YW5nZW50TGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpO1xuICAgICAgICBjb25zdCBzdGFydFJhZGl1c0RpciA9IGlzTGVmdEFyYyA/IHRhbmdlbnRMZWZ0RGlyLnJldmVyc2VkKCkgOiB0YW5nZW50TGVmdERpcjtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGVwQ291bnQgLSAxOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGN1clJvdGF0ZU1hdHJpeCA9IEdlb21MaWIuY3JlYXRlUm90YXRlTWF0cml4NChob3Jpem9udGFsU3RlcEFuZ2xlICogaSwgY2lyY2xlTm9ybWFsLCBkdW1teVBvaW50M2QpO1xuICAgICAgICAgICAgY29uc3QgY3VyUmFkaXVzRGlyID0gc3RhcnRSYWRpdXNEaXIuYXBwbGllZE1hdHJpeDQoY3VyUm90YXRlTWF0cml4KTtcbiAgICAgICAgICAgIGNvbnN0IGN1ckhhbGZXaWR0aCA9IChzdGFydFdpZHRoICsgKGVuZFdpZHRoIC0gc3RhcnRXaWR0aCkgKiAoaSAqIGhvcml6b250YWxTdGVwQW5nbGUpIC8gYXJjQW5nbGUpIC8gMiAqIChpc0xlZnRBcmMgPyAtMSA6IDEpO1xuICAgICAgICAgICAgY29uc3QgY3VyTGVmdE1vbGRQdCA9IGNpcmNsZUNlbnRlci5hZGRlZChjdXJSYWRpdXNEaXIubXVsdGlwbGllZChyYWRpdXMgKyBjdXJIYWxmV2lkdGgpKTtcbiAgICAgICAgICAgIGNvbnN0IGN1clJpZ2h0TW9sZFB0ID0gY2lyY2xlQ2VudGVyLmFkZGVkKGN1clJhZGl1c0Rpci5tdWx0aXBsaWVkKHJhZGl1cyAtIGN1ckhhbGZXaWR0aCkpO1xuICAgICAgICAgICAgY29uc3QgY3VyTGVmdFB0ID0gY3VyTGVmdE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBpICogc3RlcEhlaWdodCkpO1xuICAgICAgICAgICAgY29uc3QgY3VyUmlnaHRQdCA9IGN1clJpZ2h0TW9sZFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIGkgKiBzdGVwSGVpZ2h0KSk7XG4gICAgICAgICAgICBtb2xkVmVydGljZXMucHVzaChjdXJMZWZ0TW9sZFB0LCBjdXJSaWdodE1vbGRQdCk7XG4gICAgICAgICAgICBtb2xkVGVtcExpbmVzLnB1c2goWzIgKiBpLCAxICsgMiAqIGldLCBbMiAqIGksIDIgKyAyICogaV0sIFsxICsgMiAqIGksIDMgKyAyICogaV0pO1xuICAgICAgICAgICAgdmVydGljZXMucHVzaChjdXJMZWZ0UHQsIGN1clJpZ2h0UHQpO1xuICAgICAgICAgICAgY29uc3QgbmV4dFJvdGF0ZU1hdHJpeCA9IEdlb21MaWIuY3JlYXRlUm90YXRlTWF0cml4NChob3Jpem9udGFsU3RlcEFuZ2xlICogKGkgKyAxKSwgY2lyY2xlTm9ybWFsLCBkdW1teVBvaW50M2QpO1xuICAgICAgICAgICAgY29uc3QgbmV4dFJhZGl1c0RpciA9IHN0YXJ0UmFkaXVzRGlyLmFwcGxpZWRNYXRyaXg0KG5leHRSb3RhdGVNYXRyaXgpO1xuICAgICAgICAgICAgY29uc3QgbmV4dEhhbGZXaWR0aCA9IChzdGFydFdpZHRoICsgKGVuZFdpZHRoIC0gc3RhcnRXaWR0aCkgKiAoKGkgKyAxKSAqIGhvcml6b250YWxTdGVwQW5nbGUpIC8gYXJjQW5nbGUpIC8gMiAqIChpc0xlZnRBcmMgPyAtMSA6IDEpO1xuICAgICAgICAgICAgY29uc3QgbmV4dExlZnRNb2xkUHQgPSBjaXJjbGVDZW50ZXIuYWRkZWQobmV4dFJhZGl1c0Rpci5tdWx0aXBsaWVkKHJhZGl1cyArIG5leHRIYWxmV2lkdGgpKTtcbiAgICAgICAgICAgIGNvbnN0IG5leHRSaWdodE1vbGRQdCA9IGNpcmNsZUNlbnRlci5hZGRlZChuZXh0UmFkaXVzRGlyLm11bHRpcGxpZWQocmFkaXVzIC0gbmV4dEhhbGZXaWR0aCkpO1xuICAgICAgICAgICAgY29uc3QgbmV4dExlZnRQdCA9IG5leHRMZWZ0TW9sZFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIGkgKiBzdGVwSGVpZ2h0KSk7XG4gICAgICAgICAgICBjb25zdCBuZXh0UmlnaHRQdCA9IG5leHRSaWdodE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBpICogc3RlcEhlaWdodCkpO1xuICAgICAgICAgICAgaWYgKHVwd2FyZCkge1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2goY3VyTGVmdFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksIGN1clJpZ2h0UHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKG5leHRMZWZ0UHQsIG5leHRSaWdodFB0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzQgKiBpLCAxICsgNCAqIGldLCBbNCAqIGksIDIgKyA0ICogaV0sIFsxICsgNCAqIGksIDMgKyA0ICogaV0sIFsyICsgNCAqIGksIDMgKyA0ICogaV0sIFsyICsgNCAqIGksIDQgKyA0ICogaV0sIFszICsgNCAqIGksIDUgKyA0ICogaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGkgPT09IHN0ZXBDb3VudCAtIDIpIHtcbiAgICAgICAgICAgICAgICBtb2xkVmVydGljZXMucHVzaChuZXh0TGVmdE1vbGRQdCwgbmV4dFJpZ2h0TW9sZFB0KTtcbiAgICAgICAgICAgICAgICBtb2xkVGVtcExpbmVzLnB1c2goWzIgKiAoc3RlcENvdW50IC0gMSksIDEgKyAyICogKHN0ZXBDb3VudCAtIDEpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaSA9PT0gc3RlcENvdW50IC0gMikge1xuICAgICAgICAgICAgICAgIC8vIGlmICh1cHdhcmQpIHtcbiAgICAgICAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKG5leHRMZWZ0UHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSwgbmV4dFJpZ2h0UHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSk7XG4gICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzQgKiAoc3RlcENvdW50IC0gMSksIDEgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxhc3RSb3RhdGVNYXRyaXggPSBHZW9tTGliLmNyZWF0ZVJvdGF0ZU1hdHJpeDQoYXJjQW5nbGUsIGNpcmNsZU5vcm1hbCwgZHVtbXlQb2ludDNkKTtcbiAgICAgICAgY29uc3QgbGFzdFJhZGl1c0RpciA9IHN0YXJ0UmFkaXVzRGlyLmFwcGxpZWRNYXRyaXg0KGxhc3RSb3RhdGVNYXRyaXgpO1xuICAgICAgICBjb25zdCBsYXN0SGFsZldpZHRoID0gaXNMZWZ0QXJjID8gLWVuZFdpZHRoIC8gMiA6IGVuZFdpZHRoIC8gMjtcbiAgICAgICAgY29uc3QgbGFzdExlZnRNb2xkUHQgPSBjaXJjbGVDZW50ZXIuYWRkZWQobGFzdFJhZGl1c0Rpci5tdWx0aXBsaWVkKHJhZGl1cyArIGxhc3RIYWxmV2lkdGgpKTtcbiAgICAgICAgY29uc3QgbGFzdFJpZ2h0TW9sZFB0ID0gY2lyY2xlQ2VudGVyLmFkZGVkKGxhc3RSYWRpdXNEaXIubXVsdGlwbGllZChyYWRpdXMgLSBsYXN0SGFsZldpZHRoKSk7XG4gICAgICAgIGNvbnN0IGxhc3RMZWZ0UHQgPSBsYXN0TGVmdE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBzdGVwQ291bnQgKiBzdGVwSGVpZ2h0KSk7XG4gICAgICAgIGNvbnN0IGxhc3RSaWdodFB0ID0gbGFzdFJpZ2h0TW9sZFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIHN0ZXBDb3VudCAqIHN0ZXBIZWlnaHQpKTtcbiAgICAgICAgaWYgKHN0ZXBDb3VudCA9PT0gMSkge1xuICAgICAgICAgICAgbW9sZFZlcnRpY2VzLnB1c2gobGVmdFB0LCByaWdodFB0KTtcbiAgICAgICAgICAgIG1vbGRUZW1wTGluZXMucHVzaChbMiAqIChzdGVwQ291bnQgLSAxKSwgMSArIDIgKiAoc3RlcENvdW50IC0gMSldKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGFzdEhvcml6b250YWxBbmdsZSA+PSBBbmdsZVRvbGVyYW5jZSB8fCBsYXN0SG9yaXpvbnRhbEFuZ2xlID09PSAwKSB7XG4gICAgICAgICAgICBtb2xkVmVydGljZXMucHVzaChsYXN0TGVmdE1vbGRQdCwgbGFzdFJpZ2h0TW9sZFB0KTtcbiAgICAgICAgICAgIG1vbGRUZW1wTGluZXMucHVzaChbMiAqIChzdGVwQ291bnQgLSAxKSwgMiArIDIgKiAoc3RlcENvdW50IC0gMSldLCBbMSArIDIgKiAoc3RlcENvdW50IC0gMSksIDMgKyAyICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKiBzdGVwQ291bnQsIDEgKyAyICogc3RlcENvdW50XSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVwd2FyZCkge1xuICAgICAgICAgICAgaWYgKHN0ZXBDb3VudCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2gobGVmdFB0LCByaWdodFB0KTtcbiAgICAgICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbNCAqIChzdGVwQ291bnQgLSAxKSwgMSArIDQgKiAoc3RlcENvdW50IC0gMSldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGFzdEhvcml6b250YWxBbmdsZSA+PSBBbmdsZVRvbGVyYW5jZSB8fCBsYXN0SG9yaXpvbnRhbEFuZ2xlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQodmVydGljYWxTdGVwKSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCh2ZXJ0aWNhbFN0ZXApKSk7XG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaChsYXN0TGVmdFB0LCBsYXN0UmlnaHRQdCk7XG4gICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzQgKiAoc3RlcENvdW50IC0gMSksIDIgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzEgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCAzICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsyICsgNCAqIChzdGVwQ291bnQgLSAxKSwgMyArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMiArIDQgKiAoc3RlcENvdW50IC0gMSksIDQgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzMgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCA1ICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFs0ICogc3RlcENvdW50LCAxICsgNCAqIHN0ZXBDb3VudF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChzdGVwQ291bnQgPT09IDEpIHtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKGxlZnRQdCwgcmlnaHRQdCk7XG4gICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzQgKiAoc3RlcENvdW50IC0gMSksIDEgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxhc3RIb3Jpem9udGFsQW5nbGUgPj0gQW5nbGVUb2xlcmFuY2UgfHwgbGFzdEhvcml6b250YWxBbmdsZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2gobGFzdExlZnRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQpKSwgbGFzdFJpZ2h0UHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0KSkpO1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2gobGFzdExlZnRQdCwgbGFzdFJpZ2h0UHQpO1xuICAgICAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFs0ICogKHN0ZXBDb3VudCAtIDEpLCAyICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsxICsgNCAqIChzdGVwQ291bnQgLSAxKSwgMyArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMiArIDQgKiAoc3RlcENvdW50IC0gMSksIDMgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCA0ICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFszICsgNCAqIChzdGVwQ291bnQgLSAxKSwgNSArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbNCAqIHN0ZXBDb3VudCwgMSArIDQgKiBzdGVwQ291bnRdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0ZXBDb3VudCA+IDEpIHtcbiAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIDIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGFjdHVhbExhc3RTdGVwTGVuZ3RoID0gbGFzdEhvcml6b250YWxBbmdsZSA8IEFuZ2xlVG9sZXJhbmNlID8gaG9yaXpvbnRhbFN0ZXBBbmdsZSA6IGxhc3RIb3Jpem9udGFsQW5nbGU7XG4gICAgICAgICAgICBpZiAodXB3YXJkKSB7XG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQgLSAoMSAtIGFjdHVhbExhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXBBbmdsZSkgKiBzdGVwSGVpZ2h0KSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCgtc3RlcEhlaWdodCAtICgxIC0gYWN0dWFsTGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcEFuZ2xlKSAqIHN0ZXBIZWlnaHQpKSk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IHN0ZXBDb3VudCAtIChsYXN0SG9yaXpvbnRhbEFuZ2xlID49IEFuZ2xlVG9sZXJhbmNlID8gMSA6IDIpOyBqID4gMDsgai0tKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZJbmQgPSBqICogNDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSAyLCAyICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsxICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAwXSwgWzMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAxXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2SW5kXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQpKSwgdmVydGljZXNbdkluZCArIDFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCgtc3RlcEhlaWdodCkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyB2ZXJ0aWNlcy5wdXNoKFxuICAgICAgICAgICAgICAgIC8vICAgICB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSA2XS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLFxuICAgICAgICAgICAgICAgIC8vICAgICB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSA1XS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLFxuICAgICAgICAgICAgICAgIC8vICk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IHN0ZXBDb3VudCAtIChsYXN0SG9yaXpvbnRhbEFuZ2xlID49IEFuZ2xlVG9sZXJhbmNlID8gMSA6IDIpOyBqID49IDA7IGotLSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2SW5kID0gaiAqIDQ7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbdmVydGljZXMubGVuZ3RoIC0gMiwgMiArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMSArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaiA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMF0sIFszICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdkluZF0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSwgdmVydGljZXNbdkluZCArIDFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIDIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMiArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDBdLCBbMyArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh1cHdhcmQpIHtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCgtc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzWzBdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksIHZlcnRpY2VzWzFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChiYXNlQ29tcG9uZW50KSB7XG4gICAgICAgICAgICBjb25zdCBiYXNlTGluZVNlZzNkID0gYmFzZUNvbXBvbmVudC5saW5lM2Q7XG4gICAgICAgICAgICBjb25zdCBiYXNlTGluZURpciA9IGJhc2VMaW5lU2VnM2QuZW5kLnN1YnRyYWN0ZWQoYmFzZUxpbmVTZWczZC5zdGFydCkubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgY29uc3QgYW5nbGUgPSBjaXJjbGVUYW5nZW50LmFuZ2xlKGJhc2VMaW5lRGlyKTtcbiAgICAgICAgICAgIGlmIChhbmdsZSA8IE1hdGguUEkgLyAyKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29ybmVyQ29ubmVjdGlvblBvaW50MSA9IHN0YXJ0LmFkZGVkKGJhc2VMaW5lRGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyICogTWF0aC5zaWduKGFuZ2xlKSkpO1xuICAgICAgICAgICAgICAgIGNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtzdGFydCwgc3RhcnQuYWRkZWQodGFuZ2VudExlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSwgY29ybmVyQ29ubmVjdGlvblBvaW50MV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb3JuZXJDb25uZWN0aW9uUG9pbnQyID0gc3RhcnQuYWRkZWQoYmFzZUxpbmVEaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMiAqIE1hdGguc2lnbihhbmdsZSkpKTtcbiAgICAgICAgICAgICAgICBjb3JuZXJNb2xkU2hhcGUudmVydGljZXMgPSBbc3RhcnQsIGNvcm5lckNvbm5lY3Rpb25Qb2ludDIsIHN0YXJ0LmFkZGVkKHRhbmdlbnRMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb3JuZXJNb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgMF1dO1xuICAgICAgICAgICAgY29ybmVyU2hhcGUudmVydGljZXMgPSBbXG4gICAgICAgICAgICAgICAgLi4uY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzLm1hcCh2ID0+IHYuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkpLFxuICAgICAgICAgICAgICAgIC4uLmNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAodiA9PiB2LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCAtIHBsYXRmb3JtVGhpY2tuZXNzKSkpLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgY29ybmVyU2hhcGUudGVtcExpbmVzID0gW1xuICAgICAgICAgICAgICAgICAgICBbMCwgMV0sIFsxLCAyXSwgWzIsIDBdLFxuICAgICAgICAgICAgICAgICAgICBbMywgNF0sIFs0LCA1XSwgWzUsIDNdLFxuICAgICAgICAgICAgICAgICAgICBbMCwgM10sIFsxLCA0XSwgWzIsIDVdLFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBnZW5lcmF0ZVN0cmFpZ2h0U3RhaXJTaGFwZShzZWdtZW50LCB0ZW1wID0gdHJ1ZSkge1xuICAgIGNvbnN0IHsgc3RhcnQsIGVuZCwgc3RhaXJTaGFwZSwgbW9sZFNoYXBlLCBjb3JuZXJTaGFwZSwgY29ybmVyTW9sZFNoYXBlLCBzdGFydEhlaWdodCwgYmFzZUNvbXBvbmVudCwgcGFyYW0gfSA9IHNlZ21lbnQ7XG4gICAgY29uc3QgeyBzdGFydFdpZHRoLCBlbmRXaWR0aCwgaG9yaXpvbnRhbFN0ZXAsIHZlcnRpY2FsU3RlcCwgdXB3YXJkLCBwbGF0Zm9ybVRoaWNrbmVzcyB9ID0gcGFyYW07XG4gICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFtdO1xuICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW107XG4gICAgbW9sZFNoYXBlLnZlcnRpY2VzID0gW107XG4gICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtdO1xuICAgIGNvcm5lclNoYXBlLnZlcnRpY2VzID0gW107XG4gICAgY29ybmVyU2hhcGUudGVtcExpbmVzID0gW107XG4gICAgY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzID0gW107XG4gICAgY29ybmVyTW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtdO1xuICAgIGNvbnN0IHsgdmVydGljZXMsIHRlbXBMaW5lcyB9ID0gc3RhaXJTaGFwZTtcbiAgICBjb25zdCB7IHZlcnRpY2VzOiBtb2xkVmVydGljZXMsIHRlbXBMaW5lczogbW9sZFRlbXBMaW5lcyB9ID0gbW9sZFNoYXBlO1xuICAgIGxldCBob3Jpem9udGFsRnJvbnREaXIgPSBlbmQuc3VidHJhY3RlZChzdGFydCkubm9ybWFsaXplZCgpO1xuICAgIGxldCBob3Jpem9udGFsRGlzdGFuY2UgPSBzdGFydC5kaXN0YW5jZVRvKGVuZCk7XG4gICAgbGV0IGhvcml6b250YWxMZWZ0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhob3Jpem9udGFsRnJvbnREaXIpO1xuICAgIGNvbnN0IHN0ZXBGbG9hdENvdW50ID0gaG9yaXpvbnRhbERpc3RhbmNlIC8gaG9yaXpvbnRhbFN0ZXA7XG4gICAgY29uc3Qgc3RlcENvdW50ID0gTWF0aC5jZWlsKHN0ZXBGbG9hdENvdW50KTtcbiAgICBjb25zdCBsYXN0U3RlcExlbmd0aCA9IGhvcml6b250YWxEaXN0YW5jZSAtIChzdGVwQ291bnQgLSAxKSAqIGhvcml6b250YWxTdGVwO1xuICAgIGNvbnN0IHZhbGlkU3RlcENvdW50ID0gKGxhc3RTdGVwTGVuZ3RoID09PSAwIHx8IGxhc3RTdGVwTGVuZ3RoID4gTGVuZ3RoVG9sZXJhbmNlKSA/IHN0ZXBDb3VudCA6IHN0ZXBDb3VudCAtIDE7XG4gICAgaWYgKHZhbGlkU3RlcENvdW50IDwgMSB8fCB2YWxpZFN0ZXBDb3VudCA+PSBTdGVwQ291bnRMaW1pdCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChiYXNlQ29tcG9uZW50KSB7XG4gICAgICAgIGNvbnN0IGJhc2VMaW5lU2VnM2QgPSBiYXNlQ29tcG9uZW50LmxpbmUzZDtcbiAgICAgICAgY29uc3QgYmFzZUxpbmVEaXIgPSBiYXNlTGluZVNlZzNkLmVuZC5zdWJ0cmFjdGVkKGJhc2VMaW5lU2VnM2Quc3RhcnQpLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgY29uc3QgYW5nbGUgPSBob3Jpem9udGFsRnJvbnREaXIuYW5nbGUoYmFzZUxpbmVEaXIpO1xuICAgICAgICBjb25zdCBkZWx0YUFuZ2xlID0gTWF0aC5hYnMoYW5nbGUgLSBNYXRoLlBJIC8gMik7XG4gICAgICAgIGlmIChkZWx0YUFuZ2xlIDw9IERpcmVjdGlvbkFuZ2xlVG9sZXJhbmNlKSB7XG4gICAgICAgICAgICBzZWdtZW50LmNvbXBvbmVudERpcmVjdGlvblR5cGUgPSBDb21wb25lbnREaXJlY3Rpb25UeXBlLkZyb250O1xuICAgICAgICAgICAgaG9yaXpvbnRhbEZyb250RGlyID0gYmFzZUxpbmVEaXIuY3Jvc3MoaG9yaXpvbnRhbEZyb250RGlyLmNyb3NzKGJhc2VMaW5lRGlyKSkubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgaG9yaXpvbnRhbERpc3RhbmNlID0gaG9yaXpvbnRhbERpc3RhbmNlICogTWF0aC5jb3MoZGVsdGFBbmdsZSk7XG4gICAgICAgICAgICBob3Jpem9udGFsTGVmdERpciA9IERpcmVjdGlvblouY3Jvc3MoaG9yaXpvbnRhbEZyb250RGlyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChhbmdsZSA8IE1hdGguUEkgLyAyKSB7XG4gICAgICAgICAgICAgICAgc2VnbWVudC5jb21wb25lbnREaXJlY3Rpb25UeXBlID0gQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5MZWZ0O1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvcm5lckNvbm5lY3Rpb25Qb2ludDEgPSBzdGFydC5hZGRlZChiYXNlTGluZURpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMiAqIE1hdGguc2lnbihhbmdsZSkpKTtcbiAgICAgICAgICAgICAgICBjb3JuZXJNb2xkU2hhcGUudmVydGljZXMgPSBbc3RhcnQsIHN0YXJ0LmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSksIGNvcm5lckNvbm5lY3Rpb25Qb2ludDFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VnbWVudC5jb21wb25lbnREaXJlY3Rpb25UeXBlID0gQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5SaWdodDtcbiAgICAgICAgICAgICAgICBjb25zdCBjb3JuZXJDb25uZWN0aW9uUG9pbnQyID0gc3RhcnQuYWRkZWQoYmFzZUxpbmVEaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMiAqIE1hdGguc2lnbihhbmdsZSkpKTtcbiAgICAgICAgICAgICAgICBjb3JuZXJNb2xkU2hhcGUudmVydGljZXMgPSBbc3RhcnQsIGNvcm5lckNvbm5lY3Rpb25Qb2ludDIsIHN0YXJ0LmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb3JuZXJNb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgMF1dO1xuICAgICAgICAgICAgY29ybmVyU2hhcGUudmVydGljZXMgPSBbXG4gICAgICAgICAgICAgICAgLi4uY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzLm1hcCh2ID0+IHYuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkpLFxuICAgICAgICAgICAgICAgIC4uLmNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAodiA9PiB2LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCAtIHBsYXRmb3JtVGhpY2tuZXNzKSkpLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgY29ybmVyU2hhcGUudGVtcExpbmVzID0gW1xuICAgICAgICAgICAgICAgICAgICBbMCwgMV0sIFsxLCAyXSwgWzIsIDBdLFxuICAgICAgICAgICAgICAgICAgICBbMywgNF0sIFs0LCA1XSwgWzUsIDNdLFxuICAgICAgICAgICAgICAgICAgICBbMCwgM10sIFsxLCA0XSwgWzIsIDVdLFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgc3RlcEhlaWdodCA9IHVwd2FyZCA/IHZlcnRpY2FsU3RlcCA6IC12ZXJ0aWNhbFN0ZXA7XG4gICAgc2VnbWVudC5lbmRIZWlnaHQgPSBzZWdtZW50LnN0YXJ0SGVpZ2h0ICsgdmFsaWRTdGVwQ291bnQgKiBzdGVwSGVpZ2h0O1xuICAgIHN0YWlyU2hhcGUuc3RlcENvdW50ID0gdmFsaWRTdGVwQ291bnQ7XG4gICAgbW9sZFNoYXBlLnN0ZXBDb3VudCA9IHZhbGlkU3RlcENvdW50O1xuICAgIGNvbnN0IGxlZnRQdCA9IHN0YXJ0LmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKTtcbiAgICBjb25zdCByaWdodFB0ID0gc3RhcnQuYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKTtcbiAgICBjb25zdCB3aWR0aERlbHRhID0gKGVuZFdpZHRoIC0gc3RhcnRXaWR0aCkgLyAyIC8gKHN0ZXBGbG9hdENvdW50KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ZXBDb3VudCAtIDE7IGkrKykge1xuICAgICAgICBjb25zdCBjdXJMZWZ0TW9sZFB0ID0gbGVmdFB0LmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGkgKiBob3Jpem9udGFsU3RlcCkpLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoaSAqIHdpZHRoRGVsdGEpKTtcbiAgICAgICAgY29uc3QgY3VyUmlnaHRNb2xkUHQgPSByaWdodFB0LmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGkgKiBob3Jpem9udGFsU3RlcCkpLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoLWkgKiB3aWR0aERlbHRhKSk7XG4gICAgICAgIGNvbnN0IGN1ckxlZnRQdCA9IGN1ckxlZnRNb2xkUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0ICsgaSAqIHN0ZXBIZWlnaHQpKTtcbiAgICAgICAgY29uc3QgY3VyUmlnaHRQdCA9IGN1clJpZ2h0TW9sZFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIGkgKiBzdGVwSGVpZ2h0KSk7XG4gICAgICAgIG1vbGRWZXJ0aWNlcy5wdXNoKGN1ckxlZnRNb2xkUHQsIGN1clJpZ2h0TW9sZFB0KTtcbiAgICAgICAgbW9sZFRlbXBMaW5lcy5wdXNoKFsyICogaSwgMSArIDIgKiBpXSwgWzIgKiBpLCAyICsgMiAqIGldLCBbMSArIDIgKiBpLCAzICsgMiAqIGldKTtcbiAgICAgICAgdmVydGljZXMucHVzaChjdXJMZWZ0UHQsIGN1clJpZ2h0UHQpO1xuICAgICAgICBpZiAodXB3YXJkKSB7XG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKGN1ckxlZnRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLCBjdXJSaWdodFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmVydGljZXMucHVzaChjdXJMZWZ0UHQuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaG9yaXpvbnRhbFN0ZXApKSwgY3VyUmlnaHRQdC5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzQgKiBpLCAxICsgNCAqIGldLCBbNCAqIGksIDIgKyA0ICogaV0sIFsxICsgNCAqIGksIDMgKyA0ICogaV0sIFsyICsgNCAqIGksIDMgKyA0ICogaV0sIFsyICsgNCAqIGksIDQgKyA0ICogaV0sIFszICsgNCAqIGksIDUgKyA0ICogaV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIG1vbGRWZXJ0aWNlcy5wdXNoKHN0ZXBDb3VudCA+IDEgPyBtb2xkVmVydGljZXNbbW9sZFZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSkgOiBsZWZ0UHQsIHN0ZXBDb3VudCA+IDEgPyBtb2xkVmVydGljZXNbbW9sZFZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSkgOiByaWdodFB0KTtcbiAgICBtb2xkVGVtcExpbmVzLnB1c2goWzIgKiAoc3RlcENvdW50IC0gMSksIDEgKyAyICogKHN0ZXBDb3VudCAtIDEpXSk7XG4gICAgaWYgKGxhc3RTdGVwTGVuZ3RoID4gTGVuZ3RoVG9sZXJhbmNlIHx8IGxhc3RTdGVwTGVuZ3RoID09PSAwKSB7XG4gICAgICAgIG1vbGRWZXJ0aWNlcy5wdXNoKG1vbGRWZXJ0aWNlc1ttb2xkVmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwICogd2lkdGhEZWx0YSkpLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoKSksIG1vbGRWZXJ0aWNlc1ttb2xkVmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZCgtbGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcCAqIHdpZHRoRGVsdGEpKS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCkpKTtcbiAgICAgICAgbW9sZFRlbXBMaW5lcy5wdXNoKFsyICogKHN0ZXBDb3VudCAtIDEpLCAyICsgMiAqIChzdGVwQ291bnQgLSAxKV0sIFsxICsgMiAqIChzdGVwQ291bnQgLSAxKSwgMyArIDIgKiAoc3RlcENvdW50IC0gMSldLCBbMiAqIHN0ZXBDb3VudCwgMSArIDIgKiBzdGVwQ291bnRdKTtcbiAgICB9XG4gICAgaWYgKHVwd2FyZCkge1xuICAgICAgICB2ZXJ0aWNlcy5wdXNoKHN0ZXBDb3VudCA+IDEgPyB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpIDogbGVmdFB0LCBzdGVwQ291bnQgPiAxID8gdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaG9yaXpvbnRhbFN0ZXApKSA6IHJpZ2h0UHQpO1xuICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzQgKiAoc3RlcENvdW50IC0gMSksIDEgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxhc3RTdGVwTGVuZ3RoID4gTGVuZ3RoVG9sZXJhbmNlIHx8IGxhc3RTdGVwTGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXAgKiB3aWR0aERlbHRhKSkuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGgpKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZCgtbGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcCAqIHdpZHRoRGVsdGEpKS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCkpKTtcbiAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goXG4gICAgICAgICAgICAgICAgLy8gWzQgKiBzdGVwQ291bnQsIDEgKyA0ICogc3RlcENvdW50XSxcbiAgICAgICAgICAgICAgICBbNCAqIChzdGVwQ291bnQgLSAxKSwgMiArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMSArIDQgKiAoc3RlcENvdW50IC0gMSksIDMgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCAzICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsyICsgNCAqIChzdGVwQ291bnQgLSAxKSwgNCArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMyArIDQgKiAoc3RlcENvdW50IC0gMSksIDUgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzQgKiBzdGVwQ291bnQsIDEgKyA0ICogc3RlcENvdW50XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZlcnRpY2VzLnB1c2goc3RlcENvdW50ID4gMSA/IHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkgOiBsZWZ0UHQsIHN0ZXBDb3VudCA+IDEgPyB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpIDogcmlnaHRQdCk7XG4gICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbNCAqIChzdGVwQ291bnQgLSAxKSwgMSArIDQgKiAoc3RlcENvdW50IC0gMSldKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGFzdFN0ZXBMZW5ndGggPiBMZW5ndGhUb2xlcmFuY2UgfHwgbGFzdFN0ZXBMZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwICogd2lkdGhEZWx0YSkpLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoKSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoLWxhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXAgKiB3aWR0aERlbHRhKSkuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGgpKSk7XG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xuICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChcbiAgICAgICAgICAgICAgICAvLyBbNCAqIChzdGVwQ291bnQgLSAxKSwgMSArIDQgKiAoc3RlcENvdW50IC0gMSldLFxuICAgICAgICAgICAgICAgIFs0ICogKHN0ZXBDb3VudCAtIDEpLCAyICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsxICsgNCAqIChzdGVwQ291bnQgLSAxKSwgMyArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMiArIDQgKiAoc3RlcENvdW50IC0gMSksIDMgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCA0ICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFszICsgNCAqIChzdGVwQ291bnQgLSAxKSwgNSArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbNCAqIHN0ZXBDb3VudCwgMSArIDQgKiBzdGVwQ291bnRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoc3RlcENvdW50ID4gMSkge1xuICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIDIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMiArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDQgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCA1ICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFt2ZXJ0aWNlcy5sZW5ndGggKyAyLCAxICsgdmVydGljZXMubGVuZ3RoICsgMl0sIFt2ZXJ0aWNlcy5sZW5ndGggKyAyLCAwXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggKyAyLCAxXSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYWN0dWFsTGFzdFN0ZXBMZW5ndGggPSBsYXN0U3RlcExlbmd0aCA8IExlbmd0aFRvbGVyYW5jZSA/IGhvcml6b250YWxTdGVwIDogbGFzdFN0ZXBMZW5ndGg7XG4gICAgICAgIGlmICh1cHdhcmQpIHtcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0IC0gKDEgLSBhY3R1YWxMYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwKSAqIHN0ZXBIZWlnaHQpKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0IC0gKDEgLSBhY3R1YWxMYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwKSAqIHN0ZXBIZWlnaHQpKSk7XG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzWzBdLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSksIHZlcnRpY2VzWzFdLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZCgtYWN0dWFsTGFzdFN0ZXBMZW5ndGgpKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoLWFjdHVhbExhc3RTdGVwTGVuZ3RoKSkpO1xuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1swXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1sxXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSAyLCAyICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsxICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMiArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAwXSwgWzMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAxXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVwd2FyZCkge1xuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQpKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0KSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1swXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1sxXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGdlbmVyYXRlUGxhdGZvcm1TaGFwZShzZWdtZW50LCB0ZW1wID0gdHJ1ZSkge1xuICAgIGNvbnN0IHsgc3RhcnQsIHN0YXJ0SGVpZ2h0LCBiYXNlQ29tcG9uZW50LCBzdGFpclNoYXBlLCBtb2xkU2hhcGUsIGNvcm5lclNoYXBlLCBjb3JuZXJNb2xkU2hhcGUsIHBhcmFtIH0gPSBzZWdtZW50O1xuICAgIGNvbnN0IHsgc3RhcnRXaWR0aCwgb2Zmc2V0V2lkdGgsIHdpdGhPZmZzZXQsIHBsYXRmb3JtVGhpY2tuZXNzLCBwbGF0Zm9ybUxlbmd0aCwgcGxhdGZvcm1MZW5ndGhMb2NrZWQsIG1vZGVsRWRpdGluZyB9ID0gcGFyYW07XG4gICAgY29uc3QgY3VyRGlyID0gc2VnbWVudC5lbmQuc3VidHJhY3RlZChzdGFydCk7XG4gICAgY29uc3QgY3VyRGlyTm9ybWFsaXplZCA9IHNlZ21lbnQuZW5kLnN1YnRyYWN0ZWQoc3RhcnQpLm5vcm1hbGl6ZWQoKTtcbiAgICBjb25zdCBjdXJMZWZ0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhjdXJEaXIpLm5vcm1hbGl6ZWQoKTtcbiAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gW107XG4gICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXTtcbiAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXTtcbiAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW107XG4gICAgY29ybmVyU2hhcGUudmVydGljZXMgPSBbXTtcbiAgICBjb3JuZXJTaGFwZS50ZW1wTGluZXMgPSBbXTtcbiAgICBjb3JuZXJNb2xkU2hhcGUudmVydGljZXMgPSBbXTtcbiAgICBjb3JuZXJNb2xkU2hhcGUudGVtcExpbmVzID0gW107XG4gICAgc2VnbWVudC5lbmQgPSBwbGF0Zm9ybUxlbmd0aExvY2tlZCA/IHNlZ21lbnQuc3RhcnQuYWRkZWQoY3VyRGlyTm9ybWFsaXplZC5tdWx0aXBsaWVkKHBsYXRmb3JtTGVuZ3RoKSkgOiBzZWdtZW50LmVuZDtcbiAgICBzZWdtZW50LmVuZEhlaWdodCA9IHN0YXJ0SGVpZ2h0O1xuICAgIGlmICghbW9kZWxFZGl0aW5nKSB7XG4gICAgICAgIHBhcmFtLndpdGhPZmZzZXQgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGJhc2VDb21wb25lbnQpIHtcbiAgICAgICAgY29uc3QgYmFzZUxpbmVTZWczZCA9IGJhc2VDb21wb25lbnQubGluZTNkO1xuICAgICAgICBjb25zdCB7IHN0YXJ0OiBiYXNlTGluZVN0YXJ0LCBlbmQ6IGJhc2VMaW5lRW5kIH0gPSBiYXNlTGluZVNlZzNkO1xuICAgICAgICBjb25zdCBiYXNlTGluZURpciA9IGJhc2VMaW5lRW5kLnN1YnRyYWN0ZWQoYmFzZUxpbmVTdGFydCkubm9ybWFsaXplZCgpO1xuICAgICAgICBjb25zdCBwcmV2RGlyTm9ybWFsaXplZCA9IGJhc2VMaW5lRGlyLmNyb3NzKERpcmVjdGlvblopLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgY29uc3QgcHJldkxlZnREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKHByZXZEaXJOb3JtYWxpemVkKS5ub3JtYWxpemVkKCk7XG4gICAgICAgIGNvbnN0IGFuZ2xlID0gY3VyRGlyLmFuZ2xlVG8ocHJldkRpck5vcm1hbGl6ZWQsIERpcmVjdGlvblopO1xuICAgICAgICBjb25zdCBmcm9udExlbmd0aCA9IHBsYXRmb3JtTGVuZ3RoTG9ja2VkID8gcGxhdGZvcm1MZW5ndGggOiBNYXRoLmFicyhjdXJEaXIuZG90KHByZXZEaXJOb3JtYWxpemVkKSk7XG4gICAgICAgIGNvbnN0IGN1ckVuZExlZnRDb3JuZXIgPSBzZWdtZW50LmVuZC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKTtcbiAgICAgICAgY29uc3QgZGlyMSA9IGN1ckVuZExlZnRDb3JuZXIuc3VidHJhY3RlZChzZWdtZW50LnN0YXJ0KTtcbiAgICAgICAgY29uc3QgYW5nbGUxID0gZGlyMS5hbmdsZShjdXJEaXIpO1xuICAgICAgICBpZiAoKGFuZ2xlID49IE1hdGguUEkgJiYgYW5nbGUgPD0gKE1hdGguUEkgKiAzIC8gMiArIGFuZ2xlMSkpIHx8IChtb2RlbEVkaXRpbmcgJiYgd2l0aE9mZnNldCAmJiBvZmZzZXRXaWR0aCA+PSAwKSkge1xuICAgICAgICAgICAgc2VnbWVudC5jb21wb25lbnREaXJlY3Rpb25UeXBlID0gQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5MZWZ0O1xuICAgICAgICAgICAgcGFyYW0ucGxhdGZvcm1MZW5ndGggPSBmcm9udExlbmd0aDtcbiAgICAgICAgICAgIGNvbnN0IGZyb250RW5kID0gc2VnbWVudC5zdGFydC5hZGRlZChwcmV2RGlyTm9ybWFsaXplZC5tdWx0aXBsaWVkKGZyb250TGVuZ3RoKSk7XG4gICAgICAgICAgICBzZWdtZW50LmVuZCA9IGZyb250RW5kO1xuICAgICAgICAgICAgY29uc3QgbGVmdExlbmd0aCA9IHdpdGhPZmZzZXQgJiYgbW9kZWxFZGl0aW5nID8gKG9mZnNldFdpZHRoICsgc3RhcnRXaWR0aCAvIDIpIDogY3VyRGlyLmRvdChwcmV2TGVmdERpcik7XG4gICAgICAgICAgICBpZiAobGVmdExlbmd0aCA+IHN0YXJ0V2lkdGggLyAyKSB7XG4gICAgICAgICAgICAgICAgcGFyYW0ud2l0aE9mZnNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcGFyYW0ub2Zmc2V0V2lkdGggPSBsZWZ0TGVuZ3RoIC0gc3RhcnRXaWR0aCAvIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB2YWxpZExlZnRMZW5ndGggPSBNYXRoLm1heChzdGFydFdpZHRoIC8gMiwgbGVmdExlbmd0aCk7XG4gICAgICAgICAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXG4gICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCh2YWxpZExlZnRMZW5ndGgpKSxcbiAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSksXG4gICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCh2YWxpZExlZnRMZW5ndGgpKSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgM10sIFszLCAwXV07XG4gICAgICAgICAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gWy4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCkpKSxcbiAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgLSBwbGF0Zm9ybVRoaWNrbmVzcykpKSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW1xuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLFxuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLm1hcChzZWcgPT4gW3NlZ1swXSArIDQsIHNlZ1sxXSArIDRdKSxcbiAgICAgICAgICAgICAgICAgICAgWzAsIDRdLCBbMSwgNV0sIFsyLCA2XSwgWzMsIDddLFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoKGFuZ2xlIDwgTWF0aC5QSSAmJiBhbmdsZSA+PSAoTWF0aC5QSSAvIDIgLSBhbmdsZTEpKSB8fCAobW9kZWxFZGl0aW5nICYmIHdpdGhPZmZzZXQgJiYgb2Zmc2V0V2lkdGggPCAwKSkge1xuICAgICAgICAgICAgc2VnbWVudC5jb21wb25lbnREaXJlY3Rpb25UeXBlID0gQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5SaWdodDtcbiAgICAgICAgICAgIHBhcmFtLnBsYXRmb3JtTGVuZ3RoID0gZnJvbnRMZW5ndGg7XG4gICAgICAgICAgICBjb25zdCByaWdodExlbmd0aCA9IHdpdGhPZmZzZXQgJiYgbW9kZWxFZGl0aW5nID8gKC1vZmZzZXRXaWR0aCArIHN0YXJ0V2lkdGggLyAyKSA6IC1jdXJEaXIuZG90KHByZXZMZWZ0RGlyKTtcbiAgICAgICAgICAgIGNvbnN0IGZyb250RW5kMSA9IHNlZ21lbnQuc3RhcnQuYWRkZWQocHJldkRpck5vcm1hbGl6ZWQubXVsdGlwbGllZChmcm9udExlbmd0aCkpO1xuICAgICAgICAgICAgc2VnbWVudC5lbmQgPSBmcm9udEVuZDE7XG4gICAgICAgICAgICBpZiAocmlnaHRMZW5ndGggPiBzdGFydFdpZHRoIC8gMikge1xuICAgICAgICAgICAgICAgIHBhcmFtLndpdGhPZmZzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHBhcmFtLm9mZnNldFdpZHRoID0gLShyaWdodExlbmd0aCAtIHN0YXJ0V2lkdGggLyAyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHZhbGlkUmlnaHRMZW5ndGggPSBNYXRoLm1heChzdGFydFdpZHRoIC8gMiwgcmlnaHRMZW5ndGgpO1xuICAgICAgICAgICAgbW9sZFNoYXBlLnZlcnRpY2VzID0gW1xuICAgICAgICAgICAgICAgIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC12YWxpZFJpZ2h0TGVuZ3RoKSksXG4gICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtdmFsaWRSaWdodExlbmd0aCkpLFxuICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgM10sIFszLCAwXV07XG4gICAgICAgICAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gWy4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCkpKSxcbiAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgLSBwbGF0Zm9ybVRoaWNrbmVzcykpKSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW1xuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLFxuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLm1hcChzZWcgPT4gW3NlZ1swXSArIDQsIHNlZ1sxXSArIDRdKSxcbiAgICAgICAgICAgICAgICAgICAgWzAsIDRdLCBbMSwgNV0sIFsyLCA2XSwgWzMsIDddLFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwYXJhbS5vZmZzZXRXaWR0aCA9IDA7XG4gICAgICAgICAgICBpZiAoYW5nbGUgPD0gRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UgfHwgYW5nbGUgPj0gKE1hdGguUEkgKiAyIC0gRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UpKSB7XG4gICAgICAgICAgICAgICAgc2VnbWVudC5jb21wb25lbnREaXJlY3Rpb25UeXBlID0gQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5Gcm9udDtcbiAgICAgICAgICAgICAgICBzZWdtZW50LmVuZCA9IHNlZ21lbnQuc3RhcnQuYWRkZWQocHJldkRpck5vcm1hbGl6ZWQubXVsdGlwbGllZChmcm9udExlbmd0aCkpO1xuICAgICAgICAgICAgICAgIHBhcmFtLnBsYXRmb3JtTGVuZ3RoID0gZnJvbnRMZW5ndGg7XG4gICAgICAgICAgICAgICAgbW9sZFNoYXBlLnZlcnRpY2VzID0gW1xuICAgICAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSksXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyICsgb2Zmc2V0V2lkdGgpKSxcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIgKyBvZmZzZXRXaWR0aCkpLFxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSksXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgM10sIFszLCAwXV07XG4gICAgICAgICAgICAgICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFsuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKSksXG4gICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCAtIHBsYXRmb3JtVGhpY2tuZXNzKSkpLFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcy5tYXAoc2VnID0+IFtzZWdbMF0gKyA0LCBzZWdbMV0gKyA0XSksXG4gICAgICAgICAgICAgICAgICAgICAgICBbMCwgNF0sIFsxLCA1XSwgWzIsIDZdLCBbMywgN10sXG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UgPCBhbmdsZSAmJiBhbmdsZSA8IChNYXRoLlBJIC8gMiAtIGFuZ2xlMSkpIHtcbiAgICAgICAgICAgICAgICBzZWdtZW50LmNvbXBvbmVudERpcmVjdGlvblR5cGUgPSBDb21wb25lbnREaXJlY3Rpb25UeXBlLlJpZ2h0RnJvbnQ7XG4gICAgICAgICAgICAgICAgcGFyYW0ucGxhdGZvcm1MZW5ndGggPSBzZWdtZW50LmVuZC5kaXN0YW5jZVRvKHNlZ21lbnQuc3RhcnQpO1xuICAgICAgICAgICAgICAgIGxldCBsZWZ0Q29ubmVjdFBvaW50cyA9IFtzdGFydC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSwgYmFzZUxpbmVFbmRdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VMaW5lRW5kRGlzdGFuY2UgPSBzdGFydC5kaXN0YW5jZVRvKGJhc2VMaW5lRW5kKTtcbiAgICAgICAgICAgICAgICBjb25zdCBsZWZ0UHJvamVjdERpc3RhbmNlID0gc3RhcnRXaWR0aCAvIDIgKiBNYXRoLmNvcyhhbmdsZSk7XG4gICAgICAgICAgICAgICAgaWYgKGxlZnRQcm9qZWN0RGlzdGFuY2UgPCBiYXNlTGluZUVuZERpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGwxID0gc3RhcnRXaWR0aCAvIDIgLyBNYXRoLmNvcyhhbmdsZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsMSA+IGJhc2VMaW5lRW5kRGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGExID0gbDEgLSBiYXNlTGluZUVuZERpc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYzEgPSBhMSAvIE1hdGgudGFuKGFuZ2xlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRDb25uZWN0UG9pbnRzID0gW3N0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoYmFzZUxpbmVFbmREaXN0YW5jZSkpLmFkZGVkKHByZXZEaXJOb3JtYWxpemVkLm11bHRpcGxpZWQoYzEpKSwgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChiYXNlTGluZUVuZERpc3RhbmNlKSldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdENvbm5lY3RQb2ludHMgPSBbc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChsMSkpXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgIC8vIHN0YXJ0LmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgICAgICAgICAuLi5sZWZ0Q29ubmVjdFBvaW50cyxcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIgLyBNYXRoLmNvcyhhbmdsZSkpKSxcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vbGRWZXJ0ZXhDb3VudCA9IG1vbGRTaGFwZS52ZXJ0aWNlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IGdlbmVyYXRlVGVtcExpbmVzTG9vcChtb2xkVmVydGV4Q291bnQpO1xuICAgICAgICAgICAgICAgIC8vIGlmIChtb2xkVmVydGV4Q291bnQgPT09IDQpIHtcbiAgICAgICAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgM10sIFszLCA0XSwgWzQsIDBdXTtcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFsuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKSksXG4gICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCAtIHBsYXRmb3JtVGhpY2tuZXNzKSkpLFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcy5tYXAoc2VnID0+IFtzZWdbMF0gKyBtb2xkVmVydGV4Q291bnQsIHNlZ1sxXSArIG1vbGRWZXJ0ZXhDb3VudF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcy5tYXAoc2VnID0+IFtzZWdbMF0sIHNlZ1swXSArIG1vbGRWZXJ0ZXhDb3VudF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gWzAsIDVdLCBbMSwgNl0sIFsyLCA3XSwgWzMsIDhdLCBbNCwgOV0sXG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYW5nbGUgPiAoTWF0aC5QSSAqIDMgLyAyICsgYW5nbGUxKSAmJiBhbmdsZSA8IChNYXRoLlBJICogMiAtIERpcmVjdGlvbkFuZ2xlVG9sZXJhbmNlKSkge1xuICAgICAgICAgICAgICAgIHNlZ21lbnQuY29tcG9uZW50RGlyZWN0aW9uVHlwZSA9IENvbXBvbmVudERpcmVjdGlvblR5cGUuTGVmdEZyb250O1xuICAgICAgICAgICAgICAgIHBhcmFtLnBsYXRmb3JtTGVuZ3RoID0gc2VnbWVudC5lbmQuZGlzdGFuY2VUbyhzZWdtZW50LnN0YXJ0KTtcbiAgICAgICAgICAgICAgICBsZXQgcmlnaHRDb25uZWN0UG9pbnRzID0gW2Jhc2VMaW5lU3RhcnQsIHN0YXJ0LmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKV07XG4gICAgICAgICAgICAgICAgY29uc3QgYmFzZUxpbmVTdGFydERpc3RhbmNlID0gc3RhcnQuZGlzdGFuY2VUbyhiYXNlTGluZVN0YXJ0KTtcbiAgICAgICAgICAgICAgICBjb25zdCByaWdodFByb2plY3REaXN0YW5jZSA9IHN0YXJ0V2lkdGggLyAyICogTWF0aC5jb3MoYW5nbGUpO1xuICAgICAgICAgICAgICAgIGlmIChyaWdodFByb2plY3REaXN0YW5jZSA8IGJhc2VMaW5lU3RhcnREaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgcmlnaHRDb25uZWN0UG9pbnRzID0gW2Jhc2VMaW5lU3RhcnQsIGJhc2VMaW5lU3RhcnRdO1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiAoc3RhcnRXaWR0aCA8PSBwcmV2UGFyYW0uZW5kV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbDIgPSBzdGFydFdpZHRoIC8gMiAvIE1hdGguY29zKGFuZ2xlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGwyID4gYmFzZUxpbmVTdGFydERpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhMiA9IGwyIC0gYmFzZUxpbmVTdGFydERpc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYzIgPSBhMiAvIE1hdGgudGFuKE1hdGguUEkgKiAyIC0gYW5nbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHRDb25uZWN0UG9pbnRzID0gW3N0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLWJhc2VMaW5lU3RhcnREaXN0YW5jZSkpLCBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC1iYXNlTGluZVN0YXJ0RGlzdGFuY2UpKS5hZGRlZChwcmV2RGlyTm9ybWFsaXplZC5tdWx0aXBsaWVkKGMyKSldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHRDb25uZWN0UG9pbnRzID0gW3N0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLWwyKSldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMiAvIE1hdGguY29zKGFuZ2xlKSkpLFxuICAgICAgICAgICAgICAgICAgICAuLi5yaWdodENvbm5lY3RQb2ludHMsXG4gICAgICAgICAgICAgICAgICAgIC8vIHN0YXJ0LmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vbGRWZXJ0ZXhDb3VudCA9IG1vbGRTaGFwZS52ZXJ0aWNlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IGdlbmVyYXRlVGVtcExpbmVzTG9vcChtb2xkVmVydGV4Q291bnQpO1xuICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkpLFxuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgLSBwbGF0Zm9ybVRoaWNrbmVzcykpKSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMubWFwKHNlZyA9PiBbc2VnWzBdICsgbW9sZFZlcnRleENvdW50LCBzZWdbMV0gKyBtb2xkVmVydGV4Q291bnRdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMubWFwKHNlZyA9PiBbc2VnWzBdLCBzZWdbMF0gKyBtb2xkVmVydGV4Q291bnRdKSxcbiAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcGFyYW0ucGxhdGZvcm1MZW5ndGggPSBzZWdtZW50LmVuZC5kaXN0YW5jZVRvKHNlZ21lbnQuc3RhcnQpO1xuICAgICAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXG4gICAgICAgICAgICBzdGFydC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgIHN0YXJ0LmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpLFxuICAgICAgICBdO1xuICAgICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgM10sIFszLCAwXV07XG4gICAgICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbLi4ubW9sZFNoYXBlLnZlcnRpY2VzLFxuICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1wbGF0Zm9ybVRoaWNrbmVzcykpKSxcbiAgICAgICAgXTtcbiAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW1xuICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMsXG4gICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcy5tYXAoc2VnID0+IFtzZWdbMF0gKyA0LCBzZWdbMV0gKyA0XSksXG4gICAgICAgICAgICAgICAgWzAsIDRdLCBbMSwgNV0sIFsyLCA2XSwgWzMsIDddLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmNvbnN0IENvbHVtblN0ZXBUb2xlcmFuY2UgPSAxIC8gMTA7XG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVIYW5kcmFpbFNoYXBlKHN0YWlyUGFyYW0sIHNlZ21lbnRzKSB7XG4gICAgY29uc3QgeyBoYW5kcmFpbDogeyBzdXBwb3J0LCBoZWlnaHQsIGNvbHVtbjogeyBzdGVwIH0gfSB9ID0gc3RhaXJQYXJhbTtcbiAgICBpZiAoc2VnbWVudHMubGVuZ3RoICYmIHN1cHBvcnQpIHtcbiAgICAgICAgY29uc3QgaGFuZHJhaWxzID0gW107XG4gICAgICAgIGNvbnN0IHVuVmlzaXRlZCA9IG5ldyBTZXQoc2VnbWVudHMpO1xuICAgICAgICBjb25zdCB2aXNpdGVkID0gbmV3IE1hcCgpO1xuICAgICAgICBmb3IgKGNvbnN0IHNlZ21lbnQgb2Ygc2VnbWVudHMpIHtcbiAgICAgICAgICAgIGlmICghc2VnbWVudC5tb2xkU2hhcGUudGVtcExpbmVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2aXNpdGVkLnNldChzZWdtZW50LnBhcmFtLmluZGV4LCB7IGxlZnQ6IGZhbHNlLCByaWdodDogZmFsc2UsIGxpbmUzZEluZGV4ZXM6IG5ldyBTZXQoKSB9KTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY3VycmVudCA9IFt7XG4gICAgICAgICAgICAgICAgc2VnbWVudDogc2VnbWVudHNbMF0sXG4gICAgICAgICAgICAgICAgbGluZTNkSW5kOiBnZXRTZWdtZW50U3RhcnRBbmRCYXNlTGluZTNkKHNlZ21lbnRzWzBdLCBzZWdtZW50cykuc3RhcnRMaW5lLmxpbmUzZEluZCxcbiAgICAgICAgICAgICAgICBsZWZ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdGFydDogdHJ1ZSxcbiAgICAgICAgICAgIH1dO1xuICAgICAgICBsZXQgaGFuZHJhaWwgPSB7IHJhaWw6IFtdLCBjb2x1bW5zOiBbXSB9O1xuICAgICAgICBjb25zdCBzdGVwVG9sZXJhbmNlID0gc3RlcCAqIENvbHVtblN0ZXBUb2xlcmFuY2U7XG4gICAgICAgIHdoaWxlIChjdXJyZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IG5leHQgPSBbXTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgeyBzZWdtZW50OiBjdXJyZW50U2VnbWVudCwgbGluZTNkSW5kLCBzdGFydFBvaW50LCBsZWZ0IH0gb2YgY3VycmVudCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgcGFyYW06IHsgaW5kZXgsIHR5cGUsIHN0YXJ0V2lkdGgsIGVuZFdpZHRoLCBob3Jpem9udGFsU3RlcCwgdmVydGljYWxTdGVwLCB1cHdhcmQgfSwgc3RhcnQsIGVuZCwgc3RhcnRIZWlnaHQsIGVuZEhlaWdodCwgbW9sZFNoYXBlOiB7IHZlcnRpY2VzOiBtb2xkVmVydGljZXMsIHRlbXBMaW5lczogbW9sZFRlbXBMaW5lcywgc3RlcENvdW50IH0sIG5leHRDb21wb25lbnRzLCBiYXNlQ29tcG9uZW50LCBjaXJjbGVUYW5nZW50LCBzdGFydExvY2tlZCwgY29tcG9uZW50RGlyZWN0aW9uVHlwZSwgY2lyY3VsYXJTaWRlLCB9ID0gY3VycmVudFNlZ21lbnQ7XG4gICAgICAgICAgICAgICAgdW5WaXNpdGVkLmRlbGV0ZShjdXJyZW50U2VnbWVudCk7XG4gICAgICAgICAgICAgICAgaWYgKCFzdGFydExvY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RlcEhlaWdodCA9IHVwd2FyZCA/IHZlcnRpY2FsU3RlcCA6IC12ZXJ0aWNhbFN0ZXA7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2Zmc2V0TGVuZ3RoID0gSGFuZHJhaWxEZWZhdWx0T2Zmc2V0TGVuZ3RoO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgoc2VnbWVudHMsIGJhc2VDb21wb25lbnQgPT09IG51bGwgfHwgYmFzZUNvbXBvbmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmFzZUNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBzdGFydExpbmU6IHsgbGluZTNkSW5kOiBzdGFydExpbmUzZEluZCB9LCBiYXNlTGluZTogeyBkaXI6IGJhc2VMaW5lM2REaXIsIGVuZDogYmFzZUxpbmUzZEVuZCB9LCB9ID0gZ2V0U2VnbWVudFN0YXJ0QW5kQmFzZUxpbmUzZChjdXJyZW50U2VnbWVudCwgc2VnbWVudHMsIGJhc2VTZWdtZW50KTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydFRvRW5kRGlyID0gZW5kLnN1YnRyYWN0ZWQoc3RhcnQpLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICBsZXQgZnJvbnREaXIgPSBjaXJjbGVUYW5nZW50ID8gY2lyY2xlVGFuZ2VudCA6IHN0YXJ0VG9FbmREaXI7XG4gICAgICAgICAgICAgICAgY29uc3QgYW5nbGUgPSBmcm9udERpci5hbmdsZShiYXNlTGluZTNkRGlyKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkZWx0YUFuZ2xlID0gTWF0aC5hYnMoYW5nbGUgLSBNYXRoLlBJIC8gMik7XG4gICAgICAgICAgICAgICAgaWYgKGRlbHRhQW5nbGUgPD0gRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgZnJvbnREaXIgPSBiYXNlTGluZTNkRGlyLmNyb3NzKERpcmVjdGlvblopLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGxlZnREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKGZyb250RGlyKTtcbiAgICAgICAgICAgICAgICBsZXQgc3AgPSBzdGFydC5hZGRlZChsZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIgKiAobGVmdCA/IDEgOiAtMSkpKTtcbiAgICAgICAgICAgICAgICBsZXQgZXAgPSBlbmQuYWRkZWQobGVmdERpci5tdWx0aXBsaWVkKGVuZFdpZHRoIC8gMiAqIChsZWZ0ID8gMSA6IC0xKSkpO1xuICAgICAgICAgICAgICAgIGxldCBsYXN0TGVuZ3RoID0gc3AuZGlzdGFuY2VUbyhlcCk7XG4gICAgICAgICAgICAgICAgbGV0IHNwVG9FcERpciA9IGVwLnN1YnRyYWN0ZWQoc3ApLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICBsZXQgbmV4dFN0YXJ0UG9pbnQgPSBsZWZ0ID8gc3AgOiBlcDtcbiAgICAgICAgICAgICAgICBsZXQgcHVzaEVuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgY29uc3QgbGluZTNkRGlyID0gbW9sZFZlcnRpY2VzW21vbGRUZW1wTGluZXNbbGluZTNkSW5kXVsxXV0uc3VidHJhY3RlZChtb2xkVmVydGljZXNbbW9sZFRlbXBMaW5lc1tsaW5lM2RJbmRdWzBdXSkubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgIGxldCBvZmZzZXREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKGxpbmUzZERpcik7XG4gICAgICAgICAgICAgICAgY29uc3QgdmlzaXRlZFJlY29yZCA9IHZpc2l0ZWQuZ2V0KGluZGV4KTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsaW5lM2QgPSBtb2xkVGVtcExpbmVzW2xpbmUzZEluZF07XG4gICAgICAgICAgICAgICAgICAgIHNwID0gc3RhcnRQb2ludCB8fCBtb2xkVmVydGljZXNbbGluZTNkWzBdXTtcbiAgICAgICAgICAgICAgICAgICAgZXAgPSBtb2xkVmVydGljZXNbbGluZTNkWzFdXTtcbiAgICAgICAgICAgICAgICAgICAgbGFzdExlbmd0aCA9IHNwLmRpc3RhbmNlVG8oZXApO1xuICAgICAgICAgICAgICAgICAgICBzcFRvRXBEaXIgPSBlcC5zdWJ0cmFjdGVkKHNwKS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRMaW5lM2RJbmQgPSAobGluZTNkSW5kICsgMSkgJSBtb2xkVGVtcExpbmVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmlzaXRlZExpbmUzZEluZGV4ZXMgPSB2aXNpdGVkUmVjb3JkID09PSBudWxsIHx8IHZpc2l0ZWRSZWNvcmQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZpc2l0ZWRSZWNvcmQubGluZTNkSW5kZXhlcztcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNFbnRyYW5jZSA9ICh2aXNpdGVkTGluZTNkSW5kZXhlcyA9PT0gbnVsbCB8fCB2aXNpdGVkTGluZTNkSW5kZXhlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmlzaXRlZExpbmUzZEluZGV4ZXMuaGFzKGxpbmUzZEluZCkpICYmICh2aXNpdGVkTGluZTNkSW5kZXhlcyA9PT0gbnVsbCB8fCB2aXNpdGVkTGluZTNkSW5kZXhlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmlzaXRlZExpbmUzZEluZGV4ZXMuaGFzKG5leHRMaW5lM2RJbmQpKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzRW50cmFuY2VTZWdtZW50ID0gbGluZTNkSW5kID09PSBzdGFydExpbmUzZEluZDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5lYXJlc3RTZWdtZW50O1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG5leHRTZWdtZW50SW5kZXggb2YgbmV4dENvbXBvbmVudHNbbGluZTNkSW5kXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dFNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleChzZWdtZW50cywgbmV4dFNlZ21lbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHN0YXJ0IH0gPSBuZXh0U2VnbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkcyA9IHN0YXJ0LmRpc3RhbmNlVG8oc3ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlID0gc3RhcnQuZGlzdGFuY2VUbyhlcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmlzaXROZXh0UmVjb3JkID0gdmlzaXRlZC5nZXQobmV4dFNlZ21lbnQucGFyYW0uaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRDb21wb25lbnRTdGFydExpbmUzZEluZCA9IGdldFNlZ21lbnRTdGFydEFuZEJhc2VMaW5lM2QobmV4dFNlZ21lbnQsIHNlZ21lbnRzKS5zdGFydExpbmUubGluZTNkSW5kO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0VxdWFsKGRzICsgZGUsIGxhc3RMZW5ndGgpICYmICEodmlzaXROZXh0UmVjb3JkID09PSBudWxsIHx8IHZpc2l0TmV4dFJlY29yZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmlzaXROZXh0UmVjb3JkLnJpZ2h0KSAmJiAhKHZpc2l0TmV4dFJlY29yZCA9PT0gbnVsbCB8fCB2aXNpdE5leHRSZWNvcmQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZpc2l0TmV4dFJlY29yZC5saW5lM2RJbmRleGVzLmhhcyhuZXh0Q29tcG9uZW50U3RhcnRMaW5lM2RJbmQpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5lYXJlc3RTZWdtZW50IHx8IG5lYXJlc3RTZWdtZW50LmRpc3RhbmNlID4gZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lYXJlc3RTZWdtZW50ID0geyBzZWdtZW50OiBuZXh0U2VnbWVudCwgZGlzdGFuY2U6IGRzIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IGxhc3REaXN0YW5jZSA9IGxhc3RMZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZWFyZXN0U2VnbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBlbmRPbkJhc2VMaW5lIH0gPSBnZXRTZWdtZW50U3RhcnRBbmRCYXNlTGluZTNkKG5lYXJlc3RTZWdtZW50LnNlZ21lbnQsIHNlZ21lbnRzKS5zdGFydExpbmU7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcCA9IGVuZE9uQmFzZUxpbmU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcFRvRXBEaXIgPSBlcC5zdWJ0cmFjdGVkKHNwKS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BUb0VwRGlyLmRvdChsaW5lM2REaXIpIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0RGlzdGFuY2UgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hFbmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U3RhcnRQb2ludCA9IHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdERpc3RhbmNlID0gc3AuZGlzdGFuY2VUbyhlcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFN0YXJ0UG9pbnQgPSBpc1BsYXRmb3JtKG5lYXJlc3RTZWdtZW50LnNlZ21lbnQpID8gZXAgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNFbnRyYW5jZSAmJiBoYXNFbnRyYW5jZVNlZ21lbnQgJiYgYmFzZVNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAvLyBkb24ndCBjYXJlIGJlY2F1c2UgbmV4dCBpcyBwbGF0Zm9ybSAobmV4dCB3aWxsIGRlYWwgdGhlIGNhc2UpIG9yIHN0YWlyIChvbmx5IGhhdmUgb25lIG5leHRDb21wb25lbnQgd2hpY2ggaXMgY3VycmVudFNlZ21lbnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAoYmFzZVNlZ21lbnQucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSAmJiBuZXh0U2libGluZ1NlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVwID0gYmFzZUxpbmUzZEVuZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwVG9FcERpciA9IGVwLnN1YnRyYWN0ZWQoc3ApLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcFRvRXBEaXIuZG90KGJhc2VMaW5lM2REaXIpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0RGlzdGFuY2UgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hFbmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0Q29ybmVyRGlzdGFuY2UgPSBlcC5kaXN0YW5jZVRvKHNwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dENvcm5lckRpc3RhbmNlID4gb2Zmc2V0TGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTdGFydFBvaW50ID0gc3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U3RhcnRQb2ludCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0RGlzdGFuY2UgPSBzcC5kaXN0YW5jZVRvKGVwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U3RhcnRQb2ludCA9IGlzUGxhdGZvcm0oYmFzZVNlZ21lbnQpID8gZXAgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNFbnRyYW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdERpc3RhbmNlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hFbmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hFbmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBmaXJzdEJvdHRvbVB0ID0gc3AuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkuYWRkZWQob2Zmc2V0RGlyLm11bHRpcGxpZWQob2Zmc2V0TGVuZ3RoKSkuYWRkZWQoc3BUb0VwRGlyLm11bHRpcGxpZWQoc3RhcnRQb2ludCA/IDAgOiBvZmZzZXRMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3REaXN0YW5jZSA+IDAgfHwgKGxhc3REaXN0YW5jZSA9PT0gMCAmJiAhc3RhcnRQb2ludCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHB1c2ggcmFpbFxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWwucmFpbC5wdXNoKGZpcnN0Qm90dG9tUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCkpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBwdXNoIGNvbHVtbnNcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3REaXN0YW5jZSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRGlzdGFuY2UgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHRlbXBEaXN0YW5jZSA8PSBsYXN0RGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpc0VuZCA9IHRlbXBEaXN0YW5jZSA9PT0gbGFzdERpc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvdHRvbVBvaW50ID0gdGVtcERpc3RhbmNlID4gMCA/IHNwLmFkZGVkKHNwVG9FcERpci5tdWx0aXBsaWVkKHRlbXBEaXN0YW5jZSkpLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCkpLmFkZGVkKG9mZnNldERpci5tdWx0aXBsaWVkKG9mZnNldExlbmd0aCkpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RCb3R0b21QdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5jb2x1bW5zLnB1c2goW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b21Qb2ludCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tUG9pbnQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0VuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5yYWlsLnB1c2goYm90dG9tUG9pbnQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVsdGFEaXN0YW5jZSA9IChsYXN0RGlzdGFuY2UgLSB0ZW1wRGlzdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBEaXN0YW5jZSArPSAoZGVsdGFEaXN0YW5jZSA8PSAoc3RlcCArIHN0ZXBUb2xlcmFuY2UpICYmIGRlbHRhRGlzdGFuY2UgPj0gc3RlcFRvbGVyYW5jZSkgPyAocHVzaEVuZCA/IGRlbHRhRGlzdGFuY2UgOiBJbmZpbml0eSkgOiBzdGVwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZWFyZXN0U2VnbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50OiBuZWFyZXN0U2VnbWVudC5zZWdtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUzZEluZDogZ2V0U2VnbWVudFN0YXJ0QW5kQmFzZUxpbmUzZChuZWFyZXN0U2VnbWVudC5zZWdtZW50LCBzZWdtZW50cykuc3RhcnRMaW5lLmxpbmUzZEluZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRQb2ludDogbmV4dFN0YXJ0UG9pbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0VudHJhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhc2VTZWdtZW50ICYmIGhhc0VudHJhbmNlU2VnbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgLy8gbmV2ZXIgaGFwcGVuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIChuZXh0U2libGluZ1NlZ21lbnQgJiYgYmFzZVNlZ21lbnQucGFyYW0udHlwZSAhPT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudDogYmFzZVNlZ21lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lM2RJbmQ6IGJhc2VTZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gPyAoYmFzZUNvbXBvbmVudCA9PT0gbnVsbCB8fCBiYXNlQ29tcG9uZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBiYXNlQ29tcG9uZW50LmxpbmUzZEluZGV4KSB8fCAwIDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFBvaW50OiBuZXh0U3RhcnRQb2ludCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBlbmQgb2YgdGhpcyBwYXRjaCwgdGhlIHBhdGNoIGFyZSBzdGFydCB3aXRoIHBsYXRmb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlscy5wdXNoKGhhbmRyYWlsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWwgPSB7IHJhaWw6IFtdLCBjb2x1bW5zOiBbXSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVuZCBvZiB0aGlzIGxpbmUzZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQ6IGN1cnJlbnRTZWdtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lM2RJbmQ6IG5leHRMaW5lM2RJbmQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB2aXNpdGVkTGluZTNkSW5kZXhlcyA9PT0gbnVsbCB8fCB2aXNpdGVkTGluZTNkSW5kZXhlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmlzaXRlZExpbmUzZEluZGV4ZXMuYWRkKGxpbmUzZEluZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbHVtbkFjdHVhbEhlaWdodCA9IGhlaWdodCArIHZlcnRpY2FsU3RlcCAvIDI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzUmlnaHRTdGFpciA9IGNvbXBvbmVudERpcmVjdGlvblR5cGUgPT09IENvbXBvbmVudERpcmVjdGlvblR5cGUuUmlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzTGVmdFN0YWlyID0gY29tcG9uZW50RGlyZWN0aW9uVHlwZSA9PT0gQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5MZWZ0O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFpclJhaWwgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhaXJDb2x1bW5zID0gW107XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvcm5lckJhc2VEaXIgPSAoIWxlZnQgJiYgaXNSaWdodFN0YWlyKSB8fCAobGVmdCAmJiBpc0xlZnRTdGFpcikgPyBsZWZ0RGlyIDogYmFzZUxpbmUzZERpcjtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvcm5lclN0YXJ0SGVpZ2h0ID0gbGVmdCA/IGVuZEhlaWdodCA6IHN0YXJ0SGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29ybmVyU2lkZVdpZHRoID0gbGVmdCA/IGVuZFdpZHRoIDogc3RhcnRXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNpZGVDb3JuZXJTdGFydCA9IGxlZnQgPyBlbmQgOiBzdGFydDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvcm5lckVuZCA9IHNpZGVDb3JuZXJTdGFydC5hZGRlZChjb3JuZXJCYXNlRGlyLm11bHRpcGxpZWQoKGNvcm5lclNpZGVXaWR0aCAvIDIgKyBvZmZzZXRMZW5ndGgpICogKGxlZnQgPyAxIDogLTEpKSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb3JuZXJEaXN0YW5jZSA9IChzdGFydFBvaW50IHx8IHNwKS5kaXN0YW5jZVRvKGNvcm5lckVuZCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGFsb25nIGNvcm5lckJhc2VEaXJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvcm5lclNwVG9FcERpciA9IGNvcm5lckVuZC5zdWJ0cmFjdGVkKHN0YXJ0UG9pbnQgfHwgc3ApLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvcm5lck9mZnNldERpciA9IERpcmVjdGlvblouY3Jvc3MoY29ybmVyU3BUb0VwRGlyKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvcm5lckFkZGl0aW9uYWxIZWlnaHQgPSAhbGVmdCAmJiAhaXNMZWZ0U3RhaXIgJiYgdXB3YXJkID8gc3RlcEhlaWdodCA6IDA7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRDb3JuZXJSYWlsID0gW107XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRDb3JuZXJDb2x1bW5zID0gW107XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGFydFBvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEhlYWREaXN0YW5jZSA9IHN0ZXA7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkQ29ybmVyUmFpbC5wdXNoKHN0YXJ0UG9pbnQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGNvcm5lclN0YXJ0SGVpZ2h0ICsgY29ybmVyQWRkaXRpb25hbEhlaWdodCArIGhlaWdodCkpLmFkZGVkKGNvcm5lck9mZnNldERpci5tdWx0aXBsaWVkKG9mZnNldExlbmd0aCkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0ZW1wSGVhZERpc3RhbmNlIDwgY29ybmVyRGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBib3R0b21Qb2ludCA9IHN0YXJ0UG9pbnQuYWRkZWQoY29ybmVyU3BUb0VwRGlyLm11bHRpcGxpZWQodGVtcEhlYWREaXN0YW5jZSkpLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChjb3JuZXJTdGFydEhlaWdodCArIGNvcm5lckFkZGl0aW9uYWxIZWlnaHQpKS5hZGRlZChjb3JuZXJPZmZzZXREaXIubXVsdGlwbGllZChvZmZzZXRMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkQ29ybmVyQ29sdW1ucy5wdXNoKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tUG9pbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbVBvaW50LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wSGVhZERpc3RhbmNlICs9IHN0ZXA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWxlZnQgJiYgaXNMZWZ0U3RhaXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0Qm90dG9tUG9pbnQgPSBjb3JuZXJFbmQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGNvcm5lclN0YXJ0SGVpZ2h0ICsgY29ybmVyQWRkaXRpb25hbEhlaWdodCkpLmFkZGVkKGNvcm5lck9mZnNldERpci5tdWx0aXBsaWVkKG9mZnNldExlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHB1c2ggcmFpbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRDb3JuZXJSYWlsLnB1c2gobGFzdEJvdHRvbVBvaW50LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChjb3JuZXJEaXN0YW5jZSAtIHRlbXBIZWFkRGlzdGFuY2UgKyBzdGVwKSA+IHN0ZXBUb2xlcmFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZENvcm5lckNvbHVtbnMucHVzaChbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0Qm90dG9tUG9pbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0Qm90dG9tUG9pbnQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbmV4dFN0YXJ0UG9pbnQgPSBsZWZ0ID8gc3AgOiBlcDtcbiAgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBzZWdtZW50IHN0YXJ0V2lkdGggIT09IGN1cnJlbnRTZWdtZW50IGVuZFdpZHRoXG4gICAgICAgICAgICAgICAgICAgIHB1c2hFbmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVhc29uYWJsZVN0ZXBDb3VudCA9IE1hdGguY2VpbChzdGVwIC8gaG9yaXpvbnRhbFN0ZXApO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcFN0ZXBDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFyY0Nob3JkQW5nbGUgPSBjaXJjbGVUYW5nZW50ID8gc3RhcnRUb0VuZERpci5hbmdsZShjaXJjbGVUYW5nZW50KSA6IDA7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBDb21wb25lbnRUeXBlLlN0cmFpZ2h0U3RhaXIgfHwgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpciAmJiAoYXJjQ2hvcmRBbmdsZSA8PSBEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSB8fCAhY2lyY2xlVGFuZ2VudCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0TGVuZ3RoID0gc3AuZGlzdGFuY2VUbyhlcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwdXNoIHJhaWxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyUmFpbC5wdXNoKHNwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIGhlaWdodCArICh1cHdhcmQgPyAxIDogMCkgKiBzdGVwSGVpZ2h0KSkuYWRkZWQobGVmdERpci5tdWx0aXBsaWVkKGxlZnQgPyAtb2Zmc2V0TGVuZ3RoIDogb2Zmc2V0TGVuZ3RoKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF1cHdhcmQgJiYgc3RlcENvdW50ID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyUmFpbC5wdXNoKHNwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIGhlaWdodCkpLmFkZGVkKGZyb250RGlyLm11bHRpcGxpZWQoaG9yaXpvbnRhbFN0ZXApKS5hZGRlZChsZWZ0RGlyLm11bHRpcGxpZWQobGVmdCA/IC1vZmZzZXRMZW5ndGggOiBvZmZzZXRMZW5ndGgpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwdXNoIGNvbHVtbnNcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0ZW1wU3RlcENvdW50IDwgc3RlcENvdW50IC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1ckhvclN0ZXBEaXN0YW5jZSA9ICh0ZW1wU3RlcENvdW50ICsgMC41KSAqIGhvcml6b250YWxTdGVwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1clZlclN0ZXBEaXN0YW5jZSA9ICh0ZW1wU3RlcENvdW50ICsgKHVwd2FyZCA/IDEgOiAwKSkgKiBzdGVwSGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvdHRvbVBvaW50ID0gc3AuYWRkZWQoZnJvbnREaXIubXVsdGlwbGllZChjdXJIb3JTdGVwRGlzdGFuY2UpKS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBjdXJWZXJTdGVwRGlzdGFuY2UpKS5hZGRlZChsZWZ0RGlyLm11bHRpcGxpZWQobGVmdCA/IC1vZmZzZXRMZW5ndGggOiBvZmZzZXRMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpckNvbHVtbnMucHVzaChbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbVBvaW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b21Qb2ludC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoIXVwd2FyZCAmJiB0ZW1wU3RlcENvdW50ID09PSAwID8gaGVpZ2h0IDogY29sdW1uQWN0dWFsSGVpZ2h0KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcFN0ZXBDb3VudCArPSByZWFzb25hYmxlU3RlcENvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0ZXBDb3VudCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodXB3YXJkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyUmFpbC5wdXNoKHNwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIGhlaWdodCArICh1cHdhcmQgPyBzdGVwQ291bnQgOiAoc3RlcENvdW50IC0gKHN0ZXBDb3VudCA+IDIgPyAyIDogMSkpKSAqIHN0ZXBIZWlnaHQpKS5hZGRlZChmcm9udERpci5tdWx0aXBsaWVkKChzdGVwQ291bnQgLSAxKSAqIGhvcml6b250YWxTdGVwKSkuYWRkZWQobGVmdERpci5tdWx0aXBsaWVkKGxlZnQgPyAtb2Zmc2V0TGVuZ3RoIDogb2Zmc2V0TGVuZ3RoKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRvdGFsTGVuZ3RoID0gTWF0aC5hYnMoZW5kLnN1YnRyYWN0ZWQoc3RhcnQpLmRvdChmcm9udERpcikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJldlRvdGFsU3RlcExlbmd0aCA9IChzdGVwQ291bnQgLSAxKSAqIGhvcml6b250YWxTdGVwO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdFN0ZXBMZW5ndGggPSBsYXN0TGVuZ3RoIC0gcHJldlRvdGFsU3RlcExlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyUmFpbC5wdXNoKHNwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIGhlaWdodCArICh1cHdhcmQgPyBzdGVwQ291bnQgOiAoTWF0aC5tYXgoMCwgdG90YWxMZW5ndGggLSBob3Jpem9udGFsU3RlcCkgLyBob3Jpem9udGFsU3RlcCkpICogc3RlcEhlaWdodCkpLmFkZGVkKGZyb250RGlyLm11bHRpcGxpZWQodG90YWxMZW5ndGgpKS5hZGRlZChsZWZ0RGlyLm11bHRpcGxpZWQobGVmdCA/IC1vZmZzZXRMZW5ndGggOiBvZmZzZXRMZW5ndGgpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGVtcFN0ZXBDb3VudCAtIHJlYXNvbmFibGVTdGVwQ291bnQgPD0gc3RlcENvdW50IC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RCb3R0b21Qb2ludCA9IHNwLmFkZGVkKGZyb250RGlyLm11bHRpcGxpZWQocHJldlRvdGFsU3RlcExlbmd0aCArIGxhc3RTdGVwTGVuZ3RoIC8gMikpLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChlbmRIZWlnaHQgKyAodXB3YXJkID8gMCA6IC1zdGVwSGVpZ2h0KSkpLmFkZGVkKGxlZnREaXIubXVsdGlwbGllZChsZWZ0ID8gLW9mZnNldExlbmd0aCA6IG9mZnNldExlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyQ29sdW1ucy5wdXNoKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdEJvdHRvbVBvaW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0Qm90dG9tUG9pbnQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCArICh1cHdhcmQgPyAwIDogKHZlcnRpY2FsU3RlcCAqICgxIC0gbGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcCAvIDIpKSkpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5leHQgc2VnbWVudCBzdGFydFdpZHRoICE9PSBjdXJyZW50U2VnbWVudCBlbmRXaWR0aFxuICAgICAgICAgICAgICAgICAgICAgICAgc3AgPSBsZWZ0ID8gc3RhcnQuYWRkZWQoYmFzZUxpbmUzZERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSkgOiBlbmQuYWRkZWQobGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3AgPSBsZWZ0ID8gc3RhcnQuYWRkZWQoYmFzZUxpbmUzZERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyIC0gb2Zmc2V0TGVuZ3RoKSkgOiBlbmQuYWRkZWQobGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMiArIG9mZnNldExlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNpcmNsZVRhbmdlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhbmdlbnRMZWZ0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhjaXJjbGVUYW5nZW50KS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFydEVuZERpc3RhbmNlID0gc3RhcnQuZGlzdGFuY2VUbyhlbmQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF4V2lkdGggPSBNYXRoLm1heChzdGFydFdpZHRoLCBlbmRXaWR0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbmRBbmdsZSA9IHN0YXJ0VG9FbmREaXIuYW5nbGVUbyhjaXJjbGVUYW5nZW50LCBEaXJlY3Rpb25aKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzTGVmdEFyYyA9IGNpcmN1bGFyU2lkZSA9PT0gQ2lyY3VsYXJTaWRlLkxlZnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbmRDb21wbGVtZW50YXJ5QW5nbGUgPSBpc0xlZnRBcmMgPyBNYXRoLmFicyhlbmRBbmdsZSAtIE1hdGguUEkgLyAyIC0gTWF0aC5QSSkgOiBNYXRoLmFicyhlbmRBbmdsZSAtIE1hdGguUEkgLyAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhbGZDaG9yZCA9IHN0YXJ0RW5kRGlzdGFuY2UgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmFkaXVzID0gaGFsZkNob3JkIC8gTWF0aC5jb3MoZW5kQ29tcGxlbWVudGFyeUFuZ2xlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlubmVyUmFkaXVzID0gcmFkaXVzIC0gbWF4V2lkdGggLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaG9yaXpvbnRhbFN0ZXBBbmdsZSA9IE1hdGguYXNpbihob3Jpem9udGFsU3RlcCAvIDIgLyBpbm5lclJhZGl1cykgKiAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2lyY2xlTm9ybWFsID0gaXNMZWZ0QXJjID8gRGlyZWN0aW9uWiA6IERpcmVjdGlvbloucmV2ZXJzZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNpcmNsZUNlbnRlciA9IHN0YXJ0LmFkZGVkKHRhbmdlbnRMZWZ0RGlyLm11bHRpcGxpZWQoaXNMZWZ0QXJjID8gcmFkaXVzIDogLXJhZGl1cykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJjID0gR2VvbUxpYi5jcmVhdGVBcmMzZEJ5Q2VudGVyTm9ybWFsUmFkaXVzKGNpcmNsZUNlbnRlciwgY2lyY2xlTm9ybWFsLCByYWRpdXMsIHN0YXJ0LCBlbmQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJjQW5nbGUgPSBhcmMuYXJjQW5nbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0SG9yaXpvbnRhbEFuZ2xlID0gYXJjQW5nbGUgLSBob3Jpem9udGFsU3RlcEFuZ2xlICogKHN0ZXBDb3VudCAtIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRSYWRpdXNEaXIgPSBpc0xlZnRBcmMgPyB0YW5nZW50TGVmdERpci5yZXZlcnNlZCgpIDogdGFuZ2VudExlZnREaXI7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwdXNoIGNvbHVtbnNcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0ZW1wU3RlcENvdW50IDwgc3RlcENvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyUm90YXRlQW5nbGUgPSBob3Jpem9udGFsU3RlcEFuZ2xlICogdGVtcFN0ZXBDb3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0Um90YXRlQW5nbGUgPSBob3Jpem9udGFsU3RlcEFuZ2xlICogdGVtcFN0ZXBDb3VudCArICh0ZW1wU3RlcENvdW50ID09PSBzdGVwQ291bnQgLSAxID8gbGFzdEhvcml6b250YWxBbmdsZSA6IGhvcml6b250YWxTdGVwQW5nbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1clJvdGF0ZU1hdHJpeCA9IEdlb21MaWIuY3JlYXRlUm90YXRlTWF0cml4NChob3Jpem9udGFsU3RlcEFuZ2xlICogdGVtcFN0ZXBDb3VudCwgY2lyY2xlTm9ybWFsLCBkdW1teVBvaW50M2QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRSb3RhdGVNYXRyaXggPSBHZW9tTGliLmNyZWF0ZVJvdGF0ZU1hdHJpeDQobmV4dFJvdGF0ZUFuZ2xlLCBjaXJjbGVOb3JtYWwsIGR1bW15UG9pbnQzZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyUmFkaXVzRGlyID0gc3RhcnRSYWRpdXNEaXIuYXBwbGllZE1hdHJpeDQoY3VyUm90YXRlTWF0cml4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0UmFkaXVzRGlyID0gc3RhcnRSYWRpdXNEaXIuYXBwbGllZE1hdHJpeDQobmV4dFJvdGF0ZU1hdHJpeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VySGFsZldpZHRoID0gKHN0YXJ0V2lkdGggKyAoZW5kV2lkdGggLSBzdGFydFdpZHRoKSAqIChjdXJSb3RhdGVBbmdsZSkgLyBhcmNBbmdsZSkgLyAyICogKGlzTGVmdEFyYyA/IC0xIDogMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dEhhbGZXaWR0aCA9IChzdGFydFdpZHRoICsgKGVuZFdpZHRoIC0gc3RhcnRXaWR0aCkgKiAobmV4dFJvdGF0ZUFuZ2xlKSAvIGFyY0FuZ2xlKSAvIDIgKiAoaXNMZWZ0QXJjID8gLTEgOiAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJMZWZ0TW9sZFB0ID0gY2lyY2xlQ2VudGVyLmFkZGVkKGN1clJhZGl1c0Rpci5tdWx0aXBsaWVkKHJhZGl1cyArIGN1ckhhbGZXaWR0aCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1clJpZ2h0TW9sZFB0ID0gY2lyY2xlQ2VudGVyLmFkZGVkKGN1clJhZGl1c0Rpci5tdWx0aXBsaWVkKHJhZGl1cyAtIGN1ckhhbGZXaWR0aCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRMZWZ0TW9sZFB0ID0gY2lyY2xlQ2VudGVyLmFkZGVkKG5leHRSYWRpdXNEaXIubXVsdGlwbGllZChyYWRpdXMgKyBuZXh0SGFsZldpZHRoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dFJpZ2h0TW9sZFB0ID0gY2lyY2xlQ2VudGVyLmFkZGVkKG5leHRSYWRpdXNEaXIubXVsdGlwbGllZChyYWRpdXMgLSBuZXh0SGFsZldpZHRoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyU3RlcExlZnRGcm9udERpciA9IG5leHRMZWZ0TW9sZFB0LnN1YnRyYWN0ZWQoY3VyTGVmdE1vbGRQdCkubXVsdGlwbGllZCgwLjUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1clN0ZXBSaWdodEZyb250RGlyID0gbmV4dFJpZ2h0TW9sZFB0LnN1YnRyYWN0ZWQoY3VyUmlnaHRNb2xkUHQpLm11bHRpcGxpZWQoMC41KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJTdGVwTGVmdERpciA9IERpcmVjdGlvblouY3Jvc3MoY3VyU3RlcExlZnRGcm9udERpcikubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1clN0ZXBSaWdodERpciA9IERpcmVjdGlvblouY3Jvc3MoY3VyU3RlcFJpZ2h0RnJvbnREaXIpLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJMZWZ0Qm90dG9tUHQgPSBjdXJMZWZ0TW9sZFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArICh0ZW1wU3RlcENvdW50ICsgKHVwd2FyZCA/IDEgOiAwKSkgKiBzdGVwSGVpZ2h0KSkuYWRkZWQoY3VyU3RlcExlZnREaXIubXVsdGlwbGllZCgtb2Zmc2V0TGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyUmlnaHRCb3R0b21QdCA9IGN1clJpZ2h0TW9sZFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArICh0ZW1wU3RlcENvdW50ICsgKHVwd2FyZCA/IDEgOiAwKSkgKiBzdGVwSGVpZ2h0KSkuYWRkZWQoY3VyU3RlcFJpZ2h0RGlyLm11bHRpcGxpZWQob2Zmc2V0TGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyTGVmdEJvdHRvbU1pZFB0ID0gY3VyTGVmdEJvdHRvbVB0LmFkZGVkKGN1clN0ZXBMZWZ0RnJvbnREaXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1clJpZ2h0Qm90dG9tTWlkUHQgPSBjdXJSaWdodEJvdHRvbVB0LmFkZGVkKGN1clN0ZXBSaWdodEZyb250RGlyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGVtcFN0ZXBDb3VudCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHB1c2ggcmFpbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGVmdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJSYWlsLnB1c2goY3VyTGVmdEJvdHRvbVB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQgKyAodGVtcFN0ZXBDb3VudCA+IDAgJiYgIXVwd2FyZCA/IC1zdGVwSGVpZ2h0IDogMCkpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpclJhaWwucHVzaChjdXJSaWdodEJvdHRvbVB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQgKyAodGVtcFN0ZXBDb3VudCA+IDAgJiYgIXVwd2FyZCA/IC1zdGVwSGVpZ2h0IDogMCkpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRlbXBTdGVwQ291bnQgPT09IHN0ZXBDb3VudCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RTdGVwUGVyY2VudCA9IGxhc3RIb3Jpem9udGFsQW5nbGUgLyBob3Jpem9udGFsU3RlcEFuZ2xlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxlZnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpclJhaWwucHVzaChjdXJMZWZ0Qm90dG9tTWlkUHQuYWRkZWQoY3VyU3RlcExlZnRGcm9udERpcikuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCArICh1cHdhcmQgPyAwIDogLXN0ZXBIZWlnaHQgKiAoMSAtIGxhc3RTdGVwUGVyY2VudCkpKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJSYWlsLnB1c2goY3VyUmlnaHRCb3R0b21NaWRQdC5hZGRlZChjdXJTdGVwUmlnaHRGcm9udERpcikuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCArICh1cHdhcmQgPyAwIDogLXN0ZXBIZWlnaHQgKiAoMSAtIGxhc3RTdGVwUGVyY2VudCkpKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJDb2x1bW5zLnB1c2goW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQgPyBjdXJMZWZ0Qm90dG9tTWlkUHQgOiBjdXJSaWdodEJvdHRvbU1pZFB0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChsZWZ0ID8gY3VyTGVmdEJvdHRvbU1pZFB0IDogY3VyUmlnaHRCb3R0b21NaWRQdCkuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCArICh1cHdhcmQgPyAwIDogKHZlcnRpY2FsU3RlcCAqICgxIC0gbGFzdFN0ZXBQZXJjZW50IC8gMikpKSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXh0IHNlZ21lbnQgc3RhcnRXaWR0aCAhPT0gY3VycmVudFNlZ21lbnQgZW5kV2lkdGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwID0gbGVmdCA/IHN0YXJ0LmFkZGVkKGJhc2VMaW5lM2REaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpIDogY3VyUmlnaHRNb2xkUHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzcCA9IGxlZnQgPyBzdGFydC5hZGRlZChiYXNlTGluZTNkRGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIgLSBvZmZzZXRMZW5ndGgpKSA6IGN1clJpZ2h0TW9sZFB0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFsZWZ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdERpciA9IGN1clN0ZXBMZWZ0RGlyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZW1wU3RlcENvdW50ICUgcmVhc29uYWJsZVN0ZXBDb3VudCA9PT0gMCAmJiB0ZW1wU3RlcENvdW50IDwgc3RlcENvdW50IC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpckNvbHVtbnMucHVzaChbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0ID8gY3VyTGVmdEJvdHRvbU1pZFB0IDogY3VyUmlnaHRCb3R0b21NaWRQdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChsZWZ0ID8gY3VyTGVmdEJvdHRvbU1pZFB0IDogY3VyUmlnaHRCb3R0b21NaWRQdCkuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKCF1cHdhcmQgJiYgdGVtcFN0ZXBDb3VudCA9PT0gMCA/IGhlaWdodCA6IGNvbHVtbkFjdHVhbEhlaWdodCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcFN0ZXBDb3VudCArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsLnJhaWwucHVzaCguLi5oZWFkQ29ybmVyUmFpbCk7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsLmNvbHVtbnMucHVzaCguLi5oZWFkQ29ybmVyQ29sdW1ucyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsZWZ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5yYWlsLnB1c2goLi4uc3RhaXJSYWlsLnJldmVyc2UoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5jb2x1bW5zLnB1c2goLi4uc3RhaXJDb2x1bW5zLnJldmVyc2UoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5yYWlsLnB1c2goLi4uc3RhaXJSYWlsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsLmNvbHVtbnMucHVzaCguLi5zdGFpckNvbHVtbnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxldCBzdGFpck5leHRTZWdtZW50O1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG5leHRTZWdtZW50SW5kZXggb2YgbmV4dENvbXBvbmVudHNbbGluZTNkSW5kXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dFNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleChzZWdtZW50cywgbmV4dFNlZ21lbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0U2VnbWVudFZpc2l0ZWRSZWNvcmQgPSB2aXNpdGVkLmdldCgobmV4dFNlZ21lbnQgPT09IG51bGwgfHwgbmV4dFNlZ21lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG5leHRTZWdtZW50LnBhcmFtLmluZGV4KSB8fCAtMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFNlZ21lbnQgJiYgKChpc1BsYXRmb3JtKG5leHRTZWdtZW50KSAmJiAhKG5leHRTZWdtZW50VmlzaXRlZFJlY29yZCA9PT0gbnVsbCB8fCBuZXh0U2VnbWVudFZpc2l0ZWRSZWNvcmQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG5leHRTZWdtZW50VmlzaXRlZFJlY29yZC5saW5lM2RJbmRleGVzLnNpemUpKSB8fCAoIWlzUGxhdGZvcm0obmV4dFNlZ21lbnQpICYmICEobmV4dFNlZ21lbnRWaXNpdGVkUmVjb3JkID09PSBudWxsIHx8IG5leHRTZWdtZW50VmlzaXRlZFJlY29yZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogbmV4dFNlZ21lbnRWaXNpdGVkUmVjb3JkLnJpZ2h0KSkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJOZXh0U2VnbWVudCA9IG5leHRTZWdtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChsZWZ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmFzZVNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgLy8gbmV2ZXIgaGFwcGVuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKG5leHRTaWJsaW5nU2VnbWVudCAmJiBiYXNlU2VnbWVudC5wYXJhbS50eXBlICE9PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXAgPSBiYXNlTGluZTNkRW5kO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwVG9FcERpciA9IGVwLnN1YnRyYWN0ZWQoc3ApLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BUb0VwRGlyLmRvdChiYXNlTGluZTNkRGlyKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTdGFydFBvaW50ID0gc3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoRW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFN0YXJ0UG9pbnQgPSBpc1BsYXRmb3JtKGJhc2VTZWdtZW50KSA/IGVwIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQ6IGJhc2VTZWdtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lM2RJbmQ6IGJhc2VTZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gPyAoYmFzZUNvbXBvbmVudCA9PT0gbnVsbCB8fCBiYXNlQ29tcG9uZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBiYXNlQ29tcG9uZW50LmxpbmUzZEluZGV4KSB8fCAwIDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFBvaW50OiBuZXh0U3RhcnRQb2ludCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVuZCB0aGUgcGF0Y2ggd2hpY2ggaXMgc3RhcnQgd2l0aCBjdXJyZW50U2VnbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlscy5wdXNoKGhhbmRyYWlsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbCA9IHsgcmFpbDogW10sIGNvbHVtbnM6IFtdIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmlzaXRlZFJlY29yZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2l0ZWRSZWNvcmQubGVmdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhaXJOZXh0U2VnbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgbGluZTNkSW5kOiBzdGFpck5leHRMaW5lM2RJbmQsIGVuZE9uQmFzZUxpbmUgfSA9IGdldFNlZ21lbnRTdGFydEFuZEJhc2VMaW5lM2Qoc3RhaXJOZXh0U2VnbWVudCwgc2VnbWVudHMsIGN1cnJlbnRTZWdtZW50KS5zdGFydExpbmU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXAgPSBlbmRPbkJhc2VMaW5lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwVG9FcERpciA9IGVwLnN1YnRyYWN0ZWQoc3ApLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BUb0VwRGlyLmRvdChsaW5lM2REaXIpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFN0YXJ0UG9pbnQgPSBzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hFbmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U3RhcnRQb2ludCA9IGlzUGxhdGZvcm0oc3RhaXJOZXh0U2VnbWVudCkgPyBlcCA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudDogc3RhaXJOZXh0U2VnbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZTNkSW5kOiBzdGFpck5leHRMaW5lM2RJbmQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0UG9pbnQ6IG5leHRTdGFydFBvaW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudDogY3VycmVudFNlZ21lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUzZEluZDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzdGFydFBvaW50OiBuZXh0U3RhcnRQb2ludCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBlbmQgdGhlIHBhdGNoIHdoaWNoIGlzIGVuZCB3aXRoIHN0YWlyIGNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlscy5wdXNoKGhhbmRyYWlsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbCA9IHsgcmFpbDogW10sIGNvbHVtbnM6IFtdIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmlzaXRlZFJlY29yZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2l0ZWRSZWNvcmQucmlnaHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChwdXNoRW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBsZXQgY3VycmVudENvcm5lclNpZGVXaWR0aCA9IGxlZnQgPyBzdGFydFdpZHRoIDogZW5kV2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBsZXQgY3VycmVudFNpZGVDb3JuZXJTdGFydCA9IGxlZnQgPyBzdGFydCA6IGVuZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVwIGlzIHJldXNlZCB3aGVuIHB1c2hFbmRcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wVGFpbERpc3RhbmNlID0gbGVmdCA/IDAgOiBzdGVwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxlZnQgJiYgaXNMZWZ0U3RhaXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcCA9IHN0YXJ0LmFkZGVkKGxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMiAtIG9mZnNldExlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29ybmVyU3RhcnRIZWlnaHQgPSBsZWZ0ID8gc3RhcnRIZWlnaHQgOiBlbmRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3JuZXJFbmQgPSBlcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcm5lckRpc3RhbmNlID0gc3AuZGlzdGFuY2VUbyhjb3JuZXJFbmQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWxvbmcgY29ybmVyQmFzZURpclxuICAgICAgICAgICAgICAgICAgICAgICAgY29ybmVyU3BUb0VwRGlyID0gY29ybmVyRW5kLnN1YnRyYWN0ZWQoc3ApLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcm5lck9mZnNldERpciA9IERpcmVjdGlvblouY3Jvc3MoY29ybmVyU3BUb0VwRGlyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcm5lckFkZGl0aW9uYWxIZWlnaHQgPSBsZWZ0ICYmICFpc1JpZ2h0U3RhaXIgJiYgdXB3YXJkID8gc3RlcEhlaWdodCA6ICghbGVmdCAmJiAhdXB3YXJkID8gLXN0ZXBIZWlnaHQgOiAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvcm5lclNwVG9FcERpciA9IGNvcm5lckVuZC5zdWJ0cmFjdGVkKHNwKS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb3JuZXJPZmZzZXREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKGNvcm5lclNwVG9FcERpcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAodGVtcFRhaWxEaXN0YW5jZSA8IGNvcm5lckRpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYm90dG9tUG9pbnQgPSBzcC5hZGRlZChjb3JuZXJTcFRvRXBEaXIubXVsdGlwbGllZCh0ZW1wVGFpbERpc3RhbmNlKSkuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGNvcm5lclN0YXJ0SGVpZ2h0ICsgY29ybmVyQWRkaXRpb25hbEhlaWdodCkpLmFkZGVkKGNvcm5lck9mZnNldERpci5tdWx0aXBsaWVkKG9mZnNldExlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsLmNvbHVtbnMucHVzaChbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbVBvaW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b21Qb2ludC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcFRhaWxEaXN0YW5jZSArPSBzdGVwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdEJvdHRvbVBvaW50ID0gZXAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGNvcm5lclN0YXJ0SGVpZ2h0ICsgY29ybmVyQWRkaXRpb25hbEhlaWdodCkpLmFkZGVkKGNvcm5lck9mZnNldERpci5tdWx0aXBsaWVkKG9mZnNldExlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgbGFzdEJvdHRvbVBvaW50ID0gZXAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGxlZnQgPyBlbmRIZWlnaHQgOiBzdGFydEhlaWdodCkpLmFkZGVkKGNvcm5lck9mZnNldERpci5tdWx0aXBsaWVkKG9mZnNldExlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxlZnQgJiYgaXNSaWdodFN0YWlyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWwucmFpbC5wdXNoKHNwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChjb3JuZXJTdGFydEhlaWdodCArIGhlaWdodCArIGNvcm5lckFkZGl0aW9uYWxIZWlnaHQpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwdXNoIHJhaWxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsLnJhaWwucHVzaChsYXN0Qm90dG9tUG9pbnQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoY29ybmVyRGlzdGFuY2UgLSB0ZW1wVGFpbERpc3RhbmNlICsgc3RlcCkgPiBzdGVwVG9sZXJhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWwuY29sdW1ucy5wdXNoKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdEJvdHRvbVBvaW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0Qm90dG9tUG9pbnQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3VycmVudCA9IG5leHQ7XG4gICAgICAgICAgICBpZiAoIWN1cnJlbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHVuVmlzaXRlZC5zaXplKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoZVNlZ21lbnQgPSBbLi4udW5WaXNpdGVkLnZhbHVlcygpXVswXTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudDogdGhlU2VnbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lM2RJbmQ6IGdldFNlZ21lbnRTdGFydEFuZEJhc2VMaW5lM2QodGhlU2VnbWVudCwgc2VnbWVudHMpLnN0YXJ0TGluZS5saW5lM2RJbmQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGhhbmRyYWlscztcbiAgICB9XG59XG5mdW5jdGlvbiBnZW5lcmF0ZVRlbXBMaW5lc0xvb3AodmVydGV4Q291bnQpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogdmVydGV4Q291bnQgfSkubWFwKChfLCBpKSA9PiBbaSwgaSA9PT0gdmVydGV4Q291bnQgLSAxID8gMCA6IGkgKyAxXSk7XG59XG5mdW5jdGlvbiBnZXRTZWdtZW50U3RhcnRBbmRCYXNlTGluZTNkKHNlZ21lbnQsIHNlZ21lbnRzLCBiYXNlU2VnbWVudCkge1xuICAgIGNvbnN0IHsgc3RhcnQsIHBhcmFtOiB7IHR5cGUsIHN0YXJ0V2lkdGggfSwgY29tcG9uZW50RGlyZWN0aW9uVHlwZSwgbW9sZFNoYXBlOiB7IHRlbXBMaW5lcywgdmVydGljZXMgfSwgYmFzZUNvbXBvbmVudCB9ID0gc2VnbWVudDtcbiAgICBsZXQgc3RhcnRMaW5lM2RJbmQgPSAwO1xuICAgIC8vIDUgZWRnZXNcbiAgICBpZiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSAmJiBjb21wb25lbnREaXJlY3Rpb25UeXBlID09PSBDb21wb25lbnREaXJlY3Rpb25UeXBlLlJpZ2h0RnJvbnQgJiYgdGVtcExpbmVzLmxlbmd0aCA+IDQpIHtcbiAgICAgICAgc3RhcnRMaW5lM2RJbmQgPSAxO1xuICAgIH1cbiAgICBjb25zdCBzdGFydExpbmUzZCA9IHRlbXBMaW5lc1tzdGFydExpbmUzZEluZF07XG4gICAgY29uc3Qgc3RhcnRMaW5lM2RTdGFydCA9IHZlcnRpY2VzW3N0YXJ0TGluZTNkWzBdXTtcbiAgICBjb25zdCBzdGFydExpbmUzZEVuZCA9IHZlcnRpY2VzW3N0YXJ0TGluZTNkWzFdXTtcbiAgICBjb25zdCBzdGFydExpbmUzZERpciA9IHN0YXJ0TGluZTNkRW5kLnN1YnRyYWN0ZWQoc3RhcnRMaW5lM2RTdGFydCkubm9ybWFsaXplZCgpO1xuICAgIGxldCBiYXNlTGluZTNkSW5kID0gKGJhc2VDb21wb25lbnQgPT09IG51bGwgfHwgYmFzZUNvbXBvbmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmFzZUNvbXBvbmVudC5jb21wb25lbnRJbmRleCkgfHwgMDtcbiAgICBsZXQgYmFzZUxpbmUzZCA9IFsuLi5zdGFydExpbmUzZF0ucmV2ZXJzZSgpO1xuICAgIGxldCBiYXNlTGluZTNkU3RhcnQgPSB2ZXJ0aWNlc1tzdGFydExpbmUzZFsxXV07XG4gICAgbGV0IGJhc2VMaW5lM2RFbmQgPSB2ZXJ0aWNlc1tzdGFydExpbmUzZFswXV07XG4gICAgbGV0IGJhc2VMaW5lM2REaXIgPSBzdGFydExpbmUzZERpci5yZXZlcnNlZCgpO1xuICAgIDtcbiAgICBpZiAoIWJhc2VTZWdtZW50ICYmIGJhc2VDb21wb25lbnQpIHtcbiAgICAgICAgYmFzZVNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleChzZWdtZW50cywgYmFzZUNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgfVxuICAgIGlmIChiYXNlU2VnbWVudCkge1xuICAgICAgICBjb25zdCB7IG1vbGRTaGFwZTogeyB2ZXJ0aWNlczogYmFzZVZlcnRpY2VzLCB0ZW1wTGluZXM6IGJhc2VUZW1wTGluZXMgfSB9ID0gYmFzZVNlZ21lbnQ7XG4gICAgICAgIGJhc2VMaW5lM2QgPSBiYXNlU2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtID8gYmFzZVRlbXBMaW5lc1soYmFzZUNvbXBvbmVudCA9PT0gbnVsbCB8fCBiYXNlQ29tcG9uZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBiYXNlQ29tcG9uZW50LmxpbmUzZEluZGV4KSB8fCAwXSA6IFsuLi5iYXNlVGVtcExpbmVzW2Jhc2VUZW1wTGluZXMubGVuZ3RoIC0gMV1dLnJldmVyc2UoKTtcbiAgICAgICAgYmFzZUxpbmUzZFN0YXJ0ID0gYmFzZVZlcnRpY2VzW2Jhc2VMaW5lM2RbMF1dO1xuICAgICAgICBiYXNlTGluZTNkRW5kID0gYmFzZVZlcnRpY2VzW2Jhc2VMaW5lM2RbMV1dO1xuICAgICAgICBiYXNlTGluZTNkRGlyID0gYmFzZUxpbmUzZEVuZC5zdWJ0cmFjdGVkKGJhc2VMaW5lM2RTdGFydCkubm9ybWFsaXplZCgpO1xuICAgIH1cbiAgICBsZXQgc3RhcnRPbkJhc2VMaW5lID0gc3RhcnRMaW5lM2RTdGFydDtcbiAgICBsZXQgZW5kT25CYXNlTGluZSA9IHN0YXJ0TGluZTNkRW5kO1xuICAgIGlmICh0eXBlICE9PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XG4gICAgICAgIHN0YXJ0T25CYXNlTGluZSA9IHN0YXJ0LmFkZGVkKGJhc2VMaW5lM2REaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpO1xuICAgICAgICBlbmRPbkJhc2VMaW5lID0gc3RhcnQuYWRkZWQoYmFzZUxpbmUzZERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBzdGFydExpbmU6IHsgbGluZTNkSW5kOiBzdGFydExpbmUzZEluZCwgbGluZTNkOiBzdGFydExpbmUzZCwgZGlyOiBzdGFydExpbmUzZERpciwgc3RhcnQ6IHN0YXJ0TGluZTNkU3RhcnQsIGVuZDogc3RhcnRMaW5lM2RFbmQsIHN0YXJ0T25CYXNlTGluZSwgZW5kT25CYXNlTGluZSB9LFxuICAgICAgICBiYXNlTGluZTogeyBsaW5lM2RJbmQ6IGJhc2VMaW5lM2RJbmQsIGxpbmUzZDogYmFzZUxpbmUzZCwgZGlyOiBiYXNlTGluZTNkRGlyLCBzdGFydDogYmFzZUxpbmUzZFN0YXJ0LCBlbmQ6IGJhc2VMaW5lM2RFbmQgfSxcbiAgICB9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzUGxhdGZvcm0oc2VnbWVudCkge1xuICAgIHJldHVybiBzZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm07XG59XG5leHBvcnQgZnVuY3Rpb24gaXNDaXJjdWxhclN0YWlyKHNlZ21lbnQpIHtcbiAgICByZXR1cm4gc2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLkNpcmN1bGFyU3RhaXI7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNTdHJhaWdodFN0YWlyKHNlZ21lbnQpIHtcbiAgICByZXR1cm4gc2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlN0cmFpZ2h0U3RhaXI7XG59XG4iLCJleHBvcnQgY29uc3QgU3RhaXJNb2RlbEtleSA9ICdEU01vZGVsJztcbmV4cG9ydCBjb25zdCBNb2RlbFZhbHVlID0gJzEnO1xuZXhwb3J0IGNvbnN0IEhhbmRyYWlsTW9kZWxLZXkgPSAnSGFuZHJhaWwnO1xuZXhwb3J0IGNvbnN0IFJhaWxNb2RlbEtleSA9ICdSYWlsJztcbmV4cG9ydCBjb25zdCBDb2x1bW5Nb2RlbEtleSA9ICdDb2x1bW4nO1xuLy8gZXhwb3J0IGNvbnN0IFN0YWlyS2V5ID0gJ0RTU3RhaXInO1xuLy8gZXhwb3J0IGNvbnN0IFBsYXRmb3JtS2V5ID0gJ0RTUGxhdGZvcm0nO1xuZXhwb3J0IGNvbnN0IFN0YWlyUGFyYW1LZXkgPSAnU1BhcmFtJztcbmV4cG9ydCBjb25zdCBDb21wb25lbnRQYXJhbUtleSA9ICdDUGFyYW0nO1xuZXhwb3J0IGNvbnN0IFN0YWlyTWF0ZXJpYWxLZXkgPSAnU01hdCc7XG5leHBvcnQgY29uc3QgUGxhdGZvcm1NYXRlcmlhbEtleSA9ICdQTWF0JztcbmV4cG9ydCBjb25zdCBSYWlsTWF0ZXJpYWxLZXkgPSAnSFJNYXQnO1xuZXhwb3J0IGNvbnN0IENvbHVtbk1hdGVyaWFsS2V5ID0gJ0hDTWF0JztcbmV4cG9ydCBjb25zdCBDb21wb25lbnRNYXRlcmlhbEtleSA9ICdDTWF0Jztcbi8vIHN0YXJ0SGVpZ2h0IGFuZCBlbmRIZWlnaHQgY2FjaGVkIGluIHN0YXJ0IGFuZCBlbmRcbmV4cG9ydCBjb25zdCBDb21wb25lbnRJbmRleEtleSA9ICdJbmQnO1xuZXhwb3J0IGNvbnN0IFN0YXJ0RW5kS2V5ID0gJ1NUb0UnO1xuZXhwb3J0IGNvbnN0IEJhc2VMaW5lU2VnM2RLZXkgPSAnQmFzZUxpbmUnO1xuZXhwb3J0IGNvbnN0IEJhc2VDb21wb25lbnRLZXkgPSAnQmFzZUNvbXBvbmVudCc7XG5leHBvcnQgY29uc3QgQ2lyY2xlVGFuZ2VudEtleSA9ICdDaXJjbGVUYW5nZW50JztcbmV4cG9ydCBjb25zdCBEZWxpbWl0ZXIgPSAnJic7XG5leHBvcnQgY29uc3QgQ29vcmREZWxpbWl0ZXIgPSAnLCc7XG5leHBvcnQgY29uc3QgQmFzZUxpbmUzZERlbGltaXRlciA9ICdfJztcbmNvbnN0IFByb2RNYXRlcmlhbHMgPSB7XG4gICAgU3RhaXI6IHsgYmdJZDogJzNGTzRMSEVSQlBQWScsIG1hdGVyaWFsSWQ6ICc1OTcyZTk5M2FhMDFmMzU4NWY1MWRlY2InIH0sXG4gICAgLy8gU3RhaXI6IHsgYmdJZDogJzNGTzRBVEtFQ0xLSScsIG1hdGVyaWFsSWQ6ICc2MTY4ZjQ1NGNkZDI1ZTAwMDE3ZDc1ZDAnIH0sXG4gICAgUGxhdGZvcm06IHsgYmdJZDogJzNGTzQ0VDdNWUZBNScsIG1hdGVyaWFsSWQ6ICc2NDU2MmFmZDZmYmMzYjAwMDFhMzI1MWMnIH0sXG4gICAgSGFuZHJhaWw6IHtcbiAgICAgICAgcmFpbDogeyBiZ0lkOiAnM0ZPNExIRVJFN05QJywgbWF0ZXJpYWxJZDogJzU5NzJlOGQ3YWEwMWYzNTg1ZjUxZGU5NycgfSxcbiAgICAgICAgY29sdW1uOiB7IGJnSWQ6ICczRk80TEhFUkU3TlAnLCBtYXRlcmlhbElkOiAnNTk3MmU4ZDdhYTAxZjM1ODVmNTFkZTk3JyB9LFxuICAgIH0sXG59O1xuY29uc3QgRGV2TWF0ZXJpYWxzID0ge1xuICAgIFN0YWlyOiB7IGJnSWQ6ICczRk80SDJENzNKRk8nLCBtYXRlcmlhbElkOiAnNThhZjk2MWI0YTRkMmM0ZjhhYTJiMWRhJyB9LFxuICAgIC8vIFN0YWlyOiB7IGJnSWQ6ICczRk80QVRLRUNMS0knLCBtYXRlcmlhbElkOiAnNjE2OGY0NTRjZGQyNWUwMDAxN2Q3NWQwJyB9LFxuICAgIFBsYXRmb3JtOiB7IGJnSWQ6ICczRk80SDJENkNRTVknLCBtYXRlcmlhbElkOiAnNTgxNmZlZjk4NWRhNTY2YTFiMjhhOTQ0JyB9LFxuICAgIEhhbmRyYWlsOiB7XG4gICAgICAgIHJhaWw6IHsgYmdJZDogJzNGTzRIMkQ2SDhTQicsIG1hdGVyaWFsSWQ6ICc1OGFmYjNhYjVjMjZhMDczYjM4OWE5NWYnIH0sXG4gICAgICAgIGNvbHVtbjogeyBiZ0lkOiAnM0ZPNEdESzVFWERDJywgbWF0ZXJpYWxJZDogJzVlNTMyZmI0MjAxNDAyMDAwMWNjNDg4OScgfSxcbiAgICB9LFxufTtcbmV4cG9ydCBjb25zdCBQcmVzZXRNYXRlcmlhbHMgPSAod2luZG93Lm9yaWdpbiB8fCAnJykuaW5jbHVkZXMoJ3NpdCcpID8gRGV2TWF0ZXJpYWxzIDogUHJvZE1hdGVyaWFscztcbmV4cG9ydCB2YXIgQ29tcG9uZW50UGFyYW1UeXBlO1xuKGZ1bmN0aW9uIChDb21wb25lbnRQYXJhbVR5cGUpIHtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIb3Jpem9udGFsU3RlcFwiXSA9IFwiaG9yaXpvbnRhbFN0ZXBcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJWZXJ0aWNhbFN0ZXBcIl0gPSBcInZlcnRpY2FsU3RlcFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIlN0YXJ0V2lkdGhcIl0gPSBcInN0YXJ0V2lkdGhcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJFbmRXaWR0aFwiXSA9IFwiZW5kV2lkdGhcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJTdGVwUHJvcG9ydGlvbmFsXCJdID0gXCJzdGVwUHJvcG9ydGlvbmFsXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiV2lkdGhQcm9wb3J0aW9uYWxcIl0gPSBcIndpZHRoUHJvcG9ydGlvbmFsXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiUGxhdGZvcm1MZW5ndGhcIl0gPSBcInBsYXRmb3JtTGVuZ3RoXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiUGxhdGZvcm1MZW5ndGhMb2NrZWRcIl0gPSBcInBsYXRmb3JtTGVuZ3RoTG9ja2VkXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiVHlwZVwiXSA9IFwidHlwZVwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIlVwd2FyZFwiXSA9IFwidXB3YXJkXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiUGxhdGZvcm1UaGlja25lc3NcIl0gPSBcInBsYXRmb3JtVGhpY2tuZXNzXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiQ29tcG9uZW50TWF0ZXJpYWxcIl0gPSBcImNvbXBvbmVudE1hdGVyaWFsXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiU3RhaXJNYXRlcmlhbFwiXSA9IFwic3RhaXJNYXRlcmlhbFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIlBsYXRmb3JtTWF0ZXJpYWxcIl0gPSBcInBsYXRmb3JtTWF0ZXJpYWxcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIYW5kcmFpbFwiXSA9IFwiaGFuZHJhaWxcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIYW5kcmFpbEhlaWdodFwiXSA9IFwiaGFuZHJhaWxIZWlnaHRcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIYW5kcmFpbFJhaWxUeXBlXCJdID0gXCJoYW5kcmFpbFJhaWxUeXBlXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSGFuZHJhaWxSYWlsUmFkaXVzXCJdID0gXCJoYW5kcmFpbFJhaWxSYWRpdXNcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIYW5kcmFpbFJhaWxXaWR0aFwiXSA9IFwiaGFuZHJhaWxSYWlsV2lkdGhcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIYW5kcmFpbFJhaWxIZWlnaHRcIl0gPSBcImhhbmRyYWlsUmFpbEhlaWdodFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsUmFpbE1hdGVyaWFsXCJdID0gXCJSYWlsTWF0ZXJpYWxcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIYW5kcmFpbENvbHVtblR5cGVcIl0gPSBcImhhbmRyYWlsQ29sdW1uVHlwZVwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsQ29sdW1uU3RlcFwiXSA9IFwiaGFuZHJhaWxDb2x1bW5TdGVwXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSGFuZHJhaWxDb2x1bW5SYWRpdXNcIl0gPSBcImhhbmRyYWlsQ29sdW1uUmFkaXVzXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSGFuZHJhaWxDb2x1bW5XaWR0aFwiXSA9IFwiaGFuZHJhaWxDb2x1bW5XaWR0aFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsQ29sdW1uSGVpZ2h0XCJdID0gXCJoYW5kcmFpbENvbHVtbkhlaWdodFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsQ29sdW1uTWF0ZXJpYWxcIl0gPSBcIkNvbHVtbk1hdGVyaWFsXCI7XG59KShDb21wb25lbnRQYXJhbVR5cGUgfHwgKENvbXBvbmVudFBhcmFtVHlwZSA9IHt9KSk7XG4vLyBpbnRlcmZhY2UgUGFyYW1TZXR0aW5ncyB7XG4vLyAgICAgbWluOiBudW1iZXI7XG4vLyAgICAgbWF4OiBudW1iZXI7XG4vLyAgICAgc3RlcDogbnVtYmVyO1xuLy8gICAgIHVuaXQ6IHN0cmluZztcbi8vICAgICBwcmVjaXNpb246IG51bWJlcjtcbi8vIH1cbmV4cG9ydCB2YXIgQ29tcG9uZW50VHlwZTtcbihmdW5jdGlvbiAoQ29tcG9uZW50VHlwZSkge1xuICAgIENvbXBvbmVudFR5cGVbQ29tcG9uZW50VHlwZVtcIlN0cmFpZ2h0U3RhaXJcIl0gPSAwXSA9IFwiU3RyYWlnaHRTdGFpclwiO1xuICAgIENvbXBvbmVudFR5cGVbQ29tcG9uZW50VHlwZVtcIkNpcmN1bGFyU3RhaXJcIl0gPSAxXSA9IFwiQ2lyY3VsYXJTdGFpclwiO1xuICAgIENvbXBvbmVudFR5cGVbQ29tcG9uZW50VHlwZVtcIlBsYXRmb3JtXCJdID0gMl0gPSBcIlBsYXRmb3JtXCI7XG59KShDb21wb25lbnRUeXBlIHx8IChDb21wb25lbnRUeXBlID0ge30pKTtcbmV4cG9ydCB2YXIgUmFpbFR5cGU7XG4oZnVuY3Rpb24gKFJhaWxUeXBlKSB7XG4gICAgUmFpbFR5cGVbUmFpbFR5cGVbXCJDaXJjbGVcIl0gPSAwXSA9IFwiQ2lyY2xlXCI7XG4gICAgUmFpbFR5cGVbUmFpbFR5cGVbXCJSZWN0XCJdID0gMV0gPSBcIlJlY3RcIjtcbiAgICBSYWlsVHlwZVtSYWlsVHlwZVtcIkN1c3RvbVwiXSA9IDk5XSA9IFwiQ3VzdG9tXCI7XG59KShSYWlsVHlwZSB8fCAoUmFpbFR5cGUgPSB7fSkpO1xuZXhwb3J0IHZhciBDb2x1bW5UeXBlO1xuKGZ1bmN0aW9uIChDb2x1bW5UeXBlKSB7XG4gICAgQ29sdW1uVHlwZVtDb2x1bW5UeXBlW1wiQ2lyY2xlXCJdID0gMF0gPSBcIkNpcmNsZVwiO1xuICAgIENvbHVtblR5cGVbQ29sdW1uVHlwZVtcIlJlY3RcIl0gPSAxXSA9IFwiUmVjdFwiO1xuICAgIENvbHVtblR5cGVbQ29sdW1uVHlwZVtcIkN1c3RvbVwiXSA9IDk5XSA9IFwiQ3VzdG9tXCI7XG59KShDb2x1bW5UeXBlIHx8IChDb2x1bW5UeXBlID0ge30pKTtcbmV4cG9ydCBjb25zdCBDb21wb25lbnRQYXJhbVNldHRpbmdzID0ge1xuICAgIGhvcml6b250YWxTdGVwOiB7IHRpdGxlOiBcIuatpemVv1wiLCBtaW46IDEsIG1heDogMTAwMDAwLCBzdGVwOiAyMCwgdW5pdDogJ+mVvycsIHByZWNpc2lvbjogMCwgfSxcbiAgICB2ZXJ0aWNhbFN0ZXA6IHsgdGl0bGU6IFwi5q2l6ZW/XCIsIG1pbjogMSwgbWF4OiAxMDAwMDAsIHN0ZXA6IDIwLCB1bml0OiAn6auYJywgcHJlY2lzaW9uOiAwLCB9LFxuICAgIHN0YXJ0V2lkdGg6IHsgdGl0bGU6IFwi5a695bqmXCIsIG1pbjogMSwgbWF4OiAxMDAwMDAsIHN0ZXA6IDUwLCB1bml0OiAn6LW3JywgcHJlY2lzaW9uOiAwLCB9LFxuICAgIGVuZFdpZHRoOiB7IHRpdGxlOiBcIuWuveW6plwiLCBtaW46IDEsIG1heDogMTAwMDAwLCBzdGVwOiA1MCwgdW5pdDogJ+e7iCcsIHByZWNpc2lvbjogMCwgfSxcbiAgICBwbGF0Zm9ybUxlbmd0aDogeyB0aXRsZTogXCLplb/luqZcIiwgbWluOiAxMDAsIG1heDogMTAwMDAwLCBzdGVwOiA1MCwgdW5pdDogJycsIHByZWNpc2lvbjogMCwgfSxcbiAgICB0eXBlOiB7XG4gICAgICAgIC8vIHJhZGlvVmFsdWVzOiBbQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyLCBDb21wb25lbnRUeXBlLkNpcmN1bGFyU3RhaXIsIENvbXBvbmVudFR5cGUuUGxhdGZvcm1dLFxuICAgICAgICAvLyB0ZXh0czogW1wi55u06Zi2XCIsIFwi5peL6L2s6Zi25qKvXCIsIFwi5bmz5Y+wXCJdLFxuICAgICAgICB0aXRsZTogXCLnsbvlnotcIixcbiAgICAgICAgcmFkaW9PcHRpb25zOiBbXG4gICAgICAgICAgICB7IHZhbHVlOiBDb21wb25lbnRUeXBlLlN0cmFpZ2h0U3RhaXIsIHRleHQ6IFwi55u06Zi2XCIgfSxcbiAgICAgICAgICAgIHsgdmFsdWU6IENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpciwgdGV4dDogXCLml4vovazpmLbmoq9cIiB9LFxuICAgICAgICAgICAgeyB2YWx1ZTogQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSwgdGV4dDogXCLlubPlj7BcIiB9LFxuICAgICAgICBdXG4gICAgfSxcbiAgICB1cHdhcmQ6IHtcbiAgICAgICAgLy8gcmFkaW9WYWx1ZXM6IFsxLCAwXSxcbiAgICAgICAgLy8gdGV4dHM6IFtcIuWQkeS4ilwiLCBcIuWQkeS4i1wiXSxcbiAgICAgICAgdGl0bGU6IFwi5pa55ZCRXCIsXG4gICAgICAgIHJhZGlvT3B0aW9uczogW1xuICAgICAgICAgICAgeyB2YWx1ZTogdHJ1ZSwgdGV4dDogXCLlkJHkuIpcIiB9LFxuICAgICAgICAgICAgeyB2YWx1ZTogZmFsc2UsIHRleHQ6IFwi5ZCR5LiLXCIgfSxcbiAgICAgICAgXVxuICAgIH0sXG4gICAgcGxhdGZvcm1UaGlja25lc3M6IHsgdGl0bGU6IFwi5Y6a5bqmXCIsIG1pbjogMSwgbWF4OiAxMDAwMDAsIHN0ZXA6IDEwLCB1bml0OiAnJywgcHJlY2lzaW9uOiAwLCB9LFxuICAgIG1hdGVyaWFsOiB7IHRpdGxlOiAn5p2Q6LSoJyB9LFxuICAgIHN0YWlyTWF0ZXJpYWw6IHsgdGl0bGU6ICfpmLbmoq/mnZDotKgnIH0sXG4gICAgcGxhdGZvcm1NYXRlcmlhbDogeyB0aXRsZTogJ+W5s+WPsOadkOi0qCcgfSxcbiAgICBoYW5kcmFpbDoge1xuICAgICAgICB0aXRsZTogJ+WQr+eUqOagj+adhicsXG4gICAgICAgIGhlaWdodDogeyB0aXRsZTogXCLpq5jluqZcIiwgbWluOiAxLCBtYXg6IDEwMDAwMCwgc3RlcDogMTAsIHVuaXQ6ICcnLCBwcmVjaXNpb246IDAsIH0sXG4gICAgICAgIHJhaWw6IHtcbiAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogXCLmoLflvI9cIixcbiAgICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IFJhaWxUeXBlLkNpcmNsZSwgbGFiZWw6IFwi5ZyG5b2iXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogUmFpbFR5cGUuUmVjdCwgbGFiZWw6IFwi5pa55b2iXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgLy8geyB2YWx1ZTogUmFpbFR5cGUuQ3VzdG9tLCBsYWJlbDogXCLmi77lj5ZcIiB9LFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGNvbHVtbjoge1xuICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIuagt+W8j1wiLFxuICAgICAgICAgICAgICAgIHNlbGVjdE9wdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogQ29sdW1uVHlwZS5DaXJjbGUsIGxhYmVsOiBcIuWchuW9olwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IENvbHVtblR5cGUuUmVjdCwgbGFiZWw6IFwi5pa55b2iXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgLy8geyB2YWx1ZTogQ29sdW1uVHlwZS5DdXN0b20sIGxhYmVsOiBcIuaLvuWPllwiIH0sXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0ZXA6IHsgdGl0bGU6IFwi6Ze06ZqUXCIsIG1pbjogMSwgbWF4OiAxMDAwMDAsIHN0ZXA6IDEwLCB1bml0OiAnJywgcHJlY2lzaW9uOiAwLCB9LFxuICAgICAgICB9LFxuICAgICAgICBjb21wb25lbnRQYXJhbToge1xuICAgICAgICAgICAgcmFkaXVzOiB7IHRpdGxlOiBcIuWNiuW+hFwiLCBtaW46IDEsIG1heDogMTAwMDAwLCBzdGVwOiAxMCwgdW5pdDogJycsIHByZWNpc2lvbjogMCwgfSxcbiAgICAgICAgICAgIHdpZHRoOiB7IHRpdGxlOiBcIuWuveW6plwiLCBtaW46IDEsIG1heDogMTAwMDAwLCBzdGVwOiAxMCwgdW5pdDogJycsIHByZWNpc2lvbjogMCwgfSxcbiAgICAgICAgICAgIGhlaWdodDogeyB0aXRsZTogXCLpq5jluqZcIiwgbWluOiAxLCBtYXg6IDEwMDAwMCwgc3RlcDogMTAsIHVuaXQ6ICcnLCBwcmVjaXNpb246IDAsIH0sXG4gICAgICAgIH1cbiAgICB9XG59O1xuZXhwb3J0IGZ1bmN0aW9uIGdldENvbXBvbmVudFRpdGxlKGNvbXBvbmVudFR5cGUpIHtcbiAgICBpZiAoY29tcG9uZW50VHlwZSA9PT0gQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyKSB7XG4gICAgICAgIHJldHVybiAn6Zi2JztcbiAgICB9XG4gICAgZWxzZSBpZiAoY29tcG9uZW50VHlwZSA9PT0gQ29tcG9uZW50VHlwZS5DaXJjdWxhclN0YWlyKSB7XG4gICAgICAgIHJldHVybiAn6Zi2JztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiAn5Y+wJztcbiAgICB9XG59XG5leHBvcnQgY29uc3QgSGFuZHJhaWxEZWZhdWx0T2Zmc2V0TGVuZ3RoID0gNDA7XG5leHBvcnQgY29uc3QgRGVmYXVsdFN0YWlyUGFyYW0gPSB7XG4gICAgaG9yaXpvbnRhbFN0ZXA6IDIwMCxcbiAgICB2ZXJ0aWNhbFN0ZXA6IDIwMCxcbiAgICBzdGFydFdpZHRoOiAxMDAwLFxuICAgIGVuZFdpZHRoOiAxMDAwLFxuICAgIHVwd2FyZDogdHJ1ZSxcbiAgICBwbGF0Zm9ybVRoaWNrbmVzczogMTAwLFxuICAgIHN0YWlyTWF0ZXJpYWw6IFByZXNldE1hdGVyaWFscy5TdGFpcixcbiAgICBwbGF0Zm9ybU1hdGVyaWFsOiBQcmVzZXRNYXRlcmlhbHMuUGxhdGZvcm0sXG4gICAgaGFuZHJhaWw6IHtcbiAgICAgICAgc3VwcG9ydDogdHJ1ZSxcbiAgICAgICAgaGVpZ2h0OiA0MDAsXG4gICAgICAgIHJhaWw6IHtcbiAgICAgICAgICAgIHR5cGU6IFJhaWxUeXBlLkNpcmNsZSxcbiAgICAgICAgICAgIHBhcmFtOiB7IHJhZGl1czogMTIsIHdpZHRoOiA0MCwgaGVpZ2h0OiAzMCwgfSxcbiAgICAgICAgICAgIG1hdGVyaWFsOiBQcmVzZXRNYXRlcmlhbHMuSGFuZHJhaWwucmFpbCxcbiAgICAgICAgfSxcbiAgICAgICAgY29sdW1uOiB7XG4gICAgICAgICAgICB0eXBlOiBDb2x1bW5UeXBlLkNpcmNsZSxcbiAgICAgICAgICAgIHN0ZXA6IDUwMCxcbiAgICAgICAgICAgIHBhcmFtOiB7IHJhZGl1czogOCwgd2lkdGg6IDEyLCBoZWlnaHQ6IDEyLCB9LFxuICAgICAgICAgICAgbWF0ZXJpYWw6IFByZXNldE1hdGVyaWFscy5IYW5kcmFpbC5jb2x1bW4sXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBzdGVwUHJvcG9ydGlvbmFsOiB0cnVlLFxuICAgIHdpZHRoUHJvcG9ydGlvbmFsOiB0cnVlLFxufTtcbmV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0U3RhaXJQYXJhbSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBob3Jpem9udGFsU3RlcDogMjUwLFxuICAgICAgICB2ZXJ0aWNhbFN0ZXA6IDI1MCxcbiAgICAgICAgc3RhcnRXaWR0aDogMTAwMCxcbiAgICAgICAgZW5kV2lkdGg6IDEwMDAsXG4gICAgICAgIHVwd2FyZDogdHJ1ZSxcbiAgICAgICAgcGxhdGZvcm1UaGlja25lc3M6IDIwMCxcbiAgICAgICAgc3RhaXJNYXRlcmlhbDogUHJlc2V0TWF0ZXJpYWxzLlN0YWlyLFxuICAgICAgICBwbGF0Zm9ybU1hdGVyaWFsOiBQcmVzZXRNYXRlcmlhbHMuUGxhdGZvcm0sXG4gICAgICAgIGhhbmRyYWlsOiB7XG4gICAgICAgICAgICBzdXBwb3J0OiB0cnVlLFxuICAgICAgICAgICAgaGVpZ2h0OiA1MDAsXG4gICAgICAgICAgICByYWlsOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogUmFpbFR5cGUuQ2lyY2xlLFxuICAgICAgICAgICAgICAgIHBhcmFtOiB7IHJhZGl1czogMjAsIHdpZHRoOiA2MCwgaGVpZ2h0OiAzMCwgfSxcbiAgICAgICAgICAgICAgICBtYXRlcmlhbDogUHJlc2V0TWF0ZXJpYWxzLkhhbmRyYWlsLnJhaWwsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29sdW1uOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogQ29sdW1uVHlwZS5DaXJjbGUsXG4gICAgICAgICAgICAgICAgc3RlcDogNTAwLFxuICAgICAgICAgICAgICAgIHBhcmFtOiB7IHJhZGl1czogOCwgd2lkdGg6IDE2LCBoZWlnaHQ6IDE2LCB9LFxuICAgICAgICAgICAgICAgIG1hdGVyaWFsOiBQcmVzZXRNYXRlcmlhbHMuSGFuZHJhaWwuY29sdW1uLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgc3RlcFByb3BvcnRpb25hbDogdHJ1ZSxcbiAgICAgICAgd2lkdGhQcm9wb3J0aW9uYWw6IHRydWUsXG4gICAgfTtcbn1cbmV4cG9ydCBjb25zdCBEZWZhdWx0Q29tcG9uZW50UGFyYW0gPSB7XG4gICAgaW5kZXg6IDAsXG4gICAgaG9yaXpvbnRhbFN0ZXA6IERlZmF1bHRTdGFpclBhcmFtLmhvcml6b250YWxTdGVwLFxuICAgIHZlcnRpY2FsU3RlcDogRGVmYXVsdFN0YWlyUGFyYW0udmVydGljYWxTdGVwLFxuICAgIHN0YXJ0V2lkdGg6IERlZmF1bHRTdGFpclBhcmFtLnN0YXJ0V2lkdGgsXG4gICAgZW5kV2lkdGg6IERlZmF1bHRTdGFpclBhcmFtLmVuZFdpZHRoLFxuICAgIG9mZnNldFdpZHRoOiAwLFxuICAgIHdpdGhPZmZzZXQ6IGZhbHNlLFxuICAgIHBsYXRmb3JtTGVuZ3RoOiAyMDAwLFxuICAgIHR5cGU6IENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpcixcbiAgICB1cHdhcmQ6IERlZmF1bHRTdGFpclBhcmFtLnVwd2FyZCxcbiAgICBwbGF0Zm9ybVRoaWNrbmVzczogRGVmYXVsdFN0YWlyUGFyYW0ucGxhdGZvcm1UaGlja25lc3MsXG4gICAgc3RlcFByb3BvcnRpb25hbDogRGVmYXVsdFN0YWlyUGFyYW0uc3RlcFByb3BvcnRpb25hbCxcbiAgICB3aWR0aFByb3BvcnRpb25hbDogdHJ1ZSxcbiAgICBwbGF0Zm9ybUxlbmd0aExvY2tlZDogZmFsc2UsXG4gICAgLy8gc3RlcFR5cGU6IFN0ZXBUeXBlLk5vcm1hbCxcbiAgICAvLyBjb3JuZXJUeXBlOiBDb3JuZXJUeXBlLlJlY3RhbmdsZSxcbn07XG5leHBvcnQgdmFyIENvbXBvbmVudERpcmVjdGlvblR5cGU7XG4oZnVuY3Rpb24gKENvbXBvbmVudERpcmVjdGlvblR5cGUpIHtcbiAgICBDb21wb25lbnREaXJlY3Rpb25UeXBlW0NvbXBvbmVudERpcmVjdGlvblR5cGVbXCJGcm9udFwiXSA9IDBdID0gXCJGcm9udFwiO1xuICAgIENvbXBvbmVudERpcmVjdGlvblR5cGVbQ29tcG9uZW50RGlyZWN0aW9uVHlwZVtcIlJpZ2h0RnJvbnRcIl0gPSAxXSA9IFwiUmlnaHRGcm9udFwiO1xuICAgIENvbXBvbmVudERpcmVjdGlvblR5cGVbQ29tcG9uZW50RGlyZWN0aW9uVHlwZVtcIlJpZ2h0XCJdID0gMl0gPSBcIlJpZ2h0XCI7XG4gICAgQ29tcG9uZW50RGlyZWN0aW9uVHlwZVtDb21wb25lbnREaXJlY3Rpb25UeXBlW1wiTGVmdFwiXSA9IDNdID0gXCJMZWZ0XCI7XG4gICAgQ29tcG9uZW50RGlyZWN0aW9uVHlwZVtDb21wb25lbnREaXJlY3Rpb25UeXBlW1wiTGVmdEZyb250XCJdID0gNF0gPSBcIkxlZnRGcm9udFwiO1xufSkoQ29tcG9uZW50RGlyZWN0aW9uVHlwZSB8fCAoQ29tcG9uZW50RGlyZWN0aW9uVHlwZSA9IHt9KSk7XG5leHBvcnQgdmFyIENpcmN1bGFyU2lkZTtcbihmdW5jdGlvbiAoQ2lyY3VsYXJTaWRlKSB7XG4gICAgQ2lyY3VsYXJTaWRlW0NpcmN1bGFyU2lkZVtcIkxlZnRcIl0gPSAwXSA9IFwiTGVmdFwiO1xuICAgIENpcmN1bGFyU2lkZVtDaXJjdWxhclNpZGVbXCJSaWdodFwiXSA9IDFdID0gXCJSaWdodFwiO1xufSkoQ2lyY3VsYXJTaWRlIHx8IChDaXJjdWxhclNpZGUgPSB7fSkpO1xuZXhwb3J0IGZ1bmN0aW9uIGlzQXhpc1ZhbGlkKGF4aXMpIHtcbiAgICByZXR1cm4gYXhpcyA9PT0gXCJYXCIgLyogQXhpcy5YICovIHx8IGF4aXMgPT09IFwiLVhcIiAvKiBBeGlzLlhNaW51cyAqLyB8fCBheGlzID09PSBcIllcIiAvKiBBeGlzLlkgKi8gfHwgYXhpcyA9PT0gXCItWVwiIC8qIEF4aXMuWU1pbnVzICovIHx8IGF4aXMgPT09IFwiWlwiIC8qIEF4aXMuWiAqLyB8fCBheGlzID09PSBcIi1aXCIgLyogQXhpcy5aTWludXMgKi87XG59XG4iLCJpbXBvcnQgeyBkcmF3U3RhaXJzVG9vbCB9IGZyb20gXCIuL2luZGV4XCI7XG5pbXBvcnQgeyBEaXJlY3Rpb25YLCBEaXJlY3Rpb25ZLCBEaXJlY3Rpb25aIH0gZnJvbSBcIi4vY29uc3RzXCI7XG5pbXBvcnQgeyBDb2x1bW5UeXBlLCBDb29yZERlbGltaXRlciwgRGVmYXVsdENvbXBvbmVudFBhcmFtLCBEZWxpbWl0ZXIsIGdldERlZmF1bHRTdGFpclBhcmFtLCBSYWlsVHlwZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5leHBvcnQgZnVuY3Rpb24gaXNLQXJjaEZhY2UoZW50aXR5KSB7XG4gICAgcmV0dXJuICEhZW50aXR5ICYmIChlbnRpdHkuZ2V0VHlwZSgpID09PSBLQXJjaEZhY2VUeXBlLk5vblBsYW5hciB8fCBlbnRpdHkuZ2V0VHlwZSgpID09PSBLQXJjaEZhY2VUeXBlLlBsYW5hcik7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNLR3JvdXBJbnN0YW5jZShlbnRpdHkpIHtcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS0VudGl0eVR5cGUuR3JvdXBJbnN0YW5jZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0tGYWNlKGVudGl0eSkge1xuICAgIHJldHVybiAhIWVudGl0eSAmJiBlbnRpdHkuZ2V0VHlwZSgpID09PSBLRW50aXR5VHlwZS5GYWNlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzS0VkZ2UoZW50aXR5KSB7XG4gICAgcmV0dXJuICEhZW50aXR5ICYmIGVudGl0eS5nZXRUeXBlKCkgPT09IEtFbnRpdHlUeXBlLkVkZ2U7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNLVmVydGV4KGVudGl0eSkge1xuICAgIHJldHVybiAhIWVudGl0eSAmJiBlbnRpdHkuZ2V0VHlwZSgpID09PSBLRW50aXR5VHlwZS5WZXJ0ZXg7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNLQXV4aWxpYXJ5Qm91bmRlZEN1cnZlKGVudGl0eSkge1xuICAgIHJldHVybiAhIWVudGl0eSAmJiBlbnRpdHkuZ2V0VHlwZSgpID09PSBLRW50aXR5VHlwZS5BdXhpbGlhcnlCb3VuZGVkQ3VydmU7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNLQXV4aWxpYXJ5TGluZShlbnRpdHkpIHtcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS0VudGl0eVR5cGUuQXV4aWxpYXJ5TGluZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0tQbGFuZShlbnRpdHkpIHtcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS1N1cmZhY2VUeXBlLlBsYW5lO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzS0xpbmVTZWdtZW50M2QoZW50aXR5KSB7XG4gICAgcmV0dXJuICEhZW50aXR5ICYmICEhZW50aXR5LmRpcmVjdGlvbjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0tBcmMzZChlbnRpdHkpIHtcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgISFlbnRpdHkuY2lyY2xlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeU1hdGVyaWFsKG1hdGVyaWFsKSB7XG4gICAgbGV0IHZhbHVlID0gJyc7XG4gICAgaWYgKG1hdGVyaWFsLm1hdGVyaWFsSWQpIHtcbiAgICAgICAgdmFsdWUgKz0gYG1pZD0ke21hdGVyaWFsLm1hdGVyaWFsSWR9JHtEZWxpbWl0ZXJ9YDtcbiAgICB9XG4gICAgaWYgKG1hdGVyaWFsLmJnaWQpIHtcbiAgICAgICAgdmFsdWUgKz0gYGJpZD0ke21hdGVyaWFsLmJnaWR9JHtEZWxpbWl0ZXJ9YDtcbiAgICB9XG4gICAgaWYgKG1hdGVyaWFsLmltZ1VybCkge1xuICAgICAgICB2YWx1ZSArPSBgaW1nPSR7bWF0ZXJpYWwuaW1nVXJsfSR7RGVsaW1pdGVyfWA7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZS5zbGljZSgwLCB2YWx1ZS5sZW5ndGggLSAxKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZU1hdGVyaWFsKHZhbHVlKSB7XG4gICAgY29uc3QgbWF0ZXJpYWwgPSB7fTtcbiAgICBjb25zdCBpdGVtcyA9IHZhbHVlLnNwbGl0KERlbGltaXRlcik7XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgIGNvbnN0IGtleVZhbHVlID0gaXRlbS5zcGxpdCgnPScpO1xuICAgICAgICBpZiAoa2V5VmFsdWUubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGtleVZhbHVlWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWlkJzpcbiAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWwubWF0ZXJpYWxJZCA9IGtleVZhbHVlWzFdO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdiaWQnOlxuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbC5iZ2lkID0ga2V5VmFsdWVbMV07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2ltZyc6XG4gICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsLmltZ1VybCA9IGtleVZhbHVlWzFdO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBtYXRlcmlhbDtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5U3RhaXJQYXJhbShwYXJhbSkge1xuICAgIGxldCB2YWx1ZSA9ICcnO1xuICAgIHZhbHVlICs9IGBocz0ke3BhcmFtLmhvcml6b250YWxTdGVwfSR7RGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYHZzPSR7cGFyYW0udmVydGljYWxTdGVwfSR7RGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYHN3PSR7cGFyYW0uc3RhcnRXaWR0aH0ke0RlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGBldz0ke3BhcmFtLmVuZFdpZHRofSR7RGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYHVwPSR7cGFyYW0udXB3YXJkID8gMSA6IDB9JHtEZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgcHRrPSR7cGFyYW0ucGxhdGZvcm1UaGlja25lc3N9YDtcbiAgICBpZiAocGFyYW0uaGFuZHJhaWwuc3VwcG9ydCkge1xuICAgICAgICBjb25zdCB7IGhhbmRyYWlsOiB7IGhlaWdodCwgcmFpbCwgY29sdW1uIH0gfSA9IHBhcmFtO1xuICAgICAgICB2YWx1ZSArPSBgaGg9JHtoZWlnaHR9JHtEZWxpbWl0ZXJ9YDtcbiAgICAgICAgdmFsdWUgKz0gYGhydD0ke3JhaWwudHlwZX0ke0RlbGltaXRlcn1gO1xuICAgICAgICBpZiAocmFpbC50eXBlID09PSBSYWlsVHlwZS5DaXJjbGUgJiYgcmFpbC5wYXJhbS5yYWRpdXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFsdWUgKz0gYGhycj0ke3JhaWwucGFyYW0ucmFkaXVzfSR7RGVsaW1pdGVyfWA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocmFpbC50eXBlID09PSBSYWlsVHlwZS5SZWN0KSB7XG4gICAgICAgICAgICBpZiAocmFpbC5wYXJhbS53aWR0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgKz0gYGhydz0ke3JhaWwucGFyYW0ud2lkdGh9JHtEZWxpbWl0ZXJ9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyYWlsLnBhcmFtLmhlaWdodCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgKz0gYGhyaD0ke3JhaWwucGFyYW0uaGVpZ2h0fSR7RGVsaW1pdGVyfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFsdWUgKz0gYGhjdD0ke2NvbHVtbi50eXBlfSR7RGVsaW1pdGVyfWA7XG4gICAgICAgIHZhbHVlICs9IGBoY3M9JHtjb2x1bW4uc3RlcH0ke0RlbGltaXRlcn1gO1xuICAgICAgICBpZiAoY29sdW1uLnR5cGUgPT09IENvbHVtblR5cGUuQ2lyY2xlICYmIGNvbHVtbi5wYXJhbS5yYWRpdXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFsdWUgKz0gYGhjcj0ke2NvbHVtbi5wYXJhbS5yYWRpdXN9JHtEZWxpbWl0ZXJ9YDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb2x1bW4udHlwZSA9PT0gQ29sdW1uVHlwZS5SZWN0KSB7XG4gICAgICAgICAgICBpZiAoY29sdW1uLnBhcmFtLndpZHRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSArPSBgaGN3PSR7Y29sdW1uLnBhcmFtLndpZHRofSR7RGVsaW1pdGVyfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY29sdW1uLnBhcmFtLmhlaWdodCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgKz0gYGhjaD0ke2NvbHVtbi5wYXJhbS5oZWlnaHR9JHtEZWxpbWl0ZXJ9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWUuc2xpY2UoMCwgdmFsdWUubGVuZ3RoIC0gMSk7XG59XG5leHBvcnQgZnVuY3Rpb24gcGFyc2VTdGFpclBhcmFtKHZhbHVlKSB7XG4gICAgY29uc3QgcGFyYW0gPSBnZXREZWZhdWx0U3RhaXJQYXJhbSgpO1xuICAgIGNvbnN0IGl0ZW1zID0gdmFsdWUuc3BsaXQoRGVsaW1pdGVyKTtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgICAgY29uc3Qga2V5VmFsdWUgPSBpdGVtLnNwbGl0KCc9Jyk7XG4gICAgICAgIGlmIChrZXlWYWx1ZS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoa2V5VmFsdWVbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlICdocyc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmhvcml6b250YWxTdGVwID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd2cyc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnZlcnRpY2FsU3RlcCA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3cnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5zdGFydFdpZHRoID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdldyc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmVuZFdpZHRoID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd1cCc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnVwd2FyZCA9IGtleVZhbHVlWzFdID09PSAnMScgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3B0ayc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnBsYXRmb3JtVGhpY2tuZXNzID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdoaCc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmhhbmRyYWlsLmhlaWdodCA9IHBhcnNlRmxvYXQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdocnQnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5oYW5kcmFpbC5yYWlsLnR5cGUgPSBwYXJzZUZsb2F0KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnaHJyJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uaGFuZHJhaWwucmFpbC5wYXJhbS5yYWRpdXMgPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hydyc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmhhbmRyYWlsLnJhaWwucGFyYW0ud2lkdGggPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hyaCc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmhhbmRyYWlsLnJhaWwucGFyYW0uaGVpZ2h0ID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdoY3QnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5oYW5kcmFpbC5jb2x1bW4udHlwZSA9IHBhcnNlRmxvYXQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdoY3MnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5oYW5kcmFpbC5jb2x1bW4uc3RlcCA9IHBhcnNlRmxvYXQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdoY3InOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5oYW5kcmFpbC5jb2x1bW4ucGFyYW0ucmFkaXVzID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdoY3cnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5oYW5kcmFpbC5jb2x1bW4ucGFyYW0ud2lkdGggPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hjaCc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmhhbmRyYWlsLmNvbHVtbi5wYXJhbS5oZWlnaHQgPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHBhcmFtLnN0ZXBQcm9wb3J0aW9uYWwgPSB0cnVlO1xuICAgIHBhcmFtLndpZHRoUHJvcG9ydGlvbmFsID0gdHJ1ZTtcbiAgICByZXR1cm4gcGFyYW07XG59XG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5Q29tcG9uZW50UGFyYW0ocGFyYW0pIHtcbiAgICBsZXQgdmFsdWUgPSAnJztcbiAgICB2YWx1ZSArPSBgaW5kPSR7cGFyYW0uaW5kZXh9JHtEZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgaHM9JHtwYXJhbS5ob3Jpem9udGFsU3RlcH0ke0RlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGB2cz0ke3BhcmFtLnZlcnRpY2FsU3RlcH0ke0RlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGBzdz0ke3BhcmFtLnN0YXJ0V2lkdGh9JHtEZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgZXc9JHtwYXJhbS5lbmRXaWR0aH0ke0RlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGBvdz0ke3BhcmFtLm9mZnNldFdpZHRofSR7RGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYHBsPSR7cGFyYW0ucGxhdGZvcm1MZW5ndGh9JHtEZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgdHA9JHtwYXJhbS50eXBlfSR7RGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYHVwPSR7cGFyYW0udXB3YXJkID8gMSA6IDB9JHtEZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgcHRrPSR7cGFyYW0ucGxhdGZvcm1UaGlja25lc3N9YDtcbiAgICByZXR1cm4gdmFsdWU7XG59XG5leHBvcnQgZnVuY3Rpb24gcGFyc2VDb21wb25lbnRQYXJhbSh2YWx1ZSkge1xuICAgIGNvbnN0IHBhcmFtID0gT2JqZWN0LmFzc2lnbih7fSwgRGVmYXVsdENvbXBvbmVudFBhcmFtKTtcbiAgICBjb25zdCBpdGVtcyA9IHZhbHVlLnNwbGl0KERlbGltaXRlcik7XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgIGNvbnN0IGtleVZhbHVlID0gaXRlbS5zcGxpdCgnPScpO1xuICAgICAgICBpZiAoa2V5VmFsdWUubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGtleVZhbHVlWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnaW5kJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uaW5kZXggPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hzJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uaG9yaXpvbnRhbFN0ZXAgPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3ZzJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0udmVydGljYWxTdGVwID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdzdyc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnN0YXJ0V2lkdGggPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2V3JzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uZW5kV2lkdGggPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ293JzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0ub2Zmc2V0V2lkdGggPSBwYXJzZUZsb2F0KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncGwnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5wbGF0Zm9ybUxlbmd0aCA9IHBhcnNlRmxvYXQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd0cCc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnR5cGUgPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3VwJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0udXB3YXJkID0ga2V5VmFsdWVbMV0gPT09ICcxJyA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncHRrJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0ucGxhdGZvcm1UaGlja25lc3MgPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHBhcmFtLnN0ZXBQcm9wb3J0aW9uYWwgPSB0cnVlO1xuICAgIHBhcmFtLndpZHRoUHJvcG9ydGlvbmFsID0gdHJ1ZTtcbiAgICBwYXJhbS5wbGF0Zm9ybUxlbmd0aExvY2tlZCA9IHRydWU7XG4gICAgcGFyYW0ubW9kZWxFZGl0aW5nID0gdHJ1ZTtcbiAgICByZXR1cm4gcGFyYW07XG59XG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5U3RhcnRFbmQoc3RhcnQsIGVuZCkge1xuICAgIGxldCB2YWx1ZSA9ICcnO1xuICAgIHZhbHVlICs9IGAke3N0YXJ0Lnh9JHtDb29yZERlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGAke3N0YXJ0Lnl9JHtDb29yZERlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGAke3N0YXJ0Lnp9JHtEZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgJHtlbmQueH0ke0Nvb3JkRGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYCR7ZW5kLnl9JHtDb29yZERlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGAke2VuZC56fWA7XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTGluZVNlZzNkKHZhbHVlKSB7XG4gICAgY29uc3QgaXRlbXMgPSB2YWx1ZS5zcGxpdChEZWxpbWl0ZXIpO1xuICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgY29uc3Qgc3RhcnRLZXlWYWx1ZSA9IGl0ZW1zWzBdLnNwbGl0KENvb3JkRGVsaW1pdGVyKTtcbiAgICAgICAgY29uc3QgZW5kS2V5VmFsdWUgPSBpdGVtc1sxXS5zcGxpdChDb29yZERlbGltaXRlcik7XG4gICAgICAgIGlmIChzdGFydEtleVZhbHVlLmxlbmd0aCA9PT0gMyAmJiBlbmRLZXlWYWx1ZS5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKHBhcnNlRmxvYXQoc3RhcnRLZXlWYWx1ZVswXSksIHBhcnNlRmxvYXQoc3RhcnRLZXlWYWx1ZVsxXSksIHBhcnNlRmxvYXQoc3RhcnRLZXlWYWx1ZVsyXSkpO1xuICAgICAgICAgICAgY29uc3QgZW5kID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKHBhcnNlRmxvYXQoZW5kS2V5VmFsdWVbMF0pLCBwYXJzZUZsb2F0KGVuZEtleVZhbHVlWzFdKSwgcGFyc2VGbG9hdChlbmRLZXlWYWx1ZVsyXSkpO1xuICAgICAgICAgICAgcmV0dXJuIHsgc3RhcnQsIGVuZCB9O1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlU3RhcnRFbmQodmFsdWUpIHtcbiAgICBjb25zdCBpdGVtcyA9IHZhbHVlLnNwbGl0KERlbGltaXRlcik7XG4gICAgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gMikge1xuICAgICAgICBjb25zdCBzdGFydEtleVZhbHVlID0gaXRlbXNbMF0uc3BsaXQoQ29vcmREZWxpbWl0ZXIpO1xuICAgICAgICBjb25zdCBlbmRLZXlWYWx1ZSA9IGl0ZW1zWzFdLnNwbGl0KENvb3JkRGVsaW1pdGVyKTtcbiAgICAgICAgaWYgKHN0YXJ0S2V5VmFsdWUubGVuZ3RoID09PSAzICYmIGVuZEtleVZhbHVlLmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QocGFyc2VGbG9hdChzdGFydEtleVZhbHVlWzBdKSwgcGFyc2VGbG9hdChzdGFydEtleVZhbHVlWzFdKSwgMCk7XG4gICAgICAgICAgICBjb25zdCBlbmQgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QocGFyc2VGbG9hdChlbmRLZXlWYWx1ZVswXSksIHBhcnNlRmxvYXQoZW5kS2V5VmFsdWVbMV0pLCAwKTtcbiAgICAgICAgICAgIHJldHVybiB7IHN0YXJ0LCBlbmQsIHN0YXJ0SGVpZ2h0OiBwYXJzZUZsb2F0KHN0YXJ0S2V5VmFsdWVbMl0pLCBlbmRIZWlnaHQ6IHBhcnNlRmxvYXQoZW5kS2V5VmFsdWVbMl0pIH07XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5UG9pbnQzZChwb2ludCkge1xuICAgIGxldCB2YWx1ZSA9ICcnO1xuICAgIHZhbHVlICs9IGAke3BvaW50Lnh9JHtDb29yZERlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGAke3BvaW50Lnl9JHtDb29yZERlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGAke3BvaW50Lnp9YDtcbiAgICByZXR1cm4gdmFsdWU7XG59XG5leHBvcnQgZnVuY3Rpb24gcGFyc2VWZWN0b3IzZCh2YWx1ZSkge1xuICAgIGNvbnN0IGl0ZW1zID0gdmFsdWUuc3BsaXQoQ29vcmREZWxpbWl0ZXIpO1xuICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgY29uc3QgdmVjdG9yID0gR2VvbUxpYi5jcmVhdGVWZWN0b3IzZChwYXJzZUZsb2F0KGl0ZW1zWzBdKSwgcGFyc2VGbG9hdChpdGVtc1sxXSksIHBhcnNlRmxvYXQoaXRlbXNbMl0pKTtcbiAgICAgICAgcmV0dXJuIHZlY3RvcjtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5QmFzZUNvbXBvbmVudChiYXNlU2VnbWVudCwgbGluZTNkSW5kZXgpIHtcbiAgICBsZXQgdmFsdWUgPSAnJztcbiAgICB2YWx1ZSArPSBgJHtiYXNlU2VnbWVudC5wYXJhbS5pbmRleH1gO1xuICAgIGlmIChsaW5lM2RJbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlICs9IGAke0Nvb3JkRGVsaW1pdGVyfSR7bGluZTNkSW5kZXh9YDtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQmFzZUNvbXBvbmVudCh2YWx1ZSkge1xuICAgIGNvbnN0IGl0ZW1zID0gdmFsdWUuc3BsaXQoQ29vcmREZWxpbWl0ZXIpO1xuICAgIGlmICh2YWx1ZS5sZW5ndGggJiYgaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBiYXNlQ29tcG9uZW50SW5kZXggPSBwYXJzZUludChpdGVtc1swXSk7XG4gICAgICAgIGxldCBsaW5lM2RJbmRleDtcbiAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgbGluZTNkSW5kZXggPSBwYXJzZUludChpdGVtc1sxXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgY29tcG9uZW50SW5kZXg6IGJhc2VDb21wb25lbnRJbmRleCwgbGluZTNkSW5kZXggfTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gaXNFcXVhbChhLCBiLCB0b2xlcmFuY2UgPSAxKSB7XG4gICAgcmV0dXJuIE1hdGguYWJzKGEgLSBiKSA8PSB0b2xlcmFuY2U7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29vcmRpbmF0ZShub3JtYWwpIHtcbiAgICBsZXQgZHggPSBEaXJlY3Rpb25YO1xuICAgIGxldCBkeSA9IERpcmVjdGlvblo7XG4gICAgbGV0IGR6ID0gbm9ybWFsLm5vcm1hbGl6ZWQoKTtcbiAgICBpZiAoRGlyZWN0aW9uWi5pc1BhcmFsbGVsKGR6KSkge1xuICAgICAgICBkeCA9IERpcmVjdGlvblkuY3Jvc3MoZHopLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgZHkgPSBkei5jcm9zcyhkeCkubm9ybWFsaXplZCgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZHggPSBkeS5jcm9zcyhkeikubm9ybWFsaXplZCgpO1xuICAgICAgICBkeSA9IGR6LmNyb3NzKGR4KS5ub3JtYWxpemVkKCk7XG4gICAgfVxuICAgIHJldHVybiB7IGR4LCBkeSwgZHogfTtcbn1cbmxldCBpc0luT3BlcmF0aW9uID0gZmFsc2U7XG5leHBvcnQgZnVuY3Rpb24gc3RhcnRPcGVyYXRpb24oKSB7XG4gICAgaXNJbk9wZXJhdGlvbiA9IHRydWU7XG4gICAgYXBwLmdldEFjdGl2ZURlc2lnbigpLnN0YXJ0T3BlcmF0aW9uKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gY29tbWl0T3BlcmF0aW9uKCkge1xuICAgIGlzSW5PcGVyYXRpb24gPSBmYWxzZTtcbiAgICBhcHAuZ2V0QWN0aXZlRGVzaWduKCkuY29tbWl0T3BlcmF0aW9uKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gYWJvcnRPcGVyYXRpb24oKSB7XG4gICAgaXNJbk9wZXJhdGlvbiA9IGZhbHNlO1xuICAgIGFwcC5nZXRBY3RpdmVEZXNpZ24oKS5hYm9ydE9wZXJhdGlvbigpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIG9uTW9kZWxDaGFuZ2VkKGNoYW5nZXMpIHtcbiAgICBjb25zdCBkZWxldGVkID0gY2hhbmdlcy5kZWxldGVkO1xuICAgIGNvbnN0IGFkZGVkID0gY2hhbmdlcy5hZGRlZDtcbiAgICAvLyBjb25zdCBlZGl0TW9kZWwgPSBkcmF3U3RhaXJzVG9vbC5nZXRFZGl0TW9kZWwoKTtcbiAgICBpZiAoIWlzSW5PcGVyYXRpb24gJiYgKChkZWxldGVkID09PSBudWxsIHx8IGRlbGV0ZWQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRlbGV0ZWQubGVuZ3RoKSB8fCAoYWRkZWQgPT09IG51bGwgfHwgYWRkZWQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGFkZGVkLmxlbmd0aCkpKSB7XG4gICAgICAgIC8vIGlmIChkZWxldGVkLnNvbWUoZGVsZXRlR3JvdXAgPT4gZWRpdE1vZGVsLnBhcmVudC5kZWZpbml0aW9uS2V5ID09PSBkZWxldGVHcm91cC5nZXRLZXkoKSkpIHtcbiAgICAgICAgZHJhd1N0YWlyc1Rvb2wuY2xlYXJFZGl0TW9kZWwoKTtcbiAgICAgICAgLy8gfVxuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBpc1BhcnRPZkVkaXRNb2RlbChlZGl0TW9kZWwsIGdyb3VwSW5zdGFuY2UpIHtcbiAgICB2YXIgX2EsIF9iLCBfYztcbiAgICBjb25zdCBncm91cEluc3RhbmNlS2V5ID0gZ3JvdXBJbnN0YW5jZS5nZXRLZXkoKTtcbiAgICByZXR1cm4gZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZUtleSA9PT0gZ3JvdXBJbnN0YW5jZUtleSB8fFxuICAgICAgICBbLi4uZWRpdE1vZGVsLnN0YWlycy52YWx1ZXMoKV0uc29tZShpbnN0YW5jZURhdGEgPT4gaW5zdGFuY2VEYXRhLmluc3RhbmNlS2V5ID09PSBncm91cEluc3RhbmNlS2V5KSB8fFxuICAgICAgICBbLi4uZWRpdE1vZGVsLnBsYXRmb3Jtcy52YWx1ZXMoKV0uc29tZShpbnN0YW5jZURhdGEgPT4gaW5zdGFuY2VEYXRhLmluc3RhbmNlS2V5ID09PSBncm91cEluc3RhbmNlS2V5KSB8fFxuICAgICAgICAoKF9hID0gZWRpdE1vZGVsLmhhbmRyYWlsKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaGFuZHJhaWxJbnN0YW5jZS5pbnN0YW5jZUtleSkgPT09IGdyb3VwSW5zdGFuY2VLZXkgfHxcbiAgICAgICAgWy4uLigoKF9iID0gZWRpdE1vZGVsLmhhbmRyYWlsKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IucmFpbEluc3RhbmNlcykgfHwgW10pLnZhbHVlcygpXS5zb21lKGluc3RhbmNlRGF0YSA9PiBpbnN0YW5jZURhdGEuaW5zdGFuY2VLZXkgPT09IGdyb3VwSW5zdGFuY2VLZXkpIHx8XG4gICAgICAgIFsuLi4oKChfYyA9IGVkaXRNb2RlbC5oYW5kcmFpbCkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmNvbHVtbkluc3RhbmNlcykgfHwgW10pLnZhbHVlcygpXS5zb21lKGluc3RhbmNlRGF0YSA9PiBpbnN0YW5jZURhdGEuaW5zdGFuY2VLZXkgPT09IGdyb3VwSW5zdGFuY2VLZXkpO1xufVxuIiwiZXhwb3J0IHZhciBNZXNzYWdlVHlwZTtcbihmdW5jdGlvbiAoTWVzc2FnZVR5cGUpIHtcbiAgICBNZXNzYWdlVHlwZVtcIkRyYXdTdGFpclZpZXdNb3VudGVkXCJdID0gXCJkcmF3U3RhaXJWaWV3TW91bnRlZFwiO1xuICAgIE1lc3NhZ2VUeXBlW1wiU3RhaXJQYXJhbUNoYW5nZWRCeUlucHV0XCJdID0gXCJzdGFpclBhcmFtQ2hhbmdlZEJ5SW5wdXRcIjtcbiAgICBNZXNzYWdlVHlwZVtcIlN0YWlyUGFyYW1DaGFuZ2VkQnlEcmF3XCJdID0gXCJzdGFpclBhcmFtQ2hhbmdlZEJ5RHJhd1wiO1xuICAgIE1lc3NhZ2VUeXBlW1wiUGFyYW1DaGFuZ2VkQnlJbnB1dFwiXSA9IFwicGFyYW1DaGFuZ2VkQnlJbnB1dFwiO1xuICAgIE1lc3NhZ2VUeXBlW1wiUGFyYW1DaGFuZ2VkQnlEcmF3XCJdID0gXCJwYXJhbUNoYW5nZWRCeURyYXdcIjtcbiAgICBNZXNzYWdlVHlwZVtcIkNvbXBvbmVudEFkZGVkXCJdID0gXCJjb21wb25lbnRBZGRlZFwiO1xuICAgIE1lc3NhZ2VUeXBlW1wiRHJhd1N0YWlyTW9kZWxTZXR0bGVkXCJdID0gXCJkcmF3U3RhaXJNb2RlbFNldHRsZWRcIjtcbiAgICBNZXNzYWdlVHlwZVtcIlByb3BlcnRpZXNWaXNpYmxlXCJdID0gXCJwcm9wZXJ0aWVzVmlzaWJsZVwiO1xuICAgIE1lc3NhZ2VUeXBlW1wiRm9jdXNDb21wb25lbnRJbmRleFwiXSA9IFwiZm9jdXNDb21wb25lbnRJbmRleFwiO1xuICAgIE1lc3NhZ2VUeXBlW1wiUmVtb3ZlQ29tcG9uZW50XCJdID0gXCJyZW1vdmVDb21wb25lbnRcIjtcbiAgICBNZXNzYWdlVHlwZVtcIk1hdGVyaWFsUmVwbGFjZUNsaWNrXCJdID0gXCJtYXRlcmlhbFJlcGxhY2VDbGlja1wiO1xuICAgIE1lc3NhZ2VUeXBlW1wiQWN0aXZhdGVEcmF3U3RhaXJzVG9vbFwiXSA9IFwiYWN0aXZhdGVEcmF3U3RhaXJzVG9vbFwiO1xuICAgIE1lc3NhZ2VUeXBlW1wiRGVBY3RpdmF0ZURyYXdTdGFpcnNUb29sXCJdID0gXCJkZUFjdGl2YXRlRHJhd1N0YWlyc1Rvb2xcIjtcbiAgICBNZXNzYWdlVHlwZVtcIkxlYXZlRHJhd1N0YWlyc1Rvb2xcIl0gPSBcImxlYXZlRHJhd1N0YWlyc1Rvb2xcIjtcbn0pKE1lc3NhZ2VUeXBlIHx8IChNZXNzYWdlVHlwZSA9IHt9KSk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL21haW4vbWFpbi50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==