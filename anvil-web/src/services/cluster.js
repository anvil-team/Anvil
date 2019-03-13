import axios from 'axios';

export async function requestClusterList(params) {
  return axios.get('/cluster/clusterBatch', { params });
}
