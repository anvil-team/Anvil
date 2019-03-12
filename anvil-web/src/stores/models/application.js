import { call, put, select } from 'redux-saga/effects';
import * as applicationApi from 'services/application';
import { message } from 'antd';

export const state = {
  applicationListLoading: false,
  applicationList: [],
  applicationPagination: { current: 1, pageSize: 10 },
  applicationVis: { editVis: false },
  currentApp: null,
  applicationName: '',
  applicationComboList: [],
  editLoading: false,
};

export const effects = {
  *fetchApplicationList() {
    yield put({ type: 'application/setState', payload: { applicationListLoading: true } });
    const { applicationState } = yield select();
    const { applicationName, applicationPagination } = applicationState;
    const query = {
      applicationName,
      currentPage: applicationPagination.current,
      pageSize: applicationPagination.pageSize,
    };
    const res = yield call(applicationApi.requestApplicationList, query);
    if (res) {
      yield put({
        type: 'application/setState',
        payload: { applicationList: res.data.applications, applicationListLoading: false },
      });
    }
  },

  *fetchApplicationCombo() {
    const res = yield call(applicationApi.requestApplicationCombo);
    if (res) {
      yield put({ type: 'application/setState', payload: { applicationComboList: res.data } });
    }
  },

  *fetchEditApplication({ payload }) {
    yield put({ type: 'application/setState', payload: { editLoading: true } });

    const { applicationState } = yield select();
    const { currentApp } = applicationState;

    let application = { ...payload };

    if (currentApp?.id) application = { ...application, ...currentApp };

    const res = yield call(applicationApi.requestEditApplication, application);
    if (res) {
      yield put({
        type: 'app/notify.success',
        payload: `${currentApp?.id ? '更新' : '新增'} ${application.applicationName} 成功`,
      });
      yield put.resolve({ type: 'application/fetchApplicationList' });
      yield put({ type: 'application/setState', payload: { editLoading: false } });
      yield put({ type: 'application/setApplicationVis', payload: { editVis: false } });
    }
  },
};

export const reducers = {
  setApplicationVis(state, { payload }) {
    state.applicationVis = { ...state.applicationVis, ...payload };

    return { ...state };
  },
};
