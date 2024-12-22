import * as React from 'react';
import { Tooltip } from 'antd';
import "./index.css";
import "../assets/drawStairs.svg";

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
}

const tools: ToolItem[] = [
    {
        name: "楼梯绘制",
        type: ToolType.Context,
        key: "DrawStairsTool",
        tip: "楼梯绘制工具",
        icon: "drawStairs",
    },
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
        if (messageData?.type?.startsWith('leave')) {
            this.setState({ activeToolKey: undefined });
        }
        console.log(messageData.type);
    }

    private onClick = (toolItem: ToolItem) => {
        const { activeToolKey } = this.state;
        if (activeToolKey === toolItem.key) {
            window.parent.postMessage({ type: `deActivate${toolItem.key}` }, '*');
            this.setState({ activeToolKey: undefined });
        } else {
            window.parent.postMessage({ type: `activate${toolItem.key}` }, '*');
            this.setState({ activeToolKey: toolItem.key });
        }
        if (toolItem.key === "PatchMakeGroupTool") {
            setTimeout(() => {
                window.parent.postMessage({ type: `deActivate${toolItem.key}` }, '*');
                this.setState({ activeToolKey: undefined });
            }, 50);
        }
        // console.log('active: ' + !active)
    }

    render() {
        const { activeToolKey } = this.state;
        return <div className='tools-wrapper'>
            {tools.map((toolItem, index) => {
                const className = activeToolKey === toolItem.key ? 'tool-button-active' : 'button tool-button-normal';
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
    }
}

