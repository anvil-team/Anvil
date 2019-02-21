package com.godman.anvil.domain.response;

import java.util.List;

public class ApplicationBatchResponse {

	private Integer total;

	private Integer currentPage;

	private Integer pageSize;

	private List<ApplicationDetailResponse> applications;

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

	public List<ApplicationDetailResponse> getApplications() {
		return applications;
	}

	public void setApplications(List<ApplicationDetailResponse> applications) {
		this.applications = applications;
	}

}
