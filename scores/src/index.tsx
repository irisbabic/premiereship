import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import round from './reducers/index';
import { Provider } from "react-redux";



const store = createStore(round,{
    round: 1,
});

//store.dispatch(changeRound(5));
ReactDOM.render(
    <Provider store={store}>
  <App />,
    </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
