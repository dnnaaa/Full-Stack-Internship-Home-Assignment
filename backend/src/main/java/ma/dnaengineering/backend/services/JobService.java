package ma.dnaengineering.backend.services;

import ma.dnaengineering.backend.entities.Job;

import java.util.List;

public interface JobService {
    public List<Job> getAllJobs() ;

    public Job getJobById(Long id);

    public Job createJob(Job job);

    public Job updateJob(Long id, Job updatedJob);

    public void deleteJob(Long id);
}
