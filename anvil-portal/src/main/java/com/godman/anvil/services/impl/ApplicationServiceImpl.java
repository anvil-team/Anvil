package com.godman.anvil.services.impl;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.godman.anvil.dao.AnvilApplicationDao;
import com.godman.anvil.domain.AnvilApplication;
import com.godman.anvil.domain.request.ApplicationRequest;
import com.godman.anvil.domain.response.ApplicationAssignResponse;
import com.godman.anvil.domain.response.ApplicationBatchResponse;
import com.godman.anvil.domain.response.ApplicationDetailResponse;
import com.godman.anvil.services.ApplicationService;
import com.godman.anvil.utils.MechineIdentifiedUtil;
import com.google.common.collect.Lists;

@Service
public class ApplicationServiceImpl implements ApplicationService {

	@Autowired
	private AnvilApplicationDao anvilApplicationDao;

	@Override
	public ApplicationBatchResponse getApplicationsBatch(String applicationName, Integer currentPage, Integer pageSize) {
		Integer total = anvilApplicationDao.getSize();
		List<AnvilApplication> applications = anvilApplicationDao.findByPaging(applicationName, (currentPage - 1) * pageSize, pageSize);

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
	public void addApplicationsBatch(ApplicationRequest applicationRequest) {
		AnvilApplication application = new AnvilApplication();
		BeanUtils.copyProperties(applicationRequest, application);
		
		String applicationCode="AP-"+MechineIdentifiedUtil.get();
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
	public void deleteApplicationsBatch(Integer id) {
		anvilApplicationDao.deleteApplication(id);
	}
	
	private ApplicationDetailResponse genApplicationDetailResponse(AnvilApplication application) {
		ApplicationDetailResponse applicationDetailResponse = new ApplicationDetailResponse();
		BeanUtils.copyProperties(application, applicationDetailResponse);
		return applicationDetailResponse;
	}

	@Override
	public ApplicationAssignResponse getApplicationAssign(Long userId, Integer condition, String applicationName) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateApplicationAssign(Long userId, String applicationIdAssign, String applicationIdDeassign) {
		// TODO Auto-generated method stub
		
	}

}
