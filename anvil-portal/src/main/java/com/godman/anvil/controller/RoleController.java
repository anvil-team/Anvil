package com.godman.anvil.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.godman.anvil.domain.request.RoleRequest;
import com.godman.anvil.domain.response.CommonResponse;
import com.godman.anvil.domain.response.RoleBatchResponse;
import com.godman.anvil.domain.response.RoleComboResponse;
import com.godman.anvil.services.RoleService;

@RestController
@RequestMapping("/api/v1/role")
public class RoleController {

	@Autowired
	private RoleService roleService;

	/**
	 * 角色列表下发接口
	 * 
	 * @param roleCode
	 * @param currentPage
	 * @param pageSize
	 * @return
	 * @throws Exception
	 */
	@PreAuthorize("hasAuthority('SYSTEM_ADMIN') OR hasAuthority('NORMAL_ADMIN')")
	@RequestMapping(value = "/roleBatch", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public CommonResponse<RoleBatchResponse> getRoleDetailList(String roleCode, @RequestParam("currentPage") Integer currentPage, @RequestParam("pageSize") Integer pageSize) throws Exception {
		RoleBatchResponse roleBatchResponse = roleService.getRolesBatch(roleCode, currentPage, pageSize);
		CommonResponse<RoleBatchResponse> response = new CommonResponse<RoleBatchResponse>();
		response.setSuccess(CommonResponse.SUCCESS_STATE);
		response.setData(roleBatchResponse);
		return response;
	}

	/**
	 * 角色列表下发接口
	 * 
	 * @param roleCode
	 * @param currentPage
	 * @param pageSize
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/roleCombo", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public CommonResponse<List<RoleComboResponse>> getRoleCombo() throws Exception {
		List<RoleComboResponse> roleComboResponses = roleService.getRoleCombo();
		CommonResponse<List<RoleComboResponse>> response = new CommonResponse<List<RoleComboResponse>>();
		response.setSuccess(CommonResponse.SUCCESS_STATE);
		response.setData(roleComboResponses);
		return response;
	}

	/**
	 * 角色列表新增/修改接口
	 * 
	 * @param role
	 * @return
	 * @throws Exception
	 */
	@PreAuthorize("hasAuthority('SYSTEM_ADMIN')")
	@RequestMapping(value = "/roleBatch", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public CommonResponse<Void> updateRoleDetailList(@RequestParam("role") RoleRequest role) throws Exception {
		
		if(role==null){
			throw new Exception("role is null or structure error");
		}
		
		if(role.getConstraintViolationException()!=null){
			throw role.getConstraintViolationException();
		}
		
		Long id = role.getId();
		if (id == null) {
			roleService.addRolesBatch(role);
		} else {
			roleService.updateRolesBatch(role);
		}
		CommonResponse<Void> response = new CommonResponse<Void>();
		response.setSuccess(CommonResponse.SUCCESS_STATE);
		return response;
	}

	/**
	 * 角色列表删除接口
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@PreAuthorize("hasAuthority('SYSTEM_ADMIN')")
	@RequestMapping(value = "/roleBatch", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public CommonResponse<Void> deleteRoleDetailList(@RequestParam("id") Integer id) throws Exception {
		roleService.deleteRolesBatch(id);
		CommonResponse<Void> response = new CommonResponse<Void>();
		response.setSuccess(CommonResponse.SUCCESS_STATE);
		return response;
	}
}
