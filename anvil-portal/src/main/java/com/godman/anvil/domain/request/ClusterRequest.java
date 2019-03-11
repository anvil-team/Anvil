package com.godman.anvil.domain.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class ClusterRequest  extends CommonRequest{

	private Long id;

	@NotNull(message = "applicationId is null")
	private Long applicationId;
	
	@NotBlank(message = "clusterName is blank")
	private String clusterName;

	
	@NotBlank(message = "description is blank")
	private String description;


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

}
