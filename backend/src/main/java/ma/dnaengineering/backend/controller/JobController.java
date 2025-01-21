package ma.dnaengineering.backend.controller;

import jakarta.validation.Valid;
import ma.dnaengineering.backend.exception.JobNotFoundException;
import ma.dnaengineering.backend.model.Job;
import ma.dnaengineering.backend.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

/**
 * Controller class for managing job-related operations.
 * Handles HTTP requests for creating, reading, updating, and deleting jobs.
 */
@RestController
@RequestMapping("/api/jobs")
@Validated
public class JobController {

    @Autowired
    JobService jobService;

    /**
     * Create a new job.
     * Validates the input job data and returns the created job with a status of 201 (Created).
     *
     * @param job the job data to be created
     * @return the created job with HTTP status 201
     */
    @PostMapping
    public ResponseEntity<Job> createJob(@Valid @RequestBody Job job) {
        Job createdJob = jobService.createJob(job);
        return new ResponseEntity<>(createdJob, HttpStatus.CREATED);
    }

    /**
     * Fetch all jobs.
     * Returns a list of all jobs with a status of 200 (OK).
     *
     * @return a list of all jobs with HTTP status 200
     */
    @GetMapping("/All")
    public ResponseEntity<List<Job>> getAllJobs() {
        List<Job> jobs = jobService.getAllJobs();
        return new ResponseEntity<>(jobs, HttpStatus.OK);
    }

    /**
     * Fetch jobs with pagination.
     * Returns a paginated list of jobs based on the provided `Pageable` parameter.
     * The default page size is 5, and the default sort field is `title`.
     *
     * @param pageable pagination and sorting information
     * @return a paginated list of jobs
     */
    @GetMapping
    public Page<Job> getJobs(@PageableDefault(size = 5, sort = "title") Pageable pageable) {
        return jobService.getJobsByPage(pageable);
    }

    /**
     * Fetch a specific job by its ID.
     * Returns the job if found, or a status of 404 (Not Found) if the job does not exist.
     *
     * @param id the ID of the job to fetch
     * @return the job with the specified ID or HTTP status 404
     */
    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable Long id) {
        try {
            Job job = jobService.getJobById(id);
            return new ResponseEntity<>(job, HttpStatus.OK);
        } catch (JobNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Update a specific job by its ID.
     * Validates the input job data and updates the job if it exists.
     * Returns the updated job or a status of 404 (Not Found) if the job does not exist.
     *
     * @param id  the ID of the job to update
     * @param job the updated job data
     * @return the updated job or HTTP status 404
     */
    @PutMapping("/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable Long id, @Valid @RequestBody Job job) {
        try {
            Job updatedJob = jobService.updateJob(id, job);
            return new ResponseEntity<>(updatedJob, HttpStatus.OK);
        } catch (JobNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Filters jobs based on the provided salary range.
     *
     * @param minSalary Minimum salary for filtering.
     * @param maxSalary Maximum salary for filtering.
     * @return List of jobs within the specified salary range with HTTP status 200.
     */
    @GetMapping("/filter-by-salary")
    public ResponseEntity<List<Job>> filterJobsBySalary(
            @RequestParam BigDecimal minSalary,
            @RequestParam BigDecimal maxSalary) {
        List<Job> filteredJobs = jobService.filterJobsBySalary(minSalary, maxSalary);
        return new ResponseEntity<>(filteredJobs, HttpStatus.OK);
    }


    /**
     * Delete a specific job by its ID.
     * Deletes the job if it exists or returns a status of 404 (Not Found) if the job does not exist.
     *
     * @param id the ID of the job to delete
     * @return HTTP status 204 (No Content) if the job is deleted or 404 if not found
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        try {
            jobService.deleteJob(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (JobNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
