package com.imaginarynil.url_shortening_service.service;

import com.imaginarynil.url_shortening_service.entity.Url;
import com.imaginarynil.url_shortening_service.exception.UrlExistsException;
import com.imaginarynil.url_shortening_service.exception.UrlIsNotValidException;
import com.imaginarynil.url_shortening_service.exception.UrlNotFoundException;
import com.imaginarynil.url_shortening_service.repository.UrlRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URI;

@Service
@AllArgsConstructor
public class UrlService {
    private UrlRepository urlRepository;
    private UrlShortener urlShortener;

    boolean isUrlValid(String url) {
        try {
            new URI(url).toURL();
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Transactional
    public Url createShortUrl(Url url) throws UrlIsNotValidException {
        // validate url
        if (!isUrlValid(url.getUrl())) {
            throw new UrlIsNotValidException();
        }
        // insert to database
        Url savedUrl = this.urlRepository.save(url);
        // generate shortcode
        String shortCode = this.urlShortener.convertToBase62(savedUrl.getId());
        savedUrl.setShortCode(shortCode);
        savedUrl.setAccessCount(0L);
        savedUrl = this.urlRepository.save(savedUrl);
        return savedUrl;
    }

    @Transactional
    public Url retrieveOriginalUrl(String shortCode) throws UrlNotFoundException {
        Url savedUrl = this.urlRepository.findByShortCode(shortCode);
        if (savedUrl == null) {
            throw new UrlNotFoundException();
        }
        savedUrl.setAccessCount(savedUrl.getAccessCount() + 1);
        this.urlRepository.save(savedUrl);
        return savedUrl;
    }

    public Url updateShortUrl(String shortCode, Url url) {
        // TODO: does this increment the access count?
        Url savedUrl = this.urlRepository.findByShortCode(shortCode);
        if (savedUrl == null) {
            throw new UrlNotFoundException();
        }
        // validate url
        if (!isUrlValid(url.getUrl())) {
            throw new UrlIsNotValidException();
        }
        savedUrl.setUrl(url.getUrl());
        Url newUrl = this.urlRepository.save(savedUrl);
        return newUrl;
    }

    public void deleteShortUrl(String shortCode) {
        Url savedUrl = this.urlRepository.findByShortCode(shortCode);
        if (savedUrl == null) {
            throw new UrlNotFoundException();
        }
        this.urlRepository.delete(savedUrl);
    }

    public Url getUrlStatistics(String shortCode) {
        Url savedUrl = this.urlRepository.findByShortCode(shortCode);
        if (savedUrl == null) {
            throw new UrlNotFoundException();
        }
        return savedUrl;
    }

    public Url createCustomShortUrl(Url url) throws UrlIsNotValidException, UrlExistsException {
        if (!isUrlValid(url.getUrl())) {
            throw new UrlIsNotValidException();
        }
        Url savedUrl = this.urlRepository.findByShortCode(url.getShortCode());
        if (savedUrl != null) {
            throw new UrlExistsException();
        }
        url.setAccessCount(0L);
        Url newUrl = this.urlRepository.save(url);
        return newUrl;
    }
}
