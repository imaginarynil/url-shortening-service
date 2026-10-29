package com.imaginarynil.url_shortening_service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateCustomShortUrlReq {
    @NotBlank(message = "URL cannot be blank")
    @Size(max = 2083)
    private String url;
    @NotBlank(message = "Short code cannot be blank")
    @Size(min = 5, max = 32)
    @Pattern(regexp = "^[A-Za-z0-9]+$")
    private String shortCode;
}
