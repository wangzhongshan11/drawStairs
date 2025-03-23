import { ComponentType, ComponentParam, Segment, ComponentParamKey, StartEndKey, BaseLineSeg3dKey, StairModelKey, ComponentParamType, ModelValue, CircleTangentKey, StairParam, DefaultStairParam, BaseComponentKey, Handrail, InstanceData, HandrailInstancesData, HandrailModelKey, RailModelKey, ColumnModelKey, StairParamKey, StairMaterialKey, ColumnMaterialKey, RailMaterialKey, PlatformMaterialKey } from "./types";
import { generateHandrailShape, generateShape, isCircularStair } from "./tempMeshUtils";
import { buildComponentInstance, buildHandrailInstance, buildSegmentRelations, changeStairUpward, generateMeshes, getSegmentByIndex } from "./meshUtils";
import { parseBaseComponent, parseLineSeg3d, parseComponentParam, parseStartEnd, parseVector3d, stringifyStairParam, stringifyMaterial, parseStairParam, parseMaterial, startOperation, abortOperation, commitOperation } from "./utils";
import { getNewComponentParam, getNewSegment, TempLineColors, TempLinePatterns } from "./consts";
import { deActivateDrawStairsTool } from "../../../main/main";
import { MessageType } from "../../../main/types";

const design = app.getActiveDesign();
const selection = app.getSelection();
const pluginUI = app.getPluginUI();
const appView = app.getActiveView();
const toolHelper = app.getToolHelper();

type EditModel = {
    parent: InstanceData;
    // child: Map<number, InstanceData>;
    stairs: Map<number, InstanceData>;
    platforms: Map<number, InstanceData>;
    handrail?: HandrailInstancesData;
}

const DefaultFocusedComponentIndex = -1;

export class DrawStairsTool implements KTool {
    // private componentParam: ComponentParam = { ...DefaultComponentParam };
    private drawing = false;
    private focusedComponentIndex: number = DefaultFocusedComponentIndex;
    private segments: Segment[] = [];
    private handrailCollection?: { handrails: Handrail[], tempShapeId?: string[]; };
    private stairParam: StairParam = DefaultStairParam;
    private editModel?: EditModel;

