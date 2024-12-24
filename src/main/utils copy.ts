import { CornerType, StairParam, StairSegment, StairType, StepType } from "./types";

export function isKArchFace(entity: KEntity | KArchFace | undefined | null): entity is KArchFace {
    return !!entity && (entity.getType() === KArchFaceType.NonPlanar || entity.getType() === KArchFaceType.Planar);
}

export function isKGroupInstance(entity: KEntity | KArchFace | undefined | null): entity is KGroupInstance {
    return !!entity && entity.getType() === KEntityType.GroupInstance;
}

export function isKFace(entity: KEntity | KArchFace | undefined | null): entity is KFace {
    return !!entity && entity.getType() === KEntityType.Face;
}

export function isKEdge(entity: KEntity | KArchFace | undefined | null): entity is KEdge {
    return !!entity && entity.getType() === KEntityType.Edge;
}

export function isKVertex(entity: KEntity | KArchFace | undefined | null): entity is KVertex {
    return !!entity && entity.getType() === KEntityType.Vertex;
}

export function isKAuxiliaryBoundedCurve(entity: KEntity | KArchFace | undefined | null): entity is KAuxiliaryBoundedCurve {
    return !!entity && entity.getType() === KEntityType.AuxiliaryBoundedCurve;
}

export function isKAuxiliaryLine(entity: KEntity | KArchFace | undefined | null): entity is KAuxiliaryLine {
    return !!entity && entity.getType() === KEntityType.AuxiliaryLine;
}

export function isKPlane(entity: KSurface | undefined | null): entity is KPlane {
    return !!entity && entity.getType() === KSurfaceType.Plane;
}

export function isKLineSegment3d(entity: KBoundedCurve3d | undefined | null): entity is KLineSegment3d {
    return !!entity && !!(entity as KLineSegment3d).direction;
}

export function isKArc3d(entity: KBoundedCurve3d | undefined | null): entity is KArc3d {
    return !!entity && !!(entity as KArc3d).circle;
}

export function computeStairSegment(stairSegment: StairSegment, stairParam: StairParam) {
    const { start, end, stairShape: { stair, corner } } = stairSegment;
    const { width, type, step, stepType, cornerType } = stairParam;

}

