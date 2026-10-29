package com.imaginarynil.url_shortening_service.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UrlRes {
    private Long id;
    private String url;
    private String shortCode;
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;
}
