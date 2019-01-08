/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2019-01-07 22:01:12
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2019-01-07 22:01:12
 * 角色服务
 */

import axios from 'axios';
import invariant from 'invariant';

/**
 * 得到所有角色类型
 */
export function getRoleCombo() {
  return axios.get('/role/roleComo');
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
  invariant(params.roleCode, '缺少 roleCode');
  invariant(params.roleName, '缺少 roleName');
  invariant(params.roleDesc, '缺少roleDesc');
  return axios.post('/role/roleBatch', { role: params });
}

export function deleteRole(params) {
  invariant(params.id, '缺少 id');
  return axios.delete('/role/roleBatch', { params });
}
