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
/* harmony import */ var _tools_drawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools/drawStairsTool/index */ "./src/main/tools/drawStairsTool/index.ts");
/* harmony import */ var _tools_drawStairsTool_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tools/drawStairsTool/utils */ "./src/main/tools/drawStairsTool/utils.ts");
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
                if (activatedCustomTool !== _tools_drawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool) {
                    app.activateCustomTool(_tools_drawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool, true);
                    activatedCustomTool = _tools_drawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool;
                }
                // drawStairsTool.changeComponentType(data.componentType);
            }
            else if (data.type === _types__WEBPACK_IMPORTED_MODULE_2__.MessageType.DeActivateDrawStairsTool) {
                // } else if (data.type === 'deActivateStraightStairsTool' || data.type === 'deActivateCircularStairsTool') {
                deActivateDrawStairsTool();
            }
            else if (data.type === _types__WEBPACK_IMPORTED_MODULE_2__.MessageType.StairParamChangedByInput) {
                // if (activatedCustomTool === drawStairsTool) {
                _tools_drawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool.changeStairParam(data.stairParam, data.changeParams);
                // }
            }
            else if (data.type === _types__WEBPACK_IMPORTED_MODULE_2__.MessageType.ParamChangedByInput) {
                // if (activatedCustomTool === drawStairsTool) {
                _tools_drawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool.changeComponentParam(data.componentParam, data.changeParams);
                // }
            }
            else if (data.type === _types__WEBPACK_IMPORTED_MODULE_2__.MessageType.FocusComponentIndex) {
                // if (activatedCustomTool === drawStairsTool) {
                _tools_drawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool.focusComponent(data.componentIndex);
                // }
            }
            else if (data.type === _types__WEBPACK_IMPORTED_MODULE_2__.MessageType.RemoveComponent) {
                // if (activatedCustomTool === drawStairsTool) {
                _tools_drawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool.removeComponent(data.componentIndex);
                // }
            }
            else if (data.type === _types__WEBPACK_IMPORTED_MODULE_2__.MessageType.MaterialReplaceClick) {
                // if (activatedCustomTool === drawStairsTool) {
                console.log('onMaterialReplaceClick');
                _tools_drawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool.onMaterialReplaceClick(data.changeParam, data.index);
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
    app.deactivateCustomTool(_tools_drawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool, false);
}
pluginUI.onMessage(onUIMessage);
const selection = app.getSelection();
selection.addObserver({
    onSelectionChange: () => {
        const allEntities = selection.getAllEntities();
        if (allEntities.length === 1 && (0,_tools_drawStairsTool_utils__WEBPACK_IMPORTED_MODULE_1__.isKGroupInstance)(allEntities[0])) {
            _tools_drawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool.clearTempShapes();
            _tools_drawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool.setModel(allEntities[0]);
        }
        else if (allEntities.length) {
            const editPath = app.getActiveDesign().getEditPath();
            const editModel = _tools_drawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool.getEditModel();
            _tools_drawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool.clearTempShapes();
            if (!editPath.length || !editModel || !(0,_tools_drawStairsTool_utils__WEBPACK_IMPORTED_MODULE_1__.isPartOfEditModel)(editModel, editPath[editPath.length - 1])) {
                if (activatedCustomTool !== _tools_drawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool) {
                    pluginUI.postMessage({ type: _types__WEBPACK_IMPORTED_MODULE_2__.MessageType.PropertiesVisible, propertiesVisible: false }, '*');
                }
            }
        }
    }
});
function onPluginStartUp() {
    const allEntities = selection.getAllEntities();
    if (allEntities.length === 1 && (0,_tools_drawStairsTool_utils__WEBPACK_IMPORTED_MODULE_1__.isKGroupInstance)(allEntities[0])) {
        _tools_drawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool.setModel(allEntities[0]);
    }
    app.addObserver({
        onPluginClosed: () => {
        },
        onModelChanged: _tools_drawStairsTool_utils__WEBPACK_IMPORTED_MODULE_1__.onModelChanged,
    });
}


/***/ }),

/***/ "./src/main/tools/drawStairsTool/consts.ts":
/*!*************************************************!*\
  !*** ./src/main/tools/drawStairsTool/consts.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AngleTolerance: () => (/* binding */ AngleTolerance),
/* harmony export */   CacheSettings: () => (/* binding */ CacheSettings),
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
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/main/tools/drawStairsTool/types.ts");

const dummyMatrix4 = GeomLib.createIdentityMatrix4();
const dummyVector3d = GeomLib.createVector3d(0, 0, 0);
const dummyPoint3d = GeomLib.createPoint3d(0, 0, 0);
const DirectionX = GeomLib.createVector3d(1, 0, 0);
const DirectionY = GeomLib.createVector3d(0, 1, 0);
const DirectionZ = GeomLib.createVector3d(0, 0, 1);
// const HeightTolerance: number = 5;
const LengthTolerance = 2;
const DirectionAngleTolerance = Math.PI / 36;
const AngleTolerance = Math.PI / 180 / 5;
const StepCountLimit = 100;
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
const CacheSettings = {
    stairType: _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.StraightStair,
};
function getNewComponentParam(type, baseSegment, upward) {
    let startWidth = _types__WEBPACK_IMPORTED_MODULE_0__.DefaultStairParam.startWidth * (type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform ? 2 : 1);
    let endWidth = _types__WEBPACK_IMPORTED_MODULE_0__.DefaultStairParam.endWidth * (type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform ? 2 : 1);
    if (baseSegment) {
        const { param: { endWidth: baseSegmentEndWidth, type: baseSegmentType } } = baseSegment;
        if (type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform) {
            if (baseSegmentType === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform) {
                startWidth = baseSegmentEndWidth;
                endWidth = baseSegmentEndWidth;
            }
            else {
                startWidth = 2 * baseSegmentEndWidth;
                endWidth = 2 * baseSegmentEndWidth;
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
    param.material = type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform ? _types__WEBPACK_IMPORTED_MODULE_0__.PresetMaterials.Platform : _types__WEBPACK_IMPORTED_MODULE_0__.PresetMaterials.Stair;
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

/***/ "./src/main/tools/drawStairsTool/index.ts":
/*!************************************************!*\
  !*** ./src/main/tools/drawStairsTool/index.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DrawStairsTool: () => (/* binding */ DrawStairsTool),
/* harmony export */   drawStairsTool: () => (/* binding */ drawStairsTool)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/main/tools/drawStairsTool/types.ts");
/* harmony import */ var _tempMeshUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tempMeshUtils */ "./src/main/tools/drawStairsTool/tempMeshUtils.ts");
/* harmony import */ var _meshUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./meshUtils */ "./src/main/tools/drawStairsTool/meshUtils.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./src/main/tools/drawStairsTool/utils.ts");
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./consts */ "./src/main/tools/drawStairsTool/consts.ts");
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../main */ "./src/main/main.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../types */ "./src/main/types.ts");
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
        this.stairParam = Object.assign({}, _types__WEBPACK_IMPORTED_MODULE_0__.DefaultStairParam);
        this.onMaterialReplaceItemClick = (changeParamType, index, isDelete) => {
            return (materialId, bgid) => {
                console.log('onMaterialReplaceItemClick');
                // this.onMaterialReplaceItemClickImpl(changeParamType, index, isDelete, materialId, bgid);
            };
        };
        this.onMaterialReplaceItemClickImpl = (changeParamType, index, isDelete, materialId = '', bgid = '') => __awaiter(this, void 0, void 0, function* () {
            const that = this;
            if (materialId) {
                const loadMaterialRes = yield design.loadMaterial(materialId);
                if (!loadMaterialRes.isSuccess) {
                    return;
                }
            }
            else if (!isDelete) {
                return;
            }
            const materialString = isDelete ? '' : (0,_utils__WEBPACK_IMPORTED_MODULE_3__.stringifyMaterial)({ materialId, bgid });
            const materialObject = isDelete ? undefined : { materialId, bgid };
            let parentDef;
            const instancePath = that.editModel ? design.getEditPathsToGroupInstance(that.editModel.parent.instance) : [];
            if (changeParamType === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.ComponentMaterial) {
                const theSegment = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.getSegmentByIndex)(that.segments, index);
                if (theSegment && index !== undefined) {
                    let stairParamShouldChangeKey = '';
                    if (theSegment.param.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform) {
                        const platformSegments = this.segments.filter(seg => seg.param.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform);
                        if (platformSegments.length === 1) {
                            stairParamShouldChangeKey = 'platformMaterial';
                        }
                    }
                    else {
                        const stairSegments = this.segments.filter(seg => seg.param.type !== _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform);
                        if (stairSegments.length === 1) {
                            stairParamShouldChangeKey = 'stairMaterial';
                        }
                    }
                    if (that.drawing) {
                        theSegment.param.material = materialObject;
                        if (stairParamShouldChangeKey) {
                            this.stairParam[stairParamShouldChangeKey] = materialObject;
                        }
                        pluginUI.postMessage({ type: _types__WEBPACK_IMPORTED_MODULE_6__.MessageType.ParamChangedByDraw, componentParam: Object.assign({}, theSegment.param), stairParam: stairParamShouldChangeKey ? this.stairParam : undefined }, '*');
                    }
                    else if (that.editModel) {
                        parentDef = that.editModel.parent.instance.getGroupDefinition();
                        if (!parentDef) {
                            return;
                        }
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
                            const instanceDef = theInstance.instance.getGroupDefinition();
                            if (instanceDef) {
                                operationSuccess = operationSuccess && instanceDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentMaterialKey, materialString).isSuccess;
                            }
                            operationSuccess = operationSuccess && (yield design.activateEditPath(instancePath[0])).isSuccess;
                            if (stairParamShouldChangeKey) {
                                operationSuccess = operationSuccess && parentDef.setCustomProperty(theSegment.param.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform ? _types__WEBPACK_IMPORTED_MODULE_0__.PlatformMaterialKey : _types__WEBPACK_IMPORTED_MODULE_0__.StairMaterialKey, materialString).isSuccess;
                            }
                            if (operationSuccess) {
                                (0,_utils__WEBPACK_IMPORTED_MODULE_3__.commitOperation)();
                                theSegment.param.material = materialObject;
                                if (stairParamShouldChangeKey) {
                                    this.stairParam[stairParamShouldChangeKey] = materialObject;
                                }
                                pluginUI.postMessage({ type: _types__WEBPACK_IMPORTED_MODULE_6__.MessageType.ParamChangedByDraw, componentParam: Object.assign({}, theSegment.param), stairParam: stairParamShouldChangeKey ? this.stairParam : undefined }, '*');
                            }
                            else {
                                (0,_utils__WEBPACK_IMPORTED_MODULE_3__.abortOperation)();
                            }
                        }
                    }
                }
            }
            else if (changeParamType === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.StairMaterial || changeParamType === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.PlatformMaterial) {
                if (!that.editModel) {
                    if (changeParamType === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.StairMaterial) {
                        that.stairParam.stairMaterial = materialObject;
                        for (const segment of this.segments) {
                            if (segment.param.type !== _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform) {
                                segment.param.material = materialObject;
                            }
                        }
                    }
                    else {
                        that.stairParam.platformMaterial = { materialId, bgid };
                        for (const segment of this.segments) {
                            if (segment.param.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform) {
                                segment.param.material = materialObject;
                            }
                        }
                    }
                    pluginUI.postMessage({ type: _types__WEBPACK_IMPORTED_MODULE_6__.MessageType.StairParamChangedByDraw, stairParam: that.stairParam, componentParams: this.segments.map(seg => (Object.assign({}, seg.param))) }, '*');
                }
                else if (instancePath) {
                    parentDef = that.editModel.parent.instance.getGroupDefinition();
                    if (!parentDef) {
                        return;
                    }
                    (0,_utils__WEBPACK_IMPORTED_MODULE_3__.startOperation)();
                    let operationSuccess = true;
                    operationSuccess = operationSuccess && (yield design.activateEditPath([...instancePath[0], that.editModel.parent.instance])).isSuccess;
                    const components = changeParamType === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.StairMaterial ? that.editModel.stairs : that.editModel.platforms;
                    const theSegments = [];
                    const componentInstances = [];
                    for (const [ind, instanceData] of components) {
                        const theSegment = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.getSegmentByIndex)(that.segments, ind);
                        if (theSegment) {
                            componentInstances.push(instanceData.instance);
                            theSegments.push(theSegment);
                        }
                    }
                    if (isDelete) {
                        operationSuccess = operationSuccess && design.clearMaterial(componentInstances);
                    }
                    else {
                        operationSuccess = operationSuccess && design.assignMaterialForEntities(componentInstances, materialId, bgid);
                    }
                    for (const componentInstance of componentInstances) {
                        const componentDef = componentInstance.getGroupDefinition();
                        if (componentDef) {
                            operationSuccess = operationSuccess && componentDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentMaterialKey, materialString).isSuccess;
                        }
                    }
                    operationSuccess = operationSuccess && (yield design.activateEditPath(instancePath[0])).isSuccess;
                    operationSuccess = operationSuccess && parentDef.setCustomProperty(changeParamType === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.StairMaterial ? _types__WEBPACK_IMPORTED_MODULE_0__.StairMaterialKey : _types__WEBPACK_IMPORTED_MODULE_0__.PlatformMaterialKey, materialString).isSuccess;
                    if (operationSuccess) {
                        (0,_utils__WEBPACK_IMPORTED_MODULE_3__.commitOperation)();
                        if (changeParamType === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.StairMaterial) {
                            that.stairParam.stairMaterial = materialObject;
                            for (const segment of theSegments) {
                                segment.param.material = materialObject;
                            }
                        }
                        else {
                            that.stairParam.platformMaterial = materialObject;
                            for (const segment of theSegments) {
                                segment.param.material = materialObject;
                            }
                        }
                        pluginUI.postMessage({ type: _types__WEBPACK_IMPORTED_MODULE_6__.MessageType.StairParamChangedByDraw, stairParam: that.stairParam, componentParams: this.segments.map(seg => (Object.assign({}, seg.param))) }, '*');
                    }
                    else {
                        (0,_utils__WEBPACK_IMPORTED_MODULE_3__.abortOperation)();
                    }
                }
            }
            else if (changeParamType === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.HandrailRailMaterial || changeParamType === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.HandrailColumnMaterial) {
                if (!that.editModel) {
                    if (changeParamType === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.HandrailRailMaterial) {
                        that.stairParam.handrail.rail.material = materialObject;
                    }
                    else {
                        that.stairParam.handrail.column.material = materialObject;
                    }
                    pluginUI.postMessage({ type: _types__WEBPACK_IMPORTED_MODULE_6__.MessageType.StairParamChangedByDraw, stairParam: that.stairParam }, '*');
                }
                else if (instancePath && that.editModel.handrail) {
                    parentDef = that.editModel.parent.instance.getGroupDefinition();
                    if (!parentDef) {
                        return;
                    }
                    (0,_utils__WEBPACK_IMPORTED_MODULE_3__.startOperation)();
                    let operationSuccess = true;
                    operationSuccess = operationSuccess && (yield design.activateEditPath([...instancePath[0], that.editModel.parent.instance, that.editModel.handrail.handrailInstance.instance])).isSuccess;
                    const components = changeParamType === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.HandrailRailMaterial ? that.editModel.handrail.railInstances : that.editModel.handrail.columnInstances;
                    if (isDelete) {
                        operationSuccess = operationSuccess && design.clearMaterial([...components.values()].map(c => c.instance));
                    }
                    else {
                        operationSuccess = operationSuccess && design.assignMaterialForEntities([...components.values()].map(c => c.instance), materialId, bgid);
                    }
                    operationSuccess = operationSuccess && (yield design.activateEditPath(instancePath[0])).isSuccess;
                    operationSuccess = operationSuccess && parentDef.setCustomProperty(changeParamType === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.HandrailRailMaterial ? _types__WEBPACK_IMPORTED_MODULE_0__.RailMaterialKey : _types__WEBPACK_IMPORTED_MODULE_0__.ColumnMaterialKey, materialString).isSuccess;
                    if (operationSuccess) {
                        (0,_utils__WEBPACK_IMPORTED_MODULE_3__.commitOperation)();
                        if (changeParamType === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.HandrailRailMaterial) {
                            that.stairParam.handrail.rail.material = materialObject;
                        }
                        else {
                            that.stairParam.handrail.column.material = materialObject;
                        }
                        pluginUI.postMessage({ type: _types__WEBPACK_IMPORTED_MODULE_6__.MessageType.StairParamChangedByDraw, stairParam: that.stairParam }, '*');
                    }
                    else {
                        (0,_utils__WEBPACK_IMPORTED_MODULE_3__.abortOperation)();
                    }
                }
            }
        });
    }
    onToolActive() {
        (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.loadDefaultMaterials)();
        // console.log((window as any).origin);
        // toolHelper.setExcludeInferenceTypes([
        //     KEntityType.Face, KEntityType.Edge, KEntityType.AuxiliaryBoundedCurve, KEntityType.AuxiliaryLine, KEntityType.AuxiliaryVertex,
        //     KEntityType.GroupInstance, KEntityType.Vertex, KArchFaceType.NonPlanar, KArchFaceType.Planar,
        // ]);
        const firstSegment = (0,_consts__WEBPACK_IMPORTED_MODULE_4__.getNewSegment)(_consts__WEBPACK_IMPORTED_MODULE_4__.CacheSettings.stairType, undefined, this.stairParam.upward);
        firstSegment.startLocked = false;
        // this.stairParam = DefaultStairParam;
        pluginUI.postMessage({ type: _types__WEBPACK_IMPORTED_MODULE_6__.MessageType.DrawStairModelSettled, componentParams: [firstSegment.param], stairParam: this.stairParam, newStair: true, isDrawing: true }, '*');
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
            pluginUI.postMessage({ type: _types__WEBPACK_IMPORTED_MODULE_6__.MessageType.LeaveDrawStairsTool }, '*');
        }
        (0,_main__WEBPACK_IMPORTED_MODULE_5__.deActivateDrawStairsTool)();
    }
    onMouseMove(event, inferenceResult) {
        var _a, _b;
        // console.log('onMouseMove');
        if (inferenceResult) {
            // const { startWidth, endWidth, platformThickness } = this.componentParam;
            const position = GeomLib.createPoint3d(inferenceResult.position.x, inferenceResult.position.y, 0);
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
                                // const startInd = componentDirectionType === ComponentDirectionType.RightFront && tempLines.length > 4 ? 1 : 0;
                                // if (index === startInd) {
                                //     return;
                                // }
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
                    pluginUI.postMessage({ type: _types__WEBPACK_IMPORTED_MODULE_6__.MessageType.ParamChangedByDraw, componentParam: Object.assign({}, lastSegment.param) }, '*');
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
                        if (lastParam.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.CircularStair && lastSegment.circularSide === undefined) {
                            lastParam.type = _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.StraightStair;
                            lastSegment.circleTangent = undefined;
                        }
                        const nextType = lastParam.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform ? _consts__WEBPACK_IMPORTED_MODULE_4__.CacheSettings.stairType : _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform;
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
                        pluginUI.postMessage({ type: _types__WEBPACK_IMPORTED_MODULE_6__.MessageType.ParamChangedByDraw, componentParam: lastParam }, '*');
                        this.segments.push(nextSegment);
                        if (this.focusedComponentIndex !== lastParam.index) {
                            const focusedSegment = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.getSegmentByIndex)(this.segments, this.focusedComponentIndex);
                            if (focusedSegment) {
                                this.drawTempComponent(focusedSegment);
                            }
                        }
                        this.focusedComponentIndex = nextSegment.param.index;
                        pluginUI.postMessage({ type: _types__WEBPACK_IMPORTED_MODULE_6__.MessageType.ComponentAdded, componentParam: Object.assign({}, nextSegment.param) }, '*');
                    }
                }
                else {
                    lastSegment.startLocked = true;
                    this.clearPickStartTempShapes(lastSegment);
                    this.drawTempComponent(lastSegment);
                    if (this.focusedComponentIndex !== lastSegment.param.index) {
                        pluginUI.postMessage({ type: _types__WEBPACK_IMPORTED_MODULE_6__.MessageType.FocusComponentIndexByDraw, focusedComponentIndex: lastSegment.param.index }, '*');
                    }
                    this.focusComponent(lastSegment.param.index);
                }
            }
        }
    }
    onRButtonUp(event, inferenceResult) {
        if (this.segments.length) {
            const lastSegment = this.segments[this.segments.length - 1];
            if (!lastSegment.startLocked) {
                this.segments = this.segments.slice(0, this.segments.length - 1);
            }
            else if (lastSegment.param.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.CircularStair && lastSegment.circularSide === undefined) {
                lastSegment.param.type = _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.StraightStair;
                lastSegment.circleTangent = undefined;
            }
            if (this.segments.length) {
                const { param, circularSide, moldShape: { vertices } } = lastSegment;
                if (!lastSegment.baseComponent) {
                    // lastSegment.baseLineSeg3d = { start: vertices[0], end: vertices[1] };
                    lastSegment.baseComponent = { line3d: { start: vertices[1], end: vertices[0] } };
                }
                if (param.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.CircularStair && circularSide === undefined) {
                    param.type = _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.StraightStair;
                    lastSegment.circleTangent = undefined;
                }
                this.tryCommit().then(() => {
                    (0,_main__WEBPACK_IMPORTED_MODULE_5__.deActivateDrawStairsTool)();
                });
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
                            lastSegment.param = (0,_consts__WEBPACK_IMPORTED_MODULE_4__.getNewComponentParam)(_consts__WEBPACK_IMPORTED_MODULE_4__.CacheSettings.stairType, newFocusedSegment, this.stairParam.upward);
                            lastSegment.param.index = cachedIndex;
                            pluginUI.postMessage({ type: _types__WEBPACK_IMPORTED_MODULE_6__.MessageType.ParamChangedByDraw, componentParam: Object.assign({}, lastSegment.param) }, '*');
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
                            // const startInd = componentDirectionType === ComponentDirectionType.RightFront && newFocusedTempLines.length > 4 ? 1 : 0;
                            // if (index === startInd) {
                            //     return;
                            // }
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
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.segments.length) {
                const theIndex = this.segments.findIndex(seg => seg.param.index === componentIndex);
                if (theIndex > -1) {
                    const theSegment = this.segments[theIndex];
                    let operationSuccess = true;
                    const removeSegments = this.segments.splice(theIndex, 1);
                    if (this.drawing) {
                        if ((_a = theSegment.tempShapeId) === null || _a === void 0 ? void 0 : _a.length) {
                            appView.clearTemporaryShapesByIds(theSegment.tempShapeId);
                        }
                        this.drawHandrails();
                    }
                    else if (this.editModel) {
                        const theInstance = this.editModel.stairs.get(componentIndex) || this.editModel.platforms.get(componentIndex);
                        const instancePath = design.getEditPathsToGroupInstance(this.editModel.parent.instance);
                        if (theInstance && instancePath.length) {
                            (0,_utils__WEBPACK_IMPORTED_MODULE_3__.startOperation)();
                            if (!this.segments.length) {
                                operationSuccess = operationSuccess && design.removeGroupInstance(this.editModel.parent.instance).isSuccess;
                            }
                            else {
                                operationSuccess = operationSuccess && (yield design.activateEditPath([...instancePath[0], this.editModel.parent.instance])).isSuccess;
                                operationSuccess = operationSuccess && design.removeGroupInstance(theInstance.instance).isSuccess;
                                this.generateHandrailShape(this.stairParam);
                                if ((_b = this.handrailCollection) === null || _b === void 0 ? void 0 : _b.handrails.length) {
                                    if (this.editModel.handrail) {
                                        operationSuccess = operationSuccess && design.removeGroupInstance(this.editModel.handrail.handrailInstance.instance).isSuccess;
                                        this.editModel.handrail = undefined;
                                    }
                                    const handrailInstancesData = yield (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.buildHandrailInstance)(this.stairParam, (_c = this.handrailCollection) === null || _c === void 0 ? void 0 : _c.handrails, this.editModel.parent.instance.getTransform());
                                    operationSuccess = operationSuccess && handrailInstancesData !== undefined;
                                    if (handrailInstancesData) {
                                        this.editModel.handrail = handrailInstancesData;
                                    }
                                }
                            }
                            operationSuccess = operationSuccess && (yield design.activateEditPath(instancePath[0])).isSuccess;
                            if (operationSuccess) {
                                (0,_utils__WEBPACK_IMPORTED_MODULE_3__.commitOperation)();
                                this.editModel.stairs.delete(componentIndex);
                                this.editModel.platforms.delete(componentIndex);
                                if (!this.segments.length) {
                                    this.clearEditModel();
                                    this.clear();
                                }
                            }
                            else {
                                this.segments.splice(theIndex, 0, ...removeSegments);
                                (0,_utils__WEBPACK_IMPORTED_MODULE_3__.abortOperation)();
                            }
                        }
                    }
                    if (!operationSuccess) {
                        pluginUI.postMessage({ type: _types__WEBPACK_IMPORTED_MODULE_6__.MessageType.DrawStairModelSettled, componentParams: this.segments.map(seg => (Object.assign({}, seg.param))), stairParam: this.stairParam, isDrawing: this.drawing, focusedComponentIndex: this.focusedComponentIndex.toString() }, '*');
                        return;
                    }
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
        });
    }
    onMaterialReplaceClick(changeParamType, index) {
        console.log('onMaterialReplaceClick1111');
        const func = this.onMaterialReplaceItemClick(changeParamType, index);
        console.log(func);
        app.getApplicationUI().showRealTimeMaterialEditor('5ce2a6d7dcc7dc7dc8ee0fb0', () => { });
        // app.getApplicationUI().toggleMaterialReplacePanel(true);
    }
    changeStairParam(stairParam, changeParamTypes) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function* () {
            // this.stairParam = stairParam
            if (!this.segments.length) {
                return;
            }
            const instancePath = this.editModel ? design.getEditPathsToGroupInstance(this.editModel.parent.instance) : [];
            const lastSegment = this.segments[this.segments.length - 1];
            let stairPramString = '';
            if (changeParamTypes.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.WidthProportional) > -1 || changeParamTypes.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.StepProportional) > -1) {
                this.stairParam = stairParam;
                _types__WEBPACK_IMPORTED_MODULE_0__.DefaultStairParam.stepProportional = stairParam.stepProportional;
                _types__WEBPACK_IMPORTED_MODULE_0__.DefaultStairParam.widthProportional = stairParam.widthProportional;
            }
            else if (changeParamTypes.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.HorizontalStep) > -1 || changeParamTypes.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.VerticalStep) > -1 ||
                changeParamTypes.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.StartWidth) > -1 || changeParamTypes.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.EndWidth) > -1 ||
                changeParamTypes.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.Upward) > -1 ||
                changeParamTypes.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.PlatformThickness) > -1) {
                let reGenerateSegments = this.segments;
                if (changeParamTypes.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.Upward) > -1) {
                    _types__WEBPACK_IMPORTED_MODULE_0__.DefaultStairParam.upward = stairParam.upward;
                    _types__WEBPACK_IMPORTED_MODULE_0__.DefaultComponentParam.upward = stairParam.upward;
                    reGenerateSegments = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.changeStairUpward)(reGenerateSegments[0], reGenerateSegments, stairParam.upward, true) || reGenerateSegments;
                }
                else if (changeParamTypes.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.HorizontalStep) > -1 || changeParamTypes.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.VerticalStep) > -1) {
                    _types__WEBPACK_IMPORTED_MODULE_0__.DefaultStairParam.horizontalStep = stairParam.horizontalStep;
                    _types__WEBPACK_IMPORTED_MODULE_0__.DefaultStairParam.verticalStep = stairParam.verticalStep;
                    _types__WEBPACK_IMPORTED_MODULE_0__.DefaultComponentParam.horizontalStep = stairParam.horizontalStep;
                    _types__WEBPACK_IMPORTED_MODULE_0__.DefaultComponentParam.verticalStep = stairParam.verticalStep;
                    reGenerateSegments = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.changeStairStep)(reGenerateSegments[0], this.segments, stairParam.horizontalStep, stairParam.verticalStep, true, false) || reGenerateSegments;
                }
                else if (changeParamTypes.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.PlatformThickness) > -1) {
                    _types__WEBPACK_IMPORTED_MODULE_0__.DefaultStairParam.platformThickness = stairParam.platformThickness;
                    _types__WEBPACK_IMPORTED_MODULE_0__.DefaultComponentParam.platformThickness = stairParam.platformThickness;
                    reGenerateSegments = this.segments.filter(seg => seg.param.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform);
                }
                else {
                    if (changeParamTypes.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.StartWidth) > -1 || changeParamTypes.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.EndWidth) > -1) {
                        _types__WEBPACK_IMPORTED_MODULE_0__.DefaultStairParam.startWidth = stairParam.startWidth;
                        _types__WEBPACK_IMPORTED_MODULE_0__.DefaultStairParam.endWidth = stairParam.endWidth;
                        _types__WEBPACK_IMPORTED_MODULE_0__.DefaultComponentParam.startWidth = stairParam.startWidth;
                        _types__WEBPACK_IMPORTED_MODULE_0__.DefaultComponentParam.endWidth = stairParam.endWidth;
                    }
                    reGenerateSegments = this.segments.filter(seg => seg.param.type !== _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform);
                }
                if (reGenerateSegments.length) {
                    for (const reGenerateSegment of reGenerateSegments) {
                        for (const changeParamType of changeParamTypes) {
                            reGenerateSegment.param[changeParamType] = stairParam[changeParamType];
                        }
                    }
                    const parentTransform = this.editModel ? this.editModel.parent.instance.getTransform() : undefined;
                    const oldStairParam = this.stairParam;
                    const oldComponentParams = new Map(reGenerateSegments.map(seg => ([seg.param.index, Object.assign({}, seg.param)])));
                    this.stairParam = stairParam;
                    let operationSuccess = true;
                    if (!this.drawing && this.editModel) {
                        (0,_utils__WEBPACK_IMPORTED_MODULE_3__.startOperation)();
                        stairPramString = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.stringifyStairParam)(stairParam);
                        operationSuccess = operationSuccess && !!((_a = this.editModel.parent.instance.getGroupDefinition()) === null || _a === void 0 ? void 0 : _a.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.StairParamKey, stairPramString).isSuccess);
                        if (instancePath.length) {
                            operationSuccess = operationSuccess && (yield design.activateEditPath([...instancePath[0], this.editModel.parent.instance])).isSuccess;
                        }
                    }
                    for (const reGenerateSegment of reGenerateSegments) {
                        if (changeParamTypes.length === 1 && changeParamTypes[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.PlatformThickness) {
                            reGenerateSegment.param.platformThickness = this.stairParam.platformThickness;
                        }
                        else {
                            for (const changeParamType of changeParamTypes) {
                                reGenerateSegment.param[changeParamType] = this.stairParam[changeParamType];
                            }
                        }
                        if (this.drawing) {
                            // this.stairParam = stairParam;
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
                                                    this.editModel.platforms.set(index, { instance: newInstance, definitionKey: ((_b = newInstance.getGroupDefinition()) === null || _b === void 0 ? void 0 : _b.getKey()) || '', instanceKey: newInstance.getKey() });
                                                }
                                                else {
                                                    this.editModel.stairs.set(index, { instance: newInstance, definitionKey: ((_c = newInstance.getGroupDefinition()) === null || _c === void 0 ? void 0 : _c.getKey()) || '', instanceKey: newInstance.getKey() });
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
                        pluginUI.postMessage({ type: _types__WEBPACK_IMPORTED_MODULE_6__.MessageType.StairParamChangedByDraw, stairParam: this.stairParam, componentParams: this.segments.map(seg => (Object.assign({}, seg.param))) }, '*');
                    }
                    else if (!this.drawing && this.editModel) {
                        this.generateHandrailShape(stairParam);
                        if ((_d = this.handrailCollection) === null || _d === void 0 ? void 0 : _d.handrails.length) {
                            if (this.editModel.handrail) {
                                operationSuccess = operationSuccess && design.removeGroupInstance(this.editModel.handrail.handrailInstance.instance).isSuccess;
                                this.editModel.handrail = undefined;
                            }
                            const handrailInstancesData = yield (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.buildHandrailInstance)(stairParam, (_e = this.handrailCollection) === null || _e === void 0 ? void 0 : _e.handrails, this.editModel.parent.instance.getTransform());
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
                            // this.stairParam = stairParam;
                            pluginUI.postMessage({ type: _types__WEBPACK_IMPORTED_MODULE_6__.MessageType.StairParamChangedByDraw, stairParam: this.stairParam, componentParams: this.segments.map(seg => (Object.assign({}, seg.param))) }, '*');
                        }
                        else {
                            (0,_utils__WEBPACK_IMPORTED_MODULE_3__.abortOperation)();
                            this.stairParam = oldStairParam;
                            for (const segment of reGenerateSegments) {
                                const oldSegmentParam = oldComponentParams.get(segment.param.index);
                                if (oldSegmentParam) {
                                    segment.param = oldSegmentParam;
                                }
                            }
                            pluginUI.postMessage({ type: _types__WEBPACK_IMPORTED_MODULE_6__.MessageType.StairParamChangedByDraw, stairParam: this.stairParam }, '*');
                        }
                        selection.add([parentInstance]);
                    }
                }
            }
            else if (changeParamTypes.length === 1 && changeParamTypes[0].startsWith(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.Handrail)) {
                if (this.drawing) {
                    this.stairParam = stairParam;
                    this.drawHandrails();
                }
                else if (this.editModel) {
                    this.generateHandrailShape(stairParam);
                    let operationSuccess = true;
                    (0,_utils__WEBPACK_IMPORTED_MODULE_3__.startOperation)();
                    stairPramString = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.stringifyStairParam)(stairParam);
                    operationSuccess = operationSuccess && !!((_f = this.editModel.parent.instance.getGroupDefinition()) === null || _f === void 0 ? void 0 : _f.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.StairParamKey, stairPramString).isSuccess);
                    if (instancePath.length) {
                        operationSuccess = operationSuccess && (yield design.activateEditPath([...instancePath[0], this.editModel.parent.instance])).isSuccess;
                    }
                    if (this.editModel.handrail) {
                        operationSuccess = operationSuccess && design.removeGroupInstance(this.editModel.handrail.handrailInstance.instance).isSuccess;
                        this.editModel.handrail = undefined;
                    }
                    if ((_g = this.handrailCollection) === null || _g === void 0 ? void 0 : _g.handrails.length) {
                        const handrailInstancesData = yield (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.buildHandrailInstance)(stairParam, (_h = this.handrailCollection) === null || _h === void 0 ? void 0 : _h.handrails, this.editModel.parent.instance.getTransform());
                        operationSuccess = operationSuccess && handrailInstancesData !== undefined;
                        if (handrailInstancesData) {
                            this.editModel.handrail = handrailInstancesData;
                        }
                    }
                    if (instancePath.length) {
                        operationSuccess = operationSuccess && (yield design.activateEditPath([...instancePath[0]])).isSuccess;
                    }
                    const parentInstance = this.editModel.parent.instance;
                    if (operationSuccess) {
                        (0,_utils__WEBPACK_IMPORTED_MODULE_3__.commitOperation)();
                        this.stairParam = stairParam;
                        pluginUI.postMessage({ type: _types__WEBPACK_IMPORTED_MODULE_6__.MessageType.StairParamChangedByDraw, stairParam: this.stairParam }, '*');
                    }
                    else {
                        (0,_utils__WEBPACK_IMPORTED_MODULE_3__.abortOperation)();
                        pluginUI.postMessage({ type: _types__WEBPACK_IMPORTED_MODULE_6__.MessageType.StairParamChangedByDraw, stairParam: this.stairParam }, '*');
                    }
                    selection.add([parentInstance]);
                }
            }
            else if (!stairParam.stairMaterial && changeParamTypes.length === 1 && changeParamTypes[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.StairMaterial) {
                yield this.onMaterialReplaceItemClick(changeParamTypes[0], undefined, true)('', '');
            }
            else if (!stairParam.platformMaterial && changeParamTypes.length === 1 && changeParamTypes[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.PlatformLength) {
                yield this.onMaterialReplaceItemClick(changeParamTypes[0], undefined, true)('', '');
            }
            else if (!stairParam.handrail.rail.material && changeParamTypes.length === 1 && changeParamTypes[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.HandrailRailMaterial) {
                yield this.onMaterialReplaceItemClick(changeParamTypes[0], undefined, true)('', '');
            }
            else if (!stairParam.handrail.column.material && changeParamTypes.length === 1 && changeParamTypes[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.HandrailColumnMaterial) {
                yield this.onMaterialReplaceItemClick(changeParamTypes[0], undefined, true)('', '');
            }
        });
    }
    changeComponentParam(componentParam, changeParamTypes) {
        var _a, _b, _c, _d, _e;
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
                if (changeParamTypes.length === 1 && changeParamTypes[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.ComponentMaterial && !componentParam.material) {
                    this.onMaterialReplaceItemClick(changeParamTypes[0], componentParam.index, true)('', '');
                }
                else if (changeParamTypes.length === 1 && (changeParamTypes[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.StepProportional ||
                    changeParamTypes[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.WidthProportional)) {
                    theSegment.param = componentParam;
                    _types__WEBPACK_IMPORTED_MODULE_0__.DefaultComponentParam.stepProportional = componentParam.stepProportional;
                    _types__WEBPACK_IMPORTED_MODULE_0__.DefaultComponentParam.widthProportional = componentParam.widthProportional;
                    this.segments.forEach(seg => {
                        seg.param.stepProportional = componentParam.stepProportional;
                        seg.param.widthProportional = componentParam.widthProportional;
                    });
                }
                else if (changeParamTypes[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.PlatformLengthLocked) {
                    theSegment.param = componentParam;
                }
                else {
                    const oldParam = theSegment.param;
                    let reGenerateSegments = [theSegment];
                    if (changeParamTypes.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.Upward) > -1) {
                        _types__WEBPACK_IMPORTED_MODULE_0__.DefaultStairParam.upward = componentParam.upward;
                        reGenerateSegments = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.changeStairUpward)(theSegment, this.segments, componentParam.upward, false, true) || reGenerateSegments;
                    }
                    else if (changeParamTypes.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.HorizontalStep) > -1 || changeParamTypes.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.VerticalStep) > -1) {
                        reGenerateSegments = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.changeStairStep)(theSegment, this.segments, componentParam.horizontalStep, componentParam.verticalStep, false, true) || reGenerateSegments;
                    }
                    else if (changeParamTypes.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.PlatformLength) > -1) {
                        reGenerateSegments = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.changePlatformLength)(theSegment, this.segments, componentParam.platformLength, false, true) || reGenerateSegments;
                    }
                    else if (componentParam.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform && changeParamTypes.indexOf(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.StartWidth) > -1) {
                        _types__WEBPACK_IMPORTED_MODULE_0__.DefaultComponentParam.startWidth = componentParam.startWidth;
                        _types__WEBPACK_IMPORTED_MODULE_0__.DefaultComponentParam.endWidth = componentParam.endWidth;
                        reGenerateSegments = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_2__.changePlatformWidth)(theSegment, this.segments, componentParam.startWidth, false, true) || reGenerateSegments;
                    }
                    else if (changeParamTypes[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.Type) {
                        if (componentParam.type !== _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform) {
                            _consts__WEBPACK_IMPORTED_MODULE_4__.CacheSettings.stairType = componentParam.type;
                        }
                    }
                    else if (changeParamTypes[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.PlatformThickness) {
                        _types__WEBPACK_IMPORTED_MODULE_0__.DefaultComponentParam.platformThickness = componentParam.platformThickness;
                    }
                    theSegment.param = componentParam;
                    if (reGenerateSegments.length) {
                        let operationSuccess = true;
                        const instancePath = this.editModel ? design.getEditPathsToGroupInstance(this.editModel.parent.instance) : [];
                        if (!this.drawing && this.editModel) {
                            (0,_utils__WEBPACK_IMPORTED_MODULE_3__.startOperation)();
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
                        let stairParamShouldChange = false;
                        if (changeParamTypes[0] !== _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.Type && changeParamTypes[0] !== _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.PlatformLength) {
                            const theSegments = this.segments.filter(seg => (seg.param.type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform) === (changeParamTypes[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.PlatformThickness));
                            if (theSegments.length === 1) {
                                stairParamShouldChange = true;
                            }
                        }
                        if (this.drawing) {
                            this.drawHandrails();
                            if (stairParamShouldChange) {
                                for (const changeParamType of changeParamTypes) {
                                    this.stairParam[changeParamType] = theSegment.param[changeParamType];
                                }
                            }
                            if (stairParamShouldChange) {
                                pluginUI.postMessage({ type: _types__WEBPACK_IMPORTED_MODULE_6__.MessageType.ParamChangedByDraw, componentParam: Object.assign({}, theSegment.param), stairParam: stairParamShouldChange ? this.stairParam : undefined }, '*');
                            }
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
                            if (stairParamShouldChange) {
                                const stairPramString = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.stringifyStairParam)(this.stairParam);
                                operationSuccess = operationSuccess && !!((_e = this.editModel.parent.instance.getGroupDefinition()) === null || _e === void 0 ? void 0 : _e.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.StairParamKey, stairPramString).isSuccess);
                            }
                            const parentInstance = this.editModel.parent.instance;
                            if (operationSuccess) {
                                (0,_utils__WEBPACK_IMPORTED_MODULE_3__.commitOperation)();
                                // theSegment.param = componentParam;
                                if (stairParamShouldChange) {
                                    for (const changeParamType of changeParamTypes) {
                                        this.stairParam[changeParamType] = theSegment.param[changeParamType];
                                    }
                                }
                                pluginUI.postMessage({ type: _types__WEBPACK_IMPORTED_MODULE_6__.MessageType.ParamChangedByDraw, componentParam: Object.assign({}, theSegment.param), stairParam: stairParamShouldChange ? this.stairParam : undefined }, '*');
                            }
                            else {
                                (0,_utils__WEBPACK_IMPORTED_MODULE_3__.abortOperation)();
                                theSegment.param = oldParam;
                                pluginUI.postMessage({ type: _types__WEBPACK_IMPORTED_MODULE_6__.MessageType.ParamChangedByDraw, componentParam: Object.assign({}, theSegment.param) }, '*');
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
                        segment.param.stepProportional = _types__WEBPACK_IMPORTED_MODULE_0__.DefaultComponentParam.stepProportional;
                        segment.param.widthProportional = _types__WEBPACK_IMPORTED_MODULE_0__.DefaultComponentParam.widthProportional;
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
                            pluginUI.postMessage({ type: _types__WEBPACK_IMPORTED_MODULE_6__.MessageType.DrawStairModelSettled, componentParams: this.segments.map(seg => (Object.assign({}, seg.param))), stairParam: this.stairParam, isDrawing: false }, '*');
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
            pluginUI.postMessage({ type: _types__WEBPACK_IMPORTED_MODULE_6__.MessageType.PropertiesVisible, propertiesVisible: true }, '*');
            if (this.segments.length) {
                this.focusComponent(this.focusedComponentIndex);
            }
            return 1;
        }
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
                            const componentMaterialProperty = groupDef.getCustomProperty(_types__WEBPACK_IMPORTED_MODULE_0__.ComponentMaterialKey);
                            const componentMaterial = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.parseMaterial)(componentMaterialProperty);
                            if (componentMaterial) {
                                param.material = componentMaterial;
                            }
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
                    pluginUI.postMessage({ type: _types__WEBPACK_IMPORTED_MODULE_6__.MessageType.DrawStairModelSettled, componentParams: this.segments.map(seg => (Object.assign({}, seg.param))), stairParam: this.stairParam, isDrawing: false }, '*');
                }
            }
            else {
                pluginUI.postMessage({ type: _types__WEBPACK_IMPORTED_MODULE_6__.MessageType.PropertiesVisible, propertiesVisible: false }, '*');
                return 0;
            }
        }
    }
    clearEditModel() {
        this.editModel = undefined;
        this.segments = [];
        this.handrailCollection = undefined;
        this.focusedComponentIndex = DefaultFocusedComponentIndex;
        appView.clearTemporaryShapes();
        pluginUI.postMessage({ type: _types__WEBPACK_IMPORTED_MODULE_6__.MessageType.DrawStairModelSettled, isDrawing: false }, '*');
    }
    clear() {
        appView.clearTemporaryShapes();
        // this.componentParam = { ...DefaultComponentParam };
        // this.segments = [];
        this.drawing = false;
        this.focusedComponentIndex = DefaultFocusedComponentIndex;
        this.stairParam = Object.assign({}, _types__WEBPACK_IMPORTED_MODULE_0__.DefaultStairParam);
        // this.editModel = undefined;
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

/***/ "./src/main/tools/drawStairsTool/meshUtils.ts":
/*!****************************************************!*\
  !*** ./src/main/tools/drawStairsTool/meshUtils.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildComponentInstance: () => (/* binding */ buildComponentInstance),
/* harmony export */   buildHandrailInstance: () => (/* binding */ buildHandrailInstance),
/* harmony export */   buildSegmentRelations: () => (/* binding */ buildSegmentRelations),
/* harmony export */   calculateCircularStair: () => (/* binding */ calculateCircularStair),
/* harmony export */   calculatePlatform: () => (/* binding */ calculatePlatform),
/* harmony export */   changePlatformLength: () => (/* binding */ changePlatformLength),
/* harmony export */   changePlatformWidth: () => (/* binding */ changePlatformWidth),
/* harmony export */   changeStairStep: () => (/* binding */ changeStairStep),
/* harmony export */   changeStairUpward: () => (/* binding */ changeStairUpward),
/* harmony export */   drawCircle: () => (/* binding */ drawCircle),
/* harmony export */   drawRect: () => (/* binding */ drawRect),
/* harmony export */   generateMeshes: () => (/* binding */ generateMeshes),
/* harmony export */   getMidPoint: () => (/* binding */ getMidPoint),
/* harmony export */   getNextComponents: () => (/* binding */ getNextComponents),
/* harmony export */   getSegmentByIndex: () => (/* binding */ getSegmentByIndex),
/* harmony export */   loadDefaultMaterials: () => (/* binding */ loadDefaultMaterials)
/* harmony export */ });
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ "./src/main/tools/drawStairsTool/consts.ts");
/* harmony import */ var _tempMeshUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tempMeshUtils */ "./src/main/tools/drawStairsTool/tempMeshUtils.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "./src/main/tools/drawStairsTool/types.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./src/main/tools/drawStairsTool/utils.ts");
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
        if (type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.StraightStair) {
            generateStraightStairMesh(segment);
        }
        else if (type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.CircularStair) {
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
        // 前侧面
        [stepCount * 4, stepCount * 4 + 1, stepCount * 4 + 2], [stepCount * 4 + 1, stepCount * 4 + 3, stepCount * 4 + 2]);
        (_k = stairMesh.softEdges) === null || _k === void 0 ? void 0 : _k.push([stepCount * 4 + 1, stepCount * 4 + 2]);
    }
    else {
        stairMesh.triangleIndices.push(
        // 后侧面
        [vertices.length - 1, 1, 0], [vertices.length - 1, 0, vertices.length - 2]);
        (_l = stairMesh.softEdges) === null || _l === void 0 ? void 0 : _l.push([vertices.length - 1, 0]);
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
            (_b = stairMesh.softEdges) === null || _b === void 0 ? void 0 : _b.push([bbLeftIndex, i * 4], [bbLeftIndex + 1, i * 4 + 1]);
        }
        else {
            stairMesh.triangleIndices.push(
            // side faces
            [leftIndex, i * 4, (i + 1) * 4], [leftIndex + 1, (i + 1) * 4 + 1, i * 4 + 1]);
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
        const res1 = yield design.loadMaterial(_types__WEBPACK_IMPORTED_MODULE_2__.PresetMaterials.Stair.materialId);
        if (!res1.isSuccess) {
            return false;
        }
        const res2 = yield design.loadMaterial(_types__WEBPACK_IMPORTED_MODULE_2__.PresetMaterials.Platform.materialId);
        if (!res2.isSuccess) {
            return false;
        }
        const res3 = yield design.loadMaterial(_types__WEBPACK_IMPORTED_MODULE_2__.PresetMaterials.Handrail.rail.materialId);
        if (!res3.isSuccess) {
            return false;
        }
        const res4 = yield design.loadMaterial(_types__WEBPACK_IMPORTED_MODULE_2__.PresetMaterials.Handrail.column.materialId);
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
            const newInstance = (_b = design.makeGroup(newShell.getFaces(), [], [])) === null || _b === void 0 ? void 0 : _b.addedInstance;
            operationSuccess = operationSuccess && !!newInstance;
            const groupDef = newInstance === null || newInstance === void 0 ? void 0 : newInstance.getGroupDefinition();
            if (newInstance && groupDef) {
                if (parentTransform) {
                    const transformRes = design.transformGroupInstances([newInstance], parentTransform.inversed());
                    operationSuccess = operationSuccess && transformRes.isSuccess;
                }
                const materialObject = param.type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.Platform ? _types__WEBPACK_IMPORTED_MODULE_2__.PresetMaterials.Platform : _types__WEBPACK_IMPORTED_MODULE_2__.PresetMaterials.Stair;
                operationSuccess = operationSuccess && design.assignMaterialForEntities([newInstance], materialObject.materialId, materialObject.bgId);
                const paramString = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.stringifyComponentParam)(param);
                operationSuccess = operationSuccess && groupDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_2__.ComponentParamKey, paramString).isSuccess;
                if (param.material) {
                    const componentMaterialString = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.stringifyMaterial)(param.material);
                    operationSuccess = operationSuccess && groupDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_2__.ComponentMaterialKey, componentMaterialString).isSuccess;
                }
                const startEndString = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.stringifyStartEnd)(GeomLib.createPoint3d(start.x, start.y, startHeight), GeomLib.createPoint3d(end.x, end.y, endHeight));
                operationSuccess = operationSuccess && groupDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_2__.StartEndKey, startEndString).isSuccess;
                if (baseComponent) {
                    const baseLineString = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.stringifyStartEnd)(baseComponent.line3d.start, baseComponent.line3d.end);
                    operationSuccess = operationSuccess && groupDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_2__.BaseLineSeg3dKey, baseLineString).isSuccess;
                    const baseSegment = getSegmentByIndex(segments, baseComponent.componentIndex);
                    if (baseSegment) {
                        const baseComponentString = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.stringifyBaseComponent)(baseSegment, baseComponent.line3dIndex);
                        operationSuccess = operationSuccess && groupDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_2__.BaseComponentKey, baseComponentString).isSuccess;
                    }
                }
                if (circleTangent) {
                    const tangentString = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.stringifyPoint3d)(circleTangent);
                    operationSuccess = operationSuccess && groupDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_2__.CircleTangentKey, tangentString).isSuccess;
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
        if (columnType === _types__WEBPACK_IMPORTED_MODULE_2__.ColumnType.Circle) {
            columnFace = drawCircle(_consts__WEBPACK_IMPORTED_MODULE_0__.dummyPoint3d, _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ, columnParam.radius || _types__WEBPACK_IMPORTED_MODULE_2__.DefaultStairParam.horizontalStep / 10);
        }
        else if (columnType === _types__WEBPACK_IMPORTED_MODULE_2__.ColumnType.Rect) {
            columnFace = drawRect(_consts__WEBPACK_IMPORTED_MODULE_0__.dummyPoint3d, _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ, columnParam.width || _types__WEBPACK_IMPORTED_MODULE_2__.DefaultStairParam.horizontalStep / 10, columnParam.height || _types__WEBPACK_IMPORTED_MODULE_2__.DefaultStairParam.horizontalStep / 10, false);
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
                if (railType === _types__WEBPACK_IMPORTED_MODULE_2__.RailType.Circle) {
                    railFace = drawCircle(railStartPoint, railStartDir, railParam.radius || _types__WEBPACK_IMPORTED_MODULE_2__.DefaultStairParam.horizontalStep / 5);
                }
                else if (railType === _types__WEBPACK_IMPORTED_MODULE_2__.RailType.Rect) {
                    railFace = drawRect(railStartPoint, railStartDir, railParam.width || _types__WEBPACK_IMPORTED_MODULE_2__.DefaultStairParam.horizontalStep / 5, railParam.height || _types__WEBPACK_IMPORTED_MODULE_2__.DefaultStairParam.horizontalStep / 5);
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
                for (const railBoundedCurve of railBoundedCurves) {
                    const removeRailBoundedCurveRes = activeDesign.removeAuxiliaryCurve(railBoundedCurve);
                    if (!removeRailBoundedCurveRes.isSuccess) {
                        return undefined;
                    }
                }
                const railMakeGroupRes = activeDesign.makeGroup(railFaces, [], []);
                const railGroupDef = railMakeGroupRes === null || railMakeGroupRes === void 0 ? void 0 : railMakeGroupRes.addedInstance.getGroupDefinition();
                if (!(railMakeGroupRes === null || railMakeGroupRes === void 0 ? void 0 : railMakeGroupRes.addedInstance) || !railGroupDef) {
                    return undefined;
                }
                const railPropertyRes = railGroupDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_2__.RailModelKey, _types__WEBPACK_IMPORTED_MODULE_2__.ModelValue);
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
            const assignRailMaterialRes = activeDesign.assignMaterialForEntities(railInstances, _types__WEBPACK_IMPORTED_MODULE_2__.PresetMaterials.Handrail.rail.materialId, _types__WEBPACK_IMPORTED_MODULE_2__.PresetMaterials.Handrail.rail.bgId);
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
                const columnPropertyRes = columnGroupDef.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_2__.ColumnModelKey, _types__WEBPACK_IMPORTED_MODULE_2__.ModelValue);
                if (!columnPropertyRes.isSuccess) {
                    return undefined;
                }
            }
            const assignColumnMaterialRes = activeDesign.assignMaterialForEntities(columnCopyRes.addedInstances, _types__WEBPACK_IMPORTED_MODULE_2__.PresetMaterials.Handrail.column.materialId, _types__WEBPACK_IMPORTED_MODULE_2__.PresetMaterials.Handrail.column.bgId);
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
        const setPropertyRes = handrailDefinition.setCustomProperty(_types__WEBPACK_IMPORTED_MODULE_2__.HandrailModelKey, _types__WEBPACK_IMPORTED_MODULE_2__.ModelValue);
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
    const coordinate = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.getCoordinate)(normal);
    const coordinateMat = GeomLib.createAlignCCSMatrix4(coordinate.dx, coordinate.dy, coordinate.dz, center);
    const translateMat1 = GeomLib.createTranslationMatrix4(0, -height / 2, 0);
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
        let current = [{ segment: startSegment, verticalDelta: startSegment.startHeight }];
        const unVisited = new Set(segments);
        const changedSegments = new Set();
        while (current.length) {
            let next = [];
            for (const { segment, verticalDelta } of current) {
                const { startHeight, endHeight } = segment;
                const upwardFlag = (onlyStart && segment !== startSegment) ? segment.param.upward : upward;
                const endDelta = segment.param.type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.Platform ? 0 : Math.abs(endHeight - startHeight) * (upwardFlag ? 1 : -1);
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
                    current = [{ segment: theSegment, verticalDelta: theSegment.startHeight }];
                }
            }
        }
        return [...changedSegments];
    }
}
function changeStairStep(startSegment, segments, newHorizontalStep, newVerticalStep, bulkChange, onlyStart = false) {
    if (segments.length) {
        let current = [{ segment: startSegment, verticalDelta: startSegment.startHeight }];
        const unVisited = new Set(segments);
        const changedSegments = new Set();
        while (current.length) {
            let next = [];
            for (const { segment, verticalDelta } of current) {
                const { start, end, circleTangent, param: { type, horizontalStep, upward } } = segment;
                const startEndDistance = start.distanceTo(end);
                let newStepCount = 0;
                if (type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.StraightStair) {
                    newStepCount = Math.ceil(startEndDistance / horizontalStep);
                    const lastStepLength = startEndDistance - (newStepCount - 1) * horizontalStep;
                    const validStepCount = (lastStepLength === 0 || lastStepLength > _consts__WEBPACK_IMPORTED_MODULE_0__.LengthTolerance) ? newStepCount : newStepCount - 1;
                    if (validStepCount < 1 || validStepCount >= _consts__WEBPACK_IMPORTED_MODULE_0__.StepCountLimit) {
                        return;
                    }
                }
                else if (type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.CircularStair && circleTangent) {
                    const { horizontalStepAngle, arcAngle } = calculateCircularStair(segment, circleTangent);
                    newStepCount = Math.ceil(arcAngle / horizontalStepAngle);
                }
                const newDeltaHeight = newStepCount * newVerticalStep * (upward ? 1 : -1);
                segment.startHeight = verticalDelta;
                if (type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.Platform) {
                    segment.endHeight = verticalDelta;
                }
                else {
                    segment.endHeight = segment.startHeight + newDeltaHeight;
                    if (!onlyStart) {
                        segment.param.horizontalStep = newHorizontalStep;
                        segment.param.verticalStep = newVerticalStep;
                    }
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
                    current = [{ segment: theSegment, verticalDelta: theSegment.startHeight }];
                }
            }
        }
        return [...changedSegments];
    }
}
function changePlatformLength(startSegment, segments, newPlatformLength, bulkChange, onlyStart = false) {
    if (segments.length) {
        // const platformSegments = segments.filter(seg => seg.param.type === ComponentType.Platform);
        let current = [{ segment: startSegment, deltaVec: _consts__WEBPACK_IMPORTED_MODULE_0__.dummyVector3d }];
        const unVisited = new Set(segments);
        const changedSegments = new Set();
        while (current.length) {
            let next = [];
            for (const { segment, deltaVec } of current) {
                const { start, end, param: { type, startWidth, platformLength }, baseComponent, nextComponents, moldShape: { tempLines } } = segment;
                let nextDeltaVec = deltaVec;
                if (type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.Platform) {
                    const frontDir = end.subtracted(start).normalized();
                    const deltaPlatformLength = newPlatformLength - platformLength;
                    nextDeltaVec = deltaVec.added(frontDir.multiplied(deltaPlatformLength));
                    segment.param.platformLength = newPlatformLength;
                    if (baseComponent && deltaPlatformLength < 0) {
                        const { angle, cornerDirectionAngle } = calculatePlatform(segment, baseComponent.line3d);
                        if (_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionAngleTolerance < angle && angle < (Math.PI / 2 - cornerDirectionAngle)) {
                            if (Math.tan(Math.PI / 2 - angle) <= startWidth / 2 / newPlatformLength) {
                                nextDeltaVec = deltaVec;
                                segment.param.platformLength = platformLength;
                            }
                        }
                        else if (angle > (Math.PI * 3 / 2 + cornerDirectionAngle) && angle < (Math.PI * 2 - _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionAngleTolerance)) {
                            if (Math.tan(angle - Math.PI * 3 / 2) <= startWidth / 2 / newPlatformLength) {
                                nextDeltaVec = deltaVec;
                                segment.param.platformLength = platformLength;
                            }
                        }
                    }
                    const edgeNextComponents = nextComponents[tempLines.length - 2];
                    for (const edgeNextComponent of edgeNextComponents) {
                        const edgeNextSegment = getSegmentByIndex(segments, edgeNextComponent);
                        if (edgeNextSegment) {
                            next.push({ segment: edgeNextSegment, deltaVec: nextDeltaVec });
                        }
                    }
                }
                else {
                    const nextSegments = getNextComponents(segment, segments);
                    if (nextSegments.length) {
                        next.push(...nextSegments.map(seg => ({ segment: seg, deltaVec: nextDeltaVec })));
                    }
                }
                segment.start = start.added(deltaVec);
                segment.end = end.added(nextDeltaVec);
                if (baseComponent) {
                    baseComponent.line3d.start = baseComponent.line3d.start.added(deltaVec);
                    baseComponent.line3d.end = baseComponent.line3d.end.added(deltaVec);
                }
                unVisited.delete(segment);
                changedSegments.add(segment);
            }
            current = next;
            if (!current.length) {
                if (bulkChange && unVisited.size) {
                    const theSegment = [...unVisited.values()][0];
                    current = [{ segment: theSegment, deltaVec: _consts__WEBPACK_IMPORTED_MODULE_0__.dummyVector3d }];
                }
            }
        }
        return [...changedSegments];
    }
}
function changePlatformWidth(startSegment, segments, newWidth, bulkChange, onlyStart = false) {
    if (segments.length) {
        // const platformSegments = segments.filter(seg => seg.param.type === ComponentType.Platform);
        let current = [{ segment: startSegment, deltaVec: _consts__WEBPACK_IMPORTED_MODULE_0__.dummyVector3d }];
        const unVisited = new Set(segments);
        const changedSegments = new Set();
        while (current.length) {
            let next = [];
            for (const { segment, deltaVec } of current) {
                const { start, end, param: { type, startWidth, platformLength }, baseComponent, nextComponents, moldShape: { vertices, tempLines } } = segment;
                if (type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.Platform && (onlyStart ? segment === startSegment : true)) {
                    const deltaWidth = newWidth - startWidth;
                    let shouldChange = true;
                    const edgeCount = tempLines.length;
                    if (baseComponent && deltaWidth > 0) {
                        const { angle, cornerDirectionAngle, leftConnectPoints, rightConnectPoints } = calculatePlatform(segment, baseComponent.line3d);
                        if (_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionAngleTolerance < angle && angle < (Math.PI / 2 - cornerDirectionAngle)) {
                            if (Math.tan(Math.PI / 2 - angle) <= newWidth / 2 / platformLength) {
                                shouldChange = false;
                            }
                            else if (edgeCount !== (leftConnectPoints.length + 3)) {
                                shouldChange = false;
                            }
                        }
                        else if (angle > (Math.PI * 3 / 2 + cornerDirectionAngle) && angle < (Math.PI * 2 - _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionAngleTolerance)) {
                            if (Math.tan(angle - Math.PI * 3 / 2) <= newWidth / 2 / platformLength) {
                                shouldChange = false;
                            }
                            else if (edgeCount !== (rightConnectPoints.length + 3)) {
                                shouldChange = false;
                            }
                        }
                    }
                    if (shouldChange) {
                        const oldVertices = [...vertices];
                        segment.param.startWidth = newWidth;
                        segment.param.endWidth = newWidth;
                        (0,_tempMeshUtils__WEBPACK_IMPORTED_MODULE_1__.generateShape)(segment);
                        const newVertices = segment.moldShape.vertices;
                        for (let i = 0; i < edgeCount; i++) {
                            const edgeNextComponents = nextComponents[i];
                            const oldEdgeStart = oldVertices[tempLines[i][0]];
                            const oldEdgeEnd = oldVertices[tempLines[i][1]];
                            const oldEdgeLength = oldEdgeStart.distanceTo(oldEdgeEnd);
                            const oldEdgeDir = oldEdgeEnd.subtracted(oldEdgeStart).normalized();
                            const oldEdgeCenter = getMidPoint(oldEdgeStart, oldEdgeEnd);
                            const newEdgeStart = newVertices[tempLines[i][0]];
                            const newEdgeEnd = newVertices[tempLines[i][1]];
                            const newEdgeDir = newEdgeEnd.subtracted(newEdgeStart).normalized();
                            const newEdgeCenter = getMidPoint(newEdgeStart, newEdgeEnd);
                            const centerDeltaDir = newEdgeCenter.subtracted(oldEdgeCenter);
                            for (const edgeNextComponent of edgeNextComponents) {
                                const edgeNextSegment = getSegmentByIndex(segments, edgeNextComponent);
                                if (edgeNextSegment) {
                                    const toCenterDir = oldEdgeCenter.subtracted(edgeNextSegment.start);
                                    if ((0,_utils__WEBPACK_IMPORTED_MODULE_3__.isEqual)(toCenterDir.length, 0)) {
                                        next.push({ segment: edgeNextSegment, deltaVec: deltaVec.added(centerDeltaDir) });
                                    }
                                    else if (toCenterDir.isSameDirection(oldEdgeDir)) {
                                        next.push({ segment: edgeNextSegment, deltaVec: deltaVec.added(centerDeltaDir).added(newEdgeDir.multiplied(-toCenterDir.length / oldEdgeLength * 2)) });
                                    }
                                    else {
                                        next.push({ segment: edgeNextSegment, deltaVec: deltaVec.added(centerDeltaDir).added(newEdgeDir.multiplied(toCenterDir.length / oldEdgeLength * 2)) });
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    const nextSegments = getNextComponents(segment, segments);
                    if (nextSegments.length) {
                        next.push(...nextSegments.map(seg => ({ segment: seg, deltaVec })));
                    }
                }
                segment.start = start.added(deltaVec);
                segment.end = end.added(deltaVec);
                if (baseComponent) {
                    baseComponent.line3d.start = baseComponent.line3d.start.added(deltaVec);
                    baseComponent.line3d.end = baseComponent.line3d.end.added(deltaVec);
                }
                unVisited.delete(segment);
                changedSegments.add(segment);
            }
            current = next;
            if (!current.length) {
                if (bulkChange && unVisited.size) {
                    const theSegment = [...unVisited.values()][0];
                    current = [{ segment: theSegment, deltaVec: _consts__WEBPACK_IMPORTED_MODULE_0__.dummyVector3d }];
                }
            }
        }
        return [...changedSegments];
    }
}
function calculateCircularStair(segment, circleTangent) {
    const { start, end, param } = segment;
    const { startWidth, endWidth, horizontalStep, } = param;
    let valid = true;
    const tangentLeftDir = _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.cross(circleTangent).normalized();
    const startEndDir = end.subtracted(start).normalized();
    const startEndDistance = start.distanceTo(end);
    const maxWidth = Math.max(startWidth, endWidth);
    const endAngle = startEndDir.angleTo(circleTangent, _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ);
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
        valid = false;
    }
    const horizontalStepAngle = Math.asin(horizontalStep / 2 / radius) * 2;
    const circleNormal = isLeftArc ? _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ : _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.reversed();
    const circleCenter = start.added(tangentLeftDir.multiplied(isLeftArc ? radius : -radius));
    const arc = GeomLib.createArc3dByCenterNormalRadius(circleCenter, circleNormal, radius, start, end);
    const arcAngle = arc.arcAngle;
    const stepCount = Math.ceil(arcAngle / horizontalStepAngle);
    const lastHorizontalAngle = arcAngle - horizontalStepAngle * (stepCount - 1);
    const validStepCount = (lastHorizontalAngle === 0 || lastHorizontalAngle > _consts__WEBPACK_IMPORTED_MODULE_0__.AngleTolerance) ? stepCount : stepCount - 1;
    if (horizontalStepAngle >= arcAngle || horizontalStepAngle >= Math.PI / 2 || validStepCount >= _consts__WEBPACK_IMPORTED_MODULE_0__.StepCountLimit || validStepCount < 1) {
        valid = false;
    }
    return {
        tangentLeftDir, validStepCount, isLeftArc, stepCount, circleCenter, radius, horizontalStepAngle, circleNormal, arcAngle, lastHorizontalAngle,
        innerRadius, endAngle, valid,
    };
}
function calculatePlatform(segment, baseLineSeg3d) {
    const { start, param } = segment;
    const { startWidth, platformLength, platformLengthLocked } = param;
    const curDir = segment.end.subtracted(start);
    const curLeftDir = _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.cross(curDir).normalized();
    const { start: baseLineStart, end: baseLineEnd } = baseLineSeg3d;
    const baseLineDir = baseLineEnd.subtracted(baseLineStart).normalized();
    const prevDirNormalized = baseLineDir.cross(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ).normalized();
    const prevLeftDir = _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.cross(prevDirNormalized).normalized();
    const angle = curDir.angleTo(prevDirNormalized, _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ);
    const frontLength = platformLengthLocked ? platformLength : Math.abs(curDir.dot(prevDirNormalized));
    const curEndLeftCorner = segment.end.added(curLeftDir.multiplied(startWidth / 2));
    const cornerDirection = curEndLeftCorner.subtracted(segment.start);
    const cornerDirectionAngle = cornerDirection.angle(curDir);
    let leftConnectPoints = [start.added(curLeftDir.multiplied(startWidth / 2)), baseLineEnd];
    let rightConnectPoints = [baseLineStart, start.added(curLeftDir.multiplied(-startWidth / 2))];
    if (_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionAngleTolerance < angle && angle < (Math.PI / 2 - cornerDirectionAngle)) {
        // segment.componentDirectionType = ComponentDirectionType.RightFront;
        // param.platformLength = segment.end.distanceTo(segment.start);
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
    }
    else if (angle > (Math.PI * 3 / 2 + cornerDirectionAngle) && angle < (Math.PI * 2 - _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionAngleTolerance)) {
        // segment.componentDirectionType = ComponentDirectionType.LeftFront;
        // param.platformLength = segment.end.distanceTo(segment.start);
        const baseLineStartDistance = start.distanceTo(baseLineStart);
        const rightProjectDistance = startWidth / 2 * Math.cos(angle);
        if (rightProjectDistance < baseLineStartDistance) {
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
    }
    return { angle, frontLength, cornerDirectionAngle, prevDirNormalized, prevLeftDir, leftConnectPoints, rightConnectPoints };
}
function getMidPoint(start, end) {
    return GeomLib.createPoint3d((start.x + end.x) / 2, (start.y + end.y) / 2, (start.z + end.z) / 2);
}


/***/ }),

/***/ "./src/main/tools/drawStairsTool/tempMeshUtils.ts":
/*!********************************************************!*\
  !*** ./src/main/tools/drawStairsTool/tempMeshUtils.ts ***!
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
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ "./src/main/tools/drawStairsTool/consts.ts");
/* harmony import */ var _meshUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./meshUtils */ "./src/main/tools/drawStairsTool/meshUtils.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "./src/main/tools/drawStairsTool/types.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./src/main/tools/drawStairsTool/utils.ts");




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
    const { start, stairShape, moldShape, cornerShape, cornerMoldShape, startHeight, baseComponent, circleTangent, param } = segment;
    const { startWidth, endWidth, verticalStep, upward, platformThickness } = param;
    if (circleTangent) {
        const { tangentLeftDir, validStepCount, isLeftArc, stepCount, circleCenter, radius, horizontalStepAngle, circleNormal, arcAngle, lastHorizontalAngle, endAngle, valid, } = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_1__.calculateCircularStair)(segment, circleTangent);
        if (Math.abs(endAngle) <= _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionAngleTolerance) {
            segment.circularSide = undefined;
            return generateStraightStairShape(segment, temp);
        }
        if (!valid) {
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
        const stepHeight = upward ? verticalStep : -verticalStep;
        segment.endHeight = segment.startHeight + validStepCount * stepHeight;
        stairShape.stepCount = validStepCount;
        moldShape.stepCount = validStepCount;
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
                vertices.push(vertices[vertices.length - 2].added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(stepHeight)), vertices[vertices.length - 1].added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(stepHeight)));
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
        if (baseComponent && baseComponent.line3dIndex !== undefined) {
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
    let startEndDistance = start.distanceTo(end);
    let horizontalLeftDir = _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.cross(horizontalFrontDir);
    const stepFloatCount = startEndDistance / horizontalStep;
    const stepCount = Math.ceil(stepFloatCount);
    const lastStepLength = startEndDistance - (stepCount - 1) * horizontalStep;
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
            startEndDistance = startEndDistance * Math.cos(deltaAngle);
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
    moldVertices.push(stepCount > 1 ? moldVertices[moldVertices.length - 2].added(horizontalLeftDir.multiplied(widthDelta)).added(horizontalFrontDir.multiplied(horizontalStep)) : leftPt, stepCount > 1 ? moldVertices[moldVertices.length - 1].added(horizontalLeftDir.multiplied(widthDelta)).added(horizontalFrontDir.multiplied(horizontalStep)) : rightPt);
    moldTempLines.push([2 * (stepCount - 1), 1 + 2 * (stepCount - 1)]);
    if (lastStepLength > _consts__WEBPACK_IMPORTED_MODULE_0__.LengthTolerance || lastStepLength === 0) {
        moldVertices.push(moldVertices[moldVertices.length - 2].added(horizontalLeftDir.multiplied(lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength)), moldVertices[moldVertices.length - 1].added(horizontalLeftDir.multiplied(-lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength)));
        moldTempLines.push([2 * (stepCount - 1), 2 + 2 * (stepCount - 1)], [1 + 2 * (stepCount - 1), 3 + 2 * (stepCount - 1)], [2 * stepCount, 1 + 2 * stepCount]);
    }
    if (upward) {
        vertices.push(stepCount > 1 ? vertices[vertices.length - 2].added(horizontalFrontDir.multiplied(horizontalStep)).added(horizontalLeftDir.multiplied(widthDelta)) : leftPt, stepCount > 1 ? vertices[vertices.length - 1].added(horizontalFrontDir.multiplied(horizontalStep)).added(horizontalLeftDir.multiplied(-widthDelta)) : rightPt);
        if (temp) {
            tempLines.push([4 * (stepCount - 1), 1 + 4 * (stepCount - 1)]);
        }
        if (lastStepLength > _consts__WEBPACK_IMPORTED_MODULE_0__.LengthTolerance || lastStepLength === 0) {
            vertices.push(vertices[vertices.length - 2].added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(stepHeight)), vertices[vertices.length - 1].added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(stepHeight)));
            vertices.push(vertices[vertices.length - 2].added(horizontalLeftDir.multiplied(lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength)), vertices[vertices.length - 1].added(horizontalLeftDir.multiplied(-lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength)));
            if (temp) {
                tempLines.push([4 * (stepCount - 1), 2 + 4 * (stepCount - 1)], [1 + 4 * (stepCount - 1), 3 + 4 * (stepCount - 1)], [2 + 4 * (stepCount - 1), 3 + 4 * (stepCount - 1)], [2 + 4 * (stepCount - 1), 4 + 4 * (stepCount - 1)], [3 + 4 * (stepCount - 1), 5 + 4 * (stepCount - 1)], [4 * stepCount, 1 + 4 * stepCount]);
            }
        }
    }
    else {
        vertices.push(stepCount > 1 ? vertices[vertices.length - 2].added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(stepHeight)).added(horizontalLeftDir.multiplied(widthDelta)) : leftPt, stepCount > 1 ? vertices[vertices.length - 1].added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(stepHeight)).added(horizontalLeftDir.multiplied(-widthDelta)) : rightPt);
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
        // const { start: baseLineStart, end: baseLineEnd } = baseComponent.line3d;
        const { angle, frontLength, cornerDirectionAngle, prevDirNormalized, prevLeftDir, leftConnectPoints, rightConnectPoints } = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_1__.calculatePlatform)(segment, baseComponent.line3d);
        if ((angle >= Math.PI && angle <= (Math.PI * 3 / 2 + cornerDirectionAngle)) || (modelEditing && withOffset && offsetWidth >= 0)) {
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
        else if ((angle < Math.PI && angle >= (Math.PI / 2 - cornerDirectionAngle)) || (modelEditing && withOffset && offsetWidth < 0)) {
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
            else if (_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionAngleTolerance < angle && angle < (Math.PI / 2 - cornerDirectionAngle)) {
                segment.componentDirectionType = _types__WEBPACK_IMPORTED_MODULE_2__.ComponentDirectionType.RightFront;
                param.platformLength = segment.end.distanceTo(segment.start);
                moldShape.vertices = [
                    ...leftConnectPoints,
                    start.added(prevLeftDir.multiplied(-startWidth / 2 / Math.cos(angle))),
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
            else if (angle > (Math.PI * 3 / 2 + cornerDirectionAngle) && angle < (Math.PI * 2 - _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionAngleTolerance)) {
                segment.componentDirectionType = _types__WEBPACK_IMPORTED_MODULE_2__.ComponentDirectionType.LeftFront;
                param.platformLength = segment.end.distanceTo(segment.start);
                moldShape.vertices = [
                    start.added(prevLeftDir.multiplied(startWidth / 2 / Math.cos(angle))),
                    ...rightConnectPoints,
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
const ColumnStepTolerance = 1 / 5;
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
                const { param: { index, type, startWidth, endWidth, horizontalStep, verticalStep, upward }, start, end, startHeight, endHeight, moldShape: { vertices: moldVertices, tempLines: moldTempLines, stepCount }, nextComponents, baseComponent, circleTangent, startLocked, componentDirectionType, } = currentSegment;
                unVisited.delete(currentSegment);
                if (!startLocked) {
                    continue;
                }
                const stepHeight = upward ? verticalStep : -verticalStep;
                const offsetLength = Math.min(_types__WEBPACK_IMPORTED_MODULE_2__.HandrailDefaultOffsetLength, horizontalStep / 4);
                const baseSegment = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_1__.getSegmentByIndex)(segments, baseComponent === null || baseComponent === void 0 ? void 0 : baseComponent.componentIndex);
                const { startLine: { line3dInd: startLine3dInd }, baseLine: { dir: baseLine3dDir, endWithOffset: baseLine3dEndWithOffset }, } = getSegmentStartAndBaseLine3d(currentSegment, segments, baseSegment, offsetLength);
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
                            const nextComponentStartLine3dInd = getSegmentStartAndBaseLine3d(nextSegment, segments, undefined, offsetLength).startLine.line3dInd;
                            if ((0,_utils__WEBPACK_IMPORTED_MODULE_3__.isEqual)(ds + de, lastLength) && !(visitNextRecord === null || visitNextRecord === void 0 ? void 0 : visitNextRecord.right) && !(visitNextRecord === null || visitNextRecord === void 0 ? void 0 : visitNextRecord.line3dIndexes.has(nextComponentStartLine3dInd))) {
                                if (!nearestSegment || nearestSegment.distance > ds) {
                                    nearestSegment = { segment: nextSegment, distance: ds };
                                }
                            }
                        }
                    }
                    const firstBottomPt = sp.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight)).added(offsetDir.multiplied(offsetLength)).added(line3dDir.multiplied(startPoint ? 0 : offsetLength));
                    let lastDistance = Math.max(lastLength - offsetLength, 0);
                    if (nearestSegment) {
                        const { endOnBaseLineWithOffset } = getSegmentStartAndBaseLine3d(nearestSegment.segment, segments, undefined, offsetLength).startLine;
                        ep = endOnBaseLineWithOffset;
                        spToEpDir = ep.subtracted(sp).normalized();
                        if (spToEpDir.dot(line3dDir) <= 0) {
                            lastDistance = 0;
                            pushEnd = false;
                            nextStartPoint = sp.added(line3dDir.multiplied(offsetLength));
                        }
                        else {
                            lastDistance = sp.distanceTo(ep);
                            nextStartPoint = isPlatform(nearestSegment.segment) ? ep : undefined;
                        }
                    }
                    else if (isEntrance && hasEntranceSegment && baseSegment) {
                        //     // don't care because next is platform (next will deal the case) or stair (only have one nextComponent which is currentSegment)
                        // if (baseSegment.param.type === ComponentType.Platform && nextSiblingSegment) {
                        ep = baseLine3dEndWithOffset;
                        spToEpDir = ep.subtracted(sp).normalized();
                        if (spToEpDir.dot(baseLine3dDir) >= 0) {
                            lastDistance = 0;
                            pushEnd = false;
                            const nextCornerDistance = ep.distanceTo(sp);
                            if (nextCornerDistance > offsetLength) {
                                nextStartPoint = sp.added(line3dDir.multiplied(offsetLength));
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
                        // pushEnd = line3dInd === moldTempLines.length - 1;
                    }
                    if (lastDistance > 0 || (lastDistance === 0 && !startPoint)) {
                        // push rail
                        handrail.rail.push(firstBottomPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height)));
                    }
                    // push columns
                    if (lastDistance > 0) {
                        let tempDistance = offsetLength;
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
                            line3dInd: getSegmentStartAndBaseLine3d(nearestSegment.segment, segments, undefined, offsetLength).startLine.line3dInd,
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
                    let columnActualHeight = height + verticalStep / 2;
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
                        let tempHeadDistance = 0;
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
                    nextStartPoint = left ? sp.added(line3dDir.multiplied(offsetLength)) : ep.added(line3dDir.multiplied(-offsetLength));
                    // next segment startWidth !== currentSegment endWidth
                    pushEnd = false;
                    const reasonableStepCount = Math.ceil(step / horizontalStep);
                    let tempStepCount = 0;
                    const arcChordAngle = circleTangent ? startToEndDir.angle(circleTangent) : 0;
                    const startFrontOffsetLength = Math.min(horizontalStep / 2, offsetLength);
                    const prevTotalStepLength = (stepCount - 1) * horizontalStep;
                    const prevTotalVerStepLength = (stepCount - 1) * stepHeight;
                    const totalLength = Math.abs(end.subtracted(start).dot(frontDir));
                    // const startEndDistance = start.distanceTo(end);
                    const lastStepLength = totalLength - prevTotalStepLength;
                    let lastFrontOffsetLength = Math.min(lastStepLength / 2, offsetLength);
                    if (type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.StraightStair || (type === _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.CircularStair && (arcChordAngle <= _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionAngleTolerance || !circleTangent))) {
                        // lastLength = sp.distanceTo(ep);
                        const deltaWidth = (endWidth - startWidth) / 2;
                        const startDeltaWidth = (startFrontOffsetLength / totalLength) * deltaWidth;
                        const stepDeltaWidth = horizontalStep / totalLength * deltaWidth;
                        // push rail
                        stairRail.push(sp.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight + height + (upward ? 1 : 0) * stepHeight)).added(leftDir.multiplied(left ? (startDeltaWidth - offsetLength) : (offsetLength - startDeltaWidth))).added(frontDir.multiplied(startFrontOffsetLength)));
                        if (!upward && stepCount > 1) {
                            stairRail.push(sp.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight + height)).added(frontDir.multiplied(horizontalStep)).added(leftDir.multiplied(left ? (stepDeltaWidth - offsetLength) : (offsetLength - stepDeltaWidth))));
                        }
                        // push columns
                        while (tempStepCount < stepCount - 1) {
                            const curHorStepDistance = (tempStepCount + 0.5) * horizontalStep;
                            const curVerStepDistance = (tempStepCount + (upward ? 1 : 0)) * stepHeight;
                            let curColumnActualHeight = columnActualHeight;
                            if (upward) {
                                curColumnActualHeight = (curHorStepDistance - startFrontOffsetLength) / (prevTotalStepLength - startFrontOffsetLength) * prevTotalVerStepLength - curVerStepDistance + stepHeight + height;
                            }
                            else {
                                curColumnActualHeight = (1 - (curHorStepDistance - horizontalStep) / (totalLength - horizontalStep - lastFrontOffsetLength)) * -prevTotalVerStepLength + (stepCount - 1 - tempStepCount) * stepHeight + height;
                            }
                            const curStepDeltaWidth = (tempStepCount + 0.5) * stepDeltaWidth;
                            const bottomPoint = sp.added(frontDir.multiplied(curHorStepDistance)).added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight + curVerStepDistance)).added(leftDir.multiplied(left ? (curStepDeltaWidth - offsetLength) : (offsetLength - curStepDeltaWidth)));
                            stairColumns.push([
                                bottomPoint,
                                bottomPoint.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(!upward && tempStepCount === 0 ? height : curColumnActualHeight)),
                            ]);
                            tempStepCount += reasonableStepCount;
                        }
                        if (stepCount > 1) {
                            if (upward) {
                                const lastStepDeltaWidth = (stepCount - 1) * stepDeltaWidth;
                                stairRail.push(sp.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight + height + (upward ? stepCount : (stepCount - (stepCount > 2 ? 2 : 1))) * stepHeight)).added(frontDir.multiplied((stepCount - 1) * horizontalStep)).added(leftDir.multiplied(left ? (lastStepDeltaWidth - offsetLength) : (offsetLength - lastStepDeltaWidth))));
                            }
                        }
                        const lastRailDeltaWidth = (1 - lastFrontOffsetLength / totalLength) * deltaWidth;
                        stairRail.push(sp.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight + height + (upward ? stepCount : stepCount - 1) * stepHeight)).added(frontDir.multiplied(totalLength - lastFrontOffsetLength)).added(leftDir.multiplied(left ? (lastRailDeltaWidth - offsetLength) : (offsetLength - lastRailDeltaWidth))));
                        if (tempStepCount - reasonableStepCount <= stepCount - 1) {
                            const lastColumnActualHeight = (lastStepLength / 2 - lastFrontOffsetLength) / (totalLength - horizontalStep - lastFrontOffsetLength) * -prevTotalVerStepLength + height;
                            const lastColumnDeltaWidth = (stepCount - 1 + lastStepLength / 2 / horizontalStep) * stepDeltaWidth;
                            const lastBottomPoint = sp.added(frontDir.multiplied(prevTotalStepLength + lastStepLength / 2)).added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(endHeight + (upward ? 0 : -stepHeight))).added(leftDir.multiplied(left ? (lastColumnDeltaWidth - offsetLength) : (offsetLength - lastColumnDeltaWidth)));
                            stairColumns.push([
                                lastBottomPoint,
                                lastBottomPoint.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(upward ? height : lastColumnActualHeight)),
                            ]);
                        }
                        // next segment startWidth !== currentSegment endWidth
                        sp = left ? start.added(baseLine3dDir.multiplied(startWidth / 2 - offsetLength)) : end.added(leftDir.multiplied(-endWidth / 2 + offsetLength));
                    }
                    else if (circleTangent) {
                        const { tangentLeftDir, isLeftArc, stepCount, circleCenter, radius, horizontalStepAngle, circleNormal, arcAngle, lastHorizontalAngle, valid } = (0,_meshUtils__WEBPACK_IMPORTED_MODULE_1__.calculateCircularStair)(currentSegment, circleTangent);
                        const startRadiusDir = isLeftArc ? tangentLeftDir.reversed() : tangentLeftDir;
                        if (!valid) {
                            return;
                        }
                        const usedStepCount = lastHorizontalAngle >= _consts__WEBPACK_IMPORTED_MODULE_0__.AngleTolerance || lastHorizontalAngle === 0 ? stepCount : stepCount - 1;
                        const usedLastHorizontalAngle = lastHorizontalAngle >= _consts__WEBPACK_IMPORTED_MODULE_0__.AngleTolerance || lastHorizontalAngle === 0 ? lastHorizontalAngle : horizontalStepAngle;
                        // push columns
                        while (tempStepCount < usedStepCount) {
                            const curRotateAngle = horizontalStepAngle * tempStepCount;
                            const nextRotateAngle = horizontalStepAngle * tempStepCount + (tempStepCount === usedStepCount - 1 ? usedLastHorizontalAngle : horizontalStepAngle);
                            const curRotateMatrix = GeomLib.createRotateMatrix4(horizontalStepAngle * tempStepCount, circleNormal, _consts__WEBPACK_IMPORTED_MODULE_0__.dummyPoint3d);
                            const nextRotateMatrix = GeomLib.createRotateMatrix4(nextRotateAngle, circleNormal, _consts__WEBPACK_IMPORTED_MODULE_0__.dummyPoint3d);
                            const curRadiusDir = startRadiusDir.appliedMatrix4(curRotateMatrix);
                            const nextRadiusDir = startRadiusDir.appliedMatrix4(nextRotateMatrix);
                            const curHalfWidth = (startWidth + (endWidth - startWidth) * (curRotateAngle) / arcAngle) / 2 * (isLeftArc ? -1 : 1) - offsetLength * (isLeftArc ? -1 : 1);
                            const nextHalfWidth = (startWidth + (endWidth - startWidth) * (nextRotateAngle) / arcAngle) / 2 * (isLeftArc ? -1 : 1) - offsetLength * (isLeftArc ? -1 : 1);
                            const curLeftMoldPt = circleCenter.added(curRadiusDir.multiplied(radius + curHalfWidth));
                            const curRightMoldPt = circleCenter.added(curRadiusDir.multiplied(radius - curHalfWidth));
                            const nextLeftMoldPt = circleCenter.added(nextRadiusDir.multiplied(radius + nextHalfWidth));
                            const nextRightMoldPt = circleCenter.added(nextRadiusDir.multiplied(radius - nextHalfWidth));
                            const curStepLeftFrontDir = nextLeftMoldPt.subtracted(curLeftMoldPt).multiplied(0.5);
                            const curStepRightFrontDir = nextRightMoldPt.subtracted(curRightMoldPt).multiplied(0.5);
                            const curStepLeftDir = _consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.cross(curStepLeftFrontDir).normalized();
                            const curLeftBottomPt = curLeftMoldPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight + (tempStepCount + (upward ? 1 : 0)) * stepHeight));
                            const curRightBottomPt = curRightMoldPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(startHeight + (tempStepCount + (upward ? 1 : 0)) * stepHeight));
                            const curLeftBottomMidPt = curLeftBottomPt.added(curStepLeftFrontDir);
                            const curRightBottomMidPt = curRightBottomPt.added(curStepRightFrontDir);
                            if (tempStepCount >= 0) {
                                // push rail
                                if (left) {
                                    stairRail.push(curLeftBottomPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height + (tempStepCount > 0 && !upward ? -stepHeight : 0))).added(curStepLeftFrontDir.normalized().multiplied(tempStepCount === 0 ? startFrontOffsetLength : 0)));
                                }
                                else {
                                    stairRail.push(curRightBottomPt.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height + (tempStepCount > 0 && !upward ? -stepHeight : 0))).added(curStepRightFrontDir.normalized().multiplied(tempStepCount === 0 ? startFrontOffsetLength : 0)));
                                }
                                if (tempStepCount === usedStepCount - 1) {
                                    const lastStepPercent = usedLastHorizontalAngle / horizontalStepAngle;
                                    const lastLeftHorStep = (radius + curHalfWidth) / radius * horizontalStep * lastStepPercent;
                                    const lastRightHorStep = (radius - curHalfWidth) / radius * horizontalStep * lastStepPercent;
                                    lastFrontOffsetLength = Math.min(offsetLength, lastStepPercent / 2 * horizontalStep);
                                    const lastSideHorStep = left ? lastLeftHorStep : lastRightHorStep;
                                    const lastColumnActualHeight = -stepHeight * Math.max((lastSideHorStep / 2 - lastFrontOffsetLength) / (lastSideHorStep - lastFrontOffsetLength), 0) + height;
                                    if (left) {
                                        stairRail.push(curLeftBottomMidPt.added(curStepLeftFrontDir).added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height)).added(curStepLeftFrontDir.normalized().multiplied(-lastFrontOffsetLength)));
                                    }
                                    else {
                                        stairRail.push(curRightBottomMidPt.added(curStepRightFrontDir).added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height)).added(curStepRightFrontDir.normalized().multiplied(-lastFrontOffsetLength)));
                                    }
                                    stairColumns.push([
                                        left ? curLeftBottomMidPt : curRightBottomMidPt,
                                        (left ? curLeftBottomMidPt : curRightBottomMidPt).added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(upward ? height : lastColumnActualHeight)),
                                    ]);
                                    // next segment startWidth !== currentSegment endWidth
                                    sp = left ? start.added(baseLine3dDir.multiplied(startWidth / 2 - offsetLength)) : nextRightMoldPt;
                                    if (!left) {
                                        leftDir = curStepLeftDir;
                                    }
                                }
                            }
                            if (tempStepCount % reasonableStepCount === 0 && tempStepCount < usedStepCount - 1) {
                                let startColumnActualHeight = columnActualHeight;
                                if (tempStepCount === 0 && upward) {
                                    const startLeftHorStep = (radius + curHalfWidth) / radius * horizontalStep;
                                    const startRightHorStep = (radius - curHalfWidth) / radius * horizontalStep;
                                    const startSideHorStep = left ? startLeftHorStep : startRightHorStep;
                                    startColumnActualHeight = stepHeight * (startSideHorStep / 2 - startFrontOffsetLength) / (startSideHorStep - startFrontOffsetLength) + height;
                                }
                                stairColumns.push([
                                    left ? curLeftBottomMidPt : curRightBottomMidPt,
                                    (left ? curLeftBottomMidPt : curRightBottomMidPt).added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied((tempStepCount === 0 ? (upward ? startColumnActualHeight : height) : columnActualHeight))),
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
                            ep = baseLine3dEndWithOffset;
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
                            const { line3dInd: stairNextLine3dInd, endOnBaseLineWithOffset } = getSegmentStartAndBaseLine3d(stairNextSegment, segments, currentSegment, offsetLength).startLine;
                            ep = endOnBaseLineWithOffset;
                            spToEpDir = ep.subtracted(sp).normalized();
                            const tailTempLine = moldTempLines[moldTempLines.length - 1];
                            const tailLine3dDir = moldVertices[tailTempLine[1]].subtracted(moldVertices[tailTempLine[0]]).normalized();
                            if (spToEpDir.dot(tailLine3dDir) >= 0) {
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
                        // ep is reused when pushEnd
                        let tempTailDistance = step;
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
                        while (tempTailDistance < cornerDistance) {
                            const bottomPoint = sp.added(cornerSpToEpDir.multiplied(tempTailDistance)).added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(cornerStartHeight + cornerAdditionalHeight)).added(cornerOffsetDir.multiplied(offsetLength));
                            handrail.columns.push([
                                bottomPoint,
                                bottomPoint.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(height)),
                            ]);
                            tempTailDistance += step;
                        }
                        const lastBottomPoint = ep.added(_consts__WEBPACK_IMPORTED_MODULE_0__.DirectionZ.multiplied(cornerStartHeight + cornerAdditionalHeight)).added(cornerOffsetDir.multiplied(offsetLength));
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
function getSegmentStartAndBaseLine3d(segment, segments, baseSegment, offsetLength) {
    const { start, param: { type, startWidth }, componentDirectionType, moldShape: { tempLines, vertices }, baseComponent } = segment;
    if (offsetLength === undefined) {
        offsetLength = _types__WEBPACK_IMPORTED_MODULE_2__.HandrailDefaultOffsetLength;
    }
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
    let baseLine3dStartWithOffset = baseLine3dStart.added(baseLine3dDir.multiplied(offsetLength));
    let baseLine3dEndWithOffset = baseLine3dEnd.added(baseLine3dDir.multiplied(-offsetLength));
    let startOnBaseLine = startLine3dStart;
    let endOnBaseLine = startLine3dEnd;
    let startOnBaseLineWithOffset = startLine3dStart.added(startLine3dDir.multiplied(offsetLength));
    let endOnBaseLineWithOffset = startLine3dEnd.added(startLine3dDir.multiplied(-offsetLength));
    if (type !== _types__WEBPACK_IMPORTED_MODULE_2__.ComponentType.Platform) {
        startOnBaseLine = start.added(baseLine3dDir.multiplied(startWidth / 2));
        endOnBaseLine = start.added(baseLine3dDir.multiplied(-startWidth / 2));
        startOnBaseLineWithOffset = start.added(baseLine3dDir.multiplied(startWidth / 2 - offsetLength));
        endOnBaseLineWithOffset = start.added(baseLine3dDir.multiplied(-startWidth / 2 + offsetLength));
    }
    return {
        startLine: { line3dInd: startLine3dInd, line3d: startLine3d, dir: startLine3dDir, start: startLine3dStart, end: startLine3dEnd, startOnBaseLine, endOnBaseLine, startOnBaseLineWithOffset, endOnBaseLineWithOffset },
        baseLine: { line3dInd: baseLine3dInd, line3d: baseLine3d, dir: baseLine3dDir, start: baseLine3dStart, end: baseLine3dEnd, startWithOffset: baseLine3dStartWithOffset, endWithOffset: baseLine3dEndWithOffset },
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

/***/ "./src/main/tools/drawStairsTool/types.ts":
/*!************************************************!*\
  !*** ./src/main/tools/drawStairsTool/types.ts ***!
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
/* harmony export */   MaterialAssignType: () => (/* binding */ MaterialAssignType),
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
    Stair: { bgId: '3FO4LHEUE413', materialId: '5ce2a6d7dcc7dc7dc8ee0fb0' },
    // Stair: { bgId: '3FO4ATKECLKI', materialId: '6168f454cdd25e00017d75d0' },
    Platform: { bgId: '3FO4LHEU9IIP', materialId: '5ce2a7a3b5cb6951becb5a4a' },
    Handrail: {
        rail: { bgId: '3FO4LHERH2YK', materialId: '5817337f3415f86f6b9372ea' },
        column: { bgId: '3FO4LHERH2YK', materialId: '5817337f3415f86f6b9372ea' },
    },
};
const PresetMaterials = ProdMaterials;
// const DevMaterials = {
//     Stair: { bgId: '3FO4H2D73JFO', materialId: '58af961b4a4d2c4f8aa2b1da' },
//     // Stair: { bgId: '3FO4ATKECLKI', materialId: '6168f454cdd25e00017d75d0' },
//     Platform: { bgId: '3FO4H2D6CQMY', materialId: '5816fef985da566a1b28a944' },
//     Handrail: {
//         rail: { bgId: '3FO4H2D6H8SB', materialId: '58afb3ab5c26a073b389a95f' },
//         column: { bgId: '3FO4GDK5EXDC', materialId: '5e532fb42014020001cc4889' },
//     },
// }
// export const PresetMaterials = ((window as any).origin || '').includes('sit') ? DevMaterials : ProdMaterials;
var ComponentParamType;
(function (ComponentParamType) {
    ComponentParamType["HorizontalStep"] = "horizontalStep";
    ComponentParamType["VerticalStep"] = "verticalStep";
    ComponentParamType["StartWidth"] = "startWidth";
    ComponentParamType["EndWidth"] = "endWidth";
    ComponentParamType["Upward"] = "upward";
    ComponentParamType["PlatformThickness"] = "platformThickness";
    ComponentParamType["ComponentMaterial"] = "material";
    ComponentParamType["Type"] = "type";
    ComponentParamType["PlatformLength"] = "platformLength";
    ComponentParamType["StepProportional"] = "stepProportional";
    ComponentParamType["WidthProportional"] = "widthProportional";
    ComponentParamType["PlatformLengthLocked"] = "platformLengthLocked";
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
            radius: { title: "半径", min: 1, max: 100000, step: 1, unit: '', precision: 0, },
            width: { title: "宽度", min: 1, max: 100000, step: 1, unit: '', precision: 0, },
            height: { title: "高度", min: 1, max: 100000, step: 1, unit: '', precision: 0, },
        }
    }
};
var MaterialAssignType;
(function (MaterialAssignType) {
    MaterialAssignType["StairOverall"] = "stairOverall";
    MaterialAssignType["PlatformOverall"] = "platformOverall";
    MaterialAssignType["Rail"] = "rail";
    MaterialAssignType["Column"] = "column";
})(MaterialAssignType || (MaterialAssignType = {}));
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
            param: { radius: 12, width: 20, height: 12, },
            material: PresetMaterials.Handrail.rail,
        },
        column: {
            type: ColumnType.Circle,
            step: 400,
            param: { radius: 4, width: 8, height: 8, },
            material: PresetMaterials.Handrail.column,
        },
    },
    stepProportional: true,
    widthProportional: true,
};
function getDefaultStairParam() {
    return {
        horizontalStep: 200,
        verticalStep: 100,
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
                param: { radius: 12, width: 20, height: 12, },
                material: PresetMaterials.Handrail.rail,
            },
            column: {
                type: ColumnType.Circle,
                step: 400,
                param: { radius: 4, width: 8, height: 8, },
                material: PresetMaterials.Handrail.column,
            },
        },
        stepProportional: DefaultStairParam.stepProportional,
        widthProportional: DefaultStairParam.widthProportional,
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
    stepProportional: true,
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

/***/ "./src/main/tools/drawStairsTool/utils.ts":
/*!************************************************!*\
  !*** ./src/main/tools/drawStairsTool/utils.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   abortOperation: () => (/* binding */ abortOperation),
/* harmony export */   commitOperation: () => (/* binding */ commitOperation),
/* harmony export */   getCoordinate: () => (/* binding */ getCoordinate),
/* harmony export */   isEqual: () => (/* binding */ isEqual),
/* harmony export */   isGroupDefPartOfEditModel: () => (/* binding */ isGroupDefPartOfEditModel),
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
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/main/tools/drawStairsTool/index.ts");
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./consts */ "./src/main/tools/drawStairsTool/consts.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "./src/main/tools/drawStairsTool/types.ts");



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
    value += `a=${param.horizontalStep}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
    value += `b=${param.verticalStep}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
    value += `c=${param.startWidth}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
    value += `d=${param.endWidth}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
    value += `e=${param.upward ? 1 : 0}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
    value += `f=${param.platformThickness}`;
    if (param.handrail.support) {
        const { handrail: { height, rail, column } } = param;
        value += `g=${height}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
        value += `h=${rail.type}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
        if (rail.type === _types__WEBPACK_IMPORTED_MODULE_2__.RailType.Circle && rail.param.radius !== undefined) {
            value += `i=${rail.param.radius}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
        }
        else if (rail.type === _types__WEBPACK_IMPORTED_MODULE_2__.RailType.Rect) {
            if (rail.param.width !== undefined) {
                value += `j=${rail.param.width}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
            }
            if (rail.param.height !== undefined) {
                value += `k=${rail.param.height}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
            }
        }
        value += `l=${column.type}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
        value += `m=${column.step}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
        if (column.type === _types__WEBPACK_IMPORTED_MODULE_2__.ColumnType.Circle && column.param.radius !== undefined) {
            value += `n=${column.param.radius}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
        }
        else if (column.type === _types__WEBPACK_IMPORTED_MODULE_2__.ColumnType.Rect) {
            if (column.param.width !== undefined) {
                value += `o=${column.param.width}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
            }
            if (column.param.height !== undefined) {
                value += `p=${column.param.height}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
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
                case 'a':
                    param.horizontalStep = parseInt(keyValue[1]);
                    break;
                case 'b':
                    param.verticalStep = parseInt(keyValue[1]);
                    break;
                case 'c':
                    param.startWidth = parseInt(keyValue[1]);
                    break;
                case 'd':
                    param.endWidth = parseInt(keyValue[1]);
                    break;
                case 'e':
                    param.upward = keyValue[1] === '1' ? true : false;
                    break;
                case 'f':
                    param.platformThickness = parseInt(keyValue[1]);
                    break;
                case 'g':
                    param.handrail.height = parseFloat(keyValue[1]);
                    break;
                case 'h':
                    param.handrail.rail.type = parseFloat(keyValue[1]);
                    break;
                case 'i':
                    param.handrail.rail.param.radius = parseInt(keyValue[1]);
                    break;
                case 'j':
                    param.handrail.rail.param.width = parseInt(keyValue[1]);
                    break;
                case 'k':
                    param.handrail.rail.param.height = parseInt(keyValue[1]);
                    break;
                case 'l':
                    param.handrail.column.type = parseFloat(keyValue[1]);
                    break;
                case 'm':
                    param.handrail.column.step = parseFloat(keyValue[1]);
                    break;
                case 'n':
                    param.handrail.column.param.radius = parseInt(keyValue[1]);
                    break;
                case 'o':
                    param.handrail.column.param.width = parseInt(keyValue[1]);
                    break;
                case 'p':
                    param.handrail.column.param.height = parseInt(keyValue[1]);
                    break;
            }
        }
    }
    param.stepProportional = _types__WEBPACK_IMPORTED_MODULE_2__.DefaultStairParam.stepProportional;
    param.widthProportional = _types__WEBPACK_IMPORTED_MODULE_2__.DefaultStairParam.widthProportional;
    return param;
}
function stringifyComponentParam(param) {
    let value = '';
    value += `a=${param.index}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
    value += `b=${param.horizontalStep}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
    value += `c=${param.verticalStep}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
    value += `d=${param.startWidth}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
    value += `e=${param.endWidth}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
    value += `f=${param.offsetWidth}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
    value += `g=${param.platformLength}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
    value += `h=${param.type}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
    value += `i=${param.upward ? 1 : 0}${_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter}`;
    value += `j=${param.platformThickness}`;
    return value;
}
function parseComponentParam(value) {
    const param = Object.assign({}, _types__WEBPACK_IMPORTED_MODULE_2__.DefaultComponentParam);
    const items = value.split(_types__WEBPACK_IMPORTED_MODULE_2__.Delimiter);
    for (const item of items) {
        const keyValue = item.split('=');
        if (keyValue.length === 2) {
            switch (keyValue[0]) {
                case 'a':
                    param.index = parseInt(keyValue[1]);
                    break;
                case 'b':
                    param.horizontalStep = parseInt(keyValue[1]);
                    break;
                case 'c':
                    param.verticalStep = parseInt(keyValue[1]);
                    break;
                case 'd':
                    param.startWidth = parseInt(keyValue[1]);
                    break;
                case 'e':
                    param.endWidth = parseInt(keyValue[1]);
                    break;
                case 'f':
                    param.offsetWidth = parseFloat(keyValue[1]);
                    break;
                case 'g':
                    param.platformLength = parseFloat(keyValue[1]);
                    break;
                case 'h':
                    param.type = parseInt(keyValue[1]);
                    break;
                case 'i':
                    param.upward = keyValue[1] === '1' ? true : false;
                    break;
                case 'j':
                    param.platformThickness = parseInt(keyValue[1]);
                    break;
            }
        }
    }
    param.stepProportional = _types__WEBPACK_IMPORTED_MODULE_2__.DefaultComponentParam.stepProportional;
    param.widthProportional = _types__WEBPACK_IMPORTED_MODULE_2__.DefaultComponentParam.widthProportional;
    param.platformLengthLocked = true;
    param.modelEditing = true;
    param.withOffset = !isEqual(param.offsetWidth, 0);
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
    app.getActiveDesign().commitOperation();
    isInOperation = false;
}
function abortOperation() {
    debugger;
    app.getActiveDesign().abortOperation();
    isInOperation = false;
}
function onModelChanged(changes) {
    const modified = changes.modified;
    const deleted = changes.deleted;
    const added = changes.added;
    const editModel = _index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool.getEditModel();
    if (!isInOperation && ((deleted === null || deleted === void 0 ? void 0 : deleted.length) || (added === null || added === void 0 ? void 0 : added.length) || (editModel && (modified === null || modified === void 0 ? void 0 : modified.some(group => {
        return isGroupDefPartOfEditModel(editModel, group);
    }))))) {
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
function isGroupDefPartOfEditModel(editModel, groupDefinition) {
    var _a, _b, _c;
    const groupDefinitionKey = groupDefinition.getKey();
    return editModel.parent.definitionKey === groupDefinitionKey ||
        [...editModel.stairs.values()].some(instanceData => instanceData.definitionKey === groupDefinitionKey) ||
        [...editModel.platforms.values()].some(instanceData => instanceData.definitionKey === groupDefinitionKey) ||
        ((_a = editModel.handrail) === null || _a === void 0 ? void 0 : _a.handrailInstance.definitionKey) === groupDefinitionKey ||
        [...(((_b = editModel.handrail) === null || _b === void 0 ? void 0 : _b.railInstances) || []).values()].some(instanceData => instanceData.definitionKey === groupDefinitionKey) ||
        [...(((_c = editModel.handrail) === null || _c === void 0 ? void 0 : _c.columnInstances) || []).values()].some(instanceData => instanceData.definitionKey === groupDefinitionKey);
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
    MessageType["PropertiesVisible"] = "propertiesVisible";
    MessageType["DrawStairModelSettled"] = "drawStairModelSettled";
    MessageType["StairParamChangedByInput"] = "stairParamChangedByInput";
    MessageType["StairParamChangedByDraw"] = "stairParamChangedByDraw";
    MessageType["ParamChangedByInput"] = "paramChangedByInput";
    MessageType["ParamChangedByDraw"] = "paramChangedByDraw";
    MessageType["ComponentAdded"] = "componentAdded";
    MessageType["RemoveComponent"] = "removeComponent";
    MessageType["FocusComponentIndex"] = "focusComponentIndex";
    MessageType["FocusComponentIndexByDraw"] = "focusComponentIndexByDraw";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isa0RBQWM7QUFDcEM7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFFBQVEsa0RBQWM7QUFDdEI7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDeldPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLGtDQUFrQzs7Ozs7OztVQ2pCbkM7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kcmF3LXN0YWlycy8uL3NyYy9tYWluL21haW4udHMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvLi9zcmMvbWFpbi90b29scy9kcmF3U3RhaXJzVG9vbC9jb25zdHMudHMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvLi9zcmMvbWFpbi90b29scy9kcmF3U3RhaXJzVG9vbC9pbmRleC50cyIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy8uL3NyYy9tYWluL3Rvb2xzL2RyYXdTdGFpcnNUb29sL21lc2hVdGlscy50cyIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy8uL3NyYy9tYWluL3Rvb2xzL2RyYXdTdGFpcnNUb29sL3RlbXBNZXNoVXRpbHMudHMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvLi9zcmMvbWFpbi90b29scy9kcmF3U3RhaXJzVG9vbC90eXBlcy50cyIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy8uL3NyYy9tYWluL3Rvb2xzL2RyYXdTdGFpcnNUb29sL3V0aWxzLnRzIiwid2VicGFjazovL2RyYXctc3RhaXJzLy4vc3JjL21haW4vdHlwZXMudHMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2RyYXctc3RhaXJzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2RyYXctc3RhaXJzL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBkcmF3U3RhaXJzVG9vbCB9IGZyb20gXCIuL3Rvb2xzL2RyYXdTdGFpcnNUb29sL2luZGV4XCI7XG5pbXBvcnQgeyBpc0tHcm91cEluc3RhbmNlLCBpc1BhcnRPZkVkaXRNb2RlbCwgb25Nb2RlbENoYW5nZWQgfSBmcm9tIFwiLi90b29scy9kcmF3U3RhaXJzVG9vbC91dGlsc1wiO1xuaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi90eXBlc1wiO1xuY29uc3QgcGx1Z2luVUkgPSBhcHAuZ2V0UGx1Z2luVUkoKTtcbnBsdWdpblVJLnJlc2l6ZSgzNjAsIDcyMCk7XG5wbHVnaW5VSS5tb3VudCgpO1xubGV0IGFjdGl2YXRlZEN1c3RvbVRvb2w7XG5mdW5jdGlvbiBvblVJTWVzc2FnZShkYXRhKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChkYXRhLnR5cGUgPT09IE1lc3NhZ2VUeXBlLkRyYXdTdGFpclZpZXdNb3VudGVkKSB7XG4gICAgICAgICAgICAgICAgb25QbHVnaW5TdGFydFVwKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09IE1lc3NhZ2VUeXBlLkFjdGl2YXRlRHJhd1N0YWlyc1Rvb2wpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiAoZGF0YS50eXBlID09PSAnYWN0aXZhdGVTdHJhaWdodFN0YWlyc1Rvb2wnIHx8IGRhdGEudHlwZSA9PT0gJ2FjdGl2YXRlQ2lyY3VsYXJTdGFpcnNUb29sJykge1xuICAgICAgICAgICAgICAgIGlmIChhY3RpdmF0ZWRDdXN0b21Ub29sICE9PSBkcmF3U3RhaXJzVG9vbCkge1xuICAgICAgICAgICAgICAgICAgICBhcHAuYWN0aXZhdGVDdXN0b21Ub29sKGRyYXdTdGFpcnNUb29sLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZhdGVkQ3VzdG9tVG9vbCA9IGRyYXdTdGFpcnNUb29sO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBkcmF3U3RhaXJzVG9vbC5jaGFuZ2VDb21wb25lbnRUeXBlKGRhdGEuY29tcG9uZW50VHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09IE1lc3NhZ2VUeXBlLkRlQWN0aXZhdGVEcmF3U3RhaXJzVG9vbCkge1xuICAgICAgICAgICAgICAgIC8vIH0gZWxzZSBpZiAoZGF0YS50eXBlID09PSAnZGVBY3RpdmF0ZVN0cmFpZ2h0U3RhaXJzVG9vbCcgfHwgZGF0YS50eXBlID09PSAnZGVBY3RpdmF0ZUNpcmN1bGFyU3RhaXJzVG9vbCcpIHtcbiAgICAgICAgICAgICAgICBkZUFjdGl2YXRlRHJhd1N0YWlyc1Rvb2woKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gTWVzc2FnZVR5cGUuU3RhaXJQYXJhbUNoYW5nZWRCeUlucHV0KSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgKGFjdGl2YXRlZEN1c3RvbVRvb2wgPT09IGRyYXdTdGFpcnNUb29sKSB7XG4gICAgICAgICAgICAgICAgZHJhd1N0YWlyc1Rvb2wuY2hhbmdlU3RhaXJQYXJhbShkYXRhLnN0YWlyUGFyYW0sIGRhdGEuY2hhbmdlUGFyYW1zKTtcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09IE1lc3NhZ2VUeXBlLlBhcmFtQ2hhbmdlZEJ5SW5wdXQpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiAoYWN0aXZhdGVkQ3VzdG9tVG9vbCA9PT0gZHJhd1N0YWlyc1Rvb2wpIHtcbiAgICAgICAgICAgICAgICBkcmF3U3RhaXJzVG9vbC5jaGFuZ2VDb21wb25lbnRQYXJhbShkYXRhLmNvbXBvbmVudFBhcmFtLCBkYXRhLmNoYW5nZVBhcmFtcyk7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSBNZXNzYWdlVHlwZS5Gb2N1c0NvbXBvbmVudEluZGV4KSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgKGFjdGl2YXRlZEN1c3RvbVRvb2wgPT09IGRyYXdTdGFpcnNUb29sKSB7XG4gICAgICAgICAgICAgICAgZHJhd1N0YWlyc1Rvb2wuZm9jdXNDb21wb25lbnQoZGF0YS5jb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSBNZXNzYWdlVHlwZS5SZW1vdmVDb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiAoYWN0aXZhdGVkQ3VzdG9tVG9vbCA9PT0gZHJhd1N0YWlyc1Rvb2wpIHtcbiAgICAgICAgICAgICAgICBkcmF3U3RhaXJzVG9vbC5yZW1vdmVDb21wb25lbnQoZGF0YS5jb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSBNZXNzYWdlVHlwZS5NYXRlcmlhbFJlcGxhY2VDbGljaykge1xuICAgICAgICAgICAgICAgIC8vIGlmIChhY3RpdmF0ZWRDdXN0b21Ub29sID09PSBkcmF3U3RhaXJzVG9vbCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvbk1hdGVyaWFsUmVwbGFjZUNsaWNrJyk7XG4gICAgICAgICAgICAgICAgZHJhd1N0YWlyc1Rvb2wub25NYXRlcmlhbFJlcGxhY2VDbGljayhkYXRhLmNoYW5nZVBhcmFtLCBkYXRhLmluZGV4KTtcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIGNsb3NlUGx1Z2luKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkZUFjdGl2YXRlRHJhd1N0YWlyc1Rvb2woKSB7XG4gICAgYWN0aXZhdGVkQ3VzdG9tVG9vbCA9IHVuZGVmaW5lZDtcbiAgICBhcHAuZGVhY3RpdmF0ZUN1c3RvbVRvb2woZHJhd1N0YWlyc1Rvb2wsIGZhbHNlKTtcbn1cbnBsdWdpblVJLm9uTWVzc2FnZShvblVJTWVzc2FnZSk7XG5jb25zdCBzZWxlY3Rpb24gPSBhcHAuZ2V0U2VsZWN0aW9uKCk7XG5zZWxlY3Rpb24uYWRkT2JzZXJ2ZXIoe1xuICAgIG9uU2VsZWN0aW9uQ2hhbmdlOiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFsbEVudGl0aWVzID0gc2VsZWN0aW9uLmdldEFsbEVudGl0aWVzKCk7XG4gICAgICAgIGlmIChhbGxFbnRpdGllcy5sZW5ndGggPT09IDEgJiYgaXNLR3JvdXBJbnN0YW5jZShhbGxFbnRpdGllc1swXSkpIHtcbiAgICAgICAgICAgIGRyYXdTdGFpcnNUb29sLmNsZWFyVGVtcFNoYXBlcygpO1xuICAgICAgICAgICAgZHJhd1N0YWlyc1Rvb2wuc2V0TW9kZWwoYWxsRW50aXRpZXNbMF0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFsbEVudGl0aWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgZWRpdFBhdGggPSBhcHAuZ2V0QWN0aXZlRGVzaWduKCkuZ2V0RWRpdFBhdGgoKTtcbiAgICAgICAgICAgIGNvbnN0IGVkaXRNb2RlbCA9IGRyYXdTdGFpcnNUb29sLmdldEVkaXRNb2RlbCgpO1xuICAgICAgICAgICAgZHJhd1N0YWlyc1Rvb2wuY2xlYXJUZW1wU2hhcGVzKCk7XG4gICAgICAgICAgICBpZiAoIWVkaXRQYXRoLmxlbmd0aCB8fCAhZWRpdE1vZGVsIHx8ICFpc1BhcnRPZkVkaXRNb2RlbChlZGl0TW9kZWwsIGVkaXRQYXRoW2VkaXRQYXRoLmxlbmd0aCAtIDFdKSkge1xuICAgICAgICAgICAgICAgIGlmIChhY3RpdmF0ZWRDdXN0b21Ub29sICE9PSBkcmF3U3RhaXJzVG9vbCkge1xuICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlByb3BlcnRpZXNWaXNpYmxlLCBwcm9wZXJ0aWVzVmlzaWJsZTogZmFsc2UgfSwgJyonKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KTtcbmZ1bmN0aW9uIG9uUGx1Z2luU3RhcnRVcCgpIHtcbiAgICBjb25zdCBhbGxFbnRpdGllcyA9IHNlbGVjdGlvbi5nZXRBbGxFbnRpdGllcygpO1xuICAgIGlmIChhbGxFbnRpdGllcy5sZW5ndGggPT09IDEgJiYgaXNLR3JvdXBJbnN0YW5jZShhbGxFbnRpdGllc1swXSkpIHtcbiAgICAgICAgZHJhd1N0YWlyc1Rvb2wuc2V0TW9kZWwoYWxsRW50aXRpZXNbMF0pO1xuICAgIH1cbiAgICBhcHAuYWRkT2JzZXJ2ZXIoe1xuICAgICAgICBvblBsdWdpbkNsb3NlZDogKCkgPT4ge1xuICAgICAgICB9LFxuICAgICAgICBvbk1vZGVsQ2hhbmdlZCxcbiAgICB9KTtcbn1cbiIsImltcG9ydCB7IENvbXBvbmVudERpcmVjdGlvblR5cGUsIENvbXBvbmVudFR5cGUsIERlZmF1bHRDb21wb25lbnRQYXJhbSwgRGVmYXVsdFN0YWlyUGFyYW0sIFByZXNldE1hdGVyaWFscyB9IGZyb20gXCIuL3R5cGVzXCI7XG5leHBvcnQgY29uc3QgZHVtbXlNYXRyaXg0ID0gR2VvbUxpYi5jcmVhdGVJZGVudGl0eU1hdHJpeDQoKTtcbmV4cG9ydCBjb25zdCBkdW1teVZlY3RvcjNkID0gR2VvbUxpYi5jcmVhdGVWZWN0b3IzZCgwLCAwLCAwKTtcbmV4cG9ydCBjb25zdCBkdW1teVBvaW50M2QgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QoMCwgMCwgMCk7XG5leHBvcnQgY29uc3QgRGlyZWN0aW9uWCA9IEdlb21MaWIuY3JlYXRlVmVjdG9yM2QoMSwgMCwgMCk7XG5leHBvcnQgY29uc3QgRGlyZWN0aW9uWSA9IEdlb21MaWIuY3JlYXRlVmVjdG9yM2QoMCwgMSwgMCk7XG5leHBvcnQgY29uc3QgRGlyZWN0aW9uWiA9IEdlb21MaWIuY3JlYXRlVmVjdG9yM2QoMCwgMCwgMSk7XG4vLyBjb25zdCBIZWlnaHRUb2xlcmFuY2U6IG51bWJlciA9IDU7XG5leHBvcnQgY29uc3QgTGVuZ3RoVG9sZXJhbmNlID0gMjtcbmV4cG9ydCBjb25zdCBEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSA9IE1hdGguUEkgLyAzNjtcbmV4cG9ydCBjb25zdCBBbmdsZVRvbGVyYW5jZSA9IE1hdGguUEkgLyAxODAgLyA1O1xuZXhwb3J0IGNvbnN0IFN0ZXBDb3VudExpbWl0ID0gMTAwO1xuLy8gY29uc3QgRGVmYXVsdEJvYXJkVGhpY2tuZXNzID0gNTA7XG5leHBvcnQgY29uc3QgVGVtcExpbmVDb2xvcnMgPSB7XG4gICAgU3RhaXI6IHsgcjogMCwgZzogMCwgYjogMjU1IH0sXG4gICAgTW9sZDogeyByOiAxMywgZzogNzEsIGI6IDE2MSB9LFxuICAgIEhhbmRyYWlsOiB7IHI6IDAsIGc6IDAsIGI6IDAgfSxcbiAgICBJbmZlcmVuY2U6IHsgcjogMCwgZzogMCwgYjogMCB9LFxuICAgIEZvY3VzOiB7IHI6IDI1NSwgZzogMCwgYjogMCB9LFxufTtcbmV4cG9ydCBjb25zdCBUZW1wTGluZVBhdHRlcm5zID0ge1xuICAgIEhhbmRyYWlsOiBLTGluZVBhdHRlcm4uRGFzaCxcbiAgICBTdGFpckFuZE1vbGQ6IEtMaW5lUGF0dGVybi5Tb2xpZCxcbiAgICBJbmZlcmVuY2U6IEtMaW5lUGF0dGVybi5EYXNoLFxufTtcbmV4cG9ydCBjb25zdCBDYWNoZVNldHRpbmdzID0ge1xuICAgIHN0YWlyVHlwZTogQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyLFxufTtcbmV4cG9ydCBmdW5jdGlvbiBnZXROZXdDb21wb25lbnRQYXJhbSh0eXBlLCBiYXNlU2VnbWVudCwgdXB3YXJkKSB7XG4gICAgbGV0IHN0YXJ0V2lkdGggPSBEZWZhdWx0U3RhaXJQYXJhbS5zdGFydFdpZHRoICogKHR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gPyAyIDogMSk7XG4gICAgbGV0IGVuZFdpZHRoID0gRGVmYXVsdFN0YWlyUGFyYW0uZW5kV2lkdGggKiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSA/IDIgOiAxKTtcbiAgICBpZiAoYmFzZVNlZ21lbnQpIHtcbiAgICAgICAgY29uc3QgeyBwYXJhbTogeyBlbmRXaWR0aDogYmFzZVNlZ21lbnRFbmRXaWR0aCwgdHlwZTogYmFzZVNlZ21lbnRUeXBlIH0gfSA9IGJhc2VTZWdtZW50O1xuICAgICAgICBpZiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgaWYgKGJhc2VTZWdtZW50VHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgICAgIHN0YXJ0V2lkdGggPSBiYXNlU2VnbWVudEVuZFdpZHRoO1xuICAgICAgICAgICAgICAgIGVuZFdpZHRoID0gYmFzZVNlZ21lbnRFbmRXaWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0YXJ0V2lkdGggPSAyICogYmFzZVNlZ21lbnRFbmRXaWR0aDtcbiAgICAgICAgICAgICAgICBlbmRXaWR0aCA9IDIgKiBiYXNlU2VnbWVudEVuZFdpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGJhc2VTZWdtZW50VHlwZSAhPT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgICAgIHN0YXJ0V2lkdGggPSBiYXNlU2VnbWVudEVuZFdpZHRoO1xuICAgICAgICAgICAgICAgIGVuZFdpZHRoID0gYmFzZVNlZ21lbnRFbmRXaWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBEZWZhdWx0Q29tcG9uZW50UGFyYW0pLCB7IGluZGV4OiBiYXNlU2VnbWVudCA/IGJhc2VTZWdtZW50LnBhcmFtLmluZGV4ICsgMSA6IDAsIHR5cGUsXG4gICAgICAgIHN0YXJ0V2lkdGgsXG4gICAgICAgIGVuZFdpZHRoLCB1cHdhcmQ6IHVwd2FyZCA9PT0gdW5kZWZpbmVkID8gRGVmYXVsdENvbXBvbmVudFBhcmFtLnVwd2FyZCA6IHVwd2FyZCwgb2Zmc2V0V2lkdGg6IDAsIHdpdGhPZmZzZXQ6IGZhbHNlLCBwbGF0Zm9ybUxlbmd0aExvY2tlZDogZmFsc2UgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0TmV3U2VnbWVudCh0eXBlLCBiYXNlU2VnbWVudCwgdXB3YXJkKSB7XG4gICAgY29uc3QgcGFyYW0gPSBnZXROZXdDb21wb25lbnRQYXJhbSh0eXBlLCBiYXNlU2VnbWVudCwgdXB3YXJkKTtcbiAgICBwYXJhbS5tYXRlcmlhbCA9IHR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gPyBQcmVzZXRNYXRlcmlhbHMuUGxhdGZvcm0gOiBQcmVzZXRNYXRlcmlhbHMuU3RhaXI7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhcnQ6IGR1bW15UG9pbnQzZCxcbiAgICAgICAgZW5kOiBkdW1teVBvaW50M2QsXG4gICAgICAgIHN0YXJ0TG9ja2VkOiBmYWxzZSxcbiAgICAgICAgZW5kTG9ja2VkOiBmYWxzZSxcbiAgICAgICAgc3RhcnRIZWlnaHQ6IDAsXG4gICAgICAgIGVuZEhlaWdodDogMCxcbiAgICAgICAgc3RhaXJTaGFwZToge1xuICAgICAgICAgICAgc3RlcENvdW50OiAwLFxuICAgICAgICAgICAgdmVydGljZXM6IFtdLFxuICAgICAgICAgICAgdGVtcExpbmVzOiBbXSxcbiAgICAgICAgfSxcbiAgICAgICAgbW9sZFNoYXBlOiB7XG4gICAgICAgICAgICBzdGVwQ291bnQ6IDAsXG4gICAgICAgICAgICB2ZXJ0aWNlczogW10sXG4gICAgICAgICAgICB0ZW1wTGluZXM6IFtdLFxuICAgICAgICB9LFxuICAgICAgICBjb3JuZXJTaGFwZToge1xuICAgICAgICAgICAgc3RlcENvdW50OiAwLFxuICAgICAgICAgICAgdmVydGljZXM6IFtdLFxuICAgICAgICAgICAgdGVtcExpbmVzOiBbXSxcbiAgICAgICAgfSxcbiAgICAgICAgY29ybmVyTW9sZFNoYXBlOiB7XG4gICAgICAgICAgICBzdGVwQ291bnQ6IDAsXG4gICAgICAgICAgICB2ZXJ0aWNlczogW10sXG4gICAgICAgICAgICB0ZW1wTGluZXM6IFtdLFxuICAgICAgICB9LFxuICAgICAgICBuZXh0Q29tcG9uZW50czogQXJyYXkuZnJvbSh7IGxlbmd0aDogNiB9LCBfID0+IG5ldyBTZXQoKSksXG4gICAgICAgIHBhcmFtLFxuICAgICAgICBjb21wb25lbnREaXJlY3Rpb25UeXBlOiBDb21wb25lbnREaXJlY3Rpb25UeXBlLkZyb250LFxuICAgIH07XG59XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCB7IENvbXBvbmVudFR5cGUsIENvbXBvbmVudFBhcmFtS2V5LCBTdGFydEVuZEtleSwgQmFzZUxpbmVTZWczZEtleSwgU3RhaXJNb2RlbEtleSwgQ29tcG9uZW50UGFyYW1UeXBlLCBNb2RlbFZhbHVlLCBDaXJjbGVUYW5nZW50S2V5LCBEZWZhdWx0U3RhaXJQYXJhbSwgQmFzZUNvbXBvbmVudEtleSwgSGFuZHJhaWxNb2RlbEtleSwgUmFpbE1vZGVsS2V5LCBDb2x1bW5Nb2RlbEtleSwgU3RhaXJQYXJhbUtleSwgU3RhaXJNYXRlcmlhbEtleSwgQ29sdW1uTWF0ZXJpYWxLZXksIFJhaWxNYXRlcmlhbEtleSwgUGxhdGZvcm1NYXRlcmlhbEtleSwgQ29tcG9uZW50TWF0ZXJpYWxLZXksIERlZmF1bHRDb21wb25lbnRQYXJhbSB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZUhhbmRyYWlsU2hhcGUsIGdlbmVyYXRlU2hhcGUsIGlzQ2lyY3VsYXJTdGFpciB9IGZyb20gXCIuL3RlbXBNZXNoVXRpbHNcIjtcbmltcG9ydCB7IGJ1aWxkQ29tcG9uZW50SW5zdGFuY2UsIGJ1aWxkSGFuZHJhaWxJbnN0YW5jZSwgYnVpbGRTZWdtZW50UmVsYXRpb25zLCBjaGFuZ2VQbGF0Zm9ybUxlbmd0aCwgY2hhbmdlUGxhdGZvcm1XaWR0aCwgY2hhbmdlU3RhaXJTdGVwLCBjaGFuZ2VTdGFpclVwd2FyZCwgZ2VuZXJhdGVNZXNoZXMsIGdldFNlZ21lbnRCeUluZGV4LCBsb2FkRGVmYXVsdE1hdGVyaWFscyB9IGZyb20gXCIuL21lc2hVdGlsc1wiO1xuaW1wb3J0IHsgcGFyc2VCYXNlQ29tcG9uZW50LCBwYXJzZUxpbmVTZWczZCwgcGFyc2VDb21wb25lbnRQYXJhbSwgcGFyc2VTdGFydEVuZCwgcGFyc2VWZWN0b3IzZCwgc3RyaW5naWZ5U3RhaXJQYXJhbSwgc3RyaW5naWZ5TWF0ZXJpYWwsIHBhcnNlU3RhaXJQYXJhbSwgcGFyc2VNYXRlcmlhbCwgc3RhcnRPcGVyYXRpb24sIGFib3J0T3BlcmF0aW9uLCBjb21taXRPcGVyYXRpb24sIGlzUGFydE9mRWRpdE1vZGVsIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCB7IENhY2hlU2V0dGluZ3MsIGdldE5ld0NvbXBvbmVudFBhcmFtLCBnZXROZXdTZWdtZW50LCBUZW1wTGluZUNvbG9ycywgVGVtcExpbmVQYXR0ZXJucyB9IGZyb20gXCIuL2NvbnN0c1wiO1xuaW1wb3J0IHsgZGVBY3RpdmF0ZURyYXdTdGFpcnNUb29sIH0gZnJvbSBcIi4uLy4uL21haW5cIjtcbmltcG9ydCB7IE1lc3NhZ2VUeXBlIH0gZnJvbSBcIi4uLy4uL3R5cGVzXCI7XG5jb25zdCBkZXNpZ24gPSBhcHAuZ2V0QWN0aXZlRGVzaWduKCk7XG5jb25zdCBzZWxlY3Rpb24gPSBhcHAuZ2V0U2VsZWN0aW9uKCk7XG5jb25zdCBwbHVnaW5VSSA9IGFwcC5nZXRQbHVnaW5VSSgpO1xuY29uc3QgYXBwVmlldyA9IGFwcC5nZXRBY3RpdmVWaWV3KCk7XG5jb25zdCB0b29sSGVscGVyID0gYXBwLmdldFRvb2xIZWxwZXIoKTtcbmNvbnN0IERlZmF1bHRGb2N1c2VkQ29tcG9uZW50SW5kZXggPSAtMTtcbmV4cG9ydCBjbGFzcyBEcmF3U3RhaXJzVG9vbCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8vIHByaXZhdGUgY29tcG9uZW50UGFyYW06IENvbXBvbmVudFBhcmFtID0geyAuLi5EZWZhdWx0Q29tcG9uZW50UGFyYW0gfTtcbiAgICAgICAgdGhpcy5kcmF3aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4ID0gRGVmYXVsdEZvY3VzZWRDb21wb25lbnRJbmRleDtcbiAgICAgICAgdGhpcy5zZWdtZW50cyA9IFtdO1xuICAgICAgICB0aGlzLnN0YWlyUGFyYW0gPSBPYmplY3QuYXNzaWduKHt9LCBEZWZhdWx0U3RhaXJQYXJhbSk7XG4gICAgICAgIHRoaXMub25NYXRlcmlhbFJlcGxhY2VJdGVtQ2xpY2sgPSAoY2hhbmdlUGFyYW1UeXBlLCBpbmRleCwgaXNEZWxldGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAobWF0ZXJpYWxJZCwgYmdpZCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvbk1hdGVyaWFsUmVwbGFjZUl0ZW1DbGljaycpO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMub25NYXRlcmlhbFJlcGxhY2VJdGVtQ2xpY2tJbXBsKGNoYW5nZVBhcmFtVHlwZSwgaW5kZXgsIGlzRGVsZXRlLCBtYXRlcmlhbElkLCBiZ2lkKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub25NYXRlcmlhbFJlcGxhY2VJdGVtQ2xpY2tJbXBsID0gKGNoYW5nZVBhcmFtVHlwZSwgaW5kZXgsIGlzRGVsZXRlLCBtYXRlcmlhbElkID0gJycsIGJnaWQgPSAnJykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICBpZiAobWF0ZXJpYWxJZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxvYWRNYXRlcmlhbFJlcyA9IHlpZWxkIGRlc2lnbi5sb2FkTWF0ZXJpYWwobWF0ZXJpYWxJZCk7XG4gICAgICAgICAgICAgICAgaWYgKCFsb2FkTWF0ZXJpYWxSZXMuaXNTdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghaXNEZWxldGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBtYXRlcmlhbFN0cmluZyA9IGlzRGVsZXRlID8gJycgOiBzdHJpbmdpZnlNYXRlcmlhbCh7IG1hdGVyaWFsSWQsIGJnaWQgfSk7XG4gICAgICAgICAgICBjb25zdCBtYXRlcmlhbE9iamVjdCA9IGlzRGVsZXRlID8gdW5kZWZpbmVkIDogeyBtYXRlcmlhbElkLCBiZ2lkIH07XG4gICAgICAgICAgICBsZXQgcGFyZW50RGVmO1xuICAgICAgICAgICAgY29uc3QgaW5zdGFuY2VQYXRoID0gdGhhdC5lZGl0TW9kZWwgPyBkZXNpZ24uZ2V0RWRpdFBhdGhzVG9Hcm91cEluc3RhbmNlKHRoYXQuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZSkgOiBbXTtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VQYXJhbVR5cGUgPT09IENvbXBvbmVudFBhcmFtVHlwZS5Db21wb25lbnRNYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRoZVNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleCh0aGF0LnNlZ21lbnRzLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoZVNlZ21lbnQgJiYgaW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhaXJQYXJhbVNob3VsZENoYW5nZUtleSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhlU2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwbGF0Zm9ybVNlZ21lbnRzID0gdGhpcy5zZWdtZW50cy5maWx0ZXIoc2VnID0+IHNlZy5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwbGF0Zm9ybVNlZ21lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyUGFyYW1TaG91bGRDaGFuZ2VLZXkgPSAncGxhdGZvcm1NYXRlcmlhbCc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFpclNlZ21lbnRzID0gdGhpcy5zZWdtZW50cy5maWx0ZXIoc2VnID0+IHNlZy5wYXJhbS50eXBlICE9PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGFpclNlZ21lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyUGFyYW1TaG91bGRDaGFuZ2VLZXkgPSAnc3RhaXJNYXRlcmlhbCc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuZHJhd2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhlU2VnbWVudC5wYXJhbS5tYXRlcmlhbCA9IG1hdGVyaWFsT2JqZWN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YWlyUGFyYW1TaG91bGRDaGFuZ2VLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWlyUGFyYW1bc3RhaXJQYXJhbVNob3VsZENoYW5nZUtleV0gPSBtYXRlcmlhbE9iamVjdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuUGFyYW1DaGFuZ2VkQnlEcmF3LCBjb21wb25lbnRQYXJhbTogT2JqZWN0LmFzc2lnbih7fSwgdGhlU2VnbWVudC5wYXJhbSksIHN0YWlyUGFyYW06IHN0YWlyUGFyYW1TaG91bGRDaGFuZ2VLZXkgPyB0aGlzLnN0YWlyUGFyYW0gOiB1bmRlZmluZWQgfSwgJyonKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGF0LmVkaXRNb2RlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50RGVmID0gdGhhdC5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFwYXJlbnREZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVJbnN0YW5jZSA9IHRoYXQuZWRpdE1vZGVsLnN0YWlycy5nZXQoaW5kZXgpIHx8IHRoYXQuZWRpdE1vZGVsLnBsYXRmb3Jtcy5nZXQoaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoZUluc3RhbmNlICYmIGluc3RhbmNlUGF0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wZXJhdGlvblN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICh5aWVsZCBkZXNpZ24uYWN0aXZhdGVFZGl0UGF0aChbLi4uaW5zdGFuY2VQYXRoWzBdLCB0aGF0LmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2VdKSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0RlbGV0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBkZXNpZ24uY2xlYXJNYXRlcmlhbChbdGhlSW5zdGFuY2UuaW5zdGFuY2VdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGRlc2lnbi5hc3NpZ25NYXRlcmlhbEZvckVudGl0aWVzKFt0aGVJbnN0YW5jZS5pbnN0YW5jZV0sIG1hdGVyaWFsSWQsIGJnaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbnN0YW5jZURlZiA9IHRoZUluc3RhbmNlLmluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZURlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBpbnN0YW5jZURlZi5zZXRDdXN0b21Qcm9wZXJ0eShDb21wb25lbnRNYXRlcmlhbEtleSwgbWF0ZXJpYWxTdHJpbmcpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKHlpZWxkIGRlc2lnbi5hY3RpdmF0ZUVkaXRQYXRoKGluc3RhbmNlUGF0aFswXSkpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhaXJQYXJhbVNob3VsZENoYW5nZUtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBwYXJlbnREZWYuc2V0Q3VzdG9tUHJvcGVydHkodGhlU2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtID8gUGxhdGZvcm1NYXRlcmlhbEtleSA6IFN0YWlyTWF0ZXJpYWxLZXksIG1hdGVyaWFsU3RyaW5nKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb25TdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1pdE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGVTZWdtZW50LnBhcmFtLm1hdGVyaWFsID0gbWF0ZXJpYWxPYmplY3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGFpclBhcmFtU2hvdWxkQ2hhbmdlS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWlyUGFyYW1bc3RhaXJQYXJhbVNob3VsZENoYW5nZUtleV0gPSBtYXRlcmlhbE9iamVjdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlBhcmFtQ2hhbmdlZEJ5RHJhdywgY29tcG9uZW50UGFyYW06IE9iamVjdC5hc3NpZ24oe30sIHRoZVNlZ21lbnQucGFyYW0pLCBzdGFpclBhcmFtOiBzdGFpclBhcmFtU2hvdWxkQ2hhbmdlS2V5ID8gdGhpcy5zdGFpclBhcmFtIDogdW5kZWZpbmVkIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYm9ydE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoYW5nZVBhcmFtVHlwZSA9PT0gQ29tcG9uZW50UGFyYW1UeXBlLlN0YWlyTWF0ZXJpYWwgfHwgY2hhbmdlUGFyYW1UeXBlID09PSBDb21wb25lbnRQYXJhbVR5cGUuUGxhdGZvcm1NYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgIGlmICghdGhhdC5lZGl0TW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZVBhcmFtVHlwZSA9PT0gQ29tcG9uZW50UGFyYW1UeXBlLlN0YWlyTWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc3RhaXJQYXJhbS5zdGFpck1hdGVyaWFsID0gbWF0ZXJpYWxPYmplY3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHNlZ21lbnQgb2YgdGhpcy5zZWdtZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWdtZW50LnBhcmFtLnR5cGUgIT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5wYXJhbS5tYXRlcmlhbCA9IG1hdGVyaWFsT2JqZWN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc3RhaXJQYXJhbS5wbGF0Zm9ybU1hdGVyaWFsID0geyBtYXRlcmlhbElkLCBiZ2lkIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHNlZ21lbnQgb2YgdGhpcy5zZWdtZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5wYXJhbS5tYXRlcmlhbCA9IG1hdGVyaWFsT2JqZWN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlN0YWlyUGFyYW1DaGFuZ2VkQnlEcmF3LCBzdGFpclBhcmFtOiB0aGF0LnN0YWlyUGFyYW0sIGNvbXBvbmVudFBhcmFtczogdGhpcy5zZWdtZW50cy5tYXAoc2VnID0+IChPYmplY3QuYXNzaWduKHt9LCBzZWcucGFyYW0pKSkgfSwgJyonKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaW5zdGFuY2VQYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudERlZiA9IHRoYXQuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwYXJlbnREZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzdGFydE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgb3BlcmF0aW9uU3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICh5aWVsZCBkZXNpZ24uYWN0aXZhdGVFZGl0UGF0aChbLi4uaW5zdGFuY2VQYXRoWzBdLCB0aGF0LmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2VdKSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21wb25lbnRzID0gY2hhbmdlUGFyYW1UeXBlID09PSBDb21wb25lbnRQYXJhbVR5cGUuU3RhaXJNYXRlcmlhbCA/IHRoYXQuZWRpdE1vZGVsLnN0YWlycyA6IHRoYXQuZWRpdE1vZGVsLnBsYXRmb3JtcztcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlU2VnbWVudHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29tcG9uZW50SW5zdGFuY2VzID0gW107XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgW2luZCwgaW5zdGFuY2VEYXRhXSBvZiBjb21wb25lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgodGhhdC5zZWdtZW50cywgaW5kKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGVTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50SW5zdGFuY2VzLnB1c2goaW5zdGFuY2VEYXRhLmluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGVTZWdtZW50cy5wdXNoKHRoZVNlZ21lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0RlbGV0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZGVzaWduLmNsZWFyTWF0ZXJpYWwoY29tcG9uZW50SW5zdGFuY2VzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGRlc2lnbi5hc3NpZ25NYXRlcmlhbEZvckVudGl0aWVzKGNvbXBvbmVudEluc3RhbmNlcywgbWF0ZXJpYWxJZCwgYmdpZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBjb21wb25lbnRJbnN0YW5jZSBvZiBjb21wb25lbnRJbnN0YW5jZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudERlZiA9IGNvbXBvbmVudEluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudERlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGNvbXBvbmVudERlZi5zZXRDdXN0b21Qcm9wZXJ0eShDb21wb25lbnRNYXRlcmlhbEtleSwgbWF0ZXJpYWxTdHJpbmcpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAoeWllbGQgZGVzaWduLmFjdGl2YXRlRWRpdFBhdGgoaW5zdGFuY2VQYXRoWzBdKSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBwYXJlbnREZWYuc2V0Q3VzdG9tUHJvcGVydHkoY2hhbmdlUGFyYW1UeXBlID09PSBDb21wb25lbnRQYXJhbVR5cGUuU3RhaXJNYXRlcmlhbCA/IFN0YWlyTWF0ZXJpYWxLZXkgOiBQbGF0Zm9ybU1hdGVyaWFsS2V5LCBtYXRlcmlhbFN0cmluZykuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWl0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlUGFyYW1UeXBlID09PSBDb21wb25lbnRQYXJhbVR5cGUuU3RhaXJNYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc3RhaXJQYXJhbS5zdGFpck1hdGVyaWFsID0gbWF0ZXJpYWxPYmplY3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBzZWdtZW50IG9mIHRoZVNlZ21lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQucGFyYW0ubWF0ZXJpYWwgPSBtYXRlcmlhbE9iamVjdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnN0YWlyUGFyYW0ucGxhdGZvcm1NYXRlcmlhbCA9IG1hdGVyaWFsT2JqZWN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgc2VnbWVudCBvZiB0aGVTZWdtZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50LnBhcmFtLm1hdGVyaWFsID0gbWF0ZXJpYWxPYmplY3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5TdGFpclBhcmFtQ2hhbmdlZEJ5RHJhdywgc3RhaXJQYXJhbTogdGhhdC5zdGFpclBhcmFtLCBjb21wb25lbnRQYXJhbXM6IHRoaXMuc2VnbWVudHMubWFwKHNlZyA9PiAoT2JqZWN0LmFzc2lnbih7fSwgc2VnLnBhcmFtKSkpIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhYm9ydE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2hhbmdlUGFyYW1UeXBlID09PSBDb21wb25lbnRQYXJhbVR5cGUuSGFuZHJhaWxSYWlsTWF0ZXJpYWwgfHwgY2hhbmdlUGFyYW1UeXBlID09PSBDb21wb25lbnRQYXJhbVR5cGUuSGFuZHJhaWxDb2x1bW5NYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgIGlmICghdGhhdC5lZGl0TW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZVBhcmFtVHlwZSA9PT0gQ29tcG9uZW50UGFyYW1UeXBlLkhhbmRyYWlsUmFpbE1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnN0YWlyUGFyYW0uaGFuZHJhaWwucmFpbC5tYXRlcmlhbCA9IG1hdGVyaWFsT2JqZWN0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zdGFpclBhcmFtLmhhbmRyYWlsLmNvbHVtbi5tYXRlcmlhbCA9IG1hdGVyaWFsT2JqZWN0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuU3RhaXJQYXJhbUNoYW5nZWRCeURyYXcsIHN0YWlyUGFyYW06IHRoYXQuc3RhaXJQYXJhbSB9LCAnKicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpbnN0YW5jZVBhdGggJiYgdGhhdC5lZGl0TW9kZWwuaGFuZHJhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50RGVmID0gdGhhdC5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXBhcmVudERlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBvcGVyYXRpb25TdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKHlpZWxkIGRlc2lnbi5hY3RpdmF0ZUVkaXRQYXRoKFsuLi5pbnN0YW5jZVBhdGhbMF0sIHRoYXQuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZSwgdGhhdC5lZGl0TW9kZWwuaGFuZHJhaWwuaGFuZHJhaWxJbnN0YW5jZS5pbnN0YW5jZV0pKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudHMgPSBjaGFuZ2VQYXJhbVR5cGUgPT09IENvbXBvbmVudFBhcmFtVHlwZS5IYW5kcmFpbFJhaWxNYXRlcmlhbCA/IHRoYXQuZWRpdE1vZGVsLmhhbmRyYWlsLnJhaWxJbnN0YW5jZXMgOiB0aGF0LmVkaXRNb2RlbC5oYW5kcmFpbC5jb2x1bW5JbnN0YW5jZXM7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0RlbGV0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZGVzaWduLmNsZWFyTWF0ZXJpYWwoWy4uLmNvbXBvbmVudHMudmFsdWVzKCldLm1hcChjID0+IGMuaW5zdGFuY2UpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGRlc2lnbi5hc3NpZ25NYXRlcmlhbEZvckVudGl0aWVzKFsuLi5jb21wb25lbnRzLnZhbHVlcygpXS5tYXAoYyA9PiBjLmluc3RhbmNlKSwgbWF0ZXJpYWxJZCwgYmdpZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKHlpZWxkIGRlc2lnbi5hY3RpdmF0ZUVkaXRQYXRoKGluc3RhbmNlUGF0aFswXSkpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgcGFyZW50RGVmLnNldEN1c3RvbVByb3BlcnR5KGNoYW5nZVBhcmFtVHlwZSA9PT0gQ29tcG9uZW50UGFyYW1UeXBlLkhhbmRyYWlsUmFpbE1hdGVyaWFsID8gUmFpbE1hdGVyaWFsS2V5IDogQ29sdW1uTWF0ZXJpYWxLZXksIG1hdGVyaWFsU3RyaW5nKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb25TdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21taXRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VQYXJhbVR5cGUgPT09IENvbXBvbmVudFBhcmFtVHlwZS5IYW5kcmFpbFJhaWxNYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc3RhaXJQYXJhbS5oYW5kcmFpbC5yYWlsLm1hdGVyaWFsID0gbWF0ZXJpYWxPYmplY3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnN0YWlyUGFyYW0uaGFuZHJhaWwuY29sdW1uLm1hdGVyaWFsID0gbWF0ZXJpYWxPYmplY3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlN0YWlyUGFyYW1DaGFuZ2VkQnlEcmF3LCBzdGFpclBhcmFtOiB0aGF0LnN0YWlyUGFyYW0gfSwgJyonKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFib3J0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvblRvb2xBY3RpdmUoKSB7XG4gICAgICAgIGxvYWREZWZhdWx0TWF0ZXJpYWxzKCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCh3aW5kb3cgYXMgYW55KS5vcmlnaW4pO1xuICAgICAgICAvLyB0b29sSGVscGVyLnNldEV4Y2x1ZGVJbmZlcmVuY2VUeXBlcyhbXG4gICAgICAgIC8vICAgICBLRW50aXR5VHlwZS5GYWNlLCBLRW50aXR5VHlwZS5FZGdlLCBLRW50aXR5VHlwZS5BdXhpbGlhcnlCb3VuZGVkQ3VydmUsIEtFbnRpdHlUeXBlLkF1eGlsaWFyeUxpbmUsIEtFbnRpdHlUeXBlLkF1eGlsaWFyeVZlcnRleCxcbiAgICAgICAgLy8gICAgIEtFbnRpdHlUeXBlLkdyb3VwSW5zdGFuY2UsIEtFbnRpdHlUeXBlLlZlcnRleCwgS0FyY2hGYWNlVHlwZS5Ob25QbGFuYXIsIEtBcmNoRmFjZVR5cGUuUGxhbmFyLFxuICAgICAgICAvLyBdKTtcbiAgICAgICAgY29uc3QgZmlyc3RTZWdtZW50ID0gZ2V0TmV3U2VnbWVudChDYWNoZVNldHRpbmdzLnN0YWlyVHlwZSwgdW5kZWZpbmVkLCB0aGlzLnN0YWlyUGFyYW0udXB3YXJkKTtcbiAgICAgICAgZmlyc3RTZWdtZW50LnN0YXJ0TG9ja2VkID0gZmFsc2U7XG4gICAgICAgIC8vIHRoaXMuc3RhaXJQYXJhbSA9IERlZmF1bHRTdGFpclBhcmFtO1xuICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLkRyYXdTdGFpck1vZGVsU2V0dGxlZCwgY29tcG9uZW50UGFyYW1zOiBbZmlyc3RTZWdtZW50LnBhcmFtXSwgc3RhaXJQYXJhbTogdGhpcy5zdGFpclBhcmFtLCBuZXdTdGFpcjogdHJ1ZSwgaXNEcmF3aW5nOiB0cnVlIH0sICcqJyk7XG4gICAgICAgIHRoaXMuc2VnbWVudHMgPSBbZmlyc3RTZWdtZW50XTtcbiAgICAgICAgdGhpcy5kcmF3aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jbGVhclRlbXBTaGFwZXMoKTtcbiAgICAgICAgdGhpcy5lZGl0TW9kZWwgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4ID0gMDtcbiAgICB9XG4gICAgb25Ub29sRGVhY3RpdmUoKSB7XG4gICAgICAgIHRvb2xIZWxwZXIuc2V0RXhjbHVkZUluZmVyZW5jZVR5cGVzKFtdKTtcbiAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICBpZiAodGhpcy5lZGl0TW9kZWwpIHtcbiAgICAgICAgICAgIHNlbGVjdGlvbi5hZGQoW3RoaXMuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZV0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5MZWF2ZURyYXdTdGFpcnNUb29sIH0sICcqJyk7XG4gICAgICAgIH1cbiAgICAgICAgZGVBY3RpdmF0ZURyYXdTdGFpcnNUb29sKCk7XG4gICAgfVxuICAgIG9uTW91c2VNb3ZlKGV2ZW50LCBpbmZlcmVuY2VSZXN1bHQpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ29uTW91c2VNb3ZlJyk7XG4gICAgICAgIGlmIChpbmZlcmVuY2VSZXN1bHQpIHtcbiAgICAgICAgICAgIC8vIGNvbnN0IHsgc3RhcnRXaWR0aCwgZW5kV2lkdGgsIHBsYXRmb3JtVGhpY2tuZXNzIH0gPSB0aGlzLmNvbXBvbmVudFBhcmFtO1xuICAgICAgICAgICAgY29uc3QgcG9zaXRpb24gPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QoaW5mZXJlbmNlUmVzdWx0LnBvc2l0aW9uLngsIGluZmVyZW5jZVJlc3VsdC5wb3NpdGlvbi55LCAwKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RTZWdtZW50ID0gdGhpcy5zZWdtZW50c1t0aGlzLnNlZ21lbnRzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdsYXN0U2VnbWVudC5zdGFydExvY2tlZCcsIGxhc3RTZWdtZW50LnN0YXJ0TG9ja2VkKTtcbiAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5wYXJhbS5tb2RlbEVkaXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAobGFzdFNlZ21lbnQuc3RhcnRMb2NrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuZW5kID0gcG9zaXRpb247XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBDb21wb25lbnQobGFzdFNlZ21lbnQsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlZ21lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByZXZTZWdtZW50ID0gdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggPT09IGxhc3RTZWdtZW50LnBhcmFtLmluZGV4ID8gdGhpcy5zZWdtZW50c1t0aGlzLnNlZ21lbnRzLmxlbmd0aCAtIDJdIDogZ2V0U2VnbWVudEJ5SW5kZXgodGhpcy5zZWdtZW50cywgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbXVzdCBiZSB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHByZXZTZWdtZW50ID09PSBudWxsIHx8IHByZXZTZWdtZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwcmV2U2VnbWVudC5wYXJhbS50eXBlKSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgbW9sZFNoYXBlOiB7IHZlcnRpY2VzLCB0ZW1wTGluZXMgfSB9ID0gcHJldlNlZ21lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCgoX2EgPSBsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGluZTNkSW5kZXgpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldlNlZ21lbnQubmV4dENvbXBvbmVudHMuZm9yRWFjaChpbmRzID0+IGluZHMuZGVsZXRlKGxhc3RTZWdtZW50LnBhcmFtLmluZGV4KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjbG9zZXN0UG9pbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1pbkRpc3RhbmNlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZXMuZm9yRWFjaCgobGluZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3Qgc3RhcnRJbmQgPSBjb21wb25lbnREaXJlY3Rpb25UeXBlID09PSBDb21wb25lbnREaXJlY3Rpb25UeXBlLlJpZ2h0RnJvbnQgJiYgdGVtcExpbmVzLmxlbmd0aCA+IDQgPyAxIDogMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGluZGV4ID09PSBzdGFydEluZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVTZWczZCA9IEdlb21MaWIuY3JlYXRlTGluZVNlZ21lbnQzZCh2ZXJ0aWNlc1tsaW5lWzBdXSwgdmVydGljZXNbbGluZVsxXV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVQb2ludCA9IGxpbmVTZWczZC5nZXRDbG9zZXN0UG9pbnQocG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJEaXN0YW5jZSA9IHRoZVBvaW50LmRpc3RhbmNlVG8ocG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNsb3Nlc3RQb2ludCB8fCBjdXJEaXN0YW5jZSA8IG1pbkRpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5EaXN0YW5jZSA9IGN1ckRpc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFBvaW50ID0gdGhlUG9pbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5zdGFydCA9IGNsb3Nlc3RQb2ludDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxhc3RTZWdtZW50LmJhc2VMaW5lU2VnM2QgPSB7IHN0YXJ0OiB2ZXJ0aWNlc1tsaW5lWzBdXSwgZW5kOiB2ZXJ0aWNlc1tsaW5lWzFdXSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudCA9IHsgY29tcG9uZW50SW5kZXg6IHByZXZTZWdtZW50LnBhcmFtLmluZGV4LCBsaW5lM2RJbmRleDogaW5kZXgsIGxpbmUzZDogeyBzdGFydDogdmVydGljZXNbbGluZVswXV0sIGVuZDogdmVydGljZXNbbGluZVsxXV0gfSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgcHJldlNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleCh0aGlzLnNlZ21lbnRzLCBsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKChfYiA9IGxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5saW5lM2RJbmRleCkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2U2VnbWVudC5uZXh0Q29tcG9uZW50c1tsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50LmxpbmUzZEluZGV4XS5hZGQobGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdQaWNrU3RhcnRUZW1wU2hhcGVzKHBvc2l0aW9uLCBsYXN0U2VnbWVudC5zdGFydCwgbGFzdFNlZ21lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuc3RhcnQgPSBwb3NpdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobGFzdFNlZ21lbnQucGFyYW0udHlwZSA9PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtICYmICFsYXN0U2VnbWVudC5wYXJhbS5wbGF0Zm9ybUxlbmd0aExvY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlBhcmFtQ2hhbmdlZEJ5RHJhdywgY29tcG9uZW50UGFyYW06IE9iamVjdC5hc3NpZ24oe30sIGxhc3RTZWdtZW50LnBhcmFtKSB9LCAnKicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBvbkxCdXR0b25VcChldmVudCwgaW5mZXJlbmNlUmVzdWx0KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ29uTEJ1dHRvblVwJyk7XG4gICAgICAgIGlmIChpbmZlcmVuY2VSZXN1bHQpIHtcbiAgICAgICAgICAgIC8vIGNvbnN0IHBvc2l0aW9uID0gaW5mZXJlbmNlUmVzdWx0LnBvc2l0aW9uO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VnbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdFNlZ21lbnQgPSB0aGlzLnNlZ21lbnRzW3RoaXMuc2VnbWVudHMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgaWYgKGxhc3RTZWdtZW50LnN0YXJ0TG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwdXNoIHNlZ21lbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBzdGFydCwgZW5kLCBwYXJhbTogeyB0eXBlIH0sIGNpcmNsZVRhbmdlbnQgfSA9IGxhc3RTZWdtZW50O1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5DaXJjdWxhclN0YWlyICYmICFjaXJjbGVUYW5nZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5jaXJjbGVUYW5nZW50ID0gZW5kLnN1YnRyYWN0ZWQoc3RhcnQpLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNDb21wb25lbnQobGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuZW5kTG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RQYXJhbSA9IGxhc3RTZWdtZW50LnBhcmFtO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RQYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLkNpcmN1bGFyU3RhaXIgJiYgbGFzdFNlZ21lbnQuY2lyY3VsYXJTaWRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0UGFyYW0udHlwZSA9IENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5jaXJjbGVUYW5nZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dFR5cGUgPSBsYXN0UGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSA/IENhY2hlU2V0dGluZ3Muc3RhaXJUeXBlIDogQ29tcG9uZW50VHlwZS5QbGF0Zm9ybTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRTZWdtZW50ID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBnZXROZXdTZWdtZW50KG5leHRUeXBlLCBsYXN0U2VnbWVudCwgdGhpcy5zdGFpclBhcmFtLnVwd2FyZCkpLCB7IHN0YXJ0OiBsYXN0U2VnbWVudC5lbmQsIGVuZDogbGFzdFNlZ21lbnQuZW5kLCBzdGFydExvY2tlZDogbGFzdFBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gPyBmYWxzZSA6IHRydWUsIHN0YXJ0SGVpZ2h0OiBsYXN0U2VnbWVudC5lbmRIZWlnaHQsIGVuZEhlaWdodDogbGFzdFNlZ21lbnQuZW5kSGVpZ2h0IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBtb2xkU2hhcGU6IHsgdmVydGljZXMsIHRlbXBMaW5lcyB9IH0gPSBsYXN0U2VnbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxhc3RTZWdtZW50LmJhc2VMaW5lU2VnM2QgPSB7IHN0YXJ0OiB2ZXJ0aWNlc1swXSwgZW5kOiB2ZXJ0aWNlc1sxXSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQgPSB7IGxpbmUzZDogeyBzdGFydDogdmVydGljZXNbMV0sIGVuZDogdmVydGljZXNbMF0gfSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFzZVNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleCh0aGlzLnNlZ21lbnRzLCBsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmFzZVNlZ21lbnQgJiYgKChfYSA9IGxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5saW5lM2RJbmRleCkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXNlU2VnbWVudC5uZXh0Q29tcG9uZW50c1tsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50LmxpbmUzZEluZGV4XS5hZGQobGFzdFBhcmFtLmluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXh0U2VnbWVudC5iYXNlTGluZVNlZzNkID0geyBzdGFydDogdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0sIGVuZDogdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0gfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0U2VnbWVudC5zdGFydExvY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50Lm5leHRDb21wb25lbnRzWzBdLmFkZChuZXh0U2VnbWVudC5wYXJhbS5pbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0U2VnbWVudC5iYXNlQ29tcG9uZW50ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudEluZGV4OiBsYXN0UGFyYW0uaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZTNkSW5kZXg6IGxhc3RQYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtID8gdGVtcExpbmVzLmxlbmd0aCAtIDEgOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUzZDogeyBzdGFydDogdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0sIGVuZDogdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0gfVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RQYXJhbS5tb2RlbEVkaXRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5QYXJhbUNoYW5nZWRCeURyYXcsIGNvbXBvbmVudFBhcmFtOiBsYXN0UGFyYW0gfSwgJyonKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VnbWVudHMucHVzaChuZXh0U2VnbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggIT09IGxhc3RQYXJhbS5pbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvY3VzZWRTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgodGhpcy5zZWdtZW50cywgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb2N1c2VkU2VnbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdUZW1wQ29tcG9uZW50KGZvY3VzZWRTZWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCA9IG5leHRTZWdtZW50LnBhcmFtLmluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5Db21wb25lbnRBZGRlZCwgY29tcG9uZW50UGFyYW06IE9iamVjdC5hc3NpZ24oe30sIG5leHRTZWdtZW50LnBhcmFtKSB9LCAnKicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5zdGFydExvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJQaWNrU3RhcnRUZW1wU2hhcGVzKGxhc3RTZWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3VGVtcENvbXBvbmVudChsYXN0U2VnbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCAhPT0gbGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuRm9jdXNDb21wb25lbnRJbmRleEJ5RHJhdywgZm9jdXNlZENvbXBvbmVudEluZGV4OiBsYXN0U2VnbWVudC5wYXJhbS5pbmRleCB9LCAnKicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNDb21wb25lbnQobGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBvblJCdXR0b25VcChldmVudCwgaW5mZXJlbmNlUmVzdWx0KSB7XG4gICAgICAgIGlmICh0aGlzLnNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgbGFzdFNlZ21lbnQgPSB0aGlzLnNlZ21lbnRzW3RoaXMuc2VnbWVudHMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBpZiAoIWxhc3RTZWdtZW50LnN0YXJ0TG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWdtZW50cyA9IHRoaXMuc2VnbWVudHMuc2xpY2UoMCwgdGhpcy5zZWdtZW50cy5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGxhc3RTZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpciAmJiBsYXN0U2VnbWVudC5jaXJjdWxhclNpZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LnBhcmFtLnR5cGUgPSBDb21wb25lbnRUeXBlLlN0cmFpZ2h0U3RhaXI7XG4gICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuY2lyY2xlVGFuZ2VudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgcGFyYW0sIGNpcmN1bGFyU2lkZSwgbW9sZFNoYXBlOiB7IHZlcnRpY2VzIH0gfSA9IGxhc3RTZWdtZW50O1xuICAgICAgICAgICAgICAgIGlmICghbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBsYXN0U2VnbWVudC5iYXNlTGluZVNlZzNkID0geyBzdGFydDogdmVydGljZXNbMF0sIGVuZDogdmVydGljZXNbMV0gfTtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudCA9IHsgbGluZTNkOiB7IHN0YXJ0OiB2ZXJ0aWNlc1sxXSwgZW5kOiB2ZXJ0aWNlc1swXSB9IH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLkNpcmN1bGFyU3RhaXIgJiYgY2lyY3VsYXJTaWRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0udHlwZSA9IENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpcjtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuY2lyY2xlVGFuZ2VudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy50cnlDb21taXQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZGVBY3RpdmF0ZURyYXdTdGFpcnNUb29sKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZHJhd1BpY2tTdGFydFRlbXBTaGFwZXMocG9zaXRpb24sIGNsb3Nlc3RQb2ludCwgdGhlU2VnbWVudCkge1xuICAgICAgICBpZiAodGhlU2VnbWVudC5waWNrU3RhcnRUZW1wU2hhcGVJZCkge1xuICAgICAgICAgICAgYXBwVmlldy5jbGVhclRlbXBvcmFyeVNoYXBlc0J5SWRzKFt0aGVTZWdtZW50LnBpY2tTdGFydFRlbXBTaGFwZUlkXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNsb3Nlc3RQb2ludCkge1xuICAgICAgICAgICAgY29uc3QgcGlja1N0YXJ0VGVtcFNoYXBlSWQgPSBhcHBWaWV3LmRyYXdMaW5lcyhbcG9zaXRpb24sIGNsb3Nlc3RQb2ludF0sIHsgY29sb3I6IFRlbXBMaW5lQ29sb3JzLkluZmVyZW5jZSwgZGVwdGhUZXN0OiBmYWxzZSwgcGF0dGVybjogVGVtcExpbmVQYXR0ZXJucy5JbmZlcmVuY2UsIGdhcFNpemU6IDUwLCBkYXNoU2l6ZTogNTAgfSk7XG4gICAgICAgICAgICBpZiAocGlja1N0YXJ0VGVtcFNoYXBlSWQgPT09IG51bGwgfHwgcGlja1N0YXJ0VGVtcFNoYXBlSWQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBpY2tTdGFydFRlbXBTaGFwZUlkLmlkKSB7XG4gICAgICAgICAgICAgICAgdGhlU2VnbWVudC5waWNrU3RhcnRUZW1wU2hhcGVJZCA9IHBpY2tTdGFydFRlbXBTaGFwZUlkLmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNsZWFyUGlja1N0YXJ0VGVtcFNoYXBlcyh0aGVTZWdtZW50KSB7XG4gICAgICAgIGlmICh0aGVTZWdtZW50LnBpY2tTdGFydFRlbXBTaGFwZUlkKSB7XG4gICAgICAgICAgICBhcHBWaWV3LmNsZWFyVGVtcG9yYXJ5U2hhcGVzQnlJZHMoW3RoZVNlZ21lbnQucGlja1N0YXJ0VGVtcFNoYXBlSWRdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkcmF3VGVtcENvbXBvbmVudCh0aGVTZWdtZW50LCBmb2N1c2VkID0gZmFsc2UsIGRyYXdIYW5kcmFpbCA9IGZhbHNlKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGlmICh0aGVTZWdtZW50LnN0YXJ0TG9ja2VkKSB7XG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlU2VnbWVudFNoYXBlKHRoZVNlZ21lbnQsIHRoaXMuZHJhd2luZyk7XG4gICAgICAgICAgICBjb25zdCB7IHN0YWlyU2hhcGU6IHsgdmVydGljZXM6IHN0YWlyVmVydGljZXMsIHRlbXBMaW5lczogc3RhaXJUZW1wTGluZXMgfSwgbW9sZFNoYXBlOiB7IHZlcnRpY2VzOiBtb2xkVmVydGljZXMsIHRlbXBMaW5lczogbW9sZFRlbXBMaW5lcyB9LCBjb3JuZXJTaGFwZTogeyB2ZXJ0aWNlczogY29ybmVyVmVydGljZXMsIHRlbXBMaW5lczogY29ybmVyVGVtcExpbmVzIH0sIGNvcm5lck1vbGRTaGFwZTogeyB2ZXJ0aWNlczogY29ybmVyTW9sZFZlcnRpY2VzLCB0ZW1wTGluZXM6IGNvcm5lck1vbGRUZW1wTGluZXMgfSwgfSA9IHRoZVNlZ21lbnQ7XG4gICAgICAgICAgICBjb25zdCB0ZW1wTGluZVBvaW50cyA9IFtdO1xuICAgICAgICAgICAgY29uc3QgbW9sZFRlbXBMaW5lUG9pbnRzID0gW107XG4gICAgICAgICAgICBpZiAodGhpcy5kcmF3aW5nKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBzdGFpclRlbXBMaW5lIG9mIHN0YWlyVGVtcExpbmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lUG9pbnRzLnB1c2goW3N0YWlyVmVydGljZXNbc3RhaXJUZW1wTGluZVswXV0sIHN0YWlyVmVydGljZXNbc3RhaXJUZW1wTGluZVsxXV1dKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBjb3JuZXJUZW1wTGluZSBvZiBjb3JuZXJUZW1wTGluZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVQb2ludHMucHVzaChbY29ybmVyVmVydGljZXNbY29ybmVyVGVtcExpbmVbMF1dLCBjb3JuZXJWZXJ0aWNlc1tjb3JuZXJUZW1wTGluZVsxXV1dKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG1vbGRUZW1wTGluZSBvZiBtb2xkVGVtcExpbmVzKSB7XG4gICAgICAgICAgICAgICAgbW9sZFRlbXBMaW5lUG9pbnRzLnB1c2goW21vbGRWZXJ0aWNlc1ttb2xkVGVtcExpbmVbMF1dLCBtb2xkVmVydGljZXNbbW9sZFRlbXBMaW5lWzFdXV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCBjb3JuZXJNb2xkVGVtcExpbmUgb2YgY29ybmVyTW9sZFRlbXBMaW5lcykge1xuICAgICAgICAgICAgICAgIG1vbGRUZW1wTGluZVBvaW50cy5wdXNoKFtjb3JuZXJNb2xkVmVydGljZXNbY29ybmVyTW9sZFRlbXBMaW5lWzBdXSwgY29ybmVyTW9sZFZlcnRpY2VzW2Nvcm5lck1vbGRUZW1wTGluZVsxXV1dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgoX2EgPSB0aGVTZWdtZW50LnRlbXBTaGFwZUlkKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgYXBwVmlldy5jbGVhclRlbXBvcmFyeVNoYXBlc0J5SWRzKHRoZVNlZ21lbnQudGVtcFNoYXBlSWQpO1xuICAgICAgICAgICAgICAgIHRoZVNlZ21lbnQudGVtcFNoYXBlSWQgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0ZW1wTGluZVBvaW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFpckNvbG9yID0gZm9jdXNlZCA/IFRlbXBMaW5lQ29sb3JzLkZvY3VzIDogVGVtcExpbmVDb2xvcnMuU3RhaXI7XG4gICAgICAgICAgICAgICAgY29uc3QgdGVtcFNoYXBlSWQgPSBhcHBWaWV3LmRyYXdQb2x5bGluZXModGVtcExpbmVQb2ludHMsIHsgY29sb3I6IHN0YWlyQ29sb3IsIGRlcHRoVGVzdDogZmFsc2UsIHBhdHRlcm46IFRlbXBMaW5lUGF0dGVybnMuU3RhaXJBbmRNb2xkIH0pO1xuICAgICAgICAgICAgICAgIGlmICh0ZW1wU2hhcGVJZCA9PT0gbnVsbCB8fCB0ZW1wU2hhcGVJZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogdGVtcFNoYXBlSWQuaWRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoZVNlZ21lbnQudGVtcFNoYXBlSWQgPSBbLi4udGVtcFNoYXBlSWQuaWRzXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobW9sZFRlbXBMaW5lUG9pbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vbGRDb2xvciA9IGZvY3VzZWQgPyBUZW1wTGluZUNvbG9ycy5Gb2N1cyA6IFRlbXBMaW5lQ29sb3JzLk1vbGQ7XG4gICAgICAgICAgICAgICAgY29uc3QgbW9sZFRlbXBTaGFwZUlkID0gYXBwVmlldy5kcmF3UG9seWxpbmVzKG1vbGRUZW1wTGluZVBvaW50cywgeyBjb2xvcjogbW9sZENvbG9yLCBkZXB0aFRlc3Q6IHRoaXMuZHJhd2luZywgcGF0dGVybjogVGVtcExpbmVQYXR0ZXJucy5TdGFpckFuZE1vbGQgfSk7XG4gICAgICAgICAgICAgICAgaWYgKG1vbGRUZW1wU2hhcGVJZCA9PT0gbnVsbCB8fCBtb2xkVGVtcFNoYXBlSWQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1vbGRUZW1wU2hhcGVJZC5pZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChfYiA9IHRoZVNlZ21lbnQudGVtcFNoYXBlSWQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoZVNlZ21lbnQudGVtcFNoYXBlSWQucHVzaCguLi5tb2xkVGVtcFNoYXBlSWQuaWRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoZVNlZ21lbnQudGVtcFNoYXBlSWQgPSBbLi4ubW9sZFRlbXBTaGFwZUlkLmlkc107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZHJhd0hhbmRyYWlsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3SGFuZHJhaWxzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZHJhd0hhbmRyYWlscyhzdGFpclBhcmFtID0gdGhpcy5zdGFpclBhcmFtKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGNvbnN0IHByZXZIYW5kcmFpbFRlbXBTaGFwZUlkcyA9IChfYSA9IHRoaXMuaGFuZHJhaWxDb2xsZWN0aW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudGVtcFNoYXBlSWQ7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVIYW5kcmFpbFNoYXBlKHN0YWlyUGFyYW0pO1xuICAgICAgICBpZiAocHJldkhhbmRyYWlsVGVtcFNoYXBlSWRzID09PSBudWxsIHx8IHByZXZIYW5kcmFpbFRlbXBTaGFwZUlkcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcHJldkhhbmRyYWlsVGVtcFNoYXBlSWRzLmxlbmd0aCkge1xuICAgICAgICAgICAgYXBwVmlldy5jbGVhclRlbXBvcmFyeVNoYXBlc0J5SWRzKHByZXZIYW5kcmFpbFRlbXBTaGFwZUlkcyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaGFuZHJhaWxzID0gKF9iID0gdGhpcy5oYW5kcmFpbENvbGxlY3Rpb24pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5oYW5kcmFpbHM7XG4gICAgICAgIGNvbnN0IHRlbXBMaW5lUG9pbnRzID0gW107XG4gICAgICAgIGlmICh0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbiAmJiAoaGFuZHJhaWxzID09PSBudWxsIHx8IGhhbmRyYWlscyA9PT0gdm9pZCAwID8gdm9pZCAwIDogaGFuZHJhaWxzLmxlbmd0aCkpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgeyByYWlsLCBjb2x1bW5zIH0gb2YgaGFuZHJhaWxzKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByYWlsLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByYWlsUG9pbnQgPSByYWlsW2ldO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByYWlsTmV4dFBvaW50ID0gcmFpbFtpICsgMV07XG4gICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lUG9pbnRzLnB1c2goW3JhaWxQb2ludCwgcmFpbE5leHRQb2ludF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0ZW1wTGluZVBvaW50cy5wdXNoKC4uLmNvbHVtbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaGFuZHJhaWxUZW1wU2hhcGVJZHMgPSBhcHBWaWV3LmRyYXdQb2x5bGluZXModGVtcExpbmVQb2ludHMsIHsgY29sb3I6IFRlbXBMaW5lQ29sb3JzLkhhbmRyYWlsLCBkZXB0aFRlc3Q6IGZhbHNlLCBwYXR0ZXJuOiBUZW1wTGluZVBhdHRlcm5zLkhhbmRyYWlsIH0pO1xuICAgICAgICAgICAgaWYgKGhhbmRyYWlsVGVtcFNoYXBlSWRzID09PSBudWxsIHx8IGhhbmRyYWlsVGVtcFNoYXBlSWRzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBoYW5kcmFpbFRlbXBTaGFwZUlkcy5pZHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbi50ZW1wU2hhcGVJZCA9IGhhbmRyYWlsVGVtcFNoYXBlSWRzLmlkcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjbGVhclRlbXBTaGFwZXModGhlU2VnbWVudCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICh0aGVTZWdtZW50KSB7XG4gICAgICAgICAgICBpZiAoKF9hID0gdGhlU2VnbWVudC50ZW1wU2hhcGVJZCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGFwcFZpZXcuY2xlYXJUZW1wb3JhcnlTaGFwZXNCeUlkcyh0aGVTZWdtZW50LnRlbXBTaGFwZUlkKTtcbiAgICAgICAgICAgICAgICB0aGVTZWdtZW50LnRlbXBTaGFwZUlkID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhcHBWaWV3LmNsZWFyVGVtcG9yYXJ5U2hhcGVzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9jdXNDb21wb25lbnQoY29tcG9uZW50SW5kZXgpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgIGlmIChjb21wb25lbnRJbmRleCA9PT0gdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RTZWdtZW50ID0gdGhpcy5zZWdtZW50c1t0aGlzLnNlZ21lbnRzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgY29uc3QgbGFzdFNlZ21lbnRJbmRleCA9IGxhc3RTZWdtZW50LnBhcmFtLmluZGV4O1xuICAgICAgICAgICAgLy8gaWYgKGNvbXBvbmVudEluZGV4ICE9PSB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCkge1xuICAgICAgICAgICAgY29uc3QgbmV3Rm9jdXNlZFNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleCh0aGlzLnNlZ21lbnRzLCBjb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICBjb25zdCBvbGRGb2N1c2VkU2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHRoaXMuc2VnbWVudHMsIHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgIGlmIChuZXdGb2N1c2VkU2VnbWVudCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYXdpbmcgJiYgIWxhc3RTZWdtZW50LmVuZExvY2tlZCAmJiBjb21wb25lbnRJbmRleCAhPT0gbGFzdFNlZ21lbnRJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHBhcmFtOiB7IHR5cGU6IG5ld0ZvY3VzZWRUeXBlIH0sIG1vbGRTaGFwZTogeyB2ZXJ0aWNlczogbmV3Rm9jdXNlZFZlcnRpY2VzLCB0ZW1wTGluZXM6IG5ld0ZvY3VzZWRUZW1wTGluZXMgfSB9ID0gbmV3Rm9jdXNlZFNlZ21lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgc3RhcnQgfSA9IGxhc3RTZWdtZW50O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyUGlja1N0YXJ0VGVtcFNoYXBlcyhsYXN0U2VnbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdGb2N1c2VkVHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhclRlbXBTaGFwZXMobGFzdFNlZ21lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RTZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjYWNoZWRJbmRleCA9IGxhc3RTZWdtZW50LnBhcmFtLmluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LnBhcmFtID0gZ2V0TmV3Q29tcG9uZW50UGFyYW0oQ2FjaGVTZXR0aW5ncy5zdGFpclR5cGUsIG5ld0ZvY3VzZWRTZWdtZW50LCB0aGlzLnN0YWlyUGFyYW0udXB3YXJkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5wYXJhbS5pbmRleCA9IGNhY2hlZEluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuUGFyYW1DaGFuZ2VkQnlEcmF3LCBjb21wb25lbnRQYXJhbTogT2JqZWN0LmFzc2lnbih7fSwgbGFzdFNlZ21lbnQucGFyYW0pIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2xkRm9jdXNlZFNlZ21lbnQgJiYgb2xkRm9jdXNlZFNlZ21lbnQgIT09IG5ld0ZvY3VzZWRTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2xkRm9jdXNlZFNlZ21lbnQubmV4dENvbXBvbmVudHMuZm9yRWFjaChpbmRzID0+IGluZHMuZGVsZXRlKGxhc3RTZWdtZW50LnBhcmFtLmluZGV4KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKChfYSA9IGxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5saW5lM2RJbmRleCkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5ld0ZvY3VzZWRTZWdtZW50Lm5leHRDb21wb25lbnRzLmZvckVhY2goaW5kcyA9PiBpbmRzLmRlbGV0ZShsYXN0U2VnbWVudC5wYXJhbS5pbmRleCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgodGhpcy5zZWdtZW50cywgbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhc2VTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhc2VTZWdtZW50Lm5leHRDb21wb25lbnRzLmZvckVhY2goaW5kcyA9PiBpbmRzLmRlbGV0ZShsYXN0U2VnbWVudC5wYXJhbS5pbmRleCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjbG9zZXN0UG9pbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWluRGlzdGFuY2UgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3Rm9jdXNlZFRlbXBMaW5lcy5mb3JFYWNoKChsaW5lLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHN0YXJ0SW5kID0gY29tcG9uZW50RGlyZWN0aW9uVHlwZSA9PT0gQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5SaWdodEZyb250ICYmIG5ld0ZvY3VzZWRUZW1wTGluZXMubGVuZ3RoID4gNCA/IDEgOiAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIChpbmRleCA9PT0gc3RhcnRJbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsaW5lU2VnM2QgPSBHZW9tTGliLmNyZWF0ZUxpbmVTZWdtZW50M2QobmV3Rm9jdXNlZFZlcnRpY2VzW2xpbmVbMF1dLCBuZXdGb2N1c2VkVmVydGljZXNbbGluZVsxXV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoZVBvaW50ID0gbGluZVNlZzNkLmdldENsb3Nlc3RQb2ludChzdGFydCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyRGlzdGFuY2UgPSB0aGVQb2ludC5kaXN0YW5jZVRvKHN0YXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNsb3Nlc3RQb2ludCB8fCBjdXJEaXN0YW5jZSA8IG1pbkRpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbkRpc3RhbmNlID0gY3VyRGlzdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RQb2ludCA9IHRoZVBvaW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5zdGFydCA9IGNsb3Nlc3RQb2ludDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGFzdFNlZ21lbnQuYmFzZUxpbmVTZWczZCA9IHsgc3RhcnQ6IG5ld0ZvY3VzZWRWZXJ0aWNlc1tsaW5lWzBdXSwgZW5kOiBuZXdGb2N1c2VkVmVydGljZXNbbGluZVsxXV0gfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudCA9IHsgY29tcG9uZW50SW5kZXg6IG5ld0ZvY3VzZWRTZWdtZW50LnBhcmFtLmluZGV4LCBsaW5lM2RJbmRleDogaW5kZXgsIGxpbmUzZDogeyBzdGFydDogbmV3Rm9jdXNlZFZlcnRpY2VzW2xpbmVbMF1dLCBlbmQ6IG5ld0ZvY3VzZWRWZXJ0aWNlc1tsaW5lWzFdXSB9IH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKChfYiA9IGxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5saW5lM2RJbmRleCkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0ZvY3VzZWRTZWdtZW50Lm5leHRDb21wb25lbnRzW2xhc3RTZWdtZW50LmJhc2VDb21wb25lbnQubGluZTNkSW5kZXhdLmFkZChsYXN0U2VnbWVudC5wYXJhbS5pbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5zdGFydExvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuY2lyY2xlVGFuZ2VudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LnN0YXJ0SGVpZ2h0ID0gbmV3Rm9jdXNlZFNlZ21lbnQuZW5kSGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3UGlja1N0YXJ0VGVtcFNoYXBlcyhzdGFydCwgbGFzdFNlZ21lbnQuc3RhcnQsIGxhc3RTZWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbmV3Rm9jdXNlZFNlZ21lbnQubmV4dENvbXBvbmVudHNbMF0uc2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuY2xlYXJUZW1wU2hhcGVzKGxhc3RTZWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2xkRm9jdXNlZFNlZ21lbnQgJiYgb2xkRm9jdXNlZFNlZ21lbnQgIT09IG5ld0ZvY3VzZWRTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9sZEZvY3VzZWRTZWdtZW50Lm5leHRDb21wb25lbnRzLmZvckVhY2goaW5kcyA9PiBpbmRzLmRlbGV0ZShsYXN0U2VnbWVudC5wYXJhbS5pbmRleCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKChfYyA9IGxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5saW5lM2RJbmRleCkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXdGb2N1c2VkU2VnbWVudC5uZXh0Q29tcG9uZW50cy5mb3JFYWNoKGluZHMgPT4gaW5kcy5kZWxldGUobGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFzZVNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleCh0aGlzLnNlZ21lbnRzLCBsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhc2VTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXNlU2VnbWVudC5uZXh0Q29tcG9uZW50cy5mb3JFYWNoKGluZHMgPT4gaW5kcy5kZWxldGUobGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5zdGFydCA9IG5ld0ZvY3VzZWRTZWdtZW50LmVuZC5jbG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LnN0YXJ0TG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5zdGFydEhlaWdodCA9IG5ld0ZvY3VzZWRTZWdtZW50LmVuZEhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsYXN0U2VnbWVudC5iYXNlTGluZVNlZzNkID0geyBzdGFydDogbmV3Rm9jdXNlZFZlcnRpY2VzW25ld0ZvY3VzZWRWZXJ0aWNlcy5sZW5ndGggLSAxXSwgZW5kOiBuZXdGb2N1c2VkVmVydGljZXNbbmV3Rm9jdXNlZFZlcnRpY2VzLmxlbmd0aCAtIDJdIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudCA9IHsgY29tcG9uZW50SW5kZXg6IG5ld0ZvY3VzZWRTZWdtZW50LnBhcmFtLmluZGV4LCBsaW5lM2RJbmRleDogMCwgbGluZTNkOiB7IHN0YXJ0OiBuZXdGb2N1c2VkVmVydGljZXNbbmV3Rm9jdXNlZFZlcnRpY2VzLmxlbmd0aCAtIDFdLCBlbmQ6IG5ld0ZvY3VzZWRWZXJ0aWNlc1tuZXdGb2N1c2VkVmVydGljZXMubGVuZ3RoIC0gMl0gfSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0ZvY3VzZWRTZWdtZW50Lm5leHRDb21wb25lbnRzWzBdLmFkZChsYXN0U2VnbWVudC5wYXJhbS5pbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuY2lyY2xlVGFuZ2VudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdUZW1wQ29tcG9uZW50KGxhc3RTZWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGxhc3RTZWdtZW50LnN0YXJ0TG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgbGFzdFNlZ21lbnQuY2lyY2xlVGFuZ2VudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoKHRoaXMuZHJhd2luZyAmJiBjb21wb25lbnRJbmRleCAhPT0gbGFzdFNlZ21lbnRJbmRleCkgfHwgIXRoaXMuZHJhd2luZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdUZW1wQ29tcG9uZW50KG5ld0ZvY3VzZWRTZWdtZW50LCB0aGlzLmRyYXdpbmcsIHRoaXMuZHJhd2luZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCgodGhpcy5kcmF3aW5nICYmIHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4ICE9PSBsYXN0U2VnbWVudEluZGV4KSB8fCAoIXRoaXMuZHJhd2luZyAmJiB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCAhPT0gY29tcG9uZW50SW5kZXgpKSAmJiBvbGRGb2N1c2VkU2VnbWVudCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYXdpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3VGVtcENvbXBvbmVudChvbGRGb2N1c2VkU2VnbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyVGVtcFNoYXBlcyhvbGRGb2N1c2VkU2VnbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggPSBjb21wb25lbnRJbmRleDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW1vdmVDb21wb25lbnQoY29tcG9uZW50SW5kZXgpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0aGVJbmRleCA9IHRoaXMuc2VnbWVudHMuZmluZEluZGV4KHNlZyA9PiBzZWcucGFyYW0uaW5kZXggPT09IGNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICBpZiAodGhlSW5kZXggPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVTZWdtZW50ID0gdGhpcy5zZWdtZW50c1t0aGVJbmRleF07XG4gICAgICAgICAgICAgICAgICAgIGxldCBvcGVyYXRpb25TdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVtb3ZlU2VnbWVudHMgPSB0aGlzLnNlZ21lbnRzLnNwbGljZSh0aGVJbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYXdpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoX2EgPSB0aGVTZWdtZW50LnRlbXBTaGFwZUlkKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwVmlldy5jbGVhclRlbXBvcmFyeVNoYXBlc0J5SWRzKHRoZVNlZ21lbnQudGVtcFNoYXBlSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3SGFuZHJhaWxzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5lZGl0TW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoZUluc3RhbmNlID0gdGhpcy5lZGl0TW9kZWwuc3RhaXJzLmdldChjb21wb25lbnRJbmRleCkgfHwgdGhpcy5lZGl0TW9kZWwucGxhdGZvcm1zLmdldChjb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbnN0YW5jZVBhdGggPSBkZXNpZ24uZ2V0RWRpdFBhdGhzVG9Hcm91cEluc3RhbmNlKHRoaXMuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhlSW5zdGFuY2UgJiYgaW5zdGFuY2VQYXRoLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBkZXNpZ24ucmVtb3ZlR3JvdXBJbnN0YW5jZSh0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2UpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICh5aWVsZCBkZXNpZ24uYWN0aXZhdGVFZGl0UGF0aChbLi4uaW5zdGFuY2VQYXRoWzBdLCB0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2VdKSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBkZXNpZ24ucmVtb3ZlR3JvdXBJbnN0YW5jZSh0aGVJbnN0YW5jZS5pbnN0YW5jZSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlSGFuZHJhaWxTaGFwZSh0aGlzLnN0YWlyUGFyYW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKF9iID0gdGhpcy5oYW5kcmFpbENvbGxlY3Rpb24pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5oYW5kcmFpbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lZGl0TW9kZWwuaGFuZHJhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBkZXNpZ24ucmVtb3ZlR3JvdXBJbnN0YW5jZSh0aGlzLmVkaXRNb2RlbC5oYW5kcmFpbC5oYW5kcmFpbEluc3RhbmNlLmluc3RhbmNlKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZWwuaGFuZHJhaWwgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYW5kcmFpbEluc3RhbmNlc0RhdGEgPSB5aWVsZCBidWlsZEhhbmRyYWlsSW5zdGFuY2UodGhpcy5zdGFpclBhcmFtLCAoX2MgPSB0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbikgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmhhbmRyYWlscywgdGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlLmdldFRyYW5zZm9ybSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGhhbmRyYWlsSW5zdGFuY2VzRGF0YSAhPT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhbmRyYWlsSW5zdGFuY2VzRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsLmhhbmRyYWlsID0gaGFuZHJhaWxJbnN0YW5jZXNEYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICh5aWVsZCBkZXNpZ24uYWN0aXZhdGVFZGl0UGF0aChpbnN0YW5jZVBhdGhbMF0pKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWl0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsLnN0YWlycy5kZWxldGUoY29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlbC5wbGF0Zm9ybXMuZGVsZXRlKGNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhckVkaXRNb2RlbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlZ21lbnRzLnNwbGljZSh0aGVJbmRleCwgMCwgLi4ucmVtb3ZlU2VnbWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYm9ydE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIW9wZXJhdGlvblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuRHJhd1N0YWlyTW9kZWxTZXR0bGVkLCBjb21wb25lbnRQYXJhbXM6IHRoaXMuc2VnbWVudHMubWFwKHNlZyA9PiAoT2JqZWN0LmFzc2lnbih7fSwgc2VnLnBhcmFtKSkpLCBzdGFpclBhcmFtOiB0aGlzLnN0YWlyUGFyYW0sIGlzRHJhd2luZzogdGhpcy5kcmF3aW5nLCBmb2N1c2VkQ29tcG9uZW50SW5kZXg6IHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4LnRvU3RyaW5nKCkgfSwgJyonKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyB0byBjbGVhciByZWxhdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFzZUNvbXBvbmVudCA9IHRoZVNlZ21lbnQuYmFzZUNvbXBvbmVudDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFzZVNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleCh0aGlzLnNlZ21lbnRzLCBiYXNlQ29tcG9uZW50ID09PSBudWxsIHx8IGJhc2VDb21wb25lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJhc2VDb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYmFzZVNlZ21lbnQgJiYgKGJhc2VDb21wb25lbnQgPT09IG51bGwgfHwgYmFzZUNvbXBvbmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleCkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgdGhlSW5kID0gYmFzZVNlZ21lbnQubmV4dENvbXBvbmVudHNbYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleF0uZmluZEluZGV4KGkgPT4gaSA9PT0gdGhlU2VnbWVudC5wYXJhbS5pbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAodGhlSW5kID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhc2VTZWdtZW50Lm5leHRDb21wb25lbnRzW2Jhc2VDb21wb25lbnQubGluZTNkSW5kZXhdLmRlbGV0ZSh0aGVTZWdtZW50LnBhcmFtLmluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0Q29tcG9uZW50cyA9IHRoZVNlZ21lbnQubmV4dENvbXBvbmVudHM7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbmV4dFNlZ21lbnRJbmRzIG9mIG5leHRDb21wb25lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFNlZ21lbnRJbmRzLnNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG5leHRTZWdJbmQgb2YgbmV4dFNlZ21lbnRJbmRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgodGhpcy5zZWdtZW50cywgbmV4dFNlZ0luZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0U2VnbWVudCAmJiBuZXh0U2VnbWVudC5iYXNlQ29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U2VnbWVudC5iYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFNlZ21lbnQuYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCA9PT0gY29tcG9uZW50SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCA9IHRoaXMuc2VnbWVudHNbdGhpcy5zZWdtZW50cy5sZW5ndGggLSAxXS5wYXJhbS5pbmRleDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgb25NYXRlcmlhbFJlcGxhY2VDbGljayhjaGFuZ2VQYXJhbVR5cGUsIGluZGV4KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdvbk1hdGVyaWFsUmVwbGFjZUNsaWNrMTExMScpO1xuICAgICAgICBjb25zdCBmdW5jID0gdGhpcy5vbk1hdGVyaWFsUmVwbGFjZUl0ZW1DbGljayhjaGFuZ2VQYXJhbVR5cGUsIGluZGV4KTtcbiAgICAgICAgY29uc29sZS5sb2coZnVuYyk7XG4gICAgICAgIGFwcC5nZXRBcHBsaWNhdGlvblVJKCkuc2hvd1JlYWxUaW1lTWF0ZXJpYWxFZGl0b3IoJzVjZTJhNmQ3ZGNjN2RjN2RjOGVlMGZiMCcsICgpID0+IHsgfSk7XG4gICAgICAgIC8vIGFwcC5nZXRBcHBsaWNhdGlvblVJKCkudG9nZ2xlTWF0ZXJpYWxSZXBsYWNlUGFuZWwodHJ1ZSk7XG4gICAgfVxuICAgIGNoYW5nZVN0YWlyUGFyYW0oc3RhaXJQYXJhbSwgY2hhbmdlUGFyYW1UeXBlcykge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oO1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgLy8gdGhpcy5zdGFpclBhcmFtID0gc3RhaXJQYXJhbVxuICAgICAgICAgICAgaWYgKCF0aGlzLnNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGluc3RhbmNlUGF0aCA9IHRoaXMuZWRpdE1vZGVsID8gZGVzaWduLmdldEVkaXRQYXRoc1RvR3JvdXBJbnN0YW5jZSh0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2UpIDogW107XG4gICAgICAgICAgICBjb25zdCBsYXN0U2VnbWVudCA9IHRoaXMuc2VnbWVudHNbdGhpcy5zZWdtZW50cy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGxldCBzdGFpclByYW1TdHJpbmcgPSAnJztcbiAgICAgICAgICAgIGlmIChjaGFuZ2VQYXJhbVR5cGVzLmluZGV4T2YoQ29tcG9uZW50UGFyYW1UeXBlLldpZHRoUHJvcG9ydGlvbmFsKSA+IC0xIHx8IGNoYW5nZVBhcmFtVHlwZXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuU3RlcFByb3BvcnRpb25hbCkgPiAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhaXJQYXJhbSA9IHN0YWlyUGFyYW07XG4gICAgICAgICAgICAgICAgRGVmYXVsdFN0YWlyUGFyYW0uc3RlcFByb3BvcnRpb25hbCA9IHN0YWlyUGFyYW0uc3RlcFByb3BvcnRpb25hbDtcbiAgICAgICAgICAgICAgICBEZWZhdWx0U3RhaXJQYXJhbS53aWR0aFByb3BvcnRpb25hbCA9IHN0YWlyUGFyYW0ud2lkdGhQcm9wb3J0aW9uYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaGFuZ2VQYXJhbVR5cGVzLmluZGV4T2YoQ29tcG9uZW50UGFyYW1UeXBlLkhvcml6b250YWxTdGVwKSA+IC0xIHx8IGNoYW5nZVBhcmFtVHlwZXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuVmVydGljYWxTdGVwKSA+IC0xIHx8XG4gICAgICAgICAgICAgICAgY2hhbmdlUGFyYW1UeXBlcy5pbmRleE9mKENvbXBvbmVudFBhcmFtVHlwZS5TdGFydFdpZHRoKSA+IC0xIHx8IGNoYW5nZVBhcmFtVHlwZXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuRW5kV2lkdGgpID4gLTEgfHxcbiAgICAgICAgICAgICAgICBjaGFuZ2VQYXJhbVR5cGVzLmluZGV4T2YoQ29tcG9uZW50UGFyYW1UeXBlLlVwd2FyZCkgPiAtMSB8fFxuICAgICAgICAgICAgICAgIGNoYW5nZVBhcmFtVHlwZXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuUGxhdGZvcm1UaGlja25lc3MpID4gLTEpIHtcbiAgICAgICAgICAgICAgICBsZXQgcmVHZW5lcmF0ZVNlZ21lbnRzID0gdGhpcy5zZWdtZW50cztcbiAgICAgICAgICAgICAgICBpZiAoY2hhbmdlUGFyYW1UeXBlcy5pbmRleE9mKENvbXBvbmVudFBhcmFtVHlwZS5VcHdhcmQpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgRGVmYXVsdFN0YWlyUGFyYW0udXB3YXJkID0gc3RhaXJQYXJhbS51cHdhcmQ7XG4gICAgICAgICAgICAgICAgICAgIERlZmF1bHRDb21wb25lbnRQYXJhbS51cHdhcmQgPSBzdGFpclBhcmFtLnVwd2FyZDtcbiAgICAgICAgICAgICAgICAgICAgcmVHZW5lcmF0ZVNlZ21lbnRzID0gY2hhbmdlU3RhaXJVcHdhcmQocmVHZW5lcmF0ZVNlZ21lbnRzWzBdLCByZUdlbmVyYXRlU2VnbWVudHMsIHN0YWlyUGFyYW0udXB3YXJkLCB0cnVlKSB8fCByZUdlbmVyYXRlU2VnbWVudHM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoYW5nZVBhcmFtVHlwZXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuSG9yaXpvbnRhbFN0ZXApID4gLTEgfHwgY2hhbmdlUGFyYW1UeXBlcy5pbmRleE9mKENvbXBvbmVudFBhcmFtVHlwZS5WZXJ0aWNhbFN0ZXApID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgRGVmYXVsdFN0YWlyUGFyYW0uaG9yaXpvbnRhbFN0ZXAgPSBzdGFpclBhcmFtLmhvcml6b250YWxTdGVwO1xuICAgICAgICAgICAgICAgICAgICBEZWZhdWx0U3RhaXJQYXJhbS52ZXJ0aWNhbFN0ZXAgPSBzdGFpclBhcmFtLnZlcnRpY2FsU3RlcDtcbiAgICAgICAgICAgICAgICAgICAgRGVmYXVsdENvbXBvbmVudFBhcmFtLmhvcml6b250YWxTdGVwID0gc3RhaXJQYXJhbS5ob3Jpem9udGFsU3RlcDtcbiAgICAgICAgICAgICAgICAgICAgRGVmYXVsdENvbXBvbmVudFBhcmFtLnZlcnRpY2FsU3RlcCA9IHN0YWlyUGFyYW0udmVydGljYWxTdGVwO1xuICAgICAgICAgICAgICAgICAgICByZUdlbmVyYXRlU2VnbWVudHMgPSBjaGFuZ2VTdGFpclN0ZXAocmVHZW5lcmF0ZVNlZ21lbnRzWzBdLCB0aGlzLnNlZ21lbnRzLCBzdGFpclBhcmFtLmhvcml6b250YWxTdGVwLCBzdGFpclBhcmFtLnZlcnRpY2FsU3RlcCwgdHJ1ZSwgZmFsc2UpIHx8IHJlR2VuZXJhdGVTZWdtZW50cztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hhbmdlUGFyYW1UeXBlcy5pbmRleE9mKENvbXBvbmVudFBhcmFtVHlwZS5QbGF0Zm9ybVRoaWNrbmVzcykgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICBEZWZhdWx0U3RhaXJQYXJhbS5wbGF0Zm9ybVRoaWNrbmVzcyA9IHN0YWlyUGFyYW0ucGxhdGZvcm1UaGlja25lc3M7XG4gICAgICAgICAgICAgICAgICAgIERlZmF1bHRDb21wb25lbnRQYXJhbS5wbGF0Zm9ybVRoaWNrbmVzcyA9IHN0YWlyUGFyYW0ucGxhdGZvcm1UaGlja25lc3M7XG4gICAgICAgICAgICAgICAgICAgIHJlR2VuZXJhdGVTZWdtZW50cyA9IHRoaXMuc2VnbWVudHMuZmlsdGVyKHNlZyA9PiBzZWcucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlUGFyYW1UeXBlcy5pbmRleE9mKENvbXBvbmVudFBhcmFtVHlwZS5TdGFydFdpZHRoKSA+IC0xIHx8IGNoYW5nZVBhcmFtVHlwZXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuRW5kV2lkdGgpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIERlZmF1bHRTdGFpclBhcmFtLnN0YXJ0V2lkdGggPSBzdGFpclBhcmFtLnN0YXJ0V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBEZWZhdWx0U3RhaXJQYXJhbS5lbmRXaWR0aCA9IHN0YWlyUGFyYW0uZW5kV2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBEZWZhdWx0Q29tcG9uZW50UGFyYW0uc3RhcnRXaWR0aCA9IHN0YWlyUGFyYW0uc3RhcnRXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIERlZmF1bHRDb21wb25lbnRQYXJhbS5lbmRXaWR0aCA9IHN0YWlyUGFyYW0uZW5kV2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVHZW5lcmF0ZVNlZ21lbnRzID0gdGhpcy5zZWdtZW50cy5maWx0ZXIoc2VnID0+IHNlZy5wYXJhbS50eXBlICE9PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHJlR2VuZXJhdGVTZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCByZUdlbmVyYXRlU2VnbWVudCBvZiByZUdlbmVyYXRlU2VnbWVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgY2hhbmdlUGFyYW1UeXBlIG9mIGNoYW5nZVBhcmFtVHlwZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZUdlbmVyYXRlU2VnbWVudC5wYXJhbVtjaGFuZ2VQYXJhbVR5cGVdID0gc3RhaXJQYXJhbVtjaGFuZ2VQYXJhbVR5cGVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudFRyYW5zZm9ybSA9IHRoaXMuZWRpdE1vZGVsID8gdGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlLmdldFRyYW5zZm9ybSgpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvbGRTdGFpclBhcmFtID0gdGhpcy5zdGFpclBhcmFtO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvbGRDb21wb25lbnRQYXJhbXMgPSBuZXcgTWFwKHJlR2VuZXJhdGVTZWdtZW50cy5tYXAoc2VnID0+IChbc2VnLnBhcmFtLmluZGV4LCBPYmplY3QuYXNzaWduKHt9LCBzZWcucGFyYW0pXSkpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFpclBhcmFtID0gc3RhaXJQYXJhbTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9wZXJhdGlvblN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZHJhd2luZyAmJiB0aGlzLmVkaXRNb2RlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyUHJhbVN0cmluZyA9IHN0cmluZ2lmeVN0YWlyUGFyYW0oc3RhaXJQYXJhbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAhISgoX2EgPSB0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zZXRDdXN0b21Qcm9wZXJ0eShTdGFpclBhcmFtS2V5LCBzdGFpclByYW1TdHJpbmcpLmlzU3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2VQYXRoLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICh5aWVsZCBkZXNpZ24uYWN0aXZhdGVFZGl0UGF0aChbLi4uaW5zdGFuY2VQYXRoWzBdLCB0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2VdKSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcmVHZW5lcmF0ZVNlZ21lbnQgb2YgcmVHZW5lcmF0ZVNlZ21lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlUGFyYW1UeXBlcy5sZW5ndGggPT09IDEgJiYgY2hhbmdlUGFyYW1UeXBlc1swXSA9PT0gQ29tcG9uZW50UGFyYW1UeXBlLlBsYXRmb3JtVGhpY2tuZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVHZW5lcmF0ZVNlZ21lbnQucGFyYW0ucGxhdGZvcm1UaGlja25lc3MgPSB0aGlzLnN0YWlyUGFyYW0ucGxhdGZvcm1UaGlja25lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGNoYW5nZVBhcmFtVHlwZSBvZiBjaGFuZ2VQYXJhbVR5cGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlR2VuZXJhdGVTZWdtZW50LnBhcmFtW2NoYW5nZVBhcmFtVHlwZV0gPSB0aGlzLnN0YWlyUGFyYW1bY2hhbmdlUGFyYW1UeXBlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kcmF3aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zdGFpclBhcmFtID0gc3RhaXJQYXJhbTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdUZW1wQ29tcG9uZW50KHJlR2VuZXJhdGVTZWdtZW50LCByZUdlbmVyYXRlU2VnbWVudC5wYXJhbS5pbmRleCA9PT0gdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggJiYgcmVHZW5lcmF0ZVNlZ21lbnQucGFyYW0uaW5kZXggIT09IGxhc3RTZWdtZW50LnBhcmFtLmluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZWRpdE1vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBwYXJhbTogeyBpbmRleCwgdHlwZSB9IH0gPSByZUdlbmVyYXRlU2VnbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVJbnN0YW5jZSA9IHRoaXMuZWRpdE1vZGVsLnN0YWlycy5nZXQoaW5kZXgpIHx8IHRoaXMuZWRpdE1vZGVsLnBsYXRmb3Jtcy5nZXQoaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGVJbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlU2VnbWVudFNoYXBlKHJlR2VuZXJhdGVTZWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlTWVzaGVzID0gZ2VuZXJhdGVNZXNoZXMoW3JlR2VuZXJhdGVTZWdtZW50XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGVNZXNoZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGRlc2lnbi5yZW1vdmVHcm91cEluc3RhbmNlKHRoZUluc3RhbmNlLmluc3RhbmNlKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3SW5zdGFuY2UgPSBidWlsZENvbXBvbmVudEluc3RhbmNlKHJlR2VuZXJhdGVTZWdtZW50LCB0aGlzLnNlZ21lbnRzLCBwYXJlbnRUcmFuc2Zvcm0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAhIW5ld0luc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3SW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZWwucGxhdGZvcm1zLnNldChpbmRleCwgeyBpbnN0YW5jZTogbmV3SW5zdGFuY2UsIGRlZmluaXRpb25LZXk6ICgoX2IgPSBuZXdJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmdldEtleSgpKSB8fCAnJywgaW5zdGFuY2VLZXk6IG5ld0luc3RhbmNlLmdldEtleSgpIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZWwuc3RhaXJzLnNldChpbmRleCwgeyBpbnN0YW5jZTogbmV3SW5zdGFuY2UsIGRlZmluaXRpb25LZXk6ICgoX2MgPSBuZXdJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmdldEtleSgpKSB8fCAnJywgaW5zdGFuY2VLZXk6IG5ld0luc3RhbmNlLmdldEtleSgpIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZHJhd2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3SGFuZHJhaWxzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlN0YWlyUGFyYW1DaGFuZ2VkQnlEcmF3LCBzdGFpclBhcmFtOiB0aGlzLnN0YWlyUGFyYW0sIGNvbXBvbmVudFBhcmFtczogdGhpcy5zZWdtZW50cy5tYXAoc2VnID0+IChPYmplY3QuYXNzaWduKHt9LCBzZWcucGFyYW0pKSkgfSwgJyonKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICghdGhpcy5kcmF3aW5nICYmIHRoaXMuZWRpdE1vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlSGFuZHJhaWxTaGFwZShzdGFpclBhcmFtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoX2QgPSB0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbikgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLmhhbmRyYWlscy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lZGl0TW9kZWwuaGFuZHJhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZGVzaWduLnJlbW92ZUdyb3VwSW5zdGFuY2UodGhpcy5lZGl0TW9kZWwuaGFuZHJhaWwuaGFuZHJhaWxJbnN0YW5jZS5pbnN0YW5jZSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlbC5oYW5kcmFpbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFuZHJhaWxJbnN0YW5jZXNEYXRhID0geWllbGQgYnVpbGRIYW5kcmFpbEluc3RhbmNlKHN0YWlyUGFyYW0sIChfZSA9IHRoaXMuaGFuZHJhaWxDb2xsZWN0aW9uKSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2UuaGFuZHJhaWxzLCB0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2UuZ2V0VHJhbnNmb3JtKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGhhbmRyYWlsSW5zdGFuY2VzRGF0YSAhPT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoYW5kcmFpbEluc3RhbmNlc0RhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZWwuaGFuZHJhaWwgPSBoYW5kcmFpbEluc3RhbmNlc0RhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlUGF0aC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAoeWllbGQgZGVzaWduLmFjdGl2YXRlRWRpdFBhdGgoaW5zdGFuY2VQYXRoWzBdKSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyZW50SW5zdGFuY2UgPSB0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1pdE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc3RhaXJQYXJhbSA9IHN0YWlyUGFyYW07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5TdGFpclBhcmFtQ2hhbmdlZEJ5RHJhdywgc3RhaXJQYXJhbTogdGhpcy5zdGFpclBhcmFtLCBjb21wb25lbnRQYXJhbXM6IHRoaXMuc2VnbWVudHMubWFwKHNlZyA9PiAoT2JqZWN0LmFzc2lnbih7fSwgc2VnLnBhcmFtKSkpIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYm9ydE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhaXJQYXJhbSA9IG9sZFN0YWlyUGFyYW07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBzZWdtZW50IG9mIHJlR2VuZXJhdGVTZWdtZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvbGRTZWdtZW50UGFyYW0gPSBvbGRDb21wb25lbnRQYXJhbXMuZ2V0KHNlZ21lbnQucGFyYW0uaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2xkU2VnbWVudFBhcmFtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50LnBhcmFtID0gb2xkU2VnbWVudFBhcmFtO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuU3RhaXJQYXJhbUNoYW5nZWRCeURyYXcsIHN0YWlyUGFyYW06IHRoaXMuc3RhaXJQYXJhbSB9LCAnKicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uLmFkZChbcGFyZW50SW5zdGFuY2VdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoYW5nZVBhcmFtVHlwZXMubGVuZ3RoID09PSAxICYmIGNoYW5nZVBhcmFtVHlwZXNbMF0uc3RhcnRzV2l0aChDb21wb25lbnRQYXJhbVR5cGUuSGFuZHJhaWwpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZHJhd2luZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWlyUGFyYW0gPSBzdGFpclBhcmFtO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdIYW5kcmFpbHMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5lZGl0TW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUhhbmRyYWlsU2hhcGUoc3RhaXJQYXJhbSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBvcGVyYXRpb25TdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgc3RhaXJQcmFtU3RyaW5nID0gc3RyaW5naWZ5U3RhaXJQYXJhbShzdGFpclBhcmFtKTtcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgISEoKF9mID0gdGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpKSA9PT0gbnVsbCB8fCBfZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Yuc2V0Q3VzdG9tUHJvcGVydHkoU3RhaXJQYXJhbUtleSwgc3RhaXJQcmFtU3RyaW5nKS5pc1N1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2VQYXRoLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKHlpZWxkIGRlc2lnbi5hY3RpdmF0ZUVkaXRQYXRoKFsuLi5pbnN0YW5jZVBhdGhbMF0sIHRoaXMuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZV0pKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZWRpdE1vZGVsLmhhbmRyYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBkZXNpZ24ucmVtb3ZlR3JvdXBJbnN0YW5jZSh0aGlzLmVkaXRNb2RlbC5oYW5kcmFpbC5oYW5kcmFpbEluc3RhbmNlLmluc3RhbmNlKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlbC5oYW5kcmFpbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoKF9nID0gdGhpcy5oYW5kcmFpbENvbGxlY3Rpb24pID09PSBudWxsIHx8IF9nID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZy5oYW5kcmFpbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYW5kcmFpbEluc3RhbmNlc0RhdGEgPSB5aWVsZCBidWlsZEhhbmRyYWlsSW5zdGFuY2Uoc3RhaXJQYXJhbSwgKF9oID0gdGhpcy5oYW5kcmFpbENvbGxlY3Rpb24pID09PSBudWxsIHx8IF9oID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfaC5oYW5kcmFpbHMsIHRoaXMuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZS5nZXRUcmFuc2Zvcm0oKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBoYW5kcmFpbEluc3RhbmNlc0RhdGEgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoYW5kcmFpbEluc3RhbmNlc0RhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlbC5oYW5kcmFpbCA9IGhhbmRyYWlsSW5zdGFuY2VzRGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2VQYXRoLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKHlpZWxkIGRlc2lnbi5hY3RpdmF0ZUVkaXRQYXRoKFsuLi5pbnN0YW5jZVBhdGhbMF1dKSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudEluc3RhbmNlID0gdGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWl0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWlyUGFyYW0gPSBzdGFpclBhcmFtO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5TdGFpclBhcmFtQ2hhbmdlZEJ5RHJhdywgc3RhaXJQYXJhbTogdGhpcy5zdGFpclBhcmFtIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhYm9ydE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5TdGFpclBhcmFtQ2hhbmdlZEJ5RHJhdywgc3RhaXJQYXJhbTogdGhpcy5zdGFpclBhcmFtIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uLmFkZChbcGFyZW50SW5zdGFuY2VdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghc3RhaXJQYXJhbS5zdGFpck1hdGVyaWFsICYmIGNoYW5nZVBhcmFtVHlwZXMubGVuZ3RoID09PSAxICYmIGNoYW5nZVBhcmFtVHlwZXNbMF0gPT09IENvbXBvbmVudFBhcmFtVHlwZS5TdGFpck1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgeWllbGQgdGhpcy5vbk1hdGVyaWFsUmVwbGFjZUl0ZW1DbGljayhjaGFuZ2VQYXJhbVR5cGVzWzBdLCB1bmRlZmluZWQsIHRydWUpKCcnLCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghc3RhaXJQYXJhbS5wbGF0Zm9ybU1hdGVyaWFsICYmIGNoYW5nZVBhcmFtVHlwZXMubGVuZ3RoID09PSAxICYmIGNoYW5nZVBhcmFtVHlwZXNbMF0gPT09IENvbXBvbmVudFBhcmFtVHlwZS5QbGF0Zm9ybUxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMub25NYXRlcmlhbFJlcGxhY2VJdGVtQ2xpY2soY2hhbmdlUGFyYW1UeXBlc1swXSwgdW5kZWZpbmVkLCB0cnVlKSgnJywgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXN0YWlyUGFyYW0uaGFuZHJhaWwucmFpbC5tYXRlcmlhbCAmJiBjaGFuZ2VQYXJhbVR5cGVzLmxlbmd0aCA9PT0gMSAmJiBjaGFuZ2VQYXJhbVR5cGVzWzBdID09PSBDb21wb25lbnRQYXJhbVR5cGUuSGFuZHJhaWxSYWlsTWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLm9uTWF0ZXJpYWxSZXBsYWNlSXRlbUNsaWNrKGNoYW5nZVBhcmFtVHlwZXNbMF0sIHVuZGVmaW5lZCwgdHJ1ZSkoJycsICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCFzdGFpclBhcmFtLmhhbmRyYWlsLmNvbHVtbi5tYXRlcmlhbCAmJiBjaGFuZ2VQYXJhbVR5cGVzLmxlbmd0aCA9PT0gMSAmJiBjaGFuZ2VQYXJhbVR5cGVzWzBdID09PSBDb21wb25lbnRQYXJhbVR5cGUuSGFuZHJhaWxDb2x1bW5NYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMub25NYXRlcmlhbFJlcGxhY2VJdGVtQ2xpY2soY2hhbmdlUGFyYW1UeXBlc1swXSwgdW5kZWZpbmVkLCB0cnVlKSgnJywgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY2hhbmdlQ29tcG9uZW50UGFyYW0oY29tcG9uZW50UGFyYW0sIGNoYW5nZVBhcmFtVHlwZXMpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZTtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zZWdtZW50cy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgdGhlU2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHRoaXMuc2VnbWVudHMsIGNvbXBvbmVudFBhcmFtLmluZGV4KTtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RTZWdtZW50ID0gdGhpcy5zZWdtZW50c1t0aGlzLnNlZ21lbnRzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgaWYgKHRoZVNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnRQYXJhbS5tb2RlbEVkaXRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIC8vIHRoZVNlZ21lbnQucGFyYW0gPSBjb21wb25lbnRQYXJhbTtcbiAgICAgICAgICAgICAgICBpZiAoIWlzQ2lyY3VsYXJTdGFpcih0aGVTZWdtZW50KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGVTZWdtZW50LmNpcmNsZVRhbmdlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VQYXJhbVR5cGVzLmxlbmd0aCA9PT0gMSAmJiBjaGFuZ2VQYXJhbVR5cGVzWzBdID09PSBDb21wb25lbnRQYXJhbVR5cGUuQ29tcG9uZW50TWF0ZXJpYWwgJiYgIWNvbXBvbmVudFBhcmFtLm1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25NYXRlcmlhbFJlcGxhY2VJdGVtQ2xpY2soY2hhbmdlUGFyYW1UeXBlc1swXSwgY29tcG9uZW50UGFyYW0uaW5kZXgsIHRydWUpKCcnLCAnJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoYW5nZVBhcmFtVHlwZXMubGVuZ3RoID09PSAxICYmIChjaGFuZ2VQYXJhbVR5cGVzWzBdID09PSBDb21wb25lbnRQYXJhbVR5cGUuU3RlcFByb3BvcnRpb25hbCB8fFxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VQYXJhbVR5cGVzWzBdID09PSBDb21wb25lbnRQYXJhbVR5cGUuV2lkdGhQcm9wb3J0aW9uYWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoZVNlZ21lbnQucGFyYW0gPSBjb21wb25lbnRQYXJhbTtcbiAgICAgICAgICAgICAgICAgICAgRGVmYXVsdENvbXBvbmVudFBhcmFtLnN0ZXBQcm9wb3J0aW9uYWwgPSBjb21wb25lbnRQYXJhbS5zdGVwUHJvcG9ydGlvbmFsO1xuICAgICAgICAgICAgICAgICAgICBEZWZhdWx0Q29tcG9uZW50UGFyYW0ud2lkdGhQcm9wb3J0aW9uYWwgPSBjb21wb25lbnRQYXJhbS53aWR0aFByb3BvcnRpb25hbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWdtZW50cy5mb3JFYWNoKHNlZyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWcucGFyYW0uc3RlcFByb3BvcnRpb25hbCA9IGNvbXBvbmVudFBhcmFtLnN0ZXBQcm9wb3J0aW9uYWw7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWcucGFyYW0ud2lkdGhQcm9wb3J0aW9uYWwgPSBjb21wb25lbnRQYXJhbS53aWR0aFByb3BvcnRpb25hbDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoYW5nZVBhcmFtVHlwZXNbMF0gPT09IENvbXBvbmVudFBhcmFtVHlwZS5QbGF0Zm9ybUxlbmd0aExvY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGVTZWdtZW50LnBhcmFtID0gY29tcG9uZW50UGFyYW07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvbGRQYXJhbSA9IHRoZVNlZ21lbnQucGFyYW07XG4gICAgICAgICAgICAgICAgICAgIGxldCByZUdlbmVyYXRlU2VnbWVudHMgPSBbdGhlU2VnbWVudF07XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VQYXJhbVR5cGVzLmluZGV4T2YoQ29tcG9uZW50UGFyYW1UeXBlLlVwd2FyZCkgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgRGVmYXVsdFN0YWlyUGFyYW0udXB3YXJkID0gY29tcG9uZW50UGFyYW0udXB3YXJkO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVHZW5lcmF0ZVNlZ21lbnRzID0gY2hhbmdlU3RhaXJVcHdhcmQodGhlU2VnbWVudCwgdGhpcy5zZWdtZW50cywgY29tcG9uZW50UGFyYW0udXB3YXJkLCBmYWxzZSwgdHJ1ZSkgfHwgcmVHZW5lcmF0ZVNlZ21lbnRzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoYW5nZVBhcmFtVHlwZXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuSG9yaXpvbnRhbFN0ZXApID4gLTEgfHwgY2hhbmdlUGFyYW1UeXBlcy5pbmRleE9mKENvbXBvbmVudFBhcmFtVHlwZS5WZXJ0aWNhbFN0ZXApID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlR2VuZXJhdGVTZWdtZW50cyA9IGNoYW5nZVN0YWlyU3RlcCh0aGVTZWdtZW50LCB0aGlzLnNlZ21lbnRzLCBjb21wb25lbnRQYXJhbS5ob3Jpem9udGFsU3RlcCwgY29tcG9uZW50UGFyYW0udmVydGljYWxTdGVwLCBmYWxzZSwgdHJ1ZSkgfHwgcmVHZW5lcmF0ZVNlZ21lbnRzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoYW5nZVBhcmFtVHlwZXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuUGxhdGZvcm1MZW5ndGgpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlR2VuZXJhdGVTZWdtZW50cyA9IGNoYW5nZVBsYXRmb3JtTGVuZ3RoKHRoZVNlZ21lbnQsIHRoaXMuc2VnbWVudHMsIGNvbXBvbmVudFBhcmFtLnBsYXRmb3JtTGVuZ3RoLCBmYWxzZSwgdHJ1ZSkgfHwgcmVHZW5lcmF0ZVNlZ21lbnRzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNvbXBvbmVudFBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gJiYgY2hhbmdlUGFyYW1UeXBlcy5pbmRleE9mKENvbXBvbmVudFBhcmFtVHlwZS5TdGFydFdpZHRoKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBEZWZhdWx0Q29tcG9uZW50UGFyYW0uc3RhcnRXaWR0aCA9IGNvbXBvbmVudFBhcmFtLnN0YXJ0V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBEZWZhdWx0Q29tcG9uZW50UGFyYW0uZW5kV2lkdGggPSBjb21wb25lbnRQYXJhbS5lbmRXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlR2VuZXJhdGVTZWdtZW50cyA9IGNoYW5nZVBsYXRmb3JtV2lkdGgodGhlU2VnbWVudCwgdGhpcy5zZWdtZW50cywgY29tcG9uZW50UGFyYW0uc3RhcnRXaWR0aCwgZmFsc2UsIHRydWUpIHx8IHJlR2VuZXJhdGVTZWdtZW50cztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGFuZ2VQYXJhbVR5cGVzWzBdID09PSBDb21wb25lbnRQYXJhbVR5cGUuVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudFBhcmFtLnR5cGUgIT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDYWNoZVNldHRpbmdzLnN0YWlyVHlwZSA9IGNvbXBvbmVudFBhcmFtLnR5cGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hhbmdlUGFyYW1UeXBlc1swXSA9PT0gQ29tcG9uZW50UGFyYW1UeXBlLlBsYXRmb3JtVGhpY2tuZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBEZWZhdWx0Q29tcG9uZW50UGFyYW0ucGxhdGZvcm1UaGlja25lc3MgPSBjb21wb25lbnRQYXJhbS5wbGF0Zm9ybVRoaWNrbmVzcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGVTZWdtZW50LnBhcmFtID0gY29tcG9uZW50UGFyYW07XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZUdlbmVyYXRlU2VnbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3BlcmF0aW9uU3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbnN0YW5jZVBhdGggPSB0aGlzLmVkaXRNb2RlbCA/IGRlc2lnbi5nZXRFZGl0UGF0aHNUb0dyb3VwSW5zdGFuY2UodGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlKSA6IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmRyYXdpbmcgJiYgdGhpcy5lZGl0TW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZVBhdGgubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICh5aWVsZCBkZXNpZ24uYWN0aXZhdGVFZGl0UGF0aChbLi4uaW5zdGFuY2VQYXRoWzBdLCB0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2VdKSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudFRyYW5zZm9ybSA9IHRoaXMuZWRpdE1vZGVsID8gdGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlLmdldFRyYW5zZm9ybSgpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCByZUdlbmVyYXRlU2VnbWVudCBvZiByZUdlbmVyYXRlU2VnbWVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kcmF3aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBDb21wb25lbnQocmVHZW5lcmF0ZVNlZ21lbnQsIHJlR2VuZXJhdGVTZWdtZW50LnBhcmFtLmluZGV4ID09PSB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCAmJiByZUdlbmVyYXRlU2VnbWVudC5wYXJhbS5pbmRleCAhPT0gbGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmVkaXRNb2RlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHBhcmFtOiB7IGluZGV4LCB0eXBlIH0gfSA9IHJlR2VuZXJhdGVTZWdtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVJbnN0YW5jZSA9IHRoaXMuZWRpdE1vZGVsLnN0YWlycy5nZXQoaW5kZXgpIHx8IHRoaXMuZWRpdE1vZGVsLnBsYXRmb3Jtcy5nZXQoaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhlSW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVTZWdtZW50U2hhcGUocmVHZW5lcmF0ZVNlZ21lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlTWVzaGVzID0gZ2VuZXJhdGVNZXNoZXMoW3JlR2VuZXJhdGVTZWdtZW50XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhlTWVzaGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb25TdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGRlc2lnbi5yZW1vdmVHcm91cEluc3RhbmNlKHRoZUluc3RhbmNlLmluc3RhbmNlKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb25TdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdJbnN0YW5jZSA9IGJ1aWxkQ29tcG9uZW50SW5zdGFuY2UocmVHZW5lcmF0ZVNlZ21lbnQsIHRoaXMuc2VnbWVudHMsIHBhcmVudFRyYW5zZm9ybSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAhIW5ld0luc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0luc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZWwucGxhdGZvcm1zLnNldChpbmRleCwgeyBpbnN0YW5jZTogbmV3SW5zdGFuY2UsIGRlZmluaXRpb25LZXk6ICgoX2EgPSBuZXdJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmdldEtleSgpKSB8fCAnJywgaW5zdGFuY2VLZXk6IG5ld0luc3RhbmNlLmdldEtleSgpIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZWwuc3RhaXJzLnNldChpbmRleCwgeyBpbnN0YW5jZTogbmV3SW5zdGFuY2UsIGRlZmluaXRpb25LZXk6ICgoX2IgPSBuZXdJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmdldEtleSgpKSB8fCAnJywgaW5zdGFuY2VLZXk6IG5ld0luc3RhbmNlLmdldEtleSgpIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0YWlyUGFyYW1TaG91bGRDaGFuZ2UgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VQYXJhbVR5cGVzWzBdICE9PSBDb21wb25lbnRQYXJhbVR5cGUuVHlwZSAmJiBjaGFuZ2VQYXJhbVR5cGVzWzBdICE9PSBDb21wb25lbnRQYXJhbVR5cGUuUGxhdGZvcm1MZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVTZWdtZW50cyA9IHRoaXMuc2VnbWVudHMuZmlsdGVyKHNlZyA9PiAoc2VnLnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pID09PSAoY2hhbmdlUGFyYW1UeXBlc1swXSA9PT0gQ29tcG9uZW50UGFyYW1UeXBlLlBsYXRmb3JtVGhpY2tuZXNzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoZVNlZ21lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpclBhcmFtU2hvdWxkQ2hhbmdlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kcmF3aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3SGFuZHJhaWxzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YWlyUGFyYW1TaG91bGRDaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBjaGFuZ2VQYXJhbVR5cGUgb2YgY2hhbmdlUGFyYW1UeXBlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFpclBhcmFtW2NoYW5nZVBhcmFtVHlwZV0gPSB0aGVTZWdtZW50LnBhcmFtW2NoYW5nZVBhcmFtVHlwZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YWlyUGFyYW1TaG91bGRDaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5QYXJhbUNoYW5nZWRCeURyYXcsIGNvbXBvbmVudFBhcmFtOiBPYmplY3QuYXNzaWduKHt9LCB0aGVTZWdtZW50LnBhcmFtKSwgc3RhaXJQYXJhbTogc3RhaXJQYXJhbVNob3VsZENoYW5nZSA/IHRoaXMuc3RhaXJQYXJhbSA6IHVuZGVmaW5lZCB9LCAnKicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZWRpdE1vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUhhbmRyYWlsU2hhcGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGFpclBhcmFtLmhhbmRyYWlsLnN1cHBvcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZWRpdE1vZGVsLmhhbmRyYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBkZXNpZ24ucmVtb3ZlR3JvdXBJbnN0YW5jZSh0aGlzLmVkaXRNb2RlbC5oYW5kcmFpbC5oYW5kcmFpbEluc3RhbmNlLmluc3RhbmNlKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChfYyA9IHRoaXMuaGFuZHJhaWxDb2xsZWN0aW9uKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuaGFuZHJhaWxzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFuZHJhaWxJbnN0YW5jZXNEYXRhID0geWllbGQgYnVpbGRIYW5kcmFpbEluc3RhbmNlKHRoaXMuc3RhaXJQYXJhbSwgKF9kID0gdGhpcy5oYW5kcmFpbENvbGxlY3Rpb24pID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5oYW5kcmFpbHMsIHBhcmVudFRyYW5zZm9ybSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBoYW5kcmFpbEluc3RhbmNlc0RhdGEgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoYW5kcmFpbEluc3RhbmNlc0RhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlbC5oYW5kcmFpbCA9IGhhbmRyYWlsSW5zdGFuY2VzRGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2VQYXRoLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAoeWllbGQgZGVzaWduLmFjdGl2YXRlRWRpdFBhdGgoaW5zdGFuY2VQYXRoWzBdKSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhaXJQYXJhbVNob3VsZENoYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFpclByYW1TdHJpbmcgPSBzdHJpbmdpZnlTdGFpclBhcmFtKHRoaXMuc3RhaXJQYXJhbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICEhKChfZSA9IHRoaXMuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lLnNldEN1c3RvbVByb3BlcnR5KFN0YWlyUGFyYW1LZXksIHN0YWlyUHJhbVN0cmluZykuaXNTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyZW50SW5zdGFuY2UgPSB0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWl0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZVNlZ21lbnQucGFyYW0gPSBjb21wb25lbnRQYXJhbTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YWlyUGFyYW1TaG91bGRDaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgY2hhbmdlUGFyYW1UeXBlIG9mIGNoYW5nZVBhcmFtVHlwZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWlyUGFyYW1bY2hhbmdlUGFyYW1UeXBlXSA9IHRoZVNlZ21lbnQucGFyYW1bY2hhbmdlUGFyYW1UeXBlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlBhcmFtQ2hhbmdlZEJ5RHJhdywgY29tcG9uZW50UGFyYW06IE9iamVjdC5hc3NpZ24oe30sIHRoZVNlZ21lbnQucGFyYW0pLCBzdGFpclBhcmFtOiBzdGFpclBhcmFtU2hvdWxkQ2hhbmdlID8gdGhpcy5zdGFpclBhcmFtIDogdW5kZWZpbmVkIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYm9ydE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGVTZWdtZW50LnBhcmFtID0gb2xkUGFyYW07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuUGFyYW1DaGFuZ2VkQnlEcmF3LCBjb21wb25lbnRQYXJhbTogT2JqZWN0LmFzc2lnbih7fSwgdGhlU2VnbWVudC5wYXJhbSkgfSwgJyonKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uLmFkZChbcGFyZW50SW5zdGFuY2VdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHRyeUNvbW1pdCgpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2Y7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCBtZXNoZXMgPSBnZW5lcmF0ZU1lc2hlcyh0aGlzLnNlZ21lbnRzKTtcbiAgICAgICAgICAgIGlmIChtZXNoZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgc3RhcnRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdJbnN0YW5jZXMgPSBbXTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFpcnNDaGlsZCA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwbGF0Zm9ybUNoaWxkID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkU2VnbWVudHMgPSBbXTtcbiAgICAgICAgICAgICAgICBsZXQgb3BlcmF0aW9uU3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBzZWdtZW50IG9mIHRoaXMuc2VnbWVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzZWdtZW50Lm1lc2gpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvcGVyYXRpb25TdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhYm9ydE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0luc3RhbmNlID0gYnVpbGRDb21wb25lbnRJbnN0YW5jZShzZWdtZW50LCB0aGlzLnNlZ21lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgISFuZXdJbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0luc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdJbnN0YW5jZXMucHVzaChuZXdJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhdGZvcm1DaGlsZC5zZXQoc2VnbWVudC5wYXJhbS5pbmRleCwgeyBpbnN0YW5jZTogbmV3SW5zdGFuY2UsIGRlZmluaXRpb25LZXk6ICgoX2EgPSBuZXdJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmdldEtleSgpKSB8fCAnJywgaW5zdGFuY2VLZXk6IG5ld0luc3RhbmNlLmdldEtleSgpIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJzQ2hpbGQuc2V0KHNlZ21lbnQucGFyYW0uaW5kZXgsIHsgaW5zdGFuY2U6IG5ld0luc3RhbmNlLCBkZWZpbml0aW9uS2V5OiAoKF9iID0gbmV3SW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5nZXRLZXkoKSkgfHwgJycsIGluc3RhbmNlS2V5OiBuZXdJbnN0YW5jZS5nZXRLZXkoKSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQucGFyYW0ucGxhdGZvcm1MZW5ndGhMb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5wYXJhbS5zdGVwUHJvcG9ydGlvbmFsID0gRGVmYXVsdENvbXBvbmVudFBhcmFtLnN0ZXBQcm9wb3J0aW9uYWw7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50LnBhcmFtLndpZHRoUHJvcG9ydGlvbmFsID0gRGVmYXVsdENvbXBvbmVudFBhcmFtLndpZHRoUHJvcG9ydGlvbmFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5wYXJhbS5tb2RlbEVkaXRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRTZWdtZW50cy5wdXNoKHNlZ21lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBoYW5kcmFpbEluc3RhbmNlRGF0YTtcbiAgICAgICAgICAgICAgICBpZiAoKF9jID0gdGhpcy5oYW5kcmFpbENvbGxlY3Rpb24pID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5oYW5kcmFpbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRyYWlsSW5zdGFuY2VzRGF0YVJlcyA9IHlpZWxkIGJ1aWxkSGFuZHJhaWxJbnN0YW5jZSh0aGlzLnN0YWlyUGFyYW0sIChfZCA9IHRoaXMuaGFuZHJhaWxDb2xsZWN0aW9uKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QuaGFuZHJhaWxzKTtcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgaGFuZHJhaWxJbnN0YW5jZXNEYXRhUmVzICE9PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChoYW5kcmFpbEluc3RhbmNlc0RhdGFSZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0luc3RhbmNlcy5wdXNoKGhhbmRyYWlsSW5zdGFuY2VzRGF0YVJlcy5oYW5kcmFpbEluc3RhbmNlLmluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsSW5zdGFuY2VEYXRhID0gaGFuZHJhaWxJbnN0YW5jZXNEYXRhUmVzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChuZXdJbnN0YW5jZXMubGVuZ3RoICYmIG9wZXJhdGlvblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyZW50SW5zdGFuY2UgPSAoX2UgPSBkZXNpZ24ubWFrZUdyb3VwKFtdLCBuZXdJbnN0YW5jZXMsIFtdKSkgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lLmFkZGVkSW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICEhcGFyZW50SW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudERlZiA9IHBhcmVudEluc3RhbmNlID09PSBudWxsIHx8IHBhcmVudEluc3RhbmNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwYXJlbnRJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmVudEluc3RhbmNlICYmIHBhcmVudERlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgcGFyZW50RGVmLnNldEN1c3RvbVByb3BlcnR5KFN0YWlyTW9kZWxLZXksIE1vZGVsVmFsdWUpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YWlyUGFyYW1TdHJpbmcgPSBzdHJpbmdpZnlTdGFpclBhcmFtKHRoaXMuc3RhaXJQYXJhbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBwYXJlbnREZWYuc2V0Q3VzdG9tUHJvcGVydHkoU3RhaXJQYXJhbUtleSwgc3RhaXJQYXJhbVN0cmluZykuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhaXJQYXJhbS5zdGFpck1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhaXJNYXRlcmlhbFN0cmluZyA9IHN0cmluZ2lmeU1hdGVyaWFsKHRoaXMuc3RhaXJQYXJhbS5zdGFpck1hdGVyaWFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBwYXJlbnREZWYuc2V0Q3VzdG9tUHJvcGVydHkoU3RhaXJNYXRlcmlhbEtleSwgc3RhaXJNYXRlcmlhbFN0cmluZykuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhaXJQYXJhbS5wbGF0Zm9ybU1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGxhdGZvcm1NYXRlcmlhbFN0cmluZyA9IHN0cmluZ2lmeU1hdGVyaWFsKHRoaXMuc3RhaXJQYXJhbS5wbGF0Zm9ybU1hdGVyaWFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBwYXJlbnREZWYuc2V0Q3VzdG9tUHJvcGVydHkoUGxhdGZvcm1NYXRlcmlhbEtleSwgcGxhdGZvcm1NYXRlcmlhbFN0cmluZykuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhaXJQYXJhbS5oYW5kcmFpbC5zdXBwb3J0ICYmIHRoaXMuc3RhaXJQYXJhbS5oYW5kcmFpbC5yYWlsLm1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmFpbE1hdGVyaWFsU3RyaW5nID0gc3RyaW5naWZ5TWF0ZXJpYWwodGhpcy5zdGFpclBhcmFtLmhhbmRyYWlsLnJhaWwubWF0ZXJpYWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIHBhcmVudERlZi5zZXRDdXN0b21Qcm9wZXJ0eShSYWlsTWF0ZXJpYWxLZXksIHJhaWxNYXRlcmlhbFN0cmluZykuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhaXJQYXJhbS5oYW5kcmFpbC5zdXBwb3J0ICYmIHRoaXMuc3RhaXJQYXJhbS5oYW5kcmFpbC5jb2x1bW4ubWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2x1bW5NYXRlcmlhbFN0cmluZyA9IHN0cmluZ2lmeU1hdGVyaWFsKHRoaXMuc3RhaXJQYXJhbS5oYW5kcmFpbC5jb2x1bW4ubWF0ZXJpYWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIHBhcmVudERlZi5zZXRDdXN0b21Qcm9wZXJ0eShDb2x1bW5NYXRlcmlhbEtleSwgY29sdW1uTWF0ZXJpYWxTdHJpbmcpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb25TdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWl0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZWwgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudDogeyBpbnN0YW5jZTogcGFyZW50SW5zdGFuY2UsIGRlZmluaXRpb25LZXk6ICgoX2YgPSBwYXJlbnRJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9mLmdldEtleSgpKSB8fCAnJywgaW5zdGFuY2VLZXk6IHBhcmVudEluc3RhbmNlLmdldEtleSgpIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyczogc3RhaXJzQ2hpbGQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXRmb3JtczogcGxhdGZvcm1DaGlsZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWw6IGhhbmRyYWlsSW5zdGFuY2VEYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWdtZW50cyA9IHZhbGlkU2VnbWVudHM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3VGVtcENvbXBvbmVudCh2YWxpZFNlZ21lbnRzWzBdLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLkRyYXdTdGFpck1vZGVsU2V0dGxlZCwgY29tcG9uZW50UGFyYW1zOiB0aGlzLnNlZ21lbnRzLm1hcChzZWcgPT4gKE9iamVjdC5hc3NpZ24oe30sIHNlZy5wYXJhbSkpKSwgc3RhaXJQYXJhbTogdGhpcy5zdGFpclBhcmFtLCBpc0RyYXdpbmc6IGZhbHNlIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFib3J0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXRFZGl0TW9kZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVkaXRNb2RlbDtcbiAgICB9XG4gICAgc2V0TW9kZWwoZ3JvdXBJbnN0YW5jZSkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgaWYgKHRoaXMuZWRpdE1vZGVsICYmIGlzUGFydE9mRWRpdE1vZGVsKHRoaXMuZWRpdE1vZGVsLCBncm91cEluc3RhbmNlKSkge1xuICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5Qcm9wZXJ0aWVzVmlzaWJsZSwgcHJvcGVydGllc1Zpc2libGU6IHRydWUgfSwgJyonKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNDb21wb25lbnQodGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZ3JvdXBEZWYgPSBncm91cEluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpO1xuICAgICAgICBpZiAoZ3JvdXBJbnN0YW5jZSAmJiBncm91cERlZikge1xuICAgICAgICAgICAgY29uc3Qgc3RhaXJNb2RlbFByb3BlcnR5ID0gZ3JvdXBEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoU3RhaXJNb2RlbEtleSk7XG4gICAgICAgICAgICBjb25zdCBzdGFpclBhcmFtUHJvcGVydHkgPSBncm91cERlZi5nZXRDdXN0b21Qcm9wZXJ0eShTdGFpclBhcmFtS2V5KTtcbiAgICAgICAgICAgIGNvbnN0IHN0YWlyUGFyYW0gPSBwYXJzZVN0YWlyUGFyYW0oc3RhaXJQYXJhbVByb3BlcnR5KTtcbiAgICAgICAgICAgIGNvbnN0IHN0YWlyTWF0ZXJpYWxQcm9wZXJ0eSA9IGdyb3VwRGVmLmdldEN1c3RvbVByb3BlcnR5KFN0YWlyTWF0ZXJpYWxLZXkpO1xuICAgICAgICAgICAgY29uc3Qgc3RhaXJNYXRlcmlhbCA9IHBhcnNlTWF0ZXJpYWwoc3RhaXJNYXRlcmlhbFByb3BlcnR5KTtcbiAgICAgICAgICAgIGlmIChzdGFpck1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgc3RhaXJQYXJhbS5zdGFpck1hdGVyaWFsID0gc3RhaXJNYXRlcmlhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHBsYXRmb3JtTWF0ZXJpYWxQcm9wZXJ0eSA9IGdyb3VwRGVmLmdldEN1c3RvbVByb3BlcnR5KFBsYXRmb3JtTWF0ZXJpYWxLZXkpO1xuICAgICAgICAgICAgY29uc3QgcGxhdGZvcm1NYXRlcmlhbCA9IHBhcnNlTWF0ZXJpYWwocGxhdGZvcm1NYXRlcmlhbFByb3BlcnR5KTtcbiAgICAgICAgICAgIGlmIChwbGF0Zm9ybU1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgc3RhaXJQYXJhbS5wbGF0Zm9ybU1hdGVyaWFsID0gcGxhdGZvcm1NYXRlcmlhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHJhaWxNYXRlcmlhbFByb3BlcnR5ID0gZ3JvdXBEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoUmFpbE1hdGVyaWFsS2V5KTtcbiAgICAgICAgICAgIGNvbnN0IHJhaWxNYXRlcmlhbCA9IHBhcnNlTWF0ZXJpYWwocmFpbE1hdGVyaWFsUHJvcGVydHkpO1xuICAgICAgICAgICAgaWYgKHJhaWxNYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgIHN0YWlyUGFyYW0uaGFuZHJhaWwucmFpbC5tYXRlcmlhbCA9IHJhaWxNYXRlcmlhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbk1hdGVyaWFsUHJvcGVydHkgPSBncm91cERlZi5nZXRDdXN0b21Qcm9wZXJ0eShDb2x1bW5NYXRlcmlhbEtleSk7XG4gICAgICAgICAgICBjb25zdCBjb2x1bW5NYXRlcmlhbCA9IHBhcnNlTWF0ZXJpYWwoY29sdW1uTWF0ZXJpYWxQcm9wZXJ0eSk7XG4gICAgICAgICAgICBpZiAoY29sdW1uTWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICBzdGFpclBhcmFtLmhhbmRyYWlsLmNvbHVtbi5tYXRlcmlhbCA9IGNvbHVtbk1hdGVyaWFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0YWlyTW9kZWxQcm9wZXJ0eSA9PT0gTW9kZWxWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlZ21lbnRzID0gW107XG4gICAgICAgICAgICAgICAgY29uc3Qgc3ViR3JvdXBJbnN0YW5jZXMgPSBncm91cERlZi5nZXRTdWJHcm91cEluc3RhbmNlcygpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVkaXRNb2RlbCA9IHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50OiB7IGluc3RhbmNlOiBncm91cEluc3RhbmNlLCBkZWZpbml0aW9uS2V5OiAoKF9hID0gZ3JvdXBJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmdldEtleSgpKSB8fCAnJywgaW5zdGFuY2VLZXk6IGdyb3VwSW5zdGFuY2UuZ2V0S2V5KCkgfSxcbiAgICAgICAgICAgICAgICAgICAgc3RhaXJzOiBuZXcgTWFwKCksXG4gICAgICAgICAgICAgICAgICAgIHBsYXRmb3JtczogbmV3IE1hcCgpLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBzdWJJbnN0YW5jZSBvZiBzdWJHcm91cEluc3RhbmNlcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdWJEZWYgPSBzdWJJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1YkRlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFuZHJhaWxQcm9wZXJ0eSA9IHN1YkRlZi5nZXRDdXN0b21Qcm9wZXJ0eShIYW5kcmFpbE1vZGVsS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoYW5kcmFpbFByb3BlcnR5ID09PSBNb2RlbFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFuZHJhaWxJbnN0YW5jZXNEYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbEluc3RhbmNlOiB7IGluc3RhbmNlOiBzdWJJbnN0YW5jZSwgaW5zdGFuY2VLZXk6IHN1Ykluc3RhbmNlLmdldEtleSgpLCBkZWZpbml0aW9uS2V5OiBzdWJEZWYuZ2V0S2V5KCkgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFpbEluc3RhbmNlczogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbkluc3RhbmNlczogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYW5kcmFpbFN1Ykdyb3VwSW5zdGFuY2VzID0gc3ViRGVmLmdldFN1Ykdyb3VwSW5zdGFuY2VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBoYW5kcmFpbFN1Ykluc3RhbmNlIG9mIGhhbmRyYWlsU3ViR3JvdXBJbnN0YW5jZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFuZHJhaWxTdWJEZWYgPSBoYW5kcmFpbFN1Ykluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGFuZHJhaWxTdWJEZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJhaWxQcm9wZXJ0eSA9IGhhbmRyYWlsU3ViRGVmLmdldEN1c3RvbVByb3BlcnR5KFJhaWxNb2RlbEtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2x1bW5Qcm9wZXJ0eSA9IGhhbmRyYWlsU3ViRGVmLmdldEN1c3RvbVByb3BlcnR5KENvbHVtbk1vZGVsS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyYWlsUHJvcGVydHkgPT09IE1vZGVsVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbEluc3RhbmNlc0RhdGEucmFpbEluc3RhbmNlcy5wdXNoKHsgaW5zdGFuY2U6IGhhbmRyYWlsU3ViSW5zdGFuY2UsIGluc3RhbmNlS2V5OiBoYW5kcmFpbFN1Ykluc3RhbmNlLmdldEtleSgpLCBkZWZpbml0aW9uS2V5OiBoYW5kcmFpbFN1YkRlZi5nZXRLZXkoKSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNvbHVtblByb3BlcnR5ID09PSBNb2RlbFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWxJbnN0YW5jZXNEYXRhLmNvbHVtbkluc3RhbmNlcy5wdXNoKHsgaW5zdGFuY2U6IGhhbmRyYWlsU3ViSW5zdGFuY2UsIGluc3RhbmNlS2V5OiBoYW5kcmFpbFN1Ykluc3RhbmNlLmdldEtleSgpLCBkZWZpbml0aW9uS2V5OiBoYW5kcmFpbFN1YkRlZi5nZXRLZXkoKSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0TW9kZWwuaGFuZHJhaWwgPSBoYW5kcmFpbEluc3RhbmNlc0RhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBjb21wb25lbnRJbmRleFZhbHVlID0gcGFyc2VJbnQoc3ViRGVmLmdldEN1c3RvbVByb3BlcnR5KENvbXBvbmVudEluZGV4S2V5KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGlzRmluaXRlKGNvbXBvbmVudEluZGV4VmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyYW0gPSBwYXJzZUNvbXBvbmVudFBhcmFtKHN1YkRlZi5nZXRDdXN0b21Qcm9wZXJ0eShDb21wb25lbnRQYXJhbUtleSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0RW5kID0gcGFyc2VTdGFydEVuZChzdWJEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoU3RhcnRFbmRLZXkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiYXNlTGluZVNlZzNkID0gcGFyc2VMaW5lU2VnM2Qoc3ViRGVmLmdldEN1c3RvbVByb3BlcnR5KEJhc2VMaW5lU2VnM2RLZXkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiYXNlQ29tcG9uZW50ID0gcGFyc2VCYXNlQ29tcG9uZW50KHN1YkRlZi5nZXRDdXN0b21Qcm9wZXJ0eShCYXNlQ29tcG9uZW50S2V5KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2lyY2xlVGFuZ2VudCA9IHBhcnNlVmVjdG9yM2Qoc3ViRGVmLmdldEN1c3RvbVByb3BlcnR5KENpcmNsZVRhbmdlbnRLZXkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21wb25lbnRNYXRlcmlhbFByb3BlcnR5ID0gZ3JvdXBEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoQ29tcG9uZW50TWF0ZXJpYWxLZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudE1hdGVyaWFsID0gcGFyc2VNYXRlcmlhbChjb21wb25lbnRNYXRlcmlhbFByb3BlcnR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50TWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW0ubWF0ZXJpYWwgPSBjb21wb25lbnRNYXRlcmlhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtICYmIHN0YXJ0RW5kICYmIGJhc2VMaW5lU2VnM2QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VnbWVudCA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgZ2V0TmV3U2VnbWVudChwYXJhbS50eXBlKSksIHsgc3RhcnQ6IHN0YXJ0RW5kLnN0YXJ0LCBlbmQ6IHN0YXJ0RW5kLmVuZCwgc3RhcnRIZWlnaHQ6IHN0YXJ0RW5kLnN0YXJ0SGVpZ2h0LCBlbmRIZWlnaHQ6IHN0YXJ0RW5kLmVuZEhlaWdodCwgYmFzZUNvbXBvbmVudDogeyBjb21wb25lbnRJbmRleDogYmFzZUNvbXBvbmVudCA9PT0gbnVsbCB8fCBiYXNlQ29tcG9uZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBiYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4LCBsaW5lM2RJbmRleDogYmFzZUNvbXBvbmVudCA9PT0gbnVsbCB8fCBiYXNlQ29tcG9uZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBiYXNlQ29tcG9uZW50LmxpbmUzZEluZGV4LCBsaW5lM2Q6IGJhc2VMaW5lU2VnM2QgfSwgY2lyY2xlVGFuZ2VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtLCBzdGFydExvY2tlZDogdHJ1ZSwgZW5kTG9ja2VkOiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50cy5wdXNoKHNlZ21lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdE1vZGVsLnBsYXRmb3Jtcy5zZXQocGFyYW0uaW5kZXgsIHsgaW5zdGFuY2U6IHN1Ykluc3RhbmNlLCBkZWZpbml0aW9uS2V5OiAoKF9iID0gc3ViSW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5nZXRLZXkoKSkgfHwgJycsIGluc3RhbmNlS2V5OiBzdWJJbnN0YW5jZS5nZXRLZXkoKSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRNb2RlbC5zdGFpcnMuc2V0KHBhcmFtLmluZGV4LCB7IGluc3RhbmNlOiBzdWJJbnN0YW5jZSwgZGVmaW5pdGlvbktleTogKChfYyA9IHN1Ykluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuZ2V0S2V5KCkpIHx8ICcnLCBpbnN0YW5jZUtleTogc3ViSW5zdGFuY2UuZ2V0S2V5KCkgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBzZWdtZW50cy5zb3J0KChhLCBiKSA9PiBhLnBhcmFtLmluZGV4IC0gYi5wYXJhbS5pbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnRzLmZvckVhY2gocyA9PiBnZW5lcmF0ZVNoYXBlKHMsIGZhbHNlKSk7XG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkU2VnbWVudFJlbGF0aW9ucyhzZWdtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VnbWVudHMgPSBzZWdtZW50cztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZWwgPSBlZGl0TW9kZWw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhaXJQYXJhbSA9IHN0YWlyUGFyYW07XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuZHJhd1RlbXBDb21wb25lbnQoc2VnbWVudHNbMF0sIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzQ29tcG9uZW50KHNlZ21lbnRzWzBdLnBhcmFtLmluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5EcmF3U3RhaXJNb2RlbFNldHRsZWQsIGNvbXBvbmVudFBhcmFtczogdGhpcy5zZWdtZW50cy5tYXAoc2VnID0+IChPYmplY3QuYXNzaWduKHt9LCBzZWcucGFyYW0pKSksIHN0YWlyUGFyYW06IHRoaXMuc3RhaXJQYXJhbSwgaXNEcmF3aW5nOiBmYWxzZSB9LCAnKicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuUHJvcGVydGllc1Zpc2libGUsIHByb3BlcnRpZXNWaXNpYmxlOiBmYWxzZSB9LCAnKicpO1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNsZWFyRWRpdE1vZGVsKCkge1xuICAgICAgICB0aGlzLmVkaXRNb2RlbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zZWdtZW50cyA9IFtdO1xuICAgICAgICB0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggPSBEZWZhdWx0Rm9jdXNlZENvbXBvbmVudEluZGV4O1xuICAgICAgICBhcHBWaWV3LmNsZWFyVGVtcG9yYXJ5U2hhcGVzKCk7XG4gICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuRHJhd1N0YWlyTW9kZWxTZXR0bGVkLCBpc0RyYXdpbmc6IGZhbHNlIH0sICcqJyk7XG4gICAgfVxuICAgIGNsZWFyKCkge1xuICAgICAgICBhcHBWaWV3LmNsZWFyVGVtcG9yYXJ5U2hhcGVzKCk7XG4gICAgICAgIC8vIHRoaXMuY29tcG9uZW50UGFyYW0gPSB7IC4uLkRlZmF1bHRDb21wb25lbnRQYXJhbSB9O1xuICAgICAgICAvLyB0aGlzLnNlZ21lbnRzID0gW107XG4gICAgICAgIHRoaXMuZHJhd2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCA9IERlZmF1bHRGb2N1c2VkQ29tcG9uZW50SW5kZXg7XG4gICAgICAgIHRoaXMuc3RhaXJQYXJhbSA9IE9iamVjdC5hc3NpZ24oe30sIERlZmF1bHRTdGFpclBhcmFtKTtcbiAgICAgICAgLy8gdGhpcy5lZGl0TW9kZWwgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIG9uTEJ1dHRvbkRiQ2xpY2soZXZlbnQsIGluZmVyZW5jZVJlc3VsdCkge1xuICAgICAgICA7XG4gICAgfVxuICAgIGFsbG93VXNpbmdJbmZlcmVuY2UoKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBvbktleURvd24oZXZlbnQpIHtcbiAgICAgICAgO1xuICAgIH1cbiAgICBvbktleVVwKGV2ZW50KSB7XG4gICAgICAgIDtcbiAgICB9XG4gICAgZ2VuZXJhdGVTZWdtZW50U2hhcGUoc2VnbWVudCwgdGVtcCA9IHRydWUpIHtcbiAgICAgICAgZ2VuZXJhdGVTaGFwZShzZWdtZW50LCB0ZW1wKTtcbiAgICAgICAgLy8gdGhpcy5nZW5lcmF0ZUhhbmRyYWlsU2hhcGUoKTtcbiAgICB9XG4gICAgZ2VuZXJhdGVIYW5kcmFpbFNoYXBlKHN0YWlyUGFyYW0gPSB0aGlzLnN0YWlyUGFyYW0pIHtcbiAgICAgICAgaWYgKHRoaXMuc2VnbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBoYW5kcmFpbHMgPSBnZW5lcmF0ZUhhbmRyYWlsU2hhcGUoc3RhaXJQYXJhbSwgdGhpcy5zZWdtZW50cyk7XG4gICAgICAgICAgICB0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbiA9IHsgaGFuZHJhaWxzOiBoYW5kcmFpbHMgfHwgW10gfTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBjb25zdCBkcmF3U3RhaXJzVG9vbCA9IG5ldyBEcmF3U3RhaXJzVG9vbCgpO1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBBbmdsZVRvbGVyYW5jZSwgRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UsIERpcmVjdGlvblosIGR1bW15UG9pbnQzZCwgZHVtbXlWZWN0b3IzZCwgTGVuZ3RoVG9sZXJhbmNlLCBTdGVwQ291bnRMaW1pdCB9IGZyb20gXCIuL2NvbnN0c1wiO1xuaW1wb3J0IHsgZ2VuZXJhdGVTaGFwZSB9IGZyb20gXCIuL3RlbXBNZXNoVXRpbHNcIjtcbmltcG9ydCB7IEJhc2VDb21wb25lbnRLZXksIEJhc2VMaW5lU2VnM2RLZXksIENpcmNsZVRhbmdlbnRLZXksIENvbHVtblR5cGUsIENvbXBvbmVudFR5cGUsIERlZmF1bHRTdGFpclBhcmFtLCBIYW5kcmFpbE1vZGVsS2V5LCBSYWlsVHlwZSwgTW9kZWxWYWx1ZSwgU3RhcnRFbmRLZXksIFByZXNldE1hdGVyaWFscywgQ29sdW1uTW9kZWxLZXksIFJhaWxNb2RlbEtleSwgQ29tcG9uZW50UGFyYW1LZXksIENpcmN1bGFyU2lkZSwgQ29tcG9uZW50TWF0ZXJpYWxLZXksIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IGdldENvb3JkaW5hdGUsIGlzRXF1YWwsIHN0cmluZ2lmeUJhc2VDb21wb25lbnQsIHN0cmluZ2lmeUNvbXBvbmVudFBhcmFtLCBzdHJpbmdpZnlNYXRlcmlhbCwgc3RyaW5naWZ5UG9pbnQzZCwgc3RyaW5naWZ5U3RhcnRFbmQgfSBmcm9tIFwiLi91dGlsc1wiO1xuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlTWVzaGVzKHNlZ21lbnRzKSB7XG4gICAgY29uc3QgbWVzaGVzID0gW107XG4gICAgZm9yIChjb25zdCBzZWdtZW50IG9mIHNlZ21lbnRzKSB7XG4gICAgICAgIGNvbnN0IHsgcGFyYW06IHsgdHlwZSB9LCBjaXJjbGVUYW5nZW50IH0gPSBzZWdtZW50O1xuICAgICAgICBpZiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyKSB7XG4gICAgICAgICAgICBnZW5lcmF0ZVN0cmFpZ2h0U3RhaXJNZXNoKHNlZ21lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpcikge1xuICAgICAgICAgICAgaWYgKGNpcmNsZVRhbmdlbnQpIHtcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZUNpcmN1bGFyU3RhaXJNZXNoKHNlZ21lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVTdHJhaWdodFN0YWlyTWVzaChzZWdtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGdlbmVyYXRlUGxhdGZvcm1NZXNoKHNlZ21lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWdtZW50Lm1lc2gpIHtcbiAgICAgICAgICAgIG1lc2hlcy5wdXNoKHNlZ21lbnQubWVzaCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1lc2hlcztcbn1cbmZ1bmN0aW9uIGdlbmVyYXRlQ2lyY3VsYXJTdGFpck1lc2goc2VnbWVudCkge1xuICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mLCBfZywgX2gsIF9qLCBfaywgX2w7XG4gICAgY29uc3QgeyBzdGFydExvY2tlZCwgY2lyY2xlVGFuZ2VudCwgc3RhaXJTaGFwZTogeyB2ZXJ0aWNlcywgc3RlcENvdW50IH0sIGNvcm5lclNoYXBlOiB7IHZlcnRpY2VzOiBjb3JuZXJWZXJ0aWNlcyB9LCBwYXJhbTogeyB1cHdhcmQgfSB9ID0gc2VnbWVudDtcbiAgICBpZiAoc3RlcENvdW50IDwgMSB8fCAhc3RhcnRMb2NrZWQgfHwgIWNpcmNsZVRhbmdlbnQpXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgY29uc3Qgc3RhaXJNZXNoID0ge1xuICAgICAgICB2ZXJ0aWNlczogdmVydGljZXMubWFwKHZlcnRleCA9PiBbdmVydGV4LngsIHZlcnRleC55LCB2ZXJ0ZXguel0pLFxuICAgICAgICB0cmlhbmdsZUluZGljZXM6IFtdLFxuICAgICAgICBzb2Z0RWRnZXM6IFtdLFxuICAgIH07XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGVwQ291bnQ7IGkrKykge1xuICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXG4gICAgICAgIC8vIHN0YWlyIGZhY2VzXG4gICAgICAgIFtpICogNCwgaSAqIDQgKyAxLCBpICogNCArIDJdLCBbaSAqIDQgKyAxLCBpICogNCArIDMsIGkgKiA0ICsgMl0sIFtpICogNCArIDIsIGkgKiA0ICsgMywgaSAqIDQgKyA0XSwgW2kgKiA0ICsgMywgaSAqIDQgKyA1LCBpICogNCArIDRdLCBcbiAgICAgICAgLy8gc2lkZSBmYWNlcyAodXApXG4gICAgICAgIFtpICogNCwgaSAqIDQgKyAyLCAoaSArIDEpICogNF0sIFtpICogNCArIDEsIChpICsgMSkgKiA0ICsgMSwgaSAqIDQgKyAzXSk7XG4gICAgICAgIChfYSA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wdXNoKFtpICogNCArIDEsIGkgKiA0ICsgMl0sIFtpICogNCArIDMsIGkgKiA0ICsgNF0sIFtpICogNCwgKGkgKyAxKSAqIDRdLCBbKGkgKyAxKSAqIDQgKyAxLCBpICogNCArIDFdKTtcbiAgICAgICAgaWYgKHVwd2FyZCkge1xuICAgICAgICAgICAgY29uc3QgYm90dG9tRnJvbnRMZWZ0SW5kZXggPSA0ICogc3RlcENvdW50ICsgMiArIDIgKiAoc3RlcENvdW50IC0gaSAtIDEpO1xuICAgICAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAgICAgLy8gc2lkZSBmYWNlcyAobWlkZGxlKVxuICAgICAgICAgICAgW2kgKiA0LCAoaSArIDEpICogNCwgYm90dG9tRnJvbnRMZWZ0SW5kZXhdLCBbKGkgKyAxKSAqIDQgKyAxLCBpICogNCArIDEsIGJvdHRvbUZyb250TGVmdEluZGV4ICsgMV0pO1xuICAgICAgICAgICAgaWYgKGkgPCBzdGVwQ291bnQgLSAxKSB7XG4gICAgICAgICAgICAgICAgKF9iID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnB1c2goWyhpICsgMSkgKiA0LCBib3R0b21Gcm9udExlZnRJbmRleF0sIFsoaSArIDEpICogNCArIDEsIGJvdHRvbUZyb250TGVmdEluZGV4ICsgMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAgICAgICAgIC8vIHNpZGUgZmFjZXMgKGJvdHRvbSlcbiAgICAgICAgICAgICAgICBbaSAqIDQsIGJvdHRvbUZyb250TGVmdEluZGV4LCBib3R0b21Gcm9udExlZnRJbmRleCArIDJdLCBbYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAxLCBpICogNCArIDEsIGJvdHRvbUZyb250TGVmdEluZGV4ICsgM10sIFxuICAgICAgICAgICAgICAgIC8vIGJvdHRvbSBmYWNlc1xuICAgICAgICAgICAgICAgIFtib3R0b21Gcm9udExlZnRJbmRleCArIDIsIGJvdHRvbUZyb250TGVmdEluZGV4LCBib3R0b21Gcm9udExlZnRJbmRleCArIDNdLCBbYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAzLCBib3R0b21Gcm9udExlZnRJbmRleCwgYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAxXSk7XG4gICAgICAgICAgICAgICAgKF9jID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnB1c2goW2kgKiA0LCBib3R0b21Gcm9udExlZnRJbmRleF0sIFtpICogNCArIDEsIGJvdHRvbUZyb250TGVmdEluZGV4ICsgMV0sIFtib3R0b21Gcm9udExlZnRJbmRleCArIDMsIGJvdHRvbUZyb250TGVmdEluZGV4XSk7XG4gICAgICAgICAgICAgICAgaWYgKGkgPCBzdGVwQ291bnQgLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIChfZCA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5wdXNoKFtib3R0b21Gcm9udExlZnRJbmRleCArIDEsIGJvdHRvbUZyb250TGVmdEluZGV4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAgICAgICAgIC8vIGJvdHRvbSBmYWNlc1xuICAgICAgICAgICAgICAgIFtpICogNCwgYm90dG9tRnJvbnRMZWZ0SW5kZXgsIGkgKiA0ICsgMV0sIFtpICogNCArIDEsIGJvdHRvbUZyb250TGVmdEluZGV4LCBib3R0b21Gcm9udExlZnRJbmRleCArIDFdKTtcbiAgICAgICAgICAgICAgICAoX2UgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2UucHVzaChbaSAqIDQgKyAxLCBib3R0b21Gcm9udExlZnRJbmRleF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgYm90dG9tQmFja0xlZnRJbmRleCA9IDQgKiBzdGVwQ291bnQgKyAyICsgMiAqIChzdGVwQ291bnQgLSBpIC0gMSk7XG4gICAgICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXG4gICAgICAgICAgICAvLyBzaWRlIGZhY2VzIChtaWRkbGUpXG4gICAgICAgICAgICBbaSAqIDQsIChpICsgMSkgKiA0LCBib3R0b21CYWNrTGVmdEluZGV4XSwgWyhpICsgMSkgKiA0ICsgMSwgaSAqIDQgKyAxLCBib3R0b21CYWNrTGVmdEluZGV4ICsgMV0sIFxuICAgICAgICAgICAgLy8gYm90dG9tIGZhY2VzXG4gICAgICAgICAgICBbYm90dG9tQmFja0xlZnRJbmRleCwgYm90dG9tQmFja0xlZnRJbmRleCAtIDIsIGJvdHRvbUJhY2tMZWZ0SW5kZXggKyAxXSwgW2JvdHRvbUJhY2tMZWZ0SW5kZXggKyAxLCBib3R0b21CYWNrTGVmdEluZGV4IC0gMiwgYm90dG9tQmFja0xlZnRJbmRleCAtIDFdKTtcbiAgICAgICAgICAgIChfZiA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZi5wdXNoKFtib3R0b21CYWNrTGVmdEluZGV4ICsgMSwgYm90dG9tQmFja0xlZnRJbmRleCAtIDJdKTtcbiAgICAgICAgICAgIGlmIChpIDwgc3RlcENvdW50IC0gMSkge1xuICAgICAgICAgICAgICAgIChfZyA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9nID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZy5wdXNoKFsoaSArIDEpICogNCwgYm90dG9tQmFja0xlZnRJbmRleF0sIFsoaSArIDEpICogNCArIDEsIGJvdHRvbUJhY2tMZWZ0SW5kZXggKyAxXSk7XG4gICAgICAgICAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAgICAgICAgIC8vIHNpZGUgZmFjZXMgKGJvdHRvbSlcbiAgICAgICAgICAgICAgICBbKGkgKyAxKSAqIDQsIGJvdHRvbUJhY2tMZWZ0SW5kZXggLSAyLCBib3R0b21CYWNrTGVmdEluZGV4XSwgW2JvdHRvbUJhY2tMZWZ0SW5kZXggLSAxLCAoaSArIDEpICogNCArIDEsIGJvdHRvbUJhY2tMZWZ0SW5kZXggKyAxXSk7XG4gICAgICAgICAgICAgICAgKF9oID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9oLnB1c2goWyhpICsgMSkgKiA0LCBib3R0b21CYWNrTGVmdEluZGV4IC0gMl0sIFsoaSArIDEpICogNCArIDEsIGJvdHRvbUJhY2tMZWZ0SW5kZXggLSAxXSwgW2JvdHRvbUJhY2tMZWZ0SW5kZXggKyAxLCBib3R0b21CYWNrTGVmdEluZGV4IC0gMl0pO1xuICAgICAgICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAoX2ogPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfaiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2oucHVzaChbYm90dG9tQmFja0xlZnRJbmRleCArIDEsIGJvdHRvbUJhY2tMZWZ0SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHVwd2FyZCkge1xuICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXG4gICAgICAgIC8vIOWJjeS+p+mdolxuICAgICAgICBbc3RlcENvdW50ICogNCwgc3RlcENvdW50ICogNCArIDEsIHN0ZXBDb3VudCAqIDQgKyAyXSwgW3N0ZXBDb3VudCAqIDQgKyAxLCBzdGVwQ291bnQgKiA0ICsgMywgc3RlcENvdW50ICogNCArIDJdKTtcbiAgICAgICAgKF9rID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2sgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9rLnB1c2goW3N0ZXBDb3VudCAqIDQgKyAxLCBzdGVwQ291bnQgKiA0ICsgMl0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAvLyDlkI7kvqfpnaJcbiAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIDEsIDBdLCBbdmVydGljZXMubGVuZ3RoIC0gMSwgMCwgdmVydGljZXMubGVuZ3RoIC0gMl0pO1xuICAgICAgICAoX2wgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2wucHVzaChbdmVydGljZXMubGVuZ3RoIC0gMSwgMF0pO1xuICAgIH1cbiAgICBpZiAoY29ybmVyVmVydGljZXMubGVuZ3RoID09PSA2KSB7XG4gICAgICAgIGdlbmVyYXRlUG9seWdvbk1lc2goY29ybmVyVmVydGljZXMsIHN0YWlyTWVzaCk7XG4gICAgfVxuICAgIHNlZ21lbnQubWVzaCA9IHN0YWlyTWVzaDtcbn1cbmZ1bmN0aW9uIGdlbmVyYXRlU3RyYWlnaHRTdGFpck1lc2goc2VnbWVudCkge1xuICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mLCBfZywgX2gsIF9qLCBfaztcbiAgICBjb25zdCB7IHN0YXJ0TG9ja2VkLCBzdGFpclNoYXBlOiB7IHZlcnRpY2VzLCBzdGVwQ291bnQgfSwgY29ybmVyU2hhcGU6IHsgdmVydGljZXM6IGNvcm5lclZlcnRpY2VzIH0sIHBhcmFtOiB7IHVwd2FyZCB9IH0gPSBzZWdtZW50O1xuICAgIGlmIChzdGVwQ291bnQgPCAxIHx8ICFzdGFydExvY2tlZClcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBjb25zdCBzdGFpck1lc2ggPSB7XG4gICAgICAgIHZlcnRpY2VzOiB2ZXJ0aWNlcy5tYXAodmVydGV4ID0+IFt2ZXJ0ZXgueCwgdmVydGV4LnksIHZlcnRleC56XSksXG4gICAgICAgIHRyaWFuZ2xlSW5kaWNlczogW10sXG4gICAgICAgIHNvZnRFZGdlczogW10sXG4gICAgfTtcbiAgICBjb25zdCBsZWZ0SW5kZXggPSB2ZXJ0aWNlcy5sZW5ndGggLSAoKCF1cHdhcmQgJiYgc3RlcENvdW50ID4gMSkgPyA0IDogMik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGVwQ291bnQ7IGkrKykge1xuICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXG4gICAgICAgIC8vIHN0YWlyIGZhY2VzXG4gICAgICAgIFtpICogNCwgaSAqIDQgKyAxLCBpICogNCArIDJdLCBbaSAqIDQgKyAxLCBpICogNCArIDMsIGkgKiA0ICsgMl0sIFtpICogNCArIDIsIGkgKiA0ICsgMywgaSAqIDQgKyA0XSwgW2kgKiA0ICsgMywgaSAqIDQgKyA1LCBpICogNCArIDRdLCBcbiAgICAgICAgLy8gc2lkZSBmYWNlc1xuICAgICAgICBbaSAqIDQsIGkgKiA0ICsgMiwgKGkgKyAxKSAqIDRdLCBbaSAqIDQgKyAxLCAoaSArIDEpICogNCArIDEsIGkgKiA0ICsgM10pO1xuICAgICAgICAoX2EgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucHVzaChbaSAqIDQgKyAxLCBpICogNCArIDJdLCBbaSAqIDQgKyAzLCBpICogNCArIDRdLCBbaSAqIDQsIChpICsgMSkgKiA0XSwgWyhpICsgMSkgKiA0ICsgMSwgaSAqIDQgKyAxXSk7XG4gICAgICAgIGlmIChpID09PSBzdGVwQ291bnQgLSAxICYmIHVwd2FyZCAmJiBzdGVwQ291bnQgPiAxKSB7XG4gICAgICAgICAgICBjb25zdCBiYkxlZnRJbmRleCA9IHZlcnRpY2VzLmxlbmd0aCAtIDQ7XG4gICAgICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXG4gICAgICAgICAgICAvLyB0YWlsIHNpZGUgZmFjZXNcbiAgICAgICAgICAgIFtiYkxlZnRJbmRleCwgaSAqIDQsIChpICsgMSkgKiA0XSwgW2JiTGVmdEluZGV4ICsgMSwgKGkgKyAxKSAqIDQgKyAxLCBpICogNCArIDFdKTtcbiAgICAgICAgICAgIChfYiA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5wdXNoKFtiYkxlZnRJbmRleCwgaSAqIDRdLCBbYmJMZWZ0SW5kZXggKyAxLCBpICogNCArIDFdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgICAgIC8vIHNpZGUgZmFjZXNcbiAgICAgICAgICAgIFtsZWZ0SW5kZXgsIGkgKiA0LCAoaSArIDEpICogNF0sIFtsZWZ0SW5kZXggKyAxLCAoaSArIDEpICogNCArIDEsIGkgKiA0ICsgMV0pO1xuICAgICAgICAgICAgaWYgKHVwd2FyZCkge1xuICAgICAgICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAoX2MgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MucHVzaChbbGVmdEluZGV4LCBpICogNF0sIFtsZWZ0SW5kZXggKyAxLCBpICogNCArIDFdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN0ZXBDb3VudCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgKF9kID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLnB1c2goW2xlZnRJbmRleCwgKGkgKyAxKSAqIDRdLCBbbGVmdEluZGV4ICsgMSwgKGkgKyAxKSAqIDQgKyAxXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0ZXBDb3VudCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgKF9lID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lLnB1c2goW2xlZnRJbmRleCwgaSAqIDRdLCBbbGVmdEluZGV4ICsgMSwgaSAqIDQgKyAxXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpIDwgc3RlcENvdW50IC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAoX2YgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2YucHVzaChbbGVmdEluZGV4LCAoaSArIDEpICogNF0sIFtsZWZ0SW5kZXggKyAxLCAoaSArIDEpICogNCArIDFdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHVwd2FyZCkge1xuICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXG4gICAgICAgIC8vIGJvdHRvbSBmYWNlc1xuICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gMSwgMSwgMF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCAwLCB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDEsIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbdmVydGljZXMubGVuZ3RoIC0gMywgdmVydGljZXMubGVuZ3RoIC0gMiwgdmVydGljZXMubGVuZ3RoIC0gNF0pO1xuICAgICAgICAoX2cgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2cucHVzaChbdmVydGljZXMubGVuZ3RoIC0gMSwgMF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAzLCB2ZXJ0aWNlcy5sZW5ndGggLSAyXSk7XG4gICAgICAgIGlmIChzdGVwQ291bnQgPiAxKSB7XG4gICAgICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXG4gICAgICAgICAgICAvLyBzaWRlIGJvdHRvbSBmYWNlc1xuICAgICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIHZlcnRpY2VzLmxlbmd0aCAtIDEwLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIHZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDldLCBcbiAgICAgICAgICAgIC8vIGJvdHRvbSBmYWNlc1xuICAgICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLCBbdmVydGljZXMubGVuZ3RoIC0gNSwgdmVydGljZXMubGVuZ3RoIC0gNCwgdmVydGljZXMubGVuZ3RoIC0gNl0pO1xuICAgICAgICAgICAgKF9oID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9oLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLCBbdmVydGljZXMubGVuZ3RoIC0gMiwgdmVydGljZXMubGVuZ3RoIC0gMTBdLCBbdmVydGljZXMubGVuZ3RoIC0gMTAsIHZlcnRpY2VzLmxlbmd0aCAtIDRdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAvLyBib3R0b20gZmFjZXNcbiAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIDAsIDFdLCBbdmVydGljZXMubGVuZ3RoIC0gMSwgdmVydGljZXMubGVuZ3RoIC0gMiwgMF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAzLCB2ZXJ0aWNlcy5sZW5ndGggLSAyLCB2ZXJ0aWNlcy5sZW5ndGggLSAxXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDQsIHZlcnRpY2VzLmxlbmd0aCAtIDJdKTtcbiAgICAgICAgKF9qID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2ogPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9qLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIDBdLCBbdmVydGljZXMubGVuZ3RoIC0gMywgdmVydGljZXMubGVuZ3RoIC0gMl0pO1xuICAgICAgICBpZiAoc3RlcENvdW50ID4gMSkge1xuICAgICAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAgICAgLy8gc2lkZSBib3R0b20gZmFjZXNcbiAgICAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSAyLCAwLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIHZlcnRpY2VzLmxlbmd0aCAtIDMsIDFdLCBcbiAgICAgICAgICAgIC8vIGJvdHRvbSBmYWNlc1xuICAgICAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDQsIHZlcnRpY2VzLmxlbmd0aCAtIDNdLCBbdmVydGljZXMubGVuZ3RoIC0gNSwgdmVydGljZXMubGVuZ3RoIC0gNiwgdmVydGljZXMubGVuZ3RoIC0gNF0pO1xuICAgICAgICAgICAgKF9rID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2sgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9rLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDRdLCBbdmVydGljZXMubGVuZ3RoIC0gMywgMV0sIFswLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNvcm5lclZlcnRpY2VzLmxlbmd0aCA9PT0gNikge1xuICAgICAgICBnZW5lcmF0ZVBvbHlnb25NZXNoKGNvcm5lclZlcnRpY2VzLCBzdGFpck1lc2gpO1xuICAgIH1cbiAgICBzZWdtZW50Lm1lc2ggPSBzdGFpck1lc2g7XG59XG5mdW5jdGlvbiBnZW5lcmF0ZVBsYXRmb3JtTWVzaChzZWdtZW50KSB7XG4gICAgY29uc3QgeyBzdGFpclNoYXBlOiB7IHZlcnRpY2VzIH0gfSA9IHNlZ21lbnQ7XG4gICAgY29uc3QgdmVydGV4TGVuZ3RoID0gdmVydGljZXMubGVuZ3RoIC8gMjtcbiAgICBpZiAodmVydGV4TGVuZ3RoID09PSA0IHx8IHZlcnRleExlbmd0aCA9PT0gNSkge1xuICAgICAgICBjb25zdCBwbGF0Zm9ybU1lc2ggPSB7XG4gICAgICAgICAgICB2ZXJ0aWNlczogW10sXG4gICAgICAgICAgICB0cmlhbmdsZUluZGljZXM6IFtdLFxuICAgICAgICAgICAgc29mdEVkZ2VzOiBbXSxcbiAgICAgICAgfTtcbiAgICAgICAgZ2VuZXJhdGVQb2x5Z29uTWVzaCh2ZXJ0aWNlcywgcGxhdGZvcm1NZXNoKTtcbiAgICAgICAgc2VnbWVudC5tZXNoID0gcGxhdGZvcm1NZXNoO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuZnVuY3Rpb24gZ2VuZXJhdGVQb2x5Z29uTWVzaCh2ZXJ0aWNlcywgbWVzaCkge1xuICAgIHZhciBfYSwgX2I7XG4gICAgY29uc3QgdmVydGV4TGVuZ3RoID0gbWVzaC52ZXJ0aWNlcy5sZW5ndGg7XG4gICAgbWVzaC52ZXJ0aWNlcy5wdXNoKC4uLnZlcnRpY2VzLm1hcCh2ZXJ0ZXggPT4gW3ZlcnRleC54LCB2ZXJ0ZXgueSwgdmVydGV4LnpdKSk7XG4gICAgY29uc3Qgc2VnQ291bnQgPSB2ZXJ0aWNlcy5sZW5ndGggLyAyO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VnQ291bnQ7IGkrKykge1xuICAgICAgICBjb25zdCByaWdodCA9IGkgPT09IHNlZ0NvdW50IC0gMSA/IDAgOiBpICsgMTtcbiAgICAgICAgY29uc3QgYm90dG9tUmlnaHQgPSBpID09PSBzZWdDb3VudCAtIDEgPyBzZWdDb3VudCA6IGkgKyBzZWdDb3VudCArIDE7XG4gICAgICAgIG1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goW2kgKyB2ZXJ0ZXhMZW5ndGgsIGkgKyBzZWdDb3VudCArIHZlcnRleExlbmd0aCwgYm90dG9tUmlnaHQgKyB2ZXJ0ZXhMZW5ndGhdLCBbaSArIHZlcnRleExlbmd0aCwgYm90dG9tUmlnaHQgKyB2ZXJ0ZXhMZW5ndGgsIHJpZ2h0ICsgdmVydGV4TGVuZ3RoXSk7XG4gICAgICAgIChfYSA9IG1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucHVzaChbaSArIHZlcnRleExlbmd0aCwgYm90dG9tUmlnaHQgKyB2ZXJ0ZXhMZW5ndGhdKTtcbiAgICAgICAgaWYgKGkgPiAwICYmIGkgPCBzZWdDb3VudCAtIDEpIHtcbiAgICAgICAgICAgIG1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXG4gICAgICAgICAgICAvLyB0b3AgYW5kIGJvdHRvbVxuICAgICAgICAgICAgW2kgKyB2ZXJ0ZXhMZW5ndGgsIHJpZ2h0ICsgdmVydGV4TGVuZ3RoLCAwICsgdmVydGV4TGVuZ3RoXSwgW2JvdHRvbVJpZ2h0ICsgdmVydGV4TGVuZ3RoLCBpICsgc2VnQ291bnQgKyB2ZXJ0ZXhMZW5ndGgsIHNlZ0NvdW50ICsgdmVydGV4TGVuZ3RoXSk7XG4gICAgICAgICAgICBpZiAoaSA+IDEpIHtcbiAgICAgICAgICAgICAgICAoX2IgPSBtZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnB1c2goW2ksIDAgKyB2ZXJ0ZXhMZW5ndGhdLCBbaSArIHNlZ0NvdW50ICsgdmVydGV4TGVuZ3RoLCBzZWdDb3VudCArIHZlcnRleExlbmd0aF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGxvYWREZWZhdWx0TWF0ZXJpYWxzKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IGRlc2lnbiA9IGFwcC5nZXRBY3RpdmVEZXNpZ24oKTtcbiAgICAgICAgY29uc3QgcmVzMSA9IHlpZWxkIGRlc2lnbi5sb2FkTWF0ZXJpYWwoUHJlc2V0TWF0ZXJpYWxzLlN0YWlyLm1hdGVyaWFsSWQpO1xuICAgICAgICBpZiAoIXJlczEuaXNTdWNjZXNzKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzMiA9IHlpZWxkIGRlc2lnbi5sb2FkTWF0ZXJpYWwoUHJlc2V0TWF0ZXJpYWxzLlBsYXRmb3JtLm1hdGVyaWFsSWQpO1xuICAgICAgICBpZiAoIXJlczIuaXNTdWNjZXNzKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzMyA9IHlpZWxkIGRlc2lnbi5sb2FkTWF0ZXJpYWwoUHJlc2V0TWF0ZXJpYWxzLkhhbmRyYWlsLnJhaWwubWF0ZXJpYWxJZCk7XG4gICAgICAgIGlmICghcmVzMy5pc1N1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXM0ID0geWllbGQgZGVzaWduLmxvYWRNYXRlcmlhbChQcmVzZXRNYXRlcmlhbHMuSGFuZHJhaWwuY29sdW1uLm1hdGVyaWFsSWQpO1xuICAgICAgICBpZiAoIXJlczQuaXNTdWNjZXNzKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gYnVpbGRDb21wb25lbnRJbnN0YW5jZShzZWdtZW50LCBzZWdtZW50cywgcGFyZW50VHJhbnNmb3JtKSB7XG4gICAgdmFyIF9hLCBfYjtcbiAgICBjb25zdCB7IHN0YXJ0LCBlbmQsIHN0YXJ0SGVpZ2h0LCBlbmRIZWlnaHQsIGJhc2VDb21wb25lbnQsIGNpcmNsZVRhbmdlbnQsIHBhcmFtLCBtZXNoIH0gPSBzZWdtZW50O1xuICAgIGNvbnN0IGRlc2lnbiA9IGFwcC5nZXRBY3RpdmVEZXNpZ24oKTtcbiAgICBsZXQgb3BlcmF0aW9uU3VjY2VzcyA9IHRydWU7XG4gICAgaWYgKG1lc2ggPT09IG51bGwgfHwgbWVzaCA9PT0gdm9pZCAwID8gdm9pZCAwIDogbWVzaC52ZXJ0aWNlcy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgbmV3U2hlbGwgPSAoX2EgPSBkZXNpZ24uY3JlYXRlU2hlbGxGcm9tTWVzaChtZXNoKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm5ld1NoZWxsO1xuICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAhIW5ld1NoZWxsO1xuICAgICAgICBpZiAobmV3U2hlbGwpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0luc3RhbmNlID0gKF9iID0gZGVzaWduLm1ha2VHcm91cChuZXdTaGVsbC5nZXRGYWNlcygpLCBbXSwgW10pKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuYWRkZWRJbnN0YW5jZTtcbiAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICEhbmV3SW5zdGFuY2U7XG4gICAgICAgICAgICBjb25zdCBncm91cERlZiA9IG5ld0luc3RhbmNlID09PSBudWxsIHx8IG5ld0luc3RhbmNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBuZXdJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKTtcbiAgICAgICAgICAgIGlmIChuZXdJbnN0YW5jZSAmJiBncm91cERlZikge1xuICAgICAgICAgICAgICAgIGlmIChwYXJlbnRUcmFuc2Zvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdHJhbnNmb3JtUmVzID0gZGVzaWduLnRyYW5zZm9ybUdyb3VwSW5zdGFuY2VzKFtuZXdJbnN0YW5jZV0sIHBhcmVudFRyYW5zZm9ybS5pbnZlcnNlZCgpKTtcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgdHJhbnNmb3JtUmVzLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWxPYmplY3QgPSBwYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtID8gUHJlc2V0TWF0ZXJpYWxzLlBsYXRmb3JtIDogUHJlc2V0TWF0ZXJpYWxzLlN0YWlyO1xuICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGRlc2lnbi5hc3NpZ25NYXRlcmlhbEZvckVudGl0aWVzKFtuZXdJbnN0YW5jZV0sIG1hdGVyaWFsT2JqZWN0Lm1hdGVyaWFsSWQsIG1hdGVyaWFsT2JqZWN0LmJnSWQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhcmFtU3RyaW5nID0gc3RyaW5naWZ5Q29tcG9uZW50UGFyYW0ocGFyYW0pO1xuICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGdyb3VwRGVmLnNldEN1c3RvbVByb3BlcnR5KENvbXBvbmVudFBhcmFtS2V5LCBwYXJhbVN0cmluZykuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgIGlmIChwYXJhbS5tYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21wb25lbnRNYXRlcmlhbFN0cmluZyA9IHN0cmluZ2lmeU1hdGVyaWFsKHBhcmFtLm1hdGVyaWFsKTtcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZ3JvdXBEZWYuc2V0Q3VzdG9tUHJvcGVydHkoQ29tcG9uZW50TWF0ZXJpYWxLZXksIGNvbXBvbmVudE1hdGVyaWFsU3RyaW5nKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0RW5kU3RyaW5nID0gc3RyaW5naWZ5U3RhcnRFbmQoR2VvbUxpYi5jcmVhdGVQb2ludDNkKHN0YXJ0LngsIHN0YXJ0LnksIHN0YXJ0SGVpZ2h0KSwgR2VvbUxpYi5jcmVhdGVQb2ludDNkKGVuZC54LCBlbmQueSwgZW5kSGVpZ2h0KSk7XG4gICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZ3JvdXBEZWYuc2V0Q3VzdG9tUHJvcGVydHkoU3RhcnRFbmRLZXksIHN0YXJ0RW5kU3RyaW5nKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgaWYgKGJhc2VDb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFzZUxpbmVTdHJpbmcgPSBzdHJpbmdpZnlTdGFydEVuZChiYXNlQ29tcG9uZW50LmxpbmUzZC5zdGFydCwgYmFzZUNvbXBvbmVudC5saW5lM2QuZW5kKTtcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZ3JvdXBEZWYuc2V0Q3VzdG9tUHJvcGVydHkoQmFzZUxpbmVTZWczZEtleSwgYmFzZUxpbmVTdHJpbmcpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFzZVNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleChzZWdtZW50cywgYmFzZUNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChiYXNlU2VnbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFzZUNvbXBvbmVudFN0cmluZyA9IHN0cmluZ2lmeUJhc2VDb21wb25lbnQoYmFzZVNlZ21lbnQsIGJhc2VDb21wb25lbnQubGluZTNkSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZ3JvdXBEZWYuc2V0Q3VzdG9tUHJvcGVydHkoQmFzZUNvbXBvbmVudEtleSwgYmFzZUNvbXBvbmVudFN0cmluZykuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjaXJjbGVUYW5nZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhbmdlbnRTdHJpbmcgPSBzdHJpbmdpZnlQb2ludDNkKGNpcmNsZVRhbmdlbnQpO1xuICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBncm91cERlZi5zZXRDdXN0b21Qcm9wZXJ0eShDaXJjbGVUYW5nZW50S2V5LCB0YW5nZW50U3RyaW5nKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXdJbnN0YW5jZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkSGFuZHJhaWxJbnN0YW5jZShzdGFpclBhcmFtLCBoYW5kcmFpbHMsIHBhcmVudFRyYW5zZm9ybSkge1xuICAgIHZhciBfYSwgX2IsIF9jO1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IHsgaGFuZHJhaWw6IHsgc3VwcG9ydCwgaGVpZ2h0LCByYWlsOiB7IHR5cGU6IHJhaWxUeXBlLCBwYXJhbTogcmFpbFBhcmFtIH0sIGNvbHVtbjogeyB0eXBlOiBjb2x1bW5UeXBlLCBwYXJhbTogY29sdW1uUGFyYW0gfSB9IH0gPSBzdGFpclBhcmFtO1xuICAgICAgICBpZiAoIXN1cHBvcnQpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjb2x1bW5GYWNlO1xuICAgICAgICBpZiAoY29sdW1uVHlwZSA9PT0gQ29sdW1uVHlwZS5DaXJjbGUpIHtcbiAgICAgICAgICAgIGNvbHVtbkZhY2UgPSBkcmF3Q2lyY2xlKGR1bW15UG9pbnQzZCwgRGlyZWN0aW9uWiwgY29sdW1uUGFyYW0ucmFkaXVzIHx8IERlZmF1bHRTdGFpclBhcmFtLmhvcml6b250YWxTdGVwIC8gMTApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvbHVtblR5cGUgPT09IENvbHVtblR5cGUuUmVjdCkge1xuICAgICAgICAgICAgY29sdW1uRmFjZSA9IGRyYXdSZWN0KGR1bW15UG9pbnQzZCwgRGlyZWN0aW9uWiwgY29sdW1uUGFyYW0ud2lkdGggfHwgRGVmYXVsdFN0YWlyUGFyYW0uaG9yaXpvbnRhbFN0ZXAgLyAxMCwgY29sdW1uUGFyYW0uaGVpZ2h0IHx8IERlZmF1bHRTdGFpclBhcmFtLmhvcml6b250YWxTdGVwIC8gMTAsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbHVtbkxvb3AgPSBjb2x1bW5GYWNlID09PSBudWxsIHx8IGNvbHVtbkZhY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbHVtbkZhY2UuZ2V0T3V0ZXJMb29wKCk7XG4gICAgICAgIGlmICghY29sdW1uRmFjZSB8fCAhY29sdW1uTG9vcCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhY3RpdmVEZXNpZ24gPSBhcHAuZ2V0QWN0aXZlRGVzaWduKCk7XG4gICAgICAgIGNvbnN0IGhhbmRyYWlsSW5zdGFuY2UgPSAoX2EgPSBhY3RpdmVEZXNpZ24ubWFrZUdyb3VwKFtjb2x1bW5GYWNlXSwgW10sIFtdKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmFkZGVkSW5zdGFuY2U7XG4gICAgICAgIGNvbnN0IGhhbmRyYWlsRGVmaW5pdGlvbiA9IGhhbmRyYWlsSW5zdGFuY2UgPT09IG51bGwgfHwgaGFuZHJhaWxJbnN0YW5jZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogaGFuZHJhaWxJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKTtcbiAgICAgICAgaWYgKCFoYW5kcmFpbEluc3RhbmNlIHx8ICFoYW5kcmFpbERlZmluaXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcmVudFRyYW5zZm9ybSkge1xuICAgICAgICAgICAgY29uc3QgdHJhbnNmb3JtUmVzID0gYWN0aXZlRGVzaWduLnRyYW5zZm9ybUdyb3VwSW5zdGFuY2VzKFtoYW5kcmFpbEluc3RhbmNlXSwgcGFyZW50VHJhbnNmb3JtLmludmVyc2VkKCkpO1xuICAgICAgICAgICAgaWYgKCF0cmFuc2Zvcm1SZXMuaXNTdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhY3RpdmF0ZUluc3RhbmNlUmVzID0geWllbGQgYWN0aXZlRGVzaWduLmFjdGl2YXRlR3JvdXBJbnN0YW5jZShoYW5kcmFpbEluc3RhbmNlKTtcbiAgICAgICAgaWYgKCFhY3RpdmF0ZUluc3RhbmNlUmVzLmlzU3VjY2Vzcykge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb2x1bW5BdXhpbGlhcnlCb3VuZGVkQ3VydmUgPSAoX2IgPSBhY3RpdmVEZXNpZ24uYWRkQXV4aWxpYXJ5Qm91bmRlZEN1cnZlKEdlb21MaWIuY3JlYXRlTGluZVNlZ21lbnQzZChHZW9tTGliLmNyZWF0ZVBvaW50M2QoMCwgMCwgaGVpZ2h0KSwgZHVtbXlQb2ludDNkKSkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5hZGRlZEN1cnZlO1xuICAgICAgICBpZiAoIWNvbHVtbkF1eGlsaWFyeUJvdW5kZWRDdXJ2ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzd2VlcENvbHVtblJlcyA9IGFjdGl2ZURlc2lnbi5zd2VlcEZvbGxvd0N1cnZlcyhjb2x1bW5Mb29wLCBbY29sdW1uQXV4aWxpYXJ5Qm91bmRlZEN1cnZlXSk7XG4gICAgICAgIGlmICghc3dlZXBDb2x1bW5SZXMuaXNTdWNjZXNzIHx8ICFzd2VlcENvbHVtblJlcy5hZGRlZFNoZWxscy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29sdW1uT3JpZ2luRmFjZXMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBjb2x1bW5PcmlnaW5TaGVsbCBvZiBzd2VlcENvbHVtblJlcy5hZGRlZFNoZWxscykge1xuICAgICAgICAgICAgY29uc3QgY29sdW1uRmFjZXMgPSBjb2x1bW5PcmlnaW5TaGVsbC5nZXRGYWNlcygpO1xuICAgICAgICAgICAgY29sdW1uT3JpZ2luRmFjZXMucHVzaCguLi5jb2x1bW5GYWNlcyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29sdW1uT3JpZ2luSW5zdGFuY2UgPSAoX2MgPSBhY3RpdmVEZXNpZ24ubWFrZUdyb3VwKGNvbHVtbk9yaWdpbkZhY2VzLCBbXSwgW10pKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuYWRkZWRJbnN0YW5jZTtcbiAgICAgICAgaWYgKCFjb2x1bW5PcmlnaW5JbnN0YW5jZSkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb2x1bW5NYXRyaXhlcyA9IFtdO1xuICAgICAgICBjb25zdCByYWlsSW5zdGFuY2VzID0gW107XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgaGFuZHJhaWxzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCB7IHJhaWwsIGNvbHVtbnMgfSA9IGhhbmRyYWlsc1tqXTtcbiAgICAgICAgICAgIGNvbnN0IHJhaWxCb3VuZGVkQ3VydmVzID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhaWwubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmFpbFBvaW50ID0gcmFpbFtpXTtcbiAgICAgICAgICAgICAgICBjb25zdCByYWlsTmV4dFBvaW50ID0gcmFpbFtpICsgMV07XG4gICAgICAgICAgICAgICAgcmFpbEJvdW5kZWRDdXJ2ZXMucHVzaCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFkZEF1eFJlcyA9IGFjdGl2ZURlc2lnbi5hZGRBdXhpbGlhcnlCb3VuZGVkQ3VydmUoR2VvbUxpYi5jcmVhdGVMaW5lU2VnbWVudDNkKHJhaWxQb2ludCwgcmFpbE5leHRQb2ludCkpO1xuICAgICAgICAgICAgICAgIGlmIChhZGRBdXhSZXMgPT09IG51bGwgfHwgYWRkQXV4UmVzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBhZGRBdXhSZXMuYWRkZWRDdXJ2ZSkge1xuICAgICAgICAgICAgICAgICAgICByYWlsQm91bmRlZEN1cnZlcy5wdXNoKGFkZEF1eFJlcy5hZGRlZEN1cnZlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJhaWxCb3VuZGVkQ3VydmVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhaWxTdGFydEN1cnZlID0gcmFpbEJvdW5kZWRDdXJ2ZXNbMF0uZ2V0Qm91bmRlZEN1cnZlKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmFpbFN0YXJ0UG9pbnQgPSAocmFpbFN0YXJ0Q3VydmUgPT09IG51bGwgfHwgcmFpbFN0YXJ0Q3VydmUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJhaWxTdGFydEN1cnZlLnN0YXJ0UG9pbnQpIHx8IGR1bW15UG9pbnQzZDtcbiAgICAgICAgICAgICAgICBjb25zdCByYWlsU3RhcnREaXIgPSAocmFpbFN0YXJ0Q3VydmUgPT09IG51bGwgfHwgcmFpbFN0YXJ0Q3VydmUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJhaWxTdGFydEN1cnZlLmVuZFBvaW50LnN1YnRyYWN0ZWQocmFpbFN0YXJ0UG9pbnQpLm5vcm1hbGl6ZWQoKS5yZXZlcnNlZCgpKSB8fCBEaXJlY3Rpb25aO1xuICAgICAgICAgICAgICAgIGxldCByYWlsRmFjZTtcbiAgICAgICAgICAgICAgICBpZiAocmFpbFR5cGUgPT09IFJhaWxUeXBlLkNpcmNsZSkge1xuICAgICAgICAgICAgICAgICAgICByYWlsRmFjZSA9IGRyYXdDaXJjbGUocmFpbFN0YXJ0UG9pbnQsIHJhaWxTdGFydERpciwgcmFpbFBhcmFtLnJhZGl1cyB8fCBEZWZhdWx0U3RhaXJQYXJhbS5ob3Jpem9udGFsU3RlcCAvIDUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChyYWlsVHlwZSA9PT0gUmFpbFR5cGUuUmVjdCkge1xuICAgICAgICAgICAgICAgICAgICByYWlsRmFjZSA9IGRyYXdSZWN0KHJhaWxTdGFydFBvaW50LCByYWlsU3RhcnREaXIsIHJhaWxQYXJhbS53aWR0aCB8fCBEZWZhdWx0U3RhaXJQYXJhbS5ob3Jpem9udGFsU3RlcCAvIDUsIHJhaWxQYXJhbS5oZWlnaHQgfHwgRGVmYXVsdFN0YWlyUGFyYW0uaG9yaXpvbnRhbFN0ZXAgLyA1KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCByYWlsTG9vcCA9IHJhaWxGYWNlID09PSBudWxsIHx8IHJhaWxGYWNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiByYWlsRmFjZS5nZXRPdXRlckxvb3AoKTtcbiAgICAgICAgICAgICAgICBpZiAoIXJhaWxGYWNlIHx8ICFyYWlsTG9vcCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBzd2VlcFJhaWxSZXMgPSBhY3RpdmVEZXNpZ24uc3dlZXBGb2xsb3dDdXJ2ZXMocmFpbExvb3AsIHJhaWxCb3VuZGVkQ3VydmVzKTtcbiAgICAgICAgICAgICAgICBpZiAoIXN3ZWVwUmFpbFJlcy5pc1N1Y2Nlc3MgfHwgIXN3ZWVwUmFpbFJlcy5hZGRlZFNoZWxscy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcmFpbEZhY2VzID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCByYWlsU2hlbGwgb2Ygc3dlZXBSYWlsUmVzLmFkZGVkU2hlbGxzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJhaWxTaGVsbEZhY2VzID0gcmFpbFNoZWxsLmdldEZhY2VzKCk7XG4gICAgICAgICAgICAgICAgICAgIHJhaWxGYWNlcy5wdXNoKC4uLnJhaWxTaGVsbEZhY2VzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCByYWlsQm91bmRlZEN1cnZlIG9mIHJhaWxCb3VuZGVkQ3VydmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlbW92ZVJhaWxCb3VuZGVkQ3VydmVSZXMgPSBhY3RpdmVEZXNpZ24ucmVtb3ZlQXV4aWxpYXJ5Q3VydmUocmFpbEJvdW5kZWRDdXJ2ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVtb3ZlUmFpbEJvdW5kZWRDdXJ2ZVJlcy5pc1N1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcmFpbE1ha2VHcm91cFJlcyA9IGFjdGl2ZURlc2lnbi5tYWtlR3JvdXAocmFpbEZhY2VzLCBbXSwgW10pO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhaWxHcm91cERlZiA9IHJhaWxNYWtlR3JvdXBSZXMgPT09IG51bGwgfHwgcmFpbE1ha2VHcm91cFJlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmFpbE1ha2VHcm91cFJlcy5hZGRlZEluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmICghKHJhaWxNYWtlR3JvdXBSZXMgPT09IG51bGwgfHwgcmFpbE1ha2VHcm91cFJlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmFpbE1ha2VHcm91cFJlcy5hZGRlZEluc3RhbmNlKSB8fCAhcmFpbEdyb3VwRGVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHJhaWxQcm9wZXJ0eVJlcyA9IHJhaWxHcm91cERlZi5zZXRDdXN0b21Qcm9wZXJ0eShSYWlsTW9kZWxLZXksIE1vZGVsVmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmICghcmFpbFByb3BlcnR5UmVzLmlzU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByYWlsSW5zdGFuY2VzLnB1c2gocmFpbE1ha2VHcm91cFJlcy5hZGRlZEluc3RhbmNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgY29sdW1uIG9mIGNvbHVtbnMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2x1bW5TY2FsZU1hdCA9IEdlb21MaWIuY3JlYXRlU2NhbGVNYXRyaXg0KDEsIDEsIChjb2x1bW5bMV0ueiAtIGNvbHVtblswXS56KSAvIGhlaWdodCk7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sdW1uVHJhbnNsYXRlTWF0ID0gR2VvbUxpYi5jcmVhdGVUcmFuc2xhdGlvbk1hdHJpeDQoY29sdW1uWzBdLngsIGNvbHVtblswXS55LCBjb2x1bW5bMF0ueik7XG4gICAgICAgICAgICAgICAgY29sdW1uTWF0cml4ZXMucHVzaChjb2x1bW5UcmFuc2xhdGVNYXQubXVsdGlwbGllZChjb2x1bW5TY2FsZU1hdCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChyYWlsSW5zdGFuY2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgYXNzaWduUmFpbE1hdGVyaWFsUmVzID0gYWN0aXZlRGVzaWduLmFzc2lnbk1hdGVyaWFsRm9yRW50aXRpZXMocmFpbEluc3RhbmNlcywgUHJlc2V0TWF0ZXJpYWxzLkhhbmRyYWlsLnJhaWwubWF0ZXJpYWxJZCwgUHJlc2V0TWF0ZXJpYWxzLkhhbmRyYWlsLnJhaWwuYmdJZCk7XG4gICAgICAgICAgICBpZiAoIWFzc2lnblJhaWxNYXRlcmlhbFJlcykge1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29sdW1uSW5zdGFuY2VzID0gW107XG4gICAgICAgIGlmIChjb2x1bW5NYXRyaXhlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbkNvcHlSZXMgPSBhY3RpdmVEZXNpZ24uYnVsa0NvcHlHcm91cEluc3RhbmNlcyhbY29sdW1uT3JpZ2luSW5zdGFuY2VdLCBbY29sdW1uTWF0cml4ZXNdKTtcbiAgICAgICAgICAgIGlmICghKGNvbHVtbkNvcHlSZXMgPT09IG51bGwgfHwgY29sdW1uQ29weVJlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29sdW1uQ29weVJlcy5hZGRlZEluc3RhbmNlcy5sZW5ndGgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbHVtbkluc3RhbmNlcy5wdXNoKC4uLmNvbHVtbkNvcHlSZXMuYWRkZWRJbnN0YW5jZXMpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBjb2x1bW5JbnN0YW5jZSBvZiBjb2x1bW5Db3B5UmVzLmFkZGVkSW5zdGFuY2VzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sdW1uR3JvdXBEZWYgPSBjb2x1bW5JbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAoIWNvbHVtbkdyb3VwRGVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbHVtblByb3BlcnR5UmVzID0gY29sdW1uR3JvdXBEZWYuc2V0Q3VzdG9tUHJvcGVydHkoQ29sdW1uTW9kZWxLZXksIE1vZGVsVmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmICghY29sdW1uUHJvcGVydHlSZXMuaXNTdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgYXNzaWduQ29sdW1uTWF0ZXJpYWxSZXMgPSBhY3RpdmVEZXNpZ24uYXNzaWduTWF0ZXJpYWxGb3JFbnRpdGllcyhjb2x1bW5Db3B5UmVzLmFkZGVkSW5zdGFuY2VzLCBQcmVzZXRNYXRlcmlhbHMuSGFuZHJhaWwuY29sdW1uLm1hdGVyaWFsSWQsIFByZXNldE1hdGVyaWFscy5IYW5kcmFpbC5jb2x1bW4uYmdJZCk7XG4gICAgICAgICAgICBpZiAoIWFzc2lnbkNvbHVtbk1hdGVyaWFsUmVzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZW1vdmVPcmlnaW5Db2x1bW5SZXMgPSBhY3RpdmVEZXNpZ24ucmVtb3ZlR3JvdXBJbnN0YW5jZShjb2x1bW5PcmlnaW5JbnN0YW5jZSk7XG4gICAgICAgIGlmICghcmVtb3ZlT3JpZ2luQ29sdW1uUmVzLmlzU3VjY2Vzcykge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZW1vdmVPcmlnaW5Db2x1bW5BdXhDdXJ2ZVJlcyA9IGFjdGl2ZURlc2lnbi5yZW1vdmVBdXhpbGlhcnlDdXJ2ZShjb2x1bW5BdXhpbGlhcnlCb3VuZGVkQ3VydmUpO1xuICAgICAgICBpZiAoIXJlbW92ZU9yaWdpbkNvbHVtbkF1eEN1cnZlUmVzLmlzU3VjY2Vzcykge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICAvLyB0byByZW1vdmUgYWxsIGF1eGlsaWFyeUN1cnZlc1xuICAgICAgICBjb25zdCBkZWFjdGl2YXRlSW5zdGFuY2VSZXMgPSB5aWVsZCBhY3RpdmVEZXNpZ24uZGVhY3RpdmF0ZUdyb3VwSW5zdGFuY2UoKTtcbiAgICAgICAgaWYgKCFkZWFjdGl2YXRlSW5zdGFuY2VSZXMuaXNTdWNjZXNzKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNldFByb3BlcnR5UmVzID0gaGFuZHJhaWxEZWZpbml0aW9uLnNldEN1c3RvbVByb3BlcnR5KEhhbmRyYWlsTW9kZWxLZXksIE1vZGVsVmFsdWUpO1xuICAgICAgICBpZiAoIXNldFByb3BlcnR5UmVzLmlzU3VjY2Vzcykge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaGFuZHJhaWxJbnN0YW5jZTogeyBpbnN0YW5jZTogaGFuZHJhaWxJbnN0YW5jZSwgaW5zdGFuY2VLZXk6IGhhbmRyYWlsSW5zdGFuY2UuZ2V0S2V5KCksIGRlZmluaXRpb25LZXk6IGhhbmRyYWlsRGVmaW5pdGlvbi5nZXRLZXkoKSB9LFxuICAgICAgICAgICAgcmFpbEluc3RhbmNlczogcmFpbEluc3RhbmNlcy5tYXAoaW5zdGFuY2UgPT4geyB2YXIgX2E7IHJldHVybiAoeyBpbnN0YW5jZSwgaW5zdGFuY2VLZXk6IGluc3RhbmNlLmdldEtleSgpLCBkZWZpbml0aW9uS2V5OiAoKF9hID0gaW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5nZXRLZXkoKSkgfHwgJycgfSk7IH0pLFxuICAgICAgICAgICAgY29sdW1uSW5zdGFuY2VzOiBjb2x1bW5JbnN0YW5jZXMubWFwKGluc3RhbmNlID0+IHsgdmFyIF9hOyByZXR1cm4gKHsgaW5zdGFuY2UsIGluc3RhbmNlS2V5OiBpbnN0YW5jZS5nZXRLZXkoKSwgZGVmaW5pdGlvbktleTogKChfYSA9IGluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZ2V0S2V5KCkpIHx8ICcnIH0pOyB9KSxcbiAgICAgICAgfTtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkcmF3Q2lyY2xlKGNlbnRlciwgbm9ybWFsLCByYWRpdXMpIHtcbiAgICBjb25zdCBhY3RpdmVEZXNpZ24gPSBhcHAuZ2V0QWN0aXZlRGVzaWduKCk7XG4gICAgY29uc3QgcmVzID0gYWN0aXZlRGVzaWduLmFkZENpcmNsZShHZW9tTGliLmNyZWF0ZUNpcmNsZTNkQnlDZW50ZXJOb3JtYWxSYWRpdXMoY2VudGVyLCBub3JtYWwsIHJhZGl1cykpO1xuICAgIGlmIChyZXMgPT09IG51bGwgfHwgcmVzID09PSB2b2lkIDAgPyB2b2lkIDAgOiByZXMuYWRkZWRFZGdlcy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3Qgc2hlbGwgPSByZXMuYWRkZWRFZGdlc1swXS5nZXRTaGVsbCgpO1xuICAgICAgICBjb25zdCBmYWNlcyA9IHNoZWxsID09PSBudWxsIHx8IHNoZWxsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzaGVsbC5nZXRGYWNlcygpO1xuICAgICAgICBpZiAoKGZhY2VzID09PSBudWxsIHx8IGZhY2VzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBmYWNlcy5sZW5ndGgpID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFjZXNbMF07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkcmF3UmVjdChjZW50ZXIsIG5vcm1hbCwgd2lkdGgsIGhlaWdodCwgd2l0aENvcm5lciA9IHRydWUpIHtcbiAgICBjb25zdCBwb2ludDEgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QoLXdpZHRoIC8gMiwgMCwgMCk7XG4gICAgY29uc3QgcG9pbnQyID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKHdpZHRoIC8gMiwgMCwgMCk7XG4gICAgbGV0IHBvaW50cyA9IFtwb2ludDEsIHBvaW50Ml07XG4gICAgaWYgKHdpdGhDb3JuZXIpIHtcbiAgICAgICAgY29uc3QgcDUgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2Qod2lkdGggLyAyLCBoZWlnaHQgLyAzICogMiwgMCk7XG4gICAgICAgIGNvbnN0IHA2ID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKHdpZHRoIC8gNCwgaGVpZ2h0LCAwKTtcbiAgICAgICAgY29uc3QgbTEgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QoKHA1LnggKyBwNi54KSAvIDIsIChwNS55ICsgcDYueSkgLyAyLCAwKTtcbiAgICAgICAgY29uc3QgZGlyMSA9IHA2LnN1YnRyYWN0ZWQocDUpLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgY29uc3QgdG9DZW50ZXJEaXIxID0gRGlyZWN0aW9uWi5jcm9zcyhkaXIxKTtcbiAgICAgICAgY29uc3QgZDEgPSBwNS5kaXN0YW5jZVRvKHA2KTtcbiAgICAgICAgY29uc3QgaDEgPSBkMSAvIDIgLyBNYXRoLnRhbihNYXRoLlBJIC8gNik7XG4gICAgICAgIGNvbnN0IGNlbnRlcjEgPSBtMS5hZGRlZCh0b0NlbnRlckRpcjEubXVsdGlwbGllZChoMSkpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDExOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHJvdGF0ZU1hdCA9IEdlb21MaWIuY3JlYXRlUm90YXRlTWF0cml4NChpICogTWF0aC5QSSAvIDMwLCBEaXJlY3Rpb25aLCBjZW50ZXIxKTtcbiAgICAgICAgICAgIGNvbnN0IGRpc2NyZXRlUG9pbnQgPSBwNS5hcHBsaWVkTWF0cml4NChyb3RhdGVNYXQpO1xuICAgICAgICAgICAgcG9pbnRzLnB1c2goZGlzY3JldGVQb2ludCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcDcgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QoLXdpZHRoIC8gNCwgaGVpZ2h0LCAwKTtcbiAgICAgICAgY29uc3QgcDggPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QoLXdpZHRoIC8gMiwgaGVpZ2h0IC8gMyAqIDIsIDApO1xuICAgICAgICBjb25zdCBtMiA9IEdlb21MaWIuY3JlYXRlUG9pbnQzZCgocDcueCArIHA4LngpIC8gMiwgKHA3LnkgKyBwOC55KSAvIDIsIDApO1xuICAgICAgICBjb25zdCBkaXIyID0gcDguc3VidHJhY3RlZChwNykubm9ybWFsaXplZCgpO1xuICAgICAgICBjb25zdCB0b0NlbnRlckRpcjIgPSBEaXJlY3Rpb25aLmNyb3NzKGRpcjIpO1xuICAgICAgICBjb25zdCBkMiA9IHA3LmRpc3RhbmNlVG8ocDgpO1xuICAgICAgICBjb25zdCBoMiA9IGQyIC8gMiAvIE1hdGgudGFuKE1hdGguUEkgLyA2KTtcbiAgICAgICAgY29uc3QgY2VudGVyMiA9IG0yLmFkZGVkKHRvQ2VudGVyRGlyMi5tdWx0aXBsaWVkKGgyKSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTE7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgcm90YXRlTWF0ID0gR2VvbUxpYi5jcmVhdGVSb3RhdGVNYXRyaXg0KGkgKiBNYXRoLlBJIC8gMzAsIERpcmVjdGlvblosIGNlbnRlcjIpO1xuICAgICAgICAgICAgY29uc3QgZGlzY3JldGVQb2ludCA9IHA3LmFwcGxpZWRNYXRyaXg0KHJvdGF0ZU1hdCk7XG4gICAgICAgICAgICBwb2ludHMucHVzaChkaXNjcmV0ZVBvaW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgcG9pbnQzID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKHdpZHRoIC8gMiwgaGVpZ2h0LCAwKTtcbiAgICAgICAgY29uc3QgcG9pbnQ0ID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKC13aWR0aCAvIDIsIGhlaWdodCwgMCk7XG4gICAgICAgIHBvaW50cy5wdXNoKHBvaW50MywgcG9pbnQ0KTtcbiAgICB9XG4gICAgY29uc3QgY29vcmRpbmF0ZSA9IGdldENvb3JkaW5hdGUobm9ybWFsKTtcbiAgICBjb25zdCBjb29yZGluYXRlTWF0ID0gR2VvbUxpYi5jcmVhdGVBbGlnbkNDU01hdHJpeDQoY29vcmRpbmF0ZS5keCwgY29vcmRpbmF0ZS5keSwgY29vcmRpbmF0ZS5keiwgY2VudGVyKTtcbiAgICBjb25zdCB0cmFuc2xhdGVNYXQxID0gR2VvbUxpYi5jcmVhdGVUcmFuc2xhdGlvbk1hdHJpeDQoMCwgLWhlaWdodCAvIDIsIDApO1xuICAgIGNvbnN0IHRyYW5zZm9ybU1hdCA9IGNvb3JkaW5hdGVNYXQubXVsdGlwbGllZCh0cmFuc2xhdGVNYXQxKTtcbiAgICBwb2ludHMgPSBwb2ludHMubWFwKHAgPT4gcC5hcHBsaWVkTWF0cml4NCh0cmFuc2Zvcm1NYXQpKTtcbiAgICBjb25zdCBhY3RpdmVEZXNpZ24gPSBhcHAuZ2V0QWN0aXZlRGVzaWduKCk7XG4gICAgY29uc3QgcmVzID0gYWN0aXZlRGVzaWduLmFkZEVkZ2VzKHBvaW50cyk7XG4gICAgaWYgKHJlcyA9PT0gbnVsbCB8fCByZXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlcy5hZGRlZEVkZ2VzLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBlZGdlVmVydGljZXMgPSBuZXcgU2V0KCk7XG4gICAgICAgIGZvciAoY29uc3QgYWRkZWRFZGdlIG9mIHJlcy5hZGRlZEVkZ2VzKSB7XG4gICAgICAgICAgICBjb25zdCB2YSA9IGFkZGVkRWRnZS5nZXRWZXJ0ZXhBKCk7XG4gICAgICAgICAgICBjb25zdCB2YiA9IGFkZGVkRWRnZS5nZXRWZXJ0ZXhCKCk7XG4gICAgICAgICAgICBpZiAodmEpIHtcbiAgICAgICAgICAgICAgICBlZGdlVmVydGljZXMuYWRkKHZhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2Yikge1xuICAgICAgICAgICAgICAgIGVkZ2VWZXJ0aWNlcy5hZGQodmIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNldFNvZnRSZXN1bHQgPSBhY3RpdmVEZXNpZ24uc2V0VmVydGljZXNTb2Z0KFsuLi5lZGdlVmVydGljZXNdLCB0cnVlKTtcbiAgICAgICAgaWYgKHNldFNvZnRSZXN1bHQuaXNTdWNjZXNzKSB7XG4gICAgICAgICAgICBjb25zdCBzaGVsbCA9IHJlcy5hZGRlZEVkZ2VzWzBdLmdldFNoZWxsKCk7XG4gICAgICAgICAgICBjb25zdCBmYWNlcyA9IHNoZWxsID09PSBudWxsIHx8IHNoZWxsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzaGVsbC5nZXRGYWNlcygpO1xuICAgICAgICAgICAgaWYgKChmYWNlcyA9PT0gbnVsbCB8fCBmYWNlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogZmFjZXMubGVuZ3RoKSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWNlc1swXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldFNlZ21lbnRCeUluZGV4KHNlZ21lbnRzLCBpbmRleCkge1xuICAgIGlmIChpbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiBzZWdtZW50cy5maW5kKHNlZ21lbnQgPT4gc2VnbWVudC5wYXJhbS5pbmRleCA9PT0gaW5kZXgpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkU2VnbWVudFJlbGF0aW9ucyhzZWdtZW50cykge1xuICAgIGZvciAoY29uc3Qgc2VnbWVudCBvZiBzZWdtZW50cykge1xuICAgICAgICBjb25zdCBiYXNlQ29tcG9uZW50ID0gc2VnbWVudC5iYXNlQ29tcG9uZW50O1xuICAgICAgICBjb25zdCBiYXNlU2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHNlZ21lbnRzLCBiYXNlQ29tcG9uZW50ID09PSBudWxsIHx8IGJhc2VDb21wb25lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJhc2VDb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xuICAgICAgICBpZiAoYmFzZVNlZ21lbnQgJiYgKGJhc2VDb21wb25lbnQgPT09IG51bGwgfHwgYmFzZUNvbXBvbmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleCkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgYmFzZVNlZ21lbnQubmV4dENvbXBvbmVudHNbYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleF0uYWRkKHNlZ21lbnQucGFyYW0uaW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGdldE5leHRDb21wb25lbnRzKHNlZ21lbnQsIHNlZ21lbnRzKSB7XG4gICAgY29uc3QgeyBuZXh0Q29tcG9uZW50cyB9ID0gc2VnbWVudDtcbiAgICBjb25zdCBuZXh0U2VnbWVudHMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IG5leHRDb21wb25lbnRJbmRleGVzIG9mIG5leHRDb21wb25lbnRzKSB7XG4gICAgICAgIGZvciAoY29uc3QgbmV4dENvbXBvbmVudEluZGV4IG9mIG5leHRDb21wb25lbnRJbmRleGVzKSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0U2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHNlZ21lbnRzLCBuZXh0Q29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgaWYgKG5leHRTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgbmV4dFNlZ21lbnRzLnB1c2gobmV4dFNlZ21lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXh0U2VnbWVudHM7XG59XG5leHBvcnQgZnVuY3Rpb24gY2hhbmdlU3RhaXJVcHdhcmQoc3RhcnRTZWdtZW50LCBzZWdtZW50cywgdXB3YXJkLCBidWxrQ2hhbmdlLCBvbmx5U3RhcnQgPSBmYWxzZSkge1xuICAgIGlmIChzZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgbGV0IGN1cnJlbnQgPSBbeyBzZWdtZW50OiBzdGFydFNlZ21lbnQsIHZlcnRpY2FsRGVsdGE6IHN0YXJ0U2VnbWVudC5zdGFydEhlaWdodCB9XTtcbiAgICAgICAgY29uc3QgdW5WaXNpdGVkID0gbmV3IFNldChzZWdtZW50cyk7XG4gICAgICAgIGNvbnN0IGNoYW5nZWRTZWdtZW50cyA9IG5ldyBTZXQoKTtcbiAgICAgICAgd2hpbGUgKGN1cnJlbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgbmV4dCA9IFtdO1xuICAgICAgICAgICAgZm9yIChjb25zdCB7IHNlZ21lbnQsIHZlcnRpY2FsRGVsdGEgfSBvZiBjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBzdGFydEhlaWdodCwgZW5kSGVpZ2h0IH0gPSBzZWdtZW50O1xuICAgICAgICAgICAgICAgIGNvbnN0IHVwd2FyZEZsYWcgPSAob25seVN0YXJ0ICYmIHNlZ21lbnQgIT09IHN0YXJ0U2VnbWVudCkgPyBzZWdtZW50LnBhcmFtLnVwd2FyZCA6IHVwd2FyZDtcbiAgICAgICAgICAgICAgICBjb25zdCBlbmREZWx0YSA9IHNlZ21lbnQucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSA/IDAgOiBNYXRoLmFicyhlbmRIZWlnaHQgLSBzdGFydEhlaWdodCkgKiAodXB3YXJkRmxhZyA/IDEgOiAtMSk7XG4gICAgICAgICAgICAgICAgc2VnbWVudC5zdGFydEhlaWdodCA9IHZlcnRpY2FsRGVsdGE7XG4gICAgICAgICAgICAgICAgc2VnbWVudC5lbmRIZWlnaHQgPSBzZWdtZW50LnN0YXJ0SGVpZ2h0ICsgZW5kRGVsdGE7XG4gICAgICAgICAgICAgICAgaWYgKCFvbmx5U3RhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5wYXJhbS51cHdhcmQgPSB1cHdhcmQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHVuVmlzaXRlZC5kZWxldGUoc2VnbWVudCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV4dFNlZ21lbnRzID0gZ2V0TmV4dENvbXBvbmVudHMoc2VnbWVudCwgc2VnbWVudHMpO1xuICAgICAgICAgICAgICAgIGlmIChuZXh0U2VnbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQucHVzaCguLi5uZXh0U2VnbWVudHMubWFwKHNlZyA9PiAoeyBzZWdtZW50OiBzZWcsIHZlcnRpY2FsRGVsdGE6IHNlZ21lbnQuZW5kSGVpZ2h0IH0pKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNoYW5nZWRTZWdtZW50cy5hZGQoc2VnbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50ID0gbmV4dDtcbiAgICAgICAgICAgIGlmICghY3VycmVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAoYnVsa0NoYW5nZSAmJiB1blZpc2l0ZWQuc2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVTZWdtZW50ID0gWy4uLnVuVmlzaXRlZC52YWx1ZXMoKV1bMF07XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBbeyBzZWdtZW50OiB0aGVTZWdtZW50LCB2ZXJ0aWNhbERlbHRhOiB0aGVTZWdtZW50LnN0YXJ0SGVpZ2h0IH1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gWy4uLmNoYW5nZWRTZWdtZW50c107XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5nZVN0YWlyU3RlcChzdGFydFNlZ21lbnQsIHNlZ21lbnRzLCBuZXdIb3Jpem9udGFsU3RlcCwgbmV3VmVydGljYWxTdGVwLCBidWxrQ2hhbmdlLCBvbmx5U3RhcnQgPSBmYWxzZSkge1xuICAgIGlmIChzZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgbGV0IGN1cnJlbnQgPSBbeyBzZWdtZW50OiBzdGFydFNlZ21lbnQsIHZlcnRpY2FsRGVsdGE6IHN0YXJ0U2VnbWVudC5zdGFydEhlaWdodCB9XTtcbiAgICAgICAgY29uc3QgdW5WaXNpdGVkID0gbmV3IFNldChzZWdtZW50cyk7XG4gICAgICAgIGNvbnN0IGNoYW5nZWRTZWdtZW50cyA9IG5ldyBTZXQoKTtcbiAgICAgICAgd2hpbGUgKGN1cnJlbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgbmV4dCA9IFtdO1xuICAgICAgICAgICAgZm9yIChjb25zdCB7IHNlZ21lbnQsIHZlcnRpY2FsRGVsdGEgfSBvZiBjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBzdGFydCwgZW5kLCBjaXJjbGVUYW5nZW50LCBwYXJhbTogeyB0eXBlLCBob3Jpem9udGFsU3RlcCwgdXB3YXJkIH0gfSA9IHNlZ21lbnQ7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRFbmREaXN0YW5jZSA9IHN0YXJ0LmRpc3RhbmNlVG8oZW5kKTtcbiAgICAgICAgICAgICAgICBsZXQgbmV3U3RlcENvdW50ID0gMDtcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1N0ZXBDb3VudCA9IE1hdGguY2VpbChzdGFydEVuZERpc3RhbmNlIC8gaG9yaXpvbnRhbFN0ZXApO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0U3RlcExlbmd0aCA9IHN0YXJ0RW5kRGlzdGFuY2UgLSAobmV3U3RlcENvdW50IC0gMSkgKiBob3Jpem9udGFsU3RlcDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsaWRTdGVwQ291bnQgPSAobGFzdFN0ZXBMZW5ndGggPT09IDAgfHwgbGFzdFN0ZXBMZW5ndGggPiBMZW5ndGhUb2xlcmFuY2UpID8gbmV3U3RlcENvdW50IDogbmV3U3RlcENvdW50IC0gMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbGlkU3RlcENvdW50IDwgMSB8fCB2YWxpZFN0ZXBDb3VudCA+PSBTdGVwQ291bnRMaW1pdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpciAmJiBjaXJjbGVUYW5nZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgaG9yaXpvbnRhbFN0ZXBBbmdsZSwgYXJjQW5nbGUgfSA9IGNhbGN1bGF0ZUNpcmN1bGFyU3RhaXIoc2VnbWVudCwgY2lyY2xlVGFuZ2VudCk7XG4gICAgICAgICAgICAgICAgICAgIG5ld1N0ZXBDb3VudCA9IE1hdGguY2VpbChhcmNBbmdsZSAvIGhvcml6b250YWxTdGVwQW5nbGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBuZXdEZWx0YUhlaWdodCA9IG5ld1N0ZXBDb3VudCAqIG5ld1ZlcnRpY2FsU3RlcCAqICh1cHdhcmQgPyAxIDogLTEpO1xuICAgICAgICAgICAgICAgIHNlZ21lbnQuc3RhcnRIZWlnaHQgPSB2ZXJ0aWNhbERlbHRhO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kSGVpZ2h0ID0gdmVydGljYWxEZWx0YTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kSGVpZ2h0ID0gc2VnbWVudC5zdGFydEhlaWdodCArIG5ld0RlbHRhSGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBpZiAoIW9ubHlTdGFydCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5wYXJhbS5ob3Jpem9udGFsU3RlcCA9IG5ld0hvcml6b250YWxTdGVwO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5wYXJhbS52ZXJ0aWNhbFN0ZXAgPSBuZXdWZXJ0aWNhbFN0ZXA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdW5WaXNpdGVkLmRlbGV0ZShzZWdtZW50KTtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXh0U2VnbWVudHMgPSBnZXROZXh0Q29tcG9uZW50cyhzZWdtZW50LCBzZWdtZW50cyk7XG4gICAgICAgICAgICAgICAgaWYgKG5leHRTZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dC5wdXNoKC4uLm5leHRTZWdtZW50cy5tYXAoc2VnID0+ICh7IHNlZ21lbnQ6IHNlZywgdmVydGljYWxEZWx0YTogc2VnbWVudC5lbmRIZWlnaHQgfSkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2hhbmdlZFNlZ21lbnRzLmFkZChzZWdtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJlbnQgPSBuZXh0O1xuICAgICAgICAgICAgaWYgKCFjdXJyZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGlmIChidWxrQ2hhbmdlICYmIHVuVmlzaXRlZC5zaXplKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoZVNlZ21lbnQgPSBbLi4udW5WaXNpdGVkLnZhbHVlcygpXVswXTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IFt7IHNlZ21lbnQ6IHRoZVNlZ21lbnQsIHZlcnRpY2FsRGVsdGE6IHRoZVNlZ21lbnQuc3RhcnRIZWlnaHQgfV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbLi4uY2hhbmdlZFNlZ21lbnRzXTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gY2hhbmdlUGxhdGZvcm1MZW5ndGgoc3RhcnRTZWdtZW50LCBzZWdtZW50cywgbmV3UGxhdGZvcm1MZW5ndGgsIGJ1bGtDaGFuZ2UsIG9ubHlTdGFydCA9IGZhbHNlKSB7XG4gICAgaWYgKHNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAvLyBjb25zdCBwbGF0Zm9ybVNlZ21lbnRzID0gc2VnbWVudHMuZmlsdGVyKHNlZyA9PiBzZWcucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSk7XG4gICAgICAgIGxldCBjdXJyZW50ID0gW3sgc2VnbWVudDogc3RhcnRTZWdtZW50LCBkZWx0YVZlYzogZHVtbXlWZWN0b3IzZCB9XTtcbiAgICAgICAgY29uc3QgdW5WaXNpdGVkID0gbmV3IFNldChzZWdtZW50cyk7XG4gICAgICAgIGNvbnN0IGNoYW5nZWRTZWdtZW50cyA9IG5ldyBTZXQoKTtcbiAgICAgICAgd2hpbGUgKGN1cnJlbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgbmV4dCA9IFtdO1xuICAgICAgICAgICAgZm9yIChjb25zdCB7IHNlZ21lbnQsIGRlbHRhVmVjIH0gb2YgY3VycmVudCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgc3RhcnQsIGVuZCwgcGFyYW06IHsgdHlwZSwgc3RhcnRXaWR0aCwgcGxhdGZvcm1MZW5ndGggfSwgYmFzZUNvbXBvbmVudCwgbmV4dENvbXBvbmVudHMsIG1vbGRTaGFwZTogeyB0ZW1wTGluZXMgfSB9ID0gc2VnbWVudDtcbiAgICAgICAgICAgICAgICBsZXQgbmV4dERlbHRhVmVjID0gZGVsdGFWZWM7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZnJvbnREaXIgPSBlbmQuc3VidHJhY3RlZChzdGFydCkubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWx0YVBsYXRmb3JtTGVuZ3RoID0gbmV3UGxhdGZvcm1MZW5ndGggLSBwbGF0Zm9ybUxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgbmV4dERlbHRhVmVjID0gZGVsdGFWZWMuYWRkZWQoZnJvbnREaXIubXVsdGlwbGllZChkZWx0YVBsYXRmb3JtTGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnQucGFyYW0ucGxhdGZvcm1MZW5ndGggPSBuZXdQbGF0Zm9ybUxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJhc2VDb21wb25lbnQgJiYgZGVsdGFQbGF0Zm9ybUxlbmd0aCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgYW5nbGUsIGNvcm5lckRpcmVjdGlvbkFuZ2xlIH0gPSBjYWxjdWxhdGVQbGF0Zm9ybShzZWdtZW50LCBiYXNlQ29tcG9uZW50LmxpbmUzZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UgPCBhbmdsZSAmJiBhbmdsZSA8IChNYXRoLlBJIC8gMiAtIGNvcm5lckRpcmVjdGlvbkFuZ2xlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLnRhbihNYXRoLlBJIC8gMiAtIGFuZ2xlKSA8PSBzdGFydFdpZHRoIC8gMiAvIG5ld1BsYXRmb3JtTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHREZWx0YVZlYyA9IGRlbHRhVmVjO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50LnBhcmFtLnBsYXRmb3JtTGVuZ3RoID0gcGxhdGZvcm1MZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoYW5nbGUgPiAoTWF0aC5QSSAqIDMgLyAyICsgY29ybmVyRGlyZWN0aW9uQW5nbGUpICYmIGFuZ2xlIDwgKE1hdGguUEkgKiAyIC0gRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGgudGFuKGFuZ2xlIC0gTWF0aC5QSSAqIDMgLyAyKSA8PSBzdGFydFdpZHRoIC8gMiAvIG5ld1BsYXRmb3JtTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHREZWx0YVZlYyA9IGRlbHRhVmVjO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50LnBhcmFtLnBsYXRmb3JtTGVuZ3RoID0gcGxhdGZvcm1MZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVkZ2VOZXh0Q29tcG9uZW50cyA9IG5leHRDb21wb25lbnRzW3RlbXBMaW5lcy5sZW5ndGggLSAyXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBlZGdlTmV4dENvbXBvbmVudCBvZiBlZGdlTmV4dENvbXBvbmVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVkZ2VOZXh0U2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHNlZ21lbnRzLCBlZGdlTmV4dENvbXBvbmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWRnZU5leHRTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dC5wdXNoKHsgc2VnbWVudDogZWRnZU5leHRTZWdtZW50LCBkZWx0YVZlYzogbmV4dERlbHRhVmVjIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0U2VnbWVudHMgPSBnZXROZXh0Q29tcG9uZW50cyhzZWdtZW50LCBzZWdtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXh0U2VnbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0LnB1c2goLi4ubmV4dFNlZ21lbnRzLm1hcChzZWcgPT4gKHsgc2VnbWVudDogc2VnLCBkZWx0YVZlYzogbmV4dERlbHRhVmVjIH0pKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VnbWVudC5zdGFydCA9IHN0YXJ0LmFkZGVkKGRlbHRhVmVjKTtcbiAgICAgICAgICAgICAgICBzZWdtZW50LmVuZCA9IGVuZC5hZGRlZChuZXh0RGVsdGFWZWMpO1xuICAgICAgICAgICAgICAgIGlmIChiYXNlQ29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGJhc2VDb21wb25lbnQubGluZTNkLnN0YXJ0ID0gYmFzZUNvbXBvbmVudC5saW5lM2Quc3RhcnQuYWRkZWQoZGVsdGFWZWMpO1xuICAgICAgICAgICAgICAgICAgICBiYXNlQ29tcG9uZW50LmxpbmUzZC5lbmQgPSBiYXNlQ29tcG9uZW50LmxpbmUzZC5lbmQuYWRkZWQoZGVsdGFWZWMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB1blZpc2l0ZWQuZGVsZXRlKHNlZ21lbnQpO1xuICAgICAgICAgICAgICAgIGNoYW5nZWRTZWdtZW50cy5hZGQoc2VnbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50ID0gbmV4dDtcbiAgICAgICAgICAgIGlmICghY3VycmVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAoYnVsa0NoYW5nZSAmJiB1blZpc2l0ZWQuc2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVTZWdtZW50ID0gWy4uLnVuVmlzaXRlZC52YWx1ZXMoKV1bMF07XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBbeyBzZWdtZW50OiB0aGVTZWdtZW50LCBkZWx0YVZlYzogZHVtbXlWZWN0b3IzZCB9XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFsuLi5jaGFuZ2VkU2VnbWVudHNdO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBjaGFuZ2VQbGF0Zm9ybVdpZHRoKHN0YXJ0U2VnbWVudCwgc2VnbWVudHMsIG5ld1dpZHRoLCBidWxrQ2hhbmdlLCBvbmx5U3RhcnQgPSBmYWxzZSkge1xuICAgIGlmIChzZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgLy8gY29uc3QgcGxhdGZvcm1TZWdtZW50cyA9IHNlZ21lbnRzLmZpbHRlcihzZWcgPT4gc2VnLnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pO1xuICAgICAgICBsZXQgY3VycmVudCA9IFt7IHNlZ21lbnQ6IHN0YXJ0U2VnbWVudCwgZGVsdGFWZWM6IGR1bW15VmVjdG9yM2QgfV07XG4gICAgICAgIGNvbnN0IHVuVmlzaXRlZCA9IG5ldyBTZXQoc2VnbWVudHMpO1xuICAgICAgICBjb25zdCBjaGFuZ2VkU2VnbWVudHMgPSBuZXcgU2V0KCk7XG4gICAgICAgIHdoaWxlIChjdXJyZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IG5leHQgPSBbXTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgeyBzZWdtZW50LCBkZWx0YVZlYyB9IG9mIGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IHN0YXJ0LCBlbmQsIHBhcmFtOiB7IHR5cGUsIHN0YXJ0V2lkdGgsIHBsYXRmb3JtTGVuZ3RoIH0sIGJhc2VDb21wb25lbnQsIG5leHRDb21wb25lbnRzLCBtb2xkU2hhcGU6IHsgdmVydGljZXMsIHRlbXBMaW5lcyB9IH0gPSBzZWdtZW50O1xuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtICYmIChvbmx5U3RhcnQgPyBzZWdtZW50ID09PSBzdGFydFNlZ21lbnQgOiB0cnVlKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWx0YVdpZHRoID0gbmV3V2lkdGggLSBzdGFydFdpZHRoO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2hvdWxkQ2hhbmdlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWRnZUNvdW50ID0gdGVtcExpbmVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJhc2VDb21wb25lbnQgJiYgZGVsdGFXaWR0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgYW5nbGUsIGNvcm5lckRpcmVjdGlvbkFuZ2xlLCBsZWZ0Q29ubmVjdFBvaW50cywgcmlnaHRDb25uZWN0UG9pbnRzIH0gPSBjYWxjdWxhdGVQbGF0Zm9ybShzZWdtZW50LCBiYXNlQ29tcG9uZW50LmxpbmUzZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UgPCBhbmdsZSAmJiBhbmdsZSA8IChNYXRoLlBJIC8gMiAtIGNvcm5lckRpcmVjdGlvbkFuZ2xlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLnRhbihNYXRoLlBJIC8gMiAtIGFuZ2xlKSA8PSBuZXdXaWR0aCAvIDIgLyBwbGF0Zm9ybUxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG91bGRDaGFuZ2UgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZWRnZUNvdW50ICE9PSAobGVmdENvbm5lY3RQb2ludHMubGVuZ3RoICsgMykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvdWxkQ2hhbmdlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoYW5nbGUgPiAoTWF0aC5QSSAqIDMgLyAyICsgY29ybmVyRGlyZWN0aW9uQW5nbGUpICYmIGFuZ2xlIDwgKE1hdGguUEkgKiAyIC0gRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGgudGFuKGFuZ2xlIC0gTWF0aC5QSSAqIDMgLyAyKSA8PSBuZXdXaWR0aCAvIDIgLyBwbGF0Zm9ybUxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG91bGRDaGFuZ2UgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZWRnZUNvdW50ICE9PSAocmlnaHRDb25uZWN0UG9pbnRzLmxlbmd0aCArIDMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3VsZENoYW5nZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoc2hvdWxkQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvbGRWZXJ0aWNlcyA9IFsuLi52ZXJ0aWNlc107XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50LnBhcmFtLnN0YXJ0V2lkdGggPSBuZXdXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQucGFyYW0uZW5kV2lkdGggPSBuZXdXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlU2hhcGUoc2VnbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdWZXJ0aWNlcyA9IHNlZ21lbnQubW9sZFNoYXBlLnZlcnRpY2VzO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlZGdlQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVkZ2VOZXh0Q29tcG9uZW50cyA9IG5leHRDb21wb25lbnRzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9sZEVkZ2VTdGFydCA9IG9sZFZlcnRpY2VzW3RlbXBMaW5lc1tpXVswXV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2xkRWRnZUVuZCA9IG9sZFZlcnRpY2VzW3RlbXBMaW5lc1tpXVsxXV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2xkRWRnZUxlbmd0aCA9IG9sZEVkZ2VTdGFydC5kaXN0YW5jZVRvKG9sZEVkZ2VFbmQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9sZEVkZ2VEaXIgPSBvbGRFZGdlRW5kLnN1YnRyYWN0ZWQob2xkRWRnZVN0YXJ0KS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2xkRWRnZUNlbnRlciA9IGdldE1pZFBvaW50KG9sZEVkZ2VTdGFydCwgb2xkRWRnZUVuZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3RWRnZVN0YXJ0ID0gbmV3VmVydGljZXNbdGVtcExpbmVzW2ldWzBdXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdFZGdlRW5kID0gbmV3VmVydGljZXNbdGVtcExpbmVzW2ldWzFdXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdFZGdlRGlyID0gbmV3RWRnZUVuZC5zdWJ0cmFjdGVkKG5ld0VkZ2VTdGFydCkubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0VkZ2VDZW50ZXIgPSBnZXRNaWRQb2ludChuZXdFZGdlU3RhcnQsIG5ld0VkZ2VFbmQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlbnRlckRlbHRhRGlyID0gbmV3RWRnZUNlbnRlci5zdWJ0cmFjdGVkKG9sZEVkZ2VDZW50ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZWRnZU5leHRDb21wb25lbnQgb2YgZWRnZU5leHRDb21wb25lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVkZ2VOZXh0U2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHNlZ21lbnRzLCBlZGdlTmV4dENvbXBvbmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlZGdlTmV4dFNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRvQ2VudGVyRGlyID0gb2xkRWRnZUNlbnRlci5zdWJ0cmFjdGVkKGVkZ2VOZXh0U2VnbWVudC5zdGFydCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNFcXVhbCh0b0NlbnRlckRpci5sZW5ndGgsIDApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dC5wdXNoKHsgc2VnbWVudDogZWRnZU5leHRTZWdtZW50LCBkZWx0YVZlYzogZGVsdGFWZWMuYWRkZWQoY2VudGVyRGVsdGFEaXIpIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodG9DZW50ZXJEaXIuaXNTYW1lRGlyZWN0aW9uKG9sZEVkZ2VEaXIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dC5wdXNoKHsgc2VnbWVudDogZWRnZU5leHRTZWdtZW50LCBkZWx0YVZlYzogZGVsdGFWZWMuYWRkZWQoY2VudGVyRGVsdGFEaXIpLmFkZGVkKG5ld0VkZ2VEaXIubXVsdGlwbGllZCgtdG9DZW50ZXJEaXIubGVuZ3RoIC8gb2xkRWRnZUxlbmd0aCAqIDIpKSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQucHVzaCh7IHNlZ21lbnQ6IGVkZ2VOZXh0U2VnbWVudCwgZGVsdGFWZWM6IGRlbHRhVmVjLmFkZGVkKGNlbnRlckRlbHRhRGlyKS5hZGRlZChuZXdFZGdlRGlyLm11bHRpcGxpZWQodG9DZW50ZXJEaXIubGVuZ3RoIC8gb2xkRWRnZUxlbmd0aCAqIDIpKSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dFNlZ21lbnRzID0gZ2V0TmV4dENvbXBvbmVudHMoc2VnbWVudCwgc2VnbWVudHMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dC5wdXNoKC4uLm5leHRTZWdtZW50cy5tYXAoc2VnID0+ICh7IHNlZ21lbnQ6IHNlZywgZGVsdGFWZWMgfSkpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWdtZW50LnN0YXJ0ID0gc3RhcnQuYWRkZWQoZGVsdGFWZWMpO1xuICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kID0gZW5kLmFkZGVkKGRlbHRhVmVjKTtcbiAgICAgICAgICAgICAgICBpZiAoYmFzZUNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgICAgICBiYXNlQ29tcG9uZW50LmxpbmUzZC5zdGFydCA9IGJhc2VDb21wb25lbnQubGluZTNkLnN0YXJ0LmFkZGVkKGRlbHRhVmVjKTtcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNvbXBvbmVudC5saW5lM2QuZW5kID0gYmFzZUNvbXBvbmVudC5saW5lM2QuZW5kLmFkZGVkKGRlbHRhVmVjKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdW5WaXNpdGVkLmRlbGV0ZShzZWdtZW50KTtcbiAgICAgICAgICAgICAgICBjaGFuZ2VkU2VnbWVudHMuYWRkKHNlZ21lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3VycmVudCA9IG5leHQ7XG4gICAgICAgICAgICBpZiAoIWN1cnJlbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGJ1bGtDaGFuZ2UgJiYgdW5WaXNpdGVkLnNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlU2VnbWVudCA9IFsuLi51blZpc2l0ZWQudmFsdWVzKCldWzBdO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gW3sgc2VnbWVudDogdGhlU2VnbWVudCwgZGVsdGFWZWM6IGR1bW15VmVjdG9yM2QgfV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbLi4uY2hhbmdlZFNlZ21lbnRzXTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlQ2lyY3VsYXJTdGFpcihzZWdtZW50LCBjaXJjbGVUYW5nZW50KSB7XG4gICAgY29uc3QgeyBzdGFydCwgZW5kLCBwYXJhbSB9ID0gc2VnbWVudDtcbiAgICBjb25zdCB7IHN0YXJ0V2lkdGgsIGVuZFdpZHRoLCBob3Jpem9udGFsU3RlcCwgfSA9IHBhcmFtO1xuICAgIGxldCB2YWxpZCA9IHRydWU7XG4gICAgY29uc3QgdGFuZ2VudExlZnREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKGNpcmNsZVRhbmdlbnQpLm5vcm1hbGl6ZWQoKTtcbiAgICBjb25zdCBzdGFydEVuZERpciA9IGVuZC5zdWJ0cmFjdGVkKHN0YXJ0KS5ub3JtYWxpemVkKCk7XG4gICAgY29uc3Qgc3RhcnRFbmREaXN0YW5jZSA9IHN0YXJ0LmRpc3RhbmNlVG8oZW5kKTtcbiAgICBjb25zdCBtYXhXaWR0aCA9IE1hdGgubWF4KHN0YXJ0V2lkdGgsIGVuZFdpZHRoKTtcbiAgICBjb25zdCBlbmRBbmdsZSA9IHN0YXJ0RW5kRGlyLmFuZ2xlVG8oY2lyY2xlVGFuZ2VudCwgRGlyZWN0aW9uWik7XG4gICAgY29uc3QgaXNMZWZ0QXJjID0gZW5kQW5nbGUgPiBNYXRoLlBJO1xuICAgIGlmIChpc0xlZnRBcmMpIHtcbiAgICAgICAgc2VnbWVudC5jaXJjdWxhclNpZGUgPSBDaXJjdWxhclNpZGUuTGVmdDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHNlZ21lbnQuY2lyY3VsYXJTaWRlID0gQ2lyY3VsYXJTaWRlLlJpZ2h0O1xuICAgIH1cbiAgICBjb25zdCBlbmRDb21wbGVtZW50YXJ5QW5nbGUgPSBpc0xlZnRBcmMgPyBNYXRoLmFicyhlbmRBbmdsZSAtIE1hdGguUEkgLyAyIC0gTWF0aC5QSSkgOiBNYXRoLmFicyhlbmRBbmdsZSAtIE1hdGguUEkgLyAyKTtcbiAgICBjb25zdCBoYWxmQ2hvcmQgPSBzdGFydEVuZERpc3RhbmNlIC8gMjtcbiAgICBjb25zdCByYWRpdXMgPSBoYWxmQ2hvcmQgLyBNYXRoLmNvcyhlbmRDb21wbGVtZW50YXJ5QW5nbGUpO1xuICAgIGNvbnN0IGlubmVyUmFkaXVzID0gcmFkaXVzIC0gbWF4V2lkdGggLyAyO1xuICAgIGlmIChyYWRpdXMgPCBtYXhXaWR0aCAvIDIgKiAxLjIgfHwgaW5uZXJSYWRpdXMgPCBob3Jpem9udGFsU3RlcCAvIDIgLyAwLjgpIHtcbiAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgaG9yaXpvbnRhbFN0ZXBBbmdsZSA9IE1hdGguYXNpbihob3Jpem9udGFsU3RlcCAvIDIgLyByYWRpdXMpICogMjtcbiAgICBjb25zdCBjaXJjbGVOb3JtYWwgPSBpc0xlZnRBcmMgPyBEaXJlY3Rpb25aIDogRGlyZWN0aW9uWi5yZXZlcnNlZCgpO1xuICAgIGNvbnN0IGNpcmNsZUNlbnRlciA9IHN0YXJ0LmFkZGVkKHRhbmdlbnRMZWZ0RGlyLm11bHRpcGxpZWQoaXNMZWZ0QXJjID8gcmFkaXVzIDogLXJhZGl1cykpO1xuICAgIGNvbnN0IGFyYyA9IEdlb21MaWIuY3JlYXRlQXJjM2RCeUNlbnRlck5vcm1hbFJhZGl1cyhjaXJjbGVDZW50ZXIsIGNpcmNsZU5vcm1hbCwgcmFkaXVzLCBzdGFydCwgZW5kKTtcbiAgICBjb25zdCBhcmNBbmdsZSA9IGFyYy5hcmNBbmdsZTtcbiAgICBjb25zdCBzdGVwQ291bnQgPSBNYXRoLmNlaWwoYXJjQW5nbGUgLyBob3Jpem9udGFsU3RlcEFuZ2xlKTtcbiAgICBjb25zdCBsYXN0SG9yaXpvbnRhbEFuZ2xlID0gYXJjQW5nbGUgLSBob3Jpem9udGFsU3RlcEFuZ2xlICogKHN0ZXBDb3VudCAtIDEpO1xuICAgIGNvbnN0IHZhbGlkU3RlcENvdW50ID0gKGxhc3RIb3Jpem9udGFsQW5nbGUgPT09IDAgfHwgbGFzdEhvcml6b250YWxBbmdsZSA+IEFuZ2xlVG9sZXJhbmNlKSA/IHN0ZXBDb3VudCA6IHN0ZXBDb3VudCAtIDE7XG4gICAgaWYgKGhvcml6b250YWxTdGVwQW5nbGUgPj0gYXJjQW5nbGUgfHwgaG9yaXpvbnRhbFN0ZXBBbmdsZSA+PSBNYXRoLlBJIC8gMiB8fCB2YWxpZFN0ZXBDb3VudCA+PSBTdGVwQ291bnRMaW1pdCB8fCB2YWxpZFN0ZXBDb3VudCA8IDEpIHtcbiAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdGFuZ2VudExlZnREaXIsIHZhbGlkU3RlcENvdW50LCBpc0xlZnRBcmMsIHN0ZXBDb3VudCwgY2lyY2xlQ2VudGVyLCByYWRpdXMsIGhvcml6b250YWxTdGVwQW5nbGUsIGNpcmNsZU5vcm1hbCwgYXJjQW5nbGUsIGxhc3RIb3Jpem9udGFsQW5nbGUsXG4gICAgICAgIGlubmVyUmFkaXVzLCBlbmRBbmdsZSwgdmFsaWQsXG4gICAgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVQbGF0Zm9ybShzZWdtZW50LCBiYXNlTGluZVNlZzNkKSB7XG4gICAgY29uc3QgeyBzdGFydCwgcGFyYW0gfSA9IHNlZ21lbnQ7XG4gICAgY29uc3QgeyBzdGFydFdpZHRoLCBwbGF0Zm9ybUxlbmd0aCwgcGxhdGZvcm1MZW5ndGhMb2NrZWQgfSA9IHBhcmFtO1xuICAgIGNvbnN0IGN1ckRpciA9IHNlZ21lbnQuZW5kLnN1YnRyYWN0ZWQoc3RhcnQpO1xuICAgIGNvbnN0IGN1ckxlZnREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKGN1ckRpcikubm9ybWFsaXplZCgpO1xuICAgIGNvbnN0IHsgc3RhcnQ6IGJhc2VMaW5lU3RhcnQsIGVuZDogYmFzZUxpbmVFbmQgfSA9IGJhc2VMaW5lU2VnM2Q7XG4gICAgY29uc3QgYmFzZUxpbmVEaXIgPSBiYXNlTGluZUVuZC5zdWJ0cmFjdGVkKGJhc2VMaW5lU3RhcnQpLm5vcm1hbGl6ZWQoKTtcbiAgICBjb25zdCBwcmV2RGlyTm9ybWFsaXplZCA9IGJhc2VMaW5lRGlyLmNyb3NzKERpcmVjdGlvblopLm5vcm1hbGl6ZWQoKTtcbiAgICBjb25zdCBwcmV2TGVmdERpciA9IERpcmVjdGlvblouY3Jvc3MocHJldkRpck5vcm1hbGl6ZWQpLm5vcm1hbGl6ZWQoKTtcbiAgICBjb25zdCBhbmdsZSA9IGN1ckRpci5hbmdsZVRvKHByZXZEaXJOb3JtYWxpemVkLCBEaXJlY3Rpb25aKTtcbiAgICBjb25zdCBmcm9udExlbmd0aCA9IHBsYXRmb3JtTGVuZ3RoTG9ja2VkID8gcGxhdGZvcm1MZW5ndGggOiBNYXRoLmFicyhjdXJEaXIuZG90KHByZXZEaXJOb3JtYWxpemVkKSk7XG4gICAgY29uc3QgY3VyRW5kTGVmdENvcm5lciA9IHNlZ21lbnQuZW5kLmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpO1xuICAgIGNvbnN0IGNvcm5lckRpcmVjdGlvbiA9IGN1ckVuZExlZnRDb3JuZXIuc3VidHJhY3RlZChzZWdtZW50LnN0YXJ0KTtcbiAgICBjb25zdCBjb3JuZXJEaXJlY3Rpb25BbmdsZSA9IGNvcm5lckRpcmVjdGlvbi5hbmdsZShjdXJEaXIpO1xuICAgIGxldCBsZWZ0Q29ubmVjdFBvaW50cyA9IFtzdGFydC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSwgYmFzZUxpbmVFbmRdO1xuICAgIGxldCByaWdodENvbm5lY3RQb2ludHMgPSBbYmFzZUxpbmVTdGFydCwgc3RhcnQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpXTtcbiAgICBpZiAoRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UgPCBhbmdsZSAmJiBhbmdsZSA8IChNYXRoLlBJIC8gMiAtIGNvcm5lckRpcmVjdGlvbkFuZ2xlKSkge1xuICAgICAgICAvLyBzZWdtZW50LmNvbXBvbmVudERpcmVjdGlvblR5cGUgPSBDb21wb25lbnREaXJlY3Rpb25UeXBlLlJpZ2h0RnJvbnQ7XG4gICAgICAgIC8vIHBhcmFtLnBsYXRmb3JtTGVuZ3RoID0gc2VnbWVudC5lbmQuZGlzdGFuY2VUbyhzZWdtZW50LnN0YXJ0KTtcbiAgICAgICAgY29uc3QgYmFzZUxpbmVFbmREaXN0YW5jZSA9IHN0YXJ0LmRpc3RhbmNlVG8oYmFzZUxpbmVFbmQpO1xuICAgICAgICBjb25zdCBsZWZ0UHJvamVjdERpc3RhbmNlID0gc3RhcnRXaWR0aCAvIDIgKiBNYXRoLmNvcyhhbmdsZSk7XG4gICAgICAgIGlmIChsZWZ0UHJvamVjdERpc3RhbmNlIDwgYmFzZUxpbmVFbmREaXN0YW5jZSkge1xuICAgICAgICAgICAgY29uc3QgbDEgPSBzdGFydFdpZHRoIC8gMiAvIE1hdGguY29zKGFuZ2xlKTtcbiAgICAgICAgICAgIGlmIChsMSA+IGJhc2VMaW5lRW5kRGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhMSA9IGwxIC0gYmFzZUxpbmVFbmREaXN0YW5jZTtcbiAgICAgICAgICAgICAgICBjb25zdCBjMSA9IGExIC8gTWF0aC50YW4oYW5nbGUpO1xuICAgICAgICAgICAgICAgIGxlZnRDb25uZWN0UG9pbnRzID0gW3N0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoYmFzZUxpbmVFbmREaXN0YW5jZSkpLmFkZGVkKHByZXZEaXJOb3JtYWxpemVkLm11bHRpcGxpZWQoYzEpKSwgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChiYXNlTGluZUVuZERpc3RhbmNlKSldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGVmdENvbm5lY3RQb2ludHMgPSBbc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChsMSkpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChhbmdsZSA+IChNYXRoLlBJICogMyAvIDIgKyBjb3JuZXJEaXJlY3Rpb25BbmdsZSkgJiYgYW5nbGUgPCAoTWF0aC5QSSAqIDIgLSBEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSkpIHtcbiAgICAgICAgLy8gc2VnbWVudC5jb21wb25lbnREaXJlY3Rpb25UeXBlID0gQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5MZWZ0RnJvbnQ7XG4gICAgICAgIC8vIHBhcmFtLnBsYXRmb3JtTGVuZ3RoID0gc2VnbWVudC5lbmQuZGlzdGFuY2VUbyhzZWdtZW50LnN0YXJ0KTtcbiAgICAgICAgY29uc3QgYmFzZUxpbmVTdGFydERpc3RhbmNlID0gc3RhcnQuZGlzdGFuY2VUbyhiYXNlTGluZVN0YXJ0KTtcbiAgICAgICAgY29uc3QgcmlnaHRQcm9qZWN0RGlzdGFuY2UgPSBzdGFydFdpZHRoIC8gMiAqIE1hdGguY29zKGFuZ2xlKTtcbiAgICAgICAgaWYgKHJpZ2h0UHJvamVjdERpc3RhbmNlIDwgYmFzZUxpbmVTdGFydERpc3RhbmNlKSB7XG4gICAgICAgICAgICBjb25zdCBsMiA9IHN0YXJ0V2lkdGggLyAyIC8gTWF0aC5jb3MoYW5nbGUpO1xuICAgICAgICAgICAgaWYgKGwyID4gYmFzZUxpbmVTdGFydERpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYTIgPSBsMiAtIGJhc2VMaW5lU3RhcnREaXN0YW5jZTtcbiAgICAgICAgICAgICAgICBjb25zdCBjMiA9IGEyIC8gTWF0aC50YW4oTWF0aC5QSSAqIDIgLSBhbmdsZSk7XG4gICAgICAgICAgICAgICAgcmlnaHRDb25uZWN0UG9pbnRzID0gW3N0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLWJhc2VMaW5lU3RhcnREaXN0YW5jZSkpLCBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC1iYXNlTGluZVN0YXJ0RGlzdGFuY2UpKS5hZGRlZChwcmV2RGlyTm9ybWFsaXplZC5tdWx0aXBsaWVkKGMyKSldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmlnaHRDb25uZWN0UG9pbnRzID0gW3N0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLWwyKSldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IGFuZ2xlLCBmcm9udExlbmd0aCwgY29ybmVyRGlyZWN0aW9uQW5nbGUsIHByZXZEaXJOb3JtYWxpemVkLCBwcmV2TGVmdERpciwgbGVmdENvbm5lY3RQb2ludHMsIHJpZ2h0Q29ubmVjdFBvaW50cyB9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldE1pZFBvaW50KHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gR2VvbUxpYi5jcmVhdGVQb2ludDNkKChzdGFydC54ICsgZW5kLngpIC8gMiwgKHN0YXJ0LnkgKyBlbmQueSkgLyAyLCAoc3RhcnQueiArIGVuZC56KSAvIDIpO1xufVxuIiwiaW1wb3J0IHsgQW5nbGVUb2xlcmFuY2UsIERpcmVjdGlvbkFuZ2xlVG9sZXJhbmNlLCBEaXJlY3Rpb25aLCBkdW1teVBvaW50M2QsIExlbmd0aFRvbGVyYW5jZSwgU3RlcENvdW50TGltaXQgfSBmcm9tIFwiLi9jb25zdHNcIjtcbmltcG9ydCB7IGNhbGN1bGF0ZUNpcmN1bGFyU3RhaXIsIGNhbGN1bGF0ZVBsYXRmb3JtLCBnZXRTZWdtZW50QnlJbmRleCB9IGZyb20gXCIuL21lc2hVdGlsc1wiO1xuaW1wb3J0IHsgQ29tcG9uZW50VHlwZSwgQ29tcG9uZW50RGlyZWN0aW9uVHlwZSwgSGFuZHJhaWxEZWZhdWx0T2Zmc2V0TGVuZ3RoIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IGlzRXF1YWwgfSBmcm9tIFwiLi91dGlsc1wiO1xuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlU2hhcGUoc2VnbWVudCwgdGVtcCA9IHRydWUpIHtcbiAgICBjb25zdCB7IHBhcmFtOiB7IHR5cGUgfSwgY2lyY2xlVGFuZ2VudCB9ID0gc2VnbWVudDtcbiAgICBpZiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyKSB7XG4gICAgICAgIGdlbmVyYXRlU3RyYWlnaHRTdGFpclNoYXBlKHNlZ21lbnQsIHRlbXApO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlID09PSBDb21wb25lbnRUeXBlLkNpcmN1bGFyU3RhaXIpIHtcbiAgICAgICAgaWYgKGNpcmNsZVRhbmdlbnQpIHtcbiAgICAgICAgICAgIGdlbmVyYXRlQ2lyY3VsYXJTdGFpclNoYXBlKHNlZ21lbnQsIHRlbXApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZ2VuZXJhdGVTdHJhaWdodFN0YWlyU2hhcGUoc2VnbWVudCwgdGVtcCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGdlbmVyYXRlUGxhdGZvcm1TaGFwZShzZWdtZW50LCB0ZW1wKTtcbiAgICB9XG59XG5mdW5jdGlvbiBnZW5lcmF0ZUNpcmN1bGFyU3RhaXJTaGFwZShzZWdtZW50LCB0ZW1wID0gdHJ1ZSkge1xuICAgIGNvbnN0IHsgc3RhcnQsIHN0YWlyU2hhcGUsIG1vbGRTaGFwZSwgY29ybmVyU2hhcGUsIGNvcm5lck1vbGRTaGFwZSwgc3RhcnRIZWlnaHQsIGJhc2VDb21wb25lbnQsIGNpcmNsZVRhbmdlbnQsIHBhcmFtIH0gPSBzZWdtZW50O1xuICAgIGNvbnN0IHsgc3RhcnRXaWR0aCwgZW5kV2lkdGgsIHZlcnRpY2FsU3RlcCwgdXB3YXJkLCBwbGF0Zm9ybVRoaWNrbmVzcyB9ID0gcGFyYW07XG4gICAgaWYgKGNpcmNsZVRhbmdlbnQpIHtcbiAgICAgICAgY29uc3QgeyB0YW5nZW50TGVmdERpciwgdmFsaWRTdGVwQ291bnQsIGlzTGVmdEFyYywgc3RlcENvdW50LCBjaXJjbGVDZW50ZXIsIHJhZGl1cywgaG9yaXpvbnRhbFN0ZXBBbmdsZSwgY2lyY2xlTm9ybWFsLCBhcmNBbmdsZSwgbGFzdEhvcml6b250YWxBbmdsZSwgZW5kQW5nbGUsIHZhbGlkLCB9ID0gY2FsY3VsYXRlQ2lyY3VsYXJTdGFpcihzZWdtZW50LCBjaXJjbGVUYW5nZW50KTtcbiAgICAgICAgaWYgKE1hdGguYWJzKGVuZEFuZ2xlKSA8PSBEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSkge1xuICAgICAgICAgICAgc2VnbWVudC5jaXJjdWxhclNpZGUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICByZXR1cm4gZ2VuZXJhdGVTdHJhaWdodFN0YWlyU2hhcGUoc2VnbWVudCwgdGVtcCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF2YWxpZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbXTtcbiAgICAgICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXTtcbiAgICAgICAgbW9sZFNoYXBlLnZlcnRpY2VzID0gW107XG4gICAgICAgIG1vbGRTaGFwZS50ZW1wTGluZXMgPSBbXTtcbiAgICAgICAgY29ybmVyU2hhcGUudmVydGljZXMgPSBbXTtcbiAgICAgICAgY29ybmVyU2hhcGUudGVtcExpbmVzID0gW107XG4gICAgICAgIGNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtdO1xuICAgICAgICBjb3JuZXJNb2xkU2hhcGUudGVtcExpbmVzID0gW107XG4gICAgICAgIGNvbnN0IHsgdmVydGljZXMsIHRlbXBMaW5lcyB9ID0gc3RhaXJTaGFwZTtcbiAgICAgICAgY29uc3QgeyB2ZXJ0aWNlczogbW9sZFZlcnRpY2VzLCB0ZW1wTGluZXM6IG1vbGRUZW1wTGluZXMgfSA9IG1vbGRTaGFwZTtcbiAgICAgICAgY29uc3Qgc3RlcEhlaWdodCA9IHVwd2FyZCA/IHZlcnRpY2FsU3RlcCA6IC12ZXJ0aWNhbFN0ZXA7XG4gICAgICAgIHNlZ21lbnQuZW5kSGVpZ2h0ID0gc2VnbWVudC5zdGFydEhlaWdodCArIHZhbGlkU3RlcENvdW50ICogc3RlcEhlaWdodDtcbiAgICAgICAgc3RhaXJTaGFwZS5zdGVwQ291bnQgPSB2YWxpZFN0ZXBDb3VudDtcbiAgICAgICAgbW9sZFNoYXBlLnN0ZXBDb3VudCA9IHZhbGlkU3RlcENvdW50O1xuICAgICAgICBjb25zdCBsZWZ0UHQgPSBzdGFydC5hZGRlZCh0YW5nZW50TGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSk7XG4gICAgICAgIGNvbnN0IHJpZ2h0UHQgPSBzdGFydC5hZGRlZCh0YW5nZW50TGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpO1xuICAgICAgICBjb25zdCBzdGFydFJhZGl1c0RpciA9IGlzTGVmdEFyYyA/IHRhbmdlbnRMZWZ0RGlyLnJldmVyc2VkKCkgOiB0YW5nZW50TGVmdERpcjtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGVwQ291bnQgLSAxOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGN1clJvdGF0ZU1hdHJpeCA9IEdlb21MaWIuY3JlYXRlUm90YXRlTWF0cml4NChob3Jpem9udGFsU3RlcEFuZ2xlICogaSwgY2lyY2xlTm9ybWFsLCBkdW1teVBvaW50M2QpO1xuICAgICAgICAgICAgY29uc3QgY3VyUmFkaXVzRGlyID0gc3RhcnRSYWRpdXNEaXIuYXBwbGllZE1hdHJpeDQoY3VyUm90YXRlTWF0cml4KTtcbiAgICAgICAgICAgIGNvbnN0IGN1ckhhbGZXaWR0aCA9IChzdGFydFdpZHRoICsgKGVuZFdpZHRoIC0gc3RhcnRXaWR0aCkgKiAoaSAqIGhvcml6b250YWxTdGVwQW5nbGUpIC8gYXJjQW5nbGUpIC8gMiAqIChpc0xlZnRBcmMgPyAtMSA6IDEpO1xuICAgICAgICAgICAgY29uc3QgY3VyTGVmdE1vbGRQdCA9IGNpcmNsZUNlbnRlci5hZGRlZChjdXJSYWRpdXNEaXIubXVsdGlwbGllZChyYWRpdXMgKyBjdXJIYWxmV2lkdGgpKTtcbiAgICAgICAgICAgIGNvbnN0IGN1clJpZ2h0TW9sZFB0ID0gY2lyY2xlQ2VudGVyLmFkZGVkKGN1clJhZGl1c0Rpci5tdWx0aXBsaWVkKHJhZGl1cyAtIGN1ckhhbGZXaWR0aCkpO1xuICAgICAgICAgICAgY29uc3QgY3VyTGVmdFB0ID0gY3VyTGVmdE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBpICogc3RlcEhlaWdodCkpO1xuICAgICAgICAgICAgY29uc3QgY3VyUmlnaHRQdCA9IGN1clJpZ2h0TW9sZFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIGkgKiBzdGVwSGVpZ2h0KSk7XG4gICAgICAgICAgICBtb2xkVmVydGljZXMucHVzaChjdXJMZWZ0TW9sZFB0LCBjdXJSaWdodE1vbGRQdCk7XG4gICAgICAgICAgICBtb2xkVGVtcExpbmVzLnB1c2goWzIgKiBpLCAxICsgMiAqIGldLCBbMiAqIGksIDIgKyAyICogaV0sIFsxICsgMiAqIGksIDMgKyAyICogaV0pO1xuICAgICAgICAgICAgdmVydGljZXMucHVzaChjdXJMZWZ0UHQsIGN1clJpZ2h0UHQpO1xuICAgICAgICAgICAgY29uc3QgbmV4dFJvdGF0ZU1hdHJpeCA9IEdlb21MaWIuY3JlYXRlUm90YXRlTWF0cml4NChob3Jpem9udGFsU3RlcEFuZ2xlICogKGkgKyAxKSwgY2lyY2xlTm9ybWFsLCBkdW1teVBvaW50M2QpO1xuICAgICAgICAgICAgY29uc3QgbmV4dFJhZGl1c0RpciA9IHN0YXJ0UmFkaXVzRGlyLmFwcGxpZWRNYXRyaXg0KG5leHRSb3RhdGVNYXRyaXgpO1xuICAgICAgICAgICAgY29uc3QgbmV4dEhhbGZXaWR0aCA9IChzdGFydFdpZHRoICsgKGVuZFdpZHRoIC0gc3RhcnRXaWR0aCkgKiAoKGkgKyAxKSAqIGhvcml6b250YWxTdGVwQW5nbGUpIC8gYXJjQW5nbGUpIC8gMiAqIChpc0xlZnRBcmMgPyAtMSA6IDEpO1xuICAgICAgICAgICAgY29uc3QgbmV4dExlZnRNb2xkUHQgPSBjaXJjbGVDZW50ZXIuYWRkZWQobmV4dFJhZGl1c0Rpci5tdWx0aXBsaWVkKHJhZGl1cyArIG5leHRIYWxmV2lkdGgpKTtcbiAgICAgICAgICAgIGNvbnN0IG5leHRSaWdodE1vbGRQdCA9IGNpcmNsZUNlbnRlci5hZGRlZChuZXh0UmFkaXVzRGlyLm11bHRpcGxpZWQocmFkaXVzIC0gbmV4dEhhbGZXaWR0aCkpO1xuICAgICAgICAgICAgY29uc3QgbmV4dExlZnRQdCA9IG5leHRMZWZ0TW9sZFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIGkgKiBzdGVwSGVpZ2h0KSk7XG4gICAgICAgICAgICBjb25zdCBuZXh0UmlnaHRQdCA9IG5leHRSaWdodE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBpICogc3RlcEhlaWdodCkpO1xuICAgICAgICAgICAgaWYgKHVwd2FyZCkge1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2goY3VyTGVmdFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksIGN1clJpZ2h0UHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKG5leHRMZWZ0UHQsIG5leHRSaWdodFB0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzQgKiBpLCAxICsgNCAqIGldLCBbNCAqIGksIDIgKyA0ICogaV0sIFsxICsgNCAqIGksIDMgKyA0ICogaV0sIFsyICsgNCAqIGksIDMgKyA0ICogaV0sIFsyICsgNCAqIGksIDQgKyA0ICogaV0sIFszICsgNCAqIGksIDUgKyA0ICogaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGkgPT09IHN0ZXBDb3VudCAtIDIpIHtcbiAgICAgICAgICAgICAgICBtb2xkVmVydGljZXMucHVzaChuZXh0TGVmdE1vbGRQdCwgbmV4dFJpZ2h0TW9sZFB0KTtcbiAgICAgICAgICAgICAgICBtb2xkVGVtcExpbmVzLnB1c2goWzIgKiAoc3RlcENvdW50IC0gMSksIDEgKyAyICogKHN0ZXBDb3VudCAtIDEpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaSA9PT0gc3RlcENvdW50IC0gMikge1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2gobmV4dExlZnRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLCBuZXh0UmlnaHRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpKTtcbiAgICAgICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbNCAqIChzdGVwQ291bnQgLSAxKSwgMSArIDQgKiAoc3RlcENvdW50IC0gMSldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbGFzdFJvdGF0ZU1hdHJpeCA9IEdlb21MaWIuY3JlYXRlUm90YXRlTWF0cml4NChhcmNBbmdsZSwgY2lyY2xlTm9ybWFsLCBkdW1teVBvaW50M2QpO1xuICAgICAgICBjb25zdCBsYXN0UmFkaXVzRGlyID0gc3RhcnRSYWRpdXNEaXIuYXBwbGllZE1hdHJpeDQobGFzdFJvdGF0ZU1hdHJpeCk7XG4gICAgICAgIGNvbnN0IGxhc3RIYWxmV2lkdGggPSBpc0xlZnRBcmMgPyAtZW5kV2lkdGggLyAyIDogZW5kV2lkdGggLyAyO1xuICAgICAgICBjb25zdCBsYXN0TGVmdE1vbGRQdCA9IGNpcmNsZUNlbnRlci5hZGRlZChsYXN0UmFkaXVzRGlyLm11bHRpcGxpZWQocmFkaXVzICsgbGFzdEhhbGZXaWR0aCkpO1xuICAgICAgICBjb25zdCBsYXN0UmlnaHRNb2xkUHQgPSBjaXJjbGVDZW50ZXIuYWRkZWQobGFzdFJhZGl1c0Rpci5tdWx0aXBsaWVkKHJhZGl1cyAtIGxhc3RIYWxmV2lkdGgpKTtcbiAgICAgICAgY29uc3QgbGFzdExlZnRQdCA9IGxhc3RMZWZ0TW9sZFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIHN0ZXBDb3VudCAqIHN0ZXBIZWlnaHQpKTtcbiAgICAgICAgY29uc3QgbGFzdFJpZ2h0UHQgPSBsYXN0UmlnaHRNb2xkUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0ICsgc3RlcENvdW50ICogc3RlcEhlaWdodCkpO1xuICAgICAgICBpZiAoc3RlcENvdW50ID09PSAxKSB7XG4gICAgICAgICAgICBtb2xkVmVydGljZXMucHVzaChsZWZ0UHQsIHJpZ2h0UHQpO1xuICAgICAgICAgICAgbW9sZFRlbXBMaW5lcy5wdXNoKFsyICogKHN0ZXBDb3VudCAtIDEpLCAxICsgMiAqIChzdGVwQ291bnQgLSAxKV0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsYXN0SG9yaXpvbnRhbEFuZ2xlID49IEFuZ2xlVG9sZXJhbmNlIHx8IGxhc3RIb3Jpem9udGFsQW5nbGUgPT09IDApIHtcbiAgICAgICAgICAgIG1vbGRWZXJ0aWNlcy5wdXNoKGxhc3RMZWZ0TW9sZFB0LCBsYXN0UmlnaHRNb2xkUHQpO1xuICAgICAgICAgICAgbW9sZFRlbXBMaW5lcy5wdXNoKFsyICogKHN0ZXBDb3VudCAtIDEpLCAyICsgMiAqIChzdGVwQ291bnQgLSAxKV0sIFsxICsgMiAqIChzdGVwQ291bnQgLSAxKSwgMyArIDIgKiAoc3RlcENvdW50IC0gMSldLCBbMiAqIHN0ZXBDb3VudCwgMSArIDIgKiBzdGVwQ291bnRdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXB3YXJkKSB7XG4gICAgICAgICAgICBpZiAoc3RlcENvdW50ID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaChsZWZ0UHQsIHJpZ2h0UHQpO1xuICAgICAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFs0ICogKHN0ZXBDb3VudCAtIDEpLCAxICsgNCAqIChzdGVwQ291bnQgLSAxKV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsYXN0SG9yaXpvbnRhbEFuZ2xlID49IEFuZ2xlVG9sZXJhbmNlIHx8IGxhc3RIb3Jpem9udGFsQW5nbGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2gobGFzdExlZnRQdCwgbGFzdFJpZ2h0UHQpO1xuICAgICAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFs0ICogKHN0ZXBDb3VudCAtIDEpLCAyICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsxICsgNCAqIChzdGVwQ291bnQgLSAxKSwgMyArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMiArIDQgKiAoc3RlcENvdW50IC0gMSksIDMgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCA0ICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFszICsgNCAqIChzdGVwQ291bnQgLSAxKSwgNSArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbNCAqIHN0ZXBDb3VudCwgMSArIDQgKiBzdGVwQ291bnRdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoc3RlcENvdW50ID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaChsZWZ0UHQsIHJpZ2h0UHQpO1xuICAgICAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFs0ICogKHN0ZXBDb3VudCAtIDEpLCAxICsgNCAqIChzdGVwQ291bnQgLSAxKV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsYXN0SG9yaXpvbnRhbEFuZ2xlID49IEFuZ2xlVG9sZXJhbmNlIHx8IGxhc3RIb3Jpem9udGFsQW5nbGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKGxhc3RMZWZ0UHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0KSksIGxhc3RSaWdodFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCgtc3RlcEhlaWdodCkpKTtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKGxhc3RMZWZ0UHQsIGxhc3RSaWdodFB0KTtcbiAgICAgICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbNCAqIChzdGVwQ291bnQgLSAxKSwgMiArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMSArIDQgKiAoc3RlcENvdW50IC0gMSksIDMgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCAzICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsyICsgNCAqIChzdGVwQ291bnQgLSAxKSwgNCArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMyArIDQgKiAoc3RlcENvdW50IC0gMSksIDUgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzQgKiBzdGVwQ291bnQsIDEgKyA0ICogc3RlcENvdW50XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzdGVwQ291bnQgPiAxKSB7XG4gICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSAyLCAyICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsxICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMiArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBhY3R1YWxMYXN0U3RlcExlbmd0aCA9IGxhc3RIb3Jpem9udGFsQW5nbGUgPCBBbmdsZVRvbGVyYW5jZSA/IGhvcml6b250YWxTdGVwQW5nbGUgOiBsYXN0SG9yaXpvbnRhbEFuZ2xlO1xuICAgICAgICAgICAgaWYgKHVwd2FyZCkge1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0IC0gKDEgLSBhY3R1YWxMYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwQW5nbGUpICogc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQgLSAoMSAtIGFjdHVhbExhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXBBbmdsZSkgKiBzdGVwSGVpZ2h0KSkpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSBzdGVwQ291bnQgLSAobGFzdEhvcml6b250YWxBbmdsZSA+PSBBbmdsZVRvbGVyYW5jZSA/IDEgOiAyKTsgaiA+IDA7IGotLSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2SW5kID0gaiAqIDQ7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbdmVydGljZXMubGVuZ3RoIC0gMiwgMiArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMSArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaiA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMF0sIFszICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdkluZF0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0KSksIHZlcnRpY2VzW3ZJbmQgKyAxXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQpKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IHN0ZXBDb3VudCAtIChsYXN0SG9yaXpvbnRhbEFuZ2xlID49IEFuZ2xlVG9sZXJhbmNlID8gMSA6IDIpOyBqID49IDA7IGotLSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2SW5kID0gaiAqIDQ7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbdmVydGljZXMubGVuZ3RoIC0gMiwgMiArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMSArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaiA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMF0sIFszICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdkluZF0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSwgdmVydGljZXNbdkluZCArIDFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIDIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMiArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDBdLCBbMyArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh1cHdhcmQpIHtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCgtc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzWzBdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksIHZlcnRpY2VzWzFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChiYXNlQ29tcG9uZW50ICYmIGJhc2VDb21wb25lbnQubGluZTNkSW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3QgYmFzZUxpbmVTZWczZCA9IGJhc2VDb21wb25lbnQubGluZTNkO1xuICAgICAgICAgICAgY29uc3QgYmFzZUxpbmVEaXIgPSBiYXNlTGluZVNlZzNkLmVuZC5zdWJ0cmFjdGVkKGJhc2VMaW5lU2VnM2Quc3RhcnQpLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgIGNvbnN0IGFuZ2xlID0gY2lyY2xlVGFuZ2VudC5hbmdsZShiYXNlTGluZURpcik7XG4gICAgICAgICAgICBpZiAoYW5nbGUgPCBNYXRoLlBJIC8gMikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvcm5lckNvbm5lY3Rpb25Qb2ludDEgPSBzdGFydC5hZGRlZChiYXNlTGluZURpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMiAqIE1hdGguc2lnbihhbmdsZSkpKTtcbiAgICAgICAgICAgICAgICBjb3JuZXJNb2xkU2hhcGUudmVydGljZXMgPSBbc3RhcnQsIHN0YXJ0LmFkZGVkKHRhbmdlbnRMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSksIGNvcm5lckNvbm5lY3Rpb25Qb2ludDFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29ybmVyQ29ubmVjdGlvblBvaW50MiA9IHN0YXJ0LmFkZGVkKGJhc2VMaW5lRGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIgKiBNYXRoLnNpZ24oYW5nbGUpKSk7XG4gICAgICAgICAgICAgICAgY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzID0gW3N0YXJ0LCBjb3JuZXJDb25uZWN0aW9uUG9pbnQyLCBzdGFydC5hZGRlZCh0YW5nZW50TGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29ybmVyTW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtbMCwgMV0sIFsxLCAyXSwgWzIsIDBdXTtcbiAgICAgICAgICAgIGNvcm5lclNoYXBlLnZlcnRpY2VzID0gW1xuICAgICAgICAgICAgICAgIC4uLmNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAodiA9PiB2LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCkpKSxcbiAgICAgICAgICAgICAgICAuLi5jb3JuZXJNb2xkU2hhcGUudmVydGljZXMubWFwKHYgPT4gdi5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgLSBwbGF0Zm9ybVRoaWNrbmVzcykpKSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgIGNvcm5lclNoYXBlLnRlbXBMaW5lcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgWzAsIDFdLCBbMSwgMl0sIFsyLCAwXSxcbiAgICAgICAgICAgICAgICAgICAgWzMsIDRdLCBbNCwgNV0sIFs1LCAzXSxcbiAgICAgICAgICAgICAgICAgICAgWzAsIDNdLCBbMSwgNF0sIFsyLCA1XSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gZ2VuZXJhdGVTdHJhaWdodFN0YWlyU2hhcGUoc2VnbWVudCwgdGVtcCA9IHRydWUpIHtcbiAgICBjb25zdCB7IHN0YXJ0LCBlbmQsIHN0YWlyU2hhcGUsIG1vbGRTaGFwZSwgY29ybmVyU2hhcGUsIGNvcm5lck1vbGRTaGFwZSwgc3RhcnRIZWlnaHQsIGJhc2VDb21wb25lbnQsIHBhcmFtIH0gPSBzZWdtZW50O1xuICAgIGNvbnN0IHsgc3RhcnRXaWR0aCwgZW5kV2lkdGgsIGhvcml6b250YWxTdGVwLCB2ZXJ0aWNhbFN0ZXAsIHVwd2FyZCwgcGxhdGZvcm1UaGlja25lc3MgfSA9IHBhcmFtO1xuICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbXTtcbiAgICBzdGFpclNoYXBlLnRlbXBMaW5lcyA9IFtdO1xuICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtdO1xuICAgIG1vbGRTaGFwZS50ZW1wTGluZXMgPSBbXTtcbiAgICBjb3JuZXJTaGFwZS52ZXJ0aWNlcyA9IFtdO1xuICAgIGNvcm5lclNoYXBlLnRlbXBMaW5lcyA9IFtdO1xuICAgIGNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtdO1xuICAgIGNvcm5lck1vbGRTaGFwZS50ZW1wTGluZXMgPSBbXTtcbiAgICBjb25zdCB7IHZlcnRpY2VzLCB0ZW1wTGluZXMgfSA9IHN0YWlyU2hhcGU7XG4gICAgY29uc3QgeyB2ZXJ0aWNlczogbW9sZFZlcnRpY2VzLCB0ZW1wTGluZXM6IG1vbGRUZW1wTGluZXMgfSA9IG1vbGRTaGFwZTtcbiAgICBsZXQgaG9yaXpvbnRhbEZyb250RGlyID0gZW5kLnN1YnRyYWN0ZWQoc3RhcnQpLm5vcm1hbGl6ZWQoKTtcbiAgICBsZXQgc3RhcnRFbmREaXN0YW5jZSA9IHN0YXJ0LmRpc3RhbmNlVG8oZW5kKTtcbiAgICBsZXQgaG9yaXpvbnRhbExlZnREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKGhvcml6b250YWxGcm9udERpcik7XG4gICAgY29uc3Qgc3RlcEZsb2F0Q291bnQgPSBzdGFydEVuZERpc3RhbmNlIC8gaG9yaXpvbnRhbFN0ZXA7XG4gICAgY29uc3Qgc3RlcENvdW50ID0gTWF0aC5jZWlsKHN0ZXBGbG9hdENvdW50KTtcbiAgICBjb25zdCBsYXN0U3RlcExlbmd0aCA9IHN0YXJ0RW5kRGlzdGFuY2UgLSAoc3RlcENvdW50IC0gMSkgKiBob3Jpem9udGFsU3RlcDtcbiAgICBjb25zdCB2YWxpZFN0ZXBDb3VudCA9IChsYXN0U3RlcExlbmd0aCA9PT0gMCB8fCBsYXN0U3RlcExlbmd0aCA+IExlbmd0aFRvbGVyYW5jZSkgPyBzdGVwQ291bnQgOiBzdGVwQ291bnQgLSAxO1xuICAgIGlmICh2YWxpZFN0ZXBDb3VudCA8IDEgfHwgdmFsaWRTdGVwQ291bnQgPj0gU3RlcENvdW50TGltaXQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoYmFzZUNvbXBvbmVudCkge1xuICAgICAgICBjb25zdCBiYXNlTGluZVNlZzNkID0gYmFzZUNvbXBvbmVudC5saW5lM2Q7XG4gICAgICAgIGNvbnN0IGJhc2VMaW5lRGlyID0gYmFzZUxpbmVTZWczZC5lbmQuc3VidHJhY3RlZChiYXNlTGluZVNlZzNkLnN0YXJ0KS5ub3JtYWxpemVkKCk7XG4gICAgICAgIGNvbnN0IGFuZ2xlID0gaG9yaXpvbnRhbEZyb250RGlyLmFuZ2xlKGJhc2VMaW5lRGlyKTtcbiAgICAgICAgY29uc3QgZGVsdGFBbmdsZSA9IE1hdGguYWJzKGFuZ2xlIC0gTWF0aC5QSSAvIDIpO1xuICAgICAgICBpZiAoZGVsdGFBbmdsZSA8PSBEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSkge1xuICAgICAgICAgICAgc2VnbWVudC5jb21wb25lbnREaXJlY3Rpb25UeXBlID0gQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5Gcm9udDtcbiAgICAgICAgICAgIGhvcml6b250YWxGcm9udERpciA9IGJhc2VMaW5lRGlyLmNyb3NzKGhvcml6b250YWxGcm9udERpci5jcm9zcyhiYXNlTGluZURpcikpLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgIHN0YXJ0RW5kRGlzdGFuY2UgPSBzdGFydEVuZERpc3RhbmNlICogTWF0aC5jb3MoZGVsdGFBbmdsZSk7XG4gICAgICAgICAgICBob3Jpem9udGFsTGVmdERpciA9IERpcmVjdGlvblouY3Jvc3MoaG9yaXpvbnRhbEZyb250RGlyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChhbmdsZSA8IE1hdGguUEkgLyAyKSB7XG4gICAgICAgICAgICAgICAgc2VnbWVudC5jb21wb25lbnREaXJlY3Rpb25UeXBlID0gQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5MZWZ0O1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvcm5lckNvbm5lY3Rpb25Qb2ludDEgPSBzdGFydC5hZGRlZChiYXNlTGluZURpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMiAqIE1hdGguc2lnbihhbmdsZSkpKTtcbiAgICAgICAgICAgICAgICBjb3JuZXJNb2xkU2hhcGUudmVydGljZXMgPSBbc3RhcnQsIHN0YXJ0LmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSksIGNvcm5lckNvbm5lY3Rpb25Qb2ludDFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VnbWVudC5jb21wb25lbnREaXJlY3Rpb25UeXBlID0gQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5SaWdodDtcbiAgICAgICAgICAgICAgICBjb25zdCBjb3JuZXJDb25uZWN0aW9uUG9pbnQyID0gc3RhcnQuYWRkZWQoYmFzZUxpbmVEaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMiAqIE1hdGguc2lnbihhbmdsZSkpKTtcbiAgICAgICAgICAgICAgICBjb3JuZXJNb2xkU2hhcGUudmVydGljZXMgPSBbc3RhcnQsIGNvcm5lckNvbm5lY3Rpb25Qb2ludDIsIHN0YXJ0LmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb3JuZXJNb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgMF1dO1xuICAgICAgICAgICAgY29ybmVyU2hhcGUudmVydGljZXMgPSBbXG4gICAgICAgICAgICAgICAgLi4uY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzLm1hcCh2ID0+IHYuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkpLFxuICAgICAgICAgICAgICAgIC4uLmNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAodiA9PiB2LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCAtIHBsYXRmb3JtVGhpY2tuZXNzKSkpLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgY29ybmVyU2hhcGUudGVtcExpbmVzID0gW1xuICAgICAgICAgICAgICAgICAgICBbMCwgMV0sIFsxLCAyXSwgWzIsIDBdLFxuICAgICAgICAgICAgICAgICAgICBbMywgNF0sIFs0LCA1XSwgWzUsIDNdLFxuICAgICAgICAgICAgICAgICAgICBbMCwgM10sIFsxLCA0XSwgWzIsIDVdLFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgc3RlcEhlaWdodCA9IHVwd2FyZCA/IHZlcnRpY2FsU3RlcCA6IC12ZXJ0aWNhbFN0ZXA7XG4gICAgc2VnbWVudC5lbmRIZWlnaHQgPSBzZWdtZW50LnN0YXJ0SGVpZ2h0ICsgdmFsaWRTdGVwQ291bnQgKiBzdGVwSGVpZ2h0O1xuICAgIHN0YWlyU2hhcGUuc3RlcENvdW50ID0gdmFsaWRTdGVwQ291bnQ7XG4gICAgbW9sZFNoYXBlLnN0ZXBDb3VudCA9IHZhbGlkU3RlcENvdW50O1xuICAgIGNvbnN0IGxlZnRQdCA9IHN0YXJ0LmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKTtcbiAgICBjb25zdCByaWdodFB0ID0gc3RhcnQuYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKTtcbiAgICBjb25zdCB3aWR0aERlbHRhID0gKGVuZFdpZHRoIC0gc3RhcnRXaWR0aCkgLyAyIC8gKHN0ZXBGbG9hdENvdW50KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ZXBDb3VudCAtIDE7IGkrKykge1xuICAgICAgICBjb25zdCBjdXJMZWZ0TW9sZFB0ID0gbGVmdFB0LmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGkgKiBob3Jpem9udGFsU3RlcCkpLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoaSAqIHdpZHRoRGVsdGEpKTtcbiAgICAgICAgY29uc3QgY3VyUmlnaHRNb2xkUHQgPSByaWdodFB0LmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGkgKiBob3Jpem9udGFsU3RlcCkpLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoLWkgKiB3aWR0aERlbHRhKSk7XG4gICAgICAgIGNvbnN0IGN1ckxlZnRQdCA9IGN1ckxlZnRNb2xkUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0ICsgaSAqIHN0ZXBIZWlnaHQpKTtcbiAgICAgICAgY29uc3QgY3VyUmlnaHRQdCA9IGN1clJpZ2h0TW9sZFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIGkgKiBzdGVwSGVpZ2h0KSk7XG4gICAgICAgIG1vbGRWZXJ0aWNlcy5wdXNoKGN1ckxlZnRNb2xkUHQsIGN1clJpZ2h0TW9sZFB0KTtcbiAgICAgICAgbW9sZFRlbXBMaW5lcy5wdXNoKFsyICogaSwgMSArIDIgKiBpXSwgWzIgKiBpLCAyICsgMiAqIGldLCBbMSArIDIgKiBpLCAzICsgMiAqIGldKTtcbiAgICAgICAgdmVydGljZXMucHVzaChjdXJMZWZ0UHQsIGN1clJpZ2h0UHQpO1xuICAgICAgICBpZiAodXB3YXJkKSB7XG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKGN1ckxlZnRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLCBjdXJSaWdodFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmVydGljZXMucHVzaChjdXJMZWZ0UHQuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaG9yaXpvbnRhbFN0ZXApKSwgY3VyUmlnaHRQdC5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzQgKiBpLCAxICsgNCAqIGldLCBbNCAqIGksIDIgKyA0ICogaV0sIFsxICsgNCAqIGksIDMgKyA0ICogaV0sIFsyICsgNCAqIGksIDMgKyA0ICogaV0sIFsyICsgNCAqIGksIDQgKyA0ICogaV0sIFszICsgNCAqIGksIDUgKyA0ICogaV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIG1vbGRWZXJ0aWNlcy5wdXNoKHN0ZXBDb3VudCA+IDEgPyBtb2xkVmVydGljZXNbbW9sZFZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQod2lkdGhEZWx0YSkpLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSkgOiBsZWZ0UHQsIHN0ZXBDb3VudCA+IDEgPyBtb2xkVmVydGljZXNbbW9sZFZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQod2lkdGhEZWx0YSkpLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSkgOiByaWdodFB0KTtcbiAgICBtb2xkVGVtcExpbmVzLnB1c2goWzIgKiAoc3RlcENvdW50IC0gMSksIDEgKyAyICogKHN0ZXBDb3VudCAtIDEpXSk7XG4gICAgaWYgKGxhc3RTdGVwTGVuZ3RoID4gTGVuZ3RoVG9sZXJhbmNlIHx8IGxhc3RTdGVwTGVuZ3RoID09PSAwKSB7XG4gICAgICAgIG1vbGRWZXJ0aWNlcy5wdXNoKG1vbGRWZXJ0aWNlc1ttb2xkVmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwICogd2lkdGhEZWx0YSkpLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoKSksIG1vbGRWZXJ0aWNlc1ttb2xkVmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZCgtbGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcCAqIHdpZHRoRGVsdGEpKS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCkpKTtcbiAgICAgICAgbW9sZFRlbXBMaW5lcy5wdXNoKFsyICogKHN0ZXBDb3VudCAtIDEpLCAyICsgMiAqIChzdGVwQ291bnQgLSAxKV0sIFsxICsgMiAqIChzdGVwQ291bnQgLSAxKSwgMyArIDIgKiAoc3RlcENvdW50IC0gMSldLCBbMiAqIHN0ZXBDb3VudCwgMSArIDIgKiBzdGVwQ291bnRdKTtcbiAgICB9XG4gICAgaWYgKHVwd2FyZCkge1xuICAgICAgICB2ZXJ0aWNlcy5wdXNoKHN0ZXBDb3VudCA+IDEgPyB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQod2lkdGhEZWx0YSkpIDogbGVmdFB0LCBzdGVwQ291bnQgPiAxID8gdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaG9yaXpvbnRhbFN0ZXApKS5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKC13aWR0aERlbHRhKSkgOiByaWdodFB0KTtcbiAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFs0ICogKHN0ZXBDb3VudCAtIDEpLCAxICsgNCAqIChzdGVwQ291bnQgLSAxKV0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsYXN0U3RlcExlbmd0aCA+IExlbmd0aFRvbGVyYW5jZSB8fCBsYXN0U3RlcExlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpKTtcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwICogd2lkdGhEZWx0YSkpLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoKSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoLWxhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXAgKiB3aWR0aERlbHRhKSkuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGgpKSk7XG4gICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFs0ICogKHN0ZXBDb3VudCAtIDEpLCAyICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsxICsgNCAqIChzdGVwQ291bnQgLSAxKSwgMyArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMiArIDQgKiAoc3RlcENvdW50IC0gMSksIDMgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCA0ICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFszICsgNCAqIChzdGVwQ291bnQgLSAxKSwgNSArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbNCAqIHN0ZXBDb3VudCwgMSArIDQgKiBzdGVwQ291bnRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmVydGljZXMucHVzaChzdGVwQ291bnQgPiAxID8gdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKS5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKHdpZHRoRGVsdGEpKSA6IGxlZnRQdCwgc3RlcENvdW50ID4gMSA/IHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkuYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZCgtd2lkdGhEZWx0YSkpIDogcmlnaHRQdCk7XG4gICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbNCAqIChzdGVwQ291bnQgLSAxKSwgMSArIDQgKiAoc3RlcENvdW50IC0gMSldKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGFzdFN0ZXBMZW5ndGggPiBMZW5ndGhUb2xlcmFuY2UgfHwgbGFzdFN0ZXBMZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwICogd2lkdGhEZWx0YSkpLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoKSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoLWxhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXAgKiB3aWR0aERlbHRhKSkuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGgpKSk7XG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xuICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChcbiAgICAgICAgICAgICAgICAvLyBbNCAqIChzdGVwQ291bnQgLSAxKSwgMSArIDQgKiAoc3RlcENvdW50IC0gMSldLFxuICAgICAgICAgICAgICAgIFs0ICogKHN0ZXBDb3VudCAtIDEpLCAyICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsxICsgNCAqIChzdGVwQ291bnQgLSAxKSwgMyArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMiArIDQgKiAoc3RlcENvdW50IC0gMSksIDMgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCA0ICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFszICsgNCAqIChzdGVwQ291bnQgLSAxKSwgNSArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbNCAqIHN0ZXBDb3VudCwgMSArIDQgKiBzdGVwQ291bnRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoc3RlcENvdW50ID4gMSkge1xuICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIDIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMiArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDQgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCA1ICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFt2ZXJ0aWNlcy5sZW5ndGggKyAyLCAxICsgdmVydGljZXMubGVuZ3RoICsgMl0sIFt2ZXJ0aWNlcy5sZW5ndGggKyAyLCAwXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggKyAyLCAxXSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYWN0dWFsTGFzdFN0ZXBMZW5ndGggPSBsYXN0U3RlcExlbmd0aCA8IExlbmd0aFRvbGVyYW5jZSA/IGhvcml6b250YWxTdGVwIDogbGFzdFN0ZXBMZW5ndGg7XG4gICAgICAgIGlmICh1cHdhcmQpIHtcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0IC0gKDEgLSBhY3R1YWxMYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwKSAqIHN0ZXBIZWlnaHQpKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0IC0gKDEgLSBhY3R1YWxMYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwKSAqIHN0ZXBIZWlnaHQpKSk7XG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzWzBdLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSksIHZlcnRpY2VzWzFdLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZCgtYWN0dWFsTGFzdFN0ZXBMZW5ndGgpKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoLWFjdHVhbExhc3RTdGVwTGVuZ3RoKSkpO1xuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1swXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1sxXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSAyLCAyICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsxICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMiArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAwXSwgWzMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAxXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVwd2FyZCkge1xuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQpKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0KSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1swXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1sxXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGdlbmVyYXRlUGxhdGZvcm1TaGFwZShzZWdtZW50LCB0ZW1wID0gdHJ1ZSkge1xuICAgIGNvbnN0IHsgc3RhcnQsIHN0YXJ0SGVpZ2h0LCBiYXNlQ29tcG9uZW50LCBzdGFpclNoYXBlLCBtb2xkU2hhcGUsIGNvcm5lclNoYXBlLCBjb3JuZXJNb2xkU2hhcGUsIHBhcmFtIH0gPSBzZWdtZW50O1xuICAgIGNvbnN0IHsgc3RhcnRXaWR0aCwgb2Zmc2V0V2lkdGgsIHdpdGhPZmZzZXQsIHBsYXRmb3JtVGhpY2tuZXNzLCBwbGF0Zm9ybUxlbmd0aCwgcGxhdGZvcm1MZW5ndGhMb2NrZWQsIG1vZGVsRWRpdGluZyB9ID0gcGFyYW07XG4gICAgY29uc3QgY3VyRGlyID0gc2VnbWVudC5lbmQuc3VidHJhY3RlZChzdGFydCk7XG4gICAgY29uc3QgY3VyRGlyTm9ybWFsaXplZCA9IHNlZ21lbnQuZW5kLnN1YnRyYWN0ZWQoc3RhcnQpLm5vcm1hbGl6ZWQoKTtcbiAgICBjb25zdCBjdXJMZWZ0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhjdXJEaXIpLm5vcm1hbGl6ZWQoKTtcbiAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gW107XG4gICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXTtcbiAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXTtcbiAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW107XG4gICAgY29ybmVyU2hhcGUudmVydGljZXMgPSBbXTtcbiAgICBjb3JuZXJTaGFwZS50ZW1wTGluZXMgPSBbXTtcbiAgICBjb3JuZXJNb2xkU2hhcGUudmVydGljZXMgPSBbXTtcbiAgICBjb3JuZXJNb2xkU2hhcGUudGVtcExpbmVzID0gW107XG4gICAgc2VnbWVudC5lbmQgPSBwbGF0Zm9ybUxlbmd0aExvY2tlZCA/IHNlZ21lbnQuc3RhcnQuYWRkZWQoY3VyRGlyTm9ybWFsaXplZC5tdWx0aXBsaWVkKHBsYXRmb3JtTGVuZ3RoKSkgOiBzZWdtZW50LmVuZDtcbiAgICBzZWdtZW50LmVuZEhlaWdodCA9IHN0YXJ0SGVpZ2h0O1xuICAgIGlmICghbW9kZWxFZGl0aW5nKSB7XG4gICAgICAgIHBhcmFtLndpdGhPZmZzZXQgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGJhc2VDb21wb25lbnQpIHtcbiAgICAgICAgLy8gY29uc3QgeyBzdGFydDogYmFzZUxpbmVTdGFydCwgZW5kOiBiYXNlTGluZUVuZCB9ID0gYmFzZUNvbXBvbmVudC5saW5lM2Q7XG4gICAgICAgIGNvbnN0IHsgYW5nbGUsIGZyb250TGVuZ3RoLCBjb3JuZXJEaXJlY3Rpb25BbmdsZSwgcHJldkRpck5vcm1hbGl6ZWQsIHByZXZMZWZ0RGlyLCBsZWZ0Q29ubmVjdFBvaW50cywgcmlnaHRDb25uZWN0UG9pbnRzIH0gPSBjYWxjdWxhdGVQbGF0Zm9ybShzZWdtZW50LCBiYXNlQ29tcG9uZW50LmxpbmUzZCk7XG4gICAgICAgIGlmICgoYW5nbGUgPj0gTWF0aC5QSSAmJiBhbmdsZSA8PSAoTWF0aC5QSSAqIDMgLyAyICsgY29ybmVyRGlyZWN0aW9uQW5nbGUpKSB8fCAobW9kZWxFZGl0aW5nICYmIHdpdGhPZmZzZXQgJiYgb2Zmc2V0V2lkdGggPj0gMCkpIHtcbiAgICAgICAgICAgIHNlZ21lbnQuY29tcG9uZW50RGlyZWN0aW9uVHlwZSA9IENvbXBvbmVudERpcmVjdGlvblR5cGUuTGVmdDtcbiAgICAgICAgICAgIHBhcmFtLnBsYXRmb3JtTGVuZ3RoID0gZnJvbnRMZW5ndGg7XG4gICAgICAgICAgICBjb25zdCBmcm9udEVuZCA9IHNlZ21lbnQuc3RhcnQuYWRkZWQocHJldkRpck5vcm1hbGl6ZWQubXVsdGlwbGllZChmcm9udExlbmd0aCkpO1xuICAgICAgICAgICAgc2VnbWVudC5lbmQgPSBmcm9udEVuZDtcbiAgICAgICAgICAgIGNvbnN0IGxlZnRMZW5ndGggPSB3aXRoT2Zmc2V0ICYmIG1vZGVsRWRpdGluZyA/IChvZmZzZXRXaWR0aCArIHN0YXJ0V2lkdGggLyAyKSA6IGN1ckRpci5kb3QocHJldkxlZnREaXIpO1xuICAgICAgICAgICAgaWYgKGxlZnRMZW5ndGggPiBzdGFydFdpZHRoIC8gMikge1xuICAgICAgICAgICAgICAgIHBhcmFtLndpdGhPZmZzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHBhcmFtLm9mZnNldFdpZHRoID0gbGVmdExlbmd0aCAtIHN0YXJ0V2lkdGggLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdmFsaWRMZWZ0TGVuZ3RoID0gTWF0aC5tYXgoc3RhcnRXaWR0aCAvIDIsIGxlZnRMZW5ndGgpO1xuICAgICAgICAgICAgbW9sZFNoYXBlLnZlcnRpY2VzID0gW1xuICAgICAgICAgICAgICAgIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQodmFsaWRMZWZ0TGVuZ3RoKSksXG4gICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQodmFsaWRMZWZ0TGVuZ3RoKSksXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtbMCwgMV0sIFsxLCAyXSwgWzIsIDNdLCBbMywgMF1dO1xuICAgICAgICAgICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFsuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKSksXG4gICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0IC0gcGxhdGZvcm1UaGlja25lc3MpKSksXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICBzdGFpclNoYXBlLnRlbXBMaW5lcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcyxcbiAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcy5tYXAoc2VnID0+IFtzZWdbMF0gKyA0LCBzZWdbMV0gKyA0XSksXG4gICAgICAgICAgICAgICAgICAgIFswLCA0XSwgWzEsIDVdLCBbMiwgNl0sIFszLCA3XSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKChhbmdsZSA8IE1hdGguUEkgJiYgYW5nbGUgPj0gKE1hdGguUEkgLyAyIC0gY29ybmVyRGlyZWN0aW9uQW5nbGUpKSB8fCAobW9kZWxFZGl0aW5nICYmIHdpdGhPZmZzZXQgJiYgb2Zmc2V0V2lkdGggPCAwKSkge1xuICAgICAgICAgICAgc2VnbWVudC5jb21wb25lbnREaXJlY3Rpb25UeXBlID0gQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5SaWdodDtcbiAgICAgICAgICAgIHBhcmFtLnBsYXRmb3JtTGVuZ3RoID0gZnJvbnRMZW5ndGg7XG4gICAgICAgICAgICBjb25zdCByaWdodExlbmd0aCA9IHdpdGhPZmZzZXQgJiYgbW9kZWxFZGl0aW5nID8gKC1vZmZzZXRXaWR0aCArIHN0YXJ0V2lkdGggLyAyKSA6IC1jdXJEaXIuZG90KHByZXZMZWZ0RGlyKTtcbiAgICAgICAgICAgIGNvbnN0IGZyb250RW5kMSA9IHNlZ21lbnQuc3RhcnQuYWRkZWQocHJldkRpck5vcm1hbGl6ZWQubXVsdGlwbGllZChmcm9udExlbmd0aCkpO1xuICAgICAgICAgICAgc2VnbWVudC5lbmQgPSBmcm9udEVuZDE7XG4gICAgICAgICAgICBpZiAocmlnaHRMZW5ndGggPiBzdGFydFdpZHRoIC8gMikge1xuICAgICAgICAgICAgICAgIHBhcmFtLndpdGhPZmZzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHBhcmFtLm9mZnNldFdpZHRoID0gLShyaWdodExlbmd0aCAtIHN0YXJ0V2lkdGggLyAyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHZhbGlkUmlnaHRMZW5ndGggPSBNYXRoLm1heChzdGFydFdpZHRoIC8gMiwgcmlnaHRMZW5ndGgpO1xuICAgICAgICAgICAgbW9sZFNoYXBlLnZlcnRpY2VzID0gW1xuICAgICAgICAgICAgICAgIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC12YWxpZFJpZ2h0TGVuZ3RoKSksXG4gICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtdmFsaWRSaWdodExlbmd0aCkpLFxuICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgM10sIFszLCAwXV07XG4gICAgICAgICAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gWy4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCkpKSxcbiAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgLSBwbGF0Zm9ybVRoaWNrbmVzcykpKSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW1xuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLFxuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLm1hcChzZWcgPT4gW3NlZ1swXSArIDQsIHNlZ1sxXSArIDRdKSxcbiAgICAgICAgICAgICAgICAgICAgWzAsIDRdLCBbMSwgNV0sIFsyLCA2XSwgWzMsIDddLFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwYXJhbS5vZmZzZXRXaWR0aCA9IDA7XG4gICAgICAgICAgICBpZiAoYW5nbGUgPD0gRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UgfHwgYW5nbGUgPj0gKE1hdGguUEkgKiAyIC0gRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UpKSB7XG4gICAgICAgICAgICAgICAgc2VnbWVudC5jb21wb25lbnREaXJlY3Rpb25UeXBlID0gQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5Gcm9udDtcbiAgICAgICAgICAgICAgICBzZWdtZW50LmVuZCA9IHNlZ21lbnQuc3RhcnQuYWRkZWQocHJldkRpck5vcm1hbGl6ZWQubXVsdGlwbGllZChmcm9udExlbmd0aCkpO1xuICAgICAgICAgICAgICAgIHBhcmFtLnBsYXRmb3JtTGVuZ3RoID0gZnJvbnRMZW5ndGg7XG4gICAgICAgICAgICAgICAgbW9sZFNoYXBlLnZlcnRpY2VzID0gW1xuICAgICAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSksXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyICsgb2Zmc2V0V2lkdGgpKSxcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIgKyBvZmZzZXRXaWR0aCkpLFxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSksXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgM10sIFszLCAwXV07XG4gICAgICAgICAgICAgICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFsuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKSksXG4gICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCAtIHBsYXRmb3JtVGhpY2tuZXNzKSkpLFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcy5tYXAoc2VnID0+IFtzZWdbMF0gKyA0LCBzZWdbMV0gKyA0XSksXG4gICAgICAgICAgICAgICAgICAgICAgICBbMCwgNF0sIFsxLCA1XSwgWzIsIDZdLCBbMywgN10sXG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UgPCBhbmdsZSAmJiBhbmdsZSA8IChNYXRoLlBJIC8gMiAtIGNvcm5lckRpcmVjdGlvbkFuZ2xlKSkge1xuICAgICAgICAgICAgICAgIHNlZ21lbnQuY29tcG9uZW50RGlyZWN0aW9uVHlwZSA9IENvbXBvbmVudERpcmVjdGlvblR5cGUuUmlnaHRGcm9udDtcbiAgICAgICAgICAgICAgICBwYXJhbS5wbGF0Zm9ybUxlbmd0aCA9IHNlZ21lbnQuZW5kLmRpc3RhbmNlVG8oc2VnbWVudC5zdGFydCk7XG4gICAgICAgICAgICAgICAgbW9sZFNoYXBlLnZlcnRpY2VzID0gW1xuICAgICAgICAgICAgICAgICAgICAuLi5sZWZ0Q29ubmVjdFBvaW50cyxcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIgLyBNYXRoLmNvcyhhbmdsZSkpKSxcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vbGRWZXJ0ZXhDb3VudCA9IG1vbGRTaGFwZS52ZXJ0aWNlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IGdlbmVyYXRlVGVtcExpbmVzTG9vcChtb2xkVmVydGV4Q291bnQpO1xuICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkpLFxuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgLSBwbGF0Zm9ybVRoaWNrbmVzcykpKSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMubWFwKHNlZyA9PiBbc2VnWzBdICsgbW9sZFZlcnRleENvdW50LCBzZWdbMV0gKyBtb2xkVmVydGV4Q291bnRdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMubWFwKHNlZyA9PiBbc2VnWzBdLCBzZWdbMF0gKyBtb2xkVmVydGV4Q291bnRdKSxcbiAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhbmdsZSA+IChNYXRoLlBJICogMyAvIDIgKyBjb3JuZXJEaXJlY3Rpb25BbmdsZSkgJiYgYW5nbGUgPCAoTWF0aC5QSSAqIDIgLSBEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSkpIHtcbiAgICAgICAgICAgICAgICBzZWdtZW50LmNvbXBvbmVudERpcmVjdGlvblR5cGUgPSBDb21wb25lbnREaXJlY3Rpb25UeXBlLkxlZnRGcm9udDtcbiAgICAgICAgICAgICAgICBwYXJhbS5wbGF0Zm9ybUxlbmd0aCA9IHNlZ21lbnQuZW5kLmRpc3RhbmNlVG8oc2VnbWVudC5zdGFydCk7XG4gICAgICAgICAgICAgICAgbW9sZFNoYXBlLnZlcnRpY2VzID0gW1xuICAgICAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyIC8gTWF0aC5jb3MoYW5nbGUpKSksXG4gICAgICAgICAgICAgICAgICAgIC4uLnJpZ2h0Q29ubmVjdFBvaW50cyxcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vbGRWZXJ0ZXhDb3VudCA9IG1vbGRTaGFwZS52ZXJ0aWNlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IGdlbmVyYXRlVGVtcExpbmVzTG9vcChtb2xkVmVydGV4Q291bnQpO1xuICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkpLFxuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgLSBwbGF0Zm9ybVRoaWNrbmVzcykpKSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMubWFwKHNlZyA9PiBbc2VnWzBdICsgbW9sZFZlcnRleENvdW50LCBzZWdbMV0gKyBtb2xkVmVydGV4Q291bnRdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMubWFwKHNlZyA9PiBbc2VnWzBdLCBzZWdbMF0gKyBtb2xkVmVydGV4Q291bnRdKSxcbiAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcGFyYW0ucGxhdGZvcm1MZW5ndGggPSBzZWdtZW50LmVuZC5kaXN0YW5jZVRvKHNlZ21lbnQuc3RhcnQpO1xuICAgICAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXG4gICAgICAgICAgICBzdGFydC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgIHN0YXJ0LmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpLFxuICAgICAgICBdO1xuICAgICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW1swLCAxXSwgWzEsIDJdLCBbMiwgM10sIFszLCAwXV07XG4gICAgICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbLi4ubW9sZFNoYXBlLnZlcnRpY2VzLFxuICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1wbGF0Zm9ybVRoaWNrbmVzcykpKSxcbiAgICAgICAgXTtcbiAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW1xuICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMsXG4gICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcy5tYXAoc2VnID0+IFtzZWdbMF0gKyA0LCBzZWdbMV0gKyA0XSksXG4gICAgICAgICAgICAgICAgWzAsIDRdLCBbMSwgNV0sIFsyLCA2XSwgWzMsIDddLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmNvbnN0IENvbHVtblN0ZXBUb2xlcmFuY2UgPSAxIC8gNTtcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUhhbmRyYWlsU2hhcGUoc3RhaXJQYXJhbSwgc2VnbWVudHMpIHtcbiAgICBjb25zdCB7IGhhbmRyYWlsOiB7IHN1cHBvcnQsIGhlaWdodCwgY29sdW1uOiB7IHN0ZXAgfSB9IH0gPSBzdGFpclBhcmFtO1xuICAgIGlmIChzZWdtZW50cy5sZW5ndGggJiYgc3VwcG9ydCkge1xuICAgICAgICBjb25zdCBoYW5kcmFpbHMgPSBbXTtcbiAgICAgICAgY29uc3QgdW5WaXNpdGVkID0gbmV3IFNldChzZWdtZW50cyk7XG4gICAgICAgIGNvbnN0IHZpc2l0ZWQgPSBuZXcgTWFwKCk7XG4gICAgICAgIGZvciAoY29uc3Qgc2VnbWVudCBvZiBzZWdtZW50cykge1xuICAgICAgICAgICAgaWYgKCFzZWdtZW50Lm1vbGRTaGFwZS50ZW1wTGluZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZpc2l0ZWQuc2V0KHNlZ21lbnQucGFyYW0uaW5kZXgsIHsgbGVmdDogZmFsc2UsIHJpZ2h0OiBmYWxzZSwgbGluZTNkSW5kZXhlczogbmV3IFNldCgpIH0pO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjdXJyZW50ID0gW3tcbiAgICAgICAgICAgICAgICBzZWdtZW50OiBzZWdtZW50c1swXSxcbiAgICAgICAgICAgICAgICBsaW5lM2RJbmQ6IGdldFNlZ21lbnRTdGFydEFuZEJhc2VMaW5lM2Qoc2VnbWVudHNbMF0sIHNlZ21lbnRzKS5zdGFydExpbmUubGluZTNkSW5kLFxuICAgICAgICAgICAgICAgIGxlZnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN0YXJ0OiB0cnVlLFxuICAgICAgICAgICAgfV07XG4gICAgICAgIGxldCBoYW5kcmFpbCA9IHsgcmFpbDogW10sIGNvbHVtbnM6IFtdIH07XG4gICAgICAgIGNvbnN0IHN0ZXBUb2xlcmFuY2UgPSBzdGVwICogQ29sdW1uU3RlcFRvbGVyYW5jZTtcbiAgICAgICAgd2hpbGUgKGN1cnJlbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgbmV4dCA9IFtdO1xuICAgICAgICAgICAgZm9yIChjb25zdCB7IHNlZ21lbnQ6IGN1cnJlbnRTZWdtZW50LCBsaW5lM2RJbmQsIHN0YXJ0UG9pbnQsIGxlZnQgfSBvZiBjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBwYXJhbTogeyBpbmRleCwgdHlwZSwgc3RhcnRXaWR0aCwgZW5kV2lkdGgsIGhvcml6b250YWxTdGVwLCB2ZXJ0aWNhbFN0ZXAsIHVwd2FyZCB9LCBzdGFydCwgZW5kLCBzdGFydEhlaWdodCwgZW5kSGVpZ2h0LCBtb2xkU2hhcGU6IHsgdmVydGljZXM6IG1vbGRWZXJ0aWNlcywgdGVtcExpbmVzOiBtb2xkVGVtcExpbmVzLCBzdGVwQ291bnQgfSwgbmV4dENvbXBvbmVudHMsIGJhc2VDb21wb25lbnQsIGNpcmNsZVRhbmdlbnQsIHN0YXJ0TG9ja2VkLCBjb21wb25lbnREaXJlY3Rpb25UeXBlLCB9ID0gY3VycmVudFNlZ21lbnQ7XG4gICAgICAgICAgICAgICAgdW5WaXNpdGVkLmRlbGV0ZShjdXJyZW50U2VnbWVudCk7XG4gICAgICAgICAgICAgICAgaWYgKCFzdGFydExvY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RlcEhlaWdodCA9IHVwd2FyZCA/IHZlcnRpY2FsU3RlcCA6IC12ZXJ0aWNhbFN0ZXA7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2Zmc2V0TGVuZ3RoID0gTWF0aC5taW4oSGFuZHJhaWxEZWZhdWx0T2Zmc2V0TGVuZ3RoLCBob3Jpem9udGFsU3RlcCAvIDQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgoc2VnbWVudHMsIGJhc2VDb21wb25lbnQgPT09IG51bGwgfHwgYmFzZUNvbXBvbmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmFzZUNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBzdGFydExpbmU6IHsgbGluZTNkSW5kOiBzdGFydExpbmUzZEluZCB9LCBiYXNlTGluZTogeyBkaXI6IGJhc2VMaW5lM2REaXIsIGVuZFdpdGhPZmZzZXQ6IGJhc2VMaW5lM2RFbmRXaXRoT2Zmc2V0IH0sIH0gPSBnZXRTZWdtZW50U3RhcnRBbmRCYXNlTGluZTNkKGN1cnJlbnRTZWdtZW50LCBzZWdtZW50cywgYmFzZVNlZ21lbnQsIG9mZnNldExlbmd0aCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRUb0VuZERpciA9IGVuZC5zdWJ0cmFjdGVkKHN0YXJ0KS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgbGV0IGZyb250RGlyID0gY2lyY2xlVGFuZ2VudCA/IGNpcmNsZVRhbmdlbnQgOiBzdGFydFRvRW5kRGlyO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFuZ2xlID0gZnJvbnREaXIuYW5nbGUoYmFzZUxpbmUzZERpcik7XG4gICAgICAgICAgICAgICAgY29uc3QgZGVsdGFBbmdsZSA9IE1hdGguYWJzKGFuZ2xlIC0gTWF0aC5QSSAvIDIpO1xuICAgICAgICAgICAgICAgIGlmIChkZWx0YUFuZ2xlIDw9IERpcmVjdGlvbkFuZ2xlVG9sZXJhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZyb250RGlyID0gYmFzZUxpbmUzZERpci5jcm9zcyhEaXJlY3Rpb25aKS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBsZWZ0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhmcm9udERpcik7XG4gICAgICAgICAgICAgICAgbGV0IHNwID0gc3RhcnQuYWRkZWQobGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyICogKGxlZnQgPyAxIDogLTEpKSk7XG4gICAgICAgICAgICAgICAgbGV0IGVwID0gZW5kLmFkZGVkKGxlZnREaXIubXVsdGlwbGllZChlbmRXaWR0aCAvIDIgKiAobGVmdCA/IDEgOiAtMSkpKTtcbiAgICAgICAgICAgICAgICBsZXQgbGFzdExlbmd0aCA9IHNwLmRpc3RhbmNlVG8oZXApO1xuICAgICAgICAgICAgICAgIGxldCBzcFRvRXBEaXIgPSBlcC5zdWJ0cmFjdGVkKHNwKS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgbGV0IG5leHRTdGFydFBvaW50ID0gbGVmdCA/IHNwIDogZXA7XG4gICAgICAgICAgICAgICAgbGV0IHB1c2hFbmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmUzZERpciA9IG1vbGRWZXJ0aWNlc1ttb2xkVGVtcExpbmVzW2xpbmUzZEluZF1bMV1dLnN1YnRyYWN0ZWQobW9sZFZlcnRpY2VzW21vbGRUZW1wTGluZXNbbGluZTNkSW5kXVswXV0pLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhsaW5lM2REaXIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZpc2l0ZWRSZWNvcmQgPSB2aXNpdGVkLmdldChpbmRleCk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGluZTNkID0gbW9sZFRlbXBMaW5lc1tsaW5lM2RJbmRdO1xuICAgICAgICAgICAgICAgICAgICBzcCA9IHN0YXJ0UG9pbnQgfHwgbW9sZFZlcnRpY2VzW2xpbmUzZFswXV07XG4gICAgICAgICAgICAgICAgICAgIGVwID0gbW9sZFZlcnRpY2VzW2xpbmUzZFsxXV07XG4gICAgICAgICAgICAgICAgICAgIGxhc3RMZW5ndGggPSBzcC5kaXN0YW5jZVRvKGVwKTtcbiAgICAgICAgICAgICAgICAgICAgc3BUb0VwRGlyID0gZXAuc3VidHJhY3RlZChzcCkubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0TGluZTNkSW5kID0gKGxpbmUzZEluZCArIDEpICUgbW9sZFRlbXBMaW5lcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZpc2l0ZWRMaW5lM2RJbmRleGVzID0gdmlzaXRlZFJlY29yZCA9PT0gbnVsbCB8fCB2aXNpdGVkUmVjb3JkID09PSB2b2lkIDAgPyB2b2lkIDAgOiB2aXNpdGVkUmVjb3JkLmxpbmUzZEluZGV4ZXM7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzRW50cmFuY2UgPSAodmlzaXRlZExpbmUzZEluZGV4ZXMgPT09IG51bGwgfHwgdmlzaXRlZExpbmUzZEluZGV4ZXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZpc2l0ZWRMaW5lM2RJbmRleGVzLmhhcyhsaW5lM2RJbmQpKSAmJiAodmlzaXRlZExpbmUzZEluZGV4ZXMgPT09IG51bGwgfHwgdmlzaXRlZExpbmUzZEluZGV4ZXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZpc2l0ZWRMaW5lM2RJbmRleGVzLmhhcyhuZXh0TGluZTNkSW5kKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc0VudHJhbmNlU2VnbWVudCA9IGxpbmUzZEluZCA9PT0gc3RhcnRMaW5lM2RJbmQ7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZWFyZXN0U2VnbWVudDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBuZXh0U2VnbWVudEluZGV4IG9mIG5leHRDb21wb25lbnRzW2xpbmUzZEluZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgoc2VnbWVudHMsIG5leHRTZWdtZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBzdGFydCB9ID0gbmV4dFNlZ21lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZHMgPSBzdGFydC5kaXN0YW5jZVRvKHNwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZSA9IHN0YXJ0LmRpc3RhbmNlVG8oZXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZpc2l0TmV4dFJlY29yZCA9IHZpc2l0ZWQuZ2V0KG5leHRTZWdtZW50LnBhcmFtLmluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0Q29tcG9uZW50U3RhcnRMaW5lM2RJbmQgPSBnZXRTZWdtZW50U3RhcnRBbmRCYXNlTGluZTNkKG5leHRTZWdtZW50LCBzZWdtZW50cywgdW5kZWZpbmVkLCBvZmZzZXRMZW5ndGgpLnN0YXJ0TGluZS5saW5lM2RJbmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRXF1YWwoZHMgKyBkZSwgbGFzdExlbmd0aCkgJiYgISh2aXNpdE5leHRSZWNvcmQgPT09IG51bGwgfHwgdmlzaXROZXh0UmVjb3JkID09PSB2b2lkIDAgPyB2b2lkIDAgOiB2aXNpdE5leHRSZWNvcmQucmlnaHQpICYmICEodmlzaXROZXh0UmVjb3JkID09PSBudWxsIHx8IHZpc2l0TmV4dFJlY29yZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmlzaXROZXh0UmVjb3JkLmxpbmUzZEluZGV4ZXMuaGFzKG5leHRDb21wb25lbnRTdGFydExpbmUzZEluZCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbmVhcmVzdFNlZ21lbnQgfHwgbmVhcmVzdFNlZ21lbnQuZGlzdGFuY2UgPiBkcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVhcmVzdFNlZ21lbnQgPSB7IHNlZ21lbnQ6IG5leHRTZWdtZW50LCBkaXN0YW5jZTogZHMgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBmaXJzdEJvdHRvbVB0ID0gc3AuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkuYWRkZWQob2Zmc2V0RGlyLm11bHRpcGxpZWQob2Zmc2V0TGVuZ3RoKSkuYWRkZWQobGluZTNkRGlyLm11bHRpcGxpZWQoc3RhcnRQb2ludCA/IDAgOiBvZmZzZXRMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxhc3REaXN0YW5jZSA9IE1hdGgubWF4KGxhc3RMZW5ndGggLSBvZmZzZXRMZW5ndGgsIDApO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmVhcmVzdFNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgZW5kT25CYXNlTGluZVdpdGhPZmZzZXQgfSA9IGdldFNlZ21lbnRTdGFydEFuZEJhc2VMaW5lM2QobmVhcmVzdFNlZ21lbnQuc2VnbWVudCwgc2VnbWVudHMsIHVuZGVmaW5lZCwgb2Zmc2V0TGVuZ3RoKS5zdGFydExpbmU7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcCA9IGVuZE9uQmFzZUxpbmVXaXRoT2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgc3BUb0VwRGlyID0gZXAuc3VidHJhY3RlZChzcCkubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwVG9FcERpci5kb3QobGluZTNkRGlyKSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdERpc3RhbmNlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoRW5kID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFN0YXJ0UG9pbnQgPSBzcC5hZGRlZChsaW5lM2REaXIubXVsdGlwbGllZChvZmZzZXRMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3REaXN0YW5jZSA9IHNwLmRpc3RhbmNlVG8oZXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTdGFydFBvaW50ID0gaXNQbGF0Zm9ybShuZWFyZXN0U2VnbWVudC5zZWdtZW50KSA/IGVwIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzRW50cmFuY2UgJiYgaGFzRW50cmFuY2VTZWdtZW50ICYmIGJhc2VTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgLy8gZG9uJ3QgY2FyZSBiZWNhdXNlIG5leHQgaXMgcGxhdGZvcm0gKG5leHQgd2lsbCBkZWFsIHRoZSBjYXNlKSBvciBzdGFpciAob25seSBoYXZlIG9uZSBuZXh0Q29tcG9uZW50IHdoaWNoIGlzIGN1cnJlbnRTZWdtZW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGJhc2VTZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gJiYgbmV4dFNpYmxpbmdTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcCA9IGJhc2VMaW5lM2RFbmRXaXRoT2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgc3BUb0VwRGlyID0gZXAuc3VidHJhY3RlZChzcCkubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwVG9FcERpci5kb3QoYmFzZUxpbmUzZERpcikgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3REaXN0YW5jZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaEVuZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRDb3JuZXJEaXN0YW5jZSA9IGVwLmRpc3RhbmNlVG8oc3ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0Q29ybmVyRGlzdGFuY2UgPiBvZmZzZXRMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFN0YXJ0UG9pbnQgPSBzcC5hZGRlZChsaW5lM2REaXIubXVsdGlwbGllZChvZmZzZXRMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTdGFydFBvaW50ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3REaXN0YW5jZSA9IHNwLmRpc3RhbmNlVG8oZXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTdGFydFBvaW50ID0gaXNQbGF0Zm9ybShiYXNlU2VnbWVudCkgPyBlcCA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpc0VudHJhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0RGlzdGFuY2UgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHVzaEVuZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHVzaEVuZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHVzaEVuZCA9IGxpbmUzZEluZCA9PT0gbW9sZFRlbXBMaW5lcy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXN0RGlzdGFuY2UgPiAwIHx8IChsYXN0RGlzdGFuY2UgPT09IDAgJiYgIXN0YXJ0UG9pbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwdXNoIHJhaWxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsLnJhaWwucHVzaChmaXJzdEJvdHRvbVB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gcHVzaCBjb2x1bW5zXG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXN0RGlzdGFuY2UgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcERpc3RhbmNlID0gb2Zmc2V0TGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHRlbXBEaXN0YW5jZSA8PSBsYXN0RGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpc0VuZCA9IHRlbXBEaXN0YW5jZSA9PT0gbGFzdERpc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvdHRvbVBvaW50ID0gdGVtcERpc3RhbmNlID4gMCA/IHNwLmFkZGVkKHNwVG9FcERpci5tdWx0aXBsaWVkKHRlbXBEaXN0YW5jZSkpLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCkpLmFkZGVkKG9mZnNldERpci5tdWx0aXBsaWVkKG9mZnNldExlbmd0aCkpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RCb3R0b21QdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5jb2x1bW5zLnB1c2goW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b21Qb2ludCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tUG9pbnQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0VuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5yYWlsLnB1c2goYm90dG9tUG9pbnQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVsdGFEaXN0YW5jZSA9IChsYXN0RGlzdGFuY2UgLSB0ZW1wRGlzdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBEaXN0YW5jZSArPSAoZGVsdGFEaXN0YW5jZSA8PSAoc3RlcCArIHN0ZXBUb2xlcmFuY2UpICYmIGRlbHRhRGlzdGFuY2UgPj0gc3RlcFRvbGVyYW5jZSkgPyAocHVzaEVuZCA/IGRlbHRhRGlzdGFuY2UgOiBJbmZpbml0eSkgOiBzdGVwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZWFyZXN0U2VnbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50OiBuZWFyZXN0U2VnbWVudC5zZWdtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUzZEluZDogZ2V0U2VnbWVudFN0YXJ0QW5kQmFzZUxpbmUzZChuZWFyZXN0U2VnbWVudC5zZWdtZW50LCBzZWdtZW50cywgdW5kZWZpbmVkLCBvZmZzZXRMZW5ndGgpLnN0YXJ0TGluZS5saW5lM2RJbmQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0UG9pbnQ6IG5leHRTdGFydFBvaW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNFbnRyYW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiYXNlU2VnbWVudCAmJiBoYXNFbnRyYW5jZVNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIC8vIG5ldmVyIGhhcHBlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAobmV4dFNpYmxpbmdTZWdtZW50ICYmIGJhc2VTZWdtZW50LnBhcmFtLnR5cGUgIT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQ6IGJhc2VTZWdtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZTNkSW5kOiBiYXNlU2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtID8gKGJhc2VDb21wb25lbnQgPT09IG51bGwgfHwgYmFzZUNvbXBvbmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleCkgfHwgMCA6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRQb2ludDogbmV4dFN0YXJ0UG9pbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZW5kIG9mIHRoaXMgcGF0Y2gsIHRoZSBwYXRjaCBhcmUgc3RhcnQgd2l0aCBwbGF0Zm9ybVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbHMucHVzaChoYW5kcmFpbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsID0geyByYWlsOiBbXSwgY29sdW1uczogW10gfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBlbmQgb2YgdGhpcyBsaW5lM2RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50OiBjdXJyZW50U2VnbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZTNkSW5kOiBuZXh0TGluZTNkSW5kLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmlzaXRlZExpbmUzZEluZGV4ZXMgPT09IG51bGwgfHwgdmlzaXRlZExpbmUzZEluZGV4ZXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZpc2l0ZWRMaW5lM2RJbmRleGVzLmFkZChsaW5lM2RJbmQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29sdW1uQWN0dWFsSGVpZ2h0ID0gaGVpZ2h0ICsgdmVydGljYWxTdGVwIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNSaWdodFN0YWlyID0gY29tcG9uZW50RGlyZWN0aW9uVHlwZSA9PT0gQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5SaWdodDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNMZWZ0U3RhaXIgPSBjb21wb25lbnREaXJlY3Rpb25UeXBlID09PSBDb21wb25lbnREaXJlY3Rpb25UeXBlLkxlZnQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YWlyUmFpbCA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFpckNvbHVtbnMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29ybmVyQmFzZURpciA9ICghbGVmdCAmJiBpc1JpZ2h0U3RhaXIpIHx8IChsZWZ0ICYmIGlzTGVmdFN0YWlyKSA/IGxlZnREaXIgOiBiYXNlTGluZTNkRGlyO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29ybmVyU3RhcnRIZWlnaHQgPSBsZWZ0ID8gZW5kSGVpZ2h0IDogc3RhcnRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb3JuZXJTaWRlV2lkdGggPSBsZWZ0ID8gZW5kV2lkdGggOiBzdGFydFdpZHRoO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2lkZUNvcm5lclN0YXJ0ID0gbGVmdCA/IGVuZCA6IHN0YXJ0O1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29ybmVyRW5kID0gc2lkZUNvcm5lclN0YXJ0LmFkZGVkKGNvcm5lckJhc2VEaXIubXVsdGlwbGllZCgoY29ybmVyU2lkZVdpZHRoIC8gMiArIG9mZnNldExlbmd0aCkgKiAobGVmdCA/IDEgOiAtMSkpKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvcm5lckRpc3RhbmNlID0gKHN0YXJ0UG9pbnQgfHwgc3ApLmRpc3RhbmNlVG8oY29ybmVyRW5kKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gYWxvbmcgY29ybmVyQmFzZURpclxuICAgICAgICAgICAgICAgICAgICBsZXQgY29ybmVyU3BUb0VwRGlyID0gY29ybmVyRW5kLnN1YnRyYWN0ZWQoc3RhcnRQb2ludCB8fCBzcCkubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29ybmVyT2Zmc2V0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhjb3JuZXJTcFRvRXBEaXIpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29ybmVyQWRkaXRpb25hbEhlaWdodCA9ICFsZWZ0ICYmICFpc0xlZnRTdGFpciAmJiB1cHdhcmQgPyBzdGVwSGVpZ2h0IDogMDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVhZENvcm5lclJhaWwgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVhZENvcm5lckNvbHVtbnMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXJ0UG9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wSGVhZERpc3RhbmNlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRDb3JuZXJSYWlsLnB1c2goc3RhcnRQb2ludC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoY29ybmVyU3RhcnRIZWlnaHQgKyBjb3JuZXJBZGRpdGlvbmFsSGVpZ2h0ICsgaGVpZ2h0KSkuYWRkZWQoY29ybmVyT2Zmc2V0RGlyLm11bHRpcGxpZWQob2Zmc2V0TGVuZ3RoKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHRlbXBIZWFkRGlzdGFuY2UgPCBjb3JuZXJEaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvdHRvbVBvaW50ID0gc3RhcnRQb2ludC5hZGRlZChjb3JuZXJTcFRvRXBEaXIubXVsdGlwbGllZCh0ZW1wSGVhZERpc3RhbmNlKSkuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGNvcm5lclN0YXJ0SGVpZ2h0ICsgY29ybmVyQWRkaXRpb25hbEhlaWdodCkpLmFkZGVkKGNvcm5lck9mZnNldERpci5tdWx0aXBsaWVkKG9mZnNldExlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRDb3JuZXJDb2x1bW5zLnB1c2goW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b21Qb2ludCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tUG9pbnQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBIZWFkRGlzdGFuY2UgKz0gc3RlcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbGVmdCAmJiBpc0xlZnRTdGFpcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RCb3R0b21Qb2ludCA9IGNvcm5lckVuZC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoY29ybmVyU3RhcnRIZWlnaHQgKyBjb3JuZXJBZGRpdGlvbmFsSGVpZ2h0KSkuYWRkZWQoY29ybmVyT2Zmc2V0RGlyLm11bHRpcGxpZWQob2Zmc2V0TGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHVzaCByYWlsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZENvcm5lclJhaWwucHVzaChsYXN0Qm90dG9tUG9pbnQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGNvcm5lckRpc3RhbmNlIC0gdGVtcEhlYWREaXN0YW5jZSArIHN0ZXApID4gc3RlcFRvbGVyYW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkQ29ybmVyQ29sdW1ucy5wdXNoKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RCb3R0b21Qb2ludCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RCb3R0b21Qb2ludC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBuZXh0U3RhcnRQb2ludCA9IGxlZnQgPyBzcC5hZGRlZChsaW5lM2REaXIubXVsdGlwbGllZChvZmZzZXRMZW5ndGgpKSA6IGVwLmFkZGVkKGxpbmUzZERpci5tdWx0aXBsaWVkKC1vZmZzZXRMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBzZWdtZW50IHN0YXJ0V2lkdGggIT09IGN1cnJlbnRTZWdtZW50IGVuZFdpZHRoXG4gICAgICAgICAgICAgICAgICAgIHB1c2hFbmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVhc29uYWJsZVN0ZXBDb3VudCA9IE1hdGguY2VpbChzdGVwIC8gaG9yaXpvbnRhbFN0ZXApO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcFN0ZXBDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFyY0Nob3JkQW5nbGUgPSBjaXJjbGVUYW5nZW50ID8gc3RhcnRUb0VuZERpci5hbmdsZShjaXJjbGVUYW5nZW50KSA6IDA7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0RnJvbnRPZmZzZXRMZW5ndGggPSBNYXRoLm1pbihob3Jpem9udGFsU3RlcCAvIDIsIG9mZnNldExlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByZXZUb3RhbFN0ZXBMZW5ndGggPSAoc3RlcENvdW50IC0gMSkgKiBob3Jpem9udGFsU3RlcDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJldlRvdGFsVmVyU3RlcExlbmd0aCA9IChzdGVwQ291bnQgLSAxKSAqIHN0ZXBIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRvdGFsTGVuZ3RoID0gTWF0aC5hYnMoZW5kLnN1YnRyYWN0ZWQoc3RhcnQpLmRvdChmcm9udERpcikpO1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBzdGFydEVuZERpc3RhbmNlID0gc3RhcnQuZGlzdGFuY2VUbyhlbmQpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0U3RlcExlbmd0aCA9IHRvdGFsTGVuZ3RoIC0gcHJldlRvdGFsU3RlcExlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxhc3RGcm9udE9mZnNldExlbmd0aCA9IE1hdGgubWluKGxhc3RTdGVwTGVuZ3RoIC8gMiwgb2Zmc2V0TGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpciB8fCAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5DaXJjdWxhclN0YWlyICYmIChhcmNDaG9yZEFuZ2xlIDw9IERpcmVjdGlvbkFuZ2xlVG9sZXJhbmNlIHx8ICFjaXJjbGVUYW5nZW50KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxhc3RMZW5ndGggPSBzcC5kaXN0YW5jZVRvKGVwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlbHRhV2lkdGggPSAoZW5kV2lkdGggLSBzdGFydFdpZHRoKSAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFydERlbHRhV2lkdGggPSAoc3RhcnRGcm9udE9mZnNldExlbmd0aCAvIHRvdGFsTGVuZ3RoKSAqIGRlbHRhV2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGVwRGVsdGFXaWR0aCA9IGhvcml6b250YWxTdGVwIC8gdG90YWxMZW5ndGggKiBkZWx0YVdpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHVzaCByYWlsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFpclJhaWwucHVzaChzcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBoZWlnaHQgKyAodXB3YXJkID8gMSA6IDApICogc3RlcEhlaWdodCkpLmFkZGVkKGxlZnREaXIubXVsdGlwbGllZChsZWZ0ID8gKHN0YXJ0RGVsdGFXaWR0aCAtIG9mZnNldExlbmd0aCkgOiAob2Zmc2V0TGVuZ3RoIC0gc3RhcnREZWx0YVdpZHRoKSkpLmFkZGVkKGZyb250RGlyLm11bHRpcGxpZWQoc3RhcnRGcm9udE9mZnNldExlbmd0aCkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdXB3YXJkICYmIHN0ZXBDb3VudCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpclJhaWwucHVzaChzcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBoZWlnaHQpKS5hZGRlZChmcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSkuYWRkZWQobGVmdERpci5tdWx0aXBsaWVkKGxlZnQgPyAoc3RlcERlbHRhV2lkdGggLSBvZmZzZXRMZW5ndGgpIDogKG9mZnNldExlbmd0aCAtIHN0ZXBEZWx0YVdpZHRoKSkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHB1c2ggY29sdW1uc1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHRlbXBTdGVwQ291bnQgPCBzdGVwQ291bnQgLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VySG9yU3RlcERpc3RhbmNlID0gKHRlbXBTdGVwQ291bnQgKyAwLjUpICogaG9yaXpvbnRhbFN0ZXA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyVmVyU3RlcERpc3RhbmNlID0gKHRlbXBTdGVwQ291bnQgKyAodXB3YXJkID8gMSA6IDApKSAqIHN0ZXBIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN1ckNvbHVtbkFjdHVhbEhlaWdodCA9IGNvbHVtbkFjdHVhbEhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodXB3YXJkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1ckNvbHVtbkFjdHVhbEhlaWdodCA9IChjdXJIb3JTdGVwRGlzdGFuY2UgLSBzdGFydEZyb250T2Zmc2V0TGVuZ3RoKSAvIChwcmV2VG90YWxTdGVwTGVuZ3RoIC0gc3RhcnRGcm9udE9mZnNldExlbmd0aCkgKiBwcmV2VG90YWxWZXJTdGVwTGVuZ3RoIC0gY3VyVmVyU3RlcERpc3RhbmNlICsgc3RlcEhlaWdodCArIGhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1ckNvbHVtbkFjdHVhbEhlaWdodCA9ICgxIC0gKGN1ckhvclN0ZXBEaXN0YW5jZSAtIGhvcml6b250YWxTdGVwKSAvICh0b3RhbExlbmd0aCAtIGhvcml6b250YWxTdGVwIC0gbGFzdEZyb250T2Zmc2V0TGVuZ3RoKSkgKiAtcHJldlRvdGFsVmVyU3RlcExlbmd0aCArIChzdGVwQ291bnQgLSAxIC0gdGVtcFN0ZXBDb3VudCkgKiBzdGVwSGVpZ2h0ICsgaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJTdGVwRGVsdGFXaWR0aCA9ICh0ZW1wU3RlcENvdW50ICsgMC41KSAqIHN0ZXBEZWx0YVdpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvdHRvbVBvaW50ID0gc3AuYWRkZWQoZnJvbnREaXIubXVsdGlwbGllZChjdXJIb3JTdGVwRGlzdGFuY2UpKS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBjdXJWZXJTdGVwRGlzdGFuY2UpKS5hZGRlZChsZWZ0RGlyLm11bHRpcGxpZWQobGVmdCA/IChjdXJTdGVwRGVsdGFXaWR0aCAtIG9mZnNldExlbmd0aCkgOiAob2Zmc2V0TGVuZ3RoIC0gY3VyU3RlcERlbHRhV2lkdGgpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJDb2x1bW5zLnB1c2goW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b21Qb2ludCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tUG9pbnQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKCF1cHdhcmQgJiYgdGVtcFN0ZXBDb3VudCA9PT0gMCA/IGhlaWdodCA6IGN1ckNvbHVtbkFjdHVhbEhlaWdodCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBTdGVwQ291bnQgKz0gcmVhc29uYWJsZVN0ZXBDb3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGVwQ291bnQgPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVwd2FyZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0U3RlcERlbHRhV2lkdGggPSAoc3RlcENvdW50IC0gMSkgKiBzdGVwRGVsdGFXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJSYWlsLnB1c2goc3AuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0ICsgaGVpZ2h0ICsgKHVwd2FyZCA/IHN0ZXBDb3VudCA6IChzdGVwQ291bnQgLSAoc3RlcENvdW50ID4gMiA/IDIgOiAxKSkpICogc3RlcEhlaWdodCkpLmFkZGVkKGZyb250RGlyLm11bHRpcGxpZWQoKHN0ZXBDb3VudCAtIDEpICogaG9yaXpvbnRhbFN0ZXApKS5hZGRlZChsZWZ0RGlyLm11bHRpcGxpZWQobGVmdCA/IChsYXN0U3RlcERlbHRhV2lkdGggLSBvZmZzZXRMZW5ndGgpIDogKG9mZnNldExlbmd0aCAtIGxhc3RTdGVwRGVsdGFXaWR0aCkpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdFJhaWxEZWx0YVdpZHRoID0gKDEgLSBsYXN0RnJvbnRPZmZzZXRMZW5ndGggLyB0b3RhbExlbmd0aCkgKiBkZWx0YVdpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJSYWlsLnB1c2goc3AuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0ICsgaGVpZ2h0ICsgKHVwd2FyZCA/IHN0ZXBDb3VudCA6IHN0ZXBDb3VudCAtIDEpICogc3RlcEhlaWdodCkpLmFkZGVkKGZyb250RGlyLm11bHRpcGxpZWQodG90YWxMZW5ndGggLSBsYXN0RnJvbnRPZmZzZXRMZW5ndGgpKS5hZGRlZChsZWZ0RGlyLm11bHRpcGxpZWQobGVmdCA/IChsYXN0UmFpbERlbHRhV2lkdGggLSBvZmZzZXRMZW5ndGgpIDogKG9mZnNldExlbmd0aCAtIGxhc3RSYWlsRGVsdGFXaWR0aCkpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGVtcFN0ZXBDb3VudCAtIHJlYXNvbmFibGVTdGVwQ291bnQgPD0gc3RlcENvdW50IC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RDb2x1bW5BY3R1YWxIZWlnaHQgPSAobGFzdFN0ZXBMZW5ndGggLyAyIC0gbGFzdEZyb250T2Zmc2V0TGVuZ3RoKSAvICh0b3RhbExlbmd0aCAtIGhvcml6b250YWxTdGVwIC0gbGFzdEZyb250T2Zmc2V0TGVuZ3RoKSAqIC1wcmV2VG90YWxWZXJTdGVwTGVuZ3RoICsgaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RDb2x1bW5EZWx0YVdpZHRoID0gKHN0ZXBDb3VudCAtIDEgKyBsYXN0U3RlcExlbmd0aCAvIDIgLyBob3Jpem9udGFsU3RlcCkgKiBzdGVwRGVsdGFXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0Qm90dG9tUG9pbnQgPSBzcC5hZGRlZChmcm9udERpci5tdWx0aXBsaWVkKHByZXZUb3RhbFN0ZXBMZW5ndGggKyBsYXN0U3RlcExlbmd0aCAvIDIpKS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoZW5kSGVpZ2h0ICsgKHVwd2FyZCA/IDAgOiAtc3RlcEhlaWdodCkpKS5hZGRlZChsZWZ0RGlyLm11bHRpcGxpZWQobGVmdCA/IChsYXN0Q29sdW1uRGVsdGFXaWR0aCAtIG9mZnNldExlbmd0aCkgOiAob2Zmc2V0TGVuZ3RoIC0gbGFzdENvbHVtbkRlbHRhV2lkdGgpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJDb2x1bW5zLnB1c2goW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0Qm90dG9tUG9pbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RCb3R0b21Qb2ludC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQodXB3YXJkID8gaGVpZ2h0IDogbGFzdENvbHVtbkFjdHVhbEhlaWdodCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBzZWdtZW50IHN0YXJ0V2lkdGggIT09IGN1cnJlbnRTZWdtZW50IGVuZFdpZHRoXG4gICAgICAgICAgICAgICAgICAgICAgICBzcCA9IGxlZnQgPyBzdGFydC5hZGRlZChiYXNlTGluZTNkRGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIgLSBvZmZzZXRMZW5ndGgpKSA6IGVuZC5hZGRlZChsZWZ0RGlyLm11bHRpcGxpZWQoLWVuZFdpZHRoIC8gMiArIG9mZnNldExlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNpcmNsZVRhbmdlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgdGFuZ2VudExlZnREaXIsIGlzTGVmdEFyYywgc3RlcENvdW50LCBjaXJjbGVDZW50ZXIsIHJhZGl1cywgaG9yaXpvbnRhbFN0ZXBBbmdsZSwgY2lyY2xlTm9ybWFsLCBhcmNBbmdsZSwgbGFzdEhvcml6b250YWxBbmdsZSwgdmFsaWQgfSA9IGNhbGN1bGF0ZUNpcmN1bGFyU3RhaXIoY3VycmVudFNlZ21lbnQsIGNpcmNsZVRhbmdlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRSYWRpdXNEaXIgPSBpc0xlZnRBcmMgPyB0YW5nZW50TGVmdERpci5yZXZlcnNlZCgpIDogdGFuZ2VudExlZnREaXI7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXNlZFN0ZXBDb3VudCA9IGxhc3RIb3Jpem9udGFsQW5nbGUgPj0gQW5nbGVUb2xlcmFuY2UgfHwgbGFzdEhvcml6b250YWxBbmdsZSA9PT0gMCA/IHN0ZXBDb3VudCA6IHN0ZXBDb3VudCAtIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1c2VkTGFzdEhvcml6b250YWxBbmdsZSA9IGxhc3RIb3Jpem9udGFsQW5nbGUgPj0gQW5nbGVUb2xlcmFuY2UgfHwgbGFzdEhvcml6b250YWxBbmdsZSA9PT0gMCA/IGxhc3RIb3Jpem9udGFsQW5nbGUgOiBob3Jpem9udGFsU3RlcEFuZ2xlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHVzaCBjb2x1bW5zXG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAodGVtcFN0ZXBDb3VudCA8IHVzZWRTdGVwQ291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJSb3RhdGVBbmdsZSA9IGhvcml6b250YWxTdGVwQW5nbGUgKiB0ZW1wU3RlcENvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRSb3RhdGVBbmdsZSA9IGhvcml6b250YWxTdGVwQW5nbGUgKiB0ZW1wU3RlcENvdW50ICsgKHRlbXBTdGVwQ291bnQgPT09IHVzZWRTdGVwQ291bnQgLSAxID8gdXNlZExhc3RIb3Jpem9udGFsQW5nbGUgOiBob3Jpem9udGFsU3RlcEFuZ2xlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJSb3RhdGVNYXRyaXggPSBHZW9tTGliLmNyZWF0ZVJvdGF0ZU1hdHJpeDQoaG9yaXpvbnRhbFN0ZXBBbmdsZSAqIHRlbXBTdGVwQ291bnQsIGNpcmNsZU5vcm1hbCwgZHVtbXlQb2ludDNkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0Um90YXRlTWF0cml4ID0gR2VvbUxpYi5jcmVhdGVSb3RhdGVNYXRyaXg0KG5leHRSb3RhdGVBbmdsZSwgY2lyY2xlTm9ybWFsLCBkdW1teVBvaW50M2QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1clJhZGl1c0RpciA9IHN0YXJ0UmFkaXVzRGlyLmFwcGxpZWRNYXRyaXg0KGN1clJvdGF0ZU1hdHJpeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dFJhZGl1c0RpciA9IHN0YXJ0UmFkaXVzRGlyLmFwcGxpZWRNYXRyaXg0KG5leHRSb3RhdGVNYXRyaXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1ckhhbGZXaWR0aCA9IChzdGFydFdpZHRoICsgKGVuZFdpZHRoIC0gc3RhcnRXaWR0aCkgKiAoY3VyUm90YXRlQW5nbGUpIC8gYXJjQW5nbGUpIC8gMiAqIChpc0xlZnRBcmMgPyAtMSA6IDEpIC0gb2Zmc2V0TGVuZ3RoICogKGlzTGVmdEFyYyA/IC0xIDogMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dEhhbGZXaWR0aCA9IChzdGFydFdpZHRoICsgKGVuZFdpZHRoIC0gc3RhcnRXaWR0aCkgKiAobmV4dFJvdGF0ZUFuZ2xlKSAvIGFyY0FuZ2xlKSAvIDIgKiAoaXNMZWZ0QXJjID8gLTEgOiAxKSAtIG9mZnNldExlbmd0aCAqIChpc0xlZnRBcmMgPyAtMSA6IDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1ckxlZnRNb2xkUHQgPSBjaXJjbGVDZW50ZXIuYWRkZWQoY3VyUmFkaXVzRGlyLm11bHRpcGxpZWQocmFkaXVzICsgY3VySGFsZldpZHRoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyUmlnaHRNb2xkUHQgPSBjaXJjbGVDZW50ZXIuYWRkZWQoY3VyUmFkaXVzRGlyLm11bHRpcGxpZWQocmFkaXVzIC0gY3VySGFsZldpZHRoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dExlZnRNb2xkUHQgPSBjaXJjbGVDZW50ZXIuYWRkZWQobmV4dFJhZGl1c0Rpci5tdWx0aXBsaWVkKHJhZGl1cyArIG5leHRIYWxmV2lkdGgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0UmlnaHRNb2xkUHQgPSBjaXJjbGVDZW50ZXIuYWRkZWQobmV4dFJhZGl1c0Rpci5tdWx0aXBsaWVkKHJhZGl1cyAtIG5leHRIYWxmV2lkdGgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJTdGVwTGVmdEZyb250RGlyID0gbmV4dExlZnRNb2xkUHQuc3VidHJhY3RlZChjdXJMZWZ0TW9sZFB0KS5tdWx0aXBsaWVkKDAuNSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyU3RlcFJpZ2h0RnJvbnREaXIgPSBuZXh0UmlnaHRNb2xkUHQuc3VidHJhY3RlZChjdXJSaWdodE1vbGRQdCkubXVsdGlwbGllZCgwLjUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1clN0ZXBMZWZ0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhjdXJTdGVwTGVmdEZyb250RGlyKS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyTGVmdEJvdHRvbVB0ID0gY3VyTGVmdE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyAodGVtcFN0ZXBDb3VudCArICh1cHdhcmQgPyAxIDogMCkpICogc3RlcEhlaWdodCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1clJpZ2h0Qm90dG9tUHQgPSBjdXJSaWdodE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyAodGVtcFN0ZXBDb3VudCArICh1cHdhcmQgPyAxIDogMCkpICogc3RlcEhlaWdodCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1ckxlZnRCb3R0b21NaWRQdCA9IGN1ckxlZnRCb3R0b21QdC5hZGRlZChjdXJTdGVwTGVmdEZyb250RGlyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJSaWdodEJvdHRvbU1pZFB0ID0gY3VyUmlnaHRCb3R0b21QdC5hZGRlZChjdXJTdGVwUmlnaHRGcm9udERpcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRlbXBTdGVwQ291bnQgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwdXNoIHJhaWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxlZnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyUmFpbC5wdXNoKGN1ckxlZnRCb3R0b21QdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0ICsgKHRlbXBTdGVwQ291bnQgPiAwICYmICF1cHdhcmQgPyAtc3RlcEhlaWdodCA6IDApKSkuYWRkZWQoY3VyU3RlcExlZnRGcm9udERpci5ub3JtYWxpemVkKCkubXVsdGlwbGllZCh0ZW1wU3RlcENvdW50ID09PSAwID8gc3RhcnRGcm9udE9mZnNldExlbmd0aCA6IDApKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpclJhaWwucHVzaChjdXJSaWdodEJvdHRvbVB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQgKyAodGVtcFN0ZXBDb3VudCA+IDAgJiYgIXVwd2FyZCA/IC1zdGVwSGVpZ2h0IDogMCkpKS5hZGRlZChjdXJTdGVwUmlnaHRGcm9udERpci5ub3JtYWxpemVkKCkubXVsdGlwbGllZCh0ZW1wU3RlcENvdW50ID09PSAwID8gc3RhcnRGcm9udE9mZnNldExlbmd0aCA6IDApKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRlbXBTdGVwQ291bnQgPT09IHVzZWRTdGVwQ291bnQgLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0U3RlcFBlcmNlbnQgPSB1c2VkTGFzdEhvcml6b250YWxBbmdsZSAvIGhvcml6b250YWxTdGVwQW5nbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0TGVmdEhvclN0ZXAgPSAocmFkaXVzICsgY3VySGFsZldpZHRoKSAvIHJhZGl1cyAqIGhvcml6b250YWxTdGVwICogbGFzdFN0ZXBQZXJjZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdFJpZ2h0SG9yU3RlcCA9IChyYWRpdXMgLSBjdXJIYWxmV2lkdGgpIC8gcmFkaXVzICogaG9yaXpvbnRhbFN0ZXAgKiBsYXN0U3RlcFBlcmNlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0RnJvbnRPZmZzZXRMZW5ndGggPSBNYXRoLm1pbihvZmZzZXRMZW5ndGgsIGxhc3RTdGVwUGVyY2VudCAvIDIgKiBob3Jpem9udGFsU3RlcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0U2lkZUhvclN0ZXAgPSBsZWZ0ID8gbGFzdExlZnRIb3JTdGVwIDogbGFzdFJpZ2h0SG9yU3RlcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RDb2x1bW5BY3R1YWxIZWlnaHQgPSAtc3RlcEhlaWdodCAqIE1hdGgubWF4KChsYXN0U2lkZUhvclN0ZXAgLyAyIC0gbGFzdEZyb250T2Zmc2V0TGVuZ3RoKSAvIChsYXN0U2lkZUhvclN0ZXAgLSBsYXN0RnJvbnRPZmZzZXRMZW5ndGgpLCAwKSArIGhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZWZ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJSYWlsLnB1c2goY3VyTGVmdEJvdHRvbU1pZFB0LmFkZGVkKGN1clN0ZXBMZWZ0RnJvbnREaXIpLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKS5hZGRlZChjdXJTdGVwTGVmdEZyb250RGlyLm5vcm1hbGl6ZWQoKS5tdWx0aXBsaWVkKC1sYXN0RnJvbnRPZmZzZXRMZW5ndGgpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpclJhaWwucHVzaChjdXJSaWdodEJvdHRvbU1pZFB0LmFkZGVkKGN1clN0ZXBSaWdodEZyb250RGlyKS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSkuYWRkZWQoY3VyU3RlcFJpZ2h0RnJvbnREaXIubm9ybWFsaXplZCgpLm11bHRpcGxpZWQoLWxhc3RGcm9udE9mZnNldExlbmd0aCkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyQ29sdW1ucy5wdXNoKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0ID8gY3VyTGVmdEJvdHRvbU1pZFB0IDogY3VyUmlnaHRCb3R0b21NaWRQdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobGVmdCA/IGN1ckxlZnRCb3R0b21NaWRQdCA6IGN1clJpZ2h0Qm90dG9tTWlkUHQpLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCh1cHdhcmQgPyBoZWlnaHQgOiBsYXN0Q29sdW1uQWN0dWFsSGVpZ2h0KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5leHQgc2VnbWVudCBzdGFydFdpZHRoICE9PSBjdXJyZW50U2VnbWVudCBlbmRXaWR0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3AgPSBsZWZ0ID8gc3RhcnQuYWRkZWQoYmFzZUxpbmUzZERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyIC0gb2Zmc2V0TGVuZ3RoKSkgOiBuZXh0UmlnaHRNb2xkUHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWxlZnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0RGlyID0gY3VyU3RlcExlZnREaXI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRlbXBTdGVwQ291bnQgJSByZWFzb25hYmxlU3RlcENvdW50ID09PSAwICYmIHRlbXBTdGVwQ291bnQgPCB1c2VkU3RlcENvdW50IC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnRDb2x1bW5BY3R1YWxIZWlnaHQgPSBjb2x1bW5BY3R1YWxIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZW1wU3RlcENvdW50ID09PSAwICYmIHVwd2FyZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRMZWZ0SG9yU3RlcCA9IChyYWRpdXMgKyBjdXJIYWxmV2lkdGgpIC8gcmFkaXVzICogaG9yaXpvbnRhbFN0ZXA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFydFJpZ2h0SG9yU3RlcCA9IChyYWRpdXMgLSBjdXJIYWxmV2lkdGgpIC8gcmFkaXVzICogaG9yaXpvbnRhbFN0ZXA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFydFNpZGVIb3JTdGVwID0gbGVmdCA/IHN0YXJ0TGVmdEhvclN0ZXAgOiBzdGFydFJpZ2h0SG9yU3RlcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0Q29sdW1uQWN0dWFsSGVpZ2h0ID0gc3RlcEhlaWdodCAqIChzdGFydFNpZGVIb3JTdGVwIC8gMiAtIHN0YXJ0RnJvbnRPZmZzZXRMZW5ndGgpIC8gKHN0YXJ0U2lkZUhvclN0ZXAgLSBzdGFydEZyb250T2Zmc2V0TGVuZ3RoKSArIGhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpckNvbHVtbnMucHVzaChbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0ID8gY3VyTGVmdEJvdHRvbU1pZFB0IDogY3VyUmlnaHRCb3R0b21NaWRQdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChsZWZ0ID8gY3VyTGVmdEJvdHRvbU1pZFB0IDogY3VyUmlnaHRCb3R0b21NaWRQdCkuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKCh0ZW1wU3RlcENvdW50ID09PSAwID8gKHVwd2FyZCA/IHN0YXJ0Q29sdW1uQWN0dWFsSGVpZ2h0IDogaGVpZ2h0KSA6IGNvbHVtbkFjdHVhbEhlaWdodCkpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBTdGVwQ291bnQgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5yYWlsLnB1c2goLi4uaGVhZENvcm5lclJhaWwpO1xuICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5jb2x1bW5zLnB1c2goLi4uaGVhZENvcm5lckNvbHVtbnMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobGVmdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWwucmFpbC5wdXNoKC4uLnN0YWlyUmFpbC5yZXZlcnNlKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWwuY29sdW1ucy5wdXNoKC4uLnN0YWlyQ29sdW1ucy5yZXZlcnNlKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWwucmFpbC5wdXNoKC4uLnN0YWlyUmFpbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5jb2x1bW5zLnB1c2goLi4uc3RhaXJDb2x1bW5zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhaXJOZXh0U2VnbWVudDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBuZXh0U2VnbWVudEluZGV4IG9mIG5leHRDb21wb25lbnRzW2xpbmUzZEluZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgoc2VnbWVudHMsIG5leHRTZWdtZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dFNlZ21lbnRWaXNpdGVkUmVjb3JkID0gdmlzaXRlZC5nZXQoKG5leHRTZWdtZW50ID09PSBudWxsIHx8IG5leHRTZWdtZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBuZXh0U2VnbWVudC5wYXJhbS5pbmRleCkgfHwgLTEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRTZWdtZW50ICYmICgoaXNQbGF0Zm9ybShuZXh0U2VnbWVudCkgJiYgIShuZXh0U2VnbWVudFZpc2l0ZWRSZWNvcmQgPT09IG51bGwgfHwgbmV4dFNlZ21lbnRWaXNpdGVkUmVjb3JkID09PSB2b2lkIDAgPyB2b2lkIDAgOiBuZXh0U2VnbWVudFZpc2l0ZWRSZWNvcmQubGluZTNkSW5kZXhlcy5zaXplKSkgfHwgKCFpc1BsYXRmb3JtKG5leHRTZWdtZW50KSAmJiAhKG5leHRTZWdtZW50VmlzaXRlZFJlY29yZCA9PT0gbnVsbCB8fCBuZXh0U2VnbWVudFZpc2l0ZWRSZWNvcmQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG5leHRTZWdtZW50VmlzaXRlZFJlY29yZC5yaWdodCkpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyTmV4dFNlZ21lbnQgPSBuZXh0U2VnbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAobGVmdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhc2VTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIC8vIG5ldmVyIGhhcHBlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIChuZXh0U2libGluZ1NlZ21lbnQgJiYgYmFzZVNlZ21lbnQucGFyYW0udHlwZSAhPT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVwID0gYmFzZUxpbmUzZEVuZFdpdGhPZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BUb0VwRGlyID0gZXAuc3VidHJhY3RlZChzcCkubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcFRvRXBEaXIuZG90KGJhc2VMaW5lM2REaXIpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFN0YXJ0UG9pbnQgPSBzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hFbmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U3RhcnRQb2ludCA9IGlzUGxhdGZvcm0oYmFzZVNlZ21lbnQpID8gZXAgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudDogYmFzZVNlZ21lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUzZEluZDogYmFzZVNlZ21lbnQucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSA/IChiYXNlQ29tcG9uZW50ID09PSBudWxsIHx8IGJhc2VDb21wb25lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJhc2VDb21wb25lbnQubGluZTNkSW5kZXgpIHx8IDAgOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0UG9pbnQ6IG5leHRTdGFydFBvaW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZW5kIHRoZSBwYXRjaCB3aGljaCBpcyBzdGFydCB3aXRoIGN1cnJlbnRTZWdtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWxzLnB1c2goaGFuZHJhaWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsID0geyByYWlsOiBbXSwgY29sdW1uczogW10gfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2aXNpdGVkUmVjb3JkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlzaXRlZFJlY29yZC5sZWZ0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGFpck5leHRTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBsaW5lM2RJbmQ6IHN0YWlyTmV4dExpbmUzZEluZCwgZW5kT25CYXNlTGluZVdpdGhPZmZzZXQgfSA9IGdldFNlZ21lbnRTdGFydEFuZEJhc2VMaW5lM2Qoc3RhaXJOZXh0U2VnbWVudCwgc2VnbWVudHMsIGN1cnJlbnRTZWdtZW50LCBvZmZzZXRMZW5ndGgpLnN0YXJ0TGluZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcCA9IGVuZE9uQmFzZUxpbmVXaXRoT2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwVG9FcERpciA9IGVwLnN1YnRyYWN0ZWQoc3ApLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0YWlsVGVtcExpbmUgPSBtb2xkVGVtcExpbmVzW21vbGRUZW1wTGluZXMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFpbExpbmUzZERpciA9IG1vbGRWZXJ0aWNlc1t0YWlsVGVtcExpbmVbMV1dLnN1YnRyYWN0ZWQobW9sZFZlcnRpY2VzW3RhaWxUZW1wTGluZVswXV0pLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BUb0VwRGlyLmRvdCh0YWlsTGluZTNkRGlyKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTdGFydFBvaW50ID0gc3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoRW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFN0YXJ0UG9pbnQgPSBpc1BsYXRmb3JtKHN0YWlyTmV4dFNlZ21lbnQpID8gZXAgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQ6IHN0YWlyTmV4dFNlZ21lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUzZEluZDogc3RhaXJOZXh0TGluZTNkSW5kLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFBvaW50OiBuZXh0U3RhcnRQb2ludCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQ6IGN1cnJlbnRTZWdtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lM2RJbmQ6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3RhcnRQb2ludDogbmV4dFN0YXJ0UG9pbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZW5kIHRoZSBwYXRjaCB3aGljaCBpcyBlbmQgd2l0aCBzdGFpciBjb21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbHMucHVzaChoYW5kcmFpbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWwgPSB7IHJhaWw6IFtdLCBjb2x1bW5zOiBbXSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZpc2l0ZWRSZWNvcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNpdGVkUmVjb3JkLnJpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocHVzaEVuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXAgaXMgcmV1c2VkIHdoZW4gcHVzaEVuZFxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBUYWlsRGlzdGFuY2UgPSBzdGVwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxlZnQgJiYgaXNMZWZ0U3RhaXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcCA9IHN0YXJ0LmFkZGVkKGxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMiAtIG9mZnNldExlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29ybmVyU3RhcnRIZWlnaHQgPSBsZWZ0ID8gc3RhcnRIZWlnaHQgOiBlbmRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3JuZXJFbmQgPSBlcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcm5lckRpc3RhbmNlID0gc3AuZGlzdGFuY2VUbyhjb3JuZXJFbmQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWxvbmcgY29ybmVyQmFzZURpclxuICAgICAgICAgICAgICAgICAgICAgICAgY29ybmVyU3BUb0VwRGlyID0gY29ybmVyRW5kLnN1YnRyYWN0ZWQoc3ApLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcm5lck9mZnNldERpciA9IERpcmVjdGlvblouY3Jvc3MoY29ybmVyU3BUb0VwRGlyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcm5lckFkZGl0aW9uYWxIZWlnaHQgPSBsZWZ0ICYmICFpc1JpZ2h0U3RhaXIgJiYgdXB3YXJkID8gc3RlcEhlaWdodCA6ICghbGVmdCAmJiAhdXB3YXJkID8gLXN0ZXBIZWlnaHQgOiAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0ZW1wVGFpbERpc3RhbmNlIDwgY29ybmVyRGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBib3R0b21Qb2ludCA9IHNwLmFkZGVkKGNvcm5lclNwVG9FcERpci5tdWx0aXBsaWVkKHRlbXBUYWlsRGlzdGFuY2UpKS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoY29ybmVyU3RhcnRIZWlnaHQgKyBjb3JuZXJBZGRpdGlvbmFsSGVpZ2h0KSkuYWRkZWQoY29ybmVyT2Zmc2V0RGlyLm11bHRpcGxpZWQob2Zmc2V0TGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWwuY29sdW1ucy5wdXNoKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tUG9pbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbVBvaW50LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wVGFpbERpc3RhbmNlICs9IHN0ZXA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0Qm90dG9tUG9pbnQgPSBlcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoY29ybmVyU3RhcnRIZWlnaHQgKyBjb3JuZXJBZGRpdGlvbmFsSGVpZ2h0KSkuYWRkZWQoY29ybmVyT2Zmc2V0RGlyLm11bHRpcGxpZWQob2Zmc2V0TGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGVmdCAmJiBpc1JpZ2h0U3RhaXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5yYWlsLnB1c2goc3AuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGNvcm5lclN0YXJ0SGVpZ2h0ICsgaGVpZ2h0ICsgY29ybmVyQWRkaXRpb25hbEhlaWdodCkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHB1c2ggcmFpbFxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWwucmFpbC5wdXNoKGxhc3RCb3R0b21Qb2ludC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChjb3JuZXJEaXN0YW5jZSAtIHRlbXBUYWlsRGlzdGFuY2UgKyBzdGVwKSA+IHN0ZXBUb2xlcmFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5jb2x1bW5zLnB1c2goW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0Qm90dG9tUG9pbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RCb3R0b21Qb2ludC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50ID0gbmV4dDtcbiAgICAgICAgICAgIGlmICghY3VycmVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAodW5WaXNpdGVkLnNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlU2VnbWVudCA9IFsuLi51blZpc2l0ZWQudmFsdWVzKCldWzBdO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50OiB0aGVTZWdtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUzZEluZDogZ2V0U2VnbWVudFN0YXJ0QW5kQmFzZUxpbmUzZCh0aGVTZWdtZW50LCBzZWdtZW50cykuc3RhcnRMaW5lLmxpbmUzZEluZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaGFuZHJhaWxzO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdlbmVyYXRlVGVtcExpbmVzTG9vcCh2ZXJ0ZXhDb3VudCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiB2ZXJ0ZXhDb3VudCB9KS5tYXAoKF8sIGkpID0+IFtpLCBpID09PSB2ZXJ0ZXhDb3VudCAtIDEgPyAwIDogaSArIDFdKTtcbn1cbmZ1bmN0aW9uIGdldFNlZ21lbnRTdGFydEFuZEJhc2VMaW5lM2Qoc2VnbWVudCwgc2VnbWVudHMsIGJhc2VTZWdtZW50LCBvZmZzZXRMZW5ndGgpIHtcbiAgICBjb25zdCB7IHN0YXJ0LCBwYXJhbTogeyB0eXBlLCBzdGFydFdpZHRoIH0sIGNvbXBvbmVudERpcmVjdGlvblR5cGUsIG1vbGRTaGFwZTogeyB0ZW1wTGluZXMsIHZlcnRpY2VzIH0sIGJhc2VDb21wb25lbnQgfSA9IHNlZ21lbnQ7XG4gICAgaWYgKG9mZnNldExlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG9mZnNldExlbmd0aCA9IEhhbmRyYWlsRGVmYXVsdE9mZnNldExlbmd0aDtcbiAgICB9XG4gICAgbGV0IHN0YXJ0TGluZTNkSW5kID0gMDtcbiAgICAvLyA1IGVkZ2VzXG4gICAgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gJiYgY29tcG9uZW50RGlyZWN0aW9uVHlwZSA9PT0gQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5SaWdodEZyb250ICYmIHRlbXBMaW5lcy5sZW5ndGggPiA0KSB7XG4gICAgICAgIHN0YXJ0TGluZTNkSW5kID0gMTtcbiAgICB9XG4gICAgY29uc3Qgc3RhcnRMaW5lM2QgPSB0ZW1wTGluZXNbc3RhcnRMaW5lM2RJbmRdO1xuICAgIGNvbnN0IHN0YXJ0TGluZTNkU3RhcnQgPSB2ZXJ0aWNlc1tzdGFydExpbmUzZFswXV07XG4gICAgY29uc3Qgc3RhcnRMaW5lM2RFbmQgPSB2ZXJ0aWNlc1tzdGFydExpbmUzZFsxXV07XG4gICAgY29uc3Qgc3RhcnRMaW5lM2REaXIgPSBzdGFydExpbmUzZEVuZC5zdWJ0cmFjdGVkKHN0YXJ0TGluZTNkU3RhcnQpLm5vcm1hbGl6ZWQoKTtcbiAgICBsZXQgYmFzZUxpbmUzZEluZCA9IChiYXNlQ29tcG9uZW50ID09PSBudWxsIHx8IGJhc2VDb21wb25lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJhc2VDb21wb25lbnQuY29tcG9uZW50SW5kZXgpIHx8IDA7XG4gICAgbGV0IGJhc2VMaW5lM2QgPSBbLi4uc3RhcnRMaW5lM2RdLnJldmVyc2UoKTtcbiAgICBsZXQgYmFzZUxpbmUzZFN0YXJ0ID0gdmVydGljZXNbc3RhcnRMaW5lM2RbMV1dO1xuICAgIGxldCBiYXNlTGluZTNkRW5kID0gdmVydGljZXNbc3RhcnRMaW5lM2RbMF1dO1xuICAgIGxldCBiYXNlTGluZTNkRGlyID0gc3RhcnRMaW5lM2REaXIucmV2ZXJzZWQoKTtcbiAgICA7XG4gICAgaWYgKCFiYXNlU2VnbWVudCAmJiBiYXNlQ29tcG9uZW50KSB7XG4gICAgICAgIGJhc2VTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgoc2VnbWVudHMsIGJhc2VDb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xuICAgIH1cbiAgICBpZiAoYmFzZVNlZ21lbnQpIHtcbiAgICAgICAgY29uc3QgeyBtb2xkU2hhcGU6IHsgdmVydGljZXM6IGJhc2VWZXJ0aWNlcywgdGVtcExpbmVzOiBiYXNlVGVtcExpbmVzIH0gfSA9IGJhc2VTZWdtZW50O1xuICAgICAgICBiYXNlTGluZTNkID0gYmFzZVNlZ21lbnQucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSA/IGJhc2VUZW1wTGluZXNbKGJhc2VDb21wb25lbnQgPT09IG51bGwgfHwgYmFzZUNvbXBvbmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleCkgfHwgMF0gOiBbLi4uYmFzZVRlbXBMaW5lc1tiYXNlVGVtcExpbmVzLmxlbmd0aCAtIDFdXS5yZXZlcnNlKCk7XG4gICAgICAgIGJhc2VMaW5lM2RTdGFydCA9IGJhc2VWZXJ0aWNlc1tiYXNlTGluZTNkWzBdXTtcbiAgICAgICAgYmFzZUxpbmUzZEVuZCA9IGJhc2VWZXJ0aWNlc1tiYXNlTGluZTNkWzFdXTtcbiAgICAgICAgYmFzZUxpbmUzZERpciA9IGJhc2VMaW5lM2RFbmQuc3VidHJhY3RlZChiYXNlTGluZTNkU3RhcnQpLm5vcm1hbGl6ZWQoKTtcbiAgICB9XG4gICAgbGV0IGJhc2VMaW5lM2RTdGFydFdpdGhPZmZzZXQgPSBiYXNlTGluZTNkU3RhcnQuYWRkZWQoYmFzZUxpbmUzZERpci5tdWx0aXBsaWVkKG9mZnNldExlbmd0aCkpO1xuICAgIGxldCBiYXNlTGluZTNkRW5kV2l0aE9mZnNldCA9IGJhc2VMaW5lM2RFbmQuYWRkZWQoYmFzZUxpbmUzZERpci5tdWx0aXBsaWVkKC1vZmZzZXRMZW5ndGgpKTtcbiAgICBsZXQgc3RhcnRPbkJhc2VMaW5lID0gc3RhcnRMaW5lM2RTdGFydDtcbiAgICBsZXQgZW5kT25CYXNlTGluZSA9IHN0YXJ0TGluZTNkRW5kO1xuICAgIGxldCBzdGFydE9uQmFzZUxpbmVXaXRoT2Zmc2V0ID0gc3RhcnRMaW5lM2RTdGFydC5hZGRlZChzdGFydExpbmUzZERpci5tdWx0aXBsaWVkKG9mZnNldExlbmd0aCkpO1xuICAgIGxldCBlbmRPbkJhc2VMaW5lV2l0aE9mZnNldCA9IHN0YXJ0TGluZTNkRW5kLmFkZGVkKHN0YXJ0TGluZTNkRGlyLm11bHRpcGxpZWQoLW9mZnNldExlbmd0aCkpO1xuICAgIGlmICh0eXBlICE9PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XG4gICAgICAgIHN0YXJ0T25CYXNlTGluZSA9IHN0YXJ0LmFkZGVkKGJhc2VMaW5lM2REaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpO1xuICAgICAgICBlbmRPbkJhc2VMaW5lID0gc3RhcnQuYWRkZWQoYmFzZUxpbmUzZERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpO1xuICAgICAgICBzdGFydE9uQmFzZUxpbmVXaXRoT2Zmc2V0ID0gc3RhcnQuYWRkZWQoYmFzZUxpbmUzZERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyIC0gb2Zmc2V0TGVuZ3RoKSk7XG4gICAgICAgIGVuZE9uQmFzZUxpbmVXaXRoT2Zmc2V0ID0gc3RhcnQuYWRkZWQoYmFzZUxpbmUzZERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMiArIG9mZnNldExlbmd0aCkpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBzdGFydExpbmU6IHsgbGluZTNkSW5kOiBzdGFydExpbmUzZEluZCwgbGluZTNkOiBzdGFydExpbmUzZCwgZGlyOiBzdGFydExpbmUzZERpciwgc3RhcnQ6IHN0YXJ0TGluZTNkU3RhcnQsIGVuZDogc3RhcnRMaW5lM2RFbmQsIHN0YXJ0T25CYXNlTGluZSwgZW5kT25CYXNlTGluZSwgc3RhcnRPbkJhc2VMaW5lV2l0aE9mZnNldCwgZW5kT25CYXNlTGluZVdpdGhPZmZzZXQgfSxcbiAgICAgICAgYmFzZUxpbmU6IHsgbGluZTNkSW5kOiBiYXNlTGluZTNkSW5kLCBsaW5lM2Q6IGJhc2VMaW5lM2QsIGRpcjogYmFzZUxpbmUzZERpciwgc3RhcnQ6IGJhc2VMaW5lM2RTdGFydCwgZW5kOiBiYXNlTGluZTNkRW5kLCBzdGFydFdpdGhPZmZzZXQ6IGJhc2VMaW5lM2RTdGFydFdpdGhPZmZzZXQsIGVuZFdpdGhPZmZzZXQ6IGJhc2VMaW5lM2RFbmRXaXRoT2Zmc2V0IH0sXG4gICAgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc1BsYXRmb3JtKHNlZ21lbnQpIHtcbiAgICByZXR1cm4gc2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2lyY3VsYXJTdGFpcihzZWdtZW50KSB7XG4gICAgcmV0dXJuIHNlZ21lbnQucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5DaXJjdWxhclN0YWlyO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyYWlnaHRTdGFpcihzZWdtZW50KSB7XG4gICAgcmV0dXJuIHNlZ21lbnQucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyO1xufVxuIiwiZXhwb3J0IGNvbnN0IFN0YWlyTW9kZWxLZXkgPSAnRFNNb2RlbCc7XG5leHBvcnQgY29uc3QgTW9kZWxWYWx1ZSA9ICcxJztcbmV4cG9ydCBjb25zdCBIYW5kcmFpbE1vZGVsS2V5ID0gJ0hhbmRyYWlsJztcbmV4cG9ydCBjb25zdCBSYWlsTW9kZWxLZXkgPSAnUmFpbCc7XG5leHBvcnQgY29uc3QgQ29sdW1uTW9kZWxLZXkgPSAnQ29sdW1uJztcbi8vIGV4cG9ydCBjb25zdCBTdGFpcktleSA9ICdEU1N0YWlyJztcbi8vIGV4cG9ydCBjb25zdCBQbGF0Zm9ybUtleSA9ICdEU1BsYXRmb3JtJztcbmV4cG9ydCBjb25zdCBTdGFpclBhcmFtS2V5ID0gJ1NQYXJhbSc7XG5leHBvcnQgY29uc3QgQ29tcG9uZW50UGFyYW1LZXkgPSAnQ1BhcmFtJztcbmV4cG9ydCBjb25zdCBTdGFpck1hdGVyaWFsS2V5ID0gJ1NNYXQnO1xuZXhwb3J0IGNvbnN0IFBsYXRmb3JtTWF0ZXJpYWxLZXkgPSAnUE1hdCc7XG5leHBvcnQgY29uc3QgUmFpbE1hdGVyaWFsS2V5ID0gJ0hSTWF0JztcbmV4cG9ydCBjb25zdCBDb2x1bW5NYXRlcmlhbEtleSA9ICdIQ01hdCc7XG5leHBvcnQgY29uc3QgQ29tcG9uZW50TWF0ZXJpYWxLZXkgPSAnQ01hdCc7XG4vLyBzdGFydEhlaWdodCBhbmQgZW5kSGVpZ2h0IGNhY2hlZCBpbiBzdGFydCBhbmQgZW5kXG5leHBvcnQgY29uc3QgQ29tcG9uZW50SW5kZXhLZXkgPSAnSW5kJztcbmV4cG9ydCBjb25zdCBTdGFydEVuZEtleSA9ICdTVG9FJztcbmV4cG9ydCBjb25zdCBCYXNlTGluZVNlZzNkS2V5ID0gJ0Jhc2VMaW5lJztcbmV4cG9ydCBjb25zdCBCYXNlQ29tcG9uZW50S2V5ID0gJ0Jhc2VDb21wb25lbnQnO1xuZXhwb3J0IGNvbnN0IENpcmNsZVRhbmdlbnRLZXkgPSAnQ2lyY2xlVGFuZ2VudCc7XG5leHBvcnQgY29uc3QgRGVsaW1pdGVyID0gJyYnO1xuZXhwb3J0IGNvbnN0IENvb3JkRGVsaW1pdGVyID0gJywnO1xuZXhwb3J0IGNvbnN0IEJhc2VMaW5lM2REZWxpbWl0ZXIgPSAnXyc7XG5jb25zdCBQcm9kTWF0ZXJpYWxzID0ge1xuICAgIFN0YWlyOiB7IGJnSWQ6ICczRk80TEhFVUU0MTMnLCBtYXRlcmlhbElkOiAnNWNlMmE2ZDdkY2M3ZGM3ZGM4ZWUwZmIwJyB9LFxuICAgIC8vIFN0YWlyOiB7IGJnSWQ6ICczRk80QVRLRUNMS0knLCBtYXRlcmlhbElkOiAnNjE2OGY0NTRjZGQyNWUwMDAxN2Q3NWQwJyB9LFxuICAgIFBsYXRmb3JtOiB7IGJnSWQ6ICczRk80TEhFVTlJSVAnLCBtYXRlcmlhbElkOiAnNWNlMmE3YTNiNWNiNjk1MWJlY2I1YTRhJyB9LFxuICAgIEhhbmRyYWlsOiB7XG4gICAgICAgIHJhaWw6IHsgYmdJZDogJzNGTzRMSEVSSDJZSycsIG1hdGVyaWFsSWQ6ICc1ODE3MzM3ZjM0MTVmODZmNmI5MzcyZWEnIH0sXG4gICAgICAgIGNvbHVtbjogeyBiZ0lkOiAnM0ZPNExIRVJIMllLJywgbWF0ZXJpYWxJZDogJzU4MTczMzdmMzQxNWY4NmY2YjkzNzJlYScgfSxcbiAgICB9LFxufTtcbmV4cG9ydCBjb25zdCBQcmVzZXRNYXRlcmlhbHMgPSBQcm9kTWF0ZXJpYWxzO1xuLy8gY29uc3QgRGV2TWF0ZXJpYWxzID0ge1xuLy8gICAgIFN0YWlyOiB7IGJnSWQ6ICczRk80SDJENzNKRk8nLCBtYXRlcmlhbElkOiAnNThhZjk2MWI0YTRkMmM0ZjhhYTJiMWRhJyB9LFxuLy8gICAgIC8vIFN0YWlyOiB7IGJnSWQ6ICczRk80QVRLRUNMS0knLCBtYXRlcmlhbElkOiAnNjE2OGY0NTRjZGQyNWUwMDAxN2Q3NWQwJyB9LFxuLy8gICAgIFBsYXRmb3JtOiB7IGJnSWQ6ICczRk80SDJENkNRTVknLCBtYXRlcmlhbElkOiAnNTgxNmZlZjk4NWRhNTY2YTFiMjhhOTQ0JyB9LFxuLy8gICAgIEhhbmRyYWlsOiB7XG4vLyAgICAgICAgIHJhaWw6IHsgYmdJZDogJzNGTzRIMkQ2SDhTQicsIG1hdGVyaWFsSWQ6ICc1OGFmYjNhYjVjMjZhMDczYjM4OWE5NWYnIH0sXG4vLyAgICAgICAgIGNvbHVtbjogeyBiZ0lkOiAnM0ZPNEdESzVFWERDJywgbWF0ZXJpYWxJZDogJzVlNTMyZmI0MjAxNDAyMDAwMWNjNDg4OScgfSxcbi8vICAgICB9LFxuLy8gfVxuLy8gZXhwb3J0IGNvbnN0IFByZXNldE1hdGVyaWFscyA9ICgod2luZG93IGFzIGFueSkub3JpZ2luIHx8ICcnKS5pbmNsdWRlcygnc2l0JykgPyBEZXZNYXRlcmlhbHMgOiBQcm9kTWF0ZXJpYWxzO1xuZXhwb3J0IHZhciBDb21wb25lbnRQYXJhbVR5cGU7XG4oZnVuY3Rpb24gKENvbXBvbmVudFBhcmFtVHlwZSkge1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhvcml6b250YWxTdGVwXCJdID0gXCJob3Jpem9udGFsU3RlcFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIlZlcnRpY2FsU3RlcFwiXSA9IFwidmVydGljYWxTdGVwXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiU3RhcnRXaWR0aFwiXSA9IFwic3RhcnRXaWR0aFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkVuZFdpZHRoXCJdID0gXCJlbmRXaWR0aFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIlVwd2FyZFwiXSA9IFwidXB3YXJkXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiUGxhdGZvcm1UaGlja25lc3NcIl0gPSBcInBsYXRmb3JtVGhpY2tuZXNzXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiQ29tcG9uZW50TWF0ZXJpYWxcIl0gPSBcIm1hdGVyaWFsXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiVHlwZVwiXSA9IFwidHlwZVwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIlBsYXRmb3JtTGVuZ3RoXCJdID0gXCJwbGF0Zm9ybUxlbmd0aFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIlN0ZXBQcm9wb3J0aW9uYWxcIl0gPSBcInN0ZXBQcm9wb3J0aW9uYWxcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJXaWR0aFByb3BvcnRpb25hbFwiXSA9IFwid2lkdGhQcm9wb3J0aW9uYWxcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJQbGF0Zm9ybUxlbmd0aExvY2tlZFwiXSA9IFwicGxhdGZvcm1MZW5ndGhMb2NrZWRcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJTdGFpck1hdGVyaWFsXCJdID0gXCJzdGFpck1hdGVyaWFsXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiUGxhdGZvcm1NYXRlcmlhbFwiXSA9IFwicGxhdGZvcm1NYXRlcmlhbFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsXCJdID0gXCJoYW5kcmFpbFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsSGVpZ2h0XCJdID0gXCJoYW5kcmFpbEhlaWdodFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsUmFpbFR5cGVcIl0gPSBcImhhbmRyYWlsUmFpbFR5cGVcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIYW5kcmFpbFJhaWxSYWRpdXNcIl0gPSBcImhhbmRyYWlsUmFpbFJhZGl1c1wiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsUmFpbFdpZHRoXCJdID0gXCJoYW5kcmFpbFJhaWxXaWR0aFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsUmFpbEhlaWdodFwiXSA9IFwiaGFuZHJhaWxSYWlsSGVpZ2h0XCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSGFuZHJhaWxSYWlsTWF0ZXJpYWxcIl0gPSBcIlJhaWxNYXRlcmlhbFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsQ29sdW1uVHlwZVwiXSA9IFwiaGFuZHJhaWxDb2x1bW5UeXBlXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSGFuZHJhaWxDb2x1bW5TdGVwXCJdID0gXCJoYW5kcmFpbENvbHVtblN0ZXBcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIYW5kcmFpbENvbHVtblJhZGl1c1wiXSA9IFwiaGFuZHJhaWxDb2x1bW5SYWRpdXNcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIYW5kcmFpbENvbHVtbldpZHRoXCJdID0gXCJoYW5kcmFpbENvbHVtbldpZHRoXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSGFuZHJhaWxDb2x1bW5IZWlnaHRcIl0gPSBcImhhbmRyYWlsQ29sdW1uSGVpZ2h0XCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSGFuZHJhaWxDb2x1bW5NYXRlcmlhbFwiXSA9IFwiQ29sdW1uTWF0ZXJpYWxcIjtcbn0pKENvbXBvbmVudFBhcmFtVHlwZSB8fCAoQ29tcG9uZW50UGFyYW1UeXBlID0ge30pKTtcbi8vIGludGVyZmFjZSBQYXJhbVNldHRpbmdzIHtcbi8vICAgICBtaW46IG51bWJlcjtcbi8vICAgICBtYXg6IG51bWJlcjtcbi8vICAgICBzdGVwOiBudW1iZXI7XG4vLyAgICAgdW5pdDogc3RyaW5nO1xuLy8gICAgIHByZWNpc2lvbjogbnVtYmVyO1xuLy8gfVxuZXhwb3J0IHZhciBDb21wb25lbnRUeXBlO1xuKGZ1bmN0aW9uIChDb21wb25lbnRUeXBlKSB7XG4gICAgQ29tcG9uZW50VHlwZVtDb21wb25lbnRUeXBlW1wiU3RyYWlnaHRTdGFpclwiXSA9IDBdID0gXCJTdHJhaWdodFN0YWlyXCI7XG4gICAgQ29tcG9uZW50VHlwZVtDb21wb25lbnRUeXBlW1wiQ2lyY3VsYXJTdGFpclwiXSA9IDFdID0gXCJDaXJjdWxhclN0YWlyXCI7XG4gICAgQ29tcG9uZW50VHlwZVtDb21wb25lbnRUeXBlW1wiUGxhdGZvcm1cIl0gPSAyXSA9IFwiUGxhdGZvcm1cIjtcbn0pKENvbXBvbmVudFR5cGUgfHwgKENvbXBvbmVudFR5cGUgPSB7fSkpO1xuZXhwb3J0IHZhciBSYWlsVHlwZTtcbihmdW5jdGlvbiAoUmFpbFR5cGUpIHtcbiAgICBSYWlsVHlwZVtSYWlsVHlwZVtcIkNpcmNsZVwiXSA9IDBdID0gXCJDaXJjbGVcIjtcbiAgICBSYWlsVHlwZVtSYWlsVHlwZVtcIlJlY3RcIl0gPSAxXSA9IFwiUmVjdFwiO1xuICAgIFJhaWxUeXBlW1JhaWxUeXBlW1wiQ3VzdG9tXCJdID0gOTldID0gXCJDdXN0b21cIjtcbn0pKFJhaWxUeXBlIHx8IChSYWlsVHlwZSA9IHt9KSk7XG5leHBvcnQgdmFyIENvbHVtblR5cGU7XG4oZnVuY3Rpb24gKENvbHVtblR5cGUpIHtcbiAgICBDb2x1bW5UeXBlW0NvbHVtblR5cGVbXCJDaXJjbGVcIl0gPSAwXSA9IFwiQ2lyY2xlXCI7XG4gICAgQ29sdW1uVHlwZVtDb2x1bW5UeXBlW1wiUmVjdFwiXSA9IDFdID0gXCJSZWN0XCI7XG4gICAgQ29sdW1uVHlwZVtDb2x1bW5UeXBlW1wiQ3VzdG9tXCJdID0gOTldID0gXCJDdXN0b21cIjtcbn0pKENvbHVtblR5cGUgfHwgKENvbHVtblR5cGUgPSB7fSkpO1xuZXhwb3J0IGNvbnN0IENvbXBvbmVudFBhcmFtU2V0dGluZ3MgPSB7XG4gICAgaG9yaXpvbnRhbFN0ZXA6IHsgdGl0bGU6IFwi5q2l6ZW/XCIsIG1pbjogMSwgbWF4OiAxMDAwMDAsIHN0ZXA6IDIwLCB1bml0OiAn6ZW/JywgcHJlY2lzaW9uOiAwLCB9LFxuICAgIHZlcnRpY2FsU3RlcDogeyB0aXRsZTogXCLmraXplb9cIiwgbWluOiAxLCBtYXg6IDEwMDAwMCwgc3RlcDogMjAsIHVuaXQ6ICfpq5gnLCBwcmVjaXNpb246IDAsIH0sXG4gICAgc3RhcnRXaWR0aDogeyB0aXRsZTogXCLlrr3luqZcIiwgbWluOiAxLCBtYXg6IDEwMDAwMCwgc3RlcDogNTAsIHVuaXQ6ICfotbcnLCBwcmVjaXNpb246IDAsIH0sXG4gICAgZW5kV2lkdGg6IHsgdGl0bGU6IFwi5a695bqmXCIsIG1pbjogMSwgbWF4OiAxMDAwMDAsIHN0ZXA6IDUwLCB1bml0OiAn57uIJywgcHJlY2lzaW9uOiAwLCB9LFxuICAgIHBsYXRmb3JtTGVuZ3RoOiB7IHRpdGxlOiBcIumVv+W6plwiLCBtaW46IDEwMCwgbWF4OiAxMDAwMDAsIHN0ZXA6IDUwLCB1bml0OiAnJywgcHJlY2lzaW9uOiAwLCB9LFxuICAgIHR5cGU6IHtcbiAgICAgICAgLy8gcmFkaW9WYWx1ZXM6IFtDb21wb25lbnRUeXBlLlN0cmFpZ2h0U3RhaXIsIENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpciwgQ29tcG9uZW50VHlwZS5QbGF0Zm9ybV0sXG4gICAgICAgIC8vIHRleHRzOiBbXCLnm7TpmLZcIiwgXCLml4vovazpmLbmoq9cIiwgXCLlubPlj7BcIl0sXG4gICAgICAgIHRpdGxlOiBcIuexu+Wei1wiLFxuICAgICAgICByYWRpb09wdGlvbnM6IFtcbiAgICAgICAgICAgIHsgdmFsdWU6IENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpciwgdGV4dDogXCLnm7TpmLZcIiB9LFxuICAgICAgICAgICAgeyB2YWx1ZTogQ29tcG9uZW50VHlwZS5DaXJjdWxhclN0YWlyLCB0ZXh0OiBcIuaXi+i9rOmYtuair1wiIH0sXG4gICAgICAgICAgICB7IHZhbHVlOiBDb21wb25lbnRUeXBlLlBsYXRmb3JtLCB0ZXh0OiBcIuW5s+WPsFwiIH0sXG4gICAgICAgIF1cbiAgICB9LFxuICAgIHVwd2FyZDoge1xuICAgICAgICAvLyByYWRpb1ZhbHVlczogWzEsIDBdLFxuICAgICAgICAvLyB0ZXh0czogW1wi5ZCR5LiKXCIsIFwi5ZCR5LiLXCJdLFxuICAgICAgICB0aXRsZTogXCLmlrnlkJFcIixcbiAgICAgICAgcmFkaW9PcHRpb25zOiBbXG4gICAgICAgICAgICB7IHZhbHVlOiB0cnVlLCB0ZXh0OiBcIuWQkeS4ilwiIH0sXG4gICAgICAgICAgICB7IHZhbHVlOiBmYWxzZSwgdGV4dDogXCLlkJHkuItcIiB9LFxuICAgICAgICBdXG4gICAgfSxcbiAgICBwbGF0Zm9ybVRoaWNrbmVzczogeyB0aXRsZTogXCLljprluqZcIiwgbWluOiAxLCBtYXg6IDEwMDAwMCwgc3RlcDogMTAsIHVuaXQ6ICcnLCBwcmVjaXNpb246IDAsIH0sXG4gICAgbWF0ZXJpYWw6IHsgdGl0bGU6ICfmnZDotKgnIH0sXG4gICAgc3RhaXJNYXRlcmlhbDogeyB0aXRsZTogJ+mYtuair+adkOi0qCcgfSxcbiAgICBwbGF0Zm9ybU1hdGVyaWFsOiB7IHRpdGxlOiAn5bmz5Y+w5p2Q6LSoJyB9LFxuICAgIGhhbmRyYWlsOiB7XG4gICAgICAgIHRpdGxlOiAn5ZCv55So5qCP5p2GJyxcbiAgICAgICAgaGVpZ2h0OiB7IHRpdGxlOiBcIumrmOW6plwiLCBtaW46IDEsIG1heDogMTAwMDAwLCBzdGVwOiAxMCwgdW5pdDogJycsIHByZWNpc2lvbjogMCwgfSxcbiAgICAgICAgcmFpbDoge1xuICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIuagt+W8j1wiLFxuICAgICAgICAgICAgICAgIHNlbGVjdE9wdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogUmFpbFR5cGUuQ2lyY2xlLCBsYWJlbDogXCLlnIblvaJcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBSYWlsVHlwZS5SZWN0LCBsYWJlbDogXCLmlrnlvaJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAvLyB7IHZhbHVlOiBSYWlsVHlwZS5DdXN0b20sIGxhYmVsOiBcIuaLvuWPllwiIH0sXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgY29sdW1uOiB7XG4gICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi5qC35byPXCIsXG4gICAgICAgICAgICAgICAgc2VsZWN0T3B0aW9uczogW1xuICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBDb2x1bW5UeXBlLkNpcmNsZSwgbGFiZWw6IFwi5ZyG5b2iXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogQ29sdW1uVHlwZS5SZWN0LCBsYWJlbDogXCLmlrnlvaJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAvLyB7IHZhbHVlOiBDb2x1bW5UeXBlLkN1c3RvbSwgbGFiZWw6IFwi5ou+5Y+WXCIgfSxcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3RlcDogeyB0aXRsZTogXCLpl7TpmpRcIiwgbWluOiAxLCBtYXg6IDEwMDAwMCwgc3RlcDogMTAsIHVuaXQ6ICcnLCBwcmVjaXNpb246IDAsIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBvbmVudFBhcmFtOiB7XG4gICAgICAgICAgICByYWRpdXM6IHsgdGl0bGU6IFwi5Y2K5b6EXCIsIG1pbjogMSwgbWF4OiAxMDAwMDAsIHN0ZXA6IDEsIHVuaXQ6ICcnLCBwcmVjaXNpb246IDAsIH0sXG4gICAgICAgICAgICB3aWR0aDogeyB0aXRsZTogXCLlrr3luqZcIiwgbWluOiAxLCBtYXg6IDEwMDAwMCwgc3RlcDogMSwgdW5pdDogJycsIHByZWNpc2lvbjogMCwgfSxcbiAgICAgICAgICAgIGhlaWdodDogeyB0aXRsZTogXCLpq5jluqZcIiwgbWluOiAxLCBtYXg6IDEwMDAwMCwgc3RlcDogMSwgdW5pdDogJycsIHByZWNpc2lvbjogMCwgfSxcbiAgICAgICAgfVxuICAgIH1cbn07XG5leHBvcnQgdmFyIE1hdGVyaWFsQXNzaWduVHlwZTtcbihmdW5jdGlvbiAoTWF0ZXJpYWxBc3NpZ25UeXBlKSB7XG4gICAgTWF0ZXJpYWxBc3NpZ25UeXBlW1wiU3RhaXJPdmVyYWxsXCJdID0gXCJzdGFpck92ZXJhbGxcIjtcbiAgICBNYXRlcmlhbEFzc2lnblR5cGVbXCJQbGF0Zm9ybU92ZXJhbGxcIl0gPSBcInBsYXRmb3JtT3ZlcmFsbFwiO1xuICAgIE1hdGVyaWFsQXNzaWduVHlwZVtcIlJhaWxcIl0gPSBcInJhaWxcIjtcbiAgICBNYXRlcmlhbEFzc2lnblR5cGVbXCJDb2x1bW5cIl0gPSBcImNvbHVtblwiO1xufSkoTWF0ZXJpYWxBc3NpZ25UeXBlIHx8IChNYXRlcmlhbEFzc2lnblR5cGUgPSB7fSkpO1xuZXhwb3J0IGZ1bmN0aW9uIGdldENvbXBvbmVudFRpdGxlKGNvbXBvbmVudFR5cGUpIHtcbiAgICBpZiAoY29tcG9uZW50VHlwZSA9PT0gQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyKSB7XG4gICAgICAgIHJldHVybiAn6Zi2JztcbiAgICB9XG4gICAgZWxzZSBpZiAoY29tcG9uZW50VHlwZSA9PT0gQ29tcG9uZW50VHlwZS5DaXJjdWxhclN0YWlyKSB7XG4gICAgICAgIHJldHVybiAn6Zi2JztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiAn5Y+wJztcbiAgICB9XG59XG5leHBvcnQgY29uc3QgSGFuZHJhaWxEZWZhdWx0T2Zmc2V0TGVuZ3RoID0gNDA7XG5leHBvcnQgY29uc3QgRGVmYXVsdFN0YWlyUGFyYW0gPSB7XG4gICAgaG9yaXpvbnRhbFN0ZXA6IDIwMCxcbiAgICB2ZXJ0aWNhbFN0ZXA6IDIwMCxcbiAgICBzdGFydFdpZHRoOiAxMDAwLFxuICAgIGVuZFdpZHRoOiAxMDAwLFxuICAgIHVwd2FyZDogdHJ1ZSxcbiAgICBwbGF0Zm9ybVRoaWNrbmVzczogMTAwLFxuICAgIHN0YWlyTWF0ZXJpYWw6IFByZXNldE1hdGVyaWFscy5TdGFpcixcbiAgICBwbGF0Zm9ybU1hdGVyaWFsOiBQcmVzZXRNYXRlcmlhbHMuUGxhdGZvcm0sXG4gICAgaGFuZHJhaWw6IHtcbiAgICAgICAgc3VwcG9ydDogdHJ1ZSxcbiAgICAgICAgaGVpZ2h0OiA0MDAsXG4gICAgICAgIHJhaWw6IHtcbiAgICAgICAgICAgIHR5cGU6IFJhaWxUeXBlLkNpcmNsZSxcbiAgICAgICAgICAgIHBhcmFtOiB7IHJhZGl1czogMTIsIHdpZHRoOiAyMCwgaGVpZ2h0OiAxMiwgfSxcbiAgICAgICAgICAgIG1hdGVyaWFsOiBQcmVzZXRNYXRlcmlhbHMuSGFuZHJhaWwucmFpbCxcbiAgICAgICAgfSxcbiAgICAgICAgY29sdW1uOiB7XG4gICAgICAgICAgICB0eXBlOiBDb2x1bW5UeXBlLkNpcmNsZSxcbiAgICAgICAgICAgIHN0ZXA6IDQwMCxcbiAgICAgICAgICAgIHBhcmFtOiB7IHJhZGl1czogNCwgd2lkdGg6IDgsIGhlaWdodDogOCwgfSxcbiAgICAgICAgICAgIG1hdGVyaWFsOiBQcmVzZXRNYXRlcmlhbHMuSGFuZHJhaWwuY29sdW1uLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgc3RlcFByb3BvcnRpb25hbDogdHJ1ZSxcbiAgICB3aWR0aFByb3BvcnRpb25hbDogdHJ1ZSxcbn07XG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVmYXVsdFN0YWlyUGFyYW0oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaG9yaXpvbnRhbFN0ZXA6IDIwMCxcbiAgICAgICAgdmVydGljYWxTdGVwOiAxMDAsXG4gICAgICAgIHN0YXJ0V2lkdGg6IDEwMDAsXG4gICAgICAgIGVuZFdpZHRoOiAxMDAwLFxuICAgICAgICB1cHdhcmQ6IHRydWUsXG4gICAgICAgIHBsYXRmb3JtVGhpY2tuZXNzOiAxMDAsXG4gICAgICAgIHN0YWlyTWF0ZXJpYWw6IFByZXNldE1hdGVyaWFscy5TdGFpcixcbiAgICAgICAgcGxhdGZvcm1NYXRlcmlhbDogUHJlc2V0TWF0ZXJpYWxzLlBsYXRmb3JtLFxuICAgICAgICBoYW5kcmFpbDoge1xuICAgICAgICAgICAgc3VwcG9ydDogdHJ1ZSxcbiAgICAgICAgICAgIGhlaWdodDogNDAwLFxuICAgICAgICAgICAgcmFpbDoge1xuICAgICAgICAgICAgICAgIHR5cGU6IFJhaWxUeXBlLkNpcmNsZSxcbiAgICAgICAgICAgICAgICBwYXJhbTogeyByYWRpdXM6IDEyLCB3aWR0aDogMjAsIGhlaWdodDogMTIsIH0sXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWw6IFByZXNldE1hdGVyaWFscy5IYW5kcmFpbC5yYWlsLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbHVtbjoge1xuICAgICAgICAgICAgICAgIHR5cGU6IENvbHVtblR5cGUuQ2lyY2xlLFxuICAgICAgICAgICAgICAgIHN0ZXA6IDQwMCxcbiAgICAgICAgICAgICAgICBwYXJhbTogeyByYWRpdXM6IDQsIHdpZHRoOiA4LCBoZWlnaHQ6IDgsIH0sXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWw6IFByZXNldE1hdGVyaWFscy5IYW5kcmFpbC5jb2x1bW4sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBzdGVwUHJvcG9ydGlvbmFsOiBEZWZhdWx0U3RhaXJQYXJhbS5zdGVwUHJvcG9ydGlvbmFsLFxuICAgICAgICB3aWR0aFByb3BvcnRpb25hbDogRGVmYXVsdFN0YWlyUGFyYW0ud2lkdGhQcm9wb3J0aW9uYWwsXG4gICAgfTtcbn1cbmV4cG9ydCBjb25zdCBEZWZhdWx0Q29tcG9uZW50UGFyYW0gPSB7XG4gICAgaW5kZXg6IDAsXG4gICAgaG9yaXpvbnRhbFN0ZXA6IERlZmF1bHRTdGFpclBhcmFtLmhvcml6b250YWxTdGVwLFxuICAgIHZlcnRpY2FsU3RlcDogRGVmYXVsdFN0YWlyUGFyYW0udmVydGljYWxTdGVwLFxuICAgIHN0YXJ0V2lkdGg6IERlZmF1bHRTdGFpclBhcmFtLnN0YXJ0V2lkdGgsXG4gICAgZW5kV2lkdGg6IERlZmF1bHRTdGFpclBhcmFtLmVuZFdpZHRoLFxuICAgIG9mZnNldFdpZHRoOiAwLFxuICAgIHdpdGhPZmZzZXQ6IGZhbHNlLFxuICAgIHBsYXRmb3JtTGVuZ3RoOiAyMDAwLFxuICAgIHR5cGU6IENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpcixcbiAgICB1cHdhcmQ6IERlZmF1bHRTdGFpclBhcmFtLnVwd2FyZCxcbiAgICBwbGF0Zm9ybVRoaWNrbmVzczogRGVmYXVsdFN0YWlyUGFyYW0ucGxhdGZvcm1UaGlja25lc3MsXG4gICAgc3RlcFByb3BvcnRpb25hbDogdHJ1ZSxcbiAgICB3aWR0aFByb3BvcnRpb25hbDogdHJ1ZSxcbiAgICBwbGF0Zm9ybUxlbmd0aExvY2tlZDogZmFsc2UsXG4gICAgLy8gc3RlcFR5cGU6IFN0ZXBUeXBlLk5vcm1hbCxcbiAgICAvLyBjb3JuZXJUeXBlOiBDb3JuZXJUeXBlLlJlY3RhbmdsZSxcbn07XG5leHBvcnQgdmFyIENvbXBvbmVudERpcmVjdGlvblR5cGU7XG4oZnVuY3Rpb24gKENvbXBvbmVudERpcmVjdGlvblR5cGUpIHtcbiAgICBDb21wb25lbnREaXJlY3Rpb25UeXBlW0NvbXBvbmVudERpcmVjdGlvblR5cGVbXCJGcm9udFwiXSA9IDBdID0gXCJGcm9udFwiO1xuICAgIENvbXBvbmVudERpcmVjdGlvblR5cGVbQ29tcG9uZW50RGlyZWN0aW9uVHlwZVtcIlJpZ2h0RnJvbnRcIl0gPSAxXSA9IFwiUmlnaHRGcm9udFwiO1xuICAgIENvbXBvbmVudERpcmVjdGlvblR5cGVbQ29tcG9uZW50RGlyZWN0aW9uVHlwZVtcIlJpZ2h0XCJdID0gMl0gPSBcIlJpZ2h0XCI7XG4gICAgQ29tcG9uZW50RGlyZWN0aW9uVHlwZVtDb21wb25lbnREaXJlY3Rpb25UeXBlW1wiTGVmdFwiXSA9IDNdID0gXCJMZWZ0XCI7XG4gICAgQ29tcG9uZW50RGlyZWN0aW9uVHlwZVtDb21wb25lbnREaXJlY3Rpb25UeXBlW1wiTGVmdEZyb250XCJdID0gNF0gPSBcIkxlZnRGcm9udFwiO1xufSkoQ29tcG9uZW50RGlyZWN0aW9uVHlwZSB8fCAoQ29tcG9uZW50RGlyZWN0aW9uVHlwZSA9IHt9KSk7XG5leHBvcnQgdmFyIENpcmN1bGFyU2lkZTtcbihmdW5jdGlvbiAoQ2lyY3VsYXJTaWRlKSB7XG4gICAgQ2lyY3VsYXJTaWRlW0NpcmN1bGFyU2lkZVtcIkxlZnRcIl0gPSAwXSA9IFwiTGVmdFwiO1xuICAgIENpcmN1bGFyU2lkZVtDaXJjdWxhclNpZGVbXCJSaWdodFwiXSA9IDFdID0gXCJSaWdodFwiO1xufSkoQ2lyY3VsYXJTaWRlIHx8IChDaXJjdWxhclNpZGUgPSB7fSkpO1xuZXhwb3J0IGZ1bmN0aW9uIGlzQXhpc1ZhbGlkKGF4aXMpIHtcbiAgICByZXR1cm4gYXhpcyA9PT0gXCJYXCIgLyogQXhpcy5YICovIHx8IGF4aXMgPT09IFwiLVhcIiAvKiBBeGlzLlhNaW51cyAqLyB8fCBheGlzID09PSBcIllcIiAvKiBBeGlzLlkgKi8gfHwgYXhpcyA9PT0gXCItWVwiIC8qIEF4aXMuWU1pbnVzICovIHx8IGF4aXMgPT09IFwiWlwiIC8qIEF4aXMuWiAqLyB8fCBheGlzID09PSBcIi1aXCIgLyogQXhpcy5aTWludXMgKi87XG59XG4iLCJpbXBvcnQgeyBkcmF3U3RhaXJzVG9vbCB9IGZyb20gXCIuL2luZGV4XCI7XG5pbXBvcnQgeyBEaXJlY3Rpb25YLCBEaXJlY3Rpb25ZLCBEaXJlY3Rpb25aIH0gZnJvbSBcIi4vY29uc3RzXCI7XG5pbXBvcnQgeyBDb2x1bW5UeXBlLCBDb29yZERlbGltaXRlciwgRGVmYXVsdENvbXBvbmVudFBhcmFtLCBEZWZhdWx0U3RhaXJQYXJhbSwgRGVsaW1pdGVyLCBnZXREZWZhdWx0U3RhaXJQYXJhbSwgUmFpbFR5cGUgfSBmcm9tIFwiLi90eXBlc1wiO1xuZXhwb3J0IGZ1bmN0aW9uIGlzS0FyY2hGYWNlKGVudGl0eSkge1xuICAgIHJldHVybiAhIWVudGl0eSAmJiAoZW50aXR5LmdldFR5cGUoKSA9PT0gS0FyY2hGYWNlVHlwZS5Ob25QbGFuYXIgfHwgZW50aXR5LmdldFR5cGUoKSA9PT0gS0FyY2hGYWNlVHlwZS5QbGFuYXIpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzS0dyb3VwSW5zdGFuY2UoZW50aXR5KSB7XG4gICAgcmV0dXJuICEhZW50aXR5ICYmIGVudGl0eS5nZXRUeXBlKCkgPT09IEtFbnRpdHlUeXBlLkdyb3VwSW5zdGFuY2U7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNLRmFjZShlbnRpdHkpIHtcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS0VudGl0eVR5cGUuRmFjZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0tFZGdlKGVudGl0eSkge1xuICAgIHJldHVybiAhIWVudGl0eSAmJiBlbnRpdHkuZ2V0VHlwZSgpID09PSBLRW50aXR5VHlwZS5FZGdlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzS1ZlcnRleChlbnRpdHkpIHtcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS0VudGl0eVR5cGUuVmVydGV4O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzS0F1eGlsaWFyeUJvdW5kZWRDdXJ2ZShlbnRpdHkpIHtcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS0VudGl0eVR5cGUuQXV4aWxpYXJ5Qm91bmRlZEN1cnZlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzS0F1eGlsaWFyeUxpbmUoZW50aXR5KSB7XG4gICAgcmV0dXJuICEhZW50aXR5ICYmIGVudGl0eS5nZXRUeXBlKCkgPT09IEtFbnRpdHlUeXBlLkF1eGlsaWFyeUxpbmU7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNLUGxhbmUoZW50aXR5KSB7XG4gICAgcmV0dXJuICEhZW50aXR5ICYmIGVudGl0eS5nZXRUeXBlKCkgPT09IEtTdXJmYWNlVHlwZS5QbGFuZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0tMaW5lU2VnbWVudDNkKGVudGl0eSkge1xuICAgIHJldHVybiAhIWVudGl0eSAmJiAhIWVudGl0eS5kaXJlY3Rpb247XG59XG5leHBvcnQgZnVuY3Rpb24gaXNLQXJjM2QoZW50aXR5KSB7XG4gICAgcmV0dXJuICEhZW50aXR5ICYmICEhZW50aXR5LmNpcmNsZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnlNYXRlcmlhbChtYXRlcmlhbCkge1xuICAgIGxldCB2YWx1ZSA9ICcnO1xuICAgIGlmIChtYXRlcmlhbC5tYXRlcmlhbElkKSB7XG4gICAgICAgIHZhbHVlICs9IGBtaWQ9JHttYXRlcmlhbC5tYXRlcmlhbElkfSR7RGVsaW1pdGVyfWA7XG4gICAgfVxuICAgIGlmIChtYXRlcmlhbC5iZ2lkKSB7XG4gICAgICAgIHZhbHVlICs9IGBiaWQ9JHttYXRlcmlhbC5iZ2lkfSR7RGVsaW1pdGVyfWA7XG4gICAgfVxuICAgIGlmIChtYXRlcmlhbC5pbWdVcmwpIHtcbiAgICAgICAgdmFsdWUgKz0gYGltZz0ke21hdGVyaWFsLmltZ1VybH0ke0RlbGltaXRlcn1gO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWUuc2xpY2UoMCwgdmFsdWUubGVuZ3RoIC0gMSk7XG59XG5leHBvcnQgZnVuY3Rpb24gcGFyc2VNYXRlcmlhbCh2YWx1ZSkge1xuICAgIGNvbnN0IG1hdGVyaWFsID0ge307XG4gICAgY29uc3QgaXRlbXMgPSB2YWx1ZS5zcGxpdChEZWxpbWl0ZXIpO1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgICBjb25zdCBrZXlWYWx1ZSA9IGl0ZW0uc3BsaXQoJz0nKTtcbiAgICAgICAgaWYgKGtleVZhbHVlLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgc3dpdGNoIChrZXlWYWx1ZVswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ21pZCc6XG4gICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsLm1hdGVyaWFsSWQgPSBrZXlWYWx1ZVsxXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnYmlkJzpcbiAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWwuYmdpZCA9IGtleVZhbHVlWzFdO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdpbWcnOlxuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbC5pbWdVcmwgPSBrZXlWYWx1ZVsxXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGl0ZW1zLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gbWF0ZXJpYWw7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeVN0YWlyUGFyYW0ocGFyYW0pIHtcbiAgICBsZXQgdmFsdWUgPSAnJztcbiAgICB2YWx1ZSArPSBgYT0ke3BhcmFtLmhvcml6b250YWxTdGVwfSR7RGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYGI9JHtwYXJhbS52ZXJ0aWNhbFN0ZXB9JHtEZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgYz0ke3BhcmFtLnN0YXJ0V2lkdGh9JHtEZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgZD0ke3BhcmFtLmVuZFdpZHRofSR7RGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYGU9JHtwYXJhbS51cHdhcmQgPyAxIDogMH0ke0RlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGBmPSR7cGFyYW0ucGxhdGZvcm1UaGlja25lc3N9YDtcbiAgICBpZiAocGFyYW0uaGFuZHJhaWwuc3VwcG9ydCkge1xuICAgICAgICBjb25zdCB7IGhhbmRyYWlsOiB7IGhlaWdodCwgcmFpbCwgY29sdW1uIH0gfSA9IHBhcmFtO1xuICAgICAgICB2YWx1ZSArPSBgZz0ke2hlaWdodH0ke0RlbGltaXRlcn1gO1xuICAgICAgICB2YWx1ZSArPSBgaD0ke3JhaWwudHlwZX0ke0RlbGltaXRlcn1gO1xuICAgICAgICBpZiAocmFpbC50eXBlID09PSBSYWlsVHlwZS5DaXJjbGUgJiYgcmFpbC5wYXJhbS5yYWRpdXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFsdWUgKz0gYGk9JHtyYWlsLnBhcmFtLnJhZGl1c30ke0RlbGltaXRlcn1gO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHJhaWwudHlwZSA9PT0gUmFpbFR5cGUuUmVjdCkge1xuICAgICAgICAgICAgaWYgKHJhaWwucGFyYW0ud2lkdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHZhbHVlICs9IGBqPSR7cmFpbC5wYXJhbS53aWR0aH0ke0RlbGltaXRlcn1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJhaWwucGFyYW0uaGVpZ2h0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSArPSBgaz0ke3JhaWwucGFyYW0uaGVpZ2h0fSR7RGVsaW1pdGVyfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFsdWUgKz0gYGw9JHtjb2x1bW4udHlwZX0ke0RlbGltaXRlcn1gO1xuICAgICAgICB2YWx1ZSArPSBgbT0ke2NvbHVtbi5zdGVwfSR7RGVsaW1pdGVyfWA7XG4gICAgICAgIGlmIChjb2x1bW4udHlwZSA9PT0gQ29sdW1uVHlwZS5DaXJjbGUgJiYgY29sdW1uLnBhcmFtLnJhZGl1cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YWx1ZSArPSBgbj0ke2NvbHVtbi5wYXJhbS5yYWRpdXN9JHtEZWxpbWl0ZXJ9YDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb2x1bW4udHlwZSA9PT0gQ29sdW1uVHlwZS5SZWN0KSB7XG4gICAgICAgICAgICBpZiAoY29sdW1uLnBhcmFtLndpZHRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSArPSBgbz0ke2NvbHVtbi5wYXJhbS53aWR0aH0ke0RlbGltaXRlcn1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbHVtbi5wYXJhbS5oZWlnaHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHZhbHVlICs9IGBwPSR7Y29sdW1uLnBhcmFtLmhlaWdodH0ke0RlbGltaXRlcn1gO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZS5zbGljZSgwLCB2YWx1ZS5sZW5ndGggLSAxKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVN0YWlyUGFyYW0odmFsdWUpIHtcbiAgICBjb25zdCBwYXJhbSA9IGdldERlZmF1bHRTdGFpclBhcmFtKCk7XG4gICAgY29uc3QgaXRlbXMgPSB2YWx1ZS5zcGxpdChEZWxpbWl0ZXIpO1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgICBjb25zdCBrZXlWYWx1ZSA9IGl0ZW0uc3BsaXQoJz0nKTtcbiAgICAgICAgaWYgKGtleVZhbHVlLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgc3dpdGNoIChrZXlWYWx1ZVswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2EnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5ob3Jpem9udGFsU3RlcCA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnYic6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnZlcnRpY2FsU3RlcCA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnYyc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnN0YXJ0V2lkdGggPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2QnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5lbmRXaWR0aCA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZSc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnVwd2FyZCA9IGtleVZhbHVlWzFdID09PSAnMScgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2YnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5wbGF0Zm9ybVRoaWNrbmVzcyA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZyc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmhhbmRyYWlsLmhlaWdodCA9IHBhcnNlRmxvYXQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdoJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uaGFuZHJhaWwucmFpbC50eXBlID0gcGFyc2VGbG9hdChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2knOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5oYW5kcmFpbC5yYWlsLnBhcmFtLnJhZGl1cyA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnaic6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmhhbmRyYWlsLnJhaWwucGFyYW0ud2lkdGggPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2snOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5oYW5kcmFpbC5yYWlsLnBhcmFtLmhlaWdodCA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbCc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmhhbmRyYWlsLmNvbHVtbi50eXBlID0gcGFyc2VGbG9hdChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ20nOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5oYW5kcmFpbC5jb2x1bW4uc3RlcCA9IHBhcnNlRmxvYXQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICduJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uaGFuZHJhaWwuY29sdW1uLnBhcmFtLnJhZGl1cyA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbyc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmhhbmRyYWlsLmNvbHVtbi5wYXJhbS53aWR0aCA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncCc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmhhbmRyYWlsLmNvbHVtbi5wYXJhbS5oZWlnaHQgPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHBhcmFtLnN0ZXBQcm9wb3J0aW9uYWwgPSBEZWZhdWx0U3RhaXJQYXJhbS5zdGVwUHJvcG9ydGlvbmFsO1xuICAgIHBhcmFtLndpZHRoUHJvcG9ydGlvbmFsID0gRGVmYXVsdFN0YWlyUGFyYW0ud2lkdGhQcm9wb3J0aW9uYWw7XG4gICAgcmV0dXJuIHBhcmFtO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeUNvbXBvbmVudFBhcmFtKHBhcmFtKSB7XG4gICAgbGV0IHZhbHVlID0gJyc7XG4gICAgdmFsdWUgKz0gYGE9JHtwYXJhbS5pbmRleH0ke0RlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGBiPSR7cGFyYW0uaG9yaXpvbnRhbFN0ZXB9JHtEZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgYz0ke3BhcmFtLnZlcnRpY2FsU3RlcH0ke0RlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGBkPSR7cGFyYW0uc3RhcnRXaWR0aH0ke0RlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGBlPSR7cGFyYW0uZW5kV2lkdGh9JHtEZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgZj0ke3BhcmFtLm9mZnNldFdpZHRofSR7RGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYGc9JHtwYXJhbS5wbGF0Zm9ybUxlbmd0aH0ke0RlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGBoPSR7cGFyYW0udHlwZX0ke0RlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGBpPSR7cGFyYW0udXB3YXJkID8gMSA6IDB9JHtEZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgaj0ke3BhcmFtLnBsYXRmb3JtVGhpY2tuZXNzfWA7XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQ29tcG9uZW50UGFyYW0odmFsdWUpIHtcbiAgICBjb25zdCBwYXJhbSA9IE9iamVjdC5hc3NpZ24oe30sIERlZmF1bHRDb21wb25lbnRQYXJhbSk7XG4gICAgY29uc3QgaXRlbXMgPSB2YWx1ZS5zcGxpdChEZWxpbWl0ZXIpO1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgICBjb25zdCBrZXlWYWx1ZSA9IGl0ZW0uc3BsaXQoJz0nKTtcbiAgICAgICAgaWYgKGtleVZhbHVlLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgc3dpdGNoIChrZXlWYWx1ZVswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2EnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5pbmRleCA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnYic6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmhvcml6b250YWxTdGVwID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdjJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0udmVydGljYWxTdGVwID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdkJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uc3RhcnRXaWR0aCA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZSc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmVuZFdpZHRoID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdmJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0ub2Zmc2V0V2lkdGggPSBwYXJzZUZsb2F0KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZyc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnBsYXRmb3JtTGVuZ3RoID0gcGFyc2VGbG9hdChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2gnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS50eXBlID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdpJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0udXB3YXJkID0ga2V5VmFsdWVbMV0gPT09ICcxJyA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnaic6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnBsYXRmb3JtVGhpY2tuZXNzID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBwYXJhbS5zdGVwUHJvcG9ydGlvbmFsID0gRGVmYXVsdENvbXBvbmVudFBhcmFtLnN0ZXBQcm9wb3J0aW9uYWw7XG4gICAgcGFyYW0ud2lkdGhQcm9wb3J0aW9uYWwgPSBEZWZhdWx0Q29tcG9uZW50UGFyYW0ud2lkdGhQcm9wb3J0aW9uYWw7XG4gICAgcGFyYW0ucGxhdGZvcm1MZW5ndGhMb2NrZWQgPSB0cnVlO1xuICAgIHBhcmFtLm1vZGVsRWRpdGluZyA9IHRydWU7XG4gICAgcGFyYW0ud2l0aE9mZnNldCA9ICFpc0VxdWFsKHBhcmFtLm9mZnNldFdpZHRoLCAwKTtcbiAgICByZXR1cm4gcGFyYW07XG59XG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5U3RhcnRFbmQoc3RhcnQsIGVuZCkge1xuICAgIGxldCB2YWx1ZSA9ICcnO1xuICAgIHZhbHVlICs9IGAke3N0YXJ0Lnh9JHtDb29yZERlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGAke3N0YXJ0Lnl9JHtDb29yZERlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGAke3N0YXJ0Lnp9JHtEZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgJHtlbmQueH0ke0Nvb3JkRGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYCR7ZW5kLnl9JHtDb29yZERlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGAke2VuZC56fWA7XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTGluZVNlZzNkKHZhbHVlKSB7XG4gICAgY29uc3QgaXRlbXMgPSB2YWx1ZS5zcGxpdChEZWxpbWl0ZXIpO1xuICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgY29uc3Qgc3RhcnRLZXlWYWx1ZSA9IGl0ZW1zWzBdLnNwbGl0KENvb3JkRGVsaW1pdGVyKTtcbiAgICAgICAgY29uc3QgZW5kS2V5VmFsdWUgPSBpdGVtc1sxXS5zcGxpdChDb29yZERlbGltaXRlcik7XG4gICAgICAgIGlmIChzdGFydEtleVZhbHVlLmxlbmd0aCA9PT0gMyAmJiBlbmRLZXlWYWx1ZS5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKHBhcnNlRmxvYXQoc3RhcnRLZXlWYWx1ZVswXSksIHBhcnNlRmxvYXQoc3RhcnRLZXlWYWx1ZVsxXSksIHBhcnNlRmxvYXQoc3RhcnRLZXlWYWx1ZVsyXSkpO1xuICAgICAgICAgICAgY29uc3QgZW5kID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKHBhcnNlRmxvYXQoZW5kS2V5VmFsdWVbMF0pLCBwYXJzZUZsb2F0KGVuZEtleVZhbHVlWzFdKSwgcGFyc2VGbG9hdChlbmRLZXlWYWx1ZVsyXSkpO1xuICAgICAgICAgICAgcmV0dXJuIHsgc3RhcnQsIGVuZCB9O1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlU3RhcnRFbmQodmFsdWUpIHtcbiAgICBjb25zdCBpdGVtcyA9IHZhbHVlLnNwbGl0KERlbGltaXRlcik7XG4gICAgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gMikge1xuICAgICAgICBjb25zdCBzdGFydEtleVZhbHVlID0gaXRlbXNbMF0uc3BsaXQoQ29vcmREZWxpbWl0ZXIpO1xuICAgICAgICBjb25zdCBlbmRLZXlWYWx1ZSA9IGl0ZW1zWzFdLnNwbGl0KENvb3JkRGVsaW1pdGVyKTtcbiAgICAgICAgaWYgKHN0YXJ0S2V5VmFsdWUubGVuZ3RoID09PSAzICYmIGVuZEtleVZhbHVlLmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QocGFyc2VGbG9hdChzdGFydEtleVZhbHVlWzBdKSwgcGFyc2VGbG9hdChzdGFydEtleVZhbHVlWzFdKSwgMCk7XG4gICAgICAgICAgICBjb25zdCBlbmQgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QocGFyc2VGbG9hdChlbmRLZXlWYWx1ZVswXSksIHBhcnNlRmxvYXQoZW5kS2V5VmFsdWVbMV0pLCAwKTtcbiAgICAgICAgICAgIHJldHVybiB7IHN0YXJ0LCBlbmQsIHN0YXJ0SGVpZ2h0OiBwYXJzZUZsb2F0KHN0YXJ0S2V5VmFsdWVbMl0pLCBlbmRIZWlnaHQ6IHBhcnNlRmxvYXQoZW5kS2V5VmFsdWVbMl0pIH07XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5UG9pbnQzZChwb2ludCkge1xuICAgIGxldCB2YWx1ZSA9ICcnO1xuICAgIHZhbHVlICs9IGAke3BvaW50Lnh9JHtDb29yZERlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGAke3BvaW50Lnl9JHtDb29yZERlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGAke3BvaW50Lnp9YDtcbiAgICByZXR1cm4gdmFsdWU7XG59XG5leHBvcnQgZnVuY3Rpb24gcGFyc2VWZWN0b3IzZCh2YWx1ZSkge1xuICAgIGNvbnN0IGl0ZW1zID0gdmFsdWUuc3BsaXQoQ29vcmREZWxpbWl0ZXIpO1xuICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgY29uc3QgdmVjdG9yID0gR2VvbUxpYi5jcmVhdGVWZWN0b3IzZChwYXJzZUZsb2F0KGl0ZW1zWzBdKSwgcGFyc2VGbG9hdChpdGVtc1sxXSksIHBhcnNlRmxvYXQoaXRlbXNbMl0pKTtcbiAgICAgICAgcmV0dXJuIHZlY3RvcjtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5QmFzZUNvbXBvbmVudChiYXNlU2VnbWVudCwgbGluZTNkSW5kZXgpIHtcbiAgICBsZXQgdmFsdWUgPSAnJztcbiAgICB2YWx1ZSArPSBgJHtiYXNlU2VnbWVudC5wYXJhbS5pbmRleH1gO1xuICAgIGlmIChsaW5lM2RJbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbHVlICs9IGAke0Nvb3JkRGVsaW1pdGVyfSR7bGluZTNkSW5kZXh9YDtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQmFzZUNvbXBvbmVudCh2YWx1ZSkge1xuICAgIGNvbnN0IGl0ZW1zID0gdmFsdWUuc3BsaXQoQ29vcmREZWxpbWl0ZXIpO1xuICAgIGlmICh2YWx1ZS5sZW5ndGggJiYgaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBiYXNlQ29tcG9uZW50SW5kZXggPSBwYXJzZUludChpdGVtc1swXSk7XG4gICAgICAgIGxldCBsaW5lM2RJbmRleDtcbiAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgbGluZTNkSW5kZXggPSBwYXJzZUludChpdGVtc1sxXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgY29tcG9uZW50SW5kZXg6IGJhc2VDb21wb25lbnRJbmRleCwgbGluZTNkSW5kZXggfTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gaXNFcXVhbChhLCBiLCB0b2xlcmFuY2UgPSAxKSB7XG4gICAgcmV0dXJuIE1hdGguYWJzKGEgLSBiKSA8PSB0b2xlcmFuY2U7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29vcmRpbmF0ZShub3JtYWwpIHtcbiAgICBsZXQgZHggPSBEaXJlY3Rpb25YO1xuICAgIGxldCBkeSA9IERpcmVjdGlvblo7XG4gICAgbGV0IGR6ID0gbm9ybWFsLm5vcm1hbGl6ZWQoKTtcbiAgICBpZiAoRGlyZWN0aW9uWi5pc1BhcmFsbGVsKGR6KSkge1xuICAgICAgICBkeCA9IERpcmVjdGlvblkuY3Jvc3MoZHopLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgZHkgPSBkei5jcm9zcyhkeCkubm9ybWFsaXplZCgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZHggPSBkeS5jcm9zcyhkeikubm9ybWFsaXplZCgpO1xuICAgICAgICBkeSA9IGR6LmNyb3NzKGR4KS5ub3JtYWxpemVkKCk7XG4gICAgfVxuICAgIHJldHVybiB7IGR4LCBkeSwgZHogfTtcbn1cbmxldCBpc0luT3BlcmF0aW9uID0gZmFsc2U7XG5leHBvcnQgZnVuY3Rpb24gc3RhcnRPcGVyYXRpb24oKSB7XG4gICAgaXNJbk9wZXJhdGlvbiA9IHRydWU7XG4gICAgYXBwLmdldEFjdGl2ZURlc2lnbigpLnN0YXJ0T3BlcmF0aW9uKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gY29tbWl0T3BlcmF0aW9uKCkge1xuICAgIGFwcC5nZXRBY3RpdmVEZXNpZ24oKS5jb21taXRPcGVyYXRpb24oKTtcbiAgICBpc0luT3BlcmF0aW9uID0gZmFsc2U7XG59XG5leHBvcnQgZnVuY3Rpb24gYWJvcnRPcGVyYXRpb24oKSB7XG4gICAgZGVidWdnZXI7XG4gICAgYXBwLmdldEFjdGl2ZURlc2lnbigpLmFib3J0T3BlcmF0aW9uKCk7XG4gICAgaXNJbk9wZXJhdGlvbiA9IGZhbHNlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIG9uTW9kZWxDaGFuZ2VkKGNoYW5nZXMpIHtcbiAgICBjb25zdCBtb2RpZmllZCA9IGNoYW5nZXMubW9kaWZpZWQ7XG4gICAgY29uc3QgZGVsZXRlZCA9IGNoYW5nZXMuZGVsZXRlZDtcbiAgICBjb25zdCBhZGRlZCA9IGNoYW5nZXMuYWRkZWQ7XG4gICAgY29uc3QgZWRpdE1vZGVsID0gZHJhd1N0YWlyc1Rvb2wuZ2V0RWRpdE1vZGVsKCk7XG4gICAgaWYgKCFpc0luT3BlcmF0aW9uICYmICgoZGVsZXRlZCA9PT0gbnVsbCB8fCBkZWxldGVkID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkZWxldGVkLmxlbmd0aCkgfHwgKGFkZGVkID09PSBudWxsIHx8IGFkZGVkID09PSB2b2lkIDAgPyB2b2lkIDAgOiBhZGRlZC5sZW5ndGgpIHx8IChlZGl0TW9kZWwgJiYgKG1vZGlmaWVkID09PSBudWxsIHx8IG1vZGlmaWVkID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtb2RpZmllZC5zb21lKGdyb3VwID0+IHtcbiAgICAgICAgcmV0dXJuIGlzR3JvdXBEZWZQYXJ0T2ZFZGl0TW9kZWwoZWRpdE1vZGVsLCBncm91cCk7XG4gICAgfSkpKSkpIHtcbiAgICAgICAgLy8gaWYgKGRlbGV0ZWQuc29tZShkZWxldGVHcm91cCA9PiBlZGl0TW9kZWwucGFyZW50LmRlZmluaXRpb25LZXkgPT09IGRlbGV0ZUdyb3VwLmdldEtleSgpKSkge1xuICAgICAgICBkcmF3U3RhaXJzVG9vbC5jbGVhckVkaXRNb2RlbCgpO1xuICAgICAgICAvLyB9XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGlzUGFydE9mRWRpdE1vZGVsKGVkaXRNb2RlbCwgZ3JvdXBJbnN0YW5jZSkge1xuICAgIHZhciBfYSwgX2IsIF9jO1xuICAgIGNvbnN0IGdyb3VwSW5zdGFuY2VLZXkgPSBncm91cEluc3RhbmNlLmdldEtleSgpO1xuICAgIHJldHVybiBlZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlS2V5ID09PSBncm91cEluc3RhbmNlS2V5IHx8XG4gICAgICAgIFsuLi5lZGl0TW9kZWwuc3RhaXJzLnZhbHVlcygpXS5zb21lKGluc3RhbmNlRGF0YSA9PiBpbnN0YW5jZURhdGEuaW5zdGFuY2VLZXkgPT09IGdyb3VwSW5zdGFuY2VLZXkpIHx8XG4gICAgICAgIFsuLi5lZGl0TW9kZWwucGxhdGZvcm1zLnZhbHVlcygpXS5zb21lKGluc3RhbmNlRGF0YSA9PiBpbnN0YW5jZURhdGEuaW5zdGFuY2VLZXkgPT09IGdyb3VwSW5zdGFuY2VLZXkpIHx8XG4gICAgICAgICgoX2EgPSBlZGl0TW9kZWwuaGFuZHJhaWwpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5oYW5kcmFpbEluc3RhbmNlLmluc3RhbmNlS2V5KSA9PT0gZ3JvdXBJbnN0YW5jZUtleSB8fFxuICAgICAgICBbLi4uKCgoX2IgPSBlZGl0TW9kZWwuaGFuZHJhaWwpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5yYWlsSW5zdGFuY2VzKSB8fCBbXSkudmFsdWVzKCldLnNvbWUoaW5zdGFuY2VEYXRhID0+IGluc3RhbmNlRGF0YS5pbnN0YW5jZUtleSA9PT0gZ3JvdXBJbnN0YW5jZUtleSkgfHxcbiAgICAgICAgWy4uLigoKF9jID0gZWRpdE1vZGVsLmhhbmRyYWlsKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuY29sdW1uSW5zdGFuY2VzKSB8fCBbXSkudmFsdWVzKCldLnNvbWUoaW5zdGFuY2VEYXRhID0+IGluc3RhbmNlRGF0YS5pbnN0YW5jZUtleSA9PT0gZ3JvdXBJbnN0YW5jZUtleSk7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNHcm91cERlZlBhcnRPZkVkaXRNb2RlbChlZGl0TW9kZWwsIGdyb3VwRGVmaW5pdGlvbikge1xuICAgIHZhciBfYSwgX2IsIF9jO1xuICAgIGNvbnN0IGdyb3VwRGVmaW5pdGlvbktleSA9IGdyb3VwRGVmaW5pdGlvbi5nZXRLZXkoKTtcbiAgICByZXR1cm4gZWRpdE1vZGVsLnBhcmVudC5kZWZpbml0aW9uS2V5ID09PSBncm91cERlZmluaXRpb25LZXkgfHxcbiAgICAgICAgWy4uLmVkaXRNb2RlbC5zdGFpcnMudmFsdWVzKCldLnNvbWUoaW5zdGFuY2VEYXRhID0+IGluc3RhbmNlRGF0YS5kZWZpbml0aW9uS2V5ID09PSBncm91cERlZmluaXRpb25LZXkpIHx8XG4gICAgICAgIFsuLi5lZGl0TW9kZWwucGxhdGZvcm1zLnZhbHVlcygpXS5zb21lKGluc3RhbmNlRGF0YSA9PiBpbnN0YW5jZURhdGEuZGVmaW5pdGlvbktleSA9PT0gZ3JvdXBEZWZpbml0aW9uS2V5KSB8fFxuICAgICAgICAoKF9hID0gZWRpdE1vZGVsLmhhbmRyYWlsKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaGFuZHJhaWxJbnN0YW5jZS5kZWZpbml0aW9uS2V5KSA9PT0gZ3JvdXBEZWZpbml0aW9uS2V5IHx8XG4gICAgICAgIFsuLi4oKChfYiA9IGVkaXRNb2RlbC5oYW5kcmFpbCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnJhaWxJbnN0YW5jZXMpIHx8IFtdKS52YWx1ZXMoKV0uc29tZShpbnN0YW5jZURhdGEgPT4gaW5zdGFuY2VEYXRhLmRlZmluaXRpb25LZXkgPT09IGdyb3VwRGVmaW5pdGlvbktleSkgfHxcbiAgICAgICAgWy4uLigoKF9jID0gZWRpdE1vZGVsLmhhbmRyYWlsKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuY29sdW1uSW5zdGFuY2VzKSB8fCBbXSkudmFsdWVzKCldLnNvbWUoaW5zdGFuY2VEYXRhID0+IGluc3RhbmNlRGF0YS5kZWZpbml0aW9uS2V5ID09PSBncm91cERlZmluaXRpb25LZXkpO1xufVxuIiwiZXhwb3J0IHZhciBNZXNzYWdlVHlwZTtcbihmdW5jdGlvbiAoTWVzc2FnZVR5cGUpIHtcbiAgICBNZXNzYWdlVHlwZVtcIkRyYXdTdGFpclZpZXdNb3VudGVkXCJdID0gXCJkcmF3U3RhaXJWaWV3TW91bnRlZFwiO1xuICAgIE1lc3NhZ2VUeXBlW1wiUHJvcGVydGllc1Zpc2libGVcIl0gPSBcInByb3BlcnRpZXNWaXNpYmxlXCI7XG4gICAgTWVzc2FnZVR5cGVbXCJEcmF3U3RhaXJNb2RlbFNldHRsZWRcIl0gPSBcImRyYXdTdGFpck1vZGVsU2V0dGxlZFwiO1xuICAgIE1lc3NhZ2VUeXBlW1wiU3RhaXJQYXJhbUNoYW5nZWRCeUlucHV0XCJdID0gXCJzdGFpclBhcmFtQ2hhbmdlZEJ5SW5wdXRcIjtcbiAgICBNZXNzYWdlVHlwZVtcIlN0YWlyUGFyYW1DaGFuZ2VkQnlEcmF3XCJdID0gXCJzdGFpclBhcmFtQ2hhbmdlZEJ5RHJhd1wiO1xuICAgIE1lc3NhZ2VUeXBlW1wiUGFyYW1DaGFuZ2VkQnlJbnB1dFwiXSA9IFwicGFyYW1DaGFuZ2VkQnlJbnB1dFwiO1xuICAgIE1lc3NhZ2VUeXBlW1wiUGFyYW1DaGFuZ2VkQnlEcmF3XCJdID0gXCJwYXJhbUNoYW5nZWRCeURyYXdcIjtcbiAgICBNZXNzYWdlVHlwZVtcIkNvbXBvbmVudEFkZGVkXCJdID0gXCJjb21wb25lbnRBZGRlZFwiO1xuICAgIE1lc3NhZ2VUeXBlW1wiUmVtb3ZlQ29tcG9uZW50XCJdID0gXCJyZW1vdmVDb21wb25lbnRcIjtcbiAgICBNZXNzYWdlVHlwZVtcIkZvY3VzQ29tcG9uZW50SW5kZXhcIl0gPSBcImZvY3VzQ29tcG9uZW50SW5kZXhcIjtcbiAgICBNZXNzYWdlVHlwZVtcIkZvY3VzQ29tcG9uZW50SW5kZXhCeURyYXdcIl0gPSBcImZvY3VzQ29tcG9uZW50SW5kZXhCeURyYXdcIjtcbiAgICBNZXNzYWdlVHlwZVtcIk1hdGVyaWFsUmVwbGFjZUNsaWNrXCJdID0gXCJtYXRlcmlhbFJlcGxhY2VDbGlja1wiO1xuICAgIE1lc3NhZ2VUeXBlW1wiQWN0aXZhdGVEcmF3U3RhaXJzVG9vbFwiXSA9IFwiYWN0aXZhdGVEcmF3U3RhaXJzVG9vbFwiO1xuICAgIE1lc3NhZ2VUeXBlW1wiRGVBY3RpdmF0ZURyYXdTdGFpcnNUb29sXCJdID0gXCJkZUFjdGl2YXRlRHJhd1N0YWlyc1Rvb2xcIjtcbiAgICBNZXNzYWdlVHlwZVtcIkxlYXZlRHJhd1N0YWlyc1Rvb2xcIl0gPSBcImxlYXZlRHJhd1N0YWlyc1Rvb2xcIjtcbn0pKE1lc3NhZ2VUeXBlIHx8IChNZXNzYWdlVHlwZSA9IHt9KSk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL21haW4vbWFpbi50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==