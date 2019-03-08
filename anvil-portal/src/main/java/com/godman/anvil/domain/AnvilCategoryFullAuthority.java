package com.godman.anvil.domain;

public class AnvilCategoryFullAuthority {

	private Long parentId;

	private Integer counts;

	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

	public Integer getCounts() {
		return counts;
	}

	public void setCounts(Integer counts) {
		this.counts = counts;
	}

}
