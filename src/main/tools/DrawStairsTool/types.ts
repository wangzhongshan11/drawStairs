
export const StairModelKey = 'DrawStairsModel';
export const StairModelValue = '1';
// export const StairKey = 'DSStair';
// export const PlatformKey = 'DSPlatform';
export const ParamKey = 'DSParam';
// startHeight and endHeight cached in start and end
export const ComponentIndexKey = 'Ind';
export const StartEndKey = 'SToE';
export const BaseLineSeg3dKey = 'BaseLine';

export const Delimiter = '&';
export const CoordDelimiter = ',';

export enum ComponentParamType {
    HorizontalStep = "horizontalStep",
    VerticalStep = "verticalStep",
    StartWidth = "startWidth",
    EndWidth = "endWidth",
    StepProportional = 'stepProportional',
    WidthProportional = 'widthProportional',
    PlatformLength = 'platformLength',
    PlatformLengthLocked = 'platformLengthLocked',
    Type = "type",
    Upward = "upward",
    PlatformThickness = "platformThickness",
}

// interface ParamSettings {
//     min: number;
//     max: number;
//     step: number;
//     unit: string;
//     precision: number;
// }

export enum ComponentType {
    StraightStair = 0,
    CircularStair = 1,
    Platform = 2,
}

export const ComponentParamSettings = {
    horizontalStep: {
        title: "步长",
        min: 1,
        max: 100000,
        step: 10,
        unit: '长',
        precision: 0,
    },
    verticalStep: {
        title: "步长",
        min: 1,
        max: 100000,
        step: 10,
        unit: '高',
        precision: 0,
    },
    startWidth: {
        title: "宽度",
        min: 1,
        max: 100000,
        step: 50,
        unit: '起',
        precision: 0,
    },
    endWidth: {
        title: "宽度",
        min: 1,
        max: 100000,
        step: 50,
        unit: '终',
        precision: 0,
    },
    platformLength: {
        title: "长度",
        min: 100,
        max: 100000,
        step: 50,
        unit: '',
        precision: 0,
    },
    type: {
        // radioValues: [ComponentType.StraightStair, ComponentType.CircularStair, ComponentType.Platform],
        // texts: ["直阶", "旋转阶梯", "平台"],
        title: "类型",
        radioOptions: [
            { value: ComponentType.StraightStair, text: "直阶" },
            { value: ComponentType.CircularStair, text: "旋转阶梯" },
            { value: ComponentType.Platform, text: "平台" },
        ]
    },
    upward: {
        // radioValues: [1, 0],
        // texts: ["向上", "向下"],
        title: "方向",
        radioOptions: [
            { value: true, text: "向上" },
            { value: false, text: "向下" },
        ]
    },
    platformThickness: {
        title: "厚度",
        min: 1,
        max: 100000,
        step: 10,
        unit: '',
        precision: 0,
    },
}

export function getComponentTitle(componentType: ComponentType) {
    if (componentType === ComponentType.StraightStair) {
        return '直';
    } else if (componentType === ComponentType.CircularStair) {
        return '旋';
    } else {
        return '台';
    }
}

export interface ComponentParam {
    index: number;
    horizontalStep: number;
    verticalStep: number;
    startWidth: number;
    endWidth: number;
    // left is true
    offsetWidth: number;
    platformLength: number;
    type: ComponentType;
    upward: boolean;
    platformThickness: number;

    stepProportional?: boolean;
    widthProportional?: boolean;
    platformLengthLocked?: boolean;


    // stepType: StepType;
    // cornerType: CornerType;
    // sideBoard?: boolean;
    // handrail?: HandrailParam;
}

export const DefaultComponentParam: ComponentParam = {
    index: 0,
    horizontalStep: 500,
    verticalStep: 200,
    startWidth: 1000,
    endWidth: 1000,
    offsetWidth: 0,
    platformLength: 2000,
    type: ComponentType.StraightStair,
    upward: true,
    platformThickness: 200,

    stepProportional: true,
    widthProportional: true,
    platformLengthLocked: false,
    // stepType: StepType.Normal,
    // cornerType: CornerType.Rectangle,
}

export interface Shape {
    stepCount: number;
    vertices: KPoint3d[];
    // [[1, 2], [2, 3]]
    tempLines: number[][];
}
export interface Segment {
    start: KPoint3d;
    end: KPoint3d;
    startHeight: number;
    endHeight: number;
    // anti clockwise
    baseLineSeg3d?: { start: KPoint3d, end: KPoint3d };
    param: ComponentParam;

    // leftCorner?: KPoint3d;
    // rightCorner?: KPoint3d;
    startLocked: boolean;
    endLocked: boolean;

    stairShape: Shape;
    moldShape: Shape;
    cornerShape: Shape;
    cornerMoldShape: Shape;

    tempShapeId?: string[];
    pickStartTempShapeId?: string;

    mesh?: KMesh;
}

// export enum StairType {
//     Straight = 0,
//     Circular = 1,
// }
// export interface PlatformParam {
//     startWidth: number;
//     endWidth: number;
//     // length: number;
// }

// export const DefaultPlatformParam: PlatformParam = {
//     startWidth: 1000,
//     endWidth: 1000,
//     // length: 1000,
// }
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