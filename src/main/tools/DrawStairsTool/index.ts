import { ComponentType, ComponentParam, Segment, ParamKey, StartEndKey, BaseLineSeg3dKey, StairModelKey, ComponentParamType, StairModelValue, CircleTangentKey, StairParam, DefaultStairParam } from "./types";
import { generateShape } from "./tempMeshUtils";
import { buildComponentInstance, generateMeshes } from "./meshUtils";
import { parseLineSeg3d, parseParam, parseStartEnd, parseVector3d } from "./utils";
import { getEmptySegment } from "./consts";
import { deActivateDrawStairsTool } from "../../../main/main";
import { MessageType } from "../../../main/types";

const design = app.getActiveDesign();
const selection = app.getSelection();
const pluginUI = app.getPluginUI();
const appView = app.getActiveView();
const toolHelper = app.getToolHelper();

type InstanceData = {
    instance: KGroupInstance;
    definitionKey: string;
    instanceKey: string;
}

type EditModel = {
    parent: InstanceData;
    child: Map<number, InstanceData>;
}

const DefaultFocusedComponentIndex = -1;

export class DrawStairsTool implements KTool {
    // private componentParam: ComponentParam = { ...DefaultComponentParam };
    private drawing = false;
    private focusedComponentIndex: number = DefaultFocusedComponentIndex;
    private segments: Segment[] = [];
    private stairParam?: StairParam;
    private editModel?: EditModel;

    onToolActive(): void {
        toolHelper.setExcludeInferenceTypes([
            KEntityType.Face, KEntityType.Edge, KEntityType.AuxiliaryBoundedCurve, KEntityType.AuxiliaryLine, KEntityType.AuxiliaryVertex,
            KEntityType.GroupInstance, KEntityType.Vertex, KArchFaceType.NonPlanar, KArchFaceType.Planar,
        ]);
        const firstSegment: Segment = getEmptySegment();
        firstSegment.startLocked = false;
        this.stairParam = DefaultStairParam;
        pluginUI.postMessage({ type: MessageType.DrawStairModelSettled, componentParams: [firstSegment.param], stairParam: this.stairParam, newStair: true }, '*');
        this.segments = [firstSegment];
        this.drawing = true;
        this.clearTempShapes();
        this.editModel = undefined;
        this.focusedComponentIndex = 0;
    }

    onToolDeactive(): void {
        toolHelper.setExcludeInferenceTypes([]);
        this.clear();
        if (this.editModel) {
            selection.add([this.editModel.parent.instance]);
        } else {
            pluginUI.postMessage({ type: MessageType.LeaveDrawStairsTool }, '*');
        }
        deActivateDrawStairsTool();
    }

