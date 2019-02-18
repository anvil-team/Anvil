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
      yield put({ type: 'category/setCategoryList', payload: { list: res.data } });
    }
  },
  *deleteCategory(action) {
    const res = yield call(categoryApi.deleteCategory, { id: action.payload.id });
    if (res) {
      yield put({ type: 'app/notify.success', payload: { content: '删除成功' } });
      yield put({ type: 'category/getList' });

      yield put.resolve({ type: 'app/syncMenu' });
    } else yield put({ type: 'app/notify.warn', payload: { content: '删除失败' } });
  },
  *updateCategory({ payload }) {
    const { category } = payload;
    const res = yield call(categoryApi.editCategory, category, category.id);
    if (res) {
      yield put({ type: 'category/getList' });
      yield put({ type: 'app/notify.success', payload: '操作成功' });

      yield put.resolve({ type: 'app/syncMenu' });
    } else {
      yield put({ type: 'app/notify.warn', payload: '操作失败' });
    }
  },
};

export const reducers = {
  setCategoryList(state, action) {
    const { list } = action.payload;
    state.list = list.map((l) => {
      if (l.parentId) {
        const parent = list.find((sub) => sub.id === l.id);
        return { ...l, parent };
      }
      return l;
    });
    return { ...state };
  },
};
