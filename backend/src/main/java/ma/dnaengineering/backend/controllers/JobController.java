package ma.dnaengineering.backend.controllers;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import ma.dnaengineering.backend.dtos.JobDTO;
import ma.dnaengineering.backend.entities.Job;
import ma.dnaengineering.backend.services.JobService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "${CROSS_ORIGIN_URL}")
@RequestMapping("/jobs")
public class JobController {

    private final JobService jobService;

    @PostMapping("")
    public ResponseEntity<Job> createJob(@Valid @RequestBody Job jobDetails) {
        Job createdJob = jobService.createJob(jobDetails);
        return new ResponseEntity<>(createdJob, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Job> getSingleJob(@PathVariable long id) {
        Job job = jobService.getSingleJob(id);
        return new ResponseEntity<>(job, HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<List<JobDTO>> getAllJobs() {
        List<JobDTO> jobDTOList = jobService.getAllJobs();
        return new ResponseEntity<>(jobDTOList, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable long id, @Valid @RequestBody Job jobDetails) {
        jobDetails.setId(id);
        jobDetails.setPostedAt(jobService.getSingleJob(id).getPostedAt());
        Job updatedJob = jobService.updateJob(jobDetails);
        return new ResponseEntity<>(updatedJob, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteJob(@PathVariable long id) {
        jobService.deleteJob(id);
        return new ResponseEntity<>("Job deleted successfully", HttpStatus.OK);
    }
}

