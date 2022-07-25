//To Connect react application to index html file
import React from 'react';
import  ReactDOM  from 'react-dom';
import { Provider } from 'react-redux'; //can acess this state from anywhere
import {legacy_createStore as createStore,applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

import App from './App';
import './index.css';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>,
    document.getElementById('root')
);