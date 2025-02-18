import * as React from 'react'
import "./index.css";
import { Radio, RadioChangeEvent } from 'antd';

interface Props {
    title: string;
    value: number | string | boolean
    radioOptions: { value: number | string | boolean, text: string }[];
    disabled?: boolean;
    onChange?: (value: (string | number)) => void;
}

export default class RadioProperty extends React.PureComponent<Props> {

    private onChange = (e: RadioChangeEvent) => {
        const { onChange } = this.props;
        if (onChange) {
            onChange(e.target.value);
            this.setState({ inputtingValue: undefined });
        }
    }

    render() {
        const { title, value, radioOptions } = this.props;
        return (
            <div className='radio-property-wrapper'>
                <div className='title'>{title}</div>
                <Radio.Group defaultValue={value} value={value} onChange={this.onChange} buttonStyle="solid" size='middle'>
                    {radioOptions.map((radioOption, index) => {
                        return <Radio.Button value={radioOption.value} key={index}>{radioOption.text}</Radio.Button>
                    })}
                </Radio.Group>
            </div>
        )
    }
}