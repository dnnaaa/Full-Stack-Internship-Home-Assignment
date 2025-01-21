package ma.dnaengineering.backend.service;

import ma.dnaengineering.backend.model.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface JobService {

    // Create a new job
    Job createJob(Job job);

    // Fetch all jobs
    List<Job> getAllJobs();

    //Fech jobs by pages
    Page<Job> getJobsByPage(Pageable pageable);

    // Fetch a job by its ID
    Job getJobById(Long id);

    // Update an existing job
    Job updateJob(Long id, Job job);
    //filter the jobs by min and max salary
    List<Job> filterJobsBySalary(BigDecimal minSalary, BigDecimal maxSalary);
    // Delete a job by its ID
    void deleteJob(Long id);
}

