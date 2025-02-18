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
            if (!editModel || (editPath.every(instance => instance.getKey() !== editModel.parent.instanceKey && [...editModel.child.values()].every(comp => comp.instanceKey !== instance.getKey())))) {
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
        onModelChanged,
    });
}
function onModelChanged(changes) {
    const deleted = changes.deleted;
    const editModel = _tools_DrawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool.getEditModel();
    if ((deleted === null || deleted === void 0 ? void 0 : deleted.length) && editModel) {
        if (deleted.some(deleteGroup => editModel.parent.definitionKey === deleteGroup.getKey())) {
            _tools_DrawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool.clearEditModel();
        }
    }
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
const DefaultFocusedComponentIndex = -1;
class DrawStairsTool {
    constructor() {
        // private componentParam: ComponentParam = { ...DefaultComponentParam };
        this.drawing = false;
        this.focusedComponentIndex = DefaultFocusedComponentIndex;
        this.segments = [];
    }
    onToolActive() {
        toolHelper.setExcludeInferenceTypes([
            KEntityType.Face, KEntityType.Edge, KEntityType.AuxiliaryBoundedCurve, KEntityType.AuxiliaryLine, KEntityType.AuxiliaryVertex,
            KEntityType.GroupInstance, KEntityType.Vertex, KArchFaceType.NonPlanar, KArchFaceType.Planar,
        ]);
        const firstSegment = (0,_consts__WEBPACK_IMPORTED_MODULE_4__.getEmptySegment)();
        firstSegment.startLocked = false;
        this.stairParam = _types__WEBPACK_IMPORTED_MODULE_0__.DefaultStairParam;
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
                    this.drawTempComponent(lastSegment);
                }
                else {
                    if (this.segments.length > 1) {
                        const prevSegment = this.focusedComponentIndex === lastSegment.param.index ? this.segments[this.segments.length - 2] : this.segments.find(seg => seg.param.index === this.focusedComponentIndex);
                        // must be true
                        if ((prevSegment === null || prevSegment === void 0 ? void 0 : prevSegment.param.type) === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform) {
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
                    }
                    else {
                        lastSegment.endLocked = true;
                        const lastParam = lastSegment.param;
                        const nextSegment = Object.assign(Object.assign({}, (0,_consts__WEBPACK_IMPORTED_MODULE_4__.getEmptySegment)()), { start: lastSegment.end, end: lastSegment.end, startLocked: lastParam.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform ? false : true, startHeight: lastSegment.endHeight, endHeight: lastSegment.endHeight, param: Object.assign(Object.assign({}, lastParam), { index: lastParam.index + 1, startWidth: lastParam.endWidth, offsetWidth: 0, type: lastParam.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform ? _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.StraightStair : _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform, platformLengthLocked: false }) });
                        const { moldShape: { vertices } } = lastSegment;
                        if (!lastSegment.baseLineSeg3d) {
                            lastSegment.baseLineSeg3d = { start: vertices[0], end: vertices[1] };
                        }
                        nextSegment.baseLineSeg3d = { start: vertices[vertices.length - 1], end: vertices[vertices.length - 2] };
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
                    this.clearPickStartTempShapes(lastSegment);
                    this.drawTempComponent(lastSegment);
                }
            }
        }
    }
    drawPickStartTempShapes(position, closestPoint, theSegment) {
        if (theSegment.pickStartTempShapeId) {
            appView.clearTemporaryShapesByIds([theSegment.pickStartTempShapeId]);
        }
        if (closestPoint) {
            const pickStartTempShapeId = appView.drawLines([position, closestPoint], { color: { r: 0, g: 0, b: 255 }, depthTest: true, pattern: KLinePattern.Dash, gapSize: 50, dashSize: 50 });
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
    drawTempComponent(theSegment, focused = false) {
        var _a, _b;
        if (theSegment.startLocked) {
            (0,_tempMeshUtils__WEBPACK_IMPORTED_MODULE_1__.generateShape)(theSegment, this.drawing);
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
        if (this.segments.length) {
            const lastSegment = this.segments[this.segments.length - 1];
            const lastSegmentIndex = lastSegment.param.index;
            // if (componentIndex !== this.focusedComponentIndex) {
            const newFocusedSegment = this.segments.find(seg => seg.param.index === componentIndex);
            if (newFocusedSegment) {
                if (this.drawing && !lastSegment.endLocked && componentIndex !== lastSegmentIndex) {
                    const { param: { type: newFocusedType }, moldShape: { vertices: newFocusedVertices, tempLines: newFocusedTempLines } } = newFocusedSegment;
                    const { start } = lastSegment;
                    this.clearPickStartTempShapes(lastSegment);
                    this.clearTempShapes(lastSegment);
                    if (newFocusedType === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform) {
                        let closestPoint;
                        let minDistance = 0;
                        newFocusedTempLines.forEach(line => {
                            const lineSeg3d = GeomLib.createLineSegment3d(newFocusedVertices[line[0]], newFocusedVertices[line[1]]);
                            const thePoint = lineSeg3d.getClosestPoint(start);
                            const curDistance = thePoint.distanceTo(start);
                            if (!closestPoint || curDistance < minDistance) {
                                minDistance = curDistance;
                                closestPoint = thePoint;
                                lastSegment.start = closestPoint;
                                lastSegment.baseLineSeg3d = { start: newFocusedVertices[line[0]], end: newFocusedVertices[line[1]] };
                            }
                        });
                        lastSegment.startLocked = false;
                        lastSegment.circleTangent = undefined;
                        this.drawPickStartTempShapes(start, lastSegment.start, lastSegment);
                    }
                    else {
                        lastSegment.start = newFocusedSegment.end.clone();
                        lastSegment.startLocked = true;
                        lastSegment.baseLineSeg3d = { start: newFocusedVertices[newFocusedVertices.length - 1], end: newFocusedVertices[newFocusedVertices.length - 2] };
                        lastSegment.circleTangent = undefined;
                        this.drawTempComponent(lastSegment, false);
                    }
                }
                if ((this.drawing && componentIndex !== lastSegmentIndex) || !this.drawing) {
                    this.drawTempComponent(newFocusedSegment, this.drawing);
                }
            }
            const oldFocusedSegment = this.segments.find(seg => seg.param.index === this.focusedComponentIndex);
            if (((this.drawing && this.focusedComponentIndex !== lastSegmentIndex) || (!this.drawing && this.focusedComponentIndex !== componentIndex)) && oldFocusedSegment) {
                if (this.drawing) {
                    this.drawTempComponent(oldFocusedSegment, false);
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
                }
                else if (this.editModel) {
                    const theInstance = this.editModel.child.get(componentIndex);
                    if (theInstance) {
                        this.editModel.child.delete(componentIndex);
                        design.removeGroupInstance(theInstance.instance);
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
    changeStairParam(stairParam, changeParams) {
        return __awaiter(this, void 0, void 0, function* () {
            this.stairParam = stairParam;
        });
    }
    changeComponentParam(componentParam, changeParams) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.segments.length)
                return;
            const theSegment = this.segments.find(seg => seg.param.index === componentParam.index);
            const lastSegment = this.segments[this.segments.length - 1];
            if (theSegment) {
                const { param: { index } } = theSegment;
                componentParam.modelEditing = true;
                theSegment.param = componentParam;
                if (this.drawing) {
                    this.drawTempComponent(theSegment, theSegment.param.index !== lastSegment.param.index);
                }
                else if (this.editModel) {
                    // selection.clear();
                    const theInstance = this.editModel.child.get(index);
                    if (theInstance) {
                        (0,_tempMeshUtils__WEBPACK_IMPORTED_MODULE_1__.generateShape)(theSegment);
                        const theMeshes = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.generateMeshes)([theSegment]);
                        if (theMeshes.length) {
                            design.startOperation();
                            let operationSuccess = (yield design.activateGroupInstance(this.editModel.parent.instance)).isSuccess;
                            if (operationSuccess) {
                                operationSuccess = operationSuccess && design.removeGroupInstance(theInstance.instance).isSuccess;
                                if (operationSuccess) {
                                    const newInstance = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.buildComponentInstance)(theSegment);
                                    operationSuccess = operationSuccess && !!newInstance;
                                    if (newInstance) {
                                        this.editModel.child.set(index, { instance: newInstance, definitionKey: ((_a = newInstance.getGroupDefinition()) === null || _a === void 0 ? void 0 : _a.getKey()) || '', instanceKey: newInstance.getKey() });
                                    }
                                }
                            }
                            operationSuccess = operationSuccess && (yield design.deactivateGroupInstance()).isSuccess;
                            if (operationSuccess) {
                                design.commitOperation();
                            }
                            else {
                                design.abortOperation();
                            }
                            selection.add([this.editModel.parent.instance]);
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
        var _a, _b, _c;
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
                    editModelChild.set(segment.param.index, { instance: newInstance, definitionKey: ((_a = newInstance.getGroupDefinition()) === null || _a === void 0 ? void 0 : _a.getKey()) || '', instanceKey: newInstance.getKey() });
                    segment.param.platformLengthLocked = true;
                    segment.param.stepProportional = true;
                    segment.param.widthProportional = true;
                    segment.param.modelEditing = true;
                    validSegments.push(segment);
                }
            }
            if (newInstances.length) {
                const parentInstance = (_b = design.makeGroup([], newInstances, [])) === null || _b === void 0 ? void 0 : _b.addedInstance;
                operationSuccess = operationSuccess && !!parentInstance;
                const parentDef = parentInstance === null || parentInstance === void 0 ? void 0 : parentInstance.getGroupDefinition();
                if (parentInstance && parentDef) {
                    operationSuccess = operationSuccess && parentDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.StairModelKey, _types__WEBPACK_IMPORTED_MODULE_0__.StairModelValue).isSuccess;
                    if (operationSuccess) {
                        design.commitOperation();
                        this.editModel = {
                            parent: { instance: parentInstance, definitionKey: ((_c = parentInstance.getGroupDefinition()) === null || _c === void 0 ? void 0 : _c.getKey()) || '', instanceKey: parentInstance.getKey() },
                            child: editModelChild
                        };
                        this.segments = validSegments;
                        this.drawing = false;
                        this.drawTempComponent(validSegments[0], true);
                        pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.DrawStairModelSettled, componentParams: this.segments.map(seg => (Object.assign({}, seg.param))), stairParam: this.stairParam }, '*');
                        return;
                    }
                }
            }
            design.abortOperation();
        }
    }
    getEditModel() {
        return this.editModel;
    }
    setModel(groupInstance) {
        var _a, _b, _c;
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
            if (stairModelProperty === _types__WEBPACK_IMPORTED_MODULE_0__.StairModelValue) {
                const segments = [];
                const subGroupInstances = groupDef.getSubGroupInstances();
                const editModel = {
                    parent: { instance: groupInstance, definitionKey: ((_b = groupInstance.getGroupDefinition()) === null || _b === void 0 ? void 0 : _b.getKey()) || '', instanceKey: groupInstance.getKey() },
                    child: new Map()
                };
                for (const subInstance of subGroupInstances) {
                    const subDef = subInstance.getGroupDefinition();
                    if (subDef) {
                        // const componentIndexValue = parseInt(subDef.getCustomProperty(ComponentIndexKey));
                        // if (isFinite(componentIndexValue)) {
                        const param = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.parseParam)(subDef.getCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.ParamKey));
                        const startEnd = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.parseStartEnd)(subDef.getCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.StartEndKey));
                        const baseLineSeg3d = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.parseLineSeg3d)(subDef.getCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.BaseLineSeg3dKey));
                        const circleTangent = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.parseVector3d)(subDef.getCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.CircleTangentKey));
                        if (param && startEnd && baseLineSeg3d) {
                            const segment = Object.assign(Object.assign({}, (0,_consts__WEBPACK_IMPORTED_MODULE_4__.getEmptySegment)()), { start: startEnd.start, end: startEnd.end, startHeight: startEnd.startHeight, endHeight: startEnd.endHeight, baseLineSeg3d,
                                circleTangent,
                                param, startLocked: true, endLocked: true });
                            segments.push(segment);
                            editModel.child.set(param.index, { instance: subInstance, definitionKey: ((_c = subInstance.getGroupDefinition()) === null || _c === void 0 ? void 0 : _c.getKey()) || '', instanceKey: subInstance.getKey() });
                        }
                        // }
                    }
                }
                if (segments.length) {
                    segments.sort((a, b) => a.param.index - b.param.index);
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
        this.focusedComponentIndex = DefaultFocusedComponentIndex;
        pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.DrawStairModelSettled }, '*');
    }
    clear() {
        appView.clearTemporaryShapes();
        // this.componentParam = { ...DefaultComponentParam };
        // this.segments = [];
        this.drawing = false;
        this.focusedComponentIndex = DefaultFocusedComponentIndex;
        this.stairParam = undefined;
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
        else {
            param.offsetWidth = 0;
            if (angle <= _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionAngleTolerance || angle >= (Math.PI * 2 - _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionAngleTolerance)) {
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
/* harmony export */   ColumnType: () => (/* binding */ ColumnType),
/* harmony export */   ComponentIndexKey: () => (/* binding */ ComponentIndexKey),
/* harmony export */   ComponentParamSettings: () => (/* binding */ ComponentParamSettings),
/* harmony export */   ComponentParamType: () => (/* binding */ ComponentParamType),
/* harmony export */   ComponentType: () => (/* binding */ ComponentType),
/* harmony export */   CoordDelimiter: () => (/* binding */ CoordDelimiter),
/* harmony export */   DefaultComponentParam: () => (/* binding */ DefaultComponentParam),
/* harmony export */   DefaultStairParam: () => (/* binding */ DefaultStairParam),
/* harmony export */   Delimiter: () => (/* binding */ Delimiter),
/* harmony export */   ParamKey: () => (/* binding */ ParamKey),
/* harmony export */   RailType: () => (/* binding */ RailType),
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
    ComponentParamType["Handrail"] = "handrail";
    ComponentParamType["HandrailHeight"] = "handrailHeight";
    ComponentParamType["HandrailRailType"] = "handrailRailType";
    ComponentParamType["HandrailRailRadius"] = "handrailRailRadius";
    ComponentParamType["HandrailRailWidth"] = "handrailRailWidth";
    ComponentParamType["HandrailRailHeight"] = "handrailRailHeight";
    ComponentParamType["HandrailColumnType"] = "handrailColumnType";
    ComponentParamType["HandrailColumnStep"] = "handrailColumnStep";
    ComponentParamType["HandrailColumnRadius"] = "handrailColumnRadius";
    ComponentParamType["HandrailColumnWidth"] = "handrailColumnWidth";
    ComponentParamType["HandrailColumnHeight"] = "handrailColumnHeight";
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
    handrail: {
        title: '栏杆',
        height: { title: "高度", min: 1, max: 100000, step: 10, unit: '', precision: 0, },
        rail: {
            type: {
                title: "样式",
                selectOptions: [
                    { value: RailType.Circle, text: "圆形" },
                    { value: RailType.Rect, text: "方形" },
                    { value: RailType.Custom, text: "自定义" },
                ]
            },
        },
        column: {
            type: {
                title: "样式",
                selectOptions: [
                    { value: ColumnType.Circle, text: "圆形" },
                    { value: ColumnType.Rect, text: "方形" },
                    { value: ColumnType.Custom, text: "自定义" },
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
        return '直';
    }
    else if (componentType === ComponentType.CircularStair) {
        return '旋';
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
    handrail: {
        support: true,
        height: 500,
        rail: {
            type: RailType.Circle,
            param: { radius: 50 },
        },
        column: {
            type: ColumnType.Circle,
            step: 500,
            param: { radius: 50 },
        },
    },
    stepProportional: true,
    widthProportional: true,
};
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
/* harmony export */   parseLineSeg3d: () => (/* binding */ parseLineSeg3d),
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
    value += `pl=${param.platformLength}${_types__WEBPACK_IMPORTED_MODULE_0__.Delimiter}`;
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
    value += `${start.x}${_types__WEBPACK_IMPORTED_MODULE_0__.CoordDelimiter}`;
    value += `${start.y}${_types__WEBPACK_IMPORTED_MODULE_0__.CoordDelimiter}`;
    value += `${start.z}${_types__WEBPACK_IMPORTED_MODULE_0__.Delimiter}`;
    value += `${end.x}${_types__WEBPACK_IMPORTED_MODULE_0__.CoordDelimiter}`;
    value += `${end.y}${_types__WEBPACK_IMPORTED_MODULE_0__.CoordDelimiter}`;
    value += `${end.z}`;
    return value;
}
function parseLineSeg3d(value) {
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
function parseStartEnd(value) {
    const items = value.split(_types__WEBPACK_IMPORTED_MODULE_0__.Delimiter);
    if (items.length === 2) {
        const startKeyValue = items[0].split(_types__WEBPACK_IMPORTED_MODULE_0__.CoordDelimiter);
        const endKeyValue = items[1].split(_types__WEBPACK_IMPORTED_MODULE_0__.CoordDelimiter);
        if (startKeyValue.length === 3 && endKeyValue.length === 3) {
            const start = GeomLib.createPoint3d(parseFloat(startKeyValue[0]), parseFloat(startKeyValue[1]), 0);
            const end = GeomLib.createPoint3d(parseFloat(endKeyValue[0]), parseFloat(endKeyValue[1]), 0);
            return { start, end, startHeight: parseFloat(startKeyValue[2]), endHeight: parseFloat(endKeyValue[2]) };
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
    MessageType["DrawStairViewMounted"] = "drawStairViewMounted";
    MessageType["StairParamChangedByInput"] = "stairParamChangedByInput";
    MessageType["ParamChangedByInput"] = "paramChangedByInput";
    MessageType["ParamChangedByDraw"] = "paramChangedByDraw";
    MessageType["ComponentAdded"] = "componentAdded";
    MessageType["DrawStairModelSettled"] = "drawStairModelSettled";
    MessageType["PropertiesVisible"] = "propertiesVisible";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksMENBQTBDLHFCQUFxQixpQkFBaUIsMEJBQTBCLFdBQVcsV0FBVztBQUM1STtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsZUFBZTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksMkJBQTJCLHFCQUFxQixpQkFBaUIsMEJBQTBCLFdBQVcsV0FBVztBQUM3SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGVBQWU7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDTztBQUNQLDhCQUE4Qiw2Q0FBUztBQUN2QztBQUNBLDZDQUE2QyxrREFBYztBQUMzRCwyQ0FBMkMsa0RBQWM7QUFDekQ7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQSxnQkFBZ0IsUUFBUSxFQUFFLGtEQUFjLENBQUM7QUFDekMsZ0JBQWdCLFFBQVEsRUFBRSxrREFBYyxDQUFDO0FBQ3pDLGdCQUFnQixRQUFRO0FBQ3hCO0FBQ0E7QUFDTztBQUNQLDhCQUE4QixrREFBYztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMxSU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsa0NBQWtDOzs7Ozs7O1VDZG5DO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvLi9zcmMvbWFpbi9tYWluLnRzIiwid2VicGFjazovL2RyYXctc3RhaXJzLy4vc3JjL21haW4vdG9vbHMvRHJhd1N0YWlyc1Rvb2wvY29uc3RzLnRzIiwid2VicGFjazovL2RyYXctc3RhaXJzLy4vc3JjL21haW4vdG9vbHMvRHJhd1N0YWlyc1Rvb2wvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvLi9zcmMvbWFpbi90b29scy9EcmF3U3RhaXJzVG9vbC9tZXNoVXRpbHMudHMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvLi9zcmMvbWFpbi90b29scy9EcmF3U3RhaXJzVG9vbC90ZW1wTWVzaFV0aWxzLnRzIiwid2VicGFjazovL2RyYXctc3RhaXJzLy4vc3JjL21haW4vdG9vbHMvRHJhd1N0YWlyc1Rvb2wvdHlwZXMudHMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvLi9zcmMvbWFpbi90b29scy9EcmF3U3RhaXJzVG9vbC91dGlscy50cyIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy8uL3NyYy9tYWluL3R5cGVzLnRzIiwid2VicGFjazovL2RyYXctc3RhaXJzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2RyYXctc3RhaXJzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2RyYXctc3RhaXJzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgZHJhd1N0YWlyc1Rvb2wgfSBmcm9tIFwiLi90b29scy9EcmF3U3RhaXJzVG9vbC9pbmRleFwiO1xuaW1wb3J0IHsgaXNLR3JvdXBJbnN0YW5jZSB9IGZyb20gXCIuL3Rvb2xzL0RyYXdTdGFpcnNUb29sL3V0aWxzXCI7XG5pbXBvcnQgeyBNZXNzYWdlVHlwZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5jb25zdCBwbHVnaW5VSSA9IGFwcC5nZXRQbHVnaW5VSSgpO1xucGx1Z2luVUkucmVzaXplKDM2MCwgNzAwKTtcbnBsdWdpblVJLm1vdW50KCk7XG5sZXQgYWN0aXZhdGVkQ3VzdG9tVG9vbDtcbmZ1bmN0aW9uIG9uVUlNZXNzYWdlKGRhdGEpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKGRhdGEudHlwZSA9PT0gTWVzc2FnZVR5cGUuRHJhd1N0YWlyVmlld01vdW50ZWQpIHtcbiAgICAgICAgICAgICAgICBvblBsdWdpblN0YXJ0VXAoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gTWVzc2FnZVR5cGUuQWN0aXZhdGVEcmF3U3RhaXJzVG9vbCkge1xuICAgICAgICAgICAgICAgIC8vIGlmIChkYXRhLnR5cGUgPT09ICdhY3RpdmF0ZVN0cmFpZ2h0U3RhaXJzVG9vbCcgfHwgZGF0YS50eXBlID09PSAnYWN0aXZhdGVDaXJjdWxhclN0YWlyc1Rvb2wnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFjdGl2YXRlZEN1c3RvbVRvb2wgIT09IGRyYXdTdGFpcnNUb29sKSB7XG4gICAgICAgICAgICAgICAgICAgIGFwcC5hY3RpdmF0ZUN1c3RvbVRvb2woZHJhd1N0YWlyc1Rvb2wsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmF0ZWRDdXN0b21Ub29sID0gZHJhd1N0YWlyc1Rvb2w7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGRyYXdTdGFpcnNUb29sLmNoYW5nZUNvbXBvbmVudFR5cGUoZGF0YS5jb21wb25lbnRUeXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gTWVzc2FnZVR5cGUuRGVBY3RpdmF0ZURyYXdTdGFpcnNUb29sKSB7XG4gICAgICAgICAgICAgICAgLy8gfSBlbHNlIGlmIChkYXRhLnR5cGUgPT09ICdkZUFjdGl2YXRlU3RyYWlnaHRTdGFpcnNUb29sJyB8fCBkYXRhLnR5cGUgPT09ICdkZUFjdGl2YXRlQ2lyY3VsYXJTdGFpcnNUb29sJykge1xuICAgICAgICAgICAgICAgIGRlQWN0aXZhdGVEcmF3U3RhaXJzVG9vbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSBNZXNzYWdlVHlwZS5TdGFpclBhcmFtQ2hhbmdlZEJ5SW5wdXQpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiAoYWN0aXZhdGVkQ3VzdG9tVG9vbCA9PT0gZHJhd1N0YWlyc1Rvb2wpIHtcbiAgICAgICAgICAgICAgICBkcmF3U3RhaXJzVG9vbC5jaGFuZ2VTdGFpclBhcmFtKGRhdGEuc3RhaXJQYXJhbSwgZGF0YS5jaGFuZ2VQYXJhbXMpO1xuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gTWVzc2FnZVR5cGUuUGFyYW1DaGFuZ2VkQnlJbnB1dCkge1xuICAgICAgICAgICAgICAgIC8vIGlmIChhY3RpdmF0ZWRDdXN0b21Ub29sID09PSBkcmF3U3RhaXJzVG9vbCkge1xuICAgICAgICAgICAgICAgIGRyYXdTdGFpcnNUb29sLmNoYW5nZUNvbXBvbmVudFBhcmFtKGRhdGEuY29tcG9uZW50UGFyYW0sIGRhdGEuY2hhbmdlUGFyYW1zKTtcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09IE1lc3NhZ2VUeXBlLkZvY3VzQ29tcG9uZW50SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiAoYWN0aXZhdGVkQ3VzdG9tVG9vbCA9PT0gZHJhd1N0YWlyc1Rvb2wpIHtcbiAgICAgICAgICAgICAgICBkcmF3U3RhaXJzVG9vbC5mb2N1c0NvbXBvbmVudChkYXRhLmNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09IE1lc3NhZ2VUeXBlLlJlbW92ZUNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIC8vIGlmIChhY3RpdmF0ZWRDdXN0b21Ub29sID09PSBkcmF3U3RhaXJzVG9vbCkge1xuICAgICAgICAgICAgICAgIGRyYXdTdGFpcnNUb29sLnJlbW92ZUNvbXBvbmVudChkYXRhLmNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIGNsb3NlUGx1Z2luKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkZUFjdGl2YXRlRHJhd1N0YWlyc1Rvb2woKSB7XG4gICAgYWN0aXZhdGVkQ3VzdG9tVG9vbCA9IHVuZGVmaW5lZDtcbiAgICBhcHAuZGVhY3RpdmF0ZUN1c3RvbVRvb2woZHJhd1N0YWlyc1Rvb2wsIGZhbHNlKTtcbn1cbnBsdWdpblVJLm9uTWVzc2FnZShvblVJTWVzc2FnZSk7XG5jb25zdCBzZWxlY3Rpb24gPSBhcHAuZ2V0U2VsZWN0aW9uKCk7XG5zZWxlY3Rpb24uYWRkT2JzZXJ2ZXIoe1xuICAgIG9uU2VsZWN0aW9uQ2hhbmdlOiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFsbEVudGl0aWVzID0gc2VsZWN0aW9uLmdldEFsbEVudGl0aWVzKCk7XG4gICAgICAgIGlmIChhbGxFbnRpdGllcy5sZW5ndGggPT09IDEgJiYgaXNLR3JvdXBJbnN0YW5jZShhbGxFbnRpdGllc1swXSkpIHtcbiAgICAgICAgICAgIGRyYXdTdGFpcnNUb29sLmNsZWFyVGVtcFNoYXBlcygpO1xuICAgICAgICAgICAgZHJhd1N0YWlyc1Rvb2wuc2V0TW9kZWwoYWxsRW50aXRpZXNbMF0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFsbEVudGl0aWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgZWRpdFBhdGggPSBhcHAuZ2V0QWN0aXZlRGVzaWduKCkuZ2V0RWRpdFBhdGgoKTtcbiAgICAgICAgICAgIGNvbnN0IGVkaXRNb2RlbCA9IGRyYXdTdGFpcnNUb29sLmdldEVkaXRNb2RlbCgpO1xuICAgICAgICAgICAgaWYgKCFlZGl0TW9kZWwgfHwgKGVkaXRQYXRoLmV2ZXJ5KGluc3RhbmNlID0+IGluc3RhbmNlLmdldEtleSgpICE9PSBlZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlS2V5ICYmIFsuLi5lZGl0TW9kZWwuY2hpbGQudmFsdWVzKCldLmV2ZXJ5KGNvbXAgPT4gY29tcC5pbnN0YW5jZUtleSAhPT0gaW5zdGFuY2UuZ2V0S2V5KCkpKSkpIHtcbiAgICAgICAgICAgICAgICBkcmF3U3RhaXJzVG9vbC5jbGVhclRlbXBTaGFwZXMoKTtcbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZhdGVkQ3VzdG9tVG9vbCAhPT0gZHJhd1N0YWlyc1Rvb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5Qcm9wZXJ0aWVzVmlzaWJsZSwgcHJvcGVydGllc1Zpc2libGU6IGZhbHNlIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7XG5mdW5jdGlvbiBvblBsdWdpblN0YXJ0VXAoKSB7XG4gICAgY29uc3QgYWxsRW50aXRpZXMgPSBzZWxlY3Rpb24uZ2V0QWxsRW50aXRpZXMoKTtcbiAgICBpZiAoYWxsRW50aXRpZXMubGVuZ3RoID09PSAxICYmIGlzS0dyb3VwSW5zdGFuY2UoYWxsRW50aXRpZXNbMF0pKSB7XG4gICAgICAgIGRyYXdTdGFpcnNUb29sLnNldE1vZGVsKGFsbEVudGl0aWVzWzBdKTtcbiAgICB9XG4gICAgYXBwLmFkZE9ic2VydmVyKHtcbiAgICAgICAgb25QbHVnaW5DbG9zZWQ6ICgpID0+IHtcbiAgICAgICAgfSxcbiAgICAgICAgb25Nb2RlbENoYW5nZWQsXG4gICAgfSk7XG59XG5mdW5jdGlvbiBvbk1vZGVsQ2hhbmdlZChjaGFuZ2VzKSB7XG4gICAgY29uc3QgZGVsZXRlZCA9IGNoYW5nZXMuZGVsZXRlZDtcbiAgICBjb25zdCBlZGl0TW9kZWwgPSBkcmF3U3RhaXJzVG9vbC5nZXRFZGl0TW9kZWwoKTtcbiAgICBpZiAoKGRlbGV0ZWQgPT09IG51bGwgfHwgZGVsZXRlZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGVsZXRlZC5sZW5ndGgpICYmIGVkaXRNb2RlbCkge1xuICAgICAgICBpZiAoZGVsZXRlZC5zb21lKGRlbGV0ZUdyb3VwID0+IGVkaXRNb2RlbC5wYXJlbnQuZGVmaW5pdGlvbktleSA9PT0gZGVsZXRlR3JvdXAuZ2V0S2V5KCkpKSB7XG4gICAgICAgICAgICBkcmF3U3RhaXJzVG9vbC5jbGVhckVkaXRNb2RlbCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRGVmYXVsdENvbXBvbmVudFBhcmFtIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmV4cG9ydCBjb25zdCBkdW1teU1hdHJpeDQgPSBHZW9tTGliLmNyZWF0ZUlkZW50aXR5TWF0cml4NCgpO1xuZXhwb3J0IGNvbnN0IGR1bW15VmVjdG9yM2QgPSBHZW9tTGliLmNyZWF0ZVZlY3RvcjNkKDAsIDAsIDEpO1xuZXhwb3J0IGNvbnN0IGR1bW15UG9pbnQzZCA9IEdlb21MaWIuY3JlYXRlUG9pbnQzZCgwLCAwLCAwKTtcbmV4cG9ydCBjb25zdCBEaXJlY3Rpb25aID0gR2VvbUxpYi5jcmVhdGVWZWN0b3IzZCgwLCAwLCAxKTtcbi8vIGNvbnN0IEhlaWdodFRvbGVyYW5jZTogbnVtYmVyID0gNTtcbmV4cG9ydCBjb25zdCBMZW5ndGhUb2xlcmFuY2UgPSAxMDtcbmV4cG9ydCBjb25zdCBEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSA9IE1hdGguUEkgLyAzNjtcbmV4cG9ydCBjb25zdCBBbmdsZVRvbGVyYW5jZSA9IE1hdGguUEkgLyAxODA7XG5leHBvcnQgY29uc3QgU3RlcENvdW50TGltaXQgPSA4MDtcbi8vIGNvbnN0IERlZmF1bHRCb2FyZFRoaWNrbmVzcyA9IDUwO1xuZXhwb3J0IGZ1bmN0aW9uIGdldEVtcHR5U2VnbWVudCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGFydDogZHVtbXlQb2ludDNkLFxuICAgICAgICBlbmQ6IGR1bW15UG9pbnQzZCxcbiAgICAgICAgc3RhcnRMb2NrZWQ6IGZhbHNlLFxuICAgICAgICBlbmRMb2NrZWQ6IGZhbHNlLFxuICAgICAgICBzdGFydEhlaWdodDogMCxcbiAgICAgICAgZW5kSGVpZ2h0OiAwLFxuICAgICAgICBzdGFpclNoYXBlOiB7XG4gICAgICAgICAgICBzdGVwQ291bnQ6IDAsXG4gICAgICAgICAgICB2ZXJ0aWNlczogW10sXG4gICAgICAgICAgICB0ZW1wTGluZXM6IFtdLFxuICAgICAgICB9LFxuICAgICAgICBtb2xkU2hhcGU6IHtcbiAgICAgICAgICAgIHN0ZXBDb3VudDogMCxcbiAgICAgICAgICAgIHZlcnRpY2VzOiBbXSxcbiAgICAgICAgICAgIHRlbXBMaW5lczogW10sXG4gICAgICAgIH0sXG4gICAgICAgIGNvcm5lclNoYXBlOiB7XG4gICAgICAgICAgICBzdGVwQ291bnQ6IDAsXG4gICAgICAgICAgICB2ZXJ0aWNlczogW10sXG4gICAgICAgICAgICB0ZW1wTGluZXM6IFtdLFxuICAgICAgICB9LFxuICAgICAgICBjb3JuZXJNb2xkU2hhcGU6IHtcbiAgICAgICAgICAgIHN0ZXBDb3VudDogMCxcbiAgICAgICAgICAgIHZlcnRpY2VzOiBbXSxcbiAgICAgICAgICAgIHRlbXBMaW5lczogW10sXG4gICAgICAgIH0sXG4gICAgICAgIHBhcmFtOiBPYmplY3QuYXNzaWduKHt9LCBEZWZhdWx0Q29tcG9uZW50UGFyYW0pLFxuICAgIH07XG59XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCB7IENvbXBvbmVudFR5cGUsIFBhcmFtS2V5LCBTdGFydEVuZEtleSwgQmFzZUxpbmVTZWczZEtleSwgU3RhaXJNb2RlbEtleSwgU3RhaXJNb2RlbFZhbHVlLCBDaXJjbGVUYW5nZW50S2V5LCBEZWZhdWx0U3RhaXJQYXJhbSB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZVNoYXBlIH0gZnJvbSBcIi4vdGVtcE1lc2hVdGlsc1wiO1xuaW1wb3J0IHsgYnVpbGRDb21wb25lbnRJbnN0YW5jZSwgZ2VuZXJhdGVNZXNoZXMgfSBmcm9tIFwiLi9tZXNoVXRpbHNcIjtcbmltcG9ydCB7IHBhcnNlTGluZVNlZzNkLCBwYXJzZVBhcmFtLCBwYXJzZVN0YXJ0RW5kLCBwYXJzZVZlY3RvcjNkIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCB7IGdldEVtcHR5U2VnbWVudCB9IGZyb20gXCIuL2NvbnN0c1wiO1xuaW1wb3J0IHsgZGVBY3RpdmF0ZURyYXdTdGFpcnNUb29sIH0gZnJvbSBcIi4uLy4uLy4uL21haW4vbWFpblwiO1xuaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vbWFpbi90eXBlc1wiO1xuY29uc3QgZGVzaWduID0gYXBwLmdldEFjdGl2ZURlc2lnbigpO1xuY29uc3Qgc2VsZWN0aW9uID0gYXBwLmdldFNlbGVjdGlvbigpO1xuY29uc3QgcGx1Z2luVUkgPSBhcHAuZ2V0UGx1Z2luVUkoKTtcbmNvbnN0IGFwcFZpZXcgPSBhcHAuZ2V0QWN0aXZlVmlldygpO1xuY29uc3QgdG9vbEhlbHBlciA9IGFwcC5nZXRUb29sSGVscGVyKCk7XG5jb25zdCBEZWZhdWx0Rm9jdXNlZENvbXBvbmVudEluZGV4ID0gLTE7XG5leHBvcnQgY2xhc3MgRHJhd1N0YWlyc1Rvb2wge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvLyBwcml2YXRlIGNvbXBvbmVudFBhcmFtOiBDb21wb25lbnRQYXJhbSA9IHsgLi4uRGVmYXVsdENvbXBvbmVudFBhcmFtIH07XG4gICAgICAgIHRoaXMuZHJhd2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCA9IERlZmF1bHRGb2N1c2VkQ29tcG9uZW50SW5kZXg7XG4gICAgICAgIHRoaXMuc2VnbWVudHMgPSBbXTtcbiAgICB9XG4gICAgb25Ub29sQWN0aXZlKCkge1xuICAgICAgICB0b29sSGVscGVyLnNldEV4Y2x1ZGVJbmZlcmVuY2VUeXBlcyhbXG4gICAgICAgICAgICBLRW50aXR5VHlwZS5GYWNlLCBLRW50aXR5VHlwZS5FZGdlLCBLRW50aXR5VHlwZS5BdXhpbGlhcnlCb3VuZGVkQ3VydmUsIEtFbnRpdHlUeXBlLkF1eGlsaWFyeUxpbmUsIEtFbnRpdHlUeXBlLkF1eGlsaWFyeVZlcnRleCxcbiAgICAgICAgICAgIEtFbnRpdHlUeXBlLkdyb3VwSW5zdGFuY2UsIEtFbnRpdHlUeXBlLlZlcnRleCwgS0FyY2hGYWNlVHlwZS5Ob25QbGFuYXIsIEtBcmNoRmFjZVR5cGUuUGxhbmFyLFxuICAgICAgICBdKTtcbiAgICAgICAgY29uc3QgZmlyc3RTZWdtZW50ID0gZ2V0RW1wdHlTZWdtZW50KCk7XG4gICAgICAgIGZpcnN0U2VnbWVudC5zdGFydExvY2tlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN0YWlyUGFyYW0gPSBEZWZhdWx0U3RhaXJQYXJhbTtcbiAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5EcmF3U3RhaXJNb2RlbFNldHRsZWQsIGNvbXBvbmVudFBhcmFtczogW2ZpcnN0U2VnbWVudC5wYXJhbV0sIHN0YWlyUGFyYW06IHRoaXMuc3RhaXJQYXJhbSwgbmV3U3RhaXI6IHRydWUgfSwgJyonKTtcbiAgICAgICAgdGhpcy5zZWdtZW50cyA9IFtmaXJzdFNlZ21lbnRdO1xuICAgICAgICB0aGlzLmRyYXdpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmNsZWFyVGVtcFNoYXBlcygpO1xuICAgICAgICB0aGlzLmVkaXRNb2RlbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggPSAwO1xuICAgIH1cbiAgICBvblRvb2xEZWFjdGl2ZSgpIHtcbiAgICAgICAgdG9vbEhlbHBlci5zZXRFeGNsdWRlSW5mZXJlbmNlVHlwZXMoW10pO1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgIGlmICh0aGlzLmVkaXRNb2RlbCkge1xuICAgICAgICAgICAgc2VsZWN0aW9uLmFkZChbdGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLkxlYXZlRHJhd1N0YWlyc1Rvb2wgfSwgJyonKTtcbiAgICAgICAgfVxuICAgICAgICBkZUFjdGl2YXRlRHJhd1N0YWlyc1Rvb2woKTtcbiAgICB9XG4gICAgb25Nb3VzZU1vdmUoZXZlbnQsIGluZmVyZW5jZVJlc3VsdCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnb25Nb3VzZU1vdmUnKTtcbiAgICAgICAgaWYgKGluZmVyZW5jZVJlc3VsdCkge1xuICAgICAgICAgICAgLy8gY29uc3QgeyBzdGFydFdpZHRoLCBlbmRXaWR0aCwgcGxhdGZvcm1UaGlja25lc3MgfSA9IHRoaXMuY29tcG9uZW50UGFyYW07XG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IGluZmVyZW5jZVJlc3VsdC5wb3NpdGlvbjtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RTZWdtZW50ID0gdGhpcy5zZWdtZW50c1t0aGlzLnNlZ21lbnRzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdsYXN0U2VnbWVudC5zdGFydExvY2tlZCcsIGxhc3RTZWdtZW50LnN0YXJ0TG9ja2VkKTtcbiAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5wYXJhbS5tb2RlbEVkaXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAobGFzdFNlZ21lbnQuc3RhcnRMb2NrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuZW5kID0gcG9zaXRpb247XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBDb21wb25lbnQobGFzdFNlZ21lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VnbWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJldlNlZ21lbnQgPSB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCA9PT0gbGFzdFNlZ21lbnQucGFyYW0uaW5kZXggPyB0aGlzLnNlZ21lbnRzW3RoaXMuc2VnbWVudHMubGVuZ3RoIC0gMl0gOiB0aGlzLnNlZ21lbnRzLmZpbmQoc2VnID0+IHNlZy5wYXJhbS5pbmRleCA9PT0gdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbXVzdCBiZSB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHByZXZTZWdtZW50ID09PSBudWxsIHx8IHByZXZTZWdtZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwcmV2U2VnbWVudC5wYXJhbS50eXBlKSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgbW9sZFNoYXBlOiB7IHZlcnRpY2VzLCB0ZW1wTGluZXMgfSB9ID0gcHJldlNlZ21lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNsb3Nlc3RQb2ludDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWluRGlzdGFuY2UgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5mb3JFYWNoKGxpbmUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsaW5lU2VnM2QgPSBHZW9tTGliLmNyZWF0ZUxpbmVTZWdtZW50M2QodmVydGljZXNbbGluZVswXV0sIHZlcnRpY2VzW2xpbmVbMV1dKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlUG9pbnQgPSBsaW5lU2VnM2QuZ2V0Q2xvc2VzdFBvaW50KHBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyRGlzdGFuY2UgPSB0aGVQb2ludC5kaXN0YW5jZVRvKHBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjbG9zZXN0UG9pbnQgfHwgY3VyRGlzdGFuY2UgPCBtaW5EaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluRGlzdGFuY2UgPSBjdXJEaXN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RQb2ludCA9IHRoZVBvaW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuc3RhcnQgPSBjbG9zZXN0UG9pbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5iYXNlTGluZVNlZzNkID0geyBzdGFydDogdmVydGljZXNbbGluZVswXV0sIGVuZDogdmVydGljZXNbbGluZVsxXV0gfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1BpY2tTdGFydFRlbXBTaGFwZXMocG9zaXRpb24sIGxhc3RTZWdtZW50LnN0YXJ0LCBsYXN0U2VnbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5zdGFydCA9IHBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChsYXN0U2VnbWVudC5wYXJhbS50eXBlID09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gJiYgIWxhc3RTZWdtZW50LnBhcmFtLnBsYXRmb3JtTGVuZ3RoTG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuUGFyYW1DaGFuZ2VkQnlEcmF3LCBjb21wb25lbnRQYXJhbTogT2JqZWN0LmFzc2lnbih7fSwgbGFzdFNlZ21lbnQucGFyYW0pIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIG9uTEJ1dHRvblVwKGV2ZW50LCBpbmZlcmVuY2VSZXN1bHQpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ29uTEJ1dHRvblVwJyk7XG4gICAgICAgIGlmIChpbmZlcmVuY2VSZXN1bHQpIHtcbiAgICAgICAgICAgIC8vIGNvbnN0IHBvc2l0aW9uID0gaW5mZXJlbmNlUmVzdWx0LnBvc2l0aW9uO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VnbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdFNlZ21lbnQgPSB0aGlzLnNlZ21lbnRzW3RoaXMuc2VnbWVudHMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgaWYgKGxhc3RTZWdtZW50LnN0YXJ0TG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwdXNoIHNlZ21lbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBzdGFydCwgZW5kLCBwYXJhbTogeyB0eXBlIH0sIGNpcmNsZVRhbmdlbnQgfSA9IGxhc3RTZWdtZW50O1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5DaXJjdWxhclN0YWlyICYmICFjaXJjbGVUYW5nZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5jaXJjbGVUYW5nZW50ID0gZW5kLnN1YnRyYWN0ZWQoc3RhcnQpLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LmVuZExvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0UGFyYW0gPSBsYXN0U2VnbWVudC5wYXJhbTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRTZWdtZW50ID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBnZXRFbXB0eVNlZ21lbnQoKSksIHsgc3RhcnQ6IGxhc3RTZWdtZW50LmVuZCwgZW5kOiBsYXN0U2VnbWVudC5lbmQsIHN0YXJ0TG9ja2VkOiBsYXN0UGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSA/IGZhbHNlIDogdHJ1ZSwgc3RhcnRIZWlnaHQ6IGxhc3RTZWdtZW50LmVuZEhlaWdodCwgZW5kSGVpZ2h0OiBsYXN0U2VnbWVudC5lbmRIZWlnaHQsIHBhcmFtOiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGxhc3RQYXJhbSksIHsgaW5kZXg6IGxhc3RQYXJhbS5pbmRleCArIDEsIHN0YXJ0V2lkdGg6IGxhc3RQYXJhbS5lbmRXaWR0aCwgb2Zmc2V0V2lkdGg6IDAsIHR5cGU6IGxhc3RQYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtID8gQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyIDogQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSwgcGxhdGZvcm1MZW5ndGhMb2NrZWQ6IGZhbHNlIH0pIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBtb2xkU2hhcGU6IHsgdmVydGljZXMgfSB9ID0gbGFzdFNlZ21lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWxhc3RTZWdtZW50LmJhc2VMaW5lU2VnM2QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5iYXNlTGluZVNlZzNkID0geyBzdGFydDogdmVydGljZXNbMF0sIGVuZDogdmVydGljZXNbMV0gfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTZWdtZW50LmJhc2VMaW5lU2VnM2QgPSB7IHN0YXJ0OiB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXSwgZW5kOiB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFBhcmFtLm1vZGVsRWRpdGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlBhcmFtQ2hhbmdlZEJ5RHJhdywgY29tcG9uZW50UGFyYW06IGxhc3RQYXJhbSB9LCAnKicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWdtZW50cy5wdXNoKG5leHRTZWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCAhPT0gbGFzdFBhcmFtLmluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9jdXNlZFNlZ21lbnQgPSB0aGlzLnNlZ21lbnRzLmZpbmQoc2VnID0+IHNlZy5wYXJhbS5pbmRleCA9PT0gdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb2N1c2VkU2VnbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdUZW1wQ29tcG9uZW50KGZvY3VzZWRTZWdtZW50LCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggPSBuZXh0U2VnbWVudC5wYXJhbS5pbmRleDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuQ29tcG9uZW50QWRkZWQsIGNvbXBvbmVudFBhcmFtOiBPYmplY3QuYXNzaWduKHt9LCBuZXh0U2VnbWVudC5wYXJhbSkgfSwgJyonKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuc3RhcnRMb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyUGlja1N0YXJ0VGVtcFNoYXBlcyhsYXN0U2VnbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBDb21wb25lbnQobGFzdFNlZ21lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBkcmF3UGlja1N0YXJ0VGVtcFNoYXBlcyhwb3NpdGlvbiwgY2xvc2VzdFBvaW50LCB0aGVTZWdtZW50KSB7XG4gICAgICAgIGlmICh0aGVTZWdtZW50LnBpY2tTdGFydFRlbXBTaGFwZUlkKSB7XG4gICAgICAgICAgICBhcHBWaWV3LmNsZWFyVGVtcG9yYXJ5U2hhcGVzQnlJZHMoW3RoZVNlZ21lbnQucGlja1N0YXJ0VGVtcFNoYXBlSWRdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2xvc2VzdFBvaW50KSB7XG4gICAgICAgICAgICBjb25zdCBwaWNrU3RhcnRUZW1wU2hhcGVJZCA9IGFwcFZpZXcuZHJhd0xpbmVzKFtwb3NpdGlvbiwgY2xvc2VzdFBvaW50XSwgeyBjb2xvcjogeyByOiAwLCBnOiAwLCBiOiAyNTUgfSwgZGVwdGhUZXN0OiB0cnVlLCBwYXR0ZXJuOiBLTGluZVBhdHRlcm4uRGFzaCwgZ2FwU2l6ZTogNTAsIGRhc2hTaXplOiA1MCB9KTtcbiAgICAgICAgICAgIGlmIChwaWNrU3RhcnRUZW1wU2hhcGVJZCA9PT0gbnVsbCB8fCBwaWNrU3RhcnRUZW1wU2hhcGVJZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGlja1N0YXJ0VGVtcFNoYXBlSWQuaWQpIHtcbiAgICAgICAgICAgICAgICB0aGVTZWdtZW50LnBpY2tTdGFydFRlbXBTaGFwZUlkID0gcGlja1N0YXJ0VGVtcFNoYXBlSWQuaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2xlYXJQaWNrU3RhcnRUZW1wU2hhcGVzKHRoZVNlZ21lbnQpIHtcbiAgICAgICAgaWYgKHRoZVNlZ21lbnQucGlja1N0YXJ0VGVtcFNoYXBlSWQpIHtcbiAgICAgICAgICAgIGFwcFZpZXcuY2xlYXJUZW1wb3JhcnlTaGFwZXNCeUlkcyhbdGhlU2VnbWVudC5waWNrU3RhcnRUZW1wU2hhcGVJZF0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRyYXdUZW1wQ29tcG9uZW50KHRoZVNlZ21lbnQsIGZvY3VzZWQgPSBmYWxzZSkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBpZiAodGhlU2VnbWVudC5zdGFydExvY2tlZCkge1xuICAgICAgICAgICAgZ2VuZXJhdGVTaGFwZSh0aGVTZWdtZW50LCB0aGlzLmRyYXdpbmcpO1xuICAgICAgICAgICAgY29uc3QgeyBzdGFpclNoYXBlOiB7IHZlcnRpY2VzOiBzdGFpclZlcnRpY2VzLCB0ZW1wTGluZXM6IHN0YWlyVGVtcExpbmVzIH0sIG1vbGRTaGFwZTogeyB2ZXJ0aWNlczogbW9sZFZlcnRpY2VzLCB0ZW1wTGluZXM6IG1vbGRUZW1wTGluZXMgfSwgY29ybmVyU2hhcGU6IHsgdmVydGljZXM6IGNvcm5lclZlcnRpY2VzLCB0ZW1wTGluZXM6IGNvcm5lclRlbXBMaW5lcyB9LCBjb3JuZXJNb2xkU2hhcGU6IHsgdmVydGljZXM6IGNvcm5lck1vbGRWZXJ0aWNlcywgdGVtcExpbmVzOiBjb3JuZXJNb2xkVGVtcExpbmVzIH0sIH0gPSB0aGVTZWdtZW50O1xuICAgICAgICAgICAgY29uc3QgdGVtcExpbmVQb2ludHMgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IG1vbGRUZW1wTGluZVBvaW50cyA9IFtdO1xuICAgICAgICAgICAgaWYgKHRoaXMuZHJhd2luZykge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgc3RhaXJUZW1wTGluZSBvZiBzdGFpclRlbXBMaW5lcykge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZVBvaW50cy5wdXNoKFtzdGFpclZlcnRpY2VzW3N0YWlyVGVtcExpbmVbMF1dLCBzdGFpclZlcnRpY2VzW3N0YWlyVGVtcExpbmVbMV1dXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgY29ybmVyVGVtcExpbmUgb2YgY29ybmVyVGVtcExpbmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lUG9pbnRzLnB1c2goW2Nvcm5lclZlcnRpY2VzW2Nvcm5lclRlbXBMaW5lWzBdXSwgY29ybmVyVmVydGljZXNbY29ybmVyVGVtcExpbmVbMV1dXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCBtb2xkVGVtcExpbmUgb2YgbW9sZFRlbXBMaW5lcykge1xuICAgICAgICAgICAgICAgIG1vbGRUZW1wTGluZVBvaW50cy5wdXNoKFttb2xkVmVydGljZXNbbW9sZFRlbXBMaW5lWzBdXSwgbW9sZFZlcnRpY2VzW21vbGRUZW1wTGluZVsxXV1dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgY29ybmVyTW9sZFRlbXBMaW5lIG9mIGNvcm5lck1vbGRUZW1wTGluZXMpIHtcbiAgICAgICAgICAgICAgICBtb2xkVGVtcExpbmVQb2ludHMucHVzaChbY29ybmVyTW9sZFZlcnRpY2VzW2Nvcm5lck1vbGRUZW1wTGluZVswXV0sIGNvcm5lck1vbGRWZXJ0aWNlc1tjb3JuZXJNb2xkVGVtcExpbmVbMV1dXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKF9hID0gdGhlU2VnbWVudC50ZW1wU2hhcGVJZCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGFwcFZpZXcuY2xlYXJUZW1wb3JhcnlTaGFwZXNCeUlkcyh0aGVTZWdtZW50LnRlbXBTaGFwZUlkKTtcbiAgICAgICAgICAgICAgICB0aGVTZWdtZW50LnRlbXBTaGFwZUlkID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBkcmF3VGVtcExpbmVzRnVuYyA9IGZvY3VzZWQgPyBhcHBWaWV3LmRyYXdGbGF0TGluZXMuYmluZChhcHBWaWV3KSA6IGFwcFZpZXcuZHJhd1BvbHlsaW5lcy5iaW5kKGFwcFZpZXcpO1xuICAgICAgICAgICAgaWYgKHRlbXBMaW5lUG9pbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIC8vIGNvbnN0IGNvbG9yVmFsdWUgPSBmb2N1c2VkID8gMjU1IDogMTU1O1xuICAgICAgICAgICAgICAgIGNvbnN0IHRlbXBTaGFwZUlkID0gZHJhd1RlbXBMaW5lc0Z1bmModGVtcExpbmVQb2ludHMsIHsgY29sb3I6IHsgcjogMjU1LCBnOiAwLCBiOiAwIH0sIGRlcHRoVGVzdDogZmFsc2UgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHRlbXBTaGFwZUlkID09PSBudWxsIHx8IHRlbXBTaGFwZUlkID09PSB2b2lkIDAgPyB2b2lkIDAgOiB0ZW1wU2hhcGVJZC5pZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhlU2VnbWVudC50ZW1wU2hhcGVJZCA9IFsuLi50ZW1wU2hhcGVJZC5pZHNdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtb2xkVGVtcExpbmVQb2ludHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbW9sZFRlbXBTaGFwZUlkID0gZHJhd1RlbXBMaW5lc0Z1bmMobW9sZFRlbXBMaW5lUG9pbnRzLCB7IGNvbG9yOiB7IHI6IDAsIGc6IDI1NSwgYjogMCB9LCBkZXB0aFRlc3Q6IHRoaXMuZHJhd2luZyB9KTtcbiAgICAgICAgICAgICAgICBpZiAobW9sZFRlbXBTaGFwZUlkID09PSBudWxsIHx8IG1vbGRUZW1wU2hhcGVJZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogbW9sZFRlbXBTaGFwZUlkLmlkcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKF9iID0gdGhlU2VnbWVudC50ZW1wU2hhcGVJZCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhlU2VnbWVudC50ZW1wU2hhcGVJZC5wdXNoKC4uLm1vbGRUZW1wU2hhcGVJZC5pZHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhlU2VnbWVudC50ZW1wU2hhcGVJZCA9IFsuLi5tb2xkVGVtcFNoYXBlSWQuaWRzXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjbGVhclRlbXBTaGFwZXModGhlU2VnbWVudCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICh0aGVTZWdtZW50KSB7XG4gICAgICAgICAgICBpZiAoKF9hID0gdGhlU2VnbWVudC50ZW1wU2hhcGVJZCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGFwcFZpZXcuY2xlYXJUZW1wb3JhcnlTaGFwZXNCeUlkcyh0aGVTZWdtZW50LnRlbXBTaGFwZUlkKTtcbiAgICAgICAgICAgICAgICB0aGVTZWdtZW50LnRlbXBTaGFwZUlkID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhcHBWaWV3LmNsZWFyVGVtcG9yYXJ5U2hhcGVzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9jdXNDb21wb25lbnQoY29tcG9uZW50SW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VnbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBsYXN0U2VnbWVudCA9IHRoaXMuc2VnbWVudHNbdGhpcy5zZWdtZW50cy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RTZWdtZW50SW5kZXggPSBsYXN0U2VnbWVudC5wYXJhbS5pbmRleDtcbiAgICAgICAgICAgIC8vIGlmIChjb21wb25lbnRJbmRleCAhPT0gdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXgpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0ZvY3VzZWRTZWdtZW50ID0gdGhpcy5zZWdtZW50cy5maW5kKHNlZyA9PiBzZWcucGFyYW0uaW5kZXggPT09IGNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgIGlmIChuZXdGb2N1c2VkU2VnbWVudCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYXdpbmcgJiYgIWxhc3RTZWdtZW50LmVuZExvY2tlZCAmJiBjb21wb25lbnRJbmRleCAhPT0gbGFzdFNlZ21lbnRJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHBhcmFtOiB7IHR5cGU6IG5ld0ZvY3VzZWRUeXBlIH0sIG1vbGRTaGFwZTogeyB2ZXJ0aWNlczogbmV3Rm9jdXNlZFZlcnRpY2VzLCB0ZW1wTGluZXM6IG5ld0ZvY3VzZWRUZW1wTGluZXMgfSB9ID0gbmV3Rm9jdXNlZFNlZ21lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgc3RhcnQgfSA9IGxhc3RTZWdtZW50O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyUGlja1N0YXJ0VGVtcFNoYXBlcyhsYXN0U2VnbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJUZW1wU2hhcGVzKGxhc3RTZWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0ZvY3VzZWRUeXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2xvc2VzdFBvaW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1pbkRpc3RhbmNlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0ZvY3VzZWRUZW1wTGluZXMuZm9yRWFjaChsaW5lID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsaW5lU2VnM2QgPSBHZW9tTGliLmNyZWF0ZUxpbmVTZWdtZW50M2QobmV3Rm9jdXNlZFZlcnRpY2VzW2xpbmVbMF1dLCBuZXdGb2N1c2VkVmVydGljZXNbbGluZVsxXV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoZVBvaW50ID0gbGluZVNlZzNkLmdldENsb3Nlc3RQb2ludChzdGFydCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyRGlzdGFuY2UgPSB0aGVQb2ludC5kaXN0YW5jZVRvKHN0YXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNsb3Nlc3RQb2ludCB8fCBjdXJEaXN0YW5jZSA8IG1pbkRpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbkRpc3RhbmNlID0gY3VyRGlzdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RQb2ludCA9IHRoZVBvaW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5zdGFydCA9IGNsb3Nlc3RQb2ludDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuYmFzZUxpbmVTZWczZCA9IHsgc3RhcnQ6IG5ld0ZvY3VzZWRWZXJ0aWNlc1tsaW5lWzBdXSwgZW5kOiBuZXdGb2N1c2VkVmVydGljZXNbbGluZVsxXV0gfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LnN0YXJ0TG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5jaXJjbGVUYW5nZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3UGlja1N0YXJ0VGVtcFNoYXBlcyhzdGFydCwgbGFzdFNlZ21lbnQuc3RhcnQsIGxhc3RTZWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LnN0YXJ0ID0gbmV3Rm9jdXNlZFNlZ21lbnQuZW5kLmNsb25lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5zdGFydExvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5iYXNlTGluZVNlZzNkID0geyBzdGFydDogbmV3Rm9jdXNlZFZlcnRpY2VzW25ld0ZvY3VzZWRWZXJ0aWNlcy5sZW5ndGggLSAxXSwgZW5kOiBuZXdGb2N1c2VkVmVydGljZXNbbmV3Rm9jdXNlZFZlcnRpY2VzLmxlbmd0aCAtIDJdIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5jaXJjbGVUYW5nZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3VGVtcENvbXBvbmVudChsYXN0U2VnbWVudCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgodGhpcy5kcmF3aW5nICYmIGNvbXBvbmVudEluZGV4ICE9PSBsYXN0U2VnbWVudEluZGV4KSB8fCAhdGhpcy5kcmF3aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBDb21wb25lbnQobmV3Rm9jdXNlZFNlZ21lbnQsIHRoaXMuZHJhd2luZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgb2xkRm9jdXNlZFNlZ21lbnQgPSB0aGlzLnNlZ21lbnRzLmZpbmQoc2VnID0+IHNlZy5wYXJhbS5pbmRleCA9PT0gdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgaWYgKCgodGhpcy5kcmF3aW5nICYmIHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4ICE9PSBsYXN0U2VnbWVudEluZGV4KSB8fCAoIXRoaXMuZHJhd2luZyAmJiB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCAhPT0gY29tcG9uZW50SW5kZXgpKSAmJiBvbGRGb2N1c2VkU2VnbWVudCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYXdpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3VGVtcENvbXBvbmVudChvbGRGb2N1c2VkU2VnbWVudCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhclRlbXBTaGFwZXMob2xkRm9jdXNlZFNlZ21lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4ID0gY29tcG9uZW50SW5kZXg7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVtb3ZlQ29tcG9uZW50KGNvbXBvbmVudEluZGV4KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKHRoaXMuc2VnbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCB0aGVJbmRleCA9IHRoaXMuc2VnbWVudHMuZmluZEluZGV4KHNlZyA9PiBzZWcucGFyYW0uaW5kZXggPT09IGNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgIGlmICh0aGVJbmRleCA+IC0xKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGhlU2VnbWVudCA9IHRoaXMuc2VnbWVudHNbdGhlSW5kZXhdO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYXdpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChfYSA9IHRoZVNlZ21lbnQudGVtcFNoYXBlSWQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcFZpZXcuY2xlYXJUZW1wb3JhcnlTaGFwZXNCeUlkcyh0aGVTZWdtZW50LnRlbXBTaGFwZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmVkaXRNb2RlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVJbnN0YW5jZSA9IHRoaXMuZWRpdE1vZGVsLmNoaWxkLmdldChjb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGVJbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZWwuY2hpbGQuZGVsZXRlKGNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2lnbi5yZW1vdmVHcm91cEluc3RhbmNlKHRoZUluc3RhbmNlLmluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNlZ21lbnRzLnNwbGljZSh0aGVJbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VnbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCA9PT0gY29tcG9uZW50SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4ID0gdGhpcy5zZWdtZW50c1t0aGlzLnNlZ21lbnRzLmxlbmd0aCAtIDFdLnBhcmFtLmluZGV4O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjaGFuZ2VTdGFpclBhcmFtKHN0YWlyUGFyYW0sIGNoYW5nZVBhcmFtcykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdGhpcy5zdGFpclBhcmFtID0gc3RhaXJQYXJhbTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNoYW5nZUNvbXBvbmVudFBhcmFtKGNvbXBvbmVudFBhcmFtLCBjaGFuZ2VQYXJhbXMpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnNlZ21lbnRzLmxlbmd0aClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjb25zdCB0aGVTZWdtZW50ID0gdGhpcy5zZWdtZW50cy5maW5kKHNlZyA9PiBzZWcucGFyYW0uaW5kZXggPT09IGNvbXBvbmVudFBhcmFtLmluZGV4KTtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RTZWdtZW50ID0gdGhpcy5zZWdtZW50c1t0aGlzLnNlZ21lbnRzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgaWYgKHRoZVNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IHBhcmFtOiB7IGluZGV4IH0gfSA9IHRoZVNlZ21lbnQ7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50UGFyYW0ubW9kZWxFZGl0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGVTZWdtZW50LnBhcmFtID0gY29tcG9uZW50UGFyYW07XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZHJhd2luZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdUZW1wQ29tcG9uZW50KHRoZVNlZ21lbnQsIHRoZVNlZ21lbnQucGFyYW0uaW5kZXggIT09IGxhc3RTZWdtZW50LnBhcmFtLmluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5lZGl0TW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc2VsZWN0aW9uLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoZUluc3RhbmNlID0gdGhpcy5lZGl0TW9kZWwuY2hpbGQuZ2V0KGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoZUluc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZVNoYXBlKHRoZVNlZ21lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlTWVzaGVzID0gZ2VuZXJhdGVNZXNoZXMoW3RoZVNlZ21lbnRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGVNZXNoZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzaWduLnN0YXJ0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wZXJhdGlvblN1Y2Nlc3MgPSAoeWllbGQgZGVzaWduLmFjdGl2YXRlR3JvdXBJbnN0YW5jZSh0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2UpKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZGVzaWduLnJlbW92ZUdyb3VwSW5zdGFuY2UodGhlSW5zdGFuY2UuaW5zdGFuY2UpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0luc3RhbmNlID0gYnVpbGRDb21wb25lbnRJbnN0YW5jZSh0aGVTZWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICEhbmV3SW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3SW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlbC5jaGlsZC5zZXQoaW5kZXgsIHsgaW5zdGFuY2U6IG5ld0luc3RhbmNlLCBkZWZpbml0aW9uS2V5OiAoKF9hID0gbmV3SW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5nZXRLZXkoKSkgfHwgJycsIGluc3RhbmNlS2V5OiBuZXdJbnN0YW5jZS5nZXRLZXkoKSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAoeWllbGQgZGVzaWduLmRlYWN0aXZhdGVHcm91cEluc3RhbmNlKCkpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNpZ24uY29tbWl0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNpZ24uYWJvcnRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uLmFkZChbdGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBjaGFuZ2VDb21wb25lbnRUeXBlKGNvbXBvbmVudFR5cGU6IENvbXBvbmVudFR5cGUpIHtcbiAgICAvLyAgICAgdGhpcy5jb21wb25lbnRQYXJhbS50eXBlID0gY29tcG9uZW50VHlwZTtcbiAgICAvLyAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiAnY29tcG9uZW50UGFyYW1DaGFuZ2VkJywgY29tcG9uZW50UGFyYW06IHsgLi4udGhpcy5jb21wb25lbnRQYXJhbSB9IH0sICcqJyk7XG4gICAgLy8gICAgIHRoaXMuY2hhbmdlQ29tcG9uZW50UGFyYW0odGhpcy5jb21wb25lbnRQYXJhbSwgW0NvbXBvbmVudFBhcmFtVHlwZS5UeXBlXSk7XG4gICAgLy8gfVxuICAgIHRyeUNvbW1pdCgpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgIGNvbnN0IG1lc2hlcyA9IGdlbmVyYXRlTWVzaGVzKHRoaXMuc2VnbWVudHMpO1xuICAgICAgICBpZiAobWVzaGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgZGVzaWduLnN0YXJ0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICBjb25zdCBuZXdJbnN0YW5jZXMgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IGVkaXRNb2RlbENoaWxkID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgY29uc3QgdmFsaWRTZWdtZW50cyA9IFtdO1xuICAgICAgICAgICAgbGV0IG9wZXJhdGlvblN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgZm9yIChjb25zdCBzZWdtZW50IG9mIHRoaXMuc2VnbWVudHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXNlZ21lbnQubWVzaClcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgaWYgKCFvcGVyYXRpb25TdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlc2lnbi5hYm9ydE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0luc3RhbmNlID0gYnVpbGRDb21wb25lbnRJbnN0YW5jZShzZWdtZW50KTtcbiAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAhIW5ld0luc3RhbmNlO1xuICAgICAgICAgICAgICAgIGlmIChuZXdJbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICBuZXdJbnN0YW5jZXMucHVzaChuZXdJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIGVkaXRNb2RlbENoaWxkLnNldChzZWdtZW50LnBhcmFtLmluZGV4LCB7IGluc3RhbmNlOiBuZXdJbnN0YW5jZSwgZGVmaW5pdGlvbktleTogKChfYSA9IG5ld0luc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZ2V0S2V5KCkpIHx8ICcnLCBpbnN0YW5jZUtleTogbmV3SW5zdGFuY2UuZ2V0S2V5KCkgfSk7XG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnQucGFyYW0ucGxhdGZvcm1MZW5ndGhMb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LnBhcmFtLnN0ZXBQcm9wb3J0aW9uYWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LnBhcmFtLndpZHRoUHJvcG9ydGlvbmFsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5wYXJhbS5tb2RlbEVkaXRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB2YWxpZFNlZ21lbnRzLnB1c2goc2VnbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5ld0luc3RhbmNlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnRJbnN0YW5jZSA9IChfYiA9IGRlc2lnbi5tYWtlR3JvdXAoW10sIG5ld0luc3RhbmNlcywgW10pKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuYWRkZWRJbnN0YW5jZTtcbiAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAhIXBhcmVudEluc3RhbmNlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudERlZiA9IHBhcmVudEluc3RhbmNlID09PSBudWxsIHx8IHBhcmVudEluc3RhbmNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwYXJlbnRJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAocGFyZW50SW5zdGFuY2UgJiYgcGFyZW50RGVmKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIHBhcmVudERlZi5zZXRDdXN0b21Qcm9wZXJ0eShTdGFpck1vZGVsS2V5LCBTdGFpck1vZGVsVmFsdWUpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2lnbi5jb21taXRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudDogeyBpbnN0YW5jZTogcGFyZW50SW5zdGFuY2UsIGRlZmluaXRpb25LZXk6ICgoX2MgPSBwYXJlbnRJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmdldEtleSgpKSB8fCAnJywgaW5zdGFuY2VLZXk6IHBhcmVudEluc3RhbmNlLmdldEtleSgpIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQ6IGVkaXRNb2RlbENoaWxkXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWdtZW50cyA9IHZhbGlkU2VnbWVudHM7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBDb21wb25lbnQodmFsaWRTZWdtZW50c1swXSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLkRyYXdTdGFpck1vZGVsU2V0dGxlZCwgY29tcG9uZW50UGFyYW1zOiB0aGlzLnNlZ21lbnRzLm1hcChzZWcgPT4gKE9iamVjdC5hc3NpZ24oe30sIHNlZy5wYXJhbSkpKSwgc3RhaXJQYXJhbTogdGhpcy5zdGFpclBhcmFtIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZXNpZ24uYWJvcnRPcGVyYXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRFZGl0TW9kZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVkaXRNb2RlbDtcbiAgICB9XG4gICAgc2V0TW9kZWwoZ3JvdXBJbnN0YW5jZSkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgaWYgKCgoX2EgPSB0aGlzLmVkaXRNb2RlbCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnBhcmVudC5pbnN0YW5jZUtleSkgPT09IGdyb3VwSW5zdGFuY2UuZ2V0S2V5KCkpIHtcbiAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuUHJvcGVydGllc1Zpc2libGUsIHByb3BlcnRpZXNWaXNpYmxlOiB0cnVlIH0sICcqJyk7XG4gICAgICAgICAgICBpZiAodGhpcy5zZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzQ29tcG9uZW50KHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVkaXRNb2RlbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3QgZ3JvdXBEZWYgPSBncm91cEluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpO1xuICAgICAgICBpZiAoZ3JvdXBJbnN0YW5jZSAmJiBncm91cERlZikge1xuICAgICAgICAgICAgY29uc3Qgc3RhaXJNb2RlbFByb3BlcnR5ID0gZ3JvdXBEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoU3RhaXJNb2RlbEtleSk7XG4gICAgICAgICAgICBpZiAoc3RhaXJNb2RlbFByb3BlcnR5ID09PSBTdGFpck1vZGVsVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWdtZW50cyA9IFtdO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN1Ykdyb3VwSW5zdGFuY2VzID0gZ3JvdXBEZWYuZ2V0U3ViR3JvdXBJbnN0YW5jZXMoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBlZGl0TW9kZWwgPSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudDogeyBpbnN0YW5jZTogZ3JvdXBJbnN0YW5jZSwgZGVmaW5pdGlvbktleTogKChfYiA9IGdyb3VwSW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5nZXRLZXkoKSkgfHwgJycsIGluc3RhbmNlS2V5OiBncm91cEluc3RhbmNlLmdldEtleSgpIH0sXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkOiBuZXcgTWFwKClcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgc3ViSW5zdGFuY2Ugb2Ygc3ViR3JvdXBJbnN0YW5jZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3ViRGVmID0gc3ViSW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdWJEZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IGNvbXBvbmVudEluZGV4VmFsdWUgPSBwYXJzZUludChzdWJEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoQ29tcG9uZW50SW5kZXhLZXkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIChpc0Zpbml0ZShjb21wb25lbnRJbmRleFZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyYW0gPSBwYXJzZVBhcmFtKHN1YkRlZi5nZXRDdXN0b21Qcm9wZXJ0eShQYXJhbUtleSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRFbmQgPSBwYXJzZVN0YXJ0RW5kKHN1YkRlZi5nZXRDdXN0b21Qcm9wZXJ0eShTdGFydEVuZEtleSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFzZUxpbmVTZWczZCA9IHBhcnNlTGluZVNlZzNkKHN1YkRlZi5nZXRDdXN0b21Qcm9wZXJ0eShCYXNlTGluZVNlZzNkS2V5KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjaXJjbGVUYW5nZW50ID0gcGFyc2VWZWN0b3IzZChzdWJEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoQ2lyY2xlVGFuZ2VudEtleSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtICYmIHN0YXJ0RW5kICYmIGJhc2VMaW5lU2VnM2QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWdtZW50ID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBnZXRFbXB0eVNlZ21lbnQoKSksIHsgc3RhcnQ6IHN0YXJ0RW5kLnN0YXJ0LCBlbmQ6IHN0YXJ0RW5kLmVuZCwgc3RhcnRIZWlnaHQ6IHN0YXJ0RW5kLnN0YXJ0SGVpZ2h0LCBlbmRIZWlnaHQ6IHN0YXJ0RW5kLmVuZEhlaWdodCwgYmFzZUxpbmVTZWczZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2lyY2xlVGFuZ2VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW0sIHN0YXJ0TG9ja2VkOiB0cnVlLCBlbmRMb2NrZWQ6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudHMucHVzaChzZWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0TW9kZWwuY2hpbGQuc2V0KHBhcmFtLmluZGV4LCB7IGluc3RhbmNlOiBzdWJJbnN0YW5jZSwgZGVmaW5pdGlvbktleTogKChfYyA9IHN1Ykluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuZ2V0S2V5KCkpIHx8ICcnLCBpbnN0YW5jZUtleTogc3ViSW5zdGFuY2UuZ2V0S2V5KCkgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBzZWdtZW50cy5zb3J0KChhLCBiKSA9PiBhLnBhcmFtLmluZGV4IC0gYi5wYXJhbS5pbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VnbWVudHMgPSBzZWdtZW50cztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZWwgPSBlZGl0TW9kZWw7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuZHJhd1RlbXBDb21wb25lbnQoc2VnbWVudHNbMF0sIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzQ29tcG9uZW50KHNlZ21lbnRzWzBdLnBhcmFtLmluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5EcmF3U3RhaXJNb2RlbFNldHRsZWQsIGNvbXBvbmVudFBhcmFtczogdGhpcy5zZWdtZW50cy5tYXAoc2VnID0+IChPYmplY3QuYXNzaWduKHt9LCBzZWcucGFyYW0pKSksIHN0YWlyUGFyYW06IHRoaXMuc3RhaXJQYXJhbSB9LCAnKicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjbGVhckVkaXRNb2RlbCgpIHtcbiAgICAgICAgdGhpcy5lZGl0TW9kZWwgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuc2VnbWVudHMgPSBbXTtcbiAgICAgICAgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggPSBEZWZhdWx0Rm9jdXNlZENvbXBvbmVudEluZGV4O1xuICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLkRyYXdTdGFpck1vZGVsU2V0dGxlZCB9LCAnKicpO1xuICAgIH1cbiAgICBjbGVhcigpIHtcbiAgICAgICAgYXBwVmlldy5jbGVhclRlbXBvcmFyeVNoYXBlcygpO1xuICAgICAgICAvLyB0aGlzLmNvbXBvbmVudFBhcmFtID0geyAuLi5EZWZhdWx0Q29tcG9uZW50UGFyYW0gfTtcbiAgICAgICAgLy8gdGhpcy5zZWdtZW50cyA9IFtdO1xuICAgICAgICB0aGlzLmRyYXdpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggPSBEZWZhdWx0Rm9jdXNlZENvbXBvbmVudEluZGV4O1xuICAgICAgICB0aGlzLnN0YWlyUGFyYW0gPSB1bmRlZmluZWQ7XG4gICAgICAgIC8vIHRoaXMuZWRpdE1vZGVsID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBvblJCdXR0b25VcChldmVudCwgaW5mZXJlbmNlUmVzdWx0KSB7XG4gICAgICAgIHRoaXMudHJ5Q29tbWl0KCk7XG4gICAgICAgIGRlQWN0aXZhdGVEcmF3U3RhaXJzVG9vbCgpO1xuICAgIH1cbiAgICBvbkxCdXR0b25EYkNsaWNrKGV2ZW50LCBpbmZlcmVuY2VSZXN1bHQpIHtcbiAgICAgICAgO1xuICAgIH1cbiAgICBhbGxvd1VzaW5nSW5mZXJlbmNlKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgb25LZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIDtcbiAgICB9XG4gICAgb25LZXlVcChldmVudCkge1xuICAgICAgICA7XG4gICAgfVxufVxuZXhwb3J0IGNvbnN0IGRyYXdTdGFpcnNUb29sID0gbmV3IERyYXdTdGFpcnNUb29sKCk7XG4iLCJpbXBvcnQgeyBCYXNlTGluZVNlZzNkS2V5LCBDaXJjbGVUYW5nZW50S2V5LCBDb21wb25lbnRUeXBlLCBQYXJhbUtleSwgU3RhcnRFbmRLZXkgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgc3RyaW5naWZ5UGFyYW0sIHN0cmluZ2lmeVBvaW50M2QsIHN0cmluZ2lmeVN0YXJ0RW5kIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZU1lc2hlcyhzZWdtZW50cykge1xuICAgIGNvbnN0IG1lc2hlcyA9IFtdO1xuICAgIGZvciAoY29uc3Qgc2VnbWVudCBvZiBzZWdtZW50cykge1xuICAgICAgICBjb25zdCB7IHBhcmFtOiB7IHR5cGUgfSwgY2lyY2xlVGFuZ2VudCB9ID0gc2VnbWVudDtcbiAgICAgICAgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpcikge1xuICAgICAgICAgICAgZ2VuZXJhdGVTdHJhaWdodFN0YWlyTWVzaChzZWdtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09PSBDb21wb25lbnRUeXBlLkNpcmN1bGFyU3RhaXIpIHtcbiAgICAgICAgICAgIGlmIChjaXJjbGVUYW5nZW50KSB7XG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVDaXJjdWxhclN0YWlyTWVzaChzZWdtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGdlbmVyYXRlU3RyYWlnaHRTdGFpck1lc2goc2VnbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBnZW5lcmF0ZVBsYXRmb3JtTWVzaChzZWdtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VnbWVudC5tZXNoKSB7XG4gICAgICAgICAgICBtZXNoZXMucHVzaChzZWdtZW50Lm1lc2gpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtZXNoZXM7XG59XG5mdW5jdGlvbiBnZW5lcmF0ZUNpcmN1bGFyU3RhaXJNZXNoKHNlZ21lbnQpIHtcbiAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oLCBfaiwgX2ssIF9sO1xuICAgIGNvbnN0IHsgc3RhcnRMb2NrZWQsIGNpcmNsZVRhbmdlbnQsIHN0YWlyU2hhcGU6IHsgdmVydGljZXMsIHN0ZXBDb3VudCB9LCBjb3JuZXJTaGFwZTogeyB2ZXJ0aWNlczogY29ybmVyVmVydGljZXMgfSwgcGFyYW06IHsgdXB3YXJkIH0gfSA9IHNlZ21lbnQ7XG4gICAgaWYgKHN0ZXBDb3VudCA8IDEgfHwgIXN0YXJ0TG9ja2VkIHx8ICFjaXJjbGVUYW5nZW50KVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGNvbnN0IHN0YWlyTWVzaCA9IHtcbiAgICAgICAgdmVydGljZXM6IHZlcnRpY2VzLm1hcCh2ZXJ0ZXggPT4gW3ZlcnRleC54LCB2ZXJ0ZXgueSwgdmVydGV4LnpdKSxcbiAgICAgICAgdHJpYW5nbGVJbmRpY2VzOiBbXSxcbiAgICAgICAgc29mdEVkZ2VzOiBbXSxcbiAgICB9O1xuICAgIC8vIOacgOW6lemDqOWPsOmYtuWQjuS4i+S9jee9rlxuICAgIC8vIGNvbnN0IGxlZnRJbmRleCA9IHZlcnRpY2VzLmxlbmd0aCAtICgoIXVwd2FyZCAmJiBzdGVwQ291bnQgPiAxKSA/IDQgOiAyKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ZXBDb3VudDsgaSsrKSB7XG4gICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgLy8gc3RhaXIgZmFjZXNcbiAgICAgICAgW2kgKiA0LCBpICogNCArIDEsIGkgKiA0ICsgMl0sIFtpICogNCArIDEsIGkgKiA0ICsgMywgaSAqIDQgKyAyXSwgW2kgKiA0ICsgMiwgaSAqIDQgKyAzLCBpICogNCArIDRdLCBbaSAqIDQgKyAzLCBpICogNCArIDUsIGkgKiA0ICsgNF0sIFxuICAgICAgICAvLyBzaWRlIGZhY2VzXG4gICAgICAgIFtpICogNCwgaSAqIDQgKyAyLCAoaSArIDEpICogNF0sIFtpICogNCArIDEsIChpICsgMSkgKiA0ICsgMSwgaSAqIDQgKyAzXSk7XG4gICAgICAgIChfYSA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wdXNoKFtpICogNCArIDEsIGkgKiA0ICsgMl0sIFtpICogNCArIDMsIGkgKiA0ICsgNF0sIFtpICogNCwgKGkgKyAxKSAqIDRdLCBbKGkgKyAxKSAqIDQgKyAxLCBpICogNCArIDFdKTtcbiAgICAgICAgaWYgKHVwd2FyZCkge1xuICAgICAgICAgICAgY29uc3QgYm90dG9tRnJvbnRMZWZ0SW5kZXggPSA0ICogc3RlcENvdW50ICsgMiArIDIgKiAoc3RlcENvdW50IC0gaSAtIDEpO1xuICAgICAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAgICAgLy8gc2lkZSBtaWRkbGUgZmFjZXNcbiAgICAgICAgICAgIFtpICogNCwgKGkgKyAxKSAqIDQsIGJvdHRvbUZyb250TGVmdEluZGV4XSwgWyhpICsgMSkgKiA0ICsgMSwgaSAqIDQgKyAxLCBib3R0b21Gcm9udExlZnRJbmRleCArIDFdKTtcbiAgICAgICAgICAgIGlmIChpIDwgc3RlcENvdW50IC0gMSkge1xuICAgICAgICAgICAgICAgIChfYiA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5wdXNoKFsoaSArIDEpICogNCwgYm90dG9tRnJvbnRMZWZ0SW5kZXhdLCBbKGkgKyAxKSAqIDQgKyAxLCBib3R0b21Gcm9udExlZnRJbmRleCArIDFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgICAgICAgICAvLyBzaWRlIGJvdHRvbSBmYWNlc1xuICAgICAgICAgICAgICAgIFtpICogNCwgYm90dG9tRnJvbnRMZWZ0SW5kZXgsIGJvdHRvbUZyb250TGVmdEluZGV4ICsgMl0sIFtib3R0b21Gcm9udExlZnRJbmRleCArIDEsIGkgKiA0ICsgMSwgYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAzXSwgXG4gICAgICAgICAgICAgICAgLy8gYm90dG9tIGZhY2VzXG4gICAgICAgICAgICAgICAgW2JvdHRvbUZyb250TGVmdEluZGV4ICsgMiwgYm90dG9tRnJvbnRMZWZ0SW5kZXgsIGJvdHRvbUZyb250TGVmdEluZGV4ICsgM10sIFtib3R0b21Gcm9udExlZnRJbmRleCArIDMsIGJvdHRvbUZyb250TGVmdEluZGV4LCBib3R0b21Gcm9udExlZnRJbmRleCArIDFdKTtcbiAgICAgICAgICAgICAgICAoX2MgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MucHVzaChbaSAqIDQsIGJvdHRvbUZyb250TGVmdEluZGV4XSwgW2kgKiA0ICsgMSwgYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAxXSwgW2JvdHRvbUZyb250TGVmdEluZGV4ICsgMywgYm90dG9tRnJvbnRMZWZ0SW5kZXhdKTtcbiAgICAgICAgICAgICAgICBpZiAoaSA8IHN0ZXBDb3VudCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgKF9kID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLnB1c2goW2JvdHRvbUZyb250TGVmdEluZGV4ICsgMSwgYm90dG9tRnJvbnRMZWZ0SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXG4gICAgICAgICAgICAgICAgLy8gYm90dG9tIGZhY2VzXG4gICAgICAgICAgICAgICAgW2kgKiA0LCBib3R0b21Gcm9udExlZnRJbmRleCwgaSAqIDQgKyAxXSwgW2kgKiA0ICsgMSwgYm90dG9tRnJvbnRMZWZ0SW5kZXgsIGJvdHRvbUZyb250TGVmdEluZGV4ICsgMV0pO1xuICAgICAgICAgICAgICAgIChfZSA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS5wdXNoKFtpICogNCArIDEsIGJvdHRvbUZyb250TGVmdEluZGV4XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBib3R0b21CYWNrTGVmdEluZGV4ID0gNCAqIHN0ZXBDb3VudCArIDIgKyAyICogKHN0ZXBDb3VudCAtIGkgLSAxKTtcbiAgICAgICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgICAgIC8vIHNpZGUgbWlkZGxlIGZhY2VzXG4gICAgICAgICAgICBbaSAqIDQsIChpICsgMSkgKiA0LCBib3R0b21CYWNrTGVmdEluZGV4XSwgWyhpICsgMSkgKiA0ICsgMSwgaSAqIDQgKyAxLCBib3R0b21CYWNrTGVmdEluZGV4ICsgMV0sIFxuICAgICAgICAgICAgLy8gYm90dG9tIGZhY2VzXG4gICAgICAgICAgICBbYm90dG9tQmFja0xlZnRJbmRleCwgYm90dG9tQmFja0xlZnRJbmRleCAtIDIsIGJvdHRvbUJhY2tMZWZ0SW5kZXggKyAxXSwgW2JvdHRvbUJhY2tMZWZ0SW5kZXggKyAxLCBib3R0b21CYWNrTGVmdEluZGV4IC0gMiwgYm90dG9tQmFja0xlZnRJbmRleCAtIDFdKTtcbiAgICAgICAgICAgIChfZiA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZi5wdXNoKFtib3R0b21CYWNrTGVmdEluZGV4ICsgMSwgYm90dG9tQmFja0xlZnRJbmRleCAtIDJdKTtcbiAgICAgICAgICAgIGlmIChpIDwgc3RlcENvdW50IC0gMSkge1xuICAgICAgICAgICAgICAgIChfZyA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9nID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZy5wdXNoKFsoaSArIDEpICogNCwgYm90dG9tQmFja0xlZnRJbmRleF0sIFsoaSArIDEpICogNCArIDEsIGJvdHRvbUJhY2tMZWZ0SW5kZXggKyAxXSk7XG4gICAgICAgICAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAgICAgICAgIC8vIHNpZGUgYm90dG9tIGZhY2VzXG4gICAgICAgICAgICAgICAgWyhpICsgMSkgKiA0LCBib3R0b21CYWNrTGVmdEluZGV4IC0gMiwgYm90dG9tQmFja0xlZnRJbmRleF0sIFtib3R0b21CYWNrTGVmdEluZGV4IC0gMSwgKGkgKyAxKSAqIDQgKyAxLCBib3R0b21CYWNrTGVmdEluZGV4ICsgMV0pO1xuICAgICAgICAgICAgICAgIChfaCA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9oID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfaC5wdXNoKFsoaSArIDEpICogNCwgYm90dG9tQmFja0xlZnRJbmRleCAtIDJdLCBbKGkgKyAxKSAqIDQgKyAxLCBib3R0b21CYWNrTGVmdEluZGV4IC0gMV0sIFtib3R0b21CYWNrTGVmdEluZGV4ICsgMSwgYm90dG9tQmFja0xlZnRJbmRleCAtIDJdKTtcbiAgICAgICAgICAgICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgKF9qID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2ogPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9qLnB1c2goW2JvdHRvbUJhY2tMZWZ0SW5kZXggKyAxLCBib3R0b21CYWNrTGVmdEluZGV4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlmICh1cHdhcmQpIHtcbiAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAvLyBib3R0b20gZmFjZXNcbiAgICAgICAgLy8gW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIDEsIDBdLFxuICAgICAgICAvLyBbdmVydGljZXMubGVuZ3RoIC0gMSwgMCwgdmVydGljZXMubGVuZ3RoIC0gMl0sXG4gICAgICAgIC8vIOWJjeS+p+mdolxuICAgICAgICBbc3RlcENvdW50ICogNCwgc3RlcENvdW50ICogNCArIDEsIHN0ZXBDb3VudCAqIDQgKyAyXSwgW3N0ZXBDb3VudCAqIDQgKyAxLCBzdGVwQ291bnQgKiA0ICsgMywgc3RlcENvdW50ICogNCArIDJdKTtcbiAgICAgICAgKF9rID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2sgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9rLnB1c2goXG4gICAgICAgIC8vIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCAwXSxcbiAgICAgICAgW3N0ZXBDb3VudCAqIDQgKyAxLCBzdGVwQ291bnQgKiA0ICsgMl0pO1xuICAgICAgICAvLyBpZiAoc3RlcENvdW50ID4gMSkge1xuICAgICAgICAvLyAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAvLyAgICAgICAgIC8vIHNpZGUgYm90dG9tIGZhY2VzXG4gICAgICAgIC8vICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIHZlcnRpY2VzLmxlbmd0aCAtIDEwLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSxcbiAgICAgICAgLy8gICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gMSwgdmVydGljZXMubGVuZ3RoIC0gMywgdmVydGljZXMubGVuZ3RoIC0gOV0sXG4gICAgICAgIC8vICAgICAgICAgLy8gYm90dG9tIGZhY2VzXG4gICAgICAgIC8vICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLFxuICAgICAgICAvLyAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSA1LCB2ZXJ0aWNlcy5sZW5ndGggLSA0LCB2ZXJ0aWNlcy5sZW5ndGggLSA2XSxcbiAgICAgICAgLy8gICAgICk7XG4gICAgICAgIC8vICAgICBzdGFpck1lc2guc29mdEVkZ2VzPy5wdXNoKFxuICAgICAgICAvLyAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSA1LCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSxcbiAgICAgICAgLy8gICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gMiwgdmVydGljZXMubGVuZ3RoIC0gMTBdLFxuICAgICAgICAvLyAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSAxMCwgdmVydGljZXMubGVuZ3RoIC0gNF0sXG4gICAgICAgIC8vICAgICApO1xuICAgICAgICAvLyB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXG4gICAgICAgIC8vIOWQjuS+p+mdolxuICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gMSwgMSwgMF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCAwLCB2ZXJ0aWNlcy5sZW5ndGggLSAyXSk7XG4gICAgICAgIChfbCA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9sID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfbC5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCAwXSk7XG4gICAgICAgIC8vIGlmIChzdGVwQ291bnQgPiAxKSB7XG4gICAgICAgIC8vICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXG4gICAgICAgIC8vICAgICAgICAgLy8gc2lkZSBib3R0b20gZmFjZXNcbiAgICAgICAgLy8gICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gMiwgMCwgdmVydGljZXMubGVuZ3RoIC0gNF0sXG4gICAgICAgIC8vICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIHZlcnRpY2VzLmxlbmd0aCAtIDMsIDFdLFxuICAgICAgICAvLyAgICAgICAgIC8vIGJvdHRvbSBmYWNlc1xuICAgICAgICAvLyAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSA1LCB2ZXJ0aWNlcy5sZW5ndGggLSA0LCB2ZXJ0aWNlcy5sZW5ndGggLSAzXSxcbiAgICAgICAgLy8gICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gNSwgdmVydGljZXMubGVuZ3RoIC0gNiwgdmVydGljZXMubGVuZ3RoIC0gNF0sXG4gICAgICAgIC8vICAgICApO1xuICAgICAgICAvLyAgICAgc3RhaXJNZXNoLnNvZnRFZGdlcz8ucHVzaChcbiAgICAgICAgLy8gICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gNSwgdmVydGljZXMubGVuZ3RoIC0gNF0sXG4gICAgICAgIC8vICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDMsIDFdLFxuICAgICAgICAvLyAgICAgICAgIFswLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSxcbiAgICAgICAgLy8gICAgICk7XG4gICAgICAgIC8vIH1cbiAgICB9XG4gICAgaWYgKGNvcm5lclZlcnRpY2VzLmxlbmd0aCA9PT0gNikge1xuICAgICAgICBnZW5lcmF0ZVBvbHlnb25NZXNoKGNvcm5lclZlcnRpY2VzLCBzdGFpck1lc2gpO1xuICAgIH1cbiAgICBzZWdtZW50Lm1lc2ggPSBzdGFpck1lc2g7XG59XG5mdW5jdGlvbiBnZW5lcmF0ZVN0cmFpZ2h0U3RhaXJNZXNoKHNlZ21lbnQpIHtcbiAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oLCBfaiwgX2s7XG4gICAgY29uc3QgeyBzdGFydExvY2tlZCwgc3RhaXJTaGFwZTogeyB2ZXJ0aWNlcywgc3RlcENvdW50IH0sIGNvcm5lclNoYXBlOiB7IHZlcnRpY2VzOiBjb3JuZXJWZXJ0aWNlcyB9LCBwYXJhbTogeyB1cHdhcmQgfSB9ID0gc2VnbWVudDtcbiAgICBpZiAoc3RlcENvdW50IDwgMSB8fCAhc3RhcnRMb2NrZWQpXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgY29uc3Qgc3RhaXJNZXNoID0ge1xuICAgICAgICB2ZXJ0aWNlczogdmVydGljZXMubWFwKHZlcnRleCA9PiBbdmVydGV4LngsIHZlcnRleC55LCB2ZXJ0ZXguel0pLFxuICAgICAgICB0cmlhbmdsZUluZGljZXM6IFtdLFxuICAgICAgICBzb2Z0RWRnZXM6IFtdLFxuICAgIH07XG4gICAgY29uc3QgbGVmdEluZGV4ID0gdmVydGljZXMubGVuZ3RoIC0gKCghdXB3YXJkICYmIHN0ZXBDb3VudCA+IDEpID8gNCA6IDIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RlcENvdW50OyBpKyspIHtcbiAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAvLyBzdGFpciBmYWNlc1xuICAgICAgICBbaSAqIDQsIGkgKiA0ICsgMSwgaSAqIDQgKyAyXSwgW2kgKiA0ICsgMSwgaSAqIDQgKyAzLCBpICogNCArIDJdLCBbaSAqIDQgKyAyLCBpICogNCArIDMsIGkgKiA0ICsgNF0sIFtpICogNCArIDMsIGkgKiA0ICsgNSwgaSAqIDQgKyA0XSwgXG4gICAgICAgIC8vIHNpZGUgZmFjZXNcbiAgICAgICAgW2kgKiA0LCBpICogNCArIDIsIChpICsgMSkgKiA0XSwgW2kgKiA0ICsgMSwgKGkgKyAxKSAqIDQgKyAxLCBpICogNCArIDNdKTtcbiAgICAgICAgKF9hID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnB1c2goW2kgKiA0ICsgMSwgaSAqIDQgKyAyXSwgW2kgKiA0ICsgMywgaSAqIDQgKyA0XSwgW2kgKiA0LCAoaSArIDEpICogNF0sIFsoaSArIDEpICogNCArIDEsIGkgKiA0ICsgMV0pO1xuICAgICAgICBpZiAoaSA9PT0gc3RlcENvdW50IC0gMSAmJiB1cHdhcmQgJiYgc3RlcENvdW50ID4gMSkge1xuICAgICAgICAgICAgY29uc3QgYmJMZWZ0SW5kZXggPSB2ZXJ0aWNlcy5sZW5ndGggLSA0O1xuICAgICAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAgICAgLy8gdGFpbCBzaWRlIGZhY2VzXG4gICAgICAgICAgICBbYmJMZWZ0SW5kZXgsIGkgKiA0LCAoaSArIDEpICogNF0sIFtiYkxlZnRJbmRleCArIDEsIChpICsgMSkgKiA0ICsgMSwgaSAqIDQgKyAxXSk7XG4gICAgICAgICAgICAoX2IgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IucHVzaChbYmJMZWZ0SW5kZXgsIGkgKiA0XSwgXG4gICAgICAgICAgICAvLyBbaSAqIDQsIChpICsgMSkgKiA0XSxcbiAgICAgICAgICAgIFtiYkxlZnRJbmRleCArIDEsIGkgKiA0ICsgMV0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAgICAgLy8gc2lkZSBmYWNlc1xuICAgICAgICAgICAgW2xlZnRJbmRleCwgaSAqIDQsIChpICsgMSkgKiA0XSwgW2xlZnRJbmRleCArIDEsIChpICsgMSkgKiA0ICsgMSwgaSAqIDQgKyAxXSk7XG4gICAgICAgICAgICAvLyBzdGFpck1lc2guc29mdEVkZ2VzPy5wdXNoKFxuICAgICAgICAgICAgLy8gICAgIFtpICogNCwgKGkgKyAxKSAqIDRdLFxuICAgICAgICAgICAgLy8gICAgIFsoaSArIDEpICogNCArIDEsIGkgKiA0ICsgMV0sXG4gICAgICAgICAgICAvLyApO1xuICAgICAgICAgICAgaWYgKHVwd2FyZCkge1xuICAgICAgICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAoX2MgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MucHVzaChbbGVmdEluZGV4LCBpICogNF0sIFtsZWZ0SW5kZXggKyAxLCBpICogNCArIDFdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN0ZXBDb3VudCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgKF9kID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLnB1c2goW2xlZnRJbmRleCwgKGkgKyAxKSAqIDRdLCBbbGVmdEluZGV4ICsgMSwgKGkgKyAxKSAqIDQgKyAxXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0ZXBDb3VudCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgKF9lID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lLnB1c2goW2xlZnRJbmRleCwgaSAqIDRdLCBbbGVmdEluZGV4ICsgMSwgaSAqIDQgKyAxXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpIDwgc3RlcENvdW50IC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAoX2YgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2YucHVzaChbbGVmdEluZGV4LCAoaSArIDEpICogNF0sIFtsZWZ0SW5kZXggKyAxLCAoaSArIDEpICogNCArIDFdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHVwd2FyZCkge1xuICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXG4gICAgICAgIC8vIGJvdHRvbSBmYWNlc1xuICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gMSwgMSwgMF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCAwLCB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDEsIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbdmVydGljZXMubGVuZ3RoIC0gMywgdmVydGljZXMubGVuZ3RoIC0gMiwgdmVydGljZXMubGVuZ3RoIC0gNF0pO1xuICAgICAgICAoX2cgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2cucHVzaChbdmVydGljZXMubGVuZ3RoIC0gMSwgMF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAzLCB2ZXJ0aWNlcy5sZW5ndGggLSAyXSk7XG4gICAgICAgIGlmIChzdGVwQ291bnQgPiAxKSB7XG4gICAgICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXG4gICAgICAgICAgICAvLyBzaWRlIGJvdHRvbSBmYWNlc1xuICAgICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIHZlcnRpY2VzLmxlbmd0aCAtIDEwLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIHZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDldLCBcbiAgICAgICAgICAgIC8vIGJvdHRvbSBmYWNlc1xuICAgICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLCBbdmVydGljZXMubGVuZ3RoIC0gNSwgdmVydGljZXMubGVuZ3RoIC0gNCwgdmVydGljZXMubGVuZ3RoIC0gNl0pO1xuICAgICAgICAgICAgKF9oID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9oLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLCBbdmVydGljZXMubGVuZ3RoIC0gMiwgdmVydGljZXMubGVuZ3RoIC0gMTBdLCBbdmVydGljZXMubGVuZ3RoIC0gMTAsIHZlcnRpY2VzLmxlbmd0aCAtIDRdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAvLyBib3R0b20gZmFjZXNcbiAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIDAsIDFdLCBbdmVydGljZXMubGVuZ3RoIC0gMSwgdmVydGljZXMubGVuZ3RoIC0gMiwgMF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAzLCB2ZXJ0aWNlcy5sZW5ndGggLSAyLCB2ZXJ0aWNlcy5sZW5ndGggLSAxXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDQsIHZlcnRpY2VzLmxlbmd0aCAtIDJdKTtcbiAgICAgICAgKF9qID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2ogPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9qLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIDBdLCBbdmVydGljZXMubGVuZ3RoIC0gMywgdmVydGljZXMubGVuZ3RoIC0gMl0pO1xuICAgICAgICBpZiAoc3RlcENvdW50ID4gMSkge1xuICAgICAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAgICAgLy8gc2lkZSBib3R0b20gZmFjZXNcbiAgICAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSAyLCAwLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIHZlcnRpY2VzLmxlbmd0aCAtIDMsIDFdLCBcbiAgICAgICAgICAgIC8vIGJvdHRvbSBmYWNlc1xuICAgICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDQsIHZlcnRpY2VzLmxlbmd0aCAtIDNdLCBbdmVydGljZXMubGVuZ3RoIC0gNSwgdmVydGljZXMubGVuZ3RoIC0gNiwgdmVydGljZXMubGVuZ3RoIC0gNF0pO1xuICAgICAgICAgICAgKF9rID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2sgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9rLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLCBbdmVydGljZXMubGVuZ3RoIC0gMywgMV0sIFswLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNvcm5lclZlcnRpY2VzLmxlbmd0aCA9PT0gNikge1xuICAgICAgICBnZW5lcmF0ZVBvbHlnb25NZXNoKGNvcm5lclZlcnRpY2VzLCBzdGFpck1lc2gpO1xuICAgIH1cbiAgICBzZWdtZW50Lm1lc2ggPSBzdGFpck1lc2g7XG59XG5mdW5jdGlvbiBnZW5lcmF0ZVBsYXRmb3JtTWVzaChzZWdtZW50KSB7XG4gICAgY29uc3QgeyBzdGFpclNoYXBlOiB7IHZlcnRpY2VzIH0gfSA9IHNlZ21lbnQ7XG4gICAgLy8gaWYgKGVuZExvY2tlZCkge1xuICAgIGNvbnN0IHZlcnRleExlbmd0aCA9IHZlcnRpY2VzLmxlbmd0aCAvIDI7XG4gICAgaWYgKHZlcnRleExlbmd0aCA9PT0gNCB8fCB2ZXJ0ZXhMZW5ndGggPT09IDUpIHtcbiAgICAgICAgY29uc3QgcGxhdGZvcm1NZXNoID0ge1xuICAgICAgICAgICAgdmVydGljZXM6IFtdLFxuICAgICAgICAgICAgdHJpYW5nbGVJbmRpY2VzOiBbXSxcbiAgICAgICAgICAgIHNvZnRFZGdlczogW10sXG4gICAgICAgIH07XG4gICAgICAgIGdlbmVyYXRlUG9seWdvbk1lc2godmVydGljZXMsIHBsYXRmb3JtTWVzaCk7XG4gICAgICAgIHNlZ21lbnQubWVzaCA9IHBsYXRmb3JtTWVzaDtcbiAgICB9XG4gICAgLy8gfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG5mdW5jdGlvbiBnZW5lcmF0ZVBvbHlnb25NZXNoKHZlcnRpY2VzLCBtZXNoKSB7XG4gICAgdmFyIF9hLCBfYjtcbiAgICBjb25zdCB2ZXJ0ZXhMZW5ndGggPSBtZXNoLnZlcnRpY2VzLmxlbmd0aDtcbiAgICBtZXNoLnZlcnRpY2VzLnB1c2goLi4udmVydGljZXMubWFwKHZlcnRleCA9PiBbdmVydGV4LngsIHZlcnRleC55LCB2ZXJ0ZXguel0pKTtcbiAgICBjb25zdCBzZWdDb3VudCA9IHZlcnRpY2VzLmxlbmd0aCAvIDI7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWdDb3VudDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHJpZ2h0ID0gaSA9PT0gc2VnQ291bnQgLSAxID8gMCA6IGkgKyAxO1xuICAgICAgICBjb25zdCBib3R0b21SaWdodCA9IGkgPT09IHNlZ0NvdW50IC0gMSA/IHNlZ0NvdW50IDogaSArIHNlZ0NvdW50ICsgMTtcbiAgICAgICAgbWVzaC50cmlhbmdsZUluZGljZXMucHVzaChbaSArIHZlcnRleExlbmd0aCwgaSArIHNlZ0NvdW50ICsgdmVydGV4TGVuZ3RoLCBib3R0b21SaWdodCArIHZlcnRleExlbmd0aF0sIFtpICsgdmVydGV4TGVuZ3RoLCBib3R0b21SaWdodCArIHZlcnRleExlbmd0aCwgcmlnaHQgKyB2ZXJ0ZXhMZW5ndGhdKTtcbiAgICAgICAgKF9hID0gbWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wdXNoKFtpICsgdmVydGV4TGVuZ3RoLCBib3R0b21SaWdodCArIHZlcnRleExlbmd0aF0pO1xuICAgICAgICBpZiAoaSA+IDAgJiYgaSA8IHNlZ0NvdW50IC0gMSkge1xuICAgICAgICAgICAgbWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgICAgIC8vIHRvcCBhbmQgYm90dG9tXG4gICAgICAgICAgICBbaSArIHZlcnRleExlbmd0aCwgcmlnaHQgKyB2ZXJ0ZXhMZW5ndGgsIDAgKyB2ZXJ0ZXhMZW5ndGhdLCBbYm90dG9tUmlnaHQgKyB2ZXJ0ZXhMZW5ndGgsIGkgKyBzZWdDb3VudCArIHZlcnRleExlbmd0aCwgc2VnQ291bnQgKyB2ZXJ0ZXhMZW5ndGhdKTtcbiAgICAgICAgICAgIGlmIChpID4gMSkge1xuICAgICAgICAgICAgICAgIChfYiA9IG1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IucHVzaChbaSwgMCArIHZlcnRleExlbmd0aF0sIFtpICsgc2VnQ291bnQgKyB2ZXJ0ZXhMZW5ndGgsIHNlZ0NvdW50ICsgdmVydGV4TGVuZ3RoXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gYnVpbGRDb21wb25lbnRJbnN0YW5jZShzZWdtZW50KSB7XG4gICAgdmFyIF9hLCBfYjtcbiAgICBjb25zdCB7IHN0YXJ0LCBlbmQsIHN0YXJ0SGVpZ2h0LCBlbmRIZWlnaHQsIGJhc2VMaW5lU2VnM2QsIGNpcmNsZVRhbmdlbnQsIHBhcmFtLCBtZXNoIH0gPSBzZWdtZW50O1xuICAgIGNvbnN0IGRlc2lnbiA9IGFwcC5nZXRBY3RpdmVEZXNpZ24oKTtcbiAgICBsZXQgb3BlcmF0aW9uU3VjY2VzcyA9IHRydWU7XG4gICAgaWYgKG1lc2ggPT09IG51bGwgfHwgbWVzaCA9PT0gdm9pZCAwID8gdm9pZCAwIDogbWVzaC52ZXJ0aWNlcy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgbmV3U2hlbGwgPSAoX2EgPSBkZXNpZ24uY3JlYXRlU2hlbGxGcm9tTWVzaChtZXNoKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm5ld1NoZWxsO1xuICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAhIW5ld1NoZWxsO1xuICAgICAgICBpZiAobmV3U2hlbGwpIHtcbiAgICAgICAgICAgIC8vIGlmIChwYXJhbS50eXBlICE9PSBDb21wb25lbnRUeXBlLkNpcmN1bGFyU3RhaXIpIHtcbiAgICAgICAgICAgIC8vICAgICBjb25zdCBzb2Z0RWRnZXMgPSBuZXdTaGVsbC5nZXRFZGdlcygpLmZpbHRlcihlID0+IGUuaXNTb2Z0KCkpO1xuICAgICAgICAgICAgLy8gICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGRlc2lnbi5yZW1vdmVFZGdlcyhzb2Z0RWRnZXMpLmlzU3VjY2VzcztcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIGNvbnN0IG5ld0luc3RhbmNlID0gKF9iID0gZGVzaWduLm1ha2VHcm91cChuZXdTaGVsbC5nZXRGYWNlcygpLCBbXSwgW10pKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuYWRkZWRJbnN0YW5jZTtcbiAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICEhbmV3SW5zdGFuY2U7XG4gICAgICAgICAgICBjb25zdCBncm91cERlZiA9IG5ld0luc3RhbmNlID09PSBudWxsIHx8IG5ld0luc3RhbmNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBuZXdJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKTtcbiAgICAgICAgICAgIGlmIChuZXdJbnN0YW5jZSAmJiBncm91cERlZikge1xuICAgICAgICAgICAgICAgIC8vIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGdyb3VwRGVmLnNldEN1c3RvbVByb3BlcnR5KENvbXBvbmVudEluZGV4S2V5LCBgJHtuZXdJbnN0YW5jZXMubGVuZ3RofWApLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAvLyBuZXdJbnN0YW5jZXMucHVzaChuZXdJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFyYW1TdHJpbmcgPSBzdHJpbmdpZnlQYXJhbShwYXJhbSk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRFbmRTdHJpbmcgPSBzdHJpbmdpZnlTdGFydEVuZChHZW9tTGliLmNyZWF0ZVBvaW50M2Qoc3RhcnQueCwgc3RhcnQueSwgc3RhcnRIZWlnaHQpLCBHZW9tTGliLmNyZWF0ZVBvaW50M2QoZW5kLngsIGVuZC55LCBlbmRIZWlnaHQpKTtcbiAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBncm91cERlZi5zZXRDdXN0b21Qcm9wZXJ0eShQYXJhbUtleSwgcGFyYW1TdHJpbmcpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBncm91cERlZi5zZXRDdXN0b21Qcm9wZXJ0eShTdGFydEVuZEtleSwgc3RhcnRFbmRTdHJpbmcpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICBpZiAoYmFzZUxpbmVTZWczZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBCYXNlTGluZVN0cmluZyA9IHN0cmluZ2lmeVN0YXJ0RW5kKGJhc2VMaW5lU2VnM2Quc3RhcnQsIGJhc2VMaW5lU2VnM2QuZW5kKTtcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZ3JvdXBEZWYuc2V0Q3VzdG9tUHJvcGVydHkoQmFzZUxpbmVTZWczZEtleSwgQmFzZUxpbmVTdHJpbmcpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNpcmNsZVRhbmdlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFuZ2VudFN0cmluZyA9IHN0cmluZ2lmeVBvaW50M2QoY2lyY2xlVGFuZ2VudCk7XG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGdyb3VwRGVmLnNldEN1c3RvbVByb3BlcnR5KENpcmNsZVRhbmdlbnRLZXksIHRhbmdlbnRTdHJpbmcpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld0luc3RhbmNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG4iLCJpbXBvcnQgeyBBbmdsZVRvbGVyYW5jZSwgRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UsIERpcmVjdGlvblosIGR1bW15UG9pbnQzZCwgTGVuZ3RoVG9sZXJhbmNlLCBTdGVwQ291bnRMaW1pdCB9IGZyb20gXCIuL2NvbnN0c1wiO1xuaW1wb3J0IHsgQ29tcG9uZW50VHlwZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVTaGFwZShzZWdtZW50LCB0ZW1wID0gdHJ1ZSkge1xuICAgIGNvbnN0IHsgcGFyYW06IHsgdHlwZSB9LCBjaXJjbGVUYW5nZW50IH0gPSBzZWdtZW50O1xuICAgIGlmICh0eXBlID09PSBDb21wb25lbnRUeXBlLlN0cmFpZ2h0U3RhaXIpIHtcbiAgICAgICAgZ2VuZXJhdGVTdHJhaWdodFN0YWlyU2hhcGUoc2VnbWVudCwgdGVtcCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpcikge1xuICAgICAgICBpZiAoY2lyY2xlVGFuZ2VudCkge1xuICAgICAgICAgICAgZ2VuZXJhdGVDaXJjdWxhclN0YWlyU2hhcGUoc2VnbWVudCwgdGVtcCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBnZW5lcmF0ZVN0cmFpZ2h0U3RhaXJTaGFwZShzZWdtZW50LCB0ZW1wKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZ2VuZXJhdGVQbGF0Zm9ybVNoYXBlKHNlZ21lbnQsIHRlbXApO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdlbmVyYXRlQ2lyY3VsYXJTdGFpclNoYXBlKHNlZ21lbnQsIHRlbXAgPSB0cnVlKSB7XG4gICAgY29uc3QgeyBzdGFydCwgZW5kLCBzdGFpclNoYXBlLCBtb2xkU2hhcGUsIGNvcm5lclNoYXBlLCBjb3JuZXJNb2xkU2hhcGUsIHN0YXJ0SGVpZ2h0LCBiYXNlTGluZVNlZzNkLCBjaXJjbGVUYW5nZW50LCBwYXJhbSB9ID0gc2VnbWVudDtcbiAgICBjb25zdCB7IHN0YXJ0V2lkdGgsIGVuZFdpZHRoLCBob3Jpem9udGFsU3RlcCwgdmVydGljYWxTdGVwLCB1cHdhcmQsIHBsYXRmb3JtVGhpY2tuZXNzIH0gPSBwYXJhbTtcbiAgICBpZiAoY2lyY2xlVGFuZ2VudCkge1xuICAgICAgICBjb25zdCB2ZXJ0aWNhbEZyb250RGlyID0gRGlyZWN0aW9uWjtcbiAgICAgICAgY29uc3QgdGFuZ2VudExlZnREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKGNpcmNsZVRhbmdlbnQpLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgY29uc3Qgc3RhcnRFbmREaXIgPSBlbmQuc3VidHJhY3RlZChzdGFydCkubm9ybWFsaXplZCgpO1xuICAgICAgICBjb25zdCBzdGFydEVuZERpc3RhbmNlID0gc3RhcnQuZGlzdGFuY2VUbyhlbmQpO1xuICAgICAgICBjb25zdCBtYXhXaWR0aCA9IE1hdGgubWF4KHN0YXJ0V2lkdGgsIGVuZFdpZHRoKTtcbiAgICAgICAgY29uc3QgZW5kQW5nbGUgPSBzdGFydEVuZERpci5hbmdsZVRvKGNpcmNsZVRhbmdlbnQsIERpcmVjdGlvblopO1xuICAgICAgICBpZiAoZW5kQW5nbGUgPCBEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSkge1xuICAgICAgICAgICAgcmV0dXJuIGdlbmVyYXRlU3RyYWlnaHRTdGFpclNoYXBlKHNlZ21lbnQsIHRlbXApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGlzTGVmdEFyYyA9IGVuZEFuZ2xlID4gTWF0aC5QSTtcbiAgICAgICAgY29uc3QgZW5kQ29tcGxlbWVudGFyeUFuZ2xlID0gaXNMZWZ0QXJjID8gTWF0aC5hYnMoZW5kQW5nbGUgLSBNYXRoLlBJIC8gMiAtIE1hdGguUEkpIDogTWF0aC5hYnMoZW5kQW5nbGUgLSBNYXRoLlBJIC8gMik7XG4gICAgICAgIGNvbnN0IGhhbGZDaG9yZCA9IHN0YXJ0RW5kRGlzdGFuY2UgLyAyO1xuICAgICAgICBjb25zdCByYWRpdXMgPSBoYWxmQ2hvcmQgLyBNYXRoLmNvcyhlbmRDb21wbGVtZW50YXJ5QW5nbGUpO1xuICAgICAgICBjb25zdCBpbm5lclJhZGl1cyA9IHJhZGl1cyAtIG1heFdpZHRoIC8gMjtcbiAgICAgICAgaWYgKHJhZGl1cyA8IG1heFdpZHRoIC8gMiAqIDEuMiB8fCBpbm5lclJhZGl1cyA8IGhvcml6b250YWxTdGVwIC8gMiAvIDAuOCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGhvcml6b250YWxTdGVwQW5nbGUgPSBNYXRoLmFzaW4oaG9yaXpvbnRhbFN0ZXAgLyAyIC8gaW5uZXJSYWRpdXMpICogMjtcbiAgICAgICAgY29uc3QgY2lyY2xlTm9ybWFsID0gaXNMZWZ0QXJjID8gRGlyZWN0aW9uWiA6IERpcmVjdGlvbloucmV2ZXJzZWQoKTtcbiAgICAgICAgY29uc3QgY2lyY2xlQ2VudGVyID0gc3RhcnQuYWRkZWQodGFuZ2VudExlZnREaXIubXVsdGlwbGllZChpc0xlZnRBcmMgPyByYWRpdXMgOiAtcmFkaXVzKSk7XG4gICAgICAgIC8vIGNvbnN0IGNpcmNsZSA9IEdlb21MaWIuY3JlYXRlQ2lyY2xlM2RCeUNlbnRlck5vcm1hbFJhZGl1cyhjaXJjbGVDZW50ZXIsIGNpcmNsZU5vcm1hbCwgcmFkaXVzKTtcbiAgICAgICAgY29uc3QgYXJjID0gR2VvbUxpYi5jcmVhdGVBcmMzZEJ5Q2VudGVyTm9ybWFsUmFkaXVzKGNpcmNsZUNlbnRlciwgY2lyY2xlTm9ybWFsLCByYWRpdXMsIHN0YXJ0LCBlbmQpO1xuICAgICAgICBjb25zdCBhcmNBbmdsZSA9IGFyYy5hcmNBbmdsZTtcbiAgICAgICAgY29uc3Qgc3RlcENvdW50ID0gTWF0aC5jZWlsKGFyY0FuZ2xlIC8gaG9yaXpvbnRhbFN0ZXBBbmdsZSk7XG4gICAgICAgIGNvbnN0IGxhc3RIb3Jpem9udGFsQW5nbGUgPSBhcmNBbmdsZSAtIGhvcml6b250YWxTdGVwQW5nbGUgKiAoc3RlcENvdW50IC0gMSk7XG4gICAgICAgIGNvbnN0IHZhbGlkU3RlcENvdW50ID0gKGxhc3RIb3Jpem9udGFsQW5nbGUgPT09IDAgfHwgbGFzdEhvcml6b250YWxBbmdsZSA+IEFuZ2xlVG9sZXJhbmNlKSA/IHN0ZXBDb3VudCA6IHN0ZXBDb3VudCAtIDE7XG4gICAgICAgIGlmIChob3Jpem9udGFsU3RlcEFuZ2xlID49IGFyY0FuZ2xlIHx8IGhvcml6b250YWxTdGVwQW5nbGUgPj0gTWF0aC5QSSAvIDIgfHwgdmFsaWRTdGVwQ291bnQgPj0gU3RlcENvdW50TGltaXQgfHwgdmFsaWRTdGVwQ291bnQgPCAxKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFtdO1xuICAgICAgICBzdGFpclNoYXBlLnRlbXBMaW5lcyA9IFtdO1xuICAgICAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXTtcbiAgICAgICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtdO1xuICAgICAgICBjb3JuZXJTaGFwZS52ZXJ0aWNlcyA9IFtdO1xuICAgICAgICBjb3JuZXJTaGFwZS50ZW1wTGluZXMgPSBbXTtcbiAgICAgICAgY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzID0gW107XG4gICAgICAgIGNvcm5lck1vbGRTaGFwZS50ZW1wTGluZXMgPSBbXTtcbiAgICAgICAgY29uc3QgeyB2ZXJ0aWNlcywgdGVtcExpbmVzIH0gPSBzdGFpclNoYXBlO1xuICAgICAgICBjb25zdCB7IHZlcnRpY2VzOiBtb2xkVmVydGljZXMsIHRlbXBMaW5lczogbW9sZFRlbXBMaW5lcyB9ID0gbW9sZFNoYXBlO1xuICAgICAgICAvLyBjb25zdCBjZW50ZXJIb3Jpem9udGFsU3RlcCA9IGhvcml6b250YWxTdGVwIC8gaW5uZXJSYWRpdXMgKiByYWRpdXM7XG4gICAgICAgIGNvbnN0IHN0ZXBIZWlnaHQgPSB1cHdhcmQgPyB2ZXJ0aWNhbFN0ZXAgOiAtdmVydGljYWxTdGVwO1xuICAgICAgICBzZWdtZW50LmVuZEhlaWdodCA9IHNlZ21lbnQuc3RhcnRIZWlnaHQgKyB2YWxpZFN0ZXBDb3VudCAqIHN0ZXBIZWlnaHQ7XG4gICAgICAgIHN0YWlyU2hhcGUuc3RlcENvdW50ID0gdmFsaWRTdGVwQ291bnQ7XG4gICAgICAgIG1vbGRTaGFwZS5zdGVwQ291bnQgPSB2YWxpZFN0ZXBDb3VudDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3ZhbGlkU3RlcENvdW50OiAgICcsdmFsaWRTdGVwQ291bnQpO1xuICAgICAgICBjb25zdCBsZWZ0UHQgPSBzdGFydC5hZGRlZCh0YW5nZW50TGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSk7XG4gICAgICAgIGNvbnN0IHJpZ2h0UHQgPSBzdGFydC5hZGRlZCh0YW5nZW50TGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpO1xuICAgICAgICBjb25zdCBzdGFydFJhZGl1c0RpciA9IGlzTGVmdEFyYyA/IHRhbmdlbnRMZWZ0RGlyLnJldmVyc2VkKCkgOiB0YW5nZW50TGVmdERpcjtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGVwQ291bnQgLSAxOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGN1clJvdGF0ZU1hdHJpeCA9IEdlb21MaWIuY3JlYXRlUm90YXRlTWF0cml4NChob3Jpem9udGFsU3RlcEFuZ2xlICogaSwgY2lyY2xlTm9ybWFsLCBkdW1teVBvaW50M2QpO1xuICAgICAgICAgICAgY29uc3QgY3VyUmFkaXVzRGlyID0gc3RhcnRSYWRpdXNEaXIuYXBwbGllZE1hdHJpeDQoY3VyUm90YXRlTWF0cml4KTtcbiAgICAgICAgICAgIGNvbnN0IGN1ckhhbGZXaWR0aCA9IChzdGFydFdpZHRoICsgKGVuZFdpZHRoIC0gc3RhcnRXaWR0aCkgKiAoaSAqIGhvcml6b250YWxTdGVwQW5nbGUpIC8gYXJjQW5nbGUpIC8gMiAqIChpc0xlZnRBcmMgPyAtMSA6IDEpO1xuICAgICAgICAgICAgY29uc3QgY3VyTGVmdE1vbGRQdCA9IGNpcmNsZUNlbnRlci5hZGRlZChjdXJSYWRpdXNEaXIubXVsdGlwbGllZChyYWRpdXMgKyBjdXJIYWxmV2lkdGgpKTtcbiAgICAgICAgICAgIGNvbnN0IGN1clJpZ2h0TW9sZFB0ID0gY2lyY2xlQ2VudGVyLmFkZGVkKGN1clJhZGl1c0Rpci5tdWx0aXBsaWVkKHJhZGl1cyAtIGN1ckhhbGZXaWR0aCkpO1xuICAgICAgICAgICAgY29uc3QgY3VyTGVmdFB0ID0gY3VyTGVmdE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoaSAqIHN0ZXBIZWlnaHQpKTtcbiAgICAgICAgICAgIGNvbnN0IGN1clJpZ2h0UHQgPSBjdXJSaWdodE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoaSAqIHN0ZXBIZWlnaHQpKTtcbiAgICAgICAgICAgIG1vbGRWZXJ0aWNlcy5wdXNoKGN1ckxlZnRNb2xkUHQsIGN1clJpZ2h0TW9sZFB0KTtcbiAgICAgICAgICAgIG1vbGRUZW1wTGluZXMucHVzaChbMiAqIGksIDEgKyAyICogaV0sIFsyICogaSwgMiArIDIgKiBpXSwgWzEgKyAyICogaSwgMyArIDIgKiBpXSk7XG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKGN1ckxlZnRQdCwgY3VyUmlnaHRQdCk7XG4gICAgICAgICAgICBjb25zdCBuZXh0Um90YXRlTWF0cml4ID0gR2VvbUxpYi5jcmVhdGVSb3RhdGVNYXRyaXg0KGhvcml6b250YWxTdGVwQW5nbGUgKiAoaSArIDEpLCBjaXJjbGVOb3JtYWwsIGR1bW15UG9pbnQzZCk7XG4gICAgICAgICAgICBjb25zdCBuZXh0UmFkaXVzRGlyID0gc3RhcnRSYWRpdXNEaXIuYXBwbGllZE1hdHJpeDQobmV4dFJvdGF0ZU1hdHJpeCk7XG4gICAgICAgICAgICBjb25zdCBuZXh0SGFsZldpZHRoID0gKHN0YXJ0V2lkdGggKyAoZW5kV2lkdGggLSBzdGFydFdpZHRoKSAqICgoaSArIDEpICogaG9yaXpvbnRhbFN0ZXBBbmdsZSkgLyBhcmNBbmdsZSkgLyAyICogKGlzTGVmdEFyYyA/IC0xIDogMSk7XG4gICAgICAgICAgICBjb25zdCBuZXh0TGVmdE1vbGRQdCA9IGNpcmNsZUNlbnRlci5hZGRlZChuZXh0UmFkaXVzRGlyLm11bHRpcGxpZWQocmFkaXVzICsgbmV4dEhhbGZXaWR0aCkpO1xuICAgICAgICAgICAgY29uc3QgbmV4dFJpZ2h0TW9sZFB0ID0gY2lyY2xlQ2VudGVyLmFkZGVkKG5leHRSYWRpdXNEaXIubXVsdGlwbGllZChyYWRpdXMgLSBuZXh0SGFsZldpZHRoKSk7XG4gICAgICAgICAgICBjb25zdCBuZXh0TGVmdFB0ID0gbmV4dExlZnRNb2xkUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkuYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKGkgKiBzdGVwSGVpZ2h0KSk7XG4gICAgICAgICAgICBjb25zdCBuZXh0UmlnaHRQdCA9IG5leHRSaWdodE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoaSAqIHN0ZXBIZWlnaHQpKTtcbiAgICAgICAgICAgIGlmICh1cHdhcmQpIHtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKGN1ckxlZnRQdC5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLCBjdXJSaWdodFB0LmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaChuZXh0TGVmdFB0LCBuZXh0UmlnaHRQdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFs0ICogaSwgMSArIDQgKiBpXSwgWzQgKiBpLCAyICsgNCAqIGldLCBbMSArIDQgKiBpLCAzICsgNCAqIGldLCBbMiArIDQgKiBpLCAzICsgNCAqIGldLCBbMiArIDQgKiBpLCA0ICsgNCAqIGldLCBbMyArIDQgKiBpLCA1ICsgNCAqIGldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpID09PSBzdGVwQ291bnQgLSAyKSB7XG4gICAgICAgICAgICAgICAgbW9sZFZlcnRpY2VzLnB1c2gobmV4dExlZnRNb2xkUHQsIG5leHRSaWdodE1vbGRQdCk7XG4gICAgICAgICAgICAgICAgbW9sZFRlbXBMaW5lcy5wdXNoKFsyICogKHN0ZXBDb3VudCAtIDEpLCAxICsgMiAqIChzdGVwQ291bnQgLSAxKV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGkgPT09IHN0ZXBDb3VudCAtIDIpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiAodXB3YXJkKSB7XG4gICAgICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaChuZXh0TGVmdFB0LmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksIG5leHRSaWdodFB0LmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xuICAgICAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFs0ICogKHN0ZXBDb3VudCAtIDEpLCAxICsgNCAqIChzdGVwQ291bnQgLSAxKV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsYXN0Um90YXRlTWF0cml4ID0gR2VvbUxpYi5jcmVhdGVSb3RhdGVNYXRyaXg0KGFyY0FuZ2xlLCBjaXJjbGVOb3JtYWwsIGR1bW15UG9pbnQzZCk7XG4gICAgICAgIGNvbnN0IGxhc3RSYWRpdXNEaXIgPSBzdGFydFJhZGl1c0Rpci5hcHBsaWVkTWF0cml4NChsYXN0Um90YXRlTWF0cml4KTtcbiAgICAgICAgY29uc3QgbGFzdEhhbGZXaWR0aCA9IGlzTGVmdEFyYyA/IC1lbmRXaWR0aCAvIDIgOiBlbmRXaWR0aCAvIDI7XG4gICAgICAgIGNvbnN0IGxhc3RMZWZ0TW9sZFB0ID0gY2lyY2xlQ2VudGVyLmFkZGVkKGxhc3RSYWRpdXNEaXIubXVsdGlwbGllZChyYWRpdXMgKyBsYXN0SGFsZldpZHRoKSk7XG4gICAgICAgIGNvbnN0IGxhc3RSaWdodE1vbGRQdCA9IGNpcmNsZUNlbnRlci5hZGRlZChsYXN0UmFkaXVzRGlyLm11bHRpcGxpZWQocmFkaXVzIC0gbGFzdEhhbGZXaWR0aCkpO1xuICAgICAgICBjb25zdCBsYXN0TGVmdFB0ID0gbGFzdExlZnRNb2xkUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkuYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKHN0ZXBDb3VudCAqIHN0ZXBIZWlnaHQpKTtcbiAgICAgICAgY29uc3QgbGFzdFJpZ2h0UHQgPSBsYXN0UmlnaHRNb2xkUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkuYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKHN0ZXBDb3VudCAqIHN0ZXBIZWlnaHQpKTtcbiAgICAgICAgaWYgKHN0ZXBDb3VudCA9PT0gMSkge1xuICAgICAgICAgICAgbW9sZFZlcnRpY2VzLnB1c2gobGVmdFB0LCByaWdodFB0KTtcbiAgICAgICAgICAgIG1vbGRUZW1wTGluZXMucHVzaChbMiAqIChzdGVwQ291bnQgLSAxKSwgMSArIDIgKiAoc3RlcENvdW50IC0gMSldKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGFzdEhvcml6b250YWxBbmdsZSA+PSBBbmdsZVRvbGVyYW5jZSB8fCBsYXN0SG9yaXpvbnRhbEFuZ2xlID09PSAwKSB7XG4gICAgICAgICAgICBtb2xkVmVydGljZXMucHVzaChsYXN0TGVmdE1vbGRQdCwgbGFzdFJpZ2h0TW9sZFB0KTtcbiAgICAgICAgICAgIG1vbGRUZW1wTGluZXMucHVzaChbMiAqIChzdGVwQ291bnQgLSAxKSwgMiArIDIgKiAoc3RlcENvdW50IC0gMSldLCBbMSArIDIgKiAoc3RlcENvdW50IC0gMSksIDMgKyAyICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKiBzdGVwQ291bnQsIDEgKyAyICogc3RlcENvdW50XSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVwd2FyZCkge1xuICAgICAgICAgICAgaWYgKHN0ZXBDb3VudCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2gobGVmdFB0LCByaWdodFB0KTtcbiAgICAgICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbNCAqIChzdGVwQ291bnQgLSAxKSwgMSArIDQgKiAoc3RlcENvdW50IC0gMSldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGFzdEhvcml6b250YWxBbmdsZSA+PSBBbmdsZVRvbGVyYW5jZSB8fCBsYXN0SG9yaXpvbnRhbEFuZ2xlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQodmVydGljYWxTdGVwKSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZCh2ZXJ0aWNhbFN0ZXApKSk7XG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaChsYXN0TGVmdFB0LCBsYXN0UmlnaHRQdCk7XG4gICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzQgKiAoc3RlcENvdW50IC0gMSksIDIgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzEgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCAzICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsyICsgNCAqIChzdGVwQ291bnQgLSAxKSwgMyArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMiArIDQgKiAoc3RlcENvdW50IC0gMSksIDQgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzMgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCA1ICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFs0ICogc3RlcENvdW50LCAxICsgNCAqIHN0ZXBDb3VudF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChzdGVwQ291bnQgPT09IDEpIHtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKGxlZnRQdCwgcmlnaHRQdCk7XG4gICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzQgKiAoc3RlcENvdW50IC0gMSksIDEgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxhc3RIb3Jpem9udGFsQW5nbGUgPj0gQW5nbGVUb2xlcmFuY2UgfHwgbGFzdEhvcml6b250YWxBbmdsZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2gobGFzdExlZnRQdC5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQpKSwgbGFzdFJpZ2h0UHQuYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0KSkpO1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2gobGFzdExlZnRQdCwgbGFzdFJpZ2h0UHQpO1xuICAgICAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFs0ICogKHN0ZXBDb3VudCAtIDEpLCAyICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsxICsgNCAqIChzdGVwQ291bnQgLSAxKSwgMyArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMiArIDQgKiAoc3RlcENvdW50IC0gMSksIDMgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCA0ICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFszICsgNCAqIChzdGVwQ291bnQgLSAxKSwgNSArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbNCAqIHN0ZXBDb3VudCwgMSArIDQgKiBzdGVwQ291bnRdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0ZXBDb3VudCA+IDEpIHtcbiAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIDIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGFjdHVhbExhc3RTdGVwTGVuZ3RoID0gbGFzdEhvcml6b250YWxBbmdsZSA8IEFuZ2xlVG9sZXJhbmNlID8gaG9yaXpvbnRhbFN0ZXBBbmdsZSA6IGxhc3RIb3Jpem9udGFsQW5nbGU7XG4gICAgICAgICAgICBpZiAodXB3YXJkKSB7XG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQgLSAoMSAtIGFjdHVhbExhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXBBbmdsZSkgKiBzdGVwSGVpZ2h0KSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZCgtc3RlcEhlaWdodCAtICgxIC0gYWN0dWFsTGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcEFuZ2xlKSAqIHN0ZXBIZWlnaHQpKSk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IHN0ZXBDb3VudCAtIChsYXN0SG9yaXpvbnRhbEFuZ2xlID49IEFuZ2xlVG9sZXJhbmNlID8gMSA6IDIpOyBqID4gMDsgai0tKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZJbmQgPSBqICogNDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSAyLCAyICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsxICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAwXSwgWzMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAxXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2SW5kXS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQpKSwgdmVydGljZXNbdkluZCArIDFdLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZCgtc3RlcEhlaWdodCkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDZdLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDVdLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSBzdGVwQ291bnQgLSAobGFzdEhvcml6b250YWxBbmdsZSA+PSBBbmdsZVRvbGVyYW5jZSA/IDEgOiAyKTsgaiA+PSAwOyBqLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdkluZCA9IGogKiA0O1xuICAgICAgICAgICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIDIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGogPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbMiArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDBdLCBbMyArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDFdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZJbmRdLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksIHZlcnRpY2VzW3ZJbmQgKyAxXS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSAyLCAyICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsxICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMiArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAwXSwgWzMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodXB3YXJkKSB7XG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQpKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0KSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1swXS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1sxXS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoYmFzZUxpbmVTZWczZCkge1xuICAgICAgICAgICAgY29uc3QgYmFzZUxpbmVEaXIgPSBiYXNlTGluZVNlZzNkLmVuZC5zdWJ0cmFjdGVkKGJhc2VMaW5lU2VnM2Quc3RhcnQpLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgIGNvbnN0IGFuZ2xlID0gY2lyY2xlVGFuZ2VudC5hbmdsZShiYXNlTGluZURpcik7XG4gICAgICAgICAgICBpZiAoYW5nbGUgPCBNYXRoLlBJIC8gMikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvcm5lckNvbm5lY3Rpb25Qb2ludDEgPSBzdGFydC5hZGRlZChiYXNlTGluZURpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMiAqIE1hdGguc2lnbihhbmdsZSkpKTtcbiAgICAgICAgICAgICAgICBjb3JuZXJNb2xkU2hhcGUudmVydGljZXMgPSBbc3RhcnQsIHN0YXJ0LmFkZGVkKHRhbmdlbnRMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSksIGNvcm5lckNvbm5lY3Rpb25Qb2ludDFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29ybmVyQ29ubmVjdGlvblBvaW50MiA9IHN0YXJ0LmFkZGVkKGJhc2VMaW5lRGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIgKiBNYXRoLnNpZ24oYW5nbGUpKSk7XG4gICAgICAgICAgICAgICAgY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzID0gW3N0YXJ0LCBjb3JuZXJDb25uZWN0aW9uUG9pbnQyLCBzdGFydC5hZGRlZCh0YW5nZW50TGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29ybmVyTW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtbMCwgMV0sIFsxLCAyXSwgWzIsIDBdXTtcbiAgICAgICAgICAgIGNvcm5lclNoYXBlLnZlcnRpY2VzID0gW1xuICAgICAgICAgICAgICAgIC4uLmNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAodiA9PiB2LmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZChzdGFydEhlaWdodCkpKSxcbiAgICAgICAgICAgICAgICAuLi5jb3JuZXJNb2xkU2hhcGUudmVydGljZXMubWFwKHYgPT4gdi5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgLSBwbGF0Zm9ybVRoaWNrbmVzcykpKSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgIGNvcm5lclNoYXBlLnRlbXBMaW5lcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgWzAsIDFdLCBbMSwgMl0sIFsyLCAwXSxcbiAgICAgICAgICAgICAgICAgICAgWzMsIDRdLCBbNCwgNV0sIFs1LCAzXSxcbiAgICAgICAgICAgICAgICAgICAgWzAsIDNdLCBbMSwgNF0sIFsyLCA1XSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gZ2VuZXJhdGVTdHJhaWdodFN0YWlyU2hhcGUoc2VnbWVudCwgdGVtcCA9IHRydWUpIHtcbiAgICBjb25zdCB7IHN0YXJ0LCBlbmQsIHN0YWlyU2hhcGUsIG1vbGRTaGFwZSwgY29ybmVyU2hhcGUsIGNvcm5lck1vbGRTaGFwZSwgc3RhcnRIZWlnaHQsIGJhc2VMaW5lU2VnM2QsIHBhcmFtIH0gPSBzZWdtZW50O1xuICAgIGNvbnN0IHsgc3RhcnRXaWR0aCwgZW5kV2lkdGgsIGhvcml6b250YWxTdGVwLCB2ZXJ0aWNhbFN0ZXAsIHVwd2FyZCwgcGxhdGZvcm1UaGlja25lc3MgfSA9IHBhcmFtO1xuICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbXTtcbiAgICBzdGFpclNoYXBlLnRlbXBMaW5lcyA9IFtdO1xuICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtdO1xuICAgIG1vbGRTaGFwZS50ZW1wTGluZXMgPSBbXTtcbiAgICBjb3JuZXJTaGFwZS52ZXJ0aWNlcyA9IFtdO1xuICAgIGNvcm5lclNoYXBlLnRlbXBMaW5lcyA9IFtdO1xuICAgIGNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtdO1xuICAgIGNvcm5lck1vbGRTaGFwZS50ZW1wTGluZXMgPSBbXTtcbiAgICBjb25zdCB7IHZlcnRpY2VzLCB0ZW1wTGluZXMgfSA9IHN0YWlyU2hhcGU7XG4gICAgY29uc3QgeyB2ZXJ0aWNlczogbW9sZFZlcnRpY2VzLCB0ZW1wTGluZXM6IG1vbGRUZW1wTGluZXMgfSA9IG1vbGRTaGFwZTtcbiAgICBjb25zdCB2ZXJ0aWNhbEZyb250RGlyID0gRGlyZWN0aW9uWjtcbiAgICBsZXQgaG9yaXpvbnRhbEZyb250RGlyID0gZW5kLnN1YnRyYWN0ZWQoc3RhcnQpLm5vcm1hbGl6ZWQoKTtcbiAgICBsZXQgaG9yaXpvbnRhbERpc3RhbmNlID0gc3RhcnQuZGlzdGFuY2VUbyhlbmQpO1xuICAgIGxldCBob3Jpem9udGFsTGVmdERpciA9IERpcmVjdGlvblouY3Jvc3MoaG9yaXpvbnRhbEZyb250RGlyKTtcbiAgICBjb25zdCBzdGVwRmxvYXRDb3VudCA9IGhvcml6b250YWxEaXN0YW5jZSAvIGhvcml6b250YWxTdGVwO1xuICAgIGNvbnN0IHN0ZXBDb3VudCA9IE1hdGguY2VpbChzdGVwRmxvYXRDb3VudCk7XG4gICAgY29uc3QgbGFzdFN0ZXBMZW5ndGggPSBob3Jpem9udGFsRGlzdGFuY2UgLSAoc3RlcENvdW50IC0gMSkgKiBob3Jpem9udGFsU3RlcDtcbiAgICBjb25zdCB2YWxpZFN0ZXBDb3VudCA9IChsYXN0U3RlcExlbmd0aCA9PT0gMCB8fCBsYXN0U3RlcExlbmd0aCA+IExlbmd0aFRvbGVyYW5jZSkgPyBzdGVwQ291bnQgOiBzdGVwQ291bnQgLSAxO1xuICAgIGlmICh2YWxpZFN0ZXBDb3VudCA8IDEgfHwgdmFsaWRTdGVwQ291bnQgPj0gU3RlcENvdW50TGltaXQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoYmFzZUxpbmVTZWczZCkge1xuICAgICAgICBjb25zdCBiYXNlTGluZURpciA9IGJhc2VMaW5lU2VnM2QuZW5kLnN1YnRyYWN0ZWQoYmFzZUxpbmVTZWczZC5zdGFydCkubm9ybWFsaXplZCgpO1xuICAgICAgICBjb25zdCBhbmdsZSA9IGhvcml6b250YWxGcm9udERpci5hbmdsZShiYXNlTGluZURpcik7XG4gICAgICAgIGNvbnN0IGRlbHRhQW5nbGUgPSBNYXRoLmFicyhhbmdsZSAtIE1hdGguUEkgLyAyKTtcbiAgICAgICAgaWYgKGRlbHRhQW5nbGUgPD0gRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UpIHtcbiAgICAgICAgICAgIGhvcml6b250YWxGcm9udERpciA9IGJhc2VMaW5lRGlyLmNyb3NzKGhvcml6b250YWxGcm9udERpci5jcm9zcyhiYXNlTGluZURpcikpLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgIGhvcml6b250YWxEaXN0YW5jZSA9IGhvcml6b250YWxEaXN0YW5jZSAqIE1hdGguY29zKGRlbHRhQW5nbGUpO1xuICAgICAgICAgICAgaG9yaXpvbnRhbExlZnREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKGhvcml6b250YWxGcm9udERpcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoYW5nbGUgPCBNYXRoLlBJIC8gMikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvcm5lckNvbm5lY3Rpb25Qb2ludDEgPSBzdGFydC5hZGRlZChiYXNlTGluZURpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMiAqIE1hdGguc2lnbihhbmdsZSkpKTtcbiAgICAgICAgICAgICAgICBjb3JuZXJNb2xkU2hhcGUudmVydGljZXMgPSBbc3RhcnQsIHN0YXJ0LmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSksIGNvcm5lckNvbm5lY3Rpb25Qb2ludDFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29ybmVyQ29ubmVjdGlvblBvaW50MiA9IHN0YXJ0LmFkZGVkKGJhc2VMaW5lRGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIgKiBNYXRoLnNpZ24oYW5nbGUpKSk7XG4gICAgICAgICAgICAgICAgY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzID0gW3N0YXJ0LCBjb3JuZXJDb25uZWN0aW9uUG9pbnQyLCBzdGFydC5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29ybmVyTW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtbMCwgMV0sIFsxLCAyXSwgWzIsIDBdXTtcbiAgICAgICAgICAgIGNvcm5lclNoYXBlLnZlcnRpY2VzID0gW1xuICAgICAgICAgICAgICAgIC4uLmNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAodiA9PiB2LmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZChzdGFydEhlaWdodCkpKSxcbiAgICAgICAgICAgICAgICAuLi5jb3JuZXJNb2xkU2hhcGUudmVydGljZXMubWFwKHYgPT4gdi5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgLSBwbGF0Zm9ybVRoaWNrbmVzcykpKSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgIGNvcm5lclNoYXBlLnRlbXBMaW5lcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgWzAsIDFdLCBbMSwgMl0sIFsyLCAwXSxcbiAgICAgICAgICAgICAgICAgICAgWzMsIDRdLCBbNCwgNV0sIFs1LCAzXSxcbiAgICAgICAgICAgICAgICAgICAgWzAsIDNdLCBbMSwgNF0sIFsyLCA1XSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHN0ZXBIZWlnaHQgPSB1cHdhcmQgPyB2ZXJ0aWNhbFN0ZXAgOiAtdmVydGljYWxTdGVwO1xuICAgIHNlZ21lbnQuZW5kSGVpZ2h0ID0gc2VnbWVudC5zdGFydEhlaWdodCArIHZhbGlkU3RlcENvdW50ICogc3RlcEhlaWdodDtcbiAgICBzdGFpclNoYXBlLnN0ZXBDb3VudCA9IHZhbGlkU3RlcENvdW50O1xuICAgIG1vbGRTaGFwZS5zdGVwQ291bnQgPSB2YWxpZFN0ZXBDb3VudDtcbiAgICBjb25zdCBsZWZ0UHQgPSBzdGFydC5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSk7XG4gICAgY29uc3QgcmlnaHRQdCA9IHN0YXJ0LmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSk7XG4gICAgY29uc3Qgd2lkdGhEZWx0YSA9IChlbmRXaWR0aCAtIHN0YXJ0V2lkdGgpIC8gMiAvIChzdGVwRmxvYXRDb3VudCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGVwQ291bnQgLSAxOyBpKyspIHtcbiAgICAgICAgY29uc3QgY3VyTGVmdE1vbGRQdCA9IGxlZnRQdC5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChpICogaG9yaXpvbnRhbFN0ZXApKS5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKGkgKiB3aWR0aERlbHRhKSk7XG4gICAgICAgIGNvbnN0IGN1clJpZ2h0TW9sZFB0ID0gcmlnaHRQdC5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChpICogaG9yaXpvbnRhbFN0ZXApKS5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKC1pICogd2lkdGhEZWx0YSkpO1xuICAgICAgICBjb25zdCBjdXJMZWZ0UHQgPSBjdXJMZWZ0TW9sZFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCkpLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZChpICogc3RlcEhlaWdodCkpO1xuICAgICAgICBjb25zdCBjdXJSaWdodFB0ID0gY3VyUmlnaHRNb2xkUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkuYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKGkgKiBzdGVwSGVpZ2h0KSk7XG4gICAgICAgIG1vbGRWZXJ0aWNlcy5wdXNoKGN1ckxlZnRNb2xkUHQsIGN1clJpZ2h0TW9sZFB0KTtcbiAgICAgICAgbW9sZFRlbXBMaW5lcy5wdXNoKFsyICogaSwgMSArIDIgKiBpXSwgWzIgKiBpLCAyICsgMiAqIGldLCBbMSArIDIgKiBpLCAzICsgMiAqIGldKTtcbiAgICAgICAgdmVydGljZXMucHVzaChjdXJMZWZ0UHQsIGN1clJpZ2h0UHQpO1xuICAgICAgICBpZiAodXB3YXJkKSB7XG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKGN1ckxlZnRQdC5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLCBjdXJSaWdodFB0LmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmVydGljZXMucHVzaChjdXJMZWZ0UHQuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaG9yaXpvbnRhbFN0ZXApKSwgY3VyUmlnaHRQdC5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzQgKiBpLCAxICsgNCAqIGldLCBbNCAqIGksIDIgKyA0ICogaV0sIFsxICsgNCAqIGksIDMgKyA0ICogaV0sIFsyICsgNCAqIGksIDMgKyA0ICogaV0sIFsyICsgNCAqIGksIDQgKyA0ICogaV0sIFszICsgNCAqIGksIDUgKyA0ICogaV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIG1vbGRWZXJ0aWNlcy5wdXNoKHN0ZXBDb3VudCA+IDEgPyBtb2xkVmVydGljZXNbbW9sZFZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSkgOiBsZWZ0UHQsIHN0ZXBDb3VudCA+IDEgPyBtb2xkVmVydGljZXNbbW9sZFZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSkgOiByaWdodFB0KTtcbiAgICBtb2xkVGVtcExpbmVzLnB1c2goWzIgKiAoc3RlcENvdW50IC0gMSksIDEgKyAyICogKHN0ZXBDb3VudCAtIDEpXSk7XG4gICAgaWYgKGxhc3RTdGVwTGVuZ3RoID4gTGVuZ3RoVG9sZXJhbmNlIHx8IGxhc3RTdGVwTGVuZ3RoID09PSAwKSB7XG4gICAgICAgIG1vbGRWZXJ0aWNlcy5wdXNoKG1vbGRWZXJ0aWNlc1ttb2xkVmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwICogd2lkdGhEZWx0YSkpLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoKSksIG1vbGRWZXJ0aWNlc1ttb2xkVmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZCgtbGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcCAqIHdpZHRoRGVsdGEpKS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCkpKTtcbiAgICAgICAgbW9sZFRlbXBMaW5lcy5wdXNoKFsyICogKHN0ZXBDb3VudCAtIDEpLCAyICsgMiAqIChzdGVwQ291bnQgLSAxKV0sIFsxICsgMiAqIChzdGVwQ291bnQgLSAxKSwgMyArIDIgKiAoc3RlcENvdW50IC0gMSldLCBbMiAqIHN0ZXBDb3VudCwgMSArIDIgKiBzdGVwQ291bnRdKTtcbiAgICB9XG4gICAgaWYgKHVwd2FyZCkge1xuICAgICAgICB2ZXJ0aWNlcy5wdXNoKHN0ZXBDb3VudCA+IDEgPyB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpIDogbGVmdFB0LCBzdGVwQ291bnQgPiAxID8gdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaG9yaXpvbnRhbFN0ZXApKSA6IHJpZ2h0UHQpO1xuICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzQgKiAoc3RlcENvdW50IC0gMSksIDEgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxhc3RTdGVwTGVuZ3RoID4gTGVuZ3RoVG9sZXJhbmNlIHx8IGxhc3RTdGVwTGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXAgKiB3aWR0aERlbHRhKSkuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGgpKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZCgtbGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcCAqIHdpZHRoRGVsdGEpKS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCkpKTtcbiAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goXG4gICAgICAgICAgICAgICAgLy8gWzQgKiBzdGVwQ291bnQsIDEgKyA0ICogc3RlcENvdW50XSxcbiAgICAgICAgICAgICAgICBbNCAqIChzdGVwQ291bnQgLSAxKSwgMiArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMSArIDQgKiAoc3RlcENvdW50IC0gMSksIDMgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCAzICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsyICsgNCAqIChzdGVwQ291bnQgLSAxKSwgNCArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMyArIDQgKiAoc3RlcENvdW50IC0gMSksIDUgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzQgKiBzdGVwQ291bnQsIDEgKyA0ICogc3RlcENvdW50XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZlcnRpY2VzLnB1c2goc3RlcENvdW50ID4gMSA/IHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkgOiBsZWZ0UHQsIHN0ZXBDb3VudCA+IDEgPyB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpIDogcmlnaHRQdCk7XG4gICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbNCAqIChzdGVwQ291bnQgLSAxKSwgMSArIDQgKiAoc3RlcENvdW50IC0gMSldKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGFzdFN0ZXBMZW5ndGggPiBMZW5ndGhUb2xlcmFuY2UgfHwgbGFzdFN0ZXBMZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwICogd2lkdGhEZWx0YSkpLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoKSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoLWxhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXAgKiB3aWR0aERlbHRhKSkuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGgpKSk7XG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xuICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChcbiAgICAgICAgICAgICAgICAvLyBbNCAqIChzdGVwQ291bnQgLSAxKSwgMSArIDQgKiAoc3RlcENvdW50IC0gMSldLFxuICAgICAgICAgICAgICAgIFs0ICogKHN0ZXBDb3VudCAtIDEpLCAyICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsxICsgNCAqIChzdGVwQ291bnQgLSAxKSwgMyArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMiArIDQgKiAoc3RlcENvdW50IC0gMSksIDMgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCA0ICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFszICsgNCAqIChzdGVwQ291bnQgLSAxKSwgNSArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbNCAqIHN0ZXBDb3VudCwgMSArIDQgKiBzdGVwQ291bnRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoc3RlcENvdW50ID4gMSkge1xuICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIDIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMiArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDQgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCA1ICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFt2ZXJ0aWNlcy5sZW5ndGggKyAyLCAxICsgdmVydGljZXMubGVuZ3RoICsgMl0sIFt2ZXJ0aWNlcy5sZW5ndGggKyAyLCAwXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggKyAyLCAxXSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYWN0dWFsTGFzdFN0ZXBMZW5ndGggPSBsYXN0U3RlcExlbmd0aCA8IExlbmd0aFRvbGVyYW5jZSA/IGhvcml6b250YWxTdGVwIDogbGFzdFN0ZXBMZW5ndGg7XG4gICAgICAgIGlmICh1cHdhcmQpIHtcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0IC0gKDEgLSBhY3R1YWxMYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwKSAqIHN0ZXBIZWlnaHQpKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0IC0gKDEgLSBhY3R1YWxMYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwKSAqIHN0ZXBIZWlnaHQpKSk7XG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzWzBdLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSksIHZlcnRpY2VzWzFdLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZCgtYWN0dWFsTGFzdFN0ZXBMZW5ndGgpKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoLWFjdHVhbExhc3RTdGVwTGVuZ3RoKSkpO1xuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1swXS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1sxXS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSAyLCAyICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsxICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMiArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAwXSwgWzMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAxXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVwd2FyZCkge1xuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQpKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0KSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1swXS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1sxXS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGdlbmVyYXRlUGxhdGZvcm1TaGFwZShzZWdtZW50LCB0ZW1wID0gdHJ1ZSkge1xuICAgIGNvbnN0IHsgc3RhcnQsIHN0YXJ0SGVpZ2h0LCBiYXNlTGluZVNlZzNkLCBzdGFpclNoYXBlLCBtb2xkU2hhcGUsIGNvcm5lclNoYXBlLCBjb3JuZXJNb2xkU2hhcGUsIHBhcmFtIH0gPSBzZWdtZW50O1xuICAgIGNvbnN0IHsgc3RhcnRXaWR0aCwgb2Zmc2V0V2lkdGgsIHdpdGhPZmZzZXQsIHBsYXRmb3JtVGhpY2tuZXNzLCBwbGF0Zm9ybUxlbmd0aCwgcGxhdGZvcm1MZW5ndGhMb2NrZWQsIG1vZGVsRWRpdGluZyB9ID0gcGFyYW07XG4gICAgY29uc3QgY3VyRGlyID0gc2VnbWVudC5lbmQuc3VidHJhY3RlZChzdGFydCk7XG4gICAgY29uc3QgY3VyRGlyTm9ybWFsaXplZCA9IHNlZ21lbnQuZW5kLnN1YnRyYWN0ZWQoc3RhcnQpLm5vcm1hbGl6ZWQoKTtcbiAgICBjb25zdCBjdXJMZWZ0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhjdXJEaXIpLm5vcm1hbGl6ZWQoKTtcbiAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gW107XG4gICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXTtcbiAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXTtcbiAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW107XG4gICAgY29ybmVyU2hhcGUudmVydGljZXMgPSBbXTtcbiAgICBjb3JuZXJTaGFwZS50ZW1wTGluZXMgPSBbXTtcbiAgICBjb3JuZXJNb2xkU2hhcGUudmVydGljZXMgPSBbXTtcbiAgICBjb3JuZXJNb2xkU2hhcGUudGVtcExpbmVzID0gW107XG4gICAgc2VnbWVudC5lbmQgPSBwbGF0Zm9ybUxlbmd0aExvY2tlZCA/IHNlZ21lbnQuc3RhcnQuYWRkZWQoY3VyRGlyTm9ybWFsaXplZC5tdWx0aXBsaWVkKHBsYXRmb3JtTGVuZ3RoKSkgOiBzZWdtZW50LmVuZDtcbiAgICBzZWdtZW50LmVuZEhlaWdodCA9IHN0YXJ0SGVpZ2h0O1xuICAgIGlmICghbW9kZWxFZGl0aW5nKSB7XG4gICAgICAgIHBhcmFtLndpdGhPZmZzZXQgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGJhc2VMaW5lU2VnM2QpIHtcbiAgICAgICAgY29uc3QgeyBzdGFydDogYmFzZUxpbmVTdGFydCwgZW5kOiBiYXNlTGluZUVuZCB9ID0gYmFzZUxpbmVTZWczZDtcbiAgICAgICAgY29uc3QgYmFzZUxpbmVEaXIgPSBiYXNlTGluZUVuZC5zdWJ0cmFjdGVkKGJhc2VMaW5lU3RhcnQpLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgY29uc3QgcHJldkRpck5vcm1hbGl6ZWQgPSBiYXNlTGluZURpci5jcm9zcyhEaXJlY3Rpb25aKS5ub3JtYWxpemVkKCk7XG4gICAgICAgIGNvbnN0IHByZXZMZWZ0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhwcmV2RGlyTm9ybWFsaXplZCkubm9ybWFsaXplZCgpO1xuICAgICAgICBjb25zdCBhbmdsZSA9IGN1ckRpci5hbmdsZVRvKHByZXZEaXJOb3JtYWxpemVkLCBEaXJlY3Rpb25aKTtcbiAgICAgICAgY29uc3QgZnJvbnRMZW5ndGggPSBwbGF0Zm9ybUxlbmd0aExvY2tlZCA/IHBsYXRmb3JtTGVuZ3RoIDogTWF0aC5hYnMoY3VyRGlyLmRvdChwcmV2RGlyTm9ybWFsaXplZCkpO1xuICAgICAgICBjb25zdCBjdXJFbmRMZWZ0Q29ybmVyID0gc2VnbWVudC5lbmQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSk7XG4gICAgICAgIGNvbnN0IGRpcjEgPSBjdXJFbmRMZWZ0Q29ybmVyLnN1YnRyYWN0ZWQoc2VnbWVudC5zdGFydCk7XG4gICAgICAgIGNvbnN0IGFuZ2xlMSA9IGRpcjEuYW5nbGUoY3VyRGlyKTtcbiAgICAgICAgaWYgKChhbmdsZSA+PSBNYXRoLlBJICYmIGFuZ2xlIDw9IChNYXRoLlBJICogMyAvIDIgKyBhbmdsZTEpKSB8fCAobW9kZWxFZGl0aW5nICYmIHdpdGhPZmZzZXQgJiYgb2Zmc2V0V2lkdGggPj0gMCkpIHtcbiAgICAgICAgICAgIHBhcmFtLnBsYXRmb3JtTGVuZ3RoID0gZnJvbnRMZW5ndGg7XG4gICAgICAgICAgICBjb25zdCBmcm9udEVuZCA9IHNlZ21lbnQuc3RhcnQuYWRkZWQocHJldkRpck5vcm1hbGl6ZWQubXVsdGlwbGllZChmcm9udExlbmd0aCkpO1xuICAgICAgICAgICAgc2VnbWVudC5lbmQgPSBmcm9udEVuZDtcbiAgICAgICAgICAgIGNvbnN0IGxlZnRMZW5ndGggPSB3aXRoT2Zmc2V0ICYmIG1vZGVsRWRpdGluZyA/IChvZmZzZXRXaWR0aCArIHN0YXJ0V2lkdGggLyAyKSA6IGN1ckRpci5kb3QocHJldkxlZnREaXIpO1xuICAgICAgICAgICAgaWYgKGxlZnRMZW5ndGggPiBzdGFydFdpZHRoIC8gMikge1xuICAgICAgICAgICAgICAgIHBhcmFtLndpdGhPZmZzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHBhcmFtLm9mZnNldFdpZHRoID0gbGVmdExlbmd0aCAtIHN0YXJ0V2lkdGggLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdmFsaWRMZWZ0TGVuZ3RoID0gTWF0aC5tYXgoc3RhcnRXaWR0aCAvIDIsIGxlZnRMZW5ndGgpO1xuICAgICAgICAgICAgbW9sZFNoYXBlLnZlcnRpY2VzID0gW1xuICAgICAgICAgICAgICAgIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQodmFsaWRMZWZ0TGVuZ3RoKSksXG4gICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQodmFsaWRMZWZ0TGVuZ3RoKSksXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtbMCwgMV0sIFsxLCAyXSwgWzIsIDNdLCBbMywgMF1dO1xuICAgICAgICAgICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFsuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKSksXG4gICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0IC0gcGxhdGZvcm1UaGlja25lc3MpKSksXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICBzdGFpclNoYXBlLnRlbXBMaW5lcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcyxcbiAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcy5tYXAoc2VnID0+IFtzZWdbMF0gKyA0LCBzZWdbMV0gKyA0XSksXG4gICAgICAgICAgICAgICAgICAgIFswLCA0XSwgWzEsIDVdLCBbMiwgNl0sIFszLCA3XSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKChhbmdsZSA8IE1hdGguUEkgJiYgYW5nbGUgPj0gKE1hdGguUEkgLyAyIC0gYW5nbGUxKSkgfHwgKG1vZGVsRWRpdGluZyAmJiB3aXRoT2Zmc2V0ICYmIG9mZnNldFdpZHRoIDwgMCkpIHtcbiAgICAgICAgICAgIHBhcmFtLnBsYXRmb3JtTGVuZ3RoID0gZnJvbnRMZW5ndGg7XG4gICAgICAgICAgICBjb25zdCByaWdodExlbmd0aCA9IHdpdGhPZmZzZXQgJiYgbW9kZWxFZGl0aW5nID8gKC1vZmZzZXRXaWR0aCArIHN0YXJ0V2lkdGggLyAyKSA6IC1jdXJEaXIuZG90KHByZXZMZWZ0RGlyKTtcbiAgICAgICAgICAgIGNvbnN0IGZyb250RW5kMSA9IHNlZ21lbnQuc3RhcnQuYWRkZWQocHJldkRpck5vcm1hbGl6ZWQubXVsdGlwbGllZChmcm9udExlbmd0aCkpO1xuICAgICAgICAgICAgc2VnbWVudC5lbmQgPSBmcm9udEVuZDE7XG4gICAgICAgICAgICBpZiAocmlnaHRMZW5ndGggPiBzdGFydFdpZHRoIC8gMikge1xuICAgICAgICAgICAgICAgIHBhcmFtLndpdGhPZmZzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHBhcmFtLm9mZnNldFdpZHRoID0gLShyaWdodExlbmd0aCAtIHN0YXJ0V2lkdGggLyAyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHZhbGlkUmlnaHRMZW5ndGggPSBNYXRoLm1heChzdGFydFdpZHRoIC8gMiwgcmlnaHRMZW5ndGgpO1xuICAgICAgICAgICAgbW9sZFNoYXBlLnZlcnRpY2VzID0gW1xuICAgICAgICAgICAgICAgIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC12YWxpZFJpZ2h0TGVuZ3RoKSksXG4gICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtdmFsaWRSaWdodExlbmd0aCkpLFxuICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgM10sIFszLCAwXV07XG4gICAgICAgICAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gWy4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCkpKSxcbiAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgLSBwbGF0Zm9ybVRoaWNrbmVzcykpKSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW1xuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLFxuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLm1hcChzZWcgPT4gW3NlZ1swXSArIDQsIHNlZ1sxXSArIDRdKSxcbiAgICAgICAgICAgICAgICAgICAgWzAsIDRdLCBbMSwgNV0sIFsyLCA2XSwgWzMsIDddLFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwYXJhbS5vZmZzZXRXaWR0aCA9IDA7XG4gICAgICAgICAgICBpZiAoYW5nbGUgPD0gRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UgfHwgYW5nbGUgPj0gKE1hdGguUEkgKiAyIC0gRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UpKSB7XG4gICAgICAgICAgICAgICAgc2VnbWVudC5lbmQgPSBzZWdtZW50LnN0YXJ0LmFkZGVkKHByZXZEaXJOb3JtYWxpemVkLm11bHRpcGxpZWQoZnJvbnRMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICBwYXJhbS5wbGF0Zm9ybUxlbmd0aCA9IGZyb250TGVuZ3RoO1xuICAgICAgICAgICAgICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMiArIG9mZnNldFdpZHRoKSksXG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyICsgb2Zmc2V0V2lkdGgpKSxcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtbMCwgMV0sIFsxLCAyXSwgWzIsIDNdLCBbMywgMF1dO1xuICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkpLFxuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgLSBwbGF0Zm9ybVRoaWNrbmVzcykpKSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMubWFwKHNlZyA9PiBbc2VnWzBdICsgNCwgc2VnWzFdICsgNF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgWzAsIDRdLCBbMSwgNV0sIFsyLCA2XSwgWzMsIDddLFxuICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKERpcmVjdGlvbkFuZ2xlVG9sZXJhbmNlIDwgYW5nbGUgJiYgYW5nbGUgPCAoTWF0aC5QSSAvIDIgLSBhbmdsZTEpKSB7XG4gICAgICAgICAgICAgICAgcGFyYW0ucGxhdGZvcm1MZW5ndGggPSBzZWdtZW50LmVuZC5kaXN0YW5jZVRvKHNlZ21lbnQuc3RhcnQpO1xuICAgICAgICAgICAgICAgIGxldCBsZWZ0Q29ubmVjdFBvaW50cyA9IFtzdGFydC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSwgYmFzZUxpbmVFbmRdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VMaW5lRW5kRGlzdGFuY2UgPSBzdGFydC5kaXN0YW5jZVRvKGJhc2VMaW5lRW5kKTtcbiAgICAgICAgICAgICAgICBjb25zdCBsZWZ0UHJvamVjdERpc3RhbmNlID0gc3RhcnRXaWR0aCAvIDIgKiBNYXRoLmNvcyhhbmdsZSk7XG4gICAgICAgICAgICAgICAgaWYgKGxlZnRQcm9qZWN0RGlzdGFuY2UgPCBiYXNlTGluZUVuZERpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGwxID0gc3RhcnRXaWR0aCAvIDIgLyBNYXRoLmNvcyhhbmdsZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsMSA+IGJhc2VMaW5lRW5kRGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGExID0gbDEgLSBiYXNlTGluZUVuZERpc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYzEgPSBhMSAvIE1hdGgudGFuKGFuZ2xlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRDb25uZWN0UG9pbnRzID0gW3N0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoYmFzZUxpbmVFbmREaXN0YW5jZSkpLmFkZGVkKHByZXZEaXJOb3JtYWxpemVkLm11bHRpcGxpZWQoYzEpKSwgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChiYXNlTGluZUVuZERpc3RhbmNlKSldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdENvbm5lY3RQb2ludHMgPSBbc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChsMSkpXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgIC8vIHN0YXJ0LmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgICAgICAgICAuLi5sZWZ0Q29ubmVjdFBvaW50cyxcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIgLyBNYXRoLmNvcyhhbmdsZSkpKSxcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vbGRWZXJ0ZXhDb3VudCA9IG1vbGRTaGFwZS52ZXJ0aWNlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IGdlbmVyYXRlVGVtcExpbmVzTG9vcChtb2xkVmVydGV4Q291bnQpO1xuICAgICAgICAgICAgICAgIC8vIGlmIChtb2xkVmVydGV4Q291bnQgPT09IDQpIHtcbiAgICAgICAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgM10sIFszLCA0XSwgWzQsIDBdXTtcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFsuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKSksXG4gICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCAtIHBsYXRmb3JtVGhpY2tuZXNzKSkpLFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcy5tYXAoc2VnID0+IFtzZWdbMF0gKyBtb2xkVmVydGV4Q291bnQsIHNlZ1sxXSArIG1vbGRWZXJ0ZXhDb3VudF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcy5tYXAoc2VnID0+IFtzZWdbMF0sIHNlZ1swXSArIG1vbGRWZXJ0ZXhDb3VudF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gWzAsIDVdLCBbMSwgNl0sIFsyLCA3XSwgWzMsIDhdLCBbNCwgOV0sXG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYW5nbGUgPiAoTWF0aC5QSSAqIDMgLyAyICsgYW5nbGUxKSAmJiBhbmdsZSA8IChNYXRoLlBJICogMiAtIERpcmVjdGlvbkFuZ2xlVG9sZXJhbmNlKSkge1xuICAgICAgICAgICAgICAgIHBhcmFtLnBsYXRmb3JtTGVuZ3RoID0gc2VnbWVudC5lbmQuZGlzdGFuY2VUbyhzZWdtZW50LnN0YXJ0KTtcbiAgICAgICAgICAgICAgICBsZXQgcmlnaHRDb25uZWN0UG9pbnRzID0gW2Jhc2VMaW5lU3RhcnQsIHN0YXJ0LmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKV07XG4gICAgICAgICAgICAgICAgY29uc3QgYmFzZUxpbmVTdGFydERpc3RhbmNlID0gc3RhcnQuZGlzdGFuY2VUbyhiYXNlTGluZVN0YXJ0KTtcbiAgICAgICAgICAgICAgICBjb25zdCByaWdodFByb2plY3REaXN0YW5jZSA9IHN0YXJ0V2lkdGggLyAyICogTWF0aC5jb3MoYW5nbGUpO1xuICAgICAgICAgICAgICAgIGlmIChyaWdodFByb2plY3REaXN0YW5jZSA8IGJhc2VMaW5lU3RhcnREaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgcmlnaHRDb25uZWN0UG9pbnRzID0gW2Jhc2VMaW5lU3RhcnQsIGJhc2VMaW5lU3RhcnRdO1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiAoc3RhcnRXaWR0aCA8PSBwcmV2UGFyYW0uZW5kV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbDIgPSBzdGFydFdpZHRoIC8gMiAvIE1hdGguY29zKGFuZ2xlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGwyID4gYmFzZUxpbmVTdGFydERpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhMiA9IGwyIC0gYmFzZUxpbmVTdGFydERpc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYzIgPSBhMiAvIE1hdGgudGFuKE1hdGguUEkgKiAyIC0gYW5nbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHRDb25uZWN0UG9pbnRzID0gW3N0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLWJhc2VMaW5lU3RhcnREaXN0YW5jZSkpLCBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC1iYXNlTGluZVN0YXJ0RGlzdGFuY2UpKS5hZGRlZChwcmV2RGlyTm9ybWFsaXplZC5tdWx0aXBsaWVkKGMyKSldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHRDb25uZWN0UG9pbnRzID0gW3N0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLWwyKSldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMiAvIE1hdGguY29zKGFuZ2xlKSkpLFxuICAgICAgICAgICAgICAgICAgICAuLi5yaWdodENvbm5lY3RQb2ludHMsXG4gICAgICAgICAgICAgICAgICAgIC8vIHN0YXJ0LmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vbGRWZXJ0ZXhDb3VudCA9IG1vbGRTaGFwZS52ZXJ0aWNlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IGdlbmVyYXRlVGVtcExpbmVzTG9vcChtb2xkVmVydGV4Q291bnQpO1xuICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkpLFxuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgLSBwbGF0Zm9ybVRoaWNrbmVzcykpKSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMubWFwKHNlZyA9PiBbc2VnWzBdICsgbW9sZFZlcnRleENvdW50LCBzZWdbMV0gKyBtb2xkVmVydGV4Q291bnRdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMubWFwKHNlZyA9PiBbc2VnWzBdLCBzZWdbMF0gKyBtb2xkVmVydGV4Q291bnRdKSxcbiAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcGFyYW0ucGxhdGZvcm1MZW5ndGggPSBzZWdtZW50LmVuZC5kaXN0YW5jZVRvKHNlZ21lbnQuc3RhcnQpO1xuICAgICAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXG4gICAgICAgICAgICBzdGFydC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgIHN0YXJ0LmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpLFxuICAgICAgICBdO1xuICAgICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgM10sIFszLCAwXV07XG4gICAgICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbLi4ubW9sZFNoYXBlLnZlcnRpY2VzLFxuICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1wbGF0Zm9ybVRoaWNrbmVzcykpKSxcbiAgICAgICAgXTtcbiAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW1xuICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMsXG4gICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcy5tYXAoc2VnID0+IFtzZWdbMF0gKyA0LCBzZWdbMV0gKyA0XSksXG4gICAgICAgICAgICAgICAgWzAsIDRdLCBbMSwgNV0sIFsyLCA2XSwgWzMsIDddLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGdlbmVyYXRlVGVtcExpbmVzTG9vcCh2ZXJ0ZXhDb3VudCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiB2ZXJ0ZXhDb3VudCB9KS5tYXAoKF8sIGkpID0+IFtpLCBpID09PSB2ZXJ0ZXhDb3VudCAtIDEgPyAwIDogaSArIDFdKTtcbn1cbiIsImV4cG9ydCBjb25zdCBTdGFpck1vZGVsS2V5ID0gJ0RyYXdTdGFpcnNNb2RlbCc7XG5leHBvcnQgY29uc3QgU3RhaXJNb2RlbFZhbHVlID0gJzEnO1xuLy8gZXhwb3J0IGNvbnN0IFN0YWlyS2V5ID0gJ0RTU3RhaXInO1xuLy8gZXhwb3J0IGNvbnN0IFBsYXRmb3JtS2V5ID0gJ0RTUGxhdGZvcm0nO1xuZXhwb3J0IGNvbnN0IFBhcmFtS2V5ID0gJ0RTUGFyYW0nO1xuLy8gc3RhcnRIZWlnaHQgYW5kIGVuZEhlaWdodCBjYWNoZWQgaW4gc3RhcnQgYW5kIGVuZFxuZXhwb3J0IGNvbnN0IENvbXBvbmVudEluZGV4S2V5ID0gJ0luZCc7XG5leHBvcnQgY29uc3QgU3RhcnRFbmRLZXkgPSAnU1RvRSc7XG5leHBvcnQgY29uc3QgQmFzZUxpbmVTZWczZEtleSA9ICdCYXNlTGluZSc7XG5leHBvcnQgY29uc3QgQ2lyY2xlVGFuZ2VudEtleSA9ICdDaXJjbGVUYW5nZW50JztcbmV4cG9ydCBjb25zdCBEZWxpbWl0ZXIgPSAnJic7XG5leHBvcnQgY29uc3QgQ29vcmREZWxpbWl0ZXIgPSAnLCc7XG5leHBvcnQgdmFyIENvbXBvbmVudFBhcmFtVHlwZTtcbihmdW5jdGlvbiAoQ29tcG9uZW50UGFyYW1UeXBlKSB7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSG9yaXpvbnRhbFN0ZXBcIl0gPSBcImhvcml6b250YWxTdGVwXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiVmVydGljYWxTdGVwXCJdID0gXCJ2ZXJ0aWNhbFN0ZXBcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJTdGFydFdpZHRoXCJdID0gXCJzdGFydFdpZHRoXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiRW5kV2lkdGhcIl0gPSBcImVuZFdpZHRoXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiU3RlcFByb3BvcnRpb25hbFwiXSA9IFwic3RlcFByb3BvcnRpb25hbFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIldpZHRoUHJvcG9ydGlvbmFsXCJdID0gXCJ3aWR0aFByb3BvcnRpb25hbFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIlBsYXRmb3JtTGVuZ3RoXCJdID0gXCJwbGF0Zm9ybUxlbmd0aFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIlBsYXRmb3JtTGVuZ3RoTG9ja2VkXCJdID0gXCJwbGF0Zm9ybUxlbmd0aExvY2tlZFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIlR5cGVcIl0gPSBcInR5cGVcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJVcHdhcmRcIl0gPSBcInVwd2FyZFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIlBsYXRmb3JtVGhpY2tuZXNzXCJdID0gXCJwbGF0Zm9ybVRoaWNrbmVzc1wiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsXCJdID0gXCJoYW5kcmFpbFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsSGVpZ2h0XCJdID0gXCJoYW5kcmFpbEhlaWdodFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsUmFpbFR5cGVcIl0gPSBcImhhbmRyYWlsUmFpbFR5cGVcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIYW5kcmFpbFJhaWxSYWRpdXNcIl0gPSBcImhhbmRyYWlsUmFpbFJhZGl1c1wiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsUmFpbFdpZHRoXCJdID0gXCJoYW5kcmFpbFJhaWxXaWR0aFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsUmFpbEhlaWdodFwiXSA9IFwiaGFuZHJhaWxSYWlsSGVpZ2h0XCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSGFuZHJhaWxDb2x1bW5UeXBlXCJdID0gXCJoYW5kcmFpbENvbHVtblR5cGVcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIYW5kcmFpbENvbHVtblN0ZXBcIl0gPSBcImhhbmRyYWlsQ29sdW1uU3RlcFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsQ29sdW1uUmFkaXVzXCJdID0gXCJoYW5kcmFpbENvbHVtblJhZGl1c1wiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsQ29sdW1uV2lkdGhcIl0gPSBcImhhbmRyYWlsQ29sdW1uV2lkdGhcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIYW5kcmFpbENvbHVtbkhlaWdodFwiXSA9IFwiaGFuZHJhaWxDb2x1bW5IZWlnaHRcIjtcbn0pKENvbXBvbmVudFBhcmFtVHlwZSB8fCAoQ29tcG9uZW50UGFyYW1UeXBlID0ge30pKTtcbi8vIGludGVyZmFjZSBQYXJhbVNldHRpbmdzIHtcbi8vICAgICBtaW46IG51bWJlcjtcbi8vICAgICBtYXg6IG51bWJlcjtcbi8vICAgICBzdGVwOiBudW1iZXI7XG4vLyAgICAgdW5pdDogc3RyaW5nO1xuLy8gICAgIHByZWNpc2lvbjogbnVtYmVyO1xuLy8gfVxuZXhwb3J0IHZhciBDb21wb25lbnRUeXBlO1xuKGZ1bmN0aW9uIChDb21wb25lbnRUeXBlKSB7XG4gICAgQ29tcG9uZW50VHlwZVtDb21wb25lbnRUeXBlW1wiU3RyYWlnaHRTdGFpclwiXSA9IDBdID0gXCJTdHJhaWdodFN0YWlyXCI7XG4gICAgQ29tcG9uZW50VHlwZVtDb21wb25lbnRUeXBlW1wiQ2lyY3VsYXJTdGFpclwiXSA9IDFdID0gXCJDaXJjdWxhclN0YWlyXCI7XG4gICAgQ29tcG9uZW50VHlwZVtDb21wb25lbnRUeXBlW1wiUGxhdGZvcm1cIl0gPSAyXSA9IFwiUGxhdGZvcm1cIjtcbn0pKENvbXBvbmVudFR5cGUgfHwgKENvbXBvbmVudFR5cGUgPSB7fSkpO1xuZXhwb3J0IHZhciBSYWlsVHlwZTtcbihmdW5jdGlvbiAoUmFpbFR5cGUpIHtcbiAgICBSYWlsVHlwZVtSYWlsVHlwZVtcIkNpcmNsZVwiXSA9IDBdID0gXCJDaXJjbGVcIjtcbiAgICBSYWlsVHlwZVtSYWlsVHlwZVtcIlJlY3RcIl0gPSAxXSA9IFwiUmVjdFwiO1xuICAgIFJhaWxUeXBlW1JhaWxUeXBlW1wiQ3VzdG9tXCJdID0gOTldID0gXCJDdXN0b21cIjtcbn0pKFJhaWxUeXBlIHx8IChSYWlsVHlwZSA9IHt9KSk7XG5leHBvcnQgdmFyIENvbHVtblR5cGU7XG4oZnVuY3Rpb24gKENvbHVtblR5cGUpIHtcbiAgICBDb2x1bW5UeXBlW0NvbHVtblR5cGVbXCJDaXJjbGVcIl0gPSAwXSA9IFwiQ2lyY2xlXCI7XG4gICAgQ29sdW1uVHlwZVtDb2x1bW5UeXBlW1wiUmVjdFwiXSA9IDFdID0gXCJSZWN0XCI7XG4gICAgQ29sdW1uVHlwZVtDb2x1bW5UeXBlW1wiQ3VzdG9tXCJdID0gOTldID0gXCJDdXN0b21cIjtcbn0pKENvbHVtblR5cGUgfHwgKENvbHVtblR5cGUgPSB7fSkpO1xuZXhwb3J0IGNvbnN0IENvbXBvbmVudFBhcmFtU2V0dGluZ3MgPSB7XG4gICAgaG9yaXpvbnRhbFN0ZXA6IHsgdGl0bGU6IFwi5q2l6ZW/XCIsIG1pbjogMSwgbWF4OiAxMDAwMDAsIHN0ZXA6IDEwLCB1bml0OiAn6ZW/JywgcHJlY2lzaW9uOiAwLCB9LFxuICAgIHZlcnRpY2FsU3RlcDogeyB0aXRsZTogXCLmraXplb9cIiwgbWluOiAxLCBtYXg6IDEwMDAwMCwgc3RlcDogMTAsIHVuaXQ6ICfpq5gnLCBwcmVjaXNpb246IDAsIH0sXG4gICAgc3RhcnRXaWR0aDogeyB0aXRsZTogXCLlrr3luqZcIiwgbWluOiAxLCBtYXg6IDEwMDAwMCwgc3RlcDogNTAsIHVuaXQ6ICfotbcnLCBwcmVjaXNpb246IDAsIH0sXG4gICAgZW5kV2lkdGg6IHsgdGl0bGU6IFwi5a695bqmXCIsIG1pbjogMSwgbWF4OiAxMDAwMDAsIHN0ZXA6IDUwLCB1bml0OiAn57uIJywgcHJlY2lzaW9uOiAwLCB9LFxuICAgIHBsYXRmb3JtTGVuZ3RoOiB7IHRpdGxlOiBcIumVv+W6plwiLCBtaW46IDEwMCwgbWF4OiAxMDAwMDAsIHN0ZXA6IDUwLCB1bml0OiAnJywgcHJlY2lzaW9uOiAwLCB9LFxuICAgIHR5cGU6IHtcbiAgICAgICAgLy8gcmFkaW9WYWx1ZXM6IFtDb21wb25lbnRUeXBlLlN0cmFpZ2h0U3RhaXIsIENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpciwgQ29tcG9uZW50VHlwZS5QbGF0Zm9ybV0sXG4gICAgICAgIC8vIHRleHRzOiBbXCLnm7TpmLZcIiwgXCLml4vovazpmLbmoq9cIiwgXCLlubPlj7BcIl0sXG4gICAgICAgIHRpdGxlOiBcIuexu+Wei1wiLFxuICAgICAgICByYWRpb09wdGlvbnM6IFtcbiAgICAgICAgICAgIHsgdmFsdWU6IENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpciwgdGV4dDogXCLnm7TpmLZcIiB9LFxuICAgICAgICAgICAgeyB2YWx1ZTogQ29tcG9uZW50VHlwZS5DaXJjdWxhclN0YWlyLCB0ZXh0OiBcIuaXi+i9rOmYtuair1wiIH0sXG4gICAgICAgICAgICB7IHZhbHVlOiBDb21wb25lbnRUeXBlLlBsYXRmb3JtLCB0ZXh0OiBcIuW5s+WPsFwiIH0sXG4gICAgICAgIF1cbiAgICB9LFxuICAgIHVwd2FyZDoge1xuICAgICAgICAvLyByYWRpb1ZhbHVlczogWzEsIDBdLFxuICAgICAgICAvLyB0ZXh0czogW1wi5ZCR5LiKXCIsIFwi5ZCR5LiLXCJdLFxuICAgICAgICB0aXRsZTogXCLmlrnlkJFcIixcbiAgICAgICAgcmFkaW9PcHRpb25zOiBbXG4gICAgICAgICAgICB7IHZhbHVlOiB0cnVlLCB0ZXh0OiBcIuWQkeS4ilwiIH0sXG4gICAgICAgICAgICB7IHZhbHVlOiBmYWxzZSwgdGV4dDogXCLlkJHkuItcIiB9LFxuICAgICAgICBdXG4gICAgfSxcbiAgICBwbGF0Zm9ybVRoaWNrbmVzczogeyB0aXRsZTogXCLljprluqZcIiwgbWluOiAxLCBtYXg6IDEwMDAwMCwgc3RlcDogMTAsIHVuaXQ6ICcnLCBwcmVjaXNpb246IDAsIH0sXG4gICAgaGFuZHJhaWw6IHtcbiAgICAgICAgdGl0bGU6ICfmoI/mnYYnLFxuICAgICAgICBoZWlnaHQ6IHsgdGl0bGU6IFwi6auY5bqmXCIsIG1pbjogMSwgbWF4OiAxMDAwMDAsIHN0ZXA6IDEwLCB1bml0OiAnJywgcHJlY2lzaW9uOiAwLCB9LFxuICAgICAgICByYWlsOiB7XG4gICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi5qC35byPXCIsXG4gICAgICAgICAgICAgICAgc2VsZWN0T3B0aW9uczogW1xuICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBSYWlsVHlwZS5DaXJjbGUsIHRleHQ6IFwi5ZyG5b2iXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogUmFpbFR5cGUuUmVjdCwgdGV4dDogXCLmlrnlvaJcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBSYWlsVHlwZS5DdXN0b20sIHRleHQ6IFwi6Ieq5a6a5LmJXCIgfSxcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBjb2x1bW46IHtcbiAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogXCLmoLflvI9cIixcbiAgICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IENvbHVtblR5cGUuQ2lyY2xlLCB0ZXh0OiBcIuWchuW9olwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IENvbHVtblR5cGUuUmVjdCwgdGV4dDogXCLmlrnlvaJcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBDb2x1bW5UeXBlLkN1c3RvbSwgdGV4dDogXCLoh6rlrprkuYlcIiB9LFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdGVwOiB7IHRpdGxlOiBcIumXtOmalFwiLCBtaW46IDEsIG1heDogMTAwMDAwLCBzdGVwOiAxMCwgdW5pdDogJycsIHByZWNpc2lvbjogMCwgfSxcbiAgICAgICAgfSxcbiAgICAgICAgY29tcG9uZW50UGFyYW06IHtcbiAgICAgICAgICAgIHJhZGl1czogeyB0aXRsZTogXCLljYrlvoRcIiwgbWluOiAxLCBtYXg6IDEwMDAwMCwgc3RlcDogMTAsIHVuaXQ6ICcnLCBwcmVjaXNpb246IDAsIH0sXG4gICAgICAgICAgICB3aWR0aDogeyB0aXRsZTogXCLlrr3luqZcIiwgbWluOiAxLCBtYXg6IDEwMDAwMCwgc3RlcDogMTAsIHVuaXQ6ICcnLCBwcmVjaXNpb246IDAsIH0sXG4gICAgICAgICAgICBoZWlnaHQ6IHsgdGl0bGU6IFwi6auY5bqmXCIsIG1pbjogMSwgbWF4OiAxMDAwMDAsIHN0ZXA6IDEwLCB1bml0OiAnJywgcHJlY2lzaW9uOiAwLCB9LFxuICAgICAgICB9XG4gICAgfVxufTtcbmV4cG9ydCBmdW5jdGlvbiBnZXRDb21wb25lbnRUaXRsZShjb21wb25lbnRUeXBlKSB7XG4gICAgaWYgKGNvbXBvbmVudFR5cGUgPT09IENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpcikge1xuICAgICAgICByZXR1cm4gJ+ebtCc7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNvbXBvbmVudFR5cGUgPT09IENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpcikge1xuICAgICAgICByZXR1cm4gJ+aXiyc7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gJ+WPsCc7XG4gICAgfVxufVxuZXhwb3J0IGNvbnN0IERlZmF1bHRTdGFpclBhcmFtID0ge1xuICAgIGhvcml6b250YWxTdGVwOiAyNTAsXG4gICAgdmVydGljYWxTdGVwOiAyNTAsXG4gICAgc3RhcnRXaWR0aDogMTAwMCxcbiAgICBlbmRXaWR0aDogMTAwMCxcbiAgICB1cHdhcmQ6IHRydWUsXG4gICAgcGxhdGZvcm1UaGlja25lc3M6IDIwMCxcbiAgICBoYW5kcmFpbDoge1xuICAgICAgICBzdXBwb3J0OiB0cnVlLFxuICAgICAgICBoZWlnaHQ6IDUwMCxcbiAgICAgICAgcmFpbDoge1xuICAgICAgICAgICAgdHlwZTogUmFpbFR5cGUuQ2lyY2xlLFxuICAgICAgICAgICAgcGFyYW06IHsgcmFkaXVzOiA1MCB9LFxuICAgICAgICB9LFxuICAgICAgICBjb2x1bW46IHtcbiAgICAgICAgICAgIHR5cGU6IENvbHVtblR5cGUuQ2lyY2xlLFxuICAgICAgICAgICAgc3RlcDogNTAwLFxuICAgICAgICAgICAgcGFyYW06IHsgcmFkaXVzOiA1MCB9LFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgc3RlcFByb3BvcnRpb25hbDogdHJ1ZSxcbiAgICB3aWR0aFByb3BvcnRpb25hbDogdHJ1ZSxcbn07XG5leHBvcnQgY29uc3QgRGVmYXVsdENvbXBvbmVudFBhcmFtID0ge1xuICAgIGluZGV4OiAwLFxuICAgIGhvcml6b250YWxTdGVwOiBEZWZhdWx0U3RhaXJQYXJhbS5ob3Jpem9udGFsU3RlcCxcbiAgICB2ZXJ0aWNhbFN0ZXA6IERlZmF1bHRTdGFpclBhcmFtLnZlcnRpY2FsU3RlcCxcbiAgICBzdGFydFdpZHRoOiBEZWZhdWx0U3RhaXJQYXJhbS5zdGFydFdpZHRoLFxuICAgIGVuZFdpZHRoOiBEZWZhdWx0U3RhaXJQYXJhbS5lbmRXaWR0aCxcbiAgICBvZmZzZXRXaWR0aDogMCxcbiAgICB3aXRoT2Zmc2V0OiBmYWxzZSxcbiAgICBwbGF0Zm9ybUxlbmd0aDogMjAwMCxcbiAgICB0eXBlOiBDb21wb25lbnRUeXBlLlN0cmFpZ2h0U3RhaXIsXG4gICAgdXB3YXJkOiBEZWZhdWx0U3RhaXJQYXJhbS51cHdhcmQsXG4gICAgcGxhdGZvcm1UaGlja25lc3M6IERlZmF1bHRTdGFpclBhcmFtLnBsYXRmb3JtVGhpY2tuZXNzLFxuICAgIHN0ZXBQcm9wb3J0aW9uYWw6IERlZmF1bHRTdGFpclBhcmFtLnN0ZXBQcm9wb3J0aW9uYWwsXG4gICAgd2lkdGhQcm9wb3J0aW9uYWw6IHRydWUsXG4gICAgcGxhdGZvcm1MZW5ndGhMb2NrZWQ6IGZhbHNlLFxuICAgIC8vIHN0ZXBUeXBlOiBTdGVwVHlwZS5Ob3JtYWwsXG4gICAgLy8gY29ybmVyVHlwZTogQ29ybmVyVHlwZS5SZWN0YW5nbGUsXG59O1xuZXhwb3J0IGZ1bmN0aW9uIGlzQXhpc1ZhbGlkKGF4aXMpIHtcbiAgICByZXR1cm4gYXhpcyA9PT0gXCJYXCIgLyogQXhpcy5YICovIHx8IGF4aXMgPT09IFwiLVhcIiAvKiBBeGlzLlhNaW51cyAqLyB8fCBheGlzID09PSBcIllcIiAvKiBBeGlzLlkgKi8gfHwgYXhpcyA9PT0gXCItWVwiIC8qIEF4aXMuWU1pbnVzICovIHx8IGF4aXMgPT09IFwiWlwiIC8qIEF4aXMuWiAqLyB8fCBheGlzID09PSBcIi1aXCIgLyogQXhpcy5aTWludXMgKi87XG59XG4iLCJpbXBvcnQgeyBDb29yZERlbGltaXRlciwgRGVmYXVsdENvbXBvbmVudFBhcmFtLCBEZWxpbWl0ZXIgfSBmcm9tIFwiLi90eXBlc1wiO1xuZXhwb3J0IGZ1bmN0aW9uIGlzS0FyY2hGYWNlKGVudGl0eSkge1xuICAgIHJldHVybiAhIWVudGl0eSAmJiAoZW50aXR5LmdldFR5cGUoKSA9PT0gS0FyY2hGYWNlVHlwZS5Ob25QbGFuYXIgfHwgZW50aXR5LmdldFR5cGUoKSA9PT0gS0FyY2hGYWNlVHlwZS5QbGFuYXIpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzS0dyb3VwSW5zdGFuY2UoZW50aXR5KSB7XG4gICAgcmV0dXJuICEhZW50aXR5ICYmIGVudGl0eS5nZXRUeXBlKCkgPT09IEtFbnRpdHlUeXBlLkdyb3VwSW5zdGFuY2U7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNLRmFjZShlbnRpdHkpIHtcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS0VudGl0eVR5cGUuRmFjZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0tFZGdlKGVudGl0eSkge1xuICAgIHJldHVybiAhIWVudGl0eSAmJiBlbnRpdHkuZ2V0VHlwZSgpID09PSBLRW50aXR5VHlwZS5FZGdlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzS1ZlcnRleChlbnRpdHkpIHtcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS0VudGl0eVR5cGUuVmVydGV4O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzS0F1eGlsaWFyeUJvdW5kZWRDdXJ2ZShlbnRpdHkpIHtcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS0VudGl0eVR5cGUuQXV4aWxpYXJ5Qm91bmRlZEN1cnZlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzS0F1eGlsaWFyeUxpbmUoZW50aXR5KSB7XG4gICAgcmV0dXJuICEhZW50aXR5ICYmIGVudGl0eS5nZXRUeXBlKCkgPT09IEtFbnRpdHlUeXBlLkF1eGlsaWFyeUxpbmU7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNLUGxhbmUoZW50aXR5KSB7XG4gICAgcmV0dXJuICEhZW50aXR5ICYmIGVudGl0eS5nZXRUeXBlKCkgPT09IEtTdXJmYWNlVHlwZS5QbGFuZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0tMaW5lU2VnbWVudDNkKGVudGl0eSkge1xuICAgIHJldHVybiAhIWVudGl0eSAmJiAhIWVudGl0eS5kaXJlY3Rpb247XG59XG5leHBvcnQgZnVuY3Rpb24gaXNLQXJjM2QoZW50aXR5KSB7XG4gICAgcmV0dXJuICEhZW50aXR5ICYmICEhZW50aXR5LmNpcmNsZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnlQYXJhbShwYXJhbSkge1xuICAgIGxldCB2YWx1ZSA9ICcnO1xuICAgIHZhbHVlICs9IGBpbmQ9JHtwYXJhbS5pbmRleH0ke0RlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGBocz0ke3BhcmFtLmhvcml6b250YWxTdGVwfSR7RGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYHZzPSR7cGFyYW0udmVydGljYWxTdGVwfSR7RGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYHN3PSR7cGFyYW0uc3RhcnRXaWR0aH0ke0RlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGBldz0ke3BhcmFtLmVuZFdpZHRofSR7RGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYG93PSR7cGFyYW0ub2Zmc2V0V2lkdGh9JHtEZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgcGw9JHtwYXJhbS5wbGF0Zm9ybUxlbmd0aH0ke0RlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGB0cD0ke3BhcmFtLnR5cGV9JHtEZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgdXA9JHtwYXJhbS51cHdhcmQgPyAxIDogMH0ke0RlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGBwdGs9JHtwYXJhbS5wbGF0Zm9ybVRoaWNrbmVzc31gO1xuICAgIHJldHVybiB2YWx1ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVBhcmFtKHZhbHVlKSB7XG4gICAgY29uc3QgcGFyYW0gPSBPYmplY3QuYXNzaWduKHt9LCBEZWZhdWx0Q29tcG9uZW50UGFyYW0pO1xuICAgIGNvbnN0IGl0ZW1zID0gdmFsdWUuc3BsaXQoRGVsaW1pdGVyKTtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgICAgY29uc3Qga2V5VmFsdWUgPSBpdGVtLnNwbGl0KCc9Jyk7XG4gICAgICAgIGlmIChrZXlWYWx1ZS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoa2V5VmFsdWVbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlICdpbmQnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5pbmRleCA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnaHMnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5ob3Jpem9udGFsU3RlcCA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAndnMnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS52ZXJ0aWNhbFN0ZXAgPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3N3JzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uc3RhcnRXaWR0aCA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZXcnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5lbmRXaWR0aCA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnb3cnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5vZmZzZXRXaWR0aCA9IHBhcnNlRmxvYXQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdwbCc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnBsYXRmb3JtTGVuZ3RoID0gcGFyc2VGbG9hdChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3RwJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0udHlwZSA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAndXAnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS51cHdhcmQgPSBrZXlWYWx1ZVsxXSA9PT0gJzEnID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdwdGsnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5wbGF0Zm9ybVRoaWNrbmVzcyA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcGFyYW0uc3RlcFByb3BvcnRpb25hbCA9IHRydWU7XG4gICAgcGFyYW0ud2lkdGhQcm9wb3J0aW9uYWwgPSB0cnVlO1xuICAgIHBhcmFtLnBsYXRmb3JtTGVuZ3RoTG9ja2VkID0gdHJ1ZTtcbiAgICBwYXJhbS5tb2RlbEVkaXRpbmcgPSB0cnVlO1xuICAgIHJldHVybiBwYXJhbTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnlTdGFydEVuZChzdGFydCwgZW5kKSB7XG4gICAgbGV0IHZhbHVlID0gJyc7XG4gICAgdmFsdWUgKz0gYCR7c3RhcnQueH0ke0Nvb3JkRGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYCR7c3RhcnQueX0ke0Nvb3JkRGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYCR7c3RhcnQuen0ke0RlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGAke2VuZC54fSR7Q29vcmREZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgJHtlbmQueX0ke0Nvb3JkRGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYCR7ZW5kLnp9YDtcbiAgICByZXR1cm4gdmFsdWU7XG59XG5leHBvcnQgZnVuY3Rpb24gcGFyc2VMaW5lU2VnM2QodmFsdWUpIHtcbiAgICBjb25zdCBpdGVtcyA9IHZhbHVlLnNwbGl0KERlbGltaXRlcik7XG4gICAgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gMikge1xuICAgICAgICBjb25zdCBzdGFydEtleVZhbHVlID0gaXRlbXNbMF0uc3BsaXQoQ29vcmREZWxpbWl0ZXIpO1xuICAgICAgICBjb25zdCBlbmRLZXlWYWx1ZSA9IGl0ZW1zWzFdLnNwbGl0KENvb3JkRGVsaW1pdGVyKTtcbiAgICAgICAgaWYgKHN0YXJ0S2V5VmFsdWUubGVuZ3RoID09PSAzICYmIGVuZEtleVZhbHVlLmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QocGFyc2VGbG9hdChzdGFydEtleVZhbHVlWzBdKSwgcGFyc2VGbG9hdChzdGFydEtleVZhbHVlWzFdKSwgcGFyc2VGbG9hdChzdGFydEtleVZhbHVlWzJdKSk7XG4gICAgICAgICAgICBjb25zdCBlbmQgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QocGFyc2VGbG9hdChlbmRLZXlWYWx1ZVswXSksIHBhcnNlRmxvYXQoZW5kS2V5VmFsdWVbMV0pLCBwYXJzZUZsb2F0KGVuZEtleVZhbHVlWzJdKSk7XG4gICAgICAgICAgICByZXR1cm4geyBzdGFydCwgZW5kIH07XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gcGFyc2VTdGFydEVuZCh2YWx1ZSkge1xuICAgIGNvbnN0IGl0ZW1zID0gdmFsdWUuc3BsaXQoRGVsaW1pdGVyKTtcbiAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0S2V5VmFsdWUgPSBpdGVtc1swXS5zcGxpdChDb29yZERlbGltaXRlcik7XG4gICAgICAgIGNvbnN0IGVuZEtleVZhbHVlID0gaXRlbXNbMV0uc3BsaXQoQ29vcmREZWxpbWl0ZXIpO1xuICAgICAgICBpZiAoc3RhcnRLZXlWYWx1ZS5sZW5ndGggPT09IDMgJiYgZW5kS2V5VmFsdWUubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IEdlb21MaWIuY3JlYXRlUG9pbnQzZChwYXJzZUZsb2F0KHN0YXJ0S2V5VmFsdWVbMF0pLCBwYXJzZUZsb2F0KHN0YXJ0S2V5VmFsdWVbMV0pLCAwKTtcbiAgICAgICAgICAgIGNvbnN0IGVuZCA9IEdlb21MaWIuY3JlYXRlUG9pbnQzZChwYXJzZUZsb2F0KGVuZEtleVZhbHVlWzBdKSwgcGFyc2VGbG9hdChlbmRLZXlWYWx1ZVsxXSksIDApO1xuICAgICAgICAgICAgcmV0dXJuIHsgc3RhcnQsIGVuZCwgc3RhcnRIZWlnaHQ6IHBhcnNlRmxvYXQoc3RhcnRLZXlWYWx1ZVsyXSksIGVuZEhlaWdodDogcGFyc2VGbG9hdChlbmRLZXlWYWx1ZVsyXSkgfTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnlQb2ludDNkKHBvaW50KSB7XG4gICAgbGV0IHZhbHVlID0gJyc7XG4gICAgdmFsdWUgKz0gYCR7cG9pbnQueH0ke0Nvb3JkRGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYCR7cG9pbnQueX0ke0Nvb3JkRGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYCR7cG9pbnQuen1gO1xuICAgIHJldHVybiB2YWx1ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVZlY3RvcjNkKHZhbHVlKSB7XG4gICAgY29uc3QgaXRlbXMgPSB2YWx1ZS5zcGxpdChDb29yZERlbGltaXRlcik7XG4gICAgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gMykge1xuICAgICAgICBjb25zdCB2ZWN0b3IgPSBHZW9tTGliLmNyZWF0ZVZlY3RvcjNkKHBhcnNlRmxvYXQoaXRlbXNbMF0pLCBwYXJzZUZsb2F0KGl0ZW1zWzFdKSwgcGFyc2VGbG9hdChpdGVtc1syXSkpO1xuICAgICAgICByZXR1cm4gdmVjdG9yO1xuICAgIH1cbn1cbiIsImV4cG9ydCB2YXIgTWVzc2FnZVR5cGU7XG4oZnVuY3Rpb24gKE1lc3NhZ2VUeXBlKSB7XG4gICAgTWVzc2FnZVR5cGVbXCJEcmF3U3RhaXJWaWV3TW91bnRlZFwiXSA9IFwiZHJhd1N0YWlyVmlld01vdW50ZWRcIjtcbiAgICBNZXNzYWdlVHlwZVtcIlN0YWlyUGFyYW1DaGFuZ2VkQnlJbnB1dFwiXSA9IFwic3RhaXJQYXJhbUNoYW5nZWRCeUlucHV0XCI7XG4gICAgTWVzc2FnZVR5cGVbXCJQYXJhbUNoYW5nZWRCeUlucHV0XCJdID0gXCJwYXJhbUNoYW5nZWRCeUlucHV0XCI7XG4gICAgTWVzc2FnZVR5cGVbXCJQYXJhbUNoYW5nZWRCeURyYXdcIl0gPSBcInBhcmFtQ2hhbmdlZEJ5RHJhd1wiO1xuICAgIE1lc3NhZ2VUeXBlW1wiQ29tcG9uZW50QWRkZWRcIl0gPSBcImNvbXBvbmVudEFkZGVkXCI7XG4gICAgTWVzc2FnZVR5cGVbXCJEcmF3U3RhaXJNb2RlbFNldHRsZWRcIl0gPSBcImRyYXdTdGFpck1vZGVsU2V0dGxlZFwiO1xuICAgIE1lc3NhZ2VUeXBlW1wiUHJvcGVydGllc1Zpc2libGVcIl0gPSBcInByb3BlcnRpZXNWaXNpYmxlXCI7XG4gICAgTWVzc2FnZVR5cGVbXCJGb2N1c0NvbXBvbmVudEluZGV4XCJdID0gXCJmb2N1c0NvbXBvbmVudEluZGV4XCI7XG4gICAgTWVzc2FnZVR5cGVbXCJSZW1vdmVDb21wb25lbnRcIl0gPSBcInJlbW92ZUNvbXBvbmVudFwiO1xuICAgIE1lc3NhZ2VUeXBlW1wiQWN0aXZhdGVEcmF3U3RhaXJzVG9vbFwiXSA9IFwiYWN0aXZhdGVEcmF3U3RhaXJzVG9vbFwiO1xuICAgIE1lc3NhZ2VUeXBlW1wiRGVBY3RpdmF0ZURyYXdTdGFpcnNUb29sXCJdID0gXCJkZUFjdGl2YXRlRHJhd1N0YWlyc1Rvb2xcIjtcbiAgICBNZXNzYWdlVHlwZVtcIkxlYXZlRHJhd1N0YWlyc1Rvb2xcIl0gPSBcImxlYXZlRHJhd1N0YWlyc1Rvb2xcIjtcbn0pKE1lc3NhZ2VUeXBlIHx8IChNZXNzYWdlVHlwZSA9IHt9KSk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL21haW4vbWFpbi50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==