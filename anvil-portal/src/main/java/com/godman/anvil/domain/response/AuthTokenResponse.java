package com.godman.anvil.domain.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.godman.anvil.enumtype.AuthTokenAccessbleType;

public class AuthTokenResponse {

	@JsonInclude(JsonInclude.Include.NON_EMPTY)
	private String token;

	private AuthTokenAccessbleType isAccessible;

	public AuthTokenResponse() {
	}

	public AuthTokenResponse(AuthTokenAccessbleType isAccessible) {
		this.isAccessible = isAccessible;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public AuthTokenAccessbleType getIsAccessible() {
		return isAccessible;
	}

	public void setIsAccessible(AuthTokenAccessbleType isAccessible) {
		this.isAccessible = isAccessible;
	}

}
