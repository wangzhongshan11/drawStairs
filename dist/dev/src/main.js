/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main/drawStairsTool.ts":
/*!************************************!*\
  !*** ./src/main/drawStairsTool.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DrawStairsTool: () => (/* binding */ DrawStairsTool),
/* harmony export */   alignTool: () => (/* binding */ alignTool)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/main/types.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/main/utils.ts");


class DrawStairsTool {
    constructor() {
        // private stairParam: StairParam = DefaultStairParam;
        // private platformParam: PlatformParam = DefaultPlatformParam;
        this.componentParam = Object.assign({}, _types__WEBPACK_IMPORTED_MODULE_0__.DefaultComponentParam);
        this.segments = [];
    }
    onToolActive() {
        const toolHelper = app.getToolHelper();
        toolHelper.setExcludeInferenceTypes([
            KEntityType.Face, KEntityType.Edge, KEntityType.AuxiliaryBoundedCurve, KEntityType.AuxiliaryLine, KEntityType.AuxiliaryVertex,
            KEntityType.GroupInstance, KEntityType.Vertex, KArchFaceType.NonPlanar, KArchFaceType.Planar,
        ]);
    }
    onToolDeactive() {
        const pluginUI = app.getPluginUI();
        this.tryCommit();
        pluginUI.postMessage({ type: 'leaveDrawStairsTool' }, '*');
        const toolHelper = app.getToolHelper();
        toolHelper.setExcludeInferenceTypes([]);
        this.clear();
    }
    onMouseMove(event, inferenceResult) {
        var _a;
        const appView = app.getActiveView();
        if (inferenceResult) {
            // const { startWidth, endWidth, tempWidth, platformThickness } = this.componentParam;
            const position = inferenceResult.position;
            if (this.segments.length) {
                const lastStairSegment = this.segments[this.segments.length - 1];
                if (lastStairSegment.startLocked) {
                    lastStairSegment.end = position;
                    // if (lastStairSegment.type === ComponentType.Stair) {
                    //     // to compute points
                    // } else {
                    // }
                    (0,_utils__WEBPACK_IMPORTED_MODULE_1__.computeComponentShape)(lastStairSegment, this.componentParam, this.segments);
                    const { stairShape: { vertices: stairVertices, tempLines: stairTempLines }, moldShape: { vertices: moldVertices, tempLines: moldTempLines } } = lastStairSegment;
                    const tempLinePoints = [];
                    for (const stairTempLine of stairTempLines) {
                        tempLinePoints.push([stairVertices[stairTempLine[0]], stairVertices[stairTempLine[1]]]);
                    }
                    for (const moldTempLine of moldTempLines) {
                        tempLinePoints.push([moldVertices[moldTempLine[0]], moldVertices[moldTempLine[1]]]);
                    }
                    if ((_a = lastStairSegment.tempShapeId) === null || _a === void 0 ? void 0 : _a.length) {
                        appView.clearTemporaryShapesByIds(lastStairSegment.tempShapeId);
                    }
                    if (tempLinePoints.length) {
                        const tempShapeId = appView.drawPolylines(tempLinePoints, { color: { r: 255, g: 0, b: 0 } });
                        if (tempShapeId === null || tempShapeId === void 0 ? void 0 : tempShapeId.ids) {
                            lastStairSegment.tempShapeId = tempShapeId === null || tempShapeId === void 0 ? void 0 : tempShapeId.ids;
                        }
                    }
                }
                else {
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
                }
                else {
                    this.componentParam = Object.assign({}, _types__WEBPACK_IMPORTED_MODULE_0__.DefaultComponentParam);
                    lastSegment.endLocked = true;
                    const nextSegment = {
                        type: _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Stair,
                        start: lastSegment.end,
                        end: lastSegment.end,
                        startLocked: lastSegment.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform ? false : true,
                        endLocked: false,
                        startHeight: 0,
                        stairShape: {
                            vertices: [],
                            tempLines: [],
                        },
                        moldShape: {
                            vertices: [],
                            tempLines: [],
                        },
                        param: this.componentParam,
                    };
                    this.segments.push(nextSegment);
                }
            }
            else {
                const firstSegment = {
                    type: _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Stair,
                    start: position,
                    end: position,
                    startLocked: true,
                    endLocked: false,
                    startHeight: 0,
                    stairShape: {
                        vertices: [],
                        tempLines: [],
                    },
                    moldShape: {
                        vertices: [],
                        tempLines: [],
                    },
                    param: this.componentParam,
                };
                this.segments.push(firstSegment);
            }
        }
    }
    tryCommit() {
    }
    clear() {
        const appView = app.getActiveView();
        appView.clearTemporaryShapes();
        this.componentParam = Object.assign({}, _types__WEBPACK_IMPORTED_MODULE_0__.DefaultComponentParam);
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
const alignTool = new DrawStairsTool();


/***/ }),

/***/ "./src/main/types.ts":
/*!***************************!*\
  !*** ./src/main/types.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComponentPropertyKey: () => (/* binding */ ComponentPropertyKey),
