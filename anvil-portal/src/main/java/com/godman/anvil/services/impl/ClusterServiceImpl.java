package com.godman.anvil.services.impl;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.godman.anvil.dao.AnvilApplicationDao;
import com.godman.anvil.domain.AnvilApplication;
import com.godman.anvil.domain.AnvilApplicationAssign;
import com.godman.anvil.domain.request.ApplicationRequest;
import com.godman.anvil.domain.request.ClusterRequest;
import com.godman.anvil.domain.response.ApplicationAssignResponse;
import com.godman.anvil.domain.response.ApplicationBatchResponse;
import com.godman.anvil.domain.response.ApplicationComboResponse;
import com.godman.anvil.domain.response.ApplicationDetailResponse;
import com.godman.anvil.domain.response.ClusterBatchResponse;
import com.godman.anvil.enumtype.AssignConditionType;
import com.godman.anvil.services.ApplicationService;
import com.godman.anvil.services.ClusterService;
import com.godman.anvil.utils.MechineIdentifiedUtil;
import com.google.common.base.Strings;
import com.google.common.collect.Collections2;
import com.google.common.collect.Lists;

@Service
public class ClusterServiceImpl implements ClusterService {

	@Override
	public ClusterBatchResponse getClusterBatch(String clusterName, Integer currentPage, Integer pageSize) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void addClusterBatch(ClusterRequest cluster) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateClusterBatch(ClusterRequest cluster) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteClusterBatch(Integer id) {
		// TODO Auto-generated method stub
		
	}

}
