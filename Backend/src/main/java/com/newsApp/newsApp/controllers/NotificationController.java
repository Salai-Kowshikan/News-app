package com.newsApp.newsApp.controllers;

import com.newsApp.newsApp.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping("/send")
    public String sendNotification(@RequestBody Map<String, String> payload) {
        String token = payload.get("token");
        String title = payload.get("title");
        String body = payload.get("body");
        return notificationService.sendPushNotification(token, title, body);
    }
}