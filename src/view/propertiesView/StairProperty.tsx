import * as React from 'react'
import "./index.css";
import { ColumnType, ComponentParamSettings, ComponentParamType, ComponentType, DefaultStairParam, RailType, StairParam } from '../../main/tools/DrawStairsTool/types';
import InputNumberProperty from './components/InputNumberProperty';
import { MessageType } from '../../main/types';
import SelectProperty from './components/SelectProperty';
import InputNumberPropertyArray from './components/InputNumberPropertyArray';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import SwitchProperty from './components/SwitchProperty';
import RadioProperty from './components/RadioProperty';

interface Props {
    stairParam?: StairParam;
}

interface State {
    stairParam?: StairParam;
}

export default class PropertiesContent extends React.Component<Props, State> {
    state: Readonly<State> = { stairParam: this.props.stairParam || { ...DefaultStairParam } };

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        this.setState({ stairParam: nextProps.stairParam });
    }

    private getOnChange = (componentParamType: ComponentParamType) => {
        return (value: number | string) => {
            const { stairParam } = this.state;
                if (componentParam.type === ComponentType.Platform && componentParamType === ComponentParamType.StartWidth) {
                    const { startWidth, offsetWidth } = componentParam;
                    const newWidth = value as number;
                    const delta = newWidth - startWidth;
                    if (delta <= 0 || offsetWidth === 0) {
                        componentParam.startWidth += delta;
                        componentParam.endWidth += delta;
                        componentParam.offsetWidth = 0;
                    } else {
                        componentParam.offsetWidth = componentParam.offsetWidth > 0 ? delta : -delta;
                    }
                } else {
                    if (componentParamType === ComponentParamType.PlatformLength) {
                        componentParam.platformLengthLocked = true;
                    }

                    if (value !== undefined) {
                        (componentParam as any)[componentParamType] = value;
                    }
                }
                window.parent.postMessage({ type: MessageType.ParamChangedByInput, componentParam, changeParams: [componentParamType] }, '*');
                this.setState({ stairParam: { ...stairParam } });
        }
    }


    private getOnLockChange = (componentParamType: ComponentParamType) => {
        return () => {
            const { stairParam } = this.state;
            if (stairParam) {
                if (componentParamType === ComponentParamType.StepProportional) {
                    stairParam.stepProportional = !stairParam.stepProportional;
                }
                window.parent.postMessage({ type: MessageType.StairParamChangedByInput, stairParam, changeParams: [componentParamType] }, '*');
                this.setState({ stairParam: { ...stairParam } });

            }
        }
    }

    private getOnSwitchChange = (componentParamType: ComponentParamType) => {
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

    private getOnArrayChange = (componentParamTypes: ComponentParamType[]) => {
        return (values: number[]) => {
            const { stairParam } = this.state;
            if (stairParam) {
                for (let i = 0; i < componentParamTypes.length; i++) {
                    const componentParamType = componentParamTypes[i];
                    (stairParam as any)[componentParamType] = values[i];
                }
                window.parent.postMessage({ type: MessageType.StairParamChangedByInput, stairParam, changeParams: componentParamTypes }, '*');
                this.setState({ stairParam: { ...stairParam } });
            }
        }
    }

    render() {
        const { stairParam } = this.state;
        if (!stairParam) {
            return null;
        }
        const { horizontalStep, verticalStep, upward, platformThickness, handrail: { support, height, rail, column }, stepProportional, } = stairParam;
        // const disabled = !this.state.componentParam;
        return (
            <div className='stair-property-wrapper'>

                <div className='step-wrapper'>
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
                <RadioProperty
                    title={ComponentParamSettings[ComponentParamType.Upward].title}
                    value={upward}
                    radioOptions={ComponentParamSettings[ComponentParamType.Upward].radioOptions}
                    onChange={this.getOnChange(ComponentParamType.Upward).bind(this)}
                />
                <InputNumberProperty
                    title={ComponentParamSettings[ComponentParamType.PlatformThickness].title}
                    unit={ComponentParamSettings[ComponentParamType.PlatformThickness].unit}
                    value={platformThickness}
                    precision={ComponentParamSettings[ComponentParamType.PlatformThickness].precision}
                    min={ComponentParamSettings[ComponentParamType.PlatformThickness].min}
                    max={ComponentParamSettings[ComponentParamType.PlatformThickness].max}
                    step={ComponentParamSettings[ComponentParamType.PlatformThickness].step}
                    // disabled={disabled}
                    onChange={this.getOnChange(ComponentParamType.PlatformThickness).bind(this)}
                />

                <div className='handrail-property-wrapper'>
                    <SwitchProperty title={ComponentParamSettings[ComponentParamType.HorizontalStep].title} checked={support} onChange={this.getOnSwitchChange(ComponentParamType.Handrail)} />
                    {support && <div className='handrail-property'>
                        <InputNumberProperty
                            title={ComponentParamSettings[ComponentParamType.Handrail].height.title}
                            unit={ComponentParamSettings[ComponentParamType.Handrail].height.unit}
                            value={height}
                            precision={ComponentParamSettings[ComponentParamType.Handrail].height.precision}
                            min={ComponentParamSettings[ComponentParamType.Handrail].height.min}
                            max={ComponentParamSettings[ComponentParamType.Handrail].height.max}
                            step={ComponentParamSettings[ComponentParamType.Handrail].height.step}
                            // disabled={disabled}
                            onChange={this.getOnChange(ComponentParamType.Handrail).bind(this)}
                        />
                        <div className='rail-property'>
                            <SelectProperty
                                title={ComponentParamSettings[ComponentParamType.Handrail].rail.type.title}
                                value={rail.type}
                                selectOptions={ComponentParamSettings[ComponentParamType.Handrail].rail.type.selectOptions}
                                onChange={this.getOnChange(ComponentParamType.Handrail).bind(this)}
                            />
                            <div className='rail-param-property'>
                                {rail.type === RailType.Circle && rail.param.radius !== undefined &&
                                    <InputNumberProperty
                                        title={ComponentParamSettings[ComponentParamType.Handrail].componentParam.radius.title}
                                        unit={ComponentParamSettings[ComponentParamType.Handrail].componentParam.radius.unit}
                                        value={rail.param.radius}
                                        precision={ComponentParamSettings[ComponentParamType.Handrail].componentParam.radius.precision}
                                        min={ComponentParamSettings[ComponentParamType.Handrail].componentParam.radius.min}
                                        max={ComponentParamSettings[ComponentParamType.Handrail].componentParam.radius.max}
                                        step={ComponentParamSettings[ComponentParamType.Handrail].componentParam.radius.step}
                                        // disabled={disabled}
                                        onChange={this.getOnChange(ComponentParamType.Handrail).bind(this)}
                                    />
                                }
                                {rail.type === RailType.Rect && rail.param.width !== undefined && rail.param.height !== undefined &&
                                    <div className='rect-param'>
                                        <InputNumberProperty
                                            title={ComponentParamSettings[ComponentParamType.Handrail].componentParam.width.title}
                                            unit={ComponentParamSettings[ComponentParamType.Handrail].componentParam.width.unit}
                                            value={rail.param.width}
                                            precision={ComponentParamSettings[ComponentParamType.Handrail].componentParam.width.precision}
                                            min={ComponentParamSettings[ComponentParamType.Handrail].componentParam.width.min}
                                            max={ComponentParamSettings[ComponentParamType.Handrail].componentParam.width.max}
                                            step={ComponentParamSettings[ComponentParamType.Handrail].componentParam.width.step}
                                            // disabled={disabled}
                                            onChange={this.getOnChange(ComponentParamType.Handrail).bind(this)}
                                        />
                                        <InputNumberProperty
                                            title={ComponentParamSettings[ComponentParamType.Handrail].componentParam.height.title}
                                            unit={ComponentParamSettings[ComponentParamType.Handrail].componentParam.height.unit}
                                            value={rail.param.height}
                                            precision={ComponentParamSettings[ComponentParamType.Handrail].componentParam.height.precision}
                                            min={ComponentParamSettings[ComponentParamType.Handrail].componentParam.height.min}
                                            max={ComponentParamSettings[ComponentParamType.Handrail].componentParam.height.max}
                                            step={ComponentParamSettings[ComponentParamType.Handrail].componentParam.height.step}
                                            // disabled={disabled}
                                            onChange={this.getOnChange(ComponentParamType.Handrail).bind(this)}
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='column-property'>
                            <SelectProperty
                                title={ComponentParamSettings[ComponentParamType.Handrail].column.type.title}
                                value={column.type}
                                selectOptions={ComponentParamSettings[ComponentParamType.Handrail].column.type.selectOptions}
                                onChange={this.getOnChange(ComponentParamType.Handrail).bind(this)}
                            />
                            <div className='column-param-property'>
                                {column.type === ColumnType.Circle && column.param.radius !== undefined &&
                                    <InputNumberProperty
                                        title={ComponentParamSettings[ComponentParamType.Handrail].componentParam.radius.title}
                                        unit={ComponentParamSettings[ComponentParamType.Handrail].componentParam.radius.unit}
                                        value={column.param.radius}
                                        precision={ComponentParamSettings[ComponentParamType.Handrail].componentParam.radius.precision}
                                        min={ComponentParamSettings[ComponentParamType.Handrail].componentParam.radius.min}
                                        max={ComponentParamSettings[ComponentParamType.Handrail].componentParam.radius.max}
                                        step={ComponentParamSettings[ComponentParamType.Handrail].componentParam.radius.step}
                                        // disabled={disabled}
                                        onChange={this.getOnChange(ComponentParamType.Handrail).bind(this)}
                                    />
                                }
                                {column.type === ColumnType.Rect && column.param.width !== undefined && column.param.height !== undefined &&
                                    <div className='column-param'>
                                        <InputNumberProperty
                                            title={ComponentParamSettings[ComponentParamType.Handrail].componentParam.width.title}
                                            unit={ComponentParamSettings[ComponentParamType.Handrail].componentParam.width.unit}
                                            value={column.param.width}
                                            precision={ComponentParamSettings[ComponentParamType.Handrail].componentParam.width.precision}
                                            min={ComponentParamSettings[ComponentParamType.Handrail].componentParam.width.min}
                                            max={ComponentParamSettings[ComponentParamType.Handrail].componentParam.width.max}
                                            step={ComponentParamSettings[ComponentParamType.Handrail].componentParam.width.step}
                                            // disabled={disabled}
                                            onChange={this.getOnChange(ComponentParamType.Handrail).bind(this)}
                                        />
                                        <InputNumberProperty
                                            title={ComponentParamSettings[ComponentParamType.Handrail].componentParam.height.title}
                                            unit={ComponentParamSettings[ComponentParamType.Handrail].componentParam.height.unit}
                                            value={column.param.height}
                                            precision={ComponentParamSettings[ComponentParamType.Handrail].componentParam.height.precision}
                                            min={ComponentParamSettings[ComponentParamType.Handrail].componentParam.height.min}
                                            max={ComponentParamSettings[ComponentParamType.Handrail].componentParam.height.max}
                                            step={ComponentParamSettings[ComponentParamType.Handrail].componentParam.height.step}
                                            // disabled={disabled}
                                            onChange={this.getOnChange(ComponentParamType.Handrail).bind(this)}
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        )
    }
}