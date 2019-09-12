import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk

import appReducer from './redux/reducer.js';

const store = createStore(
	appReducer,
	applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
);

export default store;
