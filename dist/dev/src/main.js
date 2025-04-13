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
            else if (data.type === _types__WEBPACK_IMPORTED_MODULE_2__.MessageType.MaterialReplaceClick) {
                // if (activatedCustomTool === drawStairsTool) {
                _tools_DrawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool.onMaterialReplaceClick(data.changeParam, data.index);
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
            _tools_DrawStairsTool_index__WEBPACK_IMPORTED_MODULE_0__.drawStairsTool.clearTempShapes();
            if (!editPath.length || !editModel || !(0,_tools_DrawStairsTool_utils__WEBPACK_IMPORTED_MODULE_1__.isPartOfEditModel)(editModel, editPath[editPath.length - 1])) {
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
        onModelChanged: _tools_DrawStairsTool_utils__WEBPACK_IMPORTED_MODULE_1__.onModelChanged,
    });
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
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/main/tools/DrawStairsTool/types.ts");

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
    let startWidth = _types__WEBPACK_IMPORTED_MODULE_0__.DefaultStairParam.startWidth * (type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform ? 4 : 1);
    let endWidth = _types__WEBPACK_IMPORTED_MODULE_0__.DefaultStairParam.endWidth * (type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform ? 4 : 1);
    if (baseSegment) {
        const { param: { endWidth: baseSegmentEndWidth, type: baseSegmentType } } = baseSegment;
        if (type === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform) {
            if (baseSegmentType === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentType.Platform) {
                startWidth = baseSegmentEndWidth;
                endWidth = baseSegmentEndWidth;
            }
            else {
                startWidth = 4 * baseSegmentEndWidth;
                endWidth = 4 * baseSegmentEndWidth;
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
        this.stairParam = Object.assign({}, _types__WEBPACK_IMPORTED_MODULE_0__.DefaultStairParam);
        this.onMaterialReplaceItemClick = (changeParamType, index, isDelete) => {
            const that = this;
            return (materialId = '', bgid = '') => __awaiter(this, void 0, void 0, function* () {
                const loadMaterialRes = yield design.loadMaterial(materialId);
                if (!loadMaterialRes.isSuccess) {
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
                            pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.ParamChangedByDraw, componentParam: Object.assign({}, theSegment.param), stairParam: stairParamShouldChangeKey ? this.stairParam : undefined }, '*');
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
                                    pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.ParamChangedByDraw, componentParam: Object.assign({}, theSegment.param), stairParam: stairParamShouldChangeKey ? this.stairParam : undefined }, '*');
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
                        pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.StairParamChangedByDraw, stairParam: that.stairParam, componentParams: this.segments.map(seg => (Object.assign({}, seg.param))) }, '*');
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
                            pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.StairParamChangedByDraw, stairParam: that.stairParam, componentParams: this.segments.map(seg => (Object.assign({}, seg.param))) }, '*');
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
                        pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.StairParamChangedByDraw, stairParam: that.stairParam }, '*');
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
                            pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.StairParamChangedByDraw, stairParam: that.stairParam }, '*');
                        }
                        else {
                            (0,_utils__WEBPACK_IMPORTED_MODULE_3__.abortOperation)();
                        }
                    }
                }
            });
        };
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
        pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.DrawStairModelSettled, componentParams: [firstSegment.param], stairParam: this.stairParam, newStair: true, isDrawing: true }, '*');
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
                    if (this.focusedComponentIndex !== lastSegment.param.index) {
                        pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.FocusComponentIndexByDraw, focusedComponentIndex: lastSegment.param.index }, '*');
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
                    (0,_main_main__WEBPACK_IMPORTED_MODULE_5__.deActivateDrawStairsTool)();
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
                            pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.ParamChangedByDraw, componentParam: Object.assign({}, lastSegment.param) }, '*');
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
                        pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.DrawStairModelSettled, componentParams: this.segments.map(seg => (Object.assign({}, seg.param))), stairParam: this.stairParam, isDrawing: this.drawing, focusedComponentIndex: this.focusedComponentIndex.toString() }, '*');
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
        app.getApplicationUI().toggleMaterialReplacePanel(true, this.onMaterialReplaceItemClick(changeParamType, index));
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
                        pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.StairParamChangedByDraw, stairParam: this.stairParam, componentParams: this.segments.map(seg => (Object.assign({}, seg.param))) }, '*');
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
                            pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.StairParamChangedByDraw, stairParam: this.stairParam, componentParams: this.segments.map(seg => (Object.assign({}, seg.param))) }, '*');
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
                            pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.StairParamChangedByDraw, stairParam: this.stairParam }, '*');
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
                        pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.StairParamChangedByDraw, stairParam: this.stairParam }, '*');
                    }
                    else {
                        (0,_utils__WEBPACK_IMPORTED_MODULE_3__.abortOperation)();
                        pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.StairParamChangedByDraw, stairParam: this.stairParam }, '*');
                    }
                    selection.add([parentInstance]);
                }
            }
            else if (!stairParam.stairMaterial && changeParamTypes.length === 0 && changeParamTypes[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.StairMaterial) {
                yield this.onMaterialReplaceItemClick(changeParamTypes[0], undefined, true)();
            }
            else if (!stairParam.platformMaterial && changeParamTypes.length === 0 && changeParamTypes[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.PlatformLength) {
                yield this.onMaterialReplaceItemClick(changeParamTypes[0], undefined, true)();
            }
            else if (!stairParam.handrail.rail.material && changeParamTypes.length === 0 && changeParamTypes[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.HandrailRailMaterial) {
                yield this.onMaterialReplaceItemClick(changeParamTypes[0], undefined, true)();
            }
            else if (!stairParam.handrail.column.material && changeParamTypes.length === 0 && changeParamTypes[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.HandrailColumnMaterial) {
                yield this.onMaterialReplaceItemClick(changeParamTypes[0], undefined, true)();
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
                if (changeParamTypes.length === 0 && changeParamTypes[0] === _types__WEBPACK_IMPORTED_MODULE_0__.ComponentParamType.ComponentMaterial && !componentParam.material) {
                    this.onMaterialReplaceItemClick(changeParamTypes[0], componentParam.index, true);
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
                                pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.ParamChangedByDraw, componentParam: Object.assign({}, theSegment.param), stairParam: stairParamShouldChange ? this.stairParam : undefined }, '*');
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
                                pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.ParamChangedByDraw, componentParam: Object.assign({}, theSegment.param), stairParam: stairParamShouldChange ? this.stairParam : undefined }, '*');
                            }
                            else {
                                (0,_utils__WEBPACK_IMPORTED_MODULE_3__.abortOperation)();
                                theSegment.param = oldParam;
                                pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.ParamChangedByDraw, componentParam: Object.assign({}, theSegment.param) }, '*');
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
                            pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.DrawStairModelSettled, componentParams: this.segments.map(seg => (Object.assign({}, seg.param))), stairParam: this.stairParam, isDrawing: false }, '*');
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
            pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.PropertiesVisible, propertiesVisible: true }, '*');
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
                    pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.DrawStairModelSettled, componentParams: this.segments.map(seg => (Object.assign({}, seg.param))), stairParam: this.stairParam, isDrawing: false }, '*');
                }
            }
            else {
                pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.PropertiesVisible, propertiesVisible: false }, '*');
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
        pluginUI.postMessage({ type: _main_types__WEBPACK_IMPORTED_MODULE_6__.MessageType.DrawStairModelSettled, isDrawing: false }, '*');
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
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ "./src/main/tools/DrawStairsTool/consts.ts");
/* harmony import */ var _tempMeshUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tempMeshUtils */ "./src/main/tools/DrawStairsTool/tempMeshUtils.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "./src/main/tools/DrawStairsTool/types.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./src/main/tools/DrawStairsTool/utils.ts");
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
                                curColumnActualHeight = (curHorStepDistance - lastFrontOffsetLength) / (prevTotalStepLength - lastFrontOffsetLength) * prevTotalVerStepLength - curVerStepDistance + stepHeight + height;
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
                            if (spToEpDir.dot(line3dDir) >= 0) {
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
    Stair: { bgId: '3FO4LHERBPPY', materialId: '5972e993aa01f3585f51decb' },
    // Stair: { bgId: '3FO4ATKECLKI', materialId: '6168f454cdd25e00017d75d0' },
    Platform: { bgId: '3FO44T7MYFA5', materialId: '64562afd6fbc3b0001a3251c' },
    Handrail: {
        rail: { bgId: '3FO4LHERE7NP', materialId: '5972e8d7aa01f3585f51de97' },
        column: { bgId: '3FO4LHERE7NP', materialId: '5972e8d7aa01f3585f51de97' },
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
            param: { radius: 16, width: 40, height: 30, },
            material: PresetMaterials.Handrail.rail,
        },
        column: {
            type: ColumnType.Circle,
            step: 500,
            param: { radius: 8, width: 12, height: 12, },
            material: PresetMaterials.Handrail.column,
        },
    },
    stepProportional: true,
    widthProportional: true,
};
function getDefaultStairParam() {
    return {
        horizontalStep: 250,
        verticalStep: 250,
        startWidth: 1000,
        endWidth: 1000,
        upward: true,
        platformThickness: 200,
        stairMaterial: PresetMaterials.Stair,
        platformMaterial: PresetMaterials.Platform,
        handrail: {
            support: true,
            height: 500,
            rail: {
                type: RailType.Circle,
                param: { radius: 20, width: 60, height: 30, },
                material: PresetMaterials.Handrail.rail,
            },
            column: {
                type: ColumnType.Circle,
                step: 500,
                param: { radius: 8, width: 16, height: 16, },
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

/***/ "./src/main/tools/DrawStairsTool/utils.ts":
/*!************************************************!*\
  !*** ./src/main/tools/DrawStairsTool/utils.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   abortOperation: () => (/* binding */ abortOperation),
/* harmony export */   commitOperation: () => (/* binding */ commitOperation),
/* harmony export */   getCoordinate: () => (/* binding */ getCoordinate),
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
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/main/tools/DrawStairsTool/index.ts");
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./consts */ "./src/main/tools/DrawStairsTool/consts.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "./src/main/tools/DrawStairsTool/types.ts");



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
    app.getActiveDesign().abortOperation();
    isInOperation = false;
}
function onModelChanged(changes) {
    const deleted = changes.deleted;
    const added = changes.added;
    // const editModel = drawStairsTool.getEditModel();
    if (!isInOperation && ((deleted === null || deleted === void 0 ? void 0 : deleted.length) || (added === null || added === void 0 ? void 0 : added.length))) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMzVk87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsa0NBQWtDOzs7Ozs7O1VDakJuQztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2RyYXctc3RhaXJzLy4vc3JjL21haW4vbWFpbi50cyIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy8uL3NyYy9tYWluL3Rvb2xzL0RyYXdTdGFpcnNUb29sL2NvbnN0cy50cyIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy8uL3NyYy9tYWluL3Rvb2xzL0RyYXdTdGFpcnNUb29sL2luZGV4LnRzIiwid2VicGFjazovL2RyYXctc3RhaXJzLy4vc3JjL21haW4vdG9vbHMvRHJhd1N0YWlyc1Rvb2wvbWVzaFV0aWxzLnRzIiwid2VicGFjazovL2RyYXctc3RhaXJzLy4vc3JjL21haW4vdG9vbHMvRHJhd1N0YWlyc1Rvb2wvdGVtcE1lc2hVdGlscy50cyIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy8uL3NyYy9tYWluL3Rvb2xzL0RyYXdTdGFpcnNUb29sL3R5cGVzLnRzIiwid2VicGFjazovL2RyYXctc3RhaXJzLy4vc3JjL21haW4vdG9vbHMvRHJhd1N0YWlyc1Rvb2wvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvLi9zcmMvbWFpbi90eXBlcy50cyIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9kcmF3LXN0YWlycy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2RyYXctc3RhaXJzL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vZHJhdy1zdGFpcnMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2RyYXctc3RhaXJzL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCB7IGRyYXdTdGFpcnNUb29sIH0gZnJvbSBcIi4vdG9vbHMvRHJhd1N0YWlyc1Rvb2wvaW5kZXhcIjtcbmltcG9ydCB7IGlzS0dyb3VwSW5zdGFuY2UsIGlzUGFydE9mRWRpdE1vZGVsLCBvbk1vZGVsQ2hhbmdlZCB9IGZyb20gXCIuL3Rvb2xzL0RyYXdTdGFpcnNUb29sL3V0aWxzXCI7XG5pbXBvcnQgeyBNZXNzYWdlVHlwZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5jb25zdCBwbHVnaW5VSSA9IGFwcC5nZXRQbHVnaW5VSSgpO1xucGx1Z2luVUkucmVzaXplKDM2MCwgNzIwKTtcbnBsdWdpblVJLm1vdW50KCk7XG5sZXQgYWN0aXZhdGVkQ3VzdG9tVG9vbDtcbmZ1bmN0aW9uIG9uVUlNZXNzYWdlKGRhdGEpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKGRhdGEudHlwZSA9PT0gTWVzc2FnZVR5cGUuRHJhd1N0YWlyVmlld01vdW50ZWQpIHtcbiAgICAgICAgICAgICAgICBvblBsdWdpblN0YXJ0VXAoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gTWVzc2FnZVR5cGUuQWN0aXZhdGVEcmF3U3RhaXJzVG9vbCkge1xuICAgICAgICAgICAgICAgIC8vIGlmIChkYXRhLnR5cGUgPT09ICdhY3RpdmF0ZVN0cmFpZ2h0U3RhaXJzVG9vbCcgfHwgZGF0YS50eXBlID09PSAnYWN0aXZhdGVDaXJjdWxhclN0YWlyc1Rvb2wnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFjdGl2YXRlZEN1c3RvbVRvb2wgIT09IGRyYXdTdGFpcnNUb29sKSB7XG4gICAgICAgICAgICAgICAgICAgIGFwcC5hY3RpdmF0ZUN1c3RvbVRvb2woZHJhd1N0YWlyc1Rvb2wsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmF0ZWRDdXN0b21Ub29sID0gZHJhd1N0YWlyc1Rvb2w7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGRyYXdTdGFpcnNUb29sLmNoYW5nZUNvbXBvbmVudFR5cGUoZGF0YS5jb21wb25lbnRUeXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gTWVzc2FnZVR5cGUuRGVBY3RpdmF0ZURyYXdTdGFpcnNUb29sKSB7XG4gICAgICAgICAgICAgICAgLy8gfSBlbHNlIGlmIChkYXRhLnR5cGUgPT09ICdkZUFjdGl2YXRlU3RyYWlnaHRTdGFpcnNUb29sJyB8fCBkYXRhLnR5cGUgPT09ICdkZUFjdGl2YXRlQ2lyY3VsYXJTdGFpcnNUb29sJykge1xuICAgICAgICAgICAgICAgIGRlQWN0aXZhdGVEcmF3U3RhaXJzVG9vbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS50eXBlID09PSBNZXNzYWdlVHlwZS5TdGFpclBhcmFtQ2hhbmdlZEJ5SW5wdXQpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiAoYWN0aXZhdGVkQ3VzdG9tVG9vbCA9PT0gZHJhd1N0YWlyc1Rvb2wpIHtcbiAgICAgICAgICAgICAgICBkcmF3U3RhaXJzVG9vbC5jaGFuZ2VTdGFpclBhcmFtKGRhdGEuc3RhaXJQYXJhbSwgZGF0YS5jaGFuZ2VQYXJhbXMpO1xuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEudHlwZSA9PT0gTWVzc2FnZVR5cGUuUGFyYW1DaGFuZ2VkQnlJbnB1dCkge1xuICAgICAgICAgICAgICAgIC8vIGlmIChhY3RpdmF0ZWRDdXN0b21Ub29sID09PSBkcmF3U3RhaXJzVG9vbCkge1xuICAgICAgICAgICAgICAgIGRyYXdTdGFpcnNUb29sLmNoYW5nZUNvbXBvbmVudFBhcmFtKGRhdGEuY29tcG9uZW50UGFyYW0sIGRhdGEuY2hhbmdlUGFyYW1zKTtcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09IE1lc3NhZ2VUeXBlLkZvY3VzQ29tcG9uZW50SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiAoYWN0aXZhdGVkQ3VzdG9tVG9vbCA9PT0gZHJhd1N0YWlyc1Rvb2wpIHtcbiAgICAgICAgICAgICAgICBkcmF3U3RhaXJzVG9vbC5mb2N1c0NvbXBvbmVudChkYXRhLmNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09IE1lc3NhZ2VUeXBlLlJlbW92ZUNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIC8vIGlmIChhY3RpdmF0ZWRDdXN0b21Ub29sID09PSBkcmF3U3RhaXJzVG9vbCkge1xuICAgICAgICAgICAgICAgIGRyYXdTdGFpcnNUb29sLnJlbW92ZUNvbXBvbmVudChkYXRhLmNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhLnR5cGUgPT09IE1lc3NhZ2VUeXBlLk1hdGVyaWFsUmVwbGFjZUNsaWNrKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgKGFjdGl2YXRlZEN1c3RvbVRvb2wgPT09IGRyYXdTdGFpcnNUb29sKSB7XG4gICAgICAgICAgICAgICAgZHJhd1N0YWlyc1Rvb2wub25NYXRlcmlhbFJlcGxhY2VDbGljayhkYXRhLmNoYW5nZVBhcmFtLCBkYXRhLmluZGV4KTtcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIGNsb3NlUGx1Z2luKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkZUFjdGl2YXRlRHJhd1N0YWlyc1Rvb2woKSB7XG4gICAgYWN0aXZhdGVkQ3VzdG9tVG9vbCA9IHVuZGVmaW5lZDtcbiAgICBhcHAuZGVhY3RpdmF0ZUN1c3RvbVRvb2woZHJhd1N0YWlyc1Rvb2wsIGZhbHNlKTtcbn1cbnBsdWdpblVJLm9uTWVzc2FnZShvblVJTWVzc2FnZSk7XG5jb25zdCBzZWxlY3Rpb24gPSBhcHAuZ2V0U2VsZWN0aW9uKCk7XG5zZWxlY3Rpb24uYWRkT2JzZXJ2ZXIoe1xuICAgIG9uU2VsZWN0aW9uQ2hhbmdlOiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFsbEVudGl0aWVzID0gc2VsZWN0aW9uLmdldEFsbEVudGl0aWVzKCk7XG4gICAgICAgIGlmIChhbGxFbnRpdGllcy5sZW5ndGggPT09IDEgJiYgaXNLR3JvdXBJbnN0YW5jZShhbGxFbnRpdGllc1swXSkpIHtcbiAgICAgICAgICAgIGRyYXdTdGFpcnNUb29sLmNsZWFyVGVtcFNoYXBlcygpO1xuICAgICAgICAgICAgZHJhd1N0YWlyc1Rvb2wuc2V0TW9kZWwoYWxsRW50aXRpZXNbMF0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFsbEVudGl0aWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgZWRpdFBhdGggPSBhcHAuZ2V0QWN0aXZlRGVzaWduKCkuZ2V0RWRpdFBhdGgoKTtcbiAgICAgICAgICAgIGNvbnN0IGVkaXRNb2RlbCA9IGRyYXdTdGFpcnNUb29sLmdldEVkaXRNb2RlbCgpO1xuICAgICAgICAgICAgZHJhd1N0YWlyc1Rvb2wuY2xlYXJUZW1wU2hhcGVzKCk7XG4gICAgICAgICAgICBpZiAoIWVkaXRQYXRoLmxlbmd0aCB8fCAhZWRpdE1vZGVsIHx8ICFpc1BhcnRPZkVkaXRNb2RlbChlZGl0TW9kZWwsIGVkaXRQYXRoW2VkaXRQYXRoLmxlbmd0aCAtIDFdKSkge1xuICAgICAgICAgICAgICAgIGlmIChhY3RpdmF0ZWRDdXN0b21Ub29sICE9PSBkcmF3U3RhaXJzVG9vbCkge1xuICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlByb3BlcnRpZXNWaXNpYmxlLCBwcm9wZXJ0aWVzVmlzaWJsZTogZmFsc2UgfSwgJyonKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KTtcbmZ1bmN0aW9uIG9uUGx1Z2luU3RhcnRVcCgpIHtcbiAgICBjb25zdCBhbGxFbnRpdGllcyA9IHNlbGVjdGlvbi5nZXRBbGxFbnRpdGllcygpO1xuICAgIGlmIChhbGxFbnRpdGllcy5sZW5ndGggPT09IDEgJiYgaXNLR3JvdXBJbnN0YW5jZShhbGxFbnRpdGllc1swXSkpIHtcbiAgICAgICAgZHJhd1N0YWlyc1Rvb2wuc2V0TW9kZWwoYWxsRW50aXRpZXNbMF0pO1xuICAgIH1cbiAgICBhcHAuYWRkT2JzZXJ2ZXIoe1xuICAgICAgICBvblBsdWdpbkNsb3NlZDogKCkgPT4ge1xuICAgICAgICB9LFxuICAgICAgICBvbk1vZGVsQ2hhbmdlZCxcbiAgICB9KTtcbn1cbiIsImltcG9ydCB7IENvbXBvbmVudERpcmVjdGlvblR5cGUsIENvbXBvbmVudFR5cGUsIERlZmF1bHRDb21wb25lbnRQYXJhbSwgRGVmYXVsdFN0YWlyUGFyYW0sIFByZXNldE1hdGVyaWFscyB9IGZyb20gXCIuL3R5cGVzXCI7XG5leHBvcnQgY29uc3QgZHVtbXlNYXRyaXg0ID0gR2VvbUxpYi5jcmVhdGVJZGVudGl0eU1hdHJpeDQoKTtcbmV4cG9ydCBjb25zdCBkdW1teVZlY3RvcjNkID0gR2VvbUxpYi5jcmVhdGVWZWN0b3IzZCgwLCAwLCAwKTtcbmV4cG9ydCBjb25zdCBkdW1teVBvaW50M2QgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QoMCwgMCwgMCk7XG5leHBvcnQgY29uc3QgRGlyZWN0aW9uWCA9IEdlb21MaWIuY3JlYXRlVmVjdG9yM2QoMSwgMCwgMCk7XG5leHBvcnQgY29uc3QgRGlyZWN0aW9uWSA9IEdlb21MaWIuY3JlYXRlVmVjdG9yM2QoMCwgMSwgMCk7XG5leHBvcnQgY29uc3QgRGlyZWN0aW9uWiA9IEdlb21MaWIuY3JlYXRlVmVjdG9yM2QoMCwgMCwgMSk7XG4vLyBjb25zdCBIZWlnaHRUb2xlcmFuY2U6IG51bWJlciA9IDU7XG5leHBvcnQgY29uc3QgTGVuZ3RoVG9sZXJhbmNlID0gMjtcbmV4cG9ydCBjb25zdCBEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSA9IE1hdGguUEkgLyAzNjtcbmV4cG9ydCBjb25zdCBBbmdsZVRvbGVyYW5jZSA9IE1hdGguUEkgLyAxODAgLyA1O1xuZXhwb3J0IGNvbnN0IFN0ZXBDb3VudExpbWl0ID0gMTAwO1xuLy8gY29uc3QgRGVmYXVsdEJvYXJkVGhpY2tuZXNzID0gNTA7XG5leHBvcnQgY29uc3QgVGVtcExpbmVDb2xvcnMgPSB7XG4gICAgU3RhaXI6IHsgcjogMCwgZzogMCwgYjogMjU1IH0sXG4gICAgTW9sZDogeyByOiAxMywgZzogNzEsIGI6IDE2MSB9LFxuICAgIEhhbmRyYWlsOiB7IHI6IDAsIGc6IDAsIGI6IDAgfSxcbiAgICBJbmZlcmVuY2U6IHsgcjogMCwgZzogMCwgYjogMCB9LFxuICAgIEZvY3VzOiB7IHI6IDI1NSwgZzogMCwgYjogMCB9LFxufTtcbmV4cG9ydCBjb25zdCBUZW1wTGluZVBhdHRlcm5zID0ge1xuICAgIEhhbmRyYWlsOiBLTGluZVBhdHRlcm4uRGFzaCxcbiAgICBTdGFpckFuZE1vbGQ6IEtMaW5lUGF0dGVybi5Tb2xpZCxcbiAgICBJbmZlcmVuY2U6IEtMaW5lUGF0dGVybi5EYXNoLFxufTtcbmV4cG9ydCBjb25zdCBDYWNoZVNldHRpbmdzID0ge1xuICAgIHN0YWlyVHlwZTogQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyLFxufTtcbmV4cG9ydCBmdW5jdGlvbiBnZXROZXdDb21wb25lbnRQYXJhbSh0eXBlLCBiYXNlU2VnbWVudCwgdXB3YXJkKSB7XG4gICAgbGV0IHN0YXJ0V2lkdGggPSBEZWZhdWx0U3RhaXJQYXJhbS5zdGFydFdpZHRoICogKHR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gPyA0IDogMSk7XG4gICAgbGV0IGVuZFdpZHRoID0gRGVmYXVsdFN0YWlyUGFyYW0uZW5kV2lkdGggKiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSA/IDQgOiAxKTtcbiAgICBpZiAoYmFzZVNlZ21lbnQpIHtcbiAgICAgICAgY29uc3QgeyBwYXJhbTogeyBlbmRXaWR0aDogYmFzZVNlZ21lbnRFbmRXaWR0aCwgdHlwZTogYmFzZVNlZ21lbnRUeXBlIH0gfSA9IGJhc2VTZWdtZW50O1xuICAgICAgICBpZiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgaWYgKGJhc2VTZWdtZW50VHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgICAgIHN0YXJ0V2lkdGggPSBiYXNlU2VnbWVudEVuZFdpZHRoO1xuICAgICAgICAgICAgICAgIGVuZFdpZHRoID0gYmFzZVNlZ21lbnRFbmRXaWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0YXJ0V2lkdGggPSA0ICogYmFzZVNlZ21lbnRFbmRXaWR0aDtcbiAgICAgICAgICAgICAgICBlbmRXaWR0aCA9IDQgKiBiYXNlU2VnbWVudEVuZFdpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGJhc2VTZWdtZW50VHlwZSAhPT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgICAgIHN0YXJ0V2lkdGggPSBiYXNlU2VnbWVudEVuZFdpZHRoO1xuICAgICAgICAgICAgICAgIGVuZFdpZHRoID0gYmFzZVNlZ21lbnRFbmRXaWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBEZWZhdWx0Q29tcG9uZW50UGFyYW0pLCB7IGluZGV4OiBiYXNlU2VnbWVudCA/IGJhc2VTZWdtZW50LnBhcmFtLmluZGV4ICsgMSA6IDAsIHR5cGUsXG4gICAgICAgIHN0YXJ0V2lkdGgsXG4gICAgICAgIGVuZFdpZHRoLCB1cHdhcmQ6IHVwd2FyZCA9PT0gdW5kZWZpbmVkID8gRGVmYXVsdENvbXBvbmVudFBhcmFtLnVwd2FyZCA6IHVwd2FyZCwgb2Zmc2V0V2lkdGg6IDAsIHdpdGhPZmZzZXQ6IGZhbHNlLCBwbGF0Zm9ybUxlbmd0aExvY2tlZDogZmFsc2UgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0TmV3U2VnbWVudCh0eXBlLCBiYXNlU2VnbWVudCwgdXB3YXJkKSB7XG4gICAgY29uc3QgcGFyYW0gPSBnZXROZXdDb21wb25lbnRQYXJhbSh0eXBlLCBiYXNlU2VnbWVudCwgdXB3YXJkKTtcbiAgICBwYXJhbS5tYXRlcmlhbCA9IHR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gPyBQcmVzZXRNYXRlcmlhbHMuUGxhdGZvcm0gOiBQcmVzZXRNYXRlcmlhbHMuU3RhaXI7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhcnQ6IGR1bW15UG9pbnQzZCxcbiAgICAgICAgZW5kOiBkdW1teVBvaW50M2QsXG4gICAgICAgIHN0YXJ0TG9ja2VkOiBmYWxzZSxcbiAgICAgICAgZW5kTG9ja2VkOiBmYWxzZSxcbiAgICAgICAgc3RhcnRIZWlnaHQ6IDAsXG4gICAgICAgIGVuZEhlaWdodDogMCxcbiAgICAgICAgc3RhaXJTaGFwZToge1xuICAgICAgICAgICAgc3RlcENvdW50OiAwLFxuICAgICAgICAgICAgdmVydGljZXM6IFtdLFxuICAgICAgICAgICAgdGVtcExpbmVzOiBbXSxcbiAgICAgICAgfSxcbiAgICAgICAgbW9sZFNoYXBlOiB7XG4gICAgICAgICAgICBzdGVwQ291bnQ6IDAsXG4gICAgICAgICAgICB2ZXJ0aWNlczogW10sXG4gICAgICAgICAgICB0ZW1wTGluZXM6IFtdLFxuICAgICAgICB9LFxuICAgICAgICBjb3JuZXJTaGFwZToge1xuICAgICAgICAgICAgc3RlcENvdW50OiAwLFxuICAgICAgICAgICAgdmVydGljZXM6IFtdLFxuICAgICAgICAgICAgdGVtcExpbmVzOiBbXSxcbiAgICAgICAgfSxcbiAgICAgICAgY29ybmVyTW9sZFNoYXBlOiB7XG4gICAgICAgICAgICBzdGVwQ291bnQ6IDAsXG4gICAgICAgICAgICB2ZXJ0aWNlczogW10sXG4gICAgICAgICAgICB0ZW1wTGluZXM6IFtdLFxuICAgICAgICB9LFxuICAgICAgICBuZXh0Q29tcG9uZW50czogQXJyYXkuZnJvbSh7IGxlbmd0aDogNiB9LCBfID0+IG5ldyBTZXQoKSksXG4gICAgICAgIHBhcmFtLFxuICAgICAgICBjb21wb25lbnREaXJlY3Rpb25UeXBlOiBDb21wb25lbnREaXJlY3Rpb25UeXBlLkZyb250LFxuICAgIH07XG59XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCB7IENvbXBvbmVudFR5cGUsIENvbXBvbmVudFBhcmFtS2V5LCBTdGFydEVuZEtleSwgQmFzZUxpbmVTZWczZEtleSwgU3RhaXJNb2RlbEtleSwgQ29tcG9uZW50UGFyYW1UeXBlLCBNb2RlbFZhbHVlLCBDaXJjbGVUYW5nZW50S2V5LCBEZWZhdWx0U3RhaXJQYXJhbSwgQmFzZUNvbXBvbmVudEtleSwgSGFuZHJhaWxNb2RlbEtleSwgUmFpbE1vZGVsS2V5LCBDb2x1bW5Nb2RlbEtleSwgU3RhaXJQYXJhbUtleSwgU3RhaXJNYXRlcmlhbEtleSwgQ29sdW1uTWF0ZXJpYWxLZXksIFJhaWxNYXRlcmlhbEtleSwgUGxhdGZvcm1NYXRlcmlhbEtleSwgQ29tcG9uZW50TWF0ZXJpYWxLZXksIERlZmF1bHRDb21wb25lbnRQYXJhbSB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZUhhbmRyYWlsU2hhcGUsIGdlbmVyYXRlU2hhcGUsIGlzQ2lyY3VsYXJTdGFpciB9IGZyb20gXCIuL3RlbXBNZXNoVXRpbHNcIjtcbmltcG9ydCB7IGJ1aWxkQ29tcG9uZW50SW5zdGFuY2UsIGJ1aWxkSGFuZHJhaWxJbnN0YW5jZSwgYnVpbGRTZWdtZW50UmVsYXRpb25zLCBjaGFuZ2VQbGF0Zm9ybUxlbmd0aCwgY2hhbmdlUGxhdGZvcm1XaWR0aCwgY2hhbmdlU3RhaXJTdGVwLCBjaGFuZ2VTdGFpclVwd2FyZCwgZ2VuZXJhdGVNZXNoZXMsIGdldFNlZ21lbnRCeUluZGV4LCBsb2FkRGVmYXVsdE1hdGVyaWFscyB9IGZyb20gXCIuL21lc2hVdGlsc1wiO1xuaW1wb3J0IHsgcGFyc2VCYXNlQ29tcG9uZW50LCBwYXJzZUxpbmVTZWczZCwgcGFyc2VDb21wb25lbnRQYXJhbSwgcGFyc2VTdGFydEVuZCwgcGFyc2VWZWN0b3IzZCwgc3RyaW5naWZ5U3RhaXJQYXJhbSwgc3RyaW5naWZ5TWF0ZXJpYWwsIHBhcnNlU3RhaXJQYXJhbSwgcGFyc2VNYXRlcmlhbCwgc3RhcnRPcGVyYXRpb24sIGFib3J0T3BlcmF0aW9uLCBjb21taXRPcGVyYXRpb24sIGlzUGFydE9mRWRpdE1vZGVsIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCB7IENhY2hlU2V0dGluZ3MsIGdldE5ld0NvbXBvbmVudFBhcmFtLCBnZXROZXdTZWdtZW50LCBUZW1wTGluZUNvbG9ycywgVGVtcExpbmVQYXR0ZXJucyB9IGZyb20gXCIuL2NvbnN0c1wiO1xuaW1wb3J0IHsgZGVBY3RpdmF0ZURyYXdTdGFpcnNUb29sIH0gZnJvbSBcIi4uLy4uLy4uL21haW4vbWFpblwiO1xuaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vbWFpbi90eXBlc1wiO1xuY29uc3QgZGVzaWduID0gYXBwLmdldEFjdGl2ZURlc2lnbigpO1xuY29uc3Qgc2VsZWN0aW9uID0gYXBwLmdldFNlbGVjdGlvbigpO1xuY29uc3QgcGx1Z2luVUkgPSBhcHAuZ2V0UGx1Z2luVUkoKTtcbmNvbnN0IGFwcFZpZXcgPSBhcHAuZ2V0QWN0aXZlVmlldygpO1xuY29uc3QgdG9vbEhlbHBlciA9IGFwcC5nZXRUb29sSGVscGVyKCk7XG5jb25zdCBEZWZhdWx0Rm9jdXNlZENvbXBvbmVudEluZGV4ID0gLTE7XG5leHBvcnQgY2xhc3MgRHJhd1N0YWlyc1Rvb2wge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvLyBwcml2YXRlIGNvbXBvbmVudFBhcmFtOiBDb21wb25lbnRQYXJhbSA9IHsgLi4uRGVmYXVsdENvbXBvbmVudFBhcmFtIH07XG4gICAgICAgIHRoaXMuZHJhd2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCA9IERlZmF1bHRGb2N1c2VkQ29tcG9uZW50SW5kZXg7XG4gICAgICAgIHRoaXMuc2VnbWVudHMgPSBbXTtcbiAgICAgICAgdGhpcy5zdGFpclBhcmFtID0gT2JqZWN0LmFzc2lnbih7fSwgRGVmYXVsdFN0YWlyUGFyYW0pO1xuICAgICAgICB0aGlzLm9uTWF0ZXJpYWxSZXBsYWNlSXRlbUNsaWNrID0gKGNoYW5nZVBhcmFtVHlwZSwgaW5kZXgsIGlzRGVsZXRlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiAobWF0ZXJpYWxJZCA9ICcnLCBiZ2lkID0gJycpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsb2FkTWF0ZXJpYWxSZXMgPSB5aWVsZCBkZXNpZ24ubG9hZE1hdGVyaWFsKG1hdGVyaWFsSWQpO1xuICAgICAgICAgICAgICAgIGlmICghbG9hZE1hdGVyaWFsUmVzLmlzU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsU3RyaW5nID0gaXNEZWxldGUgPyAnJyA6IHN0cmluZ2lmeU1hdGVyaWFsKHsgbWF0ZXJpYWxJZCwgYmdpZCB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXRlcmlhbE9iamVjdCA9IGlzRGVsZXRlID8gdW5kZWZpbmVkIDogeyBtYXRlcmlhbElkLCBiZ2lkIH07XG4gICAgICAgICAgICAgICAgbGV0IHBhcmVudERlZjtcbiAgICAgICAgICAgICAgICBjb25zdCBpbnN0YW5jZVBhdGggPSB0aGF0LmVkaXRNb2RlbCA/IGRlc2lnbi5nZXRFZGl0UGF0aHNUb0dyb3VwSW5zdGFuY2UodGhhdC5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlKSA6IFtdO1xuICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VQYXJhbVR5cGUgPT09IENvbXBvbmVudFBhcmFtVHlwZS5Db21wb25lbnRNYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgodGhhdC5zZWdtZW50cywgaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhlU2VnbWVudCAmJiBpbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RhaXJQYXJhbVNob3VsZENoYW5nZUtleSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoZVNlZ21lbnQucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBsYXRmb3JtU2VnbWVudHMgPSB0aGlzLnNlZ21lbnRzLmZpbHRlcihzZWcgPT4gc2VnLnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwbGF0Zm9ybVNlZ21lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpclBhcmFtU2hvdWxkQ2hhbmdlS2V5ID0gJ3BsYXRmb3JtTWF0ZXJpYWwnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YWlyU2VnbWVudHMgPSB0aGlzLnNlZ21lbnRzLmZpbHRlcihzZWcgPT4gc2VnLnBhcmFtLnR5cGUgIT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGFpclNlZ21lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpclBhcmFtU2hvdWxkQ2hhbmdlS2V5ID0gJ3N0YWlyTWF0ZXJpYWwnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmRyYXdpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGVTZWdtZW50LnBhcmFtLm1hdGVyaWFsID0gbWF0ZXJpYWxPYmplY3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YWlyUGFyYW1TaG91bGRDaGFuZ2VLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFpclBhcmFtW3N0YWlyUGFyYW1TaG91bGRDaGFuZ2VLZXldID0gbWF0ZXJpYWxPYmplY3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuUGFyYW1DaGFuZ2VkQnlEcmF3LCBjb21wb25lbnRQYXJhbTogT2JqZWN0LmFzc2lnbih7fSwgdGhlU2VnbWVudC5wYXJhbSksIHN0YWlyUGFyYW06IHN0YWlyUGFyYW1TaG91bGRDaGFuZ2VLZXkgPyB0aGlzLnN0YWlyUGFyYW0gOiB1bmRlZmluZWQgfSwgJyonKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoYXQuZWRpdE1vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50RGVmID0gdGhhdC5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcGFyZW50RGVmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlSW5zdGFuY2UgPSB0aGF0LmVkaXRNb2RlbC5zdGFpcnMuZ2V0KGluZGV4KSB8fCB0aGF0LmVkaXRNb2RlbC5wbGF0Zm9ybXMuZ2V0KGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhlSW5zdGFuY2UgJiYgaW5zdGFuY2VQYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcGVyYXRpb25TdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKHlpZWxkIGRlc2lnbi5hY3RpdmF0ZUVkaXRQYXRoKFsuLi5pbnN0YW5jZVBhdGhbMF0sIHRoYXQuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZV0pKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0RlbGV0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZGVzaWduLmNsZWFyTWF0ZXJpYWwoW3RoZUluc3RhbmNlLmluc3RhbmNlXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBkZXNpZ24uYXNzaWduTWF0ZXJpYWxGb3JFbnRpdGllcyhbdGhlSW5zdGFuY2UuaW5zdGFuY2VdLCBtYXRlcmlhbElkLCBiZ2lkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbnN0YW5jZURlZiA9IHRoZUluc3RhbmNlLmluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2VEZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGluc3RhbmNlRGVmLnNldEN1c3RvbVByb3BlcnR5KENvbXBvbmVudE1hdGVyaWFsS2V5LCBtYXRlcmlhbFN0cmluZykuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICh5aWVsZCBkZXNpZ24uYWN0aXZhdGVFZGl0UGF0aChpbnN0YW5jZVBhdGhbMF0pKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGFpclBhcmFtU2hvdWxkQ2hhbmdlS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBwYXJlbnREZWYuc2V0Q3VzdG9tUHJvcGVydHkodGhlU2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtID8gUGxhdGZvcm1NYXRlcmlhbEtleSA6IFN0YWlyTWF0ZXJpYWxLZXksIG1hdGVyaWFsU3RyaW5nKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1pdE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlU2VnbWVudC5wYXJhbS5tYXRlcmlhbCA9IG1hdGVyaWFsT2JqZWN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YWlyUGFyYW1TaG91bGRDaGFuZ2VLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWlyUGFyYW1bc3RhaXJQYXJhbVNob3VsZENoYW5nZUtleV0gPSBtYXRlcmlhbE9iamVjdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuUGFyYW1DaGFuZ2VkQnlEcmF3LCBjb21wb25lbnRQYXJhbTogT2JqZWN0LmFzc2lnbih7fSwgdGhlU2VnbWVudC5wYXJhbSksIHN0YWlyUGFyYW06IHN0YWlyUGFyYW1TaG91bGRDaGFuZ2VLZXkgPyB0aGlzLnN0YWlyUGFyYW0gOiB1bmRlZmluZWQgfSwgJyonKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFib3J0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hhbmdlUGFyYW1UeXBlID09PSBDb21wb25lbnRQYXJhbVR5cGUuU3RhaXJNYXRlcmlhbCB8fCBjaGFuZ2VQYXJhbVR5cGUgPT09IENvbXBvbmVudFBhcmFtVHlwZS5QbGF0Zm9ybU1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC5lZGl0TW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VQYXJhbVR5cGUgPT09IENvbXBvbmVudFBhcmFtVHlwZS5TdGFpck1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zdGFpclBhcmFtLnN0YWlyTWF0ZXJpYWwgPSBtYXRlcmlhbE9iamVjdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHNlZ21lbnQgb2YgdGhpcy5zZWdtZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VnbWVudC5wYXJhbS50eXBlICE9PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50LnBhcmFtLm1hdGVyaWFsID0gbWF0ZXJpYWxPYmplY3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnN0YWlyUGFyYW0ucGxhdGZvcm1NYXRlcmlhbCA9IHsgbWF0ZXJpYWxJZCwgYmdpZCB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgc2VnbWVudCBvZiB0aGlzLnNlZ21lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQucGFyYW0ubWF0ZXJpYWwgPSBtYXRlcmlhbE9iamVjdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuU3RhaXJQYXJhbUNoYW5nZWRCeURyYXcsIHN0YWlyUGFyYW06IHRoYXQuc3RhaXJQYXJhbSwgY29tcG9uZW50UGFyYW1zOiB0aGlzLnNlZ21lbnRzLm1hcChzZWcgPT4gKE9iamVjdC5hc3NpZ24oe30sIHNlZy5wYXJhbSkpKSB9LCAnKicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGluc3RhbmNlUGF0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50RGVmID0gdGhhdC5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFwYXJlbnREZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wZXJhdGlvblN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKHlpZWxkIGRlc2lnbi5hY3RpdmF0ZUVkaXRQYXRoKFsuLi5pbnN0YW5jZVBhdGhbMF0sIHRoYXQuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZV0pKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21wb25lbnRzID0gY2hhbmdlUGFyYW1UeXBlID09PSBDb21wb25lbnRQYXJhbVR5cGUuU3RhaXJNYXRlcmlhbCA/IHRoYXQuZWRpdE1vZGVsLnN0YWlycyA6IHRoYXQuZWRpdE1vZGVsLnBsYXRmb3JtcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoZVNlZ21lbnRzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21wb25lbnRJbnN0YW5jZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgW2luZCwgaW5zdGFuY2VEYXRhXSBvZiBjb21wb25lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlU2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHRoYXQuc2VnbWVudHMsIGluZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoZVNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50SW5zdGFuY2VzLnB1c2goaW5zdGFuY2VEYXRhLmluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlU2VnbWVudHMucHVzaCh0aGVTZWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNEZWxldGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBkZXNpZ24uY2xlYXJNYXRlcmlhbChjb21wb25lbnRJbnN0YW5jZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZGVzaWduLmFzc2lnbk1hdGVyaWFsRm9yRW50aXRpZXMoY29tcG9uZW50SW5zdGFuY2VzLCBtYXRlcmlhbElkLCBiZ2lkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgY29tcG9uZW50SW5zdGFuY2Ugb2YgY29tcG9uZW50SW5zdGFuY2VzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29tcG9uZW50RGVmID0gY29tcG9uZW50SW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudERlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBjb21wb25lbnREZWYuc2V0Q3VzdG9tUHJvcGVydHkoQ29tcG9uZW50TWF0ZXJpYWxLZXksIG1hdGVyaWFsU3RyaW5nKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKHlpZWxkIGRlc2lnbi5hY3RpdmF0ZUVkaXRQYXRoKGluc3RhbmNlUGF0aFswXSkpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIHBhcmVudERlZi5zZXRDdXN0b21Qcm9wZXJ0eShjaGFuZ2VQYXJhbVR5cGUgPT09IENvbXBvbmVudFBhcmFtVHlwZS5TdGFpck1hdGVyaWFsID8gU3RhaXJNYXRlcmlhbEtleSA6IFBsYXRmb3JtTWF0ZXJpYWxLZXksIG1hdGVyaWFsU3RyaW5nKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1pdE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VQYXJhbVR5cGUgPT09IENvbXBvbmVudFBhcmFtVHlwZS5TdGFpck1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc3RhaXJQYXJhbS5zdGFpck1hdGVyaWFsID0gbWF0ZXJpYWxPYmplY3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgc2VnbWVudCBvZiB0aGVTZWdtZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5wYXJhbS5tYXRlcmlhbCA9IG1hdGVyaWFsT2JqZWN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnN0YWlyUGFyYW0ucGxhdGZvcm1NYXRlcmlhbCA9IG1hdGVyaWFsT2JqZWN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHNlZ21lbnQgb2YgdGhlU2VnbWVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQucGFyYW0ubWF0ZXJpYWwgPSBtYXRlcmlhbE9iamVjdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlN0YWlyUGFyYW1DaGFuZ2VkQnlEcmF3LCBzdGFpclBhcmFtOiB0aGF0LnN0YWlyUGFyYW0sIGNvbXBvbmVudFBhcmFtczogdGhpcy5zZWdtZW50cy5tYXAoc2VnID0+IChPYmplY3QuYXNzaWduKHt9LCBzZWcucGFyYW0pKSkgfSwgJyonKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFib3J0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hhbmdlUGFyYW1UeXBlID09PSBDb21wb25lbnRQYXJhbVR5cGUuSGFuZHJhaWxSYWlsTWF0ZXJpYWwgfHwgY2hhbmdlUGFyYW1UeXBlID09PSBDb21wb25lbnRQYXJhbVR5cGUuSGFuZHJhaWxDb2x1bW5NYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoYXQuZWRpdE1vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlUGFyYW1UeXBlID09PSBDb21wb25lbnRQYXJhbVR5cGUuSGFuZHJhaWxSYWlsTWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnN0YWlyUGFyYW0uaGFuZHJhaWwucmFpbC5tYXRlcmlhbCA9IG1hdGVyaWFsT2JqZWN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zdGFpclBhcmFtLmhhbmRyYWlsLmNvbHVtbi5tYXRlcmlhbCA9IG1hdGVyaWFsT2JqZWN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5TdGFpclBhcmFtQ2hhbmdlZEJ5RHJhdywgc3RhaXJQYXJhbTogdGhhdC5zdGFpclBhcmFtIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaW5zdGFuY2VQYXRoICYmIHRoYXQuZWRpdE1vZGVsLmhhbmRyYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnREZWYgPSB0aGF0LmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXBhcmVudERlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3BlcmF0aW9uU3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAoeWllbGQgZGVzaWduLmFjdGl2YXRlRWRpdFBhdGgoWy4uLmluc3RhbmNlUGF0aFswXSwgdGhhdC5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlLCB0aGF0LmVkaXRNb2RlbC5oYW5kcmFpbC5oYW5kcmFpbEluc3RhbmNlLmluc3RhbmNlXSkpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudHMgPSBjaGFuZ2VQYXJhbVR5cGUgPT09IENvbXBvbmVudFBhcmFtVHlwZS5IYW5kcmFpbFJhaWxNYXRlcmlhbCA/IHRoYXQuZWRpdE1vZGVsLmhhbmRyYWlsLnJhaWxJbnN0YW5jZXMgOiB0aGF0LmVkaXRNb2RlbC5oYW5kcmFpbC5jb2x1bW5JbnN0YW5jZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNEZWxldGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBkZXNpZ24uY2xlYXJNYXRlcmlhbChbLi4uY29tcG9uZW50cy52YWx1ZXMoKV0ubWFwKGMgPT4gYy5pbnN0YW5jZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZGVzaWduLmFzc2lnbk1hdGVyaWFsRm9yRW50aXRpZXMoWy4uLmNvbXBvbmVudHMudmFsdWVzKCldLm1hcChjID0+IGMuaW5zdGFuY2UpLCBtYXRlcmlhbElkLCBiZ2lkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICh5aWVsZCBkZXNpZ24uYWN0aXZhdGVFZGl0UGF0aChpbnN0YW5jZVBhdGhbMF0pKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBwYXJlbnREZWYuc2V0Q3VzdG9tUHJvcGVydHkoY2hhbmdlUGFyYW1UeXBlID09PSBDb21wb25lbnRQYXJhbVR5cGUuSGFuZHJhaWxSYWlsTWF0ZXJpYWwgPyBSYWlsTWF0ZXJpYWxLZXkgOiBDb2x1bW5NYXRlcmlhbEtleSwgbWF0ZXJpYWxTdHJpbmcpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb25TdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWl0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZVBhcmFtVHlwZSA9PT0gQ29tcG9uZW50UGFyYW1UeXBlLkhhbmRyYWlsUmFpbE1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc3RhaXJQYXJhbS5oYW5kcmFpbC5yYWlsLm1hdGVyaWFsID0gbWF0ZXJpYWxPYmplY3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnN0YWlyUGFyYW0uaGFuZHJhaWwuY29sdW1uLm1hdGVyaWFsID0gbWF0ZXJpYWxPYmplY3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuU3RhaXJQYXJhbUNoYW5nZWRCeURyYXcsIHN0YWlyUGFyYW06IHRoYXQuc3RhaXJQYXJhbSB9LCAnKicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWJvcnRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBvblRvb2xBY3RpdmUoKSB7XG4gICAgICAgIGxvYWREZWZhdWx0TWF0ZXJpYWxzKCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCh3aW5kb3cgYXMgYW55KS5vcmlnaW4pO1xuICAgICAgICAvLyB0b29sSGVscGVyLnNldEV4Y2x1ZGVJbmZlcmVuY2VUeXBlcyhbXG4gICAgICAgIC8vICAgICBLRW50aXR5VHlwZS5GYWNlLCBLRW50aXR5VHlwZS5FZGdlLCBLRW50aXR5VHlwZS5BdXhpbGlhcnlCb3VuZGVkQ3VydmUsIEtFbnRpdHlUeXBlLkF1eGlsaWFyeUxpbmUsIEtFbnRpdHlUeXBlLkF1eGlsaWFyeVZlcnRleCxcbiAgICAgICAgLy8gICAgIEtFbnRpdHlUeXBlLkdyb3VwSW5zdGFuY2UsIEtFbnRpdHlUeXBlLlZlcnRleCwgS0FyY2hGYWNlVHlwZS5Ob25QbGFuYXIsIEtBcmNoRmFjZVR5cGUuUGxhbmFyLFxuICAgICAgICAvLyBdKTtcbiAgICAgICAgY29uc3QgZmlyc3RTZWdtZW50ID0gZ2V0TmV3U2VnbWVudChDYWNoZVNldHRpbmdzLnN0YWlyVHlwZSwgdW5kZWZpbmVkLCB0aGlzLnN0YWlyUGFyYW0udXB3YXJkKTtcbiAgICAgICAgZmlyc3RTZWdtZW50LnN0YXJ0TG9ja2VkID0gZmFsc2U7XG4gICAgICAgIC8vIHRoaXMuc3RhaXJQYXJhbSA9IERlZmF1bHRTdGFpclBhcmFtO1xuICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLkRyYXdTdGFpck1vZGVsU2V0dGxlZCwgY29tcG9uZW50UGFyYW1zOiBbZmlyc3RTZWdtZW50LnBhcmFtXSwgc3RhaXJQYXJhbTogdGhpcy5zdGFpclBhcmFtLCBuZXdTdGFpcjogdHJ1ZSwgaXNEcmF3aW5nOiB0cnVlIH0sICcqJyk7XG4gICAgICAgIHRoaXMuc2VnbWVudHMgPSBbZmlyc3RTZWdtZW50XTtcbiAgICAgICAgdGhpcy5kcmF3aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jbGVhclRlbXBTaGFwZXMoKTtcbiAgICAgICAgdGhpcy5lZGl0TW9kZWwgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4ID0gMDtcbiAgICB9XG4gICAgb25Ub29sRGVhY3RpdmUoKSB7XG4gICAgICAgIHRvb2xIZWxwZXIuc2V0RXhjbHVkZUluZmVyZW5jZVR5cGVzKFtdKTtcbiAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICBpZiAodGhpcy5lZGl0TW9kZWwpIHtcbiAgICAgICAgICAgIHNlbGVjdGlvbi5hZGQoW3RoaXMuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZV0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5MZWF2ZURyYXdTdGFpcnNUb29sIH0sICcqJyk7XG4gICAgICAgIH1cbiAgICAgICAgZGVBY3RpdmF0ZURyYXdTdGFpcnNUb29sKCk7XG4gICAgfVxuICAgIG9uTW91c2VNb3ZlKGV2ZW50LCBpbmZlcmVuY2VSZXN1bHQpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ29uTW91c2VNb3ZlJyk7XG4gICAgICAgIGlmIChpbmZlcmVuY2VSZXN1bHQpIHtcbiAgICAgICAgICAgIC8vIGNvbnN0IHsgc3RhcnRXaWR0aCwgZW5kV2lkdGgsIHBsYXRmb3JtVGhpY2tuZXNzIH0gPSB0aGlzLmNvbXBvbmVudFBhcmFtO1xuICAgICAgICAgICAgY29uc3QgcG9zaXRpb24gPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QoaW5mZXJlbmNlUmVzdWx0LnBvc2l0aW9uLngsIGluZmVyZW5jZVJlc3VsdC5wb3NpdGlvbi55LCAwKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RTZWdtZW50ID0gdGhpcy5zZWdtZW50c1t0aGlzLnNlZ21lbnRzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdsYXN0U2VnbWVudC5zdGFydExvY2tlZCcsIGxhc3RTZWdtZW50LnN0YXJ0TG9ja2VkKTtcbiAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5wYXJhbS5tb2RlbEVkaXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAobGFzdFNlZ21lbnQuc3RhcnRMb2NrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuZW5kID0gcG9zaXRpb247XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBDb21wb25lbnQobGFzdFNlZ21lbnQsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlZ21lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByZXZTZWdtZW50ID0gdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggPT09IGxhc3RTZWdtZW50LnBhcmFtLmluZGV4ID8gdGhpcy5zZWdtZW50c1t0aGlzLnNlZ21lbnRzLmxlbmd0aCAtIDJdIDogZ2V0U2VnbWVudEJ5SW5kZXgodGhpcy5zZWdtZW50cywgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbXVzdCBiZSB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHByZXZTZWdtZW50ID09PSBudWxsIHx8IHByZXZTZWdtZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwcmV2U2VnbWVudC5wYXJhbS50eXBlKSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgbW9sZFNoYXBlOiB7IHZlcnRpY2VzLCB0ZW1wTGluZXMgfSB9ID0gcHJldlNlZ21lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCgoX2EgPSBsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGluZTNkSW5kZXgpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldlNlZ21lbnQubmV4dENvbXBvbmVudHMuZm9yRWFjaChpbmRzID0+IGluZHMuZGVsZXRlKGxhc3RTZWdtZW50LnBhcmFtLmluZGV4KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjbG9zZXN0UG9pbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1pbkRpc3RhbmNlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZXMuZm9yRWFjaCgobGluZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3Qgc3RhcnRJbmQgPSBjb21wb25lbnREaXJlY3Rpb25UeXBlID09PSBDb21wb25lbnREaXJlY3Rpb25UeXBlLlJpZ2h0RnJvbnQgJiYgdGVtcExpbmVzLmxlbmd0aCA+IDQgPyAxIDogMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGluZGV4ID09PSBzdGFydEluZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVTZWczZCA9IEdlb21MaWIuY3JlYXRlTGluZVNlZ21lbnQzZCh2ZXJ0aWNlc1tsaW5lWzBdXSwgdmVydGljZXNbbGluZVsxXV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVQb2ludCA9IGxpbmVTZWczZC5nZXRDbG9zZXN0UG9pbnQocG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJEaXN0YW5jZSA9IHRoZVBvaW50LmRpc3RhbmNlVG8ocG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNsb3Nlc3RQb2ludCB8fCBjdXJEaXN0YW5jZSA8IG1pbkRpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5EaXN0YW5jZSA9IGN1ckRpc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFBvaW50ID0gdGhlUG9pbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5zdGFydCA9IGNsb3Nlc3RQb2ludDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxhc3RTZWdtZW50LmJhc2VMaW5lU2VnM2QgPSB7IHN0YXJ0OiB2ZXJ0aWNlc1tsaW5lWzBdXSwgZW5kOiB2ZXJ0aWNlc1tsaW5lWzFdXSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudCA9IHsgY29tcG9uZW50SW5kZXg6IHByZXZTZWdtZW50LnBhcmFtLmluZGV4LCBsaW5lM2RJbmRleDogaW5kZXgsIGxpbmUzZDogeyBzdGFydDogdmVydGljZXNbbGluZVswXV0sIGVuZDogdmVydGljZXNbbGluZVsxXV0gfSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgcHJldlNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleCh0aGlzLnNlZ21lbnRzLCBsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKChfYiA9IGxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5saW5lM2RJbmRleCkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2U2VnbWVudC5uZXh0Q29tcG9uZW50c1tsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50LmxpbmUzZEluZGV4XS5hZGQobGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdQaWNrU3RhcnRUZW1wU2hhcGVzKHBvc2l0aW9uLCBsYXN0U2VnbWVudC5zdGFydCwgbGFzdFNlZ21lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuc3RhcnQgPSBwb3NpdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobGFzdFNlZ21lbnQucGFyYW0udHlwZSA9PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtICYmICFsYXN0U2VnbWVudC5wYXJhbS5wbGF0Zm9ybUxlbmd0aExvY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlBhcmFtQ2hhbmdlZEJ5RHJhdywgY29tcG9uZW50UGFyYW06IE9iamVjdC5hc3NpZ24oe30sIGxhc3RTZWdtZW50LnBhcmFtKSB9LCAnKicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBvbkxCdXR0b25VcChldmVudCwgaW5mZXJlbmNlUmVzdWx0KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ29uTEJ1dHRvblVwJyk7XG4gICAgICAgIGlmIChpbmZlcmVuY2VSZXN1bHQpIHtcbiAgICAgICAgICAgIC8vIGNvbnN0IHBvc2l0aW9uID0gaW5mZXJlbmNlUmVzdWx0LnBvc2l0aW9uO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VnbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdFNlZ21lbnQgPSB0aGlzLnNlZ21lbnRzW3RoaXMuc2VnbWVudHMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgaWYgKGxhc3RTZWdtZW50LnN0YXJ0TG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwdXNoIHNlZ21lbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBzdGFydCwgZW5kLCBwYXJhbTogeyB0eXBlIH0sIGNpcmNsZVRhbmdlbnQgfSA9IGxhc3RTZWdtZW50O1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5DaXJjdWxhclN0YWlyICYmICFjaXJjbGVUYW5nZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5jaXJjbGVUYW5nZW50ID0gZW5kLnN1YnRyYWN0ZWQoc3RhcnQpLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNDb21wb25lbnQobGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuZW5kTG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RQYXJhbSA9IGxhc3RTZWdtZW50LnBhcmFtO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RQYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLkNpcmN1bGFyU3RhaXIgJiYgbGFzdFNlZ21lbnQuY2lyY3VsYXJTaWRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0UGFyYW0udHlwZSA9IENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5jaXJjbGVUYW5nZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dFR5cGUgPSBsYXN0UGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSA/IENhY2hlU2V0dGluZ3Muc3RhaXJUeXBlIDogQ29tcG9uZW50VHlwZS5QbGF0Zm9ybTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRTZWdtZW50ID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBnZXROZXdTZWdtZW50KG5leHRUeXBlLCBsYXN0U2VnbWVudCwgdGhpcy5zdGFpclBhcmFtLnVwd2FyZCkpLCB7IHN0YXJ0OiBsYXN0U2VnbWVudC5lbmQsIGVuZDogbGFzdFNlZ21lbnQuZW5kLCBzdGFydExvY2tlZDogbGFzdFBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gPyBmYWxzZSA6IHRydWUsIHN0YXJ0SGVpZ2h0OiBsYXN0U2VnbWVudC5lbmRIZWlnaHQsIGVuZEhlaWdodDogbGFzdFNlZ21lbnQuZW5kSGVpZ2h0IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBtb2xkU2hhcGU6IHsgdmVydGljZXMsIHRlbXBMaW5lcyB9IH0gPSBsYXN0U2VnbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxhc3RTZWdtZW50LmJhc2VMaW5lU2VnM2QgPSB7IHN0YXJ0OiB2ZXJ0aWNlc1swXSwgZW5kOiB2ZXJ0aWNlc1sxXSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQgPSB7IGxpbmUzZDogeyBzdGFydDogdmVydGljZXNbMV0sIGVuZDogdmVydGljZXNbMF0gfSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFzZVNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleCh0aGlzLnNlZ21lbnRzLCBsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmFzZVNlZ21lbnQgJiYgKChfYSA9IGxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5saW5lM2RJbmRleCkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXNlU2VnbWVudC5uZXh0Q29tcG9uZW50c1tsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50LmxpbmUzZEluZGV4XS5hZGQobGFzdFBhcmFtLmluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXh0U2VnbWVudC5iYXNlTGluZVNlZzNkID0geyBzdGFydDogdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0sIGVuZDogdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0gfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0U2VnbWVudC5zdGFydExvY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50Lm5leHRDb21wb25lbnRzWzBdLmFkZChuZXh0U2VnbWVudC5wYXJhbS5pbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0U2VnbWVudC5iYXNlQ29tcG9uZW50ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudEluZGV4OiBsYXN0UGFyYW0uaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZTNkSW5kZXg6IGxhc3RQYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtID8gdGVtcExpbmVzLmxlbmd0aCAtIDEgOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUzZDogeyBzdGFydDogdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0sIGVuZDogdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0gfVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RQYXJhbS5tb2RlbEVkaXRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5QYXJhbUNoYW5nZWRCeURyYXcsIGNvbXBvbmVudFBhcmFtOiBsYXN0UGFyYW0gfSwgJyonKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VnbWVudHMucHVzaChuZXh0U2VnbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggIT09IGxhc3RQYXJhbS5pbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvY3VzZWRTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgodGhpcy5zZWdtZW50cywgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb2N1c2VkU2VnbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdUZW1wQ29tcG9uZW50KGZvY3VzZWRTZWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCA9IG5leHRTZWdtZW50LnBhcmFtLmluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5Db21wb25lbnRBZGRlZCwgY29tcG9uZW50UGFyYW06IE9iamVjdC5hc3NpZ24oe30sIG5leHRTZWdtZW50LnBhcmFtKSB9LCAnKicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5zdGFydExvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJQaWNrU3RhcnRUZW1wU2hhcGVzKGxhc3RTZWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3VGVtcENvbXBvbmVudChsYXN0U2VnbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCAhPT0gbGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuRm9jdXNDb21wb25lbnRJbmRleEJ5RHJhdywgZm9jdXNlZENvbXBvbmVudEluZGV4OiBsYXN0U2VnbWVudC5wYXJhbS5pbmRleCB9LCAnKicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNDb21wb25lbnQobGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBvblJCdXR0b25VcChldmVudCwgaW5mZXJlbmNlUmVzdWx0KSB7XG4gICAgICAgIGlmICh0aGlzLnNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgbGFzdFNlZ21lbnQgPSB0aGlzLnNlZ21lbnRzW3RoaXMuc2VnbWVudHMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBpZiAoIWxhc3RTZWdtZW50LnN0YXJ0TG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWdtZW50cyA9IHRoaXMuc2VnbWVudHMuc2xpY2UoMCwgdGhpcy5zZWdtZW50cy5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGxhc3RTZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpciAmJiBsYXN0U2VnbWVudC5jaXJjdWxhclNpZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LnBhcmFtLnR5cGUgPSBDb21wb25lbnRUeXBlLlN0cmFpZ2h0U3RhaXI7XG4gICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuY2lyY2xlVGFuZ2VudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgcGFyYW0sIGNpcmN1bGFyU2lkZSwgbW9sZFNoYXBlOiB7IHZlcnRpY2VzIH0gfSA9IGxhc3RTZWdtZW50O1xuICAgICAgICAgICAgICAgIGlmICghbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBsYXN0U2VnbWVudC5iYXNlTGluZVNlZzNkID0geyBzdGFydDogdmVydGljZXNbMF0sIGVuZDogdmVydGljZXNbMV0gfTtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudCA9IHsgbGluZTNkOiB7IHN0YXJ0OiB2ZXJ0aWNlc1sxXSwgZW5kOiB2ZXJ0aWNlc1swXSB9IH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLkNpcmN1bGFyU3RhaXIgJiYgY2lyY3VsYXJTaWRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0udHlwZSA9IENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpcjtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuY2lyY2xlVGFuZ2VudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy50cnlDb21taXQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZGVBY3RpdmF0ZURyYXdTdGFpcnNUb29sKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZHJhd1BpY2tTdGFydFRlbXBTaGFwZXMocG9zaXRpb24sIGNsb3Nlc3RQb2ludCwgdGhlU2VnbWVudCkge1xuICAgICAgICBpZiAodGhlU2VnbWVudC5waWNrU3RhcnRUZW1wU2hhcGVJZCkge1xuICAgICAgICAgICAgYXBwVmlldy5jbGVhclRlbXBvcmFyeVNoYXBlc0J5SWRzKFt0aGVTZWdtZW50LnBpY2tTdGFydFRlbXBTaGFwZUlkXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNsb3Nlc3RQb2ludCkge1xuICAgICAgICAgICAgY29uc3QgcGlja1N0YXJ0VGVtcFNoYXBlSWQgPSBhcHBWaWV3LmRyYXdMaW5lcyhbcG9zaXRpb24sIGNsb3Nlc3RQb2ludF0sIHsgY29sb3I6IFRlbXBMaW5lQ29sb3JzLkluZmVyZW5jZSwgZGVwdGhUZXN0OiBmYWxzZSwgcGF0dGVybjogVGVtcExpbmVQYXR0ZXJucy5JbmZlcmVuY2UsIGdhcFNpemU6IDUwLCBkYXNoU2l6ZTogNTAgfSk7XG4gICAgICAgICAgICBpZiAocGlja1N0YXJ0VGVtcFNoYXBlSWQgPT09IG51bGwgfHwgcGlja1N0YXJ0VGVtcFNoYXBlSWQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBpY2tTdGFydFRlbXBTaGFwZUlkLmlkKSB7XG4gICAgICAgICAgICAgICAgdGhlU2VnbWVudC5waWNrU3RhcnRUZW1wU2hhcGVJZCA9IHBpY2tTdGFydFRlbXBTaGFwZUlkLmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNsZWFyUGlja1N0YXJ0VGVtcFNoYXBlcyh0aGVTZWdtZW50KSB7XG4gICAgICAgIGlmICh0aGVTZWdtZW50LnBpY2tTdGFydFRlbXBTaGFwZUlkKSB7XG4gICAgICAgICAgICBhcHBWaWV3LmNsZWFyVGVtcG9yYXJ5U2hhcGVzQnlJZHMoW3RoZVNlZ21lbnQucGlja1N0YXJ0VGVtcFNoYXBlSWRdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkcmF3VGVtcENvbXBvbmVudCh0aGVTZWdtZW50LCBmb2N1c2VkID0gZmFsc2UsIGRyYXdIYW5kcmFpbCA9IGZhbHNlKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGlmICh0aGVTZWdtZW50LnN0YXJ0TG9ja2VkKSB7XG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlU2VnbWVudFNoYXBlKHRoZVNlZ21lbnQsIHRoaXMuZHJhd2luZyk7XG4gICAgICAgICAgICBjb25zdCB7IHN0YWlyU2hhcGU6IHsgdmVydGljZXM6IHN0YWlyVmVydGljZXMsIHRlbXBMaW5lczogc3RhaXJUZW1wTGluZXMgfSwgbW9sZFNoYXBlOiB7IHZlcnRpY2VzOiBtb2xkVmVydGljZXMsIHRlbXBMaW5lczogbW9sZFRlbXBMaW5lcyB9LCBjb3JuZXJTaGFwZTogeyB2ZXJ0aWNlczogY29ybmVyVmVydGljZXMsIHRlbXBMaW5lczogY29ybmVyVGVtcExpbmVzIH0sIGNvcm5lck1vbGRTaGFwZTogeyB2ZXJ0aWNlczogY29ybmVyTW9sZFZlcnRpY2VzLCB0ZW1wTGluZXM6IGNvcm5lck1vbGRUZW1wTGluZXMgfSwgfSA9IHRoZVNlZ21lbnQ7XG4gICAgICAgICAgICBjb25zdCB0ZW1wTGluZVBvaW50cyA9IFtdO1xuICAgICAgICAgICAgY29uc3QgbW9sZFRlbXBMaW5lUG9pbnRzID0gW107XG4gICAgICAgICAgICBpZiAodGhpcy5kcmF3aW5nKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBzdGFpclRlbXBMaW5lIG9mIHN0YWlyVGVtcExpbmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lUG9pbnRzLnB1c2goW3N0YWlyVmVydGljZXNbc3RhaXJUZW1wTGluZVswXV0sIHN0YWlyVmVydGljZXNbc3RhaXJUZW1wTGluZVsxXV1dKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBjb3JuZXJUZW1wTGluZSBvZiBjb3JuZXJUZW1wTGluZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVQb2ludHMucHVzaChbY29ybmVyVmVydGljZXNbY29ybmVyVGVtcExpbmVbMF1dLCBjb3JuZXJWZXJ0aWNlc1tjb3JuZXJUZW1wTGluZVsxXV1dKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG1vbGRUZW1wTGluZSBvZiBtb2xkVGVtcExpbmVzKSB7XG4gICAgICAgICAgICAgICAgbW9sZFRlbXBMaW5lUG9pbnRzLnB1c2goW21vbGRWZXJ0aWNlc1ttb2xkVGVtcExpbmVbMF1dLCBtb2xkVmVydGljZXNbbW9sZFRlbXBMaW5lWzFdXV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCBjb3JuZXJNb2xkVGVtcExpbmUgb2YgY29ybmVyTW9sZFRlbXBMaW5lcykge1xuICAgICAgICAgICAgICAgIG1vbGRUZW1wTGluZVBvaW50cy5wdXNoKFtjb3JuZXJNb2xkVmVydGljZXNbY29ybmVyTW9sZFRlbXBMaW5lWzBdXSwgY29ybmVyTW9sZFZlcnRpY2VzW2Nvcm5lck1vbGRUZW1wTGluZVsxXV1dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgoX2EgPSB0aGVTZWdtZW50LnRlbXBTaGFwZUlkKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgYXBwVmlldy5jbGVhclRlbXBvcmFyeVNoYXBlc0J5SWRzKHRoZVNlZ21lbnQudGVtcFNoYXBlSWQpO1xuICAgICAgICAgICAgICAgIHRoZVNlZ21lbnQudGVtcFNoYXBlSWQgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0ZW1wTGluZVBvaW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFpckNvbG9yID0gZm9jdXNlZCA/IFRlbXBMaW5lQ29sb3JzLkZvY3VzIDogVGVtcExpbmVDb2xvcnMuU3RhaXI7XG4gICAgICAgICAgICAgICAgY29uc3QgdGVtcFNoYXBlSWQgPSBhcHBWaWV3LmRyYXdQb2x5bGluZXModGVtcExpbmVQb2ludHMsIHsgY29sb3I6IHN0YWlyQ29sb3IsIGRlcHRoVGVzdDogZmFsc2UsIHBhdHRlcm46IFRlbXBMaW5lUGF0dGVybnMuU3RhaXJBbmRNb2xkIH0pO1xuICAgICAgICAgICAgICAgIGlmICh0ZW1wU2hhcGVJZCA9PT0gbnVsbCB8fCB0ZW1wU2hhcGVJZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogdGVtcFNoYXBlSWQuaWRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoZVNlZ21lbnQudGVtcFNoYXBlSWQgPSBbLi4udGVtcFNoYXBlSWQuaWRzXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobW9sZFRlbXBMaW5lUG9pbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vbGRDb2xvciA9IGZvY3VzZWQgPyBUZW1wTGluZUNvbG9ycy5Gb2N1cyA6IFRlbXBMaW5lQ29sb3JzLk1vbGQ7XG4gICAgICAgICAgICAgICAgY29uc3QgbW9sZFRlbXBTaGFwZUlkID0gYXBwVmlldy5kcmF3UG9seWxpbmVzKG1vbGRUZW1wTGluZVBvaW50cywgeyBjb2xvcjogbW9sZENvbG9yLCBkZXB0aFRlc3Q6IHRoaXMuZHJhd2luZywgcGF0dGVybjogVGVtcExpbmVQYXR0ZXJucy5TdGFpckFuZE1vbGQgfSk7XG4gICAgICAgICAgICAgICAgaWYgKG1vbGRUZW1wU2hhcGVJZCA9PT0gbnVsbCB8fCBtb2xkVGVtcFNoYXBlSWQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1vbGRUZW1wU2hhcGVJZC5pZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChfYiA9IHRoZVNlZ21lbnQudGVtcFNoYXBlSWQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoZVNlZ21lbnQudGVtcFNoYXBlSWQucHVzaCguLi5tb2xkVGVtcFNoYXBlSWQuaWRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoZVNlZ21lbnQudGVtcFNoYXBlSWQgPSBbLi4ubW9sZFRlbXBTaGFwZUlkLmlkc107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZHJhd0hhbmRyYWlsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3SGFuZHJhaWxzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZHJhd0hhbmRyYWlscyhzdGFpclBhcmFtID0gdGhpcy5zdGFpclBhcmFtKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGNvbnN0IHByZXZIYW5kcmFpbFRlbXBTaGFwZUlkcyA9IChfYSA9IHRoaXMuaGFuZHJhaWxDb2xsZWN0aW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudGVtcFNoYXBlSWQ7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVIYW5kcmFpbFNoYXBlKHN0YWlyUGFyYW0pO1xuICAgICAgICBpZiAocHJldkhhbmRyYWlsVGVtcFNoYXBlSWRzID09PSBudWxsIHx8IHByZXZIYW5kcmFpbFRlbXBTaGFwZUlkcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcHJldkhhbmRyYWlsVGVtcFNoYXBlSWRzLmxlbmd0aCkge1xuICAgICAgICAgICAgYXBwVmlldy5jbGVhclRlbXBvcmFyeVNoYXBlc0J5SWRzKHByZXZIYW5kcmFpbFRlbXBTaGFwZUlkcyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaGFuZHJhaWxzID0gKF9iID0gdGhpcy5oYW5kcmFpbENvbGxlY3Rpb24pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5oYW5kcmFpbHM7XG4gICAgICAgIGNvbnN0IHRlbXBMaW5lUG9pbnRzID0gW107XG4gICAgICAgIGlmICh0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbiAmJiAoaGFuZHJhaWxzID09PSBudWxsIHx8IGhhbmRyYWlscyA9PT0gdm9pZCAwID8gdm9pZCAwIDogaGFuZHJhaWxzLmxlbmd0aCkpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgeyByYWlsLCBjb2x1bW5zIH0gb2YgaGFuZHJhaWxzKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByYWlsLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByYWlsUG9pbnQgPSByYWlsW2ldO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByYWlsTmV4dFBvaW50ID0gcmFpbFtpICsgMV07XG4gICAgICAgICAgICAgICAgICAgIHRlbXBMaW5lUG9pbnRzLnB1c2goW3JhaWxQb2ludCwgcmFpbE5leHRQb2ludF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0ZW1wTGluZVBvaW50cy5wdXNoKC4uLmNvbHVtbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaGFuZHJhaWxUZW1wU2hhcGVJZHMgPSBhcHBWaWV3LmRyYXdQb2x5bGluZXModGVtcExpbmVQb2ludHMsIHsgY29sb3I6IFRlbXBMaW5lQ29sb3JzLkhhbmRyYWlsLCBkZXB0aFRlc3Q6IGZhbHNlLCBwYXR0ZXJuOiBUZW1wTGluZVBhdHRlcm5zLkhhbmRyYWlsIH0pO1xuICAgICAgICAgICAgaWYgKGhhbmRyYWlsVGVtcFNoYXBlSWRzID09PSBudWxsIHx8IGhhbmRyYWlsVGVtcFNoYXBlSWRzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBoYW5kcmFpbFRlbXBTaGFwZUlkcy5pZHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbi50ZW1wU2hhcGVJZCA9IGhhbmRyYWlsVGVtcFNoYXBlSWRzLmlkcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjbGVhclRlbXBTaGFwZXModGhlU2VnbWVudCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICh0aGVTZWdtZW50KSB7XG4gICAgICAgICAgICBpZiAoKF9hID0gdGhlU2VnbWVudC50ZW1wU2hhcGVJZCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGFwcFZpZXcuY2xlYXJUZW1wb3JhcnlTaGFwZXNCeUlkcyh0aGVTZWdtZW50LnRlbXBTaGFwZUlkKTtcbiAgICAgICAgICAgICAgICB0aGVTZWdtZW50LnRlbXBTaGFwZUlkID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhcHBWaWV3LmNsZWFyVGVtcG9yYXJ5U2hhcGVzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9jdXNDb21wb25lbnQoY29tcG9uZW50SW5kZXgpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgIGlmIChjb21wb25lbnRJbmRleCA9PT0gdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RTZWdtZW50ID0gdGhpcy5zZWdtZW50c1t0aGlzLnNlZ21lbnRzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgY29uc3QgbGFzdFNlZ21lbnRJbmRleCA9IGxhc3RTZWdtZW50LnBhcmFtLmluZGV4O1xuICAgICAgICAgICAgLy8gaWYgKGNvbXBvbmVudEluZGV4ICE9PSB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCkge1xuICAgICAgICAgICAgY29uc3QgbmV3Rm9jdXNlZFNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleCh0aGlzLnNlZ21lbnRzLCBjb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICBjb25zdCBvbGRGb2N1c2VkU2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHRoaXMuc2VnbWVudHMsIHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgIGlmIChuZXdGb2N1c2VkU2VnbWVudCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYXdpbmcgJiYgIWxhc3RTZWdtZW50LmVuZExvY2tlZCAmJiBjb21wb25lbnRJbmRleCAhPT0gbGFzdFNlZ21lbnRJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHBhcmFtOiB7IHR5cGU6IG5ld0ZvY3VzZWRUeXBlIH0sIG1vbGRTaGFwZTogeyB2ZXJ0aWNlczogbmV3Rm9jdXNlZFZlcnRpY2VzLCB0ZW1wTGluZXM6IG5ld0ZvY3VzZWRUZW1wTGluZXMgfSB9ID0gbmV3Rm9jdXNlZFNlZ21lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgc3RhcnQgfSA9IGxhc3RTZWdtZW50O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyUGlja1N0YXJ0VGVtcFNoYXBlcyhsYXN0U2VnbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdGb2N1c2VkVHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhclRlbXBTaGFwZXMobGFzdFNlZ21lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RTZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjYWNoZWRJbmRleCA9IGxhc3RTZWdtZW50LnBhcmFtLmluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LnBhcmFtID0gZ2V0TmV3Q29tcG9uZW50UGFyYW0oQ2FjaGVTZXR0aW5ncy5zdGFpclR5cGUsIG5ld0ZvY3VzZWRTZWdtZW50LCB0aGlzLnN0YWlyUGFyYW0udXB3YXJkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5wYXJhbS5pbmRleCA9IGNhY2hlZEluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuUGFyYW1DaGFuZ2VkQnlEcmF3LCBjb21wb25lbnRQYXJhbTogT2JqZWN0LmFzc2lnbih7fSwgbGFzdFNlZ21lbnQucGFyYW0pIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2xkRm9jdXNlZFNlZ21lbnQgJiYgb2xkRm9jdXNlZFNlZ21lbnQgIT09IG5ld0ZvY3VzZWRTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2xkRm9jdXNlZFNlZ21lbnQubmV4dENvbXBvbmVudHMuZm9yRWFjaChpbmRzID0+IGluZHMuZGVsZXRlKGxhc3RTZWdtZW50LnBhcmFtLmluZGV4KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKChfYSA9IGxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5saW5lM2RJbmRleCkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5ld0ZvY3VzZWRTZWdtZW50Lm5leHRDb21wb25lbnRzLmZvckVhY2goaW5kcyA9PiBpbmRzLmRlbGV0ZShsYXN0U2VnbWVudC5wYXJhbS5pbmRleCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgodGhpcy5zZWdtZW50cywgbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhc2VTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhc2VTZWdtZW50Lm5leHRDb21wb25lbnRzLmZvckVhY2goaW5kcyA9PiBpbmRzLmRlbGV0ZShsYXN0U2VnbWVudC5wYXJhbS5pbmRleCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjbG9zZXN0UG9pbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWluRGlzdGFuY2UgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3Rm9jdXNlZFRlbXBMaW5lcy5mb3JFYWNoKChsaW5lLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHN0YXJ0SW5kID0gY29tcG9uZW50RGlyZWN0aW9uVHlwZSA9PT0gQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5SaWdodEZyb250ICYmIG5ld0ZvY3VzZWRUZW1wTGluZXMubGVuZ3RoID4gNCA/IDEgOiAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIChpbmRleCA9PT0gc3RhcnRJbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsaW5lU2VnM2QgPSBHZW9tTGliLmNyZWF0ZUxpbmVTZWdtZW50M2QobmV3Rm9jdXNlZFZlcnRpY2VzW2xpbmVbMF1dLCBuZXdGb2N1c2VkVmVydGljZXNbbGluZVsxXV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoZVBvaW50ID0gbGluZVNlZzNkLmdldENsb3Nlc3RQb2ludChzdGFydCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyRGlzdGFuY2UgPSB0aGVQb2ludC5kaXN0YW5jZVRvKHN0YXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNsb3Nlc3RQb2ludCB8fCBjdXJEaXN0YW5jZSA8IG1pbkRpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbkRpc3RhbmNlID0gY3VyRGlzdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RQb2ludCA9IHRoZVBvaW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5zdGFydCA9IGNsb3Nlc3RQb2ludDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGFzdFNlZ21lbnQuYmFzZUxpbmVTZWczZCA9IHsgc3RhcnQ6IG5ld0ZvY3VzZWRWZXJ0aWNlc1tsaW5lWzBdXSwgZW5kOiBuZXdGb2N1c2VkVmVydGljZXNbbGluZVsxXV0gfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudCA9IHsgY29tcG9uZW50SW5kZXg6IG5ld0ZvY3VzZWRTZWdtZW50LnBhcmFtLmluZGV4LCBsaW5lM2RJbmRleDogaW5kZXgsIGxpbmUzZDogeyBzdGFydDogbmV3Rm9jdXNlZFZlcnRpY2VzW2xpbmVbMF1dLCBlbmQ6IG5ld0ZvY3VzZWRWZXJ0aWNlc1tsaW5lWzFdXSB9IH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKChfYiA9IGxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5saW5lM2RJbmRleCkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0ZvY3VzZWRTZWdtZW50Lm5leHRDb21wb25lbnRzW2xhc3RTZWdtZW50LmJhc2VDb21wb25lbnQubGluZTNkSW5kZXhdLmFkZChsYXN0U2VnbWVudC5wYXJhbS5pbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5zdGFydExvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuY2lyY2xlVGFuZ2VudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LnN0YXJ0SGVpZ2h0ID0gbmV3Rm9jdXNlZFNlZ21lbnQuZW5kSGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3UGlja1N0YXJ0VGVtcFNoYXBlcyhzdGFydCwgbGFzdFNlZ21lbnQuc3RhcnQsIGxhc3RTZWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbmV3Rm9jdXNlZFNlZ21lbnQubmV4dENvbXBvbmVudHNbMF0uc2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuY2xlYXJUZW1wU2hhcGVzKGxhc3RTZWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2xkRm9jdXNlZFNlZ21lbnQgJiYgb2xkRm9jdXNlZFNlZ21lbnQgIT09IG5ld0ZvY3VzZWRTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9sZEZvY3VzZWRTZWdtZW50Lm5leHRDb21wb25lbnRzLmZvckVhY2goaW5kcyA9PiBpbmRzLmRlbGV0ZShsYXN0U2VnbWVudC5wYXJhbS5pbmRleCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKChfYyA9IGxhc3RTZWdtZW50LmJhc2VDb21wb25lbnQpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5saW5lM2RJbmRleCkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXdGb2N1c2VkU2VnbWVudC5uZXh0Q29tcG9uZW50cy5mb3JFYWNoKGluZHMgPT4gaW5kcy5kZWxldGUobGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFzZVNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleCh0aGlzLnNlZ21lbnRzLCBsYXN0U2VnbWVudC5iYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhc2VTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXNlU2VnbWVudC5uZXh0Q29tcG9uZW50cy5mb3JFYWNoKGluZHMgPT4gaW5kcy5kZWxldGUobGFzdFNlZ21lbnQucGFyYW0uaW5kZXgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5zdGFydCA9IG5ld0ZvY3VzZWRTZWdtZW50LmVuZC5jbG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RTZWdtZW50LnN0YXJ0TG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0U2VnbWVudC5zdGFydEhlaWdodCA9IG5ld0ZvY3VzZWRTZWdtZW50LmVuZEhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsYXN0U2VnbWVudC5iYXNlTGluZVNlZzNkID0geyBzdGFydDogbmV3Rm9jdXNlZFZlcnRpY2VzW25ld0ZvY3VzZWRWZXJ0aWNlcy5sZW5ndGggLSAxXSwgZW5kOiBuZXdGb2N1c2VkVmVydGljZXNbbmV3Rm9jdXNlZFZlcnRpY2VzLmxlbmd0aCAtIDJdIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuYmFzZUNvbXBvbmVudCA9IHsgY29tcG9uZW50SW5kZXg6IG5ld0ZvY3VzZWRTZWdtZW50LnBhcmFtLmluZGV4LCBsaW5lM2RJbmRleDogMCwgbGluZTNkOiB7IHN0YXJ0OiBuZXdGb2N1c2VkVmVydGljZXNbbmV3Rm9jdXNlZFZlcnRpY2VzLmxlbmd0aCAtIDFdLCBlbmQ6IG5ld0ZvY3VzZWRWZXJ0aWNlc1tuZXdGb2N1c2VkVmVydGljZXMubGVuZ3RoIC0gMl0gfSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0ZvY3VzZWRTZWdtZW50Lm5leHRDb21wb25lbnRzWzBdLmFkZChsYXN0U2VnbWVudC5wYXJhbS5pbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFNlZ21lbnQuY2lyY2xlVGFuZ2VudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdUZW1wQ29tcG9uZW50KGxhc3RTZWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGxhc3RTZWdtZW50LnN0YXJ0TG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgbGFzdFNlZ21lbnQuY2lyY2xlVGFuZ2VudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoKHRoaXMuZHJhd2luZyAmJiBjb21wb25lbnRJbmRleCAhPT0gbGFzdFNlZ21lbnRJbmRleCkgfHwgIXRoaXMuZHJhd2luZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdUZW1wQ29tcG9uZW50KG5ld0ZvY3VzZWRTZWdtZW50LCB0aGlzLmRyYXdpbmcsIHRoaXMuZHJhd2luZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCgodGhpcy5kcmF3aW5nICYmIHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4ICE9PSBsYXN0U2VnbWVudEluZGV4KSB8fCAoIXRoaXMuZHJhd2luZyAmJiB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCAhPT0gY29tcG9uZW50SW5kZXgpKSAmJiBvbGRGb2N1c2VkU2VnbWVudCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYXdpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3VGVtcENvbXBvbmVudChvbGRGb2N1c2VkU2VnbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyVGVtcFNoYXBlcyhvbGRGb2N1c2VkU2VnbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggPSBjb21wb25lbnRJbmRleDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW1vdmVDb21wb25lbnQoY29tcG9uZW50SW5kZXgpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0aGVJbmRleCA9IHRoaXMuc2VnbWVudHMuZmluZEluZGV4KHNlZyA9PiBzZWcucGFyYW0uaW5kZXggPT09IGNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICBpZiAodGhlSW5kZXggPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVTZWdtZW50ID0gdGhpcy5zZWdtZW50c1t0aGVJbmRleF07XG4gICAgICAgICAgICAgICAgICAgIGxldCBvcGVyYXRpb25TdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVtb3ZlU2VnbWVudHMgPSB0aGlzLnNlZ21lbnRzLnNwbGljZSh0aGVJbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYXdpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoX2EgPSB0aGVTZWdtZW50LnRlbXBTaGFwZUlkKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwVmlldy5jbGVhclRlbXBvcmFyeVNoYXBlc0J5SWRzKHRoZVNlZ21lbnQudGVtcFNoYXBlSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3SGFuZHJhaWxzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5lZGl0TW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoZUluc3RhbmNlID0gdGhpcy5lZGl0TW9kZWwuc3RhaXJzLmdldChjb21wb25lbnRJbmRleCkgfHwgdGhpcy5lZGl0TW9kZWwucGxhdGZvcm1zLmdldChjb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbnN0YW5jZVBhdGggPSBkZXNpZ24uZ2V0RWRpdFBhdGhzVG9Hcm91cEluc3RhbmNlKHRoaXMuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhlSW5zdGFuY2UgJiYgaW5zdGFuY2VQYXRoLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBkZXNpZ24ucmVtb3ZlR3JvdXBJbnN0YW5jZSh0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2UpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICh5aWVsZCBkZXNpZ24uYWN0aXZhdGVFZGl0UGF0aChbLi4uaW5zdGFuY2VQYXRoWzBdLCB0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2VdKSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBkZXNpZ24ucmVtb3ZlR3JvdXBJbnN0YW5jZSh0aGVJbnN0YW5jZS5pbnN0YW5jZSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlSGFuZHJhaWxTaGFwZSh0aGlzLnN0YWlyUGFyYW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKF9iID0gdGhpcy5oYW5kcmFpbENvbGxlY3Rpb24pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5oYW5kcmFpbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lZGl0TW9kZWwuaGFuZHJhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBkZXNpZ24ucmVtb3ZlR3JvdXBJbnN0YW5jZSh0aGlzLmVkaXRNb2RlbC5oYW5kcmFpbC5oYW5kcmFpbEluc3RhbmNlLmluc3RhbmNlKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZWwuaGFuZHJhaWwgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYW5kcmFpbEluc3RhbmNlc0RhdGEgPSB5aWVsZCBidWlsZEhhbmRyYWlsSW5zdGFuY2UodGhpcy5zdGFpclBhcmFtLCAoX2MgPSB0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbikgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmhhbmRyYWlscywgdGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlLmdldFRyYW5zZm9ybSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGhhbmRyYWlsSW5zdGFuY2VzRGF0YSAhPT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhbmRyYWlsSW5zdGFuY2VzRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsLmhhbmRyYWlsID0gaGFuZHJhaWxJbnN0YW5jZXNEYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICh5aWVsZCBkZXNpZ24uYWN0aXZhdGVFZGl0UGF0aChpbnN0YW5jZVBhdGhbMF0pKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWl0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsLnN0YWlycy5kZWxldGUoY29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlbC5wbGF0Zm9ybXMuZGVsZXRlKGNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhckVkaXRNb2RlbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlZ21lbnRzLnNwbGljZSh0aGVJbmRleCwgMCwgLi4ucmVtb3ZlU2VnbWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYm9ydE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIW9wZXJhdGlvblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuRHJhd1N0YWlyTW9kZWxTZXR0bGVkLCBjb21wb25lbnRQYXJhbXM6IHRoaXMuc2VnbWVudHMubWFwKHNlZyA9PiAoT2JqZWN0LmFzc2lnbih7fSwgc2VnLnBhcmFtKSkpLCBzdGFpclBhcmFtOiB0aGlzLnN0YWlyUGFyYW0sIGlzRHJhd2luZzogdGhpcy5kcmF3aW5nLCBmb2N1c2VkQ29tcG9uZW50SW5kZXg6IHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4LnRvU3RyaW5nKCkgfSwgJyonKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyB0byBjbGVhciByZWxhdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFzZUNvbXBvbmVudCA9IHRoZVNlZ21lbnQuYmFzZUNvbXBvbmVudDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFzZVNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleCh0aGlzLnNlZ21lbnRzLCBiYXNlQ29tcG9uZW50ID09PSBudWxsIHx8IGJhc2VDb21wb25lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJhc2VDb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYmFzZVNlZ21lbnQgJiYgKGJhc2VDb21wb25lbnQgPT09IG51bGwgfHwgYmFzZUNvbXBvbmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleCkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgdGhlSW5kID0gYmFzZVNlZ21lbnQubmV4dENvbXBvbmVudHNbYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleF0uZmluZEluZGV4KGkgPT4gaSA9PT0gdGhlU2VnbWVudC5wYXJhbS5pbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAodGhlSW5kID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhc2VTZWdtZW50Lm5leHRDb21wb25lbnRzW2Jhc2VDb21wb25lbnQubGluZTNkSW5kZXhdLmRlbGV0ZSh0aGVTZWdtZW50LnBhcmFtLmluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0Q29tcG9uZW50cyA9IHRoZVNlZ21lbnQubmV4dENvbXBvbmVudHM7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbmV4dFNlZ21lbnRJbmRzIG9mIG5leHRDb21wb25lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFNlZ21lbnRJbmRzLnNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG5leHRTZWdJbmQgb2YgbmV4dFNlZ21lbnRJbmRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgodGhpcy5zZWdtZW50cywgbmV4dFNlZ0luZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0U2VnbWVudCAmJiBuZXh0U2VnbWVudC5iYXNlQ29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U2VnbWVudC5iYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFNlZ21lbnQuYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCA9PT0gY29tcG9uZW50SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzZWRDb21wb25lbnRJbmRleCA9IHRoaXMuc2VnbWVudHNbdGhpcy5zZWdtZW50cy5sZW5ndGggLSAxXS5wYXJhbS5pbmRleDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgb25NYXRlcmlhbFJlcGxhY2VDbGljayhjaGFuZ2VQYXJhbVR5cGUsIGluZGV4KSB7XG4gICAgICAgIGFwcC5nZXRBcHBsaWNhdGlvblVJKCkudG9nZ2xlTWF0ZXJpYWxSZXBsYWNlUGFuZWwodHJ1ZSwgdGhpcy5vbk1hdGVyaWFsUmVwbGFjZUl0ZW1DbGljayhjaGFuZ2VQYXJhbVR5cGUsIGluZGV4KSk7XG4gICAgfVxuICAgIGNoYW5nZVN0YWlyUGFyYW0oc3RhaXJQYXJhbSwgY2hhbmdlUGFyYW1UeXBlcykge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oO1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgLy8gdGhpcy5zdGFpclBhcmFtID0gc3RhaXJQYXJhbVxuICAgICAgICAgICAgaWYgKCF0aGlzLnNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGluc3RhbmNlUGF0aCA9IHRoaXMuZWRpdE1vZGVsID8gZGVzaWduLmdldEVkaXRQYXRoc1RvR3JvdXBJbnN0YW5jZSh0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2UpIDogW107XG4gICAgICAgICAgICBjb25zdCBsYXN0U2VnbWVudCA9IHRoaXMuc2VnbWVudHNbdGhpcy5zZWdtZW50cy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGxldCBzdGFpclByYW1TdHJpbmcgPSAnJztcbiAgICAgICAgICAgIGlmIChjaGFuZ2VQYXJhbVR5cGVzLmluZGV4T2YoQ29tcG9uZW50UGFyYW1UeXBlLldpZHRoUHJvcG9ydGlvbmFsKSA+IC0xIHx8IGNoYW5nZVBhcmFtVHlwZXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuU3RlcFByb3BvcnRpb25hbCkgPiAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhaXJQYXJhbSA9IHN0YWlyUGFyYW07XG4gICAgICAgICAgICAgICAgRGVmYXVsdFN0YWlyUGFyYW0uc3RlcFByb3BvcnRpb25hbCA9IHN0YWlyUGFyYW0uc3RlcFByb3BvcnRpb25hbDtcbiAgICAgICAgICAgICAgICBEZWZhdWx0U3RhaXJQYXJhbS53aWR0aFByb3BvcnRpb25hbCA9IHN0YWlyUGFyYW0ud2lkdGhQcm9wb3J0aW9uYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaGFuZ2VQYXJhbVR5cGVzLmluZGV4T2YoQ29tcG9uZW50UGFyYW1UeXBlLkhvcml6b250YWxTdGVwKSA+IC0xIHx8IGNoYW5nZVBhcmFtVHlwZXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuVmVydGljYWxTdGVwKSA+IC0xIHx8XG4gICAgICAgICAgICAgICAgY2hhbmdlUGFyYW1UeXBlcy5pbmRleE9mKENvbXBvbmVudFBhcmFtVHlwZS5TdGFydFdpZHRoKSA+IC0xIHx8IGNoYW5nZVBhcmFtVHlwZXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuRW5kV2lkdGgpID4gLTEgfHxcbiAgICAgICAgICAgICAgICBjaGFuZ2VQYXJhbVR5cGVzLmluZGV4T2YoQ29tcG9uZW50UGFyYW1UeXBlLlVwd2FyZCkgPiAtMSB8fFxuICAgICAgICAgICAgICAgIGNoYW5nZVBhcmFtVHlwZXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuUGxhdGZvcm1UaGlja25lc3MpID4gLTEpIHtcbiAgICAgICAgICAgICAgICBsZXQgcmVHZW5lcmF0ZVNlZ21lbnRzID0gdGhpcy5zZWdtZW50cztcbiAgICAgICAgICAgICAgICBpZiAoY2hhbmdlUGFyYW1UeXBlcy5pbmRleE9mKENvbXBvbmVudFBhcmFtVHlwZS5VcHdhcmQpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgRGVmYXVsdFN0YWlyUGFyYW0udXB3YXJkID0gc3RhaXJQYXJhbS51cHdhcmQ7XG4gICAgICAgICAgICAgICAgICAgIERlZmF1bHRDb21wb25lbnRQYXJhbS51cHdhcmQgPSBzdGFpclBhcmFtLnVwd2FyZDtcbiAgICAgICAgICAgICAgICAgICAgcmVHZW5lcmF0ZVNlZ21lbnRzID0gY2hhbmdlU3RhaXJVcHdhcmQocmVHZW5lcmF0ZVNlZ21lbnRzWzBdLCByZUdlbmVyYXRlU2VnbWVudHMsIHN0YWlyUGFyYW0udXB3YXJkLCB0cnVlKSB8fCByZUdlbmVyYXRlU2VnbWVudHM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoYW5nZVBhcmFtVHlwZXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuSG9yaXpvbnRhbFN0ZXApID4gLTEgfHwgY2hhbmdlUGFyYW1UeXBlcy5pbmRleE9mKENvbXBvbmVudFBhcmFtVHlwZS5WZXJ0aWNhbFN0ZXApID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgRGVmYXVsdFN0YWlyUGFyYW0uaG9yaXpvbnRhbFN0ZXAgPSBzdGFpclBhcmFtLmhvcml6b250YWxTdGVwO1xuICAgICAgICAgICAgICAgICAgICBEZWZhdWx0U3RhaXJQYXJhbS52ZXJ0aWNhbFN0ZXAgPSBzdGFpclBhcmFtLnZlcnRpY2FsU3RlcDtcbiAgICAgICAgICAgICAgICAgICAgRGVmYXVsdENvbXBvbmVudFBhcmFtLmhvcml6b250YWxTdGVwID0gc3RhaXJQYXJhbS5ob3Jpem9udGFsU3RlcDtcbiAgICAgICAgICAgICAgICAgICAgRGVmYXVsdENvbXBvbmVudFBhcmFtLnZlcnRpY2FsU3RlcCA9IHN0YWlyUGFyYW0udmVydGljYWxTdGVwO1xuICAgICAgICAgICAgICAgICAgICByZUdlbmVyYXRlU2VnbWVudHMgPSBjaGFuZ2VTdGFpclN0ZXAocmVHZW5lcmF0ZVNlZ21lbnRzWzBdLCB0aGlzLnNlZ21lbnRzLCBzdGFpclBhcmFtLmhvcml6b250YWxTdGVwLCBzdGFpclBhcmFtLnZlcnRpY2FsU3RlcCwgdHJ1ZSwgZmFsc2UpIHx8IHJlR2VuZXJhdGVTZWdtZW50cztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hhbmdlUGFyYW1UeXBlcy5pbmRleE9mKENvbXBvbmVudFBhcmFtVHlwZS5QbGF0Zm9ybVRoaWNrbmVzcykgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICBEZWZhdWx0U3RhaXJQYXJhbS5wbGF0Zm9ybVRoaWNrbmVzcyA9IHN0YWlyUGFyYW0ucGxhdGZvcm1UaGlja25lc3M7XG4gICAgICAgICAgICAgICAgICAgIERlZmF1bHRDb21wb25lbnRQYXJhbS5wbGF0Zm9ybVRoaWNrbmVzcyA9IHN0YWlyUGFyYW0ucGxhdGZvcm1UaGlja25lc3M7XG4gICAgICAgICAgICAgICAgICAgIHJlR2VuZXJhdGVTZWdtZW50cyA9IHRoaXMuc2VnbWVudHMuZmlsdGVyKHNlZyA9PiBzZWcucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlUGFyYW1UeXBlcy5pbmRleE9mKENvbXBvbmVudFBhcmFtVHlwZS5TdGFydFdpZHRoKSA+IC0xIHx8IGNoYW5nZVBhcmFtVHlwZXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuRW5kV2lkdGgpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIERlZmF1bHRTdGFpclBhcmFtLnN0YXJ0V2lkdGggPSBzdGFpclBhcmFtLnN0YXJ0V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBEZWZhdWx0U3RhaXJQYXJhbS5lbmRXaWR0aCA9IHN0YWlyUGFyYW0uZW5kV2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBEZWZhdWx0Q29tcG9uZW50UGFyYW0uc3RhcnRXaWR0aCA9IHN0YWlyUGFyYW0uc3RhcnRXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIERlZmF1bHRDb21wb25lbnRQYXJhbS5lbmRXaWR0aCA9IHN0YWlyUGFyYW0uZW5kV2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVHZW5lcmF0ZVNlZ21lbnRzID0gdGhpcy5zZWdtZW50cy5maWx0ZXIoc2VnID0+IHNlZy5wYXJhbS50eXBlICE9PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHJlR2VuZXJhdGVTZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCByZUdlbmVyYXRlU2VnbWVudCBvZiByZUdlbmVyYXRlU2VnbWVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgY2hhbmdlUGFyYW1UeXBlIG9mIGNoYW5nZVBhcmFtVHlwZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZUdlbmVyYXRlU2VnbWVudC5wYXJhbVtjaGFuZ2VQYXJhbVR5cGVdID0gc3RhaXJQYXJhbVtjaGFuZ2VQYXJhbVR5cGVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudFRyYW5zZm9ybSA9IHRoaXMuZWRpdE1vZGVsID8gdGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlLmdldFRyYW5zZm9ybSgpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvbGRTdGFpclBhcmFtID0gdGhpcy5zdGFpclBhcmFtO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvbGRDb21wb25lbnRQYXJhbXMgPSBuZXcgTWFwKHJlR2VuZXJhdGVTZWdtZW50cy5tYXAoc2VnID0+IChbc2VnLnBhcmFtLmluZGV4LCBPYmplY3QuYXNzaWduKHt9LCBzZWcucGFyYW0pXSkpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFpclBhcmFtID0gc3RhaXJQYXJhbTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9wZXJhdGlvblN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZHJhd2luZyAmJiB0aGlzLmVkaXRNb2RlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyUHJhbVN0cmluZyA9IHN0cmluZ2lmeVN0YWlyUGFyYW0oc3RhaXJQYXJhbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAhISgoX2EgPSB0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zZXRDdXN0b21Qcm9wZXJ0eShTdGFpclBhcmFtS2V5LCBzdGFpclByYW1TdHJpbmcpLmlzU3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2VQYXRoLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICh5aWVsZCBkZXNpZ24uYWN0aXZhdGVFZGl0UGF0aChbLi4uaW5zdGFuY2VQYXRoWzBdLCB0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2VdKSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcmVHZW5lcmF0ZVNlZ21lbnQgb2YgcmVHZW5lcmF0ZVNlZ21lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlUGFyYW1UeXBlcy5sZW5ndGggPT09IDEgJiYgY2hhbmdlUGFyYW1UeXBlc1swXSA9PT0gQ29tcG9uZW50UGFyYW1UeXBlLlBsYXRmb3JtVGhpY2tuZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVHZW5lcmF0ZVNlZ21lbnQucGFyYW0ucGxhdGZvcm1UaGlja25lc3MgPSB0aGlzLnN0YWlyUGFyYW0ucGxhdGZvcm1UaGlja25lc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGNoYW5nZVBhcmFtVHlwZSBvZiBjaGFuZ2VQYXJhbVR5cGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlR2VuZXJhdGVTZWdtZW50LnBhcmFtW2NoYW5nZVBhcmFtVHlwZV0gPSB0aGlzLnN0YWlyUGFyYW1bY2hhbmdlUGFyYW1UeXBlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kcmF3aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zdGFpclBhcmFtID0gc3RhaXJQYXJhbTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdUZW1wQ29tcG9uZW50KHJlR2VuZXJhdGVTZWdtZW50LCByZUdlbmVyYXRlU2VnbWVudC5wYXJhbS5pbmRleCA9PT0gdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggJiYgcmVHZW5lcmF0ZVNlZ21lbnQucGFyYW0uaW5kZXggIT09IGxhc3RTZWdtZW50LnBhcmFtLmluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZWRpdE1vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBwYXJhbTogeyBpbmRleCwgdHlwZSB9IH0gPSByZUdlbmVyYXRlU2VnbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVJbnN0YW5jZSA9IHRoaXMuZWRpdE1vZGVsLnN0YWlycy5nZXQoaW5kZXgpIHx8IHRoaXMuZWRpdE1vZGVsLnBsYXRmb3Jtcy5nZXQoaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGVJbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlU2VnbWVudFNoYXBlKHJlR2VuZXJhdGVTZWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlTWVzaGVzID0gZ2VuZXJhdGVNZXNoZXMoW3JlR2VuZXJhdGVTZWdtZW50XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGVNZXNoZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGRlc2lnbi5yZW1vdmVHcm91cEluc3RhbmNlKHRoZUluc3RhbmNlLmluc3RhbmNlKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3SW5zdGFuY2UgPSBidWlsZENvbXBvbmVudEluc3RhbmNlKHJlR2VuZXJhdGVTZWdtZW50LCB0aGlzLnNlZ21lbnRzLCBwYXJlbnRUcmFuc2Zvcm0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAhIW5ld0luc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3SW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZWwucGxhdGZvcm1zLnNldChpbmRleCwgeyBpbnN0YW5jZTogbmV3SW5zdGFuY2UsIGRlZmluaXRpb25LZXk6ICgoX2IgPSBuZXdJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmdldEtleSgpKSB8fCAnJywgaW5zdGFuY2VLZXk6IG5ld0luc3RhbmNlLmdldEtleSgpIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZWwuc3RhaXJzLnNldChpbmRleCwgeyBpbnN0YW5jZTogbmV3SW5zdGFuY2UsIGRlZmluaXRpb25LZXk6ICgoX2MgPSBuZXdJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmdldEtleSgpKSB8fCAnJywgaW5zdGFuY2VLZXk6IG5ld0luc3RhbmNlLmdldEtleSgpIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZHJhd2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3SGFuZHJhaWxzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlN0YWlyUGFyYW1DaGFuZ2VkQnlEcmF3LCBzdGFpclBhcmFtOiB0aGlzLnN0YWlyUGFyYW0sIGNvbXBvbmVudFBhcmFtczogdGhpcy5zZWdtZW50cy5tYXAoc2VnID0+IChPYmplY3QuYXNzaWduKHt9LCBzZWcucGFyYW0pKSkgfSwgJyonKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICghdGhpcy5kcmF3aW5nICYmIHRoaXMuZWRpdE1vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlSGFuZHJhaWxTaGFwZShzdGFpclBhcmFtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoX2QgPSB0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbikgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLmhhbmRyYWlscy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lZGl0TW9kZWwuaGFuZHJhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZGVzaWduLnJlbW92ZUdyb3VwSW5zdGFuY2UodGhpcy5lZGl0TW9kZWwuaGFuZHJhaWwuaGFuZHJhaWxJbnN0YW5jZS5pbnN0YW5jZSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlbC5oYW5kcmFpbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFuZHJhaWxJbnN0YW5jZXNEYXRhID0geWllbGQgYnVpbGRIYW5kcmFpbEluc3RhbmNlKHN0YWlyUGFyYW0sIChfZSA9IHRoaXMuaGFuZHJhaWxDb2xsZWN0aW9uKSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2UuaGFuZHJhaWxzLCB0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2UuZ2V0VHJhbnNmb3JtKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGhhbmRyYWlsSW5zdGFuY2VzRGF0YSAhPT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoYW5kcmFpbEluc3RhbmNlc0RhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZWwuaGFuZHJhaWwgPSBoYW5kcmFpbEluc3RhbmNlc0RhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlUGF0aC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAoeWllbGQgZGVzaWduLmFjdGl2YXRlRWRpdFBhdGgoaW5zdGFuY2VQYXRoWzBdKSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyZW50SW5zdGFuY2UgPSB0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1pdE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc3RhaXJQYXJhbSA9IHN0YWlyUGFyYW07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5TdGFpclBhcmFtQ2hhbmdlZEJ5RHJhdywgc3RhaXJQYXJhbTogdGhpcy5zdGFpclBhcmFtLCBjb21wb25lbnRQYXJhbXM6IHRoaXMuc2VnbWVudHMubWFwKHNlZyA9PiAoT2JqZWN0LmFzc2lnbih7fSwgc2VnLnBhcmFtKSkpIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYm9ydE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhaXJQYXJhbSA9IG9sZFN0YWlyUGFyYW07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBzZWdtZW50IG9mIHJlR2VuZXJhdGVTZWdtZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvbGRTZWdtZW50UGFyYW0gPSBvbGRDb21wb25lbnRQYXJhbXMuZ2V0KHNlZ21lbnQucGFyYW0uaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2xkU2VnbWVudFBhcmFtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50LnBhcmFtID0gb2xkU2VnbWVudFBhcmFtO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuU3RhaXJQYXJhbUNoYW5nZWRCeURyYXcsIHN0YWlyUGFyYW06IHRoaXMuc3RhaXJQYXJhbSB9LCAnKicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uLmFkZChbcGFyZW50SW5zdGFuY2VdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoYW5nZVBhcmFtVHlwZXMubGVuZ3RoID09PSAxICYmIGNoYW5nZVBhcmFtVHlwZXNbMF0uc3RhcnRzV2l0aChDb21wb25lbnRQYXJhbVR5cGUuSGFuZHJhaWwpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZHJhd2luZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWlyUGFyYW0gPSBzdGFpclBhcmFtO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdIYW5kcmFpbHMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5lZGl0TW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUhhbmRyYWlsU2hhcGUoc3RhaXJQYXJhbSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBvcGVyYXRpb25TdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgc3RhaXJQcmFtU3RyaW5nID0gc3RyaW5naWZ5U3RhaXJQYXJhbShzdGFpclBhcmFtKTtcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgISEoKF9mID0gdGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpKSA9PT0gbnVsbCB8fCBfZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Yuc2V0Q3VzdG9tUHJvcGVydHkoU3RhaXJQYXJhbUtleSwgc3RhaXJQcmFtU3RyaW5nKS5pc1N1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2VQYXRoLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKHlpZWxkIGRlc2lnbi5hY3RpdmF0ZUVkaXRQYXRoKFsuLi5pbnN0YW5jZVBhdGhbMF0sIHRoaXMuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZV0pKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZWRpdE1vZGVsLmhhbmRyYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBkZXNpZ24ucmVtb3ZlR3JvdXBJbnN0YW5jZSh0aGlzLmVkaXRNb2RlbC5oYW5kcmFpbC5oYW5kcmFpbEluc3RhbmNlLmluc3RhbmNlKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlbC5oYW5kcmFpbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoKF9nID0gdGhpcy5oYW5kcmFpbENvbGxlY3Rpb24pID09PSBudWxsIHx8IF9nID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZy5oYW5kcmFpbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYW5kcmFpbEluc3RhbmNlc0RhdGEgPSB5aWVsZCBidWlsZEhhbmRyYWlsSW5zdGFuY2Uoc3RhaXJQYXJhbSwgKF9oID0gdGhpcy5oYW5kcmFpbENvbGxlY3Rpb24pID09PSBudWxsIHx8IF9oID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfaC5oYW5kcmFpbHMsIHRoaXMuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZS5nZXRUcmFuc2Zvcm0oKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBoYW5kcmFpbEluc3RhbmNlc0RhdGEgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoYW5kcmFpbEluc3RhbmNlc0RhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlbC5oYW5kcmFpbCA9IGhhbmRyYWlsSW5zdGFuY2VzRGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2VQYXRoLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKHlpZWxkIGRlc2lnbi5hY3RpdmF0ZUVkaXRQYXRoKFsuLi5pbnN0YW5jZVBhdGhbMF1dKSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudEluc3RhbmNlID0gdGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWl0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWlyUGFyYW0gPSBzdGFpclBhcmFtO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5TdGFpclBhcmFtQ2hhbmdlZEJ5RHJhdywgc3RhaXJQYXJhbTogdGhpcy5zdGFpclBhcmFtIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhYm9ydE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5TdGFpclBhcmFtQ2hhbmdlZEJ5RHJhdywgc3RhaXJQYXJhbTogdGhpcy5zdGFpclBhcmFtIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uLmFkZChbcGFyZW50SW5zdGFuY2VdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghc3RhaXJQYXJhbS5zdGFpck1hdGVyaWFsICYmIGNoYW5nZVBhcmFtVHlwZXMubGVuZ3RoID09PSAwICYmIGNoYW5nZVBhcmFtVHlwZXNbMF0gPT09IENvbXBvbmVudFBhcmFtVHlwZS5TdGFpck1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgeWllbGQgdGhpcy5vbk1hdGVyaWFsUmVwbGFjZUl0ZW1DbGljayhjaGFuZ2VQYXJhbVR5cGVzWzBdLCB1bmRlZmluZWQsIHRydWUpKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghc3RhaXJQYXJhbS5wbGF0Zm9ybU1hdGVyaWFsICYmIGNoYW5nZVBhcmFtVHlwZXMubGVuZ3RoID09PSAwICYmIGNoYW5nZVBhcmFtVHlwZXNbMF0gPT09IENvbXBvbmVudFBhcmFtVHlwZS5QbGF0Zm9ybUxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMub25NYXRlcmlhbFJlcGxhY2VJdGVtQ2xpY2soY2hhbmdlUGFyYW1UeXBlc1swXSwgdW5kZWZpbmVkLCB0cnVlKSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXN0YWlyUGFyYW0uaGFuZHJhaWwucmFpbC5tYXRlcmlhbCAmJiBjaGFuZ2VQYXJhbVR5cGVzLmxlbmd0aCA9PT0gMCAmJiBjaGFuZ2VQYXJhbVR5cGVzWzBdID09PSBDb21wb25lbnRQYXJhbVR5cGUuSGFuZHJhaWxSYWlsTWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLm9uTWF0ZXJpYWxSZXBsYWNlSXRlbUNsaWNrKGNoYW5nZVBhcmFtVHlwZXNbMF0sIHVuZGVmaW5lZCwgdHJ1ZSkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCFzdGFpclBhcmFtLmhhbmRyYWlsLmNvbHVtbi5tYXRlcmlhbCAmJiBjaGFuZ2VQYXJhbVR5cGVzLmxlbmd0aCA9PT0gMCAmJiBjaGFuZ2VQYXJhbVR5cGVzWzBdID09PSBDb21wb25lbnRQYXJhbVR5cGUuSGFuZHJhaWxDb2x1bW5NYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMub25NYXRlcmlhbFJlcGxhY2VJdGVtQ2xpY2soY2hhbmdlUGFyYW1UeXBlc1swXSwgdW5kZWZpbmVkLCB0cnVlKSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY2hhbmdlQ29tcG9uZW50UGFyYW0oY29tcG9uZW50UGFyYW0sIGNoYW5nZVBhcmFtVHlwZXMpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZTtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zZWdtZW50cy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgdGhlU2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHRoaXMuc2VnbWVudHMsIGNvbXBvbmVudFBhcmFtLmluZGV4KTtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RTZWdtZW50ID0gdGhpcy5zZWdtZW50c1t0aGlzLnNlZ21lbnRzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgaWYgKHRoZVNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnRQYXJhbS5tb2RlbEVkaXRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIC8vIHRoZVNlZ21lbnQucGFyYW0gPSBjb21wb25lbnRQYXJhbTtcbiAgICAgICAgICAgICAgICBpZiAoIWlzQ2lyY3VsYXJTdGFpcih0aGVTZWdtZW50KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGVTZWdtZW50LmNpcmNsZVRhbmdlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VQYXJhbVR5cGVzLmxlbmd0aCA9PT0gMCAmJiBjaGFuZ2VQYXJhbVR5cGVzWzBdID09PSBDb21wb25lbnRQYXJhbVR5cGUuQ29tcG9uZW50TWF0ZXJpYWwgJiYgIWNvbXBvbmVudFBhcmFtLm1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25NYXRlcmlhbFJlcGxhY2VJdGVtQ2xpY2soY2hhbmdlUGFyYW1UeXBlc1swXSwgY29tcG9uZW50UGFyYW0uaW5kZXgsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGFuZ2VQYXJhbVR5cGVzLmxlbmd0aCA9PT0gMSAmJiAoY2hhbmdlUGFyYW1UeXBlc1swXSA9PT0gQ29tcG9uZW50UGFyYW1UeXBlLlN0ZXBQcm9wb3J0aW9uYWwgfHxcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlUGFyYW1UeXBlc1swXSA9PT0gQ29tcG9uZW50UGFyYW1UeXBlLldpZHRoUHJvcG9ydGlvbmFsKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGVTZWdtZW50LnBhcmFtID0gY29tcG9uZW50UGFyYW07XG4gICAgICAgICAgICAgICAgICAgIERlZmF1bHRDb21wb25lbnRQYXJhbS5zdGVwUHJvcG9ydGlvbmFsID0gY29tcG9uZW50UGFyYW0uc3RlcFByb3BvcnRpb25hbDtcbiAgICAgICAgICAgICAgICAgICAgRGVmYXVsdENvbXBvbmVudFBhcmFtLndpZHRoUHJvcG9ydGlvbmFsID0gY29tcG9uZW50UGFyYW0ud2lkdGhQcm9wb3J0aW9uYWw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VnbWVudHMuZm9yRWFjaChzZWcgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VnLnBhcmFtLnN0ZXBQcm9wb3J0aW9uYWwgPSBjb21wb25lbnRQYXJhbS5zdGVwUHJvcG9ydGlvbmFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VnLnBhcmFtLndpZHRoUHJvcG9ydGlvbmFsID0gY29tcG9uZW50UGFyYW0ud2lkdGhQcm9wb3J0aW9uYWw7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGFuZ2VQYXJhbVR5cGVzWzBdID09PSBDb21wb25lbnRQYXJhbVR5cGUuUGxhdGZvcm1MZW5ndGhMb2NrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhlU2VnbWVudC5wYXJhbSA9IGNvbXBvbmVudFBhcmFtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2xkUGFyYW0gPSB0aGVTZWdtZW50LnBhcmFtO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVHZW5lcmF0ZVNlZ21lbnRzID0gW3RoZVNlZ21lbnRdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlUGFyYW1UeXBlcy5pbmRleE9mKENvbXBvbmVudFBhcmFtVHlwZS5VcHdhcmQpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIERlZmF1bHRTdGFpclBhcmFtLnVwd2FyZCA9IGNvbXBvbmVudFBhcmFtLnVwd2FyZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlR2VuZXJhdGVTZWdtZW50cyA9IGNoYW5nZVN0YWlyVXB3YXJkKHRoZVNlZ21lbnQsIHRoaXMuc2VnbWVudHMsIGNvbXBvbmVudFBhcmFtLnVwd2FyZCwgZmFsc2UsIHRydWUpIHx8IHJlR2VuZXJhdGVTZWdtZW50cztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGFuZ2VQYXJhbVR5cGVzLmluZGV4T2YoQ29tcG9uZW50UGFyYW1UeXBlLkhvcml6b250YWxTdGVwKSA+IC0xIHx8IGNoYW5nZVBhcmFtVHlwZXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuVmVydGljYWxTdGVwKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZUdlbmVyYXRlU2VnbWVudHMgPSBjaGFuZ2VTdGFpclN0ZXAodGhlU2VnbWVudCwgdGhpcy5zZWdtZW50cywgY29tcG9uZW50UGFyYW0uaG9yaXpvbnRhbFN0ZXAsIGNvbXBvbmVudFBhcmFtLnZlcnRpY2FsU3RlcCwgZmFsc2UsIHRydWUpIHx8IHJlR2VuZXJhdGVTZWdtZW50cztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGFuZ2VQYXJhbVR5cGVzLmluZGV4T2YoQ29tcG9uZW50UGFyYW1UeXBlLlBsYXRmb3JtTGVuZ3RoKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZUdlbmVyYXRlU2VnbWVudHMgPSBjaGFuZ2VQbGF0Zm9ybUxlbmd0aCh0aGVTZWdtZW50LCB0aGlzLnNlZ21lbnRzLCBjb21wb25lbnRQYXJhbS5wbGF0Zm9ybUxlbmd0aCwgZmFsc2UsIHRydWUpIHx8IHJlR2VuZXJhdGVTZWdtZW50cztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChjb21wb25lbnRQYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtICYmIGNoYW5nZVBhcmFtVHlwZXMuaW5kZXhPZihDb21wb25lbnRQYXJhbVR5cGUuU3RhcnRXaWR0aCkgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgRGVmYXVsdENvbXBvbmVudFBhcmFtLnN0YXJ0V2lkdGggPSBjb21wb25lbnRQYXJhbS5zdGFydFdpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgRGVmYXVsdENvbXBvbmVudFBhcmFtLmVuZFdpZHRoID0gY29tcG9uZW50UGFyYW0uZW5kV2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICByZUdlbmVyYXRlU2VnbWVudHMgPSBjaGFuZ2VQbGF0Zm9ybVdpZHRoKHRoZVNlZ21lbnQsIHRoaXMuc2VnbWVudHMsIGNvbXBvbmVudFBhcmFtLnN0YXJ0V2lkdGgsIGZhbHNlLCB0cnVlKSB8fCByZUdlbmVyYXRlU2VnbWVudHM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hhbmdlUGFyYW1UeXBlc1swXSA9PT0gQ29tcG9uZW50UGFyYW1UeXBlLlR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb21wb25lbnRQYXJhbS50eXBlICE9PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2FjaGVTZXR0aW5ncy5zdGFpclR5cGUgPSBjb21wb25lbnRQYXJhbS50eXBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoYW5nZVBhcmFtVHlwZXNbMF0gPT09IENvbXBvbmVudFBhcmFtVHlwZS5QbGF0Zm9ybVRoaWNrbmVzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgRGVmYXVsdENvbXBvbmVudFBhcmFtLnBsYXRmb3JtVGhpY2tuZXNzID0gY29tcG9uZW50UGFyYW0ucGxhdGZvcm1UaGlja25lc3M7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhlU2VnbWVudC5wYXJhbSA9IGNvbXBvbmVudFBhcmFtO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVHZW5lcmF0ZVNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wZXJhdGlvblN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5zdGFuY2VQYXRoID0gdGhpcy5lZGl0TW9kZWwgPyBkZXNpZ24uZ2V0RWRpdFBhdGhzVG9Hcm91cEluc3RhbmNlKHRoaXMuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZSkgOiBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5kcmF3aW5nICYmIHRoaXMuZWRpdE1vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2VQYXRoLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAoeWllbGQgZGVzaWduLmFjdGl2YXRlRWRpdFBhdGgoWy4uLmluc3RhbmNlUGF0aFswXSwgdGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlXSkpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnRUcmFuc2Zvcm0gPSB0aGlzLmVkaXRNb2RlbCA/IHRoaXMuZWRpdE1vZGVsLnBhcmVudC5pbnN0YW5jZS5nZXRUcmFuc2Zvcm0oKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcmVHZW5lcmF0ZVNlZ21lbnQgb2YgcmVHZW5lcmF0ZVNlZ21lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZHJhd2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdUZW1wQ29tcG9uZW50KHJlR2VuZXJhdGVTZWdtZW50LCByZUdlbmVyYXRlU2VnbWVudC5wYXJhbS5pbmRleCA9PT0gdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggJiYgcmVHZW5lcmF0ZVNlZ21lbnQucGFyYW0uaW5kZXggIT09IGxhc3RTZWdtZW50LnBhcmFtLmluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5lZGl0TW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBwYXJhbTogeyBpbmRleCwgdHlwZSB9IH0gPSByZUdlbmVyYXRlU2VnbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlSW5zdGFuY2UgPSB0aGlzLmVkaXRNb2RlbC5zdGFpcnMuZ2V0KGluZGV4KSB8fCB0aGlzLmVkaXRNb2RlbC5wbGF0Zm9ybXMuZ2V0KGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoZUluc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlU2VnbWVudFNoYXBlKHJlR2VuZXJhdGVTZWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoZU1lc2hlcyA9IGdlbmVyYXRlTWVzaGVzKFtyZUdlbmVyYXRlU2VnbWVudF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoZU1lc2hlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBkZXNpZ24ucmVtb3ZlR3JvdXBJbnN0YW5jZSh0aGVJbnN0YW5jZS5pbnN0YW5jZSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3SW5zdGFuY2UgPSBidWlsZENvbXBvbmVudEluc3RhbmNlKHJlR2VuZXJhdGVTZWdtZW50LCB0aGlzLnNlZ21lbnRzLCBwYXJlbnRUcmFuc2Zvcm0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgISFuZXdJbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdJbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsLnBsYXRmb3Jtcy5zZXQoaW5kZXgsIHsgaW5zdGFuY2U6IG5ld0luc3RhbmNlLCBkZWZpbml0aW9uS2V5OiAoKF9hID0gbmV3SW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5nZXRLZXkoKSkgfHwgJycsIGluc3RhbmNlS2V5OiBuZXdJbnN0YW5jZS5nZXRLZXkoKSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsLnN0YWlycy5zZXQoaW5kZXgsIHsgaW5zdGFuY2U6IG5ld0luc3RhbmNlLCBkZWZpbml0aW9uS2V5OiAoKF9iID0gbmV3SW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5nZXRLZXkoKSkgfHwgJycsIGluc3RhbmNlS2V5OiBuZXdJbnN0YW5jZS5nZXRLZXkoKSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdGFpclBhcmFtU2hvdWxkQ2hhbmdlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlUGFyYW1UeXBlc1swXSAhPT0gQ29tcG9uZW50UGFyYW1UeXBlLlR5cGUgJiYgY2hhbmdlUGFyYW1UeXBlc1swXSAhPT0gQ29tcG9uZW50UGFyYW1UeXBlLlBsYXRmb3JtTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlU2VnbWVudHMgPSB0aGlzLnNlZ21lbnRzLmZpbHRlcihzZWcgPT4gKHNlZy5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSA9PT0gKGNoYW5nZVBhcmFtVHlwZXNbMF0gPT09IENvbXBvbmVudFBhcmFtVHlwZS5QbGF0Zm9ybVRoaWNrbmVzcykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGVTZWdtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJQYXJhbVNob3VsZENoYW5nZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZHJhd2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd0hhbmRyYWlscygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGFpclBhcmFtU2hvdWxkQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgY2hhbmdlUGFyYW1UeXBlIG9mIGNoYW5nZVBhcmFtVHlwZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhaXJQYXJhbVtjaGFuZ2VQYXJhbVR5cGVdID0gdGhlU2VnbWVudC5wYXJhbVtjaGFuZ2VQYXJhbVR5cGVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGFpclBhcmFtU2hvdWxkQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuUGFyYW1DaGFuZ2VkQnlEcmF3LCBjb21wb25lbnRQYXJhbTogT2JqZWN0LmFzc2lnbih7fSwgdGhlU2VnbWVudC5wYXJhbSksIHN0YWlyUGFyYW06IHN0YWlyUGFyYW1TaG91bGRDaGFuZ2UgPyB0aGlzLnN0YWlyUGFyYW0gOiB1bmRlZmluZWQgfSwgJyonKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmVkaXRNb2RlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVIYW5kcmFpbFNoYXBlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhaXJQYXJhbS5oYW5kcmFpbC5zdXBwb3J0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVkaXRNb2RlbC5oYW5kcmFpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZGVzaWduLnJlbW92ZUdyb3VwSW5zdGFuY2UodGhpcy5lZGl0TW9kZWwuaGFuZHJhaWwuaGFuZHJhaWxJbnN0YW5jZS5pbnN0YW5jZSkuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoX2MgPSB0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbikgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmhhbmRyYWlscy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRyYWlsSW5zdGFuY2VzRGF0YSA9IHlpZWxkIGJ1aWxkSGFuZHJhaWxJbnN0YW5jZSh0aGlzLnN0YWlyUGFyYW0sIChfZCA9IHRoaXMuaGFuZHJhaWxDb2xsZWN0aW9uKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QuaGFuZHJhaWxzLCBwYXJlbnRUcmFuc2Zvcm0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgaGFuZHJhaWxJbnN0YW5jZXNEYXRhICE9PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGFuZHJhaWxJbnN0YW5jZXNEYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZWwuaGFuZHJhaWwgPSBoYW5kcmFpbEluc3RhbmNlc0RhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlUGF0aC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgKHlpZWxkIGRlc2lnbi5hY3RpdmF0ZUVkaXRQYXRoKGluc3RhbmNlUGF0aFswXSkpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YWlyUGFyYW1TaG91bGRDaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhaXJQcmFtU3RyaW5nID0gc3RyaW5naWZ5U3RhaXJQYXJhbSh0aGlzLnN0YWlyUGFyYW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAhISgoX2UgPSB0aGlzLmVkaXRNb2RlbC5wYXJlbnQuaW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCkpID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS5zZXRDdXN0b21Qcm9wZXJ0eShTdGFpclBhcmFtS2V5LCBzdGFpclByYW1TdHJpbmcpLmlzU3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudEluc3RhbmNlID0gdGhpcy5lZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb25TdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1pdE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGVTZWdtZW50LnBhcmFtID0gY29tcG9uZW50UGFyYW07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGFpclBhcmFtU2hvdWxkQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGNoYW5nZVBhcmFtVHlwZSBvZiBjaGFuZ2VQYXJhbVR5cGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFpclBhcmFtW2NoYW5nZVBhcmFtVHlwZV0gPSB0aGVTZWdtZW50LnBhcmFtW2NoYW5nZVBhcmFtVHlwZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5QYXJhbUNoYW5nZWRCeURyYXcsIGNvbXBvbmVudFBhcmFtOiBPYmplY3QuYXNzaWduKHt9LCB0aGVTZWdtZW50LnBhcmFtKSwgc3RhaXJQYXJhbTogc3RhaXJQYXJhbVNob3VsZENoYW5nZSA/IHRoaXMuc3RhaXJQYXJhbSA6IHVuZGVmaW5lZCB9LCAnKicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWJvcnRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlU2VnbWVudC5wYXJhbSA9IG9sZFBhcmFtO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlBhcmFtQ2hhbmdlZEJ5RHJhdywgY29tcG9uZW50UGFyYW06IE9iamVjdC5hc3NpZ24oe30sIHRoZVNlZ21lbnQucGFyYW0pIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbi5hZGQoW3BhcmVudEluc3RhbmNlXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB0cnlDb21taXQoKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mO1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgbWVzaGVzID0gZ2VuZXJhdGVNZXNoZXModGhpcy5zZWdtZW50cyk7XG4gICAgICAgICAgICBpZiAobWVzaGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHN0YXJ0T3BlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3SW5zdGFuY2VzID0gW107XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhaXJzQ2hpbGQgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcGxhdGZvcm1DaGlsZCA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZFNlZ21lbnRzID0gW107XG4gICAgICAgICAgICAgICAgbGV0IG9wZXJhdGlvblN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgc2VnbWVudCBvZiB0aGlzLnNlZ21lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghc2VnbWVudC5tZXNoKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIGlmICghb3BlcmF0aW9uU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWJvcnRPcGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdJbnN0YW5jZSA9IGJ1aWxkQ29tcG9uZW50SW5zdGFuY2Uoc2VnbWVudCwgdGhpcy5zZWdtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmICEhbmV3SW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdJbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3SW5zdGFuY2VzLnB1c2gobmV3SW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlZ21lbnQucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXRmb3JtQ2hpbGQuc2V0KHNlZ21lbnQucGFyYW0uaW5kZXgsIHsgaW5zdGFuY2U6IG5ld0luc3RhbmNlLCBkZWZpbml0aW9uS2V5OiAoKF9hID0gbmV3SW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5nZXRLZXkoKSkgfHwgJycsIGluc3RhbmNlS2V5OiBuZXdJbnN0YW5jZS5nZXRLZXkoKSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyc0NoaWxkLnNldChzZWdtZW50LnBhcmFtLmluZGV4LCB7IGluc3RhbmNlOiBuZXdJbnN0YW5jZSwgZGVmaW5pdGlvbktleTogKChfYiA9IG5ld0luc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuZ2V0S2V5KCkpIHx8ICcnLCBpbnN0YW5jZUtleTogbmV3SW5zdGFuY2UuZ2V0S2V5KCkgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50LnBhcmFtLnBsYXRmb3JtTGVuZ3RoTG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQucGFyYW0uc3RlcFByb3BvcnRpb25hbCA9IERlZmF1bHRDb21wb25lbnRQYXJhbS5zdGVwUHJvcG9ydGlvbmFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5wYXJhbS53aWR0aFByb3BvcnRpb25hbCA9IERlZmF1bHRDb21wb25lbnRQYXJhbS53aWR0aFByb3BvcnRpb25hbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQucGFyYW0ubW9kZWxFZGl0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkU2VnbWVudHMucHVzaChzZWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgaGFuZHJhaWxJbnN0YW5jZURhdGE7XG4gICAgICAgICAgICAgICAgaWYgKChfYyA9IHRoaXMuaGFuZHJhaWxDb2xsZWN0aW9uKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuaGFuZHJhaWxzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBoYW5kcmFpbEluc3RhbmNlc0RhdGFSZXMgPSB5aWVsZCBidWlsZEhhbmRyYWlsSW5zdGFuY2UodGhpcy5zdGFpclBhcmFtLCAoX2QgPSB0aGlzLmhhbmRyYWlsQ29sbGVjdGlvbikgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLmhhbmRyYWlscyk7XG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGhhbmRyYWlsSW5zdGFuY2VzRGF0YVJlcyAhPT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaGFuZHJhaWxJbnN0YW5jZXNEYXRhUmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdJbnN0YW5jZXMucHVzaChoYW5kcmFpbEluc3RhbmNlc0RhdGFSZXMuaGFuZHJhaWxJbnN0YW5jZS5pbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbEluc3RhbmNlRGF0YSA9IGhhbmRyYWlsSW5zdGFuY2VzRGF0YVJlcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobmV3SW5zdGFuY2VzLmxlbmd0aCAmJiBvcGVyYXRpb25TdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudEluc3RhbmNlID0gKF9lID0gZGVzaWduLm1ha2VHcm91cChbXSwgbmV3SW5zdGFuY2VzLCBbXSkpID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS5hZGRlZEluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAhIXBhcmVudEluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnREZWYgPSBwYXJlbnRJbnN0YW5jZSA9PT0gbnVsbCB8fCBwYXJlbnRJbnN0YW5jZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGFyZW50SW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnRJbnN0YW5jZSAmJiBwYXJlbnREZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIHBhcmVudERlZi5zZXRDdXN0b21Qcm9wZXJ0eShTdGFpck1vZGVsS2V5LCBNb2RlbFZhbHVlKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFpclBhcmFtU3RyaW5nID0gc3RyaW5naWZ5U3RhaXJQYXJhbSh0aGlzLnN0YWlyUGFyYW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgcGFyZW50RGVmLnNldEN1c3RvbVByb3BlcnR5KFN0YWlyUGFyYW1LZXksIHN0YWlyUGFyYW1TdHJpbmcpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YWlyUGFyYW0uc3RhaXJNYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YWlyTWF0ZXJpYWxTdHJpbmcgPSBzdHJpbmdpZnlNYXRlcmlhbCh0aGlzLnN0YWlyUGFyYW0uc3RhaXJNYXRlcmlhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgcGFyZW50RGVmLnNldEN1c3RvbVByb3BlcnR5KFN0YWlyTWF0ZXJpYWxLZXksIHN0YWlyTWF0ZXJpYWxTdHJpbmcpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YWlyUGFyYW0ucGxhdGZvcm1NYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBsYXRmb3JtTWF0ZXJpYWxTdHJpbmcgPSBzdHJpbmdpZnlNYXRlcmlhbCh0aGlzLnN0YWlyUGFyYW0ucGxhdGZvcm1NYXRlcmlhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgcGFyZW50RGVmLnNldEN1c3RvbVByb3BlcnR5KFBsYXRmb3JtTWF0ZXJpYWxLZXksIHBsYXRmb3JtTWF0ZXJpYWxTdHJpbmcpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YWlyUGFyYW0uaGFuZHJhaWwuc3VwcG9ydCAmJiB0aGlzLnN0YWlyUGFyYW0uaGFuZHJhaWwucmFpbC5tYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJhaWxNYXRlcmlhbFN0cmluZyA9IHN0cmluZ2lmeU1hdGVyaWFsKHRoaXMuc3RhaXJQYXJhbS5oYW5kcmFpbC5yYWlsLm1hdGVyaWFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBwYXJlbnREZWYuc2V0Q3VzdG9tUHJvcGVydHkoUmFpbE1hdGVyaWFsS2V5LCByYWlsTWF0ZXJpYWxTdHJpbmcpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YWlyUGFyYW0uaGFuZHJhaWwuc3VwcG9ydCAmJiB0aGlzLnN0YWlyUGFyYW0uaGFuZHJhaWwuY29sdW1uLm1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29sdW1uTWF0ZXJpYWxTdHJpbmcgPSBzdHJpbmdpZnlNYXRlcmlhbCh0aGlzLnN0YWlyUGFyYW0uaGFuZHJhaWwuY29sdW1uLm1hdGVyaWFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBwYXJlbnREZWYuc2V0Q3VzdG9tUHJvcGVydHkoQ29sdW1uTWF0ZXJpYWxLZXksIGNvbHVtbk1hdGVyaWFsU3RyaW5nKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0aW9uU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1pdE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IHsgaW5zdGFuY2U6IHBhcmVudEluc3RhbmNlLCBkZWZpbml0aW9uS2V5OiAoKF9mID0gcGFyZW50SW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCkpID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZi5nZXRLZXkoKSkgfHwgJycsIGluc3RhbmNlS2V5OiBwYXJlbnRJbnN0YW5jZS5nZXRLZXkoKSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpcnM6IHN0YWlyc0NoaWxkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF0Zm9ybXM6IHBsYXRmb3JtQ2hpbGQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsOiBoYW5kcmFpbEluc3RhbmNlRGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VnbWVudHMgPSB2YWxpZFNlZ21lbnRzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1RlbXBDb21wb25lbnQodmFsaWRTZWdtZW50c1swXSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luVUkucG9zdE1lc3NhZ2UoeyB0eXBlOiBNZXNzYWdlVHlwZS5EcmF3U3RhaXJNb2RlbFNldHRsZWQsIGNvbXBvbmVudFBhcmFtczogdGhpcy5zZWdtZW50cy5tYXAoc2VnID0+IChPYmplY3QuYXNzaWduKHt9LCBzZWcucGFyYW0pKSksIHN0YWlyUGFyYW06IHRoaXMuc3RhaXJQYXJhbSwgaXNEcmF3aW5nOiBmYWxzZSB9LCAnKicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhYm9ydE9wZXJhdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0RWRpdE1vZGVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lZGl0TW9kZWw7XG4gICAgfVxuICAgIHNldE1vZGVsKGdyb3VwSW5zdGFuY2UpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgIGlmICh0aGlzLmVkaXRNb2RlbCAmJiBpc1BhcnRPZkVkaXRNb2RlbCh0aGlzLmVkaXRNb2RlbCwgZ3JvdXBJbnN0YW5jZSkpIHtcbiAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuUHJvcGVydGllc1Zpc2libGUsIHByb3BlcnRpZXNWaXNpYmxlOiB0cnVlIH0sICcqJyk7XG4gICAgICAgICAgICBpZiAodGhpcy5zZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzQ29tcG9uZW50KHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGdyb3VwRGVmID0gZ3JvdXBJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKTtcbiAgICAgICAgaWYgKGdyb3VwSW5zdGFuY2UgJiYgZ3JvdXBEZWYpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YWlyTW9kZWxQcm9wZXJ0eSA9IGdyb3VwRGVmLmdldEN1c3RvbVByb3BlcnR5KFN0YWlyTW9kZWxLZXkpO1xuICAgICAgICAgICAgY29uc3Qgc3RhaXJQYXJhbVByb3BlcnR5ID0gZ3JvdXBEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoU3RhaXJQYXJhbUtleSk7XG4gICAgICAgICAgICBjb25zdCBzdGFpclBhcmFtID0gcGFyc2VTdGFpclBhcmFtKHN0YWlyUGFyYW1Qcm9wZXJ0eSk7XG4gICAgICAgICAgICBjb25zdCBzdGFpck1hdGVyaWFsUHJvcGVydHkgPSBncm91cERlZi5nZXRDdXN0b21Qcm9wZXJ0eShTdGFpck1hdGVyaWFsS2V5KTtcbiAgICAgICAgICAgIGNvbnN0IHN0YWlyTWF0ZXJpYWwgPSBwYXJzZU1hdGVyaWFsKHN0YWlyTWF0ZXJpYWxQcm9wZXJ0eSk7XG4gICAgICAgICAgICBpZiAoc3RhaXJNYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgIHN0YWlyUGFyYW0uc3RhaXJNYXRlcmlhbCA9IHN0YWlyTWF0ZXJpYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwbGF0Zm9ybU1hdGVyaWFsUHJvcGVydHkgPSBncm91cERlZi5nZXRDdXN0b21Qcm9wZXJ0eShQbGF0Zm9ybU1hdGVyaWFsS2V5KTtcbiAgICAgICAgICAgIGNvbnN0IHBsYXRmb3JtTWF0ZXJpYWwgPSBwYXJzZU1hdGVyaWFsKHBsYXRmb3JtTWF0ZXJpYWxQcm9wZXJ0eSk7XG4gICAgICAgICAgICBpZiAocGxhdGZvcm1NYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgIHN0YWlyUGFyYW0ucGxhdGZvcm1NYXRlcmlhbCA9IHBsYXRmb3JtTWF0ZXJpYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCByYWlsTWF0ZXJpYWxQcm9wZXJ0eSA9IGdyb3VwRGVmLmdldEN1c3RvbVByb3BlcnR5KFJhaWxNYXRlcmlhbEtleSk7XG4gICAgICAgICAgICBjb25zdCByYWlsTWF0ZXJpYWwgPSBwYXJzZU1hdGVyaWFsKHJhaWxNYXRlcmlhbFByb3BlcnR5KTtcbiAgICAgICAgICAgIGlmIChyYWlsTWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICBzdGFpclBhcmFtLmhhbmRyYWlsLnJhaWwubWF0ZXJpYWwgPSByYWlsTWF0ZXJpYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjb2x1bW5NYXRlcmlhbFByb3BlcnR5ID0gZ3JvdXBEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoQ29sdW1uTWF0ZXJpYWxLZXkpO1xuICAgICAgICAgICAgY29uc3QgY29sdW1uTWF0ZXJpYWwgPSBwYXJzZU1hdGVyaWFsKGNvbHVtbk1hdGVyaWFsUHJvcGVydHkpO1xuICAgICAgICAgICAgaWYgKGNvbHVtbk1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgc3RhaXJQYXJhbS5oYW5kcmFpbC5jb2x1bW4ubWF0ZXJpYWwgPSBjb2x1bW5NYXRlcmlhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdGFpck1vZGVsUHJvcGVydHkgPT09IE1vZGVsVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWdtZW50cyA9IFtdO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN1Ykdyb3VwSW5zdGFuY2VzID0gZ3JvdXBEZWYuZ2V0U3ViR3JvdXBJbnN0YW5jZXMoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBlZGl0TW9kZWwgPSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudDogeyBpbnN0YW5jZTogZ3JvdXBJbnN0YW5jZSwgZGVmaW5pdGlvbktleTogKChfYSA9IGdyb3VwSW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5nZXRLZXkoKSkgfHwgJycsIGluc3RhbmNlS2V5OiBncm91cEluc3RhbmNlLmdldEtleSgpIH0sXG4gICAgICAgICAgICAgICAgICAgIHN0YWlyczogbmV3IE1hcCgpLFxuICAgICAgICAgICAgICAgICAgICBwbGF0Zm9ybXM6IG5ldyBNYXAoKSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgc3ViSW5zdGFuY2Ugb2Ygc3ViR3JvdXBJbnN0YW5jZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3ViRGVmID0gc3ViSW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdWJEZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRyYWlsUHJvcGVydHkgPSBzdWJEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoSGFuZHJhaWxNb2RlbEtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGFuZHJhaWxQcm9wZXJ0eSA9PT0gTW9kZWxWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRyYWlsSW5zdGFuY2VzRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWxJbnN0YW5jZTogeyBpbnN0YW5jZTogc3ViSW5zdGFuY2UsIGluc3RhbmNlS2V5OiBzdWJJbnN0YW5jZS5nZXRLZXkoKSwgZGVmaW5pdGlvbktleTogc3ViRGVmLmdldEtleSgpIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhaWxJbnN0YW5jZXM6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5JbnN0YW5jZXM6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFuZHJhaWxTdWJHcm91cEluc3RhbmNlcyA9IHN1YkRlZi5nZXRTdWJHcm91cEluc3RhbmNlcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaGFuZHJhaWxTdWJJbnN0YW5jZSBvZiBoYW5kcmFpbFN1Ykdyb3VwSW5zdGFuY2VzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRyYWlsU3ViRGVmID0gaGFuZHJhaWxTdWJJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhbmRyYWlsU3ViRGVmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByYWlsUHJvcGVydHkgPSBoYW5kcmFpbFN1YkRlZi5nZXRDdXN0b21Qcm9wZXJ0eShSYWlsTW9kZWxLZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29sdW1uUHJvcGVydHkgPSBoYW5kcmFpbFN1YkRlZi5nZXRDdXN0b21Qcm9wZXJ0eShDb2x1bW5Nb2RlbEtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmFpbFByb3BlcnR5ID09PSBNb2RlbFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWxJbnN0YW5jZXNEYXRhLnJhaWxJbnN0YW5jZXMucHVzaCh7IGluc3RhbmNlOiBoYW5kcmFpbFN1Ykluc3RhbmNlLCBpbnN0YW5jZUtleTogaGFuZHJhaWxTdWJJbnN0YW5jZS5nZXRLZXkoKSwgZGVmaW5pdGlvbktleTogaGFuZHJhaWxTdWJEZWYuZ2V0S2V5KCkgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChjb2x1bW5Qcm9wZXJ0eSA9PT0gTW9kZWxWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsSW5zdGFuY2VzRGF0YS5jb2x1bW5JbnN0YW5jZXMucHVzaCh7IGluc3RhbmNlOiBoYW5kcmFpbFN1Ykluc3RhbmNlLCBpbnN0YW5jZUtleTogaGFuZHJhaWxTdWJJbnN0YW5jZS5nZXRLZXkoKSwgZGVmaW5pdGlvbktleTogaGFuZHJhaWxTdWJEZWYuZ2V0S2V5KCkgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdE1vZGVsLmhhbmRyYWlsID0gaGFuZHJhaWxJbnN0YW5jZXNEYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgY29tcG9uZW50SW5kZXhWYWx1ZSA9IHBhcnNlSW50KHN1YkRlZi5nZXRDdXN0b21Qcm9wZXJ0eShDb21wb25lbnRJbmRleEtleSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIChpc0Zpbml0ZShjb21wb25lbnRJbmRleFZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmFtID0gcGFyc2VDb21wb25lbnRQYXJhbShzdWJEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoQ29tcG9uZW50UGFyYW1LZXkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFydEVuZCA9IHBhcnNlU3RhcnRFbmQoc3ViRGVmLmdldEN1c3RvbVByb3BlcnR5KFN0YXJ0RW5kS2V5KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFzZUxpbmVTZWczZCA9IHBhcnNlTGluZVNlZzNkKHN1YkRlZi5nZXRDdXN0b21Qcm9wZXJ0eShCYXNlTGluZVNlZzNkS2V5KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFzZUNvbXBvbmVudCA9IHBhcnNlQmFzZUNvbXBvbmVudChzdWJEZWYuZ2V0Q3VzdG9tUHJvcGVydHkoQmFzZUNvbXBvbmVudEtleSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNpcmNsZVRhbmdlbnQgPSBwYXJzZVZlY3RvcjNkKHN1YkRlZi5nZXRDdXN0b21Qcm9wZXJ0eShDaXJjbGVUYW5nZW50S2V5KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29tcG9uZW50TWF0ZXJpYWxQcm9wZXJ0eSA9IGdyb3VwRGVmLmdldEN1c3RvbVByb3BlcnR5KENvbXBvbmVudE1hdGVyaWFsS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21wb25lbnRNYXRlcmlhbCA9IHBhcnNlTWF0ZXJpYWwoY29tcG9uZW50TWF0ZXJpYWxQcm9wZXJ0eSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudE1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtLm1hdGVyaWFsID0gY29tcG9uZW50TWF0ZXJpYWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbSAmJiBzdGFydEVuZCAmJiBiYXNlTGluZVNlZzNkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlZ21lbnQgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGdldE5ld1NlZ21lbnQocGFyYW0udHlwZSkpLCB7IHN0YXJ0OiBzdGFydEVuZC5zdGFydCwgZW5kOiBzdGFydEVuZC5lbmQsIHN0YXJ0SGVpZ2h0OiBzdGFydEVuZC5zdGFydEhlaWdodCwgZW5kSGVpZ2h0OiBzdGFydEVuZC5lbmRIZWlnaHQsIGJhc2VDb21wb25lbnQ6IHsgY29tcG9uZW50SW5kZXg6IGJhc2VDb21wb25lbnQgPT09IG51bGwgfHwgYmFzZUNvbXBvbmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmFzZUNvbXBvbmVudC5jb21wb25lbnRJbmRleCwgbGluZTNkSW5kZXg6IGJhc2VDb21wb25lbnQgPT09IG51bGwgfHwgYmFzZUNvbXBvbmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleCwgbGluZTNkOiBiYXNlTGluZVNlZzNkIH0sIGNpcmNsZVRhbmdlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbSwgc3RhcnRMb2NrZWQ6IHRydWUsIGVuZExvY2tlZDogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudHMucHVzaChzZWdtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRNb2RlbC5wbGF0Zm9ybXMuc2V0KHBhcmFtLmluZGV4LCB7IGluc3RhbmNlOiBzdWJJbnN0YW5jZSwgZGVmaW5pdGlvbktleTogKChfYiA9IHN1Ykluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuZ2V0S2V5KCkpIHx8ICcnLCBpbnN0YW5jZUtleTogc3ViSW5zdGFuY2UuZ2V0S2V5KCkgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0TW9kZWwuc3RhaXJzLnNldChwYXJhbS5pbmRleCwgeyBpbnN0YW5jZTogc3ViSW5zdGFuY2UsIGRlZmluaXRpb25LZXk6ICgoX2MgPSBzdWJJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmdldEtleSgpKSB8fCAnJywgaW5zdGFuY2VLZXk6IHN1Ykluc3RhbmNlLmdldEtleSgpIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudHMuc29ydCgoYSwgYikgPT4gYS5wYXJhbS5pbmRleCAtIGIucGFyYW0uaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBzZWdtZW50cy5mb3JFYWNoKHMgPT4gZ2VuZXJhdGVTaGFwZShzLCBmYWxzZSkpO1xuICAgICAgICAgICAgICAgICAgICBidWlsZFNlZ21lbnRSZWxhdGlvbnMoc2VnbWVudHMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlZ21lbnRzID0gc2VnbWVudHM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGVsID0gZWRpdE1vZGVsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWlyUGFyYW0gPSBzdGFpclBhcmFtO1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmRyYXdUZW1wQ29tcG9uZW50KHNlZ21lbnRzWzBdLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c0NvbXBvbmVudChzZWdtZW50c1swXS5wYXJhbS5pbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIHBsdWdpblVJLnBvc3RNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuRHJhd1N0YWlyTW9kZWxTZXR0bGVkLCBjb21wb25lbnRQYXJhbXM6IHRoaXMuc2VnbWVudHMubWFwKHNlZyA9PiAoT2JqZWN0LmFzc2lnbih7fSwgc2VnLnBhcmFtKSkpLCBzdGFpclBhcmFtOiB0aGlzLnN0YWlyUGFyYW0sIGlzRHJhd2luZzogZmFsc2UgfSwgJyonKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlByb3BlcnRpZXNWaXNpYmxlLCBwcm9wZXJ0aWVzVmlzaWJsZTogZmFsc2UgfSwgJyonKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjbGVhckVkaXRNb2RlbCgpIHtcbiAgICAgICAgdGhpcy5lZGl0TW9kZWwgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuc2VnbWVudHMgPSBbXTtcbiAgICAgICAgdGhpcy5oYW5kcmFpbENvbGxlY3Rpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZm9jdXNlZENvbXBvbmVudEluZGV4ID0gRGVmYXVsdEZvY3VzZWRDb21wb25lbnRJbmRleDtcbiAgICAgICAgYXBwVmlldy5jbGVhclRlbXBvcmFyeVNoYXBlcygpO1xuICAgICAgICBwbHVnaW5VSS5wb3N0TWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLkRyYXdTdGFpck1vZGVsU2V0dGxlZCwgaXNEcmF3aW5nOiBmYWxzZSB9LCAnKicpO1xuICAgIH1cbiAgICBjbGVhcigpIHtcbiAgICAgICAgYXBwVmlldy5jbGVhclRlbXBvcmFyeVNoYXBlcygpO1xuICAgICAgICAvLyB0aGlzLmNvbXBvbmVudFBhcmFtID0geyAuLi5EZWZhdWx0Q29tcG9uZW50UGFyYW0gfTtcbiAgICAgICAgLy8gdGhpcy5zZWdtZW50cyA9IFtdO1xuICAgICAgICB0aGlzLmRyYXdpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mb2N1c2VkQ29tcG9uZW50SW5kZXggPSBEZWZhdWx0Rm9jdXNlZENvbXBvbmVudEluZGV4O1xuICAgICAgICB0aGlzLnN0YWlyUGFyYW0gPSBPYmplY3QuYXNzaWduKHt9LCBEZWZhdWx0U3RhaXJQYXJhbSk7XG4gICAgICAgIC8vIHRoaXMuZWRpdE1vZGVsID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBvbkxCdXR0b25EYkNsaWNrKGV2ZW50LCBpbmZlcmVuY2VSZXN1bHQpIHtcbiAgICAgICAgO1xuICAgIH1cbiAgICBhbGxvd1VzaW5nSW5mZXJlbmNlKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgb25LZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIDtcbiAgICB9XG4gICAgb25LZXlVcChldmVudCkge1xuICAgICAgICA7XG4gICAgfVxuICAgIGdlbmVyYXRlU2VnbWVudFNoYXBlKHNlZ21lbnQsIHRlbXAgPSB0cnVlKSB7XG4gICAgICAgIGdlbmVyYXRlU2hhcGUoc2VnbWVudCwgdGVtcCk7XG4gICAgICAgIC8vIHRoaXMuZ2VuZXJhdGVIYW5kcmFpbFNoYXBlKCk7XG4gICAgfVxuICAgIGdlbmVyYXRlSGFuZHJhaWxTaGFwZShzdGFpclBhcmFtID0gdGhpcy5zdGFpclBhcmFtKSB7XG4gICAgICAgIGlmICh0aGlzLnNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgaGFuZHJhaWxzID0gZ2VuZXJhdGVIYW5kcmFpbFNoYXBlKHN0YWlyUGFyYW0sIHRoaXMuc2VnbWVudHMpO1xuICAgICAgICAgICAgdGhpcy5oYW5kcmFpbENvbGxlY3Rpb24gPSB7IGhhbmRyYWlsczogaGFuZHJhaWxzIHx8IFtdIH07XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgY29uc3QgZHJhd1N0YWlyc1Rvb2wgPSBuZXcgRHJhd1N0YWlyc1Rvb2woKTtcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgQW5nbGVUb2xlcmFuY2UsIERpcmVjdGlvbkFuZ2xlVG9sZXJhbmNlLCBEaXJlY3Rpb25aLCBkdW1teVBvaW50M2QsIGR1bW15VmVjdG9yM2QsIExlbmd0aFRvbGVyYW5jZSwgU3RlcENvdW50TGltaXQgfSBmcm9tIFwiLi9jb25zdHNcIjtcbmltcG9ydCB7IGdlbmVyYXRlU2hhcGUgfSBmcm9tIFwiLi90ZW1wTWVzaFV0aWxzXCI7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50S2V5LCBCYXNlTGluZVNlZzNkS2V5LCBDaXJjbGVUYW5nZW50S2V5LCBDb2x1bW5UeXBlLCBDb21wb25lbnRUeXBlLCBEZWZhdWx0U3RhaXJQYXJhbSwgSGFuZHJhaWxNb2RlbEtleSwgUmFpbFR5cGUsIE1vZGVsVmFsdWUsIFN0YXJ0RW5kS2V5LCBQcmVzZXRNYXRlcmlhbHMsIENvbHVtbk1vZGVsS2V5LCBSYWlsTW9kZWxLZXksIENvbXBvbmVudFBhcmFtS2V5LCBDaXJjdWxhclNpZGUsIENvbXBvbmVudE1hdGVyaWFsS2V5LCB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBnZXRDb29yZGluYXRlLCBpc0VxdWFsLCBzdHJpbmdpZnlCYXNlQ29tcG9uZW50LCBzdHJpbmdpZnlDb21wb25lbnRQYXJhbSwgc3RyaW5naWZ5TWF0ZXJpYWwsIHN0cmluZ2lmeVBvaW50M2QsIHN0cmluZ2lmeVN0YXJ0RW5kIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZU1lc2hlcyhzZWdtZW50cykge1xuICAgIGNvbnN0IG1lc2hlcyA9IFtdO1xuICAgIGZvciAoY29uc3Qgc2VnbWVudCBvZiBzZWdtZW50cykge1xuICAgICAgICBjb25zdCB7IHBhcmFtOiB7IHR5cGUgfSwgY2lyY2xlVGFuZ2VudCB9ID0gc2VnbWVudDtcbiAgICAgICAgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpcikge1xuICAgICAgICAgICAgZ2VuZXJhdGVTdHJhaWdodFN0YWlyTWVzaChzZWdtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09PSBDb21wb25lbnRUeXBlLkNpcmN1bGFyU3RhaXIpIHtcbiAgICAgICAgICAgIGlmIChjaXJjbGVUYW5nZW50KSB7XG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVDaXJjdWxhclN0YWlyTWVzaChzZWdtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGdlbmVyYXRlU3RyYWlnaHRTdGFpck1lc2goc2VnbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBnZW5lcmF0ZVBsYXRmb3JtTWVzaChzZWdtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VnbWVudC5tZXNoKSB7XG4gICAgICAgICAgICBtZXNoZXMucHVzaChzZWdtZW50Lm1lc2gpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtZXNoZXM7XG59XG5mdW5jdGlvbiBnZW5lcmF0ZUNpcmN1bGFyU3RhaXJNZXNoKHNlZ21lbnQpIHtcbiAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oLCBfaiwgX2ssIF9sO1xuICAgIGNvbnN0IHsgc3RhcnRMb2NrZWQsIGNpcmNsZVRhbmdlbnQsIHN0YWlyU2hhcGU6IHsgdmVydGljZXMsIHN0ZXBDb3VudCB9LCBjb3JuZXJTaGFwZTogeyB2ZXJ0aWNlczogY29ybmVyVmVydGljZXMgfSwgcGFyYW06IHsgdXB3YXJkIH0gfSA9IHNlZ21lbnQ7XG4gICAgaWYgKHN0ZXBDb3VudCA8IDEgfHwgIXN0YXJ0TG9ja2VkIHx8ICFjaXJjbGVUYW5nZW50KVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGNvbnN0IHN0YWlyTWVzaCA9IHtcbiAgICAgICAgdmVydGljZXM6IHZlcnRpY2VzLm1hcCh2ZXJ0ZXggPT4gW3ZlcnRleC54LCB2ZXJ0ZXgueSwgdmVydGV4LnpdKSxcbiAgICAgICAgdHJpYW5nbGVJbmRpY2VzOiBbXSxcbiAgICAgICAgc29mdEVkZ2VzOiBbXSxcbiAgICB9O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RlcENvdW50OyBpKyspIHtcbiAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAvLyBzdGFpciBmYWNlc1xuICAgICAgICBbaSAqIDQsIGkgKiA0ICsgMSwgaSAqIDQgKyAyXSwgW2kgKiA0ICsgMSwgaSAqIDQgKyAzLCBpICogNCArIDJdLCBbaSAqIDQgKyAyLCBpICogNCArIDMsIGkgKiA0ICsgNF0sIFtpICogNCArIDMsIGkgKiA0ICsgNSwgaSAqIDQgKyA0XSwgXG4gICAgICAgIC8vIHNpZGUgZmFjZXMgKHVwKVxuICAgICAgICBbaSAqIDQsIGkgKiA0ICsgMiwgKGkgKyAxKSAqIDRdLCBbaSAqIDQgKyAxLCAoaSArIDEpICogNCArIDEsIGkgKiA0ICsgM10pO1xuICAgICAgICAoX2EgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucHVzaChbaSAqIDQgKyAxLCBpICogNCArIDJdLCBbaSAqIDQgKyAzLCBpICogNCArIDRdLCBbaSAqIDQsIChpICsgMSkgKiA0XSwgWyhpICsgMSkgKiA0ICsgMSwgaSAqIDQgKyAxXSk7XG4gICAgICAgIGlmICh1cHdhcmQpIHtcbiAgICAgICAgICAgIGNvbnN0IGJvdHRvbUZyb250TGVmdEluZGV4ID0gNCAqIHN0ZXBDb3VudCArIDIgKyAyICogKHN0ZXBDb3VudCAtIGkgLSAxKTtcbiAgICAgICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgICAgIC8vIHNpZGUgZmFjZXMgKG1pZGRsZSlcbiAgICAgICAgICAgIFtpICogNCwgKGkgKyAxKSAqIDQsIGJvdHRvbUZyb250TGVmdEluZGV4XSwgWyhpICsgMSkgKiA0ICsgMSwgaSAqIDQgKyAxLCBib3R0b21Gcm9udExlZnRJbmRleCArIDFdKTtcbiAgICAgICAgICAgIGlmIChpIDwgc3RlcENvdW50IC0gMSkge1xuICAgICAgICAgICAgICAgIChfYiA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5wdXNoKFsoaSArIDEpICogNCwgYm90dG9tRnJvbnRMZWZ0SW5kZXhdLCBbKGkgKyAxKSAqIDQgKyAxLCBib3R0b21Gcm9udExlZnRJbmRleCArIDFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgICAgICAgICAvLyBzaWRlIGZhY2VzIChib3R0b20pXG4gICAgICAgICAgICAgICAgW2kgKiA0LCBib3R0b21Gcm9udExlZnRJbmRleCwgYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAyXSwgW2JvdHRvbUZyb250TGVmdEluZGV4ICsgMSwgaSAqIDQgKyAxLCBib3R0b21Gcm9udExlZnRJbmRleCArIDNdLCBcbiAgICAgICAgICAgICAgICAvLyBib3R0b20gZmFjZXNcbiAgICAgICAgICAgICAgICBbYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAyLCBib3R0b21Gcm9udExlZnRJbmRleCwgYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAzXSwgW2JvdHRvbUZyb250TGVmdEluZGV4ICsgMywgYm90dG9tRnJvbnRMZWZ0SW5kZXgsIGJvdHRvbUZyb250TGVmdEluZGV4ICsgMV0pO1xuICAgICAgICAgICAgICAgIChfYyA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5wdXNoKFtpICogNCwgYm90dG9tRnJvbnRMZWZ0SW5kZXhdLCBbaSAqIDQgKyAxLCBib3R0b21Gcm9udExlZnRJbmRleCArIDFdLCBbYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAzLCBib3R0b21Gcm9udExlZnRJbmRleF0pO1xuICAgICAgICAgICAgICAgIGlmIChpIDwgc3RlcENvdW50IC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAoX2QgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QucHVzaChbYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAxLCBib3R0b21Gcm9udExlZnRJbmRleF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgICAgICAgICAvLyBib3R0b20gZmFjZXNcbiAgICAgICAgICAgICAgICBbaSAqIDQsIGJvdHRvbUZyb250TGVmdEluZGV4LCBpICogNCArIDFdLCBbaSAqIDQgKyAxLCBib3R0b21Gcm9udExlZnRJbmRleCwgYm90dG9tRnJvbnRMZWZ0SW5kZXggKyAxXSk7XG4gICAgICAgICAgICAgICAgKF9lID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lLnB1c2goW2kgKiA0ICsgMSwgYm90dG9tRnJvbnRMZWZ0SW5kZXhdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGJvdHRvbUJhY2tMZWZ0SW5kZXggPSA0ICogc3RlcENvdW50ICsgMiArIDIgKiAoc3RlcENvdW50IC0gaSAtIDEpO1xuICAgICAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAgICAgLy8gc2lkZSBmYWNlcyAobWlkZGxlKVxuICAgICAgICAgICAgW2kgKiA0LCAoaSArIDEpICogNCwgYm90dG9tQmFja0xlZnRJbmRleF0sIFsoaSArIDEpICogNCArIDEsIGkgKiA0ICsgMSwgYm90dG9tQmFja0xlZnRJbmRleCArIDFdLCBcbiAgICAgICAgICAgIC8vIGJvdHRvbSBmYWNlc1xuICAgICAgICAgICAgW2JvdHRvbUJhY2tMZWZ0SW5kZXgsIGJvdHRvbUJhY2tMZWZ0SW5kZXggLSAyLCBib3R0b21CYWNrTGVmdEluZGV4ICsgMV0sIFtib3R0b21CYWNrTGVmdEluZGV4ICsgMSwgYm90dG9tQmFja0xlZnRJbmRleCAtIDIsIGJvdHRvbUJhY2tMZWZ0SW5kZXggLSAxXSk7XG4gICAgICAgICAgICAoX2YgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2YucHVzaChbYm90dG9tQmFja0xlZnRJbmRleCArIDEsIGJvdHRvbUJhY2tMZWZ0SW5kZXggLSAyXSk7XG4gICAgICAgICAgICBpZiAoaSA8IHN0ZXBDb3VudCAtIDEpIHtcbiAgICAgICAgICAgICAgICAoX2cgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2cucHVzaChbKGkgKyAxKSAqIDQsIGJvdHRvbUJhY2tMZWZ0SW5kZXhdLCBbKGkgKyAxKSAqIDQgKyAxLCBib3R0b21CYWNrTGVmdEluZGV4ICsgMV0pO1xuICAgICAgICAgICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgICAgICAgICAvLyBzaWRlIGZhY2VzIChib3R0b20pXG4gICAgICAgICAgICAgICAgWyhpICsgMSkgKiA0LCBib3R0b21CYWNrTGVmdEluZGV4IC0gMiwgYm90dG9tQmFja0xlZnRJbmRleF0sIFtib3R0b21CYWNrTGVmdEluZGV4IC0gMSwgKGkgKyAxKSAqIDQgKyAxLCBib3R0b21CYWNrTGVmdEluZGV4ICsgMV0pO1xuICAgICAgICAgICAgICAgIChfaCA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9oID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfaC5wdXNoKFsoaSArIDEpICogNCwgYm90dG9tQmFja0xlZnRJbmRleCAtIDJdLCBbKGkgKyAxKSAqIDQgKyAxLCBib3R0b21CYWNrTGVmdEluZGV4IC0gMV0sIFtib3R0b21CYWNrTGVmdEluZGV4ICsgMSwgYm90dG9tQmFja0xlZnRJbmRleCAtIDJdKTtcbiAgICAgICAgICAgICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgKF9qID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2ogPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9qLnB1c2goW2JvdHRvbUJhY2tMZWZ0SW5kZXggKyAxLCBib3R0b21CYWNrTGVmdEluZGV4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlmICh1cHdhcmQpIHtcbiAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAvLyDliY3kvqfpnaJcbiAgICAgICAgW3N0ZXBDb3VudCAqIDQsIHN0ZXBDb3VudCAqIDQgKyAxLCBzdGVwQ291bnQgKiA0ICsgMl0sIFtzdGVwQ291bnQgKiA0ICsgMSwgc3RlcENvdW50ICogNCArIDMsIHN0ZXBDb3VudCAqIDQgKyAyXSk7XG4gICAgICAgIChfayA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9rID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfay5wdXNoKFtzdGVwQ291bnQgKiA0ICsgMSwgc3RlcENvdW50ICogNCArIDJdKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgLy8g5ZCO5L6n6Z2iXG4gICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCAxLCAwXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIDAsIHZlcnRpY2VzLmxlbmd0aCAtIDJdKTtcbiAgICAgICAgKF9sID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2wgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9sLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIDBdKTtcbiAgICB9XG4gICAgaWYgKGNvcm5lclZlcnRpY2VzLmxlbmd0aCA9PT0gNikge1xuICAgICAgICBnZW5lcmF0ZVBvbHlnb25NZXNoKGNvcm5lclZlcnRpY2VzLCBzdGFpck1lc2gpO1xuICAgIH1cbiAgICBzZWdtZW50Lm1lc2ggPSBzdGFpck1lc2g7XG59XG5mdW5jdGlvbiBnZW5lcmF0ZVN0cmFpZ2h0U3RhaXJNZXNoKHNlZ21lbnQpIHtcbiAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oLCBfaiwgX2s7XG4gICAgY29uc3QgeyBzdGFydExvY2tlZCwgc3RhaXJTaGFwZTogeyB2ZXJ0aWNlcywgc3RlcENvdW50IH0sIGNvcm5lclNoYXBlOiB7IHZlcnRpY2VzOiBjb3JuZXJWZXJ0aWNlcyB9LCBwYXJhbTogeyB1cHdhcmQgfSB9ID0gc2VnbWVudDtcbiAgICBpZiAoc3RlcENvdW50IDwgMSB8fCAhc3RhcnRMb2NrZWQpXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgY29uc3Qgc3RhaXJNZXNoID0ge1xuICAgICAgICB2ZXJ0aWNlczogdmVydGljZXMubWFwKHZlcnRleCA9PiBbdmVydGV4LngsIHZlcnRleC55LCB2ZXJ0ZXguel0pLFxuICAgICAgICB0cmlhbmdsZUluZGljZXM6IFtdLFxuICAgICAgICBzb2Z0RWRnZXM6IFtdLFxuICAgIH07XG4gICAgY29uc3QgbGVmdEluZGV4ID0gdmVydGljZXMubGVuZ3RoIC0gKCghdXB3YXJkICYmIHN0ZXBDb3VudCA+IDEpID8gNCA6IDIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RlcENvdW50OyBpKyspIHtcbiAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAvLyBzdGFpciBmYWNlc1xuICAgICAgICBbaSAqIDQsIGkgKiA0ICsgMSwgaSAqIDQgKyAyXSwgW2kgKiA0ICsgMSwgaSAqIDQgKyAzLCBpICogNCArIDJdLCBbaSAqIDQgKyAyLCBpICogNCArIDMsIGkgKiA0ICsgNF0sIFtpICogNCArIDMsIGkgKiA0ICsgNSwgaSAqIDQgKyA0XSwgXG4gICAgICAgIC8vIHNpZGUgZmFjZXNcbiAgICAgICAgW2kgKiA0LCBpICogNCArIDIsIChpICsgMSkgKiA0XSwgW2kgKiA0ICsgMSwgKGkgKyAxKSAqIDQgKyAxLCBpICogNCArIDNdKTtcbiAgICAgICAgKF9hID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnB1c2goW2kgKiA0ICsgMSwgaSAqIDQgKyAyXSwgW2kgKiA0ICsgMywgaSAqIDQgKyA0XSwgW2kgKiA0LCAoaSArIDEpICogNF0sIFsoaSArIDEpICogNCArIDEsIGkgKiA0ICsgMV0pO1xuICAgICAgICBpZiAoaSA9PT0gc3RlcENvdW50IC0gMSAmJiB1cHdhcmQgJiYgc3RlcENvdW50ID4gMSkge1xuICAgICAgICAgICAgY29uc3QgYmJMZWZ0SW5kZXggPSB2ZXJ0aWNlcy5sZW5ndGggLSA0O1xuICAgICAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAgICAgLy8gdGFpbCBzaWRlIGZhY2VzXG4gICAgICAgICAgICBbYmJMZWZ0SW5kZXgsIGkgKiA0LCAoaSArIDEpICogNF0sIFtiYkxlZnRJbmRleCArIDEsIChpICsgMSkgKiA0ICsgMSwgaSAqIDQgKyAxXSk7XG4gICAgICAgICAgICAoX2IgPSBzdGFpck1lc2guc29mdEVkZ2VzKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IucHVzaChbYmJMZWZ0SW5kZXgsIGkgKiA0XSwgW2JiTGVmdEluZGV4ICsgMSwgaSAqIDQgKyAxXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzdGFpck1lc2gudHJpYW5nbGVJbmRpY2VzLnB1c2goXG4gICAgICAgICAgICAvLyBzaWRlIGZhY2VzXG4gICAgICAgICAgICBbbGVmdEluZGV4LCBpICogNCwgKGkgKyAxKSAqIDRdLCBbbGVmdEluZGV4ICsgMSwgKGkgKyAxKSAqIDQgKyAxLCBpICogNCArIDFdKTtcbiAgICAgICAgICAgIGlmICh1cHdhcmQpIHtcbiAgICAgICAgICAgICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgKF9jID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnB1c2goW2xlZnRJbmRleCwgaSAqIDRdLCBbbGVmdEluZGV4ICsgMSwgaSAqIDQgKyAxXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzdGVwQ291bnQgPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIChfZCA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5wdXNoKFtsZWZ0SW5kZXgsIChpICsgMSkgKiA0XSwgW2xlZnRJbmRleCArIDEsIChpICsgMSkgKiA0ICsgMV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChzdGVwQ291bnQgPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIChfZSA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS5wdXNoKFtsZWZ0SW5kZXgsIGkgKiA0XSwgW2xlZnRJbmRleCArIDEsIGkgKiA0ICsgMV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaSA8IHN0ZXBDb3VudCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgKF9mID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9mLnB1c2goW2xlZnRJbmRleCwgKGkgKyAxKSAqIDRdLCBbbGVmdEluZGV4ICsgMSwgKGkgKyAxKSAqIDQgKyAxXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlmICh1cHdhcmQpIHtcbiAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAvLyBib3R0b20gZmFjZXNcbiAgICAgICAgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIDEsIDBdLCBbdmVydGljZXMubGVuZ3RoIC0gMSwgMCwgdmVydGljZXMubGVuZ3RoIC0gMl0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAzLCB2ZXJ0aWNlcy5sZW5ndGggLSAxLCB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDIsIHZlcnRpY2VzLmxlbmd0aCAtIDRdKTtcbiAgICAgICAgKF9nID0gc3RhaXJNZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2cgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9nLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIDBdLCBbdmVydGljZXMubGVuZ3RoIC0gMywgdmVydGljZXMubGVuZ3RoIC0gMl0pO1xuICAgICAgICBpZiAoc3RlcENvdW50ID4gMSkge1xuICAgICAgICAgICAgc3RhaXJNZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAgICAgLy8gc2lkZSBib3R0b20gZmFjZXNcbiAgICAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSAyLCB2ZXJ0aWNlcy5sZW5ndGggLSAxMCwgdmVydGljZXMubGVuZ3RoIC0gNF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCB2ZXJ0aWNlcy5sZW5ndGggLSAzLCB2ZXJ0aWNlcy5sZW5ndGggLSA5XSwgXG4gICAgICAgICAgICAvLyBib3R0b20gZmFjZXNcbiAgICAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSA1LCB2ZXJ0aWNlcy5sZW5ndGggLSAzLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDQsIHZlcnRpY2VzLmxlbmd0aCAtIDZdKTtcbiAgICAgICAgICAgIChfaCA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9oID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfaC5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSA1LCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIHZlcnRpY2VzLmxlbmd0aCAtIDEwXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDEwLCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgLy8gYm90dG9tIGZhY2VzXG4gICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCAwLCAxXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDEsIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDBdLCBbdmVydGljZXMubGVuZ3RoIC0gMywgdmVydGljZXMubGVuZ3RoIC0gMiwgdmVydGljZXMubGVuZ3RoIC0gMV0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAzLCB2ZXJ0aWNlcy5sZW5ndGggLSA0LCB2ZXJ0aWNlcy5sZW5ndGggLSAyXSk7XG4gICAgICAgIChfaiA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9qID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfai5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCAwXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDMsIHZlcnRpY2VzLmxlbmd0aCAtIDJdKTtcbiAgICAgICAgaWYgKHN0ZXBDb3VudCA+IDEpIHtcbiAgICAgICAgICAgIHN0YWlyTWVzaC50cmlhbmdsZUluZGljZXMucHVzaChcbiAgICAgICAgICAgIC8vIHNpZGUgYm90dG9tIGZhY2VzXG4gICAgICAgICAgICBbdmVydGljZXMubGVuZ3RoIC0gMiwgMCwgdmVydGljZXMubGVuZ3RoIC0gNF0sIFt2ZXJ0aWNlcy5sZW5ndGggLSAxLCB2ZXJ0aWNlcy5sZW5ndGggLSAzLCAxXSwgXG4gICAgICAgICAgICAvLyBib3R0b20gZmFjZXNcbiAgICAgICAgICAgIFt2ZXJ0aWNlcy5sZW5ndGggLSA1LCB2ZXJ0aWNlcy5sZW5ndGggLSA0LCB2ZXJ0aWNlcy5sZW5ndGggLSAzXSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDUsIHZlcnRpY2VzLmxlbmd0aCAtIDYsIHZlcnRpY2VzLmxlbmd0aCAtIDRdKTtcbiAgICAgICAgICAgIChfayA9IHN0YWlyTWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9rID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfay5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSA1LCB2ZXJ0aWNlcy5sZW5ndGggLSA0XSwgW3ZlcnRpY2VzLmxlbmd0aCAtIDMsIDFdLCBbMCwgdmVydGljZXMubGVuZ3RoIC0gNF0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChjb3JuZXJWZXJ0aWNlcy5sZW5ndGggPT09IDYpIHtcbiAgICAgICAgZ2VuZXJhdGVQb2x5Z29uTWVzaChjb3JuZXJWZXJ0aWNlcywgc3RhaXJNZXNoKTtcbiAgICB9XG4gICAgc2VnbWVudC5tZXNoID0gc3RhaXJNZXNoO1xufVxuZnVuY3Rpb24gZ2VuZXJhdGVQbGF0Zm9ybU1lc2goc2VnbWVudCkge1xuICAgIGNvbnN0IHsgc3RhaXJTaGFwZTogeyB2ZXJ0aWNlcyB9IH0gPSBzZWdtZW50O1xuICAgIGNvbnN0IHZlcnRleExlbmd0aCA9IHZlcnRpY2VzLmxlbmd0aCAvIDI7XG4gICAgaWYgKHZlcnRleExlbmd0aCA9PT0gNCB8fCB2ZXJ0ZXhMZW5ndGggPT09IDUpIHtcbiAgICAgICAgY29uc3QgcGxhdGZvcm1NZXNoID0ge1xuICAgICAgICAgICAgdmVydGljZXM6IFtdLFxuICAgICAgICAgICAgdHJpYW5nbGVJbmRpY2VzOiBbXSxcbiAgICAgICAgICAgIHNvZnRFZGdlczogW10sXG4gICAgICAgIH07XG4gICAgICAgIGdlbmVyYXRlUG9seWdvbk1lc2godmVydGljZXMsIHBsYXRmb3JtTWVzaCk7XG4gICAgICAgIHNlZ21lbnQubWVzaCA9IHBsYXRmb3JtTWVzaDtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIGdlbmVyYXRlUG9seWdvbk1lc2godmVydGljZXMsIG1lc2gpIHtcbiAgICB2YXIgX2EsIF9iO1xuICAgIGNvbnN0IHZlcnRleExlbmd0aCA9IG1lc2gudmVydGljZXMubGVuZ3RoO1xuICAgIG1lc2gudmVydGljZXMucHVzaCguLi52ZXJ0aWNlcy5tYXAodmVydGV4ID0+IFt2ZXJ0ZXgueCwgdmVydGV4LnksIHZlcnRleC56XSkpO1xuICAgIGNvbnN0IHNlZ0NvdW50ID0gdmVydGljZXMubGVuZ3RoIC8gMjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlZ0NvdW50OyBpKyspIHtcbiAgICAgICAgY29uc3QgcmlnaHQgPSBpID09PSBzZWdDb3VudCAtIDEgPyAwIDogaSArIDE7XG4gICAgICAgIGNvbnN0IGJvdHRvbVJpZ2h0ID0gaSA9PT0gc2VnQ291bnQgLSAxID8gc2VnQ291bnQgOiBpICsgc2VnQ291bnQgKyAxO1xuICAgICAgICBtZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFtpICsgdmVydGV4TGVuZ3RoLCBpICsgc2VnQ291bnQgKyB2ZXJ0ZXhMZW5ndGgsIGJvdHRvbVJpZ2h0ICsgdmVydGV4TGVuZ3RoXSwgW2kgKyB2ZXJ0ZXhMZW5ndGgsIGJvdHRvbVJpZ2h0ICsgdmVydGV4TGVuZ3RoLCByaWdodCArIHZlcnRleExlbmd0aF0pO1xuICAgICAgICAoX2EgPSBtZXNoLnNvZnRFZGdlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnB1c2goW2kgKyB2ZXJ0ZXhMZW5ndGgsIGJvdHRvbVJpZ2h0ICsgdmVydGV4TGVuZ3RoXSk7XG4gICAgICAgIGlmIChpID4gMCAmJiBpIDwgc2VnQ291bnQgLSAxKSB7XG4gICAgICAgICAgICBtZXNoLnRyaWFuZ2xlSW5kaWNlcy5wdXNoKFxuICAgICAgICAgICAgLy8gdG9wIGFuZCBib3R0b21cbiAgICAgICAgICAgIFtpICsgdmVydGV4TGVuZ3RoLCByaWdodCArIHZlcnRleExlbmd0aCwgMCArIHZlcnRleExlbmd0aF0sIFtib3R0b21SaWdodCArIHZlcnRleExlbmd0aCwgaSArIHNlZ0NvdW50ICsgdmVydGV4TGVuZ3RoLCBzZWdDb3VudCArIHZlcnRleExlbmd0aF0pO1xuICAgICAgICAgICAgaWYgKGkgPiAxKSB7XG4gICAgICAgICAgICAgICAgKF9iID0gbWVzaC5zb2Z0RWRnZXMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5wdXNoKFtpLCAwICsgdmVydGV4TGVuZ3RoXSwgW2kgKyBzZWdDb3VudCArIHZlcnRleExlbmd0aCwgc2VnQ291bnQgKyB2ZXJ0ZXhMZW5ndGhdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBsb2FkRGVmYXVsdE1hdGVyaWFscygpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zdCBkZXNpZ24gPSBhcHAuZ2V0QWN0aXZlRGVzaWduKCk7XG4gICAgICAgIGNvbnN0IHJlczEgPSB5aWVsZCBkZXNpZ24ubG9hZE1hdGVyaWFsKFByZXNldE1hdGVyaWFscy5TdGFpci5tYXRlcmlhbElkKTtcbiAgICAgICAgaWYgKCFyZXMxLmlzU3VjY2Vzcykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlczIgPSB5aWVsZCBkZXNpZ24ubG9hZE1hdGVyaWFsKFByZXNldE1hdGVyaWFscy5QbGF0Zm9ybS5tYXRlcmlhbElkKTtcbiAgICAgICAgaWYgKCFyZXMyLmlzU3VjY2Vzcykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlczMgPSB5aWVsZCBkZXNpZ24ubG9hZE1hdGVyaWFsKFByZXNldE1hdGVyaWFscy5IYW5kcmFpbC5yYWlsLm1hdGVyaWFsSWQpO1xuICAgICAgICBpZiAoIXJlczMuaXNTdWNjZXNzKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzNCA9IHlpZWxkIGRlc2lnbi5sb2FkTWF0ZXJpYWwoUHJlc2V0TWF0ZXJpYWxzLkhhbmRyYWlsLmNvbHVtbi5tYXRlcmlhbElkKTtcbiAgICAgICAgaWYgKCFyZXM0LmlzU3VjY2Vzcykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkQ29tcG9uZW50SW5zdGFuY2Uoc2VnbWVudCwgc2VnbWVudHMsIHBhcmVudFRyYW5zZm9ybSkge1xuICAgIHZhciBfYSwgX2I7XG4gICAgY29uc3QgeyBzdGFydCwgZW5kLCBzdGFydEhlaWdodCwgZW5kSGVpZ2h0LCBiYXNlQ29tcG9uZW50LCBjaXJjbGVUYW5nZW50LCBwYXJhbSwgbWVzaCB9ID0gc2VnbWVudDtcbiAgICBjb25zdCBkZXNpZ24gPSBhcHAuZ2V0QWN0aXZlRGVzaWduKCk7XG4gICAgbGV0IG9wZXJhdGlvblN1Y2Nlc3MgPSB0cnVlO1xuICAgIGlmIChtZXNoID09PSBudWxsIHx8IG1lc2ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1lc2gudmVydGljZXMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IG5ld1NoZWxsID0gKF9hID0gZGVzaWduLmNyZWF0ZVNoZWxsRnJvbU1lc2gobWVzaCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5uZXdTaGVsbDtcbiAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgISFuZXdTaGVsbDtcbiAgICAgICAgaWYgKG5ld1NoZWxsKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdJbnN0YW5jZSA9IChfYiA9IGRlc2lnbi5tYWtlR3JvdXAobmV3U2hlbGwuZ2V0RmFjZXMoKSwgW10sIFtdKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmFkZGVkSW5zdGFuY2U7XG4gICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiAhIW5ld0luc3RhbmNlO1xuICAgICAgICAgICAgY29uc3QgZ3JvdXBEZWYgPSBuZXdJbnN0YW5jZSA9PT0gbnVsbCB8fCBuZXdJbnN0YW5jZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogbmV3SW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCk7XG4gICAgICAgICAgICBpZiAobmV3SW5zdGFuY2UgJiYgZ3JvdXBEZWYpIHtcbiAgICAgICAgICAgICAgICBpZiAocGFyZW50VHJhbnNmb3JtKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRyYW5zZm9ybVJlcyA9IGRlc2lnbi50cmFuc2Zvcm1Hcm91cEluc3RhbmNlcyhbbmV3SW5zdGFuY2VdLCBwYXJlbnRUcmFuc2Zvcm0uaW52ZXJzZWQoKSk7XG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIHRyYW5zZm9ybVJlcy5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsT2JqZWN0ID0gcGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSA/IFByZXNldE1hdGVyaWFscy5QbGF0Zm9ybSA6IFByZXNldE1hdGVyaWFscy5TdGFpcjtcbiAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBkZXNpZ24uYXNzaWduTWF0ZXJpYWxGb3JFbnRpdGllcyhbbmV3SW5zdGFuY2VdLCBtYXRlcmlhbE9iamVjdC5tYXRlcmlhbElkLCBtYXRlcmlhbE9iamVjdC5iZ0lkKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJhbVN0cmluZyA9IHN0cmluZ2lmeUNvbXBvbmVudFBhcmFtKHBhcmFtKTtcbiAgICAgICAgICAgICAgICBvcGVyYXRpb25TdWNjZXNzID0gb3BlcmF0aW9uU3VjY2VzcyAmJiBncm91cERlZi5zZXRDdXN0b21Qcm9wZXJ0eShDb21wb25lbnRQYXJhbUtleSwgcGFyYW1TdHJpbmcpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICBpZiAocGFyYW0ubWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29tcG9uZW50TWF0ZXJpYWxTdHJpbmcgPSBzdHJpbmdpZnlNYXRlcmlhbChwYXJhbS5tYXRlcmlhbCk7XG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGdyb3VwRGVmLnNldEN1c3RvbVByb3BlcnR5KENvbXBvbmVudE1hdGVyaWFsS2V5LCBjb21wb25lbnRNYXRlcmlhbFN0cmluZykuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydEVuZFN0cmluZyA9IHN0cmluZ2lmeVN0YXJ0RW5kKEdlb21MaWIuY3JlYXRlUG9pbnQzZChzdGFydC54LCBzdGFydC55LCBzdGFydEhlaWdodCksIEdlb21MaWIuY3JlYXRlUG9pbnQzZChlbmQueCwgZW5kLnksIGVuZEhlaWdodCkpO1xuICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGdyb3VwRGVmLnNldEN1c3RvbVByb3BlcnR5KFN0YXJ0RW5kS2V5LCBzdGFydEVuZFN0cmluZykuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgIGlmIChiYXNlQ29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VMaW5lU3RyaW5nID0gc3RyaW5naWZ5U3RhcnRFbmQoYmFzZUNvbXBvbmVudC5saW5lM2Quc3RhcnQsIGJhc2VDb21wb25lbnQubGluZTNkLmVuZCk7XG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGdyb3VwRGVmLnNldEN1c3RvbVByb3BlcnR5KEJhc2VMaW5lU2VnM2RLZXksIGJhc2VMaW5lU3RyaW5nKS5pc1N1Y2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VTZWdtZW50ID0gZ2V0U2VnbWVudEJ5SW5kZXgoc2VnbWVudHMsIGJhc2VDb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYmFzZVNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VDb21wb25lbnRTdHJpbmcgPSBzdHJpbmdpZnlCYXNlQ29tcG9uZW50KGJhc2VTZWdtZW50LCBiYXNlQ29tcG9uZW50LmxpbmUzZEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvblN1Y2Nlc3MgPSBvcGVyYXRpb25TdWNjZXNzICYmIGdyb3VwRGVmLnNldEN1c3RvbVByb3BlcnR5KEJhc2VDb21wb25lbnRLZXksIGJhc2VDb21wb25lbnRTdHJpbmcpLmlzU3VjY2VzcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY2lyY2xlVGFuZ2VudCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YW5nZW50U3RyaW5nID0gc3RyaW5naWZ5UG9pbnQzZChjaXJjbGVUYW5nZW50KTtcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uU3VjY2VzcyA9IG9wZXJhdGlvblN1Y2Nlc3MgJiYgZ3JvdXBEZWYuc2V0Q3VzdG9tUHJvcGVydHkoQ2lyY2xlVGFuZ2VudEtleSwgdGFuZ2VudFN0cmluZykuaXNTdWNjZXNzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3SW5zdGFuY2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBidWlsZEhhbmRyYWlsSW5zdGFuY2Uoc3RhaXJQYXJhbSwgaGFuZHJhaWxzLCBwYXJlbnRUcmFuc2Zvcm0pIHtcbiAgICB2YXIgX2EsIF9iLCBfYztcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zdCB7IGhhbmRyYWlsOiB7IHN1cHBvcnQsIGhlaWdodCwgcmFpbDogeyB0eXBlOiByYWlsVHlwZSwgcGFyYW06IHJhaWxQYXJhbSB9LCBjb2x1bW46IHsgdHlwZTogY29sdW1uVHlwZSwgcGFyYW06IGNvbHVtblBhcmFtIH0gfSB9ID0gc3RhaXJQYXJhbTtcbiAgICAgICAgaWYgKCFzdXBwb3J0KSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY29sdW1uRmFjZTtcbiAgICAgICAgaWYgKGNvbHVtblR5cGUgPT09IENvbHVtblR5cGUuQ2lyY2xlKSB7XG4gICAgICAgICAgICBjb2x1bW5GYWNlID0gZHJhd0NpcmNsZShkdW1teVBvaW50M2QsIERpcmVjdGlvblosIGNvbHVtblBhcmFtLnJhZGl1cyB8fCBEZWZhdWx0U3RhaXJQYXJhbS5ob3Jpem9udGFsU3RlcCAvIDEwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb2x1bW5UeXBlID09PSBDb2x1bW5UeXBlLlJlY3QpIHtcbiAgICAgICAgICAgIGNvbHVtbkZhY2UgPSBkcmF3UmVjdChkdW1teVBvaW50M2QsIERpcmVjdGlvblosIGNvbHVtblBhcmFtLndpZHRoIHx8IERlZmF1bHRTdGFpclBhcmFtLmhvcml6b250YWxTdGVwIC8gMTAsIGNvbHVtblBhcmFtLmhlaWdodCB8fCBEZWZhdWx0U3RhaXJQYXJhbS5ob3Jpem9udGFsU3RlcCAvIDEwLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb2x1bW5Mb29wID0gY29sdW1uRmFjZSA9PT0gbnVsbCB8fCBjb2x1bW5GYWNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb2x1bW5GYWNlLmdldE91dGVyTG9vcCgpO1xuICAgICAgICBpZiAoIWNvbHVtbkZhY2UgfHwgIWNvbHVtbkxvb3ApIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYWN0aXZlRGVzaWduID0gYXBwLmdldEFjdGl2ZURlc2lnbigpO1xuICAgICAgICBjb25zdCBoYW5kcmFpbEluc3RhbmNlID0gKF9hID0gYWN0aXZlRGVzaWduLm1ha2VHcm91cChbY29sdW1uRmFjZV0sIFtdLCBbXSkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hZGRlZEluc3RhbmNlO1xuICAgICAgICBjb25zdCBoYW5kcmFpbERlZmluaXRpb24gPSBoYW5kcmFpbEluc3RhbmNlID09PSBudWxsIHx8IGhhbmRyYWlsSW5zdGFuY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGhhbmRyYWlsSW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCk7XG4gICAgICAgIGlmICghaGFuZHJhaWxJbnN0YW5jZSB8fCAhaGFuZHJhaWxEZWZpbml0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJlbnRUcmFuc2Zvcm0pIHtcbiAgICAgICAgICAgIGNvbnN0IHRyYW5zZm9ybVJlcyA9IGFjdGl2ZURlc2lnbi50cmFuc2Zvcm1Hcm91cEluc3RhbmNlcyhbaGFuZHJhaWxJbnN0YW5jZV0sIHBhcmVudFRyYW5zZm9ybS5pbnZlcnNlZCgpKTtcbiAgICAgICAgICAgIGlmICghdHJhbnNmb3JtUmVzLmlzU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYWN0aXZhdGVJbnN0YW5jZVJlcyA9IHlpZWxkIGFjdGl2ZURlc2lnbi5hY3RpdmF0ZUdyb3VwSW5zdGFuY2UoaGFuZHJhaWxJbnN0YW5jZSk7XG4gICAgICAgIGlmICghYWN0aXZhdGVJbnN0YW5jZVJlcy5pc1N1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29sdW1uQXV4aWxpYXJ5Qm91bmRlZEN1cnZlID0gKF9iID0gYWN0aXZlRGVzaWduLmFkZEF1eGlsaWFyeUJvdW5kZWRDdXJ2ZShHZW9tTGliLmNyZWF0ZUxpbmVTZWdtZW50M2QoR2VvbUxpYi5jcmVhdGVQb2ludDNkKDAsIDAsIGhlaWdodCksIGR1bW15UG9pbnQzZCkpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuYWRkZWRDdXJ2ZTtcbiAgICAgICAgaWYgKCFjb2x1bW5BdXhpbGlhcnlCb3VuZGVkQ3VydmUpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3dlZXBDb2x1bW5SZXMgPSBhY3RpdmVEZXNpZ24uc3dlZXBGb2xsb3dDdXJ2ZXMoY29sdW1uTG9vcCwgW2NvbHVtbkF1eGlsaWFyeUJvdW5kZWRDdXJ2ZV0pO1xuICAgICAgICBpZiAoIXN3ZWVwQ29sdW1uUmVzLmlzU3VjY2VzcyB8fCAhc3dlZXBDb2x1bW5SZXMuYWRkZWRTaGVsbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbHVtbk9yaWdpbkZhY2VzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgY29sdW1uT3JpZ2luU2hlbGwgb2Ygc3dlZXBDb2x1bW5SZXMuYWRkZWRTaGVsbHMpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbkZhY2VzID0gY29sdW1uT3JpZ2luU2hlbGwuZ2V0RmFjZXMoKTtcbiAgICAgICAgICAgIGNvbHVtbk9yaWdpbkZhY2VzLnB1c2goLi4uY29sdW1uRmFjZXMpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbHVtbk9yaWdpbkluc3RhbmNlID0gKF9jID0gYWN0aXZlRGVzaWduLm1ha2VHcm91cChjb2x1bW5PcmlnaW5GYWNlcywgW10sIFtdKSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmFkZGVkSW5zdGFuY2U7XG4gICAgICAgIGlmICghY29sdW1uT3JpZ2luSW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29sdW1uTWF0cml4ZXMgPSBbXTtcbiAgICAgICAgY29uc3QgcmFpbEluc3RhbmNlcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGhhbmRyYWlscy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgY29uc3QgeyByYWlsLCBjb2x1bW5zIH0gPSBoYW5kcmFpbHNbal07XG4gICAgICAgICAgICBjb25zdCByYWlsQm91bmRlZEN1cnZlcyA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByYWlsLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhaWxQb2ludCA9IHJhaWxbaV07XG4gICAgICAgICAgICAgICAgY29uc3QgcmFpbE5leHRQb2ludCA9IHJhaWxbaSArIDFdO1xuICAgICAgICAgICAgICAgIHJhaWxCb3VuZGVkQ3VydmVzLnB1c2goKTtcbiAgICAgICAgICAgICAgICBjb25zdCBhZGRBdXhSZXMgPSBhY3RpdmVEZXNpZ24uYWRkQXV4aWxpYXJ5Qm91bmRlZEN1cnZlKEdlb21MaWIuY3JlYXRlTGluZVNlZ21lbnQzZChyYWlsUG9pbnQsIHJhaWxOZXh0UG9pbnQpKTtcbiAgICAgICAgICAgICAgICBpZiAoYWRkQXV4UmVzID09PSBudWxsIHx8IGFkZEF1eFJlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogYWRkQXV4UmVzLmFkZGVkQ3VydmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmFpbEJvdW5kZWRDdXJ2ZXMucHVzaChhZGRBdXhSZXMuYWRkZWRDdXJ2ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyYWlsQm91bmRlZEN1cnZlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByYWlsU3RhcnRDdXJ2ZSA9IHJhaWxCb3VuZGVkQ3VydmVzWzBdLmdldEJvdW5kZWRDdXJ2ZSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhaWxTdGFydFBvaW50ID0gKHJhaWxTdGFydEN1cnZlID09PSBudWxsIHx8IHJhaWxTdGFydEN1cnZlID09PSB2b2lkIDAgPyB2b2lkIDAgOiByYWlsU3RhcnRDdXJ2ZS5zdGFydFBvaW50KSB8fCBkdW1teVBvaW50M2Q7XG4gICAgICAgICAgICAgICAgY29uc3QgcmFpbFN0YXJ0RGlyID0gKHJhaWxTdGFydEN1cnZlID09PSBudWxsIHx8IHJhaWxTdGFydEN1cnZlID09PSB2b2lkIDAgPyB2b2lkIDAgOiByYWlsU3RhcnRDdXJ2ZS5lbmRQb2ludC5zdWJ0cmFjdGVkKHJhaWxTdGFydFBvaW50KS5ub3JtYWxpemVkKCkucmV2ZXJzZWQoKSkgfHwgRGlyZWN0aW9uWjtcbiAgICAgICAgICAgICAgICBsZXQgcmFpbEZhY2U7XG4gICAgICAgICAgICAgICAgaWYgKHJhaWxUeXBlID09PSBSYWlsVHlwZS5DaXJjbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmFpbEZhY2UgPSBkcmF3Q2lyY2xlKHJhaWxTdGFydFBvaW50LCByYWlsU3RhcnREaXIsIHJhaWxQYXJhbS5yYWRpdXMgfHwgRGVmYXVsdFN0YWlyUGFyYW0uaG9yaXpvbnRhbFN0ZXAgLyA1KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocmFpbFR5cGUgPT09IFJhaWxUeXBlLlJlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgcmFpbEZhY2UgPSBkcmF3UmVjdChyYWlsU3RhcnRQb2ludCwgcmFpbFN0YXJ0RGlyLCByYWlsUGFyYW0ud2lkdGggfHwgRGVmYXVsdFN0YWlyUGFyYW0uaG9yaXpvbnRhbFN0ZXAgLyA1LCByYWlsUGFyYW0uaGVpZ2h0IHx8IERlZmF1bHRTdGFpclBhcmFtLmhvcml6b250YWxTdGVwIC8gNSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcmFpbExvb3AgPSByYWlsRmFjZSA9PT0gbnVsbCB8fCByYWlsRmFjZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmFpbEZhY2UuZ2V0T3V0ZXJMb29wKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFyYWlsRmFjZSB8fCAhcmFpbExvb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3Qgc3dlZXBSYWlsUmVzID0gYWN0aXZlRGVzaWduLnN3ZWVwRm9sbG93Q3VydmVzKHJhaWxMb29wLCByYWlsQm91bmRlZEN1cnZlcyk7XG4gICAgICAgICAgICAgICAgaWYgKCFzd2VlcFJhaWxSZXMuaXNTdWNjZXNzIHx8ICFzd2VlcFJhaWxSZXMuYWRkZWRTaGVsbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHJhaWxGYWNlcyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcmFpbFNoZWxsIG9mIHN3ZWVwUmFpbFJlcy5hZGRlZFNoZWxscykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByYWlsU2hlbGxGYWNlcyA9IHJhaWxTaGVsbC5nZXRGYWNlcygpO1xuICAgICAgICAgICAgICAgICAgICByYWlsRmFjZXMucHVzaCguLi5yYWlsU2hlbGxGYWNlcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcmFpbEJvdW5kZWRDdXJ2ZSBvZiByYWlsQm91bmRlZEN1cnZlcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZW1vdmVSYWlsQm91bmRlZEN1cnZlUmVzID0gYWN0aXZlRGVzaWduLnJlbW92ZUF1eGlsaWFyeUN1cnZlKHJhaWxCb3VuZGVkQ3VydmUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlbW92ZVJhaWxCb3VuZGVkQ3VydmVSZXMuaXNTdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHJhaWxNYWtlR3JvdXBSZXMgPSBhY3RpdmVEZXNpZ24ubWFrZUdyb3VwKHJhaWxGYWNlcywgW10sIFtdKTtcbiAgICAgICAgICAgICAgICBjb25zdCByYWlsR3JvdXBEZWYgPSByYWlsTWFrZUdyb3VwUmVzID09PSBudWxsIHx8IHJhaWxNYWtlR3JvdXBSZXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJhaWxNYWtlR3JvdXBSZXMuYWRkZWRJbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAoIShyYWlsTWFrZUdyb3VwUmVzID09PSBudWxsIHx8IHJhaWxNYWtlR3JvdXBSZXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJhaWxNYWtlR3JvdXBSZXMuYWRkZWRJbnN0YW5jZSkgfHwgIXJhaWxHcm91cERlZikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCByYWlsUHJvcGVydHlSZXMgPSByYWlsR3JvdXBEZWYuc2V0Q3VzdG9tUHJvcGVydHkoUmFpbE1vZGVsS2V5LCBNb2RlbFZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAoIXJhaWxQcm9wZXJ0eVJlcy5pc1N1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmFpbEluc3RhbmNlcy5wdXNoKHJhaWxNYWtlR3JvdXBSZXMuYWRkZWRJbnN0YW5jZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNvbHVtbiBvZiBjb2x1bW5zKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sdW1uU2NhbGVNYXQgPSBHZW9tTGliLmNyZWF0ZVNjYWxlTWF0cml4NCgxLCAxLCAoY29sdW1uWzFdLnogLSBjb2x1bW5bMF0ueikgLyBoZWlnaHQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbHVtblRyYW5zbGF0ZU1hdCA9IEdlb21MaWIuY3JlYXRlVHJhbnNsYXRpb25NYXRyaXg0KGNvbHVtblswXS54LCBjb2x1bW5bMF0ueSwgY29sdW1uWzBdLnopO1xuICAgICAgICAgICAgICAgIGNvbHVtbk1hdHJpeGVzLnB1c2goY29sdW1uVHJhbnNsYXRlTWF0Lm11bHRpcGxpZWQoY29sdW1uU2NhbGVNYXQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocmFpbEluc3RhbmNlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGFzc2lnblJhaWxNYXRlcmlhbFJlcyA9IGFjdGl2ZURlc2lnbi5hc3NpZ25NYXRlcmlhbEZvckVudGl0aWVzKHJhaWxJbnN0YW5jZXMsIFByZXNldE1hdGVyaWFscy5IYW5kcmFpbC5yYWlsLm1hdGVyaWFsSWQsIFByZXNldE1hdGVyaWFscy5IYW5kcmFpbC5yYWlsLmJnSWQpO1xuICAgICAgICAgICAgaWYgKCFhc3NpZ25SYWlsTWF0ZXJpYWxSZXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbHVtbkluc3RhbmNlcyA9IFtdO1xuICAgICAgICBpZiAoY29sdW1uTWF0cml4ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBjb2x1bW5Db3B5UmVzID0gYWN0aXZlRGVzaWduLmJ1bGtDb3B5R3JvdXBJbnN0YW5jZXMoW2NvbHVtbk9yaWdpbkluc3RhbmNlXSwgW2NvbHVtbk1hdHJpeGVzXSk7XG4gICAgICAgICAgICBpZiAoIShjb2x1bW5Db3B5UmVzID09PSBudWxsIHx8IGNvbHVtbkNvcHlSZXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbHVtbkNvcHlSZXMuYWRkZWRJbnN0YW5jZXMubGVuZ3RoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb2x1bW5JbnN0YW5jZXMucHVzaCguLi5jb2x1bW5Db3B5UmVzLmFkZGVkSW5zdGFuY2VzKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgY29sdW1uSW5zdGFuY2Ugb2YgY29sdW1uQ29weVJlcy5hZGRlZEluc3RhbmNlcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbHVtbkdyb3VwRGVmID0gY29sdW1uSW5zdGFuY2UuZ2V0R3JvdXBEZWZpbml0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFjb2x1bW5Hcm91cERlZikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBjb2x1bW5Qcm9wZXJ0eVJlcyA9IGNvbHVtbkdyb3VwRGVmLnNldEN1c3RvbVByb3BlcnR5KENvbHVtbk1vZGVsS2V5LCBNb2RlbFZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAoIWNvbHVtblByb3BlcnR5UmVzLmlzU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGFzc2lnbkNvbHVtbk1hdGVyaWFsUmVzID0gYWN0aXZlRGVzaWduLmFzc2lnbk1hdGVyaWFsRm9yRW50aXRpZXMoY29sdW1uQ29weVJlcy5hZGRlZEluc3RhbmNlcywgUHJlc2V0TWF0ZXJpYWxzLkhhbmRyYWlsLmNvbHVtbi5tYXRlcmlhbElkLCBQcmVzZXRNYXRlcmlhbHMuSGFuZHJhaWwuY29sdW1uLmJnSWQpO1xuICAgICAgICAgICAgaWYgKCFhc3NpZ25Db2x1bW5NYXRlcmlhbFJlcykge1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVtb3ZlT3JpZ2luQ29sdW1uUmVzID0gYWN0aXZlRGVzaWduLnJlbW92ZUdyb3VwSW5zdGFuY2UoY29sdW1uT3JpZ2luSW5zdGFuY2UpO1xuICAgICAgICBpZiAoIXJlbW92ZU9yaWdpbkNvbHVtblJlcy5pc1N1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVtb3ZlT3JpZ2luQ29sdW1uQXV4Q3VydmVSZXMgPSBhY3RpdmVEZXNpZ24ucmVtb3ZlQXV4aWxpYXJ5Q3VydmUoY29sdW1uQXV4aWxpYXJ5Qm91bmRlZEN1cnZlKTtcbiAgICAgICAgaWYgKCFyZW1vdmVPcmlnaW5Db2x1bW5BdXhDdXJ2ZVJlcy5pc1N1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdG8gcmVtb3ZlIGFsbCBhdXhpbGlhcnlDdXJ2ZXNcbiAgICAgICAgY29uc3QgZGVhY3RpdmF0ZUluc3RhbmNlUmVzID0geWllbGQgYWN0aXZlRGVzaWduLmRlYWN0aXZhdGVHcm91cEluc3RhbmNlKCk7XG4gICAgICAgIGlmICghZGVhY3RpdmF0ZUluc3RhbmNlUmVzLmlzU3VjY2Vzcykge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZXRQcm9wZXJ0eVJlcyA9IGhhbmRyYWlsRGVmaW5pdGlvbi5zZXRDdXN0b21Qcm9wZXJ0eShIYW5kcmFpbE1vZGVsS2V5LCBNb2RlbFZhbHVlKTtcbiAgICAgICAgaWYgKCFzZXRQcm9wZXJ0eVJlcy5pc1N1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhhbmRyYWlsSW5zdGFuY2U6IHsgaW5zdGFuY2U6IGhhbmRyYWlsSW5zdGFuY2UsIGluc3RhbmNlS2V5OiBoYW5kcmFpbEluc3RhbmNlLmdldEtleSgpLCBkZWZpbml0aW9uS2V5OiBoYW5kcmFpbERlZmluaXRpb24uZ2V0S2V5KCkgfSxcbiAgICAgICAgICAgIHJhaWxJbnN0YW5jZXM6IHJhaWxJbnN0YW5jZXMubWFwKGluc3RhbmNlID0+IHsgdmFyIF9hOyByZXR1cm4gKHsgaW5zdGFuY2UsIGluc3RhbmNlS2V5OiBpbnN0YW5jZS5nZXRLZXkoKSwgZGVmaW5pdGlvbktleTogKChfYSA9IGluc3RhbmNlLmdldEdyb3VwRGVmaW5pdGlvbigpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZ2V0S2V5KCkpIHx8ICcnIH0pOyB9KSxcbiAgICAgICAgICAgIGNvbHVtbkluc3RhbmNlczogY29sdW1uSW5zdGFuY2VzLm1hcChpbnN0YW5jZSA9PiB7IHZhciBfYTsgcmV0dXJuICh7IGluc3RhbmNlLCBpbnN0YW5jZUtleTogaW5zdGFuY2UuZ2V0S2V5KCksIGRlZmluaXRpb25LZXk6ICgoX2EgPSBpbnN0YW5jZS5nZXRHcm91cERlZmluaXRpb24oKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmdldEtleSgpKSB8fCAnJyB9KTsgfSksXG4gICAgICAgIH07XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZHJhd0NpcmNsZShjZW50ZXIsIG5vcm1hbCwgcmFkaXVzKSB7XG4gICAgY29uc3QgYWN0aXZlRGVzaWduID0gYXBwLmdldEFjdGl2ZURlc2lnbigpO1xuICAgIGNvbnN0IHJlcyA9IGFjdGl2ZURlc2lnbi5hZGRDaXJjbGUoR2VvbUxpYi5jcmVhdGVDaXJjbGUzZEJ5Q2VudGVyTm9ybWFsUmFkaXVzKGNlbnRlciwgbm9ybWFsLCByYWRpdXMpKTtcbiAgICBpZiAocmVzID09PSBudWxsIHx8IHJlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVzLmFkZGVkRWRnZXMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IHNoZWxsID0gcmVzLmFkZGVkRWRnZXNbMF0uZ2V0U2hlbGwoKTtcbiAgICAgICAgY29uc3QgZmFjZXMgPSBzaGVsbCA9PT0gbnVsbCB8fCBzaGVsbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2hlbGwuZ2V0RmFjZXMoKTtcbiAgICAgICAgaWYgKChmYWNlcyA9PT0gbnVsbCB8fCBmYWNlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogZmFjZXMubGVuZ3RoKSA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhY2VzWzBdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG5leHBvcnQgZnVuY3Rpb24gZHJhd1JlY3QoY2VudGVyLCBub3JtYWwsIHdpZHRoLCBoZWlnaHQsIHdpdGhDb3JuZXIgPSB0cnVlKSB7XG4gICAgY29uc3QgcG9pbnQxID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKC13aWR0aCAvIDIsIDAsIDApO1xuICAgIGNvbnN0IHBvaW50MiA9IEdlb21MaWIuY3JlYXRlUG9pbnQzZCh3aWR0aCAvIDIsIDAsIDApO1xuICAgIGxldCBwb2ludHMgPSBbcG9pbnQxLCBwb2ludDJdO1xuICAgIGlmICh3aXRoQ29ybmVyKSB7XG4gICAgICAgIGNvbnN0IHA1ID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKHdpZHRoIC8gMiwgaGVpZ2h0IC8gMyAqIDIsIDApO1xuICAgICAgICBjb25zdCBwNiA9IEdlb21MaWIuY3JlYXRlUG9pbnQzZCh3aWR0aCAvIDQsIGhlaWdodCwgMCk7XG4gICAgICAgIGNvbnN0IG0xID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKChwNS54ICsgcDYueCkgLyAyLCAocDUueSArIHA2LnkpIC8gMiwgMCk7XG4gICAgICAgIGNvbnN0IGRpcjEgPSBwNi5zdWJ0cmFjdGVkKHA1KS5ub3JtYWxpemVkKCk7XG4gICAgICAgIGNvbnN0IHRvQ2VudGVyRGlyMSA9IERpcmVjdGlvblouY3Jvc3MoZGlyMSk7XG4gICAgICAgIGNvbnN0IGQxID0gcDUuZGlzdGFuY2VUbyhwNik7XG4gICAgICAgIGNvbnN0IGgxID0gZDEgLyAyIC8gTWF0aC50YW4oTWF0aC5QSSAvIDYpO1xuICAgICAgICBjb25zdCBjZW50ZXIxID0gbTEuYWRkZWQodG9DZW50ZXJEaXIxLm11bHRpcGxpZWQoaDEpKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCByb3RhdGVNYXQgPSBHZW9tTGliLmNyZWF0ZVJvdGF0ZU1hdHJpeDQoaSAqIE1hdGguUEkgLyAzMCwgRGlyZWN0aW9uWiwgY2VudGVyMSk7XG4gICAgICAgICAgICBjb25zdCBkaXNjcmV0ZVBvaW50ID0gcDUuYXBwbGllZE1hdHJpeDQocm90YXRlTWF0KTtcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKGRpc2NyZXRlUG9pbnQpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHA3ID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKC13aWR0aCAvIDQsIGhlaWdodCwgMCk7XG4gICAgICAgIGNvbnN0IHA4ID0gR2VvbUxpYi5jcmVhdGVQb2ludDNkKC13aWR0aCAvIDIsIGhlaWdodCAvIDMgKiAyLCAwKTtcbiAgICAgICAgY29uc3QgbTIgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QoKHA3LnggKyBwOC54KSAvIDIsIChwNy55ICsgcDgueSkgLyAyLCAwKTtcbiAgICAgICAgY29uc3QgZGlyMiA9IHA4LnN1YnRyYWN0ZWQocDcpLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgY29uc3QgdG9DZW50ZXJEaXIyID0gRGlyZWN0aW9uWi5jcm9zcyhkaXIyKTtcbiAgICAgICAgY29uc3QgZDIgPSBwNy5kaXN0YW5jZVRvKHA4KTtcbiAgICAgICAgY29uc3QgaDIgPSBkMiAvIDIgLyBNYXRoLnRhbihNYXRoLlBJIC8gNik7XG4gICAgICAgIGNvbnN0IGNlbnRlcjIgPSBtMi5hZGRlZCh0b0NlbnRlckRpcjIubXVsdGlwbGllZChoMikpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDExOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHJvdGF0ZU1hdCA9IEdlb21MaWIuY3JlYXRlUm90YXRlTWF0cml4NChpICogTWF0aC5QSSAvIDMwLCBEaXJlY3Rpb25aLCBjZW50ZXIyKTtcbiAgICAgICAgICAgIGNvbnN0IGRpc2NyZXRlUG9pbnQgPSBwNy5hcHBsaWVkTWF0cml4NChyb3RhdGVNYXQpO1xuICAgICAgICAgICAgcG9pbnRzLnB1c2goZGlzY3JldGVQb2ludCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IHBvaW50MyA9IEdlb21MaWIuY3JlYXRlUG9pbnQzZCh3aWR0aCAvIDIsIGhlaWdodCwgMCk7XG4gICAgICAgIGNvbnN0IHBvaW50NCA9IEdlb21MaWIuY3JlYXRlUG9pbnQzZCgtd2lkdGggLyAyLCBoZWlnaHQsIDApO1xuICAgICAgICBwb2ludHMucHVzaChwb2ludDMsIHBvaW50NCk7XG4gICAgfVxuICAgIGNvbnN0IGNvb3JkaW5hdGUgPSBnZXRDb29yZGluYXRlKG5vcm1hbCk7XG4gICAgY29uc3QgY29vcmRpbmF0ZU1hdCA9IEdlb21MaWIuY3JlYXRlQWxpZ25DQ1NNYXRyaXg0KGNvb3JkaW5hdGUuZHgsIGNvb3JkaW5hdGUuZHksIGNvb3JkaW5hdGUuZHosIGNlbnRlcik7XG4gICAgY29uc3QgdHJhbnNsYXRlTWF0MSA9IEdlb21MaWIuY3JlYXRlVHJhbnNsYXRpb25NYXRyaXg0KDAsIC1oZWlnaHQgLyAyLCAwKTtcbiAgICBjb25zdCB0cmFuc2Zvcm1NYXQgPSBjb29yZGluYXRlTWF0Lm11bHRpcGxpZWQodHJhbnNsYXRlTWF0MSk7XG4gICAgcG9pbnRzID0gcG9pbnRzLm1hcChwID0+IHAuYXBwbGllZE1hdHJpeDQodHJhbnNmb3JtTWF0KSk7XG4gICAgY29uc3QgYWN0aXZlRGVzaWduID0gYXBwLmdldEFjdGl2ZURlc2lnbigpO1xuICAgIGNvbnN0IHJlcyA9IGFjdGl2ZURlc2lnbi5hZGRFZGdlcyhwb2ludHMpO1xuICAgIGlmIChyZXMgPT09IG51bGwgfHwgcmVzID09PSB2b2lkIDAgPyB2b2lkIDAgOiByZXMuYWRkZWRFZGdlcy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgZWRnZVZlcnRpY2VzID0gbmV3IFNldCgpO1xuICAgICAgICBmb3IgKGNvbnN0IGFkZGVkRWRnZSBvZiByZXMuYWRkZWRFZGdlcykge1xuICAgICAgICAgICAgY29uc3QgdmEgPSBhZGRlZEVkZ2UuZ2V0VmVydGV4QSgpO1xuICAgICAgICAgICAgY29uc3QgdmIgPSBhZGRlZEVkZ2UuZ2V0VmVydGV4QigpO1xuICAgICAgICAgICAgaWYgKHZhKSB7XG4gICAgICAgICAgICAgICAgZWRnZVZlcnRpY2VzLmFkZCh2YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodmIpIHtcbiAgICAgICAgICAgICAgICBlZGdlVmVydGljZXMuYWRkKHZiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZXRTb2Z0UmVzdWx0ID0gYWN0aXZlRGVzaWduLnNldFZlcnRpY2VzU29mdChbLi4uZWRnZVZlcnRpY2VzXSwgdHJ1ZSk7XG4gICAgICAgIGlmIChzZXRTb2Z0UmVzdWx0LmlzU3VjY2Vzcykge1xuICAgICAgICAgICAgY29uc3Qgc2hlbGwgPSByZXMuYWRkZWRFZGdlc1swXS5nZXRTaGVsbCgpO1xuICAgICAgICAgICAgY29uc3QgZmFjZXMgPSBzaGVsbCA9PT0gbnVsbCB8fCBzaGVsbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2hlbGwuZ2V0RmFjZXMoKTtcbiAgICAgICAgICAgIGlmICgoZmFjZXMgPT09IG51bGwgfHwgZmFjZXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGZhY2VzLmxlbmd0aCkgPT09IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFjZXNbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRTZWdtZW50QnlJbmRleChzZWdtZW50cywgaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gc2VnbWVudHMuZmluZChzZWdtZW50ID0+IHNlZ21lbnQucGFyYW0uaW5kZXggPT09IGluZGV4KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBidWlsZFNlZ21lbnRSZWxhdGlvbnMoc2VnbWVudHMpIHtcbiAgICBmb3IgKGNvbnN0IHNlZ21lbnQgb2Ygc2VnbWVudHMpIHtcbiAgICAgICAgY29uc3QgYmFzZUNvbXBvbmVudCA9IHNlZ21lbnQuYmFzZUNvbXBvbmVudDtcbiAgICAgICAgY29uc3QgYmFzZVNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleChzZWdtZW50cywgYmFzZUNvbXBvbmVudCA9PT0gbnVsbCB8fCBiYXNlQ29tcG9uZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBiYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgaWYgKGJhc2VTZWdtZW50ICYmIChiYXNlQ29tcG9uZW50ID09PSBudWxsIHx8IGJhc2VDb21wb25lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJhc2VDb21wb25lbnQubGluZTNkSW5kZXgpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGJhc2VTZWdtZW50Lm5leHRDb21wb25lbnRzW2Jhc2VDb21wb25lbnQubGluZTNkSW5kZXhdLmFkZChzZWdtZW50LnBhcmFtLmluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXROZXh0Q29tcG9uZW50cyhzZWdtZW50LCBzZWdtZW50cykge1xuICAgIGNvbnN0IHsgbmV4dENvbXBvbmVudHMgfSA9IHNlZ21lbnQ7XG4gICAgY29uc3QgbmV4dFNlZ21lbnRzID0gW107XG4gICAgZm9yIChjb25zdCBuZXh0Q29tcG9uZW50SW5kZXhlcyBvZiBuZXh0Q29tcG9uZW50cykge1xuICAgICAgICBmb3IgKGNvbnN0IG5leHRDb21wb25lbnRJbmRleCBvZiBuZXh0Q29tcG9uZW50SW5kZXhlcykge1xuICAgICAgICAgICAgY29uc3QgbmV4dFNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleChzZWdtZW50cywgbmV4dENvbXBvbmVudEluZGV4KTtcbiAgICAgICAgICAgIGlmIChuZXh0U2VnbWVudCkge1xuICAgICAgICAgICAgICAgIG5leHRTZWdtZW50cy5wdXNoKG5leHRTZWdtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV4dFNlZ21lbnRzO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5nZVN0YWlyVXB3YXJkKHN0YXJ0U2VnbWVudCwgc2VnbWVudHMsIHVwd2FyZCwgYnVsa0NoYW5nZSwgb25seVN0YXJ0ID0gZmFsc2UpIHtcbiAgICBpZiAoc2VnbWVudHMubGVuZ3RoKSB7XG4gICAgICAgIGxldCBjdXJyZW50ID0gW3sgc2VnbWVudDogc3RhcnRTZWdtZW50LCB2ZXJ0aWNhbERlbHRhOiBzdGFydFNlZ21lbnQuc3RhcnRIZWlnaHQgfV07XG4gICAgICAgIGNvbnN0IHVuVmlzaXRlZCA9IG5ldyBTZXQoc2VnbWVudHMpO1xuICAgICAgICBjb25zdCBjaGFuZ2VkU2VnbWVudHMgPSBuZXcgU2V0KCk7XG4gICAgICAgIHdoaWxlIChjdXJyZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IG5leHQgPSBbXTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgeyBzZWdtZW50LCB2ZXJ0aWNhbERlbHRhIH0gb2YgY3VycmVudCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgc3RhcnRIZWlnaHQsIGVuZEhlaWdodCB9ID0gc2VnbWVudDtcbiAgICAgICAgICAgICAgICBjb25zdCB1cHdhcmRGbGFnID0gKG9ubHlTdGFydCAmJiBzZWdtZW50ICE9PSBzdGFydFNlZ21lbnQpID8gc2VnbWVudC5wYXJhbS51cHdhcmQgOiB1cHdhcmQ7XG4gICAgICAgICAgICAgICAgY29uc3QgZW5kRGVsdGEgPSBzZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gPyAwIDogTWF0aC5hYnMoZW5kSGVpZ2h0IC0gc3RhcnRIZWlnaHQpICogKHVwd2FyZEZsYWcgPyAxIDogLTEpO1xuICAgICAgICAgICAgICAgIHNlZ21lbnQuc3RhcnRIZWlnaHQgPSB2ZXJ0aWNhbERlbHRhO1xuICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kSGVpZ2h0ID0gc2VnbWVudC5zdGFydEhlaWdodCArIGVuZERlbHRhO1xuICAgICAgICAgICAgICAgIGlmICghb25seVN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnQucGFyYW0udXB3YXJkID0gdXB3YXJkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB1blZpc2l0ZWQuZGVsZXRlKHNlZ21lbnQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5leHRTZWdtZW50cyA9IGdldE5leHRDb21wb25lbnRzKHNlZ21lbnQsIHNlZ21lbnRzKTtcbiAgICAgICAgICAgICAgICBpZiAobmV4dFNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0LnB1c2goLi4ubmV4dFNlZ21lbnRzLm1hcChzZWcgPT4gKHsgc2VnbWVudDogc2VnLCB2ZXJ0aWNhbERlbHRhOiBzZWdtZW50LmVuZEhlaWdodCB9KSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjaGFuZ2VkU2VnbWVudHMuYWRkKHNlZ21lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3VycmVudCA9IG5leHQ7XG4gICAgICAgICAgICBpZiAoIWN1cnJlbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGJ1bGtDaGFuZ2UgJiYgdW5WaXNpdGVkLnNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlU2VnbWVudCA9IFsuLi51blZpc2l0ZWQudmFsdWVzKCldWzBdO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gW3sgc2VnbWVudDogdGhlU2VnbWVudCwgdmVydGljYWxEZWx0YTogdGhlU2VnbWVudC5zdGFydEhlaWdodCB9XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFsuLi5jaGFuZ2VkU2VnbWVudHNdO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBjaGFuZ2VTdGFpclN0ZXAoc3RhcnRTZWdtZW50LCBzZWdtZW50cywgbmV3SG9yaXpvbnRhbFN0ZXAsIG5ld1ZlcnRpY2FsU3RlcCwgYnVsa0NoYW5nZSwgb25seVN0YXJ0ID0gZmFsc2UpIHtcbiAgICBpZiAoc2VnbWVudHMubGVuZ3RoKSB7XG4gICAgICAgIGxldCBjdXJyZW50ID0gW3sgc2VnbWVudDogc3RhcnRTZWdtZW50LCB2ZXJ0aWNhbERlbHRhOiBzdGFydFNlZ21lbnQuc3RhcnRIZWlnaHQgfV07XG4gICAgICAgIGNvbnN0IHVuVmlzaXRlZCA9IG5ldyBTZXQoc2VnbWVudHMpO1xuICAgICAgICBjb25zdCBjaGFuZ2VkU2VnbWVudHMgPSBuZXcgU2V0KCk7XG4gICAgICAgIHdoaWxlIChjdXJyZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IG5leHQgPSBbXTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgeyBzZWdtZW50LCB2ZXJ0aWNhbERlbHRhIH0gb2YgY3VycmVudCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgc3RhcnQsIGVuZCwgY2lyY2xlVGFuZ2VudCwgcGFyYW06IHsgdHlwZSwgaG9yaXpvbnRhbFN0ZXAsIHVwd2FyZCB9IH0gPSBzZWdtZW50O1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0RW5kRGlzdGFuY2UgPSBzdGFydC5kaXN0YW5jZVRvKGVuZCk7XG4gICAgICAgICAgICAgICAgbGV0IG5ld1N0ZXBDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpcikge1xuICAgICAgICAgICAgICAgICAgICBuZXdTdGVwQ291bnQgPSBNYXRoLmNlaWwoc3RhcnRFbmREaXN0YW5jZSAvIGhvcml6b250YWxTdGVwKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdFN0ZXBMZW5ndGggPSBzdGFydEVuZERpc3RhbmNlIC0gKG5ld1N0ZXBDb3VudCAtIDEpICogaG9yaXpvbnRhbFN0ZXA7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkU3RlcENvdW50ID0gKGxhc3RTdGVwTGVuZ3RoID09PSAwIHx8IGxhc3RTdGVwTGVuZ3RoID4gTGVuZ3RoVG9sZXJhbmNlKSA/IG5ld1N0ZXBDb3VudCA6IG5ld1N0ZXBDb3VudCAtIDE7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWxpZFN0ZXBDb3VudCA8IDEgfHwgdmFsaWRTdGVwQ291bnQgPj0gU3RlcENvdW50TGltaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlID09PSBDb21wb25lbnRUeXBlLkNpcmN1bGFyU3RhaXIgJiYgY2lyY2xlVGFuZ2VudCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGhvcml6b250YWxTdGVwQW5nbGUsIGFyY0FuZ2xlIH0gPSBjYWxjdWxhdGVDaXJjdWxhclN0YWlyKHNlZ21lbnQsIGNpcmNsZVRhbmdlbnQpO1xuICAgICAgICAgICAgICAgICAgICBuZXdTdGVwQ291bnQgPSBNYXRoLmNlaWwoYXJjQW5nbGUgLyBob3Jpem9udGFsU3RlcEFuZ2xlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3RGVsdGFIZWlnaHQgPSBuZXdTdGVwQ291bnQgKiBuZXdWZXJ0aWNhbFN0ZXAgKiAodXB3YXJkID8gMSA6IC0xKTtcbiAgICAgICAgICAgICAgICBzZWdtZW50LnN0YXJ0SGVpZ2h0ID0gdmVydGljYWxEZWx0YTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LmVuZEhlaWdodCA9IHZlcnRpY2FsRGVsdGE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LmVuZEhlaWdodCA9IHNlZ21lbnQuc3RhcnRIZWlnaHQgKyBuZXdEZWx0YUhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvbmx5U3RhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQucGFyYW0uaG9yaXpvbnRhbFN0ZXAgPSBuZXdIb3Jpem9udGFsU3RlcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQucGFyYW0udmVydGljYWxTdGVwID0gbmV3VmVydGljYWxTdGVwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHVuVmlzaXRlZC5kZWxldGUoc2VnbWVudCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV4dFNlZ21lbnRzID0gZ2V0TmV4dENvbXBvbmVudHMoc2VnbWVudCwgc2VnbWVudHMpO1xuICAgICAgICAgICAgICAgIGlmIChuZXh0U2VnbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQucHVzaCguLi5uZXh0U2VnbWVudHMubWFwKHNlZyA9PiAoeyBzZWdtZW50OiBzZWcsIHZlcnRpY2FsRGVsdGE6IHNlZ21lbnQuZW5kSGVpZ2h0IH0pKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNoYW5nZWRTZWdtZW50cy5hZGQoc2VnbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50ID0gbmV4dDtcbiAgICAgICAgICAgIGlmICghY3VycmVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAoYnVsa0NoYW5nZSAmJiB1blZpc2l0ZWQuc2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGVTZWdtZW50ID0gWy4uLnVuVmlzaXRlZC52YWx1ZXMoKV1bMF07XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBbeyBzZWdtZW50OiB0aGVTZWdtZW50LCB2ZXJ0aWNhbERlbHRhOiB0aGVTZWdtZW50LnN0YXJ0SGVpZ2h0IH1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gWy4uLmNoYW5nZWRTZWdtZW50c107XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5nZVBsYXRmb3JtTGVuZ3RoKHN0YXJ0U2VnbWVudCwgc2VnbWVudHMsIG5ld1BsYXRmb3JtTGVuZ3RoLCBidWxrQ2hhbmdlLCBvbmx5U3RhcnQgPSBmYWxzZSkge1xuICAgIGlmIChzZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgLy8gY29uc3QgcGxhdGZvcm1TZWdtZW50cyA9IHNlZ21lbnRzLmZpbHRlcihzZWcgPT4gc2VnLnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0pO1xuICAgICAgICBsZXQgY3VycmVudCA9IFt7IHNlZ21lbnQ6IHN0YXJ0U2VnbWVudCwgZGVsdGFWZWM6IGR1bW15VmVjdG9yM2QgfV07XG4gICAgICAgIGNvbnN0IHVuVmlzaXRlZCA9IG5ldyBTZXQoc2VnbWVudHMpO1xuICAgICAgICBjb25zdCBjaGFuZ2VkU2VnbWVudHMgPSBuZXcgU2V0KCk7XG4gICAgICAgIHdoaWxlIChjdXJyZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IG5leHQgPSBbXTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgeyBzZWdtZW50LCBkZWx0YVZlYyB9IG9mIGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IHN0YXJ0LCBlbmQsIHBhcmFtOiB7IHR5cGUsIHN0YXJ0V2lkdGgsIHBsYXRmb3JtTGVuZ3RoIH0sIGJhc2VDb21wb25lbnQsIG5leHRDb21wb25lbnRzLCBtb2xkU2hhcGU6IHsgdGVtcExpbmVzIH0gfSA9IHNlZ21lbnQ7XG4gICAgICAgICAgICAgICAgbGV0IG5leHREZWx0YVZlYyA9IGRlbHRhVmVjO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZyb250RGlyID0gZW5kLnN1YnRyYWN0ZWQoc3RhcnQpLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVsdGFQbGF0Zm9ybUxlbmd0aCA9IG5ld1BsYXRmb3JtTGVuZ3RoIC0gcGxhdGZvcm1MZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIG5leHREZWx0YVZlYyA9IGRlbHRhVmVjLmFkZGVkKGZyb250RGlyLm11bHRpcGxpZWQoZGVsdGFQbGF0Zm9ybUxlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LnBhcmFtLnBsYXRmb3JtTGVuZ3RoID0gbmV3UGxhdGZvcm1MZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGlmIChiYXNlQ29tcG9uZW50ICYmIGRlbHRhUGxhdGZvcm1MZW5ndGggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGFuZ2xlLCBjb3JuZXJEaXJlY3Rpb25BbmdsZSB9ID0gY2FsY3VsYXRlUGxhdGZvcm0oc2VnbWVudCwgYmFzZUNvbXBvbmVudC5saW5lM2QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKERpcmVjdGlvbkFuZ2xlVG9sZXJhbmNlIDwgYW5nbGUgJiYgYW5nbGUgPCAoTWF0aC5QSSAvIDIgLSBjb3JuZXJEaXJlY3Rpb25BbmdsZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC50YW4oTWF0aC5QSSAvIDIgLSBhbmdsZSkgPD0gc3RhcnRXaWR0aCAvIDIgLyBuZXdQbGF0Zm9ybUxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0RGVsdGFWZWMgPSBkZWx0YVZlYztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5wYXJhbS5wbGF0Zm9ybUxlbmd0aCA9IHBsYXRmb3JtTGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGFuZ2xlID4gKE1hdGguUEkgKiAzIC8gMiArIGNvcm5lckRpcmVjdGlvbkFuZ2xlKSAmJiBhbmdsZSA8IChNYXRoLlBJICogMiAtIERpcmVjdGlvbkFuZ2xlVG9sZXJhbmNlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLnRhbihhbmdsZSAtIE1hdGguUEkgKiAzIC8gMikgPD0gc3RhcnRXaWR0aCAvIDIgLyBuZXdQbGF0Zm9ybUxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0RGVsdGFWZWMgPSBkZWx0YVZlYztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5wYXJhbS5wbGF0Zm9ybUxlbmd0aCA9IHBsYXRmb3JtTGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlZGdlTmV4dENvbXBvbmVudHMgPSBuZXh0Q29tcG9uZW50c1t0ZW1wTGluZXMubGVuZ3RoIC0gMl07XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZWRnZU5leHRDb21wb25lbnQgb2YgZWRnZU5leHRDb21wb25lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlZGdlTmV4dFNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleChzZWdtZW50cywgZWRnZU5leHRDb21wb25lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVkZ2VOZXh0U2VnbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQucHVzaCh7IHNlZ21lbnQ6IGVkZ2VOZXh0U2VnbWVudCwgZGVsdGFWZWM6IG5leHREZWx0YVZlYyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dFNlZ21lbnRzID0gZ2V0TmV4dENvbXBvbmVudHMoc2VnbWVudCwgc2VnbWVudHMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dC5wdXNoKC4uLm5leHRTZWdtZW50cy5tYXAoc2VnID0+ICh7IHNlZ21lbnQ6IHNlZywgZGVsdGFWZWM6IG5leHREZWx0YVZlYyB9KSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlZ21lbnQuc3RhcnQgPSBzdGFydC5hZGRlZChkZWx0YVZlYyk7XG4gICAgICAgICAgICAgICAgc2VnbWVudC5lbmQgPSBlbmQuYWRkZWQobmV4dERlbHRhVmVjKTtcbiAgICAgICAgICAgICAgICBpZiAoYmFzZUNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgICAgICBiYXNlQ29tcG9uZW50LmxpbmUzZC5zdGFydCA9IGJhc2VDb21wb25lbnQubGluZTNkLnN0YXJ0LmFkZGVkKGRlbHRhVmVjKTtcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNvbXBvbmVudC5saW5lM2QuZW5kID0gYmFzZUNvbXBvbmVudC5saW5lM2QuZW5kLmFkZGVkKGRlbHRhVmVjKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdW5WaXNpdGVkLmRlbGV0ZShzZWdtZW50KTtcbiAgICAgICAgICAgICAgICBjaGFuZ2VkU2VnbWVudHMuYWRkKHNlZ21lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3VycmVudCA9IG5leHQ7XG4gICAgICAgICAgICBpZiAoIWN1cnJlbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGJ1bGtDaGFuZ2UgJiYgdW5WaXNpdGVkLnNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhlU2VnbWVudCA9IFsuLi51blZpc2l0ZWQudmFsdWVzKCldWzBdO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gW3sgc2VnbWVudDogdGhlU2VnbWVudCwgZGVsdGFWZWM6IGR1bW15VmVjdG9yM2QgfV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbLi4uY2hhbmdlZFNlZ21lbnRzXTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gY2hhbmdlUGxhdGZvcm1XaWR0aChzdGFydFNlZ21lbnQsIHNlZ21lbnRzLCBuZXdXaWR0aCwgYnVsa0NoYW5nZSwgb25seVN0YXJ0ID0gZmFsc2UpIHtcbiAgICBpZiAoc2VnbWVudHMubGVuZ3RoKSB7XG4gICAgICAgIC8vIGNvbnN0IHBsYXRmb3JtU2VnbWVudHMgPSBzZWdtZW50cy5maWx0ZXIoc2VnID0+IHNlZy5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKTtcbiAgICAgICAgbGV0IGN1cnJlbnQgPSBbeyBzZWdtZW50OiBzdGFydFNlZ21lbnQsIGRlbHRhVmVjOiBkdW1teVZlY3RvcjNkIH1dO1xuICAgICAgICBjb25zdCB1blZpc2l0ZWQgPSBuZXcgU2V0KHNlZ21lbnRzKTtcbiAgICAgICAgY29uc3QgY2hhbmdlZFNlZ21lbnRzID0gbmV3IFNldCgpO1xuICAgICAgICB3aGlsZSAoY3VycmVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBuZXh0ID0gW107XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHsgc2VnbWVudCwgZGVsdGFWZWMgfSBvZiBjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBzdGFydCwgZW5kLCBwYXJhbTogeyB0eXBlLCBzdGFydFdpZHRoLCBwbGF0Zm9ybUxlbmd0aCB9LCBiYXNlQ29tcG9uZW50LCBuZXh0Q29tcG9uZW50cywgbW9sZFNoYXBlOiB7IHZlcnRpY2VzLCB0ZW1wTGluZXMgfSB9ID0gc2VnbWVudDtcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSAmJiAob25seVN0YXJ0ID8gc2VnbWVudCA9PT0gc3RhcnRTZWdtZW50IDogdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVsdGFXaWR0aCA9IG5ld1dpZHRoIC0gc3RhcnRXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNob3VsZENoYW5nZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVkZ2VDb3VudCA9IHRlbXBMaW5lcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGlmIChiYXNlQ29tcG9uZW50ICYmIGRlbHRhV2lkdGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGFuZ2xlLCBjb3JuZXJEaXJlY3Rpb25BbmdsZSwgbGVmdENvbm5lY3RQb2ludHMsIHJpZ2h0Q29ubmVjdFBvaW50cyB9ID0gY2FsY3VsYXRlUGxhdGZvcm0oc2VnbWVudCwgYmFzZUNvbXBvbmVudC5saW5lM2QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKERpcmVjdGlvbkFuZ2xlVG9sZXJhbmNlIDwgYW5nbGUgJiYgYW5nbGUgPCAoTWF0aC5QSSAvIDIgLSBjb3JuZXJEaXJlY3Rpb25BbmdsZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC50YW4oTWF0aC5QSSAvIDIgLSBhbmdsZSkgPD0gbmV3V2lkdGggLyAyIC8gcGxhdGZvcm1MZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvdWxkQ2hhbmdlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGVkZ2VDb3VudCAhPT0gKGxlZnRDb25uZWN0UG9pbnRzLmxlbmd0aCArIDMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3VsZENoYW5nZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGFuZ2xlID4gKE1hdGguUEkgKiAzIC8gMiArIGNvcm5lckRpcmVjdGlvbkFuZ2xlKSAmJiBhbmdsZSA8IChNYXRoLlBJICogMiAtIERpcmVjdGlvbkFuZ2xlVG9sZXJhbmNlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLnRhbihhbmdsZSAtIE1hdGguUEkgKiAzIC8gMikgPD0gbmV3V2lkdGggLyAyIC8gcGxhdGZvcm1MZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvdWxkQ2hhbmdlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGVkZ2VDb3VudCAhPT0gKHJpZ2h0Q29ubmVjdFBvaW50cy5sZW5ndGggKyAzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG91bGRDaGFuZ2UgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNob3VsZENoYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2xkVmVydGljZXMgPSBbLi4udmVydGljZXNdO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5wYXJhbS5zdGFydFdpZHRoID0gbmV3V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50LnBhcmFtLmVuZFdpZHRoID0gbmV3V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZVNoYXBlKHNlZ21lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3VmVydGljZXMgPSBzZWdtZW50Lm1vbGRTaGFwZS52ZXJ0aWNlcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWRnZUNvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlZGdlTmV4dENvbXBvbmVudHMgPSBuZXh0Q29tcG9uZW50c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvbGRFZGdlU3RhcnQgPSBvbGRWZXJ0aWNlc1t0ZW1wTGluZXNbaV1bMF1dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9sZEVkZ2VFbmQgPSBvbGRWZXJ0aWNlc1t0ZW1wTGluZXNbaV1bMV1dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9sZEVkZ2VMZW5ndGggPSBvbGRFZGdlU3RhcnQuZGlzdGFuY2VUbyhvbGRFZGdlRW5kKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvbGRFZGdlRGlyID0gb2xkRWRnZUVuZC5zdWJ0cmFjdGVkKG9sZEVkZ2VTdGFydCkubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9sZEVkZ2VDZW50ZXIgPSBnZXRNaWRQb2ludChvbGRFZGdlU3RhcnQsIG9sZEVkZ2VFbmQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0VkZ2VTdGFydCA9IG5ld1ZlcnRpY2VzW3RlbXBMaW5lc1tpXVswXV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3RWRnZUVuZCA9IG5ld1ZlcnRpY2VzW3RlbXBMaW5lc1tpXVsxXV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3RWRnZURpciA9IG5ld0VkZ2VFbmQuc3VidHJhY3RlZChuZXdFZGdlU3RhcnQpLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdFZGdlQ2VudGVyID0gZ2V0TWlkUG9pbnQobmV3RWRnZVN0YXJ0LCBuZXdFZGdlRW5kKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjZW50ZXJEZWx0YURpciA9IG5ld0VkZ2VDZW50ZXIuc3VidHJhY3RlZChvbGRFZGdlQ2VudGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGVkZ2VOZXh0Q29tcG9uZW50IG9mIGVkZ2VOZXh0Q29tcG9uZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlZGdlTmV4dFNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleChzZWdtZW50cywgZWRnZU5leHRDb21wb25lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWRnZU5leHRTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0b0NlbnRlckRpciA9IG9sZEVkZ2VDZW50ZXIuc3VidHJhY3RlZChlZGdlTmV4dFNlZ21lbnQuc3RhcnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRXF1YWwodG9DZW50ZXJEaXIubGVuZ3RoLCAwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQucHVzaCh7IHNlZ21lbnQ6IGVkZ2VOZXh0U2VnbWVudCwgZGVsdGFWZWM6IGRlbHRhVmVjLmFkZGVkKGNlbnRlckRlbHRhRGlyKSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRvQ2VudGVyRGlyLmlzU2FtZURpcmVjdGlvbihvbGRFZGdlRGlyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQucHVzaCh7IHNlZ21lbnQ6IGVkZ2VOZXh0U2VnbWVudCwgZGVsdGFWZWM6IGRlbHRhVmVjLmFkZGVkKGNlbnRlckRlbHRhRGlyKS5hZGRlZChuZXdFZGdlRGlyLm11bHRpcGxpZWQoLXRvQ2VudGVyRGlyLmxlbmd0aCAvIG9sZEVkZ2VMZW5ndGggKiAyKSkgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0LnB1c2goeyBzZWdtZW50OiBlZGdlTmV4dFNlZ21lbnQsIGRlbHRhVmVjOiBkZWx0YVZlYy5hZGRlZChjZW50ZXJEZWx0YURpcikuYWRkZWQobmV3RWRnZURpci5tdWx0aXBsaWVkKHRvQ2VudGVyRGlyLmxlbmd0aCAvIG9sZEVkZ2VMZW5ndGggKiAyKSkgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRTZWdtZW50cyA9IGdldE5leHRDb21wb25lbnRzKHNlZ21lbnQsIHNlZ21lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRTZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQucHVzaCguLi5uZXh0U2VnbWVudHMubWFwKHNlZyA9PiAoeyBzZWdtZW50OiBzZWcsIGRlbHRhVmVjIH0pKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VnbWVudC5zdGFydCA9IHN0YXJ0LmFkZGVkKGRlbHRhVmVjKTtcbiAgICAgICAgICAgICAgICBzZWdtZW50LmVuZCA9IGVuZC5hZGRlZChkZWx0YVZlYyk7XG4gICAgICAgICAgICAgICAgaWYgKGJhc2VDb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNvbXBvbmVudC5saW5lM2Quc3RhcnQgPSBiYXNlQ29tcG9uZW50LmxpbmUzZC5zdGFydC5hZGRlZChkZWx0YVZlYyk7XG4gICAgICAgICAgICAgICAgICAgIGJhc2VDb21wb25lbnQubGluZTNkLmVuZCA9IGJhc2VDb21wb25lbnQubGluZTNkLmVuZC5hZGRlZChkZWx0YVZlYyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHVuVmlzaXRlZC5kZWxldGUoc2VnbWVudCk7XG4gICAgICAgICAgICAgICAgY2hhbmdlZFNlZ21lbnRzLmFkZChzZWdtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJlbnQgPSBuZXh0O1xuICAgICAgICAgICAgaWYgKCFjdXJyZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGlmIChidWxrQ2hhbmdlICYmIHVuVmlzaXRlZC5zaXplKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoZVNlZ21lbnQgPSBbLi4udW5WaXNpdGVkLnZhbHVlcygpXVswXTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IFt7IHNlZ21lbnQ6IHRoZVNlZ21lbnQsIGRlbHRhVmVjOiBkdW1teVZlY3RvcjNkIH1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gWy4uLmNoYW5nZWRTZWdtZW50c107XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZUNpcmN1bGFyU3RhaXIoc2VnbWVudCwgY2lyY2xlVGFuZ2VudCkge1xuICAgIGNvbnN0IHsgc3RhcnQsIGVuZCwgcGFyYW0gfSA9IHNlZ21lbnQ7XG4gICAgY29uc3QgeyBzdGFydFdpZHRoLCBlbmRXaWR0aCwgaG9yaXpvbnRhbFN0ZXAsIH0gPSBwYXJhbTtcbiAgICBsZXQgdmFsaWQgPSB0cnVlO1xuICAgIGNvbnN0IHRhbmdlbnRMZWZ0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhjaXJjbGVUYW5nZW50KS5ub3JtYWxpemVkKCk7XG4gICAgY29uc3Qgc3RhcnRFbmREaXIgPSBlbmQuc3VidHJhY3RlZChzdGFydCkubm9ybWFsaXplZCgpO1xuICAgIGNvbnN0IHN0YXJ0RW5kRGlzdGFuY2UgPSBzdGFydC5kaXN0YW5jZVRvKGVuZCk7XG4gICAgY29uc3QgbWF4V2lkdGggPSBNYXRoLm1heChzdGFydFdpZHRoLCBlbmRXaWR0aCk7XG4gICAgY29uc3QgZW5kQW5nbGUgPSBzdGFydEVuZERpci5hbmdsZVRvKGNpcmNsZVRhbmdlbnQsIERpcmVjdGlvblopO1xuICAgIGNvbnN0IGlzTGVmdEFyYyA9IGVuZEFuZ2xlID4gTWF0aC5QSTtcbiAgICBpZiAoaXNMZWZ0QXJjKSB7XG4gICAgICAgIHNlZ21lbnQuY2lyY3VsYXJTaWRlID0gQ2lyY3VsYXJTaWRlLkxlZnQ7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBzZWdtZW50LmNpcmN1bGFyU2lkZSA9IENpcmN1bGFyU2lkZS5SaWdodDtcbiAgICB9XG4gICAgY29uc3QgZW5kQ29tcGxlbWVudGFyeUFuZ2xlID0gaXNMZWZ0QXJjID8gTWF0aC5hYnMoZW5kQW5nbGUgLSBNYXRoLlBJIC8gMiAtIE1hdGguUEkpIDogTWF0aC5hYnMoZW5kQW5nbGUgLSBNYXRoLlBJIC8gMik7XG4gICAgY29uc3QgaGFsZkNob3JkID0gc3RhcnRFbmREaXN0YW5jZSAvIDI7XG4gICAgY29uc3QgcmFkaXVzID0gaGFsZkNob3JkIC8gTWF0aC5jb3MoZW5kQ29tcGxlbWVudGFyeUFuZ2xlKTtcbiAgICBjb25zdCBpbm5lclJhZGl1cyA9IHJhZGl1cyAtIG1heFdpZHRoIC8gMjtcbiAgICBpZiAocmFkaXVzIDwgbWF4V2lkdGggLyAyICogMS4yIHx8IGlubmVyUmFkaXVzIDwgaG9yaXpvbnRhbFN0ZXAgLyAyIC8gMC44KSB7XG4gICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGhvcml6b250YWxTdGVwQW5nbGUgPSBNYXRoLmFzaW4oaG9yaXpvbnRhbFN0ZXAgLyAyIC8gcmFkaXVzKSAqIDI7XG4gICAgY29uc3QgY2lyY2xlTm9ybWFsID0gaXNMZWZ0QXJjID8gRGlyZWN0aW9uWiA6IERpcmVjdGlvbloucmV2ZXJzZWQoKTtcbiAgICBjb25zdCBjaXJjbGVDZW50ZXIgPSBzdGFydC5hZGRlZCh0YW5nZW50TGVmdERpci5tdWx0aXBsaWVkKGlzTGVmdEFyYyA/IHJhZGl1cyA6IC1yYWRpdXMpKTtcbiAgICBjb25zdCBhcmMgPSBHZW9tTGliLmNyZWF0ZUFyYzNkQnlDZW50ZXJOb3JtYWxSYWRpdXMoY2lyY2xlQ2VudGVyLCBjaXJjbGVOb3JtYWwsIHJhZGl1cywgc3RhcnQsIGVuZCk7XG4gICAgY29uc3QgYXJjQW5nbGUgPSBhcmMuYXJjQW5nbGU7XG4gICAgY29uc3Qgc3RlcENvdW50ID0gTWF0aC5jZWlsKGFyY0FuZ2xlIC8gaG9yaXpvbnRhbFN0ZXBBbmdsZSk7XG4gICAgY29uc3QgbGFzdEhvcml6b250YWxBbmdsZSA9IGFyY0FuZ2xlIC0gaG9yaXpvbnRhbFN0ZXBBbmdsZSAqIChzdGVwQ291bnQgLSAxKTtcbiAgICBjb25zdCB2YWxpZFN0ZXBDb3VudCA9IChsYXN0SG9yaXpvbnRhbEFuZ2xlID09PSAwIHx8IGxhc3RIb3Jpem9udGFsQW5nbGUgPiBBbmdsZVRvbGVyYW5jZSkgPyBzdGVwQ291bnQgOiBzdGVwQ291bnQgLSAxO1xuICAgIGlmIChob3Jpem9udGFsU3RlcEFuZ2xlID49IGFyY0FuZ2xlIHx8IGhvcml6b250YWxTdGVwQW5nbGUgPj0gTWF0aC5QSSAvIDIgfHwgdmFsaWRTdGVwQ291bnQgPj0gU3RlcENvdW50TGltaXQgfHwgdmFsaWRTdGVwQ291bnQgPCAxKSB7XG4gICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHRhbmdlbnRMZWZ0RGlyLCB2YWxpZFN0ZXBDb3VudCwgaXNMZWZ0QXJjLCBzdGVwQ291bnQsIGNpcmNsZUNlbnRlciwgcmFkaXVzLCBob3Jpem9udGFsU3RlcEFuZ2xlLCBjaXJjbGVOb3JtYWwsIGFyY0FuZ2xlLCBsYXN0SG9yaXpvbnRhbEFuZ2xlLFxuICAgICAgICBpbm5lclJhZGl1cywgZW5kQW5nbGUsIHZhbGlkLFxuICAgIH07XG59XG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlUGxhdGZvcm0oc2VnbWVudCwgYmFzZUxpbmVTZWczZCkge1xuICAgIGNvbnN0IHsgc3RhcnQsIHBhcmFtIH0gPSBzZWdtZW50O1xuICAgIGNvbnN0IHsgc3RhcnRXaWR0aCwgcGxhdGZvcm1MZW5ndGgsIHBsYXRmb3JtTGVuZ3RoTG9ja2VkIH0gPSBwYXJhbTtcbiAgICBjb25zdCBjdXJEaXIgPSBzZWdtZW50LmVuZC5zdWJ0cmFjdGVkKHN0YXJ0KTtcbiAgICBjb25zdCBjdXJMZWZ0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhjdXJEaXIpLm5vcm1hbGl6ZWQoKTtcbiAgICBjb25zdCB7IHN0YXJ0OiBiYXNlTGluZVN0YXJ0LCBlbmQ6IGJhc2VMaW5lRW5kIH0gPSBiYXNlTGluZVNlZzNkO1xuICAgIGNvbnN0IGJhc2VMaW5lRGlyID0gYmFzZUxpbmVFbmQuc3VidHJhY3RlZChiYXNlTGluZVN0YXJ0KS5ub3JtYWxpemVkKCk7XG4gICAgY29uc3QgcHJldkRpck5vcm1hbGl6ZWQgPSBiYXNlTGluZURpci5jcm9zcyhEaXJlY3Rpb25aKS5ub3JtYWxpemVkKCk7XG4gICAgY29uc3QgcHJldkxlZnREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKHByZXZEaXJOb3JtYWxpemVkKS5ub3JtYWxpemVkKCk7XG4gICAgY29uc3QgYW5nbGUgPSBjdXJEaXIuYW5nbGVUbyhwcmV2RGlyTm9ybWFsaXplZCwgRGlyZWN0aW9uWik7XG4gICAgY29uc3QgZnJvbnRMZW5ndGggPSBwbGF0Zm9ybUxlbmd0aExvY2tlZCA/IHBsYXRmb3JtTGVuZ3RoIDogTWF0aC5hYnMoY3VyRGlyLmRvdChwcmV2RGlyTm9ybWFsaXplZCkpO1xuICAgIGNvbnN0IGN1ckVuZExlZnRDb3JuZXIgPSBzZWdtZW50LmVuZC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKTtcbiAgICBjb25zdCBjb3JuZXJEaXJlY3Rpb24gPSBjdXJFbmRMZWZ0Q29ybmVyLnN1YnRyYWN0ZWQoc2VnbWVudC5zdGFydCk7XG4gICAgY29uc3QgY29ybmVyRGlyZWN0aW9uQW5nbGUgPSBjb3JuZXJEaXJlY3Rpb24uYW5nbGUoY3VyRGlyKTtcbiAgICBsZXQgbGVmdENvbm5lY3RQb2ludHMgPSBbc3RhcnQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSksIGJhc2VMaW5lRW5kXTtcbiAgICBsZXQgcmlnaHRDb25uZWN0UG9pbnRzID0gW2Jhc2VMaW5lU3RhcnQsIHN0YXJ0LmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKV07XG4gICAgaWYgKERpcmVjdGlvbkFuZ2xlVG9sZXJhbmNlIDwgYW5nbGUgJiYgYW5nbGUgPCAoTWF0aC5QSSAvIDIgLSBjb3JuZXJEaXJlY3Rpb25BbmdsZSkpIHtcbiAgICAgICAgLy8gc2VnbWVudC5jb21wb25lbnREaXJlY3Rpb25UeXBlID0gQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5SaWdodEZyb250O1xuICAgICAgICAvLyBwYXJhbS5wbGF0Zm9ybUxlbmd0aCA9IHNlZ21lbnQuZW5kLmRpc3RhbmNlVG8oc2VnbWVudC5zdGFydCk7XG4gICAgICAgIGNvbnN0IGJhc2VMaW5lRW5kRGlzdGFuY2UgPSBzdGFydC5kaXN0YW5jZVRvKGJhc2VMaW5lRW5kKTtcbiAgICAgICAgY29uc3QgbGVmdFByb2plY3REaXN0YW5jZSA9IHN0YXJ0V2lkdGggLyAyICogTWF0aC5jb3MoYW5nbGUpO1xuICAgICAgICBpZiAobGVmdFByb2plY3REaXN0YW5jZSA8IGJhc2VMaW5lRW5kRGlzdGFuY2UpIHtcbiAgICAgICAgICAgIGNvbnN0IGwxID0gc3RhcnRXaWR0aCAvIDIgLyBNYXRoLmNvcyhhbmdsZSk7XG4gICAgICAgICAgICBpZiAobDEgPiBiYXNlTGluZUVuZERpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYTEgPSBsMSAtIGJhc2VMaW5lRW5kRGlzdGFuY2U7XG4gICAgICAgICAgICAgICAgY29uc3QgYzEgPSBhMSAvIE1hdGgudGFuKGFuZ2xlKTtcbiAgICAgICAgICAgICAgICBsZWZ0Q29ubmVjdFBvaW50cyA9IFtzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKGJhc2VMaW5lRW5kRGlzdGFuY2UpKS5hZGRlZChwcmV2RGlyTm9ybWFsaXplZC5tdWx0aXBsaWVkKGMxKSksIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoYmFzZUxpbmVFbmREaXN0YW5jZSkpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxlZnRDb25uZWN0UG9pbnRzID0gW3N0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQobDEpKV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoYW5nbGUgPiAoTWF0aC5QSSAqIDMgLyAyICsgY29ybmVyRGlyZWN0aW9uQW5nbGUpICYmIGFuZ2xlIDwgKE1hdGguUEkgKiAyIC0gRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UpKSB7XG4gICAgICAgIC8vIHNlZ21lbnQuY29tcG9uZW50RGlyZWN0aW9uVHlwZSA9IENvbXBvbmVudERpcmVjdGlvblR5cGUuTGVmdEZyb250O1xuICAgICAgICAvLyBwYXJhbS5wbGF0Zm9ybUxlbmd0aCA9IHNlZ21lbnQuZW5kLmRpc3RhbmNlVG8oc2VnbWVudC5zdGFydCk7XG4gICAgICAgIGNvbnN0IGJhc2VMaW5lU3RhcnREaXN0YW5jZSA9IHN0YXJ0LmRpc3RhbmNlVG8oYmFzZUxpbmVTdGFydCk7XG4gICAgICAgIGNvbnN0IHJpZ2h0UHJvamVjdERpc3RhbmNlID0gc3RhcnRXaWR0aCAvIDIgKiBNYXRoLmNvcyhhbmdsZSk7XG4gICAgICAgIGlmIChyaWdodFByb2plY3REaXN0YW5jZSA8IGJhc2VMaW5lU3RhcnREaXN0YW5jZSkge1xuICAgICAgICAgICAgY29uc3QgbDIgPSBzdGFydFdpZHRoIC8gMiAvIE1hdGguY29zKGFuZ2xlKTtcbiAgICAgICAgICAgIGlmIChsMiA+IGJhc2VMaW5lU3RhcnREaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGEyID0gbDIgLSBiYXNlTGluZVN0YXJ0RGlzdGFuY2U7XG4gICAgICAgICAgICAgICAgY29uc3QgYzIgPSBhMiAvIE1hdGgudGFuKE1hdGguUEkgKiAyIC0gYW5nbGUpO1xuICAgICAgICAgICAgICAgIHJpZ2h0Q29ubmVjdFBvaW50cyA9IFtzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC1iYXNlTGluZVN0YXJ0RGlzdGFuY2UpKSwgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtYmFzZUxpbmVTdGFydERpc3RhbmNlKSkuYWRkZWQocHJldkRpck5vcm1hbGl6ZWQubXVsdGlwbGllZChjMikpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJpZ2h0Q29ubmVjdFBvaW50cyA9IFtzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC1sMikpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyBhbmdsZSwgZnJvbnRMZW5ndGgsIGNvcm5lckRpcmVjdGlvbkFuZ2xlLCBwcmV2RGlyTm9ybWFsaXplZCwgcHJldkxlZnREaXIsIGxlZnRDb25uZWN0UG9pbnRzLCByaWdodENvbm5lY3RQb2ludHMgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRNaWRQb2ludChzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIEdlb21MaWIuY3JlYXRlUG9pbnQzZCgoc3RhcnQueCArIGVuZC54KSAvIDIsIChzdGFydC55ICsgZW5kLnkpIC8gMiwgKHN0YXJ0LnogKyBlbmQueikgLyAyKTtcbn1cbiIsImltcG9ydCB7IEFuZ2xlVG9sZXJhbmNlLCBEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSwgRGlyZWN0aW9uWiwgZHVtbXlQb2ludDNkLCBMZW5ndGhUb2xlcmFuY2UsIFN0ZXBDb3VudExpbWl0IH0gZnJvbSBcIi4vY29uc3RzXCI7XG5pbXBvcnQgeyBjYWxjdWxhdGVDaXJjdWxhclN0YWlyLCBjYWxjdWxhdGVQbGF0Zm9ybSwgZ2V0U2VnbWVudEJ5SW5kZXggfSBmcm9tIFwiLi9tZXNoVXRpbHNcIjtcbmltcG9ydCB7IENvbXBvbmVudFR5cGUsIENvbXBvbmVudERpcmVjdGlvblR5cGUsIEhhbmRyYWlsRGVmYXVsdE9mZnNldExlbmd0aCB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBpc0VxdWFsIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVNoYXBlKHNlZ21lbnQsIHRlbXAgPSB0cnVlKSB7XG4gICAgY29uc3QgeyBwYXJhbTogeyB0eXBlIH0sIGNpcmNsZVRhbmdlbnQgfSA9IHNlZ21lbnQ7XG4gICAgaWYgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpcikge1xuICAgICAgICBnZW5lcmF0ZVN0cmFpZ2h0U3RhaXJTaGFwZShzZWdtZW50LCB0ZW1wKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZSA9PT0gQ29tcG9uZW50VHlwZS5DaXJjdWxhclN0YWlyKSB7XG4gICAgICAgIGlmIChjaXJjbGVUYW5nZW50KSB7XG4gICAgICAgICAgICBnZW5lcmF0ZUNpcmN1bGFyU3RhaXJTaGFwZShzZWdtZW50LCB0ZW1wKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGdlbmVyYXRlU3RyYWlnaHRTdGFpclNoYXBlKHNlZ21lbnQsIHRlbXApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBnZW5lcmF0ZVBsYXRmb3JtU2hhcGUoc2VnbWVudCwgdGVtcCk7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2VuZXJhdGVDaXJjdWxhclN0YWlyU2hhcGUoc2VnbWVudCwgdGVtcCA9IHRydWUpIHtcbiAgICBjb25zdCB7IHN0YXJ0LCBzdGFpclNoYXBlLCBtb2xkU2hhcGUsIGNvcm5lclNoYXBlLCBjb3JuZXJNb2xkU2hhcGUsIHN0YXJ0SGVpZ2h0LCBiYXNlQ29tcG9uZW50LCBjaXJjbGVUYW5nZW50LCBwYXJhbSB9ID0gc2VnbWVudDtcbiAgICBjb25zdCB7IHN0YXJ0V2lkdGgsIGVuZFdpZHRoLCB2ZXJ0aWNhbFN0ZXAsIHVwd2FyZCwgcGxhdGZvcm1UaGlja25lc3MgfSA9IHBhcmFtO1xuICAgIGlmIChjaXJjbGVUYW5nZW50KSB7XG4gICAgICAgIGNvbnN0IHsgdGFuZ2VudExlZnREaXIsIHZhbGlkU3RlcENvdW50LCBpc0xlZnRBcmMsIHN0ZXBDb3VudCwgY2lyY2xlQ2VudGVyLCByYWRpdXMsIGhvcml6b250YWxTdGVwQW5nbGUsIGNpcmNsZU5vcm1hbCwgYXJjQW5nbGUsIGxhc3RIb3Jpem9udGFsQW5nbGUsIGVuZEFuZ2xlLCB2YWxpZCwgfSA9IGNhbGN1bGF0ZUNpcmN1bGFyU3RhaXIoc2VnbWVudCwgY2lyY2xlVGFuZ2VudCk7XG4gICAgICAgIGlmIChNYXRoLmFicyhlbmRBbmdsZSkgPD0gRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UpIHtcbiAgICAgICAgICAgIHNlZ21lbnQuY2lyY3VsYXJTaWRlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgcmV0dXJuIGdlbmVyYXRlU3RyYWlnaHRTdGFpclNoYXBlKHNlZ21lbnQsIHRlbXApO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdmFsaWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gW107XG4gICAgICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW107XG4gICAgICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtdO1xuICAgICAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW107XG4gICAgICAgIGNvcm5lclNoYXBlLnZlcnRpY2VzID0gW107XG4gICAgICAgIGNvcm5lclNoYXBlLnRlbXBMaW5lcyA9IFtdO1xuICAgICAgICBjb3JuZXJNb2xkU2hhcGUudmVydGljZXMgPSBbXTtcbiAgICAgICAgY29ybmVyTW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtdO1xuICAgICAgICBjb25zdCB7IHZlcnRpY2VzLCB0ZW1wTGluZXMgfSA9IHN0YWlyU2hhcGU7XG4gICAgICAgIGNvbnN0IHsgdmVydGljZXM6IG1vbGRWZXJ0aWNlcywgdGVtcExpbmVzOiBtb2xkVGVtcExpbmVzIH0gPSBtb2xkU2hhcGU7XG4gICAgICAgIGNvbnN0IHN0ZXBIZWlnaHQgPSB1cHdhcmQgPyB2ZXJ0aWNhbFN0ZXAgOiAtdmVydGljYWxTdGVwO1xuICAgICAgICBzZWdtZW50LmVuZEhlaWdodCA9IHNlZ21lbnQuc3RhcnRIZWlnaHQgKyB2YWxpZFN0ZXBDb3VudCAqIHN0ZXBIZWlnaHQ7XG4gICAgICAgIHN0YWlyU2hhcGUuc3RlcENvdW50ID0gdmFsaWRTdGVwQ291bnQ7XG4gICAgICAgIG1vbGRTaGFwZS5zdGVwQ291bnQgPSB2YWxpZFN0ZXBDb3VudDtcbiAgICAgICAgY29uc3QgbGVmdFB0ID0gc3RhcnQuYWRkZWQodGFuZ2VudExlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpO1xuICAgICAgICBjb25zdCByaWdodFB0ID0gc3RhcnQuYWRkZWQodGFuZ2VudExlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKTtcbiAgICAgICAgY29uc3Qgc3RhcnRSYWRpdXNEaXIgPSBpc0xlZnRBcmMgPyB0YW5nZW50TGVmdERpci5yZXZlcnNlZCgpIDogdGFuZ2VudExlZnREaXI7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RlcENvdW50IC0gMTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjdXJSb3RhdGVNYXRyaXggPSBHZW9tTGliLmNyZWF0ZVJvdGF0ZU1hdHJpeDQoaG9yaXpvbnRhbFN0ZXBBbmdsZSAqIGksIGNpcmNsZU5vcm1hbCwgZHVtbXlQb2ludDNkKTtcbiAgICAgICAgICAgIGNvbnN0IGN1clJhZGl1c0RpciA9IHN0YXJ0UmFkaXVzRGlyLmFwcGxpZWRNYXRyaXg0KGN1clJvdGF0ZU1hdHJpeCk7XG4gICAgICAgICAgICBjb25zdCBjdXJIYWxmV2lkdGggPSAoc3RhcnRXaWR0aCArIChlbmRXaWR0aCAtIHN0YXJ0V2lkdGgpICogKGkgKiBob3Jpem9udGFsU3RlcEFuZ2xlKSAvIGFyY0FuZ2xlKSAvIDIgKiAoaXNMZWZ0QXJjID8gLTEgOiAxKTtcbiAgICAgICAgICAgIGNvbnN0IGN1ckxlZnRNb2xkUHQgPSBjaXJjbGVDZW50ZXIuYWRkZWQoY3VyUmFkaXVzRGlyLm11bHRpcGxpZWQocmFkaXVzICsgY3VySGFsZldpZHRoKSk7XG4gICAgICAgICAgICBjb25zdCBjdXJSaWdodE1vbGRQdCA9IGNpcmNsZUNlbnRlci5hZGRlZChjdXJSYWRpdXNEaXIubXVsdGlwbGllZChyYWRpdXMgLSBjdXJIYWxmV2lkdGgpKTtcbiAgICAgICAgICAgIGNvbnN0IGN1ckxlZnRQdCA9IGN1ckxlZnRNb2xkUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0ICsgaSAqIHN0ZXBIZWlnaHQpKTtcbiAgICAgICAgICAgIGNvbnN0IGN1clJpZ2h0UHQgPSBjdXJSaWdodE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBpICogc3RlcEhlaWdodCkpO1xuICAgICAgICAgICAgbW9sZFZlcnRpY2VzLnB1c2goY3VyTGVmdE1vbGRQdCwgY3VyUmlnaHRNb2xkUHQpO1xuICAgICAgICAgICAgbW9sZFRlbXBMaW5lcy5wdXNoKFsyICogaSwgMSArIDIgKiBpXSwgWzIgKiBpLCAyICsgMiAqIGldLCBbMSArIDIgKiBpLCAzICsgMiAqIGldKTtcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2goY3VyTGVmdFB0LCBjdXJSaWdodFB0KTtcbiAgICAgICAgICAgIGNvbnN0IG5leHRSb3RhdGVNYXRyaXggPSBHZW9tTGliLmNyZWF0ZVJvdGF0ZU1hdHJpeDQoaG9yaXpvbnRhbFN0ZXBBbmdsZSAqIChpICsgMSksIGNpcmNsZU5vcm1hbCwgZHVtbXlQb2ludDNkKTtcbiAgICAgICAgICAgIGNvbnN0IG5leHRSYWRpdXNEaXIgPSBzdGFydFJhZGl1c0Rpci5hcHBsaWVkTWF0cml4NChuZXh0Um90YXRlTWF0cml4KTtcbiAgICAgICAgICAgIGNvbnN0IG5leHRIYWxmV2lkdGggPSAoc3RhcnRXaWR0aCArIChlbmRXaWR0aCAtIHN0YXJ0V2lkdGgpICogKChpICsgMSkgKiBob3Jpem9udGFsU3RlcEFuZ2xlKSAvIGFyY0FuZ2xlKSAvIDIgKiAoaXNMZWZ0QXJjID8gLTEgOiAxKTtcbiAgICAgICAgICAgIGNvbnN0IG5leHRMZWZ0TW9sZFB0ID0gY2lyY2xlQ2VudGVyLmFkZGVkKG5leHRSYWRpdXNEaXIubXVsdGlwbGllZChyYWRpdXMgKyBuZXh0SGFsZldpZHRoKSk7XG4gICAgICAgICAgICBjb25zdCBuZXh0UmlnaHRNb2xkUHQgPSBjaXJjbGVDZW50ZXIuYWRkZWQobmV4dFJhZGl1c0Rpci5tdWx0aXBsaWVkKHJhZGl1cyAtIG5leHRIYWxmV2lkdGgpKTtcbiAgICAgICAgICAgIGNvbnN0IG5leHRMZWZ0UHQgPSBuZXh0TGVmdE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBpICogc3RlcEhlaWdodCkpO1xuICAgICAgICAgICAgY29uc3QgbmV4dFJpZ2h0UHQgPSBuZXh0UmlnaHRNb2xkUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0ICsgaSAqIHN0ZXBIZWlnaHQpKTtcbiAgICAgICAgICAgIGlmICh1cHdhcmQpIHtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKGN1ckxlZnRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLCBjdXJSaWdodFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaChuZXh0TGVmdFB0LCBuZXh0UmlnaHRQdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFs0ICogaSwgMSArIDQgKiBpXSwgWzQgKiBpLCAyICsgNCAqIGldLCBbMSArIDQgKiBpLCAzICsgNCAqIGldLCBbMiArIDQgKiBpLCAzICsgNCAqIGldLCBbMiArIDQgKiBpLCA0ICsgNCAqIGldLCBbMyArIDQgKiBpLCA1ICsgNCAqIGldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpID09PSBzdGVwQ291bnQgLSAyKSB7XG4gICAgICAgICAgICAgICAgbW9sZFZlcnRpY2VzLnB1c2gobmV4dExlZnRNb2xkUHQsIG5leHRSaWdodE1vbGRQdCk7XG4gICAgICAgICAgICAgICAgbW9sZFRlbXBMaW5lcy5wdXNoKFsyICogKHN0ZXBDb3VudCAtIDEpLCAxICsgMiAqIChzdGVwQ291bnQgLSAxKV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGkgPT09IHN0ZXBDb3VudCAtIDIpIHtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKG5leHRMZWZ0UHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSwgbmV4dFJpZ2h0UHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSk7XG4gICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzQgKiAoc3RlcENvdW50IC0gMSksIDEgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxhc3RSb3RhdGVNYXRyaXggPSBHZW9tTGliLmNyZWF0ZVJvdGF0ZU1hdHJpeDQoYXJjQW5nbGUsIGNpcmNsZU5vcm1hbCwgZHVtbXlQb2ludDNkKTtcbiAgICAgICAgY29uc3QgbGFzdFJhZGl1c0RpciA9IHN0YXJ0UmFkaXVzRGlyLmFwcGxpZWRNYXRyaXg0KGxhc3RSb3RhdGVNYXRyaXgpO1xuICAgICAgICBjb25zdCBsYXN0SGFsZldpZHRoID0gaXNMZWZ0QXJjID8gLWVuZFdpZHRoIC8gMiA6IGVuZFdpZHRoIC8gMjtcbiAgICAgICAgY29uc3QgbGFzdExlZnRNb2xkUHQgPSBjaXJjbGVDZW50ZXIuYWRkZWQobGFzdFJhZGl1c0Rpci5tdWx0aXBsaWVkKHJhZGl1cyArIGxhc3RIYWxmV2lkdGgpKTtcbiAgICAgICAgY29uc3QgbGFzdFJpZ2h0TW9sZFB0ID0gY2lyY2xlQ2VudGVyLmFkZGVkKGxhc3RSYWRpdXNEaXIubXVsdGlwbGllZChyYWRpdXMgLSBsYXN0SGFsZldpZHRoKSk7XG4gICAgICAgIGNvbnN0IGxhc3RMZWZ0UHQgPSBsYXN0TGVmdE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBzdGVwQ291bnQgKiBzdGVwSGVpZ2h0KSk7XG4gICAgICAgIGNvbnN0IGxhc3RSaWdodFB0ID0gbGFzdFJpZ2h0TW9sZFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIHN0ZXBDb3VudCAqIHN0ZXBIZWlnaHQpKTtcbiAgICAgICAgaWYgKHN0ZXBDb3VudCA9PT0gMSkge1xuICAgICAgICAgICAgbW9sZFZlcnRpY2VzLnB1c2gobGVmdFB0LCByaWdodFB0KTtcbiAgICAgICAgICAgIG1vbGRUZW1wTGluZXMucHVzaChbMiAqIChzdGVwQ291bnQgLSAxKSwgMSArIDIgKiAoc3RlcENvdW50IC0gMSldKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGFzdEhvcml6b250YWxBbmdsZSA+PSBBbmdsZVRvbGVyYW5jZSB8fCBsYXN0SG9yaXpvbnRhbEFuZ2xlID09PSAwKSB7XG4gICAgICAgICAgICBtb2xkVmVydGljZXMucHVzaChsYXN0TGVmdE1vbGRQdCwgbGFzdFJpZ2h0TW9sZFB0KTtcbiAgICAgICAgICAgIG1vbGRUZW1wTGluZXMucHVzaChbMiAqIChzdGVwQ291bnQgLSAxKSwgMiArIDIgKiAoc3RlcENvdW50IC0gMSldLCBbMSArIDIgKiAoc3RlcENvdW50IC0gMSksIDMgKyAyICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKiBzdGVwQ291bnQsIDEgKyAyICogc3RlcENvdW50XSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVwd2FyZCkge1xuICAgICAgICAgICAgaWYgKHN0ZXBDb3VudCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2gobGVmdFB0LCByaWdodFB0KTtcbiAgICAgICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbNCAqIChzdGVwQ291bnQgLSAxKSwgMSArIDQgKiAoc3RlcENvdW50IC0gMSldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGFzdEhvcml6b250YWxBbmdsZSA+PSBBbmdsZVRvbGVyYW5jZSB8fCBsYXN0SG9yaXpvbnRhbEFuZ2xlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpKTtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKGxhc3RMZWZ0UHQsIGxhc3RSaWdodFB0KTtcbiAgICAgICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbNCAqIChzdGVwQ291bnQgLSAxKSwgMiArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMSArIDQgKiAoc3RlcENvdW50IC0gMSksIDMgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCAzICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsyICsgNCAqIChzdGVwQ291bnQgLSAxKSwgNCArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMyArIDQgKiAoc3RlcENvdW50IC0gMSksIDUgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzQgKiBzdGVwQ291bnQsIDEgKyA0ICogc3RlcENvdW50XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHN0ZXBDb3VudCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2gobGVmdFB0LCByaWdodFB0KTtcbiAgICAgICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbNCAqIChzdGVwQ291bnQgLSAxKSwgMSArIDQgKiAoc3RlcENvdW50IC0gMSldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGFzdEhvcml6b250YWxBbmdsZSA+PSBBbmdsZVRvbGVyYW5jZSB8fCBsYXN0SG9yaXpvbnRhbEFuZ2xlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaChsYXN0TGVmdFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCgtc3RlcEhlaWdodCkpLCBsYXN0UmlnaHRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQpKSk7XG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaChsYXN0TGVmdFB0LCBsYXN0UmlnaHRQdCk7XG4gICAgICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzQgKiAoc3RlcENvdW50IC0gMSksIDIgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzEgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCAzICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsyICsgNCAqIChzdGVwQ291bnQgLSAxKSwgMyArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMiArIDQgKiAoc3RlcENvdW50IC0gMSksIDQgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzMgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCA1ICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFs0ICogc3RlcENvdW50LCAxICsgNCAqIHN0ZXBDb3VudF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RlcENvdW50ID4gMSkge1xuICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbdmVydGljZXMubGVuZ3RoIC0gMiwgMiArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMSArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgYWN0dWFsTGFzdFN0ZXBMZW5ndGggPSBsYXN0SG9yaXpvbnRhbEFuZ2xlIDwgQW5nbGVUb2xlcmFuY2UgPyBob3Jpem9udGFsU3RlcEFuZ2xlIDogbGFzdEhvcml6b250YWxBbmdsZTtcbiAgICAgICAgICAgIGlmICh1cHdhcmQpIHtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCgtc3RlcEhlaWdodCAtICgxIC0gYWN0dWFsTGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcEFuZ2xlKSAqIHN0ZXBIZWlnaHQpKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0IC0gKDEgLSBhY3R1YWxMYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwQW5nbGUpICogc3RlcEhlaWdodCkpKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gc3RlcENvdW50IC0gKGxhc3RIb3Jpem9udGFsQW5nbGUgPj0gQW5nbGVUb2xlcmFuY2UgPyAxIDogMik7IGogPiAwOyBqLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdkluZCA9IGogKiA0O1xuICAgICAgICAgICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIDIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGogPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbMiArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDBdLCBbMyArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDFdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZJbmRdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCgtc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1t2SW5kICsgMV0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0KSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSBzdGVwQ291bnQgLSAobGFzdEhvcml6b250YWxBbmdsZSA+PSBBbmdsZVRvbGVyYW5jZSA/IDEgOiAyKTsgaiA+PSAwOyBqLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdkluZCA9IGogKiA0O1xuICAgICAgICAgICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goW3ZlcnRpY2VzLmxlbmd0aCAtIDIsIDIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzEgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGogPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbMiArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDBdLCBbMyArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDFdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZJbmRdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSksIHZlcnRpY2VzW3ZJbmQgKyAxXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSAyLCAyICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsxICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMiArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAwXSwgWzMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodXB3YXJkKSB7XG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoLXN0ZXBIZWlnaHQpKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0KSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1swXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1sxXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoYmFzZUNvbXBvbmVudCAmJiBiYXNlQ29tcG9uZW50LmxpbmUzZEluZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGJhc2VMaW5lU2VnM2QgPSBiYXNlQ29tcG9uZW50LmxpbmUzZDtcbiAgICAgICAgICAgIGNvbnN0IGJhc2VMaW5lRGlyID0gYmFzZUxpbmVTZWczZC5lbmQuc3VidHJhY3RlZChiYXNlTGluZVNlZzNkLnN0YXJ0KS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICBjb25zdCBhbmdsZSA9IGNpcmNsZVRhbmdlbnQuYW5nbGUoYmFzZUxpbmVEaXIpO1xuICAgICAgICAgICAgaWYgKGFuZ2xlIDwgTWF0aC5QSSAvIDIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb3JuZXJDb25uZWN0aW9uUG9pbnQxID0gc3RhcnQuYWRkZWQoYmFzZUxpbmVEaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIgKiBNYXRoLnNpZ24oYW5nbGUpKSk7XG4gICAgICAgICAgICAgICAgY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzID0gW3N0YXJ0LCBzdGFydC5hZGRlZCh0YW5nZW50TGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpLCBjb3JuZXJDb25uZWN0aW9uUG9pbnQxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvcm5lckNvbm5lY3Rpb25Qb2ludDIgPSBzdGFydC5hZGRlZChiYXNlTGluZURpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyICogTWF0aC5zaWduKGFuZ2xlKSkpO1xuICAgICAgICAgICAgICAgIGNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtzdGFydCwgY29ybmVyQ29ubmVjdGlvblBvaW50Miwgc3RhcnQuYWRkZWQodGFuZ2VudExlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvcm5lck1vbGRTaGFwZS50ZW1wTGluZXMgPSBbWzAsIDFdLCBbMSwgMl0sIFsyLCAwXV07XG4gICAgICAgICAgICBjb3JuZXJTaGFwZS52ZXJ0aWNlcyA9IFtcbiAgICAgICAgICAgICAgICAuLi5jb3JuZXJNb2xkU2hhcGUudmVydGljZXMubWFwKHYgPT4gdi5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKSksXG4gICAgICAgICAgICAgICAgLi4uY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzLm1hcCh2ID0+IHYuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0IC0gcGxhdGZvcm1UaGlja25lc3MpKSksXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICBjb3JuZXJTaGFwZS50ZW1wTGluZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgIFswLCAxXSwgWzEsIDJdLCBbMiwgMF0sXG4gICAgICAgICAgICAgICAgICAgIFszLCA0XSwgWzQsIDVdLCBbNSwgM10sXG4gICAgICAgICAgICAgICAgICAgIFswLCAzXSwgWzEsIDRdLCBbMiwgNV0sXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGdlbmVyYXRlU3RyYWlnaHRTdGFpclNoYXBlKHNlZ21lbnQsIHRlbXAgPSB0cnVlKSB7XG4gICAgY29uc3QgeyBzdGFydCwgZW5kLCBzdGFpclNoYXBlLCBtb2xkU2hhcGUsIGNvcm5lclNoYXBlLCBjb3JuZXJNb2xkU2hhcGUsIHN0YXJ0SGVpZ2h0LCBiYXNlQ29tcG9uZW50LCBwYXJhbSB9ID0gc2VnbWVudDtcbiAgICBjb25zdCB7IHN0YXJ0V2lkdGgsIGVuZFdpZHRoLCBob3Jpem9udGFsU3RlcCwgdmVydGljYWxTdGVwLCB1cHdhcmQsIHBsYXRmb3JtVGhpY2tuZXNzIH0gPSBwYXJhbTtcbiAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gW107XG4gICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXTtcbiAgICBtb2xkU2hhcGUudmVydGljZXMgPSBbXTtcbiAgICBtb2xkU2hhcGUudGVtcExpbmVzID0gW107XG4gICAgY29ybmVyU2hhcGUudmVydGljZXMgPSBbXTtcbiAgICBjb3JuZXJTaGFwZS50ZW1wTGluZXMgPSBbXTtcbiAgICBjb3JuZXJNb2xkU2hhcGUudmVydGljZXMgPSBbXTtcbiAgICBjb3JuZXJNb2xkU2hhcGUudGVtcExpbmVzID0gW107XG4gICAgY29uc3QgeyB2ZXJ0aWNlcywgdGVtcExpbmVzIH0gPSBzdGFpclNoYXBlO1xuICAgIGNvbnN0IHsgdmVydGljZXM6IG1vbGRWZXJ0aWNlcywgdGVtcExpbmVzOiBtb2xkVGVtcExpbmVzIH0gPSBtb2xkU2hhcGU7XG4gICAgbGV0IGhvcml6b250YWxGcm9udERpciA9IGVuZC5zdWJ0cmFjdGVkKHN0YXJ0KS5ub3JtYWxpemVkKCk7XG4gICAgbGV0IHN0YXJ0RW5kRGlzdGFuY2UgPSBzdGFydC5kaXN0YW5jZVRvKGVuZCk7XG4gICAgbGV0IGhvcml6b250YWxMZWZ0RGlyID0gRGlyZWN0aW9uWi5jcm9zcyhob3Jpem9udGFsRnJvbnREaXIpO1xuICAgIGNvbnN0IHN0ZXBGbG9hdENvdW50ID0gc3RhcnRFbmREaXN0YW5jZSAvIGhvcml6b250YWxTdGVwO1xuICAgIGNvbnN0IHN0ZXBDb3VudCA9IE1hdGguY2VpbChzdGVwRmxvYXRDb3VudCk7XG4gICAgY29uc3QgbGFzdFN0ZXBMZW5ndGggPSBzdGFydEVuZERpc3RhbmNlIC0gKHN0ZXBDb3VudCAtIDEpICogaG9yaXpvbnRhbFN0ZXA7XG4gICAgY29uc3QgdmFsaWRTdGVwQ291bnQgPSAobGFzdFN0ZXBMZW5ndGggPT09IDAgfHwgbGFzdFN0ZXBMZW5ndGggPiBMZW5ndGhUb2xlcmFuY2UpID8gc3RlcENvdW50IDogc3RlcENvdW50IC0gMTtcbiAgICBpZiAodmFsaWRTdGVwQ291bnQgPCAxIHx8IHZhbGlkU3RlcENvdW50ID49IFN0ZXBDb3VudExpbWl0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGJhc2VDb21wb25lbnQpIHtcbiAgICAgICAgY29uc3QgYmFzZUxpbmVTZWczZCA9IGJhc2VDb21wb25lbnQubGluZTNkO1xuICAgICAgICBjb25zdCBiYXNlTGluZURpciA9IGJhc2VMaW5lU2VnM2QuZW5kLnN1YnRyYWN0ZWQoYmFzZUxpbmVTZWczZC5zdGFydCkubm9ybWFsaXplZCgpO1xuICAgICAgICBjb25zdCBhbmdsZSA9IGhvcml6b250YWxGcm9udERpci5hbmdsZShiYXNlTGluZURpcik7XG4gICAgICAgIGNvbnN0IGRlbHRhQW5nbGUgPSBNYXRoLmFicyhhbmdsZSAtIE1hdGguUEkgLyAyKTtcbiAgICAgICAgaWYgKGRlbHRhQW5nbGUgPD0gRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UpIHtcbiAgICAgICAgICAgIHNlZ21lbnQuY29tcG9uZW50RGlyZWN0aW9uVHlwZSA9IENvbXBvbmVudERpcmVjdGlvblR5cGUuRnJvbnQ7XG4gICAgICAgICAgICBob3Jpem9udGFsRnJvbnREaXIgPSBiYXNlTGluZURpci5jcm9zcyhob3Jpem9udGFsRnJvbnREaXIuY3Jvc3MoYmFzZUxpbmVEaXIpKS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICBzdGFydEVuZERpc3RhbmNlID0gc3RhcnRFbmREaXN0YW5jZSAqIE1hdGguY29zKGRlbHRhQW5nbGUpO1xuICAgICAgICAgICAgaG9yaXpvbnRhbExlZnREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKGhvcml6b250YWxGcm9udERpcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoYW5nbGUgPCBNYXRoLlBJIC8gMikge1xuICAgICAgICAgICAgICAgIHNlZ21lbnQuY29tcG9uZW50RGlyZWN0aW9uVHlwZSA9IENvbXBvbmVudERpcmVjdGlvblR5cGUuTGVmdDtcbiAgICAgICAgICAgICAgICBjb25zdCBjb3JuZXJDb25uZWN0aW9uUG9pbnQxID0gc3RhcnQuYWRkZWQoYmFzZUxpbmVEaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIgKiBNYXRoLnNpZ24oYW5nbGUpKSk7XG4gICAgICAgICAgICAgICAgY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzID0gW3N0YXJ0LCBzdGFydC5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMikpLCBjb3JuZXJDb25uZWN0aW9uUG9pbnQxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlZ21lbnQuY29tcG9uZW50RGlyZWN0aW9uVHlwZSA9IENvbXBvbmVudERpcmVjdGlvblR5cGUuUmlnaHQ7XG4gICAgICAgICAgICAgICAgY29uc3QgY29ybmVyQ29ubmVjdGlvblBvaW50MiA9IHN0YXJ0LmFkZGVkKGJhc2VMaW5lRGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIgKiBNYXRoLnNpZ24oYW5nbGUpKSk7XG4gICAgICAgICAgICAgICAgY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzID0gW3N0YXJ0LCBjb3JuZXJDb25uZWN0aW9uUG9pbnQyLCBzdGFydC5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29ybmVyTW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtbMCwgMV0sIFsxLCAyXSwgWzIsIDBdXTtcbiAgICAgICAgICAgIGNvcm5lclNoYXBlLnZlcnRpY2VzID0gW1xuICAgICAgICAgICAgICAgIC4uLmNvcm5lck1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAodiA9PiB2LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCkpKSxcbiAgICAgICAgICAgICAgICAuLi5jb3JuZXJNb2xkU2hhcGUudmVydGljZXMubWFwKHYgPT4gdi5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgLSBwbGF0Zm9ybVRoaWNrbmVzcykpKSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgIGNvcm5lclNoYXBlLnRlbXBMaW5lcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgWzAsIDFdLCBbMSwgMl0sIFsyLCAwXSxcbiAgICAgICAgICAgICAgICAgICAgWzMsIDRdLCBbNCwgNV0sIFs1LCAzXSxcbiAgICAgICAgICAgICAgICAgICAgWzAsIDNdLCBbMSwgNF0sIFsyLCA1XSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHN0ZXBIZWlnaHQgPSB1cHdhcmQgPyB2ZXJ0aWNhbFN0ZXAgOiAtdmVydGljYWxTdGVwO1xuICAgIHNlZ21lbnQuZW5kSGVpZ2h0ID0gc2VnbWVudC5zdGFydEhlaWdodCArIHZhbGlkU3RlcENvdW50ICogc3RlcEhlaWdodDtcbiAgICBzdGFpclNoYXBlLnN0ZXBDb3VudCA9IHZhbGlkU3RlcENvdW50O1xuICAgIG1vbGRTaGFwZS5zdGVwQ291bnQgPSB2YWxpZFN0ZXBDb3VudDtcbiAgICBjb25zdCBsZWZ0UHQgPSBzdGFydC5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSk7XG4gICAgY29uc3QgcmlnaHRQdCA9IHN0YXJ0LmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSk7XG4gICAgY29uc3Qgd2lkdGhEZWx0YSA9IChlbmRXaWR0aCAtIHN0YXJ0V2lkdGgpIC8gMiAvIChzdGVwRmxvYXRDb3VudCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGVwQ291bnQgLSAxOyBpKyspIHtcbiAgICAgICAgY29uc3QgY3VyTGVmdE1vbGRQdCA9IGxlZnRQdC5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChpICogaG9yaXpvbnRhbFN0ZXApKS5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKGkgKiB3aWR0aERlbHRhKSk7XG4gICAgICAgIGNvbnN0IGN1clJpZ2h0TW9sZFB0ID0gcmlnaHRQdC5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChpICogaG9yaXpvbnRhbFN0ZXApKS5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKC1pICogd2lkdGhEZWx0YSkpO1xuICAgICAgICBjb25zdCBjdXJMZWZ0UHQgPSBjdXJMZWZ0TW9sZFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIGkgKiBzdGVwSGVpZ2h0KSk7XG4gICAgICAgIGNvbnN0IGN1clJpZ2h0UHQgPSBjdXJSaWdodE1vbGRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBpICogc3RlcEhlaWdodCkpO1xuICAgICAgICBtb2xkVmVydGljZXMucHVzaChjdXJMZWZ0TW9sZFB0LCBjdXJSaWdodE1vbGRQdCk7XG4gICAgICAgIG1vbGRUZW1wTGluZXMucHVzaChbMiAqIGksIDEgKyAyICogaV0sIFsyICogaSwgMiArIDIgKiBpXSwgWzEgKyAyICogaSwgMyArIDIgKiBpXSk7XG4gICAgICAgIHZlcnRpY2VzLnB1c2goY3VyTGVmdFB0LCBjdXJSaWdodFB0KTtcbiAgICAgICAgaWYgKHVwd2FyZCkge1xuICAgICAgICAgICAgdmVydGljZXMucHVzaChjdXJMZWZ0UHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSwgY3VyUmlnaHRQdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2goY3VyTGVmdFB0LmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSksIGN1clJpZ2h0UHQuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaG9yaXpvbnRhbFN0ZXApKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFs0ICogaSwgMSArIDQgKiBpXSwgWzQgKiBpLCAyICsgNCAqIGldLCBbMSArIDQgKiBpLCAzICsgNCAqIGldLCBbMiArIDQgKiBpLCAzICsgNCAqIGldLCBbMiArIDQgKiBpLCA0ICsgNCAqIGldLCBbMyArIDQgKiBpLCA1ICsgNCAqIGldKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBtb2xkVmVydGljZXMucHVzaChzdGVwQ291bnQgPiAxID8gbW9sZFZlcnRpY2VzW21vbGRWZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKHdpZHRoRGVsdGEpKS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpIDogbGVmdFB0LCBzdGVwQ291bnQgPiAxID8gbW9sZFZlcnRpY2VzW21vbGRWZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKHdpZHRoRGVsdGEpKS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpIDogcmlnaHRQdCk7XG4gICAgbW9sZFRlbXBMaW5lcy5wdXNoKFsyICogKHN0ZXBDb3VudCAtIDEpLCAxICsgMiAqIChzdGVwQ291bnQgLSAxKV0pO1xuICAgIGlmIChsYXN0U3RlcExlbmd0aCA+IExlbmd0aFRvbGVyYW5jZSB8fCBsYXN0U3RlcExlbmd0aCA9PT0gMCkge1xuICAgICAgICBtb2xkVmVydGljZXMucHVzaChtb2xkVmVydGljZXNbbW9sZFZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcCAqIHdpZHRoRGVsdGEpKS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCkpLCBtb2xkVmVydGljZXNbbW9sZFZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoLWxhc3RTdGVwTGVuZ3RoIC8gaG9yaXpvbnRhbFN0ZXAgKiB3aWR0aERlbHRhKSkuYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGgpKSk7XG4gICAgICAgIG1vbGRUZW1wTGluZXMucHVzaChbMiAqIChzdGVwQ291bnQgLSAxKSwgMiArIDIgKiAoc3RlcENvdW50IC0gMSldLCBbMSArIDIgKiAoc3RlcENvdW50IC0gMSksIDMgKyAyICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKiBzdGVwQ291bnQsIDEgKyAyICogc3RlcENvdW50XSk7XG4gICAgfVxuICAgIGlmICh1cHdhcmQpIHtcbiAgICAgICAgdmVydGljZXMucHVzaChzdGVwQ291bnQgPiAxID8gdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoaG9yaXpvbnRhbFN0ZXApKS5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKHdpZHRoRGVsdGEpKSA6IGxlZnRQdCwgc3RlcENvdW50ID4gMSA/IHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGhvcml6b250YWxTdGVwKSkuYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZCgtd2lkdGhEZWx0YSkpIDogcmlnaHRQdCk7XG4gICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbNCAqIChzdGVwQ291bnQgLSAxKSwgMSArIDQgKiAoc3RlcENvdW50IC0gMSldKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGFzdFN0ZXBMZW5ndGggPiBMZW5ndGhUb2xlcmFuY2UgfHwgbGFzdFN0ZXBMZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSk7XG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcCAqIHdpZHRoRGVsdGEpKS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCkpLCB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKC1sYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwICogd2lkdGhEZWx0YSkpLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoKSkpO1xuICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbNCAqIChzdGVwQ291bnQgLSAxKSwgMiArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMSArIDQgKiAoc3RlcENvdW50IC0gMSksIDMgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCAzICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsyICsgNCAqIChzdGVwQ291bnQgLSAxKSwgNCArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMyArIDQgKiAoc3RlcENvdW50IC0gMSksIDUgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzQgKiBzdGVwQ291bnQsIDEgKyA0ICogc3RlcENvdW50XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZlcnRpY2VzLnB1c2goc3RlcENvdW50ID4gMSA/IHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGVwSGVpZ2h0KSkuYWRkZWQoaG9yaXpvbnRhbExlZnREaXIubXVsdGlwbGllZCh3aWR0aERlbHRhKSkgOiBsZWZ0UHQsIHN0ZXBDb3VudCA+IDEgPyB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQoLXdpZHRoRGVsdGEpKSA6IHJpZ2h0UHQpO1xuICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goWzQgKiAoc3RlcENvdW50IC0gMSksIDEgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxhc3RTdGVwTGVuZ3RoID4gTGVuZ3RoVG9sZXJhbmNlIHx8IGxhc3RTdGVwTGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKGhvcml6b250YWxMZWZ0RGlyLm11bHRpcGxpZWQobGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcCAqIHdpZHRoRGVsdGEpKS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChsYXN0U3RlcExlbmd0aCkpLCB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChob3Jpem9udGFsTGVmdERpci5tdWx0aXBsaWVkKC1sYXN0U3RlcExlbmd0aCAvIGhvcml6b250YWxTdGVwICogd2lkdGhEZWx0YSkpLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKGxhc3RTdGVwTGVuZ3RoKSkpO1xuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAyXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpLCB2ZXJ0aWNlc1t2ZXJ0aWNlcy5sZW5ndGggLSAxXS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RlcEhlaWdodCkpKTtcbiAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgdGVtcExpbmVzLnB1c2goXG4gICAgICAgICAgICAgICAgLy8gWzQgKiAoc3RlcENvdW50IC0gMSksIDEgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSxcbiAgICAgICAgICAgICAgICBbNCAqIChzdGVwQ291bnQgLSAxKSwgMiArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMSArIDQgKiAoc3RlcENvdW50IC0gMSksIDMgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzIgKyA0ICogKHN0ZXBDb3VudCAtIDEpLCAzICsgNCAqIChzdGVwQ291bnQgLSAxKV0sIFsyICsgNCAqIChzdGVwQ291bnQgLSAxKSwgNCArIDQgKiAoc3RlcENvdW50IC0gMSldLCBbMyArIDQgKiAoc3RlcENvdW50IC0gMSksIDUgKyA0ICogKHN0ZXBDb3VudCAtIDEpXSwgWzQgKiBzdGVwQ291bnQsIDEgKyA0ICogc3RlcENvdW50XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHN0ZXBDb3VudCA+IDEpIHtcbiAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgIHRlbXBMaW5lcy5wdXNoKFt2ZXJ0aWNlcy5sZW5ndGggLSAyLCAyICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsxICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMyArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMiArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCA0ICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFszICsgdmVydGljZXMubGVuZ3RoIC0gMiwgNSArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbdmVydGljZXMubGVuZ3RoICsgMiwgMSArIHZlcnRpY2VzLmxlbmd0aCArIDJdLCBbdmVydGljZXMubGVuZ3RoICsgMiwgMF0sIFsxICsgdmVydGljZXMubGVuZ3RoICsgMiwgMV0pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFjdHVhbExhc3RTdGVwTGVuZ3RoID0gbGFzdFN0ZXBMZW5ndGggPCBMZW5ndGhUb2xlcmFuY2UgPyBob3Jpem9udGFsU3RlcCA6IGxhc3RTdGVwTGVuZ3RoO1xuICAgICAgICBpZiAodXB3YXJkKSB7XG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDJdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCgtc3RlcEhlaWdodCAtICgxIC0gYWN0dWFsTGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcCkgKiBzdGVwSGVpZ2h0KSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCgtc3RlcEhlaWdodCAtICgxIC0gYWN0dWFsTGFzdFN0ZXBMZW5ndGggLyBob3Jpem9udGFsU3RlcCkgKiBzdGVwSGVpZ2h0KSkpO1xuICAgICAgICAgICAgdmVydGljZXMucHVzaCh2ZXJ0aWNlc1swXS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpLCB2ZXJ0aWNlc1sxXS5hZGRlZChob3Jpem9udGFsRnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoaG9yaXpvbnRhbEZyb250RGlyLm11bHRpcGxpZWQoLWFjdHVhbExhc3RTdGVwTGVuZ3RoKSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKGhvcml6b250YWxGcm9udERpci5tdWx0aXBsaWVkKC1hY3R1YWxMYXN0U3RlcExlbmd0aCkpKTtcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbMF0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSwgdmVydGljZXNbMV0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICB0ZW1wTGluZXMucHVzaChbdmVydGljZXMubGVuZ3RoIC0gMiwgMiArIHZlcnRpY2VzLmxlbmd0aCAtIDJdLCBbMSArIHZlcnRpY2VzLmxlbmd0aCAtIDIsIDMgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyXSwgWzIgKyB2ZXJ0aWNlcy5sZW5ndGggLSAyLCAzICsgdmVydGljZXMubGVuZ3RoIC0gMl0sIFsyICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMF0sIFszICsgdmVydGljZXMubGVuZ3RoIC0gMiwgMV0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cHdhcmQpIHtcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMl0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKC1zdGVwSGVpZ2h0KSksIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCgtc3RlcEhlaWdodCkpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNbMF0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSwgdmVydGljZXNbMV0uYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0ZXBIZWlnaHQpKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBnZW5lcmF0ZVBsYXRmb3JtU2hhcGUoc2VnbWVudCwgdGVtcCA9IHRydWUpIHtcbiAgICBjb25zdCB7IHN0YXJ0LCBzdGFydEhlaWdodCwgYmFzZUNvbXBvbmVudCwgc3RhaXJTaGFwZSwgbW9sZFNoYXBlLCBjb3JuZXJTaGFwZSwgY29ybmVyTW9sZFNoYXBlLCBwYXJhbSB9ID0gc2VnbWVudDtcbiAgICBjb25zdCB7IHN0YXJ0V2lkdGgsIG9mZnNldFdpZHRoLCB3aXRoT2Zmc2V0LCBwbGF0Zm9ybVRoaWNrbmVzcywgcGxhdGZvcm1MZW5ndGgsIHBsYXRmb3JtTGVuZ3RoTG9ja2VkLCBtb2RlbEVkaXRpbmcgfSA9IHBhcmFtO1xuICAgIGNvbnN0IGN1ckRpciA9IHNlZ21lbnQuZW5kLnN1YnRyYWN0ZWQoc3RhcnQpO1xuICAgIGNvbnN0IGN1ckRpck5vcm1hbGl6ZWQgPSBzZWdtZW50LmVuZC5zdWJ0cmFjdGVkKHN0YXJ0KS5ub3JtYWxpemVkKCk7XG4gICAgY29uc3QgY3VyTGVmdERpciA9IERpcmVjdGlvblouY3Jvc3MoY3VyRGlyKS5ub3JtYWxpemVkKCk7XG4gICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFtdO1xuICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW107XG4gICAgbW9sZFNoYXBlLnZlcnRpY2VzID0gW107XG4gICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtdO1xuICAgIGNvcm5lclNoYXBlLnZlcnRpY2VzID0gW107XG4gICAgY29ybmVyU2hhcGUudGVtcExpbmVzID0gW107XG4gICAgY29ybmVyTW9sZFNoYXBlLnZlcnRpY2VzID0gW107XG4gICAgY29ybmVyTW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtdO1xuICAgIHNlZ21lbnQuZW5kID0gcGxhdGZvcm1MZW5ndGhMb2NrZWQgPyBzZWdtZW50LnN0YXJ0LmFkZGVkKGN1ckRpck5vcm1hbGl6ZWQubXVsdGlwbGllZChwbGF0Zm9ybUxlbmd0aCkpIDogc2VnbWVudC5lbmQ7XG4gICAgc2VnbWVudC5lbmRIZWlnaHQgPSBzdGFydEhlaWdodDtcbiAgICBpZiAoIW1vZGVsRWRpdGluZykge1xuICAgICAgICBwYXJhbS53aXRoT2Zmc2V0ID0gZmFsc2U7XG4gICAgfVxuICAgIGlmIChiYXNlQ29tcG9uZW50KSB7XG4gICAgICAgIC8vIGNvbnN0IHsgc3RhcnQ6IGJhc2VMaW5lU3RhcnQsIGVuZDogYmFzZUxpbmVFbmQgfSA9IGJhc2VDb21wb25lbnQubGluZTNkO1xuICAgICAgICBjb25zdCB7IGFuZ2xlLCBmcm9udExlbmd0aCwgY29ybmVyRGlyZWN0aW9uQW5nbGUsIHByZXZEaXJOb3JtYWxpemVkLCBwcmV2TGVmdERpciwgbGVmdENvbm5lY3RQb2ludHMsIHJpZ2h0Q29ubmVjdFBvaW50cyB9ID0gY2FsY3VsYXRlUGxhdGZvcm0oc2VnbWVudCwgYmFzZUNvbXBvbmVudC5saW5lM2QpO1xuICAgICAgICBpZiAoKGFuZ2xlID49IE1hdGguUEkgJiYgYW5nbGUgPD0gKE1hdGguUEkgKiAzIC8gMiArIGNvcm5lckRpcmVjdGlvbkFuZ2xlKSkgfHwgKG1vZGVsRWRpdGluZyAmJiB3aXRoT2Zmc2V0ICYmIG9mZnNldFdpZHRoID49IDApKSB7XG4gICAgICAgICAgICBzZWdtZW50LmNvbXBvbmVudERpcmVjdGlvblR5cGUgPSBDb21wb25lbnREaXJlY3Rpb25UeXBlLkxlZnQ7XG4gICAgICAgICAgICBwYXJhbS5wbGF0Zm9ybUxlbmd0aCA9IGZyb250TGVuZ3RoO1xuICAgICAgICAgICAgY29uc3QgZnJvbnRFbmQgPSBzZWdtZW50LnN0YXJ0LmFkZGVkKHByZXZEaXJOb3JtYWxpemVkLm11bHRpcGxpZWQoZnJvbnRMZW5ndGgpKTtcbiAgICAgICAgICAgIHNlZ21lbnQuZW5kID0gZnJvbnRFbmQ7XG4gICAgICAgICAgICBjb25zdCBsZWZ0TGVuZ3RoID0gd2l0aE9mZnNldCAmJiBtb2RlbEVkaXRpbmcgPyAob2Zmc2V0V2lkdGggKyBzdGFydFdpZHRoIC8gMikgOiBjdXJEaXIuZG90KHByZXZMZWZ0RGlyKTtcbiAgICAgICAgICAgIGlmIChsZWZ0TGVuZ3RoID4gc3RhcnRXaWR0aCAvIDIpIHtcbiAgICAgICAgICAgICAgICBwYXJhbS53aXRoT2Zmc2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBwYXJhbS5vZmZzZXRXaWR0aCA9IGxlZnRMZW5ndGggLSBzdGFydFdpZHRoIC8gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHZhbGlkTGVmdExlbmd0aCA9IE1hdGgubWF4KHN0YXJ0V2lkdGggLyAyLCBsZWZ0TGVuZ3RoKTtcbiAgICAgICAgICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtcbiAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKHZhbGlkTGVmdExlbmd0aCkpLFxuICAgICAgICAgICAgICAgIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSksXG4gICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKHZhbGlkTGVmdExlbmd0aCkpLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIG1vbGRTaGFwZS50ZW1wTGluZXMgPSBbWzAsIDFdLCBbMSwgMl0sIFsyLCAzXSwgWzMsIDBdXTtcbiAgICAgICAgICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkpLFxuICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCAtIHBsYXRmb3JtVGhpY2tuZXNzKSkpLFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgc3RhaXJTaGFwZS50ZW1wTGluZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMsXG4gICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMubWFwKHNlZyA9PiBbc2VnWzBdICsgNCwgc2VnWzFdICsgNF0pLFxuICAgICAgICAgICAgICAgICAgICBbMCwgNF0sIFsxLCA1XSwgWzIsIDZdLCBbMywgN10sXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgoYW5nbGUgPCBNYXRoLlBJICYmIGFuZ2xlID49IChNYXRoLlBJIC8gMiAtIGNvcm5lckRpcmVjdGlvbkFuZ2xlKSkgfHwgKG1vZGVsRWRpdGluZyAmJiB3aXRoT2Zmc2V0ICYmIG9mZnNldFdpZHRoIDwgMCkpIHtcbiAgICAgICAgICAgIHNlZ21lbnQuY29tcG9uZW50RGlyZWN0aW9uVHlwZSA9IENvbXBvbmVudERpcmVjdGlvblR5cGUuUmlnaHQ7XG4gICAgICAgICAgICBwYXJhbS5wbGF0Zm9ybUxlbmd0aCA9IGZyb250TGVuZ3RoO1xuICAgICAgICAgICAgY29uc3QgcmlnaHRMZW5ndGggPSB3aXRoT2Zmc2V0ICYmIG1vZGVsRWRpdGluZyA/ICgtb2Zmc2V0V2lkdGggKyBzdGFydFdpZHRoIC8gMikgOiAtY3VyRGlyLmRvdChwcmV2TGVmdERpcik7XG4gICAgICAgICAgICBjb25zdCBmcm9udEVuZDEgPSBzZWdtZW50LnN0YXJ0LmFkZGVkKHByZXZEaXJOb3JtYWxpemVkLm11bHRpcGxpZWQoZnJvbnRMZW5ndGgpKTtcbiAgICAgICAgICAgIHNlZ21lbnQuZW5kID0gZnJvbnRFbmQxO1xuICAgICAgICAgICAgaWYgKHJpZ2h0TGVuZ3RoID4gc3RhcnRXaWR0aCAvIDIpIHtcbiAgICAgICAgICAgICAgICBwYXJhbS53aXRoT2Zmc2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBwYXJhbS5vZmZzZXRXaWR0aCA9IC0ocmlnaHRMZW5ndGggLSBzdGFydFdpZHRoIC8gMik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB2YWxpZFJpZ2h0TGVuZ3RoID0gTWF0aC5tYXgoc3RhcnRXaWR0aCAvIDIsIHJpZ2h0TGVuZ3RoKTtcbiAgICAgICAgICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtcbiAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSksXG4gICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZCgtdmFsaWRSaWdodExlbmd0aCkpLFxuICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLXZhbGlkUmlnaHRMZW5ndGgpKSxcbiAgICAgICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSksXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtbMCwgMV0sIFsxLCAyXSwgWzIsIDNdLCBbMywgMF1dO1xuICAgICAgICAgICAgc3RhaXJTaGFwZS52ZXJ0aWNlcyA9IFsuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKSksXG4gICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0IC0gcGxhdGZvcm1UaGlja25lc3MpKSksXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgaWYgKHRlbXApIHtcbiAgICAgICAgICAgICAgICBzdGFpclNoYXBlLnRlbXBMaW5lcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcyxcbiAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcy5tYXAoc2VnID0+IFtzZWdbMF0gKyA0LCBzZWdbMV0gKyA0XSksXG4gICAgICAgICAgICAgICAgICAgIFswLCA0XSwgWzEsIDVdLCBbMiwgNl0sIFszLCA3XSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcGFyYW0ub2Zmc2V0V2lkdGggPSAwO1xuICAgICAgICAgICAgaWYgKGFuZ2xlIDw9IERpcmVjdGlvbkFuZ2xlVG9sZXJhbmNlIHx8IGFuZ2xlID49IChNYXRoLlBJICogMiAtIERpcmVjdGlvbkFuZ2xlVG9sZXJhbmNlKSkge1xuICAgICAgICAgICAgICAgIHNlZ21lbnQuY29tcG9uZW50RGlyZWN0aW9uVHlwZSA9IENvbXBvbmVudERpcmVjdGlvblR5cGUuRnJvbnQ7XG4gICAgICAgICAgICAgICAgc2VnbWVudC5lbmQgPSBzZWdtZW50LnN0YXJ0LmFkZGVkKHByZXZEaXJOb3JtYWxpemVkLm11bHRpcGxpZWQoZnJvbnRMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICBwYXJhbS5wbGF0Zm9ybUxlbmd0aCA9IGZyb250TGVuZ3RoO1xuICAgICAgICAgICAgICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgICAgICAgICBzdGFydC5hZGRlZChwcmV2TGVmdERpci5tdWx0aXBsaWVkKC1zdGFydFdpZHRoIC8gMiArIG9mZnNldFdpZHRoKSksXG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyICsgb2Zmc2V0V2lkdGgpKSxcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMikpLFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtbMCwgMV0sIFsxLCAyXSwgWzIsIDNdLCBbMywgMF1dO1xuICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudmVydGljZXMgPSBbLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0KSkpLFxuICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudmVydGljZXMubWFwKHAgPT4gcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgLSBwbGF0Zm9ybVRoaWNrbmVzcykpKSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWlyU2hhcGUudGVtcExpbmVzID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnRlbXBMaW5lcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMubWFwKHNlZyA9PiBbc2VnWzBdICsgNCwgc2VnWzFdICsgNF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgWzAsIDRdLCBbMSwgNV0sIFsyLCA2XSwgWzMsIDddLFxuICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKERpcmVjdGlvbkFuZ2xlVG9sZXJhbmNlIDwgYW5nbGUgJiYgYW5nbGUgPCAoTWF0aC5QSSAvIDIgLSBjb3JuZXJEaXJlY3Rpb25BbmdsZSkpIHtcbiAgICAgICAgICAgICAgICBzZWdtZW50LmNvbXBvbmVudERpcmVjdGlvblR5cGUgPSBDb21wb25lbnREaXJlY3Rpb25UeXBlLlJpZ2h0RnJvbnQ7XG4gICAgICAgICAgICAgICAgcGFyYW0ucGxhdGZvcm1MZW5ndGggPSBzZWdtZW50LmVuZC5kaXN0YW5jZVRvKHNlZ21lbnQuc3RhcnQpO1xuICAgICAgICAgICAgICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgLi4ubGVmdENvbm5lY3RQb2ludHMsXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0LmFkZGVkKHByZXZMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyIC8gTWF0aC5jb3MoYW5nbGUpKSksXG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSksXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICBjb25zdCBtb2xkVmVydGV4Q291bnQgPSBtb2xkU2hhcGUudmVydGljZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIG1vbGRTaGFwZS50ZW1wTGluZXMgPSBnZW5lcmF0ZVRlbXBMaW5lc0xvb3AobW9sZFZlcnRleENvdW50KTtcbiAgICAgICAgICAgICAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gWy4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCkpKSxcbiAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0IC0gcGxhdGZvcm1UaGlja25lc3MpKSksXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgICAgICBzdGFpclNoYXBlLnRlbXBMaW5lcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLm1hcChzZWcgPT4gW3NlZ1swXSArIG1vbGRWZXJ0ZXhDb3VudCwgc2VnWzFdICsgbW9sZFZlcnRleENvdW50XSksXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLm1hcChzZWcgPT4gW3NlZ1swXSwgc2VnWzBdICsgbW9sZFZlcnRleENvdW50XSksXG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYW5nbGUgPiAoTWF0aC5QSSAqIDMgLyAyICsgY29ybmVyRGlyZWN0aW9uQW5nbGUpICYmIGFuZ2xlIDwgKE1hdGguUEkgKiAyIC0gRGlyZWN0aW9uQW5nbGVUb2xlcmFuY2UpKSB7XG4gICAgICAgICAgICAgICAgc2VnbWVudC5jb21wb25lbnREaXJlY3Rpb25UeXBlID0gQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5MZWZ0RnJvbnQ7XG4gICAgICAgICAgICAgICAgcGFyYW0ucGxhdGZvcm1MZW5ndGggPSBzZWdtZW50LmVuZC5kaXN0YW5jZVRvKHNlZ21lbnQuc3RhcnQpO1xuICAgICAgICAgICAgICAgIG1vbGRTaGFwZS52ZXJ0aWNlcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQuYWRkZWQocHJldkxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMiAvIE1hdGguY29zKGFuZ2xlKSkpLFxuICAgICAgICAgICAgICAgICAgICAuLi5yaWdodENvbm5lY3RQb2ludHMsXG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnQuZW5kLmFkZGVkKGN1ckxlZnREaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5lbmQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSksXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICBjb25zdCBtb2xkVmVydGV4Q291bnQgPSBtb2xkU2hhcGUudmVydGljZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIG1vbGRTaGFwZS50ZW1wTGluZXMgPSBnZW5lcmF0ZVRlbXBMaW5lc0xvb3AobW9sZFZlcnRleENvdW50KTtcbiAgICAgICAgICAgICAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gWy4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCkpKSxcbiAgICAgICAgICAgICAgICAgICAgLi4ubW9sZFNoYXBlLnZlcnRpY2VzLm1hcChwID0+IHAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0IC0gcGxhdGZvcm1UaGlja25lc3MpKSksXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICBpZiAodGVtcCkge1xuICAgICAgICAgICAgICAgICAgICBzdGFpclNoYXBlLnRlbXBMaW5lcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLm1hcChzZWcgPT4gW3NlZ1swXSArIG1vbGRWZXJ0ZXhDb3VudCwgc2VnWzFdICsgbW9sZFZlcnRleENvdW50XSksXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLm1hcChzZWcgPT4gW3NlZ1swXSwgc2VnWzBdICsgbW9sZFZlcnRleENvdW50XSksXG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHBhcmFtLnBsYXRmb3JtTGVuZ3RoID0gc2VnbWVudC5lbmQuZGlzdGFuY2VUbyhzZWdtZW50LnN0YXJ0KTtcbiAgICAgICAgbW9sZFNoYXBlLnZlcnRpY2VzID0gW1xuICAgICAgICAgICAgc3RhcnQuYWRkZWQoY3VyTGVmdERpci5tdWx0aXBsaWVkKHN0YXJ0V2lkdGggLyAyKSksXG4gICAgICAgICAgICBzdGFydC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSksXG4gICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoLXN0YXJ0V2lkdGggLyAyKSksXG4gICAgICAgICAgICBzZWdtZW50LmVuZC5hZGRlZChjdXJMZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKSxcbiAgICAgICAgXTtcbiAgICAgICAgbW9sZFNoYXBlLnRlbXBMaW5lcyA9IFtbMCwgMV0sIFsxLCAyXSwgWzIsIDNdLCBbMywgMF1dO1xuICAgICAgICBzdGFpclNoYXBlLnZlcnRpY2VzID0gWy4uLm1vbGRTaGFwZS52ZXJ0aWNlcyxcbiAgICAgICAgICAgIC4uLm1vbGRTaGFwZS52ZXJ0aWNlcy5tYXAocCA9PiBwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCgtcGxhdGZvcm1UaGlja25lc3MpKSksXG4gICAgICAgIF07XG4gICAgICAgIGlmICh0ZW1wKSB7XG4gICAgICAgICAgICBzdGFpclNoYXBlLnRlbXBMaW5lcyA9IFtcbiAgICAgICAgICAgICAgICAuLi5tb2xkU2hhcGUudGVtcExpbmVzLFxuICAgICAgICAgICAgICAgIC4uLm1vbGRTaGFwZS50ZW1wTGluZXMubWFwKHNlZyA9PiBbc2VnWzBdICsgNCwgc2VnWzFdICsgNF0pLFxuICAgICAgICAgICAgICAgIFswLCA0XSwgWzEsIDVdLCBbMiwgNl0sIFszLCA3XSxcbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICB9XG59XG5jb25zdCBDb2x1bW5TdGVwVG9sZXJhbmNlID0gMSAvIDU7XG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVIYW5kcmFpbFNoYXBlKHN0YWlyUGFyYW0sIHNlZ21lbnRzKSB7XG4gICAgY29uc3QgeyBoYW5kcmFpbDogeyBzdXBwb3J0LCBoZWlnaHQsIGNvbHVtbjogeyBzdGVwIH0gfSB9ID0gc3RhaXJQYXJhbTtcbiAgICBpZiAoc2VnbWVudHMubGVuZ3RoICYmIHN1cHBvcnQpIHtcbiAgICAgICAgY29uc3QgaGFuZHJhaWxzID0gW107XG4gICAgICAgIGNvbnN0IHVuVmlzaXRlZCA9IG5ldyBTZXQoc2VnbWVudHMpO1xuICAgICAgICBjb25zdCB2aXNpdGVkID0gbmV3IE1hcCgpO1xuICAgICAgICBmb3IgKGNvbnN0IHNlZ21lbnQgb2Ygc2VnbWVudHMpIHtcbiAgICAgICAgICAgIGlmICghc2VnbWVudC5tb2xkU2hhcGUudGVtcExpbmVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2aXNpdGVkLnNldChzZWdtZW50LnBhcmFtLmluZGV4LCB7IGxlZnQ6IGZhbHNlLCByaWdodDogZmFsc2UsIGxpbmUzZEluZGV4ZXM6IG5ldyBTZXQoKSB9KTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY3VycmVudCA9IFt7XG4gICAgICAgICAgICAgICAgc2VnbWVudDogc2VnbWVudHNbMF0sXG4gICAgICAgICAgICAgICAgbGluZTNkSW5kOiBnZXRTZWdtZW50U3RhcnRBbmRCYXNlTGluZTNkKHNlZ21lbnRzWzBdLCBzZWdtZW50cykuc3RhcnRMaW5lLmxpbmUzZEluZCxcbiAgICAgICAgICAgICAgICBsZWZ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdGFydDogdHJ1ZSxcbiAgICAgICAgICAgIH1dO1xuICAgICAgICBsZXQgaGFuZHJhaWwgPSB7IHJhaWw6IFtdLCBjb2x1bW5zOiBbXSB9O1xuICAgICAgICBjb25zdCBzdGVwVG9sZXJhbmNlID0gc3RlcCAqIENvbHVtblN0ZXBUb2xlcmFuY2U7XG4gICAgICAgIHdoaWxlIChjdXJyZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IG5leHQgPSBbXTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgeyBzZWdtZW50OiBjdXJyZW50U2VnbWVudCwgbGluZTNkSW5kLCBzdGFydFBvaW50LCBsZWZ0IH0gb2YgY3VycmVudCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgcGFyYW06IHsgaW5kZXgsIHR5cGUsIHN0YXJ0V2lkdGgsIGVuZFdpZHRoLCBob3Jpem9udGFsU3RlcCwgdmVydGljYWxTdGVwLCB1cHdhcmQgfSwgc3RhcnQsIGVuZCwgc3RhcnRIZWlnaHQsIGVuZEhlaWdodCwgbW9sZFNoYXBlOiB7IHZlcnRpY2VzOiBtb2xkVmVydGljZXMsIHRlbXBMaW5lczogbW9sZFRlbXBMaW5lcywgc3RlcENvdW50IH0sIG5leHRDb21wb25lbnRzLCBiYXNlQ29tcG9uZW50LCBjaXJjbGVUYW5nZW50LCBzdGFydExvY2tlZCwgY29tcG9uZW50RGlyZWN0aW9uVHlwZSwgfSA9IGN1cnJlbnRTZWdtZW50O1xuICAgICAgICAgICAgICAgIHVuVmlzaXRlZC5kZWxldGUoY3VycmVudFNlZ21lbnQpO1xuICAgICAgICAgICAgICAgIGlmICghc3RhcnRMb2NrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHN0ZXBIZWlnaHQgPSB1cHdhcmQgPyB2ZXJ0aWNhbFN0ZXAgOiAtdmVydGljYWxTdGVwO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9mZnNldExlbmd0aCA9IE1hdGgubWluKEhhbmRyYWlsRGVmYXVsdE9mZnNldExlbmd0aCwgaG9yaXpvbnRhbFN0ZXAgLyA0KTtcbiAgICAgICAgICAgICAgICBjb25zdCBiYXNlU2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHNlZ21lbnRzLCBiYXNlQ29tcG9uZW50ID09PSBudWxsIHx8IGJhc2VDb21wb25lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJhc2VDb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgc3RhcnRMaW5lOiB7IGxpbmUzZEluZDogc3RhcnRMaW5lM2RJbmQgfSwgYmFzZUxpbmU6IHsgZGlyOiBiYXNlTGluZTNkRGlyLCBlbmRXaXRoT2Zmc2V0OiBiYXNlTGluZTNkRW5kV2l0aE9mZnNldCB9LCB9ID0gZ2V0U2VnbWVudFN0YXJ0QW5kQmFzZUxpbmUzZChjdXJyZW50U2VnbWVudCwgc2VnbWVudHMsIGJhc2VTZWdtZW50LCBvZmZzZXRMZW5ndGgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0VG9FbmREaXIgPSBlbmQuc3VidHJhY3RlZChzdGFydCkubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgIGxldCBmcm9udERpciA9IGNpcmNsZVRhbmdlbnQgPyBjaXJjbGVUYW5nZW50IDogc3RhcnRUb0VuZERpcjtcbiAgICAgICAgICAgICAgICBjb25zdCBhbmdsZSA9IGZyb250RGlyLmFuZ2xlKGJhc2VMaW5lM2REaXIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRlbHRhQW5nbGUgPSBNYXRoLmFicyhhbmdsZSAtIE1hdGguUEkgLyAyKTtcbiAgICAgICAgICAgICAgICBpZiAoZGVsdGFBbmdsZSA8PSBEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSkge1xuICAgICAgICAgICAgICAgICAgICBmcm9udERpciA9IGJhc2VMaW5lM2REaXIuY3Jvc3MoRGlyZWN0aW9uWikubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgbGVmdERpciA9IERpcmVjdGlvblouY3Jvc3MoZnJvbnREaXIpO1xuICAgICAgICAgICAgICAgIGxldCBzcCA9IHN0YXJ0LmFkZGVkKGxlZnREaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMiAqIChsZWZ0ID8gMSA6IC0xKSkpO1xuICAgICAgICAgICAgICAgIGxldCBlcCA9IGVuZC5hZGRlZChsZWZ0RGlyLm11bHRpcGxpZWQoZW5kV2lkdGggLyAyICogKGxlZnQgPyAxIDogLTEpKSk7XG4gICAgICAgICAgICAgICAgbGV0IGxhc3RMZW5ndGggPSBzcC5kaXN0YW5jZVRvKGVwKTtcbiAgICAgICAgICAgICAgICBsZXQgc3BUb0VwRGlyID0gZXAuc3VidHJhY3RlZChzcCkubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgIGxldCBuZXh0U3RhcnRQb2ludCA9IGxlZnQgPyBzcCA6IGVwO1xuICAgICAgICAgICAgICAgIGxldCBwdXNoRW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5lM2REaXIgPSBtb2xkVmVydGljZXNbbW9sZFRlbXBMaW5lc1tsaW5lM2RJbmRdWzFdXS5zdWJ0cmFjdGVkKG1vbGRWZXJ0aWNlc1ttb2xkVGVtcExpbmVzW2xpbmUzZEluZF1bMF1dKS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgbGV0IG9mZnNldERpciA9IERpcmVjdGlvblouY3Jvc3MobGluZTNkRGlyKTtcbiAgICAgICAgICAgICAgICBjb25zdCB2aXNpdGVkUmVjb3JkID0gdmlzaXRlZC5nZXQoaW5kZXgpO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpbmUzZCA9IG1vbGRUZW1wTGluZXNbbGluZTNkSW5kXTtcbiAgICAgICAgICAgICAgICAgICAgc3AgPSBzdGFydFBvaW50IHx8IG1vbGRWZXJ0aWNlc1tsaW5lM2RbMF1dO1xuICAgICAgICAgICAgICAgICAgICBlcCA9IG1vbGRWZXJ0aWNlc1tsaW5lM2RbMV1dO1xuICAgICAgICAgICAgICAgICAgICBsYXN0TGVuZ3RoID0gc3AuZGlzdGFuY2VUbyhlcCk7XG4gICAgICAgICAgICAgICAgICAgIHNwVG9FcERpciA9IGVwLnN1YnRyYWN0ZWQoc3ApLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dExpbmUzZEluZCA9IChsaW5lM2RJbmQgKyAxKSAlIG1vbGRUZW1wTGluZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2aXNpdGVkTGluZTNkSW5kZXhlcyA9IHZpc2l0ZWRSZWNvcmQgPT09IG51bGwgfHwgdmlzaXRlZFJlY29yZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmlzaXRlZFJlY29yZC5saW5lM2RJbmRleGVzO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpc0VudHJhbmNlID0gKHZpc2l0ZWRMaW5lM2RJbmRleGVzID09PSBudWxsIHx8IHZpc2l0ZWRMaW5lM2RJbmRleGVzID09PSB2b2lkIDAgPyB2b2lkIDAgOiB2aXNpdGVkTGluZTNkSW5kZXhlcy5oYXMobGluZTNkSW5kKSkgJiYgKHZpc2l0ZWRMaW5lM2RJbmRleGVzID09PSBudWxsIHx8IHZpc2l0ZWRMaW5lM2RJbmRleGVzID09PSB2b2lkIDAgPyB2b2lkIDAgOiB2aXNpdGVkTGluZTNkSW5kZXhlcy5oYXMobmV4dExpbmUzZEluZCkpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBoYXNFbnRyYW5jZVNlZ21lbnQgPSBsaW5lM2RJbmQgPT09IHN0YXJ0TGluZTNkSW5kO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmVhcmVzdFNlZ21lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbmV4dFNlZ21lbnRJbmRleCBvZiBuZXh0Q29tcG9uZW50c1tsaW5lM2RJbmRdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0U2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHNlZ21lbnRzLCBuZXh0U2VnbWVudEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0U2VnbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgc3RhcnQgfSA9IG5leHRTZWdtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRzID0gc3RhcnQuZGlzdGFuY2VUbyhzcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGUgPSBzdGFydC5kaXN0YW5jZVRvKGVwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2aXNpdE5leHRSZWNvcmQgPSB2aXNpdGVkLmdldChuZXh0U2VnbWVudC5wYXJhbS5pbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dENvbXBvbmVudFN0YXJ0TGluZTNkSW5kID0gZ2V0U2VnbWVudFN0YXJ0QW5kQmFzZUxpbmUzZChuZXh0U2VnbWVudCwgc2VnbWVudHMsIHVuZGVmaW5lZCwgb2Zmc2V0TGVuZ3RoKS5zdGFydExpbmUubGluZTNkSW5kO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0VxdWFsKGRzICsgZGUsIGxhc3RMZW5ndGgpICYmICEodmlzaXROZXh0UmVjb3JkID09PSBudWxsIHx8IHZpc2l0TmV4dFJlY29yZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmlzaXROZXh0UmVjb3JkLnJpZ2h0KSAmJiAhKHZpc2l0TmV4dFJlY29yZCA9PT0gbnVsbCB8fCB2aXNpdE5leHRSZWNvcmQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZpc2l0TmV4dFJlY29yZC5saW5lM2RJbmRleGVzLmhhcyhuZXh0Q29tcG9uZW50U3RhcnRMaW5lM2RJbmQpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5lYXJlc3RTZWdtZW50IHx8IG5lYXJlc3RTZWdtZW50LmRpc3RhbmNlID4gZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lYXJlc3RTZWdtZW50ID0geyBzZWdtZW50OiBuZXh0U2VnbWVudCwgZGlzdGFuY2U6IGRzIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlyc3RCb3R0b21QdCA9IHNwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCkpLmFkZGVkKG9mZnNldERpci5tdWx0aXBsaWVkKG9mZnNldExlbmd0aCkpLmFkZGVkKGxpbmUzZERpci5tdWx0aXBsaWVkKHN0YXJ0UG9pbnQgPyAwIDogb2Zmc2V0TGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBsYXN0RGlzdGFuY2UgPSBNYXRoLm1heChsYXN0TGVuZ3RoIC0gb2Zmc2V0TGVuZ3RoLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5lYXJlc3RTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGVuZE9uQmFzZUxpbmVXaXRoT2Zmc2V0IH0gPSBnZXRTZWdtZW50U3RhcnRBbmRCYXNlTGluZTNkKG5lYXJlc3RTZWdtZW50LnNlZ21lbnQsIHNlZ21lbnRzLCB1bmRlZmluZWQsIG9mZnNldExlbmd0aCkuc3RhcnRMaW5lO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXAgPSBlbmRPbkJhc2VMaW5lV2l0aE9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwVG9FcERpciA9IGVwLnN1YnRyYWN0ZWQoc3ApLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcFRvRXBEaXIuZG90KGxpbmUzZERpcikgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3REaXN0YW5jZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaEVuZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTdGFydFBvaW50ID0gc3AuYWRkZWQobGluZTNkRGlyLm11bHRpcGxpZWQob2Zmc2V0TGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0RGlzdGFuY2UgPSBzcC5kaXN0YW5jZVRvKGVwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U3RhcnRQb2ludCA9IGlzUGxhdGZvcm0obmVhcmVzdFNlZ21lbnQuc2VnbWVudCkgPyBlcCA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpc0VudHJhbmNlICYmIGhhc0VudHJhbmNlU2VnbWVudCAmJiBiYXNlU2VnbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIC8vIGRvbid0IGNhcmUgYmVjYXVzZSBuZXh0IGlzIHBsYXRmb3JtIChuZXh0IHdpbGwgZGVhbCB0aGUgY2FzZSkgb3Igc3RhaXIgKG9ubHkgaGF2ZSBvbmUgbmV4dENvbXBvbmVudCB3aGljaCBpcyBjdXJyZW50U2VnbWVudClcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIChiYXNlU2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtICYmIG5leHRTaWJsaW5nU2VnbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXAgPSBiYXNlTGluZTNkRW5kV2l0aE9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwVG9FcERpciA9IGVwLnN1YnRyYWN0ZWQoc3ApLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcFRvRXBEaXIuZG90KGJhc2VMaW5lM2REaXIpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0RGlzdGFuY2UgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hFbmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0Q29ybmVyRGlzdGFuY2UgPSBlcC5kaXN0YW5jZVRvKHNwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dENvcm5lckRpc3RhbmNlID4gb2Zmc2V0TGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTdGFydFBvaW50ID0gc3AuYWRkZWQobGluZTNkRGlyLm11bHRpcGxpZWQob2Zmc2V0TGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U3RhcnRQb2ludCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0RGlzdGFuY2UgPSBzcC5kaXN0YW5jZVRvKGVwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U3RhcnRQb2ludCA9IGlzUGxhdGZvcm0oYmFzZVNlZ21lbnQpID8gZXAgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNFbnRyYW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdERpc3RhbmNlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hFbmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hFbmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHB1c2hFbmQgPSBsaW5lM2RJbmQgPT09IG1vbGRUZW1wTGluZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAobGFzdERpc3RhbmNlID4gMCB8fCAobGFzdERpc3RhbmNlID09PSAwICYmICFzdGFydFBvaW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHVzaCByYWlsXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5yYWlsLnB1c2goZmlyc3RCb3R0b21QdC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIHB1c2ggY29sdW1uc1xuICAgICAgICAgICAgICAgICAgICBpZiAobGFzdERpc3RhbmNlID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBEaXN0YW5jZSA9IG9mZnNldExlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0ZW1wRGlzdGFuY2UgPD0gbGFzdERpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNFbmQgPSB0ZW1wRGlzdGFuY2UgPT09IGxhc3REaXN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBib3R0b21Qb2ludCA9IHRlbXBEaXN0YW5jZSA+IDAgPyBzcC5hZGRlZChzcFRvRXBEaXIubXVsdGlwbGllZCh0ZW1wRGlzdGFuY2UpKS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQpKS5hZGRlZChvZmZzZXREaXIubXVsdGlwbGllZChvZmZzZXRMZW5ndGgpKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0Qm90dG9tUHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWwuY29sdW1ucy5wdXNoKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tUG9pbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbVBvaW50LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNFbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWwucmFpbC5wdXNoKGJvdHRvbVBvaW50LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlbHRhRGlzdGFuY2UgPSAobGFzdERpc3RhbmNlIC0gdGVtcERpc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRGlzdGFuY2UgKz0gKGRlbHRhRGlzdGFuY2UgPD0gKHN0ZXAgKyBzdGVwVG9sZXJhbmNlKSAmJiBkZWx0YURpc3RhbmNlID49IHN0ZXBUb2xlcmFuY2UpID8gKHB1c2hFbmQgPyBkZWx0YURpc3RhbmNlIDogSW5maW5pdHkpIDogc3RlcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAobmVhcmVzdFNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudDogbmVhcmVzdFNlZ21lbnQuc2VnbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lM2RJbmQ6IGdldFNlZ21lbnRTdGFydEFuZEJhc2VMaW5lM2QobmVhcmVzdFNlZ21lbnQuc2VnbWVudCwgc2VnbWVudHMsIHVuZGVmaW5lZCwgb2Zmc2V0TGVuZ3RoKS5zdGFydExpbmUubGluZTNkSW5kLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFBvaW50OiBuZXh0U3RhcnRQb2ludCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRW50cmFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmFzZVNlZ21lbnQgJiYgaGFzRW50cmFuY2VTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAvLyBuZXZlciBoYXBwZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKG5leHRTaWJsaW5nU2VnbWVudCAmJiBiYXNlU2VnbWVudC5wYXJhbS50eXBlICE9PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50OiBiYXNlU2VnbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUzZEluZDogYmFzZVNlZ21lbnQucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSA/IChiYXNlQ29tcG9uZW50ID09PSBudWxsIHx8IGJhc2VDb21wb25lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJhc2VDb21wb25lbnQubGluZTNkSW5kZXgpIHx8IDAgOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0UG9pbnQ6IG5leHRTdGFydFBvaW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVuZCBvZiB0aGlzIHBhdGNoLCB0aGUgcGF0Y2ggYXJlIHN0YXJ0IHdpdGggcGxhdGZvcm1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWxzLnB1c2goaGFuZHJhaWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbCA9IHsgcmFpbDogW10sIGNvbHVtbnM6IFtdIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZW5kIG9mIHRoaXMgbGluZTNkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudDogY3VycmVudFNlZ21lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUzZEluZDogbmV4dExpbmUzZEluZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZpc2l0ZWRMaW5lM2RJbmRleGVzID09PSBudWxsIHx8IHZpc2l0ZWRMaW5lM2RJbmRleGVzID09PSB2b2lkIDAgPyB2b2lkIDAgOiB2aXNpdGVkTGluZTNkSW5kZXhlcy5hZGQobGluZTNkSW5kKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbHVtbkFjdHVhbEhlaWdodCA9IGhlaWdodCArIHZlcnRpY2FsU3RlcCAvIDI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzUmlnaHRTdGFpciA9IGNvbXBvbmVudERpcmVjdGlvblR5cGUgPT09IENvbXBvbmVudERpcmVjdGlvblR5cGUuUmlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzTGVmdFN0YWlyID0gY29tcG9uZW50RGlyZWN0aW9uVHlwZSA9PT0gQ29tcG9uZW50RGlyZWN0aW9uVHlwZS5MZWZ0O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFpclJhaWwgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhaXJDb2x1bW5zID0gW107XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvcm5lckJhc2VEaXIgPSAoIWxlZnQgJiYgaXNSaWdodFN0YWlyKSB8fCAobGVmdCAmJiBpc0xlZnRTdGFpcikgPyBsZWZ0RGlyIDogYmFzZUxpbmUzZERpcjtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvcm5lclN0YXJ0SGVpZ2h0ID0gbGVmdCA/IGVuZEhlaWdodCA6IHN0YXJ0SGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29ybmVyU2lkZVdpZHRoID0gbGVmdCA/IGVuZFdpZHRoIDogc3RhcnRXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNpZGVDb3JuZXJTdGFydCA9IGxlZnQgPyBlbmQgOiBzdGFydDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvcm5lckVuZCA9IHNpZGVDb3JuZXJTdGFydC5hZGRlZChjb3JuZXJCYXNlRGlyLm11bHRpcGxpZWQoKGNvcm5lclNpZGVXaWR0aCAvIDIgKyBvZmZzZXRMZW5ndGgpICogKGxlZnQgPyAxIDogLTEpKSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb3JuZXJEaXN0YW5jZSA9IChzdGFydFBvaW50IHx8IHNwKS5kaXN0YW5jZVRvKGNvcm5lckVuZCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGFsb25nIGNvcm5lckJhc2VEaXJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvcm5lclNwVG9FcERpciA9IGNvcm5lckVuZC5zdWJ0cmFjdGVkKHN0YXJ0UG9pbnQgfHwgc3ApLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvcm5lck9mZnNldERpciA9IERpcmVjdGlvblouY3Jvc3MoY29ybmVyU3BUb0VwRGlyKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvcm5lckFkZGl0aW9uYWxIZWlnaHQgPSAhbGVmdCAmJiAhaXNMZWZ0U3RhaXIgJiYgdXB3YXJkID8gc3RlcEhlaWdodCA6IDA7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRDb3JuZXJSYWlsID0gW107XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRDb3JuZXJDb2x1bW5zID0gW107XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGFydFBvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEhlYWREaXN0YW5jZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkQ29ybmVyUmFpbC5wdXNoKHN0YXJ0UG9pbnQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGNvcm5lclN0YXJ0SGVpZ2h0ICsgY29ybmVyQWRkaXRpb25hbEhlaWdodCArIGhlaWdodCkpLmFkZGVkKGNvcm5lck9mZnNldERpci5tdWx0aXBsaWVkKG9mZnNldExlbmd0aCkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0ZW1wSGVhZERpc3RhbmNlIDwgY29ybmVyRGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBib3R0b21Qb2ludCA9IHN0YXJ0UG9pbnQuYWRkZWQoY29ybmVyU3BUb0VwRGlyLm11bHRpcGxpZWQodGVtcEhlYWREaXN0YW5jZSkpLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChjb3JuZXJTdGFydEhlaWdodCArIGNvcm5lckFkZGl0aW9uYWxIZWlnaHQpKS5hZGRlZChjb3JuZXJPZmZzZXREaXIubXVsdGlwbGllZChvZmZzZXRMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkQ29ybmVyQ29sdW1ucy5wdXNoKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tUG9pbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbVBvaW50LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wSGVhZERpc3RhbmNlICs9IHN0ZXA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWxlZnQgJiYgaXNMZWZ0U3RhaXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0Qm90dG9tUG9pbnQgPSBjb3JuZXJFbmQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGNvcm5lclN0YXJ0SGVpZ2h0ICsgY29ybmVyQWRkaXRpb25hbEhlaWdodCkpLmFkZGVkKGNvcm5lck9mZnNldERpci5tdWx0aXBsaWVkKG9mZnNldExlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHB1c2ggcmFpbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRDb3JuZXJSYWlsLnB1c2gobGFzdEJvdHRvbVBvaW50LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChjb3JuZXJEaXN0YW5jZSAtIHRlbXBIZWFkRGlzdGFuY2UgKyBzdGVwKSA+IHN0ZXBUb2xlcmFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZENvcm5lckNvbHVtbnMucHVzaChbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0Qm90dG9tUG9pbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0Qm90dG9tUG9pbnQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbmV4dFN0YXJ0UG9pbnQgPSBsZWZ0ID8gc3AuYWRkZWQobGluZTNkRGlyLm11bHRpcGxpZWQob2Zmc2V0TGVuZ3RoKSkgOiBlcC5hZGRlZChsaW5lM2REaXIubXVsdGlwbGllZCgtb2Zmc2V0TGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIG5leHQgc2VnbWVudCBzdGFydFdpZHRoICE9PSBjdXJyZW50U2VnbWVudCBlbmRXaWR0aFxuICAgICAgICAgICAgICAgICAgICBwdXNoRW5kID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlYXNvbmFibGVTdGVwQ291bnQgPSBNYXRoLmNlaWwoc3RlcCAvIGhvcml6b250YWxTdGVwKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBTdGVwQ291bnQgPSAwO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhcmNDaG9yZEFuZ2xlID0gY2lyY2xlVGFuZ2VudCA/IHN0YXJ0VG9FbmREaXIuYW5nbGUoY2lyY2xlVGFuZ2VudCkgOiAwO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFydEZyb250T2Zmc2V0TGVuZ3RoID0gTWF0aC5taW4oaG9yaXpvbnRhbFN0ZXAgLyAyLCBvZmZzZXRMZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcmV2VG90YWxTdGVwTGVuZ3RoID0gKHN0ZXBDb3VudCAtIDEpICogaG9yaXpvbnRhbFN0ZXA7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByZXZUb3RhbFZlclN0ZXBMZW5ndGggPSAoc3RlcENvdW50IC0gMSkgKiBzdGVwSGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0b3RhbExlbmd0aCA9IE1hdGguYWJzKGVuZC5zdWJ0cmFjdGVkKHN0YXJ0KS5kb3QoZnJvbnREaXIpKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc3Qgc3RhcnRFbmREaXN0YW5jZSA9IHN0YXJ0LmRpc3RhbmNlVG8oZW5kKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdFN0ZXBMZW5ndGggPSB0b3RhbExlbmd0aCAtIHByZXZUb3RhbFN0ZXBMZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGxldCBsYXN0RnJvbnRPZmZzZXRMZW5ndGggPSBNYXRoLm1pbihsYXN0U3RlcExlbmd0aCAvIDIsIG9mZnNldExlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBDb21wb25lbnRUeXBlLlN0cmFpZ2h0U3RhaXIgfHwgKHR5cGUgPT09IENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpciAmJiAoYXJjQ2hvcmRBbmdsZSA8PSBEaXJlY3Rpb25BbmdsZVRvbGVyYW5jZSB8fCAhY2lyY2xlVGFuZ2VudCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBsYXN0TGVuZ3RoID0gc3AuZGlzdGFuY2VUbyhlcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWx0YVdpZHRoID0gKGVuZFdpZHRoIC0gc3RhcnRXaWR0aCkgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhcnREZWx0YVdpZHRoID0gKHN0YXJ0RnJvbnRPZmZzZXRMZW5ndGggLyB0b3RhbExlbmd0aCkgKiBkZWx0YVdpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RlcERlbHRhV2lkdGggPSBob3Jpem9udGFsU3RlcCAvIHRvdGFsTGVuZ3RoICogZGVsdGFXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHB1c2ggcmFpbFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJSYWlsLnB1c2goc3AuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0ICsgaGVpZ2h0ICsgKHVwd2FyZCA/IDEgOiAwKSAqIHN0ZXBIZWlnaHQpKS5hZGRlZChsZWZ0RGlyLm11bHRpcGxpZWQobGVmdCA/IChzdGFydERlbHRhV2lkdGggLSBvZmZzZXRMZW5ndGgpIDogKG9mZnNldExlbmd0aCAtIHN0YXJ0RGVsdGFXaWR0aCkpKS5hZGRlZChmcm9udERpci5tdWx0aXBsaWVkKHN0YXJ0RnJvbnRPZmZzZXRMZW5ndGgpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXVwd2FyZCAmJiBzdGVwQ291bnQgPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJSYWlsLnB1c2goc3AuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHN0YXJ0SGVpZ2h0ICsgaGVpZ2h0KSkuYWRkZWQoZnJvbnREaXIubXVsdGlwbGllZChob3Jpem9udGFsU3RlcCkpLmFkZGVkKGxlZnREaXIubXVsdGlwbGllZChsZWZ0ID8gKHN0ZXBEZWx0YVdpZHRoIC0gb2Zmc2V0TGVuZ3RoKSA6IChvZmZzZXRMZW5ndGggLSBzdGVwRGVsdGFXaWR0aCkpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwdXNoIGNvbHVtbnNcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0ZW1wU3RlcENvdW50IDwgc3RlcENvdW50IC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1ckhvclN0ZXBEaXN0YW5jZSA9ICh0ZW1wU3RlcENvdW50ICsgMC41KSAqIGhvcml6b250YWxTdGVwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1clZlclN0ZXBEaXN0YW5jZSA9ICh0ZW1wU3RlcENvdW50ICsgKHVwd2FyZCA/IDEgOiAwKSkgKiBzdGVwSGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjdXJDb2x1bW5BY3R1YWxIZWlnaHQgPSBjb2x1bW5BY3R1YWxIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVwd2FyZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJDb2x1bW5BY3R1YWxIZWlnaHQgPSAoY3VySG9yU3RlcERpc3RhbmNlIC0gbGFzdEZyb250T2Zmc2V0TGVuZ3RoKSAvIChwcmV2VG90YWxTdGVwTGVuZ3RoIC0gbGFzdEZyb250T2Zmc2V0TGVuZ3RoKSAqIHByZXZUb3RhbFZlclN0ZXBMZW5ndGggLSBjdXJWZXJTdGVwRGlzdGFuY2UgKyBzdGVwSGVpZ2h0ICsgaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VyQ29sdW1uQWN0dWFsSGVpZ2h0ID0gKDEgLSAoY3VySG9yU3RlcERpc3RhbmNlIC0gaG9yaXpvbnRhbFN0ZXApIC8gKHRvdGFsTGVuZ3RoIC0gaG9yaXpvbnRhbFN0ZXAgLSBsYXN0RnJvbnRPZmZzZXRMZW5ndGgpKSAqIC1wcmV2VG90YWxWZXJTdGVwTGVuZ3RoICsgKHN0ZXBDb3VudCAtIDEgLSB0ZW1wU3RlcENvdW50KSAqIHN0ZXBIZWlnaHQgKyBoZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1clN0ZXBEZWx0YVdpZHRoID0gKHRlbXBTdGVwQ291bnQgKyAwLjUpICogc3RlcERlbHRhV2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYm90dG9tUG9pbnQgPSBzcC5hZGRlZChmcm9udERpci5tdWx0aXBsaWVkKGN1ckhvclN0ZXBEaXN0YW5jZSkpLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArIGN1clZlclN0ZXBEaXN0YW5jZSkpLmFkZGVkKGxlZnREaXIubXVsdGlwbGllZChsZWZ0ID8gKGN1clN0ZXBEZWx0YVdpZHRoIC0gb2Zmc2V0TGVuZ3RoKSA6IChvZmZzZXRMZW5ndGggLSBjdXJTdGVwRGVsdGFXaWR0aCkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpckNvbHVtbnMucHVzaChbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbVBvaW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b21Qb2ludC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoIXVwd2FyZCAmJiB0ZW1wU3RlcENvdW50ID09PSAwID8gaGVpZ2h0IDogY3VyQ29sdW1uQWN0dWFsSGVpZ2h0KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcFN0ZXBDb3VudCArPSByZWFzb25hYmxlU3RlcENvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0ZXBDb3VudCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodXB3YXJkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RTdGVwRGVsdGFXaWR0aCA9IChzdGVwQ291bnQgLSAxKSAqIHN0ZXBEZWx0YVdpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpclJhaWwucHVzaChzcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBoZWlnaHQgKyAodXB3YXJkID8gc3RlcENvdW50IDogKHN0ZXBDb3VudCAtIChzdGVwQ291bnQgPiAyID8gMiA6IDEpKSkgKiBzdGVwSGVpZ2h0KSkuYWRkZWQoZnJvbnREaXIubXVsdGlwbGllZCgoc3RlcENvdW50IC0gMSkgKiBob3Jpem9udGFsU3RlcCkpLmFkZGVkKGxlZnREaXIubXVsdGlwbGllZChsZWZ0ID8gKGxhc3RTdGVwRGVsdGFXaWR0aCAtIG9mZnNldExlbmd0aCkgOiAob2Zmc2V0TGVuZ3RoIC0gbGFzdFN0ZXBEZWx0YVdpZHRoKSkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0UmFpbERlbHRhV2lkdGggPSAoMSAtIGxhc3RGcm9udE9mZnNldExlbmd0aCAvIHRvdGFsTGVuZ3RoKSAqIGRlbHRhV2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFpclJhaWwucHVzaChzcC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoc3RhcnRIZWlnaHQgKyBoZWlnaHQgKyAodXB3YXJkID8gc3RlcENvdW50IDogc3RlcENvdW50IC0gMSkgKiBzdGVwSGVpZ2h0KSkuYWRkZWQoZnJvbnREaXIubXVsdGlwbGllZCh0b3RhbExlbmd0aCAtIGxhc3RGcm9udE9mZnNldExlbmd0aCkpLmFkZGVkKGxlZnREaXIubXVsdGlwbGllZChsZWZ0ID8gKGxhc3RSYWlsRGVsdGFXaWR0aCAtIG9mZnNldExlbmd0aCkgOiAob2Zmc2V0TGVuZ3RoIC0gbGFzdFJhaWxEZWx0YVdpZHRoKSkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZW1wU3RlcENvdW50IC0gcmVhc29uYWJsZVN0ZXBDb3VudCA8PSBzdGVwQ291bnQgLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdENvbHVtbkFjdHVhbEhlaWdodCA9IChsYXN0U3RlcExlbmd0aCAvIDIgLSBsYXN0RnJvbnRPZmZzZXRMZW5ndGgpIC8gKHRvdGFsTGVuZ3RoIC0gaG9yaXpvbnRhbFN0ZXAgLSBsYXN0RnJvbnRPZmZzZXRMZW5ndGgpICogLXByZXZUb3RhbFZlclN0ZXBMZW5ndGggKyBoZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdENvbHVtbkRlbHRhV2lkdGggPSAoc3RlcENvdW50IC0gMSArIGxhc3RTdGVwTGVuZ3RoIC8gMiAvIGhvcml6b250YWxTdGVwKSAqIHN0ZXBEZWx0YVdpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RCb3R0b21Qb2ludCA9IHNwLmFkZGVkKGZyb250RGlyLm11bHRpcGxpZWQocHJldlRvdGFsU3RlcExlbmd0aCArIGxhc3RTdGVwTGVuZ3RoIC8gMikpLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChlbmRIZWlnaHQgKyAodXB3YXJkID8gMCA6IC1zdGVwSGVpZ2h0KSkpLmFkZGVkKGxlZnREaXIubXVsdGlwbGllZChsZWZ0ID8gKGxhc3RDb2x1bW5EZWx0YVdpZHRoIC0gb2Zmc2V0TGVuZ3RoKSA6IChvZmZzZXRMZW5ndGggLSBsYXN0Q29sdW1uRGVsdGFXaWR0aCkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpckNvbHVtbnMucHVzaChbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RCb3R0b21Qb2ludCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdEJvdHRvbVBvaW50LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZCh1cHdhcmQgPyBoZWlnaHQgOiBsYXN0Q29sdW1uQWN0dWFsSGVpZ2h0KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXh0IHNlZ21lbnQgc3RhcnRXaWR0aCAhPT0gY3VycmVudFNlZ21lbnQgZW5kV2lkdGhcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwID0gbGVmdCA/IHN0YXJ0LmFkZGVkKGJhc2VMaW5lM2REaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMiAtIG9mZnNldExlbmd0aCkpIDogZW5kLmFkZGVkKGxlZnREaXIubXVsdGlwbGllZCgtZW5kV2lkdGggLyAyICsgb2Zmc2V0TGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY2lyY2xlVGFuZ2VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyB0YW5nZW50TGVmdERpciwgaXNMZWZ0QXJjLCBzdGVwQ291bnQsIGNpcmNsZUNlbnRlciwgcmFkaXVzLCBob3Jpem9udGFsU3RlcEFuZ2xlLCBjaXJjbGVOb3JtYWwsIGFyY0FuZ2xlLCBsYXN0SG9yaXpvbnRhbEFuZ2xlLCB2YWxpZCB9ID0gY2FsY3VsYXRlQ2lyY3VsYXJTdGFpcihjdXJyZW50U2VnbWVudCwgY2lyY2xlVGFuZ2VudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFydFJhZGl1c0RpciA9IGlzTGVmdEFyYyA/IHRhbmdlbnRMZWZ0RGlyLnJldmVyc2VkKCkgOiB0YW5nZW50TGVmdERpcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1c2VkU3RlcENvdW50ID0gbGFzdEhvcml6b250YWxBbmdsZSA+PSBBbmdsZVRvbGVyYW5jZSB8fCBsYXN0SG9yaXpvbnRhbEFuZ2xlID09PSAwID8gc3RlcENvdW50IDogc3RlcENvdW50IC0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVzZWRMYXN0SG9yaXpvbnRhbEFuZ2xlID0gbGFzdEhvcml6b250YWxBbmdsZSA+PSBBbmdsZVRvbGVyYW5jZSB8fCBsYXN0SG9yaXpvbnRhbEFuZ2xlID09PSAwID8gbGFzdEhvcml6b250YWxBbmdsZSA6IGhvcml6b250YWxTdGVwQW5nbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwdXNoIGNvbHVtbnNcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0ZW1wU3RlcENvdW50IDwgdXNlZFN0ZXBDb3VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1clJvdGF0ZUFuZ2xlID0gaG9yaXpvbnRhbFN0ZXBBbmdsZSAqIHRlbXBTdGVwQ291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dFJvdGF0ZUFuZ2xlID0gaG9yaXpvbnRhbFN0ZXBBbmdsZSAqIHRlbXBTdGVwQ291bnQgKyAodGVtcFN0ZXBDb3VudCA9PT0gdXNlZFN0ZXBDb3VudCAtIDEgPyB1c2VkTGFzdEhvcml6b250YWxBbmdsZSA6IGhvcml6b250YWxTdGVwQW5nbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1clJvdGF0ZU1hdHJpeCA9IEdlb21MaWIuY3JlYXRlUm90YXRlTWF0cml4NChob3Jpem9udGFsU3RlcEFuZ2xlICogdGVtcFN0ZXBDb3VudCwgY2lyY2xlTm9ybWFsLCBkdW1teVBvaW50M2QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRSb3RhdGVNYXRyaXggPSBHZW9tTGliLmNyZWF0ZVJvdGF0ZU1hdHJpeDQobmV4dFJvdGF0ZUFuZ2xlLCBjaXJjbGVOb3JtYWwsIGR1bW15UG9pbnQzZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyUmFkaXVzRGlyID0gc3RhcnRSYWRpdXNEaXIuYXBwbGllZE1hdHJpeDQoY3VyUm90YXRlTWF0cml4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0UmFkaXVzRGlyID0gc3RhcnRSYWRpdXNEaXIuYXBwbGllZE1hdHJpeDQobmV4dFJvdGF0ZU1hdHJpeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VySGFsZldpZHRoID0gKHN0YXJ0V2lkdGggKyAoZW5kV2lkdGggLSBzdGFydFdpZHRoKSAqIChjdXJSb3RhdGVBbmdsZSkgLyBhcmNBbmdsZSkgLyAyICogKGlzTGVmdEFyYyA/IC0xIDogMSkgLSBvZmZzZXRMZW5ndGggKiAoaXNMZWZ0QXJjID8gLTEgOiAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0SGFsZldpZHRoID0gKHN0YXJ0V2lkdGggKyAoZW5kV2lkdGggLSBzdGFydFdpZHRoKSAqIChuZXh0Um90YXRlQW5nbGUpIC8gYXJjQW5nbGUpIC8gMiAqIChpc0xlZnRBcmMgPyAtMSA6IDEpIC0gb2Zmc2V0TGVuZ3RoICogKGlzTGVmdEFyYyA/IC0xIDogMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyTGVmdE1vbGRQdCA9IGNpcmNsZUNlbnRlci5hZGRlZChjdXJSYWRpdXNEaXIubXVsdGlwbGllZChyYWRpdXMgKyBjdXJIYWxmV2lkdGgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJSaWdodE1vbGRQdCA9IGNpcmNsZUNlbnRlci5hZGRlZChjdXJSYWRpdXNEaXIubXVsdGlwbGllZChyYWRpdXMgLSBjdXJIYWxmV2lkdGgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0TGVmdE1vbGRQdCA9IGNpcmNsZUNlbnRlci5hZGRlZChuZXh0UmFkaXVzRGlyLm11bHRpcGxpZWQocmFkaXVzICsgbmV4dEhhbGZXaWR0aCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRSaWdodE1vbGRQdCA9IGNpcmNsZUNlbnRlci5hZGRlZChuZXh0UmFkaXVzRGlyLm11bHRpcGxpZWQocmFkaXVzIC0gbmV4dEhhbGZXaWR0aCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1clN0ZXBMZWZ0RnJvbnREaXIgPSBuZXh0TGVmdE1vbGRQdC5zdWJ0cmFjdGVkKGN1ckxlZnRNb2xkUHQpLm11bHRpcGxpZWQoMC41KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJTdGVwUmlnaHRGcm9udERpciA9IG5leHRSaWdodE1vbGRQdC5zdWJ0cmFjdGVkKGN1clJpZ2h0TW9sZFB0KS5tdWx0aXBsaWVkKDAuNSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyU3RlcExlZnREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKGN1clN0ZXBMZWZ0RnJvbnREaXIpLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJMZWZ0Qm90dG9tUHQgPSBjdXJMZWZ0TW9sZFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArICh0ZW1wU3RlcENvdW50ICsgKHVwd2FyZCA/IDEgOiAwKSkgKiBzdGVwSGVpZ2h0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyUmlnaHRCb3R0b21QdCA9IGN1clJpZ2h0TW9sZFB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChzdGFydEhlaWdodCArICh0ZW1wU3RlcENvdW50ICsgKHVwd2FyZCA/IDEgOiAwKSkgKiBzdGVwSGVpZ2h0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyTGVmdEJvdHRvbU1pZFB0ID0gY3VyTGVmdEJvdHRvbVB0LmFkZGVkKGN1clN0ZXBMZWZ0RnJvbnREaXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1clJpZ2h0Qm90dG9tTWlkUHQgPSBjdXJSaWdodEJvdHRvbVB0LmFkZGVkKGN1clN0ZXBSaWdodEZyb250RGlyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGVtcFN0ZXBDb3VudCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHB1c2ggcmFpbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGVmdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJSYWlsLnB1c2goY3VyTGVmdEJvdHRvbVB0LmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQgKyAodGVtcFN0ZXBDb3VudCA+IDAgJiYgIXVwd2FyZCA/IC1zdGVwSGVpZ2h0IDogMCkpKS5hZGRlZChjdXJTdGVwTGVmdEZyb250RGlyLm5vcm1hbGl6ZWQoKS5tdWx0aXBsaWVkKHRlbXBTdGVwQ291bnQgPT09IDAgPyBzdGFydEZyb250T2Zmc2V0TGVuZ3RoIDogMCkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyUmFpbC5wdXNoKGN1clJpZ2h0Qm90dG9tUHQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCArICh0ZW1wU3RlcENvdW50ID4gMCAmJiAhdXB3YXJkID8gLXN0ZXBIZWlnaHQgOiAwKSkpLmFkZGVkKGN1clN0ZXBSaWdodEZyb250RGlyLm5vcm1hbGl6ZWQoKS5tdWx0aXBsaWVkKHRlbXBTdGVwQ291bnQgPT09IDAgPyBzdGFydEZyb250T2Zmc2V0TGVuZ3RoIDogMCkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGVtcFN0ZXBDb3VudCA9PT0gdXNlZFN0ZXBDb3VudCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RTdGVwUGVyY2VudCA9IHVzZWRMYXN0SG9yaXpvbnRhbEFuZ2xlIC8gaG9yaXpvbnRhbFN0ZXBBbmdsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RMZWZ0SG9yU3RlcCA9IChyYWRpdXMgKyBjdXJIYWxmV2lkdGgpIC8gcmFkaXVzICogaG9yaXpvbnRhbFN0ZXAgKiBsYXN0U3RlcFBlcmNlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0UmlnaHRIb3JTdGVwID0gKHJhZGl1cyAtIGN1ckhhbGZXaWR0aCkgLyByYWRpdXMgKiBob3Jpem9udGFsU3RlcCAqIGxhc3RTdGVwUGVyY2VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RGcm9udE9mZnNldExlbmd0aCA9IE1hdGgubWluKG9mZnNldExlbmd0aCwgbGFzdFN0ZXBQZXJjZW50IC8gMiAqIGhvcml6b250YWxTdGVwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RTaWRlSG9yU3RlcCA9IGxlZnQgPyBsYXN0TGVmdEhvclN0ZXAgOiBsYXN0UmlnaHRIb3JTdGVwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdENvbHVtbkFjdHVhbEhlaWdodCA9IC1zdGVwSGVpZ2h0ICogTWF0aC5tYXgoKGxhc3RTaWRlSG9yU3RlcCAvIDIgLSBsYXN0RnJvbnRPZmZzZXRMZW5ndGgpIC8gKGxhc3RTaWRlSG9yU3RlcCAtIGxhc3RGcm9udE9mZnNldExlbmd0aCksIDApICsgaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxlZnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFpclJhaWwucHVzaChjdXJMZWZ0Qm90dG9tTWlkUHQuYWRkZWQoY3VyU3RlcExlZnRGcm9udERpcikuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCkpLmFkZGVkKGN1clN0ZXBMZWZ0RnJvbnREaXIubm9ybWFsaXplZCgpLm11bHRpcGxpZWQoLWxhc3RGcm9udE9mZnNldExlbmd0aCkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyUmFpbC5wdXNoKGN1clJpZ2h0Qm90dG9tTWlkUHQuYWRkZWQoY3VyU3RlcFJpZ2h0RnJvbnREaXIpLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChoZWlnaHQpKS5hZGRlZChjdXJTdGVwUmlnaHRGcm9udERpci5ub3JtYWxpemVkKCkubXVsdGlwbGllZCgtbGFzdEZyb250T2Zmc2V0TGVuZ3RoKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJDb2x1bW5zLnB1c2goW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQgPyBjdXJMZWZ0Qm90dG9tTWlkUHQgOiBjdXJSaWdodEJvdHRvbU1pZFB0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChsZWZ0ID8gY3VyTGVmdEJvdHRvbU1pZFB0IDogY3VyUmlnaHRCb3R0b21NaWRQdCkuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKHVwd2FyZCA/IGhlaWdodCA6IGxhc3RDb2x1bW5BY3R1YWxIZWlnaHQpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBzZWdtZW50IHN0YXJ0V2lkdGggIT09IGN1cnJlbnRTZWdtZW50IGVuZFdpZHRoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcCA9IGxlZnQgPyBzdGFydC5hZGRlZChiYXNlTGluZTNkRGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIgLSBvZmZzZXRMZW5ndGgpKSA6IG5leHRSaWdodE1vbGRQdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbGVmdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnREaXIgPSBjdXJTdGVwTGVmdERpcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGVtcFN0ZXBDb3VudCAlIHJlYXNvbmFibGVTdGVwQ291bnQgPT09IDAgJiYgdGVtcFN0ZXBDb3VudCA8IHVzZWRTdGVwQ291bnQgLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdGFydENvbHVtbkFjdHVhbEhlaWdodCA9IGNvbHVtbkFjdHVhbEhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRlbXBTdGVwQ291bnQgPT09IDAgJiYgdXB3YXJkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFydExlZnRIb3JTdGVwID0gKHJhZGl1cyArIGN1ckhhbGZXaWR0aCkgLyByYWRpdXMgKiBob3Jpem9udGFsU3RlcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0UmlnaHRIb3JTdGVwID0gKHJhZGl1cyAtIGN1ckhhbGZXaWR0aCkgLyByYWRpdXMgKiBob3Jpem9udGFsU3RlcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0U2lkZUhvclN0ZXAgPSBsZWZ0ID8gc3RhcnRMZWZ0SG9yU3RlcCA6IHN0YXJ0UmlnaHRIb3JTdGVwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRDb2x1bW5BY3R1YWxIZWlnaHQgPSBzdGVwSGVpZ2h0ICogKHN0YXJ0U2lkZUhvclN0ZXAgLyAyIC0gc3RhcnRGcm9udE9mZnNldExlbmd0aCkgLyAoc3RhcnRTaWRlSG9yU3RlcCAtIHN0YXJ0RnJvbnRPZmZzZXRMZW5ndGgpICsgaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWlyQ29sdW1ucy5wdXNoKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQgPyBjdXJMZWZ0Qm90dG9tTWlkUHQgOiBjdXJSaWdodEJvdHRvbU1pZFB0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGxlZnQgPyBjdXJMZWZ0Qm90dG9tTWlkUHQgOiBjdXJSaWdodEJvdHRvbU1pZFB0KS5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoKHRlbXBTdGVwQ291bnQgPT09IDAgPyAodXB3YXJkID8gc3RhcnRDb2x1bW5BY3R1YWxIZWlnaHQgOiBoZWlnaHQpIDogY29sdW1uQWN0dWFsSGVpZ2h0KSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcFN0ZXBDb3VudCArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsLnJhaWwucHVzaCguLi5oZWFkQ29ybmVyUmFpbCk7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsLmNvbHVtbnMucHVzaCguLi5oZWFkQ29ybmVyQ29sdW1ucyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsZWZ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5yYWlsLnB1c2goLi4uc3RhaXJSYWlsLnJldmVyc2UoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5jb2x1bW5zLnB1c2goLi4uc3RhaXJDb2x1bW5zLnJldmVyc2UoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbC5yYWlsLnB1c2goLi4uc3RhaXJSYWlsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsLmNvbHVtbnMucHVzaCguLi5zdGFpckNvbHVtbnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxldCBzdGFpck5leHRTZWdtZW50O1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG5leHRTZWdtZW50SW5kZXggb2YgbmV4dENvbXBvbmVudHNbbGluZTNkSW5kXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dFNlZ21lbnQgPSBnZXRTZWdtZW50QnlJbmRleChzZWdtZW50cywgbmV4dFNlZ21lbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0U2VnbWVudFZpc2l0ZWRSZWNvcmQgPSB2aXNpdGVkLmdldCgobmV4dFNlZ21lbnQgPT09IG51bGwgfHwgbmV4dFNlZ21lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG5leHRTZWdtZW50LnBhcmFtLmluZGV4KSB8fCAtMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFNlZ21lbnQgJiYgKChpc1BsYXRmb3JtKG5leHRTZWdtZW50KSAmJiAhKG5leHRTZWdtZW50VmlzaXRlZFJlY29yZCA9PT0gbnVsbCB8fCBuZXh0U2VnbWVudFZpc2l0ZWRSZWNvcmQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG5leHRTZWdtZW50VmlzaXRlZFJlY29yZC5saW5lM2RJbmRleGVzLnNpemUpKSB8fCAoIWlzUGxhdGZvcm0obmV4dFNlZ21lbnQpICYmICEobmV4dFNlZ21lbnRWaXNpdGVkUmVjb3JkID09PSBudWxsIHx8IG5leHRTZWdtZW50VmlzaXRlZFJlY29yZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogbmV4dFNlZ21lbnRWaXNpdGVkUmVjb3JkLnJpZ2h0KSkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhaXJOZXh0U2VnbWVudCA9IG5leHRTZWdtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChsZWZ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmFzZVNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgLy8gbmV2ZXIgaGFwcGVuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKG5leHRTaWJsaW5nU2VnbWVudCAmJiBiYXNlU2VnbWVudC5wYXJhbS50eXBlICE9PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXAgPSBiYXNlTGluZTNkRW5kV2l0aE9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcFRvRXBEaXIgPSBlcC5zdWJ0cmFjdGVkKHNwKS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwVG9FcERpci5kb3QoYmFzZUxpbmUzZERpcikgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U3RhcnRQb2ludCA9IHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaEVuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTdGFydFBvaW50ID0gaXNQbGF0Zm9ybShiYXNlU2VnbWVudCkgPyBlcCA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50OiBiYXNlU2VnbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZTNkSW5kOiBiYXNlU2VnbWVudC5wYXJhbS50eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtID8gKGJhc2VDb21wb25lbnQgPT09IG51bGwgfHwgYmFzZUNvbXBvbmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmFzZUNvbXBvbmVudC5saW5lM2RJbmRleCkgfHwgMCA6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRQb2ludDogbmV4dFN0YXJ0UG9pbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBlbmQgdGhlIHBhdGNoIHdoaWNoIGlzIHN0YXJ0IHdpdGggY3VycmVudFNlZ21lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kcmFpbHMucHVzaChoYW5kcmFpbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWwgPSB7IHJhaWw6IFtdLCBjb2x1bW5zOiBbXSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZpc2l0ZWRSZWNvcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNpdGVkUmVjb3JkLmxlZnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YWlyTmV4dFNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGxpbmUzZEluZDogc3RhaXJOZXh0TGluZTNkSW5kLCBlbmRPbkJhc2VMaW5lV2l0aE9mZnNldCB9ID0gZ2V0U2VnbWVudFN0YXJ0QW5kQmFzZUxpbmUzZChzdGFpck5leHRTZWdtZW50LCBzZWdtZW50cywgY3VycmVudFNlZ21lbnQsIG9mZnNldExlbmd0aCkuc3RhcnRMaW5lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVwID0gZW5kT25CYXNlTGluZVdpdGhPZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BUb0VwRGlyID0gZXAuc3VidHJhY3RlZChzcCkubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcFRvRXBEaXIuZG90KGxpbmUzZERpcikgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U3RhcnRQb2ludCA9IHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaEVuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTdGFydFBvaW50ID0gaXNQbGF0Zm9ybShzdGFpck5leHRTZWdtZW50KSA/IGVwIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50OiBzdGFpck5leHRTZWdtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lM2RJbmQ6IHN0YWlyTmV4dExpbmUzZEluZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRQb2ludDogbmV4dFN0YXJ0UG9pbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50OiBjdXJyZW50U2VnbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZTNkSW5kOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN0YXJ0UG9pbnQ6IG5leHRTdGFydFBvaW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVuZCB0aGUgcGF0Y2ggd2hpY2ggaXMgZW5kIHdpdGggc3RhaXIgY29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWxzLnB1c2goaGFuZHJhaWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsID0geyByYWlsOiBbXSwgY29sdW1uczogW10gfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2aXNpdGVkUmVjb3JkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlzaXRlZFJlY29yZC5yaWdodCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHB1c2hFbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVwIGlzIHJldXNlZCB3aGVuIHB1c2hFbmRcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wVGFpbERpc3RhbmNlID0gc3RlcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZWZ0ICYmIGlzTGVmdFN0YWlyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3AgPSBzdGFydC5hZGRlZChsZWZ0RGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIgLSBvZmZzZXRMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcm5lclN0YXJ0SGVpZ2h0ID0gbGVmdCA/IHN0YXJ0SGVpZ2h0IDogZW5kSGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29ybmVyRW5kID0gZXA7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3JuZXJEaXN0YW5jZSA9IHNwLmRpc3RhbmNlVG8oY29ybmVyRW5kKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFsb25nIGNvcm5lckJhc2VEaXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcm5lclNwVG9FcERpciA9IGNvcm5lckVuZC5zdWJ0cmFjdGVkKHNwKS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3JuZXJPZmZzZXREaXIgPSBEaXJlY3Rpb25aLmNyb3NzKGNvcm5lclNwVG9FcERpcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3JuZXJBZGRpdGlvbmFsSGVpZ2h0ID0gbGVmdCAmJiAhaXNSaWdodFN0YWlyICYmIHVwd2FyZCA/IHN0ZXBIZWlnaHQgOiAoIWxlZnQgJiYgIXVwd2FyZCA/IC1zdGVwSGVpZ2h0IDogMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAodGVtcFRhaWxEaXN0YW5jZSA8IGNvcm5lckRpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYm90dG9tUG9pbnQgPSBzcC5hZGRlZChjb3JuZXJTcFRvRXBEaXIubXVsdGlwbGllZCh0ZW1wVGFpbERpc3RhbmNlKSkuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGNvcm5lclN0YXJ0SGVpZ2h0ICsgY29ybmVyQWRkaXRpb25hbEhlaWdodCkpLmFkZGVkKGNvcm5lck9mZnNldERpci5tdWx0aXBsaWVkKG9mZnNldExlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsLmNvbHVtbnMucHVzaChbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbVBvaW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b21Qb2ludC5hZGRlZChEaXJlY3Rpb25aLm11bHRpcGxpZWQoaGVpZ2h0KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcFRhaWxEaXN0YW5jZSArPSBzdGVwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdEJvdHRvbVBvaW50ID0gZXAuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGNvcm5lclN0YXJ0SGVpZ2h0ICsgY29ybmVyQWRkaXRpb25hbEhlaWdodCkpLmFkZGVkKGNvcm5lck9mZnNldERpci5tdWx0aXBsaWVkKG9mZnNldExlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxlZnQgJiYgaXNSaWdodFN0YWlyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWwucmFpbC5wdXNoKHNwLmFkZGVkKERpcmVjdGlvbloubXVsdGlwbGllZChjb3JuZXJTdGFydEhlaWdodCArIGhlaWdodCArIGNvcm5lckFkZGl0aW9uYWxIZWlnaHQpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwdXNoIHJhaWxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRyYWlsLnJhaWwucHVzaChsYXN0Qm90dG9tUG9pbnQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoY29ybmVyRGlzdGFuY2UgLSB0ZW1wVGFpbERpc3RhbmNlICsgc3RlcCkgPiBzdGVwVG9sZXJhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHJhaWwuY29sdW1ucy5wdXNoKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdEJvdHRvbVBvaW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0Qm90dG9tUG9pbnQuYWRkZWQoRGlyZWN0aW9uWi5tdWx0aXBsaWVkKGhlaWdodCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3VycmVudCA9IG5leHQ7XG4gICAgICAgICAgICBpZiAoIWN1cnJlbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHVuVmlzaXRlZC5zaXplKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoZVNlZ21lbnQgPSBbLi4udW5WaXNpdGVkLnZhbHVlcygpXVswXTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudDogdGhlU2VnbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lM2RJbmQ6IGdldFNlZ21lbnRTdGFydEFuZEJhc2VMaW5lM2QodGhlU2VnbWVudCwgc2VnbWVudHMpLnN0YXJ0TGluZS5saW5lM2RJbmQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGhhbmRyYWlscztcbiAgICB9XG59XG5mdW5jdGlvbiBnZW5lcmF0ZVRlbXBMaW5lc0xvb3AodmVydGV4Q291bnQpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogdmVydGV4Q291bnQgfSkubWFwKChfLCBpKSA9PiBbaSwgaSA9PT0gdmVydGV4Q291bnQgLSAxID8gMCA6IGkgKyAxXSk7XG59XG5mdW5jdGlvbiBnZXRTZWdtZW50U3RhcnRBbmRCYXNlTGluZTNkKHNlZ21lbnQsIHNlZ21lbnRzLCBiYXNlU2VnbWVudCwgb2Zmc2V0TGVuZ3RoKSB7XG4gICAgY29uc3QgeyBzdGFydCwgcGFyYW06IHsgdHlwZSwgc3RhcnRXaWR0aCB9LCBjb21wb25lbnREaXJlY3Rpb25UeXBlLCBtb2xkU2hhcGU6IHsgdGVtcExpbmVzLCB2ZXJ0aWNlcyB9LCBiYXNlQ29tcG9uZW50IH0gPSBzZWdtZW50O1xuICAgIGlmIChvZmZzZXRMZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBvZmZzZXRMZW5ndGggPSBIYW5kcmFpbERlZmF1bHRPZmZzZXRMZW5ndGg7XG4gICAgfVxuICAgIGxldCBzdGFydExpbmUzZEluZCA9IDA7XG4gICAgLy8gNSBlZGdlc1xuICAgIGlmICh0eXBlID09PSBDb21wb25lbnRUeXBlLlBsYXRmb3JtICYmIGNvbXBvbmVudERpcmVjdGlvblR5cGUgPT09IENvbXBvbmVudERpcmVjdGlvblR5cGUuUmlnaHRGcm9udCAmJiB0ZW1wTGluZXMubGVuZ3RoID4gNCkge1xuICAgICAgICBzdGFydExpbmUzZEluZCA9IDE7XG4gICAgfVxuICAgIGNvbnN0IHN0YXJ0TGluZTNkID0gdGVtcExpbmVzW3N0YXJ0TGluZTNkSW5kXTtcbiAgICBjb25zdCBzdGFydExpbmUzZFN0YXJ0ID0gdmVydGljZXNbc3RhcnRMaW5lM2RbMF1dO1xuICAgIGNvbnN0IHN0YXJ0TGluZTNkRW5kID0gdmVydGljZXNbc3RhcnRMaW5lM2RbMV1dO1xuICAgIGNvbnN0IHN0YXJ0TGluZTNkRGlyID0gc3RhcnRMaW5lM2RFbmQuc3VidHJhY3RlZChzdGFydExpbmUzZFN0YXJ0KS5ub3JtYWxpemVkKCk7XG4gICAgbGV0IGJhc2VMaW5lM2RJbmQgPSAoYmFzZUNvbXBvbmVudCA9PT0gbnVsbCB8fCBiYXNlQ29tcG9uZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBiYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4KSB8fCAwO1xuICAgIGxldCBiYXNlTGluZTNkID0gWy4uLnN0YXJ0TGluZTNkXS5yZXZlcnNlKCk7XG4gICAgbGV0IGJhc2VMaW5lM2RTdGFydCA9IHZlcnRpY2VzW3N0YXJ0TGluZTNkWzFdXTtcbiAgICBsZXQgYmFzZUxpbmUzZEVuZCA9IHZlcnRpY2VzW3N0YXJ0TGluZTNkWzBdXTtcbiAgICBsZXQgYmFzZUxpbmUzZERpciA9IHN0YXJ0TGluZTNkRGlyLnJldmVyc2VkKCk7XG4gICAgO1xuICAgIGlmICghYmFzZVNlZ21lbnQgJiYgYmFzZUNvbXBvbmVudCkge1xuICAgICAgICBiYXNlU2VnbWVudCA9IGdldFNlZ21lbnRCeUluZGV4KHNlZ21lbnRzLCBiYXNlQ29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcbiAgICB9XG4gICAgaWYgKGJhc2VTZWdtZW50KSB7XG4gICAgICAgIGNvbnN0IHsgbW9sZFNoYXBlOiB7IHZlcnRpY2VzOiBiYXNlVmVydGljZXMsIHRlbXBMaW5lczogYmFzZVRlbXBMaW5lcyB9IH0gPSBiYXNlU2VnbWVudDtcbiAgICAgICAgYmFzZUxpbmUzZCA9IGJhc2VTZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuUGxhdGZvcm0gPyBiYXNlVGVtcExpbmVzWyhiYXNlQ29tcG9uZW50ID09PSBudWxsIHx8IGJhc2VDb21wb25lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJhc2VDb21wb25lbnQubGluZTNkSW5kZXgpIHx8IDBdIDogWy4uLmJhc2VUZW1wTGluZXNbYmFzZVRlbXBMaW5lcy5sZW5ndGggLSAxXV0ucmV2ZXJzZSgpO1xuICAgICAgICBiYXNlTGluZTNkU3RhcnQgPSBiYXNlVmVydGljZXNbYmFzZUxpbmUzZFswXV07XG4gICAgICAgIGJhc2VMaW5lM2RFbmQgPSBiYXNlVmVydGljZXNbYmFzZUxpbmUzZFsxXV07XG4gICAgICAgIGJhc2VMaW5lM2REaXIgPSBiYXNlTGluZTNkRW5kLnN1YnRyYWN0ZWQoYmFzZUxpbmUzZFN0YXJ0KS5ub3JtYWxpemVkKCk7XG4gICAgfVxuICAgIGxldCBiYXNlTGluZTNkU3RhcnRXaXRoT2Zmc2V0ID0gYmFzZUxpbmUzZFN0YXJ0LmFkZGVkKGJhc2VMaW5lM2REaXIubXVsdGlwbGllZChvZmZzZXRMZW5ndGgpKTtcbiAgICBsZXQgYmFzZUxpbmUzZEVuZFdpdGhPZmZzZXQgPSBiYXNlTGluZTNkRW5kLmFkZGVkKGJhc2VMaW5lM2REaXIubXVsdGlwbGllZCgtb2Zmc2V0TGVuZ3RoKSk7XG4gICAgbGV0IHN0YXJ0T25CYXNlTGluZSA9IHN0YXJ0TGluZTNkU3RhcnQ7XG4gICAgbGV0IGVuZE9uQmFzZUxpbmUgPSBzdGFydExpbmUzZEVuZDtcbiAgICBsZXQgc3RhcnRPbkJhc2VMaW5lV2l0aE9mZnNldCA9IHN0YXJ0TGluZTNkU3RhcnQuYWRkZWQoc3RhcnRMaW5lM2REaXIubXVsdGlwbGllZChvZmZzZXRMZW5ndGgpKTtcbiAgICBsZXQgZW5kT25CYXNlTGluZVdpdGhPZmZzZXQgPSBzdGFydExpbmUzZEVuZC5hZGRlZChzdGFydExpbmUzZERpci5tdWx0aXBsaWVkKC1vZmZzZXRMZW5ndGgpKTtcbiAgICBpZiAodHlwZSAhPT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSkge1xuICAgICAgICBzdGFydE9uQmFzZUxpbmUgPSBzdGFydC5hZGRlZChiYXNlTGluZTNkRGlyLm11bHRpcGxpZWQoc3RhcnRXaWR0aCAvIDIpKTtcbiAgICAgICAgZW5kT25CYXNlTGluZSA9IHN0YXJ0LmFkZGVkKGJhc2VMaW5lM2REaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIpKTtcbiAgICAgICAgc3RhcnRPbkJhc2VMaW5lV2l0aE9mZnNldCA9IHN0YXJ0LmFkZGVkKGJhc2VMaW5lM2REaXIubXVsdGlwbGllZChzdGFydFdpZHRoIC8gMiAtIG9mZnNldExlbmd0aCkpO1xuICAgICAgICBlbmRPbkJhc2VMaW5lV2l0aE9mZnNldCA9IHN0YXJ0LmFkZGVkKGJhc2VMaW5lM2REaXIubXVsdGlwbGllZCgtc3RhcnRXaWR0aCAvIDIgKyBvZmZzZXRMZW5ndGgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhcnRMaW5lOiB7IGxpbmUzZEluZDogc3RhcnRMaW5lM2RJbmQsIGxpbmUzZDogc3RhcnRMaW5lM2QsIGRpcjogc3RhcnRMaW5lM2REaXIsIHN0YXJ0OiBzdGFydExpbmUzZFN0YXJ0LCBlbmQ6IHN0YXJ0TGluZTNkRW5kLCBzdGFydE9uQmFzZUxpbmUsIGVuZE9uQmFzZUxpbmUsIHN0YXJ0T25CYXNlTGluZVdpdGhPZmZzZXQsIGVuZE9uQmFzZUxpbmVXaXRoT2Zmc2V0IH0sXG4gICAgICAgIGJhc2VMaW5lOiB7IGxpbmUzZEluZDogYmFzZUxpbmUzZEluZCwgbGluZTNkOiBiYXNlTGluZTNkLCBkaXI6IGJhc2VMaW5lM2REaXIsIHN0YXJ0OiBiYXNlTGluZTNkU3RhcnQsIGVuZDogYmFzZUxpbmUzZEVuZCwgc3RhcnRXaXRoT2Zmc2V0OiBiYXNlTGluZTNkU3RhcnRXaXRoT2Zmc2V0LCBlbmRXaXRoT2Zmc2V0OiBiYXNlTGluZTNkRW5kV2l0aE9mZnNldCB9LFxuICAgIH07XG59XG5leHBvcnQgZnVuY3Rpb24gaXNQbGF0Zm9ybShzZWdtZW50KSB7XG4gICAgcmV0dXJuIHNlZ21lbnQucGFyYW0udHlwZSA9PT0gQ29tcG9uZW50VHlwZS5QbGF0Zm9ybTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0NpcmN1bGFyU3RhaXIoc2VnbWVudCkge1xuICAgIHJldHVybiBzZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpcjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmFpZ2h0U3RhaXIoc2VnbWVudCkge1xuICAgIHJldHVybiBzZWdtZW50LnBhcmFtLnR5cGUgPT09IENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpcjtcbn1cbiIsImV4cG9ydCBjb25zdCBTdGFpck1vZGVsS2V5ID0gJ0RTTW9kZWwnO1xuZXhwb3J0IGNvbnN0IE1vZGVsVmFsdWUgPSAnMSc7XG5leHBvcnQgY29uc3QgSGFuZHJhaWxNb2RlbEtleSA9ICdIYW5kcmFpbCc7XG5leHBvcnQgY29uc3QgUmFpbE1vZGVsS2V5ID0gJ1JhaWwnO1xuZXhwb3J0IGNvbnN0IENvbHVtbk1vZGVsS2V5ID0gJ0NvbHVtbic7XG4vLyBleHBvcnQgY29uc3QgU3RhaXJLZXkgPSAnRFNTdGFpcic7XG4vLyBleHBvcnQgY29uc3QgUGxhdGZvcm1LZXkgPSAnRFNQbGF0Zm9ybSc7XG5leHBvcnQgY29uc3QgU3RhaXJQYXJhbUtleSA9ICdTUGFyYW0nO1xuZXhwb3J0IGNvbnN0IENvbXBvbmVudFBhcmFtS2V5ID0gJ0NQYXJhbSc7XG5leHBvcnQgY29uc3QgU3RhaXJNYXRlcmlhbEtleSA9ICdTTWF0JztcbmV4cG9ydCBjb25zdCBQbGF0Zm9ybU1hdGVyaWFsS2V5ID0gJ1BNYXQnO1xuZXhwb3J0IGNvbnN0IFJhaWxNYXRlcmlhbEtleSA9ICdIUk1hdCc7XG5leHBvcnQgY29uc3QgQ29sdW1uTWF0ZXJpYWxLZXkgPSAnSENNYXQnO1xuZXhwb3J0IGNvbnN0IENvbXBvbmVudE1hdGVyaWFsS2V5ID0gJ0NNYXQnO1xuLy8gc3RhcnRIZWlnaHQgYW5kIGVuZEhlaWdodCBjYWNoZWQgaW4gc3RhcnQgYW5kIGVuZFxuZXhwb3J0IGNvbnN0IENvbXBvbmVudEluZGV4S2V5ID0gJ0luZCc7XG5leHBvcnQgY29uc3QgU3RhcnRFbmRLZXkgPSAnU1RvRSc7XG5leHBvcnQgY29uc3QgQmFzZUxpbmVTZWczZEtleSA9ICdCYXNlTGluZSc7XG5leHBvcnQgY29uc3QgQmFzZUNvbXBvbmVudEtleSA9ICdCYXNlQ29tcG9uZW50JztcbmV4cG9ydCBjb25zdCBDaXJjbGVUYW5nZW50S2V5ID0gJ0NpcmNsZVRhbmdlbnQnO1xuZXhwb3J0IGNvbnN0IERlbGltaXRlciA9ICcmJztcbmV4cG9ydCBjb25zdCBDb29yZERlbGltaXRlciA9ICcsJztcbmV4cG9ydCBjb25zdCBCYXNlTGluZTNkRGVsaW1pdGVyID0gJ18nO1xuY29uc3QgUHJvZE1hdGVyaWFscyA9IHtcbiAgICBTdGFpcjogeyBiZ0lkOiAnM0ZPNExIRVJCUFBZJywgbWF0ZXJpYWxJZDogJzU5NzJlOTkzYWEwMWYzNTg1ZjUxZGVjYicgfSxcbiAgICAvLyBTdGFpcjogeyBiZ0lkOiAnM0ZPNEFUS0VDTEtJJywgbWF0ZXJpYWxJZDogJzYxNjhmNDU0Y2RkMjVlMDAwMTdkNzVkMCcgfSxcbiAgICBQbGF0Zm9ybTogeyBiZ0lkOiAnM0ZPNDRUN01ZRkE1JywgbWF0ZXJpYWxJZDogJzY0NTYyYWZkNmZiYzNiMDAwMWEzMjUxYycgfSxcbiAgICBIYW5kcmFpbDoge1xuICAgICAgICByYWlsOiB7IGJnSWQ6ICczRk80TEhFUkU3TlAnLCBtYXRlcmlhbElkOiAnNTk3MmU4ZDdhYTAxZjM1ODVmNTFkZTk3JyB9LFxuICAgICAgICBjb2x1bW46IHsgYmdJZDogJzNGTzRMSEVSRTdOUCcsIG1hdGVyaWFsSWQ6ICc1OTcyZThkN2FhMDFmMzU4NWY1MWRlOTcnIH0sXG4gICAgfSxcbn07XG5leHBvcnQgY29uc3QgUHJlc2V0TWF0ZXJpYWxzID0gUHJvZE1hdGVyaWFscztcbi8vIGNvbnN0IERldk1hdGVyaWFscyA9IHtcbi8vICAgICBTdGFpcjogeyBiZ0lkOiAnM0ZPNEgyRDczSkZPJywgbWF0ZXJpYWxJZDogJzU4YWY5NjFiNGE0ZDJjNGY4YWEyYjFkYScgfSxcbi8vICAgICAvLyBTdGFpcjogeyBiZ0lkOiAnM0ZPNEFUS0VDTEtJJywgbWF0ZXJpYWxJZDogJzYxNjhmNDU0Y2RkMjVlMDAwMTdkNzVkMCcgfSxcbi8vICAgICBQbGF0Zm9ybTogeyBiZ0lkOiAnM0ZPNEgyRDZDUU1ZJywgbWF0ZXJpYWxJZDogJzU4MTZmZWY5ODVkYTU2NmExYjI4YTk0NCcgfSxcbi8vICAgICBIYW5kcmFpbDoge1xuLy8gICAgICAgICByYWlsOiB7IGJnSWQ6ICczRk80SDJENkg4U0InLCBtYXRlcmlhbElkOiAnNThhZmIzYWI1YzI2YTA3M2IzODlhOTVmJyB9LFxuLy8gICAgICAgICBjb2x1bW46IHsgYmdJZDogJzNGTzRHREs1RVhEQycsIG1hdGVyaWFsSWQ6ICc1ZTUzMmZiNDIwMTQwMjAwMDFjYzQ4ODknIH0sXG4vLyAgICAgfSxcbi8vIH1cbi8vIGV4cG9ydCBjb25zdCBQcmVzZXRNYXRlcmlhbHMgPSAoKHdpbmRvdyBhcyBhbnkpLm9yaWdpbiB8fCAnJykuaW5jbHVkZXMoJ3NpdCcpID8gRGV2TWF0ZXJpYWxzIDogUHJvZE1hdGVyaWFscztcbmV4cG9ydCB2YXIgQ29tcG9uZW50UGFyYW1UeXBlO1xuKGZ1bmN0aW9uIChDb21wb25lbnRQYXJhbVR5cGUpIHtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIb3Jpem9udGFsU3RlcFwiXSA9IFwiaG9yaXpvbnRhbFN0ZXBcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJWZXJ0aWNhbFN0ZXBcIl0gPSBcInZlcnRpY2FsU3RlcFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIlN0YXJ0V2lkdGhcIl0gPSBcInN0YXJ0V2lkdGhcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJFbmRXaWR0aFwiXSA9IFwiZW5kV2lkdGhcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJVcHdhcmRcIl0gPSBcInVwd2FyZFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIlBsYXRmb3JtVGhpY2tuZXNzXCJdID0gXCJwbGF0Zm9ybVRoaWNrbmVzc1wiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkNvbXBvbmVudE1hdGVyaWFsXCJdID0gXCJtYXRlcmlhbFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIlR5cGVcIl0gPSBcInR5cGVcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJQbGF0Zm9ybUxlbmd0aFwiXSA9IFwicGxhdGZvcm1MZW5ndGhcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJTdGVwUHJvcG9ydGlvbmFsXCJdID0gXCJzdGVwUHJvcG9ydGlvbmFsXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiV2lkdGhQcm9wb3J0aW9uYWxcIl0gPSBcIndpZHRoUHJvcG9ydGlvbmFsXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiUGxhdGZvcm1MZW5ndGhMb2NrZWRcIl0gPSBcInBsYXRmb3JtTGVuZ3RoTG9ja2VkXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiU3RhaXJNYXRlcmlhbFwiXSA9IFwic3RhaXJNYXRlcmlhbFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIlBsYXRmb3JtTWF0ZXJpYWxcIl0gPSBcInBsYXRmb3JtTWF0ZXJpYWxcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIYW5kcmFpbFwiXSA9IFwiaGFuZHJhaWxcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIYW5kcmFpbEhlaWdodFwiXSA9IFwiaGFuZHJhaWxIZWlnaHRcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIYW5kcmFpbFJhaWxUeXBlXCJdID0gXCJoYW5kcmFpbFJhaWxUeXBlXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSGFuZHJhaWxSYWlsUmFkaXVzXCJdID0gXCJoYW5kcmFpbFJhaWxSYWRpdXNcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIYW5kcmFpbFJhaWxXaWR0aFwiXSA9IFwiaGFuZHJhaWxSYWlsV2lkdGhcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIYW5kcmFpbFJhaWxIZWlnaHRcIl0gPSBcImhhbmRyYWlsUmFpbEhlaWdodFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsUmFpbE1hdGVyaWFsXCJdID0gXCJSYWlsTWF0ZXJpYWxcIjtcbiAgICBDb21wb25lbnRQYXJhbVR5cGVbXCJIYW5kcmFpbENvbHVtblR5cGVcIl0gPSBcImhhbmRyYWlsQ29sdW1uVHlwZVwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsQ29sdW1uU3RlcFwiXSA9IFwiaGFuZHJhaWxDb2x1bW5TdGVwXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSGFuZHJhaWxDb2x1bW5SYWRpdXNcIl0gPSBcImhhbmRyYWlsQ29sdW1uUmFkaXVzXCI7XG4gICAgQ29tcG9uZW50UGFyYW1UeXBlW1wiSGFuZHJhaWxDb2x1bW5XaWR0aFwiXSA9IFwiaGFuZHJhaWxDb2x1bW5XaWR0aFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsQ29sdW1uSGVpZ2h0XCJdID0gXCJoYW5kcmFpbENvbHVtbkhlaWdodFwiO1xuICAgIENvbXBvbmVudFBhcmFtVHlwZVtcIkhhbmRyYWlsQ29sdW1uTWF0ZXJpYWxcIl0gPSBcIkNvbHVtbk1hdGVyaWFsXCI7XG59KShDb21wb25lbnRQYXJhbVR5cGUgfHwgKENvbXBvbmVudFBhcmFtVHlwZSA9IHt9KSk7XG4vLyBpbnRlcmZhY2UgUGFyYW1TZXR0aW5ncyB7XG4vLyAgICAgbWluOiBudW1iZXI7XG4vLyAgICAgbWF4OiBudW1iZXI7XG4vLyAgICAgc3RlcDogbnVtYmVyO1xuLy8gICAgIHVuaXQ6IHN0cmluZztcbi8vICAgICBwcmVjaXNpb246IG51bWJlcjtcbi8vIH1cbmV4cG9ydCB2YXIgQ29tcG9uZW50VHlwZTtcbihmdW5jdGlvbiAoQ29tcG9uZW50VHlwZSkge1xuICAgIENvbXBvbmVudFR5cGVbQ29tcG9uZW50VHlwZVtcIlN0cmFpZ2h0U3RhaXJcIl0gPSAwXSA9IFwiU3RyYWlnaHRTdGFpclwiO1xuICAgIENvbXBvbmVudFR5cGVbQ29tcG9uZW50VHlwZVtcIkNpcmN1bGFyU3RhaXJcIl0gPSAxXSA9IFwiQ2lyY3VsYXJTdGFpclwiO1xuICAgIENvbXBvbmVudFR5cGVbQ29tcG9uZW50VHlwZVtcIlBsYXRmb3JtXCJdID0gMl0gPSBcIlBsYXRmb3JtXCI7XG59KShDb21wb25lbnRUeXBlIHx8IChDb21wb25lbnRUeXBlID0ge30pKTtcbmV4cG9ydCB2YXIgUmFpbFR5cGU7XG4oZnVuY3Rpb24gKFJhaWxUeXBlKSB7XG4gICAgUmFpbFR5cGVbUmFpbFR5cGVbXCJDaXJjbGVcIl0gPSAwXSA9IFwiQ2lyY2xlXCI7XG4gICAgUmFpbFR5cGVbUmFpbFR5cGVbXCJSZWN0XCJdID0gMV0gPSBcIlJlY3RcIjtcbiAgICBSYWlsVHlwZVtSYWlsVHlwZVtcIkN1c3RvbVwiXSA9IDk5XSA9IFwiQ3VzdG9tXCI7XG59KShSYWlsVHlwZSB8fCAoUmFpbFR5cGUgPSB7fSkpO1xuZXhwb3J0IHZhciBDb2x1bW5UeXBlO1xuKGZ1bmN0aW9uIChDb2x1bW5UeXBlKSB7XG4gICAgQ29sdW1uVHlwZVtDb2x1bW5UeXBlW1wiQ2lyY2xlXCJdID0gMF0gPSBcIkNpcmNsZVwiO1xuICAgIENvbHVtblR5cGVbQ29sdW1uVHlwZVtcIlJlY3RcIl0gPSAxXSA9IFwiUmVjdFwiO1xuICAgIENvbHVtblR5cGVbQ29sdW1uVHlwZVtcIkN1c3RvbVwiXSA9IDk5XSA9IFwiQ3VzdG9tXCI7XG59KShDb2x1bW5UeXBlIHx8IChDb2x1bW5UeXBlID0ge30pKTtcbmV4cG9ydCBjb25zdCBDb21wb25lbnRQYXJhbVNldHRpbmdzID0ge1xuICAgIGhvcml6b250YWxTdGVwOiB7IHRpdGxlOiBcIuatpemVv1wiLCBtaW46IDEsIG1heDogMTAwMDAwLCBzdGVwOiAyMCwgdW5pdDogJ+mVvycsIHByZWNpc2lvbjogMCwgfSxcbiAgICB2ZXJ0aWNhbFN0ZXA6IHsgdGl0bGU6IFwi5q2l6ZW/XCIsIG1pbjogMSwgbWF4OiAxMDAwMDAsIHN0ZXA6IDIwLCB1bml0OiAn6auYJywgcHJlY2lzaW9uOiAwLCB9LFxuICAgIHN0YXJ0V2lkdGg6IHsgdGl0bGU6IFwi5a695bqmXCIsIG1pbjogMSwgbWF4OiAxMDAwMDAsIHN0ZXA6IDUwLCB1bml0OiAn6LW3JywgcHJlY2lzaW9uOiAwLCB9LFxuICAgIGVuZFdpZHRoOiB7IHRpdGxlOiBcIuWuveW6plwiLCBtaW46IDEsIG1heDogMTAwMDAwLCBzdGVwOiA1MCwgdW5pdDogJ+e7iCcsIHByZWNpc2lvbjogMCwgfSxcbiAgICBwbGF0Zm9ybUxlbmd0aDogeyB0aXRsZTogXCLplb/luqZcIiwgbWluOiAxMDAsIG1heDogMTAwMDAwLCBzdGVwOiA1MCwgdW5pdDogJycsIHByZWNpc2lvbjogMCwgfSxcbiAgICB0eXBlOiB7XG4gICAgICAgIC8vIHJhZGlvVmFsdWVzOiBbQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyLCBDb21wb25lbnRUeXBlLkNpcmN1bGFyU3RhaXIsIENvbXBvbmVudFR5cGUuUGxhdGZvcm1dLFxuICAgICAgICAvLyB0ZXh0czogW1wi55u06Zi2XCIsIFwi5peL6L2s6Zi25qKvXCIsIFwi5bmz5Y+wXCJdLFxuICAgICAgICB0aXRsZTogXCLnsbvlnotcIixcbiAgICAgICAgcmFkaW9PcHRpb25zOiBbXG4gICAgICAgICAgICB7IHZhbHVlOiBDb21wb25lbnRUeXBlLlN0cmFpZ2h0U3RhaXIsIHRleHQ6IFwi55u06Zi2XCIgfSxcbiAgICAgICAgICAgIHsgdmFsdWU6IENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpciwgdGV4dDogXCLml4vovazpmLbmoq9cIiB9LFxuICAgICAgICAgICAgeyB2YWx1ZTogQ29tcG9uZW50VHlwZS5QbGF0Zm9ybSwgdGV4dDogXCLlubPlj7BcIiB9LFxuICAgICAgICBdXG4gICAgfSxcbiAgICB1cHdhcmQ6IHtcbiAgICAgICAgLy8gcmFkaW9WYWx1ZXM6IFsxLCAwXSxcbiAgICAgICAgLy8gdGV4dHM6IFtcIuWQkeS4ilwiLCBcIuWQkeS4i1wiXSxcbiAgICAgICAgdGl0bGU6IFwi5pa55ZCRXCIsXG4gICAgICAgIHJhZGlvT3B0aW9uczogW1xuICAgICAgICAgICAgeyB2YWx1ZTogdHJ1ZSwgdGV4dDogXCLlkJHkuIpcIiB9LFxuICAgICAgICAgICAgeyB2YWx1ZTogZmFsc2UsIHRleHQ6IFwi5ZCR5LiLXCIgfSxcbiAgICAgICAgXVxuICAgIH0sXG4gICAgcGxhdGZvcm1UaGlja25lc3M6IHsgdGl0bGU6IFwi5Y6a5bqmXCIsIG1pbjogMSwgbWF4OiAxMDAwMDAsIHN0ZXA6IDEwLCB1bml0OiAnJywgcHJlY2lzaW9uOiAwLCB9LFxuICAgIG1hdGVyaWFsOiB7IHRpdGxlOiAn5p2Q6LSoJyB9LFxuICAgIHN0YWlyTWF0ZXJpYWw6IHsgdGl0bGU6ICfpmLbmoq/mnZDotKgnIH0sXG4gICAgcGxhdGZvcm1NYXRlcmlhbDogeyB0aXRsZTogJ+W5s+WPsOadkOi0qCcgfSxcbiAgICBoYW5kcmFpbDoge1xuICAgICAgICB0aXRsZTogJ+WQr+eUqOagj+adhicsXG4gICAgICAgIGhlaWdodDogeyB0aXRsZTogXCLpq5jluqZcIiwgbWluOiAxLCBtYXg6IDEwMDAwMCwgc3RlcDogMTAsIHVuaXQ6ICcnLCBwcmVjaXNpb246IDAsIH0sXG4gICAgICAgIHJhaWw6IHtcbiAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogXCLmoLflvI9cIixcbiAgICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IFJhaWxUeXBlLkNpcmNsZSwgbGFiZWw6IFwi5ZyG5b2iXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogUmFpbFR5cGUuUmVjdCwgbGFiZWw6IFwi5pa55b2iXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgLy8geyB2YWx1ZTogUmFpbFR5cGUuQ3VzdG9tLCBsYWJlbDogXCLmi77lj5ZcIiB9LFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGNvbHVtbjoge1xuICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIuagt+W8j1wiLFxuICAgICAgICAgICAgICAgIHNlbGVjdE9wdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogQ29sdW1uVHlwZS5DaXJjbGUsIGxhYmVsOiBcIuWchuW9olwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IENvbHVtblR5cGUuUmVjdCwgbGFiZWw6IFwi5pa55b2iXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgLy8geyB2YWx1ZTogQ29sdW1uVHlwZS5DdXN0b20sIGxhYmVsOiBcIuaLvuWPllwiIH0sXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0ZXA6IHsgdGl0bGU6IFwi6Ze06ZqUXCIsIG1pbjogMSwgbWF4OiAxMDAwMDAsIHN0ZXA6IDEwLCB1bml0OiAnJywgcHJlY2lzaW9uOiAwLCB9LFxuICAgICAgICB9LFxuICAgICAgICBjb21wb25lbnRQYXJhbToge1xuICAgICAgICAgICAgcmFkaXVzOiB7IHRpdGxlOiBcIuWNiuW+hFwiLCBtaW46IDEsIG1heDogMTAwMDAwLCBzdGVwOiAxLCB1bml0OiAnJywgcHJlY2lzaW9uOiAwLCB9LFxuICAgICAgICAgICAgd2lkdGg6IHsgdGl0bGU6IFwi5a695bqmXCIsIG1pbjogMSwgbWF4OiAxMDAwMDAsIHN0ZXA6IDEsIHVuaXQ6ICcnLCBwcmVjaXNpb246IDAsIH0sXG4gICAgICAgICAgICBoZWlnaHQ6IHsgdGl0bGU6IFwi6auY5bqmXCIsIG1pbjogMSwgbWF4OiAxMDAwMDAsIHN0ZXA6IDEsIHVuaXQ6ICcnLCBwcmVjaXNpb246IDAsIH0sXG4gICAgICAgIH1cbiAgICB9XG59O1xuZXhwb3J0IHZhciBNYXRlcmlhbEFzc2lnblR5cGU7XG4oZnVuY3Rpb24gKE1hdGVyaWFsQXNzaWduVHlwZSkge1xuICAgIE1hdGVyaWFsQXNzaWduVHlwZVtcIlN0YWlyT3ZlcmFsbFwiXSA9IFwic3RhaXJPdmVyYWxsXCI7XG4gICAgTWF0ZXJpYWxBc3NpZ25UeXBlW1wiUGxhdGZvcm1PdmVyYWxsXCJdID0gXCJwbGF0Zm9ybU92ZXJhbGxcIjtcbiAgICBNYXRlcmlhbEFzc2lnblR5cGVbXCJSYWlsXCJdID0gXCJyYWlsXCI7XG4gICAgTWF0ZXJpYWxBc3NpZ25UeXBlW1wiQ29sdW1uXCJdID0gXCJjb2x1bW5cIjtcbn0pKE1hdGVyaWFsQXNzaWduVHlwZSB8fCAoTWF0ZXJpYWxBc3NpZ25UeXBlID0ge30pKTtcbmV4cG9ydCBmdW5jdGlvbiBnZXRDb21wb25lbnRUaXRsZShjb21wb25lbnRUeXBlKSB7XG4gICAgaWYgKGNvbXBvbmVudFR5cGUgPT09IENvbXBvbmVudFR5cGUuU3RyYWlnaHRTdGFpcikge1xuICAgICAgICByZXR1cm4gJ+mYtic7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNvbXBvbmVudFR5cGUgPT09IENvbXBvbmVudFR5cGUuQ2lyY3VsYXJTdGFpcikge1xuICAgICAgICByZXR1cm4gJ+mYtic7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gJ+WPsCc7XG4gICAgfVxufVxuZXhwb3J0IGNvbnN0IEhhbmRyYWlsRGVmYXVsdE9mZnNldExlbmd0aCA9IDQwO1xuZXhwb3J0IGNvbnN0IERlZmF1bHRTdGFpclBhcmFtID0ge1xuICAgIGhvcml6b250YWxTdGVwOiAyMDAsXG4gICAgdmVydGljYWxTdGVwOiAyMDAsXG4gICAgc3RhcnRXaWR0aDogMTAwMCxcbiAgICBlbmRXaWR0aDogMTAwMCxcbiAgICB1cHdhcmQ6IHRydWUsXG4gICAgcGxhdGZvcm1UaGlja25lc3M6IDEwMCxcbiAgICBzdGFpck1hdGVyaWFsOiBQcmVzZXRNYXRlcmlhbHMuU3RhaXIsXG4gICAgcGxhdGZvcm1NYXRlcmlhbDogUHJlc2V0TWF0ZXJpYWxzLlBsYXRmb3JtLFxuICAgIGhhbmRyYWlsOiB7XG4gICAgICAgIHN1cHBvcnQ6IHRydWUsXG4gICAgICAgIGhlaWdodDogNDAwLFxuICAgICAgICByYWlsOiB7XG4gICAgICAgICAgICB0eXBlOiBSYWlsVHlwZS5DaXJjbGUsXG4gICAgICAgICAgICBwYXJhbTogeyByYWRpdXM6IDE2LCB3aWR0aDogNDAsIGhlaWdodDogMzAsIH0sXG4gICAgICAgICAgICBtYXRlcmlhbDogUHJlc2V0TWF0ZXJpYWxzLkhhbmRyYWlsLnJhaWwsXG4gICAgICAgIH0sXG4gICAgICAgIGNvbHVtbjoge1xuICAgICAgICAgICAgdHlwZTogQ29sdW1uVHlwZS5DaXJjbGUsXG4gICAgICAgICAgICBzdGVwOiA1MDAsXG4gICAgICAgICAgICBwYXJhbTogeyByYWRpdXM6IDgsIHdpZHRoOiAxMiwgaGVpZ2h0OiAxMiwgfSxcbiAgICAgICAgICAgIG1hdGVyaWFsOiBQcmVzZXRNYXRlcmlhbHMuSGFuZHJhaWwuY29sdW1uLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgc3RlcFByb3BvcnRpb25hbDogdHJ1ZSxcbiAgICB3aWR0aFByb3BvcnRpb25hbDogdHJ1ZSxcbn07XG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVmYXVsdFN0YWlyUGFyYW0oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaG9yaXpvbnRhbFN0ZXA6IDI1MCxcbiAgICAgICAgdmVydGljYWxTdGVwOiAyNTAsXG4gICAgICAgIHN0YXJ0V2lkdGg6IDEwMDAsXG4gICAgICAgIGVuZFdpZHRoOiAxMDAwLFxuICAgICAgICB1cHdhcmQ6IHRydWUsXG4gICAgICAgIHBsYXRmb3JtVGhpY2tuZXNzOiAyMDAsXG4gICAgICAgIHN0YWlyTWF0ZXJpYWw6IFByZXNldE1hdGVyaWFscy5TdGFpcixcbiAgICAgICAgcGxhdGZvcm1NYXRlcmlhbDogUHJlc2V0TWF0ZXJpYWxzLlBsYXRmb3JtLFxuICAgICAgICBoYW5kcmFpbDoge1xuICAgICAgICAgICAgc3VwcG9ydDogdHJ1ZSxcbiAgICAgICAgICAgIGhlaWdodDogNTAwLFxuICAgICAgICAgICAgcmFpbDoge1xuICAgICAgICAgICAgICAgIHR5cGU6IFJhaWxUeXBlLkNpcmNsZSxcbiAgICAgICAgICAgICAgICBwYXJhbTogeyByYWRpdXM6IDIwLCB3aWR0aDogNjAsIGhlaWdodDogMzAsIH0sXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWw6IFByZXNldE1hdGVyaWFscy5IYW5kcmFpbC5yYWlsLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbHVtbjoge1xuICAgICAgICAgICAgICAgIHR5cGU6IENvbHVtblR5cGUuQ2lyY2xlLFxuICAgICAgICAgICAgICAgIHN0ZXA6IDUwMCxcbiAgICAgICAgICAgICAgICBwYXJhbTogeyByYWRpdXM6IDgsIHdpZHRoOiAxNiwgaGVpZ2h0OiAxNiwgfSxcbiAgICAgICAgICAgICAgICBtYXRlcmlhbDogUHJlc2V0TWF0ZXJpYWxzLkhhbmRyYWlsLmNvbHVtbixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHN0ZXBQcm9wb3J0aW9uYWw6IERlZmF1bHRTdGFpclBhcmFtLnN0ZXBQcm9wb3J0aW9uYWwsXG4gICAgICAgIHdpZHRoUHJvcG9ydGlvbmFsOiBEZWZhdWx0U3RhaXJQYXJhbS53aWR0aFByb3BvcnRpb25hbCxcbiAgICB9O1xufVxuZXhwb3J0IGNvbnN0IERlZmF1bHRDb21wb25lbnRQYXJhbSA9IHtcbiAgICBpbmRleDogMCxcbiAgICBob3Jpem9udGFsU3RlcDogRGVmYXVsdFN0YWlyUGFyYW0uaG9yaXpvbnRhbFN0ZXAsXG4gICAgdmVydGljYWxTdGVwOiBEZWZhdWx0U3RhaXJQYXJhbS52ZXJ0aWNhbFN0ZXAsXG4gICAgc3RhcnRXaWR0aDogRGVmYXVsdFN0YWlyUGFyYW0uc3RhcnRXaWR0aCxcbiAgICBlbmRXaWR0aDogRGVmYXVsdFN0YWlyUGFyYW0uZW5kV2lkdGgsXG4gICAgb2Zmc2V0V2lkdGg6IDAsXG4gICAgd2l0aE9mZnNldDogZmFsc2UsXG4gICAgcGxhdGZvcm1MZW5ndGg6IDIwMDAsXG4gICAgdHlwZTogQ29tcG9uZW50VHlwZS5TdHJhaWdodFN0YWlyLFxuICAgIHVwd2FyZDogRGVmYXVsdFN0YWlyUGFyYW0udXB3YXJkLFxuICAgIHBsYXRmb3JtVGhpY2tuZXNzOiBEZWZhdWx0U3RhaXJQYXJhbS5wbGF0Zm9ybVRoaWNrbmVzcyxcbiAgICBzdGVwUHJvcG9ydGlvbmFsOiB0cnVlLFxuICAgIHdpZHRoUHJvcG9ydGlvbmFsOiB0cnVlLFxuICAgIHBsYXRmb3JtTGVuZ3RoTG9ja2VkOiBmYWxzZSxcbiAgICAvLyBzdGVwVHlwZTogU3RlcFR5cGUuTm9ybWFsLFxuICAgIC8vIGNvcm5lclR5cGU6IENvcm5lclR5cGUuUmVjdGFuZ2xlLFxufTtcbmV4cG9ydCB2YXIgQ29tcG9uZW50RGlyZWN0aW9uVHlwZTtcbihmdW5jdGlvbiAoQ29tcG9uZW50RGlyZWN0aW9uVHlwZSkge1xuICAgIENvbXBvbmVudERpcmVjdGlvblR5cGVbQ29tcG9uZW50RGlyZWN0aW9uVHlwZVtcIkZyb250XCJdID0gMF0gPSBcIkZyb250XCI7XG4gICAgQ29tcG9uZW50RGlyZWN0aW9uVHlwZVtDb21wb25lbnREaXJlY3Rpb25UeXBlW1wiUmlnaHRGcm9udFwiXSA9IDFdID0gXCJSaWdodEZyb250XCI7XG4gICAgQ29tcG9uZW50RGlyZWN0aW9uVHlwZVtDb21wb25lbnREaXJlY3Rpb25UeXBlW1wiUmlnaHRcIl0gPSAyXSA9IFwiUmlnaHRcIjtcbiAgICBDb21wb25lbnREaXJlY3Rpb25UeXBlW0NvbXBvbmVudERpcmVjdGlvblR5cGVbXCJMZWZ0XCJdID0gM10gPSBcIkxlZnRcIjtcbiAgICBDb21wb25lbnREaXJlY3Rpb25UeXBlW0NvbXBvbmVudERpcmVjdGlvblR5cGVbXCJMZWZ0RnJvbnRcIl0gPSA0XSA9IFwiTGVmdEZyb250XCI7XG59KShDb21wb25lbnREaXJlY3Rpb25UeXBlIHx8IChDb21wb25lbnREaXJlY3Rpb25UeXBlID0ge30pKTtcbmV4cG9ydCB2YXIgQ2lyY3VsYXJTaWRlO1xuKGZ1bmN0aW9uIChDaXJjdWxhclNpZGUpIHtcbiAgICBDaXJjdWxhclNpZGVbQ2lyY3VsYXJTaWRlW1wiTGVmdFwiXSA9IDBdID0gXCJMZWZ0XCI7XG4gICAgQ2lyY3VsYXJTaWRlW0NpcmN1bGFyU2lkZVtcIlJpZ2h0XCJdID0gMV0gPSBcIlJpZ2h0XCI7XG59KShDaXJjdWxhclNpZGUgfHwgKENpcmN1bGFyU2lkZSA9IHt9KSk7XG5leHBvcnQgZnVuY3Rpb24gaXNBeGlzVmFsaWQoYXhpcykge1xuICAgIHJldHVybiBheGlzID09PSBcIlhcIiAvKiBBeGlzLlggKi8gfHwgYXhpcyA9PT0gXCItWFwiIC8qIEF4aXMuWE1pbnVzICovIHx8IGF4aXMgPT09IFwiWVwiIC8qIEF4aXMuWSAqLyB8fCBheGlzID09PSBcIi1ZXCIgLyogQXhpcy5ZTWludXMgKi8gfHwgYXhpcyA9PT0gXCJaXCIgLyogQXhpcy5aICovIHx8IGF4aXMgPT09IFwiLVpcIiAvKiBBeGlzLlpNaW51cyAqLztcbn1cbiIsImltcG9ydCB7IGRyYXdTdGFpcnNUb29sIH0gZnJvbSBcIi4vaW5kZXhcIjtcbmltcG9ydCB7IERpcmVjdGlvblgsIERpcmVjdGlvblksIERpcmVjdGlvblogfSBmcm9tIFwiLi9jb25zdHNcIjtcbmltcG9ydCB7IENvbHVtblR5cGUsIENvb3JkRGVsaW1pdGVyLCBEZWZhdWx0Q29tcG9uZW50UGFyYW0sIERlZmF1bHRTdGFpclBhcmFtLCBEZWxpbWl0ZXIsIGdldERlZmF1bHRTdGFpclBhcmFtLCBSYWlsVHlwZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5leHBvcnQgZnVuY3Rpb24gaXNLQXJjaEZhY2UoZW50aXR5KSB7XG4gICAgcmV0dXJuICEhZW50aXR5ICYmIChlbnRpdHkuZ2V0VHlwZSgpID09PSBLQXJjaEZhY2VUeXBlLk5vblBsYW5hciB8fCBlbnRpdHkuZ2V0VHlwZSgpID09PSBLQXJjaEZhY2VUeXBlLlBsYW5hcik7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNLR3JvdXBJbnN0YW5jZShlbnRpdHkpIHtcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS0VudGl0eVR5cGUuR3JvdXBJbnN0YW5jZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0tGYWNlKGVudGl0eSkge1xuICAgIHJldHVybiAhIWVudGl0eSAmJiBlbnRpdHkuZ2V0VHlwZSgpID09PSBLRW50aXR5VHlwZS5GYWNlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzS0VkZ2UoZW50aXR5KSB7XG4gICAgcmV0dXJuICEhZW50aXR5ICYmIGVudGl0eS5nZXRUeXBlKCkgPT09IEtFbnRpdHlUeXBlLkVkZ2U7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNLVmVydGV4KGVudGl0eSkge1xuICAgIHJldHVybiAhIWVudGl0eSAmJiBlbnRpdHkuZ2V0VHlwZSgpID09PSBLRW50aXR5VHlwZS5WZXJ0ZXg7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNLQXV4aWxpYXJ5Qm91bmRlZEN1cnZlKGVudGl0eSkge1xuICAgIHJldHVybiAhIWVudGl0eSAmJiBlbnRpdHkuZ2V0VHlwZSgpID09PSBLRW50aXR5VHlwZS5BdXhpbGlhcnlCb3VuZGVkQ3VydmU7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNLQXV4aWxpYXJ5TGluZShlbnRpdHkpIHtcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS0VudGl0eVR5cGUuQXV4aWxpYXJ5TGluZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0tQbGFuZShlbnRpdHkpIHtcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgZW50aXR5LmdldFR5cGUoKSA9PT0gS1N1cmZhY2VUeXBlLlBsYW5lO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzS0xpbmVTZWdtZW50M2QoZW50aXR5KSB7XG4gICAgcmV0dXJuICEhZW50aXR5ICYmICEhZW50aXR5LmRpcmVjdGlvbjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0tBcmMzZChlbnRpdHkpIHtcbiAgICByZXR1cm4gISFlbnRpdHkgJiYgISFlbnRpdHkuY2lyY2xlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeU1hdGVyaWFsKG1hdGVyaWFsKSB7XG4gICAgbGV0IHZhbHVlID0gJyc7XG4gICAgaWYgKG1hdGVyaWFsLm1hdGVyaWFsSWQpIHtcbiAgICAgICAgdmFsdWUgKz0gYG1pZD0ke21hdGVyaWFsLm1hdGVyaWFsSWR9JHtEZWxpbWl0ZXJ9YDtcbiAgICB9XG4gICAgaWYgKG1hdGVyaWFsLmJnaWQpIHtcbiAgICAgICAgdmFsdWUgKz0gYGJpZD0ke21hdGVyaWFsLmJnaWR9JHtEZWxpbWl0ZXJ9YDtcbiAgICB9XG4gICAgaWYgKG1hdGVyaWFsLmltZ1VybCkge1xuICAgICAgICB2YWx1ZSArPSBgaW1nPSR7bWF0ZXJpYWwuaW1nVXJsfSR7RGVsaW1pdGVyfWA7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZS5zbGljZSgwLCB2YWx1ZS5sZW5ndGggLSAxKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZU1hdGVyaWFsKHZhbHVlKSB7XG4gICAgY29uc3QgbWF0ZXJpYWwgPSB7fTtcbiAgICBjb25zdCBpdGVtcyA9IHZhbHVlLnNwbGl0KERlbGltaXRlcik7XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgIGNvbnN0IGtleVZhbHVlID0gaXRlbS5zcGxpdCgnPScpO1xuICAgICAgICBpZiAoa2V5VmFsdWUubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGtleVZhbHVlWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWlkJzpcbiAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWwubWF0ZXJpYWxJZCA9IGtleVZhbHVlWzFdO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdiaWQnOlxuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbC5iZ2lkID0ga2V5VmFsdWVbMV07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2ltZyc6XG4gICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsLmltZ1VybCA9IGtleVZhbHVlWzFdO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBtYXRlcmlhbDtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5U3RhaXJQYXJhbShwYXJhbSkge1xuICAgIGxldCB2YWx1ZSA9ICcnO1xuICAgIHZhbHVlICs9IGBhPSR7cGFyYW0uaG9yaXpvbnRhbFN0ZXB9JHtEZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgYj0ke3BhcmFtLnZlcnRpY2FsU3RlcH0ke0RlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGBjPSR7cGFyYW0uc3RhcnRXaWR0aH0ke0RlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGBkPSR7cGFyYW0uZW5kV2lkdGh9JHtEZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgZT0ke3BhcmFtLnVwd2FyZCA/IDEgOiAwfSR7RGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYGY9JHtwYXJhbS5wbGF0Zm9ybVRoaWNrbmVzc31gO1xuICAgIGlmIChwYXJhbS5oYW5kcmFpbC5zdXBwb3J0KSB7XG4gICAgICAgIGNvbnN0IHsgaGFuZHJhaWw6IHsgaGVpZ2h0LCByYWlsLCBjb2x1bW4gfSB9ID0gcGFyYW07XG4gICAgICAgIHZhbHVlICs9IGBnPSR7aGVpZ2h0fSR7RGVsaW1pdGVyfWA7XG4gICAgICAgIHZhbHVlICs9IGBoPSR7cmFpbC50eXBlfSR7RGVsaW1pdGVyfWA7XG4gICAgICAgIGlmIChyYWlsLnR5cGUgPT09IFJhaWxUeXBlLkNpcmNsZSAmJiByYWlsLnBhcmFtLnJhZGl1cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YWx1ZSArPSBgaT0ke3JhaWwucGFyYW0ucmFkaXVzfSR7RGVsaW1pdGVyfWA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocmFpbC50eXBlID09PSBSYWlsVHlwZS5SZWN0KSB7XG4gICAgICAgICAgICBpZiAocmFpbC5wYXJhbS53aWR0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgKz0gYGo9JHtyYWlsLnBhcmFtLndpZHRofSR7RGVsaW1pdGVyfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmFpbC5wYXJhbS5oZWlnaHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHZhbHVlICs9IGBrPSR7cmFpbC5wYXJhbS5oZWlnaHR9JHtEZWxpbWl0ZXJ9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YWx1ZSArPSBgbD0ke2NvbHVtbi50eXBlfSR7RGVsaW1pdGVyfWA7XG4gICAgICAgIHZhbHVlICs9IGBtPSR7Y29sdW1uLnN0ZXB9JHtEZWxpbWl0ZXJ9YDtcbiAgICAgICAgaWYgKGNvbHVtbi50eXBlID09PSBDb2x1bW5UeXBlLkNpcmNsZSAmJiBjb2x1bW4ucGFyYW0ucmFkaXVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHZhbHVlICs9IGBuPSR7Y29sdW1uLnBhcmFtLnJhZGl1c30ke0RlbGltaXRlcn1gO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvbHVtbi50eXBlID09PSBDb2x1bW5UeXBlLlJlY3QpIHtcbiAgICAgICAgICAgIGlmIChjb2x1bW4ucGFyYW0ud2lkdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHZhbHVlICs9IGBvPSR7Y29sdW1uLnBhcmFtLndpZHRofSR7RGVsaW1pdGVyfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY29sdW1uLnBhcmFtLmhlaWdodCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgKz0gYHA9JHtjb2x1bW4ucGFyYW0uaGVpZ2h0fSR7RGVsaW1pdGVyfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlLnNsaWNlKDAsIHZhbHVlLmxlbmd0aCAtIDEpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlU3RhaXJQYXJhbSh2YWx1ZSkge1xuICAgIGNvbnN0IHBhcmFtID0gZ2V0RGVmYXVsdFN0YWlyUGFyYW0oKTtcbiAgICBjb25zdCBpdGVtcyA9IHZhbHVlLnNwbGl0KERlbGltaXRlcik7XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgIGNvbnN0IGtleVZhbHVlID0gaXRlbS5zcGxpdCgnPScpO1xuICAgICAgICBpZiAoa2V5VmFsdWUubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGtleVZhbHVlWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnYSc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmhvcml6b250YWxTdGVwID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdiJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0udmVydGljYWxTdGVwID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdjJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uc3RhcnRXaWR0aCA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZCc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmVuZFdpZHRoID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdlJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0udXB3YXJkID0ga2V5VmFsdWVbMV0gPT09ICcxJyA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZic6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnBsYXRmb3JtVGhpY2tuZXNzID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdnJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uaGFuZHJhaWwuaGVpZ2h0ID0gcGFyc2VGbG9hdChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2gnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5oYW5kcmFpbC5yYWlsLnR5cGUgPSBwYXJzZUZsb2F0KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnaSc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmhhbmRyYWlsLnJhaWwucGFyYW0ucmFkaXVzID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdqJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uaGFuZHJhaWwucmFpbC5wYXJhbS53aWR0aCA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnayc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmhhbmRyYWlsLnJhaWwucGFyYW0uaGVpZ2h0ID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdsJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uaGFuZHJhaWwuY29sdW1uLnR5cGUgPSBwYXJzZUZsb2F0KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbSc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmhhbmRyYWlsLmNvbHVtbi5zdGVwID0gcGFyc2VGbG9hdChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ24nOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5oYW5kcmFpbC5jb2x1bW4ucGFyYW0ucmFkaXVzID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdvJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uaGFuZHJhaWwuY29sdW1uLnBhcmFtLndpZHRoID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdwJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uaGFuZHJhaWwuY29sdW1uLnBhcmFtLmhlaWdodCA9IHBhcnNlSW50KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcGFyYW0uc3RlcFByb3BvcnRpb25hbCA9IERlZmF1bHRTdGFpclBhcmFtLnN0ZXBQcm9wb3J0aW9uYWw7XG4gICAgcGFyYW0ud2lkdGhQcm9wb3J0aW9uYWwgPSBEZWZhdWx0U3RhaXJQYXJhbS53aWR0aFByb3BvcnRpb25hbDtcbiAgICByZXR1cm4gcGFyYW07XG59XG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5Q29tcG9uZW50UGFyYW0ocGFyYW0pIHtcbiAgICBsZXQgdmFsdWUgPSAnJztcbiAgICB2YWx1ZSArPSBgYT0ke3BhcmFtLmluZGV4fSR7RGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYGI9JHtwYXJhbS5ob3Jpem9udGFsU3RlcH0ke0RlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGBjPSR7cGFyYW0udmVydGljYWxTdGVwfSR7RGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYGQ9JHtwYXJhbS5zdGFydFdpZHRofSR7RGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYGU9JHtwYXJhbS5lbmRXaWR0aH0ke0RlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGBmPSR7cGFyYW0ub2Zmc2V0V2lkdGh9JHtEZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgZz0ke3BhcmFtLnBsYXRmb3JtTGVuZ3RofSR7RGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYGg9JHtwYXJhbS50eXBlfSR7RGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYGk9JHtwYXJhbS51cHdhcmQgPyAxIDogMH0ke0RlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGBqPSR7cGFyYW0ucGxhdGZvcm1UaGlja25lc3N9YDtcbiAgICByZXR1cm4gdmFsdWU7XG59XG5leHBvcnQgZnVuY3Rpb24gcGFyc2VDb21wb25lbnRQYXJhbSh2YWx1ZSkge1xuICAgIGNvbnN0IHBhcmFtID0gT2JqZWN0LmFzc2lnbih7fSwgRGVmYXVsdENvbXBvbmVudFBhcmFtKTtcbiAgICBjb25zdCBpdGVtcyA9IHZhbHVlLnNwbGl0KERlbGltaXRlcik7XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgIGNvbnN0IGtleVZhbHVlID0gaXRlbS5zcGxpdCgnPScpO1xuICAgICAgICBpZiAoa2V5VmFsdWUubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGtleVZhbHVlWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnYSc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmluZGV4ID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdiJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uaG9yaXpvbnRhbFN0ZXAgPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2MnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS52ZXJ0aWNhbFN0ZXAgPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2QnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5zdGFydFdpZHRoID0gcGFyc2VJbnQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdlJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uZW5kV2lkdGggPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2YnOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5vZmZzZXRXaWR0aCA9IHBhcnNlRmxvYXQoa2V5VmFsdWVbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdnJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0ucGxhdGZvcm1MZW5ndGggPSBwYXJzZUZsb2F0KGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnaCc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnR5cGUgPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2knOlxuICAgICAgICAgICAgICAgICAgICBwYXJhbS51cHdhcmQgPSBrZXlWYWx1ZVsxXSA9PT0gJzEnID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdqJzpcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0ucGxhdGZvcm1UaGlja25lc3MgPSBwYXJzZUludChrZXlWYWx1ZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHBhcmFtLnN0ZXBQcm9wb3J0aW9uYWwgPSBEZWZhdWx0Q29tcG9uZW50UGFyYW0uc3RlcFByb3BvcnRpb25hbDtcbiAgICBwYXJhbS53aWR0aFByb3BvcnRpb25hbCA9IERlZmF1bHRDb21wb25lbnRQYXJhbS53aWR0aFByb3BvcnRpb25hbDtcbiAgICBwYXJhbS5wbGF0Zm9ybUxlbmd0aExvY2tlZCA9IHRydWU7XG4gICAgcGFyYW0ubW9kZWxFZGl0aW5nID0gdHJ1ZTtcbiAgICBwYXJhbS53aXRoT2Zmc2V0ID0gIWlzRXF1YWwocGFyYW0ub2Zmc2V0V2lkdGgsIDApO1xuICAgIHJldHVybiBwYXJhbTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnlTdGFydEVuZChzdGFydCwgZW5kKSB7XG4gICAgbGV0IHZhbHVlID0gJyc7XG4gICAgdmFsdWUgKz0gYCR7c3RhcnQueH0ke0Nvb3JkRGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYCR7c3RhcnQueX0ke0Nvb3JkRGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYCR7c3RhcnQuen0ke0RlbGltaXRlcn1gO1xuICAgIHZhbHVlICs9IGAke2VuZC54fSR7Q29vcmREZWxpbWl0ZXJ9YDtcbiAgICB2YWx1ZSArPSBgJHtlbmQueX0ke0Nvb3JkRGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYCR7ZW5kLnp9YDtcbiAgICByZXR1cm4gdmFsdWU7XG59XG5leHBvcnQgZnVuY3Rpb24gcGFyc2VMaW5lU2VnM2QodmFsdWUpIHtcbiAgICBjb25zdCBpdGVtcyA9IHZhbHVlLnNwbGl0KERlbGltaXRlcik7XG4gICAgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gMikge1xuICAgICAgICBjb25zdCBzdGFydEtleVZhbHVlID0gaXRlbXNbMF0uc3BsaXQoQ29vcmREZWxpbWl0ZXIpO1xuICAgICAgICBjb25zdCBlbmRLZXlWYWx1ZSA9IGl0ZW1zWzFdLnNwbGl0KENvb3JkRGVsaW1pdGVyKTtcbiAgICAgICAgaWYgKHN0YXJ0S2V5VmFsdWUubGVuZ3RoID09PSAzICYmIGVuZEtleVZhbHVlLmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QocGFyc2VGbG9hdChzdGFydEtleVZhbHVlWzBdKSwgcGFyc2VGbG9hdChzdGFydEtleVZhbHVlWzFdKSwgcGFyc2VGbG9hdChzdGFydEtleVZhbHVlWzJdKSk7XG4gICAgICAgICAgICBjb25zdCBlbmQgPSBHZW9tTGliLmNyZWF0ZVBvaW50M2QocGFyc2VGbG9hdChlbmRLZXlWYWx1ZVswXSksIHBhcnNlRmxvYXQoZW5kS2V5VmFsdWVbMV0pLCBwYXJzZUZsb2F0KGVuZEtleVZhbHVlWzJdKSk7XG4gICAgICAgICAgICByZXR1cm4geyBzdGFydCwgZW5kIH07XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gcGFyc2VTdGFydEVuZCh2YWx1ZSkge1xuICAgIGNvbnN0IGl0ZW1zID0gdmFsdWUuc3BsaXQoRGVsaW1pdGVyKTtcbiAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0S2V5VmFsdWUgPSBpdGVtc1swXS5zcGxpdChDb29yZERlbGltaXRlcik7XG4gICAgICAgIGNvbnN0IGVuZEtleVZhbHVlID0gaXRlbXNbMV0uc3BsaXQoQ29vcmREZWxpbWl0ZXIpO1xuICAgICAgICBpZiAoc3RhcnRLZXlWYWx1ZS5sZW5ndGggPT09IDMgJiYgZW5kS2V5VmFsdWUubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IEdlb21MaWIuY3JlYXRlUG9pbnQzZChwYXJzZUZsb2F0KHN0YXJ0S2V5VmFsdWVbMF0pLCBwYXJzZUZsb2F0KHN0YXJ0S2V5VmFsdWVbMV0pLCAwKTtcbiAgICAgICAgICAgIGNvbnN0IGVuZCA9IEdlb21MaWIuY3JlYXRlUG9pbnQzZChwYXJzZUZsb2F0KGVuZEtleVZhbHVlWzBdKSwgcGFyc2VGbG9hdChlbmRLZXlWYWx1ZVsxXSksIDApO1xuICAgICAgICAgICAgcmV0dXJuIHsgc3RhcnQsIGVuZCwgc3RhcnRIZWlnaHQ6IHBhcnNlRmxvYXQoc3RhcnRLZXlWYWx1ZVsyXSksIGVuZEhlaWdodDogcGFyc2VGbG9hdChlbmRLZXlWYWx1ZVsyXSkgfTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnlQb2ludDNkKHBvaW50KSB7XG4gICAgbGV0IHZhbHVlID0gJyc7XG4gICAgdmFsdWUgKz0gYCR7cG9pbnQueH0ke0Nvb3JkRGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYCR7cG9pbnQueX0ke0Nvb3JkRGVsaW1pdGVyfWA7XG4gICAgdmFsdWUgKz0gYCR7cG9pbnQuen1gO1xuICAgIHJldHVybiB2YWx1ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVZlY3RvcjNkKHZhbHVlKSB7XG4gICAgY29uc3QgaXRlbXMgPSB2YWx1ZS5zcGxpdChDb29yZERlbGltaXRlcik7XG4gICAgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gMykge1xuICAgICAgICBjb25zdCB2ZWN0b3IgPSBHZW9tTGliLmNyZWF0ZVZlY3RvcjNkKHBhcnNlRmxvYXQoaXRlbXNbMF0pLCBwYXJzZUZsb2F0KGl0ZW1zWzFdKSwgcGFyc2VGbG9hdChpdGVtc1syXSkpO1xuICAgICAgICByZXR1cm4gdmVjdG9yO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnlCYXNlQ29tcG9uZW50KGJhc2VTZWdtZW50LCBsaW5lM2RJbmRleCkge1xuICAgIGxldCB2YWx1ZSA9ICcnO1xuICAgIHZhbHVlICs9IGAke2Jhc2VTZWdtZW50LnBhcmFtLmluZGV4fWA7XG4gICAgaWYgKGxpbmUzZEluZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgKz0gYCR7Q29vcmREZWxpbWl0ZXJ9JHtsaW5lM2RJbmRleH1gO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG59XG5leHBvcnQgZnVuY3Rpb24gcGFyc2VCYXNlQ29tcG9uZW50KHZhbHVlKSB7XG4gICAgY29uc3QgaXRlbXMgPSB2YWx1ZS5zcGxpdChDb29yZERlbGltaXRlcik7XG4gICAgaWYgKHZhbHVlLmxlbmd0aCAmJiBpdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IGJhc2VDb21wb25lbnRJbmRleCA9IHBhcnNlSW50KGl0ZW1zWzBdKTtcbiAgICAgICAgbGV0IGxpbmUzZEluZGV4O1xuICAgICAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICBsaW5lM2RJbmRleCA9IHBhcnNlSW50KGl0ZW1zWzFdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBjb21wb25lbnRJbmRleDogYmFzZUNvbXBvbmVudEluZGV4LCBsaW5lM2RJbmRleCB9O1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0VxdWFsKGEsIGIsIHRvbGVyYW5jZSA9IDEpIHtcbiAgICByZXR1cm4gTWF0aC5hYnMoYSAtIGIpIDw9IHRvbGVyYW5jZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb29yZGluYXRlKG5vcm1hbCkge1xuICAgIGxldCBkeCA9IERpcmVjdGlvblg7XG4gICAgbGV0IGR5ID0gRGlyZWN0aW9uWjtcbiAgICBsZXQgZHogPSBub3JtYWwubm9ybWFsaXplZCgpO1xuICAgIGlmIChEaXJlY3Rpb25aLmlzUGFyYWxsZWwoZHopKSB7XG4gICAgICAgIGR4ID0gRGlyZWN0aW9uWS5jcm9zcyhkeikubm9ybWFsaXplZCgpO1xuICAgICAgICBkeSA9IGR6LmNyb3NzKGR4KS5ub3JtYWxpemVkKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBkeCA9IGR5LmNyb3NzKGR6KS5ub3JtYWxpemVkKCk7XG4gICAgICAgIGR5ID0gZHouY3Jvc3MoZHgpLm5vcm1hbGl6ZWQoKTtcbiAgICB9XG4gICAgcmV0dXJuIHsgZHgsIGR5LCBkeiB9O1xufVxubGV0IGlzSW5PcGVyYXRpb24gPSBmYWxzZTtcbmV4cG9ydCBmdW5jdGlvbiBzdGFydE9wZXJhdGlvbigpIHtcbiAgICBpc0luT3BlcmF0aW9uID0gdHJ1ZTtcbiAgICBhcHAuZ2V0QWN0aXZlRGVzaWduKCkuc3RhcnRPcGVyYXRpb24oKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb21taXRPcGVyYXRpb24oKSB7XG4gICAgYXBwLmdldEFjdGl2ZURlc2lnbigpLmNvbW1pdE9wZXJhdGlvbigpO1xuICAgIGlzSW5PcGVyYXRpb24gPSBmYWxzZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBhYm9ydE9wZXJhdGlvbigpIHtcbiAgICBhcHAuZ2V0QWN0aXZlRGVzaWduKCkuYWJvcnRPcGVyYXRpb24oKTtcbiAgICBpc0luT3BlcmF0aW9uID0gZmFsc2U7XG59XG5leHBvcnQgZnVuY3Rpb24gb25Nb2RlbENoYW5nZWQoY2hhbmdlcykge1xuICAgIGNvbnN0IGRlbGV0ZWQgPSBjaGFuZ2VzLmRlbGV0ZWQ7XG4gICAgY29uc3QgYWRkZWQgPSBjaGFuZ2VzLmFkZGVkO1xuICAgIC8vIGNvbnN0IGVkaXRNb2RlbCA9IGRyYXdTdGFpcnNUb29sLmdldEVkaXRNb2RlbCgpO1xuICAgIGlmICghaXNJbk9wZXJhdGlvbiAmJiAoKGRlbGV0ZWQgPT09IG51bGwgfHwgZGVsZXRlZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGVsZXRlZC5sZW5ndGgpIHx8IChhZGRlZCA9PT0gbnVsbCB8fCBhZGRlZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYWRkZWQubGVuZ3RoKSkpIHtcbiAgICAgICAgLy8gaWYgKGRlbGV0ZWQuc29tZShkZWxldGVHcm91cCA9PiBlZGl0TW9kZWwucGFyZW50LmRlZmluaXRpb25LZXkgPT09IGRlbGV0ZUdyb3VwLmdldEtleSgpKSkge1xuICAgICAgICBkcmF3U3RhaXJzVG9vbC5jbGVhckVkaXRNb2RlbCgpO1xuICAgICAgICAvLyB9XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGlzUGFydE9mRWRpdE1vZGVsKGVkaXRNb2RlbCwgZ3JvdXBJbnN0YW5jZSkge1xuICAgIHZhciBfYSwgX2IsIF9jO1xuICAgIGNvbnN0IGdyb3VwSW5zdGFuY2VLZXkgPSBncm91cEluc3RhbmNlLmdldEtleSgpO1xuICAgIHJldHVybiBlZGl0TW9kZWwucGFyZW50Lmluc3RhbmNlS2V5ID09PSBncm91cEluc3RhbmNlS2V5IHx8XG4gICAgICAgIFsuLi5lZGl0TW9kZWwuc3RhaXJzLnZhbHVlcygpXS5zb21lKGluc3RhbmNlRGF0YSA9PiBpbnN0YW5jZURhdGEuaW5zdGFuY2VLZXkgPT09IGdyb3VwSW5zdGFuY2VLZXkpIHx8XG4gICAgICAgIFsuLi5lZGl0TW9kZWwucGxhdGZvcm1zLnZhbHVlcygpXS5zb21lKGluc3RhbmNlRGF0YSA9PiBpbnN0YW5jZURhdGEuaW5zdGFuY2VLZXkgPT09IGdyb3VwSW5zdGFuY2VLZXkpIHx8XG4gICAgICAgICgoX2EgPSBlZGl0TW9kZWwuaGFuZHJhaWwpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5oYW5kcmFpbEluc3RhbmNlLmluc3RhbmNlS2V5KSA9PT0gZ3JvdXBJbnN0YW5jZUtleSB8fFxuICAgICAgICBbLi4uKCgoX2IgPSBlZGl0TW9kZWwuaGFuZHJhaWwpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5yYWlsSW5zdGFuY2VzKSB8fCBbXSkudmFsdWVzKCldLnNvbWUoaW5zdGFuY2VEYXRhID0+IGluc3RhbmNlRGF0YS5pbnN0YW5jZUtleSA9PT0gZ3JvdXBJbnN0YW5jZUtleSkgfHxcbiAgICAgICAgWy4uLigoKF9jID0gZWRpdE1vZGVsLmhhbmRyYWlsKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuY29sdW1uSW5zdGFuY2VzKSB8fCBbXSkudmFsdWVzKCldLnNvbWUoaW5zdGFuY2VEYXRhID0+IGluc3RhbmNlRGF0YS5pbnN0YW5jZUtleSA9PT0gZ3JvdXBJbnN0YW5jZUtleSk7XG59XG4iLCJleHBvcnQgdmFyIE1lc3NhZ2VUeXBlO1xuKGZ1bmN0aW9uIChNZXNzYWdlVHlwZSkge1xuICAgIE1lc3NhZ2VUeXBlW1wiRHJhd1N0YWlyVmlld01vdW50ZWRcIl0gPSBcImRyYXdTdGFpclZpZXdNb3VudGVkXCI7XG4gICAgTWVzc2FnZVR5cGVbXCJQcm9wZXJ0aWVzVmlzaWJsZVwiXSA9IFwicHJvcGVydGllc1Zpc2libGVcIjtcbiAgICBNZXNzYWdlVHlwZVtcIkRyYXdTdGFpck1vZGVsU2V0dGxlZFwiXSA9IFwiZHJhd1N0YWlyTW9kZWxTZXR0bGVkXCI7XG4gICAgTWVzc2FnZVR5cGVbXCJTdGFpclBhcmFtQ2hhbmdlZEJ5SW5wdXRcIl0gPSBcInN0YWlyUGFyYW1DaGFuZ2VkQnlJbnB1dFwiO1xuICAgIE1lc3NhZ2VUeXBlW1wiU3RhaXJQYXJhbUNoYW5nZWRCeURyYXdcIl0gPSBcInN0YWlyUGFyYW1DaGFuZ2VkQnlEcmF3XCI7XG4gICAgTWVzc2FnZVR5cGVbXCJQYXJhbUNoYW5nZWRCeUlucHV0XCJdID0gXCJwYXJhbUNoYW5nZWRCeUlucHV0XCI7XG4gICAgTWVzc2FnZVR5cGVbXCJQYXJhbUNoYW5nZWRCeURyYXdcIl0gPSBcInBhcmFtQ2hhbmdlZEJ5RHJhd1wiO1xuICAgIE1lc3NhZ2VUeXBlW1wiQ29tcG9uZW50QWRkZWRcIl0gPSBcImNvbXBvbmVudEFkZGVkXCI7XG4gICAgTWVzc2FnZVR5cGVbXCJSZW1vdmVDb21wb25lbnRcIl0gPSBcInJlbW92ZUNvbXBvbmVudFwiO1xuICAgIE1lc3NhZ2VUeXBlW1wiRm9jdXNDb21wb25lbnRJbmRleFwiXSA9IFwiZm9jdXNDb21wb25lbnRJbmRleFwiO1xuICAgIE1lc3NhZ2VUeXBlW1wiRm9jdXNDb21wb25lbnRJbmRleEJ5RHJhd1wiXSA9IFwiZm9jdXNDb21wb25lbnRJbmRleEJ5RHJhd1wiO1xuICAgIE1lc3NhZ2VUeXBlW1wiTWF0ZXJpYWxSZXBsYWNlQ2xpY2tcIl0gPSBcIm1hdGVyaWFsUmVwbGFjZUNsaWNrXCI7XG4gICAgTWVzc2FnZVR5cGVbXCJBY3RpdmF0ZURyYXdTdGFpcnNUb29sXCJdID0gXCJhY3RpdmF0ZURyYXdTdGFpcnNUb29sXCI7XG4gICAgTWVzc2FnZVR5cGVbXCJEZUFjdGl2YXRlRHJhd1N0YWlyc1Rvb2xcIl0gPSBcImRlQWN0aXZhdGVEcmF3U3RhaXJzVG9vbFwiO1xuICAgIE1lc3NhZ2VUeXBlW1wiTGVhdmVEcmF3U3RhaXJzVG9vbFwiXSA9IFwibGVhdmVEcmF3U3RhaXJzVG9vbFwiO1xufSkoTWVzc2FnZVR5cGUgfHwgKE1lc3NhZ2VUeXBlID0ge30pKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvbWFpbi9tYWluLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9