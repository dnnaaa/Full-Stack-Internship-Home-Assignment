package ma.dnaengineering.backend.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import ma.dnaengineering.backend.entitys.Employee;
import ma.dnaengineering.backend.services.FileService;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/csv")
public class EmployeeController {

	@Autowired
	private FileService service;

	public EmployeeController() {
		// TODO Auto-generated constructor stub
	}

	@PostMapping("/parse")
	public ResponseEntity<Map<String, Object>> parseCSV(@RequestParam("file") MultipartFile file) {
		if (file.isEmpty()) {
			return ResponseEntity.badRequest().body(Map.of("error", "Please provide a CSV file."));
		}

		try {
			List<Employee> employees = service.readFile(file);
			Map<String, Double> jobTitleAverages = service.calculateAverageSalaryByJobTitle(employees);

			return ResponseEntity.ok(Map.of("employees", employees, "jobTitleAverages", jobTitleAverages));
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Map.of("error", "Failed to process CSV file."));
		}
	}
}
