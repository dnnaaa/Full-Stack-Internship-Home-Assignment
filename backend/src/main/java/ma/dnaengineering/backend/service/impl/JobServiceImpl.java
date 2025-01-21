package ma.dnaengineering.backend.service.impl;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import ma.dnaengineering.backend.dto.JobDto;
import ma.dnaengineering.backend.entity.Job;
import ma.dnaengineering.backend.exception.ResourceNotFoundException;
import ma.dnaengineering.backend.mapper.JobMapper;
import ma.dnaengineering.backend.repository.JobRepository;
import ma.dnaengineering.backend.service.JobService;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class JobServiceImpl implements JobService {
    private JobRepository jobRepository;

    @Override
    @Transactional
    public JobDto createJob(JobDto jobDto) {
        Job job= JobMapper.mapToJob(jobDto);
        Job savedJob =jobRepository.save(job);
        return JobMapper.mapToJobDto(savedJob);
    }

    @Override
    public JobDto getJobById(Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(()->
                        new ResourceNotFoundException("Job doesnt exist with given id : " + jobId));
        return JobMapper.mapToJobDto(job);
    }

    @Override
    public List<JobDto> getAllJobs() {
        List<Job>jobs = jobRepository.findAll();
        return jobs.stream().map((job)->JobMapper.mapToJobDto(job))
                .collect(Collectors.toList());
    }

    @Override
    public JobDto updateJob(Long jobId, JobDto updatedJob) {
        Job job = jobRepository.findById(jobId).orElseThrow(
                () -> new ResourceNotFoundException("Job doesnt exist with given id : " + jobId)
        );

        job.setTitle(updatedJob.getTitle());
        job.setDescription(updatedJob.getDescription());
        job.setLocation(updatedJob.getLocation());
        job.setSalary(updatedJob.getSalary());

        // Update the timestamps
        job.setUpdatedAt(new Date()); // Set the current timestamp for updatedAt
        if (job.getPostedAt() == null) {
            job.setPostedAt(new Date()); // Initialize postedAt if it's not already set
        }

        Job updatedJobObj = jobRepository.save(job);
        return JobMapper.mapToJobDto(updatedJobObj);
    }

    @Override
    public void deleteJob(Long jobId) {
        Job job = jobRepository.findById(jobId).orElseThrow(
                () -> new ResourceNotFoundException("Job doesnt exist with given id : " + jobId)
        );
        jobRepository.deleteById(jobId);
    }
}
