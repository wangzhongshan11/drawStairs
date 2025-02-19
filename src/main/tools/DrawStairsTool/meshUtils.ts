import { BaseComponentKey, BaseLineSeg3dKey, CircleTangentKey, ComponentType, ParamKey, Segment, StartEndKey } from "./types";
import { stringifyBaseComponent, stringifyParam, stringifyPoint3d, stringifyStartEnd } from "./utils";

export function generateMeshes(segments: Segment[]): KMesh[] {
    const meshes: KMesh[] = [];
    for (const segment of segments) {
        const { param: { type }, circleTangent } = segment;
        if (type === ComponentType.StraightStair) {
            generateStraightStairMesh(segment);
        } else if (type === ComponentType.CircularStair) {
            if (circleTangent) {
                generateCircularStairMesh(segment);
            } else {
                generateStraightStairMesh(segment);
            }
        } else {
            generatePlatformMesh(segment);
        }
        if (segment.mesh) {
            meshes.push(segment.mesh);
        }
    }

    return meshes;
}


function generateCircularStairMesh(segment: Segment) {
    const { startLocked, circleTangent, stairShape: { vertices, stepCount }, cornerShape: { vertices: cornerVertices }, param: { upward } } = segment;

    if (stepCount < 1 || !startLocked || !circleTangent) return undefined;

    const stairMesh: KMesh = {
        vertices: vertices.map(vertex => [vertex.x, vertex.y, vertex.z]),
        triangleIndices: [],
        softEdges: [],
    }

    // 最底部台阶后下位置
    // const leftIndex = vertices.length - ((!upward && stepCount > 1) ? 4 : 2);
    for (let i = 0; i < stepCount; i++) {
        stairMesh.triangleIndices.push(
            // stair faces
            [i * 4, i * 4 + 1, i * 4 + 2],
            [i * 4 + 1, i * 4 + 3, i * 4 + 2],
            [i * 4 + 2, i * 4 + 3, i * 4 + 4],
            [i * 4 + 3, i * 4 + 5, i * 4 + 4],
            // side faces
            [i * 4, i * 4 + 2, (i + 1) * 4],
            [i * 4 + 1, (i + 1) * 4 + 1, i * 4 + 3],
        );

        stairMesh.softEdges?.push(
            [i * 4 + 1, i * 4 + 2],
            [i * 4 + 3, i * 4 + 4],
            [i * 4, (i + 1) * 4],
            [(i + 1) * 4 + 1, i * 4 + 1],
        );

        if (upward) {
            const bottomFrontLeftIndex = 4 * stepCount + 2 + 2 * (stepCount - i - 1);
            stairMesh.triangleIndices.push(
                // side middle faces
                [i * 4, (i + 1) * 4, bottomFrontLeftIndex],
                [(i + 1) * 4 + 1, i * 4 + 1, bottomFrontLeftIndex + 1],
            );
            if (i < stepCount - 1) {
                stairMesh.softEdges?.push(
                    [(i + 1) * 4, bottomFrontLeftIndex],
                    [(i + 1) * 4 + 1, bottomFrontLeftIndex + 1],
                );
            }
            if (i > 0) {
                stairMesh.triangleIndices.push(
                    // side bottom faces
                    [i * 4, bottomFrontLeftIndex, bottomFrontLeftIndex + 2],
                    [bottomFrontLeftIndex + 1, i * 4 + 1, bottomFrontLeftIndex + 3],
                    // bottom faces
                    [bottomFrontLeftIndex + 2, bottomFrontLeftIndex, bottomFrontLeftIndex + 3],
                    [bottomFrontLeftIndex + 3, bottomFrontLeftIndex, bottomFrontLeftIndex + 1],
                );
                stairMesh.softEdges?.push(
                    [i * 4, bottomFrontLeftIndex],
                    [i * 4 + 1, bottomFrontLeftIndex + 1],
                    [bottomFrontLeftIndex + 3, bottomFrontLeftIndex],
                );
                if (i < stepCount - 1) {
                    stairMesh.softEdges?.push([bottomFrontLeftIndex + 1, bottomFrontLeftIndex]);
                }
            } else {
                stairMesh.triangleIndices.push(
                    // bottom faces
                    [i * 4, bottomFrontLeftIndex, i * 4 + 1],
                    [i * 4 + 1, bottomFrontLeftIndex, bottomFrontLeftIndex + 1],
                );
                stairMesh.softEdges?.push([i * 4 + 1, bottomFrontLeftIndex]);
            }
        } else {
            const bottomBackLeftIndex = 4 * stepCount + 2 + 2 * (stepCount - i - 1);
            stairMesh.triangleIndices.push(
                // side middle faces
                [i * 4, (i + 1) * 4, bottomBackLeftIndex],
                [(i + 1) * 4 + 1, i * 4 + 1, bottomBackLeftIndex + 1],
                // bottom faces
                [bottomBackLeftIndex, bottomBackLeftIndex - 2, bottomBackLeftIndex + 1],
                [bottomBackLeftIndex + 1, bottomBackLeftIndex - 2, bottomBackLeftIndex - 1],
            );
            stairMesh.softEdges?.push(
                [bottomBackLeftIndex + 1, bottomBackLeftIndex - 2],
            );
            if (i < stepCount - 1) {
                stairMesh.softEdges?.push(
                    [(i + 1) * 4, bottomBackLeftIndex],
                    [(i + 1) * 4 + 1, bottomBackLeftIndex + 1],
                );

                stairMesh.triangleIndices.push(
                    // side bottom faces
                    [(i + 1) * 4, bottomBackLeftIndex - 2, bottomBackLeftIndex],
                    [bottomBackLeftIndex - 1, (i + 1) * 4 + 1, bottomBackLeftIndex + 1],
                );
                stairMesh.softEdges?.push(
                    [(i + 1) * 4, bottomBackLeftIndex - 2],
                    [(i + 1) * 4 + 1, bottomBackLeftIndex - 1],
                    [bottomBackLeftIndex + 1, bottomBackLeftIndex - 2],
                );
                if (i > 0) {
                    stairMesh.softEdges?.push([bottomBackLeftIndex + 1, bottomBackLeftIndex]);
                }
            }
        }
    }

    if (upward) {
        stairMesh.triangleIndices.push(
            // bottom faces
            // [vertices.length - 1, 1, 0],
            // [vertices.length - 1, 0, vertices.length - 2],
            // 前侧面
            [stepCount * 4, stepCount * 4 + 1, stepCount * 4 + 2],
            [stepCount * 4 + 1, stepCount * 4 + 3, stepCount * 4 + 2],
        );
        stairMesh.softEdges?.push(
            // [vertices.length - 1, 0],
            [stepCount * 4 + 1, stepCount * 4 + 2],
        );
        // if (stepCount > 1) {
        //     stairMesh.triangleIndices.push(
        //         // side bottom faces
        //         [vertices.length - 2, vertices.length - 10, vertices.length - 4],
        //         [vertices.length - 1, vertices.length - 3, vertices.length - 9],
        //         // bottom faces
        //         [vertices.length - 5, vertices.length - 3, vertices.length - 4],
        //         [vertices.length - 5, vertices.length - 4, vertices.length - 6],
        //     );
        //     stairMesh.softEdges?.push(
        //         [vertices.length - 5, vertices.length - 4],
        //         [vertices.length - 2, vertices.length - 10],
        //         [vertices.length - 10, vertices.length - 4],
        //     );
        // }
    } else {
        stairMesh.triangleIndices.push(
            // 后侧面
            [vertices.length - 1, 1, 0],
            [vertices.length - 1, 0, vertices.length - 2],
            // [vertices.length - 3, vertices.length - 2, vertices.length - 1],
            // [vertices.length - 3, vertices.length - 4, vertices.length - 2],
        );
        stairMesh.softEdges?.push(
            [vertices.length - 1, 0],
            // [vertices.length - 3, vertices.length - 2],
        );
        // if (stepCount > 1) {
        //     stairMesh.triangleIndices.push(
        //         // side bottom faces
        //         [vertices.length - 2, 0, vertices.length - 4],
        //         [vertices.length - 1, vertices.length - 3, 1],
        //         // bottom faces
        //         [vertices.length - 5, vertices.length - 4, vertices.length - 3],
        //         [vertices.length - 5, vertices.length - 6, vertices.length - 4],
        //     );
        //     stairMesh.softEdges?.push(
        //         [vertices.length - 5, vertices.length - 4],
        //         [vertices.length - 3, 1],
        //         [0, vertices.length - 4],
        //     );
        // }
    }

    if (cornerVertices.length === 6) {
        generatePolygonMesh(cornerVertices, stairMesh);
    }

    segment.mesh = stairMesh;
}

