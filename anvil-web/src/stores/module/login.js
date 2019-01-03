import { call, put, all } from 'redux-saga/effects';
import { replace } from 'connected-react-router';
import * as authService from '../../services/auth';

const initialState = {
  login: false,
  tips: '登录成功, 正在获取权限...',
};

export const state = initialState;

export const effects = {
  *auth(action) {
    const { payload } = action;
    const response = yield call(authService.login, payload.username, payload.password);
    if (response) {
      sessionStorage.token = response.data.token;
      // 请求数据
      yield put({ type: 'login/setState', payload: { login: true } });
      const [categoryData] = yield all([
        call(authService.category),
        // call(authService.userDetail),
      ]);
      if (categoryData) {
        yield put({ type: 'app/setState', payload: { userMenus: categoryData.data } });
        yield put(replace('/sys'));
      }
    }
  },
};
