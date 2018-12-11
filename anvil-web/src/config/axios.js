/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2018-12-11 21:07:24
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2018-12-11 21:07:24
 * basic http config
 */
import axios from 'axios'
import NProgress from 'nprogress'
import isDev from '../utils/isDev'

NProgress.configure({})

axios.defaults.baseURL = isDev() ? '' : ''

axios.interceptors.request.use(
  (config) => {
    NProgress.start()
    return config
  },
  (error) => Promise.reject(error)
)

axios.interceptors.response.use(
  (config) => {
    NProgress.done()
    return config
  },
  (error) => Promise.reject(error)
)
