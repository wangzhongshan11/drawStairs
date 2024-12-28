import { ComponentType, DefaultComponentParam, ComponentParam, Segment } from "./types";
import { computeComponentShape } from "./utils";



export class DrawStairsTool implements KTool {
    // private stairParam: StairParam = DefaultStairParam;
    // private platformParam: PlatformParam = DefaultPlatformParam;
    private componentParam: ComponentParam = { ...DefaultComponentParam };
    private segments: Segment[] = [];
    onToolActive(): void {
        const toolHelper = app.getToolHelper();
        toolHelper.setExcludeInferenceTypes([
            KEntityType.Face, KEntityType.Edge, KEntityType.AuxiliaryBoundedCurve, KEntityType.AuxiliaryLine, KEntityType.AuxiliaryVertex,
            KEntityType.GroupInstance, KEntityType.Vertex, KArchFaceType.NonPlanar, KArchFaceType.Planar,
        ]);
    }

    onToolDeactive(): void {
        const pluginUI = app.getPluginUI();
        this.tryCommit();
        pluginUI.postMessage({ type: 'leaveDrawStairsTool' }, '*');
        const toolHelper = app.getToolHelper();
        toolHelper.setExcludeInferenceTypes([]);
        this.clear();
    }
    onMouseMove(event: KMouseEvent, inferenceResult?: KInferenceResult): void {
        const appView = app.getActiveView();
        if (inferenceResult) {
            // const { startWidth, endWidth, tempWidth, platformThickness } = this.componentParam;
            const position = inferenceResult.position;
            if (this.segments.length) {
                const lastStairSegment = this.segments[this.segments.length - 1];
                if (lastStairSegment.startLocked) {
                    lastStairSegment.end = position;
                    // if (lastStairSegment.type === ComponentType.Stair) {
                    //     // to compute points
                    // } else {

                    // }
                    computeComponentShape(lastStairSegment, this.componentParam, this.segments);
                    const { stairShape: { vertices: stairVertices, tempLines: stairTempLines }, moldShape: { vertices: moldVertices, tempLines: moldTempLines } } = lastStairSegment;
                    const tempLinePoints: KPoint3d[][] = [];
                    for (const stairTempLine of stairTempLines) {
                        tempLinePoints.push([stairVertices[stairTempLine[0]], stairVertices[stairTempLine[1]]]);
                    }
                    for (const moldTempLine of moldTempLines) {
                        tempLinePoints.push([moldVertices[moldTempLine[0]], moldVertices[moldTempLine[1]]]);
                    }
                    if (lastStairSegment.tempShapeId?.length) {
                        appView.clearTemporaryShapesByIds(lastStairSegment.tempShapeId);
                    }
                    if (tempLinePoints.length) {
                        const tempShapeId = appView.drawPolylines(tempLinePoints, { color: { r: 255, g: 0, b: 0 } });
                        if (tempShapeId?.ids) {
                            lastStairSegment.tempShapeId = tempShapeId?.ids;
                        }
                    }
                } else {

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

                } else {
                    this.componentParam = { ...DefaultComponentParam };
                    lastSegment.endLocked = true;
                    const nextSegment: Segment = {
                        type: ComponentType.Stair,
                        start: lastSegment.end,
                        end: lastSegment.end,
                        startLocked: lastSegment.type === ComponentType.Platform ? false : true,
                        endLocked: false,
                        startHeight: 0,
                        stairShape: {
                            vertices: [],
                            tempLines: [],
                        },
                        moldShape: {
                            vertices: [],
                            tempLines: [],
                        },
                        param: this.componentParam,
                    }
                    this.segments.push(nextSegment);
                }
            } else {
                const firstSegment: Segment = {
                    type: ComponentType.Stair,
                    start: position,
                    end: position,
                    startLocked: true,
                    endLocked: false,
                    startHeight: 0,
                    stairShape: {
                        vertices: [],
                        tempLines: [],
                    },
                    moldShape: {
                        vertices: [],
                        tempLines: [],
                    },
                    param: this.componentParam,
                }
                this.segments.push(firstSegment);
            }
        }
    }

    private tryCommit() {

    }

    private clear() {
        const appView = app.getActiveView();
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

export const alignTool = new DrawStairsTool();