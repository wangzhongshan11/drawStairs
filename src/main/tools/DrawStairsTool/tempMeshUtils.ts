import { AngleTolerance, DirectionAngleTolerance, DirectionZ, dummyPoint3d, LengthTolerance, StepCountLimit } from "./consts";
import { getSegmentByIndex } from "./meshUtils";
import { ComponentType, Handrail, ComponentDirectionType, Segment, StairParam, CircularSide } from "./types";
import { isEqual } from "./utils";

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
        const tangentLeftDir = DirectionZ.cross(circleTangent).normalized();
        const startEndDir = end.subtracted(start).normalized();
        const startEndDistance = start.distanceTo(end);
        const maxWidth = Math.max(startWidth, endWidth);

        const endAngle = startEndDir.angleTo(circleTangent, DirectionZ);
        if (endAngle < DirectionAngleTolerance) {
            return generateStraightStairShape(segment, temp);
        }

        const isLeftArc = endAngle > Math.PI;
        if (isLeftArc) {
            segment.circularSide = CircularSide.Left;
        } else {
            segment.circularSide = CircularSide.Right;
        }
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
            const curLeftPt = curLeftMoldPt.added(DirectionZ.multiplied(startHeight + i * stepHeight));
            const curRightPt = curRightMoldPt.added(DirectionZ.multiplied(startHeight + i * stepHeight));
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
            const nextLeftPt = nextLeftMoldPt.added(DirectionZ.multiplied(startHeight + i * stepHeight));
            const nextRightPt = nextRightMoldPt.added(DirectionZ.multiplied(startHeight + i * stepHeight));
            if (upward) {
                vertices.push(
                    curLeftPt.added(DirectionZ.multiplied(stepHeight)),
                    curRightPt.added(DirectionZ.multiplied(stepHeight)),
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
                vertices.push(nextLeftPt.added(DirectionZ.multiplied(stepHeight)), nextRightPt.added(DirectionZ.multiplied(stepHeight)));
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
        const lastLeftPt = lastLeftMoldPt.added(DirectionZ.multiplied(startHeight + stepCount * stepHeight));
        const lastRightPt = lastRightMoldPt.added(DirectionZ.multiplied(startHeight + stepCount * stepHeight));
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
                    vertices[vertices.length - 2].added(DirectionZ.multiplied(verticalStep)),
                    vertices[vertices.length - 1].added(DirectionZ.multiplied(verticalStep))
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
                    lastLeftPt.added(DirectionZ.multiplied(-stepHeight)),
                    lastRightPt.added(DirectionZ.multiplied(-stepHeight)),
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
                    vertices[vertices.length - 2].added(DirectionZ.multiplied(-stepHeight - (1 - actualLastStepLength / horizontalStepAngle) * stepHeight)),
                    vertices[vertices.length - 1].added(DirectionZ.multiplied(-stepHeight - (1 - actualLastStepLength / horizontalStepAngle) * stepHeight)),
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
                    vertices.push(vertices[vInd].added(DirectionZ.multiplied(-stepHeight)), vertices[vInd + 1].added(DirectionZ.multiplied(-stepHeight)));
                }
            } else {
                // vertices.push(
                //     vertices[vertices.length - 6].added(DirectionZ.multiplied(stepHeight)),
                //     vertices[vertices.length - 5].added(DirectionZ.multiplied(stepHeight)),
                // );
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
                    vertices.push(vertices[vInd].added(DirectionZ.multiplied(stepHeight)), vertices[vInd + 1].added(DirectionZ.multiplied(stepHeight)));
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
                    vertices[vertices.length - 2].added(DirectionZ.multiplied(-stepHeight)),
                    vertices[vertices.length - 1].added(DirectionZ.multiplied(-stepHeight)),
                );
            } else {
                vertices.push(
                    vertices[0].added(DirectionZ.multiplied(stepHeight)),
                    vertices[1].added(DirectionZ.multiplied(stepHeight)),
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
                ...cornerMoldShape.vertices.map(v => v.added(DirectionZ.multiplied(startHeight))),
                ...cornerMoldShape.vertices.map(v => v.added(DirectionZ.multiplied(startHeight - platformThickness))),
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
            segment.componentDirectionType = ComponentDirectionType.Front;
            horizontalFrontDir = baseLineDir.cross(horizontalFrontDir.cross(baseLineDir)).normalized();
            horizontalDistance = horizontalDistance * Math.cos(deltaAngle);
            horizontalLeftDir = DirectionZ.cross(horizontalFrontDir);
        } else {
            if (angle < Math.PI / 2) {
                segment.componentDirectionType = ComponentDirectionType.Left;
                const cornerConnectionPoint1 = start.added(baseLineDir.multiplied(-startWidth / 2 * Math.sign(angle)));
                cornerMoldShape.vertices = [start, start.added(horizontalLeftDir.multiplied(-startWidth / 2)), cornerConnectionPoint1];
            } else {
                segment.componentDirectionType = ComponentDirectionType.Right;
                const cornerConnectionPoint2 = start.added(baseLineDir.multiplied(startWidth / 2 * Math.sign(angle)));
                cornerMoldShape.vertices = [start, cornerConnectionPoint2, start.added(horizontalLeftDir.multiplied(startWidth / 2))];
            }
            cornerMoldShape.tempLines = [[0, 1], [1, 2], [2, 0]];
            cornerShape.vertices = [
                ...cornerMoldShape.vertices.map(v => v.added(DirectionZ.multiplied(startHeight))),
                ...cornerMoldShape.vertices.map(v => v.added(DirectionZ.multiplied(startHeight - platformThickness))),
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
        const curLeftPt = curLeftMoldPt.added(DirectionZ.multiplied(startHeight + i * stepHeight));
        const curRightPt = curRightMoldPt.added(DirectionZ.multiplied(startHeight + i * stepHeight));
        moldVertices.push(curLeftMoldPt, curRightMoldPt);
        moldTempLines.push(
            [2 * i, 1 + 2 * i],
            [2 * i, 2 + 2 * i],
            [1 + 2 * i, 3 + 2 * i],
        );
        vertices.push(curLeftPt, curRightPt);
        if (upward) {
            vertices.push(
                curLeftPt.added(DirectionZ.multiplied(stepHeight)),
                curRightPt.added(DirectionZ.multiplied(stepHeight)),
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
                vertices[vertices.length - 2].added(DirectionZ.multiplied(stepHeight)),
                vertices[vertices.length - 1].added(DirectionZ.multiplied(stepHeight))
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
            stepCount > 1 ? vertices[vertices.length - 2].added(DirectionZ.multiplied(stepHeight)) : leftPt,
            stepCount > 1 ? vertices[vertices.length - 1].added(DirectionZ.multiplied(stepHeight)) : rightPt,
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
                vertices[vertices.length - 2].added(DirectionZ.multiplied(stepHeight)),
                vertices[vertices.length - 1].added(DirectionZ.multiplied(stepHeight)),
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
                vertices[vertices.length - 2].added(DirectionZ.multiplied(-stepHeight - (1 - actualLastStepLength / horizontalStep) * stepHeight)),
                vertices[vertices.length - 1].added(DirectionZ.multiplied(-stepHeight - (1 - actualLastStepLength / horizontalStep) * stepHeight)),
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
                vertices[0].added(DirectionZ.multiplied(stepHeight)),
                vertices[1].added(DirectionZ.multiplied(stepHeight)),
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
                vertices[vertices.length - 2].added(DirectionZ.multiplied(-stepHeight)),
                vertices[vertices.length - 1].added(DirectionZ.multiplied(-stepHeight)),
            );
        } else {
            vertices.push(
                vertices[0].added(DirectionZ.multiplied(stepHeight)),
                vertices[1].added(DirectionZ.multiplied(stepHeight)),
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
            segment.componentDirectionType = ComponentDirectionType.Left;
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
            segment.componentDirectionType = ComponentDirectionType.Right;
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
                segment.componentDirectionType = ComponentDirectionType.Front;
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
                segment.componentDirectionType = ComponentDirectionType.RightFront;
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
                segment.componentDirectionType = ComponentDirectionType.LeftFront;
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

type TempObject = {
    segment: Segment,
    line3dInd: number,
    startPoint?: KPoint3d,
    left: boolean,
    start: boolean
}
const ColumnStepTolerance = 1 / 10;

export function generateHandrailShape(stairParam: StairParam, segments: Segment[]) {
    const { handrail: { support, height, column: { step, param: columnParam } } } = stairParam;
    if (segments.length && support) {
        const handrails: Handrail[] = [];
        const unVisited: Set<Segment> = new Set(segments);
        const visited: Map<number, { left: boolean, right: boolean, line3dIndexes: Set<number> }> = new Map();
        for (const segment of segments) {
            if (!segment.moldShape.tempLines.length) {
                return undefined;
            }
            visited.set(segment.param.index, { left: false, right: false, line3dIndexes: new Set() });
        }
        let current: TempObject[] = [{
            segment: segments[0],
            line3dInd: getSegmentStartAndBaseLine3d(segments[0], segments).startLine.line3dInd,
            left: false,
            start: true,
        }];
        let handrail: Handrail = { rail: [], columns: [] };

        const stepTolerance = step * ColumnStepTolerance;

        while (current.length) {
            let next: TempObject[] = [];
            for (const { segment: currentSegment, line3dInd, startPoint, left } of current) {
                const {
                    param: { index, type, startWidth, endWidth, horizontalStep, verticalStep, upward },
                    start,
                    end,
                    startHeight,
                    endHeight,
                    moldShape: { vertices: moldVertices, tempLines: moldTempLines, stepCount },
                    nextComponents,
                    baseComponent,
                    circleTangent,
                    startLocked,
                    componentDirectionType,
                    circularSide,
                } = currentSegment;

                unVisited.delete(currentSegment)

                if (!startLocked) {
                    // if ((!startLocked && type !== ComponentType.CircularStair) || (!circleTangent && type === ComponentType.CircularStair)) {
                    continue;
                }

                const stepHeight = upward ? verticalStep : -verticalStep;
                const offsetLength = Math.max(columnParam.height || 0, columnParam.width || 0, columnParam.radius || 0) * 3;

                const baseSegment = getSegmentByIndex(segments, baseComponent?.componentIndex);
                const {
                    startLine: { line3dInd: startLine3dInd },
                    baseLine: { dir: baseLine3dDir, end: baseLine3dEnd},
                } = getSegmentStartAndBaseLine3d(currentSegment, segments, baseSegment);

                // let baseLine3dDir: KVector3d | undefined = baseComponent?.line3d ? baseComponent.line3d.end.subtracted(baseComponent.line3d.start).normalized() : DirectionX;
                const startToEndDir = end.subtracted(start).normalized();
                let frontDir = circleTangent ? circleTangent : startToEndDir;
                const angle = frontDir.angle(baseLine3dDir);
                const deltaAngle = Math.abs(angle - Math.PI / 2);
                if (deltaAngle <= DirectionAngleTolerance) {
                    frontDir = baseLine3dDir.cross(DirectionZ).normalized();
                }
                let leftDir = DirectionZ.cross(frontDir);
                let sp = start.added(leftDir.multiplied(startWidth / 2 * (left ? 1 : -1)));
                let ep = end.added(leftDir.multiplied(endWidth / 2 * (left ? 1 : -1)));
                let lastLength = sp.distanceTo(ep);
                let spToEpDir = ep.subtracted(sp).normalized();
                let nextStartPoint: KPoint3d | undefined = left ? sp : ep;
                let pushEnd = true;

                // let siblingSegmentInds = baseSegment?.nextComponents[baseComponent?.line3dIndex || 0];
                // let nextSiblingSegment = getSegmentByIndex(segments, [...siblingSegmentInds || []]?.find(ind => {
                //     const visitedSibling = visited.get(ind);
                //     return !visitedSibling;
                // }));
                // const visitedBaseSegment = baseSegment ? visited.get(baseSegment.param.index) : undefined;
                const line3dDir = moldVertices[moldTempLines[line3dInd][1]].subtracted(moldVertices[moldTempLines[line3dInd][0]]).normalized();
                let offsetDir = DirectionZ.cross(line3dDir);
                const visitedRecord = visited.get(index);
                if (type === ComponentType.Platform) {
                    const line3d = moldTempLines[line3dInd];
                    sp = startPoint || moldVertices[line3d[0]];
                    ep = moldVertices[line3d[1]];
                    lastLength = sp.distanceTo(ep);
                    spToEpDir = ep.subtracted(sp).normalized();
                    const nextLine3dInd = (line3dInd + 1) % moldTempLines.length;
                    const visitedLine3dIndexes = visitedRecord?.line3dIndexes;
                    const isEntrance = visitedLine3dIndexes?.has(line3dInd) && visitedLine3dIndexes?.has(nextLine3dInd);
                    // const currentStartLine3dIndex = getSegmentStartAndBaseLine3d(currentSegment, segments).startLine.line3dInd;
                    const hasEntranceSegment = line3dInd === startLine3dInd;

                    // const nextSegmentIndexes = nextComponents[line3dInd];
                    let nearestSegment: { segment: Segment, distance: number } | undefined;
                    for (const nextSegmentIndex of nextComponents[line3dInd]) {
                        const nextSegment = getSegmentByIndex(segments, nextSegmentIndex);
                        if (nextSegment) {
                            const { start } = nextSegment;
                            const ds = start.distanceTo(sp);
                            const de = start.distanceTo(ep);

                            const visitNextRecord = visited.get(nextSegment.param.index);
                            const nextComponentStartLine3dInd = getSegmentStartAndBaseLine3d(nextSegment, segments).startLine.line3dInd;
                            if (isEqual(ds + de, lastLength) && !visitNextRecord?.right && !visitNextRecord?.line3dIndexes.has(nextComponentStartLine3dInd)) {
                                if (!nearestSegment || nearestSegment.distance > ds) {
                                    nearestSegment = { segment: nextSegment, distance: ds };
                                }
                            }
                        }
                    }

                    let lastDistance = lastLength;
                    if (nearestSegment) {
                        // const { moldShape: { vertices: nearestVertices, tempLines: nearestTempLines } } = nearestSegment.segment;
                        const { endOnBaseLine } = getSegmentStartAndBaseLine3d(nearestSegment.segment, segments).startLine;
                        // const nearestLine3d = nearestSegment.segment.param.type === ComponentType.Platform ? nearestTempLines[nearestLine3dInd] : nearestTempLines[0];
                        // const nearestLine3dDir = nearestVertices[nearestLine3d[1]].subtracted(nearestVertices[nearestLine3d[0]]).normalized();
                        ep = endOnBaseLine;
                        // ep = nearestVertices[nearestLine3d[1]];
                        spToEpDir = ep.subtracted(sp).normalized();

                        if (spToEpDir.dot(line3dDir) < 0) {
                            lastDistance = 0;
                            pushEnd = false;
                            nextStartPoint = sp;
                        } else {
                            lastDistance = sp.distanceTo(ep);
                            nextStartPoint = isPlatform(nearestSegment.segment) ? ep : undefined;
                        }
                        // lastLength = sp.distanceTo(ep);
                    } else if (isEntrance && hasEntranceSegment && baseSegment) {
                        // const { line3d: baseLine3d, dir: baseLine3dDir } = getSegmentStartAndBaseLine3d(currentSegment, segments, baseSegment).baseLine;
                        // const { moldShape: { vertices: baseVertices, tempLines: baseTempLines } } = baseSegment;
                        // const baseLine3d = baseSegment.param.type === ComponentType.Platform ? baseTempLines[baseComponent?.line3dIndex || 0] : baseTempLines[baseTempLines.length - 1];
                        // baseLine3dDir = baseVertices[baseLine3d[1]].subtracted(baseVertices[baseLine3d[0]]).normalized();
                        // if (baseSegment.param.type === ComponentType.Platform && nextSiblingSegment) {
                        //     // don't care because next is platform (next will deal the case) or stair (only have one nextComponent which is currentSegment)
                        //     const { start: nextSiblingSegmentStartLineStart } = getSegmentStartAndBaseLine3d(nextSiblingSegment, segments, baseSegment).startLine;
                        //     ep = nextSiblingSegmentStartLineStart;
                        //     // if (nextSiblingSegment.param.type === ComponentType.Platform) {
                        //     //     const nextSiblingSegStartLine3d = nextSiblingSegment.moldShape.tempLines[getSegmentStartAndBaseLine3d(nextSiblingSegment, segments).startLine.line3dInd];
                        //     //     ep = nextSiblingSegment.moldShape.vertices[nextSiblingSegStartLine3d[1]];
                        //     // } else {
                        //     //     ep = nextSiblingSegment.start.added(baseLine3dDir.multiplied(-nextSiblingSegment.param.startWidth / 2));
                        //     // }
                        // } else {
                        ep = baseLine3dEnd;
                        // }
                        spToEpDir = ep.subtracted(sp).normalized();
                        if (spToEpDir.dot(baseLine3dDir) > 0) {
                            lastDistance = 0;
                            pushEnd = false;
                            nextStartPoint = sp;
                        } else {
                            lastDistance = sp.distanceTo(ep);
                            nextStartPoint = isPlatform(baseSegment) ? ep : undefined;
                        }
                    } else if (isEntrance) {
                        lastDistance = 0;
                        pushEnd = false;
                    }
                    else {
                        pushEnd = false;
                    }
                    // spToEpDir = ep.subtracted(sp).normalized();

                    const firstBottomPt = sp.added(DirectionZ.multiplied(startHeight)).added(offsetDir.multiplied(offsetLength)).added(spToEpDir.multiplied(startPoint ? 0 : offsetLength)).added(line3dDir.multiplied(startPoint ? 0 : offsetLength));
                    if (lastDistance > 0 || (lastDistance === 0 && !startPoint)) {
                        // push rail
                        handrail.rail.push(firstBottomPt.added(DirectionZ.multiplied(height)));
                    }
                    // push columns
                    if (lastDistance > 0) {
                        let tempDistance = 0;
                        while (tempDistance <= lastDistance) {
                            const isEnd = tempDistance === lastDistance;
                            const bottomPoint = tempDistance > 0 ? sp.added(spToEpDir.multiplied(tempDistance)).added(DirectionZ.multiplied(startHeight)).added(offsetDir.multiplied(offsetLength)) :
                                firstBottomPt;
                            handrail.columns.push([
                                bottomPoint,
                                bottomPoint.added(DirectionZ.multiplied(height)),
                            ]);
                            if (isEnd) {
                                handrail.rail.push(bottomPoint.added(DirectionZ.multiplied(height)));
                            }
                            const deltaDistance = (lastDistance - tempDistance);
                            tempDistance += (deltaDistance <= (step + stepTolerance) && deltaDistance >= stepTolerance) ? (pushEnd ? deltaDistance : Infinity) : step;
                        }
                    }

                    // if (pushEnd && (nearestSegment || (isEntrance && lastDistance > 0))) {
                    //     // push rail
                    //     handrail.rail.push(ep.added(DirectionZ.multiplied(startHeight + height)).added(offsetDir.multiplied(offsetLength)));
                    //     if (tempDistance - step < lastDistance) {
                    //         const lastBottomPoint = sp.added(spToEpDir.multiplied(lastDistance)).added(DirectionZ.multiplied(startHeight)).added(offsetDir.multiplied(offsetLength));
                    //         handrail.columns.push([
                    //             lastBottomPoint,
                    //             lastBottomPoint.added(DirectionZ.multiplied(height)),
                    //         ]);
                    //     }
                    // }

                    if (nearestSegment) {
                        next.push({
                            segment: nearestSegment.segment,
                            line3dInd: getSegmentStartAndBaseLine3d(nearestSegment.segment, segments).startLine.line3dInd,
                            left: false,
                            start: false,
                            startPoint: nextStartPoint,
                        });
                    } else {
                        if (isEntrance) {
                            if (baseSegment && hasEntranceSegment) {
                                // siblingSegmentInds = baseSegment.nextComponents[baseComponent.line3dIndex];
                                // if (nextSiblingSegment && baseSegment.param.type !== ComponentType.Platform) {
                                //     // never happen
                                //     next.push({
                                //         segment: nextSiblingSegment,
                                //         line3dInd: getSegmentStartAndBaseLine3d(nextSiblingSegment, segments).startLine.line3dInd,
                                //         left: false,
                                //         start: false,
                                //         startPoint: nextStartPoint,
                                //     });
                                // } else {
                                // if ((visitedBaseSegment?.right && !visitedBaseSegment.left)) {
                                next.push({
                                    segment: baseSegment,
                                    line3dInd: baseSegment.param.type === ComponentType.Platform ? baseComponent?.line3dIndex || 0 : 0,
                                    left: true,
                                    start: false,
                                    startPoint: nextStartPoint,
                                });
                                // }
                                // }
                            } else {
                                // end of this patch, the patch are start with platform
                                handrails.push(handrail);
                                handrail = { rail: [], columns: [] };
                            }
                        } else {
                            // end of this line3d
                            next.push({
                                segment: currentSegment,
                                line3dInd: nextLine3dInd,
                                left: false,
                                start: false,
                            });
                        }
                        visitedLine3dIndexes?.add(line3dInd);
                    }
                } else {
                    const columnActualHeight = height + verticalStep / 2;
                    const isRightStair = componentDirectionType === ComponentDirectionType.Right;
                    const isLeftStair = componentDirectionType === ComponentDirectionType.Left;

                    const stairRail: KPoint3d[] = [];
                    const stairColumns: KPoint3d[][] = [];

                    const cornerBaseDir = (!left && isRightStair) || (left && isLeftStair) ? leftDir : baseLine3dDir;
                    let cornerStartHeight = left ? endHeight : startHeight;
                    let cornerSideWidth = left ? endWidth : startWidth;
                    let sideCornerStart = left ? end : start;
                    let cornerEnd = sideCornerStart.added(cornerBaseDir.multiplied((cornerSideWidth / 2 + offsetLength) * (left ? 1 : -1)));
                    let cornerDistance = (startPoint || sp).distanceTo(cornerEnd);
                    // along cornerBaseDir
                    let cornerSpToEpDir = cornerEnd.subtracted(startPoint || sp).normalized();
                    let cornerOffsetDir = DirectionZ.cross(cornerSpToEpDir);
                    let cornerAdditionalHeight = !left && !isLeftStair && upward ? stepHeight : 0;

                    const headCornerRail: KPoint3d[] = [];
                    const headCornerColumns: KPoint3d[][] = [];
                    if (startPoint) {
                        let tempHeadDistance = step;

                        headCornerRail.push(startPoint.added(DirectionZ.multiplied(cornerStartHeight + cornerAdditionalHeight + height)).added(cornerOffsetDir.multiplied(offsetLength)));
                        while (tempHeadDistance < cornerDistance) {
                            const bottomPoint = startPoint.added(cornerSpToEpDir.multiplied(tempHeadDistance)).added(DirectionZ.multiplied(cornerStartHeight + cornerAdditionalHeight)).added(cornerOffsetDir.multiplied(offsetLength));
                            headCornerColumns.push([
                                bottomPoint,
                                bottomPoint.added(DirectionZ.multiplied(height)),
                            ]);
                            tempHeadDistance += step;
                        }

                        if (!left && isLeftStair) {
                            const lastBottomPoint = cornerEnd.added(DirectionZ.multiplied(cornerStartHeight + cornerAdditionalHeight)).added(cornerOffsetDir.multiplied(offsetLength));
                            // push rail
                            headCornerRail.push(lastBottomPoint.added(DirectionZ.multiplied(height)));
                            if ((cornerDistance - tempHeadDistance + step) > stepTolerance) {
                                // const lastBottomPoint = ep.added(DirectionZ.multiplied(left ? endHeight : startHeight)).added(cornerOffsetDir.multiplied(offsetLength));
                                // handrail.rail.push(lastBottomPoint.added(DirectionZ.multiplied(height)));
                                headCornerColumns.push([
                                    lastBottomPoint,
                                    lastBottomPoint.added(DirectionZ.multiplied(height)),
                                ]);

                            }
                        }
                    }


                    nextStartPoint = left ? sp : ep;
                    // next segment startWidth !== currentSegment endWidth
                    pushEnd = false;

                    // const reasonableStep = Math.ceil(step / horizontalStep) * horizontalStep;
                    const reasonableStepCount = Math.ceil(step / horizontalStep);
                    let tempStepCount = 0;

                    const arcChordAngle = circleTangent ? startToEndDir.angle(circleTangent) : 0;

                    if (type === ComponentType.StraightStair || (type === ComponentType.CircularStair && (arcChordAngle <= DirectionAngleTolerance || !circleTangent))) {
                        lastLength = sp.distanceTo(ep);
                        // push rail
                        // if (deltaAngle > DirectionAngleTolerance) {
                        //     const cornerBottomPt = sp.added(DirectionZ.multiplied(startHeight)).added(baseLine3dDir.multiplied((startWidth / 2 - offsetLength) * (left ? 1 : -1)));
                        //     stairRail.push(cornerBottomPt.added(DirectionZ.multiplied(height)));
                        //     stairColumns.push([
                        //         cornerBottomPt,
                        //         cornerBottomPt.added(DirectionZ.multiplied(height)),
                        //     ]);
                        // }
                        stairRail.push(sp.added(DirectionZ.multiplied(startHeight + height + (upward ? 1 : 0) * stepHeight)).added(leftDir.multiplied(left ? -offsetLength : offsetLength)));
                        if (!upward && stepCount > 1) {
                            stairRail.push(sp.added(DirectionZ.multiplied(startHeight + height)).added(frontDir.multiplied(horizontalStep)).added(leftDir.multiplied(left ? -offsetLength : offsetLength)));
                        }
                        // push columns
                        // let tempDistance = horizontalStep / 2;
                        while (tempStepCount < stepCount - 1) {
                            const curHorStepDistance = (tempStepCount + 0.5) * horizontalStep;
                            const curVerStepDistance = (tempStepCount + (upward ? 1 : 0)) * stepHeight;
                            const bottomPoint = sp.added(frontDir.multiplied(curHorStepDistance)).added(DirectionZ.multiplied(startHeight + curVerStepDistance)).added(leftDir.multiplied(left ? -offsetLength : offsetLength));
                            stairColumns.push([
                                bottomPoint,
                                bottomPoint.added(DirectionZ.multiplied(!upward && tempStepCount === 0 ? height : columnActualHeight)),
                            ]);
                            // const tempStepCount = Math.floor(tempDistance / horizontalStep);

                            // tempDistance += reasonableStep;
                            tempStepCount += reasonableStepCount;
                        }
                        if (stepCount > 1) {
                            if (upward) {
                                stairRail.push(sp.added(DirectionZ.multiplied(startHeight + height + (upward ? stepCount : (stepCount - (stepCount > 2 ? 2 : 1))) * stepHeight)).added(frontDir.multiplied((stepCount - 1) * horizontalStep)).added(leftDir.multiplied(left ? -offsetLength : offsetLength)));
                            }
                        }
                        const totalLength = Math.abs(end.subtracted(start).dot(frontDir));
                        const prevTotalStepLength = (stepCount - 1) * horizontalStep;
                        const lastStepLength = lastLength - prevTotalStepLength;
                        stairRail.push(sp.added(DirectionZ.multiplied(startHeight + height + (upward ? stepCount : (Math.max(0, totalLength - horizontalStep) / horizontalStep)) * stepHeight)).added(frontDir.multiplied(totalLength)).added(leftDir.multiplied(left ? -offsetLength : offsetLength)));
                        if (tempStepCount - reasonableStepCount <= stepCount - 1) {
                            const lastBottomPoint = sp.added(frontDir.multiplied(prevTotalStepLength + lastStepLength / 2)).added(DirectionZ.multiplied(endHeight + (upward ? 0 : -stepHeight))).added(leftDir.multiplied(left ? -offsetLength : offsetLength));
                            stairColumns.push([
                                lastBottomPoint,
                                lastBottomPoint.added(DirectionZ.multiplied(height + (upward ? 0 : (verticalStep * (1 - lastStepLength / horizontalStep / 2))))),
                            ]);
                        }
                        // next segment startWidth !== currentSegment endWidth
                        sp = left ? start.added(baseLine3dDir.multiplied(startWidth / 2 - offsetLength)) : end.added(leftDir.multiplied(-startWidth / 2 + offsetLength));
                    } else if (circleTangent) {
                        const tangentLeftDir = DirectionZ.cross(circleTangent).normalized();
                        const startEndDistance = start.distanceTo(end);
                        const maxWidth = Math.max(startWidth, endWidth);
                        const endAngle = startToEndDir.angleTo(circleTangent, DirectionZ);

                        const isLeftArc = circularSide === CircularSide.Left;
                        const endComplementaryAngle = isLeftArc ? Math.abs(endAngle - Math.PI / 2 - Math.PI) : Math.abs(endAngle - Math.PI / 2);
                        const halfChord = startEndDistance / 2;
                        const radius = halfChord / Math.cos(endComplementaryAngle);
                        const innerRadius = radius - maxWidth / 2;
                        // if (radius < maxWidth / 2 * 1.2 || innerRadius < horizontalStep / 2 / 0.8) {
                        //     return;
                        // }
                        const horizontalStepAngle = Math.asin(horizontalStep / 2 / innerRadius) * 2;
                        const circleNormal = isLeftArc ? DirectionZ : DirectionZ.reversed();
                        const circleCenter = start.added(tangentLeftDir.multiplied(isLeftArc ? radius : -radius));
                        // const circle = GeomLib.createCircle3dByCenterNormalRadius(circleCenter, circleNormal, radius);
                        const arc = GeomLib.createArc3dByCenterNormalRadius(circleCenter, circleNormal, radius, start, end);
                        const arcAngle = arc.arcAngle;
                        // const stepCount = Math.ceil(arcAngle / horizontalStepAngle);
                        const lastHorizontalAngle = arcAngle - horizontalStepAngle * (stepCount - 1);
                        // const validStepCount = (lastHorizontalAngle === 0 || lastHorizontalAngle > AngleTolerance) ? stepCount : stepCount - 1;
                        // if (horizontalStepAngle >= arcAngle || horizontalStepAngle >= Math.PI / 2 || validStepCount >= StepCountLimit || validStepCount < 1) {
                        //     return;
                        // }
                        const startRadiusDir = isLeftArc ? tangentLeftDir.reversed() : tangentLeftDir;
                        // if (deltaAngle > DirectionAngleTolerance) {
                        //     const cornerBottomPt = sp.added(DirectionZ.multiplied(startHeight)).added(baseLine3dDir.multiplied((startWidth / 2 - offsetLength) * (left ? 1 : -1)));
                        //     stairRail.push(cornerBottomPt.added(DirectionZ.multiplied(height)));
                        //     stairColumns.push([
                        //         cornerBottomPt,
                        //         cornerBottomPt.added(DirectionZ.multiplied(height)),
                        //     ]);
                        // }
                        // push columns
                        while (tempStepCount < stepCount) {
                            const curRotateAngle = horizontalStepAngle * tempStepCount;
                            const nextRotateAngle = horizontalStepAngle * tempStepCount + (tempStepCount === stepCount - 1 ? lastHorizontalAngle : horizontalStepAngle);
                            const curRotateMatrix = GeomLib.createRotateMatrix4(horizontalStepAngle * tempStepCount, circleNormal, dummyPoint3d);

                            const nextRotateMatrix = GeomLib.createRotateMatrix4(nextRotateAngle, circleNormal, dummyPoint3d);
                            const curRadiusDir = startRadiusDir.appliedMatrix4(curRotateMatrix);
                            const nextRadiusDir = startRadiusDir.appliedMatrix4(nextRotateMatrix);
                            const curHalfWidth = (startWidth + (endWidth - startWidth) * (curRotateAngle) / arcAngle) / 2 * (isLeftArc ? -1 : 1);
                            const nextHalfWidth = (startWidth + (endWidth - startWidth) * (nextRotateAngle) / arcAngle) / 2 * (isLeftArc ? -1 : 1);
                            const curLeftMoldPt = circleCenter.added(curRadiusDir.multiplied(radius + curHalfWidth));
                            const curRightMoldPt = circleCenter.added(curRadiusDir.multiplied(radius - curHalfWidth));
                            const nextLeftMoldPt = circleCenter.added(nextRadiusDir.multiplied(radius + nextHalfWidth));
                            const nextRightMoldPt = circleCenter.added(nextRadiusDir.multiplied(radius - nextHalfWidth));
                            const curStepLeftFrontDir = nextLeftMoldPt.subtracted(curLeftMoldPt).multiplied(0.5);
                            const curStepRightFrontDir = nextRightMoldPt.subtracted(curRightMoldPt).multiplied(0.5);
                            const curStepLeftDir = DirectionZ.cross(curStepLeftFrontDir).normalized();
                            const curStepRightDir = DirectionZ.cross(curStepRightFrontDir).normalized();
                            const curLeftBottomPt = curLeftMoldPt.added(DirectionZ.multiplied(startHeight + (tempStepCount + (upward ? 1 : 0)) * stepHeight)).added(curStepLeftDir.multiplied(-offsetLength));
                            const curRightBottomPt = curRightMoldPt.added(DirectionZ.multiplied(startHeight + (tempStepCount + (upward ? 1 : 0)) * stepHeight)).added(curStepRightDir.multiplied(offsetLength));
                            const curLeftBottomMidPt = curLeftBottomPt.added(curStepLeftFrontDir);
                            const curRightBottomMidPt = curRightBottomPt.added(curStepRightFrontDir);

                            // const bottomPoint = sp.added(frontDir.multiplied(tempDistance)).added(DirectionZ.multiplied(startHeight));
                            if (tempStepCount >= 0) {
                                // push rail
                                // stairRail.push(sp.added(DirectionZ.multiplied(startHeight + height + (upward ? 1 : 0) * stepHeight)).added(leftDir.multiplied(offsetLength)));
                                if (left) {
                                    stairRail.push(curLeftBottomPt.added(DirectionZ.multiplied(height + (tempStepCount > 0 && !upward ? -stepHeight : 0))));
                                    // if (!upward && tempStepCount === 0) {
                                    //     const nextLeftBottomPt = nextLeftMoldPt.added(DirectionZ.multiplied(startHeight + (tempStepCount + (upward ? 1 : 0)) * stepHeight)).added(curStepLeftDir.multiplied(-offsetLength));
                                    //     stairRail.push(nextLeftBottomPt.added(DirectionZ.multiplied(height)));
                                    // }
                                } else {
                                    stairRail.push(curRightBottomPt.added(DirectionZ.multiplied(height + (tempStepCount > 0 && !upward ? -stepHeight : 0))));
                                    // if (!upward && tempStepCount === 0) {
                                    //     const nextRightBottomPt = nextRightMoldPt.added(DirectionZ.multiplied(startHeight + (tempStepCount + (upward ? 1 : 0)) * stepHeight)).added(curStepRightDir.multiplied(offsetLength));
                                    //     stairRail.push(nextRightBottomPt.added(DirectionZ.multiplied(height)));
                                    // }
                                }

                                if (tempStepCount === stepCount - 1) {
                                    const lastStepPercent = lastHorizontalAngle / horizontalStepAngle;
                                    if (left) {
                                        // stairRail.push(curLeftBottomMidPt.added(curStepLeftFrontDir.reversed()).added(DirectionZ.multiplied(height)));
                                        stairRail.push(curLeftBottomMidPt.added(curStepLeftFrontDir).added(DirectionZ.multiplied(height + (upward ? 0 : -stepHeight * (1 - lastStepPercent)))));
                                    } else {
                                        // stairRail.push(curRightBottomMidPt.added(curStepRightFrontDir.reversed()).added(DirectionZ.multiplied(height)));
                                        stairRail.push(curRightBottomMidPt.added(curStepRightFrontDir).added(DirectionZ.multiplied(height + (upward ? 0 : -stepHeight * (1 - lastStepPercent)))));
                                        // nextStartPoint = curRightMoldPt;
                                    }

                                    // if (tempStepCount % reasonableStepCount !== 0) {
                                        stairColumns.push([
                                            left ? curLeftBottomMidPt : curRightBottomMidPt,
                                            (left ? curLeftBottomMidPt : curRightBottomMidPt).added(DirectionZ.multiplied(height + (upward ? 0 : (verticalStep * ( 1 - lastStepPercent / 2))))),
                                        ]);
                                    // }
                                    // next segment startWidth !== currentSegment endWidth
                                    sp = left ? start.added(baseLine3dDir.multiplied(startWidth / 2 - offsetLength)) : curRightMoldPt;
                                    if (!left) {
                                        leftDir = curStepLeftDir;
                                    }
                                }
                            }

                            if (tempStepCount % reasonableStepCount === 0 && tempStepCount < stepCount - 1) {
                                stairColumns.push([
                                    left ? curLeftBottomMidPt : curRightBottomMidPt,
                                    (left ? curLeftBottomMidPt : curRightBottomMidPt).added(DirectionZ.multiplied(!upward && tempStepCount === 0 ? height : columnActualHeight)),
                                ]);
                            }

                            tempStepCount += 1;
                        }
                    }

                    handrail.rail.push(...headCornerRail);
                    handrail.columns.push(...headCornerColumns);
                    if (left) {
                        handrail.rail.push(...stairRail.reverse());
                        handrail.columns.push(...stairColumns.reverse());
                    } else {
                        handrail.rail.push(...stairRail);
                        handrail.columns.push(...stairColumns);
                    }

                    let stairNextSegment: Segment | undefined;
                    for (const nextSegmentIndex of nextComponents[line3dInd]) {
                        const nextSegment = getSegmentByIndex(segments, nextSegmentIndex);
                        const nextSegmentVisitedRecord = visited.get(nextSegment?.param.index || -1);

                        if (nextSegment && ((isPlatform(nextSegment) && !nextSegmentVisitedRecord?.line3dIndexes.size) || (!isPlatform(nextSegment) && !nextSegmentVisitedRecord?.right))) {
                            stairNextSegment = nextSegment;
                        }
                    }

                    if (left) {
                        if (baseSegment) {
                            // if (nextSiblingSegment && baseSegment.param.type !== ComponentType.Platform) {
                            //     // never happen
                            //     next.push({
                            //         segment: nextSiblingSegment,
                            //         line3dInd: getSegmentStartAndBaseLine3d(nextSiblingSegment, segments).startLine.line3dInd,
                            //         left: false,
                            //         start: false,
                            //         startPoint: nextStartPoint,
                            //     });
                            // } else {

                            // const { moldShape: { vertices: baseVertices, tempLines: baseTempLines } } = baseSegment;
                            // const baseLine3d = baseSegment.param.type === ComponentType.Platform ? baseTempLines[baseComponent?.line3dIndex || 0] : baseTempLines[baseTempLines.length - 1];
                            // const baseLine3dDir = baseVertices[baseLine3d[1]].subtracted(baseVertices[baseLine3d[0]]).normalized();
                            ep = baseLine3dEnd;
                            spToEpDir = ep.subtracted(sp).normalized();
                            if (spToEpDir.dot(baseLine3dDir) > 0) {
                                nextStartPoint = sp;
                            } else {
                                pushEnd = true;
                                nextStartPoint = isPlatform(baseSegment) ? ep : undefined;;
                            }
                            // if (baseSegment && (visitedBaseSegment?.right && !visitedBaseSegment.left)) {
                            next.push({
                                segment: baseSegment,
                                line3dInd: baseSegment.param.type === ComponentType.Platform ? baseComponent?.line3dIndex || 0 : 0,
                                left: true,
                                start: false,
                                startPoint: nextStartPoint,
                            });
                            // }
                        } else {
                            // end the patch which is start with currentSegment
                            handrails.push(handrail);
                            handrail = { rail: [], columns: [] };
                        }
                        if (visitedRecord) {
                            visitedRecord.left = true;
                        }
                    } else {
                        if (stairNextSegment) {
                            // const { moldShape: { vertices: stairNextVertices, tempLines: stairNextTempLines } } = stairNextSegment;
                            const { line3dInd: stairNextLine3dInd, endOnBaseLine } = getSegmentStartAndBaseLine3d(stairNextSegment, segments, currentSegment).startLine;
                            // const stairNextLine3d = stairNextSegment.param.type === ComponentType.Platform ? stairNextTempLines[stairNextLine3dInd] : stairNextTempLines[0];
                            // const stairNextLine3dDir = stairNextVertices[stairNextLine3d[1]].subtracted(stairNextVertices[stairNextLine3d[0]]).normalized();

                            ep = endOnBaseLine;
                            spToEpDir = ep.subtracted(sp).normalized();
                            if (spToEpDir.dot(line3dDir) > 0) {
                                nextStartPoint = sp;
                            } else {
                                pushEnd = true;
                                nextStartPoint = isPlatform(stairNextSegment) ? ep : undefined;
                            }

                            next.push({
                                segment: stairNextSegment,
                                line3dInd: stairNextLine3dInd,
                                left: false,
                                start: false,
                                startPoint: nextStartPoint,
                            });
                        } else {
                            next.push({
                                segment: currentSegment,
                                line3dInd: 0,
                                left: true,
                                start: false,
                                // startPoint: nextStartPoint,
                            });
                            // end the patch which is end with stair component
                            handrails.push(handrail);
                            handrail = { rail: [], columns: [] };
                        }
                        if (visitedRecord) {
                            visitedRecord.right = true;
                        }
                    }

                    if (pushEnd) {
                        // let currentCornerSideWidth = left ? startWidth : endWidth;
                        // let currentSideCornerStart = left ? start : end;

                        // ep is reused when pushEnd
                        let tempTailDistance = left ? 0 : step;
                        if (left && isLeftStair) {
                            sp = start.added(leftDir.multiplied(startWidth / 2 - offsetLength));
                        }
                        cornerStartHeight = left ? startHeight : endHeight;
                        cornerEnd = ep;
                        cornerDistance = sp.distanceTo(cornerEnd);
                        // along cornerBaseDir
                        cornerSpToEpDir = cornerEnd.subtracted(sp).normalized();
                        cornerOffsetDir = DirectionZ.cross(cornerSpToEpDir);
                        cornerAdditionalHeight = left && !isRightStair && upward ? stepHeight : (!left && !upward ? -stepHeight : 0);
                        // cornerSpToEpDir = cornerEnd.subtracted(sp).normalized();
                        // cornerOffsetDir = DirectionZ.cross(cornerSpToEpDir);
                        while (tempTailDistance < cornerDistance) {
                            const bottomPoint = sp.added(cornerSpToEpDir.multiplied(tempTailDistance)).added(DirectionZ.multiplied(cornerStartHeight + cornerAdditionalHeight)).added(cornerOffsetDir.multiplied(offsetLength));
                            handrail.columns.push([
                                bottomPoint,
                                bottomPoint.added(DirectionZ.multiplied(height)),
                            ]);
                            tempTailDistance += step;
                        }

                        const lastBottomPoint = ep.added(DirectionZ.multiplied(cornerStartHeight + cornerAdditionalHeight)).added(cornerOffsetDir.multiplied(offsetLength));
                        // const lastBottomPoint = ep.added(DirectionZ.multiplied(left ? endHeight : startHeight)).added(cornerOffsetDir.multiplied(offsetLength));
                        if (left && isRightStair) {
                            handrail.rail.push(sp.added(DirectionZ.multiplied(cornerStartHeight + height + cornerAdditionalHeight)));
                        }
                        // push rail
                        handrail.rail.push(lastBottomPoint.added(DirectionZ.multiplied(height)));
                        if ((cornerDistance - tempTailDistance + step) > stepTolerance) {
                            handrail.columns.push([
                                lastBottomPoint,
                                lastBottomPoint.added(DirectionZ.multiplied(height)),
                            ]);
                        }
                    }
                }
            }

            current = next;
            if (!current.length) {
                if (unVisited.size) {
                    const theSegment = [...unVisited.values()][0];
                    current = [{
                        segment: theSegment,
                        line3dInd: getSegmentStartAndBaseLine3d(theSegment, segments).startLine.line3dInd,
                        left: false,
                        start: true,
                    }];
                }
            }
        }

        return handrails;
    }
}

function generateTempLinesLoop(vertexCount: number) {
    return Array.from({ length: vertexCount }).map((_, i) => [i, i === vertexCount - 1 ? 0 : i + 1]);
}

function getSegmentStartAndBaseLine3d(segment: Segment, segments: Segment[], baseSegment?: Segment) {
    const { start, param: { type, startWidth }, componentDirectionType, moldShape: { tempLines, vertices }, baseComponent } = segment;

    let startLine3dInd = 0;
    // 5 edges
    if (type === ComponentType.Platform && componentDirectionType === ComponentDirectionType.RightFront && tempLines.length > 4) {
        startLine3dInd = 1;
    }
    const startLine3d = tempLines[startLine3dInd];
    const startLine3dStart = vertices[startLine3d[0]];
    const startLine3dEnd = vertices[startLine3d[1]];
    const startLine3dDir = startLine3dEnd.subtracted(startLine3dStart).normalized();

    let baseLine3dInd = baseComponent?.componentIndex || 0;
    let baseLine3d = [...startLine3d].reverse();
    let baseLine3dStart = vertices[startLine3d[1]];
    let baseLine3dEnd = vertices[startLine3d[0]];
    let baseLine3dDir = startLine3dDir.reversed();;
    if (!baseSegment && baseComponent) {
        baseSegment = getSegmentByIndex(segments, baseComponent.componentIndex);
    }
    if (baseSegment) {
        const { moldShape: { vertices: baseVertices, tempLines: baseTempLines } } = baseSegment;
        baseLine3d = baseSegment.param.type === ComponentType.Platform ? baseTempLines[baseComponent?.line3dIndex || 0] : [...baseTempLines[baseTempLines.length - 1]].reverse();
        baseLine3dStart = baseVertices[baseLine3d[0]];
        baseLine3dEnd = baseVertices[baseLine3d[1]];
        baseLine3dDir = baseLine3dEnd.subtracted(baseLine3dStart).normalized();
    }

    let startOnBaseLine = startLine3dStart;
    let endOnBaseLine = startLine3dEnd;
    if (type !== ComponentType.Platform) {
        startOnBaseLine = start.added(baseLine3dDir.multiplied(startWidth / 2));
        endOnBaseLine = start.added(baseLine3dDir.multiplied(-startWidth / 2));
    }

    return {
        startLine: { line3dInd: startLine3dInd, line3d: startLine3d, dir: startLine3dDir, start: startLine3dStart, end: startLine3dEnd, startOnBaseLine, endOnBaseLine },
        baseLine: { line3dInd: baseLine3dInd, line3d: baseLine3d, dir: baseLine3dDir, start: baseLine3dStart, end: baseLine3dEnd },
    };
}

export function isPlatform(segment: Segment) {
    return segment.param.type === ComponentType.Platform;
}


export function isCircularStair(segment: Segment) {
    return segment.param.type === ComponentType.CircularStair;
}


export function isStraightStair(segment: Segment) {
    return segment.param.type === ComponentType.StraightStair;
}