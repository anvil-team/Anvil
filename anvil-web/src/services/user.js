/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2019-01-07 22:01:36
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2019-04-10 16:49:40
 * 用户服务
 */

import axios from 'axios';
import invariant from 'invariant';

export function getUserDetail() {
  return axios.get('/user/userDetail');
}

export function requestDeleteUser(params) {
  invariant(params.id, '缺少Id');
  return axios.delete('/user/userDetail');
}

export function requestEditUser(params) {
  invariant(params.realName, 'miss realName');
  invariant(params.username, 'miss username');
  invariant(params.department, 'miss department');
  invariant(params.position, 'miss position');
  invariant(params.roleId, 'miss roleId');
  return axios.post('/user/userBatch', { userDetail: JSON.stringify(params) });
}

export function requestUserList(params) {
  return axios.get('/user/userBatch', { params });
}
