import { ComponentType, Segment } from "./types";

export function generateMeshes(segments: Segment[]): KMesh[] {
    const meshes: KMesh[] = [];
    for (const segment of segments) {
        if (segment.param.type === ComponentType.Platform) {
            generatePlatformMesh(segment);
        } else {
            generateStairMesh(segment);
        }
        if (segment.mesh) {
            meshes.push(segment.mesh);
        }
    }

    return meshes;
}

function generateStairMesh(segment: Segment) {
    const { startLocked, stairShape: { vertices, stepCount }, cornerShape: { vertices: cornerVertices }, param: { upward } } = segment;

    if (stepCount < 1 || !startLocked) return undefined;

    const stairMesh: KMesh = {
        vertices: vertices.map(vertex => [vertex.x, vertex.y, vertex.z]),
        triangleIndices: [],
        softEdges: [],
    }

    const lastLeftIndex = vertices.length - 2;
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
        );

        if (i === stepCount - 1 && upward && stepCount > 1) {
            stairMesh.triangleIndices.push(
                // tail side faces
                [lastLeftIndex, i * 4, (i + 1) * 4],
                [lastLeftIndex + 1, (i + 1) * 4 + 1, i * 4 + 1],
            );
            stairMesh.softEdges?.push(
                [lastLeftIndex, i * 4],
                [i * 4, (i + 1) * 4],

                [lastLeftIndex + 1, i * 4 + 1],
                [(i + 1) * 4 + 1, i * 4 + 1],
            );
        } else {
            stairMesh.triangleIndices.push(
                // side faces
                [leftIndex, i * 4, (i + 1) * 4],
                [leftIndex + 1, (i + 1) * 4 + 1, i * 4 + 1],
            );
            stairMesh.softEdges?.push(
                [i * 4, (i + 1) * 4],
                [(i + 1) * 4 + 1, i * 4 + 1],
            );
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
    const vertexLength = vertices.length / 2;
    if (vertexLength === 4 || vertexLength === 5) {
        const platformMesh: KMesh = {
            vertices: vertices.map(vertex => [vertex.x, vertex.y, vertex.z]),
            triangleIndices: [],
            softEdges: [],
        }
        generatePolygonMesh(vertices, platformMesh);
        segment.mesh = platformMesh;
    }

    return undefined;
}

function generatePolygonMesh(vertices: KPoint3d[], mesh: KMesh) {
    const vertexLength = mesh.vertices.length;
    mesh.vertices.push(...vertices.map(vertex => [vertex.x, vertex.y, vertex.z]))
    const segCount = vertices.length / 2;

    for (let i = 0; i < segCount; i++) {
        const right = i === segCount - 1 ? 0 : i + 1;
        const bottomRight = i === segCount - 1 ? segCount : i + segCount + 1;
        mesh.vertices.push(
            [i + vertexLength, i + segCount + vertexLength, bottomRight + vertexLength],
            [i + vertexLength, bottomRight + vertexLength, right + vertexLength],
        );
        mesh.softEdges?.push(
            [i + vertexLength, bottomRight + vertexLength],
        );
        if (i > 0 && i < segCount - 1) {
            mesh.vertices.push(
                [i + vertexLength, right + vertexLength, 0 + vertexLength],
                [bottomRight + vertexLength, i + vertexLength, segCount + vertexLength],
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