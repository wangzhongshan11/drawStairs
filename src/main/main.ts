import { drawStairsTool } from "./tools/DrawStairsTool/index";
import { isKGroupInstance, onModelChanged } from "./tools/DrawStairsTool/utils";
import { MessageType } from "./types";

const pluginUI = app.getPluginUI();
pluginUI.resize(360, 720);
pluginUI.mount();

let activatedCustomTool: KTool | undefined;

async function onUIMessage(data: any) {
    try {
        if (data.type === MessageType.DrawStairViewMounted) {
            onPluginStartUp();
        } else if (data.type === MessageType.ActivateDrawStairsTool) {
            // if (data.type === 'activateStraightStairsTool' || data.type === 'activateCircularStairsTool') {
            if (activatedCustomTool !== drawStairsTool) {
                app.activateCustomTool(drawStairsTool, true);
                activatedCustomTool = drawStairsTool;
            }
            // drawStairsTool.changeComponentType(data.componentType);
        } else if (data.type === MessageType.DeActivateDrawStairsTool) {
            // } else if (data.type === 'deActivateStraightStairsTool' || data.type === 'deActivateCircularStairsTool') {
            deActivateDrawStairsTool();
        } else if (data.type === MessageType.StairParamChangedByInput) {
            // if (activatedCustomTool === drawStairsTool) {
            drawStairsTool.changeStairParam(data.stairParam, data.changeParams);
            // }
        } else if (data.type === MessageType.ParamChangedByInput) {
            // if (activatedCustomTool === drawStairsTool) {
            drawStairsTool.changeComponentParam(data.componentParam, data.changeParams);
            // }
        } else if (data.type === MessageType.FocusComponentIndex) {
            // if (activatedCustomTool === drawStairsTool) {
            drawStairsTool.focusComponent(data.componentIndex);
            // }
        } else if (data.type === MessageType.RemoveComponent) {
            // if (activatedCustomTool === drawStairsTool) {
            drawStairsTool.removeComponent(data.componentIndex);
            // }
        } else if (data.type === MessageType.MaterialReplaceClick) {
            // if (activatedCustomTool === drawStairsTool) {
            drawStairsTool.onMaterialReplaceClick(data.changeParam, data.index);
            // }
        }
    } catch (error) {
        console.error(error);
        closePlugin();
    }
}

export function deActivateDrawStairsTool() {
    activatedCustomTool = undefined;
    app.deactivateCustomTool(drawStairsTool, false);
}

pluginUI.onMessage(onUIMessage);

const selection = app.getSelection();
selection.addObserver({
    onSelectionChange: () => {
        const allEntities = selection.getAllEntities();
        if (allEntities.length === 1 && isKGroupInstance(allEntities[0])) {
            drawStairsTool.clearTempShapes();
            drawStairsTool.setModel(allEntities[0]);
        } else if (allEntities.length) {
            const editPath = app.getActiveDesign().getEditPath();
            const editModel = drawStairsTool.getEditModel();
            if (!editModel || (editPath.every(instance =>
                instance.getKey() !== editModel.parent.instanceKey &&
                [...editModel.stairs.values()].every(comp => comp.instanceKey !== instance.getKey()) &&
                [...editModel.platforms.values()].every(comp => comp.instanceKey !== instance.getKey()) &&
                editModel.handrail?.handrailInstance.instanceKey !== instance.getKey() && 
                editModel.handrail?.railInstances.every(comp => comp.instanceKey !== instance.getKey()) && 
                editModel.handrail?.columnInstances.every(comp => comp.instanceKey !== instance.getKey())
            ))) {
                drawStairsTool.clearTempShapes();
                if (activatedCustomTool !== drawStairsTool) {
                    pluginUI.postMessage({ type: MessageType.PropertiesVisible, propertiesVisible: false }, '*');
                }
            }
        }
    }
});

function onPluginStartUp() {
    const allEntities = selection.getAllEntities();
    if (allEntities.length === 1 && isKGroupInstance(allEntities[0])) {
        drawStairsTool.setModel(allEntities[0]);
    }

    app.addObserver({
        onPluginClosed: () => {

        },
        onModelChanged,
    })
}

