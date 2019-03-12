package com.godman.anvil.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.godman.anvil.domain.AnvilApplication;
import com.godman.anvil.domain.AnvilApplicationAssign;

@Mapper
public interface AnvilApplicationDao {
	
	public Integer getSize();
	
	public List<AnvilApplication> findAll();

	public List<AnvilApplication> findByPaging(@Param("applicationName") String applicationName, @Param("pageStart") Integer pageStart, @Param("pageSize") Integer pageSize);

	public List<AnvilApplication> findApplicationDeassign(@Param("userId") Long userId,@Param("applicationName") String applicationName);
	
	public List<AnvilApplication> findApplicationAssign(@Param("userId") Long userId,@Param("applicationName") String applicationName);
	
	public void addApplication(AnvilApplication application);
	
	public void addApplicationAssign(AnvilApplicationAssign applicationAssign);

	public void updateApplication(AnvilApplication application);

	public void deleteApplication(@Param("applicationId") Integer id);
	
	public void deleteApplicationAssign(AnvilApplicationAssign applicationAssign);
}
