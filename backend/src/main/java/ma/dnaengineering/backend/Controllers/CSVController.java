package ma.dnaengineering.backend.Controllers;

import ma.dnaengineering.backend.Entities.Employee;
import ma.dnaengineering.backend.Services.CSVService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpStatus;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/csv")
public class CSVController {
    @Autowired
    private CSVService csvService;


    @PostMapping("/upload")
    public ResponseEntity<Map<String, Object>> handleFileUpload(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Please select a file to upload."));
        }

        try {
            List<Employee> employees = csvService.parseCsv(file);
            csvService.save(employees);
            Map<String, Double> averageSalaries = csvService.calculateAverageSalaryByJobTitle(employees);

            Map<String, Object> responseData = new HashMap<>();
            responseData.put("message", "File uploaded and processed successfully.");
            responseData.put("employees", employees);
            responseData.put("averageSalaries", averageSalaries);

            return ResponseEntity.ok(responseData);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("error", "Error processing the CSV file."));
        }
    }

}
