import { FirstSegment } from "./consts";
import { ComponentType, DefaultComponentParam, ComponentParam, Segment } from "./types";
import { computeComponentShape } from "./utils";

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
        pluginUI.postMessage({ type: 'componentParamChanged', componentParam: this.componentParam }, '*');
    }

    onToolDeactive(): void {
        this.tryCommit();
        pluginUI.postMessage({ type: 'leaveDrawStairsTool' }, '*');
        toolHelper.setExcludeInferenceTypes([]);
        this.clear();
    }

    onMouseMove(event: KMouseEvent, inferenceResult?: KInferenceResult): void {
        if (inferenceResult) {
            // const { startWidth, endWidth, tempWidth, platformThickness } = this.componentParam;
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
                                    lastSegment.baseLineSeg3d = lineSeg3d;
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
            } else {

            }
        }
    }

    onLButtonUp(event: KMouseEvent, inferenceResult?: KInferenceResult): void {
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
                } else {
                    const { type, tempWidth } = this.componentParam;
                    this.componentParam = {
                        ...this.componentParam,
                        type: type === ComponentType.Platform ? ComponentType.StraightStair : ComponentType.Platform,
                        startWidth: tempWidth,
                        endWidth: tempWidth,
                    };
                    pluginUI.postMessage({ type: 'componentParamChanged', componentParam: this.componentParam }, '*');

                    lastSegment.endLocked = true;
                    const nextSegment: Segment = {
                        ...FirstSegment,
                        start: lastSegment.end,
                        end: lastSegment.end,
                        startLocked: type === ComponentType.Platform ? false : true,
                        startHeight: lastSegment.endHeight,
                        endHeight: lastSegment.endHeight,
                        param: this.componentParam,
                    };
                    if (type !== ComponentType.Platform) {
                        const { moldShape: { vertices } } = lastSegment;
                        nextSegment.baseLineSeg3d = GeomLib.createLineSegment3d(vertices[vertices.length - 2], vertices[vertices.length - 1]);
                    }
                    this.segments.push(nextSegment);
                }
            } else {
                const firstSegment: Segment = { ...FirstSegment, start: position, end: position, param: this.componentParam };
                this.segments.push(firstSegment);
            }
        }
    }

    private drawTempComponent(lastSegment: Segment) {
        // if (this.segments.length) {
        // const lastSegment = this.segments[this.segments.length - 1];
        if (lastSegment.startLocked) {
            computeComponentShape(lastSegment, this.componentParam, this.segments);
            const { stairShape: { vertices: stairVertices, tempLines: stairTempLines }, moldShape: { vertices: moldVertices, tempLines: moldTempLines } } = lastSegment;
            const tempLinePoints: KPoint3d[][] = [];
            const moldTempLinePoints: KPoint3d[][] = [];
            for (const stairTempLine of stairTempLines) {
                tempLinePoints.push([stairVertices[stairTempLine[0]], stairVertices[stairTempLine[1]]]);
            }
            for (const moldTempLine of moldTempLines) {
                moldTempLinePoints.push([moldVertices[moldTempLine[0]], moldVertices[moldTempLine[1]]]);
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

        // }
    }

    changeComponentParam(componentParam: ComponentParam) {
        this.componentParam = componentParam;
        if (this.segments.length) {
            const lastSegment = this.segments[this.segments.length - 1];
            this.drawTempComponent(lastSegment);
        }
    }

    changeComponentType(componentType: ComponentType) {
        this.componentParam.type = componentType;
        this.changeComponentParam(this.componentParam);
    }

    private tryCommit() {

    }

    private clear() {
        appView.clearTemporaryShapes();
        this.componentParam = { ...DefaultComponentParam };
        this.segments = [];
    }

    onRButtonUp(event: KMouseEvent, inferenceResult?: KInferenceResult): void {
        app.deactivateCustomTool(this);
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