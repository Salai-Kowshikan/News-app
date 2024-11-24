package com.newsApp.newsApp.controllers;

import com.newsApp.newsApp.dto.*;
import com.newsApp.newsApp.models.NewsModel;
import com.newsApp.newsApp.services.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public ResponseEntity<Map<String, Boolean>> saveArticle(@RequestBody SaveArticleRequest request) {
        boolean isSaved = newsService.saveArticle(request);
        Map<String, Boolean> response = new HashMap<>();
        response.put("success", isSaved);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/savedArticle")
    public ResponseEntity<Map<String, Boolean>> deleteSavedArticle(@RequestBody DeleteArticleRequest request) {
        boolean isDeleted = newsService.deleteSavedArticle(request.getUserId(), request.getUuid());
        Map<String, Boolean> response = new HashMap<>();
        response.put("success", isDeleted);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/updateCategories")
    public String updateCategories(@RequestBody UpdateCategoriesRequest request) {
        return newsService.updateCategories(request);
    }
}