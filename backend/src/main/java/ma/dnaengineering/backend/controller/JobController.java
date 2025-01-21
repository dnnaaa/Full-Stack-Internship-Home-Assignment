package ma.dnaengineering.backend.controller;


import lombok.AllArgsConstructor;
import ma.dnaengineering.backend.dto.JobDto;
import ma.dnaengineering.backend.entity.Job;
import ma.dnaengineering.backend.service.JobService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@AllArgsConstructor
@RestController
@RequestMapping("/api/job")
public class JobController {

    private JobService jobService;

    @PostMapping
    public Job createJob(@RequestBody JobDto jobDto) {
        return jobService.createJob(jobDto);
    }

    @GetMapping("{id}")
    public ResponseEntity<Job> getJobById(@PathVariable("id") Long jobId) {

        Job job = jobService.getJobById(jobId);
        return ResponseEntity.ok(job);
    }

    @GetMapping
    public List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }

    @PutMapping("{id}")
    public ResponseEntity<Job> updateJob(@PathVariable("id") Long jobId, @RequestBody JobDto jobDto) {

        Job updatedJob = jobService.updateJob(jobId, jobDto);
        return ResponseEntity.ok(updatedJob);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteJob(@PathVariable("id") Long jobId) {
        jobService.deleteJob(jobId);
        return ResponseEntity.ok("Job Deleted Successfully.");
    }
}
