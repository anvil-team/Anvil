package com.godman.anvil.services;

import com.godman.anvil.domain.request.RoleRequest;
import com.godman.anvil.domain.response.RoleBatchResponse;

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
