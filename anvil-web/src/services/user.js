import axios from 'axios';
import invariant from 'invariant';

export function getUserDetail() {
  return axios.get('/user/userDetail');
}

export function updateUser() {
  return axios.put('/user/userDetail');
}

export function deleteUser(params) {
  invariant(params.id, '缺少Id');
  return axios.delete('/user/userDetail');
}

export function addUser(params) {
  invariant(params.realName, '姓名');
  invariant(params.username, '缺少用户名称');
  invariant(params.department, '缺少部门');
  invariant(params.position, '缺少职位');
  invariant(params.roleCode, '缺少角色编码');
  invariant(params.roleName, '缺少角色名称');
  return axios.post('/user/userDetail');
}
