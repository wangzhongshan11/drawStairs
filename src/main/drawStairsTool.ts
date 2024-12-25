import { ComponentType, DefaultPlatformParam, DefaultComponentParam, ComponentParam, Segment } from "./types";
import { DirectionZ, isKArc3d, isKArchFace, isKAuxiliaryBoundedCurve, isKAuxiliaryLine, isKEdge, isKFace, isKGroupInstance, isKPlane, isKVertex } from "./utils";

type ModelType = {
    position: KPoint3d;
    inferenceEntity: KFace | KEdge | KAuxiliaryBoundedCurve | KVertex | KAuxiliaryLine | KGroupInstance | KArchFace;
    normal?: KVector3d;
    direction?: KVector3d;
    path: KGroupInstance[];
    tempShapeId?: string;
}

enum Stage {
    PickUpModel = 0,
    PickUpTarget = 1,
}

export class DrawStairsTool implements KTool {
    // private stairParam: StairParam = DefaultStairParam;
    // private platformParam: PlatformParam = DefaultPlatformParam;
    private componentParam: ComponentParam = { ...DefaultComponentParam };
    private segments: Segment[] = [];
    onToolActive(): void {
        const toolHelper = app.getToolHelper();
        toolHelper.setExcludeInferenceTypes([
            KEntityType.Face, KEntityType.Edge, KEntityType.AuxiliaryBoundedCurve, KEntityType.AuxiliaryLine, KAppEntityType.AuxiliaryVertex,
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
            const { startWidth, endWidth, tempWidth } = this.componentParam;
            const position = inferenceResult.position;
            if (this.segments.length) {
                const lastStairSegment = this.segments[this.segments.length - 1];
                if (lastStairSegment.startLocked) {
                    if (lastStairSegment.type === ComponentType.Stair) {
                        lastStairSegment.end = position;
                        // to compute points
                    } else {
                        if (this.segments.length > 2) {
                            const preStairSegment = this.segments[this.segments.length - 2];
                            if (preStairSegment.type === ComponentType.Stair) {
                                const { start: prevStart, end: prevEnd, param: prevParam, moldShape: prevMoldShape } = preStairSegment;
                                const prevDir = prevEnd.subtracted(prevStart);
                                const prevLeftDir = DirectionZ.cross(prevDir).normalized();
                                const curDir = position.subtracted(lastStairSegment.start);
                                const angle = curDir.angleTo(prevDir, DirectionZ);

                                const curLeftDir = DirectionZ.cross(curDir).normalized();
                                const curEndLeftCorner = position.added(curLeftDir.multiplied(tempWidth / 2));
                                const dir1 = curEndLeftCorner.subtracted(lastStairSegment.start);
                                const angle1 = dir1.angle(curDir);
                                if (0 <= angle && angle < (Math.PI / 2 - angle1)) {
                                    const rightCorner = lastStairSegment.start.added(prevLeftDir.multiplied(-tempWidth / Math.cos(angle)));
                                    const leftConnectPoint = tempWidth > prevParam.endWidth ? prevMoldShape.vertices[prevMoldShape.vertices.length - 1] : 
                                    lastStairSegment.start.added(prevLeftDir.multiplied(-tempWidth * Math.cos(angle)));
                                } else if (angle > (Math.PI * 3 / 2 + angle1)) {
                                    const angle2 = Math.PI * 2 - angle;
                                } else if (angle >= Math.PI) {
                                    const leftLength = curDir.dot(prevLeftDir);
                                    if (leftLength > tempWidth / 2) {
                                        this.componentParam.startWidth = leftLength + tempWidth / 2;
                                        this.componentParam.endWidth = leftLength + tempWidth / 2;
                                        lastStairSegment.leftCorner = lastStairSegment.start.added(prevLeftDir.multiplied(leftLength));
                                        lastStairSegment.rightCorner = lastStairSegment.start.added(prevLeftDir.multiplied(-tempWidth / 2));
                                    } else {
                                        this.componentParam.startWidth = tempWidth;
                                        this.componentParam.endWidth = tempWidth;
                                        lastStairSegment.leftCorner = lastStairSegment.start.added(prevLeftDir.multiplied(tempWidth / 2));
                                        lastStairSegment.rightCorner = lastStairSegment.start.added(prevLeftDir.multiplied(-tempWidth / 2));
                                    }
                                } else {
                                    const rightLength = curDir.dot(prevLeftDir);
                                    if (rightLength > tempWidth / 2) {
                                        this.componentParam.startWidth = rightLength + tempWidth / 2;
                                        this.componentParam.endWidth = rightLength + tempWidth / 2;
                                        lastStairSegment.leftCorner = lastStairSegment.start.added(prevLeftDir.multiplied(tempWidth / 2));
                                        lastStairSegment.rightCorner = lastStairSegment.start.added(prevLeftDir.multiplied(-rightLength));
                                    } else {
                                        this.componentParam.startWidth = tempWidth;
                                        this.componentParam.endWidth = tempWidth;
                                        lastStairSegment.leftCorner = lastStairSegment.start.added(prevLeftDir.multiplied(tempWidth / 2));
                                        lastStairSegment.rightCorner = lastStairSegment.start.added(prevLeftDir.multiplied(-tempWidth / 2));
                                    }
                                }
                            }
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
        if (this.model && this.targetModel) {
            const design = app.getActiveDesign();
            const editPath = design.getEditPath();
            const editTransform = editPath.reduce<KMatrix4>((acc, instance) => {
                acc.multiply(instance.getTransform());
                return acc;
            }, GeomLib.createIdentityMatrix4());
            const { position: modelPosition, inferenceEntity: modelEntity, normal: modelNormal, direction: modelDirection, path: modelPath } = this.model;
            const { position: targetPosition, normal: targetNormal, direction: targetDirection } = this.targetModel;
            const mat = editTransform.inversed().multiplied(GeomLib.createTranslationMatrix4(targetPosition.x - modelPosition.x, targetPosition.y - modelPosition.y, targetPosition.z - modelPosition.z))
            const targetNormalReverse = targetNormal?.reversed();
            if (targetNormalReverse) {
                if (modelNormal && !modelNormal.isParallel(targetNormalReverse)) {
                    const crossVec = modelNormal.cross(targetNormalReverse).normalized();
                    const angel = modelNormal.angleTo(targetNormalReverse, crossVec);
                    const rotateMatrix = GeomLib.createRotateMatrix4(angel, crossVec, this.model.position);
                    mat.multiply(rotateMatrix);
                } else if (modelDirection && !modelDirection.isPerpendicular(targetNormalReverse)) {
                    const crossVec1 = modelDirection.cross(targetNormalReverse).normalized();
                    const angel1 = modelDirection.angleTo(targetNormalReverse, crossVec1);
                    const rotateMatrix1 = GeomLib.createRotateMatrix4(angel1 - Math.PI / 2 * (angel1 > Math.PI ? 3 : 1), crossVec1, this.model.position);
                    mat.multiply(rotateMatrix1);
                }
            } else if (targetDirection) {
                if (modelNormal && !modelNormal.isPerpendicular(targetDirection)) {
                    const crossVec2 = modelNormal.cross(targetDirection).normalized();
                    const angel2 = modelNormal.angleTo(targetDirection, crossVec2);
                    const rotateMatrix1 = GeomLib.createRotateMatrix4(angel2 - Math.PI / 2 * (angel2 > Math.PI ? 3 : 1), crossVec2, this.model.position);
                    mat.multiply(rotateMatrix1);
                } else if (modelDirection && !modelDirection.isParallel(targetDirection)) {
                    const crossVec3 = modelDirection.cross(targetDirection).normalized();
                    const angel3 = modelDirection.angleTo(targetDirection, crossVec3);
                    const rotateMatrix1 = GeomLib.createRotateMatrix4(angel3 - Math.PI / 2 * (angel3 > Math.PI ? 3 : 1), crossVec3, this.model.position);
                    mat.multiply(rotateMatrix1);
                }
            }
            mat.multiply(editTransform);
            const targetToTransform = modelPath.find(instance => !editPath.some(ins => ins.getKey() === instance.getKey())) || modelEntity;
            let transformSuccess: boolean = false;
            if (isKFace(targetToTransform) || isKEdge(targetToTransform)) {
                const shell = targetToTransform.getShell();
                if (shell) {
                    transformSuccess = design.transformShells([shell], mat).isSuccess;
                }

            } else if (isKVertex(targetToTransform)) {
                const shell = targetToTransform.getEdges()[0].getShell();
                if (shell) {
                    transformSuccess = design.transformShells([shell], mat).isSuccess;
                }
            } else if (isKAuxiliaryBoundedCurve(targetToTransform) || isKAuxiliaryLine(targetToTransform)) {
                transformSuccess = design.transformAuxiliaryCurves([targetToTransform], mat).isSuccess;
            } else if (isKGroupInstance(targetToTransform)) {
                transformSuccess = design.transformGroupInstances([targetToTransform], mat).isSuccess;
            }
            if (transformSuccess) {
                const selection = app.getSelection();
                selection.add([targetToTransform as KEntity]);
            }
            // const pickHelper = app.getPickHelper();
            // // const pickableEntityType = this.model ? [KEntityType.AuxiliaryBoundedCurve] : [KAppEntityType.GroupInstance, KEntityType.Face];
            // const allPickedEntities = pickHelper.pickByPoint(event.clientX(), event.clientY()).getAllPicked();

        }
    }

    private clear() {
        const appView = app.getActiveView();
        appView.clearTemporaryShapes();
        this.model = undefined;
        this.targetModel = undefined;
        this.stage = Stage.PickUpModel;
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