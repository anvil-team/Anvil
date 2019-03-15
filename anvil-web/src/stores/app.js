import { put, call } from 'redux-saga/effects';
import { message } from 'antd';
import * as authService from 'services/auth';
import * as userApi from 'services/user';

export const state = { userMenus: [], user: {}, token: '' };

export const effects = {
  *syncApp() {
    try {
      yield put.resolve({ type: 'app/syncMenu' });
      yield put.resolve({ type: 'app/fetchUserInfo' });
      return true;
    } catch (error) {
      return false;
    }
  },

  *syncMenu() {
    const res = yield call(authService.category);
    if (res) {
      yield put({ type: 'app/setState', payload: { userMenus: res.data } });
    } else throw new Error('sync menu failed.');
  },

  *fetchUserInfo() {
    const res = yield call(userApi.getUserDetail);
    if (res) {
      yield put({ type: 'app/setState', payload: { user: res.data } });
      return res.data;
    } else throw new Error('fetch user detail failed.');
  },
};

export const reducers = {
  ['notify.success'](state, { payload }) {
    message.success(payload);
    return { ...state };
  },
  ['notify.warn'](state, { payload }) {
    message.warn(payload);
    return { ...state };
  },
};
