package com.godman.anvil.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.godman.anvil.domain.response.AuthTokenResponse;
import com.godman.anvil.domain.response.CommonResponse;
import com.godman.anvil.enumtype.AuthTokenAccessbleType;
import com.godman.anvil.services.AuthService;

@RestController
public class AuthController {

	@Autowired
	private AuthService authService;

	@RequestMapping(value = "/auth/login", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public CommonResponse<AuthTokenResponse> createAuthenticationToken(String username, String password) {
		String token = authService.createAuthenticationToken(username, password);

		AuthTokenResponse authTokenResponse = new AuthTokenResponse();
		authTokenResponse.setToken(token);

		CommonResponse<AuthTokenResponse> response = new CommonResponse<AuthTokenResponse>();
		response.setSuccess(CommonResponse.SUCCESS_STATE);
		response.setData(authTokenResponse);
		return response;
	}

	@RequestMapping(value = "/auth/refresh", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public CommonResponse<AuthTokenResponse> refreshAuthenticationToken(HttpServletRequest request) {
		String oldToken = request.getHeader("token");
		String token = authService.refreshAuthenticationToken(oldToken);

		AuthTokenResponse authTokenResponse = new AuthTokenResponse(AuthTokenAccessbleType.NOTALLOW_ACCESS);
		if (token != null) {
			authTokenResponse.setToken(token);
			authTokenResponse.setIsAccessible(AuthTokenAccessbleType.ALLOW_ACCESS);
		}

		CommonResponse<AuthTokenResponse> response = new CommonResponse<AuthTokenResponse>();
		response.setSuccess(CommonResponse.SUCCESS_STATE);
		response.setData(authTokenResponse);
		return response;
	}

}
