import * as React from 'react'
import "./index.css";
import { ColumnType, ComponentParam, ComponentParamType, ComponentType, MaterialAssignType, RailType, StairParam, getComponentTitle } from '../../main/tools/drawStairsTool/types';
import { ImmutableMap } from '../utils/ImmutableMap';
import { Tabs } from 'antd';
import PropertyContent from './PropertyContent';
import { MessageType } from '../../main/types';
import { DeleteOutlined } from '@ant-design/icons';
import { Collapse } from "antd";
import HandrailProperty from './HandrailProperty';
import { ItemType } from 'rc-collapse/es/interface';
import ToolGuide from './ToolGuide';

interface State {
    componentParams: ImmutableMap<number, ComponentParam>;
    componentParam?: ComponentParam;
    stairParam?: StairParam;
    isDrawing?: boolean;
    activeKey: string;
    propertiesVisible: boolean;
    materialAssignType?: MaterialAssignType | number;
}

export default class PropertiesView extends React.Component<{}, State> {
    state: Readonly<State> = { componentParams: new ImmutableMap(), activeKey: '0', propertiesVisible: false };

    componentDidMount(): void {
        window.addEventListener("message", this.onMessage);
    }

    componentWillUnmount(): void {
        window.removeEventListener("message", this.onMessage);
    }

    private onMessage = (event: any) => {
        const messageData = event.data;
        const { stairParam, componentParams, componentParam } = this.state;
        if (messageData.type === MessageType.StairParamChangedByDraw) {
            const newComponentParams = messageData.componentParams ? new ImmutableMap(new Map((messageData.componentParams as ComponentParam[]).map(param => ([param.index, param])))) : componentParams;
            const newComponentParam = componentParam ? newComponentParams.get(componentParam.index) : componentParam;
            this.setState({ stairParam: messageData.stairParam, componentParams: newComponentParams, componentParam: newComponentParam });
        } else if (messageData.type === MessageType.ParamChangedByDraw) {
            const newComponentParams = componentParams.set(messageData.componentParam.index, messageData.componentParam);
            this.setState({
                componentParams: newComponentParams,
                componentParam: componentParam ? (messageData.componentParam.index === componentParam.index ? messageData.componentParam : componentParam) : messageData.componentParam,
                stairParam: messageData.stairParam || stairParam,
            });
        } else if (messageData.type === MessageType.ComponentAdded) {
            const newComponentParams = componentParams.set(messageData.componentParam.index, messageData.componentParam);
            this.setState({
                componentParams: newComponentParams,
                componentParam: messageData.componentParam,
                activeKey: messageData.componentParam.index.toString(),
                materialAssignType: undefined,
            });
        } else if (messageData.type === MessageType.DrawStairModelSettled) {
            if (messageData.componentParams) {
                const componentParamMap: Map<number, ComponentParam> = new Map();
                for (const componentParam of messageData.componentParams) {
                    componentParamMap.set(componentParam.index, componentParam);
                }

                const theComponentParams = new ImmutableMap(componentParamMap);
                const activeKey = messageData.focusedComponentIndex || messageData.componentParams[0].index;
                const componentParam = theComponentParams.get(activeKey) || messageData.componentParams[0];
                this.setState({
                    componentParams: theComponentParams,
                    componentParam,
                    stairParam: messageData.stairParam,
                    activeKey: activeKey.toString(),
                    propertiesVisible: true,
                    isDrawing: !!messageData.isDrawing,
                    materialAssignType: undefined,
                });
            } else {
                this.setState({
                    componentParams: new ImmutableMap(),
                    componentParam: undefined,
                    activeKey: '0',
                    propertiesVisible: true,
                    isDrawing: !!messageData.isDrawing,
                    materialAssignType: undefined,
                });
            }
        } else if (messageData?.type === MessageType.PropertiesVisible) {
            this.setState({ propertiesVisible: messageData.propertiesVisible, materialAssignType: undefined });
        } else if (messageData?.type === MessageType.LeaveDrawStairsTool) {
            this.setState({ componentParams: new ImmutableMap(), componentParam: undefined, activeKey: '0', materialAssignType: undefined });
        } else if (messageData?.type === MessageType.FocusComponentIndexByDraw) {
            this.setState({
                componentParam: componentParams.get(messageData.focusedComponentIndex),
                activeKey: messageData.focusedComponentIndex.toString(),
            });
        }
    }

