package ma.dnaengineering.backend.controller;

import ma.dnaengineering.backend.model.Employee;
import ma.dnaengineering.backend.service.CsvParserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    @Autowired
    private CsvParserService csvParserService;

    @GetMapping
    public List<Employee> getAllEmployees() {
        // Implement logic to fetch all employees
        return csvParserService.parseCsv("data/employees.csv");
    }

    @PostMapping
    public Employee addEmployee(@RequestBody Employee employee) {
        // Implement logic to add a new employee
        return csvParserService.addEmployee(employee);
    }
}