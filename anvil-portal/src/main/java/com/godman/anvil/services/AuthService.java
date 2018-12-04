package com.godman.anvil.services;

public interface AuthService {
	String createAuthenticationToken(String username, String password);

	String refreshAuthenticationToken(String oldToken);
}
