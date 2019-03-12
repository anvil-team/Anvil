package com.godman.anvil.services.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.godman.anvil.dao.AnvilCategoryDao;
import com.godman.anvil.domain.AnvilCategory;
import com.godman.anvil.domain.AnvilCategoryAssign;
import com.godman.anvil.domain.AnvilCategoryFullAuthority;
import com.godman.anvil.domain.request.CategoryRequest;
import com.godman.anvil.domain.response.CategoryAssignResponse;
import com.godman.anvil.domain.response.CategoryBatchResponse;
import com.godman.anvil.enumtype.AssignConditionType;
import com.godman.anvil.services.CategoryService;
import com.google.common.base.Strings;
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
			categoryList = anvilCategoryDao.findCategoryDeassign(roleId);
		} else if (condition == AssignConditionType.ASSIGN.getValue()) {
			categoryList = anvilCategoryDao.findCategoryAssign(roleId);
		}

		CategoryAssignResponse assign = convertCategorysTAssigns(categoryList);
		return assign;
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
	@Transactional
	public void updateCategoryAssign(Long roleId, String categoryIdAssign, String categoryIdDeassign) {
		AnvilCategoryAssign assign = new AnvilCategoryAssign();
		if (!Strings.isNullOrEmpty(categoryIdAssign)) {
			for (String categoryId : categoryIdAssign.split(",")) {
				addCategoryAssign(assign, roleId, Long.valueOf(categoryId));
			}
		}
		if (!Strings.isNullOrEmpty(categoryIdDeassign)) {
			for (String categoryId : categoryIdDeassign.split(",")) {
				deleteCategoryAssign(assign, roleId, Long.valueOf(categoryId));
			}
		}
		List<AnvilCategoryFullAuthority> fullAuthCategories = anvilCategoryDao.findCategoryFullAuthority(roleId);
		for (AnvilCategoryFullAuthority fullAuthCategory : fullAuthCategories) {
			Long parentId = fullAuthCategory.getParentId();
			if (fullAuthCategory.getCounts() > 0) {
				addCategoryAssign(assign, roleId, Long.valueOf(parentId));
			} else {
				deleteCategoryAssign(assign, roleId, Long.valueOf(parentId));
			}
		}
	}

	/**
	 * 分配操作
	 * 
	 * @param assign
	 * @param roleId
	 * @param categoryId
	 */
	private void addCategoryAssign(AnvilCategoryAssign assign, Long roleId, Long categoryId) {
		assign.setRoleId(roleId);
		assign.setCategoryId(categoryId);
		anvilCategoryDao.addCategoryAssign(assign);
	}

	/**
	 * 取消分配操作
	 * 
	 * @param assign
	 * @param roleId
	 * @param categoryId
	 */
	private void deleteCategoryAssign(AnvilCategoryAssign assign, Long roleId, Long categoryId) {
		assign.setRoleId(roleId);
		assign.setCategoryId(categoryId);
		anvilCategoryDao.deleteCategoryAssign(assign);
	}

	@Override
	public void deleteCategoryBatch(Integer id) {
		anvilCategoryDao.deleteCategory(id);
	}

}
