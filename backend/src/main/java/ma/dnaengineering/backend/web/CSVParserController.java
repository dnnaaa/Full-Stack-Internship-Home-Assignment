package ma.dnaengineering.backend.web;

import ma.dnaengineering.backend.entities.Employee;
import ma.dnaengineering.backend.entities.JobsSummary;
import ma.dnaengineering.backend.service.CSVService;
import ma.dnaengineering.backend.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/csv/parser/employees")
@CrossOrigin(origins = "http://localhost:3000")
public class CSVParserController {

    @Autowired
    private CSVService csvService;
    @Autowired
    private EmployeeService employeeService;

//    @PostMapping("/upload")
//    public ResponseEntity<List<Employee>> processFileUpload(@RequestParam("file") MultipartFile file) {
//        employeeService.deleteAll();
//
//        if (file.isEmpty()) {
//            return ResponseEntity.badRequest().body(null);
//        }
//
//        try {
//            List<String[]> records = csvService.readCSV(file.getInputStream());
//            csvService.processRecords(records);
//            List<Employee> employees = employeeService.findAll();
//            return ResponseEntity.ok(employees);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }

    @PostMapping("/upload")
    public Map<String, Object> processFileUpload(@RequestParam("file") MultipartFile file) {
        employeeService.deleteAll();

        if (file.isEmpty()) {
            return new HashMap<>();
        }

        try {
            List<String[]> records = csvService.readCSV(file.getInputStream());
            csvService.processRecords(records);
            employeeService.findAll();
            List<Employee> employees = employeeService.findAll();
            List<JobsSummary> jobsSummaries = employeeService.calculateSummary();

            Map<String, Object> result = new HashMap<>();
            result.put("employees", employees);
            result.put("jobSummaries", jobsSummaries);

            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return new HashMap<>();
        }
    }
}
