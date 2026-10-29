package com.imaginarynil.url_shortening_service.controller;

import com.imaginarynil.url_shortening_service.dto.*;
import com.imaginarynil.url_shortening_service.exception.UrlIsNotValidException;
import com.imaginarynil.url_shortening_service.exception.UrlNotFoundException;
import com.imaginarynil.url_shortening_service.mapper.UrlMapper;
import com.imaginarynil.url_shortening_service.service.UrlService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/* TODO:
 * fix date format
 * sanitize input
 * read and error handling
 * add docker
 * update url validation */

@RestController
@RequestMapping("/shorten")
@AllArgsConstructor
public class UrlController {
    private UrlService urlService;
    private UrlMapper urlMapper;

    @PostMapping
    ResponseEntity<UrlRes> createShortUrl(@Valid @RequestBody CreateShortUrlReq req) {
        try {
            UrlRes savedUrl = urlMapper.toDto(this.urlService.createShortUrl(urlMapper.toEntity(req)));
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUrl);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/{shortCode}")
    ResponseEntity<UrlRes> retrieveOriginalUrl(@PathVariable String shortCode) {
        try {
            UrlRes url = urlMapper.toDto(this.urlService.retrieveOriginalUrl(shortCode));
            return ResponseEntity.status(HttpStatus.OK).body(url);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/{shortCode}")
    ResponseEntity<UrlRes> updateShortUrl(@PathVariable String shortCode, @Valid @RequestBody UpdateShortUrlReq req) {
        try {
            UrlRes newUrl = urlMapper.toDto(this.urlService.updateShortUrl(shortCode, urlMapper.toEntity(req)));
            return ResponseEntity.status(HttpStatus.OK).body(newUrl);
        } catch (UrlIsNotValidException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch (UrlNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/{shortCode}")
    ResponseEntity<Void> deleteShortUrl(@PathVariable String shortCode) {
        try {
            this.urlService.deleteShortUrl(shortCode);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (UrlNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/{shortCode}/stats")
    ResponseEntity<GetUrlStatisticsRes> getUrlStatistics(@PathVariable String shortCode) {
        try {
            GetUrlStatisticsRes savedUrl = urlMapper.toGetUrlStatisticsResDto(this.urlService.getUrlStatistics(shortCode));
            return ResponseEntity.status(HttpStatus.OK).body(savedUrl);
        } catch (UrlNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/custom")
    ResponseEntity<UrlRes> createCustomShortUrl(@Valid @RequestBody CreateCustomShortUrlReq req) {
        try {
            UrlRes savedUrl = urlMapper.toDto(this.urlService.createCustomShortUrl(urlMapper.toEntity(req)));
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUrl);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}
