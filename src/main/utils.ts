import { ComponentParam, ComponentType, Segment, StairType } from "./types";

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


const HeightTolerance: number = 5;
const LengthTolerance: number = 1;
export const DirectionZ = GeomLib.createVector3d(0, 0, 1);
const DefaultBoardThickness = 50;
function computeComponentShape(segment: Segment, componentParam: ComponentParam) {
    const { type } = segment;
    if (type === ComponentType.Stair) {
        computeStairShape(segment, componentParam);
    } else {
        computePlatformShape(segment, componentParam);
    }
}

function computeStairShape(segment: Segment, componentParam: ComponentParam) {
    const { start, end, stairShape, startHeight } = segment;
    const { startWidth, endWidth, type, horizontalStep, verticalStep, upward } = componentParam;
    stairShape.vertices = [];
    stairShape.tempLines = [];
    const { vertices, tempLines } = stairShape;
    if (type === StairType.Straight) {
        const horizontalFrontDir = end.subtracted(start).normalized();
        const vertitalFrontDir = DirectionZ;
        const horizontalLeftDir = DirectionZ.cross(horizontalFrontDir);
        const horizontalDistance = start.distanceTo(end);
        const stepFloatCount = horizontalDistance / horizontalStep;
        const stepCount = Math.ceil(stepFloatCount);
        const lastStepLength = horizontalDistance - (stepCount - 1) * horizontalStep;
        const stepHeight = upward ? verticalStep : -verticalStep;
        const leftPt = start.added(DirectionZ.multiplied(startHeight)).added(horizontalLeftDir.multiplied(startWidth / 2));
        const rightPt = start.added(DirectionZ.multiplied(startHeight)).added(horizontalLeftDir.multiplied(-startWidth / 2));
        const widthDelta = (endWidth - startWidth) / 2 / (stepFloatCount);
        for (let i = 0; i < stepCount - 1; i++) {
            const curLeftPt = leftPt.added(horizontalFrontDir.multiplied(i * horizontalStep)).added(horizontalLeftDir.multiplied(i * widthDelta)).added(vertitalFrontDir.multiplied(i * stepHeight));
            const curRightPt = rightPt.added(horizontalFrontDir.multiplied(i * horizontalStep)).added(horizontalLeftDir.multiplied(-i * widthDelta)).added(vertitalFrontDir.multiplied(i * stepHeight));
            vertices.push(curLeftPt, curRightPt,);
            if (upward) {
                vertices.push(
                    curLeftPt.added(vertitalFrontDir.multiplied(stepHeight)),
                    curRightPt.added(vertitalFrontDir.multiplied(stepHeight)),
                );
            } else {
                vertices.push(
                    curLeftPt.added(horizontalFrontDir.multiplied(horizontalStep)),
                    curRightPt.added(horizontalFrontDir.multiplied(horizontalStep)),
                );
            }
            tempLines.push(
                [4 * i, 1 + 4 * i],
                [4 * i, 2 + 4 * i],
                [1 + 4 * i, 3 + 4 * i],
                [2 + 4 * i, 3 + 4 * i],
                [2 + 4 * i, 4 + 4 * i],
                [3 + 4 * i, 5 + 4 * i],
            );
        }
        if (lastStepLength > LengthTolerance) {
            if (upward) {
                vertices.push(
                    vertices[vertices.length - 2].added(horizontalLeftDir.multiplied(lastStepLength / horizontalStep * widthDelta)).added(vertitalFrontDir.multiplied(stepHeight)),
                    vertices[vertices.length - 1].added(horizontalLeftDir.multiplied(-lastStepLength / horizontalStep * widthDelta)).added(vertitalFrontDir.multiplied(stepHeight))
                );
                vertices.push(
                    vertices[vertices.length - 2].added(horizontalFrontDir.multiplied(lastStepLength)),
                    vertices[vertices.length - 1].added(horizontalFrontDir.multiplied(lastStepLength))
                );
                tempLines.push(
                    [4 * stepCount, 1 + 4 * stepCount],
                    [4 * stepCount, 2 + 4 * stepCount],
                    [1 + 4 * stepCount, 3 + 4 * stepCount],
                    [2 + 4 * stepCount, 3 + 4 * stepCount],
                    [2 + 4 * stepCount, 4 + 4 * stepCount],
                    [3 + 4 * stepCount, 5 + 4 * stepCount],
                    [4 * (stepCount + 1), 1 + 4 * (stepCount + 1)],
                );
            } else {
                vertices.push(
                    vertices[vertices.length - 2].added(horizontalLeftDir.multiplied(lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength)),
                    vertices[vertices.length - 1].added(horizontalLeftDir.multiplied(-lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength))
                );
                tempLines.push(
                    [4 * stepCount, 1 + 4 * stepCount],
                    [4 * stepCount, 2 + 4 * stepCount],
                    [1 + 4 * stepCount, 3 + 4 * stepCount],
                    [2 + 4 * stepCount, 3 + 4 * stepCount],
                );
            }
        } else {
            tempLines.push(
                [4 * stepCount, 1 + 4 * stepCount],
            );
        }
        if ((upward && stepCount > 1) || (!upward && stepCount > 2)) {
            tempLines.push(
                [vertices.length - 2, 2 + vertices.length - 2],
                [1 + vertices.length - 2, 3 + vertices.length - 2],
                [2 + vertices.length - 2, 3 + vertices.length - 2],
                [2 + vertices.length - 2, 4 + vertices.length - 2],
                [3 + vertices.length - 2, 5 + vertices.length - 2],
                [vertices.length + 2, 1 + vertices.length + 2],
                [vertices.length + 2, 2 + vertices.length + 2],
                [1 + vertices.length + 2, 3 + vertices.length + 2],
            );
            if (upward) {
                vertices.push(
                    vertices[vertices.length - 2].added(vertitalFrontDir.multiplied(-stepHeight - (1 - lastStepLength / horizontalStep) * stepHeight)),
                    vertices[vertices.length - 1].added(vertitalFrontDir.multiplied(-stepHeight - (1 - lastStepLength / horizontalStep) * stepHeight)),
                );
                vertices.push(
                    vertices[0].added(horizontalFrontDir.multiplied(horizontalStep)),
                    vertices[1].added(horizontalFrontDir.multiplied(horizontalStep)),
                );
            } else {
                vertices.push(
                    vertices[vertices.length - 2].added(horizontalFrontDir.multiplied(-lastStepLength - horizontalStep)),
                    vertices[vertices.length - 1].added(horizontalFrontDir.multiplied(-lastStepLength - horizontalStep)),
                );
                vertices.push(
                    vertices[0].added(vertitalFrontDir.multiplied(stepHeight)),
                    vertices[1].added(vertitalFrontDir.multiplied(stepHeight)),
                );
            }
        } else {
            tempLines.push(
                [vertices.length - 2, 2 + vertices.length - 2],
                [1 + vertices.length - 2, 3 + vertices.length - 2],
                [2 + vertices.length - 2, 3 + vertices.length - 2],
                [2 + vertices.length - 2, 4 + vertices.length - 2],
                [3 + vertices.length - 2, 5 + vertices.length - 2],
            );
            if (upward) {
                vertices.push(
                    vertices[vertices.length - 2].added(vertitalFrontDir.multiplied(-stepHeight)),
                    vertices[vertices.length - 1].added(vertitalFrontDir.multiplied(-stepHeight)),
                );
            } else {
                vertices.push(
                    vertices[0].added(vertitalFrontDir.multiplied(stepHeight)),
                    vertices[1].added(vertitalFrontDir.multiplied(stepHeight)),
                );
            }
        }
    } else {

    }
}

function computePlatformShape(segment: Segment, componentParam: ComponentParam) {
    const { start, end, moldShape: { vertices, tempLines } } = segment;
    const { startWidth, endWidth } = componentParam;
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