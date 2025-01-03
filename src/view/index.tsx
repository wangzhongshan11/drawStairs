import * as React from 'react'
import * as ReactDOM from 'react-dom'
import "./index.css";
import ToolView from './toolView';
import PropertiesView from './propertiesView/index';
class App extends React.Component {
    render() {
        return (<div>
            <ToolView />
            <PropertiesView />
        </div>)
    }
}

ReactDOM.render(<App />, document.getElementById('root'));