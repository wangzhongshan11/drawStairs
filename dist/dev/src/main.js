/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main/DrawStairsTool.ts":
/*!************************************!*\
  !*** ./src/main/DrawStairsTool.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DrawStairsTool: () => (/* binding */ DrawStairsTool),
/* harmony export */   alignTool: () => (/* binding */ alignTool)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/main/utils.ts");

var Stage;
(function (Stage) {
    Stage[Stage["PickUpModel"] = 0] = "PickUpModel";
    Stage[Stage["PickUpTarget"] = 1] = "PickUpTarget";
})(Stage || (Stage = {}));
class DrawStairsTool {
    constructor() {
        this.stage = Stage.PickUpModel;
    }
    onToolActive() {
    }
    onToolDeactive() {
        const pluginUI = app.getPluginUI();
        this.tryCommit();
        pluginUI.postMessage({ type: 'leaveDrawStairsTool' }, '*');
        this.clear();
    }
    onMouseMove(event, inferenceResult) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        const entity = inferenceResult === null || inferenceResult === void 0 ? void 0 : inferenceResult.entity;
        const appView = app.getActiveView();
        const curModel = this.stage === Stage.PickUpModel ? this.model : this.targetModel;
        if (entity) {
            const transform = inferenceResult.instancePath.reduce((acc, instance) => {
                acc.multiply(instance.getTransform());
                return acc;
            }, GeomLib.createIdentityMatrix4());
            let inferenceModel;
            if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isKFace)(entity)) {
                const surface = entity.getSurface();
                if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isKPlane)(surface)) {
                    if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isKFace)(curModel === null || curModel === void 0 ? void 0 : curModel.inferenceEntity) || (curModel === null || curModel === void 0 ? void 0 : curModel.inferenceEntity.getKey()) !== entity.getKey()) {
                        const normal = inferenceResult.normal;
                        // const normal = surface.normal.appliedMatrix4(transform);
                        const faceVertexPoints = [];
                        entity.getVertices().forEach(vertex => {
                            const point = vertex.getPoint();
                            if (point) {
                                faceVertexPoints.push(point.appliedMatrix4(transform));
                            }
                        });
                        inferenceModel = { position: inferenceResult.position, inferenceEntity: entity, normal, path: inferenceResult.instancePath };
                        if (curModel === null || curModel === void 0 ? void 0 : curModel.tempShapeId) {
                            appView.clearTemporaryShapesByIds([curModel.tempShapeId]);
                        }
                        if (faceVertexPoints.length > 1) {
                            faceVertexPoints.push(faceVertexPoints[0]);
                            const tempShapeId = (_a = appView.drawFlatLines([faceVertexPoints], {
                                color: { r: 255, g: 0, b: 0 },
                                pattern: KLinePattern.Solid,
                            })) === null || _a === void 0 ? void 0 : _a.ids[0];
                            inferenceModel.tempShapeId = tempShapeId;
                        }
                        if (this.stage === Stage.PickUpModel) {
                            this.model = inferenceModel;
                        }
                        else {
                            this.targetModel = inferenceModel;
                        }
                        return;
                    }
                    curModel.position = inferenceResult.position;
                    return;
                }
            }
            else if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isKEdge)(entity)) {
                const p0 = (_b = entity.getVertexA()) === null || _b === void 0 ? void 0 : _b.getPoint();
                const p1 = (_c = entity.getVertexB()) === null || _c === void 0 ? void 0 : _c.getPoint();
                if (p0 && p1) {
                    if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isKEdge)(curModel === null || curModel === void 0 ? void 0 : curModel.inferenceEntity) || (curModel === null || curModel === void 0 ? void 0 : curModel.inferenceEntity.getKey()) !== entity.getKey()) {
                        const points = [p0.appliedMatrix4(transform), p1.appliedMatrix4(transform)];
                        const direction = points[1].subtracted(points[0]);
                        inferenceModel = { position: inferenceResult.position, inferenceEntity: entity, direction, path: inferenceResult.instancePath, };
                        if (curModel === null || curModel === void 0 ? void 0 : curModel.tempShapeId) {
                            appView.clearTemporaryShapesByIds([curModel.tempShapeId]);
                        }
                        const tempShapeId = (_d = appView.drawFlatLines([points], {
                            color: { r: 255, g: 0, b: 0 },
                            pattern: KLinePattern.Solid,
                        })) === null || _d === void 0 ? void 0 : _d.ids[0];
                        inferenceModel.tempShapeId = tempShapeId;
                        if (this.stage === Stage.PickUpModel) {
                            this.model = inferenceModel;
                        }
                        else {
                            this.targetModel = inferenceModel;
                        }
                        return;
                    }
                    curModel.position = inferenceResult.position;
                    return;
                }
            }
            else if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isKVertex)(entity)) {
                const p0 = entity.getPoint();
                if (p0) {
                    if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isKVertex)(curModel === null || curModel === void 0 ? void 0 : curModel.inferenceEntity) || !((_e = curModel === null || curModel === void 0 ? void 0 : curModel.inferenceEntity.getPoint()) === null || _e === void 0 ? void 0 : _e.isEqual(p0))) {
                        inferenceModel = { position: inferenceResult.position, inferenceEntity: entity, path: inferenceResult.instancePath, };
                        if (curModel === null || curModel === void 0 ? void 0 : curModel.tempShapeId) {
                            appView.clearTemporaryShapesByIds([curModel.tempShapeId]);
                        }
                        const tempShapeId = (_f = appView.drawPoints([p0.appliedMatrix4(transform)], {
                            color: { r: 255, g: 0, b: 0 },
                        })) === null || _f === void 0 ? void 0 : _f.id;
                        inferenceModel.tempShapeId = tempShapeId;
                        if (this.stage === Stage.PickUpModel) {
                            this.model = inferenceModel;
                        }
                        else {
                            this.targetModel = inferenceModel;
                        }
                        return;
                    }
                    curModel.position = inferenceResult.position;
                    return;
                }
            }
            else if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isKAuxiliaryBoundedCurve)(entity)) {
                const boundedCurve = entity.getBoundedCurve();
                if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isKArc3d)(boundedCurve)) {
                    const curvePoints = boundedCurve.getApproximatePointsByAngle();
                    if (curvePoints.length) {
                        if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isKAuxiliaryBoundedCurve)(curModel === null || curModel === void 0 ? void 0 : curModel.inferenceEntity) || (curModel === null || curModel === void 0 ? void 0 : curModel.inferenceEntity.getKey()) !== entity.getKey()) {
                            const points = curvePoints.map(p => p.appliedMatrix4(transform));
                            const normal = boundedCurve.normal.appliedMatrix4(transform).normalized();
                            inferenceModel = { position: inferenceResult.position, inferenceEntity: entity, normal, path: inferenceResult.instancePath, };
                            if (curModel === null || curModel === void 0 ? void 0 : curModel.tempShapeId) {
                                appView.clearTemporaryShapesByIds([curModel.tempShapeId]);
                            }
                            const tempShapeId = (_g = appView.drawFlatLines([points], {
                                color: { r: 255, g: 0, b: 0 },
                                pattern: KLinePattern.Solid,
                            })) === null || _g === void 0 ? void 0 : _g.ids[0];
                            inferenceModel.tempShapeId = tempShapeId;
                            if (this.stage === Stage.PickUpModel) {
                                this.model = inferenceModel;
                            }
                            else {
                                this.targetModel = inferenceModel;
                            }
                            return;
                        }
                        curModel.position = inferenceResult.position;
                        return;
                    }
                }
                else {
                    const p0 = (_h = entity.getStartVertex()) === null || _h === void 0 ? void 0 : _h.getPoint();
                    const p1 = (_j = entity.getEndVertex()) === null || _j === void 0 ? void 0 : _j.getPoint();
                    if (p0 && p1) {
                        if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isKAuxiliaryBoundedCurve)(curModel === null || curModel === void 0 ? void 0 : curModel.inferenceEntity) || (curModel === null || curModel === void 0 ? void 0 : curModel.inferenceEntity.getKey()) !== entity.getKey()) {
                            const points = [p0.appliedMatrix4(transform), p1.appliedMatrix4(transform)];
                            const direction = points[1].subtracted(points[0]);
                            inferenceModel = { position: inferenceResult.position, inferenceEntity: entity, direction, path: inferenceResult.instancePath, };
                            if (curModel === null || curModel === void 0 ? void 0 : curModel.tempShapeId) {
                                appView.clearTemporaryShapesByIds([curModel.tempShapeId]);
                            }
                            const tempShapeId = (_k = appView.drawFlatLines([points], {
                                color: { r: 255, g: 0, b: 0 },
                                pattern: KLinePattern.Solid,
                            })) === null || _k === void 0 ? void 0 : _k.ids[0];
                            inferenceModel.tempShapeId = tempShapeId;
                            if (this.stage === Stage.PickUpModel) {
                                this.model = inferenceModel;
                            }
                            else {
                                this.targetModel = inferenceModel;
                            }
                            return;
                        }
                        curModel.position = inferenceResult.position;
                        return;
                    }
                }
            }
            else if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isKAuxiliaryLine)(entity)) {
                const line = entity.getLine();
                if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isKAuxiliaryLine)(curModel === null || curModel === void 0 ? void 0 : curModel.inferenceEntity) || (curModel === null || curModel === void 0 ? void 0 : curModel.inferenceEntity.getKey()) !== entity.getKey()) {
                    const { direction: lineDirection, origin } = line;
                    const points = [origin.added(lineDirection.multiplied(100000)).appliedMatrix4(transform), origin.added(lineDirection.multiplied(-100000)).appliedMatrix4(transform)];
                    const direction = points[1].subtracted(points[0]);
                    inferenceModel = { position: inferenceResult.position, inferenceEntity: entity, direction, path: inferenceResult.instancePath, };
                    if (curModel === null || curModel === void 0 ? void 0 : curModel.tempShapeId) {
                        appView.clearTemporaryShapesByIds([curModel.tempShapeId]);
                    }
                    const tempShapeId = (_l = appView.drawFlatLines([points], {
                        color: { r: 255, g: 0, b: 0 },
                        pattern: KLinePattern.Solid,
                    })) === null || _l === void 0 ? void 0 : _l.ids[0];
                    inferenceModel.tempShapeId = tempShapeId;
                    if (this.stage === Stage.PickUpModel) {
                        this.model = inferenceModel;
                    }
                    else {
                        this.targetModel = inferenceModel;
                    }
                    return;
                }
                curModel.position = inferenceResult.position;
                return;
            }
            else if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isKArchFace)(entity)) {
                if (this.stage === Stage.PickUpTarget) {
                    const surface = entity.getSurface();
                    if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isKPlane)(surface)) {
                        const contour = entity.getFace3d().contour;
                        const normal = inferenceResult.normal;
                        // const normal = surface.normal.appliedMatrix4(transform);
                        const contourPoints = contour.map(segment => segment.startPoint);
                        inferenceModel = { position: inferenceResult.position, inferenceEntity: entity, normal, path: inferenceResult.instancePath };
                        if (curModel === null || curModel === void 0 ? void 0 : curModel.tempShapeId) {
                            appView.clearTemporaryShapesByIds([curModel.tempShapeId]);
                        }
                        if (contourPoints.length > 1) {
                            contourPoints.push(contourPoints[0]);
                            const tempShapeId = (_m = appView.drawFlatLines([contourPoints], {
                                color: { r: 255, g: 0, b: 0 },
                                pattern: KLinePattern.Solid,
                            })) === null || _m === void 0 ? void 0 : _m.ids[0];
                            inferenceModel.tempShapeId = tempShapeId;
                        }
                        this.targetModel = inferenceModel;
                        return;
                    }
                }
            }
            else if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isKGroupInstance)(entity)) {
            }
        }
        if (curModel === null || curModel === void 0 ? void 0 : curModel.tempShapeId) {
            appView.clearTemporaryShapesByIds([curModel.tempShapeId]);
        }
        if (this.stage === Stage.PickUpModel) {
            this.model = undefined;
        }
        else {
            this.targetModel = undefined;
        }
    }
    onLButtonUp(event, inferenceResult) {
        if (this.stage === Stage.PickUpModel) {
            if (this.model) {
                this.stage = Stage.PickUpTarget;
            }
        }
        else {
            if (this.targetModel) {
                app.deactivateCustomTool(this);
            }
        }
    }
    tryCommit() {
        if (this.model && this.targetModel) {
            const design = app.getActiveDesign();
            const editPath = design.getEditPath();
            const editTransform = editPath.reduce((acc, instance) => {
                acc.multiply(instance.getTransform());
                return acc;
            }, GeomLib.createIdentityMatrix4());
            const { position: modelPosition, inferenceEntity: modelEntity, normal: modelNormal, direction: modelDirection, path: modelPath } = this.model;
            const { position: targetPosition, normal: targetNormal, direction: targetDirection } = this.targetModel;
            const mat = editTransform.inversed().multiplied(GeomLib.createTranslationMatrix4(targetPosition.x - modelPosition.x, targetPosition.y - modelPosition.y, targetPosition.z - modelPosition.z));
            const targetNormalReverse = targetNormal === null || targetNormal === void 0 ? void 0 : targetNormal.reversed();
            if (targetNormalReverse) {
                if (modelNormal && !modelNormal.isParallel(targetNormalReverse)) {
                    const crossVec = modelNormal.cross(targetNormalReverse).normalized();
                    const angel = modelNormal.angleTo(targetNormalReverse, crossVec);
                    const rotateMatrix = GeomLib.createRotateMatrix4(angel, crossVec, this.model.position);
                    mat.multiply(rotateMatrix);
                }
                else if (modelDirection && !modelDirection.isPerpendicular(targetNormalReverse)) {
                    const crossVec1 = modelDirection.cross(targetNormalReverse).normalized();
                    const angel1 = modelDirection.angleTo(targetNormalReverse, crossVec1);
                    const rotateMatrix1 = GeomLib.createRotateMatrix4(angel1 - Math.PI / 2 * (angel1 > Math.PI ? 3 : 1), crossVec1, this.model.position);
                    mat.multiply(rotateMatrix1);
                }
            }
            else if (targetDirection) {
                if (modelNormal && !modelNormal.isPerpendicular(targetDirection)) {
                    const crossVec2 = modelNormal.cross(targetDirection).normalized();
                    const angel2 = modelNormal.angleTo(targetDirection, crossVec2);
                    const rotateMatrix1 = GeomLib.createRotateMatrix4(angel2 - Math.PI / 2 * (angel2 > Math.PI ? 3 : 1), crossVec2, this.model.position);
                    mat.multiply(rotateMatrix1);
                }
                else if (modelDirection && !modelDirection.isParallel(targetDirection)) {
                    const crossVec3 = modelDirection.cross(targetDirection).normalized();
                    const angel3 = modelDirection.angleTo(targetDirection, crossVec3);
                    const rotateMatrix1 = GeomLib.createRotateMatrix4(angel3 - Math.PI / 2 * (angel3 > Math.PI ? 3 : 1), crossVec3, this.model.position);
                    mat.multiply(rotateMatrix1);
                }
            }
            mat.multiply(editTransform);
            const targetToTransform = modelPath.find(instance => !editPath.some(ins => ins.getKey() === instance.getKey())) || modelEntity;
            let transformSuccess = false;
            if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isKFace)(targetToTransform) || (0,_utils__WEBPACK_IMPORTED_MODULE_0__.isKEdge)(targetToTransform)) {
                const shell = targetToTransform.getShell();
                if (shell) {
                    transformSuccess = design.transformShells([shell], mat).isSuccess;
                }
            }
            else if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isKVertex)(targetToTransform)) {
                const shell = targetToTransform.getEdges()[0].getShell();
                if (shell) {
                    transformSuccess = design.transformShells([shell], mat).isSuccess;
                }
            }
            else if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isKAuxiliaryBoundedCurve)(targetToTransform) || (0,_utils__WEBPACK_IMPORTED_MODULE_0__.isKAuxiliaryLine)(targetToTransform)) {
                transformSuccess = design.transformAuxiliaryCurves([targetToTransform], mat).isSuccess;
            }
            else if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isKGroupInstance)(targetToTransform)) {
                transformSuccess = design.transformGroupInstances([targetToTransform], mat).isSuccess;
            }
            if (transformSuccess) {
                const selection = app.getSelection();
                selection.add([targetToTransform]);
            }
            // const pickHelper = app.getPickHelper();
            // // const pickableEntityType = this.model ? [KEntityType.AuxiliaryBoundedCurve] : [KAppEntityType.GroupInstance, KEntityType.Face];
            // const allPickedEntities = pickHelper.pickByPoint(event.clientX(), event.clientY()).getAllPicked();
        }
    }
    clear() {
        const appView = app.getActiveView();
        appView.clearTemporaryShapes();
        this.model = undefined;
        this.targetModel = undefined;
        this.stage = Stage.PickUpModel;
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

/***/ "./src/main/utils.ts":
/*!***************************!*\
  !*** ./src/main/utils.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   groupFacesByConnection: () => (/* binding */ groupFacesByConnection),
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
function groupFacesByConnection(faces) {
    if (faces.length < 1) {
        return [];
    }
    if (faces.length < 2) {
        return [faces];
    }
    const edgeFaceIds = new Map();
    const faceIndMap = faces.reduce((map, f, i) => {
        const faceKey = f.getKey();
        map.set(faceKey, i);
        f.getEdges().forEach(edge => {
            const edgeKey = edge.getKey();
            let theFaceIds = edgeFaceIds.get(edgeKey);
            if (!theFaceIds) {
                theFaceIds = [];
                edgeFaceIds.set(edgeKey, theFaceIds);
            }
            theFaceIds.push(faceKey);
        });
        return map;
    }, new Map());
    const fineParent = (ind) => {
        let theInd = ind;
        let p = parents[ind];
        while (p !== theInd) {
            theInd = p;
            p = parents[theInd];
        }
        return p;
    };
    const union = (ind1, ind2) => {
        const p1 = fineParent(ind1);
        const p2 = fineParent(ind2);
        const r1 = ranks[p1];
        const r2 = ranks[p2];
        if (r1 < r2) {
            parents[p1] = p2;
        }
        else {
            parents[p2] = p1;
            if (r1 === r2) {
                ranks[p1] += 1;
            }
        }
    };
    const adjFaceMap = new Map();
    for (const f of faces) {
        const faceId = f.getKey();
        const faceInd = faceIndMap.get(faceId);
        const edgeKeys = f.getEdges().map(e => e.getKey());
        if (faceInd !== undefined) {
            for (const edgeKey of edgeKeys) {
                const adjFaceIds = edgeFaceIds.get(edgeKey);
                if (!adjFaceIds || !adjFaceIds.length) {
                    continue;
                }
                for (const adjId of adjFaceIds) {
                    const ind = faceIndMap.get(adjId);
                    if (ind !== undefined && faceInd !== ind) {
                        let adjSet = adjFaceMap.get(faceInd);
                        if (!adjSet) {
                            adjSet = new Set();
                            adjFaceMap.set(faceInd, adjSet);
                        }
                        adjSet.add(ind);
                    }
                }
            }
        }
    }
    const parents = Array.from({ length: faces.length }, (_, i) => i);
    const ranks = Array.from({ length: faces.length }, _ => 1);
    for (const [fInd, inds] of adjFaceMap) {
        for (const ind of inds) {
            union(fineParent(fInd), fineParent(ind));
        }
    }
    const ps = new Map();
    for (let i = 0; i < faces.length; i++) {
        const parentInd = fineParent(i);
        let patchFaces = ps.get(parentInd);
        if (!patchFaces) {
            patchFaces = [];
            ps.set(parentInd, patchFaces);
        }
        patchFaces.push(faces[i]);
    }
    const result = [];
    for (const [, patch] of ps) {
        result.push(patch);
    }
    return result;
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
/* harmony import */ var _DrawStairsTool__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DrawStairsTool */ "./src/main/DrawStairsTool.ts");
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
pluginUI.resize(240, 700);
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
                app.activateCustomTool(_DrawStairsTool__WEBPACK_IMPORTED_MODULE_0__.alignTool, true);
                activatedCustomTool = _DrawStairsTool__WEBPACK_IMPORTED_MODULE_0__.alignTool;
            }
            else if (data.type === 'deActivateDrawStairsTool') {
                app.deactivateCustomTool(_DrawStairsTool__WEBPACK_IMPORTED_MODULE_0__.alignTool, false);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQSx1Q0FBdUMsc0RBQVM7QUFDaEQsc0NBQXNDLHNEQUFTO0FBQy9DO0FBQ0E7QUFDQSx5Q0FBeUMsc0RBQVM7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2RyYXctc3RhaXJzLy4vc3JjL21haW4vRHJhd1N0YWlyc1Rvb2wudHMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvLi9zcmMvbWFpbi91dGlscy50cyIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2RyYXctc3RhaXJzLy4vc3JjL21haW4vbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc0tBcmMzZCwgaXNLQXJjaEZhY2UsIGlzS0F1eGlsaWFyeUJvdW5kZWRDdXJ2ZSwgaXNLQXV4aWxpYXJ5TGluZSwgaXNLRWRnZSwgaXNLRmFjZSwgaXNLR3JvdXBJbnN0YW5jZSwgaXNLUGxhbmUsIGlzS1ZlcnRleCB9IGZyb20gXCIuL3V0aWxzXCI7XG52YXIgU3RhZ2U7XG4oZnVuY3Rpb24gKFN0YWdlKSB7XG4gICAgU3RhZ2VbU3RhZ2VbXCJQaWNrVXBNb2RlbFwiXSA9IDBdID0gXCJQaWNrVXBNb2RlbFwiO1xuICAgIFN0YWdlW1N0YWdlW1wiUGlja1VwVGFyZ2V0XCJdID0gMV0gPSBcIlBpY2tVcFRhcmdldFwiO1xufSkoU3RhZ2UgfHwgKFN0YWdlID0ge30pKTtcbmV4cG9ydCBjbGFzcyBEcmF3U3RhaXJzVG9vbCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc3RhZ2UgPSBTdGFnZS5QaWNrVXBNb2RlbDtcbiAgICB9XG4gICAgb25Ub29sQWN0aXZlKCkge1xuICAgIH1cbiAgICBvblRvb2xEZWFjdGl2ZSgpIHtcbiAgICAgICAgY29uc3QgcGx1Z2luVUkgPSBhcHAuZ2V0UGx1Z2luVUkoKTtcbiAgICAgICAgdGhpcy50cnlDb21taXQoKTtcbiAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiAnbGVhdmVEcmF3U3RhaXJzVG9vbCcgfSwgJyonKTtcbiAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgIH1cbiAgICBvbk1vdXNlTW92ZShldmVudCwgaW5mZXJlbmNlUmVzdWx0KSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mLCBfZywgX2gsIF9qLCBfaywgX2wsIF9tO1xuICAgICAgICBjb25zdCBlbnRpdHkgPSBpbmZlcmVuY2VSZXN1bHQgPT09IG51bGwgfHwgaW5mZXJlbmNlUmVzdWx0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBpbmZlcmVuY2VSZXN1bHQuZW50aXR5O1xuICAgICAgICBjb25zdCBhcHBWaWV3ID0gYXBwLmdldEFjdGl2ZVZpZXcoKTtcbiAgICAgICAgY29uc3QgY3VyTW9kZWwgPSB0aGlzLnN0YWdlID09PSBTdGFnZS5QaWNrVXBNb2RlbCA/IHRoaXMubW9kZWwgOiB0aGlzLnRhcmdldE1vZGVsO1xuICAgICAgICBpZiAoZW50aXR5KSB7XG4gICAgICAgICAgICBjb25zdCB0cmFuc2Zvcm0gPSBpbmZlcmVuY2VSZXN1bHQuaW5zdGFuY2VQYXRoLnJlZHVjZSgoYWNjLCBpbnN0YW5jZSkgPT4ge1xuICAgICAgICAgICAgICAgIGFjYy5tdWx0aXBseShpbnN0YW5jZS5nZXRUcmFuc2Zvcm0oKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgIH0sIEdlb21MaWIuY3JlYXRlSWRlbnRpdHlNYXRyaXg0KCkpO1xuICAgICAgICAgICAgbGV0IGluZmVyZW5jZU1vZGVsO1xuICAgICAgICAgICAgaWYgKGlzS0ZhY2UoZW50aXR5KSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN1cmZhY2UgPSBlbnRpdHkuZ2V0U3VyZmFjZSgpO1xuICAgICAgICAgICAgICAgIGlmIChpc0tQbGFuZShzdXJmYWNlKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzS0ZhY2UoY3VyTW9kZWwgPT09IG51bGwgfHwgY3VyTW9kZWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGN1ck1vZGVsLmluZmVyZW5jZUVudGl0eSkgfHwgKGN1ck1vZGVsID09PSBudWxsIHx8IGN1ck1vZGVsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjdXJNb2RlbC5pbmZlcmVuY2VFbnRpdHkuZ2V0S2V5KCkpICE9PSBlbnRpdHkuZ2V0S2V5KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5vcm1hbCA9IGluZmVyZW5jZVJlc3VsdC5ub3JtYWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBub3JtYWwgPSBzdXJmYWNlLm5vcm1hbC5hcHBsaWVkTWF0cml4NCh0cmFuc2Zvcm0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmFjZVZlcnRleFBvaW50cyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5LmdldFZlcnRpY2VzKCkuZm9yRWFjaCh2ZXJ0ZXggPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvaW50ID0gdmVydGV4LmdldFBvaW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhY2VWZXJ0ZXhQb2ludHMucHVzaChwb2ludC5hcHBsaWVkTWF0cml4NCh0cmFuc2Zvcm0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZmVyZW5jZU1vZGVsID0geyBwb3NpdGlvbjogaW5mZXJlbmNlUmVzdWx0LnBvc2l0aW9uLCBpbmZlcmVuY2VFbnRpdHk6IGVudGl0eSwgbm9ybWFsLCBwYXRoOiBpbmZlcmVuY2VSZXN1bHQuaW5zdGFuY2VQYXRoIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyTW9kZWwgPT09IG51bGwgfHwgY3VyTW9kZWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGN1ck1vZGVsLnRlbXBTaGFwZUlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwVmlldy5jbGVhclRlbXBvcmFyeVNoYXBlc0J5SWRzKFtjdXJNb2RlbC50ZW1wU2hhcGVJZF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZhY2VWZXJ0ZXhQb2ludHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhY2VWZXJ0ZXhQb2ludHMucHVzaChmYWNlVmVydGV4UG9pbnRzWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZW1wU2hhcGVJZCA9IChfYSA9IGFwcFZpZXcuZHJhd0ZsYXRMaW5lcyhbZmFjZVZlcnRleFBvaW50c10sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHsgcjogMjU1LCBnOiAwLCBiOiAwIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IEtMaW5lUGF0dGVybi5Tb2xpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmlkc1swXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZlcmVuY2VNb2RlbC50ZW1wU2hhcGVJZCA9IHRlbXBTaGFwZUlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhZ2UgPT09IFN0YWdlLlBpY2tVcE1vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbCA9IGluZmVyZW5jZU1vZGVsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXRNb2RlbCA9IGluZmVyZW5jZU1vZGVsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGN1ck1vZGVsLnBvc2l0aW9uID0gaW5mZXJlbmNlUmVzdWx0LnBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXNLRWRnZShlbnRpdHkpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcDAgPSAoX2IgPSBlbnRpdHkuZ2V0VmVydGV4QSgpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuZ2V0UG9pbnQoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwMSA9IChfYyA9IGVudGl0eS5nZXRWZXJ0ZXhCKCkpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5nZXRQb2ludCgpO1xuICAgICAgICAgICAgICAgIGlmIChwMCAmJiBwMSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzS0VkZ2UoY3VyTW9kZWwgPT09IG51bGwgfHwgY3VyTW9kZWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGN1ck1vZGVsLmluZmVyZW5jZUVudGl0eSkgfHwgKGN1ck1vZGVsID09PSBudWxsIHx8IGN1ck1vZGVsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjdXJNb2RlbC5pbmZlcmVuY2VFbnRpdHkuZ2V0S2V5KCkpICE9PSBlbnRpdHkuZ2V0S2V5KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvaW50cyA9IFtwMC5hcHBsaWVkTWF0cml4NCh0cmFuc2Zvcm0pLCBwMS5hcHBsaWVkTWF0cml4NCh0cmFuc2Zvcm0pXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHBvaW50c1sxXS5zdWJ0cmFjdGVkKHBvaW50c1swXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZlcmVuY2VNb2RlbCA9IHsgcG9zaXRpb246IGluZmVyZW5jZVJlc3VsdC5wb3NpdGlvbiwgaW5mZXJlbmNlRW50aXR5OiBlbnRpdHksIGRpcmVjdGlvbiwgcGF0aDogaW5mZXJlbmNlUmVzdWx0Lmluc3RhbmNlUGF0aCwgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJNb2RlbCA9PT0gbnVsbCB8fCBjdXJNb2RlbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogY3VyTW9kZWwudGVtcFNoYXBlSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBWaWV3LmNsZWFyVGVtcG9yYXJ5U2hhcGVzQnlJZHMoW2N1ck1vZGVsLnRlbXBTaGFwZUlkXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZW1wU2hhcGVJZCA9IChfZCA9IGFwcFZpZXcuZHJhd0ZsYXRMaW5lcyhbcG9pbnRzXSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB7IHI6IDI1NSwgZzogMCwgYjogMCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IEtMaW5lUGF0dGVybi5Tb2xpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QuaWRzWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5mZXJlbmNlTW9kZWwudGVtcFNoYXBlSWQgPSB0ZW1wU2hhcGVJZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YWdlID09PSBTdGFnZS5QaWNrVXBNb2RlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwgPSBpbmZlcmVuY2VNb2RlbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0TW9kZWwgPSBpbmZlcmVuY2VNb2RlbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjdXJNb2RlbC5wb3NpdGlvbiA9IGluZmVyZW5jZVJlc3VsdC5wb3NpdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzS1ZlcnRleChlbnRpdHkpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcDAgPSBlbnRpdHkuZ2V0UG9pbnQoKTtcbiAgICAgICAgICAgICAgICBpZiAocDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0tWZXJ0ZXgoY3VyTW9kZWwgPT09IG51bGwgfHwgY3VyTW9kZWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGN1ck1vZGVsLmluZmVyZW5jZUVudGl0eSkgfHwgISgoX2UgPSBjdXJNb2RlbCA9PT0gbnVsbCB8fCBjdXJNb2RlbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogY3VyTW9kZWwuaW5mZXJlbmNlRW50aXR5LmdldFBvaW50KCkpID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS5pc0VxdWFsKHAwKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZmVyZW5jZU1vZGVsID0geyBwb3NpdGlvbjogaW5mZXJlbmNlUmVzdWx0LnBvc2l0aW9uLCBpbmZlcmVuY2VFbnRpdHk6IGVudGl0eSwgcGF0aDogaW5mZXJlbmNlUmVzdWx0Lmluc3RhbmNlUGF0aCwgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJNb2RlbCA9PT0gbnVsbCB8fCBjdXJNb2RlbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogY3VyTW9kZWwudGVtcFNoYXBlSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBWaWV3LmNsZWFyVGVtcG9yYXJ5U2hhcGVzQnlJZHMoW2N1ck1vZGVsLnRlbXBTaGFwZUlkXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZW1wU2hhcGVJZCA9IChfZiA9IGFwcFZpZXcuZHJhd1BvaW50cyhbcDAuYXBwbGllZE1hdHJpeDQodHJhbnNmb3JtKV0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogeyByOiAyNTUsIGc6IDAsIGI6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKSA9PT0gbnVsbCB8fCBfZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2YuaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZlcmVuY2VNb2RlbC50ZW1wU2hhcGVJZCA9IHRlbXBTaGFwZUlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhZ2UgPT09IFN0YWdlLlBpY2tVcE1vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbCA9IGluZmVyZW5jZU1vZGVsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXRNb2RlbCA9IGluZmVyZW5jZU1vZGVsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGN1ck1vZGVsLnBvc2l0aW9uID0gaW5mZXJlbmNlUmVzdWx0LnBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXNLQXV4aWxpYXJ5Qm91bmRlZEN1cnZlKGVudGl0eSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBib3VuZGVkQ3VydmUgPSBlbnRpdHkuZ2V0Qm91bmRlZEN1cnZlKCk7XG4gICAgICAgICAgICAgICAgaWYgKGlzS0FyYzNkKGJvdW5kZWRDdXJ2ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VydmVQb2ludHMgPSBib3VuZGVkQ3VydmUuZ2V0QXBwcm94aW1hdGVQb2ludHNCeUFuZ2xlKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJ2ZVBvaW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNLQXV4aWxpYXJ5Qm91bmRlZEN1cnZlKGN1ck1vZGVsID09PSBudWxsIHx8IGN1ck1vZGVsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjdXJNb2RlbC5pbmZlcmVuY2VFbnRpdHkpIHx8IChjdXJNb2RlbCA9PT0gbnVsbCB8fCBjdXJNb2RlbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogY3VyTW9kZWwuaW5mZXJlbmNlRW50aXR5LmdldEtleSgpKSAhPT0gZW50aXR5LmdldEtleSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9pbnRzID0gY3VydmVQb2ludHMubWFwKHAgPT4gcC5hcHBsaWVkTWF0cml4NCh0cmFuc2Zvcm0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBub3JtYWwgPSBib3VuZGVkQ3VydmUubm9ybWFsLmFwcGxpZWRNYXRyaXg0KHRyYW5zZm9ybSkubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZmVyZW5jZU1vZGVsID0geyBwb3NpdGlvbjogaW5mZXJlbmNlUmVzdWx0LnBvc2l0aW9uLCBpbmZlcmVuY2VFbnRpdHk6IGVudGl0eSwgbm9ybWFsLCBwYXRoOiBpbmZlcmVuY2VSZXN1bHQuaW5zdGFuY2VQYXRoLCB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJNb2RlbCA9PT0gbnVsbCB8fCBjdXJNb2RlbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogY3VyTW9kZWwudGVtcFNoYXBlSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwVmlldy5jbGVhclRlbXBvcmFyeVNoYXBlc0J5SWRzKFtjdXJNb2RlbC50ZW1wU2hhcGVJZF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZW1wU2hhcGVJZCA9IChfZyA9IGFwcFZpZXcuZHJhd0ZsYXRMaW5lcyhbcG9pbnRzXSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogeyByOiAyNTUsIGc6IDAsIGI6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogS0xpbmVQYXR0ZXJuLlNvbGlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSA9PT0gbnVsbCB8fCBfZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2cuaWRzWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZmVyZW5jZU1vZGVsLnRlbXBTaGFwZUlkID0gdGVtcFNoYXBlSWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhZ2UgPT09IFN0YWdlLlBpY2tVcE1vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwgPSBpbmZlcmVuY2VNb2RlbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0TW9kZWwgPSBpbmZlcmVuY2VNb2RlbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyTW9kZWwucG9zaXRpb24gPSBpbmZlcmVuY2VSZXN1bHQucG9zaXRpb247XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHAwID0gKF9oID0gZW50aXR5LmdldFN0YXJ0VmVydGV4KCkpID09PSBudWxsIHx8IF9oID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfaC5nZXRQb2ludCgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwMSA9IChfaiA9IGVudGl0eS5nZXRFbmRWZXJ0ZXgoKSkgPT09IG51bGwgfHwgX2ogPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9qLmdldFBvaW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwMCAmJiBwMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0tBdXhpbGlhcnlCb3VuZGVkQ3VydmUoY3VyTW9kZWwgPT09IG51bGwgfHwgY3VyTW9kZWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGN1ck1vZGVsLmluZmVyZW5jZUVudGl0eSkgfHwgKGN1ck1vZGVsID09PSBudWxsIHx8IGN1ck1vZGVsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjdXJNb2RlbC5pbmZlcmVuY2VFbnRpdHkuZ2V0S2V5KCkpICE9PSBlbnRpdHkuZ2V0S2V5KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwb2ludHMgPSBbcDAuYXBwbGllZE1hdHJpeDQodHJhbnNmb3JtKSwgcDEuYXBwbGllZE1hdHJpeDQodHJhbnNmb3JtKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gcG9pbnRzWzFdLnN1YnRyYWN0ZWQocG9pbnRzWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZlcmVuY2VNb2RlbCA9IHsgcG9zaXRpb246IGluZmVyZW5jZVJlc3VsdC5wb3NpdGlvbiwgaW5mZXJlbmNlRW50aXR5OiBlbnRpdHksIGRpcmVjdGlvbiwgcGF0aDogaW5mZXJlbmNlUmVzdWx0Lmluc3RhbmNlUGF0aCwgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyTW9kZWwgPT09IG51bGwgfHwgY3VyTW9kZWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGN1ck1vZGVsLnRlbXBTaGFwZUlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcFZpZXcuY2xlYXJUZW1wb3JhcnlTaGFwZXNCeUlkcyhbY3VyTW9kZWwudGVtcFNoYXBlSWRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGVtcFNoYXBlSWQgPSAoX2sgPSBhcHBWaWV3LmRyYXdGbGF0TGluZXMoW3BvaW50c10sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHsgcjogMjU1LCBnOiAwLCBiOiAwIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IEtMaW5lUGF0dGVybi5Tb2xpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSkgPT09IG51bGwgfHwgX2sgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9rLmlkc1swXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZlcmVuY2VNb2RlbC50ZW1wU2hhcGVJZCA9IHRlbXBTaGFwZUlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YWdlID09PSBTdGFnZS5QaWNrVXBNb2RlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGVsID0gaW5mZXJlbmNlTW9kZWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldE1vZGVsID0gaW5mZXJlbmNlTW9kZWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ck1vZGVsLnBvc2l0aW9uID0gaW5mZXJlbmNlUmVzdWx0LnBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXNLQXV4aWxpYXJ5TGluZShlbnRpdHkpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGluZSA9IGVudGl0eS5nZXRMaW5lKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFpc0tBdXhpbGlhcnlMaW5lKGN1ck1vZGVsID09PSBudWxsIHx8IGN1ck1vZGVsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjdXJNb2RlbC5pbmZlcmVuY2VFbnRpdHkpIHx8IChjdXJNb2RlbCA9PT0gbnVsbCB8fCBjdXJNb2RlbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogY3VyTW9kZWwuaW5mZXJlbmNlRW50aXR5LmdldEtleSgpKSAhPT0gZW50aXR5LmdldEtleSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgZGlyZWN0aW9uOiBsaW5lRGlyZWN0aW9uLCBvcmlnaW4gfSA9IGxpbmU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvaW50cyA9IFtvcmlnaW4uYWRkZWQobGluZURpcmVjdGlvbi5tdWx0aXBsaWVkKDEwMDAwMCkpLmFwcGxpZWRNYXRyaXg0KHRyYW5zZm9ybSksIG9yaWdpbi5hZGRlZChsaW5lRGlyZWN0aW9uLm11bHRpcGxpZWQoLTEwMDAwMCkpLmFwcGxpZWRNYXRyaXg0KHRyYW5zZm9ybSldO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBwb2ludHNbMV0uc3VidHJhY3RlZChwb2ludHNbMF0pO1xuICAgICAgICAgICAgICAgICAgICBpbmZlcmVuY2VNb2RlbCA9IHsgcG9zaXRpb246IGluZmVyZW5jZVJlc3VsdC5wb3NpdGlvbiwgaW5mZXJlbmNlRW50aXR5OiBlbnRpdHksIGRpcmVjdGlvbiwgcGF0aDogaW5mZXJlbmNlUmVzdWx0Lmluc3RhbmNlUGF0aCwgfTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1ck1vZGVsID09PSBudWxsIHx8IGN1ck1vZGVsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjdXJNb2RlbC50ZW1wU2hhcGVJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBwVmlldy5jbGVhclRlbXBvcmFyeVNoYXBlc0J5SWRzKFtjdXJNb2RlbC50ZW1wU2hhcGVJZF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRlbXBTaGFwZUlkID0gKF9sID0gYXBwVmlldy5kcmF3RmxhdExpbmVzKFtwb2ludHNdLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogeyByOiAyNTUsIGc6IDAsIGI6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IEtMaW5lUGF0dGVybi5Tb2xpZCxcbiAgICAgICAgICAgICAgICAgICAgfSkpID09PSBudWxsIHx8IF9sID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfbC5pZHNbMF07XG4gICAgICAgICAgICAgICAgICAgIGluZmVyZW5jZU1vZGVsLnRlbXBTaGFwZUlkID0gdGVtcFNoYXBlSWQ7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YWdlID09PSBTdGFnZS5QaWNrVXBNb2RlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbCA9IGluZmVyZW5jZU1vZGVsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXRNb2RlbCA9IGluZmVyZW5jZU1vZGVsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY3VyTW9kZWwucG9zaXRpb24gPSBpbmZlcmVuY2VSZXN1bHQucG9zaXRpb247XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXNLQXJjaEZhY2UoZW50aXR5KSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YWdlID09PSBTdGFnZS5QaWNrVXBUYXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3VyZmFjZSA9IGVudGl0eS5nZXRTdXJmYWNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0tQbGFuZShzdXJmYWNlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udG91ciA9IGVudGl0eS5nZXRGYWNlM2QoKS5jb250b3VyO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm9ybWFsID0gaW5mZXJlbmNlUmVzdWx0Lm5vcm1hbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IG5vcm1hbCA9IHN1cmZhY2Uubm9ybWFsLmFwcGxpZWRNYXRyaXg0KHRyYW5zZm9ybSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb250b3VyUG9pbnRzID0gY29udG91ci5tYXAoc2VnbWVudCA9PiBzZWdtZW50LnN0YXJ0UG9pbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5mZXJlbmNlTW9kZWwgPSB7IHBvc2l0aW9uOiBpbmZlcmVuY2VSZXN1bHQucG9zaXRpb24sIGluZmVyZW5jZUVudGl0eTogZW50aXR5LCBub3JtYWwsIHBhdGg6IGluZmVyZW5jZVJlc3VsdC5pbnN0YW5jZVBhdGggfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJNb2RlbCA9PT0gbnVsbCB8fCBjdXJNb2RlbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogY3VyTW9kZWwudGVtcFNoYXBlSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBWaWV3LmNsZWFyVGVtcG9yYXJ5U2hhcGVzQnlJZHMoW2N1ck1vZGVsLnRlbXBTaGFwZUlkXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udG91clBvaW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udG91clBvaW50cy5wdXNoKGNvbnRvdXJQb2ludHNbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRlbXBTaGFwZUlkID0gKF9tID0gYXBwVmlldy5kcmF3RmxhdExpbmVzKFtjb250b3VyUG9pbnRzXSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogeyByOiAyNTUsIGc6IDAsIGI6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogS0xpbmVQYXR0ZXJuLlNvbGlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSA9PT0gbnVsbCB8fCBfbSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX20uaWRzWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZmVyZW5jZU1vZGVsLnRlbXBTaGFwZUlkID0gdGVtcFNoYXBlSWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldE1vZGVsID0gaW5mZXJlbmNlTW9kZWw7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc0tHcm91cEluc3RhbmNlKGVudGl0eSkpIHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoY3VyTW9kZWwgPT09IG51bGwgfHwgY3VyTW9kZWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGN1ck1vZGVsLnRlbXBTaGFwZUlkKSB7XG4gICAgICAgICAgICBhcHBWaWV3LmNsZWFyVGVtcG9yYXJ5U2hhcGVzQnlJZHMoW2N1ck1vZGVsLnRlbXBTaGFwZUlkXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhZ2UgPT09IFN0YWdlLlBpY2tVcE1vZGVsKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50YXJnZXRNb2RlbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvbkxCdXR0b25VcChldmVudCwgaW5mZXJlbmNlUmVzdWx0KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YWdlID09PSBTdGFnZS5QaWNrVXBNb2RlbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubW9kZWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWdlID0gU3RhZ2UuUGlja1VwVGFyZ2V0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMudGFyZ2V0TW9kZWwpIHtcbiAgICAgICAgICAgICAgICBhcHAuZGVhY3RpdmF0ZUN1c3RvbVRvb2wodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgdHJ5Q29tbWl0KCkge1xuICAgICAgICBpZiAodGhpcy5tb2RlbCAmJiB0aGlzLnRhcmdldE1vZGVsKSB7XG4gICAgICAgICAgICBjb25zdCBkZXNpZ24gPSBhcHAuZ2V0QWN0aXZlRGVzaWduKCk7XG4gICAgICAgICAgICBjb25zdCBlZGl0UGF0aCA9IGRlc2lnbi5nZXRFZGl0UGF0aCgpO1xuICAgICAgICAgICAgY29uc3QgZWRpdFRyYW5zZm9ybSA9IGVkaXRQYXRoLnJlZHVjZSgoYWNjLCBpbnN0YW5jZSkgPT4ge1xuICAgICAgICAgICAgICAgIGFjYy5tdWx0aXBseShpbnN0YW5jZS5nZXRUcmFuc2Zvcm0oKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgIH0sIEdlb21MaWIuY3JlYXRlSWRlbnRpdHlNYXRyaXg0KCkpO1xuICAgICAgICAgICAgY29uc3QgeyBwb3NpdGlvbjogbW9kZWxQb3NpdGlvbiwgaW5mZXJlbmNlRW50aXR5OiBtb2RlbEVudGl0eSwgbm9ybWFsOiBtb2RlbE5vcm1hbCwgZGlyZWN0aW9uOiBtb2RlbERpcmVjdGlvbiwgcGF0aDogbW9kZWxQYXRoIH0gPSB0aGlzLm1vZGVsO1xuICAgICAgICAgICAgY29uc3QgeyBwb3NpdGlvbjogdGFyZ2V0UG9zaXRpb24sIG5vcm1hbDogdGFyZ2V0Tm9ybWFsLCBkaXJlY3Rpb246IHRhcmdldERpcmVjdGlvbiB9ID0gdGhpcy50YXJnZXRNb2RlbDtcbiAgICAgICAgICAgIGNvbnN0IG1hdCA9IGVkaXRUcmFuc2Zvcm0uaW52ZXJzZWQoKS5tdWx0aXBsaWVkKEdlb21MaWIuY3JlYXRlVHJhbnNsYXRpb25NYXRyaXg0KHRhcmdldFBvc2l0aW9uLnggLSBtb2RlbFBvc2l0aW9uLngsIHRhcmdldFBvc2l0aW9uLnkgLSBtb2RlbFBvc2l0aW9uLnksIHRhcmdldFBvc2l0aW9uLnogLSBtb2RlbFBvc2l0aW9uLnopKTtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldE5vcm1hbFJldmVyc2UgPSB0YXJnZXROb3JtYWwgPT09IG51bGwgfHwgdGFyZ2V0Tm9ybWFsID09PSB2b2lkIDAgPyB2b2lkIDAgOiB0YXJnZXROb3JtYWwucmV2ZXJzZWQoKTtcbiAgICAgICAgICAgIGlmICh0YXJnZXROb3JtYWxSZXZlcnNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1vZGVsTm9ybWFsICYmICFtb2RlbE5vcm1hbC5pc1BhcmFsbGVsKHRhcmdldE5vcm1hbFJldmVyc2UpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNyb3NzVmVjID0gbW9kZWxOb3JtYWwuY3Jvc3ModGFyZ2V0Tm9ybWFsUmV2ZXJzZSkubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhbmdlbCA9IG1vZGVsTm9ybWFsLmFuZ2xlVG8odGFyZ2V0Tm9ybWFsUmV2ZXJzZSwgY3Jvc3NWZWMpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByb3RhdGVNYXRyaXggPSBHZW9tTGliLmNyZWF0ZVJvdGF0ZU1hdHJpeDQoYW5nZWwsIGNyb3NzVmVjLCB0aGlzLm1vZGVsLnBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgbWF0Lm11bHRpcGx5KHJvdGF0ZU1hdHJpeCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG1vZGVsRGlyZWN0aW9uICYmICFtb2RlbERpcmVjdGlvbi5pc1BlcnBlbmRpY3VsYXIodGFyZ2V0Tm9ybWFsUmV2ZXJzZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY3Jvc3NWZWMxID0gbW9kZWxEaXJlY3Rpb24uY3Jvc3ModGFyZ2V0Tm9ybWFsUmV2ZXJzZSkubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhbmdlbDEgPSBtb2RlbERpcmVjdGlvbi5hbmdsZVRvKHRhcmdldE5vcm1hbFJldmVyc2UsIGNyb3NzVmVjMSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvdGF0ZU1hdHJpeDEgPSBHZW9tTGliLmNyZWF0ZVJvdGF0ZU1hdHJpeDQoYW5nZWwxIC0gTWF0aC5QSSAvIDIgKiAoYW5nZWwxID4gTWF0aC5QSSA/IDMgOiAxKSwgY3Jvc3NWZWMxLCB0aGlzLm1vZGVsLnBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgbWF0Lm11bHRpcGx5KHJvdGF0ZU1hdHJpeDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRhcmdldERpcmVjdGlvbikge1xuICAgICAgICAgICAgICAgIGlmIChtb2RlbE5vcm1hbCAmJiAhbW9kZWxOb3JtYWwuaXNQZXJwZW5kaWN1bGFyKHRhcmdldERpcmVjdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY3Jvc3NWZWMyID0gbW9kZWxOb3JtYWwuY3Jvc3ModGFyZ2V0RGlyZWN0aW9uKS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFuZ2VsMiA9IG1vZGVsTm9ybWFsLmFuZ2xlVG8odGFyZ2V0RGlyZWN0aW9uLCBjcm9zc1ZlYzIpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByb3RhdGVNYXRyaXgxID0gR2VvbUxpYi5jcmVhdGVSb3RhdGVNYXRyaXg0KGFuZ2VsMiAtIE1hdGguUEkgLyAyICogKGFuZ2VsMiA+IE1hdGguUEkgPyAzIDogMSksIGNyb3NzVmVjMiwgdGhpcy5tb2RlbC5wb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIG1hdC5tdWx0aXBseShyb3RhdGVNYXRyaXgxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobW9kZWxEaXJlY3Rpb24gJiYgIW1vZGVsRGlyZWN0aW9uLmlzUGFyYWxsZWwodGFyZ2V0RGlyZWN0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjcm9zc1ZlYzMgPSBtb2RlbERpcmVjdGlvbi5jcm9zcyh0YXJnZXREaXJlY3Rpb24pLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYW5nZWwzID0gbW9kZWxEaXJlY3Rpb24uYW5nbGVUbyh0YXJnZXREaXJlY3Rpb24sIGNyb3NzVmVjMyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvdGF0ZU1hdHJpeDEgPSBHZW9tTGliLmNyZWF0ZVJvdGF0ZU1hdHJpeDQoYW5nZWwzIC0gTWF0aC5QSSAvIDIgKiAoYW5nZWwzID4gTWF0aC5QSSA/IDMgOiAxKSwgY3Jvc3NWZWMzLCB0aGlzLm1vZGVsLnBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgbWF0Lm11bHRpcGx5KHJvdGF0ZU1hdHJpeDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1hdC5tdWx0aXBseShlZGl0VHJhbnNmb3JtKTtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldFRvVHJhbnNmb3JtID0gbW9kZWxQYXRoLmZpbmQoaW5zdGFuY2UgPT4gIWVkaXRQYXRoLnNvbWUoaW5zID0+IGlucy5nZXRLZXkoKSA9PT0gaW5zdGFuY2UuZ2V0S2V5KCkpKSB8fCBtb2RlbEVudGl0eTtcbiAgICAgICAgICAgIGxldCB0cmFuc2Zvcm1TdWNjZXNzID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoaXNLRmFjZSh0YXJnZXRUb1RyYW5zZm9ybSkgfHwgaXNLRWRnZSh0YXJnZXRUb1RyYW5zZm9ybSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzaGVsbCA9IHRhcmdldFRvVHJhbnNmb3JtLmdldFNoZWxsKCk7XG4gICAgICAgICAgICAgICAgaWYgKHNoZWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybVN1Y2Nlc3MgPSBkZXNpZ24udHJhbnNmb3JtU2hlbGxzKFtzaGVsbF0sIG1hdCkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzS1ZlcnRleCh0YXJnZXRUb1RyYW5zZm9ybSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzaGVsbCA9IHRhcmdldFRvVHJhbnNmb3JtLmdldEVkZ2VzKClbMF0uZ2V0U2hlbGwoKTtcbiAgICAgICAgICAgICAgICBpZiAoc2hlbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtU3VjY2VzcyA9IGRlc2lnbi50cmFuc2Zvcm1TaGVsbHMoW3NoZWxsXSwgbWF0KS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXNLQXV4aWxpYXJ5Qm91bmRlZEN1cnZlKHRhcmdldFRvVHJhbnNmb3JtKSB8fCBpc0tBdXhpbGlhcnlMaW5lKHRhcmdldFRvVHJhbnNmb3JtKSkge1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybVN1Y2Nlc3MgPSBkZXNpZ24udHJhbnNmb3JtQXV4aWxpYXJ5Q3VydmVzKFt0YXJnZXRUb1RyYW5zZm9ybV0sIG1hdCkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXNLR3JvdXBJbnN0YW5jZSh0YXJnZXRUb1RyYW5zZm9ybSkpIHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1TdWNjZXNzID0gZGVzaWduLnRyYW5zZm9ybUdyb3VwSW5zdGFuY2VzKFt0YXJnZXRUb1RyYW5zZm9ybV0sIG1hdCkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRyYW5zZm9ybVN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSBhcHAuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uLmFkZChbdGFyZ2V0VG9UcmFuc2Zvcm1dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNvbnN0IHBpY2tIZWxwZXIgPSBhcHAuZ2V0UGlja0hlbHBlcigpO1xuICAgICAgICAgICAgLy8gLy8gY29uc3QgcGlja2FibGVFbnRpdHlUeXBlID0gdGhpcy5tb2RlbCA/IFtLRW50aXR5VHlwZS5BdXhpbGlhcnlCb3VuZGVkQ3VydmVdIDogW0tBcHBFbnRpdHlUeXBlLkdyb3VwSW5zdGFuY2UsIEtFbnRpdHlUeXBlLkZhY2VdO1xuICAgICAgICAgICAgLy8gY29uc3QgYWxsUGlja2VkRW50aXRpZXMgPSBwaWNrSGVscGVyLnBpY2tCeVBvaW50KGV2ZW50LmNsaWVudFgoKSwgZXZlbnQuY2xpZW50WSgpKS5nZXRBbGxQaWNrZWQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjbGVhcigpIHtcbiAgICAgICAgY29uc3QgYXBwVmlldyA9IGFwcC5nZXRBY3RpdmVWaWV3KCk7XG4gICAgICAgIGFwcFZpZXcuY2xlYXJUZW1wb3JhcnlTaGFwZXMoKTtcbiAgICAgICAgdGhpcy5tb2RlbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy50YXJnZXRNb2RlbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zdGFnZSA9IFN0YWdlLlBpY2tVcE1vZGVsO1xuICAgIH1cbiAgICBvblJCdXR0b25VcChldmVudCwgaW5mZXJlbmNlUmVzdWx0KSB7XG4gICAgICAgIGFwcC5kZWFjdGl2YXRlQ3VzdG9tVG9vbCh0aGlzKTtcbiAgICB9XG4gICAgb25MQnV0dG9uRGJDbGljayhldmVudCwgaW5mZXJlbmNlUmVzdWx0KSB7XG4gICAgICAgIDtcbiAgICB9XG4gICAgYWxsb3dVc2luZ0luZmVyZW5jZSgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIG9uS2V5RG93bihldmVudCkge1xuICAgICAgICA7XG4gICAgfVxuICAgIG9uS2V5VXAoZXZlbnQpIHtcbiAgICAgICAgO1xuICAgIH1cbn1cbmV4cG9ydCBjb25zdCBhbGlnblRvb2wgPSBuZXcgRHJhd1N0YWlyc1Rvb2woKTtcbiIsImV4cG9ydCBmdW5jdGlvbiBpc0tBcmNoRmFjZShlbnRpdHkpIHtcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgKGVudGl0eS5nZXRUeXBlKCkgPT09IEtBcmNoRmFjZVR5cGUuTm9uUGxhbmFyIHx8IGVudGl0eS5nZXRUeXBlKCkgPT09IEtBcmNoRmFjZVR5cGUuUGxhbmFyKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0tHcm91cEluc3RhbmNlKGVudGl0eSkge1xuICAgIHJldHVybiAhIWVudGl0eSAmJiBlbnRpdHkuZ2V0VHlwZSgpID09PSBLRW50aXR5VHlwZS5Hcm91cEluc3RhbmNlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzS0ZhY2UoZW50aXR5KSB7XG4gICAgcmV0dXJuICEhZW50aXR5ICYmIGVudGl0eS5nZXRUeXBlKCkgPT09IEtFbnRpdHlUeXBlLkZhY2U7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNLRWRnZShlbnRpdHkpIHtcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS0VudGl0eVR5cGUuRWRnZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0tWZXJ0ZXgoZW50aXR5KSB7XG4gICAgcmV0dXJuICEhZW50aXR5ICYmIGVudGl0eS5nZXRUeXBlKCkgPT09IEtFbnRpdHlUeXBlLlZlcnRleDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0tBdXhpbGlhcnlCb3VuZGVkQ3VydmUoZW50aXR5KSB7XG4gICAgcmV0dXJuICEhZW50aXR5ICYmIGVudGl0eS5nZXRUeXBlKCkgPT09IEtFbnRpdHlUeXBlLkF1eGlsaWFyeUJvdW5kZWRDdXJ2ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0tBdXhpbGlhcnlMaW5lKGVudGl0eSkge1xuICAgIHJldHVybiAhIWVudGl0eSAmJiBlbnRpdHkuZ2V0VHlwZSgpID09PSBLRW50aXR5VHlwZS5BdXhpbGlhcnlMaW5lO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzS1BsYW5lKGVudGl0eSkge1xuICAgIHJldHVybiAhIWVudGl0eSAmJiBlbnRpdHkuZ2V0VHlwZSgpID09PSBLU3VyZmFjZVR5cGUuUGxhbmU7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNLTGluZVNlZ21lbnQzZChlbnRpdHkpIHtcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgISFlbnRpdHkuZGlyZWN0aW9uO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzS0FyYzNkKGVudGl0eSkge1xuICAgIHJldHVybiAhIWVudGl0eSAmJiAhIWVudGl0eS5jaXJjbGU7XG59XG5leHBvcnQgZnVuY3Rpb24gZ3JvdXBGYWNlc0J5Q29ubmVjdGlvbihmYWNlcykge1xuICAgIGlmIChmYWNlcy5sZW5ndGggPCAxKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgaWYgKGZhY2VzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgcmV0dXJuIFtmYWNlc107XG4gICAgfVxuICAgIGNvbnN0IGVkZ2VGYWNlSWRzID0gbmV3IE1hcCgpO1xuICAgIGNvbnN0IGZhY2VJbmRNYXAgPSBmYWNlcy5yZWR1Y2UoKG1hcCwgZiwgaSkgPT4ge1xuICAgICAgICBjb25zdCBmYWNlS2V5ID0gZi5nZXRLZXkoKTtcbiAgICAgICAgbWFwLnNldChmYWNlS2V5LCBpKTtcbiAgICAgICAgZi5nZXRFZGdlcygpLmZvckVhY2goZWRnZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlZGdlS2V5ID0gZWRnZS5nZXRLZXkoKTtcbiAgICAgICAgICAgIGxldCB0aGVGYWNlSWRzID0gZWRnZUZhY2VJZHMuZ2V0KGVkZ2VLZXkpO1xuICAgICAgICAgICAgaWYgKCF0aGVGYWNlSWRzKSB7XG4gICAgICAgICAgICAgICAgdGhlRmFjZUlkcyA9IFtdO1xuICAgICAgICAgICAgICAgIGVkZ2VGYWNlSWRzLnNldChlZGdlS2V5LCB0aGVGYWNlSWRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoZUZhY2VJZHMucHVzaChmYWNlS2V5KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBtYXA7XG4gICAgfSwgbmV3IE1hcCgpKTtcbiAgICBjb25zdCBmaW5lUGFyZW50ID0gKGluZCkgPT4ge1xuICAgICAgICBsZXQgdGhlSW5kID0gaW5kO1xuICAgICAgICBsZXQgcCA9IHBhcmVudHNbaW5kXTtcbiAgICAgICAgd2hpbGUgKHAgIT09IHRoZUluZCkge1xuICAgICAgICAgICAgdGhlSW5kID0gcDtcbiAgICAgICAgICAgIHAgPSBwYXJlbnRzW3RoZUluZF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfTtcbiAgICBjb25zdCB1bmlvbiA9IChpbmQxLCBpbmQyKSA9PiB7XG4gICAgICAgIGNvbnN0IHAxID0gZmluZVBhcmVudChpbmQxKTtcbiAgICAgICAgY29uc3QgcDIgPSBmaW5lUGFyZW50KGluZDIpO1xuICAgICAgICBjb25zdCByMSA9IHJhbmtzW3AxXTtcbiAgICAgICAgY29uc3QgcjIgPSByYW5rc1twMl07XG4gICAgICAgIGlmIChyMSA8IHIyKSB7XG4gICAgICAgICAgICBwYXJlbnRzW3AxXSA9IHAyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcGFyZW50c1twMl0gPSBwMTtcbiAgICAgICAgICAgIGlmIChyMSA9PT0gcjIpIHtcbiAgICAgICAgICAgICAgICByYW5rc1twMV0gKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgYWRqRmFjZU1hcCA9IG5ldyBNYXAoKTtcbiAgICBmb3IgKGNvbnN0IGYgb2YgZmFjZXMpIHtcbiAgICAgICAgY29uc3QgZmFjZUlkID0gZi5nZXRLZXkoKTtcbiAgICAgICAgY29uc3QgZmFjZUluZCA9IGZhY2VJbmRNYXAuZ2V0KGZhY2VJZCk7XG4gICAgICAgIGNvbnN0IGVkZ2VLZXlzID0gZi5nZXRFZGdlcygpLm1hcChlID0+IGUuZ2V0S2V5KCkpO1xuICAgICAgICBpZiAoZmFjZUluZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVkZ2VLZXkgb2YgZWRnZUtleXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhZGpGYWNlSWRzID0gZWRnZUZhY2VJZHMuZ2V0KGVkZ2VLZXkpO1xuICAgICAgICAgICAgICAgIGlmICghYWRqRmFjZUlkcyB8fCAhYWRqRmFjZUlkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgYWRqSWQgb2YgYWRqRmFjZUlkcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmQgPSBmYWNlSW5kTWFwLmdldChhZGpJZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmQgIT09IHVuZGVmaW5lZCAmJiBmYWNlSW5kICE9PSBpbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhZGpTZXQgPSBhZGpGYWNlTWFwLmdldChmYWNlSW5kKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYWRqU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRqU2V0ID0gbmV3IFNldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkakZhY2VNYXAuc2V0KGZhY2VJbmQsIGFkalNldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBhZGpTZXQuYWRkKGluZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgcGFyZW50cyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IGZhY2VzLmxlbmd0aCB9LCAoXywgaSkgPT4gaSk7XG4gICAgY29uc3QgcmFua3MgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiBmYWNlcy5sZW5ndGggfSwgXyA9PiAxKTtcbiAgICBmb3IgKGNvbnN0IFtmSW5kLCBpbmRzXSBvZiBhZGpGYWNlTWFwKSB7XG4gICAgICAgIGZvciAoY29uc3QgaW5kIG9mIGluZHMpIHtcbiAgICAgICAgICAgIHVuaW9uKGZpbmVQYXJlbnQoZkluZCksIGZpbmVQYXJlbnQoaW5kKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgcHMgPSBuZXcgTWFwKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmYWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBwYXJlbnRJbmQgPSBmaW5lUGFyZW50KGkpO1xuICAgICAgICBsZXQgcGF0Y2hGYWNlcyA9IHBzLmdldChwYXJlbnRJbmQpO1xuICAgICAgICBpZiAoIXBhdGNoRmFjZXMpIHtcbiAgICAgICAgICAgIHBhdGNoRmFjZXMgPSBbXTtcbiAgICAgICAgICAgIHBzLnNldChwYXJlbnRJbmQsIHBhdGNoRmFjZXMpO1xuICAgICAgICB9XG4gICAgICAgIHBhdGNoRmFjZXMucHVzaChmYWNlc1tpXSk7XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGZvciAoY29uc3QgWywgcGF0Y2hdIG9mIHBzKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHBhdGNoKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBhbGlnblRvb2wgfSBmcm9tIFwiLi9EcmF3U3RhaXJzVG9vbFwiO1xuY29uc3QgcGx1Z2luVUkgPSBhcHAuZ2V0UGx1Z2luVUkoKTtcbnBsdWdpblVJLnJlc2l6ZSgyNDAsIDcwMCk7XG5wbHVnaW5VSS5tb3VudCgpO1xubGV0IGFjdGl2YXRlZEN1c3RvbVRvb2w7XG5mdW5jdGlvbiBvblVJTWVzc2FnZShkYXRhKSB7XG4gICAgdmFyIF9hO1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoKF9hID0gZGF0YS50eXBlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc3RhcnRzV2l0aCgnYWN0aXZhdGUnKSkge1xuICAgICAgICAgICAgICAgIGlmIChhY3RpdmF0ZWRDdXN0b21Ub29sKSB7XG4gICAgICAgICAgICAgICAgICAgIGFwcC5kZWFjdGl2YXRlQ3VzdG9tVG9vbChhY3RpdmF0ZWRDdXN0b21Ub29sLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YS50eXBlID09PSAnYWN0aXZhdGVEcmF3U3RhaXJzVG9vbCcpIHtcbiAgICAgICAgICAgICAgICBhcHAuYWN0aXZhdGVDdXN0b21Ub29sKGFsaWduVG9vbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgYWN0aXZhdGVkQ3VzdG9tVG9vbCA9IGFsaWduVG9vbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gJ2RlQWN0aXZhdGVEcmF3U3RhaXJzVG9vbCcpIHtcbiAgICAgICAgICAgICAgICBhcHAuZGVhY3RpdmF0ZUN1c3RvbVRvb2woYWxpZ25Ub29sLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgYWN0aXZhdGVkQ3VzdG9tVG9vbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgY2xvc2VQbHVnaW4oKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxucGx1Z2luVUkub25NZXNzYWdlKG9uVUlNZXNzYWdlKTtcbmNvbnN0IHNlbGVjdGlvbiA9IGFwcC5nZXRTZWxlY3Rpb24oKTtcbnNlbGVjdGlvbi5hZGRPYnNlcnZlcih7XG4gICAgb25TZWxlY3Rpb25DaGFuZ2U6ICgpID0+IHtcbiAgICB9XG59KTtcbi8vIGZ1bmN0aW9uIG9uUGx1Z2luU3RhcnRVcCgpIHtcbi8vIH1cbi8vIG9uUGx1Z2luU3RhcnRVcCgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9