import { AngleTolerance, DirectionZ, LengthTolerance } from "./consts";
import { ComponentType, Segment } from "./types";

export function generateShape(segment: Segment, temp: boolean = true) {
    const { type } = segment.param;
    if (type === ComponentType.StraightStair || type === ComponentType.CircularStair) {
        generateStairShape(segment, temp);
    } else {
        generatePlatformShape(segment, temp);
    }
}

function generateStairShape(segment: Segment, temp: boolean = true) {
    const { start, end, stairShape, moldShape, cornerShape, cornerMoldShape, startHeight, baseLineSeg3d, param } = segment;
    const { startWidth, endWidth, type, horizontalStep, verticalStep, upward, platformThickness } = param;
    stairShape.vertices = [];
    stairShape.tempLines = [];
    moldShape.vertices = [];
    moldShape.tempLines = [];
    cornerShape.vertices = [];
    cornerShape.tempLines = [];
    cornerMoldShape.vertices = [];
    cornerMoldShape.tempLines = [];
    const { vertices, tempLines } = stairShape;
    const { vertices: moldVertices, tempLines: moldTempLines } = moldShape;
    if (type === ComponentType.StraightStair) {
        let horizontalFrontDir = end.subtracted(start).normalized();
        let horizontalDistance = start.distanceTo(end);
        const verticalFrontDir = DirectionZ;
        let horizontalLeftDir = DirectionZ.cross(horizontalFrontDir);
        if (baseLineSeg3d) {
            const baseLineDir = baseLineSeg3d.end.subtracted(baseLineSeg3d.start).normalized();
            const angle = horizontalFrontDir.angle(baseLineDir);
            const deltaAngle = Math.abs(angle - Math.PI / 2);
            if (deltaAngle <= AngleTolerance) {
                horizontalFrontDir = baseLineDir.cross(horizontalFrontDir.cross(baseLineDir)).normalized();
                horizontalDistance = horizontalDistance * Math.cos(deltaAngle);
                horizontalLeftDir = DirectionZ.cross(horizontalFrontDir);
            } else {
                if (angle < Math.PI / 2) {
                    const cornerConnectionPoint1 = start.added(baseLineDir.multiplied(-startWidth / 2 * Math.sign(angle)));
                    cornerMoldShape.vertices = [start, start.added(horizontalLeftDir.multiplied(-startWidth / 2)), cornerConnectionPoint1];
                } else {
                    const cornerConnectionPoint2 = start.added(baseLineDir.multiplied(startWidth / 2 * Math.sign(angle)));
                    cornerMoldShape.vertices = [start, cornerConnectionPoint2, start.added(horizontalLeftDir.multiplied(startWidth / 2))];
                }
                if (temp) {
                    cornerMoldShape.tempLines = [[0, 1], [1, 2], [2, 0]];
                }
                cornerShape.vertices = [
                    ...cornerMoldShape.vertices.map(v => v.added(verticalFrontDir.multiplied(startHeight))),
                    ...cornerMoldShape.vertices.map(v => v.added(verticalFrontDir.multiplied(startHeight - platformThickness))),
                ];
                if (temp) {
                    cornerShape.tempLines = [
                        [0, 1], [1, 2], [2, 0],
                        [3, 4], [4, 5], [5, 3],
                        [0, 3], [1, 4], [2, 5],
                    ];
                }
            }
        }

        const stepFloatCount = horizontalDistance / horizontalStep;
        const stepCount = Math.ceil(stepFloatCount);
        segment.endHeight = segment.startHeight + stepCount * verticalStep;
        stairShape.stepCount = stepCount;
        moldShape.stepCount = stepCount;
        if (stepCount < 1) return;
        const lastStepLength = horizontalDistance - (stepCount - 1) * horizontalStep;
        if (lastStepLength > 0 && lastStepLength < LengthTolerance) {
            stairShape.stepCount--;
            moldShape.stepCount--;
        }
        const stepHeight = upward ? verticalStep : -verticalStep;
        const leftPt = start.added(horizontalLeftDir.multiplied(startWidth / 2));
        const rightPt = start.added(horizontalLeftDir.multiplied(-startWidth / 2));
        const widthDelta = (endWidth - startWidth) / 2 / (stepFloatCount);
        for (let i = 0; i < stepCount - 1; i++) {
            const curLeftMoldPt = leftPt.added(horizontalFrontDir.multiplied(i * horizontalStep)).added(horizontalLeftDir.multiplied(i * widthDelta));
            const curRightMoldPt = rightPt.added(horizontalFrontDir.multiplied(i * horizontalStep)).added(horizontalLeftDir.multiplied(-i * widthDelta));
            const curLeftPt = curLeftMoldPt.added(DirectionZ.multiplied(startHeight)).added(verticalFrontDir.multiplied(i * stepHeight));
            const curRightPt = curRightMoldPt.added(DirectionZ.multiplied(startHeight)).added(verticalFrontDir.multiplied(i * stepHeight));
            if (temp) {
                moldVertices.push(curLeftMoldPt, curRightMoldPt);
                moldTempLines.push(
                    [2 * i, 1 + 2 * i],
                    [2 * i, 2 + 2 * i],
                    [1 + 2 * i, 3 + 2 * i],
                );
            }
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
            if (temp) {
                tempLines.push(
                    [4 * i, 1 + 4 * i],
                    [4 * i, 2 + 4 * i],
                    [1 + 4 * i, 3 + 4 * i],
                    [2 + 4 * i, 3 + 4 * i],
                    [2 + 4 * i, 4 + 4 * i],
                    [3 + 4 * i, 5 + 4 * i],
                );
            }
        }
        if (temp) {
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
        }
        if (upward) {
            vertices.push(
                stepCount > 1 ? vertices[vertices.length - 2].added(horizontalFrontDir.multiplied(horizontalStep)) : leftPt,
                stepCount > 1 ? vertices[vertices.length - 1].added(horizontalFrontDir.multiplied(horizontalStep)) : rightPt,
            );
            if (temp) {

                tempLines.push(
                    [4 * (stepCount - 1), 1 + 4 * (stepCount - 1)],
                );
            }
            if (lastStepLength > LengthTolerance) {
                vertices.push(
                    vertices[vertices.length - 2].added(verticalFrontDir.multiplied(verticalStep)),
                    vertices[vertices.length - 1].added(verticalFrontDir.multiplied(verticalStep))
                );
                vertices.push(
                    vertices[vertices.length - 2].added(horizontalLeftDir.multiplied(lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength)),
                    vertices[vertices.length - 1].added(horizontalLeftDir.multiplied(-lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength))
                );
                if (temp) {
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
            }
        } else {
            vertices.push(
                stepCount > 1 ? vertices[vertices.length - 2].added(verticalFrontDir.multiplied(verticalStep)) : leftPt,
                stepCount > 1 ? vertices[vertices.length - 1].added(verticalFrontDir.multiplied(verticalStep)) : rightPt,
            );
            if (temp) {

                tempLines.push(
                    [4 * (stepCount - 1), 1 + 4 * (stepCount - 1)],
                );
            }
            if (lastStepLength > LengthTolerance) {
                vertices.push(
                    vertices[vertices.length - 2].added(horizontalLeftDir.multiplied(lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength)),
                    vertices[vertices.length - 1].added(horizontalLeftDir.multiplied(-lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength))
                );
                vertices.push(
                    vertices[vertices.length - 2].added(verticalFrontDir.multiplied(verticalStep)),
                    vertices[vertices.length - 1].added(verticalFrontDir.multiplied(verticalStep)),
                );
                if (temp) {
                    tempLines.push(
                        // [4 * (stepCount - 1), 1 + 4 * (stepCount - 1)],
                        [4 * (stepCount - 1), 2 + 4 * (stepCount - 1)],
                        [1 + 4 * (stepCount - 1), 3 + 4 * (stepCount - 1)],
                        [2 + 4 * (stepCount - 1), 3 + 4 * (stepCount - 1)],
                        [2 + 4 * (stepCount - 1), 4 + 4 * (stepCount - 1)],
                        [3 + 4 * (stepCount - 1), 5 + 4 * (stepCount - 1)],
                        [4 * stepCount, 1 + 4 * stepCount],
                    );
                }
            }
        }
        if (stepCount > 1) {
            if (temp) {
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
            }
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
                    vertices[vertices.length - 2].added(horizontalFrontDir.multiplied(-lastStepLength)),
                    vertices[vertices.length - 1].added(horizontalFrontDir.multiplied(-lastStepLength)),
                );
                vertices.push(
                    vertices[0].added(verticalFrontDir.multiplied(stepHeight)),
                    vertices[1].added(verticalFrontDir.multiplied(stepHeight)),
                );
            }
        } else {
            if (temp) {
                tempLines.push(
                    [vertices.length - 2, 2 + vertices.length - 2],
                    [1 + vertices.length - 2, 3 + vertices.length - 2],
                    [2 + vertices.length - 2, 3 + vertices.length - 2],
                    [2 + vertices.length - 2, 0],
                    [3 + vertices.length - 2, 1],
                );
            }
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

function generatePlatformShape(segment: Segment, temp: boolean = true) {
    const { start, startHeight, baseLineSeg3d, stairShape, moldShape, param } = segment;
    const { startWidth, platformThickness, platformLength, platformLengthLocked } = param;

    const curDir = segment.end.subtracted(start);
    const curDirNormalized = segment.end.subtracted(start).normalized();
    const curLeftDir = DirectionZ.cross(curDir).normalized();
    stairShape.vertices = [];
    stairShape.tempLines = [];
    moldShape.vertices = [];
    moldShape.tempLines = [];
    segment.end = platformLengthLocked ? segment.start.added(curDirNormalized.multiplied(platformLength)) : segment.end;

    if (baseLineSeg3d) {
        const { start: baseLineStart, end: baseLineEnd } = baseLineSeg3d;
        const baseLineDir = baseLineEnd.subtracted(baseLineStart).normalized();

        const prevDirNormalized = baseLineDir.cross(DirectionZ).normalized();
        // const prevDirNormalized = prevEnd.subtracted(prevStart).normalized();
        const prevLeftDir = DirectionZ.cross(prevDirNormalized).normalized();
        const angle = curDir.angleTo(prevDirNormalized, DirectionZ);
        const frontLength = platformLengthLocked ? platformLength : Math.abs(curDir.dot(prevDirNormalized));

        const curEndLeftCorner = segment.end.added(curLeftDir.multiplied(startWidth / 2));
        const dir1 = curEndLeftCorner.subtracted(segment.start);
        const angle1 = dir1.angle(curDir);

        if (angle <= AngleTolerance || angle >= (Math.PI * 2 - AngleTolerance)) {
            segment.end = segment.start.added(prevDirNormalized.multiplied(frontLength));
            param.platformLength = segment.end.distanceTo(segment.start);
            moldShape.vertices = [
                start.added(prevLeftDir.multiplied(startWidth / 2)),
                start.added(prevLeftDir.multiplied(-startWidth / 2)),
                segment.end.added(prevLeftDir.multiplied(-startWidth / 2)),
                segment.end.added(prevLeftDir.multiplied(startWidth / 2)),
            ];
            if (temp) {
                moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 0]];
            }
            stairShape.vertices = [...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(startHeight))),
            ...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(startHeight - platformThickness))),
            ];
            if (temp) {
                stairShape.tempLines = [
                    ...moldShape.tempLines,
                    ...moldShape.tempLines.map(seg => [seg[0] + 4, seg[1] + 4]),
                    [0, 4], [1, 5], [2, 6], [3, 7],
                ];
            }
        } else {
            if (AngleTolerance < angle && angle < (Math.PI / 2 - angle1)) {
                param.platformLength = segment.end.distanceTo(segment.start);

                let leftConnectPoints = [start.added(curLeftDir.multiplied(startWidth / 2)), baseLineEnd];
                const baseLineEndDistance = start.distanceTo(baseLineEnd);
                const leftProjectDistance = startWidth / 2 * Math.sin(angle);
                if (leftProjectDistance < baseLineEndDistance) {
                    const l1 = startWidth / 2 / Math.cos(angle);
                    if (l1 > baseLineEndDistance) {
                        const a1 = l1 - baseLineEndDistance;
                        const c1 = a1 / Math.tan(angle);
                        leftConnectPoints = [start.added(prevLeftDir.multiplied(baseLineEndDistance)).added(prevDirNormalized.multiplied(c1)), start.added(prevLeftDir.multiplied(baseLineEndDistance))];
                    } else {
                        leftConnectPoints = [leftConnectPoints[0], start.added(prevLeftDir.multiplied(l1))];
                    }
                }
                moldShape.vertices = [
                    // start.added(curLeftDir.multiplied(startWidth / 2)),
                    ...leftConnectPoints,
                    start.added(prevLeftDir.multiplied(-startWidth / 2 / Math.cos(angle))),
                    segment.end.added(curLeftDir.multiplied(-startWidth / 2)),
                    segment.end.added(curLeftDir.multiplied(startWidth / 2)),
                ];
                if (temp) {
                    moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]];
                }
                stairShape.vertices = [...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(startHeight))),
                ...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(startHeight - platformThickness))),
                ];
                if (temp) {
                    stairShape.tempLines = [
                        ...moldShape.tempLines,
                        ...moldShape.tempLines.map(seg => [seg[0] + 5, seg[1] + 5]),
                        [0, 5], [1, 6], [2, 7], [3, 8], [4, 9],
                    ];
                }
            } else if (angle > (Math.PI * 3 / 2 + angle1)) {
                param.platformLength = segment.end.distanceTo(segment.start);
                let rightConnectPoints = [baseLineStart, start.added(curLeftDir.multiplied(-startWidth / 2))];
                const baseLineStartDistance = start.distanceTo(baseLineStart);
                const rightProjectDistance = -startWidth / 2 * Math.sin(angle);
                if (rightProjectDistance < baseLineStartDistance) {
                // let rightConnectPoints = [baseLineStart, baseLineStart];
                // if (startWidth <= prevParam.endWidth) {
                    const l2 = startWidth / 2 / Math.cos(angle);
                    if (l2 > baseLineStartDistance) {
                        const a2 = l2 - baseLineStartDistance;
                        const c2 = a2 / Math.tan(Math.PI * 2 - angle);
                        rightConnectPoints = [start.added(prevLeftDir.multiplied(-baseLineStartDistance)), start.added(prevLeftDir.multiplied(-baseLineStartDistance)).added(prevDirNormalized.multiplied(c2))];
                    } else {
                        rightConnectPoints = [start.added(prevLeftDir.multiplied(-l2)), rightConnectPoints[1]];
                    }
                }

                moldShape.vertices = [
                    start.added(prevLeftDir.multiplied(startWidth / 2 / Math.cos(angle))),
                    ...rightConnectPoints,
                    // start.added(curLeftDir.multiplied(-startWidth / 2)),
                    segment.end.added(curLeftDir.multiplied(-startWidth / 2)),
                    segment.end.added(curLeftDir.multiplied(startWidth / 2)),
                ];
                if (temp) {
                    moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]];
                }
                stairShape.vertices = [...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(startHeight))),
                ...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(startHeight - platformThickness))),
                ];
                if (temp) {
                    stairShape.tempLines = [
                        ...moldShape.tempLines,
                        ...moldShape.tempLines.map(seg => [seg[0] + 5, seg[1] + 5]),
                        [0, 5], [1, 6], [2, 7], [3, 8], [4, 9],
                    ];
                }
            } else if (angle >= Math.PI) {
                param.platformLength = frontLength;
                const frontEnd = segment.start.added(prevDirNormalized.multiplied(frontLength));

                const leftLength = curDir.dot(prevLeftDir);
                const validLeftLength = Math.max(startWidth / 2, leftLength);
                if (leftLength < startWidth / 2) {
                    segment.end = frontEnd;
                } else {
                    segment.end = segment.start.added(prevLeftDir.multiplied(leftLength));
                }
                // componentParam.startWidth = validLeftLength + startWidth / 2;
                // componentParam.endWidth = validLeftLength + startWidth / 2;

                moldShape.vertices = [
                    start.added(prevLeftDir.multiplied(validLeftLength)),
                    start.added(prevLeftDir.multiplied(-startWidth / 2)),
                    frontEnd.added(prevLeftDir.multiplied(-startWidth / 2)),
                    frontEnd.added(prevLeftDir.multiplied(validLeftLength)),
                ];
                if (temp) {
                    moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 0]];
                }
                stairShape.vertices = [...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(startHeight))),
                ...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(startHeight - platformThickness))),
                ];
                if (temp) {
                    stairShape.tempLines = [
                        ...moldShape.tempLines,
                        ...moldShape.tempLines.map(seg => [seg[0] + 4, seg[1] + 4]),
                        [0, 4], [1, 5], [2, 6], [3, 7],
                    ];
                }
            } else {
                param.platformLength = frontLength;
                const rightLength = -curDir.dot(prevLeftDir);
                // const validFrontLength = Math.max(startWidth, frontLength);
                const frontEnd1 = segment.start.added(prevDirNormalized.multiplied(frontLength));

                const validRightLength = Math.max(startWidth / 2, rightLength);
                if (rightLength < startWidth / 2) {
                    segment.end = frontEnd1;
                } else {
                    segment.end = segment.start.added(prevLeftDir.multiplied(-rightLength));
                }
                // segment.end = segment.start.added(prevDirNormalized.multiplied(validFrontLength));
                // componentParam.startWidth = validRightLength + startWidth / 2;
                // componentParam.endWidth = validRightLength + startWidth / 2;

                moldShape.vertices = [
                    start.added(prevLeftDir.multiplied(startWidth / 2)),
                    start.added(prevLeftDir.multiplied(-validRightLength)),
                    frontEnd1.added(prevLeftDir.multiplied(-validRightLength)),
                    frontEnd1.added(prevLeftDir.multiplied(startWidth / 2)),
                ];
                if (temp) {
                    moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 0]];
                }
                stairShape.vertices = [...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(startHeight))),
                ...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(startHeight - platformThickness))),
                ];
                if (temp) {
                    stairShape.tempLines = [
                        ...moldShape.tempLines,
                        ...moldShape.tempLines.map(seg => [seg[0] + 4, seg[1] + 4]),
                        [0, 4], [1, 5], [2, 6], [3, 7],
                    ];
                }
            }
        }

        // }
    } else {
        param.platformLength = segment.end.distanceTo(segment.start);
        moldShape.vertices = [
            start.added(curLeftDir.multiplied(startWidth / 2)),
            start.added(curLeftDir.multiplied(-startWidth / 2)),
            segment.end.added(curLeftDir.multiplied(-startWidth / 2)),
            segment.end.added(curLeftDir.multiplied(startWidth / 2)),
        ];
        if (temp) {
            moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 0]];
        }
        stairShape.vertices = [...moldShape.vertices,
        ...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(-platformThickness))),
        ];
        if (temp) {
            stairShape.tempLines = [
                ...moldShape.tempLines,
                ...moldShape.tempLines.map(seg => [seg[0] + 4, seg[1] + 4]),
                [0, 4], [1, 5], [2, 6], [3, 7],
            ];
        }
    }

}