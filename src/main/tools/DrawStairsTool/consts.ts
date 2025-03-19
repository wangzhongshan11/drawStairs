import { ComponentDirectionType, ComponentParam, ComponentType, DefaultComponentParam, DefaultStairParam, Segment } from "./types";

export const dummyMatrix4 = GeomLib.createIdentityMatrix4();
export const dummyVector3d = GeomLib.createVector3d(0, 0, 1);
export const dummyPoint3d = GeomLib.createPoint3d(0, 0, 0);
export const DirectionX = GeomLib.createVector3d(1, 0, 0);
export const DirectionY = GeomLib.createVector3d(0, 1, 0);
export const DirectionZ = GeomLib.createVector3d(0, 0, 1);

// const HeightTolerance: number = 5;
export const LengthTolerance: number = 10;
export const DirectionAngleTolerance = Math.PI / 36;
export const AngleTolerance = Math.PI / 180;
export const StepCountLimit = 80;
// const DefaultBoardThickness = 50;

const ProdMaterials = {
    Stair: { bgId: '3FO4LHERBPPY', materialId: '5972e993aa01f3585f51decb' },
    // Stair: { bgId: '3FO4ATKECLKI', materialId: '6168f454cdd25e00017d75d0' },
    Platform: { bgId: '3FO44T7MYFA5', materialId: '64562afd6fbc3b0001a3251c' },
    Handrail: {
        rail: { bgId: '3FO4LHERE7NP', materialId: '5972e8d7aa01f3585f51de97' },
        column: { bgId: '3FO4LHERE7NP', materialId: '5972e8d7aa01f3585f51de97' },
    },
}

const DevMaterials = {
    Stair: { bgId: '3FO4H2D73JFO', materialId: '58af961b4a4d2c4f8aa2b1da' },
    // Stair: { bgId: '3FO4ATKECLKI', materialId: '6168f454cdd25e00017d75d0' },
    Platform: { bgId: '3FO4H2D6CQMY', materialId: '5816fef985da566a1b28a944' },
    Handrail: {
        rail: { bgId: '3FO4H2D6H8SB', materialId: '58afb3ab5c26a073b389a95f' },
        column: { bgId: '3FO4GDK5EXDC', materialId: '5e532fb42014020001cc4889' },
    },
}

export const PresetMaterials = ((window as any).origin || '').includes('sit') ? DevMaterials : ProdMaterials

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

export function getNewComponentParam(type: ComponentType, baseSegment?: Segment): ComponentParam {
    let startWidth = DefaultStairParam.startWidth;
    let endWidth = DefaultStairParam.endWidth;
    if (baseSegment) {
        const { param: { endWidth: baseSegmentEndWidth, type: baseSegmentType } } = baseSegment;
        if (type === ComponentType.Platform) {
            if (baseSegmentType === ComponentType.Platform) {
                startWidth = baseSegmentEndWidth;
                endWidth = baseSegmentEndWidth;
            } else {
                startWidth = 2 * baseSegmentEndWidth;
                endWidth = 2 * baseSegmentEndWidth;
            }
        } else {
            if (baseSegmentType !== ComponentType.Platform) {
                startWidth = baseSegmentEndWidth;
                endWidth = baseSegmentEndWidth;
            }
        }
    }
    return { ...DefaultComponentParam, index: baseSegment ? baseSegment.param.index + 1 : 0, offsetWidth: 0, withOffset: false, platformLengthLocked: false, type, startWidth, endWidth };
}
export function getNewSegment(type: ComponentType, baseSegment?: Segment): Segment {
    const param = getNewComponentParam(type, baseSegment);
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