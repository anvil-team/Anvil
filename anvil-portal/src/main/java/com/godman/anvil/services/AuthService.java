package com.godman.anvil.services;

import java.util.List;

import com.godman.anvil.domain.response.CategoryResponse;

public interface AuthService {

	/**
	 * 新建授权token
	 * 
	 * @param username
	 * @param password
	 * @return
	 */
	String createAuthenticationToken(String username, String password);

	/**
	 * 刷新授权token
	 * 
	 * @param oldToken
	 * @return
	 */
	String refreshAuthenticationToken(String oldToken);

	/**
	 * 获取目录
	 * 
	 * @param token
	 * @return
	 */
	List<CategoryResponse> getCategory(String token);
}
