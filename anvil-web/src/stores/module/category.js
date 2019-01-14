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
  *deleteCategory(action) {
    const res = yield call(categoryApi.deleteCategory, { id: action.payload.id });
    if (res) {
      yield put({ type: 'app/notify.success', payload: { content: '删除成功' } });
      yield put({ type: 'app/syncApp' });
      yield put({ type: 'category/getList' });
    } else yield put({ type: 'app/notify.warn', payload: { content: '删除失败' } });
  },
};
