package ma.dnaengineering.backend.controller;

import lombok.RequiredArgsConstructor;
import ma.dnaengineering.backend.dto.JobDto;
import ma.dnaengineering.backend.dto.JobResponse;
import ma.dnaengineering.backend.service.JobService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class JobController {

  private final JobService jobService;

  @PostMapping
  public ResponseEntity<JobResponse> createJob(@Valid @RequestBody JobDto jobDTO) {
    return new ResponseEntity<>(jobService.createJob(jobDTO), HttpStatus.CREATED);
  }

  @GetMapping
  public ResponseEntity<List<JobResponse>> getAllJobs() {
    return ResponseEntity.ok(jobService.getAllJobs());
  }

  @GetMapping("/{id}")
  public ResponseEntity<JobResponse> getJobById(@PathVariable Long id) {
    return ResponseEntity.ok(jobService.getJobById(id));
  }

  @PutMapping("/{id}")
  public ResponseEntity<JobResponse> updateJob(@PathVariable Long id, @Valid @RequestBody JobDto jobDTO) {
    return ResponseEntity.ok(jobService.updateJob(id, jobDTO));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
    jobService.deleteJob(id);
    return ResponseEntity.noContent().build();
  }
}
