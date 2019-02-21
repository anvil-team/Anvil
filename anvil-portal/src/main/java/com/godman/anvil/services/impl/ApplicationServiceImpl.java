package com.godman.anvil.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.godman.anvil.dao.AnvilApplicationDao;
import com.godman.anvil.domain.request.ApplicationRequest;
import com.godman.anvil.domain.response.ApplicationBatchResponse;
import com.godman.anvil.services.ApplicationService;

@Service
public class ApplicationServiceImpl implements ApplicationService {

	@Autowired
	private AnvilApplicationDao anvilApplicationDao;

	@Override
	public ApplicationBatchResponse getApplicationsBatch(String applicationName, Integer currentPage, Integer pageSize) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void addApplicationsBatch(ApplicationRequest application) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateApplicationsBatch(ApplicationRequest application) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteApplicationsBatch(Integer id) {
		// TODO Auto-generated method stub
		
	}

}
