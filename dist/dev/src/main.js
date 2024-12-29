/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main/consts.ts":
/*!****************************!*\
  !*** ./src/main/consts.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FirstSegment: () => (/* binding */ FirstSegment),
/* harmony export */   dummyMatrix4: () => (/* binding */ dummyMatrix4),
/* harmony export */   dummyPoint3d: () => (/* binding */ dummyPoint3d),
/* harmony export */   dummyVector3d: () => (/* binding */ dummyVector3d)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/main/types.ts");

const dummyMatrix4 = GeomLib.createIdentityMatrix4();
const dummyVector3d = GeomLib.createVector3d(0, 0, 1);
const dummyPoint3d = GeomLib.createPoint3d(0, 0, 0);
const FirstSegment = {
    start: dummyPoint3d,
    end: dummyPoint3d,
    startLocked: true,
    endLocked: false,
    startHeight: 0,
    endHeight: 0,
    stairShape: {
        vertices: [],
        tempLines: [],
    },
    moldShape: {
        vertices: [],
        tempLines: [],
    },
    param: _types__WEBPACK_IMPORTED_MODULE_0__.DefaultComponentParam,
};


/***/ }),

/***/ "./src/main/drawStairsTool.ts":
/*!************************************!*\
  !*** ./src/main/drawStairsTool.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DrawStairsTool: () => (/* binding */ DrawStairsTool),
/* harmony export */   drawStairsTool: () => (/* binding */ drawStairsTool)
/* harmony export */ });
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ "./src/main/consts.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./src/main/types.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/main/utils.ts");



const pluginUI = app.getPluginUI();
const appView = app.getActiveView();
const toolHelper = app.getToolHelper();
class DrawStairsTool {
    constructor() {
        this.componentParam = Object.assign({}, _types__WEBPACK_IMPORTED_MODULE_1__.DefaultComponentParam);
        this.segments = [];
    }
    onToolActive() {
        toolHelper.setExcludeInferenceTypes([
            KEntityType.Face, KEntityType.Edge, KEntityType.AuxiliaryBoundedCurve, KEntityType.AuxiliaryLine, KEntityType.AuxiliaryVertex,
            KEntityType.GroupInstance, KEntityType.Vertex, KArchFaceType.NonPlanar, KArchFaceType.Planar,
        ]);
        pluginUI.postMessage({ type: 'componentParamChanged', componentParam: this.componentParam }, '*');
    }
    onToolDeactive() {
        this.tryCommit();
        pluginUI.postMessage({ type: 'leaveDrawStairsTool' }, '*');
        toolHelper.setExcludeInferenceTypes([]);
        this.clear();
    }
    onMouseMove(event, inferenceResult) {
        if (inferenceResult) {
            // const { startWidth, endWidth, tempWidth, platformThickness } = this.componentParam;
            const position = inferenceResult.position;
            if (this.segments.length) {
                const lastSegment = this.segments[this.segments.length - 1];
                if (lastSegment.startLocked) {
                    lastSegment.end = position;
                    this.drawTempComponent(lastSegment);
                }
                else {
                    if (this.segments.length > 1) {
                        const prevSegment = this.segments[this.segments.length - 2];
                        // must be true
                        if (prevSegment.param.type === _types__WEBPACK_IMPORTED_MODULE_1__.ComponentType.Platform) {
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
                                    lastSegment.baseLineSeg3d = lineSeg3d;
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
                }
            }
            else {
            }
        }
    }
    onLButtonUp(event, inferenceResult) {
        if (inferenceResult) {
            const position = inferenceResult.position;
            if (this.segments.length) {
                const lastSegment = this.segments[this.segments.length - 1];
                if (!lastSegment.startLocked) {
                    lastSegment.startLocked = true;
                    if (lastSegment.pickStartTempShapeId) {
                        appView.clearTemporaryShapesByIds([lastSegment.pickStartTempShapeId]);
                    }
                    this.drawTempComponent(lastSegment);
                }
                else {
                    const { type, tempWidth } = this.componentParam;
                    this.componentParam = Object.assign(Object.assign({}, this.componentParam), { type: type === _types__WEBPACK_IMPORTED_MODULE_1__.ComponentType.Platform ? _types__WEBPACK_IMPORTED_MODULE_1__.ComponentType.StraightStair : _types__WEBPACK_IMPORTED_MODULE_1__.ComponentType.Platform, startWidth: tempWidth, endWidth: tempWidth });
                    pluginUI.postMessage({ type: 'componentParamChanged', componentParam: this.componentParam }, '*');
                    lastSegment.endLocked = true;
                    const nextSegment = Object.assign(Object.assign({}, _consts__WEBPACK_IMPORTED_MODULE_0__.FirstSegment), { start: lastSegment.end, end: lastSegment.end, startLocked: type === _types__WEBPACK_IMPORTED_MODULE_1__.ComponentType.Platform ? false : true, startHeight: lastSegment.endHeight, endHeight: lastSegment.endHeight, param: this.componentParam });
                    if (type !== _types__WEBPACK_IMPORTED_MODULE_1__.ComponentType.Platform) {
                        const { moldShape: { vertices } } = lastSegment;
                        nextSegment.baseLineSeg3d = GeomLib.createLineSegment3d(vertices[vertices.length - 2], vertices[vertices.length - 1]);
                    }
                    this.segments.push(nextSegment);
                }
            }
            else {
                const firstSegment = Object.assign(Object.assign({}, _consts__WEBPACK_IMPORTED_MODULE_0__.FirstSegment), { start: position, end: position, param: this.componentParam });
                this.segments.push(firstSegment);
            }
        }
    }
    drawTempComponent(lastSegment) {
        var _a, _b;
        // if (this.segments.length) {
        // const lastSegment = this.segments[this.segments.length - 1];
        if (lastSegment.startLocked) {
            (0,_utils__WEBPACK_IMPORTED_MODULE_2__.computeComponentShape)(lastSegment, this.componentParam, this.segments);
            const { stairShape: { vertices: stairVertices, tempLines: stairTempLines }, moldShape: { vertices: moldVertices, tempLines: moldTempLines } } = lastSegment;
            const tempLinePoints = [];
            const moldTempLinePoints = [];
            for (const stairTempLine of stairTempLines) {
                tempLinePoints.push([stairVertices[stairTempLine[0]], stairVertices[stairTempLine[1]]]);
            }
            for (const moldTempLine of moldTempLines) {
                moldTempLinePoints.push([moldVertices[moldTempLine[0]], moldVertices[moldTempLine[1]]]);
            }
            if ((_a = lastSegment.tempShapeId) === null || _a === void 0 ? void 0 : _a.length) {
                appView.clearTemporaryShapesByIds(lastSegment.tempShapeId);
            }
            if (tempLinePoints.length) {
                const tempShapeId = appView.drawPolylines(tempLinePoints, { color: { r: 255, g: 0, b: 0 }, depthTest: false });
                if (tempShapeId === null || tempShapeId === void 0 ? void 0 : tempShapeId.ids) {
                    lastSegment.tempShapeId = tempShapeId.ids;
                }
                const moldTempShapeId = appView.drawPolylines(moldTempLinePoints, { color: { r: 0, g: 255, b: 0 } });
                if (moldTempShapeId === null || moldTempShapeId === void 0 ? void 0 : moldTempShapeId.ids) {
                    if ((_b = lastSegment.tempShapeId) === null || _b === void 0 ? void 0 : _b.length) {
                        lastSegment.tempShapeId.push(...moldTempShapeId.ids);
                    }
                    else {
                        lastSegment.tempShapeId = moldTempShapeId.ids;
                    }
                }
            }
        }
        // }
    }
    changeComponentParam(componentParam) {
        this.componentParam = componentParam;
        if (this.segments.length) {
            const lastSegment = this.segments[this.segments.length - 1];
            this.drawTempComponent(lastSegment);
        }
    }
    changeComponentType(componentType) {
        this.componentParam.type = componentType;
        this.changeComponentParam(this.componentParam);
    }
    tryCommit() {
    }
    clear() {
        appView.clearTemporaryShapes();
        this.componentParam = Object.assign({}, _types__WEBPACK_IMPORTED_MODULE_1__.DefaultComponentParam);
        this.segments = [];
    }
    onRButtonUp(event, inferenceResult) {
        app.deactivateCustomTool(this);
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

/***/ "./src/main/types.ts":
/*!***************************!*\
  !*** ./src/main/types.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComponentParamSettings: () => (/* binding */ ComponentParamSettings),
/* harmony export */   ComponentParamType: () => (/* binding */ ComponentParamType),
/* harmony export */   ComponentPropertyKey: () => (/* binding */ ComponentPropertyKey),
/* harmony export */   ComponentType: () => (/* binding */ ComponentType),
/* harmony export */   CountPropertyKey: () => (/* binding */ CountPropertyKey),
/* harmony export */   DefaultComponentParam: () => (/* binding */ DefaultComponentParam),
/* harmony export */   IntervalPropertyKey: () => (/* binding */ IntervalPropertyKey),
/* harmony export */   ManualPrefix: () => (/* binding */ ManualPrefix),
/* harmony export */   NormalAxisPropertyKey: () => (/* binding */ NormalAxisPropertyKey),
/* harmony export */   PathAxisPropertyKey: () => (/* binding */ PathAxisPropertyKey),
/* harmony export */   PathDelimiter: () => (/* binding */ PathDelimiter),
/* harmony export */   PathListPropertyKey: () => (/* binding */ PathListPropertyKey),
/* harmony export */   PathReversedDelimiter: () => (/* binding */ PathReversedDelimiter),
/* harmony export */   ScalePropertyKey: () => (/* binding */ ScalePropertyKey),
/* harmony export */   isAxisValid: () => (/* binding */ isAxisValid)
/* harmony export */ });
const ComponentPropertyKey = 'PAComponent';
const IntervalPropertyKey = 'PAInterval';
const CountPropertyKey = 'PACount';
const PathAxisPropertyKey = 'PAPathAxis';
const NormalAxisPropertyKey = 'PANormalAxis';
const ScalePropertyKey = 'PAScale';
const PathListPropertyKey = 'PAPathList';
const PathReversedDelimiter = '-';
const PathDelimiter = '&';
const ManualPrefix = 'm';
var ComponentParamType;
(function (ComponentParamType) {
    ComponentParamType["HorizontalStep"] = "horizontalStep";
    ComponentParamType["VerticalStep"] = "verticalStep";
    ComponentParamType["StartWidth"] = "startWidth";
    ComponentParamType["EndWidth"] = "endWidth";
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
    [ComponentParamType.HorizontalStep]: {
        title: "步长",
        min: 1,
        max: 100000,
        step: 10,
        unit: '长',
        precision: 0,
    },
    [ComponentParamType.VerticalStep]: {
        title: "步长",
        min: 1,
        max: 100000,
        step: 10,
        unit: '高',
        precision: 0,
    },
    [ComponentParamType.StartWidth]: {
        title: "宽度",
        min: 1,
        max: 100000,
        step: 50,
        unit: '起',
        precision: 0,
    },
    [ComponentParamType.EndWidth]: {
        title: "宽度",
        min: 1,
        max: 100000,
        step: 50,
        unit: '终',
        precision: 0,
    },
    [ComponentParamType.Type]: {
        // radioValues: [ComponentType.StraightStair, ComponentType.CircularStair, ComponentType.Platform],
        // texts: ["直阶", "旋转阶梯", "平台"],
        title: "类型",
        radioOptions: [
            { value: ComponentType.StraightStair, text: "直阶" },
            { value: ComponentType.CircularStair, text: "旋转阶梯" },
            { value: ComponentType.Platform, text: "平台" },
        ]
    },
    [ComponentParamType.Upward]: {
        // radioValues: [1, 0],
        // texts: ["向上", "向下"],
        title: "方向",
        radioOptions: [
            { value: true, text: "向上" },
            { value: false, text: "向下" },
        ]
    },
    [ComponentParamType.PlatformThickness]: {
        title: "厚度",
        min: 1,
        max: 100000,
        step: 10,
        unit: '',
        precision: 0,
    },
};
const DefaultComponentParam = {
    horizontalStep: 500,
    verticalStep: 100,
    startWidth: 1000,
    endWidth: 1000,
    type: ComponentType.StraightStair,
    upward: true,
    platformThickness: 50,
    tempWidth: 1000,
    // stepType: StepType.Normal,
    // cornerType: CornerType.Rectangle,
};
function isAxisValid(axis) {
    return axis === "X" /* Axis.X */ || axis === "-X" /* Axis.XMinus */ || axis === "Y" /* Axis.Y */ || axis === "-Y" /* Axis.YMinus */ || axis === "Z" /* Axis.Z */ || axis === "-Z" /* Axis.ZMinus */;
}


/***/ }),

/***/ "./src/main/utils.ts":
/*!***************************!*\
  !*** ./src/main/utils.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DirectionZ: () => (/* binding */ DirectionZ),
