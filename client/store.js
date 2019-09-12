import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import appReducer from './redux/reducer.js';
console.log('INSIDE STORE');
console.log(appReducer);

const store = createStore(
	appReducer,
	composeWithDevTools(applyMiddleware(thunk, createLogger({collapsed: true})))
);

export default store;
