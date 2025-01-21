package ma.dnaengineering.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.dnaengineering.backend.dto.JobDTO;
import ma.dnaengineering.backend.services.JobService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
@CrossOrigin("*")
public class JobController {
    private final JobService jobService;
    @PostMapping
    public ResponseEntity<String> createJob(@Valid @RequestBody JobDTO jobDTO) {
        boolean created = jobService.createJob(jobDTO);
        if (created) {
            return ResponseEntity.status(201).body("created successfully");
        } else {
            return ResponseEntity.status(400).body("Job creation failed");
        }

    }
    @GetMapping
    public ResponseEntity<List<JobDTO>> getAllJobs() {
        List<JobDTO> jobs = jobService.getAllJobs();

        if (jobs.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(jobs);
    }
    @GetMapping("/{id}")
    public ResponseEntity<JobDTO> getJob(@PathVariable("id") int id) {
        JobDTO jobDTO = jobService.getJob(id);

        if (jobDTO == null) {
            return ResponseEntity.status(404).build();
        }

        return ResponseEntity.ok(jobDTO);
    }
    @PutMapping("/{id}")
    public ResponseEntity<String> updateJob(@PathVariable("id") int id, @Valid @RequestBody JobDTO jobDTO) {
        boolean updated = jobService.updateJob(id, jobDTO);

        if (updated) {
            return ResponseEntity.status(200).body("Job with id " + id + " has been updated successfully.");
        } else {
            return ResponseEntity.status(404).body("Job with id " + id + " not found.");
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteJob(@PathVariable("id") int id) {
        boolean deleted = jobService.deleteJob(id);

        if (deleted) {
            return ResponseEntity.status(200).body("Job with id " + id + " has been deleted successfully.");
        } else {
            return ResponseEntity.status(404).body("Job with id " + id + " not found.");
        }
    }


}
