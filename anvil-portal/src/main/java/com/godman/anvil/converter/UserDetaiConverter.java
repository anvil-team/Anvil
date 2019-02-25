package com.godman.anvil.converter;

import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Validator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationPropertiesBinding;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import com.godman.anvil.domain.request.UserDetailRequest;
import com.godman.anvil.utils.JsonUnify;
import com.google.common.base.Strings;

/**
 * userDetailRequest自定义converter
 * @author chenzihao
 */
@Component(value = "userDetaiConverter")
@ConfigurationPropertiesBinding
public class UserDetaiConverter implements Converter<String, UserDetailRequest> {
	
	private Logger logger = LoggerFactory.getLogger(getClass());

	@Autowired
    private Validator validator;
	
	@Override
	public UserDetailRequest convert(String userDetailJson) {
		UserDetailRequest userDetailObj = null;
		try {
			if (Strings.isNullOrEmpty(userDetailJson)) {
				logger.error("UserDetaiRequest is empty");
				return null;
			}

			// UserDetaiRequest json转化为对象
			userDetailObj = generateUserDetailRequest(userDetailJson);
			Set<ConstraintViolation<UserDetailRequest>> violations = validator.validate(userDetailObj);
            if (!violations.isEmpty()) {
                ConstraintViolationException ex = new ConstraintViolationException(violations);
                userDetailObj.setConstraintViolationException(ex);
            }
		} catch (Exception e) {
			logger.error("converter UserDetaiRequest error:" + userDetailJson);
			return null;
		}
		return userDetailObj;
	}

	/**
	 * 生成UserDetaiRequest对象
	 * @param userDetailJson
	 * @return
	 */
	public static UserDetailRequest generateUserDetailRequest(String userDetailJson) {
		// 生成UserDetaiRequest对象
		UserDetailRequest userDetailObj = JsonUnify.fromJson(userDetailJson, UserDetailRequest.class);
		return userDetailObj;
	}

}
