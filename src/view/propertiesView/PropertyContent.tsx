import * as React from 'react'
import "./index.css";
import InputNumberPropertyArray from './components/InputNumberPropertyArray';
import { ComponentParam, ComponentParamSettings, ComponentParamType, ComponentType, DefaultComponentParam, DefaultStairParam, MaterialAssignType, StairParam } from '../../main/tools/DrawStairsTool/types';
import RadioProperty from './components/RadioProperty';
import InputNumberProperty from './components/InputNumberProperty';
import { DeleteOutlined, LockOutlined, PlusOutlined, UndoOutlined, UnlockOutlined } from '@ant-design/icons';
import { MessageType } from '../../main/types';
import { Button, Divider } from 'antd';

interface Props {
    componentParam?: ComponentParam;
    stairParam?: StairParam;
    isDrawing?: boolean;
    materialAssignType?: MaterialAssignType | number;
    getOnMaterialReplaceClick?: (componentParamType: ComponentParamType, index?: number) => () => void;
    getOnMaterialDeleteClick?: (componentParamType: ComponentParamType, index?: number) => () => void;
}

interface State {
    componentParam?: ComponentParam;
    stairParam?: StairParam;
}

export default class ProperyContent extends React.Component<Props, State> {
    state: Readonly<State> = { componentParam: this.props.componentParam || { ...DefaultComponentParam }, stairParam: this.props.stairParam || { ...DefaultStairParam } };

    // componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
    //     if (this.props.componentParam !== prevProps.componentParam || this.props.stairParam !== prevProps.stairParam) {
    //         this.setState({ componentParam: this.props.componentParam, stairParam: this.props.stairParam, });
    //     }
    // }

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        if (this.props.componentParam !== nextProps.componentParam || this.props.stairParam !== nextProps.stairParam) {
            this.setState({ componentParam: nextProps.componentParam, stairParam: nextProps.stairParam, });
        }
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
                if (componentParam.type === ComponentType.Platform && componentParamType === ComponentParamType.StartWidth) {
                    const { startWidth, offsetWidth } = componentParam;
                    const newWidth = value as number;
                    if (newWidth === (startWidth + Math.abs(offsetWidth))) {
                        return;
                    }
                    const delta = newWidth - startWidth;
                    if (delta <= 0 || offsetWidth === 0) {
                        componentParam.startWidth += delta;
                        componentParam.endWidth += delta;
                        componentParam.offsetWidth = 0;
                    } else {
                        componentParam.offsetWidth = offsetWidth > 0 ? delta : -delta;
                    }
                } else {
                    if (value === (componentParam as any)[componentParamType]) {
                        return;
                    }
                    if (componentParamType === ComponentParamType.PlatformLength) {
                        componentParam.platformLengthLocked = true;
                    } else if (componentParamType === ComponentParamType.Type) {
                        if (value === ComponentType.Platform) {
                            if (componentParam.type !== ComponentType.Platform) {
                                componentParam.startWidth = 4 * componentParam.startWidth;
                                componentParam.endWidth = componentParam.startWidth;
                            }
                        } else {
                            if (componentParam.type === ComponentType.Platform) {
                                componentParam.startWidth = componentParam.startWidth / 4;
                                componentParam.endWidth = componentParam.startWidth;
                            }
                        }
                    }

                    if (value !== undefined) {
                        (componentParam as any)[componentParamType] = value;
                    }
                }
                window.parent.postMessage({ type: MessageType.ParamChangedByInput, componentParam, changeParams: [componentParamType] }, '*');
                this.setState({ componentParam: { ...componentParam } });
            }
        }
    }


    private getOnLockChange = (componentParamType: ComponentParamType) => {
        return () => {
            const { componentParam } = this.state;
            if (componentParam) {
                if (componentParamType === ComponentParamType.PlatformLengthLocked) {
                    componentParam.platformLengthLocked = !componentParam.platformLengthLocked;
                } else if (componentParamType === ComponentParamType.WidthProportional) {
                    componentParam.widthProportional = !componentParam.widthProportional;
                } else if (componentParamType === ComponentParamType.StepProportional) {
                    componentParam.stepProportional = !componentParam.stepProportional;
                }
                window.parent.postMessage({ type: MessageType.ParamChangedByInput, componentParam, changeParams: [componentParamType] }, '*');
                this.setState({ componentParam: { ...componentParam } });

            }
        }
    }

    private getOnArrayChange = (componentParamTypes: ComponentParamType[]) => {
        return (values: number[]) => {
            const { componentParam } = this.state;
            if (componentParam) {
                let changed = false;
                for (let i = 0; i < componentParamTypes.length; i++) {
                    const componentParamType = componentParamTypes[i];
                    if (values[i] !== (componentParam as any)[componentParamType]) {
                        (componentParam as any)[componentParamType] = values[i];
                        changed = true;
                    }
                }
                if (changed) {
                    window.parent.postMessage({ type: MessageType.ParamChangedByInput, componentParam, changeParams: componentParamTypes }, '*');
                    this.setState({ componentParam: { ...componentParam } });
                }
            }
        }
    }

    private getOnChangeOverall = (componentParamType: ComponentParamType) => {
        return (value: number | string) => {
            const { stairParam } = this.state;
            if (stairParam) {
                if (value === (stairParam as any)[componentParamType]) {
                    return;
                }
                (stairParam as any)[componentParamType] = value;
                window.parent.postMessage({ type: MessageType.StairParamChangedByInput, stairParam, changeParams: [componentParamType] }, '*');
                this.setState({ stairParam: { ...stairParam } });
            }
        }
    }


    private getOnLockChangeOverall = (componentParamType: ComponentParamType) => {
        return () => {
            const { stairParam } = this.state;
            if (stairParam) {
                if (componentParamType === ComponentParamType.StepProportional) {
                    stairParam.stepProportional = !stairParam.stepProportional;
                } if (componentParamType === ComponentParamType.WidthProportional) {
                    stairParam.widthProportional = !stairParam.widthProportional;
                }
                window.parent.postMessage({ type: MessageType.StairParamChangedByInput, stairParam, changeParams: [componentParamType] }, '*');
                this.setState({ stairParam: { ...stairParam } });
            }
        }
    }

    private getOnArrayChangeOverall = (componentParamTypes: ComponentParamType[]) => {
        return (values: number[]) => {
            const { stairParam } = this.state;
            if (stairParam) {
                let changed = false;
                for (let i = 0; i < componentParamTypes.length; i++) {
                    const componentParamType = componentParamTypes[i];
                    if (values[i] !== (stairParam as any)[componentParamType]) {
                        (stairParam as any)[componentParamType] = values[i];
                        changed = true;
                    }
                }
                if (changed) {
                    window.parent.postMessage({ type: MessageType.StairParamChangedByInput, stairParam, changeParams: componentParamTypes }, '*');
                    this.setState({ stairParam: { ...stairParam } });
                }
            }
        }
    }

    private getOnMaterialReplaceClick = (componentParamType: ComponentParamType, index?: number) => {
        const { getOnMaterialReplaceClick } = this.props;
        if (getOnMaterialReplaceClick) {
            return getOnMaterialReplaceClick(componentParamType, index);
        }
    }

    private getOnMaterialDeleteClick = (componentParamType: ComponentParamType, index?: number) => {
        const { getOnMaterialDeleteClick } = this.props;
        if (getOnMaterialDeleteClick) {
            return getOnMaterialDeleteClick(componentParamType, index);
        }
    }

    render() {
        const { componentParam, stairParam } = this.state;
        if (!componentParam || !stairParam) {
            return null;
        }
        const { isDrawing, materialAssignType } = this.props;
        const {
            horizontalStep, verticalStep, startWidth, endWidth, offsetWidth, platformLength, platformLengthLocked, widthProportional, stepProportional, type, upward,
            platformThickness, modelEditing, material, index
        } = componentParam;
        const { stairMaterial, platformMaterial } = stairParam;
        // const disabled = !this.state.componentParam;
        return (
            <div className='properties-content-wrapper'>
                <div className='separate-properties'>
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
                    {!isDrawing && <div className='material-property-wrapper'>
                        <div className='title'>{ComponentParamSettings.material.title}</div>
                        <div className='mateiral-buttons'>
                            <Button className={materialAssignType === componentParam.index ? 'assigning' : ''} type="text" size="small" shape="circle" icon={material ? <UndoOutlined /> : <PlusOutlined />} onClick={this.getOnMaterialReplaceClick(ComponentParamType.ComponentMaterial, index)} />
                            {material && <Button type="text" size="small" shape="circle" icon={<DeleteOutlined />} onClick={this.getOnMaterialDeleteClick(ComponentParamType.ComponentMaterial, index)} />}
                        </div>
                    </div>}
                </div>
                <Divider className='property-divider' >{type === ComponentType.Platform ? '平台' : '阶梯'}整体参数</Divider>
                <div className='overall-properties'>
                    {type !== ComponentType.Platform && <div className='start-end-width-wrapper'>
                        <InputNumberPropertyArray
                            title={ComponentParamSettings[ComponentParamType.StartWidth].title}
                            units={[ComponentParamSettings[ComponentParamType.StartWidth].unit, ComponentParamSettings[ComponentParamType.EndWidth].unit]}
                            // units={['长', '高']}
                            values={[stairParam.startWidth, stairParam.endWidth]}
                            precisions={[ComponentParamSettings[ComponentParamType.StartWidth].precision, ComponentParamSettings[ComponentParamType.EndWidth].precision]}
                            min={[ComponentParamSettings[ComponentParamType.StartWidth].min, ComponentParamSettings[ComponentParamType.EndWidth].min]}
                            max={[ComponentParamSettings[ComponentParamType.StartWidth].max, ComponentParamSettings[ComponentParamType.EndWidth].max]}
                            step={[ComponentParamSettings[ComponentParamType.StartWidth].step, ComponentParamSettings[ComponentParamType.EndWidth].step]}
                            // disabled={disabled}
                            withProportional={stairParam.widthProportional}
                            onChange={this.getOnArrayChangeOverall([ComponentParamType.StartWidth, ComponentParamType.EndWidth]).bind(this)}
                        />
                        {
                            stairParam.widthProportional ? <LockOutlined className='lock-button' onClick={this.getOnLockChangeOverall(ComponentParamType.WidthProportional).bind(this)} /> :
                                <UnlockOutlined className='lock-button' onClick={this.getOnLockChangeOverall(ComponentParamType.WidthProportional).bind(this)} />
                        }
                    </div>}
                    {type !== ComponentType.Platform &&
                        <div className='start-end-width-wrapper'>
                            <InputNumberPropertyArray
                                title={ComponentParamSettings[ComponentParamType.HorizontalStep].title}
                                units={[ComponentParamSettings[ComponentParamType.HorizontalStep].unit, ComponentParamSettings[ComponentParamType.VerticalStep].unit]}
                                // units={['长', '高']}
                                values={[stairParam.horizontalStep, stairParam.verticalStep]}
                                precisions={[ComponentParamSettings[ComponentParamType.HorizontalStep].precision, ComponentParamSettings[ComponentParamType.VerticalStep].precision]}
                                min={[ComponentParamSettings[ComponentParamType.HorizontalStep].min, ComponentParamSettings[ComponentParamType.VerticalStep].min]}
                                max={[ComponentParamSettings[ComponentParamType.HorizontalStep].max, ComponentParamSettings[ComponentParamType.VerticalStep].max]}
                                step={[ComponentParamSettings[ComponentParamType.HorizontalStep].step, ComponentParamSettings[ComponentParamType.VerticalStep].step]}
                                // disabled={disabled}
                                withProportional={stairParam.stepProportional}
                                onChange={this.getOnArrayChangeOverall([ComponentParamType.HorizontalStep, ComponentParamType.VerticalStep]).bind(this)}
                            />
                            {
                                stairParam.stepProportional ? <LockOutlined className='lock-button' onClick={this.getOnLockChangeOverall(ComponentParamType.StepProportional).bind(this)} /> :
                                    <UnlockOutlined className='lock-button' onClick={this.getOnLockChangeOverall(ComponentParamType.StepProportional).bind(this)} />
                            }
                        </div>}
                    {type !== ComponentType.Platform && <RadioProperty
                        title={ComponentParamSettings[ComponentParamType.Upward].title}
                        value={stairParam.upward}
                        radioOptions={ComponentParamSettings[ComponentParamType.Upward].radioOptions}
                        onChange={this.getOnChangeOverall(ComponentParamType.Upward).bind(this)}
                    />}
                    {type === ComponentType.Platform && <InputNumberProperty
                        title={ComponentParamSettings[ComponentParamType.PlatformThickness].title}
                        unit={ComponentParamSettings[ComponentParamType.PlatformThickness].unit}
                        value={stairParam.platformThickness}
                        precision={ComponentParamSettings[ComponentParamType.PlatformThickness].precision}
                        min={ComponentParamSettings[ComponentParamType.PlatformThickness].min}
                        max={ComponentParamSettings[ComponentParamType.PlatformThickness].max}
                        step={ComponentParamSettings[ComponentParamType.PlatformThickness].step}
                        // disabled={disabled}
                        onChange={this.getOnChangeOverall(ComponentParamType.PlatformThickness).bind(this)}
                    />}
                    {!isDrawing && type !== ComponentType.Platform && <div className='material-property-wrapper'>
                        <div className='title'>{ComponentParamSettings.material.title}</div>
                        <div className='mateiral-buttons'>
                            <Button className={materialAssignType === MaterialAssignType.StairOverall ? 'assigning' : ''} type="text" size="small" shape="circle" icon={stairMaterial ? <UndoOutlined /> : <PlusOutlined />} onClick={this.getOnMaterialReplaceClick(ComponentParamType.StairMaterial)} />
                            {stairMaterial && <Button type="text" size="small" shape="circle" icon={<DeleteOutlined />} onClick={this.getOnMaterialDeleteClick(ComponentParamType.StairMaterial)} />}
                        </div>
                    </div>}
                    {!isDrawing && type === ComponentType.Platform && <div className='material-property-wrapper'>
                        <div className='title'>{ComponentParamSettings.material.title}</div>
                        <div className='mateiral-buttons'>
                            <Button className={materialAssignType === MaterialAssignType.PlatformOverall ? 'assigning' : ''} type="text" size="small" shape="circle" icon={platformMaterial ? <UndoOutlined /> : <PlusOutlined />} onClick={this.getOnMaterialReplaceClick(ComponentParamType.PlatformMaterial)} />
                            {platformMaterial && <Button type="text" size="small" shape="circle" icon={<DeleteOutlined />} onClick={this.getOnMaterialDeleteClick(ComponentParamType.PlatformMaterial)} />}
                        </div>
                    </div>}
                </div>
            </div>
        )
    }
}