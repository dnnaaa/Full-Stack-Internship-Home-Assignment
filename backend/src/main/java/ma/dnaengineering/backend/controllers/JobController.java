package ma.dnaengineering.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ma.dnaengineering.backend.bo.Job;
import ma.dnaengineering.backend.service.IjobService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/jobs")
@CrossOrigin(origins = "http://localhost:3000") 
public class JobController {

    @Autowired
    private IjobService jobservice;

    // POST /jobs: Create a new job post.
    @PostMapping
    public ResponseEntity<Job> createJob(@RequestBody Job job) {
        jobservice.addJob(job);
        return ResponseEntity.ok(job);
    }

    // GET /jobs: Fetch all job posts with specific attributes.
    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs() {
        List<Job> jobs = jobservice.getAllJobs();
        return ResponseEntity.ok(jobs);
    }

    // GET /jobs/{id}: Fetch details of a specific job post.
    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable Long id) {
        Optional<Job> job = jobservice.getJobById(id);
        return job.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // PUT /jobs/{id}: Update an existing job post.
    @PutMapping("/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable Long id, @RequestBody Job updatedJob) {
        jobservice.updateJob(id, updatedJob);
        return ResponseEntity.ok(updatedJob);
    }

    // DELETE /jobs/{id}: Delete a job post.
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        jobservice.deleteJob(id);
        return ResponseEntity.noContent().build();
    }
}
