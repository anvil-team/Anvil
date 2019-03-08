package com.godman.anvil.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.godman.anvil.domain.request.CategoryRequest;
import com.godman.anvil.domain.response.CategoryAssignResponse;
import com.godman.anvil.domain.response.CategoryBatchResponse;
import com.godman.anvil.domain.response.CommonResponse;
import com.godman.anvil.services.CategoryService;

@RestController
@RequestMapping("/api/v1/category")
public class CategoryController {

	@Autowired
	private CategoryService categoryService;

	/**
	 * 目录列表下发接口
	 * 
	 * @return
	 * @throws Exception
	 */
	@PreAuthorize("hasAuthority('SYSTEM_ADMIN')")
	@RequestMapping(value = "/categoryBatch", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public CommonResponse<List<CategoryBatchResponse>> getCategoryList() throws Exception {
		
		List<CategoryBatchResponse> userBatchResponse = categoryService.getCategoryBatch();
		
		CommonResponse<List<CategoryBatchResponse>> response = new CommonResponse<List<CategoryBatchResponse>>();
		response.setSuccess(CommonResponse.SUCCESS_STATE);
		response.setData(userBatchResponse);
		return response;
	}

	/**
	 * 目录列表新增/修改接口
	 * 
	 * @param categoryRequest
	 * @return
	 * @throws Exception
	 */
	@PreAuthorize("hasAuthority('SYSTEM_ADMIN')")
	@RequestMapping(value = "/categoryBatch", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public CommonResponse<Void> updateCategoryList(@RequestParam("category") CategoryRequest categoryRequest) throws Exception {

		if (categoryRequest == null) {
			throw new Exception("categoryRequest is null or structure error");
		}

		if (categoryRequest.getConstraintViolationException() != null) {
			throw categoryRequest.getConstraintViolationException();
		}

		Long id = categoryRequest.getId();
		if (id == null) {
			categoryService.addCategoryBatch(categoryRequest);
		} else {
			categoryService.updateCategoryBatch(categoryRequest);
		}
		CommonResponse<Void> response = new CommonResponse<Void>();
		response.setSuccess(CommonResponse.SUCCESS_STATE);
		return response;
	}
	
	/**
	 * 目录列表删除接口
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@PreAuthorize("hasAuthority('SYSTEM_ADMIN')")
	@RequestMapping(value = "/categoryBatch", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public CommonResponse<Void> deleteCategoryList(@RequestParam("id") Integer id) throws Exception {
		
		categoryService.deleteCategoryBatch(id);
		
		CommonResponse<Void> response = new CommonResponse<Void>();
		response.setSuccess(CommonResponse.SUCCESS_STATE);
		return response;
	}
	
	/**
	 * 目录列表分配情况接口
	 * 
	 * @return
	 * @throws Exception
	 */
	@PreAuthorize("hasAuthority('SYSTEM_ADMIN')")
	@RequestMapping(value = "/categoryAssign", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public CommonResponse<CategoryAssignResponse> getCategoryAssign(@RequestParam("roleId")Long roleId,@RequestParam("condition")Integer condition) throws Exception {
		
		CategoryAssignResponse categoryAssignResponse = categoryService.getCategoryAssign(roleId,condition);

		CommonResponse<CategoryAssignResponse> response = new CommonResponse<>();
		response.setSuccess(CommonResponse.SUCCESS_STATE);
		response.setData(categoryAssignResponse);
		return response;
	}
	
	/**
	 * 目录列表分配接口
	 * 
	 * @param roleId
	 * @param categoryIdAssign
	 * @param categoryIdDeassign
	 * @return
	 * @throws Exception
	 */
	@PreAuthorize("hasAuthority('SYSTEM_ADMIN')")
	@RequestMapping(value = "/categoryAssign", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public CommonResponse<Void> updateCategoryAssign(@RequestParam("roleId")Long roleId,@RequestParam("categoryIdAssign")String categoryIdAssign,@RequestParam("categoryIdDeassign")String categoryIdDeassign) throws Exception {

		categoryService.updateCategoryAssign(roleId, categoryIdAssign, categoryIdDeassign);
		
		CommonResponse<Void> response = new CommonResponse<Void>();
		response.setSuccess(CommonResponse.SUCCESS_STATE);
		return response;
	}
	
}
