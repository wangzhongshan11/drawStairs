import { drawStairsTool } from "./index";
import { DirectionX, DirectionY, DirectionZ } from "./consts";
import { ColumnType, ComponentParam, CoordDelimiter, DefaultComponentParam, DefaultStairParam, Delimiter, EditModel, getDefaultStairParam, MaterialType, RailType, Segment, StairParam } from "./types";

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

export function stringifyMaterial(material: MaterialType) {
    let value: string = '';
    if (material.materialId) {
        value += `mid=${material.materialId}${Delimiter}`;
    }
    if (material.bgid) {
        value += `bid=${material.bgid}${Delimiter}`;
    }
    if (material.imgUrl) {
        value += `img=${material.imgUrl}${Delimiter}`;
    }
    return value.slice(0, value.length - 1);
}

export function parseMaterial(value: string) {
    const material: MaterialType = {};
    const items = value.split(Delimiter);
    for (const item of items) {
        const keyValue = item.split('=');
        if (keyValue.length === 2) {
            switch (keyValue[0]) {
                case 'mid': material.materialId = keyValue[1]; break;
                case 'bid': material.bgid = keyValue[1]; break;
                case 'img': material.imgUrl = keyValue[1]; break;
            }
        }
    }
    if (items.length) {
        return material;
    }
}

export function stringifyStairParam(param: StairParam) {
    let value: string = '';
    value += `a=${param.horizontalStep}${Delimiter}`;
    value += `b=${param.verticalStep}${Delimiter}`;
    value += `c=${param.startWidth}${Delimiter}`;
    value += `d=${param.endWidth}${Delimiter}`;
    value += `e=${param.upward ? 1 : 0}${Delimiter}`;
    value += `f=${param.platformThickness}`;
    if (param.handrail.support) {
        const { handrail: { height, rail, column } } = param;
        value += `g=${height}${Delimiter}`;
        value += `h=${rail.type}${Delimiter}`;
        if (rail.type === RailType.Circle && rail.param.radius !== undefined) {
            value += `i=${rail.param.radius}${Delimiter}`;
        } else if (rail.type === RailType.Rect) {
            if (rail.param.width !== undefined) {
                value += `j=${rail.param.width}${Delimiter}`;
            }
            if (rail.param.height !== undefined) {
                value += `k=${rail.param.height}${Delimiter}`;
            }
        }
        value += `l=${column.type}${Delimiter}`;
        value += `m=${column.step}${Delimiter}`;
        if (column.type === ColumnType.Circle && column.param.radius !== undefined) {
            value += `n=${column.param.radius}${Delimiter}`;
        } else if (column.type === ColumnType.Rect) {
            if (column.param.width !== undefined) {
                value += `o=${column.param.width}${Delimiter}`;
            }
            if (column.param.height !== undefined) {
                value += `p=${column.param.height}${Delimiter}`;
            }
        }
    }
    return value.slice(0, value.length - 1);
}

export function parseStairParam(value: string) {
    const param: StairParam = getDefaultStairParam();
    const items = value.split(Delimiter);
    for (const item of items) {
        const keyValue = item.split('=');
        if (keyValue.length === 2) {
            switch (keyValue[0]) {
                case 'a': param.horizontalStep = parseInt(keyValue[1]); break;
                case 'b': param.verticalStep = parseInt(keyValue[1]); break;
                case 'c': param.startWidth = parseInt(keyValue[1]); break;
                case 'd': param.endWidth = parseInt(keyValue[1]); break;
                case 'e': param.upward = keyValue[1] === '1' ? true : false; break;
                case 'f': param.platformThickness = parseInt(keyValue[1]); break;
                case 'g': param.handrail.height = parseFloat(keyValue[1]); break;
                case 'h': param.handrail.rail.type = parseFloat(keyValue[1]); break;
                case 'i': param.handrail.rail.param.radius = parseInt(keyValue[1]); break;
                case 'j': param.handrail.rail.param.width = parseInt(keyValue[1]); break;
                case 'k': param.handrail.rail.param.height = parseInt(keyValue[1]); break;
                case 'l': param.handrail.column.type = parseFloat(keyValue[1]); break;
                case 'm': param.handrail.column.step = parseFloat(keyValue[1]); break;
                case 'n': param.handrail.column.param.radius = parseInt(keyValue[1]); break;
                case 'o': param.handrail.column.param.width = parseInt(keyValue[1]); break;
                case 'p': param.handrail.column.param.height = parseInt(keyValue[1]); break;
            }
        }
    }
    param.stepProportional = DefaultStairParam.stepProportional;
    param.widthProportional = DefaultStairParam.widthProportional;
    return param;
}

