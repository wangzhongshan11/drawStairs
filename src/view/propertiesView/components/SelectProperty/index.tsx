import * as React from 'react'
import "./index.css";
import { Select, } from 'antd';

interface Props {
    title: string;
    value: number | string
    selectOptions: { value: number | string, label: string }[];
    disabled?: boolean;
    onChange?: (value: (string | number)) => void;
}

export default class SelectProperty extends React.PureComponent<Props> {

    private onChange = (value: number | string, option: { value: number | string, label: string }) => {
        const { onChange } = this.props;
        if (onChange) {
            onChange(value);
            this.setState({ inputtingValue: undefined });
        }
    }

    render() {
        const { title, value, selectOptions } = this.props;
        return (
            <div className='select-property-wrapper'>
                <div className='title'>{title}</div>
                <Select value={value} defaultValue={value} defaultOpen={false} options={selectOptions} onChange={this.onChange} />
                {/* <Select.Group defaultValue={value} value={value} onChange={this.onChange} buttonStyle="solid" >
                    {selectOptions.map((selectOption, index) => {
                        return 
                    })}
                </Select.Group> */}
            </div>
        )
    }
}