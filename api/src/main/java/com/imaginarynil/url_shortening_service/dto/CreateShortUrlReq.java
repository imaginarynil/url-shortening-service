package com.imaginarynil.url_shortening_service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateShortUrlReq {
    @NotBlank(message = "URL cannot be blank")
    @Size(max = 2083)
    private String url;
}
