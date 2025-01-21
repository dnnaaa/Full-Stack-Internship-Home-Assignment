package ma.dnaengineering.backend.services;

import ma.dnaengineering.backend.dtos.JobDTO;
import ma.dnaengineering.backend.entities.Job;

import java.util.List;

public interface JobService {

    Job createJob(Job job);

    Job getSingleJob(long jobId);

    List<JobDTO> getAllJobs();

    Job updateJob(Job newJob);

    void deleteJob(long jobId);
}
