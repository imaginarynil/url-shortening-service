package com.imaginarynil.url_shortening_service.handler;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@AllArgsConstructor
@Data
public class ApiError {
    private HttpStatus status;
    @JsonFormat(pattern = "dd-MM-yyyy hh:mm:ss")
    private LocalDateTime timestamp;
    private String message;
    private String debugMessage;

    public ApiError() {
        this.timestamp = LocalDateTime.now();
    }

    public ApiError(HttpStatus status) {
        this();
        this.status = status;
    }

    public ApiError(HttpStatus status, Throwable t) {
        this();
        this.status = status;
        this.message = "Unexpected error";
        this.debugMessage = t.getLocalizedMessage();
    }

    public ApiError(HttpStatus status, String message, Throwable t) {
        this();
        this.status = status;
        this.message = message;
        this.debugMessage = t.getLocalizedMessage();
    }
}
