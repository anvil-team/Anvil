package com.godman.anvil.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.godman.anvil.domain.request.ClusterRequest;
import com.godman.anvil.domain.response.ClusterBatchResponse;
import com.godman.anvil.domain.response.CommonResponse;
import com.godman.anvil.services.ClusterService;

@RestController
@RequestMapping("/api/v1/cluster")
public class ClusterController {

	@Autowired
	private ClusterService clusterService;

	/**
	 * 集群列表下发接口
	 * 
	 * @param clusterName
	 * @param currentPage
	 * @param pageSize
	 * @return
	 * @throws Exception
	 */
	@PreAuthorize("hasAuthority('SYSTEM_ADMIN') OR hasAuthority('NORMAL_ADMIN')")
	@RequestMapping(value = "/clusterBatch", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public CommonResponse<ClusterBatchResponse> getClusterList(String clusterName,
			@RequestParam("currentPage") Integer currentPage, @RequestParam("pageSize") Integer pageSize)
			throws Exception {

		ClusterBatchResponse clusterBatchResponse = clusterService.getClusterBatch(clusterName, currentPage, pageSize);

		CommonResponse<ClusterBatchResponse> response = new CommonResponse<ClusterBatchResponse>();
		response.setSuccess(CommonResponse.SUCCESS_STATE);
		response.setData(clusterBatchResponse);
		return response;
	}

	/**
	 * 集群列表新增/修改接口
	 * 
	 * @param cluster
	 * @return
	 * @throws Exception
	 */
	@PreAuthorize("hasAuthority('SYSTEM_ADMIN') OR hasAuthority('NORMAL_ADMIN')")
	@RequestMapping(value = "/clusterBatch", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public CommonResponse<Void> updateCluster(@RequestParam("cluster") ClusterRequest cluster) throws Exception {

		if (cluster == null) {
			throw new Exception("cluster is null or structure error");
		}

		if (cluster.getConstraintViolationException() != null) {
			throw cluster.getConstraintViolationException();
		}

		Long id = cluster.getId();
		if (id == null) {
			clusterService.addClusterBatch(cluster);
		} else {
			clusterService.updateClusterBatch(cluster);
		}
		CommonResponse<Void> response = new CommonResponse<Void>();
		response.setSuccess(CommonResponse.SUCCESS_STATE);
		return response;
	}

	/**
	 * 集群列表删除接口
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@PreAuthorize("hasAuthority('SYSTEM_ADMIN') OR hasAuthority('NORMAL_ADMIN')")
	@RequestMapping(value = "/clusterBatch", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public CommonResponse<Void> deleteCluster(@RequestParam("id") Integer id) throws Exception {

		clusterService.deleteClusterBatch(id);

		CommonResponse<Void> response = new CommonResponse<Void>();
		response.setSuccess(CommonResponse.SUCCESS_STATE);
		return response;
	}

}
