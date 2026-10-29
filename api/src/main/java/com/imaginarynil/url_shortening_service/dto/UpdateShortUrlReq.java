package com.imaginarynil.url_shortening_service.dto;

import com.imaginarynil.url_shortening_service.Constant;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateShortUrlReq {
    @NotBlank(message = Constant.URL_CANNOT_BE_BLANK)
    @Size(max = Constant.MAX_URL_SIZE)
    private String url;
}
