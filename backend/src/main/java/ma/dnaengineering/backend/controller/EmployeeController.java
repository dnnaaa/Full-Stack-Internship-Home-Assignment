package ma.dnaengineering.backend.controller;

import ma.dnaengineering.backend.dto.EmployeeDTO;
import ma.dnaengineering.backend.dto.JobSummaryDTO;
import ma.dnaengineering.backend.exceptions.EmployeeDataParsingException;
import ma.dnaengineering.backend.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@RestController
@RequestMapping("/api")
public class EmployeeController {
    private final EmployeeService employeeService;
    public List<EmployeeDTO> uploadedEmployees;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping("/uploadCSV")
    public ResponseEntity<?> uploadCSV(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Plz select a file to upload");
        }

        try {
            InputStream inputStream = file.getInputStream();
            uploadedEmployees = employeeService.parseCSVAndReturnEmployees(inputStream);
            return ResponseEntity.ok("File uploaded successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing the file");
        } catch (EmployeeDataParsingException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error parsing employee data from CSV");
        }
    }

    @GetMapping("/employees")
    public ResponseEntity<?> getEmployees() {
        if (uploadedEmployees == null || uploadedEmployees.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No uploaded data to display");
        }
        return ResponseEntity.ok(uploadedEmployees);
    }

    @GetMapping("/jobSummaries")
    public ResponseEntity<?> getJobSummaries() {
        if (uploadedEmployees == null || uploadedEmployees.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No uploaded data to process");
        }

        try {
            List<JobSummaryDTO> jobSummaries = employeeService.calculateAverageSalaryPerJobTitle(uploadedEmployees);
            return ResponseEntity.ok(jobSummaries);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing data");
        }
    }
}

