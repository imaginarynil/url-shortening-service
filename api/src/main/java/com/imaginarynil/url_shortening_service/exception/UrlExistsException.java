package com.imaginarynil.url_shortening_service.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class UrlExistsException extends RuntimeException {
    public UrlExistsException(String message) {
        super(message);
    }
}
