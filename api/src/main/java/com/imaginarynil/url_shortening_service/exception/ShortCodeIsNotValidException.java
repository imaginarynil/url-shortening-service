package com.imaginarynil.url_shortening_service.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class ShortCodeIsNotValidException extends RuntimeException {
    public ShortCodeIsNotValidException(String message) {
        super(message);
    }
}
