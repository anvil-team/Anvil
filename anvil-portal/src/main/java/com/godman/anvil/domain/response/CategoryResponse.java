package com.godman.anvil.domain.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

public class CategoryResponse {

	private String parentName;

	@JsonInclude(Include.NON_NULL)
	private List<CategoryChildResponse> childCategory;

	public String getParentName() {
		return parentName;
	}

	public void setParentName(String parentName) {
		this.parentName = parentName;
	}

	public List<CategoryChildResponse> getChildCategory() {
		return childCategory;
	}

	public void setChildCategory(List<CategoryChildResponse> childCategory) {
		this.childCategory = childCategory;
	}

}
