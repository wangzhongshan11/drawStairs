import * as React from 'react'
import "./index.css";
import InputNumberPropertyArray from './components/InputNumberPropertyArray';
import { ComponentParam, ComponentParamSettings, ComponentParamType, ComponentType, DefaultComponentParam } from '../../main/tools/DrawStairsTool/types';
import RadioProperty from './components/RadioProperty';
import InputNumberProperty from './components/InputNumberProperty';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { MessageType } from '../../main/types';

interface Props {
    componentParam?: ComponentParam;
}

interface State {
    componentParam?: ComponentParam;
}

export default class PropertiesContent extends React.Component<Props, State> {
    state: Readonly<State> = { componentParam: this.props.componentParam || { ...DefaultComponentParam } };


    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        this.setState({ componentParam: nextProps.componentParam });
    }
    // componentDidMount(): void {
    //     window.addEventListener("message", this.onMessage);
    // }

    // componentWillUnmount(): void {
    //     window.removeEventListener("message", this.onMessage);
    // }

    // private onMessage = (event: any) => {
    //     const messageData = event.data;
    //     if (messageData.type === 'componentParamChanged') {
    //         this.setState({ componentParam: messageData.componentParam });
    //     } else if (messageData?.type?.startsWith('leave')) {
    //         this.setState({ componentParam: undefined });
    //     }
    // }

    private getOnChange = (componentParamType: ComponentParamType) => {
        return (value: number | string) => {
            const { componentParam } = this.state;
            if (componentParam) {
                // for (let i = 0; i < componentParamTypes.length; i++) {
                //     const componentParamType = componentParamTypes[i];
                // const a = componentParam[componentParamType];
                if (componentParam.type === ComponentType.Platform && componentParamType === ComponentParamType.StartWidth) {
                    const { startWidth } = componentParam;
                    const newWidth = value as number;
                    const delta = newWidth - startWidth;
                    if (delta < 0) {
                        componentParam.startWidth += delta;
                        componentParam.endWidth += delta;
                    } else {
                        componentParam.offsetWidth = delta;
                    }
                } else {
                    if (componentParamType === ComponentParamType.PlatformLength) {
                        componentParam.platformLengthLocked = true;
                    }

                    if (value !== undefined) {
                        (componentParam as any)[componentParamType] = value;
                    }
                }
                // }
                window.parent.postMessage({ type: MessageType.ParamChangedByInput, componentParam, changeParams: [componentParamType] }, '*');
                this.setState({ componentParam: { ...componentParam } });

            }
        }
    }


    private getOnLockChange = (componentParamType: ComponentParamType) => {
        return () => {
            const { componentParam } = this.state;
            if (componentParam) {
                // for (let i = 0; i < componentParamTypes.length; i++) {
                //     const componentParamType = componentParamTypes[i];
                // const a = componentParam[componentParamType];

                if (componentParamType === ComponentParamType.PlatformLengthLocked) {
                    componentParam.platformLengthLocked = !componentParam.platformLengthLocked;

                } else if (componentParamType === ComponentParamType.WidthProportional) {
                    componentParam.widthProportional = !componentParam.widthProportional;
                } else if (componentParamType === ComponentParamType.StepProportional) {
                    componentParam.stepProportional = !componentParam.stepProportional;
                }
                // }
                window.parent.postMessage({ type: MessageType.ParamChangedByInput, componentParam, changeParams: [componentParamType] }, '*');
                this.setState({ componentParam: { ...componentParam } });

            }
        }
    }

    private getOnArrayChange = (componentParamTypes: ComponentParamType[]) => {
        return (values: number[]) => {
            const { componentParam } = this.state;
            if (componentParam) {
                for (let i = 0; i < componentParamTypes.length; i++) {
                    const componentParamType = componentParamTypes[i];
                    // const a = componentParam[componentParamType];
                    // if (componentParamType === ComponentParamType.StartWidth || componentParamType === ComponentParamType.EndWidth) {
                    //     componentParam.tempWidth = values[i];
                    // }
                    (componentParam as any)[componentParamType] = values[i];

                }
                window.parent.postMessage({ type: MessageType.ParamChangedByInput, componentParam, changeParams: componentParamTypes }, '*');
                this.setState({ componentParam: { ...componentParam } });
            }
        }
    }

    render() {
        const { componentParam } = this.state;
        if (!componentParam) {
            return null;
        }
        const {
            horizontalStep, verticalStep, startWidth, endWidth, offsetWidth, platformLength, platformLengthLocked, widthProportional, stepProportional, type, upward,
            platformThickness, modelEditing,
        } = componentParam;
        // const disabled = !this.state.componentParam;
        return (
            <div className='properties-content-wrapper'>
                {
                    type !== ComponentType.Platform &&
                    <div className='start-end-width-wrapper'>
                        <InputNumberPropertyArray
                            title={ComponentParamSettings[ComponentParamType.HorizontalStep].title}
                            units={[ComponentParamSettings[ComponentParamType.HorizontalStep].unit, ComponentParamSettings[ComponentParamType.VerticalStep].unit]}
                            // units={['长', '高']}
                            values={[horizontalStep, verticalStep]}
                            precisions={[ComponentParamSettings[ComponentParamType.HorizontalStep].precision, ComponentParamSettings[ComponentParamType.VerticalStep].precision]}
                            min={[ComponentParamSettings[ComponentParamType.HorizontalStep].min, ComponentParamSettings[ComponentParamType.VerticalStep].min]}
                            max={[ComponentParamSettings[ComponentParamType.HorizontalStep].max, ComponentParamSettings[ComponentParamType.VerticalStep].max]}
                            step={[ComponentParamSettings[ComponentParamType.HorizontalStep].step, ComponentParamSettings[ComponentParamType.VerticalStep].step]}
                            // disabled={disabled}
                            withProportional={stepProportional}
                            onChange={this.getOnArrayChange([ComponentParamType.HorizontalStep, ComponentParamType.VerticalStep]).bind(this)}
                        />
                        {
                            stepProportional ? <LockOutlined className='lock-button' onClick={this.getOnLockChange(ComponentParamType.StepProportional).bind(this)} /> :
                                <UnlockOutlined className='lock-button' onClick={this.getOnLockChange(ComponentParamType.StepProportional).bind(this)} />
                        }
                    </div>
                }

                {
                    type !== ComponentType.Platform &&
                    <div className='start-end-width-wrapper'>
                        <InputNumberPropertyArray
                            title={ComponentParamSettings[ComponentParamType.StartWidth].title}
                            units={[ComponentParamSettings[ComponentParamType.StartWidth].unit, ComponentParamSettings[ComponentParamType.EndWidth].unit]}
                            // units={['长', '高']}
                            values={[startWidth, endWidth]}
                            precisions={[ComponentParamSettings[ComponentParamType.StartWidth].precision, ComponentParamSettings[ComponentParamType.EndWidth].precision]}
                            min={[ComponentParamSettings[ComponentParamType.StartWidth].min, ComponentParamSettings[ComponentParamType.EndWidth].min]}
                            max={[ComponentParamSettings[ComponentParamType.StartWidth].max, ComponentParamSettings[ComponentParamType.EndWidth].max]}
                            step={[ComponentParamSettings[ComponentParamType.StartWidth].step, ComponentParamSettings[ComponentParamType.EndWidth].step]}
                            // disabled={disabled}
                            withProportional={widthProportional}
                            onChange={this.getOnArrayChange([ComponentParamType.StartWidth, ComponentParamType.EndWidth]).bind(this)}
                        />
                        {
                            widthProportional ? <LockOutlined className='lock-button' onClick={this.getOnLockChange(ComponentParamType.WidthProportional).bind(this)} /> :
                                <UnlockOutlined className='lock-button' onClick={this.getOnLockChange(ComponentParamType.WidthProportional).bind(this)} />
                        }
                    </div>
                }

                {
                    type !== ComponentType.Platform && <RadioProperty
                        title={ComponentParamSettings[ComponentParamType.Upward].title}
                        value={upward}
                        radioOptions={ComponentParamSettings[ComponentParamType.Upward].radioOptions}
                        onChange={this.getOnChange(ComponentParamType.Upward).bind(this)}
                    />
                }

                {
                    type === ComponentType.Platform &&
                    <InputNumberProperty
                        title={ComponentParamSettings[ComponentParamType.StartWidth].title}
                        unit={ComponentParamSettings[ComponentParamType.StartWidth].unit}
                        value={startWidth + Math.abs(offsetWidth)}
                        precision={ComponentParamSettings[ComponentParamType.StartWidth].precision}
                        min={ComponentParamSettings[ComponentParamType.StartWidth].min}
                        max={ComponentParamSettings[ComponentParamType.StartWidth].max}
                        step={ComponentParamSettings[ComponentParamType.StartWidth].step}
                        // disabled={disabled}
                        onChange={this.getOnChange(ComponentParamType.StartWidth).bind(this)}
                    />}
                {
                    type === ComponentType.Platform &&
                    <div className='platform-length-wrapper'>
                        <InputNumberProperty
                            title={ComponentParamSettings[ComponentParamType.PlatformLength].title}
                            unit={ComponentParamSettings[ComponentParamType.PlatformLength].unit}
                            value={Math.ceil(platformLength)}
                            precision={ComponentParamSettings[ComponentParamType.PlatformLength].precision}
                            min={ComponentParamSettings[ComponentParamType.PlatformLength].min}
                            max={ComponentParamSettings[ComponentParamType.PlatformLength].max}
                            step={ComponentParamSettings[ComponentParamType.PlatformLength].step}
                            // disabled={disabled}
                            onChange={this.getOnChange(ComponentParamType.PlatformLength).bind(this)}
                        />
                        {
                            !modelEditing && (platformLengthLocked ? <LockOutlined className='lock-button' onClick={this.getOnLockChange(ComponentParamType.PlatformLengthLocked).bind(this)} /> :
                                <UnlockOutlined className='lock-button' onClick={this.getOnLockChange(ComponentParamType.PlatformLengthLocked).bind(this)} />)
                        }
                    </div>
                }

                {type === ComponentType.Platform && <InputNumberProperty
                    title={ComponentParamSettings[ComponentParamType.PlatformThickness].title}
                    unit={ComponentParamSettings[ComponentParamType.PlatformThickness].unit}
                    value={platformThickness}
                    precision={ComponentParamSettings[ComponentParamType.PlatformThickness].precision}
                    min={ComponentParamSettings[ComponentParamType.PlatformThickness].min}
                    max={ComponentParamSettings[ComponentParamType.PlatformThickness].max}
                    step={ComponentParamSettings[ComponentParamType.PlatformThickness].step}
                    // disabled={disabled}
                    onChange={this.getOnChange(ComponentParamType.PlatformThickness).bind(this)}
                />}

                {!modelEditing && <RadioProperty
                    title={ComponentParamSettings[ComponentParamType.Type].title}
                    value={type}
                    radioOptions={ComponentParamSettings[ComponentParamType.Type].radioOptions}
                    onChange={this.getOnChange(ComponentParamType.Type).bind(this)}
                />}
                </div>
        )
    }
}