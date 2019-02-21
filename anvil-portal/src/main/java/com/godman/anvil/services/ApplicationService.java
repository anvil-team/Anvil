package com.godman.anvil.services;

import com.godman.anvil.domain.request.ApplicationRequest;
import com.godman.anvil.domain.response.ApplicationBatchResponse;

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
	 * 删除项目
	 * 
	 * @param id
	 */
	void deleteApplicationsBatch(Integer id);
}
