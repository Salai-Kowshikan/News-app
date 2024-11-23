package com.newsApp.newsApp.services;

import com.newsApp.newsApp.dto.*;
import com.newsApp.newsApp.models.NewsModel;
import com.newsApp.newsApp.repositories.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class NewsService {

    @Autowired
    private NewsRepository newsRepository;

    public List<NewsModel> getAllNews() {
        return newsRepository.findAll();
    }

    public String saveArticle(SaveArticleRequest request) {
        Optional<NewsModel> newsOptional = newsRepository.findByUserId(Integer.parseInt(request.getUserId()));
        if (newsOptional.isPresent()) {
            NewsModel news = newsOptional.get();
            NewsModel.SavedArticle article = new NewsModel.SavedArticle();
            article.setTitle(request.getTitle());
            article.setUrl(request.getUrl());
            article.setImageUrl(request.getImageUrl());
            news.getSaved().add(article);
            newsRepository.save(news);
            return "Article saved successfully";
        } else {
            return "User not found";
        }
    }

    public String updateCategories(UpdateCategoriesRequest request) {
        Optional<NewsModel> newsOptional = newsRepository.findByUserId(Integer.parseInt(request.getUserId()));
        if (newsOptional.isPresent()) {
            NewsModel news = newsOptional.get();
            news.setCategories(request.getCategories());
            newsRepository.save(news);
            return "Categories updated successfully";
        } else {
            return "User not found";
        }
    }

    public List<String> getCategoriesByUserId(int userId) {
        Optional<NewsModel> newsOptional = newsRepository.findByUserId(userId);
        return newsOptional.map(NewsModel::getCategories).orElse(null);
    }

    public List<NewsModel.SavedArticle> getSavedArticlesByUserId(int userId) {
        Optional<NewsModel> newsOptional = newsRepository.findByUserId(userId);
        return newsOptional.map(NewsModel::getSaved).orElse(null);
    }
}