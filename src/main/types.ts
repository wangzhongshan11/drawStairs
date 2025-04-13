export enum MessageType {
    DrawStairViewMounted = 'drawStairViewMounted',
    PropertiesVisible = 'propertiesVisible',

    DrawStairModelSettled = 'drawStairModelSettled',

    StairParamChangedByInput = 'stairParamChangedByInput',
    StairParamChangedByDraw = 'stairParamChangedByDraw',

    ParamChangedByInput = 'paramChangedByInput',
    ParamChangedByDraw = 'paramChangedByDraw',
    ComponentAdded = 'componentAdded',
    RemoveComponent = 'removeComponent',
    FocusComponentIndex = 'focusComponentIndex',
    FocusComponentIndexByDraw = 'focusComponentIndexByDraw',

    MaterialReplaceClick = 'materialReplaceClick',

    ActivateDrawStairsTool = 'activateDrawStairsTool',
    DeActivateDrawStairsTool = 'deActivateDrawStairsTool',
    LeaveDrawStairsTool = 'leaveDrawStairsTool',
}