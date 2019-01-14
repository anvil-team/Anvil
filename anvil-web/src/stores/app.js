import { put, call, all } from 'redux-saga/effects';
import { message } from 'antd';
import * as authService from 'services/auth';

const initialState = {
  userMenus: [],
  user: {},
};

export const state = initialState;

export const effects = {
  *syncApp() {
    const [categoryData] = yield all([call(authService.category)]);
    if (categoryData) {
      yield put({ type: 'app/setState', payload: { userMenus: categoryData.data } });
      return true;
    }
    return false;
  },
};

export const reducers = {
  ['notify.success']({ payload }) {
    message.success(payload.content);
  },
  ['notify.warn']({ payload }) {
    message.warn(payload.content);
  },
};
