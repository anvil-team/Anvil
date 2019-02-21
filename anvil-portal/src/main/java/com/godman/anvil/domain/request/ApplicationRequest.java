package com.godman.anvil.domain.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class ApplicationRequest  extends CommonRequest{

	private Long id;

	@NotBlank(message = "applicationName is blank")
	private String applicationName;

	@NotBlank(message = "description is blank")
	private String description;

	@NotNull(message = "personInCharge is null")
	private Long personInCharge;
	
	@NotNull(message = "shouldReviewed is null")
	private Integer shouldReviewed;

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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Long getPersonInCharge() {
		return personInCharge;
	}

	public void setPersonInCharge(Long personInCharge) {
		this.personInCharge = personInCharge;
	}

	public Integer getShouldReviewed() {
		return shouldReviewed;
	}

	public void setShouldReviewed(Integer shouldReviewed) {
		this.shouldReviewed = shouldReviewed;
	}

}
