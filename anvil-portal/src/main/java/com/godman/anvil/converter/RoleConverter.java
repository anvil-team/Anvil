package com.godman.anvil.converter;

import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Validator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import com.godman.anvil.domain.request.RoleRequest;
import com.godman.anvil.utils.JsonUnify;
import com.google.common.base.Strings;

/**
 * RoleRequest自定义converter
 * 
 * @author chenzihao
 */
@Component(value = "roleConverter")
public class RoleConverter implements Converter<String, RoleRequest> {

	private Logger logger = LoggerFactory.getLogger(getClass());

	@Autowired
	private Validator validator;

	@Override
	public RoleRequest convert(String roleJson) {
		RoleRequest roleObject = null;
		try {
			if (Strings.isNullOrEmpty(roleJson)) {
				logger.error("RoleRequest is empty");
				return null;
			}

			// RoleRequest json转化为对象
			roleObject = generateRoleRequest(roleJson);
			Set<ConstraintViolation<RoleRequest>> violations = validator.validate(roleObject);
			if (!violations.isEmpty()) {
				ConstraintViolationException ex = new ConstraintViolationException(violations);
				roleObject.setConstraintViolationException(ex);
			}
		} catch (Exception e) {
			logger.error("converter RoleRequest error:" + roleJson);
			return null;
		}
		return roleObject;
	}

	/**
	 * 生成RoleRequest对象
	 * 
	 * @param roleJson
	 * @return
	 */
	public static RoleRequest generateRoleRequest(String roleJson) {
		// 生成RoleRequest对象
		RoleRequest roleObject = JsonUnify.fromJson(roleJson, RoleRequest.class);
		return roleObject;
	}

}
