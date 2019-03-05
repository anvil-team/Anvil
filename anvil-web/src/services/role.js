/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2019-01-07 22:01:12
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2019-03-05 21:13:53
 * 角色服务
 */

import axios from 'axios';
import invariant from 'invariant';

/**
 * 得到所有角色类型
 */
export function getRoleCombo() {
  return axios.get('/role/roleCombo');
}

/**
 * 得到所有角色列表
 * @param {*} params
 */
export function getRoleList(params) {
  return axios.get('/role/roleBatch', { params });
}

/**
 * 新增和修改
 * @param {*} params
 */
export function editRole(params) {
  invariant(params.roleCode, 'miss roleCode');
  invariant(params.roleName, 'miss roleName');
  invariant(params.roleDesc, 'miss roleDesc');
  return axios.post('/role/roleBatch', { role: params });
}

export function deleteRole(params) {
  invariant(params.id, 'miss id');
  return axios.delete('/role/roleBatch', { params });
}
