/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2018-12-03 23:05:24
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2019-02-13 20:42:36
 */
import React from 'react';
import ReactDom from 'react-dom';
import { createBrowserHistory } from 'history';
import App from './App';
import { getStore, runSaga } from './stores';
import './config/axios';
import './registerSw';

const history = createBrowserHistory();
const { store, persistor } = getStore(history);
runSaga();

const render = (Component) => {
  ReactDom.render(
    <Component history={history} store={store} persistor={persistor} />,
    document.getElementById('app')
  );
};

render(App);

if (module.hot) {
  // Reload components
  module.hot.accept('./App', () => {
    render(App);
  });

  // Reload reducers
  module.hot.accept('./stores', () => {
    getStore.replaceReducer(getStore(history));
  });
}
