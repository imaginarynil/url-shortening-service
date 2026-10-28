package com.imaginarynil.url_shortening_service.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class UrlIsNotValidException extends RuntimeException {
    public UrlIsNotValidException(String message) {
        super(message);
    }
}
