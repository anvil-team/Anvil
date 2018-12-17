/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2018-12-03 23:05:24
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2018-12-17 22:07:46
 */
import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import './config/axios';
import './registerSw';

const render = (Component) => {
  ReactDom.render(<Component />, document.getElementById('app'));
};

render(App);
