package ma.dnaengineering.backend.interfaces;

import ma.dnaengineering.backend.models.Job;

import java.util.List;

public interface IJobService {
    List<Job> GetAllJobs();
    Job GetJobById(Long Id);
    Job AddJob(Job JobCreate);
    Job UpdateJob(Long Id, Job JobUpdate);
    Job DeleteJob(Long Id);
}
