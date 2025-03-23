import * as React from 'react'
import "./index.css";
import { ColumnType, ComponentParam, ComponentParamType, RailType, StairParam, getComponentTitle } from '../../main/tools/DrawStairsTool/types';
import { ImmutableMap } from './ImmutableMap';
import { Tabs } from 'antd';
import PropertyContent from './PropertyContent';
import { MessageType } from '../../main/types';
import { DeleteOutlined } from '@ant-design/icons';
import { Collapse } from "antd";
import HandrailProperty from './HandrailProperty';
import { ItemType } from 'rc-collapse/es/interface';

interface State {
    componentParams: ImmutableMap<number, ComponentParam>;
    componentParam?: ComponentParam;
    stairParam?: StairParam;
    activeKey: string;
    propertiesVisible: boolean;
}

export default class PropertiesView extends React.Component<{}, State> {
    state: Readonly<State> = { componentParams: new ImmutableMap(), activeKey: '0', propertiesVisible: true };

    componentDidMount(): void {
        window.addEventListener("message", this.onMessage);
    }

    componentWillUnmount(): void {
        window.removeEventListener("message", this.onMessage);
    }

    private onMessage = (event: any) => {
        const messageData = event.data;
        const { componentParams, componentParam } = this.state;
        if (messageData.type === MessageType.StairParamChangedByDraw) {
            this.setState({ stairParam: messageData.stairParam });
        } else if (messageData.type === MessageType.ParamChangedByDraw) {
            // if (messageData.newStair) {
            //     const a = new ImmutableMap(new Map([[messageData.componentParam.index, messageData.componentParam]]));
            //     this.setState({
            //         componentParams: a,
            //         componentParam: messageData.componentParam,
            //         activeKey: messageData.componentParam.index.toString(),
            //         propertiesVisible: true,
            //     });
            //     console.log('newStair');
            // } else {
            const newComponentParams = componentParams.set(messageData.componentParam.index, messageData.componentParam);
            this.setState({
                componentParams: newComponentParams,
                componentParam: componentParam ? (messageData.componentParam.index === componentParam.index ? messageData.componentParam : componentParam) : messageData.componentParam,
            });
            // }
        } else if (messageData.type === MessageType.ComponentAdded) {
            const newComponentParams = componentParams.set(messageData.componentParam.index, messageData.componentParam);
            this.setState({
                componentParams: newComponentParams,
                componentParam: messageData.componentParam,
                activeKey: messageData.componentParam.index.toString(),
            });
        } else if (messageData.type === MessageType.DrawStairModelSettled) {
            if (messageData.componentParams) {
                const componentParamMap: Map<number, ComponentParam> = new Map();
                for (const componentParam of messageData.componentParams) {
                    componentParamMap.set(componentParam.index, componentParam);
                }

                const theComponentParams = new ImmutableMap(componentParamMap);
                const componentParam = [...componentParamMap.values()][0];
                this.setState({ componentParams: theComponentParams, componentParam, stairParam: messageData.stairParam, activeKey: componentParam.index.toString(), propertiesVisible: true });
            } else {
                this.setState({ componentParams: new ImmutableMap(), componentParam: undefined, activeKey: '0', propertiesVisible: true });
            }
        } else if (messageData?.type === MessageType.PropertiesVisible) {
            this.setState({ propertiesVisible: messageData.propertiesVisible });
        } else if (messageData?.type === MessageType.LeaveDrawStairsTool) {
            this.setState({ componentParams: new ImmutableMap(), componentParam: undefined, activeKey: '0' });
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
            const { componentParams, componentParam, activeKey } = this.state;
            const theParam = componentParams.get(index);
            if (!theParam?.modelEditing) {
                return;
            }
            // const index = parseInt(activeKey);
            const newComponentParams = componentParams.delete(index);
            window.parent.postMessage({ type: MessageType.RemoveComponent, componentIndex: index }, '*');
            const newParams = [...newComponentParams.values()];
            this.setState({
                componentParams: newComponentParams,
                activeKey: newComponentParams.size ? (activeKey === e ? newParams[newParams.length - 1].index.toString() : activeKey) : '0',
                componentParam: newComponentParams.size ? (activeKey === e ? newParams[newParams.length - 1] : componentParam) : undefined,
            });
        }
    }

    private getOnHandrailChange = (componentParamType: ComponentParamType) => {
        return (value: number | string) => {
            const { stairParam } = this.state;
            if (stairParam) {
                if (componentParamType.startsWith(ComponentParamType.Handrail)) {
                    const { handrail } = stairParam;
                    const newHandrail = {
                        support: handrail.support,
                        height: handrail.height,
                        rail: {
                            type: handrail.rail.type,
                            param: { ...handrail.rail.param },
                        },
                        column: {
                            type: handrail.column.type,
                            step: handrail.column.step,
                            param: { ...handrail.column.param },
                        }
                    }
                    switch (componentParamType) {
                        case ComponentParamType.HandrailHeight: newHandrail.height = value as number; break;
                        case ComponentParamType.HandrailRailType: newHandrail.rail.type = value as RailType; break;
                        case ComponentParamType.HandrailRailRadius: newHandrail.rail.param.radius = value as number; break;
                        case ComponentParamType.HandrailRailWidth: newHandrail.rail.param.width = value as number; break;
                        case ComponentParamType.HandrailRailHeight: newHandrail.rail.param.height = value as number; break;
                        case ComponentParamType.HandrailColumnType: newHandrail.column.type = value as ColumnType; break;
                        case ComponentParamType.HandrailColumnStep: newHandrail.column.step = value as number; break;
                        case ComponentParamType.HandrailColumnRadius: newHandrail.column.param.radius = value as number; break;
                        case ComponentParamType.HandrailColumnWidth: newHandrail.column.param.width = value as number; break;
                        case ComponentParamType.HandrailColumnHeight: newHandrail.column.param.height = value as number; break;
                        default: break;
                    }
                    stairParam.handrail = newHandrail;
                } else {
                    (stairParam as any)[componentParamType] = value;
                }
                window.parent.postMessage({ type: MessageType.StairParamChangedByInput, stairParam, changeParams: [componentParamType] }, '*');
                this.setState({ stairParam: { ...stairParam } });
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
        const { componentParams, componentParam, stairParam, activeKey, propertiesVisible } = this.state;
        if (!componentParams.size || !propertiesVisible || !stairParam) {
            return null;
        }
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
                    getOnHandrailChange={this.getOnHandrailChange}
                    getOnHandrailSwitchChange={this.getOnHandrailSwitchChange}
                    getOnMaterialReplaceClick={this.getOnMaterialReplaceClick}
                    getOnMaterialDeleteClick={this.getOnMaterialDeleteClick}
                />
            },
        ];
        return (
            <div className='property-wrapper'>
                <Collapse items={items} defaultActiveKey={['stairs-property', 'handrail-property']} />
            </div>
        )
    }
}