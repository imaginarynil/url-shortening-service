package com.imaginarynil.url_shortening_service.service;

import org.springframework.stereotype.Service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class UrlShortener {
    private static final String CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final int SHORTCODE_LENGTH = 6;
    private static final int BASE_62 = 62;

    public String convertToBase62(Long id) {
        StringBuilder sb = new StringBuilder();
        Long n = id;
        while (n > 0) {
            int remainder = (int) (n % 62);
            sb.append(CHARS.charAt(remainder));
            n /= 62;
        }
        while (sb.length() < SHORTCODE_LENGTH) {
            sb.append(0);
        }
        return sb.reverse().toString();
    }

    public long convertToDecimal(String id) {
        long n = 0;
        StringBuilder sb = new StringBuilder(id);
        String reversedId = sb.reverse().toString();
        for (int i = 0; i < reversedId.length(); i++) {
            int c = CHARS.indexOf(reversedId.charAt(i));
            if (c > 0) {
                n += c * Math.pow(BASE_62, i);
            }
        }
        return n;
    }

    public boolean isShortCode(String id) {
        if(id.length() != 6) {
            return false;
        }
        Pattern p = Pattern.compile("^[0-9A-Za-z]+$");
        Matcher m = p.matcher(id);
        return m.find();
    }
}
