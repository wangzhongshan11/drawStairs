import * as React from 'react'
import "./index.css";
import { Switch } from 'antd';

interface Props {
    title: string;
    checked: boolean
    onChange?: (checked: boolean) => void;
}

export default class SwitchProperty extends React.PureComponent<Props> {

    private onChange = (checked: boolean, event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
        const { onChange } = this.props;
        if (onChange) {
            onChange(checked);
        }
    }

    render() {
        const { title, checked } = this.props;
        return (
            <div className='switch-property-wrapper'>
                <div className='title'>{title}</div>
                <Switch checked={checked} onChange={this.onChange} />
            </div>
        )
    }
}