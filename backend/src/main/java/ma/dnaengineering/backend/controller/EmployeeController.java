package ma.dnaengineering.backend.controller;

import lombok.RequiredArgsConstructor;
import ma.dnaengineering.backend.Dto.JobSalaryDto;
import ma.dnaengineering.backend.entity.Employee;
import ma.dnaengineering.backend.repository.EmployeeRepository;
import ma.dnaengineering.backend.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private EmployeeRepository employeeRepository;

    @PostMapping(value = "/upload", consumes = {"multipart/form-data"})
    public ResponseEntity<Integer> uploadStudents(
            @RequestPart("file") MultipartFile file
    ) throws IOException, InterruptedException {
        return ResponseEntity.ok(employeeService.uploadEmployees(file));
    }
    @GetMapping("/employees")
    public List<Employee> getStudents() {
        return employeeRepository.findAll();
    }
    @GetMapping("/average-salary-by-job-title")
    public List<JobSalaryDto> getAverageSalaryByJobTitle() {
        return employeeService.getAverageSalaryByJobTitle();
    }
}
