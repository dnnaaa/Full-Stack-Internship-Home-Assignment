package ma.dnaengineering.backend.service;

import ma.dnaengineering.backend.exception.JobNotFoundException;
import ma.dnaengineering.backend.exception.NegativeSalaryException;
import ma.dnaengineering.backend.model.Job;
import ma.dnaengineering.backend.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@Transactional
public class JobServiceImpl implements JobService {

    @Autowired
    JobRepository jobRepository;

    /**
     * Create a new job.
     * Validates that the salary is non-negative before saving.
     *
     * @param job the job to be created
     * @return the created job
     * @throws NegativeSalaryException if the salary is negative
     */
    @Override
    public Job createJob(Job job) {
        if (job.getSalary() != null && job.getSalary().compareTo(BigDecimal.ZERO) < 0) {
            throw new NegativeSalaryException("Salary cannot be negative");
        }
        return jobRepository.save(job);
    }

    /**
     * Fetch a paginated list of jobs.
     *
     * @param pageable pagination and sorting information
     * @return a paginated list of jobs
     */
    public Page<Job> getJobsByPage(Pageable pageable) {
        return jobRepository.findAll(pageable);
    }

    /**
     * Fetch all jobs.
     *
     * @return a list of all jobs
     */
    @Override
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    /**
     * Fetch a job by its ID.
     * Throws an exception if the job is not found.
     *
     * @param id the ID of the job
     * @return the job with the specified ID
     * @throws JobNotFoundException if the job does not exist
     */
    @Override
    public Job getJobById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new JobNotFoundException("Job not found with id: " + id));
    }

    /**
     * Update an existing job.
     * Validates that the salary is non-negative before updating.
     *
     * @param id the ID of the job to update
     * @param job the updated job data
     * @return the updated job
     * @throws JobNotFoundException if the job does not exist
     */
    @Override
    public Job updateJob(Long id, Job job) {
        return jobRepository.findById(id)
                .map(existingJob -> updateExistingJob(existingJob, job))
                .map(jobRepository::save)
                .orElseThrow(() -> new JobNotFoundException("Job not found with id: " + id));
    }

    /**
     * Helper method to update fields of an existing job.
     * Ensures that the salary is non-negative.
     *
     * @param existingJob the existing job to update
     * @param updatedJob the new job data
     * @return the updated job
     * @throws NegativeSalaryException if the salary is negative
     */
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

    /**
     * Delete a job by its ID.
     * Throws an exception if the job does not exist.
     *
     * @param id the ID of the job to delete
     * @throws JobNotFoundException if the job does not exist
     */
    @Override
    public void deleteJob(Long id) {
        if (!jobRepository.existsById(id)) {
            throw new JobNotFoundException("Job not found with id: " + id);
        }
        jobRepository.deleteById(id);
    }
}