function generateStraightStairMesh(segment: Segment) {
    const { startLocked, stairShape: { vertices, stepCount }, cornerShape: { vertices: cornerVertices }, param: { upward } } = segment;

    if (stepCount < 1 || !startLocked) return undefined;

    const stairMesh: KMesh = {
        vertices: vertices.map(vertex => [vertex.x, vertex.y, vertex.z]),
        triangleIndices: [],
        softEdges: [],
    }

    const leftIndex = vertices.length - ((!upward && stepCount > 1) ? 4 : 2);
    for (let i = 0; i < stepCount; i++) {
        stairMesh.triangleIndices.push(
            // stair faces
            [i * 4, i * 4 + 1, i * 4 + 2],
            [i * 4 + 1, i * 4 + 3, i * 4 + 2],
            [i * 4 + 2, i * 4 + 3, i * 4 + 4],
            [i * 4 + 3, i * 4 + 5, i * 4 + 4],
            // side faces
            [i * 4, i * 4 + 2, (i + 1) * 4],
            [i * 4 + 1, (i + 1) * 4 + 1, i * 4 + 3]
        );

        stairMesh.softEdges?.push(
            [i * 4 + 1, i * 4 + 2],
            [i * 4 + 3, i * 4 + 4],
            [i * 4, (i + 1) * 4],
            [(i + 1) * 4 + 1, i * 4 + 1],
        );

        if (i === stepCount - 1 && upward && stepCount > 1) {
            const bbLeftIndex = vertices.length - 4;
            stairMesh.triangleIndices.push(
                // tail side faces
                [bbLeftIndex, i * 4, (i + 1) * 4],
                [bbLeftIndex + 1, (i + 1) * 4 + 1, i * 4 + 1],
            );
            stairMesh.softEdges?.push(
                [bbLeftIndex, i * 4],
                // [i * 4, (i + 1) * 4],

                [bbLeftIndex + 1, i * 4 + 1],
                // [(i + 1) * 4 + 1, i * 4 + 1],
            );
        } else {
            stairMesh.triangleIndices.push(
                // side faces
                [leftIndex, i * 4, (i + 1) * 4],
                [leftIndex + 1, (i + 1) * 4 + 1, i * 4 + 1],
            );
            // stairMesh.softEdges?.push(
            //     [i * 4, (i + 1) * 4],
            //     [(i + 1) * 4 + 1, i * 4 + 1],
            // );
            if (upward) {
                if (i > 0) {
                    stairMesh.softEdges?.push(
                        [leftIndex, i * 4],
                        [leftIndex + 1, i * 4 + 1],
                    );
                }
                if (stepCount > 1) {
                    stairMesh.softEdges?.push(
                        [leftIndex, (i + 1) * 4],
                        [leftIndex + 1, (i + 1) * 4 + 1],
                    );
                }
            } else {
                if (stepCount > 1) {
                    stairMesh.softEdges?.push(
                        [leftIndex, i * 4],
                        [leftIndex + 1, i * 4 + 1],
                    );
                }
                if (i < stepCount - 1) {
                    stairMesh.softEdges?.push(
                        [leftIndex, (i + 1) * 4],
                        [leftIndex + 1, (i + 1) * 4 + 1],
                    );
                }
            }
        }
    }

    if (upward) {
        stairMesh.triangleIndices.push(
            // bottom faces
            [vertices.length - 1, 1, 0],
            [vertices.length - 1, 0, vertices.length - 2],
            [vertices.length - 3, vertices.length - 1, vertices.length - 2],
            [vertices.length - 3, vertices.length - 2, vertices.length - 4],
        );
        stairMesh.softEdges?.push(
            [vertices.length - 1, 0],
            [vertices.length - 3, vertices.length - 2],
        );
        if (stepCount > 1) {
            stairMesh.triangleIndices.push(
                // side bottom faces
                [vertices.length - 2, vertices.length - 10, vertices.length - 4],
                [vertices.length - 1, vertices.length - 3, vertices.length - 9],
                // bottom faces
                [vertices.length - 5, vertices.length - 3, vertices.length - 4],
                [vertices.length - 5, vertices.length - 4, vertices.length - 6],
            );
            stairMesh.softEdges?.push(
                [vertices.length - 5, vertices.length - 4],
                [vertices.length - 2, vertices.length - 10],
                [vertices.length - 10, vertices.length - 4],
            );
        }
    } else {
        stairMesh.triangleIndices.push(
            // bottom faces
            [vertices.length - 1, 0, 1],
            [vertices.length - 1, vertices.length - 2, 0],
            [vertices.length - 3, vertices.length - 2, vertices.length - 1],
            [vertices.length - 3, vertices.length - 4, vertices.length - 2],
        );
        stairMesh.softEdges?.push(
            [vertices.length - 1, 0],
            [vertices.length - 3, vertices.length - 2],
        );
        if (stepCount > 1) {
            stairMesh.triangleIndices.push(
                // side bottom faces
                [vertices.length - 2, 0, vertices.length - 4],
                [vertices.length - 1, vertices.length - 3, 1],
                // bottom faces
                [vertices.length - 5, vertices.length - 4, vertices.length - 3],
                [vertices.length - 5, vertices.length - 6, vertices.length - 4],
            );
            stairMesh.softEdges?.push(
                [vertices.length - 5, vertices.length - 4],
                [vertices.length - 3, 1],
                [0, vertices.length - 4],
            );
        }
    }

    if (cornerVertices.length === 6) {
        generatePolygonMesh(cornerVertices, stairMesh);
    }

    segment.mesh = stairMesh;
}

