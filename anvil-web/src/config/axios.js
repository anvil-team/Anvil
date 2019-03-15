/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2018-12-11 21:07:24
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2019-03-14 15:11:50
 * basic http config
 */
import axios from 'axios';
import NProgress from 'nprogress';
import qs from 'qs';
import { message } from 'antd';
import {
  RESPONSE_STATUS,
  BASE_URL,
  HTTP_STATUS_CODE,
  API_VERSION,
  errorIncome as errorFrom,
} from './constants';
import isDev from '../utils/isDev';

NProgress.configure({});

axios.defaults.baseURL = (isDev() ? 'http://127.0.0.1:3333/api' : BASE_URL) + '/' + API_VERSION;

const errorMap = new Map([
  [
    HTTP_STATUS_CODE.NO_PERMISSIONS,
    (config, store) => {
      store.dispatch({ type: 'login/refreshAuth' });
    },
  ],
  [
    RESPONSE_STATUS.FAILED,
    (config) => {
      message.warn(config.data.message);
    },
  ],
]);

export const start = (store) => {
  axios.interceptors.request.use(
    (config) => {
      NProgress.start();
      const state = store.getState();

      config.data = qs.stringify(config.data);
      // config.data = JSON.stringify(config.data)
      if (state.appState.token) config.headers['Authorization'] = `${state.appState.token}`;
      return { ...config };
    },
    (error) => {
      NProgress.done();

      error.from = errorFrom.axiosRequest;

      throw error;
    }
  );

  axios.interceptors.response.use(
    (config) => {
      NProgress.done();
      if (errorMap.get(config.data.success)) {
        errorMap.get(config.data.success)(config, store);
        return null;
      }
      return config.data;
    },
    (error) => {
      return new Promise((resolve, reject) => {
        if (error?.response?.status === HTTP_STATUS_CODE.NO_PERMISSIONS) {
          store
            .dispatch({ type: 'login/refreshAuth' })
            .then(() => axios(error.config))
            .then(resolve)
            .catch(reject);
        }
        NProgress.done();

        throw error;
      });
    }
  );
};
