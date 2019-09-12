//entry file for our webpack
import '../public/style.css';

import React from 'react';
import ReactDOM from 'react-dom';
import store from './store.js';
import {Provider} from 'react-redux';
import Root from './components/Root';

ReactDOM.render(
	<Provider store={store}>
		<Root />
	</Provider>,
	document.getElementById('app')
);
