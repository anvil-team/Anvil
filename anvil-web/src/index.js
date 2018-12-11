/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2018-12-03 23:05:24
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2018-12-11 21:08:31
 */
import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import './config/axios'

const render = (Component) => {
  ReactDom.render(<Component />, document.getElementById('app'))
}

render(App)

// if (module.hot) module.hot.accept()
