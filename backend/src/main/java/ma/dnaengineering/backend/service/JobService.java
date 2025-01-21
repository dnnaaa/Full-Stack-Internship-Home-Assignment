package ma.dnaengineering.backend.service;

import ma.dnaengineering.backend.model.Job;
import org.springframework.stereotype.Service;

import java.util.List;

public interface JobService {
    List<Job> getAllJobs();

    Job getJobById(Long id);

    Job createJob(Job job);

    Job updateJob(Long id, Job jobDetails);

    void deleteJob(Long id);
}
