export const StairModelKey = 'DSModel';
export const ModelValue = '1';
export const HandrailModelKey = 'Handrail';
export const RailModelKey = 'Rail';
export const ColumnModelKey = 'Column';
// export const StairKey = 'DSStair';
// export const PlatformKey = 'DSPlatform';
export const StairParamKey = 'SParam';
export const ComponentParamKey = 'CParam';
export const StairMaterialKey = 'SMat';
export const PlatformMaterialKey = 'PMat';
export const RailMaterialKey = 'HRMat';
export const ColumnMaterialKey = 'HCMat';
export const ComponentMaterialKey = 'CMat';

// startHeight and endHeight cached in start and end
export const ComponentIndexKey = 'Ind';
export const StartEndKey = 'SToE';
export const BaseLineSeg3dKey = 'BaseLine';
export const BaseComponentKey = 'BaseComponent';
export const CircleTangentKey = 'CircleTangent';

export const Delimiter = '&';
export const CoordDelimiter = ',';
export const BaseLine3dDelimiter = '_';

const ProdMaterials = {
    Stair: { bgId: '3FO4LHERBPPY', materialId: '5972e993aa01f3585f51decb' },
    // Stair: { bgId: '3FO4ATKECLKI', materialId: '6168f454cdd25e00017d75d0' },
    Platform: { bgId: '3FO44T7MYFA5', materialId: '64562afd6fbc3b0001a3251c' },
    Handrail: {
        rail: { bgId: '3FO4LHERE7NP', materialId: '5972e8d7aa01f3585f51de97' },
        column: { bgId: '3FO4LHERE7NP', materialId: '5972e8d7aa01f3585f51de97' },
    },
}
export const PresetMaterials = ProdMaterials;


// const DevMaterials = {
//     Stair: { bgId: '3FO4H2D73JFO', materialId: '58af961b4a4d2c4f8aa2b1da' },
//     // Stair: { bgId: '3FO4ATKECLKI', materialId: '6168f454cdd25e00017d75d0' },
//     Platform: { bgId: '3FO4H2D6CQMY', materialId: '5816fef985da566a1b28a944' },
//     Handrail: {
//         rail: { bgId: '3FO4H2D6H8SB', materialId: '58afb3ab5c26a073b389a95f' },
//         column: { bgId: '3FO4GDK5EXDC', materialId: '5e532fb42014020001cc4889' },
//     },
// }
// export const PresetMaterials = ((window as any).origin || '').includes('sit') ? DevMaterials : ProdMaterials;

export enum ComponentParamType {
    HorizontalStep = "horizontalStep",
    VerticalStep = "verticalStep",
    StartWidth = "startWidth",
    EndWidth = "endWidth",
    Upward = "upward",
    PlatformThickness = "platformThickness",
    ComponentMaterial = 'material',
    Type = "type",
    PlatformLength = 'platformLength',

    StepProportional = 'stepProportional',
    WidthProportional = 'widthProportional',
    PlatformLengthLocked = 'platformLengthLocked',

    StairMaterial = 'stairMaterial', //整体
    PlatformMaterial = 'platformMaterial', //整体

