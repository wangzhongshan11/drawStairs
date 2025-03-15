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
                if (!(0,_tempMeshUtils__WEBPACK_IMPORTED_MODULE_1__.isCircularStair)(theSegment)) {
                    theSegment.circleTangent = undefined;
                }
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
                const offsetLength = Math.max(columnParam.height || 0, columnParam.width || 0, columnParam.radius || 0);
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
                            nextStartPoint = sp;
                        }
                        else {
                            lastDistance = sp.distanceTo(ep);
                            nextStartPoint = isPlatform(baseSegment) ? ep : undefined;
                            ;
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
                        tempDistance += (deltaDistance <= step && deltaDistance > stepTolerance) ? (pushEnd ? deltaDistance : Infinity) : step;
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
                    let cornerAdditionalHeight = !left && isRightStair && upward ? stepHeight : 0;
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
                        sp = left ? start.added(baseLine3dDir.multiplied(startWidth / 2 - offsetLength)) : start.added(baseLine3dDir.multiplied(-startWidth / 2 + offsetLength));
                    }
                    else if (circleTangent) {
                        const tangentLeftDir = _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.cross(circleTangent).normalized();
                        const startEndDistance = start.distanceTo(end);
                        const maxWidth = Math.max(startWidth, endWidth);
                        const isLeftArc = circularSide === _types__WEBPACK_IMPORTED_MODULE_2__.CircularSide.Left;
                        const endComplementaryAngle = isLeftArc ? Math.abs(arcChordAngle - Math.PI / 2 - Math.PI) : Math.abs(arcChordAngle - Math.PI / 2);
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
                                    sp = left ? start.added(baseLine3dDir.multiplied(startWidth / 2 - offsetLength)) : curRightMoldPt;
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
                        if (nextSegment && !visited.get(nextSegment.param.index)) {
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
                            if (spToEpDir.dot(line3dDir) < 0) {
                                nextStartPoint = sp;
                            }
                            else {
                                pushEnd = true;
                                nextStartPoint = isPlatform(stairNextSegment) ? ep : undefined;
                                ;
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
                        cornerAdditionalHeight = left && isLeftStair && upward ? stepHeight : (!left && !upward ? -stepHeight : 0);
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
/* harmony export */   ColumnType: () => (/* binding */ ColumnType),
/* harmony export */   ComponentDirectionType: () => (/* binding */ ComponentDirectionType),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlCQUFpQixTQUFJLElBQUksU0FBSTtBQUM3Qiw0QkFBNEIsK0RBQStELGlCQUFpQjtBQUM1RztBQUNBLG9DQUFvQyxNQUFNLCtCQUErQixZQUFZO0FBQ3JGLG1DQUFtQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3hGLGdDQUFnQztBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUM4RDtBQUNFO0FBQzFCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLCtDQUFXO0FBQ3pDO0FBQ0E7QUFDQSxtQ0FBbUMsK0NBQVc7QUFDOUM7QUFDQSw0Q0FBNEMsdUVBQWM7QUFDMUQsMkNBQTJDLHVFQUFjO0FBQ3pELDBDQUEwQyx1RUFBYztBQUN4RDtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsK0NBQVc7QUFDOUMscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxtQ0FBbUMsK0NBQVc7QUFDOUM7QUFDQSxnQkFBZ0IsdUVBQWM7QUFDOUI7QUFDQTtBQUNBLG1DQUFtQywrQ0FBVztBQUM5QztBQUNBLGdCQUFnQix1RUFBYztBQUM5QjtBQUNBO0FBQ0EsbUNBQW1DLCtDQUFXO0FBQzlDO0FBQ0EsZ0JBQWdCLHVFQUFjO0FBQzlCO0FBQ0E7QUFDQSxtQ0FBbUMsK0NBQVc7QUFDOUM7QUFDQSxnQkFBZ0IsdUVBQWM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDTztBQUNQO0FBQ0EsNkJBQTZCLHVFQUFjO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3Qyw2RUFBZ0I7QUFDeEQsWUFBWSx1RUFBYztBQUMxQixZQUFZLHVFQUFjO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLDhCQUE4Qix1RUFBYztBQUM1QztBQUNBLGdCQUFnQix1RUFBYztBQUM5Qiw0Q0FBNEMsdUVBQWM7QUFDMUQsMkNBQTJDLE1BQU0sK0NBQVcsOENBQThDO0FBQzFHO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxvQ0FBb0MsNkVBQWdCO0FBQ3BELFFBQVEsdUVBQWM7QUFDdEI7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQix1RUFBYztBQUNwQztBQUNBO0FBQ0EsWUFBWSx1RUFBYztBQUMxQjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6R3dFO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDUDtBQUNPO0FBQ0E7QUFDQTtBQUNBO0FBQ1A7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QscUNBQXFDLFdBQVc7QUFDaEQsK0JBQStCLEVBQUUseURBQXFCO0FBQ3RELGdDQUFnQywwREFBc0I7QUFDdEQ7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1Q0EsaUJBQWlCLFNBQUksSUFBSSxTQUFJO0FBQzdCLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQzRMO0FBQ3BHO0FBQ2lFO0FBQ2xEO0FBQzVEO0FBQ21CO0FBQ1o7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBLHNEQUFzRDtBQUN0RDtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIscURBQWlCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qix3REFBZTtBQUM1QztBQUNBO0FBQ0EsK0JBQStCLE1BQU0sb0RBQVcsNEdBQTRHO0FBQzVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLE1BQU0sb0RBQVcsc0JBQXNCO0FBQzFFO0FBQ0EsUUFBUSxvRUFBd0I7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QiwwQ0FBMEM7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtJQUErSSw2REFBaUI7QUFDaEs7QUFDQSxtSEFBbUgsaURBQWE7QUFDaEksb0NBQW9DLGFBQWEsd0JBQXdCO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUVBQXFFO0FBQ3JFLGtFQUFrRSx1RUFBdUU7QUFDekk7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxpREFBYTtBQUMzRCwyQ0FBMkMsTUFBTSxvREFBVyxxREFBcUQsc0JBQXNCO0FBQ3ZJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHFCQUFxQixNQUFNLGtCQUFrQjtBQUN6RSxpQ0FBaUMsaURBQWE7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBFQUEwRSxFQUFFLHdEQUFlLE9BQU8sOEVBQThFLGlEQUFhLHFJQUFxSSxnQkFBZ0IscUdBQXFHLGlEQUFhLFlBQVksaURBQWEsaUJBQWlCLGlEQUFhLHdDQUF3QyxHQUFHO0FBQ3RpQixnQ0FBZ0MsYUFBYSx3QkFBd0I7QUFDckU7QUFDQSw2REFBNkQ7QUFDN0QsMERBQTBELFVBQVU7QUFDcEU7QUFDQTtBQUNBLGdEQUFnRCw2REFBaUI7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDREQUE0RCxpREFBYTtBQUN6RSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBLCtDQUErQyxNQUFNLG9EQUFXLGdEQUFnRDtBQUNoSDtBQUNBO0FBQ0EsbURBQW1ELDZEQUFpQjtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLE1BQU0sb0RBQVcsaURBQWlELHNCQUFzQjtBQUN2STtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1RkFBdUYsU0FBUyxvQkFBb0IsMEVBQTBFO0FBQzlMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsY0FBYyxvREFBb0QsZUFBZSxrREFBa0QsaUJBQWlCLHNEQUFzRCxxQkFBcUIsOERBQThELElBQUk7QUFDclQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdFQUF3RSxTQUFTLG9CQUFvQixvQkFBb0I7QUFDekg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdGQUFnRixTQUFTLG9CQUFvQiwyQkFBMkI7QUFDeEk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGdCQUFnQjtBQUN6QyxnQ0FBZ0MscUJBQXFCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlGQUFpRixTQUFTLG9CQUFvQixnREFBZ0Q7QUFDOUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyw2REFBaUI7QUFDdkQsc0NBQXNDLDZEQUFpQjtBQUN2RDtBQUNBO0FBQ0EsNEJBQTRCLFNBQVMsc0JBQXNCLGVBQWUsaUVBQWlFO0FBQzNJLDRCQUE0QixRQUFRO0FBQ3BDO0FBQ0E7QUFDQSwyQ0FBMkMsaURBQWE7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBaUU7QUFDakUsOERBQThELDZFQUE2RTtBQUMzSTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RDtBQUM3RCwwREFBMEQseUVBQXlFO0FBQ25JO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyw2REFBaUI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsNkRBQWlCO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxzREFBa0IsOENBQThDLHNEQUFrQjtBQUN2SCxxQ0FBcUMsc0RBQWtCLDBDQUEwQyxzREFBa0I7QUFDbkgscUNBQXFDLHNEQUFrQjtBQUN2RCxxQ0FBcUMsc0RBQWtCO0FBQ3ZEO0FBQ0EseUNBQXlDLHNEQUFrQjtBQUMzRCxvQkFBb0IsNkRBQWlCO0FBQ3JDO0FBQ0E7QUFDQSwwRkFBMEYsc0RBQWtCLDhDQUE4QyxpREFBYSwrQkFBK0IsaURBQWE7QUFDbk47QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxTQUFTLFVBQVU7QUFDdkQ7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELDBEQUFjO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0VBQWdFLGtFQUFzQjtBQUN0RjtBQUNBO0FBQ0Esa0ZBQWtGLDJLQUEySztBQUM3UDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQsaUVBQXFCO0FBQ2hGO0FBQ0E7QUFDQSw0REFBNEQ7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2RUFBNkUsc0RBQWtCO0FBQy9GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsaUVBQXFCO0FBQzVFO0FBQ0E7QUFDQSx3REFBd0Q7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiw2REFBaUI7QUFDaEQ7QUFDQTtBQUNBLHdCQUF3QixTQUFTLFVBQVU7QUFDM0M7QUFDQTtBQUNBLHFCQUFxQiwrREFBZTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQywwREFBYztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0Qsa0VBQXNCO0FBQzlFO0FBQ0E7QUFDQSwwRUFBMEUsMktBQTJLO0FBQ3JQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQStELGlFQUFxQjtBQUNwRjtBQUNBO0FBQ0EsZ0VBQWdFO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLGlEQUFpRCwwQkFBMEI7QUFDN0c7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQiwwREFBYztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxrRUFBc0I7QUFDOUQ7QUFDQTtBQUNBO0FBQ0Esa0VBQWtFLDJLQUEySztBQUM3TztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRDtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJGQUEyRixpREFBYSxFQUFFLG1EQUFlO0FBQ3pIO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxvTEFBb0w7QUFDOU47QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELE1BQU0sb0RBQVcsbUZBQW1GLDZDQUE2QztBQUNwTTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsTUFBTSxvREFBVyw2Q0FBNkM7QUFDakc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtFQUFrRSxpREFBYTtBQUMvRSx1Q0FBdUMsbURBQWU7QUFDdEQ7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGlMQUFpTDtBQUMvTTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxrREFBVSwwQkFBMEIsNENBQVE7QUFDbEYseUNBQXlDLHFEQUFhLDBCQUEwQiwrQ0FBVztBQUMzRiw4Q0FBOEMsc0RBQWMsMEJBQTBCLG9EQUFnQjtBQUN0Ryw4Q0FBOEMsMERBQWtCLDBCQUEwQixvREFBZ0I7QUFDMUcsOENBQThDLHFEQUFhLDBCQUEwQixvREFBZ0I7QUFDckc7QUFDQSwwRUFBMEUsRUFBRSx3REFBZSxPQUFPLDZIQUE2SCx5T0FBeU87QUFDeGMsMkVBQTJFO0FBQzNFO0FBQ0EsK0RBQStELDJLQUEySztBQUMxTztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsaUVBQXFCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLE1BQU0sb0RBQVcsbUZBQW1GLDZDQUE2QztBQUM1TDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsTUFBTSxvREFBVyx3QkFBd0I7QUFDeEU7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixxREFBaUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLG9FQUF3QjtBQUNwQyxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsNkRBQWE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIscUVBQXFCO0FBQ25ELHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4dEJQLGlCQUFpQixTQUFJLElBQUksU0FBSTtBQUM3Qiw0QkFBNEIsK0RBQStELGlCQUFpQjtBQUM1RztBQUNBLG9DQUFvQyxNQUFNLCtCQUErQixZQUFZO0FBQ3JGLG1DQUFtQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3hGLGdDQUFnQztBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUNzQztBQUMySjtBQUMzRjtBQUMvRjtBQUNQO0FBQ0E7QUFDQSxnQkFBZ0IsU0FBUyxNQUFNLGtCQUFrQjtBQUNqRCxxQkFBcUIsaURBQWE7QUFDbEM7QUFDQTtBQUNBLDBCQUEwQixpREFBYTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLDBDQUEwQyxxQkFBcUIsaUJBQWlCLDBCQUEwQixXQUFXLFdBQVc7QUFDNUk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGVBQWU7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLDJCQUEyQixxQkFBcUIsaUJBQWlCLDBCQUEwQixXQUFXLFdBQVc7QUFDN0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixlQUFlO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksY0FBYyxhQUFhO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGNBQWM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQSxZQUFZLGdGQUFnRjtBQUM1RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkdBQTJHLG9CQUFvQjtBQUMvSDtBQUNBLG9DQUFvQyxzREFBYztBQUNsRCx1Q0FBdUMseURBQWlCO0FBQ3hELGtGQUFrRiw0Q0FBUTtBQUMxRixrRkFBa0YsK0NBQVc7QUFDN0Y7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLHlEQUFpQjtBQUM1RCxzRkFBc0Ysb0RBQWdCO0FBQ3RHO0FBQ0E7QUFDQSxvREFBb0QsOERBQXNCO0FBQzFFLDBGQUEwRixvREFBZ0I7QUFDMUc7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLHdEQUFnQjtBQUMxRCxzRkFBc0Ysb0RBQWdCO0FBQ3RHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0EsZ0JBQWdCLFlBQVkseUJBQXlCLGtDQUFrQyxZQUFZLDJDQUEyQztBQUM5STtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5Qiw0Q0FBUTtBQUNqQyxzREFBc0QscURBQWlCO0FBQ3ZFO0FBQ0EsOEJBQThCLDRDQUFRO0FBQ3RDLG1EQUFtRCxxREFBaUIseUNBQXlDLHFEQUFpQjtBQUM5SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsOENBQVU7QUFDckMsMERBQTBELHFEQUFpQjtBQUMzRTtBQUNBLGdDQUFnQyw4Q0FBVTtBQUMxQyx1REFBdUQscURBQWlCLDRDQUE0QyxxREFBaUI7QUFDckk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGdCQUFnQjtBQUNyQztBQUNBLDRCQUE0QixxQkFBcUI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRUFBb0Usb0RBQWdCLEVBQUUsbURBQWU7QUFDckc7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDTztBQUNQO0FBQ0Esa0hBQWtILCtDQUFVO0FBQzVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QiwrQ0FBVTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixRQUFRO0FBQ2hDLDRFQUE0RSwrQ0FBVTtBQUN0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QiwrQ0FBVTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixRQUFRO0FBQ2hDLDRFQUE0RSwrQ0FBVTtBQUN0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUCxZQUFZLGlCQUFpQjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBLHlCQUF5Qix5Q0FBeUM7QUFDbEU7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLHlCQUF5QjtBQUNsRCx3QkFBd0IseUJBQXlCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNERBQTRELHVEQUF1RDtBQUNuSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsK0dBQStHO0FBQ2hKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbGlCOEg7QUFDOUU7QUFDOEI7QUFDNUM7QUFDM0I7QUFDUCxZQUFZLFNBQVMsTUFBTSxrQkFBa0I7QUFDN0MsaUJBQWlCLGlEQUFhO0FBQzlCO0FBQ0E7QUFDQSxzQkFBc0IsaURBQWE7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxvSEFBb0g7QUFDaEksWUFBWSxnRkFBZ0Y7QUFDNUY7QUFDQSwrQkFBK0IsK0NBQVU7QUFDekM7QUFDQTtBQUNBO0FBQ0EsNERBQTRELCtDQUFVO0FBQ3RFLHVCQUF1Qiw0REFBdUI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsZ0RBQVk7QUFDL0M7QUFDQTtBQUNBLG1DQUFtQyxnREFBWTtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsK0NBQVUsR0FBRywrQ0FBVTtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtRkFBbUYsbURBQWM7QUFDakcsdUdBQXVHLG1EQUFjO0FBQ3JIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHNCQUFzQjtBQUN0QyxnQkFBZ0IsbURBQW1EO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixtQkFBbUI7QUFDM0MsdUdBQXVHLGlEQUFZO0FBQ25IO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELCtDQUFVO0FBQzVELG9EQUFvRCwrQ0FBVTtBQUM5RDtBQUNBO0FBQ0E7QUFDQSw4R0FBOEcsaURBQVk7QUFDMUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsK0NBQVU7QUFDOUQsc0RBQXNELCtDQUFVO0FBQ2hFO0FBQ0EsOENBQThDLCtDQUFVLDJDQUEyQywrQ0FBVTtBQUM3RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLCtDQUErQywrQ0FBVSw0Q0FBNEMsK0NBQVU7QUFDL0c7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFGQUFxRixpREFBWTtBQUNqRztBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCwrQ0FBVTtBQUMxRCxrREFBa0QsK0NBQVU7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsbURBQWM7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsbURBQWM7QUFDckQsa0VBQWtFLCtDQUFVLGdFQUFnRSwrQ0FBVTtBQUN0SjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxtREFBYztBQUNyRCwrQ0FBK0MsK0NBQVUsNkNBQTZDLCtDQUFVO0FBQ2hIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQStELG1EQUFjO0FBQzdFO0FBQ0Esa0VBQWtFLCtDQUFVLCtIQUErSCwrQ0FBVTtBQUNyTixpRUFBaUUsbURBQWMsV0FBVyxPQUFPO0FBQ2pHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELCtDQUFVLG9EQUFvRCwrQ0FBVTtBQUMvSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFpRSxtREFBYyxXQUFXLFFBQVE7QUFDbEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsK0NBQVUsbURBQW1ELCtDQUFVO0FBQzlIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRUFBa0UsK0NBQVUsK0RBQStELCtDQUFVO0FBQ3JKO0FBQ0E7QUFDQSxnREFBZ0QsK0NBQVUsNENBQTRDLCtDQUFVO0FBQ2hIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELCtDQUFVO0FBQ3ZFLDZEQUE2RCwrQ0FBVTtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLHFHQUFxRztBQUNqSCxZQUFZLGdGQUFnRjtBQUM1RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxzQkFBc0I7QUFDbEMsWUFBWSxtREFBbUQ7QUFDL0Q7QUFDQTtBQUNBLDRCQUE0QiwrQ0FBVTtBQUN0QztBQUNBO0FBQ0E7QUFDQSxxRUFBcUUsb0RBQWU7QUFDcEYsZ0RBQWdELG1EQUFjO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLDREQUF1QjtBQUNqRCw2Q0FBNkMsMERBQXNCO0FBQ25FO0FBQ0E7QUFDQSxnQ0FBZ0MsK0NBQVU7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsaURBQWlELDBEQUFzQjtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCwwREFBc0I7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RCwrQ0FBVTtBQUN2RSw2REFBNkQsK0NBQVU7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixtQkFBbUI7QUFDdkM7QUFDQTtBQUNBLDhDQUE4QywrQ0FBVTtBQUN4RCxnREFBZ0QsK0NBQVU7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsK0NBQVUsMkNBQTJDLCtDQUFVO0FBQ3pHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLG9EQUFlO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsb0RBQWU7QUFDNUMsOERBQThELCtDQUFVLDhEQUE4RCwrQ0FBVTtBQUNoSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwRUFBMEUsK0NBQVUsdUZBQXVGLCtDQUFVO0FBQ3JMO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixvREFBZTtBQUM1QztBQUNBLDhEQUE4RCwrQ0FBVSw4REFBOEQsK0NBQVU7QUFDaEo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCxvREFBZTtBQUNyRTtBQUNBLDhEQUE4RCwrQ0FBVSwwSEFBMEgsK0NBQVU7QUFDNU07QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsK0NBQVUsNENBQTRDLCtDQUFVO0FBQzVHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOERBQThELCtDQUFVLCtEQUErRCwrQ0FBVTtBQUNqSjtBQUNBO0FBQ0EsNENBQTRDLCtDQUFVLDRDQUE0QywrQ0FBVTtBQUM1RztBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksZ0dBQWdHO0FBQzVHLFlBQVksNkdBQTZHO0FBQ3pIO0FBQ0E7QUFDQSx1QkFBdUIsK0NBQVU7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHlDQUF5QztBQUN6RDtBQUNBLG9EQUFvRCwrQ0FBVTtBQUM5RCw0QkFBNEIsK0NBQVU7QUFDdEMsd0RBQXdELCtDQUFVO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsMERBQXNCO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEVBQTBFLCtDQUFVO0FBQ3BGLHVEQUF1RCwrQ0FBVTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QywwREFBc0I7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwRUFBMEUsK0NBQVU7QUFDcEYsdURBQXVELCtDQUFVO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsNERBQXVCLDRCQUE0Qiw0REFBdUI7QUFDbkcsaURBQWlELDBEQUFzQjtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4RUFBOEUsK0NBQVU7QUFDeEYsMkRBQTJELCtDQUFVO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiw0REFBdUI7QUFDNUMsaURBQWlELDBEQUFzQjtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsOEVBQThFLCtDQUFVO0FBQ3hGLDJEQUEyRCwrQ0FBVTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtGQUFrRiw0REFBdUI7QUFDekcsaURBQWlELDBEQUFzQjtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEVBQThFLCtDQUFVO0FBQ3hGLDJEQUEyRCwrQ0FBVTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCwrQ0FBVTtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUCxZQUFZLFlBQVksMkJBQTJCLCtCQUErQjtBQUNsRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLHFEQUFxRDtBQUNwRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLHlCQUF5Qix1REFBdUQ7QUFDaEYsd0JBQXdCLFNBQVMseUVBQXlFLG1EQUFtRCw2REFBNkQscUdBQXFHO0FBQy9UO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLDZEQUFpQjtBQUNyRCx3QkFBd0IsYUFBYSwyQkFBMkIsY0FBYyx3Q0FBd0MsSUFBSTtBQUMxSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLDREQUF1QjtBQUN6RCxtREFBbUQsK0NBQVU7QUFDN0Q7QUFDQSw4QkFBOEIsK0NBQVU7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBLGdDQUFnQywrQ0FBVTtBQUMxQztBQUNBLDZCQUE2QixpREFBYTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0Qyw2REFBaUI7QUFDN0Q7QUFDQSxvQ0FBb0MsUUFBUTtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQywrQ0FBTztBQUN2QztBQUNBLHVEQUF1RDtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsYUFBYSwyREFBMkQ7QUFDM0csZ0NBQWdDLGdCQUFnQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLHlDQUF5QztBQUM1RSxtQ0FBbUMsYUFBYSxxREFBcUQ7QUFDckc7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsMENBQTBDO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCwrQ0FBVTtBQUM3RCwyREFBMkQsK0NBQVU7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrSEFBa0gsK0NBQVU7QUFDNUg7QUFDQTtBQUNBO0FBQ0EsOENBQThDLCtDQUFVO0FBQ3hEO0FBQ0E7QUFDQSxpRUFBaUUsK0NBQVU7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEMscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBLDBFQUEwRSxpREFBYTtBQUN2RjtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0VBQW9FLDBEQUFzQjtBQUMxRixtRUFBbUUsMERBQXNCO0FBQ3pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLCtDQUFVO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsK0NBQVU7QUFDdkU7QUFDQSxxSEFBcUgsK0NBQVU7QUFDL0g7QUFDQTtBQUNBLGtEQUFrRCwrQ0FBVTtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9FQUFvRSwrQ0FBVTtBQUM5RTtBQUNBLHNFQUFzRSwrQ0FBVTtBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBELCtDQUFVO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsaURBQWEsNEJBQTRCLGlEQUFhLG9DQUFvQyw0REFBdUI7QUFDbEo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsK0NBQVU7QUFDMUQ7QUFDQSxvREFBb0QsK0NBQVU7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0dBQXdHLCtDQUFVO0FBQ2xIO0FBQ0E7QUFDQSxrREFBa0QsK0NBQVU7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELCtDQUFVO0FBQzlEO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQSxnREFBZ0QsK0NBQVU7QUFDMUQ7QUFDQTtBQUNBO0FBQ0Esa0lBQWtJLCtDQUFVO0FBQzVJO0FBQ0E7QUFDQSxzREFBc0QsK0NBQVU7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLCtDQUFVO0FBQ3pEO0FBQ0E7QUFDQSwyREFBMkQsZ0RBQVk7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RCwrQ0FBVSxHQUFHLCtDQUFVO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtSUFBbUksaURBQVk7QUFDL0ksZ0hBQWdILGlEQUFZO0FBQzVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELCtDQUFVO0FBQzdELG9EQUFvRCwrQ0FBVTtBQUM5RCx3RUFBd0UsK0NBQVU7QUFDbEYsMEVBQTBFLCtDQUFVO0FBQ3BGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUVBQXlFLCtDQUFVO0FBQ25GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBFQUEwRSwrQ0FBVTtBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkdBQTJHLCtDQUFVO0FBQ3JIO0FBQ0E7QUFDQTtBQUNBLDZHQUE2RywrQ0FBVTtBQUN2SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0dBQW9HLCtDQUFVO0FBQzlHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEZBQTRGLCtDQUFVO0FBQ3RHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsNkRBQWlCO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEMsaUNBQWlDO0FBQ2pDLHVDQUF1QyxhQUFhLHFEQUFxRDtBQUN6RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzRUFBc0UsaURBQWE7QUFDbkY7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsYUFBYSwrREFBK0Q7QUFDbkgsb0NBQW9DLCtDQUErQztBQUNuRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQywrQ0FBVTtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZHQUE2RywrQ0FBVTtBQUN2SDtBQUNBO0FBQ0Esa0RBQWtELCtDQUFVO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RCwrQ0FBVTtBQUNuRTtBQUNBO0FBQ0Esd0RBQXdELCtDQUFVO0FBQ2xFO0FBQ0E7QUFDQSxpRUFBaUUsK0NBQVU7QUFDM0U7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELCtDQUFVO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IscUJBQXFCO0FBQzdDO0FBQ0E7QUFDQSxZQUFZLGdCQUFnQixrQkFBa0IsdUNBQXVDLHFCQUFxQixrQkFBa0I7QUFDNUg7QUFDQTtBQUNBLGlCQUFpQixpREFBYSx3Q0FBd0MsMERBQXNCO0FBQzVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLDZEQUFpQjtBQUN2QztBQUNBO0FBQ0EsZ0JBQWdCLGFBQWEscURBQXFEO0FBQ2xGLGdEQUFnRCxpREFBYTtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsaURBQWE7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsbUpBQW1KO0FBQ3hLLG9CQUFvQiw4R0FBOEc7QUFDbEk7QUFDQTtBQUNPO0FBQ1Asa0NBQWtDLGlEQUFhO0FBQy9DO0FBQ087QUFDUCxrQ0FBa0MsaURBQWE7QUFDL0M7QUFDTztBQUNQLGtDQUFrQyxpREFBYTtBQUMvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2p0Q087QUFDQTtBQUNBO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDTztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxnREFBZ0Q7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxzQ0FBc0M7QUFDaEM7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsNEJBQTRCO0FBQ3RCO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLGdDQUFnQztBQUMxQjtBQUNQLHNCQUFzQixzRUFBc0U7QUFDNUYsb0JBQW9CLHNFQUFzRTtBQUMxRixrQkFBa0Isc0VBQXNFO0FBQ3hGLGdCQUFnQixzRUFBc0U7QUFDdEYsc0JBQXNCLHVFQUF1RTtBQUM3RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxnREFBZ0Q7QUFDOUQsY0FBYyxrREFBa0Q7QUFDaEUsY0FBYywyQ0FBMkM7QUFDekQ7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMseUJBQXlCO0FBQ3ZDLGNBQWMsMEJBQTBCO0FBQ3hDO0FBQ0EsS0FBSztBQUNMLHlCQUF5QixxRUFBcUU7QUFDOUY7QUFDQTtBQUNBLGtCQUFrQixxRUFBcUU7QUFDdkY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IscUNBQXFDO0FBQzNELHNCQUFzQixtQ0FBbUM7QUFDekQsc0JBQXNCLHFDQUFxQztBQUMzRDtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsdUNBQXVDO0FBQzdELHNCQUFzQixxQ0FBcUM7QUFDM0Qsc0JBQXNCLHVDQUF1QztBQUM3RDtBQUNBLGFBQWE7QUFDYixvQkFBb0IscUVBQXFFO0FBQ3pGLFNBQVM7QUFDVDtBQUNBLHNCQUFzQixxRUFBcUU7QUFDM0YscUJBQXFCLHFFQUFxRTtBQUMxRixzQkFBc0IscUVBQXFFO0FBQzNGO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsb0NBQW9DO0FBQ3pELFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsb0NBQW9DO0FBQ3pELFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLHdEQUF3RDtBQUNsRDtBQUNQO0FBQ0E7QUFDQTtBQUNBLENBQUMsb0NBQW9DO0FBQzlCO0FBQ1A7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3TGdHO0FBQ3pGO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQSxvQkFBb0IsWUFBWSxFQUFFLDZDQUFTLENBQUM7QUFDNUMsbUJBQW1CLHFCQUFxQixFQUFFLDZDQUFTLENBQUM7QUFDcEQsbUJBQW1CLG1CQUFtQixFQUFFLDZDQUFTLENBQUM7QUFDbEQsbUJBQW1CLGlCQUFpQixFQUFFLDZDQUFTLENBQUM7QUFDaEQsbUJBQW1CLGVBQWUsRUFBRSw2Q0FBUyxDQUFDO0FBQzlDLG1CQUFtQixrQkFBa0IsRUFBRSw2Q0FBUyxDQUFDO0FBQ2pELG1CQUFtQixxQkFBcUIsRUFBRSw2Q0FBUyxDQUFDO0FBQ3BELG1CQUFtQixXQUFXLEVBQUUsNkNBQVMsQ0FBQztBQUMxQyxtQkFBbUIscUJBQXFCLEVBQUUsNkNBQVMsQ0FBQztBQUNwRCxvQkFBb0Isd0JBQXdCO0FBQzVDO0FBQ0E7QUFDTztBQUNQLGtDQUFrQyxFQUFFLHlEQUFxQjtBQUN6RCw4QkFBOEIsNkNBQVM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0EsZ0JBQWdCLFFBQVEsRUFBRSxrREFBYyxDQUFDO0FBQ3pDLGdCQUFnQixRQUFRLEVBQUUsa0RBQWMsQ0FBQztBQUN6QyxnQkFBZ0IsUUFBUSxFQUFFLDZDQUFTLENBQUM7QUFDcEMsZ0JBQWdCLE1BQU0sRUFBRSxrREFBYyxDQUFDO0FBQ3ZDLGdCQUFnQixNQUFNLEVBQUUsa0RBQWMsQ0FBQztBQUN2QyxnQkFBZ0IsTUFBTTtBQUN0QjtBQUNBO0FBQ087QUFDUCw4QkFBOEIsNkNBQVM7QUFDdkM7QUFDQSw2Q0FBNkMsa0RBQWM7QUFDM0QsMkNBQTJDLGtEQUFjO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDTztBQUNQLDhCQUE4Qiw2Q0FBUztBQUN2QztBQUNBLDZDQUE2QyxrREFBYztBQUMzRCwyQ0FBMkMsa0RBQWM7QUFDekQ7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQSxnQkFBZ0IsUUFBUSxFQUFFLGtEQUFjLENBQUM7QUFDekMsZ0JBQWdCLFFBQVEsRUFBRSxrREFBYyxDQUFDO0FBQ3pDLGdCQUFnQixRQUFRO0FBQ3hCO0FBQ0E7QUFDTztBQUNQLDhCQUE4QixrREFBYztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBLGdCQUFnQix3QkFBd0I7QUFDeEM7QUFDQSxvQkFBb0Isa0RBQWMsQ0FBQyxFQUFFLFlBQVk7QUFDakQ7QUFDQTtBQUNBO0FBQ087QUFDUCw4QkFBOEIsdURBQW1CO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ087QUFDUDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNoS087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsa0NBQWtDOzs7Ozs7O1VDZG5DO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvLi9zcmMvbWFpbi9tYWluLnRzIiwid2VicGFjazovL2RyYXctc3RhaXJzLy4vc3JjL21haW4vdG9vbHMvRHJhd1N0YWlyc1Rvb2wvY29uc3RzLnRzIiwid2VicGFjazovL2RyYXctc3RhaXJzLy4vc3JjL21haW4vdG9vbHMvRHJhd1N0YWlyc1Rvb2wvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvLi9zcmMvbWFpbi90b29scy9EcmF3U3RhaXJzVG9vbC9tZXNoVXRpbHMudHMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvLi9zcmMvbWFpbi90b29scy9EcmF3U3RhaXJzVG9vbC90ZW1wTWVzaFV0aWxzLnRzIiwid2VicGFjazovL2RyYXctc3RhaXJzLy4vc3JjL21haW4vdG9vbHMvRHJhd1N0YWlyc1Rvb2wvdHlwZXMudHMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvLi9zcmMvbWFpbi90b29scy9EcmF3U3RhaXJzVG9vbC91dGlscy50cyIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy8uL3NyYy9tYWluL3R5cGVzLnRzIiwid2VicGFjazovL2RyYXctc3RhaXJzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2RyYXctc3RhaXJzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2RyYXctc3RhaXJzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuaW1wb3J0IHsgZHJhd1N0YWlyc1Rvb2wgfSBmcm9tIFwiLi90b29scy9EcmF3U3RhaXJzVG9vbC9pbmRleFwiO1xyXG5pbXBvcnQgeyBpc0tHcm91cEluc3RhbmNlIH0gZnJvbSBcIi4vdG9vbHMvRHJhd1N0YWlyc1Rvb2wvdXRpbHNcIjtcclxuaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi90eXBlc1wiO1xyXG5jb25zdCBwbHVnaW5VSSA9IGFwcC5nZXRQbHVnaW5VSSgpO1xyXG5wbHVnaW5VSS5yZXNpemUoMzYwLCA3MDApO1xyXG5wbHVnaW5VSS5tb3VudCgpO1xyXG5sZXQgYWN0aXZhdGVkQ3VzdG9tVG9vbDtcclxuZnVuY3Rpb24gb25VSU1lc3NhZ2UoZGF0YSkge1xyXG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS50eXBlID09PSBNZXNzYWdlVHlwZS5EcmF3U3RhaXJWaWV3TW91bnRlZCkge1xyXG4gICAgICAgICAgICAgICAgb25QbHVnaW5TdGFydFVwKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSBNZXNzYWdlVHlwZS5BY3RpdmF0ZURyYXdTdGFpcnNUb29sKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoZGF0YS50eXBlID09PSAnYWN0aXZhdGVTdHJhaWdodFN0YWlyc1Rvb2wnIHx8IGRhdGEudHlwZSA9PT0gJ2FjdGl2YXRlQ2lyY3VsYXJTdGFpcnNUb29sJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGl2YXRlZEN1c3RvbVRvb2wgIT09IGRyYXdTdGFpcnNUb29sKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLmFjdGl2YXRlQ3VzdG9tVG9vbChkcmF3U3RhaXJzVG9vbCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZhdGVkQ3VzdG9tVG9vbCA9IGRyYXdTdGFpcnNUb29sO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gZHJhd1N0YWlyc1Rvb2wuY2hhbmdlQ29tcG9uZW50VHlwZShkYXRhLmNvbXBvbmVudFR5cGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gTWVzc2FnZVR5cGUuRGVBY3RpdmF0ZURyYXdTdGFpcnNUb29sKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB9IGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gJ2RlQWN0aXZhdGVTdHJhaWdodFN0YWlyc1Rvb2wnIHx8IGRhdGEudHlwZSA9PT0gJ2RlQWN0aXZhdGVDaXJjdWxhclN0YWlyc1Rvb2wnKSB7XHJcbiAgICAgICAgICAgICAgICBkZUFjdGl2YXRlRHJhd1N0YWlyc1Rvb2woKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09IE1lc3NhZ2VUeXBlLlN0YWlyUGFyYW1DaGFuZ2VkQnlJbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgKGFjdGl2YXRlZEN1c3RvbVRvb2wgPT09IGRyYXdTdGFpcnNUb29sKSB7XHJcbiAgICAgICAgICAgICAgICBkcmF3U3RhaXJzVG9vbC5jaGFuZ2VTdGFpclBhcmFtKGRhdGEuc3RhaXJQYXJhbSwgZGF0YS5jaGFuZ2VQYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gTWVzc2FnZVR5cGUuUGFyYW1DaGFuZ2VkQnlJbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgKGFjdGl2YXRlZEN1c3RvbVRvb2wgPT09IGRyYXdTdGFpcnNUb29sKSB7XHJcbiAgICAgICAgICAgICAgICBkcmF3U3RhaXJzVG9vbC5jaGFuZ2VDb21wb25lbnRQYXJhbShkYXRhLmNvbXBvbmVudFBhcmFtLCBkYXRhLmNoYW5nZVBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSBNZXNzYWdlVHlwZS5Gb2N1c0NvbXBvbmVudEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoYWN0aXZhdGVkQ3VzdG9tVG9vbCA9PT0gZHJhd1N0YWlyc1Rvb2wpIHtcclxuICAgICAgICAgICAgICAgIGRyYXdTdGFpcnNUb29sLmZvY3VzQ29tcG9uZW50KGRhdGEuY29tcG9uZW50SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gTWVzc2FnZVR5cGUuUmVtb3ZlQ29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoYWN0aXZhdGVkQ3VzdG9tVG9vbCA9PT0gZHJhd1N0YWlyc1Rvb2wpIHtcclxuICAgICAgICAgICAgICAgIGRyYXdTdGFpcnNUb29sLnJlbW92ZUNvbXBvbmVudChkYXRhLmNvbXBvbmVudEluZGV4KTtcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIGNsb3NlUGx1Z2luKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGRlQWN0aXZhdGVEcmF3U3RhaXJzVG9vbCgpIHtcclxuICAgIGFjdGl2YXRlZEN1c3RvbVRvb2wgPSB1bmRlZmluZWQ7XHJcbiAgICBhcHAuZGVhY3RpdmF0ZUN1c3RvbVRvb2woZHJhd1N0YWlyc1Rvb2wsIGZhbHNlKTtcclxufVxyXG5wbHVnaW5VSS5vbk1lc3NhZ2Uob25VSU1lc3NhZ2UpO1xyXG5jb25zdCBzZWxlY3Rpb24gPSBhcHAuZ2V0U2VsZWN0aW9uKCk7XHJcbnNlbGVjdGlvbi5hZGRPYnNlcnZlcih7XHJcbiAgICBvblNlbGVjdGlvbkNoYW5nZTogKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGFsbEVudGl0aWVzID0gc2VsZWN0aW9uLmdldEFsbEVudGl0aWVzKCk7XHJcbiAgICAgICAgaWYgKGFsbEVudGl0aWVzLmxlbmd0aCA9PT0gMSAmJiBpc0tHcm91cEluc3RhbmNlKGFsbEVudGl0aWVzWzBdKSkge1xyXG4gICAgICAgICAgICBkcmF3U3RhaXJzVG9vbC5jbGVhclRlbXBTaGFwZXMoKTtcclxuICAgICAgICAgICAgZHJhd1N0YWlyc1Rvb2wuc2V0TW9kZWwoYWxsRW50aXRpZXNbMF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhbGxFbnRpdGllcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc3QgZWRpdFBhdGggPSBhcHAuZ2V0QWN0aXZlRGVzaWduKCkuZ2V0RWRpdFBhdGgoKTtcclxuICAgICAgICAgICAgY29uc3QgZWRpdE1vZGVsID0gZHJhd1N0YWlyc1Rvb2wuZ2V0RWRpdE1vZGVsKCk7XHJcbiAgICAgICAgICAgIGlmICghZWRpdE1vZGVsIHx8IChlZGl0UGF0aC5ldmVyeShpbnN0YW5jZSA9PiBpbnN0YW5jZS5nZXRLZXkoKSAhPT0gZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZUtleSAmJiBbLi4uZWRpdE1vZGVsLmNoaWxkLnZhbHVlcygpXS5ldmVyeShjb21wID0+IGNvbXAuaW5zdGFuY2VLZXkgIT09IGluc3RhbmNlLmdldEtleSgpKSkpKSB7XHJcbiAgICAgICAgICAgICAgICBkcmF3U3RhaXJzVG9vbC5jbGVhclRlbXBTaGFwZXMoKTtcclxuICAgICAgICAgICAgICAgIGlmIChhY3RpdmF0ZWRDdXN0b21Ub29sICE9PSBkcmF3U3RhaXJzVG9vbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuUHJvcGVydGllc1Zpc2libGUsIHByb3BlcnRpZXNWaXNpYmxlOiBmYWxzZSB9LCAnKicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuZnVuY3Rpb24gb25QbHVnaW5TdGFydFVwKCkge1xyXG4gICAgY29uc3QgYWxsRW50aXRpZXMgPSBzZWxlY3Rpb24uZ2V0QWxsRW50aXRpZXMoKTtcclxuICAgIGlmIChhbGxFbnRpdGllcy5sZW5ndGggPT09IDEgJiYgaXNLR3JvdXBJbnN0YW5jZShhbGxFbnRpdGllc1swXSkpIHtcclxuICAgICAgICBkcmF3U3RhaXJzVG9vbC5zZXRNb2RlbChhbGxFbnRpdGllc1swXSk7XHJcbiAgICB9XHJcbiAgICBhcHAuYWRkT2JzZXJ2ZXIoe1xyXG4gICAgICAgIG9uUGx1Z2luQ2xvc2VkOiAoKSA9PiB7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbk1vZGVsQ2hhbmdlZCxcclxuICAgIH0pO1xyXG59XHJcbmZ1bmN0aW9uIG9uTW9kZWxDaGFuZ2VkKGNoYW5nZXMpIHtcclxuICAgIGNvbnN0IGRlbGV0ZWQgPSBjaGFuZ2VzLmRlbGV0ZWQ7XHJcbiAgICBjb25zdCBlZGl0TW9kZWwgPSBkcmF3U3RhaXJzVG9vbC5nZXRFZGl0TW9kZWwoKTtcclxuICAgIGlmICgoZGVsZXRlZCA9PT0gbnVsbCB8fCBkZWxldGVkID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkZWxldGVkLmxlbmd0aCkgJiYgZWRpdE1vZGVsKSB7XHJcbiAgICAgICAgaWYgKGRlbGV0ZWQuc29tZShkZWxldGVHcm91cCA9PiBlZGl0TW9kZWwucGFyZW50LmRlZmluaXRpb25LZXkgPT09IGRlbGV0ZUdyb3VwLmdldEtleSgpKSkge1xyXG4gICAgICAgICAgICBkcmF3U3RhaXJzVG9vbC5jbGVhckVkaXRNb2RlbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnREaXJlY3Rpb25UeXBlLCBEZWZhdWx0Q29tcG9uZW50UGFyYW0gfSBmcm9tIFwiLi90eXBlc1wiO1xyXG5leHBvcnQgY29uc3QgZHVtbXlNYXRyaXg0ID0gR2VvbUxpYi5jcmVhdGVJZGVudGl0eU1hdHJpeDQoKTtcclxuZXhwb3J0IGNvbnN0IGR1bW15VmVjdG9yM2QgPSBHZW9tTGliLmNyZWF0ZVZlY3RvcjNkKDAsIDAsIDEpO1xyXG5leHBvcnQgY29uc3QgZHVtbXlQb2ludDNkID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKDAsIDAsIDApO1xyXG5leHBvcnQgY29uc3QgRGlyZWN0aW9uWiA9IEdlb21MaWIuY3JlYXRlVmVjdG9yM2QoMCwgMCwgMSk7XHJcbmV4cG9ydCBjb25zdCBEaXJlY3Rpb25YID0gR2VvbUxpYi5jcmVhdGVWZWN0b3IzZCgxLCAwLCAwKTtcclxuLy8gY29uc3QgSGVpZ2h0VG9sZXJhbmNlOiBudW1iZXIgPSA1O1xyXG5leHBvcnQgY29uc3QgTGVuZ3RoVG9sZXJhbmNlID0gMTA7XHJcbmV4cG9ydCBjb25zdCBEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSA9IE1hdGguUEkgLyAzNjtcclxuZXhwb3J0IGNvbnN0IEFuZ2xlVG9sZXJhbmNlID0gTWF0aC5QSSAvIDE4MDtcclxuZXhwb3J0IGNvbnN0IFN0ZXBDb3VudExpbWl0ID0gODA7XHJcbi8vIGNvbnN0IERlZmF1bHRCb2FyZFRoaWNrbmVzcyA9IDUwO1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW1wdHlTZWdtZW50KCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBzdGFydDogZHVtbXlQb2ludDNkLFxyXG4gICAgICAgIGVuZDogZHVtbXlQb2ludDNkLFxyXG4gICAgICAgIHN0YXJ0TG9ja2VkOiBmYWxzZSxcclxuICAgICAgICBlbmRMb2NrZWQ6IGZhbHNlLFxyXG4gICAgICAgIHN0YXJ0SGVpZ2h0OiAwLFxyXG4gICAgICAgIGVuZEhlaWdodDogMCxcclxuICAgICAgICBzdGFpclNoYXBlOiB7XHJcbiAgICAgICAgICAgIHN0ZXBDb3VudDogMCxcclxuICAgICAgICAgICAgdmVydGljZXM6IFtdLFxyXG4gICAgICAgICAgICB0ZW1wTGluZXM6IFtdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbW9sZFNoYXBlOiB7XHJcbiAgICAgICAgICAgIHN0ZXBDb3VudDogMCxcclxuICAgICAgICAgICAgdmVydGljZXM6IFtdLFxyXG4gICAgICAgICAgICB0ZW1wTGluZXM6IFtdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29ybmVyU2hhcGU6IHtcclxuICAgICAgICAgICAgc3RlcENvdW50OiAwLFxyXG4gICAgICAgICAgICB2ZXJ0aWNlczogW10sXHJcbiAgICAgICAgICAgIHRlbXBMaW5lczogW10sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb3JuZXJNb2xkU2hhcGU6IHtcclxuICAgICAgICAgICAgc3RlcENvdW50OiAwLFxyXG4gICAgICAgICAgICB2ZXJ0aWNlczogW10sXHJcbiAgICAgICAgICAgIHRlbXBMaW5lczogW10sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBuZXh0Q29tcG9uZW50czogQXJyYXkuZnJvbSh7IGxlbmd0aDogNiB9LCBfID0+IG5ldyBTZXQoKSksXHJcbiAgICAgICAgcGFyYW06IE9iamVjdC5hc3NpZ24oe30sIERlZmF1bHRDb21wb25lbnRQYXJhbSksXHJcbiAgICAgICAgY29tcG9uZW50RGlyZWN0aW9uVHlwZTogQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5Gcm9udCxcclxuICAgIH07XHJcbn1cclxuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5pbXBvcnQgeyBDb21wb25lbnRUeXBlLCBQYXJhbUtleSwgU3RhcnRFbmRLZXksIEJhc2VMaW5lU2VnM2RLZXksIFN0YWlyTW9kZWxLZXksIENvbXBvbmVudFBhcmFtVHlwZSwgU3RhaXJNb2RlbFZhbHVlLCBDaXJjbGVUYW5nZW50S2V5LCBEZWZhdWx0U3RhaXJQYXJhbSwgQmFzZUNvbXBvbmVudEtleSB9IGZyb20gXCIuL3R5cGVzXCI7XHJcbmltcG9ydCB7IGdlbmVyYXRlSGFuZHJhaWxTaGFwZSwgZ2VuZXJhdGVTaGFwZSwgaXNDaXJjdWxhclN0YWlyIH0gZnJvbSBcIi4vdGVtcE1lc2hVdGlsc1wiO1xyXG5pbXBvcnQgeyBidWlsZENvbXBvbmVudEluc3RhbmNlLCBidWlsZEhhbmRyYWlsSW5zdGFuY2UsIGJ1aWxkU2VnbWVudFJlbGF0aW9ucywgY2hhbmdlU3RhaXJVcHdhcmQsIGdlbmVyYXRlTWVzaGVzLCBnZXRTZWdtZW50QnlJbmRleCB9IGZyb20gXCIuL21lc2hVdGlsc1wiO1xyXG5pbXBvcnQgeyBwYXJzZUJhc2VDb21wb25lbnQsIHBhcnNlTGluZVNlZzNkLCBwYXJzZVBhcmFtLCBwYXJzZVN0YXJ0RW5kLCBwYXJzZVZlY3RvcjNkIH0gZnJvbSBcIi4vdXRpbHNcIjtcclxuaW1wb3J0IHsgZ2V0RW1wdHlTZWdtZW50IH0gZnJvbSBcIi4vY29uc3RzXCI7XHJcbmltcG9ydCB7IGRlQWN0aXZhdGVEcmF3U3RhaXJzVG9vbCB9IGZyb20gXCIuLi8uLi8uLi9tYWluL21haW5cIjtcclxuaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vbWFpbi90eXBlc1wiO1xyXG5jb25zdCBkZXNpZ24gPSBhcHAuZ2V0QWN0aXZlRGVzaWduKCk7XHJcbmNvbnN0IHNlbGVjdGlvbiA9IGFwcC5nZXRTZWxlY3Rpb24oKTtcclxuY29uc3QgcGx1Z2luVUkgPSBhcHAuZ2V0UGx1Z2luVUkoKTtcclxuY29uc3QgYXBwVmlldyA9IGFwcC5nZXRBY3RpdmVWaWV3KCk7XHJcbmNvbnN0IHRvb2xIZWxwZXIgPSBhcHAuZ2V0VG9vbEhlbHBlcigpO1xyXG5jb25zdCBEZWZhdWx0Rm9jdXNlZENvbXBvbmVudEluZGV4ID0gLTE7XHJcbmV4cG9ydCBjbGFzcyBEcmF3U3RhaXJzVG9vbCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAvLyBwcml2YXRlIGNvbXBvbmVudFBhcmFtOiBDb21wb25lbnRQYXJhbSA9IHsgLi4uRGVmYXVsdENvbXBvbmVudFBhcmFtIH07XHJcbiAgICAgICAgdGhpcy5kcmF3aW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggPSBEZWZhdWx0Rm9jdXNlZENvbXBvbmVudEluZGV4O1xyXG4gICAgICAgIHRoaXMuc2VnbWVudHMgPSBbXTtcclxuICAgICAgICB0aGlzLnN0YWlyUGFyYW0gPSBEZWZhdWx0U3RhaXJQYXJhbTtcclxuICAgIH1cclxuICAgIG9uVG9vbEFjdGl2ZSgpIHtcclxuICAgICAgICB0b29sSGVscGVyLnNldEV4Y2x1ZGVJbmZlcmVuY2VUeXBlcyhbXHJcbiAgICAgICAgICAgIEtFbnRpdHlUeXBlLkZhY2UsIEtFbnRpdHlUeXBlLkVkZ2UsIEtFbnRpdHlUeXBlLkF1eGlsaWFyeUJvdW5kZWRDdXJ2ZSwgS0VudGl0eVR5cGUuQXV4aWxpYXJ5TGluZSwgS0VudGl0eVR5cGUuQXV4aWxpYXJ5VmVydGV4LFxyXG4gICAgICAgICAgICBLRW50aXR5VHlwZS5Hcm91cEluc3RhbmNlLCBLRW50aXR5VHlwZS5WZXJ0ZXgsIEtBcmNoRmFjZVR5cGUuTm9uUGxhbmFyLCBLQXJjaEZhY2VUeXBlLlBsYW5hcixcclxuICAgICAgICBdKTtcclxuICAgICAgICBjb25zdCBmaXJzdFNlZ21lbnQgPSBnZXRFbXB0eVNlZ21lbnQoKTtcclxuICAgICAgICBmaXJzdFNlZ21lbnQuc3RhcnRMb2NrZWQgPSBmYWxzZTtcclxuICAgICAgICAvLyB0aGlzLnN0YWlyUGFyYW0gPSBEZWZhdWx0U3RhaXJQYXJhbTtcclxuICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLkRyYXdTdGFpck1vZGVsU2V0dGxlZCwgY29tcG9uZW50UGFyYW1zOiBbZmlyc3RTZWdtZW50LnBhcmFtXSwgc3RhaXJQYXJhbTogdGhpcy5zdGFpclBhcmFtLCBuZXdTdGFpcjogdHJ1ZSB9LCAnKicpO1xyXG4gICAgICAgIHRoaXMuc2VnbWVudHMgPSBbZmlyc3RTZWdtZW50XTtcclxuICAgICAgICB0aGlzLmRyYXdpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2xlYXJUZW1wU2hhcGVzKCk7XHJcbiAgICAgICAgdGhpcy5lZGl0TW9kZWwgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggPSAwO1xyXG4gICAgfVxyXG4gICAgb25Ub29sRGVhY3RpdmUoKSB7XHJcbiAgICAgICAgdG9vbEhlbHBlci5zZXRFeGNsdWRlSW5mZXJlbmNlVHlwZXMoW10pO1xyXG4gICAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgICAgICBpZiAodGhpcy5lZGl0TW9kZWwpIHtcclxuICAgICAgICAgICAgc2VsZWN0aW9uLmFkZChbdGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLkxlYXZlRHJhd1N0YWlyc1Rvb2wgfSwgJyonKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVBY3RpdmF0ZURyYXdTdGFpcnNUb29sKCk7XHJcbiAgICB9XHJcbiAgICBvbk1vdXNlTW92ZShldmVudCwgaW5mZXJlbmNlUmVzdWx0KSB7XHJcbiAgICAgICAgdmFyIF9hLCBfYjtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnb25Nb3VzZU1vdmUnKTtcclxuICAgICAgICBpZiAoaW5mZXJlbmNlUmVzdWx0KSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnN0IHsgc3RhcnRXaWR0aCwgZW5kV2lkdGgsIHBsYXRmb3JtVGhpY2tuZXNzIH0gPSB0aGlzLmNvbXBvbmVudFBhcmFtO1xyXG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IGluZmVyZW5jZVJlc3VsdC5wb3NpdGlvbjtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VnbWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0U2VnbWVudCA9IHRoaXMuc2VnbWVudHNbdGhpcy5zZWdtZW50cy5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdsYXN0U2VnbWVudC5zdGFydExvY2tlZCcsIGxhc3RTZWdtZW50LnN0YXJ0TG9ja2VkKTtcclxuICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LnBhcmFtLm1vZGVsRWRpdGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxhc3RTZWdtZW50LnN0YXJ0TG9ja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuZW5kID0gcG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3VGVtcENvbXBvbmVudChsYXN0U2VnbWVudCwgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VnbWVudHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcmV2U2VnbWVudCA9IHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4ID09PSBsYXN0U2VnbWVudC5wYXJhbS5pbmRleCA/IHRoaXMuc2VnbWVudHNbdGhpcy5zZWdtZW50cy5sZW5ndGggLSAyXSA6IGdldFNlZ21lbnRCeUluZGV4KHRoaXMuc2VnbWVudHMsIHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbXVzdCBiZSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgocHJldlNlZ21lbnQgPT09IG51bGwgfHwgcHJldlNlZ21lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHByZXZTZWdtZW50LnBhcmFtLnR5cGUpID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IG1vbGRTaGFwZTogeyB2ZXJ0aWNlcywgdGVtcExpbmVzIH0gfSA9IHByZXZTZWdtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCgoX2EgPSBsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGluZTNkSW5kZXgpICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2U2VnbWVudC5uZXh0Q29tcG9uZW50cy5mb3JFYWNoKGluZHMgPT4gaW5kcy5kZWxldGUobGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjbG9zZXN0UG9pbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWluRGlzdGFuY2UgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVzLmZvckVhY2goKGxpbmUsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGluZVNlZzNkID0gR2VvbUxpYi5jcmVhdGVMaW5lU2VnbWVudDNkKHZlcnRpY2VzW2xpbmVbMF1dLCB2ZXJ0aWNlc1tsaW5lWzFdXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlUG9pbnQgPSBsaW5lU2VnM2QuZ2V0Q2xvc2VzdFBvaW50KHBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJEaXN0YW5jZSA9IHRoZVBvaW50LmRpc3RhbmNlVG8ocG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY2xvc2VzdFBvaW50IHx8IGN1ckRpc3RhbmNlIDwgbWluRGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluRGlzdGFuY2UgPSBjdXJEaXN0YW5jZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFBvaW50ID0gdGhlUG9pbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LnN0YXJ0ID0gY2xvc2VzdFBvaW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsYXN0U2VnbWVudC5iYXNlTGluZVNlZzNkID0geyBzdGFydDogdmVydGljZXNbbGluZVswXV0sIGVuZDogdmVydGljZXNbbGluZVsxXV0gfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudCA9IHsgY29tcG9uZW50SW5kZXg6IHByZXZTZWdtZW50LnBhcmFtLmluZGV4LCBsaW5lM2RJbmRleDogaW5kZXgsIGxpbmUzZDogeyBzdGFydDogdmVydGljZXNbbGluZVswXV0sIGVuZDogdmVydGljZXNbbGluZVsxXV0gfSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgcHJldlNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleCh0aGlzLnNlZ21lbnRzLCBsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoKF9iID0gbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmxpbmUzZEluZGV4KSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldlNlZ21lbnQubmV4dENvbXBvbmVudHNbbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleF0uYWRkKGxhc3RTZWdtZW50LnBhcmFtLmluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1BpY2tTdGFydFRlbXBTaGFwZXMocG9zaXRpb24sIGxhc3RTZWdtZW50LnN0YXJ0LCBsYXN0U2VnbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LnN0YXJ0ID0gcG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGxhc3RTZWdtZW50LnBhcmFtLnR5cGUgPT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSAmJiAhbGFzdFNlZ21lbnQucGFyYW0ucGxhdGZvcm1MZW5ndGhMb2NrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlBhcmFtQ2hhbmdlZEJ5RHJhdywgY29tcG9uZW50UGFyYW06IE9iamVjdC5hc3NpZ24oe30sIGxhc3RTZWdtZW50LnBhcmFtKSB9LCAnKicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25MQnV0dG9uVXAoZXZlbnQsIGluZmVyZW5jZVJlc3VsdCkge1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnb25MQnV0dG9uVXAnKTtcclxuICAgICAgICBpZiAoaW5mZXJlbmNlUmVzdWx0KSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnN0IHBvc2l0aW9uID0gaW5mZXJlbmNlUmVzdWx0LnBvc2l0aW9uO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWdtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RTZWdtZW50ID0gdGhpcy5zZWdtZW50c1t0aGlzLnNlZ21lbnRzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxhc3RTZWdtZW50LnN0YXJ0TG9ja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3B1c2ggc2VnbWVudCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgc3RhcnQsIGVuZCwgcGFyYW06IHsgdHlwZSB9LCBjaXJjbGVUYW5nZW50IH0gPSBsYXN0U2VnbWVudDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5DaXJjdWxhclN0YWlyICYmICFjaXJjbGVUYW5nZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LmNpcmNsZVRhbmdlbnQgPSBlbmQuc3VidHJhY3RlZChzdGFydCkubm9ybWFsaXplZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuZW5kTG9ja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdFBhcmFtID0gbGFzdFNlZ21lbnQucGFyYW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRTZWdtZW50ID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBnZXRFbXB0eVNlZ21lbnQoKSksIHsgc3RhcnQ6IGxhc3RTZWdtZW50LmVuZCwgZW5kOiBsYXN0U2VnbWVudC5lbmQsIHN0YXJ0TG9ja2VkOiBsYXN0UGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSA/IGZhbHNlIDogdHJ1ZSwgc3RhcnRIZWlnaHQ6IGxhc3RTZWdtZW50LmVuZEhlaWdodCwgZW5kSGVpZ2h0OiBsYXN0U2VnbWVudC5lbmRIZWlnaHQsIHBhcmFtOiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGxhc3RQYXJhbSksIHsgaW5kZXg6IGxhc3RQYXJhbS5pbmRleCArIDEsIHN0YXJ0V2lkdGg6IGxhc3RQYXJhbS5lbmRXaWR0aCwgb2Zmc2V0V2lkdGg6IDAsIHR5cGU6IGxhc3RQYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtID8gQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyIDogQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSwgcGxhdGZvcm1MZW5ndGhMb2NrZWQ6IGZhbHNlIH0pIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IG1vbGRTaGFwZTogeyB2ZXJ0aWNlcywgdGVtcExpbmVzIH0gfSA9IGxhc3RTZWdtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxhc3RTZWdtZW50LmJhc2VMaW5lU2VnM2QgPSB7IHN0YXJ0OiB2ZXJ0aWNlc1swXSwgZW5kOiB2ZXJ0aWNlc1sxXSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudCA9IHsgbGluZTNkOiB7IHN0YXJ0OiB2ZXJ0aWNlc1swXSwgZW5kOiB2ZXJ0aWNlc1sxXSB9IH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiYXNlU2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHRoaXMuc2VnbWVudHMsIGxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhc2VTZWdtZW50ICYmICgoX2EgPSBsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGluZTNkSW5kZXgpICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXNlU2VnbWVudC5uZXh0Q29tcG9uZW50c1tsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50LmxpbmUzZEluZGV4XS5hZGQobGFzdFBhcmFtLmluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXh0U2VnbWVudC5iYXNlTGluZVNlZzNkID0geyBzdGFydDogdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0sIGVuZDogdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0gfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRTZWdtZW50LnN0YXJ0TG9ja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5uZXh0Q29tcG9uZW50c1swXS5hZGQobmV4dFNlZ21lbnQucGFyYW0uaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTZWdtZW50LmJhc2VDb21wb25lbnQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRJbmRleDogbGFzdFBhcmFtLmluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZTNkSW5kZXg6IGxhc3RQYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtID8gdGVtcExpbmVzLmxlbmd0aCAtIDEgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZTNkOiB7IHN0YXJ0OiB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXSwgZW5kOiB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RQYXJhbS5tb2RlbEVkaXRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlBhcmFtQ2hhbmdlZEJ5RHJhdywgY29tcG9uZW50UGFyYW06IGxhc3RQYXJhbSB9LCAnKicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlZ21lbnRzLnB1c2gobmV4dFNlZ21lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggIT09IGxhc3RQYXJhbS5pbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9jdXNlZFNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleCh0aGlzLnNlZ21lbnRzLCB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9jdXNlZFNlZ21lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdUZW1wQ29tcG9uZW50KGZvY3VzZWRTZWdtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCA9IG5leHRTZWdtZW50LnBhcmFtLmluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLkNvbXBvbmVudEFkZGVkLCBjb21wb25lbnRQYXJhbTogT2JqZWN0LmFzc2lnbih7fSwgbmV4dFNlZ21lbnQucGFyYW0pIH0sICcqJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuc3RhcnRMb2NrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJQaWNrU3RhcnRUZW1wU2hhcGVzKGxhc3RTZWdtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdUZW1wQ29tcG9uZW50KGxhc3RTZWdtZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGRyYXdQaWNrU3RhcnRUZW1wU2hhcGVzKHBvc2l0aW9uLCBjbG9zZXN0UG9pbnQsIHRoZVNlZ21lbnQpIHtcclxuICAgICAgICBpZiAodGhlU2VnbWVudC5waWNrU3RhcnRUZW1wU2hhcGVJZCkge1xyXG4gICAgICAgICAgICBhcHBWaWV3LmNsZWFyVGVtcG9yYXJ5U2hhcGVzQnlJZHMoW3RoZVNlZ21lbnQucGlja1N0YXJ0VGVtcFNoYXBlSWRdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNsb3Nlc3RQb2ludCkge1xyXG4gICAgICAgICAgICBjb25zdCBwaWNrU3RhcnRUZW1wU2hhcGVJZCA9IGFwcFZpZXcuZHJhd0xpbmVzKFtwb3NpdGlvbiwgY2xvc2VzdFBvaW50XSwgeyBjb2xvcjogeyByOiAwLCBnOiAwLCBiOiAyNTUgfSwgZGVwdGhUZXN0OiB0cnVlLCBwYXR0ZXJuOiBLTGluZVBhdHRlcm4uRGFzaCwgZ2FwU2l6ZTogNTAsIGRhc2hTaXplOiA1MCB9KTtcclxuICAgICAgICAgICAgaWYgKHBpY2tTdGFydFRlbXBTaGFwZUlkID09PSBudWxsIHx8IHBpY2tTdGFydFRlbXBTaGFwZUlkID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwaWNrU3RhcnRUZW1wU2hhcGVJZC5pZCkge1xyXG4gICAgICAgICAgICAgICAgdGhlU2VnbWVudC5waWNrU3RhcnRUZW1wU2hhcGVJZCA9IHBpY2tTdGFydFRlbXBTaGFwZUlkLmlkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xlYXJQaWNrU3RhcnRUZW1wU2hhcGVzKHRoZVNlZ21lbnQpIHtcclxuICAgICAgICBpZiAodGhlU2VnbWVudC5waWNrU3RhcnRUZW1wU2hhcGVJZCkge1xyXG4gICAgICAgICAgICBhcHBWaWV3LmNsZWFyVGVtcG9yYXJ5U2hhcGVzQnlJZHMoW3RoZVNlZ21lbnQucGlja1N0YXJ0VGVtcFNoYXBlSWRdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkcmF3VGVtcENvbXBvbmVudCh0aGVTZWdtZW50LCBmb2N1c2VkID0gZmFsc2UsIGRyYXdIYW5kcmFpbCA9IGZhbHNlKSB7XHJcbiAgICAgICAgdmFyIF9hLCBfYjtcclxuICAgICAgICBpZiAodGhlU2VnbWVudC5zdGFydExvY2tlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlU2VnbWVudFNoYXBlKHRoZVNlZ21lbnQsIHRoaXMuZHJhd2luZyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgc3RhaXJTaGFwZTogeyB2ZXJ0aWNlczogc3RhaXJWZXJ0aWNlcywgdGVtcExpbmVzOiBzdGFpclRlbXBMaW5lcyB9LCBtb2xkU2hhcGU6IHsgdmVydGljZXM6IG1vbGRWZXJ0aWNlcywgdGVtcExpbmVzOiBtb2xkVGVtcExpbmVzIH0sIGNvcm5lclNoYXBlOiB7IHZlcnRpY2VzOiBjb3JuZXJWZXJ0aWNlcywgdGVtcExpbmVzOiBjb3JuZXJUZW1wTGluZXMgfSwgY29ybmVyTW9sZFNoYXBlOiB7IHZlcnRpY2VzOiBjb3JuZXJNb2xkVmVydGljZXMsIHRlbXBMaW5lczogY29ybmVyTW9sZFRlbXBMaW5lcyB9LCB9ID0gdGhlU2VnbWVudDtcclxuICAgICAgICAgICAgY29uc3QgdGVtcExpbmVQb2ludHMgPSBbXTtcclxuICAgICAgICAgICAgY29uc3QgbW9sZFRlbXBMaW5lUG9pbnRzID0gW107XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRyYXdpbmcpIHtcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgc3RhaXJUZW1wTGluZSBvZiBzdGFpclRlbXBMaW5lcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lUG9pbnRzLnB1c2goW3N0YWlyVmVydGljZXNbc3RhaXJUZW1wTGluZVswXV0sIHN0YWlyVmVydGljZXNbc3RhaXJUZW1wTGluZVsxXV1dKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgY29ybmVyVGVtcExpbmUgb2YgY29ybmVyVGVtcExpbmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVQb2ludHMucHVzaChbY29ybmVyVmVydGljZXNbY29ybmVyVGVtcExpbmVbMF1dLCBjb3JuZXJWZXJ0aWNlc1tjb3JuZXJUZW1wTGluZVsxXV1dKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG1vbGRUZW1wTGluZSBvZiBtb2xkVGVtcExpbmVzKSB7XHJcbiAgICAgICAgICAgICAgICBtb2xkVGVtcExpbmVQb2ludHMucHVzaChbbW9sZFZlcnRpY2VzW21vbGRUZW1wTGluZVswXV0sIG1vbGRWZXJ0aWNlc1ttb2xkVGVtcExpbmVbMV1dXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChjb25zdCBjb3JuZXJNb2xkVGVtcExpbmUgb2YgY29ybmVyTW9sZFRlbXBMaW5lcykge1xyXG4gICAgICAgICAgICAgICAgbW9sZFRlbXBMaW5lUG9pbnRzLnB1c2goW2Nvcm5lck1vbGRWZXJ0aWNlc1tjb3JuZXJNb2xkVGVtcExpbmVbMF1dLCBjb3JuZXJNb2xkVmVydGljZXNbY29ybmVyTW9sZFRlbXBMaW5lWzFdXV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgoX2EgPSB0aGVTZWdtZW50LnRlbXBTaGFwZUlkKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBhcHBWaWV3LmNsZWFyVGVtcG9yYXJ5U2hhcGVzQnlJZHModGhlU2VnbWVudC50ZW1wU2hhcGVJZCk7XHJcbiAgICAgICAgICAgICAgICB0aGVTZWdtZW50LnRlbXBTaGFwZUlkID0gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgZHJhd1RlbXBMaW5lc0Z1bmMgPSBmb2N1c2VkID8gYXBwVmlldy5kcmF3RmxhdExpbmVzLmJpbmQoYXBwVmlldykgOiBhcHBWaWV3LmRyYXdQb2x5bGluZXMuYmluZChhcHBWaWV3KTtcclxuICAgICAgICAgICAgaWYgKHRlbXBMaW5lUG9pbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc3QgY29sb3JWYWx1ZSA9IGZvY3VzZWQgPyAyNTUgOiAxNTU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0ZW1wU2hhcGVJZCA9IGRyYXdUZW1wTGluZXNGdW5jKHRlbXBMaW5lUG9pbnRzLCB7IGNvbG9yOiB7IHI6IDI1NSwgZzogMCwgYjogMCB9LCBkZXB0aFRlc3Q6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRlbXBTaGFwZUlkID09PSBudWxsIHx8IHRlbXBTaGFwZUlkID09PSB2b2lkIDAgPyB2b2lkIDAgOiB0ZW1wU2hhcGVJZC5pZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGVTZWdtZW50LnRlbXBTaGFwZUlkID0gWy4uLnRlbXBTaGFwZUlkLmlkc107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG1vbGRUZW1wTGluZVBvaW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1vbGRUZW1wU2hhcGVJZCA9IGRyYXdUZW1wTGluZXNGdW5jKG1vbGRUZW1wTGluZVBvaW50cywgeyBjb2xvcjogeyByOiAwLCBnOiAyNTUsIGI6IDAgfSwgZGVwdGhUZXN0OiB0aGlzLmRyYXdpbmcgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobW9sZFRlbXBTaGFwZUlkID09PSBudWxsIHx8IG1vbGRUZW1wU2hhcGVJZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogbW9sZFRlbXBTaGFwZUlkLmlkcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoX2IgPSB0aGVTZWdtZW50LnRlbXBTaGFwZUlkKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoZVNlZ21lbnQudGVtcFNoYXBlSWQucHVzaCguLi5tb2xkVGVtcFNoYXBlSWQuaWRzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoZVNlZ21lbnQudGVtcFNoYXBlSWQgPSBbLi4ubW9sZFRlbXBTaGFwZUlkLmlkc107XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkcmF3SGFuZHJhaWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0hhbmRyYWlscygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZHJhd0hhbmRyYWlscygpIHtcclxuICAgICAgICB2YXIgX2EsIF9iO1xyXG4gICAgICAgIGNvbnN0IHByZXZIYW5kcmFpbFRlbXBTaGFwZUlkcyA9IChfYSA9IHRoaXMuaGFuZHJhaWxDb2xsZWN0aW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudGVtcFNoYXBlSWQ7XHJcbiAgICAgICAgdGhpcy5nZW5lcmF0ZUhhbmRyYWlsU2hhcGUoKTtcclxuICAgICAgICBpZiAocHJldkhhbmRyYWlsVGVtcFNoYXBlSWRzID09PSBudWxsIHx8IHByZXZIYW5kcmFpbFRlbXBTaGFwZUlkcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcHJldkhhbmRyYWlsVGVtcFNoYXBlSWRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBhcHBWaWV3LmNsZWFyVGVtcG9yYXJ5U2hhcGVzQnlJZHMocHJldkhhbmRyYWlsVGVtcFNoYXBlSWRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgaGFuZHJhaWxzID0gKF9iID0gdGhpcy5oYW5kcmFpbENvbGxlY3Rpb24pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5oYW5kcmFpbHM7XHJcbiAgICAgICAgY29uc3QgdGVtcExpbmVQb2ludHMgPSBbXTtcclxuICAgICAgICBpZiAodGhpcy5oYW5kcmFpbENvbGxlY3Rpb24gJiYgKGhhbmRyYWlscyA9PT0gbnVsbCB8fCBoYW5kcmFpbHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGhhbmRyYWlscy5sZW5ndGgpKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgeyByYWlsLCBjb2x1bW5zIH0gb2YgaGFuZHJhaWxzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhaWwubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmFpbFBvaW50ID0gcmFpbFtpXTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByYWlsTmV4dFBvaW50ID0gcmFpbFtpICsgMV07XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVQb2ludHMucHVzaChbcmFpbFBvaW50LCByYWlsTmV4dFBvaW50XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0ZW1wTGluZVBvaW50cy5wdXNoKC4uLmNvbHVtbnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGhhbmRyYWlsVGVtcFNoYXBlSWRzID0gYXBwVmlldy5kcmF3UG9seWxpbmVzKHRlbXBMaW5lUG9pbnRzLCB7IGNvbG9yOiB7IHI6IDAsIGc6IDAsIGI6IDI1NSB9LCBkZXB0aFRlc3Q6IGZhbHNlLCBwYXR0ZXJuOiBLTGluZVBhdHRlcm4uRGFzaCB9KTtcclxuICAgICAgICAgICAgaWYgKGhhbmRyYWlsVGVtcFNoYXBlSWRzID09PSBudWxsIHx8IGhhbmRyYWlsVGVtcFNoYXBlSWRzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBoYW5kcmFpbFRlbXBTaGFwZUlkcy5pZHMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZHJhaWxDb2xsZWN0aW9uLnRlbXBTaGFwZUlkID0gaGFuZHJhaWxUZW1wU2hhcGVJZHMuaWRzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xlYXJUZW1wU2hhcGVzKHRoZVNlZ21lbnQpIHtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgaWYgKHRoZVNlZ21lbnQpIHtcclxuICAgICAgICAgICAgaWYgKChfYSA9IHRoZVNlZ21lbnQudGVtcFNoYXBlSWQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGFwcFZpZXcuY2xlYXJUZW1wb3JhcnlTaGFwZXNCeUlkcyh0aGVTZWdtZW50LnRlbXBTaGFwZUlkKTtcclxuICAgICAgICAgICAgICAgIHRoZVNlZ21lbnQudGVtcFNoYXBlSWQgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYXBwVmlldy5jbGVhclRlbXBvcmFyeVNoYXBlcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZvY3VzQ29tcG9uZW50KGNvbXBvbmVudEluZGV4KSB7XHJcbiAgICAgICAgdmFyIF9hLCBfYjtcclxuICAgICAgICBpZiAodGhpcy5zZWdtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc3QgbGFzdFNlZ21lbnQgPSB0aGlzLnNlZ21lbnRzW3RoaXMuc2VnbWVudHMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgIGNvbnN0IGxhc3RTZWdtZW50SW5kZXggPSBsYXN0U2VnbWVudC5wYXJhbS5pbmRleDtcclxuICAgICAgICAgICAgLy8gaWYgKGNvbXBvbmVudEluZGV4ICE9PSB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCkge1xyXG4gICAgICAgICAgICBjb25zdCBuZXdGb2N1c2VkU2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHRoaXMuc2VnbWVudHMsIGNvbXBvbmVudEluZGV4KTtcclxuICAgICAgICAgICAgY29uc3Qgb2xkRm9jdXNlZFNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleCh0aGlzLnNlZ21lbnRzLCB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCk7XHJcbiAgICAgICAgICAgIGlmIChuZXdGb2N1c2VkU2VnbWVudCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZHJhd2luZyAmJiAhbGFzdFNlZ21lbnQuZW5kTG9ja2VkICYmIGNvbXBvbmVudEluZGV4ICE9PSBsYXN0U2VnbWVudEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBwYXJhbTogeyB0eXBlOiBuZXdGb2N1c2VkVHlwZSB9LCBtb2xkU2hhcGU6IHsgdmVydGljZXM6IG5ld0ZvY3VzZWRWZXJ0aWNlcywgdGVtcExpbmVzOiBuZXdGb2N1c2VkVGVtcExpbmVzIH0gfSA9IG5ld0ZvY3VzZWRTZWdtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgc3RhcnQgfSA9IGxhc3RTZWdtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJQaWNrU3RhcnRUZW1wU2hhcGVzKGxhc3RTZWdtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyVGVtcFNoYXBlcyhsYXN0U2VnbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0ZvY3VzZWRUeXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbGRGb2N1c2VkU2VnbWVudCAmJiBvbGRGb2N1c2VkU2VnbWVudCAhPT0gbmV3Rm9jdXNlZFNlZ21lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9sZEZvY3VzZWRTZWdtZW50Lm5leHRDb21wb25lbnRzLmZvckVhY2goaW5kcyA9PiBpbmRzLmRlbGV0ZShsYXN0U2VnbWVudC5wYXJhbS5pbmRleCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoKF9hID0gbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxpbmUzZEluZGV4KSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdGb2N1c2VkU2VnbWVudC5uZXh0Q29tcG9uZW50cy5mb3JFYWNoKGluZHMgPT4gaW5kcy5kZWxldGUobGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2xvc2VzdFBvaW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWluRGlzdGFuY2UgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdGb2N1c2VkVGVtcExpbmVzLmZvckVhY2goKGxpbmUsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsaW5lU2VnM2QgPSBHZW9tTGliLmNyZWF0ZUxpbmVTZWdtZW50M2QobmV3Rm9jdXNlZFZlcnRpY2VzW2xpbmVbMF1dLCBuZXdGb2N1c2VkVmVydGljZXNbbGluZVsxXV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlUG9pbnQgPSBsaW5lU2VnM2QuZ2V0Q2xvc2VzdFBvaW50KHN0YXJ0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1ckRpc3RhbmNlID0gdGhlUG9pbnQuZGlzdGFuY2VUbyhzdGFydCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNsb3Nlc3RQb2ludCB8fCBjdXJEaXN0YW5jZSA8IG1pbkRpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluRGlzdGFuY2UgPSBjdXJEaXN0YW5jZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0UG9pbnQgPSB0aGVQb2ludDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5zdGFydCA9IGNsb3Nlc3RQb2ludDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsYXN0U2VnbWVudC5iYXNlTGluZVNlZzNkID0geyBzdGFydDogbmV3Rm9jdXNlZFZlcnRpY2VzW2xpbmVbMF1dLCBlbmQ6IG5ld0ZvY3VzZWRWZXJ0aWNlc1tsaW5lWzFdXSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQgPSB7IGNvbXBvbmVudEluZGV4OiBuZXdGb2N1c2VkU2VnbWVudC5wYXJhbS5pbmRleCwgbGluZTNkSW5kZXg6IGluZGV4LCBsaW5lM2Q6IHsgc3RhcnQ6IG5ld0ZvY3VzZWRWZXJ0aWNlc1tsaW5lWzBdXSwgZW5kOiBuZXdGb2N1c2VkVmVydGljZXNbbGluZVsxXV0gfSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCgoX2IgPSBsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IubGluZTNkSW5kZXgpICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0ZvY3VzZWRTZWdtZW50Lm5leHRDb21wb25lbnRzW2xhc3RTZWdtZW50LmJhc2VDb21wb25lbnQubGluZTNkSW5kZXhdLmFkZChsYXN0U2VnbWVudC5wYXJhbS5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuc3RhcnRMb2NrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuY2lyY2xlVGFuZ2VudCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuc3RhcnRIZWlnaHQgPSBuZXdGb2N1c2VkU2VnbWVudC5lbmRIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1BpY2tTdGFydFRlbXBTaGFwZXMoc3RhcnQsIGxhc3RTZWdtZW50LnN0YXJ0LCBsYXN0U2VnbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5ld0ZvY3VzZWRTZWdtZW50Lm5leHRDb21wb25lbnRzWzBdLnNpemUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LnN0YXJ0ID0gbmV3Rm9jdXNlZFNlZ21lbnQuZW5kLmNsb25lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5zdGFydExvY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5zdGFydEhlaWdodCA9IG5ld0ZvY3VzZWRTZWdtZW50LmVuZEhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxhc3RTZWdtZW50LmJhc2VMaW5lU2VnM2QgPSB7IHN0YXJ0OiBuZXdGb2N1c2VkVmVydGljZXNbbmV3Rm9jdXNlZFZlcnRpY2VzLmxlbmd0aCAtIDFdLCBlbmQ6IG5ld0ZvY3VzZWRWZXJ0aWNlc1tuZXdGb2N1c2VkVmVydGljZXMubGVuZ3RoIC0gMl0gfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQgPSB7IGNvbXBvbmVudEluZGV4OiBuZXdGb2N1c2VkU2VnbWVudC5wYXJhbS5pbmRleCwgbGluZTNkSW5kZXg6IDAsIGxpbmUzZDogeyBzdGFydDogbmV3Rm9jdXNlZFZlcnRpY2VzW25ld0ZvY3VzZWRWZXJ0aWNlcy5sZW5ndGggLSAxXSwgZW5kOiBuZXdGb2N1c2VkVmVydGljZXNbbmV3Rm9jdXNlZFZlcnRpY2VzLmxlbmd0aCAtIDJdIH0gfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0ZvY3VzZWRTZWdtZW50Lm5leHRDb21wb25lbnRzWzBdLmFkZChsYXN0U2VnbWVudC5wYXJhbS5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5jaXJjbGVUYW5nZW50ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3VGVtcENvbXBvbmVudChsYXN0U2VnbWVudCwgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgbGFzdFNlZ21lbnQuc3RhcnRMb2NrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGxhc3RTZWdtZW50LmNpcmNsZVRhbmdlbnQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoKHRoaXMuZHJhd2luZyAmJiBjb21wb25lbnRJbmRleCAhPT0gbGFzdFNlZ21lbnRJbmRleCkgfHwgIXRoaXMuZHJhd2luZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBDb21wb25lbnQobmV3Rm9jdXNlZFNlZ21lbnQsIHRoaXMuZHJhd2luZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCgodGhpcy5kcmF3aW5nICYmIHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4ICE9PSBsYXN0U2VnbWVudEluZGV4KSB8fCAoIXRoaXMuZHJhd2luZyAmJiB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCAhPT0gY29tcG9uZW50SW5kZXgpKSAmJiBvbGRGb2N1c2VkU2VnbWVudCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZHJhd2luZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBDb21wb25lbnQob2xkRm9jdXNlZFNlZ21lbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhclRlbXBTaGFwZXMob2xkRm9jdXNlZFNlZ21lbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggPSBjb21wb25lbnRJbmRleDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZW1vdmVDb21wb25lbnQoY29tcG9uZW50SW5kZXgpIHtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VnbWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoZUluZGV4ID0gdGhpcy5zZWdtZW50cy5maW5kSW5kZXgoc2VnID0+IHNlZy5wYXJhbS5pbmRleCA9PT0gY29tcG9uZW50SW5kZXgpO1xyXG4gICAgICAgICAgICBpZiAodGhlSW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGhlU2VnbWVudCA9IHRoaXMuc2VnbWVudHNbdGhlSW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZHJhd2luZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoX2EgPSB0aGVTZWdtZW50LnRlbXBTaGFwZUlkKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcFZpZXcuY2xlYXJUZW1wb3JhcnlTaGFwZXNCeUlkcyh0aGVTZWdtZW50LnRlbXBTaGFwZUlkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3SGFuZHJhaWxzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmVkaXRNb2RlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoZUluc3RhbmNlID0gdGhpcy5lZGl0TW9kZWwuY2hpbGQuZ2V0KGNvbXBvbmVudEluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhlSW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZWwuY2hpbGQuZGVsZXRlKGNvbXBvbmVudEluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzaWduLnJlbW92ZUdyb3VwSW5zdGFuY2UodGhlSW5zdGFuY2UuaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuc2VnbWVudHMuc3BsaWNlKHRoZUluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgIC8vIHRvIGNsZWFyIHJlbGF0aW9uc1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYmFzZUNvbXBvbmVudCA9IHRoZVNlZ21lbnQuYmFzZUNvbXBvbmVudDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgodGhpcy5zZWdtZW50cywgYmFzZUNvbXBvbmVudCA9PT0gbnVsbCB8fCBiYXNlQ29tcG9uZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBiYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcclxuICAgICAgICAgICAgICAgIGlmIChiYXNlU2VnbWVudCAmJiAoYmFzZUNvbXBvbmVudCA9PT0gbnVsbCB8fCBiYXNlQ29tcG9uZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBiYXNlQ29tcG9uZW50LmxpbmUzZEluZGV4KSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgdGhlSW5kID0gYmFzZVNlZ21lbnQubmV4dENvbXBvbmVudHNbYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleF0uZmluZEluZGV4KGkgPT4gaSA9PT0gdGhlU2VnbWVudC5wYXJhbS5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKHRoZUluZCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZVNlZ21lbnQubmV4dENvbXBvbmVudHNbYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleF0uZGVsZXRlKHRoZVNlZ21lbnQucGFyYW0uaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IG5leHRDb21wb25lbnRzID0gdGhlU2VnbWVudC5uZXh0Q29tcG9uZW50cztcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbmV4dFNlZ21lbnRJbmRzIG9mIG5leHRDb21wb25lbnRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRTZWdtZW50SW5kcy5zaXplKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbmV4dFNlZ0luZCBvZiBuZXh0U2VnbWVudEluZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgodGhpcy5zZWdtZW50cywgbmV4dFNlZ0luZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFNlZ21lbnQgJiYgbmV4dFNlZ21lbnQuYmFzZUNvbXBvbmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTZWdtZW50LmJhc2VDb21wb25lbnQuY29tcG9uZW50SW5kZXggPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFNlZ21lbnQuYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlZ21lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCA9PT0gY29tcG9uZW50SW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggPSB0aGlzLnNlZ21lbnRzW3RoaXMuc2VnbWVudHMubGVuZ3RoIC0gMV0ucGFyYW0uaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZWwgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2hhbmdlU3RhaXJQYXJhbShzdGFpclBhcmFtLCBjaGFuZ2VQYXJhbXMpIHtcclxuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2c7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFpclBhcmFtID0gc3RhaXJQYXJhbTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnNlZ21lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGxhc3RTZWdtZW50ID0gdGhpcy5zZWdtZW50c1t0aGlzLnNlZ21lbnRzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICBpZiAoY2hhbmdlUGFyYW1zLmluZGV4T2YoQ29tcG9uZW50UGFyYW1UeXBlLkhvcml6b250YWxTdGVwKSA+IC0xIHx8IGNoYW5nZVBhcmFtcy5pbmRleE9mKENvbXBvbmVudFBhcmFtVHlwZS5WZXJ0aWNhbFN0ZXApID4gLTEgfHxcclxuICAgICAgICAgICAgICAgIGNoYW5nZVBhcmFtcy5pbmRleE9mKENvbXBvbmVudFBhcmFtVHlwZS5TdGFydFdpZHRoKSA+IC0xIHx8IGNoYW5nZVBhcmFtcy5pbmRleE9mKENvbXBvbmVudFBhcmFtVHlwZS5FbmRXaWR0aCkgPiAtMSB8fFxyXG4gICAgICAgICAgICAgICAgY2hhbmdlUGFyYW1zLmluZGV4T2YoQ29tcG9uZW50UGFyYW1UeXBlLlVwd2FyZCkgPiAtMSB8fFxyXG4gICAgICAgICAgICAgICAgY2hhbmdlUGFyYW1zLmluZGV4T2YoQ29tcG9uZW50UGFyYW1UeXBlLlBsYXRmb3JtVGhpY2tuZXNzKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVHZW5lcmF0ZVNlZ21lbnRzID0gdGhpcy5zZWdtZW50cztcclxuICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VQYXJhbXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuVXB3YXJkKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlU3RhaXJVcHdhcmQocmVHZW5lcmF0ZVNlZ21lbnRzWzBdLCByZUdlbmVyYXRlU2VnbWVudHMsIHN0YWlyUGFyYW0udXB3YXJkLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlR2VuZXJhdGVTZWdtZW50cyA9IHRoaXMuc2VnbWVudHMuZmlsdGVyKHNlZyA9PiBjaGFuZ2VQYXJhbXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuUGxhdGZvcm1UaGlja25lc3MpID4gLTEgPyBzZWcucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSA6IHNlZy5wYXJhbS50eXBlICE9PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChyZUdlbmVyYXRlU2VnbWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCByZUdlbmVyYXRlU2VnbWVudCBvZiByZUdlbmVyYXRlU2VnbWVudHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBjaGFuZ2VQYXJhbSBvZiBjaGFuZ2VQYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlR2VuZXJhdGVTZWdtZW50LnBhcmFtW2NoYW5nZVBhcmFtXSA9IHN0YWlyUGFyYW1bY2hhbmdlUGFyYW1dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvcGVyYXRpb25TdWNjZXNzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZHJhd2luZyAmJiB0aGlzLmVkaXRNb2RlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNpZ24uc3RhcnRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKHlpZWxkIGRlc2lnbi5hY3RpdmF0ZUdyb3VwSW5zdGFuY2UodGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlKSkuaXNTdWNjZXNzO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHJlR2VuZXJhdGVTZWdtZW50IG9mIHJlR2VuZXJhdGVTZWdtZW50cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kcmF3aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdUZW1wQ29tcG9uZW50KHJlR2VuZXJhdGVTZWdtZW50LCByZUdlbmVyYXRlU2VnbWVudC5wYXJhbS5pbmRleCA9PT0gdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggJiYgcmVHZW5lcmF0ZVNlZ21lbnQucGFyYW0uaW5kZXggIT09IGxhc3RTZWdtZW50LnBhcmFtLmluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmVkaXRNb2RlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBwYXJhbTogeyBpbmRleCB9IH0gPSByZUdlbmVyYXRlU2VnbWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoZUluc3RhbmNlID0gdGhpcy5lZGl0TW9kZWwuY2hpbGQuZ2V0KGluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGVJbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVTZWdtZW50U2hhcGUocmVHZW5lcmF0ZVNlZ21lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoZU1lc2hlcyA9IGdlbmVyYXRlTWVzaGVzKFtyZUdlbmVyYXRlU2VnbWVudF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGVNZXNoZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb25TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBkZXNpZ24ucmVtb3ZlR3JvdXBJbnN0YW5jZSh0aGVJbnN0YW5jZS5pbnN0YW5jZSkuaXNTdWNjZXNzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvblN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdJbnN0YW5jZSA9IGJ1aWxkQ29tcG9uZW50SW5zdGFuY2UocmVHZW5lcmF0ZVNlZ21lbnQsIHRoaXMuc2VnbWVudHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICEhbmV3SW5zdGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0luc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsLmNoaWxkLnNldChpbmRleCwgeyBpbnN0YW5jZTogbmV3SW5zdGFuY2UsIGRlZmluaXRpb25LZXk6ICgoX2EgPSBuZXdJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmdldEtleSgpKSB8fCAnJywgaW5zdGFuY2VLZXk6IG5ld0luc3RhbmNlLmdldEtleSgpIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5kcmF3aW5nICYmIHRoaXMuZWRpdE1vZGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoX2IgPSB0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbikgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmhhbmRyYWlscy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRyYWlsSW5zdGFuY2UgPSB5aWVsZCBidWlsZEhhbmRyYWlsSW5zdGFuY2UodGhpcy5zdGFpclBhcmFtLCAoX2MgPSB0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbikgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmhhbmRyYWlscyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBoYW5kcmFpbEluc3RhbmNlICE9PSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGFuZHJhaWxJbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsLmhhbmRyYWlsID0geyBpbnN0YW5jZTogaGFuZHJhaWxJbnN0YW5jZSwgZGVmaW5pdGlvbktleTogKChfZCA9IGhhbmRyYWlsSW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCkpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5nZXRLZXkoKSkgfHwgJycsIGluc3RhbmNlS2V5OiBoYW5kcmFpbEluc3RhbmNlLmdldEtleSgpIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKHlpZWxkIGRlc2lnbi5kZWFjdGl2YXRlR3JvdXBJbnN0YW5jZSgpKS5pc1N1Y2Nlc3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb25TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNpZ24uY29tbWl0T3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNpZ24uYWJvcnRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb24uYWRkKFt0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2VdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5kcmF3aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd0hhbmRyYWlscygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjaGFuZ2VQYXJhbXMubGVuZ3RoID09PSAxICYmIGNoYW5nZVBhcmFtc1swXS5zdGFydHNXaXRoKENvbXBvbmVudFBhcmFtVHlwZS5IYW5kcmFpbCkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYXdpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdIYW5kcmFpbHMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZWRpdE1vZGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChfZSA9IHRoaXMuaGFuZHJhaWxDb2xsZWN0aW9uKSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2UuaGFuZHJhaWxzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3BlcmF0aW9uU3VjY2VzcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2lnbi5zdGFydE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAoeWllbGQgZGVzaWduLmFjdGl2YXRlR3JvdXBJbnN0YW5jZSh0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2UpKS5pc1N1Y2Nlc3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRyYWlsSW5zdGFuY2UgPSB5aWVsZCBidWlsZEhhbmRyYWlsSW5zdGFuY2UodGhpcy5zdGFpclBhcmFtLCAoX2YgPSB0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbikgPT09IG51bGwgfHwgX2YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9mLmhhbmRyYWlscyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGhhbmRyYWlsSW5zdGFuY2UgIT09IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhbmRyYWlsSW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsLmhhbmRyYWlsID0geyBpbnN0YW5jZTogaGFuZHJhaWxJbnN0YW5jZSwgZGVmaW5pdGlvbktleTogKChfZyA9IGhhbmRyYWlsSW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCkpID09PSBudWxsIHx8IF9nID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZy5nZXRLZXkoKSkgfHwgJycsIGluc3RhbmNlS2V5OiBoYW5kcmFpbEluc3RhbmNlLmdldEtleSgpIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKHlpZWxkIGRlc2lnbi5kZWFjdGl2YXRlR3JvdXBJbnN0YW5jZSgpKS5pc1N1Y2Nlc3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb25TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNpZ24uY29tbWl0T3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNpZ24uYWJvcnRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb24uYWRkKFt0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2VdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGNoYW5nZUNvbXBvbmVudFBhcmFtKGNvbXBvbmVudFBhcmFtLCBjaGFuZ2VQYXJhbXMpIHtcclxuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2Q7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnNlZ21lbnRzLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgY29uc3QgdGhlU2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHRoaXMuc2VnbWVudHMsIGNvbXBvbmVudFBhcmFtLmluZGV4KTtcclxuICAgICAgICAgICAgY29uc3QgbGFzdFNlZ21lbnQgPSB0aGlzLnNlZ21lbnRzW3RoaXMuc2VnbWVudHMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgIGlmICh0aGVTZWdtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IHBhcmFtOiB7IGluZGV4IH0gfSA9IHRoZVNlZ21lbnQ7XHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnRQYXJhbS5tb2RlbEVkaXRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhlU2VnbWVudC5wYXJhbSA9IGNvbXBvbmVudFBhcmFtO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc0NpcmN1bGFyU3RhaXIodGhlU2VnbWVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGVTZWdtZW50LmNpcmNsZVRhbmdlbnQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kcmF3aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3VGVtcENvbXBvbmVudCh0aGVTZWdtZW50LCB0aGVTZWdtZW50LnBhcmFtLmluZGV4ICE9PSBsYXN0U2VnbWVudC5wYXJhbS5pbmRleCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmVkaXRNb2RlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNlbGVjdGlvbi5jbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoZUluc3RhbmNlID0gdGhpcy5lZGl0TW9kZWwuY2hpbGQuZ2V0KGluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhlSW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZVNlZ21lbnRTaGFwZSh0aGVTZWdtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlTWVzaGVzID0gZ2VuZXJhdGVNZXNoZXMoW3RoZVNlZ21lbnRdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoZU1lc2hlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2lnbi5zdGFydE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wZXJhdGlvblN1Y2Nlc3MgPSAoeWllbGQgZGVzaWduLmFjdGl2YXRlR3JvdXBJbnN0YW5jZSh0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2UpKS5pc1N1Y2Nlc3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGRlc2lnbi5yZW1vdmVHcm91cEluc3RhbmNlKHRoZUluc3RhbmNlLmluc3RhbmNlKS5pc1N1Y2Nlc3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvblN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3SW5zdGFuY2UgPSBidWlsZENvbXBvbmVudEluc3RhbmNlKHRoZVNlZ21lbnQsIHRoaXMuc2VnbWVudHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAhIW5ld0luc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3SW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsLmNoaWxkLnNldChpbmRleCwgeyBpbnN0YW5jZTogbmV3SW5zdGFuY2UsIGRlZmluaXRpb25LZXk6ICgoX2EgPSBuZXdJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmdldEtleSgpKSB8fCAnJywgaW5zdGFuY2VLZXk6IG5ld0luc3RhbmNlLmdldEtleSgpIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChfYiA9IHRoaXMuaGFuZHJhaWxDb2xsZWN0aW9uKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuaGFuZHJhaWxzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRyYWlsSW5zdGFuY2UgPSB5aWVsZCBidWlsZEhhbmRyYWlsSW5zdGFuY2UodGhpcy5zdGFpclBhcmFtLCAoX2MgPSB0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbikgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmhhbmRyYWlscyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgaGFuZHJhaWxJbnN0YW5jZSAhPT0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoYW5kcmFpbEluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsLmhhbmRyYWlsID0geyBpbnN0YW5jZTogaGFuZHJhaWxJbnN0YW5jZSwgZGVmaW5pdGlvbktleTogKChfZCA9IGhhbmRyYWlsSW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCkpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5nZXRLZXkoKSkgfHwgJycsIGluc3RhbmNlS2V5OiBoYW5kcmFpbEluc3RhbmNlLmdldEtleSgpIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKHlpZWxkIGRlc2lnbi5kZWFjdGl2YXRlR3JvdXBJbnN0YW5jZSgpKS5pc1N1Y2Nlc3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2lnbi5jb21taXRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2lnbi5hYm9ydE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uLmFkZChbdGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8vIGNoYW5nZUNvbXBvbmVudFR5cGUoY29tcG9uZW50VHlwZTogQ29tcG9uZW50VHlwZSkge1xyXG4gICAgLy8gICAgIHRoaXMuY29tcG9uZW50UGFyYW0udHlwZSA9IGNvbXBvbmVudFR5cGU7XHJcbiAgICAvLyAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiAnY29tcG9uZW50UGFyYW1DaGFuZ2VkJywgY29tcG9uZW50UGFyYW06IHsgLi4udGhpcy5jb21wb25lbnRQYXJhbSB9IH0sICcqJyk7XHJcbiAgICAvLyAgICAgdGhpcy5jaGFuZ2VDb21wb25lbnRQYXJhbSh0aGlzLmNvbXBvbmVudFBhcmFtLCBbQ29tcG9uZW50UGFyYW1UeXBlLlR5cGVdKTtcclxuICAgIC8vIH1cclxuICAgIHRyeUNvbW1pdCgpIHtcclxuICAgICAgICB2YXIgX2EsIF9iLCBfYztcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBjb25zdCBtZXNoZXMgPSBnZW5lcmF0ZU1lc2hlcyh0aGlzLnNlZ21lbnRzKTtcclxuICAgICAgICAgICAgaWYgKG1lc2hlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGRlc2lnbi5zdGFydE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3SW5zdGFuY2VzID0gW107XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlZGl0TW9kZWxDaGlsZCA9IG5ldyBNYXAoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkU2VnbWVudHMgPSBbXTtcclxuICAgICAgICAgICAgICAgIGxldCBvcGVyYXRpb25TdWNjZXNzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgc2VnbWVudCBvZiB0aGlzLnNlZ21lbnRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzZWdtZW50Lm1lc2gpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghb3BlcmF0aW9uU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNpZ24uYWJvcnRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdJbnN0YW5jZSA9IGJ1aWxkQ29tcG9uZW50SW5zdGFuY2Uoc2VnbWVudCwgdGhpcy5zZWdtZW50cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgISFuZXdJbnN0YW5jZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmV3SW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3SW5zdGFuY2VzLnB1c2gobmV3SW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlZGl0TW9kZWxDaGlsZC5zZXQoc2VnbWVudC5wYXJhbS5pbmRleCwgeyBpbnN0YW5jZTogbmV3SW5zdGFuY2UsIGRlZmluaXRpb25LZXk6ICgoX2EgPSBuZXdJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmdldEtleSgpKSB8fCAnJywgaW5zdGFuY2VLZXk6IG5ld0luc3RhbmNlLmdldEtleSgpIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50LnBhcmFtLnBsYXRmb3JtTGVuZ3RoTG9ja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5wYXJhbS5zdGVwUHJvcG9ydGlvbmFsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5wYXJhbS53aWR0aFByb3BvcnRpb25hbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQucGFyYW0ubW9kZWxFZGl0aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRTZWdtZW50cy5wdXNoKHNlZ21lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGxldCBoYW5kcmFpbEluc3RhbmNlRGF0YTogSW5zdGFuY2VEYXRhIHwgdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgKHRoaXMuaGFuZHJhaWxDb2xsZWN0aW9uPy5oYW5kcmFpbHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgY29uc3QgaGFuZHJhaWxJbnN0YW5jZSA9IGF3YWl0IGJ1aWxkSGFuZHJhaWxJbnN0YW5jZSh0aGlzLnN0YWlyUGFyYW0sIHRoaXMuaGFuZHJhaWxDb2xsZWN0aW9uPy5oYW5kcmFpbHMpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGhhbmRyYWlsSW5zdGFuY2UgIT09IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIC8vICAgICBpZiAoaGFuZHJhaWxJbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBuZXdJbnN0YW5jZXMucHVzaChoYW5kcmFpbEluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgaGFuZHJhaWxJbnN0YW5jZURhdGEgPSB7IGluc3RhbmNlOiBoYW5kcmFpbEluc3RhbmNlLCBkZWZpbml0aW9uS2V5OiBoYW5kcmFpbEluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpPy5nZXRLZXkoKSB8fCAnJywgaW5zdGFuY2VLZXk6IGhhbmRyYWlsSW5zdGFuY2UuZ2V0S2V5KCkgfTtcclxuICAgICAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICBpZiAobmV3SW5zdGFuY2VzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudEluc3RhbmNlID0gKF9iID0gZGVzaWduLm1ha2VHcm91cChbXSwgbmV3SW5zdGFuY2VzLCBbXSkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5hZGRlZEluc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICEhcGFyZW50SW5zdGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyZW50RGVmID0gcGFyZW50SW5zdGFuY2UgPT09IG51bGwgfHwgcGFyZW50SW5zdGFuY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBhcmVudEluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnRJbnN0YW5jZSAmJiBwYXJlbnREZWYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgcGFyZW50RGVmLnNldEN1c3RvbVByb3BlcnR5KFN0YWlyTW9kZWxLZXksIFN0YWlyTW9kZWxWYWx1ZSkuaXNTdWNjZXNzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzaWduLmNvbW1pdE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50OiB7IGluc3RhbmNlOiBwYXJlbnRJbnN0YW5jZSwgZGVmaW5pdGlvbktleTogKChfYyA9IHBhcmVudEluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuZ2V0S2V5KCkpIHx8ICcnLCBpbnN0YW5jZUtleTogcGFyZW50SW5zdGFuY2UuZ2V0S2V5KCkgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZDogZWRpdE1vZGVsQ2hpbGQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaGFuZHJhaWw6IGhhbmRyYWlsSW5zdGFuY2VEYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VnbWVudHMgPSB2YWxpZFNlZ21lbnRzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdUZW1wQ29tcG9uZW50KHZhbGlkU2VnbWVudHNbMF0sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5EcmF3U3RhaXJNb2RlbFNldHRsZWQsIGNvbXBvbmVudFBhcmFtczogdGhpcy5zZWdtZW50cy5tYXAoc2VnID0+IChPYmplY3QuYXNzaWduKHt9LCBzZWcucGFyYW0pKSksIHN0YWlyUGFyYW06IHRoaXMuc3RhaXJQYXJhbSB9LCAnKicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGVzaWduLmFib3J0T3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGdldEVkaXRNb2RlbCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lZGl0TW9kZWw7XHJcbiAgICB9XHJcbiAgICBzZXRNb2RlbChncm91cEluc3RhbmNlKSB7XHJcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XHJcbiAgICAgICAgaWYgKCgoX2EgPSB0aGlzLmVkaXRNb2RlbCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnBhcmVudC5pbnN0YW5jZUtleSkgPT09IGdyb3VwSW5zdGFuY2UuZ2V0S2V5KCkpIHtcclxuICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5Qcm9wZXJ0aWVzVmlzaWJsZSwgcHJvcGVydGllc1Zpc2libGU6IHRydWUgfSwgJyonKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VnbWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzQ29tcG9uZW50KHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZWRpdE1vZGVsID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGNvbnN0IGdyb3VwRGVmID0gZ3JvdXBJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKTtcclxuICAgICAgICBpZiAoZ3JvdXBJbnN0YW5jZSAmJiBncm91cERlZikge1xyXG4gICAgICAgICAgICBjb25zdCBzdGFpck1vZGVsUHJvcGVydHkgPSBncm91cERlZi5nZXRDdXN0b21Qcm9wZXJ0eShTdGFpck1vZGVsS2V5KTtcclxuICAgICAgICAgICAgaWYgKHN0YWlyTW9kZWxQcm9wZXJ0eSA9PT0gU3RhaXJNb2RlbFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzZWdtZW50cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3ViR3JvdXBJbnN0YW5jZXMgPSBncm91cERlZi5nZXRTdWJHcm91cEluc3RhbmNlcygpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWRpdE1vZGVsID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudDogeyBpbnN0YW5jZTogZ3JvdXBJbnN0YW5jZSwgZGVmaW5pdGlvbktleTogKChfYiA9IGdyb3VwSW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5nZXRLZXkoKSkgfHwgJycsIGluc3RhbmNlS2V5OiBncm91cEluc3RhbmNlLmdldEtleSgpIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQ6IG5ldyBNYXAoKVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgc3ViSW5zdGFuY2Ugb2Ygc3ViR3JvdXBJbnN0YW5jZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdWJEZWYgPSBzdWJJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3ViRGVmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IGNvbXBvbmVudEluZGV4VmFsdWUgPSBwYXJzZUludChzdWJEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoQ29tcG9uZW50SW5kZXhLZXkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGlzRmluaXRlKGNvbXBvbmVudEluZGV4VmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmFtID0gcGFyc2VQYXJhbShzdWJEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoUGFyYW1LZXkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRFbmQgPSBwYXJzZVN0YXJ0RW5kKHN1YkRlZi5nZXRDdXN0b21Qcm9wZXJ0eShTdGFydEVuZEtleSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiYXNlTGluZVNlZzNkID0gcGFyc2VMaW5lU2VnM2Qoc3ViRGVmLmdldEN1c3RvbVByb3BlcnR5KEJhc2VMaW5lU2VnM2RLZXkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFzZUNvbXBvbmVudCA9IHBhcnNlQmFzZUNvbXBvbmVudChzdWJEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoQmFzZUNvbXBvbmVudEtleSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjaXJjbGVUYW5nZW50ID0gcGFyc2VWZWN0b3IzZChzdWJEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoQ2lyY2xlVGFuZ2VudEtleSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW0gJiYgc3RhcnRFbmQgJiYgYmFzZUxpbmVTZWczZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VnbWVudCA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgZ2V0RW1wdHlTZWdtZW50KCkpLCB7IHN0YXJ0OiBzdGFydEVuZC5zdGFydCwgZW5kOiBzdGFydEVuZC5lbmQsIHN0YXJ0SGVpZ2h0OiBzdGFydEVuZC5zdGFydEhlaWdodCwgZW5kSGVpZ2h0OiBzdGFydEVuZC5lbmRIZWlnaHQsIGJhc2VDb21wb25lbnQ6IHsgY29tcG9uZW50SW5kZXg6IGJhc2VDb21wb25lbnQgPT09IG51bGwgfHwgYmFzZUNvbXBvbmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmFzZUNvbXBvbmVudC5jb21wb25lbnRJbmRleCwgbGluZTNkSW5kZXg6IGJhc2VDb21wb25lbnQgPT09IG51bGwgfHwgYmFzZUNvbXBvbmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleCwgbGluZTNkOiBiYXNlTGluZVNlZzNkIH0sIGNpcmNsZVRhbmdlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW0sIHN0YXJ0TG9ja2VkOiB0cnVlLCBlbmRMb2NrZWQ6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50cy5wdXNoKHNlZ21lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdE1vZGVsLmNoaWxkLnNldChwYXJhbS5pbmRleCwgeyBpbnN0YW5jZTogc3ViSW5zdGFuY2UsIGRlZmluaXRpb25LZXk6ICgoX2MgPSBzdWJJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmdldEtleSgpKSB8fCAnJywgaW5zdGFuY2VLZXk6IHN1Ykluc3RhbmNlLmdldEtleSgpIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VnbWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudHMuc29ydCgoYSwgYikgPT4gYS5wYXJhbS5pbmRleCAtIGIucGFyYW0uaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkU2VnbWVudFJlbGF0aW9ucyhzZWdtZW50cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWdtZW50cyA9IHNlZ21lbnRzO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsID0gZWRpdE1vZGVsO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuZHJhd1RlbXBDb21wb25lbnQoc2VnbWVudHNbMF0sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNDb21wb25lbnQoc2VnbWVudHNbMF0ucGFyYW0uaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuRHJhd1N0YWlyTW9kZWxTZXR0bGVkLCBjb21wb25lbnRQYXJhbXM6IHRoaXMuc2VnbWVudHMubWFwKHNlZyA9PiAoT2JqZWN0LmFzc2lnbih7fSwgc2VnLnBhcmFtKSkpLCBzdGFpclBhcmFtOiB0aGlzLnN0YWlyUGFyYW0gfSwgJyonKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNsZWFyRWRpdE1vZGVsKCkge1xyXG4gICAgICAgIHRoaXMuZWRpdE1vZGVsID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuc2VnbWVudHMgPSBbXTtcclxuICAgICAgICB0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbiA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCA9IERlZmF1bHRGb2N1c2VkQ29tcG9uZW50SW5kZXg7XHJcbiAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5EcmF3U3RhaXJNb2RlbFNldHRsZWQgfSwgJyonKTtcclxuICAgIH1cclxuICAgIGNsZWFyKCkge1xyXG4gICAgICAgIGFwcFZpZXcuY2xlYXJUZW1wb3JhcnlTaGFwZXMoKTtcclxuICAgICAgICAvLyB0aGlzLmNvbXBvbmVudFBhcmFtID0geyAuLi5EZWZhdWx0Q29tcG9uZW50UGFyYW0gfTtcclxuICAgICAgICAvLyB0aGlzLnNlZ21lbnRzID0gW107XHJcbiAgICAgICAgdGhpcy5kcmF3aW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggPSBEZWZhdWx0Rm9jdXNlZENvbXBvbmVudEluZGV4O1xyXG4gICAgICAgIHRoaXMuc3RhaXJQYXJhbSA9IERlZmF1bHRTdGFpclBhcmFtO1xyXG4gICAgICAgIC8vIHRoaXMuZWRpdE1vZGVsID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgb25SQnV0dG9uVXAoZXZlbnQsIGluZmVyZW5jZVJlc3VsdCkge1xyXG4gICAgICAgIHRoaXMudHJ5Q29tbWl0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGRlQWN0aXZhdGVEcmF3U3RhaXJzVG9vbCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgb25MQnV0dG9uRGJDbGljayhldmVudCwgaW5mZXJlbmNlUmVzdWx0KSB7XHJcbiAgICAgICAgO1xyXG4gICAgfVxyXG4gICAgYWxsb3dVc2luZ0luZmVyZW5jZSgpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIG9uS2V5RG93bihldmVudCkge1xyXG4gICAgICAgIDtcclxuICAgIH1cclxuICAgIG9uS2V5VXAoZXZlbnQpIHtcclxuICAgICAgICA7XHJcbiAgICB9XHJcbiAgICBnZW5lcmF0ZVNlZ21lbnRTaGFwZShzZWdtZW50LCB0ZW1wID0gdHJ1ZSkge1xyXG4gICAgICAgIGdlbmVyYXRlU2hhcGUoc2VnbWVudCwgdGVtcCk7XHJcbiAgICAgICAgLy8gdGhpcy5nZW5lcmF0ZUhhbmRyYWlsU2hhcGUoKTtcclxuICAgIH1cclxuICAgIGdlbmVyYXRlSGFuZHJhaWxTaGFwZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5zZWdtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc3QgaGFuZHJhaWxzID0gZ2VuZXJhdGVIYW5kcmFpbFNoYXBlKHRoaXMuc3RhaXJQYXJhbSwgdGhpcy5zZWdtZW50cyk7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZHJhaWxDb2xsZWN0aW9uID0geyBoYW5kcmFpbHM6IGhhbmRyYWlscyB8fCBbXSB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnQgY29uc3QgZHJhd1N0YWlyc1Rvb2wgPSBuZXcgRHJhd1N0YWlyc1Rvb2woKTtcclxuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5pbXBvcnQgeyBEaXJlY3Rpb25aIH0gZnJvbSBcIi4vY29uc3RzXCI7XHJcbmltcG9ydCB7IEJhc2VDb21wb25lbnRLZXksIEJhc2VMaW5lU2VnM2RLZXksIENpcmNsZVRhbmdlbnRLZXksIENvbHVtblR5cGUsIENvbXBvbmVudFR5cGUsIERlZmF1bHRTdGFpclBhcmFtLCBIYW5kcmFpbE1vZGVsS2V5LCBQYXJhbUtleSwgUmFpbFR5cGUsIFN0YWlyTW9kZWxWYWx1ZSwgU3RhcnRFbmRLZXkgfSBmcm9tIFwiLi90eXBlc1wiO1xyXG5pbXBvcnQgeyBzdHJpbmdpZnlCYXNlQ29tcG9uZW50LCBzdHJpbmdpZnlQYXJhbSwgc3RyaW5naWZ5UG9pbnQzZCwgc3RyaW5naWZ5U3RhcnRFbmQgfSBmcm9tIFwiLi91dGlsc1wiO1xyXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVNZXNoZXMoc2VnbWVudHMpIHtcclxuICAgIGNvbnN0IG1lc2hlcyA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBzZWdtZW50IG9mIHNlZ21lbnRzKSB7XHJcbiAgICAgICAgY29uc3QgeyBwYXJhbTogeyB0eXBlIH0sIGNpcmNsZVRhbmdlbnQgfSA9IHNlZ21lbnQ7XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpcikge1xyXG4gICAgICAgICAgICBnZW5lcmF0ZVN0cmFpZ2h0U3RhaXJNZXNoKHNlZ21lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09PSBDb21wb25lbnRUeXBlLkNpcmN1bGFyU3RhaXIpIHtcclxuICAgICAgICAgICAgaWYgKGNpcmNsZVRhbmdlbnQpIHtcclxuICAgICAgICAgICAgICAgIGdlbmVyYXRlQ2lyY3VsYXJTdGFpck1lc2goc2VnbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZVN0cmFpZ2h0U3RhaXJNZXNoKHNlZ21lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBnZW5lcmF0ZVBsYXRmb3JtTWVzaChzZWdtZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNlZ21lbnQubWVzaCkge1xyXG4gICAgICAgICAgICBtZXNoZXMucHVzaChzZWdtZW50Lm1lc2gpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBtZXNoZXM7XHJcbn1cclxuZnVuY3Rpb24gZ2VuZXJhdGVDaXJjdWxhclN0YWlyTWVzaChzZWdtZW50KSB7XHJcbiAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oLCBfaiwgX2ssIF9sO1xyXG4gICAgY29uc3QgeyBzdGFydExvY2tlZCwgY2lyY2xlVGFuZ2VudCwgc3RhaXJTaGFwZTogeyB2ZXJ0aWNlcywgc3RlcENvdW50IH0sIGNvcm5lclNoYXBlOiB7IHZlcnRpY2VzOiBjb3JuZXJWZXJ0aWNlcyB9LCBwYXJhbTogeyB1cHdhcmQgfSB9ID0gc2VnbWVudDtcclxuICAgIGlmIChzdGVwQ291bnQgPCAxIHx8ICFzdGFydExvY2tlZCB8fCAhY2lyY2xlVGFuZ2VudClcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgY29uc3Qgc3RhaXJNZXNoID0ge1xyXG4gICAgICAgIHZlcnRpY2VzOiB2ZXJ0aWNlcy5tYXAodmVydGV4ID0+IFt2ZXJ0ZXgueCwgdmVydGV4LnksIHZlcnRleC56XSksXHJcbiAgICAgICAgdHJpYW5nbGVJbmRpY2VzOiBbXSxcclxuICAgICAgICBzb2Z0RWRnZXM6IFtdLFxyXG4gICAgfTtcclxuICAgIC8vIOacgOW6lemDqOWPsOmYtuWQjuS4i+S9jee9rlxyXG4gICAgLy8gY29uc3QgbGVmdEluZGV4ID0gdmVydGljZXMubGVuZ3RoIC0gKCghdXB3YXJkICYmIHN0ZXBDb3VudCA+IDEpID8gNCA6IDIpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGVwQ291bnQ7IGkrKykge1xyXG4gICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcclxuICAgICAgICAvLyBzdGFpciBmYWNlc1xyXG4gICAgICAgIFtpICogNCwgaSAqIDQgKyAxLCBpICogNCArIDJdLCBbaSAqIDQgKyAxLCBpICogNCArIDMsIGkgKiA0ICsgMl0sIFtpICogNCArIDIsIGkgKiA0ICsgMywgaSAqIDQgKyA0XSwgW2kgKiA0ICsgMywgaSAqIDQgKyA1LCBpICogNCArIDRdLCBcclxuICAgICAgICAvLyBzaWRlIGZhY2VzICh1cClcclxuICAgICAgICBbaSAqIDQsIGkgKiA0ICsgMiwgKGkgKyAxKSAqIDRdLCBbaSAqIDQgKyAxLCAoaSArIDEpICogNCArIDEsIGkgKiA0ICsgM10pO1xyXG4gICAgICAgIChfYSA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wdXNoKFtpICogNCArIDEsIGkgKiA0ICsgMl0sIFtpICogNCArIDMsIGkgKiA0ICsgNF0sIFtpICogNCwgKGkgKyAxKSAqIDRdLCBbKGkgKyAxKSAqIDQgKyAxLCBpICogNCArIDFdKTtcclxuICAgICAgICBpZiAodXB3YXJkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJvdHRvbUZyb250TGVmdEluZGV4ID0gNCAqIHN0ZXBDb3VudCArIDIgKyAyICogKHN0ZXBDb3VudCAtIGkgLSAxKTtcclxuICAgICAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxyXG4gICAgICAgICAgICAvLyBzaWRlIGZhY2VzIChtaWRkbGUpXHJcbiAgICAgICAgICAgIFtpICogNCwgKGkgKyAxKSAqIDQsIGJvdHRvbUZyb250TGVmdEluZGV4XSwgWyhpICsgMSkgKiA0ICsgMSwgaSAqIDQgKyAxLCBib3R0b21Gcm9udExlZnRJbmRleCArIDFdKTtcclxuICAgICAgICAgICAgaWYgKGkgPCBzdGVwQ291bnQgLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAoX2IgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IucHVzaChbKGkgKyAxKSAqIDQsIGJvdHRvbUZyb250TGVmdEluZGV4XSwgWyhpICsgMSkgKiA0ICsgMSwgYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAxXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAvLyBzaWRlIGZhY2VzIChib3R0b20pXHJcbiAgICAgICAgICAgICAgICBbaSAqIDQsIGJvdHRvbUZyb250TGVmdEluZGV4LCBib3R0b21Gcm9udExlZnRJbmRleCArIDJdLCBbYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAxLCBpICogNCArIDEsIGJvdHRvbUZyb250TGVmdEluZGV4ICsgM10sIFxyXG4gICAgICAgICAgICAgICAgLy8gYm90dG9tIGZhY2VzXHJcbiAgICAgICAgICAgICAgICBbYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAyLCBib3R0b21Gcm9udExlZnRJbmRleCwgYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAzXSwgW2JvdHRvbUZyb250TGVmdEluZGV4ICsgMywgYm90dG9tRnJvbnRMZWZ0SW5kZXgsIGJvdHRvbUZyb250TGVmdEluZGV4ICsgMV0pO1xyXG4gICAgICAgICAgICAgICAgKF9jID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnB1c2goW2kgKiA0LCBib3R0b21Gcm9udExlZnRJbmRleF0sIFtpICogNCArIDEsIGJvdHRvbUZyb250TGVmdEluZGV4ICsgMV0sIFtib3R0b21Gcm9udExlZnRJbmRleCArIDMsIGJvdHRvbUZyb250TGVmdEluZGV4XSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA8IHN0ZXBDb3VudCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAoX2QgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QucHVzaChbYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAxLCBib3R0b21Gcm9udExlZnRJbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgLy8gYm90dG9tIGZhY2VzXHJcbiAgICAgICAgICAgICAgICBbaSAqIDQsIGJvdHRvbUZyb250TGVmdEluZGV4LCBpICogNCArIDFdLCBbaSAqIDQgKyAxLCBib3R0b21Gcm9udExlZnRJbmRleCwgYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAxXSk7XHJcbiAgICAgICAgICAgICAgICAoX2UgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2UucHVzaChbaSAqIDQgKyAxLCBib3R0b21Gcm9udExlZnRJbmRleF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBib3R0b21CYWNrTGVmdEluZGV4ID0gNCAqIHN0ZXBDb3VudCArIDIgKyAyICogKHN0ZXBDb3VudCAtIGkgLSAxKTtcclxuICAgICAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxyXG4gICAgICAgICAgICAvLyBzaWRlIGZhY2VzIChtaWRkbGUpXHJcbiAgICAgICAgICAgIFtpICogNCwgKGkgKyAxKSAqIDQsIGJvdHRvbUJhY2tMZWZ0SW5kZXhdLCBbKGkgKyAxKSAqIDQgKyAxLCBpICogNCArIDEsIGJvdHRvbUJhY2tMZWZ0SW5kZXggKyAxXSwgXHJcbiAgICAgICAgICAgIC8vIGJvdHRvbSBmYWNlc1xyXG4gICAgICAgICAgICBbYm90dG9tQmFja0xlZnRJbmRleCwgYm90dG9tQmFja0xlZnRJbmRleCAtIDIsIGJvdHRvbUJhY2tMZWZ0SW5kZXggKyAxXSwgW2JvdHRvbUJhY2tMZWZ0SW5kZXggKyAxLCBib3R0b21CYWNrTGVmdEluZGV4IC0gMiwgYm90dG9tQmFja0xlZnRJbmRleCAtIDFdKTtcclxuICAgICAgICAgICAgKF9mID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9mLnB1c2goW2JvdHRvbUJhY2tMZWZ0SW5kZXggKyAxLCBib3R0b21CYWNrTGVmdEluZGV4IC0gMl0pO1xyXG4gICAgICAgICAgICBpZiAoaSA8IHN0ZXBDb3VudCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIChfZyA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9nID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZy5wdXNoKFsoaSArIDEpICogNCwgYm90dG9tQmFja0xlZnRJbmRleF0sIFsoaSArIDEpICogNCArIDEsIGJvdHRvbUJhY2tMZWZ0SW5kZXggKyAxXSk7XHJcbiAgICAgICAgICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAvLyBzaWRlIGZhY2VzIChib3R0b20pXHJcbiAgICAgICAgICAgICAgICBbKGkgKyAxKSAqIDQsIGJvdHRvbUJhY2tMZWZ0SW5kZXggLSAyLCBib3R0b21CYWNrTGVmdEluZGV4XSwgW2JvdHRvbUJhY2tMZWZ0SW5kZXggLSAxLCAoaSArIDEpICogNCArIDEsIGJvdHRvbUJhY2tMZWZ0SW5kZXggKyAxXSk7XHJcbiAgICAgICAgICAgICAgICAoX2ggPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfaCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2gucHVzaChbKGkgKyAxKSAqIDQsIGJvdHRvbUJhY2tMZWZ0SW5kZXggLSAyXSwgWyhpICsgMSkgKiA0ICsgMSwgYm90dG9tQmFja0xlZnRJbmRleCAtIDFdLCBbYm90dG9tQmFja0xlZnRJbmRleCArIDEsIGJvdHRvbUJhY2tMZWZ0SW5kZXggLSAyXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAoX2ogPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfaiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2oucHVzaChbYm90dG9tQmFja0xlZnRJbmRleCArIDEsIGJvdHRvbUJhY2tMZWZ0SW5kZXhdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh1cHdhcmQpIHtcclxuICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXHJcbiAgICAgICAgLy8gYm90dG9tIGZhY2VzXHJcbiAgICAgICAgLy8gW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIDEsIDBdLFxyXG4gICAgICAgIC8vIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCAwLCB2ZXJ0aWNlcy5sZW5ndGggLSAyXSxcclxuICAgICAgICAvLyDliY3kvqfpnaJcclxuICAgICAgICBbc3RlcENvdW50ICogNCwgc3RlcENvdW50ICogNCArIDEsIHN0ZXBDb3VudCAqIDQgKyAyXSwgW3N0ZXBDb3VudCAqIDQgKyAxLCBzdGVwQ291bnQgKiA0ICsgMywgc3RlcENvdW50ICogNCArIDJdKTtcclxuICAgICAgICAoX2sgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfayA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2sucHVzaChcclxuICAgICAgICAvLyBbdmVydGljZXMubGVuZ3RoIC0gMSwgMF0sXHJcbiAgICAgICAgW3N0ZXBDb3VudCAqIDQgKyAxLCBzdGVwQ291bnQgKiA0ICsgMl0pO1xyXG4gICAgICAgIC8vIGlmIChzdGVwQ291bnQgPiAxKSB7XHJcbiAgICAgICAgLy8gICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcclxuICAgICAgICAvLyAgICAgICAgIC8vIHNpZGUgYm90dG9tIGZhY2VzXHJcbiAgICAgICAgLy8gICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gMiwgdmVydGljZXMubGVuZ3RoIC0gMTAsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLFxyXG4gICAgICAgIC8vICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIHZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDldLFxyXG4gICAgICAgIC8vICAgICAgICAgLy8gYm90dG9tIGZhY2VzXHJcbiAgICAgICAgLy8gICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gNSwgdmVydGljZXMubGVuZ3RoIC0gMywgdmVydGljZXMubGVuZ3RoIC0gNF0sXHJcbiAgICAgICAgLy8gICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gNSwgdmVydGljZXMubGVuZ3RoIC0gNCwgdmVydGljZXMubGVuZ3RoIC0gNl0sXHJcbiAgICAgICAgLy8gICAgICk7XHJcbiAgICAgICAgLy8gICAgIHN0YWlyTWVzaC5zb2Z0RWRnZXM/LnB1c2goXHJcbiAgICAgICAgLy8gICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gNSwgdmVydGljZXMubGVuZ3RoIC0gNF0sXHJcbiAgICAgICAgLy8gICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gMiwgdmVydGljZXMubGVuZ3RoIC0gMTBdLFxyXG4gICAgICAgIC8vICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDEwLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSxcclxuICAgICAgICAvLyAgICAgKTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXHJcbiAgICAgICAgLy8g5ZCO5L6n6Z2iXHJcbiAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIDEsIDBdLCBbdmVydGljZXMubGVuZ3RoIC0gMSwgMCwgdmVydGljZXMubGVuZ3RoIC0gMl0pO1xyXG4gICAgICAgIChfbCA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9sID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfbC5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCAwXSk7XHJcbiAgICAgICAgLy8gaWYgKHN0ZXBDb3VudCA+IDEpIHtcclxuICAgICAgICAvLyAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxyXG4gICAgICAgIC8vICAgICAgICAgLy8gc2lkZSBib3R0b20gZmFjZXNcclxuICAgICAgICAvLyAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSAyLCAwLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSxcclxuICAgICAgICAvLyAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCB2ZXJ0aWNlcy5sZW5ndGggLSAzLCAxXSxcclxuICAgICAgICAvLyAgICAgICAgIC8vIGJvdHRvbSBmYWNlc1xyXG4gICAgICAgIC8vICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDQsIHZlcnRpY2VzLmxlbmd0aCAtIDNdLFxyXG4gICAgICAgIC8vICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDYsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLFxyXG4gICAgICAgIC8vICAgICApO1xyXG4gICAgICAgIC8vICAgICBzdGFpck1lc2guc29mdEVkZ2VzPy5wdXNoKFxyXG4gICAgICAgIC8vICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLFxyXG4gICAgICAgIC8vICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDMsIDFdLFxyXG4gICAgICAgIC8vICAgICAgICAgWzAsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLFxyXG4gICAgICAgIC8vICAgICApO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuICAgIGlmIChjb3JuZXJWZXJ0aWNlcy5sZW5ndGggPT09IDYpIHtcclxuICAgICAgICBnZW5lcmF0ZVBvbHlnb25NZXNoKGNvcm5lclZlcnRpY2VzLCBzdGFpck1lc2gpO1xyXG4gICAgfVxyXG4gICAgc2VnbWVudC5tZXNoID0gc3RhaXJNZXNoO1xyXG59XHJcbmZ1bmN0aW9uIGdlbmVyYXRlU3RyYWlnaHRTdGFpck1lc2goc2VnbWVudCkge1xyXG4gICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2YsIF9nLCBfaCwgX2osIF9rO1xyXG4gICAgY29uc3QgeyBzdGFydExvY2tlZCwgc3RhaXJTaGFwZTogeyB2ZXJ0aWNlcywgc3RlcENvdW50IH0sIGNvcm5lclNoYXBlOiB7IHZlcnRpY2VzOiBjb3JuZXJWZXJ0aWNlcyB9LCBwYXJhbTogeyB1cHdhcmQgfSB9ID0gc2VnbWVudDtcclxuICAgIGlmIChzdGVwQ291bnQgPCAxIHx8ICFzdGFydExvY2tlZClcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgY29uc3Qgc3RhaXJNZXNoID0ge1xyXG4gICAgICAgIHZlcnRpY2VzOiB2ZXJ0aWNlcy5tYXAodmVydGV4ID0+IFt2ZXJ0ZXgueCwgdmVydGV4LnksIHZlcnRleC56XSksXHJcbiAgICAgICAgdHJpYW5nbGVJbmRpY2VzOiBbXSxcclxuICAgICAgICBzb2Z0RWRnZXM6IFtdLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGxlZnRJbmRleCA9IHZlcnRpY2VzLmxlbmd0aCAtICgoIXVwd2FyZCAmJiBzdGVwQ291bnQgPiAxKSA/IDQgOiAyKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RlcENvdW50OyBpKyspIHtcclxuICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXHJcbiAgICAgICAgLy8gc3RhaXIgZmFjZXNcclxuICAgICAgICBbaSAqIDQsIGkgKiA0ICsgMSwgaSAqIDQgKyAyXSwgW2kgKiA0ICsgMSwgaSAqIDQgKyAzLCBpICogNCArIDJdLCBbaSAqIDQgKyAyLCBpICogNCArIDMsIGkgKiA0ICsgNF0sIFtpICogNCArIDMsIGkgKiA0ICsgNSwgaSAqIDQgKyA0XSwgXHJcbiAgICAgICAgLy8gc2lkZSBmYWNlc1xyXG4gICAgICAgIFtpICogNCwgaSAqIDQgKyAyLCAoaSArIDEpICogNF0sIFtpICogNCArIDEsIChpICsgMSkgKiA0ICsgMSwgaSAqIDQgKyAzXSk7XHJcbiAgICAgICAgKF9hID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnB1c2goW2kgKiA0ICsgMSwgaSAqIDQgKyAyXSwgW2kgKiA0ICsgMywgaSAqIDQgKyA0XSwgW2kgKiA0LCAoaSArIDEpICogNF0sIFsoaSArIDEpICogNCArIDEsIGkgKiA0ICsgMV0pO1xyXG4gICAgICAgIGlmIChpID09PSBzdGVwQ291bnQgLSAxICYmIHVwd2FyZCAmJiBzdGVwQ291bnQgPiAxKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJiTGVmdEluZGV4ID0gdmVydGljZXMubGVuZ3RoIC0gNDtcclxuICAgICAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxyXG4gICAgICAgICAgICAvLyB0YWlsIHNpZGUgZmFjZXNcclxuICAgICAgICAgICAgW2JiTGVmdEluZGV4LCBpICogNCwgKGkgKyAxKSAqIDRdLCBbYmJMZWZ0SW5kZXggKyAxLCAoaSArIDEpICogNCArIDEsIGkgKiA0ICsgMV0pO1xyXG4gICAgICAgICAgICAoX2IgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IucHVzaChbYmJMZWZ0SW5kZXgsIGkgKiA0XSwgXHJcbiAgICAgICAgICAgIC8vIFtpICogNCwgKGkgKyAxKSAqIDRdLFxyXG4gICAgICAgICAgICBbYmJMZWZ0SW5kZXggKyAxLCBpICogNCArIDFdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcclxuICAgICAgICAgICAgLy8gc2lkZSBmYWNlc1xyXG4gICAgICAgICAgICBbbGVmdEluZGV4LCBpICogNCwgKGkgKyAxKSAqIDRdLCBbbGVmdEluZGV4ICsgMSwgKGkgKyAxKSAqIDQgKyAxLCBpICogNCArIDFdKTtcclxuICAgICAgICAgICAgLy8gc3RhaXJNZXNoLnNvZnRFZGdlcz8ucHVzaChcclxuICAgICAgICAgICAgLy8gICAgIFtpICogNCwgKGkgKyAxKSAqIDRdLFxyXG4gICAgICAgICAgICAvLyAgICAgWyhpICsgMSkgKiA0ICsgMSwgaSAqIDQgKyAxXSxcclxuICAgICAgICAgICAgLy8gKTtcclxuICAgICAgICAgICAgaWYgKHVwd2FyZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKF9jID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnB1c2goW2xlZnRJbmRleCwgaSAqIDRdLCBbbGVmdEluZGV4ICsgMSwgaSAqIDQgKyAxXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RlcENvdW50ID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIChfZCA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5wdXNoKFtsZWZ0SW5kZXgsIChpICsgMSkgKiA0XSwgW2xlZnRJbmRleCArIDEsIChpICsgMSkgKiA0ICsgMV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0ZXBDb3VudCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAoX2UgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2UucHVzaChbbGVmdEluZGV4LCBpICogNF0sIFtsZWZ0SW5kZXggKyAxLCBpICogNCArIDFdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpIDwgc3RlcENvdW50IC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIChfZiA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZi5wdXNoKFtsZWZ0SW5kZXgsIChpICsgMSkgKiA0XSwgW2xlZnRJbmRleCArIDEsIChpICsgMSkgKiA0ICsgMV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHVwd2FyZCkge1xyXG4gICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcclxuICAgICAgICAvLyBib3R0b20gZmFjZXNcclxuICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gMSwgMSwgMF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCAwLCB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDEsIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbdmVydGljZXMubGVuZ3RoIC0gMywgdmVydGljZXMubGVuZ3RoIC0gMiwgdmVydGljZXMubGVuZ3RoIC0gNF0pO1xyXG4gICAgICAgIChfZyA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9nID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZy5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCAwXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDJdKTtcclxuICAgICAgICBpZiAoc3RlcENvdW50ID4gMSkge1xyXG4gICAgICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXHJcbiAgICAgICAgICAgIC8vIHNpZGUgYm90dG9tIGZhY2VzXHJcbiAgICAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSAyLCB2ZXJ0aWNlcy5sZW5ndGggLSAxMCwgdmVydGljZXMubGVuZ3RoIC0gNF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCB2ZXJ0aWNlcy5sZW5ndGggLSAzLCB2ZXJ0aWNlcy5sZW5ndGggLSA5XSwgXHJcbiAgICAgICAgICAgIC8vIGJvdHRvbSBmYWNlc1xyXG4gICAgICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gNSwgdmVydGljZXMubGVuZ3RoIC0gMywgdmVydGljZXMubGVuZ3RoIC0gNF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSA1LCB2ZXJ0aWNlcy5sZW5ndGggLSA0LCB2ZXJ0aWNlcy5sZW5ndGggLSA2XSk7XHJcbiAgICAgICAgICAgIChfaCA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9oID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfaC5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSA1LCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIHZlcnRpY2VzLmxlbmd0aCAtIDEwXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDEwLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxyXG4gICAgICAgIC8vIGJvdHRvbSBmYWNlc1xyXG4gICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCAwLCAxXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDBdLCBbdmVydGljZXMubGVuZ3RoIC0gMywgdmVydGljZXMubGVuZ3RoIC0gMiwgdmVydGljZXMubGVuZ3RoIC0gMV0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAzLCB2ZXJ0aWNlcy5sZW5ndGggLSA0LCB2ZXJ0aWNlcy5sZW5ndGggLSAyXSk7XHJcbiAgICAgICAgKF9qID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2ogPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9qLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIDBdLCBbdmVydGljZXMubGVuZ3RoIC0gMywgdmVydGljZXMubGVuZ3RoIC0gMl0pO1xyXG4gICAgICAgIGlmIChzdGVwQ291bnQgPiAxKSB7XHJcbiAgICAgICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcclxuICAgICAgICAgICAgLy8gc2lkZSBib3R0b20gZmFjZXNcclxuICAgICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIDAsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLCBbdmVydGljZXMubGVuZ3RoIC0gMSwgdmVydGljZXMubGVuZ3RoIC0gMywgMV0sIFxyXG4gICAgICAgICAgICAvLyBib3R0b20gZmFjZXNcclxuICAgICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDQsIHZlcnRpY2VzLmxlbmd0aCAtIDNdLCBbdmVydGljZXMubGVuZ3RoIC0gNSwgdmVydGljZXMubGVuZ3RoIC0gNiwgdmVydGljZXMubGVuZ3RoIC0gNF0pO1xyXG4gICAgICAgICAgICAoX2sgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfayA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2sucHVzaChbdmVydGljZXMubGVuZ3RoIC0gNSwgdmVydGljZXMubGVuZ3RoIC0gNF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAzLCAxXSwgWzAsIHZlcnRpY2VzLmxlbmd0aCAtIDRdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoY29ybmVyVmVydGljZXMubGVuZ3RoID09PSA2KSB7XHJcbiAgICAgICAgZ2VuZXJhdGVQb2x5Z29uTWVzaChjb3JuZXJWZXJ0aWNlcywgc3RhaXJNZXNoKTtcclxuICAgIH1cclxuICAgIHNlZ21lbnQubWVzaCA9IHN0YWlyTWVzaDtcclxufVxyXG5mdW5jdGlvbiBnZW5lcmF0ZVBsYXRmb3JtTWVzaChzZWdtZW50KSB7XHJcbiAgICBjb25zdCB7IHN0YWlyU2hhcGU6IHsgdmVydGljZXMgfSB9ID0gc2VnbWVudDtcclxuICAgIC8vIGlmIChlbmRMb2NrZWQpIHtcclxuICAgIGNvbnN0IHZlcnRleExlbmd0aCA9IHZlcnRpY2VzLmxlbmd0aCAvIDI7XHJcbiAgICBpZiAodmVydGV4TGVuZ3RoID09PSA0IHx8IHZlcnRleExlbmd0aCA9PT0gNSkge1xyXG4gICAgICAgIGNvbnN0IHBsYXRmb3JtTWVzaCA9IHtcclxuICAgICAgICAgICAgdmVydGljZXM6IFtdLFxyXG4gICAgICAgICAgICB0cmlhbmdsZUluZGljZXM6IFtdLFxyXG4gICAgICAgICAgICBzb2Z0RWRnZXM6IFtdLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZ2VuZXJhdGVQb2x5Z29uTWVzaCh2ZXJ0aWNlcywgcGxhdGZvcm1NZXNoKTtcclxuICAgICAgICBzZWdtZW50Lm1lc2ggPSBwbGF0Zm9ybU1lc2g7XHJcbiAgICB9XHJcbiAgICAvLyB9XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG59XHJcbmZ1bmN0aW9uIGdlbmVyYXRlUG9seWdvbk1lc2godmVydGljZXMsIG1lc2gpIHtcclxuICAgIHZhciBfYSwgX2I7XHJcbiAgICBjb25zdCB2ZXJ0ZXhMZW5ndGggPSBtZXNoLnZlcnRpY2VzLmxlbmd0aDtcclxuICAgIG1lc2gudmVydGljZXMucHVzaCguLi52ZXJ0aWNlcy5tYXAodmVydGV4ID0+IFt2ZXJ0ZXgueCwgdmVydGV4LnksIHZlcnRleC56XSkpO1xyXG4gICAgY29uc3Qgc2VnQ291bnQgPSB2ZXJ0aWNlcy5sZW5ndGggLyAyO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWdDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgcmlnaHQgPSBpID09PSBzZWdDb3VudCAtIDEgPyAwIDogaSArIDE7XHJcbiAgICAgICAgY29uc3QgYm90dG9tUmlnaHQgPSBpID09PSBzZWdDb3VudCAtIDEgPyBzZWdDb3VudCA6IGkgKyBzZWdDb3VudCArIDE7XHJcbiAgICAgICAgbWVzaC50cmlhbmdsZUluZGljZXMucHVzaChbaSArIHZlcnRleExlbmd0aCwgaSArIHNlZ0NvdW50ICsgdmVydGV4TGVuZ3RoLCBib3R0b21SaWdodCArIHZlcnRleExlbmd0aF0sIFtpICsgdmVydGV4TGVuZ3RoLCBib3R0b21SaWdodCArIHZlcnRleExlbmd0aCwgcmlnaHQgKyB2ZXJ0ZXhMZW5ndGhdKTtcclxuICAgICAgICAoX2EgPSBtZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnB1c2goW2kgKyB2ZXJ0ZXhMZW5ndGgsIGJvdHRvbVJpZ2h0ICsgdmVydGV4TGVuZ3RoXSk7XHJcbiAgICAgICAgaWYgKGkgPiAwICYmIGkgPCBzZWdDb3VudCAtIDEpIHtcclxuICAgICAgICAgICAgbWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcclxuICAgICAgICAgICAgLy8gdG9wIGFuZCBib3R0b21cclxuICAgICAgICAgICAgW2kgKyB2ZXJ0ZXhMZW5ndGgsIHJpZ2h0ICsgdmVydGV4TGVuZ3RoLCAwICsgdmVydGV4TGVuZ3RoXSwgW2JvdHRvbVJpZ2h0ICsgdmVydGV4TGVuZ3RoLCBpICsgc2VnQ291bnQgKyB2ZXJ0ZXhMZW5ndGgsIHNlZ0NvdW50ICsgdmVydGV4TGVuZ3RoXSk7XHJcbiAgICAgICAgICAgIGlmIChpID4gMSkge1xyXG4gICAgICAgICAgICAgICAgKF9iID0gbWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5wdXNoKFtpLCAwICsgdmVydGV4TGVuZ3RoXSwgW2kgKyBzZWdDb3VudCArIHZlcnRleExlbmd0aCwgc2VnQ291bnQgKyB2ZXJ0ZXhMZW5ndGhdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRDb21wb25lbnRJbnN0YW5jZShzZWdtZW50LCBzZWdtZW50cykge1xyXG4gICAgdmFyIF9hLCBfYjtcclxuICAgIGNvbnN0IHsgc3RhcnQsIGVuZCwgc3RhcnRIZWlnaHQsIGVuZEhlaWdodCwgYmFzZUNvbXBvbmVudCwgY2lyY2xlVGFuZ2VudCwgcGFyYW0sIG1lc2ggfSA9IHNlZ21lbnQ7XHJcbiAgICBjb25zdCBkZXNpZ24gPSBhcHAuZ2V0QWN0aXZlRGVzaWduKCk7XHJcbiAgICBsZXQgb3BlcmF0aW9uU3VjY2VzcyA9IHRydWU7XHJcbiAgICBpZiAobWVzaCA9PT0gbnVsbCB8fCBtZXNoID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtZXNoLnZlcnRpY2VzLmxlbmd0aCkge1xyXG4gICAgICAgIGNvbnN0IG5ld1NoZWxsID0gKF9hID0gZGVzaWduLmNyZWF0ZVNoZWxsRnJvbU1lc2gobWVzaCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5uZXdTaGVsbDtcclxuICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAhIW5ld1NoZWxsO1xyXG4gICAgICAgIGlmIChuZXdTaGVsbCkge1xyXG4gICAgICAgICAgICAvLyBpZiAocGFyYW0udHlwZSAhPT0gQ29tcG9uZW50VHlwZS5DaXJjdWxhclN0YWlyKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBjb25zdCBzb2Z0RWRnZXMgPSBuZXdTaGVsbC5nZXRFZGdlcygpLmZpbHRlcihlID0+IGUuaXNTb2Z0KCkpO1xyXG4gICAgICAgICAgICAvLyAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZGVzaWduLnJlbW92ZUVkZ2VzKHNvZnRFZGdlcykuaXNTdWNjZXNzO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0luc3RhbmNlID0gKF9iID0gZGVzaWduLm1ha2VHcm91cChuZXdTaGVsbC5nZXRGYWNlcygpLCBbXSwgW10pKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuYWRkZWRJbnN0YW5jZTtcclxuICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgISFuZXdJbnN0YW5jZTtcclxuICAgICAgICAgICAgY29uc3QgZ3JvdXBEZWYgPSBuZXdJbnN0YW5jZSA9PT0gbnVsbCB8fCBuZXdJbnN0YW5jZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogbmV3SW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCk7XHJcbiAgICAgICAgICAgIGlmIChuZXdJbnN0YW5jZSAmJiBncm91cERlZikge1xyXG4gICAgICAgICAgICAgICAgLy8gb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZ3JvdXBEZWYuc2V0Q3VzdG9tUHJvcGVydHkoQ29tcG9uZW50SW5kZXhLZXksIGAke25ld0luc3RhbmNlcy5sZW5ndGh9YCkuaXNTdWNjZXNzO1xyXG4gICAgICAgICAgICAgICAgLy8gbmV3SW5zdGFuY2VzLnB1c2gobmV3SW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyYW1TdHJpbmcgPSBzdHJpbmdpZnlQYXJhbShwYXJhbSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydEVuZFN0cmluZyA9IHN0cmluZ2lmeVN0YXJ0RW5kKEdlb21MaWIuY3JlYXRlUG9pbnQzZChzdGFydC54LCBzdGFydC55LCBzdGFydEhlaWdodCksIEdlb21MaWIuY3JlYXRlUG9pbnQzZChlbmQueCwgZW5kLnksIGVuZEhlaWdodCkpO1xyXG4gICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZ3JvdXBEZWYuc2V0Q3VzdG9tUHJvcGVydHkoUGFyYW1LZXksIHBhcmFtU3RyaW5nKS5pc1N1Y2Nlc3M7XHJcbiAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBncm91cERlZi5zZXRDdXN0b21Qcm9wZXJ0eShTdGFydEVuZEtleSwgc3RhcnRFbmRTdHJpbmcpLmlzU3VjY2VzcztcclxuICAgICAgICAgICAgICAgIC8vIGlmIChiYXNlTGluZVNlZzNkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYmFzZUNvbXBvbmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IEJhc2VMaW5lU3RyaW5nID0gc3RyaW5naWZ5U3RhcnRFbmQoYmFzZUNvbXBvbmVudC5saW5lM2Quc3RhcnQsIGJhc2VDb21wb25lbnQubGluZTNkLmVuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZ3JvdXBEZWYuc2V0Q3VzdG9tUHJvcGVydHkoQmFzZUxpbmVTZWczZEtleSwgQmFzZUxpbmVTdHJpbmcpLmlzU3VjY2VzcztcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBiYXNlU2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHNlZ21lbnRzLCBiYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYmFzZVNlZ21lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFzZUNvbXBvbmVudFN0cmluZyA9IHN0cmluZ2lmeUJhc2VDb21wb25lbnQoYmFzZVNlZ21lbnQsIGJhc2VDb21wb25lbnQubGluZTNkSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBncm91cERlZi5zZXRDdXN0b21Qcm9wZXJ0eShCYXNlQ29tcG9uZW50S2V5LCBiYXNlQ29tcG9uZW50U3RyaW5nKS5pc1N1Y2Nlc3M7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNpcmNsZVRhbmdlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YW5nZW50U3RyaW5nID0gc3RyaW5naWZ5UG9pbnQzZChjaXJjbGVUYW5nZW50KTtcclxuICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBncm91cERlZi5zZXRDdXN0b21Qcm9wZXJ0eShDaXJjbGVUYW5nZW50S2V5LCB0YW5nZW50U3RyaW5nKS5pc1N1Y2Nlc3M7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3SW5zdGFuY2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBidWlsZEhhbmRyYWlsSW5zdGFuY2Uoc3RhaXJQYXJhbSwgaGFuZHJhaWxzKSB7XHJcbiAgICB2YXIgX2EsIF9iLCBfYztcclxuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgY29uc3QgeyBoYW5kcmFpbDogeyBzdXBwb3J0LCBoZWlnaHQsIHJhaWw6IHsgdHlwZTogcmFpbFR5cGUsIHBhcmFtOiByYWlsUGFyYW0gfSwgY29sdW1uOiB7IHR5cGU6IGNvbHVtblR5cGUsIHBhcmFtOiBjb2x1bW5QYXJhbSB9IH0gfSA9IHN0YWlyUGFyYW07XHJcbiAgICAgICAgaWYgKCFzdXBwb3J0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmFpbEZhY2U7XHJcbiAgICAgICAgaWYgKHJhaWxUeXBlID09PSBSYWlsVHlwZS5DaXJjbGUpIHtcclxuICAgICAgICAgICAgcmFpbEZhY2UgPSBkcmF3Q2lyY2xlKHJhaWxQYXJhbS5yYWRpdXMgfHwgRGVmYXVsdFN0YWlyUGFyYW0uaG9yaXpvbnRhbFN0ZXAgLyA1KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocmFpbFR5cGUgPT09IFJhaWxUeXBlLlJlY3QpIHtcclxuICAgICAgICAgICAgcmFpbEZhY2UgPSBkcmF3UmVjdChyYWlsUGFyYW0ud2lkdGggfHwgRGVmYXVsdFN0YWlyUGFyYW0uaG9yaXpvbnRhbFN0ZXAgLyA1LCByYWlsUGFyYW0uaGVpZ2h0IHx8IERlZmF1bHRTdGFpclBhcmFtLmhvcml6b250YWxTdGVwIC8gNSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcmFpbExvb3AgPSByYWlsRmFjZSA9PT0gbnVsbCB8fCByYWlsRmFjZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmFpbEZhY2UuZ2V0T3V0ZXJMb29wKCk7XHJcbiAgICAgICAgaWYgKCFyYWlsRmFjZSB8fCAhcmFpbExvb3ApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNvbHVtbkZhY2U7XHJcbiAgICAgICAgaWYgKGNvbHVtblR5cGUgPT09IENvbHVtblR5cGUuQ2lyY2xlKSB7XHJcbiAgICAgICAgICAgIGNvbHVtbkZhY2UgPSBkcmF3Q2lyY2xlKGNvbHVtblBhcmFtLnJhZGl1cyB8fCBEZWZhdWx0U3RhaXJQYXJhbS5ob3Jpem9udGFsU3RlcCAvIDEwLCAxMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjb2x1bW5UeXBlID09PSBDb2x1bW5UeXBlLlJlY3QpIHtcclxuICAgICAgICAgICAgY29sdW1uRmFjZSA9IGRyYXdSZWN0KGNvbHVtblBhcmFtLndpZHRoIHx8IERlZmF1bHRTdGFpclBhcmFtLmhvcml6b250YWxTdGVwIC8gMTAsIGNvbHVtblBhcmFtLmhlaWdodCB8fCBEZWZhdWx0U3RhaXJQYXJhbS5ob3Jpem9udGFsU3RlcCAvIDEwLCAxMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGNvbHVtbkxvb3AgPSBjb2x1bW5GYWNlID09PSBudWxsIHx8IGNvbHVtbkZhY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbHVtbkZhY2UuZ2V0T3V0ZXJMb29wKCk7XHJcbiAgICAgICAgaWYgKCFjb2x1bW5GYWNlIHx8ICFjb2x1bW5Mb29wKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGFjdGl2ZURlc2lnbiA9IGFwcC5nZXRBY3RpdmVEZXNpZ24oKTtcclxuICAgICAgICBjb25zdCBoYW5kcmFpbEluc3RhbmNlID0gKF9hID0gYWN0aXZlRGVzaWduLm1ha2VHcm91cChbcmFpbEZhY2UsIGNvbHVtbkZhY2VdLCBbXSwgW10pKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYWRkZWRJbnN0YW5jZTtcclxuICAgICAgICBjb25zdCBoYW5kcmFpbERlZmluaXRpb24gPSBoYW5kcmFpbEluc3RhbmNlID09PSBudWxsIHx8IGhhbmRyYWlsSW5zdGFuY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGhhbmRyYWlsSW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCk7XHJcbiAgICAgICAgaWYgKCFoYW5kcmFpbEluc3RhbmNlIHx8ICFoYW5kcmFpbERlZmluaXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgYWN0aXZhdGVJbnN0YW5jZVJlcyA9IHlpZWxkIGFjdGl2ZURlc2lnbi5hY3RpdmF0ZUdyb3VwSW5zdGFuY2UoaGFuZHJhaWxJbnN0YW5jZSk7XHJcbiAgICAgICAgaWYgKCFhY3RpdmF0ZUluc3RhbmNlUmVzLmlzU3VjY2Vzcykge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjb2x1bW5BdXhpbGlhcnlCb3VuZGVkQ3VydmUgPSAoX2IgPSBhY3RpdmVEZXNpZ24uYWRkQXV4aWxpYXJ5Qm91bmRlZEN1cnZlKEdlb21MaWIuY3JlYXRlTGluZVNlZ21lbnQzZChHZW9tTGliLmNyZWF0ZVBvaW50M2QoMCwgMCwgaGVpZ2h0IC8gMiksIEdlb21MaWIuY3JlYXRlUG9pbnQzZCgwLCAwLCAtaGVpZ2h0IC8gMikpKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmFkZGVkQ3VydmU7XHJcbiAgICAgICAgaWYgKCFjb2x1bW5BdXhpbGlhcnlCb3VuZGVkQ3VydmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc3dlZXBDb2x1bW5SZXMgPSBhY3RpdmVEZXNpZ24uc3dlZXBGb2xsb3dDdXJ2ZXMoY29sdW1uTG9vcCwgW2NvbHVtbkF1eGlsaWFyeUJvdW5kZWRDdXJ2ZV0pO1xyXG4gICAgICAgIGlmICghc3dlZXBDb2x1bW5SZXMuaXNTdWNjZXNzIHx8ICFzd2VlcENvbHVtblJlcy5hZGRlZFNoZWxscy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgY29sdW1uT3JpZ2luRmFjZXMgPSBbXTtcclxuICAgICAgICBmb3IgKGNvbnN0IGNvbHVtbk9yaWdpblNoZWxsIG9mIHN3ZWVwQ29sdW1uUmVzLmFkZGVkU2hlbGxzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbkZhY2VzID0gY29sdW1uT3JpZ2luU2hlbGwuZ2V0RmFjZXMoKTtcclxuICAgICAgICAgICAgY29sdW1uT3JpZ2luRmFjZXMucHVzaCguLi5jb2x1bW5GYWNlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGNvbHVtbk9yaWdpbkluc3RhbmNlID0gKF9jID0gYWN0aXZlRGVzaWduLm1ha2VHcm91cChjb2x1bW5PcmlnaW5GYWNlcywgW10sIFtdKSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmFkZGVkSW5zdGFuY2U7XHJcbiAgICAgICAgaWYgKCFjb2x1bW5PcmlnaW5JbnN0YW5jZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjb2x1bW5DZW50ZXJzID0gW107XHJcbiAgICAgICAgZm9yIChjb25zdCB7IHJhaWwsIGNvbHVtbnMgfSBvZiBoYW5kcmFpbHMpIHtcclxuICAgICAgICAgICAgY29uc3QgcmFpbEJvdW5kZWRDdXJ2ZXMgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByYWlsLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmFpbFBvaW50ID0gcmFpbFtpXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJhaWxOZXh0UG9pbnQgPSByYWlsW2kgKyAxXTtcclxuICAgICAgICAgICAgICAgIHJhaWxCb3VuZGVkQ3VydmVzLnB1c2goKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFkZEF1eFJlcyA9IGFjdGl2ZURlc2lnbi5hZGRBdXhpbGlhcnlCb3VuZGVkQ3VydmUoR2VvbUxpYi5jcmVhdGVMaW5lU2VnbWVudDNkKHJhaWxQb2ludCwgcmFpbE5leHRQb2ludCkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFkZEF1eFJlcyA9PT0gbnVsbCB8fCBhZGRBdXhSZXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGFkZEF1eFJlcy5hZGRlZEN1cnZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFpbEJvdW5kZWRDdXJ2ZXMucHVzaChhZGRBdXhSZXMuYWRkZWRDdXJ2ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHN3ZWVwUmFpbFJlcyA9IGFjdGl2ZURlc2lnbi5zd2VlcEZvbGxvd0N1cnZlcyhyYWlsTG9vcCwgcmFpbEJvdW5kZWRDdXJ2ZXMpO1xyXG4gICAgICAgICAgICBpZiAoIXN3ZWVwUmFpbFJlcy5pc1N1Y2Nlc3MgfHwgIXN3ZWVwUmFpbFJlcy5hZGRlZFNoZWxscy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChjb25zdCBjb2x1bW4gb2YgY29sdW1ucykge1xyXG4gICAgICAgICAgICAgICAgY29sdW1uQ2VudGVycy5wdXNoKEdlb21MaWIuY3JlYXRlUG9pbnQzZChjb2x1bW5bMF0ueCArIGNvbHVtblsxXS54LCBjb2x1bW5bMF0ueSArIGNvbHVtblsxXS55LCBjb2x1bW5bMF0ueiArIGNvbHVtblsxXS56KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbHVtbkNlbnRlcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbkNvcHlSZXMgPSBhY3RpdmVEZXNpZ24uYnVsa0NvcHlHcm91cEluc3RhbmNlcyhbY29sdW1uT3JpZ2luSW5zdGFuY2VdLCBbY29sdW1uQ2VudGVycy5tYXAoY2VudGVyID0+IEdlb21MaWIuY3JlYXRlVHJhbnNsYXRpb25NYXRyaXg0KGNlbnRlci54LCBjZW50ZXIueSwgY2VudGVyLnopKV0pO1xyXG4gICAgICAgICAgICBpZiAoIShjb2x1bW5Db3B5UmVzID09PSBudWxsIHx8IGNvbHVtbkNvcHlSZXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbHVtbkNvcHlSZXMuYWRkZWRJbnN0YW5jZXMubGVuZ3RoKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCByZW1vdmVPcmlnaW5Db2x1bW5SZXMgPSBhY3RpdmVEZXNpZ24ucmVtb3ZlR3JvdXBJbnN0YW5jZShjb2x1bW5PcmlnaW5JbnN0YW5jZSk7XHJcbiAgICAgICAgaWYgKCFyZW1vdmVPcmlnaW5Db2x1bW5SZXMuaXNTdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRvIHJlbW92ZSBhbGwgYXV4aWxpYXJ5Q3VydmVzXHJcbiAgICAgICAgY29uc3QgZGVhY3RpdmF0ZUluc3RhbmNlUmVzID0geWllbGQgYWN0aXZlRGVzaWduLmRlYWN0aXZhdGVHcm91cEluc3RhbmNlKCk7XHJcbiAgICAgICAgaWYgKCFkZWFjdGl2YXRlSW5zdGFuY2VSZXMuaXNTdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHNldFByb3BlcnR5UmVzID0gaGFuZHJhaWxEZWZpbml0aW9uLnNldEN1c3RvbVByb3BlcnR5KEhhbmRyYWlsTW9kZWxLZXksIFN0YWlyTW9kZWxWYWx1ZSk7XHJcbiAgICAgICAgaWYgKCFzZXRQcm9wZXJ0eVJlcy5pc1N1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGhhbmRyYWlsSW5zdGFuY2U7XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZHJhd0NpcmNsZShyYWRpdXMsIHogPSAwKSB7XHJcbiAgICBjb25zdCBhY3RpdmVEZXNpZ24gPSBhcHAuZ2V0QWN0aXZlRGVzaWduKCk7XHJcbiAgICBjb25zdCByZXMgPSBhY3RpdmVEZXNpZ24uYWRkQ2lyY2xlKEdlb21MaWIuY3JlYXRlQ2lyY2xlM2RCeUNlbnRlck5vcm1hbFJhZGl1cyhHZW9tTGliLmNyZWF0ZVBvaW50M2QoMCwgMCwgeiksIERpcmVjdGlvblosIHJhZGl1cykpO1xyXG4gICAgaWYgKHJlcyA9PT0gbnVsbCB8fCByZXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlcy5hZGRlZEVkZ2VzLmxlbmd0aCkge1xyXG4gICAgICAgIGNvbnN0IHNoZWxsID0gcmVzLmFkZGVkRWRnZXNbMF0uZ2V0U2hlbGwoKTtcclxuICAgICAgICBjb25zdCBmYWNlcyA9IHNoZWxsID09PSBudWxsIHx8IHNoZWxsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzaGVsbC5nZXRGYWNlcygpO1xyXG4gICAgICAgIGlmICgoZmFjZXMgPT09IG51bGwgfHwgZmFjZXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGZhY2VzLmxlbmd0aCkgPT09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhY2VzWzBdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdSZWN0KHdpZHRoLCBoZWlnaHQsIHogPSAwLCB3aXRoQ29ybmVyID0gdHJ1ZSkge1xyXG4gICAgY29uc3QgcG9pbnQxID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKDAsIDAsIHopO1xyXG4gICAgY29uc3QgcG9pbnQyID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKHdpZHRoLCAwLCB6KTtcclxuICAgIGNvbnN0IHBvaW50cyA9IFtwb2ludDEsIHBvaW50Ml07XHJcbiAgICBpZiAod2l0aENvcm5lcikge1xyXG4gICAgICAgIGNvbnN0IHA1ID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKHdpZHRoLCBoZWlnaHQgLyAzICogMiwgeik7XHJcbiAgICAgICAgY29uc3QgcDYgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2Qod2lkdGggLyA0ICogMywgaGVpZ2h0LCB6KTtcclxuICAgICAgICBjb25zdCBtMSA9IEdlb21MaWIuY3JlYXRlUG9pbnQzZCgocDUueCArIHA2LngpIC8gMiwgKHA1LnkgKyBwNi55KSAvIDIsIHopO1xyXG4gICAgICAgIGNvbnN0IGRpcjEgPSBwNi5zdWJ0cmFjdGVkKHA1KS5ub3JtYWxpemVkKCk7XHJcbiAgICAgICAgY29uc3QgdG9DZW50ZXJEaXIxID0gRGlyZWN0aW9uWi5jcm9zcyhkaXIxKTtcclxuICAgICAgICBjb25zdCBkMSA9IHA1LmRpc3RhbmNlVG8ocDYpO1xyXG4gICAgICAgIC8vIGNvbnN0IHIxID0gZDEgLyAyIC8gTWF0aC5zaW4oTWF0aC5QSSAvIDYpO1xyXG4gICAgICAgIGNvbnN0IGgxID0gZDEgLyAyIC8gTWF0aC50YW4oTWF0aC5QSSAvIDYpO1xyXG4gICAgICAgIGNvbnN0IGNlbnRlcjEgPSBtMS5hZGRlZCh0b0NlbnRlckRpcjEubXVsdGlwbGllZChoMSkpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTE7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCByb3RhdGVNYXQgPSBHZW9tTGliLmNyZWF0ZVJvdGF0ZU1hdHJpeDQoaSAqIE1hdGguUEkgLyAzMCwgRGlyZWN0aW9uWiwgY2VudGVyMSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRpc2NyZXRlUG9pbnQgPSBwNS5hcHBsaWVkTWF0cml4NChyb3RhdGVNYXQpO1xyXG4gICAgICAgICAgICBwb2ludHMucHVzaChkaXNjcmV0ZVBvaW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcDcgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2Qod2lkdGggLyA0LCBoZWlnaHQsIHopO1xyXG4gICAgICAgIGNvbnN0IHA4ID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKDAsIGhlaWdodCAvIDMgKiAyLCB6KTtcclxuICAgICAgICBjb25zdCBtMiA9IEdlb21MaWIuY3JlYXRlUG9pbnQzZCgocDUueCArIHA2LngpIC8gMiwgKHA1LnkgKyBwNi55KSAvIDIsIHopO1xyXG4gICAgICAgIGNvbnN0IGRpcjIgPSBwOC5zdWJ0cmFjdGVkKHA3KS5ub3JtYWxpemVkKCk7XHJcbiAgICAgICAgY29uc3QgdG9DZW50ZXJEaXIyID0gRGlyZWN0aW9uWi5jcm9zcyhkaXIyKTtcclxuICAgICAgICBjb25zdCBkMiA9IHA3LmRpc3RhbmNlVG8ocDgpO1xyXG4gICAgICAgIC8vIGNvbnN0IHIyID0gZDIgLyAyIC8gTWF0aC5zaW4oTWF0aC5QSSAvIDYpO1xyXG4gICAgICAgIGNvbnN0IGgyID0gZDIgLyAyIC8gTWF0aC50YW4oTWF0aC5QSSAvIDYpO1xyXG4gICAgICAgIGNvbnN0IGNlbnRlcjIgPSBtMi5hZGRlZCh0b0NlbnRlckRpcjIubXVsdGlwbGllZChoMikpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTE7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCByb3RhdGVNYXQgPSBHZW9tTGliLmNyZWF0ZVJvdGF0ZU1hdHJpeDQoaSAqIE1hdGguUEkgLyAzMCwgRGlyZWN0aW9uWiwgY2VudGVyMik7XHJcbiAgICAgICAgICAgIGNvbnN0IGRpc2NyZXRlUG9pbnQgPSBwNy5hcHBsaWVkTWF0cml4NChyb3RhdGVNYXQpO1xyXG4gICAgICAgICAgICBwb2ludHMucHVzaChkaXNjcmV0ZVBvaW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjb25zdCBwb2ludDMgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2Qod2lkdGgsIGhlaWdodCwgeik7XHJcbiAgICAgICAgY29uc3QgcG9pbnQ0ID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKDAsIGhlaWdodCwgeik7XHJcbiAgICAgICAgcG9pbnRzLnB1c2gocG9pbnQzLCBwb2ludDQpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgYWN0aXZlRGVzaWduID0gYXBwLmdldEFjdGl2ZURlc2lnbigpO1xyXG4gICAgY29uc3QgcmVzID0gYWN0aXZlRGVzaWduLmFkZEVkZ2VzKHBvaW50cyk7XHJcbiAgICBpZiAocmVzID09PSBudWxsIHx8IHJlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVzLmFkZGVkRWRnZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgY29uc3Qgc2V0U29mdFJlc3VsdCA9IGFjdGl2ZURlc2lnbi5zZXRFZGdlc1NvZnQocmVzLmFkZGVkRWRnZXMsIHRydWUpO1xyXG4gICAgICAgIGlmIChzZXRTb2Z0UmVzdWx0LmlzU3VjY2Vzcykge1xyXG4gICAgICAgICAgICBjb25zdCBzaGVsbCA9IHJlcy5hZGRlZEVkZ2VzWzBdLmdldFNoZWxsKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGZhY2VzID0gc2hlbGwgPT09IG51bGwgfHwgc2hlbGwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNoZWxsLmdldEZhY2VzKCk7XHJcbiAgICAgICAgICAgIGlmICgoZmFjZXMgPT09IG51bGwgfHwgZmFjZXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGZhY2VzLmxlbmd0aCkgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWNlc1swXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFNlZ21lbnRCeUluZGV4KHNlZ21lbnRzLCBpbmRleCkge1xyXG4gICAgaWYgKGluZGV4ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNlZ21lbnRzLmZpbmQoc2VnbWVudCA9PiBzZWdtZW50LnBhcmFtLmluZGV4ID09PSBpbmRleCk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkU2VnbWVudFJlbGF0aW9ucyhzZWdtZW50cykge1xyXG4gICAgZm9yIChjb25zdCBzZWdtZW50IG9mIHNlZ21lbnRzKSB7XHJcbiAgICAgICAgY29uc3QgYmFzZUNvbXBvbmVudCA9IHNlZ21lbnQuYmFzZUNvbXBvbmVudDtcclxuICAgICAgICBjb25zdCBiYXNlU2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHNlZ21lbnRzLCBiYXNlQ29tcG9uZW50ID09PSBudWxsIHx8IGJhc2VDb21wb25lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJhc2VDb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xyXG4gICAgICAgIGlmIChiYXNlU2VnbWVudCAmJiAoYmFzZUNvbXBvbmVudCA9PT0gbnVsbCB8fCBiYXNlQ29tcG9uZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBiYXNlQ29tcG9uZW50LmxpbmUzZEluZGV4KSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGJhc2VTZWdtZW50Lm5leHRDb21wb25lbnRzW2Jhc2VDb21wb25lbnQubGluZTNkSW5kZXhdLmFkZChzZWdtZW50LnBhcmFtLmluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE5leHRDb21wb25lbnRzKHNlZ21lbnQsIHNlZ21lbnRzKSB7XHJcbiAgICBjb25zdCB7IG5leHRDb21wb25lbnRzIH0gPSBzZWdtZW50O1xyXG4gICAgY29uc3QgbmV4dFNlZ21lbnRzID0gW107XHJcbiAgICBmb3IgKGNvbnN0IG5leHRDb21wb25lbnRJbmRleGVzIG9mIG5leHRDb21wb25lbnRzKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBuZXh0Q29tcG9uZW50SW5kZXggb2YgbmV4dENvbXBvbmVudEluZGV4ZXMpIHtcclxuICAgICAgICAgICAgY29uc3QgbmV4dFNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleChzZWdtZW50cywgbmV4dENvbXBvbmVudEluZGV4KTtcclxuICAgICAgICAgICAgaWYgKG5leHRTZWdtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBuZXh0U2VnbWVudHMucHVzaChuZXh0U2VnbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV4dFNlZ21lbnRzO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjaGFuZ2VTdGFpclVwd2FyZChzdGFydFNlZ21lbnQsIHNlZ21lbnRzLCB1cHdhcmQsIGJ1bGtDaGFuZ2UpIHtcclxuICAgIGlmIChzZWdtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICBsZXQgY3VycmVudCA9IFt7IHNlZ21lbnQ6IHN0YXJ0U2VnbWVudCwgdmVydGljYWxEZWx0YTogMCB9XTtcclxuICAgICAgICBjb25zdCB1blZpc2l0ZWQgPSBuZXcgU2V0KHNlZ21lbnRzKTtcclxuICAgICAgICB3aGlsZSAoY3VycmVudC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgbGV0IG5leHQgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCB7IHNlZ21lbnQsIHZlcnRpY2FsRGVsdGEgfSBvZiBjdXJyZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IHN0YXJ0SGVpZ2h0LCBlbmRIZWlnaHQgfSA9IHNlZ21lbnQ7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbmREZWx0YSA9IHNlZ21lbnQucGFyYW0udXB3YXJkID09PSB1cHdhcmQgPyAwIDogMiAqIChzdGFydEhlaWdodCAtIGVuZEhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBzZWdtZW50LnN0YXJ0SGVpZ2h0ICs9IHZlcnRpY2FsRGVsdGE7XHJcbiAgICAgICAgICAgICAgICBzZWdtZW50LmVuZEhlaWdodCArPSB2ZXJ0aWNhbERlbHRhICsgZW5kRGVsdGE7XHJcbiAgICAgICAgICAgICAgICBzZWdtZW50LnBhcmFtLnVwd2FyZCA9IHVwd2FyZDtcclxuICAgICAgICAgICAgICAgIHVuVmlzaXRlZC5kZWxldGUoc2VnbWVudCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXh0U2VnbWVudHMgPSBnZXROZXh0Q29tcG9uZW50cyhzZWdtZW50LCBzZWdtZW50cyk7XHJcbiAgICAgICAgICAgICAgICBpZiAobmV4dFNlZ21lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHQucHVzaCguLi5uZXh0U2VnbWVudHMubWFwKHNlZyA9PiAoeyBzZWdtZW50OiBzZWcsIHZlcnRpY2FsRGVsdGE6IHZlcnRpY2FsRGVsdGEgKyBlbmREZWx0YSB9KSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSBuZXh0O1xyXG4gICAgICAgICAgICBpZiAoIWN1cnJlbnQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYnVsa0NoYW5nZSAmJiB1blZpc2l0ZWQuc2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoZVNlZ21lbnQgPSBbLi4udW5WaXNpdGVkLnZhbHVlcygpXVswXTtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gW3sgc2VnbWVudDogdGhlU2VnbWVudCwgdmVydGljYWxEZWx0YTogdGhlU2VnbWVudC5zdGFydEhlaWdodCA+IDAgPT09IHVwd2FyZCA/IDAgOiAodGhlU2VnbWVudC5zdGFydEhlaWdodCAqIC0yKSB9XTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBBbmdsZVRvbGVyYW5jZSwgRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UsIERpcmVjdGlvblosIGR1bW15UG9pbnQzZCwgTGVuZ3RoVG9sZXJhbmNlLCBTdGVwQ291bnRMaW1pdCB9IGZyb20gXCIuL2NvbnN0c1wiO1xyXG5pbXBvcnQgeyBnZXRTZWdtZW50QnlJbmRleCB9IGZyb20gXCIuL21lc2hVdGlsc1wiO1xyXG5pbXBvcnQgeyBDb21wb25lbnRUeXBlLCBDb21wb25lbnREaXJlY3Rpb25UeXBlLCBDaXJjdWxhclNpZGUgfSBmcm9tIFwiLi90eXBlc1wiO1xyXG5pbXBvcnQgeyBpc0VxdWFsIH0gZnJvbSBcIi4vdXRpbHNcIjtcclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlU2hhcGUoc2VnbWVudCwgdGVtcCA9IHRydWUpIHtcclxuICAgIGNvbnN0IHsgcGFyYW06IHsgdHlwZSB9LCBjaXJjbGVUYW5nZW50IH0gPSBzZWdtZW50O1xyXG4gICAgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpcikge1xyXG4gICAgICAgIGdlbmVyYXRlU3RyYWlnaHRTdGFpclNoYXBlKHNlZ21lbnQsIHRlbXApO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5DaXJjdWxhclN0YWlyKSB7XHJcbiAgICAgICAgaWYgKGNpcmNsZVRhbmdlbnQpIHtcclxuICAgICAgICAgICAgZ2VuZXJhdGVDaXJjdWxhclN0YWlyU2hhcGUoc2VnbWVudCwgdGVtcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBnZW5lcmF0ZVN0cmFpZ2h0U3RhaXJTaGFwZShzZWdtZW50LCB0ZW1wKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBnZW5lcmF0ZVBsYXRmb3JtU2hhcGUoc2VnbWVudCwgdGVtcCk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZ2VuZXJhdGVDaXJjdWxhclN0YWlyU2hhcGUoc2VnbWVudCwgdGVtcCA9IHRydWUpIHtcclxuICAgIGNvbnN0IHsgc3RhcnQsIGVuZCwgc3RhaXJTaGFwZSwgbW9sZFNoYXBlLCBjb3JuZXJTaGFwZSwgY29ybmVyTW9sZFNoYXBlLCBzdGFydEhlaWdodCwgYmFzZUNvbXBvbmVudCwgY2lyY2xlVGFuZ2VudCwgcGFyYW0gfSA9IHNlZ21lbnQ7XHJcbiAgICBjb25zdCB7IHN0YXJ0V2lkdGgsIGVuZFdpZHRoLCBob3Jpem9udGFsU3RlcCwgdmVydGljYWxTdGVwLCB1cHdhcmQsIHBsYXRmb3JtVGhpY2tuZXNzIH0gPSBwYXJhbTtcclxuICAgIGlmIChjaXJjbGVUYW5nZW50KSB7XHJcbiAgICAgICAgY29uc3QgdGFuZ2VudExlZnREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKGNpcmNsZVRhbmdlbnQpLm5vcm1hbGl6ZWQoKTtcclxuICAgICAgICBjb25zdCBzdGFydEVuZERpciA9IGVuZC5zdWJ0cmFjdGVkKHN0YXJ0KS5ub3JtYWxpemVkKCk7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRFbmREaXN0YW5jZSA9IHN0YXJ0LmRpc3RhbmNlVG8oZW5kKTtcclxuICAgICAgICBjb25zdCBtYXhXaWR0aCA9IE1hdGgubWF4KHN0YXJ0V2lkdGgsIGVuZFdpZHRoKTtcclxuICAgICAgICBjb25zdCBlbmRBbmdsZSA9IHN0YXJ0RW5kRGlyLmFuZ2xlVG8oY2lyY2xlVGFuZ2VudCwgRGlyZWN0aW9uWik7XHJcbiAgICAgICAgaWYgKGVuZEFuZ2xlIDwgRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGdlbmVyYXRlU3RyYWlnaHRTdGFpclNoYXBlKHNlZ21lbnQsIHRlbXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBpc0xlZnRBcmMgPSBlbmRBbmdsZSA+IE1hdGguUEk7XHJcbiAgICAgICAgaWYgKGlzTGVmdEFyYykge1xyXG4gICAgICAgICAgICBzZWdtZW50LmNpcmN1bGFyU2lkZSA9IENpcmN1bGFyU2lkZS5MZWZ0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgc2VnbWVudC5jaXJjdWxhclNpZGUgPSBDaXJjdWxhclNpZGUuUmlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGVuZENvbXBsZW1lbnRhcnlBbmdsZSA9IGlzTGVmdEFyYyA/IE1hdGguYWJzKGVuZEFuZ2xlIC0gTWF0aC5QSSAvIDIgLSBNYXRoLlBJKSA6IE1hdGguYWJzKGVuZEFuZ2xlIC0gTWF0aC5QSSAvIDIpO1xyXG4gICAgICAgIGNvbnN0IGhhbGZDaG9yZCA9IHN0YXJ0RW5kRGlzdGFuY2UgLyAyO1xyXG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IGhhbGZDaG9yZCAvIE1hdGguY29zKGVuZENvbXBsZW1lbnRhcnlBbmdsZSk7XHJcbiAgICAgICAgY29uc3QgaW5uZXJSYWRpdXMgPSByYWRpdXMgLSBtYXhXaWR0aCAvIDI7XHJcbiAgICAgICAgaWYgKHJhZGl1cyA8IG1heFdpZHRoIC8gMiAqIDEuMiB8fCBpbm5lclJhZGl1cyA8IGhvcml6b250YWxTdGVwIC8gMiAvIDAuOCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGhvcml6b250YWxTdGVwQW5nbGUgPSBNYXRoLmFzaW4oaG9yaXpvbnRhbFN0ZXAgLyAyIC8gaW5uZXJSYWRpdXMpICogMjtcclxuICAgICAgICBjb25zdCBjaXJjbGVOb3JtYWwgPSBpc0xlZnRBcmMgPyBEaXJlY3Rpb25aIDogRGlyZWN0aW9uWi5yZXZlcnNlZCgpO1xyXG4gICAgICAgIGNvbnN0IGNpcmNsZUNlbnRlciA9IHN0YXJ0LmFkZGVkKHRhbmdlbnRMZWZ0RGlyLm11bHRpcGxpZWQoaXNMZWZ0QXJjID8gcmFkaXVzIDogLXJhZGl1cykpO1xyXG4gICAgICAgIC8vIGNvbnN0IGNpcmNsZSA9IEdlb21MaWIuY3JlYXRlQ2lyY2xlM2RCeUNlbnRlck5vcm1hbFJhZGl1cyhjaXJjbGVDZW50ZXIsIGNpcmNsZU5vcm1hbCwgcmFkaXVzKTtcclxuICAgICAgICBjb25zdCBhcmMgPSBHZW9tTGliLmNyZWF0ZUFyYzNkQnlDZW50ZXJOb3JtYWxSYWRpdXMoY2lyY2xlQ2VudGVyLCBjaXJjbGVOb3JtYWwsIHJhZGl1cywgc3RhcnQsIGVuZCk7XHJcbiAgICAgICAgY29uc3QgYXJjQW5nbGUgPSBhcmMuYXJjQW5nbGU7XHJcbiAgICAgICAgY29uc3Qgc3RlcENvdW50ID0gTWF0aC5jZWlsKGFyY0FuZ2xlIC8gaG9yaXpvbnRhbFN0ZXBBbmdsZSk7XHJcbiAgICAgICAgY29uc3QgbGFzdEhvcml6b250YWxBbmdsZSA9IGFyY0FuZ2xlIC0gaG9yaXpvbnRhbFN0ZXBBbmdsZSAqIChzdGVwQ291bnQgLSAxKTtcclxuICAgICAgICBjb25zdCB2YWxpZFN0ZXBDb3VudCA9IChsYXN0SG9yaXpvbnRhbEFuZ2xlID09PSAwIHx8IGxhc3RIb3Jpem9udGFsQW5nbGUgPiBBbmdsZVRvbGVyYW5jZSkgPyBzdGVwQ291bnQgOiBzdGVwQ291bnQgLSAxO1xyXG4gICAgICAgIGlmIChob3Jpem9udGFsU3RlcEFuZ2xlID49IGFyY0FuZ2xlIHx8IGhvcml6b250YWxTdGVwQW5nbGUgPj0gTWF0aC5QSSAvIDIgfHwgdmFsaWRTdGVwQ291bnQgPj0gU3RlcENvdW50TGltaXQgfHwgdmFsaWRTdGVwQ291bnQgPCAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFtdO1xyXG4gICAgICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW107XHJcbiAgICAgICAgbW9sZFNoYXBlLnZlcnRpY2VzID0gW107XHJcbiAgICAgICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtdO1xyXG4gICAgICAgIGNvcm5lclNoYXBlLnZlcnRpY2VzID0gW107XHJcbiAgICAgICAgY29ybmVyU2hhcGUudGVtcExpbmVzID0gW107XHJcbiAgICAgICAgY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzID0gW107XHJcbiAgICAgICAgY29ybmVyTW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtdO1xyXG4gICAgICAgIGNvbnN0IHsgdmVydGljZXMsIHRlbXBMaW5lcyB9ID0gc3RhaXJTaGFwZTtcclxuICAgICAgICBjb25zdCB7IHZlcnRpY2VzOiBtb2xkVmVydGljZXMsIHRlbXBMaW5lczogbW9sZFRlbXBMaW5lcyB9ID0gbW9sZFNoYXBlO1xyXG4gICAgICAgIC8vIGNvbnN0IGNlbnRlckhvcml6b250YWxTdGVwID0gaG9yaXpvbnRhbFN0ZXAgLyBpbm5lclJhZGl1cyAqIHJhZGl1cztcclxuICAgICAgICBjb25zdCBzdGVwSGVpZ2h0ID0gdXB3YXJkID8gdmVydGljYWxTdGVwIDogLXZlcnRpY2FsU3RlcDtcclxuICAgICAgICBzZWdtZW50LmVuZEhlaWdodCA9IHNlZ21lbnQuc3RhcnRIZWlnaHQgKyB2YWxpZFN0ZXBDb3VudCAqIHN0ZXBIZWlnaHQ7XHJcbiAgICAgICAgc3RhaXJTaGFwZS5zdGVwQ291bnQgPSB2YWxpZFN0ZXBDb3VudDtcclxuICAgICAgICBtb2xkU2hhcGUuc3RlcENvdW50ID0gdmFsaWRTdGVwQ291bnQ7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3ZhbGlkU3RlcENvdW50OiAgICcsdmFsaWRTdGVwQ291bnQpO1xyXG4gICAgICAgIGNvbnN0IGxlZnRQdCA9IHN0YXJ0LmFkZGVkKHRhbmdlbnRMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKTtcclxuICAgICAgICBjb25zdCByaWdodFB0ID0gc3RhcnQuYWRkZWQodGFuZ2VudExlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKTtcclxuICAgICAgICBjb25zdCBzdGFydFJhZGl1c0RpciA9IGlzTGVmdEFyYyA/IHRhbmdlbnRMZWZ0RGlyLnJldmVyc2VkKCkgOiB0YW5nZW50TGVmdERpcjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ZXBDb3VudCAtIDE7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBjdXJSb3RhdGVNYXRyaXggPSBHZW9tTGliLmNyZWF0ZVJvdGF0ZU1hdHJpeDQoaG9yaXpvbnRhbFN0ZXBBbmdsZSAqIGksIGNpcmNsZU5vcm1hbCwgZHVtbXlQb2ludDNkKTtcclxuICAgICAgICAgICAgY29uc3QgY3VyUmFkaXVzRGlyID0gc3RhcnRSYWRpdXNEaXIuYXBwbGllZE1hdHJpeDQoY3VyUm90YXRlTWF0cml4KTtcclxuICAgICAgICAgICAgY29uc3QgY3VySGFsZldpZHRoID0gKHN0YXJ0V2lkdGggKyAoZW5kV2lkdGggLSBzdGFydFdpZHRoKSAqIChpICogaG9yaXpvbnRhbFN0ZXBBbmdsZSkgLyBhcmNBbmdsZSkgLyAyICogKGlzTGVmdEFyYyA/IC0xIDogMSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1ckxlZnRNb2xkUHQgPSBjaXJjbGVDZW50ZXIuYWRkZWQoY3VyUmFkaXVzRGlyLm11bHRpcGxpZWQocmFkaXVzICsgY3VySGFsZldpZHRoKSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1clJpZ2h0TW9sZFB0ID0gY2lyY2xlQ2VudGVyLmFkZGVkKGN1clJhZGl1c0Rpci5tdWx0aXBsaWVkKHJhZGl1cyAtIGN1ckhhbGZXaWR0aCkpO1xyXG4gICAgICAgICAgICBjb25zdCBjdXJMZWZ0UHQgPSBjdXJMZWZ0TW9sZFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIGkgKiBzdGVwSGVpZ2h0KSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1clJpZ2h0UHQgPSBjdXJSaWdodE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBpICogc3RlcEhlaWdodCkpO1xyXG4gICAgICAgICAgICBtb2xkVmVydGljZXMucHVzaChjdXJMZWZ0TW9sZFB0LCBjdXJSaWdodE1vbGRQdCk7XHJcbiAgICAgICAgICAgIG1vbGRUZW1wTGluZXMucHVzaChbMiAqIGksIDEgKyAyICogaV0sIFsyICogaSwgMiArIDIgKiBpXSwgWzEgKyAyICogaSwgMyArIDIgKiBpXSk7XHJcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2goY3VyTGVmdFB0LCBjdXJSaWdodFB0KTtcclxuICAgICAgICAgICAgY29uc3QgbmV4dFJvdGF0ZU1hdHJpeCA9IEdlb21MaWIuY3JlYXRlUm90YXRlTWF0cml4NChob3Jpem9udGFsU3RlcEFuZ2xlICogKGkgKyAxKSwgY2lyY2xlTm9ybWFsLCBkdW1teVBvaW50M2QpO1xyXG4gICAgICAgICAgICBjb25zdCBuZXh0UmFkaXVzRGlyID0gc3RhcnRSYWRpdXNEaXIuYXBwbGllZE1hdHJpeDQobmV4dFJvdGF0ZU1hdHJpeCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG5leHRIYWxmV2lkdGggPSAoc3RhcnRXaWR0aCArIChlbmRXaWR0aCAtIHN0YXJ0V2lkdGgpICogKChpICsgMSkgKiBob3Jpem9udGFsU3RlcEFuZ2xlKSAvIGFyY0FuZ2xlKSAvIDIgKiAoaXNMZWZ0QXJjID8gLTEgOiAxKTtcclxuICAgICAgICAgICAgY29uc3QgbmV4dExlZnRNb2xkUHQgPSBjaXJjbGVDZW50ZXIuYWRkZWQobmV4dFJhZGl1c0Rpci5tdWx0aXBsaWVkKHJhZGl1cyArIG5leHRIYWxmV2lkdGgpKTtcclxuICAgICAgICAgICAgY29uc3QgbmV4dFJpZ2h0TW9sZFB0ID0gY2lyY2xlQ2VudGVyLmFkZGVkKG5leHRSYWRpdXNEaXIubXVsdGlwbGllZChyYWRpdXMgLSBuZXh0SGFsZldpZHRoKSk7XHJcbiAgICAgICAgICAgIGNvbnN0IG5leHRMZWZ0UHQgPSBuZXh0TGVmdE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBpICogc3RlcEhlaWdodCkpO1xyXG4gICAgICAgICAgICBjb25zdCBuZXh0UmlnaHRQdCA9IG5leHRSaWdodE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBpICogc3RlcEhlaWdodCkpO1xyXG4gICAgICAgICAgICBpZiAodXB3YXJkKSB7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKGN1ckxlZnRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLCBjdXJSaWdodFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaChuZXh0TGVmdFB0LCBuZXh0UmlnaHRQdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRlbXApIHtcclxuICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFs0ICogaSwgMSArIDQgKiBpXSwgWzQgKiBpLCAyICsgNCAqIGldLCBbMSArIDQgKiBpLCAzICsgNCAqIGldLCBbMiArIDQgKiBpLCAzICsgNCAqIGldLCBbMiArIDQgKiBpLCA0ICsgNCAqIGldLCBbMyArIDQgKiBpLCA1ICsgNCAqIGldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaSA9PT0gc3RlcENvdW50IC0gMikge1xyXG4gICAgICAgICAgICAgICAgbW9sZFZlcnRpY2VzLnB1c2gobmV4dExlZnRNb2xkUHQsIG5leHRSaWdodE1vbGRQdCk7XHJcbiAgICAgICAgICAgICAgICBtb2xkVGVtcExpbmVzLnB1c2goWzIgKiAoc3RlcENvdW50IC0gMSksIDEgKyAyICogKHN0ZXBDb3VudCAtIDEpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGkgPT09IHN0ZXBDb3VudCAtIDIpIHtcclxuICAgICAgICAgICAgICAgIC8vIGlmICh1cHdhcmQpIHtcclxuICAgICAgICAgICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKG5leHRMZWZ0UHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSwgbmV4dFJpZ2h0UHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGVtcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFs0ICogKHN0ZXBDb3VudCAtIDEpLCAxICsgNCAqIChzdGVwQ291bnQgLSAxKV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGxhc3RSb3RhdGVNYXRyaXggPSBHZW9tTGliLmNyZWF0ZVJvdGF0ZU1hdHJpeDQoYXJjQW5nbGUsIGNpcmNsZU5vcm1hbCwgZHVtbXlQb2ludDNkKTtcclxuICAgICAgICBjb25zdCBsYXN0UmFkaXVzRGlyID0gc3RhcnRSYWRpdXNEaXIuYXBwbGllZE1hdHJpeDQobGFzdFJvdGF0ZU1hdHJpeCk7XHJcbiAgICAgICAgY29uc3QgbGFzdEhhbGZXaWR0aCA9IGlzTGVmdEFyYyA/IC1lbmRXaWR0aCAvIDIgOiBlbmRXaWR0aCAvIDI7XHJcbiAgICAgICAgY29uc3QgbGFzdExlZnRNb2xkUHQgPSBjaXJjbGVDZW50ZXIuYWRkZWQobGFzdFJhZGl1c0Rpci5tdWx0aXBsaWVkKHJhZGl1cyArIGxhc3RIYWxmV2lkdGgpKTtcclxuICAgICAgICBjb25zdCBsYXN0UmlnaHRNb2xkUHQgPSBjaXJjbGVDZW50ZXIuYWRkZWQobGFzdFJhZGl1c0Rpci5tdWx0aXBsaWVkKHJhZGl1cyAtIGxhc3RIYWxmV2lkdGgpKTtcclxuICAgICAgICBjb25zdCBsYXN0TGVmdFB0ID0gbGFzdExlZnRNb2xkUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0ICsgc3RlcENvdW50ICogc3RlcEhlaWdodCkpO1xyXG4gICAgICAgIGNvbnN0IGxhc3RSaWdodFB0ID0gbGFzdFJpZ2h0TW9sZFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIHN0ZXBDb3VudCAqIHN0ZXBIZWlnaHQpKTtcclxuICAgICAgICBpZiAoc3RlcENvdW50ID09PSAxKSB7XHJcbiAgICAgICAgICAgIG1vbGRWZXJ0aWNlcy5wdXNoKGxlZnRQdCwgcmlnaHRQdCk7XHJcbiAgICAgICAgICAgIG1vbGRUZW1wTGluZXMucHVzaChbMiAqIChzdGVwQ291bnQgLSAxKSwgMSArIDIgKiAoc3RlcENvdW50IC0gMSldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxhc3RIb3Jpem9udGFsQW5nbGUgPj0gQW5nbGVUb2xlcmFuY2UgfHwgbGFzdEhvcml6b250YWxBbmdsZSA9PT0gMCkge1xyXG4gICAgICAgICAgICBtb2xkVmVydGljZXMucHVzaChsYXN0TGVmdE1vbGRQdCwgbGFzdFJpZ2h0TW9sZFB0KTtcclxuICAgICAgICAgICAgbW9sZFRlbXBMaW5lcy5wdXNoKFsyICogKHN0ZXBDb3VudCAtIDEpLCAyICsgMiAqIChzdGVwQ291bnQgLSAxKV0sIFsxICsgMiAqIChzdGVwQ291bnQgLSAxKSwgMyArIDIgKiAoc3RlcENvdW50IC0gMSldLCBbMiAqIHN0ZXBDb3VudCwgMSArIDIgKiBzdGVwQ291bnRdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHVwd2FyZCkge1xyXG4gICAgICAgICAgICBpZiAoc3RlcENvdW50ID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKGxlZnRQdCwgcmlnaHRQdCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGVtcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFs0ICogKHN0ZXBDb3VudCAtIDEpLCAxICsgNCAqIChzdGVwQ291bnQgLSAxKV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChsYXN0SG9yaXpvbnRhbEFuZ2xlID49IEFuZ2xlVG9sZXJhbmNlIHx8IGxhc3RIb3Jpem9udGFsQW5nbGUgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHZlcnRpY2FsU3RlcCkpLCB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQodmVydGljYWxTdGVwKSkpO1xyXG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaChsYXN0TGVmdFB0LCBsYXN0UmlnaHRQdCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGVtcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFs0ICogKHN0ZXBDb3VudCAtIDEpLCAyICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsxICsgNCAqIChzdGVwQ291bnQgLSAxKSwgMyArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMiArIDQgKiAoc3RlcENvdW50IC0gMSksIDMgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCA0ICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFszICsgNCAqIChzdGVwQ291bnQgLSAxKSwgNSArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbNCAqIHN0ZXBDb3VudCwgMSArIDQgKiBzdGVwQ291bnRdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHN0ZXBDb3VudCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaChsZWZ0UHQsIHJpZ2h0UHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbNCAqIChzdGVwQ291bnQgLSAxKSwgMSArIDQgKiAoc3RlcENvdW50IC0gMSldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobGFzdEhvcml6b250YWxBbmdsZSA+PSBBbmdsZVRvbGVyYW5jZSB8fCBsYXN0SG9yaXpvbnRhbEFuZ2xlID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKGxhc3RMZWZ0UHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0KSksIGxhc3RSaWdodFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCgtc3RlcEhlaWdodCkpKTtcclxuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2gobGFzdExlZnRQdCwgbGFzdFJpZ2h0UHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbNCAqIChzdGVwQ291bnQgLSAxKSwgMiArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMSArIDQgKiAoc3RlcENvdW50IC0gMSksIDMgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCAzICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsyICsgNCAqIChzdGVwQ291bnQgLSAxKSwgNCArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMyArIDQgKiAoc3RlcENvdW50IC0gMSksIDUgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzQgKiBzdGVwQ291bnQsIDEgKyA0ICogc3RlcENvdW50XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHN0ZXBDb3VudCA+IDEpIHtcclxuICAgICAgICAgICAgaWYgKHRlbXApIHtcclxuICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSAyLCAyICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsxICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMiArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgYWN0dWFsTGFzdFN0ZXBMZW5ndGggPSBsYXN0SG9yaXpvbnRhbEFuZ2xlIDwgQW5nbGVUb2xlcmFuY2UgPyBob3Jpem9udGFsU3RlcEFuZ2xlIDogbGFzdEhvcml6b250YWxBbmdsZTtcclxuICAgICAgICAgICAgaWYgKHVwd2FyZCkge1xyXG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQgLSAoMSAtIGFjdHVhbExhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXBBbmdsZSkgKiBzdGVwSGVpZ2h0KSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCgtc3RlcEhlaWdodCAtICgxIC0gYWN0dWFsTGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcEFuZ2xlKSAqIHN0ZXBIZWlnaHQpKSk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gc3RlcENvdW50IC0gKGxhc3RIb3Jpem9udGFsQW5nbGUgPj0gQW5nbGVUb2xlcmFuY2UgPyAxIDogMik7IGogPiAwOyBqLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2SW5kID0gaiAqIDQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIDIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaiA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAwXSwgWzMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2SW5kXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQpKSwgdmVydGljZXNbdkluZCArIDFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCgtc3RlcEhlaWdodCkpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIHZlcnRpY2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gNl0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSxcclxuICAgICAgICAgICAgICAgIC8vICAgICB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSA1XS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLFxyXG4gICAgICAgICAgICAgICAgLy8gKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSBzdGVwQ291bnQgLSAobGFzdEhvcml6b250YWxBbmdsZSA+PSBBbmdsZVRvbGVyYW5jZSA/IDEgOiAyKTsgaiA+PSAwOyBqLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2SW5kID0gaiAqIDQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIDIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaiA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAwXSwgWzMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2SW5kXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1t2SW5kICsgMV0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0ZW1wKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbdmVydGljZXMubGVuZ3RoIC0gMiwgMiArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMSArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMF0sIFszICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh1cHdhcmQpIHtcclxuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0KSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCgtc3RlcEhlaWdodCkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbMF0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSwgdmVydGljZXNbMV0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJhc2VDb21wb25lbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgYmFzZUxpbmVTZWczZCA9IGJhc2VDb21wb25lbnQubGluZTNkO1xyXG4gICAgICAgICAgICBjb25zdCBiYXNlTGluZURpciA9IGJhc2VMaW5lU2VnM2QuZW5kLnN1YnRyYWN0ZWQoYmFzZUxpbmVTZWczZC5zdGFydCkubm9ybWFsaXplZCgpO1xyXG4gICAgICAgICAgICBjb25zdCBhbmdsZSA9IGNpcmNsZVRhbmdlbnQuYW5nbGUoYmFzZUxpbmVEaXIpO1xyXG4gICAgICAgICAgICBpZiAoYW5nbGUgPCBNYXRoLlBJIC8gMikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29ybmVyQ29ubmVjdGlvblBvaW50MSA9IHN0YXJ0LmFkZGVkKGJhc2VMaW5lRGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyICogTWF0aC5zaWduKGFuZ2xlKSkpO1xyXG4gICAgICAgICAgICAgICAgY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzID0gW3N0YXJ0LCBzdGFydC5hZGRlZCh0YW5nZW50TGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpLCBjb3JuZXJDb25uZWN0aW9uUG9pbnQxXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvcm5lckNvbm5lY3Rpb25Qb2ludDIgPSBzdGFydC5hZGRlZChiYXNlTGluZURpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyICogTWF0aC5zaWduKGFuZ2xlKSkpO1xyXG4gICAgICAgICAgICAgICAgY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzID0gW3N0YXJ0LCBjb3JuZXJDb25uZWN0aW9uUG9pbnQyLCBzdGFydC5hZGRlZCh0YW5nZW50TGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvcm5lck1vbGRTaGFwZS50ZW1wTGluZXMgPSBbWzAsIDFdLCBbMSwgMl0sIFsyLCAwXV07XHJcbiAgICAgICAgICAgIGNvcm5lclNoYXBlLnZlcnRpY2VzID0gW1xyXG4gICAgICAgICAgICAgICAgLi4uY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzLm1hcCh2ID0+IHYuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkpLFxyXG4gICAgICAgICAgICAgICAgLi4uY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzLm1hcCh2ID0+IHYuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0IC0gcGxhdGZvcm1UaGlja25lc3MpKSksXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIGlmICh0ZW1wKSB7XHJcbiAgICAgICAgICAgICAgICBjb3JuZXJTaGFwZS50ZW1wTGluZXMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgWzAsIDFdLCBbMSwgMl0sIFsyLCAwXSxcclxuICAgICAgICAgICAgICAgICAgICBbMywgNF0sIFs0LCA1XSwgWzUsIDNdLFxyXG4gICAgICAgICAgICAgICAgICAgIFswLCAzXSwgWzEsIDRdLCBbMiwgNV0sXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGdlbmVyYXRlU3RyYWlnaHRTdGFpclNoYXBlKHNlZ21lbnQsIHRlbXAgPSB0cnVlKSB7XHJcbiAgICBjb25zdCB7IHN0YXJ0LCBlbmQsIHN0YWlyU2hhcGUsIG1vbGRTaGFwZSwgY29ybmVyU2hhcGUsIGNvcm5lck1vbGRTaGFwZSwgc3RhcnRIZWlnaHQsIGJhc2VDb21wb25lbnQsIHBhcmFtIH0gPSBzZWdtZW50O1xyXG4gICAgY29uc3QgeyBzdGFydFdpZHRoLCBlbmRXaWR0aCwgaG9yaXpvbnRhbFN0ZXAsIHZlcnRpY2FsU3RlcCwgdXB3YXJkLCBwbGF0Zm9ybVRoaWNrbmVzcyB9ID0gcGFyYW07XHJcbiAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gW107XHJcbiAgICBzdGFpclNoYXBlLnRlbXBMaW5lcyA9IFtdO1xyXG4gICAgbW9sZFNoYXBlLnZlcnRpY2VzID0gW107XHJcbiAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW107XHJcbiAgICBjb3JuZXJTaGFwZS52ZXJ0aWNlcyA9IFtdO1xyXG4gICAgY29ybmVyU2hhcGUudGVtcExpbmVzID0gW107XHJcbiAgICBjb3JuZXJNb2xkU2hhcGUudmVydGljZXMgPSBbXTtcclxuICAgIGNvcm5lck1vbGRTaGFwZS50ZW1wTGluZXMgPSBbXTtcclxuICAgIGNvbnN0IHsgdmVydGljZXMsIHRlbXBMaW5lcyB9ID0gc3RhaXJTaGFwZTtcclxuICAgIGNvbnN0IHsgdmVydGljZXM6IG1vbGRWZXJ0aWNlcywgdGVtcExpbmVzOiBtb2xkVGVtcExpbmVzIH0gPSBtb2xkU2hhcGU7XHJcbiAgICBsZXQgaG9yaXpvbnRhbEZyb250RGlyID0gZW5kLnN1YnRyYWN0ZWQoc3RhcnQpLm5vcm1hbGl6ZWQoKTtcclxuICAgIGxldCBob3Jpem9udGFsRGlzdGFuY2UgPSBzdGFydC5kaXN0YW5jZVRvKGVuZCk7XHJcbiAgICBsZXQgaG9yaXpvbnRhbExlZnREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKGhvcml6b250YWxGcm9udERpcik7XHJcbiAgICBjb25zdCBzdGVwRmxvYXRDb3VudCA9IGhvcml6b250YWxEaXN0YW5jZSAvIGhvcml6b250YWxTdGVwO1xyXG4gICAgY29uc3Qgc3RlcENvdW50ID0gTWF0aC5jZWlsKHN0ZXBGbG9hdENvdW50KTtcclxuICAgIGNvbnN0IGxhc3RTdGVwTGVuZ3RoID0gaG9yaXpvbnRhbERpc3RhbmNlIC0gKHN0ZXBDb3VudCAtIDEpICogaG9yaXpvbnRhbFN0ZXA7XHJcbiAgICBjb25zdCB2YWxpZFN0ZXBDb3VudCA9IChsYXN0U3RlcExlbmd0aCA9PT0gMCB8fCBsYXN0U3RlcExlbmd0aCA+IExlbmd0aFRvbGVyYW5jZSkgPyBzdGVwQ291bnQgOiBzdGVwQ291bnQgLSAxO1xyXG4gICAgaWYgKHZhbGlkU3RlcENvdW50IDwgMSB8fCB2YWxpZFN0ZXBDb3VudCA+PSBTdGVwQ291bnRMaW1pdCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChiYXNlQ29tcG9uZW50KSB7XHJcbiAgICAgICAgY29uc3QgYmFzZUxpbmVTZWczZCA9IGJhc2VDb21wb25lbnQubGluZTNkO1xyXG4gICAgICAgIGNvbnN0IGJhc2VMaW5lRGlyID0gYmFzZUxpbmVTZWczZC5lbmQuc3VidHJhY3RlZChiYXNlTGluZVNlZzNkLnN0YXJ0KS5ub3JtYWxpemVkKCk7XHJcbiAgICAgICAgY29uc3QgYW5nbGUgPSBob3Jpem9udGFsRnJvbnREaXIuYW5nbGUoYmFzZUxpbmVEaXIpO1xyXG4gICAgICAgIGNvbnN0IGRlbHRhQW5nbGUgPSBNYXRoLmFicyhhbmdsZSAtIE1hdGguUEkgLyAyKTtcclxuICAgICAgICBpZiAoZGVsdGFBbmdsZSA8PSBEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSkge1xyXG4gICAgICAgICAgICBzZWdtZW50LmNvbXBvbmVudERpcmVjdGlvblR5cGUgPSBDb21wb25lbnREaXJlY3Rpb25UeXBlLkZyb250O1xyXG4gICAgICAgICAgICBob3Jpem9udGFsRnJvbnREaXIgPSBiYXNlTGluZURpci5jcm9zcyhob3Jpem9udGFsRnJvbnREaXIuY3Jvc3MoYmFzZUxpbmVEaXIpKS5ub3JtYWxpemVkKCk7XHJcbiAgICAgICAgICAgIGhvcml6b250YWxEaXN0YW5jZSA9IGhvcml6b250YWxEaXN0YW5jZSAqIE1hdGguY29zKGRlbHRhQW5nbGUpO1xyXG4gICAgICAgICAgICBob3Jpem9udGFsTGVmdERpciA9IERpcmVjdGlvblouY3Jvc3MoaG9yaXpvbnRhbEZyb250RGlyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChhbmdsZSA8IE1hdGguUEkgLyAyKSB7XHJcbiAgICAgICAgICAgICAgICBzZWdtZW50LmNvbXBvbmVudERpcmVjdGlvblR5cGUgPSBDb21wb25lbnREaXJlY3Rpb25UeXBlLkxlZnQ7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb3JuZXJDb25uZWN0aW9uUG9pbnQxID0gc3RhcnQuYWRkZWQoYmFzZUxpbmVEaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIgKiBNYXRoLnNpZ24oYW5nbGUpKSk7XHJcbiAgICAgICAgICAgICAgICBjb3JuZXJNb2xkU2hhcGUudmVydGljZXMgPSBbc3RhcnQsIHN0YXJ0LmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSksIGNvcm5lckNvbm5lY3Rpb25Qb2ludDFdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VnbWVudC5jb21wb25lbnREaXJlY3Rpb25UeXBlID0gQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5SaWdodDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvcm5lckNvbm5lY3Rpb25Qb2ludDIgPSBzdGFydC5hZGRlZChiYXNlTGluZURpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyICogTWF0aC5zaWduKGFuZ2xlKSkpO1xyXG4gICAgICAgICAgICAgICAgY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzID0gW3N0YXJ0LCBjb3JuZXJDb25uZWN0aW9uUG9pbnQyLCBzdGFydC5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvcm5lck1vbGRTaGFwZS50ZW1wTGluZXMgPSBbWzAsIDFdLCBbMSwgMl0sIFsyLCAwXV07XHJcbiAgICAgICAgICAgIGNvcm5lclNoYXBlLnZlcnRpY2VzID0gW1xyXG4gICAgICAgICAgICAgICAgLi4uY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzLm1hcCh2ID0+IHYuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkpLFxyXG4gICAgICAgICAgICAgICAgLi4uY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzLm1hcCh2ID0+IHYuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0IC0gcGxhdGZvcm1UaGlja25lc3MpKSksXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIGlmICh0ZW1wKSB7XHJcbiAgICAgICAgICAgICAgICBjb3JuZXJTaGFwZS50ZW1wTGluZXMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgWzAsIDFdLCBbMSwgMl0sIFsyLCAwXSxcclxuICAgICAgICAgICAgICAgICAgICBbMywgNF0sIFs0LCA1XSwgWzUsIDNdLFxyXG4gICAgICAgICAgICAgICAgICAgIFswLCAzXSwgWzEsIDRdLCBbMiwgNV0sXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3Qgc3RlcEhlaWdodCA9IHVwd2FyZCA/IHZlcnRpY2FsU3RlcCA6IC12ZXJ0aWNhbFN0ZXA7XHJcbiAgICBzZWdtZW50LmVuZEhlaWdodCA9IHNlZ21lbnQuc3RhcnRIZWlnaHQgKyB2YWxpZFN0ZXBDb3VudCAqIHN0ZXBIZWlnaHQ7XHJcbiAgICBzdGFpclNoYXBlLnN0ZXBDb3VudCA9IHZhbGlkU3RlcENvdW50O1xyXG4gICAgbW9sZFNoYXBlLnN0ZXBDb3VudCA9IHZhbGlkU3RlcENvdW50O1xyXG4gICAgY29uc3QgbGVmdFB0ID0gc3RhcnQuYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpO1xyXG4gICAgY29uc3QgcmlnaHRQdCA9IHN0YXJ0LmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSk7XHJcbiAgICBjb25zdCB3aWR0aERlbHRhID0gKGVuZFdpZHRoIC0gc3RhcnRXaWR0aCkgLyAyIC8gKHN0ZXBGbG9hdENvdW50KTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RlcENvdW50IC0gMTsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgY3VyTGVmdE1vbGRQdCA9IGxlZnRQdC5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChpICogaG9yaXpvbnRhbFN0ZXApKS5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKGkgKiB3aWR0aERlbHRhKSk7XHJcbiAgICAgICAgY29uc3QgY3VyUmlnaHRNb2xkUHQgPSByaWdodFB0LmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGkgKiBob3Jpem9udGFsU3RlcCkpLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoLWkgKiB3aWR0aERlbHRhKSk7XHJcbiAgICAgICAgY29uc3QgY3VyTGVmdFB0ID0gY3VyTGVmdE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBpICogc3RlcEhlaWdodCkpO1xyXG4gICAgICAgIGNvbnN0IGN1clJpZ2h0UHQgPSBjdXJSaWdodE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBpICogc3RlcEhlaWdodCkpO1xyXG4gICAgICAgIG1vbGRWZXJ0aWNlcy5wdXNoKGN1ckxlZnRNb2xkUHQsIGN1clJpZ2h0TW9sZFB0KTtcclxuICAgICAgICBtb2xkVGVtcExpbmVzLnB1c2goWzIgKiBpLCAxICsgMiAqIGldLCBbMiAqIGksIDIgKyAyICogaV0sIFsxICsgMiAqIGksIDMgKyAyICogaV0pO1xyXG4gICAgICAgIHZlcnRpY2VzLnB1c2goY3VyTGVmdFB0LCBjdXJSaWdodFB0KTtcclxuICAgICAgICBpZiAodXB3YXJkKSB7XHJcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2goY3VyTGVmdFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksIGN1clJpZ2h0UHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKGN1ckxlZnRQdC5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpLCBjdXJSaWdodFB0LmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGVtcCkge1xyXG4gICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbNCAqIGksIDEgKyA0ICogaV0sIFs0ICogaSwgMiArIDQgKiBpXSwgWzEgKyA0ICogaSwgMyArIDQgKiBpXSwgWzIgKyA0ICogaSwgMyArIDQgKiBpXSwgWzIgKyA0ICogaSwgNCArIDQgKiBpXSwgWzMgKyA0ICogaSwgNSArIDQgKiBpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbW9sZFZlcnRpY2VzLnB1c2goc3RlcENvdW50ID4gMSA/IG1vbGRWZXJ0aWNlc1ttb2xkVmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaG9yaXpvbnRhbFN0ZXApKSA6IGxlZnRQdCwgc3RlcENvdW50ID4gMSA/IG1vbGRWZXJ0aWNlc1ttb2xkVmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaG9yaXpvbnRhbFN0ZXApKSA6IHJpZ2h0UHQpO1xyXG4gICAgbW9sZFRlbXBMaW5lcy5wdXNoKFsyICogKHN0ZXBDb3VudCAtIDEpLCAxICsgMiAqIChzdGVwQ291bnQgLSAxKV0pO1xyXG4gICAgaWYgKGxhc3RTdGVwTGVuZ3RoID4gTGVuZ3RoVG9sZXJhbmNlIHx8IGxhc3RTdGVwTGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgbW9sZFZlcnRpY2VzLnB1c2gobW9sZFZlcnRpY2VzW21vbGRWZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXAgKiB3aWR0aERlbHRhKSkuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGgpKSwgbW9sZFZlcnRpY2VzW21vbGRWZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKC1sYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwICogd2lkdGhEZWx0YSkpLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoKSkpO1xyXG4gICAgICAgIG1vbGRUZW1wTGluZXMucHVzaChbMiAqIChzdGVwQ291bnQgLSAxKSwgMiArIDIgKiAoc3RlcENvdW50IC0gMSldLCBbMSArIDIgKiAoc3RlcENvdW50IC0gMSksIDMgKyAyICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKiBzdGVwQ291bnQsIDEgKyAyICogc3RlcENvdW50XSk7XHJcbiAgICB9XHJcbiAgICBpZiAodXB3YXJkKSB7XHJcbiAgICAgICAgdmVydGljZXMucHVzaChzdGVwQ291bnQgPiAxID8gdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaG9yaXpvbnRhbFN0ZXApKSA6IGxlZnRQdCwgc3RlcENvdW50ID4gMSA/IHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSkgOiByaWdodFB0KTtcclxuICAgICAgICBpZiAodGVtcCkge1xyXG4gICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbNCAqIChzdGVwQ291bnQgLSAxKSwgMSArIDQgKiAoc3RlcENvdW50IC0gMSldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxhc3RTdGVwTGVuZ3RoID4gTGVuZ3RoVG9sZXJhbmNlIHx8IGxhc3RTdGVwTGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSk7XHJcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwICogd2lkdGhEZWx0YSkpLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoKSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoLWxhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXAgKiB3aWR0aERlbHRhKSkuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGgpKSk7XHJcbiAgICAgICAgICAgIGlmICh0ZW1wKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChcclxuICAgICAgICAgICAgICAgIC8vIFs0ICogc3RlcENvdW50LCAxICsgNCAqIHN0ZXBDb3VudF0sXHJcbiAgICAgICAgICAgICAgICBbNCAqIChzdGVwQ291bnQgLSAxKSwgMiArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMSArIDQgKiAoc3RlcENvdW50IC0gMSksIDMgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCAzICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsyICsgNCAqIChzdGVwQ291bnQgLSAxKSwgNCArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMyArIDQgKiAoc3RlcENvdW50IC0gMSksIDUgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzQgKiBzdGVwQ291bnQsIDEgKyA0ICogc3RlcENvdW50XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB2ZXJ0aWNlcy5wdXNoKHN0ZXBDb3VudCA+IDEgPyB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpIDogbGVmdFB0LCBzdGVwQ291bnQgPiAxID8gdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSA6IHJpZ2h0UHQpO1xyXG4gICAgICAgIGlmICh0ZW1wKSB7XHJcbiAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFs0ICogKHN0ZXBDb3VudCAtIDEpLCAxICsgNCAqIChzdGVwQ291bnQgLSAxKV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobGFzdFN0ZXBMZW5ndGggPiBMZW5ndGhUb2xlcmFuY2UgfHwgbGFzdFN0ZXBMZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXAgKiB3aWR0aERlbHRhKSkuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGgpKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZCgtbGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcCAqIHdpZHRoRGVsdGEpKS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCkpKTtcclxuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpKTtcclxuICAgICAgICAgICAgaWYgKHRlbXApIHtcclxuICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgLy8gWzQgKiAoc3RlcENvdW50IC0gMSksIDEgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSxcclxuICAgICAgICAgICAgICAgIFs0ICogKHN0ZXBDb3VudCAtIDEpLCAyICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsxICsgNCAqIChzdGVwQ291bnQgLSAxKSwgMyArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMiArIDQgKiAoc3RlcENvdW50IC0gMSksIDMgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCA0ICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFszICsgNCAqIChzdGVwQ291bnQgLSAxKSwgNSArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbNCAqIHN0ZXBDb3VudCwgMSArIDQgKiBzdGVwQ291bnRdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChzdGVwQ291bnQgPiAxKSB7XHJcbiAgICAgICAgaWYgKHRlbXApIHtcclxuICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIDIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMiArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDQgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCA1ICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFt2ZXJ0aWNlcy5sZW5ndGggKyAyLCAxICsgdmVydGljZXMubGVuZ3RoICsgMl0sIFt2ZXJ0aWNlcy5sZW5ndGggKyAyLCAwXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggKyAyLCAxXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGFjdHVhbExhc3RTdGVwTGVuZ3RoID0gbGFzdFN0ZXBMZW5ndGggPCBMZW5ndGhUb2xlcmFuY2UgPyBob3Jpem9udGFsU3RlcCA6IGxhc3RTdGVwTGVuZ3RoO1xyXG4gICAgICAgIGlmICh1cHdhcmQpIHtcclxuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQgLSAoMSAtIGFjdHVhbExhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXApICogc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQgLSAoMSAtIGFjdHVhbExhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXApICogc3RlcEhlaWdodCkpKTtcclxuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1swXS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpLCB2ZXJ0aWNlc1sxXS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoLWFjdHVhbExhc3RTdGVwTGVuZ3RoKSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKC1hY3R1YWxMYXN0U3RlcExlbmd0aCkpKTtcclxuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1swXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1sxXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBpZiAodGVtcCkge1xyXG4gICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbdmVydGljZXMubGVuZ3RoIC0gMiwgMiArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMSArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMF0sIFszICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodXB3YXJkKSB7XHJcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0KSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCgtc3RlcEhlaWdodCkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbMF0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSwgdmVydGljZXNbMV0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGdlbmVyYXRlUGxhdGZvcm1TaGFwZShzZWdtZW50LCB0ZW1wID0gdHJ1ZSkge1xyXG4gICAgY29uc3QgeyBzdGFydCwgc3RhcnRIZWlnaHQsIGJhc2VDb21wb25lbnQsIHN0YWlyU2hhcGUsIG1vbGRTaGFwZSwgY29ybmVyU2hhcGUsIGNvcm5lck1vbGRTaGFwZSwgcGFyYW0gfSA9IHNlZ21lbnQ7XHJcbiAgICBjb25zdCB7IHN0YXJ0V2lkdGgsIG9mZnNldFdpZHRoLCB3aXRoT2Zmc2V0LCBwbGF0Zm9ybVRoaWNrbmVzcywgcGxhdGZvcm1MZW5ndGgsIHBsYXRmb3JtTGVuZ3RoTG9ja2VkLCBtb2RlbEVkaXRpbmcgfSA9IHBhcmFtO1xyXG4gICAgY29uc3QgY3VyRGlyID0gc2VnbWVudC5lbmQuc3VidHJhY3RlZChzdGFydCk7XHJcbiAgICBjb25zdCBjdXJEaXJOb3JtYWxpemVkID0gc2VnbWVudC5lbmQuc3VidHJhY3RlZChzdGFydCkubm9ybWFsaXplZCgpO1xyXG4gICAgY29uc3QgY3VyTGVmdERpciA9IERpcmVjdGlvblouY3Jvc3MoY3VyRGlyKS5ub3JtYWxpemVkKCk7XHJcbiAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gW107XHJcbiAgICBzdGFpclNoYXBlLnRlbXBMaW5lcyA9IFtdO1xyXG4gICAgbW9sZFNoYXBlLnZlcnRpY2VzID0gW107XHJcbiAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW107XHJcbiAgICBjb3JuZXJTaGFwZS52ZXJ0aWNlcyA9IFtdO1xyXG4gICAgY29ybmVyU2hhcGUudGVtcExpbmVzID0gW107XHJcbiAgICBjb3JuZXJNb2xkU2hhcGUudmVydGljZXMgPSBbXTtcclxuICAgIGNvcm5lck1vbGRTaGFwZS50ZW1wTGluZXMgPSBbXTtcclxuICAgIHNlZ21lbnQuZW5kID0gcGxhdGZvcm1MZW5ndGhMb2NrZWQgPyBzZWdtZW50LnN0YXJ0LmFkZGVkKGN1ckRpck5vcm1hbGl6ZWQubXVsdGlwbGllZChwbGF0Zm9ybUxlbmd0aCkpIDogc2VnbWVudC5lbmQ7XHJcbiAgICBzZWdtZW50LmVuZEhlaWdodCA9IHN0YXJ0SGVpZ2h0O1xyXG4gICAgaWYgKCFtb2RlbEVkaXRpbmcpIHtcclxuICAgICAgICBwYXJhbS53aXRoT2Zmc2V0ID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoYmFzZUNvbXBvbmVudCkge1xyXG4gICAgICAgIGNvbnN0IGJhc2VMaW5lU2VnM2QgPSBiYXNlQ29tcG9uZW50LmxpbmUzZDtcclxuICAgICAgICBjb25zdCB7IHN0YXJ0OiBiYXNlTGluZVN0YXJ0LCBlbmQ6IGJhc2VMaW5lRW5kIH0gPSBiYXNlTGluZVNlZzNkO1xyXG4gICAgICAgIGNvbnN0IGJhc2VMaW5lRGlyID0gYmFzZUxpbmVFbmQuc3VidHJhY3RlZChiYXNlTGluZVN0YXJ0KS5ub3JtYWxpemVkKCk7XHJcbiAgICAgICAgY29uc3QgcHJldkRpck5vcm1hbGl6ZWQgPSBiYXNlTGluZURpci5jcm9zcyhEaXJlY3Rpb25aKS5ub3JtYWxpemVkKCk7XHJcbiAgICAgICAgY29uc3QgcHJldkxlZnREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKHByZXZEaXJOb3JtYWxpemVkKS5ub3JtYWxpemVkKCk7XHJcbiAgICAgICAgY29uc3QgYW5nbGUgPSBjdXJEaXIuYW5nbGVUbyhwcmV2RGlyTm9ybWFsaXplZCwgRGlyZWN0aW9uWik7XHJcbiAgICAgICAgY29uc3QgZnJvbnRMZW5ndGggPSBwbGF0Zm9ybUxlbmd0aExvY2tlZCA/IHBsYXRmb3JtTGVuZ3RoIDogTWF0aC5hYnMoY3VyRGlyLmRvdChwcmV2RGlyTm9ybWFsaXplZCkpO1xyXG4gICAgICAgIGNvbnN0IGN1ckVuZExlZnRDb3JuZXIgPSBzZWdtZW50LmVuZC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKTtcclxuICAgICAgICBjb25zdCBkaXIxID0gY3VyRW5kTGVmdENvcm5lci5zdWJ0cmFjdGVkKHNlZ21lbnQuc3RhcnQpO1xyXG4gICAgICAgIGNvbnN0IGFuZ2xlMSA9IGRpcjEuYW5nbGUoY3VyRGlyKTtcclxuICAgICAgICBpZiAoKGFuZ2xlID49IE1hdGguUEkgJiYgYW5nbGUgPD0gKE1hdGguUEkgKiAzIC8gMiArIGFuZ2xlMSkpIHx8IChtb2RlbEVkaXRpbmcgJiYgd2l0aE9mZnNldCAmJiBvZmZzZXRXaWR0aCA+PSAwKSkge1xyXG4gICAgICAgICAgICBzZWdtZW50LmNvbXBvbmVudERpcmVjdGlvblR5cGUgPSBDb21wb25lbnREaXJlY3Rpb25UeXBlLkxlZnQ7XHJcbiAgICAgICAgICAgIHBhcmFtLnBsYXRmb3JtTGVuZ3RoID0gZnJvbnRMZW5ndGg7XHJcbiAgICAgICAgICAgIGNvbnN0IGZyb250RW5kID0gc2VnbWVudC5zdGFydC5hZGRlZChwcmV2RGlyTm9ybWFsaXplZC5tdWx0aXBsaWVkKGZyb250TGVuZ3RoKSk7XHJcbiAgICAgICAgICAgIHNlZ21lbnQuZW5kID0gZnJvbnRFbmQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGxlZnRMZW5ndGggPSB3aXRoT2Zmc2V0ICYmIG1vZGVsRWRpdGluZyA/IChvZmZzZXRXaWR0aCArIHN0YXJ0V2lkdGggLyAyKSA6IGN1ckRpci5kb3QocHJldkxlZnREaXIpO1xyXG4gICAgICAgICAgICBpZiAobGVmdExlbmd0aCA+IHN0YXJ0V2lkdGggLyAyKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJhbS53aXRoT2Zmc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHBhcmFtLm9mZnNldFdpZHRoID0gbGVmdExlbmd0aCAtIHN0YXJ0V2lkdGggLyAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbGlkTGVmdExlbmd0aCA9IE1hdGgubWF4KHN0YXJ0V2lkdGggLyAyLCBsZWZ0TGVuZ3RoKTtcclxuICAgICAgICAgICAgbW9sZFNoYXBlLnZlcnRpY2VzID0gW1xyXG4gICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCh2YWxpZExlZnRMZW5ndGgpKSxcclxuICAgICAgICAgICAgICAgIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSksXHJcbiAgICAgICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpLFxyXG4gICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCh2YWxpZExlZnRMZW5ndGgpKSxcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtbMCwgMV0sIFsxLCAyXSwgWzIsIDNdLCBbMywgMF1dO1xyXG4gICAgICAgICAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gWy4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCkpKSxcclxuICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCAtIHBsYXRmb3JtVGhpY2tuZXNzKSkpLFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICBpZiAodGVtcCkge1xyXG4gICAgICAgICAgICAgICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcyxcclxuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLm1hcChzZWcgPT4gW3NlZ1swXSArIDQsIHNlZ1sxXSArIDRdKSxcclxuICAgICAgICAgICAgICAgICAgICBbMCwgNF0sIFsxLCA1XSwgWzIsIDZdLCBbMywgN10sXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKChhbmdsZSA8IE1hdGguUEkgJiYgYW5nbGUgPj0gKE1hdGguUEkgLyAyIC0gYW5nbGUxKSkgfHwgKG1vZGVsRWRpdGluZyAmJiB3aXRoT2Zmc2V0ICYmIG9mZnNldFdpZHRoIDwgMCkpIHtcclxuICAgICAgICAgICAgc2VnbWVudC5jb21wb25lbnREaXJlY3Rpb25UeXBlID0gQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5SaWdodDtcclxuICAgICAgICAgICAgcGFyYW0ucGxhdGZvcm1MZW5ndGggPSBmcm9udExlbmd0aDtcclxuICAgICAgICAgICAgY29uc3QgcmlnaHRMZW5ndGggPSB3aXRoT2Zmc2V0ICYmIG1vZGVsRWRpdGluZyA/ICgtb2Zmc2V0V2lkdGggKyBzdGFydFdpZHRoIC8gMikgOiAtY3VyRGlyLmRvdChwcmV2TGVmdERpcik7XHJcbiAgICAgICAgICAgIGNvbnN0IGZyb250RW5kMSA9IHNlZ21lbnQuc3RhcnQuYWRkZWQocHJldkRpck5vcm1hbGl6ZWQubXVsdGlwbGllZChmcm9udExlbmd0aCkpO1xyXG4gICAgICAgICAgICBzZWdtZW50LmVuZCA9IGZyb250RW5kMTtcclxuICAgICAgICAgICAgaWYgKHJpZ2h0TGVuZ3RoID4gc3RhcnRXaWR0aCAvIDIpIHtcclxuICAgICAgICAgICAgICAgIHBhcmFtLndpdGhPZmZzZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcGFyYW0ub2Zmc2V0V2lkdGggPSAtKHJpZ2h0TGVuZ3RoIC0gc3RhcnRXaWR0aCAvIDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbGlkUmlnaHRMZW5ndGggPSBNYXRoLm1heChzdGFydFdpZHRoIC8gMiwgcmlnaHRMZW5ndGgpO1xyXG4gICAgICAgICAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXHJcbiAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSksXHJcbiAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC12YWxpZFJpZ2h0TGVuZ3RoKSksXHJcbiAgICAgICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC12YWxpZFJpZ2h0TGVuZ3RoKSksXHJcbiAgICAgICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSksXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIG1vbGRTaGFwZS50ZW1wTGluZXMgPSBbWzAsIDFdLCBbMSwgMl0sIFsyLCAzXSwgWzMsIDBdXTtcclxuICAgICAgICAgICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFsuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKSksXHJcbiAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgLSBwbGF0Zm9ybVRoaWNrbmVzcykpKSxcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgaWYgKHRlbXApIHtcclxuICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW1xyXG4gICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcy5tYXAoc2VnID0+IFtzZWdbMF0gKyA0LCBzZWdbMV0gKyA0XSksXHJcbiAgICAgICAgICAgICAgICAgICAgWzAsIDRdLCBbMSwgNV0sIFsyLCA2XSwgWzMsIDddLFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcGFyYW0ub2Zmc2V0V2lkdGggPSAwO1xyXG4gICAgICAgICAgICBpZiAoYW5nbGUgPD0gRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UgfHwgYW5nbGUgPj0gKE1hdGguUEkgKiAyIC0gRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UpKSB7XHJcbiAgICAgICAgICAgICAgICBzZWdtZW50LmNvbXBvbmVudERpcmVjdGlvblR5cGUgPSBDb21wb25lbnREaXJlY3Rpb25UeXBlLkZyb250O1xyXG4gICAgICAgICAgICAgICAgc2VnbWVudC5lbmQgPSBzZWdtZW50LnN0YXJ0LmFkZGVkKHByZXZEaXJOb3JtYWxpemVkLm11bHRpcGxpZWQoZnJvbnRMZW5ndGgpKTtcclxuICAgICAgICAgICAgICAgIHBhcmFtLnBsYXRmb3JtTGVuZ3RoID0gZnJvbnRMZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyICsgb2Zmc2V0V2lkdGgpKSxcclxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMiArIG9mZnNldFdpZHRoKSksXHJcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpLFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgIG1vbGRTaGFwZS50ZW1wTGluZXMgPSBbWzAsIDFdLCBbMSwgMl0sIFsyLCAzXSwgWzMsIDBdXTtcclxuICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkpLFxyXG4gICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCAtIHBsYXRmb3JtVGhpY2tuZXNzKSkpLFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgIGlmICh0ZW1wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMubWFwKHNlZyA9PiBbc2VnWzBdICsgNCwgc2VnWzFdICsgNF0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbMCwgNF0sIFsxLCA1XSwgWzIsIDZdLCBbMywgN10sXHJcbiAgICAgICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSA8IGFuZ2xlICYmIGFuZ2xlIDwgKE1hdGguUEkgLyAyIC0gYW5nbGUxKSkge1xyXG4gICAgICAgICAgICAgICAgc2VnbWVudC5jb21wb25lbnREaXJlY3Rpb25UeXBlID0gQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5SaWdodEZyb250O1xyXG4gICAgICAgICAgICAgICAgcGFyYW0ucGxhdGZvcm1MZW5ndGggPSBzZWdtZW50LmVuZC5kaXN0YW5jZVRvKHNlZ21lbnQuc3RhcnQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxlZnRDb25uZWN0UG9pbnRzID0gW3N0YXJ0LmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpLCBiYXNlTGluZUVuZF07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBiYXNlTGluZUVuZERpc3RhbmNlID0gc3RhcnQuZGlzdGFuY2VUbyhiYXNlTGluZUVuZCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsZWZ0UHJvamVjdERpc3RhbmNlID0gc3RhcnRXaWR0aCAvIDIgKiBNYXRoLmNvcyhhbmdsZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobGVmdFByb2plY3REaXN0YW5jZSA8IGJhc2VMaW5lRW5kRGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsMSA9IHN0YXJ0V2lkdGggLyAyIC8gTWF0aC5jb3MoYW5nbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsMSA+IGJhc2VMaW5lRW5kRGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYTEgPSBsMSAtIGJhc2VMaW5lRW5kRGlzdGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGMxID0gYTEgLyBNYXRoLnRhbihhbmdsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRDb25uZWN0UG9pbnRzID0gW3N0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoYmFzZUxpbmVFbmREaXN0YW5jZSkpLmFkZGVkKHByZXZEaXJOb3JtYWxpemVkLm11bHRpcGxpZWQoYzEpKSwgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChiYXNlTGluZUVuZERpc3RhbmNlKSldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdENvbm5lY3RQb2ludHMgPSBbc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChsMSkpXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc3RhcnQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSksXHJcbiAgICAgICAgICAgICAgICAgICAgLi4ubGVmdENvbm5lY3RQb2ludHMsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIgLyBNYXRoLmNvcyhhbmdsZSkpKSxcclxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSksXHJcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSksXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbW9sZFZlcnRleENvdW50ID0gbW9sZFNoYXBlLnZlcnRpY2VzLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIG1vbGRTaGFwZS50ZW1wTGluZXMgPSBnZW5lcmF0ZVRlbXBMaW5lc0xvb3AobW9sZFZlcnRleENvdW50KTtcclxuICAgICAgICAgICAgICAgIC8vIGlmIChtb2xkVmVydGV4Q291bnQgPT09IDQpIHtcclxuICAgICAgICAgICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtbMCwgMV0sIFsxLCAyXSwgWzIsIDNdLCBbMywgNF0sIFs0LCAwXV07XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gWy4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCkpKSxcclxuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgLSBwbGF0Zm9ybVRoaWNrbmVzcykpKSxcclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICBpZiAodGVtcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLm1hcChzZWcgPT4gW3NlZ1swXSArIG1vbGRWZXJ0ZXhDb3VudCwgc2VnWzFdICsgbW9sZFZlcnRleENvdW50XSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMubWFwKHNlZyA9PiBbc2VnWzBdLCBzZWdbMF0gKyBtb2xkVmVydGV4Q291bnRdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gWzAsIDVdLCBbMSwgNl0sIFsyLCA3XSwgWzMsIDhdLCBbNCwgOV0sXHJcbiAgICAgICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChhbmdsZSA+IChNYXRoLlBJICogMyAvIDIgKyBhbmdsZTEpICYmIGFuZ2xlIDwgKE1hdGguUEkgKiAyIC0gRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UpKSB7XHJcbiAgICAgICAgICAgICAgICBzZWdtZW50LmNvbXBvbmVudERpcmVjdGlvblR5cGUgPSBDb21wb25lbnREaXJlY3Rpb25UeXBlLkxlZnRGcm9udDtcclxuICAgICAgICAgICAgICAgIHBhcmFtLnBsYXRmb3JtTGVuZ3RoID0gc2VnbWVudC5lbmQuZGlzdGFuY2VUbyhzZWdtZW50LnN0YXJ0KTtcclxuICAgICAgICAgICAgICAgIGxldCByaWdodENvbm5lY3RQb2ludHMgPSBbYmFzZUxpbmVTdGFydCwgc3RhcnQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VMaW5lU3RhcnREaXN0YW5jZSA9IHN0YXJ0LmRpc3RhbmNlVG8oYmFzZUxpbmVTdGFydCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByaWdodFByb2plY3REaXN0YW5jZSA9IHN0YXJ0V2lkdGggLyAyICogTWF0aC5jb3MoYW5nbGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJpZ2h0UHJvamVjdERpc3RhbmNlIDwgYmFzZUxpbmVTdGFydERpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IHJpZ2h0Q29ubmVjdFBvaW50cyA9IFtiYXNlTGluZVN0YXJ0LCBiYXNlTGluZVN0YXJ0XTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiAoc3RhcnRXaWR0aCA8PSBwcmV2UGFyYW0uZW5kV2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsMiA9IHN0YXJ0V2lkdGggLyAyIC8gTWF0aC5jb3MoYW5nbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsMiA+IGJhc2VMaW5lU3RhcnREaXN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhMiA9IGwyIC0gYmFzZUxpbmVTdGFydERpc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjMiA9IGEyIC8gTWF0aC50YW4oTWF0aC5QSSAqIDIgLSBhbmdsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0Q29ubmVjdFBvaW50cyA9IFtzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC1iYXNlTGluZVN0YXJ0RGlzdGFuY2UpKSwgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtYmFzZUxpbmVTdGFydERpc3RhbmNlKSkuYWRkZWQocHJldkRpck5vcm1hbGl6ZWQubXVsdGlwbGllZChjMikpXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0Q29ubmVjdFBvaW50cyA9IFtzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC1sMikpXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMiAvIE1hdGguY29zKGFuZ2xlKSkpLFxyXG4gICAgICAgICAgICAgICAgICAgIC4uLnJpZ2h0Q29ubmVjdFBvaW50cyxcclxuICAgICAgICAgICAgICAgICAgICAvLyBzdGFydC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSksXHJcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpLFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1vbGRWZXJ0ZXhDb3VudCA9IG1vbGRTaGFwZS52ZXJ0aWNlcy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gZ2VuZXJhdGVUZW1wTGluZXNMb29wKG1vbGRWZXJ0ZXhDb3VudCk7XHJcbiAgICAgICAgICAgICAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gWy4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCkpKSxcclxuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgLSBwbGF0Zm9ybVRoaWNrbmVzcykpKSxcclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICBpZiAodGVtcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLm1hcChzZWcgPT4gW3NlZ1swXSArIG1vbGRWZXJ0ZXhDb3VudCwgc2VnWzFdICsgbW9sZFZlcnRleENvdW50XSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMubWFwKHNlZyA9PiBbc2VnWzBdLCBzZWdbMF0gKyBtb2xkVmVydGV4Q291bnRdKSxcclxuICAgICAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHBhcmFtLnBsYXRmb3JtTGVuZ3RoID0gc2VnbWVudC5lbmQuZGlzdGFuY2VUbyhzZWdtZW50LnN0YXJ0KTtcclxuICAgICAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXHJcbiAgICAgICAgICAgIHN0YXJ0LmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpLFxyXG4gICAgICAgICAgICBzdGFydC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSksXHJcbiAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSxcclxuICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSksXHJcbiAgICAgICAgXTtcclxuICAgICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgM10sIFszLCAwXV07XHJcbiAgICAgICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFsuLi5tb2xkU2hhcGUudmVydGljZXMsXHJcbiAgICAgICAgICAgIC4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCgtcGxhdGZvcm1UaGlja25lc3MpKSksXHJcbiAgICAgICAgXTtcclxuICAgICAgICBpZiAodGVtcCkge1xyXG4gICAgICAgICAgICBzdGFpclNoYXBlLnRlbXBMaW5lcyA9IFtcclxuICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMsXHJcbiAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLm1hcChzZWcgPT4gW3NlZ1swXSArIDQsIHNlZ1sxXSArIDRdKSxcclxuICAgICAgICAgICAgICAgIFswLCA0XSwgWzEsIDVdLCBbMiwgNl0sIFszLCA3XSxcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuY29uc3QgQ29sdW1uU3RlcFRvbGVyYW5jZSA9IDEgLyAxMDtcclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlSGFuZHJhaWxTaGFwZShzdGFpclBhcmFtLCBzZWdtZW50cykge1xyXG4gICAgY29uc3QgeyBoYW5kcmFpbDogeyBzdXBwb3J0LCBoZWlnaHQsIGNvbHVtbjogeyBzdGVwLCBwYXJhbTogY29sdW1uUGFyYW0gfSB9IH0gPSBzdGFpclBhcmFtO1xyXG4gICAgaWYgKHNlZ21lbnRzLmxlbmd0aCAmJiBzdXBwb3J0KSB7XHJcbiAgICAgICAgY29uc3QgaGFuZHJhaWxzID0gW107XHJcbiAgICAgICAgY29uc3QgdW5WaXNpdGVkID0gbmV3IFNldChzZWdtZW50cyk7XHJcbiAgICAgICAgY29uc3QgdmlzaXRlZCA9IG5ldyBNYXAoKTtcclxuICAgICAgICBmb3IgKGNvbnN0IHNlZ21lbnQgb2Ygc2VnbWVudHMpIHtcclxuICAgICAgICAgICAgaWYgKCFzZWdtZW50Lm1vbGRTaGFwZS50ZW1wTGluZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZpc2l0ZWQuc2V0KHNlZ21lbnQucGFyYW0uaW5kZXgsIHsgbGVmdDogZmFsc2UsIHJpZ2h0OiBmYWxzZSwgbGluZTNkSW5kZXhlczogbmV3IFNldCgpIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY3VycmVudCA9IFt7XHJcbiAgICAgICAgICAgICAgICBzZWdtZW50OiBzZWdtZW50c1swXSxcclxuICAgICAgICAgICAgICAgIGxpbmUzZEluZDogZ2V0U2VnbWVudFN0YXJ0QW5kQmFzZUxpbmUzZChzZWdtZW50c1swXSwgc2VnbWVudHMpLnN0YXJ0TGluZS5saW5lM2RJbmQsXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHN0YXJ0OiB0cnVlLFxyXG4gICAgICAgICAgICB9XTtcclxuICAgICAgICBsZXQgaGFuZHJhaWwgPSB7IHJhaWw6IFtdLCBjb2x1bW5zOiBbXSB9O1xyXG4gICAgICAgIGNvbnN0IHN0ZXBUb2xlcmFuY2UgPSBzdGVwICogQ29sdW1uU3RlcFRvbGVyYW5jZTtcclxuICAgICAgICB3aGlsZSAoY3VycmVudC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgbGV0IG5leHQgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCB7IHNlZ21lbnQ6IGN1cnJlbnRTZWdtZW50LCBsaW5lM2RJbmQsIHN0YXJ0UG9pbnQsIGxlZnQgfSBvZiBjdXJyZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IHBhcmFtOiB7IGluZGV4LCB0eXBlLCBzdGFydFdpZHRoLCBlbmRXaWR0aCwgaG9yaXpvbnRhbFN0ZXAsIHZlcnRpY2FsU3RlcCwgdXB3YXJkIH0sIHN0YXJ0LCBlbmQsIHN0YXJ0SGVpZ2h0LCBlbmRIZWlnaHQsIG1vbGRTaGFwZTogeyB2ZXJ0aWNlczogbW9sZFZlcnRpY2VzLCB0ZW1wTGluZXM6IG1vbGRUZW1wTGluZXMsIHN0ZXBDb3VudCB9LCBuZXh0Q29tcG9uZW50cywgYmFzZUNvbXBvbmVudCwgY2lyY2xlVGFuZ2VudCwgc3RhcnRMb2NrZWQsIGNvbXBvbmVudERpcmVjdGlvblR5cGUsIGNpcmN1bGFyU2lkZSwgfSA9IGN1cnJlbnRTZWdtZW50O1xyXG4gICAgICAgICAgICAgICAgdW5WaXNpdGVkLmRlbGV0ZShjdXJyZW50U2VnbWVudCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXN0YXJ0TG9ja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKCghc3RhcnRMb2NrZWQgJiYgdHlwZSAhPT0gQ29tcG9uZW50VHlwZS5DaXJjdWxhclN0YWlyKSB8fCAoIWNpcmNsZVRhbmdlbnQgJiYgdHlwZSA9PT0gQ29tcG9uZW50VHlwZS5DaXJjdWxhclN0YWlyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RlcEhlaWdodCA9IHVwd2FyZCA/IHZlcnRpY2FsU3RlcCA6IC12ZXJ0aWNhbFN0ZXA7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvZmZzZXRMZW5ndGggPSBNYXRoLm1heChjb2x1bW5QYXJhbS5oZWlnaHQgfHwgMCwgY29sdW1uUGFyYW0ud2lkdGggfHwgMCwgY29sdW1uUGFyYW0ucmFkaXVzIHx8IDApO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYmFzZVNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleChzZWdtZW50cywgYmFzZUNvbXBvbmVudCA9PT0gbnVsbCB8fCBiYXNlQ29tcG9uZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBiYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHsgc3RhcnRMaW5lOiB7IGxpbmUzZEluZDogc3RhcnRMaW5lM2RJbmQgfSwgYmFzZUxpbmU6IHsgZGlyOiBiYXNlTGluZTNkRGlyLCBlbmQ6IGJhc2VMaW5lM2RFbmQgfSwgfSA9IGdldFNlZ21lbnRTdGFydEFuZEJhc2VMaW5lM2QoY3VycmVudFNlZ21lbnQsIHNlZ21lbnRzLCBiYXNlU2VnbWVudCk7XHJcbiAgICAgICAgICAgICAgICAvLyBsZXQgYmFzZUxpbmUzZERpcjogS1ZlY3RvcjNkIHwgdW5kZWZpbmVkID0gYmFzZUNvbXBvbmVudD8ubGluZTNkID8gYmFzZUNvbXBvbmVudC5saW5lM2QuZW5kLnN1YnRyYWN0ZWQoYmFzZUNvbXBvbmVudC5saW5lM2Quc3RhcnQpLm5vcm1hbGl6ZWQoKSA6IERpcmVjdGlvblg7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydFRvRW5kRGlyID0gZW5kLnN1YnRyYWN0ZWQoc3RhcnQpLm5vcm1hbGl6ZWQoKTtcclxuICAgICAgICAgICAgICAgIGxldCBmcm9udERpciA9IGNpcmNsZVRhbmdlbnQgPyBjaXJjbGVUYW5nZW50IDogc3RhcnRUb0VuZERpcjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFuZ2xlID0gZnJvbnREaXIuYW5nbGUoYmFzZUxpbmUzZERpcik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkZWx0YUFuZ2xlID0gTWF0aC5hYnMoYW5nbGUgLSBNYXRoLlBJIC8gMik7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVsdGFBbmdsZSA8PSBEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZyb250RGlyID0gYmFzZUxpbmUzZERpci5jcm9zcyhEaXJlY3Rpb25aKS5ub3JtYWxpemVkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgbGVmdERpciA9IERpcmVjdGlvblouY3Jvc3MoZnJvbnREaXIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNwID0gc3RhcnQuYWRkZWQobGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyICogKGxlZnQgPyAxIDogLTEpKSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZXAgPSBlbmQuYWRkZWQobGVmdERpci5tdWx0aXBsaWVkKGVuZFdpZHRoIC8gMiAqIChsZWZ0ID8gMSA6IC0xKSkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxhc3RMZW5ndGggPSBzcC5kaXN0YW5jZVRvKGVwKTtcclxuICAgICAgICAgICAgICAgIGxldCBzcFRvRXBEaXIgPSBlcC5zdWJ0cmFjdGVkKHNwKS5ub3JtYWxpemVkKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV4dFN0YXJ0UG9pbnQgPSBsZWZ0ID8gc3AgOiBlcDtcclxuICAgICAgICAgICAgICAgIGxldCBwdXNoRW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8vIGxldCBzaWJsaW5nU2VnbWVudEluZHMgPSBiYXNlU2VnbWVudD8ubmV4dENvbXBvbmVudHNbYmFzZUNvbXBvbmVudD8ubGluZTNkSW5kZXggfHwgMF07XHJcbiAgICAgICAgICAgICAgICAvLyBsZXQgbmV4dFNpYmxpbmdTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgoc2VnbWVudHMsIFsuLi5zaWJsaW5nU2VnbWVudEluZHMgfHwgW11dPy5maW5kKGluZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgY29uc3QgdmlzaXRlZFNpYmxpbmcgPSB2aXNpdGVkLmdldChpbmQpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHJldHVybiAhdmlzaXRlZFNpYmxpbmc7XHJcbiAgICAgICAgICAgICAgICAvLyB9KSk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zdCB2aXNpdGVkQmFzZVNlZ21lbnQgPSBiYXNlU2VnbWVudCA/IHZpc2l0ZWQuZ2V0KGJhc2VTZWdtZW50LnBhcmFtLmluZGV4KSA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmUzZERpciA9IG1vbGRWZXJ0aWNlc1ttb2xkVGVtcExpbmVzW2xpbmUzZEluZF1bMV1dLnN1YnRyYWN0ZWQobW9sZFZlcnRpY2VzW21vbGRUZW1wTGluZXNbbGluZTNkSW5kXVswXV0pLm5vcm1hbGl6ZWQoKTtcclxuICAgICAgICAgICAgICAgIGxldCBvZmZzZXREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKGxpbmUzZERpcik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2aXNpdGVkUmVjb3JkID0gdmlzaXRlZC5nZXQoaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsaW5lM2QgPSBtb2xkVGVtcExpbmVzW2xpbmUzZEluZF07XHJcbiAgICAgICAgICAgICAgICAgICAgc3AgPSBzdGFydFBvaW50IHx8IG1vbGRWZXJ0aWNlc1tsaW5lM2RbMF1dO1xyXG4gICAgICAgICAgICAgICAgICAgIGVwID0gbW9sZFZlcnRpY2VzW2xpbmUzZFsxXV07XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdExlbmd0aCA9IHNwLmRpc3RhbmNlVG8oZXApO1xyXG4gICAgICAgICAgICAgICAgICAgIHNwVG9FcERpciA9IGVwLnN1YnRyYWN0ZWQoc3ApLm5vcm1hbGl6ZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0TGluZTNkSW5kID0gKGxpbmUzZEluZCArIDEpICUgbW9sZFRlbXBMaW5lcy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmlzaXRlZExpbmUzZEluZGV4ZXMgPSB2aXNpdGVkUmVjb3JkID09PSBudWxsIHx8IHZpc2l0ZWRSZWNvcmQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZpc2l0ZWRSZWNvcmQubGluZTNkSW5kZXhlcztcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpc0VudHJhbmNlID0gKHZpc2l0ZWRMaW5lM2RJbmRleGVzID09PSBudWxsIHx8IHZpc2l0ZWRMaW5lM2RJbmRleGVzID09PSB2b2lkIDAgPyB2b2lkIDAgOiB2aXNpdGVkTGluZTNkSW5kZXhlcy5oYXMobGluZTNkSW5kKSkgJiYgKHZpc2l0ZWRMaW5lM2RJbmRleGVzID09PSBudWxsIHx8IHZpc2l0ZWRMaW5lM2RJbmRleGVzID09PSB2b2lkIDAgPyB2b2lkIDAgOiB2aXNpdGVkTGluZTNkSW5kZXhlcy5oYXMobmV4dExpbmUzZEluZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IGN1cnJlbnRTdGFydExpbmUzZEluZGV4ID0gZ2V0U2VnbWVudFN0YXJ0QW5kQmFzZUxpbmUzZChjdXJyZW50U2VnbWVudCwgc2VnbWVudHMpLnN0YXJ0TGluZS5saW5lM2RJbmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzRW50cmFuY2VTZWdtZW50ID0gbGluZTNkSW5kID09PSBzdGFydExpbmUzZEluZDtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBuZXh0U2VnbWVudEluZGV4ZXMgPSBuZXh0Q29tcG9uZW50c1tsaW5lM2RJbmRdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZWFyZXN0U2VnbWVudDtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG5leHRTZWdtZW50SW5kZXggb2YgbmV4dENvbXBvbmVudHNbbGluZTNkSW5kXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0U2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHNlZ21lbnRzLCBuZXh0U2VnbWVudEluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRTZWdtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHN0YXJ0IH0gPSBuZXh0U2VnbWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRzID0gc3RhcnQuZGlzdGFuY2VUbyhzcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZSA9IHN0YXJ0LmRpc3RhbmNlVG8oZXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmlzaXROZXh0UmVjb3JkID0gdmlzaXRlZC5nZXQobmV4dFNlZ21lbnQucGFyYW0uaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dENvbXBvbmVudFN0YXJ0TGluZTNkSW5kID0gZ2V0U2VnbWVudFN0YXJ0QW5kQmFzZUxpbmUzZChuZXh0U2VnbWVudCwgc2VnbWVudHMpLnN0YXJ0TGluZS5saW5lM2RJbmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNFcXVhbChkcyArIGRlLCBsYXN0TGVuZ3RoKSAmJiAhKHZpc2l0TmV4dFJlY29yZCA9PT0gbnVsbCB8fCB2aXNpdE5leHRSZWNvcmQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZpc2l0TmV4dFJlY29yZC5yaWdodCkgJiYgISh2aXNpdE5leHRSZWNvcmQgPT09IG51bGwgfHwgdmlzaXROZXh0UmVjb3JkID09PSB2b2lkIDAgPyB2b2lkIDAgOiB2aXNpdE5leHRSZWNvcmQubGluZTNkSW5kZXhlcy5oYXMobmV4dENvbXBvbmVudFN0YXJ0TGluZTNkSW5kKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5lYXJlc3RTZWdtZW50IHx8IG5lYXJlc3RTZWdtZW50LmRpc3RhbmNlID4gZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVhcmVzdFNlZ21lbnQgPSB7IHNlZ21lbnQ6IG5leHRTZWdtZW50LCBkaXN0YW5jZTogZHMgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxhc3REaXN0YW5jZSA9IGxhc3RMZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5lYXJlc3RTZWdtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHsgbW9sZFNoYXBlOiB7IHZlcnRpY2VzOiBuZWFyZXN0VmVydGljZXMsIHRlbXBMaW5lczogbmVhcmVzdFRlbXBMaW5lcyB9IH0gPSBuZWFyZXN0U2VnbWVudC5zZWdtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGVuZE9uQmFzZUxpbmUgfSA9IGdldFNlZ21lbnRTdGFydEFuZEJhc2VMaW5lM2QobmVhcmVzdFNlZ21lbnQuc2VnbWVudCwgc2VnbWVudHMpLnN0YXJ0TGluZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgbmVhcmVzdExpbmUzZCA9IG5lYXJlc3RTZWdtZW50LnNlZ21lbnQucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSA/IG5lYXJlc3RUZW1wTGluZXNbbmVhcmVzdExpbmUzZEluZF0gOiBuZWFyZXN0VGVtcExpbmVzWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBuZWFyZXN0TGluZTNkRGlyID0gbmVhcmVzdFZlcnRpY2VzW25lYXJlc3RMaW5lM2RbMV1dLnN1YnRyYWN0ZWQobmVhcmVzdFZlcnRpY2VzW25lYXJlc3RMaW5lM2RbMF1dKS5ub3JtYWxpemVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVwID0gZW5kT25CYXNlTGluZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXAgPSBuZWFyZXN0VmVydGljZXNbbmVhcmVzdExpbmUzZFsxXV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwVG9FcERpciA9IGVwLnN1YnRyYWN0ZWQoc3ApLm5vcm1hbGl6ZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwVG9FcERpci5kb3QobGluZTNkRGlyKSA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3REaXN0YW5jZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoRW5kID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U3RhcnRQb2ludCA9IHNwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdERpc3RhbmNlID0gc3AuZGlzdGFuY2VUbyhlcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U3RhcnRQb2ludCA9IGlzUGxhdGZvcm0obmVhcmVzdFNlZ21lbnQuc2VnbWVudCkgPyBlcCA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBsYXN0TGVuZ3RoID0gc3AuZGlzdGFuY2VUbyhlcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzRW50cmFuY2UgJiYgaGFzRW50cmFuY2VTZWdtZW50ICYmIGJhc2VTZWdtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHsgbGluZTNkOiBiYXNlTGluZTNkLCBkaXI6IGJhc2VMaW5lM2REaXIgfSA9IGdldFNlZ21lbnRTdGFydEFuZEJhc2VMaW5lM2QoY3VycmVudFNlZ21lbnQsIHNlZ21lbnRzLCBiYXNlU2VnbWVudCkuYmFzZUxpbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHsgbW9sZFNoYXBlOiB7IHZlcnRpY2VzOiBiYXNlVmVydGljZXMsIHRlbXBMaW5lczogYmFzZVRlbXBMaW5lcyB9IH0gPSBiYXNlU2VnbWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgYmFzZUxpbmUzZCA9IGJhc2VTZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gPyBiYXNlVGVtcExpbmVzW2Jhc2VDb21wb25lbnQ/LmxpbmUzZEluZGV4IHx8IDBdIDogYmFzZVRlbXBMaW5lc1tiYXNlVGVtcExpbmVzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBiYXNlTGluZTNkRGlyID0gYmFzZVZlcnRpY2VzW2Jhc2VMaW5lM2RbMV1dLnN1YnRyYWN0ZWQoYmFzZVZlcnRpY2VzW2Jhc2VMaW5lM2RbMF1dKS5ub3JtYWxpemVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIChiYXNlU2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtICYmIG5leHRTaWJsaW5nU2VnbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgLy8gZG9uJ3QgY2FyZSBiZWNhdXNlIG5leHQgaXMgcGxhdGZvcm0gKG5leHQgd2lsbCBkZWFsIHRoZSBjYXNlKSBvciBzdGFpciAob25seSBoYXZlIG9uZSBuZXh0Q29tcG9uZW50IHdoaWNoIGlzIGN1cnJlbnRTZWdtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgY29uc3QgeyBzdGFydDogbmV4dFNpYmxpbmdTZWdtZW50U3RhcnRMaW5lU3RhcnQgfSA9IGdldFNlZ21lbnRTdGFydEFuZEJhc2VMaW5lM2QobmV4dFNpYmxpbmdTZWdtZW50LCBzZWdtZW50cywgYmFzZVNlZ21lbnQpLnN0YXJ0TGluZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGVwID0gbmV4dFNpYmxpbmdTZWdtZW50U3RhcnRMaW5lU3RhcnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAvLyBpZiAobmV4dFNpYmxpbmdTZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIC8vICAgICBjb25zdCBuZXh0U2libGluZ1NlZ1N0YXJ0TGluZTNkID0gbmV4dFNpYmxpbmdTZWdtZW50Lm1vbGRTaGFwZS50ZW1wTGluZXNbZ2V0U2VnbWVudFN0YXJ0QW5kQmFzZUxpbmUzZChuZXh0U2libGluZ1NlZ21lbnQsIHNlZ21lbnRzKS5zdGFydExpbmUubGluZTNkSW5kXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIC8vICAgICBlcCA9IG5leHRTaWJsaW5nU2VnbWVudC5tb2xkU2hhcGUudmVydGljZXNbbmV4dFNpYmxpbmdTZWdTdGFydExpbmUzZFsxXV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgLy8gICAgIGVwID0gbmV4dFNpYmxpbmdTZWdtZW50LnN0YXJ0LmFkZGVkKGJhc2VMaW5lM2REaXIubXVsdGlwbGllZCgtbmV4dFNpYmxpbmdTZWdtZW50LnBhcmFtLnN0YXJ0V2lkdGggLyAyKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVwID0gYmFzZUxpbmUzZEVuZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcFRvRXBEaXIgPSBlcC5zdWJ0cmFjdGVkKHNwKS5ub3JtYWxpemVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcFRvRXBEaXIuZG90KGJhc2VMaW5lM2REaXIpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdERpc3RhbmNlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hFbmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTdGFydFBvaW50ID0gc3A7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0RGlzdGFuY2UgPSBzcC5kaXN0YW5jZVRvKGVwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTdGFydFBvaW50ID0gaXNQbGF0Zm9ybShiYXNlU2VnbWVudCkgPyBlcCA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpc0VudHJhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3REaXN0YW5jZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hFbmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hFbmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc3BUb0VwRGlyID0gZXAuc3VidHJhY3RlZChzcCkubm9ybWFsaXplZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHB1c2ggcmFpbFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0Qm90dG9tUHQgPSBzcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKS5hZGRlZChvZmZzZXREaXIubXVsdGlwbGllZChvZmZzZXRMZW5ndGgpKS5hZGRlZChzcFRvRXBEaXIubXVsdGlwbGllZChzdGFydFBvaW50ID8gMCA6IG9mZnNldExlbmd0aCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsLnJhaWwucHVzaChmaXJzdEJvdHRvbVB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcHVzaCBjb2x1bW5zXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBEaXN0YW5jZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHRlbXBEaXN0YW5jZSA8PSBsYXN0RGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNFbmQgPSB0ZW1wRGlzdGFuY2UgPT09IGxhc3REaXN0YW5jZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYm90dG9tUG9pbnQgPSB0ZW1wRGlzdGFuY2UgPiAwID8gc3AuYWRkZWQoc3BUb0VwRGlyLm11bHRpcGxpZWQodGVtcERpc3RhbmNlKSkuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkuYWRkZWQob2Zmc2V0RGlyLm11bHRpcGxpZWQob2Zmc2V0TGVuZ3RoKSkgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RCb3R0b21QdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWwuY29sdW1ucy5wdXNoKFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbVBvaW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tUG9pbnQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5yYWlsLnB1c2goYm90dG9tUG9pbnQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWx0YURpc3RhbmNlID0gKGxhc3REaXN0YW5jZSAtIHRlbXBEaXN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBEaXN0YW5jZSArPSAoZGVsdGFEaXN0YW5jZSA8PSBzdGVwICYmIGRlbHRhRGlzdGFuY2UgPiBzdGVwVG9sZXJhbmNlKSA/IChwdXNoRW5kID8gZGVsdGFEaXN0YW5jZSA6IEluZmluaXR5KSA6IHN0ZXA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIChwdXNoRW5kICYmIChuZWFyZXN0U2VnbWVudCB8fCAoaXNFbnRyYW5jZSAmJiBsYXN0RGlzdGFuY2UgPiAwKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgLy8gcHVzaCByYWlsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGhhbmRyYWlsLnJhaWwucHVzaChlcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBoZWlnaHQpKS5hZGRlZChvZmZzZXREaXIubXVsdGlwbGllZChvZmZzZXRMZW5ndGgpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGlmICh0ZW1wRGlzdGFuY2UgLSBzdGVwIDwgbGFzdERpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBjb25zdCBsYXN0Qm90dG9tUG9pbnQgPSBzcC5hZGRlZChzcFRvRXBEaXIubXVsdGlwbGllZChsYXN0RGlzdGFuY2UpKS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKS5hZGRlZChvZmZzZXREaXIubXVsdGlwbGllZChvZmZzZXRMZW5ndGgpKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGhhbmRyYWlsLmNvbHVtbnMucHVzaChbXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgbGFzdEJvdHRvbVBvaW50LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGxhc3RCb3R0b21Qb2ludC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSksXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBdKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAobmVhcmVzdFNlZ21lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQ6IG5lYXJlc3RTZWdtZW50LnNlZ21lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lM2RJbmQ6IGdldFNlZ21lbnRTdGFydEFuZEJhc2VMaW5lM2QobmVhcmVzdFNlZ21lbnQuc2VnbWVudCwgc2VnbWVudHMpLnN0YXJ0TGluZS5saW5lM2RJbmQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0UG9pbnQ6IG5leHRTdGFydFBvaW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0VudHJhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmFzZVNlZ21lbnQgJiYgaGFzRW50cmFuY2VTZWdtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2libGluZ1NlZ21lbnRJbmRzID0gYmFzZVNlZ21lbnQubmV4dENvbXBvbmVudHNbYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKG5leHRTaWJsaW5nU2VnbWVudCAmJiBiYXNlU2VnbWVudC5wYXJhbS50eXBlICE9PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIC8vIG5ldmVyIGhhcHBlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBuZXh0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgc2VnbWVudDogbmV4dFNpYmxpbmdTZWdtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgbGluZTNkSW5kOiBnZXRTZWdtZW50U3RhcnRBbmRCYXNlTGluZTNkKG5leHRTaWJsaW5nU2VnbWVudCwgc2VnbWVudHMpLnN0YXJ0TGluZS5saW5lM2RJbmQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBsZWZ0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIHN0YXJ0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIHN0YXJ0UG9pbnQ6IG5leHRTdGFydFBvaW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmICgodmlzaXRlZEJhc2VTZWdtZW50Py5yaWdodCAmJiAhdmlzaXRlZEJhc2VTZWdtZW50LmxlZnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudDogYmFzZVNlZ21lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUzZEluZDogYmFzZVNlZ21lbnQucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSA/IChiYXNlQ29tcG9uZW50ID09PSBudWxsIHx8IGJhc2VDb21wb25lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJhc2VDb21wb25lbnQubGluZTNkSW5kZXgpIHx8IDAgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0UG9pbnQ6IG5leHRTdGFydFBvaW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBlbmQgb2YgdGhpcyBwYXRjaCwgdGhlIHBhdGNoIGFyZSBzdGFydCB3aXRoIHBsYXRmb3JtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWxzLnB1c2goaGFuZHJhaWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsID0geyByYWlsOiBbXSwgY29sdW1uczogW10gfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVuZCBvZiB0aGlzIGxpbmUzZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50OiBjdXJyZW50U2VnbWVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lM2RJbmQ6IG5leHRMaW5lM2RJbmQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlzaXRlZExpbmUzZEluZGV4ZXMgPT09IG51bGwgfHwgdmlzaXRlZExpbmUzZEluZGV4ZXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZpc2l0ZWRMaW5lM2RJbmRleGVzLmFkZChsaW5lM2RJbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzUmlnaHRTdGFpciA9IGNvbXBvbmVudERpcmVjdGlvblR5cGUgPT09IENvbXBvbmVudERpcmVjdGlvblR5cGUuUmlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNMZWZ0U3RhaXIgPSBjb21wb25lbnREaXJlY3Rpb25UeXBlID09PSBDb21wb25lbnREaXJlY3Rpb25UeXBlLkxlZnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhaXJSYWlsID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhaXJDb2x1bW5zID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29ybmVyQmFzZURpciA9ICghbGVmdCAmJiBpc1JpZ2h0U3RhaXIpIHx8IChsZWZ0ICYmIGlzTGVmdFN0YWlyKSA/IGxlZnREaXIgOiBiYXNlTGluZTNkRGlyO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb3JuZXJTdGFydEhlaWdodCA9IGxlZnQgPyBlbmRIZWlnaHQgOiBzdGFydEhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY29ybmVyU2lkZVdpZHRoID0gbGVmdCA/IGVuZFdpZHRoIDogc3RhcnRXaWR0aDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2lkZUNvcm5lclN0YXJ0ID0gbGVmdCA/IGVuZCA6IHN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb3JuZXJFbmQgPSBzaWRlQ29ybmVyU3RhcnQuYWRkZWQoY29ybmVyQmFzZURpci5tdWx0aXBsaWVkKChjb3JuZXJTaWRlV2lkdGggLyAyICsgb2Zmc2V0TGVuZ3RoKSAqIChsZWZ0ID8gMSA6IC0xKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb3JuZXJEaXN0YW5jZSA9IChzdGFydFBvaW50IHx8IHNwKS5kaXN0YW5jZVRvKGNvcm5lckVuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYWxvbmcgY29ybmVyQmFzZURpclxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb3JuZXJTcFRvRXBEaXIgPSBjb3JuZXJFbmQuc3VidHJhY3RlZChzdGFydFBvaW50IHx8IHNwKS5ub3JtYWxpemVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvcm5lck9mZnNldERpciA9IERpcmVjdGlvblouY3Jvc3MoY29ybmVyU3BUb0VwRGlyKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY29ybmVyQWRkaXRpb25hbEhlaWdodCA9ICFsZWZ0ICYmIGlzUmlnaHRTdGFpciAmJiB1cHdhcmQgPyBzdGVwSGVpZ2h0IDogMDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkQ29ybmVyUmFpbCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRDb3JuZXJDb2x1bW5zID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXJ0UG9pbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBIZWFkRGlzdGFuY2UgPSBzdGVwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkQ29ybmVyUmFpbC5wdXNoKHN0YXJ0UG9pbnQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGNvcm5lclN0YXJ0SGVpZ2h0ICsgY29ybmVyQWRkaXRpb25hbEhlaWdodCArIGhlaWdodCkpLmFkZGVkKGNvcm5lck9mZnNldERpci5tdWx0aXBsaWVkKG9mZnNldExlbmd0aCkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHRlbXBIZWFkRGlzdGFuY2UgPCBjb3JuZXJEaXN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYm90dG9tUG9pbnQgPSBzdGFydFBvaW50LmFkZGVkKGNvcm5lclNwVG9FcERpci5tdWx0aXBsaWVkKHRlbXBIZWFkRGlzdGFuY2UpKS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoY29ybmVyU3RhcnRIZWlnaHQgKyBjb3JuZXJBZGRpdGlvbmFsSGVpZ2h0KSkuYWRkZWQoY29ybmVyT2Zmc2V0RGlyLm11bHRpcGxpZWQob2Zmc2V0TGVuZ3RoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkQ29ybmVyQ29sdW1ucy5wdXNoKFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b21Qb2ludCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b21Qb2ludC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBIZWFkRGlzdGFuY2UgKz0gc3RlcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWxlZnQgJiYgaXNMZWZ0U3RhaXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RCb3R0b21Qb2ludCA9IGNvcm5lckVuZC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoY29ybmVyU3RhcnRIZWlnaHQgKyBjb3JuZXJBZGRpdGlvbmFsSGVpZ2h0KSkuYWRkZWQoY29ybmVyT2Zmc2V0RGlyLm11bHRpcGxpZWQob2Zmc2V0TGVuZ3RoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwdXNoIHJhaWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRDb3JuZXJSYWlsLnB1c2gobGFzdEJvdHRvbVBvaW50LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGNvcm5lckRpc3RhbmNlIC0gdGVtcEhlYWREaXN0YW5jZSArIHN0ZXApID4gc3RlcFRvbGVyYW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IGxhc3RCb3R0b21Qb2ludCA9IGVwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChsZWZ0ID8gZW5kSGVpZ2h0IDogc3RhcnRIZWlnaHQpKS5hZGRlZChjb3JuZXJPZmZzZXREaXIubXVsdGlwbGllZChvZmZzZXRMZW5ndGgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBoYW5kcmFpbC5yYWlsLnB1c2gobGFzdEJvdHRvbVBvaW50LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZENvcm5lckNvbHVtbnMucHVzaChbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RCb3R0b21Qb2ludCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdEJvdHRvbVBvaW50LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBuZXh0U3RhcnRQb2ludCA9IGxlZnQgPyBzcCA6IGVwO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5leHQgc2VnbWVudCBzdGFydFdpZHRoICE9PSBjdXJyZW50U2VnbWVudCBlbmRXaWR0aFxyXG4gICAgICAgICAgICAgICAgICAgIHB1c2hFbmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCByZWFzb25hYmxlU3RlcCA9IE1hdGguY2VpbChzdGVwIC8gaG9yaXpvbnRhbFN0ZXApICogaG9yaXpvbnRhbFN0ZXA7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVhc29uYWJsZVN0ZXBDb3VudCA9IE1hdGguY2VpbChzdGVwIC8gaG9yaXpvbnRhbFN0ZXApO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wU3RlcENvdW50ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhcmNDaG9yZEFuZ2xlID0gY2lyY2xlVGFuZ2VudCA/IHN0YXJ0VG9FbmREaXIuYW5nbGUoY2lyY2xlVGFuZ2VudCkgOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBDb21wb25lbnRUeXBlLlN0cmFpZ2h0U3RhaXIgfHwgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpciAmJiAoYXJjQ2hvcmRBbmdsZSA8PSBEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSB8fCAhY2lyY2xlVGFuZ2VudCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RMZW5ndGggPSBzcC5kaXN0YW5jZVRvKGVwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHVzaCByYWlsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIChkZWx0YUFuZ2xlID4gRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGNvbnN0IGNvcm5lckJvdHRvbVB0ID0gc3AuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkuYWRkZWQoYmFzZUxpbmUzZERpci5tdWx0aXBsaWVkKChzdGFydFdpZHRoIC8gMiAtIG9mZnNldExlbmd0aCkgKiAobGVmdCA/IDEgOiAtMSkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHN0YWlyUmFpbC5wdXNoKGNvcm5lckJvdHRvbVB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBzdGFpckNvbHVtbnMucHVzaChbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgY29ybmVyQm90dG9tUHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgY29ybmVyQm90dG9tUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJSYWlsLnB1c2goc3AuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0ICsgaGVpZ2h0ICsgKHVwd2FyZCA/IDEgOiAwKSAqIHN0ZXBIZWlnaHQpKS5hZGRlZChsZWZ0RGlyLm11bHRpcGxpZWQobGVmdCA/IC1vZmZzZXRMZW5ndGggOiBvZmZzZXRMZW5ndGgpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdXB3YXJkICYmIHN0ZXBDb3VudCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyUmFpbC5wdXNoKHNwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIGhlaWdodCkpLmFkZGVkKGZyb250RGlyLm11bHRpcGxpZWQoaG9yaXpvbnRhbFN0ZXApKS5hZGRlZChsZWZ0RGlyLm11bHRpcGxpZWQobGVmdCA/IC1vZmZzZXRMZW5ndGggOiBvZmZzZXRMZW5ndGgpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHVzaCBjb2x1bW5zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxldCB0ZW1wRGlzdGFuY2UgPSBob3Jpem9udGFsU3RlcCAvIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0ZW1wU3RlcENvdW50IDwgc3RlcENvdW50IC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VySG9yU3RlcERpc3RhbmNlID0gKHRlbXBTdGVwQ291bnQgKyAwLjUpICogaG9yaXpvbnRhbFN0ZXA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJWZXJTdGVwRGlzdGFuY2UgPSAodGVtcFN0ZXBDb3VudCArICh1cHdhcmQgPyAxIDogMCkpICogc3RlcEhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvdHRvbVBvaW50ID0gc3AuYWRkZWQoZnJvbnREaXIubXVsdGlwbGllZChjdXJIb3JTdGVwRGlzdGFuY2UpKS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBjdXJWZXJTdGVwRGlzdGFuY2UpKS5hZGRlZChsZWZ0RGlyLm11bHRpcGxpZWQobGVmdCA/IC1vZmZzZXRMZW5ndGggOiBvZmZzZXRMZW5ndGgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyQ29sdW1ucy5wdXNoKFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b21Qb2ludCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b21Qb2ludC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHRlbXBTdGVwQ291bnQgPSBNYXRoLmZsb29yKHRlbXBEaXN0YW5jZSAvIGhvcml6b250YWxTdGVwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRlbXBEaXN0YW5jZSArPSByZWFzb25hYmxlU3RlcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBTdGVwQ291bnQgKz0gcmVhc29uYWJsZVN0ZXBDb3VudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RlcENvdW50ID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJSYWlsLnB1c2goc3AuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0ICsgaGVpZ2h0ICsgKHVwd2FyZCA/IHN0ZXBDb3VudCA6IChzdGVwQ291bnQgLSAoc3RlcENvdW50ID4gMiA/IDIgOiAxKSkpICogc3RlcEhlaWdodCkpLmFkZGVkKGZyb250RGlyLm11bHRpcGxpZWQoKHN0ZXBDb3VudCAtIDEpICogaG9yaXpvbnRhbFN0ZXApKS5hZGRlZChsZWZ0RGlyLm11bHRpcGxpZWQob2Zmc2V0TGVuZ3RoKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKHVwd2FyZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFpclJhaWwucHVzaChlcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoZW5kSGVpZ2h0ICsgaGVpZ2h0ICsgKHVwd2FyZCA/IDAgOiAtKHN0ZXBDb3VudCA+IDIgPyAyIDogMSkgKiBzdGVwSGVpZ2h0KSkpLmFkZGVkKGxlZnREaXIubXVsdGlwbGllZChvZmZzZXRMZW5ndGgpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZW1wU3RlcENvdW50IC0gcmVhc29uYWJsZVN0ZXBDb3VudCA8PSBzdGVwQ291bnQgLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcmV2VG90YWxTdGVwTGVuZ3RoID0gKHN0ZXBDb3VudCAtIDEpICogaG9yaXpvbnRhbFN0ZXA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0U3RlcExlbmd0aCA9IGxhc3RMZW5ndGggLSBwcmV2VG90YWxTdGVwTGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdEJvdHRvbVBvaW50ID0gc3AuYWRkZWQoZnJvbnREaXIubXVsdGlwbGllZChwcmV2VG90YWxTdGVwTGVuZ3RoICsgbGFzdFN0ZXBMZW5ndGggLyAyKSkuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGVuZEhlaWdodCArICh1cHdhcmQgPyAwIDogLXN0ZXBIZWlnaHQpKSkuYWRkZWQobGVmdERpci5tdWx0aXBsaWVkKGxlZnQgPyBvZmZzZXRMZW5ndGggOiAtb2Zmc2V0TGVuZ3RoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpckNvbHVtbnMucHVzaChbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdEJvdHRvbVBvaW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RCb3R0b21Qb2ludC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXh0IHNlZ21lbnQgc3RhcnRXaWR0aCAhPT0gY3VycmVudFNlZ21lbnQgZW5kV2lkdGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3AgPSBsZWZ0ID8gc3RhcnQuYWRkZWQoYmFzZUxpbmUzZERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyIC0gb2Zmc2V0TGVuZ3RoKSkgOiBzdGFydC5hZGRlZChiYXNlTGluZTNkRGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyICsgb2Zmc2V0TGVuZ3RoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNpcmNsZVRhbmdlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFuZ2VudExlZnREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKGNpcmNsZVRhbmdlbnQpLm5vcm1hbGl6ZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRFbmREaXN0YW5jZSA9IHN0YXJ0LmRpc3RhbmNlVG8oZW5kKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF4V2lkdGggPSBNYXRoLm1heChzdGFydFdpZHRoLCBlbmRXaWR0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzTGVmdEFyYyA9IGNpcmN1bGFyU2lkZSA9PT0gQ2lyY3VsYXJTaWRlLkxlZnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVuZENvbXBsZW1lbnRhcnlBbmdsZSA9IGlzTGVmdEFyYyA/IE1hdGguYWJzKGFyY0Nob3JkQW5nbGUgLSBNYXRoLlBJIC8gMiAtIE1hdGguUEkpIDogTWF0aC5hYnMoYXJjQ2hvcmRBbmdsZSAtIE1hdGguUEkgLyAyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFsZkNob3JkID0gc3RhcnRFbmREaXN0YW5jZSAvIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJhZGl1cyA9IGhhbGZDaG9yZCAvIE1hdGguY29zKGVuZENvbXBsZW1lbnRhcnlBbmdsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlubmVyUmFkaXVzID0gcmFkaXVzIC0gbWF4V2lkdGggLyAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAocmFkaXVzIDwgbWF4V2lkdGggLyAyICogMS4yIHx8IGlubmVyUmFkaXVzIDwgaG9yaXpvbnRhbFN0ZXAgLyAyIC8gMC44KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaG9yaXpvbnRhbFN0ZXBBbmdsZSA9IE1hdGguYXNpbihob3Jpem9udGFsU3RlcCAvIDIgLyBpbm5lclJhZGl1cykgKiAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjaXJjbGVOb3JtYWwgPSBpc0xlZnRBcmMgPyBEaXJlY3Rpb25aIDogRGlyZWN0aW9uWi5yZXZlcnNlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjaXJjbGVDZW50ZXIgPSBzdGFydC5hZGRlZCh0YW5nZW50TGVmdERpci5tdWx0aXBsaWVkKGlzTGVmdEFyYyA/IHJhZGl1cyA6IC1yYWRpdXMpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgY2lyY2xlID0gR2VvbUxpYi5jcmVhdGVDaXJjbGUzZEJ5Q2VudGVyTm9ybWFsUmFkaXVzKGNpcmNsZUNlbnRlciwgY2lyY2xlTm9ybWFsLCByYWRpdXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhcmMgPSBHZW9tTGliLmNyZWF0ZUFyYzNkQnlDZW50ZXJOb3JtYWxSYWRpdXMoY2lyY2xlQ2VudGVyLCBjaXJjbGVOb3JtYWwsIHJhZGl1cywgc3RhcnQsIGVuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFyY0FuZ2xlID0gYXJjLmFyY0FuZ2xlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBzdGVwQ291bnQgPSBNYXRoLmNlaWwoYXJjQW5nbGUgLyBob3Jpem9udGFsU3RlcEFuZ2xlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdEhvcml6b250YWxBbmdsZSA9IGFyY0FuZ2xlIC0gaG9yaXpvbnRhbFN0ZXBBbmdsZSAqIChzdGVwQ291bnQgLSAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgdmFsaWRTdGVwQ291bnQgPSAobGFzdEhvcml6b250YWxBbmdsZSA9PT0gMCB8fCBsYXN0SG9yaXpvbnRhbEFuZ2xlID4gQW5nbGVUb2xlcmFuY2UpID8gc3RlcENvdW50IDogc3RlcENvdW50IC0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGhvcml6b250YWxTdGVwQW5nbGUgPj0gYXJjQW5nbGUgfHwgaG9yaXpvbnRhbFN0ZXBBbmdsZSA+PSBNYXRoLlBJIC8gMiB8fCB2YWxpZFN0ZXBDb3VudCA+PSBTdGVwQ291bnRMaW1pdCB8fCB2YWxpZFN0ZXBDb3VudCA8IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFydFJhZGl1c0RpciA9IGlzTGVmdEFyYyA/IHRhbmdlbnRMZWZ0RGlyLnJldmVyc2VkKCkgOiB0YW5nZW50TGVmdERpcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGRlbHRhQW5nbGUgPiBEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgY29uc3QgY29ybmVyQm90dG9tUHQgPSBzcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKS5hZGRlZChiYXNlTGluZTNkRGlyLm11bHRpcGxpZWQoKHN0YXJ0V2lkdGggLyAyIC0gb2Zmc2V0TGVuZ3RoKSAqIChsZWZ0ID8gMSA6IC0xKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgc3RhaXJSYWlsLnB1c2goY29ybmVyQm90dG9tUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHN0YWlyQ29sdW1ucy5wdXNoKFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBjb3JuZXJCb3R0b21QdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBjb3JuZXJCb3R0b21QdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwdXNoIGNvbHVtbnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHRlbXBTdGVwQ291bnQgPCBzdGVwQ291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1clJvdGF0ZUFuZ2xlID0gaG9yaXpvbnRhbFN0ZXBBbmdsZSAqIHRlbXBTdGVwQ291bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0Um90YXRlQW5nbGUgPSBob3Jpem9udGFsU3RlcEFuZ2xlICogdGVtcFN0ZXBDb3VudCArICh0ZW1wU3RlcENvdW50ID09PSBzdGVwQ291bnQgLSAxID8gbGFzdEhvcml6b250YWxBbmdsZSA6IGhvcml6b250YWxTdGVwQW5nbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyUm90YXRlTWF0cml4ID0gR2VvbUxpYi5jcmVhdGVSb3RhdGVNYXRyaXg0KGhvcml6b250YWxTdGVwQW5nbGUgKiB0ZW1wU3RlcENvdW50LCBjaXJjbGVOb3JtYWwsIGR1bW15UG9pbnQzZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0Um90YXRlTWF0cml4ID0gR2VvbUxpYi5jcmVhdGVSb3RhdGVNYXRyaXg0KG5leHRSb3RhdGVBbmdsZSwgY2lyY2xlTm9ybWFsLCBkdW1teVBvaW50M2QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyUmFkaXVzRGlyID0gc3RhcnRSYWRpdXNEaXIuYXBwbGllZE1hdHJpeDQoY3VyUm90YXRlTWF0cml4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRSYWRpdXNEaXIgPSBzdGFydFJhZGl1c0Rpci5hcHBsaWVkTWF0cml4NChuZXh0Um90YXRlTWF0cml4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1ckhhbGZXaWR0aCA9IChzdGFydFdpZHRoICsgKGVuZFdpZHRoIC0gc3RhcnRXaWR0aCkgKiAoY3VyUm90YXRlQW5nbGUpIC8gYXJjQW5nbGUpIC8gMiAqIChpc0xlZnRBcmMgPyAtMSA6IDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dEhhbGZXaWR0aCA9IChzdGFydFdpZHRoICsgKGVuZFdpZHRoIC0gc3RhcnRXaWR0aCkgKiAobmV4dFJvdGF0ZUFuZ2xlKSAvIGFyY0FuZ2xlKSAvIDIgKiAoaXNMZWZ0QXJjID8gLTEgOiAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1ckxlZnRNb2xkUHQgPSBjaXJjbGVDZW50ZXIuYWRkZWQoY3VyUmFkaXVzRGlyLm11bHRpcGxpZWQocmFkaXVzICsgY3VySGFsZldpZHRoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJSaWdodE1vbGRQdCA9IGNpcmNsZUNlbnRlci5hZGRlZChjdXJSYWRpdXNEaXIubXVsdGlwbGllZChyYWRpdXMgLSBjdXJIYWxmV2lkdGgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRMZWZ0TW9sZFB0ID0gY2lyY2xlQ2VudGVyLmFkZGVkKG5leHRSYWRpdXNEaXIubXVsdGlwbGllZChyYWRpdXMgKyBuZXh0SGFsZldpZHRoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0UmlnaHRNb2xkUHQgPSBjaXJjbGVDZW50ZXIuYWRkZWQobmV4dFJhZGl1c0Rpci5tdWx0aXBsaWVkKHJhZGl1cyAtIG5leHRIYWxmV2lkdGgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1clN0ZXBMZWZ0RnJvbnREaXIgPSBuZXh0TGVmdE1vbGRQdC5zdWJ0cmFjdGVkKGN1ckxlZnRNb2xkUHQpLm11bHRpcGxpZWQoMC41KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1clN0ZXBSaWdodEZyb250RGlyID0gbmV4dFJpZ2h0TW9sZFB0LnN1YnRyYWN0ZWQoY3VyUmlnaHRNb2xkUHQpLm11bHRpcGxpZWQoMC41KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1clN0ZXBMZWZ0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhjdXJTdGVwTGVmdEZyb250RGlyKS5ub3JtYWxpemVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJTdGVwUmlnaHREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKGN1clN0ZXBSaWdodEZyb250RGlyKS5ub3JtYWxpemVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJMZWZ0Qm90dG9tUHQgPSBjdXJMZWZ0TW9sZFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArICh0ZW1wU3RlcENvdW50ICsgKHVwd2FyZCA/IDEgOiAwKSkgKiBzdGVwSGVpZ2h0KSkuYWRkZWQoY3VyU3RlcExlZnREaXIubXVsdGlwbGllZCgtb2Zmc2V0TGVuZ3RoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJSaWdodEJvdHRvbVB0ID0gY3VyUmlnaHRNb2xkUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0ICsgKHRlbXBTdGVwQ291bnQgKyAodXB3YXJkID8gMSA6IDApKSAqIHN0ZXBIZWlnaHQpKS5hZGRlZChjdXJTdGVwUmlnaHREaXIubXVsdGlwbGllZChvZmZzZXRMZW5ndGgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1ckxlZnRCb3R0b21NaWRQdCA9IGN1ckxlZnRCb3R0b21QdC5hZGRlZChjdXJTdGVwTGVmdEZyb250RGlyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1clJpZ2h0Qm90dG9tTWlkUHQgPSBjdXJSaWdodEJvdHRvbVB0LmFkZGVkKGN1clN0ZXBSaWdodEZyb250RGlyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IGJvdHRvbVBvaW50ID0gc3AuYWRkZWQoZnJvbnREaXIubXVsdGlwbGllZCh0ZW1wRGlzdGFuY2UpKS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZW1wU3RlcENvdW50ID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwdXNoIHJhaWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzdGFpclJhaWwucHVzaChzcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBoZWlnaHQgKyAodXB3YXJkID8gMSA6IDApICogc3RlcEhlaWdodCkpLmFkZGVkKGxlZnREaXIubXVsdGlwbGllZChvZmZzZXRMZW5ndGgpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxlZnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJSYWlsLnB1c2goY3VyTGVmdEJvdHRvbVB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQgKyAodGVtcFN0ZXBDb3VudCA+IDAgJiYgIXVwd2FyZCA/IC1zdGVwSGVpZ2h0IDogMCkpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmICghdXB3YXJkICYmIHRlbXBTdGVwQ291bnQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGNvbnN0IG5leHRMZWZ0Qm90dG9tUHQgPSBuZXh0TGVmdE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyAodGVtcFN0ZXBDb3VudCArICh1cHdhcmQgPyAxIDogMCkpICogc3RlcEhlaWdodCkpLmFkZGVkKGN1clN0ZXBMZWZ0RGlyLm11bHRpcGxpZWQoLW9mZnNldExlbmd0aCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgc3RhaXJSYWlsLnB1c2gobmV4dExlZnRCb3R0b21QdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpclJhaWwucHVzaChjdXJSaWdodEJvdHRvbVB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQgKyAodGVtcFN0ZXBDb3VudCA+IDAgJiYgIXVwd2FyZCA/IC1zdGVwSGVpZ2h0IDogMCkpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmICghdXB3YXJkICYmIHRlbXBTdGVwQ291bnQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGNvbnN0IG5leHRSaWdodEJvdHRvbVB0ID0gbmV4dFJpZ2h0TW9sZFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArICh0ZW1wU3RlcENvdW50ICsgKHVwd2FyZCA/IDEgOiAwKSkgKiBzdGVwSGVpZ2h0KSkuYWRkZWQoY3VyU3RlcFJpZ2h0RGlyLm11bHRpcGxpZWQob2Zmc2V0TGVuZ3RoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBzdGFpclJhaWwucHVzaChuZXh0UmlnaHRCb3R0b21QdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZW1wU3RlcENvdW50ID09PSBzdGVwQ291bnQgLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzdGFpclJhaWwucHVzaChjdXJMZWZ0Qm90dG9tTWlkUHQuYWRkZWQoY3VyU3RlcExlZnRGcm9udERpci5yZXZlcnNlZCgpKS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJSYWlsLnB1c2goY3VyTGVmdEJvdHRvbU1pZFB0LmFkZGVkKGN1clN0ZXBMZWZ0RnJvbnREaXIpLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQgKyAodXB3YXJkID8gMCA6IC1zdGVwSGVpZ2h0KSkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN0YWlyUmFpbC5wdXNoKGN1clJpZ2h0Qm90dG9tTWlkUHQuYWRkZWQoY3VyU3RlcFJpZ2h0RnJvbnREaXIucmV2ZXJzZWQoKSkuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyUmFpbC5wdXNoKGN1clJpZ2h0Qm90dG9tTWlkUHQuYWRkZWQoY3VyU3RlcFJpZ2h0RnJvbnREaXIpLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQgKyAodXB3YXJkID8gMCA6IC1zdGVwSGVpZ2h0KSkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5leHRTdGFydFBvaW50ID0gY3VyUmlnaHRNb2xkUHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRlbXBTdGVwQ291bnQgJSByZWFzb25hYmxlU3RlcENvdW50ICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpckNvbHVtbnMucHVzaChbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdCA/IGN1ckxlZnRCb3R0b21NaWRQdCA6IGN1clJpZ2h0Qm90dG9tTWlkUHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGxlZnQgPyBjdXJMZWZ0Qm90dG9tTWlkUHQgOiBjdXJSaWdodEJvdHRvbU1pZFB0KS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXh0IHNlZ21lbnQgc3RhcnRXaWR0aCAhPT0gY3VycmVudFNlZ21lbnQgZW5kV2lkdGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3AgPSBsZWZ0ID8gc3RhcnQuYWRkZWQoYmFzZUxpbmUzZERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyIC0gb2Zmc2V0TGVuZ3RoKSkgOiBjdXJSaWdodE1vbGRQdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdERpciA9IGN1clN0ZXBMZWZ0RGlyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZW1wU3RlcENvdW50ICUgcmVhc29uYWJsZVN0ZXBDb3VudCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyQ29sdW1ucy5wdXNoKFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdCA/IGN1ckxlZnRCb3R0b21NaWRQdCA6IGN1clJpZ2h0Qm90dG9tTWlkUHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChsZWZ0ID8gY3VyTGVmdEJvdHRvbU1pZFB0IDogY3VyUmlnaHRCb3R0b21NaWRQdCkuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcFN0ZXBDb3VudCArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsLnJhaWwucHVzaCguLi5oZWFkQ29ybmVyUmFpbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWwuY29sdW1ucy5wdXNoKC4uLmhlYWRDb3JuZXJDb2x1bW5zKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobGVmdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5yYWlsLnB1c2goLi4uc3RhaXJSYWlsLnJldmVyc2UoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsLmNvbHVtbnMucHVzaCguLi5zdGFpckNvbHVtbnMucmV2ZXJzZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsLnJhaWwucHVzaCguLi5zdGFpclJhaWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5jb2x1bW5zLnB1c2goLi4uc3RhaXJDb2x1bW5zKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YWlyTmV4dFNlZ21lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBuZXh0U2VnbWVudEluZGV4IG9mIG5leHRDb21wb25lbnRzW2xpbmUzZEluZF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dFNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleChzZWdtZW50cywgbmV4dFNlZ21lbnRJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0U2VnbWVudCAmJiAhdmlzaXRlZC5nZXQobmV4dFNlZ21lbnQucGFyYW0uaW5kZXgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpck5leHRTZWdtZW50ID0gbmV4dFNlZ21lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxlZnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhc2VTZWdtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAobmV4dFNpYmxpbmdTZWdtZW50ICYmIGJhc2VTZWdtZW50LnBhcmFtLnR5cGUgIT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAvLyBuZXZlciBoYXBwZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBuZXh0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBzZWdtZW50OiBuZXh0U2libGluZ1NlZ21lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGxpbmUzZEluZDogZ2V0U2VnbWVudFN0YXJ0QW5kQmFzZUxpbmUzZChuZXh0U2libGluZ1NlZ21lbnQsIHNlZ21lbnRzKS5zdGFydExpbmUubGluZTNkSW5kLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBsZWZ0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgc3RhcnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBzdGFydFBvaW50OiBuZXh0U3RhcnRQb2ludCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCB7IG1vbGRTaGFwZTogeyB2ZXJ0aWNlczogYmFzZVZlcnRpY2VzLCB0ZW1wTGluZXM6IGJhc2VUZW1wTGluZXMgfSB9ID0gYmFzZVNlZ21lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBiYXNlTGluZTNkID0gYmFzZVNlZ21lbnQucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSA/IGJhc2VUZW1wTGluZXNbYmFzZUNvbXBvbmVudD8ubGluZTNkSW5kZXggfHwgMF0gOiBiYXNlVGVtcExpbmVzW2Jhc2VUZW1wTGluZXMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBiYXNlTGluZTNkRGlyID0gYmFzZVZlcnRpY2VzW2Jhc2VMaW5lM2RbMV1dLnN1YnRyYWN0ZWQoYmFzZVZlcnRpY2VzW2Jhc2VMaW5lM2RbMF1dKS5ub3JtYWxpemVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcCA9IGJhc2VMaW5lM2RFbmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcFRvRXBEaXIgPSBlcC5zdWJ0cmFjdGVkKHNwKS5ub3JtYWxpemVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BUb0VwRGlyLmRvdChiYXNlTGluZTNkRGlyKSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U3RhcnRQb2ludCA9IHNwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaEVuZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFN0YXJ0UG9pbnQgPSBpc1BsYXRmb3JtKGJhc2VTZWdtZW50KSA/IGVwIDogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIChiYXNlU2VnbWVudCAmJiAodmlzaXRlZEJhc2VTZWdtZW50Py5yaWdodCAmJiAhdmlzaXRlZEJhc2VTZWdtZW50LmxlZnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQ6IGJhc2VTZWdtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUzZEluZDogYmFzZVNlZ21lbnQucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSA/IChiYXNlQ29tcG9uZW50ID09PSBudWxsIHx8IGJhc2VDb21wb25lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJhc2VDb21wb25lbnQubGluZTNkSW5kZXgpIHx8IDAgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0UG9pbnQ6IG5leHRTdGFydFBvaW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBlbmQgdGhlIHBhdGNoIHdoaWNoIGlzIHN0YXJ0IHdpdGggY3VycmVudFNlZ21lbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlscy5wdXNoKGhhbmRyYWlsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsID0geyByYWlsOiBbXSwgY29sdW1uczogW10gfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmlzaXRlZFJlY29yZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlzaXRlZFJlY29yZC5sZWZ0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YWlyTmV4dFNlZ21lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHsgbW9sZFNoYXBlOiB7IHZlcnRpY2VzOiBzdGFpck5leHRWZXJ0aWNlcywgdGVtcExpbmVzOiBzdGFpck5leHRUZW1wTGluZXMgfSB9ID0gc3RhaXJOZXh0U2VnbWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgbGluZTNkSW5kOiBzdGFpck5leHRMaW5lM2RJbmQsIGVuZE9uQmFzZUxpbmUgfSA9IGdldFNlZ21lbnRTdGFydEFuZEJhc2VMaW5lM2Qoc3RhaXJOZXh0U2VnbWVudCwgc2VnbWVudHMsIGN1cnJlbnRTZWdtZW50KS5zdGFydExpbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBzdGFpck5leHRMaW5lM2QgPSBzdGFpck5leHRTZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gPyBzdGFpck5leHRUZW1wTGluZXNbc3RhaXJOZXh0TGluZTNkSW5kXSA6IHN0YWlyTmV4dFRlbXBMaW5lc1swXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHN0YWlyTmV4dExpbmUzZERpciA9IHN0YWlyTmV4dFZlcnRpY2VzW3N0YWlyTmV4dExpbmUzZFsxXV0uc3VidHJhY3RlZChzdGFpck5leHRWZXJ0aWNlc1tzdGFpck5leHRMaW5lM2RbMF1dKS5ub3JtYWxpemVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcCA9IGVuZE9uQmFzZUxpbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcFRvRXBEaXIgPSBlcC5zdWJ0cmFjdGVkKHNwKS5ub3JtYWxpemVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BUb0VwRGlyLmRvdChsaW5lM2REaXIpIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTdGFydFBvaW50ID0gc3A7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoRW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U3RhcnRQb2ludCA9IGlzUGxhdGZvcm0oc3RhaXJOZXh0U2VnbWVudCkgPyBlcCA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQ6IHN0YWlyTmV4dFNlZ21lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZTNkSW5kOiBzdGFpck5leHRMaW5lM2RJbmQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0UG9pbnQ6IG5leHRTdGFydFBvaW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQ6IGN1cnJlbnRTZWdtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUzZEluZDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzdGFydFBvaW50OiBuZXh0U3RhcnRQb2ludCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZW5kIHRoZSBwYXRjaCB3aGljaCBpcyBlbmQgd2l0aCBzdGFpciBjb21wb25lbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlscy5wdXNoKGhhbmRyYWlsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsID0geyByYWlsOiBbXSwgY29sdW1uczogW10gfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmlzaXRlZFJlY29yZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlzaXRlZFJlY29yZC5yaWdodCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHB1c2hFbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGN1cnJlbnRDb3JuZXJTaWRlV2lkdGggPSBsZWZ0ID8gc3RhcnRXaWR0aCA6IGVuZFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBsZXQgY3VycmVudFNpZGVDb3JuZXJTdGFydCA9IGxlZnQgPyBzdGFydCA6IGVuZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXAgaXMgcmV1c2VkIHdoZW4gcHVzaEVuZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcFRhaWxEaXN0YW5jZSA9IGxlZnQgPyAwIDogc3RlcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxlZnQgJiYgaXNMZWZ0U3RhaXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwID0gc3RhcnQuYWRkZWQobGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyIC0gb2Zmc2V0TGVuZ3RoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29ybmVyU3RhcnRIZWlnaHQgPSBsZWZ0ID8gc3RhcnRIZWlnaHQgOiBlbmRIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcm5lckVuZCA9IGVwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3JuZXJEaXN0YW5jZSA9IHNwLmRpc3RhbmNlVG8oY29ybmVyRW5kKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWxvbmcgY29ybmVyQmFzZURpclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3JuZXJTcFRvRXBEaXIgPSBjb3JuZXJFbmQuc3VidHJhY3RlZChzcCkubm9ybWFsaXplZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3JuZXJPZmZzZXREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKGNvcm5lclNwVG9FcERpcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcm5lckFkZGl0aW9uYWxIZWlnaHQgPSBsZWZ0ICYmIGlzTGVmdFN0YWlyICYmIHVwd2FyZCA/IHN0ZXBIZWlnaHQgOiAoIWxlZnQgJiYgIXVwd2FyZCA/IC1zdGVwSGVpZ2h0IDogMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvcm5lclNwVG9FcERpciA9IGNvcm5lckVuZC5zdWJ0cmFjdGVkKHNwKS5ub3JtYWxpemVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvcm5lck9mZnNldERpciA9IERpcmVjdGlvblouY3Jvc3MoY29ybmVyU3BUb0VwRGlyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHRlbXBUYWlsRGlzdGFuY2UgPCBjb3JuZXJEaXN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYm90dG9tUG9pbnQgPSBzcC5hZGRlZChjb3JuZXJTcFRvRXBEaXIubXVsdGlwbGllZCh0ZW1wVGFpbERpc3RhbmNlKSkuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGNvcm5lclN0YXJ0SGVpZ2h0ICsgY29ybmVyQWRkaXRpb25hbEhlaWdodCkpLmFkZGVkKGNvcm5lck9mZnNldERpci5tdWx0aXBsaWVkKG9mZnNldExlbmd0aCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWwuY29sdW1ucy5wdXNoKFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b21Qb2ludCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b21Qb2ludC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBUYWlsRGlzdGFuY2UgKz0gc3RlcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0Qm90dG9tUG9pbnQgPSBlcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoY29ybmVyU3RhcnRIZWlnaHQgKyBjb3JuZXJBZGRpdGlvbmFsSGVpZ2h0KSkuYWRkZWQoY29ybmVyT2Zmc2V0RGlyLm11bHRpcGxpZWQob2Zmc2V0TGVuZ3RoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IGxhc3RCb3R0b21Qb2ludCA9IGVwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChsZWZ0ID8gZW5kSGVpZ2h0IDogc3RhcnRIZWlnaHQpKS5hZGRlZChjb3JuZXJPZmZzZXREaXIubXVsdGlwbGllZChvZmZzZXRMZW5ndGgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxlZnQgJiYgaXNSaWdodFN0YWlyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5yYWlsLnB1c2goc3AuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGNvcm5lclN0YXJ0SGVpZ2h0ICsgaGVpZ2h0ICsgY29ybmVyQWRkaXRpb25hbEhlaWdodCkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwdXNoIHJhaWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWwucmFpbC5wdXNoKGxhc3RCb3R0b21Qb2ludC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGNvcm5lckRpc3RhbmNlIC0gdGVtcFRhaWxEaXN0YW5jZSArIHN0ZXApID4gc3RlcFRvbGVyYW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWwuY29sdW1ucy5wdXNoKFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0Qm90dG9tUG9pbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdEJvdHRvbVBvaW50LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSBuZXh0O1xyXG4gICAgICAgICAgICBpZiAoIWN1cnJlbnQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodW5WaXNpdGVkLnNpemUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVTZWdtZW50ID0gWy4uLnVuVmlzaXRlZC52YWx1ZXMoKV1bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50OiB0aGVTZWdtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZTNkSW5kOiBnZXRTZWdtZW50U3RhcnRBbmRCYXNlTGluZTNkKHRoZVNlZ21lbnQsIHNlZ21lbnRzKS5zdGFydExpbmUubGluZTNkSW5kLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGhhbmRyYWlscztcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBnZW5lcmF0ZVRlbXBMaW5lc0xvb3AodmVydGV4Q291bnQpIHtcclxuICAgIHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiB2ZXJ0ZXhDb3VudCB9KS5tYXAoKF8sIGkpID0+IFtpLCBpID09PSB2ZXJ0ZXhDb3VudCAtIDEgPyAwIDogaSArIDFdKTtcclxufVxyXG5mdW5jdGlvbiBnZXRTZWdtZW50U3RhcnRBbmRCYXNlTGluZTNkKHNlZ21lbnQsIHNlZ21lbnRzLCBiYXNlU2VnbWVudCkge1xyXG4gICAgY29uc3QgeyBzdGFydCwgcGFyYW06IHsgdHlwZSwgc3RhcnRXaWR0aCB9LCBjb21wb25lbnREaXJlY3Rpb25UeXBlLCBtb2xkU2hhcGU6IHsgdGVtcExpbmVzLCB2ZXJ0aWNlcyB9LCBiYXNlQ29tcG9uZW50IH0gPSBzZWdtZW50O1xyXG4gICAgbGV0IHN0YXJ0TGluZTNkSW5kID0gMDtcclxuICAgIC8vIDUgZWRnZXNcclxuICAgIGlmICh0eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtICYmIGNvbXBvbmVudERpcmVjdGlvblR5cGUgPT09IENvbXBvbmVudERpcmVjdGlvblR5cGUuUmlnaHRGcm9udCAmJiB0ZW1wTGluZXMubGVuZ3RoID4gNCkge1xyXG4gICAgICAgIHN0YXJ0TGluZTNkSW5kID0gMTtcclxuICAgIH1cclxuICAgIGNvbnN0IHN0YXJ0TGluZTNkID0gdGVtcExpbmVzW3N0YXJ0TGluZTNkSW5kXTtcclxuICAgIGNvbnN0IHN0YXJ0TGluZTNkU3RhcnQgPSB2ZXJ0aWNlc1tzdGFydExpbmUzZFswXV07XHJcbiAgICBjb25zdCBzdGFydExpbmUzZEVuZCA9IHZlcnRpY2VzW3N0YXJ0TGluZTNkWzFdXTtcclxuICAgIGNvbnN0IHN0YXJ0TGluZTNkRGlyID0gc3RhcnRMaW5lM2RFbmQuc3VidHJhY3RlZChzdGFydExpbmUzZFN0YXJ0KS5ub3JtYWxpemVkKCk7XHJcbiAgICBsZXQgYmFzZUxpbmUzZEluZCA9IChiYXNlQ29tcG9uZW50ID09PSBudWxsIHx8IGJhc2VDb21wb25lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJhc2VDb21wb25lbnQuY29tcG9uZW50SW5kZXgpIHx8IDA7XHJcbiAgICBsZXQgYmFzZUxpbmUzZCA9IFsuLi5zdGFydExpbmUzZF0ucmV2ZXJzZSgpO1xyXG4gICAgbGV0IGJhc2VMaW5lM2RTdGFydCA9IHZlcnRpY2VzW3N0YXJ0TGluZTNkWzFdXTtcclxuICAgIGxldCBiYXNlTGluZTNkRW5kID0gdmVydGljZXNbc3RhcnRMaW5lM2RbMF1dO1xyXG4gICAgbGV0IGJhc2VMaW5lM2REaXIgPSBzdGFydExpbmUzZERpci5yZXZlcnNlZCgpO1xyXG4gICAgO1xyXG4gICAgaWYgKCFiYXNlU2VnbWVudCAmJiBiYXNlQ29tcG9uZW50KSB7XHJcbiAgICAgICAgYmFzZVNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleChzZWdtZW50cywgYmFzZUNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XHJcbiAgICB9XHJcbiAgICBpZiAoYmFzZVNlZ21lbnQpIHtcclxuICAgICAgICBjb25zdCB7IG1vbGRTaGFwZTogeyB2ZXJ0aWNlczogYmFzZVZlcnRpY2VzLCB0ZW1wTGluZXM6IGJhc2VUZW1wTGluZXMgfSB9ID0gYmFzZVNlZ21lbnQ7XHJcbiAgICAgICAgYmFzZUxpbmUzZCA9IGJhc2VTZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gPyBiYXNlVGVtcExpbmVzWyhiYXNlQ29tcG9uZW50ID09PSBudWxsIHx8IGJhc2VDb21wb25lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJhc2VDb21wb25lbnQubGluZTNkSW5kZXgpIHx8IDBdIDogWy4uLmJhc2VUZW1wTGluZXNbYmFzZVRlbXBMaW5lcy5sZW5ndGggLSAxXV0ucmV2ZXJzZSgpO1xyXG4gICAgICAgIGJhc2VMaW5lM2RTdGFydCA9IGJhc2VWZXJ0aWNlc1tiYXNlTGluZTNkWzBdXTtcclxuICAgICAgICBiYXNlTGluZTNkRW5kID0gYmFzZVZlcnRpY2VzW2Jhc2VMaW5lM2RbMV1dO1xyXG4gICAgICAgIGJhc2VMaW5lM2REaXIgPSBiYXNlTGluZTNkRW5kLnN1YnRyYWN0ZWQoYmFzZUxpbmUzZFN0YXJ0KS5ub3JtYWxpemVkKCk7XHJcbiAgICB9XHJcbiAgICBsZXQgc3RhcnRPbkJhc2VMaW5lID0gc3RhcnRMaW5lM2RTdGFydDtcclxuICAgIGxldCBlbmRPbkJhc2VMaW5lID0gc3RhcnRMaW5lM2RFbmQ7XHJcbiAgICBpZiAodHlwZSAhPT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xyXG4gICAgICAgIHN0YXJ0T25CYXNlTGluZSA9IHN0YXJ0LmFkZGVkKGJhc2VMaW5lM2REaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpO1xyXG4gICAgICAgIGVuZE9uQmFzZUxpbmUgPSBzdGFydC5hZGRlZChiYXNlTGluZTNkRGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHN0YXJ0TGluZTogeyBsaW5lM2RJbmQ6IHN0YXJ0TGluZTNkSW5kLCBsaW5lM2Q6IHN0YXJ0TGluZTNkLCBkaXI6IHN0YXJ0TGluZTNkRGlyLCBzdGFydDogc3RhcnRMaW5lM2RTdGFydCwgZW5kOiBzdGFydExpbmUzZEVuZCwgc3RhcnRPbkJhc2VMaW5lLCBlbmRPbkJhc2VMaW5lIH0sXHJcbiAgICAgICAgYmFzZUxpbmU6IHsgbGluZTNkSW5kOiBiYXNlTGluZTNkSW5kLCBsaW5lM2Q6IGJhc2VMaW5lM2QsIGRpcjogYmFzZUxpbmUzZERpciwgc3RhcnQ6IGJhc2VMaW5lM2RTdGFydCwgZW5kOiBiYXNlTGluZTNkRW5kIH0sXHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBpc1BsYXRmb3JtKHNlZ21lbnQpIHtcclxuICAgIHJldHVybiBzZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm07XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2lyY3VsYXJTdGFpcihzZWdtZW50KSB7XHJcbiAgICByZXR1cm4gc2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLkNpcmN1bGFyU3RhaXI7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyYWlnaHRTdGFpcihzZWdtZW50KSB7XHJcbiAgICByZXR1cm4gc2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlN0cmFpZ2h0U3RhaXI7XHJcbn1cclxuIiwiZXhwb3J0IGNvbnN0IFN0YWlyTW9kZWxLZXkgPSAnRHJhd1N0YWlyc01vZGVsJztcclxuZXhwb3J0IGNvbnN0IFN0YWlyTW9kZWxWYWx1ZSA9ICcxJztcclxuZXhwb3J0IGNvbnN0IEhhbmRyYWlsTW9kZWxLZXkgPSAnSGFuZHJhaWwnO1xyXG4vLyBleHBvcnQgY29uc3QgU3RhaXJLZXkgPSAnRFNTdGFpcic7XHJcbi8vIGV4cG9ydCBjb25zdCBQbGF0Zm9ybUtleSA9ICdEU1BsYXRmb3JtJztcclxuZXhwb3J0IGNvbnN0IFBhcmFtS2V5ID0gJ0RTUGFyYW0nO1xyXG4vLyBzdGFydEhlaWdodCBhbmQgZW5kSGVpZ2h0IGNhY2hlZCBpbiBzdGFydCBhbmQgZW5kXHJcbmV4cG9ydCBjb25zdCBDb21wb25lbnRJbmRleEtleSA9ICdJbmQnO1xyXG5leHBvcnQgY29uc3QgU3RhcnRFbmRLZXkgPSAnU1RvRSc7XHJcbmV4cG9ydCBjb25zdCBCYXNlTGluZVNlZzNkS2V5ID0gJ0Jhc2VMaW5lJztcclxuZXhwb3J0IGNvbnN0IEJhc2VDb21wb25lbnRLZXkgPSAnQmFzZUNvbXBvbmVudCc7XHJcbmV4cG9ydCBjb25zdCBDaXJjbGVUYW5nZW50S2V5ID0gJ0NpcmNsZVRhbmdlbnQnO1xyXG5leHBvcnQgY29uc3QgRGVsaW1pdGVyID0gJyYnO1xyXG5leHBvcnQgY29uc3QgQ29vcmREZWxpbWl0ZXIgPSAnLCc7XHJcbmV4cG9ydCBjb25zdCBCYXNlTGluZTNkRGVsaW1pdGVyID0gJ18nO1xyXG5leHBvcnQgdmFyIENvbXBvbmVudFBhcmFtVHlwZTtcclxuKGZ1bmN0aW9uIChDb21wb25lbnRQYXJhbVR5cGUpIHtcclxuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhvcml6b250YWxTdGVwXCJdID0gXCJob3Jpem9udGFsU3RlcFwiO1xyXG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiVmVydGljYWxTdGVwXCJdID0gXCJ2ZXJ0aWNhbFN0ZXBcIjtcclxuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIlN0YXJ0V2lkdGhcIl0gPSBcInN0YXJ0V2lkdGhcIjtcclxuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkVuZFdpZHRoXCJdID0gXCJlbmRXaWR0aFwiO1xyXG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiU3RlcFByb3BvcnRpb25hbFwiXSA9IFwic3RlcFByb3BvcnRpb25hbFwiO1xyXG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiV2lkdGhQcm9wb3J0aW9uYWxcIl0gPSBcIndpZHRoUHJvcG9ydGlvbmFsXCI7XHJcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJQbGF0Zm9ybUxlbmd0aFwiXSA9IFwicGxhdGZvcm1MZW5ndGhcIjtcclxuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIlBsYXRmb3JtTGVuZ3RoTG9ja2VkXCJdID0gXCJwbGF0Zm9ybUxlbmd0aExvY2tlZFwiO1xyXG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiVHlwZVwiXSA9IFwidHlwZVwiO1xyXG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiVXB3YXJkXCJdID0gXCJ1cHdhcmRcIjtcclxuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIlBsYXRmb3JtVGhpY2tuZXNzXCJdID0gXCJwbGF0Zm9ybVRoaWNrbmVzc1wiO1xyXG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSGFuZHJhaWxcIl0gPSBcImhhbmRyYWlsXCI7XHJcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIYW5kcmFpbEhlaWdodFwiXSA9IFwiaGFuZHJhaWxIZWlnaHRcIjtcclxuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsUmFpbFR5cGVcIl0gPSBcImhhbmRyYWlsUmFpbFR5cGVcIjtcclxuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsUmFpbFJhZGl1c1wiXSA9IFwiaGFuZHJhaWxSYWlsUmFkaXVzXCI7XHJcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIYW5kcmFpbFJhaWxXaWR0aFwiXSA9IFwiaGFuZHJhaWxSYWlsV2lkdGhcIjtcclxuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsUmFpbEhlaWdodFwiXSA9IFwiaGFuZHJhaWxSYWlsSGVpZ2h0XCI7XHJcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIYW5kcmFpbENvbHVtblR5cGVcIl0gPSBcImhhbmRyYWlsQ29sdW1uVHlwZVwiO1xyXG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSGFuZHJhaWxDb2x1bW5TdGVwXCJdID0gXCJoYW5kcmFpbENvbHVtblN0ZXBcIjtcclxuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsQ29sdW1uUmFkaXVzXCJdID0gXCJoYW5kcmFpbENvbHVtblJhZGl1c1wiO1xyXG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSGFuZHJhaWxDb2x1bW5XaWR0aFwiXSA9IFwiaGFuZHJhaWxDb2x1bW5XaWR0aFwiO1xyXG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSGFuZHJhaWxDb2x1bW5IZWlnaHRcIl0gPSBcImhhbmRyYWlsQ29sdW1uSGVpZ2h0XCI7XHJcbn0pKENvbXBvbmVudFBhcmFtVHlwZSB8fCAoQ29tcG9uZW50UGFyYW1UeXBlID0ge30pKTtcclxuLy8gaW50ZXJmYWNlIFBhcmFtU2V0dGluZ3Mge1xyXG4vLyAgICAgbWluOiBudW1iZXI7XHJcbi8vICAgICBtYXg6IG51bWJlcjtcclxuLy8gICAgIHN0ZXA6IG51bWJlcjtcclxuLy8gICAgIHVuaXQ6IHN0cmluZztcclxuLy8gICAgIHByZWNpc2lvbjogbnVtYmVyO1xyXG4vLyB9XHJcbmV4cG9ydCB2YXIgQ29tcG9uZW50VHlwZTtcclxuKGZ1bmN0aW9uIChDb21wb25lbnRUeXBlKSB7XHJcbiAgICBDb21wb25lbnRUeXBlW0NvbXBvbmVudFR5cGVbXCJTdHJhaWdodFN0YWlyXCJdID0gMF0gPSBcIlN0cmFpZ2h0U3RhaXJcIjtcclxuICAgIENvbXBvbmVudFR5cGVbQ29tcG9uZW50VHlwZVtcIkNpcmN1bGFyU3RhaXJcIl0gPSAxXSA9IFwiQ2lyY3VsYXJTdGFpclwiO1xyXG4gICAgQ29tcG9uZW50VHlwZVtDb21wb25lbnRUeXBlW1wiUGxhdGZvcm1cIl0gPSAyXSA9IFwiUGxhdGZvcm1cIjtcclxufSkoQ29tcG9uZW50VHlwZSB8fCAoQ29tcG9uZW50VHlwZSA9IHt9KSk7XHJcbmV4cG9ydCB2YXIgUmFpbFR5cGU7XHJcbihmdW5jdGlvbiAoUmFpbFR5cGUpIHtcclxuICAgIFJhaWxUeXBlW1JhaWxUeXBlW1wiQ2lyY2xlXCJdID0gMF0gPSBcIkNpcmNsZVwiO1xyXG4gICAgUmFpbFR5cGVbUmFpbFR5cGVbXCJSZWN0XCJdID0gMV0gPSBcIlJlY3RcIjtcclxuICAgIFJhaWxUeXBlW1JhaWxUeXBlW1wiQ3VzdG9tXCJdID0gOTldID0gXCJDdXN0b21cIjtcclxufSkoUmFpbFR5cGUgfHwgKFJhaWxUeXBlID0ge30pKTtcclxuZXhwb3J0IHZhciBDb2x1bW5UeXBlO1xyXG4oZnVuY3Rpb24gKENvbHVtblR5cGUpIHtcclxuICAgIENvbHVtblR5cGVbQ29sdW1uVHlwZVtcIkNpcmNsZVwiXSA9IDBdID0gXCJDaXJjbGVcIjtcclxuICAgIENvbHVtblR5cGVbQ29sdW1uVHlwZVtcIlJlY3RcIl0gPSAxXSA9IFwiUmVjdFwiO1xyXG4gICAgQ29sdW1uVHlwZVtDb2x1bW5UeXBlW1wiQ3VzdG9tXCJdID0gOTldID0gXCJDdXN0b21cIjtcclxufSkoQ29sdW1uVHlwZSB8fCAoQ29sdW1uVHlwZSA9IHt9KSk7XHJcbmV4cG9ydCBjb25zdCBDb21wb25lbnRQYXJhbVNldHRpbmdzID0ge1xyXG4gICAgaG9yaXpvbnRhbFN0ZXA6IHsgdGl0bGU6IFwi5q2l6ZW/XCIsIG1pbjogMSwgbWF4OiAxMDAwMDAsIHN0ZXA6IDEwLCB1bml0OiAn6ZW/JywgcHJlY2lzaW9uOiAwLCB9LFxyXG4gICAgdmVydGljYWxTdGVwOiB7IHRpdGxlOiBcIuatpemVv1wiLCBtaW46IDEsIG1heDogMTAwMDAwLCBzdGVwOiAxMCwgdW5pdDogJ+mrmCcsIHByZWNpc2lvbjogMCwgfSxcclxuICAgIHN0YXJ0V2lkdGg6IHsgdGl0bGU6IFwi5a695bqmXCIsIG1pbjogMSwgbWF4OiAxMDAwMDAsIHN0ZXA6IDUwLCB1bml0OiAn6LW3JywgcHJlY2lzaW9uOiAwLCB9LFxyXG4gICAgZW5kV2lkdGg6IHsgdGl0bGU6IFwi5a695bqmXCIsIG1pbjogMSwgbWF4OiAxMDAwMDAsIHN0ZXA6IDUwLCB1bml0OiAn57uIJywgcHJlY2lzaW9uOiAwLCB9LFxyXG4gICAgcGxhdGZvcm1MZW5ndGg6IHsgdGl0bGU6IFwi6ZW/5bqmXCIsIG1pbjogMTAwLCBtYXg6IDEwMDAwMCwgc3RlcDogNTAsIHVuaXQ6ICcnLCBwcmVjaXNpb246IDAsIH0sXHJcbiAgICB0eXBlOiB7XHJcbiAgICAgICAgLy8gcmFkaW9WYWx1ZXM6IFtDb21wb25lbnRUeXBlLlN0cmFpZ2h0U3RhaXIsIENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpciwgQ29tcG9uZW50VHlwZS5QbGF0Zm9ybV0sXHJcbiAgICAgICAgLy8gdGV4dHM6IFtcIuebtOmYtlwiLCBcIuaXi+i9rOmYtuair1wiLCBcIuW5s+WPsFwiXSxcclxuICAgICAgICB0aXRsZTogXCLnsbvlnotcIixcclxuICAgICAgICByYWRpb09wdGlvbnM6IFtcclxuICAgICAgICAgICAgeyB2YWx1ZTogQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyLCB0ZXh0OiBcIuebtOmYtlwiIH0sXHJcbiAgICAgICAgICAgIHsgdmFsdWU6IENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpciwgdGV4dDogXCLml4vovazpmLbmoq9cIiB9LFxyXG4gICAgICAgICAgICB7IHZhbHVlOiBDb21wb25lbnRUeXBlLlBsYXRmb3JtLCB0ZXh0OiBcIuW5s+WPsFwiIH0sXHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHVwd2FyZDoge1xyXG4gICAgICAgIC8vIHJhZGlvVmFsdWVzOiBbMSwgMF0sXHJcbiAgICAgICAgLy8gdGV4dHM6IFtcIuWQkeS4ilwiLCBcIuWQkeS4i1wiXSxcclxuICAgICAgICB0aXRsZTogXCLmlrnlkJFcIixcclxuICAgICAgICByYWRpb09wdGlvbnM6IFtcclxuICAgICAgICAgICAgeyB2YWx1ZTogdHJ1ZSwgdGV4dDogXCLlkJHkuIpcIiB9LFxyXG4gICAgICAgICAgICB7IHZhbHVlOiBmYWxzZSwgdGV4dDogXCLlkJHkuItcIiB9LFxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICBwbGF0Zm9ybVRoaWNrbmVzczogeyB0aXRsZTogXCLljprluqZcIiwgbWluOiAxLCBtYXg6IDEwMDAwMCwgc3RlcDogMTAsIHVuaXQ6ICcnLCBwcmVjaXNpb246IDAsIH0sXHJcbiAgICBoYW5kcmFpbDoge1xyXG4gICAgICAgIHRpdGxlOiAn5ZCv55So5qCP5p2GJyxcclxuICAgICAgICBoZWlnaHQ6IHsgdGl0bGU6IFwi6auY5bqmXCIsIG1pbjogMSwgbWF4OiAxMDAwMDAsIHN0ZXA6IDEwLCB1bml0OiAnJywgcHJlY2lzaW9uOiAwLCB9LFxyXG4gICAgICAgIHJhaWw6IHtcclxuICAgICAgICAgICAgdHlwZToge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi5qC35byPXCIsXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogUmFpbFR5cGUuQ2lyY2xlLCBsYWJlbDogXCLlnIblvaJcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IFJhaWxUeXBlLlJlY3QsIGxhYmVsOiBcIuaWueW9olwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogUmFpbFR5cGUuQ3VzdG9tLCBsYWJlbDogXCLmi77lj5ZcIiB9LFxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29sdW1uOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIuagt+W8j1wiLFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0T3B0aW9uczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IENvbHVtblR5cGUuQ2lyY2xlLCBsYWJlbDogXCLlnIblvaJcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IENvbHVtblR5cGUuUmVjdCwgbGFiZWw6IFwi5pa55b2iXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBDb2x1bW5UeXBlLkN1c3RvbSwgbGFiZWw6IFwi5ou+5Y+WXCIgfSxcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3RlcDogeyB0aXRsZTogXCLpl7TpmpRcIiwgbWluOiAxLCBtYXg6IDEwMDAwMCwgc3RlcDogMTAsIHVuaXQ6ICcnLCBwcmVjaXNpb246IDAsIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wb25lbnRQYXJhbToge1xyXG4gICAgICAgICAgICByYWRpdXM6IHsgdGl0bGU6IFwi5Y2K5b6EXCIsIG1pbjogMSwgbWF4OiAxMDAwMDAsIHN0ZXA6IDEwLCB1bml0OiAnJywgcHJlY2lzaW9uOiAwLCB9LFxyXG4gICAgICAgICAgICB3aWR0aDogeyB0aXRsZTogXCLlrr3luqZcIiwgbWluOiAxLCBtYXg6IDEwMDAwMCwgc3RlcDogMTAsIHVuaXQ6ICcnLCBwcmVjaXNpb246IDAsIH0sXHJcbiAgICAgICAgICAgIGhlaWdodDogeyB0aXRsZTogXCLpq5jluqZcIiwgbWluOiAxLCBtYXg6IDEwMDAwMCwgc3RlcDogMTAsIHVuaXQ6ICcnLCBwcmVjaXNpb246IDAsIH0sXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29tcG9uZW50VGl0bGUoY29tcG9uZW50VHlwZSkge1xyXG4gICAgaWYgKGNvbXBvbmVudFR5cGUgPT09IENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpcikge1xyXG4gICAgICAgIHJldHVybiAn6Zi2JztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGNvbXBvbmVudFR5cGUgPT09IENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpcikge1xyXG4gICAgICAgIHJldHVybiAn6Zi2JztcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiAn5Y+wJztcclxuICAgIH1cclxufVxyXG5leHBvcnQgY29uc3QgRGVmYXVsdFN0YWlyUGFyYW0gPSB7XHJcbiAgICBob3Jpem9udGFsU3RlcDogMjUwLFxyXG4gICAgdmVydGljYWxTdGVwOiAyNTAsXHJcbiAgICBzdGFydFdpZHRoOiAxMDAwLFxyXG4gICAgZW5kV2lkdGg6IDEwMDAsXHJcbiAgICB1cHdhcmQ6IHRydWUsXHJcbiAgICBwbGF0Zm9ybVRoaWNrbmVzczogMjAwLFxyXG4gICAgaGFuZHJhaWw6IHtcclxuICAgICAgICBzdXBwb3J0OiB0cnVlLFxyXG4gICAgICAgIGhlaWdodDogNTAwLFxyXG4gICAgICAgIHJhaWw6IHtcclxuICAgICAgICAgICAgdHlwZTogUmFpbFR5cGUuQ2lyY2xlLFxyXG4gICAgICAgICAgICBwYXJhbTogeyByYWRpdXM6IDUwLCB3aWR0aDogNTAsIGhlaWdodDogNTAsIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb2x1bW46IHtcclxuICAgICAgICAgICAgdHlwZTogQ29sdW1uVHlwZS5DaXJjbGUsXHJcbiAgICAgICAgICAgIHN0ZXA6IDUwMCxcclxuICAgICAgICAgICAgcGFyYW06IHsgcmFkaXVzOiAyNSwgd2lkdGg6IDI1LCBoZWlnaHQ6IDI1LCB9LFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgc3RlcFByb3BvcnRpb25hbDogdHJ1ZSxcclxuICAgIHdpZHRoUHJvcG9ydGlvbmFsOiB0cnVlLFxyXG59O1xyXG5leHBvcnQgY29uc3QgRGVmYXVsdENvbXBvbmVudFBhcmFtID0ge1xyXG4gICAgaW5kZXg6IDAsXHJcbiAgICBob3Jpem9udGFsU3RlcDogRGVmYXVsdFN0YWlyUGFyYW0uaG9yaXpvbnRhbFN0ZXAsXHJcbiAgICB2ZXJ0aWNhbFN0ZXA6IERlZmF1bHRTdGFpclBhcmFtLnZlcnRpY2FsU3RlcCxcclxuICAgIHN0YXJ0V2lkdGg6IERlZmF1bHRTdGFpclBhcmFtLnN0YXJ0V2lkdGgsXHJcbiAgICBlbmRXaWR0aDogRGVmYXVsdFN0YWlyUGFyYW0uZW5kV2lkdGgsXHJcbiAgICBvZmZzZXRXaWR0aDogMCxcclxuICAgIHdpdGhPZmZzZXQ6IGZhbHNlLFxyXG4gICAgcGxhdGZvcm1MZW5ndGg6IDIwMDAsXHJcbiAgICB0eXBlOiBDb21wb25lbnRUeXBlLlBsYXRmb3JtLFxyXG4gICAgdXB3YXJkOiBEZWZhdWx0U3RhaXJQYXJhbS51cHdhcmQsXHJcbiAgICBwbGF0Zm9ybVRoaWNrbmVzczogRGVmYXVsdFN0YWlyUGFyYW0ucGxhdGZvcm1UaGlja25lc3MsXHJcbiAgICBzdGVwUHJvcG9ydGlvbmFsOiBEZWZhdWx0U3RhaXJQYXJhbS5zdGVwUHJvcG9ydGlvbmFsLFxyXG4gICAgd2lkdGhQcm9wb3J0aW9uYWw6IHRydWUsXHJcbiAgICBwbGF0Zm9ybUxlbmd0aExvY2tlZDogZmFsc2UsXHJcbiAgICAvLyBzdGVwVHlwZTogU3RlcFR5cGUuTm9ybWFsLFxyXG4gICAgLy8gY29ybmVyVHlwZTogQ29ybmVyVHlwZS5SZWN0YW5nbGUsXHJcbn07XHJcbmV4cG9ydCB2YXIgQ29tcG9uZW50RGlyZWN0aW9uVHlwZTtcclxuKGZ1bmN0aW9uIChDb21wb25lbnREaXJlY3Rpb25UeXBlKSB7XHJcbiAgICBDb21wb25lbnREaXJlY3Rpb25UeXBlW0NvbXBvbmVudERpcmVjdGlvblR5cGVbXCJGcm9udFwiXSA9IDBdID0gXCJGcm9udFwiO1xyXG4gICAgQ29tcG9uZW50RGlyZWN0aW9uVHlwZVtDb21wb25lbnREaXJlY3Rpb25UeXBlW1wiUmlnaHRGcm9udFwiXSA9IDFdID0gXCJSaWdodEZyb250XCI7XHJcbiAgICBDb21wb25lbnREaXJlY3Rpb25UeXBlW0NvbXBvbmVudERpcmVjdGlvblR5cGVbXCJSaWdodFwiXSA9IDJdID0gXCJSaWdodFwiO1xyXG4gICAgQ29tcG9uZW50RGlyZWN0aW9uVHlwZVtDb21wb25lbnREaXJlY3Rpb25UeXBlW1wiTGVmdFwiXSA9IDNdID0gXCJMZWZ0XCI7XHJcbiAgICBDb21wb25lbnREaXJlY3Rpb25UeXBlW0NvbXBvbmVudERpcmVjdGlvblR5cGVbXCJMZWZ0RnJvbnRcIl0gPSA0XSA9IFwiTGVmdEZyb250XCI7XHJcbn0pKENvbXBvbmVudERpcmVjdGlvblR5cGUgfHwgKENvbXBvbmVudERpcmVjdGlvblR5cGUgPSB7fSkpO1xyXG5leHBvcnQgdmFyIENpcmN1bGFyU2lkZTtcclxuKGZ1bmN0aW9uIChDaXJjdWxhclNpZGUpIHtcclxuICAgIENpcmN1bGFyU2lkZVtDaXJjdWxhclNpZGVbXCJMZWZ0XCJdID0gMF0gPSBcIkxlZnRcIjtcclxuICAgIENpcmN1bGFyU2lkZVtDaXJjdWxhclNpZGVbXCJSaWdodFwiXSA9IDFdID0gXCJSaWdodFwiO1xyXG59KShDaXJjdWxhclNpZGUgfHwgKENpcmN1bGFyU2lkZSA9IHt9KSk7XHJcbmV4cG9ydCBmdW5jdGlvbiBpc0F4aXNWYWxpZChheGlzKSB7XHJcbiAgICByZXR1cm4gYXhpcyA9PT0gXCJYXCIgLyogQXhpcy5YICovIHx8IGF4aXMgPT09IFwiLVhcIiAvKiBBeGlzLlhNaW51cyAqLyB8fCBheGlzID09PSBcIllcIiAvKiBBeGlzLlkgKi8gfHwgYXhpcyA9PT0gXCItWVwiIC8qIEF4aXMuWU1pbnVzICovIHx8IGF4aXMgPT09IFwiWlwiIC8qIEF4aXMuWiAqLyB8fCBheGlzID09PSBcIi1aXCIgLyogQXhpcy5aTWludXMgKi87XHJcbn1cclxuIiwiaW1wb3J0IHsgQmFzZUxpbmUzZERlbGltaXRlciwgQ29vcmREZWxpbWl0ZXIsIERlZmF1bHRDb21wb25lbnRQYXJhbSwgRGVsaW1pdGVyIH0gZnJvbSBcIi4vdHlwZXNcIjtcclxuZXhwb3J0IGZ1bmN0aW9uIGlzS0FyY2hGYWNlKGVudGl0eSkge1xyXG4gICAgcmV0dXJuICEhZW50aXR5ICYmIChlbnRpdHkuZ2V0VHlwZSgpID09PSBLQXJjaEZhY2VUeXBlLk5vblBsYW5hciB8fCBlbnRpdHkuZ2V0VHlwZSgpID09PSBLQXJjaEZhY2VUeXBlLlBsYW5hcik7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGlzS0dyb3VwSW5zdGFuY2UoZW50aXR5KSB7XHJcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS0VudGl0eVR5cGUuR3JvdXBJbnN0YW5jZTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gaXNLRmFjZShlbnRpdHkpIHtcclxuICAgIHJldHVybiAhIWVudGl0eSAmJiBlbnRpdHkuZ2V0VHlwZSgpID09PSBLRW50aXR5VHlwZS5GYWNlO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBpc0tFZGdlKGVudGl0eSkge1xyXG4gICAgcmV0dXJuICEhZW50aXR5ICYmIGVudGl0eS5nZXRUeXBlKCkgPT09IEtFbnRpdHlUeXBlLkVkZ2U7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGlzS1ZlcnRleChlbnRpdHkpIHtcclxuICAgIHJldHVybiAhIWVudGl0eSAmJiBlbnRpdHkuZ2V0VHlwZSgpID09PSBLRW50aXR5VHlwZS5WZXJ0ZXg7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGlzS0F1eGlsaWFyeUJvdW5kZWRDdXJ2ZShlbnRpdHkpIHtcclxuICAgIHJldHVybiAhIWVudGl0eSAmJiBlbnRpdHkuZ2V0VHlwZSgpID09PSBLRW50aXR5VHlwZS5BdXhpbGlhcnlCb3VuZGVkQ3VydmU7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGlzS0F1eGlsaWFyeUxpbmUoZW50aXR5KSB7XHJcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS0VudGl0eVR5cGUuQXV4aWxpYXJ5TGluZTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gaXNLUGxhbmUoZW50aXR5KSB7XHJcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS1N1cmZhY2VUeXBlLlBsYW5lO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBpc0tMaW5lU2VnbWVudDNkKGVudGl0eSkge1xyXG4gICAgcmV0dXJuICEhZW50aXR5ICYmICEhZW50aXR5LmRpcmVjdGlvbjtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gaXNLQXJjM2QoZW50aXR5KSB7XHJcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgISFlbnRpdHkuY2lyY2xlO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnlQYXJhbShwYXJhbSkge1xyXG4gICAgbGV0IHZhbHVlID0gJyc7XHJcbiAgICB2YWx1ZSArPSBgaW5kPSR7cGFyYW0uaW5kZXh9JHtEZWxpbWl0ZXJ9YDtcclxuICAgIHZhbHVlICs9IGBocz0ke3BhcmFtLmhvcml6b250YWxTdGVwfSR7RGVsaW1pdGVyfWA7XHJcbiAgICB2YWx1ZSArPSBgdnM9JHtwYXJhbS52ZXJ0aWNhbFN0ZXB9JHtEZWxpbWl0ZXJ9YDtcclxuICAgIHZhbHVlICs9IGBzdz0ke3BhcmFtLnN0YXJ0V2lkdGh9JHtEZWxpbWl0ZXJ9YDtcclxuICAgIHZhbHVlICs9IGBldz0ke3BhcmFtLmVuZFdpZHRofSR7RGVsaW1pdGVyfWA7XHJcbiAgICB2YWx1ZSArPSBgb3c9JHtwYXJhbS5vZmZzZXRXaWR0aH0ke0RlbGltaXRlcn1gO1xyXG4gICAgdmFsdWUgKz0gYHBsPSR7cGFyYW0ucGxhdGZvcm1MZW5ndGh9JHtEZWxpbWl0ZXJ9YDtcclxuICAgIHZhbHVlICs9IGB0cD0ke3BhcmFtLnR5cGV9JHtEZWxpbWl0ZXJ9YDtcclxuICAgIHZhbHVlICs9IGB1cD0ke3BhcmFtLnVwd2FyZCA/IDEgOiAwfSR7RGVsaW1pdGVyfWA7XHJcbiAgICB2YWx1ZSArPSBgcHRrPSR7cGFyYW0ucGxhdGZvcm1UaGlja25lc3N9YDtcclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VQYXJhbSh2YWx1ZSkge1xyXG4gICAgY29uc3QgcGFyYW0gPSBPYmplY3QuYXNzaWduKHt9LCBEZWZhdWx0Q29tcG9uZW50UGFyYW0pO1xyXG4gICAgY29uc3QgaXRlbXMgPSB2YWx1ZS5zcGxpdChEZWxpbWl0ZXIpO1xyXG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XHJcbiAgICAgICAgY29uc3Qga2V5VmFsdWUgPSBpdGVtLnNwbGl0KCc9Jyk7XHJcbiAgICAgICAgaWYgKGtleVZhbHVlLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGtleVZhbHVlWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdpbmQnOlxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmluZGV4ID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnaHMnOlxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmhvcml6b250YWxTdGVwID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAndnMnOlxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnZlcnRpY2FsU3RlcCA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3N3JzpcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5zdGFydFdpZHRoID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZXcnOlxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmVuZFdpZHRoID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnb3cnOlxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLm9mZnNldFdpZHRoID0gcGFyc2VGbG9hdChrZXlWYWx1ZVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdwbCc6XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0ucGxhdGZvcm1MZW5ndGggPSBwYXJzZUZsb2F0KGtleVZhbHVlWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3RwJzpcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbS50eXBlID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAndXAnOlxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnVwd2FyZCA9IGtleVZhbHVlWzFdID09PSAnMScgPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdwdGsnOlxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnBsYXRmb3JtVGhpY2tuZXNzID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcGFyYW0uc3RlcFByb3BvcnRpb25hbCA9IHRydWU7XHJcbiAgICBwYXJhbS53aWR0aFByb3BvcnRpb25hbCA9IHRydWU7XHJcbiAgICBwYXJhbS5wbGF0Zm9ybUxlbmd0aExvY2tlZCA9IHRydWU7XHJcbiAgICBwYXJhbS5tb2RlbEVkaXRpbmcgPSB0cnVlO1xyXG4gICAgcmV0dXJuIHBhcmFtO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnlTdGFydEVuZChzdGFydCwgZW5kKSB7XHJcbiAgICBsZXQgdmFsdWUgPSAnJztcclxuICAgIHZhbHVlICs9IGAke3N0YXJ0Lnh9JHtDb29yZERlbGltaXRlcn1gO1xyXG4gICAgdmFsdWUgKz0gYCR7c3RhcnQueX0ke0Nvb3JkRGVsaW1pdGVyfWA7XHJcbiAgICB2YWx1ZSArPSBgJHtzdGFydC56fSR7RGVsaW1pdGVyfWA7XHJcbiAgICB2YWx1ZSArPSBgJHtlbmQueH0ke0Nvb3JkRGVsaW1pdGVyfWA7XHJcbiAgICB2YWx1ZSArPSBgJHtlbmQueX0ke0Nvb3JkRGVsaW1pdGVyfWA7XHJcbiAgICB2YWx1ZSArPSBgJHtlbmQuen1gO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUxpbmVTZWczZCh2YWx1ZSkge1xyXG4gICAgY29uc3QgaXRlbXMgPSB2YWx1ZS5zcGxpdChEZWxpbWl0ZXIpO1xyXG4gICAgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0S2V5VmFsdWUgPSBpdGVtc1swXS5zcGxpdChDb29yZERlbGltaXRlcik7XHJcbiAgICAgICAgY29uc3QgZW5kS2V5VmFsdWUgPSBpdGVtc1sxXS5zcGxpdChDb29yZERlbGltaXRlcik7XHJcbiAgICAgICAgaWYgKHN0YXJ0S2V5VmFsdWUubGVuZ3RoID09PSAzICYmIGVuZEtleVZhbHVlLmxlbmd0aCA9PT0gMykge1xyXG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IEdlb21MaWIuY3JlYXRlUG9pbnQzZChwYXJzZUZsb2F0KHN0YXJ0S2V5VmFsdWVbMF0pLCBwYXJzZUZsb2F0KHN0YXJ0S2V5VmFsdWVbMV0pLCBwYXJzZUZsb2F0KHN0YXJ0S2V5VmFsdWVbMl0pKTtcclxuICAgICAgICAgICAgY29uc3QgZW5kID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKHBhcnNlRmxvYXQoZW5kS2V5VmFsdWVbMF0pLCBwYXJzZUZsb2F0KGVuZEtleVZhbHVlWzFdKSwgcGFyc2VGbG9hdChlbmRLZXlWYWx1ZVsyXSkpO1xyXG4gICAgICAgICAgICByZXR1cm4geyBzdGFydCwgZW5kIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVN0YXJ0RW5kKHZhbHVlKSB7XHJcbiAgICBjb25zdCBpdGVtcyA9IHZhbHVlLnNwbGl0KERlbGltaXRlcik7XHJcbiAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRLZXlWYWx1ZSA9IGl0ZW1zWzBdLnNwbGl0KENvb3JkRGVsaW1pdGVyKTtcclxuICAgICAgICBjb25zdCBlbmRLZXlWYWx1ZSA9IGl0ZW1zWzFdLnNwbGl0KENvb3JkRGVsaW1pdGVyKTtcclxuICAgICAgICBpZiAoc3RhcnRLZXlWYWx1ZS5sZW5ndGggPT09IDMgJiYgZW5kS2V5VmFsdWUubGVuZ3RoID09PSAzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKHBhcnNlRmxvYXQoc3RhcnRLZXlWYWx1ZVswXSksIHBhcnNlRmxvYXQoc3RhcnRLZXlWYWx1ZVsxXSksIDApO1xyXG4gICAgICAgICAgICBjb25zdCBlbmQgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QocGFyc2VGbG9hdChlbmRLZXlWYWx1ZVswXSksIHBhcnNlRmxvYXQoZW5kS2V5VmFsdWVbMV0pLCAwKTtcclxuICAgICAgICAgICAgcmV0dXJuIHsgc3RhcnQsIGVuZCwgc3RhcnRIZWlnaHQ6IHBhcnNlRmxvYXQoc3RhcnRLZXlWYWx1ZVsyXSksIGVuZEhlaWdodDogcGFyc2VGbG9hdChlbmRLZXlWYWx1ZVsyXSkgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeVBvaW50M2QocG9pbnQpIHtcclxuICAgIGxldCB2YWx1ZSA9ICcnO1xyXG4gICAgdmFsdWUgKz0gYCR7cG9pbnQueH0ke0Nvb3JkRGVsaW1pdGVyfWA7XHJcbiAgICB2YWx1ZSArPSBgJHtwb2ludC55fSR7Q29vcmREZWxpbWl0ZXJ9YDtcclxuICAgIHZhbHVlICs9IGAke3BvaW50Lnp9YDtcclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VWZWN0b3IzZCh2YWx1ZSkge1xyXG4gICAgY29uc3QgaXRlbXMgPSB2YWx1ZS5zcGxpdChDb29yZERlbGltaXRlcik7XHJcbiAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAzKSB7XHJcbiAgICAgICAgY29uc3QgdmVjdG9yID0gR2VvbUxpYi5jcmVhdGVWZWN0b3IzZChwYXJzZUZsb2F0KGl0ZW1zWzBdKSwgcGFyc2VGbG9hdChpdGVtc1sxXSksIHBhcnNlRmxvYXQoaXRlbXNbMl0pKTtcclxuICAgICAgICByZXR1cm4gdmVjdG9yO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnlCYXNlQ29tcG9uZW50KGJhc2VTZWdtZW50LCBsaW5lM2RJbmRleCkge1xyXG4gICAgbGV0IHZhbHVlID0gJyc7XHJcbiAgICB2YWx1ZSArPSBgJHtiYXNlU2VnbWVudC5wYXJhbS5pbmRleH1gO1xyXG4gICAgaWYgKGxpbmUzZEluZGV4ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB2YWx1ZSArPSBgJHtDb29yZERlbGltaXRlcn0ke2xpbmUzZEluZGV4fWA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQmFzZUNvbXBvbmVudCh2YWx1ZSkge1xyXG4gICAgY29uc3QgaXRlbXMgPSB2YWx1ZS5zcGxpdChCYXNlTGluZTNkRGVsaW1pdGVyKTtcclxuICAgIGlmIChpdGVtcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgY29uc3QgYmFzZUNvbXBvbmVudEluZGV4ID0gcGFyc2VJbnQoaXRlbXNbMF0pO1xyXG4gICAgICAgIGxldCBsaW5lM2RJbmRleDtcclxuICAgICAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICAgIGxpbmUzZEluZGV4ID0gcGFyc2VJbnQoaXRlbXNbMV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4geyBjb21wb25lbnRJbmRleDogYmFzZUNvbXBvbmVudEluZGV4LCBsaW5lM2RJbmRleCB9O1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBpc0VxdWFsKGEsIGIsIHRvbGVyYW5jZSA9IDEpIHtcclxuICAgIHJldHVybiBNYXRoLmFicyhhIC0gYikgPD0gdG9sZXJhbmNlO1xyXG59XHJcbiIsImV4cG9ydCB2YXIgTWVzc2FnZVR5cGU7XHJcbihmdW5jdGlvbiAoTWVzc2FnZVR5cGUpIHtcclxuICAgIE1lc3NhZ2VUeXBlW1wiRHJhd1N0YWlyVmlld01vdW50ZWRcIl0gPSBcImRyYXdTdGFpclZpZXdNb3VudGVkXCI7XHJcbiAgICBNZXNzYWdlVHlwZVtcIlN0YWlyUGFyYW1DaGFuZ2VkQnlJbnB1dFwiXSA9IFwic3RhaXJQYXJhbUNoYW5nZWRCeUlucHV0XCI7XHJcbiAgICBNZXNzYWdlVHlwZVtcIlBhcmFtQ2hhbmdlZEJ5SW5wdXRcIl0gPSBcInBhcmFtQ2hhbmdlZEJ5SW5wdXRcIjtcclxuICAgIE1lc3NhZ2VUeXBlW1wiUGFyYW1DaGFuZ2VkQnlEcmF3XCJdID0gXCJwYXJhbUNoYW5nZWRCeURyYXdcIjtcclxuICAgIE1lc3NhZ2VUeXBlW1wiQ29tcG9uZW50QWRkZWRcIl0gPSBcImNvbXBvbmVudEFkZGVkXCI7XHJcbiAgICBNZXNzYWdlVHlwZVtcIkRyYXdTdGFpck1vZGVsU2V0dGxlZFwiXSA9IFwiZHJhd1N0YWlyTW9kZWxTZXR0bGVkXCI7XHJcbiAgICBNZXNzYWdlVHlwZVtcIlByb3BlcnRpZXNWaXNpYmxlXCJdID0gXCJwcm9wZXJ0aWVzVmlzaWJsZVwiO1xyXG4gICAgTWVzc2FnZVR5cGVbXCJGb2N1c0NvbXBvbmVudEluZGV4XCJdID0gXCJmb2N1c0NvbXBvbmVudEluZGV4XCI7XHJcbiAgICBNZXNzYWdlVHlwZVtcIlJlbW92ZUNvbXBvbmVudFwiXSA9IFwicmVtb3ZlQ29tcG9uZW50XCI7XHJcbiAgICBNZXNzYWdlVHlwZVtcIkFjdGl2YXRlRHJhd1N0YWlyc1Rvb2xcIl0gPSBcImFjdGl2YXRlRHJhd1N0YWlyc1Rvb2xcIjtcclxuICAgIE1lc3NhZ2VUeXBlW1wiRGVBY3RpdmF0ZURyYXdTdGFpcnNUb29sXCJdID0gXCJkZUFjdGl2YXRlRHJhd1N0YWlyc1Rvb2xcIjtcclxuICAgIE1lc3NhZ2VUeXBlW1wiTGVhdmVEcmF3U3RhaXJzVG9vbFwiXSA9IFwibGVhdmVEcmF3U3RhaXJzVG9vbFwiO1xyXG59KShNZXNzYWdlVHlwZSB8fCAoTWVzc2FnZVR5cGUgPSB7fSkpO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL21haW4vbWFpbi50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==