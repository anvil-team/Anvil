package com.godman.anvil.services.impl;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.godman.anvil.dao.AnvilRoleDao;
import com.godman.anvil.domain.AnvilRole;
import com.godman.anvil.domain.request.RoleRequest;
import com.godman.anvil.domain.response.RoleBatchResponse;
import com.godman.anvil.domain.response.RoleComboResponse;
import com.godman.anvil.domain.response.RoleDetailResponse;
import com.godman.anvil.services.RoleService;
import com.google.common.collect.Lists;

@Service
public class RoleServiceImpl implements RoleService {

	@Autowired
	private AnvilRoleDao anvilRoleDao;

	@Override
	public RoleBatchResponse getRolesBatch(String roleCode, Integer currentPage, Integer pageSize) {
		Integer total = anvilRoleDao.getSize();
		List<AnvilRole> roles = anvilRoleDao.findByPaging(roleCode, (currentPage - 1) * pageSize, pageSize);

		List<RoleDetailResponse> roleDetails = Lists.newArrayList();
		for (AnvilRole role : roles) {
			RoleDetailResponse roleDetailResponse = genRoleDetailResponse(role);
			roleDetails.add(roleDetailResponse);
		}
		RoleBatchResponse roleBatchResponse = new RoleBatchResponse();
		roleBatchResponse.setTotal(total);
		roleBatchResponse.setCurrentPage(currentPage);
		roleBatchResponse.setPageSize(pageSize);
		roleBatchResponse.setRoles(roleDetails);
		return roleBatchResponse;
	}

	@Override
	public List<RoleComboResponse> getRoleCombo() {
		List<AnvilRole> roles = anvilRoleDao.getCombo();
		List<RoleComboResponse> roleCombos = Lists.newArrayList();
		for (AnvilRole role : roles) {
			RoleComboResponse roleComboResponse = new RoleComboResponse();
			BeanUtils.copyProperties(role, roleComboResponse);
			roleCombos.add(roleComboResponse);
		}
		return roleCombos;
	}

	@Override
	public void addRolesBatch(RoleRequest roleRequest) {
		AnvilRole role = new AnvilRole();
		BeanUtils.copyProperties(roleRequest, role);
		anvilRoleDao.addRole(role);
	}

	@Override
	public void updateRolesBatch(RoleRequest roleRequest) {
		AnvilRole role = new AnvilRole();
		BeanUtils.copyProperties(roleRequest, role);
		anvilRoleDao.updateRole(role);
	}

	@Override
	public void deleteRolesBatch(Integer id) {
		anvilRoleDao.deleteRole(id);
	}

	private RoleDetailResponse genRoleDetailResponse(AnvilRole role) {
		RoleDetailResponse roleDetailResponse = new RoleDetailResponse();
		BeanUtils.copyProperties(role, roleDetailResponse);
		return roleDetailResponse;
	}

}
