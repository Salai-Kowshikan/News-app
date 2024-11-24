package com.newsApp.newsApp.dto;

public class DeleteArticleRequest {
    private int userId;
    private String uuid;

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }
}