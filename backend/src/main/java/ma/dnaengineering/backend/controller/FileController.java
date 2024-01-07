package ma.dnaengineering.backend.controller;

import ma.dnaengineering.backend.entity.Employee;
import ma.dnaengineering.backend.response.ResponseMessage;
import ma.dnaengineering.backend.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("files")
@CrossOrigin(origins = "http://localhost:3000")
public class FileController {
    @Autowired
    private FileService service;

    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = service.getAllEmployees();
        return ResponseEntity.ok(employees);
    }
    @GetMapping("/averageSalary")
    public ResponseEntity<?> getAverageSalaryByJobTitle() {
        Map<String, Double> averageSalaries = service.getAverageSalaryByJobTitle();
        return ResponseEntity.ok(averageSalaries);
    }
    @PostMapping("/csvformat")
    public ResponseEntity<ResponseMessage> csvformat() {
        if(service.hasCSVformat())
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage("File Uploaded has csv format: " ));
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage("File Uploaded has not csv format: " ));

    }
    @PostMapping("/upload")
    public ResponseEntity<ResponseMessage> uploadFile() {
            service.SaveData();
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage("File Uploaded successfully: " ));
        }
    }
