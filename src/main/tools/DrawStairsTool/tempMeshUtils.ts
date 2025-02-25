import { AngleTolerance, DirectionAngleTolerance, DirectionZ, dummyPoint3d, LengthTolerance, StepCountLimit } from "./consts";
import { ComponentType, Segment, StairParam } from "./types";

export function generateShape(segment: Segment, temp: boolean = true) {
    const { param: { type }, circleTangent } = segment;
    if (type === ComponentType.StraightStair) {
        generateStraightStairShape(segment, temp);
    } else if (type === ComponentType.CircularStair) {
        if (circleTangent) {
            generateCircularStairShape(segment, temp);
        } else {
            generateStraightStairShape(segment, temp);
        }
    } else {
        generatePlatformShape(segment, temp);
    }
}

function generateCircularStairShape(segment: Segment, temp: boolean = true) {
    const { start, end, stairShape, moldShape, cornerShape, cornerMoldShape, startHeight, baseComponent, circleTangent, param } = segment;
    const { startWidth, endWidth, horizontalStep, verticalStep, upward, platformThickness } = param;

    if (circleTangent) {
        const verticalFrontDir = DirectionZ;
        const tangentLeftDir = DirectionZ.cross(circleTangent).normalized();
        const startEndDir = end.subtracted(start).normalized();
        const startEndDistance = start.distanceTo(end);
        const maxWidth = Math.max(startWidth, endWidth);

        const endAngle = startEndDir.angleTo(circleTangent, DirectionZ);
        if (endAngle < DirectionAngleTolerance) {
            return generateStraightStairShape(segment, temp);
        }

        const isLeftArc = endAngle > Math.PI;
        const endComplementaryAngle = isLeftArc ? Math.abs(endAngle - Math.PI / 2 - Math.PI) : Math.abs(endAngle - Math.PI / 2);
        const halfChord = startEndDistance / 2;
        const radius = halfChord / Math.cos(endComplementaryAngle);
        const innerRadius = radius - maxWidth / 2;
        if (radius < maxWidth / 2 * 1.2 || innerRadius < horizontalStep / 2 / 0.8) {
            return;
        }
        const horizontalStepAngle = Math.asin(horizontalStep / 2 / innerRadius) * 2;
        const circleNormal = isLeftArc ? DirectionZ : DirectionZ.reversed();
        const circleCenter = start.added(tangentLeftDir.multiplied(isLeftArc ? radius : -radius));
        // const circle = GeomLib.createCircle3dByCenterNormalRadius(circleCenter, circleNormal, radius);
        const arc = GeomLib.createArc3dByCenterNormalRadius(circleCenter, circleNormal, radius, start, end);
        const arcAngle = arc.arcAngle;
        const stepCount = Math.ceil(arcAngle / horizontalStepAngle);
        const lastHorizontalAngle = arcAngle - horizontalStepAngle * (stepCount - 1);
        const validStepCount = (lastHorizontalAngle === 0 || lastHorizontalAngle > AngleTolerance) ? stepCount : stepCount - 1;
        if (horizontalStepAngle >= arcAngle || horizontalStepAngle >= Math.PI / 2 || validStepCount >= StepCountLimit || validStepCount < 1) {
            return;
        }

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

        // const centerHorizontalStep = horizontalStep / innerRadius * radius;
        const stepHeight = upward ? verticalStep : -verticalStep;
        segment.endHeight = segment.startHeight + validStepCount * stepHeight;
        stairShape.stepCount = validStepCount;
        moldShape.stepCount = validStepCount;
        // console.log('validStepCount:   ',validStepCount);

        const leftPt = start.added(tangentLeftDir.multiplied(startWidth / 2));
        const rightPt = start.added(tangentLeftDir.multiplied(-startWidth / 2));
        const startRadiusDir = isLeftArc ? tangentLeftDir.reversed() : tangentLeftDir;
        for (let i = 0; i < stepCount - 1; i++) {
            const curRotateMatrix = GeomLib.createRotateMatrix4(horizontalStepAngle * i, circleNormal, dummyPoint3d);
            const curRadiusDir = startRadiusDir.appliedMatrix4(curRotateMatrix);
            const curHalfWidth = (startWidth + (endWidth - startWidth) * (i * horizontalStepAngle) / arcAngle) / 2 * (isLeftArc ? -1 : 1);
            const curLeftMoldPt = circleCenter.added(curRadiusDir.multiplied(radius + curHalfWidth));
            const curRightMoldPt = circleCenter.added(curRadiusDir.multiplied(radius - curHalfWidth));
            const curLeftPt = curLeftMoldPt.added(DirectionZ.multiplied(startHeight)).added(verticalFrontDir.multiplied(i * stepHeight));
            const curRightPt = curRightMoldPt.added(DirectionZ.multiplied(startHeight)).added(verticalFrontDir.multiplied(i * stepHeight));
            moldVertices.push(curLeftMoldPt, curRightMoldPt);
            moldTempLines.push(
                [2 * i, 1 + 2 * i],
                [2 * i, 2 + 2 * i],
                [1 + 2 * i, 3 + 2 * i],
            );
            vertices.push(curLeftPt, curRightPt);

            const nextRotateMatrix = GeomLib.createRotateMatrix4(horizontalStepAngle * (i + 1), circleNormal, dummyPoint3d);
            const nextRadiusDir = startRadiusDir.appliedMatrix4(nextRotateMatrix);
            const nextHalfWidth = (startWidth + (endWidth - startWidth) * ((i + 1) * horizontalStepAngle) / arcAngle) / 2 * (isLeftArc ? -1 : 1);
            const nextLeftMoldPt = circleCenter.added(nextRadiusDir.multiplied(radius + nextHalfWidth));
            const nextRightMoldPt = circleCenter.added(nextRadiusDir.multiplied(radius - nextHalfWidth));
            const nextLeftPt = nextLeftMoldPt.added(DirectionZ.multiplied(startHeight)).added(verticalFrontDir.multiplied(i * stepHeight));
            const nextRightPt = nextRightMoldPt.added(DirectionZ.multiplied(startHeight)).added(verticalFrontDir.multiplied(i * stepHeight));
            if (upward) {
                vertices.push(
                    curLeftPt.added(verticalFrontDir.multiplied(stepHeight)),
                    curRightPt.added(verticalFrontDir.multiplied(stepHeight)),
                );
            } else {
                vertices.push(nextLeftPt, nextRightPt);
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
            if (i === stepCount - 2) {
                moldVertices.push(nextLeftMoldPt, nextRightMoldPt);
                moldTempLines.push([2 * (stepCount - 1), 1 + 2 * (stepCount - 1)]);
            }
            if (i === stepCount - 2) {
                // if (upward) {
                // } else {
                // }
                vertices.push(nextLeftPt.added(verticalFrontDir.multiplied(stepHeight)), nextRightPt.added(verticalFrontDir.multiplied(stepHeight)));
                if (temp) {
                    tempLines.push([4 * (stepCount - 1), 1 + 4 * (stepCount - 1)]);
                }
            }
        }

        const lastRotateMatrix = GeomLib.createRotateMatrix4(arcAngle, circleNormal, dummyPoint3d);
        const lastRadiusDir = startRadiusDir.appliedMatrix4(lastRotateMatrix);
        const lastHalfWidth = isLeftArc ? -endWidth / 2 : endWidth / 2;
        const lastLeftMoldPt = circleCenter.added(lastRadiusDir.multiplied(radius + lastHalfWidth));
        const lastRightMoldPt = circleCenter.added(lastRadiusDir.multiplied(radius - lastHalfWidth));
        const lastLeftPt = lastLeftMoldPt.added(DirectionZ.multiplied(startHeight)).added(verticalFrontDir.multiplied(stepCount * stepHeight));
        const lastRightPt = lastRightMoldPt.added(DirectionZ.multiplied(startHeight)).added(verticalFrontDir.multiplied(stepCount * stepHeight));
        if (stepCount === 1) {
            moldVertices.push(leftPt, rightPt);
            moldTempLines.push(
                [2 * (stepCount - 1), 1 + 2 * (stepCount - 1)],
            );
        }

        if (lastHorizontalAngle >= AngleTolerance || lastHorizontalAngle === 0) {
            moldVertices.push(lastLeftMoldPt, lastRightMoldPt);
            moldTempLines.push(
                [2 * (stepCount - 1), 2 + 2 * (stepCount - 1)],
                [1 + 2 * (stepCount - 1), 3 + 2 * (stepCount - 1)],
                [2 * stepCount, 1 + 2 * stepCount],
            );
        }
        if (upward) {
            if (stepCount === 1) {
                vertices.push(leftPt, rightPt);
                if (temp) {
                    tempLines.push([4 * (stepCount - 1), 1 + 4 * (stepCount - 1)]);
                }
            }
            if (lastHorizontalAngle >= AngleTolerance || lastHorizontalAngle === 0) {
                vertices.push(
                    vertices[vertices.length - 2].added(verticalFrontDir.multiplied(verticalStep)),
                    vertices[vertices.length - 1].added(verticalFrontDir.multiplied(verticalStep))
                );
                vertices.push(lastLeftPt, lastRightPt);
                if (temp) {
                    tempLines.push(
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
            if (stepCount === 1) {
                vertices.push(leftPt, rightPt);
                if (temp) {
                    tempLines.push([4 * (stepCount - 1), 1 + 4 * (stepCount - 1)]);
                }
            }

            if (lastHorizontalAngle >= AngleTolerance || lastHorizontalAngle === 0) {
                vertices.push(
                    lastLeftPt.added(verticalFrontDir.multiplied(-stepHeight)),
                    lastRightPt.added(verticalFrontDir.multiplied(-stepHeight)),
                );
                vertices.push(lastLeftPt, lastRightPt);
                if (temp) {
                    tempLines.push(
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
                );
            }
            const actualLastStepLength = lastHorizontalAngle < AngleTolerance ? horizontalStepAngle : lastHorizontalAngle;
            if (upward) {
                vertices.push(
                    vertices[vertices.length - 2].added(verticalFrontDir.multiplied(-stepHeight - (1 - actualLastStepLength / horizontalStepAngle) * stepHeight)),
                    vertices[vertices.length - 1].added(verticalFrontDir.multiplied(-stepHeight - (1 - actualLastStepLength / horizontalStepAngle) * stepHeight)),
                );
                for (let j = stepCount - (lastHorizontalAngle >= AngleTolerance ? 1 : 2); j > 0; j--) {
                    const vInd = j * 4;
                    if (temp) {
                        tempLines.push(
                            [vertices.length - 2, 2 + vertices.length - 2],
                            [1 + vertices.length - 2, 3 + vertices.length - 2],
                            // [2 + vertices.length - 2, 3 + vertices.length - 2],
                        );
                        if (j === 1) {
                            tempLines.push(
                                [2 + vertices.length - 2, 0],
                                [3 + vertices.length - 2, 1],
                            );
                        }
                    }
                    vertices.push(vertices[vInd].added(verticalFrontDir.multiplied(-stepHeight)), vertices[vInd + 1].added(verticalFrontDir.multiplied(-stepHeight)));
                }
            } else {
                vertices.push(
                    vertices[vertices.length - 6].added(verticalFrontDir.multiplied(stepHeight)),
                    vertices[vertices.length - 5].added(verticalFrontDir.multiplied(stepHeight)),
                );
                for (let j = stepCount - (lastHorizontalAngle >= AngleTolerance ? 1 : 2); j >= 0; j--) {
                    const vInd = j * 4;
                    if (temp) {
                        tempLines.push(
                            [vertices.length - 2, 2 + vertices.length - 2],
                            [1 + vertices.length - 2, 3 + vertices.length - 2],
                            // [2 + vertices.length - 2, 3 + vertices.length - 2],
                        );
                        if (j === 0) {
                            tempLines.push(
                                [2 + vertices.length - 2, 0],
                                [3 + vertices.length - 2, 1],
                            );
                        }
                    }
                    vertices.push(vertices[vInd].added(verticalFrontDir.multiplied(stepHeight)), vertices[vInd + 1].added(verticalFrontDir.multiplied(stepHeight)));
                }
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

        if (baseComponent) {
            const baseLineSeg3d = baseComponent.line3d;
            const baseLineDir = baseLineSeg3d.end.subtracted(baseLineSeg3d.start).normalized();
            const angle = circleTangent.angle(baseLineDir);
            if (angle < Math.PI / 2) {
                const cornerConnectionPoint1 = start.added(baseLineDir.multiplied(-startWidth / 2 * Math.sign(angle)));
                cornerMoldShape.vertices = [start, start.added(tangentLeftDir.multiplied(-startWidth / 2)), cornerConnectionPoint1];
            } else {
                const cornerConnectionPoint2 = start.added(baseLineDir.multiplied(startWidth / 2 * Math.sign(angle)));
                cornerMoldShape.vertices = [start, cornerConnectionPoint2, start.added(tangentLeftDir.multiplied(startWidth / 2))];
            }
            cornerMoldShape.tempLines = [[0, 1], [1, 2], [2, 0]];
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
}

function generateStraightStairShape(segment: Segment, temp: boolean = true) {
    const { start, end, stairShape, moldShape, cornerShape, cornerMoldShape, startHeight, baseComponent, param } = segment;
    const { startWidth, endWidth, horizontalStep, verticalStep, upward, platformThickness } = param;
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

    const verticalFrontDir = DirectionZ;
    let horizontalFrontDir = end.subtracted(start).normalized();
    let horizontalDistance = start.distanceTo(end);
    let horizontalLeftDir = DirectionZ.cross(horizontalFrontDir);
    const stepFloatCount = horizontalDistance / horizontalStep;
    const stepCount = Math.ceil(stepFloatCount);
    const lastStepLength = horizontalDistance - (stepCount - 1) * horizontalStep;
    const validStepCount = (lastStepLength === 0 || lastStepLength > LengthTolerance) ? stepCount : stepCount - 1;

    if (validStepCount < 1 || validStepCount >= StepCountLimit) {
        return;
    }

    if (baseComponent) {
        const baseLineSeg3d = baseComponent.line3d;
        const baseLineDir = baseLineSeg3d.end.subtracted(baseLineSeg3d.start).normalized();
        const angle = horizontalFrontDir.angle(baseLineDir);
        const deltaAngle = Math.abs(angle - Math.PI / 2);
        if (deltaAngle <= DirectionAngleTolerance) {
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
            cornerMoldShape.tempLines = [[0, 1], [1, 2], [2, 0]];
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

    const stepHeight = upward ? verticalStep : -verticalStep;
    segment.endHeight = segment.startHeight + validStepCount * stepHeight;
    stairShape.stepCount = validStepCount;
    moldShape.stepCount = validStepCount;
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
    moldVertices.push(
        stepCount > 1 ? moldVertices[moldVertices.length - 2].added(horizontalFrontDir.multiplied(horizontalStep)) : leftPt,
        stepCount > 1 ? moldVertices[moldVertices.length - 1].added(horizontalFrontDir.multiplied(horizontalStep)) : rightPt,
    );

    moldTempLines.push(
        [2 * (stepCount - 1), 1 + 2 * (stepCount - 1)],
    );
    if (lastStepLength > LengthTolerance || lastStepLength === 0) {
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
        if (temp) {
            tempLines.push(
                [4 * (stepCount - 1), 1 + 4 * (stepCount - 1)],
            );
        }
        if (lastStepLength > LengthTolerance || lastStepLength === 0) {
            vertices.push(
                vertices[vertices.length - 2].added(verticalFrontDir.multiplied(stepHeight)),
                vertices[vertices.length - 1].added(verticalFrontDir.multiplied(stepHeight))
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
            stepCount > 1 ? vertices[vertices.length - 2].added(verticalFrontDir.multiplied(stepHeight)) : leftPt,
            stepCount > 1 ? vertices[vertices.length - 1].added(verticalFrontDir.multiplied(stepHeight)) : rightPt,
        );
        if (temp) {
            tempLines.push(
                [4 * (stepCount - 1), 1 + 4 * (stepCount - 1)],
            );
        }
        if (lastStepLength > LengthTolerance || lastStepLength === 0) {
            vertices.push(
                vertices[vertices.length - 2].added(horizontalLeftDir.multiplied(lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength)),
                vertices[vertices.length - 1].added(horizontalLeftDir.multiplied(-lastStepLength / horizontalStep * widthDelta)).added(horizontalFrontDir.multiplied(lastStepLength))
            );
            vertices.push(
                vertices[vertices.length - 2].added(verticalFrontDir.multiplied(stepHeight)),
                vertices[vertices.length - 1].added(verticalFrontDir.multiplied(stepHeight)),
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
        const actualLastStepLength = lastStepLength < LengthTolerance ? horizontalStep : lastStepLength;
        if (upward) {
            vertices.push(
                vertices[vertices.length - 2].added(verticalFrontDir.multiplied(-stepHeight - (1 - actualLastStepLength / horizontalStep) * stepHeight)),
                vertices[vertices.length - 1].added(verticalFrontDir.multiplied(-stepHeight - (1 - actualLastStepLength / horizontalStep) * stepHeight)),
            );
            vertices.push(
                vertices[0].added(horizontalFrontDir.multiplied(horizontalStep)),
                vertices[1].added(horizontalFrontDir.multiplied(horizontalStep)),
            );
        } else {
            vertices.push(
                vertices[vertices.length - 2].added(horizontalFrontDir.multiplied(-actualLastStepLength)),
                vertices[vertices.length - 1].added(horizontalFrontDir.multiplied(-actualLastStepLength)),
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

}

function generatePlatformShape(segment: Segment, temp: boolean = true) {
    const { start, startHeight, baseComponent, stairShape, moldShape, cornerShape, cornerMoldShape, param } = segment;
    const { startWidth, offsetWidth, withOffset, platformThickness, platformLength, platformLengthLocked, modelEditing } = param;

    const curDir = segment.end.subtracted(start);
    const curDirNormalized = segment.end.subtracted(start).normalized();
    const curLeftDir = DirectionZ.cross(curDir).normalized();
    stairShape.vertices = [];
    stairShape.tempLines = [];
    moldShape.vertices = [];
    moldShape.tempLines = [];
    cornerShape.vertices = [];
    cornerShape.tempLines = [];
    cornerMoldShape.vertices = [];
    cornerMoldShape.tempLines = [];
    segment.end = platformLengthLocked ? segment.start.added(curDirNormalized.multiplied(platformLength)) : segment.end;
    segment.endHeight = startHeight;
    if (!modelEditing) {
        param.withOffset = false;
    }

    if (baseComponent) {
        const baseLineSeg3d = baseComponent.line3d;
        const { start: baseLineStart, end: baseLineEnd } = baseLineSeg3d;
        const baseLineDir = baseLineEnd.subtracted(baseLineStart).normalized();

        const prevDirNormalized = baseLineDir.cross(DirectionZ).normalized();
        const prevLeftDir = DirectionZ.cross(prevDirNormalized).normalized();
        const angle = curDir.angleTo(prevDirNormalized, DirectionZ);
        const frontLength = platformLengthLocked ? platformLength : Math.abs(curDir.dot(prevDirNormalized));

        const curEndLeftCorner = segment.end.added(curLeftDir.multiplied(startWidth / 2));
        const dir1 = curEndLeftCorner.subtracted(segment.start);
        const angle1 = dir1.angle(curDir);


        if ((angle >= Math.PI && angle <= (Math.PI * 3 / 2 + angle1)) || (modelEditing && withOffset && offsetWidth >= 0)) {
            param.platformLength = frontLength;
            const frontEnd = segment.start.added(prevDirNormalized.multiplied(frontLength));
            segment.end = frontEnd;

            const leftLength = withOffset && modelEditing ? (offsetWidth + startWidth / 2) : curDir.dot(prevLeftDir);
            if (leftLength > startWidth / 2) {
                param.withOffset = true;
                param.offsetWidth = leftLength - startWidth / 2;
            }

            const validLeftLength = Math.max(startWidth / 2, leftLength);
            moldShape.vertices = [
                start.added(prevLeftDir.multiplied(validLeftLength)),
                start.added(prevLeftDir.multiplied(-startWidth / 2)),
                segment.end.added(prevLeftDir.multiplied(-startWidth / 2)),
                segment.end.added(prevLeftDir.multiplied(validLeftLength)),
            ];
            moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 0]];
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
        } else if ((angle < Math.PI && angle >= (Math.PI / 2 - angle1)) || (modelEditing && withOffset && offsetWidth < 0)) {
            param.platformLength = frontLength;
            const rightLength = withOffset && modelEditing ? (-offsetWidth + startWidth / 2) : -curDir.dot(prevLeftDir);
            const frontEnd1 = segment.start.added(prevDirNormalized.multiplied(frontLength));
            segment.end = frontEnd1;

            if (rightLength > startWidth / 2) {
                param.withOffset = true;
                param.offsetWidth = -(rightLength - startWidth / 2);
            }

            const validRightLength = Math.max(startWidth / 2, rightLength);
            moldShape.vertices = [
                start.added(prevLeftDir.multiplied(startWidth / 2)),
                start.added(prevLeftDir.multiplied(-validRightLength)),
                segment.end.added(prevLeftDir.multiplied(-validRightLength)),
                segment.end.added(prevLeftDir.multiplied(startWidth / 2)),
            ];
            moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 0]];
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
            param.offsetWidth = 0;
            if (angle <= DirectionAngleTolerance || angle >= (Math.PI * 2 - DirectionAngleTolerance)) {
                segment.end = segment.start.added(prevDirNormalized.multiplied(frontLength));
                param.platformLength = frontLength;
                moldShape.vertices = [
                    start.added(prevLeftDir.multiplied(startWidth / 2)),
                    start.added(prevLeftDir.multiplied(-startWidth / 2 + offsetWidth)),
                    segment.end.added(prevLeftDir.multiplied(-startWidth / 2 + offsetWidth)),
                    segment.end.added(prevLeftDir.multiplied(startWidth / 2)),
                ];
                moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 0]];
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
            } else if (DirectionAngleTolerance < angle && angle < (Math.PI / 2 - angle1)) {
                param.platformLength = segment.end.distanceTo(segment.start);
    
                let leftConnectPoints = [start.added(curLeftDir.multiplied(startWidth / 2)), baseLineEnd];
                const baseLineEndDistance = start.distanceTo(baseLineEnd);
                const leftProjectDistance = startWidth / 2 * Math.cos(angle);
                if (leftProjectDistance < baseLineEndDistance) {
                    const l1 = startWidth / 2 / Math.cos(angle);
                    if (l1 > baseLineEndDistance) {
                        const a1 = l1 - baseLineEndDistance;
                        const c1 = a1 / Math.tan(angle);
                        leftConnectPoints = [start.added(prevLeftDir.multiplied(baseLineEndDistance)).added(prevDirNormalized.multiplied(c1)), start.added(prevLeftDir.multiplied(baseLineEndDistance))];
                    } else {
                        leftConnectPoints = [start.added(prevLeftDir.multiplied(l1))];
                    }
                }
                moldShape.vertices = [
                    // start.added(curLeftDir.multiplied(startWidth / 2)),
                    ...leftConnectPoints,
                    start.added(prevLeftDir.multiplied(-startWidth / 2 / Math.cos(angle))),
                    segment.end.added(curLeftDir.multiplied(-startWidth / 2)),
                    segment.end.added(curLeftDir.multiplied(startWidth / 2)),
                ];
                const moldVertexCount = moldShape.vertices.length;
                moldShape.tempLines = generateTempLinesLoop(moldVertexCount);
                // if (moldVertexCount === 4) {
                // } else {
                //     moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]];
                // }
                stairShape.vertices = [...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(startHeight))),
                ...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(startHeight - platformThickness))),
                ];
                if (temp) {
                    stairShape.tempLines = [
                        ...moldShape.tempLines,
                        ...moldShape.tempLines.map(seg => [seg[0] + moldVertexCount, seg[1] + moldVertexCount]),
                        ...moldShape.tempLines.map(seg => [seg[0], seg[0] + moldVertexCount]),
                        // [0, 5], [1, 6], [2, 7], [3, 8], [4, 9],
                    ];
                }
            } else if (angle > (Math.PI * 3 / 2 + angle1) && angle < (Math.PI * 2 - DirectionAngleTolerance)) {
                param.platformLength = segment.end.distanceTo(segment.start);
                let rightConnectPoints = [baseLineStart, start.added(curLeftDir.multiplied(-startWidth / 2))];
                const baseLineStartDistance = start.distanceTo(baseLineStart);
                const rightProjectDistance = startWidth / 2 * Math.cos(angle);
                if (rightProjectDistance < baseLineStartDistance) {
                    // let rightConnectPoints = [baseLineStart, baseLineStart];
                    // if (startWidth <= prevParam.endWidth) {
                    const l2 = startWidth / 2 / Math.cos(angle);
                    if (l2 > baseLineStartDistance) {
                        const a2 = l2 - baseLineStartDistance;
                        const c2 = a2 / Math.tan(Math.PI * 2 - angle);
                        rightConnectPoints = [start.added(prevLeftDir.multiplied(-baseLineStartDistance)), start.added(prevLeftDir.multiplied(-baseLineStartDistance)).added(prevDirNormalized.multiplied(c2))];
                    } else {
                        rightConnectPoints = [start.added(prevLeftDir.multiplied(-l2))];
                    }
                }
    
                moldShape.vertices = [
                    start.added(prevLeftDir.multiplied(startWidth / 2 / Math.cos(angle))),
                    ...rightConnectPoints,
                    // start.added(curLeftDir.multiplied(-startWidth / 2)),
                    segment.end.added(curLeftDir.multiplied(-startWidth / 2)),
                    segment.end.added(curLeftDir.multiplied(startWidth / 2)),
                ];
                const moldVertexCount = moldShape.vertices.length;
                moldShape.tempLines = generateTempLinesLoop(moldVertexCount);
                stairShape.vertices = [...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(startHeight))),
                ...moldShape.vertices.map(p => p.added(DirectionZ.multiplied(startHeight - platformThickness))),
                ];
                if (temp) {
                    stairShape.tempLines = [
                        ...moldShape.tempLines,
                        ...moldShape.tempLines.map(seg => [seg[0] + moldVertexCount, seg[1] + moldVertexCount]),
                        ...moldShape.tempLines.map(seg => [seg[0], seg[0] + moldVertexCount]),
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
        moldShape.tempLines = [[0, 1], [1, 2], [2, 3], [3, 0]];
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

function generateHandrailShape(stairParam: StairParam, segments: Segment[]) {
    if (segments.length) {
        const { handrail: {support, height, rail, column} } = stairParam;
        let current: { segment: Segment, left: boolean, start: boolean }[] = [{ segment: segments[0], left: true, start: true }];
                const unVisited: Set<Segment> = new Set(segments);
                while (current.length) {
                    let next: { segment: Segment, left: boolean, start: boolean }[] = [];
                    for (const { segment, left, start } of current) {
                        const { startHeight, endHeight } = segment;
                        const endDelta = segment.param.upward === upward ? 0 : 2 * (startHeight - endHeight);
                        segment.startHeight += verticalDelta;
                        segment.endHeight += verticalDelta + endDelta;
                        segment.param.upward = upward;
                        unVisited.delete(segment);
        
                        const nextSegments = getNextComponents(segment, segments);
                        if (nextSegments.length) {
                            next.push(...nextSegments.map(seg => ({ segment: seg, verticalDelta: verticalDelta + endDelta })));
                        }
                    }
                    current = next;
        
                    if (!current.length) {
                        if (bulkChange && unVisited.size) {
                            const theSegment = [...unVisited.values()][0];
                            current = [{ segment: theSegment, verticalDelta: theSegment.startHeight > 0 === upward ? 0 : (theSegment.startHeight * - 2) }];
                        }
                    }
                }
    }
}

function generateTempLinesLoop(vertexCount: number) {
    return Array.from({ length: vertexCount }).map((_, i) => [i, i === vertexCount - 1 ? 0 : i + 1]);
}