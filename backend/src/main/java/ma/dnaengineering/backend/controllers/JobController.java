package ma.dnaengineering.backend.controllers;

import ma.dnaengineering.backend.dto.JobRequest;
import ma.dnaengineering.backend.dto.JobResponse;
import ma.dnaengineering.backend.entities.Job;
import ma.dnaengineering.backend.services.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jobs")
public class JobController {

    @Autowired
    private JobService jobService;

    @GetMapping
    public ResponseEntity<List<JobResponse>> getJobService() {
        return ResponseEntity.ok(jobService.findAll());
    }
    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.findById(id));
    }
    @PostMapping
    public ResponseEntity<?> postJob(@RequestBody JobRequest jobRequest) {
        jobService.save(jobRequest);
        return ResponseEntity.ok("Job added successfully");
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateJob(@PathVariable Long id ,@RequestBody JobRequest jobRequest) {
        jobService.update(id, jobRequest);
        return ResponseEntity.ok("Job updated successfully");
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteJob(@PathVariable Long id) {
        jobService.delete(id);
        return ResponseEntity.ok("Job deleted successfully");
    }
}
