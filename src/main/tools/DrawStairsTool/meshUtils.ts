import { DirectionZ, dummyPoint3d } from "./consts";
import {
    BaseComponentKey, BaseLineSeg3dKey, CircleTangentKey, ColumnType, ComponentType, DefaultStairParam, Handrail, HandrailModelKey, RailType, Segment,
    ModelValue, StairParam, StartEndKey, PresetMaterials, ColumnModelKey, RailModelKey, HandrailInstancesData,
    ComponentParamKey
} from "./types";
import { getCoordinate, stringifyBaseComponent, stringifyComponentParam, stringifyPoint3d, stringifyStartEnd } from "./utils";

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
            // side faces (up)
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
                // side faces (middle)
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
                    // side faces (bottom)
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
                // side faces (middle)
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
                    // side faces (bottom)
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

export async function loadDefaultMaterials() {
    const design = app.getActiveDesign();
    const res1 = await design.loadMaterial(PresetMaterials.Stair.materialId);
    if (!res1.isSuccess) {
        return false;
    }
    const res2 = await design.loadMaterial(PresetMaterials.Platform.materialId);
    if (!res2.isSuccess) {
        return false;
    }
    const res3 = await design.loadMaterial(PresetMaterials.Handrail.rail.materialId);
    if (!res3.isSuccess) {
        return false;
    }
    const res4 = await design.loadMaterial(PresetMaterials.Handrail.column.materialId);
    if (!res4.isSuccess) {
        return false;
    }
    return true;
}