    Handrail = "handrail",
    HandrailHeight = "handrailHeight",
    HandrailRailType = "handrailRailType",
    HandrailRailRadius = "handrailRailRadius",
    HandrailRailWidth = "handrailRailWidth",
    HandrailRailHeight = "handrailRailHeight",
    HandrailRailMaterial = "RailMaterial",
    HandrailColumnType = "handrailColumnType",
    HandrailColumnStep = "handrailColumnStep",
    HandrailColumnRadius = "handrailColumnRadius",
    HandrailColumnWidth = "handrailColumnWidth",
    HandrailColumnHeight = "handrailColumnHeight",
    HandrailColumnMaterial = "ColumnMaterial",
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

export enum RailType {
    Circle = 0,
    Rect = 1,
    Custom = 99,
}

export enum ColumnType {
    Circle = 0,
    Rect = 1,
    Custom = 99,
}

export interface HandrailComponentParam {
    radius?: number;
    width?: number;
    height?: number;
    cornerRadius?: number;
}

export const ComponentParamSettings = {
    horizontalStep: { title: "步长", min: 1, max: 100000, step: 20, unit: '长', precision: 0, },
    verticalStep: { title: "步长", min: 1, max: 100000, step: 20, unit: '高', precision: 0, },
    startWidth: { title: "宽度", min: 1, max: 100000, step: 50, unit: '起', precision: 0, },
    endWidth: { title: "宽度", min: 1, max: 100000, step: 50, unit: '终', precision: 0, },
    platformLength: { title: "长度", min: 100, max: 100000, step: 50, unit: '', precision: 0, },
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
    platformThickness: { title: "厚度", min: 1, max: 100000, step: 10, unit: '', precision: 0, },
    material: { title: '材质'},
    stairMaterial: { title: '阶梯材质'},
    platformMaterial: { title: '平台材质'},
    handrail: {
        title: '启用栏杆',
        height: { title: "高度", min: 1, max: 100000, step: 10, unit: '', precision: 0, },
        rail: {
            type: {
                title: "样式",
                selectOptions: [
                    { value: RailType.Circle, label: "圆形" },
                    { value: RailType.Rect, label: "方形" },
                    // { value: RailType.Custom, label: "拾取" },
                ]
            },
        },
        column: {
            type: {
                title: "样式",
                selectOptions: [
                    { value: ColumnType.Circle, label: "圆形" },
                    { value: ColumnType.Rect, label: "方形" },
                    // { value: ColumnType.Custom, label: "拾取" },
                ]
            },
            step: { title: "间隔", min: 1, max: 100000, step: 10, unit: '', precision: 0, },
        },
        componentParam: {
            radius: { title: "半径", min: 1, max: 100000, step: 1, unit: '', precision: 0, },
            width: { title: "宽度", min: 1, max: 100000, step: 1, unit: '', precision: 0, },
            height: { title: "高度", min: 1, max: 100000, step: 1, unit: '', precision: 0, },
        }
    }
}

export enum MaterialAssignType {
    StairOverall = 'stairOverall',
    PlatformOverall = 'platformOverall',
    Rail = 'rail',
    Column = 'column',
}

export function getComponentTitle(componentType: ComponentType) {
    if (componentType === ComponentType.StraightStair) {
        return '阶';
    } else if (componentType === ComponentType.CircularStair) {
        return '阶';
    } else {
        return '台';
    }
}

export interface MaterialType {
    materialId?: string;
    bgid?: string;
    imgUrl?: string;
}

export interface StairParam {
    horizontalStep: number;
    verticalStep: number;
    startWidth: number;
    endWidth: number;
    upward: boolean;
    platformThickness: number;
    stairMaterial?: MaterialType;
    platformMaterial?: MaterialType;
    handrail: {
        support: boolean;
        height: number;
        rail: {
            type: RailType;
            param: HandrailComponentParam;
            material?: MaterialType;
        },
        column: {
            step: number;
            type: ColumnType;
            param: HandrailComponentParam;
            material?: MaterialType;
        }
    }
    stepProportional?: boolean,
    widthProportional?: boolean,
}

export interface ComponentParam {
    index: number;
    horizontalStep: number;
    verticalStep: number;
    startWidth: number;
    endWidth: number;
    // left is positive
    offsetWidth: number;
    withOffset: boolean;
    platformLength: number;
    type: ComponentType;
    upward: boolean;
    platformThickness: number;
    material?: MaterialType;

    stepProportional?: boolean;
    widthProportional?: boolean;
    platformLengthLocked?: boolean;
    modelEditing?: boolean;

