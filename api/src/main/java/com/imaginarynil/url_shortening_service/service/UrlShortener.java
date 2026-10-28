package com.imaginarynil.url_shortening_service.service;

import org.springframework.stereotype.Service;

@Service
public class UrlShortener {
    private static final String CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static int SHORTCODE_LENGTH = 6;

    public String convertToBase62(Long id) {
        StringBuilder sb = new StringBuilder();
        Long n = id;
        while (n > 0) {
            int remainder = (int) (n % 62);
            sb.append(CHARS.charAt(remainder));
            n /= 62;
        }
        while(sb.length() < SHORTCODE_LENGTH) {
            sb.append(0);
        }
        return sb.reverse().toString();
    }
}
