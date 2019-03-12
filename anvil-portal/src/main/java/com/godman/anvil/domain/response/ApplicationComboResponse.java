package com.godman.anvil.domain.response;

public class ApplicationComboResponse {

	private Long id;

	private String applicationName;

	public ApplicationComboResponse() {
		
	}
	
	public ApplicationComboResponse(Long id, String applicationName) {
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
