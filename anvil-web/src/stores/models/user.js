import { put, call, select } from 'redux-saga/effects';
import * as userApi from 'services/user';
import * as applicationApi from 'services/application';

export const state = {
  userListLoading: false,
  userList: [],
  pagination: { current: 1, pageSize: 10, total: 0 },
  userVis: { distributionVis: false },
  userNow: {},
  username: '',
  targetKeys: [],
  selectedKeys: [],
};

export const effects = {
  *fetchUserList() {
    yield put({ type: 'user/setState', payload: { userListLoading: true } });

    const userState = yield select((state) => state.userState);
    const { pagination, username } = userState;
    const query = { username, currentPage: pagination.current, pageSize: pagination.pageSize };

    const res = yield call(userApi.requestUserList, query);
    if (res) {
      yield put({
        type: 'user/setState',
        payload: {
          userList: res.data.userDetails,
          pagination: { ...userState.pagination, total: res.total },
        },
      });
    }
  },

  *fetchEditUser({ payload }) {
    const res = yield call(userApi.requestEditUser, payload);
    if (res) yield put.resolve({ type: 'user/fetchUserList' });
  },

  *fetchDelUser({ payload }) {
    const res = yield call(userApi.requestDeleteUser, payload);
    if (res) yield put({ type: 'user/fetchUserList' });
  },

  *fetchUserApplicationAssign() {
    const { userNow } = yield select((state) => state.userState);
    const res = yield call(applicationApi.requestApplicationAssignDetail, {
      userId: userNow.id,
      condition: 1,
    });

    if (res) {
      yield put({
        type: 'user/setState',
        payload: {
          targetKeys: res.data.applications.map((app) => app.id),
          userNow: { ...userNow, applications: res.data.applications },
        },
      });
    }
  },

  *updateUserApplicationAssign() {
    const { userNow, targetKeys } = yield select((state) => state.userState);
    const applicationIdDeassign = userNow.applications.filter(
      (app) => !targetKeys.includes(app.id)
    );
    const updater = { userId: userNow.id, applicationIdAssign: targetKeys, applicationIdDeassign };
    const res = yield call(applicationApi.requestUpdateApplicationAssign, updater);

    if (res) {
      yield put({ type: 'app/notify.success', payload: `分配 ${userNow.username} 项目成功.` });
      yield put({ type: 'user/setUserVis', payload: { data: { distributionVis: false } } });
    }
  },
};

export const reducers = {
  setUserVis(state, { payload }) {
    state.userVis = { ...state.userVis, ...payload.data };

    return { ...state };
  },
};
