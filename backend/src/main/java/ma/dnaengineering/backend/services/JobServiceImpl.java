package ma.dnaengineering.backend.services;

import lombok.RequiredArgsConstructor;
import ma.dnaengineering.backend.entities.Job;
import ma.dnaengineering.backend.repositories.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService{

    private final JobRepository jobRepository;

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
        Job existingJob = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
        existingJob.setTitle(updatedJob.getTitle());
        existingJob.setDescription(updatedJob.getDescription());
        existingJob.setLocation(updatedJob.getLocation());
        existingJob.setSalary(updatedJob.getSalary());
        return jobRepository.save(existingJob);
    }

    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }
}
