package ma.dnaengineering.backend.services;

import ma.dnaengineering.backend.dtos.JobDTO;
import ma.dnaengineering.backend.entities.Job;
import ma.dnaengineering.backend.exception.ResourceNotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ma.dnaengineering.backend.repositories.JobRepository;

import java.util.List;

@Service
public class JobService {
    @Autowired
    private JobRepository jobRepository;

    public List<Job> getAllJobs() {
        return  jobRepository.findAll();
    }

    public Job getJobById(Long id) {
        return jobRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Job not found with id " + id));
    }

    public Job addJob(JobDTO jobDTO) {
        Job job = new Job();
        BeanUtils.copyProperties(jobDTO, job);
        return jobRepository.save(job);
    }

    public Job updateJob(JobDTO jobDTO, Long id) {
        Job existingJob = getJobById(id);
        BeanUtils.copyProperties(jobDTO, existingJob,"id","postedAt");
        return jobRepository.save(existingJob);
    }

    public void deleteJob(Long id) {
        if(!jobRepository.existsById(id)) {
            throw new ResourceNotFoundException("Job not found with id: " + id);
        }
        jobRepository.deleteById(id);
    }
}
