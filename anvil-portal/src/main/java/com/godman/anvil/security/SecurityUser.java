package com.godman.anvil.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.godman.anvil.domain.AnvilRole;

public class SecurityUser implements UserDetails {

	private static final long serialVersionUID = 1L;

	private Long id;

	private String username;

	private String password;

	private AnvilRole roleObject;

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

	public AnvilRole getRoleObject() {
		return roleObject;
	}

	public void setRoleObject(AnvilRole roleObject) {
		this.roleObject = roleObject;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<GrantedAuthority> auths = new ArrayList<>();
		AnvilRole role = this.getRoleObject();
		auths.add(new SimpleGrantedAuthority(role.getRoleCode()));
		return auths;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