    private onTabChange = (activeKey: string) => {
        const { componentParams } = this.state;
        const componentParam = componentParams.get(parseInt(activeKey));
        if (componentParam) {
            this.setState({ componentParam, activeKey });
            window.parent.postMessage({ type: MessageType.FocusComponentIndex, componentIndex: parseInt(activeKey) }, '*');
        }
    }

    private onTabsEdit = (e: React.MouseEvent | React.KeyboardEvent | string, action: 'add' | 'remove') => {
        if (action === 'remove' && typeof e === 'string') {
            const index = parseInt(e);
            const { componentParams } = this.state;
            const theParam = componentParams.get(index);
            const oldComponentParams = [...componentParams.values()];
            const theInd = oldComponentParams.findIndex(param => param.index === index);
            if (!theParam?.modelEditing || theInd < 0) {
                return;
            }
            // const index = parseInt(activeKey);
            const newComponentParams = componentParams.delete(index);
            window.parent.postMessage({ type: MessageType.RemoveComponent, componentIndex: index }, '*');
            const newParams = [...newComponentParams.values()];
            const newComponentParam = theInd >= newParams.length ? (newParams.length ? newParams[0] : undefined) : newParams[theInd];
            const newActiveKey = (newComponentParam?.index || 0).toString();
            this.setState({
                componentParams: newComponentParams,
                activeKey: newActiveKey,
                componentParam: newComponentParam,
            });
        }
    }

    private getOnChange = (componentParamType: ComponentParamType) => {
        return (value: number | string) => {
            const { componentParam, componentParams } = this.state;
            if (componentParam) {
                const newComponentParam = { ...componentParam };
                if (newComponentParam.type === ComponentType.Platform && componentParamType === ComponentParamType.StartWidth) {
                    const { startWidth, offsetWidth } = newComponentParam;
                    const newWidth = value as number;
                    if (newWidth === (startWidth + Math.abs(offsetWidth))) {
                        return;
                    }
                    const delta = newWidth - startWidth;
                    if (delta <= 0 || offsetWidth === 0) {
                        newComponentParam.startWidth += delta;
                        newComponentParam.endWidth += delta;
                        newComponentParam.offsetWidth = 0;
                    } else {
                        newComponentParam.offsetWidth = offsetWidth > 0 ? delta : -delta;
                    }
                } else {
                    if (value === (newComponentParam as any)[componentParamType]) {
                        return;
                    }
                    if (componentParamType === ComponentParamType.PlatformLength) {
                        newComponentParam.platformLengthLocked = true;
                    } else if (componentParamType === ComponentParamType.Type) {
                        if (value === ComponentType.Platform) {
                            if (newComponentParam.type !== ComponentType.Platform) {
                                newComponentParam.startWidth = 4 * newComponentParam.startWidth;
                                newComponentParam.endWidth = newComponentParam.startWidth;
                            }
                        } else {
                            if (newComponentParam.type === ComponentType.Platform) {
                                newComponentParam.startWidth = newComponentParam.startWidth / 4;
                                newComponentParam.endWidth = newComponentParam.startWidth;
                            }
                        }
                    }

                    if (value !== undefined) {
                        (newComponentParam as any)[componentParamType] = value;
                    }
                }
                window.parent.postMessage({ type: MessageType.ParamChangedByInput, componentParam: newComponentParam, changeParams: [componentParamType] }, '*');
                const newComponentParams = componentParams.set(newComponentParam.index, newComponentParam);
                this.setState({ componentParam: newComponentParam, componentParams: newComponentParams });
            }
        }
    }


