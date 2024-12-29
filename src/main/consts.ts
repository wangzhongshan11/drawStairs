import { DefaultComponentParam } from "./types";

export const dummyMatrix4 = GeomLib.createIdentityMatrix4();
export const dummyVector3d = GeomLib.createVector3d(0, 0, 1);
export const dummyPoint3d = GeomLib.createPoint3d(0, 0, 0);


export const FirstSegment = {
    start: dummyPoint3d,
    end: dummyPoint3d,
    startLocked: true,
    endLocked: false,
    startHeight: 0,
    endHeight: 0,
    stairShape: {
        vertices: [],
        tempLines: [],
    },
    moldShape: {
        vertices: [],
        tempLines: [],
    },
    param: DefaultComponentParam,
}