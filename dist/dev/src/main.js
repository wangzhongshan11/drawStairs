/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main/tools/DrawStairsTool/consts.ts":
/*!*************************************************!*\
  !*** ./src/main/tools/DrawStairsTool/consts.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AngleTolerance: () => (/* binding */ AngleTolerance),
/* harmony export */   DirectionZ: () => (/* binding */ DirectionZ),
/* harmony export */   FirstSegment: () => (/* binding */ FirstSegment),
/* harmony export */   LengthTolerance: () => (/* binding */ LengthTolerance),
/* harmony export */   dummyMatrix4: () => (/* binding */ dummyMatrix4),
/* harmony export */   dummyPoint3d: () => (/* binding */ dummyPoint3d),
/* harmony export */   dummyVector3d: () => (/* binding */ dummyVector3d)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/main/tools/DrawStairsTool/types.ts");

const dummyMatrix4 = GeomLib.createIdentityMatrix4();
const dummyVector3d = GeomLib.createVector3d(0, 0, 1);
const dummyPoint3d = GeomLib.createPoint3d(0, 0, 0);
const DirectionZ = GeomLib.createVector3d(0, 0, 1);
// const HeightTolerance: number = 5;
const LengthTolerance = 1;
const AngleTolerance = Math.PI / 36;
// const DefaultBoardThickness = 50;
const FirstSegment = {
    start: dummyPoint3d,
    end: dummyPoint3d,
    startLocked: true,
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
    param: _types__WEBPACK_IMPORTED_MODULE_0__.DefaultComponentParam,
};


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
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ "./src/main/tools/DrawStairsTool/consts.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./src/main/tools/DrawStairsTool/types.ts");
/* harmony import */ var _tempMeshUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tempMeshUtils */ "./src/main/tools/DrawStairsTool/tempMeshUtils.ts");
/* harmony import */ var _meshUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./meshUtils */ "./src/main/tools/DrawStairsTool/meshUtils.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ "./src/main/tools/DrawStairsTool/utils.ts");





