package com.imaginarynil.url_shortening_service.exception;

import lombok.NoArgsConstructor;

public class UrlExistsException extends RuntimeException {
    public UrlExistsException(String message) {
        super(message);
    }

    public static String getMessageWithShortCode(String shortCode) {
        return "URL with short code \"" + shortCode + "\" exists";
    }
}
