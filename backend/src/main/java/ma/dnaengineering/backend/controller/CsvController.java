package ma.dnaengineering.backend.controller;

import ma.dnaengineering.backend.service.CsvService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/csv")
@CrossOrigin
public class CsvController {

    private final CsvService csvService;

    public CsvController(CsvService csvService) {
        this.csvService = csvService;
    }

    @PostMapping("/upload")
    public ResponseEntity<Map<String, Object>> uploadAndProcessCSV(@RequestParam("file") MultipartFile file) {
        try {
            Map<String, Object> result = csvService.parseCSV(file);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (IOException e) {
            // Log the exception
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
