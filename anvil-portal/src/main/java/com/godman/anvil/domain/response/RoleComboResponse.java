package com.godman.anvil.domain.response;

public class RoleComboResponse {

	private Long id;

	private String roleCode;

	private String roleName;

	public RoleComboResponse() {

	}

	public RoleComboResponse(Long id, String roleCode, String roleName) {
		super();
		this.id = id;
		this.roleCode = roleCode;
		this.roleName = roleName;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getRoleCode() {
		return roleCode;
	}

	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

}
