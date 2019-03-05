import { put, call, select } from 'redux-saga/effects';
import * as userApi from 'services/user';
import * as roleApi from 'services/role';

export const state = {
  query: {
    currentPage: 1,
    pageSize: 10,
  },
  userListLoading: false,
  userList: [],
  pagination: { current: 1, pageSize: 10, total: 0 },
  roleList: [],
  roleComboList: [],
  userVis: { distributionVis: false },
  userNow: {},
};

export const effects = {
  *fetchUserList() {
    yield put({ type: 'user/setState', payload: { userListLoading: true } });

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

  *fetchRoleComboList() {
    const res = yield call(roleApi.getRoleCombo);
    if (res) yield put.resolve({ type: 'user/setState', payload: { roleComboList: res.data } });
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
