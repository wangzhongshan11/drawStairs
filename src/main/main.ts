import { drawStairsTool } from "./tools/DrawStairsTool/index";
import { isKGroupInstance } from "./tools/DrawStairsTool/utils";

const pluginUI = app.getPluginUI();
pluginUI.resize(300, 700);
pluginUI.mount();

let activatedCustomTool: KTool | undefined;

async function onUIMessage(data: any) {
    try {
        if (data.type === 'activateStraightStairsTool' || data.type === 'activateCircularStairsTool') {
            if (activatedCustomTool !== drawStairsTool) {
                app.activateCustomTool(drawStairsTool, true);
                activatedCustomTool = drawStairsTool;
            }
            drawStairsTool.changeComponentType(data.componentType);
        } else if (data.type === 'deActivateStraightStairsTool' || data.type === 'deActivateCircularStairsTool') {
            app.deactivateCustomTool(drawStairsTool, false);
            activatedCustomTool = undefined;
        } else if (data.type === 'componentParamChange') {
            if (activatedCustomTool === drawStairsTool) {
                drawStairsTool.changeComponentParam(data.componentParam, data.changeParams);
            }
        }
    } catch (error) {
        console.error(error);
        closePlugin();
    }
}

pluginUI.onMessage(onUIMessage);

const selection = app.getSelection();
selection.addObserver({
    onSelectionChange: () => {
        const allEntities = selection.getAllEntities();
        if (allEntities.length === 1 && isKGroupInstance(allEntities[0])) {
            drawStairsTool.setModel(allEntities[0]);
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