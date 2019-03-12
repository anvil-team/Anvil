package com.godman.anvil.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.godman.anvil.domain.AnvilCluster;

@Mapper
public interface AnvilClusterDao {
	
	public Integer getSize();
	
	public List<AnvilCluster> findByPaging(@Param("clusterName") String clusterName, @Param("pageStart") Integer pageStart, @Param("pageSize") Integer pageSize);

	public void addCluster(AnvilCluster cluster);

	public void updateCluster(AnvilCluster cluster);

	public void deleteCluster(@Param("clusertId") Integer id);
	
}
