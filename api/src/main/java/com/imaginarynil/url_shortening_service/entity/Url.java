package com.imaginarynil.url_shortening_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;

import java.time.ZonedDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Url {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String url;
    private String shortCode;
    @Column(insertable = false, updatable = false)
    @CreationTimestamp
    ZonedDateTime createdAt;
    @Column(insertable = false, updatable = true)
    @CreationTimestamp
    ZonedDateTime updatedAt;
    private Long accessCount;
}
