import { call, put, select } from 'redux-saga/effects';
import * as applicationApi from 'services/application';

export const state = {
  applicationListLoading: false,
  applicationList: [],
  applicationPagination: { current: 1, pageSize: 10 },
  applicationVis: { editVis: false },
  currentApp: {},
  applicationName: '',
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
};

export const reducers = {
  setApplicationVis(state, { payload }) {
    state.applicationVis = { ...state.applicationVis, ...payload };

    return { ...state };
  },
};
