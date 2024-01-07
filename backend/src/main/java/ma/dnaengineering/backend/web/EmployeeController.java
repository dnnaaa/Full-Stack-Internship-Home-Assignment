package ma.dnaengineering.backend.web;

import ma.dnaengineering.backend.dto.SalarySummaryDTO;
import ma.dnaengineering.backend.entities.Employee;
import ma.dnaengineering.backend.services.EmployeeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            employeeService.parseCSVFile(file);

            return ResponseEntity.ok().body("File uploaded successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while uploading the file: " + e.getMessage());
        }
    }

    @PostMapping("/process")
    public ResponseEntity<?> processFile() {
        try {

            List<Employee> employees = employeeService.getAllEmployees();
            Map<String, SalarySummaryDTO> salarySummary = employeeService.calculateAverageSalary(employees);

            return ResponseEntity.ok().body(Map.of( "employees",employees,"salarySummary", salarySummary));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while processing the file: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

}
