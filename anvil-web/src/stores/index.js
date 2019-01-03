import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { persistStore } from 'redux-persist';
import saga, { getReducers, effects } from './saga';
import { createPromiseMiddleware, crashReporterMiddleware } from './plugins';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

export const getStore = (history) => {
  const store = createStore(
    getReducers(history),
    composeEnhancers(
      applyMiddleware(
        crashReporterMiddleware(),
        createPromiseMiddleware(effects),
        routerMiddleware(history),
        sagaMiddleware
      )
    )
  );
  const persistor = persistStore(store);
  return { store, persistor };
};
export const runSaga = () => sagaMiddleware.run(saga);
