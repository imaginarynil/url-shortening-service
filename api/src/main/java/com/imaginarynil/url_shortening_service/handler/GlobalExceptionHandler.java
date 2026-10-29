package com.imaginarynil.url_shortening_service.handler;

import com.imaginarynil.url_shortening_service.exception.UrlExistsException;
import com.imaginarynil.url_shortening_service.exception.UrlIsNotValidException;
import com.imaginarynil.url_shortening_service.exception.UrlNotFoundException;
import org.jspecify.annotations.Nullable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    private ResponseEntity<Object> buildResponseEntity(ApiError err) {
        return new ResponseEntity<>(err, err.getStatus());
    }

    @Override
    protected @Nullable ResponseEntity<Object> handleHttpMessageNotReadable(
            HttpMessageNotReadableException e, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        String error = "Malformed JSON request";
        return this.buildResponseEntity(new ApiError(HttpStatus.BAD_REQUEST, error, e));
    }

    @ExceptionHandler(UrlIsNotValidException.class)
    protected ResponseEntity<Object> handleUrlIsNotValid(UrlIsNotValidException e) {
        ApiError err = new ApiError(HttpStatus.BAD_REQUEST);
        err.setMessage("URL is not valid");
        return this.buildResponseEntity(err);
    }

    @ExceptionHandler(UrlNotFoundException.class)
    protected ResponseEntity<Object> handleUrlNotFound(UrlNotFoundException e) {
        ApiError err = new ApiError(HttpStatus.NOT_FOUND);
        err.setMessage(e.getMessage());
        return this.buildResponseEntity(err);
    }

    @ExceptionHandler(UrlExistsException.class)
    protected ResponseEntity<Object> handleUrlExists(UrlExistsException e) {
        ApiError err = new ApiError(HttpStatus.BAD_REQUEST);
        err.setMessage(e.getMessage());
        return this.buildResponseEntity(err);
    }
}
