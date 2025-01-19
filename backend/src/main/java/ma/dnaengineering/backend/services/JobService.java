package ma.dnaengineering.backend.services;

import ma.dnaengineering.backend.interfaces.IJobService;
import ma.dnaengineering.backend.models.Job;
import ma.dnaengineering.backend.Repositories.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService implements IJobService {

    private final JobRepository _jobRepository;

    public JobService(JobRepository jobRepository) {
        _jobRepository = jobRepository;
    }

    @Override
    public List<Job> GetAllJobs() {
        return _jobRepository.findAll();
    }

    @Override
    public Job GetJobById(Long Id) {
        return _jobRepository.findById(Id).orElseThrow();
    }

    @Override
    public Job AddJob(Job job) {
        return  _jobRepository.save(job);
    }

    @Override
    public Job UpdateJob(Long Id, Job jobUpdate) {
        Job job = _jobRepository.findById(Id).orElseThrow();
        job.setTitle(jobUpdate.getTitle());
        job.setDescription(jobUpdate.getDescription());
        job.setLocation(jobUpdate.getLocation());
        job.setSalary(jobUpdate.getSalary());
        return  _jobRepository.save(job);
    }

    @Override
    public Job DeleteJob(Long Id) {
        Job job = _jobRepository.findById(Id).orElseThrow();
        _jobRepository.delete(job);
        return job;
    }
}
