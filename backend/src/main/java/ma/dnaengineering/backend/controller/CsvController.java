package ma.dnaengineering.backend.controller;

import ma.dnaengineering.backend.Model.Employee;
import ma.dnaengineering.backend.Service.CsvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/csv")
public class CsvController {

    private final CsvService csvService;

    @Autowired
    public CsvController(CsvService csvService) {
        this.csvService = csvService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadCsvFile(@RequestParam("file") MultipartFile file) {
        try {
            csvService.processCsv(file);
            return ResponseEntity.status(HttpStatus.OK).body("File uploaded and processed successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing the file: " + e.getMessage());
        }
    }

    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = csvService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

    @GetMapping("/job-summary")
    public ResponseEntity<List<String>> getJobTitleSummary() {
        List<String> jobTitleSummary = csvService.getJobTitleSummary();
        return ResponseEntity.ok(jobTitleSummary);
    }
}
