package ma.dnaengineering.backend.controller;

import ma.dnaengineering.backend.entity.Employee;
import ma.dnaengineering.backend.response.ResponseMessage;
import ma.dnaengineering.backend.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/files")
public class FileController {

    @Autowired
    private FileService service;

    @PostMapping("/upload")
    public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file")MultipartFile file ){
        try {
            if (service.hasCsvFormat(file)) {
                service.processAndSaveData(file);
                return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage("Uploaded the file successfully : " + file.getOriginalFilename()));
            } else {
                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage("Please upload CSV file"));
            }
        }
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseMessage("Error uploading the file"));
        }
    }

    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        try {
            List<Employee> employees = service.getAllEmployees();
            return ResponseEntity.status(HttpStatus.OK).body(employees);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/averageSalariesByJobTitle")
    public ResponseEntity<List<Map.Entry<String, Double>>> getAverageSalariesByJobTitle() {
        try {
            List<Map.Entry<String, Double>> averageSalaries = service.getAverageSalariesByJobTitle();
            return ResponseEntity.status(HttpStatus.OK).body(averageSalaries);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
