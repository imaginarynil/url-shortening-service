package com.imaginarynil.url_shortening_service.dto;

import com.imaginarynil.url_shortening_service.Constant;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateCustomShortUrlReq {
    @NotBlank(message = Constant.URL_CANNOT_BE_BLANK)
    @Size(max = Constant.MAX_URL_SIZE)
    private String url;
    @NotBlank(message = "Short code cannot be blank")
    @Size(min = 5, max = 32)
    @Pattern(regexp = "^[A-Za-z0-9]+$", message = "Short code can only contain letters or numbers")
    private String shortCode;
}
