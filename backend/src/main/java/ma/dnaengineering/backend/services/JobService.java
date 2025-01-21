package ma.dnaengineering.backend.services;

import ma.dnaengineering.backend.entities.Job;

import java.util.List;
import java.util.Optional;

public interface JobService {
    Job createJob(Job job);

    List<Job> getAllJobs();

    Optional<Job> getJobById(Long id);

    Job updateJob(Long id, Job updatedJob);

    void deleteJob(Long id);
}
