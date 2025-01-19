package ma.dnaengineering.backend.service;

import jakarta.transaction.Transactional;
import ma.dnaengineering.backend.entity.Job;
import ma.dnaengineering.backend.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class JobService {

    private final JobRepository jobRepository;

    @Autowired
    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Optional<Job> getJobById(Long id) {
        return jobRepository.findById(id);
    }

    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    public Job updateJob(Long id, Job jobDetails) {
        Job existingJob = jobRepository.findById(id).orElseThrow(() -> new RuntimeException("Job not found"));
        existingJob.setTitle(jobDetails.getTitle());
        existingJob.setDescription(jobDetails.getDescription());
        existingJob.setLocation(jobDetails.getLocation());
        existingJob.setSalary(jobDetails.getSalary());
        existingJob.setUpdatedAt(jobDetails.getUpdatedAt());
        return jobRepository.save(existingJob);
    }

    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }
}
