package com.godman.anvil.domain.request;

import org.hibernate.validator.constraints.NotBlank;

public class RoleRequest {

	private Long id;

	@NotBlank(message = "realName is blank")
	private String realName;

	@NotBlank(message = "username is blank")
	private String username;

	private String password;

	@NotBlank(message = "department is blank")
	private String department;

	@NotBlank(message = "position is blank")
	private String position;

	@NotBlank(message = "roleCode is blank")
	private String roleCode;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getRealName() {
		return realName;
	}

	public void setRealName(String realName) {
		this.realName = realName;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public String getRoleCode() {
		return roleCode;
	}

	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}

}
