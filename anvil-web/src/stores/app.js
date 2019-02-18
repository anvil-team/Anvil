import { put, call } from 'redux-saga/effects';
import { message } from 'antd';
import * as authService from 'services/auth';

const initialState = {
  userMenus: [],
  user: {},
};

export const state = initialState;

export const effects = {
  *syncApp() {
    try {
      yield put.resolve({ type: 'app/syncMenu' });
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
