import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { replace } from 'connected-react-router';
import * as authService from 'services/auth';
import { isAccessible } from 'config/constants';

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
      yield put({ type: 'app/setState', payload: { token: response.data.token } });
      // 请求数据
      yield put({ type: 'login/setState', payload: { login: true } });

      const ret = yield put.resolve({ type: 'app/syncApp' });
      if (ret) {
        yield put({ type: 'app/notify.success', payload: '登录成功' });

        yield put(replace('/sys'));
      } else yield put({ type: 'app/notify.warn', payload: '同步数据失败，请稍后重试' });
    } else yield put({ type: 'app/notify.warn', payload: '账号或者密码错误' });
  },

  *refreshAuth() {
    const res = yield call(authService.refresh);

    if (res.data.isAccessible === isAccessible.ALLOW_ACCESS) {
      yield put({ type: 'app/setState', payload: { token: res.data.token } });
      return;
    }

    const isLogin = window.location.pathname.includes('/login');
    const errorTips = isLogin ? '登录过期或者权限不足.' : '登录过期或者权限不足，即将跳往登录页面.';
    if (!isLogin) {
      yield delay(2000);
      yield put(replace('/login'));
    }
    yield put({ type: 'app/notify.warn', payload: errorTips });
    throw new Error('refresh token failed.');
  },

  *logout() {
    yield put({ type: 'app/setState', payload: { token: '', user: {} } });
    yield put({ type: 'login/setState', payload: { login: false } });
    yield put(replace('/login'));
  },
};
