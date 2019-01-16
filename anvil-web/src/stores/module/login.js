import { call, put } from 'redux-saga/effects';
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
      const ret = yield put({ type: 'app/syncApp' });
      if (ret) {
        yield put({ type: 'app/notify.success', payload: '登录成功' });
        yield put(replace('/sys'));
      } else yield put({ type: 'app/notify.warn', payload: '同步数据失败，请稍后重试' });
    } else yield put({ type: 'app/notify.warn', payload: '账号或者密码错误' });
  },
};
