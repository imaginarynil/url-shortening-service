package com.imaginarynil.url_shortening_service.service;

import com.imaginarynil.url_shortening_service.dto.CreateShortUrlDto;
import com.imaginarynil.url_shortening_service.dto.RetrieveOriginalUrlDto;
import com.imaginarynil.url_shortening_service.entity.Url;
import com.imaginarynil.url_shortening_service.exception.UrlIsNotValidException;
import com.imaginarynil.url_shortening_service.exception.UrlNotFoundException;
import com.imaginarynil.url_shortening_service.repository.UrlRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;

@Service
@AllArgsConstructor
public class UrlService {
    private UrlRepository urlRepository;
    private UrlShortener urlShortener;

    boolean isValidUrl(String url) {
        try {
            new URI(url).toURL();
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Transactional
    public CreateShortUrlDto createShortUrl(Url url) throws UrlIsNotValidException {
        // validate url
        if (!isValidUrl(url.getUrl())) {
            throw new UrlIsNotValidException();
        }
        // insert to database
        Url savedUrl = this.urlRepository.save(url);
        // generate shortcode
        String shortCode = this.urlShortener.convertToBase62(savedUrl.getId());
        savedUrl.setShortCode(shortCode);
        savedUrl.setAccessCount(0L);
        savedUrl = this.urlRepository.save(savedUrl);
        return new CreateShortUrlDto(savedUrl.getId(), savedUrl.getUrl(), savedUrl.getShortCode(), savedUrl.getCreatedAt(), savedUrl.getUpdatedAt());
    }

    @Transactional
    public RetrieveOriginalUrlDto retrieveOriginalUrl(String shortCode) throws UrlNotFoundException {
        Url url = this.urlRepository.findByShortCode(shortCode);
        if (url == null) {
            throw new UrlNotFoundException();
        }
        url.setAccessCount(url.getAccessCount() + 1);
        this.urlRepository.save(url);
        return new RetrieveOriginalUrlDto(url.getId(), url.getUrl(), url.getShortCode(), url.getCreatedAt(), url.getUpdatedAt());
    }

    public RetrieveOriginalUrlDto updateShortUrl(String shortCode, Url url) {
        // TODO: does this increment the access count?
        Url savedUrl = this.urlRepository.findByShortCode(shortCode);
        if (savedUrl == null) {
            throw new UrlNotFoundException();
        }
        // validate url
        if (!isValidUrl(url.getUrl())) {
            throw new UrlIsNotValidException();
        }
        savedUrl.setUrl(url.getUrl());
        Url newUrl = this.urlRepository.save(savedUrl);
        return new RetrieveOriginalUrlDto(newUrl.getId(), newUrl.getUrl(), newUrl.getShortCode(), newUrl.getCreatedAt(), newUrl.getUpdatedAt());
    }
}
