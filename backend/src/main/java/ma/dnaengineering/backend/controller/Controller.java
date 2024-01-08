package ma.dnaengineering.backend.controller;

import ma.dnaengineering.backend.model.Employee;
import ma.dnaengineering.backend.model.Job;
import ma.dnaengineering.backend.service.ParseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/api")
public class Controller {
    @Autowired
    private ParseService parseService;
    @PostMapping("/employees")
    public ResponseEntity<List<Employee>> getEmployees(@RequestParam("file") MultipartFile file,
                                                       @RequestParam(defaultValue = "0") int page,
                                                       @RequestParam(defaultValue = "10") int pageSize
    ) throws IOException {
        try {
            List<Employee> employees = parseService.getEmployees(file, page, pageSize);
            return ResponseEntity.ok(employees);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }
    @PostMapping("/jobs")
    public ResponseEntity<List<Job>> getJobs(@RequestParam("file") MultipartFile file) throws IOException {
        try {
            List<Job> jobs = parseService.getJobs(file);
            return ResponseEntity.ok(jobs);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

}
