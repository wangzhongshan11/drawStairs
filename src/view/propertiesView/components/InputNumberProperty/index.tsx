import * as React from 'react'
import "./index.css";
import { InputNumber, Space } from 'antd';

interface Props {
    title: string;
    unit: string;
    value: number;
    precision: number;
    min: number;
    max: number;
    step: number;
    disabled?: boolean;
    className?: string;
    onChange?: (value: number) => void;
}

interface State {
    inputtingValue: number;
}

export default class InputNumberProperty extends React.PureComponent<Props, State> {
    state: Readonly<State> = { inputtingValue: this.props.value };

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        if (this.props.value !== nextProps.value) {
            this.setState({ inputtingValue: nextProps.value });
        }
    }

    private onChange = (value: number | null) => {
        if (value !== undefined && value !== null)
            this.setState({ inputtingValue: value });
    }

    private onBlur = () => {
        const { onChange } = this.props;
        const { inputtingValue } = this.state;
        if (onChange && inputtingValue !== undefined && inputtingValue !== null) {
            onChange(inputtingValue);
            // this.setState({ inputtingValue: undefined });
        }
    }

    private onStep = (value: number, info: { offset: string | number; type: 'up' | 'down'; }) => {
        const { onChange } = this.props;
        if (onChange) {
            onChange(value);
        }
    }

    render() {
        const { title, precision, min, max, step, className } = this.props;
        const { inputtingValue } = this.state;
        return (
            <div className='inputNumber-property-wrapper'>
                <div className='title'>{title}</div>
                <Space>
                    <InputNumber<number>
                        className={`input ${className || ''}`}
                        value={inputtingValue}
                        // defaultValue={1000}
                        precision={precision}
                        min={min}
                        max={max}
                        step={step}
                        size='small'
                        // formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        // parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                        onChange={this.onChange.bind(this)}
                        onBlur={this.onBlur.bind(this)}
                        onPressEnter={this.onBlur.bind(this)}
                        onStep={this.onStep.bind(this)}
                    />
                </Space>
            </div>
        )
    }
}