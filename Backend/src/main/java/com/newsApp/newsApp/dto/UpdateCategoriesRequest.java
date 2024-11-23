package com.newsApp.newsApp.dto;

import java.util.List;

public class UpdateCategoriesRequest {
    private String userId;
    private List<String> categories;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public List<String> getCategories() {
        return categories;
    }

    public void setCategories(List<String> categories) {
        this.categories = categories;
    }
}