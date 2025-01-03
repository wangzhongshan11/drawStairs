import * as React from 'react'
import "./index.css";
import { ComponentParam, getComponentTitle } from '../../main/tools/DrawStairsTool/types';
import { ImmutableMap } from './ImmutableMap';
import { Tabs } from 'antd';
import PropertiesContent from './PropertyContent';
import { MessageType } from '../../main/types';
interface State {
    componentParams: ImmutableMap<number, ComponentParam>;
    componentParam?: ComponentParam;
    activeKey: string;
}

export default class PropertiesView extends React.Component<{}, State> {
    state: Readonly<State> = { componentParams: new ImmutableMap(), activeKey: '0' };

    componentDidMount(): void {
        window.addEventListener("message", this.onMessage);
    }

    componentWillUnmount(): void {
        window.removeEventListener("message", this.onMessage);
    }

    private onMessage = (event: any) => {
        const messageData = event.data;
        if (messageData.type === MessageType.ComponentParamChanged) {
            const { componentParams, componentParam, activeKey } = this.state;
            const newComponentParams = componentParams.set(messageData.componentParam.index, messageData.componentParam);
            this.setState({
                componentParams: newComponentParams,
                componentParam: newComponentParams.size === 1 ? [...newComponentParams.values()][0] : componentParam,
                activeKey: componentParams.has(messageData.componentParam.index) ? activeKey : messageData.componentParam.index.toString(),
            });
        } if (messageData.type === MessageType.DrawStairModelSettled) {
            if (messageData.componentParams) {
                const componentParamMap: Map<number, ComponentParam> = new Map();
                for (const componentParam of messageData.componentParams) {
                    componentParamMap.set(componentParam.index, componentParam);
                }

                const theComponentParams = new ImmutableMap(componentParamMap);
                const componentParam = [...componentParamMap.values()][0];
                this.setState({ componentParams: theComponentParams, componentParam, activeKey: componentParam.index.toString() });
            } else {
                this.setState({ componentParams: new ImmutableMap(), componentParam: undefined, activeKey: '0' });
            }
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

    render() {
        const { componentParams, componentParam, activeKey } = this.state;
        if (!componentParams.size) {
            return null;
        }
        // const disabled = !this.state.componentParam;
        return (
            <div className='property-wrapper'>
                <Tabs
                    defaultActiveKey={activeKey}
                    activeKey={activeKey}
                    tabPosition="left"
                    className='property-tabs-wrapper'
                    onChange={this.onTabChange}
                    // style={{ height: 500 }}
                    size='small'
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
        )
    }
}