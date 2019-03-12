package com.godman.anvil.controller;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.godman.anvil.domain.request.ApplicationRequest;
import com.godman.anvil.domain.response.ApplicationAssignResponse;
import com.godman.anvil.domain.response.ApplicationBatchResponse;
import com.godman.anvil.domain.response.ApplicationComboResponse;
import com.godman.anvil.domain.response.CommonResponse;
import com.godman.anvil.services.ApplicationService;

@RestController
@RequestMapping("/api/v1/application")
public class ApplicationController {

	@Autowired
	private ApplicationService applicationService;

	/**
	 * 项目列表下发接口
	 * 
	 * @param applicationName
	 * @param currentPage
	 * @param pageSize
	 * @return
	 * @throws Exception
	 */
	@PreAuthorize("hasAuthority('SYSTEM_ADMIN') OR hasAuthority('NORMAL_ADMIN')")
	@RequestMapping(value = "/applicationBatch", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public CommonResponse<ApplicationBatchResponse> getApplicationList(String applicationName,
			@RequestParam("currentPage") Integer currentPage, @RequestParam("pageSize") Integer pageSize)
			throws Exception {

		ApplicationBatchResponse applicationBatchResponse = applicationService.getApplicationsBatch(applicationName,
				currentPage, pageSize);

		CommonResponse<ApplicationBatchResponse> response = new CommonResponse<ApplicationBatchResponse>();
		response.setSuccess(CommonResponse.SUCCESS_STATE);
		response.setData(applicationBatchResponse);
		return response;
	}

	/**
	 * 项目列表combo下发接口
	 * 
	 * @param roleCode
	 * @param currentPage
	 * @param pageSize
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/applicationCombo", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public CommonResponse<Collection<ApplicationComboResponse>> getRoleCombo() throws Exception {

		Collection<ApplicationComboResponse> applicationDetailResponses = applicationService.getApplicationCombo();

		CommonResponse<Collection<ApplicationComboResponse>> response = new CommonResponse<Collection<ApplicationComboResponse>>();
		response.setSuccess(CommonResponse.SUCCESS_STATE);
		response.setData(applicationDetailResponses);
		return response;
	}

	/**
	 * 项目列表新增/修改接口
	 * 
	 * @param application
	 * @return
	 * @throws Exception
	 */
	@PreAuthorize("hasAuthority('SYSTEM_ADMIN') OR hasAuthority('NORMAL_ADMIN')")
	@RequestMapping(value = "/applicationBatch", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public CommonResponse<Void> updateApplication(@RequestParam("application") ApplicationRequest application)
			throws Exception {

		if (application == null) {
			throw new Exception("application is null or structure error");
		}

		if (application.getConstraintViolationException() != null) {
			throw application.getConstraintViolationException();
		}

		Long id = application.getId();
		if (id == null) {
			applicationService.addApplicationsBatch(application);
		} else {
			applicationService.updateApplicationsBatch(application);
		}
		CommonResponse<Void> response = new CommonResponse<Void>();
		response.setSuccess(CommonResponse.SUCCESS_STATE);
		return response;
	}

	/**
	 * 项目列表删除接口
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@PreAuthorize("hasAuthority('SYSTEM_ADMIN') OR hasAuthority('NORMAL_ADMIN')")
	@RequestMapping(value = "/applicationBatch", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public CommonResponse<Void> deleteApplication(@RequestParam("id") Integer id) throws Exception {

		applicationService.deleteApplicationsBatch(id);

		CommonResponse<Void> response = new CommonResponse<Void>();
		response.setSuccess(CommonResponse.SUCCESS_STATE);
		return response;
	}

	/**
	 * 目录列表分配情况接口
	 * 
	 * @return
	 * @throws Exception
	 */
	@PreAuthorize("hasAuthority('SYSTEM_ADMIN')")
	@RequestMapping(value = "/applicationAssign", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public CommonResponse<ApplicationAssignResponse> getApplicationAssign(@RequestParam("userId") Long userId,
			@RequestParam("condition") Integer condition,
			@RequestParam(value = "applicationName", required = false) String applicationName) throws Exception {

		ApplicationAssignResponse applicationAssignResponse = applicationService.getApplicationAssign(userId, condition,
				applicationName);

		CommonResponse<ApplicationAssignResponse> response = new CommonResponse<>();
		response.setSuccess(CommonResponse.SUCCESS_STATE);
		response.setData(applicationAssignResponse);
		return response;
	}

	/**
	 * 目录列表分配接口
	 * 
	 * @param roleId
	 * @param categoryIdAssign
	 * @param categoryIdDeassign
	 * @return
	 * @throws Exception
	 */
	@PreAuthorize("hasAuthority('SYSTEM_ADMIN')")
	@RequestMapping(value = "/applicationAssign", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public CommonResponse<Void> updateApplicationAssign(@RequestParam("userId") Long userId,
			@RequestParam(value = "applicationIdAssign", required = false) String applicationIdAssign,
			@RequestParam(value = "applicationIdDeassign", required = false) String applicationIdDeassign)
			throws Exception {

		applicationService.updateApplicationAssign(userId, applicationIdAssign, applicationIdDeassign);

		CommonResponse<Void> response = new CommonResponse<Void>();
		response.setSuccess(CommonResponse.SUCCESS_STATE);
		return response;
	}

}
