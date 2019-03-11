package com.godman.anvil.services.impl;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.godman.anvil.dao.AnvilApplicationDao;
import com.godman.anvil.domain.AnvilApplication;
import com.godman.anvil.domain.AnvilApplicationAssign;
import com.godman.anvil.domain.request.ApplicationRequest;
import com.godman.anvil.domain.response.ApplicationAssignResponse;
import com.godman.anvil.domain.response.ApplicationBatchResponse;
import com.godman.anvil.domain.response.ApplicationDetailResponse;
import com.godman.anvil.enumtype.AssignConditionType;
import com.godman.anvil.services.ApplicationService;
import com.godman.anvil.utils.MechineIdentifiedUtil;
import com.google.common.base.Strings;
import com.google.common.collect.Lists;

@Service
public class ApplicationServiceImpl implements ApplicationService {

	@Autowired
	private AnvilApplicationDao anvilApplicationDao;

	@Override
	public ApplicationBatchResponse getApplicationsBatch(String applicationName, Integer currentPage,
			Integer pageSize) {
		Integer total = anvilApplicationDao.getSize();
		List<AnvilApplication> applications = anvilApplicationDao.findByPaging(applicationName,
				(currentPage - 1) * pageSize, pageSize);

		List<ApplicationDetailResponse> applicationDetails = Lists.newArrayList();
		for (AnvilApplication application : applications) {
			ApplicationDetailResponse applicationDetailResponse = genApplicationDetailResponse(application);
			applicationDetails.add(applicationDetailResponse);
		}
		ApplicationBatchResponse applicationBatchResponse = new ApplicationBatchResponse();
		applicationBatchResponse.setTotal(total);
		applicationBatchResponse.setCurrentPage(currentPage);
		applicationBatchResponse.setPageSize(pageSize);
		applicationBatchResponse.setApplications(applicationDetails);
		return applicationBatchResponse;
	}

	@Override
	public ApplicationAssignResponse getApplicationAssign(Long userId, Integer condition, String applicationName) {
		List<AnvilApplication> categoryList = Lists.newArrayList();
		if (condition == AssignConditionType.DEASSIGN.getValue()) {
			categoryList = anvilApplicationDao.findApplicationDeassign(userId, applicationName);
		} else if (condition == AssignConditionType.ASSIGN.getValue()) {
			categoryList = anvilApplicationDao.findApplicationAssign(userId, applicationName);
		}

		ApplicationAssignResponse assign = convertCategorysTAssigns(categoryList);
		return assign;
	}

	/**
	 * 项目信息转换为分配信息
	 * 
	 * @param applicationList
	 * @return
	 */
	private ApplicationAssignResponse convertCategorysTAssigns(List<AnvilApplication> applicationList) {
		ApplicationAssignResponse applicationAssignResponse = new ApplicationAssignResponse();
		applicationAssignResponse.setTotal(applicationList.size());
		for (AnvilApplication application : applicationList) {
			Long applicationId = application.getId();
			String applicationName = application.getApplicationName();
			applicationAssignResponse.addApplications(applicationId, applicationName);
		}
		return applicationAssignResponse;
	}

	@Override
	public void addApplicationsBatch(ApplicationRequest applicationRequest) {
		AnvilApplication application = new AnvilApplication();
		BeanUtils.copyProperties(applicationRequest, application);

		String applicationCode = "AP-" + MechineIdentifiedUtil.get();
		application.setApplicationCode(applicationCode);
		anvilApplicationDao.addApplication(application);
	}

	@Override
	public void updateApplicationsBatch(ApplicationRequest applicationRequest) {
		AnvilApplication application = new AnvilApplication();
		BeanUtils.copyProperties(applicationRequest, application);
		anvilApplicationDao.updateApplication(application);
	}

	@Override
	@Transactional
	public void updateApplicationAssign(Long userId, String applicationIdAssign, String applicationIdDeassign) {
		AnvilApplicationAssign assign = new AnvilApplicationAssign();
		if (!Strings.isNullOrEmpty(applicationIdAssign)) {
			for (String applicationId : applicationIdAssign.split(",")) {
				addApplicationAssign(assign, userId, Long.valueOf(applicationId));
			}
		}
		if (!Strings.isNullOrEmpty(applicationIdDeassign)) {
			for (String applicationId : applicationIdDeassign.split(",")) {
				deleteApplicationAssign(assign, userId, Long.valueOf(applicationId));
			}
		}
	}

	/**
	 * 分配操作
	 * 
	 * @param assign
	 * @param roleId
	 * @param categoryId
	 */
	private void addApplicationAssign(AnvilApplicationAssign assign, Long userId, Long applicationId) {
		assign.setUserId(userId);
		assign.setApplicationId(applicationId);
		anvilApplicationDao.addApplicationAssign(assign);
	}

	/**
	 * 取消分配操作
	 * 
	 * @param assign
	 * @param roleId
	 * @param categoryId
	 */
	private void deleteApplicationAssign(AnvilApplicationAssign assign, Long userId, Long applicationId) {
		assign.setUserId(userId);
		assign.setApplicationId(applicationId);
		anvilApplicationDao.deleteApplicationAssign(assign);
	}

	@Override
	public void deleteApplicationsBatch(Integer id) {
		anvilApplicationDao.deleteApplication(id);
	}

	private ApplicationDetailResponse genApplicationDetailResponse(AnvilApplication application) {
		ApplicationDetailResponse applicationDetailResponse = new ApplicationDetailResponse();
		BeanUtils.copyProperties(application, applicationDetailResponse);
		return applicationDetailResponse;
	}

}
