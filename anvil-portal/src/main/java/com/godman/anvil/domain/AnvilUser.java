package com.godman.anvil.domain;

public class AnvilUser {

	private Long id;

	private String username;

	private String password;

	private AnvilRole role;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public AnvilRole getRole() {
		return role;
	}

	public void setRole(AnvilRole role) {
		this.role = role;
	}

}
