package com.godman.anvil.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.godman.anvil.domain.AnvilUser;

@Mapper
public interface AnvilUserDao {

	public Integer getSize();

	public AnvilUser findByUsername(@Param("username") String userName);

	public List<AnvilUser> findByPaging(@Param("username") String userName, @Param("pageStart") Integer pageStart, @Param("pageSize") Integer pageSize);

	public void addUser(AnvilUser user);

	public void updateUser(AnvilUser user);

	public void deleteUser(@Param("userId") Integer id);

}
