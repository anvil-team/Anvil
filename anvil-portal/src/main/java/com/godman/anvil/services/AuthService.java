package com.godman.anvil.services;

import java.util.List;

import com.godman.anvil.domain.response.CategoryResponse;

public interface AuthService {
	String createAuthenticationToken(String username, String password);

	String refreshAuthenticationToken(String oldToken);

	List<CategoryResponse> getCategory(String token);
}
