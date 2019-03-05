package com.godman.anvil.services.impl;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import com.godman.anvil.dao.AnvilUserDao;
import com.godman.anvil.domain.AnvilRole;
import com.godman.anvil.domain.AnvilUser;
import com.godman.anvil.domain.request.UserDetailRequest;
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

	private static final String DEFAULT_PASSWORD = "12345678";

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
	public Boolean updateUserByAuthToken(String token, UserDetailRequest userDetail) {
		String userName = jwtTokenUtil.getUsernameFromToken(token);
		AnvilUser user = anvilUserDao.findByUsername(userName);
		if (Strings.isNullOrEmpty(userName) || user == null) {
			return false;
		}

		AnvilUser updateUser = new AnvilUser();
		BeanUtils.copyProperties(userDetail, updateUser);

		// 确保ID和username不变
		updateUser.setId(user.getId());
		updateUser.setUsername(user.getUsername());
		anvilUserDao.updateUser(user);
		return true;
	}

	@Override
	public UserBatchResponse getUsersBatch(String username, Integer currentPage, Integer pageSize) {
		Integer total = anvilUserDao.getSize();
		List<AnvilUser> users = anvilUserDao.findByPaging(username, (currentPage - 1) * pageSize, pageSize);

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

	@Override
	public void addUserBatch(UserDetailRequest userDetail) throws Exception {
		try {
			userDetail.setPassword(DEFAULT_PASSWORD);
			AnvilUser user = new AnvilUser();
			BeanUtils.copyProperties(userDetail, user);
			anvilUserDao.addUser(user);
		} catch (DuplicateKeyException e) {
			throw new Exception("username : " + userDetail.getUsername() + " is already exist.");
		}
	}

	@Override
	public void updateUserBatch(UserDetailRequest userDetail) {
		AnvilUser user = new AnvilUser();
		BeanUtils.copyProperties(userDetail, user);
		anvilUserDao.updateUser(user);
	}

	@Override
	public void deleteUsersBatch(Integer id) {
		anvilUserDao.deleteUser(id);
	}

	private UserDetailResponse genUserDetailResponse(AnvilUser user) {
		UserDetailResponse userDetailResponse = new UserDetailResponse();
		BeanUtils.copyProperties(user, userDetailResponse);
		
		AnvilRole role=user.getRoleObject();
		userDetailResponse.setRoleId(role.getId());
		userDetailResponse.setRoleCode(role.getRoleCode());
		userDetailResponse.setRoleName(role.getRoleName());
		return userDetailResponse;
	}

}
