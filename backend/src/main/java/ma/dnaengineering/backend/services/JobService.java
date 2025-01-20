package ma.dnaengineering.backend.services;

import ma.dnaengineering.backend.DAO.entities.Job;

import java.util.List;

public interface JobService {
    public Job addJob(Job job);
    public List<Job> getAllJob();
    public Job getJob(Long id);
    public Job updateJob(Long id, Job job);
    public Boolean deleteJob(Long id);

}
