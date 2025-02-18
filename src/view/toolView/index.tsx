import * as React from 'react';
import { Tooltip } from 'antd';
import "./index.css";
import "../assets/drawStairs.svg";
import { ComponentType } from '../../main/tools/DrawStairsTool/types';
import { Divider } from 'antd';
import { MessageType } from '../../main/types';

enum ToolType {
    Context = 0,
    Apply = 1,
}

interface ToolItem {
    name: string;
    type: ToolType;
    key: string;
    icon?: string;
    tip?: string;
    tipImg?: string;
    componentType: ComponentType,
}

const tools: ToolItem[] = [
    {
        name: "阶梯绘制",
        type: ToolType.Context,
        key: "StraightStairsTool",
        tip: "阶梯绘制",
        icon: "drawStairs",
        componentType: ComponentType.StraightStair,
    },
    // {
    //     name: "旋转阶梯",
    //     type: ToolType.Context,
    //     key: "CircularStairsTool",
    //     tip: "旋转阶梯绘制",
    //     icon: "drawStairs",
    //     componentType: ComponentType.CircularStair,
    // },
]

interface State {
    activeToolKey?: string;
}

export default class ToolView extends React.Component<{}, State> {
    state: Readonly<State> = { activeToolKey: undefined };

    componentDidMount(): void {
        window.addEventListener("message", this.onMessage);
    }

    componentWillUnmount(): void {
        window.removeEventListener("message", this.onMessage);
    }

    private onMessage = (event: any) => {
        const messageData = event.data;
        if (messageData?.type === MessageType.LeaveDrawStairsTool || (messageData?.type === MessageType.DrawStairModelSettled && !messageData.newStair)) {
            this.setState({ activeToolKey: undefined });
        }
    }

    private onClick = (toolItem: ToolItem) => {
        const { activeToolKey } = this.state;
        if (activeToolKey === toolItem.key) {
            window.parent.postMessage({ type: MessageType.DeActivateDrawStairsTool }, '*');
            this.setState({ activeToolKey: undefined });
        } else {
            window.parent.postMessage({ type: MessageType.ActivateDrawStairsTool, componentType: toolItem.componentType }, '*');
            this.setState({ activeToolKey: toolItem.key });
        }
    }

    render() {
        const { activeToolKey } = this.state;
        return <>
            <div className='tools-wrapper'>
                {tools.map((toolItem, index) => {
                    const className = activeToolKey === toolItem.key ? 'button-active' : 'button button-normal';
                    return <div className='button-wrapper' key={toolItem.key}>
                        <Tooltip title={toolItem.name} color={"#f9f6b3"} overlayInnerStyle={{ color: "black" }}>
                            <button
                                className={`button ${className}`}
                                onClick={this.onClick.bind(this, toolItem)}
                            >
                                <svg className={`svg-icon`} >
                                    <use xlinkHref={`#${toolItem.icon}`} />
                                </svg>
                            </button>
                        </Tooltip>

                    </div>
                })}
            </div>
            <Divider style={{ borderColor: 'black', margin: '6px 0' }}>{activeToolKey ? "阶梯参数" : "使用教程"}</Divider>
        </>
    }
}

