package com.imaginarynil.url_shortening_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.ZonedDateTime;

@Data
@AllArgsConstructor
public class CreateCustomShortUrlDto {
    private Long id;
    private String url;
    private String shortCode;
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;
}
