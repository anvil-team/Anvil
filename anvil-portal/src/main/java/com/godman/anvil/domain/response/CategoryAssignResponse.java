package com.godman.anvil.domain.response;

import java.util.List;

import com.google.common.collect.Lists;

public class CategoryAssignResponse {

	private Integer total;

	private List<AssignInfo> categories;

	public CategoryAssignResponse() {
		this.categories = Lists.newArrayList();
	}

	class AssignInfo {

		private Long id;

		private String combinationName;

		public AssignInfo(Long id, String combinationName) {
			this.id = id;
			this.combinationName = combinationName;
		}

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getCombinationName() {
			return combinationName;
		}

		public void setCombinationName(String combinationName) {
			this.combinationName = combinationName;
		}

	}

	public Integer getTotal() {
		return total;
	}

	public void setTotal(Integer total) {
		this.total = total;
	}

	public List<AssignInfo> getCategories() {
		return categories;
	}

	public void setCategories(List<AssignInfo> categories) {
		this.categories = categories;
	}

	public void addCategories(Long id, String combinationName) {
		if (this.categories == null) {
			this.categories = Lists.newArrayList();
		}

		AssignInfo assignInfo = new AssignInfo(id, combinationName);
		this.categories.add(assignInfo);
	}

}
