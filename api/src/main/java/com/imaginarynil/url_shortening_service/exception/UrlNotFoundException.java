package com.imaginarynil.url_shortening_service.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class UrlNotFoundException extends RuntimeException {
    public UrlNotFoundException(String message) {
        super(message);
    }

    public static String getMessageWithShortCode(String shortCode) {
        return "URL with short code \"" + shortCode + "\" does not exist";
    }
}
