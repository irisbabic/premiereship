import * as data from "./data";
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import round from './reducers/index';

import './index.css';

import {createStore} from 'redux';
import {Provider} from "react-redux";


const store = createStore(round, {
    round: data.length,
});

ReactDOM.render(
    <Provider store={store}>
        <App/>,
    </Provider>,
    document.getElementById('root') as HTMLElement
);

registerServiceWorker();
