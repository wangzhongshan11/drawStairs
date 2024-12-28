
export const ComponentPropertyKey = 'PAComponent';

export const IntervalPropertyKey = 'PAInterval';
export const CountPropertyKey = 'PACount';
export const PathAxisPropertyKey = 'PAPathAxis';
export const NormalAxisPropertyKey = 'PANormalAxis';
export const ScalePropertyKey = 'PAScale';
export const PathListPropertyKey = 'PAPathList';
export const PathReversedDelimiter = '-';
export const PathDelimiter = '&';
export const ManualPrefix = 'm';

export enum StairType {
    Straight = 0,
    Circular = 1,
}

// export enum StepType {
//     Normal = 0,
//     Open = 1,
//     Grounding = 2,
// }

// export enum CornerType {
//     None = 0,
//     Rectangle = 1,
//     Arc = 2,
// }

// export interface HandrailParam {
//     height: number;
//     railRadius: number;
//     railSegment: number;
//     pillarRadius: number;
//     pillarSegment: number;
// }

export interface ComponentParam {
    startWidth: number;
    endWidth: number;
    tempWidth: number;
    platformThickness: number;
    type: StairType;
    horizontalStep: number;
    verticalStep: number;
    upward: boolean;
    
    // stepType: StepType;
    // cornerType: CornerType;
    // sideBoard?: boolean;
    // handrail?: HandrailParam;
}

export interface PlatformParam {
    startWidth: number;
    endWidth: number;
    // length: number;
}

export const DefaultComponentParam: ComponentParam = {
    startWidth: 1000,
    endWidth: 1000,
    tempWidth: 1000,
    platformThickness: 50,
    type: StairType.Straight,
    horizontalStep: 500,
    verticalStep: 100,
    upward: true,
    // stepType: StepType.Normal,
    // cornerType: CornerType.Rectangle,
}

export const DefaultPlatformParam: PlatformParam = {
    startWidth: 1000,
    endWidth: 1000,
    // length: 1000,
}

// export const DefaultHandrailParam: HandrailParam = {
//     height: 200,
//     railRadius: 20,
//     railSegment: 6,
//     pillarRadius: 20,
//     pillarSegment: 6,
// }

// export type PointLike = KPoint3d;
// {
//     x: number;
//     y: number;
//     z: number;
// }

export interface Shape {
    vertices: KPoint3d[];
    // [[1, 2], [2, 3]]
    tempLines: number[][];
}

// export interface PartShape {
//     // 每种stepType不同的vertices排列
//     main: Shape,
//     // stair和corner部分vertices排列不同
//     sideBoard: Shape,
//     handrail: {
//         rails: {
//             segment: number;
//             // 内外两条
//             cylinders: Shape[],
//         },
//         pillars: {
//             segment: number,
//             // 很多条
//             cylinders: Shape[],
//         }
//     }
// }

// export interface StairShape {
//     stair: { stepCount: number; shape: PartShape },
//     corner: PartShape,
// }

export enum ComponentType {
    Stair = 0,
    Platform = 1,
}

export interface Segment {
    type: ComponentType;
    start: KPoint3d;
    end: KPoint3d;
    leftCorner?: KPoint3d;
    rightCorner?: KPoint3d;
    startLocked: boolean;
    endLocked: boolean;
    startHeight: number;
    stairShape: Shape;
    moldShape: Shape;
    param: ComponentParam;

    tempShapeId?: string[];
}

export const enum Axis {
    X = 'X',
    XMinus = '-X',
    Y = 'Y',
    YMinus = '-Y',
    Z = 'Z',
    ZMinus = '-Z',
}

export function isAxisValid(axis: string) {
    return axis === Axis.X || axis === Axis.XMinus || axis === Axis.Y || axis === Axis.YMinus || axis === Axis.Z || axis === Axis.ZMinus;
}


export const dummyMatrix4 = GeomLib.createIdentityMatrix4();
export const dummyVector3d = GeomLib.createVector3d(0, 0, 1);
export const dummyPoint3d = GeomLib.createPoint3d(0, 0, 0);