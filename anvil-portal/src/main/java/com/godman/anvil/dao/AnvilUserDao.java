package com.godman.anvil.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.godman.anvil.domain.AnvilUser;

@Mapper
public interface AnvilUserDao {

	public AnvilUser findByUsername(@Param("username") String userName);

}