/* harmony export */   ComponentType: () => (/* binding */ ComponentType),
/* harmony export */   CountPropertyKey: () => (/* binding */ CountPropertyKey),
/* harmony export */   DefaultComponentParam: () => (/* binding */ DefaultComponentParam),
/* harmony export */   DefaultPlatformParam: () => (/* binding */ DefaultPlatformParam),
/* harmony export */   IntervalPropertyKey: () => (/* binding */ IntervalPropertyKey),
/* harmony export */   ManualPrefix: () => (/* binding */ ManualPrefix),
/* harmony export */   NormalAxisPropertyKey: () => (/* binding */ NormalAxisPropertyKey),
/* harmony export */   PathAxisPropertyKey: () => (/* binding */ PathAxisPropertyKey),
/* harmony export */   PathDelimiter: () => (/* binding */ PathDelimiter),
/* harmony export */   PathListPropertyKey: () => (/* binding */ PathListPropertyKey),
/* harmony export */   PathReversedDelimiter: () => (/* binding */ PathReversedDelimiter),
/* harmony export */   ScalePropertyKey: () => (/* binding */ ScalePropertyKey),
/* harmony export */   StairType: () => (/* binding */ StairType),
/* harmony export */   dummyMatrix4: () => (/* binding */ dummyMatrix4),
/* harmony export */   dummyPoint3d: () => (/* binding */ dummyPoint3d),
/* harmony export */   dummyVector3d: () => (/* binding */ dummyVector3d),
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
var StairType;
(function (StairType) {
    StairType[StairType["Straight"] = 0] = "Straight";
    StairType[StairType["Circular"] = 1] = "Circular";
})(StairType || (StairType = {}));
const DefaultComponentParam = {
    startWidth: 1000,
    endWidth: 1000,
    tempWidth: 1000,
    platformThickness: 50,
    type: StairType.Straight,
    horizontalStep: 500,
    verticalStep: 100,
    upward: true,
    // stepType: StepType.Normal,
    // cornerType: CornerType.Rectangle,
};
const DefaultPlatformParam = {
    startWidth: 1000,
    endWidth: 1000,
    // length: 1000,
};
// export interface PartShape {
//     // 每种stepType不同的vertices排列
//     main: Shape,
//     // stair和corner部分vertices排列不同
//     sideBoard: Shape,
//     handrail: {
//         rails: {
//             segment: number;
//             // 内外两条
//             cylinders: Shape[],
//         },
//         pillars: {
//             segment: number,
//             // 很多条
//             cylinders: Shape[],
//         }
//     }
// }
// export interface StairShape {
//     stair: { stepCount: number; shape: PartShape },
//     corner: PartShape,
// }
var ComponentType;
(function (ComponentType) {
    ComponentType[ComponentType["Stair"] = 0] = "Stair";
    ComponentType[ComponentType["Platform"] = 1] = "Platform";
})(ComponentType || (ComponentType = {}));
function isAxisValid(axis) {
    return axis === "X" /* Axis.X */ || axis === "-X" /* Axis.XMinus */ || axis === "Y" /* Axis.Y */ || axis === "-Y" /* Axis.YMinus */ || axis === "Z" /* Axis.Z */ || axis === "-Z" /* Axis.ZMinus */;
}
const dummyMatrix4 = GeomLib.createIdentityMatrix4();
const dummyVector3d = GeomLib.createVector3d(0, 0, 1);
const dummyPoint3d = GeomLib.createPoint3d(0, 0, 0);


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
const AngleTolerance = Math.PI / 18;
const DirectionZ = GeomLib.createVector3d(0, 0, 1);
// const DefaultBoardThickness = 50;
function computeComponentShape(segment, componentParam, segments) {
    const { type } = segment;
    if (type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Stair) {
        computeStairShape(segment, componentParam);
    }
    else {
        computePlatformShape(segment, componentParam, segments);
    }
}
function computeStairShape(segment, componentParam) {
    const { start, end, stairShape, startHeight } = segment;
    const { startWidth, endWidth, type, horizontalStep, verticalStep, upward } = componentParam;
    stairShape.vertices = [];
    stairShape.tempLines = [];
    const { vertices, tempLines } = stairShape;
    if (type === _types__WEBPACK_IMPORTED_MODULE_0__.StairType.Straight) {
        const horizontalFrontDir = end.subtracted(start).normalized();
        const vertitalFrontDir = DirectionZ;
        const horizontalLeftDir = DirectionZ.cross(horizontalFrontDir);
        const horizontalDistance = start.distanceTo(end);
        const stepFloatCount = horizontalDistance / horizontalStep;
        const stepCount = Math.ceil(stepFloatCount);
        if (stepCount < 1)
            return;
        const lastStepLength = horizontalDistance - (stepCount - 1) * horizontalStep;
        const stepHeight = upward ? verticalStep : -verticalStep;
        const leftPt = start.added(DirectionZ.multiplied(startHeight)).added(horizontalLeftDir.multiplied(startWidth / 2));
        const rightPt = start.added(DirectionZ.multiplied(startHeight)).added(horizontalLeftDir.multiplied(-startWidth / 2));
        const widthDelta = (endWidth - startWidth) / 2 / (stepFloatCount);
        for (let i = 0; i < stepCount - 1; i++) {
            const curLeftPt = leftPt.added(horizontalFrontDir.multiplied(i * horizontalStep)).added(horizontalLeftDir.multiplied(i * widthDelta)).added(vertitalFrontDir.multiplied(i * stepHeight));
            const curRightPt = rightPt.added(horizontalFrontDir.multiplied(i * horizontalStep)).added(horizontalLeftDir.multiplied(-i * widthDelta)).added(vertitalFrontDir.multiplied(i * stepHeight));
            vertices.push(curLeftPt, curRightPt);
            if (upward) {
                vertices.push(curLeftPt.added(vertitalFrontDir.multiplied(stepHeight)), curRightPt.added(vertitalFrontDir.multiplied(stepHeight)));
            }
            else {
                vertices.push(curLeftPt.added(horizontalFrontDir.multiplied(horizontalStep)), curRightPt.added(horizontalFrontDir.multiplied(horizontalStep)));
            }
            tempLines.push([4 * i, 1 + 4 * i], [4 * i, 2 + 4 * i], [1 + 4 * i, 3 + 4 * i], [2 + 4 * i, 3 + 4 * i], [2 + 4 * i, 4 + 4 * i], [3 + 4 * i, 5 + 4 * i]);
        }
        // if (lastStepLength > LengthTolerance) {
        const lastLeftPoint = stepCount > 1 ? vertices[vertices.length - 2] : leftPt;
        const lastRightPoint = stepCount > 1 ? vertices[vertices.length - 1] : rightPt;
        if (upward) {
            vertices.push(lastLeftPoint.added(horizontalLeftDir.multiplied(lastStepLength / horizontalStep * widthDelta)).added(vertitalFrontDir.multiplied(stepHeight)), lastRightPoint.added(horizontalLeftDir.multiplied(-lastStepLength / horizontalStep * widthDelta)).added(vertitalFrontDir.multiplied(stepHeight)));
            tempLines.push([4 * (stepCount - 1), 1 + 4 * (stepCount - 1)]);
            if (lastStepLength > LengthTolerance) {
                vertices.push(vertices[vertices.length - 2].added(horizontalFrontDir.multiplied(lastStepLength)), vertices[vertices.length - 1].added(horizontalFrontDir.multiplied(lastStepLength)));
                tempLines.push(
                // [4 * stepCount, 1 + 4 * stepCount],
                [4 * (stepCount - 1), 2 + 4 * (stepCount - 1)], [1 + 4 * (stepCount - 1), 3 + 4 * (stepCount - 1)], [2 + 4 * (stepCount - 1), 3 + 4 * (stepCount - 1)]);
            }
        }
        else {
            if (lastStepLength > LengthTolerance) {
                vertices.push(lastLeftPoint.added(horizontalLeftDir.multiplied(lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength)), lastRightPoint.added(horizontalLeftDir.multiplied(-lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength)));
                tempLines.push([4 * (stepCount - 1), 1 + 4 * (stepCount - 1)], [4 * (stepCount - 1), 2 + 4 * (stepCount - 1)], [1 + 4 * (stepCount - 1), 3 + 4 * (stepCount - 1)], [2 + 4 * (stepCount - 1), 3 + 4 * (stepCount - 1)]);
            }
            else {
                tempLines.pop();
                tempLines.pop();
            }
        }
        // } else {
        //     tempLines.push(
        //         [4 * stepCount, 1 + 4 * stepCount],
        //     );
        // }
        if ((upward && stepCount > 1) || (!upward && stepCount > 2)) {
            tempLines.push([vertices.length - 2, 2 + vertices.length - 2], [1 + vertices.length - 2, 3 + vertices.length - 2], [2 + vertices.length - 2, 3 + vertices.length - 2], [2 + vertices.length - 2, 4 + vertices.length - 2], [3 + vertices.length - 2, 5 + vertices.length - 2], [vertices.length + 2, 1 + vertices.length + 2], [vertices.length + 2, 0], [1 + vertices.length + 2, 1]);
            if (upward) {
                vertices.push(vertices[vertices.length - 2].added(vertitalFrontDir.multiplied(-stepHeight - (1 - lastStepLength / horizontalStep) * stepHeight)), vertices[vertices.length - 1].added(vertitalFrontDir.multiplied(-stepHeight - (1 - lastStepLength / horizontalStep) * stepHeight)));
                vertices.push(vertices[0].added(horizontalFrontDir.multiplied(horizontalStep)), vertices[1].added(horizontalFrontDir.multiplied(horizontalStep)));
            }
            else {
                vertices.push(vertices[vertices.length - 2].added(horizontalFrontDir.multiplied(-lastStepLength - horizontalStep)), vertices[vertices.length - 1].added(horizontalFrontDir.multiplied(-lastStepLength - horizontalStep)));
                vertices.push(vertices[0].added(vertitalFrontDir.multiplied(stepHeight)), vertices[1].added(vertitalFrontDir.multiplied(stepHeight)));
            }
        }
        else {
            tempLines.push([vertices.length - 2, 2 + vertices.length - 2], [1 + vertices.length - 2, 3 + vertices.length - 2], [2 + vertices.length - 2, 3 + vertices.length - 2], [2 + vertices.length - 2, 0], [3 + vertices.length - 2, 1]);
            if (upward) {
                vertices.push(vertices[vertices.length - 2].added(vertitalFrontDir.multiplied(-stepHeight)), vertices[vertices.length - 1].added(vertitalFrontDir.multiplied(-stepHeight)));
            }
            else {
                vertices.push(vertices[0].added(vertitalFrontDir.multiplied(stepHeight)), vertices[1].added(vertitalFrontDir.multiplied(stepHeight)));
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
        const { start: prevStart, end: prevEnd, param: prevParam, moldShape: prevMoldShape } = preStairSegment;
        const prevHeight = prevEnd.z;
        const prevDirNormalized = prevEnd.subtracted(prevStart);
        const prevLeftDir = DirectionZ.cross(prevDirNormalized).normalized();
        const angle = curDir.angleTo(prevDirNormalized, DirectionZ);
        const frontLength = curDir.dot(prevDirNormalized);
        const curEndLeftCorner = end.added(curLeftDir.multiplied(tempWidth / 2));
        const dir1 = curEndLeftCorner.subtracted(segment.start);
        const angle1 = dir1.angle(curDir);
        if (AngleTolerance < angle && angle < (Math.PI / 2 - angle1)) {
            const leftConnectPoint = tempWidth > prevParam.endWidth ? prevMoldShape.vertices[prevMoldShape.vertices.length - 2] :
                start.added(prevLeftDir.multiplied(tempWidth / 2 * Math.cos(angle)));
            moldShape.vertices = [
                start.added(curLeftDir.multiplied(tempWidth / 2)),
                leftConnectPoint,
                start.added(prevLeftDir.multiplied(-tempWidth / 2 / Math.cos(angle))),
                end.added(curLeftDir.multiplied(tempWidth / 2)),
                end.added(curLeftDir.multiplied(-tempWidth / 2)),
            ];
            moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]];
            stairShape.vertices = [...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevHeight))),
                ...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevHeight - platformThickness))),
            ];
            stairShape.tempLines = [
                ...moldShape.tempLines,
                ...moldShape.tempLines.map(seg => [seg[0] + 5, seg[1] + 5]),
                [0, 5], [1, 6], [2, 7], [3, 8], [4, 9],
            ];
        }
        else if (angle <= AngleTolerance || angle >= (Math.PI - AngleTolerance)) {
            segment.end = segment.start.added(prevDirNormalized.multiplied(frontLength));
            moldShape.vertices = [
                start.added(prevLeftDir.multiplied(tempWidth / 2)),
                start.added(prevLeftDir.multiplied(-tempWidth / 2)),
                segment.end.added(prevLeftDir.multiplied(tempWidth / 2)),
                segment.end.added(prevLeftDir.multiplied(-tempWidth / 2)),
            ];
            moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 0]];
            stairShape.vertices = [...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevHeight))),
                ...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevHeight - platformThickness))),
            ];
            stairShape.tempLines = [
                ...moldShape.tempLines,
                ...moldShape.tempLines.map(seg => [seg[0] + 4, seg[1] + 4]),
                [0, 4], [1, 5], [2, 6], [3, 7], [4, 8],
            ];
        }
        else if (angle > (Math.PI * 3 / 2 + angle1)) {
            const rightConnectPoint = tempWidth > prevParam.endWidth ? prevMoldShape.vertices[prevMoldShape.vertices.length - 1] :
                start.added(prevLeftDir.multiplied(-tempWidth / 2 * Math.cos(angle)));
            moldShape.vertices = [
                start.added(prevLeftDir.multiplied(-tempWidth / 2 / Math.cos(angle))),
                rightConnectPoint,
                start.added(curLeftDir.multiplied(-tempWidth / 2)),
                end.added(curLeftDir.multiplied(tempWidth / 2)),
                end.added(curLeftDir.multiplied(-tempWidth / 2)),
            ];
            moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]];
            stairShape.vertices = [...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevHeight))),
                ...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevHeight - platformThickness))),
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
            componentParam.startWidth = validLeftLength + tempWidth / 2;
            componentParam.endWidth = validLeftLength + tempWidth / 2;
            moldShape.vertices = [
                start.added(prevLeftDir.multiplied(validLeftLength)),
                start.added(prevLeftDir.multiplied(-tempWidth / 2)),
                segment.end.added(prevLeftDir.multiplied(validLeftLength)),
                segment.end.added(prevLeftDir.multiplied(-tempWidth / 2)),
            ];
            moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 0]];
            stairShape.vertices = [...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevHeight))),
                ...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevHeight - platformThickness))),
            ];
            stairShape.tempLines = [
                ...moldShape.tempLines,
                ...moldShape.tempLines.map(seg => [seg[0] + 4, seg[1] + 4]),
                [0, 4], [1, 5], [2, 6], [3, 7], [4, 8],
            ];
        }
        else {
            const rightLength = curDir.dot(prevLeftDir);
            const validFrontLength = Math.max(tempWidth, frontLength);
            segment.end = segment.start.added(prevDirNormalized.multiplied(validFrontLength));
            const validRightLength = Math.max(tempWidth / 2, rightLength);
            componentParam.startWidth = validRightLength + tempWidth / 2;
            componentParam.endWidth = validRightLength + tempWidth / 2;
            moldShape.vertices = [
                start.added(prevLeftDir.multiplied(tempWidth / 2)),
                start.added(prevLeftDir.multiplied(-validRightLength)),
                segment.end.added(prevLeftDir.multiplied(tempWidth / 2)),
                segment.end.added(prevLeftDir.multiplied(-validRightLength)),
            ];
            moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 0]];
            stairShape.vertices = [...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevHeight))),
                ...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevHeight - platformThickness))),
            ];
            stairShape.tempLines = [
                ...moldShape.tempLines,
                ...moldShape.tempLines.map(seg => [seg[0] + 4, seg[1] + 4]),
                [0, 4], [1, 5], [2, 6], [3, 7], [4, 8],
            ];
        }
        // }
    }
    else {
        moldShape.vertices = [
            start.added(curLeftDir.multiplied(tempWidth / 2)),
            start.added(curLeftDir.multiplied(-tempWidth / 2)),
            segment.end.added(curLeftDir.multiplied(tempWidth / 2)),
            segment.end.added(curLeftDir.multiplied(-tempWidth / 2)),
        ];
        moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 0]];
        stairShape.vertices = [...moldShape.vertices,
            ...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(-platformThickness))),
        ];
        stairShape.tempLines = [
            ...moldShape.tempLines,
            ...moldShape.tempLines.map(seg => [seg[0] + 4, seg[1] + 4]),
            [0, 4], [1, 5], [2, 6], [3, 7], [4, 8],
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
pluginUI.resize(240, 300);
pluginUI.mount();
let activatedCustomTool;
function onUIMessage(data) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if ((_a = data.type) === null || _a === void 0 ? void 0 : _a.startsWith('activate')) {
                if (activatedCustomTool) {
                    app.deactivateCustomTool(activatedCustomTool, true);
                }
            }
            if (data.type === 'activateDrawStairsTool') {
                app.activateCustomTool(_drawStairsTool__WEBPACK_IMPORTED_MODULE_0__.alignTool, true);
                activatedCustomTool = _drawStairsTool__WEBPACK_IMPORTED_MODULE_0__.alignTool;
            }
            else if (data.type === 'deActivateDrawStairsTool') {
                app.deactivateCustomTool(_drawStairsTool__WEBPACK_IMPORTED_MODULE_0__.alignTool, false);
                activatedCustomTool = undefined;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUErRDtBQUNmO0FBQ3pDO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsOENBQThDLEVBQUUseURBQXFCO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiw2QkFBNkI7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixxREFBcUQ7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQSxvQkFBb0IsNkRBQXFCO0FBQ3pDLDRCQUE0QixjQUFjLG9EQUFvRCxlQUFlLHFEQUFxRDtBQUNsSztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0ZBQW9GLFNBQVMsc0JBQXNCO0FBQ25IO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRCxFQUFFLHlEQUFxQjtBQUNqRjtBQUNBO0FBQ0EsOEJBQThCLGlEQUFhO0FBQzNDO0FBQ0E7QUFDQSwwREFBMEQsaURBQWE7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsaURBQWE7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxFQUFFLHlEQUFxQjtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNQO0FBQ0E7QUFDQTtBQUNBLENBQUMsOEJBQThCO0FBQ3hCO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLG1CQUFtQixrQkFBa0I7QUFDckQ7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxzQ0FBc0M7QUFDaEM7QUFDUDtBQUNBO0FBQ087QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRTRDO0FBQzVDO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDTztBQUNQLFlBQVksT0FBTztBQUNuQixpQkFBaUIsaURBQWE7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLHNDQUFzQztBQUNsRCxZQUFZLG1FQUFtRTtBQUMvRTtBQUNBO0FBQ0EsWUFBWSxzQkFBc0I7QUFDbEMsaUJBQWlCLDZDQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLG1CQUFtQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSwrQkFBK0I7QUFDM0MsWUFBWSxvQ0FBb0M7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDZFQUE2RTtBQUM3RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNqUkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05BLGlCQUFpQixTQUFJLElBQUksU0FBSTtBQUM3Qiw0QkFBNEIsK0RBQStELGlCQUFpQjtBQUM1RztBQUNBLG9DQUFvQyxNQUFNLCtCQUErQixZQUFZO0FBQ3JGLG1DQUFtQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3hGLGdDQUFnQztBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUM2QztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLHNEQUFTO0FBQ2hELHNDQUFzQyxzREFBUztBQUMvQztBQUNBO0FBQ0EseUNBQXlDLHNEQUFTO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kcmF3LXN0YWlycy8uL3NyYy9tYWluL2RyYXdTdGFpcnNUb29sLnRzIiwid2VicGFjazovL2RyYXctc3RhaXJzLy4vc3JjL21haW4vdHlwZXMudHMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvLi9zcmMvbWFpbi91dGlscy50cyIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2RyYXctc3RhaXJzLy4vc3JjL21haW4vbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnRUeXBlLCBEZWZhdWx0Q29tcG9uZW50UGFyYW0gfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgY29tcHV0ZUNvbXBvbmVudFNoYXBlIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmV4cG9ydCBjbGFzcyBEcmF3U3RhaXJzVG9vbCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8vIHByaXZhdGUgc3RhaXJQYXJhbTogU3RhaXJQYXJhbSA9IERlZmF1bHRTdGFpclBhcmFtO1xuICAgICAgICAvLyBwcml2YXRlIHBsYXRmb3JtUGFyYW06IFBsYXRmb3JtUGFyYW0gPSBEZWZhdWx0UGxhdGZvcm1QYXJhbTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRQYXJhbSA9IE9iamVjdC5hc3NpZ24oe30sIERlZmF1bHRDb21wb25lbnRQYXJhbSk7XG4gICAgICAgIHRoaXMuc2VnbWVudHMgPSBbXTtcbiAgICB9XG4gICAgb25Ub29sQWN0aXZlKCkge1xuICAgICAgICBjb25zdCB0b29sSGVscGVyID0gYXBwLmdldFRvb2xIZWxwZXIoKTtcbiAgICAgICAgdG9vbEhlbHBlci5zZXRFeGNsdWRlSW5mZXJlbmNlVHlwZXMoW1xuICAgICAgICAgICAgS0VudGl0eVR5cGUuRmFjZSwgS0VudGl0eVR5cGUuRWRnZSwgS0VudGl0eVR5cGUuQXV4aWxpYXJ5Qm91bmRlZEN1cnZlLCBLRW50aXR5VHlwZS5BdXhpbGlhcnlMaW5lLCBLRW50aXR5VHlwZS5BdXhpbGlhcnlWZXJ0ZXgsXG4gICAgICAgICAgICBLRW50aXR5VHlwZS5Hcm91cEluc3RhbmNlLCBLRW50aXR5VHlwZS5WZXJ0ZXgsIEtBcmNoRmFjZVR5cGUuTm9uUGxhbmFyLCBLQXJjaEZhY2VUeXBlLlBsYW5hcixcbiAgICAgICAgXSk7XG4gICAgfVxuICAgIG9uVG9vbERlYWN0aXZlKCkge1xuICAgICAgICBjb25zdCBwbHVnaW5VSSA9IGFwcC5nZXRQbHVnaW5VSSgpO1xuICAgICAgICB0aGlzLnRyeUNvbW1pdCgpO1xuICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6ICdsZWF2ZURyYXdTdGFpcnNUb29sJyB9LCAnKicpO1xuICAgICAgICBjb25zdCB0b29sSGVscGVyID0gYXBwLmdldFRvb2xIZWxwZXIoKTtcbiAgICAgICAgdG9vbEhlbHBlci5zZXRFeGNsdWRlSW5mZXJlbmNlVHlwZXMoW10pO1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgfVxuICAgIG9uTW91c2VNb3ZlKGV2ZW50LCBpbmZlcmVuY2VSZXN1bHQpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBhcHBWaWV3ID0gYXBwLmdldEFjdGl2ZVZpZXcoKTtcbiAgICAgICAgaWYgKGluZmVyZW5jZVJlc3VsdCkge1xuICAgICAgICAgICAgLy8gY29uc3QgeyBzdGFydFdpZHRoLCBlbmRXaWR0aCwgdGVtcFdpZHRoLCBwbGF0Zm9ybVRoaWNrbmVzcyB9ID0gdGhpcy5jb21wb25lbnRQYXJhbTtcbiAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uID0gaW5mZXJlbmNlUmVzdWx0LnBvc2l0aW9uO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VnbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdFN0YWlyU2VnbWVudCA9IHRoaXMuc2VnbWVudHNbdGhpcy5zZWdtZW50cy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICBpZiAobGFzdFN0YWlyU2VnbWVudC5zdGFydExvY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICBsYXN0U3RhaXJTZWdtZW50LmVuZCA9IHBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiAobGFzdFN0YWlyU2VnbWVudC50eXBlID09PSBDb21wb25lbnRUeXBlLlN0YWlyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAvLyB0byBjb21wdXRlIHBvaW50c1xuICAgICAgICAgICAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgIGNvbXB1dGVDb21wb25lbnRTaGFwZShsYXN0U3RhaXJTZWdtZW50LCB0aGlzLmNvbXBvbmVudFBhcmFtLCB0aGlzLnNlZ21lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBzdGFpclNoYXBlOiB7IHZlcnRpY2VzOiBzdGFpclZlcnRpY2VzLCB0ZW1wTGluZXM6IHN0YWlyVGVtcExpbmVzIH0sIG1vbGRTaGFwZTogeyB2ZXJ0aWNlczogbW9sZFZlcnRpY2VzLCB0ZW1wTGluZXM6IG1vbGRUZW1wTGluZXMgfSB9ID0gbGFzdFN0YWlyU2VnbWVudDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGVtcExpbmVQb2ludHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBzdGFpclRlbXBMaW5lIG9mIHN0YWlyVGVtcExpbmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZVBvaW50cy5wdXNoKFtzdGFpclZlcnRpY2VzW3N0YWlyVGVtcExpbmVbMF1dLCBzdGFpclZlcnRpY2VzW3N0YWlyVGVtcExpbmVbMV1dXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBtb2xkVGVtcExpbmUgb2YgbW9sZFRlbXBMaW5lcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVQb2ludHMucHVzaChbbW9sZFZlcnRpY2VzW21vbGRUZW1wTGluZVswXV0sIG1vbGRWZXJ0aWNlc1ttb2xkVGVtcExpbmVbMV1dXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKChfYSA9IGxhc3RTdGFpclNlZ21lbnQudGVtcFNoYXBlSWQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcFZpZXcuY2xlYXJUZW1wb3JhcnlTaGFwZXNCeUlkcyhsYXN0U3RhaXJTZWdtZW50LnRlbXBTaGFwZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGVtcExpbmVQb2ludHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZW1wU2hhcGVJZCA9IGFwcFZpZXcuZHJhd1BvbHlsaW5lcyh0ZW1wTGluZVBvaW50cywgeyBjb2xvcjogeyByOiAyNTUsIGc6IDAsIGI6IDAgfSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZW1wU2hhcGVJZCA9PT0gbnVsbCB8fCB0ZW1wU2hhcGVJZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogdGVtcFNoYXBlSWQuaWRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFN0YWlyU2VnbWVudC50ZW1wU2hhcGVJZCA9IHRlbXBTaGFwZUlkID09PSBudWxsIHx8IHRlbXBTaGFwZUlkID09PSB2b2lkIDAgPyB2b2lkIDAgOiB0ZW1wU2hhcGVJZC5pZHM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25MQnV0dG9uVXAoZXZlbnQsIGluZmVyZW5jZVJlc3VsdCkge1xuICAgICAgICBpZiAoaW5mZXJlbmNlUmVzdWx0KSB7XG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IGluZmVyZW5jZVJlc3VsdC5wb3NpdGlvbjtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RTZWdtZW50ID0gdGhpcy5zZWdtZW50c1t0aGlzLnNlZ21lbnRzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgIGlmICghbGFzdFNlZ21lbnQuc3RhcnRMb2NrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuc3RhcnRMb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnRQYXJhbSA9IE9iamVjdC5hc3NpZ24oe30sIERlZmF1bHRDb21wb25lbnRQYXJhbSk7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LmVuZExvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRTZWdtZW50ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogQ29tcG9uZW50VHlwZS5TdGFpcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBsYXN0U2VnbWVudC5lbmQsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IGxhc3RTZWdtZW50LmVuZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0TG9ja2VkOiBsYXN0U2VnbWVudC50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtID8gZmFsc2UgOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kTG9ja2VkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0SGVpZ2h0OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJTaGFwZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlcnRpY2VzOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZXM6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbGRTaGFwZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlcnRpY2VzOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZXM6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtOiB0aGlzLmNvbXBvbmVudFBhcmFtLFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlZ21lbnRzLnB1c2gobmV4dFNlZ21lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0U2VnbWVudCA9IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogQ29tcG9uZW50VHlwZS5TdGFpcixcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IHBvc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICBlbmQ6IHBvc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICBzdGFydExvY2tlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZW5kTG9ja2VkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRIZWlnaHQ6IDAsXG4gICAgICAgICAgICAgICAgICAgIHN0YWlyU2hhcGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlcnRpY2VzOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lczogW10sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1vbGRTaGFwZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmVydGljZXM6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVzOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW06IHRoaXMuY29tcG9uZW50UGFyYW0sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlZ21lbnRzLnB1c2goZmlyc3RTZWdtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICB0cnlDb21taXQoKSB7XG4gICAgfVxuICAgIGNsZWFyKCkge1xuICAgICAgICBjb25zdCBhcHBWaWV3ID0gYXBwLmdldEFjdGl2ZVZpZXcoKTtcbiAgICAgICAgYXBwVmlldy5jbGVhclRlbXBvcmFyeVNoYXBlcygpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudFBhcmFtID0gT2JqZWN0LmFzc2lnbih7fSwgRGVmYXVsdENvbXBvbmVudFBhcmFtKTtcbiAgICAgICAgdGhpcy5zZWdtZW50cyA9IFtdO1xuICAgIH1cbiAgICBvblJCdXR0b25VcChldmVudCwgaW5mZXJlbmNlUmVzdWx0KSB7XG4gICAgICAgIGFwcC5kZWFjdGl2YXRlQ3VzdG9tVG9vbCh0aGlzKTtcbiAgICB9XG4gICAgb25MQnV0dG9uRGJDbGljayhldmVudCwgaW5mZXJlbmNlUmVzdWx0KSB7XG4gICAgICAgIDtcbiAgICB9XG4gICAgYWxsb3dVc2luZ0luZmVyZW5jZSgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIG9uS2V5RG93bihldmVudCkge1xuICAgICAgICA7XG4gICAgfVxuICAgIG9uS2V5VXAoZXZlbnQpIHtcbiAgICAgICAgO1xuICAgIH1cbn1cbmV4cG9ydCBjb25zdCBhbGlnblRvb2wgPSBuZXcgRHJhd1N0YWlyc1Rvb2woKTtcbiIsImV4cG9ydCBjb25zdCBDb21wb25lbnRQcm9wZXJ0eUtleSA9ICdQQUNvbXBvbmVudCc7XG5leHBvcnQgY29uc3QgSW50ZXJ2YWxQcm9wZXJ0eUtleSA9ICdQQUludGVydmFsJztcbmV4cG9ydCBjb25zdCBDb3VudFByb3BlcnR5S2V5ID0gJ1BBQ291bnQnO1xuZXhwb3J0IGNvbnN0IFBhdGhBeGlzUHJvcGVydHlLZXkgPSAnUEFQYXRoQXhpcyc7XG5leHBvcnQgY29uc3QgTm9ybWFsQXhpc1Byb3BlcnR5S2V5ID0gJ1BBTm9ybWFsQXhpcyc7XG5leHBvcnQgY29uc3QgU2NhbGVQcm9wZXJ0eUtleSA9ICdQQVNjYWxlJztcbmV4cG9ydCBjb25zdCBQYXRoTGlzdFByb3BlcnR5S2V5ID0gJ1BBUGF0aExpc3QnO1xuZXhwb3J0IGNvbnN0IFBhdGhSZXZlcnNlZERlbGltaXRlciA9ICctJztcbmV4cG9ydCBjb25zdCBQYXRoRGVsaW1pdGVyID0gJyYnO1xuZXhwb3J0IGNvbnN0IE1hbnVhbFByZWZpeCA9ICdtJztcbmV4cG9ydCB2YXIgU3RhaXJUeXBlO1xuKGZ1bmN0aW9uIChTdGFpclR5cGUpIHtcbiAgICBTdGFpclR5cGVbU3RhaXJUeXBlW1wiU3RyYWlnaHRcIl0gPSAwXSA9IFwiU3RyYWlnaHRcIjtcbiAgICBTdGFpclR5cGVbU3RhaXJUeXBlW1wiQ2lyY3VsYXJcIl0gPSAxXSA9IFwiQ2lyY3VsYXJcIjtcbn0pKFN0YWlyVHlwZSB8fCAoU3RhaXJUeXBlID0ge30pKTtcbmV4cG9ydCBjb25zdCBEZWZhdWx0Q29tcG9uZW50UGFyYW0gPSB7XG4gICAgc3RhcnRXaWR0aDogMTAwMCxcbiAgICBlbmRXaWR0aDogMTAwMCxcbiAgICB0ZW1wV2lkdGg6IDEwMDAsXG4gICAgcGxhdGZvcm1UaGlja25lc3M6IDUwLFxuICAgIHR5cGU6IFN0YWlyVHlwZS5TdHJhaWdodCxcbiAgICBob3Jpem9udGFsU3RlcDogNTAwLFxuICAgIHZlcnRpY2FsU3RlcDogMTAwLFxuICAgIHVwd2FyZDogdHJ1ZSxcbiAgICAvLyBzdGVwVHlwZTogU3RlcFR5cGUuTm9ybWFsLFxuICAgIC8vIGNvcm5lclR5cGU6IENvcm5lclR5cGUuUmVjdGFuZ2xlLFxufTtcbmV4cG9ydCBjb25zdCBEZWZhdWx0UGxhdGZvcm1QYXJhbSA9IHtcbiAgICBzdGFydFdpZHRoOiAxMDAwLFxuICAgIGVuZFdpZHRoOiAxMDAwLFxuICAgIC8vIGxlbmd0aDogMTAwMCxcbn07XG4vLyBleHBvcnQgaW50ZXJmYWNlIFBhcnRTaGFwZSB7XG4vLyAgICAgLy8g5q+P56eNc3RlcFR5cGXkuI3lkIznmoR2ZXJ0aWNlc+aOkuWIl1xuLy8gICAgIG1haW46IFNoYXBlLFxuLy8gICAgIC8vIHN0YWly5ZKMY29ybmVy6YOo5YiGdmVydGljZXPmjpLliJfkuI3lkIxcbi8vICAgICBzaWRlQm9hcmQ6IFNoYXBlLFxuLy8gICAgIGhhbmRyYWlsOiB7XG4vLyAgICAgICAgIHJhaWxzOiB7XG4vLyAgICAgICAgICAgICBzZWdtZW50OiBudW1iZXI7XG4vLyAgICAgICAgICAgICAvLyDlhoXlpJbkuKTmnaFcbi8vICAgICAgICAgICAgIGN5bGluZGVyczogU2hhcGVbXSxcbi8vICAgICAgICAgfSxcbi8vICAgICAgICAgcGlsbGFyczoge1xuLy8gICAgICAgICAgICAgc2VnbWVudDogbnVtYmVyLFxuLy8gICAgICAgICAgICAgLy8g5b6I5aSa5p2hXG4vLyAgICAgICAgICAgICBjeWxpbmRlcnM6IFNoYXBlW10sXG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vLyB9XG4vLyBleHBvcnQgaW50ZXJmYWNlIFN0YWlyU2hhcGUge1xuLy8gICAgIHN0YWlyOiB7IHN0ZXBDb3VudDogbnVtYmVyOyBzaGFwZTogUGFydFNoYXBlIH0sXG4vLyAgICAgY29ybmVyOiBQYXJ0U2hhcGUsXG4vLyB9XG5leHBvcnQgdmFyIENvbXBvbmVudFR5cGU7XG4oZnVuY3Rpb24gKENvbXBvbmVudFR5cGUpIHtcbiAgICBDb21wb25lbnRUeXBlW0NvbXBvbmVudFR5cGVbXCJTdGFpclwiXSA9IDBdID0gXCJTdGFpclwiO1xuICAgIENvbXBvbmVudFR5cGVbQ29tcG9uZW50VHlwZVtcIlBsYXRmb3JtXCJdID0gMV0gPSBcIlBsYXRmb3JtXCI7XG59KShDb21wb25lbnRUeXBlIHx8IChDb21wb25lbnRUeXBlID0ge30pKTtcbmV4cG9ydCBmdW5jdGlvbiBpc0F4aXNWYWxpZChheGlzKSB7XG4gICAgcmV0dXJuIGF4aXMgPT09IFwiWFwiIC8qIEF4aXMuWCAqLyB8fCBheGlzID09PSBcIi1YXCIgLyogQXhpcy5YTWludXMgKi8gfHwgYXhpcyA9PT0gXCJZXCIgLyogQXhpcy5ZICovIHx8IGF4aXMgPT09IFwiLVlcIiAvKiBBeGlzLllNaW51cyAqLyB8fCBheGlzID09PSBcIlpcIiAvKiBBeGlzLlogKi8gfHwgYXhpcyA9PT0gXCItWlwiIC8qIEF4aXMuWk1pbnVzICovO1xufVxuZXhwb3J0IGNvbnN0IGR1bW15TWF0cml4NCA9IEdlb21MaWIuY3JlYXRlSWRlbnRpdHlNYXRyaXg0KCk7XG5leHBvcnQgY29uc3QgZHVtbXlWZWN0b3IzZCA9IEdlb21MaWIuY3JlYXRlVmVjdG9yM2QoMCwgMCwgMSk7XG5leHBvcnQgY29uc3QgZHVtbXlQb2ludDNkID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKDAsIDAsIDApO1xuIiwiaW1wb3J0IHsgQ29tcG9uZW50VHlwZSwgU3RhaXJUeXBlIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmV4cG9ydCBmdW5jdGlvbiBpc0tBcmNoRmFjZShlbnRpdHkpIHtcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgKGVudGl0eS5nZXRUeXBlKCkgPT09IEtBcmNoRmFjZVR5cGUuTm9uUGxhbmFyIHx8IGVudGl0eS5nZXRUeXBlKCkgPT09IEtBcmNoRmFjZVR5cGUuUGxhbmFyKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0tHcm91cEluc3RhbmNlKGVudGl0eSkge1xuICAgIHJldHVybiAhIWVudGl0eSAmJiBlbnRpdHkuZ2V0VHlwZSgpID09PSBLRW50aXR5VHlwZS5Hcm91cEluc3RhbmNlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzS0ZhY2UoZW50aXR5KSB7XG4gICAgcmV0dXJuICEhZW50aXR5ICYmIGVudGl0eS5nZXRUeXBlKCkgPT09IEtFbnRpdHlUeXBlLkZhY2U7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNLRWRnZShlbnRpdHkpIHtcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS0VudGl0eVR5cGUuRWRnZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0tWZXJ0ZXgoZW50aXR5KSB7XG4gICAgcmV0dXJuICEhZW50aXR5ICYmIGVudGl0eS5nZXRUeXBlKCkgPT09IEtFbnRpdHlUeXBlLlZlcnRleDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0tBdXhpbGlhcnlCb3VuZGVkQ3VydmUoZW50aXR5KSB7XG4gICAgcmV0dXJuICEhZW50aXR5ICYmIGVudGl0eS5nZXRUeXBlKCkgPT09IEtFbnRpdHlUeXBlLkF1eGlsaWFyeUJvdW5kZWRDdXJ2ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0tBdXhpbGlhcnlMaW5lKGVudGl0eSkge1xuICAgIHJldHVybiAhIWVudGl0eSAmJiBlbnRpdHkuZ2V0VHlwZSgpID09PSBLRW50aXR5VHlwZS5BdXhpbGlhcnlMaW5lO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzS1BsYW5lKGVudGl0eSkge1xuICAgIHJldHVybiAhIWVudGl0eSAmJiBlbnRpdHkuZ2V0VHlwZSgpID09PSBLU3VyZmFjZVR5cGUuUGxhbmU7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNLTGluZVNlZ21lbnQzZChlbnRpdHkpIHtcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgISFlbnRpdHkuZGlyZWN0aW9uO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzS0FyYzNkKGVudGl0eSkge1xuICAgIHJldHVybiAhIWVudGl0eSAmJiAhIWVudGl0eS5jaXJjbGU7XG59XG4vLyBjb25zdCBIZWlnaHRUb2xlcmFuY2U6IG51bWJlciA9IDU7XG5jb25zdCBMZW5ndGhUb2xlcmFuY2UgPSAxO1xuY29uc3QgQW5nbGVUb2xlcmFuY2UgPSBNYXRoLlBJIC8gMTg7XG5leHBvcnQgY29uc3QgRGlyZWN0aW9uWiA9IEdlb21MaWIuY3JlYXRlVmVjdG9yM2QoMCwgMCwgMSk7XG4vLyBjb25zdCBEZWZhdWx0Qm9hcmRUaGlja25lc3MgPSA1MDtcbmV4cG9ydCBmdW5jdGlvbiBjb21wdXRlQ29tcG9uZW50U2hhcGUoc2VnbWVudCwgY29tcG9uZW50UGFyYW0sIHNlZ21lbnRzKSB7XG4gICAgY29uc3QgeyB0eXBlIH0gPSBzZWdtZW50O1xuICAgIGlmICh0eXBlID09PSBDb21wb25lbnRUeXBlLlN0YWlyKSB7XG4gICAgICAgIGNvbXB1dGVTdGFpclNoYXBlKHNlZ21lbnQsIGNvbXBvbmVudFBhcmFtKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbXB1dGVQbGF0Zm9ybVNoYXBlKHNlZ21lbnQsIGNvbXBvbmVudFBhcmFtLCBzZWdtZW50cyk7XG4gICAgfVxufVxuZnVuY3Rpb24gY29tcHV0ZVN0YWlyU2hhcGUoc2VnbWVudCwgY29tcG9uZW50UGFyYW0pIHtcbiAgICBjb25zdCB7IHN0YXJ0LCBlbmQsIHN0YWlyU2hhcGUsIHN0YXJ0SGVpZ2h0IH0gPSBzZWdtZW50O1xuICAgIGNvbnN0IHsgc3RhcnRXaWR0aCwgZW5kV2lkdGgsIHR5cGUsIGhvcml6b250YWxTdGVwLCB2ZXJ0aWNhbFN0ZXAsIHVwd2FyZCB9ID0gY29tcG9uZW50UGFyYW07XG4gICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFtdO1xuICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW107XG4gICAgY29uc3QgeyB2ZXJ0aWNlcywgdGVtcExpbmVzIH0gPSBzdGFpclNoYXBlO1xuICAgIGlmICh0eXBlID09PSBTdGFpclR5cGUuU3RyYWlnaHQpIHtcbiAgICAgICAgY29uc3QgaG9yaXpvbnRhbEZyb250RGlyID0gZW5kLnN1YnRyYWN0ZWQoc3RhcnQpLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgY29uc3QgdmVydGl0YWxGcm9udERpciA9IERpcmVjdGlvblo7XG4gICAgICAgIGNvbnN0IGhvcml6b250YWxMZWZ0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhob3Jpem9udGFsRnJvbnREaXIpO1xuICAgICAgICBjb25zdCBob3Jpem9udGFsRGlzdGFuY2UgPSBzdGFydC5kaXN0YW5jZVRvKGVuZCk7XG4gICAgICAgIGNvbnN0IHN0ZXBGbG9hdENvdW50ID0gaG9yaXpvbnRhbERpc3RhbmNlIC8gaG9yaXpvbnRhbFN0ZXA7XG4gICAgICAgIGNvbnN0IHN0ZXBDb3VudCA9IE1hdGguY2VpbChzdGVwRmxvYXRDb3VudCk7XG4gICAgICAgIGlmIChzdGVwQ291bnQgPCAxKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBsYXN0U3RlcExlbmd0aCA9IGhvcml6b250YWxEaXN0YW5jZSAtIChzdGVwQ291bnQgLSAxKSAqIGhvcml6b250YWxTdGVwO1xuICAgICAgICBjb25zdCBzdGVwSGVpZ2h0ID0gdXB3YXJkID8gdmVydGljYWxTdGVwIDogLXZlcnRpY2FsU3RlcDtcbiAgICAgICAgY29uc3QgbGVmdFB0ID0gc3RhcnQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkuYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpO1xuICAgICAgICBjb25zdCByaWdodFB0ID0gc3RhcnQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkuYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKTtcbiAgICAgICAgY29uc3Qgd2lkdGhEZWx0YSA9IChlbmRXaWR0aCAtIHN0YXJ0V2lkdGgpIC8gMiAvIChzdGVwRmxvYXRDb3VudCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RlcENvdW50IC0gMTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjdXJMZWZ0UHQgPSBsZWZ0UHQuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaSAqIGhvcml6b250YWxTdGVwKSkuYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZChpICogd2lkdGhEZWx0YSkpLmFkZGVkKHZlcnRpdGFsRnJvbnREaXIubXVsdGlwbGllZChpICogc3RlcEhlaWdodCkpO1xuICAgICAgICAgICAgY29uc3QgY3VyUmlnaHRQdCA9IHJpZ2h0UHQuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaSAqIGhvcml6b250YWxTdGVwKSkuYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZCgtaSAqIHdpZHRoRGVsdGEpKS5hZGRlZCh2ZXJ0aXRhbEZyb250RGlyLm11bHRpcGxpZWQoaSAqIHN0ZXBIZWlnaHQpKTtcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2goY3VyTGVmdFB0LCBjdXJSaWdodFB0KTtcbiAgICAgICAgICAgIGlmICh1cHdhcmQpIHtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKGN1ckxlZnRQdC5hZGRlZCh2ZXJ0aXRhbEZyb250RGlyLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLCBjdXJSaWdodFB0LmFkZGVkKHZlcnRpdGFsRnJvbnREaXIubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaChjdXJMZWZ0UHQuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaG9yaXpvbnRhbFN0ZXApKSwgY3VyUmlnaHRQdC5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFs0ICogaSwgMSArIDQgKiBpXSwgWzQgKiBpLCAyICsgNCAqIGldLCBbMSArIDQgKiBpLCAzICsgNCAqIGldLCBbMiArIDQgKiBpLCAzICsgNCAqIGldLCBbMiArIDQgKiBpLCA0ICsgNCAqIGldLCBbMyArIDQgKiBpLCA1ICsgNCAqIGldKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBpZiAobGFzdFN0ZXBMZW5ndGggPiBMZW5ndGhUb2xlcmFuY2UpIHtcbiAgICAgICAgY29uc3QgbGFzdExlZnRQb2ludCA9IHN0ZXBDb3VudCA+IDEgPyB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXSA6IGxlZnRQdDtcbiAgICAgICAgY29uc3QgbGFzdFJpZ2h0UG9pbnQgPSBzdGVwQ291bnQgPiAxID8gdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0gOiByaWdodFB0O1xuICAgICAgICBpZiAodXB3YXJkKSB7XG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKGxhc3RMZWZ0UG9pbnQuYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwICogd2lkdGhEZWx0YSkpLmFkZGVkKHZlcnRpdGFsRnJvbnREaXIubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksIGxhc3RSaWdodFBvaW50LmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoLWxhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXAgKiB3aWR0aERlbHRhKSkuYWRkZWQodmVydGl0YWxGcm9udERpci5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSk7XG4gICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbNCAqIChzdGVwQ291bnQgLSAxKSwgMSArIDQgKiAoc3RlcENvdW50IC0gMSldKTtcbiAgICAgICAgICAgIGlmIChsYXN0U3RlcExlbmd0aCA+IExlbmd0aFRvbGVyYW5jZSkge1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGgpKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGgpKSk7XG4gICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goXG4gICAgICAgICAgICAgICAgLy8gWzQgKiBzdGVwQ291bnQsIDEgKyA0ICogc3RlcENvdW50XSxcbiAgICAgICAgICAgICAgICBbNCAqIChzdGVwQ291bnQgLSAxKSwgMiArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMSArIDQgKiAoc3RlcENvdW50IC0gMSksIDMgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCAzICsgNCAqIChzdGVwQ291bnQgLSAxKV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGxhc3RTdGVwTGVuZ3RoID4gTGVuZ3RoVG9sZXJhbmNlKSB7XG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaChsYXN0TGVmdFBvaW50LmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcCAqIHdpZHRoRGVsdGEpKS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCkpLCBsYXN0UmlnaHRQb2ludC5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKC1sYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwICogd2lkdGhEZWx0YSkpLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoKSkpO1xuICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFs0ICogKHN0ZXBDb3VudCAtIDEpLCAxICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFs0ICogKHN0ZXBDb3VudCAtIDEpLCAyICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsxICsgNCAqIChzdGVwQ291bnQgLSAxKSwgMyArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMiArIDQgKiAoc3RlcENvdW50IC0gMSksIDMgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0ZW1wTGluZXMucG9wKCk7XG4gICAgICAgICAgICAgICAgdGVtcExpbmVzLnBvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICB0ZW1wTGluZXMucHVzaChcbiAgICAgICAgLy8gICAgICAgICBbNCAqIHN0ZXBDb3VudCwgMSArIDQgKiBzdGVwQ291bnRdLFxuICAgICAgICAvLyAgICAgKTtcbiAgICAgICAgLy8gfVxuICAgICAgICBpZiAoKHVwd2FyZCAmJiBzdGVwQ291bnQgPiAxKSB8fCAoIXVwd2FyZCAmJiBzdGVwQ291bnQgPiAyKSkge1xuICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIDIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMiArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDQgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCA1ICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFt2ZXJ0aWNlcy5sZW5ndGggKyAyLCAxICsgdmVydGljZXMubGVuZ3RoICsgMl0sIFt2ZXJ0aWNlcy5sZW5ndGggKyAyLCAwXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggKyAyLCAxXSk7XG4gICAgICAgICAgICBpZiAodXB3YXJkKSB7XG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZCh2ZXJ0aXRhbEZyb250RGlyLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQgLSAoMSAtIGxhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXApICogc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZCh2ZXJ0aXRhbEZyb250RGlyLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQgLSAoMSAtIGxhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXApICogc3RlcEhlaWdodCkpKTtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzWzBdLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSksIHZlcnRpY2VzWzFdLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZCgtbGFzdFN0ZXBMZW5ndGggLSBob3Jpem9udGFsU3RlcCkpLCB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZCgtbGFzdFN0ZXBMZW5ndGggLSBob3Jpem9udGFsU3RlcCkpKTtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzWzBdLmFkZGVkKHZlcnRpdGFsRnJvbnREaXIubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksIHZlcnRpY2VzWzFdLmFkZGVkKHZlcnRpdGFsRnJvbnREaXIubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIDIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMiArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDBdLCBbMyArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDFdKTtcbiAgICAgICAgICAgIGlmICh1cHdhcmQpIHtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKHZlcnRpdGFsRnJvbnREaXIubXVsdGlwbGllZCgtc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZCh2ZXJ0aXRhbEZyb250RGlyLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzWzBdLmFkZGVkKHZlcnRpdGFsRnJvbnREaXIubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksIHZlcnRpY2VzWzFdLmFkZGVkKHZlcnRpdGFsRnJvbnREaXIubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNvbXB1dGVQbGF0Zm9ybVNoYXBlKHNlZ21lbnQsIGNvbXBvbmVudFBhcmFtLCBzZWdtZW50cykge1xuICAgIGNvbnN0IHsgdGVtcFdpZHRoLCBwbGF0Zm9ybVRoaWNrbmVzcyB9ID0gY29tcG9uZW50UGFyYW07XG4gICAgY29uc3QgeyBzdGFydCwgZW5kLCBzdGFpclNoYXBlLCBtb2xkU2hhcGUgfSA9IHNlZ21lbnQ7XG4gICAgY29uc3QgY3VyRGlyID0gZW5kLnN1YnRyYWN0ZWQoc3RhcnQpO1xuICAgIGNvbnN0IGN1ckxlZnREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKGN1ckRpcikubm9ybWFsaXplZCgpO1xuICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbXTtcbiAgICBzdGFpclNoYXBlLnRlbXBMaW5lcyA9IFtdO1xuICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtdO1xuICAgIG1vbGRTaGFwZS50ZW1wTGluZXMgPSBbXTtcbiAgICBpZiAoc2VnbWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBjb25zdCBwcmVTdGFpclNlZ21lbnQgPSBzZWdtZW50c1tzZWdtZW50cy5sZW5ndGggLSAyXTtcbiAgICAgICAgLy8gaWYgKHByZVN0YWlyU2VnbWVudC50eXBlID09PSBDb21wb25lbnRUeXBlLlN0YWlyKSB7XG4gICAgICAgIGNvbnN0IHsgc3RhcnQ6IHByZXZTdGFydCwgZW5kOiBwcmV2RW5kLCBwYXJhbTogcHJldlBhcmFtLCBtb2xkU2hhcGU6IHByZXZNb2xkU2hhcGUgfSA9IHByZVN0YWlyU2VnbWVudDtcbiAgICAgICAgY29uc3QgcHJldkhlaWdodCA9IHByZXZFbmQuejtcbiAgICAgICAgY29uc3QgcHJldkRpck5vcm1hbGl6ZWQgPSBwcmV2RW5kLnN1YnRyYWN0ZWQocHJldlN0YXJ0KTtcbiAgICAgICAgY29uc3QgcHJldkxlZnREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKHByZXZEaXJOb3JtYWxpemVkKS5ub3JtYWxpemVkKCk7XG4gICAgICAgIGNvbnN0IGFuZ2xlID0gY3VyRGlyLmFuZ2xlVG8ocHJldkRpck5vcm1hbGl6ZWQsIERpcmVjdGlvblopO1xuICAgICAgICBjb25zdCBmcm9udExlbmd0aCA9IGN1ckRpci5kb3QocHJldkRpck5vcm1hbGl6ZWQpO1xuICAgICAgICBjb25zdCBjdXJFbmRMZWZ0Q29ybmVyID0gZW5kLmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZCh0ZW1wV2lkdGggLyAyKSk7XG4gICAgICAgIGNvbnN0IGRpcjEgPSBjdXJFbmRMZWZ0Q29ybmVyLnN1YnRyYWN0ZWQoc2VnbWVudC5zdGFydCk7XG4gICAgICAgIGNvbnN0IGFuZ2xlMSA9IGRpcjEuYW5nbGUoY3VyRGlyKTtcbiAgICAgICAgaWYgKEFuZ2xlVG9sZXJhbmNlIDwgYW5nbGUgJiYgYW5nbGUgPCAoTWF0aC5QSSAvIDIgLSBhbmdsZTEpKSB7XG4gICAgICAgICAgICBjb25zdCBsZWZ0Q29ubmVjdFBvaW50ID0gdGVtcFdpZHRoID4gcHJldlBhcmFtLmVuZFdpZHRoID8gcHJldk1vbGRTaGFwZS52ZXJ0aWNlc1twcmV2TW9sZFNoYXBlLnZlcnRpY2VzLmxlbmd0aCAtIDJdIDpcbiAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKHRlbXBXaWR0aCAvIDIgKiBNYXRoLmNvcyhhbmdsZSkpKTtcbiAgICAgICAgICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtcbiAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQodGVtcFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgICAgIGxlZnRDb25uZWN0UG9pbnQsXG4gICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtdGVtcFdpZHRoIC8gMiAvIE1hdGguY29zKGFuZ2xlKSkpLFxuICAgICAgICAgICAgICAgIGVuZC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQodGVtcFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgICAgIGVuZC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoLXRlbXBXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgM10sIFszLCA0XSwgWzQsIDBdXTtcbiAgICAgICAgICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHByZXZIZWlnaHQpKSksXG4gICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHByZXZIZWlnaHQgLSBwbGF0Zm9ybVRoaWNrbmVzcykpKSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBzdGFpclNoYXBlLnRlbXBMaW5lcyA9IFtcbiAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLFxuICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMubWFwKHNlZyA9PiBbc2VnWzBdICsgNSwgc2VnWzFdICsgNV0pLFxuICAgICAgICAgICAgICAgIFswLCA1XSwgWzEsIDZdLCBbMiwgN10sIFszLCA4XSwgWzQsIDldLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhbmdsZSA8PSBBbmdsZVRvbGVyYW5jZSB8fCBhbmdsZSA+PSAoTWF0aC5QSSAtIEFuZ2xlVG9sZXJhbmNlKSkge1xuICAgICAgICAgICAgc2VnbWVudC5lbmQgPSBzZWdtZW50LnN0YXJ0LmFkZGVkKHByZXZEaXJOb3JtYWxpemVkLm11bHRpcGxpZWQoZnJvbnRMZW5ndGgpKTtcbiAgICAgICAgICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtcbiAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKHRlbXBXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC10ZW1wV2lkdGggLyAyKSksXG4gICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCh0ZW1wV2lkdGggLyAyKSksXG4gICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtdGVtcFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIG1vbGRTaGFwZS50ZW1wTGluZXMgPSBbWzAsIDFdLCBbMSwgMl0sIFsyLCAzXSwgWzMsIDBdXTtcbiAgICAgICAgICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHByZXZIZWlnaHQpKSksXG4gICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHByZXZIZWlnaHQgLSBwbGF0Zm9ybVRoaWNrbmVzcykpKSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBzdGFpclNoYXBlLnRlbXBMaW5lcyA9IFtcbiAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLFxuICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMubWFwKHNlZyA9PiBbc2VnWzBdICsgNCwgc2VnWzFdICsgNF0pLFxuICAgICAgICAgICAgICAgIFswLCA0XSwgWzEsIDVdLCBbMiwgNl0sIFszLCA3XSwgWzQsIDhdLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhbmdsZSA+IChNYXRoLlBJICogMyAvIDIgKyBhbmdsZTEpKSB7XG4gICAgICAgICAgICBjb25zdCByaWdodENvbm5lY3RQb2ludCA9IHRlbXBXaWR0aCA+IHByZXZQYXJhbS5lbmRXaWR0aCA/IHByZXZNb2xkU2hhcGUudmVydGljZXNbcHJldk1vbGRTaGFwZS52ZXJ0aWNlcy5sZW5ndGggLSAxXSA6XG4gICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtdGVtcFdpZHRoIC8gMiAqIE1hdGguY29zKGFuZ2xlKSkpO1xuICAgICAgICAgICAgbW9sZFNoYXBlLnZlcnRpY2VzID0gW1xuICAgICAgICAgICAgICAgIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLXRlbXBXaWR0aCAvIDIgLyBNYXRoLmNvcyhhbmdsZSkpKSxcbiAgICAgICAgICAgICAgICByaWdodENvbm5lY3RQb2ludCxcbiAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoLXRlbXBXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICBlbmQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKHRlbXBXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICBlbmQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKC10ZW1wV2lkdGggLyAyKSksXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtbMCwgMV0sIFsxLCAyXSwgWzIsIDNdLCBbMywgNF0sIFs0LCAwXV07XG4gICAgICAgICAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gWy4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChwcmV2SGVpZ2h0KSkpLFxuICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChwcmV2SGVpZ2h0IC0gcGxhdGZvcm1UaGlja25lc3MpKSksXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXG4gICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcyxcbiAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLm1hcChzZWcgPT4gW3NlZ1swXSArIDUsIHNlZ1sxXSArIDVdKSxcbiAgICAgICAgICAgICAgICBbMCwgNV0sIFsxLCA2XSwgWzIsIDddLCBbMywgOF0sIFs0LCA5XSxcbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYW5nbGUgPj0gTWF0aC5QSSkge1xuICAgICAgICAgICAgY29uc3QgdmFsaWRGcm9udExlbmd0aCA9IE1hdGgubWF4KHRlbXBXaWR0aCwgZnJvbnRMZW5ndGgpO1xuICAgICAgICAgICAgc2VnbWVudC5lbmQgPSBzZWdtZW50LnN0YXJ0LmFkZGVkKHByZXZEaXJOb3JtYWxpemVkLm11bHRpcGxpZWQodmFsaWRGcm9udExlbmd0aCkpO1xuICAgICAgICAgICAgY29uc3QgbGVmdExlbmd0aCA9IGN1ckRpci5kb3QocHJldkxlZnREaXIpO1xuICAgICAgICAgICAgY29uc3QgdmFsaWRMZWZ0TGVuZ3RoID0gTWF0aC5tYXgodGVtcFdpZHRoIC8gMiwgbGVmdExlbmd0aCk7XG4gICAgICAgICAgICBjb21wb25lbnRQYXJhbS5zdGFydFdpZHRoID0gdmFsaWRMZWZ0TGVuZ3RoICsgdGVtcFdpZHRoIC8gMjtcbiAgICAgICAgICAgIGNvbXBvbmVudFBhcmFtLmVuZFdpZHRoID0gdmFsaWRMZWZ0TGVuZ3RoICsgdGVtcFdpZHRoIC8gMjtcbiAgICAgICAgICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtcbiAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKHZhbGlkTGVmdExlbmd0aCkpLFxuICAgICAgICAgICAgICAgIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLXRlbXBXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKHZhbGlkTGVmdExlbmd0aCkpLFxuICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLXRlbXBXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgM10sIFszLCAwXV07XG4gICAgICAgICAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gWy4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChwcmV2SGVpZ2h0KSkpLFxuICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChwcmV2SGVpZ2h0IC0gcGxhdGZvcm1UaGlja25lc3MpKSksXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXG4gICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcyxcbiAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLm1hcChzZWcgPT4gW3NlZ1swXSArIDQsIHNlZ1sxXSArIDRdKSxcbiAgICAgICAgICAgICAgICBbMCwgNF0sIFsxLCA1XSwgWzIsIDZdLCBbMywgN10sIFs0LCA4XSxcbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCByaWdodExlbmd0aCA9IGN1ckRpci5kb3QocHJldkxlZnREaXIpO1xuICAgICAgICAgICAgY29uc3QgdmFsaWRGcm9udExlbmd0aCA9IE1hdGgubWF4KHRlbXBXaWR0aCwgZnJvbnRMZW5ndGgpO1xuICAgICAgICAgICAgc2VnbWVudC5lbmQgPSBzZWdtZW50LnN0YXJ0LmFkZGVkKHByZXZEaXJOb3JtYWxpemVkLm11bHRpcGxpZWQodmFsaWRGcm9udExlbmd0aCkpO1xuICAgICAgICAgICAgY29uc3QgdmFsaWRSaWdodExlbmd0aCA9IE1hdGgubWF4KHRlbXBXaWR0aCAvIDIsIHJpZ2h0TGVuZ3RoKTtcbiAgICAgICAgICAgIGNvbXBvbmVudFBhcmFtLnN0YXJ0V2lkdGggPSB2YWxpZFJpZ2h0TGVuZ3RoICsgdGVtcFdpZHRoIC8gMjtcbiAgICAgICAgICAgIGNvbXBvbmVudFBhcmFtLmVuZFdpZHRoID0gdmFsaWRSaWdodExlbmd0aCArIHRlbXBXaWR0aCAvIDI7XG4gICAgICAgICAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXG4gICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCh0ZW1wV2lkdGggLyAyKSksXG4gICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtdmFsaWRSaWdodExlbmd0aCkpLFxuICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQodGVtcFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLXZhbGlkUmlnaHRMZW5ndGgpKSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgM10sIFszLCAwXV07XG4gICAgICAgICAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gWy4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChwcmV2SGVpZ2h0KSkpLFxuICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChwcmV2SGVpZ2h0IC0gcGxhdGZvcm1UaGlja25lc3MpKSksXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXG4gICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcyxcbiAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLm1hcChzZWcgPT4gW3NlZ1swXSArIDQsIHNlZ1sxXSArIDRdKSxcbiAgICAgICAgICAgICAgICBbMCwgNF0sIFsxLCA1XSwgWzIsIDZdLCBbMywgN10sIFs0LCA4XSxcbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICAgICAgLy8gfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbW9sZFNoYXBlLnZlcnRpY2VzID0gW1xuICAgICAgICAgICAgc3RhcnQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKHRlbXBXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgIHN0YXJ0LmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZCgtdGVtcFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKHRlbXBXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZCgtdGVtcFdpZHRoIC8gMikpLFxuICAgICAgICBdO1xuICAgICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgM10sIFszLCAwXV07XG4gICAgICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbLi4ubW9sZFNoYXBlLnZlcnRpY2VzLFxuICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1wbGF0Zm9ybVRoaWNrbmVzcykpKSxcbiAgICAgICAgXTtcbiAgICAgICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXG4gICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLFxuICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcy5tYXAoc2VnID0+IFtzZWdbMF0gKyA0LCBzZWdbMV0gKyA0XSksXG4gICAgICAgICAgICBbMCwgNF0sIFsxLCA1XSwgWzIsIDZdLCBbMywgN10sIFs0LCA4XSxcbiAgICAgICAgXTtcbiAgICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgYWxpZ25Ub29sIH0gZnJvbSBcIi4vZHJhd1N0YWlyc1Rvb2xcIjtcbmNvbnN0IHBsdWdpblVJID0gYXBwLmdldFBsdWdpblVJKCk7XG5wbHVnaW5VSS5yZXNpemUoMjQwLCAzMDApO1xucGx1Z2luVUkubW91bnQoKTtcbmxldCBhY3RpdmF0ZWRDdXN0b21Ub29sO1xuZnVuY3Rpb24gb25VSU1lc3NhZ2UoZGF0YSkge1xuICAgIHZhciBfYTtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKChfYSA9IGRhdGEudHlwZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnN0YXJ0c1dpdGgoJ2FjdGl2YXRlJykpIHtcbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZhdGVkQ3VzdG9tVG9vbCkge1xuICAgICAgICAgICAgICAgICAgICBhcHAuZGVhY3RpdmF0ZUN1c3RvbVRvb2woYWN0aXZhdGVkQ3VzdG9tVG9vbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEudHlwZSA9PT0gJ2FjdGl2YXRlRHJhd1N0YWlyc1Rvb2wnKSB7XG4gICAgICAgICAgICAgICAgYXBwLmFjdGl2YXRlQ3VzdG9tVG9vbChhbGlnblRvb2wsIHRydWUpO1xuICAgICAgICAgICAgICAgIGFjdGl2YXRlZEN1c3RvbVRvb2wgPSBhbGlnblRvb2w7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09ICdkZUFjdGl2YXRlRHJhd1N0YWlyc1Rvb2wnKSB7XG4gICAgICAgICAgICAgICAgYXBwLmRlYWN0aXZhdGVDdXN0b21Ub29sKGFsaWduVG9vbCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGFjdGl2YXRlZEN1c3RvbVRvb2wgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIGNsb3NlUGx1Z2luKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbnBsdWdpblVJLm9uTWVzc2FnZShvblVJTWVzc2FnZSk7XG5jb25zdCBzZWxlY3Rpb24gPSBhcHAuZ2V0U2VsZWN0aW9uKCk7XG5zZWxlY3Rpb24uYWRkT2JzZXJ2ZXIoe1xuICAgIG9uU2VsZWN0aW9uQ2hhbmdlOiAoKSA9PiB7XG4gICAgfVxufSk7XG4vLyBmdW5jdGlvbiBvblBsdWdpblN0YXJ0VXAoKSB7XG4vLyB9XG4vLyBvblBsdWdpblN0YXJ0VXAoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==