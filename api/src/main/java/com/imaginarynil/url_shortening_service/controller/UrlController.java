package com.imaginarynil.url_shortening_service.controller;

import com.imaginarynil.url_shortening_service.dto.CreateShortUrlDto;
import com.imaginarynil.url_shortening_service.dto.GetUrlStatisticsDto;
import com.imaginarynil.url_shortening_service.dto.RetrieveOriginalUrlDto;
import com.imaginarynil.url_shortening_service.entity.Url;
import com.imaginarynil.url_shortening_service.exception.UrlIsNotValidException;
import com.imaginarynil.url_shortening_service.exception.UrlNotFoundException;
import com.imaginarynil.url_shortening_service.service.UrlService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/shorten")
@AllArgsConstructor
public class UrlController {
    private UrlService urlService;

    @PostMapping
    ResponseEntity<CreateShortUrlDto> createShortUrl(@RequestBody Url url) {
        try {
            CreateShortUrlDto savedUrl = this.urlService.createShortUrl(url);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUrl);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/{shortCode}")
    ResponseEntity<RetrieveOriginalUrlDto> retrieveOriginalUrl(@PathVariable String shortCode) {
        try {
            RetrieveOriginalUrlDto url = this.urlService.retrieveOriginalUrl(shortCode);
            return ResponseEntity.status(HttpStatus.OK).body(url);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/{shortCode}")
    ResponseEntity<RetrieveOriginalUrlDto> updateShortUrl(@PathVariable String shortCode, @RequestBody Url url) {
        try {
            RetrieveOriginalUrlDto newUrl = this.urlService.updateShortUrl(shortCode, url);
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
    ResponseEntity<GetUrlStatisticsDto> getUrlStatistics(@PathVariable String shortCode) {
        try {
            GetUrlStatisticsDto savedUrl = this.urlService.getUrlStatistics(shortCode);
            return ResponseEntity.status(HttpStatus.OK).body(savedUrl);
        } catch (UrlNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
