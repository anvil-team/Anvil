package com.godman.anvil.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.godman.anvil.domain.AnvilUser;

@Mapper
public interface AnvilUserDao {

	public AnvilUser findByUsername(@Param("username") String userName);

	public List<AnvilUser> findByPaging(@Param("pageStart") Integer pageStart, @Param("pageSize") Integer pageSize);

	public Integer getSize();

}
