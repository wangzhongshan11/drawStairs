import * as React from 'react'
import "./index.css";
import InputNumberPropertyArray from './components/InputNumberPropertyArray';
import { ComponentParam, ComponentParamSettings, ComponentParamType, ComponentType } from '../../main/tools/DrawStairsTool/types';
import RadioProperty from './components/RadioProperty';
import InputNumberProperty from './components/InputNumberProperty';

interface State {
    componentParam?: ComponentParam;
}

export default class PropertiesView extends React.Component<{}, State> {
    state: Readonly<State> = {};

    componentDidMount(): void {
        window.addEventListener("message", this.onMessage);
    }

    componentWillUnmount(): void {
        window.removeEventListener("message", this.onMessage);
    }

    private onMessage = (event: any) => {
        const messageData = event.data;
        if (messageData.type === 'componentParamChanged') {
            this.setState({ componentParam: messageData.componentParam });
        } else if (messageData?.type?.startsWith('leave')) {
            this.setState({ componentParam: undefined });
        }
    }

    private getOnChange = (componentParamType: ComponentParamType) => {
        return (value: number | string) => {
            const { componentParam } = this.state;
            if (componentParam) {
                // for (let i = 0; i < componentParamTypes.length; i++) {
                //     const componentParamType = componentParamTypes[i];
                // const a = componentParam[componentParamType];
                (componentParam as any)[componentParamType] = value;
                if (componentParam.type === ComponentType.Platform && componentParamType === ComponentParamType.StartWidth) {
                    componentParam.endWidth = value as number;
                }
                // }
                window.parent.postMessage({ type: 'componentParamChange', componentParam, changeParams: [componentParamType] }, '*');
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
                window.parent.postMessage({ type: 'componentParamChange', componentParam, changeParams: componentParamTypes }, '*');
            }
        }
    }

    render() {
        const { componentParam } = this.state;
        if (!componentParam) {
            return null;
        }
        const { horizontalStep, verticalStep, startWidth, endWidth, offsetWidth, type, upward, platformThickness } = componentParam;
        // const disabled = !this.state.componentParam;
        return (
            <div className='properties-wrapper'>
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
                    onChange={this.getOnArrayChange([ComponentParamType.HorizontalStep, ComponentParamType.VerticalStep]).bind(this)}
                />
                {
                    type !== ComponentType.Platform &&

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
                        onChange={this.getOnArrayChange([ComponentParamType.StartWidth, ComponentParamType.EndWidth]).bind(this)}
                    />}

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
                {type === ComponentType.Platform ? <InputNumberProperty
                    title={ComponentParamSettings[ComponentParamType.PlatformThickness].title}
                    unit={ComponentParamSettings[ComponentParamType.PlatformThickness].unit}
                    value={platformThickness}
                    precision={ComponentParamSettings[ComponentParamType.PlatformThickness].precision}
                    min={ComponentParamSettings[ComponentParamType.PlatformThickness].min}
                    max={ComponentParamSettings[ComponentParamType.PlatformThickness].max}
                    step={ComponentParamSettings[ComponentParamType.PlatformThickness].step}
                    // disabled={disabled}
                    onChange={this.getOnChange(ComponentParamType.PlatformThickness).bind(this)}
                /> : <RadioProperty
                    title={ComponentParamSettings[ComponentParamType.Upward].title}
                    value={upward}
                    radioOptions={ComponentParamSettings[ComponentParamType.Upward].radioOptions}
                    onChange={this.getOnChange(ComponentParamType.Upward).bind(this)}
                />}
                <RadioProperty
                    title={ComponentParamSettings[ComponentParamType.Type].title}
                    value={type}
                    radioOptions={ComponentParamSettings[ComponentParamType.Type].radioOptions}
                    onChange={this.getOnChange(ComponentParamType.Type).bind(this)}
                />

                {/* <InputNumberProperty title='数量' unit='' value={count.value} precision={0} min={count.min} max={count.max} disabled={disabled} onChange={this.getOnChange(PropertyType.Count)} />
                <InputNumberProperty title='缩放' unit='' value={scale.value} precision={0} min={scale.min} max={scale.max} disabled={disabled} onChange={this.getOnChange(PropertyType.Scale)} />
                <SelectProperty title='主轴' value={pathAxis} disabled={disabled} options={pathAxisOptions} onChange={this.getOnChange(PropertyType.PathAxis)} />
                <SelectProperty title='副轴' value={normalAxis} disabled={disabled} options={normalAxisOptions} onChange={this.getOnChange(PropertyType.NormalAxis)} /> */}
            </div>
        )
    }
}