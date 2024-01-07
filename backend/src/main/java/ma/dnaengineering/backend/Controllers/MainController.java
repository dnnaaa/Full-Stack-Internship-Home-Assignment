package ma.dnaengineering.backend.Controllers;


import ma.dnaengineering.backend.Models.Employee;
import ma.dnaengineering.backend.Services.CsvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ma.dnaengineering.backend.ResponseObjects.CustomResponse;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MainController {
    CsvService<Employee> service ;

    @Autowired
    public MainController(CsvService<Employee> service) {
        this.service = service;
    }

    @PostMapping("/process-csv")
    public ResponseEntity<CustomResponse> processCSV(@RequestParam("csv_file") MultipartFile file) throws IOException {
        List<Employee> employees = service.processUploadedFile(file.getInputStream());
        HashMap<String,Double> summary = service.averageSalaryForEachJobTitle(employees);
        service.save(employees);
        CustomResponse response =CustomResponse.builder()
                .employees(employees)
                .summary(summary)
                .message("Your CSV file has been processed")
                .build();

        return ResponseEntity.ok(response);
    }

    @GetMapping("get-data")
    public ResponseEntity<CustomResponse> getData() {
        List<Employee> employees = service.getAll();
        if(employees.size() >0) {
            HashMap<String, Double> summary = service.averageSalaryForEachJobTitle(employees);
            CustomResponse response = CustomResponse.builder()
                    .employees(employees)
                    .summary(summary)
                    .message("")
                    .build();

            return ResponseEntity.ok(response);
        }else {
            CustomResponse response = CustomResponse.builder()
                    .employees(null)
                    .summary(null)
                    .message("No data found")
                    .build();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(response);
        }
    }



}