    // stepType: StepType;
    // cornerType: CornerType;
    // sideBoard?: boolean;
    // handrail?: HandrailParam;
}

export const HandrailDefaultOffsetLength = 40;

export const DefaultStairParam: StairParam = {
    horizontalStep: 200,
    verticalStep: 200,
    startWidth: 1000,
    endWidth: 1000,
    upward: true,
    platformThickness: 100,
    stairMaterial: PresetMaterials.Stair,
    platformMaterial: PresetMaterials.Platform,
    handrail: {
        support: true,
        height: 400,
        rail: {
            type: RailType.Circle,
            param: { radius: 16, width: 40, height: 30, },
            material: PresetMaterials.Handrail.rail,
        },
        column: {
            type: ColumnType.Circle,
            step: 500,
            param: { radius: 8, width: 12, height: 12, },
            material: PresetMaterials.Handrail.column,
        },
    },

    stepProportional: true,
    widthProportional: true,
}

export function getDefaultStairParam(): StairParam {
    return {
        horizontalStep: 250,
        verticalStep: 250,
        startWidth: 1000,
        endWidth: 1000,
        upward: true,
        platformThickness: 200,
        stairMaterial: PresetMaterials.Stair,
        platformMaterial: PresetMaterials.Platform,
        handrail: {
            support: true,
            height: 500,
            rail: {
                type: RailType.Circle,
                param: { radius: 20, width: 60, height: 30, },
                material: PresetMaterials.Handrail.rail,
            },
            column: {
                type: ColumnType.Circle,
                step: 500,
                param: { radius: 8, width: 16, height: 16, },
                material: PresetMaterials.Handrail.column,
            },
        },

        stepProportional: true,
        widthProportional: true,
    }
}

export const DefaultComponentParam: ComponentParam = {
    index: 0,
    horizontalStep: DefaultStairParam.horizontalStep,
    verticalStep: DefaultStairParam.verticalStep,
    startWidth: DefaultStairParam.startWidth,
    endWidth: DefaultStairParam.endWidth,
    offsetWidth: 0,
    withOffset: false,
    platformLength: 2000,
    type: ComponentType.StraightStair,
    upward: DefaultStairParam.upward,
    platformThickness: DefaultStairParam.platformThickness,

    stepProportional: DefaultStairParam.stepProportional,
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

export enum ComponentDirectionType {
    Front = 0,
    RightFront = 1,
    Right = 2,
    Left = 3,
    LeftFront = 4,
}

export enum CircularSide {
    Left = 0,
    Right = 1,
}

export interface Segment {
    start: KPoint3d;
    end: KPoint3d;
    startHeight: number;
    endHeight: number;
    // anti clockwise
    // baseLineSeg3d?: { start: KPoint3d, end: KPoint3d };
    circleTangent?: KVector3d;
    param: ComponentParam;
    baseComponent?: { componentIndex?: number, line3dIndex?: number, line3d: { start: KPoint3d, end: KPoint3d } };
    nextComponents: Set<number>[];

    // leftCorner?: KPoint3d;
    // rightCorner?: KPoint3d;
    startLocked: boolean;
    endLocked: boolean;

    stairShape: Shape;
    moldShape: Shape;
    cornerShape: Shape;
    cornerMoldShape: Shape;
    componentDirectionType: ComponentDirectionType;
    // without side should be degrade to straight stair
    circularSide?: CircularSide;

    tempShapeId?: string[];
    pickStartTempShapeId?: string;

    mesh?: KMesh;
}

export type EditModel = {
    parent: InstanceData;
    // child: Map<number, InstanceData>;
    stairs: Map<number, InstanceData>;
    platforms: Map<number, InstanceData>;
    handrail?: HandrailInstancesData;
}

export type InstanceData = {
    instance: KGroupInstance;
    definitionKey: string;
    instanceKey: string;
}

export type HandrailInstancesData = {
    handrailInstance: InstanceData,
    railInstances: InstanceData[],
    columnInstances: InstanceData[],
}
export interface Handrail {
    rail: KPoint3d[];
    columns: KPoint3d[][];
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