    private getOnLockChange = (componentParamType: ComponentParamType) => {
        return () => {
            const { componentParam, componentParams } = this.state;
            if (componentParam) {
                const newComponentParam = { ...componentParam };
                if (componentParamType === ComponentParamType.PlatformLengthLocked) {
                    newComponentParam.platformLengthLocked = !newComponentParam.platformLengthLocked;
                } else if (componentParamType === ComponentParamType.WidthProportional) {
                    newComponentParam.widthProportional = !newComponentParam.widthProportional;
                } else if (componentParamType === ComponentParamType.StepProportional) {
                    newComponentParam.stepProportional = !newComponentParam.stepProportional;
                }
                window.parent.postMessage({ type: MessageType.ParamChangedByInput, componentParam: newComponentParam, changeParams: [componentParamType] }, '*');
                const newComponentParams = componentParams.set(newComponentParam.index, newComponentParam);
                this.setState({ componentParam: newComponentParam, componentParams: newComponentParams });
            }
        }
    }

    private getOnArrayChange = (componentParamTypes: ComponentParamType[]) => {
        return (values: number[]) => {
            const { componentParam, componentParams } = this.state;
            if (componentParam) {
                const newComponentParam = { ...componentParam };
                let changed = false;
                for (let i = 0; i < componentParamTypes.length; i++) {
                    const componentParamType = componentParamTypes[i];
                    if (values[i] !== (newComponentParam as any)[componentParamType]) {
                        (newComponentParam as any)[componentParamType] = values[i];
                        changed = true;
                    }
                }
                if (changed) {
                    window.parent.postMessage({ type: MessageType.ParamChangedByInput, componentParam: newComponentParam, changeParams: componentParamTypes }, '*');
                    const newComponentParams = componentParams.set(newComponentParam.index, newComponentParam);
                    this.setState({ componentParam: newComponentParam, componentParams: newComponentParams });
                }
            }
        }
    }

    private getOnChangeOverall = (componentParamType: ComponentParamType) => {
        return (value: number | string) => {
            const { stairParam } = this.state;
            if (stairParam) {
                if (value === (stairParam as any)[componentParamType]) {
                    return;
                }
                (stairParam as any)[componentParamType] = value;
                window.parent.postMessage({ type: MessageType.StairParamChangedByInput, stairParam, changeParams: [componentParamType] }, '*');
                this.setState({ stairParam: { ...stairParam } });
            }
        }
    }


    private getOnLockChangeOverall = (componentParamType: ComponentParamType) => {
        return () => {
            const { stairParam } = this.state;
            if (stairParam) {
                if (componentParamType === ComponentParamType.StepProportional) {
                    stairParam.stepProportional = !stairParam.stepProportional;
                } if (componentParamType === ComponentParamType.WidthProportional) {
                    stairParam.widthProportional = !stairParam.widthProportional;
                }
                window.parent.postMessage({ type: MessageType.StairParamChangedByInput, stairParam, changeParams: [componentParamType] }, '*');
                this.setState({ stairParam: { ...stairParam } });
            }
        }
    }

    private getOnArrayChangeOverall = (componentParamTypes: ComponentParamType[]) => {
        return (values: number[]) => {
            const { stairParam } = this.state;
            if (stairParam) {
                let changed = false;
                for (let i = 0; i < componentParamTypes.length; i++) {
                    const componentParamType = componentParamTypes[i];
                    if (values[i] !== (stairParam as any)[componentParamType]) {
                        (stairParam as any)[componentParamType] = values[i];
                        changed = true;
                    }
                }
                if (changed) {
                    window.parent.postMessage({ type: MessageType.StairParamChangedByInput, stairParam, changeParams: componentParamTypes }, '*');
                    this.setState({ stairParam: { ...stairParam } });
                }
            }
        }
    }

