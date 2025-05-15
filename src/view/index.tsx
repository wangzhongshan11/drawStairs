import * as React from 'react'
import * as ReactDOM from 'react-dom'
import "./index.css";
import ToolView from './toolView';
import PropertiesView from './propertiesView/index';
import { MessageType } from '../../src/main/types';
class App extends React.Component {
    componentDidMount(): void {
        window.parent.postMessage({ type: MessageType.DrawStairViewMounted }, '*');
    }
    render() {
        return (<div>
            <ToolView />
            <PropertiesView />
        </div>)
    }
}

ReactDOM.render(<App />, document.getElementById('root'));