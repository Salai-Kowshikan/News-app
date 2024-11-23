package com.newsApp.newsApp.repositories;

import com.newsApp.newsApp.models.WeatherModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WeatherRepository extends MongoRepository<WeatherModel, String> {
}