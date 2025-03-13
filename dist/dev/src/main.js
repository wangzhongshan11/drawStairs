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
/* harmony export */   DirectionX: () => (/* binding */ DirectionX),
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
const DirectionX = GeomLib.createVector3d(1, 0, 0);
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
        nextComponents: Array.from({ length: 6 }, _ => new Set()),
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
        this.stairParam = _types__WEBPACK_IMPORTED_MODULE_0__.DefaultStairParam;
    }
    onToolActive() {
        toolHelper.setExcludeInferenceTypes([
            KEntityType.Face, KEntityType.Edge, KEntityType.AuxiliaryBoundedCurve, KEntityType.AuxiliaryLine, KEntityType.AuxiliaryVertex,
            KEntityType.GroupInstance, KEntityType.Vertex, KArchFaceType.NonPlanar, KArchFaceType.Planar,
        ]);
        const firstSegment = (0,_consts__WEBPACK_IMPORTED_MODULE_4__.getEmptySegment)();
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
                    }
                    else {
                        lastSegment.endLocked = true;
                        const lastParam = lastSegment.param;
                        const nextSegment = Object.assign(Object.assign({}, (0,_consts__WEBPACK_IMPORTED_MODULE_4__.getEmptySegment)()), { start: lastSegment.end, end: lastSegment.end, startLocked: lastParam.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform ? false : true, startHeight: lastSegment.endHeight, endHeight: lastSegment.endHeight, param: Object.assign(Object.assign({}, lastParam), { index: lastParam.index + 1, startWidth: lastParam.endWidth, offsetWidth: 0, type: lastParam.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform ? _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.StraightStair : _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform, platformLengthLocked: false }) });
                        const { moldShape: { vertices, tempLines } } = lastSegment;
                        if (!lastSegment.baseComponent) {
                            // lastSegment.baseLineSeg3d = { start: vertices[0], end: vertices[1] };
                            lastSegment.baseComponent = { line3d: { start: vertices[0], end: vertices[1] } };
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
            const handrailTempShapeIds = appView.drawPolylines(tempLinePoints, { color: { r: 0, g: 0, b: 255 }, depthTest: false, pattern: KLinePattern.Dash });
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
        var _a, _b;
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
                    this.clearTempShapes(lastSegment);
                    if (newFocusedType === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform) {
                        if (oldFocusedSegment && oldFocusedSegment !== newFocusedSegment) {
                            oldFocusedSegment.nextComponents.forEach(inds => inds.delete(lastSegment.param.index));
                        }
                        if (((_a = lastSegment.baseComponent) === null || _a === void 0 ? void 0 : _a.line3dIndex) !== undefined) {
                            newFocusedSegment.nextComponents.forEach(inds => inds.delete(lastSegment.param.index));
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
                            lastSegment.start = newFocusedSegment.end.clone();
                            lastSegment.startLocked = true;
                            lastSegment.startHeight = newFocusedSegment.endHeight;
                            // lastSegment.baseLineSeg3d = { start: newFocusedVertices[newFocusedVertices.length - 1], end: newFocusedVertices[newFocusedVertices.length - 2] };
                            lastSegment.baseComponent = { componentIndex: newFocusedSegment.param.index, line3dIndex: 0, line3d: { start: newFocusedVertices[newFocusedVertices.length - 1], end: newFocusedVertices[newFocusedVertices.length - 2] } };
                            newFocusedSegment.nextComponents[0].add(lastSegment.param.index);
                            lastSegment.circleTangent = undefined;
                            this.drawTempComponent(lastSegment, false, true);
                        }
                        // else {
                        //     lastSegment.startLocked = false;
                        //     lastSegment.circleTangent = undefined;
                        // }
                    }
                }
                if ((this.drawing && componentIndex !== lastSegmentIndex) || !this.drawing) {
                    this.drawTempComponent(newFocusedSegment, this.drawing);
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
                    const theInstance = this.editModel.child.get(componentIndex);
                    if (theInstance) {
                        this.editModel.child.delete(componentIndex);
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
    changeStairParam(stairParam, changeParams) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function* () {
            this.stairParam = stairParam;
            if (!this.segments.length) {
                return;
            }
            const lastSegment = this.segments[this.segments.length - 1];
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
                        design.startOperation();
                        operationSuccess = operationSuccess && (yield design.activateGroupInstance(this.editModel.parent.instance)).isSuccess;
                    }
                    for (const reGenerateSegment of reGenerateSegments) {
                        if (this.drawing) {
                            this.drawTempComponent(reGenerateSegment, reGenerateSegment.param.index === this.focusedComponentIndex && reGenerateSegment.param.index !== lastSegment.param.index);
                        }
                        else if (this.editModel) {
                            const { param: { index } } = reGenerateSegment;
                            const theInstance = this.editModel.child.get(index);
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
                                                this.editModel.child.set(index, { instance: newInstance, definitionKey: ((_a = newInstance.getGroupDefinition()) === null || _a === void 0 ? void 0 : _a.getKey()) || '', instanceKey: newInstance.getKey() });
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
                        if ((_b = this.handrailCollection) === null || _b === void 0 ? void 0 : _b.handrails.length) {
                            const handrailInstance = yield (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.buildHandrailInstance)(this.stairParam, (_c = this.handrailCollection) === null || _c === void 0 ? void 0 : _c.handrails);
                            operationSuccess = operationSuccess && handrailInstance !== undefined;
                            if (handrailInstance) {
                                this.editModel.handrail = { instance: handrailInstance, definitionKey: ((_d = handrailInstance.getGroupDefinition()) === null || _d === void 0 ? void 0 : _d.getKey()) || '', instanceKey: handrailInstance.getKey() };
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
                    if ((_e = this.handrailCollection) === null || _e === void 0 ? void 0 : _e.handrails.length) {
                        let operationSuccess = true;
                        design.startOperation();
                        operationSuccess = operationSuccess && (yield design.activateGroupInstance(this.editModel.parent.instance)).isSuccess;
                        const handrailInstance = yield (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.buildHandrailInstance)(this.stairParam, (_f = this.handrailCollection) === null || _f === void 0 ? void 0 : _f.handrails);
                        operationSuccess = operationSuccess && handrailInstance !== undefined;
                        if (handrailInstance) {
                            this.editModel.handrail = { instance: handrailInstance, definitionKey: ((_g = handrailInstance.getGroupDefinition()) === null || _g === void 0 ? void 0 : _g.getKey()) || '', instanceKey: handrailInstance.getKey() };
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
                const { param: { index } } = theSegment;
                componentParam.modelEditing = true;
                theSegment.param = componentParam;
                if (this.drawing) {
                    this.drawTempComponent(theSegment, theSegment.param.index !== lastSegment.param.index, true);
                }
                else if (this.editModel) {
                    // selection.clear();
                    const theInstance = this.editModel.child.get(index);
                    if (theInstance) {
                        this.generateSegmentShape(theSegment);
                        const theMeshes = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.generateMeshes)([theSegment]);
                        if (theMeshes.length) {
                            design.startOperation();
                            let operationSuccess = (yield design.activateGroupInstance(this.editModel.parent.instance)).isSuccess;
                            if (operationSuccess) {
                                operationSuccess = operationSuccess && design.removeGroupInstance(theInstance.instance).isSuccess;
                                if (operationSuccess) {
                                    const newInstance = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.buildComponentInstance)(theSegment, this.segments);
                                    operationSuccess = operationSuccess && !!newInstance;
                                    if (newInstance) {
                                        this.editModel.child.set(index, { instance: newInstance, definitionKey: ((_a = newInstance.getGroupDefinition()) === null || _a === void 0 ? void 0 : _a.getKey()) || '', instanceKey: newInstance.getKey() });
                                    }
                                }
                            }
                            if ((_b = this.handrailCollection) === null || _b === void 0 ? void 0 : _b.handrails.length) {
                                const handrailInstance = yield (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.buildHandrailInstance)(this.stairParam, (_c = this.handrailCollection) === null || _c === void 0 ? void 0 : _c.handrails);
                                operationSuccess = operationSuccess && handrailInstance !== undefined;
                                if (handrailInstance) {
                                    this.editModel.handrail = { instance: handrailInstance, definitionKey: ((_d = handrailInstance.getGroupDefinition()) === null || _d === void 0 ? void 0 : _d.getKey()) || '', instanceKey: handrailInstance.getKey() };
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
        return __awaiter(this, void 0, void 0, function* () {
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
                    const newInstance = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.buildComponentInstance)(segment, this.segments);
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
                // let handrailInstanceData: InstanceData | undefined;
                // if (this.handrailCollection?.handrails.length) {
                //     const handrailInstance = await buildHandrailInstance(this.stairParam, this.handrailCollection?.handrails);
                //     operationSuccess = operationSuccess && handrailInstance !== undefined;
                //     if (handrailInstance) {
                //         newInstances.push(handrailInstance);
                //         handrailInstanceData = { instance: handrailInstance, definitionKey: handrailInstance.getGroupDefinition()?.getKey() || '', instanceKey: handrailInstance.getKey() };
                //     }
                // }
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
                                child: editModelChild,
                                // handrail: handrailInstanceData,
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
        });
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
                        const baseComponent = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.parseBaseComponent)(subDef.getCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.BaseComponentKey));
                        const circleTangent = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.parseVector3d)(subDef.getCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.CircleTangentKey));
                        if (param && startEnd && baseLineSeg3d) {
                            const segment = Object.assign(Object.assign({}, (0,_consts__WEBPACK_IMPORTED_MODULE_4__.getEmptySegment)()), { start: startEnd.start, end: startEnd.end, startHeight: startEnd.startHeight, endHeight: startEnd.endHeight, baseComponent: { componentIndex: baseComponent === null || baseComponent === void 0 ? void 0 : baseComponent.componentIndex, line3dIndex: baseComponent === null || baseComponent === void 0 ? void 0 : baseComponent.line3dIndex, line3d: baseLineSeg3d }, circleTangent,
                                param, startLocked: true, endLocked: true });
                            segments.push(segment);
                            editModel.child.set(param.index, { instance: subInstance, definitionKey: ((_c = subInstance.getGroupDefinition()) === null || _c === void 0 ? void 0 : _c.getKey()) || '', instanceKey: subInstance.getKey() });
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
                // operationSuccess = operationSuccess && groupDef.setCustomProperty(ComponentIndexKey, `${newInstances.length}`).isSuccess;
                // newInstances.push(newInstance);
                const paramString = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.stringifyParam)(param);
                const startEndString = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.stringifyStartEnd)(GeomLib.createPoint3d(start.x, start.y, startHeight), GeomLib.createPoint3d(end.x, end.y, endHeight));
                operationSuccess = operationSuccess && groupDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_1__.ParamKey, paramString).isSuccess;
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
        let railFace;
        if (railType === _types__WEBPACK_IMPORTED_MODULE_1__.RailType.Circle) {
            railFace = drawCircle(railParam.radius || _types__WEBPACK_IMPORTED_MODULE_1__.DefaultStairParam.horizontalStep / 5);
        }
        else if (railType === _types__WEBPACK_IMPORTED_MODULE_1__.RailType.Rect) {
            railFace = drawRect(railParam.width || _types__WEBPACK_IMPORTED_MODULE_1__.DefaultStairParam.horizontalStep / 5, railParam.height || _types__WEBPACK_IMPORTED_MODULE_1__.DefaultStairParam.horizontalStep / 5);
        }
        else {
            return 0;
        }
        const railLoop = railFace === null || railFace === void 0 ? void 0 : railFace.getOuterLoop();
        if (!railFace || !railLoop) {
            return undefined;
        }
        let columnFace;
        if (columnType === _types__WEBPACK_IMPORTED_MODULE_1__.ColumnType.Circle) {
            columnFace = drawCircle(columnParam.radius || _types__WEBPACK_IMPORTED_MODULE_1__.DefaultStairParam.horizontalStep / 10, 100);
        }
        else if (columnType === _types__WEBPACK_IMPORTED_MODULE_1__.ColumnType.Rect) {
            columnFace = drawRect(columnParam.width || _types__WEBPACK_IMPORTED_MODULE_1__.DefaultStairParam.horizontalStep / 10, columnParam.height || _types__WEBPACK_IMPORTED_MODULE_1__.DefaultStairParam.horizontalStep / 10, 100);
        }
        else {
            return 0;
        }
        const columnLoop = columnFace === null || columnFace === void 0 ? void 0 : columnFace.getOuterLoop();
        if (!columnFace || !columnLoop) {
            return undefined;
        }
        const activeDesign = app.getActiveDesign();
        const handrailInstance = (_a = activeDesign.makeGroup([railFace, columnFace], [], [])) === null || _a === void 0 ? void 0 : _a.addedInstance;
        const handrailDefinition = handrailInstance === null || handrailInstance === void 0 ? void 0 : handrailInstance.getGroupDefinition();
        if (!handrailInstance || !handrailDefinition) {
            return undefined;
        }
        const activateInstanceRes = yield activeDesign.activateGroupInstance(handrailInstance);
        if (!activateInstanceRes.isSuccess) {
            return undefined;
        }
        const columnAuxiliaryBoundedCurve = (_b = activeDesign.addAuxiliaryBoundedCurve(GeomLib.createLineSegment3d(GeomLib.createPoint3d(0, 0, height / 2), GeomLib.createPoint3d(0, 0, -height / 2)))) === null || _b === void 0 ? void 0 : _b.addedCurve;
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
        const columnCenters = [];
        for (const { rail, columns } of handrails) {
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
            const sweepRailRes = activeDesign.sweepFollowCurves(railLoop, railBoundedCurves);
            if (!sweepRailRes.isSuccess || !sweepRailRes.addedShells.length) {
                return undefined;
            }
            for (const column of columns) {
                columnCenters.push(GeomLib.createPoint3d(column[0].x + column[1].x, column[0].y + column[1].y, column[0].z + column[1].z));
            }
        }
        if (columnCenters.length) {
            const columnCopyRes = activeDesign.bulkCopyGroupInstances([columnOriginInstance], [columnCenters.map(center => GeomLib.createTranslationMatrix4(center.x, center.y, center.z))]);
            if (!(columnCopyRes === null || columnCopyRes === void 0 ? void 0 : columnCopyRes.addedInstances.length)) {
                return undefined;
            }
        }
        const removeOriginColumnRes = activeDesign.removeGroupInstance(columnOriginInstance);
        if (!removeOriginColumnRes.isSuccess) {
            return undefined;
        }
        // to remove all auxiliaryCurves
        const deactivateInstanceRes = yield activeDesign.deactivateGroupInstance();
        if (!deactivateInstanceRes.isSuccess) {
            return undefined;
        }
        const setPropertyRes = handrailDefinition.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_1__.HandrailModelKey, _types__WEBPACK_IMPORTED_MODULE_1__.StairModelValue);
        if (!setPropertyRes.isSuccess) {
            return undefined;
        }
        return handrailInstance;
    });
}
function drawCircle(radius, z = 0) {
    const activeDesign = app.getActiveDesign();
    const res = activeDesign.addCircle(GeomLib.createCircle3dByCenterNormalRadius(GeomLib.createPoint3d(0, 0, z), _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ, radius));
    if (res === null || res === void 0 ? void 0 : res.addedEdges.length) {
        const shell = res.addedEdges[0].getShell();
        const faces = shell === null || shell === void 0 ? void 0 : shell.getFaces();
        if ((faces === null || faces === void 0 ? void 0 : faces.length) === 1) {
            return faces[0];
        }
    }
    return undefined;
}
function drawRect(width, height, z = 0, withCorner = true) {
    const point1 = GeomLib.createPoint3d(0, 0, z);
    const point2 = GeomLib.createPoint3d(width, 0, z);
    const points = [point1, point2];
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
                const endDelta = segment.param.upward === upward ? 0 : 2 * (startHeight - endHeight);
                segment.startHeight += verticalDelta;
                segment.endHeight += verticalDelta + endDelta;
                segment.param.upward = upward;
                unVisited.delete(segment);
                const nextSegments = getNextComponents(segment, segments);
                if (nextSegments.length) {
                    next.push(...nextSegments.map(seg => ({ segment: seg, verticalDelta: verticalDelta + endDelta })));
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
/* harmony export */   generateShape: () => (/* binding */ generateShape)
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
            segment.platformDirectionType = _types__WEBPACK_IMPORTED_MODULE_2__.PlatformDirectionType.Left;
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
            segment.platformDirectionType = _types__WEBPACK_IMPORTED_MODULE_2__.PlatformDirectionType.Right;
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
                segment.platformDirectionType = _types__WEBPACK_IMPORTED_MODULE_2__.PlatformDirectionType.Front;
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
                segment.platformDirectionType = _types__WEBPACK_IMPORTED_MODULE_2__.PlatformDirectionType.RightFront;
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
                segment.platformDirectionType = _types__WEBPACK_IMPORTED_MODULE_2__.PlatformDirectionType.LeftFront;
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
    var _a;
    const { handrail: { support, height, column: { step, param: columnParam } } } = stairParam;
    if (segments.length && support) {
        const handrails = [];
        const visited = new Map();
        for (const segment of segments) {
            visited.set(segment.param.index, { left: false, right: false, line3dIndexes: new Set() });
        }
        let current = [{
                segment: segments[0],
                line3dInd: segments[0].param.type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.Platform ? (segments[0].platformDirectionType === _types__WEBPACK_IMPORTED_MODULE_2__.PlatformDirectionType.RightFront ? 1 : 0) : 0,
                left: false,
                start: true,
            }];
        const unVisited = new Set(segments);
        let handrail = { rail: [], columns: [] };
        while (current.length) {
            let next = [];
            for (const { segment: currentSegment, line3dInd, startPoint, left } of current) {
                const { param: { index, type, startWidth, endWidth, horizontalStep, verticalStep, upward }, start, end, startHeight, endHeight, moldShape: { vertices: moldVertices, tempLines: moldTempLines, stepCount }, nextComponents, baseComponent, circleTangent, platformDirectionType, startLocked, } = currentSegment;
                unVisited.delete(currentSegment);
                if (!startLocked) {
                    // if ((!startLocked && type !== ComponentType.CircularStair) || (!circleTangent && type === ComponentType.CircularStair)) {
                    continue;
                }
                const stepHeight = upward ? verticalStep : -verticalStep;
                const offsetLength = Math.max(columnParam.height || 0, columnParam.width || 0, columnParam.radius || 0);
                let baseLine3dDir = (baseComponent === null || baseComponent === void 0 ? void 0 : baseComponent.line3d) ? baseComponent.line3d.end.subtracted(baseComponent.line3d.start).normalized() : _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionX;
                let frontDir = circleTangent ? circleTangent : end.subtracted(start).normalized();
                const angle = baseLine3dDir ? frontDir.angle(baseLine3dDir) : Math.PI / 2;
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
                const baseSegment = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_1__.getSegmentByIndex)(segments, baseComponent === null || baseComponent === void 0 ? void 0 : baseComponent.componentIndex);
                let siblingSegmentInds = baseSegment === null || baseSegment === void 0 ? void 0 : baseSegment.nextComponents[(baseComponent === null || baseComponent === void 0 ? void 0 : baseComponent.line3dIndex) || 0];
                let nextSiblingSegment = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_1__.getSegmentByIndex)(segments, (_a = [...siblingSegmentInds || []]) === null || _a === void 0 ? void 0 : _a.find(ind => {
                    const visitedSibling = visited.get(ind);
                    return !visitedSibling;
                }));
                // const visitedBaseSegment = baseSegment ? visited.get(baseSegment.param.index) : undefined;
                let line3dDir = moldVertices[moldTempLines[line3dInd][1]].subtracted(moldVertices[moldTempLines[line3dInd][0]]).normalized();
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
                    const hasEntranceSegment = (line3dInd === 1 && platformDirectionType === _types__WEBPACK_IMPORTED_MODULE_2__.PlatformDirectionType.RightFront) || (line3dInd === 0 && platformDirectionType !== _types__WEBPACK_IMPORTED_MODULE_2__.PlatformDirectionType.RightFront);
                    // const nextSegmentIndexes = nextComponents[line3dInd];
                    let nearestSegment;
                    for (const nextSegmentIndex of nextComponents[line3dInd]) {
                        const nextSegment = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_1__.getSegmentByIndex)(segments, nextSegmentIndex);
                        if (nextSegment) {
                            const { start } = nextSegment;
                            const ds = start.distanceTo(sp);
                            const de = start.distanceTo(ep);
                            const visitNextRecord = visited.get(nextSegment.param.index);
                            const nextComponentStartLine3dInd = nextSegment.param.type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.Platform ?
                                (nextSegment.platformDirectionType === _types__WEBPACK_IMPORTED_MODULE_2__.PlatformDirectionType.RightFront ? 1 : 0) : 0;
                            if ((0,_utils__WEBPACK_IMPORTED_MODULE_3__.isEqual)(ds + de, lastLength) && !(visitNextRecord === null || visitNextRecord === void 0 ? void 0 : visitNextRecord.right) && !(visitNextRecord === null || visitNextRecord === void 0 ? void 0 : visitNextRecord.line3dIndexes.has(nextComponentStartLine3dInd))) {
                                if (!nearestSegment || nearestSegment.distance > ds) {
                                    nearestSegment = { segment: nextSegment, distance: ds };
                                }
                            }
                        }
                    }
                    let lastDistance = lastLength;
                    if (nearestSegment) {
                        const { moldShape: { vertices: nearestVertices, tempLines: nearestTempLines } } = nearestSegment.segment;
                        const nearestLine3dInd = nearestSegment.segment.platformDirectionType === _types__WEBPACK_IMPORTED_MODULE_2__.PlatformDirectionType.RightFront ? 1 : 0;
                        const nearestLine3d = nearestSegment.segment.param.type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.Platform ? nearestTempLines[nearestLine3dInd] : nearestTempLines[0];
                        const nearestLine3dDir = nearestVertices[nearestLine3d[1]].subtracted(nearestVertices[nearestLine3d[0]]).normalized();
                        ep = nearestSegment.segment.param.type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.Platform ? nearestVertices[nearestLine3d[1]] : nearestSegment.segment.start.added(line3dDir.multiplied(-nearestSegment.segment.param.startWidth / 2));
                        // ep = nearestVertices[nearestLine3d[1]];
                        spToEpDir = ep.subtracted(sp).normalized();
                        if (spToEpDir.dot(nearestLine3dDir) > 0) {
                            lastDistance = step;
                            pushEnd = false;
                            nextStartPoint = sp;
                        }
                        else {
                            lastDistance = sp.distanceTo(ep);
                            nextStartPoint = ep;
                        }
                        // lastLength = sp.distanceTo(ep);
                    }
                    else if (isEntrance && hasEntranceSegment && baseSegment) {
                        const { moldShape: { vertices: baseVertices, tempLines: baseTempLines } } = baseSegment;
                        const baseLine3d = baseSegment.param.type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.Platform ? baseTempLines[(baseComponent === null || baseComponent === void 0 ? void 0 : baseComponent.line3dIndex) || 0] : baseTempLines[baseTempLines.length - 1];
                        baseLine3dDir = baseVertices[baseLine3d[1]].subtracted(baseVertices[baseLine3d[0]]).normalized();
                        if (nextSiblingSegment) {
                            // never happen
                            if (nextSiblingSegment.param.type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.Platform) {
                                const nextSiblingSegStartLine3d = nextSiblingSegment.moldShape.tempLines[nextSiblingSegment.platformDirectionType === _types__WEBPACK_IMPORTED_MODULE_2__.PlatformDirectionType.RightFront ? 1 : 0];
                                ep = nextSiblingSegment.moldShape.vertices[nextSiblingSegStartLine3d[1]];
                            }
                            else {
                                ep = nextSiblingSegment.start.added(baseLine3dDir.multiplied(-nextSiblingSegment.param.startWidth / 2));
                            }
                        }
                        else {
                            ep = baseVertices[baseLine3d[1]];
                        }
                        spToEpDir = ep.subtracted(sp).normalized();
                        if (spToEpDir.dot(baseLine3dDir) > 0) {
                            lastDistance = step;
                            pushEnd = false;
                            nextStartPoint = sp;
                        }
                        else {
                            lastDistance = sp.distanceTo(ep);
                            nextStartPoint = ep;
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
                    // push rail
                    const firstBottomPt = sp.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight)).added(offsetDir.multiplied(offsetLength)).added(spToEpDir.multiplied(startPoint ? 0 : offsetLength));
                    handrail.rail.push(firstBottomPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height)));
                    // push columns
                    let tempDistance = 0;
                    while (tempDistance < (lastDistance - step * ColumnStepTolerance)) {
                        const bottomPoint = tempDistance > 0 ? sp.added(spToEpDir.multiplied(tempDistance)).added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight)).added(offsetDir.multiplied(offsetLength)) :
                            firstBottomPt;
                        handrail.columns.push([
                            bottomPoint,
                            bottomPoint.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height)),
                        ]);
                        tempDistance += step;
                    }
                    if (pushEnd && (nearestSegment || (isEntrance && lastDistance > 0))) {
                        // push rail
                        handrail.rail.push(ep.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight + height)).added(offsetDir.multiplied(offsetLength)));
                        if (tempDistance - step < lastDistance) {
                            const lastBottomPoint = sp.added(spToEpDir.multiplied(lastDistance)).added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight)).added(offsetDir.multiplied(offsetLength));
                            handrail.columns.push([
                                lastBottomPoint,
                                lastBottomPoint.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height)),
                            ]);
                        }
                    }
                    if (nearestSegment) {
                        next.push({
                            segment: nearestSegment.segment,
                            line3dInd: nearestSegment.segment.param.type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.Platform ?
                                (nearestSegment.segment.platformDirectionType === _types__WEBPACK_IMPORTED_MODULE_2__.PlatformDirectionType.RightFront ? 1 : 0) : 0,
                            left: false,
                            start: false,
                            startPoint: nextStartPoint,
                        });
                    }
                    else {
                        if (isEntrance) {
                            if (baseSegment && hasEntranceSegment) {
                                // siblingSegmentInds = baseSegment.nextComponents[baseComponent.line3dIndex];
                                if (nextSiblingSegment && baseSegment.param.type !== _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.Platform) {
                                    // never happen
                                    next.push({
                                        segment: nextSiblingSegment,
                                        line3dInd: nextSiblingSegment.param.type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.Platform ?
                                            (nextSiblingSegment.platformDirectionType === _types__WEBPACK_IMPORTED_MODULE_2__.PlatformDirectionType.RightFront ? 1 : 0) : 0,
                                        left: false,
                                        start: false,
                                        startPoint: nextStartPoint,
                                    });
                                }
                                else {
                                    // if ((visitedBaseSegment?.right && !visitedBaseSegment.left)) {
                                    next.push({
                                        segment: baseSegment,
                                        line3dInd: baseSegment.param.type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.Platform ? (baseComponent === null || baseComponent === void 0 ? void 0 : baseComponent.line3dIndex) || 0 : 0,
                                        left: true,
                                        start: false,
                                        startPoint: nextStartPoint,
                                    });
                                    // }
                                }
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
                    const stairRail = [];
                    const stairColumns = [];
                    // sp = start.added(leftDir.multiplied(startWidth / 2 * (left ? 1 : -1)));
                    // ep = end.added(leftDir.multiplied(endWidth / 2 * (left ? 1 : -1)));
                    nextStartPoint = left ? sp : ep;
                    // next segment startWidth !== currentSegment endWidth
                    pushEnd = false;
                    // const reasonableStep = Math.ceil(step / horizontalStep) * horizontalStep;
                    const reasonableStepCount = Math.ceil(step / horizontalStep);
                    let tempStepCount = 0;
                    if (type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.StraightStair || (type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.CircularStair && !circleTangent)) {
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
                        stairRail.push(sp.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight + height + (upward ? 1 : 0) * stepHeight)).added(leftDir.multiplied(offsetLength)));
                        if (!upward && stepCount > 1) {
                            stairRail.push(sp.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight + height)).added(frontDir.multiplied(horizontalStep)).added(leftDir.multiplied(offsetLength)));
                        }
                        // push columns
                        // let tempDistance = horizontalStep / 2;
                        while (tempStepCount < stepCount - 1) {
                            const curHorStepDistance = (tempStepCount + 0.5) * horizontalStep;
                            const curVerStepDistance = (tempStepCount + (upward ? 1 : 0)) * stepHeight;
                            const bottomPoint = sp.added(frontDir.multiplied(curHorStepDistance)).added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight + curVerStepDistance)).added(leftDir.multiplied(left ? -offsetLength : offsetLength));
                            stairColumns.push([
                                bottomPoint,
                                bottomPoint.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height)),
                            ]);
                            // const tempStepCount = Math.floor(tempDistance / horizontalStep);
                            // tempDistance += reasonableStep;
                            tempStepCount += reasonableStepCount;
                        }
                        if (stepCount > 1) {
                            stairRail.push(sp.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight + height + (upward ? stepCount : (stepCount - (stepCount > 2 ? 2 : 1))) * stepHeight)).added(frontDir.multiplied((stepCount - 1) * horizontalStep)).added(leftDir.multiplied(offsetLength)));
                            // if (upward) {
                            // } else {
                            // }
                        }
                        stairRail.push(ep.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(endHeight + height + (upward ? 0 : -(stepCount > 2 ? 2 : 1) * stepHeight))).added(leftDir.multiplied(offsetLength)));
                        if (tempStepCount - reasonableStepCount <= stepCount - 1) {
                            const prevTotalStepLength = (stepCount - 1) * horizontalStep;
                            const lastStepLength = lastLength - prevTotalStepLength;
                            const lastBottomPoint = sp.added(frontDir.multiplied(prevTotalStepLength + lastStepLength / 2)).added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(endHeight + (upward ? 0 : -stepHeight))).added(leftDir.multiplied(left ? offsetLength : -offsetLength));
                            stairColumns.push([
                                lastBottomPoint,
                                lastBottomPoint.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height)),
                            ]);
                        }
                        // next segment startWidth !== currentSegment endWidth
                        sp = left ? start.added(baseLine3dDir.multiplied(startWidth / 2)) : ep;
                    }
                    else if (circleTangent) {
                        const tangentLeftDir = _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.cross(circleTangent).normalized();
                        const startEndDir = end.subtracted(start).normalized();
                        const startEndDistance = start.distanceTo(end);
                        const maxWidth = Math.max(startWidth, endWidth);
                        const endAngle = startEndDir.angleTo(circleTangent, _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ);
                        const isLeftArc = endAngle > Math.PI;
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
                                    if (left) {
                                        // stairRail.push(curLeftBottomMidPt.added(curStepLeftFrontDir.reversed()).added(DirectionZ.multiplied(height)));
                                        stairRail.push(curLeftBottomMidPt.added(curStepLeftFrontDir).added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height + (upward ? 0 : -stepHeight))));
                                    }
                                    else {
                                        // stairRail.push(curRightBottomMidPt.added(curStepRightFrontDir.reversed()).added(DirectionZ.multiplied(height)));
                                        stairRail.push(curRightBottomMidPt.added(curStepRightFrontDir).added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height + (upward ? 0 : -stepHeight))));
                                        // nextStartPoint = curRightMoldPt;
                                    }
                                    if (tempStepCount % reasonableStepCount !== 0) {
                                        stairColumns.push([
                                            left ? curLeftBottomMidPt : curRightBottomMidPt,
                                            (left ? curLeftBottomMidPt : curRightBottomMidPt).added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height)),
                                        ]);
                                    }
                                    // next segment startWidth !== currentSegment endWidth
                                    sp = left ? start.added(baseLine3dDir.multiplied(startWidth / 2)) : curRightMoldPt;
                                    leftDir = curStepLeftDir;
                                }
                            }
                            if (tempStepCount % reasonableStepCount === 0) {
                                stairColumns.push([
                                    left ? curLeftBottomMidPt : curRightBottomMidPt,
                                    (left ? curLeftBottomMidPt : curRightBottomMidPt).added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height)),
                                ]);
                            }
                            tempStepCount += 1;
                        }
                    }
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
                        if (nextSegment && !visited.get(nextSegment.param.index)) {
                            stairNextSegment = nextSegment;
                        }
                    }
                    if (left) {
                        if (baseSegment) {
                            if (nextSiblingSegment && baseSegment.param.type !== _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.Platform) {
                                // never happen
                                next.push({
                                    segment: nextSiblingSegment,
                                    line3dInd: nextSiblingSegment.param.type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.Platform ?
                                        (nextSiblingSegment.platformDirectionType === _types__WEBPACK_IMPORTED_MODULE_2__.PlatformDirectionType.RightFront ? 1 : 0) : 0,
                                    left: false,
                                    start: false,
                                    startPoint: nextStartPoint,
                                });
                            }
                            else {
                                const { moldShape: { vertices: baseVertices, tempLines: baseTempLines } } = baseSegment;
                                const baseLine3d = baseSegment.param.type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.Platform ? baseTempLines[(baseComponent === null || baseComponent === void 0 ? void 0 : baseComponent.line3dIndex) || 0] : baseTempLines[baseTempLines.length - 1];
                                const baseLine3dDir = baseVertices[baseLine3d[1]].subtracted(baseVertices[baseLine3d[0]]).normalized();
                                ep = baseVertices[baseLine3d[1]];
                                spToEpDir = ep.subtracted(sp).normalized();
                                if (spToEpDir.dot(baseLine3dDir) > 0) {
                                    nextStartPoint = sp;
                                }
                                else {
                                    pushEnd = true;
                                    nextStartPoint = ep;
                                }
                                // if (baseSegment && (visitedBaseSegment?.right && !visitedBaseSegment.left)) {
                                next.push({
                                    segment: baseSegment,
                                    line3dInd: baseSegment.param.type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.Platform ? (baseComponent === null || baseComponent === void 0 ? void 0 : baseComponent.line3dIndex) || 0 : 0,
                                    left: true,
                                    start: false,
                                    startPoint: nextStartPoint,
                                });
                            }
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
                            const { moldShape: { vertices: stairNextVertices, tempLines: stairNextTempLines } } = stairNextSegment;
                            const stairNextLine3dInd = stairNextSegment.platformDirectionType === _types__WEBPACK_IMPORTED_MODULE_2__.PlatformDirectionType.RightFront ? 1 : 0;
                            const stairNextLine3d = stairNextSegment.param.type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.Platform ? stairNextTempLines[stairNextLine3dInd] : stairNextTempLines[0];
                            const stairNextLine3dDir = stairNextVertices[stairNextLine3d[1]].subtracted(stairNextVertices[stairNextLine3d[0]]).normalized();
                            ep = stairNextSegment.param.type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.Platform ? stairNextVertices[stairNextLine3d[1]] : stairNextSegment.start.added(leftDir.multiplied(-stairNextSegment.param.startWidth / 2));
                            spToEpDir = ep.subtracted(sp).normalized();
                            if (spToEpDir.dot(stairNextLine3dDir) > 0) {
                                nextStartPoint = sp;
                            }
                            else {
                                pushEnd = true;
                                nextStartPoint = ep;
                            }
                            next.push({
                                segment: stairNextSegment,
                                line3dInd: stairNextSegment.param.type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.Platform ?
                                    (stairNextSegment.platformDirectionType === _types__WEBPACK_IMPORTED_MODULE_2__.PlatformDirectionType.RightFront ? 1 : 0) : 0,
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
                        let tempMisDistance = step;
                        const misplacementDistance = sp.distanceTo(ep);
                        spToEpDir = ep.subtracted(sp).normalized();
                        offsetDir = _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.cross(spToEpDir);
                        while (tempMisDistance < misplacementDistance) {
                            const bottomPoint = sp.added(spToEpDir.multiplied(tempMisDistance)).added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(left ? endHeight : startHeight)).added(offsetDir.multiplied(offsetLength));
                            handrail.columns.push([
                                bottomPoint,
                                bottomPoint.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height)),
                            ]);
                            tempMisDistance += step;
                        }
                        if (tempMisDistance - step < misplacementDistance) {
                            // push rail
                            const lastBottomPoint = ep.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight)).added(offsetDir.multiplied(offsetLength));
                            // const lastBottomPoint = ep.added(DirectionZ.multiplied(left ? endHeight : startHeight)).added(offsetDir.multiplied(offsetLength));
                            handrail.rail.push(lastBottomPoint.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height)));
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
                            line3dInd: theSegment.param.type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.Platform ? (theSegment.platformDirectionType === _types__WEBPACK_IMPORTED_MODULE_2__.PlatformDirectionType.RightFront ? 1 : 0) : 0,
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
/* harmony export */   ColumnType: () => (/* binding */ ColumnType),
/* harmony export */   ComponentIndexKey: () => (/* binding */ ComponentIndexKey),
/* harmony export */   ComponentParamSettings: () => (/* binding */ ComponentParamSettings),
/* harmony export */   ComponentParamType: () => (/* binding */ ComponentParamType),
/* harmony export */   ComponentType: () => (/* binding */ ComponentType),
/* harmony export */   CoordDelimiter: () => (/* binding */ CoordDelimiter),
/* harmony export */   DefaultComponentParam: () => (/* binding */ DefaultComponentParam),
/* harmony export */   DefaultStairParam: () => (/* binding */ DefaultStairParam),
/* harmony export */   Delimiter: () => (/* binding */ Delimiter),
/* harmony export */   HandrailModelKey: () => (/* binding */ HandrailModelKey),
/* harmony export */   ParamKey: () => (/* binding */ ParamKey),
/* harmony export */   PlatformDirectionType: () => (/* binding */ PlatformDirectionType),
/* harmony export */   RailType: () => (/* binding */ RailType),
/* harmony export */   StairModelKey: () => (/* binding */ StairModelKey),
/* harmony export */   StairModelValue: () => (/* binding */ StairModelValue),
/* harmony export */   StartEndKey: () => (/* binding */ StartEndKey),
/* harmony export */   getComponentTitle: () => (/* binding */ getComponentTitle),
/* harmony export */   isAxisValid: () => (/* binding */ isAxisValid)
/* harmony export */ });
const StairModelKey = 'DrawStairsModel';
const StairModelValue = '1';
const HandrailModelKey = 'Handrail';
// export const StairKey = 'DSStair';
// export const PlatformKey = 'DSPlatform';
const ParamKey = 'DSParam';
// startHeight and endHeight cached in start and end
const ComponentIndexKey = 'Ind';
const StartEndKey = 'SToE';
const BaseLineSeg3dKey = 'BaseLine';
const BaseComponentKey = 'BaseComponent';
const CircleTangentKey = 'CircleTangent';
const Delimiter = '&';
const CoordDelimiter = ',';
const BaseLine3dDelimiter = '_';
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
        title: '启用栏杆',
        height: { title: "高度", min: 1, max: 100000, step: 10, unit: '', precision: 0, },
        rail: {
            type: {
                title: "样式",
                selectOptions: [
                    { value: RailType.Circle, label: "圆形" },
                    { value: RailType.Rect, label: "方形" },
                    { value: RailType.Custom, label: "拾取" },
                ]
            },
        },
        column: {
            type: {
                title: "样式",
                selectOptions: [
                    { value: ColumnType.Circle, label: "圆形" },
                    { value: ColumnType.Rect, label: "方形" },
                    { value: ColumnType.Custom, label: "拾取" },
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
    handrail: {
        support: true,
        height: 500,
        rail: {
            type: RailType.Circle,
            param: { radius: 50, width: 50, height: 50, },
        },
        column: {
            type: ColumnType.Circle,
            step: 500,
            param: { radius: 25, width: 25, height: 25, },
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
    type: ComponentType.Platform,
    upward: DefaultStairParam.upward,
    platformThickness: DefaultStairParam.platformThickness,
    stepProportional: DefaultStairParam.stepProportional,
    widthProportional: true,
    platformLengthLocked: false,
    // stepType: StepType.Normal,
    // cornerType: CornerType.Rectangle,
};
var PlatformDirectionType;
(function (PlatformDirectionType) {
    PlatformDirectionType[PlatformDirectionType["Front"] = 0] = "Front";
    PlatformDirectionType[PlatformDirectionType["RightFront"] = 1] = "RightFront";
    PlatformDirectionType[PlatformDirectionType["Right"] = 2] = "Right";
    PlatformDirectionType[PlatformDirectionType["Left"] = 3] = "Left";
    PlatformDirectionType[PlatformDirectionType["LeftFront"] = 4] = "LeftFront";
})(PlatformDirectionType || (PlatformDirectionType = {}));
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
/* harmony export */   parseBaseComponent: () => (/* binding */ parseBaseComponent),
/* harmony export */   parseLineSeg3d: () => (/* binding */ parseLineSeg3d),
/* harmony export */   parseParam: () => (/* binding */ parseParam),
/* harmony export */   parseStartEnd: () => (/* binding */ parseStartEnd),
/* harmony export */   parseVector3d: () => (/* binding */ parseVector3d),
/* harmony export */   stringifyBaseComponent: () => (/* binding */ stringifyBaseComponent),
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
function stringifyBaseComponent(baseSegment, line3dIndex) {
    let value = '';
    value += `${baseSegment.param.index}`;
    if (line3dIndex !== undefined) {
        value += `${_types__WEBPACK_IMPORTED_MODULE_0__.CoordDelimiter}${line3dIndex}`;
    }
    return value;
}
function parseBaseComponent(value) {
    const items = value.split(_types__WEBPACK_IMPORTED_MODULE_0__.BaseLine3dDelimiter);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kcmF3LXN0YWlycy8uL3NyYy9tYWluL21haW4udHMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvLi9zcmMvbWFpbi90b29scy9EcmF3U3RhaXJzVG9vbC9jb25zdHMudHMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvLi9zcmMvbWFpbi90b29scy9EcmF3U3RhaXJzVG9vbC9pbmRleC50cyIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy8uL3NyYy9tYWluL3Rvb2xzL0RyYXdTdGFpcnNUb29sL21lc2hVdGlscy50cyIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy8uL3NyYy9tYWluL3Rvb2xzL0RyYXdTdGFpcnNUb29sL3RlbXBNZXNoVXRpbHMudHMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvLi9zcmMvbWFpbi90b29scy9EcmF3U3RhaXJzVG9vbC90eXBlcy50cyIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy8uL3NyYy9tYWluL3Rvb2xzL0RyYXdTdGFpcnNUb29sL3V0aWxzLnRzIiwid2VicGFjazovL2RyYXctc3RhaXJzLy4vc3JjL21haW4vdHlwZXMudHMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2RyYXctc3RhaXJzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2RyYXctc3RhaXJzL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5pbXBvcnQgeyBkcmF3U3RhaXJzVG9vbCB9IGZyb20gXCIuL3Rvb2xzL0RyYXdTdGFpcnNUb29sL2luZGV4XCI7XHJcbmltcG9ydCB7IGlzS0dyb3VwSW5zdGFuY2UgfSBmcm9tIFwiLi90b29scy9EcmF3U3RhaXJzVG9vbC91dGlsc1wiO1xyXG5pbXBvcnQgeyBNZXNzYWdlVHlwZSB9IGZyb20gXCIuL3R5cGVzXCI7XHJcbmNvbnN0IHBsdWdpblVJID0gYXBwLmdldFBsdWdpblVJKCk7XHJcbnBsdWdpblVJLnJlc2l6ZSgzNjAsIDcwMCk7XHJcbnBsdWdpblVJLm1vdW50KCk7XHJcbmxldCBhY3RpdmF0ZWRDdXN0b21Ub29sO1xyXG5mdW5jdGlvbiBvblVJTWVzc2FnZShkYXRhKSB7XHJcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnR5cGUgPT09IE1lc3NhZ2VUeXBlLkRyYXdTdGFpclZpZXdNb3VudGVkKSB7XHJcbiAgICAgICAgICAgICAgICBvblBsdWdpblN0YXJ0VXAoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09IE1lc3NhZ2VUeXBlLkFjdGl2YXRlRHJhd1N0YWlyc1Rvb2wpIHtcclxuICAgICAgICAgICAgICAgIC8vIGlmIChkYXRhLnR5cGUgPT09ICdhY3RpdmF0ZVN0cmFpZ2h0U3RhaXJzVG9vbCcgfHwgZGF0YS50eXBlID09PSAnYWN0aXZhdGVDaXJjdWxhclN0YWlyc1Rvb2wnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZhdGVkQ3VzdG9tVG9vbCAhPT0gZHJhd1N0YWlyc1Rvb2wpIHtcclxuICAgICAgICAgICAgICAgICAgICBhcHAuYWN0aXZhdGVDdXN0b21Ub29sKGRyYXdTdGFpcnNUb29sLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBhY3RpdmF0ZWRDdXN0b21Ub29sID0gZHJhd1N0YWlyc1Rvb2w7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBkcmF3U3RhaXJzVG9vbC5jaGFuZ2VDb21wb25lbnRUeXBlKGRhdGEuY29tcG9uZW50VHlwZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSBNZXNzYWdlVHlwZS5EZUFjdGl2YXRlRHJhd1N0YWlyc1Rvb2wpIHtcclxuICAgICAgICAgICAgICAgIC8vIH0gZWxzZSBpZiAoZGF0YS50eXBlID09PSAnZGVBY3RpdmF0ZVN0cmFpZ2h0U3RhaXJzVG9vbCcgfHwgZGF0YS50eXBlID09PSAnZGVBY3RpdmF0ZUNpcmN1bGFyU3RhaXJzVG9vbCcpIHtcclxuICAgICAgICAgICAgICAgIGRlQWN0aXZhdGVEcmF3U3RhaXJzVG9vbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gTWVzc2FnZVR5cGUuU3RhaXJQYXJhbUNoYW5nZWRCeUlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoYWN0aXZhdGVkQ3VzdG9tVG9vbCA9PT0gZHJhd1N0YWlyc1Rvb2wpIHtcclxuICAgICAgICAgICAgICAgIGRyYXdTdGFpcnNUb29sLmNoYW5nZVN0YWlyUGFyYW0oZGF0YS5zdGFpclBhcmFtLCBkYXRhLmNoYW5nZVBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSBNZXNzYWdlVHlwZS5QYXJhbUNoYW5nZWRCeUlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoYWN0aXZhdGVkQ3VzdG9tVG9vbCA9PT0gZHJhd1N0YWlyc1Rvb2wpIHtcclxuICAgICAgICAgICAgICAgIGRyYXdTdGFpcnNUb29sLmNoYW5nZUNvbXBvbmVudFBhcmFtKGRhdGEuY29tcG9uZW50UGFyYW0sIGRhdGEuY2hhbmdlUGFyYW1zKTtcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09IE1lc3NhZ2VUeXBlLkZvY3VzQ29tcG9uZW50SW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIC8vIGlmIChhY3RpdmF0ZWRDdXN0b21Ub29sID09PSBkcmF3U3RhaXJzVG9vbCkge1xyXG4gICAgICAgICAgICAgICAgZHJhd1N0YWlyc1Rvb2wuZm9jdXNDb21wb25lbnQoZGF0YS5jb21wb25lbnRJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSBNZXNzYWdlVHlwZS5SZW1vdmVDb21wb25lbnQpIHtcclxuICAgICAgICAgICAgICAgIC8vIGlmIChhY3RpdmF0ZWRDdXN0b21Ub29sID09PSBkcmF3U3RhaXJzVG9vbCkge1xyXG4gICAgICAgICAgICAgICAgZHJhd1N0YWlyc1Rvb2wucmVtb3ZlQ29tcG9uZW50KGRhdGEuY29tcG9uZW50SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgY2xvc2VQbHVnaW4oKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZGVBY3RpdmF0ZURyYXdTdGFpcnNUb29sKCkge1xyXG4gICAgYWN0aXZhdGVkQ3VzdG9tVG9vbCA9IHVuZGVmaW5lZDtcclxuICAgIGFwcC5kZWFjdGl2YXRlQ3VzdG9tVG9vbChkcmF3U3RhaXJzVG9vbCwgZmFsc2UpO1xyXG59XHJcbnBsdWdpblVJLm9uTWVzc2FnZShvblVJTWVzc2FnZSk7XHJcbmNvbnN0IHNlbGVjdGlvbiA9IGFwcC5nZXRTZWxlY3Rpb24oKTtcclxuc2VsZWN0aW9uLmFkZE9ic2VydmVyKHtcclxuICAgIG9uU2VsZWN0aW9uQ2hhbmdlOiAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYWxsRW50aXRpZXMgPSBzZWxlY3Rpb24uZ2V0QWxsRW50aXRpZXMoKTtcclxuICAgICAgICBpZiAoYWxsRW50aXRpZXMubGVuZ3RoID09PSAxICYmIGlzS0dyb3VwSW5zdGFuY2UoYWxsRW50aXRpZXNbMF0pKSB7XHJcbiAgICAgICAgICAgIGRyYXdTdGFpcnNUb29sLmNsZWFyVGVtcFNoYXBlcygpO1xyXG4gICAgICAgICAgICBkcmF3U3RhaXJzVG9vbC5zZXRNb2RlbChhbGxFbnRpdGllc1swXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGFsbEVudGl0aWVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zdCBlZGl0UGF0aCA9IGFwcC5nZXRBY3RpdmVEZXNpZ24oKS5nZXRFZGl0UGF0aCgpO1xyXG4gICAgICAgICAgICBjb25zdCBlZGl0TW9kZWwgPSBkcmF3U3RhaXJzVG9vbC5nZXRFZGl0TW9kZWwoKTtcclxuICAgICAgICAgICAgaWYgKCFlZGl0TW9kZWwgfHwgKGVkaXRQYXRoLmV2ZXJ5KGluc3RhbmNlID0+IGluc3RhbmNlLmdldEtleSgpICE9PSBlZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlS2V5ICYmIFsuLi5lZGl0TW9kZWwuY2hpbGQudmFsdWVzKCldLmV2ZXJ5KGNvbXAgPT4gY29tcC5pbnN0YW5jZUtleSAhPT0gaW5zdGFuY2UuZ2V0S2V5KCkpKSkpIHtcclxuICAgICAgICAgICAgICAgIGRyYXdTdGFpcnNUb29sLmNsZWFyVGVtcFNoYXBlcygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGl2YXRlZEN1c3RvbVRvb2wgIT09IGRyYXdTdGFpcnNUb29sKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5Qcm9wZXJ0aWVzVmlzaWJsZSwgcHJvcGVydGllc1Zpc2libGU6IGZhbHNlIH0sICcqJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5mdW5jdGlvbiBvblBsdWdpblN0YXJ0VXAoKSB7XHJcbiAgICBjb25zdCBhbGxFbnRpdGllcyA9IHNlbGVjdGlvbi5nZXRBbGxFbnRpdGllcygpO1xyXG4gICAgaWYgKGFsbEVudGl0aWVzLmxlbmd0aCA9PT0gMSAmJiBpc0tHcm91cEluc3RhbmNlKGFsbEVudGl0aWVzWzBdKSkge1xyXG4gICAgICAgIGRyYXdTdGFpcnNUb29sLnNldE1vZGVsKGFsbEVudGl0aWVzWzBdKTtcclxuICAgIH1cclxuICAgIGFwcC5hZGRPYnNlcnZlcih7XHJcbiAgICAgICAgb25QbHVnaW5DbG9zZWQ6ICgpID0+IHtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uTW9kZWxDaGFuZ2VkLFxyXG4gICAgfSk7XHJcbn1cclxuZnVuY3Rpb24gb25Nb2RlbENoYW5nZWQoY2hhbmdlcykge1xyXG4gICAgY29uc3QgZGVsZXRlZCA9IGNoYW5nZXMuZGVsZXRlZDtcclxuICAgIGNvbnN0IGVkaXRNb2RlbCA9IGRyYXdTdGFpcnNUb29sLmdldEVkaXRNb2RlbCgpO1xyXG4gICAgaWYgKChkZWxldGVkID09PSBudWxsIHx8IGRlbGV0ZWQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRlbGV0ZWQubGVuZ3RoKSAmJiBlZGl0TW9kZWwpIHtcclxuICAgICAgICBpZiAoZGVsZXRlZC5zb21lKGRlbGV0ZUdyb3VwID0+IGVkaXRNb2RlbC5wYXJlbnQuZGVmaW5pdGlvbktleSA9PT0gZGVsZXRlR3JvdXAuZ2V0S2V5KCkpKSB7XHJcbiAgICAgICAgICAgIGRyYXdTdGFpcnNUb29sLmNsZWFyRWRpdE1vZGVsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IERlZmF1bHRDb21wb25lbnRQYXJhbSB9IGZyb20gXCIuL3R5cGVzXCI7XHJcbmV4cG9ydCBjb25zdCBkdW1teU1hdHJpeDQgPSBHZW9tTGliLmNyZWF0ZUlkZW50aXR5TWF0cml4NCgpO1xyXG5leHBvcnQgY29uc3QgZHVtbXlWZWN0b3IzZCA9IEdlb21MaWIuY3JlYXRlVmVjdG9yM2QoMCwgMCwgMSk7XHJcbmV4cG9ydCBjb25zdCBkdW1teVBvaW50M2QgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QoMCwgMCwgMCk7XHJcbmV4cG9ydCBjb25zdCBEaXJlY3Rpb25aID0gR2VvbUxpYi5jcmVhdGVWZWN0b3IzZCgwLCAwLCAxKTtcclxuZXhwb3J0IGNvbnN0IERpcmVjdGlvblggPSBHZW9tTGliLmNyZWF0ZVZlY3RvcjNkKDEsIDAsIDApO1xyXG4vLyBjb25zdCBIZWlnaHRUb2xlcmFuY2U6IG51bWJlciA9IDU7XHJcbmV4cG9ydCBjb25zdCBMZW5ndGhUb2xlcmFuY2UgPSAxMDtcclxuZXhwb3J0IGNvbnN0IERpcmVjdGlvbkFuZ2xlVG9sZXJhbmNlID0gTWF0aC5QSSAvIDM2O1xyXG5leHBvcnQgY29uc3QgQW5nbGVUb2xlcmFuY2UgPSBNYXRoLlBJIC8gMTgwO1xyXG5leHBvcnQgY29uc3QgU3RlcENvdW50TGltaXQgPSA4MDtcclxuLy8gY29uc3QgRGVmYXVsdEJvYXJkVGhpY2tuZXNzID0gNTA7XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRFbXB0eVNlZ21lbnQoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHN0YXJ0OiBkdW1teVBvaW50M2QsXHJcbiAgICAgICAgZW5kOiBkdW1teVBvaW50M2QsXHJcbiAgICAgICAgc3RhcnRMb2NrZWQ6IGZhbHNlLFxyXG4gICAgICAgIGVuZExvY2tlZDogZmFsc2UsXHJcbiAgICAgICAgc3RhcnRIZWlnaHQ6IDAsXHJcbiAgICAgICAgZW5kSGVpZ2h0OiAwLFxyXG4gICAgICAgIHN0YWlyU2hhcGU6IHtcclxuICAgICAgICAgICAgc3RlcENvdW50OiAwLFxyXG4gICAgICAgICAgICB2ZXJ0aWNlczogW10sXHJcbiAgICAgICAgICAgIHRlbXBMaW5lczogW10sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtb2xkU2hhcGU6IHtcclxuICAgICAgICAgICAgc3RlcENvdW50OiAwLFxyXG4gICAgICAgICAgICB2ZXJ0aWNlczogW10sXHJcbiAgICAgICAgICAgIHRlbXBMaW5lczogW10sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb3JuZXJTaGFwZToge1xyXG4gICAgICAgICAgICBzdGVwQ291bnQ6IDAsXHJcbiAgICAgICAgICAgIHZlcnRpY2VzOiBbXSxcclxuICAgICAgICAgICAgdGVtcExpbmVzOiBbXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvcm5lck1vbGRTaGFwZToge1xyXG4gICAgICAgICAgICBzdGVwQ291bnQ6IDAsXHJcbiAgICAgICAgICAgIHZlcnRpY2VzOiBbXSxcclxuICAgICAgICAgICAgdGVtcExpbmVzOiBbXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIG5leHRDb21wb25lbnRzOiBBcnJheS5mcm9tKHsgbGVuZ3RoOiA2IH0sIF8gPT4gbmV3IFNldCgpKSxcclxuICAgICAgICBwYXJhbTogT2JqZWN0LmFzc2lnbih7fSwgRGVmYXVsdENvbXBvbmVudFBhcmFtKSxcclxuICAgIH07XHJcbn1cclxuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5pbXBvcnQgeyBDb21wb25lbnRUeXBlLCBQYXJhbUtleSwgU3RhcnRFbmRLZXksIEJhc2VMaW5lU2VnM2RLZXksIFN0YWlyTW9kZWxLZXksIENvbXBvbmVudFBhcmFtVHlwZSwgU3RhaXJNb2RlbFZhbHVlLCBDaXJjbGVUYW5nZW50S2V5LCBEZWZhdWx0U3RhaXJQYXJhbSwgQmFzZUNvbXBvbmVudEtleSB9IGZyb20gXCIuL3R5cGVzXCI7XHJcbmltcG9ydCB7IGdlbmVyYXRlSGFuZHJhaWxTaGFwZSwgZ2VuZXJhdGVTaGFwZSB9IGZyb20gXCIuL3RlbXBNZXNoVXRpbHNcIjtcclxuaW1wb3J0IHsgYnVpbGRDb21wb25lbnRJbnN0YW5jZSwgYnVpbGRIYW5kcmFpbEluc3RhbmNlLCBidWlsZFNlZ21lbnRSZWxhdGlvbnMsIGNoYW5nZVN0YWlyVXB3YXJkLCBnZW5lcmF0ZU1lc2hlcywgZ2V0U2VnbWVudEJ5SW5kZXggfSBmcm9tIFwiLi9tZXNoVXRpbHNcIjtcclxuaW1wb3J0IHsgcGFyc2VCYXNlQ29tcG9uZW50LCBwYXJzZUxpbmVTZWczZCwgcGFyc2VQYXJhbSwgcGFyc2VTdGFydEVuZCwgcGFyc2VWZWN0b3IzZCB9IGZyb20gXCIuL3V0aWxzXCI7XHJcbmltcG9ydCB7IGdldEVtcHR5U2VnbWVudCB9IGZyb20gXCIuL2NvbnN0c1wiO1xyXG5pbXBvcnQgeyBkZUFjdGl2YXRlRHJhd1N0YWlyc1Rvb2wgfSBmcm9tIFwiLi4vLi4vLi4vbWFpbi9tYWluXCI7XHJcbmltcG9ydCB7IE1lc3NhZ2VUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL21haW4vdHlwZXNcIjtcclxuY29uc3QgZGVzaWduID0gYXBwLmdldEFjdGl2ZURlc2lnbigpO1xyXG5jb25zdCBzZWxlY3Rpb24gPSBhcHAuZ2V0U2VsZWN0aW9uKCk7XHJcbmNvbnN0IHBsdWdpblVJID0gYXBwLmdldFBsdWdpblVJKCk7XHJcbmNvbnN0IGFwcFZpZXcgPSBhcHAuZ2V0QWN0aXZlVmlldygpO1xyXG5jb25zdCB0b29sSGVscGVyID0gYXBwLmdldFRvb2xIZWxwZXIoKTtcclxuY29uc3QgRGVmYXVsdEZvY3VzZWRDb21wb25lbnRJbmRleCA9IC0xO1xyXG5leHBvcnQgY2xhc3MgRHJhd1N0YWlyc1Rvb2wge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgLy8gcHJpdmF0ZSBjb21wb25lbnRQYXJhbTogQ29tcG9uZW50UGFyYW0gPSB7IC4uLkRlZmF1bHRDb21wb25lbnRQYXJhbSB9O1xyXG4gICAgICAgIHRoaXMuZHJhd2luZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4ID0gRGVmYXVsdEZvY3VzZWRDb21wb25lbnRJbmRleDtcclxuICAgICAgICB0aGlzLnNlZ21lbnRzID0gW107XHJcbiAgICAgICAgdGhpcy5zdGFpclBhcmFtID0gRGVmYXVsdFN0YWlyUGFyYW07XHJcbiAgICB9XHJcbiAgICBvblRvb2xBY3RpdmUoKSB7XHJcbiAgICAgICAgdG9vbEhlbHBlci5zZXRFeGNsdWRlSW5mZXJlbmNlVHlwZXMoW1xyXG4gICAgICAgICAgICBLRW50aXR5VHlwZS5GYWNlLCBLRW50aXR5VHlwZS5FZGdlLCBLRW50aXR5VHlwZS5BdXhpbGlhcnlCb3VuZGVkQ3VydmUsIEtFbnRpdHlUeXBlLkF1eGlsaWFyeUxpbmUsIEtFbnRpdHlUeXBlLkF1eGlsaWFyeVZlcnRleCxcclxuICAgICAgICAgICAgS0VudGl0eVR5cGUuR3JvdXBJbnN0YW5jZSwgS0VudGl0eVR5cGUuVmVydGV4LCBLQXJjaEZhY2VUeXBlLk5vblBsYW5hciwgS0FyY2hGYWNlVHlwZS5QbGFuYXIsXHJcbiAgICAgICAgXSk7XHJcbiAgICAgICAgY29uc3QgZmlyc3RTZWdtZW50ID0gZ2V0RW1wdHlTZWdtZW50KCk7XHJcbiAgICAgICAgZmlyc3RTZWdtZW50LnN0YXJ0TG9ja2VkID0gZmFsc2U7XHJcbiAgICAgICAgLy8gdGhpcy5zdGFpclBhcmFtID0gRGVmYXVsdFN0YWlyUGFyYW07XHJcbiAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5EcmF3U3RhaXJNb2RlbFNldHRsZWQsIGNvbXBvbmVudFBhcmFtczogW2ZpcnN0U2VnbWVudC5wYXJhbV0sIHN0YWlyUGFyYW06IHRoaXMuc3RhaXJQYXJhbSwgbmV3U3RhaXI6IHRydWUgfSwgJyonKTtcclxuICAgICAgICB0aGlzLnNlZ21lbnRzID0gW2ZpcnN0U2VnbWVudF07XHJcbiAgICAgICAgdGhpcy5kcmF3aW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNsZWFyVGVtcFNoYXBlcygpO1xyXG4gICAgICAgIHRoaXMuZWRpdE1vZGVsID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4ID0gMDtcclxuICAgIH1cclxuICAgIG9uVG9vbERlYWN0aXZlKCkge1xyXG4gICAgICAgIHRvb2xIZWxwZXIuc2V0RXhjbHVkZUluZmVyZW5jZVR5cGVzKFtdKTtcclxuICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuZWRpdE1vZGVsKSB7XHJcbiAgICAgICAgICAgIHNlbGVjdGlvbi5hZGQoW3RoaXMuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5MZWF2ZURyYXdTdGFpcnNUb29sIH0sICcqJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlQWN0aXZhdGVEcmF3U3RhaXJzVG9vbCgpO1xyXG4gICAgfVxyXG4gICAgb25Nb3VzZU1vdmUoZXZlbnQsIGluZmVyZW5jZVJlc3VsdCkge1xyXG4gICAgICAgIHZhciBfYSwgX2I7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ29uTW91c2VNb3ZlJyk7XHJcbiAgICAgICAgaWYgKGluZmVyZW5jZVJlc3VsdCkge1xyXG4gICAgICAgICAgICAvLyBjb25zdCB7IHN0YXJ0V2lkdGgsIGVuZFdpZHRoLCBwbGF0Zm9ybVRoaWNrbmVzcyB9ID0gdGhpcy5jb21wb25lbnRQYXJhbTtcclxuICAgICAgICAgICAgY29uc3QgcG9zaXRpb24gPSBpbmZlcmVuY2VSZXN1bHQucG9zaXRpb247XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlZ21lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdFNlZ21lbnQgPSB0aGlzLnNlZ21lbnRzW3RoaXMuc2VnbWVudHMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnbGFzdFNlZ21lbnQuc3RhcnRMb2NrZWQnLCBsYXN0U2VnbWVudC5zdGFydExvY2tlZCk7XHJcbiAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5wYXJhbS5tb2RlbEVkaXRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmIChsYXN0U2VnbWVudC5zdGFydExvY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LmVuZCA9IHBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBDb21wb25lbnQobGFzdFNlZ21lbnQsIGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlZ21lbnRzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJldlNlZ21lbnQgPSB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCA9PT0gbGFzdFNlZ21lbnQucGFyYW0uaW5kZXggPyB0aGlzLnNlZ21lbnRzW3RoaXMuc2VnbWVudHMubGVuZ3RoIC0gMl0gOiBnZXRTZWdtZW50QnlJbmRleCh0aGlzLnNlZ21lbnRzLCB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG11c3QgYmUgdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHByZXZTZWdtZW50ID09PSBudWxsIHx8IHByZXZTZWdtZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwcmV2U2VnbWVudC5wYXJhbS50eXBlKSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBtb2xkU2hhcGU6IHsgdmVydGljZXMsIHRlbXBMaW5lcyB9IH0gPSBwcmV2U2VnbWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoKF9hID0gbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxpbmUzZEluZGV4KSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldlNlZ21lbnQubmV4dENvbXBvbmVudHMuZm9yRWFjaChpbmRzID0+IGluZHMuZGVsZXRlKGxhc3RTZWdtZW50LnBhcmFtLmluZGV4KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2xvc2VzdFBvaW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1pbkRpc3RhbmNlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5mb3JFYWNoKChsaW5lLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVTZWczZCA9IEdlb21MaWIuY3JlYXRlTGluZVNlZ21lbnQzZCh2ZXJ0aWNlc1tsaW5lWzBdXSwgdmVydGljZXNbbGluZVsxXV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoZVBvaW50ID0gbGluZVNlZzNkLmdldENsb3Nlc3RQb2ludChwb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyRGlzdGFuY2UgPSB0aGVQb2ludC5kaXN0YW5jZVRvKHBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNsb3Nlc3RQb2ludCB8fCBjdXJEaXN0YW5jZSA8IG1pbkRpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbkRpc3RhbmNlID0gY3VyRGlzdGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RQb2ludCA9IHRoZVBvaW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5zdGFydCA9IGNsb3Nlc3RQb2ludDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGFzdFNlZ21lbnQuYmFzZUxpbmVTZWczZCA9IHsgc3RhcnQ6IHZlcnRpY2VzW2xpbmVbMF1dLCBlbmQ6IHZlcnRpY2VzW2xpbmVbMV1dIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQgPSB7IGNvbXBvbmVudEluZGV4OiBwcmV2U2VnbWVudC5wYXJhbS5pbmRleCwgbGluZTNkSW5kZXg6IGluZGV4LCBsaW5lM2Q6IHsgc3RhcnQ6IHZlcnRpY2VzW2xpbmVbMF1dLCBlbmQ6IHZlcnRpY2VzW2xpbmVbMV1dIH0gfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHByZXZTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgodGhpcy5zZWdtZW50cywgbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKChfYiA9IGxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5saW5lM2RJbmRleCkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTZWdtZW50Lm5leHRDb21wb25lbnRzW2xhc3RTZWdtZW50LmJhc2VDb21wb25lbnQubGluZTNkSW5kZXhdLmFkZChsYXN0U2VnbWVudC5wYXJhbS5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdQaWNrU3RhcnRUZW1wU2hhcGVzKHBvc2l0aW9uLCBsYXN0U2VnbWVudC5zdGFydCwgbGFzdFNlZ21lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5zdGFydCA9IHBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChsYXN0U2VnbWVudC5wYXJhbS50eXBlID09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gJiYgIWxhc3RTZWdtZW50LnBhcmFtLnBsYXRmb3JtTGVuZ3RoTG9ja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5QYXJhbUNoYW5nZWRCeURyYXcsIGNvbXBvbmVudFBhcmFtOiBPYmplY3QuYXNzaWduKHt9LCBsYXN0U2VnbWVudC5wYXJhbSkgfSwgJyonKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uTEJ1dHRvblVwKGV2ZW50LCBpbmZlcmVuY2VSZXN1bHQpIHtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ29uTEJ1dHRvblVwJyk7XHJcbiAgICAgICAgaWYgKGluZmVyZW5jZVJlc3VsdCkge1xyXG4gICAgICAgICAgICAvLyBjb25zdCBwb3NpdGlvbiA9IGluZmVyZW5jZVJlc3VsdC5wb3NpdGlvbjtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VnbWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0U2VnbWVudCA9IHRoaXMuc2VnbWVudHNbdGhpcy5zZWdtZW50cy5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgICAgIGlmIChsYXN0U2VnbWVudC5zdGFydExvY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwdXNoIHNlZ21lbnQnKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHN0YXJ0LCBlbmQsIHBhcmFtOiB7IHR5cGUgfSwgY2lyY2xlVGFuZ2VudCB9ID0gbGFzdFNlZ21lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpciAmJiAhY2lyY2xlVGFuZ2VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5jaXJjbGVUYW5nZW50ID0gZW5kLnN1YnRyYWN0ZWQoc3RhcnQpLm5vcm1hbGl6ZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LmVuZExvY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RQYXJhbSA9IGxhc3RTZWdtZW50LnBhcmFtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0U2VnbWVudCA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgZ2V0RW1wdHlTZWdtZW50KCkpLCB7IHN0YXJ0OiBsYXN0U2VnbWVudC5lbmQsIGVuZDogbGFzdFNlZ21lbnQuZW5kLCBzdGFydExvY2tlZDogbGFzdFBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gPyBmYWxzZSA6IHRydWUsIHN0YXJ0SGVpZ2h0OiBsYXN0U2VnbWVudC5lbmRIZWlnaHQsIGVuZEhlaWdodDogbGFzdFNlZ21lbnQuZW5kSGVpZ2h0LCBwYXJhbTogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBsYXN0UGFyYW0pLCB7IGluZGV4OiBsYXN0UGFyYW0uaW5kZXggKyAxLCBzdGFydFdpZHRoOiBsYXN0UGFyYW0uZW5kV2lkdGgsIG9mZnNldFdpZHRoOiAwLCB0eXBlOiBsYXN0UGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSA/IENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpciA6IENvbXBvbmVudFR5cGUuUGxhdGZvcm0sIHBsYXRmb3JtTGVuZ3RoTG9ja2VkOiBmYWxzZSB9KSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBtb2xkU2hhcGU6IHsgdmVydGljZXMsIHRlbXBMaW5lcyB9IH0gPSBsYXN0U2VnbWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsYXN0U2VnbWVudC5iYXNlTGluZVNlZzNkID0geyBzdGFydDogdmVydGljZXNbMF0sIGVuZDogdmVydGljZXNbMV0gfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQgPSB7IGxpbmUzZDogeyBzdGFydDogdmVydGljZXNbMF0sIGVuZDogdmVydGljZXNbMV0gfSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFzZVNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleCh0aGlzLnNlZ21lbnRzLCBsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiYXNlU2VnbWVudCAmJiAoKF9hID0gbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxpbmUzZEluZGV4KSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFzZVNlZ21lbnQubmV4dENvbXBvbmVudHNbbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleF0uYWRkKGxhc3RQYXJhbS5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmV4dFNlZ21lbnQuYmFzZUxpbmVTZWczZCA9IHsgc3RhcnQ6IHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLCBlbmQ6IHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0U2VnbWVudC5zdGFydExvY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQubmV4dENvbXBvbmVudHNbMF0uYWRkKG5leHRTZWdtZW50LnBhcmFtLmluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0U2VnbWVudC5iYXNlQ29tcG9uZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50SW5kZXg6IGxhc3RQYXJhbS5pbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUzZEluZGV4OiBsYXN0UGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSA/IHRlbXBMaW5lcy5sZW5ndGggLSAxIDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUzZDogeyBzdGFydDogdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0sIGVuZDogdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0UGFyYW0ubW9kZWxFZGl0aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5QYXJhbUNoYW5nZWRCeURyYXcsIGNvbXBvbmVudFBhcmFtOiBsYXN0UGFyYW0gfSwgJyonKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWdtZW50cy5wdXNoKG5leHRTZWdtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4ICE9PSBsYXN0UGFyYW0uaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvY3VzZWRTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgodGhpcy5zZWdtZW50cywgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvY3VzZWRTZWdtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3VGVtcENvbXBvbmVudChmb2N1c2VkU2VnbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggPSBuZXh0U2VnbWVudC5wYXJhbS5pbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5Db21wb25lbnRBZGRlZCwgY29tcG9uZW50UGFyYW06IE9iamVjdC5hc3NpZ24oe30sIG5leHRTZWdtZW50LnBhcmFtKSB9LCAnKicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LnN0YXJ0TG9ja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyUGlja1N0YXJ0VGVtcFNoYXBlcyhsYXN0U2VnbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3VGVtcENvbXBvbmVudChsYXN0U2VnbWVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkcmF3UGlja1N0YXJ0VGVtcFNoYXBlcyhwb3NpdGlvbiwgY2xvc2VzdFBvaW50LCB0aGVTZWdtZW50KSB7XHJcbiAgICAgICAgaWYgKHRoZVNlZ21lbnQucGlja1N0YXJ0VGVtcFNoYXBlSWQpIHtcclxuICAgICAgICAgICAgYXBwVmlldy5jbGVhclRlbXBvcmFyeVNoYXBlc0J5SWRzKFt0aGVTZWdtZW50LnBpY2tTdGFydFRlbXBTaGFwZUlkXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjbG9zZXN0UG9pbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgcGlja1N0YXJ0VGVtcFNoYXBlSWQgPSBhcHBWaWV3LmRyYXdMaW5lcyhbcG9zaXRpb24sIGNsb3Nlc3RQb2ludF0sIHsgY29sb3I6IHsgcjogMCwgZzogMCwgYjogMjU1IH0sIGRlcHRoVGVzdDogdHJ1ZSwgcGF0dGVybjogS0xpbmVQYXR0ZXJuLkRhc2gsIGdhcFNpemU6IDUwLCBkYXNoU2l6ZTogNTAgfSk7XHJcbiAgICAgICAgICAgIGlmIChwaWNrU3RhcnRUZW1wU2hhcGVJZCA9PT0gbnVsbCB8fCBwaWNrU3RhcnRUZW1wU2hhcGVJZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGlja1N0YXJ0VGVtcFNoYXBlSWQuaWQpIHtcclxuICAgICAgICAgICAgICAgIHRoZVNlZ21lbnQucGlja1N0YXJ0VGVtcFNoYXBlSWQgPSBwaWNrU3RhcnRUZW1wU2hhcGVJZC5pZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNsZWFyUGlja1N0YXJ0VGVtcFNoYXBlcyh0aGVTZWdtZW50KSB7XHJcbiAgICAgICAgaWYgKHRoZVNlZ21lbnQucGlja1N0YXJ0VGVtcFNoYXBlSWQpIHtcclxuICAgICAgICAgICAgYXBwVmlldy5jbGVhclRlbXBvcmFyeVNoYXBlc0J5SWRzKFt0aGVTZWdtZW50LnBpY2tTdGFydFRlbXBTaGFwZUlkXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZHJhd1RlbXBDb21wb25lbnQodGhlU2VnbWVudCwgZm9jdXNlZCA9IGZhbHNlLCBkcmF3SGFuZHJhaWwgPSBmYWxzZSkge1xyXG4gICAgICAgIHZhciBfYSwgX2I7XHJcbiAgICAgICAgaWYgKHRoZVNlZ21lbnQuc3RhcnRMb2NrZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZVNlZ21lbnRTaGFwZSh0aGVTZWdtZW50LCB0aGlzLmRyYXdpbmcpO1xyXG4gICAgICAgICAgICBjb25zdCB7IHN0YWlyU2hhcGU6IHsgdmVydGljZXM6IHN0YWlyVmVydGljZXMsIHRlbXBMaW5lczogc3RhaXJUZW1wTGluZXMgfSwgbW9sZFNoYXBlOiB7IHZlcnRpY2VzOiBtb2xkVmVydGljZXMsIHRlbXBMaW5lczogbW9sZFRlbXBMaW5lcyB9LCBjb3JuZXJTaGFwZTogeyB2ZXJ0aWNlczogY29ybmVyVmVydGljZXMsIHRlbXBMaW5lczogY29ybmVyVGVtcExpbmVzIH0sIGNvcm5lck1vbGRTaGFwZTogeyB2ZXJ0aWNlczogY29ybmVyTW9sZFZlcnRpY2VzLCB0ZW1wTGluZXM6IGNvcm5lck1vbGRUZW1wTGluZXMgfSwgfSA9IHRoZVNlZ21lbnQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlbXBMaW5lUG9pbnRzID0gW107XHJcbiAgICAgICAgICAgIGNvbnN0IG1vbGRUZW1wTGluZVBvaW50cyA9IFtdO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kcmF3aW5nKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHN0YWlyVGVtcExpbmUgb2Ygc3RhaXJUZW1wTGluZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZVBvaW50cy5wdXNoKFtzdGFpclZlcnRpY2VzW3N0YWlyVGVtcExpbmVbMF1dLCBzdGFpclZlcnRpY2VzW3N0YWlyVGVtcExpbmVbMV1dXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGNvcm5lclRlbXBMaW5lIG9mIGNvcm5lclRlbXBMaW5lcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lUG9pbnRzLnB1c2goW2Nvcm5lclZlcnRpY2VzW2Nvcm5lclRlbXBMaW5lWzBdXSwgY29ybmVyVmVydGljZXNbY29ybmVyVGVtcExpbmVbMV1dXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChjb25zdCBtb2xkVGVtcExpbmUgb2YgbW9sZFRlbXBMaW5lcykge1xyXG4gICAgICAgICAgICAgICAgbW9sZFRlbXBMaW5lUG9pbnRzLnB1c2goW21vbGRWZXJ0aWNlc1ttb2xkVGVtcExpbmVbMF1dLCBtb2xkVmVydGljZXNbbW9sZFRlbXBMaW5lWzFdXV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgY29ybmVyTW9sZFRlbXBMaW5lIG9mIGNvcm5lck1vbGRUZW1wTGluZXMpIHtcclxuICAgICAgICAgICAgICAgIG1vbGRUZW1wTGluZVBvaW50cy5wdXNoKFtjb3JuZXJNb2xkVmVydGljZXNbY29ybmVyTW9sZFRlbXBMaW5lWzBdXSwgY29ybmVyTW9sZFZlcnRpY2VzW2Nvcm5lck1vbGRUZW1wTGluZVsxXV1dKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoKF9hID0gdGhlU2VnbWVudC50ZW1wU2hhcGVJZCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgYXBwVmlldy5jbGVhclRlbXBvcmFyeVNoYXBlc0J5SWRzKHRoZVNlZ21lbnQudGVtcFNoYXBlSWQpO1xyXG4gICAgICAgICAgICAgICAgdGhlU2VnbWVudC50ZW1wU2hhcGVJZCA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGRyYXdUZW1wTGluZXNGdW5jID0gZm9jdXNlZCA/IGFwcFZpZXcuZHJhd0ZsYXRMaW5lcy5iaW5kKGFwcFZpZXcpIDogYXBwVmlldy5kcmF3UG9seWxpbmVzLmJpbmQoYXBwVmlldyk7XHJcbiAgICAgICAgICAgIGlmICh0ZW1wTGluZVBvaW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnN0IGNvbG9yVmFsdWUgPSBmb2N1c2VkID8gMjU1IDogMTU1O1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGVtcFNoYXBlSWQgPSBkcmF3VGVtcExpbmVzRnVuYyh0ZW1wTGluZVBvaW50cywgeyBjb2xvcjogeyByOiAyNTUsIGc6IDAsIGI6IDAgfSwgZGVwdGhUZXN0OiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgIGlmICh0ZW1wU2hhcGVJZCA9PT0gbnVsbCB8fCB0ZW1wU2hhcGVJZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogdGVtcFNoYXBlSWQuaWRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhlU2VnbWVudC50ZW1wU2hhcGVJZCA9IFsuLi50ZW1wU2hhcGVJZC5pZHNdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChtb2xkVGVtcExpbmVQb2ludHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtb2xkVGVtcFNoYXBlSWQgPSBkcmF3VGVtcExpbmVzRnVuYyhtb2xkVGVtcExpbmVQb2ludHMsIHsgY29sb3I6IHsgcjogMCwgZzogMjU1LCBiOiAwIH0sIGRlcHRoVGVzdDogdGhpcy5kcmF3aW5nIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vbGRUZW1wU2hhcGVJZCA9PT0gbnVsbCB8fCBtb2xkVGVtcFNoYXBlSWQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1vbGRUZW1wU2hhcGVJZC5pZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKF9iID0gdGhlU2VnbWVudC50ZW1wU2hhcGVJZCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGVTZWdtZW50LnRlbXBTaGFwZUlkLnB1c2goLi4ubW9sZFRlbXBTaGFwZUlkLmlkcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGVTZWdtZW50LnRlbXBTaGFwZUlkID0gWy4uLm1vbGRUZW1wU2hhcGVJZC5pZHNdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZHJhd0hhbmRyYWlsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdIYW5kcmFpbHMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGRyYXdIYW5kcmFpbHMoKSB7XHJcbiAgICAgICAgdmFyIF9hLCBfYjtcclxuICAgICAgICBjb25zdCBwcmV2SGFuZHJhaWxUZW1wU2hhcGVJZHMgPSAoX2EgPSB0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRlbXBTaGFwZUlkO1xyXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVIYW5kcmFpbFNoYXBlKCk7XHJcbiAgICAgICAgaWYgKHByZXZIYW5kcmFpbFRlbXBTaGFwZUlkcyA9PT0gbnVsbCB8fCBwcmV2SGFuZHJhaWxUZW1wU2hhcGVJZHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHByZXZIYW5kcmFpbFRlbXBTaGFwZUlkcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgYXBwVmlldy5jbGVhclRlbXBvcmFyeVNoYXBlc0J5SWRzKHByZXZIYW5kcmFpbFRlbXBTaGFwZUlkcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGhhbmRyYWlscyA9IChfYiA9IHRoaXMuaGFuZHJhaWxDb2xsZWN0aW9uKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuaGFuZHJhaWxzO1xyXG4gICAgICAgIGNvbnN0IHRlbXBMaW5lUG9pbnRzID0gW107XHJcbiAgICAgICAgaWYgKHRoaXMuaGFuZHJhaWxDb2xsZWN0aW9uICYmIChoYW5kcmFpbHMgPT09IG51bGwgfHwgaGFuZHJhaWxzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBoYW5kcmFpbHMubGVuZ3RoKSkge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHsgcmFpbCwgY29sdW1ucyB9IG9mIGhhbmRyYWlscykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByYWlsLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJhaWxQb2ludCA9IHJhaWxbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmFpbE5leHRQb2ludCA9IHJhaWxbaSArIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lUG9pbnRzLnB1c2goW3JhaWxQb2ludCwgcmFpbE5leHRQb2ludF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGVtcExpbmVQb2ludHMucHVzaCguLi5jb2x1bW5zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBoYW5kcmFpbFRlbXBTaGFwZUlkcyA9IGFwcFZpZXcuZHJhd1BvbHlsaW5lcyh0ZW1wTGluZVBvaW50cywgeyBjb2xvcjogeyByOiAwLCBnOiAwLCBiOiAyNTUgfSwgZGVwdGhUZXN0OiBmYWxzZSwgcGF0dGVybjogS0xpbmVQYXR0ZXJuLkRhc2ggfSk7XHJcbiAgICAgICAgICAgIGlmIChoYW5kcmFpbFRlbXBTaGFwZUlkcyA9PT0gbnVsbCB8fCBoYW5kcmFpbFRlbXBTaGFwZUlkcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogaGFuZHJhaWxUZW1wU2hhcGVJZHMuaWRzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbi50ZW1wU2hhcGVJZCA9IGhhbmRyYWlsVGVtcFNoYXBlSWRzLmlkcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNsZWFyVGVtcFNoYXBlcyh0aGVTZWdtZW50KSB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIGlmICh0aGVTZWdtZW50KSB7XHJcbiAgICAgICAgICAgIGlmICgoX2EgPSB0aGVTZWdtZW50LnRlbXBTaGFwZUlkKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBhcHBWaWV3LmNsZWFyVGVtcG9yYXJ5U2hhcGVzQnlJZHModGhlU2VnbWVudC50ZW1wU2hhcGVJZCk7XHJcbiAgICAgICAgICAgICAgICB0aGVTZWdtZW50LnRlbXBTaGFwZUlkID0gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFwcFZpZXcuY2xlYXJUZW1wb3JhcnlTaGFwZXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmb2N1c0NvbXBvbmVudChjb21wb25lbnRJbmRleCkge1xyXG4gICAgICAgIHZhciBfYSwgX2I7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VnbWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxhc3RTZWdtZW50ID0gdGhpcy5zZWdtZW50c1t0aGlzLnNlZ21lbnRzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICBjb25zdCBsYXN0U2VnbWVudEluZGV4ID0gbGFzdFNlZ21lbnQucGFyYW0uaW5kZXg7XHJcbiAgICAgICAgICAgIC8vIGlmIChjb21wb25lbnRJbmRleCAhPT0gdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXgpIHtcclxuICAgICAgICAgICAgY29uc3QgbmV3Rm9jdXNlZFNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleCh0aGlzLnNlZ21lbnRzLCBjb21wb25lbnRJbmRleCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG9sZEZvY3VzZWRTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgodGhpcy5zZWdtZW50cywgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXgpO1xyXG4gICAgICAgICAgICBpZiAobmV3Rm9jdXNlZFNlZ21lbnQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYXdpbmcgJiYgIWxhc3RTZWdtZW50LmVuZExvY2tlZCAmJiBjb21wb25lbnRJbmRleCAhPT0gbGFzdFNlZ21lbnRJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgcGFyYW06IHsgdHlwZTogbmV3Rm9jdXNlZFR5cGUgfSwgbW9sZFNoYXBlOiB7IHZlcnRpY2VzOiBuZXdGb2N1c2VkVmVydGljZXMsIHRlbXBMaW5lczogbmV3Rm9jdXNlZFRlbXBMaW5lcyB9IH0gPSBuZXdGb2N1c2VkU2VnbWVudDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHN0YXJ0IH0gPSBsYXN0U2VnbWVudDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyUGlja1N0YXJ0VGVtcFNoYXBlcyhsYXN0U2VnbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhclRlbXBTaGFwZXMobGFzdFNlZ21lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdGb2N1c2VkVHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2xkRm9jdXNlZFNlZ21lbnQgJiYgb2xkRm9jdXNlZFNlZ21lbnQgIT09IG5ld0ZvY3VzZWRTZWdtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRGb2N1c2VkU2VnbWVudC5uZXh0Q29tcG9uZW50cy5mb3JFYWNoKGluZHMgPT4gaW5kcy5kZWxldGUobGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKChfYSA9IGxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5saW5lM2RJbmRleCkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Rm9jdXNlZFNlZ21lbnQubmV4dENvbXBvbmVudHMuZm9yRWFjaChpbmRzID0+IGluZHMuZGVsZXRlKGxhc3RTZWdtZW50LnBhcmFtLmluZGV4KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNsb3Nlc3RQb2ludDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1pbkRpc3RhbmNlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3Rm9jdXNlZFRlbXBMaW5lcy5mb3JFYWNoKChsaW5lLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGluZVNlZzNkID0gR2VvbUxpYi5jcmVhdGVMaW5lU2VnbWVudDNkKG5ld0ZvY3VzZWRWZXJ0aWNlc1tsaW5lWzBdXSwgbmV3Rm9jdXNlZFZlcnRpY2VzW2xpbmVbMV1dKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoZVBvaW50ID0gbGluZVNlZzNkLmdldENsb3Nlc3RQb2ludChzdGFydCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJEaXN0YW5jZSA9IHRoZVBvaW50LmRpc3RhbmNlVG8oc3RhcnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjbG9zZXN0UG9pbnQgfHwgY3VyRGlzdGFuY2UgPCBtaW5EaXN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbkRpc3RhbmNlID0gY3VyRGlzdGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFBvaW50ID0gdGhlUG9pbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuc3RhcnQgPSBjbG9zZXN0UG9pbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGFzdFNlZ21lbnQuYmFzZUxpbmVTZWczZCA9IHsgc3RhcnQ6IG5ld0ZvY3VzZWRWZXJ0aWNlc1tsaW5lWzBdXSwgZW5kOiBuZXdGb2N1c2VkVmVydGljZXNbbGluZVsxXV0gfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50ID0geyBjb21wb25lbnRJbmRleDogbmV3Rm9jdXNlZFNlZ21lbnQucGFyYW0uaW5kZXgsIGxpbmUzZEluZGV4OiBpbmRleCwgbGluZTNkOiB7IHN0YXJ0OiBuZXdGb2N1c2VkVmVydGljZXNbbGluZVswXV0sIGVuZDogbmV3Rm9jdXNlZFZlcnRpY2VzW2xpbmVbMV1dIH0gfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoKF9iID0gbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmxpbmUzZEluZGV4KSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdGb2N1c2VkU2VnbWVudC5uZXh0Q29tcG9uZW50c1tsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50LmxpbmUzZEluZGV4XS5hZGQobGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LnN0YXJ0TG9ja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LmNpcmNsZVRhbmdlbnQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LnN0YXJ0SGVpZ2h0ID0gbmV3Rm9jdXNlZFNlZ21lbnQuZW5kSGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdQaWNrU3RhcnRUZW1wU2hhcGVzKHN0YXJ0LCBsYXN0U2VnbWVudC5zdGFydCwgbGFzdFNlZ21lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFuZXdGb2N1c2VkU2VnbWVudC5uZXh0Q29tcG9uZW50c1swXS5zaXplKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5zdGFydCA9IG5ld0ZvY3VzZWRTZWdtZW50LmVuZC5jbG9uZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuc3RhcnRMb2NrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuc3RhcnRIZWlnaHQgPSBuZXdGb2N1c2VkU2VnbWVudC5lbmRIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsYXN0U2VnbWVudC5iYXNlTGluZVNlZzNkID0geyBzdGFydDogbmV3Rm9jdXNlZFZlcnRpY2VzW25ld0ZvY3VzZWRWZXJ0aWNlcy5sZW5ndGggLSAxXSwgZW5kOiBuZXdGb2N1c2VkVmVydGljZXNbbmV3Rm9jdXNlZFZlcnRpY2VzLmxlbmd0aCAtIDJdIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50ID0geyBjb21wb25lbnRJbmRleDogbmV3Rm9jdXNlZFNlZ21lbnQucGFyYW0uaW5kZXgsIGxpbmUzZEluZGV4OiAwLCBsaW5lM2Q6IHsgc3RhcnQ6IG5ld0ZvY3VzZWRWZXJ0aWNlc1tuZXdGb2N1c2VkVmVydGljZXMubGVuZ3RoIC0gMV0sIGVuZDogbmV3Rm9jdXNlZFZlcnRpY2VzW25ld0ZvY3VzZWRWZXJ0aWNlcy5sZW5ndGggLSAyXSB9IH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdGb2N1c2VkU2VnbWVudC5uZXh0Q29tcG9uZW50c1swXS5hZGQobGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuY2lyY2xlVGFuZ2VudCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBDb21wb25lbnQobGFzdFNlZ21lbnQsIGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGxhc3RTZWdtZW50LnN0YXJ0TG9ja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBsYXN0U2VnbWVudC5jaXJjbGVUYW5nZW50ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCh0aGlzLmRyYXdpbmcgJiYgY29tcG9uZW50SW5kZXggIT09IGxhc3RTZWdtZW50SW5kZXgpIHx8ICF0aGlzLmRyYXdpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdUZW1wQ29tcG9uZW50KG5ld0ZvY3VzZWRTZWdtZW50LCB0aGlzLmRyYXdpbmcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgoKHRoaXMuZHJhd2luZyAmJiB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCAhPT0gbGFzdFNlZ21lbnRJbmRleCkgfHwgKCF0aGlzLmRyYXdpbmcgJiYgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggIT09IGNvbXBvbmVudEluZGV4KSkgJiYgb2xkRm9jdXNlZFNlZ21lbnQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYXdpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdUZW1wQ29tcG9uZW50KG9sZEZvY3VzZWRTZWdtZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJUZW1wU2hhcGVzKG9sZEZvY3VzZWRTZWdtZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4ID0gY29tcG9uZW50SW5kZXg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVtb3ZlQ29tcG9uZW50KGNvbXBvbmVudEluZGV4KSB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIGlmICh0aGlzLnNlZ21lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGVJbmRleCA9IHRoaXMuc2VnbWVudHMuZmluZEluZGV4KHNlZyA9PiBzZWcucGFyYW0uaW5kZXggPT09IGNvbXBvbmVudEluZGV4KTtcclxuICAgICAgICAgICAgaWYgKHRoZUluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRoZVNlZ21lbnQgPSB0aGlzLnNlZ21lbnRzW3RoZUluZGV4XTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYXdpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKF9hID0gdGhlU2VnbWVudC50ZW1wU2hhcGVJZCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBWaWV3LmNsZWFyVGVtcG9yYXJ5U2hhcGVzQnlJZHModGhlU2VnbWVudC50ZW1wU2hhcGVJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd0hhbmRyYWlscygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5lZGl0TW9kZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVJbnN0YW5jZSA9IHRoaXMuZWRpdE1vZGVsLmNoaWxkLmdldChjb21wb25lbnRJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoZUluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsLmNoaWxkLmRlbGV0ZShjb21wb25lbnRJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2lnbi5yZW1vdmVHcm91cEluc3RhbmNlKHRoZUluc3RhbmNlLmluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlZ21lbnRzLnNwbGljZSh0aGVJbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAvLyB0byBjbGVhciByZWxhdGlvbnNcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VDb21wb25lbnQgPSB0aGVTZWdtZW50LmJhc2VDb21wb25lbnQ7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBiYXNlU2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHRoaXMuc2VnbWVudHMsIGJhc2VDb21wb25lbnQgPT09IG51bGwgfHwgYmFzZUNvbXBvbmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmFzZUNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYmFzZVNlZ21lbnQgJiYgKGJhc2VDb21wb25lbnQgPT09IG51bGwgfHwgYmFzZUNvbXBvbmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleCkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHRoZUluZCA9IGJhc2VTZWdtZW50Lm5leHRDb21wb25lbnRzW2Jhc2VDb21wb25lbnQubGluZTNkSW5kZXhdLmZpbmRJbmRleChpID0+IGkgPT09IHRoZVNlZ21lbnQucGFyYW0uaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmICh0aGVJbmQgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VTZWdtZW50Lm5leHRDb21wb25lbnRzW2Jhc2VDb21wb25lbnQubGluZTNkSW5kZXhdLmRlbGV0ZSh0aGVTZWdtZW50LnBhcmFtLmluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXh0Q29tcG9uZW50cyA9IHRoZVNlZ21lbnQubmV4dENvbXBvbmVudHM7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG5leHRTZWdtZW50SW5kcyBvZiBuZXh0Q29tcG9uZW50cykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXh0U2VnbWVudEluZHMuc2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG5leHRTZWdJbmQgb2YgbmV4dFNlZ21lbnRJbmRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0U2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHRoaXMuc2VnbWVudHMsIG5leHRTZWdJbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRTZWdtZW50ICYmIG5leHRTZWdtZW50LmJhc2VDb21wb25lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U2VnbWVudC5iYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTZWdtZW50LmJhc2VDb21wb25lbnQubGluZTNkSW5kZXggPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWdtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggPT09IGNvbXBvbmVudEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4ID0gdGhpcy5zZWdtZW50c1t0aGlzLnNlZ21lbnRzLmxlbmd0aCAtIDFdLnBhcmFtLmluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNoYW5nZVN0YWlyUGFyYW0oc3RhaXJQYXJhbSwgY2hhbmdlUGFyYW1zKSB7XHJcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2YsIF9nO1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhaXJQYXJhbSA9IHN0YWlyUGFyYW07XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zZWdtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBsYXN0U2VnbWVudCA9IHRoaXMuc2VnbWVudHNbdGhpcy5zZWdtZW50cy5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgaWYgKGNoYW5nZVBhcmFtcy5pbmRleE9mKENvbXBvbmVudFBhcmFtVHlwZS5Ib3Jpem9udGFsU3RlcCkgPiAtMSB8fCBjaGFuZ2VQYXJhbXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuVmVydGljYWxTdGVwKSA+IC0xIHx8XHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VQYXJhbXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuU3RhcnRXaWR0aCkgPiAtMSB8fCBjaGFuZ2VQYXJhbXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuRW5kV2lkdGgpID4gLTEgfHxcclxuICAgICAgICAgICAgICAgIGNoYW5nZVBhcmFtcy5pbmRleE9mKENvbXBvbmVudFBhcmFtVHlwZS5VcHdhcmQpID4gLTEgfHxcclxuICAgICAgICAgICAgICAgIGNoYW5nZVBhcmFtcy5pbmRleE9mKENvbXBvbmVudFBhcmFtVHlwZS5QbGF0Zm9ybVRoaWNrbmVzcykgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlR2VuZXJhdGVTZWdtZW50cyA9IHRoaXMuc2VnbWVudHM7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hhbmdlUGFyYW1zLmluZGV4T2YoQ29tcG9uZW50UGFyYW1UeXBlLlVwd2FyZCkgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZVN0YWlyVXB3YXJkKHJlR2VuZXJhdGVTZWdtZW50c1swXSwgcmVHZW5lcmF0ZVNlZ21lbnRzLCBzdGFpclBhcmFtLnVwd2FyZCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZUdlbmVyYXRlU2VnbWVudHMgPSB0aGlzLnNlZ21lbnRzLmZpbHRlcihzZWcgPT4gY2hhbmdlUGFyYW1zLmluZGV4T2YoQ29tcG9uZW50UGFyYW1UeXBlLlBsYXRmb3JtVGhpY2tuZXNzKSA+IC0xID8gc2VnLnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gOiBzZWcucGFyYW0udHlwZSAhPT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocmVHZW5lcmF0ZVNlZ21lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcmVHZW5lcmF0ZVNlZ21lbnQgb2YgcmVHZW5lcmF0ZVNlZ21lbnRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgY2hhbmdlUGFyYW0gb2YgY2hhbmdlUGFyYW1zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZUdlbmVyYXRlU2VnbWVudC5wYXJhbVtjaGFuZ2VQYXJhbV0gPSBzdGFpclBhcmFtW2NoYW5nZVBhcmFtXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgb3BlcmF0aW9uU3VjY2VzcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmRyYXdpbmcgJiYgdGhpcy5lZGl0TW9kZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzaWduLnN0YXJ0T3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICh5aWVsZCBkZXNpZ24uYWN0aXZhdGVHcm91cEluc3RhbmNlKHRoaXMuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZSkpLmlzU3VjY2VzcztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCByZUdlbmVyYXRlU2VnbWVudCBvZiByZUdlbmVyYXRlU2VnbWVudHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZHJhd2luZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3VGVtcENvbXBvbmVudChyZUdlbmVyYXRlU2VnbWVudCwgcmVHZW5lcmF0ZVNlZ21lbnQucGFyYW0uaW5kZXggPT09IHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4ICYmIHJlR2VuZXJhdGVTZWdtZW50LnBhcmFtLmluZGV4ICE9PSBsYXN0U2VnbWVudC5wYXJhbS5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5lZGl0TW9kZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgcGFyYW06IHsgaW5kZXggfSB9ID0gcmVHZW5lcmF0ZVNlZ21lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVJbnN0YW5jZSA9IHRoaXMuZWRpdE1vZGVsLmNoaWxkLmdldChpbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhlSW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlU2VnbWVudFNoYXBlKHJlR2VuZXJhdGVTZWdtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVNZXNoZXMgPSBnZW5lcmF0ZU1lc2hlcyhbcmVHZW5lcmF0ZVNlZ21lbnRdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhlTWVzaGVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZGVzaWduLnJlbW92ZUdyb3VwSW5zdGFuY2UodGhlSW5zdGFuY2UuaW5zdGFuY2UpLmlzU3VjY2VzcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb25TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3SW5zdGFuY2UgPSBidWlsZENvbXBvbmVudEluc3RhbmNlKHJlR2VuZXJhdGVTZWdtZW50LCB0aGlzLnNlZ21lbnRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAhIW5ld0luc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdJbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlbC5jaGlsZC5zZXQoaW5kZXgsIHsgaW5zdGFuY2U6IG5ld0luc3RhbmNlLCBkZWZpbml0aW9uS2V5OiAoKF9hID0gbmV3SW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5nZXRLZXkoKSkgfHwgJycsIGluc3RhbmNlS2V5OiBuZXdJbnN0YW5jZS5nZXRLZXkoKSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZHJhd2luZyAmJiB0aGlzLmVkaXRNb2RlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKF9iID0gdGhpcy5oYW5kcmFpbENvbGxlY3Rpb24pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5oYW5kcmFpbHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYW5kcmFpbEluc3RhbmNlID0geWllbGQgYnVpbGRIYW5kcmFpbEluc3RhbmNlKHRoaXMuc3RhaXJQYXJhbSwgKF9jID0gdGhpcy5oYW5kcmFpbENvbGxlY3Rpb24pID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5oYW5kcmFpbHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgaGFuZHJhaWxJbnN0YW5jZSAhPT0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhbmRyYWlsSW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlbC5oYW5kcmFpbCA9IHsgaW5zdGFuY2U6IGhhbmRyYWlsSW5zdGFuY2UsIGRlZmluaXRpb25LZXk6ICgoX2QgPSBoYW5kcmFpbEluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QuZ2V0S2V5KCkpIHx8ICcnLCBpbnN0YW5jZUtleTogaGFuZHJhaWxJbnN0YW5jZS5nZXRLZXkoKSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICh5aWVsZCBkZXNpZ24uZGVhY3RpdmF0ZUdyb3VwSW5zdGFuY2UoKSkuaXNTdWNjZXNzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzaWduLmNvbW1pdE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzaWduLmFib3J0T3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uLmFkZChbdGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZHJhd2luZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdIYW5kcmFpbHMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY2hhbmdlUGFyYW1zLmxlbmd0aCA9PT0gMSAmJiBjaGFuZ2VQYXJhbXNbMF0uc3RhcnRzV2l0aChDb21wb25lbnRQYXJhbVR5cGUuSGFuZHJhaWwpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kcmF3aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3SGFuZHJhaWxzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmVkaXRNb2RlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoX2UgPSB0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbikgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lLmhhbmRyYWlscy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wZXJhdGlvblN1Y2Nlc3MgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNpZ24uc3RhcnRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKHlpZWxkIGRlc2lnbi5hY3RpdmF0ZUdyb3VwSW5zdGFuY2UodGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlKSkuaXNTdWNjZXNzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYW5kcmFpbEluc3RhbmNlID0geWllbGQgYnVpbGRIYW5kcmFpbEluc3RhbmNlKHRoaXMuc3RhaXJQYXJhbSwgKF9mID0gdGhpcy5oYW5kcmFpbENvbGxlY3Rpb24pID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZi5oYW5kcmFpbHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBoYW5kcmFpbEluc3RhbmNlICE9PSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoYW5kcmFpbEluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlbC5oYW5kcmFpbCA9IHsgaW5zdGFuY2U6IGhhbmRyYWlsSW5zdGFuY2UsIGRlZmluaXRpb25LZXk6ICgoX2cgPSBoYW5kcmFpbEluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpKSA9PT0gbnVsbCB8fCBfZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2cuZ2V0S2V5KCkpIHx8ICcnLCBpbnN0YW5jZUtleTogaGFuZHJhaWxJbnN0YW5jZS5nZXRLZXkoKSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICh5aWVsZCBkZXNpZ24uZGVhY3RpdmF0ZUdyb3VwSW5zdGFuY2UoKSkuaXNTdWNjZXNzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzaWduLmNvbW1pdE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzaWduLmFib3J0T3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uLmFkZChbdGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBjaGFuZ2VDb21wb25lbnRQYXJhbShjb21wb25lbnRQYXJhbSwgY2hhbmdlUGFyYW1zKSB7XHJcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kO1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zZWdtZW50cy5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGNvbnN0IHRoZVNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleCh0aGlzLnNlZ21lbnRzLCBjb21wb25lbnRQYXJhbS5pbmRleCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGxhc3RTZWdtZW50ID0gdGhpcy5zZWdtZW50c1t0aGlzLnNlZ21lbnRzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICBpZiAodGhlU2VnbWVudCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeyBwYXJhbTogeyBpbmRleCB9IH0gPSB0aGVTZWdtZW50O1xyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50UGFyYW0ubW9kZWxFZGl0aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoZVNlZ21lbnQucGFyYW0gPSBjb21wb25lbnRQYXJhbTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYXdpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdUZW1wQ29tcG9uZW50KHRoZVNlZ21lbnQsIHRoZVNlZ21lbnQucGFyYW0uaW5kZXggIT09IGxhc3RTZWdtZW50LnBhcmFtLmluZGV4LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZWRpdE1vZGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc2VsZWN0aW9uLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlSW5zdGFuY2UgPSB0aGlzLmVkaXRNb2RlbC5jaGlsZC5nZXQoaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGVJbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlU2VnbWVudFNoYXBlKHRoZVNlZ21lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVNZXNoZXMgPSBnZW5lcmF0ZU1lc2hlcyhbdGhlU2VnbWVudF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhlTWVzaGVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzaWduLnN0YXJ0T3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3BlcmF0aW9uU3VjY2VzcyA9ICh5aWVsZCBkZXNpZ24uYWN0aXZhdGVHcm91cEluc3RhbmNlKHRoaXMuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZSkpLmlzU3VjY2VzcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb25TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZGVzaWduLnJlbW92ZUdyb3VwSW5zdGFuY2UodGhlSW5zdGFuY2UuaW5zdGFuY2UpLmlzU3VjY2VzcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdJbnN0YW5jZSA9IGJ1aWxkQ29tcG9uZW50SW5zdGFuY2UodGhlU2VnbWVudCwgdGhpcy5zZWdtZW50cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICEhbmV3SW5zdGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdJbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZWwuY2hpbGQuc2V0KGluZGV4LCB7IGluc3RhbmNlOiBuZXdJbnN0YW5jZSwgZGVmaW5pdGlvbktleTogKChfYSA9IG5ld0luc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZ2V0S2V5KCkpIHx8ICcnLCBpbnN0YW5jZUtleTogbmV3SW5zdGFuY2UuZ2V0S2V5KCkgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKF9iID0gdGhpcy5oYW5kcmFpbENvbGxlY3Rpb24pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5oYW5kcmFpbHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFuZHJhaWxJbnN0YW5jZSA9IHlpZWxkIGJ1aWxkSGFuZHJhaWxJbnN0YW5jZSh0aGlzLnN0YWlyUGFyYW0sIChfYyA9IHRoaXMuaGFuZHJhaWxDb2xsZWN0aW9uKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuaGFuZHJhaWxzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBoYW5kcmFpbEluc3RhbmNlICE9PSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhbmRyYWlsSW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZWwuaGFuZHJhaWwgPSB7IGluc3RhbmNlOiBoYW5kcmFpbEluc3RhbmNlLCBkZWZpbml0aW9uS2V5OiAoKF9kID0gaGFuZHJhaWxJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLmdldEtleSgpKSB8fCAnJywgaW5zdGFuY2VLZXk6IGhhbmRyYWlsSW5zdGFuY2UuZ2V0S2V5KCkgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAoeWllbGQgZGVzaWduLmRlYWN0aXZhdGVHcm91cEluc3RhbmNlKCkpLmlzU3VjY2VzcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb25TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzaWduLmNvbW1pdE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzaWduLmFib3J0T3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb24uYWRkKFt0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2VdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLy8gY2hhbmdlQ29tcG9uZW50VHlwZShjb21wb25lbnRUeXBlOiBDb21wb25lbnRUeXBlKSB7XHJcbiAgICAvLyAgICAgdGhpcy5jb21wb25lbnRQYXJhbS50eXBlID0gY29tcG9uZW50VHlwZTtcclxuICAgIC8vICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6ICdjb21wb25lbnRQYXJhbUNoYW5nZWQnLCBjb21wb25lbnRQYXJhbTogeyAuLi50aGlzLmNvbXBvbmVudFBhcmFtIH0gfSwgJyonKTtcclxuICAgIC8vICAgICB0aGlzLmNoYW5nZUNvbXBvbmVudFBhcmFtKHRoaXMuY29tcG9uZW50UGFyYW0sIFtDb21wb25lbnRQYXJhbVR5cGUuVHlwZV0pO1xyXG4gICAgLy8gfVxyXG4gICAgdHJ5Q29tbWl0KCkge1xyXG4gICAgICAgIHZhciBfYSwgX2IsIF9jO1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1lc2hlcyA9IGdlbmVyYXRlTWVzaGVzKHRoaXMuc2VnbWVudHMpO1xyXG4gICAgICAgICAgICBpZiAobWVzaGVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgZGVzaWduLnN0YXJ0T3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdJbnN0YW5jZXMgPSBbXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVkaXRNb2RlbENoaWxkID0gbmV3IE1hcCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsaWRTZWdtZW50cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgbGV0IG9wZXJhdGlvblN1Y2Nlc3MgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBzZWdtZW50IG9mIHRoaXMuc2VnbWVudHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNlZ21lbnQubWVzaClcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvcGVyYXRpb25TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2lnbi5hYm9ydE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0luc3RhbmNlID0gYnVpbGRDb21wb25lbnRJbnN0YW5jZShzZWdtZW50LCB0aGlzLnNlZ21lbnRzKTtcclxuICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAhIW5ld0luc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdJbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdJbnN0YW5jZXMucHVzaChuZXdJbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRNb2RlbENoaWxkLnNldChzZWdtZW50LnBhcmFtLmluZGV4LCB7IGluc3RhbmNlOiBuZXdJbnN0YW5jZSwgZGVmaW5pdGlvbktleTogKChfYSA9IG5ld0luc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZ2V0S2V5KCkpIHx8ICcnLCBpbnN0YW5jZUtleTogbmV3SW5zdGFuY2UuZ2V0S2V5KCkgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQucGFyYW0ucGxhdGZvcm1MZW5ndGhMb2NrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50LnBhcmFtLnN0ZXBQcm9wb3J0aW9uYWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50LnBhcmFtLndpZHRoUHJvcG9ydGlvbmFsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5wYXJhbS5tb2RlbEVkaXRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZFNlZ21lbnRzLnB1c2goc2VnbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gbGV0IGhhbmRyYWlsSW5zdGFuY2VEYXRhOiBJbnN0YW5jZURhdGEgfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiAodGhpcy5oYW5kcmFpbENvbGxlY3Rpb24/LmhhbmRyYWlscy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICBjb25zdCBoYW5kcmFpbEluc3RhbmNlID0gYXdhaXQgYnVpbGRIYW5kcmFpbEluc3RhbmNlKHRoaXMuc3RhaXJQYXJhbSwgdGhpcy5oYW5kcmFpbENvbGxlY3Rpb24/LmhhbmRyYWlscyk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgaGFuZHJhaWxJbnN0YW5jZSAhPT0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGlmIChoYW5kcmFpbEluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIG5ld0luc3RhbmNlcy5wdXNoKGhhbmRyYWlsSW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBoYW5kcmFpbEluc3RhbmNlRGF0YSA9IHsgaW5zdGFuY2U6IGhhbmRyYWlsSW5zdGFuY2UsIGRlZmluaXRpb25LZXk6IGhhbmRyYWlsSW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCk/LmdldEtleSgpIHx8ICcnLCBpbnN0YW5jZUtleTogaGFuZHJhaWxJbnN0YW5jZS5nZXRLZXkoKSB9O1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIGlmIChuZXdJbnN0YW5jZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyZW50SW5zdGFuY2UgPSAoX2IgPSBkZXNpZ24ubWFrZUdyb3VwKFtdLCBuZXdJbnN0YW5jZXMsIFtdKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmFkZGVkSW5zdGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgISFwYXJlbnRJbnN0YW5jZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnREZWYgPSBwYXJlbnRJbnN0YW5jZSA9PT0gbnVsbCB8fCBwYXJlbnRJbnN0YW5jZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGFyZW50SW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmVudEluc3RhbmNlICYmIHBhcmVudERlZikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBwYXJlbnREZWYuc2V0Q3VzdG9tUHJvcGVydHkoU3RhaXJNb2RlbEtleSwgU3RhaXJNb2RlbFZhbHVlKS5pc1N1Y2Nlc3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb25TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNpZ24uY29tbWl0T3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlbCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IHsgaW5zdGFuY2U6IHBhcmVudEluc3RhbmNlLCBkZWZpbml0aW9uS2V5OiAoKF9jID0gcGFyZW50SW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCkpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5nZXRLZXkoKSkgfHwgJycsIGluc3RhbmNlS2V5OiBwYXJlbnRJbnN0YW5jZS5nZXRLZXkoKSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkOiBlZGl0TW9kZWxDaGlsZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBoYW5kcmFpbDogaGFuZHJhaWxJbnN0YW5jZURhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWdtZW50cyA9IHZhbGlkU2VnbWVudHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBDb21wb25lbnQodmFsaWRTZWdtZW50c1swXSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLkRyYXdTdGFpck1vZGVsU2V0dGxlZCwgY29tcG9uZW50UGFyYW1zOiB0aGlzLnNlZ21lbnRzLm1hcChzZWcgPT4gKE9iamVjdC5hc3NpZ24oe30sIHNlZy5wYXJhbSkpKSwgc3RhaXJQYXJhbTogdGhpcy5zdGFpclBhcmFtIH0sICcqJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkZXNpZ24uYWJvcnRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZ2V0RWRpdE1vZGVsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVkaXRNb2RlbDtcclxuICAgIH1cclxuICAgIHNldE1vZGVsKGdyb3VwSW5zdGFuY2UpIHtcclxuICAgICAgICB2YXIgX2EsIF9iLCBfYztcclxuICAgICAgICBpZiAoKChfYSA9IHRoaXMuZWRpdE1vZGVsKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucGFyZW50Lmluc3RhbmNlS2V5KSA9PT0gZ3JvdXBJbnN0YW5jZS5nZXRLZXkoKSkge1xyXG4gICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlByb3BlcnRpZXNWaXNpYmxlLCBwcm9wZXJ0aWVzVmlzaWJsZTogdHJ1ZSB9LCAnKicpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWdtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNDb21wb25lbnQodGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lZGl0TW9kZWwgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgY29uc3QgZ3JvdXBEZWYgPSBncm91cEluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpO1xyXG4gICAgICAgIGlmIChncm91cEluc3RhbmNlICYmIGdyb3VwRGVmKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YWlyTW9kZWxQcm9wZXJ0eSA9IGdyb3VwRGVmLmdldEN1c3RvbVByb3BlcnR5KFN0YWlyTW9kZWxLZXkpO1xyXG4gICAgICAgICAgICBpZiAoc3RhaXJNb2RlbFByb3BlcnR5ID09PSBTdGFpck1vZGVsVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNlZ21lbnRzID0gW107XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJHcm91cEluc3RhbmNlcyA9IGdyb3VwRGVmLmdldFN1Ykdyb3VwSW5zdGFuY2VzKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlZGl0TW9kZWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50OiB7IGluc3RhbmNlOiBncm91cEluc3RhbmNlLCBkZWZpbml0aW9uS2V5OiAoKF9iID0gZ3JvdXBJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmdldEtleSgpKSB8fCAnJywgaW5zdGFuY2VLZXk6IGdyb3VwSW5zdGFuY2UuZ2V0S2V5KCkgfSxcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZDogbmV3IE1hcCgpXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBzdWJJbnN0YW5jZSBvZiBzdWJHcm91cEluc3RhbmNlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1YkRlZiA9IHN1Ykluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdWJEZWYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgY29tcG9uZW50SW5kZXhWYWx1ZSA9IHBhcnNlSW50KHN1YkRlZi5nZXRDdXN0b21Qcm9wZXJ0eShDb21wb25lbnRJbmRleEtleSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAoaXNGaW5pdGUoY29tcG9uZW50SW5kZXhWYWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyYW0gPSBwYXJzZVBhcmFtKHN1YkRlZi5nZXRDdXN0b21Qcm9wZXJ0eShQYXJhbUtleSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFydEVuZCA9IHBhcnNlU3RhcnRFbmQoc3ViRGVmLmdldEN1c3RvbVByb3BlcnR5KFN0YXJ0RW5kS2V5KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VMaW5lU2VnM2QgPSBwYXJzZUxpbmVTZWczZChzdWJEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoQmFzZUxpbmVTZWczZEtleSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiYXNlQ29tcG9uZW50ID0gcGFyc2VCYXNlQ29tcG9uZW50KHN1YkRlZi5nZXRDdXN0b21Qcm9wZXJ0eShCYXNlQ29tcG9uZW50S2V5KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNpcmNsZVRhbmdlbnQgPSBwYXJzZVZlY3RvcjNkKHN1YkRlZi5nZXRDdXN0b21Qcm9wZXJ0eShDaXJjbGVUYW5nZW50S2V5KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbSAmJiBzdGFydEVuZCAmJiBiYXNlTGluZVNlZzNkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWdtZW50ID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBnZXRFbXB0eVNlZ21lbnQoKSksIHsgc3RhcnQ6IHN0YXJ0RW5kLnN0YXJ0LCBlbmQ6IHN0YXJ0RW5kLmVuZCwgc3RhcnRIZWlnaHQ6IHN0YXJ0RW5kLnN0YXJ0SGVpZ2h0LCBlbmRIZWlnaHQ6IHN0YXJ0RW5kLmVuZEhlaWdodCwgYmFzZUNvbXBvbmVudDogeyBjb21wb25lbnRJbmRleDogYmFzZUNvbXBvbmVudCA9PT0gbnVsbCB8fCBiYXNlQ29tcG9uZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBiYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4LCBsaW5lM2RJbmRleDogYmFzZUNvbXBvbmVudCA9PT0gbnVsbCB8fCBiYXNlQ29tcG9uZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBiYXNlQ29tcG9uZW50LmxpbmUzZEluZGV4LCBsaW5lM2Q6IGJhc2VMaW5lU2VnM2QgfSwgY2lyY2xlVGFuZ2VudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbSwgc3RhcnRMb2NrZWQ6IHRydWUsIGVuZExvY2tlZDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnRzLnB1c2goc2VnbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0TW9kZWwuY2hpbGQuc2V0KHBhcmFtLmluZGV4LCB7IGluc3RhbmNlOiBzdWJJbnN0YW5jZSwgZGVmaW5pdGlvbktleTogKChfYyA9IHN1Ykluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuZ2V0S2V5KCkpIHx8ICcnLCBpbnN0YW5jZUtleTogc3ViSW5zdGFuY2UuZ2V0S2V5KCkgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChzZWdtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50cy5zb3J0KChhLCBiKSA9PiBhLnBhcmFtLmluZGV4IC0gYi5wYXJhbS5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRTZWdtZW50UmVsYXRpb25zKHNlZ21lbnRzKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlZ21lbnRzID0gc2VnbWVudHM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZWwgPSBlZGl0TW9kZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5kcmF3VGVtcENvbXBvbmVudChzZWdtZW50c1swXSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c0NvbXBvbmVudChzZWdtZW50c1swXS5wYXJhbS5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5EcmF3U3RhaXJNb2RlbFNldHRsZWQsIGNvbXBvbmVudFBhcmFtczogdGhpcy5zZWdtZW50cy5tYXAoc2VnID0+IChPYmplY3QuYXNzaWduKHt9LCBzZWcucGFyYW0pKSksIHN0YWlyUGFyYW06IHRoaXMuc3RhaXJQYXJhbSB9LCAnKicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xlYXJFZGl0TW9kZWwoKSB7XHJcbiAgICAgICAgdGhpcy5lZGl0TW9kZWwgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5zZWdtZW50cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuaGFuZHJhaWxDb2xsZWN0aW9uID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4ID0gRGVmYXVsdEZvY3VzZWRDb21wb25lbnRJbmRleDtcclxuICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLkRyYXdTdGFpck1vZGVsU2V0dGxlZCB9LCAnKicpO1xyXG4gICAgfVxyXG4gICAgY2xlYXIoKSB7XHJcbiAgICAgICAgYXBwVmlldy5jbGVhclRlbXBvcmFyeVNoYXBlcygpO1xyXG4gICAgICAgIC8vIHRoaXMuY29tcG9uZW50UGFyYW0gPSB7IC4uLkRlZmF1bHRDb21wb25lbnRQYXJhbSB9O1xyXG4gICAgICAgIC8vIHRoaXMuc2VnbWVudHMgPSBbXTtcclxuICAgICAgICB0aGlzLmRyYXdpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCA9IERlZmF1bHRGb2N1c2VkQ29tcG9uZW50SW5kZXg7XHJcbiAgICAgICAgdGhpcy5zdGFpclBhcmFtID0gRGVmYXVsdFN0YWlyUGFyYW07XHJcbiAgICAgICAgLy8gdGhpcy5lZGl0TW9kZWwgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBvblJCdXR0b25VcChldmVudCwgaW5mZXJlbmNlUmVzdWx0KSB7XHJcbiAgICAgICAgdGhpcy50cnlDb21taXQoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgZGVBY3RpdmF0ZURyYXdTdGFpcnNUb29sKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBvbkxCdXR0b25EYkNsaWNrKGV2ZW50LCBpbmZlcmVuY2VSZXN1bHQpIHtcclxuICAgICAgICA7XHJcbiAgICB9XHJcbiAgICBhbGxvd1VzaW5nSW5mZXJlbmNlKCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgb25LZXlEb3duKGV2ZW50KSB7XHJcbiAgICAgICAgO1xyXG4gICAgfVxyXG4gICAgb25LZXlVcChldmVudCkge1xyXG4gICAgICAgIDtcclxuICAgIH1cclxuICAgIGdlbmVyYXRlU2VnbWVudFNoYXBlKHNlZ21lbnQsIHRlbXAgPSB0cnVlKSB7XHJcbiAgICAgICAgZ2VuZXJhdGVTaGFwZShzZWdtZW50LCB0ZW1wKTtcclxuICAgICAgICAvLyB0aGlzLmdlbmVyYXRlSGFuZHJhaWxTaGFwZSgpO1xyXG4gICAgfVxyXG4gICAgZ2VuZXJhdGVIYW5kcmFpbFNoYXBlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNlZ21lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zdCBoYW5kcmFpbHMgPSBnZW5lcmF0ZUhhbmRyYWlsU2hhcGUodGhpcy5zdGFpclBhcmFtLCB0aGlzLnNlZ21lbnRzKTtcclxuICAgICAgICAgICAgdGhpcy5oYW5kcmFpbENvbGxlY3Rpb24gPSB7IGhhbmRyYWlsczogaGFuZHJhaWxzIHx8IFtdIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjb25zdCBkcmF3U3RhaXJzVG9vbCA9IG5ldyBEcmF3U3RhaXJzVG9vbCgpO1xyXG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbmltcG9ydCB7IERpcmVjdGlvblogfSBmcm9tIFwiLi9jb25zdHNcIjtcclxuaW1wb3J0IHsgQmFzZUNvbXBvbmVudEtleSwgQmFzZUxpbmVTZWczZEtleSwgQ2lyY2xlVGFuZ2VudEtleSwgQ29sdW1uVHlwZSwgQ29tcG9uZW50VHlwZSwgRGVmYXVsdFN0YWlyUGFyYW0sIEhhbmRyYWlsTW9kZWxLZXksIFBhcmFtS2V5LCBSYWlsVHlwZSwgU3RhaXJNb2RlbFZhbHVlLCBTdGFydEVuZEtleSB9IGZyb20gXCIuL3R5cGVzXCI7XHJcbmltcG9ydCB7IHN0cmluZ2lmeUJhc2VDb21wb25lbnQsIHN0cmluZ2lmeVBhcmFtLCBzdHJpbmdpZnlQb2ludDNkLCBzdHJpbmdpZnlTdGFydEVuZCB9IGZyb20gXCIuL3V0aWxzXCI7XHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZU1lc2hlcyhzZWdtZW50cykge1xyXG4gICAgY29uc3QgbWVzaGVzID0gW107XHJcbiAgICBmb3IgKGNvbnN0IHNlZ21lbnQgb2Ygc2VnbWVudHMpIHtcclxuICAgICAgICBjb25zdCB7IHBhcmFtOiB7IHR5cGUgfSwgY2lyY2xlVGFuZ2VudCB9ID0gc2VnbWVudDtcclxuICAgICAgICBpZiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyKSB7XHJcbiAgICAgICAgICAgIGdlbmVyYXRlU3RyYWlnaHRTdGFpck1lc2goc2VnbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpcikge1xyXG4gICAgICAgICAgICBpZiAoY2lyY2xlVGFuZ2VudCkge1xyXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVDaXJjdWxhclN0YWlyTWVzaChzZWdtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdlbmVyYXRlU3RyYWlnaHRTdGFpck1lc2goc2VnbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGdlbmVyYXRlUGxhdGZvcm1NZXNoKHNlZ21lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2VnbWVudC5tZXNoKSB7XHJcbiAgICAgICAgICAgIG1lc2hlcy5wdXNoKHNlZ21lbnQubWVzaCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1lc2hlcztcclxufVxyXG5mdW5jdGlvbiBnZW5lcmF0ZUNpcmN1bGFyU3RhaXJNZXNoKHNlZ21lbnQpIHtcclxuICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mLCBfZywgX2gsIF9qLCBfaywgX2w7XHJcbiAgICBjb25zdCB7IHN0YXJ0TG9ja2VkLCBjaXJjbGVUYW5nZW50LCBzdGFpclNoYXBlOiB7IHZlcnRpY2VzLCBzdGVwQ291bnQgfSwgY29ybmVyU2hhcGU6IHsgdmVydGljZXM6IGNvcm5lclZlcnRpY2VzIH0sIHBhcmFtOiB7IHVwd2FyZCB9IH0gPSBzZWdtZW50O1xyXG4gICAgaWYgKHN0ZXBDb3VudCA8IDEgfHwgIXN0YXJ0TG9ja2VkIHx8ICFjaXJjbGVUYW5nZW50KVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICBjb25zdCBzdGFpck1lc2ggPSB7XHJcbiAgICAgICAgdmVydGljZXM6IHZlcnRpY2VzLm1hcCh2ZXJ0ZXggPT4gW3ZlcnRleC54LCB2ZXJ0ZXgueSwgdmVydGV4LnpdKSxcclxuICAgICAgICB0cmlhbmdsZUluZGljZXM6IFtdLFxyXG4gICAgICAgIHNvZnRFZGdlczogW10sXHJcbiAgICB9O1xyXG4gICAgLy8g5pyA5bqV6YOo5Y+w6Zi25ZCO5LiL5L2N572uXHJcbiAgICAvLyBjb25zdCBsZWZ0SW5kZXggPSB2ZXJ0aWNlcy5sZW5ndGggLSAoKCF1cHdhcmQgJiYgc3RlcENvdW50ID4gMSkgPyA0IDogMik7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ZXBDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxyXG4gICAgICAgIC8vIHN0YWlyIGZhY2VzXHJcbiAgICAgICAgW2kgKiA0LCBpICogNCArIDEsIGkgKiA0ICsgMl0sIFtpICogNCArIDEsIGkgKiA0ICsgMywgaSAqIDQgKyAyXSwgW2kgKiA0ICsgMiwgaSAqIDQgKyAzLCBpICogNCArIDRdLCBbaSAqIDQgKyAzLCBpICogNCArIDUsIGkgKiA0ICsgNF0sIFxyXG4gICAgICAgIC8vIHNpZGUgZmFjZXMgKHVwKVxyXG4gICAgICAgIFtpICogNCwgaSAqIDQgKyAyLCAoaSArIDEpICogNF0sIFtpICogNCArIDEsIChpICsgMSkgKiA0ICsgMSwgaSAqIDQgKyAzXSk7XHJcbiAgICAgICAgKF9hID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnB1c2goW2kgKiA0ICsgMSwgaSAqIDQgKyAyXSwgW2kgKiA0ICsgMywgaSAqIDQgKyA0XSwgW2kgKiA0LCAoaSArIDEpICogNF0sIFsoaSArIDEpICogNCArIDEsIGkgKiA0ICsgMV0pO1xyXG4gICAgICAgIGlmICh1cHdhcmQpIHtcclxuICAgICAgICAgICAgY29uc3QgYm90dG9tRnJvbnRMZWZ0SW5kZXggPSA0ICogc3RlcENvdW50ICsgMiArIDIgKiAoc3RlcENvdW50IC0gaSAtIDEpO1xyXG4gICAgICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXHJcbiAgICAgICAgICAgIC8vIHNpZGUgZmFjZXMgKG1pZGRsZSlcclxuICAgICAgICAgICAgW2kgKiA0LCAoaSArIDEpICogNCwgYm90dG9tRnJvbnRMZWZ0SW5kZXhdLCBbKGkgKyAxKSAqIDQgKyAxLCBpICogNCArIDEsIGJvdHRvbUZyb250TGVmdEluZGV4ICsgMV0pO1xyXG4gICAgICAgICAgICBpZiAoaSA8IHN0ZXBDb3VudCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIChfYiA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5wdXNoKFsoaSArIDEpICogNCwgYm90dG9tRnJvbnRMZWZ0SW5kZXhdLCBbKGkgKyAxKSAqIDQgKyAxLCBib3R0b21Gcm9udExlZnRJbmRleCArIDFdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaSA+IDApIHtcclxuICAgICAgICAgICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcclxuICAgICAgICAgICAgICAgIC8vIHNpZGUgZmFjZXMgKGJvdHRvbSlcclxuICAgICAgICAgICAgICAgIFtpICogNCwgYm90dG9tRnJvbnRMZWZ0SW5kZXgsIGJvdHRvbUZyb250TGVmdEluZGV4ICsgMl0sIFtib3R0b21Gcm9udExlZnRJbmRleCArIDEsIGkgKiA0ICsgMSwgYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAzXSwgXHJcbiAgICAgICAgICAgICAgICAvLyBib3R0b20gZmFjZXNcclxuICAgICAgICAgICAgICAgIFtib3R0b21Gcm9udExlZnRJbmRleCArIDIsIGJvdHRvbUZyb250TGVmdEluZGV4LCBib3R0b21Gcm9udExlZnRJbmRleCArIDNdLCBbYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAzLCBib3R0b21Gcm9udExlZnRJbmRleCwgYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAxXSk7XHJcbiAgICAgICAgICAgICAgICAoX2MgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MucHVzaChbaSAqIDQsIGJvdHRvbUZyb250TGVmdEluZGV4XSwgW2kgKiA0ICsgMSwgYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAxXSwgW2JvdHRvbUZyb250TGVmdEluZGV4ICsgMywgYm90dG9tRnJvbnRMZWZ0SW5kZXhdKTtcclxuICAgICAgICAgICAgICAgIGlmIChpIDwgc3RlcENvdW50IC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIChfZCA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5wdXNoKFtib3R0b21Gcm9udExlZnRJbmRleCArIDEsIGJvdHRvbUZyb250TGVmdEluZGV4XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAvLyBib3R0b20gZmFjZXNcclxuICAgICAgICAgICAgICAgIFtpICogNCwgYm90dG9tRnJvbnRMZWZ0SW5kZXgsIGkgKiA0ICsgMV0sIFtpICogNCArIDEsIGJvdHRvbUZyb250TGVmdEluZGV4LCBib3R0b21Gcm9udExlZnRJbmRleCArIDFdKTtcclxuICAgICAgICAgICAgICAgIChfZSA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS5wdXNoKFtpICogNCArIDEsIGJvdHRvbUZyb250TGVmdEluZGV4XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJvdHRvbUJhY2tMZWZ0SW5kZXggPSA0ICogc3RlcENvdW50ICsgMiArIDIgKiAoc3RlcENvdW50IC0gaSAtIDEpO1xyXG4gICAgICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXHJcbiAgICAgICAgICAgIC8vIHNpZGUgZmFjZXMgKG1pZGRsZSlcclxuICAgICAgICAgICAgW2kgKiA0LCAoaSArIDEpICogNCwgYm90dG9tQmFja0xlZnRJbmRleF0sIFsoaSArIDEpICogNCArIDEsIGkgKiA0ICsgMSwgYm90dG9tQmFja0xlZnRJbmRleCArIDFdLCBcclxuICAgICAgICAgICAgLy8gYm90dG9tIGZhY2VzXHJcbiAgICAgICAgICAgIFtib3R0b21CYWNrTGVmdEluZGV4LCBib3R0b21CYWNrTGVmdEluZGV4IC0gMiwgYm90dG9tQmFja0xlZnRJbmRleCArIDFdLCBbYm90dG9tQmFja0xlZnRJbmRleCArIDEsIGJvdHRvbUJhY2tMZWZ0SW5kZXggLSAyLCBib3R0b21CYWNrTGVmdEluZGV4IC0gMV0pO1xyXG4gICAgICAgICAgICAoX2YgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2YucHVzaChbYm90dG9tQmFja0xlZnRJbmRleCArIDEsIGJvdHRvbUJhY2tMZWZ0SW5kZXggLSAyXSk7XHJcbiAgICAgICAgICAgIGlmIChpIDwgc3RlcENvdW50IC0gMSkge1xyXG4gICAgICAgICAgICAgICAgKF9nID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2cgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9nLnB1c2goWyhpICsgMSkgKiA0LCBib3R0b21CYWNrTGVmdEluZGV4XSwgWyhpICsgMSkgKiA0ICsgMSwgYm90dG9tQmFja0xlZnRJbmRleCArIDFdKTtcclxuICAgICAgICAgICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcclxuICAgICAgICAgICAgICAgIC8vIHNpZGUgZmFjZXMgKGJvdHRvbSlcclxuICAgICAgICAgICAgICAgIFsoaSArIDEpICogNCwgYm90dG9tQmFja0xlZnRJbmRleCAtIDIsIGJvdHRvbUJhY2tMZWZ0SW5kZXhdLCBbYm90dG9tQmFja0xlZnRJbmRleCAtIDEsIChpICsgMSkgKiA0ICsgMSwgYm90dG9tQmFja0xlZnRJbmRleCArIDFdKTtcclxuICAgICAgICAgICAgICAgIChfaCA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9oID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfaC5wdXNoKFsoaSArIDEpICogNCwgYm90dG9tQmFja0xlZnRJbmRleCAtIDJdLCBbKGkgKyAxKSAqIDQgKyAxLCBib3R0b21CYWNrTGVmdEluZGV4IC0gMV0sIFtib3R0b21CYWNrTGVmdEluZGV4ICsgMSwgYm90dG9tQmFja0xlZnRJbmRleCAtIDJdKTtcclxuICAgICAgICAgICAgICAgIGlmIChpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIChfaiA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9qID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfai5wdXNoKFtib3R0b21CYWNrTGVmdEluZGV4ICsgMSwgYm90dG9tQmFja0xlZnRJbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHVwd2FyZCkge1xyXG4gICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcclxuICAgICAgICAvLyBib3R0b20gZmFjZXNcclxuICAgICAgICAvLyBbdmVydGljZXMubGVuZ3RoIC0gMSwgMSwgMF0sXHJcbiAgICAgICAgLy8gW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIDAsIHZlcnRpY2VzLmxlbmd0aCAtIDJdLFxyXG4gICAgICAgIC8vIOWJjeS+p+mdolxyXG4gICAgICAgIFtzdGVwQ291bnQgKiA0LCBzdGVwQ291bnQgKiA0ICsgMSwgc3RlcENvdW50ICogNCArIDJdLCBbc3RlcENvdW50ICogNCArIDEsIHN0ZXBDb3VudCAqIDQgKyAzLCBzdGVwQ291bnQgKiA0ICsgMl0pO1xyXG4gICAgICAgIChfayA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9rID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfay5wdXNoKFxyXG4gICAgICAgIC8vIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCAwXSxcclxuICAgICAgICBbc3RlcENvdW50ICogNCArIDEsIHN0ZXBDb3VudCAqIDQgKyAyXSk7XHJcbiAgICAgICAgLy8gaWYgKHN0ZXBDb3VudCA+IDEpIHtcclxuICAgICAgICAvLyAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxyXG4gICAgICAgIC8vICAgICAgICAgLy8gc2lkZSBib3R0b20gZmFjZXNcclxuICAgICAgICAvLyAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSAyLCB2ZXJ0aWNlcy5sZW5ndGggLSAxMCwgdmVydGljZXMubGVuZ3RoIC0gNF0sXHJcbiAgICAgICAgLy8gICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gMSwgdmVydGljZXMubGVuZ3RoIC0gMywgdmVydGljZXMubGVuZ3RoIC0gOV0sXHJcbiAgICAgICAgLy8gICAgICAgICAvLyBib3R0b20gZmFjZXNcclxuICAgICAgICAvLyAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSA1LCB2ZXJ0aWNlcy5sZW5ndGggLSAzLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSxcclxuICAgICAgICAvLyAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSA1LCB2ZXJ0aWNlcy5sZW5ndGggLSA0LCB2ZXJ0aWNlcy5sZW5ndGggLSA2XSxcclxuICAgICAgICAvLyAgICAgKTtcclxuICAgICAgICAvLyAgICAgc3RhaXJNZXNoLnNvZnRFZGdlcz8ucHVzaChcclxuICAgICAgICAvLyAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSA1LCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSxcclxuICAgICAgICAvLyAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSAyLCB2ZXJ0aWNlcy5sZW5ndGggLSAxMF0sXHJcbiAgICAgICAgLy8gICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gMTAsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLFxyXG4gICAgICAgIC8vICAgICApO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcclxuICAgICAgICAvLyDlkI7kvqfpnaJcclxuICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gMSwgMSwgMF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCAwLCB2ZXJ0aWNlcy5sZW5ndGggLSAyXSk7XHJcbiAgICAgICAgKF9sID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2wgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9sLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIDBdKTtcclxuICAgICAgICAvLyBpZiAoc3RlcENvdW50ID4gMSkge1xyXG4gICAgICAgIC8vICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXHJcbiAgICAgICAgLy8gICAgICAgICAvLyBzaWRlIGJvdHRvbSBmYWNlc1xyXG4gICAgICAgIC8vICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIDAsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLFxyXG4gICAgICAgIC8vICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIHZlcnRpY2VzLmxlbmd0aCAtIDMsIDFdLFxyXG4gICAgICAgIC8vICAgICAgICAgLy8gYm90dG9tIGZhY2VzXHJcbiAgICAgICAgLy8gICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gNSwgdmVydGljZXMubGVuZ3RoIC0gNCwgdmVydGljZXMubGVuZ3RoIC0gM10sXHJcbiAgICAgICAgLy8gICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gNSwgdmVydGljZXMubGVuZ3RoIC0gNiwgdmVydGljZXMubGVuZ3RoIC0gNF0sXHJcbiAgICAgICAgLy8gICAgICk7XHJcbiAgICAgICAgLy8gICAgIHN0YWlyTWVzaC5zb2Z0RWRnZXM/LnB1c2goXHJcbiAgICAgICAgLy8gICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gNSwgdmVydGljZXMubGVuZ3RoIC0gNF0sXHJcbiAgICAgICAgLy8gICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gMywgMV0sXHJcbiAgICAgICAgLy8gICAgICAgICBbMCwgdmVydGljZXMubGVuZ3RoIC0gNF0sXHJcbiAgICAgICAgLy8gICAgICk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG4gICAgaWYgKGNvcm5lclZlcnRpY2VzLmxlbmd0aCA9PT0gNikge1xyXG4gICAgICAgIGdlbmVyYXRlUG9seWdvbk1lc2goY29ybmVyVmVydGljZXMsIHN0YWlyTWVzaCk7XHJcbiAgICB9XHJcbiAgICBzZWdtZW50Lm1lc2ggPSBzdGFpck1lc2g7XHJcbn1cclxuZnVuY3Rpb24gZ2VuZXJhdGVTdHJhaWdodFN0YWlyTWVzaChzZWdtZW50KSB7XHJcbiAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oLCBfaiwgX2s7XHJcbiAgICBjb25zdCB7IHN0YXJ0TG9ja2VkLCBzdGFpclNoYXBlOiB7IHZlcnRpY2VzLCBzdGVwQ291bnQgfSwgY29ybmVyU2hhcGU6IHsgdmVydGljZXM6IGNvcm5lclZlcnRpY2VzIH0sIHBhcmFtOiB7IHVwd2FyZCB9IH0gPSBzZWdtZW50O1xyXG4gICAgaWYgKHN0ZXBDb3VudCA8IDEgfHwgIXN0YXJ0TG9ja2VkKVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICBjb25zdCBzdGFpck1lc2ggPSB7XHJcbiAgICAgICAgdmVydGljZXM6IHZlcnRpY2VzLm1hcCh2ZXJ0ZXggPT4gW3ZlcnRleC54LCB2ZXJ0ZXgueSwgdmVydGV4LnpdKSxcclxuICAgICAgICB0cmlhbmdsZUluZGljZXM6IFtdLFxyXG4gICAgICAgIHNvZnRFZGdlczogW10sXHJcbiAgICB9O1xyXG4gICAgY29uc3QgbGVmdEluZGV4ID0gdmVydGljZXMubGVuZ3RoIC0gKCghdXB3YXJkICYmIHN0ZXBDb3VudCA+IDEpID8gNCA6IDIpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGVwQ291bnQ7IGkrKykge1xyXG4gICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcclxuICAgICAgICAvLyBzdGFpciBmYWNlc1xyXG4gICAgICAgIFtpICogNCwgaSAqIDQgKyAxLCBpICogNCArIDJdLCBbaSAqIDQgKyAxLCBpICogNCArIDMsIGkgKiA0ICsgMl0sIFtpICogNCArIDIsIGkgKiA0ICsgMywgaSAqIDQgKyA0XSwgW2kgKiA0ICsgMywgaSAqIDQgKyA1LCBpICogNCArIDRdLCBcclxuICAgICAgICAvLyBzaWRlIGZhY2VzXHJcbiAgICAgICAgW2kgKiA0LCBpICogNCArIDIsIChpICsgMSkgKiA0XSwgW2kgKiA0ICsgMSwgKGkgKyAxKSAqIDQgKyAxLCBpICogNCArIDNdKTtcclxuICAgICAgICAoX2EgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucHVzaChbaSAqIDQgKyAxLCBpICogNCArIDJdLCBbaSAqIDQgKyAzLCBpICogNCArIDRdLCBbaSAqIDQsIChpICsgMSkgKiA0XSwgWyhpICsgMSkgKiA0ICsgMSwgaSAqIDQgKyAxXSk7XHJcbiAgICAgICAgaWYgKGkgPT09IHN0ZXBDb3VudCAtIDEgJiYgdXB3YXJkICYmIHN0ZXBDb3VudCA+IDEpIHtcclxuICAgICAgICAgICAgY29uc3QgYmJMZWZ0SW5kZXggPSB2ZXJ0aWNlcy5sZW5ndGggLSA0O1xyXG4gICAgICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXHJcbiAgICAgICAgICAgIC8vIHRhaWwgc2lkZSBmYWNlc1xyXG4gICAgICAgICAgICBbYmJMZWZ0SW5kZXgsIGkgKiA0LCAoaSArIDEpICogNF0sIFtiYkxlZnRJbmRleCArIDEsIChpICsgMSkgKiA0ICsgMSwgaSAqIDQgKyAxXSk7XHJcbiAgICAgICAgICAgIChfYiA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5wdXNoKFtiYkxlZnRJbmRleCwgaSAqIDRdLCBcclxuICAgICAgICAgICAgLy8gW2kgKiA0LCAoaSArIDEpICogNF0sXHJcbiAgICAgICAgICAgIFtiYkxlZnRJbmRleCArIDEsIGkgKiA0ICsgMV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxyXG4gICAgICAgICAgICAvLyBzaWRlIGZhY2VzXHJcbiAgICAgICAgICAgIFtsZWZ0SW5kZXgsIGkgKiA0LCAoaSArIDEpICogNF0sIFtsZWZ0SW5kZXggKyAxLCAoaSArIDEpICogNCArIDEsIGkgKiA0ICsgMV0pO1xyXG4gICAgICAgICAgICAvLyBzdGFpck1lc2guc29mdEVkZ2VzPy5wdXNoKFxyXG4gICAgICAgICAgICAvLyAgICAgW2kgKiA0LCAoaSArIDEpICogNF0sXHJcbiAgICAgICAgICAgIC8vICAgICBbKGkgKyAxKSAqIDQgKyAxLCBpICogNCArIDFdLFxyXG4gICAgICAgICAgICAvLyApO1xyXG4gICAgICAgICAgICBpZiAodXB3YXJkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAoX2MgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MucHVzaChbbGVmdEluZGV4LCBpICogNF0sIFtsZWZ0SW5kZXggKyAxLCBpICogNCArIDFdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChzdGVwQ291bnQgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKF9kID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLnB1c2goW2xlZnRJbmRleCwgKGkgKyAxKSAqIDRdLCBbbGVmdEluZGV4ICsgMSwgKGkgKyAxKSAqIDQgKyAxXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RlcENvdW50ID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIChfZSA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS5wdXNoKFtsZWZ0SW5kZXgsIGkgKiA0XSwgW2xlZnRJbmRleCArIDEsIGkgKiA0ICsgMV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGkgPCBzdGVwQ291bnQgLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKF9mID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9mLnB1c2goW2xlZnRJbmRleCwgKGkgKyAxKSAqIDRdLCBbbGVmdEluZGV4ICsgMSwgKGkgKyAxKSAqIDQgKyAxXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodXB3YXJkKSB7XHJcbiAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxyXG4gICAgICAgIC8vIGJvdHRvbSBmYWNlc1xyXG4gICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCAxLCAwXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIDAsIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbdmVydGljZXMubGVuZ3RoIC0gMywgdmVydGljZXMubGVuZ3RoIC0gMSwgdmVydGljZXMubGVuZ3RoIC0gMl0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAzLCB2ZXJ0aWNlcy5sZW5ndGggLSAyLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSk7XHJcbiAgICAgICAgKF9nID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2cgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9nLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIDBdLCBbdmVydGljZXMubGVuZ3RoIC0gMywgdmVydGljZXMubGVuZ3RoIC0gMl0pO1xyXG4gICAgICAgIGlmIChzdGVwQ291bnQgPiAxKSB7XHJcbiAgICAgICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcclxuICAgICAgICAgICAgLy8gc2lkZSBib3R0b20gZmFjZXNcclxuICAgICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIHZlcnRpY2VzLmxlbmd0aCAtIDEwLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIHZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDldLCBcclxuICAgICAgICAgICAgLy8gYm90dG9tIGZhY2VzXHJcbiAgICAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSA1LCB2ZXJ0aWNlcy5sZW5ndGggLSAzLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDQsIHZlcnRpY2VzLmxlbmd0aCAtIDZdKTtcclxuICAgICAgICAgICAgKF9oID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9oLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLCBbdmVydGljZXMubGVuZ3RoIC0gMiwgdmVydGljZXMubGVuZ3RoIC0gMTBdLCBbdmVydGljZXMubGVuZ3RoIC0gMTAsIHZlcnRpY2VzLmxlbmd0aCAtIDRdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXHJcbiAgICAgICAgLy8gYm90dG9tIGZhY2VzXHJcbiAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIDAsIDFdLCBbdmVydGljZXMubGVuZ3RoIC0gMSwgdmVydGljZXMubGVuZ3RoIC0gMiwgMF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAzLCB2ZXJ0aWNlcy5sZW5ndGggLSAyLCB2ZXJ0aWNlcy5sZW5ndGggLSAxXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDQsIHZlcnRpY2VzLmxlbmd0aCAtIDJdKTtcclxuICAgICAgICAoX2ogPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfaiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2oucHVzaChbdmVydGljZXMubGVuZ3RoIC0gMSwgMF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAzLCB2ZXJ0aWNlcy5sZW5ndGggLSAyXSk7XHJcbiAgICAgICAgaWYgKHN0ZXBDb3VudCA+IDEpIHtcclxuICAgICAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxyXG4gICAgICAgICAgICAvLyBzaWRlIGJvdHRvbSBmYWNlc1xyXG4gICAgICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gMiwgMCwgdmVydGljZXMubGVuZ3RoIC0gNF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCB2ZXJ0aWNlcy5sZW5ndGggLSAzLCAxXSwgXHJcbiAgICAgICAgICAgIC8vIGJvdHRvbSBmYWNlc1xyXG4gICAgICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gNSwgdmVydGljZXMubGVuZ3RoIC0gNCwgdmVydGljZXMubGVuZ3RoIC0gM10sIFt2ZXJ0aWNlcy5sZW5ndGggLSA1LCB2ZXJ0aWNlcy5sZW5ndGggLSA2LCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSk7XHJcbiAgICAgICAgICAgIChfayA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9rID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfay5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSA1LCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDMsIDFdLCBbMCwgdmVydGljZXMubGVuZ3RoIC0gNF0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChjb3JuZXJWZXJ0aWNlcy5sZW5ndGggPT09IDYpIHtcclxuICAgICAgICBnZW5lcmF0ZVBvbHlnb25NZXNoKGNvcm5lclZlcnRpY2VzLCBzdGFpck1lc2gpO1xyXG4gICAgfVxyXG4gICAgc2VnbWVudC5tZXNoID0gc3RhaXJNZXNoO1xyXG59XHJcbmZ1bmN0aW9uIGdlbmVyYXRlUGxhdGZvcm1NZXNoKHNlZ21lbnQpIHtcclxuICAgIGNvbnN0IHsgc3RhaXJTaGFwZTogeyB2ZXJ0aWNlcyB9IH0gPSBzZWdtZW50O1xyXG4gICAgLy8gaWYgKGVuZExvY2tlZCkge1xyXG4gICAgY29uc3QgdmVydGV4TGVuZ3RoID0gdmVydGljZXMubGVuZ3RoIC8gMjtcclxuICAgIGlmICh2ZXJ0ZXhMZW5ndGggPT09IDQgfHwgdmVydGV4TGVuZ3RoID09PSA1KSB7XHJcbiAgICAgICAgY29uc3QgcGxhdGZvcm1NZXNoID0ge1xyXG4gICAgICAgICAgICB2ZXJ0aWNlczogW10sXHJcbiAgICAgICAgICAgIHRyaWFuZ2xlSW5kaWNlczogW10sXHJcbiAgICAgICAgICAgIHNvZnRFZGdlczogW10sXHJcbiAgICAgICAgfTtcclxuICAgICAgICBnZW5lcmF0ZVBvbHlnb25NZXNoKHZlcnRpY2VzLCBwbGF0Zm9ybU1lc2gpO1xyXG4gICAgICAgIHNlZ21lbnQubWVzaCA9IHBsYXRmb3JtTWVzaDtcclxuICAgIH1cclxuICAgIC8vIH1cclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbn1cclxuZnVuY3Rpb24gZ2VuZXJhdGVQb2x5Z29uTWVzaCh2ZXJ0aWNlcywgbWVzaCkge1xyXG4gICAgdmFyIF9hLCBfYjtcclxuICAgIGNvbnN0IHZlcnRleExlbmd0aCA9IG1lc2gudmVydGljZXMubGVuZ3RoO1xyXG4gICAgbWVzaC52ZXJ0aWNlcy5wdXNoKC4uLnZlcnRpY2VzLm1hcCh2ZXJ0ZXggPT4gW3ZlcnRleC54LCB2ZXJ0ZXgueSwgdmVydGV4LnpdKSk7XHJcbiAgICBjb25zdCBzZWdDb3VudCA9IHZlcnRpY2VzLmxlbmd0aCAvIDI7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlZ0NvdW50OyBpKyspIHtcclxuICAgICAgICBjb25zdCByaWdodCA9IGkgPT09IHNlZ0NvdW50IC0gMSA/IDAgOiBpICsgMTtcclxuICAgICAgICBjb25zdCBib3R0b21SaWdodCA9IGkgPT09IHNlZ0NvdW50IC0gMSA/IHNlZ0NvdW50IDogaSArIHNlZ0NvdW50ICsgMTtcclxuICAgICAgICBtZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFtpICsgdmVydGV4TGVuZ3RoLCBpICsgc2VnQ291bnQgKyB2ZXJ0ZXhMZW5ndGgsIGJvdHRvbVJpZ2h0ICsgdmVydGV4TGVuZ3RoXSwgW2kgKyB2ZXJ0ZXhMZW5ndGgsIGJvdHRvbVJpZ2h0ICsgdmVydGV4TGVuZ3RoLCByaWdodCArIHZlcnRleExlbmd0aF0pO1xyXG4gICAgICAgIChfYSA9IG1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucHVzaChbaSArIHZlcnRleExlbmd0aCwgYm90dG9tUmlnaHQgKyB2ZXJ0ZXhMZW5ndGhdKTtcclxuICAgICAgICBpZiAoaSA+IDAgJiYgaSA8IHNlZ0NvdW50IC0gMSkge1xyXG4gICAgICAgICAgICBtZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxyXG4gICAgICAgICAgICAvLyB0b3AgYW5kIGJvdHRvbVxyXG4gICAgICAgICAgICBbaSArIHZlcnRleExlbmd0aCwgcmlnaHQgKyB2ZXJ0ZXhMZW5ndGgsIDAgKyB2ZXJ0ZXhMZW5ndGhdLCBbYm90dG9tUmlnaHQgKyB2ZXJ0ZXhMZW5ndGgsIGkgKyBzZWdDb3VudCArIHZlcnRleExlbmd0aCwgc2VnQ291bnQgKyB2ZXJ0ZXhMZW5ndGhdKTtcclxuICAgICAgICAgICAgaWYgKGkgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAoX2IgPSBtZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnB1c2goW2ksIDAgKyB2ZXJ0ZXhMZW5ndGhdLCBbaSArIHNlZ0NvdW50ICsgdmVydGV4TGVuZ3RoLCBzZWdDb3VudCArIHZlcnRleExlbmd0aF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBidWlsZENvbXBvbmVudEluc3RhbmNlKHNlZ21lbnQsIHNlZ21lbnRzKSB7XHJcbiAgICB2YXIgX2EsIF9iO1xyXG4gICAgY29uc3QgeyBzdGFydCwgZW5kLCBzdGFydEhlaWdodCwgZW5kSGVpZ2h0LCBiYXNlQ29tcG9uZW50LCBjaXJjbGVUYW5nZW50LCBwYXJhbSwgbWVzaCB9ID0gc2VnbWVudDtcclxuICAgIGNvbnN0IGRlc2lnbiA9IGFwcC5nZXRBY3RpdmVEZXNpZ24oKTtcclxuICAgIGxldCBvcGVyYXRpb25TdWNjZXNzID0gdHJ1ZTtcclxuICAgIGlmIChtZXNoID09PSBudWxsIHx8IG1lc2ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1lc2gudmVydGljZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgY29uc3QgbmV3U2hlbGwgPSAoX2EgPSBkZXNpZ24uY3JlYXRlU2hlbGxGcm9tTWVzaChtZXNoKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm5ld1NoZWxsO1xyXG4gICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICEhbmV3U2hlbGw7XHJcbiAgICAgICAgaWYgKG5ld1NoZWxsKSB7XHJcbiAgICAgICAgICAgIC8vIGlmIChwYXJhbS50eXBlICE9PSBDb21wb25lbnRUeXBlLkNpcmN1bGFyU3RhaXIpIHtcclxuICAgICAgICAgICAgLy8gICAgIGNvbnN0IHNvZnRFZGdlcyA9IG5ld1NoZWxsLmdldEVkZ2VzKCkuZmlsdGVyKGUgPT4gZS5pc1NvZnQoKSk7XHJcbiAgICAgICAgICAgIC8vICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBkZXNpZ24ucmVtb3ZlRWRnZXMoc29mdEVkZ2VzKS5pc1N1Y2Nlc3M7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgY29uc3QgbmV3SW5zdGFuY2UgPSAoX2IgPSBkZXNpZ24ubWFrZUdyb3VwKG5ld1NoZWxsLmdldEZhY2VzKCksIFtdLCBbXSkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5hZGRlZEluc3RhbmNlO1xyXG4gICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAhIW5ld0luc3RhbmNlO1xyXG4gICAgICAgICAgICBjb25zdCBncm91cERlZiA9IG5ld0luc3RhbmNlID09PSBudWxsIHx8IG5ld0luc3RhbmNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBuZXdJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKTtcclxuICAgICAgICAgICAgaWYgKG5ld0luc3RhbmNlICYmIGdyb3VwRGVmKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBncm91cERlZi5zZXRDdXN0b21Qcm9wZXJ0eShDb21wb25lbnRJbmRleEtleSwgYCR7bmV3SW5zdGFuY2VzLmxlbmd0aH1gKS5pc1N1Y2Nlc3M7XHJcbiAgICAgICAgICAgICAgICAvLyBuZXdJbnN0YW5jZXMucHVzaChuZXdJbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJhbVN0cmluZyA9IHN0cmluZ2lmeVBhcmFtKHBhcmFtKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0RW5kU3RyaW5nID0gc3RyaW5naWZ5U3RhcnRFbmQoR2VvbUxpYi5jcmVhdGVQb2ludDNkKHN0YXJ0LngsIHN0YXJ0LnksIHN0YXJ0SGVpZ2h0KSwgR2VvbUxpYi5jcmVhdGVQb2ludDNkKGVuZC54LCBlbmQueSwgZW5kSGVpZ2h0KSk7XHJcbiAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBncm91cERlZi5zZXRDdXN0b21Qcm9wZXJ0eShQYXJhbUtleSwgcGFyYW1TdHJpbmcpLmlzU3VjY2VzcztcclxuICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGdyb3VwRGVmLnNldEN1c3RvbVByb3BlcnR5KFN0YXJ0RW5kS2V5LCBzdGFydEVuZFN0cmluZykuaXNTdWNjZXNzO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgKGJhc2VMaW5lU2VnM2QpIHtcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIGlmIChiYXNlQ29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgQmFzZUxpbmVTdHJpbmcgPSBzdHJpbmdpZnlTdGFydEVuZChiYXNlQ29tcG9uZW50LmxpbmUzZC5zdGFydCwgYmFzZUNvbXBvbmVudC5saW5lM2QuZW5kKTtcclxuICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBncm91cERlZi5zZXRDdXN0b21Qcm9wZXJ0eShCYXNlTGluZVNlZzNkS2V5LCBCYXNlTGluZVN0cmluZykuaXNTdWNjZXNzO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgoc2VnbWVudHMsIGJhc2VDb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChiYXNlU2VnbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiYXNlQ29tcG9uZW50U3RyaW5nID0gc3RyaW5naWZ5QmFzZUNvbXBvbmVudChiYXNlU2VnbWVudCwgYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGdyb3VwRGVmLnNldEN1c3RvbVByb3BlcnR5KEJhc2VDb21wb25lbnRLZXksIGJhc2VDb21wb25lbnRTdHJpbmcpLmlzU3VjY2VzcztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY2lyY2xlVGFuZ2VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhbmdlbnRTdHJpbmcgPSBzdHJpbmdpZnlQb2ludDNkKGNpcmNsZVRhbmdlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGdyb3VwRGVmLnNldEN1c3RvbVByb3BlcnR5KENpcmNsZVRhbmdlbnRLZXksIHRhbmdlbnRTdHJpbmcpLmlzU3VjY2VzcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXdJbnN0YW5jZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkSGFuZHJhaWxJbnN0YW5jZShzdGFpclBhcmFtLCBoYW5kcmFpbHMpIHtcclxuICAgIHZhciBfYSwgX2IsIF9jO1xyXG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICBjb25zdCB7IGhhbmRyYWlsOiB7IHN1cHBvcnQsIGhlaWdodCwgcmFpbDogeyB0eXBlOiByYWlsVHlwZSwgcGFyYW06IHJhaWxQYXJhbSB9LCBjb2x1bW46IHsgdHlwZTogY29sdW1uVHlwZSwgcGFyYW06IGNvbHVtblBhcmFtIH0gfSB9ID0gc3RhaXJQYXJhbTtcclxuICAgICAgICBpZiAoIXN1cHBvcnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByYWlsRmFjZTtcclxuICAgICAgICBpZiAocmFpbFR5cGUgPT09IFJhaWxUeXBlLkNpcmNsZSkge1xyXG4gICAgICAgICAgICByYWlsRmFjZSA9IGRyYXdDaXJjbGUocmFpbFBhcmFtLnJhZGl1cyB8fCBEZWZhdWx0U3RhaXJQYXJhbS5ob3Jpem9udGFsU3RlcCAvIDUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChyYWlsVHlwZSA9PT0gUmFpbFR5cGUuUmVjdCkge1xyXG4gICAgICAgICAgICByYWlsRmFjZSA9IGRyYXdSZWN0KHJhaWxQYXJhbS53aWR0aCB8fCBEZWZhdWx0U3RhaXJQYXJhbS5ob3Jpem9udGFsU3RlcCAvIDUsIHJhaWxQYXJhbS5oZWlnaHQgfHwgRGVmYXVsdFN0YWlyUGFyYW0uaG9yaXpvbnRhbFN0ZXAgLyA1KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCByYWlsTG9vcCA9IHJhaWxGYWNlID09PSBudWxsIHx8IHJhaWxGYWNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiByYWlsRmFjZS5nZXRPdXRlckxvb3AoKTtcclxuICAgICAgICBpZiAoIXJhaWxGYWNlIHx8ICFyYWlsTG9vcCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY29sdW1uRmFjZTtcclxuICAgICAgICBpZiAoY29sdW1uVHlwZSA9PT0gQ29sdW1uVHlwZS5DaXJjbGUpIHtcclxuICAgICAgICAgICAgY29sdW1uRmFjZSA9IGRyYXdDaXJjbGUoY29sdW1uUGFyYW0ucmFkaXVzIHx8IERlZmF1bHRTdGFpclBhcmFtLmhvcml6b250YWxTdGVwIC8gMTAsIDEwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNvbHVtblR5cGUgPT09IENvbHVtblR5cGUuUmVjdCkge1xyXG4gICAgICAgICAgICBjb2x1bW5GYWNlID0gZHJhd1JlY3QoY29sdW1uUGFyYW0ud2lkdGggfHwgRGVmYXVsdFN0YWlyUGFyYW0uaG9yaXpvbnRhbFN0ZXAgLyAxMCwgY29sdW1uUGFyYW0uaGVpZ2h0IHx8IERlZmF1bHRTdGFpclBhcmFtLmhvcml6b250YWxTdGVwIC8gMTAsIDEwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgY29sdW1uTG9vcCA9IGNvbHVtbkZhY2UgPT09IG51bGwgfHwgY29sdW1uRmFjZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29sdW1uRmFjZS5nZXRPdXRlckxvb3AoKTtcclxuICAgICAgICBpZiAoIWNvbHVtbkZhY2UgfHwgIWNvbHVtbkxvb3ApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgYWN0aXZlRGVzaWduID0gYXBwLmdldEFjdGl2ZURlc2lnbigpO1xyXG4gICAgICAgIGNvbnN0IGhhbmRyYWlsSW5zdGFuY2UgPSAoX2EgPSBhY3RpdmVEZXNpZ24ubWFrZUdyb3VwKFtyYWlsRmFjZSwgY29sdW1uRmFjZV0sIFtdLCBbXSkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hZGRlZEluc3RhbmNlO1xyXG4gICAgICAgIGNvbnN0IGhhbmRyYWlsRGVmaW5pdGlvbiA9IGhhbmRyYWlsSW5zdGFuY2UgPT09IG51bGwgfHwgaGFuZHJhaWxJbnN0YW5jZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogaGFuZHJhaWxJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKTtcclxuICAgICAgICBpZiAoIWhhbmRyYWlsSW5zdGFuY2UgfHwgIWhhbmRyYWlsRGVmaW5pdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBhY3RpdmF0ZUluc3RhbmNlUmVzID0geWllbGQgYWN0aXZlRGVzaWduLmFjdGl2YXRlR3JvdXBJbnN0YW5jZShoYW5kcmFpbEluc3RhbmNlKTtcclxuICAgICAgICBpZiAoIWFjdGl2YXRlSW5zdGFuY2VSZXMuaXNTdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGNvbHVtbkF1eGlsaWFyeUJvdW5kZWRDdXJ2ZSA9IChfYiA9IGFjdGl2ZURlc2lnbi5hZGRBdXhpbGlhcnlCb3VuZGVkQ3VydmUoR2VvbUxpYi5jcmVhdGVMaW5lU2VnbWVudDNkKEdlb21MaWIuY3JlYXRlUG9pbnQzZCgwLCAwLCBoZWlnaHQgLyAyKSwgR2VvbUxpYi5jcmVhdGVQb2ludDNkKDAsIDAsIC1oZWlnaHQgLyAyKSkpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuYWRkZWRDdXJ2ZTtcclxuICAgICAgICBpZiAoIWNvbHVtbkF1eGlsaWFyeUJvdW5kZWRDdXJ2ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzd2VlcENvbHVtblJlcyA9IGFjdGl2ZURlc2lnbi5zd2VlcEZvbGxvd0N1cnZlcyhjb2x1bW5Mb29wLCBbY29sdW1uQXV4aWxpYXJ5Qm91bmRlZEN1cnZlXSk7XHJcbiAgICAgICAgaWYgKCFzd2VlcENvbHVtblJlcy5pc1N1Y2Nlc3MgfHwgIXN3ZWVwQ29sdW1uUmVzLmFkZGVkU2hlbGxzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjb2x1bW5PcmlnaW5GYWNlcyA9IFtdO1xyXG4gICAgICAgIGZvciAoY29uc3QgY29sdW1uT3JpZ2luU2hlbGwgb2Ygc3dlZXBDb2x1bW5SZXMuYWRkZWRTaGVsbHMpIHtcclxuICAgICAgICAgICAgY29uc3QgY29sdW1uRmFjZXMgPSBjb2x1bW5PcmlnaW5TaGVsbC5nZXRGYWNlcygpO1xyXG4gICAgICAgICAgICBjb2x1bW5PcmlnaW5GYWNlcy5wdXNoKC4uLmNvbHVtbkZhY2VzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgY29sdW1uT3JpZ2luSW5zdGFuY2UgPSAoX2MgPSBhY3RpdmVEZXNpZ24ubWFrZUdyb3VwKGNvbHVtbk9yaWdpbkZhY2VzLCBbXSwgW10pKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuYWRkZWRJbnN0YW5jZTtcclxuICAgICAgICBpZiAoIWNvbHVtbk9yaWdpbkluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGNvbHVtbkNlbnRlcnMgPSBbXTtcclxuICAgICAgICBmb3IgKGNvbnN0IHsgcmFpbCwgY29sdW1ucyB9IG9mIGhhbmRyYWlscykge1xyXG4gICAgICAgICAgICBjb25zdCByYWlsQm91bmRlZEN1cnZlcyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhaWwubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByYWlsUG9pbnQgPSByYWlsW2ldO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmFpbE5leHRQb2ludCA9IHJhaWxbaSArIDFdO1xyXG4gICAgICAgICAgICAgICAgcmFpbEJvdW5kZWRDdXJ2ZXMucHVzaCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYWRkQXV4UmVzID0gYWN0aXZlRGVzaWduLmFkZEF1eGlsaWFyeUJvdW5kZWRDdXJ2ZShHZW9tTGliLmNyZWF0ZUxpbmVTZWdtZW50M2QocmFpbFBvaW50LCByYWlsTmV4dFBvaW50KSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWRkQXV4UmVzID09PSBudWxsIHx8IGFkZEF1eFJlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogYWRkQXV4UmVzLmFkZGVkQ3VydmUpIHtcclxuICAgICAgICAgICAgICAgICAgICByYWlsQm91bmRlZEN1cnZlcy5wdXNoKGFkZEF1eFJlcy5hZGRlZEN1cnZlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3Qgc3dlZXBSYWlsUmVzID0gYWN0aXZlRGVzaWduLnN3ZWVwRm9sbG93Q3VydmVzKHJhaWxMb29wLCByYWlsQm91bmRlZEN1cnZlcyk7XHJcbiAgICAgICAgICAgIGlmICghc3dlZXBSYWlsUmVzLmlzU3VjY2VzcyB8fCAhc3dlZXBSYWlsUmVzLmFkZGVkU2hlbGxzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNvbHVtbiBvZiBjb2x1bW5zKSB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5DZW50ZXJzLnB1c2goR2VvbUxpYi5jcmVhdGVQb2ludDNkKGNvbHVtblswXS54ICsgY29sdW1uWzFdLngsIGNvbHVtblswXS55ICsgY29sdW1uWzFdLnksIGNvbHVtblswXS56ICsgY29sdW1uWzFdLnopKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29sdW1uQ2VudGVycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc3QgY29sdW1uQ29weVJlcyA9IGFjdGl2ZURlc2lnbi5idWxrQ29weUdyb3VwSW5zdGFuY2VzKFtjb2x1bW5PcmlnaW5JbnN0YW5jZV0sIFtjb2x1bW5DZW50ZXJzLm1hcChjZW50ZXIgPT4gR2VvbUxpYi5jcmVhdGVUcmFuc2xhdGlvbk1hdHJpeDQoY2VudGVyLngsIGNlbnRlci55LCBjZW50ZXIueikpXSk7XHJcbiAgICAgICAgICAgIGlmICghKGNvbHVtbkNvcHlSZXMgPT09IG51bGwgfHwgY29sdW1uQ29weVJlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29sdW1uQ29weVJlcy5hZGRlZEluc3RhbmNlcy5sZW5ndGgpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHJlbW92ZU9yaWdpbkNvbHVtblJlcyA9IGFjdGl2ZURlc2lnbi5yZW1vdmVHcm91cEluc3RhbmNlKGNvbHVtbk9yaWdpbkluc3RhbmNlKTtcclxuICAgICAgICBpZiAoIXJlbW92ZU9yaWdpbkNvbHVtblJlcy5pc1N1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdG8gcmVtb3ZlIGFsbCBhdXhpbGlhcnlDdXJ2ZXNcclxuICAgICAgICBjb25zdCBkZWFjdGl2YXRlSW5zdGFuY2VSZXMgPSB5aWVsZCBhY3RpdmVEZXNpZ24uZGVhY3RpdmF0ZUdyb3VwSW5zdGFuY2UoKTtcclxuICAgICAgICBpZiAoIWRlYWN0aXZhdGVJbnN0YW5jZVJlcy5pc1N1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc2V0UHJvcGVydHlSZXMgPSBoYW5kcmFpbERlZmluaXRpb24uc2V0Q3VzdG9tUHJvcGVydHkoSGFuZHJhaWxNb2RlbEtleSwgU3RhaXJNb2RlbFZhbHVlKTtcclxuICAgICAgICBpZiAoIXNldFByb3BlcnR5UmVzLmlzU3VjY2Vzcykge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaGFuZHJhaWxJbnN0YW5jZTtcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBkcmF3Q2lyY2xlKHJhZGl1cywgeiA9IDApIHtcclxuICAgIGNvbnN0IGFjdGl2ZURlc2lnbiA9IGFwcC5nZXRBY3RpdmVEZXNpZ24oKTtcclxuICAgIGNvbnN0IHJlcyA9IGFjdGl2ZURlc2lnbi5hZGRDaXJjbGUoR2VvbUxpYi5jcmVhdGVDaXJjbGUzZEJ5Q2VudGVyTm9ybWFsUmFkaXVzKEdlb21MaWIuY3JlYXRlUG9pbnQzZCgwLCAwLCB6KSwgRGlyZWN0aW9uWiwgcmFkaXVzKSk7XHJcbiAgICBpZiAocmVzID09PSBudWxsIHx8IHJlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVzLmFkZGVkRWRnZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgY29uc3Qgc2hlbGwgPSByZXMuYWRkZWRFZGdlc1swXS5nZXRTaGVsbCgpO1xyXG4gICAgICAgIGNvbnN0IGZhY2VzID0gc2hlbGwgPT09IG51bGwgfHwgc2hlbGwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNoZWxsLmdldEZhY2VzKCk7XHJcbiAgICAgICAgaWYgKChmYWNlcyA9PT0gbnVsbCB8fCBmYWNlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogZmFjZXMubGVuZ3RoKSA9PT0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFjZXNbMF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZHJhd1JlY3Qod2lkdGgsIGhlaWdodCwgeiA9IDAsIHdpdGhDb3JuZXIgPSB0cnVlKSB7XHJcbiAgICBjb25zdCBwb2ludDEgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QoMCwgMCwgeik7XHJcbiAgICBjb25zdCBwb2ludDIgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2Qod2lkdGgsIDAsIHopO1xyXG4gICAgY29uc3QgcG9pbnRzID0gW3BvaW50MSwgcG9pbnQyXTtcclxuICAgIGlmICh3aXRoQ29ybmVyKSB7XHJcbiAgICAgICAgY29uc3QgcDUgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2Qod2lkdGgsIGhlaWdodCAvIDMgKiAyLCB6KTtcclxuICAgICAgICBjb25zdCBwNiA9IEdlb21MaWIuY3JlYXRlUG9pbnQzZCh3aWR0aCAvIDQgKiAzLCBoZWlnaHQsIHopO1xyXG4gICAgICAgIGNvbnN0IG0xID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKChwNS54ICsgcDYueCkgLyAyLCAocDUueSArIHA2LnkpIC8gMiwgeik7XHJcbiAgICAgICAgY29uc3QgZGlyMSA9IHA2LnN1YnRyYWN0ZWQocDUpLm5vcm1hbGl6ZWQoKTtcclxuICAgICAgICBjb25zdCB0b0NlbnRlckRpcjEgPSBEaXJlY3Rpb25aLmNyb3NzKGRpcjEpO1xyXG4gICAgICAgIGNvbnN0IGQxID0gcDUuZGlzdGFuY2VUbyhwNik7XHJcbiAgICAgICAgLy8gY29uc3QgcjEgPSBkMSAvIDIgLyBNYXRoLnNpbihNYXRoLlBJIC8gNik7XHJcbiAgICAgICAgY29uc3QgaDEgPSBkMSAvIDIgLyBNYXRoLnRhbihNYXRoLlBJIC8gNik7XHJcbiAgICAgICAgY29uc3QgY2VudGVyMSA9IG0xLmFkZGVkKHRvQ2VudGVyRGlyMS5tdWx0aXBsaWVkKGgxKSk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvdGF0ZU1hdCA9IEdlb21MaWIuY3JlYXRlUm90YXRlTWF0cml4NChpICogTWF0aC5QSSAvIDMwLCBEaXJlY3Rpb25aLCBjZW50ZXIxKTtcclxuICAgICAgICAgICAgY29uc3QgZGlzY3JldGVQb2ludCA9IHA1LmFwcGxpZWRNYXRyaXg0KHJvdGF0ZU1hdCk7XHJcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKGRpc2NyZXRlUG9pbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwNyA9IEdlb21MaWIuY3JlYXRlUG9pbnQzZCh3aWR0aCAvIDQsIGhlaWdodCwgeik7XHJcbiAgICAgICAgY29uc3QgcDggPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QoMCwgaGVpZ2h0IC8gMyAqIDIsIHopO1xyXG4gICAgICAgIGNvbnN0IG0yID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKChwNS54ICsgcDYueCkgLyAyLCAocDUueSArIHA2LnkpIC8gMiwgeik7XHJcbiAgICAgICAgY29uc3QgZGlyMiA9IHA4LnN1YnRyYWN0ZWQocDcpLm5vcm1hbGl6ZWQoKTtcclxuICAgICAgICBjb25zdCB0b0NlbnRlckRpcjIgPSBEaXJlY3Rpb25aLmNyb3NzKGRpcjIpO1xyXG4gICAgICAgIGNvbnN0IGQyID0gcDcuZGlzdGFuY2VUbyhwOCk7XHJcbiAgICAgICAgLy8gY29uc3QgcjIgPSBkMiAvIDIgLyBNYXRoLnNpbihNYXRoLlBJIC8gNik7XHJcbiAgICAgICAgY29uc3QgaDIgPSBkMiAvIDIgLyBNYXRoLnRhbihNYXRoLlBJIC8gNik7XHJcbiAgICAgICAgY29uc3QgY2VudGVyMiA9IG0yLmFkZGVkKHRvQ2VudGVyRGlyMi5tdWx0aXBsaWVkKGgyKSk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvdGF0ZU1hdCA9IEdlb21MaWIuY3JlYXRlUm90YXRlTWF0cml4NChpICogTWF0aC5QSSAvIDMwLCBEaXJlY3Rpb25aLCBjZW50ZXIyKTtcclxuICAgICAgICAgICAgY29uc3QgZGlzY3JldGVQb2ludCA9IHA3LmFwcGxpZWRNYXRyaXg0KHJvdGF0ZU1hdCk7XHJcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKGRpc2NyZXRlUG9pbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHBvaW50MyA9IEdlb21MaWIuY3JlYXRlUG9pbnQzZCh3aWR0aCwgaGVpZ2h0LCB6KTtcclxuICAgICAgICBjb25zdCBwb2ludDQgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QoMCwgaGVpZ2h0LCB6KTtcclxuICAgICAgICBwb2ludHMucHVzaChwb2ludDMsIHBvaW50NCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBhY3RpdmVEZXNpZ24gPSBhcHAuZ2V0QWN0aXZlRGVzaWduKCk7XHJcbiAgICBjb25zdCByZXMgPSBhY3RpdmVEZXNpZ24uYWRkRWRnZXMocG9pbnRzKTtcclxuICAgIGlmIChyZXMgPT09IG51bGwgfHwgcmVzID09PSB2b2lkIDAgPyB2b2lkIDAgOiByZXMuYWRkZWRFZGdlcy5sZW5ndGgpIHtcclxuICAgICAgICBjb25zdCBzZXRTb2Z0UmVzdWx0ID0gYWN0aXZlRGVzaWduLnNldEVkZ2VzU29mdChyZXMuYWRkZWRFZGdlcywgdHJ1ZSk7XHJcbiAgICAgICAgaWYgKHNldFNvZnRSZXN1bHQuaXNTdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNoZWxsID0gcmVzLmFkZGVkRWRnZXNbMF0uZ2V0U2hlbGwoKTtcclxuICAgICAgICAgICAgY29uc3QgZmFjZXMgPSBzaGVsbCA9PT0gbnVsbCB8fCBzaGVsbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2hlbGwuZ2V0RmFjZXMoKTtcclxuICAgICAgICAgICAgaWYgKChmYWNlcyA9PT0gbnVsbCB8fCBmYWNlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogZmFjZXMubGVuZ3RoKSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhY2VzWzBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2VnbWVudEJ5SW5kZXgoc2VnbWVudHMsIGluZGV4KSB7XHJcbiAgICBpZiAoaW5kZXggPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2VnbWVudHMuZmluZChzZWdtZW50ID0+IHNlZ21lbnQucGFyYW0uaW5kZXggPT09IGluZGV4KTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRTZWdtZW50UmVsYXRpb25zKHNlZ21lbnRzKSB7XHJcbiAgICBmb3IgKGNvbnN0IHNlZ21lbnQgb2Ygc2VnbWVudHMpIHtcclxuICAgICAgICBjb25zdCBiYXNlQ29tcG9uZW50ID0gc2VnbWVudC5iYXNlQ29tcG9uZW50O1xyXG4gICAgICAgIGNvbnN0IGJhc2VTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgoc2VnbWVudHMsIGJhc2VDb21wb25lbnQgPT09IG51bGwgfHwgYmFzZUNvbXBvbmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmFzZUNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XHJcbiAgICAgICAgaWYgKGJhc2VTZWdtZW50ICYmIChiYXNlQ29tcG9uZW50ID09PSBudWxsIHx8IGJhc2VDb21wb25lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJhc2VDb21wb25lbnQubGluZTNkSW5kZXgpICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgYmFzZVNlZ21lbnQubmV4dENvbXBvbmVudHNbYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleF0uYWRkKHNlZ21lbnQucGFyYW0uaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmV4dENvbXBvbmVudHMoc2VnbWVudCwgc2VnbWVudHMpIHtcclxuICAgIGNvbnN0IHsgbmV4dENvbXBvbmVudHMgfSA9IHNlZ21lbnQ7XHJcbiAgICBjb25zdCBuZXh0U2VnbWVudHMgPSBbXTtcclxuICAgIGZvciAoY29uc3QgbmV4dENvbXBvbmVudEluZGV4ZXMgb2YgbmV4dENvbXBvbmVudHMpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IG5leHRDb21wb25lbnRJbmRleCBvZiBuZXh0Q29tcG9uZW50SW5kZXhlcykge1xyXG4gICAgICAgICAgICBjb25zdCBuZXh0U2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHNlZ21lbnRzLCBuZXh0Q29tcG9uZW50SW5kZXgpO1xyXG4gICAgICAgICAgICBpZiAobmV4dFNlZ21lbnQpIHtcclxuICAgICAgICAgICAgICAgIG5leHRTZWdtZW50cy5wdXNoKG5leHRTZWdtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBuZXh0U2VnbWVudHM7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5nZVN0YWlyVXB3YXJkKHN0YXJ0U2VnbWVudCwgc2VnbWVudHMsIHVwd2FyZCwgYnVsa0NoYW5nZSkge1xyXG4gICAgaWYgKHNlZ21lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgIGxldCBjdXJyZW50ID0gW3sgc2VnbWVudDogc3RhcnRTZWdtZW50LCB2ZXJ0aWNhbERlbHRhOiAwIH1dO1xyXG4gICAgICAgIGNvbnN0IHVuVmlzaXRlZCA9IG5ldyBTZXQoc2VnbWVudHMpO1xyXG4gICAgICAgIHdoaWxlIChjdXJyZW50Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICBsZXQgbmV4dCA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHsgc2VnbWVudCwgdmVydGljYWxEZWx0YSB9IG9mIGN1cnJlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHsgc3RhcnRIZWlnaHQsIGVuZEhlaWdodCB9ID0gc2VnbWVudDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVuZERlbHRhID0gc2VnbWVudC5wYXJhbS51cHdhcmQgPT09IHVwd2FyZCA/IDAgOiAyICogKHN0YXJ0SGVpZ2h0IC0gZW5kSGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIHNlZ21lbnQuc3RhcnRIZWlnaHQgKz0gdmVydGljYWxEZWx0YTtcclxuICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kSGVpZ2h0ICs9IHZlcnRpY2FsRGVsdGEgKyBlbmREZWx0YTtcclxuICAgICAgICAgICAgICAgIHNlZ21lbnQucGFyYW0udXB3YXJkID0gdXB3YXJkO1xyXG4gICAgICAgICAgICAgICAgdW5WaXNpdGVkLmRlbGV0ZShzZWdtZW50KTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5leHRTZWdtZW50cyA9IGdldE5leHRDb21wb25lbnRzKHNlZ21lbnQsIHNlZ21lbnRzKTtcclxuICAgICAgICAgICAgICAgIGlmIChuZXh0U2VnbWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dC5wdXNoKC4uLm5leHRTZWdtZW50cy5tYXAoc2VnID0+ICh7IHNlZ21lbnQ6IHNlZywgdmVydGljYWxEZWx0YTogdmVydGljYWxEZWx0YSArIGVuZERlbHRhIH0pKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3VycmVudCA9IG5leHQ7XHJcbiAgICAgICAgICAgIGlmICghY3VycmVudC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChidWxrQ2hhbmdlICYmIHVuVmlzaXRlZC5zaXplKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlU2VnbWVudCA9IFsuLi51blZpc2l0ZWQudmFsdWVzKCldWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBbeyBzZWdtZW50OiB0aGVTZWdtZW50LCB2ZXJ0aWNhbERlbHRhOiB0aGVTZWdtZW50LnN0YXJ0SGVpZ2h0ID4gMCA9PT0gdXB3YXJkID8gMCA6ICh0aGVTZWdtZW50LnN0YXJ0SGVpZ2h0ICogLTIpIH1dO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IEFuZ2xlVG9sZXJhbmNlLCBEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSwgRGlyZWN0aW9uWCwgRGlyZWN0aW9uWiwgZHVtbXlQb2ludDNkLCBMZW5ndGhUb2xlcmFuY2UsIFN0ZXBDb3VudExpbWl0IH0gZnJvbSBcIi4vY29uc3RzXCI7XHJcbmltcG9ydCB7IGdldFNlZ21lbnRCeUluZGV4IH0gZnJvbSBcIi4vbWVzaFV0aWxzXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFR5cGUsIFBsYXRmb3JtRGlyZWN0aW9uVHlwZSB9IGZyb20gXCIuL3R5cGVzXCI7XHJcbmltcG9ydCB7IGlzRXF1YWwgfSBmcm9tIFwiLi91dGlsc1wiO1xyXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVTaGFwZShzZWdtZW50LCB0ZW1wID0gdHJ1ZSkge1xyXG4gICAgY29uc3QgeyBwYXJhbTogeyB0eXBlIH0sIGNpcmNsZVRhbmdlbnQgfSA9IHNlZ21lbnQ7XHJcbiAgICBpZiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyKSB7XHJcbiAgICAgICAgZ2VuZXJhdGVTdHJhaWdodFN0YWlyU2hhcGUoc2VnbWVudCwgdGVtcCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0eXBlID09PSBDb21wb25lbnRUeXBlLkNpcmN1bGFyU3RhaXIpIHtcclxuICAgICAgICBpZiAoY2lyY2xlVGFuZ2VudCkge1xyXG4gICAgICAgICAgICBnZW5lcmF0ZUNpcmN1bGFyU3RhaXJTaGFwZShzZWdtZW50LCB0ZW1wKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGdlbmVyYXRlU3RyYWlnaHRTdGFpclNoYXBlKHNlZ21lbnQsIHRlbXApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGdlbmVyYXRlUGxhdGZvcm1TaGFwZShzZWdtZW50LCB0ZW1wKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBnZW5lcmF0ZUNpcmN1bGFyU3RhaXJTaGFwZShzZWdtZW50LCB0ZW1wID0gdHJ1ZSkge1xyXG4gICAgY29uc3QgeyBzdGFydCwgZW5kLCBzdGFpclNoYXBlLCBtb2xkU2hhcGUsIGNvcm5lclNoYXBlLCBjb3JuZXJNb2xkU2hhcGUsIHN0YXJ0SGVpZ2h0LCBiYXNlQ29tcG9uZW50LCBjaXJjbGVUYW5nZW50LCBwYXJhbSB9ID0gc2VnbWVudDtcclxuICAgIGNvbnN0IHsgc3RhcnRXaWR0aCwgZW5kV2lkdGgsIGhvcml6b250YWxTdGVwLCB2ZXJ0aWNhbFN0ZXAsIHVwd2FyZCwgcGxhdGZvcm1UaGlja25lc3MgfSA9IHBhcmFtO1xyXG4gICAgaWYgKGNpcmNsZVRhbmdlbnQpIHtcclxuICAgICAgICBjb25zdCB0YW5nZW50TGVmdERpciA9IERpcmVjdGlvblouY3Jvc3MoY2lyY2xlVGFuZ2VudCkubm9ybWFsaXplZCgpO1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0RW5kRGlyID0gZW5kLnN1YnRyYWN0ZWQoc3RhcnQpLm5vcm1hbGl6ZWQoKTtcclxuICAgICAgICBjb25zdCBzdGFydEVuZERpc3RhbmNlID0gc3RhcnQuZGlzdGFuY2VUbyhlbmQpO1xyXG4gICAgICAgIGNvbnN0IG1heFdpZHRoID0gTWF0aC5tYXgoc3RhcnRXaWR0aCwgZW5kV2lkdGgpO1xyXG4gICAgICAgIGNvbnN0IGVuZEFuZ2xlID0gc3RhcnRFbmREaXIuYW5nbGVUbyhjaXJjbGVUYW5nZW50LCBEaXJlY3Rpb25aKTtcclxuICAgICAgICBpZiAoZW5kQW5nbGUgPCBEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZ2VuZXJhdGVTdHJhaWdodFN0YWlyU2hhcGUoc2VnbWVudCwgdGVtcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGlzTGVmdEFyYyA9IGVuZEFuZ2xlID4gTWF0aC5QSTtcclxuICAgICAgICBjb25zdCBlbmRDb21wbGVtZW50YXJ5QW5nbGUgPSBpc0xlZnRBcmMgPyBNYXRoLmFicyhlbmRBbmdsZSAtIE1hdGguUEkgLyAyIC0gTWF0aC5QSSkgOiBNYXRoLmFicyhlbmRBbmdsZSAtIE1hdGguUEkgLyAyKTtcclxuICAgICAgICBjb25zdCBoYWxmQ2hvcmQgPSBzdGFydEVuZERpc3RhbmNlIC8gMjtcclxuICAgICAgICBjb25zdCByYWRpdXMgPSBoYWxmQ2hvcmQgLyBNYXRoLmNvcyhlbmRDb21wbGVtZW50YXJ5QW5nbGUpO1xyXG4gICAgICAgIGNvbnN0IGlubmVyUmFkaXVzID0gcmFkaXVzIC0gbWF4V2lkdGggLyAyO1xyXG4gICAgICAgIGlmIChyYWRpdXMgPCBtYXhXaWR0aCAvIDIgKiAxLjIgfHwgaW5uZXJSYWRpdXMgPCBob3Jpem9udGFsU3RlcCAvIDIgLyAwLjgpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBob3Jpem9udGFsU3RlcEFuZ2xlID0gTWF0aC5hc2luKGhvcml6b250YWxTdGVwIC8gMiAvIGlubmVyUmFkaXVzKSAqIDI7XHJcbiAgICAgICAgY29uc3QgY2lyY2xlTm9ybWFsID0gaXNMZWZ0QXJjID8gRGlyZWN0aW9uWiA6IERpcmVjdGlvbloucmV2ZXJzZWQoKTtcclxuICAgICAgICBjb25zdCBjaXJjbGVDZW50ZXIgPSBzdGFydC5hZGRlZCh0YW5nZW50TGVmdERpci5tdWx0aXBsaWVkKGlzTGVmdEFyYyA/IHJhZGl1cyA6IC1yYWRpdXMpKTtcclxuICAgICAgICAvLyBjb25zdCBjaXJjbGUgPSBHZW9tTGliLmNyZWF0ZUNpcmNsZTNkQnlDZW50ZXJOb3JtYWxSYWRpdXMoY2lyY2xlQ2VudGVyLCBjaXJjbGVOb3JtYWwsIHJhZGl1cyk7XHJcbiAgICAgICAgY29uc3QgYXJjID0gR2VvbUxpYi5jcmVhdGVBcmMzZEJ5Q2VudGVyTm9ybWFsUmFkaXVzKGNpcmNsZUNlbnRlciwgY2lyY2xlTm9ybWFsLCByYWRpdXMsIHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgIGNvbnN0IGFyY0FuZ2xlID0gYXJjLmFyY0FuZ2xlO1xyXG4gICAgICAgIGNvbnN0IHN0ZXBDb3VudCA9IE1hdGguY2VpbChhcmNBbmdsZSAvIGhvcml6b250YWxTdGVwQW5nbGUpO1xyXG4gICAgICAgIGNvbnN0IGxhc3RIb3Jpem9udGFsQW5nbGUgPSBhcmNBbmdsZSAtIGhvcml6b250YWxTdGVwQW5nbGUgKiAoc3RlcENvdW50IC0gMSk7XHJcbiAgICAgICAgY29uc3QgdmFsaWRTdGVwQ291bnQgPSAobGFzdEhvcml6b250YWxBbmdsZSA9PT0gMCB8fCBsYXN0SG9yaXpvbnRhbEFuZ2xlID4gQW5nbGVUb2xlcmFuY2UpID8gc3RlcENvdW50IDogc3RlcENvdW50IC0gMTtcclxuICAgICAgICBpZiAoaG9yaXpvbnRhbFN0ZXBBbmdsZSA+PSBhcmNBbmdsZSB8fCBob3Jpem9udGFsU3RlcEFuZ2xlID49IE1hdGguUEkgLyAyIHx8IHZhbGlkU3RlcENvdW50ID49IFN0ZXBDb3VudExpbWl0IHx8IHZhbGlkU3RlcENvdW50IDwgMSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbXTtcclxuICAgICAgICBzdGFpclNoYXBlLnRlbXBMaW5lcyA9IFtdO1xyXG4gICAgICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtdO1xyXG4gICAgICAgIG1vbGRTaGFwZS50ZW1wTGluZXMgPSBbXTtcclxuICAgICAgICBjb3JuZXJTaGFwZS52ZXJ0aWNlcyA9IFtdO1xyXG4gICAgICAgIGNvcm5lclNoYXBlLnRlbXBMaW5lcyA9IFtdO1xyXG4gICAgICAgIGNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtdO1xyXG4gICAgICAgIGNvcm5lck1vbGRTaGFwZS50ZW1wTGluZXMgPSBbXTtcclxuICAgICAgICBjb25zdCB7IHZlcnRpY2VzLCB0ZW1wTGluZXMgfSA9IHN0YWlyU2hhcGU7XHJcbiAgICAgICAgY29uc3QgeyB2ZXJ0aWNlczogbW9sZFZlcnRpY2VzLCB0ZW1wTGluZXM6IG1vbGRUZW1wTGluZXMgfSA9IG1vbGRTaGFwZTtcclxuICAgICAgICAvLyBjb25zdCBjZW50ZXJIb3Jpem9udGFsU3RlcCA9IGhvcml6b250YWxTdGVwIC8gaW5uZXJSYWRpdXMgKiByYWRpdXM7XHJcbiAgICAgICAgY29uc3Qgc3RlcEhlaWdodCA9IHVwd2FyZCA/IHZlcnRpY2FsU3RlcCA6IC12ZXJ0aWNhbFN0ZXA7XHJcbiAgICAgICAgc2VnbWVudC5lbmRIZWlnaHQgPSBzZWdtZW50LnN0YXJ0SGVpZ2h0ICsgdmFsaWRTdGVwQ291bnQgKiBzdGVwSGVpZ2h0O1xyXG4gICAgICAgIHN0YWlyU2hhcGUuc3RlcENvdW50ID0gdmFsaWRTdGVwQ291bnQ7XHJcbiAgICAgICAgbW9sZFNoYXBlLnN0ZXBDb3VudCA9IHZhbGlkU3RlcENvdW50O1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCd2YWxpZFN0ZXBDb3VudDogICAnLHZhbGlkU3RlcENvdW50KTtcclxuICAgICAgICBjb25zdCBsZWZ0UHQgPSBzdGFydC5hZGRlZCh0YW5nZW50TGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSk7XHJcbiAgICAgICAgY29uc3QgcmlnaHRQdCA9IHN0YXJ0LmFkZGVkKHRhbmdlbnRMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSk7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRSYWRpdXNEaXIgPSBpc0xlZnRBcmMgPyB0YW5nZW50TGVmdERpci5yZXZlcnNlZCgpIDogdGFuZ2VudExlZnREaXI7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGVwQ291bnQgLSAxOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgY3VyUm90YXRlTWF0cml4ID0gR2VvbUxpYi5jcmVhdGVSb3RhdGVNYXRyaXg0KGhvcml6b250YWxTdGVwQW5nbGUgKiBpLCBjaXJjbGVOb3JtYWwsIGR1bW15UG9pbnQzZCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1clJhZGl1c0RpciA9IHN0YXJ0UmFkaXVzRGlyLmFwcGxpZWRNYXRyaXg0KGN1clJvdGF0ZU1hdHJpeCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1ckhhbGZXaWR0aCA9IChzdGFydFdpZHRoICsgKGVuZFdpZHRoIC0gc3RhcnRXaWR0aCkgKiAoaSAqIGhvcml6b250YWxTdGVwQW5nbGUpIC8gYXJjQW5nbGUpIC8gMiAqIChpc0xlZnRBcmMgPyAtMSA6IDEpO1xyXG4gICAgICAgICAgICBjb25zdCBjdXJMZWZ0TW9sZFB0ID0gY2lyY2xlQ2VudGVyLmFkZGVkKGN1clJhZGl1c0Rpci5tdWx0aXBsaWVkKHJhZGl1cyArIGN1ckhhbGZXaWR0aCkpO1xyXG4gICAgICAgICAgICBjb25zdCBjdXJSaWdodE1vbGRQdCA9IGNpcmNsZUNlbnRlci5hZGRlZChjdXJSYWRpdXNEaXIubXVsdGlwbGllZChyYWRpdXMgLSBjdXJIYWxmV2lkdGgpKTtcclxuICAgICAgICAgICAgY29uc3QgY3VyTGVmdFB0ID0gY3VyTGVmdE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBpICogc3RlcEhlaWdodCkpO1xyXG4gICAgICAgICAgICBjb25zdCBjdXJSaWdodFB0ID0gY3VyUmlnaHRNb2xkUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0ICsgaSAqIHN0ZXBIZWlnaHQpKTtcclxuICAgICAgICAgICAgbW9sZFZlcnRpY2VzLnB1c2goY3VyTGVmdE1vbGRQdCwgY3VyUmlnaHRNb2xkUHQpO1xyXG4gICAgICAgICAgICBtb2xkVGVtcExpbmVzLnB1c2goWzIgKiBpLCAxICsgMiAqIGldLCBbMiAqIGksIDIgKyAyICogaV0sIFsxICsgMiAqIGksIDMgKyAyICogaV0pO1xyXG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKGN1ckxlZnRQdCwgY3VyUmlnaHRQdCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG5leHRSb3RhdGVNYXRyaXggPSBHZW9tTGliLmNyZWF0ZVJvdGF0ZU1hdHJpeDQoaG9yaXpvbnRhbFN0ZXBBbmdsZSAqIChpICsgMSksIGNpcmNsZU5vcm1hbCwgZHVtbXlQb2ludDNkKTtcclxuICAgICAgICAgICAgY29uc3QgbmV4dFJhZGl1c0RpciA9IHN0YXJ0UmFkaXVzRGlyLmFwcGxpZWRNYXRyaXg0KG5leHRSb3RhdGVNYXRyaXgpO1xyXG4gICAgICAgICAgICBjb25zdCBuZXh0SGFsZldpZHRoID0gKHN0YXJ0V2lkdGggKyAoZW5kV2lkdGggLSBzdGFydFdpZHRoKSAqICgoaSArIDEpICogaG9yaXpvbnRhbFN0ZXBBbmdsZSkgLyBhcmNBbmdsZSkgLyAyICogKGlzTGVmdEFyYyA/IC0xIDogMSk7XHJcbiAgICAgICAgICAgIGNvbnN0IG5leHRMZWZ0TW9sZFB0ID0gY2lyY2xlQ2VudGVyLmFkZGVkKG5leHRSYWRpdXNEaXIubXVsdGlwbGllZChyYWRpdXMgKyBuZXh0SGFsZldpZHRoKSk7XHJcbiAgICAgICAgICAgIGNvbnN0IG5leHRSaWdodE1vbGRQdCA9IGNpcmNsZUNlbnRlci5hZGRlZChuZXh0UmFkaXVzRGlyLm11bHRpcGxpZWQocmFkaXVzIC0gbmV4dEhhbGZXaWR0aCkpO1xyXG4gICAgICAgICAgICBjb25zdCBuZXh0TGVmdFB0ID0gbmV4dExlZnRNb2xkUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0ICsgaSAqIHN0ZXBIZWlnaHQpKTtcclxuICAgICAgICAgICAgY29uc3QgbmV4dFJpZ2h0UHQgPSBuZXh0UmlnaHRNb2xkUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0ICsgaSAqIHN0ZXBIZWlnaHQpKTtcclxuICAgICAgICAgICAgaWYgKHVwd2FyZCkge1xyXG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaChjdXJMZWZ0UHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSwgY3VyUmlnaHRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2gobmV4dExlZnRQdCwgbmV4dFJpZ2h0UHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0ZW1wKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbNCAqIGksIDEgKyA0ICogaV0sIFs0ICogaSwgMiArIDQgKiBpXSwgWzEgKyA0ICogaSwgMyArIDQgKiBpXSwgWzIgKyA0ICogaSwgMyArIDQgKiBpXSwgWzIgKyA0ICogaSwgNCArIDQgKiBpXSwgWzMgKyA0ICogaSwgNSArIDQgKiBpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGkgPT09IHN0ZXBDb3VudCAtIDIpIHtcclxuICAgICAgICAgICAgICAgIG1vbGRWZXJ0aWNlcy5wdXNoKG5leHRMZWZ0TW9sZFB0LCBuZXh0UmlnaHRNb2xkUHQpO1xyXG4gICAgICAgICAgICAgICAgbW9sZFRlbXBMaW5lcy5wdXNoKFsyICogKHN0ZXBDb3VudCAtIDEpLCAxICsgMiAqIChzdGVwQ291bnQgLSAxKV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpID09PSBzdGVwQ291bnQgLSAyKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiAodXB3YXJkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaChuZXh0TGVmdFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksIG5leHRSaWdodFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbNCAqIChzdGVwQ291bnQgLSAxKSwgMSArIDQgKiAoc3RlcENvdW50IC0gMSldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBsYXN0Um90YXRlTWF0cml4ID0gR2VvbUxpYi5jcmVhdGVSb3RhdGVNYXRyaXg0KGFyY0FuZ2xlLCBjaXJjbGVOb3JtYWwsIGR1bW15UG9pbnQzZCk7XHJcbiAgICAgICAgY29uc3QgbGFzdFJhZGl1c0RpciA9IHN0YXJ0UmFkaXVzRGlyLmFwcGxpZWRNYXRyaXg0KGxhc3RSb3RhdGVNYXRyaXgpO1xyXG4gICAgICAgIGNvbnN0IGxhc3RIYWxmV2lkdGggPSBpc0xlZnRBcmMgPyAtZW5kV2lkdGggLyAyIDogZW5kV2lkdGggLyAyO1xyXG4gICAgICAgIGNvbnN0IGxhc3RMZWZ0TW9sZFB0ID0gY2lyY2xlQ2VudGVyLmFkZGVkKGxhc3RSYWRpdXNEaXIubXVsdGlwbGllZChyYWRpdXMgKyBsYXN0SGFsZldpZHRoKSk7XHJcbiAgICAgICAgY29uc3QgbGFzdFJpZ2h0TW9sZFB0ID0gY2lyY2xlQ2VudGVyLmFkZGVkKGxhc3RSYWRpdXNEaXIubXVsdGlwbGllZChyYWRpdXMgLSBsYXN0SGFsZldpZHRoKSk7XHJcbiAgICAgICAgY29uc3QgbGFzdExlZnRQdCA9IGxhc3RMZWZ0TW9sZFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIHN0ZXBDb3VudCAqIHN0ZXBIZWlnaHQpKTtcclxuICAgICAgICBjb25zdCBsYXN0UmlnaHRQdCA9IGxhc3RSaWdodE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBzdGVwQ291bnQgKiBzdGVwSGVpZ2h0KSk7XHJcbiAgICAgICAgaWYgKHN0ZXBDb3VudCA9PT0gMSkge1xyXG4gICAgICAgICAgICBtb2xkVmVydGljZXMucHVzaChsZWZ0UHQsIHJpZ2h0UHQpO1xyXG4gICAgICAgICAgICBtb2xkVGVtcExpbmVzLnB1c2goWzIgKiAoc3RlcENvdW50IC0gMSksIDEgKyAyICogKHN0ZXBDb3VudCAtIDEpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChsYXN0SG9yaXpvbnRhbEFuZ2xlID49IEFuZ2xlVG9sZXJhbmNlIHx8IGxhc3RIb3Jpem9udGFsQW5nbGUgPT09IDApIHtcclxuICAgICAgICAgICAgbW9sZFZlcnRpY2VzLnB1c2gobGFzdExlZnRNb2xkUHQsIGxhc3RSaWdodE1vbGRQdCk7XHJcbiAgICAgICAgICAgIG1vbGRUZW1wTGluZXMucHVzaChbMiAqIChzdGVwQ291bnQgLSAxKSwgMiArIDIgKiAoc3RlcENvdW50IC0gMSldLCBbMSArIDIgKiAoc3RlcENvdW50IC0gMSksIDMgKyAyICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKiBzdGVwQ291bnQsIDEgKyAyICogc3RlcENvdW50XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh1cHdhcmQpIHtcclxuICAgICAgICAgICAgaWYgKHN0ZXBDb3VudCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaChsZWZ0UHQsIHJpZ2h0UHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbNCAqIChzdGVwQ291bnQgLSAxKSwgMSArIDQgKiAoc3RlcENvdW50IC0gMSldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobGFzdEhvcml6b250YWxBbmdsZSA+PSBBbmdsZVRvbGVyYW5jZSB8fCBsYXN0SG9yaXpvbnRhbEFuZ2xlID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCh2ZXJ0aWNhbFN0ZXApKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHZlcnRpY2FsU3RlcCkpKTtcclxuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2gobGFzdExlZnRQdCwgbGFzdFJpZ2h0UHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbNCAqIChzdGVwQ291bnQgLSAxKSwgMiArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMSArIDQgKiAoc3RlcENvdW50IC0gMSksIDMgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCAzICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsyICsgNCAqIChzdGVwQ291bnQgLSAxKSwgNCArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMyArIDQgKiAoc3RlcENvdW50IC0gMSksIDUgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzQgKiBzdGVwQ291bnQsIDEgKyA0ICogc3RlcENvdW50XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChzdGVwQ291bnQgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2gobGVmdFB0LCByaWdodFB0KTtcclxuICAgICAgICAgICAgICAgIGlmICh0ZW1wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzQgKiAoc3RlcENvdW50IC0gMSksIDEgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGxhc3RIb3Jpem9udGFsQW5nbGUgPj0gQW5nbGVUb2xlcmFuY2UgfHwgbGFzdEhvcml6b250YWxBbmdsZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaChsYXN0TGVmdFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCgtc3RlcEhlaWdodCkpLCBsYXN0UmlnaHRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQpKSk7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKGxhc3RMZWZ0UHQsIGxhc3RSaWdodFB0KTtcclxuICAgICAgICAgICAgICAgIGlmICh0ZW1wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzQgKiAoc3RlcENvdW50IC0gMSksIDIgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzEgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCAzICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsyICsgNCAqIChzdGVwQ291bnQgLSAxKSwgMyArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMiArIDQgKiAoc3RlcENvdW50IC0gMSksIDQgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzMgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCA1ICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFs0ICogc3RlcENvdW50LCAxICsgNCAqIHN0ZXBDb3VudF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdGVwQ291bnQgPiAxKSB7XHJcbiAgICAgICAgICAgIGlmICh0ZW1wKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbdmVydGljZXMubGVuZ3RoIC0gMiwgMiArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMSArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGFjdHVhbExhc3RTdGVwTGVuZ3RoID0gbGFzdEhvcml6b250YWxBbmdsZSA8IEFuZ2xlVG9sZXJhbmNlID8gaG9yaXpvbnRhbFN0ZXBBbmdsZSA6IGxhc3RIb3Jpem9udGFsQW5nbGU7XHJcbiAgICAgICAgICAgIGlmICh1cHdhcmQpIHtcclxuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0IC0gKDEgLSBhY3R1YWxMYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwQW5nbGUpICogc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQgLSAoMSAtIGFjdHVhbExhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXBBbmdsZSkgKiBzdGVwSGVpZ2h0KSkpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IHN0ZXBDb3VudCAtIChsYXN0SG9yaXpvbnRhbEFuZ2xlID49IEFuZ2xlVG9sZXJhbmNlID8gMSA6IDIpOyBqID4gMDsgai0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdkluZCA9IGogKiA0O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZW1wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSAyLCAyICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsxICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGogPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMF0sIFszICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdkluZF0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0KSksIHZlcnRpY2VzW3ZJbmQgKyAxXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQpKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyB2ZXJ0aWNlcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDZdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gNV0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSxcclxuICAgICAgICAgICAgICAgIC8vICk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gc3RlcENvdW50IC0gKGxhc3RIb3Jpem9udGFsQW5nbGUgPj0gQW5nbGVUb2xlcmFuY2UgPyAxIDogMik7IGogPj0gMDsgai0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdkluZCA9IGogKiA0O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZW1wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSAyLCAyICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsxICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGogPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMF0sIFszICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdkluZF0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSwgdmVydGljZXNbdkluZCArIDFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGVtcCkge1xyXG4gICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIDIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMiArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDBdLCBbMyArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDFdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodXB3YXJkKSB7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCgtc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQpKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzWzBdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksIHZlcnRpY2VzWzFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChiYXNlQ29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJhc2VMaW5lU2VnM2QgPSBiYXNlQ29tcG9uZW50LmxpbmUzZDtcclxuICAgICAgICAgICAgY29uc3QgYmFzZUxpbmVEaXIgPSBiYXNlTGluZVNlZzNkLmVuZC5zdWJ0cmFjdGVkKGJhc2VMaW5lU2VnM2Quc3RhcnQpLm5vcm1hbGl6ZWQoKTtcclxuICAgICAgICAgICAgY29uc3QgYW5nbGUgPSBjaXJjbGVUYW5nZW50LmFuZ2xlKGJhc2VMaW5lRGlyKTtcclxuICAgICAgICAgICAgaWYgKGFuZ2xlIDwgTWF0aC5QSSAvIDIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvcm5lckNvbm5lY3Rpb25Qb2ludDEgPSBzdGFydC5hZGRlZChiYXNlTGluZURpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMiAqIE1hdGguc2lnbihhbmdsZSkpKTtcclxuICAgICAgICAgICAgICAgIGNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtzdGFydCwgc3RhcnQuYWRkZWQodGFuZ2VudExlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSwgY29ybmVyQ29ubmVjdGlvblBvaW50MV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb3JuZXJDb25uZWN0aW9uUG9pbnQyID0gc3RhcnQuYWRkZWQoYmFzZUxpbmVEaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMiAqIE1hdGguc2lnbihhbmdsZSkpKTtcclxuICAgICAgICAgICAgICAgIGNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtzdGFydCwgY29ybmVyQ29ubmVjdGlvblBvaW50Miwgc3RhcnQuYWRkZWQodGFuZ2VudExlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb3JuZXJNb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgMF1dO1xyXG4gICAgICAgICAgICBjb3JuZXJTaGFwZS52ZXJ0aWNlcyA9IFtcclxuICAgICAgICAgICAgICAgIC4uLmNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAodiA9PiB2LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCkpKSxcclxuICAgICAgICAgICAgICAgIC4uLmNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAodiA9PiB2LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCAtIHBsYXRmb3JtVGhpY2tuZXNzKSkpLFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICBpZiAodGVtcCkge1xyXG4gICAgICAgICAgICAgICAgY29ybmVyU2hhcGUudGVtcExpbmVzID0gW1xyXG4gICAgICAgICAgICAgICAgICAgIFswLCAxXSwgWzEsIDJdLCBbMiwgMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgWzMsIDRdLCBbNCwgNV0sIFs1LCAzXSxcclxuICAgICAgICAgICAgICAgICAgICBbMCwgM10sIFsxLCA0XSwgWzIsIDVdLFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBnZW5lcmF0ZVN0cmFpZ2h0U3RhaXJTaGFwZShzZWdtZW50LCB0ZW1wID0gdHJ1ZSkge1xyXG4gICAgY29uc3QgeyBzdGFydCwgZW5kLCBzdGFpclNoYXBlLCBtb2xkU2hhcGUsIGNvcm5lclNoYXBlLCBjb3JuZXJNb2xkU2hhcGUsIHN0YXJ0SGVpZ2h0LCBiYXNlQ29tcG9uZW50LCBwYXJhbSB9ID0gc2VnbWVudDtcclxuICAgIGNvbnN0IHsgc3RhcnRXaWR0aCwgZW5kV2lkdGgsIGhvcml6b250YWxTdGVwLCB2ZXJ0aWNhbFN0ZXAsIHVwd2FyZCwgcGxhdGZvcm1UaGlja25lc3MgfSA9IHBhcmFtO1xyXG4gICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFtdO1xyXG4gICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXTtcclxuICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtdO1xyXG4gICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtdO1xyXG4gICAgY29ybmVyU2hhcGUudmVydGljZXMgPSBbXTtcclxuICAgIGNvcm5lclNoYXBlLnRlbXBMaW5lcyA9IFtdO1xyXG4gICAgY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzID0gW107XHJcbiAgICBjb3JuZXJNb2xkU2hhcGUudGVtcExpbmVzID0gW107XHJcbiAgICBjb25zdCB7IHZlcnRpY2VzLCB0ZW1wTGluZXMgfSA9IHN0YWlyU2hhcGU7XHJcbiAgICBjb25zdCB7IHZlcnRpY2VzOiBtb2xkVmVydGljZXMsIHRlbXBMaW5lczogbW9sZFRlbXBMaW5lcyB9ID0gbW9sZFNoYXBlO1xyXG4gICAgbGV0IGhvcml6b250YWxGcm9udERpciA9IGVuZC5zdWJ0cmFjdGVkKHN0YXJ0KS5ub3JtYWxpemVkKCk7XHJcbiAgICBsZXQgaG9yaXpvbnRhbERpc3RhbmNlID0gc3RhcnQuZGlzdGFuY2VUbyhlbmQpO1xyXG4gICAgbGV0IGhvcml6b250YWxMZWZ0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhob3Jpem9udGFsRnJvbnREaXIpO1xyXG4gICAgY29uc3Qgc3RlcEZsb2F0Q291bnQgPSBob3Jpem9udGFsRGlzdGFuY2UgLyBob3Jpem9udGFsU3RlcDtcclxuICAgIGNvbnN0IHN0ZXBDb3VudCA9IE1hdGguY2VpbChzdGVwRmxvYXRDb3VudCk7XHJcbiAgICBjb25zdCBsYXN0U3RlcExlbmd0aCA9IGhvcml6b250YWxEaXN0YW5jZSAtIChzdGVwQ291bnQgLSAxKSAqIGhvcml6b250YWxTdGVwO1xyXG4gICAgY29uc3QgdmFsaWRTdGVwQ291bnQgPSAobGFzdFN0ZXBMZW5ndGggPT09IDAgfHwgbGFzdFN0ZXBMZW5ndGggPiBMZW5ndGhUb2xlcmFuY2UpID8gc3RlcENvdW50IDogc3RlcENvdW50IC0gMTtcclxuICAgIGlmICh2YWxpZFN0ZXBDb3VudCA8IDEgfHwgdmFsaWRTdGVwQ291bnQgPj0gU3RlcENvdW50TGltaXQpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoYmFzZUNvbXBvbmVudCkge1xyXG4gICAgICAgIGNvbnN0IGJhc2VMaW5lU2VnM2QgPSBiYXNlQ29tcG9uZW50LmxpbmUzZDtcclxuICAgICAgICBjb25zdCBiYXNlTGluZURpciA9IGJhc2VMaW5lU2VnM2QuZW5kLnN1YnRyYWN0ZWQoYmFzZUxpbmVTZWczZC5zdGFydCkubm9ybWFsaXplZCgpO1xyXG4gICAgICAgIGNvbnN0IGFuZ2xlID0gaG9yaXpvbnRhbEZyb250RGlyLmFuZ2xlKGJhc2VMaW5lRGlyKTtcclxuICAgICAgICBjb25zdCBkZWx0YUFuZ2xlID0gTWF0aC5hYnMoYW5nbGUgLSBNYXRoLlBJIC8gMik7XHJcbiAgICAgICAgaWYgKGRlbHRhQW5nbGUgPD0gRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UpIHtcclxuICAgICAgICAgICAgaG9yaXpvbnRhbEZyb250RGlyID0gYmFzZUxpbmVEaXIuY3Jvc3MoaG9yaXpvbnRhbEZyb250RGlyLmNyb3NzKGJhc2VMaW5lRGlyKSkubm9ybWFsaXplZCgpO1xyXG4gICAgICAgICAgICBob3Jpem9udGFsRGlzdGFuY2UgPSBob3Jpem9udGFsRGlzdGFuY2UgKiBNYXRoLmNvcyhkZWx0YUFuZ2xlKTtcclxuICAgICAgICAgICAgaG9yaXpvbnRhbExlZnREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKGhvcml6b250YWxGcm9udERpcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoYW5nbGUgPCBNYXRoLlBJIC8gMikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29ybmVyQ29ubmVjdGlvblBvaW50MSA9IHN0YXJ0LmFkZGVkKGJhc2VMaW5lRGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyICogTWF0aC5zaWduKGFuZ2xlKSkpO1xyXG4gICAgICAgICAgICAgICAgY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzID0gW3N0YXJ0LCBzdGFydC5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpLCBjb3JuZXJDb25uZWN0aW9uUG9pbnQxXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvcm5lckNvbm5lY3Rpb25Qb2ludDIgPSBzdGFydC5hZGRlZChiYXNlTGluZURpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyICogTWF0aC5zaWduKGFuZ2xlKSkpO1xyXG4gICAgICAgICAgICAgICAgY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzID0gW3N0YXJ0LCBjb3JuZXJDb25uZWN0aW9uUG9pbnQyLCBzdGFydC5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvcm5lck1vbGRTaGFwZS50ZW1wTGluZXMgPSBbWzAsIDFdLCBbMSwgMl0sIFsyLCAwXV07XHJcbiAgICAgICAgICAgIGNvcm5lclNoYXBlLnZlcnRpY2VzID0gW1xyXG4gICAgICAgICAgICAgICAgLi4uY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzLm1hcCh2ID0+IHYuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkpLFxyXG4gICAgICAgICAgICAgICAgLi4uY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzLm1hcCh2ID0+IHYuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0IC0gcGxhdGZvcm1UaGlja25lc3MpKSksXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIGlmICh0ZW1wKSB7XHJcbiAgICAgICAgICAgICAgICBjb3JuZXJTaGFwZS50ZW1wTGluZXMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgWzAsIDFdLCBbMSwgMl0sIFsyLCAwXSxcclxuICAgICAgICAgICAgICAgICAgICBbMywgNF0sIFs0LCA1XSwgWzUsIDNdLFxyXG4gICAgICAgICAgICAgICAgICAgIFswLCAzXSwgWzEsIDRdLCBbMiwgNV0sXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3Qgc3RlcEhlaWdodCA9IHVwd2FyZCA/IHZlcnRpY2FsU3RlcCA6IC12ZXJ0aWNhbFN0ZXA7XHJcbiAgICBzZWdtZW50LmVuZEhlaWdodCA9IHNlZ21lbnQuc3RhcnRIZWlnaHQgKyB2YWxpZFN0ZXBDb3VudCAqIHN0ZXBIZWlnaHQ7XHJcbiAgICBzdGFpclNoYXBlLnN0ZXBDb3VudCA9IHZhbGlkU3RlcENvdW50O1xyXG4gICAgbW9sZFNoYXBlLnN0ZXBDb3VudCA9IHZhbGlkU3RlcENvdW50O1xyXG4gICAgY29uc3QgbGVmdFB0ID0gc3RhcnQuYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpO1xyXG4gICAgY29uc3QgcmlnaHRQdCA9IHN0YXJ0LmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSk7XHJcbiAgICBjb25zdCB3aWR0aERlbHRhID0gKGVuZFdpZHRoIC0gc3RhcnRXaWR0aCkgLyAyIC8gKHN0ZXBGbG9hdENvdW50KTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RlcENvdW50IC0gMTsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgY3VyTGVmdE1vbGRQdCA9IGxlZnRQdC5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChpICogaG9yaXpvbnRhbFN0ZXApKS5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKGkgKiB3aWR0aERlbHRhKSk7XHJcbiAgICAgICAgY29uc3QgY3VyUmlnaHRNb2xkUHQgPSByaWdodFB0LmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGkgKiBob3Jpem9udGFsU3RlcCkpLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoLWkgKiB3aWR0aERlbHRhKSk7XHJcbiAgICAgICAgY29uc3QgY3VyTGVmdFB0ID0gY3VyTGVmdE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBpICogc3RlcEhlaWdodCkpO1xyXG4gICAgICAgIGNvbnN0IGN1clJpZ2h0UHQgPSBjdXJSaWdodE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBpICogc3RlcEhlaWdodCkpO1xyXG4gICAgICAgIG1vbGRWZXJ0aWNlcy5wdXNoKGN1ckxlZnRNb2xkUHQsIGN1clJpZ2h0TW9sZFB0KTtcclxuICAgICAgICBtb2xkVGVtcExpbmVzLnB1c2goWzIgKiBpLCAxICsgMiAqIGldLCBbMiAqIGksIDIgKyAyICogaV0sIFsxICsgMiAqIGksIDMgKyAyICogaV0pO1xyXG4gICAgICAgIHZlcnRpY2VzLnB1c2goY3VyTGVmdFB0LCBjdXJSaWdodFB0KTtcclxuICAgICAgICBpZiAodXB3YXJkKSB7XHJcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2goY3VyTGVmdFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksIGN1clJpZ2h0UHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKGN1ckxlZnRQdC5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpLCBjdXJSaWdodFB0LmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGVtcCkge1xyXG4gICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbNCAqIGksIDEgKyA0ICogaV0sIFs0ICogaSwgMiArIDQgKiBpXSwgWzEgKyA0ICogaSwgMyArIDQgKiBpXSwgWzIgKyA0ICogaSwgMyArIDQgKiBpXSwgWzIgKyA0ICogaSwgNCArIDQgKiBpXSwgWzMgKyA0ICogaSwgNSArIDQgKiBpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbW9sZFZlcnRpY2VzLnB1c2goc3RlcENvdW50ID4gMSA/IG1vbGRWZXJ0aWNlc1ttb2xkVmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaG9yaXpvbnRhbFN0ZXApKSA6IGxlZnRQdCwgc3RlcENvdW50ID4gMSA/IG1vbGRWZXJ0aWNlc1ttb2xkVmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaG9yaXpvbnRhbFN0ZXApKSA6IHJpZ2h0UHQpO1xyXG4gICAgbW9sZFRlbXBMaW5lcy5wdXNoKFsyICogKHN0ZXBDb3VudCAtIDEpLCAxICsgMiAqIChzdGVwQ291bnQgLSAxKV0pO1xyXG4gICAgaWYgKGxhc3RTdGVwTGVuZ3RoID4gTGVuZ3RoVG9sZXJhbmNlIHx8IGxhc3RTdGVwTGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgbW9sZFZlcnRpY2VzLnB1c2gobW9sZFZlcnRpY2VzW21vbGRWZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXAgKiB3aWR0aERlbHRhKSkuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGgpKSwgbW9sZFZlcnRpY2VzW21vbGRWZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKC1sYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwICogd2lkdGhEZWx0YSkpLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoKSkpO1xyXG4gICAgICAgIG1vbGRUZW1wTGluZXMucHVzaChbMiAqIChzdGVwQ291bnQgLSAxKSwgMiArIDIgKiAoc3RlcENvdW50IC0gMSldLCBbMSArIDIgKiAoc3RlcENvdW50IC0gMSksIDMgKyAyICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKiBzdGVwQ291bnQsIDEgKyAyICogc3RlcENvdW50XSk7XHJcbiAgICB9XHJcbiAgICBpZiAodXB3YXJkKSB7XHJcbiAgICAgICAgdmVydGljZXMucHVzaChzdGVwQ291bnQgPiAxID8gdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaG9yaXpvbnRhbFN0ZXApKSA6IGxlZnRQdCwgc3RlcENvdW50ID4gMSA/IHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSkgOiByaWdodFB0KTtcclxuICAgICAgICBpZiAodGVtcCkge1xyXG4gICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbNCAqIChzdGVwQ291bnQgLSAxKSwgMSArIDQgKiAoc3RlcENvdW50IC0gMSldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxhc3RTdGVwTGVuZ3RoID4gTGVuZ3RoVG9sZXJhbmNlIHx8IGxhc3RTdGVwTGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSk7XHJcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwICogd2lkdGhEZWx0YSkpLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoKSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoLWxhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXAgKiB3aWR0aERlbHRhKSkuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGgpKSk7XHJcbiAgICAgICAgICAgIGlmICh0ZW1wKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChcclxuICAgICAgICAgICAgICAgIC8vIFs0ICogc3RlcENvdW50LCAxICsgNCAqIHN0ZXBDb3VudF0sXHJcbiAgICAgICAgICAgICAgICBbNCAqIChzdGVwQ291bnQgLSAxKSwgMiArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMSArIDQgKiAoc3RlcENvdW50IC0gMSksIDMgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCAzICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsyICsgNCAqIChzdGVwQ291bnQgLSAxKSwgNCArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMyArIDQgKiAoc3RlcENvdW50IC0gMSksIDUgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzQgKiBzdGVwQ291bnQsIDEgKyA0ICogc3RlcENvdW50XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB2ZXJ0aWNlcy5wdXNoKHN0ZXBDb3VudCA+IDEgPyB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpIDogbGVmdFB0LCBzdGVwQ291bnQgPiAxID8gdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSA6IHJpZ2h0UHQpO1xyXG4gICAgICAgIGlmICh0ZW1wKSB7XHJcbiAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFs0ICogKHN0ZXBDb3VudCAtIDEpLCAxICsgNCAqIChzdGVwQ291bnQgLSAxKV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobGFzdFN0ZXBMZW5ndGggPiBMZW5ndGhUb2xlcmFuY2UgfHwgbGFzdFN0ZXBMZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXAgKiB3aWR0aERlbHRhKSkuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGgpKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZCgtbGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcCAqIHdpZHRoRGVsdGEpKS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCkpKTtcclxuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpKTtcclxuICAgICAgICAgICAgaWYgKHRlbXApIHtcclxuICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgLy8gWzQgKiAoc3RlcENvdW50IC0gMSksIDEgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSxcclxuICAgICAgICAgICAgICAgIFs0ICogKHN0ZXBDb3VudCAtIDEpLCAyICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsxICsgNCAqIChzdGVwQ291bnQgLSAxKSwgMyArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMiArIDQgKiAoc3RlcENvdW50IC0gMSksIDMgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCA0ICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFszICsgNCAqIChzdGVwQ291bnQgLSAxKSwgNSArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbNCAqIHN0ZXBDb3VudCwgMSArIDQgKiBzdGVwQ291bnRdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChzdGVwQ291bnQgPiAxKSB7XHJcbiAgICAgICAgaWYgKHRlbXApIHtcclxuICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIDIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMiArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDQgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCA1ICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFt2ZXJ0aWNlcy5sZW5ndGggKyAyLCAxICsgdmVydGljZXMubGVuZ3RoICsgMl0sIFt2ZXJ0aWNlcy5sZW5ndGggKyAyLCAwXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggKyAyLCAxXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGFjdHVhbExhc3RTdGVwTGVuZ3RoID0gbGFzdFN0ZXBMZW5ndGggPCBMZW5ndGhUb2xlcmFuY2UgPyBob3Jpem9udGFsU3RlcCA6IGxhc3RTdGVwTGVuZ3RoO1xyXG4gICAgICAgIGlmICh1cHdhcmQpIHtcclxuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQgLSAoMSAtIGFjdHVhbExhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXApICogc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQgLSAoMSAtIGFjdHVhbExhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXApICogc3RlcEhlaWdodCkpKTtcclxuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1swXS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpLCB2ZXJ0aWNlc1sxXS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoLWFjdHVhbExhc3RTdGVwTGVuZ3RoKSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKC1hY3R1YWxMYXN0U3RlcExlbmd0aCkpKTtcclxuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1swXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1sxXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBpZiAodGVtcCkge1xyXG4gICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbdmVydGljZXMubGVuZ3RoIC0gMiwgMiArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMSArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMF0sIFszICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodXB3YXJkKSB7XHJcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0KSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCgtc3RlcEhlaWdodCkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbMF0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSwgdmVydGljZXNbMV0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGdlbmVyYXRlUGxhdGZvcm1TaGFwZShzZWdtZW50LCB0ZW1wID0gdHJ1ZSkge1xyXG4gICAgY29uc3QgeyBzdGFydCwgc3RhcnRIZWlnaHQsIGJhc2VDb21wb25lbnQsIHN0YWlyU2hhcGUsIG1vbGRTaGFwZSwgY29ybmVyU2hhcGUsIGNvcm5lck1vbGRTaGFwZSwgcGFyYW0gfSA9IHNlZ21lbnQ7XHJcbiAgICBjb25zdCB7IHN0YXJ0V2lkdGgsIG9mZnNldFdpZHRoLCB3aXRoT2Zmc2V0LCBwbGF0Zm9ybVRoaWNrbmVzcywgcGxhdGZvcm1MZW5ndGgsIHBsYXRmb3JtTGVuZ3RoTG9ja2VkLCBtb2RlbEVkaXRpbmcgfSA9IHBhcmFtO1xyXG4gICAgY29uc3QgY3VyRGlyID0gc2VnbWVudC5lbmQuc3VidHJhY3RlZChzdGFydCk7XHJcbiAgICBjb25zdCBjdXJEaXJOb3JtYWxpemVkID0gc2VnbWVudC5lbmQuc3VidHJhY3RlZChzdGFydCkubm9ybWFsaXplZCgpO1xyXG4gICAgY29uc3QgY3VyTGVmdERpciA9IERpcmVjdGlvblouY3Jvc3MoY3VyRGlyKS5ub3JtYWxpemVkKCk7XHJcbiAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gW107XHJcbiAgICBzdGFpclNoYXBlLnRlbXBMaW5lcyA9IFtdO1xyXG4gICAgbW9sZFNoYXBlLnZlcnRpY2VzID0gW107XHJcbiAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW107XHJcbiAgICBjb3JuZXJTaGFwZS52ZXJ0aWNlcyA9IFtdO1xyXG4gICAgY29ybmVyU2hhcGUudGVtcExpbmVzID0gW107XHJcbiAgICBjb3JuZXJNb2xkU2hhcGUudmVydGljZXMgPSBbXTtcclxuICAgIGNvcm5lck1vbGRTaGFwZS50ZW1wTGluZXMgPSBbXTtcclxuICAgIHNlZ21lbnQuZW5kID0gcGxhdGZvcm1MZW5ndGhMb2NrZWQgPyBzZWdtZW50LnN0YXJ0LmFkZGVkKGN1ckRpck5vcm1hbGl6ZWQubXVsdGlwbGllZChwbGF0Zm9ybUxlbmd0aCkpIDogc2VnbWVudC5lbmQ7XHJcbiAgICBzZWdtZW50LmVuZEhlaWdodCA9IHN0YXJ0SGVpZ2h0O1xyXG4gICAgaWYgKCFtb2RlbEVkaXRpbmcpIHtcclxuICAgICAgICBwYXJhbS53aXRoT2Zmc2V0ID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoYmFzZUNvbXBvbmVudCkge1xyXG4gICAgICAgIGNvbnN0IGJhc2VMaW5lU2VnM2QgPSBiYXNlQ29tcG9uZW50LmxpbmUzZDtcclxuICAgICAgICBjb25zdCB7IHN0YXJ0OiBiYXNlTGluZVN0YXJ0LCBlbmQ6IGJhc2VMaW5lRW5kIH0gPSBiYXNlTGluZVNlZzNkO1xyXG4gICAgICAgIGNvbnN0IGJhc2VMaW5lRGlyID0gYmFzZUxpbmVFbmQuc3VidHJhY3RlZChiYXNlTGluZVN0YXJ0KS5ub3JtYWxpemVkKCk7XHJcbiAgICAgICAgY29uc3QgcHJldkRpck5vcm1hbGl6ZWQgPSBiYXNlTGluZURpci5jcm9zcyhEaXJlY3Rpb25aKS5ub3JtYWxpemVkKCk7XHJcbiAgICAgICAgY29uc3QgcHJldkxlZnREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKHByZXZEaXJOb3JtYWxpemVkKS5ub3JtYWxpemVkKCk7XHJcbiAgICAgICAgY29uc3QgYW5nbGUgPSBjdXJEaXIuYW5nbGVUbyhwcmV2RGlyTm9ybWFsaXplZCwgRGlyZWN0aW9uWik7XHJcbiAgICAgICAgY29uc3QgZnJvbnRMZW5ndGggPSBwbGF0Zm9ybUxlbmd0aExvY2tlZCA/IHBsYXRmb3JtTGVuZ3RoIDogTWF0aC5hYnMoY3VyRGlyLmRvdChwcmV2RGlyTm9ybWFsaXplZCkpO1xyXG4gICAgICAgIGNvbnN0IGN1ckVuZExlZnRDb3JuZXIgPSBzZWdtZW50LmVuZC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKTtcclxuICAgICAgICBjb25zdCBkaXIxID0gY3VyRW5kTGVmdENvcm5lci5zdWJ0cmFjdGVkKHNlZ21lbnQuc3RhcnQpO1xyXG4gICAgICAgIGNvbnN0IGFuZ2xlMSA9IGRpcjEuYW5nbGUoY3VyRGlyKTtcclxuICAgICAgICBpZiAoKGFuZ2xlID49IE1hdGguUEkgJiYgYW5nbGUgPD0gKE1hdGguUEkgKiAzIC8gMiArIGFuZ2xlMSkpIHx8IChtb2RlbEVkaXRpbmcgJiYgd2l0aE9mZnNldCAmJiBvZmZzZXRXaWR0aCA+PSAwKSkge1xyXG4gICAgICAgICAgICBzZWdtZW50LnBsYXRmb3JtRGlyZWN0aW9uVHlwZSA9IFBsYXRmb3JtRGlyZWN0aW9uVHlwZS5MZWZ0O1xyXG4gICAgICAgICAgICBwYXJhbS5wbGF0Zm9ybUxlbmd0aCA9IGZyb250TGVuZ3RoO1xyXG4gICAgICAgICAgICBjb25zdCBmcm9udEVuZCA9IHNlZ21lbnQuc3RhcnQuYWRkZWQocHJldkRpck5vcm1hbGl6ZWQubXVsdGlwbGllZChmcm9udExlbmd0aCkpO1xyXG4gICAgICAgICAgICBzZWdtZW50LmVuZCA9IGZyb250RW5kO1xyXG4gICAgICAgICAgICBjb25zdCBsZWZ0TGVuZ3RoID0gd2l0aE9mZnNldCAmJiBtb2RlbEVkaXRpbmcgPyAob2Zmc2V0V2lkdGggKyBzdGFydFdpZHRoIC8gMikgOiBjdXJEaXIuZG90KHByZXZMZWZ0RGlyKTtcclxuICAgICAgICAgICAgaWYgKGxlZnRMZW5ndGggPiBzdGFydFdpZHRoIC8gMikge1xyXG4gICAgICAgICAgICAgICAgcGFyYW0ud2l0aE9mZnNldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBwYXJhbS5vZmZzZXRXaWR0aCA9IGxlZnRMZW5ndGggLSBzdGFydFdpZHRoIC8gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCB2YWxpZExlZnRMZW5ndGggPSBNYXRoLm1heChzdGFydFdpZHRoIC8gMiwgbGVmdExlbmd0aCk7XHJcbiAgICAgICAgICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtcclxuICAgICAgICAgICAgICAgIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQodmFsaWRMZWZ0TGVuZ3RoKSksXHJcbiAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpLFxyXG4gICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSxcclxuICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQodmFsaWRMZWZ0TGVuZ3RoKSksXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIG1vbGRTaGFwZS50ZW1wTGluZXMgPSBbWzAsIDFdLCBbMSwgMl0sIFsyLCAzXSwgWzMsIDBdXTtcclxuICAgICAgICAgICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFsuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKSksXHJcbiAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgLSBwbGF0Zm9ybVRoaWNrbmVzcykpKSxcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgaWYgKHRlbXApIHtcclxuICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW1xyXG4gICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcy5tYXAoc2VnID0+IFtzZWdbMF0gKyA0LCBzZWdbMV0gKyA0XSksXHJcbiAgICAgICAgICAgICAgICAgICAgWzAsIDRdLCBbMSwgNV0sIFsyLCA2XSwgWzMsIDddLFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICgoYW5nbGUgPCBNYXRoLlBJICYmIGFuZ2xlID49IChNYXRoLlBJIC8gMiAtIGFuZ2xlMSkpIHx8IChtb2RlbEVkaXRpbmcgJiYgd2l0aE9mZnNldCAmJiBvZmZzZXRXaWR0aCA8IDApKSB7XHJcbiAgICAgICAgICAgIHNlZ21lbnQucGxhdGZvcm1EaXJlY3Rpb25UeXBlID0gUGxhdGZvcm1EaXJlY3Rpb25UeXBlLlJpZ2h0O1xyXG4gICAgICAgICAgICBwYXJhbS5wbGF0Zm9ybUxlbmd0aCA9IGZyb250TGVuZ3RoO1xyXG4gICAgICAgICAgICBjb25zdCByaWdodExlbmd0aCA9IHdpdGhPZmZzZXQgJiYgbW9kZWxFZGl0aW5nID8gKC1vZmZzZXRXaWR0aCArIHN0YXJ0V2lkdGggLyAyKSA6IC1jdXJEaXIuZG90KHByZXZMZWZ0RGlyKTtcclxuICAgICAgICAgICAgY29uc3QgZnJvbnRFbmQxID0gc2VnbWVudC5zdGFydC5hZGRlZChwcmV2RGlyTm9ybWFsaXplZC5tdWx0aXBsaWVkKGZyb250TGVuZ3RoKSk7XHJcbiAgICAgICAgICAgIHNlZ21lbnQuZW5kID0gZnJvbnRFbmQxO1xyXG4gICAgICAgICAgICBpZiAocmlnaHRMZW5ndGggPiBzdGFydFdpZHRoIC8gMikge1xyXG4gICAgICAgICAgICAgICAgcGFyYW0ud2l0aE9mZnNldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBwYXJhbS5vZmZzZXRXaWR0aCA9IC0ocmlnaHRMZW5ndGggLSBzdGFydFdpZHRoIC8gMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgdmFsaWRSaWdodExlbmd0aCA9IE1hdGgubWF4KHN0YXJ0V2lkdGggLyAyLCByaWdodExlbmd0aCk7XHJcbiAgICAgICAgICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtcclxuICAgICAgICAgICAgICAgIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcclxuICAgICAgICAgICAgICAgIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLXZhbGlkUmlnaHRMZW5ndGgpKSxcclxuICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLXZhbGlkUmlnaHRMZW5ndGgpKSxcclxuICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtbMCwgMV0sIFsxLCAyXSwgWzIsIDNdLCBbMywgMF1dO1xyXG4gICAgICAgICAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gWy4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCkpKSxcclxuICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCAtIHBsYXRmb3JtVGhpY2tuZXNzKSkpLFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICBpZiAodGVtcCkge1xyXG4gICAgICAgICAgICAgICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcyxcclxuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLm1hcChzZWcgPT4gW3NlZ1swXSArIDQsIHNlZ1sxXSArIDRdKSxcclxuICAgICAgICAgICAgICAgICAgICBbMCwgNF0sIFsxLCA1XSwgWzIsIDZdLCBbMywgN10sXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBwYXJhbS5vZmZzZXRXaWR0aCA9IDA7XHJcbiAgICAgICAgICAgIGlmIChhbmdsZSA8PSBEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSB8fCBhbmdsZSA+PSAoTWF0aC5QSSAqIDIgLSBEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSkpIHtcclxuICAgICAgICAgICAgICAgIHNlZ21lbnQucGxhdGZvcm1EaXJlY3Rpb25UeXBlID0gUGxhdGZvcm1EaXJlY3Rpb25UeXBlLkZyb250O1xyXG4gICAgICAgICAgICAgICAgc2VnbWVudC5lbmQgPSBzZWdtZW50LnN0YXJ0LmFkZGVkKHByZXZEaXJOb3JtYWxpemVkLm11bHRpcGxpZWQoZnJvbnRMZW5ndGgpKTtcclxuICAgICAgICAgICAgICAgIHBhcmFtLnBsYXRmb3JtTGVuZ3RoID0gZnJvbnRMZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyICsgb2Zmc2V0V2lkdGgpKSxcclxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMiArIG9mZnNldFdpZHRoKSksXHJcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpLFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgIG1vbGRTaGFwZS50ZW1wTGluZXMgPSBbWzAsIDFdLCBbMSwgMl0sIFsyLCAzXSwgWzMsIDBdXTtcclxuICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkpLFxyXG4gICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCAtIHBsYXRmb3JtVGhpY2tuZXNzKSkpLFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgIGlmICh0ZW1wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMubWFwKHNlZyA9PiBbc2VnWzBdICsgNCwgc2VnWzFdICsgNF0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbMCwgNF0sIFsxLCA1XSwgWzIsIDZdLCBbMywgN10sXHJcbiAgICAgICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSA8IGFuZ2xlICYmIGFuZ2xlIDwgKE1hdGguUEkgLyAyIC0gYW5nbGUxKSkge1xyXG4gICAgICAgICAgICAgICAgc2VnbWVudC5wbGF0Zm9ybURpcmVjdGlvblR5cGUgPSBQbGF0Zm9ybURpcmVjdGlvblR5cGUuUmlnaHRGcm9udDtcclxuICAgICAgICAgICAgICAgIHBhcmFtLnBsYXRmb3JtTGVuZ3RoID0gc2VnbWVudC5lbmQuZGlzdGFuY2VUbyhzZWdtZW50LnN0YXJ0KTtcclxuICAgICAgICAgICAgICAgIGxldCBsZWZ0Q29ubmVjdFBvaW50cyA9IFtzdGFydC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSwgYmFzZUxpbmVFbmRdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYmFzZUxpbmVFbmREaXN0YW5jZSA9IHN0YXJ0LmRpc3RhbmNlVG8oYmFzZUxpbmVFbmQpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGVmdFByb2plY3REaXN0YW5jZSA9IHN0YXJ0V2lkdGggLyAyICogTWF0aC5jb3MoYW5nbGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxlZnRQcm9qZWN0RGlzdGFuY2UgPCBiYXNlTGluZUVuZERpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbDEgPSBzdGFydFdpZHRoIC8gMiAvIE1hdGguY29zKGFuZ2xlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobDEgPiBiYXNlTGluZUVuZERpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGExID0gbDEgLSBiYXNlTGluZUVuZERpc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjMSA9IGExIC8gTWF0aC50YW4oYW5nbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0Q29ubmVjdFBvaW50cyA9IFtzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKGJhc2VMaW5lRW5kRGlzdGFuY2UpKS5hZGRlZChwcmV2RGlyTm9ybWFsaXplZC5tdWx0aXBsaWVkKGMxKSksIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoYmFzZUxpbmVFbmREaXN0YW5jZSkpXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRDb25uZWN0UG9pbnRzID0gW3N0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQobDEpKV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbW9sZFNoYXBlLnZlcnRpY2VzID0gW1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHN0YXJ0LmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpLFxyXG4gICAgICAgICAgICAgICAgICAgIC4uLmxlZnRDb25uZWN0UG9pbnRzLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyIC8gTWF0aC5jb3MoYW5nbGUpKSksXHJcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpLFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1vbGRWZXJ0ZXhDb3VudCA9IG1vbGRTaGFwZS52ZXJ0aWNlcy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gZ2VuZXJhdGVUZW1wTGluZXNMb29wKG1vbGRWZXJ0ZXhDb3VudCk7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiAobW9sZFZlcnRleENvdW50ID09PSA0KSB7XHJcbiAgICAgICAgICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIG1vbGRTaGFwZS50ZW1wTGluZXMgPSBbWzAsIDFdLCBbMSwgMl0sIFsyLCAzXSwgWzMsIDRdLCBbNCwgMF1dO1xyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFsuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKSksXHJcbiAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0IC0gcGxhdGZvcm1UaGlja25lc3MpKSksXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGFpclNoYXBlLnRlbXBMaW5lcyA9IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcy5tYXAoc2VnID0+IFtzZWdbMF0gKyBtb2xkVmVydGV4Q291bnQsIHNlZ1sxXSArIG1vbGRWZXJ0ZXhDb3VudF0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLm1hcChzZWcgPT4gW3NlZ1swXSwgc2VnWzBdICsgbW9sZFZlcnRleENvdW50XSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFswLCA1XSwgWzEsIDZdLCBbMiwgN10sIFszLCA4XSwgWzQsIDldLFxyXG4gICAgICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoYW5nbGUgPiAoTWF0aC5QSSAqIDMgLyAyICsgYW5nbGUxKSAmJiBhbmdsZSA8IChNYXRoLlBJICogMiAtIERpcmVjdGlvbkFuZ2xlVG9sZXJhbmNlKSkge1xyXG4gICAgICAgICAgICAgICAgc2VnbWVudC5wbGF0Zm9ybURpcmVjdGlvblR5cGUgPSBQbGF0Zm9ybURpcmVjdGlvblR5cGUuTGVmdEZyb250O1xyXG4gICAgICAgICAgICAgICAgcGFyYW0ucGxhdGZvcm1MZW5ndGggPSBzZWdtZW50LmVuZC5kaXN0YW5jZVRvKHNlZ21lbnQuc3RhcnQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJpZ2h0Q29ubmVjdFBvaW50cyA9IFtiYXNlTGluZVN0YXJ0LCBzdGFydC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSldO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYmFzZUxpbmVTdGFydERpc3RhbmNlID0gc3RhcnQuZGlzdGFuY2VUbyhiYXNlTGluZVN0YXJ0KTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJpZ2h0UHJvamVjdERpc3RhbmNlID0gc3RhcnRXaWR0aCAvIDIgKiBNYXRoLmNvcyhhbmdsZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmlnaHRQcm9qZWN0RGlzdGFuY2UgPCBiYXNlTGluZVN0YXJ0RGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgcmlnaHRDb25uZWN0UG9pbnRzID0gW2Jhc2VMaW5lU3RhcnQsIGJhc2VMaW5lU3RhcnRdO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIChzdGFydFdpZHRoIDw9IHByZXZQYXJhbS5lbmRXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGwyID0gc3RhcnRXaWR0aCAvIDIgLyBNYXRoLmNvcyhhbmdsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGwyID4gYmFzZUxpbmVTdGFydERpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGEyID0gbDIgLSBiYXNlTGluZVN0YXJ0RGlzdGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGMyID0gYTIgLyBNYXRoLnRhbihNYXRoLlBJICogMiAtIGFuZ2xlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHRDb25uZWN0UG9pbnRzID0gW3N0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLWJhc2VMaW5lU3RhcnREaXN0YW5jZSkpLCBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC1iYXNlTGluZVN0YXJ0RGlzdGFuY2UpKS5hZGRlZChwcmV2RGlyTm9ybWFsaXplZC5tdWx0aXBsaWVkKGMyKSldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHRDb25uZWN0UG9pbnRzID0gW3N0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLWwyKSldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyIC8gTWF0aC5jb3MoYW5nbGUpKSksXHJcbiAgICAgICAgICAgICAgICAgICAgLi4ucmlnaHRDb25uZWN0UG9pbnRzLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHN0YXJ0LmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSxcclxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSksXHJcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSksXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbW9sZFZlcnRleENvdW50ID0gbW9sZFNoYXBlLnZlcnRpY2VzLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIG1vbGRTaGFwZS50ZW1wTGluZXMgPSBnZW5lcmF0ZVRlbXBMaW5lc0xvb3AobW9sZFZlcnRleENvdW50KTtcclxuICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkpLFxyXG4gICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCAtIHBsYXRmb3JtVGhpY2tuZXNzKSkpLFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgIGlmICh0ZW1wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMubWFwKHNlZyA9PiBbc2VnWzBdICsgbW9sZFZlcnRleENvdW50LCBzZWdbMV0gKyBtb2xkVmVydGV4Q291bnRdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcy5tYXAoc2VnID0+IFtzZWdbMF0sIHNlZ1swXSArIG1vbGRWZXJ0ZXhDb3VudF0pLFxyXG4gICAgICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcGFyYW0ucGxhdGZvcm1MZW5ndGggPSBzZWdtZW50LmVuZC5kaXN0YW5jZVRvKHNlZ21lbnQuc3RhcnQpO1xyXG4gICAgICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtcclxuICAgICAgICAgICAgc3RhcnQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSksXHJcbiAgICAgICAgICAgIHN0YXJ0LmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSxcclxuICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpLFxyXG4gICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcclxuICAgICAgICBdO1xyXG4gICAgICAgIG1vbGRTaGFwZS50ZW1wTGluZXMgPSBbWzAsIDFdLCBbMSwgMl0sIFsyLCAzXSwgWzMsIDBdXTtcclxuICAgICAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gWy4uLm1vbGRTaGFwZS52ZXJ0aWNlcyxcclxuICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1wbGF0Zm9ybVRoaWNrbmVzcykpKSxcclxuICAgICAgICBdO1xyXG4gICAgICAgIGlmICh0ZW1wKSB7XHJcbiAgICAgICAgICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW1xyXG4gICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcyxcclxuICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMubWFwKHNlZyA9PiBbc2VnWzBdICsgNCwgc2VnWzFdICsgNF0pLFxyXG4gICAgICAgICAgICAgICAgWzAsIDRdLCBbMSwgNV0sIFsyLCA2XSwgWzMsIDddLFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5jb25zdCBDb2x1bW5TdGVwVG9sZXJhbmNlID0gMSAvIDEwO1xyXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVIYW5kcmFpbFNoYXBlKHN0YWlyUGFyYW0sIHNlZ21lbnRzKSB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICBjb25zdCB7IGhhbmRyYWlsOiB7IHN1cHBvcnQsIGhlaWdodCwgY29sdW1uOiB7IHN0ZXAsIHBhcmFtOiBjb2x1bW5QYXJhbSB9IH0gfSA9IHN0YWlyUGFyYW07XHJcbiAgICBpZiAoc2VnbWVudHMubGVuZ3RoICYmIHN1cHBvcnQpIHtcclxuICAgICAgICBjb25zdCBoYW5kcmFpbHMgPSBbXTtcclxuICAgICAgICBjb25zdCB2aXNpdGVkID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIGZvciAoY29uc3Qgc2VnbWVudCBvZiBzZWdtZW50cykge1xyXG4gICAgICAgICAgICB2aXNpdGVkLnNldChzZWdtZW50LnBhcmFtLmluZGV4LCB7IGxlZnQ6IGZhbHNlLCByaWdodDogZmFsc2UsIGxpbmUzZEluZGV4ZXM6IG5ldyBTZXQoKSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGN1cnJlbnQgPSBbe1xyXG4gICAgICAgICAgICAgICAgc2VnbWVudDogc2VnbWVudHNbMF0sXHJcbiAgICAgICAgICAgICAgICBsaW5lM2RJbmQ6IHNlZ21lbnRzWzBdLnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gPyAoc2VnbWVudHNbMF0ucGxhdGZvcm1EaXJlY3Rpb25UeXBlID09PSBQbGF0Zm9ybURpcmVjdGlvblR5cGUuUmlnaHRGcm9udCA/IDEgOiAwKSA6IDAsXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHN0YXJ0OiB0cnVlLFxyXG4gICAgICAgICAgICB9XTtcclxuICAgICAgICBjb25zdCB1blZpc2l0ZWQgPSBuZXcgU2V0KHNlZ21lbnRzKTtcclxuICAgICAgICBsZXQgaGFuZHJhaWwgPSB7IHJhaWw6IFtdLCBjb2x1bW5zOiBbXSB9O1xyXG4gICAgICAgIHdoaWxlIChjdXJyZW50Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICBsZXQgbmV4dCA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHsgc2VnbWVudDogY3VycmVudFNlZ21lbnQsIGxpbmUzZEluZCwgc3RhcnRQb2ludCwgbGVmdCB9IG9mIGN1cnJlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHsgcGFyYW06IHsgaW5kZXgsIHR5cGUsIHN0YXJ0V2lkdGgsIGVuZFdpZHRoLCBob3Jpem9udGFsU3RlcCwgdmVydGljYWxTdGVwLCB1cHdhcmQgfSwgc3RhcnQsIGVuZCwgc3RhcnRIZWlnaHQsIGVuZEhlaWdodCwgbW9sZFNoYXBlOiB7IHZlcnRpY2VzOiBtb2xkVmVydGljZXMsIHRlbXBMaW5lczogbW9sZFRlbXBMaW5lcywgc3RlcENvdW50IH0sIG5leHRDb21wb25lbnRzLCBiYXNlQ29tcG9uZW50LCBjaXJjbGVUYW5nZW50LCBwbGF0Zm9ybURpcmVjdGlvblR5cGUsIHN0YXJ0TG9ja2VkLCB9ID0gY3VycmVudFNlZ21lbnQ7XHJcbiAgICAgICAgICAgICAgICB1blZpc2l0ZWQuZGVsZXRlKGN1cnJlbnRTZWdtZW50KTtcclxuICAgICAgICAgICAgICAgIGlmICghc3RhcnRMb2NrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiAoKCFzdGFydExvY2tlZCAmJiB0eXBlICE9PSBDb21wb25lbnRUeXBlLkNpcmN1bGFyU3RhaXIpIHx8ICghY2lyY2xlVGFuZ2VudCAmJiB0eXBlID09PSBDb21wb25lbnRUeXBlLkNpcmN1bGFyU3RhaXIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdGVwSGVpZ2h0ID0gdXB3YXJkID8gdmVydGljYWxTdGVwIDogLXZlcnRpY2FsU3RlcDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9mZnNldExlbmd0aCA9IE1hdGgubWF4KGNvbHVtblBhcmFtLmhlaWdodCB8fCAwLCBjb2x1bW5QYXJhbS53aWR0aCB8fCAwLCBjb2x1bW5QYXJhbS5yYWRpdXMgfHwgMCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYmFzZUxpbmUzZERpciA9IChiYXNlQ29tcG9uZW50ID09PSBudWxsIHx8IGJhc2VDb21wb25lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJhc2VDb21wb25lbnQubGluZTNkKSA/IGJhc2VDb21wb25lbnQubGluZTNkLmVuZC5zdWJ0cmFjdGVkKGJhc2VDb21wb25lbnQubGluZTNkLnN0YXJ0KS5ub3JtYWxpemVkKCkgOiBEaXJlY3Rpb25YO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZyb250RGlyID0gY2lyY2xlVGFuZ2VudCA/IGNpcmNsZVRhbmdlbnQgOiBlbmQuc3VidHJhY3RlZChzdGFydCkubm9ybWFsaXplZCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYW5nbGUgPSBiYXNlTGluZTNkRGlyID8gZnJvbnREaXIuYW5nbGUoYmFzZUxpbmUzZERpcikgOiBNYXRoLlBJIC8gMjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRlbHRhQW5nbGUgPSBNYXRoLmFicyhhbmdsZSAtIE1hdGguUEkgLyAyKTtcclxuICAgICAgICAgICAgICAgIGlmIChkZWx0YUFuZ2xlIDw9IERpcmVjdGlvbkFuZ2xlVG9sZXJhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnJvbnREaXIgPSBiYXNlTGluZTNkRGlyLmNyb3NzKERpcmVjdGlvblopLm5vcm1hbGl6ZWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBsZWZ0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhmcm9udERpcik7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3AgPSBzdGFydC5hZGRlZChsZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIgKiAobGVmdCA/IDEgOiAtMSkpKTtcclxuICAgICAgICAgICAgICAgIGxldCBlcCA9IGVuZC5hZGRlZChsZWZ0RGlyLm11bHRpcGxpZWQoZW5kV2lkdGggLyAyICogKGxlZnQgPyAxIDogLTEpKSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGFzdExlbmd0aCA9IHNwLmRpc3RhbmNlVG8oZXApO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNwVG9FcERpciA9IGVwLnN1YnRyYWN0ZWQoc3ApLm5vcm1hbGl6ZWQoKTtcclxuICAgICAgICAgICAgICAgIGxldCBuZXh0U3RhcnRQb2ludCA9IGxlZnQgPyBzcCA6IGVwO1xyXG4gICAgICAgICAgICAgICAgbGV0IHB1c2hFbmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYmFzZVNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleChzZWdtZW50cywgYmFzZUNvbXBvbmVudCA9PT0gbnVsbCB8fCBiYXNlQ29tcG9uZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBiYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcclxuICAgICAgICAgICAgICAgIGxldCBzaWJsaW5nU2VnbWVudEluZHMgPSBiYXNlU2VnbWVudCA9PT0gbnVsbCB8fCBiYXNlU2VnbWVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmFzZVNlZ21lbnQubmV4dENvbXBvbmVudHNbKGJhc2VDb21wb25lbnQgPT09IG51bGwgfHwgYmFzZUNvbXBvbmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleCkgfHwgMF07XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV4dFNpYmxpbmdTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgoc2VnbWVudHMsIChfYSA9IFsuLi5zaWJsaW5nU2VnbWVudEluZHMgfHwgW11dKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZmluZChpbmQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZpc2l0ZWRTaWJsaW5nID0gdmlzaXRlZC5nZXQoaW5kKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIXZpc2l0ZWRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc3QgdmlzaXRlZEJhc2VTZWdtZW50ID0gYmFzZVNlZ21lbnQgPyB2aXNpdGVkLmdldChiYXNlU2VnbWVudC5wYXJhbS5pbmRleCkgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGluZTNkRGlyID0gbW9sZFZlcnRpY2VzW21vbGRUZW1wTGluZXNbbGluZTNkSW5kXVsxXV0uc3VidHJhY3RlZChtb2xkVmVydGljZXNbbW9sZFRlbXBMaW5lc1tsaW5lM2RJbmRdWzBdXSkubm9ybWFsaXplZCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG9mZnNldERpciA9IERpcmVjdGlvblouY3Jvc3MobGluZTNkRGlyKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZpc2l0ZWRSZWNvcmQgPSB2aXNpdGVkLmdldChpbmRleCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpbmUzZCA9IG1vbGRUZW1wTGluZXNbbGluZTNkSW5kXTtcclxuICAgICAgICAgICAgICAgICAgICBzcCA9IHN0YXJ0UG9pbnQgfHwgbW9sZFZlcnRpY2VzW2xpbmUzZFswXV07XHJcbiAgICAgICAgICAgICAgICAgICAgZXAgPSBtb2xkVmVydGljZXNbbGluZTNkWzFdXTtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0TGVuZ3RoID0gc3AuZGlzdGFuY2VUbyhlcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3BUb0VwRGlyID0gZXAuc3VidHJhY3RlZChzcCkubm9ybWFsaXplZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRMaW5lM2RJbmQgPSAobGluZTNkSW5kICsgMSkgJSBtb2xkVGVtcExpbmVzLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2aXNpdGVkTGluZTNkSW5kZXhlcyA9IHZpc2l0ZWRSZWNvcmQgPT09IG51bGwgfHwgdmlzaXRlZFJlY29yZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmlzaXRlZFJlY29yZC5saW5lM2RJbmRleGVzO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzRW50cmFuY2UgPSAodmlzaXRlZExpbmUzZEluZGV4ZXMgPT09IG51bGwgfHwgdmlzaXRlZExpbmUzZEluZGV4ZXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZpc2l0ZWRMaW5lM2RJbmRleGVzLmhhcyhsaW5lM2RJbmQpKSAmJiAodmlzaXRlZExpbmUzZEluZGV4ZXMgPT09IG51bGwgfHwgdmlzaXRlZExpbmUzZEluZGV4ZXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZpc2l0ZWRMaW5lM2RJbmRleGVzLmhhcyhuZXh0TGluZTNkSW5kKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzRW50cmFuY2VTZWdtZW50ID0gKGxpbmUzZEluZCA9PT0gMSAmJiBwbGF0Zm9ybURpcmVjdGlvblR5cGUgPT09IFBsYXRmb3JtRGlyZWN0aW9uVHlwZS5SaWdodEZyb250KSB8fCAobGluZTNkSW5kID09PSAwICYmIHBsYXRmb3JtRGlyZWN0aW9uVHlwZSAhPT0gUGxhdGZvcm1EaXJlY3Rpb25UeXBlLlJpZ2h0RnJvbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IG5leHRTZWdtZW50SW5kZXhlcyA9IG5leHRDb21wb25lbnRzW2xpbmUzZEluZF07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5lYXJlc3RTZWdtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbmV4dFNlZ21lbnRJbmRleCBvZiBuZXh0Q29tcG9uZW50c1tsaW5lM2RJbmRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgoc2VnbWVudHMsIG5leHRTZWdtZW50SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFNlZ21lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgc3RhcnQgfSA9IG5leHRTZWdtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZHMgPSBzdGFydC5kaXN0YW5jZVRvKHNwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlID0gc3RhcnQuZGlzdGFuY2VUbyhlcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2aXNpdE5leHRSZWNvcmQgPSB2aXNpdGVkLmdldChuZXh0U2VnbWVudC5wYXJhbS5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0Q29tcG9uZW50U3RhcnRMaW5lM2RJbmQgPSBuZXh0U2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobmV4dFNlZ21lbnQucGxhdGZvcm1EaXJlY3Rpb25UeXBlID09PSBQbGF0Zm9ybURpcmVjdGlvblR5cGUuUmlnaHRGcm9udCA/IDEgOiAwKSA6IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNFcXVhbChkcyArIGRlLCBsYXN0TGVuZ3RoKSAmJiAhKHZpc2l0TmV4dFJlY29yZCA9PT0gbnVsbCB8fCB2aXNpdE5leHRSZWNvcmQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZpc2l0TmV4dFJlY29yZC5yaWdodCkgJiYgISh2aXNpdE5leHRSZWNvcmQgPT09IG51bGwgfHwgdmlzaXROZXh0UmVjb3JkID09PSB2b2lkIDAgPyB2b2lkIDAgOiB2aXNpdE5leHRSZWNvcmQubGluZTNkSW5kZXhlcy5oYXMobmV4dENvbXBvbmVudFN0YXJ0TGluZTNkSW5kKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5lYXJlc3RTZWdtZW50IHx8IG5lYXJlc3RTZWdtZW50LmRpc3RhbmNlID4gZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVhcmVzdFNlZ21lbnQgPSB7IHNlZ21lbnQ6IG5leHRTZWdtZW50LCBkaXN0YW5jZTogZHMgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxhc3REaXN0YW5jZSA9IGxhc3RMZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5lYXJlc3RTZWdtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgbW9sZFNoYXBlOiB7IHZlcnRpY2VzOiBuZWFyZXN0VmVydGljZXMsIHRlbXBMaW5lczogbmVhcmVzdFRlbXBMaW5lcyB9IH0gPSBuZWFyZXN0U2VnbWVudC5zZWdtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZWFyZXN0TGluZTNkSW5kID0gbmVhcmVzdFNlZ21lbnQuc2VnbWVudC5wbGF0Zm9ybURpcmVjdGlvblR5cGUgPT09IFBsYXRmb3JtRGlyZWN0aW9uVHlwZS5SaWdodEZyb250ID8gMSA6IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5lYXJlc3RMaW5lM2QgPSBuZWFyZXN0U2VnbWVudC5zZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gPyBuZWFyZXN0VGVtcExpbmVzW25lYXJlc3RMaW5lM2RJbmRdIDogbmVhcmVzdFRlbXBMaW5lc1swXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmVhcmVzdExpbmUzZERpciA9IG5lYXJlc3RWZXJ0aWNlc1tuZWFyZXN0TGluZTNkWzFdXS5zdWJ0cmFjdGVkKG5lYXJlc3RWZXJ0aWNlc1tuZWFyZXN0TGluZTNkWzBdXSkubm9ybWFsaXplZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcCA9IG5lYXJlc3RTZWdtZW50LnNlZ21lbnQucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSA/IG5lYXJlc3RWZXJ0aWNlc1tuZWFyZXN0TGluZTNkWzFdXSA6IG5lYXJlc3RTZWdtZW50LnNlZ21lbnQuc3RhcnQuYWRkZWQobGluZTNkRGlyLm11bHRpcGxpZWQoLW5lYXJlc3RTZWdtZW50LnNlZ21lbnQucGFyYW0uc3RhcnRXaWR0aCAvIDIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXAgPSBuZWFyZXN0VmVydGljZXNbbmVhcmVzdExpbmUzZFsxXV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwVG9FcERpciA9IGVwLnN1YnRyYWN0ZWQoc3ApLm5vcm1hbGl6ZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwVG9FcERpci5kb3QobmVhcmVzdExpbmUzZERpcikgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0RGlzdGFuY2UgPSBzdGVwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaEVuZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFN0YXJ0UG9pbnQgPSBzcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3REaXN0YW5jZSA9IHNwLmRpc3RhbmNlVG8oZXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFN0YXJ0UG9pbnQgPSBlcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBsYXN0TGVuZ3RoID0gc3AuZGlzdGFuY2VUbyhlcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzRW50cmFuY2UgJiYgaGFzRW50cmFuY2VTZWdtZW50ICYmIGJhc2VTZWdtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgbW9sZFNoYXBlOiB7IHZlcnRpY2VzOiBiYXNlVmVydGljZXMsIHRlbXBMaW5lczogYmFzZVRlbXBMaW5lcyB9IH0gPSBiYXNlU2VnbWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFzZUxpbmUzZCA9IGJhc2VTZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gPyBiYXNlVGVtcExpbmVzWyhiYXNlQ29tcG9uZW50ID09PSBudWxsIHx8IGJhc2VDb21wb25lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJhc2VDb21wb25lbnQubGluZTNkSW5kZXgpIHx8IDBdIDogYmFzZVRlbXBMaW5lc1tiYXNlVGVtcExpbmVzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXNlTGluZTNkRGlyID0gYmFzZVZlcnRpY2VzW2Jhc2VMaW5lM2RbMV1dLnN1YnRyYWN0ZWQoYmFzZVZlcnRpY2VzW2Jhc2VMaW5lM2RbMF1dKS5ub3JtYWxpemVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0U2libGluZ1NlZ21lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5ldmVyIGhhcHBlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRTaWJsaW5nU2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dFNpYmxpbmdTZWdTdGFydExpbmUzZCA9IG5leHRTaWJsaW5nU2VnbWVudC5tb2xkU2hhcGUudGVtcExpbmVzW25leHRTaWJsaW5nU2VnbWVudC5wbGF0Zm9ybURpcmVjdGlvblR5cGUgPT09IFBsYXRmb3JtRGlyZWN0aW9uVHlwZS5SaWdodEZyb250ID8gMSA6IDBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVwID0gbmV4dFNpYmxpbmdTZWdtZW50Lm1vbGRTaGFwZS52ZXJ0aWNlc1tuZXh0U2libGluZ1NlZ1N0YXJ0TGluZTNkWzFdXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVwID0gbmV4dFNpYmxpbmdTZWdtZW50LnN0YXJ0LmFkZGVkKGJhc2VMaW5lM2REaXIubXVsdGlwbGllZCgtbmV4dFNpYmxpbmdTZWdtZW50LnBhcmFtLnN0YXJ0V2lkdGggLyAyKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcCA9IGJhc2VWZXJ0aWNlc1tiYXNlTGluZTNkWzFdXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcFRvRXBEaXIgPSBlcC5zdWJ0cmFjdGVkKHNwKS5ub3JtYWxpemVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcFRvRXBEaXIuZG90KGJhc2VMaW5lM2REaXIpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdERpc3RhbmNlID0gc3RlcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hFbmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTdGFydFBvaW50ID0gc3A7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0RGlzdGFuY2UgPSBzcC5kaXN0YW5jZVRvKGVwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTdGFydFBvaW50ID0gZXA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNFbnRyYW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0RGlzdGFuY2UgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwdXNoRW5kID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwdXNoRW5kID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNwVG9FcERpciA9IGVwLnN1YnRyYWN0ZWQoc3ApLm5vcm1hbGl6ZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBwdXNoIHJhaWxcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBmaXJzdEJvdHRvbVB0ID0gc3AuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkuYWRkZWQob2Zmc2V0RGlyLm11bHRpcGxpZWQob2Zmc2V0TGVuZ3RoKSkuYWRkZWQoc3BUb0VwRGlyLm11bHRpcGxpZWQoc3RhcnRQb2ludCA/IDAgOiBvZmZzZXRMZW5ndGgpKTtcclxuICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5yYWlsLnB1c2goZmlyc3RCb3R0b21QdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHB1c2ggY29sdW1uc1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRGlzdGFuY2UgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICh0ZW1wRGlzdGFuY2UgPCAobGFzdERpc3RhbmNlIC0gc3RlcCAqIENvbHVtblN0ZXBUb2xlcmFuY2UpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvdHRvbVBvaW50ID0gdGVtcERpc3RhbmNlID4gMCA/IHNwLmFkZGVkKHNwVG9FcERpci5tdWx0aXBsaWVkKHRlbXBEaXN0YW5jZSkpLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCkpLmFkZGVkKG9mZnNldERpci5tdWx0aXBsaWVkKG9mZnNldExlbmd0aCkpIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0Qm90dG9tUHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsLmNvbHVtbnMucHVzaChbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b21Qb2ludCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbVBvaW50LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBEaXN0YW5jZSArPSBzdGVwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocHVzaEVuZCAmJiAobmVhcmVzdFNlZ21lbnQgfHwgKGlzRW50cmFuY2UgJiYgbGFzdERpc3RhbmNlID4gMCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHB1c2ggcmFpbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5yYWlsLnB1c2goZXAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0ICsgaGVpZ2h0KSkuYWRkZWQob2Zmc2V0RGlyLm11bHRpcGxpZWQob2Zmc2V0TGVuZ3RoKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGVtcERpc3RhbmNlIC0gc3RlcCA8IGxhc3REaXN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdEJvdHRvbVBvaW50ID0gc3AuYWRkZWQoc3BUb0VwRGlyLm11bHRpcGxpZWQobGFzdERpc3RhbmNlKSkuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkuYWRkZWQob2Zmc2V0RGlyLm11bHRpcGxpZWQob2Zmc2V0TGVuZ3RoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5jb2x1bW5zLnB1c2goW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RCb3R0b21Qb2ludCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0Qm90dG9tUG9pbnQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5lYXJlc3RTZWdtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50OiBuZWFyZXN0U2VnbWVudC5zZWdtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZTNkSW5kOiBuZWFyZXN0U2VnbWVudC5zZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChuZWFyZXN0U2VnbWVudC5zZWdtZW50LnBsYXRmb3JtRGlyZWN0aW9uVHlwZSA9PT0gUGxhdGZvcm1EaXJlY3Rpb25UeXBlLlJpZ2h0RnJvbnQgPyAxIDogMCkgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFBvaW50OiBuZXh0U3RhcnRQb2ludCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNFbnRyYW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhc2VTZWdtZW50ICYmIGhhc0VudHJhbmNlU2VnbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNpYmxpbmdTZWdtZW50SW5kcyA9IGJhc2VTZWdtZW50Lm5leHRDb21wb25lbnRzW2Jhc2VDb21wb25lbnQubGluZTNkSW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0U2libGluZ1NlZ21lbnQgJiYgYmFzZVNlZ21lbnQucGFyYW0udHlwZSAhPT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXZlciBoYXBwZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQ6IG5leHRTaWJsaW5nU2VnbWVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUzZEluZDogbmV4dFNpYmxpbmdTZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChuZXh0U2libGluZ1NlZ21lbnQucGxhdGZvcm1EaXJlY3Rpb25UeXBlID09PSBQbGF0Zm9ybURpcmVjdGlvblR5cGUuUmlnaHRGcm9udCA/IDEgOiAwKSA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0UG9pbnQ6IG5leHRTdGFydFBvaW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmICgodmlzaXRlZEJhc2VTZWdtZW50Py5yaWdodCAmJiAhdmlzaXRlZEJhc2VTZWdtZW50LmxlZnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50OiBiYXNlU2VnbWVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUzZEluZDogYmFzZVNlZ21lbnQucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSA/IChiYXNlQ29tcG9uZW50ID09PSBudWxsIHx8IGJhc2VDb21wb25lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJhc2VDb21wb25lbnQubGluZTNkSW5kZXgpIHx8IDAgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0UG9pbnQ6IG5leHRTdGFydFBvaW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVuZCBvZiB0aGlzIHBhdGNoLCB0aGUgcGF0Y2ggYXJlIHN0YXJ0IHdpdGggcGxhdGZvcm1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbHMucHVzaChoYW5kcmFpbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWwgPSB7IHJhaWw6IFtdLCBjb2x1bW5zOiBbXSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZW5kIG9mIHRoaXMgbGluZTNkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQ6IGN1cnJlbnRTZWdtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUzZEluZDogbmV4dExpbmUzZEluZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aXNpdGVkTGluZTNkSW5kZXhlcyA9PT0gbnVsbCB8fCB2aXNpdGVkTGluZTNkSW5kZXhlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmlzaXRlZExpbmUzZEluZGV4ZXMuYWRkKGxpbmUzZEluZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhaXJSYWlsID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhaXJDb2x1bW5zID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc3AgPSBzdGFydC5hZGRlZChsZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIgKiAobGVmdCA/IDEgOiAtMSkpKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBlcCA9IGVuZC5hZGRlZChsZWZ0RGlyLm11bHRpcGxpZWQoZW5kV2lkdGggLyAyICogKGxlZnQgPyAxIDogLTEpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dFN0YXJ0UG9pbnQgPSBsZWZ0ID8gc3AgOiBlcDtcclxuICAgICAgICAgICAgICAgICAgICAvLyBuZXh0IHNlZ21lbnQgc3RhcnRXaWR0aCAhPT0gY3VycmVudFNlZ21lbnQgZW5kV2lkdGhcclxuICAgICAgICAgICAgICAgICAgICBwdXNoRW5kID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgcmVhc29uYWJsZVN0ZXAgPSBNYXRoLmNlaWwoc3RlcCAvIGhvcml6b250YWxTdGVwKSAqIGhvcml6b250YWxTdGVwO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlYXNvbmFibGVTdGVwQ291bnQgPSBNYXRoLmNlaWwoc3RlcCAvIGhvcml6b250YWxTdGVwKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcFN0ZXBDb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpciB8fCAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5DaXJjdWxhclN0YWlyICYmICFjaXJjbGVUYW5nZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0TGVuZ3RoID0gc3AuZGlzdGFuY2VUbyhlcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHB1c2ggcmFpbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAoZGVsdGFBbmdsZSA+IERpcmVjdGlvbkFuZ2xlVG9sZXJhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBjb25zdCBjb3JuZXJCb3R0b21QdCA9IHNwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCkpLmFkZGVkKGJhc2VMaW5lM2REaXIubXVsdGlwbGllZCgoc3RhcnRXaWR0aCAvIDIgLSBvZmZzZXRMZW5ndGgpICogKGxlZnQgPyAxIDogLTEpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBzdGFpclJhaWwucHVzaChjb3JuZXJCb3R0b21QdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgc3RhaXJDb2x1bW5zLnB1c2goW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNvcm5lckJvdHRvbVB0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNvcm5lckJvdHRvbVB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyUmFpbC5wdXNoKHNwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIGhlaWdodCArICh1cHdhcmQgPyAxIDogMCkgKiBzdGVwSGVpZ2h0KSkuYWRkZWQobGVmdERpci5tdWx0aXBsaWVkKG9mZnNldExlbmd0aCkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF1cHdhcmQgJiYgc3RlcENvdW50ID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJSYWlsLnB1c2goc3AuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0ICsgaGVpZ2h0KSkuYWRkZWQoZnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpLmFkZGVkKGxlZnREaXIubXVsdGlwbGllZChvZmZzZXRMZW5ndGgpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHVzaCBjb2x1bW5zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxldCB0ZW1wRGlzdGFuY2UgPSBob3Jpem9udGFsU3RlcCAvIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0ZW1wU3RlcENvdW50IDwgc3RlcENvdW50IC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VySG9yU3RlcERpc3RhbmNlID0gKHRlbXBTdGVwQ291bnQgKyAwLjUpICogaG9yaXpvbnRhbFN0ZXA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJWZXJTdGVwRGlzdGFuY2UgPSAodGVtcFN0ZXBDb3VudCArICh1cHdhcmQgPyAxIDogMCkpICogc3RlcEhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvdHRvbVBvaW50ID0gc3AuYWRkZWQoZnJvbnREaXIubXVsdGlwbGllZChjdXJIb3JTdGVwRGlzdGFuY2UpKS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBjdXJWZXJTdGVwRGlzdGFuY2UpKS5hZGRlZChsZWZ0RGlyLm11bHRpcGxpZWQobGVmdCA/IC1vZmZzZXRMZW5ndGggOiBvZmZzZXRMZW5ndGgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyQ29sdW1ucy5wdXNoKFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b21Qb2ludCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b21Qb2ludC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHRlbXBTdGVwQ291bnQgPSBNYXRoLmZsb29yKHRlbXBEaXN0YW5jZSAvIGhvcml6b250YWxTdGVwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRlbXBEaXN0YW5jZSArPSByZWFzb25hYmxlU3RlcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBTdGVwQ291bnQgKz0gcmVhc29uYWJsZVN0ZXBDb3VudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RlcENvdW50ID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJSYWlsLnB1c2goc3AuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0ICsgaGVpZ2h0ICsgKHVwd2FyZCA/IHN0ZXBDb3VudCA6IChzdGVwQ291bnQgLSAoc3RlcENvdW50ID4gMiA/IDIgOiAxKSkpICogc3RlcEhlaWdodCkpLmFkZGVkKGZyb250RGlyLm11bHRpcGxpZWQoKHN0ZXBDb3VudCAtIDEpICogaG9yaXpvbnRhbFN0ZXApKS5hZGRlZChsZWZ0RGlyLm11bHRpcGxpZWQob2Zmc2V0TGVuZ3RoKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKHVwd2FyZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFpclJhaWwucHVzaChlcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoZW5kSGVpZ2h0ICsgaGVpZ2h0ICsgKHVwd2FyZCA/IDAgOiAtKHN0ZXBDb3VudCA+IDIgPyAyIDogMSkgKiBzdGVwSGVpZ2h0KSkpLmFkZGVkKGxlZnREaXIubXVsdGlwbGllZChvZmZzZXRMZW5ndGgpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZW1wU3RlcENvdW50IC0gcmVhc29uYWJsZVN0ZXBDb3VudCA8PSBzdGVwQ291bnQgLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcmV2VG90YWxTdGVwTGVuZ3RoID0gKHN0ZXBDb3VudCAtIDEpICogaG9yaXpvbnRhbFN0ZXA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0U3RlcExlbmd0aCA9IGxhc3RMZW5ndGggLSBwcmV2VG90YWxTdGVwTGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdEJvdHRvbVBvaW50ID0gc3AuYWRkZWQoZnJvbnREaXIubXVsdGlwbGllZChwcmV2VG90YWxTdGVwTGVuZ3RoICsgbGFzdFN0ZXBMZW5ndGggLyAyKSkuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGVuZEhlaWdodCArICh1cHdhcmQgPyAwIDogLXN0ZXBIZWlnaHQpKSkuYWRkZWQobGVmdERpci5tdWx0aXBsaWVkKGxlZnQgPyBvZmZzZXRMZW5ndGggOiAtb2Zmc2V0TGVuZ3RoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpckNvbHVtbnMucHVzaChbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdEJvdHRvbVBvaW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RCb3R0b21Qb2ludC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXh0IHNlZ21lbnQgc3RhcnRXaWR0aCAhPT0gY3VycmVudFNlZ21lbnQgZW5kV2lkdGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3AgPSBsZWZ0ID8gc3RhcnQuYWRkZWQoYmFzZUxpbmUzZERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSkgOiBlcDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY2lyY2xlVGFuZ2VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0YW5nZW50TGVmdERpciA9IERpcmVjdGlvblouY3Jvc3MoY2lyY2xlVGFuZ2VudCkubm9ybWFsaXplZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFydEVuZERpciA9IGVuZC5zdWJ0cmFjdGVkKHN0YXJ0KS5ub3JtYWxpemVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0RW5kRGlzdGFuY2UgPSBzdGFydC5kaXN0YW5jZVRvKGVuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1heFdpZHRoID0gTWF0aC5tYXgoc3RhcnRXaWR0aCwgZW5kV2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbmRBbmdsZSA9IHN0YXJ0RW5kRGlyLmFuZ2xlVG8oY2lyY2xlVGFuZ2VudCwgRGlyZWN0aW9uWik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzTGVmdEFyYyA9IGVuZEFuZ2xlID4gTWF0aC5QSTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZW5kQ29tcGxlbWVudGFyeUFuZ2xlID0gaXNMZWZ0QXJjID8gTWF0aC5hYnMoZW5kQW5nbGUgLSBNYXRoLlBJIC8gMiAtIE1hdGguUEkpIDogTWF0aC5hYnMoZW5kQW5nbGUgLSBNYXRoLlBJIC8gMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhbGZDaG9yZCA9IHN0YXJ0RW5kRGlzdGFuY2UgLyAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByYWRpdXMgPSBoYWxmQ2hvcmQgLyBNYXRoLmNvcyhlbmRDb21wbGVtZW50YXJ5QW5nbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbm5lclJhZGl1cyA9IHJhZGl1cyAtIG1heFdpZHRoIC8gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKHJhZGl1cyA8IG1heFdpZHRoIC8gMiAqIDEuMiB8fCBpbm5lclJhZGl1cyA8IGhvcml6b250YWxTdGVwIC8gMiAvIDAuOCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhvcml6b250YWxTdGVwQW5nbGUgPSBNYXRoLmFzaW4oaG9yaXpvbnRhbFN0ZXAgLyAyIC8gaW5uZXJSYWRpdXMpICogMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2lyY2xlTm9ybWFsID0gaXNMZWZ0QXJjID8gRGlyZWN0aW9uWiA6IERpcmVjdGlvbloucmV2ZXJzZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2lyY2xlQ2VudGVyID0gc3RhcnQuYWRkZWQodGFuZ2VudExlZnREaXIubXVsdGlwbGllZChpc0xlZnRBcmMgPyByYWRpdXMgOiAtcmFkaXVzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IGNpcmNsZSA9IEdlb21MaWIuY3JlYXRlQ2lyY2xlM2RCeUNlbnRlck5vcm1hbFJhZGl1cyhjaXJjbGVDZW50ZXIsIGNpcmNsZU5vcm1hbCwgcmFkaXVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJjID0gR2VvbUxpYi5jcmVhdGVBcmMzZEJ5Q2VudGVyTm9ybWFsUmFkaXVzKGNpcmNsZUNlbnRlciwgY2lyY2xlTm9ybWFsLCByYWRpdXMsIHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhcmNBbmdsZSA9IGFyYy5hcmNBbmdsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3Qgc3RlcENvdW50ID0gTWF0aC5jZWlsKGFyY0FuZ2xlIC8gaG9yaXpvbnRhbFN0ZXBBbmdsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RIb3Jpem9udGFsQW5nbGUgPSBhcmNBbmdsZSAtIGhvcml6b250YWxTdGVwQW5nbGUgKiAoc3RlcENvdW50IC0gMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHZhbGlkU3RlcENvdW50ID0gKGxhc3RIb3Jpem9udGFsQW5nbGUgPT09IDAgfHwgbGFzdEhvcml6b250YWxBbmdsZSA+IEFuZ2xlVG9sZXJhbmNlKSA/IHN0ZXBDb3VudCA6IHN0ZXBDb3VudCAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIChob3Jpem9udGFsU3RlcEFuZ2xlID49IGFyY0FuZ2xlIHx8IGhvcml6b250YWxTdGVwQW5nbGUgPj0gTWF0aC5QSSAvIDIgfHwgdmFsaWRTdGVwQ291bnQgPj0gU3RlcENvdW50TGltaXQgfHwgdmFsaWRTdGVwQ291bnQgPCAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRSYWRpdXNEaXIgPSBpc0xlZnRBcmMgPyB0YW5nZW50TGVmdERpci5yZXZlcnNlZCgpIDogdGFuZ2VudExlZnREaXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIChkZWx0YUFuZ2xlID4gRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGNvbnN0IGNvcm5lckJvdHRvbVB0ID0gc3AuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkuYWRkZWQoYmFzZUxpbmUzZERpci5tdWx0aXBsaWVkKChzdGFydFdpZHRoIC8gMiAtIG9mZnNldExlbmd0aCkgKiAobGVmdCA/IDEgOiAtMSkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHN0YWlyUmFpbC5wdXNoKGNvcm5lckJvdHRvbVB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBzdGFpckNvbHVtbnMucHVzaChbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgY29ybmVyQm90dG9tUHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgY29ybmVyQm90dG9tUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHVzaCBjb2x1bW5zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0ZW1wU3RlcENvdW50IDwgc3RlcENvdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJSb3RhdGVBbmdsZSA9IGhvcml6b250YWxTdGVwQW5nbGUgKiB0ZW1wU3RlcENvdW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dFJvdGF0ZUFuZ2xlID0gaG9yaXpvbnRhbFN0ZXBBbmdsZSAqIHRlbXBTdGVwQ291bnQgKyAodGVtcFN0ZXBDb3VudCA9PT0gc3RlcENvdW50IC0gMSA/IGxhc3RIb3Jpem9udGFsQW5nbGUgOiBob3Jpem9udGFsU3RlcEFuZ2xlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1clJvdGF0ZU1hdHJpeCA9IEdlb21MaWIuY3JlYXRlUm90YXRlTWF0cml4NChob3Jpem9udGFsU3RlcEFuZ2xlICogdGVtcFN0ZXBDb3VudCwgY2lyY2xlTm9ybWFsLCBkdW1teVBvaW50M2QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dFJvdGF0ZU1hdHJpeCA9IEdlb21MaWIuY3JlYXRlUm90YXRlTWF0cml4NChuZXh0Um90YXRlQW5nbGUsIGNpcmNsZU5vcm1hbCwgZHVtbXlQb2ludDNkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1clJhZGl1c0RpciA9IHN0YXJ0UmFkaXVzRGlyLmFwcGxpZWRNYXRyaXg0KGN1clJvdGF0ZU1hdHJpeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0UmFkaXVzRGlyID0gc3RhcnRSYWRpdXNEaXIuYXBwbGllZE1hdHJpeDQobmV4dFJvdGF0ZU1hdHJpeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJIYWxmV2lkdGggPSAoc3RhcnRXaWR0aCArIChlbmRXaWR0aCAtIHN0YXJ0V2lkdGgpICogKGN1clJvdGF0ZUFuZ2xlKSAvIGFyY0FuZ2xlKSAvIDIgKiAoaXNMZWZ0QXJjID8gLTEgOiAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRIYWxmV2lkdGggPSAoc3RhcnRXaWR0aCArIChlbmRXaWR0aCAtIHN0YXJ0V2lkdGgpICogKG5leHRSb3RhdGVBbmdsZSkgLyBhcmNBbmdsZSkgLyAyICogKGlzTGVmdEFyYyA/IC0xIDogMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJMZWZ0TW9sZFB0ID0gY2lyY2xlQ2VudGVyLmFkZGVkKGN1clJhZGl1c0Rpci5tdWx0aXBsaWVkKHJhZGl1cyArIGN1ckhhbGZXaWR0aCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyUmlnaHRNb2xkUHQgPSBjaXJjbGVDZW50ZXIuYWRkZWQoY3VyUmFkaXVzRGlyLm11bHRpcGxpZWQocmFkaXVzIC0gY3VySGFsZldpZHRoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0TGVmdE1vbGRQdCA9IGNpcmNsZUNlbnRlci5hZGRlZChuZXh0UmFkaXVzRGlyLm11bHRpcGxpZWQocmFkaXVzICsgbmV4dEhhbGZXaWR0aCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dFJpZ2h0TW9sZFB0ID0gY2lyY2xlQ2VudGVyLmFkZGVkKG5leHRSYWRpdXNEaXIubXVsdGlwbGllZChyYWRpdXMgLSBuZXh0SGFsZldpZHRoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJTdGVwTGVmdEZyb250RGlyID0gbmV4dExlZnRNb2xkUHQuc3VidHJhY3RlZChjdXJMZWZ0TW9sZFB0KS5tdWx0aXBsaWVkKDAuNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJTdGVwUmlnaHRGcm9udERpciA9IG5leHRSaWdodE1vbGRQdC5zdWJ0cmFjdGVkKGN1clJpZ2h0TW9sZFB0KS5tdWx0aXBsaWVkKDAuNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJTdGVwTGVmdERpciA9IERpcmVjdGlvblouY3Jvc3MoY3VyU3RlcExlZnRGcm9udERpcikubm9ybWFsaXplZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyU3RlcFJpZ2h0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhjdXJTdGVwUmlnaHRGcm9udERpcikubm9ybWFsaXplZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyTGVmdEJvdHRvbVB0ID0gY3VyTGVmdE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyAodGVtcFN0ZXBDb3VudCArICh1cHdhcmQgPyAxIDogMCkpICogc3RlcEhlaWdodCkpLmFkZGVkKGN1clN0ZXBMZWZ0RGlyLm11bHRpcGxpZWQoLW9mZnNldExlbmd0aCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyUmlnaHRCb3R0b21QdCA9IGN1clJpZ2h0TW9sZFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArICh0ZW1wU3RlcENvdW50ICsgKHVwd2FyZCA/IDEgOiAwKSkgKiBzdGVwSGVpZ2h0KSkuYWRkZWQoY3VyU3RlcFJpZ2h0RGlyLm11bHRpcGxpZWQob2Zmc2V0TGVuZ3RoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJMZWZ0Qm90dG9tTWlkUHQgPSBjdXJMZWZ0Qm90dG9tUHQuYWRkZWQoY3VyU3RlcExlZnRGcm9udERpcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJSaWdodEJvdHRvbU1pZFB0ID0gY3VyUmlnaHRCb3R0b21QdC5hZGRlZChjdXJTdGVwUmlnaHRGcm9udERpcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBib3R0b21Qb2ludCA9IHNwLmFkZGVkKGZyb250RGlyLm11bHRpcGxpZWQodGVtcERpc3RhbmNlKSkuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGVtcFN0ZXBDb3VudCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHVzaCByYWlsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3RhaXJSYWlsLnB1c2goc3AuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0ICsgaGVpZ2h0ICsgKHVwd2FyZCA/IDEgOiAwKSAqIHN0ZXBIZWlnaHQpKS5hZGRlZChsZWZ0RGlyLm11bHRpcGxpZWQob2Zmc2V0TGVuZ3RoKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyUmFpbC5wdXNoKGN1ckxlZnRCb3R0b21QdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0ICsgKHRlbXBTdGVwQ291bnQgPiAwICYmICF1cHdhcmQgPyAtc3RlcEhlaWdodCA6IDApKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAoIXVwd2FyZCAmJiB0ZW1wU3RlcENvdW50ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBjb25zdCBuZXh0TGVmdEJvdHRvbVB0ID0gbmV4dExlZnRNb2xkUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0ICsgKHRlbXBTdGVwQ291bnQgKyAodXB3YXJkID8gMSA6IDApKSAqIHN0ZXBIZWlnaHQpKS5hZGRlZChjdXJTdGVwTGVmdERpci5tdWx0aXBsaWVkKC1vZmZzZXRMZW5ndGgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHN0YWlyUmFpbC5wdXNoKG5leHRMZWZ0Qm90dG9tUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJSYWlsLnB1c2goY3VyUmlnaHRCb3R0b21QdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0ICsgKHRlbXBTdGVwQ291bnQgPiAwICYmICF1cHdhcmQgPyAtc3RlcEhlaWdodCA6IDApKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAoIXVwd2FyZCAmJiB0ZW1wU3RlcENvdW50ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBjb25zdCBuZXh0UmlnaHRCb3R0b21QdCA9IG5leHRSaWdodE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyAodGVtcFN0ZXBDb3VudCArICh1cHdhcmQgPyAxIDogMCkpICogc3RlcEhlaWdodCkpLmFkZGVkKGN1clN0ZXBSaWdodERpci5tdWx0aXBsaWVkKG9mZnNldExlbmd0aCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgc3RhaXJSYWlsLnB1c2gobmV4dFJpZ2h0Qm90dG9tUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGVtcFN0ZXBDb3VudCA9PT0gc3RlcENvdW50IC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGVmdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3RhaXJSYWlsLnB1c2goY3VyTGVmdEJvdHRvbU1pZFB0LmFkZGVkKGN1clN0ZXBMZWZ0RnJvbnREaXIucmV2ZXJzZWQoKSkuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyUmFpbC5wdXNoKGN1ckxlZnRCb3R0b21NaWRQdC5hZGRlZChjdXJTdGVwTGVmdEZyb250RGlyKS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0ICsgKHVwd2FyZCA/IDAgOiAtc3RlcEhlaWdodCkpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzdGFpclJhaWwucHVzaChjdXJSaWdodEJvdHRvbU1pZFB0LmFkZGVkKGN1clN0ZXBSaWdodEZyb250RGlyLnJldmVyc2VkKCkpLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpclJhaWwucHVzaChjdXJSaWdodEJvdHRvbU1pZFB0LmFkZGVkKGN1clN0ZXBSaWdodEZyb250RGlyKS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0ICsgKHVwd2FyZCA/IDAgOiAtc3RlcEhlaWdodCkpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXh0U3RhcnRQb2ludCA9IGN1clJpZ2h0TW9sZFB0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZW1wU3RlcENvdW50ICUgcmVhc29uYWJsZVN0ZXBDb3VudCAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJDb2x1bW5zLnB1c2goW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQgPyBjdXJMZWZ0Qm90dG9tTWlkUHQgOiBjdXJSaWdodEJvdHRvbU1pZFB0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChsZWZ0ID8gY3VyTGVmdEJvdHRvbU1pZFB0IDogY3VyUmlnaHRCb3R0b21NaWRQdCkuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBzZWdtZW50IHN0YXJ0V2lkdGggIT09IGN1cnJlbnRTZWdtZW50IGVuZFdpZHRoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwID0gbGVmdCA/IHN0YXJ0LmFkZGVkKGJhc2VMaW5lM2REaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpIDogY3VyUmlnaHRNb2xkUHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnREaXIgPSBjdXJTdGVwTGVmdERpcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGVtcFN0ZXBDb3VudCAlIHJlYXNvbmFibGVTdGVwQ291bnQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpckNvbHVtbnMucHVzaChbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQgPyBjdXJMZWZ0Qm90dG9tTWlkUHQgOiBjdXJSaWdodEJvdHRvbU1pZFB0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobGVmdCA/IGN1ckxlZnRCb3R0b21NaWRQdCA6IGN1clJpZ2h0Qm90dG9tTWlkUHQpLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBTdGVwQ291bnQgKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAobGVmdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5yYWlsLnB1c2goLi4uc3RhaXJSYWlsLnJldmVyc2UoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsLmNvbHVtbnMucHVzaCguLi5zdGFpckNvbHVtbnMucmV2ZXJzZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsLnJhaWwucHVzaCguLi5zdGFpclJhaWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5jb2x1bW5zLnB1c2goLi4uc3RhaXJDb2x1bW5zKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YWlyTmV4dFNlZ21lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBuZXh0U2VnbWVudEluZGV4IG9mIG5leHRDb21wb25lbnRzW2xpbmUzZEluZF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dFNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleChzZWdtZW50cywgbmV4dFNlZ21lbnRJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0U2VnbWVudCAmJiAhdmlzaXRlZC5nZXQobmV4dFNlZ21lbnQucGFyYW0uaW5kZXgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpck5leHRTZWdtZW50ID0gbmV4dFNlZ21lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxlZnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhc2VTZWdtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFNpYmxpbmdTZWdtZW50ICYmIGJhc2VTZWdtZW50LnBhcmFtLnR5cGUgIT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXZlciBoYXBwZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50OiBuZXh0U2libGluZ1NlZ21lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUzZEluZDogbmV4dFNpYmxpbmdTZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG5leHRTaWJsaW5nU2VnbWVudC5wbGF0Zm9ybURpcmVjdGlvblR5cGUgPT09IFBsYXRmb3JtRGlyZWN0aW9uVHlwZS5SaWdodEZyb250ID8gMSA6IDApIDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRQb2ludDogbmV4dFN0YXJ0UG9pbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IG1vbGRTaGFwZTogeyB2ZXJ0aWNlczogYmFzZVZlcnRpY2VzLCB0ZW1wTGluZXM6IGJhc2VUZW1wTGluZXMgfSB9ID0gYmFzZVNlZ21lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFzZUxpbmUzZCA9IGJhc2VTZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gPyBiYXNlVGVtcExpbmVzWyhiYXNlQ29tcG9uZW50ID09PSBudWxsIHx8IGJhc2VDb21wb25lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJhc2VDb21wb25lbnQubGluZTNkSW5kZXgpIHx8IDBdIDogYmFzZVRlbXBMaW5lc1tiYXNlVGVtcExpbmVzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VMaW5lM2REaXIgPSBiYXNlVmVydGljZXNbYmFzZUxpbmUzZFsxXV0uc3VidHJhY3RlZChiYXNlVmVydGljZXNbYmFzZUxpbmUzZFswXV0pLm5vcm1hbGl6ZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcCA9IGJhc2VWZXJ0aWNlc1tiYXNlTGluZTNkWzFdXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcFRvRXBEaXIgPSBlcC5zdWJ0cmFjdGVkKHNwKS5ub3JtYWxpemVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwVG9FcERpci5kb3QoYmFzZUxpbmUzZERpcikgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTdGFydFBvaW50ID0gc3A7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoRW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFN0YXJ0UG9pbnQgPSBlcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGJhc2VTZWdtZW50ICYmICh2aXNpdGVkQmFzZVNlZ21lbnQ/LnJpZ2h0ICYmICF2aXNpdGVkQmFzZVNlZ21lbnQubGVmdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50OiBiYXNlU2VnbWVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZTNkSW5kOiBiYXNlU2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtID8gKGJhc2VDb21wb25lbnQgPT09IG51bGwgfHwgYmFzZUNvbXBvbmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleCkgfHwgMCA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRQb2ludDogbmV4dFN0YXJ0UG9pbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBlbmQgdGhlIHBhdGNoIHdoaWNoIGlzIHN0YXJ0IHdpdGggY3VycmVudFNlZ21lbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlscy5wdXNoKGhhbmRyYWlsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsID0geyByYWlsOiBbXSwgY29sdW1uczogW10gfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmlzaXRlZFJlY29yZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlzaXRlZFJlY29yZC5sZWZ0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YWlyTmV4dFNlZ21lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgbW9sZFNoYXBlOiB7IHZlcnRpY2VzOiBzdGFpck5leHRWZXJ0aWNlcywgdGVtcExpbmVzOiBzdGFpck5leHRUZW1wTGluZXMgfSB9ID0gc3RhaXJOZXh0U2VnbWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YWlyTmV4dExpbmUzZEluZCA9IHN0YWlyTmV4dFNlZ21lbnQucGxhdGZvcm1EaXJlY3Rpb25UeXBlID09PSBQbGF0Zm9ybURpcmVjdGlvblR5cGUuUmlnaHRGcm9udCA/IDEgOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhaXJOZXh0TGluZTNkID0gc3RhaXJOZXh0U2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtID8gc3RhaXJOZXh0VGVtcExpbmVzW3N0YWlyTmV4dExpbmUzZEluZF0gOiBzdGFpck5leHRUZW1wTGluZXNbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFpck5leHRMaW5lM2REaXIgPSBzdGFpck5leHRWZXJ0aWNlc1tzdGFpck5leHRMaW5lM2RbMV1dLnN1YnRyYWN0ZWQoc3RhaXJOZXh0VmVydGljZXNbc3RhaXJOZXh0TGluZTNkWzBdXSkubm9ybWFsaXplZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXAgPSBzdGFpck5leHRTZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gPyBzdGFpck5leHRWZXJ0aWNlc1tzdGFpck5leHRMaW5lM2RbMV1dIDogc3RhaXJOZXh0U2VnbWVudC5zdGFydC5hZGRlZChsZWZ0RGlyLm11bHRpcGxpZWQoLXN0YWlyTmV4dFNlZ21lbnQucGFyYW0uc3RhcnRXaWR0aCAvIDIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwVG9FcERpciA9IGVwLnN1YnRyYWN0ZWQoc3ApLm5vcm1hbGl6ZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcFRvRXBEaXIuZG90KHN0YWlyTmV4dExpbmUzZERpcikgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFN0YXJ0UG9pbnQgPSBzcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hFbmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTdGFydFBvaW50ID0gZXA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQ6IHN0YWlyTmV4dFNlZ21lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZTNkSW5kOiBzdGFpck5leHRTZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoc3RhaXJOZXh0U2VnbWVudC5wbGF0Zm9ybURpcmVjdGlvblR5cGUgPT09IFBsYXRmb3JtRGlyZWN0aW9uVHlwZS5SaWdodEZyb250ID8gMSA6IDApIDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRQb2ludDogbmV4dFN0YXJ0UG9pbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudDogY3VycmVudFNlZ21lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZTNkSW5kOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN0YXJ0UG9pbnQ6IG5leHRTdGFydFBvaW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBlbmQgdGhlIHBhdGNoIHdoaWNoIGlzIGVuZCB3aXRoIHN0YWlyIGNvbXBvbmVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWxzLnB1c2goaGFuZHJhaWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWwgPSB7IHJhaWw6IFtdLCBjb2x1bW5zOiBbXSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2aXNpdGVkUmVjb3JkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNpdGVkUmVjb3JkLnJpZ2h0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocHVzaEVuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcE1pc0Rpc3RhbmNlID0gc3RlcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWlzcGxhY2VtZW50RGlzdGFuY2UgPSBzcC5kaXN0YW5jZVRvKGVwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BUb0VwRGlyID0gZXAuc3VidHJhY3RlZChzcCkubm9ybWFsaXplZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKHNwVG9FcERpcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0ZW1wTWlzRGlzdGFuY2UgPCBtaXNwbGFjZW1lbnREaXN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYm90dG9tUG9pbnQgPSBzcC5hZGRlZChzcFRvRXBEaXIubXVsdGlwbGllZCh0ZW1wTWlzRGlzdGFuY2UpKS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQobGVmdCA/IGVuZEhlaWdodCA6IHN0YXJ0SGVpZ2h0KSkuYWRkZWQob2Zmc2V0RGlyLm11bHRpcGxpZWQob2Zmc2V0TGVuZ3RoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5jb2x1bW5zLnB1c2goW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbVBvaW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbVBvaW50LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcE1pc0Rpc3RhbmNlICs9IHN0ZXA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRlbXBNaXNEaXN0YW5jZSAtIHN0ZXAgPCBtaXNwbGFjZW1lbnREaXN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHVzaCByYWlsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0Qm90dG9tUG9pbnQgPSBlcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKS5hZGRlZChvZmZzZXREaXIubXVsdGlwbGllZChvZmZzZXRMZW5ndGgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IGxhc3RCb3R0b21Qb2ludCA9IGVwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChsZWZ0ID8gZW5kSGVpZ2h0IDogc3RhcnRIZWlnaHQpKS5hZGRlZChvZmZzZXREaXIubXVsdGlwbGllZChvZmZzZXRMZW5ndGgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsLnJhaWwucHVzaChsYXN0Qm90dG9tUG9pbnQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsLmNvbHVtbnMucHVzaChbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdEJvdHRvbVBvaW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RCb3R0b21Qb2ludC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjdXJyZW50ID0gbmV4dDtcclxuICAgICAgICAgICAgaWYgKCFjdXJyZW50Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVuVmlzaXRlZC5zaXplKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlU2VnbWVudCA9IFsuLi51blZpc2l0ZWQudmFsdWVzKCldWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudDogdGhlU2VnbWVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUzZEluZDogdGhlU2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtID8gKHRoZVNlZ21lbnQucGxhdGZvcm1EaXJlY3Rpb25UeXBlID09PSBQbGF0Zm9ybURpcmVjdGlvblR5cGUuUmlnaHRGcm9udCA/IDEgOiAwKSA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaGFuZHJhaWxzO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGdlbmVyYXRlVGVtcExpbmVzTG9vcCh2ZXJ0ZXhDb3VudCkge1xyXG4gICAgcmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IHZlcnRleENvdW50IH0pLm1hcCgoXywgaSkgPT4gW2ksIGkgPT09IHZlcnRleENvdW50IC0gMSA/IDAgOiBpICsgMV0pO1xyXG59XHJcbiIsImV4cG9ydCBjb25zdCBTdGFpck1vZGVsS2V5ID0gJ0RyYXdTdGFpcnNNb2RlbCc7XHJcbmV4cG9ydCBjb25zdCBTdGFpck1vZGVsVmFsdWUgPSAnMSc7XHJcbmV4cG9ydCBjb25zdCBIYW5kcmFpbE1vZGVsS2V5ID0gJ0hhbmRyYWlsJztcclxuLy8gZXhwb3J0IGNvbnN0IFN0YWlyS2V5ID0gJ0RTU3RhaXInO1xyXG4vLyBleHBvcnQgY29uc3QgUGxhdGZvcm1LZXkgPSAnRFNQbGF0Zm9ybSc7XHJcbmV4cG9ydCBjb25zdCBQYXJhbUtleSA9ICdEU1BhcmFtJztcclxuLy8gc3RhcnRIZWlnaHQgYW5kIGVuZEhlaWdodCBjYWNoZWQgaW4gc3RhcnQgYW5kIGVuZFxyXG5leHBvcnQgY29uc3QgQ29tcG9uZW50SW5kZXhLZXkgPSAnSW5kJztcclxuZXhwb3J0IGNvbnN0IFN0YXJ0RW5kS2V5ID0gJ1NUb0UnO1xyXG5leHBvcnQgY29uc3QgQmFzZUxpbmVTZWczZEtleSA9ICdCYXNlTGluZSc7XHJcbmV4cG9ydCBjb25zdCBCYXNlQ29tcG9uZW50S2V5ID0gJ0Jhc2VDb21wb25lbnQnO1xyXG5leHBvcnQgY29uc3QgQ2lyY2xlVGFuZ2VudEtleSA9ICdDaXJjbGVUYW5nZW50JztcclxuZXhwb3J0IGNvbnN0IERlbGltaXRlciA9ICcmJztcclxuZXhwb3J0IGNvbnN0IENvb3JkRGVsaW1pdGVyID0gJywnO1xyXG5leHBvcnQgY29uc3QgQmFzZUxpbmUzZERlbGltaXRlciA9ICdfJztcclxuZXhwb3J0IHZhciBDb21wb25lbnRQYXJhbVR5cGU7XHJcbihmdW5jdGlvbiAoQ29tcG9uZW50UGFyYW1UeXBlKSB7XHJcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIb3Jpem9udGFsU3RlcFwiXSA9IFwiaG9yaXpvbnRhbFN0ZXBcIjtcclxuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIlZlcnRpY2FsU3RlcFwiXSA9IFwidmVydGljYWxTdGVwXCI7XHJcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJTdGFydFdpZHRoXCJdID0gXCJzdGFydFdpZHRoXCI7XHJcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJFbmRXaWR0aFwiXSA9IFwiZW5kV2lkdGhcIjtcclxuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIlN0ZXBQcm9wb3J0aW9uYWxcIl0gPSBcInN0ZXBQcm9wb3J0aW9uYWxcIjtcclxuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIldpZHRoUHJvcG9ydGlvbmFsXCJdID0gXCJ3aWR0aFByb3BvcnRpb25hbFwiO1xyXG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiUGxhdGZvcm1MZW5ndGhcIl0gPSBcInBsYXRmb3JtTGVuZ3RoXCI7XHJcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJQbGF0Zm9ybUxlbmd0aExvY2tlZFwiXSA9IFwicGxhdGZvcm1MZW5ndGhMb2NrZWRcIjtcclxuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIlR5cGVcIl0gPSBcInR5cGVcIjtcclxuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIlVwd2FyZFwiXSA9IFwidXB3YXJkXCI7XHJcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJQbGF0Zm9ybVRoaWNrbmVzc1wiXSA9IFwicGxhdGZvcm1UaGlja25lc3NcIjtcclxuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsXCJdID0gXCJoYW5kcmFpbFwiO1xyXG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSGFuZHJhaWxIZWlnaHRcIl0gPSBcImhhbmRyYWlsSGVpZ2h0XCI7XHJcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIYW5kcmFpbFJhaWxUeXBlXCJdID0gXCJoYW5kcmFpbFJhaWxUeXBlXCI7XHJcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIYW5kcmFpbFJhaWxSYWRpdXNcIl0gPSBcImhhbmRyYWlsUmFpbFJhZGl1c1wiO1xyXG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSGFuZHJhaWxSYWlsV2lkdGhcIl0gPSBcImhhbmRyYWlsUmFpbFdpZHRoXCI7XHJcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIYW5kcmFpbFJhaWxIZWlnaHRcIl0gPSBcImhhbmRyYWlsUmFpbEhlaWdodFwiO1xyXG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSGFuZHJhaWxDb2x1bW5UeXBlXCJdID0gXCJoYW5kcmFpbENvbHVtblR5cGVcIjtcclxuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsQ29sdW1uU3RlcFwiXSA9IFwiaGFuZHJhaWxDb2x1bW5TdGVwXCI7XHJcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIYW5kcmFpbENvbHVtblJhZGl1c1wiXSA9IFwiaGFuZHJhaWxDb2x1bW5SYWRpdXNcIjtcclxuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsQ29sdW1uV2lkdGhcIl0gPSBcImhhbmRyYWlsQ29sdW1uV2lkdGhcIjtcclxuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsQ29sdW1uSGVpZ2h0XCJdID0gXCJoYW5kcmFpbENvbHVtbkhlaWdodFwiO1xyXG59KShDb21wb25lbnRQYXJhbVR5cGUgfHwgKENvbXBvbmVudFBhcmFtVHlwZSA9IHt9KSk7XHJcbi8vIGludGVyZmFjZSBQYXJhbVNldHRpbmdzIHtcclxuLy8gICAgIG1pbjogbnVtYmVyO1xyXG4vLyAgICAgbWF4OiBudW1iZXI7XHJcbi8vICAgICBzdGVwOiBudW1iZXI7XHJcbi8vICAgICB1bml0OiBzdHJpbmc7XHJcbi8vICAgICBwcmVjaXNpb246IG51bWJlcjtcclxuLy8gfVxyXG5leHBvcnQgdmFyIENvbXBvbmVudFR5cGU7XHJcbihmdW5jdGlvbiAoQ29tcG9uZW50VHlwZSkge1xyXG4gICAgQ29tcG9uZW50VHlwZVtDb21wb25lbnRUeXBlW1wiU3RyYWlnaHRTdGFpclwiXSA9IDBdID0gXCJTdHJhaWdodFN0YWlyXCI7XHJcbiAgICBDb21wb25lbnRUeXBlW0NvbXBvbmVudFR5cGVbXCJDaXJjdWxhclN0YWlyXCJdID0gMV0gPSBcIkNpcmN1bGFyU3RhaXJcIjtcclxuICAgIENvbXBvbmVudFR5cGVbQ29tcG9uZW50VHlwZVtcIlBsYXRmb3JtXCJdID0gMl0gPSBcIlBsYXRmb3JtXCI7XHJcbn0pKENvbXBvbmVudFR5cGUgfHwgKENvbXBvbmVudFR5cGUgPSB7fSkpO1xyXG5leHBvcnQgdmFyIFJhaWxUeXBlO1xyXG4oZnVuY3Rpb24gKFJhaWxUeXBlKSB7XHJcbiAgICBSYWlsVHlwZVtSYWlsVHlwZVtcIkNpcmNsZVwiXSA9IDBdID0gXCJDaXJjbGVcIjtcclxuICAgIFJhaWxUeXBlW1JhaWxUeXBlW1wiUmVjdFwiXSA9IDFdID0gXCJSZWN0XCI7XHJcbiAgICBSYWlsVHlwZVtSYWlsVHlwZVtcIkN1c3RvbVwiXSA9IDk5XSA9IFwiQ3VzdG9tXCI7XHJcbn0pKFJhaWxUeXBlIHx8IChSYWlsVHlwZSA9IHt9KSk7XHJcbmV4cG9ydCB2YXIgQ29sdW1uVHlwZTtcclxuKGZ1bmN0aW9uIChDb2x1bW5UeXBlKSB7XHJcbiAgICBDb2x1bW5UeXBlW0NvbHVtblR5cGVbXCJDaXJjbGVcIl0gPSAwXSA9IFwiQ2lyY2xlXCI7XHJcbiAgICBDb2x1bW5UeXBlW0NvbHVtblR5cGVbXCJSZWN0XCJdID0gMV0gPSBcIlJlY3RcIjtcclxuICAgIENvbHVtblR5cGVbQ29sdW1uVHlwZVtcIkN1c3RvbVwiXSA9IDk5XSA9IFwiQ3VzdG9tXCI7XHJcbn0pKENvbHVtblR5cGUgfHwgKENvbHVtblR5cGUgPSB7fSkpO1xyXG5leHBvcnQgY29uc3QgQ29tcG9uZW50UGFyYW1TZXR0aW5ncyA9IHtcclxuICAgIGhvcml6b250YWxTdGVwOiB7IHRpdGxlOiBcIuatpemVv1wiLCBtaW46IDEsIG1heDogMTAwMDAwLCBzdGVwOiAxMCwgdW5pdDogJ+mVvycsIHByZWNpc2lvbjogMCwgfSxcclxuICAgIHZlcnRpY2FsU3RlcDogeyB0aXRsZTogXCLmraXplb9cIiwgbWluOiAxLCBtYXg6IDEwMDAwMCwgc3RlcDogMTAsIHVuaXQ6ICfpq5gnLCBwcmVjaXNpb246IDAsIH0sXHJcbiAgICBzdGFydFdpZHRoOiB7IHRpdGxlOiBcIuWuveW6plwiLCBtaW46IDEsIG1heDogMTAwMDAwLCBzdGVwOiA1MCwgdW5pdDogJ+i1tycsIHByZWNpc2lvbjogMCwgfSxcclxuICAgIGVuZFdpZHRoOiB7IHRpdGxlOiBcIuWuveW6plwiLCBtaW46IDEsIG1heDogMTAwMDAwLCBzdGVwOiA1MCwgdW5pdDogJ+e7iCcsIHByZWNpc2lvbjogMCwgfSxcclxuICAgIHBsYXRmb3JtTGVuZ3RoOiB7IHRpdGxlOiBcIumVv+W6plwiLCBtaW46IDEwMCwgbWF4OiAxMDAwMDAsIHN0ZXA6IDUwLCB1bml0OiAnJywgcHJlY2lzaW9uOiAwLCB9LFxyXG4gICAgdHlwZToge1xyXG4gICAgICAgIC8vIHJhZGlvVmFsdWVzOiBbQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyLCBDb21wb25lbnRUeXBlLkNpcmN1bGFyU3RhaXIsIENvbXBvbmVudFR5cGUuUGxhdGZvcm1dLFxyXG4gICAgICAgIC8vIHRleHRzOiBbXCLnm7TpmLZcIiwgXCLml4vovazpmLbmoq9cIiwgXCLlubPlj7BcIl0sXHJcbiAgICAgICAgdGl0bGU6IFwi57G75Z6LXCIsXHJcbiAgICAgICAgcmFkaW9PcHRpb25zOiBbXHJcbiAgICAgICAgICAgIHsgdmFsdWU6IENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpciwgdGV4dDogXCLnm7TpmLZcIiB9LFxyXG4gICAgICAgICAgICB7IHZhbHVlOiBDb21wb25lbnRUeXBlLkNpcmN1bGFyU3RhaXIsIHRleHQ6IFwi5peL6L2s6Zi25qKvXCIgfSxcclxuICAgICAgICAgICAgeyB2YWx1ZTogQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSwgdGV4dDogXCLlubPlj7BcIiB9LFxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB1cHdhcmQ6IHtcclxuICAgICAgICAvLyByYWRpb1ZhbHVlczogWzEsIDBdLFxyXG4gICAgICAgIC8vIHRleHRzOiBbXCLlkJHkuIpcIiwgXCLlkJHkuItcIl0sXHJcbiAgICAgICAgdGl0bGU6IFwi5pa55ZCRXCIsXHJcbiAgICAgICAgcmFkaW9PcHRpb25zOiBbXHJcbiAgICAgICAgICAgIHsgdmFsdWU6IHRydWUsIHRleHQ6IFwi5ZCR5LiKXCIgfSxcclxuICAgICAgICAgICAgeyB2YWx1ZTogZmFsc2UsIHRleHQ6IFwi5ZCR5LiLXCIgfSxcclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAgcGxhdGZvcm1UaGlja25lc3M6IHsgdGl0bGU6IFwi5Y6a5bqmXCIsIG1pbjogMSwgbWF4OiAxMDAwMDAsIHN0ZXA6IDEwLCB1bml0OiAnJywgcHJlY2lzaW9uOiAwLCB9LFxyXG4gICAgaGFuZHJhaWw6IHtcclxuICAgICAgICB0aXRsZTogJ+WQr+eUqOagj+adhicsXHJcbiAgICAgICAgaGVpZ2h0OiB7IHRpdGxlOiBcIumrmOW6plwiLCBtaW46IDEsIG1heDogMTAwMDAwLCBzdGVwOiAxMCwgdW5pdDogJycsIHByZWNpc2lvbjogMCwgfSxcclxuICAgICAgICByYWlsOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIuagt+W8j1wiLFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0T3B0aW9uczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IFJhaWxUeXBlLkNpcmNsZSwgbGFiZWw6IFwi5ZyG5b2iXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBSYWlsVHlwZS5SZWN0LCBsYWJlbDogXCLmlrnlvaJcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IFJhaWxUeXBlLkN1c3RvbSwgbGFiZWw6IFwi5ou+5Y+WXCIgfSxcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbHVtbjoge1xyXG4gICAgICAgICAgICB0eXBlOiB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCLmoLflvI9cIixcclxuICAgICAgICAgICAgICAgIHNlbGVjdE9wdGlvbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBDb2x1bW5UeXBlLkNpcmNsZSwgbGFiZWw6IFwi5ZyG5b2iXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBDb2x1bW5UeXBlLlJlY3QsIGxhYmVsOiBcIuaWueW9olwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogQ29sdW1uVHlwZS5DdXN0b20sIGxhYmVsOiBcIuaLvuWPllwiIH0sXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN0ZXA6IHsgdGl0bGU6IFwi6Ze06ZqUXCIsIG1pbjogMSwgbWF4OiAxMDAwMDAsIHN0ZXA6IDEwLCB1bml0OiAnJywgcHJlY2lzaW9uOiAwLCB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcG9uZW50UGFyYW06IHtcclxuICAgICAgICAgICAgcmFkaXVzOiB7IHRpdGxlOiBcIuWNiuW+hFwiLCBtaW46IDEsIG1heDogMTAwMDAwLCBzdGVwOiAxMCwgdW5pdDogJycsIHByZWNpc2lvbjogMCwgfSxcclxuICAgICAgICAgICAgd2lkdGg6IHsgdGl0bGU6IFwi5a695bqmXCIsIG1pbjogMSwgbWF4OiAxMDAwMDAsIHN0ZXA6IDEwLCB1bml0OiAnJywgcHJlY2lzaW9uOiAwLCB9LFxyXG4gICAgICAgICAgICBoZWlnaHQ6IHsgdGl0bGU6IFwi6auY5bqmXCIsIG1pbjogMSwgbWF4OiAxMDAwMDAsIHN0ZXA6IDEwLCB1bml0OiAnJywgcHJlY2lzaW9uOiAwLCB9LFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbXBvbmVudFRpdGxlKGNvbXBvbmVudFR5cGUpIHtcclxuICAgIGlmIChjb21wb25lbnRUeXBlID09PSBDb21wb25lbnRUeXBlLlN0cmFpZ2h0U3RhaXIpIHtcclxuICAgICAgICByZXR1cm4gJ+mYtic7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChjb21wb25lbnRUeXBlID09PSBDb21wb25lbnRUeXBlLkNpcmN1bGFyU3RhaXIpIHtcclxuICAgICAgICByZXR1cm4gJ+mYtic7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gJ+WPsCc7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNvbnN0IERlZmF1bHRTdGFpclBhcmFtID0ge1xyXG4gICAgaG9yaXpvbnRhbFN0ZXA6IDI1MCxcclxuICAgIHZlcnRpY2FsU3RlcDogMjUwLFxyXG4gICAgc3RhcnRXaWR0aDogMTAwMCxcclxuICAgIGVuZFdpZHRoOiAxMDAwLFxyXG4gICAgdXB3YXJkOiB0cnVlLFxyXG4gICAgcGxhdGZvcm1UaGlja25lc3M6IDIwMCxcclxuICAgIGhhbmRyYWlsOiB7XHJcbiAgICAgICAgc3VwcG9ydDogdHJ1ZSxcclxuICAgICAgICBoZWlnaHQ6IDUwMCxcclxuICAgICAgICByYWlsOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFJhaWxUeXBlLkNpcmNsZSxcclxuICAgICAgICAgICAgcGFyYW06IHsgcmFkaXVzOiA1MCwgd2lkdGg6IDUwLCBoZWlnaHQ6IDUwLCB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29sdW1uOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IENvbHVtblR5cGUuQ2lyY2xlLFxyXG4gICAgICAgICAgICBzdGVwOiA1MDAsXHJcbiAgICAgICAgICAgIHBhcmFtOiB7IHJhZGl1czogMjUsIHdpZHRoOiAyNSwgaGVpZ2h0OiAyNSwgfSxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIHN0ZXBQcm9wb3J0aW9uYWw6IHRydWUsXHJcbiAgICB3aWR0aFByb3BvcnRpb25hbDogdHJ1ZSxcclxufTtcclxuZXhwb3J0IGNvbnN0IERlZmF1bHRDb21wb25lbnRQYXJhbSA9IHtcclxuICAgIGluZGV4OiAwLFxyXG4gICAgaG9yaXpvbnRhbFN0ZXA6IERlZmF1bHRTdGFpclBhcmFtLmhvcml6b250YWxTdGVwLFxyXG4gICAgdmVydGljYWxTdGVwOiBEZWZhdWx0U3RhaXJQYXJhbS52ZXJ0aWNhbFN0ZXAsXHJcbiAgICBzdGFydFdpZHRoOiBEZWZhdWx0U3RhaXJQYXJhbS5zdGFydFdpZHRoLFxyXG4gICAgZW5kV2lkdGg6IERlZmF1bHRTdGFpclBhcmFtLmVuZFdpZHRoLFxyXG4gICAgb2Zmc2V0V2lkdGg6IDAsXHJcbiAgICB3aXRoT2Zmc2V0OiBmYWxzZSxcclxuICAgIHBsYXRmb3JtTGVuZ3RoOiAyMDAwLFxyXG4gICAgdHlwZTogQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSxcclxuICAgIHVwd2FyZDogRGVmYXVsdFN0YWlyUGFyYW0udXB3YXJkLFxyXG4gICAgcGxhdGZvcm1UaGlja25lc3M6IERlZmF1bHRTdGFpclBhcmFtLnBsYXRmb3JtVGhpY2tuZXNzLFxyXG4gICAgc3RlcFByb3BvcnRpb25hbDogRGVmYXVsdFN0YWlyUGFyYW0uc3RlcFByb3BvcnRpb25hbCxcclxuICAgIHdpZHRoUHJvcG9ydGlvbmFsOiB0cnVlLFxyXG4gICAgcGxhdGZvcm1MZW5ndGhMb2NrZWQ6IGZhbHNlLFxyXG4gICAgLy8gc3RlcFR5cGU6IFN0ZXBUeXBlLk5vcm1hbCxcclxuICAgIC8vIGNvcm5lclR5cGU6IENvcm5lclR5cGUuUmVjdGFuZ2xlLFxyXG59O1xyXG5leHBvcnQgdmFyIFBsYXRmb3JtRGlyZWN0aW9uVHlwZTtcclxuKGZ1bmN0aW9uIChQbGF0Zm9ybURpcmVjdGlvblR5cGUpIHtcclxuICAgIFBsYXRmb3JtRGlyZWN0aW9uVHlwZVtQbGF0Zm9ybURpcmVjdGlvblR5cGVbXCJGcm9udFwiXSA9IDBdID0gXCJGcm9udFwiO1xyXG4gICAgUGxhdGZvcm1EaXJlY3Rpb25UeXBlW1BsYXRmb3JtRGlyZWN0aW9uVHlwZVtcIlJpZ2h0RnJvbnRcIl0gPSAxXSA9IFwiUmlnaHRGcm9udFwiO1xyXG4gICAgUGxhdGZvcm1EaXJlY3Rpb25UeXBlW1BsYXRmb3JtRGlyZWN0aW9uVHlwZVtcIlJpZ2h0XCJdID0gMl0gPSBcIlJpZ2h0XCI7XHJcbiAgICBQbGF0Zm9ybURpcmVjdGlvblR5cGVbUGxhdGZvcm1EaXJlY3Rpb25UeXBlW1wiTGVmdFwiXSA9IDNdID0gXCJMZWZ0XCI7XHJcbiAgICBQbGF0Zm9ybURpcmVjdGlvblR5cGVbUGxhdGZvcm1EaXJlY3Rpb25UeXBlW1wiTGVmdEZyb250XCJdID0gNF0gPSBcIkxlZnRGcm9udFwiO1xyXG59KShQbGF0Zm9ybURpcmVjdGlvblR5cGUgfHwgKFBsYXRmb3JtRGlyZWN0aW9uVHlwZSA9IHt9KSk7XHJcbmV4cG9ydCBmdW5jdGlvbiBpc0F4aXNWYWxpZChheGlzKSB7XHJcbiAgICByZXR1cm4gYXhpcyA9PT0gXCJYXCIgLyogQXhpcy5YICovIHx8IGF4aXMgPT09IFwiLVhcIiAvKiBBeGlzLlhNaW51cyAqLyB8fCBheGlzID09PSBcIllcIiAvKiBBeGlzLlkgKi8gfHwgYXhpcyA9PT0gXCItWVwiIC8qIEF4aXMuWU1pbnVzICovIHx8IGF4aXMgPT09IFwiWlwiIC8qIEF4aXMuWiAqLyB8fCBheGlzID09PSBcIi1aXCIgLyogQXhpcy5aTWludXMgKi87XHJcbn1cclxuIiwiaW1wb3J0IHsgQmFzZUxpbmUzZERlbGltaXRlciwgQ29vcmREZWxpbWl0ZXIsIERlZmF1bHRDb21wb25lbnRQYXJhbSwgRGVsaW1pdGVyIH0gZnJvbSBcIi4vdHlwZXNcIjtcclxuZXhwb3J0IGZ1bmN0aW9uIGlzS0FyY2hGYWNlKGVudGl0eSkge1xyXG4gICAgcmV0dXJuICEhZW50aXR5ICYmIChlbnRpdHkuZ2V0VHlwZSgpID09PSBLQXJjaEZhY2VUeXBlLk5vblBsYW5hciB8fCBlbnRpdHkuZ2V0VHlwZSgpID09PSBLQXJjaEZhY2VUeXBlLlBsYW5hcik7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGlzS0dyb3VwSW5zdGFuY2UoZW50aXR5KSB7XHJcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS0VudGl0eVR5cGUuR3JvdXBJbnN0YW5jZTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gaXNLRmFjZShlbnRpdHkpIHtcclxuICAgIHJldHVybiAhIWVudGl0eSAmJiBlbnRpdHkuZ2V0VHlwZSgpID09PSBLRW50aXR5VHlwZS5GYWNlO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBpc0tFZGdlKGVudGl0eSkge1xyXG4gICAgcmV0dXJuICEhZW50aXR5ICYmIGVudGl0eS5nZXRUeXBlKCkgPT09IEtFbnRpdHlUeXBlLkVkZ2U7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGlzS1ZlcnRleChlbnRpdHkpIHtcclxuICAgIHJldHVybiAhIWVudGl0eSAmJiBlbnRpdHkuZ2V0VHlwZSgpID09PSBLRW50aXR5VHlwZS5WZXJ0ZXg7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGlzS0F1eGlsaWFyeUJvdW5kZWRDdXJ2ZShlbnRpdHkpIHtcclxuICAgIHJldHVybiAhIWVudGl0eSAmJiBlbnRpdHkuZ2V0VHlwZSgpID09PSBLRW50aXR5VHlwZS5BdXhpbGlhcnlCb3VuZGVkQ3VydmU7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGlzS0F1eGlsaWFyeUxpbmUoZW50aXR5KSB7XHJcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS0VudGl0eVR5cGUuQXV4aWxpYXJ5TGluZTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gaXNLUGxhbmUoZW50aXR5KSB7XHJcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS1N1cmZhY2VUeXBlLlBsYW5lO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBpc0tMaW5lU2VnbWVudDNkKGVudGl0eSkge1xyXG4gICAgcmV0dXJuICEhZW50aXR5ICYmICEhZW50aXR5LmRpcmVjdGlvbjtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gaXNLQXJjM2QoZW50aXR5KSB7XHJcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgISFlbnRpdHkuY2lyY2xlO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnlQYXJhbShwYXJhbSkge1xyXG4gICAgbGV0IHZhbHVlID0gJyc7XHJcbiAgICB2YWx1ZSArPSBgaW5kPSR7cGFyYW0uaW5kZXh9JHtEZWxpbWl0ZXJ9YDtcclxuICAgIHZhbHVlICs9IGBocz0ke3BhcmFtLmhvcml6b250YWxTdGVwfSR7RGVsaW1pdGVyfWA7XHJcbiAgICB2YWx1ZSArPSBgdnM9JHtwYXJhbS52ZXJ0aWNhbFN0ZXB9JHtEZWxpbWl0ZXJ9YDtcclxuICAgIHZhbHVlICs9IGBzdz0ke3BhcmFtLnN0YXJ0V2lkdGh9JHtEZWxpbWl0ZXJ9YDtcclxuICAgIHZhbHVlICs9IGBldz0ke3BhcmFtLmVuZFdpZHRofSR7RGVsaW1pdGVyfWA7XHJcbiAgICB2YWx1ZSArPSBgb3c9JHtwYXJhbS5vZmZzZXRXaWR0aH0ke0RlbGltaXRlcn1gO1xyXG4gICAgdmFsdWUgKz0gYHBsPSR7cGFyYW0ucGxhdGZvcm1MZW5ndGh9JHtEZWxpbWl0ZXJ9YDtcclxuICAgIHZhbHVlICs9IGB0cD0ke3BhcmFtLnR5cGV9JHtEZWxpbWl0ZXJ9YDtcclxuICAgIHZhbHVlICs9IGB1cD0ke3BhcmFtLnVwd2FyZCA/IDEgOiAwfSR7RGVsaW1pdGVyfWA7XHJcbiAgICB2YWx1ZSArPSBgcHRrPSR7cGFyYW0ucGxhdGZvcm1UaGlja25lc3N9YDtcclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VQYXJhbSh2YWx1ZSkge1xyXG4gICAgY29uc3QgcGFyYW0gPSBPYmplY3QuYXNzaWduKHt9LCBEZWZhdWx0Q29tcG9uZW50UGFyYW0pO1xyXG4gICAgY29uc3QgaXRlbXMgPSB2YWx1ZS5zcGxpdChEZWxpbWl0ZXIpO1xyXG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XHJcbiAgICAgICAgY29uc3Qga2V5VmFsdWUgPSBpdGVtLnNwbGl0KCc9Jyk7XHJcbiAgICAgICAgaWYgKGtleVZhbHVlLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGtleVZhbHVlWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdpbmQnOlxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmluZGV4ID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnaHMnOlxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmhvcml6b250YWxTdGVwID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAndnMnOlxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnZlcnRpY2FsU3RlcCA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3N3JzpcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5zdGFydFdpZHRoID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZXcnOlxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmVuZFdpZHRoID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnb3cnOlxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLm9mZnNldFdpZHRoID0gcGFyc2VGbG9hdChrZXlWYWx1ZVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdwbCc6XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0ucGxhdGZvcm1MZW5ndGggPSBwYXJzZUZsb2F0KGtleVZhbHVlWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3RwJzpcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbS50eXBlID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAndXAnOlxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnVwd2FyZCA9IGtleVZhbHVlWzFdID09PSAnMScgPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdwdGsnOlxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnBsYXRmb3JtVGhpY2tuZXNzID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcGFyYW0uc3RlcFByb3BvcnRpb25hbCA9IHRydWU7XHJcbiAgICBwYXJhbS53aWR0aFByb3BvcnRpb25hbCA9IHRydWU7XHJcbiAgICBwYXJhbS5wbGF0Zm9ybUxlbmd0aExvY2tlZCA9IHRydWU7XHJcbiAgICBwYXJhbS5tb2RlbEVkaXRpbmcgPSB0cnVlO1xyXG4gICAgcmV0dXJuIHBhcmFtO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnlTdGFydEVuZChzdGFydCwgZW5kKSB7XHJcbiAgICBsZXQgdmFsdWUgPSAnJztcclxuICAgIHZhbHVlICs9IGAke3N0YXJ0Lnh9JHtDb29yZERlbGltaXRlcn1gO1xyXG4gICAgdmFsdWUgKz0gYCR7c3RhcnQueX0ke0Nvb3JkRGVsaW1pdGVyfWA7XHJcbiAgICB2YWx1ZSArPSBgJHtzdGFydC56fSR7RGVsaW1pdGVyfWA7XHJcbiAgICB2YWx1ZSArPSBgJHtlbmQueH0ke0Nvb3JkRGVsaW1pdGVyfWA7XHJcbiAgICB2YWx1ZSArPSBgJHtlbmQueX0ke0Nvb3JkRGVsaW1pdGVyfWA7XHJcbiAgICB2YWx1ZSArPSBgJHtlbmQuen1gO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUxpbmVTZWczZCh2YWx1ZSkge1xyXG4gICAgY29uc3QgaXRlbXMgPSB2YWx1ZS5zcGxpdChEZWxpbWl0ZXIpO1xyXG4gICAgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0S2V5VmFsdWUgPSBpdGVtc1swXS5zcGxpdChDb29yZERlbGltaXRlcik7XHJcbiAgICAgICAgY29uc3QgZW5kS2V5VmFsdWUgPSBpdGVtc1sxXS5zcGxpdChDb29yZERlbGltaXRlcik7XHJcbiAgICAgICAgaWYgKHN0YXJ0S2V5VmFsdWUubGVuZ3RoID09PSAzICYmIGVuZEtleVZhbHVlLmxlbmd0aCA9PT0gMykge1xyXG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IEdlb21MaWIuY3JlYXRlUG9pbnQzZChwYXJzZUZsb2F0KHN0YXJ0S2V5VmFsdWVbMF0pLCBwYXJzZUZsb2F0KHN0YXJ0S2V5VmFsdWVbMV0pLCBwYXJzZUZsb2F0KHN0YXJ0S2V5VmFsdWVbMl0pKTtcclxuICAgICAgICAgICAgY29uc3QgZW5kID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKHBhcnNlRmxvYXQoZW5kS2V5VmFsdWVbMF0pLCBwYXJzZUZsb2F0KGVuZEtleVZhbHVlWzFdKSwgcGFyc2VGbG9hdChlbmRLZXlWYWx1ZVsyXSkpO1xyXG4gICAgICAgICAgICByZXR1cm4geyBzdGFydCwgZW5kIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVN0YXJ0RW5kKHZhbHVlKSB7XHJcbiAgICBjb25zdCBpdGVtcyA9IHZhbHVlLnNwbGl0KERlbGltaXRlcik7XHJcbiAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRLZXlWYWx1ZSA9IGl0ZW1zWzBdLnNwbGl0KENvb3JkRGVsaW1pdGVyKTtcclxuICAgICAgICBjb25zdCBlbmRLZXlWYWx1ZSA9IGl0ZW1zWzFdLnNwbGl0KENvb3JkRGVsaW1pdGVyKTtcclxuICAgICAgICBpZiAoc3RhcnRLZXlWYWx1ZS5sZW5ndGggPT09IDMgJiYgZW5kS2V5VmFsdWUubGVuZ3RoID09PSAzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKHBhcnNlRmxvYXQoc3RhcnRLZXlWYWx1ZVswXSksIHBhcnNlRmxvYXQoc3RhcnRLZXlWYWx1ZVsxXSksIDApO1xyXG4gICAgICAgICAgICBjb25zdCBlbmQgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QocGFyc2VGbG9hdChlbmRLZXlWYWx1ZVswXSksIHBhcnNlRmxvYXQoZW5kS2V5VmFsdWVbMV0pLCAwKTtcclxuICAgICAgICAgICAgcmV0dXJuIHsgc3RhcnQsIGVuZCwgc3RhcnRIZWlnaHQ6IHBhcnNlRmxvYXQoc3RhcnRLZXlWYWx1ZVsyXSksIGVuZEhlaWdodDogcGFyc2VGbG9hdChlbmRLZXlWYWx1ZVsyXSkgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeVBvaW50M2QocG9pbnQpIHtcclxuICAgIGxldCB2YWx1ZSA9ICcnO1xyXG4gICAgdmFsdWUgKz0gYCR7cG9pbnQueH0ke0Nvb3JkRGVsaW1pdGVyfWA7XHJcbiAgICB2YWx1ZSArPSBgJHtwb2ludC55fSR7Q29vcmREZWxpbWl0ZXJ9YDtcclxuICAgIHZhbHVlICs9IGAke3BvaW50Lnp9YDtcclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VWZWN0b3IzZCh2YWx1ZSkge1xyXG4gICAgY29uc3QgaXRlbXMgPSB2YWx1ZS5zcGxpdChDb29yZERlbGltaXRlcik7XHJcbiAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAzKSB7XHJcbiAgICAgICAgY29uc3QgdmVjdG9yID0gR2VvbUxpYi5jcmVhdGVWZWN0b3IzZChwYXJzZUZsb2F0KGl0ZW1zWzBdKSwgcGFyc2VGbG9hdChpdGVtc1sxXSksIHBhcnNlRmxvYXQoaXRlbXNbMl0pKTtcclxuICAgICAgICByZXR1cm4gdmVjdG9yO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnlCYXNlQ29tcG9uZW50KGJhc2VTZWdtZW50LCBsaW5lM2RJbmRleCkge1xyXG4gICAgbGV0IHZhbHVlID0gJyc7XHJcbiAgICB2YWx1ZSArPSBgJHtiYXNlU2VnbWVudC5wYXJhbS5pbmRleH1gO1xyXG4gICAgaWYgKGxpbmUzZEluZGV4ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB2YWx1ZSArPSBgJHtDb29yZERlbGltaXRlcn0ke2xpbmUzZEluZGV4fWA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQmFzZUNvbXBvbmVudCh2YWx1ZSkge1xyXG4gICAgY29uc3QgaXRlbXMgPSB2YWx1ZS5zcGxpdChCYXNlTGluZTNkRGVsaW1pdGVyKTtcclxuICAgIGlmIChpdGVtcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgY29uc3QgYmFzZUNvbXBvbmVudEluZGV4ID0gcGFyc2VJbnQoaXRlbXNbMF0pO1xyXG4gICAgICAgIGxldCBsaW5lM2RJbmRleDtcclxuICAgICAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICAgIGxpbmUzZEluZGV4ID0gcGFyc2VJbnQoaXRlbXNbMV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4geyBjb21wb25lbnRJbmRleDogYmFzZUNvbXBvbmVudEluZGV4LCBsaW5lM2RJbmRleCB9O1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBpc0VxdWFsKGEsIGIsIHRvbGVyYW5jZSA9IDEpIHtcclxuICAgIHJldHVybiBNYXRoLmFicyhhIC0gYikgPD0gdG9sZXJhbmNlO1xyXG59XHJcbiIsImV4cG9ydCB2YXIgTWVzc2FnZVR5cGU7XHJcbihmdW5jdGlvbiAoTWVzc2FnZVR5cGUpIHtcclxuICAgIE1lc3NhZ2VUeXBlW1wiRHJhd1N0YWlyVmlld01vdW50ZWRcIl0gPSBcImRyYXdTdGFpclZpZXdNb3VudGVkXCI7XHJcbiAgICBNZXNzYWdlVHlwZVtcIlN0YWlyUGFyYW1DaGFuZ2VkQnlJbnB1dFwiXSA9IFwic3RhaXJQYXJhbUNoYW5nZWRCeUlucHV0XCI7XHJcbiAgICBNZXNzYWdlVHlwZVtcIlBhcmFtQ2hhbmdlZEJ5SW5wdXRcIl0gPSBcInBhcmFtQ2hhbmdlZEJ5SW5wdXRcIjtcclxuICAgIE1lc3NhZ2VUeXBlW1wiUGFyYW1DaGFuZ2VkQnlEcmF3XCJdID0gXCJwYXJhbUNoYW5nZWRCeURyYXdcIjtcclxuICAgIE1lc3NhZ2VUeXBlW1wiQ29tcG9uZW50QWRkZWRcIl0gPSBcImNvbXBvbmVudEFkZGVkXCI7XHJcbiAgICBNZXNzYWdlVHlwZVtcIkRyYXdTdGFpck1vZGVsU2V0dGxlZFwiXSA9IFwiZHJhd1N0YWlyTW9kZWxTZXR0bGVkXCI7XHJcbiAgICBNZXNzYWdlVHlwZVtcIlByb3BlcnRpZXNWaXNpYmxlXCJdID0gXCJwcm9wZXJ0aWVzVmlzaWJsZVwiO1xyXG4gICAgTWVzc2FnZVR5cGVbXCJGb2N1c0NvbXBvbmVudEluZGV4XCJdID0gXCJmb2N1c0NvbXBvbmVudEluZGV4XCI7XHJcbiAgICBNZXNzYWdlVHlwZVtcIlJlbW92ZUNvbXBvbmVudFwiXSA9IFwicmVtb3ZlQ29tcG9uZW50XCI7XHJcbiAgICBNZXNzYWdlVHlwZVtcIkFjdGl2YXRlRHJhd1N0YWlyc1Rvb2xcIl0gPSBcImFjdGl2YXRlRHJhd1N0YWlyc1Rvb2xcIjtcclxuICAgIE1lc3NhZ2VUeXBlW1wiRGVBY3RpdmF0ZURyYXdTdGFpcnNUb29sXCJdID0gXCJkZUFjdGl2YXRlRHJhd1N0YWlyc1Rvb2xcIjtcclxuICAgIE1lc3NhZ2VUeXBlW1wiTGVhdmVEcmF3U3RhaXJzVG9vbFwiXSA9IFwibGVhdmVEcmF3U3RhaXJzVG9vbFwiO1xyXG59KShNZXNzYWdlVHlwZSB8fCAoTWVzc2FnZVR5cGUgPSB7fSkpO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL21haW4vbWFpbi50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==