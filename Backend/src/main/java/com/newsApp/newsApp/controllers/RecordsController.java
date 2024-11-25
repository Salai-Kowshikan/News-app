package com.newsApp.newsApp.controllers;

import com.newsApp.newsApp.models.Record;
import com.newsApp.newsApp.services.RecordsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/records")
@CrossOrigin(origins = "*")
public class RecordsController {

    @Autowired
    private RecordsService recordsService;

    @GetMapping
    public List<Record> getAllRecords() {
        return recordsService.getAllRecords();
    }

    @PutMapping("/save/{uuid}")
    public ResponseEntity<Map<String, Boolean>> saveRecord(@PathVariable String uuid) {
        boolean isSaved = recordsService.saveRecord(uuid);
        Map<String, Boolean> response = new HashMap<>();
        response.put("success", isSaved);
        return ResponseEntity.ok(response);
    }
    @PutMapping("/unsave/{uuid}")
    public ResponseEntity<Map<String, Boolean>> unsaveRecord(@PathVariable String uuid) {
        boolean isUnsaved = recordsService.unsaveRecord(uuid);
        Map<String, Boolean> response = new HashMap<>();
        response.put("success", isUnsaved);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/save")
    public List<Record> getSavedRecords() {
        return recordsService.getSavedRecords();
    }
}