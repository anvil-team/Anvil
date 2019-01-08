/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2018-12-11 21:06:42
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2019-01-07 22:01:30
 * auth http model
 */
import invariant from 'invariant';
import axios from 'axios';

export function login(username, password) {
  invariant(username, 'need username');
  invariant(password, 'need password');
  return axios.post('/auth/login', { username, password });
}

export function refresh() {
  return axios.get('/auth/refresh');
}

export function category() {
  return axios.get('/auth/category');
}

export function userDetail() {
  return axios.get('/auth/userDetail');
}
