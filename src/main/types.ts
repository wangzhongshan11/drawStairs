
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

export enum StepType {
    Normal = 0,
    Open = 1,
    Grounding = 2,
}

export enum CornerType {
    None = 0,
    Rectangle = 1,
    Arc = 2,
}

export interface HandrailParam {
    height: number;
    railRadius: number;
    railSegment: number;
    pillarRadius: number;
    pillarSegment: number;
}

export interface StairParam {
    width: number;
    type: StairType;
    step: number;
    stepType: StepType;
    cornerType: CornerType;
    sideBoard?: boolean;
    handrail?: HandrailParam;
}

export const DefaultStairParam: StairParam = {
    width: 1000,
    type: StairType.Straight,
    step: 50,
    stepType: StepType.Normal,
    cornerType: CornerType.Rectangle,
}

export const DefaultHandrailParam: HandrailParam = {
    height: 200,
    railRadius: 20,
    railSegment: 6,
    pillarRadius: 20,
    pillarSegment: 6,
}

export type PointLike = KPoint3d;
// {
//     x: number;
//     y: number;
//     z: number;
// }

export interface Shape {
    vertices: PointLike[];
    // [[1, 2], [2, 3]]
    tempLines: number[][];
}

export interface PartShape {
    // 每种stepType不同的vertices排列
    main: Shape,
    // stair和corner部分vertices排列不同
    sideBoard: Shape,
    handrail: {
        rails: {
            segment: number;
            // 内外两条
            cylinders: Shape[],
        },
        pillars: {
            segment: number,
            // 很多条
            cylinders: Shape[],
        }
    }
}

export interface StairShape {
    stair: { stepCount: number; shape: PartShape},
    corner: PartShape,
}

export interface StairSegment {
    start: KPoint3d;
    end: KPoint3d;
    stairShape: StairShape;
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

type PropertyItem = {
    value: number;
    min: number;
    max: number;
}

export type PathArrayParams = {
    interval: PropertyItem;
    intervalLocked?: boolean;
    count: PropertyItem;
    pathAxis: Axis;
    normalAxis: Axis;
    scale: PropertyItem;
    scaleLocked?: boolean;
}

export type PathObject = { curve: KAuxiliaryBoundedCurve, reversed: boolean };
export type PathPointPose = { point: KPoint3d, direction: KVector3d, normal?: KVector3d, accumulateLength: number };

export const DefaultPathArrayParams: PathArrayParams = {
    interval: { value: 1000, min: 10, max: 9999999 },
    count: { value: 5, min: 1, max: 100 },
    pathAxis: Axis.X,
    normalAxis: Axis.Z,
    scale: { value: 1, min: 0.01, max: 1000 },
}

export const dummyMatrix4 = GeomLib.createIdentityMatrix4();
export const dummyVector3d = GeomLib.createVector3d(0, 0, 1);
export const dummyPoint3d = GeomLib.createPoint3d(0, 0, 0);