package com.godman.anvil.services;

import java.util.List;

import com.godman.anvil.domain.request.RoleRequest;
import com.godman.anvil.domain.response.RoleBatchResponse;
import com.godman.anvil.domain.response.RoleComboResponse;

public interface RoleService {

	/**
	 * 获取角色分页列表
	 * 
	 * @param roleCode
	 * @param currentPage
	 * @param pageSize
	 * @return
	 */
	RoleBatchResponse getRolesBatch(String roleCode, Integer currentPage, Integer pageSize);

	/**
	 * 获取角色Combo
	 * @return
	 */
	List<RoleComboResponse> getRoleCombo();

	/**
	 * 新增角色
	 * 
	 * @param role
	 */
	void addRolesBatch(RoleRequest role);

	/**
	 * 更新角色
	 * 
	 * @param role
	 */
	void updateRolesBatch(RoleRequest role);

	/**
	 * 删除角色
	 * 
	 * @param id
	 */
	void deleteRolesBatch(Integer id);
}
