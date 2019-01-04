package com.godman.anvil.services;

import com.godman.anvil.domain.request.UserDetaiRequest;
import com.godman.anvil.domain.response.UserBatchResponse;
import com.godman.anvil.domain.response.UserDetailResponse;

public interface UserService {

	/**
	 * 根据token获取用户信息
	 * 
	 * @param token
	 * @return
	 */
	UserDetailResponse getUserByAuthToken(String token);

	/**
	 * 根据token更新用户信息
	 * 
	 * @param token
	 * @return
	 */
	Boolean updateUserByAuthToken(String token, UserDetaiRequest userDetail);

	/**
	 * 获取用户分页列表
	 * 
	 * @param username
	 * @param currentPage
	 * @param pageSize
	 * @return
	 */
	UserBatchResponse getUsersBatch(String username, Integer currentPage, Integer pageSize);

	/**
	 * 新增用户
	 * 
	 * @param userDetail
	 */
	void addUserBatch(UserDetaiRequest userDetail);

	/**
	 * 修改用户
	 * 
	 * @param userDetail
	 */
	void updateUserBatch(UserDetaiRequest userDetail);

	/**
	 * 删除用户
	 * 
	 * @param id
	 */
	void deleteUsersBatch(Integer id);
}
