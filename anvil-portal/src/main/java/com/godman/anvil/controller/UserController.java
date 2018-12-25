package com.godman.anvil.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.godman.anvil.domain.response.CommonResponse;
import com.godman.anvil.domain.response.UserDetailResponse;
import com.godman.anvil.services.UserService;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

	@Autowired
	private UserService userService;

	@RequestMapping(value = "/userDetail", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public CommonResponse<UserDetailResponse> getUserDetail(HttpServletRequest request) throws Exception {
		String token = request.getHeader("Authorization");
		UserDetailResponse userDetailResponse = userService.getUserByAuthToken(token);
		if (userDetailResponse == null) {
			throw new Exception("token invalid");
		}

		CommonResponse<UserDetailResponse> response = new CommonResponse<UserDetailResponse>();
		response.setSuccess(CommonResponse.SUCCESS_STATE);
		response.setData(userDetailResponse);
		return response;
	}
}