const HeightTolerance: number = 5;
const LengthTolerance: number = 1;
const DirectionZ = GeomLib.createVector3d(0, 0, 1);
const DefaultBoardThickness = 50;
function computeStairShape(stairSegment: StairSegment, stairParam: StairParam) {
    const { start, end, stairShape: { stair, corner } } = stairSegment;
    const { width, type, step, stepType, cornerType } = stairParam;
    const horizontalEnd = GeomLib.createPoint3d(end.x - start.x, end.y - start.y, start.z);
    stair.shape.main.vertices = [];
    stair.shape.main.tempLines = [];
    if (type === StairType.Straight) {
        const horizontalFrontDir = horizontalEnd.subtracted(start).normalized();
        const vertitalFrontDir = end.subtracted(horizontalEnd).normalized();
        const horizontalLeftDir = DirectionZ.cross(horizontalFrontDir);
        const verticalDistance = end.z - start.z;
        const horizontalDistance = start.distanceTo(horizontalEnd);
        const stepCount = Math.ceil(horizontalDistance / step);
        const lastStepLength = horizontalDistance - (stepCount - 1) * step;
        // if (lastStepLength < LengthTolerance) {
        //     stepCount--;
        // }
        // if (stepCount < 1) return;
        stair.stepCount = stepCount;
        const stepHeight = verticalDistance / stepCount;
        if (stepType === StepType.Normal) {
            const stairMainVertices = stair.shape.main.vertices;
            const stairMainTempLines = stair.shape.main.tempLines;
            const leftPt = start.added(horizontalLeftDir.multiplied(width / 2));
            const rightPt = start.added(horizontalLeftDir.multiplied(-width / 2));
            if (Math.abs(stepHeight) > HeightTolerance) {
                for (let i = 0; i < stepCount - 1; i++) {
                    const curLeftPt = leftPt.added(horizontalFrontDir.multiplied(i * step)).added(vertitalFrontDir.multiplied(i * stepHeight));
                    const curRightPt = rightPt.added(horizontalFrontDir.multiplied(i * step)).added(vertitalFrontDir.multiplied(i * stepHeight));
                    stairMainVertices.push(curLeftPt, curRightPt,);
                    if (stepHeight > 0) {
                        stairMainVertices.push(
                            curLeftPt.added(vertitalFrontDir.multiplied(stepHeight)),
                            curRightPt.added(vertitalFrontDir.multiplied(stepHeight)),
                        );
                    } else {
                        stairMainVertices.push(
                            curLeftPt.added(horizontalFrontDir.multiplied(step)),
                            curRightPt.added(horizontalFrontDir.multiplied(step)),
                        );
                    }
                    stairMainTempLines.push(
                        [4 * i, 1 + 4 * i],
                        [4 * i, 2 + 4 * i],
                        [1 + 4 * i, 3 + 4 * i],
                        [2 + 4 * i, 3 + 4 * i],
                        [2 + 4 * i, 4 + 4 * i],
                        [3 + 4 * i, 5 + 4 * i],
                    );
                }
                if (lastStepLength > LengthTolerance) {
                    if (stepHeight > 0) {
                        stairMainVertices.push(
                            stairMainVertices[stairMainVertices.length - 2].added(vertitalFrontDir.multiplied(stepHeight)),
                            stairMainVertices[stairMainVertices.length - 1].added(vertitalFrontDir.multiplied(stepHeight))
                        );
                        stairMainVertices.push(
                            stairMainVertices[stairMainVertices.length - 2].added(horizontalFrontDir.multiplied(lastStepLength)),
                            stairMainVertices[stairMainVertices.length - 1].added(horizontalFrontDir.multiplied(lastStepLength))
                        );
                        stairMainTempLines.push(
                            [4 * stepCount, 1 + 4 * stepCount],
                            [4 * stepCount, 2 + 4 * stepCount],
                            [1 + 4 * stepCount, 3 + 4 * stepCount],
                            [2 + 4 * stepCount, 3 + 4 * stepCount],
                            [2 + 4 * stepCount, 4 + 4 * stepCount],
                            [3 + 4 * stepCount, 5 + 4 * stepCount],
                            [4 * (stepCount + 1), 1 + 4 * (stepCount + 1)],
                        );
                    } else {
                        stairMainVertices.push(
                            stairMainVertices[stairMainVertices.length - 2].added(horizontalFrontDir.multiplied(lastStepLength)),
                            stairMainVertices[stairMainVertices.length - 1].added(horizontalFrontDir.multiplied(lastStepLength))
                        );
                        stairMainTempLines.push(
                            [4 * stepCount, 1 + 4 * stepCount],
                            [4 * stepCount, 2 + 4 * stepCount],
                            [1 + 4 * stepCount, 3 + 4 * stepCount],
                            [2 + 4 * stepCount, 3 + 4 * stepCount],
                        );
                    }
                } else {
                    stairMainTempLines.push(
                        [4 * stepCount, 1 + 4 * stepCount],
                    );
                }
                if (stepCount > 1) {
                    stairMainTempLines.push(
                        [stairMainVertices.length - 2, 2 + stairMainVertices.length - 2],
                        [1 + stairMainVertices.length - 2, 3 + stairMainVertices.length - 2],
                        [2 + stairMainVertices.length - 2, 3 + stairMainVertices.length - 2],
                        [2 + stairMainVertices.length - 2, 4 + stairMainVertices.length - 2],
                        [3 + stairMainVertices.length - 2, 5 + stairMainVertices.length - 2],
                        [stairMainVertices.length + 2, 1 + stairMainVertices.length + 2],
                        [stairMainVertices.length + 2, 2 + stairMainVertices.length + 2],
                        [1 + stairMainVertices.length + 2, 3 + stairMainVertices.length + 2],
                    );
                    if (stepHeight > 0) {
                        stairMainVertices.push(
                            leftPt.added(vertitalFrontDir.multiplied((stepCount - 1) * stepHeight)).added(horizontalFrontDir.multiplied((stepCount - 2) * step)),
                            rightPt.added(vertitalFrontDir.multiplied((stepCount - 1) * stepHeight)).added(horizontalFrontDir.multiplied((stepCount - 2) * step)),
                        );
                        stairMainVertices.push(
                            leftPt.added(vertitalFrontDir.multiplied(stepHeight)),
                            rightPt.added(vertitalFrontDir.multiplied(stepHeight)),
                        );
                    } else {
                        stairMainVertices.push(
                            leftPt.added(vertitalFrontDir.multiplied((stepCount - 2) * stepHeight + lastStepLength / step * stepHeight)).added(horizontalFrontDir.multiplied(horizontalDistance)),
                            rightPt.added(vertitalFrontDir.multiplied((stepCount - 2) * stepHeight + lastStepLength / step * stepHeight)).added(horizontalFrontDir.multiplied(horizontalDistance)),
                        );
                        stairMainVertices.push(
                            leftPt.added(horizontalFrontDir.multiplied(step)),
                            rightPt.added(horizontalFrontDir.multiplied(step)),
                        );
                    }
                } else {
                    stairMainTempLines.push(
                        [stairMainVertices.length - 2, 2 + stairMainVertices.length - 2],
                        [1 + stairMainVertices.length - 2, 3 + stairMainVertices.length - 2],
                        [2 + stairMainVertices.length - 2, 3 + stairMainVertices.length - 2],
                        [2 + stairMainVertices.length - 2, 4 + stairMainVertices.length - 2],
                        [3 + stairMainVertices.length - 2, 5 + stairMainVertices.length - 2],
                    );
                    if (stepHeight > 0) {
                        stairMainVertices.push(
                            leftPt.added(horizontalFrontDir.multiplied(horizontalDistance)),
                            rightPt.added(horizontalFrontDir.multiplied(horizontalDistance)),
                        );
                    } else {
                        stairMainVertices.push(
                            leftPt.added(vertitalFrontDir.multiplied(stepHeight)),
                            rightPt.added(vertitalFrontDir.multiplied(stepHeight)),
                        );
                    }
                }

            } else {
                for (let j = 0; j < stepCount; j++) {
                    const curLeftPt = leftPt.added(horizontalFrontDir.multiplied(j * step));
                    const curRightPt = rightPt.added(horizontalFrontDir.multiplied(j * step));
                    stairMainVertices.push(
                        curLeftPt.added(vertitalFrontDir.multiplied(-DefaultBoardThickness)),
                        curRightPt.added(vertitalFrontDir.multiplied(-DefaultBoardThickness)),
                    );
                    stairMainVertices.push(curLeftPt, curRightPt);

                    stairMainTempLines.push(
                        [4 * j, 1 + 4 * j],
                        [1 + 4 * j, 3 + 4 * j],
                        [3 + 4 * j, 2 + 4 * j],
                        [2 + 4 * j, 4 * j],
                        [4 * j, 4 + 4 * j],
                        [1 + 4 * j, 5 + 4 * j],
                        [3 + 4 * j, 7 + 4 * j],
                        [4 + 4 * j, 6 + 4 * j],
                    );
                }
                stairMainVertices.push(
                    leftPt.added(horizontalFrontDir.multiplied(horizontalDistance)).added(vertitalFrontDir.multiplied(-DefaultBoardThickness)),
                    rightPt.added(horizontalFrontDir.multiplied(horizontalDistance)).added(vertitalFrontDir.multiplied(-DefaultBoardThickness)),
                );
                stairMainVertices.push(
                    leftPt.added(horizontalFrontDir.multiplied(horizontalDistance)),
                    rightPt.added(horizontalFrontDir.multiplied(horizontalDistance))
                );
                // if (lastStepLength > LengthTolerance) {
                stairMainTempLines.push(
                    [4 * stepCount, 1 + 4 * stepCount],
                    [1 + 4 * stepCount, 3 + 4 * stepCount],
                    [3 + 4 * stepCount, 2 + 4 * stepCount],
                    [2 + 4 * stepCount, 4 * stepCount],
                );
                // }
            }
        } else if (stepType === StepType.Open) {

        } else {

        }
    }
}

function computeCornerShape(stairSegment: StairSegment, stairParam: StairParam) {
    const { start, end, stairShape: { stair, corner } } = stairSegment;
    const { width, type, step, stepType, cornerType } = stairParam;
    const horizontalEnd = GeomLib.createPoint3d(end.x - start.x, end.y - start.y, start.z);
    corner.main.vertices = [];
    corner.main.tempLines = [];
    const mainVertices = corner.main.vertices;
    corner.main.tempLines
    if (cornerType === CornerType.Rectangle) {
        const verticalDistance = end.z - start.z;
        const horizontalDistance = start.distanceTo(horizontalEnd);
        const stepCount = Math.ceil(horizontalDistance / step);
        const stepHeight = verticalDistance / stepCount;
    } else if (cornerType === CornerType.Arc) {

    }
}