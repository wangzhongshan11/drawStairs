import * as React from 'react'
import "./index.css";
import { ComponentParam, getComponentTitle } from '../../main/tools/DrawStairsTool/types';
import { ImmutableMap } from './ImmutableMap';
import { Tabs } from 'antd';
import PropertiesContent from './PropertyContent';
interface State {
    componentParams: ImmutableMap<number, ComponentParam>;
    componentParam?: ComponentParam;
}

export default class PropertiesView extends React.Component<{}, State> {
    state: Readonly<State> = { componentParams: new ImmutableMap() };

    componentDidMount(): void {
        window.addEventListener("message", this.onMessage);
    }

    componentWillUnmount(): void {
        window.removeEventListener("message", this.onMessage);
    }

    private onMessage = (event: any) => {
        const messageData = event.data;
        if (messageData.type === 'componentParamChanged') {
            const { componentParams, componentParam } = this.state;
            const newComponentParams = componentParams.set(messageData.componentParam.index, messageData.componentParam);
            this.setState({ componentParams: newComponentParams, componentParam: newComponentParams.size === 1 ? [...newComponentParams.values()][0] : componentParam });
        } if (messageData.type === 'drawStairModelSettled') {
            const componentParamMap: Map<number, ComponentParam> = new Map();
            for (const componentParam of messageData.componentParams) {
                componentParamMap.set(componentParam.index, componentParam);
            }

            const theComponentParams = new ImmutableMap(componentParamMap);
            this.setState({ componentParams: theComponentParams, componentParam: [...componentParamMap.values()][0] });
        } else if (messageData?.type?.startsWith('leave')) {
            this.setState({ componentParams: new ImmutableMap(), componentParam: undefined });
        }
    }

    private onTabChange = (activeKey: string) => {
        const { componentParams } = this.state;
        const componentParam = componentParams.get(parseInt(activeKey));
        if (componentParam) {
            this.setState({ componentParam });
        }
    }

    render() {
        const { componentParams, componentParam } = this.state;
        if (!componentParams.size) {
            return null;
        }
        // const disabled = !this.state.componentParam;
        return (
            <div className='property-wrapper'>
                <Tabs
                    defaultActiveKey="1"
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