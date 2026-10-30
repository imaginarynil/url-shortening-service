package com.imaginarynil.url_shortening_service.controller;

import com.imaginarynil.url_shortening_service.dto.*;
import com.imaginarynil.url_shortening_service.mapper.UrlMapper;
import com.imaginarynil.url_shortening_service.service.UrlService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/shorten")
@AllArgsConstructor
@CrossOrigin
public class UrlController {
    private UrlService urlService;
    private UrlMapper urlMapper;

    @PostMapping
    ResponseEntity<UrlRes> createShortUrl(@Valid @RequestBody CreateShortUrlReq req) {
        UrlRes savedUrl = urlMapper.toDto(this.urlService.createShortUrl(urlMapper.toEntity(req)));
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUrl);
    }

    @GetMapping("/{shortCode}")
    ResponseEntity<UrlRes> retrieveOriginalUrl(@PathVariable String shortCode) {
        UrlRes url = urlMapper.toDto(this.urlService.retrieveOriginalUrl(shortCode));
        return ResponseEntity.status(HttpStatus.OK).body(url);
    }

    @PutMapping("/{shortCode}")
    ResponseEntity<UrlRes> updateShortUrl(@PathVariable String shortCode, @Valid @RequestBody UpdateShortUrlReq req) {
        UrlRes newUrl = urlMapper.toDto(this.urlService.updateShortUrl(shortCode, urlMapper.toEntity(req)));
        return ResponseEntity.status(HttpStatus.OK).body(newUrl);
    }

    @DeleteMapping("/{shortCode}")
    ResponseEntity<Void> deleteShortUrl(@PathVariable String shortCode) {
        this.urlService.deleteShortUrl(shortCode);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/{shortCode}/stats")
    ResponseEntity<GetUrlStatisticsRes> getUrlStatistics(@PathVariable String shortCode) {
        GetUrlStatisticsRes savedUrl = urlMapper.toGetUrlStatisticsResDto(this.urlService.getUrlStatistics(shortCode));
        return ResponseEntity.status(HttpStatus.OK).body(savedUrl);
    }

    @PostMapping("/custom")
    ResponseEntity<UrlRes> createCustomShortUrl(@Valid @RequestBody CreateCustomShortUrlReq req) {
        UrlRes savedUrl = urlMapper.toDto(this.urlService.createCustomShortUrl(urlMapper.toEntity(req)));
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUrl);
    }
}
