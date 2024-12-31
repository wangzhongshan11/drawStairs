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
/* harmony export */   LengthTolerance: () => (/* binding */ LengthTolerance),
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
const LengthTolerance = 1;
const AngleTolerance = Math.PI / 36;
// const DefaultBoardThickness = 50;
function getEmptySegment() {
    return {
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





const design = app.getActiveDesign();
const pluginUI = app.getPluginUI();
const appView = app.getActiveView();
const toolHelper = app.getToolHelper();
class DrawStairsTool {
    constructor() {
        this.componentParam = Object.assign({}, _types__WEBPACK_IMPORTED_MODULE_0__.DefaultComponentParam);
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
                    this.componentParam = Object.assign(Object.assign({}, this.componentParam), { type: type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform ? _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.StraightStair : _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform, startWidth: endWidth });
                    pluginUI.postMessage({ type: 'componentParamChanged', componentParam: Object.assign({}, this.componentParam) }, '*');
                    lastSegment.endLocked = true;
                    const nextSegment = Object.assign(Object.assign({}, (0,_consts__WEBPACK_IMPORTED_MODULE_4__.getEmptySegment)()), { start: lastSegment.end, end: lastSegment.end, startLocked: type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform ? false : true, startHeight: lastSegment.endHeight, endHeight: lastSegment.endHeight, param: this.componentParam });
                    if (type !== _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform) {
                        const { moldShape: { vertices } } = lastSegment;
                        nextSegment.baseLineSeg3d = { start: vertices[vertices.length - 2], end: vertices[vertices.length - 1] };
                    }
                    this.segments.push(nextSegment);
                }
            }
            else {
                const firstSegment = Object.assign(Object.assign({}, (0,_consts__WEBPACK_IMPORTED_MODULE_4__.getEmptySegment)()), { start: position, end: position, param: this.componentParam });
                this.segments.push(firstSegment);
            }
        }
    }
    drawTempComponent(lastSegment) {
        var _a, _b;
        if (lastSegment.startLocked) {
            (0,_tempMeshUtils__WEBPACK_IMPORTED_MODULE_1__.generateTempShape)(lastSegment, this.componentParam, this.segments);
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
            if (changeParams.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.StartWidth) > -1 && type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform && baseLineSeg3d && offsetWidth !== 0) {
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
        this.changeComponentParam(this.componentParam, [_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.Type]);
    }
    tryCommit() {
        var _a, _b, _c;
        const meshes = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.generateMeshes)(this.segments);
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
                            const paramString = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.stringifyParam)(param);
                            const startEndString = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.stringifyStartEnd)(GeomLib.createPoint3d(start.x, start.y, startHeight), GeomLib.createPoint3d(end.x, end.y, endHeight));
                            operationSuccess = operationSuccess && groupDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.ParamKey, paramString).isSuccess;
                            operationSuccess = operationSuccess && groupDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.StartEndKey, startEndString).isSuccess;
                            if (baseLineSeg3d) {
                                const BaseLineString = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.stringifyStartEnd)(baseLineSeg3d.start, baseLineSeg3d.end);
                                operationSuccess = operationSuccess && groupDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.BaseLineSeg3dKey, BaseLineString).isSuccess;
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
                    operationSuccess = operationSuccess && parentDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.StairModelKey, 'DrawStairModel').isSuccess;
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
        this.componentParam = Object.assign({}, _types__WEBPACK_IMPORTED_MODULE_0__.DefaultComponentParam);
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
    const { startLocked, stairShape: { vertices, stepCount }, cornerShape: { vertices: cornerVertices }, param: { upward } } = segment;
    if (stepCount < 1 || !startLocked)
        return undefined;
    const stairMesh = {
        vertices: vertices.map(vertex => [vertex.x, vertex.y, vertex.z]),
        triangleIndices: [],
        softEdges: [],
    };
    const lastLeftIndex = vertices.length - 2;
    const leftIndex = vertices.length - ((!upward && stepCount > 1) ? 4 : 2);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDOEQ7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1Qyx1RUFBYztBQUNyRCxzQ0FBc0MsdUVBQWM7QUFDcEQsZ0JBQWdCLHVFQUFjO0FBQzlCO0FBQ0E7QUFDQSx5Q0FBeUMsdUVBQWM7QUFDdkQ7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLHVFQUFjO0FBQzFELG9CQUFvQix1RUFBYztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvLi9zcmMvbWFpbi90b29scy9EcmF3U3RhaXJzVG9vbC9jb25zdHMudHMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvLi9zcmMvbWFpbi90b29scy9EcmF3U3RhaXJzVG9vbC9pbmRleC50cyIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy8uL3NyYy9tYWluL3Rvb2xzL0RyYXdTdGFpcnNUb29sL21lc2hVdGlscy50cyIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy8uL3NyYy9tYWluL3Rvb2xzL0RyYXdTdGFpcnNUb29sL3RlbXBNZXNoVXRpbHMudHMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvLi9zcmMvbWFpbi90b29scy9EcmF3U3RhaXJzVG9vbC90eXBlcy50cyIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy8uL3NyYy9tYWluL3Rvb2xzL0RyYXdTdGFpcnNUb29sL3V0aWxzLnRzIiwid2VicGFjazovL2RyYXctc3RhaXJzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2RyYXctc3RhaXJzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2RyYXctc3RhaXJzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvLi9zcmMvbWFpbi9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERlZmF1bHRDb21wb25lbnRQYXJhbSB9IGZyb20gXCIuL3R5cGVzXCI7XG5leHBvcnQgY29uc3QgZHVtbXlNYXRyaXg0ID0gR2VvbUxpYi5jcmVhdGVJZGVudGl0eU1hdHJpeDQoKTtcbmV4cG9ydCBjb25zdCBkdW1teVZlY3RvcjNkID0gR2VvbUxpYi5jcmVhdGVWZWN0b3IzZCgwLCAwLCAxKTtcbmV4cG9ydCBjb25zdCBkdW1teVBvaW50M2QgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QoMCwgMCwgMCk7XG5leHBvcnQgY29uc3QgRGlyZWN0aW9uWiA9IEdlb21MaWIuY3JlYXRlVmVjdG9yM2QoMCwgMCwgMSk7XG4vLyBjb25zdCBIZWlnaHRUb2xlcmFuY2U6IG51bWJlciA9IDU7XG5leHBvcnQgY29uc3QgTGVuZ3RoVG9sZXJhbmNlID0gMTtcbmV4cG9ydCBjb25zdCBBbmdsZVRvbGVyYW5jZSA9IE1hdGguUEkgLyAzNjtcbi8vIGNvbnN0IERlZmF1bHRCb2FyZFRoaWNrbmVzcyA9IDUwO1xuZXhwb3J0IGZ1bmN0aW9uIGdldEVtcHR5U2VnbWVudCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGFydDogZHVtbXlQb2ludDNkLFxuICAgICAgICBlbmQ6IGR1bW15UG9pbnQzZCxcbiAgICAgICAgc3RhcnRMb2NrZWQ6IHRydWUsXG4gICAgICAgIGVuZExvY2tlZDogZmFsc2UsXG4gICAgICAgIHN0YXJ0SGVpZ2h0OiAwLFxuICAgICAgICBlbmRIZWlnaHQ6IDAsXG4gICAgICAgIHN0YWlyU2hhcGU6IHtcbiAgICAgICAgICAgIHN0ZXBDb3VudDogMCxcbiAgICAgICAgICAgIHZlcnRpY2VzOiBbXSxcbiAgICAgICAgICAgIHRlbXBMaW5lczogW10sXG4gICAgICAgIH0sXG4gICAgICAgIG1vbGRTaGFwZToge1xuICAgICAgICAgICAgc3RlcENvdW50OiAwLFxuICAgICAgICAgICAgdmVydGljZXM6IFtdLFxuICAgICAgICAgICAgdGVtcExpbmVzOiBbXSxcbiAgICAgICAgfSxcbiAgICAgICAgY29ybmVyU2hhcGU6IHtcbiAgICAgICAgICAgIHN0ZXBDb3VudDogMCxcbiAgICAgICAgICAgIHZlcnRpY2VzOiBbXSxcbiAgICAgICAgICAgIHRlbXBMaW5lczogW10sXG4gICAgICAgIH0sXG4gICAgICAgIGNvcm5lck1vbGRTaGFwZToge1xuICAgICAgICAgICAgc3RlcENvdW50OiAwLFxuICAgICAgICAgICAgdmVydGljZXM6IFtdLFxuICAgICAgICAgICAgdGVtcExpbmVzOiBbXSxcbiAgICAgICAgfSxcbiAgICAgICAgcGFyYW06IE9iamVjdC5hc3NpZ24oe30sIERlZmF1bHRDb21wb25lbnRQYXJhbSksXG4gICAgfTtcbn1cbiIsImltcG9ydCB7IENvbXBvbmVudFR5cGUsIERlZmF1bHRDb21wb25lbnRQYXJhbSwgUGFyYW1LZXksIFN0YXJ0RW5kS2V5LCBCYXNlTGluZVNlZzNkS2V5LCBTdGFpck1vZGVsS2V5LCBDb21wb25lbnRQYXJhbVR5cGUgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgZ2VuZXJhdGVUZW1wU2hhcGUgfSBmcm9tIFwiLi90ZW1wTWVzaFV0aWxzXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZU1lc2hlcyB9IGZyb20gXCIuL21lc2hVdGlsc1wiO1xuaW1wb3J0IHsgc3RyaW5naWZ5UGFyYW0sIHN0cmluZ2lmeVN0YXJ0RW5kIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCB7IGdldEVtcHR5U2VnbWVudCB9IGZyb20gXCIuL2NvbnN0c1wiO1xuY29uc3QgZGVzaWduID0gYXBwLmdldEFjdGl2ZURlc2lnbigpO1xuY29uc3QgcGx1Z2luVUkgPSBhcHAuZ2V0UGx1Z2luVUkoKTtcbmNvbnN0IGFwcFZpZXcgPSBhcHAuZ2V0QWN0aXZlVmlldygpO1xuY29uc3QgdG9vbEhlbHBlciA9IGFwcC5nZXRUb29sSGVscGVyKCk7XG5leHBvcnQgY2xhc3MgRHJhd1N0YWlyc1Rvb2wge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudFBhcmFtID0gT2JqZWN0LmFzc2lnbih7fSwgRGVmYXVsdENvbXBvbmVudFBhcmFtKTtcbiAgICAgICAgdGhpcy5zZWdtZW50cyA9IFtdO1xuICAgIH1cbiAgICBvblRvb2xBY3RpdmUoKSB7XG4gICAgICAgIHRvb2xIZWxwZXIuc2V0RXhjbHVkZUluZmVyZW5jZVR5cGVzKFtcbiAgICAgICAgICAgIEtFbnRpdHlUeXBlLkZhY2UsIEtFbnRpdHlUeXBlLkVkZ2UsIEtFbnRpdHlUeXBlLkF1eGlsaWFyeUJvdW5kZWRDdXJ2ZSwgS0VudGl0eVR5cGUuQXV4aWxpYXJ5TGluZSwgS0VudGl0eVR5cGUuQXV4aWxpYXJ5VmVydGV4LFxuICAgICAgICAgICAgS0VudGl0eVR5cGUuR3JvdXBJbnN0YW5jZSwgS0VudGl0eVR5cGUuVmVydGV4LCBLQXJjaEZhY2VUeXBlLk5vblBsYW5hciwgS0FyY2hGYWNlVHlwZS5QbGFuYXIsXG4gICAgICAgIF0pO1xuICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6ICdjb21wb25lbnRQYXJhbUNoYW5nZWQnLCBjb21wb25lbnRQYXJhbTogT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5jb21wb25lbnRQYXJhbSkgfSwgJyonKTtcbiAgICB9XG4gICAgb25Ub29sRGVhY3RpdmUoKSB7XG4gICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogJ2xlYXZlRHJhd1N0YWlyc1Rvb2wnIH0sICcqJyk7XG4gICAgICAgIHRvb2xIZWxwZXIuc2V0RXhjbHVkZUluZmVyZW5jZVR5cGVzKFtdKTtcbiAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgIH1cbiAgICBvbk1vdXNlTW92ZShldmVudCwgaW5mZXJlbmNlUmVzdWx0KSB7XG4gICAgICAgIGlmIChpbmZlcmVuY2VSZXN1bHQpIHtcbiAgICAgICAgICAgIC8vIGNvbnN0IHsgc3RhcnRXaWR0aCwgZW5kV2lkdGgsIHBsYXRmb3JtVGhpY2tuZXNzIH0gPSB0aGlzLmNvbXBvbmVudFBhcmFtO1xuICAgICAgICAgICAgY29uc3QgcG9zaXRpb24gPSBpbmZlcmVuY2VSZXN1bHQucG9zaXRpb247XG4gICAgICAgICAgICBpZiAodGhpcy5zZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0U2VnbWVudCA9IHRoaXMuc2VnbWVudHNbdGhpcy5zZWdtZW50cy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICBpZiAobGFzdFNlZ21lbnQuc3RhcnRMb2NrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuZW5kID0gcG9zaXRpb247XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBDb21wb25lbnQobGFzdFNlZ21lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VnbWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJldlNlZ21lbnQgPSB0aGlzLnNlZ21lbnRzW3RoaXMuc2VnbWVudHMubGVuZ3RoIC0gMl07XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBtdXN0IGJlIHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcmV2U2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBtb2xkU2hhcGU6IHsgdmVydGljZXMsIHRlbXBMaW5lcyB9IH0gPSBwcmV2U2VnbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2xvc2VzdFBvaW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtaW5EaXN0YW5jZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVzLmZvckVhY2gobGluZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVTZWczZCA9IEdlb21MaWIuY3JlYXRlTGluZVNlZ21lbnQzZCh2ZXJ0aWNlc1tsaW5lWzBdXSwgdmVydGljZXNbbGluZVsxXV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVQb2ludCA9IGxpbmVTZWczZC5nZXRDbG9zZXN0UG9pbnQocG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJEaXN0YW5jZSA9IHRoZVBvaW50LmRpc3RhbmNlVG8ocG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNsb3Nlc3RQb2ludCB8fCBjdXJEaXN0YW5jZSA8IG1pbkRpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5EaXN0YW5jZSA9IGN1ckRpc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFBvaW50ID0gdGhlUG9pbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5zdGFydCA9IGNsb3Nlc3RQb2ludDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LmJhc2VMaW5lU2VnM2QgPSB7IHN0YXJ0OiB2ZXJ0aWNlc1tsaW5lWzBdXSwgZW5kOiB2ZXJ0aWNlc1tsaW5lWzFdXSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RTZWdtZW50LnBpY2tTdGFydFRlbXBTaGFwZUlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcFZpZXcuY2xlYXJUZW1wb3JhcnlTaGFwZXNCeUlkcyhbbGFzdFNlZ21lbnQucGlja1N0YXJ0VGVtcFNoYXBlSWRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsb3Nlc3RQb2ludCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwaWNrU3RhcnRUZW1wU2hhcGVJZCA9IGFwcFZpZXcuZHJhd0xpbmVzKFtwb3NpdGlvbiwgY2xvc2VzdFBvaW50XSwgeyBjb2xvcjogeyByOiAwLCBnOiAwLCBiOiAyNTUgfSwgZGVwdGhUZXN0OiB0cnVlLCBwYXR0ZXJuOiBLTGluZVBhdHRlcm4uRGFzaCwgZ2FwU2l6ZTogNTAsIGRhc2hTaXplOiA1MCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBpY2tTdGFydFRlbXBTaGFwZUlkID09PSBudWxsIHx8IHBpY2tTdGFydFRlbXBTaGFwZUlkID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwaWNrU3RhcnRUZW1wU2hhcGVJZC5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQucGlja1N0YXJ0VGVtcFNoYXBlSWQgPSBwaWNrU3RhcnRUZW1wU2hhcGVJZC5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIG9uTEJ1dHRvblVwKGV2ZW50LCBpbmZlcmVuY2VSZXN1bHQpIHtcbiAgICAgICAgaWYgKGluZmVyZW5jZVJlc3VsdCkge1xuICAgICAgICAgICAgY29uc3QgcG9zaXRpb24gPSBpbmZlcmVuY2VSZXN1bHQucG9zaXRpb247XG4gICAgICAgICAgICBpZiAodGhpcy5zZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0U2VnbWVudCA9IHRoaXMuc2VnbWVudHNbdGhpcy5zZWdtZW50cy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICBpZiAoIWxhc3RTZWdtZW50LnN0YXJ0TG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LnN0YXJ0TG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RTZWdtZW50LnBpY2tTdGFydFRlbXBTaGFwZUlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBWaWV3LmNsZWFyVGVtcG9yYXJ5U2hhcGVzQnlJZHMoW2xhc3RTZWdtZW50LnBpY2tTdGFydFRlbXBTaGFwZUlkXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3VGVtcENvbXBvbmVudChsYXN0U2VnbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHR5cGUsIGVuZFdpZHRoIH0gPSB0aGlzLmNvbXBvbmVudFBhcmFtO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudFBhcmFtID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLmNvbXBvbmVudFBhcmFtKSwgeyB0eXBlOiB0eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtID8gQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyIDogQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSwgc3RhcnRXaWR0aDogZW5kV2lkdGggfSk7XG4gICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogJ2NvbXBvbmVudFBhcmFtQ2hhbmdlZCcsIGNvbXBvbmVudFBhcmFtOiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmNvbXBvbmVudFBhcmFtKSB9LCAnKicpO1xuICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5lbmRMb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0U2VnbWVudCA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgZ2V0RW1wdHlTZWdtZW50KCkpLCB7IHN0YXJ0OiBsYXN0U2VnbWVudC5lbmQsIGVuZDogbGFzdFNlZ21lbnQuZW5kLCBzdGFydExvY2tlZDogdHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSA/IGZhbHNlIDogdHJ1ZSwgc3RhcnRIZWlnaHQ6IGxhc3RTZWdtZW50LmVuZEhlaWdodCwgZW5kSGVpZ2h0OiBsYXN0U2VnbWVudC5lbmRIZWlnaHQsIHBhcmFtOiB0aGlzLmNvbXBvbmVudFBhcmFtIH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSAhPT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBtb2xkU2hhcGU6IHsgdmVydGljZXMgfSB9ID0gbGFzdFNlZ21lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0U2VnbWVudC5iYXNlTGluZVNlZzNkID0geyBzdGFydDogdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0sIGVuZDogdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0gfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlZ21lbnRzLnB1c2gobmV4dFNlZ21lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0U2VnbWVudCA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgZ2V0RW1wdHlTZWdtZW50KCkpLCB7IHN0YXJ0OiBwb3NpdGlvbiwgZW5kOiBwb3NpdGlvbiwgcGFyYW06IHRoaXMuY29tcG9uZW50UGFyYW0gfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWdtZW50cy5wdXNoKGZpcnN0U2VnbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZHJhd1RlbXBDb21wb25lbnQobGFzdFNlZ21lbnQpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgaWYgKGxhc3RTZWdtZW50LnN0YXJ0TG9ja2VkKSB7XG4gICAgICAgICAgICBnZW5lcmF0ZVRlbXBTaGFwZShsYXN0U2VnbWVudCwgdGhpcy5jb21wb25lbnRQYXJhbSwgdGhpcy5zZWdtZW50cyk7XG4gICAgICAgICAgICBjb25zdCB7IHN0YWlyU2hhcGU6IHsgdmVydGljZXM6IHN0YWlyVmVydGljZXMsIHRlbXBMaW5lczogc3RhaXJUZW1wTGluZXMgfSwgbW9sZFNoYXBlOiB7IHZlcnRpY2VzOiBtb2xkVmVydGljZXMsIHRlbXBMaW5lczogbW9sZFRlbXBMaW5lcyB9LCBjb3JuZXJTaGFwZTogeyB2ZXJ0aWNlczogY29ybmVyVmVydGljZXMsIHRlbXBMaW5lczogY29ybmVyVGVtcExpbmVzIH0sIGNvcm5lck1vbGRTaGFwZTogeyB2ZXJ0aWNlczogY29ybmVyTW9sZFZlcnRpY2VzLCB0ZW1wTGluZXM6IGNvcm5lck1vbGRUZW1wTGluZXMgfSwgfSA9IGxhc3RTZWdtZW50O1xuICAgICAgICAgICAgY29uc3QgdGVtcExpbmVQb2ludHMgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IG1vbGRUZW1wTGluZVBvaW50cyA9IFtdO1xuICAgICAgICAgICAgZm9yIChjb25zdCBzdGFpclRlbXBMaW5lIG9mIHN0YWlyVGVtcExpbmVzKSB7XG4gICAgICAgICAgICAgICAgdGVtcExpbmVQb2ludHMucHVzaChbc3RhaXJWZXJ0aWNlc1tzdGFpclRlbXBMaW5lWzBdXSwgc3RhaXJWZXJ0aWNlc1tzdGFpclRlbXBMaW5lWzFdXV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCBjb3JuZXJUZW1wTGluZSBvZiBjb3JuZXJUZW1wTGluZXMpIHtcbiAgICAgICAgICAgICAgICB0ZW1wTGluZVBvaW50cy5wdXNoKFtjb3JuZXJWZXJ0aWNlc1tjb3JuZXJUZW1wTGluZVswXV0sIGNvcm5lclZlcnRpY2VzW2Nvcm5lclRlbXBMaW5lWzFdXV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCBtb2xkVGVtcExpbmUgb2YgbW9sZFRlbXBMaW5lcykge1xuICAgICAgICAgICAgICAgIG1vbGRUZW1wTGluZVBvaW50cy5wdXNoKFttb2xkVmVydGljZXNbbW9sZFRlbXBMaW5lWzBdXSwgbW9sZFZlcnRpY2VzW21vbGRUZW1wTGluZVsxXV1dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgY29ybmVyTW9sZFRlbXBMaW5lIG9mIGNvcm5lck1vbGRUZW1wTGluZXMpIHtcbiAgICAgICAgICAgICAgICBtb2xkVGVtcExpbmVQb2ludHMucHVzaChbY29ybmVyTW9sZFZlcnRpY2VzW2Nvcm5lck1vbGRUZW1wTGluZVswXV0sIGNvcm5lck1vbGRWZXJ0aWNlc1tjb3JuZXJNb2xkVGVtcExpbmVbMV1dXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKF9hID0gbGFzdFNlZ21lbnQudGVtcFNoYXBlSWQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBhcHBWaWV3LmNsZWFyVGVtcG9yYXJ5U2hhcGVzQnlJZHMobGFzdFNlZ21lbnQudGVtcFNoYXBlSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRlbXBMaW5lUG9pbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRlbXBTaGFwZUlkID0gYXBwVmlldy5kcmF3UG9seWxpbmVzKHRlbXBMaW5lUG9pbnRzLCB7IGNvbG9yOiB7IHI6IDI1NSwgZzogMCwgYjogMCB9LCBkZXB0aFRlc3Q6IGZhbHNlIH0pO1xuICAgICAgICAgICAgICAgIGlmICh0ZW1wU2hhcGVJZCA9PT0gbnVsbCB8fCB0ZW1wU2hhcGVJZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogdGVtcFNoYXBlSWQuaWRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LnRlbXBTaGFwZUlkID0gdGVtcFNoYXBlSWQuaWRzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBtb2xkVGVtcFNoYXBlSWQgPSBhcHBWaWV3LmRyYXdQb2x5bGluZXMobW9sZFRlbXBMaW5lUG9pbnRzLCB7IGNvbG9yOiB7IHI6IDAsIGc6IDI1NSwgYjogMCB9IH0pO1xuICAgICAgICAgICAgICAgIGlmIChtb2xkVGVtcFNoYXBlSWQgPT09IG51bGwgfHwgbW9sZFRlbXBTaGFwZUlkID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtb2xkVGVtcFNoYXBlSWQuaWRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoX2IgPSBsYXN0U2VnbWVudC50ZW1wU2hhcGVJZCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQudGVtcFNoYXBlSWQucHVzaCguLi5tb2xkVGVtcFNoYXBlSWQuaWRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LnRlbXBTaGFwZUlkID0gbW9sZFRlbXBTaGFwZUlkLmlkcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjaGFuZ2VDb21wb25lbnRQYXJhbShjb21wb25lbnRQYXJhbSwgY2hhbmdlUGFyYW1zKSB7XG4gICAgICAgIGlmICh0aGlzLnNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgbGFzdFNlZ21lbnQgPSB0aGlzLnNlZ21lbnRzW3RoaXMuc2VnbWVudHMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBjb25zdCB7IHN0YXJ0V2lkdGg6IG5ld1dpZHRoIH0gPSBjb21wb25lbnRQYXJhbTtcbiAgICAgICAgICAgIGNvbnN0IHsgc3RhcnQsIHBhcmFtOiB7IHN0YXJ0V2lkdGgsIHR5cGUsIG9mZnNldFdpZHRoIH0sIGJhc2VMaW5lU2VnM2QgfSA9IGxhc3RTZWdtZW50O1xuICAgICAgICAgICAgaWYgKGNoYW5nZVBhcmFtcy5pbmRleE9mKENvbXBvbmVudFBhcmFtVHlwZS5TdGFydFdpZHRoKSA+IC0xICYmIHR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gJiYgYmFzZUxpbmVTZWczZCAmJiBvZmZzZXRXaWR0aCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1N0YXJ0V2lkdGggPSBNYXRoLmNlaWwoc3RhcnRXaWR0aCAvIChzdGFydFdpZHRoICsgTWF0aC5hYnMob2Zmc2V0V2lkdGgpKSAqIG5ld1dpZHRoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzaWduID0gb2Zmc2V0V2lkdGggLyBNYXRoLmFicyhvZmZzZXRXaWR0aCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3T2Zmc2V0V2lkdGggPSBzaWduICogKG5ld1dpZHRoIC0gbmV3U3RhcnRXaWR0aCk7XG4gICAgICAgICAgICAgICAgY29uc3QgYmFzZURpciA9IGJhc2VMaW5lU2VnM2QuZW5kLnN1YnRyYWN0ZWQoYmFzZUxpbmVTZWczZC5zdGFydCkubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0VuZCA9IHN0YXJ0LmFkZGVkKGJhc2VEaXIubXVsdGlwbGllZChzaWduICogKG5ld1N0YXJ0V2lkdGggLyAyICsgTWF0aC5hYnMobmV3T2Zmc2V0V2lkdGgpKSkpO1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudFBhcmFtLnN0YXJ0V2lkdGggPSBuZXdTdGFydFdpZHRoO1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudFBhcmFtLmVuZFdpZHRoID0gbmV3U3RhcnRXaWR0aDtcbiAgICAgICAgICAgICAgICBjb21wb25lbnRQYXJhbS5vZmZzZXRXaWR0aCA9IG5ld09mZnNldFdpZHRoO1xuICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LmVuZCA9IG5ld0VuZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50UGFyYW0gPSBjb21wb25lbnRQYXJhbTtcbiAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBDb21wb25lbnQobGFzdFNlZ21lbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNoYW5nZUNvbXBvbmVudFR5cGUoY29tcG9uZW50VHlwZSkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudFBhcmFtLnR5cGUgPSBjb21wb25lbnRUeXBlO1xuICAgICAgICB0aGlzLmNoYW5nZUNvbXBvbmVudFBhcmFtKHRoaXMuY29tcG9uZW50UGFyYW0sIFtDb21wb25lbnRQYXJhbVR5cGUuVHlwZV0pO1xuICAgIH1cbiAgICB0cnlDb21taXQoKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICBjb25zdCBtZXNoZXMgPSBnZW5lcmF0ZU1lc2hlcyh0aGlzLnNlZ21lbnRzKTtcbiAgICAgICAgaWYgKG1lc2hlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRlc2lnbi5zdGFydE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgY29uc3QgbmV3SW5zdGFuY2VzID0gW107XG4gICAgICAgICAgICBsZXQgb3BlcmF0aW9uU3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHsgc3RhcnQsIGVuZCwgc3RhcnRIZWlnaHQsIGVuZEhlaWdodCwgYmFzZUxpbmVTZWczZCwgcGFyYW0sIG1lc2ggfSBvZiB0aGlzLnNlZ21lbnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFvcGVyYXRpb25TdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlc2lnbi5hYm9ydE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChtZXNoID09PSBudWxsIHx8IG1lc2ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1lc2gudmVydGljZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1NoZWxsID0gKF9hID0gZGVzaWduLmNyZWF0ZVNoZWxsRnJvbU1lc2gobWVzaCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5uZXdTaGVsbDtcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgISFuZXdTaGVsbDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld1NoZWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdJbnN0YW5jZSA9IChfYiA9IGRlc2lnbi5tYWtlR3JvdXAobmV3U2hlbGwuZ2V0RmFjZXMoKSwgW10sIFtdKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmFkZGVkSW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAhIW5ld0luc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZ3JvdXBEZWYgPSBuZXdJbnN0YW5jZSA9PT0gbnVsbCB8fCBuZXdJbnN0YW5jZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogbmV3SW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3SW5zdGFuY2UgJiYgZ3JvdXBEZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdJbnN0YW5jZXMucHVzaChuZXdJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyYW1TdHJpbmcgPSBzdHJpbmdpZnlQYXJhbShwYXJhbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRFbmRTdHJpbmcgPSBzdHJpbmdpZnlTdGFydEVuZChHZW9tTGliLmNyZWF0ZVBvaW50M2Qoc3RhcnQueCwgc3RhcnQueSwgc3RhcnRIZWlnaHQpLCBHZW9tTGliLmNyZWF0ZVBvaW50M2QoZW5kLngsIGVuZC55LCBlbmRIZWlnaHQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBncm91cERlZi5zZXRDdXN0b21Qcm9wZXJ0eShQYXJhbUtleSwgcGFyYW1TdHJpbmcpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBncm91cERlZi5zZXRDdXN0b21Qcm9wZXJ0eShTdGFydEVuZEtleSwgc3RhcnRFbmRTdHJpbmcpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmFzZUxpbmVTZWczZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBCYXNlTGluZVN0cmluZyA9IHN0cmluZ2lmeVN0YXJ0RW5kKGJhc2VMaW5lU2VnM2Quc3RhcnQsIGJhc2VMaW5lU2VnM2QuZW5kKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZ3JvdXBEZWYuc2V0Q3VzdG9tUHJvcGVydHkoQmFzZUxpbmVTZWczZEtleSwgQmFzZUxpbmVTdHJpbmcpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmV3SW5zdGFuY2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudEluc3RhbmNlID0gKF9jID0gZGVzaWduLm1ha2VHcm91cChbXSwgbmV3SW5zdGFuY2VzLCBbXSkpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5hZGRlZEluc3RhbmNlO1xuICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICEhcGFyZW50SW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFyZW50RGVmID0gcGFyZW50SW5zdGFuY2UgPT09IG51bGwgfHwgcGFyZW50SW5zdGFuY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBhcmVudEluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmIChwYXJlbnRJbnN0YW5jZSAmJiBwYXJlbnREZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgcGFyZW50RGVmLnNldEN1c3RvbVByb3BlcnR5KFN0YWlyTW9kZWxLZXksICdEcmF3U3RhaXJNb2RlbCcpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3BlcmF0aW9uU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIGRlc2lnbi5jb21taXRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRlc2lnbi5hYm9ydE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNsZWFyKCkge1xuICAgICAgICBhcHBWaWV3LmNsZWFyVGVtcG9yYXJ5U2hhcGVzKCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50UGFyYW0gPSBPYmplY3QuYXNzaWduKHt9LCBEZWZhdWx0Q29tcG9uZW50UGFyYW0pO1xuICAgICAgICB0aGlzLnNlZ21lbnRzID0gW107XG4gICAgfVxuICAgIG9uUkJ1dHRvblVwKGV2ZW50LCBpbmZlcmVuY2VSZXN1bHQpIHtcbiAgICAgICAgdGhpcy50cnlDb21taXQoKTtcbiAgICB9XG4gICAgb25MQnV0dG9uRGJDbGljayhldmVudCwgaW5mZXJlbmNlUmVzdWx0KSB7XG4gICAgICAgIDtcbiAgICB9XG4gICAgYWxsb3dVc2luZ0luZmVyZW5jZSgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIG9uS2V5RG93bihldmVudCkge1xuICAgICAgICA7XG4gICAgfVxuICAgIG9uS2V5VXAoZXZlbnQpIHtcbiAgICAgICAgO1xuICAgIH1cbn1cbmV4cG9ydCBjb25zdCBkcmF3U3RhaXJzVG9vbCA9IG5ldyBEcmF3U3RhaXJzVG9vbCgpO1xuIiwiaW1wb3J0IHsgQ29tcG9uZW50VHlwZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVNZXNoZXMoc2VnbWVudHMpIHtcbiAgICBjb25zdCBtZXNoZXMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHNlZ21lbnQgb2Ygc2VnbWVudHMpIHtcbiAgICAgICAgaWYgKHNlZ21lbnQucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgZ2VuZXJhdGVQbGF0Zm9ybU1lc2goc2VnbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBnZW5lcmF0ZVN0YWlyTWVzaChzZWdtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VnbWVudC5tZXNoKSB7XG4gICAgICAgICAgICBtZXNoZXMucHVzaChzZWdtZW50Lm1lc2gpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtZXNoZXM7XG59XG5mdW5jdGlvbiBnZW5lcmF0ZVN0YWlyTWVzaChzZWdtZW50KSB7XG4gICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2YsIF9nLCBfaCwgX2osIF9rLCBfbDtcbiAgICBjb25zdCB7IHN0YXJ0TG9ja2VkLCBzdGFpclNoYXBlOiB7IHZlcnRpY2VzLCBzdGVwQ291bnQgfSwgY29ybmVyU2hhcGU6IHsgdmVydGljZXM6IGNvcm5lclZlcnRpY2VzIH0sIHBhcmFtOiB7IHVwd2FyZCB9IH0gPSBzZWdtZW50O1xuICAgIGlmIChzdGVwQ291bnQgPCAxIHx8ICFzdGFydExvY2tlZClcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBjb25zdCBzdGFpck1lc2ggPSB7XG4gICAgICAgIHZlcnRpY2VzOiB2ZXJ0aWNlcy5tYXAodmVydGV4ID0+IFt2ZXJ0ZXgueCwgdmVydGV4LnksIHZlcnRleC56XSksXG4gICAgICAgIHRyaWFuZ2xlSW5kaWNlczogW10sXG4gICAgICAgIHNvZnRFZGdlczogW10sXG4gICAgfTtcbiAgICBjb25zdCBsYXN0TGVmdEluZGV4ID0gdmVydGljZXMubGVuZ3RoIC0gMjtcbiAgICBjb25zdCBsZWZ0SW5kZXggPSB2ZXJ0aWNlcy5sZW5ndGggLSAoKCF1cHdhcmQgJiYgc3RlcENvdW50ID4gMSkgPyA0IDogMik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGVwQ291bnQ7IGkrKykge1xuICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXG4gICAgICAgIC8vIHN0YWlyIGZhY2VzXG4gICAgICAgIFtpICogNCwgaSAqIDQgKyAxLCBpICogNCArIDJdLCBbaSAqIDQgKyAxLCBpICogNCArIDMsIGkgKiA0ICsgMl0sIFtpICogNCArIDIsIGkgKiA0ICsgMywgaSAqIDQgKyA0XSwgW2kgKiA0ICsgMywgaSAqIDQgKyA1LCBpICogNCArIDRdLCBcbiAgICAgICAgLy8gc2lkZSBmYWNlc1xuICAgICAgICBbaSAqIDQsIGkgKiA0ICsgMiwgKGkgKyAxKSAqIDRdLCBbaSAqIDQgKyAxLCAoaSArIDEpICogNCArIDEsIGkgKiA0ICsgM10pO1xuICAgICAgICAoX2EgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucHVzaChbaSAqIDQgKyAxLCBpICogNCArIDJdLCBbaSAqIDQgKyAzLCBpICogNCArIDRdLCBbaSAqIDQsIChpICsgMSkgKiA0XSk7XG4gICAgICAgIGlmIChpID09PSBzdGVwQ291bnQgLSAxICYmIHVwd2FyZCAmJiBzdGVwQ291bnQgPiAxKSB7XG4gICAgICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXG4gICAgICAgICAgICAvLyB0YWlsIHNpZGUgZmFjZXNcbiAgICAgICAgICAgIFtsYXN0TGVmdEluZGV4LCBpICogNCwgKGkgKyAxKSAqIDRdLCBbbGFzdExlZnRJbmRleCArIDEsIChpICsgMSkgKiA0ICsgMSwgaSAqIDQgKyAxXSk7XG4gICAgICAgICAgICAoX2IgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IucHVzaChbbGFzdExlZnRJbmRleCwgaSAqIDRdLCBbaSAqIDQsIChpICsgMSkgKiA0XSwgW2xhc3RMZWZ0SW5kZXggKyAxLCBpICogNCArIDFdLCBbKGkgKyAxKSAqIDQgKyAxLCBpICogNCArIDFdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgICAgIC8vIHNpZGUgZmFjZXNcbiAgICAgICAgICAgIFtsZWZ0SW5kZXgsIGkgKiA0LCAoaSArIDEpICogNF0sIFtsZWZ0SW5kZXggKyAxLCAoaSArIDEpICogNCArIDEsIGkgKiA0ICsgMV0pO1xuICAgICAgICAgICAgKF9jID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnB1c2goW2kgKiA0LCAoaSArIDEpICogNF0sIFsoaSArIDEpICogNCArIDEsIGkgKiA0ICsgMV0pO1xuICAgICAgICAgICAgaWYgKHVwd2FyZCkge1xuICAgICAgICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAoX2QgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QucHVzaChbbGVmdEluZGV4LCBpICogNF0sIFtsZWZ0SW5kZXggKyAxLCBpICogNCArIDFdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN0ZXBDb3VudCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgKF9lID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lLnB1c2goW2xlZnRJbmRleCwgKGkgKyAxKSAqIDRdLCBbbGVmdEluZGV4ICsgMSwgKGkgKyAxKSAqIDQgKyAxXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0ZXBDb3VudCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgKF9mID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9mLnB1c2goW2xlZnRJbmRleCwgaSAqIDRdLCBbbGVmdEluZGV4ICsgMSwgaSAqIDQgKyAxXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpIDwgc3RlcENvdW50IC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAoX2cgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2cucHVzaChbbGVmdEluZGV4LCAoaSArIDEpICogNF0sIFtsZWZ0SW5kZXggKyAxLCAoaSArIDEpICogNCArIDFdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHVwd2FyZCkge1xuICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXG4gICAgICAgIC8vIGJvdHRvbSBmYWNlc1xuICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gMSwgMSwgMF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCAwLCB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDEsIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbdmVydGljZXMubGVuZ3RoIC0gMywgdmVydGljZXMubGVuZ3RoIC0gMiwgdmVydGljZXMubGVuZ3RoIC0gNF0pO1xuICAgICAgICAoX2ggPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfaCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2gucHVzaChbdmVydGljZXMubGVuZ3RoIC0gMSwgMF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAzLCB2ZXJ0aWNlcy5sZW5ndGggLSAyXSk7XG4gICAgICAgIGlmIChzdGVwQ291bnQgPiAxKSB7XG4gICAgICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXG4gICAgICAgICAgICAvLyBzaWRlIGJvdHRvbSBmYWNlc1xuICAgICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIHZlcnRpY2VzLmxlbmd0aCAtIDEwLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIHZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDldLCBcbiAgICAgICAgICAgIC8vIGJvdHRvbSBmYWNlc1xuICAgICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLCBbdmVydGljZXMubGVuZ3RoIC0gNSwgdmVydGljZXMubGVuZ3RoIC0gNCwgdmVydGljZXMubGVuZ3RoIC0gNl0pO1xuICAgICAgICAgICAgKF9qID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2ogPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9qLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLCBbdmVydGljZXMubGVuZ3RoIC0gMiwgdmVydGljZXMubGVuZ3RoIC0gMTBdLCBbdmVydGljZXMubGVuZ3RoIC0gMTAsIHZlcnRpY2VzLmxlbmd0aCAtIDRdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAvLyBib3R0b20gZmFjZXNcbiAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIDAsIDFdLCBbdmVydGljZXMubGVuZ3RoIC0gMSwgdmVydGljZXMubGVuZ3RoIC0gMiwgMF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAzLCB2ZXJ0aWNlcy5sZW5ndGggLSAyLCB2ZXJ0aWNlcy5sZW5ndGggLSAxXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDQsIHZlcnRpY2VzLmxlbmd0aCAtIDJdKTtcbiAgICAgICAgKF9rID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2sgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9rLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIDBdLCBbdmVydGljZXMubGVuZ3RoIC0gMywgdmVydGljZXMubGVuZ3RoIC0gMl0pO1xuICAgICAgICBpZiAoc3RlcENvdW50ID4gMSkge1xuICAgICAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAgICAgLy8gc2lkZSBib3R0b20gZmFjZXNcbiAgICAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSAyLCAwLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIHZlcnRpY2VzLmxlbmd0aCAtIDMsIDFdLCBcbiAgICAgICAgICAgIC8vIGJvdHRvbSBmYWNlc1xuICAgICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDQsIHZlcnRpY2VzLmxlbmd0aCAtIDNdLCBbdmVydGljZXMubGVuZ3RoIC0gNSwgdmVydGljZXMubGVuZ3RoIC0gNiwgdmVydGljZXMubGVuZ3RoIC0gNF0pO1xuICAgICAgICAgICAgKF9sID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2wgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9sLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLCBbdmVydGljZXMubGVuZ3RoIC0gMywgMV0sIFswLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNvcm5lclZlcnRpY2VzLmxlbmd0aCA9PT0gNikge1xuICAgICAgICBnZW5lcmF0ZVBvbHlnb25NZXNoKGNvcm5lclZlcnRpY2VzLCBzdGFpck1lc2gpO1xuICAgIH1cbiAgICBzZWdtZW50Lm1lc2ggPSBzdGFpck1lc2g7XG59XG5mdW5jdGlvbiBnZW5lcmF0ZVBsYXRmb3JtTWVzaChzZWdtZW50KSB7XG4gICAgY29uc3QgeyBzdGFpclNoYXBlOiB7IHZlcnRpY2VzIH0gfSA9IHNlZ21lbnQ7XG4gICAgY29uc3QgdmVydGV4TGVuZ3RoID0gdmVydGljZXMubGVuZ3RoIC8gMjtcbiAgICBpZiAodmVydGV4TGVuZ3RoID09PSA0IHx8IHZlcnRleExlbmd0aCA9PT0gNSkge1xuICAgICAgICBjb25zdCBwbGF0Zm9ybU1lc2ggPSB7XG4gICAgICAgICAgICB2ZXJ0aWNlczogdmVydGljZXMubWFwKHZlcnRleCA9PiBbdmVydGV4LngsIHZlcnRleC55LCB2ZXJ0ZXguel0pLFxuICAgICAgICAgICAgdHJpYW5nbGVJbmRpY2VzOiBbXSxcbiAgICAgICAgICAgIHNvZnRFZGdlczogW10sXG4gICAgICAgIH07XG4gICAgICAgIGdlbmVyYXRlUG9seWdvbk1lc2godmVydGljZXMsIHBsYXRmb3JtTWVzaCk7XG4gICAgICAgIHNlZ21lbnQubWVzaCA9IHBsYXRmb3JtTWVzaDtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIGdlbmVyYXRlUG9seWdvbk1lc2godmVydGljZXMsIG1lc2gpIHtcbiAgICB2YXIgX2EsIF9iO1xuICAgIGNvbnN0IHZlcnRleExlbmd0aCA9IG1lc2gudmVydGljZXMubGVuZ3RoO1xuICAgIG1lc2gudmVydGljZXMucHVzaCguLi52ZXJ0aWNlcy5tYXAodmVydGV4ID0+IFt2ZXJ0ZXgueCwgdmVydGV4LnksIHZlcnRleC56XSkpO1xuICAgIGNvbnN0IHNlZ0NvdW50ID0gdmVydGljZXMubGVuZ3RoIC8gMjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlZ0NvdW50OyBpKyspIHtcbiAgICAgICAgY29uc3QgcmlnaHQgPSBpID09PSBzZWdDb3VudCAtIDEgPyAwIDogaSArIDE7XG4gICAgICAgIGNvbnN0IGJvdHRvbVJpZ2h0ID0gaSA9PT0gc2VnQ291bnQgLSAxID8gc2VnQ291bnQgOiBpICsgc2VnQ291bnQgKyAxO1xuICAgICAgICBtZXNoLnZlcnRpY2VzLnB1c2goW2kgKyB2ZXJ0ZXhMZW5ndGgsIGkgKyBzZWdDb3VudCArIHZlcnRleExlbmd0aCwgYm90dG9tUmlnaHQgKyB2ZXJ0ZXhMZW5ndGhdLCBbaSArIHZlcnRleExlbmd0aCwgYm90dG9tUmlnaHQgKyB2ZXJ0ZXhMZW5ndGgsIHJpZ2h0ICsgdmVydGV4TGVuZ3RoXSk7XG4gICAgICAgIChfYSA9IG1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucHVzaChbaSArIHZlcnRleExlbmd0aCwgYm90dG9tUmlnaHQgKyB2ZXJ0ZXhMZW5ndGhdKTtcbiAgICAgICAgaWYgKGkgPiAwICYmIGkgPCBzZWdDb3VudCAtIDEpIHtcbiAgICAgICAgICAgIG1lc2gudmVydGljZXMucHVzaChbaSArIHZlcnRleExlbmd0aCwgcmlnaHQgKyB2ZXJ0ZXhMZW5ndGgsIDAgKyB2ZXJ0ZXhMZW5ndGhdLCBbYm90dG9tUmlnaHQgKyB2ZXJ0ZXhMZW5ndGgsIGkgKyB2ZXJ0ZXhMZW5ndGgsIHNlZ0NvdW50ICsgdmVydGV4TGVuZ3RoXSk7XG4gICAgICAgICAgICBpZiAoaSA+IDEpIHtcbiAgICAgICAgICAgICAgICAoX2IgPSBtZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnB1c2goW2ksIDAgKyB2ZXJ0ZXhMZW5ndGhdLCBbaSArIHNlZ0NvdW50ICsgdmVydGV4TGVuZ3RoLCBzZWdDb3VudCArIHZlcnRleExlbmd0aF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQW5nbGVUb2xlcmFuY2UsIERpcmVjdGlvblosIExlbmd0aFRvbGVyYW5jZSB9IGZyb20gXCIuL2NvbnN0c1wiO1xuaW1wb3J0IHsgQ29tcG9uZW50VHlwZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVUZW1wU2hhcGUoc2VnbWVudCwgY29tcG9uZW50UGFyYW0sIHNlZ21lbnRzKSB7XG4gICAgY29uc3QgeyB0eXBlIH0gPSBjb21wb25lbnRQYXJhbTtcbiAgICBpZiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyIHx8IHR5cGUgPT09IENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpcikge1xuICAgICAgICBnZW5lcmF0ZVRlbXBTdGFpclNoYXBlKHNlZ21lbnQsIGNvbXBvbmVudFBhcmFtKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGdlbmVyYXRlVGVtcFBsYXRmb3JtU2hhcGUoc2VnbWVudCwgY29tcG9uZW50UGFyYW0sIHNlZ21lbnRzKTtcbiAgICB9XG59XG5mdW5jdGlvbiBnZW5lcmF0ZVRlbXBTdGFpclNoYXBlKHNlZ21lbnQsIGNvbXBvbmVudFBhcmFtKSB7XG4gICAgY29uc3QgeyBzdGFydCwgZW5kLCBzdGFpclNoYXBlLCBtb2xkU2hhcGUsIGNvcm5lclNoYXBlLCBjb3JuZXJNb2xkU2hhcGUsIHN0YXJ0SGVpZ2h0LCBiYXNlTGluZVNlZzNkIH0gPSBzZWdtZW50O1xuICAgIGNvbnN0IHsgc3RhcnRXaWR0aCwgZW5kV2lkdGgsIHR5cGUsIGhvcml6b250YWxTdGVwLCB2ZXJ0aWNhbFN0ZXAsIHVwd2FyZCwgcGxhdGZvcm1UaGlja25lc3MgfSA9IGNvbXBvbmVudFBhcmFtO1xuICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbXTtcbiAgICBzdGFpclNoYXBlLnRlbXBMaW5lcyA9IFtdO1xuICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtdO1xuICAgIG1vbGRTaGFwZS50ZW1wTGluZXMgPSBbXTtcbiAgICBjb3JuZXJTaGFwZS52ZXJ0aWNlcyA9IFtdO1xuICAgIGNvcm5lclNoYXBlLnRlbXBMaW5lcyA9IFtdO1xuICAgIGNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtdO1xuICAgIGNvcm5lck1vbGRTaGFwZS50ZW1wTGluZXMgPSBbXTtcbiAgICBjb25zdCB7IHZlcnRpY2VzLCB0ZW1wTGluZXMgfSA9IHN0YWlyU2hhcGU7XG4gICAgY29uc3QgeyB2ZXJ0aWNlczogbW9sZFZlcnRpY2VzLCB0ZW1wTGluZXM6IG1vbGRUZW1wTGluZXMgfSA9IG1vbGRTaGFwZTtcbiAgICBpZiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyKSB7XG4gICAgICAgIGxldCBob3Jpem9udGFsRnJvbnREaXIgPSBlbmQuc3VidHJhY3RlZChzdGFydCkubm9ybWFsaXplZCgpO1xuICAgICAgICBsZXQgaG9yaXpvbnRhbERpc3RhbmNlID0gc3RhcnQuZGlzdGFuY2VUbyhlbmQpO1xuICAgICAgICBjb25zdCB2ZXJ0aWNhbEZyb250RGlyID0gRGlyZWN0aW9uWjtcbiAgICAgICAgbGV0IGhvcml6b250YWxMZWZ0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhob3Jpem9udGFsRnJvbnREaXIpO1xuICAgICAgICBpZiAoYmFzZUxpbmVTZWczZCkge1xuICAgICAgICAgICAgY29uc3QgYmFzZUxpbmVEaXIgPSBiYXNlTGluZVNlZzNkLmVuZC5zdWJ0cmFjdGVkKGJhc2VMaW5lU2VnM2Quc3RhcnQpLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgIGNvbnN0IGFuZ2xlID0gaG9yaXpvbnRhbEZyb250RGlyLmFuZ2xlKGJhc2VMaW5lRGlyKTtcbiAgICAgICAgICAgIGNvbnN0IGRlbHRhQW5nbGUgPSBNYXRoLmFicyhhbmdsZSAtIE1hdGguUEkgLyAyKTtcbiAgICAgICAgICAgIGlmIChkZWx0YUFuZ2xlIDw9IEFuZ2xlVG9sZXJhbmNlKSB7XG4gICAgICAgICAgICAgICAgaG9yaXpvbnRhbEZyb250RGlyID0gYmFzZUxpbmVEaXIuY3Jvc3MoaG9yaXpvbnRhbEZyb250RGlyLmNyb3NzKGJhc2VMaW5lRGlyKSkubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgIGhvcml6b250YWxEaXN0YW5jZSA9IGhvcml6b250YWxEaXN0YW5jZSAqIE1hdGguY29zKGRlbHRhQW5nbGUpO1xuICAgICAgICAgICAgICAgIGhvcml6b250YWxMZWZ0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhob3Jpem9udGFsRnJvbnREaXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGFuZ2xlIDwgTWF0aC5QSSAvIDIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29ybmVyQ29ubmVjdGlvblBvaW50MSA9IHN0YXJ0LmFkZGVkKGJhc2VMaW5lRGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyICogTWF0aC5zaWduKGFuZ2xlKSkpO1xuICAgICAgICAgICAgICAgICAgICBjb3JuZXJNb2xkU2hhcGUudmVydGljZXMgPSBbc3RhcnQsIHN0YXJ0LmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSksIGNvcm5lckNvbm5lY3Rpb25Qb2ludDFdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29ybmVyQ29ubmVjdGlvblBvaW50MiA9IHN0YXJ0LmFkZGVkKGJhc2VMaW5lRGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIgKiBNYXRoLnNpZ24oYW5nbGUpKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtzdGFydCwgY29ybmVyQ29ubmVjdGlvblBvaW50Miwgc3RhcnQuYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29ybmVyTW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtbMCwgMV0sIFsxLCAyXSwgWzIsIDBdXTtcbiAgICAgICAgICAgICAgICBjb3JuZXJTaGFwZS52ZXJ0aWNlcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgLi4uY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzLm1hcCh2ID0+IHYuYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkpLFxuICAgICAgICAgICAgICAgICAgICAuLi5jb3JuZXJNb2xkU2hhcGUudmVydGljZXMubWFwKHYgPT4gdi5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgLSBwbGF0Zm9ybVRoaWNrbmVzcykpKSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIGNvcm5lclNoYXBlLnRlbXBMaW5lcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgWzAsIDFdLCBbMSwgMl0sIFsyLCAwXSxcbiAgICAgICAgICAgICAgICAgICAgWzMsIDRdLCBbNCwgNV0sIFs1LCAzXSxcbiAgICAgICAgICAgICAgICAgICAgWzAsIDNdLCBbMSwgNF0sIFsyLCA1XSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN0ZXBGbG9hdENvdW50ID0gaG9yaXpvbnRhbERpc3RhbmNlIC8gaG9yaXpvbnRhbFN0ZXA7XG4gICAgICAgIGNvbnN0IHN0ZXBDb3VudCA9IE1hdGguY2VpbChzdGVwRmxvYXRDb3VudCk7XG4gICAgICAgIHNlZ21lbnQuZW5kSGVpZ2h0ID0gc2VnbWVudC5zdGFydEhlaWdodCArIHN0ZXBDb3VudCAqIHZlcnRpY2FsU3RlcDtcbiAgICAgICAgc3RhaXJTaGFwZS5zdGVwQ291bnQgPSBzdGVwQ291bnQ7XG4gICAgICAgIG1vbGRTaGFwZS5zdGVwQ291bnQgPSBzdGVwQ291bnQ7XG4gICAgICAgIGlmIChzdGVwQ291bnQgPCAxKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBsYXN0U3RlcExlbmd0aCA9IGhvcml6b250YWxEaXN0YW5jZSAtIChzdGVwQ291bnQgLSAxKSAqIGhvcml6b250YWxTdGVwO1xuICAgICAgICBpZiAobGFzdFN0ZXBMZW5ndGggPiAwICYmIGxhc3RTdGVwTGVuZ3RoIDwgTGVuZ3RoVG9sZXJhbmNlKSB7XG4gICAgICAgICAgICBzdGFpclNoYXBlLnN0ZXBDb3VudC0tO1xuICAgICAgICAgICAgbW9sZFNoYXBlLnN0ZXBDb3VudC0tO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN0ZXBIZWlnaHQgPSB1cHdhcmQgPyB2ZXJ0aWNhbFN0ZXAgOiAtdmVydGljYWxTdGVwO1xuICAgICAgICBjb25zdCBsZWZ0UHQgPSBzdGFydC5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSk7XG4gICAgICAgIGNvbnN0IHJpZ2h0UHQgPSBzdGFydC5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpO1xuICAgICAgICBjb25zdCB3aWR0aERlbHRhID0gKGVuZFdpZHRoIC0gc3RhcnRXaWR0aCkgLyAyIC8gKHN0ZXBGbG9hdENvdW50KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGVwQ291bnQgLSAxOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGN1ckxlZnRNb2xkUHQgPSBsZWZ0UHQuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaSAqIGhvcml6b250YWxTdGVwKSkuYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZChpICogd2lkdGhEZWx0YSkpO1xuICAgICAgICAgICAgY29uc3QgY3VyUmlnaHRNb2xkUHQgPSByaWdodFB0LmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGkgKiBob3Jpem9udGFsU3RlcCkpLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoLWkgKiB3aWR0aERlbHRhKSk7XG4gICAgICAgICAgICBjb25zdCBjdXJMZWZ0UHQgPSBjdXJMZWZ0TW9sZFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCkpLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZChpICogc3RlcEhlaWdodCkpO1xuICAgICAgICAgICAgY29uc3QgY3VyUmlnaHRQdCA9IGN1clJpZ2h0TW9sZFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCkpLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZChpICogc3RlcEhlaWdodCkpO1xuICAgICAgICAgICAgbW9sZFZlcnRpY2VzLnB1c2goY3VyTGVmdE1vbGRQdCwgY3VyUmlnaHRNb2xkUHQpO1xuICAgICAgICAgICAgbW9sZFRlbXBMaW5lcy5wdXNoKFsyICogaSwgMSArIDIgKiBpXSwgWzIgKiBpLCAyICsgMiAqIGldLCBbMSArIDIgKiBpLCAzICsgMiAqIGldKTtcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2goY3VyTGVmdFB0LCBjdXJSaWdodFB0KTtcbiAgICAgICAgICAgIGlmICh1cHdhcmQpIHtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKGN1ckxlZnRQdC5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLCBjdXJSaWdodFB0LmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaChjdXJMZWZ0UHQuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaG9yaXpvbnRhbFN0ZXApKSwgY3VyUmlnaHRQdC5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFs0ICogaSwgMSArIDQgKiBpXSwgWzQgKiBpLCAyICsgNCAqIGldLCBbMSArIDQgKiBpLCAzICsgNCAqIGldLCBbMiArIDQgKiBpLCAzICsgNCAqIGldLCBbMiArIDQgKiBpLCA0ICsgNCAqIGldLCBbMyArIDQgKiBpLCA1ICsgNCAqIGldKTtcbiAgICAgICAgfVxuICAgICAgICBtb2xkVmVydGljZXMucHVzaChzdGVwQ291bnQgPiAxID8gbW9sZFZlcnRpY2VzW21vbGRWZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpIDogbGVmdFB0LCBzdGVwQ291bnQgPiAxID8gbW9sZFZlcnRpY2VzW21vbGRWZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpIDogcmlnaHRQdCk7XG4gICAgICAgIG1vbGRUZW1wTGluZXMucHVzaChbMiAqIChzdGVwQ291bnQgLSAxKSwgMSArIDIgKiAoc3RlcENvdW50IC0gMSldKTtcbiAgICAgICAgaWYgKGxhc3RTdGVwTGVuZ3RoID4gTGVuZ3RoVG9sZXJhbmNlKSB7XG4gICAgICAgICAgICBtb2xkVmVydGljZXMucHVzaChtb2xkVmVydGljZXNbbW9sZFZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcCAqIHdpZHRoRGVsdGEpKS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCkpLCBtb2xkVmVydGljZXNbbW9sZFZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoLWxhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXAgKiB3aWR0aERlbHRhKSkuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGgpKSk7XG4gICAgICAgICAgICBtb2xkVGVtcExpbmVzLnB1c2goWzIgKiAoc3RlcENvdW50IC0gMSksIDIgKyAyICogKHN0ZXBDb3VudCAtIDEpXSwgWzEgKyAyICogKHN0ZXBDb3VudCAtIDEpLCAzICsgMiAqIChzdGVwQ291bnQgLSAxKV0sIFsyICogc3RlcENvdW50LCAxICsgMiAqIHN0ZXBDb3VudF0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cHdhcmQpIHtcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2goc3RlcENvdW50ID4gMSA/IHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSkgOiBsZWZ0UHQsIHN0ZXBDb3VudCA+IDEgPyB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpIDogcmlnaHRQdCk7XG4gICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbNCAqIChzdGVwQ291bnQgLSAxKSwgMSArIDQgKiAoc3RlcENvdW50IC0gMSldKTtcbiAgICAgICAgICAgIGlmIChsYXN0U3RlcExlbmd0aCA+IExlbmd0aFRvbGVyYW5jZSkge1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKHZlcnRpY2FsU3RlcCkpLCB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQodmVydGljYWxTdGVwKSkpO1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwICogd2lkdGhEZWx0YSkpLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoKSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoLWxhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXAgKiB3aWR0aERlbHRhKSkuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGgpKSk7XG4gICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goXG4gICAgICAgICAgICAgICAgLy8gWzQgKiBzdGVwQ291bnQsIDEgKyA0ICogc3RlcENvdW50XSxcbiAgICAgICAgICAgICAgICBbNCAqIChzdGVwQ291bnQgLSAxKSwgMiArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMSArIDQgKiAoc3RlcENvdW50IC0gMSksIDMgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCAzICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsyICsgNCAqIChzdGVwQ291bnQgLSAxKSwgNCArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMyArIDQgKiAoc3RlcENvdW50IC0gMSksIDUgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzQgKiBzdGVwQ291bnQsIDEgKyA0ICogc3RlcENvdW50XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHN0ZXBDb3VudCA+IDEgPyB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQodmVydGljYWxTdGVwKSkgOiBsZWZ0UHQsIHN0ZXBDb3VudCA+IDEgPyB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQodmVydGljYWxTdGVwKSkgOiByaWdodFB0KTtcbiAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFs0ICogKHN0ZXBDb3VudCAtIDEpLCAxICsgNCAqIChzdGVwQ291bnQgLSAxKV0pO1xuICAgICAgICAgICAgaWYgKGxhc3RTdGVwTGVuZ3RoID4gTGVuZ3RoVG9sZXJhbmNlKSB7XG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXAgKiB3aWR0aERlbHRhKSkuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGgpKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZCgtbGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcCAqIHdpZHRoRGVsdGEpKS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCkpKTtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZCh2ZXJ0aWNhbFN0ZXApKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKHZlcnRpY2FsU3RlcCkpKTtcbiAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChcbiAgICAgICAgICAgICAgICAvLyBbNCAqIChzdGVwQ291bnQgLSAxKSwgMSArIDQgKiAoc3RlcENvdW50IC0gMSldLFxuICAgICAgICAgICAgICAgIFs0ICogKHN0ZXBDb3VudCAtIDEpLCAyICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsxICsgNCAqIChzdGVwQ291bnQgLSAxKSwgMyArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMiArIDQgKiAoc3RlcENvdW50IC0gMSksIDMgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCA0ICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFszICsgNCAqIChzdGVwQ291bnQgLSAxKSwgNSArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbNCAqIHN0ZXBDb3VudCwgMSArIDQgKiBzdGVwQ291bnRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RlcENvdW50ID4gMSkge1xuICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIDIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMiArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDQgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCA1ICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFt2ZXJ0aWNlcy5sZW5ndGggKyAyLCAxICsgdmVydGljZXMubGVuZ3RoICsgMl0sIFt2ZXJ0aWNlcy5sZW5ndGggKyAyLCAwXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggKyAyLCAxXSk7XG4gICAgICAgICAgICBpZiAodXB3YXJkKSB7XG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQgLSAoMSAtIGxhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXApICogc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZCh2ZXJ0aWNhbEZyb250RGlyLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQgLSAoMSAtIGxhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXApICogc3RlcEhlaWdodCkpKTtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzWzBdLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSksIHZlcnRpY2VzWzFdLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZCgtbGFzdFN0ZXBMZW5ndGgpKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoLWxhc3RTdGVwTGVuZ3RoKSkpO1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbMF0uYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSwgdmVydGljZXNbMV0uYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbdmVydGljZXMubGVuZ3RoIC0gMiwgMiArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMSArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMF0sIFszICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMV0pO1xuICAgICAgICAgICAgaWYgKHVwd2FyZCkge1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0KSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKHZlcnRpY2FsRnJvbnREaXIubXVsdGlwbGllZCgtc3RlcEhlaWdodCkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbMF0uYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSwgdmVydGljZXNbMV0uYWRkZWQodmVydGljYWxGcm9udERpci5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2VuZXJhdGVUZW1wUGxhdGZvcm1TaGFwZShzZWdtZW50LCBjb21wb25lbnRQYXJhbSwgc2VnbWVudHMpIHtcbiAgICBjb25zdCB7IHN0YXJ0V2lkdGgsIHBsYXRmb3JtVGhpY2tuZXNzIH0gPSBjb21wb25lbnRQYXJhbTtcbiAgICBjb25zdCB7IHN0YXJ0LCBlbmQsIHN0YWlyU2hhcGUsIG1vbGRTaGFwZSB9ID0gc2VnbWVudDtcbiAgICBjb25zdCBjdXJEaXIgPSBlbmQuc3VidHJhY3RlZChzdGFydCk7XG4gICAgY29uc3QgY3VyTGVmdERpciA9IERpcmVjdGlvblouY3Jvc3MoY3VyRGlyKS5ub3JtYWxpemVkKCk7XG4gICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFtdO1xuICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW107XG4gICAgbW9sZFNoYXBlLnZlcnRpY2VzID0gW107XG4gICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtdO1xuICAgIGlmIChzZWdtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGNvbnN0IHByZVN0YWlyU2VnbWVudCA9IHNlZ21lbnRzW3NlZ21lbnRzLmxlbmd0aCAtIDJdO1xuICAgICAgICAvLyBpZiAocHJlU3RhaXJTZWdtZW50LnR5cGUgPT09IENvbXBvbmVudFR5cGUuU3RhaXIpIHtcbiAgICAgICAgY29uc3QgeyBzdGFydDogcHJldlN0YXJ0LCBlbmQ6IHByZXZFbmQsIHBhcmFtOiBwcmV2UGFyYW0sIG1vbGRTaGFwZTogcHJldk1vbGRTaGFwZSwgZW5kSGVpZ2h0OiBwcmV2RW5kSGVpZ2h0IH0gPSBwcmVTdGFpclNlZ21lbnQ7XG4gICAgICAgIGNvbnN0IHByZXZEaXJOb3JtYWxpemVkID0gcHJldkVuZC5zdWJ0cmFjdGVkKHByZXZTdGFydCkubm9ybWFsaXplZCgpO1xuICAgICAgICBjb25zdCBwcmV2TGVmdERpciA9IERpcmVjdGlvblouY3Jvc3MocHJldkRpck5vcm1hbGl6ZWQpLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgY29uc3QgYW5nbGUgPSBjdXJEaXIuYW5nbGVUbyhwcmV2RGlyTm9ybWFsaXplZCwgRGlyZWN0aW9uWik7XG4gICAgICAgIGNvbnN0IGZyb250TGVuZ3RoID0gY3VyRGlyLmRvdChwcmV2RGlyTm9ybWFsaXplZCk7XG4gICAgICAgIGNvbnN0IGN1ckVuZExlZnRDb3JuZXIgPSBlbmQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSk7XG4gICAgICAgIGNvbnN0IGRpcjEgPSBjdXJFbmRMZWZ0Q29ybmVyLnN1YnRyYWN0ZWQoc2VnbWVudC5zdGFydCk7XG4gICAgICAgIGNvbnN0IGFuZ2xlMSA9IGRpcjEuYW5nbGUoY3VyRGlyKTtcbiAgICAgICAgaWYgKGFuZ2xlIDw9IEFuZ2xlVG9sZXJhbmNlIHx8IGFuZ2xlID49IChNYXRoLlBJICogMiAtIEFuZ2xlVG9sZXJhbmNlKSB8fCBwcmV2UGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgc2VnbWVudC5lbmQgPSBzZWdtZW50LnN0YXJ0LmFkZGVkKHByZXZEaXJOb3JtYWxpemVkLm11bHRpcGxpZWQoZnJvbnRMZW5ndGgpKTtcbiAgICAgICAgICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtcbiAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSksXG4gICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgM10sIFszLCAwXV07XG4gICAgICAgICAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gWy4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChwcmV2RW5kSGVpZ2h0KSkpLFxuICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChwcmV2RW5kSGVpZ2h0IC0gcGxhdGZvcm1UaGlja25lc3MpKSksXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXG4gICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcyxcbiAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLm1hcChzZWcgPT4gW3NlZ1swXSArIDQsIHNlZ1sxXSArIDRdKSxcbiAgICAgICAgICAgICAgICBbMCwgNF0sIFsxLCA1XSwgWzIsIDZdLCBbMywgN10sXG4gICAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKEFuZ2xlVG9sZXJhbmNlIDwgYW5nbGUgJiYgYW5nbGUgPCAoTWF0aC5QSSAvIDIgLSBhbmdsZTEpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGxlZnRDb25uZWN0UG9pbnRzID0gW3ByZXZNb2xkU2hhcGUudmVydGljZXNbcHJldk1vbGRTaGFwZS52ZXJ0aWNlcy5sZW5ndGggLSAyXSwgcHJldk1vbGRTaGFwZS52ZXJ0aWNlc1twcmV2TW9sZFNoYXBlLnZlcnRpY2VzLmxlbmd0aCAtIDJdXTtcbiAgICAgICAgICAgICAgICBpZiAoc3RhcnRXaWR0aCA8PSBwcmV2UGFyYW0uZW5kV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbDEgPSBzdGFydFdpZHRoIC8gMiAvIE1hdGguY29zKGFuZ2xlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGwxID4gcHJldlBhcmFtLmVuZFdpZHRoIC8gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYTEgPSBsMSAtIHByZXZQYXJhbS5lbmRXaWR0aCAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjMSA9IGExIC8gTWF0aC50YW4oYW5nbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdENvbm5lY3RQb2ludHMgPSBbc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChwcmV2UGFyYW0uZW5kV2lkdGggLyAyKSkuYWRkZWQocHJldkRpck5vcm1hbGl6ZWQubXVsdGlwbGllZChjMSkpLCBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKHByZXZQYXJhbS5lbmRXaWR0aCAvIDIpKV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0Q29ubmVjdFBvaW50cyA9IFtzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKGwxKSksIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQobDEpKV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbW9sZFNoYXBlLnZlcnRpY2VzID0gW1xuICAgICAgICAgICAgICAgICAgICAvLyBzdGFydC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICAgICAgLi4ubGVmdENvbm5lY3RQb2ludHMsXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyIC8gTWF0aC5jb3MoYW5nbGUpKSksXG4gICAgICAgICAgICAgICAgICAgIGVuZC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSksXG4gICAgICAgICAgICAgICAgICAgIGVuZC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIG1vbGRTaGFwZS50ZW1wTGluZXMgPSBbWzAsIDFdLCBbMSwgMl0sIFsyLCAzXSwgWzMsIDRdLCBbNCwgMF1dO1xuICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHByZXZFbmRIZWlnaHQpKSksXG4gICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChwcmV2RW5kSGVpZ2h0IC0gcGxhdGZvcm1UaGlja25lc3MpKSksXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICBzdGFpclNoYXBlLnRlbXBMaW5lcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcyxcbiAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcy5tYXAoc2VnID0+IFtzZWdbMF0gKyA1LCBzZWdbMV0gKyA1XSksXG4gICAgICAgICAgICAgICAgICAgIFswLCA1XSwgWzEsIDZdLCBbMiwgN10sIFszLCA4XSwgWzQsIDldLFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhbmdsZSA+IChNYXRoLlBJICogMyAvIDIgKyBhbmdsZTEpKSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc3QgcmlnaHRDb25uZWN0UG9pbnQgPSBzdGFydFdpZHRoID4gcHJldlBhcmFtLmVuZFdpZHRoID8gcHJldk1vbGRTaGFwZS52ZXJ0aWNlc1twcmV2TW9sZFNoYXBlLnZlcnRpY2VzLmxlbmd0aCAtIDFdIDpcbiAgICAgICAgICAgICAgICAvLyAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIgKiBNYXRoLmNvcyhhbmdsZSkpKTtcbiAgICAgICAgICAgICAgICBsZXQgcmlnaHRDb25uZWN0UG9pbnRzID0gW3ByZXZNb2xkU2hhcGUudmVydGljZXNbcHJldk1vbGRTaGFwZS52ZXJ0aWNlcy5sZW5ndGggLSAxXSwgcHJldk1vbGRTaGFwZS52ZXJ0aWNlc1twcmV2TW9sZFNoYXBlLnZlcnRpY2VzLmxlbmd0aCAtIDFdXTtcbiAgICAgICAgICAgICAgICBpZiAoc3RhcnRXaWR0aCA8PSBwcmV2UGFyYW0uZW5kV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbDIgPSBzdGFydFdpZHRoIC8gMiAvIE1hdGguY29zKGFuZ2xlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGwyID4gcHJldlBhcmFtLmVuZFdpZHRoIC8gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYTIgPSBsMiAtIHByZXZQYXJhbS5lbmRXaWR0aCAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjMiA9IGEyIC8gTWF0aC50YW4oTWF0aC5QSSAqIDIgLSBhbmdsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodENvbm5lY3RQb2ludHMgPSBbc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtcHJldlBhcmFtLmVuZFdpZHRoIC8gMikpLCBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC1wcmV2UGFyYW0uZW5kV2lkdGggLyAyKSkuYWRkZWQocHJldkRpck5vcm1hbGl6ZWQubXVsdGlwbGllZChjMikpXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0Q29ubmVjdFBvaW50cyA9IFtzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC1sMikpLCBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC1sMikpXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIgLyBNYXRoLmNvcyhhbmdsZSkpKSxcbiAgICAgICAgICAgICAgICAgICAgLi4ucmlnaHRDb25uZWN0UG9pbnRzLFxuICAgICAgICAgICAgICAgICAgICAvLyBzdGFydC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSksXG4gICAgICAgICAgICAgICAgICAgIGVuZC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSksXG4gICAgICAgICAgICAgICAgICAgIGVuZC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIG1vbGRTaGFwZS50ZW1wTGluZXMgPSBbWzAsIDFdLCBbMSwgMl0sIFsyLCAzXSwgWzMsIDRdLCBbNCwgMF1dO1xuICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHByZXZFbmRIZWlnaHQpKSksXG4gICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChwcmV2RW5kSGVpZ2h0IC0gcGxhdGZvcm1UaGlja25lc3MpKSksXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICBzdGFpclNoYXBlLnRlbXBMaW5lcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcyxcbiAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcy5tYXAoc2VnID0+IFtzZWdbMF0gKyA1LCBzZWdbMV0gKyA1XSksXG4gICAgICAgICAgICAgICAgICAgIFswLCA1XSwgWzEsIDZdLCBbMiwgN10sIFszLCA4XSwgWzQsIDldLFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhbmdsZSA+PSBNYXRoLlBJKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsaWRGcm9udExlbmd0aCA9IE1hdGgubWF4KHN0YXJ0V2lkdGgsIGZyb250TGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBmcm9udEVuZCA9IHNlZ21lbnQuc3RhcnQuYWRkZWQocHJldkRpck5vcm1hbGl6ZWQubXVsdGlwbGllZCh2YWxpZEZyb250TGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgbGVmdExlbmd0aCA9IGN1ckRpci5kb3QocHJldkxlZnREaXIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkTGVmdExlbmd0aCA9IE1hdGgubWF4KHN0YXJ0V2lkdGggLyAyLCBsZWZ0TGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBpZiAobGVmdExlbmd0aCA8IHN0YXJ0V2lkdGggLyAyKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kID0gZnJvbnRFbmQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LmVuZCA9IHNlZ21lbnQuc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChsZWZ0TGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGNvbXBvbmVudFBhcmFtLnN0YXJ0V2lkdGggPSB2YWxpZExlZnRMZW5ndGggKyBzdGFydFdpZHRoIC8gMjtcbiAgICAgICAgICAgICAgICAvLyBjb21wb25lbnRQYXJhbS5lbmRXaWR0aCA9IHZhbGlkTGVmdExlbmd0aCArIHN0YXJ0V2lkdGggLyAyO1xuICAgICAgICAgICAgICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCh2YWxpZExlZnRMZW5ndGgpKSxcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICAgICAgZnJvbnRFbmQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICAgICAgZnJvbnRFbmQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCh2YWxpZExlZnRMZW5ndGgpKSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIG1vbGRTaGFwZS50ZW1wTGluZXMgPSBbWzAsIDFdLCBbMSwgMl0sIFsyLCAzXSwgWzMsIDBdXTtcbiAgICAgICAgICAgICAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gWy4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChwcmV2RW5kSGVpZ2h0KSkpLFxuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQocHJldkVuZEhlaWdodCAtIHBsYXRmb3JtVGhpY2tuZXNzKSkpLFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMsXG4gICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMubWFwKHNlZyA9PiBbc2VnWzBdICsgNCwgc2VnWzFdICsgNF0pLFxuICAgICAgICAgICAgICAgICAgICBbMCwgNF0sIFsxLCA1XSwgWzIsIDZdLCBbMywgN10sXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJpZ2h0TGVuZ3RoID0gLWN1ckRpci5kb3QocHJldkxlZnREaXIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkRnJvbnRMZW5ndGggPSBNYXRoLm1heChzdGFydFdpZHRoLCBmcm9udExlbmd0aCk7XG4gICAgICAgICAgICAgICAgY29uc3QgZnJvbnRFbmQxID0gc2VnbWVudC5zdGFydC5hZGRlZChwcmV2RGlyTm9ybWFsaXplZC5tdWx0aXBsaWVkKHZhbGlkRnJvbnRMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZFJpZ2h0TGVuZ3RoID0gTWF0aC5tYXgoc3RhcnRXaWR0aCAvIDIsIHJpZ2h0TGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBpZiAocmlnaHRMZW5ndGggPCBzdGFydFdpZHRoIC8gMikge1xuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LmVuZCA9IGZyb250RW5kMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kID0gc2VnbWVudC5zdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC1yaWdodExlbmd0aCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBzZWdtZW50LmVuZCA9IHNlZ21lbnQuc3RhcnQuYWRkZWQocHJldkRpck5vcm1hbGl6ZWQubXVsdGlwbGllZCh2YWxpZEZyb250TGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgLy8gY29tcG9uZW50UGFyYW0uc3RhcnRXaWR0aCA9IHZhbGlkUmlnaHRMZW5ndGggKyBzdGFydFdpZHRoIC8gMjtcbiAgICAgICAgICAgICAgICAvLyBjb21wb25lbnRQYXJhbS5lbmRXaWR0aCA9IHZhbGlkUmlnaHRMZW5ndGggKyBzdGFydFdpZHRoIC8gMjtcbiAgICAgICAgICAgICAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtdmFsaWRSaWdodExlbmd0aCkpLFxuICAgICAgICAgICAgICAgICAgICBmcm9udEVuZDEuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtdmFsaWRSaWdodExlbmd0aCkpLFxuICAgICAgICAgICAgICAgICAgICBmcm9udEVuZDEuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtbMCwgMV0sIFsxLCAyXSwgWzIsIDNdLCBbMywgMF1dO1xuICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHByZXZFbmRIZWlnaHQpKSksXG4gICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChwcmV2RW5kSGVpZ2h0IC0gcGxhdGZvcm1UaGlja25lc3MpKSksXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICBzdGFpclNoYXBlLnRlbXBMaW5lcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcyxcbiAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcy5tYXAoc2VnID0+IFtzZWdbMF0gKyA0LCBzZWdbMV0gKyA0XSksXG4gICAgICAgICAgICAgICAgICAgIFswLCA0XSwgWzEsIDVdLCBbMiwgNl0sIFszLCA3XSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtcbiAgICAgICAgICAgIHN0YXJ0LmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgc3RhcnQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSksXG4gICAgICAgIF07XG4gICAgICAgIG1vbGRTaGFwZS50ZW1wTGluZXMgPSBbWzAsIDFdLCBbMSwgMl0sIFsyLCAzXSwgWzMsIDBdXTtcbiAgICAgICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFsuLi5tb2xkU2hhcGUudmVydGljZXMsXG4gICAgICAgICAgICAuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoLXBsYXRmb3JtVGhpY2tuZXNzKSkpLFxuICAgICAgICBdO1xuICAgICAgICBzdGFpclNoYXBlLnRlbXBMaW5lcyA9IFtcbiAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMsXG4gICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLm1hcChzZWcgPT4gW3NlZ1swXSArIDQsIHNlZ1sxXSArIDRdKSxcbiAgICAgICAgICAgIFswLCA0XSwgWzEsIDVdLCBbMiwgNl0sIFszLCA3XSxcbiAgICAgICAgXTtcbiAgICB9XG59XG4iLCJleHBvcnQgY29uc3QgU3RhaXJNb2RlbEtleSA9ICdEcmF3U3RhaXJzTW9kZWwnO1xuLy8gZXhwb3J0IGNvbnN0IFN0YWlyS2V5ID0gJ0RTU3RhaXInO1xuLy8gZXhwb3J0IGNvbnN0IFBsYXRmb3JtS2V5ID0gJ0RTUGxhdGZvcm0nO1xuZXhwb3J0IGNvbnN0IFBhcmFtS2V5ID0gJ0RTUGFyYW0nO1xuLy8gc3RhcnRIZWlnaHQgYW5kIGVuZEhlaWdodCBjYWNoZWQgaW4gc3RhcnQgYW5kIGVuZFxuZXhwb3J0IGNvbnN0IFN0YXJ0RW5kS2V5ID0gJ1NUb0UnO1xuZXhwb3J0IGNvbnN0IEJhc2VMaW5lU2VnM2RLZXkgPSAnQmFzZUxpbmUnO1xuZXhwb3J0IGNvbnN0IERlbGltaXRlciA9ICcmJztcbmV4cG9ydCBjb25zdCBDb29yZERlbGltaXRlciA9ICcsJztcbmV4cG9ydCB2YXIgQ29tcG9uZW50UGFyYW1UeXBlO1xuKGZ1bmN0aW9uIChDb21wb25lbnRQYXJhbVR5cGUpIHtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIb3Jpem9udGFsU3RlcFwiXSA9IFwiaG9yaXpvbnRhbFN0ZXBcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJWZXJ0aWNhbFN0ZXBcIl0gPSBcInZlcnRpY2FsU3RlcFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIlN0YXJ0V2lkdGhcIl0gPSBcInN0YXJ0V2lkdGhcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJFbmRXaWR0aFwiXSA9IFwiZW5kV2lkdGhcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJUeXBlXCJdID0gXCJ0eXBlXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiVXB3YXJkXCJdID0gXCJ1cHdhcmRcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJQbGF0Zm9ybVRoaWNrbmVzc1wiXSA9IFwicGxhdGZvcm1UaGlja25lc3NcIjtcbn0pKENvbXBvbmVudFBhcmFtVHlwZSB8fCAoQ29tcG9uZW50UGFyYW1UeXBlID0ge30pKTtcbi8vIGludGVyZmFjZSBQYXJhbVNldHRpbmdzIHtcbi8vICAgICBtaW46IG51bWJlcjtcbi8vICAgICBtYXg6IG51bWJlcjtcbi8vICAgICBzdGVwOiBudW1iZXI7XG4vLyAgICAgdW5pdDogc3RyaW5nO1xuLy8gICAgIHByZWNpc2lvbjogbnVtYmVyO1xuLy8gfVxuZXhwb3J0IHZhciBDb21wb25lbnRUeXBlO1xuKGZ1bmN0aW9uIChDb21wb25lbnRUeXBlKSB7XG4gICAgQ29tcG9uZW50VHlwZVtDb21wb25lbnRUeXBlW1wiU3RyYWlnaHRTdGFpclwiXSA9IDBdID0gXCJTdHJhaWdodFN0YWlyXCI7XG4gICAgQ29tcG9uZW50VHlwZVtDb21wb25lbnRUeXBlW1wiQ2lyY3VsYXJTdGFpclwiXSA9IDFdID0gXCJDaXJjdWxhclN0YWlyXCI7XG4gICAgQ29tcG9uZW50VHlwZVtDb21wb25lbnRUeXBlW1wiUGxhdGZvcm1cIl0gPSAyXSA9IFwiUGxhdGZvcm1cIjtcbn0pKENvbXBvbmVudFR5cGUgfHwgKENvbXBvbmVudFR5cGUgPSB7fSkpO1xuZXhwb3J0IGNvbnN0IENvbXBvbmVudFBhcmFtU2V0dGluZ3MgPSB7XG4gICAgaG9yaXpvbnRhbFN0ZXA6IHtcbiAgICAgICAgdGl0bGU6IFwi5q2l6ZW/XCIsXG4gICAgICAgIG1pbjogMSxcbiAgICAgICAgbWF4OiAxMDAwMDAsXG4gICAgICAgIHN0ZXA6IDEwLFxuICAgICAgICB1bml0OiAn6ZW/JyxcbiAgICAgICAgcHJlY2lzaW9uOiAwLFxuICAgIH0sXG4gICAgdmVydGljYWxTdGVwOiB7XG4gICAgICAgIHRpdGxlOiBcIuatpemVv1wiLFxuICAgICAgICBtaW46IDEsXG4gICAgICAgIG1heDogMTAwMDAwLFxuICAgICAgICBzdGVwOiAxMCxcbiAgICAgICAgdW5pdDogJ+mrmCcsXG4gICAgICAgIHByZWNpc2lvbjogMCxcbiAgICB9LFxuICAgIHN0YXJ0V2lkdGg6IHtcbiAgICAgICAgdGl0bGU6IFwi5a695bqmXCIsXG4gICAgICAgIG1pbjogMSxcbiAgICAgICAgbWF4OiAxMDAwMDAsXG4gICAgICAgIHN0ZXA6IDUwLFxuICAgICAgICB1bml0OiAn6LW3JyxcbiAgICAgICAgcHJlY2lzaW9uOiAwLFxuICAgIH0sXG4gICAgZW5kV2lkdGg6IHtcbiAgICAgICAgdGl0bGU6IFwi5a695bqmXCIsXG4gICAgICAgIG1pbjogMSxcbiAgICAgICAgbWF4OiAxMDAwMDAsXG4gICAgICAgIHN0ZXA6IDUwLFxuICAgICAgICB1bml0OiAn57uIJyxcbiAgICAgICAgcHJlY2lzaW9uOiAwLFxuICAgIH0sXG4gICAgdHlwZToge1xuICAgICAgICAvLyByYWRpb1ZhbHVlczogW0NvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpciwgQ29tcG9uZW50VHlwZS5DaXJjdWxhclN0YWlyLCBDb21wb25lbnRUeXBlLlBsYXRmb3JtXSxcbiAgICAgICAgLy8gdGV4dHM6IFtcIuebtOmYtlwiLCBcIuaXi+i9rOmYtuair1wiLCBcIuW5s+WPsFwiXSxcbiAgICAgICAgdGl0bGU6IFwi57G75Z6LXCIsXG4gICAgICAgIHJhZGlvT3B0aW9uczogW1xuICAgICAgICAgICAgeyB2YWx1ZTogQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyLCB0ZXh0OiBcIuebtOmYtlwiIH0sXG4gICAgICAgICAgICB7IHZhbHVlOiBDb21wb25lbnRUeXBlLkNpcmN1bGFyU3RhaXIsIHRleHQ6IFwi5peL6L2s6Zi25qKvXCIgfSxcbiAgICAgICAgICAgIHsgdmFsdWU6IENvbXBvbmVudFR5cGUuUGxhdGZvcm0sIHRleHQ6IFwi5bmz5Y+wXCIgfSxcbiAgICAgICAgXVxuICAgIH0sXG4gICAgdXB3YXJkOiB7XG4gICAgICAgIC8vIHJhZGlvVmFsdWVzOiBbMSwgMF0sXG4gICAgICAgIC8vIHRleHRzOiBbXCLlkJHkuIpcIiwgXCLlkJHkuItcIl0sXG4gICAgICAgIHRpdGxlOiBcIuaWueWQkVwiLFxuICAgICAgICByYWRpb09wdGlvbnM6IFtcbiAgICAgICAgICAgIHsgdmFsdWU6IHRydWUsIHRleHQ6IFwi5ZCR5LiKXCIgfSxcbiAgICAgICAgICAgIHsgdmFsdWU6IGZhbHNlLCB0ZXh0OiBcIuWQkeS4i1wiIH0sXG4gICAgICAgIF1cbiAgICB9LFxuICAgIHBsYXRmb3JtVGhpY2tuZXNzOiB7XG4gICAgICAgIHRpdGxlOiBcIuWOmuW6plwiLFxuICAgICAgICBtaW46IDEsXG4gICAgICAgIG1heDogMTAwMDAwLFxuICAgICAgICBzdGVwOiAxMCxcbiAgICAgICAgdW5pdDogJycsXG4gICAgICAgIHByZWNpc2lvbjogMCxcbiAgICB9LFxufTtcbmV4cG9ydCBjb25zdCBEZWZhdWx0Q29tcG9uZW50UGFyYW0gPSB7XG4gICAgaG9yaXpvbnRhbFN0ZXA6IDUwMCxcbiAgICB2ZXJ0aWNhbFN0ZXA6IDEwMCxcbiAgICBzdGFydFdpZHRoOiAxMDAwLFxuICAgIGVuZFdpZHRoOiAxMDAwLFxuICAgIG9mZnNldFdpZHRoOiAwLFxuICAgIHR5cGU6IENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpcixcbiAgICB1cHdhcmQ6IHRydWUsXG4gICAgcGxhdGZvcm1UaGlja25lc3M6IDUwLFxuICAgIC8vIHN0ZXBUeXBlOiBTdGVwVHlwZS5Ob3JtYWwsXG4gICAgLy8gY29ybmVyVHlwZTogQ29ybmVyVHlwZS5SZWN0YW5nbGUsXG59O1xuZXhwb3J0IGZ1bmN0aW9uIGlzQXhpc1ZhbGlkKGF4aXMpIHtcbiAgICByZXR1cm4gYXhpcyA9PT0gXCJYXCIgLyogQXhpcy5YICovIHx8IGF4aXMgPT09IFwiLVhcIiAvKiBBeGlzLlhNaW51cyAqLyB8fCBheGlzID09PSBcIllcIiAvKiBBeGlzLlkgKi8gfHwgYXhpcyA9PT0gXCItWVwiIC8qIEF4aXMuWU1pbnVzICovIHx8IGF4aXMgPT09IFwiWlwiIC8qIEF4aXMuWiAqLyB8fCBheGlzID09PSBcIi1aXCIgLyogQXhpcy5aTWludXMgKi87XG59XG4iLCJpbXBvcnQgeyBDb29yZERlbGltaXRlciwgRGVmYXVsdENvbXBvbmVudFBhcmFtLCBEZWxpbWl0ZXIgfSBmcm9tIFwiLi90eXBlc1wiO1xuZXhwb3J0IGZ1bmN0aW9uIGlzS0FyY2hGYWNlKGVudGl0eSkge1xuICAgIHJldHVybiAhIWVudGl0eSAmJiAoZW50aXR5LmdldFR5cGUoKSA9PT0gS0FyY2hGYWNlVHlwZS5Ob25QbGFuYXIgfHwgZW50aXR5LmdldFR5cGUoKSA9PT0gS0FyY2hGYWNlVHlwZS5QbGFuYXIpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzS0dyb3VwSW5zdGFuY2UoZW50aXR5KSB7XG4gICAgcmV0dXJuICEhZW50aXR5ICYmIGVudGl0eS5nZXRUeXBlKCkgPT09IEtFbnRpdHlUeXBlLkdyb3VwSW5zdGFuY2U7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNLRmFjZShlbnRpdHkpIHtcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS0VudGl0eVR5cGUuRmFjZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0tFZGdlKGVudGl0eSkge1xuICAgIHJldHVybiAhIWVudGl0eSAmJiBlbnRpdHkuZ2V0VHlwZSgpID09PSBLRW50aXR5VHlwZS5FZGdlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzS1ZlcnRleChlbnRpdHkpIHtcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS0VudGl0eVR5cGUuVmVydGV4O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzS0F1eGlsaWFyeUJvdW5kZWRDdXJ2ZShlbnRpdHkpIHtcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS0VudGl0eVR5cGUuQXV4aWxpYXJ5Qm91bmRlZEN1cnZlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzS0F1eGlsaWFyeUxpbmUoZW50aXR5KSB7XG4gICAgcmV0dXJuICEhZW50aXR5ICYmIGVudGl0eS5nZXRUeXBlKCkgPT09IEtFbnRpdHlUeXBlLkF1eGlsaWFyeUxpbmU7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNLUGxhbmUoZW50aXR5KSB7XG4gICAgcmV0dXJuICEhZW50aXR5ICYmIGVudGl0eS5nZXRUeXBlKCkgPT09IEtTdXJmYWNlVHlwZS5QbGFuZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0tMaW5lU2VnbWVudDNkKGVudGl0eSkge1xuICAgIHJldHVybiAhIWVudGl0eSAmJiAhIWVudGl0eS5kaXJlY3Rpb247XG59XG5leHBvcnQgZnVuY3Rpb24gaXNLQXJjM2QoZW50aXR5KSB7XG4gICAgcmV0dXJuICEhZW50aXR5ICYmICEhZW50aXR5LmNpcmNsZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnlQYXJhbShwYXJhbSkge1xuICAgIGxldCB2YWx1ZSA9ICcnO1xuICAgIHZhbHVlICs9IGBocz0ke3BhcmFtLmhvcml6b250YWxTdGVwfSR7RGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYHZzPSR7cGFyYW0udmVydGljYWxTdGVwfSR7RGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYHN3PSR7cGFyYW0uc3RhcnRXaWR0aH0ke0RlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGBldz0ke3BhcmFtLmVuZFdpZHRofSR7RGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYG93PSR7cGFyYW0ub2Zmc2V0V2lkdGh9JHtEZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgdHA9JHtwYXJhbS50eXBlfSR7RGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYHVwPSR7cGFyYW0udXB3YXJkID8gMSA6IDB9JHtEZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgcHRrPSR7cGFyYW0ucGxhdGZvcm1UaGlja25lc3N9YDtcbiAgICByZXR1cm4gdmFsdWU7XG59XG5leHBvcnQgZnVuY3Rpb24gcGFyc2VQYXJhbSh2YWx1ZSkge1xuICAgIGNvbnN0IHBhcmFtID0gT2JqZWN0LmFzc2lnbih7fSwgRGVmYXVsdENvbXBvbmVudFBhcmFtKTtcbiAgICBjb25zdCBpdGVtcyA9IHZhbHVlLnNwbGl0KERlbGltaXRlcik7XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgIGNvbnN0IGtleVZhbHVlID0gaXRlbS5zcGxpdCgnPScpO1xuICAgICAgICBpZiAoa2V5VmFsdWUubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGtleVZhbHVlWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnaHMnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5ob3Jpem9udGFsU3RlcCA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAndnMnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS52ZXJ0aWNhbFN0ZXAgPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3N3JzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uc3RhcnRXaWR0aCA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZXcnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5lbmRXaWR0aCA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnb3cnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5vZmZzZXRXaWR0aCA9IHBhcnNlRmxvYXQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd0cCc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnR5cGUgPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3VwJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0udXB3YXJkID0ga2V5VmFsdWVbMV0gPT09ICcxJyA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncHRrJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0ucGxhdGZvcm1UaGlja25lc3MgPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeVN0YXJ0RW5kKHN0YXJ0LCBlbmQpIHtcbiAgICBsZXQgdmFsdWUgPSAnJztcbiAgICB2YWx1ZSArPSBgJHtzdGFydC54fSR7Q29vcmREZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgJHtzdGFydC55fSR7Q29vcmREZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgJHtzdGFydC56fSR7RGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYCR7ZW5kLnh9JHtDb29yZERlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGAke2VuZC55fSR7Q29vcmREZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgJHtlbmQuen1gO1xuICAgIHJldHVybiB2YWx1ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVN0YXJ0RW5kKHZhbHVlKSB7XG4gICAgY29uc3QgaXRlbXMgPSB2YWx1ZS5zcGxpdChEZWxpbWl0ZXIpO1xuICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgY29uc3Qgc3RhcnRLZXlWYWx1ZSA9IGl0ZW1zWzBdLnNwbGl0KENvb3JkRGVsaW1pdGVyKTtcbiAgICAgICAgY29uc3QgZW5kS2V5VmFsdWUgPSBpdGVtc1sxXS5zcGxpdChDb29yZERlbGltaXRlcik7XG4gICAgICAgIGlmIChzdGFydEtleVZhbHVlLmxlbmd0aCA9PT0gMyAmJiBlbmRLZXlWYWx1ZS5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKHBhcnNlRmxvYXQoc3RhcnRLZXlWYWx1ZVswXSksIHBhcnNlRmxvYXQoc3RhcnRLZXlWYWx1ZVsxXSksIHBhcnNlRmxvYXQoc3RhcnRLZXlWYWx1ZVsyXSkpO1xuICAgICAgICAgICAgY29uc3QgZW5kID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKHBhcnNlRmxvYXQoZW5kS2V5VmFsdWVbMF0pLCBwYXJzZUZsb2F0KGVuZEtleVZhbHVlWzFdKSwgcGFyc2VGbG9hdChlbmRLZXlWYWx1ZVsyXSkpO1xuICAgICAgICAgICAgcmV0dXJuIHsgc3RhcnQsIGVuZCB9O1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCB7IGRyYXdTdGFpcnNUb29sIH0gZnJvbSBcIi4vdG9vbHMvRHJhd1N0YWlyc1Rvb2wvaW5kZXhcIjtcbmNvbnN0IHBsdWdpblVJID0gYXBwLmdldFBsdWdpblVJKCk7XG5wbHVnaW5VSS5yZXNpemUoMzAwLCA3MDApO1xucGx1Z2luVUkubW91bnQoKTtcbmxldCBhY3RpdmF0ZWRDdXN0b21Ub29sO1xuZnVuY3Rpb24gb25VSU1lc3NhZ2UoZGF0YSkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoZGF0YS50eXBlID09PSAnYWN0aXZhdGVTdHJhaWdodFN0YWlyc1Rvb2wnIHx8IGRhdGEudHlwZSA9PT0gJ2FjdGl2YXRlQ2lyY3VsYXJTdGFpcnNUb29sJykge1xuICAgICAgICAgICAgICAgIGFwcC5hY3RpdmF0ZUN1c3RvbVRvb2woZHJhd1N0YWlyc1Rvb2wsIHRydWUpO1xuICAgICAgICAgICAgICAgIGFjdGl2YXRlZEN1c3RvbVRvb2wgPSBkcmF3U3RhaXJzVG9vbDtcbiAgICAgICAgICAgICAgICBkcmF3U3RhaXJzVG9vbC5jaGFuZ2VDb21wb25lbnRUeXBlKGRhdGEuY29tcG9uZW50VHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09ICdkZUFjdGl2YXRlU3RyYWlnaHRTdGFpcnNUb29sJyB8fCBkYXRhLnR5cGUgPT09ICdkZUFjdGl2YXRlQ2lyY3VsYXJTdGFpcnNUb29sJykge1xuICAgICAgICAgICAgICAgIGFwcC5kZWFjdGl2YXRlQ3VzdG9tVG9vbChkcmF3U3RhaXJzVG9vbCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGFjdGl2YXRlZEN1c3RvbVRvb2wgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09ICdjb21wb25lbnRQYXJhbUNoYW5nZScpIHtcbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZhdGVkQ3VzdG9tVG9vbCA9PT0gZHJhd1N0YWlyc1Rvb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgZHJhd1N0YWlyc1Rvb2wuY2hhbmdlQ29tcG9uZW50UGFyYW0oZGF0YS5jb21wb25lbnRQYXJhbSwgZGF0YS5jaGFuZ2VQYXJhbXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgY2xvc2VQbHVnaW4oKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxucGx1Z2luVUkub25NZXNzYWdlKG9uVUlNZXNzYWdlKTtcbmNvbnN0IHNlbGVjdGlvbiA9IGFwcC5nZXRTZWxlY3Rpb24oKTtcbnNlbGVjdGlvbi5hZGRPYnNlcnZlcih7XG4gICAgb25TZWxlY3Rpb25DaGFuZ2U6ICgpID0+IHtcbiAgICB9XG59KTtcbi8vIGZ1bmN0aW9uIG9uUGx1Z2luU3RhcnRVcCgpIHtcbi8vIH1cbi8vIG9uUGx1Z2luU3RhcnRVcCgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9