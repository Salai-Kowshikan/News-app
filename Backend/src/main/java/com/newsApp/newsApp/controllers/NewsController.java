package com.newsApp.newsApp.controllers;

import com.newsApp.newsApp.dto.*;
import com.newsApp.newsApp.models.NewsModel;
import com.newsApp.newsApp.services.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/news")
public class NewsController {

    @Autowired
    private NewsService newsService;

    @GetMapping
    public String getNews() {
        return "News information";
    }

    @GetMapping("/all")
    public List<NewsModel> getAllNews() {
        return newsService.getAllNews();
    }

    @GetMapping("/categories/{userId}")
    public List<String> getCategoriesByUserId(@PathVariable int userId) {
        return newsService.getCategoriesByUserId(userId);
    }

    @GetMapping("/savedArticle/{userId}")
    public List<NewsModel.SavedArticle> getSavedArticlesByUserId(@PathVariable int userId) {
        return newsService.getSavedArticlesByUserId(userId);
    }

    @PostMapping("/savedArticle")
    public String saveArticle(@RequestBody SaveArticleRequest request) {
        return newsService.saveArticle(request);
    }

    @PutMapping("/updateCategories")
    public String updateCategories(@RequestBody UpdateCategoriesRequest request) {
        return newsService.updateCategories(request);
    }
}