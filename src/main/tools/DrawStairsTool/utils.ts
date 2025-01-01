import { ComponentParam, CoordDelimiter, DefaultComponentParam, Delimiter } from "./types";

export function isKArchFace(entity: KEntity | KArchFace | undefined | null): entity is KArchFace {
    return !!entity && (entity.getType() === KArchFaceType.NonPlanar || entity.getType() === KArchFaceType.Planar);
}

export function isKGroupInstance(entity: KEntity | KArchFace | undefined | null): entity is KGroupInstance {
    return !!entity && entity.getType() === KEntityType.GroupInstance;
}

export function isKFace(entity: KEntity | KArchFace | undefined | null): entity is KFace {
    return !!entity && entity.getType() === KEntityType.Face;
}

export function isKEdge(entity: KEntity | KArchFace | undefined | null): entity is KEdge {
    return !!entity && entity.getType() === KEntityType.Edge;
}

export function isKVertex(entity: KEntity | KArchFace | undefined | null): entity is KVertex {
    return !!entity && entity.getType() === KEntityType.Vertex;
}

export function isKAuxiliaryBoundedCurve(entity: KEntity | KArchFace | undefined | null): entity is KAuxiliaryBoundedCurve {
    return !!entity && entity.getType() === KEntityType.AuxiliaryBoundedCurve;
}

export function isKAuxiliaryLine(entity: KEntity | KArchFace | undefined | null): entity is KAuxiliaryLine {
    return !!entity && entity.getType() === KEntityType.AuxiliaryLine;
}

export function isKPlane(entity: KSurface | undefined | null): entity is KPlane {
    return !!entity && entity.getType() === KSurfaceType.Plane;
}

export function isKLineSegment3d(entity: KBoundedCurve3d | undefined | null): entity is KLineSegment3d {
    return !!entity && !!(entity as KLineSegment3d).direction;
}

export function isKArc3d(entity: KBoundedCurve3d | undefined | null): entity is KArc3d {
    return !!entity && !!(entity as KArc3d).circle;
}

export function stringifyParam(param: ComponentParam) {
    let value: string = '';
    value += `hs=${param.horizontalStep}${Delimiter}`;
    value += `vs=${param.verticalStep}${Delimiter}`;
    value += `sw=${param.startWidth}${Delimiter}`;
    value += `ew=${param.endWidth}${Delimiter}`;
    value += `ow=${param.offsetWidth}${Delimiter}`;
    value += `tp=${param.type}${Delimiter}`;
    value += `up=${param.upward ? 1 : 0}${Delimiter}`;
    value += `ptk=${param.platformThickness}`;
    return value;
}

export function parseParam(value: string) {
    const param: ComponentParam = { ...DefaultComponentParam };
    const items = value.split(Delimiter);
    for (const item of items) {
        const keyValue = item.split('=');
        if (keyValue.length === 2) {
            switch (keyValue[0]) {
                case 'hs': param.horizontalStep = parseInt(keyValue[1]); break;
                case 'vs': param.verticalStep = parseInt(keyValue[1]); break;
                case 'sw': param.startWidth = parseInt(keyValue[1]); break;
                case 'ew': param.endWidth = parseInt(keyValue[1]); break;
                case 'ow': param.offsetWidth = parseFloat(keyValue[1]); break;
                case 'tp': param.type = parseInt(keyValue[1]); break;
                case 'up': param.upward = keyValue[1] === '1' ? true : false; break;
                case 'ptk': param.platformThickness = parseInt(keyValue[1]); break;
            }
        }
    }
    param.platformLengthLocked = true;
    return param;
}

export function stringifyStartEnd(start: KPoint3d, end: KPoint3d) {
    let value: string = '';
    value += `${start.x}${CoordDelimiter}`;
    value += `${start.y}${CoordDelimiter}`;
    value += `${start.z}${Delimiter}`;
    value += `${end.x}${CoordDelimiter}`;
    value += `${end.y}${CoordDelimiter}`;
    value += `${end.z}`;
    return value;
}


export function parseStartEnd(value: string) {
    const items = value.split(Delimiter);
    if (items.length === 2) {
        const startKeyValue = items[0].split(CoordDelimiter);
        const endKeyValue = items[1].split(CoordDelimiter);
        if (startKeyValue.length === 3 && endKeyValue.length === 3) {
            const start = GeomLib.createPoint3d(parseFloat(startKeyValue[0]), parseFloat(startKeyValue[1]), parseFloat(startKeyValue[2]))
            const end = GeomLib.createPoint3d(parseFloat(endKeyValue[0]), parseFloat(endKeyValue[1]), parseFloat(endKeyValue[2]))
            return { start, end };
        }
    }
}