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
pluginUI.resize(360, 700);
pluginUI.mount();
let activatedCustomTool;
function onUIMessage(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (data.type === _types__WEBPACK_IMPORTED_MODULE_2__.MessageType.ActivateDrawStairsTool) {
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
            _tools_DrawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool.setModel(allEntities[0]);
        }
        else {
            if (activatedCustomTool !== _tools_DrawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool) {
                pluginUI.postMessage({ type: _types__WEBPACK_IMPORTED_MODULE_2__.MessageType.DrawStairModelSettled }, '*');
            }
        }
    }
});
function onPluginStartUp() {
    const allEntities = selection.getAllEntities();
    if (allEntities.length === 1 && (0,_tools_DrawStairsTool_utils__WEBPACK_IMPORTED_MODULE_1__.isKGroupInstance)(allEntities[0])) {
        _tools_DrawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool.setModel(allEntities[0]);
    }
}
onPluginStartUp();


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
/* harmony export */   DirectionZ: () => (/* binding */ DirectionZ),
/* harmony export */   LengthTolerance: () => (/* binding */ LengthTolerance),
/* harmony export */   StepCountLimit: () => (/* binding */ StepCountLimit),
/* harmony export */   dummyMatrix4: () => (/* binding */ dummyMatrix4),
/* harmony export */   dummyPoint3d: () => (/* binding */ dummyPoint3d),
/* harmony export */   dummyVector3d: () => (/* binding */ dummyVector3d),
/* harmony export */   getEmptySegment: () => (/* binding */ getEmptySegment)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/main/tools/DrawStairsTool/types.ts");

const dummyMatrix4 = GeomLib.createIdentityMatrix4();
const dummyVector3d = GeomLib.createVector3d(0, 0, 1);
const dummyPoint3d = GeomLib.createPoint3d(0, 0, 0);
const DirectionZ = GeomLib.createVector3d(0, 0, 1);
// const HeightTolerance: number = 5;
const LengthTolerance = 10;
const DirectionAngleTolerance = Math.PI / 36;
const AngleTolerance = Math.PI / 180;
const StepCountLimit = 80;
// const DefaultBoardThickness = 50;
function getEmptySegment() {
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
        param: Object.assign({}, _types__WEBPACK_IMPORTED_MODULE_0__.DefaultComponentParam),
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
class DrawStairsTool {
    constructor() {
        // private componentParam: ComponentParam = { ...DefaultComponentParam };
        this.drawing = false;
        this.focusedComponentIndex = 0;
        this.segments = [];
    }
    onToolActive() {
        toolHelper.setExcludeInferenceTypes([
            KEntityType.Face, KEntityType.Edge, KEntityType.AuxiliaryBoundedCurve, KEntityType.AuxiliaryLine, KEntityType.AuxiliaryVertex,
            KEntityType.GroupInstance, KEntityType.Vertex, KArchFaceType.NonPlanar, KArchFaceType.Planar,
        ]);
        const firstSegment = (0,_consts__WEBPACK_IMPORTED_MODULE_4__.getEmptySegment)();
        firstSegment.startLocked = false;
        pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.ParamChangedByDraw, componentParam: Object.assign({}, firstSegment.param) }, '*');
        this.segments = [firstSegment];
        this.drawing = true;
        this.editModel = undefined;
    }
    onToolDeactive() {
        toolHelper.setExcludeInferenceTypes([]);
        this.clear();
        if (this.editModel) {
            selection.add([this.editModel.parent]);
        }
        else {
            pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.LeaveDrawStairsTool }, '*');
        }
        (0,_main_main__WEBPACK_IMPORTED_MODULE_5__.deActivateDrawStairsTool)();
    }
    onMouseMove(event, inferenceResult) {
        // console.log('onMouseMove');
        if (inferenceResult) {
            // const { startWidth, endWidth, platformThickness } = this.componentParam;
            const position = inferenceResult.position;
            if (this.segments.length) {
                const lastSegment = this.segments[this.segments.length - 1];
                // console.log('lastSegment.startLocked', lastSegment.startLocked);
                if (lastSegment.startLocked) {
                    lastSegment.end = position;
                    this.drawTempComponent(lastSegment);
                }
                else {
                    if (this.segments.length > 1) {
                        const prevSegment = this.segments[this.segments.length - 2];
                        // must be true
                        if (prevSegment.param.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform) {
                            const { moldShape: { vertices, tempLines } } = prevSegment;
                            let closestPoint;
                            let minDistance = 0;
                            tempLines.forEach(line => {
                                const lineSeg3d = GeomLib.createLineSegment3d(vertices[line[0]], vertices[line[1]]);
                                const thePoint = lineSeg3d.getClosestPoint(position);
                                const curDistance = thePoint.distanceTo(position);
                                if (!closestPoint || curDistance < minDistance) {
                                    minDistance = curDistance;
                                    closestPoint = thePoint;
                                    lastSegment.start = closestPoint;
                                    lastSegment.baseLineSeg3d = { start: vertices[line[0]], end: vertices[line[1]] };
                                }
                            });
                            if (lastSegment.pickStartTempShapeId) {
                                appView.clearTemporaryShapesByIds([lastSegment.pickStartTempShapeId]);
                            }
                            if (closestPoint) {
                                const pickStartTempShapeId = appView.drawLines([position, closestPoint], { color: { r: 0, g: 0, b: 255 }, depthTest: true, pattern: KLinePattern.Dash, gapSize: 50, dashSize: 50 });
                                if (pickStartTempShapeId === null || pickStartTempShapeId === void 0 ? void 0 : pickStartTempShapeId.id) {
                                    lastSegment.pickStartTempShapeId = pickStartTempShapeId.id;
                                }
                            }
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
        // console.log('onLButtonUp');
        if (inferenceResult) {
            // const position = inferenceResult.position;
            if (this.segments.length) {
                const lastSegment = this.segments[this.segments.length - 1];
                if (lastSegment.startLocked) {
                    console.log('push segment');
                    const { start, end, param: { type }, circleTangent } = lastSegment;
                    // this.componentParam = {
                    //     ...this.componentParam,
                    //     type: type === ComponentType.Platform ? ComponentType.StraightStair : ComponentType.Platform,
                    //     startWidth: endWidth,
                    // };
                    if (type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.CircularStair && !circleTangent) {
                        lastSegment.circleTangent = end.subtracted(start).normalized();
                    }
                    else {
                        lastSegment.endLocked = true;
                        const lastParam = lastSegment.param;
                        const nextSegment = Object.assign(Object.assign({}, (0,_consts__WEBPACK_IMPORTED_MODULE_4__.getEmptySegment)()), { start: lastSegment.end, end: lastSegment.end, startLocked: lastParam.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform ? false : true, startHeight: lastSegment.endHeight, endHeight: lastSegment.endHeight, param: Object.assign(Object.assign({}, lastParam), { index: lastParam.index + 1, startWidth: lastParam.endWidth, offsetWidth: 0, type: lastParam.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform ? _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.StraightStair : _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform, platformLengthLocked: false }) });
                        // if (lastParam.type !== ComponentType.Platform) {
                        const { moldShape: { vertices } } = lastSegment;
                        if (!lastSegment.baseLineSeg3d) {
                            lastSegment.baseLineSeg3d = { start: vertices[0], end: vertices[1] };
                        }
                        nextSegment.baseLineSeg3d = { start: vertices[vertices.length - 1], end: vertices[vertices.length - 2] };
                        // }
                        lastParam.modelEditing = true;
                        pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.ParamChangedByDraw, componentParam: lastParam }, '*');
                        this.segments.push(nextSegment);
                        if (this.focusedComponentIndex !== lastParam.index) {
                            const focusedSegment = this.segments.find(seg => seg.param.index === this.focusedComponentIndex);
                            if (focusedSegment) {
                                this.drawTempComponent(focusedSegment, false);
                            }
                        }
                        this.focusedComponentIndex = nextSegment.param.index;
                        pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.ComponentAdded, componentParam: Object.assign({}, nextSegment.param) }, '*');
                    }
                }
                else {
                    lastSegment.startLocked = true;
                    if (lastSegment.pickStartTempShapeId) {
                        appView.clearTemporaryShapesByIds([lastSegment.pickStartTempShapeId]);
                    }
                    this.drawTempComponent(lastSegment);
                }
            }
        }
    }
    drawTempComponent(theSegment, focused = false) {
        var _a, _b;
        if (theSegment.startLocked) {
            (0,_tempMeshUtils__WEBPACK_IMPORTED_MODULE_1__.generateShape)(theSegment, this.drawing);
            const { stairShape: { vertices: stairVertices, tempLines: stairTempLines }, moldShape: { vertices: moldVertices, tempLines: moldTempLines }, cornerShape: { vertices: cornerVertices, tempLines: cornerTempLines }, cornerMoldShape: { vertices: cornerMoldVertices, tempLines: cornerMoldTempLines }, } = theSegment;
            const tempLinePoints = [];
            const moldTempLinePoints = [];
            for (const stairTempLine of stairTempLines) {
                tempLinePoints.push([stairVertices[stairTempLine[0]], stairVertices[stairTempLine[1]]]);
            }
            for (const cornerTempLine of cornerTempLines) {
                tempLinePoints.push([cornerVertices[cornerTempLine[0]], cornerVertices[cornerTempLine[1]]]);
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
            const drawTempLinesFunc = focused ? appView.drawFlatLines.bind(appView) : appView.drawPolylines.bind(appView);
            if (tempLinePoints.length) {
                // const colorValue = focused ? 255 : 155;
                const tempShapeId = drawTempLinesFunc(tempLinePoints, { color: { r: 255, g: 0, b: 0 }, depthTest: false });
                if (tempShapeId === null || tempShapeId === void 0 ? void 0 : tempShapeId.ids) {
                    theSegment.tempShapeId = [...tempShapeId.ids];
                }
            }
            if (moldTempLinePoints.length) {
                const moldTempShapeId = drawTempLinesFunc(moldTempLinePoints, { color: { r: 0, g: 255, b: 0 }, depthTest: this.drawing });
                if (moldTempShapeId === null || moldTempShapeId === void 0 ? void 0 : moldTempShapeId.ids) {
                    if ((_b = theSegment.tempShapeId) === null || _b === void 0 ? void 0 : _b.length) {
                        theSegment.tempShapeId.push(...moldTempShapeId.ids);
                    }
                    else {
                        theSegment.tempShapeId = [...moldTempShapeId.ids];
                    }
                }
            }
        }
    }
    focusComponent(componentIndex) {
        if (this.segments.length) {
            const lastSegment = this.segments[this.segments.length - 1];
            const lastSegmentIndex = lastSegment.param.index;
            if (componentIndex !== this.focusedComponentIndex) {
                const newFocusedSegment = this.segments.find(seg => seg.param.index === componentIndex);
                if (componentIndex !== lastSegmentIndex && newFocusedSegment) {
                    this.drawTempComponent(newFocusedSegment, true);
                }
                const oldFocusedSegment = this.segments.find(seg => seg.param.index === this.focusedComponentIndex);
                if (this.focusedComponentIndex !== lastSegmentIndex && oldFocusedSegment) {
                    this.drawTempComponent(oldFocusedSegment, false);
                }
            }
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
                }
                else if (this.editModel) {
                    const theInstance = this.editModel.child.get(componentIndex);
                    if (theInstance) {
                        this.editModel.child.delete(componentIndex);
                        design.removeGroupInstance(theInstance);
                    }
                }
                this.segments.splice(theIndex, 1);
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
    changeComponentParam(componentParam, changeParams) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.segments.length)
                return;
            const theSegment = this.segments.find(seg => seg.param.index === componentParam.index);
            const lastSegment = this.segments[this.segments.length - 1];
            if (theSegment) {
                const { param: { index } } = theSegment;
                // const { startWidth: newWidth } = componentParam;
                // const { start, param: { index, startWidth, type, offsetWidth }, baseLineSeg3d } = theSegment;
                // if (changeParams.indexOf(ComponentParamType.StartWidth) > -1 && type === ComponentType.Platform && baseLineSeg3d && offsetWidth !== 0) {
                //     const newStartWidth = Math.ceil(startWidth / (startWidth + Math.abs(offsetWidth)) * newWidth);
                //     const sign = offsetWidth / Math.abs(offsetWidth);
                //     const newOffsetWidth = sign * (newWidth - newStartWidth);
                //     const baseDir = baseLineSeg3d.end.subtracted(baseLineSeg3d.start).normalized();
                //     const newEnd = start.added(baseDir.multiplied(sign * (newStartWidth / 2 + Math.abs(newOffsetWidth))));
                //     componentParam.startWidth = newStartWidth;
                //     componentParam.endWidth = newStartWidth;
                //     componentParam.offsetWidth = newOffsetWidth;
                //     theSegment.end = newEnd;
                // }
                theSegment.param = componentParam;
                if (this.drawing) {
                    this.drawTempComponent(theSegment, theSegment.param.index !== lastSegment.param.index);
                }
                else if (this.editModel) {
                    const theInstance = this.editModel.child.get(index);
                    if (theInstance) {
                        (0,_tempMeshUtils__WEBPACK_IMPORTED_MODULE_1__.generateShape)(theSegment);
                        const theMeshes = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.generateMeshes)([theSegment]);
                        if (theMeshes.length) {
                            design.startOperation();
                            let operationSuccess = (yield design.activateGroupInstance(this.editModel.parent)).isSuccess;
                            if (operationSuccess) {
                                operationSuccess = operationSuccess && design.removeGroupInstance(theInstance).isSuccess;
                                if (operationSuccess) {
                                    const newInstance = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.buildComponentInstance)(theSegment);
                                    operationSuccess = operationSuccess && !!newInstance;
                                    if (newInstance) {
                                        this.editModel.child.set(index, newInstance);
                                    }
                                }
                            }
                            if (operationSuccess) {
                                design.commitOperation();
                            }
                            else {
                                design.abortOperation();
                            }
                        }
                    }
                }
            }
            // else {
            //     this.componentParam = componentParam;
            // }
        });
    }
    // changeComponentType(componentType: ComponentType) {
    //     this.componentParam.type = componentType;
    //     pluginUI.postMessage({ type: 'componentParamChanged', componentParam: { ...this.componentParam } }, '*');
    //     this.changeComponentParam(this.componentParam, [ComponentParamType.Type]);
    // }
    tryCommit() {
        var _a;
        const meshes = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.generateMeshes)(this.segments);
        if (meshes.length) {
            design.startOperation();
            const newInstances = [];
            const editModelChild = new Map();
            const validSegments = [];
            let operationSuccess = true;
            for (const segment of this.segments) {
                if (!segment.mesh)
                    continue;
                if (!operationSuccess) {
                    design.abortOperation();
                    return;
                }
                const newInstance = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.buildComponentInstance)(segment);
                operationSuccess = operationSuccess && !!newInstance;
                if (newInstance) {
                    newInstances.push(newInstance);
                    editModelChild.set(segment.param.index, newInstance);
                    segment.param.platformLengthLocked = true;
                    segment.param.stepProportional = true;
                    segment.param.widthProportional = true;
                    segment.param.modelEditing = true;
                    validSegments.push(segment);
                }
            }
            if (newInstances.length) {
                const parentInstance = (_a = design.makeGroup([], newInstances, [])) === null || _a === void 0 ? void 0 : _a.addedInstance;
                operationSuccess = operationSuccess && !!parentInstance;
                const parentDef = parentInstance === null || parentInstance === void 0 ? void 0 : parentInstance.getGroupDefinition();
                if (parentInstance && parentDef) {
                    operationSuccess = operationSuccess && parentDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.StairModelKey, _types__WEBPACK_IMPORTED_MODULE_0__.StairModelValue).isSuccess;
                    if (operationSuccess) {
                        design.commitOperation();
                        this.editModel = { parent: parentInstance, child: editModelChild };
                        this.segments = validSegments;
                        this.drawing = false;
                        this.drawTempComponent(validSegments[0], true);
                        pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.DrawStairModelSettled, componentParams: this.segments.map(seg => (Object.assign({}, seg.param))) }, '*');
                        return;
                    }
                }
            }
            design.abortOperation();
        }
    }
    setModel(groupInstance) {
        var _a;
        if (((_a = this.editModel) === null || _a === void 0 ? void 0 : _a.parent.getKey()) === groupInstance.getKey()) {
            pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.DrawStairModelSettled, componentParams: this.segments.map(seg => (Object.assign({}, seg.param))) }, '*');
            return;
        }
        this.editModel = undefined;
        const groupDef = groupInstance.getGroupDefinition();
        if (groupInstance && groupDef) {
            const stairModelProperty = groupDef.getCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.StairModelKey);
            if (stairModelProperty === _types__WEBPACK_IMPORTED_MODULE_0__.StairModelValue) {
                const segments = [];
                const subGroupInstances = groupDef.getSubGroupInstances();
                const editModel = { parent: groupInstance, child: new Map() };
                for (const subInstance of subGroupInstances) {
                    const subDef = subInstance.getGroupDefinition();
                    if (subDef) {
                        // const componentIndexValue = parseInt(subDef.getCustomProperty(ComponentIndexKey));
                        // if (isFinite(componentIndexValue)) {
                        const param = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.parseParam)(subDef.getCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.ParamKey));
                        const startEnd = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.parseStartEnd)(subDef.getCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.StartEndKey));
                        const baseLineSeg3d = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.parseStartEnd)(subDef.getCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.BaseLineSeg3dKey));
                        const circleTangent = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.parseVector3d)(subDef.getCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.CircleTangentKey));
                        if (param && startEnd && baseLineSeg3d) {
                            const segment = Object.assign(Object.assign({}, (0,_consts__WEBPACK_IMPORTED_MODULE_4__.getEmptySegment)()), { start: startEnd.start, end: startEnd.end, startHeight: startEnd.start.z, endHeight: startEnd.end.z, baseLineSeg3d,
                                circleTangent,
                                param, startLocked: true, endLocked: true });
                            segments.push(segment);
                            editModel.child.set(param.index, subInstance);
                        }
                        // }
                    }
                }
                if (segments.length) {
                    segments.sort((a, b) => a.param.index - b.param.index);
                    this.segments = segments;
                    this.editModel = editModel;
                    this.drawTempComponent(segments[0], true);
                    pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.DrawStairModelSettled, componentParams: this.segments.map(seg => (Object.assign({}, seg.param))) }, '*');
                }
            }
        }
    }
    clear() {
        appView.clearTemporaryShapes();
        // this.componentParam = { ...DefaultComponentParam };
        // this.segments = [];
        this.drawing = false;
        // this.editModel = undefined;
    }
    onRButtonUp(event, inferenceResult) {
        this.tryCommit();
        (0,_main_main__WEBPACK_IMPORTED_MODULE_5__.deActivateDrawStairsTool)();
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
/* harmony export */   generateMeshes: () => (/* binding */ generateMeshes)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/main/tools/DrawStairsTool/types.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/main/tools/DrawStairsTool/utils.ts");


function generateMeshes(segments) {
    const meshes = [];
    for (const segment of segments) {
        const { param: { type }, circleTangent } = segment;
        if (type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.StraightStair) {
            generateStraightStairMesh(segment);
        }
        else if (type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.CircularStair) {
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
        // side faces
        [i * 4, i * 4 + 2, (i + 1) * 4], [i * 4 + 1, (i + 1) * 4 + 1, i * 4 + 3]);
        (_a = stairMesh.softEdges) === null || _a === void 0 ? void 0 : _a.push([i * 4 + 1, i * 4 + 2], [i * 4 + 3, i * 4 + 4], [i * 4, (i + 1) * 4], [(i + 1) * 4 + 1, i * 4 + 1]);
        if (upward) {
            const bottomFrontLeftIndex = 4 * stepCount + 2 + 2 * (stepCount - i - 1);
            stairMesh.triangleIndices.push(
            // side middle faces
            [i * 4, (i + 1) * 4, bottomFrontLeftIndex], [(i + 1) * 4 + 1, i * 4 + 1, bottomFrontLeftIndex + 1]);
            if (i < stepCount - 1) {
                (_b = stairMesh.softEdges) === null || _b === void 0 ? void 0 : _b.push([(i + 1) * 4, bottomFrontLeftIndex], [(i + 1) * 4 + 1, bottomFrontLeftIndex + 1]);
            }
            if (i > 0) {
                stairMesh.triangleIndices.push(
                // side bottom faces
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
            // side middle faces
            [i * 4, (i + 1) * 4, bottomBackLeftIndex], [(i + 1) * 4 + 1, i * 4 + 1, bottomBackLeftIndex + 1], 
            // bottom faces
            [bottomBackLeftIndex, bottomBackLeftIndex - 2, bottomBackLeftIndex + 1], [bottomBackLeftIndex + 1, bottomBackLeftIndex - 2, bottomBackLeftIndex - 1]);
            (_f = stairMesh.softEdges) === null || _f === void 0 ? void 0 : _f.push([bottomBackLeftIndex + 1, bottomBackLeftIndex - 2]);
            if (i < stepCount - 1) {
                (_g = stairMesh.softEdges) === null || _g === void 0 ? void 0 : _g.push([(i + 1) * 4, bottomBackLeftIndex], [(i + 1) * 4 + 1, bottomBackLeftIndex + 1]);
                stairMesh.triangleIndices.push(
                // side bottom faces
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
function buildComponentInstance(segment) {
    var _a, _b;
    const { start, end, startHeight, endHeight, baseLineSeg3d, circleTangent, param, mesh } = segment;
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
                // operationSuccess = operationSuccess && groupDef.setCustomProperty(ComponentIndexKey, `${newInstances.length}`).isSuccess;
                // newInstances.push(newInstance);
                const paramString = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.stringifyParam)(param);
                const startEndString = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.stringifyStartEnd)(GeomLib.createPoint3d(start.x, start.y, startHeight), GeomLib.createPoint3d(end.x, end.y, endHeight));
                operationSuccess = operationSuccess && groupDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.ParamKey, paramString).isSuccess;
                operationSuccess = operationSuccess && groupDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.StartEndKey, startEndString).isSuccess;
                if (baseLineSeg3d) {
                    const BaseLineString = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.stringifyStartEnd)(baseLineSeg3d.start, baseLineSeg3d.end);
                    operationSuccess = operationSuccess && groupDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.BaseLineSeg3dKey, BaseLineString).isSuccess;
                }
                if (circleTangent) {
                    const tangentString = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.stringifyPoint3d)(circleTangent);
                    operationSuccess = operationSuccess && groupDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.CircleTangentKey, tangentString).isSuccess;
                }
                return newInstance;
            }
        }
    }
    return undefined;
}


/***/ }),

/***/ "./src/main/tools/DrawStairsTool/tempMeshUtils.ts":
/*!********************************************************!*\
  !*** ./src/main/tools/DrawStairsTool/tempMeshUtils.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateShape: () => (/* binding */ generateShape)
/* harmony export */ });
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ "./src/main/tools/DrawStairsTool/consts.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./src/main/tools/DrawStairsTool/types.ts");


