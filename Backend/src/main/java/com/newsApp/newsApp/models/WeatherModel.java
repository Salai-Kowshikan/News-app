package com.newsApp.newsApp.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Weather")
public class WeatherModel {

    @Id
    private String id;
    private String data;

    // Getters and Setters
}