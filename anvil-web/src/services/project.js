import axios from 'axios';
import invariant from 'invariant';

export async function requestProjectList() {
  return axios.get('/application/applicationBatch');
}

export async function requestEditProject(params) {
  invariant(params.applicationName, 'miss applicationName');
  invariant(params.description, 'miss description');
  invariant(params.personInCharge, 'miss personInCharge');
  invariant(params.shouldReviewed, 'miss shouldReviewed');

  return axios.post('/application/applicationBatch');
}

export async function requestDeleteProject(params) {
  invariant(params.id);

  return axios.delete('/application/applicationBatch', { params });
}
