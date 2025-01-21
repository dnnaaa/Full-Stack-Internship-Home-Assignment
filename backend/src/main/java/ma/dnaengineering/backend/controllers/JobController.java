package ma.dnaengineering.backend.controllers;

import jakarta.persistence.EntityNotFoundException;
import ma.dnaengineering.backend.dtos.JobDTO;
import ma.dnaengineering.backend.entities.Job;
import ma.dnaengineering.backend.services.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jobs")
public class JobController {
    @Autowired
    private JobService jobService;

    @PostMapping
    public ResponseEntity<Job> createJob(@RequestBody JobDTO job) {
        return new ResponseEntity<>(jobService.addJob(job), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Job> getJob(@PathVariable Long id) {
        Job job;
        try{
            job = jobService.getJobById(id);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(job, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs() {
        return new ResponseEntity<>(jobService.getAllJobs(), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable Long id, @RequestBody JobDTO dto) {
        Job job;
        try{
            job = jobService.updateJob(dto, id);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(job, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteJob(@PathVariable Long id) {
        return new ResponseEntity<>(jobService.deleteJobById(id), HttpStatus.OK);
    }
}
