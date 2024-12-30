import { ComponentParam, ComponentType, Segment } from "./types";

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
const AngleTolerance = Math.PI / 36;

export const DirectionZ = GeomLib.createVector3d(0, 0, 1);
// const DefaultBoardThickness = 50;
export function computeComponentShape(segment: Segment, componentParam: ComponentParam, segments: Segment[]) {
    const { type } = componentParam;
    if (type === ComponentType.StraightStair || type === ComponentType.CircularStair) {
        computeStairShape(segment, componentParam);
    } else {
        computePlatformShape(segment, componentParam, segments);
    }
}

function computeStairShape(segment: Segment, componentParam: ComponentParam) {
    const { start, end, stairShape, moldShape, cornerShape, startHeight, baseLineSeg3d } = segment;
    const { startWidth, endWidth, type, horizontalStep, verticalStep, upward } = componentParam;
    stairShape.vertices = [];
    stairShape.tempLines = [];
    moldShape.vertices = [];
    moldShape.tempLines = [];
    cornerShape.vertices = [];
    cornerShape.tempLines = [];
    const { vertices, tempLines } = stairShape;
    const { vertices: moldVertices, tempLines: moldTempLines } = moldShape;
    if (type === ComponentType.StraightStair) {
        let horizontalFrontDir = end.subtracted(start).normalized();
        let horizontalDistance = start.distanceTo(end);
        const verticalFrontDir = DirectionZ;
        let horizontalLeftDir = DirectionZ.cross(horizontalFrontDir);
        if (baseLineSeg3d) {
            const angle = horizontalFrontDir.angle(baseLineSeg3d.direction);
            const deltaAngle = Math.abs(angle - Math.PI / 2)
            if (deltaAngle <= AngleTolerance) {
                horizontalFrontDir = baseLineSeg3d.direction.cross(horizontalFrontDir.cross(baseLineSeg3d.direction)).normalized();
                horizontalDistance = horizontalDistance * Math.cos(deltaAngle);
                horizontalLeftDir = DirectionZ.cross(horizontalFrontDir);
            } else {
                if (angle < Math.PI / 2) {
                    cornerShape.vertices = [start, ];
                    cornerShape.tempLines = [];
                } else {

                }
            }
        }
        const stepFloatCount = horizontalDistance / horizontalStep;
        const stepCount = Math.ceil(stepFloatCount);
        segment.endHeight = segment.startHeight + stepCount * verticalStep;
        if (stepCount < 1) return;
        const lastStepLength = horizontalDistance - (stepCount - 1) * horizontalStep;
        const stepHeight = upward ? verticalStep : -verticalStep;
        const leftPt = start.added(horizontalLeftDir.multiplied(startWidth / 2));
        const rightPt = start.added(horizontalLeftDir.multiplied(-startWidth / 2));
        const widthDelta = (endWidth - startWidth) / 2 / (stepFloatCount);
        for (let i = 0; i < stepCount - 1; i++) {
            const curLeftMoldPt = leftPt.added(horizontalFrontDir.multiplied(i * horizontalStep)).added(horizontalLeftDir.multiplied(i * widthDelta));
            const curRightMoldPt = rightPt.added(horizontalFrontDir.multiplied(i * horizontalStep)).added(horizontalLeftDir.multiplied(-i * widthDelta));
            const curLeftPt = curLeftMoldPt.added(DirectionZ.multiplied(startHeight)).added(verticalFrontDir.multiplied(i * stepHeight));
            const curRightPt = curRightMoldPt.added(DirectionZ.multiplied(startHeight)).added(verticalFrontDir.multiplied(i * stepHeight));
            moldVertices.push(curLeftMoldPt, curRightMoldPt);
            moldTempLines.push(
                [2 * i, 1 + 2 * i],
                [2 * i, 2 + 2 * i],
                [1 + 2 * i, 3 + 2 * i],
            );
            vertices.push(curLeftPt, curRightPt);
            if (upward) {
                vertices.push(
                    curLeftPt.added(verticalFrontDir.multiplied(stepHeight)),
                    curRightPt.added(verticalFrontDir.multiplied(stepHeight)),
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

        moldVertices.push(
            stepCount > 1 ? moldVertices[moldVertices.length - 2].added(horizontalFrontDir.multiplied(horizontalStep)) : leftPt,
            stepCount > 1 ? moldVertices[moldVertices.length - 1].added(horizontalFrontDir.multiplied(horizontalStep)) : rightPt,
        );
        moldTempLines.push(
            [2 * (stepCount - 1), 1 + 2 * (stepCount - 1)],
        );
        if (lastStepLength > LengthTolerance) {
            moldVertices.push(
                moldVertices[moldVertices.length - 2].added(horizontalLeftDir.multiplied(lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength)),
                moldVertices[moldVertices.length - 1].added(horizontalLeftDir.multiplied(-lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength))
            );
            moldTempLines.push(
                [2 * (stepCount - 1), 2 + 2 * (stepCount - 1)],
                [1 + 2 * (stepCount - 1), 3 + 2 * (stepCount - 1)],
                [2 * stepCount, 1 + 2 * stepCount],
            );
        }
        if (upward) {
            vertices.push(
                stepCount > 1 ? vertices[vertices.length - 2].added(horizontalFrontDir.multiplied(horizontalStep)) : leftPt,
                stepCount > 1 ? vertices[vertices.length - 1].added(horizontalFrontDir.multiplied(horizontalStep)) : rightPt,
            );
            tempLines.push(
                [4 * (stepCount - 1), 1 + 4 * (stepCount - 1)],
            );
            if (lastStepLength > LengthTolerance) {
                vertices.push(
                    vertices[vertices.length - 2].added(verticalFrontDir.multiplied(verticalStep)),
                    vertices[vertices.length - 1].added(verticalFrontDir.multiplied(verticalStep))
                );
                vertices.push(
                    vertices[vertices.length - 2].added(horizontalLeftDir.multiplied(lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength)),
                    vertices[vertices.length - 1].added(horizontalLeftDir.multiplied(-lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength))
                );
                tempLines.push(
                    // [4 * stepCount, 1 + 4 * stepCount],
                    [4 * (stepCount - 1), 2 + 4 * (stepCount - 1)],
                    [1 + 4 * (stepCount - 1), 3 + 4 * (stepCount - 1)],
                    [2 + 4 * (stepCount - 1), 3 + 4 * (stepCount - 1)],
                    [2 + 4 * (stepCount - 1), 4 + 4 * (stepCount - 1)],
                    [3 + 4 * (stepCount - 1), 5 + 4 * (stepCount - 1)],
                    [4 * stepCount, 1 + 4 * stepCount],
                );
            }
        } else {
            vertices.push(
                stepCount > 1 ? vertices[vertices.length - 2].added(verticalFrontDir.multiplied(verticalStep)) : leftPt,
                stepCount > 1 ? vertices[vertices.length - 1].added(verticalFrontDir.multiplied(verticalStep)) : rightPt,
            );
            tempLines.push(
                [4 * (stepCount - 1), 1 + 4 * (stepCount - 1)],
            );
            if (lastStepLength > LengthTolerance) {
                vertices.push(
                    vertices[vertices.length - 2].added(horizontalLeftDir.multiplied(lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength)),
                    vertices[vertices.length - 1].added(horizontalLeftDir.multiplied(-lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength))
                );
                tempLines.push(
                    // [4 * (stepCount - 1), 1 + 4 * (stepCount - 1)],
                    [4 * (stepCount - 1), 2 + 4 * (stepCount - 1)],
                    [1 + 4 * (stepCount - 1), 3 + 4 * (stepCount - 1)],
                    [2 + 4 * (stepCount - 1), 3 + 4 * (stepCount - 1)],
                );
            }
        }
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
                    vertices[vertices.length - 2].added(verticalFrontDir.multiplied(-stepHeight - (1 - lastStepLength / horizontalStep) * stepHeight)),
                    vertices[vertices.length - 1].added(verticalFrontDir.multiplied(-stepHeight - (1 - lastStepLength / horizontalStep) * stepHeight)),
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
                    vertices[0].added(verticalFrontDir.multiplied(stepHeight)),
                    vertices[1].added(verticalFrontDir.multiplied(stepHeight)),
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
                    vertices[vertices.length - 2].added(verticalFrontDir.multiplied(-stepHeight)),
                    vertices[vertices.length - 1].added(verticalFrontDir.multiplied(-stepHeight)),
                );
            } else {
                vertices.push(
                    vertices[0].added(verticalFrontDir.multiplied(stepHeight)),
                    vertices[1].added(verticalFrontDir.multiplied(stepHeight)),
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
        const { start: prevStart, end: prevEnd, param: prevParam, moldShape: prevMoldShape, endHeight: prevEndHeight } = preStairSegment;
        const prevDirNormalized = prevEnd.subtracted(prevStart).normalized();
        const prevLeftDir = DirectionZ.cross(prevDirNormalized).normalized();
        const angle = curDir.angleTo(prevDirNormalized, DirectionZ);
        const frontLength = curDir.dot(prevDirNormalized);

        const curEndLeftCorner = end.added(curLeftDir.multiplied(tempWidth / 2));
        const dir1 = curEndLeftCorner.subtracted(segment.start);
        const angle1 = dir1.angle(curDir);

        if (angle <= AngleTolerance || angle >= (Math.PI * 2 - AngleTolerance) || prevParam.type === ComponentType.Platform) {
            segment.end = segment.start.added(prevDirNormalized.multiplied(frontLength));
            moldShape.vertices = [
                start.added(prevLeftDir.multiplied(tempWidth / 2)),
                start.added(prevLeftDir.multiplied(-tempWidth / 2)),
                segment.end.added(prevLeftDir.multiplied(-tempWidth / 2)),
                segment.end.added(prevLeftDir.multiplied(tempWidth / 2)),
            ];
            moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 0]];
            stairShape.vertices = [...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevEndHeight))),
            ...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevEndHeight - platformThickness))),
            ];
            stairShape.tempLines = [
                ...moldShape.tempLines,
                ...moldShape.tempLines.map(seg => [seg[0] + 4, seg[1] + 4]),
                [0, 4], [1, 5], [2, 6], [3, 7],
            ];
        } else {
            if (AngleTolerance < angle && angle < (Math.PI / 2 - angle1)) {
                let leftConnectPoints = [prevMoldShape.vertices[prevMoldShape.vertices.length - 2], prevMoldShape.vertices[prevMoldShape.vertices.length - 2]];
                if (tempWidth <= prevParam.endWidth) {
                    const l1 = tempWidth / 2 / Math.cos(angle);
                    if (l1 > prevParam.endWidth / 2) {
                        const a1 = l1 - prevParam.endWidth / 2;
                        const c1 = a1 / Math.tan(angle);
                        leftConnectPoints = [start.added(prevLeftDir.multiplied(prevParam.endWidth / 2)).added(prevDirNormalized.multiplied(c1)), start.added(prevLeftDir.multiplied(prevParam.endWidth / 2))];
                    } else {
                        leftConnectPoints = [start.added(prevLeftDir.multiplied(l1)), start.added(prevLeftDir.multiplied(l1))];
                    }
                }
                moldShape.vertices = [
                    // start.added(curLeftDir.multiplied(tempWidth / 2)),
                    ...leftConnectPoints,
                    start.added(prevLeftDir.multiplied(-tempWidth / 2 / Math.cos(angle))),
                    end.added(curLeftDir.multiplied(-tempWidth / 2)),
                    end.added(curLeftDir.multiplied(tempWidth / 2)),
                ];
                moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]];
                stairShape.vertices = [...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevEndHeight))),
                ...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevEndHeight - platformThickness))),
                ];
                stairShape.tempLines = [
                    ...moldShape.tempLines,
                    ...moldShape.tempLines.map(seg => [seg[0] + 5, seg[1] + 5]),
                    [0, 5], [1, 6], [2, 7], [3, 8], [4, 9],
                ];
            } else if (angle > (Math.PI * 3 / 2 + angle1)) {

                // const rightConnectPoint = tempWidth > prevParam.endWidth ? prevMoldShape.vertices[prevMoldShape.vertices.length - 1] :
                //     start.added(prevLeftDir.multiplied(-tempWidth / 2 * Math.cos(angle)));

                let rightConnectPoints = [prevMoldShape.vertices[prevMoldShape.vertices.length - 1], prevMoldShape.vertices[prevMoldShape.vertices.length - 1]];
                if (tempWidth <= prevParam.endWidth) {
                    const l2 = tempWidth / 2 / Math.cos(angle);
                    if (l2 > prevParam.endWidth / 2) {
                        const a2 = l2 - prevParam.endWidth / 2;
                        const c2 = a2 / Math.tan(Math.PI * 2 - angle);
                        rightConnectPoints = [start.added(prevLeftDir.multiplied(-prevParam.endWidth / 2)), start.added(prevLeftDir.multiplied(-prevParam.endWidth / 2)).added(prevDirNormalized.multiplied(c2))];
                    } else {
                        rightConnectPoints = [start.added(prevLeftDir.multiplied(-l2)), start.added(prevLeftDir.multiplied(-l2))];
                    }
                }

                moldShape.vertices = [
                    start.added(prevLeftDir.multiplied(tempWidth / 2 / Math.cos(angle))),
                    ...rightConnectPoints,
                    // start.added(curLeftDir.multiplied(-tempWidth / 2)),
                    end.added(curLeftDir.multiplied(-tempWidth / 2)),
                    end.added(curLeftDir.multiplied(tempWidth / 2)),
                ];
                moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]];
                stairShape.vertices = [...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevEndHeight))),
                ...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevEndHeight - platformThickness))),
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
                // componentParam.startWidth = validLeftLength + tempWidth / 2;
                // componentParam.endWidth = validLeftLength + tempWidth / 2;

                moldShape.vertices = [
                    start.added(prevLeftDir.multiplied(validLeftLength)),
                    start.added(prevLeftDir.multiplied(-tempWidth / 2)),
                    segment.end.added(prevLeftDir.multiplied(-tempWidth / 2)),
                    segment.end.added(prevLeftDir.multiplied(validLeftLength)),
                ];
                moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 0]];
                stairShape.vertices = [...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevEndHeight))),
                ...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevEndHeight - platformThickness))),
                ];
                stairShape.tempLines = [
                    ...moldShape.tempLines,
                    ...moldShape.tempLines.map(seg => [seg[0] + 4, seg[1] + 4]),
                    [0, 4], [1, 5], [2, 6], [3, 7],
                ];
            } else {
                const rightLength = -curDir.dot(prevLeftDir);
                const validFrontLength = Math.max(tempWidth, frontLength);
                segment.end = segment.start.added(prevDirNormalized.multiplied(validFrontLength));

                const validRightLength = Math.max(tempWidth / 2, rightLength);
                // componentParam.startWidth = validRightLength + tempWidth / 2;
                // componentParam.endWidth = validRightLength + tempWidth / 2;

                moldShape.vertices = [
                    start.added(prevLeftDir.multiplied(tempWidth / 2)),
                    start.added(prevLeftDir.multiplied(-validRightLength)),
                    segment.end.added(prevLeftDir.multiplied(-validRightLength)),
                    segment.end.added(prevLeftDir.multiplied(tempWidth / 2)),
                ];
                moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 0]];
                stairShape.vertices = [...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevEndHeight))),
                ...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(prevEndHeight - platformThickness))),
                ];
                stairShape.tempLines = [
                    ...moldShape.tempLines,
                    ...moldShape.tempLines.map(seg => [seg[0] + 4, seg[1] + 4]),
                    [0, 4], [1, 5], [2, 6], [3, 7],
                ];
            }
        }

        // }
    } else {
        moldShape.vertices = [
            start.added(curLeftDir.multiplied(tempWidth / 2)),
            start.added(curLeftDir.multiplied(-tempWidth / 2)),
            segment.end.added(curLeftDir.multiplied(-tempWidth / 2)),
            segment.end.added(curLeftDir.multiplied(tempWidth / 2)),
        ];
        moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 0]];
        stairShape.vertices = [...moldShape.vertices,
        ...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(-platformThickness))),
        ];
        stairShape.tempLines = [
            ...moldShape.tempLines,
            ...moldShape.tempLines.map(seg => [seg[0] + 4, seg[1] + 4]),
            [0, 4], [1, 5], [2, 6], [3, 7],
        ];
    }

}