package com.imaginarynil.url_shortening_service.mapper;

import com.imaginarynil.url_shortening_service.dto.CreateShortUrlDto;
import com.imaginarynil.url_shortening_service.dto.GetUrlStatisticsDto;
import com.imaginarynil.url_shortening_service.dto.RetrieveOriginalUrlDto;
import com.imaginarynil.url_shortening_service.dto.UpdateShortUrlDto;
import com.imaginarynil.url_shortening_service.entity.Url;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UrlMapper {
    CreateShortUrlDto toCreateShortUrlDto(Url url);

    GetUrlStatisticsDto toGetUrlStatisticsDto(Url url);

    RetrieveOriginalUrlDto toRetrieveOriginalUrlDto(Url url);

    UpdateShortUrlDto toUpdateShortUrlDto(Url url);
}
