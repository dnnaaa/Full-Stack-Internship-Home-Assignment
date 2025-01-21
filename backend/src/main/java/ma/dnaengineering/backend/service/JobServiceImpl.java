package ma.dnaengineering.backend.service;

import lombok.RequiredArgsConstructor;
import ma.dnaengineering.backend.exception.JobNotFoundException;
import ma.dnaengineering.backend.model.Job;
import ma.dnaengineering.backend.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;

    @Override
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    @Override
    public Job getJobById(Long id) {
        return jobRepository.findById(id).orElseThrow(() -> new JobNotFoundException(id));
    }

    @Override
    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    @Override
    public Job updateJob(Long id, Job jobDetails) {
        Job job = getJobById(id);
        job.setTitle(jobDetails.getTitle());
        job.setDescription(jobDetails.getDescription());
        job.setLocation(jobDetails.getLocation());
        job.setSalary(jobDetails.getSalary());
        return jobRepository.save(job);
    }

    @Override
    public void deleteJob(Long id) {
        Job job = getJobById(id);
        jobRepository.delete(job);
    }
}
