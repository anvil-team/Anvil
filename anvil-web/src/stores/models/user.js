import { put, call, select } from 'redux-saga/effects';
import * as userApi from 'services/user';
import * as roleApi from 'services/role';
import * as applicationApi from 'services/application';

export const state = {
  userListLoading: false,
  userList: [],
  pagination: { current: 1, pageSize: 10, total: 0 },
  roleList: [],
  roleComboList: [],
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

    const res = yield call(userApi.getUserList, query);
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
    const { userState } = yield select();
    const { userNow } = userState;
    const { data } = payload;
    let updater = { ...data };
    if (userNow) updater = { ...updater, ...userNow };

    const res = yield call(userApi.editUser, updater);
    if (res) yield put.resolve({ type: 'user/fetchUserList' });
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
