package com.godman.anvil.enumtype;

public enum AuthTokenAccessbleType {
	ALLOW_ACCESS(1), NOTALLOW_ACCESS(2);

	private int value;

	private AuthTokenAccessbleType(int value) {
		this.value = value;
	}

	public int getValue() {
		return value;
	}
}
