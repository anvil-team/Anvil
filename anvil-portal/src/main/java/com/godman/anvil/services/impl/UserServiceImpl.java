package com.godman.anvil.services.impl;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
	private BCryptPasswordEncoder encoder;

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
	public Boolean updateUserByAuthToken(String token, UserDetailRequest userDetail) {
		String userName = jwtTokenUtil.getUsernameFromToken(token);
		AnvilUser user = anvilUserDao.findByUsername(userName);
		if (Strings.isNullOrEmpty(userName) || user == null) {
			return false;
		}
		
		// 确保roleId和username不变
		AnvilUser updateUser = convertUserDetailRequestTAnvilUser(userDetail);
		if (updateUser.getId() == null||updateUser.getId()!=user.getId()) {
			updateUser.setId(user.getId());
		}
		updateUser.setRoleId(null);
		updateUser.setUsername(null);
		anvilUserDao.updateUser(updateUser);
		return true;
	}

	@Override
	public void addUserBatch(UserDetailRequest userDetail) throws Exception {
		try {
			userDetail.setPassword(encoder.encode(DEFAULT_PASSWORD));
			AnvilUser user = convertUserDetailRequestTAnvilUser(userDetail);
			anvilUserDao.addUser(user);
		} catch (DuplicateKeyException e) {
			throw new Exception("username : " + userDetail.getUsername() + " is already exist.");
		}
	}

	@Override
	public void updateUserBatch(UserDetailRequest userDetail) {
		AnvilUser user = convertUserDetailRequestTAnvilUser(userDetail);
		anvilUserDao.updateUser(user);
	}

	@Override
	public void deleteUsersBatch(Integer id) {
		anvilUserDao.deleteUser(id);
	}

	private UserDetailResponse genUserDetailResponse(AnvilUser user) {
		UserDetailResponse userDetailResponse = new UserDetailResponse();
		BeanUtils.copyProperties(user, userDetailResponse);

		AnvilRole role = user.getRoleObject();
		userDetailResponse.setRoleCode(role.getRoleCode());
		userDetailResponse.setRoleName(role.getRoleName());
		return userDetailResponse;
	}

	private AnvilUser convertUserDetailRequestTAnvilUser(UserDetailRequest userDetail) {
		AnvilUser anvilUser = new AnvilUser();
		anvilUser.setId(userDetail.getId());
		if (!Strings.isNullOrEmpty(userDetail.getUsername())) {
			anvilUser.setUsername(userDetail.getUsername());
		}
		anvilUser.setRealName(userDetail.getRealName());
		if (!Strings.isNullOrEmpty(userDetail.getPassword())) {
			anvilUser.setPassword(encoder.encode(userDetail.getPassword()));
		}
		anvilUser.setRoleId(userDetail.getRoleId());
		anvilUser.setDepartment(userDetail.getDepartment());
		anvilUser.setPosition(userDetail.getPosition());
		return anvilUser;
	}

}
