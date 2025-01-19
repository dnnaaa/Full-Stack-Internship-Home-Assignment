package ma.dnaengineering.backend.services;

import ma.dnaengineering.backend.entities.Job;
import ma.dnaengineering.backend.repositories.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobServiceImpl implements JobService {
    private final JobRepository jobRepository;

    public JobServiceImpl(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Job getJobById(Long id) {
        return jobRepository.findById(id).orElseThrow(() -> new RuntimeException("Job not found"));
    }

    public Job createJob(Job job) { return jobRepository.save(job); }

    public Job updateJob(Long id, Job updatedJob) {
        Job job = getJobById(id);
        job.setTitle(updatedJob.getTitle());
        job.setDescription(updatedJob.getDescription());
        job.setLocation(updatedJob.getLocation());
        job.setSalary(updatedJob.getSalary());
        return jobRepository.save(job);
    }

    public void deleteJob(Long id) { jobRepository.deleteById(id); }
}

