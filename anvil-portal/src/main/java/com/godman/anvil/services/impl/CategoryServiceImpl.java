package com.godman.anvil.services.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.godman.anvil.dao.AnvilCategoryDao;
import com.godman.anvil.domain.AnvilCategory;
import com.godman.anvil.domain.request.CategoryRequest;
import com.godman.anvil.domain.response.CategoryAssignResponse;
import com.godman.anvil.domain.response.CategoryBatchResponse;
import com.godman.anvil.enumtype.AssignConditionType;
import com.godman.anvil.services.CategoryService;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;

@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	private AnvilCategoryDao anvilCategoryDao;

	@Override
	public List<CategoryBatchResponse> getCategoryBatch() {
		List<AnvilCategory> anvilCategorys = anvilCategoryDao.findAll();

		List<CategoryBatchResponse> categoryParentList = Lists.newArrayList();
		Map<Long, List<CategoryBatchResponse>> categoryChildMap = Maps.newHashMap();
		for (AnvilCategory category : anvilCategorys) {
			CategoryBatchResponse categoryBatchResponse = new CategoryBatchResponse();
			BeanUtils.copyProperties(category, categoryBatchResponse);

			Long parentId = category.getParentId();
			if (category.getParentId() == null) {
				categoryParentList.add(categoryBatchResponse);
				continue;
			}
			if (categoryChildMap.get(parentId) == null) {
				List<CategoryBatchResponse> categoryList = Lists.newArrayList();
				categoryChildMap.put(parentId, categoryList);
			}
			categoryChildMap.get(parentId).add(categoryBatchResponse);
		}

		List<CategoryBatchResponse> responses = Lists.newArrayList();
		for (CategoryBatchResponse categoryParent : categoryParentList) {
			responses.add(categoryParent);
			for (CategoryBatchResponse categoryChild : categoryChildMap.get(categoryParent.getId())) {
				responses.add(categoryChild);
			}
		}
		return responses;
	}

	@Override
	public CategoryAssignResponse getCategoryAssign(Long roleId, Integer condition) {
		List<AnvilCategory> categoryList = Lists.newArrayList();
		if (condition == AssignConditionType.DEASSIGN.getValue()) {
			categoryList = getCategoryDeassign(roleId);
		} else if (condition == AssignConditionType.ASSIGN.getValue()) {
			categoryList = getCategoryAssign(roleId);
		}

		CategoryAssignResponse assign = convertCategorysTAssigns(categoryList);
		return assign;
	}

	/**
	 * 查询未分配的目录
	 * 
	 * @return
	 */
	private List<AnvilCategory> getCategoryDeassign(Long roleId) {
		return anvilCategoryDao.findCategoryDeassign(roleId);
	}

	/**
	 * 查询已分配目录
	 * 
	 * @return
	 */
	private List<AnvilCategory> getCategoryAssign(Long roleId) {
		return anvilCategoryDao.findCategoryAssign(roleId);
	}

	/**
	 * 目录信息转换为分配信息
	 * 
	 * @param categoryList
	 * @return
	 */
	private CategoryAssignResponse convertCategorysTAssigns(List<AnvilCategory> categoryList) {
		CategoryAssignResponse categoryAssignResponse = new CategoryAssignResponse();
		categoryAssignResponse.setTotal(categoryList.size());
		for (AnvilCategory category : categoryList) {
			Long categoryId = category.getId();
			String combinationName = category.getCombinationName();
			categoryAssignResponse.addCategories(categoryId, combinationName);
		}
		return categoryAssignResponse;
	}

	@Override
	public void addCategoryBatch(CategoryRequest categoryRequest) throws Exception {
		AnvilCategory category = new AnvilCategory();
		BeanUtils.copyProperties(categoryRequest, category);
		anvilCategoryDao.addCategory(category);
	}

	@Override
	public void updateCategoryBatch(CategoryRequest categoryRequest) {
		AnvilCategory category = new AnvilCategory();
		BeanUtils.copyProperties(categoryRequest, category);
		anvilCategoryDao.updateCategory(category);
	}

	@Override
	public void deleteCategoryBatch(Integer id) {
		anvilCategoryDao.deleteCategory(id);
	}

}
