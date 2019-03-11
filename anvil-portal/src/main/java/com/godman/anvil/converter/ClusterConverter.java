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

import com.godman.anvil.domain.request.ClusterRequest;
import com.godman.anvil.utils.JsonUnify;
import com.google.common.base.Strings;

/**
 * ClusterRequest自定义converter
 * 
 * @author chenzihao
 */
@Component(value = "clusterConverter")
@ConfigurationPropertiesBinding
public class ClusterConverter implements Converter<String, ClusterRequest> {

	private Logger logger = LoggerFactory.getLogger(getClass());

	@Autowired
	private Validator validator;

	@Override
	public ClusterRequest convert(String clusterJson) {
		ClusterRequest clusterObject = null;
		try {
			if (Strings.isNullOrEmpty(clusterJson)) {
				logger.error("ClusterRequest is empty");
				return null;
			}

			// ApplicationRequest json转化为对象
			clusterObject = generateClusterRequest(clusterJson);
			Set<ConstraintViolation<ClusterRequest>> violations = validator.validate(clusterObject);
			if (!violations.isEmpty()) {
				ConstraintViolationException ex = new ConstraintViolationException(violations);
				clusterObject.setConstraintViolationException(ex);
			}
		} catch (Exception e) {
			logger.error("converter ApplicationRequest error:" + clusterJson);
			return null;
		}
		return clusterObject;
	}

	/**
	 * 生成ClusterRequest对象
	 * 
	 * @param clusterJson
	 * @return
	 */
	public static ClusterRequest generateClusterRequest(String clusterJson) {
		// 生成CategoryRequest对象
		ClusterRequest clusterObject = JsonUnify.fromJson(clusterJson, ClusterRequest.class);
		return clusterObject;
	}

}
