package com.godman.anvil.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.godman.anvil.domain.AnvilRole;

@Mapper
public interface AnvilRoleDao {

	public Integer getSize();

	public List<AnvilRole> getCombo();

	public List<AnvilRole> findByPaging(@Param("roleCode") String roleCode, @Param("pageStart") Integer pageStart, @Param("pageSize") Integer pageSize);

	public void addRole(AnvilRole role);

	public void updateRole(AnvilRole role);

	public void deleteRole(@Param("roleId") Integer id);
}
