package ma.dnaengineering.backend.controlleur;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import ma.dnaengineering.backend.services.EmployeeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.dnaengineering.backend.DTO.EmployeeDTO;
import ma.dnaengineering.backend.models.Employee;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin
public class ControllerCsv {

    private final EmployeeService employeeService;

    @PostMapping("/upload")
    public ResponseEntity<EmployeeDTO> uploadCsvFile(@RequestParam("file") MultipartFile file) throws
            IOException {
        log.info("Uploading file: {}", file.getOriginalFilename());
        List<Employee> employees = employeeService.processCsvFile(file);
        Map<String, Double> summary = employeeService.calculateAverageSalaryByJobTitle(employees);
        return ResponseEntity.ok(EmployeeDTO
                .builder()
                .employees(employees)
                .summary(summary)
                .build());
    }
}
