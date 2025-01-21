package ma.dnaengineering.backend.service;

import lombok.AllArgsConstructor;
import ma.dnaengineering.backend.dto.JobDto;
import ma.dnaengineering.backend.entity.Job;
import ma.dnaengineering.backend.exception.ResourceNotFoundException;
import ma.dnaengineering.backend.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class JobService {

    private JobRepository jobRepository;

    public Job createJob(JobDto jobDto) {

        Job job = new Job();
        job.setTitle(jobDto.getTitle());
        job.setDescription(jobDto.getDescription());
        job.setLocation(jobDto.getLocation());
        job.setSalary(jobDto.getSalary());
        return jobRepository.save(job);
    }

    public Job getJobById(Long jobId) {

        return jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("No Job Found With The Given Id" + jobId));
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Job updateJob(Long jobId, JobDto jobDto) {

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("No Job Found With The Given Id" + jobId));

        job.setTitle(jobDto.getTitle());
        job.setDescription(jobDto.getDescription());
        job.setLocation(jobDto.getLocation());
        job.setSalary(jobDto.getSalary());

        return jobRepository.save(job);
    }

    public void deleteJob(Long jobId) {

        jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("No Job Found With The Given Id" + jobId));

        jobRepository.deleteById(jobId);
    }

}
