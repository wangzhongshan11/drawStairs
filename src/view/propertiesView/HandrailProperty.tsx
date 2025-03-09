import * as React from 'react'
import "./index.css";
import { ColumnType, ComponentParamSettings, ComponentParamType, DefaultStairParam, RailType, StairParam } from '../../main/tools/DrawStairsTool/types';
import InputNumberProperty from './components/InputNumberProperty';
import SelectProperty from './components/SelectProperty';
import SwitchProperty from './components/SwitchProperty';

interface Props {
    stairParam?: StairParam;
    getOnHandrailChange?: (componentParamType: ComponentParamType) => (value: number | string) => void;
    getOnHandrailSwitchChange?: (componentParamType: ComponentParamType) => (checked: boolean) => void;
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
        const { getOnHandrailChange } = this.props;
        if (getOnHandrailChange) {
            return getOnHandrailChange(componentParamType);
        }

    }

    private getOnSwitchChange = (componentParamType: ComponentParamType) => {
        const { getOnHandrailSwitchChange } = this.props;
        if (getOnHandrailSwitchChange) {
            return getOnHandrailSwitchChange(componentParamType);
        }
    }

    render() {
        const { stairParam } = this.state;
        if (!stairParam) {
            return null;
        }
        const { handrail: { support, height, rail, column } } = stairParam;
        // const disabled = !this.state.componentParam;
        return (
            <div className='handrail-property-wrapper'>
                <SwitchProperty title={ComponentParamSettings[ComponentParamType.Handrail].title} checked={support} onChange={this.getOnSwitchChange(ComponentParamType.Handrail)} />
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
                        onChange={this.getOnChange(ComponentParamType.HandrailHeight)?.bind(this)}
                    />
                    <div className='rail-property'>
                        <div className='rail-title'>扶手：</div>
                        <SelectProperty
                            title={ComponentParamSettings[ComponentParamType.Handrail].rail.type.title}
                            value={rail.type}
                            selectOptions={ComponentParamSettings[ComponentParamType.Handrail].rail.type.selectOptions}
                            onChange={this.getOnChange(ComponentParamType.HandrailRailType)?.bind(this)}
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
                                    onChange={this.getOnChange(ComponentParamType.HandrailRailRadius)?.bind(this)}
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
                                        onChange={this.getOnChange(ComponentParamType.HandrailRailWidth)?.bind(this)}
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
                                        onChange={this.getOnChange(ComponentParamType.HandrailRailHeight)?.bind(this)}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                    <div className='column-property'>
                        <div className='column-title'>柱子：</div>
                        <SelectProperty
                            title={ComponentParamSettings[ComponentParamType.Handrail].column.type.title}
                            value={column.type}
                            selectOptions={ComponentParamSettings[ComponentParamType.Handrail].column.type.selectOptions}
                            onChange={this.getOnChange(ComponentParamType.HandrailColumnType)?.bind(this)}
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
                                    onChange={this.getOnChange(ComponentParamType.HandrailColumnRadius)?.bind(this)}
                                />
                            }
                            {column.type === ColumnType.Rect && column.param.width !== undefined && column.param.height !== undefined &&
                                <div className='rect-param'>
                                    <InputNumberProperty
                                        title={ComponentParamSettings[ComponentParamType.Handrail].componentParam.width.title}
                                        unit={ComponentParamSettings[ComponentParamType.Handrail].componentParam.width.unit}
                                        value={column.param.width}
                                        precision={ComponentParamSettings[ComponentParamType.Handrail].componentParam.width.precision}
                                        min={ComponentParamSettings[ComponentParamType.Handrail].componentParam.width.min}
                                        max={ComponentParamSettings[ComponentParamType.Handrail].componentParam.width.max}
                                        step={ComponentParamSettings[ComponentParamType.Handrail].componentParam.width.step}
                                        // disabled={disabled}
                                        onChange={this.getOnChange(ComponentParamType.HandrailColumnWidth)?.bind(this)}
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
                                        onChange={this.getOnChange(ComponentParamType.HandrailColumnHeight)?.bind(this)}
                                    />
                                </div>
                            }
                        </div>
                    </div>

                    <div className='column-step-property'>
                        <InputNumberProperty
                            title={ComponentParamSettings[ComponentParamType.Handrail].column.step.title}
                            unit={ComponentParamSettings[ComponentParamType.Handrail].column.step.unit}
                            value={column.step}
                            precision={ComponentParamSettings[ComponentParamType.Handrail].column.step.precision}
                            min={ComponentParamSettings[ComponentParamType.Handrail].column.step.min}
                            max={ComponentParamSettings[ComponentParamType.Handrail].column.step.max}
                            step={ComponentParamSettings[ComponentParamType.Handrail].column.step.step}

                            // disabled={disabled}
                            onChange={this.getOnChange(ComponentParamType.HandrailColumnStep)?.bind(this)}
                        />
                    </div>
                </div>}
            </div>
        )
    }
}