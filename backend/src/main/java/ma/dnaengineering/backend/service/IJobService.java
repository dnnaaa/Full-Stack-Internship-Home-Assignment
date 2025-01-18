package ma.dnaengineering.backend.service;

import ma.dnaengineering.backend.entity.Job;

import java.util.List;

public interface IJobService {

    public Job createJob(Job job);
    public List<Job> getAllJobs();
    public Job getJobById(Integer id);
    public Job updateJob(Integer id, Job jobDetails);
    public void deleteJob(Integer id);

}
