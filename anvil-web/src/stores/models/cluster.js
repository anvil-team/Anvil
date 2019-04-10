import { call, put, select } from 'redux-saga/effects';
import * as clusterApi from 'services/cluster';

export const state = {
  clusterListLoading: false,
  clusterList: [],
  clusterPagination: { current: 1, pageSize: 10, total: 0 },
  clusterName: '',
  clusterVis: { editVis: false },
  cluster: null,
};

export const effects = {
  *fetchClusterList() {
    yield put({ type: 'cluster/setState', payload: { clusterListLoading: true } });
    const { clusterPagination, clusterName } = yield select((state) => state.clusterState);

    const query = {
      currentPage: clusterPagination.current,
      pageSize: clusterPagination.pageSize,
      clusterName,
    };

    const res = yield call(clusterApi.requestClusterList, query);

    if (res) {
      yield put({
        type: 'cluster/setState',
        payload: {
          clusterList: res.data.clusters,
          clusterPagination: { ...clusterPagination, total: res.data.total },
          clusterListLoading: true,
        },
      });
    }
  },

  *fetchEditCluster({ payload }) {
    const { cluster } = yield select((state) => state.clusterState);

    const params = { ...payload };

    if (cluster?.id) params.data.id = cluster.id;

    const res = yield call(clusterApi.requestEditCluster, params);

    if (res) {
      yield put({ type: 'cluster/setClusterVis', payload: { editVis: false } });
      yield put({ type: 'cluster/fetchClusterList' });
    }
  },

  *fetchDeleteCluster({ payload }) {
    const res = yield call(clusterApi.requestDeleteCluster, payload);
    if (res) yield put({ type: 'cluster/fetchClusterList' });
  },
};

export const reducers = {
  setClusterVis(state, { payload }) {
    state.clusterVis = { ...state.clusterVis, ...payload };
    return { ...state };
  },
};
