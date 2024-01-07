package ma.dnaengineering.backend.controller;

import ma.dnaengineering.backend.model.Employee;
import ma.dnaengineering.backend.service.ParserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/csvparser")
public class ParseController {

    private final ParserService parserService;

    @Autowired
    public ParseController(ParserService parserService) {
        this.parserService = parserService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadCsv(@RequestParam("file") MultipartFile file) {
        try {
            parserService.uploadAndProcessCsv(file);
            return ResponseEntity.ok("CSV file uploaded and processed successfully!");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error processing CSV file: " + e.getMessage());
        }
    }

    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = parserService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

    @GetMapping("/results")
    public ResponseEntity<Map<String, Double>> getResults() {
        Map<String, Double> averageSalaries = parserService.calculateAverageSalaries();
        return ResponseEntity.ok(averageSalaries);
    }
}
