package com.godman.anvil.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.godman.anvil.domain.request.UserDetaiRequest;
import com.godman.anvil.domain.response.CommonResponse;
import com.godman.anvil.domain.response.UserBatchResponse;
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

	@PreAuthorize("hasAuthority('SYSTEM_ADMIN','NORMAL_ADMIN')")
	@RequestMapping(value = "/userBatch", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public CommonResponse<UserBatchResponse> addUserDetail(String username, @RequestParam("currentPage") Integer currentPage, @RequestParam("pageSize") Integer pageSize) throws Exception {
		UserBatchResponse userBatchResponse = userService.getUsersBatch(username, currentPage, pageSize);
		CommonResponse<UserBatchResponse> response = new CommonResponse<UserBatchResponse>();
		response.setSuccess(CommonResponse.SUCCESS_STATE);
		response.setData(userBatchResponse);
		return response;
	}

	@PreAuthorize("hasAuthority('SYSTEM_ADMIN')")
	@RequestMapping(value = "/userBatch", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public CommonResponse<Void> updateUserDetail(@RequestParam("userDetail") UserDetaiRequest userDetail) throws Exception {
		Long id = userDetail.getId();
		if (id == null) {
			userService.addUserBatch(userDetail);
		} else {
			userService.updateUserBatch(userDetail);
		}
		CommonResponse<Void> response = new CommonResponse<Void>();
		response.setSuccess(CommonResponse.SUCCESS_STATE);
		return response;
	}

	@PreAuthorize("hasAuthority('SYSTEM_ADMIN')")
	@RequestMapping(value = "/userBatch", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public CommonResponse<Void> deleteUserDetail(@RequestParam("id") Integer id) throws Exception {
		userService.deleteUsersBatch(id);
		CommonResponse<Void> response = new CommonResponse<Void>();
		response.setSuccess(CommonResponse.SUCCESS_STATE);
		return response;
	}
}
