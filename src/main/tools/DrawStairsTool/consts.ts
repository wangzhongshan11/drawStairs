import { DefaultComponentParam, Segment } from "./types";

export const dummyMatrix4 = GeomLib.createIdentityMatrix4();
export const dummyVector3d = GeomLib.createVector3d(0, 0, 1);
export const dummyPoint3d = GeomLib.createPoint3d(0, 0, 0);
export const DirectionZ = GeomLib.createVector3d(0, 0, 1);

// const HeightTolerance: number = 5;
export const LengthTolerance: number = 1;
export const AngleTolerance = Math.PI / 36;
// const DefaultBoardThickness = 50;

export function getEmptySegment(): Segment {
    return {
        start: dummyPoint3d,
        end: dummyPoint3d,
        startLocked: false,
        endLocked: false,
        startHeight: 0,
        endHeight: 0,
        stairShape: {
            stepCount: 0,
            vertices: [],
            tempLines: [],
        },
        moldShape: {
            stepCount: 0,
            vertices: [],
            tempLines: [],
        },
        cornerShape: {
            stepCount: 0,
            vertices: [],
            tempLines: [],
        },
        cornerMoldShape: {
            stepCount: 0,
            vertices: [],
            tempLines: [],
        },
        param: {...DefaultComponentParam},
    }
}