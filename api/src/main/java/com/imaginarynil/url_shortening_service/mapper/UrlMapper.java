package com.imaginarynil.url_shortening_service.mapper;

import com.imaginarynil.url_shortening_service.dto.*;
import com.imaginarynil.url_shortening_service.entity.Url;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UrlMapper {
    UrlRes toDto(Url url);

    GetUrlStatisticsRes toGetUrlStatisticsResDto(Url url);

    Url toEntity(CreateCustomShortUrlReq req);

    Url toEntity(CreateShortUrlReq req);

    Url toEntity(UpdateShortUrlReq req);
}
