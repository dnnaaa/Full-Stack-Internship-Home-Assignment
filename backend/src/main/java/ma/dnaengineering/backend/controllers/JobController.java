package ma.dnaengineering.backend.controllers;

import ma.dnaengineering.backend.entities.Job;
import ma.dnaengineering.backend.exceptions.ResourceNotFoundException;
import ma.dnaengineering.backend.services.JobService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/jobs")
public class JobController {
    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @PostMapping
    public ResponseEntity<Job> createJob(@Valid @RequestBody Job job) {
        return ResponseEntity.status(HttpStatus.CREATED).body(jobService.createJob(job));
    }

    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs() {
        return ResponseEntity.ok(jobService.getAllJobs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable Long id) {
        Job job = jobService.getJobById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job with ID " + id + " not found"));
        return ResponseEntity.ok(job);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable Long id, @Valid @RequestBody Job job) {
        Job updatedJob = jobService.updateJob(id, job)
                .orElseThrow(() -> new ResourceNotFoundException("Job with ID " + id + " not found"));
        return ResponseEntity.ok(updatedJob);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        boolean deleted = jobService.deleteJob(id);
        if (!deleted) {
            throw new ResourceNotFoundException("Job with ID " + id + " not found");
        }
        return ResponseEntity.noContent().build();
    }
}
