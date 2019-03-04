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
  editVis: false,
};

export const reducers = {};

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
    const res = yield call(roleApi.getRoleList);

    if (res) {
      yield put({ type: 'user/setState', payload: { roleList: res.data.roles } });
    }
  },
};