function generateShape(segment, temp = true) {
    const { param: { type }, circleTangent } = segment;
    if (type === _types__WEBPACK_IMPORTED_MODULE_1__.ComponentType.StraightStair) {
        generateStraightStairShape(segment, temp);
    }
    else if (type === _types__WEBPACK_IMPORTED_MODULE_1__.ComponentType.CircularStair) {
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
    const { start, end, stairShape, moldShape, cornerShape, cornerMoldShape, startHeight, baseLineSeg3d, circleTangent, param } = segment;
    const { startWidth, endWidth, horizontalStep, verticalStep, upward, platformThickness } = param;
    if (circleTangent) {
        const verticalFrontDir = _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ;
        const tangentLeftDir = _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.cross(circleTangent).normalized();
        const startEndDir = end.subtracted(start).normalized();
        const startEndDistance = start.distanceTo(end);
        const maxWidth = Math.max(startWidth, endWidth);
        const endAngle = startEndDir.angleTo(circleTangent, _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ);
        if (endAngle < _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionAngleTolerance) {
            return generateStraightStairShape(segment, temp);
        }
        const isLeftArc = endAngle > Math.PI;
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
            const curLeftPt = curLeftMoldPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight)).added(verticalFrontDir.multiplied(i * stepHeight));
            const curRightPt = curRightMoldPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight)).added(verticalFrontDir.multiplied(i * stepHeight));
            moldVertices.push(curLeftMoldPt, curRightMoldPt);
            moldTempLines.push([2 * i, 1 + 2 * i], [2 * i, 2 + 2 * i], [1 + 2 * i, 3 + 2 * i]);
            vertices.push(curLeftPt, curRightPt);
            const nextRotateMatrix = GeomLib.createRotateMatrix4(horizontalStepAngle * (i + 1), circleNormal, _consts__WEBPACK_IMPORTED_MODULE_0__.dummyPoint3d);
            const nextRadiusDir = startRadiusDir.appliedMatrix4(nextRotateMatrix);
            const nextHalfWidth = (startWidth + (endWidth - startWidth) * ((i + 1) * horizontalStepAngle) / arcAngle) / 2 * (isLeftArc ? -1 : 1);
            const nextLeftMoldPt = circleCenter.added(nextRadiusDir.multiplied(radius + nextHalfWidth));
            const nextRightMoldPt = circleCenter.added(nextRadiusDir.multiplied(radius - nextHalfWidth));
            const nextLeftPt = nextLeftMoldPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight)).added(verticalFrontDir.multiplied(i * stepHeight));
            const nextRightPt = nextRightMoldPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight)).added(verticalFrontDir.multiplied(i * stepHeight));
            if (upward) {
                vertices.push(curLeftPt.added(verticalFrontDir.multiplied(stepHeight)), curRightPt.added(verticalFrontDir.multiplied(stepHeight)));
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
                vertices.push(nextLeftPt.added(verticalFrontDir.multiplied(stepHeight)), nextRightPt.added(verticalFrontDir.multiplied(stepHeight)));
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
        const lastLeftPt = lastLeftMoldPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight)).added(verticalFrontDir.multiplied(stepCount * stepHeight));
        const lastRightPt = lastRightMoldPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight)).added(verticalFrontDir.multiplied(stepCount * stepHeight));
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
                vertices.push(vertices[vertices.length - 2].added(verticalFrontDir.multiplied(verticalStep)), vertices[vertices.length - 1].added(verticalFrontDir.multiplied(verticalStep)));
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
                vertices.push(lastLeftPt.added(verticalFrontDir.multiplied(-stepHeight)), lastRightPt.added(verticalFrontDir.multiplied(-stepHeight)));
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
                vertices.push(vertices[vertices.length - 2].added(verticalFrontDir.multiplied(-stepHeight - (1 - actualLastStepLength / horizontalStepAngle) * stepHeight)), vertices[vertices.length - 1].added(verticalFrontDir.multiplied(-stepHeight - (1 - actualLastStepLength / horizontalStepAngle) * stepHeight)));
                for (let j = stepCount - (lastHorizontalAngle >= _consts__WEBPACK_IMPORTED_MODULE_0__.AngleTolerance ? 1 : 2); j > 0; j--) {
                    const vInd = j * 4;
                    if (temp) {
                        tempLines.push([vertices.length - 2, 2 + vertices.length - 2], [1 + vertices.length - 2, 3 + vertices.length - 2]);
                        if (j === 1) {
                            tempLines.push([2 + vertices.length - 2, 0], [3 + vertices.length - 2, 1]);
                        }
                    }
                    vertices.push(vertices[vInd].added(verticalFrontDir.multiplied(-stepHeight)), vertices[vInd + 1].added(verticalFrontDir.multiplied(-stepHeight)));
                }
            }
            else {
                vertices.push(vertices[vertices.length - 6].added(verticalFrontDir.multiplied(stepHeight)), vertices[vertices.length - 5].added(verticalFrontDir.multiplied(stepHeight)));
                for (let j = stepCount - (lastHorizontalAngle >= _consts__WEBPACK_IMPORTED_MODULE_0__.AngleTolerance ? 1 : 2); j >= 0; j--) {
                    const vInd = j * 4;
                    if (temp) {
                        tempLines.push([vertices.length - 2, 2 + vertices.length - 2], [1 + vertices.length - 2, 3 + vertices.length - 2]);
                        if (j === 0) {
                            tempLines.push([2 + vertices.length - 2, 0], [3 + vertices.length - 2, 1]);
                        }
                    }
                    vertices.push(vertices[vInd].added(verticalFrontDir.multiplied(stepHeight)), vertices[vInd + 1].added(verticalFrontDir.multiplied(stepHeight)));
                }
            }
        }
        else {
            if (temp) {
                tempLines.push([vertices.length - 2, 2 + vertices.length - 2], [1 + vertices.length - 2, 3 + vertices.length - 2], [2 + vertices.length - 2, 3 + vertices.length - 2], [2 + vertices.length - 2, 0], [3 + vertices.length - 2, 1]);
            }
            if (upward) {
                vertices.push(vertices[vertices.length - 2].added(verticalFrontDir.multiplied(-stepHeight)), vertices[vertices.length - 1].added(verticalFrontDir.multiplied(-stepHeight)));
            }
            else {
                vertices.push(vertices[0].added(verticalFrontDir.multiplied(stepHeight)), vertices[1].added(verticalFrontDir.multiplied(stepHeight)));
            }
        }
        if (baseLineSeg3d) {
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
                ...cornerMoldShape.vertices.map(v => v.added(verticalFrontDir.multiplied(startHeight))),
                ...cornerMoldShape.vertices.map(v => v.added(verticalFrontDir.multiplied(startHeight - platformThickness))),
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
    const { start, end, stairShape, moldShape, cornerShape, cornerMoldShape, startHeight, baseLineSeg3d, param } = segment;
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
    const verticalFrontDir = _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ;
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
    if (baseLineSeg3d) {
        const baseLineDir = baseLineSeg3d.end.subtracted(baseLineSeg3d.start).normalized();
        const angle = horizontalFrontDir.angle(baseLineDir);
        const deltaAngle = Math.abs(angle - Math.PI / 2);
        if (deltaAngle <= _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionAngleTolerance) {
            horizontalFrontDir = baseLineDir.cross(horizontalFrontDir.cross(baseLineDir)).normalized();
            horizontalDistance = horizontalDistance * Math.cos(deltaAngle);
            horizontalLeftDir = _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.cross(horizontalFrontDir);
        }
        else {
            if (angle < Math.PI / 2) {
                const cornerConnectionPoint1 = start.added(baseLineDir.multiplied(-startWidth / 2 * Math.sign(angle)));
                cornerMoldShape.vertices = [start, start.added(horizontalLeftDir.multiplied(-startWidth / 2)), cornerConnectionPoint1];
            }
            else {
                const cornerConnectionPoint2 = start.added(baseLineDir.multiplied(startWidth / 2 * Math.sign(angle)));
                cornerMoldShape.vertices = [start, cornerConnectionPoint2, start.added(horizontalLeftDir.multiplied(startWidth / 2))];
            }
            cornerMoldShape.tempLines = [[0, 1], [1, 2], [2, 0]];
            cornerShape.vertices = [
                ...cornerMoldShape.vertices.map(v => v.added(verticalFrontDir.multiplied(startHeight))),
                ...cornerMoldShape.vertices.map(v => v.added(verticalFrontDir.multiplied(startHeight - platformThickness))),
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
        const curLeftPt = curLeftMoldPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight)).added(verticalFrontDir.multiplied(i * stepHeight));
        const curRightPt = curRightMoldPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight)).added(verticalFrontDir.multiplied(i * stepHeight));
        moldVertices.push(curLeftMoldPt, curRightMoldPt);
        moldTempLines.push([2 * i, 1 + 2 * i], [2 * i, 2 + 2 * i], [1 + 2 * i, 3 + 2 * i]);
        vertices.push(curLeftPt, curRightPt);
        if (upward) {
            vertices.push(curLeftPt.added(verticalFrontDir.multiplied(stepHeight)), curRightPt.added(verticalFrontDir.multiplied(stepHeight)));
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
            vertices.push(vertices[vertices.length - 2].added(verticalFrontDir.multiplied(stepHeight)), vertices[vertices.length - 1].added(verticalFrontDir.multiplied(stepHeight)));
            vertices.push(vertices[vertices.length - 2].added(horizontalLeftDir.multiplied(lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength)), vertices[vertices.length - 1].added(horizontalLeftDir.multiplied(-lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength)));
            if (temp) {
                tempLines.push(
                // [4 * stepCount, 1 + 4 * stepCount],
                [4 * (stepCount - 1), 2 + 4 * (stepCount - 1)], [1 + 4 * (stepCount - 1), 3 + 4 * (stepCount - 1)], [2 + 4 * (stepCount - 1), 3 + 4 * (stepCount - 1)], [2 + 4 * (stepCount - 1), 4 + 4 * (stepCount - 1)], [3 + 4 * (stepCount - 1), 5 + 4 * (stepCount - 1)], [4 * stepCount, 1 + 4 * stepCount]);
            }
        }
    }
    else {
        vertices.push(stepCount > 1 ? vertices[vertices.length - 2].added(verticalFrontDir.multiplied(stepHeight)) : leftPt, stepCount > 1 ? vertices[vertices.length - 1].added(verticalFrontDir.multiplied(stepHeight)) : rightPt);
        if (temp) {
            tempLines.push([4 * (stepCount - 1), 1 + 4 * (stepCount - 1)]);
        }
        if (lastStepLength > _consts__WEBPACK_IMPORTED_MODULE_0__.LengthTolerance || lastStepLength === 0) {
            vertices.push(vertices[vertices.length - 2].added(horizontalLeftDir.multiplied(lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength)), vertices[vertices.length - 1].added(horizontalLeftDir.multiplied(-lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength)));
            vertices.push(vertices[vertices.length - 2].added(verticalFrontDir.multiplied(stepHeight)), vertices[vertices.length - 1].added(verticalFrontDir.multiplied(stepHeight)));
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
            vertices.push(vertices[vertices.length - 2].added(verticalFrontDir.multiplied(-stepHeight - (1 - actualLastStepLength / horizontalStep) * stepHeight)), vertices[vertices.length - 1].added(verticalFrontDir.multiplied(-stepHeight - (1 - actualLastStepLength / horizontalStep) * stepHeight)));
            vertices.push(vertices[0].added(horizontalFrontDir.multiplied(horizontalStep)), vertices[1].added(horizontalFrontDir.multiplied(horizontalStep)));
        }
        else {
            vertices.push(vertices[vertices.length - 2].added(horizontalFrontDir.multiplied(-actualLastStepLength)), vertices[vertices.length - 1].added(horizontalFrontDir.multiplied(-actualLastStepLength)));
            vertices.push(vertices[0].added(verticalFrontDir.multiplied(stepHeight)), vertices[1].added(verticalFrontDir.multiplied(stepHeight)));
        }
    }
    else {
        if (temp) {
            tempLines.push([vertices.length - 2, 2 + vertices.length - 2], [1 + vertices.length - 2, 3 + vertices.length - 2], [2 + vertices.length - 2, 3 + vertices.length - 2], [2 + vertices.length - 2, 0], [3 + vertices.length - 2, 1]);
        }
        if (upward) {
            vertices.push(vertices[vertices.length - 2].added(verticalFrontDir.multiplied(-stepHeight)), vertices[vertices.length - 1].added(verticalFrontDir.multiplied(-stepHeight)));
        }
        else {
            vertices.push(vertices[0].added(verticalFrontDir.multiplied(stepHeight)), vertices[1].added(verticalFrontDir.multiplied(stepHeight)));
        }
    }
}
function generatePlatformShape(segment, temp = true) {
    const { start, startHeight, baseLineSeg3d, stairShape, moldShape, cornerShape, cornerMoldShape, param } = segment;
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
    if (baseLineSeg3d) {
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
        else if (angle <= _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionAngleTolerance || angle >= (Math.PI * 2 - _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionAngleTolerance)) {
            segment.end = segment.start.added(prevDirNormalized.multiplied(frontLength));
            param.platformLength = frontLength;
            moldShape.vertices = [
                start.added(prevLeftDir.multiplied(startWidth / 2)),
                start.added(prevLeftDir.multiplied(-startWidth / 2)),
                segment.end.added(prevLeftDir.multiplied(-startWidth / 2)),
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
function generateTempLinesLoop(vertexCount) {
    return Array.from({ length: vertexCount }).map((_, i) => [i, i === vertexCount - 1 ? 0 : i + 1]);
}


/***/ }),

/***/ "./src/main/tools/DrawStairsTool/types.ts":
/*!************************************************!*\
  !*** ./src/main/tools/DrawStairsTool/types.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseLineSeg3dKey: () => (/* binding */ BaseLineSeg3dKey),
/* harmony export */   CircleTangentKey: () => (/* binding */ CircleTangentKey),
/* harmony export */   ComponentIndexKey: () => (/* binding */ ComponentIndexKey),
/* harmony export */   ComponentParamSettings: () => (/* binding */ ComponentParamSettings),
/* harmony export */   ComponentParamType: () => (/* binding */ ComponentParamType),
/* harmony export */   ComponentType: () => (/* binding */ ComponentType),
/* harmony export */   CoordDelimiter: () => (/* binding */ CoordDelimiter),
/* harmony export */   DefaultComponentParam: () => (/* binding */ DefaultComponentParam),
/* harmony export */   Delimiter: () => (/* binding */ Delimiter),
/* harmony export */   ParamKey: () => (/* binding */ ParamKey),
/* harmony export */   StairModelKey: () => (/* binding */ StairModelKey),
/* harmony export */   StairModelValue: () => (/* binding */ StairModelValue),
/* harmony export */   StartEndKey: () => (/* binding */ StartEndKey),
/* harmony export */   getComponentTitle: () => (/* binding */ getComponentTitle),
/* harmony export */   isAxisValid: () => (/* binding */ isAxisValid)
/* harmony export */ });
const StairModelKey = 'DrawStairsModel';
const StairModelValue = '1';
// export const StairKey = 'DSStair';
// export const PlatformKey = 'DSPlatform';
const ParamKey = 'DSParam';
// startHeight and endHeight cached in start and end
const ComponentIndexKey = 'Ind';
const StartEndKey = 'SToE';
const BaseLineSeg3dKey = 'BaseLine';
const CircleTangentKey = 'CircleTangent';
const Delimiter = '&';
const CoordDelimiter = ',';
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
const ComponentParamSettings = {
    horizontalStep: {
        title: "步长",
        min: 1,
        max: 100000,
        step: 10,
        unit: '长',
        precision: 0,
    },
    verticalStep: {
        title: "步长",
        min: 1,
        max: 100000,
        step: 10,
        unit: '高',
        precision: 0,
    },
    startWidth: {
        title: "宽度",
        min: 1,
        max: 100000,
        step: 50,
        unit: '起',
        precision: 0,
    },
    endWidth: {
        title: "宽度",
        min: 1,
        max: 100000,
        step: 50,
        unit: '终',
        precision: 0,
    },
    platformLength: {
        title: "长度",
        min: 100,
        max: 100000,
        step: 50,
        unit: '',
        precision: 0,
    },
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
    platformThickness: {
        title: "厚度",
        min: 1,
        max: 100000,
        step: 10,
        unit: '',
        precision: 0,
    },
};
function getComponentTitle(componentType) {
    if (componentType === ComponentType.StraightStair) {
        return '直';
    }
    else if (componentType === ComponentType.CircularStair) {
        return '旋';
    }
    else {
        return '台';
    }
}
const DefaultComponentParam = {
    index: 0,
    horizontalStep: 500,
    verticalStep: 200,
    startWidth: 1000,
    endWidth: 1000,
    offsetWidth: 0,
    withOffset: false,
    platformLength: 2000,
    type: ComponentType.StraightStair,
    upward: true,
    platformThickness: 200,
    stepProportional: true,
    widthProportional: true,
    platformLengthLocked: false,
    // stepType: StepType.Normal,
    // cornerType: CornerType.Rectangle,
};
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
/* harmony export */   parseParam: () => (/* binding */ parseParam),
/* harmony export */   parseStartEnd: () => (/* binding */ parseStartEnd),
/* harmony export */   parseVector3d: () => (/* binding */ parseVector3d),
/* harmony export */   stringifyParam: () => (/* binding */ stringifyParam),
/* harmony export */   stringifyPoint3d: () => (/* binding */ stringifyPoint3d),
/* harmony export */   stringifyStartEnd: () => (/* binding */ stringifyStartEnd)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/main/tools/DrawStairsTool/types.ts");

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
function stringifyParam(param) {
    let value = '';
    value += `ind=${param.index}${_types__WEBPACK_IMPORTED_MODULE_0__.Delimiter}`;
    value += `hs=${param.horizontalStep}${_types__WEBPACK_IMPORTED_MODULE_0__.Delimiter}`;
    value += `vs=${param.verticalStep}${_types__WEBPACK_IMPORTED_MODULE_0__.Delimiter}`;
    value += `sw=${param.startWidth}${_types__WEBPACK_IMPORTED_MODULE_0__.Delimiter}`;
    value += `ew=${param.endWidth}${_types__WEBPACK_IMPORTED_MODULE_0__.Delimiter}`;
    value += `ow=${param.offsetWidth}${_types__WEBPACK_IMPORTED_MODULE_0__.Delimiter}`;
    value += `tp=${param.type}${_types__WEBPACK_IMPORTED_MODULE_0__.Delimiter}`;
    value += `up=${param.upward ? 1 : 0}${_types__WEBPACK_IMPORTED_MODULE_0__.Delimiter}`;
    value += `ptk=${param.platformThickness}`;
    return value;
}
function parseParam(value) {
    const param = Object.assign({}, _types__WEBPACK_IMPORTED_MODULE_0__.DefaultComponentParam);
    const items = value.split(_types__WEBPACK_IMPORTED_MODULE_0__.Delimiter);
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
    value += `${start.x}${_types__WEBPACK_IMPORTED_MODULE_0__.CoordDelimiter}`;
    value += `${start.y}${_types__WEBPACK_IMPORTED_MODULE_0__.CoordDelimiter}`;
    value += `${start.z}${_types__WEBPACK_IMPORTED_MODULE_0__.Delimiter}`;
    value += `${end.x}${_types__WEBPACK_IMPORTED_MODULE_0__.CoordDelimiter}`;
    value += `${end.y}${_types__WEBPACK_IMPORTED_MODULE_0__.CoordDelimiter}`;
    value += `${end.z}`;
    return value;
}
function parseStartEnd(value) {
    const items = value.split(_types__WEBPACK_IMPORTED_MODULE_0__.Delimiter);
    if (items.length === 2) {
        const startKeyValue = items[0].split(_types__WEBPACK_IMPORTED_MODULE_0__.CoordDelimiter);
        const endKeyValue = items[1].split(_types__WEBPACK_IMPORTED_MODULE_0__.CoordDelimiter);
        if (startKeyValue.length === 3 && endKeyValue.length === 3) {
            const start = GeomLib.createPoint3d(parseFloat(startKeyValue[0]), parseFloat(startKeyValue[1]), parseFloat(startKeyValue[2]));
            const end = GeomLib.createPoint3d(parseFloat(endKeyValue[0]), parseFloat(endKeyValue[1]), parseFloat(endKeyValue[2]));
            return { start, end };
        }
    }
}
function stringifyPoint3d(point) {
    let value = '';
    value += `${point.x}${_types__WEBPACK_IMPORTED_MODULE_0__.CoordDelimiter}`;
    value += `${point.y}${_types__WEBPACK_IMPORTED_MODULE_0__.CoordDelimiter}`;
    value += `${point.z}`;
    return value;
}
function parseVector3d(value) {
    const items = value.split(_types__WEBPACK_IMPORTED_MODULE_0__.CoordDelimiter);
    if (items.length === 3) {
        const vector = GeomLib.createVector3d(parseFloat(items[0]), parseFloat(items[1]), parseFloat(items[2]));
        return vector;
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
    MessageType["ParamChangedByInput"] = "paramChangedByInput";
    MessageType["ParamChangedByDraw"] = "paramChangedByDraw";
    MessageType["ComponentAdded"] = "componentAdded";
    MessageType["DrawStairModelSettled"] = "drawStairModelSettled";
    MessageType["FocusComponentIndex"] = "focusComponentIndex";
    MessageType["RemoveComponent"] = "removeComponent";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2RyYXctc3RhaXJzLy4vc3JjL21haW4vbWFpbi50cyIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy8uL3NyYy9tYWluL3Rvb2xzL0RyYXdTdGFpcnNUb29sL2NvbnN0cy50cyIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy8uL3NyYy9tYWluL3Rvb2xzL0RyYXdTdGFpcnNUb29sL2luZGV4LnRzIiwid2VicGFjazovL2RyYXctc3RhaXJzLy4vc3JjL21haW4vdG9vbHMvRHJhd1N0YWlyc1Rvb2wvbWVzaFV0aWxzLnRzIiwid2VicGFjazovL2RyYXctc3RhaXJzLy4vc3JjL21haW4vdG9vbHMvRHJhd1N0YWlyc1Rvb2wvdGVtcE1lc2hVdGlscy50cyIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy8uL3NyYy9tYWluL3Rvb2xzL0RyYXdTdGFpcnNUb29sL3R5cGVzLnRzIiwid2VicGFjazovL2RyYXctc3RhaXJzLy4vc3JjL21haW4vdG9vbHMvRHJhd1N0YWlyc1Rvb2wvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvLi9zcmMvbWFpbi90eXBlcy50cyIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2RyYXctc3RhaXJzL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2RyYXctc3RhaXJzL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbmltcG9ydCB7IGRyYXdTdGFpcnNUb29sIH0gZnJvbSBcIi4vdG9vbHMvRHJhd1N0YWlyc1Rvb2wvaW5kZXhcIjtcclxuaW1wb3J0IHsgaXNLR3JvdXBJbnN0YW5jZSB9IGZyb20gXCIuL3Rvb2xzL0RyYXdTdGFpcnNUb29sL3V0aWxzXCI7XHJcbmltcG9ydCB7IE1lc3NhZ2VUeXBlIH0gZnJvbSBcIi4vdHlwZXNcIjtcclxuY29uc3QgcGx1Z2luVUkgPSBhcHAuZ2V0UGx1Z2luVUkoKTtcclxucGx1Z2luVUkucmVzaXplKDM2MCwgNzAwKTtcclxucGx1Z2luVUkubW91bnQoKTtcclxubGV0IGFjdGl2YXRlZEN1c3RvbVRvb2w7XHJcbmZ1bmN0aW9uIG9uVUlNZXNzYWdlKGRhdGEpIHtcclxuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEudHlwZSA9PT0gTWVzc2FnZVR5cGUuQWN0aXZhdGVEcmF3U3RhaXJzVG9vbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgKGRhdGEudHlwZSA9PT0gJ2FjdGl2YXRlU3RyYWlnaHRTdGFpcnNUb29sJyB8fCBkYXRhLnR5cGUgPT09ICdhY3RpdmF0ZUNpcmN1bGFyU3RhaXJzVG9vbCcpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhY3RpdmF0ZWRDdXN0b21Ub29sICE9PSBkcmF3U3RhaXJzVG9vbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5hY3RpdmF0ZUN1c3RvbVRvb2woZHJhd1N0YWlyc1Rvb2wsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2YXRlZEN1c3RvbVRvb2wgPSBkcmF3U3RhaXJzVG9vbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGRyYXdTdGFpcnNUb29sLmNoYW5nZUNvbXBvbmVudFR5cGUoZGF0YS5jb21wb25lbnRUeXBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09IE1lc3NhZ2VUeXBlLkRlQWN0aXZhdGVEcmF3U3RhaXJzVG9vbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gfSBlbHNlIGlmIChkYXRhLnR5cGUgPT09ICdkZUFjdGl2YXRlU3RyYWlnaHRTdGFpcnNUb29sJyB8fCBkYXRhLnR5cGUgPT09ICdkZUFjdGl2YXRlQ2lyY3VsYXJTdGFpcnNUb29sJykge1xyXG4gICAgICAgICAgICAgICAgZGVBY3RpdmF0ZURyYXdTdGFpcnNUb29sKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSBNZXNzYWdlVHlwZS5QYXJhbUNoYW5nZWRCeUlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoYWN0aXZhdGVkQ3VzdG9tVG9vbCA9PT0gZHJhd1N0YWlyc1Rvb2wpIHtcclxuICAgICAgICAgICAgICAgIGRyYXdTdGFpcnNUb29sLmNoYW5nZUNvbXBvbmVudFBhcmFtKGRhdGEuY29tcG9uZW50UGFyYW0sIGRhdGEuY2hhbmdlUGFyYW1zKTtcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09IE1lc3NhZ2VUeXBlLkZvY3VzQ29tcG9uZW50SW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIC8vIGlmIChhY3RpdmF0ZWRDdXN0b21Ub29sID09PSBkcmF3U3RhaXJzVG9vbCkge1xyXG4gICAgICAgICAgICAgICAgZHJhd1N0YWlyc1Rvb2wuZm9jdXNDb21wb25lbnQoZGF0YS5jb21wb25lbnRJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSBNZXNzYWdlVHlwZS5SZW1vdmVDb21wb25lbnQpIHtcclxuICAgICAgICAgICAgICAgIC8vIGlmIChhY3RpdmF0ZWRDdXN0b21Ub29sID09PSBkcmF3U3RhaXJzVG9vbCkge1xyXG4gICAgICAgICAgICAgICAgZHJhd1N0YWlyc1Rvb2wucmVtb3ZlQ29tcG9uZW50KGRhdGEuY29tcG9uZW50SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgY2xvc2VQbHVnaW4oKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZGVBY3RpdmF0ZURyYXdTdGFpcnNUb29sKCkge1xyXG4gICAgYWN0aXZhdGVkQ3VzdG9tVG9vbCA9IHVuZGVmaW5lZDtcclxuICAgIGFwcC5kZWFjdGl2YXRlQ3VzdG9tVG9vbChkcmF3U3RhaXJzVG9vbCwgZmFsc2UpO1xyXG59XHJcbnBsdWdpblVJLm9uTWVzc2FnZShvblVJTWVzc2FnZSk7XHJcbmNvbnN0IHNlbGVjdGlvbiA9IGFwcC5nZXRTZWxlY3Rpb24oKTtcclxuc2VsZWN0aW9uLmFkZE9ic2VydmVyKHtcclxuICAgIG9uU2VsZWN0aW9uQ2hhbmdlOiAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYWxsRW50aXRpZXMgPSBzZWxlY3Rpb24uZ2V0QWxsRW50aXRpZXMoKTtcclxuICAgICAgICBpZiAoYWxsRW50aXRpZXMubGVuZ3RoID09PSAxICYmIGlzS0dyb3VwSW5zdGFuY2UoYWxsRW50aXRpZXNbMF0pKSB7XHJcbiAgICAgICAgICAgIGRyYXdTdGFpcnNUb29sLnNldE1vZGVsKGFsbEVudGl0aWVzWzBdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChhY3RpdmF0ZWRDdXN0b21Ub29sICE9PSBkcmF3U3RhaXJzVG9vbCkge1xyXG4gICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5EcmF3U3RhaXJNb2RlbFNldHRsZWQgfSwgJyonKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcbmZ1bmN0aW9uIG9uUGx1Z2luU3RhcnRVcCgpIHtcclxuICAgIGNvbnN0IGFsbEVudGl0aWVzID0gc2VsZWN0aW9uLmdldEFsbEVudGl0aWVzKCk7XHJcbiAgICBpZiAoYWxsRW50aXRpZXMubGVuZ3RoID09PSAxICYmIGlzS0dyb3VwSW5zdGFuY2UoYWxsRW50aXRpZXNbMF0pKSB7XHJcbiAgICAgICAgZHJhd1N0YWlyc1Rvb2wuc2V0TW9kZWwoYWxsRW50aXRpZXNbMF0pO1xyXG4gICAgfVxyXG59XHJcbm9uUGx1Z2luU3RhcnRVcCgpO1xyXG4iLCJpbXBvcnQgeyBEZWZhdWx0Q29tcG9uZW50UGFyYW0gfSBmcm9tIFwiLi90eXBlc1wiO1xyXG5leHBvcnQgY29uc3QgZHVtbXlNYXRyaXg0ID0gR2VvbUxpYi5jcmVhdGVJZGVudGl0eU1hdHJpeDQoKTtcclxuZXhwb3J0IGNvbnN0IGR1bW15VmVjdG9yM2QgPSBHZW9tTGliLmNyZWF0ZVZlY3RvcjNkKDAsIDAsIDEpO1xyXG5leHBvcnQgY29uc3QgZHVtbXlQb2ludDNkID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKDAsIDAsIDApO1xyXG5leHBvcnQgY29uc3QgRGlyZWN0aW9uWiA9IEdlb21MaWIuY3JlYXRlVmVjdG9yM2QoMCwgMCwgMSk7XHJcbi8vIGNvbnN0IEhlaWdodFRvbGVyYW5jZTogbnVtYmVyID0gNTtcclxuZXhwb3J0IGNvbnN0IExlbmd0aFRvbGVyYW5jZSA9IDEwO1xyXG5leHBvcnQgY29uc3QgRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UgPSBNYXRoLlBJIC8gMzY7XHJcbmV4cG9ydCBjb25zdCBBbmdsZVRvbGVyYW5jZSA9IE1hdGguUEkgLyAxODA7XHJcbmV4cG9ydCBjb25zdCBTdGVwQ291bnRMaW1pdCA9IDgwO1xyXG4vLyBjb25zdCBEZWZhdWx0Qm9hcmRUaGlja25lc3MgPSA1MDtcclxuZXhwb3J0IGZ1bmN0aW9uIGdldEVtcHR5U2VnbWVudCgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc3RhcnQ6IGR1bW15UG9pbnQzZCxcclxuICAgICAgICBlbmQ6IGR1bW15UG9pbnQzZCxcclxuICAgICAgICBzdGFydExvY2tlZDogZmFsc2UsXHJcbiAgICAgICAgZW5kTG9ja2VkOiBmYWxzZSxcclxuICAgICAgICBzdGFydEhlaWdodDogMCxcclxuICAgICAgICBlbmRIZWlnaHQ6IDAsXHJcbiAgICAgICAgc3RhaXJTaGFwZToge1xyXG4gICAgICAgICAgICBzdGVwQ291bnQ6IDAsXHJcbiAgICAgICAgICAgIHZlcnRpY2VzOiBbXSxcclxuICAgICAgICAgICAgdGVtcExpbmVzOiBbXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1vbGRTaGFwZToge1xyXG4gICAgICAgICAgICBzdGVwQ291bnQ6IDAsXHJcbiAgICAgICAgICAgIHZlcnRpY2VzOiBbXSxcclxuICAgICAgICAgICAgdGVtcExpbmVzOiBbXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvcm5lclNoYXBlOiB7XHJcbiAgICAgICAgICAgIHN0ZXBDb3VudDogMCxcclxuICAgICAgICAgICAgdmVydGljZXM6IFtdLFxyXG4gICAgICAgICAgICB0ZW1wTGluZXM6IFtdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29ybmVyTW9sZFNoYXBlOiB7XHJcbiAgICAgICAgICAgIHN0ZXBDb3VudDogMCxcclxuICAgICAgICAgICAgdmVydGljZXM6IFtdLFxyXG4gICAgICAgICAgICB0ZW1wTGluZXM6IFtdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGFyYW06IE9iamVjdC5hc3NpZ24oe30sIERlZmF1bHRDb21wb25lbnRQYXJhbSksXHJcbiAgICB9O1xyXG59XHJcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuaW1wb3J0IHsgQ29tcG9uZW50VHlwZSwgUGFyYW1LZXksIFN0YXJ0RW5kS2V5LCBCYXNlTGluZVNlZzNkS2V5LCBTdGFpck1vZGVsS2V5LCBTdGFpck1vZGVsVmFsdWUsIENpcmNsZVRhbmdlbnRLZXkgfSBmcm9tIFwiLi90eXBlc1wiO1xyXG5pbXBvcnQgeyBnZW5lcmF0ZVNoYXBlIH0gZnJvbSBcIi4vdGVtcE1lc2hVdGlsc1wiO1xyXG5pbXBvcnQgeyBidWlsZENvbXBvbmVudEluc3RhbmNlLCBnZW5lcmF0ZU1lc2hlcyB9IGZyb20gXCIuL21lc2hVdGlsc1wiO1xyXG5pbXBvcnQgeyBwYXJzZVBhcmFtLCBwYXJzZVN0YXJ0RW5kLCBwYXJzZVZlY3RvcjNkIH0gZnJvbSBcIi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgZ2V0RW1wdHlTZWdtZW50IH0gZnJvbSBcIi4vY29uc3RzXCI7XHJcbmltcG9ydCB7IGRlQWN0aXZhdGVEcmF3U3RhaXJzVG9vbCB9IGZyb20gXCIuLi8uLi8uLi9tYWluL21haW5cIjtcclxuaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vbWFpbi90eXBlc1wiO1xyXG5jb25zdCBkZXNpZ24gPSBhcHAuZ2V0QWN0aXZlRGVzaWduKCk7XHJcbmNvbnN0IHNlbGVjdGlvbiA9IGFwcC5nZXRTZWxlY3Rpb24oKTtcclxuY29uc3QgcGx1Z2luVUkgPSBhcHAuZ2V0UGx1Z2luVUkoKTtcclxuY29uc3QgYXBwVmlldyA9IGFwcC5nZXRBY3RpdmVWaWV3KCk7XHJcbmNvbnN0IHRvb2xIZWxwZXIgPSBhcHAuZ2V0VG9vbEhlbHBlcigpO1xyXG5leHBvcnQgY2xhc3MgRHJhd1N0YWlyc1Rvb2wge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgLy8gcHJpdmF0ZSBjb21wb25lbnRQYXJhbTogQ29tcG9uZW50UGFyYW0gPSB7IC4uLkRlZmF1bHRDb21wb25lbnRQYXJhbSB9O1xyXG4gICAgICAgIHRoaXMuZHJhd2luZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLnNlZ21lbnRzID0gW107XHJcbiAgICB9XHJcbiAgICBvblRvb2xBY3RpdmUoKSB7XHJcbiAgICAgICAgdG9vbEhlbHBlci5zZXRFeGNsdWRlSW5mZXJlbmNlVHlwZXMoW1xyXG4gICAgICAgICAgICBLRW50aXR5VHlwZS5GYWNlLCBLRW50aXR5VHlwZS5FZGdlLCBLRW50aXR5VHlwZS5BdXhpbGlhcnlCb3VuZGVkQ3VydmUsIEtFbnRpdHlUeXBlLkF1eGlsaWFyeUxpbmUsIEtFbnRpdHlUeXBlLkF1eGlsaWFyeVZlcnRleCxcclxuICAgICAgICAgICAgS0VudGl0eVR5cGUuR3JvdXBJbnN0YW5jZSwgS0VudGl0eVR5cGUuVmVydGV4LCBLQXJjaEZhY2VUeXBlLk5vblBsYW5hciwgS0FyY2hGYWNlVHlwZS5QbGFuYXIsXHJcbiAgICAgICAgXSk7XHJcbiAgICAgICAgY29uc3QgZmlyc3RTZWdtZW50ID0gZ2V0RW1wdHlTZWdtZW50KCk7XHJcbiAgICAgICAgZmlyc3RTZWdtZW50LnN0YXJ0TG9ja2VkID0gZmFsc2U7XHJcbiAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5QYXJhbUNoYW5nZWRCeURyYXcsIGNvbXBvbmVudFBhcmFtOiBPYmplY3QuYXNzaWduKHt9LCBmaXJzdFNlZ21lbnQucGFyYW0pIH0sICcqJyk7XHJcbiAgICAgICAgdGhpcy5zZWdtZW50cyA9IFtmaXJzdFNlZ21lbnRdO1xyXG4gICAgICAgIHRoaXMuZHJhd2luZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5lZGl0TW9kZWwgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBvblRvb2xEZWFjdGl2ZSgpIHtcclxuICAgICAgICB0b29sSGVscGVyLnNldEV4Y2x1ZGVJbmZlcmVuY2VUeXBlcyhbXSk7XHJcbiAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgICAgIGlmICh0aGlzLmVkaXRNb2RlbCkge1xyXG4gICAgICAgICAgICBzZWxlY3Rpb24uYWRkKFt0aGlzLmVkaXRNb2RlbC5wYXJlbnRdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuTGVhdmVEcmF3U3RhaXJzVG9vbCB9LCAnKicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZUFjdGl2YXRlRHJhd1N0YWlyc1Rvb2woKTtcclxuICAgIH1cclxuICAgIG9uTW91c2VNb3ZlKGV2ZW50LCBpbmZlcmVuY2VSZXN1bHQpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnb25Nb3VzZU1vdmUnKTtcclxuICAgICAgICBpZiAoaW5mZXJlbmNlUmVzdWx0KSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnN0IHsgc3RhcnRXaWR0aCwgZW5kV2lkdGgsIHBsYXRmb3JtVGhpY2tuZXNzIH0gPSB0aGlzLmNvbXBvbmVudFBhcmFtO1xyXG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IGluZmVyZW5jZVJlc3VsdC5wb3NpdGlvbjtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VnbWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0U2VnbWVudCA9IHRoaXMuc2VnbWVudHNbdGhpcy5zZWdtZW50cy5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdsYXN0U2VnbWVudC5zdGFydExvY2tlZCcsIGxhc3RTZWdtZW50LnN0YXJ0TG9ja2VkKTtcclxuICAgICAgICAgICAgICAgIGlmIChsYXN0U2VnbWVudC5zdGFydExvY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LmVuZCA9IHBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBDb21wb25lbnQobGFzdFNlZ21lbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VnbWVudHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcmV2U2VnbWVudCA9IHRoaXMuc2VnbWVudHNbdGhpcy5zZWdtZW50cy5sZW5ndGggLSAyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbXVzdCBiZSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcmV2U2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IG1vbGRTaGFwZTogeyB2ZXJ0aWNlcywgdGVtcExpbmVzIH0gfSA9IHByZXZTZWdtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNsb3Nlc3RQb2ludDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtaW5EaXN0YW5jZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZXMuZm9yRWFjaChsaW5lID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsaW5lU2VnM2QgPSBHZW9tTGliLmNyZWF0ZUxpbmVTZWdtZW50M2QodmVydGljZXNbbGluZVswXV0sIHZlcnRpY2VzW2xpbmVbMV1dKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVQb2ludCA9IGxpbmVTZWczZC5nZXRDbG9zZXN0UG9pbnQocG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1ckRpc3RhbmNlID0gdGhlUG9pbnQuZGlzdGFuY2VUbyhwb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjbG9zZXN0UG9pbnQgfHwgY3VyRGlzdGFuY2UgPCBtaW5EaXN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5EaXN0YW5jZSA9IGN1ckRpc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0UG9pbnQgPSB0aGVQb2ludDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuc3RhcnQgPSBjbG9zZXN0UG9pbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LmJhc2VMaW5lU2VnM2QgPSB7IHN0YXJ0OiB2ZXJ0aWNlc1tsaW5lWzBdXSwgZW5kOiB2ZXJ0aWNlc1tsaW5lWzFdXSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RTZWdtZW50LnBpY2tTdGFydFRlbXBTaGFwZUlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwVmlldy5jbGVhclRlbXBvcmFyeVNoYXBlc0J5SWRzKFtsYXN0U2VnbWVudC5waWNrU3RhcnRUZW1wU2hhcGVJZF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsb3Nlc3RQb2ludCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBpY2tTdGFydFRlbXBTaGFwZUlkID0gYXBwVmlldy5kcmF3TGluZXMoW3Bvc2l0aW9uLCBjbG9zZXN0UG9pbnRdLCB7IGNvbG9yOiB7IHI6IDAsIGc6IDAsIGI6IDI1NSB9LCBkZXB0aFRlc3Q6IHRydWUsIHBhdHRlcm46IEtMaW5lUGF0dGVybi5EYXNoLCBnYXBTaXplOiA1MCwgZGFzaFNpemU6IDUwIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwaWNrU3RhcnRUZW1wU2hhcGVJZCA9PT0gbnVsbCB8fCBwaWNrU3RhcnRUZW1wU2hhcGVJZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGlja1N0YXJ0VGVtcFNoYXBlSWQuaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQucGlja1N0YXJ0VGVtcFNoYXBlSWQgPSBwaWNrU3RhcnRUZW1wU2hhcGVJZC5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LnN0YXJ0ID0gcG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGxhc3RTZWdtZW50LnBhcmFtLnR5cGUgPT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSAmJiAhbGFzdFNlZ21lbnQucGFyYW0ucGxhdGZvcm1MZW5ndGhMb2NrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlBhcmFtQ2hhbmdlZEJ5RHJhdywgY29tcG9uZW50UGFyYW06IE9iamVjdC5hc3NpZ24oe30sIGxhc3RTZWdtZW50LnBhcmFtKSB9LCAnKicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25MQnV0dG9uVXAoZXZlbnQsIGluZmVyZW5jZVJlc3VsdCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdvbkxCdXR0b25VcCcpO1xyXG4gICAgICAgIGlmIChpbmZlcmVuY2VSZXN1bHQpIHtcclxuICAgICAgICAgICAgLy8gY29uc3QgcG9zaXRpb24gPSBpbmZlcmVuY2VSZXN1bHQucG9zaXRpb247XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlZ21lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdFNlZ21lbnQgPSB0aGlzLnNlZ21lbnRzW3RoaXMuc2VnbWVudHMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICBpZiAobGFzdFNlZ21lbnQuc3RhcnRMb2NrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncHVzaCBzZWdtZW50Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBzdGFydCwgZW5kLCBwYXJhbTogeyB0eXBlIH0sIGNpcmNsZVRhbmdlbnQgfSA9IGxhc3RTZWdtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuY29tcG9uZW50UGFyYW0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIC4uLnRoaXMuY29tcG9uZW50UGFyYW0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHR5cGU6IHR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gPyBDb21wb25lbnRUeXBlLlN0cmFpZ2h0U3RhaXIgOiBDb21wb25lbnRUeXBlLlBsYXRmb3JtLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBzdGFydFdpZHRoOiBlbmRXaWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAvLyB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBDb21wb25lbnRUeXBlLkNpcmN1bGFyU3RhaXIgJiYgIWNpcmNsZVRhbmdlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuY2lyY2xlVGFuZ2VudCA9IGVuZC5zdWJ0cmFjdGVkKHN0YXJ0KS5ub3JtYWxpemVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5lbmRMb2NrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0UGFyYW0gPSBsYXN0U2VnbWVudC5wYXJhbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dFNlZ21lbnQgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGdldEVtcHR5U2VnbWVudCgpKSwgeyBzdGFydDogbGFzdFNlZ21lbnQuZW5kLCBlbmQ6IGxhc3RTZWdtZW50LmVuZCwgc3RhcnRMb2NrZWQ6IGxhc3RQYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtID8gZmFsc2UgOiB0cnVlLCBzdGFydEhlaWdodDogbGFzdFNlZ21lbnQuZW5kSGVpZ2h0LCBlbmRIZWlnaHQ6IGxhc3RTZWdtZW50LmVuZEhlaWdodCwgcGFyYW06IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbGFzdFBhcmFtKSwgeyBpbmRleDogbGFzdFBhcmFtLmluZGV4ICsgMSwgc3RhcnRXaWR0aDogbGFzdFBhcmFtLmVuZFdpZHRoLCBvZmZzZXRXaWR0aDogMCwgdHlwZTogbGFzdFBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gPyBDb21wb25lbnRUeXBlLlN0cmFpZ2h0U3RhaXIgOiBDb21wb25lbnRUeXBlLlBsYXRmb3JtLCBwbGF0Zm9ybUxlbmd0aExvY2tlZDogZmFsc2UgfSkgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIChsYXN0UGFyYW0udHlwZSAhPT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IG1vbGRTaGFwZTogeyB2ZXJ0aWNlcyB9IH0gPSBsYXN0U2VnbWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFsYXN0U2VnbWVudC5iYXNlTGluZVNlZzNkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5iYXNlTGluZVNlZzNkID0geyBzdGFydDogdmVydGljZXNbMF0sIGVuZDogdmVydGljZXNbMV0gfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0U2VnbWVudC5iYXNlTGluZVNlZzNkID0geyBzdGFydDogdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0sIGVuZDogdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0gfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0UGFyYW0ubW9kZWxFZGl0aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5QYXJhbUNoYW5nZWRCeURyYXcsIGNvbXBvbmVudFBhcmFtOiBsYXN0UGFyYW0gfSwgJyonKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWdtZW50cy5wdXNoKG5leHRTZWdtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4ICE9PSBsYXN0UGFyYW0uaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvY3VzZWRTZWdtZW50ID0gdGhpcy5zZWdtZW50cy5maW5kKHNlZyA9PiBzZWcucGFyYW0uaW5kZXggPT09IHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb2N1c2VkU2VnbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBDb21wb25lbnQoZm9jdXNlZFNlZ21lbnQsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCA9IG5leHRTZWdtZW50LnBhcmFtLmluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLkNvbXBvbmVudEFkZGVkLCBjb21wb25lbnRQYXJhbTogT2JqZWN0LmFzc2lnbih7fSwgbmV4dFNlZ21lbnQucGFyYW0pIH0sICcqJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuc3RhcnRMb2NrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXN0U2VnbWVudC5waWNrU3RhcnRUZW1wU2hhcGVJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBWaWV3LmNsZWFyVGVtcG9yYXJ5U2hhcGVzQnlJZHMoW2xhc3RTZWdtZW50LnBpY2tTdGFydFRlbXBTaGFwZUlkXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBDb21wb25lbnQobGFzdFNlZ21lbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZHJhd1RlbXBDb21wb25lbnQodGhlU2VnbWVudCwgZm9jdXNlZCA9IGZhbHNlKSB7XHJcbiAgICAgICAgdmFyIF9hLCBfYjtcclxuICAgICAgICBpZiAodGhlU2VnbWVudC5zdGFydExvY2tlZCkge1xyXG4gICAgICAgICAgICBnZW5lcmF0ZVNoYXBlKHRoZVNlZ21lbnQsIHRoaXMuZHJhd2luZyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgc3RhaXJTaGFwZTogeyB2ZXJ0aWNlczogc3RhaXJWZXJ0aWNlcywgdGVtcExpbmVzOiBzdGFpclRlbXBMaW5lcyB9LCBtb2xkU2hhcGU6IHsgdmVydGljZXM6IG1vbGRWZXJ0aWNlcywgdGVtcExpbmVzOiBtb2xkVGVtcExpbmVzIH0sIGNvcm5lclNoYXBlOiB7IHZlcnRpY2VzOiBjb3JuZXJWZXJ0aWNlcywgdGVtcExpbmVzOiBjb3JuZXJUZW1wTGluZXMgfSwgY29ybmVyTW9sZFNoYXBlOiB7IHZlcnRpY2VzOiBjb3JuZXJNb2xkVmVydGljZXMsIHRlbXBMaW5lczogY29ybmVyTW9sZFRlbXBMaW5lcyB9LCB9ID0gdGhlU2VnbWVudDtcclxuICAgICAgICAgICAgY29uc3QgdGVtcExpbmVQb2ludHMgPSBbXTtcclxuICAgICAgICAgICAgY29uc3QgbW9sZFRlbXBMaW5lUG9pbnRzID0gW107XHJcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc3RhaXJUZW1wTGluZSBvZiBzdGFpclRlbXBMaW5lcykge1xyXG4gICAgICAgICAgICAgICAgdGVtcExpbmVQb2ludHMucHVzaChbc3RhaXJWZXJ0aWNlc1tzdGFpclRlbXBMaW5lWzBdXSwgc3RhaXJWZXJ0aWNlc1tzdGFpclRlbXBMaW5lWzFdXV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgY29ybmVyVGVtcExpbmUgb2YgY29ybmVyVGVtcExpbmVzKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wTGluZVBvaW50cy5wdXNoKFtjb3JuZXJWZXJ0aWNlc1tjb3JuZXJUZW1wTGluZVswXV0sIGNvcm5lclZlcnRpY2VzW2Nvcm5lclRlbXBMaW5lWzFdXV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgbW9sZFRlbXBMaW5lIG9mIG1vbGRUZW1wTGluZXMpIHtcclxuICAgICAgICAgICAgICAgIG1vbGRUZW1wTGluZVBvaW50cy5wdXNoKFttb2xkVmVydGljZXNbbW9sZFRlbXBMaW5lWzBdXSwgbW9sZFZlcnRpY2VzW21vbGRUZW1wTGluZVsxXV1dKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNvcm5lck1vbGRUZW1wTGluZSBvZiBjb3JuZXJNb2xkVGVtcExpbmVzKSB7XHJcbiAgICAgICAgICAgICAgICBtb2xkVGVtcExpbmVQb2ludHMucHVzaChbY29ybmVyTW9sZFZlcnRpY2VzW2Nvcm5lck1vbGRUZW1wTGluZVswXV0sIGNvcm5lck1vbGRWZXJ0aWNlc1tjb3JuZXJNb2xkVGVtcExpbmVbMV1dXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKChfYSA9IHRoZVNlZ21lbnQudGVtcFNoYXBlSWQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGFwcFZpZXcuY2xlYXJUZW1wb3JhcnlTaGFwZXNCeUlkcyh0aGVTZWdtZW50LnRlbXBTaGFwZUlkKTtcclxuICAgICAgICAgICAgICAgIHRoZVNlZ21lbnQudGVtcFNoYXBlSWQgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBkcmF3VGVtcExpbmVzRnVuYyA9IGZvY3VzZWQgPyBhcHBWaWV3LmRyYXdGbGF0TGluZXMuYmluZChhcHBWaWV3KSA6IGFwcFZpZXcuZHJhd1BvbHlsaW5lcy5iaW5kKGFwcFZpZXcpO1xyXG4gICAgICAgICAgICBpZiAodGVtcExpbmVQb2ludHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zdCBjb2xvclZhbHVlID0gZm9jdXNlZCA/IDI1NSA6IDE1NTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRlbXBTaGFwZUlkID0gZHJhd1RlbXBMaW5lc0Z1bmModGVtcExpbmVQb2ludHMsIHsgY29sb3I6IHsgcjogMjU1LCBnOiAwLCBiOiAwIH0sIGRlcHRoVGVzdDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGVtcFNoYXBlSWQgPT09IG51bGwgfHwgdGVtcFNoYXBlSWQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHRlbXBTaGFwZUlkLmlkcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoZVNlZ21lbnQudGVtcFNoYXBlSWQgPSBbLi4udGVtcFNoYXBlSWQuaWRzXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobW9sZFRlbXBMaW5lUG9pbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbW9sZFRlbXBTaGFwZUlkID0gZHJhd1RlbXBMaW5lc0Z1bmMobW9sZFRlbXBMaW5lUG9pbnRzLCB7IGNvbG9yOiB7IHI6IDAsIGc6IDI1NSwgYjogMCB9LCBkZXB0aFRlc3Q6IHRoaXMuZHJhd2luZyB9KTtcclxuICAgICAgICAgICAgICAgIGlmIChtb2xkVGVtcFNoYXBlSWQgPT09IG51bGwgfHwgbW9sZFRlbXBTaGFwZUlkID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtb2xkVGVtcFNoYXBlSWQuaWRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChfYiA9IHRoZVNlZ21lbnQudGVtcFNoYXBlSWQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhlU2VnbWVudC50ZW1wU2hhcGVJZC5wdXNoKC4uLm1vbGRUZW1wU2hhcGVJZC5pZHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhlU2VnbWVudC50ZW1wU2hhcGVJZCA9IFsuLi5tb2xkVGVtcFNoYXBlSWQuaWRzXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmb2N1c0NvbXBvbmVudChjb21wb25lbnRJbmRleCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNlZ21lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zdCBsYXN0U2VnbWVudCA9IHRoaXMuc2VnbWVudHNbdGhpcy5zZWdtZW50cy5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgY29uc3QgbGFzdFNlZ21lbnRJbmRleCA9IGxhc3RTZWdtZW50LnBhcmFtLmluZGV4O1xyXG4gICAgICAgICAgICBpZiAoY29tcG9uZW50SW5kZXggIT09IHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdGb2N1c2VkU2VnbWVudCA9IHRoaXMuc2VnbWVudHMuZmluZChzZWcgPT4gc2VnLnBhcmFtLmluZGV4ID09PSBjb21wb25lbnRJbmRleCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50SW5kZXggIT09IGxhc3RTZWdtZW50SW5kZXggJiYgbmV3Rm9jdXNlZFNlZ21lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdUZW1wQ29tcG9uZW50KG5ld0ZvY3VzZWRTZWdtZW50LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IG9sZEZvY3VzZWRTZWdtZW50ID0gdGhpcy5zZWdtZW50cy5maW5kKHNlZyA9PiBzZWcucGFyYW0uaW5kZXggPT09IHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4KTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCAhPT0gbGFzdFNlZ21lbnRJbmRleCAmJiBvbGRGb2N1c2VkU2VnbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBDb21wb25lbnQob2xkRm9jdXNlZFNlZ21lbnQsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCA9IGNvbXBvbmVudEluZGV4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlbW92ZUNvbXBvbmVudChjb21wb25lbnRJbmRleCkge1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICBpZiAodGhpcy5zZWdtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhlSW5kZXggPSB0aGlzLnNlZ21lbnRzLmZpbmRJbmRleChzZWcgPT4gc2VnLnBhcmFtLmluZGV4ID09PSBjb21wb25lbnRJbmRleCk7XHJcbiAgICAgICAgICAgIGlmICh0aGVJbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0aGVTZWdtZW50ID0gdGhpcy5zZWdtZW50c1t0aGVJbmRleF07XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kcmF3aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChfYSA9IHRoZVNlZ21lbnQudGVtcFNoYXBlSWQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwVmlldy5jbGVhclRlbXBvcmFyeVNoYXBlc0J5SWRzKHRoZVNlZ21lbnQudGVtcFNoYXBlSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZWRpdE1vZGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlSW5zdGFuY2UgPSB0aGlzLmVkaXRNb2RlbC5jaGlsZC5nZXQoY29tcG9uZW50SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGVJbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlbC5jaGlsZC5kZWxldGUoY29tcG9uZW50SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNpZ24ucmVtb3ZlR3JvdXBJbnN0YW5jZSh0aGVJbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWdtZW50cy5zcGxpY2UodGhlSW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VnbWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4ID09PSBjb21wb25lbnRJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCA9IHRoaXMuc2VnbWVudHNbdGhpcy5zZWdtZW50cy5sZW5ndGggLSAxXS5wYXJhbS5pbmRleDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlbCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjaGFuZ2VDb21wb25lbnRQYXJhbShjb21wb25lbnRQYXJhbSwgY2hhbmdlUGFyYW1zKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnNlZ21lbnRzLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgY29uc3QgdGhlU2VnbWVudCA9IHRoaXMuc2VnbWVudHMuZmluZChzZWcgPT4gc2VnLnBhcmFtLmluZGV4ID09PSBjb21wb25lbnRQYXJhbS5pbmRleCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGxhc3RTZWdtZW50ID0gdGhpcy5zZWdtZW50c1t0aGlzLnNlZ21lbnRzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICBpZiAodGhlU2VnbWVudCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeyBwYXJhbTogeyBpbmRleCB9IH0gPSB0aGVTZWdtZW50O1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc3QgeyBzdGFydFdpZHRoOiBuZXdXaWR0aCB9ID0gY29tcG9uZW50UGFyYW07XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zdCB7IHN0YXJ0LCBwYXJhbTogeyBpbmRleCwgc3RhcnRXaWR0aCwgdHlwZSwgb2Zmc2V0V2lkdGggfSwgYmFzZUxpbmVTZWczZCB9ID0gdGhlU2VnbWVudDtcclxuICAgICAgICAgICAgICAgIC8vIGlmIChjaGFuZ2VQYXJhbXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuU3RhcnRXaWR0aCkgPiAtMSAmJiB0eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtICYmIGJhc2VMaW5lU2VnM2QgJiYgb2Zmc2V0V2lkdGggIT09IDApIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICBjb25zdCBuZXdTdGFydFdpZHRoID0gTWF0aC5jZWlsKHN0YXJ0V2lkdGggLyAoc3RhcnRXaWR0aCArIE1hdGguYWJzKG9mZnNldFdpZHRoKSkgKiBuZXdXaWR0aCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgY29uc3Qgc2lnbiA9IG9mZnNldFdpZHRoIC8gTWF0aC5hYnMob2Zmc2V0V2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGNvbnN0IG5ld09mZnNldFdpZHRoID0gc2lnbiAqIChuZXdXaWR0aCAtIG5ld1N0YXJ0V2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGNvbnN0IGJhc2VEaXIgPSBiYXNlTGluZVNlZzNkLmVuZC5zdWJ0cmFjdGVkKGJhc2VMaW5lU2VnM2Quc3RhcnQpLm5vcm1hbGl6ZWQoKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICBjb25zdCBuZXdFbmQgPSBzdGFydC5hZGRlZChiYXNlRGlyLm11bHRpcGxpZWQoc2lnbiAqIChuZXdTdGFydFdpZHRoIC8gMiArIE1hdGguYWJzKG5ld09mZnNldFdpZHRoKSkpKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICBjb21wb25lbnRQYXJhbS5zdGFydFdpZHRoID0gbmV3U3RhcnRXaWR0aDtcclxuICAgICAgICAgICAgICAgIC8vICAgICBjb21wb25lbnRQYXJhbS5lbmRXaWR0aCA9IG5ld1N0YXJ0V2lkdGg7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgY29tcG9uZW50UGFyYW0ub2Zmc2V0V2lkdGggPSBuZXdPZmZzZXRXaWR0aDtcclxuICAgICAgICAgICAgICAgIC8vICAgICB0aGVTZWdtZW50LmVuZCA9IG5ld0VuZDtcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIHRoZVNlZ21lbnQucGFyYW0gPSBjb21wb25lbnRQYXJhbTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYXdpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdUZW1wQ29tcG9uZW50KHRoZVNlZ21lbnQsIHRoZVNlZ21lbnQucGFyYW0uaW5kZXggIT09IGxhc3RTZWdtZW50LnBhcmFtLmluZGV4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZWRpdE1vZGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlSW5zdGFuY2UgPSB0aGlzLmVkaXRNb2RlbC5jaGlsZC5nZXQoaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGVJbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZVNoYXBlKHRoZVNlZ21lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVNZXNoZXMgPSBnZW5lcmF0ZU1lc2hlcyhbdGhlU2VnbWVudF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhlTWVzaGVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzaWduLnN0YXJ0T3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3BlcmF0aW9uU3VjY2VzcyA9ICh5aWVsZCBkZXNpZ24uYWN0aXZhdGVHcm91cEluc3RhbmNlKHRoaXMuZWRpdE1vZGVsLnBhcmVudCkpLmlzU3VjY2VzcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb25TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZGVzaWduLnJlbW92ZUdyb3VwSW5zdGFuY2UodGhlSW5zdGFuY2UpLmlzU3VjY2VzcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdJbnN0YW5jZSA9IGJ1aWxkQ29tcG9uZW50SW5zdGFuY2UodGhlU2VnbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICEhbmV3SW5zdGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdJbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZWwuY2hpbGQuc2V0KGluZGV4LCBuZXdJbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2lnbi5jb21taXRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2lnbi5hYm9ydE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5jb21wb25lbnRQYXJhbSA9IGNvbXBvbmVudFBhcmFtO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvLyBjaGFuZ2VDb21wb25lbnRUeXBlKGNvbXBvbmVudFR5cGU6IENvbXBvbmVudFR5cGUpIHtcclxuICAgIC8vICAgICB0aGlzLmNvbXBvbmVudFBhcmFtLnR5cGUgPSBjb21wb25lbnRUeXBlO1xyXG4gICAgLy8gICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogJ2NvbXBvbmVudFBhcmFtQ2hhbmdlZCcsIGNvbXBvbmVudFBhcmFtOiB7IC4uLnRoaXMuY29tcG9uZW50UGFyYW0gfSB9LCAnKicpO1xyXG4gICAgLy8gICAgIHRoaXMuY2hhbmdlQ29tcG9uZW50UGFyYW0odGhpcy5jb21wb25lbnRQYXJhbSwgW0NvbXBvbmVudFBhcmFtVHlwZS5UeXBlXSk7XHJcbiAgICAvLyB9XHJcbiAgICB0cnlDb21taXQoKSB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIGNvbnN0IG1lc2hlcyA9IGdlbmVyYXRlTWVzaGVzKHRoaXMuc2VnbWVudHMpO1xyXG4gICAgICAgIGlmIChtZXNoZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGRlc2lnbi5zdGFydE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICBjb25zdCBuZXdJbnN0YW5jZXMgPSBbXTtcclxuICAgICAgICAgICAgY29uc3QgZWRpdE1vZGVsQ2hpbGQgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbGlkU2VnbWVudHMgPSBbXTtcclxuICAgICAgICAgICAgbGV0IG9wZXJhdGlvblN1Y2Nlc3MgPSB0cnVlO1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHNlZ21lbnQgb2YgdGhpcy5zZWdtZW50cykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzZWdtZW50Lm1lc2gpXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW9wZXJhdGlvblN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZXNpZ24uYWJvcnRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdJbnN0YW5jZSA9IGJ1aWxkQ29tcG9uZW50SW5zdGFuY2Uoc2VnbWVudCk7XHJcbiAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAhIW5ld0luc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ld0luc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3SW5zdGFuY2VzLnB1c2gobmV3SW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRNb2RlbENoaWxkLnNldChzZWdtZW50LnBhcmFtLmluZGV4LCBuZXdJbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5wYXJhbS5wbGF0Zm9ybUxlbmd0aExvY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5wYXJhbS5zdGVwUHJvcG9ydGlvbmFsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LnBhcmFtLndpZHRoUHJvcG9ydGlvbmFsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LnBhcmFtLm1vZGVsRWRpdGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRTZWdtZW50cy5wdXNoKHNlZ21lbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChuZXdJbnN0YW5jZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnRJbnN0YW5jZSA9IChfYSA9IGRlc2lnbi5tYWtlR3JvdXAoW10sIG5ld0luc3RhbmNlcywgW10pKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYWRkZWRJbnN0YW5jZTtcclxuICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICEhcGFyZW50SW5zdGFuY2U7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnREZWYgPSBwYXJlbnRJbnN0YW5jZSA9PT0gbnVsbCB8fCBwYXJlbnRJbnN0YW5jZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGFyZW50SW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyZW50SW5zdGFuY2UgJiYgcGFyZW50RGVmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgcGFyZW50RGVmLnNldEN1c3RvbVByb3BlcnR5KFN0YWlyTW9kZWxLZXksIFN0YWlyTW9kZWxWYWx1ZSkuaXNTdWNjZXNzO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb25TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2lnbi5jb21taXRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZWwgPSB7IHBhcmVudDogcGFyZW50SW5zdGFuY2UsIGNoaWxkOiBlZGl0TW9kZWxDaGlsZCB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlZ21lbnRzID0gdmFsaWRTZWdtZW50cztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBDb21wb25lbnQodmFsaWRTZWdtZW50c1swXSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuRHJhd1N0YWlyTW9kZWxTZXR0bGVkLCBjb21wb25lbnRQYXJhbXM6IHRoaXMuc2VnbWVudHMubWFwKHNlZyA9PiAoT2JqZWN0LmFzc2lnbih7fSwgc2VnLnBhcmFtKSkpIH0sICcqJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVzaWduLmFib3J0T3BlcmF0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2V0TW9kZWwoZ3JvdXBJbnN0YW5jZSkge1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICBpZiAoKChfYSA9IHRoaXMuZWRpdE1vZGVsKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucGFyZW50LmdldEtleSgpKSA9PT0gZ3JvdXBJbnN0YW5jZS5nZXRLZXkoKSkge1xyXG4gICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLkRyYXdTdGFpck1vZGVsU2V0dGxlZCwgY29tcG9uZW50UGFyYW1zOiB0aGlzLnNlZ21lbnRzLm1hcChzZWcgPT4gKE9iamVjdC5hc3NpZ24oe30sIHNlZy5wYXJhbSkpKSB9LCAnKicpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZWRpdE1vZGVsID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGNvbnN0IGdyb3VwRGVmID0gZ3JvdXBJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKTtcclxuICAgICAgICBpZiAoZ3JvdXBJbnN0YW5jZSAmJiBncm91cERlZikge1xyXG4gICAgICAgICAgICBjb25zdCBzdGFpck1vZGVsUHJvcGVydHkgPSBncm91cERlZi5nZXRDdXN0b21Qcm9wZXJ0eShTdGFpck1vZGVsS2V5KTtcclxuICAgICAgICAgICAgaWYgKHN0YWlyTW9kZWxQcm9wZXJ0eSA9PT0gU3RhaXJNb2RlbFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzZWdtZW50cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3ViR3JvdXBJbnN0YW5jZXMgPSBncm91cERlZi5nZXRTdWJHcm91cEluc3RhbmNlcygpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWRpdE1vZGVsID0geyBwYXJlbnQ6IGdyb3VwSW5zdGFuY2UsIGNoaWxkOiBuZXcgTWFwKCkgfTtcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgc3ViSW5zdGFuY2Ugb2Ygc3ViR3JvdXBJbnN0YW5jZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdWJEZWYgPSBzdWJJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3ViRGVmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IGNvbXBvbmVudEluZGV4VmFsdWUgPSBwYXJzZUludChzdWJEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoQ29tcG9uZW50SW5kZXhLZXkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGlzRmluaXRlKGNvbXBvbmVudEluZGV4VmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmFtID0gcGFyc2VQYXJhbShzdWJEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoUGFyYW1LZXkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRFbmQgPSBwYXJzZVN0YXJ0RW5kKHN1YkRlZi5nZXRDdXN0b21Qcm9wZXJ0eShTdGFydEVuZEtleSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiYXNlTGluZVNlZzNkID0gcGFyc2VTdGFydEVuZChzdWJEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoQmFzZUxpbmVTZWczZEtleSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjaXJjbGVUYW5nZW50ID0gcGFyc2VWZWN0b3IzZChzdWJEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoQ2lyY2xlVGFuZ2VudEtleSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW0gJiYgc3RhcnRFbmQgJiYgYmFzZUxpbmVTZWczZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VnbWVudCA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgZ2V0RW1wdHlTZWdtZW50KCkpLCB7IHN0YXJ0OiBzdGFydEVuZC5zdGFydCwgZW5kOiBzdGFydEVuZC5lbmQsIHN0YXJ0SGVpZ2h0OiBzdGFydEVuZC5zdGFydC56LCBlbmRIZWlnaHQ6IHN0YXJ0RW5kLmVuZC56LCBiYXNlTGluZVNlZzNkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpcmNsZVRhbmdlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW0sIHN0YXJ0TG9ja2VkOiB0cnVlLCBlbmRMb2NrZWQ6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50cy5wdXNoKHNlZ21lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdE1vZGVsLmNoaWxkLnNldChwYXJhbS5pbmRleCwgc3ViSW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VnbWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudHMuc29ydCgoYSwgYikgPT4gYS5wYXJhbS5pbmRleCAtIGIucGFyYW0uaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VnbWVudHMgPSBzZWdtZW50cztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlbCA9IGVkaXRNb2RlbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdUZW1wQ29tcG9uZW50KHNlZ21lbnRzWzBdLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLkRyYXdTdGFpck1vZGVsU2V0dGxlZCwgY29tcG9uZW50UGFyYW1zOiB0aGlzLnNlZ21lbnRzLm1hcChzZWcgPT4gKE9iamVjdC5hc3NpZ24oe30sIHNlZy5wYXJhbSkpKSB9LCAnKicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xlYXIoKSB7XHJcbiAgICAgICAgYXBwVmlldy5jbGVhclRlbXBvcmFyeVNoYXBlcygpO1xyXG4gICAgICAgIC8vIHRoaXMuY29tcG9uZW50UGFyYW0gPSB7IC4uLkRlZmF1bHRDb21wb25lbnRQYXJhbSB9O1xyXG4gICAgICAgIC8vIHRoaXMuc2VnbWVudHMgPSBbXTtcclxuICAgICAgICB0aGlzLmRyYXdpbmcgPSBmYWxzZTtcclxuICAgICAgICAvLyB0aGlzLmVkaXRNb2RlbCA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIG9uUkJ1dHRvblVwKGV2ZW50LCBpbmZlcmVuY2VSZXN1bHQpIHtcclxuICAgICAgICB0aGlzLnRyeUNvbW1pdCgpO1xyXG4gICAgICAgIGRlQWN0aXZhdGVEcmF3U3RhaXJzVG9vbCgpO1xyXG4gICAgfVxyXG4gICAgb25MQnV0dG9uRGJDbGljayhldmVudCwgaW5mZXJlbmNlUmVzdWx0KSB7XHJcbiAgICAgICAgO1xyXG4gICAgfVxyXG4gICAgYWxsb3dVc2luZ0luZmVyZW5jZSgpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIG9uS2V5RG93bihldmVudCkge1xyXG4gICAgICAgIDtcclxuICAgIH1cclxuICAgIG9uS2V5VXAoZXZlbnQpIHtcclxuICAgICAgICA7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNvbnN0IGRyYXdTdGFpcnNUb29sID0gbmV3IERyYXdTdGFpcnNUb29sKCk7XHJcbiIsImltcG9ydCB7IEJhc2VMaW5lU2VnM2RLZXksIENpcmNsZVRhbmdlbnRLZXksIENvbXBvbmVudFR5cGUsIFBhcmFtS2V5LCBTdGFydEVuZEtleSB9IGZyb20gXCIuL3R5cGVzXCI7XHJcbmltcG9ydCB7IHN0cmluZ2lmeVBhcmFtLCBzdHJpbmdpZnlQb2ludDNkLCBzdHJpbmdpZnlTdGFydEVuZCB9IGZyb20gXCIuL3V0aWxzXCI7XHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZU1lc2hlcyhzZWdtZW50cykge1xyXG4gICAgY29uc3QgbWVzaGVzID0gW107XHJcbiAgICBmb3IgKGNvbnN0IHNlZ21lbnQgb2Ygc2VnbWVudHMpIHtcclxuICAgICAgICBjb25zdCB7IHBhcmFtOiB7IHR5cGUgfSwgY2lyY2xlVGFuZ2VudCB9ID0gc2VnbWVudDtcclxuICAgICAgICBpZiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyKSB7XHJcbiAgICAgICAgICAgIGdlbmVyYXRlU3RyYWlnaHRTdGFpck1lc2goc2VnbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpcikge1xyXG4gICAgICAgICAgICBpZiAoY2lyY2xlVGFuZ2VudCkge1xyXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVDaXJjdWxhclN0YWlyTWVzaChzZWdtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdlbmVyYXRlU3RyYWlnaHRTdGFpck1lc2goc2VnbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGdlbmVyYXRlUGxhdGZvcm1NZXNoKHNlZ21lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2VnbWVudC5tZXNoKSB7XHJcbiAgICAgICAgICAgIG1lc2hlcy5wdXNoKHNlZ21lbnQubWVzaCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1lc2hlcztcclxufVxyXG5mdW5jdGlvbiBnZW5lcmF0ZUNpcmN1bGFyU3RhaXJNZXNoKHNlZ21lbnQpIHtcclxuICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mLCBfZywgX2gsIF9qLCBfaywgX2w7XHJcbiAgICBjb25zdCB7IHN0YXJ0TG9ja2VkLCBjaXJjbGVUYW5nZW50LCBzdGFpclNoYXBlOiB7IHZlcnRpY2VzLCBzdGVwQ291bnQgfSwgY29ybmVyU2hhcGU6IHsgdmVydGljZXM6IGNvcm5lclZlcnRpY2VzIH0sIHBhcmFtOiB7IHVwd2FyZCB9IH0gPSBzZWdtZW50O1xyXG4gICAgaWYgKHN0ZXBDb3VudCA8IDEgfHwgIXN0YXJ0TG9ja2VkIHx8ICFjaXJjbGVUYW5nZW50KVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICBjb25zdCBzdGFpck1lc2ggPSB7XHJcbiAgICAgICAgdmVydGljZXM6IHZlcnRpY2VzLm1hcCh2ZXJ0ZXggPT4gW3ZlcnRleC54LCB2ZXJ0ZXgueSwgdmVydGV4LnpdKSxcclxuICAgICAgICB0cmlhbmdsZUluZGljZXM6IFtdLFxyXG4gICAgICAgIHNvZnRFZGdlczogW10sXHJcbiAgICB9O1xyXG4gICAgLy8g5pyA5bqV6YOo5Y+w6Zi25ZCO5LiL5L2N572uXHJcbiAgICAvLyBjb25zdCBsZWZ0SW5kZXggPSB2ZXJ0aWNlcy5sZW5ndGggLSAoKCF1cHdhcmQgJiYgc3RlcENvdW50ID4gMSkgPyA0IDogMik7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ZXBDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxyXG4gICAgICAgIC8vIHN0YWlyIGZhY2VzXHJcbiAgICAgICAgW2kgKiA0LCBpICogNCArIDEsIGkgKiA0ICsgMl0sIFtpICogNCArIDEsIGkgKiA0ICsgMywgaSAqIDQgKyAyXSwgW2kgKiA0ICsgMiwgaSAqIDQgKyAzLCBpICogNCArIDRdLCBbaSAqIDQgKyAzLCBpICogNCArIDUsIGkgKiA0ICsgNF0sIFxyXG4gICAgICAgIC8vIHNpZGUgZmFjZXNcclxuICAgICAgICBbaSAqIDQsIGkgKiA0ICsgMiwgKGkgKyAxKSAqIDRdLCBbaSAqIDQgKyAxLCAoaSArIDEpICogNCArIDEsIGkgKiA0ICsgM10pO1xyXG4gICAgICAgIChfYSA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wdXNoKFtpICogNCArIDEsIGkgKiA0ICsgMl0sIFtpICogNCArIDMsIGkgKiA0ICsgNF0sIFtpICogNCwgKGkgKyAxKSAqIDRdLCBbKGkgKyAxKSAqIDQgKyAxLCBpICogNCArIDFdKTtcclxuICAgICAgICBpZiAodXB3YXJkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJvdHRvbUZyb250TGVmdEluZGV4ID0gNCAqIHN0ZXBDb3VudCArIDIgKyAyICogKHN0ZXBDb3VudCAtIGkgLSAxKTtcclxuICAgICAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxyXG4gICAgICAgICAgICAvLyBzaWRlIG1pZGRsZSBmYWNlc1xyXG4gICAgICAgICAgICBbaSAqIDQsIChpICsgMSkgKiA0LCBib3R0b21Gcm9udExlZnRJbmRleF0sIFsoaSArIDEpICogNCArIDEsIGkgKiA0ICsgMSwgYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAxXSk7XHJcbiAgICAgICAgICAgIGlmIChpIDwgc3RlcENvdW50IC0gMSkge1xyXG4gICAgICAgICAgICAgICAgKF9iID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnB1c2goWyhpICsgMSkgKiA0LCBib3R0b21Gcm9udExlZnRJbmRleF0sIFsoaSArIDEpICogNCArIDEsIGJvdHRvbUZyb250TGVmdEluZGV4ICsgMV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgLy8gc2lkZSBib3R0b20gZmFjZXNcclxuICAgICAgICAgICAgICAgIFtpICogNCwgYm90dG9tRnJvbnRMZWZ0SW5kZXgsIGJvdHRvbUZyb250TGVmdEluZGV4ICsgMl0sIFtib3R0b21Gcm9udExlZnRJbmRleCArIDEsIGkgKiA0ICsgMSwgYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAzXSwgXHJcbiAgICAgICAgICAgICAgICAvLyBib3R0b20gZmFjZXNcclxuICAgICAgICAgICAgICAgIFtib3R0b21Gcm9udExlZnRJbmRleCArIDIsIGJvdHRvbUZyb250TGVmdEluZGV4LCBib3R0b21Gcm9udExlZnRJbmRleCArIDNdLCBbYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAzLCBib3R0b21Gcm9udExlZnRJbmRleCwgYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAxXSk7XHJcbiAgICAgICAgICAgICAgICAoX2MgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MucHVzaChbaSAqIDQsIGJvdHRvbUZyb250TGVmdEluZGV4XSwgW2kgKiA0ICsgMSwgYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAxXSwgW2JvdHRvbUZyb250TGVmdEluZGV4ICsgMywgYm90dG9tRnJvbnRMZWZ0SW5kZXhdKTtcclxuICAgICAgICAgICAgICAgIGlmIChpIDwgc3RlcENvdW50IC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIChfZCA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5wdXNoKFtib3R0b21Gcm9udExlZnRJbmRleCArIDEsIGJvdHRvbUZyb250TGVmdEluZGV4XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAvLyBib3R0b20gZmFjZXNcclxuICAgICAgICAgICAgICAgIFtpICogNCwgYm90dG9tRnJvbnRMZWZ0SW5kZXgsIGkgKiA0ICsgMV0sIFtpICogNCArIDEsIGJvdHRvbUZyb250TGVmdEluZGV4LCBib3R0b21Gcm9udExlZnRJbmRleCArIDFdKTtcclxuICAgICAgICAgICAgICAgIChfZSA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS5wdXNoKFtpICogNCArIDEsIGJvdHRvbUZyb250TGVmdEluZGV4XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJvdHRvbUJhY2tMZWZ0SW5kZXggPSA0ICogc3RlcENvdW50ICsgMiArIDIgKiAoc3RlcENvdW50IC0gaSAtIDEpO1xyXG4gICAgICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXHJcbiAgICAgICAgICAgIC8vIHNpZGUgbWlkZGxlIGZhY2VzXHJcbiAgICAgICAgICAgIFtpICogNCwgKGkgKyAxKSAqIDQsIGJvdHRvbUJhY2tMZWZ0SW5kZXhdLCBbKGkgKyAxKSAqIDQgKyAxLCBpICogNCArIDEsIGJvdHRvbUJhY2tMZWZ0SW5kZXggKyAxXSwgXHJcbiAgICAgICAgICAgIC8vIGJvdHRvbSBmYWNlc1xyXG4gICAgICAgICAgICBbYm90dG9tQmFja0xlZnRJbmRleCwgYm90dG9tQmFja0xlZnRJbmRleCAtIDIsIGJvdHRvbUJhY2tMZWZ0SW5kZXggKyAxXSwgW2JvdHRvbUJhY2tMZWZ0SW5kZXggKyAxLCBib3R0b21CYWNrTGVmdEluZGV4IC0gMiwgYm90dG9tQmFja0xlZnRJbmRleCAtIDFdKTtcclxuICAgICAgICAgICAgKF9mID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9mLnB1c2goW2JvdHRvbUJhY2tMZWZ0SW5kZXggKyAxLCBib3R0b21CYWNrTGVmdEluZGV4IC0gMl0pO1xyXG4gICAgICAgICAgICBpZiAoaSA8IHN0ZXBDb3VudCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIChfZyA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9nID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZy5wdXNoKFsoaSArIDEpICogNCwgYm90dG9tQmFja0xlZnRJbmRleF0sIFsoaSArIDEpICogNCArIDEsIGJvdHRvbUJhY2tMZWZ0SW5kZXggKyAxXSk7XHJcbiAgICAgICAgICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAvLyBzaWRlIGJvdHRvbSBmYWNlc1xyXG4gICAgICAgICAgICAgICAgWyhpICsgMSkgKiA0LCBib3R0b21CYWNrTGVmdEluZGV4IC0gMiwgYm90dG9tQmFja0xlZnRJbmRleF0sIFtib3R0b21CYWNrTGVmdEluZGV4IC0gMSwgKGkgKyAxKSAqIDQgKyAxLCBib3R0b21CYWNrTGVmdEluZGV4ICsgMV0pO1xyXG4gICAgICAgICAgICAgICAgKF9oID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9oLnB1c2goWyhpICsgMSkgKiA0LCBib3R0b21CYWNrTGVmdEluZGV4IC0gMl0sIFsoaSArIDEpICogNCArIDEsIGJvdHRvbUJhY2tMZWZ0SW5kZXggLSAxXSwgW2JvdHRvbUJhY2tMZWZ0SW5kZXggKyAxLCBib3R0b21CYWNrTGVmdEluZGV4IC0gMl0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKF9qID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2ogPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9qLnB1c2goW2JvdHRvbUJhY2tMZWZ0SW5kZXggKyAxLCBib3R0b21CYWNrTGVmdEluZGV4XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodXB3YXJkKSB7XHJcbiAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxyXG4gICAgICAgIC8vIGJvdHRvbSBmYWNlc1xyXG4gICAgICAgIC8vIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCAxLCAwXSxcclxuICAgICAgICAvLyBbdmVydGljZXMubGVuZ3RoIC0gMSwgMCwgdmVydGljZXMubGVuZ3RoIC0gMl0sXHJcbiAgICAgICAgLy8g5YmN5L6n6Z2iXHJcbiAgICAgICAgW3N0ZXBDb3VudCAqIDQsIHN0ZXBDb3VudCAqIDQgKyAxLCBzdGVwQ291bnQgKiA0ICsgMl0sIFtzdGVwQ291bnQgKiA0ICsgMSwgc3RlcENvdW50ICogNCArIDMsIHN0ZXBDb3VudCAqIDQgKyAyXSk7XHJcbiAgICAgICAgKF9rID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2sgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9rLnB1c2goXHJcbiAgICAgICAgLy8gW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIDBdLFxyXG4gICAgICAgIFtzdGVwQ291bnQgKiA0ICsgMSwgc3RlcENvdW50ICogNCArIDJdKTtcclxuICAgICAgICAvLyBpZiAoc3RlcENvdW50ID4gMSkge1xyXG4gICAgICAgIC8vICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXHJcbiAgICAgICAgLy8gICAgICAgICAvLyBzaWRlIGJvdHRvbSBmYWNlc1xyXG4gICAgICAgIC8vICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIHZlcnRpY2VzLmxlbmd0aCAtIDEwLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSxcclxuICAgICAgICAvLyAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCB2ZXJ0aWNlcy5sZW5ndGggLSAzLCB2ZXJ0aWNlcy5sZW5ndGggLSA5XSxcclxuICAgICAgICAvLyAgICAgICAgIC8vIGJvdHRvbSBmYWNlc1xyXG4gICAgICAgIC8vICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLFxyXG4gICAgICAgIC8vICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDQsIHZlcnRpY2VzLmxlbmd0aCAtIDZdLFxyXG4gICAgICAgIC8vICAgICApO1xyXG4gICAgICAgIC8vICAgICBzdGFpck1lc2guc29mdEVkZ2VzPy5wdXNoKFxyXG4gICAgICAgIC8vICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLFxyXG4gICAgICAgIC8vICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIHZlcnRpY2VzLmxlbmd0aCAtIDEwXSxcclxuICAgICAgICAvLyAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSAxMCwgdmVydGljZXMubGVuZ3RoIC0gNF0sXHJcbiAgICAgICAgLy8gICAgICk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxyXG4gICAgICAgIC8vIOWQjuS+p+mdolxyXG4gICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCAxLCAwXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIDAsIHZlcnRpY2VzLmxlbmd0aCAtIDJdKTtcclxuICAgICAgICAoX2wgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2wucHVzaChbdmVydGljZXMubGVuZ3RoIC0gMSwgMF0pO1xyXG4gICAgICAgIC8vIGlmIChzdGVwQ291bnQgPiAxKSB7XHJcbiAgICAgICAgLy8gICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcclxuICAgICAgICAvLyAgICAgICAgIC8vIHNpZGUgYm90dG9tIGZhY2VzXHJcbiAgICAgICAgLy8gICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gMiwgMCwgdmVydGljZXMubGVuZ3RoIC0gNF0sXHJcbiAgICAgICAgLy8gICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gMSwgdmVydGljZXMubGVuZ3RoIC0gMywgMV0sXHJcbiAgICAgICAgLy8gICAgICAgICAvLyBib3R0b20gZmFjZXNcclxuICAgICAgICAvLyAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSA1LCB2ZXJ0aWNlcy5sZW5ndGggLSA0LCB2ZXJ0aWNlcy5sZW5ndGggLSAzXSxcclxuICAgICAgICAvLyAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSA1LCB2ZXJ0aWNlcy5sZW5ndGggLSA2LCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSxcclxuICAgICAgICAvLyAgICAgKTtcclxuICAgICAgICAvLyAgICAgc3RhaXJNZXNoLnNvZnRFZGdlcz8ucHVzaChcclxuICAgICAgICAvLyAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSA1LCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSxcclxuICAgICAgICAvLyAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSAzLCAxXSxcclxuICAgICAgICAvLyAgICAgICAgIFswLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSxcclxuICAgICAgICAvLyAgICAgKTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcbiAgICBpZiAoY29ybmVyVmVydGljZXMubGVuZ3RoID09PSA2KSB7XHJcbiAgICAgICAgZ2VuZXJhdGVQb2x5Z29uTWVzaChjb3JuZXJWZXJ0aWNlcywgc3RhaXJNZXNoKTtcclxuICAgIH1cclxuICAgIHNlZ21lbnQubWVzaCA9IHN0YWlyTWVzaDtcclxufVxyXG5mdW5jdGlvbiBnZW5lcmF0ZVN0cmFpZ2h0U3RhaXJNZXNoKHNlZ21lbnQpIHtcclxuICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mLCBfZywgX2gsIF9qLCBfaztcclxuICAgIGNvbnN0IHsgc3RhcnRMb2NrZWQsIHN0YWlyU2hhcGU6IHsgdmVydGljZXMsIHN0ZXBDb3VudCB9LCBjb3JuZXJTaGFwZTogeyB2ZXJ0aWNlczogY29ybmVyVmVydGljZXMgfSwgcGFyYW06IHsgdXB3YXJkIH0gfSA9IHNlZ21lbnQ7XHJcbiAgICBpZiAoc3RlcENvdW50IDwgMSB8fCAhc3RhcnRMb2NrZWQpXHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IHN0YWlyTWVzaCA9IHtcclxuICAgICAgICB2ZXJ0aWNlczogdmVydGljZXMubWFwKHZlcnRleCA9PiBbdmVydGV4LngsIHZlcnRleC55LCB2ZXJ0ZXguel0pLFxyXG4gICAgICAgIHRyaWFuZ2xlSW5kaWNlczogW10sXHJcbiAgICAgICAgc29mdEVkZ2VzOiBbXSxcclxuICAgIH07XHJcbiAgICBjb25zdCBsZWZ0SW5kZXggPSB2ZXJ0aWNlcy5sZW5ndGggLSAoKCF1cHdhcmQgJiYgc3RlcENvdW50ID4gMSkgPyA0IDogMik7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ZXBDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxyXG4gICAgICAgIC8vIHN0YWlyIGZhY2VzXHJcbiAgICAgICAgW2kgKiA0LCBpICogNCArIDEsIGkgKiA0ICsgMl0sIFtpICogNCArIDEsIGkgKiA0ICsgMywgaSAqIDQgKyAyXSwgW2kgKiA0ICsgMiwgaSAqIDQgKyAzLCBpICogNCArIDRdLCBbaSAqIDQgKyAzLCBpICogNCArIDUsIGkgKiA0ICsgNF0sIFxyXG4gICAgICAgIC8vIHNpZGUgZmFjZXNcclxuICAgICAgICBbaSAqIDQsIGkgKiA0ICsgMiwgKGkgKyAxKSAqIDRdLCBbaSAqIDQgKyAxLCAoaSArIDEpICogNCArIDEsIGkgKiA0ICsgM10pO1xyXG4gICAgICAgIChfYSA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wdXNoKFtpICogNCArIDEsIGkgKiA0ICsgMl0sIFtpICogNCArIDMsIGkgKiA0ICsgNF0sIFtpICogNCwgKGkgKyAxKSAqIDRdLCBbKGkgKyAxKSAqIDQgKyAxLCBpICogNCArIDFdKTtcclxuICAgICAgICBpZiAoaSA9PT0gc3RlcENvdW50IC0gMSAmJiB1cHdhcmQgJiYgc3RlcENvdW50ID4gMSkge1xyXG4gICAgICAgICAgICBjb25zdCBiYkxlZnRJbmRleCA9IHZlcnRpY2VzLmxlbmd0aCAtIDQ7XHJcbiAgICAgICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcclxuICAgICAgICAgICAgLy8gdGFpbCBzaWRlIGZhY2VzXHJcbiAgICAgICAgICAgIFtiYkxlZnRJbmRleCwgaSAqIDQsIChpICsgMSkgKiA0XSwgW2JiTGVmdEluZGV4ICsgMSwgKGkgKyAxKSAqIDQgKyAxLCBpICogNCArIDFdKTtcclxuICAgICAgICAgICAgKF9iID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnB1c2goW2JiTGVmdEluZGV4LCBpICogNF0sIFxyXG4gICAgICAgICAgICAvLyBbaSAqIDQsIChpICsgMSkgKiA0XSxcclxuICAgICAgICAgICAgW2JiTGVmdEluZGV4ICsgMSwgaSAqIDQgKyAxXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXHJcbiAgICAgICAgICAgIC8vIHNpZGUgZmFjZXNcclxuICAgICAgICAgICAgW2xlZnRJbmRleCwgaSAqIDQsIChpICsgMSkgKiA0XSwgW2xlZnRJbmRleCArIDEsIChpICsgMSkgKiA0ICsgMSwgaSAqIDQgKyAxXSk7XHJcbiAgICAgICAgICAgIC8vIHN0YWlyTWVzaC5zb2Z0RWRnZXM/LnB1c2goXHJcbiAgICAgICAgICAgIC8vICAgICBbaSAqIDQsIChpICsgMSkgKiA0XSxcclxuICAgICAgICAgICAgLy8gICAgIFsoaSArIDEpICogNCArIDEsIGkgKiA0ICsgMV0sXHJcbiAgICAgICAgICAgIC8vICk7XHJcbiAgICAgICAgICAgIGlmICh1cHdhcmQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIChfYyA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5wdXNoKFtsZWZ0SW5kZXgsIGkgKiA0XSwgW2xlZnRJbmRleCArIDEsIGkgKiA0ICsgMV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHN0ZXBDb3VudCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAoX2QgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QucHVzaChbbGVmdEluZGV4LCAoaSArIDEpICogNF0sIFtsZWZ0SW5kZXggKyAxLCAoaSArIDEpICogNCArIDFdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdGVwQ291bnQgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKF9lID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lLnB1c2goW2xlZnRJbmRleCwgaSAqIDRdLCBbbGVmdEluZGV4ICsgMSwgaSAqIDQgKyAxXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA8IHN0ZXBDb3VudCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAoX2YgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2YucHVzaChbbGVmdEluZGV4LCAoaSArIDEpICogNF0sIFtsZWZ0SW5kZXggKyAxLCAoaSArIDEpICogNCArIDFdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh1cHdhcmQpIHtcclxuICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXHJcbiAgICAgICAgLy8gYm90dG9tIGZhY2VzXHJcbiAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIDEsIDBdLCBbdmVydGljZXMubGVuZ3RoIC0gMSwgMCwgdmVydGljZXMubGVuZ3RoIC0gMl0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAzLCB2ZXJ0aWNlcy5sZW5ndGggLSAxLCB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDIsIHZlcnRpY2VzLmxlbmd0aCAtIDRdKTtcclxuICAgICAgICAoX2cgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2cucHVzaChbdmVydGljZXMubGVuZ3RoIC0gMSwgMF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAzLCB2ZXJ0aWNlcy5sZW5ndGggLSAyXSk7XHJcbiAgICAgICAgaWYgKHN0ZXBDb3VudCA+IDEpIHtcclxuICAgICAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxyXG4gICAgICAgICAgICAvLyBzaWRlIGJvdHRvbSBmYWNlc1xyXG4gICAgICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gMiwgdmVydGljZXMubGVuZ3RoIC0gMTAsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLCBbdmVydGljZXMubGVuZ3RoIC0gMSwgdmVydGljZXMubGVuZ3RoIC0gMywgdmVydGljZXMubGVuZ3RoIC0gOV0sIFxyXG4gICAgICAgICAgICAvLyBib3R0b20gZmFjZXNcclxuICAgICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLCBbdmVydGljZXMubGVuZ3RoIC0gNSwgdmVydGljZXMubGVuZ3RoIC0gNCwgdmVydGljZXMubGVuZ3RoIC0gNl0pO1xyXG4gICAgICAgICAgICAoX2ggPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfaCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2gucHVzaChbdmVydGljZXMubGVuZ3RoIC0gNSwgdmVydGljZXMubGVuZ3RoIC0gNF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAyLCB2ZXJ0aWNlcy5sZW5ndGggLSAxMF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAxMCwgdmVydGljZXMubGVuZ3RoIC0gNF0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcclxuICAgICAgICAvLyBib3R0b20gZmFjZXNcclxuICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gMSwgMCwgMV0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAwXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDIsIHZlcnRpY2VzLmxlbmd0aCAtIDFdLCBbdmVydGljZXMubGVuZ3RoIC0gMywgdmVydGljZXMubGVuZ3RoIC0gNCwgdmVydGljZXMubGVuZ3RoIC0gMl0pO1xyXG4gICAgICAgIChfaiA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9qID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfai5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCAwXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDJdKTtcclxuICAgICAgICBpZiAoc3RlcENvdW50ID4gMSkge1xyXG4gICAgICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXHJcbiAgICAgICAgICAgIC8vIHNpZGUgYm90dG9tIGZhY2VzXHJcbiAgICAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSAyLCAwLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIHZlcnRpY2VzLmxlbmd0aCAtIDMsIDFdLCBcclxuICAgICAgICAgICAgLy8gYm90dG9tIGZhY2VzXHJcbiAgICAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSA1LCB2ZXJ0aWNlcy5sZW5ndGggLSA0LCB2ZXJ0aWNlcy5sZW5ndGggLSAzXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDYsIHZlcnRpY2VzLmxlbmd0aCAtIDRdKTtcclxuICAgICAgICAgICAgKF9rID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2sgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9rLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLCBbdmVydGljZXMubGVuZ3RoIC0gMywgMV0sIFswLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGNvcm5lclZlcnRpY2VzLmxlbmd0aCA9PT0gNikge1xyXG4gICAgICAgIGdlbmVyYXRlUG9seWdvbk1lc2goY29ybmVyVmVydGljZXMsIHN0YWlyTWVzaCk7XHJcbiAgICB9XHJcbiAgICBzZWdtZW50Lm1lc2ggPSBzdGFpck1lc2g7XHJcbn1cclxuZnVuY3Rpb24gZ2VuZXJhdGVQbGF0Zm9ybU1lc2goc2VnbWVudCkge1xyXG4gICAgY29uc3QgeyBzdGFpclNoYXBlOiB7IHZlcnRpY2VzIH0gfSA9IHNlZ21lbnQ7XHJcbiAgICAvLyBpZiAoZW5kTG9ja2VkKSB7XHJcbiAgICBjb25zdCB2ZXJ0ZXhMZW5ndGggPSB2ZXJ0aWNlcy5sZW5ndGggLyAyO1xyXG4gICAgaWYgKHZlcnRleExlbmd0aCA9PT0gNCB8fCB2ZXJ0ZXhMZW5ndGggPT09IDUpIHtcclxuICAgICAgICBjb25zdCBwbGF0Zm9ybU1lc2ggPSB7XHJcbiAgICAgICAgICAgIHZlcnRpY2VzOiBbXSxcclxuICAgICAgICAgICAgdHJpYW5nbGVJbmRpY2VzOiBbXSxcclxuICAgICAgICAgICAgc29mdEVkZ2VzOiBbXSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGdlbmVyYXRlUG9seWdvbk1lc2godmVydGljZXMsIHBsYXRmb3JtTWVzaCk7XHJcbiAgICAgICAgc2VnbWVudC5tZXNoID0gcGxhdGZvcm1NZXNoO1xyXG4gICAgfVxyXG4gICAgLy8gfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxufVxyXG5mdW5jdGlvbiBnZW5lcmF0ZVBvbHlnb25NZXNoKHZlcnRpY2VzLCBtZXNoKSB7XHJcbiAgICB2YXIgX2EsIF9iO1xyXG4gICAgY29uc3QgdmVydGV4TGVuZ3RoID0gbWVzaC52ZXJ0aWNlcy5sZW5ndGg7XHJcbiAgICBtZXNoLnZlcnRpY2VzLnB1c2goLi4udmVydGljZXMubWFwKHZlcnRleCA9PiBbdmVydGV4LngsIHZlcnRleC55LCB2ZXJ0ZXguel0pKTtcclxuICAgIGNvbnN0IHNlZ0NvdW50ID0gdmVydGljZXMubGVuZ3RoIC8gMjtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VnQ291bnQ7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHJpZ2h0ID0gaSA9PT0gc2VnQ291bnQgLSAxID8gMCA6IGkgKyAxO1xyXG4gICAgICAgIGNvbnN0IGJvdHRvbVJpZ2h0ID0gaSA9PT0gc2VnQ291bnQgLSAxID8gc2VnQ291bnQgOiBpICsgc2VnQ291bnQgKyAxO1xyXG4gICAgICAgIG1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goW2kgKyB2ZXJ0ZXhMZW5ndGgsIGkgKyBzZWdDb3VudCArIHZlcnRleExlbmd0aCwgYm90dG9tUmlnaHQgKyB2ZXJ0ZXhMZW5ndGhdLCBbaSArIHZlcnRleExlbmd0aCwgYm90dG9tUmlnaHQgKyB2ZXJ0ZXhMZW5ndGgsIHJpZ2h0ICsgdmVydGV4TGVuZ3RoXSk7XHJcbiAgICAgICAgKF9hID0gbWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wdXNoKFtpICsgdmVydGV4TGVuZ3RoLCBib3R0b21SaWdodCArIHZlcnRleExlbmd0aF0pO1xyXG4gICAgICAgIGlmIChpID4gMCAmJiBpIDwgc2VnQ291bnQgLSAxKSB7XHJcbiAgICAgICAgICAgIG1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXHJcbiAgICAgICAgICAgIC8vIHRvcCBhbmQgYm90dG9tXHJcbiAgICAgICAgICAgIFtpICsgdmVydGV4TGVuZ3RoLCByaWdodCArIHZlcnRleExlbmd0aCwgMCArIHZlcnRleExlbmd0aF0sIFtib3R0b21SaWdodCArIHZlcnRleExlbmd0aCwgaSArIHNlZ0NvdW50ICsgdmVydGV4TGVuZ3RoLCBzZWdDb3VudCArIHZlcnRleExlbmd0aF0pO1xyXG4gICAgICAgICAgICBpZiAoaSA+IDEpIHtcclxuICAgICAgICAgICAgICAgIChfYiA9IG1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IucHVzaChbaSwgMCArIHZlcnRleExlbmd0aF0sIFtpICsgc2VnQ291bnQgKyB2ZXJ0ZXhMZW5ndGgsIHNlZ0NvdW50ICsgdmVydGV4TGVuZ3RoXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkQ29tcG9uZW50SW5zdGFuY2Uoc2VnbWVudCkge1xyXG4gICAgdmFyIF9hLCBfYjtcclxuICAgIGNvbnN0IHsgc3RhcnQsIGVuZCwgc3RhcnRIZWlnaHQsIGVuZEhlaWdodCwgYmFzZUxpbmVTZWczZCwgY2lyY2xlVGFuZ2VudCwgcGFyYW0sIG1lc2ggfSA9IHNlZ21lbnQ7XHJcbiAgICBjb25zdCBkZXNpZ24gPSBhcHAuZ2V0QWN0aXZlRGVzaWduKCk7XHJcbiAgICBsZXQgb3BlcmF0aW9uU3VjY2VzcyA9IHRydWU7XHJcbiAgICBpZiAobWVzaCA9PT0gbnVsbCB8fCBtZXNoID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtZXNoLnZlcnRpY2VzLmxlbmd0aCkge1xyXG4gICAgICAgIGNvbnN0IG5ld1NoZWxsID0gKF9hID0gZGVzaWduLmNyZWF0ZVNoZWxsRnJvbU1lc2gobWVzaCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5uZXdTaGVsbDtcclxuICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAhIW5ld1NoZWxsO1xyXG4gICAgICAgIGlmIChuZXdTaGVsbCkge1xyXG4gICAgICAgICAgICAvLyBpZiAocGFyYW0udHlwZSAhPT0gQ29tcG9uZW50VHlwZS5DaXJjdWxhclN0YWlyKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBjb25zdCBzb2Z0RWRnZXMgPSBuZXdTaGVsbC5nZXRFZGdlcygpLmZpbHRlcihlID0+IGUuaXNTb2Z0KCkpO1xyXG4gICAgICAgICAgICAvLyAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZGVzaWduLnJlbW92ZUVkZ2VzKHNvZnRFZGdlcykuaXNTdWNjZXNzO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0luc3RhbmNlID0gKF9iID0gZGVzaWduLm1ha2VHcm91cChuZXdTaGVsbC5nZXRGYWNlcygpLCBbXSwgW10pKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuYWRkZWRJbnN0YW5jZTtcclxuICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgISFuZXdJbnN0YW5jZTtcclxuICAgICAgICAgICAgY29uc3QgZ3JvdXBEZWYgPSBuZXdJbnN0YW5jZSA9PT0gbnVsbCB8fCBuZXdJbnN0YW5jZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogbmV3SW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCk7XHJcbiAgICAgICAgICAgIGlmIChuZXdJbnN0YW5jZSAmJiBncm91cERlZikge1xyXG4gICAgICAgICAgICAgICAgLy8gb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZ3JvdXBEZWYuc2V0Q3VzdG9tUHJvcGVydHkoQ29tcG9uZW50SW5kZXhLZXksIGAke25ld0luc3RhbmNlcy5sZW5ndGh9YCkuaXNTdWNjZXNzO1xyXG4gICAgICAgICAgICAgICAgLy8gbmV3SW5zdGFuY2VzLnB1c2gobmV3SW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyYW1TdHJpbmcgPSBzdHJpbmdpZnlQYXJhbShwYXJhbSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydEVuZFN0cmluZyA9IHN0cmluZ2lmeVN0YXJ0RW5kKEdlb21MaWIuY3JlYXRlUG9pbnQzZChzdGFydC54LCBzdGFydC55LCBzdGFydEhlaWdodCksIEdlb21MaWIuY3JlYXRlUG9pbnQzZChlbmQueCwgZW5kLnksIGVuZEhlaWdodCkpO1xyXG4gICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZ3JvdXBEZWYuc2V0Q3VzdG9tUHJvcGVydHkoUGFyYW1LZXksIHBhcmFtU3RyaW5nKS5pc1N1Y2Nlc3M7XHJcbiAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBncm91cERlZi5zZXRDdXN0b21Qcm9wZXJ0eShTdGFydEVuZEtleSwgc3RhcnRFbmRTdHJpbmcpLmlzU3VjY2VzcztcclxuICAgICAgICAgICAgICAgIGlmIChiYXNlTGluZVNlZzNkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgQmFzZUxpbmVTdHJpbmcgPSBzdHJpbmdpZnlTdGFydEVuZChiYXNlTGluZVNlZzNkLnN0YXJ0LCBiYXNlTGluZVNlZzNkLmVuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZ3JvdXBEZWYuc2V0Q3VzdG9tUHJvcGVydHkoQmFzZUxpbmVTZWczZEtleSwgQmFzZUxpbmVTdHJpbmcpLmlzU3VjY2VzcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjaXJjbGVUYW5nZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFuZ2VudFN0cmluZyA9IHN0cmluZ2lmeVBvaW50M2QoY2lyY2xlVGFuZ2VudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZ3JvdXBEZWYuc2V0Q3VzdG9tUHJvcGVydHkoQ2lyY2xlVGFuZ2VudEtleSwgdGFuZ2VudFN0cmluZykuaXNTdWNjZXNzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld0luc3RhbmNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxufVxyXG4iLCJpbXBvcnQgeyBBbmdsZVRvbGVyYW5jZSwgRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UsIERpcmVjdGlvblosIGR1bW15UG9pbnQzZCwgTGVuZ3RoVG9sZXJhbmNlLCBTdGVwQ291bnRMaW1pdCB9IGZyb20gXCIuL2NvbnN0c1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRUeXBlIH0gZnJvbSBcIi4vdHlwZXNcIjtcclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlU2hhcGUoc2VnbWVudCwgdGVtcCA9IHRydWUpIHtcclxuICAgIGNvbnN0IHsgcGFyYW06IHsgdHlwZSB9LCBjaXJjbGVUYW5nZW50IH0gPSBzZWdtZW50O1xyXG4gICAgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpcikge1xyXG4gICAgICAgIGdlbmVyYXRlU3RyYWlnaHRTdGFpclNoYXBlKHNlZ21lbnQsIHRlbXApO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5DaXJjdWxhclN0YWlyKSB7XHJcbiAgICAgICAgaWYgKGNpcmNsZVRhbmdlbnQpIHtcclxuICAgICAgICAgICAgZ2VuZXJhdGVDaXJjdWxhclN0YWlyU2hhcGUoc2VnbWVudCwgdGVtcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBnZW5lcmF0ZVN0cmFpZ2h0U3RhaXJTaGFwZShzZWdtZW50LCB0ZW1wKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBnZW5lcmF0ZVBsYXRmb3JtU2hhcGUoc2VnbWVudCwgdGVtcCk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZ2VuZXJhdGVDaXJjdWxhclN0YWlyU2hhcGUoc2VnbWVudCwgdGVtcCA9IHRydWUpIHtcclxuICAgIGNvbnN0IHsgc3RhcnQsIGVuZCwgc3RhaXJTaGFwZSwgbW9sZFNoYXBlLCBjb3JuZXJTaGFwZSwgY29ybmVyTW9sZFNoYXBlLCBzdGFydEhlaWdodCwgYmFzZUxpbmVTZWczZCwgY2lyY2xlVGFuZ2VudCwgcGFyYW0gfSA9IHNlZ21lbnQ7XHJcbiAgICBjb25zdCB7IHN0YXJ0V2lkdGgsIGVuZFdpZHRoLCBob3Jpem9udGFsU3RlcCwgdmVydGljYWxTdGVwLCB1cHdhcmQsIHBsYXRmb3JtVGhpY2tuZXNzIH0gPSBwYXJhbTtcclxuICAgIGlmIChjaXJjbGVUYW5nZW50KSB7XHJcbiAgICAgICAgY29uc3QgdmVydGljYWxGcm9udERpciA9IERpcmVjdGlvblo7XHJcbiAgICAgICAgY29uc3QgdGFuZ2VudExlZnREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKGNpcmNsZVRhbmdlbnQpLm5vcm1hbGl6ZWQoKTtcclxuICAgICAgICBjb25zdCBzdGFydEVuZERpciA9IGVuZC5zdWJ0cmFjdGVkKHN0YXJ0KS5ub3JtYWxpemVkKCk7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRFbmREaXN0YW5jZSA9IHN0YXJ0LmRpc3RhbmNlVG8oZW5kKTtcclxuICAgICAgICBjb25zdCBtYXhXaWR0aCA9IE1hdGgubWF4KHN0YXJ0V2lkdGgsIGVuZFdpZHRoKTtcclxuICAgICAgICBjb25zdCBlbmRBbmdsZSA9IHN0YXJ0RW5kRGlyLmFuZ2xlVG8oY2lyY2xlVGFuZ2VudCwgRGlyZWN0aW9uWik7XHJcbiAgICAgICAgaWYgKGVuZEFuZ2xlIDwgRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGdlbmVyYXRlU3RyYWlnaHRTdGFpclNoYXBlKHNlZ21lbnQsIHRlbXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBpc0xlZnRBcmMgPSBlbmRBbmdsZSA+IE1hdGguUEk7XHJcbiAgICAgICAgY29uc3QgZW5kQ29tcGxlbWVudGFyeUFuZ2xlID0gaXNMZWZ0QXJjID8gTWF0aC5hYnMoZW5kQW5nbGUgLSBNYXRoLlBJIC8gMiAtIE1hdGguUEkpIDogTWF0aC5hYnMoZW5kQW5nbGUgLSBNYXRoLlBJIC8gMik7XHJcbiAgICAgICAgY29uc3QgaGFsZkNob3JkID0gc3RhcnRFbmREaXN0YW5jZSAvIDI7XHJcbiAgICAgICAgY29uc3QgcmFkaXVzID0gaGFsZkNob3JkIC8gTWF0aC5jb3MoZW5kQ29tcGxlbWVudGFyeUFuZ2xlKTtcclxuICAgICAgICBjb25zdCBpbm5lclJhZGl1cyA9IHJhZGl1cyAtIG1heFdpZHRoIC8gMjtcclxuICAgICAgICBpZiAocmFkaXVzIDwgbWF4V2lkdGggLyAyICogMS4yIHx8IGlubmVyUmFkaXVzIDwgaG9yaXpvbnRhbFN0ZXAgLyAyIC8gMC44KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgaG9yaXpvbnRhbFN0ZXBBbmdsZSA9IE1hdGguYXNpbihob3Jpem9udGFsU3RlcCAvIDIgLyBpbm5lclJhZGl1cykgKiAyO1xyXG4gICAgICAgIGNvbnN0IGNpcmNsZU5vcm1hbCA9IGlzTGVmdEFyYyA/IERpcmVjdGlvblogOiBEaXJlY3Rpb25aLnJldmVyc2VkKCk7XHJcbiAgICAgICAgY29uc3QgY2lyY2xlQ2VudGVyID0gc3RhcnQuYWRkZWQodGFuZ2VudExlZnREaXIubXVsdGlwbGllZChpc0xlZnRBcmMgPyByYWRpdXMgOiAtcmFkaXVzKSk7XHJcbiAgICAgICAgLy8gY29uc3QgY2lyY2xlID0gR2VvbUxpYi5jcmVhdGVDaXJjbGUzZEJ5Q2VudGVyTm9ybWFsUmFkaXVzKGNpcmNsZUNlbnRlciwgY2lyY2xlTm9ybWFsLCByYWRpdXMpO1xyXG4gICAgICAgIGNvbnN0IGFyYyA9IEdlb21MaWIuY3JlYXRlQXJjM2RCeUNlbnRlck5vcm1hbFJhZGl1cyhjaXJjbGVDZW50ZXIsIGNpcmNsZU5vcm1hbCwgcmFkaXVzLCBzdGFydCwgZW5kKTtcclxuICAgICAgICBjb25zdCBhcmNBbmdsZSA9IGFyYy5hcmNBbmdsZTtcclxuICAgICAgICBjb25zdCBzdGVwQ291bnQgPSBNYXRoLmNlaWwoYXJjQW5nbGUgLyBob3Jpem9udGFsU3RlcEFuZ2xlKTtcclxuICAgICAgICBjb25zdCBsYXN0SG9yaXpvbnRhbEFuZ2xlID0gYXJjQW5nbGUgLSBob3Jpem9udGFsU3RlcEFuZ2xlICogKHN0ZXBDb3VudCAtIDEpO1xyXG4gICAgICAgIGNvbnN0IHZhbGlkU3RlcENvdW50ID0gKGxhc3RIb3Jpem9udGFsQW5nbGUgPT09IDAgfHwgbGFzdEhvcml6b250YWxBbmdsZSA+IEFuZ2xlVG9sZXJhbmNlKSA/IHN0ZXBDb3VudCA6IHN0ZXBDb3VudCAtIDE7XHJcbiAgICAgICAgaWYgKGhvcml6b250YWxTdGVwQW5nbGUgPj0gYXJjQW5nbGUgfHwgaG9yaXpvbnRhbFN0ZXBBbmdsZSA+PSBNYXRoLlBJIC8gMiB8fCB2YWxpZFN0ZXBDb3VudCA+PSBTdGVwQ291bnRMaW1pdCB8fCB2YWxpZFN0ZXBDb3VudCA8IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gW107XHJcbiAgICAgICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXTtcclxuICAgICAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXTtcclxuICAgICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW107XHJcbiAgICAgICAgY29ybmVyU2hhcGUudmVydGljZXMgPSBbXTtcclxuICAgICAgICBjb3JuZXJTaGFwZS50ZW1wTGluZXMgPSBbXTtcclxuICAgICAgICBjb3JuZXJNb2xkU2hhcGUudmVydGljZXMgPSBbXTtcclxuICAgICAgICBjb3JuZXJNb2xkU2hhcGUudGVtcExpbmVzID0gW107XHJcbiAgICAgICAgY29uc3QgeyB2ZXJ0aWNlcywgdGVtcExpbmVzIH0gPSBzdGFpclNoYXBlO1xyXG4gICAgICAgIGNvbnN0IHsgdmVydGljZXM6IG1vbGRWZXJ0aWNlcywgdGVtcExpbmVzOiBtb2xkVGVtcExpbmVzIH0gPSBtb2xkU2hhcGU7XHJcbiAgICAgICAgLy8gY29uc3QgY2VudGVySG9yaXpvbnRhbFN0ZXAgPSBob3Jpem9udGFsU3RlcCAvIGlubmVyUmFkaXVzICogcmFkaXVzO1xyXG4gICAgICAgIGNvbnN0IHN0ZXBIZWlnaHQgPSB1cHdhcmQgPyB2ZXJ0aWNhbFN0ZXAgOiAtdmVydGljYWxTdGVwO1xyXG4gICAgICAgIHNlZ21lbnQuZW5kSGVpZ2h0ID0gc2VnbWVudC5zdGFydEhlaWdodCArIHZhbGlkU3RlcENvdW50ICogc3RlcEhlaWdodDtcclxuICAgICAgICBzdGFpclNoYXBlLnN0ZXBDb3VudCA9IHZhbGlkU3RlcENvdW50O1xyXG4gICAgICAgIG1vbGRTaGFwZS5zdGVwQ291bnQgPSB2YWxpZFN0ZXBDb3VudDtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygndmFsaWRTdGVwQ291bnQ6ICAgJyx2YWxpZFN0ZXBDb3VudCk7XHJcbiAgICAgICAgY29uc3QgbGVmdFB0ID0gc3RhcnQuYWRkZWQodGFuZ2VudExlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpO1xyXG4gICAgICAgIGNvbnN0IHJpZ2h0UHQgPSBzdGFydC5hZGRlZCh0YW5nZW50TGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpO1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0UmFkaXVzRGlyID0gaXNMZWZ0QXJjID8gdGFuZ2VudExlZnREaXIucmV2ZXJzZWQoKSA6IHRhbmdlbnRMZWZ0RGlyO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RlcENvdW50IC0gMTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1clJvdGF0ZU1hdHJpeCA9IEdlb21MaWIuY3JlYXRlUm90YXRlTWF0cml4NChob3Jpem9udGFsU3RlcEFuZ2xlICogaSwgY2lyY2xlTm9ybWFsLCBkdW1teVBvaW50M2QpO1xyXG4gICAgICAgICAgICBjb25zdCBjdXJSYWRpdXNEaXIgPSBzdGFydFJhZGl1c0Rpci5hcHBsaWVkTWF0cml4NChjdXJSb3RhdGVNYXRyaXgpO1xyXG4gICAgICAgICAgICBjb25zdCBjdXJIYWxmV2lkdGggPSAoc3RhcnRXaWR0aCArIChlbmRXaWR0aCAtIHN0YXJ0V2lkdGgpICogKGkgKiBob3Jpem9udGFsU3RlcEFuZ2xlKSAvIGFyY0FuZ2xlKSAvIDIgKiAoaXNMZWZ0QXJjID8gLTEgOiAxKTtcclxuICAgICAgICAgICAgY29uc3QgY3VyTGVmdE1vbGRQdCA9IGNpcmNsZUNlbnRlci5hZGRlZChjdXJSYWRpdXNEaXIubXVsdGlwbGllZChyYWRpdXMgKyBjdXJIYWxmV2lkdGgpKTtcclxuICAgICAgICAgICAgY29uc3QgY3VyUmlnaHRNb2xkUHQgPSBjaXJjbGVDZW50ZXIuYWRkZWQoY3VyUmFkaXVzRGlyLm11bHRpcGxpZWQocmFkaXVzIC0gY3VySGFsZldpZHRoKSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1ckxlZnRQdCA9IGN1ckxlZnRNb2xkUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkuYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKGkgKiBzdGVwSGVpZ2h0KSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1clJpZ2h0UHQgPSBjdXJSaWdodE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoaSAqIHN0ZXBIZWlnaHQpKTtcclxuICAgICAgICAgICAgbW9sZFZlcnRpY2VzLnB1c2goY3VyTGVmdE1vbGRQdCwgY3VyUmlnaHRNb2xkUHQpO1xyXG4gICAgICAgICAgICBtb2xkVGVtcExpbmVzLnB1c2goWzIgKiBpLCAxICsgMiAqIGldLCBbMiAqIGksIDIgKyAyICogaV0sIFsxICsgMiAqIGksIDMgKyAyICogaV0pO1xyXG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKGN1ckxlZnRQdCwgY3VyUmlnaHRQdCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG5leHRSb3RhdGVNYXRyaXggPSBHZW9tTGliLmNyZWF0ZVJvdGF0ZU1hdHJpeDQoaG9yaXpvbnRhbFN0ZXBBbmdsZSAqIChpICsgMSksIGNpcmNsZU5vcm1hbCwgZHVtbXlQb2ludDNkKTtcclxuICAgICAgICAgICAgY29uc3QgbmV4dFJhZGl1c0RpciA9IHN0YXJ0UmFkaXVzRGlyLmFwcGxpZWRNYXRyaXg0KG5leHRSb3RhdGVNYXRyaXgpO1xyXG4gICAgICAgICAgICBjb25zdCBuZXh0SGFsZldpZHRoID0gKHN0YXJ0V2lkdGggKyAoZW5kV2lkdGggLSBzdGFydFdpZHRoKSAqICgoaSArIDEpICogaG9yaXpvbnRhbFN0ZXBBbmdsZSkgLyBhcmNBbmdsZSkgLyAyICogKGlzTGVmdEFyYyA/IC0xIDogMSk7XHJcbiAgICAgICAgICAgIGNvbnN0IG5leHRMZWZ0TW9sZFB0ID0gY2lyY2xlQ2VudGVyLmFkZGVkKG5leHRSYWRpdXNEaXIubXVsdGlwbGllZChyYWRpdXMgKyBuZXh0SGFsZldpZHRoKSk7XHJcbiAgICAgICAgICAgIGNvbnN0IG5leHRSaWdodE1vbGRQdCA9IGNpcmNsZUNlbnRlci5hZGRlZChuZXh0UmFkaXVzRGlyLm11bHRpcGxpZWQocmFkaXVzIC0gbmV4dEhhbGZXaWR0aCkpO1xyXG4gICAgICAgICAgICBjb25zdCBuZXh0TGVmdFB0ID0gbmV4dExlZnRNb2xkUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkuYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKGkgKiBzdGVwSGVpZ2h0KSk7XHJcbiAgICAgICAgICAgIGNvbnN0IG5leHRSaWdodFB0ID0gbmV4dFJpZ2h0TW9sZFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCkpLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZChpICogc3RlcEhlaWdodCkpO1xyXG4gICAgICAgICAgICBpZiAodXB3YXJkKSB7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKGN1ckxlZnRQdC5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLCBjdXJSaWdodFB0LmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaChuZXh0TGVmdFB0LCBuZXh0UmlnaHRQdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRlbXApIHtcclxuICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFs0ICogaSwgMSArIDQgKiBpXSwgWzQgKiBpLCAyICsgNCAqIGldLCBbMSArIDQgKiBpLCAzICsgNCAqIGldLCBbMiArIDQgKiBpLCAzICsgNCAqIGldLCBbMiArIDQgKiBpLCA0ICsgNCAqIGldLCBbMyArIDQgKiBpLCA1ICsgNCAqIGldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaSA9PT0gc3RlcENvdW50IC0gMikge1xyXG4gICAgICAgICAgICAgICAgbW9sZFZlcnRpY2VzLnB1c2gobmV4dExlZnRNb2xkUHQsIG5leHRSaWdodE1vbGRQdCk7XHJcbiAgICAgICAgICAgICAgICBtb2xkVGVtcExpbmVzLnB1c2goWzIgKiAoc3RlcENvdW50IC0gMSksIDEgKyAyICogKHN0ZXBDb3VudCAtIDEpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGkgPT09IHN0ZXBDb3VudCAtIDIpIHtcclxuICAgICAgICAgICAgICAgIC8vIGlmICh1cHdhcmQpIHtcclxuICAgICAgICAgICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKG5leHRMZWZ0UHQuYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSwgbmV4dFJpZ2h0UHQuYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGVtcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFs0ICogKHN0ZXBDb3VudCAtIDEpLCAxICsgNCAqIChzdGVwQ291bnQgLSAxKV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGxhc3RSb3RhdGVNYXRyaXggPSBHZW9tTGliLmNyZWF0ZVJvdGF0ZU1hdHJpeDQoYXJjQW5nbGUsIGNpcmNsZU5vcm1hbCwgZHVtbXlQb2ludDNkKTtcclxuICAgICAgICBjb25zdCBsYXN0UmFkaXVzRGlyID0gc3RhcnRSYWRpdXNEaXIuYXBwbGllZE1hdHJpeDQobGFzdFJvdGF0ZU1hdHJpeCk7XHJcbiAgICAgICAgY29uc3QgbGFzdEhhbGZXaWR0aCA9IGlzTGVmdEFyYyA/IC1lbmRXaWR0aCAvIDIgOiBlbmRXaWR0aCAvIDI7XHJcbiAgICAgICAgY29uc3QgbGFzdExlZnRNb2xkUHQgPSBjaXJjbGVDZW50ZXIuYWRkZWQobGFzdFJhZGl1c0Rpci5tdWx0aXBsaWVkKHJhZGl1cyArIGxhc3RIYWxmV2lkdGgpKTtcclxuICAgICAgICBjb25zdCBsYXN0UmlnaHRNb2xkUHQgPSBjaXJjbGVDZW50ZXIuYWRkZWQobGFzdFJhZGl1c0Rpci5tdWx0aXBsaWVkKHJhZGl1cyAtIGxhc3RIYWxmV2lkdGgpKTtcclxuICAgICAgICBjb25zdCBsYXN0TGVmdFB0ID0gbGFzdExlZnRNb2xkUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkuYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKHN0ZXBDb3VudCAqIHN0ZXBIZWlnaHQpKTtcclxuICAgICAgICBjb25zdCBsYXN0UmlnaHRQdCA9IGxhc3RSaWdodE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoc3RlcENvdW50ICogc3RlcEhlaWdodCkpO1xyXG4gICAgICAgIGlmIChzdGVwQ291bnQgPT09IDEpIHtcclxuICAgICAgICAgICAgbW9sZFZlcnRpY2VzLnB1c2gobGVmdFB0LCByaWdodFB0KTtcclxuICAgICAgICAgICAgbW9sZFRlbXBMaW5lcy5wdXNoKFsyICogKHN0ZXBDb3VudCAtIDEpLCAxICsgMiAqIChzdGVwQ291bnQgLSAxKV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobGFzdEhvcml6b250YWxBbmdsZSA+PSBBbmdsZVRvbGVyYW5jZSB8fCBsYXN0SG9yaXpvbnRhbEFuZ2xlID09PSAwKSB7XHJcbiAgICAgICAgICAgIG1vbGRWZXJ0aWNlcy5wdXNoKGxhc3RMZWZ0TW9sZFB0LCBsYXN0UmlnaHRNb2xkUHQpO1xyXG4gICAgICAgICAgICBtb2xkVGVtcExpbmVzLnB1c2goWzIgKiAoc3RlcENvdW50IC0gMSksIDIgKyAyICogKHN0ZXBDb3VudCAtIDEpXSwgWzEgKyAyICogKHN0ZXBDb3VudCAtIDEpLCAzICsgMiAqIChzdGVwQ291bnQgLSAxKV0sIFsyICogc3RlcENvdW50LCAxICsgMiAqIHN0ZXBDb3VudF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodXB3YXJkKSB7XHJcbiAgICAgICAgICAgIGlmIChzdGVwQ291bnQgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2gobGVmdFB0LCByaWdodFB0KTtcclxuICAgICAgICAgICAgICAgIGlmICh0ZW1wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzQgKiAoc3RlcENvdW50IC0gMSksIDEgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGxhc3RIb3Jpem9udGFsQW5nbGUgPj0gQW5nbGVUb2xlcmFuY2UgfHwgbGFzdEhvcml6b250YWxBbmdsZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQodmVydGljYWxTdGVwKSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZCh2ZXJ0aWNhbFN0ZXApKSk7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKGxhc3RMZWZ0UHQsIGxhc3RSaWdodFB0KTtcclxuICAgICAgICAgICAgICAgIGlmICh0ZW1wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzQgKiAoc3RlcENvdW50IC0gMSksIDIgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzEgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCAzICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsyICsgNCAqIChzdGVwQ291bnQgLSAxKSwgMyArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMiArIDQgKiAoc3RlcENvdW50IC0gMSksIDQgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzMgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCA1ICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFs0ICogc3RlcENvdW50LCAxICsgNCAqIHN0ZXBDb3VudF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoc3RlcENvdW50ID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKGxlZnRQdCwgcmlnaHRQdCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGVtcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFs0ICogKHN0ZXBDb3VudCAtIDEpLCAxICsgNCAqIChzdGVwQ291bnQgLSAxKV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChsYXN0SG9yaXpvbnRhbEFuZ2xlID49IEFuZ2xlVG9sZXJhbmNlIHx8IGxhc3RIb3Jpem9udGFsQW5nbGUgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2gobGFzdExlZnRQdC5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQpKSwgbGFzdFJpZ2h0UHQuYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0KSkpO1xyXG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaChsYXN0TGVmdFB0LCBsYXN0UmlnaHRQdCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGVtcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFs0ICogKHN0ZXBDb3VudCAtIDEpLCAyICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsxICsgNCAqIChzdGVwQ291bnQgLSAxKSwgMyArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMiArIDQgKiAoc3RlcENvdW50IC0gMSksIDMgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCA0ICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFszICsgNCAqIChzdGVwQ291bnQgLSAxKSwgNSArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbNCAqIHN0ZXBDb3VudCwgMSArIDQgKiBzdGVwQ291bnRdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc3RlcENvdW50ID4gMSkge1xyXG4gICAgICAgICAgICBpZiAodGVtcCkge1xyXG4gICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIDIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBhY3R1YWxMYXN0U3RlcExlbmd0aCA9IGxhc3RIb3Jpem9udGFsQW5nbGUgPCBBbmdsZVRvbGVyYW5jZSA/IGhvcml6b250YWxTdGVwQW5nbGUgOiBsYXN0SG9yaXpvbnRhbEFuZ2xlO1xyXG4gICAgICAgICAgICBpZiAodXB3YXJkKSB7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZCgtc3RlcEhlaWdodCAtICgxIC0gYWN0dWFsTGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcEFuZ2xlKSAqIHN0ZXBIZWlnaHQpKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0IC0gKDEgLSBhY3R1YWxMYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwQW5nbGUpICogc3RlcEhlaWdodCkpKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSBzdGVwQ291bnQgLSAobGFzdEhvcml6b250YWxBbmdsZSA+PSBBbmdsZVRvbGVyYW5jZSA/IDEgOiAyKTsgaiA+IDA7IGotLSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZJbmQgPSBqICogNDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGVtcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbdmVydGljZXMubGVuZ3RoIC0gMiwgMiArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMSArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbMiArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDBdLCBbMyArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZJbmRdLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZCgtc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1t2SW5kICsgMV0uYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0KSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSA2XS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSA1XS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSBzdGVwQ291bnQgLSAobGFzdEhvcml6b250YWxBbmdsZSA+PSBBbmdsZVRvbGVyYW5jZSA/IDEgOiAyKTsgaiA+PSAwOyBqLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2SW5kID0gaiAqIDQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIDIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaiA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAwXSwgWzMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2SW5kXS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1t2SW5kICsgMV0uYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0ZW1wKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbdmVydGljZXMubGVuZ3RoIC0gMiwgMiArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMSArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMF0sIFszICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh1cHdhcmQpIHtcclxuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0KSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZCgtc3RlcEhlaWdodCkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbMF0uYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSwgdmVydGljZXNbMV0uYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJhc2VMaW5lU2VnM2QpIHtcclxuICAgICAgICAgICAgY29uc3QgYmFzZUxpbmVEaXIgPSBiYXNlTGluZVNlZzNkLmVuZC5zdWJ0cmFjdGVkKGJhc2VMaW5lU2VnM2Quc3RhcnQpLm5vcm1hbGl6ZWQoKTtcclxuICAgICAgICAgICAgY29uc3QgYW5nbGUgPSBjaXJjbGVUYW5nZW50LmFuZ2xlKGJhc2VMaW5lRGlyKTtcclxuICAgICAgICAgICAgaWYgKGFuZ2xlIDwgTWF0aC5QSSAvIDIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvcm5lckNvbm5lY3Rpb25Qb2ludDEgPSBzdGFydC5hZGRlZChiYXNlTGluZURpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMiAqIE1hdGguc2lnbihhbmdsZSkpKTtcclxuICAgICAgICAgICAgICAgIGNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtzdGFydCwgc3RhcnQuYWRkZWQodGFuZ2VudExlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSwgY29ybmVyQ29ubmVjdGlvblBvaW50MV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb3JuZXJDb25uZWN0aW9uUG9pbnQyID0gc3RhcnQuYWRkZWQoYmFzZUxpbmVEaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMiAqIE1hdGguc2lnbihhbmdsZSkpKTtcclxuICAgICAgICAgICAgICAgIGNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtzdGFydCwgY29ybmVyQ29ubmVjdGlvblBvaW50Miwgc3RhcnQuYWRkZWQodGFuZ2VudExlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb3JuZXJNb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgMF1dO1xyXG4gICAgICAgICAgICBjb3JuZXJTaGFwZS52ZXJ0aWNlcyA9IFtcclxuICAgICAgICAgICAgICAgIC4uLmNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAodiA9PiB2LmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZChzdGFydEhlaWdodCkpKSxcclxuICAgICAgICAgICAgICAgIC4uLmNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAodiA9PiB2LmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZChzdGFydEhlaWdodCAtIHBsYXRmb3JtVGhpY2tuZXNzKSkpLFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICBpZiAodGVtcCkge1xyXG4gICAgICAgICAgICAgICAgY29ybmVyU2hhcGUudGVtcExpbmVzID0gW1xyXG4gICAgICAgICAgICAgICAgICAgIFswLCAxXSwgWzEsIDJdLCBbMiwgMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgWzMsIDRdLCBbNCwgNV0sIFs1LCAzXSxcclxuICAgICAgICAgICAgICAgICAgICBbMCwgM10sIFsxLCA0XSwgWzIsIDVdLFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBnZW5lcmF0ZVN0cmFpZ2h0U3RhaXJTaGFwZShzZWdtZW50LCB0ZW1wID0gdHJ1ZSkge1xyXG4gICAgY29uc3QgeyBzdGFydCwgZW5kLCBzdGFpclNoYXBlLCBtb2xkU2hhcGUsIGNvcm5lclNoYXBlLCBjb3JuZXJNb2xkU2hhcGUsIHN0YXJ0SGVpZ2h0LCBiYXNlTGluZVNlZzNkLCBwYXJhbSB9ID0gc2VnbWVudDtcclxuICAgIGNvbnN0IHsgc3RhcnRXaWR0aCwgZW5kV2lkdGgsIGhvcml6b250YWxTdGVwLCB2ZXJ0aWNhbFN0ZXAsIHVwd2FyZCwgcGxhdGZvcm1UaGlja25lc3MgfSA9IHBhcmFtO1xyXG4gICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFtdO1xyXG4gICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXTtcclxuICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtdO1xyXG4gICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtdO1xyXG4gICAgY29ybmVyU2hhcGUudmVydGljZXMgPSBbXTtcclxuICAgIGNvcm5lclNoYXBlLnRlbXBMaW5lcyA9IFtdO1xyXG4gICAgY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzID0gW107XHJcbiAgICBjb3JuZXJNb2xkU2hhcGUudGVtcExpbmVzID0gW107XHJcbiAgICBjb25zdCB7IHZlcnRpY2VzLCB0ZW1wTGluZXMgfSA9IHN0YWlyU2hhcGU7XHJcbiAgICBjb25zdCB7IHZlcnRpY2VzOiBtb2xkVmVydGljZXMsIHRlbXBMaW5lczogbW9sZFRlbXBMaW5lcyB9ID0gbW9sZFNoYXBlO1xyXG4gICAgY29uc3QgdmVydGljYWxGcm9udERpciA9IERpcmVjdGlvblo7XHJcbiAgICBsZXQgaG9yaXpvbnRhbEZyb250RGlyID0gZW5kLnN1YnRyYWN0ZWQoc3RhcnQpLm5vcm1hbGl6ZWQoKTtcclxuICAgIGxldCBob3Jpem9udGFsRGlzdGFuY2UgPSBzdGFydC5kaXN0YW5jZVRvKGVuZCk7XHJcbiAgICBsZXQgaG9yaXpvbnRhbExlZnREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKGhvcml6b250YWxGcm9udERpcik7XHJcbiAgICBjb25zdCBzdGVwRmxvYXRDb3VudCA9IGhvcml6b250YWxEaXN0YW5jZSAvIGhvcml6b250YWxTdGVwO1xyXG4gICAgY29uc3Qgc3RlcENvdW50ID0gTWF0aC5jZWlsKHN0ZXBGbG9hdENvdW50KTtcclxuICAgIGNvbnN0IGxhc3RTdGVwTGVuZ3RoID0gaG9yaXpvbnRhbERpc3RhbmNlIC0gKHN0ZXBDb3VudCAtIDEpICogaG9yaXpvbnRhbFN0ZXA7XHJcbiAgICBjb25zdCB2YWxpZFN0ZXBDb3VudCA9IChsYXN0U3RlcExlbmd0aCA9PT0gMCB8fCBsYXN0U3RlcExlbmd0aCA+IExlbmd0aFRvbGVyYW5jZSkgPyBzdGVwQ291bnQgOiBzdGVwQ291bnQgLSAxO1xyXG4gICAgaWYgKHZhbGlkU3RlcENvdW50IDwgMSB8fCB2YWxpZFN0ZXBDb3VudCA+PSBTdGVwQ291bnRMaW1pdCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChiYXNlTGluZVNlZzNkKSB7XHJcbiAgICAgICAgY29uc3QgYmFzZUxpbmVEaXIgPSBiYXNlTGluZVNlZzNkLmVuZC5zdWJ0cmFjdGVkKGJhc2VMaW5lU2VnM2Quc3RhcnQpLm5vcm1hbGl6ZWQoKTtcclxuICAgICAgICBjb25zdCBhbmdsZSA9IGhvcml6b250YWxGcm9udERpci5hbmdsZShiYXNlTGluZURpcik7XHJcbiAgICAgICAgY29uc3QgZGVsdGFBbmdsZSA9IE1hdGguYWJzKGFuZ2xlIC0gTWF0aC5QSSAvIDIpO1xyXG4gICAgICAgIGlmIChkZWx0YUFuZ2xlIDw9IERpcmVjdGlvbkFuZ2xlVG9sZXJhbmNlKSB7XHJcbiAgICAgICAgICAgIGhvcml6b250YWxGcm9udERpciA9IGJhc2VMaW5lRGlyLmNyb3NzKGhvcml6b250YWxGcm9udERpci5jcm9zcyhiYXNlTGluZURpcikpLm5vcm1hbGl6ZWQoKTtcclxuICAgICAgICAgICAgaG9yaXpvbnRhbERpc3RhbmNlID0gaG9yaXpvbnRhbERpc3RhbmNlICogTWF0aC5jb3MoZGVsdGFBbmdsZSk7XHJcbiAgICAgICAgICAgIGhvcml6b250YWxMZWZ0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhob3Jpem9udGFsRnJvbnREaXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGFuZ2xlIDwgTWF0aC5QSSAvIDIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvcm5lckNvbm5lY3Rpb25Qb2ludDEgPSBzdGFydC5hZGRlZChiYXNlTGluZURpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMiAqIE1hdGguc2lnbihhbmdsZSkpKTtcclxuICAgICAgICAgICAgICAgIGNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtzdGFydCwgc3RhcnQuYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSwgY29ybmVyQ29ubmVjdGlvblBvaW50MV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb3JuZXJDb25uZWN0aW9uUG9pbnQyID0gc3RhcnQuYWRkZWQoYmFzZUxpbmVEaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMiAqIE1hdGguc2lnbihhbmdsZSkpKTtcclxuICAgICAgICAgICAgICAgIGNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtzdGFydCwgY29ybmVyQ29ubmVjdGlvblBvaW50Miwgc3RhcnQuYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb3JuZXJNb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgMF1dO1xyXG4gICAgICAgICAgICBjb3JuZXJTaGFwZS52ZXJ0aWNlcyA9IFtcclxuICAgICAgICAgICAgICAgIC4uLmNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAodiA9PiB2LmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZChzdGFydEhlaWdodCkpKSxcclxuICAgICAgICAgICAgICAgIC4uLmNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAodiA9PiB2LmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZChzdGFydEhlaWdodCAtIHBsYXRmb3JtVGhpY2tuZXNzKSkpLFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICBpZiAodGVtcCkge1xyXG4gICAgICAgICAgICAgICAgY29ybmVyU2hhcGUudGVtcExpbmVzID0gW1xyXG4gICAgICAgICAgICAgICAgICAgIFswLCAxXSwgWzEsIDJdLCBbMiwgMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgWzMsIDRdLCBbNCwgNV0sIFs1LCAzXSxcclxuICAgICAgICAgICAgICAgICAgICBbMCwgM10sIFsxLCA0XSwgWzIsIDVdLFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IHN0ZXBIZWlnaHQgPSB1cHdhcmQgPyB2ZXJ0aWNhbFN0ZXAgOiAtdmVydGljYWxTdGVwO1xyXG4gICAgc2VnbWVudC5lbmRIZWlnaHQgPSBzZWdtZW50LnN0YXJ0SGVpZ2h0ICsgdmFsaWRTdGVwQ291bnQgKiBzdGVwSGVpZ2h0O1xyXG4gICAgc3RhaXJTaGFwZS5zdGVwQ291bnQgPSB2YWxpZFN0ZXBDb3VudDtcclxuICAgIG1vbGRTaGFwZS5zdGVwQ291bnQgPSB2YWxpZFN0ZXBDb3VudDtcclxuICAgIGNvbnN0IGxlZnRQdCA9IHN0YXJ0LmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKTtcclxuICAgIGNvbnN0IHJpZ2h0UHQgPSBzdGFydC5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpO1xyXG4gICAgY29uc3Qgd2lkdGhEZWx0YSA9IChlbmRXaWR0aCAtIHN0YXJ0V2lkdGgpIC8gMiAvIChzdGVwRmxvYXRDb3VudCk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ZXBDb3VudCAtIDE7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGN1ckxlZnRNb2xkUHQgPSBsZWZ0UHQuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaSAqIGhvcml6b250YWxTdGVwKSkuYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZChpICogd2lkdGhEZWx0YSkpO1xyXG4gICAgICAgIGNvbnN0IGN1clJpZ2h0TW9sZFB0ID0gcmlnaHRQdC5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChpICogaG9yaXpvbnRhbFN0ZXApKS5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKC1pICogd2lkdGhEZWx0YSkpO1xyXG4gICAgICAgIGNvbnN0IGN1ckxlZnRQdCA9IGN1ckxlZnRNb2xkUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkuYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKGkgKiBzdGVwSGVpZ2h0KSk7XHJcbiAgICAgICAgY29uc3QgY3VyUmlnaHRQdCA9IGN1clJpZ2h0TW9sZFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCkpLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZChpICogc3RlcEhlaWdodCkpO1xyXG4gICAgICAgIG1vbGRWZXJ0aWNlcy5wdXNoKGN1ckxlZnRNb2xkUHQsIGN1clJpZ2h0TW9sZFB0KTtcclxuICAgICAgICBtb2xkVGVtcExpbmVzLnB1c2goWzIgKiBpLCAxICsgMiAqIGldLCBbMiAqIGksIDIgKyAyICogaV0sIFsxICsgMiAqIGksIDMgKyAyICogaV0pO1xyXG4gICAgICAgIHZlcnRpY2VzLnB1c2goY3VyTGVmdFB0LCBjdXJSaWdodFB0KTtcclxuICAgICAgICBpZiAodXB3YXJkKSB7XHJcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2goY3VyTGVmdFB0LmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksIGN1clJpZ2h0UHQuYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKGN1ckxlZnRQdC5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpLCBjdXJSaWdodFB0LmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGVtcCkge1xyXG4gICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbNCAqIGksIDEgKyA0ICogaV0sIFs0ICogaSwgMiArIDQgKiBpXSwgWzEgKyA0ICogaSwgMyArIDQgKiBpXSwgWzIgKyA0ICogaSwgMyArIDQgKiBpXSwgWzIgKyA0ICogaSwgNCArIDQgKiBpXSwgWzMgKyA0ICogaSwgNSArIDQgKiBpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbW9sZFZlcnRpY2VzLnB1c2goc3RlcENvdW50ID4gMSA/IG1vbGRWZXJ0aWNlc1ttb2xkVmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaG9yaXpvbnRhbFN0ZXApKSA6IGxlZnRQdCwgc3RlcENvdW50ID4gMSA/IG1vbGRWZXJ0aWNlc1ttb2xkVmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaG9yaXpvbnRhbFN0ZXApKSA6IHJpZ2h0UHQpO1xyXG4gICAgbW9sZFRlbXBMaW5lcy5wdXNoKFsyICogKHN0ZXBDb3VudCAtIDEpLCAxICsgMiAqIChzdGVwQ291bnQgLSAxKV0pO1xyXG4gICAgaWYgKGxhc3RTdGVwTGVuZ3RoID4gTGVuZ3RoVG9sZXJhbmNlIHx8IGxhc3RTdGVwTGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgbW9sZFZlcnRpY2VzLnB1c2gobW9sZFZlcnRpY2VzW21vbGRWZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXAgKiB3aWR0aERlbHRhKSkuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGgpKSwgbW9sZFZlcnRpY2VzW21vbGRWZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKC1sYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwICogd2lkdGhEZWx0YSkpLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoKSkpO1xyXG4gICAgICAgIG1vbGRUZW1wTGluZXMucHVzaChbMiAqIChzdGVwQ291bnQgLSAxKSwgMiArIDIgKiAoc3RlcENvdW50IC0gMSldLCBbMSArIDIgKiAoc3RlcENvdW50IC0gMSksIDMgKyAyICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKiBzdGVwQ291bnQsIDEgKyAyICogc3RlcENvdW50XSk7XHJcbiAgICB9XHJcbiAgICBpZiAodXB3YXJkKSB7XHJcbiAgICAgICAgdmVydGljZXMucHVzaChzdGVwQ291bnQgPiAxID8gdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaG9yaXpvbnRhbFN0ZXApKSA6IGxlZnRQdCwgc3RlcENvdW50ID4gMSA/IHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSkgOiByaWdodFB0KTtcclxuICAgICAgICBpZiAodGVtcCkge1xyXG4gICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbNCAqIChzdGVwQ291bnQgLSAxKSwgMSArIDQgKiAoc3RlcENvdW50IC0gMSldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxhc3RTdGVwTGVuZ3RoID4gTGVuZ3RoVG9sZXJhbmNlIHx8IGxhc3RTdGVwTGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSk7XHJcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwICogd2lkdGhEZWx0YSkpLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoKSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoLWxhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXAgKiB3aWR0aERlbHRhKSkuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGgpKSk7XHJcbiAgICAgICAgICAgIGlmICh0ZW1wKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChcclxuICAgICAgICAgICAgICAgIC8vIFs0ICogc3RlcENvdW50LCAxICsgNCAqIHN0ZXBDb3VudF0sXHJcbiAgICAgICAgICAgICAgICBbNCAqIChzdGVwQ291bnQgLSAxKSwgMiArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMSArIDQgKiAoc3RlcENvdW50IC0gMSksIDMgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCAzICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsyICsgNCAqIChzdGVwQ291bnQgLSAxKSwgNCArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMyArIDQgKiAoc3RlcENvdW50IC0gMSksIDUgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzQgKiBzdGVwQ291bnQsIDEgKyA0ICogc3RlcENvdW50XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB2ZXJ0aWNlcy5wdXNoKHN0ZXBDb3VudCA+IDEgPyB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpIDogbGVmdFB0LCBzdGVwQ291bnQgPiAxID8gdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSA6IHJpZ2h0UHQpO1xyXG4gICAgICAgIGlmICh0ZW1wKSB7XHJcbiAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFs0ICogKHN0ZXBDb3VudCAtIDEpLCAxICsgNCAqIChzdGVwQ291bnQgLSAxKV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobGFzdFN0ZXBMZW5ndGggPiBMZW5ndGhUb2xlcmFuY2UgfHwgbGFzdFN0ZXBMZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXAgKiB3aWR0aERlbHRhKSkuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGgpKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZCgtbGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcCAqIHdpZHRoRGVsdGEpKS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCkpKTtcclxuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpKTtcclxuICAgICAgICAgICAgaWYgKHRlbXApIHtcclxuICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgLy8gWzQgKiAoc3RlcENvdW50IC0gMSksIDEgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSxcclxuICAgICAgICAgICAgICAgIFs0ICogKHN0ZXBDb3VudCAtIDEpLCAyICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsxICsgNCAqIChzdGVwQ291bnQgLSAxKSwgMyArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMiArIDQgKiAoc3RlcENvdW50IC0gMSksIDMgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCA0ICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFszICsgNCAqIChzdGVwQ291bnQgLSAxKSwgNSArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbNCAqIHN0ZXBDb3VudCwgMSArIDQgKiBzdGVwQ291bnRdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChzdGVwQ291bnQgPiAxKSB7XHJcbiAgICAgICAgaWYgKHRlbXApIHtcclxuICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIDIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMiArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDQgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCA1ICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFt2ZXJ0aWNlcy5sZW5ndGggKyAyLCAxICsgdmVydGljZXMubGVuZ3RoICsgMl0sIFt2ZXJ0aWNlcy5sZW5ndGggKyAyLCAwXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggKyAyLCAxXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGFjdHVhbExhc3RTdGVwTGVuZ3RoID0gbGFzdFN0ZXBMZW5ndGggPCBMZW5ndGhUb2xlcmFuY2UgPyBob3Jpem9udGFsU3RlcCA6IGxhc3RTdGVwTGVuZ3RoO1xyXG4gICAgICAgIGlmICh1cHdhcmQpIHtcclxuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQgLSAoMSAtIGFjdHVhbExhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXApICogc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQgLSAoMSAtIGFjdHVhbExhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXApICogc3RlcEhlaWdodCkpKTtcclxuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1swXS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpLCB2ZXJ0aWNlc1sxXS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoLWFjdHVhbExhc3RTdGVwTGVuZ3RoKSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKC1hY3R1YWxMYXN0U3RlcExlbmd0aCkpKTtcclxuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1swXS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1sxXS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBpZiAodGVtcCkge1xyXG4gICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbdmVydGljZXMubGVuZ3RoIC0gMiwgMiArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMSArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMF0sIFszICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodXB3YXJkKSB7XHJcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0KSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZCgtc3RlcEhlaWdodCkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbMF0uYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSwgdmVydGljZXNbMV0uYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGdlbmVyYXRlUGxhdGZvcm1TaGFwZShzZWdtZW50LCB0ZW1wID0gdHJ1ZSkge1xyXG4gICAgY29uc3QgeyBzdGFydCwgc3RhcnRIZWlnaHQsIGJhc2VMaW5lU2VnM2QsIHN0YWlyU2hhcGUsIG1vbGRTaGFwZSwgY29ybmVyU2hhcGUsIGNvcm5lck1vbGRTaGFwZSwgcGFyYW0gfSA9IHNlZ21lbnQ7XHJcbiAgICBjb25zdCB7IHN0YXJ0V2lkdGgsIG9mZnNldFdpZHRoLCB3aXRoT2Zmc2V0LCBwbGF0Zm9ybVRoaWNrbmVzcywgcGxhdGZvcm1MZW5ndGgsIHBsYXRmb3JtTGVuZ3RoTG9ja2VkLCBtb2RlbEVkaXRpbmcgfSA9IHBhcmFtO1xyXG4gICAgY29uc3QgY3VyRGlyID0gc2VnbWVudC5lbmQuc3VidHJhY3RlZChzdGFydCk7XHJcbiAgICBjb25zdCBjdXJEaXJOb3JtYWxpemVkID0gc2VnbWVudC5lbmQuc3VidHJhY3RlZChzdGFydCkubm9ybWFsaXplZCgpO1xyXG4gICAgY29uc3QgY3VyTGVmdERpciA9IERpcmVjdGlvblouY3Jvc3MoY3VyRGlyKS5ub3JtYWxpemVkKCk7XHJcbiAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gW107XHJcbiAgICBzdGFpclNoYXBlLnRlbXBMaW5lcyA9IFtdO1xyXG4gICAgbW9sZFNoYXBlLnZlcnRpY2VzID0gW107XHJcbiAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW107XHJcbiAgICBjb3JuZXJTaGFwZS52ZXJ0aWNlcyA9IFtdO1xyXG4gICAgY29ybmVyU2hhcGUudGVtcExpbmVzID0gW107XHJcbiAgICBjb3JuZXJNb2xkU2hhcGUudmVydGljZXMgPSBbXTtcclxuICAgIGNvcm5lck1vbGRTaGFwZS50ZW1wTGluZXMgPSBbXTtcclxuICAgIHNlZ21lbnQuZW5kID0gcGxhdGZvcm1MZW5ndGhMb2NrZWQgPyBzZWdtZW50LnN0YXJ0LmFkZGVkKGN1ckRpck5vcm1hbGl6ZWQubXVsdGlwbGllZChwbGF0Zm9ybUxlbmd0aCkpIDogc2VnbWVudC5lbmQ7XHJcbiAgICBzZWdtZW50LmVuZEhlaWdodCA9IHN0YXJ0SGVpZ2h0O1xyXG4gICAgaWYgKCFtb2RlbEVkaXRpbmcpIHtcclxuICAgICAgICBwYXJhbS53aXRoT2Zmc2V0ID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoYmFzZUxpbmVTZWczZCkge1xyXG4gICAgICAgIGNvbnN0IHsgc3RhcnQ6IGJhc2VMaW5lU3RhcnQsIGVuZDogYmFzZUxpbmVFbmQgfSA9IGJhc2VMaW5lU2VnM2Q7XHJcbiAgICAgICAgY29uc3QgYmFzZUxpbmVEaXIgPSBiYXNlTGluZUVuZC5zdWJ0cmFjdGVkKGJhc2VMaW5lU3RhcnQpLm5vcm1hbGl6ZWQoKTtcclxuICAgICAgICBjb25zdCBwcmV2RGlyTm9ybWFsaXplZCA9IGJhc2VMaW5lRGlyLmNyb3NzKERpcmVjdGlvblopLm5vcm1hbGl6ZWQoKTtcclxuICAgICAgICBjb25zdCBwcmV2TGVmdERpciA9IERpcmVjdGlvblouY3Jvc3MocHJldkRpck5vcm1hbGl6ZWQpLm5vcm1hbGl6ZWQoKTtcclxuICAgICAgICBjb25zdCBhbmdsZSA9IGN1ckRpci5hbmdsZVRvKHByZXZEaXJOb3JtYWxpemVkLCBEaXJlY3Rpb25aKTtcclxuICAgICAgICBjb25zdCBmcm9udExlbmd0aCA9IHBsYXRmb3JtTGVuZ3RoTG9ja2VkID8gcGxhdGZvcm1MZW5ndGggOiBNYXRoLmFicyhjdXJEaXIuZG90KHByZXZEaXJOb3JtYWxpemVkKSk7XHJcbiAgICAgICAgY29uc3QgY3VyRW5kTGVmdENvcm5lciA9IHNlZ21lbnQuZW5kLmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpO1xyXG4gICAgICAgIGNvbnN0IGRpcjEgPSBjdXJFbmRMZWZ0Q29ybmVyLnN1YnRyYWN0ZWQoc2VnbWVudC5zdGFydCk7XHJcbiAgICAgICAgY29uc3QgYW5nbGUxID0gZGlyMS5hbmdsZShjdXJEaXIpO1xyXG4gICAgICAgIGlmICgoYW5nbGUgPj0gTWF0aC5QSSAmJiBhbmdsZSA8PSAoTWF0aC5QSSAqIDMgLyAyICsgYW5nbGUxKSkgfHwgKG1vZGVsRWRpdGluZyAmJiB3aXRoT2Zmc2V0ICYmIG9mZnNldFdpZHRoID49IDApKSB7XHJcbiAgICAgICAgICAgIHBhcmFtLnBsYXRmb3JtTGVuZ3RoID0gZnJvbnRMZW5ndGg7XHJcbiAgICAgICAgICAgIGNvbnN0IGZyb250RW5kID0gc2VnbWVudC5zdGFydC5hZGRlZChwcmV2RGlyTm9ybWFsaXplZC5tdWx0aXBsaWVkKGZyb250TGVuZ3RoKSk7XHJcbiAgICAgICAgICAgIHNlZ21lbnQuZW5kID0gZnJvbnRFbmQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGxlZnRMZW5ndGggPSB3aXRoT2Zmc2V0ICYmIG1vZGVsRWRpdGluZyA/IChvZmZzZXRXaWR0aCArIHN0YXJ0V2lkdGggLyAyKSA6IGN1ckRpci5kb3QocHJldkxlZnREaXIpO1xyXG4gICAgICAgICAgICBpZiAobGVmdExlbmd0aCA+IHN0YXJ0V2lkdGggLyAyKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJhbS53aXRoT2Zmc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHBhcmFtLm9mZnNldFdpZHRoID0gbGVmdExlbmd0aCAtIHN0YXJ0V2lkdGggLyAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbGlkTGVmdExlbmd0aCA9IE1hdGgubWF4KHN0YXJ0V2lkdGggLyAyLCBsZWZ0TGVuZ3RoKTtcclxuICAgICAgICAgICAgbW9sZFNoYXBlLnZlcnRpY2VzID0gW1xyXG4gICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCh2YWxpZExlZnRMZW5ndGgpKSxcclxuICAgICAgICAgICAgICAgIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSksXHJcbiAgICAgICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpLFxyXG4gICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCh2YWxpZExlZnRMZW5ndGgpKSxcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtbMCwgMV0sIFsxLCAyXSwgWzIsIDNdLCBbMywgMF1dO1xyXG4gICAgICAgICAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gWy4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCkpKSxcclxuICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCAtIHBsYXRmb3JtVGhpY2tuZXNzKSkpLFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICBpZiAodGVtcCkge1xyXG4gICAgICAgICAgICAgICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcyxcclxuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLm1hcChzZWcgPT4gW3NlZ1swXSArIDQsIHNlZ1sxXSArIDRdKSxcclxuICAgICAgICAgICAgICAgICAgICBbMCwgNF0sIFsxLCA1XSwgWzIsIDZdLCBbMywgN10sXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKChhbmdsZSA8IE1hdGguUEkgJiYgYW5nbGUgPj0gKE1hdGguUEkgLyAyIC0gYW5nbGUxKSkgfHwgKG1vZGVsRWRpdGluZyAmJiB3aXRoT2Zmc2V0ICYmIG9mZnNldFdpZHRoIDwgMCkpIHtcclxuICAgICAgICAgICAgcGFyYW0ucGxhdGZvcm1MZW5ndGggPSBmcm9udExlbmd0aDtcclxuICAgICAgICAgICAgY29uc3QgcmlnaHRMZW5ndGggPSB3aXRoT2Zmc2V0ICYmIG1vZGVsRWRpdGluZyA/ICgtb2Zmc2V0V2lkdGggKyBzdGFydFdpZHRoIC8gMikgOiAtY3VyRGlyLmRvdChwcmV2TGVmdERpcik7XHJcbiAgICAgICAgICAgIGNvbnN0IGZyb250RW5kMSA9IHNlZ21lbnQuc3RhcnQuYWRkZWQocHJldkRpck5vcm1hbGl6ZWQubXVsdGlwbGllZChmcm9udExlbmd0aCkpO1xyXG4gICAgICAgICAgICBzZWdtZW50LmVuZCA9IGZyb250RW5kMTtcclxuICAgICAgICAgICAgaWYgKHJpZ2h0TGVuZ3RoID4gc3RhcnRXaWR0aCAvIDIpIHtcclxuICAgICAgICAgICAgICAgIHBhcmFtLndpdGhPZmZzZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcGFyYW0ub2Zmc2V0V2lkdGggPSAtKHJpZ2h0TGVuZ3RoIC0gc3RhcnRXaWR0aCAvIDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbGlkUmlnaHRMZW5ndGggPSBNYXRoLm1heChzdGFydFdpZHRoIC8gMiwgcmlnaHRMZW5ndGgpO1xyXG4gICAgICAgICAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXHJcbiAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSksXHJcbiAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC12YWxpZFJpZ2h0TGVuZ3RoKSksXHJcbiAgICAgICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC12YWxpZFJpZ2h0TGVuZ3RoKSksXHJcbiAgICAgICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSksXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIG1vbGRTaGFwZS50ZW1wTGluZXMgPSBbWzAsIDFdLCBbMSwgMl0sIFsyLCAzXSwgWzMsIDBdXTtcclxuICAgICAgICAgICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFsuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKSksXHJcbiAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgLSBwbGF0Zm9ybVRoaWNrbmVzcykpKSxcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgaWYgKHRlbXApIHtcclxuICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW1xyXG4gICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcy5tYXAoc2VnID0+IFtzZWdbMF0gKyA0LCBzZWdbMV0gKyA0XSksXHJcbiAgICAgICAgICAgICAgICAgICAgWzAsIDRdLCBbMSwgNV0sIFsyLCA2XSwgWzMsIDddLFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhbmdsZSA8PSBEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSB8fCBhbmdsZSA+PSAoTWF0aC5QSSAqIDIgLSBEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSkpIHtcclxuICAgICAgICAgICAgc2VnbWVudC5lbmQgPSBzZWdtZW50LnN0YXJ0LmFkZGVkKHByZXZEaXJOb3JtYWxpemVkLm11bHRpcGxpZWQoZnJvbnRMZW5ndGgpKTtcclxuICAgICAgICAgICAgcGFyYW0ucGxhdGZvcm1MZW5ndGggPSBmcm9udExlbmd0aDtcclxuICAgICAgICAgICAgbW9sZFNoYXBlLnZlcnRpY2VzID0gW1xyXG4gICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpLFxyXG4gICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSxcclxuICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSksXHJcbiAgICAgICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSksXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIG1vbGRTaGFwZS50ZW1wTGluZXMgPSBbWzAsIDFdLCBbMSwgMl0sIFsyLCAzXSwgWzMsIDBdXTtcclxuICAgICAgICAgICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFsuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKSksXHJcbiAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgLSBwbGF0Zm9ybVRoaWNrbmVzcykpKSxcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgaWYgKHRlbXApIHtcclxuICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW1xyXG4gICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcy5tYXAoc2VnID0+IFtzZWdbMF0gKyA0LCBzZWdbMV0gKyA0XSksXHJcbiAgICAgICAgICAgICAgICAgICAgWzAsIDRdLCBbMSwgNV0sIFsyLCA2XSwgWzMsIDddLFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSA8IGFuZ2xlICYmIGFuZ2xlIDwgKE1hdGguUEkgLyAyIC0gYW5nbGUxKSkge1xyXG4gICAgICAgICAgICBwYXJhbS5wbGF0Zm9ybUxlbmd0aCA9IHNlZ21lbnQuZW5kLmRpc3RhbmNlVG8oc2VnbWVudC5zdGFydCk7XHJcbiAgICAgICAgICAgIGxldCBsZWZ0Q29ubmVjdFBvaW50cyA9IFtzdGFydC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSwgYmFzZUxpbmVFbmRdO1xyXG4gICAgICAgICAgICBjb25zdCBiYXNlTGluZUVuZERpc3RhbmNlID0gc3RhcnQuZGlzdGFuY2VUbyhiYXNlTGluZUVuZCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGxlZnRQcm9qZWN0RGlzdGFuY2UgPSBzdGFydFdpZHRoIC8gMiAqIE1hdGguY29zKGFuZ2xlKTtcclxuICAgICAgICAgICAgaWYgKGxlZnRQcm9qZWN0RGlzdGFuY2UgPCBiYXNlTGluZUVuZERpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsMSA9IHN0YXJ0V2lkdGggLyAyIC8gTWF0aC5jb3MoYW5nbGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGwxID4gYmFzZUxpbmVFbmREaXN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGExID0gbDEgLSBiYXNlTGluZUVuZERpc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGMxID0gYTEgLyBNYXRoLnRhbihhbmdsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdENvbm5lY3RQb2ludHMgPSBbc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChiYXNlTGluZUVuZERpc3RhbmNlKSkuYWRkZWQocHJldkRpck5vcm1hbGl6ZWQubXVsdGlwbGllZChjMSkpLCBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKGJhc2VMaW5lRW5kRGlzdGFuY2UpKV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0Q29ubmVjdFBvaW50cyA9IFtzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKGwxKSldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtcclxuICAgICAgICAgICAgICAgIC8vIHN0YXJ0LmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpLFxyXG4gICAgICAgICAgICAgICAgLi4ubGVmdENvbm5lY3RQb2ludHMsXHJcbiAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMiAvIE1hdGguY29zKGFuZ2xlKSkpLFxyXG4gICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpLFxyXG4gICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSksXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIGNvbnN0IG1vbGRWZXJ0ZXhDb3VudCA9IG1vbGRTaGFwZS52ZXJ0aWNlcy5sZW5ndGg7XHJcbiAgICAgICAgICAgIG1vbGRTaGFwZS50ZW1wTGluZXMgPSBnZW5lcmF0ZVRlbXBMaW5lc0xvb3AobW9sZFZlcnRleENvdW50KTtcclxuICAgICAgICAgICAgLy8gaWYgKG1vbGRWZXJ0ZXhDb3VudCA9PT0gNCkge1xyXG4gICAgICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyAgICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtbMCwgMV0sIFsxLCAyXSwgWzIsIDNdLCBbMywgNF0sIFs0LCAwXV07XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFsuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKSksXHJcbiAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgLSBwbGF0Zm9ybVRoaWNrbmVzcykpKSxcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgaWYgKHRlbXApIHtcclxuICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW1xyXG4gICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcy5tYXAoc2VnID0+IFtzZWdbMF0gKyBtb2xkVmVydGV4Q291bnQsIHNlZ1sxXSArIG1vbGRWZXJ0ZXhDb3VudF0pLFxyXG4gICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMubWFwKHNlZyA9PiBbc2VnWzBdLCBzZWdbMF0gKyBtb2xkVmVydGV4Q291bnRdKSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBbMCwgNV0sIFsxLCA2XSwgWzIsIDddLCBbMywgOF0sIFs0LCA5XSxcclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoYW5nbGUgPiAoTWF0aC5QSSAqIDMgLyAyICsgYW5nbGUxKSAmJiBhbmdsZSA8IChNYXRoLlBJICogMiAtIERpcmVjdGlvbkFuZ2xlVG9sZXJhbmNlKSkge1xyXG4gICAgICAgICAgICBwYXJhbS5wbGF0Zm9ybUxlbmd0aCA9IHNlZ21lbnQuZW5kLmRpc3RhbmNlVG8oc2VnbWVudC5zdGFydCk7XHJcbiAgICAgICAgICAgIGxldCByaWdodENvbm5lY3RQb2ludHMgPSBbYmFzZUxpbmVTdGFydCwgc3RhcnQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpXTtcclxuICAgICAgICAgICAgY29uc3QgYmFzZUxpbmVTdGFydERpc3RhbmNlID0gc3RhcnQuZGlzdGFuY2VUbyhiYXNlTGluZVN0YXJ0KTtcclxuICAgICAgICAgICAgY29uc3QgcmlnaHRQcm9qZWN0RGlzdGFuY2UgPSBzdGFydFdpZHRoIC8gMiAqIE1hdGguY29zKGFuZ2xlKTtcclxuICAgICAgICAgICAgaWYgKHJpZ2h0UHJvamVjdERpc3RhbmNlIDwgYmFzZUxpbmVTdGFydERpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBsZXQgcmlnaHRDb25uZWN0UG9pbnRzID0gW2Jhc2VMaW5lU3RhcnQsIGJhc2VMaW5lU3RhcnRdO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgKHN0YXJ0V2lkdGggPD0gcHJldlBhcmFtLmVuZFdpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsMiA9IHN0YXJ0V2lkdGggLyAyIC8gTWF0aC5jb3MoYW5nbGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGwyID4gYmFzZUxpbmVTdGFydERpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYTIgPSBsMiAtIGJhc2VMaW5lU3RhcnREaXN0YW5jZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjMiA9IGEyIC8gTWF0aC50YW4oTWF0aC5QSSAqIDIgLSBhbmdsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmlnaHRDb25uZWN0UG9pbnRzID0gW3N0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLWJhc2VMaW5lU3RhcnREaXN0YW5jZSkpLCBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC1iYXNlTGluZVN0YXJ0RGlzdGFuY2UpKS5hZGRlZChwcmV2RGlyTm9ybWFsaXplZC5tdWx0aXBsaWVkKGMyKSldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmlnaHRDb25uZWN0UG9pbnRzID0gW3N0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLWwyKSldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtcclxuICAgICAgICAgICAgICAgIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIgLyBNYXRoLmNvcyhhbmdsZSkpKSxcclxuICAgICAgICAgICAgICAgIC4uLnJpZ2h0Q29ubmVjdFBvaW50cyxcclxuICAgICAgICAgICAgICAgIC8vIHN0YXJ0LmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSxcclxuICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSxcclxuICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpLFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICBjb25zdCBtb2xkVmVydGV4Q291bnQgPSBtb2xkU2hhcGUudmVydGljZXMubGVuZ3RoO1xyXG4gICAgICAgICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gZ2VuZXJhdGVUZW1wTGluZXNMb29wKG1vbGRWZXJ0ZXhDb3VudCk7XHJcbiAgICAgICAgICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkpLFxyXG4gICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0IC0gcGxhdGZvcm1UaGlja25lc3MpKSksXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIGlmICh0ZW1wKSB7XHJcbiAgICAgICAgICAgICAgICBzdGFpclNoYXBlLnRlbXBMaW5lcyA9IFtcclxuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLFxyXG4gICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMubWFwKHNlZyA9PiBbc2VnWzBdICsgbW9sZFZlcnRleENvdW50LCBzZWdbMV0gKyBtb2xkVmVydGV4Q291bnRdKSxcclxuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLm1hcChzZWcgPT4gW3NlZ1swXSwgc2VnWzBdICsgbW9sZFZlcnRleENvdW50XSksXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHBhcmFtLnBsYXRmb3JtTGVuZ3RoID0gc2VnbWVudC5lbmQuZGlzdGFuY2VUbyhzZWdtZW50LnN0YXJ0KTtcclxuICAgICAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXHJcbiAgICAgICAgICAgIHN0YXJ0LmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpLFxyXG4gICAgICAgICAgICBzdGFydC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSksXHJcbiAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSxcclxuICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSksXHJcbiAgICAgICAgXTtcclxuICAgICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgM10sIFszLCAwXV07XHJcbiAgICAgICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFsuLi5tb2xkU2hhcGUudmVydGljZXMsXHJcbiAgICAgICAgICAgIC4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCgtcGxhdGZvcm1UaGlja25lc3MpKSksXHJcbiAgICAgICAgXTtcclxuICAgICAgICBpZiAodGVtcCkge1xyXG4gICAgICAgICAgICBzdGFpclNoYXBlLnRlbXBMaW5lcyA9IFtcclxuICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMsXHJcbiAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLm1hcChzZWcgPT4gW3NlZ1swXSArIDQsIHNlZ1sxXSArIDRdKSxcclxuICAgICAgICAgICAgICAgIFswLCA0XSwgWzEsIDVdLCBbMiwgNl0sIFszLCA3XSxcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZ2VuZXJhdGVUZW1wTGluZXNMb29wKHZlcnRleENvdW50KSB7XHJcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogdmVydGV4Q291bnQgfSkubWFwKChfLCBpKSA9PiBbaSwgaSA9PT0gdmVydGV4Q291bnQgLSAxID8gMCA6IGkgKyAxXSk7XHJcbn1cclxuIiwiZXhwb3J0IGNvbnN0IFN0YWlyTW9kZWxLZXkgPSAnRHJhd1N0YWlyc01vZGVsJztcclxuZXhwb3J0IGNvbnN0IFN0YWlyTW9kZWxWYWx1ZSA9ICcxJztcclxuLy8gZXhwb3J0IGNvbnN0IFN0YWlyS2V5ID0gJ0RTU3RhaXInO1xyXG4vLyBleHBvcnQgY29uc3QgUGxhdGZvcm1LZXkgPSAnRFNQbGF0Zm9ybSc7XHJcbmV4cG9ydCBjb25zdCBQYXJhbUtleSA9ICdEU1BhcmFtJztcclxuLy8gc3RhcnRIZWlnaHQgYW5kIGVuZEhlaWdodCBjYWNoZWQgaW4gc3RhcnQgYW5kIGVuZFxyXG5leHBvcnQgY29uc3QgQ29tcG9uZW50SW5kZXhLZXkgPSAnSW5kJztcclxuZXhwb3J0IGNvbnN0IFN0YXJ0RW5kS2V5ID0gJ1NUb0UnO1xyXG5leHBvcnQgY29uc3QgQmFzZUxpbmVTZWczZEtleSA9ICdCYXNlTGluZSc7XHJcbmV4cG9ydCBjb25zdCBDaXJjbGVUYW5nZW50S2V5ID0gJ0NpcmNsZVRhbmdlbnQnO1xyXG5leHBvcnQgY29uc3QgRGVsaW1pdGVyID0gJyYnO1xyXG5leHBvcnQgY29uc3QgQ29vcmREZWxpbWl0ZXIgPSAnLCc7XHJcbmV4cG9ydCB2YXIgQ29tcG9uZW50UGFyYW1UeXBlO1xyXG4oZnVuY3Rpb24gKENvbXBvbmVudFBhcmFtVHlwZSkge1xyXG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSG9yaXpvbnRhbFN0ZXBcIl0gPSBcImhvcml6b250YWxTdGVwXCI7XHJcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJWZXJ0aWNhbFN0ZXBcIl0gPSBcInZlcnRpY2FsU3RlcFwiO1xyXG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiU3RhcnRXaWR0aFwiXSA9IFwic3RhcnRXaWR0aFwiO1xyXG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiRW5kV2lkdGhcIl0gPSBcImVuZFdpZHRoXCI7XHJcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJTdGVwUHJvcG9ydGlvbmFsXCJdID0gXCJzdGVwUHJvcG9ydGlvbmFsXCI7XHJcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJXaWR0aFByb3BvcnRpb25hbFwiXSA9IFwid2lkdGhQcm9wb3J0aW9uYWxcIjtcclxuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIlBsYXRmb3JtTGVuZ3RoXCJdID0gXCJwbGF0Zm9ybUxlbmd0aFwiO1xyXG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiUGxhdGZvcm1MZW5ndGhMb2NrZWRcIl0gPSBcInBsYXRmb3JtTGVuZ3RoTG9ja2VkXCI7XHJcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJUeXBlXCJdID0gXCJ0eXBlXCI7XHJcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJVcHdhcmRcIl0gPSBcInVwd2FyZFwiO1xyXG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiUGxhdGZvcm1UaGlja25lc3NcIl0gPSBcInBsYXRmb3JtVGhpY2tuZXNzXCI7XHJcbn0pKENvbXBvbmVudFBhcmFtVHlwZSB8fCAoQ29tcG9uZW50UGFyYW1UeXBlID0ge30pKTtcclxuLy8gaW50ZXJmYWNlIFBhcmFtU2V0dGluZ3Mge1xyXG4vLyAgICAgbWluOiBudW1iZXI7XHJcbi8vICAgICBtYXg6IG51bWJlcjtcclxuLy8gICAgIHN0ZXA6IG51bWJlcjtcclxuLy8gICAgIHVuaXQ6IHN0cmluZztcclxuLy8gICAgIHByZWNpc2lvbjogbnVtYmVyO1xyXG4vLyB9XHJcbmV4cG9ydCB2YXIgQ29tcG9uZW50VHlwZTtcclxuKGZ1bmN0aW9uIChDb21wb25lbnRUeXBlKSB7XHJcbiAgICBDb21wb25lbnRUeXBlW0NvbXBvbmVudFR5cGVbXCJTdHJhaWdodFN0YWlyXCJdID0gMF0gPSBcIlN0cmFpZ2h0U3RhaXJcIjtcclxuICAgIENvbXBvbmVudFR5cGVbQ29tcG9uZW50VHlwZVtcIkNpcmN1bGFyU3RhaXJcIl0gPSAxXSA9IFwiQ2lyY3VsYXJTdGFpclwiO1xyXG4gICAgQ29tcG9uZW50VHlwZVtDb21wb25lbnRUeXBlW1wiUGxhdGZvcm1cIl0gPSAyXSA9IFwiUGxhdGZvcm1cIjtcclxufSkoQ29tcG9uZW50VHlwZSB8fCAoQ29tcG9uZW50VHlwZSA9IHt9KSk7XHJcbmV4cG9ydCBjb25zdCBDb21wb25lbnRQYXJhbVNldHRpbmdzID0ge1xyXG4gICAgaG9yaXpvbnRhbFN0ZXA6IHtcclxuICAgICAgICB0aXRsZTogXCLmraXplb9cIixcclxuICAgICAgICBtaW46IDEsXHJcbiAgICAgICAgbWF4OiAxMDAwMDAsXHJcbiAgICAgICAgc3RlcDogMTAsXHJcbiAgICAgICAgdW5pdDogJ+mVvycsXHJcbiAgICAgICAgcHJlY2lzaW9uOiAwLFxyXG4gICAgfSxcclxuICAgIHZlcnRpY2FsU3RlcDoge1xyXG4gICAgICAgIHRpdGxlOiBcIuatpemVv1wiLFxyXG4gICAgICAgIG1pbjogMSxcclxuICAgICAgICBtYXg6IDEwMDAwMCxcclxuICAgICAgICBzdGVwOiAxMCxcclxuICAgICAgICB1bml0OiAn6auYJyxcclxuICAgICAgICBwcmVjaXNpb246IDAsXHJcbiAgICB9LFxyXG4gICAgc3RhcnRXaWR0aDoge1xyXG4gICAgICAgIHRpdGxlOiBcIuWuveW6plwiLFxyXG4gICAgICAgIG1pbjogMSxcclxuICAgICAgICBtYXg6IDEwMDAwMCxcclxuICAgICAgICBzdGVwOiA1MCxcclxuICAgICAgICB1bml0OiAn6LW3JyxcclxuICAgICAgICBwcmVjaXNpb246IDAsXHJcbiAgICB9LFxyXG4gICAgZW5kV2lkdGg6IHtcclxuICAgICAgICB0aXRsZTogXCLlrr3luqZcIixcclxuICAgICAgICBtaW46IDEsXHJcbiAgICAgICAgbWF4OiAxMDAwMDAsXHJcbiAgICAgICAgc3RlcDogNTAsXHJcbiAgICAgICAgdW5pdDogJ+e7iCcsXHJcbiAgICAgICAgcHJlY2lzaW9uOiAwLFxyXG4gICAgfSxcclxuICAgIHBsYXRmb3JtTGVuZ3RoOiB7XHJcbiAgICAgICAgdGl0bGU6IFwi6ZW/5bqmXCIsXHJcbiAgICAgICAgbWluOiAxMDAsXHJcbiAgICAgICAgbWF4OiAxMDAwMDAsXHJcbiAgICAgICAgc3RlcDogNTAsXHJcbiAgICAgICAgdW5pdDogJycsXHJcbiAgICAgICAgcHJlY2lzaW9uOiAwLFxyXG4gICAgfSxcclxuICAgIHR5cGU6IHtcclxuICAgICAgICAvLyByYWRpb1ZhbHVlczogW0NvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpciwgQ29tcG9uZW50VHlwZS5DaXJjdWxhclN0YWlyLCBDb21wb25lbnRUeXBlLlBsYXRmb3JtXSxcclxuICAgICAgICAvLyB0ZXh0czogW1wi55u06Zi2XCIsIFwi5peL6L2s6Zi25qKvXCIsIFwi5bmz5Y+wXCJdLFxyXG4gICAgICAgIHRpdGxlOiBcIuexu+Wei1wiLFxyXG4gICAgICAgIHJhZGlvT3B0aW9uczogW1xyXG4gICAgICAgICAgICB7IHZhbHVlOiBDb21wb25lbnRUeXBlLlN0cmFpZ2h0U3RhaXIsIHRleHQ6IFwi55u06Zi2XCIgfSxcclxuICAgICAgICAgICAgeyB2YWx1ZTogQ29tcG9uZW50VHlwZS5DaXJjdWxhclN0YWlyLCB0ZXh0OiBcIuaXi+i9rOmYtuair1wiIH0sXHJcbiAgICAgICAgICAgIHsgdmFsdWU6IENvbXBvbmVudFR5cGUuUGxhdGZvcm0sIHRleHQ6IFwi5bmz5Y+wXCIgfSxcclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAgdXB3YXJkOiB7XHJcbiAgICAgICAgLy8gcmFkaW9WYWx1ZXM6IFsxLCAwXSxcclxuICAgICAgICAvLyB0ZXh0czogW1wi5ZCR5LiKXCIsIFwi5ZCR5LiLXCJdLFxyXG4gICAgICAgIHRpdGxlOiBcIuaWueWQkVwiLFxyXG4gICAgICAgIHJhZGlvT3B0aW9uczogW1xyXG4gICAgICAgICAgICB7IHZhbHVlOiB0cnVlLCB0ZXh0OiBcIuWQkeS4ilwiIH0sXHJcbiAgICAgICAgICAgIHsgdmFsdWU6IGZhbHNlLCB0ZXh0OiBcIuWQkeS4i1wiIH0sXHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHBsYXRmb3JtVGhpY2tuZXNzOiB7XHJcbiAgICAgICAgdGl0bGU6IFwi5Y6a5bqmXCIsXHJcbiAgICAgICAgbWluOiAxLFxyXG4gICAgICAgIG1heDogMTAwMDAwLFxyXG4gICAgICAgIHN0ZXA6IDEwLFxyXG4gICAgICAgIHVuaXQ6ICcnLFxyXG4gICAgICAgIHByZWNpc2lvbjogMCxcclxuICAgIH0sXHJcbn07XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDb21wb25lbnRUaXRsZShjb21wb25lbnRUeXBlKSB7XHJcbiAgICBpZiAoY29tcG9uZW50VHlwZSA9PT0gQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyKSB7XHJcbiAgICAgICAgcmV0dXJuICfnm7QnO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoY29tcG9uZW50VHlwZSA9PT0gQ29tcG9uZW50VHlwZS5DaXJjdWxhclN0YWlyKSB7XHJcbiAgICAgICAgcmV0dXJuICfml4snO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuICflj7AnO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjb25zdCBEZWZhdWx0Q29tcG9uZW50UGFyYW0gPSB7XHJcbiAgICBpbmRleDogMCxcclxuICAgIGhvcml6b250YWxTdGVwOiA1MDAsXHJcbiAgICB2ZXJ0aWNhbFN0ZXA6IDIwMCxcclxuICAgIHN0YXJ0V2lkdGg6IDEwMDAsXHJcbiAgICBlbmRXaWR0aDogMTAwMCxcclxuICAgIG9mZnNldFdpZHRoOiAwLFxyXG4gICAgd2l0aE9mZnNldDogZmFsc2UsXHJcbiAgICBwbGF0Zm9ybUxlbmd0aDogMjAwMCxcclxuICAgIHR5cGU6IENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpcixcclxuICAgIHVwd2FyZDogdHJ1ZSxcclxuICAgIHBsYXRmb3JtVGhpY2tuZXNzOiAyMDAsXHJcbiAgICBzdGVwUHJvcG9ydGlvbmFsOiB0cnVlLFxyXG4gICAgd2lkdGhQcm9wb3J0aW9uYWw6IHRydWUsXHJcbiAgICBwbGF0Zm9ybUxlbmd0aExvY2tlZDogZmFsc2UsXHJcbiAgICAvLyBzdGVwVHlwZTogU3RlcFR5cGUuTm9ybWFsLFxyXG4gICAgLy8gY29ybmVyVHlwZTogQ29ybmVyVHlwZS5SZWN0YW5nbGUsXHJcbn07XHJcbmV4cG9ydCBmdW5jdGlvbiBpc0F4aXNWYWxpZChheGlzKSB7XHJcbiAgICByZXR1cm4gYXhpcyA9PT0gXCJYXCIgLyogQXhpcy5YICovIHx8IGF4aXMgPT09IFwiLVhcIiAvKiBBeGlzLlhNaW51cyAqLyB8fCBheGlzID09PSBcIllcIiAvKiBBeGlzLlkgKi8gfHwgYXhpcyA9PT0gXCItWVwiIC8qIEF4aXMuWU1pbnVzICovIHx8IGF4aXMgPT09IFwiWlwiIC8qIEF4aXMuWiAqLyB8fCBheGlzID09PSBcIi1aXCIgLyogQXhpcy5aTWludXMgKi87XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29vcmREZWxpbWl0ZXIsIERlZmF1bHRDb21wb25lbnRQYXJhbSwgRGVsaW1pdGVyIH0gZnJvbSBcIi4vdHlwZXNcIjtcclxuZXhwb3J0IGZ1bmN0aW9uIGlzS0FyY2hGYWNlKGVudGl0eSkge1xyXG4gICAgcmV0dXJuICEhZW50aXR5ICYmIChlbnRpdHkuZ2V0VHlwZSgpID09PSBLQXJjaEZhY2VUeXBlLk5vblBsYW5hciB8fCBlbnRpdHkuZ2V0VHlwZSgpID09PSBLQXJjaEZhY2VUeXBlLlBsYW5hcik7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGlzS0dyb3VwSW5zdGFuY2UoZW50aXR5KSB7XHJcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS0VudGl0eVR5cGUuR3JvdXBJbnN0YW5jZTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gaXNLRmFjZShlbnRpdHkpIHtcclxuICAgIHJldHVybiAhIWVudGl0eSAmJiBlbnRpdHkuZ2V0VHlwZSgpID09PSBLRW50aXR5VHlwZS5GYWNlO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBpc0tFZGdlKGVudGl0eSkge1xyXG4gICAgcmV0dXJuICEhZW50aXR5ICYmIGVudGl0eS5nZXRUeXBlKCkgPT09IEtFbnRpdHlUeXBlLkVkZ2U7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGlzS1ZlcnRleChlbnRpdHkpIHtcclxuICAgIHJldHVybiAhIWVudGl0eSAmJiBlbnRpdHkuZ2V0VHlwZSgpID09PSBLRW50aXR5VHlwZS5WZXJ0ZXg7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGlzS0F1eGlsaWFyeUJvdW5kZWRDdXJ2ZShlbnRpdHkpIHtcclxuICAgIHJldHVybiAhIWVudGl0eSAmJiBlbnRpdHkuZ2V0VHlwZSgpID09PSBLRW50aXR5VHlwZS5BdXhpbGlhcnlCb3VuZGVkQ3VydmU7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGlzS0F1eGlsaWFyeUxpbmUoZW50aXR5KSB7XHJcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS0VudGl0eVR5cGUuQXV4aWxpYXJ5TGluZTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gaXNLUGxhbmUoZW50aXR5KSB7XHJcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS1N1cmZhY2VUeXBlLlBsYW5lO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBpc0tMaW5lU2VnbWVudDNkKGVudGl0eSkge1xyXG4gICAgcmV0dXJuICEhZW50aXR5ICYmICEhZW50aXR5LmRpcmVjdGlvbjtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gaXNLQXJjM2QoZW50aXR5KSB7XHJcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgISFlbnRpdHkuY2lyY2xlO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnlQYXJhbShwYXJhbSkge1xyXG4gICAgbGV0IHZhbHVlID0gJyc7XHJcbiAgICB2YWx1ZSArPSBgaW5kPSR7cGFyYW0uaW5kZXh9JHtEZWxpbWl0ZXJ9YDtcclxuICAgIHZhbHVlICs9IGBocz0ke3BhcmFtLmhvcml6b250YWxTdGVwfSR7RGVsaW1pdGVyfWA7XHJcbiAgICB2YWx1ZSArPSBgdnM9JHtwYXJhbS52ZXJ0aWNhbFN0ZXB9JHtEZWxpbWl0ZXJ9YDtcclxuICAgIHZhbHVlICs9IGBzdz0ke3BhcmFtLnN0YXJ0V2lkdGh9JHtEZWxpbWl0ZXJ9YDtcclxuICAgIHZhbHVlICs9IGBldz0ke3BhcmFtLmVuZFdpZHRofSR7RGVsaW1pdGVyfWA7XHJcbiAgICB2YWx1ZSArPSBgb3c9JHtwYXJhbS5vZmZzZXRXaWR0aH0ke0RlbGltaXRlcn1gO1xyXG4gICAgdmFsdWUgKz0gYHRwPSR7cGFyYW0udHlwZX0ke0RlbGltaXRlcn1gO1xyXG4gICAgdmFsdWUgKz0gYHVwPSR7cGFyYW0udXB3YXJkID8gMSA6IDB9JHtEZWxpbWl0ZXJ9YDtcclxuICAgIHZhbHVlICs9IGBwdGs9JHtwYXJhbS5wbGF0Zm9ybVRoaWNrbmVzc31gO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVBhcmFtKHZhbHVlKSB7XHJcbiAgICBjb25zdCBwYXJhbSA9IE9iamVjdC5hc3NpZ24oe30sIERlZmF1bHRDb21wb25lbnRQYXJhbSk7XHJcbiAgICBjb25zdCBpdGVtcyA9IHZhbHVlLnNwbGl0KERlbGltaXRlcik7XHJcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcclxuICAgICAgICBjb25zdCBrZXlWYWx1ZSA9IGl0ZW0uc3BsaXQoJz0nKTtcclxuICAgICAgICBpZiAoa2V5VmFsdWUubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoa2V5VmFsdWVbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2luZCc6XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uaW5kZXggPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdocyc6XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uaG9yaXpvbnRhbFN0ZXAgPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICd2cyc6XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0udmVydGljYWxTdGVwID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnc3cnOlxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnN0YXJ0V2lkdGggPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdldyc6XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uZW5kV2lkdGggPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdvdyc6XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0ub2Zmc2V0V2lkdGggPSBwYXJzZUZsb2F0KGtleVZhbHVlWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3RwJzpcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbS50eXBlID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAndXAnOlxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnVwd2FyZCA9IGtleVZhbHVlWzFdID09PSAnMScgPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdwdGsnOlxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnBsYXRmb3JtVGhpY2tuZXNzID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcGFyYW0uc3RlcFByb3BvcnRpb25hbCA9IHRydWU7XHJcbiAgICBwYXJhbS53aWR0aFByb3BvcnRpb25hbCA9IHRydWU7XHJcbiAgICBwYXJhbS5wbGF0Zm9ybUxlbmd0aExvY2tlZCA9IHRydWU7XHJcbiAgICBwYXJhbS5tb2RlbEVkaXRpbmcgPSB0cnVlO1xyXG4gICAgcmV0dXJuIHBhcmFtO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnlTdGFydEVuZChzdGFydCwgZW5kKSB7XHJcbiAgICBsZXQgdmFsdWUgPSAnJztcclxuICAgIHZhbHVlICs9IGAke3N0YXJ0Lnh9JHtDb29yZERlbGltaXRlcn1gO1xyXG4gICAgdmFsdWUgKz0gYCR7c3RhcnQueX0ke0Nvb3JkRGVsaW1pdGVyfWA7XHJcbiAgICB2YWx1ZSArPSBgJHtzdGFydC56fSR7RGVsaW1pdGVyfWA7XHJcbiAgICB2YWx1ZSArPSBgJHtlbmQueH0ke0Nvb3JkRGVsaW1pdGVyfWA7XHJcbiAgICB2YWx1ZSArPSBgJHtlbmQueX0ke0Nvb3JkRGVsaW1pdGVyfWA7XHJcbiAgICB2YWx1ZSArPSBgJHtlbmQuen1gO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVN0YXJ0RW5kKHZhbHVlKSB7XHJcbiAgICBjb25zdCBpdGVtcyA9IHZhbHVlLnNwbGl0KERlbGltaXRlcik7XHJcbiAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRLZXlWYWx1ZSA9IGl0ZW1zWzBdLnNwbGl0KENvb3JkRGVsaW1pdGVyKTtcclxuICAgICAgICBjb25zdCBlbmRLZXlWYWx1ZSA9IGl0ZW1zWzFdLnNwbGl0KENvb3JkRGVsaW1pdGVyKTtcclxuICAgICAgICBpZiAoc3RhcnRLZXlWYWx1ZS5sZW5ndGggPT09IDMgJiYgZW5kS2V5VmFsdWUubGVuZ3RoID09PSAzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKHBhcnNlRmxvYXQoc3RhcnRLZXlWYWx1ZVswXSksIHBhcnNlRmxvYXQoc3RhcnRLZXlWYWx1ZVsxXSksIHBhcnNlRmxvYXQoc3RhcnRLZXlWYWx1ZVsyXSkpO1xyXG4gICAgICAgICAgICBjb25zdCBlbmQgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QocGFyc2VGbG9hdChlbmRLZXlWYWx1ZVswXSksIHBhcnNlRmxvYXQoZW5kS2V5VmFsdWVbMV0pLCBwYXJzZUZsb2F0KGVuZEtleVZhbHVlWzJdKSk7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHN0YXJ0LCBlbmQgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeVBvaW50M2QocG9pbnQpIHtcclxuICAgIGxldCB2YWx1ZSA9ICcnO1xyXG4gICAgdmFsdWUgKz0gYCR7cG9pbnQueH0ke0Nvb3JkRGVsaW1pdGVyfWA7XHJcbiAgICB2YWx1ZSArPSBgJHtwb2ludC55fSR7Q29vcmREZWxpbWl0ZXJ9YDtcclxuICAgIHZhbHVlICs9IGAke3BvaW50Lnp9YDtcclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VWZWN0b3IzZCh2YWx1ZSkge1xyXG4gICAgY29uc3QgaXRlbXMgPSB2YWx1ZS5zcGxpdChDb29yZERlbGltaXRlcik7XHJcbiAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAzKSB7XHJcbiAgICAgICAgY29uc3QgdmVjdG9yID0gR2VvbUxpYi5jcmVhdGVWZWN0b3IzZChwYXJzZUZsb2F0KGl0ZW1zWzBdKSwgcGFyc2VGbG9hdChpdGVtc1sxXSksIHBhcnNlRmxvYXQoaXRlbXNbMl0pKTtcclxuICAgICAgICByZXR1cm4gdmVjdG9yO1xyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCB2YXIgTWVzc2FnZVR5cGU7XHJcbihmdW5jdGlvbiAoTWVzc2FnZVR5cGUpIHtcclxuICAgIE1lc3NhZ2VUeXBlW1wiUGFyYW1DaGFuZ2VkQnlJbnB1dFwiXSA9IFwicGFyYW1DaGFuZ2VkQnlJbnB1dFwiO1xyXG4gICAgTWVzc2FnZVR5cGVbXCJQYXJhbUNoYW5nZWRCeURyYXdcIl0gPSBcInBhcmFtQ2hhbmdlZEJ5RHJhd1wiO1xyXG4gICAgTWVzc2FnZVR5cGVbXCJDb21wb25lbnRBZGRlZFwiXSA9IFwiY29tcG9uZW50QWRkZWRcIjtcclxuICAgIE1lc3NhZ2VUeXBlW1wiRHJhd1N0YWlyTW9kZWxTZXR0bGVkXCJdID0gXCJkcmF3U3RhaXJNb2RlbFNldHRsZWRcIjtcclxuICAgIE1lc3NhZ2VUeXBlW1wiRm9jdXNDb21wb25lbnRJbmRleFwiXSA9IFwiZm9jdXNDb21wb25lbnRJbmRleFwiO1xyXG4gICAgTWVzc2FnZVR5cGVbXCJSZW1vdmVDb21wb25lbnRcIl0gPSBcInJlbW92ZUNvbXBvbmVudFwiO1xyXG4gICAgTWVzc2FnZVR5cGVbXCJBY3RpdmF0ZURyYXdTdGFpcnNUb29sXCJdID0gXCJhY3RpdmF0ZURyYXdTdGFpcnNUb29sXCI7XHJcbiAgICBNZXNzYWdlVHlwZVtcIkRlQWN0aXZhdGVEcmF3U3RhaXJzVG9vbFwiXSA9IFwiZGVBY3RpdmF0ZURyYXdTdGFpcnNUb29sXCI7XHJcbiAgICBNZXNzYWdlVHlwZVtcIkxlYXZlRHJhd1N0YWlyc1Rvb2xcIl0gPSBcImxlYXZlRHJhd1N0YWlyc1Rvb2xcIjtcclxufSkoTWVzc2FnZVR5cGUgfHwgKE1lc3NhZ2VUeXBlID0ge30pKTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9tYWluL21haW4udHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=