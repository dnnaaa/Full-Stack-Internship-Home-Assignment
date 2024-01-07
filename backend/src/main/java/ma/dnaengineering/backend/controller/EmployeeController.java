package ma.dnaengineering.backend.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import ma.dnaengineering.backend.model.Employee;
import ma.dnaengineering.backend.service.IEmployeeService;

@RestController
@RequestMapping("/api/v1/employees")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    @Autowired
    IEmployeeService employeeService;

    @PostMapping("/upload")
    public ResponseEntity<Object> uploadEmloyees(@RequestParam("file") MultipartFile file) throws IOException {
        employeeService.saveEmployees(file);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Page<Employee>> getEmployees(@RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "3") int size)
    {
        Page<Employee> employeePage = employeeService.getAllEmployeesSortedByName(page, size); 

        return new ResponseEntity<Page<Employee>>(employeePage,HttpStatus.OK);
    }    


    @GetMapping("/jobsummaries")
    public ResponseEntity<Map<String,Double>> getJobSummaries()
    {
        Map<String,Double> jobSummariesMap = employeeService.getJobSummaries();

        return new ResponseEntity<>(jobSummariesMap,HttpStatus.OK);
    }






    
}
