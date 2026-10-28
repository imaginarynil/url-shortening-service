package com.imaginarynil.url_shortening_service.controller;

import com.imaginarynil.url_shortening_service.ErrorDto;
import com.imaginarynil.url_shortening_service.entity.Url;
import com.imaginarynil.url_shortening_service.exception.UrlIsNotValidException;
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
    ResponseEntity<Url> createShortUrl(@RequestBody Url url) {
        try {
            Url savedUrl = this.urlService.createShortUrl(url);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUrl);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/{shortCode}")
    ResponseEntity<Url> retrieveOriginalUrl(@PathVariable String shortCode) {
        try {
            Url url = this.urlService.retrieveOriginalUrl(shortCode);
            return ResponseEntity.status(HttpStatus.OK).body(url);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
