package ma.dnaengineering.backend.controller;

// TaskController.java
import ma.dnaengineering.backend.model.Employee;
import ma.dnaengineering.backend.service.CsvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Controller
public class TaskController {

    @Autowired
    private CsvService csvService;

    @PostMapping("/upload")
    public ResponseEntity<Map<String, Object>> uploadCsv(@RequestParam("file") MultipartFile file) {
        try {
            List<Employee> employees = csvService.readAndProcessCsv(file);

            // Add logic to calculate average salary per job title

            // Create a summary map with job title as key and average salary as value

            // Return the summary map along with the list of employees

            // Example: return ResponseEntity.ok(Map.of("employees", employees, "summary", summary));
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Error processing CSV file"));
        }
        return null;
    }
}
