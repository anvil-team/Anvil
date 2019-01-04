package com.godman.anvil.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.godman.anvil.domain.request.UserDetailRequest;
import com.godman.anvil.domain.response.CommonResponse;
import com.godman.anvil.domain.response.UserBatchResponse;
import com.godman.anvil.domain.response.UserDetailResponse;
import com.godman.anvil.services.UserService;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

	@Autowired
	private UserService userService;

	/**
	 * 用户信息下发接口（用户自身）
	 * 
	 * @param request
	 * @return
	 * @throws Exception
	 */
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

	/**
	 * 用户信息修改接口（用户自身）
	 * 
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/userDetail", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public CommonResponse<UserDetailResponse> updateUserDetail(HttpServletRequest request, @RequestParam("userDetail") UserDetailRequest userDetail) throws Exception {
		String token = request.getHeader("Authorization");
		Boolean isUpdate = userService.updateUserByAuthToken(token, userDetail);
		if (!isUpdate) {
			throw new Exception("token invalid");
		}

		CommonResponse<UserDetailResponse> response = new CommonResponse<UserDetailResponse>();
		response.setSuccess(CommonResponse.SUCCESS_STATE);
		return response;
	}

	/**
	 * 用户列表下发接口
	 * 
	 * @param username
	 * @param currentPage
	 * @param pageSize
	 * @return
	 * @throws Exception
	 */
	@PreAuthorize("hasAuthority('SYSTEM_ADMIN','NORMAL_ADMIN')")
	@RequestMapping(value = "/userBatch", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public CommonResponse<UserBatchResponse> getUserDetailList(String username, @RequestParam("currentPage") Integer currentPage, @RequestParam("pageSize") Integer pageSize) throws Exception {
		UserBatchResponse userBatchResponse = userService.getUsersBatch(username, currentPage, pageSize);
		CommonResponse<UserBatchResponse> response = new CommonResponse<UserBatchResponse>();
		response.setSuccess(CommonResponse.SUCCESS_STATE);
		response.setData(userBatchResponse);
		return response;
	}

	/**
	 * 用户列表新增/修改接口
	 * 
	 * @param userDetail
	 * @return
	 * @throws Exception
	 */
	@PreAuthorize("hasAuthority('SYSTEM_ADMIN')")
	@RequestMapping(value = "/userBatch", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public CommonResponse<Void> updateUserDetailList(@RequestParam("userDetail") UserDetailRequest userDetail) throws Exception {
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

	/**
	 * 用户列表删除接口
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@PreAuthorize("hasAuthority('SYSTEM_ADMIN')")
	@RequestMapping(value = "/userBatch", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public CommonResponse<Void> deleteUserDetailList(@RequestParam("id") Integer id) throws Exception {
		userService.deleteUsersBatch(id);
		CommonResponse<Void> response = new CommonResponse<Void>();
		response.setSuccess(CommonResponse.SUCCESS_STATE);
		return response;
	}
}
