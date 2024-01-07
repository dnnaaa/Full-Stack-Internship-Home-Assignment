package ma.dnaengineering.backend.controller;

import ma.dnaengineering.backend.response.Response;
import ma.dnaengineering.backend.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@CrossOrigin
@RestController
@RequestMapping("/employees")
public class EmployeeController {

    EmployeeService employeeService;

    @PostMapping(value = "process", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Response> upload(@RequestParam("file") MultipartFile file) {
        Response response = employeeService.process(file);
        // Return the response entity
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<Response> getEmployees(@RequestParam("page") int page, @RequestParam("size") int size) {
        Response response = employeeService.getEmployees(page, size);
        // Return the response entity
        return ResponseEntity.ok(response);
    }

    @GetMapping("jobsummaries")
    public ResponseEntity<Response> getJobSummaries(@RequestParam("page") int page, @RequestParam("size") int size) {
        Response response = employeeService.getJobSummaries( page, size);
        // Return the response entity
        return ResponseEntity.ok(response);
    }

    @Autowired
    public void setEmployeeService(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }
}
