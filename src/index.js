import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { Router } from 'react-router-dom';
import 'rxjs';

import './index.css';
import App from './components/app.container';
import registerServiceWorker from './registerServiceWorker';
import rootEpic from './epics/epics';
import rootReducer from './reducer/reducer';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const epicMiddleware = createEpicMiddleware(rootEpic);


const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(epicMiddleware)),
);


ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