    onToolActive(): void {
        console.log((window as any).origin);
        toolHelper.setExcludeInferenceTypes([
            KEntityType.Face, KEntityType.Edge, KEntityType.AuxiliaryBoundedCurve, KEntityType.AuxiliaryLine, KEntityType.AuxiliaryVertex,
            KEntityType.GroupInstance, KEntityType.Vertex, KArchFaceType.NonPlanar, KArchFaceType.Planar,
        ]);
        const firstSegment: Segment = getNewSegment(ComponentType.StraightStair, undefined, this.stairParam.upward);
        firstSegment.startLocked = false;
        // this.stairParam = DefaultStairParam;
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
                    this.drawTempComponent(lastSegment, false, true);
                } else {
                    if (this.segments.length > 1) {
                        const prevSegment = this.focusedComponentIndex === lastSegment.param.index ? this.segments[this.segments.length - 2] : getSegmentByIndex(this.segments, this.focusedComponentIndex);
                        // must be true
                        if (prevSegment?.param.type === ComponentType.Platform) {
                            const { moldShape: { vertices, tempLines } } = prevSegment;

                            if (lastSegment.baseComponent?.line3dIndex !== undefined) {
                                prevSegment.nextComponents.forEach(inds => inds.delete(lastSegment.param.index));
                            }

                            let closestPoint: KPoint3d | undefined;
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
                            if (lastSegment.baseComponent?.line3dIndex !== undefined) {
                                prevSegment.nextComponents[lastSegment.baseComponent.line3dIndex].add(lastSegment.param.index);
                            }
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
                        this.focusComponent(lastSegment.param.index);
                    } else {
                        lastSegment.endLocked = true;

                        const lastParam = lastSegment.param;
                        const nextType = lastParam.type === ComponentType.Platform ? ComponentType.StraightStair : ComponentType.Platform;
                        const nextSegment: Segment = {
                            ...getNewSegment(nextType, lastSegment, this.stairParam.upward),
                            start: lastSegment.end,
                            end: lastSegment.end,
                            startLocked: lastParam.type === ComponentType.Platform ? false : true,
                            startHeight: lastSegment.endHeight,
                            endHeight: lastSegment.endHeight,
                        };
                        const { moldShape: { vertices, tempLines } } = lastSegment;
                        if (!lastSegment.baseComponent) {
                            // lastSegment.baseLineSeg3d = { start: vertices[0], end: vertices[1] };
                            lastSegment.baseComponent = { line3d: { start: vertices[1], end: vertices[0] } };
                        } else {
                            const baseSegment = getSegmentByIndex(this.segments, lastSegment.baseComponent.componentIndex);
                            if (baseSegment && lastSegment.baseComponent?.line3dIndex !== undefined) {
                                baseSegment.nextComponents[lastSegment.baseComponent.line3dIndex].add(lastParam.index);
                            }
                        }
                        // nextSegment.baseLineSeg3d = { start: vertices[vertices.length - 1], end: vertices[vertices.length - 2] };
                        if (nextSegment.startLocked) {
                            lastSegment.nextComponents[0].add(nextSegment.param.index);
                        }
                        nextSegment.baseComponent = {
                            componentIndex: lastParam.index,
                            line3dIndex: lastParam.type === ComponentType.Platform ? tempLines.length - 1 : 0,
                            line3d: { start: vertices[vertices.length - 1], end: vertices[vertices.length - 2] }
                        };
                        lastParam.modelEditing = true;
                        pluginUI.postMessage({ type: MessageType.ParamChangedByDraw, componentParam: lastParam }, '*');

                        this.segments.push(nextSegment);
                        if (this.focusedComponentIndex !== lastParam.index) {
                            const focusedSegment = getSegmentByIndex(this.segments, this.focusedComponentIndex);
                            if (focusedSegment) {
                                this.drawTempComponent(focusedSegment);
                            }
                        }
                        this.focusedComponentIndex = nextSegment.param.index;
                        pluginUI.postMessage({ type: MessageType.ComponentAdded, componentParam: { ...nextSegment.param } }, '*');
                    }
                } else {
                    lastSegment.startLocked = true;
                    this.clearPickStartTempShapes(lastSegment);
                    this.drawTempComponent(lastSegment);
                    this.focusComponent(lastSegment.param.index);
                }
            }
        }
    }

    private drawPickStartTempShapes(position: KPoint3d, closestPoint: KPoint3d, theSegment: Segment) {
        if (theSegment.pickStartTempShapeId) {
            appView.clearTemporaryShapesByIds([theSegment.pickStartTempShapeId]);
        }
        if (closestPoint) {
            const pickStartTempShapeId = appView.drawLines([position, closestPoint], { color: TempLineColors.Inference, depthTest: false, pattern: TempLinePatterns.Inference, gapSize: 50, dashSize: 50 });
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

    private drawTempComponent(theSegment: Segment, focused: boolean = false, drawHandrail: boolean = false) {
        if (theSegment.startLocked) {
            this.generateSegmentShape(theSegment, this.drawing);
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
            if (tempLinePoints.length) {
                const stairColor = focused ? TempLineColors.Focus : TempLineColors.Stair;
                const tempShapeId = appView.drawPolylines(tempLinePoints, { color: stairColor, depthTest: false, pattern: TempLinePatterns.StairAndMold });
                if (tempShapeId?.ids) {
                    theSegment.tempShapeId = [...tempShapeId.ids];
                }
            }
            if (moldTempLinePoints.length) {
                const moldColor = focused ? TempLineColors.Focus : TempLineColors.Mold;
                const moldTempShapeId = appView.drawPolylines(moldTempLinePoints, { color: moldColor, depthTest: this.drawing, pattern: TempLinePatterns.StairAndMold });
                if (moldTempShapeId?.ids) {
                    if (theSegment.tempShapeId?.length) {
                        theSegment.tempShapeId.push(...moldTempShapeId.ids);
                    } else {
                        theSegment.tempShapeId = [...moldTempShapeId.ids];
                    }
                }
            }

            if (drawHandrail) {
                this.drawHandrails();
            }
        }
    }

    private drawHandrails() {
        const prevHandrailTempShapeIds = this.handrailCollection?.tempShapeId;
        this.generateHandrailShape();
        if (prevHandrailTempShapeIds?.length) {
            appView.clearTemporaryShapesByIds(prevHandrailTempShapeIds);
        }
        const handrails = this.handrailCollection?.handrails;
        const tempLinePoints: KPoint3d[][] = [];
        if (this.handrailCollection && handrails?.length) {
            for (const { rail, columns } of handrails) {
                for (let i = 0; i < rail.length - 1; i++) {
                    const railPoint = rail[i];
                    const railNextPoint = rail[i + 1];
                    tempLinePoints.push([railPoint, railNextPoint]);
                }
                tempLinePoints.push(...columns);
            }
            const handrailTempShapeIds = appView.drawPolylines(tempLinePoints, { color: TempLineColors.Handrail, depthTest: false, pattern: TempLinePatterns.Handrail });
            if (handrailTempShapeIds?.ids) {
                this.handrailCollection.tempShapeId = handrailTempShapeIds.ids;
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
        if (componentIndex === this.focusedComponentIndex) {
            return;
        }
        if (this.segments.length) {
            const lastSegment = this.segments[this.segments.length - 1];
            const lastSegmentIndex = lastSegment.param.index;

            // if (componentIndex !== this.focusedComponentIndex) {
            const newFocusedSegment = getSegmentByIndex(this.segments, componentIndex);
            const oldFocusedSegment = getSegmentByIndex(this.segments, this.focusedComponentIndex);
            if (newFocusedSegment) {
                if (this.drawing && !lastSegment.endLocked && componentIndex !== lastSegmentIndex) {
                    const { param: { type: newFocusedType }, moldShape: { vertices: newFocusedVertices, tempLines: newFocusedTempLines } } = newFocusedSegment;
                    const { start } = lastSegment;
                    this.clearPickStartTempShapes(lastSegment);
                    if (newFocusedType === ComponentType.Platform) {
                        this.clearTempShapes(lastSegment);
                        if (lastSegment.param.type === ComponentType.Platform) {
                            const cachedIndex = lastSegment.param.index;
                            lastSegment.param = getNewComponentParam(ComponentType.StraightStair, newFocusedSegment, this.stairParam.upward);
                            lastSegment.param.index = cachedIndex;
                            pluginUI.postMessage({ type: MessageType.ParamChangedByDraw, componentParam: { ...lastSegment.param } }, '*');
                        }
                        if (oldFocusedSegment && oldFocusedSegment !== newFocusedSegment) {
                            oldFocusedSegment.nextComponents.forEach(inds => inds.delete(lastSegment.param.index));
                        }
                        if (lastSegment.baseComponent?.line3dIndex !== undefined) {
                            // newFocusedSegment.nextComponents.forEach(inds => inds.delete(lastSegment.param.index));
                            const baseSegment = getSegmentByIndex(this.segments, lastSegment.baseComponent.componentIndex);
                            if (baseSegment) {
                                baseSegment.nextComponents.forEach(inds => inds.delete(lastSegment.param.index));
                            }
                        }

                        let closestPoint: KPoint3d | undefined;
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
                        if (lastSegment.baseComponent?.line3dIndex !== undefined) {
                            newFocusedSegment.nextComponents[lastSegment.baseComponent.line3dIndex].add(lastSegment.param.index);
                        }
                        lastSegment.startLocked = false;
                        lastSegment.circleTangent = undefined;
                        lastSegment.startHeight = newFocusedSegment.endHeight;
                        this.drawPickStartTempShapes(start, lastSegment.start, lastSegment);
                    } else {
                        if (!newFocusedSegment.nextComponents[0].size) {
                            // this.clearTempShapes(lastSegment);
                            if (oldFocusedSegment && oldFocusedSegment !== newFocusedSegment) {
                                oldFocusedSegment.nextComponents.forEach(inds => inds.delete(lastSegment.param.index));
                            }
                            if (lastSegment.baseComponent?.line3dIndex !== undefined) {
                                // newFocusedSegment.nextComponents.forEach(inds => inds.delete(lastSegment.param.index));
                                const baseSegment = getSegmentByIndex(this.segments, lastSegment.baseComponent.componentIndex);
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
                    this.drawHandrails();
                } else if (this.editModel) {
                    const theInstance = this.editModel.stairs.get(componentIndex) || this.editModel.platforms.get(componentIndex);
                    if (theInstance) {
                        this.editModel.stairs.delete(componentIndex)
                        this.editModel.platforms.delete(componentIndex)
                        design.removeGroupInstance(theInstance.instance);
                    }
                }
                this.segments.splice(theIndex, 1);

                // to clear relations
                const baseComponent = theSegment.baseComponent;
                const baseSegment = getSegmentByIndex(this.segments, baseComponent?.componentIndex);
                if (baseSegment && baseComponent?.line3dIndex !== undefined) {
                    // const theInd = baseSegment.nextComponents[baseComponent.line3dIndex].findIndex(i => i === theSegment.param.index);
                    // if (theInd > -1) {
                    baseSegment.nextComponents[baseComponent.line3dIndex].delete(theSegment.param.index);
                    // }
                }
                const nextComponents = theSegment.nextComponents;
                for (const nextSegmentInds of nextComponents) {
                    if (nextSegmentInds.size) {
                        for (const nextSegInd of nextSegmentInds) {
                            const nextSegment = getSegmentByIndex(this.segments, nextSegInd);
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
                } else {
                    this.editModel = undefined;
                    this.focusedComponentIndex = 0;
                }
            }
        }
    }

    onMaterialReplaceClick(changeParam: ComponentParamType, index?: number) {
        app.getApplicationUI().toggleMaterialReplacePanel(true, this.onMaterialReplaceItemClick(changeParam, index));
    }

    onMaterialReplaceItemClick = (changeParam: ComponentParamType, index?: number, isDelete?: boolean) => {
        return async (materialId: string = '', bgid: string = '') => {
            const instancePath = this.editModel ? design.getEditPathsToGroupInstance(this.editModel.parent.instance) : [];
            if (changeParam === ComponentParamType.ComponentMaterial) {
                const segment = getSegmentByIndex(this.segments, index);
                if (segment && index !== undefined) {
                    if (this.drawing) {
                        segment.param.material = { materialId, bgid };
                        pluginUI.postMessage({ type: MessageType.ParamChangedByDraw, componentParam: { ...segment.param } }, '*');
                    } else if (this.editModel) {
                        const theInstance = this.editModel.stairs.get(index) || this.editModel.platforms.get(index);
                        if (theInstance && instancePath) {
                            startOperation();
                            let operationSuccess = true;
                            operationSuccess = operationSuccess && (await design.activateEditPath([...instancePath[0], this.editModel.parent.instance])).isSuccess;
                            if (isDelete) {
                                operationSuccess = operationSuccess && design.clearMaterial([theInstance.instance]);
                            } else {
                                operationSuccess = operationSuccess && design.assignMaterialForEntities([theInstance.instance], materialId, bgid);
                            }
                            operationSuccess = operationSuccess && (await design.activateEditPath(instancePath[0])).isSuccess;
                            if (operationSuccess) {
                                commitOperation();
                                segment.param.material = { materialId, bgid };
                                pluginUI.postMessage({ type: MessageType.ParamChangedByDraw, componentParam: { ...segment.param } }, '*');
                            } else {
                                abortOperation();
                            }
                        }
                    }
                }
            } else if (changeParam === ComponentParamType.StairMaterial || changeParam === ComponentParamType.PlatformMaterial) {
                if (!this.editModel) {
                    if (changeParam === ComponentParamType.StairMaterial) {
                        this.stairParam.stairMaterial = { materialId, bgid };
                    } else {
                        this.stairParam.platformMaterial = { materialId, bgid };
                    }
                    pluginUI.postMessage({ type: MessageType.StairParamChangedByDraw, stairParam: this.stairParam }, '*');
                } else if (instancePath) {
                    startOperation();
                    let operationSuccess = true;
                    operationSuccess = operationSuccess && (await design.activateEditPath([...instancePath[0], this.editModel.parent.instance])).isSuccess;
                    const components = changeParam === ComponentParamType.StairMaterial ? this.editModel.stairs : this.editModel.platforms;
                    if (isDelete) {
                        operationSuccess = operationSuccess && design.clearMaterial([...components.values()].map(c => c.instance));
                    } else {
                        operationSuccess = operationSuccess && design.assignMaterialForEntities([...components.values()].map(c => c.instance), materialId, bgid);
                    }
                    operationSuccess = operationSuccess && (await design.activateEditPath(instancePath[0])).isSuccess;
                    if (operationSuccess) {
                        commitOperation();
                        if (changeParam === ComponentParamType.StairMaterial) {
                            this.stairParam.stairMaterial = { materialId, bgid };
                        } else {
                            this.stairParam.platformMaterial = { materialId, bgid };
                        }
                        pluginUI.postMessage({ type: MessageType.StairParamChangedByDraw, stairParam: this.stairParam }, '*');
                    } else {
                        abortOperation();
                    }
                }
            } else if (changeParam === ComponentParamType.HandrailRailMaterial || changeParam === ComponentParamType.HandrailColumnMaterial) {
                if (!this.editModel) {
                    if (changeParam === ComponentParamType.HandrailRailMaterial) {
                        this.stairParam.handrail.rail.material = { materialId, bgid };
                    } else {
                        this.stairParam.handrail.column.material = { materialId, bgid };
                    }
                    pluginUI.postMessage({ type: MessageType.StairParamChangedByDraw, stairParam: this.stairParam }, '*');
                } else if (instancePath && this.editModel.handrail) {
                    startOperation();
                    let operationSuccess = true;
                    operationSuccess = operationSuccess && (await design.activateEditPath([...instancePath[0], this.editModel.parent.instance, this.editModel.handrail.handrailInstance.instance])).isSuccess;
                    const components = changeParam === ComponentParamType.HandrailRailMaterial ? this.editModel.handrail.railInstances : this.editModel.handrail.columnInstances;
                    if (isDelete) {
                        operationSuccess = operationSuccess && design.clearMaterial([...components.values()].map(c => c.instance));
                    } else {
                        operationSuccess = operationSuccess && design.assignMaterialForEntities([...components.values()].map(c => c.instance), materialId, bgid);
                    }
                    operationSuccess = operationSuccess && (await design.activateEditPath(instancePath[0])).isSuccess;
                    if (operationSuccess) {
                        commitOperation();
                        if (changeParam === ComponentParamType.HandrailRailMaterial) {
                            this.stairParam.handrail.rail.material = { materialId, bgid };
                        } else {
                            this.stairParam.handrail.column.material = { materialId, bgid };
                        }
                        pluginUI.postMessage({ type: MessageType.StairParamChangedByDraw, stairParam: this.stairParam }, '*');
                    } else {
                        abortOperation();
                    }
                }
            }
        }
    }

    async changeStairParam(stairParam: StairParam, changeParams: ComponentParamType[]) {
        this.stairParam = stairParam;
        if (!this.segments.length) {
            return;
        }
        const instancePath = this.editModel ? design.getEditPathsToGroupInstance(this.editModel.parent.instance) : [];
        const lastSegment = this.segments[this.segments.length - 1];
        let stairPraamString = '';
        if (changeParams.indexOf(ComponentParamType.HorizontalStep) > -1 || changeParams.indexOf(ComponentParamType.VerticalStep) > -1 ||
            changeParams.indexOf(ComponentParamType.StartWidth) > -1 || changeParams.indexOf(ComponentParamType.EndWidth) > -1 ||
            changeParams.indexOf(ComponentParamType.Upward) > -1 ||
            changeParams.indexOf(ComponentParamType.PlatformThickness) > -1
        ) {
            let reGenerateSegments = this.segments;
            if (changeParams.indexOf(ComponentParamType.Upward) > -1) {
                changeStairUpward(reGenerateSegments[0], reGenerateSegments, stairParam.upward, true);
            } else {
                reGenerateSegments = this.segments.filter(seg => changeParams.indexOf(ComponentParamType.PlatformThickness) > -1 ? seg.param.type === ComponentType.Platform : seg.param.type !== ComponentType.Platform);
            }
            if (reGenerateSegments.length) {
                for (const reGenerateSegment of reGenerateSegments) {
                    for (const changeParam of changeParams) {
                        (reGenerateSegment.param as any)[changeParam] = (stairParam as any)[changeParam];
                    }
                }

                let operationSuccess = true;
                if (!this.drawing && this.editModel) {
                    startOperation();
                    if (changeParams[0] === ComponentParamType.StairMaterial) {
                        if (instancePath.length) {
                            operationSuccess = operationSuccess && (await design.activateEditPath([...instancePath[0], this.editModel.parent.instance])).isSuccess;
                        }
                        if (this.stairParam.stairMaterial && this.stairParam.stairMaterial.materialId) {
                            const stairMaterialString = stringifyMaterial(this.stairParam.stairMaterial)
                            operationSuccess = operationSuccess && !!this.editModel.parent.instance.getGroupDefinition()?.setCustomProperty(StairMaterialKey, stairMaterialString).isSuccess;
                            operationSuccess = operationSuccess && design.assignMaterialForEntities([...this.editModel.stairs.values()].map(instanceData => instanceData.instance), this.stairParam.stairMaterial.materialId, this.stairParam.stairMaterial.bgid);
                        }
                    } else if (changeParams[0] === ComponentParamType.PlatformMaterial) {
                        if (instancePath.length) {
                            operationSuccess = operationSuccess && (await design.activateEditPath([...instancePath[0], this.editModel.parent.instance])).isSuccess;
                        }
                        if (this.stairParam.platformMaterial && this.stairParam.platformMaterial.materialId) {
                            const platformMaterialString = stringifyMaterial(this.stairParam.platformMaterial)
                            operationSuccess = operationSuccess && !!this.editModel.parent.instance.getGroupDefinition()?.setCustomProperty(PlatformMaterialKey, platformMaterialString).isSuccess;
                            operationSuccess = operationSuccess && design.assignMaterialForEntities([...this.editModel.platforms.values()].map(instanceData => instanceData.instance), this.stairParam.platformMaterial.materialId, this.stairParam.platformMaterial.bgid);
                        }
                    } else {
                        stairPraamString = stringifyStairParam(this.stairParam);
                        operationSuccess = operationSuccess && !!this.editModel.parent.instance.getGroupDefinition()?.setCustomProperty(StairParamKey, stairPraamString).isSuccess;
                        if (instancePath.length) {
                            operationSuccess = operationSuccess && (await design.activateEditPath([...instancePath[0], this.editModel.parent.instance])).isSuccess;
                        }
                    }
                }
                for (const reGenerateSegment of reGenerateSegments) {
                    if (this.drawing) {
                        this.drawTempComponent(reGenerateSegment, reGenerateSegment.param.index === this.focusedComponentIndex && reGenerateSegment.param.index !== lastSegment.param.index);
                    } else if (this.editModel) {
                        const { param: { index, type } } = reGenerateSegment;

                        const theInstance = this.editModel.stairs.get(index) || this.editModel.platforms.get(index);
                        if (theInstance) {
                            this.generateSegmentShape(reGenerateSegment);
                            const theMeshes = generateMeshes([reGenerateSegment]);
                            if (theMeshes.length) {
                                if (operationSuccess) {
                                    operationSuccess = operationSuccess && design.removeGroupInstance(theInstance.instance).isSuccess;
                                    if (operationSuccess) {
                                        const newInstance = buildComponentInstance(reGenerateSegment, this.segments);
                                        operationSuccess = operationSuccess && !!newInstance;
                                        if (newInstance) {
                                            if (type === ComponentType.Platform) {
                                                this.editModel.platforms.set(index, { instance: newInstance, definitionKey: newInstance.getGroupDefinition()?.getKey() || '', instanceKey: newInstance.getKey() });
                                            } else {
                                                this.editModel.stairs.set(index, { instance: newInstance, definitionKey: newInstance.getGroupDefinition()?.getKey() || '', instanceKey: newInstance.getKey() });
                                            }
                                        }
                                    }
                                } else {
                                    break;
                                }
                            }
                        }
                    }
                }
                if (!this.drawing && this.editModel) {
                    if (this.handrailCollection?.handrails.length) {
                        const handrailInstancesData = await buildHandrailInstance(this.stairParam, this.handrailCollection?.handrails);
                        operationSuccess = operationSuccess && handrailInstancesData !== undefined;

                        if (handrailInstancesData) {
                            this.editModel.handrail = handrailInstancesData;
                        }
                    }

                    if (instancePath.length) {
                        operationSuccess = operationSuccess && (await design.activateEditPath(instancePath[0])).isSuccess;
                    }
                    if (operationSuccess) {
                        commitOperation();
                    } else {
                        abortOperation();
                    }
                    selection.add([this.editModel.parent.instance]);
                } else if (this.drawing) {
                    this.drawHandrails();
                }
            }
        } else if (changeParams.length === 1 && changeParams[0].startsWith(ComponentParamType.Handrail)) {
            if (this.drawing) {
                this.drawHandrails();
            } else if (this.editModel) {
                if (this.handrailCollection?.handrails.length) {
                    let operationSuccess = true;
                    startOperation();
                    // const handrailParams = this.stairParam.handrail;
                    // if (changeParams[0] === ComponentParamType.HandrailRailMaterial) {
                    //     if (this.editModel.handrail) {
                    //         if (instancePath.length) {
                    //             operationSuccess = operationSuccess && (await design.activateEditPath([...instancePath[0], this.editModel.parent.instance, this.editModel.handrail.handrailInstance.instance])).isSuccess;
                    //         }
                    //         if (this.editModel.handrail?.railInstances.length && handrailParams.rail.material && handrailParams.rail.material.materialId) {
                    //             const railMaterialString = stringifyMaterial(handrailParams.rail.material)
                    //             operationSuccess = operationSuccess && !!this.editModel.parent.instance.getGroupDefinition()?.setCustomProperty(RailMaterialKey, railMaterialString).isSuccess;
                    //             operationSuccess = operationSuccess && design.assignMaterialForEntities(this.editModel.handrail?.railInstances.map(instanceData => instanceData.instance), handrailParams.rail.material.materialId, handrailParams.rail.material.bgid);
                    //         }
                    //     }
                    // } else if (changeParams[0] === ComponentParamType.HandrailColumnMaterial) {
                    //     if (this.editModel.handrail) {
                    //         if (instancePath.length) {
                    //             operationSuccess = operationSuccess && (await design.activateEditPath([...instancePath[0], this.editModel.parent.instance, this.editModel.handrail.handrailInstance.instance])).isSuccess;
                    //         }
                    //         if (this.editModel.handrail?.columnInstances.length && handrailParams.column.material && handrailParams.column.material.materialId) {
                    //             const columnMaterialString = stringifyMaterial(handrailParams.column.material)
                    //             operationSuccess = operationSuccess && !!this.editModel.parent.instance.getGroupDefinition()?.setCustomProperty(ColumnMaterialKey, columnMaterialString).isSuccess;
                    //             operationSuccess = operationSuccess && design.assignMaterialForEntities(this.editModel.handrail?.columnInstances.map(instanceData => instanceData.instance), handrailParams.column.material.materialId, handrailParams.column.material.bgid);
                    //         }
                    //     }
                    // } else {
                    if (this.stairParam.handrail.support) {
                        stairPraamString = stringifyStairParam(this.stairParam);
                        operationSuccess = operationSuccess && !!this.editModel.parent.instance.getGroupDefinition()?.setCustomProperty(StairParamKey, stairPraamString).isSuccess;
                        if (instancePath.length) {
                            operationSuccess = operationSuccess && (await design.activateEditPath([...instancePath[0], this.editModel.parent.instance])).isSuccess;
                        }
                        const handrailInstancesData = await buildHandrailInstance(this.stairParam, this.handrailCollection?.handrails);
                        operationSuccess = operationSuccess && handrailInstancesData !== undefined;

                        if (handrailInstancesData) {
                            this.editModel.handrail = handrailInstancesData;
                        }
                    } else if (this.editModel.handrail) {
                        if (instancePath.length) {
                            operationSuccess = operationSuccess && (await design.activateEditPath([...instancePath[0], this.editModel.parent.instance])).isSuccess;
                        }
                        design.removeGroupInstance(this.editModel.handrail.handrailInstance.instance);
                        this.editModel.handrail = undefined;
                    }
                    // }

                    if (instancePath.length) {
                        operationSuccess = operationSuccess && (await design.activateEditPath([...instancePath[0]])).isSuccess;
                    }
                    if (operationSuccess) {
                        commitOperation();
                    } else {
                        abortOperation();
                    }
                    selection.add([this.editModel.parent.instance]);
                }
            }
        } else if (!stairParam.stairMaterial && changeParams.length === 0 && changeParams[0] === ComponentParamType.StairMaterial) {
            this.onMaterialReplaceItemClick(changeParams[0], undefined, true)();
        } else if (!stairParam.platformMaterial && changeParams.length === 0 && changeParams[0] === ComponentParamType.PlatformLength) {
            this.onMaterialReplaceItemClick(changeParams[0], undefined, true)();
        } else if (!stairParam.handrail.rail.material && changeParams.length === 0 && changeParams[0] === ComponentParamType.HandrailRailMaterial) {
            this.onMaterialReplaceItemClick(changeParams[0], undefined, true)();
        } else if (!stairParam.handrail.column.material && changeParams.length === 0 && changeParams[0] === ComponentParamType.HandrailColumnMaterial) {
            this.onMaterialReplaceItemClick(changeParams[0], undefined, true)();
        }
    }

    async changeComponentParam(componentParam: ComponentParam, changeParams: ComponentParamType[]) {
        if (!this.segments.length) return;

        const theSegment = getSegmentByIndex(this.segments, componentParam.index);
        const lastSegment = this.segments[this.segments.length - 1];
        if (theSegment) {
            const { param: { index, type } } = theSegment;
            componentParam.modelEditing = true;
            theSegment.param = componentParam;
            if (!isCircularStair(theSegment)) {
                theSegment.circleTangent = undefined;
            }
            if (changeParams.length === 0 && changeParams[0] === ComponentParamType.ComponentMaterial && !componentParam.material) {
                this.onMaterialReplaceItemClick(changeParams[0], componentParam.index, true);
            } else {
                if (this.drawing) {
                    this.drawTempComponent(theSegment, theSegment.param.index !== lastSegment.param.index, true);
                } else if (this.editModel) {
                    // selection.clear();
                    const theInstance = this.editModel.stairs.get(index) || this.editModel.platforms.get(index);
                    if (theInstance) {
                        this.generateSegmentShape(theSegment);
                        const theMeshes = generateMeshes([theSegment]);
                        if (theMeshes.length) {
                            startOperation();
                            let operationSuccess = true;
                            const instancePath = design.getEditPathsToGroupInstance(this.editModel.parent.instance);
                            if (instancePath.length) {
                                operationSuccess = operationSuccess && (await design.activateEditPath([...instancePath[0], this.editModel.parent.instance])).isSuccess;
                            }
                            if (operationSuccess) {
                                operationSuccess = operationSuccess && design.removeGroupInstance(theInstance.instance).isSuccess;
                                if (operationSuccess) {
                                    const newInstance = buildComponentInstance(theSegment, this.segments);
                                    operationSuccess = operationSuccess && !!newInstance;
                                    if (newInstance) {
                                        if (type === ComponentType.Platform) {
                                            this.editModel.platforms.set(index, { instance: newInstance, definitionKey: newInstance.getGroupDefinition()?.getKey() || '', instanceKey: newInstance.getKey() });
                                        } else {
                                            this.editModel.stairs.set(index, { instance: newInstance, definitionKey: newInstance.getGroupDefinition()?.getKey() || '', instanceKey: newInstance.getKey() });
                                        }
                                    }
                                }
                            }
                            if (this.handrailCollection?.handrails.length) {
                                const handrailInstancesData = await buildHandrailInstance(this.stairParam, this.handrailCollection?.handrails);
                                operationSuccess = operationSuccess && handrailInstancesData !== undefined;
                                if (handrailInstancesData) {
                                    this.editModel.handrail = handrailInstancesData;
                                }
                            }

                            if (instancePath.length) {
                                operationSuccess = operationSuccess && (await design.activateEditPath(instancePath[0])).isSuccess;
                            }
                            if (operationSuccess) {
                                commitOperation();
                            } else {
                                abortOperation();
                            }
                            selection.add([this.editModel.parent.instance]);
                        }
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

    private async tryCommit() {
        const meshes = generateMeshes(this.segments);
        if (meshes.length) {
            startOperation();

            const newInstances: KGroupInstance[] = [];
            const stairsChild: Map<number, InstanceData> = new Map();
            const platformChild: Map<number, InstanceData> = new Map();
            const validSegments: Segment[] = [];
            let operationSuccess = true;
            for (const segment of this.segments) {
                if (!segment.mesh) continue;
                if (!operationSuccess) {
                    abortOperation();
                    return;
                }
                const newInstance = buildComponentInstance(segment, this.segments);
                operationSuccess = operationSuccess && !!newInstance;
                if (newInstance) {
                    newInstances.push(newInstance);
                    if (segment.param.type === ComponentType.Platform) {
                        platformChild.set(segment.param.index, { instance: newInstance, definitionKey: newInstance.getGroupDefinition()?.getKey() || '', instanceKey: newInstance.getKey() });
                    } else {
                        stairsChild.set(segment.param.index, { instance: newInstance, definitionKey: newInstance.getGroupDefinition()?.getKey() || '', instanceKey: newInstance.getKey() });
                    }
                    segment.param.platformLengthLocked = true;
                    segment.param.stepProportional = true;
                    segment.param.widthProportional = true;
                    segment.param.modelEditing = true;
                    validSegments.push(segment);
                }
            }

            let handrailInstanceData: HandrailInstancesData | undefined;
            if (this.handrailCollection?.handrails.length) {
                const handrailInstancesDataRes = await buildHandrailInstance(this.stairParam, this.handrailCollection?.handrails);
                operationSuccess = operationSuccess && handrailInstancesDataRes !== undefined;

                if (handrailInstancesDataRes) {
                    newInstances.push(handrailInstancesDataRes.handrailInstance.instance);
                    handrailInstanceData = handrailInstancesDataRes;
                }
            }

            if (newInstances.length && operationSuccess) {
                const parentInstance = design.makeGroup([], newInstances, [])?.addedInstance;
                operationSuccess = operationSuccess && !!parentInstance;
                const parentDef = parentInstance?.getGroupDefinition();
                if (parentInstance && parentDef) {
                    operationSuccess = operationSuccess && parentDef.setCustomProperty(StairModelKey, ModelValue).isSuccess;
                    const stairParamString = stringifyStairParam(this.stairParam);
                    operationSuccess = operationSuccess && parentDef.setCustomProperty(StairParamKey, stairParamString).isSuccess;
                    if (this.stairParam.stairMaterial) {
                        const stairMaterialString = stringifyMaterial(this.stairParam.stairMaterial);
                        operationSuccess = operationSuccess && parentDef.setCustomProperty(StairMaterialKey, stairMaterialString).isSuccess;
                    }
                    if (this.stairParam.platformMaterial) {
                        const platformMaterialString = stringifyMaterial(this.stairParam.platformMaterial);
                        operationSuccess = operationSuccess && parentDef.setCustomProperty(PlatformMaterialKey, platformMaterialString).isSuccess;
                    }
                    if (this.stairParam.handrail.support && this.stairParam.handrail.rail.material) {
                        const railMaterialString = stringifyMaterial(this.stairParam.handrail.rail.material);
                        operationSuccess = operationSuccess && parentDef.setCustomProperty(RailMaterialKey, railMaterialString).isSuccess;
                    }
                    if (this.stairParam.handrail.support && this.stairParam.handrail.column.material) {
                        const columnMaterialString = stringifyMaterial(this.stairParam.handrail.column.material);
                        operationSuccess = operationSuccess && parentDef.setCustomProperty(ColumnMaterialKey, columnMaterialString).isSuccess;
                    }
                    if (operationSuccess) {
                        commitOperation();
                        this.editModel = {
                            parent: { instance: parentInstance, definitionKey: parentInstance.getGroupDefinition()?.getKey() || '', instanceKey: parentInstance.getKey() },
                            stairs: stairsChild,
                            platforms: platformChild,
                            handrail: handrailInstanceData,
                        };
                        this.segments = validSegments;
                        this.drawing = false;
                        this.drawTempComponent(validSegments[0], true);
                        pluginUI.postMessage({ type: MessageType.DrawStairModelSettled, componentParams: this.segments.map(seg => ({ ...seg.param })), stairParam: this.stairParam }, '*');
                        return;
                    }
                }
            }

            abortOperation();
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
            const stairParamProperty = groupDef.getCustomProperty(StairParamKey);
            const stairParam = parseStairParam(stairParamProperty);
            const stairMaterialProperty = groupDef.getCustomProperty(StairMaterialKey);
            const stairMaterial = parseMaterial(stairMaterialProperty);
            if (stairMaterial) {
                stairParam.stairMaterial = stairMaterial;
            }
            const platformMaterialProperty = groupDef.getCustomProperty(PlatformMaterialKey);
            const platformMaterial = parseMaterial(platformMaterialProperty);
            if (platformMaterial) {
                stairParam.platformMaterial = platformMaterial;
            }
            const railMaterialProperty = groupDef.getCustomProperty(RailMaterialKey);
            const railMaterial = parseMaterial(railMaterialProperty);
            if (railMaterial) {
                stairParam.handrail.rail.material = railMaterial;
            }
            const columnMaterialProperty = groupDef.getCustomProperty(ColumnMaterialKey);
            const columnMaterial = parseMaterial(columnMaterialProperty);
            if (columnMaterial) {
                stairParam.handrail.column.material = columnMaterial;
            }
            if (stairModelProperty === ModelValue) {
                const segments: Segment[] = [];
                const subGroupInstances = groupDef.getSubGroupInstances();
                const editModel: EditModel = {
                    parent: { instance: groupInstance, definitionKey: groupInstance.getGroupDefinition()?.getKey() || '', instanceKey: groupInstance.getKey() },
                    stairs: new Map(),
                    platforms: new Map(),
                };
                for (const subInstance of subGroupInstances) {
                    const subDef = subInstance.getGroupDefinition();
                    if (subDef) {
                        const handrailProperty = subDef.getCustomProperty(HandrailModelKey);
                        if (handrailProperty === ModelValue) {
                            const handrailInstancesData: HandrailInstancesData = {
                                handrailInstance: { instance: subInstance, instanceKey: subInstance.getKey(), definitionKey: subDef.getKey() },
                                railInstances: [],
                                columnInstances: [],
                            };
                            const handrailSubGroupInstances = subDef.getSubGroupInstances();
                            for (const handrailSubInstance of handrailSubGroupInstances) {
                                const handrailSubDef = handrailSubInstance.getGroupDefinition();
                                if (handrailSubDef) {
                                    const railProperty = handrailSubDef.getCustomProperty(RailModelKey);
                                    const columnProperty = handrailSubDef.getCustomProperty(ColumnModelKey);
                                    if (railProperty === ModelValue) {
                                        handrailInstancesData.railInstances.push({ instance: handrailSubInstance, instanceKey: handrailSubInstance.getKey(), definitionKey: handrailSubDef.getKey() });
                                    } else if (columnProperty === ModelValue) {
                                        handrailInstancesData.columnInstances.push({ instance: handrailSubInstance, instanceKey: handrailSubInstance.getKey(), definitionKey: handrailSubDef.getKey() });
                                    }
                                }
                            }
                            editModel.handrail = handrailInstancesData;
                        } else {
                            // const componentIndexValue = parseInt(subDef.getCustomProperty(ComponentIndexKey));
                            // if (isFinite(componentIndexValue)) {
                            const param = parseComponentParam(subDef.getCustomProperty(ComponentParamKey));
                            const startEnd = parseStartEnd(subDef.getCustomProperty(StartEndKey));
                            const baseLineSeg3d = parseLineSeg3d(subDef.getCustomProperty(BaseLineSeg3dKey));
                            const baseComponent = parseBaseComponent(subDef.getCustomProperty(BaseComponentKey));
                            const circleTangent = parseVector3d(subDef.getCustomProperty(CircleTangentKey));
                            if (param && startEnd && baseLineSeg3d) {
                                const segment: Segment = {
                                    ...getNewSegment(param.type),
                                    start: startEnd.start,
                                    end: startEnd.end,
                                    startHeight: startEnd.startHeight,
                                    endHeight: startEnd.endHeight,
                                    baseComponent: { componentIndex: baseComponent?.componentIndex, line3dIndex: baseComponent?.line3dIndex, line3d: baseLineSeg3d },
                                    circleTangent,
                                    param,
                                    startLocked: true,
                                    endLocked: true,
                                    // index: componentIndexValue,
                                }
                                segments.push(segment);
                                if (param.type === ComponentType.Platform) {
                                    editModel.platforms.set(param.index, { instance: subInstance, definitionKey: subInstance.getGroupDefinition()?.getKey() || '', instanceKey: subInstance.getKey() });
                                } else {
                                    editModel.stairs.set(param.index, { instance: subInstance, definitionKey: subInstance.getGroupDefinition()?.getKey() || '', instanceKey: subInstance.getKey() });
                                }
                            }
                        }
                        // }
                    }
                }

                if (segments.length) {
                    segments.sort((a, b) => a.param.index - b.param.index);
                    buildSegmentRelations(segments);
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
        this.handrailCollection = undefined;
        this.focusedComponentIndex = DefaultFocusedComponentIndex;
        appView.clearTemporaryShapes();
        pluginUI.postMessage({ type: MessageType.DrawStairModelSettled }, '*');
    }

    private clear() {
        appView.clearTemporaryShapes();
        // this.componentParam = { ...DefaultComponentParam };
        // this.segments = [];
        this.drawing = false;
        this.focusedComponentIndex = DefaultFocusedComponentIndex;
        this.stairParam = DefaultStairParam;
        // this.editModel = undefined;
    }

    onRButtonUp(event: KMouseEvent, inferenceResult?: KInferenceResult): void {
        this.tryCommit().then(() => {
            deActivateDrawStairsTool();
        });
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

    private generateSegmentShape(segment: Segment, temp: boolean = true) {
        generateShape(segment, temp);
        // this.generateHandrailShape();
    }

    private generateHandrailShape() {
        if (this.segments.length) {
            const handrails = generateHandrailShape(this.stairParam, this.segments);
            this.handrailCollection = { handrails: handrails || [] };
        }
    }
}

export const drawStairsTool = new DrawStairsTool();