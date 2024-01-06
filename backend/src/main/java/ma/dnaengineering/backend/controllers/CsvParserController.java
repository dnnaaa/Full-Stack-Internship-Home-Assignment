package ma.dnaengineering.backend.controllers;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.dnaengineering.backend.dtos.EmployeeCsvDto;
import ma.dnaengineering.backend.models.Employee;
import ma.dnaengineering.backend.services.EmployeeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin
public class CsvParserController {
    private final EmployeeService employeeService;

    @PostMapping("/upload")
    public ResponseEntity<EmployeeCsvDto> uploadCsvFile(@RequestParam("file") MultipartFile file) throws
            IOException {
        log.info("Uploading file: {}", file.getOriginalFilename());
        List<Employee> employees = employeeService.processCsvFile(file);
        Map<String, Double> summary = employeeService.calculateAverageSalaryByJobTitle(employees);
        return ResponseEntity.ok(EmployeeCsvDto
                .builder()
                .employees(employees)
                .summary(summary)
                .build());
    }
}
