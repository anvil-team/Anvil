package com.godman.anvil.domain;

public class AnvilUser {

	private Long id;
	
	private String realName;

	private String username;

	private String password;
	
	private String department;

	private AnvilRole role;

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

	public AnvilRole getRole() {
		return role;
	}

	public void setRole(AnvilRole role) {
		this.role = role;
	}

}
