package com.godman.anvil.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.godman.anvil.domain.response.CommonResponse;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

	@RequestMapping(value = "/userDetail", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public CommonResponse<String> createAuthenticationToken(String username, String password) {
		CommonResponse<String> response = new CommonResponse<String>();
		response.setSuccess(CommonResponse.SUCCESS_STATE);
		response.setData("hello world");
		return response;
	}
}
