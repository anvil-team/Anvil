package com.godman.anvil.domain.request;

import javax.validation.constraints.NotBlank;

public class RoleRequest  extends CommonRequest{

	private Long id;

	@NotBlank(message = "realCode is blank")
	private String realCode;

	@NotBlank(message = "roleName is blank")
	private String roleName;

	@NotBlank(message = "roleDesc is blank")
	private String roleDesc;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getRealCode() {
		return realCode;
	}

	public void setRealCode(String realCode) {
		this.realCode = realCode;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public String getRoleDesc() {
		return roleDesc;
	}

	public void setRoleDesc(String roleDesc) {
		this.roleDesc = roleDesc;
	}

}
