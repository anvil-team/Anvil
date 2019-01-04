package com.godman.anvil.services;

import com.godman.anvil.domain.request.UserDetaiRequest;
import com.godman.anvil.domain.response.UserBatchResponse;
import com.godman.anvil.domain.response.UserDetailResponse;

public interface UserService {
	UserDetailResponse getUserByAuthToken(String token);

	UserBatchResponse getUsersBatch(String username, Integer currentPage, Integer pageSize);

	void addUserBatch(UserDetaiRequest userDetail);

	void updateUserBatch(UserDetaiRequest userDetail);

	void deleteUsersBatch(Integer id);
}
