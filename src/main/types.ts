export enum MessageType {
    DrawStairViewMounted = 'drawStairViewMounted',

    StairParamChangedByInput = 'stairParamChangedByInput',
    StairParamChangedByDraw = 'stairParamChangedByDraw',

    ParamChangedByInput = 'paramChangedByInput',
    ParamChangedByDraw = 'paramChangedByDraw',
    ComponentAdded = 'componentAdded',
    DrawStairModelSettled = 'drawStairModelSettled',
    PropertiesVisible = 'propertiesVisible',
    FocusComponentIndex = 'focusComponentIndex',
    RemoveComponent = 'removeComponent',
    MaterialReplaceClick = 'materialReplaceClick',

    ActivateDrawStairsTool = 'activateDrawStairsTool',
    DeActivateDrawStairsTool = 'deActivateDrawStairsTool',
    LeaveDrawStairsTool = 'leaveDrawStairsTool',
}