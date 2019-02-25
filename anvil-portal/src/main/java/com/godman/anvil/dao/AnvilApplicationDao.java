package com.godman.anvil.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.godman.anvil.domain.AnvilApplication;

@Mapper
public interface AnvilApplicationDao {
	public Integer getSize();

	public List<AnvilApplication> findByPaging(@Param("applicationName") String applicationName, @Param("pageStart") Integer pageStart, @Param("pageSize") Integer pageSize);

	public void addApplication(AnvilApplication application);

	public void updateApplication(AnvilApplication application);

	public void deleteApplication(@Param("applicationId") Integer id);
}