export function stringifyComponentParam(param: ComponentParam) {
    let value: string = '';
    value += `a=${param.index}${Delimiter}`;
    value += `b=${param.horizontalStep}${Delimiter}`;
    value += `c=${param.verticalStep}${Delimiter}`;
    value += `d=${param.startWidth}${Delimiter}`;
    value += `e=${param.endWidth}${Delimiter}`;
    value += `f=${param.offsetWidth}${Delimiter}`;
    value += `g=${param.platformLength}${Delimiter}`;
    value += `h=${param.type}${Delimiter}`;
    value += `i=${param.upward ? 1 : 0}${Delimiter}`;
    value += `j=${param.platformThickness}`;
    return value;
}

export function parseComponentParam(value: string) {
    const param: ComponentParam = { ...DefaultComponentParam };
    const items = value.split(Delimiter);
    for (const item of items) {
        const keyValue = item.split('=');
        if (keyValue.length === 2) {
            switch (keyValue[0]) {
                case 'a': param.index = parseInt(keyValue[1]); break;
                case 'b': param.horizontalStep = parseInt(keyValue[1]); break;
                case 'c': param.verticalStep = parseInt(keyValue[1]); break;
                case 'd': param.startWidth = parseInt(keyValue[1]); break;
                case 'e': param.endWidth = parseInt(keyValue[1]); break;
                case 'f': param.offsetWidth = parseFloat(keyValue[1]); break;
                case 'g': param.platformLength = parseFloat(keyValue[1]); break;
                case 'h': param.type = parseInt(keyValue[1]); break;
                case 'i': param.upward = keyValue[1] === '1' ? true : false; break;
                case 'j': param.platformThickness = parseInt(keyValue[1]); break;
            }
        }
    }
    param.stepProportional = DefaultComponentParam.stepProportional;
    param.widthProportional = DefaultComponentParam.widthProportional;
    param.platformLengthLocked = true;
    param.modelEditing = true;
    param.withOffset = !isEqual(param.offsetWidth, 0);
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

export function parseLineSeg3d(value: string) {
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

export function parseStartEnd(value: string) {
    const items = value.split(Delimiter);
    if (items.length === 2) {
        const startKeyValue = items[0].split(CoordDelimiter);
        const endKeyValue = items[1].split(CoordDelimiter);
        if (startKeyValue.length === 3 && endKeyValue.length === 3) {
            const start = GeomLib.createPoint3d(parseFloat(startKeyValue[0]), parseFloat(startKeyValue[1]), 0);
            const end = GeomLib.createPoint3d(parseFloat(endKeyValue[0]), parseFloat(endKeyValue[1]), 0);
            return { start, end, startHeight: parseFloat(startKeyValue[2]), endHeight: parseFloat(endKeyValue[2]) };
        }
    }
}

export function stringifyPoint3d(point: KPoint3d | KVector3d) {
    let value: string = '';
    value += `${point.x}${CoordDelimiter}`;
    value += `${point.y}${CoordDelimiter}`;
    value += `${point.z}`;
    return value;
}

export function parseVector3d(value: string) {
    const items = value.split(CoordDelimiter);
    if (items.length === 3) {
        const vector = GeomLib.createVector3d(parseFloat(items[0]), parseFloat(items[1]), parseFloat(items[2]));
        return vector;
    }
}

export function stringifyBaseComponent(baseSegment: Segment, line3dIndex?: number) {
    let value: string = '';
    value += `${baseSegment.param.index}`;
    if (line3dIndex !== undefined) {
        value += `${CoordDelimiter}${line3dIndex}`;
    }
    return value;
}

export function parseBaseComponent(value: string) {
    const items = value.split(CoordDelimiter);
    if (value.length && items.length > 0) {
        const baseComponentIndex = parseInt(items[0]);
        let line3dIndex: number | undefined;
        if (items.length === 2) {
            line3dIndex = parseInt(items[1]);
        }
        return { componentIndex: baseComponentIndex, line3dIndex };
    }
}

export function isEqual(a: number, b: number, tolerance: number = 1) {
    return Math.abs(a - b) <= tolerance;
}

export function getCoordinate(normal: KVector3d) {
    let dx = DirectionX;
    let dy = DirectionZ;
    let dz = normal.normalized();
    if (DirectionZ.isParallel(dz)) {
        dx = DirectionY.cross(dz).normalized();
        dy = dz.cross(dx).normalized();
    } else {
        dx = dy.cross(dz).normalized();
        dy = dz.cross(dx).normalized();
    }
    return { dx, dy, dz }
}

let isInOperation = false;

export function startOperation() {
    isInOperation = true;
    app.getActiveDesign().startOperation();
}

export function commitOperation() {
    app.getActiveDesign().commitOperation();
    isInOperation = false;
}

export function abortOperation() {
    debugger
    app.getActiveDesign().abortOperation();
    isInOperation = false;
}

export function onModelChanged(changes: { isUndoRedo: boolean, modified?: KGroupDefinition[], added?: KGroupDefinition[], deleted?: KGroupDefinition[] }) {
    const modified = changes.modified;
    const deleted = changes.deleted;
    const added = changes.added;
    const editModel = drawStairsTool.getEditModel();
    if (!isInOperation && (deleted?.length || added?.length || (editModel && modified?.some(group => {
        return isGroupDefPartOfEditModel(editModel, group);
    })))) {
        // if (deleted.some(deleteGroup => editModel.parent.definitionKey === deleteGroup.getKey())) {
        drawStairsTool.clearEditModel();
        // }
    }
}

export function isPartOfEditModel(editModel: EditModel, groupInstance: KGroupInstance) {
    const groupInstanceKey = groupInstance.getKey();
    return editModel.parent.instanceKey === groupInstanceKey ||
        [...editModel.stairs.values()].some(instanceData => instanceData.instanceKey === groupInstanceKey) ||
        [...editModel.platforms.values()].some(instanceData => instanceData.instanceKey === groupInstanceKey) ||
        editModel.handrail?.handrailInstance.instanceKey === groupInstanceKey ||
        [...(editModel.handrail?.railInstances || []).values()].some(instanceData => instanceData.instanceKey === groupInstanceKey) ||
        [...(editModel.handrail?.columnInstances || []).values()].some(instanceData => instanceData.instanceKey === groupInstanceKey)
}

export function isGroupDefPartOfEditModel(editModel: EditModel, groupDefinition: KGroupDefinition) {
    const groupDefinitionKey = groupDefinition.getKey();
    return editModel.parent.definitionKey === groupDefinitionKey ||
        [...editModel.stairs.values()].some(instanceData => instanceData.definitionKey === groupDefinitionKey) ||
        [...editModel.platforms.values()].some(instanceData => instanceData.definitionKey === groupDefinitionKey) ||
        editModel.handrail?.handrailInstance.definitionKey === groupDefinitionKey ||
        [...(editModel.handrail?.railInstances || []).values()].some(instanceData => instanceData.definitionKey === groupDefinitionKey) ||
        [...(editModel.handrail?.columnInstances || []).values()].some(instanceData => instanceData.definitionKey === groupDefinitionKey)
}
