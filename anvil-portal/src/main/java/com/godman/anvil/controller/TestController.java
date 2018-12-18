package com.godman.anvil.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.godman.anvil.domain.response.CommonResponse;
import com.godman.anvil.services.AuthService;

@RestController
@RequestMapping("/api/v1/test")
public class TestController {

	@Autowired
	private AuthService authService;

	@PreAuthorize("hasAuthority('SYSTEM_ADMIN')")
	@RequestMapping(value = "/test", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public CommonResponse<String> createAuthenticationToken(String username, String password) {
		CommonResponse<String> response = new CommonResponse<String>();
		response.setSuccess(CommonResponse.SUCCESS_STATE);
		response.setData("hello world");
		return response;
	}

}
