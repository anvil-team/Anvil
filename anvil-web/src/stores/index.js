import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import saga, { getReducers } from './saga';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

export const getStore = (history) =>
  createStore(
    getReducers(history),
    composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
  );
export const runSaga = () => sagaMiddleware.run(saga);
