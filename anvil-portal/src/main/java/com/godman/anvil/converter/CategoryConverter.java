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

import com.godman.anvil.domain.request.CategoryRequest;
import com.godman.anvil.utils.JsonUnify;
import com.google.common.base.Strings;

/**
 * CategoryRequest自定义converter
 * 
 * @author chenzihao
 */
@Component(value = "categoryConverter")
public class CategoryConverter implements Converter<String, CategoryRequest> {

	private Logger logger = LoggerFactory.getLogger(getClass());

	@Autowired
	private Validator validator;

	@Override
	public CategoryRequest convert(String categoryJson) {
		CategoryRequest categoryObject = null;
		try {
			if (Strings.isNullOrEmpty(categoryJson)) {
				logger.error("CategoryRequest is empty");
				return null;
			}

			// CategoryRequest json转化为对象
			categoryObject = generateCategoryRequest(categoryJson);
			Set<ConstraintViolation<CategoryRequest>> violations = validator.validate(categoryObject);
			if (!violations.isEmpty()) {
				ConstraintViolationException ex = new ConstraintViolationException(violations);
				categoryObject.setConstraintViolationException(ex);
			}
		} catch (Exception e) {
			logger.error("converter CategoryRequest error:" + categoryJson);
			return null;
		}
		return categoryObject;
	}

	/**
	 * 生成CategoryRequest对象
	 * 
	 * @param categoryJson
	 * @return
	 */
	public static CategoryRequest generateCategoryRequest(String categoryJson) {
		// 生成CategoryRequest对象
		CategoryRequest categoryObject = JsonUnify.fromJson(categoryJson, CategoryRequest.class);
		return categoryObject;
	}

}
