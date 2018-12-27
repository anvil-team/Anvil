package com.godman.anvil.domain.response;

import java.util.List;

public class UserBatchResponse {

	private Integer total;

	private Integer currentPage;

	private Integer pageSize;

	private List<UserDetailResponse> userDetails;

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

	public List<UserDetailResponse> getUserDetails() {
		return userDetails;
	}

	public void setUserDetails(List<UserDetailResponse> userDetails) {
		this.userDetails = userDetails;
	}

}
