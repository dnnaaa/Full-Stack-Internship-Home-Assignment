package com.test.jobmanagement.service;


import com.test.jobmanagement.entity.Job;
import com.test.jobmanagement.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {
    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Job getJobById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + id));
    }
    public Job createJob(Job job) {

        return jobRepository.save(job);
    }
    public Job updateJob(Long id, Job updatedJob) {
        Job existingJob = getJobById(id);
        existingJob.setTitle(updatedJob.getTitle());
        existingJob.setDescription(updatedJob.getDescription());
        existingJob.setLocation(updatedJob.getLocation());
        existingJob.setSalary(updatedJob.getSalary());
        existingJob.setUpdatedAt(updatedJob.getUpdatedAt());
        return jobRepository.save(existingJob);
    }
    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }
}