const design = app.getActiveDesign();
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
        pluginUI.postMessage({ type: 'componentParamChanged', componentParam: Object.assign({}, this.componentParam) }, '*');
    }
    onToolDeactive() {
        pluginUI.postMessage({ type: 'leaveDrawStairsTool' }, '*');
        toolHelper.setExcludeInferenceTypes([]);
        this.clear();
    }
    onMouseMove(event, inferenceResult) {
        if (inferenceResult) {
            // const { startWidth, endWidth, platformThickness } = this.componentParam;
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
                    const { type, endWidth } = this.componentParam;
                    this.componentParam = Object.assign(Object.assign({}, this.componentParam), { type: type === _types__WEBPACK_IMPORTED_MODULE_1__.ComponentType.Platform ? _types__WEBPACK_IMPORTED_MODULE_1__.ComponentType.StraightStair : _types__WEBPACK_IMPORTED_MODULE_1__.ComponentType.Platform, startWidth: endWidth });
                    pluginUI.postMessage({ type: 'componentParamChanged', componentParam: Object.assign({}, this.componentParam) }, '*');
                    lastSegment.endLocked = true;
                    const nextSegment = Object.assign(Object.assign({}, _consts__WEBPACK_IMPORTED_MODULE_0__.FirstSegment), { start: lastSegment.end, end: lastSegment.end, startLocked: type === _types__WEBPACK_IMPORTED_MODULE_1__.ComponentType.Platform ? false : true, startHeight: lastSegment.endHeight, endHeight: lastSegment.endHeight, param: this.componentParam });
                    if (type !== _types__WEBPACK_IMPORTED_MODULE_1__.ComponentType.Platform) {
                        const { moldShape: { vertices } } = lastSegment;
                        nextSegment.baseLineSeg3d = { start: vertices[vertices.length - 2], end: vertices[vertices.length - 1] };
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
        if (lastSegment.startLocked) {
            (0,_tempMeshUtils__WEBPACK_IMPORTED_MODULE_2__.generateTempShape)(lastSegment, this.componentParam, this.segments);
            const { stairShape: { vertices: stairVertices, tempLines: stairTempLines }, moldShape: { vertices: moldVertices, tempLines: moldTempLines }, cornerShape: { vertices: cornerVertices, tempLines: cornerTempLines }, cornerMoldShape: { vertices: cornerMoldVertices, tempLines: cornerMoldTempLines }, } = lastSegment;
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
    }
    changeComponentParam(componentParam, changeParams) {
        if (this.segments.length) {
            const lastSegment = this.segments[this.segments.length - 1];
            const { startWidth: newWidth } = componentParam;
            const { start, param: { startWidth, type, offsetWidth }, baseLineSeg3d } = lastSegment;
            if (changeParams.indexOf(_types__WEBPACK_IMPORTED_MODULE_1__.ComponentParamType.StartWidth) > -1 && type === _types__WEBPACK_IMPORTED_MODULE_1__.ComponentType.Platform && baseLineSeg3d && offsetWidth !== 0) {
                const newStartWidth = Math.ceil(startWidth / (startWidth + Math.abs(offsetWidth)) * newWidth);
                const sign = offsetWidth / Math.abs(offsetWidth);
                const newOffsetWidth = sign * (newWidth - newStartWidth);
                const baseDir = baseLineSeg3d.end.subtracted(baseLineSeg3d.start).normalized();
                const newEnd = start.added(baseDir.multiplied(sign * (newStartWidth / 2 + Math.abs(newOffsetWidth))));
                componentParam.startWidth = newStartWidth;
                componentParam.endWidth = newStartWidth;
                componentParam.offsetWidth = newOffsetWidth;
                lastSegment.end = newEnd;
            }
            this.componentParam = componentParam;
            this.drawTempComponent(lastSegment);
        }
    }
    changeComponentType(componentType) {
        this.componentParam.type = componentType;
        this.changeComponentParam(this.componentParam, [_types__WEBPACK_IMPORTED_MODULE_1__.ComponentParamType.Type]);
    }
    tryCommit() {
        var _a, _b, _c;
        const meshes = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_3__.generateMeshes)(this.segments);
        if (meshes.length) {
            design.startOperation();
            const newInstances = [];
            let operationSuccess = true;
            for (const { start, end, startHeight, endHeight, baseLineSeg3d, param, mesh } of this.segments) {
                if (!operationSuccess) {
                    design.abortOperation();
                    return;
                }
                if (mesh === null || mesh === void 0 ? void 0 : mesh.vertices.length) {
                    const newShell = (_a = design.createShellFromMesh(mesh)) === null || _a === void 0 ? void 0 : _a.newShell;
                    operationSuccess = operationSuccess && !!newShell;
                    if (newShell) {
                        const newInstance = (_b = design.makeGroup(newShell.getFaces(), [], [])) === null || _b === void 0 ? void 0 : _b.addedInstance;
                        operationSuccess = operationSuccess && !!newInstance;
                        const groupDef = newInstance === null || newInstance === void 0 ? void 0 : newInstance.getGroupDefinition();
                        if (newInstance && groupDef) {
                            newInstances.push(newInstance);
                            const paramString = (0,_utils__WEBPACK_IMPORTED_MODULE_4__.stringifyParam)(param);
                            const startEndString = (0,_utils__WEBPACK_IMPORTED_MODULE_4__.stringifyStartEnd)(GeomLib.createPoint3d(start.x, start.y, startHeight), GeomLib.createPoint3d(end.x, end.y, endHeight));
                            operationSuccess = operationSuccess && groupDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_1__.ParamKey, paramString).isSuccess;
                            operationSuccess = operationSuccess && groupDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_1__.StartEndKey, startEndString).isSuccess;
                            if (baseLineSeg3d) {
                                const BaseLineString = (0,_utils__WEBPACK_IMPORTED_MODULE_4__.stringifyStartEnd)(baseLineSeg3d.start, baseLineSeg3d.end);
                                operationSuccess = operationSuccess && groupDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_1__.BaseLineSeg3dKey, BaseLineString).isSuccess;
                            }
                        }
                    }
                }
            }
            if (newInstances.length) {
                const parentInstance = (_c = design.makeGroup([], newInstances, [])) === null || _c === void 0 ? void 0 : _c.addedInstance;
                operationSuccess = operationSuccess && !!parentInstance;
                const parentDef = parentInstance === null || parentInstance === void 0 ? void 0 : parentInstance.getGroupDefinition();
                if (parentInstance && parentDef) {
                    operationSuccess = operationSuccess && parentDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_1__.StairModelKey, 'DrawStairModel').isSuccess;
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
    clear() {
        appView.clearTemporaryShapes();
        this.componentParam = Object.assign({}, _types__WEBPACK_IMPORTED_MODULE_1__.DefaultComponentParam);
        this.segments = [];
    }
    onRButtonUp(event, inferenceResult) {
        this.tryCommit();
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
/* harmony export */   generateMeshes: () => (/* binding */ generateMeshes)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/main/tools/DrawStairsTool/types.ts");

function generateMeshes(segments) {
    const meshes = [];
    for (const segment of segments) {
        if (segment.param.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform) {
            generatePlatformMesh(segment);
        }
        else {
            generateStairMesh(segment);
        }
        if (segment.mesh) {
            meshes.push(segment.mesh);
        }
    }
    return meshes;
}
function generateStairMesh(segment) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    const { stairShape: { vertices, stepCount }, cornerShape: { vertices: cornerVertices }, param: { upward } } = segment;
    if (stepCount < 1)
        return undefined;
    const stairMesh = {
        vertices: vertices.map(vertex => [vertex.x, vertex.y, vertex.z]),
        triangleIndices: [],
        softEdges: [],
    };
    const lastLeftIndex = vertices.length / 2 - 1;
    const leftIndex = vertices.length / 2 - ((!upward && stepCount > 1) ? 2 : 1);
    for (let i = 0; i < stepCount; i++) {
        stairMesh.triangleIndices.push(
        // stair faces
        [i * 4, i * 4 + 1, i * 4 + 2], [i * 4 + 1, i * 4 + 3, i * 4 + 2], [i * 4 + 2, i * 4 + 3, i * 4 + 4], [i * 4 + 3, i * 4 + 5, i * 4 + 4], 
        // side faces
        [i * 4, i * 4 + 2, (i + 1) * 4], [i * 4 + 1, (i + 1) * 4 + 1, i * 4 + 3]);
        (_a = stairMesh.softEdges) === null || _a === void 0 ? void 0 : _a.push([i * 4 + 1, i * 4 + 2], [i * 4 + 3, i * 4 + 4], [i * 4, (i + 1) * 4]);
        if (i === stepCount - 1 && upward && stepCount > 1) {
            stairMesh.triangleIndices.push(
            // tail side faces
            [lastLeftIndex, i * 4, (i + 1) * 4], [lastLeftIndex + 1, (i + 1) * 4 + 1, i * 4 + 1]);
            (_b = stairMesh.softEdges) === null || _b === void 0 ? void 0 : _b.push([lastLeftIndex, i * 4], [i * 4, (i + 1) * 4], [lastLeftIndex + 1, i * 4 + 1], [(i + 1) * 4 + 1, i * 4 + 1]);
        }
        else {
            stairMesh.triangleIndices.push(
            // side faces
            [leftIndex, i * 4, (i + 1) * 4], [leftIndex + 1, (i + 1) * 4 + 1, i * 4 + 1]);
            (_c = stairMesh.softEdges) === null || _c === void 0 ? void 0 : _c.push([i * 4, (i + 1) * 4], [(i + 1) * 4 + 1, i * 4 + 1]);
            if (upward) {
                if (i > 0) {
                    (_d = stairMesh.softEdges) === null || _d === void 0 ? void 0 : _d.push([leftIndex, i * 4], [leftIndex + 1, i * 4 + 1]);
                }
                if (stepCount > 1) {
                    (_e = stairMesh.softEdges) === null || _e === void 0 ? void 0 : _e.push([leftIndex, (i + 1) * 4], [leftIndex + 1, (i + 1) * 4 + 1]);
                }
            }
            else {
                if (stepCount > 1) {
                    (_f = stairMesh.softEdges) === null || _f === void 0 ? void 0 : _f.push([leftIndex, i * 4], [leftIndex + 1, i * 4 + 1]);
                }
                if (i < stepCount - 1) {
                    (_g = stairMesh.softEdges) === null || _g === void 0 ? void 0 : _g.push([leftIndex, (i + 1) * 4], [leftIndex + 1, (i + 1) * 4 + 1]);
                }
            }
        }
    }
    if (upward) {
        stairMesh.triangleIndices.push(
        // bottom faces
        [vertices.length - 1, 1, 0], [vertices.length - 1, 0, vertices.length - 2], [vertices.length - 3, vertices.length - 1, vertices.length - 2], [vertices.length - 3, vertices.length - 2, vertices.length - 4]);
        (_h = stairMesh.softEdges) === null || _h === void 0 ? void 0 : _h.push([vertices.length - 1, 0], [vertices.length - 3, vertices.length - 2]);
        if (stepCount > 1) {
            stairMesh.triangleIndices.push(
            // side bottom faces
            [vertices.length - 2, vertices.length - 10, vertices.length - 4], [vertices.length - 1, vertices.length - 3, vertices.length - 9], 
            // bottom faces
            [vertices.length - 5, vertices.length - 3, vertices.length - 4], [vertices.length - 5, vertices.length - 4, vertices.length - 6]);
            (_j = stairMesh.softEdges) === null || _j === void 0 ? void 0 : _j.push([vertices.length - 5, vertices.length - 4], [vertices.length - 2, vertices.length - 10], [vertices.length - 10, vertices.length - 4]);
        }
    }
    else {
        stairMesh.triangleIndices.push(
        // bottom faces
        [vertices.length - 1, 0, 1], [vertices.length - 1, vertices.length - 2, 0], [vertices.length - 3, vertices.length - 2, vertices.length - 1], [vertices.length - 3, vertices.length - 4, vertices.length - 2]);
        (_k = stairMesh.softEdges) === null || _k === void 0 ? void 0 : _k.push([vertices.length - 1, 0], [vertices.length - 3, vertices.length - 2]);
        if (stepCount > 1) {
            stairMesh.triangleIndices.push(
            // side bottom faces
            [vertices.length - 2, 0, vertices.length - 4], [vertices.length - 1, vertices.length - 3, 1], 
            // bottom faces
            [vertices.length - 5, vertices.length - 4, vertices.length - 3], [vertices.length - 5, vertices.length - 6, vertices.length - 4]);
            (_l = stairMesh.softEdges) === null || _l === void 0 ? void 0 : _l.push([vertices.length - 5, vertices.length - 4], [vertices.length - 3, 1], [0, vertices.length - 4]);
        }
    }
    if (cornerVertices.length === 6) {
        generatePolygonMesh(cornerVertices, stairMesh);
    }
    segment.mesh = stairMesh;
}
function generatePlatformMesh(segment) {
    const { stairShape: { vertices } } = segment;
    const vertexLength = vertices.length / 2;
    if (vertexLength === 4 || vertexLength === 5) {
        const platformMesh = {
            vertices: vertices.map(vertex => [vertex.x, vertex.y, vertex.z]),
            triangleIndices: [],
            softEdges: [],
        };
        generatePolygonMesh(vertices, platformMesh);
        segment.mesh = platformMesh;
    }
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
        mesh.vertices.push([i + vertexLength, i + segCount + vertexLength, bottomRight + vertexLength], [i + vertexLength, bottomRight + vertexLength, right + vertexLength]);
        (_a = mesh.softEdges) === null || _a === void 0 ? void 0 : _a.push([i + vertexLength, bottomRight + vertexLength]);
        if (i > 0 && i < segCount - 1) {
            mesh.vertices.push([i + vertexLength, right + vertexLength, 0 + vertexLength], [bottomRight + vertexLength, i + vertexLength, segCount + vertexLength]);
            if (i > 1) {
                (_b = mesh.softEdges) === null || _b === void 0 ? void 0 : _b.push([i, 0 + vertexLength], [i + segCount + vertexLength, segCount + vertexLength]);
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
/* harmony export */   generateTempShape: () => (/* binding */ generateTempShape)
/* harmony export */ });
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ "./src/main/tools/DrawStairsTool/consts.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./src/main/tools/DrawStairsTool/types.ts");


function generateTempShape(segment, componentParam, segments) {
    const { type } = componentParam;
    if (type === _types__WEBPACK_IMPORTED_MODULE_1__.ComponentType.StraightStair || type === _types__WEBPACK_IMPORTED_MODULE_1__.ComponentType.CircularStair) {
        generateTempStairShape(segment, componentParam);
    }
    else {
        generateTempPlatformShape(segment, componentParam, segments);
    }
}
function generateTempStairShape(segment, componentParam) {
    const { start, end, stairShape, moldShape, cornerShape, cornerMoldShape, startHeight, baseLineSeg3d } = segment;
    const { startWidth, endWidth, type, horizontalStep, verticalStep, upward, platformThickness } = componentParam;
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
    if (type === _types__WEBPACK_IMPORTED_MODULE_1__.ComponentType.StraightStair) {
        let horizontalFrontDir = end.subtracted(start).normalized();
        let horizontalDistance = start.distanceTo(end);
        const verticalFrontDir = _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ;
        let horizontalLeftDir = _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.cross(horizontalFrontDir);
        if (baseLineSeg3d) {
            const baseLineDir = baseLineSeg3d.end.subtracted(baseLineSeg3d.start).normalized();
            const angle = horizontalFrontDir.angle(baseLineDir);
            const deltaAngle = Math.abs(angle - Math.PI / 2);
            if (deltaAngle <= _consts__WEBPACK_IMPORTED_MODULE_0__.AngleTolerance) {
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
                cornerShape.tempLines = [
                    [0, 1], [1, 2], [2, 0],
                    [3, 4], [4, 5], [5, 3],
                    [0, 3], [1, 4], [2, 5],
                ];
            }
        }
        const stepFloatCount = horizontalDistance / horizontalStep;
        const stepCount = Math.ceil(stepFloatCount);
        segment.endHeight = segment.startHeight + stepCount * verticalStep;
        stairShape.stepCount = stepCount;
        moldShape.stepCount = stepCount;
        if (stepCount < 1)
            return;
        const lastStepLength = horizontalDistance - (stepCount - 1) * horizontalStep;
        if (lastStepLength > 0 && lastStepLength < _consts__WEBPACK_IMPORTED_MODULE_0__.LengthTolerance) {
            stairShape.stepCount--;
            moldShape.stepCount--;
        }
        const stepHeight = upward ? verticalStep : -verticalStep;
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
            tempLines.push([4 * i, 1 + 4 * i], [4 * i, 2 + 4 * i], [1 + 4 * i, 3 + 4 * i], [2 + 4 * i, 3 + 4 * i], [2 + 4 * i, 4 + 4 * i], [3 + 4 * i, 5 + 4 * i]);
        }
        moldVertices.push(stepCount > 1 ? moldVertices[moldVertices.length - 2].added(horizontalFrontDir.multiplied(horizontalStep)) : leftPt, stepCount > 1 ? moldVertices[moldVertices.length - 1].added(horizontalFrontDir.multiplied(horizontalStep)) : rightPt);
        moldTempLines.push([2 * (stepCount - 1), 1 + 2 * (stepCount - 1)]);
        if (lastStepLength > _consts__WEBPACK_IMPORTED_MODULE_0__.LengthTolerance) {
            moldVertices.push(moldVertices[moldVertices.length - 2].added(horizontalLeftDir.multiplied(lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength)), moldVertices[moldVertices.length - 1].added(horizontalLeftDir.multiplied(-lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength)));
            moldTempLines.push([2 * (stepCount - 1), 2 + 2 * (stepCount - 1)], [1 + 2 * (stepCount - 1), 3 + 2 * (stepCount - 1)], [2 * stepCount, 1 + 2 * stepCount]);
        }
        if (upward) {
            vertices.push(stepCount > 1 ? vertices[vertices.length - 2].added(horizontalFrontDir.multiplied(horizontalStep)) : leftPt, stepCount > 1 ? vertices[vertices.length - 1].added(horizontalFrontDir.multiplied(horizontalStep)) : rightPt);
            tempLines.push([4 * (stepCount - 1), 1 + 4 * (stepCount - 1)]);
            if (lastStepLength > _consts__WEBPACK_IMPORTED_MODULE_0__.LengthTolerance) {
                vertices.push(vertices[vertices.length - 2].added(verticalFrontDir.multiplied(verticalStep)), vertices[vertices.length - 1].added(verticalFrontDir.multiplied(verticalStep)));
                vertices.push(vertices[vertices.length - 2].added(horizontalLeftDir.multiplied(lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength)), vertices[vertices.length - 1].added(horizontalLeftDir.multiplied(-lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength)));
                tempLines.push(
                // [4 * stepCount, 1 + 4 * stepCount],
                [4 * (stepCount - 1), 2 + 4 * (stepCount - 1)], [1 + 4 * (stepCount - 1), 3 + 4 * (stepCount - 1)], [2 + 4 * (stepCount - 1), 3 + 4 * (stepCount - 1)], [2 + 4 * (stepCount - 1), 4 + 4 * (stepCount - 1)], [3 + 4 * (stepCount - 1), 5 + 4 * (stepCount - 1)], [4 * stepCount, 1 + 4 * stepCount]);
            }
        }
        else {
            vertices.push(stepCount > 1 ? vertices[vertices.length - 2].added(verticalFrontDir.multiplied(verticalStep)) : leftPt, stepCount > 1 ? vertices[vertices.length - 1].added(verticalFrontDir.multiplied(verticalStep)) : rightPt);
            tempLines.push([4 * (stepCount - 1), 1 + 4 * (stepCount - 1)]);
            if (lastStepLength > _consts__WEBPACK_IMPORTED_MODULE_0__.LengthTolerance) {
                vertices.push(vertices[vertices.length - 2].added(horizontalLeftDir.multiplied(lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength)), vertices[vertices.length - 1].added(horizontalLeftDir.multiplied(-lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength)));
                vertices.push(vertices[vertices.length - 2].added(verticalFrontDir.multiplied(verticalStep)), vertices[vertices.length - 1].added(verticalFrontDir.multiplied(verticalStep)));
                tempLines.push(
                // [4 * (stepCount - 1), 1 + 4 * (stepCount - 1)],
                [4 * (stepCount - 1), 2 + 4 * (stepCount - 1)], [1 + 4 * (stepCount - 1), 3 + 4 * (stepCount - 1)], [2 + 4 * (stepCount - 1), 3 + 4 * (stepCount - 1)], [2 + 4 * (stepCount - 1), 4 + 4 * (stepCount - 1)], [3 + 4 * (stepCount - 1), 5 + 4 * (stepCount - 1)], [4 * stepCount, 1 + 4 * stepCount]);
            }
        }
        if (stepCount > 1) {
            tempLines.push([vertices.length - 2, 2 + vertices.length - 2], [1 + vertices.length - 2, 3 + vertices.length - 2], [2 + vertices.length - 2, 3 + vertices.length - 2], [2 + vertices.length - 2, 4 + vertices.length - 2], [3 + vertices.length - 2, 5 + vertices.length - 2], [vertices.length + 2, 1 + vertices.length + 2], [vertices.length + 2, 0], [1 + vertices.length + 2, 1]);
            if (upward) {
                vertices.push(vertices[vertices.length - 2].added(verticalFrontDir.multiplied(-stepHeight - (1 - lastStepLength / horizontalStep) * stepHeight)), vertices[vertices.length - 1].added(verticalFrontDir.multiplied(-stepHeight - (1 - lastStepLength / horizontalStep) * stepHeight)));
                vertices.push(vertices[0].added(horizontalFrontDir.multiplied(horizontalStep)), vertices[1].added(horizontalFrontDir.multiplied(horizontalStep)));
            }
            else {
                vertices.push(vertices[vertices.length - 2].added(horizontalFrontDir.multiplied(-lastStepLength)), vertices[vertices.length - 1].added(horizontalFrontDir.multiplied(-lastStepLength)));
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
function generateTempPlatformShape(segment, componentParam, segments) {
    const { startWidth, platformThickness } = componentParam;
    const { start, end, stairShape, moldShape } = segment;
    const curDir = end.subtracted(start);
    const curLeftDir = _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.cross(curDir).normalized();
    stairShape.vertices = [];
    stairShape.tempLines = [];
    moldShape.vertices = [];
    moldShape.tempLines = [];
    if (segments.length > 1) {
        const preStairSegment = segments[segments.length - 2];
        // if (preStairSegment.type === ComponentType.Stair) {
        const { start: prevStart, end: prevEnd, param: prevParam, moldShape: prevMoldShape, endHeight: prevEndHeight } = preStairSegment;
        const prevDirNormalized = prevEnd.subtracted(prevStart).normalized();
        const prevLeftDir = _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.cross(prevDirNormalized).normalized();
        const angle = curDir.angleTo(prevDirNormalized, _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ);
        const frontLength = curDir.dot(prevDirNormalized);
        const curEndLeftCorner = end.added(curLeftDir.multiplied(startWidth / 2));
        const dir1 = curEndLeftCorner.subtracted(segment.start);
        const angle1 = dir1.angle(curDir);
        if (angle <= _consts__WEBPACK_IMPORTED_MODULE_0__.AngleTolerance || angle >= (Math.PI * 2 - _consts__WEBPACK_IMPORTED_MODULE_0__.AngleTolerance) || prevParam.type === _types__WEBPACK_IMPORTED_MODULE_1__.ComponentType.Platform) {
            segment.end = segment.start.added(prevDirNormalized.multiplied(frontLength));
            moldShape.vertices = [
                start.added(prevLeftDir.multiplied(startWidth / 2)),
                start.added(prevLeftDir.multiplied(-startWidth / 2)),
                segment.end.added(prevLeftDir.multiplied(-startWidth / 2)),
                segment.end.added(prevLeftDir.multiplied(startWidth / 2)),
            ];
            moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 0]];
            stairShape.vertices = [...moldShape.vertices.map(p => p.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(prevEndHeight))),
                ...moldShape.vertices.map(p => p.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(prevEndHeight - platformThickness))),
            ];
            stairShape.tempLines = [
                ...moldShape.tempLines,
                ...moldShape.tempLines.map(seg => [seg[0] + 4, seg[1] + 4]),
                [0, 4], [1, 5], [2, 6], [3, 7],
            ];
        }
        else {
            if (_consts__WEBPACK_IMPORTED_MODULE_0__.AngleTolerance < angle && angle < (Math.PI / 2 - angle1)) {
                let leftConnectPoints = [prevMoldShape.vertices[prevMoldShape.vertices.length - 2], prevMoldShape.vertices[prevMoldShape.vertices.length - 2]];
                if (startWidth <= prevParam.endWidth) {
                    const l1 = startWidth / 2 / Math.cos(angle);
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
                    // start.added(curLeftDir.multiplied(startWidth / 2)),
                    ...leftConnectPoints,
                    start.added(prevLeftDir.multiplied(-startWidth / 2 / Math.cos(angle))),
                    end.added(curLeftDir.multiplied(-startWidth / 2)),
                    end.added(curLeftDir.multiplied(startWidth / 2)),
                ];
                moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]];
                stairShape.vertices = [...moldShape.vertices.map(p => p.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(prevEndHeight))),
                    ...moldShape.vertices.map(p => p.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(prevEndHeight - platformThickness))),
                ];
                stairShape.tempLines = [
                    ...moldShape.tempLines,
                    ...moldShape.tempLines.map(seg => [seg[0] + 5, seg[1] + 5]),
                    [0, 5], [1, 6], [2, 7], [3, 8], [4, 9],
                ];
            }
            else if (angle > (Math.PI * 3 / 2 + angle1)) {
                // const rightConnectPoint = startWidth > prevParam.endWidth ? prevMoldShape.vertices[prevMoldShape.vertices.length - 1] :
                //     start.added(prevLeftDir.multiplied(-startWidth / 2 * Math.cos(angle)));
                let rightConnectPoints = [prevMoldShape.vertices[prevMoldShape.vertices.length - 1], prevMoldShape.vertices[prevMoldShape.vertices.length - 1]];
                if (startWidth <= prevParam.endWidth) {
                    const l2 = startWidth / 2 / Math.cos(angle);
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
                    start.added(prevLeftDir.multiplied(startWidth / 2 / Math.cos(angle))),
                    ...rightConnectPoints,
                    // start.added(curLeftDir.multiplied(-startWidth / 2)),
                    end.added(curLeftDir.multiplied(-startWidth / 2)),
                    end.added(curLeftDir.multiplied(startWidth / 2)),
                ];
                moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]];
                stairShape.vertices = [...moldShape.vertices.map(p => p.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(prevEndHeight))),
                    ...moldShape.vertices.map(p => p.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(prevEndHeight - platformThickness))),
                ];
                stairShape.tempLines = [
                    ...moldShape.tempLines,
                    ...moldShape.tempLines.map(seg => [seg[0] + 5, seg[1] + 5]),
                    [0, 5], [1, 6], [2, 7], [3, 8], [4, 9],
                ];
            }
            else if (angle >= Math.PI) {
                const validFrontLength = Math.max(startWidth, frontLength);
                const frontEnd = segment.start.added(prevDirNormalized.multiplied(validFrontLength));
                const leftLength = curDir.dot(prevLeftDir);
                const validLeftLength = Math.max(startWidth / 2, leftLength);
                if (leftLength < startWidth / 2) {
                    segment.end = frontEnd;
                }
                else {
                    segment.end = segment.start.added(prevLeftDir.multiplied(leftLength));
                }
                // componentParam.startWidth = validLeftLength + startWidth / 2;
                // componentParam.endWidth = validLeftLength + startWidth / 2;
                moldShape.vertices = [
                    start.added(prevLeftDir.multiplied(validLeftLength)),
                    start.added(prevLeftDir.multiplied(-startWidth / 2)),
                    frontEnd.added(prevLeftDir.multiplied(-startWidth / 2)),
                    frontEnd.added(prevLeftDir.multiplied(validLeftLength)),
                ];
                moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 0]];
                stairShape.vertices = [...moldShape.vertices.map(p => p.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(prevEndHeight))),
                    ...moldShape.vertices.map(p => p.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(prevEndHeight - platformThickness))),
                ];
                stairShape.tempLines = [
                    ...moldShape.tempLines,
                    ...moldShape.tempLines.map(seg => [seg[0] + 4, seg[1] + 4]),
                    [0, 4], [1, 5], [2, 6], [3, 7],
                ];
            }
            else {
                const rightLength = -curDir.dot(prevLeftDir);
                const validFrontLength = Math.max(startWidth, frontLength);
                const frontEnd1 = segment.start.added(prevDirNormalized.multiplied(validFrontLength));
                const validRightLength = Math.max(startWidth / 2, rightLength);
                if (rightLength < startWidth / 2) {
                    segment.end = frontEnd1;
                }
                else {
                    segment.end = segment.start.added(prevLeftDir.multiplied(-rightLength));
                }
                // segment.end = segment.start.added(prevDirNormalized.multiplied(validFrontLength));
                // componentParam.startWidth = validRightLength + startWidth / 2;
                // componentParam.endWidth = validRightLength + startWidth / 2;
                moldShape.vertices = [
                    start.added(prevLeftDir.multiplied(startWidth / 2)),
                    start.added(prevLeftDir.multiplied(-validRightLength)),
                    frontEnd1.added(prevLeftDir.multiplied(-validRightLength)),
                    frontEnd1.added(prevLeftDir.multiplied(startWidth / 2)),
                ];
                moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 0]];
                stairShape.vertices = [...moldShape.vertices.map(p => p.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(prevEndHeight))),
                    ...moldShape.vertices.map(p => p.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(prevEndHeight - platformThickness))),
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
            start.added(curLeftDir.multiplied(startWidth / 2)),
            start.added(curLeftDir.multiplied(-startWidth / 2)),
            segment.end.added(curLeftDir.multiplied(-startWidth / 2)),
            segment.end.added(curLeftDir.multiplied(startWidth / 2)),
        ];
        moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 0]];
        stairShape.vertices = [...moldShape.vertices,
            ...moldShape.vertices.map(p => p.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(-platformThickness))),
        ];
        stairShape.tempLines = [
            ...moldShape.tempLines,
            ...moldShape.tempLines.map(seg => [seg[0] + 4, seg[1] + 4]),
            [0, 4], [1, 5], [2, 6], [3, 7],
        ];
    }
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
/* harmony export */   ComponentParamSettings: () => (/* binding */ ComponentParamSettings),
/* harmony export */   ComponentParamType: () => (/* binding */ ComponentParamType),
/* harmony export */   ComponentType: () => (/* binding */ ComponentType),
/* harmony export */   CoordDelimiter: () => (/* binding */ CoordDelimiter),
/* harmony export */   DefaultComponentParam: () => (/* binding */ DefaultComponentParam),
/* harmony export */   Delimiter: () => (/* binding */ Delimiter),
/* harmony export */   ParamKey: () => (/* binding */ ParamKey),
/* harmony export */   StairModelKey: () => (/* binding */ StairModelKey),
/* harmony export */   StartEndKey: () => (/* binding */ StartEndKey),
/* harmony export */   isAxisValid: () => (/* binding */ isAxisValid)
/* harmony export */ });
const StairModelKey = 'DrawStairsModel';
// export const StairKey = 'DSStair';
// export const PlatformKey = 'DSPlatform';
const ParamKey = 'DSParam';
// startHeight and endHeight cached in start and end
const StartEndKey = 'SToE';
const BaseLineSeg3dKey = 'BaseLine';
const Delimiter = '&';
const CoordDelimiter = ',';
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
const DefaultComponentParam = {
    horizontalStep: 500,
    verticalStep: 100,
    startWidth: 1000,
    endWidth: 1000,
    offsetWidth: 0,
    type: ComponentType.StraightStair,
    upward: true,
    platformThickness: 50,
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
/* harmony export */   stringifyParam: () => (/* binding */ stringifyParam),
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
/* harmony import */ var _tools_DrawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools/DrawStairsTool/index */ "./src/main/tools/DrawStairsTool/index.ts");
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
                app.activateCustomTool(_tools_DrawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool, true);
                activatedCustomTool = _tools_DrawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool;
                _tools_DrawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool.changeComponentType(data.componentType);
            }
            else if (data.type === 'deActivateStraightStairsTool' || data.type === 'deActivateCircularStairsTool') {
                app.deactivateCustomTool(_tools_DrawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool, false);
                activatedCustomTool = undefined;
            }
            else if (data.type === 'componentParamChange') {
                if (activatedCustomTool === _tools_DrawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool) {
                    _tools_DrawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool.changeComponentParam(data.componentParam, data.changeParams);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QixZQUFZO0FBQ3JGLG1DQUFtQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3hGLGdDQUFnQztBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUM4RDtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLHVFQUFjO0FBQ3JELHNDQUFzQyx1RUFBYztBQUNwRCxnQkFBZ0IsdUVBQWM7QUFDOUI7QUFDQTtBQUNBLHlDQUF5Qyx1RUFBYztBQUN2RDtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsdUVBQWM7QUFDMUQsb0JBQW9CLHVFQUFjO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kcmF3LXN0YWlycy8uL3NyYy9tYWluL3Rvb2xzL0RyYXdTdGFpcnNUb29sL2NvbnN0cy50cyIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy8uL3NyYy9tYWluL3Rvb2xzL0RyYXdTdGFpcnNUb29sL2luZGV4LnRzIiwid2VicGFjazovL2RyYXctc3RhaXJzLy4vc3JjL21haW4vdG9vbHMvRHJhd1N0YWlyc1Rvb2wvbWVzaFV0aWxzLnRzIiwid2VicGFjazovL2RyYXctc3RhaXJzLy4vc3JjL21haW4vdG9vbHMvRHJhd1N0YWlyc1Rvb2wvdGVtcE1lc2hVdGlscy50cyIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy8uL3NyYy9tYWluL3Rvb2xzL0RyYXdTdGFpcnNUb29sL3R5cGVzLnRzIiwid2VicGFjazovL2RyYXctc3RhaXJzLy4vc3JjL21haW4vdG9vbHMvRHJhd1N0YWlyc1Rvb2wvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2RyYXctc3RhaXJzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy8uL3NyYy9tYWluL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGVmYXVsdENvbXBvbmVudFBhcmFtIH0gZnJvbSBcIi4vdHlwZXNcIjtcclxuZXhwb3J0IGNvbnN0IGR1bW15TWF0cml4NCA9IEdlb21MaWIuY3JlYXRlSWRlbnRpdHlNYXRyaXg0KCk7XHJcbmV4cG9ydCBjb25zdCBkdW1teVZlY3RvcjNkID0gR2VvbUxpYi5jcmVhdGVWZWN0b3IzZCgwLCAwLCAxKTtcclxuZXhwb3J0IGNvbnN0IGR1bW15UG9pbnQzZCA9IEdlb21MaWIuY3JlYXRlUG9pbnQzZCgwLCAwLCAwKTtcclxuZXhwb3J0IGNvbnN0IERpcmVjdGlvblogPSBHZW9tTGliLmNyZWF0ZVZlY3RvcjNkKDAsIDAsIDEpO1xyXG4vLyBjb25zdCBIZWlnaHRUb2xlcmFuY2U6IG51bWJlciA9IDU7XHJcbmV4cG9ydCBjb25zdCBMZW5ndGhUb2xlcmFuY2UgPSAxO1xyXG5leHBvcnQgY29uc3QgQW5nbGVUb2xlcmFuY2UgPSBNYXRoLlBJIC8gMzY7XHJcbi8vIGNvbnN0IERlZmF1bHRCb2FyZFRoaWNrbmVzcyA9IDUwO1xyXG5leHBvcnQgY29uc3QgRmlyc3RTZWdtZW50ID0ge1xyXG4gICAgc3RhcnQ6IGR1bW15UG9pbnQzZCxcclxuICAgIGVuZDogZHVtbXlQb2ludDNkLFxyXG4gICAgc3RhcnRMb2NrZWQ6IHRydWUsXHJcbiAgICBlbmRMb2NrZWQ6IGZhbHNlLFxyXG4gICAgc3RhcnRIZWlnaHQ6IDAsXHJcbiAgICBlbmRIZWlnaHQ6IDAsXHJcbiAgICBzdGFpclNoYXBlOiB7XHJcbiAgICAgICAgc3RlcENvdW50OiAwLFxyXG4gICAgICAgIHZlcnRpY2VzOiBbXSxcclxuICAgICAgICB0ZW1wTGluZXM6IFtdLFxyXG4gICAgfSxcclxuICAgIG1vbGRTaGFwZToge1xyXG4gICAgICAgIHN0ZXBDb3VudDogMCxcclxuICAgICAgICB2ZXJ0aWNlczogW10sXHJcbiAgICAgICAgdGVtcExpbmVzOiBbXSxcclxuICAgIH0sXHJcbiAgICBjb3JuZXJTaGFwZToge1xyXG4gICAgICAgIHN0ZXBDb3VudDogMCxcclxuICAgICAgICB2ZXJ0aWNlczogW10sXHJcbiAgICAgICAgdGVtcExpbmVzOiBbXSxcclxuICAgIH0sXHJcbiAgICBjb3JuZXJNb2xkU2hhcGU6IHtcclxuICAgICAgICBzdGVwQ291bnQ6IDAsXHJcbiAgICAgICAgdmVydGljZXM6IFtdLFxyXG4gICAgICAgIHRlbXBMaW5lczogW10sXHJcbiAgICB9LFxyXG4gICAgcGFyYW06IERlZmF1bHRDb21wb25lbnRQYXJhbSxcclxufTtcclxuIiwiaW1wb3J0IHsgRmlyc3RTZWdtZW50IH0gZnJvbSBcIi4vY29uc3RzXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudFR5cGUsIERlZmF1bHRDb21wb25lbnRQYXJhbSwgUGFyYW1LZXksIFN0YXJ0RW5kS2V5LCBCYXNlTGluZVNlZzNkS2V5LCBTdGFpck1vZGVsS2V5LCBDb21wb25lbnRQYXJhbVR5cGUgfSBmcm9tIFwiLi90eXBlc1wiO1xyXG5pbXBvcnQgeyBnZW5lcmF0ZVRlbXBTaGFwZSB9IGZyb20gXCIuL3RlbXBNZXNoVXRpbHNcIjtcclxuaW1wb3J0IHsgZ2VuZXJhdGVNZXNoZXMgfSBmcm9tIFwiLi9tZXNoVXRpbHNcIjtcclxuaW1wb3J0IHsgc3RyaW5naWZ5UGFyYW0sIHN0cmluZ2lmeVN0YXJ0RW5kIH0gZnJvbSBcIi4vdXRpbHNcIjtcclxuY29uc3QgZGVzaWduID0gYXBwLmdldEFjdGl2ZURlc2lnbigpO1xyXG5jb25zdCBwbHVnaW5VSSA9IGFwcC5nZXRQbHVnaW5VSSgpO1xyXG5jb25zdCBhcHBWaWV3ID0gYXBwLmdldEFjdGl2ZVZpZXcoKTtcclxuY29uc3QgdG9vbEhlbHBlciA9IGFwcC5nZXRUb29sSGVscGVyKCk7XHJcbmV4cG9ydCBjbGFzcyBEcmF3U3RhaXJzVG9vbCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudFBhcmFtID0gT2JqZWN0LmFzc2lnbih7fSwgRGVmYXVsdENvbXBvbmVudFBhcmFtKTtcclxuICAgICAgICB0aGlzLnNlZ21lbnRzID0gW107XHJcbiAgICB9XHJcbiAgICBvblRvb2xBY3RpdmUoKSB7XHJcbiAgICAgICAgdG9vbEhlbHBlci5zZXRFeGNsdWRlSW5mZXJlbmNlVHlwZXMoW1xyXG4gICAgICAgICAgICBLRW50aXR5VHlwZS5GYWNlLCBLRW50aXR5VHlwZS5FZGdlLCBLRW50aXR5VHlwZS5BdXhpbGlhcnlCb3VuZGVkQ3VydmUsIEtFbnRpdHlUeXBlLkF1eGlsaWFyeUxpbmUsIEtFbnRpdHlUeXBlLkF1eGlsaWFyeVZlcnRleCxcclxuICAgICAgICAgICAgS0VudGl0eVR5cGUuR3JvdXBJbnN0YW5jZSwgS0VudGl0eVR5cGUuVmVydGV4LCBLQXJjaEZhY2VUeXBlLk5vblBsYW5hciwgS0FyY2hGYWNlVHlwZS5QbGFuYXIsXHJcbiAgICAgICAgXSk7XHJcbiAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiAnY29tcG9uZW50UGFyYW1DaGFuZ2VkJywgY29tcG9uZW50UGFyYW06IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuY29tcG9uZW50UGFyYW0pIH0sICcqJyk7XHJcbiAgICB9XHJcbiAgICBvblRvb2xEZWFjdGl2ZSgpIHtcclxuICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6ICdsZWF2ZURyYXdTdGFpcnNUb29sJyB9LCAnKicpO1xyXG4gICAgICAgIHRvb2xIZWxwZXIuc2V0RXhjbHVkZUluZmVyZW5jZVR5cGVzKFtdKTtcclxuICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICB9XHJcbiAgICBvbk1vdXNlTW92ZShldmVudCwgaW5mZXJlbmNlUmVzdWx0KSB7XHJcbiAgICAgICAgaWYgKGluZmVyZW5jZVJlc3VsdCkge1xyXG4gICAgICAgICAgICAvLyBjb25zdCB7IHN0YXJ0V2lkdGgsIGVuZFdpZHRoLCBwbGF0Zm9ybVRoaWNrbmVzcyB9ID0gdGhpcy5jb21wb25lbnRQYXJhbTtcclxuICAgICAgICAgICAgY29uc3QgcG9zaXRpb24gPSBpbmZlcmVuY2VSZXN1bHQucG9zaXRpb247XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlZ21lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdFNlZ21lbnQgPSB0aGlzLnNlZ21lbnRzW3RoaXMuc2VnbWVudHMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICBpZiAobGFzdFNlZ21lbnQuc3RhcnRMb2NrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5lbmQgPSBwb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdUZW1wQ29tcG9uZW50KGxhc3RTZWdtZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlZ21lbnRzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJldlNlZ21lbnQgPSB0aGlzLnNlZ21lbnRzW3RoaXMuc2VnbWVudHMubGVuZ3RoIC0gMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG11c3QgYmUgdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJldlNlZ21lbnQucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBtb2xkU2hhcGU6IHsgdmVydGljZXMsIHRlbXBMaW5lcyB9IH0gPSBwcmV2U2VnbWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjbG9zZXN0UG9pbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWluRGlzdGFuY2UgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVzLmZvckVhY2gobGluZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGluZVNlZzNkID0gR2VvbUxpYi5jcmVhdGVMaW5lU2VnbWVudDNkKHZlcnRpY2VzW2xpbmVbMF1dLCB2ZXJ0aWNlc1tsaW5lWzFdXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlUG9pbnQgPSBsaW5lU2VnM2QuZ2V0Q2xvc2VzdFBvaW50KHBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJEaXN0YW5jZSA9IHRoZVBvaW50LmRpc3RhbmNlVG8ocG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY2xvc2VzdFBvaW50IHx8IGN1ckRpc3RhbmNlIDwgbWluRGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluRGlzdGFuY2UgPSBjdXJEaXN0YW5jZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFBvaW50ID0gdGhlUG9pbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LnN0YXJ0ID0gY2xvc2VzdFBvaW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5iYXNlTGluZVNlZzNkID0geyBzdGFydDogdmVydGljZXNbbGluZVswXV0sIGVuZDogdmVydGljZXNbbGluZVsxXV0gfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0U2VnbWVudC5waWNrU3RhcnRUZW1wU2hhcGVJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcFZpZXcuY2xlYXJUZW1wb3JhcnlTaGFwZXNCeUlkcyhbbGFzdFNlZ21lbnQucGlja1N0YXJ0VGVtcFNoYXBlSWRdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbG9zZXN0UG9pbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwaWNrU3RhcnRUZW1wU2hhcGVJZCA9IGFwcFZpZXcuZHJhd0xpbmVzKFtwb3NpdGlvbiwgY2xvc2VzdFBvaW50XSwgeyBjb2xvcjogeyByOiAwLCBnOiAwLCBiOiAyNTUgfSwgZGVwdGhUZXN0OiB0cnVlLCBwYXR0ZXJuOiBLTGluZVBhdHRlcm4uRGFzaCwgZ2FwU2l6ZTogNTAsIGRhc2hTaXplOiA1MCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGlja1N0YXJ0VGVtcFNoYXBlSWQgPT09IG51bGwgfHwgcGlja1N0YXJ0VGVtcFNoYXBlSWQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBpY2tTdGFydFRlbXBTaGFwZUlkLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LnBpY2tTdGFydFRlbXBTaGFwZUlkID0gcGlja1N0YXJ0VGVtcFNoYXBlSWQuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25MQnV0dG9uVXAoZXZlbnQsIGluZmVyZW5jZVJlc3VsdCkge1xyXG4gICAgICAgIGlmIChpbmZlcmVuY2VSZXN1bHQpIHtcclxuICAgICAgICAgICAgY29uc3QgcG9zaXRpb24gPSBpbmZlcmVuY2VSZXN1bHQucG9zaXRpb247XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlZ21lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdFNlZ21lbnQgPSB0aGlzLnNlZ21lbnRzW3RoaXMuc2VnbWVudHMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICBpZiAoIWxhc3RTZWdtZW50LnN0YXJ0TG9ja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuc3RhcnRMb2NrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXN0U2VnbWVudC5waWNrU3RhcnRUZW1wU2hhcGVJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBWaWV3LmNsZWFyVGVtcG9yYXJ5U2hhcGVzQnlJZHMoW2xhc3RTZWdtZW50LnBpY2tTdGFydFRlbXBTaGFwZUlkXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBDb21wb25lbnQobGFzdFNlZ21lbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyB0eXBlLCBlbmRXaWR0aCB9ID0gdGhpcy5jb21wb25lbnRQYXJhbTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudFBhcmFtID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLmNvbXBvbmVudFBhcmFtKSwgeyB0eXBlOiB0eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtID8gQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyIDogQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSwgc3RhcnRXaWR0aDogZW5kV2lkdGggfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiAnY29tcG9uZW50UGFyYW1DaGFuZ2VkJywgY29tcG9uZW50UGFyYW06IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuY29tcG9uZW50UGFyYW0pIH0sICcqJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuZW5kTG9ja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0U2VnbWVudCA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgRmlyc3RTZWdtZW50KSwgeyBzdGFydDogbGFzdFNlZ21lbnQuZW5kLCBlbmQ6IGxhc3RTZWdtZW50LmVuZCwgc3RhcnRMb2NrZWQ6IHR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gPyBmYWxzZSA6IHRydWUsIHN0YXJ0SGVpZ2h0OiBsYXN0U2VnbWVudC5lbmRIZWlnaHQsIGVuZEhlaWdodDogbGFzdFNlZ21lbnQuZW5kSGVpZ2h0LCBwYXJhbTogdGhpcy5jb21wb25lbnRQYXJhbSB9KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSAhPT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IG1vbGRTaGFwZTogeyB2ZXJ0aWNlcyB9IH0gPSBsYXN0U2VnbWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFNlZ21lbnQuYmFzZUxpbmVTZWczZCA9IHsgc3RhcnQ6IHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLCBlbmQ6IHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VnbWVudHMucHVzaChuZXh0U2VnbWVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaXJzdFNlZ21lbnQgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIEZpcnN0U2VnbWVudCksIHsgc3RhcnQ6IHBvc2l0aW9uLCBlbmQ6IHBvc2l0aW9uLCBwYXJhbTogdGhpcy5jb21wb25lbnRQYXJhbSB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VnbWVudHMucHVzaChmaXJzdFNlZ21lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZHJhd1RlbXBDb21wb25lbnQobGFzdFNlZ21lbnQpIHtcclxuICAgICAgICB2YXIgX2EsIF9iO1xyXG4gICAgICAgIGlmIChsYXN0U2VnbWVudC5zdGFydExvY2tlZCkge1xyXG4gICAgICAgICAgICBnZW5lcmF0ZVRlbXBTaGFwZShsYXN0U2VnbWVudCwgdGhpcy5jb21wb25lbnRQYXJhbSwgdGhpcy5zZWdtZW50cyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgc3RhaXJTaGFwZTogeyB2ZXJ0aWNlczogc3RhaXJWZXJ0aWNlcywgdGVtcExpbmVzOiBzdGFpclRlbXBMaW5lcyB9LCBtb2xkU2hhcGU6IHsgdmVydGljZXM6IG1vbGRWZXJ0aWNlcywgdGVtcExpbmVzOiBtb2xkVGVtcExpbmVzIH0sIGNvcm5lclNoYXBlOiB7IHZlcnRpY2VzOiBjb3JuZXJWZXJ0aWNlcywgdGVtcExpbmVzOiBjb3JuZXJUZW1wTGluZXMgfSwgY29ybmVyTW9sZFNoYXBlOiB7IHZlcnRpY2VzOiBjb3JuZXJNb2xkVmVydGljZXMsIHRlbXBMaW5lczogY29ybmVyTW9sZFRlbXBMaW5lcyB9LCB9ID0gbGFzdFNlZ21lbnQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlbXBMaW5lUG9pbnRzID0gW107XHJcbiAgICAgICAgICAgIGNvbnN0IG1vbGRUZW1wTGluZVBvaW50cyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHN0YWlyVGVtcExpbmUgb2Ygc3RhaXJUZW1wTGluZXMpIHtcclxuICAgICAgICAgICAgICAgIHRlbXBMaW5lUG9pbnRzLnB1c2goW3N0YWlyVmVydGljZXNbc3RhaXJUZW1wTGluZVswXV0sIHN0YWlyVmVydGljZXNbc3RhaXJUZW1wTGluZVsxXV1dKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNvcm5lclRlbXBMaW5lIG9mIGNvcm5lclRlbXBMaW5lcykge1xyXG4gICAgICAgICAgICAgICAgdGVtcExpbmVQb2ludHMucHVzaChbY29ybmVyVmVydGljZXNbY29ybmVyVGVtcExpbmVbMF1dLCBjb3JuZXJWZXJ0aWNlc1tjb3JuZXJUZW1wTGluZVsxXV1dKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG1vbGRUZW1wTGluZSBvZiBtb2xkVGVtcExpbmVzKSB7XHJcbiAgICAgICAgICAgICAgICBtb2xkVGVtcExpbmVQb2ludHMucHVzaChbbW9sZFZlcnRpY2VzW21vbGRUZW1wTGluZVswXV0sIG1vbGRWZXJ0aWNlc1ttb2xkVGVtcExpbmVbMV1dXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChjb25zdCBjb3JuZXJNb2xkVGVtcExpbmUgb2YgY29ybmVyTW9sZFRlbXBMaW5lcykge1xyXG4gICAgICAgICAgICAgICAgbW9sZFRlbXBMaW5lUG9pbnRzLnB1c2goW2Nvcm5lck1vbGRWZXJ0aWNlc1tjb3JuZXJNb2xkVGVtcExpbmVbMF1dLCBjb3JuZXJNb2xkVmVydGljZXNbY29ybmVyTW9sZFRlbXBMaW5lWzFdXV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgoX2EgPSBsYXN0U2VnbWVudC50ZW1wU2hhcGVJZCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgYXBwVmlldy5jbGVhclRlbXBvcmFyeVNoYXBlc0J5SWRzKGxhc3RTZWdtZW50LnRlbXBTaGFwZUlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGVtcExpbmVQb2ludHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0ZW1wU2hhcGVJZCA9IGFwcFZpZXcuZHJhd1BvbHlsaW5lcyh0ZW1wTGluZVBvaW50cywgeyBjb2xvcjogeyByOiAyNTUsIGc6IDAsIGI6IDAgfSwgZGVwdGhUZXN0OiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgIGlmICh0ZW1wU2hhcGVJZCA9PT0gbnVsbCB8fCB0ZW1wU2hhcGVJZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogdGVtcFNoYXBlSWQuaWRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQudGVtcFNoYXBlSWQgPSB0ZW1wU2hhcGVJZC5pZHM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtb2xkVGVtcFNoYXBlSWQgPSBhcHBWaWV3LmRyYXdQb2x5bGluZXMobW9sZFRlbXBMaW5lUG9pbnRzLCB7IGNvbG9yOiB7IHI6IDAsIGc6IDI1NSwgYjogMCB9IH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vbGRUZW1wU2hhcGVJZCA9PT0gbnVsbCB8fCBtb2xkVGVtcFNoYXBlSWQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1vbGRUZW1wU2hhcGVJZC5pZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKF9iID0gbGFzdFNlZ21lbnQudGVtcFNoYXBlSWQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQudGVtcFNoYXBlSWQucHVzaCguLi5tb2xkVGVtcFNoYXBlSWQuaWRzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LnRlbXBTaGFwZUlkID0gbW9sZFRlbXBTaGFwZUlkLmlkcztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjaGFuZ2VDb21wb25lbnRQYXJhbShjb21wb25lbnRQYXJhbSwgY2hhbmdlUGFyYW1zKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VnbWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxhc3RTZWdtZW50ID0gdGhpcy5zZWdtZW50c1t0aGlzLnNlZ21lbnRzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICBjb25zdCB7IHN0YXJ0V2lkdGg6IG5ld1dpZHRoIH0gPSBjb21wb25lbnRQYXJhbTtcclxuICAgICAgICAgICAgY29uc3QgeyBzdGFydCwgcGFyYW06IHsgc3RhcnRXaWR0aCwgdHlwZSwgb2Zmc2V0V2lkdGggfSwgYmFzZUxpbmVTZWczZCB9ID0gbGFzdFNlZ21lbnQ7XHJcbiAgICAgICAgICAgIGlmIChjaGFuZ2VQYXJhbXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuU3RhcnRXaWR0aCkgPiAtMSAmJiB0eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtICYmIGJhc2VMaW5lU2VnM2QgJiYgb2Zmc2V0V2lkdGggIT09IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1N0YXJ0V2lkdGggPSBNYXRoLmNlaWwoc3RhcnRXaWR0aCAvIChzdGFydFdpZHRoICsgTWF0aC5hYnMob2Zmc2V0V2lkdGgpKSAqIG5ld1dpZHRoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNpZ24gPSBvZmZzZXRXaWR0aCAvIE1hdGguYWJzKG9mZnNldFdpZHRoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5ld09mZnNldFdpZHRoID0gc2lnbiAqIChuZXdXaWR0aCAtIG5ld1N0YXJ0V2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYmFzZURpciA9IGJhc2VMaW5lU2VnM2QuZW5kLnN1YnRyYWN0ZWQoYmFzZUxpbmVTZWczZC5zdGFydCkubm9ybWFsaXplZCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3RW5kID0gc3RhcnQuYWRkZWQoYmFzZURpci5tdWx0aXBsaWVkKHNpZ24gKiAobmV3U3RhcnRXaWR0aCAvIDIgKyBNYXRoLmFicyhuZXdPZmZzZXRXaWR0aCkpKSk7XHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnRQYXJhbS5zdGFydFdpZHRoID0gbmV3U3RhcnRXaWR0aDtcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudFBhcmFtLmVuZFdpZHRoID0gbmV3U3RhcnRXaWR0aDtcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudFBhcmFtLm9mZnNldFdpZHRoID0gbmV3T2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5lbmQgPSBuZXdFbmQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRQYXJhbSA9IGNvbXBvbmVudFBhcmFtO1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdUZW1wQ29tcG9uZW50KGxhc3RTZWdtZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjaGFuZ2VDb21wb25lbnRUeXBlKGNvbXBvbmVudFR5cGUpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudFBhcmFtLnR5cGUgPSBjb21wb25lbnRUeXBlO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlQ29tcG9uZW50UGFyYW0odGhpcy5jb21wb25lbnRQYXJhbSwgW0NvbXBvbmVudFBhcmFtVHlwZS5UeXBlXSk7XHJcbiAgICB9XHJcbiAgICB0cnlDb21taXQoKSB7XHJcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XHJcbiAgICAgICAgY29uc3QgbWVzaGVzID0gZ2VuZXJhdGVNZXNoZXModGhpcy5zZWdtZW50cyk7XHJcbiAgICAgICAgaWYgKG1lc2hlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZGVzaWduLnN0YXJ0T3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0luc3RhbmNlcyA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgb3BlcmF0aW9uU3VjY2VzcyA9IHRydWU7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgeyBzdGFydCwgZW5kLCBzdGFydEhlaWdodCwgZW5kSGVpZ2h0LCBiYXNlTGluZVNlZzNkLCBwYXJhbSwgbWVzaCB9IG9mIHRoaXMuc2VnbWVudHMpIHtcclxuICAgICAgICAgICAgICAgIGlmICghb3BlcmF0aW9uU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2lnbi5hYm9ydE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChtZXNoID09PSBudWxsIHx8IG1lc2ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1lc2gudmVydGljZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3U2hlbGwgPSAoX2EgPSBkZXNpZ24uY3JlYXRlU2hlbGxGcm9tTWVzaChtZXNoKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm5ld1NoZWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICEhbmV3U2hlbGw7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld1NoZWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0luc3RhbmNlID0gKF9iID0gZGVzaWduLm1ha2VHcm91cChuZXdTaGVsbC5nZXRGYWNlcygpLCBbXSwgW10pKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuYWRkZWRJbnN0YW5jZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgISFuZXdJbnN0YW5jZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZ3JvdXBEZWYgPSBuZXdJbnN0YW5jZSA9PT0gbnVsbCB8fCBuZXdJbnN0YW5jZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogbmV3SW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdJbnN0YW5jZSAmJiBncm91cERlZikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3SW5zdGFuY2VzLnB1c2gobmV3SW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyYW1TdHJpbmcgPSBzdHJpbmdpZnlQYXJhbShwYXJhbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFydEVuZFN0cmluZyA9IHN0cmluZ2lmeVN0YXJ0RW5kKEdlb21MaWIuY3JlYXRlUG9pbnQzZChzdGFydC54LCBzdGFydC55LCBzdGFydEhlaWdodCksIEdlb21MaWIuY3JlYXRlUG9pbnQzZChlbmQueCwgZW5kLnksIGVuZEhlaWdodCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZ3JvdXBEZWYuc2V0Q3VzdG9tUHJvcGVydHkoUGFyYW1LZXksIHBhcmFtU3RyaW5nKS5pc1N1Y2Nlc3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBncm91cERlZi5zZXRDdXN0b21Qcm9wZXJ0eShTdGFydEVuZEtleSwgc3RhcnRFbmRTdHJpbmcpLmlzU3VjY2VzcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiYXNlTGluZVNlZzNkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgQmFzZUxpbmVTdHJpbmcgPSBzdHJpbmdpZnlTdGFydEVuZChiYXNlTGluZVNlZzNkLnN0YXJ0LCBiYXNlTGluZVNlZzNkLmVuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZ3JvdXBEZWYuc2V0Q3VzdG9tUHJvcGVydHkoQmFzZUxpbmVTZWczZEtleSwgQmFzZUxpbmVTdHJpbmcpLmlzU3VjY2VzcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobmV3SW5zdGFuY2VzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyZW50SW5zdGFuY2UgPSAoX2MgPSBkZXNpZ24ubWFrZUdyb3VwKFtdLCBuZXdJbnN0YW5jZXMsIFtdKSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmFkZGVkSW5zdGFuY2U7XHJcbiAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAhIXBhcmVudEluc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyZW50RGVmID0gcGFyZW50SW5zdGFuY2UgPT09IG51bGwgfHwgcGFyZW50SW5zdGFuY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBhcmVudEluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudEluc3RhbmNlICYmIHBhcmVudERlZikge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIHBhcmVudERlZi5zZXRDdXN0b21Qcm9wZXJ0eShTdGFpck1vZGVsS2V5LCAnRHJhd1N0YWlyTW9kZWwnKS5pc1N1Y2Nlc3M7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG9wZXJhdGlvblN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIGRlc2lnbi5jb21taXRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRlc2lnbi5hYm9ydE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xlYXIoKSB7XHJcbiAgICAgICAgYXBwVmlldy5jbGVhclRlbXBvcmFyeVNoYXBlcygpO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50UGFyYW0gPSBPYmplY3QuYXNzaWduKHt9LCBEZWZhdWx0Q29tcG9uZW50UGFyYW0pO1xyXG4gICAgICAgIHRoaXMuc2VnbWVudHMgPSBbXTtcclxuICAgIH1cclxuICAgIG9uUkJ1dHRvblVwKGV2ZW50LCBpbmZlcmVuY2VSZXN1bHQpIHtcclxuICAgICAgICB0aGlzLnRyeUNvbW1pdCgpO1xyXG4gICAgfVxyXG4gICAgb25MQnV0dG9uRGJDbGljayhldmVudCwgaW5mZXJlbmNlUmVzdWx0KSB7XHJcbiAgICAgICAgO1xyXG4gICAgfVxyXG4gICAgYWxsb3dVc2luZ0luZmVyZW5jZSgpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIG9uS2V5RG93bihldmVudCkge1xyXG4gICAgICAgIDtcclxuICAgIH1cclxuICAgIG9uS2V5VXAoZXZlbnQpIHtcclxuICAgICAgICA7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNvbnN0IGRyYXdTdGFpcnNUb29sID0gbmV3IERyYXdTdGFpcnNUb29sKCk7XHJcbiIsImltcG9ydCB7IENvbXBvbmVudFR5cGUgfSBmcm9tIFwiLi90eXBlc1wiO1xyXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVNZXNoZXMoc2VnbWVudHMpIHtcclxuICAgIGNvbnN0IG1lc2hlcyA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBzZWdtZW50IG9mIHNlZ21lbnRzKSB7XHJcbiAgICAgICAgaWYgKHNlZ21lbnQucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xyXG4gICAgICAgICAgICBnZW5lcmF0ZVBsYXRmb3JtTWVzaChzZWdtZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGdlbmVyYXRlU3RhaXJNZXNoKHNlZ21lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2VnbWVudC5tZXNoKSB7XHJcbiAgICAgICAgICAgIG1lc2hlcy5wdXNoKHNlZ21lbnQubWVzaCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1lc2hlcztcclxufVxyXG5mdW5jdGlvbiBnZW5lcmF0ZVN0YWlyTWVzaChzZWdtZW50KSB7XHJcbiAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oLCBfaiwgX2ssIF9sO1xyXG4gICAgY29uc3QgeyBzdGFpclNoYXBlOiB7IHZlcnRpY2VzLCBzdGVwQ291bnQgfSwgY29ybmVyU2hhcGU6IHsgdmVydGljZXM6IGNvcm5lclZlcnRpY2VzIH0sIHBhcmFtOiB7IHVwd2FyZCB9IH0gPSBzZWdtZW50O1xyXG4gICAgaWYgKHN0ZXBDb3VudCA8IDEpXHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IHN0YWlyTWVzaCA9IHtcclxuICAgICAgICB2ZXJ0aWNlczogdmVydGljZXMubWFwKHZlcnRleCA9PiBbdmVydGV4LngsIHZlcnRleC55LCB2ZXJ0ZXguel0pLFxyXG4gICAgICAgIHRyaWFuZ2xlSW5kaWNlczogW10sXHJcbiAgICAgICAgc29mdEVkZ2VzOiBbXSxcclxuICAgIH07XHJcbiAgICBjb25zdCBsYXN0TGVmdEluZGV4ID0gdmVydGljZXMubGVuZ3RoIC8gMiAtIDE7XHJcbiAgICBjb25zdCBsZWZ0SW5kZXggPSB2ZXJ0aWNlcy5sZW5ndGggLyAyIC0gKCghdXB3YXJkICYmIHN0ZXBDb3VudCA+IDEpID8gMiA6IDEpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGVwQ291bnQ7IGkrKykge1xyXG4gICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcclxuICAgICAgICAvLyBzdGFpciBmYWNlc1xyXG4gICAgICAgIFtpICogNCwgaSAqIDQgKyAxLCBpICogNCArIDJdLCBbaSAqIDQgKyAxLCBpICogNCArIDMsIGkgKiA0ICsgMl0sIFtpICogNCArIDIsIGkgKiA0ICsgMywgaSAqIDQgKyA0XSwgW2kgKiA0ICsgMywgaSAqIDQgKyA1LCBpICogNCArIDRdLCBcclxuICAgICAgICAvLyBzaWRlIGZhY2VzXHJcbiAgICAgICAgW2kgKiA0LCBpICogNCArIDIsIChpICsgMSkgKiA0XSwgW2kgKiA0ICsgMSwgKGkgKyAxKSAqIDQgKyAxLCBpICogNCArIDNdKTtcclxuICAgICAgICAoX2EgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucHVzaChbaSAqIDQgKyAxLCBpICogNCArIDJdLCBbaSAqIDQgKyAzLCBpICogNCArIDRdLCBbaSAqIDQsIChpICsgMSkgKiA0XSk7XHJcbiAgICAgICAgaWYgKGkgPT09IHN0ZXBDb3VudCAtIDEgJiYgdXB3YXJkICYmIHN0ZXBDb3VudCA+IDEpIHtcclxuICAgICAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxyXG4gICAgICAgICAgICAvLyB0YWlsIHNpZGUgZmFjZXNcclxuICAgICAgICAgICAgW2xhc3RMZWZ0SW5kZXgsIGkgKiA0LCAoaSArIDEpICogNF0sIFtsYXN0TGVmdEluZGV4ICsgMSwgKGkgKyAxKSAqIDQgKyAxLCBpICogNCArIDFdKTtcclxuICAgICAgICAgICAgKF9iID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnB1c2goW2xhc3RMZWZ0SW5kZXgsIGkgKiA0XSwgW2kgKiA0LCAoaSArIDEpICogNF0sIFtsYXN0TGVmdEluZGV4ICsgMSwgaSAqIDQgKyAxXSwgWyhpICsgMSkgKiA0ICsgMSwgaSAqIDQgKyAxXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXHJcbiAgICAgICAgICAgIC8vIHNpZGUgZmFjZXNcclxuICAgICAgICAgICAgW2xlZnRJbmRleCwgaSAqIDQsIChpICsgMSkgKiA0XSwgW2xlZnRJbmRleCArIDEsIChpICsgMSkgKiA0ICsgMSwgaSAqIDQgKyAxXSk7XHJcbiAgICAgICAgICAgIChfYyA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5wdXNoKFtpICogNCwgKGkgKyAxKSAqIDRdLCBbKGkgKyAxKSAqIDQgKyAxLCBpICogNCArIDFdKTtcclxuICAgICAgICAgICAgaWYgKHVwd2FyZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKF9kID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLnB1c2goW2xlZnRJbmRleCwgaSAqIDRdLCBbbGVmdEluZGV4ICsgMSwgaSAqIDQgKyAxXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RlcENvdW50ID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIChfZSA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS5wdXNoKFtsZWZ0SW5kZXgsIChpICsgMSkgKiA0XSwgW2xlZnRJbmRleCArIDEsIChpICsgMSkgKiA0ICsgMV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0ZXBDb3VudCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAoX2YgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2YucHVzaChbbGVmdEluZGV4LCBpICogNF0sIFtsZWZ0SW5kZXggKyAxLCBpICogNCArIDFdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpIDwgc3RlcENvdW50IC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIChfZyA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9nID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZy5wdXNoKFtsZWZ0SW5kZXgsIChpICsgMSkgKiA0XSwgW2xlZnRJbmRleCArIDEsIChpICsgMSkgKiA0ICsgMV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHVwd2FyZCkge1xyXG4gICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcclxuICAgICAgICAvLyBib3R0b20gZmFjZXNcclxuICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gMSwgMSwgMF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCAwLCB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDEsIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbdmVydGljZXMubGVuZ3RoIC0gMywgdmVydGljZXMubGVuZ3RoIC0gMiwgdmVydGljZXMubGVuZ3RoIC0gNF0pO1xyXG4gICAgICAgIChfaCA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9oID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfaC5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCAwXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDJdKTtcclxuICAgICAgICBpZiAoc3RlcENvdW50ID4gMSkge1xyXG4gICAgICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXHJcbiAgICAgICAgICAgIC8vIHNpZGUgYm90dG9tIGZhY2VzXHJcbiAgICAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSAyLCB2ZXJ0aWNlcy5sZW5ndGggLSAxMCwgdmVydGljZXMubGVuZ3RoIC0gNF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCB2ZXJ0aWNlcy5sZW5ndGggLSAzLCB2ZXJ0aWNlcy5sZW5ndGggLSA5XSwgXHJcbiAgICAgICAgICAgIC8vIGJvdHRvbSBmYWNlc1xyXG4gICAgICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gNSwgdmVydGljZXMubGVuZ3RoIC0gMywgdmVydGljZXMubGVuZ3RoIC0gNF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSA1LCB2ZXJ0aWNlcy5sZW5ndGggLSA0LCB2ZXJ0aWNlcy5sZW5ndGggLSA2XSk7XHJcbiAgICAgICAgICAgIChfaiA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9qID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfai5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSA1LCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIHZlcnRpY2VzLmxlbmd0aCAtIDEwXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDEwLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxyXG4gICAgICAgIC8vIGJvdHRvbSBmYWNlc1xyXG4gICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCAwLCAxXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDBdLCBbdmVydGljZXMubGVuZ3RoIC0gMywgdmVydGljZXMubGVuZ3RoIC0gMiwgdmVydGljZXMubGVuZ3RoIC0gMV0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAzLCB2ZXJ0aWNlcy5sZW5ndGggLSA0LCB2ZXJ0aWNlcy5sZW5ndGggLSAyXSk7XHJcbiAgICAgICAgKF9rID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2sgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9rLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIDBdLCBbdmVydGljZXMubGVuZ3RoIC0gMywgdmVydGljZXMubGVuZ3RoIC0gMl0pO1xyXG4gICAgICAgIGlmIChzdGVwQ291bnQgPiAxKSB7XHJcbiAgICAgICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcclxuICAgICAgICAgICAgLy8gc2lkZSBib3R0b20gZmFjZXNcclxuICAgICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIDAsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLCBbdmVydGljZXMubGVuZ3RoIC0gMSwgdmVydGljZXMubGVuZ3RoIC0gMywgMV0sIFxyXG4gICAgICAgICAgICAvLyBib3R0b20gZmFjZXNcclxuICAgICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDQsIHZlcnRpY2VzLmxlbmd0aCAtIDNdLCBbdmVydGljZXMubGVuZ3RoIC0gNSwgdmVydGljZXMubGVuZ3RoIC0gNiwgdmVydGljZXMubGVuZ3RoIC0gNF0pO1xyXG4gICAgICAgICAgICAoX2wgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2wucHVzaChbdmVydGljZXMubGVuZ3RoIC0gNSwgdmVydGljZXMubGVuZ3RoIC0gNF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAzLCAxXSwgWzAsIHZlcnRpY2VzLmxlbmd0aCAtIDRdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoY29ybmVyVmVydGljZXMubGVuZ3RoID09PSA2KSB7XHJcbiAgICAgICAgZ2VuZXJhdGVQb2x5Z29uTWVzaChjb3JuZXJWZXJ0aWNlcywgc3RhaXJNZXNoKTtcclxuICAgIH1cclxuICAgIHNlZ21lbnQubWVzaCA9IHN0YWlyTWVzaDtcclxufVxyXG5mdW5jdGlvbiBnZW5lcmF0ZVBsYXRmb3JtTWVzaChzZWdtZW50KSB7XHJcbiAgICBjb25zdCB7IHN0YWlyU2hhcGU6IHsgdmVydGljZXMgfSB9ID0gc2VnbWVudDtcclxuICAgIGNvbnN0IHZlcnRleExlbmd0aCA9IHZlcnRpY2VzLmxlbmd0aCAvIDI7XHJcbiAgICBpZiAodmVydGV4TGVuZ3RoID09PSA0IHx8IHZlcnRleExlbmd0aCA9PT0gNSkge1xyXG4gICAgICAgIGNvbnN0IHBsYXRmb3JtTWVzaCA9IHtcclxuICAgICAgICAgICAgdmVydGljZXM6IHZlcnRpY2VzLm1hcCh2ZXJ0ZXggPT4gW3ZlcnRleC54LCB2ZXJ0ZXgueSwgdmVydGV4LnpdKSxcclxuICAgICAgICAgICAgdHJpYW5nbGVJbmRpY2VzOiBbXSxcclxuICAgICAgICAgICAgc29mdEVkZ2VzOiBbXSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGdlbmVyYXRlUG9seWdvbk1lc2godmVydGljZXMsIHBsYXRmb3JtTWVzaCk7XHJcbiAgICAgICAgc2VnbWVudC5tZXNoID0gcGxhdGZvcm1NZXNoO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxufVxyXG5mdW5jdGlvbiBnZW5lcmF0ZVBvbHlnb25NZXNoKHZlcnRpY2VzLCBtZXNoKSB7XHJcbiAgICB2YXIgX2EsIF9iO1xyXG4gICAgY29uc3QgdmVydGV4TGVuZ3RoID0gbWVzaC52ZXJ0aWNlcy5sZW5ndGg7XHJcbiAgICBtZXNoLnZlcnRpY2VzLnB1c2goLi4udmVydGljZXMubWFwKHZlcnRleCA9PiBbdmVydGV4LngsIHZlcnRleC55LCB2ZXJ0ZXguel0pKTtcclxuICAgIGNvbnN0IHNlZ0NvdW50ID0gdmVydGljZXMubGVuZ3RoIC8gMjtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VnQ291bnQ7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHJpZ2h0ID0gaSA9PT0gc2VnQ291bnQgLSAxID8gMCA6IGkgKyAxO1xyXG4gICAgICAgIGNvbnN0IGJvdHRvbVJpZ2h0ID0gaSA9PT0gc2VnQ291bnQgLSAxID8gc2VnQ291bnQgOiBpICsgc2VnQ291bnQgKyAxO1xyXG4gICAgICAgIG1lc2gudmVydGljZXMucHVzaChbaSArIHZlcnRleExlbmd0aCwgaSArIHNlZ0NvdW50ICsgdmVydGV4TGVuZ3RoLCBib3R0b21SaWdodCArIHZlcnRleExlbmd0aF0sIFtpICsgdmVydGV4TGVuZ3RoLCBib3R0b21SaWdodCArIHZlcnRleExlbmd0aCwgcmlnaHQgKyB2ZXJ0ZXhMZW5ndGhdKTtcclxuICAgICAgICAoX2EgPSBtZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnB1c2goW2kgKyB2ZXJ0ZXhMZW5ndGgsIGJvdHRvbVJpZ2h0ICsgdmVydGV4TGVuZ3RoXSk7XHJcbiAgICAgICAgaWYgKGkgPiAwICYmIGkgPCBzZWdDb3VudCAtIDEpIHtcclxuICAgICAgICAgICAgbWVzaC52ZXJ0aWNlcy5wdXNoKFtpICsgdmVydGV4TGVuZ3RoLCByaWdodCArIHZlcnRleExlbmd0aCwgMCArIHZlcnRleExlbmd0aF0sIFtib3R0b21SaWdodCArIHZlcnRleExlbmd0aCwgaSArIHZlcnRleExlbmd0aCwgc2VnQ291bnQgKyB2ZXJ0ZXhMZW5ndGhdKTtcclxuICAgICAgICAgICAgaWYgKGkgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAoX2IgPSBtZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnB1c2goW2ksIDAgKyB2ZXJ0ZXhMZW5ndGhdLCBbaSArIHNlZ0NvdW50ICsgdmVydGV4TGVuZ3RoLCBzZWdDb3VudCArIHZlcnRleExlbmd0aF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IEFuZ2xlVG9sZXJhbmNlLCBEaXJlY3Rpb25aLCBMZW5ndGhUb2xlcmFuY2UgfSBmcm9tIFwiLi9jb25zdHNcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50VHlwZSB9IGZyb20gXCIuL3R5cGVzXCI7XHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVRlbXBTaGFwZShzZWdtZW50LCBjb21wb25lbnRQYXJhbSwgc2VnbWVudHMpIHtcclxuICAgIGNvbnN0IHsgdHlwZSB9ID0gY29tcG9uZW50UGFyYW07XHJcbiAgICBpZiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyIHx8IHR5cGUgPT09IENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpcikge1xyXG4gICAgICAgIGdlbmVyYXRlVGVtcFN0YWlyU2hhcGUoc2VnbWVudCwgY29tcG9uZW50UGFyYW0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgZ2VuZXJhdGVUZW1wUGxhdGZvcm1TaGFwZShzZWdtZW50LCBjb21wb25lbnRQYXJhbSwgc2VnbWVudHMpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGdlbmVyYXRlVGVtcFN0YWlyU2hhcGUoc2VnbWVudCwgY29tcG9uZW50UGFyYW0pIHtcclxuICAgIGNvbnN0IHsgc3RhcnQsIGVuZCwgc3RhaXJTaGFwZSwgbW9sZFNoYXBlLCBjb3JuZXJTaGFwZSwgY29ybmVyTW9sZFNoYXBlLCBzdGFydEhlaWdodCwgYmFzZUxpbmVTZWczZCB9ID0gc2VnbWVudDtcclxuICAgIGNvbnN0IHsgc3RhcnRXaWR0aCwgZW5kV2lkdGgsIHR5cGUsIGhvcml6b250YWxTdGVwLCB2ZXJ0aWNhbFN0ZXAsIHVwd2FyZCwgcGxhdGZvcm1UaGlja25lc3MgfSA9IGNvbXBvbmVudFBhcmFtO1xyXG4gICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFtdO1xyXG4gICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXTtcclxuICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtdO1xyXG4gICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtdO1xyXG4gICAgY29ybmVyU2hhcGUudmVydGljZXMgPSBbXTtcclxuICAgIGNvcm5lclNoYXBlLnRlbXBMaW5lcyA9IFtdO1xyXG4gICAgY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzID0gW107XHJcbiAgICBjb3JuZXJNb2xkU2hhcGUudGVtcExpbmVzID0gW107XHJcbiAgICBjb25zdCB7IHZlcnRpY2VzLCB0ZW1wTGluZXMgfSA9IHN0YWlyU2hhcGU7XHJcbiAgICBjb25zdCB7IHZlcnRpY2VzOiBtb2xkVmVydGljZXMsIHRlbXBMaW5lczogbW9sZFRlbXBMaW5lcyB9ID0gbW9sZFNoYXBlO1xyXG4gICAgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpcikge1xyXG4gICAgICAgIGxldCBob3Jpem9udGFsRnJvbnREaXIgPSBlbmQuc3VidHJhY3RlZChzdGFydCkubm9ybWFsaXplZCgpO1xyXG4gICAgICAgIGxldCBob3Jpem9udGFsRGlzdGFuY2UgPSBzdGFydC5kaXN0YW5jZVRvKGVuZCk7XHJcbiAgICAgICAgY29uc3QgdmVydGljYWxGcm9udERpciA9IERpcmVjdGlvblo7XHJcbiAgICAgICAgbGV0IGhvcml6b250YWxMZWZ0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhob3Jpem9udGFsRnJvbnREaXIpO1xyXG4gICAgICAgIGlmIChiYXNlTGluZVNlZzNkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJhc2VMaW5lRGlyID0gYmFzZUxpbmVTZWczZC5lbmQuc3VidHJhY3RlZChiYXNlTGluZVNlZzNkLnN0YXJ0KS5ub3JtYWxpemVkKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFuZ2xlID0gaG9yaXpvbnRhbEZyb250RGlyLmFuZ2xlKGJhc2VMaW5lRGlyKTtcclxuICAgICAgICAgICAgY29uc3QgZGVsdGFBbmdsZSA9IE1hdGguYWJzKGFuZ2xlIC0gTWF0aC5QSSAvIDIpO1xyXG4gICAgICAgICAgICBpZiAoZGVsdGFBbmdsZSA8PSBBbmdsZVRvbGVyYW5jZSkge1xyXG4gICAgICAgICAgICAgICAgaG9yaXpvbnRhbEZyb250RGlyID0gYmFzZUxpbmVEaXIuY3Jvc3MoaG9yaXpvbnRhbEZyb250RGlyLmNyb3NzKGJhc2VMaW5lRGlyKSkubm9ybWFsaXplZCgpO1xyXG4gICAgICAgICAgICAgICAgaG9yaXpvbnRhbERpc3RhbmNlID0gaG9yaXpvbnRhbERpc3RhbmNlICogTWF0aC5jb3MoZGVsdGFBbmdsZSk7XHJcbiAgICAgICAgICAgICAgICBob3Jpem9udGFsTGVmdERpciA9IERpcmVjdGlvblouY3Jvc3MoaG9yaXpvbnRhbEZyb250RGlyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChhbmdsZSA8IE1hdGguUEkgLyAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29ybmVyQ29ubmVjdGlvblBvaW50MSA9IHN0YXJ0LmFkZGVkKGJhc2VMaW5lRGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyICogTWF0aC5zaWduKGFuZ2xlKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtzdGFydCwgc3RhcnQuYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSwgY29ybmVyQ29ubmVjdGlvblBvaW50MV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb3JuZXJDb25uZWN0aW9uUG9pbnQyID0gc3RhcnQuYWRkZWQoYmFzZUxpbmVEaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMiAqIE1hdGguc2lnbihhbmdsZSkpKTtcclxuICAgICAgICAgICAgICAgICAgICBjb3JuZXJNb2xkU2hhcGUudmVydGljZXMgPSBbc3RhcnQsIGNvcm5lckNvbm5lY3Rpb25Qb2ludDIsIHN0YXJ0LmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb3JuZXJNb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgMF1dO1xyXG4gICAgICAgICAgICAgICAgY29ybmVyU2hhcGUudmVydGljZXMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgLi4uY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzLm1hcCh2ID0+IHYuYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkpLFxyXG4gICAgICAgICAgICAgICAgICAgIC4uLmNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAodiA9PiB2LmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZChzdGFydEhlaWdodCAtIHBsYXRmb3JtVGhpY2tuZXNzKSkpLFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgIGNvcm5lclNoYXBlLnRlbXBMaW5lcyA9IFtcclxuICAgICAgICAgICAgICAgICAgICBbMCwgMV0sIFsxLCAyXSwgWzIsIDBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFszLCA0XSwgWzQsIDVdLCBbNSwgM10sXHJcbiAgICAgICAgICAgICAgICAgICAgWzAsIDNdLCBbMSwgNF0sIFsyLCA1XSxcclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc3RlcEZsb2F0Q291bnQgPSBob3Jpem9udGFsRGlzdGFuY2UgLyBob3Jpem9udGFsU3RlcDtcclxuICAgICAgICBjb25zdCBzdGVwQ291bnQgPSBNYXRoLmNlaWwoc3RlcEZsb2F0Q291bnQpO1xyXG4gICAgICAgIHNlZ21lbnQuZW5kSGVpZ2h0ID0gc2VnbWVudC5zdGFydEhlaWdodCArIHN0ZXBDb3VudCAqIHZlcnRpY2FsU3RlcDtcclxuICAgICAgICBzdGFpclNoYXBlLnN0ZXBDb3VudCA9IHN0ZXBDb3VudDtcclxuICAgICAgICBtb2xkU2hhcGUuc3RlcENvdW50ID0gc3RlcENvdW50O1xyXG4gICAgICAgIGlmIChzdGVwQ291bnQgPCAxKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgY29uc3QgbGFzdFN0ZXBMZW5ndGggPSBob3Jpem9udGFsRGlzdGFuY2UgLSAoc3RlcENvdW50IC0gMSkgKiBob3Jpem9udGFsU3RlcDtcclxuICAgICAgICBpZiAobGFzdFN0ZXBMZW5ndGggPiAwICYmIGxhc3RTdGVwTGVuZ3RoIDwgTGVuZ3RoVG9sZXJhbmNlKSB7XHJcbiAgICAgICAgICAgIHN0YWlyU2hhcGUuc3RlcENvdW50LS07XHJcbiAgICAgICAgICAgIG1vbGRTaGFwZS5zdGVwQ291bnQtLTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc3RlcEhlaWdodCA9IHVwd2FyZCA/IHZlcnRpY2FsU3RlcCA6IC12ZXJ0aWNhbFN0ZXA7XHJcbiAgICAgICAgY29uc3QgbGVmdFB0ID0gc3RhcnQuYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpO1xyXG4gICAgICAgIGNvbnN0IHJpZ2h0UHQgPSBzdGFydC5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpO1xyXG4gICAgICAgIGNvbnN0IHdpZHRoRGVsdGEgPSAoZW5kV2lkdGggLSBzdGFydFdpZHRoKSAvIDIgLyAoc3RlcEZsb2F0Q291bnQpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RlcENvdW50IC0gMTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1ckxlZnRNb2xkUHQgPSBsZWZ0UHQuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaSAqIGhvcml6b250YWxTdGVwKSkuYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZChpICogd2lkdGhEZWx0YSkpO1xyXG4gICAgICAgICAgICBjb25zdCBjdXJSaWdodE1vbGRQdCA9IHJpZ2h0UHQuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaSAqIGhvcml6b250YWxTdGVwKSkuYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZCgtaSAqIHdpZHRoRGVsdGEpKTtcclxuICAgICAgICAgICAgY29uc3QgY3VyTGVmdFB0ID0gY3VyTGVmdE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoaSAqIHN0ZXBIZWlnaHQpKTtcclxuICAgICAgICAgICAgY29uc3QgY3VyUmlnaHRQdCA9IGN1clJpZ2h0TW9sZFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCkpLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZChpICogc3RlcEhlaWdodCkpO1xyXG4gICAgICAgICAgICBtb2xkVmVydGljZXMucHVzaChjdXJMZWZ0TW9sZFB0LCBjdXJSaWdodE1vbGRQdCk7XHJcbiAgICAgICAgICAgIG1vbGRUZW1wTGluZXMucHVzaChbMiAqIGksIDEgKyAyICogaV0sIFsyICogaSwgMiArIDIgKiBpXSwgWzEgKyAyICogaSwgMyArIDIgKiBpXSk7XHJcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2goY3VyTGVmdFB0LCBjdXJSaWdodFB0KTtcclxuICAgICAgICAgICAgaWYgKHVwd2FyZCkge1xyXG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaChjdXJMZWZ0UHQuYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSwgY3VyUmlnaHRQdC5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2goY3VyTGVmdFB0LmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSksIGN1clJpZ2h0UHQuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaG9yaXpvbnRhbFN0ZXApKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzQgKiBpLCAxICsgNCAqIGldLCBbNCAqIGksIDIgKyA0ICogaV0sIFsxICsgNCAqIGksIDMgKyA0ICogaV0sIFsyICsgNCAqIGksIDMgKyA0ICogaV0sIFsyICsgNCAqIGksIDQgKyA0ICogaV0sIFszICsgNCAqIGksIDUgKyA0ICogaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtb2xkVmVydGljZXMucHVzaChzdGVwQ291bnQgPiAxID8gbW9sZFZlcnRpY2VzW21vbGRWZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpIDogbGVmdFB0LCBzdGVwQ291bnQgPiAxID8gbW9sZFZlcnRpY2VzW21vbGRWZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpIDogcmlnaHRQdCk7XHJcbiAgICAgICAgbW9sZFRlbXBMaW5lcy5wdXNoKFsyICogKHN0ZXBDb3VudCAtIDEpLCAxICsgMiAqIChzdGVwQ291bnQgLSAxKV0pO1xyXG4gICAgICAgIGlmIChsYXN0U3RlcExlbmd0aCA+IExlbmd0aFRvbGVyYW5jZSkge1xyXG4gICAgICAgICAgICBtb2xkVmVydGljZXMucHVzaChtb2xkVmVydGljZXNbbW9sZFZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcCAqIHdpZHRoRGVsdGEpKS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCkpLCBtb2xkVmVydGljZXNbbW9sZFZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoLWxhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXAgKiB3aWR0aERlbHRhKSkuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGgpKSk7XHJcbiAgICAgICAgICAgIG1vbGRUZW1wTGluZXMucHVzaChbMiAqIChzdGVwQ291bnQgLSAxKSwgMiArIDIgKiAoc3RlcENvdW50IC0gMSldLCBbMSArIDIgKiAoc3RlcENvdW50IC0gMSksIDMgKyAyICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKiBzdGVwQ291bnQsIDEgKyAyICogc3RlcENvdW50XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh1cHdhcmQpIHtcclxuICAgICAgICAgICAgdmVydGljZXMucHVzaChzdGVwQ291bnQgPiAxID8gdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaG9yaXpvbnRhbFN0ZXApKSA6IGxlZnRQdCwgc3RlcENvdW50ID4gMSA/IHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSkgOiByaWdodFB0KTtcclxuICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzQgKiAoc3RlcENvdW50IC0gMSksIDEgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSk7XHJcbiAgICAgICAgICAgIGlmIChsYXN0U3RlcExlbmd0aCA+IExlbmd0aFRvbGVyYW5jZSkge1xyXG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQodmVydGljYWxTdGVwKSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZCh2ZXJ0aWNhbFN0ZXApKSk7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcCAqIHdpZHRoRGVsdGEpKS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCkpLCB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKC1sYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwICogd2lkdGhEZWx0YSkpLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoKSkpO1xyXG4gICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAvLyBbNCAqIHN0ZXBDb3VudCwgMSArIDQgKiBzdGVwQ291bnRdLFxyXG4gICAgICAgICAgICAgICAgWzQgKiAoc3RlcENvdW50IC0gMSksIDIgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzEgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCAzICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsyICsgNCAqIChzdGVwQ291bnQgLSAxKSwgMyArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMiArIDQgKiAoc3RlcENvdW50IC0gMSksIDQgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzMgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCA1ICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFs0ICogc3RlcENvdW50LCAxICsgNCAqIHN0ZXBDb3VudF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHN0ZXBDb3VudCA+IDEgPyB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQodmVydGljYWxTdGVwKSkgOiBsZWZ0UHQsIHN0ZXBDb3VudCA+IDEgPyB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQodmVydGljYWxTdGVwKSkgOiByaWdodFB0KTtcclxuICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzQgKiAoc3RlcENvdW50IC0gMSksIDEgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSk7XHJcbiAgICAgICAgICAgIGlmIChsYXN0U3RlcExlbmd0aCA+IExlbmd0aFRvbGVyYW5jZSkge1xyXG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXAgKiB3aWR0aERlbHRhKSkuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGgpKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZCgtbGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcCAqIHdpZHRoRGVsdGEpKS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCkpKTtcclxuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKHZlcnRpY2FsU3RlcCkpLCB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQodmVydGljYWxTdGVwKSkpO1xyXG4gICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAvLyBbNCAqIChzdGVwQ291bnQgLSAxKSwgMSArIDQgKiAoc3RlcENvdW50IC0gMSldLFxyXG4gICAgICAgICAgICAgICAgWzQgKiAoc3RlcENvdW50IC0gMSksIDIgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzEgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCAzICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsyICsgNCAqIChzdGVwQ291bnQgLSAxKSwgMyArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMiArIDQgKiAoc3RlcENvdW50IC0gMSksIDQgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzMgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCA1ICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFs0ICogc3RlcENvdW50LCAxICsgNCAqIHN0ZXBDb3VudF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdGVwQ291bnQgPiAxKSB7XHJcbiAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSAyLCAyICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsxICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMiArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCA0ICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFszICsgdmVydGljZXMubGVuZ3RoIC0gMiwgNSArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbdmVydGljZXMubGVuZ3RoICsgMiwgMSArIHZlcnRpY2VzLmxlbmd0aCArIDJdLCBbdmVydGljZXMubGVuZ3RoICsgMiwgMF0sIFsxICsgdmVydGljZXMubGVuZ3RoICsgMiwgMV0pO1xyXG4gICAgICAgICAgICBpZiAodXB3YXJkKSB7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZCgtc3RlcEhlaWdodCAtICgxIC0gbGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcCkgKiBzdGVwSGVpZ2h0KSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZCgtc3RlcEhlaWdodCAtICgxIC0gbGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcCkgKiBzdGVwSGVpZ2h0KSkpO1xyXG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1swXS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpLCB2ZXJ0aWNlc1sxXS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoLWxhc3RTdGVwTGVuZ3RoKSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKC1sYXN0U3RlcExlbmd0aCkpKTtcclxuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbMF0uYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSwgdmVydGljZXNbMV0uYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSAyLCAyICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsxICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMiArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAwXSwgWzMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAxXSk7XHJcbiAgICAgICAgICAgIGlmICh1cHdhcmQpIHtcclxuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0KSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZCgtc3RlcEhlaWdodCkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbMF0uYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSwgdmVydGljZXNbMV0uYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBnZW5lcmF0ZVRlbXBQbGF0Zm9ybVNoYXBlKHNlZ21lbnQsIGNvbXBvbmVudFBhcmFtLCBzZWdtZW50cykge1xyXG4gICAgY29uc3QgeyBzdGFydFdpZHRoLCBwbGF0Zm9ybVRoaWNrbmVzcyB9ID0gY29tcG9uZW50UGFyYW07XHJcbiAgICBjb25zdCB7IHN0YXJ0LCBlbmQsIHN0YWlyU2hhcGUsIG1vbGRTaGFwZSB9ID0gc2VnbWVudDtcclxuICAgIGNvbnN0IGN1ckRpciA9IGVuZC5zdWJ0cmFjdGVkKHN0YXJ0KTtcclxuICAgIGNvbnN0IGN1ckxlZnREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKGN1ckRpcikubm9ybWFsaXplZCgpO1xyXG4gICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFtdO1xyXG4gICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXTtcclxuICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtdO1xyXG4gICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtdO1xyXG4gICAgaWYgKHNlZ21lbnRzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICBjb25zdCBwcmVTdGFpclNlZ21lbnQgPSBzZWdtZW50c1tzZWdtZW50cy5sZW5ndGggLSAyXTtcclxuICAgICAgICAvLyBpZiAocHJlU3RhaXJTZWdtZW50LnR5cGUgPT09IENvbXBvbmVudFR5cGUuU3RhaXIpIHtcclxuICAgICAgICBjb25zdCB7IHN0YXJ0OiBwcmV2U3RhcnQsIGVuZDogcHJldkVuZCwgcGFyYW06IHByZXZQYXJhbSwgbW9sZFNoYXBlOiBwcmV2TW9sZFNoYXBlLCBlbmRIZWlnaHQ6IHByZXZFbmRIZWlnaHQgfSA9IHByZVN0YWlyU2VnbWVudDtcclxuICAgICAgICBjb25zdCBwcmV2RGlyTm9ybWFsaXplZCA9IHByZXZFbmQuc3VidHJhY3RlZChwcmV2U3RhcnQpLm5vcm1hbGl6ZWQoKTtcclxuICAgICAgICBjb25zdCBwcmV2TGVmdERpciA9IERpcmVjdGlvblouY3Jvc3MocHJldkRpck5vcm1hbGl6ZWQpLm5vcm1hbGl6ZWQoKTtcclxuICAgICAgICBjb25zdCBhbmdsZSA9IGN1ckRpci5hbmdsZVRvKHByZXZEaXJOb3JtYWxpemVkLCBEaXJlY3Rpb25aKTtcclxuICAgICAgICBjb25zdCBmcm9udExlbmd0aCA9IGN1ckRpci5kb3QocHJldkRpck5vcm1hbGl6ZWQpO1xyXG4gICAgICAgIGNvbnN0IGN1ckVuZExlZnRDb3JuZXIgPSBlbmQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSk7XHJcbiAgICAgICAgY29uc3QgZGlyMSA9IGN1ckVuZExlZnRDb3JuZXIuc3VidHJhY3RlZChzZWdtZW50LnN0YXJ0KTtcclxuICAgICAgICBjb25zdCBhbmdsZTEgPSBkaXIxLmFuZ2xlKGN1ckRpcik7XHJcbiAgICAgICAgaWYgKGFuZ2xlIDw9IEFuZ2xlVG9sZXJhbmNlIHx8IGFuZ2xlID49IChNYXRoLlBJICogMiAtIEFuZ2xlVG9sZXJhbmNlKSB8fCBwcmV2UGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xyXG4gICAgICAgICAgICBzZWdtZW50LmVuZCA9IHNlZ21lbnQuc3RhcnQuYWRkZWQocHJldkRpck5vcm1hbGl6ZWQubXVsdGlwbGllZChmcm9udExlbmd0aCkpO1xyXG4gICAgICAgICAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXHJcbiAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSksXHJcbiAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpLFxyXG4gICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSxcclxuICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtbMCwgMV0sIFsxLCAyXSwgWzIsIDNdLCBbMywgMF1dO1xyXG4gICAgICAgICAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gWy4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChwcmV2RW5kSGVpZ2h0KSkpLFxyXG4gICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHByZXZFbmRIZWlnaHQgLSBwbGF0Zm9ybVRoaWNrbmVzcykpKSxcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXHJcbiAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLFxyXG4gICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcy5tYXAoc2VnID0+IFtzZWdbMF0gKyA0LCBzZWdbMV0gKyA0XSksXHJcbiAgICAgICAgICAgICAgICBbMCwgNF0sIFsxLCA1XSwgWzIsIDZdLCBbMywgN10sXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoQW5nbGVUb2xlcmFuY2UgPCBhbmdsZSAmJiBhbmdsZSA8IChNYXRoLlBJIC8gMiAtIGFuZ2xlMSkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBsZWZ0Q29ubmVjdFBvaW50cyA9IFtwcmV2TW9sZFNoYXBlLnZlcnRpY2VzW3ByZXZNb2xkU2hhcGUudmVydGljZXMubGVuZ3RoIC0gMl0sIHByZXZNb2xkU2hhcGUudmVydGljZXNbcHJldk1vbGRTaGFwZS52ZXJ0aWNlcy5sZW5ndGggLSAyXV07XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhcnRXaWR0aCA8PSBwcmV2UGFyYW0uZW5kV2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsMSA9IHN0YXJ0V2lkdGggLyAyIC8gTWF0aC5jb3MoYW5nbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsMSA+IHByZXZQYXJhbS5lbmRXaWR0aCAvIDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYTEgPSBsMSAtIHByZXZQYXJhbS5lbmRXaWR0aCAvIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGMxID0gYTEgLyBNYXRoLnRhbihhbmdsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRDb25uZWN0UG9pbnRzID0gW3N0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQocHJldlBhcmFtLmVuZFdpZHRoIC8gMikpLmFkZGVkKHByZXZEaXJOb3JtYWxpemVkLm11bHRpcGxpZWQoYzEpKSwgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChwcmV2UGFyYW0uZW5kV2lkdGggLyAyKSldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdENvbm5lY3RQb2ludHMgPSBbc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChsMSkpLCBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKGwxKSldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtcclxuICAgICAgICAgICAgICAgICAgICAvLyBzdGFydC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcclxuICAgICAgICAgICAgICAgICAgICAuLi5sZWZ0Q29ubmVjdFBvaW50cyxcclxuICAgICAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMiAvIE1hdGguY29zKGFuZ2xlKSkpLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSksXHJcbiAgICAgICAgICAgICAgICAgICAgZW5kLmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpLFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgIG1vbGRTaGFwZS50ZW1wTGluZXMgPSBbWzAsIDFdLCBbMSwgMl0sIFsyLCAzXSwgWzMsIDRdLCBbNCwgMF1dO1xyXG4gICAgICAgICAgICAgICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFsuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQocHJldkVuZEhlaWdodCkpKSxcclxuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQocHJldkVuZEhlaWdodCAtIHBsYXRmb3JtVGhpY2tuZXNzKSkpLFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW1xyXG4gICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcy5tYXAoc2VnID0+IFtzZWdbMF0gKyA1LCBzZWdbMV0gKyA1XSksXHJcbiAgICAgICAgICAgICAgICAgICAgWzAsIDVdLCBbMSwgNl0sIFsyLCA3XSwgWzMsIDhdLCBbNCwgOV0sXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGFuZ2xlID4gKE1hdGguUEkgKiAzIC8gMiArIGFuZ2xlMSkpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnN0IHJpZ2h0Q29ubmVjdFBvaW50ID0gc3RhcnRXaWR0aCA+IHByZXZQYXJhbS5lbmRXaWR0aCA/IHByZXZNb2xkU2hhcGUudmVydGljZXNbcHJldk1vbGRTaGFwZS52ZXJ0aWNlcy5sZW5ndGggLSAxXSA6XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIgKiBNYXRoLmNvcyhhbmdsZSkpKTtcclxuICAgICAgICAgICAgICAgIGxldCByaWdodENvbm5lY3RQb2ludHMgPSBbcHJldk1vbGRTaGFwZS52ZXJ0aWNlc1twcmV2TW9sZFNoYXBlLnZlcnRpY2VzLmxlbmd0aCAtIDFdLCBwcmV2TW9sZFNoYXBlLnZlcnRpY2VzW3ByZXZNb2xkU2hhcGUudmVydGljZXMubGVuZ3RoIC0gMV1dO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXJ0V2lkdGggPD0gcHJldlBhcmFtLmVuZFdpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbDIgPSBzdGFydFdpZHRoIC8gMiAvIE1hdGguY29zKGFuZ2xlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobDIgPiBwcmV2UGFyYW0uZW5kV2lkdGggLyAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGEyID0gbDIgLSBwcmV2UGFyYW0uZW5kV2lkdGggLyAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjMiA9IGEyIC8gTWF0aC50YW4oTWF0aC5QSSAqIDIgLSBhbmdsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0Q29ubmVjdFBvaW50cyA9IFtzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC1wcmV2UGFyYW0uZW5kV2lkdGggLyAyKSksIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLXByZXZQYXJhbS5lbmRXaWR0aCAvIDIpKS5hZGRlZChwcmV2RGlyTm9ybWFsaXplZC5tdWx0aXBsaWVkKGMyKSldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHRDb25uZWN0UG9pbnRzID0gW3N0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLWwyKSksIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLWwyKSldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyIC8gTWF0aC5jb3MoYW5nbGUpKSksXHJcbiAgICAgICAgICAgICAgICAgICAgLi4ucmlnaHRDb25uZWN0UG9pbnRzLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHN0YXJ0LmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSxcclxuICAgICAgICAgICAgICAgICAgICBlbmQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgM10sIFszLCA0XSwgWzQsIDBdXTtcclxuICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHByZXZFbmRIZWlnaHQpKSksXHJcbiAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHByZXZFbmRIZWlnaHQgLSBwbGF0Zm9ybVRoaWNrbmVzcykpKSxcclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICBzdGFpclNoYXBlLnRlbXBMaW5lcyA9IFtcclxuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLFxyXG4gICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMubWFwKHNlZyA9PiBbc2VnWzBdICsgNSwgc2VnWzFdICsgNV0pLFxyXG4gICAgICAgICAgICAgICAgICAgIFswLCA1XSwgWzEsIDZdLCBbMiwgN10sIFszLCA4XSwgWzQsIDldLFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChhbmdsZSA+PSBNYXRoLlBJKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZEZyb250TGVuZ3RoID0gTWF0aC5tYXgoc3RhcnRXaWR0aCwgZnJvbnRMZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZnJvbnRFbmQgPSBzZWdtZW50LnN0YXJ0LmFkZGVkKHByZXZEaXJOb3JtYWxpemVkLm11bHRpcGxpZWQodmFsaWRGcm9udExlbmd0aCkpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGVmdExlbmd0aCA9IGN1ckRpci5kb3QocHJldkxlZnREaXIpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsaWRMZWZ0TGVuZ3RoID0gTWF0aC5tYXgoc3RhcnRXaWR0aCAvIDIsIGxlZnRMZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxlZnRMZW5ndGggPCBzdGFydFdpZHRoIC8gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kID0gZnJvbnRFbmQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LmVuZCA9IHNlZ21lbnQuc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChsZWZ0TGVuZ3RoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBjb21wb25lbnRQYXJhbS5zdGFydFdpZHRoID0gdmFsaWRMZWZ0TGVuZ3RoICsgc3RhcnRXaWR0aCAvIDI7XHJcbiAgICAgICAgICAgICAgICAvLyBjb21wb25lbnRQYXJhbS5lbmRXaWR0aCA9IHZhbGlkTGVmdExlbmd0aCArIHN0YXJ0V2lkdGggLyAyO1xyXG4gICAgICAgICAgICAgICAgbW9sZFNoYXBlLnZlcnRpY2VzID0gW1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQodmFsaWRMZWZ0TGVuZ3RoKSksXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSxcclxuICAgICAgICAgICAgICAgICAgICBmcm9udEVuZC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpLFxyXG4gICAgICAgICAgICAgICAgICAgIGZyb250RW5kLmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQodmFsaWRMZWZ0TGVuZ3RoKSksXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtbMCwgMV0sIFsxLCAyXSwgWzIsIDNdLCBbMywgMF1dO1xyXG4gICAgICAgICAgICAgICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFsuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQocHJldkVuZEhlaWdodCkpKSxcclxuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQocHJldkVuZEhlaWdodCAtIHBsYXRmb3JtVGhpY2tuZXNzKSkpLFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW1xyXG4gICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcy5tYXAoc2VnID0+IFtzZWdbMF0gKyA0LCBzZWdbMV0gKyA0XSksXHJcbiAgICAgICAgICAgICAgICAgICAgWzAsIDRdLCBbMSwgNV0sIFsyLCA2XSwgWzMsIDddLFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJpZ2h0TGVuZ3RoID0gLWN1ckRpci5kb3QocHJldkxlZnREaXIpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsaWRGcm9udExlbmd0aCA9IE1hdGgubWF4KHN0YXJ0V2lkdGgsIGZyb250TGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZyb250RW5kMSA9IHNlZ21lbnQuc3RhcnQuYWRkZWQocHJldkRpck5vcm1hbGl6ZWQubXVsdGlwbGllZCh2YWxpZEZyb250TGVuZ3RoKSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZFJpZ2h0TGVuZ3RoID0gTWF0aC5tYXgoc3RhcnRXaWR0aCAvIDIsIHJpZ2h0TGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIGlmIChyaWdodExlbmd0aCA8IHN0YXJ0V2lkdGggLyAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5lbmQgPSBmcm9udEVuZDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LmVuZCA9IHNlZ21lbnQuc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtcmlnaHRMZW5ndGgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIHNlZ21lbnQuZW5kID0gc2VnbWVudC5zdGFydC5hZGRlZChwcmV2RGlyTm9ybWFsaXplZC5tdWx0aXBsaWVkKHZhbGlkRnJvbnRMZW5ndGgpKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbXBvbmVudFBhcmFtLnN0YXJ0V2lkdGggPSB2YWxpZFJpZ2h0TGVuZ3RoICsgc3RhcnRXaWR0aCAvIDI7XHJcbiAgICAgICAgICAgICAgICAvLyBjb21wb25lbnRQYXJhbS5lbmRXaWR0aCA9IHZhbGlkUmlnaHRMZW5ndGggKyBzdGFydFdpZHRoIC8gMjtcclxuICAgICAgICAgICAgICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSksXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtdmFsaWRSaWdodExlbmd0aCkpLFxyXG4gICAgICAgICAgICAgICAgICAgIGZyb250RW5kMS5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC12YWxpZFJpZ2h0TGVuZ3RoKSksXHJcbiAgICAgICAgICAgICAgICAgICAgZnJvbnRFbmQxLmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgM10sIFszLCAwXV07XHJcbiAgICAgICAgICAgICAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gWy4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChwcmV2RW5kSGVpZ2h0KSkpLFxyXG4gICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChwcmV2RW5kSGVpZ2h0IC0gcGxhdGZvcm1UaGlja25lc3MpKSksXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcyxcclxuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLm1hcChzZWcgPT4gW3NlZ1swXSArIDQsIHNlZ1sxXSArIDRdKSxcclxuICAgICAgICAgICAgICAgICAgICBbMCwgNF0sIFsxLCA1XSwgWzIsIDZdLCBbMywgN10sXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtcclxuICAgICAgICAgICAgc3RhcnQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSksXHJcbiAgICAgICAgICAgIHN0YXJ0LmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSxcclxuICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpLFxyXG4gICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcclxuICAgICAgICBdO1xyXG4gICAgICAgIG1vbGRTaGFwZS50ZW1wTGluZXMgPSBbWzAsIDFdLCBbMSwgMl0sIFsyLCAzXSwgWzMsIDBdXTtcclxuICAgICAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gWy4uLm1vbGRTaGFwZS52ZXJ0aWNlcyxcclxuICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1wbGF0Zm9ybVRoaWNrbmVzcykpKSxcclxuICAgICAgICBdO1xyXG4gICAgICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW1xyXG4gICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLFxyXG4gICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLm1hcChzZWcgPT4gW3NlZ1swXSArIDQsIHNlZ1sxXSArIDRdKSxcclxuICAgICAgICAgICAgWzAsIDRdLCBbMSwgNV0sIFsyLCA2XSwgWzMsIDddLFxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGNvbnN0IFN0YWlyTW9kZWxLZXkgPSAnRHJhd1N0YWlyc01vZGVsJztcclxuLy8gZXhwb3J0IGNvbnN0IFN0YWlyS2V5ID0gJ0RTU3RhaXInO1xyXG4vLyBleHBvcnQgY29uc3QgUGxhdGZvcm1LZXkgPSAnRFNQbGF0Zm9ybSc7XHJcbmV4cG9ydCBjb25zdCBQYXJhbUtleSA9ICdEU1BhcmFtJztcclxuLy8gc3RhcnRIZWlnaHQgYW5kIGVuZEhlaWdodCBjYWNoZWQgaW4gc3RhcnQgYW5kIGVuZFxyXG5leHBvcnQgY29uc3QgU3RhcnRFbmRLZXkgPSAnU1RvRSc7XHJcbmV4cG9ydCBjb25zdCBCYXNlTGluZVNlZzNkS2V5ID0gJ0Jhc2VMaW5lJztcclxuZXhwb3J0IGNvbnN0IERlbGltaXRlciA9ICcmJztcclxuZXhwb3J0IGNvbnN0IENvb3JkRGVsaW1pdGVyID0gJywnO1xyXG5leHBvcnQgdmFyIENvbXBvbmVudFBhcmFtVHlwZTtcclxuKGZ1bmN0aW9uIChDb21wb25lbnRQYXJhbVR5cGUpIHtcclxuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhvcml6b250YWxTdGVwXCJdID0gXCJob3Jpem9udGFsU3RlcFwiO1xyXG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiVmVydGljYWxTdGVwXCJdID0gXCJ2ZXJ0aWNhbFN0ZXBcIjtcclxuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIlN0YXJ0V2lkdGhcIl0gPSBcInN0YXJ0V2lkdGhcIjtcclxuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkVuZFdpZHRoXCJdID0gXCJlbmRXaWR0aFwiO1xyXG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiVHlwZVwiXSA9IFwidHlwZVwiO1xyXG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiVXB3YXJkXCJdID0gXCJ1cHdhcmRcIjtcclxuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIlBsYXRmb3JtVGhpY2tuZXNzXCJdID0gXCJwbGF0Zm9ybVRoaWNrbmVzc1wiO1xyXG59KShDb21wb25lbnRQYXJhbVR5cGUgfHwgKENvbXBvbmVudFBhcmFtVHlwZSA9IHt9KSk7XHJcbi8vIGludGVyZmFjZSBQYXJhbVNldHRpbmdzIHtcclxuLy8gICAgIG1pbjogbnVtYmVyO1xyXG4vLyAgICAgbWF4OiBudW1iZXI7XHJcbi8vICAgICBzdGVwOiBudW1iZXI7XHJcbi8vICAgICB1bml0OiBzdHJpbmc7XHJcbi8vICAgICBwcmVjaXNpb246IG51bWJlcjtcclxuLy8gfVxyXG5leHBvcnQgdmFyIENvbXBvbmVudFR5cGU7XHJcbihmdW5jdGlvbiAoQ29tcG9uZW50VHlwZSkge1xyXG4gICAgQ29tcG9uZW50VHlwZVtDb21wb25lbnRUeXBlW1wiU3RyYWlnaHRTdGFpclwiXSA9IDBdID0gXCJTdHJhaWdodFN0YWlyXCI7XHJcbiAgICBDb21wb25lbnRUeXBlW0NvbXBvbmVudFR5cGVbXCJDaXJjdWxhclN0YWlyXCJdID0gMV0gPSBcIkNpcmN1bGFyU3RhaXJcIjtcclxuICAgIENvbXBvbmVudFR5cGVbQ29tcG9uZW50VHlwZVtcIlBsYXRmb3JtXCJdID0gMl0gPSBcIlBsYXRmb3JtXCI7XHJcbn0pKENvbXBvbmVudFR5cGUgfHwgKENvbXBvbmVudFR5cGUgPSB7fSkpO1xyXG5leHBvcnQgY29uc3QgQ29tcG9uZW50UGFyYW1TZXR0aW5ncyA9IHtcclxuICAgIGhvcml6b250YWxTdGVwOiB7XHJcbiAgICAgICAgdGl0bGU6IFwi5q2l6ZW/XCIsXHJcbiAgICAgICAgbWluOiAxLFxyXG4gICAgICAgIG1heDogMTAwMDAwLFxyXG4gICAgICAgIHN0ZXA6IDEwLFxyXG4gICAgICAgIHVuaXQ6ICfplb8nLFxyXG4gICAgICAgIHByZWNpc2lvbjogMCxcclxuICAgIH0sXHJcbiAgICB2ZXJ0aWNhbFN0ZXA6IHtcclxuICAgICAgICB0aXRsZTogXCLmraXplb9cIixcclxuICAgICAgICBtaW46IDEsXHJcbiAgICAgICAgbWF4OiAxMDAwMDAsXHJcbiAgICAgICAgc3RlcDogMTAsXHJcbiAgICAgICAgdW5pdDogJ+mrmCcsXHJcbiAgICAgICAgcHJlY2lzaW9uOiAwLFxyXG4gICAgfSxcclxuICAgIHN0YXJ0V2lkdGg6IHtcclxuICAgICAgICB0aXRsZTogXCLlrr3luqZcIixcclxuICAgICAgICBtaW46IDEsXHJcbiAgICAgICAgbWF4OiAxMDAwMDAsXHJcbiAgICAgICAgc3RlcDogNTAsXHJcbiAgICAgICAgdW5pdDogJ+i1tycsXHJcbiAgICAgICAgcHJlY2lzaW9uOiAwLFxyXG4gICAgfSxcclxuICAgIGVuZFdpZHRoOiB7XHJcbiAgICAgICAgdGl0bGU6IFwi5a695bqmXCIsXHJcbiAgICAgICAgbWluOiAxLFxyXG4gICAgICAgIG1heDogMTAwMDAwLFxyXG4gICAgICAgIHN0ZXA6IDUwLFxyXG4gICAgICAgIHVuaXQ6ICfnu4gnLFxyXG4gICAgICAgIHByZWNpc2lvbjogMCxcclxuICAgIH0sXHJcbiAgICB0eXBlOiB7XHJcbiAgICAgICAgLy8gcmFkaW9WYWx1ZXM6IFtDb21wb25lbnRUeXBlLlN0cmFpZ2h0U3RhaXIsIENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpciwgQ29tcG9uZW50VHlwZS5QbGF0Zm9ybV0sXHJcbiAgICAgICAgLy8gdGV4dHM6IFtcIuebtOmYtlwiLCBcIuaXi+i9rOmYtuair1wiLCBcIuW5s+WPsFwiXSxcclxuICAgICAgICB0aXRsZTogXCLnsbvlnotcIixcclxuICAgICAgICByYWRpb09wdGlvbnM6IFtcclxuICAgICAgICAgICAgeyB2YWx1ZTogQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyLCB0ZXh0OiBcIuebtOmYtlwiIH0sXHJcbiAgICAgICAgICAgIHsgdmFsdWU6IENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpciwgdGV4dDogXCLml4vovazpmLbmoq9cIiB9LFxyXG4gICAgICAgICAgICB7IHZhbHVlOiBDb21wb25lbnRUeXBlLlBsYXRmb3JtLCB0ZXh0OiBcIuW5s+WPsFwiIH0sXHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHVwd2FyZDoge1xyXG4gICAgICAgIC8vIHJhZGlvVmFsdWVzOiBbMSwgMF0sXHJcbiAgICAgICAgLy8gdGV4dHM6IFtcIuWQkeS4ilwiLCBcIuWQkeS4i1wiXSxcclxuICAgICAgICB0aXRsZTogXCLmlrnlkJFcIixcclxuICAgICAgICByYWRpb09wdGlvbnM6IFtcclxuICAgICAgICAgICAgeyB2YWx1ZTogdHJ1ZSwgdGV4dDogXCLlkJHkuIpcIiB9LFxyXG4gICAgICAgICAgICB7IHZhbHVlOiBmYWxzZSwgdGV4dDogXCLlkJHkuItcIiB9LFxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICBwbGF0Zm9ybVRoaWNrbmVzczoge1xyXG4gICAgICAgIHRpdGxlOiBcIuWOmuW6plwiLFxyXG4gICAgICAgIG1pbjogMSxcclxuICAgICAgICBtYXg6IDEwMDAwMCxcclxuICAgICAgICBzdGVwOiAxMCxcclxuICAgICAgICB1bml0OiAnJyxcclxuICAgICAgICBwcmVjaXNpb246IDAsXHJcbiAgICB9LFxyXG59O1xyXG5leHBvcnQgY29uc3QgRGVmYXVsdENvbXBvbmVudFBhcmFtID0ge1xyXG4gICAgaG9yaXpvbnRhbFN0ZXA6IDUwMCxcclxuICAgIHZlcnRpY2FsU3RlcDogMTAwLFxyXG4gICAgc3RhcnRXaWR0aDogMTAwMCxcclxuICAgIGVuZFdpZHRoOiAxMDAwLFxyXG4gICAgb2Zmc2V0V2lkdGg6IDAsXHJcbiAgICB0eXBlOiBDb21wb25lbnRUeXBlLlN0cmFpZ2h0U3RhaXIsXHJcbiAgICB1cHdhcmQ6IHRydWUsXHJcbiAgICBwbGF0Zm9ybVRoaWNrbmVzczogNTAsXHJcbiAgICAvLyBzdGVwVHlwZTogU3RlcFR5cGUuTm9ybWFsLFxyXG4gICAgLy8gY29ybmVyVHlwZTogQ29ybmVyVHlwZS5SZWN0YW5nbGUsXHJcbn07XHJcbmV4cG9ydCBmdW5jdGlvbiBpc0F4aXNWYWxpZChheGlzKSB7XHJcbiAgICByZXR1cm4gYXhpcyA9PT0gXCJYXCIgLyogQXhpcy5YICovIHx8IGF4aXMgPT09IFwiLVhcIiAvKiBBeGlzLlhNaW51cyAqLyB8fCBheGlzID09PSBcIllcIiAvKiBBeGlzLlkgKi8gfHwgYXhpcyA9PT0gXCItWVwiIC8qIEF4aXMuWU1pbnVzICovIHx8IGF4aXMgPT09IFwiWlwiIC8qIEF4aXMuWiAqLyB8fCBheGlzID09PSBcIi1aXCIgLyogQXhpcy5aTWludXMgKi87XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29vcmREZWxpbWl0ZXIsIERlZmF1bHRDb21wb25lbnRQYXJhbSwgRGVsaW1pdGVyIH0gZnJvbSBcIi4vdHlwZXNcIjtcclxuZXhwb3J0IGZ1bmN0aW9uIGlzS0FyY2hGYWNlKGVudGl0eSkge1xyXG4gICAgcmV0dXJuICEhZW50aXR5ICYmIChlbnRpdHkuZ2V0VHlwZSgpID09PSBLQXJjaEZhY2VUeXBlLk5vblBsYW5hciB8fCBlbnRpdHkuZ2V0VHlwZSgpID09PSBLQXJjaEZhY2VUeXBlLlBsYW5hcik7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGlzS0dyb3VwSW5zdGFuY2UoZW50aXR5KSB7XHJcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS0VudGl0eVR5cGUuR3JvdXBJbnN0YW5jZTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gaXNLRmFjZShlbnRpdHkpIHtcclxuICAgIHJldHVybiAhIWVudGl0eSAmJiBlbnRpdHkuZ2V0VHlwZSgpID09PSBLRW50aXR5VHlwZS5GYWNlO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBpc0tFZGdlKGVudGl0eSkge1xyXG4gICAgcmV0dXJuICEhZW50aXR5ICYmIGVudGl0eS5nZXRUeXBlKCkgPT09IEtFbnRpdHlUeXBlLkVkZ2U7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGlzS1ZlcnRleChlbnRpdHkpIHtcclxuICAgIHJldHVybiAhIWVudGl0eSAmJiBlbnRpdHkuZ2V0VHlwZSgpID09PSBLRW50aXR5VHlwZS5WZXJ0ZXg7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGlzS0F1eGlsaWFyeUJvdW5kZWRDdXJ2ZShlbnRpdHkpIHtcclxuICAgIHJldHVybiAhIWVudGl0eSAmJiBlbnRpdHkuZ2V0VHlwZSgpID09PSBLRW50aXR5VHlwZS5BdXhpbGlhcnlCb3VuZGVkQ3VydmU7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGlzS0F1eGlsaWFyeUxpbmUoZW50aXR5KSB7XHJcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS0VudGl0eVR5cGUuQXV4aWxpYXJ5TGluZTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gaXNLUGxhbmUoZW50aXR5KSB7XHJcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS1N1cmZhY2VUeXBlLlBsYW5lO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBpc0tMaW5lU2VnbWVudDNkKGVudGl0eSkge1xyXG4gICAgcmV0dXJuICEhZW50aXR5ICYmICEhZW50aXR5LmRpcmVjdGlvbjtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gaXNLQXJjM2QoZW50aXR5KSB7XHJcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgISFlbnRpdHkuY2lyY2xlO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnlQYXJhbShwYXJhbSkge1xyXG4gICAgbGV0IHZhbHVlID0gJyc7XHJcbiAgICB2YWx1ZSArPSBgaHM9JHtwYXJhbS5ob3Jpem9udGFsU3RlcH0ke0RlbGltaXRlcn1gO1xyXG4gICAgdmFsdWUgKz0gYHZzPSR7cGFyYW0udmVydGljYWxTdGVwfSR7RGVsaW1pdGVyfWA7XHJcbiAgICB2YWx1ZSArPSBgc3c9JHtwYXJhbS5zdGFydFdpZHRofSR7RGVsaW1pdGVyfWA7XHJcbiAgICB2YWx1ZSArPSBgZXc9JHtwYXJhbS5lbmRXaWR0aH0ke0RlbGltaXRlcn1gO1xyXG4gICAgdmFsdWUgKz0gYG93PSR7cGFyYW0ub2Zmc2V0V2lkdGh9JHtEZWxpbWl0ZXJ9YDtcclxuICAgIHZhbHVlICs9IGB0cD0ke3BhcmFtLnR5cGV9JHtEZWxpbWl0ZXJ9YDtcclxuICAgIHZhbHVlICs9IGB1cD0ke3BhcmFtLnVwd2FyZCA/IDEgOiAwfSR7RGVsaW1pdGVyfWA7XHJcbiAgICB2YWx1ZSArPSBgcHRrPSR7cGFyYW0ucGxhdGZvcm1UaGlja25lc3N9YDtcclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VQYXJhbSh2YWx1ZSkge1xyXG4gICAgY29uc3QgcGFyYW0gPSBPYmplY3QuYXNzaWduKHt9LCBEZWZhdWx0Q29tcG9uZW50UGFyYW0pO1xyXG4gICAgY29uc3QgaXRlbXMgPSB2YWx1ZS5zcGxpdChEZWxpbWl0ZXIpO1xyXG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XHJcbiAgICAgICAgY29uc3Qga2V5VmFsdWUgPSBpdGVtLnNwbGl0KCc9Jyk7XHJcbiAgICAgICAgaWYgKGtleVZhbHVlLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGtleVZhbHVlWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdocyc6XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uaG9yaXpvbnRhbFN0ZXAgPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICd2cyc6XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0udmVydGljYWxTdGVwID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnc3cnOlxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnN0YXJ0V2lkdGggPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdldyc6XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uZW5kV2lkdGggPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdvdyc6XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0ub2Zmc2V0V2lkdGggPSBwYXJzZUZsb2F0KGtleVZhbHVlWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3RwJzpcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbS50eXBlID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAndXAnOlxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnVwd2FyZCA9IGtleVZhbHVlWzFdID09PSAnMScgPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdwdGsnOlxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnBsYXRmb3JtVGhpY2tuZXNzID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnlTdGFydEVuZChzdGFydCwgZW5kKSB7XHJcbiAgICBsZXQgdmFsdWUgPSAnJztcclxuICAgIHZhbHVlICs9IGAke3N0YXJ0Lnh9JHtDb29yZERlbGltaXRlcn1gO1xyXG4gICAgdmFsdWUgKz0gYCR7c3RhcnQueX0ke0Nvb3JkRGVsaW1pdGVyfWA7XHJcbiAgICB2YWx1ZSArPSBgJHtzdGFydC56fSR7RGVsaW1pdGVyfWA7XHJcbiAgICB2YWx1ZSArPSBgJHtlbmQueH0ke0Nvb3JkRGVsaW1pdGVyfWA7XHJcbiAgICB2YWx1ZSArPSBgJHtlbmQueX0ke0Nvb3JkRGVsaW1pdGVyfWA7XHJcbiAgICB2YWx1ZSArPSBgJHtlbmQuen1gO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVN0YXJ0RW5kKHZhbHVlKSB7XHJcbiAgICBjb25zdCBpdGVtcyA9IHZhbHVlLnNwbGl0KERlbGltaXRlcik7XHJcbiAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRLZXlWYWx1ZSA9IGl0ZW1zWzBdLnNwbGl0KENvb3JkRGVsaW1pdGVyKTtcclxuICAgICAgICBjb25zdCBlbmRLZXlWYWx1ZSA9IGl0ZW1zWzFdLnNwbGl0KENvb3JkRGVsaW1pdGVyKTtcclxuICAgICAgICBpZiAoc3RhcnRLZXlWYWx1ZS5sZW5ndGggPT09IDMgJiYgZW5kS2V5VmFsdWUubGVuZ3RoID09PSAzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKHBhcnNlRmxvYXQoc3RhcnRLZXlWYWx1ZVswXSksIHBhcnNlRmxvYXQoc3RhcnRLZXlWYWx1ZVsxXSksIHBhcnNlRmxvYXQoc3RhcnRLZXlWYWx1ZVsyXSkpO1xyXG4gICAgICAgICAgICBjb25zdCBlbmQgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QocGFyc2VGbG9hdChlbmRLZXlWYWx1ZVswXSksIHBhcnNlRmxvYXQoZW5kS2V5VmFsdWVbMV0pLCBwYXJzZUZsb2F0KGVuZEtleVZhbHVlWzJdKSk7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHN0YXJ0LCBlbmQgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbmltcG9ydCB7IGRyYXdTdGFpcnNUb29sIH0gZnJvbSBcIi4vdG9vbHMvRHJhd1N0YWlyc1Rvb2wvaW5kZXhcIjtcclxuY29uc3QgcGx1Z2luVUkgPSBhcHAuZ2V0UGx1Z2luVUkoKTtcclxucGx1Z2luVUkucmVzaXplKDMwMCwgNzAwKTtcclxucGx1Z2luVUkubW91bnQoKTtcclxubGV0IGFjdGl2YXRlZEN1c3RvbVRvb2w7XHJcbmZ1bmN0aW9uIG9uVUlNZXNzYWdlKGRhdGEpIHtcclxuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEudHlwZSA9PT0gJ2FjdGl2YXRlU3RyYWlnaHRTdGFpcnNUb29sJyB8fCBkYXRhLnR5cGUgPT09ICdhY3RpdmF0ZUNpcmN1bGFyU3RhaXJzVG9vbCcpIHtcclxuICAgICAgICAgICAgICAgIGFwcC5hY3RpdmF0ZUN1c3RvbVRvb2woZHJhd1N0YWlyc1Rvb2wsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgYWN0aXZhdGVkQ3VzdG9tVG9vbCA9IGRyYXdTdGFpcnNUb29sO1xyXG4gICAgICAgICAgICAgICAgZHJhd1N0YWlyc1Rvb2wuY2hhbmdlQ29tcG9uZW50VHlwZShkYXRhLmNvbXBvbmVudFR5cGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gJ2RlQWN0aXZhdGVTdHJhaWdodFN0YWlyc1Rvb2wnIHx8IGRhdGEudHlwZSA9PT0gJ2RlQWN0aXZhdGVDaXJjdWxhclN0YWlyc1Rvb2wnKSB7XHJcbiAgICAgICAgICAgICAgICBhcHAuZGVhY3RpdmF0ZUN1c3RvbVRvb2woZHJhd1N0YWlyc1Rvb2wsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGFjdGl2YXRlZEN1c3RvbVRvb2wgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSAnY29tcG9uZW50UGFyYW1DaGFuZ2UnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZhdGVkQ3VzdG9tVG9vbCA9PT0gZHJhd1N0YWlyc1Rvb2wpIHtcclxuICAgICAgICAgICAgICAgICAgICBkcmF3U3RhaXJzVG9vbC5jaGFuZ2VDb21wb25lbnRQYXJhbShkYXRhLmNvbXBvbmVudFBhcmFtLCBkYXRhLmNoYW5nZVBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICBjbG9zZVBsdWdpbigpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbnBsdWdpblVJLm9uTWVzc2FnZShvblVJTWVzc2FnZSk7XHJcbmNvbnN0IHNlbGVjdGlvbiA9IGFwcC5nZXRTZWxlY3Rpb24oKTtcclxuc2VsZWN0aW9uLmFkZE9ic2VydmVyKHtcclxuICAgIG9uU2VsZWN0aW9uQ2hhbmdlOiAoKSA9PiB7XHJcbiAgICB9XHJcbn0pO1xyXG4vLyBmdW5jdGlvbiBvblBsdWdpblN0YXJ0VXAoKSB7XHJcbi8vIH1cclxuLy8gb25QbHVnaW5TdGFydFVwKCk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==