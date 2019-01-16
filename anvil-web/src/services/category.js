import axios from 'axios';
import invariant from 'invariant';

/**
 * 目录列表
 */
export function getCategoryList() {
  return axios.get('/category/categoryBatch');
}

/**
 * 添加和更新
 * @param {*} params
 */
export function editCategory(params, isAdd = false) {
  if (isAdd) {
    invariant(params.categoryName, 'miss categoryName');
    invariant(params.priority, 'miss priority');
  }
  return axios.post('/category/categoryBatch', { category: params });
}

/**
 * 删除目录
 * @param {{ id }} params
 */
export function deleteCategory(params) {
  invariant(params.id, 'miss id');
  return axios.delete('/category/categoryBatch', { params });
}
