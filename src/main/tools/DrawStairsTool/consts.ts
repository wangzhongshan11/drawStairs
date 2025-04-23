import { ComponentDirectionType, ComponentParam, ComponentType, DefaultComponentParam, DefaultStairParam, PresetMaterials, Segment } from "./types";

export const dummyMatrix4 = GeomLib.createIdentityMatrix4();
export const dummyVector3d = GeomLib.createVector3d(0, 0, 0);
export const dummyPoint3d = GeomLib.createPoint3d(0, 0, 0);
export const DirectionX = GeomLib.createVector3d(1, 0, 0);
export const DirectionY = GeomLib.createVector3d(0, 1, 0);
export const DirectionZ = GeomLib.createVector3d(0, 0, 1);

// const HeightTolerance: number = 5;
export const LengthTolerance: number = 2;
export const DirectionAngleTolerance = Math.PI / 36;
export const AngleTolerance = Math.PI / 180 / 5;
export const StepCountLimit = 100;
// const DefaultBoardThickness = 50;

export const TempLineColors = {
    Stair: { r: 0, g: 0, b: 255 },
    Mold: { r: 13, g: 71, b: 161 },
    Handrail: { r: 0, g: 0, b: 0 },
    Inference: { r: 0, g: 0, b: 0 },
    Focus: { r: 255, g: 0, b: 0 },
}
export const TempLinePatterns = {
    Handrail: KLinePattern.Dash,
    StairAndMold: KLinePattern.Solid,
    Inference: KLinePattern.Dash,
}

export const CacheSettings = {
    stairType: ComponentType.StraightStair,
}

export function getNewComponentParam(type: ComponentType, baseSegment?: Segment, upward?: boolean): ComponentParam {
    let startWidth = DefaultStairParam.startWidth * (type === ComponentType.Platform ? 3 : 1);
    let endWidth = DefaultStairParam.endWidth * (type === ComponentType.Platform ? 3 : 1);
    if (baseSegment) {
        const { param: { endWidth: baseSegmentEndWidth, type: baseSegmentType } } = baseSegment;
        if (type === ComponentType.Platform) {
            if (baseSegmentType === ComponentType.Platform) {
                startWidth = baseSegmentEndWidth;
                endWidth = baseSegmentEndWidth;
            } else {
                startWidth = 3 * baseSegmentEndWidth;
                endWidth = 3 * baseSegmentEndWidth;
            }
        } else {
            if (baseSegmentType !== ComponentType.Platform) {
                startWidth = baseSegmentEndWidth;
                endWidth = baseSegmentEndWidth;
            }
        }
    }
    return {
        ...DefaultComponentParam,
        index: baseSegment ? baseSegment.param.index + 1 : 0,
        type,
        startWidth,
        endWidth,
        upward: upward === undefined ? DefaultComponentParam.upward : upward,
        offsetWidth: 0,
        withOffset: false,
        platformLengthLocked: false,
    };
}

export function getNewSegment(type: ComponentType, baseSegment?: Segment, upward?: boolean): Segment {
    const param = getNewComponentParam(type, baseSegment, upward);
    param.material = type === ComponentType.Platform ? PresetMaterials.Platform : PresetMaterials.Stair;
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
        nextComponents: Array.from({ length: 6 }, _ => new Set()),
        param,
        componentDirectionType: ComponentDirectionType.Front,
    }
}