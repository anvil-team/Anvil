package com.godman.anvil.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.godman.anvil.domain.response.AuthTokenResponse;
import com.godman.anvil.domain.response.CategoryResponse;
import com.godman.anvil.domain.response.CommonResponse;
import com.godman.anvil.enumtype.AuthTokenAccessbleType;
import com.godman.anvil.services.AuthService;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

	@Autowired
	private AuthService authService;

	/**
	 * 授权认证接口
	 * 
	 * @param username
	 * @param password
	 * @return
	 */
	@RequestMapping(value = "/login", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public CommonResponse<AuthTokenResponse> createAuthenticationToken(String username, String password) {
		String token = authService.createAuthenticationToken(username, password);

		AuthTokenResponse authTokenResponse = new AuthTokenResponse();
		authTokenResponse.setToken(token);
		authTokenResponse.setIsAccessible(AuthTokenAccessbleType.ALLOW_ACCESS);

		CommonResponse<AuthTokenResponse> response = new CommonResponse<AuthTokenResponse>();
		response.setSuccess(CommonResponse.SUCCESS_STATE);
		response.setData(authTokenResponse);
		return response;
	}

	/**
	 * 授权token刷新接口
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/refresh", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public CommonResponse<AuthTokenResponse> refreshAuthenticationToken(HttpServletRequest request) {
		String oldToken = request.getHeader("Authorization");
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

	/**
	 * 目录下发接口
	 * 
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/category", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public CommonResponse<List<CategoryResponse>> getCategory(HttpServletRequest request) throws Exception {
		String token = request.getHeader("Authorization");
		List<CategoryResponse> categoryResponse = authService.getCategory(token);
		if (categoryResponse == null) {
			throw new Exception("token invalid");
		}

		CommonResponse<List<CategoryResponse>> response = new CommonResponse<List<CategoryResponse>>();
		response.setSuccess(CommonResponse.SUCCESS_STATE);
		response.setData(categoryResponse);
		return response;
	}
}