export function buildComponentInstance(segment: Segment, segments: Segment[], parentTransform?: KMatrix4) {
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
                if (parentTransform) {
                    const transformRes = design.transformGroupInstances([newInstance], parentTransform.inversed());
                    operationSuccess = operationSuccess && transformRes.isSuccess;
                }
                const materialObject = param.type === ComponentType.Platform ? PresetMaterials.Platform : PresetMaterials.Stair;
                operationSuccess = operationSuccess && design.assignMaterialForEntities([newInstance], materialObject.materialId, materialObject.bgId);
                // operationSuccess = operationSuccess && groupDef.setCustomProperty(ComponentIndexKey, `${newInstances.length}`).isSuccess;
                // newInstances.push(newInstance);
                const paramString = stringifyComponentParam(param);
                const startEndString = stringifyStartEnd(GeomLib.createPoint3d(start.x, start.y, startHeight), GeomLib.createPoint3d(end.x, end.y, endHeight));
                operationSuccess = operationSuccess && groupDef.setCustomProperty(ComponentParamKey, paramString).isSuccess;
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

export async function buildHandrailInstance(stairParam: StairParam, handrails: Handrail[], parentTransform?: KMatrix4): Promise<HandrailInstancesData | undefined | 0> {
    const { handrail: { support, height, rail: { type: railType, param: railParam }, column: { type: columnType, param: columnParam } } } = stairParam;
    if (!support) {
        return 0;
    }

    let columnFace: KFace | undefined;
    if (columnType === ColumnType.Circle) {
        columnFace = drawCircle(dummyPoint3d, DirectionZ, columnParam.radius || DefaultStairParam.horizontalStep / 10);
    } else if (columnType === ColumnType.Rect) {
        columnFace = drawRect(dummyPoint3d, DirectionZ, columnParam.width || DefaultStairParam.horizontalStep / 10, columnParam.height || DefaultStairParam.horizontalStep / 10, false);
    } else {
        return 0;
    }
    const columnLoop = columnFace?.getOuterLoop();
    if (!columnFace || !columnLoop) {
        return undefined;
    }

    const activeDesign = app.getActiveDesign();
    const handrailInstance = activeDesign.makeGroup([columnFace], [], [])?.addedInstance;
    const handrailDefinition = handrailInstance?.getGroupDefinition();
    if (!handrailInstance || !handrailDefinition) {
        return undefined;
    }

    if (parentTransform) {
        const transformRes = activeDesign.transformGroupInstances([handrailInstance], parentTransform.inversed());
        if (!transformRes.isSuccess) {
            return undefined;
        }
    }

    const activateInstanceRes = await activeDesign.activateGroupInstance(handrailInstance);
    if (!activateInstanceRes.isSuccess) {
        return undefined;
    }

    const columnAuxiliaryBoundedCurve = activeDesign.addAuxiliaryBoundedCurve(GeomLib.createLineSegment3d(
        GeomLib.createPoint3d(0, 0, height),
        dummyPoint3d,
    ))?.addedCurve;
    if (!columnAuxiliaryBoundedCurve) {
        return undefined;
    }

    const sweepColumnRes = activeDesign.sweepFollowCurves(columnLoop, [columnAuxiliaryBoundedCurve]);
    if (!sweepColumnRes.isSuccess || !sweepColumnRes.addedShells.length) {
        return undefined;
    }

    const columnOriginFaces: KFace[] = [];
    for (const columnOriginShell of sweepColumnRes.addedShells) {
        const columnFaces = columnOriginShell.getFaces();
        columnOriginFaces.push(...columnFaces);
    }
    const columnOriginInstance = activeDesign.makeGroup(columnOriginFaces, [], [])?.addedInstance;
    if (!columnOriginInstance) {
        return undefined;
    }

    const columnMatrixes: KMatrix4[] = [];
    const railInstances: KGroupInstance[] = [];
    for (let j = 0; j < handrails.length; j++) {
        const { rail, columns } = handrails[j];

        // }
        // for (const { rail, columns } of handrails) {
        const railBoundedCurves: KAuxiliaryBoundedCurve[] = [];
        for (let i = 0; i < rail.length - 1; i++) {
            const railPoint = rail[i];
            const railNextPoint = rail[i + 1];
            railBoundedCurves.push();
            const addAuxRes = activeDesign.addAuxiliaryBoundedCurve(GeomLib.createLineSegment3d(railPoint, railNextPoint));
            if (addAuxRes?.addedCurve) {
                railBoundedCurves.push(addAuxRes.addedCurve);
            } else {
                return undefined;
            }
        }

        if (railBoundedCurves.length) {
            const railStartCurve = railBoundedCurves[0].getBoundedCurve();
            const railStartPoint = railStartCurve?.startPoint || dummyPoint3d;
            const railStartDir = railStartCurve?.endPoint.subtracted(railStartPoint).normalized().reversed() || DirectionZ;
            let railFace: KFace | undefined;
            if (railType === RailType.Circle) {
                railFace = drawCircle(railStartPoint, railStartDir, railParam.radius || DefaultStairParam.horizontalStep / 5);
            } else if (railType === RailType.Rect) {
                railFace = drawRect(railStartPoint, railStartDir, railParam.width || DefaultStairParam.horizontalStep / 5, railParam.height || DefaultStairParam.horizontalStep / 5);
            } else {
                return 0;
            }
            const railLoop = railFace?.getOuterLoop();
            if (!railFace || !railLoop) {
                return undefined;
            }

            const sweepRailRes = activeDesign.sweepFollowCurves(railLoop, railBoundedCurves);
            if (!sweepRailRes.isSuccess || !sweepRailRes.addedShells.length) {
                return undefined;
            }

            const railFaces: KFace[] = [];
            for (const railShell of sweepRailRes.addedShells) {
                const railShellFaces = railShell.getFaces();
                railFaces.push(...railShellFaces);
            }

            const railMakeGroupRes = activeDesign.makeGroup(railFaces, [], railBoundedCurves)
            const railGroupDef = railMakeGroupRes?.addedInstance.getGroupDefinition();
            if (!railMakeGroupRes?.addedInstance || !railGroupDef) {
                return undefined;
            }
            const railPropertyRes = railGroupDef.setCustomProperty(RailModelKey, ModelValue);
            if (!railPropertyRes.isSuccess) {
                return undefined;
            }
            railInstances.push(railMakeGroupRes.addedInstance);
        }

        for (const column of columns) {
            const columnScaleMat = GeomLib.createScaleMatrix4(1, 1, (column[1].z - column[0].z) / height);
            const columnTranslateMat = GeomLib.createTranslationMatrix4(column[0].x, column[0].y, column[0].z);
            columnMatrixes.push(columnTranslateMat.multiplied(columnScaleMat));
        }
    }
    if (railInstances.length) {
        const assignRailMaterialRes = activeDesign.assignMaterialForEntities(railInstances, PresetMaterials.Handrail.rail.materialId, PresetMaterials.Handrail.rail.bgId);
        if (!assignRailMaterialRes) {
            return undefined;
        }
    }

    const columnInstances: KGroupInstance[] = [];
    if (columnMatrixes.length) {
        const columnCopyRes = activeDesign.bulkCopyGroupInstances([columnOriginInstance], [columnMatrixes]);
        if (!columnCopyRes?.addedInstances.length) {
            return undefined;
        }

        columnInstances.push(...columnCopyRes.addedInstances);
        for (const columnInstance of columnCopyRes.addedInstances) {
            const columnGroupDef = columnInstance.getGroupDefinition();
            if (!columnGroupDef) {
                return undefined;
            }
            const columnPropertyRes = columnGroupDef.setCustomProperty(ColumnModelKey, ModelValue);
            if (!columnPropertyRes.isSuccess) {
                return undefined;
            }
        }

        const assignColumnMaterialRes = activeDesign.assignMaterialForEntities(columnCopyRes.addedInstances, PresetMaterials.Handrail.column.materialId, PresetMaterials.Handrail.column.bgId);
        if (!assignColumnMaterialRes) {
            return undefined;
        }
    }

    const removeOriginColumnRes = activeDesign.removeGroupInstance(columnOriginInstance);
    if (!removeOriginColumnRes.isSuccess) {
        return undefined;
    }

    const removeOriginColumnAuxCurveRes = activeDesign.removeAuxiliaryCurve(columnAuxiliaryBoundedCurve);
    if (!removeOriginColumnAuxCurveRes.isSuccess) {
        return undefined;
    }
    // to remove all auxiliaryCurves

    const deactivateInstanceRes = await activeDesign.deactivateGroupInstance();
    if (!deactivateInstanceRes.isSuccess) {
        return undefined;
    }

    const setPropertyRes = handrailDefinition.setCustomProperty(HandrailModelKey, ModelValue);
    if (!setPropertyRes.isSuccess) {
        return undefined;
    }
    return {
        handrailInstance: { instance: handrailInstance, instanceKey: handrailInstance.getKey(), definitionKey: handrailDefinition.getKey() },
        railInstances: railInstances.map(instance => ({ instance, instanceKey: instance.getKey(), definitionKey: instance.getGroupDefinition()?.getKey() || '' })),
        columnInstances: columnInstances.map(instance => ({ instance, instanceKey: instance.getKey(), definitionKey: instance.getGroupDefinition()?.getKey() || '' })),
    };
}

export function drawCircle(center: KPoint3d, normal: KVector3d, radius: number) {
    const activeDesign = app.getActiveDesign();
    const res = activeDesign.addCircle(GeomLib.createCircle3dByCenterNormalRadius(center, normal, radius));
    if (res?.addedEdges.length) {
        const shell = res.addedEdges[0].getShell();
        const faces = shell?.getFaces();
        if (faces?.length === 1) {
            return faces[0];
        }
    }
    return undefined;
}

export function drawRect(center: KPoint3d, normal: KVector3d, width: number, height: number, withCorner: boolean = true) {
    const point1 = GeomLib.createPoint3d(-width / 2, 0, 0);
    const point2 = GeomLib.createPoint3d(width / 2, 0, 0);
    let points: KPoint3d[] = [point1, point2];
    if (withCorner) {
        const p5 = GeomLib.createPoint3d(width / 2, height / 3 * 2, 0);
        const p6 = GeomLib.createPoint3d(width / 4, height, 0);
        const m1 = GeomLib.createPoint3d((p5.x + p6.x) / 2, (p5.y + p6.y) / 2, 0)
        const dir1 = p6.subtracted(p5).normalized();
        const toCenterDir1 = DirectionZ.cross(dir1);
        const d1 = p5.distanceTo(p6);
        // const r1 = d1 / 2 / Math.sin(Math.PI / 6);
        const h1 = d1 / 2 / Math.tan(Math.PI / 6);
        const center1 = m1.added(toCenterDir1.multiplied(h1));

        for (let i = 0; i < 11; i++) {
            const rotateMat = GeomLib.createRotateMatrix4(i * Math.PI / 30, DirectionZ, center1);
            const discretePoint = p5.appliedMatrix4(rotateMat);
            points.push(discretePoint);
        }

        const p7 = GeomLib.createPoint3d(-width / 4, height, 0);
        const p8 = GeomLib.createPoint3d(-width / 2, height / 3 * 2, 0);
        const m2 = GeomLib.createPoint3d((p7.x + p8.x) / 2, (p7.y + p8.y) / 2, 0);
        const dir2 = p8.subtracted(p7).normalized();
        const toCenterDir2 = DirectionZ.cross(dir2);
        const d2 = p7.distanceTo(p8);
        // const r2 = d2 / 2 / Math.sin(Math.PI / 6);
        const h2 = d2 / 2 / Math.tan(Math.PI / 6);
        const center2 = m2.added(toCenterDir2.multiplied(h2));

        for (let i = 0; i < 11; i++) {
            const rotateMat = GeomLib.createRotateMatrix4(i * Math.PI / 30, DirectionZ, center2);
            const discretePoint = p7.appliedMatrix4(rotateMat);
            points.push(discretePoint);
        }
    } else {
        const point3 = GeomLib.createPoint3d(width / 2, height, 0);
        const point4 = GeomLib.createPoint3d(-width / 2, height, 0);
        points.push(point3, point4);
    }

    const coordinate = getCoordinate(normal);
    const coordinateMat = GeomLib.createAlignCCSMatrix4(coordinate.dx, coordinate.dy, coordinate.dz, center);
    const translateMat1 = GeomLib.createTranslationMatrix4(0, -height / 2, 0);
    // const translateMat2 = GeomLib.createTranslationMatrix4(center.x, center.y, center.z);
    const transformMat = coordinateMat.multiplied(translateMat1);
    points = points.map(p => p.appliedMatrix4(transformMat));

    const activeDesign = app.getActiveDesign();
    const res = activeDesign.addEdges(points);
    if (res?.addedEdges.length) {
        const edgeVertices: Set<KVertex> = new Set();
        for (const addedEdge of res.addedEdges) {
            const va = addedEdge.getVertexA();
            const vb = addedEdge.getVertexB();
            if (va) {
                edgeVertices.add(va);
            }
            if (vb) {
                edgeVertices.add(vb);
            }
        }
        const setSoftResult = activeDesign.setVerticesSoft([...edgeVertices], true);
        if (setSoftResult.isSuccess) {
            const shell = res.addedEdges[0].getShell();
            const faces = shell?.getFaces();
            if (faces?.length === 1) {
                return faces[0];
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

export function buildSegmentRelations(segments: Segment[]) {
    for (const segment of segments) {
        const baseComponent = segment.baseComponent;
        const baseSegment = getSegmentByIndex(segments, baseComponent?.componentIndex);
        if (baseSegment && baseComponent?.line3dIndex !== undefined) {
            baseSegment.nextComponents[baseComponent.line3dIndex].add(segment.param.index);
        }
    }
}

export function getNextComponents(segment: Segment, segments: Segment[]) {
    const { nextComponents } = segment;

    const nextSegments: Segment[] = [];
    for (const nextComponentIndexes of nextComponents) {
        for (const nextComponentIndex of nextComponentIndexes) {
            const nextSegment = getSegmentByIndex(segments, nextComponentIndex);
            if (nextSegment) {
                nextSegments.push(nextSegment);
            }
        }
    }
    return nextSegments;
}

export function changeStairUpward(startSegment: Segment, segments: Segment[], upward: boolean, bulkChange: boolean, onlyStart: boolean = false) {
    if (segments.length) {
        let current: { segment: Segment, verticalDelta: number }[] = [{ segment: startSegment, verticalDelta: 0 }];
        const unVisited: Set<Segment> = new Set(segments);
        const changedSegments: Set<Segment> = new Set();
        while (current.length) {
            let next: { segment: Segment, verticalDelta: number }[] = [];
            for (const { segment, verticalDelta } of current) {
                const { startHeight, endHeight } = segment;
                const upwardFlag = onlyStart ? segment.param.upward : upward;
                const endDelta = segment.param.type === ComponentType.Platform ? 0 : Math.abs(endHeight - startHeight) * (upwardFlag ? 1 : -1);
                segment.startHeight = verticalDelta;
                segment.endHeight = segment.startHeight + endDelta;
                if (!onlyStart) {
                    segment.param.upward = upward;
                }
                unVisited.delete(segment);

                const nextSegments = getNextComponents(segment, segments);
                if (nextSegments.length) {
                    next.push(...nextSegments.map(seg => ({ segment: seg, verticalDelta: segment.endHeight })));
                }
                changedSegments.add(segment);
            }
            current = next;

            if (!current.length) {
                if (bulkChange && unVisited.size) {
                    const theSegment = [...unVisited.values()][0];
                    current = [{ segment: theSegment, verticalDelta: theSegment.startHeight > 0 === upward ? 0 : (theSegment.startHeight * - 2) }];
                }
            }
        }

        return [...changedSegments];
    }
}