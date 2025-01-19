package ma.dnaengineering.backend.services;

import ma.dnaengineering.backend.entities.Job;
import ma.dnaengineering.backend.repositories.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobService {
    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }


    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Optional<Job> getJobById(Long id) {
        return jobRepository.findById(id);
    }

    public Job updateJob(Long id, Job updatedJob) {
        return jobRepository.findById(id).map(job -> {
            job.setTitle(updatedJob.getTitle());
            job.setDescription(updatedJob.getDescription());
            job.setLocation(updatedJob.getLocation());
            job.setSalary(updatedJob.getSalary());
            return jobRepository.save(job);
        }).orElseThrow(() -> new RuntimeException("Job not found with id " + id));
    }

    public void deleteJob(Long id) {
        if (jobRepository.existsById(id)) {
            jobRepository.deleteById(id);
        } else {
            throw new RuntimeException("Job not found with id " + id);
        }
    }
}
