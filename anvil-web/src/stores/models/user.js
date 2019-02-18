import { put, call, select } from 'redux-saga/effects';
import * as userApi from 'services/user';

const initialState = {
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
};

export const state = initialState;

export const reducers = {};

export const effects = {
  *fetchList() {
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
};
