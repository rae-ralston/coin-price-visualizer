import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import './index.css';
import App from './containers/App';
import reducer from './reducers'
import registerServiceWorker from './registerServiceWorker';

const loggerMiddleware = store => next => action => {
  console.log('dispatching: ', action);
  next(action);
}

const store = createStore(
  reducer,
  applyMiddleware(loggerMiddleware)
)

render(
  <Provider store={store}>
    <App data={'hi'}/>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker();
