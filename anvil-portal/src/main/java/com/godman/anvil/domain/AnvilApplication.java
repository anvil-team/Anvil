package com.godman.anvil.domain;

public class AnvilApplication {

	private Long id;

	private String applicationCode;
	
	private String applicationName;
	
	private String description;
	
	private Long personInCharge;
	
	private Long chargePersonId;
	
	private String chargePersonName;
	
	private Integer shouldReviewed;
	
	private String createTime;
	
	private String updateTime;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getApplicationCode() {
		return applicationCode;
	}

	public void setApplicationCode(String applicationCode) {
		this.applicationCode = applicationCode;
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

	public Long getChargePersonId() {
		return chargePersonId;
	}

	public void setChargePersonId(Long chargePersonId) {
		this.chargePersonId = chargePersonId;
	}

	public String getChargePersonName() {
		return chargePersonName;
	}

	public void setChargePersonName(String chargePersonName) {
		this.chargePersonName = chargePersonName;
	}

	public Integer getShouldReviewed() {
		return shouldReviewed;
	}

	public void setShouldReviewed(Integer shouldReviewed) {
		this.shouldReviewed = shouldReviewed;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}

}
