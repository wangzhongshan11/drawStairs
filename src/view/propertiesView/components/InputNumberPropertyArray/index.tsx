import * as React from 'react'
import "./index.css";
import { InputNumber } from 'antd';

interface Props {
    title: string;
    units: string[];
    values: number[];
    min: number[];
    max: number[];
    step: number[];
    precisions: number[];
    disabled?: boolean;
    withProportional?: boolean;
    onChange?: (values: number[]) => void;
}

interface State {
    inputtingValues: number[];
}

export default class InputNumberPropertyArray extends React.PureComponent<Props, State> {
    state: Readonly<State> = { inputtingValues: [...this.props.values] };

    // private onChange = (values: number[] | null) => {
    //     this.setState({ inputtingValues: values });
    // }

    private getOnChange = (index: number) => {
        return (value: number | null) => {
            const { inputtingValues } = this.state;
            const { withProportional } = this.props;
            const newInputtingValues = inputtingValues;
            if (value !== undefined && value !== null) {
                for (let i = 0; i < inputtingValues.length; i++) {
                    if (withProportional && i !== index) {
                        newInputtingValues[i] = newInputtingValues[i] / newInputtingValues[index] * value;
                    }
                }
                newInputtingValues[index] = value;
                this.setState({ inputtingValues: newInputtingValues });
            }
        }
    }

    private onBlur = () => {
        const { onChange } = this.props;
        const { inputtingValues } = this.state;
        if (onChange && inputtingValues !== undefined && inputtingValues !== null) {
            onChange(inputtingValues);
            // this.setState({ inputtingValues: undefined });
        }
    }

    private getOnStep = (index: number) => {

        return (value: number, info: { offset: string | number; type: 'up' | 'down'; }) => {
            const { withProportional, onChange } = this.props;
            const { inputtingValues } = this.state;
            if (onChange) {
                const newValues = [...inputtingValues];
                for (let i = 0; i < inputtingValues.length; i++) {
                    if (withProportional && i !== index) {
                        newValues[i] = newValues[i] / newValues[index] * value;
                    }
                }
                newValues[index] = value;
                onChange(newValues);
            }
        }
    }

    render() {
        const { title, units, precisions, min, max, step, disabled } = this.props;
        const { inputtingValues } = this.state;
        return (
            <div className='inputNumber-property-array-wrapper'>
                <div className='title'>{title}</div>
                <div className='inputs'>
                    {inputtingValues.map((value, index) => {
                        return <div key={index} className='wrapper'>
                            <InputNumber<number>
                                className='input'
                                value={value}
                                // key={index}
                                // defaultValue={1000}
                                precision={precisions[index]}
                                // suffix={units[index]}
                                min={min[index]}
                                max={max[index]}
                                step={step[index]}
                                disabled={disabled}
                                // formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                // parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                                onChange={this.getOnChange(index).bind(this)}
                                onBlur={this.onBlur.bind(this)}
                                onPressEnter={this.onBlur.bind(this)}
                                onStep={this.getOnStep(index).bind(this)}
                            />
                            <div className='suffix'>{units[index]}</div>
                        </div>
                    })}
                </div>
            </div>
        )
    }
}