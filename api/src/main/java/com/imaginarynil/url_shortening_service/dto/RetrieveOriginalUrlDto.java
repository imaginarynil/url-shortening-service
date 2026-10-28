package com.imaginarynil.url_shortening_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.ZonedDateTime;

@Data
@AllArgsConstructor
public class RetrieveOriginalUrlDto {
    private Long id;
    private String url;
    private String shortCode;
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;
}
