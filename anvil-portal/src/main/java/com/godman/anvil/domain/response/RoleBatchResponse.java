package com.godman.anvil.domain.response;

import java.util.List;

public class RoleBatchResponse {

	private Integer total;

	private Integer currentPage;

	private Integer pageSize;

	private List<RoleDetailResponse> roles;

	public Integer getTotal() {
		return total;
	}

	public void setTotal(Integer total) {
		this.total = total;
	}

	public Integer getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(Integer currentPage) {
		this.currentPage = currentPage;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public List<RoleDetailResponse> getRoles() {
		return roles;
	}

	public void setRoles(List<RoleDetailResponse> roles) {
		this.roles = roles;
	}

}
