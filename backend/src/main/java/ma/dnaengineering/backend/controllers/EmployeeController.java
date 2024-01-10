package ma.dnaengineering.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import ma.dnaengineering.backend.dto.JobsSummary;
import ma.dnaengineering.backend.entities.Employee;
import ma.dnaengineering.backend.services.EmployeeService;

@Controller
public class EmployeeController {
	
	@Autowired
	private EmployeeService employeeService;

	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/upload")
    public ResponseEntity<List<Employee>> parseFile(@RequestParam("file") MultipartFile file) {
        List<Employee> employees = employeeService.parseFile(file);
        if (employees != null) {
			return new ResponseEntity<>(employees, HttpStatus.OK);
		}
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/average-salary")
    public ResponseEntity<List<JobsSummary>> getAverageSalaryByJob() {
        List<JobsSummary> response = employeeService.getAverageSalaryByJob();
        return ResponseEntity.ok(response);
    }
	
}
