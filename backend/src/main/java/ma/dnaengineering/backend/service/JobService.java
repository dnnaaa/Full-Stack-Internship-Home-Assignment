package ma.dnaengineering.backend.service;

import ma.dnaengineering.backend.model.Job;

import java.util.List;
import java.util.Optional;

public interface JobService {

    // Create a new job
    Job createJob(Job job);

    // Fetch all jobs
    List<Job> getAllJobs();

    // Fetch a job by its ID
    Job getJobById(Long id);

    // Update an existing job
    Job updateJob(Long id, Job job);

    // Delete a job by its ID
    void deleteJob(Long id);
}

