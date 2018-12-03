package com.godman.anvil.controller;

import java.util.Map;

import javax.security.sasl.AuthenticationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.godman.anvil.domain.response.CommonResponse;
import com.godman.anvil.services.AuthService;
import com.google.common.collect.Maps;

@RestController
public class AuthController {

	@Value("${jwt.header}")
	private String tokenHeader;

	@Autowired
	private AuthService authService;

	@RequestMapping(value = "/auth/login", method = RequestMethod.POST)
	public CommonResponse<Map<String, String>> createAuthenticationToken(String username, String password) throws AuthenticationException {
		final String token = authService.login(username, password);

		Map<String, String> tokenMap = Maps.newHashMap();
		tokenMap.put("token", token);

		CommonResponse<Map<String, String>> response = new CommonResponse<Map<String, String>>();
		response.setSuccess(CommonResponse.SUCCESS_STATE);
		response.setData(tokenMap);
		return response;
	}

}
