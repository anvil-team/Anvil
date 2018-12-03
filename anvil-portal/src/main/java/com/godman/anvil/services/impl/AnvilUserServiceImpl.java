package com.godman.anvil.services.impl;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.godman.anvil.dao.AnvilUserDao;
import com.godman.anvil.domain.AnvilUser;
import com.godman.anvil.security.SecurityUser;

@Service
public class AnvilUserServiceImpl implements UserDetailsService {

	@Autowired
	private AnvilUserDao anvilUserDao;

	@Override
	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
		AnvilUser anvilUser = anvilUserDao.findByUsername(userName);
		if (anvilUser == null) {
			throw new UsernameNotFoundException("用户名不存在");
		}

		SecurityUser user = new SecurityUser();
		BeanUtils.copyProperties(anvilUser, user);
		return user;
	}

}
