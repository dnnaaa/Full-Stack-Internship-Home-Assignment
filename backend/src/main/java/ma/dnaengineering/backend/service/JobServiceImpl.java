package ma.dnaengineering.backend.service;

import ma.dnaengineering.backend.exception.JobNotFoundException;
import ma.dnaengineering.backend.exception.NegativeSalaryException;
import ma.dnaengineering.backend.model.Job;
import ma.dnaengineering.backend.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@Transactional
public class JobServiceImpl implements JobService {

    @Autowired
    JobRepository jobRepository;

    @Override
    public Job createJob(Job job) {
        if (job.getSalary() != null && job.getSalary().compareTo(BigDecimal.ZERO) < 0) {
            throw new NegativeSalaryException("Salary cannot be negative");
        }
        return jobRepository.save(job);
    }



    @Override
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    @Override
    public Job getJobById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new JobNotFoundException("Job not found with id: " + id));
    }

    @Override
    public Job updateJob(Long id, Job job) {
        return jobRepository.findById(id)
                .map(existingJob -> updateExistingJob(existingJob,job))
                .map(jobRepository::save)
                .orElseThrow(() -> new JobNotFoundException("Job not found with id: " + id));
    }
    private Job updateExistingJob(Job existingJob, Job updatedJob) {
        if (updatedJob.getSalary() != null && updatedJob.getSalary().compareTo(BigDecimal.ZERO) < 0) {
            throw new NegativeSalaryException("Salary cannot be negative");
        }
        existingJob.setTitle(updatedJob.getTitle());
        existingJob.setDescription(updatedJob.getDescription());
        existingJob.setLocation(updatedJob.getLocation());
        existingJob.setSalary(updatedJob.getSalary());
        return existingJob;
    }

    @Override
    public void deleteJob(Long id) {
        if (!jobRepository.existsById(id)) {
            throw new JobNotFoundException("Job not found with id: " + id);
        }
        jobRepository.deleteById(id);
    }
}
