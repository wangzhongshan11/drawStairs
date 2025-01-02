import { ComponentType, ComponentParam, Segment, ParamKey, StartEndKey, BaseLineSeg3dKey, StairModelKey, ComponentParamType, StairModelValue } from "./types";
import { generateShape } from "./tempMeshUtils";
import { buildComponentInstance, generateMeshes } from "./meshUtils";
import { parseParam, parseStartEnd } from "./utils";
import { getEmptySegment } from "./consts";

const design = app.getActiveDesign();
const pluginUI = app.getPluginUI();
const appView = app.getActiveView();
const toolHelper = app.getToolHelper();

type EditModel = {
    parent: KGroupInstance;
    child: Map<number, KGroupInstance>;
}

export class DrawStairsTool implements KTool {
    // private componentParam: ComponentParam = { ...DefaultComponentParam };
    private drawing = false;
    private segments: Segment[] = [];
    private editModel?: EditModel;

    onToolActive(): void {
        toolHelper.setExcludeInferenceTypes([
            KEntityType.Face, KEntityType.Edge, KEntityType.AuxiliaryBoundedCurve, KEntityType.AuxiliaryLine, KEntityType.AuxiliaryVertex,
            KEntityType.GroupInstance, KEntityType.Vertex, KArchFaceType.NonPlanar, KArchFaceType.Planar,
        ]);
        const firstSegment: Segment = getEmptySegment();
        firstSegment.startLocked = false;
        pluginUI.postMessage({ type: 'componentParamChanged', componentParam: { ...firstSegment.param } }, '*');
        // pluginUI.postMessage({ type: 'componentParamChanged', componentParam: { ...this.componentParam, index: this.segments.length ? this.segments[this.segments.length - 1] : 0 } }, '*');
        this.segments.push(firstSegment);
        this.drawing = true;
        this.editModel = undefined;
    }

    onToolDeactive(): void {
        pluginUI.postMessage({ type: 'leaveDrawStairsTool' }, '*');
        toolHelper.setExcludeInferenceTypes([]);
        this.clear();
    }

    onMouseMove(event: KMouseEvent, inferenceResult?: KInferenceResult): void {
        if (inferenceResult) {
            // const { startWidth, endWidth, platformThickness } = this.componentParam;
            const position = inferenceResult.position;
            if (this.segments.length) {
                const lastSegment = this.segments[this.segments.length - 1];
                if (lastSegment.startLocked) {
                    lastSegment.end = position;
                    this.drawTempComponent(lastSegment);
                } else {
                    if (this.segments.length > 1) {
                        const prevSegment = this.segments[this.segments.length - 2];
                        // must be true
                        if (prevSegment.param.type === ComponentType.Platform) {
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
                            if (lastSegment.pickStartTempShapeId) {
                                appView.clearTemporaryShapesByIds([lastSegment.pickStartTempShapeId]);
                            }
                            if (closestPoint) {
                                const pickStartTempShapeId = appView.drawLines([position, closestPoint], { color: { r: 0, g: 0, b: 255 }, depthTest: true, pattern: KLinePattern.Dash, gapSize: 50, dashSize: 50 });
                                if (pickStartTempShapeId?.id) {
                                    lastSegment.pickStartTempShapeId = pickStartTempShapeId.id;
                                }
                            }
                        }
                    }
                }
                pluginUI.postMessage({ type: 'componentParamChanged', componentParam: { ...lastSegment.param } }, '*');
            } else {

            }
        }
    }

