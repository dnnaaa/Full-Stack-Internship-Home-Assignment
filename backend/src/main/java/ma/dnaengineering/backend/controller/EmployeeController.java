package ma.dnaengineering.backend.controller;

import ma.dnaengineering.backend.dto.EmployeeAndAveragesDto;
import ma.dnaengineering.backend.services.IEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/employees")
@RestController
public class EmployeeController {

    @Autowired
    IEmployeeService employeeService;


    @PostMapping(value = "/upload" , consumes = {"multipart/form-data"})
    public ResponseEntity<EmployeeAndAveragesDto>  uploadEmployees(
            @RequestPart("file") MultipartFile file
    ){
            return  ResponseEntity.ok(employeeService.uploadEmployeesAndProcess(file));
    }
}
