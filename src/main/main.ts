import { drawStairsTool } from "./tools/DrawStairsTool/index";
import { isKGroupInstance } from "./tools/DrawStairsTool/utils";
import { MessageType } from "./types";

const pluginUI = app.getPluginUI();
pluginUI.resize(340, 700);
pluginUI.mount();

let activatedCustomTool: KTool | undefined;

async function onUIMessage(data: any) {
    try {
        if (data.type === MessageType.ActivateDrawStairsTool) {
            // if (data.type === 'activateStraightStairsTool' || data.type === 'activateCircularStairsTool') {
            if (activatedCustomTool !== drawStairsTool) {
                app.activateCustomTool(drawStairsTool, true);
                activatedCustomTool = drawStairsTool;
            }
            // drawStairsTool.changeComponentType(data.componentType);
        } else if (data.type === MessageType.DeActivateDrawStairsTool) {
            // } else if (data.type === 'deActivateStraightStairsTool' || data.type === 'deActivateCircularStairsTool') {
            deActivateDrawStairsTool();
        } else if (data.type === MessageType.ComponentParamChange) {
            if (activatedCustomTool === drawStairsTool) {
                drawStairsTool.changeComponentParam(data.componentParam, data.changeParams);
            }
        } else if (data.type === MessageType.FocusComponentIndex) {
            if (activatedCustomTool === drawStairsTool) {
                drawStairsTool.focusComponent(data.componentIndex);
            }
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
            drawStairsTool.setModel(allEntities[0]);
        }
        else {
            pluginUI.postMessage({ type: MessageType.DrawStairModelSettled }, '*');
        }
    }
});

function onPluginStartUp() {
    const allEntities = selection.getAllEntities();
    if (allEntities.length === 1 && isKGroupInstance(allEntities[0])) {
        drawStairsTool.setModel(allEntities[0]);
    }
}
onPluginStartUp();