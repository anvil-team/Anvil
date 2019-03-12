package com.godman.anvil.domain.response;

import java.util.Collection;

public class ClusterBatchResponse {

	private Integer total;

	private Integer currentPage;

	private Integer pageSize;

	private Collection<ClusterDetailResponse> clusters;

	public class ClusterDetailResponse {

		private Long id;

		private Long applicationId;

		private String clusterCode;

		private String clusterName;

		private String description;

		private String createTime;

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public Long getApplicationId() {
			return applicationId;
		}

		public void setApplicationId(Long applicationId) {
			this.applicationId = applicationId;
		}

		public String getClusterCode() {
			return clusterCode;
		}

		public void setClusterCode(String clusterCode) {
			this.clusterCode = clusterCode;
		}

		public String getClusterName() {
			return clusterName;
		}

		public void setClusterName(String clusterName) {
			this.clusterName = clusterName;
		}

		public String getDescription() {
			return description;
		}

		public void setDescription(String description) {
			this.description = description;
		}

		public String getCreateTime() {
			return createTime;
		}

		public void setCreateTime(String createTime) {
			this.createTime = createTime;
		}

	}

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

	public Collection<ClusterDetailResponse> getClusters() {
		return clusters;
	}

	public void setClusters(Collection<ClusterDetailResponse> clusters) {
		this.clusters = clusters;
	}
}
