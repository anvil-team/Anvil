package com.godman.anvil.services;

import com.godman.anvil.domain.response.UserBatchResponse;
import com.godman.anvil.domain.response.UserDetailResponse;

public interface UserService {
	UserDetailResponse getUserByAuthToken(String token);

	UserBatchResponse getUsersBatch(Integer currentPage, Integer pageSize);
}
