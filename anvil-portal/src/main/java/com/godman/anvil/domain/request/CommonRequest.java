package com.godman.anvil.domain.request;

import javax.validation.ConstraintViolationException;

public class CommonRequest {
	
	private ConstraintViolationException constraintViolationException;

	public ConstraintViolationException getConstraintViolationException() {
		return constraintViolationException;
	}

	public void setConstraintViolationException(ConstraintViolationException constraintViolationException) {
		this.constraintViolationException = constraintViolationException;
	}

}
