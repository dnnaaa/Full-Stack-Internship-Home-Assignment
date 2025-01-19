package ma.dnaengineering.backend.controllers;

import jakarta.validation.Valid;
import ma.dnaengineering.backend.interfaces.IJobService;
import ma.dnaengineering.backend.models.Job;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {
    private final IJobService _JobService;

    public JobController(IJobService JobService) {
        _JobService = JobService;
    }

    @GetMapping
    public ResponseEntity<List<Job>> getJobs() {
        List<Job> Jobs = _JobService.GetAllJobs();
        return new ResponseEntity<>(Jobs, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Job> getJob(@PathVariable Long id) {
        Job Job = _JobService.GetJobById(id);
        return new ResponseEntity<>(Job, HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<Job> addJob(@Valid @RequestBody Job Job) {
        Job newJob = _JobService.AddJob(Job);
        return new ResponseEntity<>(newJob, HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable Long id, @RequestBody Job JobUpdate) {
        Job updatedJob = _JobService.UpdateJob(id, JobUpdate);
        return new ResponseEntity<>(updatedJob, HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        _JobService.DeleteJob(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
