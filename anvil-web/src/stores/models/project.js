import { call, put } from 'redux-saga/effects';
import * as projectApi from 'services/project';

export const state = {
  projectListLoading: false,
  projectList: [],
  projectPagination: {},
  projectVis: { editVis: false },
  currentProject: {},
};

export const effects = {
  *fetchProjectList() {
    yield put({ type: 'project/setState', payload: { projectListLoading: true } });
    const res = yield call(projectApi.requestProjectList, { currentPage: 1, pageSize: 100 });
    if (res) {
      yield put({
        type: 'project/setState',
        payload: { projectList: res.data.applications, projectListLoading: false },
      });
    }
  },
};

export const reducers = {
  setProjectVis(state, { payload }) {
    state.projectVis = { ...state.projectVis, ...payload };

    return { ...state };
  },
};
