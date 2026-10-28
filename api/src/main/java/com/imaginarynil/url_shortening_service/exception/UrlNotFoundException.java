package com.imaginarynil.url_shortening_service.exception;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class UrlNotFoundException extends RuntimeException {
    public UrlNotFoundException(String message) {
        super(message);
    }
}
