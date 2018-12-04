/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2018-12-03 23:05:24
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2018-12-04 22:48:04
 */
import React from 'react'
import ReactDom from 'react-dom'
import App from './src/App'

const render = (Component) => {
  ReactDom.render(<Component />, document.getElementById('app'))
}

render(App)

// if (module.hot) module.hot.accept()
