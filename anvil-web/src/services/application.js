import axios from 'axios';
import invariant from 'invariant';

export async function requestApplicationList(params) {
  return axios.get('/application/applicationBatch', { params });
}

export async function requestEditApplication(params) {
  invariant(params.applicationName, 'miss applicationName');
  // invariant(params.description, 'miss description');
  invariant(params.personInCharge, 'miss personInCharge');
  invariant(params.shouldReviewed === 0 || params.shouldReviewed === 1, 'miss shouldReviewed');

  return axios.post('/application/applicationBatch', { application: JSON.stringify(params) });
}

export async function requestDeleteApplication(params) {
  invariant(params.id);

  return axios.delete('/application/applicationBatch', { params });
}

export async function requestApplicationCombo() {
  return axios.get('/application/applicationCombo');
}

export async function requestUpdateApplicationAssign(params) {
  return axios.post('/application/applicationAssign', params);
}

export async function requestApplicationAssignDetail(params) {
  return axios.get('/application/applicationAssign', { params });
}
