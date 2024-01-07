package ma.dnaengineering.backend.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ma.dnaengineering.backend.services.CSVService;

import java.util.List;
import java.util.Map;

@RestController
public class CSVController {

    private final CSVService csvService;

    public CSVController(CSVService csvService) {
        this.csvService = csvService;
    }

    @PostMapping("/upload")
    public List<Map<String, String>> uploadCSV(@RequestParam("file") MultipartFile file) {
        return csvService.parseCSVAndGetEmployees(file);
    }

    @GetMapping("/jobSummary")
    public List<Map<String, Double>> getJobSummary() {
        // Fetch employeesList from cache and calculate job summary
        List<Map<String, String>> employeesList = null;
        return csvService.calculateJobSummary(employeesList);
    }
}
