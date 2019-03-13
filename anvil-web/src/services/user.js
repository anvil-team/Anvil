/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2019-01-07 22:01:36
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2019-03-13 22:11:32
 * 用户服务
 */

import axios from 'axios';
import invariant from 'invariant';

export function getUserDetail() {
  return axios.get('/user/userDetail');
}

export function deleteUser(params) {
  invariant(params.id, '缺少Id');
  return axios.delete('/user/userDetail');
}

export function editUser(params) {
  invariant(params.realName, 'miss realName');
  invariant(params.username, 'miss username');
  invariant(params.department, 'miss department');
  invariant(params.position, 'miss position');
  invariant(params.role, 'miss role');
  return axios.post('/user/userBatch', params);
}

export function getUserList(params) {
  return axios.get('/user/userBatch', { params });
}
