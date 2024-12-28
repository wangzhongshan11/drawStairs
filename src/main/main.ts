import { alignTool } from "./drawStairsTool";

const pluginUI = app.getPluginUI();
pluginUI.resize(240, 300);
pluginUI.mount();

let activatedCustomTool: KTool | undefined;

async function onUIMessage(data: any) {
    try {
        if (data.type?.startsWith('activate')) {
            if (activatedCustomTool) {
                app.deactivateCustomTool(activatedCustomTool, true);
            }
        }
        if (data.type === 'activateDrawStairsTool') {
            app.activateCustomTool(alignTool, true);
            activatedCustomTool = alignTool;
        } else if (data.type === 'deActivateDrawStairsTool') {
            app.deactivateCustomTool(alignTool, false);
            activatedCustomTool = undefined;
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

    }
});

// function onPluginStartUp() {
// }
// onPluginStartUp();