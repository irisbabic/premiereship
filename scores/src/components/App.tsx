import * as React from 'react';
import '../App.css';
import Choice from '../containers/Choice'

/**
 * @class App
 * @classdesc Renders the whole application
 */
class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <Choice/>
            </div>
        );
    }
}

export default App;
