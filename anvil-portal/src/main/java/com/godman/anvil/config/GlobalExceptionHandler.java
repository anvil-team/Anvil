package com.godman.anvil.config;

import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.godman.anvil.domain.response.CommonResponse;
import com.godman.anvil.utils.JsonUnify;

/**
 * 全局异常处理
 */
@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

	private static Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

	private ResponseEntity<Object> handleBadRequest(String errorMsg, HttpHeaders headers, HttpStatus status) {
		CommonResponse<String> stateResponse = new CommonResponse<String>();
		stateResponse.setSuccess(CommonResponse.FAIL_STATE);
		stateResponse.setMessage(errorMsg);
		return new ResponseEntity<Object>(stateResponse, headers, status);
	}

	@Override
	protected ResponseEntity<Object> handleBindException(BindException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
		String errorMsg = ex.getBindingResult().getFieldError().getDefaultMessage();
		return handleBadRequest(errorMsg, headers, status);
	}

	@Override
	protected ResponseEntity<Object> handleServletRequestBindingException(ServletRequestBindingException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
		String errorMsg = ex.getMessage();
		return handleBadRequest(errorMsg, headers, status);
	}

	@Override
	protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(HttpRequestMethodNotSupportedException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
		String errorMsg = ex.getMessage();
		return handleBadRequest(errorMsg, headers, status);
	}

	@Override
	protected ResponseEntity<Object> handleMissingServletRequestParameter(MissingServletRequestParameterException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
		String errorMsg = ex.getMessage();
		return handleBadRequest(errorMsg, headers, status);
	}

	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
		String errorMsg = ex.getBindingResult().getFieldError().getDefaultMessage();
		return handleBadRequest(errorMsg, headers, status);
	}

	@ExceptionHandler(value = { ConstraintViolationException.class })
	public ResponseEntity<Object> handleConstraintViolationException(ConstraintViolationException e) {
		Set<ConstraintViolation<?>> violations = e.getConstraintViolations();
		StringBuilder strBuilder = new StringBuilder();
		for (ConstraintViolation<?> violation : violations) {
			strBuilder.append(violation.getMessage() + "\n");
		}
		return handleBadRequest(strBuilder.toString(), new HttpHeaders(), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler({ Error.class, Exception.class, Throwable.class })
	@ResponseBody
	public ResponseEntity<String> processException(Throwable ex) throws Exception {
		logger.error("Encounter exception while processing request", ex.getMessage(),ex);
		CommonResponse<String> stateResponse = new CommonResponse<String>();

		stateResponse.setSuccess(CommonResponse.FAIL_STATE);
		stateResponse.setMessage(ex.getMessage());
		String responseStr = JsonUnify.toJson(stateResponse);
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseStr);
	}
}