    private getOnHandrailChange = (componentParamType: ComponentParamType) => {
        return (value: number | string) => {
            const { stairParam } = this.state;
            if (stairParam) {
                if (componentParamType.startsWith(ComponentParamType.Handrail)) {
                    const { handrail } = stairParam;
                    let changed = false;
                    const newHandrail = {
                        support: handrail.support,
                        height: handrail.height,
                        rail: {
                            type: handrail.rail.type,
                            param: { ...handrail.rail.param },
                            material: handrail.rail.material,
                        },
                        column: {
                            type: handrail.column.type,
                            step: handrail.column.step,
                            param: { ...handrail.column.param },
                            material: handrail.column.material,
                        }
                    }
                    switch (componentParamType) {
                        case ComponentParamType.HandrailHeight: changed = newHandrail.height !== value; newHandrail.height = value as number; break;
                        case ComponentParamType.HandrailRailType: changed = newHandrail.rail.type !== value; newHandrail.rail.type = value as RailType; break;
                        case ComponentParamType.HandrailRailRadius: changed = newHandrail.rail.param.radius !== value; newHandrail.rail.param.radius = value as number; break;
                        case ComponentParamType.HandrailRailWidth: changed = newHandrail.rail.param.width !== value; newHandrail.rail.param.width = value as number; break;
                        case ComponentParamType.HandrailRailHeight: changed = newHandrail.rail.param.height !== value; newHandrail.rail.param.height = value as number; break;
                        case ComponentParamType.HandrailColumnType: changed = newHandrail.column.type !== value; newHandrail.column.type = value as ColumnType; break;
                        case ComponentParamType.HandrailColumnStep: changed = newHandrail.column.step !== value; newHandrail.column.step = value as number; break;
                        case ComponentParamType.HandrailColumnRadius: changed = newHandrail.column.param.radius !== value; newHandrail.column.param.radius = value as number; break;
                        case ComponentParamType.HandrailColumnWidth: changed = newHandrail.column.param.width !== value; newHandrail.column.param.width = value as number; break;
                        case ComponentParamType.HandrailColumnHeight: changed = newHandrail.column.param.height !== value; newHandrail.column.param.height = value as number; break;
                        default: break;
                    }
                    if (changed) {
                        stairParam.handrail = newHandrail;
                        window.parent.postMessage({ type: MessageType.StairParamChangedByInput, stairParam, changeParams: [componentParamType] }, '*');
                        this.setState({ stairParam: { ...stairParam } });
                    }
                }
            }
        }
    }

    private getOnHandrailSwitchChange = (componentParamType: ComponentParamType) => {
        return (checked: boolean) => {
            const { stairParam } = this.state;
            if (stairParam) {
                if (componentParamType === ComponentParamType.Handrail) {
                    stairParam.handrail.support = checked;
                }
                stairParam.handrail = { ...stairParam.handrail };
                window.parent.postMessage({ type: MessageType.StairParamChangedByInput, stairParam, changeParams: [componentParamType] }, '*');
                this.setState({ stairParam: { ...stairParam } });
            }
        }
    }

    private getOnMaterialReplaceClick = (componentParamType: ComponentParamType, index?: number) => {
        return () => {
            let newMaterialAssignType = this.state.materialAssignType;
            if (componentParamType === ComponentParamType.ComponentMaterial) {
                newMaterialAssignType = index;
            } else if (componentParamType === ComponentParamType.StairMaterial) {
                newMaterialAssignType = MaterialAssignType.StairOverall;
            } else if (componentParamType === ComponentParamType.PlatformMaterial) {
                newMaterialAssignType = MaterialAssignType.PlatformOverall;
            } else if (componentParamType === ComponentParamType.HandrailRailMaterial) {
                newMaterialAssignType = MaterialAssignType.Rail;
            } else if (componentParamType === ComponentParamType.HandrailColumnMaterial) {
                newMaterialAssignType = MaterialAssignType.Column;
            }
            this.setState({ materialAssignType: newMaterialAssignType });
            window.parent.postMessage({ type: MessageType.MaterialReplaceClick, changeParam: componentParamType, index }, '*');
        }
    }

