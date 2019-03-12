package com.godman.anvil.services;

import java.util.Collection;

import com.godman.anvil.domain.request.ApplicationRequest;
import com.godman.anvil.domain.response.ApplicationAssignResponse;
import com.godman.anvil.domain.response.ApplicationBatchResponse;
import com.godman.anvil.domain.response.ApplicationComboResponse;

public interface ApplicationService {

	/**
	 * 获取项目分页列表
	 * 
	 * @param applicationName
	 * @param currentPage
	 * @param pageSize
	 * @return
	 */
	ApplicationBatchResponse getApplicationsBatch(String applicationName, Integer currentPage, Integer pageSize);

	/**
	 * 项目列表combo
	 * 
	 * @return
	 */
	Collection<ApplicationComboResponse> getApplicationCombo();

	/**
	 * 获取项目分配情况
	 * 
	 * @param userId
	 * @param condition
	 * @param applicationName
	 * @return
	 */
	ApplicationAssignResponse getApplicationAssign(Long userId, Integer condition, String applicationName);

	/**
	 * 新增项目
	 * 
	 * @param application
	 */
	void addApplicationsBatch(ApplicationRequest application);

	/**
	 * 更新项目
	 * 
	 * @param application
	 */
	void updateApplicationsBatch(ApplicationRequest application);

	/**
	 * 项目列表分配
	 * 
	 * @param userId
	 * @param applicationIdAssign
	 * @param applicationIdDeassign
	 */
	void updateApplicationAssign(Long userId, String applicationIdAssign, String applicationIdDeassign);

	/**
	 * 删除项目
	 * 
	 * @param id
	 */
	void deleteApplicationsBatch(Integer id);
}
