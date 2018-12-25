package com.godman.anvil.services.impl;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.godman.anvil.dao.AnvilUserDao;
import com.godman.anvil.domain.AnvilUser;
import com.godman.anvil.domain.response.UserDetailResponse;
import com.godman.anvil.services.UserService;
import com.godman.anvil.utils.JwtTokenUtil;
import com.google.common.base.Strings;

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
		UserDetailResponse userDetailResponse = new UserDetailResponse();
		BeanUtils.copyProperties(user, userDetailResponse);
		BeanUtils.copyProperties(user.getRole(), userDetailResponse);
		return userDetailResponse;
	}
}
