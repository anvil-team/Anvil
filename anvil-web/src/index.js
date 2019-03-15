/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2018-12-03 23:05:24
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2019-03-14 11:27:38
 */
import React from 'react';
import ReactDom from 'react-dom';
import { message } from 'antd';
import { createBrowserHistory } from 'history';
import App from './App';
import { getStore, runSaga } from './stores';
import * as axios from './config/axios';
import './registerSw';

message.config({ maxCount: 1 });

const history = createBrowserHistory();
const { store, persistor } = getStore(history);
runSaga();

axios.start(store);

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
    getStore(history).replaceReducer(getStore(history));
  });
}
