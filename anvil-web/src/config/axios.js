/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2018-12-11 21:07:24
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2019-02-28 13:18:13
 * basic http config
 */
import axios from 'axios';
import NProgress from 'nprogress';
import qs from 'qs';
import * as Sentry from '@sentry/browser';
import { message } from 'antd';
import { RESPONSE_STATUS, BASE_URL, HTTP_STATUS_CODE, API_VERSION } from './constants';
import isDev from '../utils/isDev';

NProgress.configure({});

axios.defaults.baseURL = (isDev() ? 'http://127.0.0.1:3333/api' : BASE_URL) + '/' + API_VERSION;

const errorMap = new Map([
  [
    HTTP_STATUS_CODE.NO_PERMISSIONS,
    () => {
      const isLogin = window.location.pathname.includes('/login');
      const errorTips = isLogin
        ? '登录过期或者权限不足.'
        : '登录过期或者权限不足，即将跳往登录页面.';
      if (!isLogin)
        setTimeout(() => {
          window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
        }, 2000);
      message.warn(errorTips);
    },
  ],
  [
    RESPONSE_STATUS.FAILED,
    (config) => {
      message.warn(config.data.message);
    },
  ],
]);

axios.interceptors.request.use(
  (config) => {
    NProgress.start();
    config.data = qs.stringify(config.data);
    // config.data = JSON.stringify(config.data)
    if (sessionStorage.token) config.headers['Authorization'] = `${sessionStorage.token}`;
    return config;
  },
  (error) => {
    NProgress.done();
    Sentry.captureException(error);
    console.error('caught:', error);
    return null;
  }
);

axios.interceptors.response.use(
  (config) => {
    NProgress.done();
    if (errorMap.get(config.data.success)) {
      errorMap.get(config.data.success)(config);
      return null;
    }
    return config.data;
  },
  (error) => {
    NProgress.done();

    Sentry.captureException(error);

    const response = error?.response;
    if (errorMap.get(response?.status)) errorMap.get(response.status)();
    console.error('caught:', error);
    return null;
  }
);
