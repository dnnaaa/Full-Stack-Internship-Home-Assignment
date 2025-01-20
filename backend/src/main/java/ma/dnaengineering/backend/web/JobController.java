package ma.dnaengineering.backend.web;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.dnaengineering.backend.dto.JobDto;
import ma.dnaengineering.backend.service.JobService;
import ma.dnaengineering.backend.exceptions.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;


@RestController
@RequestMapping("/jobs")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class JobController {

    private final JobService jobService;

    @GetMapping
    public ResponseEntity<List<JobDto>> getAllJobs() {
        try {
            List<JobDto> jobDtos = jobService.getAllJobs();
            return new ResponseEntity<>(jobDtos, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping
    public ResponseEntity<JobDto> createJob(@Valid @RequestBody JobDto jobDto) {
        JobDto createdJob = jobService.saveJob(jobDto);
        return new ResponseEntity<>(createdJob, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobDto> getJobById(@PathVariable Long id) {
        JobDto jobDto = jobService.getJobById(id);
        if (jobDto == null) {
            throw new ResourceNotFoundException("Job not found with ID: " + id);
        }
        return new ResponseEntity<>(jobDto, HttpStatus.OK);
    }
    @GetMapping("/filter")
    public List<JobDto> filterJobs(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) BigDecimal minSalary,
            @RequestParam(required = false) BigDecimal maxSalary
    ) {
        return jobService.filterJobs(title, location, minSalary, maxSalary);
    }
    // Update a Job by ID
    @PutMapping("/{id}")
    public ResponseEntity<JobDto> updateJob(@PathVariable Long id, @Valid @RequestBody JobDto jobDto) {
        JobDto updatedJob = jobService.updateJob(id, jobDto);
        if (updatedJob == null) {
            throw new ResourceNotFoundException("Job not found with ID: " + id);
        }
        return new ResponseEntity<>(updatedJob, HttpStatus.OK);
    }

    // Delete a Job by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        boolean isDeleted = jobService.deleteJob(id);
        if (!isDeleted) {
            throw new ResourceNotFoundException("Job not found with ID: " + id);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
