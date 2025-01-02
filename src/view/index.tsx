import * as React from 'react'
import * as ReactDOM from 'react-dom'
import "./index.css";
import ToolView from './toolView';
import PropertiesView from './propertiesView/index';
import { Divider } from 'antd';

class App extends React.Component {
    render() {
        return (<div>
            <ToolView />
            <Divider style={{ borderColor: 'black' }}>阶梯参数</Divider>
            <PropertiesView />
        </div>)
    }
}

ReactDOM.render(<App />, document.getElementById('root'));