    onLButtonUp(event: KMouseEvent, inferenceResult?: KInferenceResult): void {
        if (inferenceResult) {
            // const position = inferenceResult.position;
            if (this.segments.length) {
                const lastSegment = this.segments[this.segments.length - 1];
                if (!lastSegment.startLocked) {
                    lastSegment.startLocked = true;
                    if (lastSegment.pickStartTempShapeId) {
                        appView.clearTemporaryShapesByIds([lastSegment.pickStartTempShapeId]);
                    }
                    this.drawTempComponent(lastSegment);
                } else {
                    // const { type, endWidth } = this.componentParam;
                    // this.componentParam = {
                    //     ...this.componentParam,
                    //     type: type === ComponentType.Platform ? ComponentType.StraightStair : ComponentType.Platform,
                    //     startWidth: endWidth,
                    // };

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
                        // index: this.segments.length,
                    };
                    if (lastParam.type !== ComponentType.Platform) {
                        const { moldShape: { vertices } } = lastSegment;
                        nextSegment.baseLineSeg3d = { start: vertices[vertices.length - 2], end: vertices[vertices.length - 1] };
                    }
                    this.segments.push(nextSegment);
                    pluginUI.postMessage({ type: 'componentParamChanged', componentParam: { ...nextSegment.param } }, '*');

                }
            }
        }
    }

    private drawTempComponent(theSegment: Segment) {
        if (theSegment.startLocked) {
            generateShape(theSegment);
            const {
                stairShape: { vertices: stairVertices, tempLines: stairTempLines },
                moldShape: { vertices: moldVertices, tempLines: moldTempLines },
                cornerShape: { vertices: cornerVertices, tempLines: cornerTempLines },
                cornerMoldShape: { vertices: cornerMoldVertices, tempLines: cornerMoldTempLines },
            } = theSegment;
            const tempLinePoints: KPoint3d[][] = [];
            const moldTempLinePoints: KPoint3d[][] = [];
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
            if (theSegment.tempShapeId?.length) {
                appView.clearTemporaryShapesByIds(theSegment.tempShapeId);
            }
            if (tempLinePoints.length) {
                const tempShapeId = appView.drawPolylines(tempLinePoints, { color: { r: 255, g: 0, b: 0 }, depthTest: false });
                if (tempShapeId?.ids) {
                    theSegment.tempShapeId = tempShapeId.ids;
                }
                const moldTempShapeId = appView.drawPolylines(moldTempLinePoints, { color: { r: 0, g: 255, b: 0 } });
                if (moldTempShapeId?.ids) {
                    if (theSegment.tempShapeId?.length) {
                        theSegment.tempShapeId.push(...moldTempShapeId.ids);
                    } else {
                        theSegment.tempShapeId = moldTempShapeId.ids;
                    }
                }

            }
        }
    }

    async changeComponentParam(componentParam: ComponentParam, changeParams: ComponentParamType[]) {
        const theSegment = this.segments.find(seg => seg.param.index === componentParam.index);
        if (theSegment) {
            const { startWidth: newWidth } = componentParam;
            const { start, param: { index, startWidth, type, offsetWidth }, baseLineSeg3d } = theSegment;
            if (changeParams.indexOf(ComponentParamType.StartWidth) > -1 && type === ComponentType.Platform && baseLineSeg3d && offsetWidth !== 0) {
                const newStartWidth = Math.ceil(startWidth / (startWidth + Math.abs(offsetWidth)) * newWidth);
                const sign = offsetWidth / Math.abs(offsetWidth);
                const newOffsetWidth = sign * (newWidth - newStartWidth);
                const baseDir = baseLineSeg3d.end.subtracted(baseLineSeg3d.start).normalized();
                const newEnd = start.added(baseDir.multiplied(sign * (newStartWidth / 2 + Math.abs(newOffsetWidth))));
                componentParam.startWidth = newStartWidth;
                componentParam.endWidth = newStartWidth;
                componentParam.offsetWidth = newOffsetWidth;
                theSegment.end = newEnd;
            }
            theSegment.param = componentParam;
            if (this.drawing) {
                this.drawTempComponent(theSegment);
            } else if (this.editModel) {
                const theInstance = this.editModel.child.get(index);
                if (theInstance) {
                    generateShape(theSegment);
                    const theMeshes = generateMeshes([theSegment]);
                    if (theMeshes.length) {
                        design.startOperation();
                        let operationSuccess = (await design.activateGroupInstance(this.editModel.parent)).isSuccess;
                        if (operationSuccess) {
                            operationSuccess = operationSuccess && design.removeGroupInstance(theInstance).isSuccess;
                            if (operationSuccess) {
                                const newInstance = buildComponentInstance(theSegment);
                                operationSuccess = operationSuccess && !!newInstance;
                                if (newInstance) {
                                    this.editModel.child.set(index, newInstance);
                                }
                            }
                        }
                        
                        if (operationSuccess) {
                            design.commitOperation();
                        } else {
                            design.abortOperation();
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

    private tryCommit() {
        const meshes = generateMeshes(this.segments);
        if (meshes.length) {
            design.startOperation();

            const newInstances: KGroupInstance[] = [];
            let operationSuccess = true;
            for (const segment of this.segments) {
                if (!operationSuccess) {
                    design.abortOperation();
                    return;
                }
                const newInstance = buildComponentInstance(segment);
                operationSuccess = operationSuccess && !!newInstance;
                if (newInstance) {
                    newInstances.push(newInstance);
                }
            }
            if (newInstances.length) {
                const parentInstance = design.makeGroup([], newInstances, [])?.addedInstance;
                operationSuccess = operationSuccess && !!parentInstance;
                const parentDef = parentInstance?.getGroupDefinition();
                if (parentInstance && parentDef) {
                    operationSuccess = operationSuccess && parentDef.setCustomProperty(StairModelKey, StairModelValue).isSuccess;
                }
            }
            if (operationSuccess) {
                design.commitOperation();
            } else {
                design.abortOperation();
            }
        }
    }

    setModel(groupInstance: KGroupInstance) {
        if (this.editModel?.parent.getKey() === groupInstance.getKey()) {
            return;
        }
        this.editModel = undefined;
        const groupDef = groupInstance.getGroupDefinition();
        if (groupInstance && groupDef) {
            const stairModelProperty = groupDef.getCustomProperty(StairModelKey);
            if (stairModelProperty === StairModelValue) {
                const segments: Segment[] = [];
                const subGroupInstances = groupDef.getSubGroupInstances();
                const editModel: EditModel = { parent: groupInstance, child: new Map() };
                for (const subInstance of subGroupInstances) {
                    const subDef = subInstance.getGroupDefinition();
                    if (subDef) {
                        // const componentIndexValue = parseInt(subDef.getCustomProperty(ComponentIndexKey));
                        // if (isFinite(componentIndexValue)) {
                        const param = parseParam(subDef.getCustomProperty(ParamKey));
                        const startEnd = parseStartEnd(subDef.getCustomProperty(StartEndKey));
                        const baseLineSeg3d = parseStartEnd(subDef.getCustomProperty(BaseLineSeg3dKey));
                        if (param && startEnd && baseLineSeg3d) {
                            const segment: Segment = {
                                ...getEmptySegment(),
                                start: startEnd.start,
                                end: startEnd.end,
                                startHeight: startEnd.start.z,
                                endHeight: startEnd.end.z,
                                baseLineSeg3d,
                                param,
                                startLocked: true,
                                endLocked: true,
                                // index: componentIndexValue,
                            }
                            segments.push(segment);
                            editModel.child.set(param.index, subInstance);
                        }
                        // }
                    }
                }

                if (segments.length) {
                    segments.sort((a, b) => a.param.index - b.param.index);
                    this.segments = segments;
                    this.editModel = editModel;

                    pluginUI.postMessage({ type: 'componentParamChanged', componentParams: this.segments.map(seg => ({ ...seg.param })) }, '*');
                }
            }
        }
    }

    private clear() {
        appView.clearTemporaryShapes();
        // this.componentParam = { ...DefaultComponentParam };
        this.segments = [];
        this.drawing = false;
        this.editModel = undefined;
    }

    onRButtonUp(event: KMouseEvent, inferenceResult?: KInferenceResult): void {
        this.tryCommit();
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