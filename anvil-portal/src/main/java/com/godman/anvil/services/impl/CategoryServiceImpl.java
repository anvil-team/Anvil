package com.godman.anvil.services.impl;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.godman.anvil.dao.AnvilCategoryDao;
import com.godman.anvil.domain.AnvilCategory;
import com.godman.anvil.domain.request.CategoryRequest;
import com.godman.anvil.domain.response.CategoryBatchResponse;
import com.godman.anvil.services.CategoryService;
import com.google.common.collect.Lists;

@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	private AnvilCategoryDao anvilCategoryDao;

	@Override
	public List<CategoryBatchResponse> getCategoryBatch() {
		List<AnvilCategory> anvilCategorys=anvilCategoryDao.findAll();
		List<CategoryBatchResponse> responses=Lists.newArrayList();
		for(AnvilCategory anvilCategory:anvilCategorys){
			CategoryBatchResponse categoryBatchResponse=new CategoryBatchResponse();
			BeanUtils.copyProperties(anvilCategory, categoryBatchResponse);
			responses.add(categoryBatchResponse);
		}
		return responses;
	}

	@Override
	public void addCategoryBatch(CategoryRequest categoryRequest) throws Exception {

	}

	@Override
	public void updateCategoryBatch(CategoryRequest categoryRequest) {

	}

	@Override
	public void deleteCategoryBatch(Integer id) {

	}

}
