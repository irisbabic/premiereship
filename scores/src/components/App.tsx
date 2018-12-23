import * as React from 'react';
import '../App.css';
import Choice from "./Choice";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Choice round={1}/>
      </div>
    );
  }
}

export default App;
