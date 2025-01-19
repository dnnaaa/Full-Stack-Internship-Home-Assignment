package ma.dnaengineering.backend.controller;

import jakarta.validation.Valid;
import ma.dnaengineering.backend.exception.JobNotFoundException;
import ma.dnaengineering.backend.model.Job;
import ma.dnaengineering.backend.repository.JobRepository;
import ma.dnaengineering.backend.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3001")
public class JobController {
    @Autowired
    private JobRepository jobRepository;

    // Endpoint to create a new job post
    @PostMapping("/job")
    public Job createJob(@RequestBody Job newJob) {
        return jobRepository.save(newJob);
    }

    // Endpoint to get all job posts
    @GetMapping("/jobs")
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    // Endpoint to get a job post by its ID
    @GetMapping("/job/{id}")
    public Job getJobById(@PathVariable Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new JobNotFoundException(id));
    }

    // Endpoint to update an existing job post
    @PutMapping("/job/{id}")
    public Job updateJob(@RequestBody Job updatedJob, @PathVariable Long id) {
        return jobRepository.findById(id)
                .map(job -> {
                    job.setTitle(updatedJob.getTitle());
                    job.setDescription(updatedJob.getDescription());
                    job.setLocation(updatedJob.getLocation());
                    job.setSalary(updatedJob.getSalary());
                    return jobRepository.save(job);
                })
                .orElseThrow(() -> new JobNotFoundException(id));
    }

    // Endpoint to delete a job post
    @DeleteMapping("/job/{id}")
    public String deleteJob(@PathVariable Long id) {
        if (!jobRepository.existsById(id)) {
            throw new JobNotFoundException(id);
        }
        jobRepository.deleteById(id);
        return "Job with id " + id + " has been deleted successfully.";
    }
}