function generatePlatformMesh(segment: Segment) {
    const { stairShape: { vertices } } = segment;
    // if (endLocked) {
    const vertexLength = vertices.length / 2;
    if (vertexLength === 4 || vertexLength === 5) {
        const platformMesh: KMesh = {
            vertices: [],
            triangleIndices: [],
            softEdges: [],
        }
        generatePolygonMesh(vertices, platformMesh);
        segment.mesh = platformMesh;
    }
    // }

    return undefined;
}

function generatePolygonMesh(vertices: KPoint3d[], mesh: KMesh) {
    const vertexLength = mesh.vertices.length;
    mesh.vertices.push(...vertices.map(vertex => [vertex.x, vertex.y, vertex.z]))
    const segCount = vertices.length / 2;

    for (let i = 0; i < segCount; i++) {
        const right = i === segCount - 1 ? 0 : i + 1;
        const bottomRight = i === segCount - 1 ? segCount : i + segCount + 1;
        mesh.triangleIndices.push(
            [i + vertexLength, i + segCount + vertexLength, bottomRight + vertexLength],
            [i + vertexLength, bottomRight + vertexLength, right + vertexLength],
        );
        mesh.softEdges?.push(
            [i + vertexLength, bottomRight + vertexLength],
        );
        if (i > 0 && i < segCount - 1) {
            mesh.triangleIndices.push(
                // top and bottom
                [i + vertexLength, right + vertexLength, 0 + vertexLength],
                [bottomRight + vertexLength, i + segCount + vertexLength, segCount + vertexLength],
            );
            if (i > 1) {
                mesh.softEdges?.push(
                    [i, 0 + vertexLength],
                    [i + segCount + vertexLength, segCount + vertexLength],
                );
            }
        }
    }
}

