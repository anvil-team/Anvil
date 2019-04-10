import { call, put, select } from 'redux-saga/effects';
import * as roleApi from 'services/role';

export const state = {
  roleListLoading: false,
  roleList: [],
  rolePagination: { current: 1, pageSize: 10, total: 0 },
  roleQuery: { roleCode: '' },
  roleListCombo: [],
};

export const effects = {
  *fetchRoleList() {
    const { permissionState } = yield select();
    const { rolePagination, roleQuery } = permissionState;

    const query = {
      currentPage: rolePagination.current,
      pageSize: rolePagination.pageSize,
      ...roleQuery,
    };

    const res = yield call(roleApi.requestRoleList, query);
    if (res) {
      yield put({
        type: 'permission/setState',
        payload: { roleList: res.data.roles },
        rolePagination: { ...rolePagination, total: res.data.total },
      });
    }
  },

  *fetchRoleComboList() {
    const res = yield call(roleApi.requestRoleCombo);
    if (res)
      yield put.resolve({ type: 'permission/setState', payload: { roleComboList: res.data } });
  },

  *fetchEditRole({ payload }) {
    const res = yield call(roleApi.requestEditRole, payload);

    if (res) yield put({ type: 'permission/fetchRoleList' });
  },

  *fetchDelRole({ payload }) {
    const res = yield call(roleApi.requestDeleteRole, payload);

    if (res) yield put({ type: 'permission/fetchRoleList' });
  },
};