    private getOnMaterialDeleteClick = (componentParamType: ComponentParamType) => {
        return () => {
            if (componentParamType === ComponentParamType.ComponentMaterial) {
                const { componentParam } = this.state;
                if (componentParam) {
                    componentParam.material = undefined;
                    window.parent.postMessage({ type: MessageType.ParamChangedByInput, componentParam, changeParams: [componentParamType] }, '*');
                    this.setState({ componentParam: { ...componentParam } });
                }
            } else {
                const { stairParam } = this.state;
                if (stairParam) {
                    if (componentParamType === ComponentParamType.StairMaterial || componentParamType === ComponentParamType.PlatformMaterial) {
                        if (componentParamType === ComponentParamType.StairMaterial) {
                            stairParam.stairMaterial = undefined;
                        } else {
                            stairParam.platformMaterial = undefined;
                        }
                    } else if (componentParamType === ComponentParamType.HandrailRailMaterial) {
                        stairParam.handrail.rail = { ...stairParam.handrail.rail, material: undefined }
                    } else if (componentParamType === ComponentParamType.HandrailColumnMaterial) {
                        stairParam.handrail.column = { ...stairParam.handrail.column, material: undefined }
                    }
                    window.parent.postMessage({ type: MessageType.StairParamChangedByInput, stairParam, changeParams: [componentParamType] }, '*');
                    this.setState({ stairParam: { ...stairParam } });
                }
            }
        }
    }

    render() {
        const { componentParams, componentParam, stairParam, activeKey, propertiesVisible, isDrawing, materialAssignType } = this.state;
        // if (!componentParams.size || !propertiesVisible || !stairParam) {
        //     return null;
        // }
        // const disabled = !this.state.componentParam;
        const items: ItemType[] = [
            {
                key: 'stairs-property',
                label: '阶梯参数',
                children: <div className='stairs-property-wrapper'>
                    <Tabs
                        defaultActiveKey={activeKey}
                        activeKey={activeKey}
                        tabPosition="left"
                        className='property-tabs-wrapper'
                        onChange={this.onTabChange}
                        // style={{ height: 500 }}
                        size='small'
                        type='editable-card'
                        removeIcon={<DeleteOutlined />}
                        hideAdd={true}
                        onEdit={this.onTabsEdit}
                        items={componentParams.map((componentParam, i) => {
                            const { index, type } = componentParam;
                            return {
                                label: `${getComponentTitle(type)}${index}`,
                                key: index.toString(),
                                // children: ,
                            };
                        })}
                    />
                    <PropertyContent
                        componentParam={componentParam}
                        stairParam={stairParam}
                        isDrawing={isDrawing}
                        materialAssignType={materialAssignType}
                        getOnChange={this.getOnChange}
                        getOnArrayChange={this.getOnArrayChange}
                        getOnLockChange={this.getOnLockChange}
                        getOnChangeOverall={this.getOnChangeOverall}
                        getOnLockChangeOverall={this.getOnLockChangeOverall}
                        getOnArrayChangeOverall={this.getOnArrayChangeOverall}
                        getOnMaterialReplaceClick={this.getOnMaterialReplaceClick}
                        getOnMaterialDeleteClick={this.getOnMaterialDeleteClick}
                    />
                </div>
            },
            {
                key: 'handrail-property',
                label: '栏杆参数',
                children: <HandrailProperty
                    stairParam={stairParam}
                    isDrawing={isDrawing}
                    materialAssignType={materialAssignType}
                    getOnHandrailChange={this.getOnHandrailChange}
                    getOnHandrailSwitchChange={this.getOnHandrailSwitchChange}
                    getOnMaterialReplaceClick={this.getOnMaterialReplaceClick}
                    getOnMaterialDeleteClick={this.getOnMaterialDeleteClick}
                />
            },
        ];
        return (
            <div className='property-wrapper'>
                {propertiesVisible ?
                    <Collapse items={items} defaultActiveKey={['stairs-property', 'handrail-property']} /> :
                    <ToolGuide />
                }
            </div>
        )
    }
}