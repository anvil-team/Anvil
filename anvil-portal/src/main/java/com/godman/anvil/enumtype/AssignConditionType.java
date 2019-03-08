package com.godman.anvil.enumtype;

public enum AssignConditionType {
	DEASSIGN(0), ASSIGN(1);

	private int value;

	private AssignConditionType(int value) {
		this.value = value;
	}

	public int getValue() {
		return value;
	}
}
