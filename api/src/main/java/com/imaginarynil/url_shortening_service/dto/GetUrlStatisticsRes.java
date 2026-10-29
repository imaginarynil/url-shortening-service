package com.imaginarynil.url_shortening_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GetUrlStatisticsRes extends UrlRes {
    private Long accessCount;
}
