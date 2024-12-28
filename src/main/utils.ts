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


// const HeightTolerance: number = 5;
const LengthTolerance: number = 1;
const AngleTolerance = Math.PI / 18;

export const DirectionZ = GeomLib.createVector3d(0, 0, 1);
// const DefaultBoardThickness = 50;
export function computeComponentShape(segment: Segment, componentParam: ComponentParam, segments: Segment[]) {
    const { type } = segment;
    if (type === ComponentType.Stair) {
        computeStairShape(segment, componentParam);
    } else {
        computePlatformShape(segment, componentParam, segments);
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
        if (stepCount < 1) return;
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
        // if (lastStepLength > LengthTolerance) {
        const lastLeftPoint = stepCount > 1 ? vertices[vertices.length - 2] : leftPt;
        const lastRightPoint = stepCount > 1 ? vertices[vertices.length - 1] : rightPt;
        if (upward) {
            vertices.push(
                lastLeftPoint.added(horizontalLeftDir.multiplied(lastStepLength / horizontalStep * widthDelta)).added(vertitalFrontDir.multiplied(stepHeight)),
                lastRightPoint.added(horizontalLeftDir.multiplied(-lastStepLength / horizontalStep * widthDelta)).added(vertitalFrontDir.multiplied(stepHeight))
            );
            tempLines.push(
                [4 * (stepCount - 1), 1 + 4 * (stepCount - 1)],
            );
            if (lastStepLength > LengthTolerance) {
                vertices.push(
                    vertices[vertices.length - 2].added(horizontalFrontDir.multiplied(lastStepLength)),
                    vertices[vertices.length - 1].added(horizontalFrontDir.multiplied(lastStepLength))
                );
                tempLines.push(
                    // [4 * stepCount, 1 + 4 * stepCount],
                    [4 * (stepCount - 1), 2 + 4 * (stepCount - 1)],
                    [1 + 4 * (stepCount - 1), 3 + 4 * (stepCount - 1)],
                    [2 + 4 * (stepCount - 1), 3 + 4 * (stepCount - 1)],
                    // [2 + 4 * (stepCount - 1), 4 + 4 * (stepCount - 1)],
                    // [3 + 4 * (stepCount - 1), 5 + 4 * (stepCount - 1)],
                    // [4 * ((stepCount - 1) + 1), 1 + 4 * ((stepCount - 1) + 1)],
                );
            }
        } else {
            if (lastStepLength > LengthTolerance) {
                vertices.push(
                    lastLeftPoint.added(horizontalLeftDir.multiplied(lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength)),
                    lastRightPoint.added(horizontalLeftDir.multiplied(-lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength))
                );
                tempLines.push(
                    [4 * (stepCount - 1), 1 + 4 * (stepCount - 1)],
                    [4 * (stepCount - 1), 2 + 4 * (stepCount - 1)],
                    [1 + 4 * (stepCount - 1), 3 + 4 * (stepCount - 1)],
                    [2 + 4 * (stepCount - 1), 3 + 4 * (stepCount - 1)],
                );
            } else {
                tempLines.pop();
                tempLines.pop();
            }
        }
        // } else {
        //     tempLines.push(
        //         [4 * stepCount, 1 + 4 * stepCount],
        //     );
        // }
        if ((upward && stepCount > 1) || (!upward && stepCount > 2)) {
            tempLines.push(
                [vertices.length - 2, 2 + vertices.length - 2],
                [1 + vertices.length - 2, 3 + vertices.length - 2],
                [2 + vertices.length - 2, 3 + vertices.length - 2],
                [2 + vertices.length - 2, 4 + vertices.length - 2],
                [3 + vertices.length - 2, 5 + vertices.length - 2],
                [vertices.length + 2, 1 + vertices.length + 2],
                [vertices.length + 2, 0],
                [1 + vertices.length + 2, 1],
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
                [2 + vertices.length - 2, 0],
                [3 + vertices.length - 2, 1],
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

function computePlatformShape(segment: Segment, componentParam: ComponentParam, segments: Segment[]) {
    const { tempWidth, platformThickness } = componentParam;

    const { start, end, stairShape, moldShape } = segment;
    const curDir = end.subtracted(start);
    const curLeftDir = DirectionZ.cross(curDir).normalized();
    stairShape.vertices = [];
    stairShape.tempLines = [];
    moldShape.vertices = [];
    moldShape.tempLines = [];
    if (segments.length > 1) {

        const preStairSegment = segments[segments.length - 2];
        // if (preStairSegment.type === ComponentType.Stair) {
        const { start: prevStart, end: prevEnd, param: prevParam, moldShape: prevMoldShape } = preStairSegment;
        const prevHeight = prevEnd.z;
        const prevDirNormalized = prevEnd.subtracted(prevStart);
        const prevLeftDir = DirectionZ.cross(prevDirNormalized).normalized();
        const angle = curDir.angleTo(prevDirNormalized, DirectionZ);
        const frontLength = curDir.dot(prevDirNormalized);

        const curEndLeftCorner = end.added(curLeftDir.multiplied(tempWidth / 2));
        const dir1 = curEndLeftCorner.subtracted(segment.start);
        const angle1 = dir1.angle(curDir);


        if (AngleTolerance < angle && angle < (Math.PI / 2 - angle1)) {
            const leftConnectPoint = tempWidth > prevParam.endWidth ? prevMoldShape.vertices[prevMoldShape.vertices.length - 2] :
                start.added(prevLeftDir.multiplied(tempWidth / 2 * Math.cos(angle)));
            moldShape.vertices = [
                start.added(curLeftDir.multiplied(tempWidth / 2)),
                leftConnectPoint,
                start.added(prevLeftDir.multiplied(-tempWidth / 2 / Math.cos(angle))),
                end.added(curLeftDir.multiplied(tempWidth / 2)),
                end.added(curLeftDir.multiplied(-tempWidth / 2)),
            ];
            moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]];
            stairShape.vertices = [...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevHeight))),
            ...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevHeight - platformThickness))),
            ];
            stairShape.tempLines = [
                ...moldShape.tempLines,
                ...moldShape.tempLines.map(seg => [seg[0] + 5, seg[1] + 5]),
                [0, 5], [1, 6], [2, 7], [3, 8], [4, 9],
            ];
        } else if (angle <= AngleTolerance || angle >= (Math.PI - AngleTolerance)) {
            segment.end = segment.start.added(prevDirNormalized.multiplied(frontLength));
            moldShape.vertices = [
                start.added(prevLeftDir.multiplied(tempWidth / 2)),
                start.added(prevLeftDir.multiplied(-tempWidth / 2)),
                segment.end.added(prevLeftDir.multiplied(tempWidth / 2)),
                segment.end.added(prevLeftDir.multiplied(-tempWidth / 2)),
            ];
            moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 0]];
            stairShape.vertices = [...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevHeight))),
            ...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevHeight - platformThickness))),
            ];
            stairShape.tempLines = [
                ...moldShape.tempLines,
                ...moldShape.tempLines.map(seg => [seg[0] + 4, seg[1] + 4]),
                [0, 4], [1, 5], [2, 6], [3, 7], [4, 8],
            ];
        } else if (angle > (Math.PI * 3 / 2 + angle1)) {

            const rightConnectPoint = tempWidth > prevParam.endWidth ? prevMoldShape.vertices[prevMoldShape.vertices.length - 1] :
                start.added(prevLeftDir.multiplied(-tempWidth / 2 * Math.cos(angle)));
            moldShape.vertices = [
                start.added(prevLeftDir.multiplied(-tempWidth / 2 / Math.cos(angle))),
                rightConnectPoint,
                start.added(curLeftDir.multiplied(-tempWidth / 2)),
                end.added(curLeftDir.multiplied(tempWidth / 2)),
                end.added(curLeftDir.multiplied(-tempWidth / 2)),
            ];
            moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]];
            stairShape.vertices = [...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevHeight))),
            ...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevHeight - platformThickness))),
            ];
            stairShape.tempLines = [
                ...moldShape.tempLines,
                ...moldShape.tempLines.map(seg => [seg[0] + 5, seg[1] + 5]),
                [0, 5], [1, 6], [2, 7], [3, 8], [4, 9],
            ];
        } else if (angle >= Math.PI) {
            const validFrontLength = Math.max(tempWidth, frontLength);
            segment.end = segment.start.added(prevDirNormalized.multiplied(validFrontLength));

            const leftLength = curDir.dot(prevLeftDir);
            const validLeftLength = Math.max(tempWidth / 2, leftLength);
            componentParam.startWidth = validLeftLength + tempWidth / 2;
            componentParam.endWidth = validLeftLength + tempWidth / 2;

            moldShape.vertices = [
                start.added(prevLeftDir.multiplied(validLeftLength)),
                start.added(prevLeftDir.multiplied(-tempWidth / 2)),
                segment.end.added(prevLeftDir.multiplied(validLeftLength)),
                segment.end.added(prevLeftDir.multiplied(-tempWidth / 2)),
            ];
            moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 0]];
            stairShape.vertices = [...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevHeight))),
            ...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevHeight - platformThickness))),
            ];
            stairShape.tempLines = [
                ...moldShape.tempLines,
                ...moldShape.tempLines.map(seg => [seg[0] + 4, seg[1] + 4]),
                [0, 4], [1, 5], [2, 6], [3, 7], [4, 8],
            ];
        } else {
            const rightLength = curDir.dot(prevLeftDir);
            const validFrontLength = Math.max(tempWidth, frontLength);
            segment.end = segment.start.added(prevDirNormalized.multiplied(validFrontLength));

            const validRightLength = Math.max(tempWidth / 2, rightLength);
            componentParam.startWidth = validRightLength + tempWidth / 2;
            componentParam.endWidth = validRightLength + tempWidth / 2;

            moldShape.vertices = [
                start.added(prevLeftDir.multiplied(tempWidth / 2)),
                start.added(prevLeftDir.multiplied(-validRightLength)),
                segment.end.added(prevLeftDir.multiplied(tempWidth / 2)),
                segment.end.added(prevLeftDir.multiplied(-validRightLength)),
            ];
            moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 0]];
            stairShape.vertices = [...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevHeight))),
            ...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevHeight - platformThickness))),
            ];
            stairShape.tempLines = [
                ...moldShape.tempLines,
                ...moldShape.tempLines.map(seg => [seg[0] + 4, seg[1] + 4]),
                [0, 4], [1, 5], [2, 6], [3, 7], [4, 8],
            ];
        }
        // }
    } else {
        moldShape.vertices = [
            start.added(curLeftDir.multiplied(tempWidth / 2)),
            start.added(curLeftDir.multiplied(-tempWidth / 2)),
            segment.end.added(curLeftDir.multiplied(tempWidth / 2)),
            segment.end.added(curLeftDir.multiplied(-tempWidth / 2)),
        ];
        moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 0]];
        stairShape.vertices = [...moldShape.vertices,
        ...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(-platformThickness))),
        ];
        stairShape.tempLines = [
            ...moldShape.tempLines,
            ...moldShape.tempLines.map(seg => [seg[0] + 4, seg[1] + 4]),
            [0, 4], [1, 5], [2, 6], [3, 7], [4, 8],
        ];
    }

}