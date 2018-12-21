package com.godman.anvil.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.godman.anvil.dao.AnvilCategoryDao;
import com.godman.anvil.dao.AnvilUserDao;
import com.godman.anvil.domain.AnvilCategory;
import com.godman.anvil.domain.AnvilUser;
import com.godman.anvil.domain.response.CategoryChildResponse;
import com.godman.anvil.domain.response.CategoryResponse;
import com.godman.anvil.services.AuthService;
import com.godman.anvil.utils.JwtTokenUtil;
import com.google.common.base.Strings;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;

@Service
public class AuthServiceImpl implements AuthService {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private AnvilCategoryDao anvilCategoryDao;

	@Autowired
	private AnvilUserDao anvilUserDao;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Override
	public String createAuthenticationToken(String username, String password) {
		UsernamePasswordAuthenticationToken upToken = new UsernamePasswordAuthenticationToken(username, password);

		final Authentication authentication = authenticationManager.authenticate(upToken);
		SecurityContextHolder.getContext().setAuthentication(authentication);

		final UserDetails userDetails = userDetailsService.loadUserByUsername(username);
		final String token = jwtTokenUtil.generateToken(userDetails);
		return token;
	}

	@Override
	public String refreshAuthenticationToken(String oldToken) {
		String token = null;
		if (!jwtTokenUtil.isTokenExpired(oldToken)) {
			return oldToken;
		}
		if (jwtTokenUtil.canTokenBeRefreshed(oldToken)) {
			token = jwtTokenUtil.refreshToken(oldToken);
		}
		return token;
	}

	@Override
	public List<CategoryResponse> getCategory(String token) {
		String userName = jwtTokenUtil.getUsernameFromToken(token);
		AnvilUser user = anvilUserDao.findByUsername(userName);
		if(Strings.isNullOrEmpty(userName)||user==null){
			return null;
		}

		Map<Long, CategoryResponse> categoryMap = Maps.newHashMap();
		List<AnvilCategory> categorys = anvilCategoryDao.findCategoryByRoleId(user.getRole().getId());
		for (AnvilCategory category : categorys) {
			Long parentId = category.getParentId();
			if (category.getParentId() == null) {
				parentId = category.getId();
			}
			if (categoryMap.get(parentId) == null) {
				CategoryResponse categoryResponse = new CategoryResponse();
				List<CategoryChildResponse> childCategory=Lists.newArrayList();
				categoryResponse.setChildCategory(childCategory);
				categoryMap.put(parentId, categoryResponse);
			}
			
			if (category.getId() != parentId) {
				CategoryChildResponse categoryChildResponse = new CategoryChildResponse();
				categoryChildResponse.setCategoryName(category.getCategoryName());
				categoryChildResponse.setUrl(category.getUrl());
				categoryMap.get(parentId).getChildCategory().add(categoryChildResponse);
			} else {
				categoryMap.get(parentId).setParentName(category.getCategoryName());
			}
		}
		
		List<CategoryResponse> response=Lists.newArrayList();
		for(CategoryResponse categoryResponse:categoryMap.values()){
			if(Strings.isNullOrEmpty(categoryResponse.getParentName())){
				break;
			}
			response.add(categoryResponse);
		}
		return response;
	}
}