/* harmony export */   computeComponentShape: () => (/* binding */ computeComponentShape),
/* harmony export */   isKArc3d: () => (/* binding */ isKArc3d),
/* harmony export */   isKArchFace: () => (/* binding */ isKArchFace),
/* harmony export */   isKAuxiliaryBoundedCurve: () => (/* binding */ isKAuxiliaryBoundedCurve),
/* harmony export */   isKAuxiliaryLine: () => (/* binding */ isKAuxiliaryLine),
/* harmony export */   isKEdge: () => (/* binding */ isKEdge),
/* harmony export */   isKFace: () => (/* binding */ isKFace),
/* harmony export */   isKGroupInstance: () => (/* binding */ isKGroupInstance),
/* harmony export */   isKLineSegment3d: () => (/* binding */ isKLineSegment3d),
/* harmony export */   isKPlane: () => (/* binding */ isKPlane),
/* harmony export */   isKVertex: () => (/* binding */ isKVertex)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/main/types.ts");

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
// const HeightTolerance: number = 5;
const LengthTolerance = 1;
const AngleTolerance = Math.PI / 36;
const DirectionZ = GeomLib.createVector3d(0, 0, 1);
// const DefaultBoardThickness = 50;
function computeComponentShape(segment, componentParam, segments) {
    const { type } = componentParam;
    if (type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.StraightStair || type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.CircularStair) {
        computeStairShape(segment, componentParam);
    }
    else {
        computePlatformShape(segment, componentParam, segments);
    }
}
function computeStairShape(segment, componentParam) {
    const { start, end, stairShape, moldShape, startHeight, baseLineSeg3d } = segment;
    const { startWidth, endWidth, type, horizontalStep, verticalStep, upward } = componentParam;
    stairShape.vertices = [];
    stairShape.tempLines = [];
    moldShape.vertices = [];
    moldShape.tempLines = [];
    const { vertices, tempLines } = stairShape;
    const { vertices: moldVertices, tempLines: moldTempLines } = moldShape;
    if (type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.StraightStair) {
        let horizontalFrontDir = end.subtracted(start).normalized();
        let horizontalDistance = start.distanceTo(end);
        if (baseLineSeg3d) {
            const angle = horizontalFrontDir.angle(baseLineSeg3d.direction);
            const deltaAngle = Math.abs(angle - Math.PI / 2);
            if (deltaAngle <= AngleTolerance) {
                horizontalFrontDir = baseLineSeg3d.direction.cross(horizontalFrontDir.cross(baseLineSeg3d.direction)).normalized();
                horizontalDistance = horizontalDistance * Math.cos(deltaAngle);
            }
        }
        const verticalFrontDir = DirectionZ;
        const horizontalLeftDir = DirectionZ.cross(horizontalFrontDir);
        const stepFloatCount = horizontalDistance / horizontalStep;
        const stepCount = Math.ceil(stepFloatCount);
        segment.endHeight = segment.startHeight + stepCount * verticalStep;
        if (stepCount < 1)
            return;
        const lastStepLength = horizontalDistance - (stepCount - 1) * horizontalStep;
        const stepHeight = upward ? verticalStep : -verticalStep;
        const leftPt = start.added(horizontalLeftDir.multiplied(startWidth / 2));
        const rightPt = start.added(horizontalLeftDir.multiplied(-startWidth / 2));
        const widthDelta = (endWidth - startWidth) / 2 / (stepFloatCount);
        for (let i = 0; i < stepCount - 1; i++) {
            const curLeftMoldPt = leftPt.added(horizontalFrontDir.multiplied(i * horizontalStep)).added(horizontalLeftDir.multiplied(i * widthDelta));
            const curRightMoldPt = rightPt.added(horizontalFrontDir.multiplied(i * horizontalStep)).added(horizontalLeftDir.multiplied(-i * widthDelta));
            const curLeftPt = curLeftMoldPt.added(DirectionZ.multiplied(startHeight)).added(verticalFrontDir.multiplied(i * stepHeight));
            const curRightPt = curRightMoldPt.added(DirectionZ.multiplied(startHeight)).added(verticalFrontDir.multiplied(i * stepHeight));
            moldVertices.push(curLeftMoldPt, curRightMoldPt);
            moldTempLines.push([2 * i, 1 + 2 * i], [2 * i, 2 + 2 * i], [1 + 2 * i, 3 + 2 * i]);
            vertices.push(curLeftPt, curRightPt);
            if (upward) {
                vertices.push(curLeftPt.added(verticalFrontDir.multiplied(stepHeight)), curRightPt.added(verticalFrontDir.multiplied(stepHeight)));
            }
            else {
                vertices.push(curLeftPt.added(horizontalFrontDir.multiplied(horizontalStep)), curRightPt.added(horizontalFrontDir.multiplied(horizontalStep)));
            }
            tempLines.push([4 * i, 1 + 4 * i], [4 * i, 2 + 4 * i], [1 + 4 * i, 3 + 4 * i], [2 + 4 * i, 3 + 4 * i], [2 + 4 * i, 4 + 4 * i], [3 + 4 * i, 5 + 4 * i]);
        }
        // if (lastStepLength > LengthTolerance) {
        // const lastLeftPoint = stepCount > 1 ? vertices[vertices.length - 2] : leftPt;
        // const lastRightPoint = stepCount > 1 ? vertices[vertices.length - 1] : rightPt;
        moldVertices.push(stepCount > 1 ? moldVertices[moldVertices.length - 2].added(horizontalFrontDir.multiplied(horizontalStep)) : leftPt, stepCount > 1 ? moldVertices[moldVertices.length - 1].added(horizontalFrontDir.multiplied(horizontalStep)) : rightPt);
        moldTempLines.push([2 * (stepCount - 1), 1 + 2 * (stepCount - 1)]);
        if (lastStepLength > LengthTolerance) {
            moldVertices.push(moldVertices[moldVertices.length - 2].added(horizontalLeftDir.multiplied(lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength)), moldVertices[moldVertices.length - 1].added(horizontalLeftDir.multiplied(-lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength)));
            moldTempLines.push([2 * (stepCount - 1), 2 + 2 * (stepCount - 1)], [1 + 2 * (stepCount - 1), 3 + 2 * (stepCount - 1)], [2 * stepCount, 1 + 2 * stepCount]);
        }
        if (upward) {
            vertices.push(
            // lastLeftPoint.added(horizontalLeftDir.multiplied(lastStepLength / horizontalStep * widthDelta)).added(verticalFrontDir.multiplied(stepHeight)),
            // lastRightPoint.added(horizontalLeftDir.multiplied(-lastStepLength / horizontalStep * widthDelta)).added(verticalFrontDir.multiplied(stepHeight))
            stepCount > 1 ? vertices[vertices.length - 2].added(horizontalFrontDir.multiplied(horizontalStep)) : leftPt, stepCount > 1 ? vertices[vertices.length - 1].added(horizontalFrontDir.multiplied(horizontalStep)) : rightPt);
            tempLines.push([4 * (stepCount - 1), 1 + 4 * (stepCount - 1)]);
            if (lastStepLength > LengthTolerance) {
                vertices.push(vertices[vertices.length - 2].added(verticalFrontDir.multiplied(verticalStep)), vertices[vertices.length - 1].added(verticalFrontDir.multiplied(verticalStep)));
                vertices.push(vertices[vertices.length - 2].added(horizontalLeftDir.multiplied(lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength)), vertices[vertices.length - 1].added(horizontalLeftDir.multiplied(-lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength)));
                tempLines.push(
                // [4 * stepCount, 1 + 4 * stepCount],
                [4 * (stepCount - 1), 2 + 4 * (stepCount - 1)], [1 + 4 * (stepCount - 1), 3 + 4 * (stepCount - 1)], [2 + 4 * (stepCount - 1), 3 + 4 * (stepCount - 1)], [2 + 4 * (stepCount - 1), 4 + 4 * (stepCount - 1)], [3 + 4 * (stepCount - 1), 5 + 4 * (stepCount - 1)], [4 * stepCount, 1 + 4 * stepCount]);
            }
        }
        else {
            vertices.push(
            // lastLeftPoint.added(horizontalLeftDir.multiplied(lastStepLength / horizontalStep * widthDelta)).added(verticalFrontDir.multiplied(stepHeight)),
            // lastRightPoint.added(horizontalLeftDir.multiplied(-lastStepLength / horizontalStep * widthDelta)).added(verticalFrontDir.multiplied(stepHeight))
            stepCount > 1 ? vertices[vertices.length - 2].added(verticalFrontDir.multiplied(verticalStep)) : leftPt, stepCount > 1 ? vertices[vertices.length - 1].added(verticalFrontDir.multiplied(verticalStep)) : rightPt);
            tempLines.push([4 * (stepCount - 1), 1 + 4 * (stepCount - 1)]);
            if (lastStepLength > LengthTolerance) {
                vertices.push(vertices[vertices.length - 2].added(horizontalLeftDir.multiplied(lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength)), vertices[vertices.length - 1].added(horizontalLeftDir.multiplied(-lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength)));
                tempLines.push(
                // [4 * (stepCount - 1), 1 + 4 * (stepCount - 1)],
                [4 * (stepCount - 1), 2 + 4 * (stepCount - 1)], [1 + 4 * (stepCount - 1), 3 + 4 * (stepCount - 1)], [2 + 4 * (stepCount - 1), 3 + 4 * (stepCount - 1)]);
            }
            // else {
            //     tempLines.pop();
            //     tempLines.pop();
            // }
        }
        // } else {
        //     tempLines.push(
        //         [4 * stepCount, 1 + 4 * stepCount],
        //     );
        // }
        if ((upward && stepCount > 1) || (!upward && stepCount > 2)) {
            tempLines.push([vertices.length - 2, 2 + vertices.length - 2], [1 + vertices.length - 2, 3 + vertices.length - 2], [2 + vertices.length - 2, 3 + vertices.length - 2], [2 + vertices.length - 2, 4 + vertices.length - 2], [3 + vertices.length - 2, 5 + vertices.length - 2], [vertices.length + 2, 1 + vertices.length + 2], [vertices.length + 2, 0], [1 + vertices.length + 2, 1]);
            if (upward) {
                vertices.push(vertices[vertices.length - 2].added(verticalFrontDir.multiplied(-stepHeight - (1 - lastStepLength / horizontalStep) * stepHeight)), vertices[vertices.length - 1].added(verticalFrontDir.multiplied(-stepHeight - (1 - lastStepLength / horizontalStep) * stepHeight)));
                vertices.push(vertices[0].added(horizontalFrontDir.multiplied(horizontalStep)), vertices[1].added(horizontalFrontDir.multiplied(horizontalStep)));
            }
            else {
                vertices.push(vertices[vertices.length - 2].added(horizontalFrontDir.multiplied(-lastStepLength - horizontalStep)), vertices[vertices.length - 1].added(horizontalFrontDir.multiplied(-lastStepLength - horizontalStep)));
                vertices.push(vertices[0].added(verticalFrontDir.multiplied(stepHeight)), vertices[1].added(verticalFrontDir.multiplied(stepHeight)));
            }
        }
        else {
            tempLines.push([vertices.length - 2, 2 + vertices.length - 2], [1 + vertices.length - 2, 3 + vertices.length - 2], [2 + vertices.length - 2, 3 + vertices.length - 2], [2 + vertices.length - 2, 0], [3 + vertices.length - 2, 1]);
            if (upward) {
                vertices.push(vertices[vertices.length - 2].added(verticalFrontDir.multiplied(-stepHeight)), vertices[vertices.length - 1].added(verticalFrontDir.multiplied(-stepHeight)));
            }
            else {
                vertices.push(vertices[0].added(verticalFrontDir.multiplied(stepHeight)), vertices[1].added(verticalFrontDir.multiplied(stepHeight)));
            }
        }
    }
    else {
    }
}
function computePlatformShape(segment, componentParam, segments) {
    const { tempWidth, platformThickness } = componentParam;
    const { start, end, stairShape, moldShape } = segment;
    const curDir = end.subtracted(start);
    const curLeftDir = DirectionZ.cross(curDir).normalized();
    stairShape.vertices = [];
    stairShape.tempLines = [];
    moldShape.vertices = [];
    moldShape.tempLines = [];
    if (segments.length > 1) {
        const preStairSegment = segments[segments.length - 2];
        // if (preStairSegment.type === ComponentType.Stair) {
        const { start: prevStart, end: prevEnd, param: prevParam, moldShape: prevMoldShape, endHeight: prevEndHeight } = preStairSegment;
        const prevDirNormalized = prevEnd.subtracted(prevStart).normalized();
        const prevLeftDir = DirectionZ.cross(prevDirNormalized).normalized();
        const angle = curDir.angleTo(prevDirNormalized, DirectionZ);
        const frontLength = curDir.dot(prevDirNormalized);
        const curEndLeftCorner = end.added(curLeftDir.multiplied(tempWidth / 2));
        const dir1 = curEndLeftCorner.subtracted(segment.start);
        const angle1 = dir1.angle(curDir);
        if (angle <= AngleTolerance || angle >= (Math.PI * 2 - AngleTolerance) || prevParam.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform) {
            segment.end = segment.start.added(prevDirNormalized.multiplied(frontLength));
            moldShape.vertices = [
                start.added(prevLeftDir.multiplied(tempWidth / 2)),
                start.added(prevLeftDir.multiplied(-tempWidth / 2)),
                segment.end.added(prevLeftDir.multiplied(-tempWidth / 2)),
                segment.end.added(prevLeftDir.multiplied(tempWidth / 2)),
            ];
            moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 0]];
            stairShape.vertices = [...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevEndHeight))),
                ...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevEndHeight - platformThickness))),
            ];
            stairShape.tempLines = [
                ...moldShape.tempLines,
                ...moldShape.tempLines.map(seg => [seg[0] + 4, seg[1] + 4]),
                [0, 4], [1, 5], [2, 6], [3, 7],
            ];
        }
        else {
            if (AngleTolerance < angle && angle < (Math.PI / 2 - angle1)) {
                let leftConnectPoints = [prevMoldShape.vertices[prevMoldShape.vertices.length - 2], prevMoldShape.vertices[prevMoldShape.vertices.length - 2]];
                if (tempWidth <= prevParam.endWidth) {
                    const l1 = tempWidth / 2 / Math.cos(angle);
                    if (l1 > prevParam.endWidth / 2) {
                        const a1 = l1 - prevParam.endWidth / 2;
                        const c1 = a1 / Math.tan(angle);
                        leftConnectPoints = [start.added(prevLeftDir.multiplied(prevParam.endWidth / 2)).added(prevDirNormalized.multiplied(c1)), start.added(prevLeftDir.multiplied(prevParam.endWidth / 2))];
                    }
                    else {
                        leftConnectPoints = [start.added(prevLeftDir.multiplied(l1)), start.added(prevLeftDir.multiplied(l1))];
                    }
                }
                moldShape.vertices = [
                    // start.added(curLeftDir.multiplied(tempWidth / 2)),
                    ...leftConnectPoints,
                    start.added(prevLeftDir.multiplied(-tempWidth / 2 / Math.cos(angle))),
                    end.added(curLeftDir.multiplied(-tempWidth / 2)),
                    end.added(curLeftDir.multiplied(tempWidth / 2)),
                ];
                moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]];
                stairShape.vertices = [...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevEndHeight))),
                    ...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevEndHeight - platformThickness))),
                ];
                stairShape.tempLines = [
                    ...moldShape.tempLines,
                    ...moldShape.tempLines.map(seg => [seg[0] + 5, seg[1] + 5]),
                    [0, 5], [1, 6], [2, 7], [3, 8], [4, 9],
                ];
            }
            else if (angle > (Math.PI * 3 / 2 + angle1)) {
                // const rightConnectPoint = tempWidth > prevParam.endWidth ? prevMoldShape.vertices[prevMoldShape.vertices.length - 1] :
                //     start.added(prevLeftDir.multiplied(-tempWidth / 2 * Math.cos(angle)));
                let rightConnectPoints = [prevMoldShape.vertices[prevMoldShape.vertices.length - 1], prevMoldShape.vertices[prevMoldShape.vertices.length - 1]];
                if (tempWidth <= prevParam.endWidth) {
                    const l2 = tempWidth / 2 / Math.cos(angle);
                    if (l2 > prevParam.endWidth / 2) {
                        const a2 = l2 - prevParam.endWidth / 2;
                        const c2 = a2 / Math.tan(Math.PI * 2 - angle);
                        rightConnectPoints = [start.added(prevLeftDir.multiplied(-prevParam.endWidth / 2)), start.added(prevLeftDir.multiplied(-prevParam.endWidth / 2)).added(prevDirNormalized.multiplied(c2))];
                    }
                    else {
                        rightConnectPoints = [start.added(prevLeftDir.multiplied(-l2)), start.added(prevLeftDir.multiplied(-l2))];
                    }
                }
                moldShape.vertices = [
                    start.added(prevLeftDir.multiplied(tempWidth / 2 / Math.cos(angle))),
                    ...rightConnectPoints,
                    // start.added(curLeftDir.multiplied(-tempWidth / 2)),
                    end.added(curLeftDir.multiplied(-tempWidth / 2)),
                    end.added(curLeftDir.multiplied(tempWidth / 2)),
                ];
                moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]];
                stairShape.vertices = [...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevEndHeight))),
                    ...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevEndHeight - platformThickness))),
                ];
                stairShape.tempLines = [
                    ...moldShape.tempLines,
                    ...moldShape.tempLines.map(seg => [seg[0] + 5, seg[1] + 5]),
                    [0, 5], [1, 6], [2, 7], [3, 8], [4, 9],
                ];
            }
            else if (angle >= Math.PI) {
                const validFrontLength = Math.max(tempWidth, frontLength);
                segment.end = segment.start.added(prevDirNormalized.multiplied(validFrontLength));
                const leftLength = curDir.dot(prevLeftDir);
                const validLeftLength = Math.max(tempWidth / 2, leftLength);
                // componentParam.startWidth = validLeftLength + tempWidth / 2;
                // componentParam.endWidth = validLeftLength + tempWidth / 2;
                moldShape.vertices = [
                    start.added(prevLeftDir.multiplied(validLeftLength)),
                    start.added(prevLeftDir.multiplied(-tempWidth / 2)),
                    segment.end.added(prevLeftDir.multiplied(-tempWidth / 2)),
                    segment.end.added(prevLeftDir.multiplied(validLeftLength)),
                ];
                moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 0]];
                stairShape.vertices = [...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevEndHeight))),
                    ...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevEndHeight - platformThickness))),
                ];
                stairShape.tempLines = [
                    ...moldShape.tempLines,
                    ...moldShape.tempLines.map(seg => [seg[0] + 4, seg[1] + 4]),
                    [0, 4], [1, 5], [2, 6], [3, 7],
                ];
            }
            else {
                const rightLength = -curDir.dot(prevLeftDir);
                const validFrontLength = Math.max(tempWidth, frontLength);
                segment.end = segment.start.added(prevDirNormalized.multiplied(validFrontLength));
                const validRightLength = Math.max(tempWidth / 2, rightLength);
                // componentParam.startWidth = validRightLength + tempWidth / 2;
                // componentParam.endWidth = validRightLength + tempWidth / 2;
                moldShape.vertices = [
                    start.added(prevLeftDir.multiplied(tempWidth / 2)),
                    start.added(prevLeftDir.multiplied(-validRightLength)),
                    segment.end.added(prevLeftDir.multiplied(-validRightLength)),
                    segment.end.added(prevLeftDir.multiplied(tempWidth / 2)),
                ];
                moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 0]];
                stairShape.vertices = [...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevEndHeight))),
                    ...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevEndHeight - platformThickness))),
                ];
                stairShape.tempLines = [
                    ...moldShape.tempLines,
                    ...moldShape.tempLines.map(seg => [seg[0] + 4, seg[1] + 4]),
                    [0, 4], [1, 5], [2, 6], [3, 7],
                ];
            }
        }
        // }
    }
    else {
        moldShape.vertices = [
            start.added(curLeftDir.multiplied(tempWidth / 2)),
            start.added(curLeftDir.multiplied(-tempWidth / 2)),
            segment.end.added(curLeftDir.multiplied(-tempWidth / 2)),
            segment.end.added(curLeftDir.multiplied(tempWidth / 2)),
        ];
        moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 0]];
        stairShape.vertices = [...moldShape.vertices,
            ...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(-platformThickness))),
        ];
        stairShape.tempLines = [
            ...moldShape.tempLines,
            ...moldShape.tempLines.map(seg => [seg[0] + 4, seg[1] + 4]),
            [0, 4], [1, 5], [2, 6], [3, 7],
        ];
    }
}


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
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/main/main.ts ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _drawStairsTool__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./drawStairsTool */ "./src/main/drawStairsTool.ts");
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
pluginUI.resize(300, 700);
pluginUI.mount();
let activatedCustomTool;
function onUIMessage(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (data.type === 'activateStraightStairsTool' || data.type === 'activateCircularStairsTool') {
                app.activateCustomTool(_drawStairsTool__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool, true);
                activatedCustomTool = _drawStairsTool__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool;
                _drawStairsTool__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool.changeComponentType(data.componentType);
            }
            else if (data.type === 'deActivateStraightStairsTool' || data.type === 'deActivateCircularStairsTool') {
                app.deactivateCustomTool(_drawStairsTool__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool, false);
                activatedCustomTool = undefined;
            }
            else if (data.type === 'componentParamChange') {
                if (activatedCustomTool === _drawStairsTool__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool) {
                    _drawStairsTool__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool.changeComponentParam(data.componentParam);
                }
            }
        }
        catch (error) {
            console.error(error);
            closePlugin();
        }
    });
}
pluginUI.onMessage(onUIMessage);
const selection = app.getSelection();
selection.addObserver({
    onSelectionChange: () => {
    }
});
// function onPluginStartUp() {
// }
// onPluginStartUp();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBZ0Q7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLFdBQVcseURBQXFCO0FBQ2hDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEJ3QztBQUN1QjtBQUNmO0FBQ2hEO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQSw4Q0FBOEMsRUFBRSx5REFBcUI7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0Isb0VBQW9FO0FBQ25HO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiw2QkFBNkI7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixxREFBcUQ7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxpREFBYTtBQUNwRSxvQ0FBb0MsYUFBYSx3QkFBd0I7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkdBQTJHLFNBQVMsb0JBQW9CLDBFQUEwRTtBQUNsTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixrQkFBa0I7QUFDOUMsd0VBQXdFLDBCQUEwQixlQUFlLGlEQUFhLFlBQVksaURBQWEsaUJBQWlCLGlEQUFhLHVEQUF1RDtBQUM1TywyQ0FBMkMsb0VBQW9FO0FBQy9HO0FBQ0Esc0VBQXNFLEVBQUUsaURBQVksS0FBSyxvRUFBb0UsaURBQWEsNEhBQTRIO0FBQ3RTLGlDQUFpQyxpREFBYTtBQUM5QyxnQ0FBZ0MsYUFBYSxhQUFhO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1FQUFtRSxFQUFFLGlEQUFZLEtBQUssNERBQTREO0FBQ2xKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksNkRBQXFCO0FBQ2pDLG9CQUFvQixjQUFjLG9EQUFvRCxlQUFlLHFEQUFxRDtBQUMxSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0RUFBNEUsU0FBUyxvQkFBb0Isb0JBQW9CO0FBQzdIO0FBQ0E7QUFDQTtBQUNBLG9GQUFvRixTQUFTLHNCQUFzQjtBQUNuSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsRUFBRSx5REFBcUI7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxnREFBZ0Q7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxzQ0FBc0M7QUFDaEM7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxnREFBZ0Q7QUFDOUQsY0FBYyxrREFBa0Q7QUFDaEUsY0FBYywyQ0FBMkM7QUFDekQ7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMseUJBQXlCO0FBQ3ZDLGNBQWMsMEJBQTBCO0FBQ3hDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1R3dDO0FBQ2pDO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDTztBQUNQLFlBQVksT0FBTztBQUNuQixpQkFBaUIsaURBQWEsMkJBQTJCLGlEQUFhO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxnRUFBZ0U7QUFDNUUsWUFBWSxtRUFBbUU7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLHNCQUFzQjtBQUNsQyxZQUFZLG1EQUFtRDtBQUMvRCxpQkFBaUIsaURBQWE7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsbUJBQW1CO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLCtCQUErQjtBQUMzQyxZQUFZLG9DQUFvQztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsdUdBQXVHO0FBQ3ZIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUdBQXFHLGlEQUFhO0FBQ2xIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3pVQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkEsaUJBQWlCLFNBQUksSUFBSSxTQUFJO0FBQzdCLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQ2tEO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsMkRBQWM7QUFDckQsc0NBQXNDLDJEQUFjO0FBQ3BELGdCQUFnQiwyREFBYztBQUM5QjtBQUNBO0FBQ0EseUNBQXlDLDJEQUFjO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QywyREFBYztBQUMxRCxvQkFBb0IsMkRBQWM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2RyYXctc3RhaXJzLy4vc3JjL21haW4vY29uc3RzLnRzIiwid2VicGFjazovL2RyYXctc3RhaXJzLy4vc3JjL21haW4vZHJhd1N0YWlyc1Rvb2wudHMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvLi9zcmMvbWFpbi90eXBlcy50cyIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy8uL3NyYy9tYWluL3V0aWxzLnRzIiwid2VicGFjazovL2RyYXctc3RhaXJzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2RyYXctc3RhaXJzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2RyYXctc3RhaXJzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvLi9zcmMvbWFpbi9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERlZmF1bHRDb21wb25lbnRQYXJhbSB9IGZyb20gXCIuL3R5cGVzXCI7XHJcbmV4cG9ydCBjb25zdCBkdW1teU1hdHJpeDQgPSBHZW9tTGliLmNyZWF0ZUlkZW50aXR5TWF0cml4NCgpO1xyXG5leHBvcnQgY29uc3QgZHVtbXlWZWN0b3IzZCA9IEdlb21MaWIuY3JlYXRlVmVjdG9yM2QoMCwgMCwgMSk7XHJcbmV4cG9ydCBjb25zdCBkdW1teVBvaW50M2QgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QoMCwgMCwgMCk7XHJcbmV4cG9ydCBjb25zdCBGaXJzdFNlZ21lbnQgPSB7XHJcbiAgICBzdGFydDogZHVtbXlQb2ludDNkLFxyXG4gICAgZW5kOiBkdW1teVBvaW50M2QsXHJcbiAgICBzdGFydExvY2tlZDogdHJ1ZSxcclxuICAgIGVuZExvY2tlZDogZmFsc2UsXHJcbiAgICBzdGFydEhlaWdodDogMCxcclxuICAgIGVuZEhlaWdodDogMCxcclxuICAgIHN0YWlyU2hhcGU6IHtcclxuICAgICAgICB2ZXJ0aWNlczogW10sXHJcbiAgICAgICAgdGVtcExpbmVzOiBbXSxcclxuICAgIH0sXHJcbiAgICBtb2xkU2hhcGU6IHtcclxuICAgICAgICB2ZXJ0aWNlczogW10sXHJcbiAgICAgICAgdGVtcExpbmVzOiBbXSxcclxuICAgIH0sXHJcbiAgICBwYXJhbTogRGVmYXVsdENvbXBvbmVudFBhcmFtLFxyXG59O1xyXG4iLCJpbXBvcnQgeyBGaXJzdFNlZ21lbnQgfSBmcm9tIFwiLi9jb25zdHNcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50VHlwZSwgRGVmYXVsdENvbXBvbmVudFBhcmFtIH0gZnJvbSBcIi4vdHlwZXNcIjtcclxuaW1wb3J0IHsgY29tcHV0ZUNvbXBvbmVudFNoYXBlIH0gZnJvbSBcIi4vdXRpbHNcIjtcclxuY29uc3QgcGx1Z2luVUkgPSBhcHAuZ2V0UGx1Z2luVUkoKTtcclxuY29uc3QgYXBwVmlldyA9IGFwcC5nZXRBY3RpdmVWaWV3KCk7XHJcbmNvbnN0IHRvb2xIZWxwZXIgPSBhcHAuZ2V0VG9vbEhlbHBlcigpO1xyXG5leHBvcnQgY2xhc3MgRHJhd1N0YWlyc1Rvb2wge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnRQYXJhbSA9IE9iamVjdC5hc3NpZ24oe30sIERlZmF1bHRDb21wb25lbnRQYXJhbSk7XHJcbiAgICAgICAgdGhpcy5zZWdtZW50cyA9IFtdO1xyXG4gICAgfVxyXG4gICAgb25Ub29sQWN0aXZlKCkge1xyXG4gICAgICAgIHRvb2xIZWxwZXIuc2V0RXhjbHVkZUluZmVyZW5jZVR5cGVzKFtcclxuICAgICAgICAgICAgS0VudGl0eVR5cGUuRmFjZSwgS0VudGl0eVR5cGUuRWRnZSwgS0VudGl0eVR5cGUuQXV4aWxpYXJ5Qm91bmRlZEN1cnZlLCBLRW50aXR5VHlwZS5BdXhpbGlhcnlMaW5lLCBLRW50aXR5VHlwZS5BdXhpbGlhcnlWZXJ0ZXgsXHJcbiAgICAgICAgICAgIEtFbnRpdHlUeXBlLkdyb3VwSW5zdGFuY2UsIEtFbnRpdHlUeXBlLlZlcnRleCwgS0FyY2hGYWNlVHlwZS5Ob25QbGFuYXIsIEtBcmNoRmFjZVR5cGUuUGxhbmFyLFxyXG4gICAgICAgIF0pO1xyXG4gICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogJ2NvbXBvbmVudFBhcmFtQ2hhbmdlZCcsIGNvbXBvbmVudFBhcmFtOiB0aGlzLmNvbXBvbmVudFBhcmFtIH0sICcqJyk7XHJcbiAgICB9XHJcbiAgICBvblRvb2xEZWFjdGl2ZSgpIHtcclxuICAgICAgICB0aGlzLnRyeUNvbW1pdCgpO1xyXG4gICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogJ2xlYXZlRHJhd1N0YWlyc1Rvb2wnIH0sICcqJyk7XHJcbiAgICAgICAgdG9vbEhlbHBlci5zZXRFeGNsdWRlSW5mZXJlbmNlVHlwZXMoW10pO1xyXG4gICAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgIH1cclxuICAgIG9uTW91c2VNb3ZlKGV2ZW50LCBpbmZlcmVuY2VSZXN1bHQpIHtcclxuICAgICAgICBpZiAoaW5mZXJlbmNlUmVzdWx0KSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnN0IHsgc3RhcnRXaWR0aCwgZW5kV2lkdGgsIHRlbXBXaWR0aCwgcGxhdGZvcm1UaGlja25lc3MgfSA9IHRoaXMuY29tcG9uZW50UGFyYW07XHJcbiAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uID0gaW5mZXJlbmNlUmVzdWx0LnBvc2l0aW9uO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWdtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RTZWdtZW50ID0gdGhpcy5zZWdtZW50c1t0aGlzLnNlZ21lbnRzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxhc3RTZWdtZW50LnN0YXJ0TG9ja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuZW5kID0gcG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3VGVtcENvbXBvbmVudChsYXN0U2VnbWVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWdtZW50cy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByZXZTZWdtZW50ID0gdGhpcy5zZWdtZW50c1t0aGlzLnNlZ21lbnRzLmxlbmd0aCAtIDJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBtdXN0IGJlIHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZTZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgbW9sZFNoYXBlOiB7IHZlcnRpY2VzLCB0ZW1wTGluZXMgfSB9ID0gcHJldlNlZ21lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2xvc2VzdFBvaW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1pbkRpc3RhbmNlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5mb3JFYWNoKGxpbmUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVTZWczZCA9IEdlb21MaWIuY3JlYXRlTGluZVNlZ21lbnQzZCh2ZXJ0aWNlc1tsaW5lWzBdXSwgdmVydGljZXNbbGluZVsxXV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoZVBvaW50ID0gbGluZVNlZzNkLmdldENsb3Nlc3RQb2ludChwb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyRGlzdGFuY2UgPSB0aGVQb2ludC5kaXN0YW5jZVRvKHBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNsb3Nlc3RQb2ludCB8fCBjdXJEaXN0YW5jZSA8IG1pbkRpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbkRpc3RhbmNlID0gY3VyRGlzdGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RQb2ludCA9IHRoZVBvaW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5zdGFydCA9IGNsb3Nlc3RQb2ludDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuYmFzZUxpbmVTZWczZCA9IGxpbmVTZWczZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0U2VnbWVudC5waWNrU3RhcnRUZW1wU2hhcGVJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcFZpZXcuY2xlYXJUZW1wb3JhcnlTaGFwZXNCeUlkcyhbbGFzdFNlZ21lbnQucGlja1N0YXJ0VGVtcFNoYXBlSWRdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbG9zZXN0UG9pbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwaWNrU3RhcnRUZW1wU2hhcGVJZCA9IGFwcFZpZXcuZHJhd0xpbmVzKFtwb3NpdGlvbiwgY2xvc2VzdFBvaW50XSwgeyBjb2xvcjogeyByOiAwLCBnOiAwLCBiOiAyNTUgfSwgZGVwdGhUZXN0OiB0cnVlLCBwYXR0ZXJuOiBLTGluZVBhdHRlcm4uRGFzaCwgZ2FwU2l6ZTogNTAsIGRhc2hTaXplOiA1MCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGlja1N0YXJ0VGVtcFNoYXBlSWQgPT09IG51bGwgfHwgcGlja1N0YXJ0VGVtcFNoYXBlSWQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBpY2tTdGFydFRlbXBTaGFwZUlkLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LnBpY2tTdGFydFRlbXBTaGFwZUlkID0gcGlja1N0YXJ0VGVtcFNoYXBlSWQuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25MQnV0dG9uVXAoZXZlbnQsIGluZmVyZW5jZVJlc3VsdCkge1xyXG4gICAgICAgIGlmIChpbmZlcmVuY2VSZXN1bHQpIHtcclxuICAgICAgICAgICAgY29uc3QgcG9zaXRpb24gPSBpbmZlcmVuY2VSZXN1bHQucG9zaXRpb247XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlZ21lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdFNlZ21lbnQgPSB0aGlzLnNlZ21lbnRzW3RoaXMuc2VnbWVudHMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICBpZiAoIWxhc3RTZWdtZW50LnN0YXJ0TG9ja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuc3RhcnRMb2NrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXN0U2VnbWVudC5waWNrU3RhcnRUZW1wU2hhcGVJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBWaWV3LmNsZWFyVGVtcG9yYXJ5U2hhcGVzQnlJZHMoW2xhc3RTZWdtZW50LnBpY2tTdGFydFRlbXBTaGFwZUlkXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBDb21wb25lbnQobGFzdFNlZ21lbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyB0eXBlLCB0ZW1wV2lkdGggfSA9IHRoaXMuY29tcG9uZW50UGFyYW07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnRQYXJhbSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5jb21wb25lbnRQYXJhbSksIHsgdHlwZTogdHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSA/IENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpciA6IENvbXBvbmVudFR5cGUuUGxhdGZvcm0sIHN0YXJ0V2lkdGg6IHRlbXBXaWR0aCwgZW5kV2lkdGg6IHRlbXBXaWR0aCB9KTtcclxuICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6ICdjb21wb25lbnRQYXJhbUNoYW5nZWQnLCBjb21wb25lbnRQYXJhbTogdGhpcy5jb21wb25lbnRQYXJhbSB9LCAnKicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LmVuZExvY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dFNlZ21lbnQgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIEZpcnN0U2VnbWVudCksIHsgc3RhcnQ6IGxhc3RTZWdtZW50LmVuZCwgZW5kOiBsYXN0U2VnbWVudC5lbmQsIHN0YXJ0TG9ja2VkOiB0eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtID8gZmFsc2UgOiB0cnVlLCBzdGFydEhlaWdodDogbGFzdFNlZ21lbnQuZW5kSGVpZ2h0LCBlbmRIZWlnaHQ6IGxhc3RTZWdtZW50LmVuZEhlaWdodCwgcGFyYW06IHRoaXMuY29tcG9uZW50UGFyYW0gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgIT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBtb2xkU2hhcGU6IHsgdmVydGljZXMgfSB9ID0gbGFzdFNlZ21lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTZWdtZW50LmJhc2VMaW5lU2VnM2QgPSBHZW9tTGliLmNyZWF0ZUxpbmVTZWdtZW50M2QodmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0sIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWdtZW50cy5wdXNoKG5leHRTZWdtZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0U2VnbWVudCA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgRmlyc3RTZWdtZW50KSwgeyBzdGFydDogcG9zaXRpb24sIGVuZDogcG9zaXRpb24sIHBhcmFtOiB0aGlzLmNvbXBvbmVudFBhcmFtIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWdtZW50cy5wdXNoKGZpcnN0U2VnbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkcmF3VGVtcENvbXBvbmVudChsYXN0U2VnbWVudCkge1xyXG4gICAgICAgIHZhciBfYSwgX2I7XHJcbiAgICAgICAgLy8gaWYgKHRoaXMuc2VnbWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgLy8gY29uc3QgbGFzdFNlZ21lbnQgPSB0aGlzLnNlZ21lbnRzW3RoaXMuc2VnbWVudHMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgaWYgKGxhc3RTZWdtZW50LnN0YXJ0TG9ja2VkKSB7XHJcbiAgICAgICAgICAgIGNvbXB1dGVDb21wb25lbnRTaGFwZShsYXN0U2VnbWVudCwgdGhpcy5jb21wb25lbnRQYXJhbSwgdGhpcy5zZWdtZW50cyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgc3RhaXJTaGFwZTogeyB2ZXJ0aWNlczogc3RhaXJWZXJ0aWNlcywgdGVtcExpbmVzOiBzdGFpclRlbXBMaW5lcyB9LCBtb2xkU2hhcGU6IHsgdmVydGljZXM6IG1vbGRWZXJ0aWNlcywgdGVtcExpbmVzOiBtb2xkVGVtcExpbmVzIH0gfSA9IGxhc3RTZWdtZW50O1xyXG4gICAgICAgICAgICBjb25zdCB0ZW1wTGluZVBvaW50cyA9IFtdO1xyXG4gICAgICAgICAgICBjb25zdCBtb2xkVGVtcExpbmVQb2ludHMgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBzdGFpclRlbXBMaW5lIG9mIHN0YWlyVGVtcExpbmVzKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wTGluZVBvaW50cy5wdXNoKFtzdGFpclZlcnRpY2VzW3N0YWlyVGVtcExpbmVbMF1dLCBzdGFpclZlcnRpY2VzW3N0YWlyVGVtcExpbmVbMV1dXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChjb25zdCBtb2xkVGVtcExpbmUgb2YgbW9sZFRlbXBMaW5lcykge1xyXG4gICAgICAgICAgICAgICAgbW9sZFRlbXBMaW5lUG9pbnRzLnB1c2goW21vbGRWZXJ0aWNlc1ttb2xkVGVtcExpbmVbMF1dLCBtb2xkVmVydGljZXNbbW9sZFRlbXBMaW5lWzFdXV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgoX2EgPSBsYXN0U2VnbWVudC50ZW1wU2hhcGVJZCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgYXBwVmlldy5jbGVhclRlbXBvcmFyeVNoYXBlc0J5SWRzKGxhc3RTZWdtZW50LnRlbXBTaGFwZUlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGVtcExpbmVQb2ludHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0ZW1wU2hhcGVJZCA9IGFwcFZpZXcuZHJhd1BvbHlsaW5lcyh0ZW1wTGluZVBvaW50cywgeyBjb2xvcjogeyByOiAyNTUsIGc6IDAsIGI6IDAgfSwgZGVwdGhUZXN0OiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgIGlmICh0ZW1wU2hhcGVJZCA9PT0gbnVsbCB8fCB0ZW1wU2hhcGVJZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogdGVtcFNoYXBlSWQuaWRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQudGVtcFNoYXBlSWQgPSB0ZW1wU2hhcGVJZC5pZHM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtb2xkVGVtcFNoYXBlSWQgPSBhcHBWaWV3LmRyYXdQb2x5bGluZXMobW9sZFRlbXBMaW5lUG9pbnRzLCB7IGNvbG9yOiB7IHI6IDAsIGc6IDI1NSwgYjogMCB9IH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vbGRUZW1wU2hhcGVJZCA9PT0gbnVsbCB8fCBtb2xkVGVtcFNoYXBlSWQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1vbGRUZW1wU2hhcGVJZC5pZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKF9iID0gbGFzdFNlZ21lbnQudGVtcFNoYXBlSWQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQudGVtcFNoYXBlSWQucHVzaCguLi5tb2xkVGVtcFNoYXBlSWQuaWRzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LnRlbXBTaGFwZUlkID0gbW9sZFRlbXBTaGFwZUlkLmlkcztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG4gICAgY2hhbmdlQ29tcG9uZW50UGFyYW0oY29tcG9uZW50UGFyYW0pIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudFBhcmFtID0gY29tcG9uZW50UGFyYW07XHJcbiAgICAgICAgaWYgKHRoaXMuc2VnbWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxhc3RTZWdtZW50ID0gdGhpcy5zZWdtZW50c1t0aGlzLnNlZ21lbnRzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdUZW1wQ29tcG9uZW50KGxhc3RTZWdtZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjaGFuZ2VDb21wb25lbnRUeXBlKGNvbXBvbmVudFR5cGUpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudFBhcmFtLnR5cGUgPSBjb21wb25lbnRUeXBlO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlQ29tcG9uZW50UGFyYW0odGhpcy5jb21wb25lbnRQYXJhbSk7XHJcbiAgICB9XHJcbiAgICB0cnlDb21taXQoKSB7XHJcbiAgICB9XHJcbiAgICBjbGVhcigpIHtcclxuICAgICAgICBhcHBWaWV3LmNsZWFyVGVtcG9yYXJ5U2hhcGVzKCk7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnRQYXJhbSA9IE9iamVjdC5hc3NpZ24oe30sIERlZmF1bHRDb21wb25lbnRQYXJhbSk7XHJcbiAgICAgICAgdGhpcy5zZWdtZW50cyA9IFtdO1xyXG4gICAgfVxyXG4gICAgb25SQnV0dG9uVXAoZXZlbnQsIGluZmVyZW5jZVJlc3VsdCkge1xyXG4gICAgICAgIGFwcC5kZWFjdGl2YXRlQ3VzdG9tVG9vbCh0aGlzKTtcclxuICAgIH1cclxuICAgIG9uTEJ1dHRvbkRiQ2xpY2soZXZlbnQsIGluZmVyZW5jZVJlc3VsdCkge1xyXG4gICAgICAgIDtcclxuICAgIH1cclxuICAgIGFsbG93VXNpbmdJbmZlcmVuY2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBvbktleURvd24oZXZlbnQpIHtcclxuICAgICAgICA7XHJcbiAgICB9XHJcbiAgICBvbktleVVwKGV2ZW50KSB7XHJcbiAgICAgICAgO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjb25zdCBkcmF3U3RhaXJzVG9vbCA9IG5ldyBEcmF3U3RhaXJzVG9vbCgpO1xyXG4iLCJleHBvcnQgY29uc3QgQ29tcG9uZW50UHJvcGVydHlLZXkgPSAnUEFDb21wb25lbnQnO1xyXG5leHBvcnQgY29uc3QgSW50ZXJ2YWxQcm9wZXJ0eUtleSA9ICdQQUludGVydmFsJztcclxuZXhwb3J0IGNvbnN0IENvdW50UHJvcGVydHlLZXkgPSAnUEFDb3VudCc7XHJcbmV4cG9ydCBjb25zdCBQYXRoQXhpc1Byb3BlcnR5S2V5ID0gJ1BBUGF0aEF4aXMnO1xyXG5leHBvcnQgY29uc3QgTm9ybWFsQXhpc1Byb3BlcnR5S2V5ID0gJ1BBTm9ybWFsQXhpcyc7XHJcbmV4cG9ydCBjb25zdCBTY2FsZVByb3BlcnR5S2V5ID0gJ1BBU2NhbGUnO1xyXG5leHBvcnQgY29uc3QgUGF0aExpc3RQcm9wZXJ0eUtleSA9ICdQQVBhdGhMaXN0JztcclxuZXhwb3J0IGNvbnN0IFBhdGhSZXZlcnNlZERlbGltaXRlciA9ICctJztcclxuZXhwb3J0IGNvbnN0IFBhdGhEZWxpbWl0ZXIgPSAnJic7XHJcbmV4cG9ydCBjb25zdCBNYW51YWxQcmVmaXggPSAnbSc7XHJcbmV4cG9ydCB2YXIgQ29tcG9uZW50UGFyYW1UeXBlO1xyXG4oZnVuY3Rpb24gKENvbXBvbmVudFBhcmFtVHlwZSkge1xyXG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSG9yaXpvbnRhbFN0ZXBcIl0gPSBcImhvcml6b250YWxTdGVwXCI7XHJcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJWZXJ0aWNhbFN0ZXBcIl0gPSBcInZlcnRpY2FsU3RlcFwiO1xyXG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiU3RhcnRXaWR0aFwiXSA9IFwic3RhcnRXaWR0aFwiO1xyXG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiRW5kV2lkdGhcIl0gPSBcImVuZFdpZHRoXCI7XHJcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJUeXBlXCJdID0gXCJ0eXBlXCI7XHJcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJVcHdhcmRcIl0gPSBcInVwd2FyZFwiO1xyXG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiUGxhdGZvcm1UaGlja25lc3NcIl0gPSBcInBsYXRmb3JtVGhpY2tuZXNzXCI7XHJcbn0pKENvbXBvbmVudFBhcmFtVHlwZSB8fCAoQ29tcG9uZW50UGFyYW1UeXBlID0ge30pKTtcclxuLy8gaW50ZXJmYWNlIFBhcmFtU2V0dGluZ3Mge1xyXG4vLyAgICAgbWluOiBudW1iZXI7XHJcbi8vICAgICBtYXg6IG51bWJlcjtcclxuLy8gICAgIHN0ZXA6IG51bWJlcjtcclxuLy8gICAgIHVuaXQ6IHN0cmluZztcclxuLy8gICAgIHByZWNpc2lvbjogbnVtYmVyO1xyXG4vLyB9XHJcbmV4cG9ydCB2YXIgQ29tcG9uZW50VHlwZTtcclxuKGZ1bmN0aW9uIChDb21wb25lbnRUeXBlKSB7XHJcbiAgICBDb21wb25lbnRUeXBlW0NvbXBvbmVudFR5cGVbXCJTdHJhaWdodFN0YWlyXCJdID0gMF0gPSBcIlN0cmFpZ2h0U3RhaXJcIjtcclxuICAgIENvbXBvbmVudFR5cGVbQ29tcG9uZW50VHlwZVtcIkNpcmN1bGFyU3RhaXJcIl0gPSAxXSA9IFwiQ2lyY3VsYXJTdGFpclwiO1xyXG4gICAgQ29tcG9uZW50VHlwZVtDb21wb25lbnRUeXBlW1wiUGxhdGZvcm1cIl0gPSAyXSA9IFwiUGxhdGZvcm1cIjtcclxufSkoQ29tcG9uZW50VHlwZSB8fCAoQ29tcG9uZW50VHlwZSA9IHt9KSk7XHJcbmV4cG9ydCBjb25zdCBDb21wb25lbnRQYXJhbVNldHRpbmdzID0ge1xyXG4gICAgW0NvbXBvbmVudFBhcmFtVHlwZS5Ib3Jpem9udGFsU3RlcF06IHtcclxuICAgICAgICB0aXRsZTogXCLmraXplb9cIixcclxuICAgICAgICBtaW46IDEsXHJcbiAgICAgICAgbWF4OiAxMDAwMDAsXHJcbiAgICAgICAgc3RlcDogMTAsXHJcbiAgICAgICAgdW5pdDogJ+mVvycsXHJcbiAgICAgICAgcHJlY2lzaW9uOiAwLFxyXG4gICAgfSxcclxuICAgIFtDb21wb25lbnRQYXJhbVR5cGUuVmVydGljYWxTdGVwXToge1xyXG4gICAgICAgIHRpdGxlOiBcIuatpemVv1wiLFxyXG4gICAgICAgIG1pbjogMSxcclxuICAgICAgICBtYXg6IDEwMDAwMCxcclxuICAgICAgICBzdGVwOiAxMCxcclxuICAgICAgICB1bml0OiAn6auYJyxcclxuICAgICAgICBwcmVjaXNpb246IDAsXHJcbiAgICB9LFxyXG4gICAgW0NvbXBvbmVudFBhcmFtVHlwZS5TdGFydFdpZHRoXToge1xyXG4gICAgICAgIHRpdGxlOiBcIuWuveW6plwiLFxyXG4gICAgICAgIG1pbjogMSxcclxuICAgICAgICBtYXg6IDEwMDAwMCxcclxuICAgICAgICBzdGVwOiA1MCxcclxuICAgICAgICB1bml0OiAn6LW3JyxcclxuICAgICAgICBwcmVjaXNpb246IDAsXHJcbiAgICB9LFxyXG4gICAgW0NvbXBvbmVudFBhcmFtVHlwZS5FbmRXaWR0aF06IHtcclxuICAgICAgICB0aXRsZTogXCLlrr3luqZcIixcclxuICAgICAgICBtaW46IDEsXHJcbiAgICAgICAgbWF4OiAxMDAwMDAsXHJcbiAgICAgICAgc3RlcDogNTAsXHJcbiAgICAgICAgdW5pdDogJ+e7iCcsXHJcbiAgICAgICAgcHJlY2lzaW9uOiAwLFxyXG4gICAgfSxcclxuICAgIFtDb21wb25lbnRQYXJhbVR5cGUuVHlwZV06IHtcclxuICAgICAgICAvLyByYWRpb1ZhbHVlczogW0NvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpciwgQ29tcG9uZW50VHlwZS5DaXJjdWxhclN0YWlyLCBDb21wb25lbnRUeXBlLlBsYXRmb3JtXSxcclxuICAgICAgICAvLyB0ZXh0czogW1wi55u06Zi2XCIsIFwi5peL6L2s6Zi25qKvXCIsIFwi5bmz5Y+wXCJdLFxyXG4gICAgICAgIHRpdGxlOiBcIuexu+Wei1wiLFxyXG4gICAgICAgIHJhZGlvT3B0aW9uczogW1xyXG4gICAgICAgICAgICB7IHZhbHVlOiBDb21wb25lbnRUeXBlLlN0cmFpZ2h0U3RhaXIsIHRleHQ6IFwi55u06Zi2XCIgfSxcclxuICAgICAgICAgICAgeyB2YWx1ZTogQ29tcG9uZW50VHlwZS5DaXJjdWxhclN0YWlyLCB0ZXh0OiBcIuaXi+i9rOmYtuair1wiIH0sXHJcbiAgICAgICAgICAgIHsgdmFsdWU6IENvbXBvbmVudFR5cGUuUGxhdGZvcm0sIHRleHQ6IFwi5bmz5Y+wXCIgfSxcclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAgW0NvbXBvbmVudFBhcmFtVHlwZS5VcHdhcmRdOiB7XHJcbiAgICAgICAgLy8gcmFkaW9WYWx1ZXM6IFsxLCAwXSxcclxuICAgICAgICAvLyB0ZXh0czogW1wi5ZCR5LiKXCIsIFwi5ZCR5LiLXCJdLFxyXG4gICAgICAgIHRpdGxlOiBcIuaWueWQkVwiLFxyXG4gICAgICAgIHJhZGlvT3B0aW9uczogW1xyXG4gICAgICAgICAgICB7IHZhbHVlOiB0cnVlLCB0ZXh0OiBcIuWQkeS4ilwiIH0sXHJcbiAgICAgICAgICAgIHsgdmFsdWU6IGZhbHNlLCB0ZXh0OiBcIuWQkeS4i1wiIH0sXHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIFtDb21wb25lbnRQYXJhbVR5cGUuUGxhdGZvcm1UaGlja25lc3NdOiB7XHJcbiAgICAgICAgdGl0bGU6IFwi5Y6a5bqmXCIsXHJcbiAgICAgICAgbWluOiAxLFxyXG4gICAgICAgIG1heDogMTAwMDAwLFxyXG4gICAgICAgIHN0ZXA6IDEwLFxyXG4gICAgICAgIHVuaXQ6ICcnLFxyXG4gICAgICAgIHByZWNpc2lvbjogMCxcclxuICAgIH0sXHJcbn07XHJcbmV4cG9ydCBjb25zdCBEZWZhdWx0Q29tcG9uZW50UGFyYW0gPSB7XHJcbiAgICBob3Jpem9udGFsU3RlcDogNTAwLFxyXG4gICAgdmVydGljYWxTdGVwOiAxMDAsXHJcbiAgICBzdGFydFdpZHRoOiAxMDAwLFxyXG4gICAgZW5kV2lkdGg6IDEwMDAsXHJcbiAgICB0eXBlOiBDb21wb25lbnRUeXBlLlN0cmFpZ2h0U3RhaXIsXHJcbiAgICB1cHdhcmQ6IHRydWUsXHJcbiAgICBwbGF0Zm9ybVRoaWNrbmVzczogNTAsXHJcbiAgICB0ZW1wV2lkdGg6IDEwMDAsXHJcbiAgICAvLyBzdGVwVHlwZTogU3RlcFR5cGUuTm9ybWFsLFxyXG4gICAgLy8gY29ybmVyVHlwZTogQ29ybmVyVHlwZS5SZWN0YW5nbGUsXHJcbn07XHJcbmV4cG9ydCBmdW5jdGlvbiBpc0F4aXNWYWxpZChheGlzKSB7XHJcbiAgICByZXR1cm4gYXhpcyA9PT0gXCJYXCIgLyogQXhpcy5YICovIHx8IGF4aXMgPT09IFwiLVhcIiAvKiBBeGlzLlhNaW51cyAqLyB8fCBheGlzID09PSBcIllcIiAvKiBBeGlzLlkgKi8gfHwgYXhpcyA9PT0gXCItWVwiIC8qIEF4aXMuWU1pbnVzICovIHx8IGF4aXMgPT09IFwiWlwiIC8qIEF4aXMuWiAqLyB8fCBheGlzID09PSBcIi1aXCIgLyogQXhpcy5aTWludXMgKi87XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50VHlwZSB9IGZyb20gXCIuL3R5cGVzXCI7XHJcbmV4cG9ydCBmdW5jdGlvbiBpc0tBcmNoRmFjZShlbnRpdHkpIHtcclxuICAgIHJldHVybiAhIWVudGl0eSAmJiAoZW50aXR5LmdldFR5cGUoKSA9PT0gS0FyY2hGYWNlVHlwZS5Ob25QbGFuYXIgfHwgZW50aXR5LmdldFR5cGUoKSA9PT0gS0FyY2hGYWNlVHlwZS5QbGFuYXIpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBpc0tHcm91cEluc3RhbmNlKGVudGl0eSkge1xyXG4gICAgcmV0dXJuICEhZW50aXR5ICYmIGVudGl0eS5nZXRUeXBlKCkgPT09IEtFbnRpdHlUeXBlLkdyb3VwSW5zdGFuY2U7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGlzS0ZhY2UoZW50aXR5KSB7XHJcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS0VudGl0eVR5cGUuRmFjZTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gaXNLRWRnZShlbnRpdHkpIHtcclxuICAgIHJldHVybiAhIWVudGl0eSAmJiBlbnRpdHkuZ2V0VHlwZSgpID09PSBLRW50aXR5VHlwZS5FZGdlO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBpc0tWZXJ0ZXgoZW50aXR5KSB7XHJcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS0VudGl0eVR5cGUuVmVydGV4O1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBpc0tBdXhpbGlhcnlCb3VuZGVkQ3VydmUoZW50aXR5KSB7XHJcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS0VudGl0eVR5cGUuQXV4aWxpYXJ5Qm91bmRlZEN1cnZlO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBpc0tBdXhpbGlhcnlMaW5lKGVudGl0eSkge1xyXG4gICAgcmV0dXJuICEhZW50aXR5ICYmIGVudGl0eS5nZXRUeXBlKCkgPT09IEtFbnRpdHlUeXBlLkF1eGlsaWFyeUxpbmU7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGlzS1BsYW5lKGVudGl0eSkge1xyXG4gICAgcmV0dXJuICEhZW50aXR5ICYmIGVudGl0eS5nZXRUeXBlKCkgPT09IEtTdXJmYWNlVHlwZS5QbGFuZTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gaXNLTGluZVNlZ21lbnQzZChlbnRpdHkpIHtcclxuICAgIHJldHVybiAhIWVudGl0eSAmJiAhIWVudGl0eS5kaXJlY3Rpb247XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGlzS0FyYzNkKGVudGl0eSkge1xyXG4gICAgcmV0dXJuICEhZW50aXR5ICYmICEhZW50aXR5LmNpcmNsZTtcclxufVxyXG4vLyBjb25zdCBIZWlnaHRUb2xlcmFuY2U6IG51bWJlciA9IDU7XHJcbmNvbnN0IExlbmd0aFRvbGVyYW5jZSA9IDE7XHJcbmNvbnN0IEFuZ2xlVG9sZXJhbmNlID0gTWF0aC5QSSAvIDM2O1xyXG5leHBvcnQgY29uc3QgRGlyZWN0aW9uWiA9IEdlb21MaWIuY3JlYXRlVmVjdG9yM2QoMCwgMCwgMSk7XHJcbi8vIGNvbnN0IERlZmF1bHRCb2FyZFRoaWNrbmVzcyA9IDUwO1xyXG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZUNvbXBvbmVudFNoYXBlKHNlZ21lbnQsIGNvbXBvbmVudFBhcmFtLCBzZWdtZW50cykge1xyXG4gICAgY29uc3QgeyB0eXBlIH0gPSBjb21wb25lbnRQYXJhbTtcclxuICAgIGlmICh0eXBlID09PSBDb21wb25lbnRUeXBlLlN0cmFpZ2h0U3RhaXIgfHwgdHlwZSA9PT0gQ29tcG9uZW50VHlwZS5DaXJjdWxhclN0YWlyKSB7XHJcbiAgICAgICAgY29tcHV0ZVN0YWlyU2hhcGUoc2VnbWVudCwgY29tcG9uZW50UGFyYW0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29tcHV0ZVBsYXRmb3JtU2hhcGUoc2VnbWVudCwgY29tcG9uZW50UGFyYW0sIHNlZ21lbnRzKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBjb21wdXRlU3RhaXJTaGFwZShzZWdtZW50LCBjb21wb25lbnRQYXJhbSkge1xyXG4gICAgY29uc3QgeyBzdGFydCwgZW5kLCBzdGFpclNoYXBlLCBtb2xkU2hhcGUsIHN0YXJ0SGVpZ2h0LCBiYXNlTGluZVNlZzNkIH0gPSBzZWdtZW50O1xyXG4gICAgY29uc3QgeyBzdGFydFdpZHRoLCBlbmRXaWR0aCwgdHlwZSwgaG9yaXpvbnRhbFN0ZXAsIHZlcnRpY2FsU3RlcCwgdXB3YXJkIH0gPSBjb21wb25lbnRQYXJhbTtcclxuICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbXTtcclxuICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW107XHJcbiAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXTtcclxuICAgIG1vbGRTaGFwZS50ZW1wTGluZXMgPSBbXTtcclxuICAgIGNvbnN0IHsgdmVydGljZXMsIHRlbXBMaW5lcyB9ID0gc3RhaXJTaGFwZTtcclxuICAgIGNvbnN0IHsgdmVydGljZXM6IG1vbGRWZXJ0aWNlcywgdGVtcExpbmVzOiBtb2xkVGVtcExpbmVzIH0gPSBtb2xkU2hhcGU7XHJcbiAgICBpZiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyKSB7XHJcbiAgICAgICAgbGV0IGhvcml6b250YWxGcm9udERpciA9IGVuZC5zdWJ0cmFjdGVkKHN0YXJ0KS5ub3JtYWxpemVkKCk7XHJcbiAgICAgICAgbGV0IGhvcml6b250YWxEaXN0YW5jZSA9IHN0YXJ0LmRpc3RhbmNlVG8oZW5kKTtcclxuICAgICAgICBpZiAoYmFzZUxpbmVTZWczZCkge1xyXG4gICAgICAgICAgICBjb25zdCBhbmdsZSA9IGhvcml6b250YWxGcm9udERpci5hbmdsZShiYXNlTGluZVNlZzNkLmRpcmVjdGlvbik7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlbHRhQW5nbGUgPSBNYXRoLmFicyhhbmdsZSAtIE1hdGguUEkgLyAyKTtcclxuICAgICAgICAgICAgaWYgKGRlbHRhQW5nbGUgPD0gQW5nbGVUb2xlcmFuY2UpIHtcclxuICAgICAgICAgICAgICAgIGhvcml6b250YWxGcm9udERpciA9IGJhc2VMaW5lU2VnM2QuZGlyZWN0aW9uLmNyb3NzKGhvcml6b250YWxGcm9udERpci5jcm9zcyhiYXNlTGluZVNlZzNkLmRpcmVjdGlvbikpLm5vcm1hbGl6ZWQoKTtcclxuICAgICAgICAgICAgICAgIGhvcml6b250YWxEaXN0YW5jZSA9IGhvcml6b250YWxEaXN0YW5jZSAqIE1hdGguY29zKGRlbHRhQW5nbGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHZlcnRpY2FsRnJvbnREaXIgPSBEaXJlY3Rpb25aO1xyXG4gICAgICAgIGNvbnN0IGhvcml6b250YWxMZWZ0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhob3Jpem9udGFsRnJvbnREaXIpO1xyXG4gICAgICAgIGNvbnN0IHN0ZXBGbG9hdENvdW50ID0gaG9yaXpvbnRhbERpc3RhbmNlIC8gaG9yaXpvbnRhbFN0ZXA7XHJcbiAgICAgICAgY29uc3Qgc3RlcENvdW50ID0gTWF0aC5jZWlsKHN0ZXBGbG9hdENvdW50KTtcclxuICAgICAgICBzZWdtZW50LmVuZEhlaWdodCA9IHNlZ21lbnQuc3RhcnRIZWlnaHQgKyBzdGVwQ291bnQgKiB2ZXJ0aWNhbFN0ZXA7XHJcbiAgICAgICAgaWYgKHN0ZXBDb3VudCA8IDEpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBjb25zdCBsYXN0U3RlcExlbmd0aCA9IGhvcml6b250YWxEaXN0YW5jZSAtIChzdGVwQ291bnQgLSAxKSAqIGhvcml6b250YWxTdGVwO1xyXG4gICAgICAgIGNvbnN0IHN0ZXBIZWlnaHQgPSB1cHdhcmQgPyB2ZXJ0aWNhbFN0ZXAgOiAtdmVydGljYWxTdGVwO1xyXG4gICAgICAgIGNvbnN0IGxlZnRQdCA9IHN0YXJ0LmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKTtcclxuICAgICAgICBjb25zdCByaWdodFB0ID0gc3RhcnQuYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKTtcclxuICAgICAgICBjb25zdCB3aWR0aERlbHRhID0gKGVuZFdpZHRoIC0gc3RhcnRXaWR0aCkgLyAyIC8gKHN0ZXBGbG9hdENvdW50KTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ZXBDb3VudCAtIDE7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBjdXJMZWZ0TW9sZFB0ID0gbGVmdFB0LmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGkgKiBob3Jpem9udGFsU3RlcCkpLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoaSAqIHdpZHRoRGVsdGEpKTtcclxuICAgICAgICAgICAgY29uc3QgY3VyUmlnaHRNb2xkUHQgPSByaWdodFB0LmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGkgKiBob3Jpem9udGFsU3RlcCkpLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoLWkgKiB3aWR0aERlbHRhKSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1ckxlZnRQdCA9IGN1ckxlZnRNb2xkUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkuYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKGkgKiBzdGVwSGVpZ2h0KSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1clJpZ2h0UHQgPSBjdXJSaWdodE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoaSAqIHN0ZXBIZWlnaHQpKTtcclxuICAgICAgICAgICAgbW9sZFZlcnRpY2VzLnB1c2goY3VyTGVmdE1vbGRQdCwgY3VyUmlnaHRNb2xkUHQpO1xyXG4gICAgICAgICAgICBtb2xkVGVtcExpbmVzLnB1c2goWzIgKiBpLCAxICsgMiAqIGldLCBbMiAqIGksIDIgKyAyICogaV0sIFsxICsgMiAqIGksIDMgKyAyICogaV0pO1xyXG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKGN1ckxlZnRQdCwgY3VyUmlnaHRQdCk7XHJcbiAgICAgICAgICAgIGlmICh1cHdhcmQpIHtcclxuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2goY3VyTGVmdFB0LmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksIGN1clJpZ2h0UHQuYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKGN1ckxlZnRQdC5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpLCBjdXJSaWdodFB0LmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFs0ICogaSwgMSArIDQgKiBpXSwgWzQgKiBpLCAyICsgNCAqIGldLCBbMSArIDQgKiBpLCAzICsgNCAqIGldLCBbMiArIDQgKiBpLCAzICsgNCAqIGldLCBbMiArIDQgKiBpLCA0ICsgNCAqIGldLCBbMyArIDQgKiBpLCA1ICsgNCAqIGldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYgKGxhc3RTdGVwTGVuZ3RoID4gTGVuZ3RoVG9sZXJhbmNlKSB7XHJcbiAgICAgICAgLy8gY29uc3QgbGFzdExlZnRQb2ludCA9IHN0ZXBDb3VudCA+IDEgPyB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXSA6IGxlZnRQdDtcclxuICAgICAgICAvLyBjb25zdCBsYXN0UmlnaHRQb2ludCA9IHN0ZXBDb3VudCA+IDEgPyB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXSA6IHJpZ2h0UHQ7XHJcbiAgICAgICAgbW9sZFZlcnRpY2VzLnB1c2goc3RlcENvdW50ID4gMSA/IG1vbGRWZXJ0aWNlc1ttb2xkVmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaG9yaXpvbnRhbFN0ZXApKSA6IGxlZnRQdCwgc3RlcENvdW50ID4gMSA/IG1vbGRWZXJ0aWNlc1ttb2xkVmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaG9yaXpvbnRhbFN0ZXApKSA6IHJpZ2h0UHQpO1xyXG4gICAgICAgIG1vbGRUZW1wTGluZXMucHVzaChbMiAqIChzdGVwQ291bnQgLSAxKSwgMSArIDIgKiAoc3RlcENvdW50IC0gMSldKTtcclxuICAgICAgICBpZiAobGFzdFN0ZXBMZW5ndGggPiBMZW5ndGhUb2xlcmFuY2UpIHtcclxuICAgICAgICAgICAgbW9sZFZlcnRpY2VzLnB1c2gobW9sZFZlcnRpY2VzW21vbGRWZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXAgKiB3aWR0aERlbHRhKSkuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGgpKSwgbW9sZFZlcnRpY2VzW21vbGRWZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKC1sYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwICogd2lkdGhEZWx0YSkpLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoKSkpO1xyXG4gICAgICAgICAgICBtb2xkVGVtcExpbmVzLnB1c2goWzIgKiAoc3RlcENvdW50IC0gMSksIDIgKyAyICogKHN0ZXBDb3VudCAtIDEpXSwgWzEgKyAyICogKHN0ZXBDb3VudCAtIDEpLCAzICsgMiAqIChzdGVwQ291bnQgLSAxKV0sIFsyICogc3RlcENvdW50LCAxICsgMiAqIHN0ZXBDb3VudF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodXB3YXJkKSB7XHJcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2goXHJcbiAgICAgICAgICAgIC8vIGxhc3RMZWZ0UG9pbnQuYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwICogd2lkdGhEZWx0YSkpLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksXHJcbiAgICAgICAgICAgIC8vIGxhc3RSaWdodFBvaW50LmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoLWxhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXAgKiB3aWR0aERlbHRhKSkuYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKVxyXG4gICAgICAgICAgICBzdGVwQ291bnQgPiAxID8gdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaG9yaXpvbnRhbFN0ZXApKSA6IGxlZnRQdCwgc3RlcENvdW50ID4gMSA/IHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSkgOiByaWdodFB0KTtcclxuICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzQgKiAoc3RlcENvdW50IC0gMSksIDEgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSk7XHJcbiAgICAgICAgICAgIGlmIChsYXN0U3RlcExlbmd0aCA+IExlbmd0aFRvbGVyYW5jZSkge1xyXG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQodmVydGljYWxTdGVwKSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZCh2ZXJ0aWNhbFN0ZXApKSk7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcCAqIHdpZHRoRGVsdGEpKS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCkpLCB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKC1sYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwICogd2lkdGhEZWx0YSkpLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoKSkpO1xyXG4gICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAvLyBbNCAqIHN0ZXBDb3VudCwgMSArIDQgKiBzdGVwQ291bnRdLFxyXG4gICAgICAgICAgICAgICAgWzQgKiAoc3RlcENvdW50IC0gMSksIDIgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzEgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCAzICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsyICsgNCAqIChzdGVwQ291bnQgLSAxKSwgMyArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMiArIDQgKiAoc3RlcENvdW50IC0gMSksIDQgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzMgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCA1ICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFs0ICogc3RlcENvdW50LCAxICsgNCAqIHN0ZXBDb3VudF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKFxyXG4gICAgICAgICAgICAvLyBsYXN0TGVmdFBvaW50LmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcCAqIHdpZHRoRGVsdGEpKS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLFxyXG4gICAgICAgICAgICAvLyBsYXN0UmlnaHRQb2ludC5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKC1sYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwICogd2lkdGhEZWx0YSkpLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZChzdGVwSGVpZ2h0KSlcclxuICAgICAgICAgICAgc3RlcENvdW50ID4gMSA/IHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZCh2ZXJ0aWNhbFN0ZXApKSA6IGxlZnRQdCwgc3RlcENvdW50ID4gMSA/IHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZCh2ZXJ0aWNhbFN0ZXApKSA6IHJpZ2h0UHQpO1xyXG4gICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbNCAqIChzdGVwQ291bnQgLSAxKSwgMSArIDQgKiAoc3RlcENvdW50IC0gMSldKTtcclxuICAgICAgICAgICAgaWYgKGxhc3RTdGVwTGVuZ3RoID4gTGVuZ3RoVG9sZXJhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcCAqIHdpZHRoRGVsdGEpKS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCkpLCB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKC1sYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwICogd2lkdGhEZWx0YSkpLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoKSkpO1xyXG4gICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAvLyBbNCAqIChzdGVwQ291bnQgLSAxKSwgMSArIDQgKiAoc3RlcENvdW50IC0gMSldLFxyXG4gICAgICAgICAgICAgICAgWzQgKiAoc3RlcENvdW50IC0gMSksIDIgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzEgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCAzICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsyICsgNCAqIChzdGVwQ291bnQgLSAxKSwgMyArIDQgKiAoc3RlcENvdW50IC0gMSldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBlbHNlIHtcclxuICAgICAgICAgICAgLy8gICAgIHRlbXBMaW5lcy5wb3AoKTtcclxuICAgICAgICAgICAgLy8gICAgIHRlbXBMaW5lcy5wb3AoKTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgIC8vICAgICB0ZW1wTGluZXMucHVzaChcclxuICAgICAgICAvLyAgICAgICAgIFs0ICogc3RlcENvdW50LCAxICsgNCAqIHN0ZXBDb3VudF0sXHJcbiAgICAgICAgLy8gICAgICk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIGlmICgodXB3YXJkICYmIHN0ZXBDb3VudCA+IDEpIHx8ICghdXB3YXJkICYmIHN0ZXBDb3VudCA+IDIpKSB7XHJcbiAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSAyLCAyICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsxICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMiArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCA0ICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFszICsgdmVydGljZXMubGVuZ3RoIC0gMiwgNSArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbdmVydGljZXMubGVuZ3RoICsgMiwgMSArIHZlcnRpY2VzLmxlbmd0aCArIDJdLCBbdmVydGljZXMubGVuZ3RoICsgMiwgMF0sIFsxICsgdmVydGljZXMubGVuZ3RoICsgMiwgMV0pO1xyXG4gICAgICAgICAgICBpZiAodXB3YXJkKSB7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZCgtc3RlcEhlaWdodCAtICgxIC0gbGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcCkgKiBzdGVwSGVpZ2h0KSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZCgtc3RlcEhlaWdodCAtICgxIC0gbGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcCkgKiBzdGVwSGVpZ2h0KSkpO1xyXG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1swXS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpLCB2ZXJ0aWNlc1sxXS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoLWxhc3RTdGVwTGVuZ3RoIC0gaG9yaXpvbnRhbFN0ZXApKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoLWxhc3RTdGVwTGVuZ3RoIC0gaG9yaXpvbnRhbFN0ZXApKSk7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzWzBdLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksIHZlcnRpY2VzWzFdLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbdmVydGljZXMubGVuZ3RoIC0gMiwgMiArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMSArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMF0sIFszICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMV0pO1xyXG4gICAgICAgICAgICBpZiAodXB3YXJkKSB7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZCgtc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQpKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzWzBdLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksIHZlcnRpY2VzWzFdLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gY29tcHV0ZVBsYXRmb3JtU2hhcGUoc2VnbWVudCwgY29tcG9uZW50UGFyYW0sIHNlZ21lbnRzKSB7XHJcbiAgICBjb25zdCB7IHRlbXBXaWR0aCwgcGxhdGZvcm1UaGlja25lc3MgfSA9IGNvbXBvbmVudFBhcmFtO1xyXG4gICAgY29uc3QgeyBzdGFydCwgZW5kLCBzdGFpclNoYXBlLCBtb2xkU2hhcGUgfSA9IHNlZ21lbnQ7XHJcbiAgICBjb25zdCBjdXJEaXIgPSBlbmQuc3VidHJhY3RlZChzdGFydCk7XHJcbiAgICBjb25zdCBjdXJMZWZ0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhjdXJEaXIpLm5vcm1hbGl6ZWQoKTtcclxuICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbXTtcclxuICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW107XHJcbiAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXTtcclxuICAgIG1vbGRTaGFwZS50ZW1wTGluZXMgPSBbXTtcclxuICAgIGlmIChzZWdtZW50cy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgY29uc3QgcHJlU3RhaXJTZWdtZW50ID0gc2VnbWVudHNbc2VnbWVudHMubGVuZ3RoIC0gMl07XHJcbiAgICAgICAgLy8gaWYgKHByZVN0YWlyU2VnbWVudC50eXBlID09PSBDb21wb25lbnRUeXBlLlN0YWlyKSB7XHJcbiAgICAgICAgY29uc3QgeyBzdGFydDogcHJldlN0YXJ0LCBlbmQ6IHByZXZFbmQsIHBhcmFtOiBwcmV2UGFyYW0sIG1vbGRTaGFwZTogcHJldk1vbGRTaGFwZSwgZW5kSGVpZ2h0OiBwcmV2RW5kSGVpZ2h0IH0gPSBwcmVTdGFpclNlZ21lbnQ7XHJcbiAgICAgICAgY29uc3QgcHJldkRpck5vcm1hbGl6ZWQgPSBwcmV2RW5kLnN1YnRyYWN0ZWQocHJldlN0YXJ0KS5ub3JtYWxpemVkKCk7XHJcbiAgICAgICAgY29uc3QgcHJldkxlZnREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKHByZXZEaXJOb3JtYWxpemVkKS5ub3JtYWxpemVkKCk7XHJcbiAgICAgICAgY29uc3QgYW5nbGUgPSBjdXJEaXIuYW5nbGVUbyhwcmV2RGlyTm9ybWFsaXplZCwgRGlyZWN0aW9uWik7XHJcbiAgICAgICAgY29uc3QgZnJvbnRMZW5ndGggPSBjdXJEaXIuZG90KHByZXZEaXJOb3JtYWxpemVkKTtcclxuICAgICAgICBjb25zdCBjdXJFbmRMZWZ0Q29ybmVyID0gZW5kLmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZCh0ZW1wV2lkdGggLyAyKSk7XHJcbiAgICAgICAgY29uc3QgZGlyMSA9IGN1ckVuZExlZnRDb3JuZXIuc3VidHJhY3RlZChzZWdtZW50LnN0YXJ0KTtcclxuICAgICAgICBjb25zdCBhbmdsZTEgPSBkaXIxLmFuZ2xlKGN1ckRpcik7XHJcbiAgICAgICAgaWYgKGFuZ2xlIDw9IEFuZ2xlVG9sZXJhbmNlIHx8IGFuZ2xlID49IChNYXRoLlBJICogMiAtIEFuZ2xlVG9sZXJhbmNlKSB8fCBwcmV2UGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xyXG4gICAgICAgICAgICBzZWdtZW50LmVuZCA9IHNlZ21lbnQuc3RhcnQuYWRkZWQocHJldkRpck5vcm1hbGl6ZWQubXVsdGlwbGllZChmcm9udExlbmd0aCkpO1xyXG4gICAgICAgICAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXHJcbiAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKHRlbXBXaWR0aCAvIDIpKSxcclxuICAgICAgICAgICAgICAgIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLXRlbXBXaWR0aCAvIDIpKSxcclxuICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLXRlbXBXaWR0aCAvIDIpKSxcclxuICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQodGVtcFdpZHRoIC8gMikpLFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgM10sIFszLCAwXV07XHJcbiAgICAgICAgICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHByZXZFbmRIZWlnaHQpKSksXHJcbiAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQocHJldkVuZEhlaWdodCAtIHBsYXRmb3JtVGhpY2tuZXNzKSkpLFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICBzdGFpclNoYXBlLnRlbXBMaW5lcyA9IFtcclxuICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMsXHJcbiAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLm1hcChzZWcgPT4gW3NlZ1swXSArIDQsIHNlZ1sxXSArIDRdKSxcclxuICAgICAgICAgICAgICAgIFswLCA0XSwgWzEsIDVdLCBbMiwgNl0sIFszLCA3XSxcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChBbmdsZVRvbGVyYW5jZSA8IGFuZ2xlICYmIGFuZ2xlIDwgKE1hdGguUEkgLyAyIC0gYW5nbGUxKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxlZnRDb25uZWN0UG9pbnRzID0gW3ByZXZNb2xkU2hhcGUudmVydGljZXNbcHJldk1vbGRTaGFwZS52ZXJ0aWNlcy5sZW5ndGggLSAyXSwgcHJldk1vbGRTaGFwZS52ZXJ0aWNlc1twcmV2TW9sZFNoYXBlLnZlcnRpY2VzLmxlbmd0aCAtIDJdXTtcclxuICAgICAgICAgICAgICAgIGlmICh0ZW1wV2lkdGggPD0gcHJldlBhcmFtLmVuZFdpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbDEgPSB0ZW1wV2lkdGggLyAyIC8gTWF0aC5jb3MoYW5nbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsMSA+IHByZXZQYXJhbS5lbmRXaWR0aCAvIDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYTEgPSBsMSAtIHByZXZQYXJhbS5lbmRXaWR0aCAvIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGMxID0gYTEgLyBNYXRoLnRhbihhbmdsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRDb25uZWN0UG9pbnRzID0gW3N0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQocHJldlBhcmFtLmVuZFdpZHRoIC8gMikpLmFkZGVkKHByZXZEaXJOb3JtYWxpemVkLm11bHRpcGxpZWQoYzEpKSwgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChwcmV2UGFyYW0uZW5kV2lkdGggLyAyKSldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdENvbm5lY3RQb2ludHMgPSBbc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChsMSkpLCBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKGwxKSldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtcclxuICAgICAgICAgICAgICAgICAgICAvLyBzdGFydC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQodGVtcFdpZHRoIC8gMikpLFxyXG4gICAgICAgICAgICAgICAgICAgIC4uLmxlZnRDb25uZWN0UG9pbnRzLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLXRlbXBXaWR0aCAvIDIgLyBNYXRoLmNvcyhhbmdsZSkpKSxcclxuICAgICAgICAgICAgICAgICAgICBlbmQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKC10ZW1wV2lkdGggLyAyKSksXHJcbiAgICAgICAgICAgICAgICAgICAgZW5kLmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZCh0ZW1wV2lkdGggLyAyKSksXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtbMCwgMV0sIFsxLCAyXSwgWzIsIDNdLCBbMywgNF0sIFs0LCAwXV07XHJcbiAgICAgICAgICAgICAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gWy4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChwcmV2RW5kSGVpZ2h0KSkpLFxyXG4gICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChwcmV2RW5kSGVpZ2h0IC0gcGxhdGZvcm1UaGlja25lc3MpKSksXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcyxcclxuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLm1hcChzZWcgPT4gW3NlZ1swXSArIDUsIHNlZ1sxXSArIDVdKSxcclxuICAgICAgICAgICAgICAgICAgICBbMCwgNV0sIFsxLCA2XSwgWzIsIDddLCBbMywgOF0sIFs0LCA5XSxcclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoYW5nbGUgPiAoTWF0aC5QSSAqIDMgLyAyICsgYW5nbGUxKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc3QgcmlnaHRDb25uZWN0UG9pbnQgPSB0ZW1wV2lkdGggPiBwcmV2UGFyYW0uZW5kV2lkdGggPyBwcmV2TW9sZFNoYXBlLnZlcnRpY2VzW3ByZXZNb2xkU2hhcGUudmVydGljZXMubGVuZ3RoIC0gMV0gOlxyXG4gICAgICAgICAgICAgICAgLy8gICAgIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLXRlbXBXaWR0aCAvIDIgKiBNYXRoLmNvcyhhbmdsZSkpKTtcclxuICAgICAgICAgICAgICAgIGxldCByaWdodENvbm5lY3RQb2ludHMgPSBbcHJldk1vbGRTaGFwZS52ZXJ0aWNlc1twcmV2TW9sZFNoYXBlLnZlcnRpY2VzLmxlbmd0aCAtIDFdLCBwcmV2TW9sZFNoYXBlLnZlcnRpY2VzW3ByZXZNb2xkU2hhcGUudmVydGljZXMubGVuZ3RoIC0gMV1dO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRlbXBXaWR0aCA8PSBwcmV2UGFyYW0uZW5kV2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsMiA9IHRlbXBXaWR0aCAvIDIgLyBNYXRoLmNvcyhhbmdsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGwyID4gcHJldlBhcmFtLmVuZFdpZHRoIC8gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhMiA9IGwyIC0gcHJldlBhcmFtLmVuZFdpZHRoIC8gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYzIgPSBhMiAvIE1hdGgudGFuKE1hdGguUEkgKiAyIC0gYW5nbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodENvbm5lY3RQb2ludHMgPSBbc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtcHJldlBhcmFtLmVuZFdpZHRoIC8gMikpLCBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC1wcmV2UGFyYW0uZW5kV2lkdGggLyAyKSkuYWRkZWQocHJldkRpck5vcm1hbGl6ZWQubXVsdGlwbGllZChjMikpXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0Q29ubmVjdFBvaW50cyA9IFtzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC1sMikpLCBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC1sMikpXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCh0ZW1wV2lkdGggLyAyIC8gTWF0aC5jb3MoYW5nbGUpKSksXHJcbiAgICAgICAgICAgICAgICAgICAgLi4ucmlnaHRDb25uZWN0UG9pbnRzLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHN0YXJ0LmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZCgtdGVtcFdpZHRoIC8gMikpLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoLXRlbXBXaWR0aCAvIDIpKSxcclxuICAgICAgICAgICAgICAgICAgICBlbmQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKHRlbXBXaWR0aCAvIDIpKSxcclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgM10sIFszLCA0XSwgWzQsIDBdXTtcclxuICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHByZXZFbmRIZWlnaHQpKSksXHJcbiAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHByZXZFbmRIZWlnaHQgLSBwbGF0Zm9ybVRoaWNrbmVzcykpKSxcclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICBzdGFpclNoYXBlLnRlbXBMaW5lcyA9IFtcclxuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLFxyXG4gICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMubWFwKHNlZyA9PiBbc2VnWzBdICsgNSwgc2VnWzFdICsgNV0pLFxyXG4gICAgICAgICAgICAgICAgICAgIFswLCA1XSwgWzEsIDZdLCBbMiwgN10sIFszLCA4XSwgWzQsIDldLFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChhbmdsZSA+PSBNYXRoLlBJKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZEZyb250TGVuZ3RoID0gTWF0aC5tYXgodGVtcFdpZHRoLCBmcm9udExlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICBzZWdtZW50LmVuZCA9IHNlZ21lbnQuc3RhcnQuYWRkZWQocHJldkRpck5vcm1hbGl6ZWQubXVsdGlwbGllZCh2YWxpZEZyb250TGVuZ3RoKSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsZWZ0TGVuZ3RoID0gY3VyRGlyLmRvdChwcmV2TGVmdERpcik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZExlZnRMZW5ndGggPSBNYXRoLm1heCh0ZW1wV2lkdGggLyAyLCBsZWZ0TGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbXBvbmVudFBhcmFtLnN0YXJ0V2lkdGggPSB2YWxpZExlZnRMZW5ndGggKyB0ZW1wV2lkdGggLyAyO1xyXG4gICAgICAgICAgICAgICAgLy8gY29tcG9uZW50UGFyYW0uZW5kV2lkdGggPSB2YWxpZExlZnRMZW5ndGggKyB0ZW1wV2lkdGggLyAyO1xyXG4gICAgICAgICAgICAgICAgbW9sZFNoYXBlLnZlcnRpY2VzID0gW1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQodmFsaWRMZWZ0TGVuZ3RoKSksXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtdGVtcFdpZHRoIC8gMikpLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLXRlbXBXaWR0aCAvIDIpKSxcclxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKHZhbGlkTGVmdExlbmd0aCkpLFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgIG1vbGRTaGFwZS50ZW1wTGluZXMgPSBbWzAsIDFdLCBbMSwgMl0sIFsyLCAzXSwgWzMsIDBdXTtcclxuICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHByZXZFbmRIZWlnaHQpKSksXHJcbiAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHByZXZFbmRIZWlnaHQgLSBwbGF0Zm9ybVRoaWNrbmVzcykpKSxcclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICBzdGFpclNoYXBlLnRlbXBMaW5lcyA9IFtcclxuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLFxyXG4gICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMubWFwKHNlZyA9PiBbc2VnWzBdICsgNCwgc2VnWzFdICsgNF0pLFxyXG4gICAgICAgICAgICAgICAgICAgIFswLCA0XSwgWzEsIDVdLCBbMiwgNl0sIFszLCA3XSxcclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByaWdodExlbmd0aCA9IC1jdXJEaXIuZG90KHByZXZMZWZ0RGlyKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkRnJvbnRMZW5ndGggPSBNYXRoLm1heCh0ZW1wV2lkdGgsIGZyb250TGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kID0gc2VnbWVudC5zdGFydC5hZGRlZChwcmV2RGlyTm9ybWFsaXplZC5tdWx0aXBsaWVkKHZhbGlkRnJvbnRMZW5ndGgpKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkUmlnaHRMZW5ndGggPSBNYXRoLm1heCh0ZW1wV2lkdGggLyAyLCByaWdodExlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb21wb25lbnRQYXJhbS5zdGFydFdpZHRoID0gdmFsaWRSaWdodExlbmd0aCArIHRlbXBXaWR0aCAvIDI7XHJcbiAgICAgICAgICAgICAgICAvLyBjb21wb25lbnRQYXJhbS5lbmRXaWR0aCA9IHZhbGlkUmlnaHRMZW5ndGggKyB0ZW1wV2lkdGggLyAyO1xyXG4gICAgICAgICAgICAgICAgbW9sZFNoYXBlLnZlcnRpY2VzID0gW1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQodGVtcFdpZHRoIC8gMikpLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLXZhbGlkUmlnaHRMZW5ndGgpKSxcclxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC12YWxpZFJpZ2h0TGVuZ3RoKSksXHJcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCh0ZW1wV2lkdGggLyAyKSksXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtbMCwgMV0sIFsxLCAyXSwgWzIsIDNdLCBbMywgMF1dO1xyXG4gICAgICAgICAgICAgICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFsuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQocHJldkVuZEhlaWdodCkpKSxcclxuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQocHJldkVuZEhlaWdodCAtIHBsYXRmb3JtVGhpY2tuZXNzKSkpLFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW1xyXG4gICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcy5tYXAoc2VnID0+IFtzZWdbMF0gKyA0LCBzZWdbMV0gKyA0XSksXHJcbiAgICAgICAgICAgICAgICAgICAgWzAsIDRdLCBbMSwgNV0sIFsyLCA2XSwgWzMsIDddLFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXHJcbiAgICAgICAgICAgIHN0YXJ0LmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZCh0ZW1wV2lkdGggLyAyKSksXHJcbiAgICAgICAgICAgIHN0YXJ0LmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZCgtdGVtcFdpZHRoIC8gMikpLFxyXG4gICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoLXRlbXBXaWR0aCAvIDIpKSxcclxuICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKHRlbXBXaWR0aCAvIDIpKSxcclxuICAgICAgICBdO1xyXG4gICAgICAgIG1vbGRTaGFwZS50ZW1wTGluZXMgPSBbWzAsIDFdLCBbMSwgMl0sIFsyLCAzXSwgWzMsIDBdXTtcclxuICAgICAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gWy4uLm1vbGRTaGFwZS52ZXJ0aWNlcyxcclxuICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1wbGF0Zm9ybVRoaWNrbmVzcykpKSxcclxuICAgICAgICBdO1xyXG4gICAgICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW1xyXG4gICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLFxyXG4gICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLm1hcChzZWcgPT4gW3NlZ1swXSArIDQsIHNlZ1sxXSArIDRdKSxcclxuICAgICAgICAgICAgWzAsIDRdLCBbMSwgNV0sIFsyLCA2XSwgWzMsIDddLFxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbmltcG9ydCB7IGRyYXdTdGFpcnNUb29sIH0gZnJvbSBcIi4vZHJhd1N0YWlyc1Rvb2xcIjtcclxuY29uc3QgcGx1Z2luVUkgPSBhcHAuZ2V0UGx1Z2luVUkoKTtcclxucGx1Z2luVUkucmVzaXplKDMwMCwgNzAwKTtcclxucGx1Z2luVUkubW91bnQoKTtcclxubGV0IGFjdGl2YXRlZEN1c3RvbVRvb2w7XHJcbmZ1bmN0aW9uIG9uVUlNZXNzYWdlKGRhdGEpIHtcclxuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEudHlwZSA9PT0gJ2FjdGl2YXRlU3RyYWlnaHRTdGFpcnNUb29sJyB8fCBkYXRhLnR5cGUgPT09ICdhY3RpdmF0ZUNpcmN1bGFyU3RhaXJzVG9vbCcpIHtcclxuICAgICAgICAgICAgICAgIGFwcC5hY3RpdmF0ZUN1c3RvbVRvb2woZHJhd1N0YWlyc1Rvb2wsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgYWN0aXZhdGVkQ3VzdG9tVG9vbCA9IGRyYXdTdGFpcnNUb29sO1xyXG4gICAgICAgICAgICAgICAgZHJhd1N0YWlyc1Rvb2wuY2hhbmdlQ29tcG9uZW50VHlwZShkYXRhLmNvbXBvbmVudFR5cGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gJ2RlQWN0aXZhdGVTdHJhaWdodFN0YWlyc1Rvb2wnIHx8IGRhdGEudHlwZSA9PT0gJ2RlQWN0aXZhdGVDaXJjdWxhclN0YWlyc1Rvb2wnKSB7XHJcbiAgICAgICAgICAgICAgICBhcHAuZGVhY3RpdmF0ZUN1c3RvbVRvb2woZHJhd1N0YWlyc1Rvb2wsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGFjdGl2YXRlZEN1c3RvbVRvb2wgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSAnY29tcG9uZW50UGFyYW1DaGFuZ2UnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZhdGVkQ3VzdG9tVG9vbCA9PT0gZHJhd1N0YWlyc1Rvb2wpIHtcclxuICAgICAgICAgICAgICAgICAgICBkcmF3U3RhaXJzVG9vbC5jaGFuZ2VDb21wb25lbnRQYXJhbShkYXRhLmNvbXBvbmVudFBhcmFtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIGNsb3NlUGx1Z2luKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxucGx1Z2luVUkub25NZXNzYWdlKG9uVUlNZXNzYWdlKTtcclxuY29uc3Qgc2VsZWN0aW9uID0gYXBwLmdldFNlbGVjdGlvbigpO1xyXG5zZWxlY3Rpb24uYWRkT2JzZXJ2ZXIoe1xyXG4gICAgb25TZWxlY3Rpb25DaGFuZ2U6ICgpID0+IHtcclxuICAgIH1cclxufSk7XHJcbi8vIGZ1bmN0aW9uIG9uUGx1Z2luU3RhcnRVcCgpIHtcclxuLy8gfVxyXG4vLyBvblBsdWdpblN0YXJ0VXAoKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9