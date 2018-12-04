package com.godman.anvil.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.godman.anvil.services.AuthService;
import com.godman.anvil.utils.JwtTokenUtil;

@Service
public class AuthServiceImpl implements AuthService {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserDetailsService userDetailsService;

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
			token=jwtTokenUtil.refreshToken(oldToken);
		}
		return token;
	}
}
