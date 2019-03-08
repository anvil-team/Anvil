package com.godman.anvil.services;

import java.util.List;

import com.godman.anvil.domain.request.CategoryRequest;
import com.godman.anvil.domain.response.CategoryAssignResponse;
import com.godman.anvil.domain.response.CategoryBatchResponse;

public interface CategoryService {

	/**
	 * 获取目录列表
	 * 
	 * @return
	 */
	List<CategoryBatchResponse> getCategoryBatch();

	/**
	 * 获取目录分配情况
	 * 
	 * @return
	 */
	CategoryAssignResponse getCategoryAssign(Long roleId, Integer condition);

	/**
	 * 新增目录
	 * 
	 * @param categoryRequest
	 * @throws Exception
	 */
	void addCategoryBatch(CategoryRequest categoryRequest) throws Exception;

	/**
	 * 修改目录
	 * 
	 * @param categoryRequest
	 */
	void updateCategoryBatch(CategoryRequest categoryRequest);

	/**
	 * 删除目录
	 * 
	 * @param id
	 */
	void deleteCategoryBatch(Integer id);
}
