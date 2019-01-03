package com.godman.anvil.services.impl;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.godman.anvil.dao.AnvilUserDao;
import com.godman.anvil.domain.AnvilUser;
import com.godman.anvil.domain.response.UserBatchResponse;
import com.godman.anvil.domain.response.UserDetailResponse;
import com.godman.anvil.services.UserService;
import com.godman.anvil.utils.JwtTokenUtil;
import com.google.common.base.Strings;
import com.google.common.collect.Lists;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private AnvilUserDao anvilUserDao;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Override
	public UserDetailResponse getUserByAuthToken(String token) {
		String userName = jwtTokenUtil.getUsernameFromToken(token);
		AnvilUser user = anvilUserDao.findByUsername(userName);
		if (Strings.isNullOrEmpty(userName) || user == null) {
			return null;
		}
		UserDetailResponse userDetailResponse = genUserDetailResponse(user);
		return userDetailResponse;
	}

	@Override
	public UserBatchResponse getUsersBatch(Integer currentPage, Integer pageSize) {
		Integer total = anvilUserDao.getSize();
		List<AnvilUser> users = anvilUserDao.findByPaging((currentPage - 1) * pageSize, pageSize);

		List<UserDetailResponse> userDetails = Lists.newArrayList();
		for (AnvilUser user : users) {
			UserDetailResponse userDetailResponse = genUserDetailResponse(user);
			userDetails.add(userDetailResponse);
		}
		UserBatchResponse userBatchResponse = new UserBatchResponse();
		userBatchResponse.setTotal(total);
		userBatchResponse.setCurrentPage(currentPage);
		userBatchResponse.setPageSize(pageSize);
		userBatchResponse.setUserDetails(userDetails);
		return userBatchResponse;
	}

	private UserDetailResponse genUserDetailResponse(AnvilUser user) {
		UserDetailResponse userDetailResponse = new UserDetailResponse();
		BeanUtils.copyProperties(user, userDetailResponse);
		BeanUtils.copyProperties(user.getRole(), userDetailResponse);
		return userDetailResponse;
	}
}
