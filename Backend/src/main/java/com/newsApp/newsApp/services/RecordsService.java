package com.newsApp.newsApp.services;

import com.newsApp.newsApp.models.Record;
import com.newsApp.newsApp.repositories.RecordsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecordsService {

    @Autowired
    private RecordsRepository recordsRepository;

    public List<Record> getAllRecords() {
        return recordsRepository.findAll();
    }

    public boolean saveRecord(String uuid) {
        Optional<Record> recordOptional = recordsRepository.findByUuid(uuid);
        if (recordOptional.isPresent()) {
            Record record = recordOptional.get();
            record.setSaved(true);
            recordsRepository.save(record);
            return true;
        }
        return false;
    }

    public boolean unsaveRecord(String uuid) {
        Optional<Record> recordOptional = recordsRepository.findByUuid(uuid);
        if (recordOptional.isPresent()) {
            Record record = recordOptional.get();
            record.setSaved(false);
            recordsRepository.save(record);
            return true;
        }
        return false;
    }
    public List<Record> getSavedRecords() {
        return recordsRepository.findBySaved(true);
    }

}