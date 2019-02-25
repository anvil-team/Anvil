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

import com.godman.anvil.domain.request.ApplicationRequest;
import com.godman.anvil.utils.JsonUnify;
import com.google.common.base.Strings;

/**
 * ApplicationRequest自定义converter
 * 
 * @author chenzihao
 */
@Component(value = "applicationConverter")
@ConfigurationPropertiesBinding
public class ApplicationConverter implements Converter<String, ApplicationRequest> {

	private Logger logger = LoggerFactory.getLogger(getClass());

	@Autowired
	private Validator validator;

	@Override
	public ApplicationRequest convert(String applicationJson) {
		ApplicationRequest applicationObject = null;
		try {
			if (Strings.isNullOrEmpty(applicationJson)) {
				logger.error("ApplicationRequest is empty");
				return null;
			}

			// ApplicationRequest json转化为对象
			applicationObject = generateApplicationRequest(applicationJson);
			Set<ConstraintViolation<ApplicationRequest>> violations = validator.validate(applicationObject);
			if (!violations.isEmpty()) {
				ConstraintViolationException ex = new ConstraintViolationException(violations);
				applicationObject.setConstraintViolationException(ex);
			}
		} catch (Exception e) {
			logger.error("converter ApplicationRequest error:" + applicationJson);
			return null;
		}
		return applicationObject;
	}

	/**
	 * 生成ApplicationRequest对象
	 * 
	 * @param applicationJson
	 * @return
	 */
	public static ApplicationRequest generateApplicationRequest(String applicationJson) {
		// 生成CategoryRequest对象
		ApplicationRequest applicationObject = JsonUnify.fromJson(applicationJson, ApplicationRequest.class);
		return applicationObject;
	}

}
