package ma.dnaengineering.backend.controllers;

import jakarta.validation.Valid;
import ma.dnaengineering.backend.entities.Job;
import ma.dnaengineering.backend.services.JobService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/jobs")
public class JobController {
    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs() {
        return ResponseEntity.status(HttpStatus.OK).body(jobService.getAllJobs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(jobService.getJobById(id));
    }

    @PostMapping
    public ResponseEntity<Job> createJob(@RequestBody @Valid Job job) {
        Job createdJob = jobService.createJob(job);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdJob);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable Long id, @RequestBody @Valid Job job) {
        return ResponseEntity.status(HttpStatus.OK).body(jobService.updateJob(id,job));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteJob(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body("Job Deleted");
    }
}

