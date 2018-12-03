package com.godman.anvil.services;

public interface AuthService {
	
	String login(String username, String password);

	String refresh(String oldToken);
}
