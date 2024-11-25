package com.newsApp.newsApp.repositories;

import com.newsApp.newsApp.models.Record;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface RecordsRepository extends MongoRepository<Record, String> {
    Optional<Record> findByUuid(String uuid);
    List<Record> findBySaved(boolean saved);
}