package ma.dnaengineering.backend.controller;

import ma.dnaengineering.backend.models.Employee;
import ma.dnaengineering.backend.models.JobSummary;
import ma.dnaengineering.backend.service.CsvServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@RequestMapping("/api")

public class CsvController {
    // CsvController.java
    private CsvServiceImp csvService;
@Autowired
    public CsvController(CsvServiceImp csvService) {
        this.csvService = csvService;
    }
@GetMapping("/employee")
    public ResponseEntity<List<Employee>> getEmployees() {
        List<Employee> employees = csvService.getEmployees();
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }
    @GetMapping("/JobSummary")
    public ResponseEntity<List<JobSummary>> getJobSummary() {
        List<JobSummary>  JobSummary= csvService.getJobSummary();
        return new ResponseEntity<>(JobSummary, HttpStatus.OK);
    }

}
