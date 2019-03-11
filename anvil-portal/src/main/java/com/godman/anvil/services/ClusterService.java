package com.godman.anvil.services;

import com.godman.anvil.domain.request.ClusterRequest;
import com.godman.anvil.domain.response.ClusterBatchResponse;

public interface ClusterService {

	/**
	 * 获取集群分页列表
	 * 
	 * @param clusterName
	 * @param currentPage
	 * @param pageSize
	 * @return
	 */
	ClusterBatchResponse getClusterBatch(String clusterName, Integer currentPage, Integer pageSize);

	/**
	 * 新增集群
	 * 
	 * @param cluster
	 */
	void addClusterBatch(ClusterRequest cluster);

	/**
	 * 更新集群
	 * 
	 * @param cluster
	 */
	void updateClusterBatch(ClusterRequest cluster);

	/**
	 * 删除集群
	 * 
	 * @param id
	 */
	void deleteClusterBatch(Integer id);
}
