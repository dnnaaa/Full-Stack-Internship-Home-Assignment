package ma.dnaengineering.backend.controllers;

import ma.dnaengineering.backend.dtos.JobDTO;
import ma.dnaengineering.backend.entities.Job;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ma.dnaengineering.backend.services.JobService;

import java.util.List;
@CrossOrigin("http://localhost:5173/")
@RestController
@RequestMapping("/jobs")
public class JobController {
    @Autowired
    private JobService jobService;

    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs() {
        return ResponseEntity.ok(jobService.getAllJobs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.getJobById(id));
    }

    @PostMapping
    public ResponseEntity<Job> addJob(@Valid @RequestBody JobDTO jobDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(jobService.addJob(jobDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable Long id, @Valid @RequestBody JobDTO jobDTO) {
        return ResponseEntity.ok(jobService.updateJob(jobDTO, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Job> deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
        return ResponseEntity.noContent().build();
    }
}