    onMouseMove(event: KMouseEvent, inferenceResult?: KInferenceResult): void {
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
                } else {
                    if (this.segments.length > 1) {
                        const prevSegment = this.focusedComponentIndex === lastSegment.param.index ? this.segments[this.segments.length - 2] : this.segments.find(seg => seg.param.index === this.focusedComponentIndex);
                        // must be true
                        if (prevSegment?.param.type === ComponentType.Platform) {
                            const { moldShape: { vertices, tempLines } } = prevSegment;
                            let closestPoint: KPoint3d | undefined;
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
                    } else {
                        lastSegment.start = position;
                    }
                }
                if (lastSegment.param.type == ComponentType.Platform && !lastSegment.param.platformLengthLocked) {
                    pluginUI.postMessage({ type: MessageType.ParamChangedByDraw, componentParam: { ...lastSegment.param } }, '*');
                }
            }
        }
    }

    onLButtonUp(event: KMouseEvent, inferenceResult?: KInferenceResult): void {
        // console.log('onLButtonUp');
        if (inferenceResult) {
            // const position = inferenceResult.position;
            if (this.segments.length) {
                const lastSegment = this.segments[this.segments.length - 1];
                if (lastSegment.startLocked) {
                    console.log('push segment');
                    const { start, end, param: { type }, circleTangent } = lastSegment;
                    if (type === ComponentType.CircularStair && !circleTangent) {
                        lastSegment.circleTangent = end.subtracted(start).normalized();
                    } else {
                        lastSegment.endLocked = true;

                        const lastParam = lastSegment.param;
                        const nextSegment: Segment = {
                            ...getEmptySegment(),
                            start: lastSegment.end,
                            end: lastSegment.end,
                            startLocked: lastParam.type === ComponentType.Platform ? false : true,
                            startHeight: lastSegment.endHeight,
                            endHeight: lastSegment.endHeight,
                            param: {
                                ...lastParam,
                                index: lastParam.index + 1,
                                startWidth: lastParam.endWidth,
                                offsetWidth: 0,
                                type: lastParam.type === ComponentType.Platform ? ComponentType.StraightStair : ComponentType.Platform,
                                platformLengthLocked: false,
                            },
                        };
                        const { moldShape: { vertices } } = lastSegment;
                        if (!lastSegment.baseLineSeg3d) {
                            lastSegment.baseLineSeg3d = { start: vertices[0], end: vertices[1] };
                        }
                        nextSegment.baseLineSeg3d = { start: vertices[vertices.length - 1], end: vertices[vertices.length - 2] };
                        lastParam.modelEditing = true;
                        pluginUI.postMessage({ type: MessageType.ParamChangedByDraw, componentParam: lastParam }, '*');

                        this.segments.push(nextSegment);
                        if (this.focusedComponentIndex !== lastParam.index) {
                            const focusedSegment = this.segments.find(seg => seg.param.index === this.focusedComponentIndex);
                            if (focusedSegment) {
                                this.drawTempComponent(focusedSegment, false);
                            }
                        }
                        this.focusedComponentIndex = nextSegment.param.index;
                        pluginUI.postMessage({ type: MessageType.ComponentAdded, componentParam: { ...nextSegment.param } }, '*');
                    }
                } else {
                    lastSegment.startLocked = true;
                    this.clearPickStartTempShapes(lastSegment);
                    this.drawTempComponent(lastSegment);
                }
            }
        }
    }

    private drawPickStartTempShapes(position: KPoint3d, closestPoint: KPoint3d, theSegment: Segment) {
        if (theSegment.pickStartTempShapeId) {
            appView.clearTemporaryShapesByIds([theSegment.pickStartTempShapeId]);
        }
        if (closestPoint) {
            const pickStartTempShapeId = appView.drawLines([position, closestPoint], { color: { r: 0, g: 0, b: 255 }, depthTest: true, pattern: KLinePattern.Dash, gapSize: 50, dashSize: 50 });
            if (pickStartTempShapeId?.id) {
                theSegment.pickStartTempShapeId = pickStartTempShapeId.id;
            }
        }
    }

    private clearPickStartTempShapes(theSegment: Segment) {
        if (theSegment.pickStartTempShapeId) {
            appView.clearTemporaryShapesByIds([theSegment.pickStartTempShapeId]);
        }
    }

    private drawTempComponent(theSegment: Segment, focused: boolean = false) {
        if (theSegment.startLocked) {
            generateShape(theSegment, this.drawing);
            const {
                stairShape: { vertices: stairVertices, tempLines: stairTempLines },
                moldShape: { vertices: moldVertices, tempLines: moldTempLines },
                cornerShape: { vertices: cornerVertices, tempLines: cornerTempLines },
                cornerMoldShape: { vertices: cornerMoldVertices, tempLines: cornerMoldTempLines },
            } = theSegment;
            const tempLinePoints: KPoint3d[][] = [];
            const moldTempLinePoints: KPoint3d[][] = [];
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
            if (theSegment.tempShapeId?.length) {
                appView.clearTemporaryShapesByIds(theSegment.tempShapeId);
                theSegment.tempShapeId = [];
            }
            const drawTempLinesFunc = focused ? appView.drawFlatLines.bind(appView) : appView.drawPolylines.bind(appView);
            if (tempLinePoints.length) {
                // const colorValue = focused ? 255 : 155;
                const tempShapeId = drawTempLinesFunc(tempLinePoints, { color: { r: 255, g: 0, b: 0 }, depthTest: false });
                if (tempShapeId?.ids) {
                    theSegment.tempShapeId = [...tempShapeId.ids];
                }
            }
            if (moldTempLinePoints.length) {
                const moldTempShapeId = drawTempLinesFunc(moldTempLinePoints, { color: { r: 0, g: 255, b: 0 }, depthTest: this.drawing });
                if (moldTempShapeId?.ids) {
                    if (theSegment.tempShapeId?.length) {
                        theSegment.tempShapeId.push(...moldTempShapeId.ids);
                    } else {
                        theSegment.tempShapeId = [...moldTempShapeId.ids];
                    }
                }
            }
        }
    }

    clearTempShapes(theSegment?: Segment) {
        if (theSegment) {
            if (theSegment.tempShapeId?.length) {
                appView.clearTemporaryShapesByIds(theSegment.tempShapeId);
                theSegment.tempShapeId = [];
            }
        } else {
            appView.clearTemporaryShapes();
        }
    }

    focusComponent(componentIndex: number) {
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
                    if (newFocusedType === ComponentType.Platform) {
                        let closestPoint: KPoint3d | undefined;
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
                    } else {
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
                } else {
                    this.clearTempShapes(oldFocusedSegment);
                }
            }
            // }
            this.focusedComponentIndex = componentIndex;
        }
    }

    removeComponent(componentIndex: number) {
        if (this.segments.length) {
            const theIndex = this.segments.findIndex(seg => seg.param.index === componentIndex);
            if (theIndex > -1) {
                const theSegment = this.segments[theIndex];
                if (this.drawing) {
                    if (theSegment.tempShapeId?.length) {
                        appView.clearTemporaryShapesByIds(theSegment.tempShapeId);
                    }
                } else if (this.editModel) {
                    const theInstance = this.editModel.child.get(componentIndex);
                    if (theInstance) {
                        this.editModel.child.delete(componentIndex)
                        design.removeGroupInstance(theInstance.instance);
                    }
                }
                this.segments.splice(theIndex, 1);
                if (this.segments.length) {
                    if (this.focusedComponentIndex === componentIndex) {
                        this.focusedComponentIndex = this.segments[this.segments.length - 1].param.index;
                    }
                } else {
                    this.editModel = undefined;
                    this.focusedComponentIndex = 0;
                }
            }
        }
    }

    async changeStairParam(stairParam: StairParam, changeParams: ComponentParamType[]) {
        this.stairParam = stairParam;
    }

    async changeComponentParam(componentParam: ComponentParam, changeParams: ComponentParamType[]) {
        if (!this.segments.length) return;

        const theSegment = this.segments.find(seg => seg.param.index === componentParam.index);
        const lastSegment = this.segments[this.segments.length - 1];
        if (theSegment) {
            const { param: { index } } = theSegment;
            componentParam.modelEditing = true;
            theSegment.param = componentParam;
            if (this.drawing) {
                this.drawTempComponent(theSegment, theSegment.param.index !== lastSegment.param.index);
            } else if (this.editModel) {
                // selection.clear();
                const theInstance = this.editModel.child.get(index);
                if (theInstance) {
                    generateShape(theSegment);
                    const theMeshes = generateMeshes([theSegment]);
                    if (theMeshes.length) {
                        design.startOperation();
                        let operationSuccess = (await design.activateGroupInstance(this.editModel.parent.instance)).isSuccess;
                        if (operationSuccess) {
                            operationSuccess = operationSuccess && design.removeGroupInstance(theInstance.instance).isSuccess;
                            if (operationSuccess) {
                                const newInstance = buildComponentInstance(theSegment);
                                operationSuccess = operationSuccess && !!newInstance;
                                if (newInstance) {
                                    this.editModel.child.set(index, { instance: newInstance, definitionKey: newInstance.getGroupDefinition()?.getKey() || '', instanceKey: newInstance.getKey() });
                                }
                            }
                        }
                        operationSuccess = operationSuccess && (await design.deactivateGroupInstance()).isSuccess;

                        if (operationSuccess) {
                            design.commitOperation();
                        } else {
                            design.abortOperation();
                        }
                        selection.add([this.editModel.parent.instance]);
                    }
                }
            }
        }
        // else {
        //     this.componentParam = componentParam;
        // }
    }

    // changeComponentType(componentType: ComponentType) {
    //     this.componentParam.type = componentType;
    //     pluginUI.postMessage({ type: 'componentParamChanged', componentParam: { ...this.componentParam } }, '*');
    //     this.changeComponentParam(this.componentParam, [ComponentParamType.Type]);
    // }

    private tryCommit() {
        const meshes = generateMeshes(this.segments);
        if (meshes.length) {
            design.startOperation();

            const newInstances: KGroupInstance[] = [];
            const editModelChild: Map<number, InstanceData> = new Map();
            const validSegments: Segment[] = [];
            let operationSuccess = true;
            for (const segment of this.segments) {
                if (!segment.mesh) continue;
                if (!operationSuccess) {
                    design.abortOperation();
                    return;
                }
                const newInstance = buildComponentInstance(segment);
                operationSuccess = operationSuccess && !!newInstance;
                if (newInstance) {
                    newInstances.push(newInstance);
                    editModelChild.set(segment.param.index, { instance: newInstance, definitionKey: newInstance.getGroupDefinition()?.getKey() || '', instanceKey: newInstance.getKey() });
                    segment.param.platformLengthLocked = true;
                    segment.param.stepProportional = true;
                    segment.param.widthProportional = true;
                    segment.param.modelEditing = true;
                    validSegments.push(segment);
                }
            }
            if (newInstances.length) {
                const parentInstance = design.makeGroup([], newInstances, [])?.addedInstance;
                operationSuccess = operationSuccess && !!parentInstance;
                const parentDef = parentInstance?.getGroupDefinition();
                if (parentInstance && parentDef) {
                    operationSuccess = operationSuccess && parentDef.setCustomProperty(StairModelKey, StairModelValue).isSuccess;
                    if (operationSuccess) {
                        design.commitOperation();
                        this.editModel = {
                            parent: { instance: parentInstance, definitionKey: parentInstance.getGroupDefinition()?.getKey() || '', instanceKey: parentInstance.getKey() },
                            child: editModelChild
                        };
                        this.segments = validSegments;
                        this.drawing = false;
                        this.drawTempComponent(validSegments[0], true);
                        pluginUI.postMessage({ type: MessageType.DrawStairModelSettled, componentParams: this.segments.map(seg => ({ ...seg.param })), stairParam: this.stairParam }, '*');
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

    setModel(groupInstance: KGroupInstance) {
        if (this.editModel?.parent.instanceKey === groupInstance.getKey()) {
            pluginUI.postMessage({ type: MessageType.PropertiesVisible, propertiesVisible: true }, '*');
            if (this.segments.length) {
                this.focusComponent(this.focusedComponentIndex);
            }
            return;
        }
        this.editModel = undefined;
        const groupDef = groupInstance.getGroupDefinition();
        if (groupInstance && groupDef) {
            const stairModelProperty = groupDef.getCustomProperty(StairModelKey);
            if (stairModelProperty === StairModelValue) {
                const segments: Segment[] = [];
                const subGroupInstances = groupDef.getSubGroupInstances();
                const editModel: EditModel = {
                    parent: { instance: groupInstance, definitionKey: groupInstance.getGroupDefinition()?.getKey() || '', instanceKey: groupInstance.getKey() },
                    child: new Map()
                };
                for (const subInstance of subGroupInstances) {
                    const subDef = subInstance.getGroupDefinition();
                    if (subDef) {
                        // const componentIndexValue = parseInt(subDef.getCustomProperty(ComponentIndexKey));
                        // if (isFinite(componentIndexValue)) {
                        const param = parseParam(subDef.getCustomProperty(ParamKey));
                        const startEnd = parseStartEnd(subDef.getCustomProperty(StartEndKey));
                        const baseLineSeg3d = parseLineSeg3d(subDef.getCustomProperty(BaseLineSeg3dKey));
                        const circleTangent = parseVector3d(subDef.getCustomProperty(CircleTangentKey));
                        if (param && startEnd && baseLineSeg3d) {
                            const segment: Segment = {
                                ...getEmptySegment(),
                                start: startEnd.start,
                                end: startEnd.end,
                                startHeight: startEnd.startHeight,
                                endHeight: startEnd.endHeight,
                                baseLineSeg3d,
                                circleTangent,
                                param,
                                startLocked: true,
                                endLocked: true,
                                // index: componentIndexValue,
                            }
                            segments.push(segment);
                            editModel.child.set(param.index, { instance: subInstance, definitionKey: subInstance.getGroupDefinition()?.getKey() || '', instanceKey: subInstance.getKey() });
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
                    pluginUI.postMessage({ type: MessageType.DrawStairModelSettled, componentParams: this.segments.map(seg => ({ ...seg.param })), stairParam: this.stairParam }, '*');
                }
            }
        }
    }

    clearEditModel() {
        this.editModel = undefined;
        this.segments = [];
        this.focusedComponentIndex = DefaultFocusedComponentIndex;
        pluginUI.postMessage({ type: MessageType.DrawStairModelSettled }, '*');
    }

    private clear() {
        appView.clearTemporaryShapes();
        // this.componentParam = { ...DefaultComponentParam };
        // this.segments = [];
        this.drawing = false;
        this.focusedComponentIndex = DefaultFocusedComponentIndex;
        this.stairParam = undefined;
        // this.editModel = undefined;
    }

    onRButtonUp(event: KMouseEvent, inferenceResult?: KInferenceResult): void {
        this.tryCommit();
        deActivateDrawStairsTool();
    }
    onLButtonDbClick(event: KMouseEvent, inferenceResult?: KInferenceResult): void {
        ;
    }
    allowUsingInference(): boolean {
        return true;
    }
    onKeyDown(event: KKeyBoardEvent): void {
        ;
    }
    onKeyUp(event: KKeyBoardEvent): void {
        ;
    }
}

export const drawStairsTool = new DrawStairsTool();