import { put, call, select } from 'redux-saga/effects';
import * as userApi from 'services/user';
import * as roleApi from 'services/role';

export const state = {
  query: {
    currentPage: 1,
    pageSize: 10,
  },
  userList: [],
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  roleList: [],
  userVis: { distributionVis: false },
  userNow: {},
};

export const effects = {
  *fetchUserList() {
    const userState = yield select((state) => state.userState);
    const res = yield call(userApi.getUserList, userState.query);
    if (res) {
      yield put({
        type: 'user/setState',
        payload: {
          userList: res.data.userDetails,
          pagination: {
            ...userState.pagination,
            total: res.total,
          },
        },
      });
    }
  },

  *fetchRoleList() {
    const res = yield call(roleApi.getRoleList, { currentPage: 1, pageSize: 100 });

    if (res) {
      yield put({ type: 'user/setState', payload: { roleList: res.data.roles } });
    }
  },

  *editUser({ payload }) {
    const { data } = payload;
    const res = yield call(userApi.editUser, data);
    if (res) yield put.resolve({ type: 'user/fetchUserList' });
  },
};

export const reducers = {
  setUserVis(state, { payload }) {
    state.userVis = { ...state.userVis, ...payload.data };

    return { ...state };
  },
};
