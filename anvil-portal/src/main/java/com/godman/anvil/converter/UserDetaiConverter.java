package com.godman.anvil.converter;

import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Validator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;

import com.godman.anvil.domain.request.UserDetaiRequest;
import com.godman.anvil.utils.JsonUnify;
import com.google.common.base.Strings;

/**
 * userDetailRequest自定义converter
 * @author chenzihao
 */
public class UserDetaiConverter implements Converter<String, UserDetaiRequest> {
	
	private Logger logger = LoggerFactory.getLogger(getClass());

	@Autowired
    private Validator validator;
	
	@Override
	public UserDetaiRequest convert(String userDetailJson) {
		UserDetaiRequest userDetailObj = null;
		try {
			if (Strings.isNullOrEmpty(userDetailJson)) {
				logger.error("UserDetaiRequest is empty");
				return null;
			}

			// UserDetaiRequest json转化为对象
			userDetailObj = generatePhead(userDetailJson);
			Set<ConstraintViolation<UserDetaiRequest>> violations = validator.validate(userDetailObj);
            if (!violations.isEmpty()) {
                ConstraintViolationException ex = new ConstraintViolationException(violations);
                throw ex;
            }
		} catch (Exception e) {
			logger.error("converter UserDetaiRequest error:" + userDetailJson, e);
			return null;
		}
		return userDetailObj;
	}

	/**
	 * 生成UserDetaiRequest对象
	 * @param phead
	 * @return
	 */
	public static UserDetaiRequest generatePhead(String phead) {
		// 生成UserDetaiRequest对象
		UserDetaiRequest userDetailObj = JsonUnify.fromJson(phead, UserDetaiRequest.class);
		return userDetailObj;
	}

}
