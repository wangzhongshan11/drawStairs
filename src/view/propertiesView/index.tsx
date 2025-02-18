import * as React from 'react'
import "./index.css";
import { ComponentParam, StairParam, getComponentTitle } from '../../main/tools/DrawStairsTool/types';
import { ImmutableMap } from './ImmutableMap';
import { Tabs } from 'antd';
import PropertiesContent from './PropertyContent';
import { MessageType } from '../../main/types';
import { DeleteOutlined } from '@ant-design/icons';
import { Collapse } from "antd";
import StairProperty from './StairProperty';
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
        if (messageData.type === MessageType.ParamChangedByDraw) {
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

    render() {
        const { componentParams, componentParam, stairParam, activeKey, propertiesVisible } = this.state;
        if (!componentParams.size || !propertiesVisible || !stairParam) {
            return null;
        }
        // const disabled = !this.state.componentParam;
        const items: ItemType[] = [
            {
                key: 'stair-property',
                label: '整体参数',
                children: <StairProperty stairParam={stairParam} />
            },
            {
                key: 'stairs-property',
                label: '独立参数',
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
                    <PropertiesContent componentParam={componentParam} />
                </div>
            },
        ];
        return (
            <div className='property-wrapper'>
                <div className='collapse-wrapper'>
                <Collapse items={items} defaultActiveKey={['stair-property', 'stairs-property']} />
                </div>
            </div>
        )
    }
}