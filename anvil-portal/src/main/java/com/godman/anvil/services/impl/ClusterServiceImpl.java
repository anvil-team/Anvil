package com.godman.anvil.services.impl;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.godman.anvil.dao.AnvilClusterDao;
import com.godman.anvil.domain.AnvilCluster;
import com.godman.anvil.domain.request.ClusterRequest;
import com.godman.anvil.domain.response.ClusterBatchResponse;
import com.godman.anvil.services.ClusterService;
import com.godman.anvil.utils.MechineIdentifiedUtil;
import com.google.common.collect.Collections2;

@Service
public class ClusterServiceImpl implements ClusterService {

	@Autowired
	private AnvilClusterDao anvilClusterDao;

	@Override
	public ClusterBatchResponse getClusterBatch(String clusterName, Integer currentPage, Integer pageSize) {
		
		Integer total = anvilClusterDao.getSize();
		List<AnvilCluster> clusters = anvilClusterDao.findByPaging(clusterName, (currentPage - 1) * pageSize, pageSize);
		Collection<ClusterBatchResponse.ClusterDetailResponse> clusterDetails = Collections2.transform(clusters, index->genClusterDetailResponse(index));
		
		ClusterBatchResponse clusterBatchResponse = new ClusterBatchResponse();
		clusterBatchResponse.setTotal(total);
		clusterBatchResponse.setCurrentPage(currentPage);
		clusterBatchResponse.setPageSize(pageSize);
		clusterBatchResponse.setClusters(clusterDetails);
		return clusterBatchResponse;
	}
	
	/**
	 * 生成集群详情信息
	 * 
	 * @param cluster
	 * @return
	 */
	private ClusterBatchResponse.ClusterDetailResponse genClusterDetailResponse(AnvilCluster cluster) {
		ClusterBatchResponse.ClusterDetailResponse clusterDetailResponse=new ClusterBatchResponse().new ClusterDetailResponse();
		BeanUtils.copyProperties(cluster, clusterDetailResponse);
		return clusterDetailResponse;
	}

	@Override
	public void addClusterBatch(ClusterRequest clusterRequest) {
		AnvilCluster cluster = new AnvilCluster();
		BeanUtils.copyProperties(clusterRequest, cluster);

		String clusterCode = "CL-" + MechineIdentifiedUtil.get();
		cluster.setClusterCode(clusterCode);
		anvilClusterDao.addCluster(cluster);
	}

	@Override
	public void updateClusterBatch(ClusterRequest clusterRequest) {
		AnvilCluster cluster = new AnvilCluster();
		BeanUtils.copyProperties(clusterRequest, cluster);
		anvilClusterDao.updateCluster(cluster);
	}

	@Override
	public void deleteClusterBatch(Integer id) {
		anvilClusterDao.deleteCluster(id);
	}

}
