import { ComponentType, DefaultComponentParam, ComponentParam, Segment, ParamKey, StartEndKey, BaseLineSeg3dKey, StairModelKey, ComponentParamType, ComponentIndexKey, StairModelValue } from "./types";
import { generateTempShape } from "./tempMeshUtils";
import { generateMeshes } from "./meshUtils";
import { parseParam, parseStartEnd, stringifyParam, stringifyStartEnd } from "./utils";
import { getEmptySegment } from "./consts";

const design = app.getActiveDesign();
const pluginUI = app.getPluginUI();
const appView = app.getActiveView();
const toolHelper = app.getToolHelper();

export class DrawStairsTool implements KTool {
    private componentParam: ComponentParam = { ...DefaultComponentParam };
    private segments: Segment[] = [];

    onToolActive(): void {
        toolHelper.setExcludeInferenceTypes([
            KEntityType.Face, KEntityType.Edge, KEntityType.AuxiliaryBoundedCurve, KEntityType.AuxiliaryLine, KEntityType.AuxiliaryVertex,
            KEntityType.GroupInstance, KEntityType.Vertex, KArchFaceType.NonPlanar, KArchFaceType.Planar,
        ]);
        const firstSegment: Segment = getEmptySegment();
        firstSegment.startLocked = false;
        pluginUI.postMessage({ type: 'componentParamChanged', componentParam: { ...firstSegment.param, index: firstSegment.index } }, '*');
        // pluginUI.postMessage({ type: 'componentParamChanged', componentParam: { ...this.componentParam, index: this.segments.length ? this.segments[this.segments.length - 1] : 0 } }, '*');
        this.segments.push(firstSegment);
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
                pluginUI.postMessage({ type: 'componentParamChanged', componentParam: { ...this.componentParam } }, '*');

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
                    const { type, endWidth } = this.componentParam;
                    this.componentParam = {
                        ...this.componentParam,
                        type: type === ComponentType.Platform ? ComponentType.StraightStair : ComponentType.Platform,
                        startWidth: endWidth,
                    };
                    pluginUI.postMessage({ type: 'componentParamChanged', componentParam: { ...this.componentParam } }, '*');

                    lastSegment.endLocked = true;
                    const nextSegment: Segment = {
                        ...getEmptySegment(),
                        start: lastSegment.end,
                        end: lastSegment.end,
                        startLocked: type === ComponentType.Platform ? false : true,
                        startHeight: lastSegment.endHeight,
                        endHeight: lastSegment.endHeight,
                        param: this.componentParam,
                        index: this.segments.length,
                    };
                    if (type !== ComponentType.Platform) {
                        const { moldShape: { vertices } } = lastSegment;
                        nextSegment.baseLineSeg3d = { start: vertices[vertices.length - 2], end: vertices[vertices.length - 1] };

                    }
                    this.segments.push(nextSegment);
                }
            }
        }
    }

    private drawTempComponent(lastSegment: Segment) {
        if (lastSegment.startLocked) {
            generateTempShape(lastSegment, this.componentParam, this.segments);
            const {
                stairShape: { vertices: stairVertices, tempLines: stairTempLines },
                moldShape: { vertices: moldVertices, tempLines: moldTempLines },
                cornerShape: { vertices: cornerVertices, tempLines: cornerTempLines },
                cornerMoldShape: { vertices: cornerMoldVertices, tempLines: cornerMoldTempLines },
            } = lastSegment;
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
            if (lastSegment.tempShapeId?.length) {
                appView.clearTemporaryShapesByIds(lastSegment.tempShapeId);
            }
            if (tempLinePoints.length) {
                const tempShapeId = appView.drawPolylines(tempLinePoints, { color: { r: 255, g: 0, b: 0 }, depthTest: false });
                if (tempShapeId?.ids) {
                    lastSegment.tempShapeId = tempShapeId.ids;
                }
                const moldTempShapeId = appView.drawPolylines(moldTempLinePoints, { color: { r: 0, g: 255, b: 0 } });
                if (moldTempShapeId?.ids) {
                    if (lastSegment.tempShapeId?.length) {
                        lastSegment.tempShapeId.push(...moldTempShapeId.ids);
                    } else {
                        lastSegment.tempShapeId = moldTempShapeId.ids;
                    }
                }

            }
        }
    }

    changeComponentParam(componentParam: ComponentParam, changeParams: ComponentParamType[]) {
        if (this.segments.length) {
            const lastSegment = this.segments[this.segments.length - 1];
            const { startWidth: newWidth } = componentParam;
            const { start, param: { startWidth, type, offsetWidth }, baseLineSeg3d } = lastSegment;
            if (changeParams.indexOf(ComponentParamType.StartWidth) > -1 && type === ComponentType.Platform && baseLineSeg3d && offsetWidth !== 0) {
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
        } else {
            this.componentParam = componentParam;
        }
    }

    changeComponentType(componentType: ComponentType) {
        this.componentParam.type = componentType;
        pluginUI.postMessage({ type: 'componentParamChanged', componentParam: { ...this.componentParam } }, '*');
        this.changeComponentParam(this.componentParam, [ComponentParamType.Type]);
    }

    private tryCommit() {
        const meshes = generateMeshes(this.segments);
        if (meshes.length) {
            design.startOperation();

            const newInstances: KGroupInstance[] = [];
            let operationSuccess = true;
            for (const { start, end, startHeight, endHeight, baseLineSeg3d, param, mesh } of this.segments) {
                if (!operationSuccess) {
                    design.abortOperation();
                    return;
                }
                if (mesh?.vertices.length) {
                    const newShell = design.createShellFromMesh(mesh)?.newShell;
                    operationSuccess = operationSuccess && !!newShell;
                    if (newShell) {
                        const newInstance = design.makeGroup(newShell.getFaces(), [], [])?.addedInstance;
                        operationSuccess = operationSuccess && !!newInstance;
                        const groupDef = newInstance?.getGroupDefinition();
                        if (newInstance && groupDef) {
                            operationSuccess = operationSuccess && groupDef.setCustomProperty(ComponentIndexKey, `${newInstances.length}`).isSuccess;
                            newInstances.push(newInstance);
                            const paramString = stringifyParam(param);
                            const startEndString = stringifyStartEnd(GeomLib.createPoint3d(start.x, start.y, startHeight), GeomLib.createPoint3d(end.x, end.y, endHeight));
                            operationSuccess = operationSuccess && groupDef.setCustomProperty(ParamKey, paramString).isSuccess;
                            operationSuccess = operationSuccess && groupDef.setCustomProperty(StartEndKey, startEndString).isSuccess;
                            if (baseLineSeg3d) {
                                const BaseLineString = stringifyStartEnd(baseLineSeg3d.start, baseLineSeg3d.end);
                                operationSuccess = operationSuccess && groupDef.setCustomProperty(BaseLineSeg3dKey, BaseLineString).isSuccess;
                            }
                        }
                    }
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
        const groupDef = groupInstance.getGroupDefinition();
        if (groupDef) {
            const stairModelProperty = groupDef.getCustomProperty(StairModelKey);
            if (stairModelProperty === StairModelValue) {
                const segments: Segment[] = [];
                const subGroupInstances = groupDef.getSubGroupInstances();
                for (const subInstance of subGroupInstances) {
                    const subDef = subInstance.getGroupDefinition();
                    if (subDef) {
                        const componentIndexValue = parseInt(subDef.getCustomProperty(ComponentIndexKey));
                        if (isFinite(componentIndexValue)) {
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
                                    index: componentIndexValue,
                                }
                                segments.push(segment);
                            }
                        }
                    }
                }
                if (segments.length) {
                    segments.sort((a, b) => a.index - b.index);
                    this.segments = segments;
                }
            }
        }
    }

    private clear() {
        appView.clearTemporaryShapes();
        this.componentParam = { ...DefaultComponentParam };
        this.segments = [];
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