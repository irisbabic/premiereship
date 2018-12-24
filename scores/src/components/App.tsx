import * as React from 'react';
import '../App.css';
import Choice from '../containers/Choice'

class App extends React.Component {
    public render() {
        return (
            <div className="App">
              <Choice />
            </div>
        );
    }
}

export default App;
