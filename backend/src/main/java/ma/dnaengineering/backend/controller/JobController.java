package ma.dnaengineering.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.dnaengineering.backend.model.Job;
import ma.dnaengineering.backend.service.JobService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin("http://localhost:3000/")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    @GetMapping
    public List<Job> all() {
        return jobService.getAllJobs();
    }

    @GetMapping("/{id}")
    public Job one(@PathVariable Long id) {
        return jobService.getJobById(id);
    }

    @PostMapping
    public Job create(@Valid @RequestBody Job job) {
        return jobService.createJob(job);
    }

    @PutMapping("/{id}")
    public Job update(@PathVariable Long id, @Valid @RequestBody Job jobDetails) {
        return jobService.updateJob(id, jobDetails);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        jobService.deleteJob(id);
        return ResponseEntity.ok().build();
    }
}
