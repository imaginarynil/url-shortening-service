package com.imaginarynil.url_shortening_service.repository;

import com.imaginarynil.url_shortening_service.entity.Url;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UrlRepository extends CrudRepository<Url, Long> {
    // if there are > 1 records
    @Query(value = "SELECT * FROM url WHERE short_code = :shortCode LIMIT 1", nativeQuery = true)
    Url findByShortCode(String shortCode);

    @Query(value = "SELECT * FROM url ORDER BY id DESC LIMIT 1", nativeQuery = true)
    Url findTheLatestRecord();
}
