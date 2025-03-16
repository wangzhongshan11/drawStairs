import { ComponentDirectionType, ComponentType, DefaultComponentParam, DefaultStairParam, Segment } from "./types";

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

export function getNewSegment(type: ComponentType, baseSegment?: Segment): Segment {
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
    // const startWidth = type === ComponentType.Platform ? DefaultStairParam.startWidth * 2.5
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
        param: { ...DefaultComponentParam, index: baseSegment ? baseSegment.param.index + 1 : 0, offsetWidth: 0, withOffset: false, platformLengthLocked: false, type, startWidth, endWidth },
        componentDirectionType: ComponentDirectionType.Front,
    }
}