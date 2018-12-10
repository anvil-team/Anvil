package com.godman.anvil.domain.response;

public class CategoryResponse {

	private String parentName;

	private CategoryChildResponse childCategory;

	public String getParentName() {
		return parentName;
	}

	public void setParentName(String parentName) {
		this.parentName = parentName;
	}

	public CategoryChildResponse getChildCategory() {
		return childCategory;
	}

	public void setChildCategory(CategoryChildResponse childCategory) {
		this.childCategory = childCategory;
	}

}
