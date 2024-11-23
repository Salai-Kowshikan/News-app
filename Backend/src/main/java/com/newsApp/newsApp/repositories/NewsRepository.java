package com.newsApp.newsApp.repositories;

import com.newsApp.newsApp.models.NewsModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface NewsRepository extends MongoRepository<NewsModel, String> {
    Optional<NewsModel> findByUserId(int userId);
}