import { StairParam, StairSegment, StairType, StepType } from "./types";

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
function computeStairShape(stairSegment: StairSegment, stairParam: StairParam) {
    const { start, end, stairShape: { stair, corner } } = stairSegment;
    const { width, type, step, stepType, cornerType } = stairParam;
    const horizontalEnd = GeomLib.createPoint3d(end.x - start.x, end.y - start.y, start.z);
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
            stair.shape.main.vertices = [];
            stair.shape.main.tempLines = [];
            const stairMainVertices = stair.shape.main.vertices;
            const stairMainTempLines = stair.shape.main.tempLines;
            if (Math.abs(stepHeight) > HeightTolerance) {
                for (let i = 0; i < stepCount; i++) {
                    if (stepHeight > 0) {
                        if (i === 0) {
                            stairMainVertices.push(start.added(horizontalLeftDir.multiplied(width / 2)), start.added(horizontalLeftDir.multiplied(-width / 2)));
                        } else {
                            stairMainVertices.push(stairMainVertices[stairMainVertices.length - 2].added(horizontalFrontDir.multiplied(step)), stairMainVertices[stairMainVertices.length - 1].added(horizontalFrontDir.multiplied(step)));
                        }
                        stairMainVertices.push(stairMainVertices[stairMainVertices.length - 2].added(vertitalFrontDir.multiplied(stepHeight)), stairMainVertices[stairMainVertices.length - 1].added(vertitalFrontDir.multiplied(stepHeight)));
                        stairMainTempLines.push(
                            [stairMainVertices.length - 4, stairMainVertices.length - 3],
                            [stairMainVertices.length - 4, stairMainVertices.length - 2],
                            [stairMainVertices.length - 3, stairMainVertices.length - 1],
                            [stairMainVertices.length - 2, stairMainVertices.length - 1],
                        );
                        if (i > 0) {
                            stairMainTempLines.push(
                                [stairMainVertices.length - 6, stairMainVertices.length - 4],
                                [stairMainVertices.length - 5, stairMainVertices.length - 3],
                            );
                        }
                    } else {
                        if (i === 0) {
                            stairMainVertices.push(
                                start.added(horizontalLeftDir.multiplied(width / 2)).added(vertitalFrontDir.multiplied(stepHeight)),
                                start.added(horizontalLeftDir.multiplied(-width / 2)).added(vertitalFrontDir.multiplied(stepHeight))
                            );
                            stairMainTempLines.push(
                                [stairMainVertices.length - 2, stairMainVertices.length - 1],
                            );
                        } else {
                            stairMainVertices.push(stairMainVertices[stairMainVertices.length - 2].added(horizontalFrontDir.multiplied(step)), stairMainVertices[stairMainVertices.length - 1].added(horizontalFrontDir.multiplied(step)));
                            stairMainVertices.push(stairMainVertices[stairMainVertices.length - 2].added(vertitalFrontDir.multiplied(stepHeight)), stairMainVertices[stairMainVertices.length - 1].added(vertitalFrontDir.multiplied(stepHeight)));
                            stairMainTempLines.push(
                                [stairMainVertices.length - 4, stairMainVertices.length - 3],
                                [stairMainVertices.length - 4, stairMainVertices.length - 2],
                                [stairMainVertices.length - 3, stairMainVertices.length - 1],
                                [stairMainVertices.length - 2, stairMainVertices.length - 1],
                                [stairMainVertices.length - 6, stairMainVertices.length - 4],
                                [stairMainVertices.length - 5, stairMainVertices.length - 3],
                            );
                        }
                    }
                }
                if (lastStepLength > LengthTolerance) {
                    stairMainVertices.push(stairMainVertices[stairMainVertices.length - 2].added(horizontalFrontDir.multiplied(step)), stairMainVertices[stairMainVertices.length - 1].added(horizontalFrontDir.multiplied(step)));
                    stairMainTempLines.push(
                        [stairMainVertices.length - 2, stairMainVertices.length - 1],
                    );
                }

            } else {
                for (let j = 0; j < stepCount; j++) {
                    if (j === 0) {
                        stairMainVertices.push(start.added(horizontalLeftDir.multiplied(width / 2)), start.added(horizontalLeftDir.multiplied(-width / 2)));
                    } else {
                        stairMainVertices.push(stairMainVertices[stairMainVertices.length - 2].added(horizontalFrontDir.multiplied(step)), stairMainVertices[stairMainVertices.length - 1].added(horizontalFrontDir.multiplied(step)));
                    }
                    stairMainVertices.push(stairMainVertices[stairMainVertices.length - 2].added(vertitalFrontDir.multiplied(stepHeight)), stairMainVertices[stairMainVertices.length - 1].added(vertitalFrontDir.multiplied(stepHeight)));
                    
                }
            }
        } else if (stepType === StepType.Open) {

        } else {

        }
    }
}

function computeCornerShape(stairSegment: StairSegment, stairParam: StairParam) {

}