import axios from 'axios';

export async function requestClusterList(params) {
  return axios.get('/cluster/clusterBatch', { params });
}

export async function requestEditCluster(params) {
  return axios.post('/cluster/clusterBatch', { cluster: JSON.stringify(params.data) });
}

export async function requestDeleteCluster(params) {
  return axios.delete('/cluster/clusterBatch', { params });
}
