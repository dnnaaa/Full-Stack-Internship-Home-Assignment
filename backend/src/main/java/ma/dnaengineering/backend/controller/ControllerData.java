package ma.dnaengineering.backend.controller;

import ma.dnaengineering.backend.Model.Employee;
import ma.dnaengineering.backend.Service.ServiceData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/csv")
public class ControllerData {

    private final ServiceData serviceData;

    @Autowired
    public ControllerData(ServiceData serviceData) {
        this.serviceData = serviceData;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadCsvFile(@RequestParam("file") MultipartFile file) {
        try {
            serviceData.processCsv(file);
            return ResponseEntity.status(HttpStatus.OK).body("File uploaded and processed successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing the file: " + e.getMessage());
        }
    }

    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = serviceData.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

    @GetMapping("/job-summary")
    public ResponseEntity<List<String>> getJobTitleSummary() {
        List<String> jobTitleSummary = serviceData.getJobTitleSummary();
        return ResponseEntity.ok(jobTitleSummary);
    }
}
