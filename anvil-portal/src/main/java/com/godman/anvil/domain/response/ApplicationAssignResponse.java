package com.godman.anvil.domain.response;

import java.util.List;

import com.google.common.collect.Lists;

public class ApplicationAssignResponse {

	private Integer total;

	private List<AssignInfo> applications;

	public ApplicationAssignResponse() {
		this.applications = Lists.newArrayList();
	}

	class AssignInfo {

		private Long id;

		private String applicationName;

		public AssignInfo(Long id, String applicationName) {
			this.id = id;
			this.applicationName = applicationName;
		}

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getApplicationName() {
			return applicationName;
		}

		public void setApplicationName(String applicationName) {
			this.applicationName = applicationName;
		}

	}

	public Integer getTotal() {
		return total;
	}

	public void setTotal(Integer total) {
		this.total = total;
	}

	public List<AssignInfo> getApplications() {
		return applications;
	}

	public void setApplications(List<AssignInfo> applications) {
		this.applications = applications;
	}

	public void addApplications(Long id, String applicationName) {
		if (this.applications == null) {
			this.applications = Lists.newArrayList();
		}

		AssignInfo assignInfo = new AssignInfo(id, applicationName);
		this.applications.add(assignInfo);
	}

}