export function buildComponentInstance(segment: Segment, segments: Segment[]) {
    const { start, end, startHeight, endHeight, baseComponent, circleTangent, param, mesh } = segment;
    const design = app.getActiveDesign();

    let operationSuccess = true;
    if (mesh?.vertices.length) {
        const newShell = design.createShellFromMesh(mesh)?.newShell;
        operationSuccess = operationSuccess && !!newShell;
        if (newShell) {
            // if (param.type !== ComponentType.CircularStair) {
            //     const softEdges = newShell.getEdges().filter(e => e.isSoft());
            //     operationSuccess = operationSuccess && design.removeEdges(softEdges).isSuccess;
            // }

            const newInstance = design.makeGroup(newShell.getFaces(), [], [])?.addedInstance;
            operationSuccess = operationSuccess && !!newInstance;
            const groupDef = newInstance?.getGroupDefinition();
            if (newInstance && groupDef) {
                // operationSuccess = operationSuccess && groupDef.setCustomProperty(ComponentIndexKey, `${newInstances.length}`).isSuccess;
                // newInstances.push(newInstance);
                const paramString = stringifyParam(param);
                const startEndString = stringifyStartEnd(GeomLib.createPoint3d(start.x, start.y, startHeight), GeomLib.createPoint3d(end.x, end.y, endHeight));
                operationSuccess = operationSuccess && groupDef.setCustomProperty(ParamKey, paramString).isSuccess;
                operationSuccess = operationSuccess && groupDef.setCustomProperty(StartEndKey, startEndString).isSuccess;
                // if (baseLineSeg3d) {
                // }
                if (baseComponent) {
                    const BaseLineString = stringifyStartEnd(baseComponent.line3d.start, baseComponent.line3d.end);
                    operationSuccess = operationSuccess && groupDef.setCustomProperty(BaseLineSeg3dKey, BaseLineString).isSuccess;
                    
                    const baseSegment = getSegmentByIndex(segments, baseComponent.componentIndex);
                    if (baseSegment) {
                        const baseComponentString = stringifyBaseComponent(baseSegment, baseComponent.line3dIndex);
                        operationSuccess = operationSuccess && groupDef.setCustomProperty(BaseComponentKey, baseComponentString).isSuccess;

                    }
                }
                if (circleTangent) {
                    const tangentString = stringifyPoint3d(circleTangent);
                    operationSuccess = operationSuccess && groupDef.setCustomProperty(CircleTangentKey, tangentString).isSuccess;
                }
                return newInstance;
            }
        }
    }
    return undefined;
}

export function getSegmentByIndex(segments: Segment[], index?: number) {
    if (index === undefined) {
        return undefined;
    }
    return segments.find(segment => segment.param.index === index);
}