import { call, put } from 'redux-saga/effects';
import * as categoryApi from 'services/category';

const initialState = {
  list: [],
  pagination: { current: 1, pageSize: 100 },
  current: null,
};

export const state = initialState;

export const effects = {
  *getList() {
    const res = yield call(categoryApi.getCategoryList);
    if (res) {
      yield put({ type: 'category/setState', payload: { list: res.data } });
    }
  },
};
