import axios from 'axios';
import invariant from 'invariant';

export async function requestApplicationList(params) {
  return axios.get('/application/applicationBatch', { params });
}

export async function requestEditProject(params) {
  invariant(params.applicationName, 'miss applicationName');
  invariant(params.description, 'miss description');
  invariant(params.personInCharge, 'miss personInCharge');
  invariant(params.shouldReviewed, 'miss shouldReviewed');

  return axios.post('/application/applicationBatch');
}

export async function requestDeleteApplication(params) {
  invariant(params.id);

  return axios.delete('/application/applicationBatch', { params });
}