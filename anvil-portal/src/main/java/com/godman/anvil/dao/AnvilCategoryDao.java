package com.godman.anvil.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.godman.anvil.domain.AnvilCategory;

@Mapper
public interface AnvilCategoryDao {

	public List<AnvilCategory> findAll();
	
	public List<AnvilCategory> findCategoryByRoleId(@Param("roleId") Long roleId);
	
	public List<AnvilCategory> findCategoryDeassign(@Param("roleId") Long roleId);
	
	public List<AnvilCategory> findCategoryAssign(@Param("roleId") Long roleId);

	public void addCategory(AnvilCategory category);

	public void updateCategory(AnvilCategory category);

	public void deleteCategory(@Param("categoryId") Integer id);

}
